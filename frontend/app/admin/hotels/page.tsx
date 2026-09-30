'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { API_URL } from '@/lib/constants';
import { Trash2 } from 'lucide-react';

export default function AdminHotels() {
    const router = useRouter();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [hotels, setHotels] = useState<any[]>([]);
    const [isEditing, setIsEditing] = useState(false);
    const [uploadingImage, setUploadingImage] = useState(false);
    const [token, setToken] = useState<string | null>(null);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [currentHotel, setCurrentHotel] = useState<any>({ name: '', description: '', image: '', whatsappMessage: '' });
    const [deleteHotelCandidate, setDeleteHotelCandidate] = useState<{ id: string; name: string } | null>(null);
    const [isDeletingHotel, setIsDeletingHotel] = useState(false);

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (!storedToken) {
            router.push('/hakunamata');
        } else {
            setToken(storedToken);
            fetch(`${API_URL}/hotels`)
                .then(res => res.json())
                .then(data => {
                    if (data.success) setHotels(data.hotels);
                });
        }
    }, [router]);

    const promptDeleteHotel = (id: string, name: string) => {
        setDeleteHotelCandidate({ id, name });
    };

    const confirmDeleteHotel = async () => {
        if (!deleteHotelCandidate) return;
        setIsDeletingHotel(true);
        try {
            const res = await fetch(`${API_URL}/hotels/${deleteHotelCandidate.id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await res.json();
            if (data.success) {
                setHotels(hotels.filter(h => h._id !== deleteHotelCandidate.id));
                setDeleteHotelCandidate(null);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setIsDeletingHotel(false);
        }
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setUploadingImage(true);
        const fd = new FormData();
        fd.append('image', file);
        try {
            const res = await fetch(`${API_URL}/media/upload`, {
                method: 'POST',
                headers: { Authorization: `Bearer ${token}` },
                body: fd,
            });
            const data = await res.json();
            if (data.success && data.url) {
                const url = data.url.startsWith('http') ? data.url : `${API_URL.replace('/api', '')}${data.url}`;
                setCurrentHotel((prev: any) => ({ ...prev, image: url }));
            } else {
                alert(data.message || 'Upload failed.');
            }
        } catch {
            alert('Upload failed. Check backend connection.');
        } finally {
            setUploadingImage(false);
            e.target.value = '';
        }
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const isNew = !currentHotel._id;
            const url = isNew 
                ? `${API_URL}/hotels` 
                : `${API_URL}/hotels/${currentHotel._id}`;
            const method = isNew ? 'POST' : 'PUT';

            const res = await fetch(url, {
                method,
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` 
                },
                body: JSON.stringify(currentHotel)
            });
            const data = await res.json();
            if (data.success) {
                if (isNew) {
                    setHotels([data.hotel, ...hotels]);
                } else {
                    setHotels(hotels.map(h => h._id === data.hotel._id ? data.hotel : h));
                }
                setIsEditing(false);
                setCurrentHotel({ name: '', description: '', image: '', whatsappMessage: '' });
            } else {
                alert(data.message || 'Failed to save hotel');
            }
        } catch (err) {
            console.error(err);
            alert('Failed to save hotel');
        }
    };

    if (!token) return null;

    return (
        <div className="sns-admin-root text-slate-100 p-4 sm:p-8 pt-8 sm:pt-12">
            <div className="max-w-6xl mx-auto space-y-8">
                {/* ── LUXURY BRAND HEADER ── */}
                <header className="sns-card p-6 sm:p-8 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-80 h-80 bg-[radial-gradient(ellipse_at_top_right,rgba(217,173,87,0.12),transparent_70%)] pointer-events-none" />

                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
                        <div className="flex items-center gap-5">
                            <Link href="/admin" className="shrink-0 group">
                                <div className="p-2.5 rounded-2xl bg-[#140d09]/80 border border-[#dfbf80]/30 shadow-lg group-hover:border-[#dfbf80]/60 transition-all">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src="/soil-n-soul-logo.svg"
                                        alt="SoilNSoul Travels"
                                        className="h-9 sm:h-11 w-auto object-contain brightness-0 invert drop-shadow-[0_2px_10px_rgba(223,191,128,0.3)]"
                                    />
                                </div>
                            </Link>
                            <div>
                                <span className="sns-admin-eyebrow">
                                    SoilNSoul Travels • Curated Sanctuaries
                                </span>
                                <h1 className="sns-admin-title text-2xl sm:text-3xl md:text-4xl mt-1">
                                    Curated Stays &amp; <em>Hotels</em>
                                </h1>
                            </div>
                        </div>

                        {/* Top Action Pills */}
                        <div className="flex flex-wrap items-center gap-2.5">
                            <Link href="/admin" className="sns-btn-outline text-xs">
                                <span className="material-symbols-outlined text-[15px]">arrow_back</span>
                                Dashboard
                            </Link>
                            {!isEditing && (
                                <button
                                    onClick={() => {
                                        setCurrentHotel({ name: '', description: '', image: '', whatsappMessage: '' });
                                        setIsEditing(true);
                                    }}
                                    className="sns-btn-gold text-xs"
                                >
                                    <span className="material-symbols-outlined text-[16px]">add_circle</span>
                                    Add New Hotel
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Section Switcher Tabs */}
                    <div className="flex flex-wrap items-center gap-2 mt-6 pt-5 border-t border-[rgba(226,198,175,0.14)]">
                        <Link href="/admin" className="sns-tab-pill inactive">
                            <span className="material-symbols-outlined text-[16px]">article</span>
                            Stories &amp; Journal
                        </Link>
                        <Link href="/admin/inquiries" className="sns-tab-pill inactive">
                            <span className="material-symbols-outlined text-[16px]">mark_email_unread</span>
                            Client Enquiries
                        </Link>
                        <Link href="/admin/hotels" className="sns-tab-pill active">
                            <span className="material-symbols-outlined text-[16px]">hotel</span>
                            Curated Hotels
                        </Link>
                    </div>
                </header>

                {/* ── FORM OR LISTING ── */}
                {isEditing ? (
                    <div className="sns-card p-6 sm:p-8">
                        <div className="flex items-center justify-between pb-5 mb-6 border-b border-[rgba(226,198,175,0.14)]">
                            <div>
                                <span className="sns-admin-eyebrow">
                                    {currentHotel._id ? 'Update Sanctuary' : 'New Listing'}
                                </span>
                                <h2 className="sns-admin-title text-2xl sm:text-3xl text-white mt-0.5">
                                    {currentHotel._id ? 'Edit Sanctuary' : 'Add Curated Sanctuary'}
                                </h2>
                            </div>
                            <button
                                type="button"
                                onClick={() => setIsEditing(false)}
                                className="sns-btn-outline text-xs"
                            >
                                <span className="material-symbols-outlined text-[14px]">close</span>
                                Close
                            </button>
                        </div>

                        <form onSubmit={handleSave} className="space-y-6">
                            <div>
                                <label className="sns-label">Sanctuary / Hotel Name *</label>
                                <input 
                                    required 
                                    className="sns-input text-base" 
                                    placeholder="e.g. Brijrama Palace, Varanasi"
                                    value={currentHotel.name} 
                                    onChange={e => setCurrentHotel({...currentHotel, name: e.target.value})} 
                                />
                            </div>

                            <div>
                                <label className="sns-label">Description &amp; Highlights *</label>
                                <textarea 
                                    required 
                                    rows={4}
                                    className="sns-input text-sm leading-relaxed" 
                                    placeholder="Describe the atmosphere, ghat proximity, heritage character, and soulful hospitality..."
                                    value={currentHotel.description} 
                                    onChange={e => setCurrentHotel({...currentHotel, description: e.target.value})} 
                                />
                            </div>

                            <div>
                                <label className="sns-label">Sanctuary Imagery *</label>
                                <div className="flex flex-col sm:flex-row items-start gap-5">
                                    <label className="cursor-pointer shrink-0">
                                        <div className={`w-36 h-28 rounded-2xl border-2 border-dashed flex flex-col items-center justify-center gap-1.5 transition-all overflow-hidden bg-[#120b07] ${currentHotel.image ? 'border-[#dfbf80]/60 ring-2 ring-[#dfbf80]/20' : 'border-[rgba(226,198,175,0.22)] hover:border-[#dfbf80]/50'}`}>
                                            {currentHotel.image ? (
                                                /* eslint-disable-next-line @next/next/no-img-element */
                                                <img src={currentHotel.image} alt="Hotel" className="w-full h-full object-cover" />
                                            ) : (
                                                <>
                                                    <span className="material-symbols-outlined text-[24px] text-[#dfbf80]">upload_file</span>
                                                    <span className="text-[#c9b7a8] text-xs font-semibold text-center leading-tight px-2">Upload Photo</span>
                                                </>
                                            )}
                                        </div>
                                        <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} disabled={uploadingImage} />
                                    </label>

                                    <div className="flex-1 w-full space-y-2.5">
                                        <p className="text-[#a89485] text-xs leading-relaxed">
                                            Recommended: <strong className="text-[#f7ede2]">1200×800px</strong> · High resolution · JPG/PNG/WebP
                                        </p>
                                        {uploadingImage && <p className="text-[#dfbf80] text-xs font-semibold animate-pulse flex items-center gap-1.5"><span className="material-symbols-outlined text-[14px]">sync</span> Uploading imagery to media vault…</p>}
                                        <input 
                                            type="url"
                                            className="sns-input text-xs" 
                                            value={currentHotel.image || ''} 
                                            placeholder="Or paste image URL (e.g., https://.../sanctuary.jpg)"
                                            onChange={e => setCurrentHotel({...currentHotel, image: e.target.value})} 
                                        />
                                        {currentHotel.image && (
                                            <button 
                                                type="button" 
                                                onClick={() => setCurrentHotel({...currentHotel, image: ''})} 
                                                className="text-red-400 hover:text-red-300 text-xs flex items-center gap-1 pt-1 transition-colors"
                                            >
                                                <span className="material-symbols-outlined text-[13px]">delete</span>
                                                Remove Image
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="sns-label">Pre-filled WhatsApp Reservation Inquiry (Optional)</label>
                                <input 
                                    className="sns-input text-sm" 
                                    value={currentHotel.whatsappMessage || ''} 
                                    placeholder={`Hi SoilNSoul Travels! I would like to inquire about booking stay at ${currentHotel.name || 'this sanctuary'}.`}
                                    onChange={e => setCurrentHotel({...currentHotel, whatsappMessage: e.target.value})} 
                                />
                                <p className="text-[11px] text-[#a89485] mt-1.5">
                                    Prefilled text sent when travelers click &ldquo;Book via WhatsApp&rdquo; on the website.
                                </p>
                            </div>

                            <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-[rgba(226,198,175,0.14)]">
                                <button type="submit" className="sns-btn-gold">
                                    <span className="material-symbols-outlined text-[16px]">check_circle</span>
                                    Save Sanctuary
                                </button>
                                <button type="button" onClick={() => setIsEditing(false)} className="sns-btn-outline">
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                ) : (
                    <div className="sns-card p-6 sm:p-8">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 mb-6 border-b border-[rgba(226,198,175,0.14)]">
                            <div>
                                <span className="sns-admin-eyebrow">Inventory Catalog</span>
                                <h2 className="sns-admin-title text-2xl sm:text-3xl text-white mt-0.5">
                                    All Curated <em>Stays</em>
                                    <span className="text-sm font-sans font-normal text-[#a89485] ml-3">
                                        ({hotels.length} {hotels.length === 1 ? 'property' : 'properties'})
                                    </span>
                                </h2>
                            </div>
                            <button
                                onClick={() => {
                                    setCurrentHotel({ name: '', description: '', image: '', whatsappMessage: '' });
                                    setIsEditing(true);
                                }}
                                className="sns-btn-gold text-xs self-start sm:self-auto"
                            >
                                <span className="material-symbols-outlined text-[16px]">add_circle</span>
                                Add Hotel
                            </button>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="sns-table-head">
                                        <th className="pb-3.5 px-4 w-20">Sanctuary</th>
                                        <th className="pb-3.5 px-4">Property Name</th>
                                        <th className="pb-3.5 px-4 w-2/5">Curated Description</th>
                                        <th className="pb-3.5 px-4 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {hotels.map(hotel => (
                                        <tr key={hotel._id} className="sns-table-row group">
                                            <td className="py-3.5 px-4">
                                                <div className="w-14 h-14 rounded-xl overflow-hidden bg-[#180e09] border border-[rgba(226,198,175,0.2)] shadow">
                                                    {hotel.image ? (
                                                        /* eslint-disable-next-line @next/next/no-img-element */
                                                        <img src={hotel.image} alt={hotel.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center text-[#a89485]">
                                                            <span className="material-symbols-outlined text-[20px]">hotel</span>
                                                        </div>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="py-3.5 px-4">
                                                <div className="sns-blog-title text-base sm:text-lg">
                                                    {hotel.name}
                                                </div>
                                                {hotel.whatsappMessage && (
                                                    <span className="text-[11px] text-[#dfbf80]/80 font-sans flex items-center gap-1 mt-0.5">
                                                        <span className="material-symbols-outlined text-[12px]">chat</span> WhatsApp prefill configured
                                                    </span>
                                                )}
                                            </td>
                                            <td className="py-3.5 px-4 text-xs sm:text-sm text-[#d6c7ba] line-clamp-2 max-w-sm" title={hotel.description}>
                                                {hotel.description}
                                            </td>
                                            <td className="py-3.5 px-4 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <button
                                                        onClick={() => {
                                                            setCurrentHotel(hotel);
                                                            setIsEditing(true);
                                                        }}
                                                        className="sns-btn-outline text-xs px-3 py-1.5"
                                                        title="Edit Property"
                                                    >
                                                        <span className="material-symbols-outlined text-[14px]">edit</span>
                                                        <span className="hidden sm:inline">Edit</span>
                                                    </button>
                                                    <button
                                                        onClick={() => promptDeleteHotel(hotel._id, hotel.name)}
                                                        className="sns-btn-danger text-xs px-3 py-1.5 cursor-pointer"
                                                        title="Delete Property"
                                                    >
                                                        <span className="material-symbols-outlined text-[14px]">delete</span>
                                                        <span className="hidden sm:inline">Delete</span>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            {hotels.length === 0 && (
                                <div className="text-center py-16 text-[#a89485]">
                                    <div className="w-14 h-14 rounded-full bg-[#dfbf80]/10 border border-[#dfbf80]/20 flex items-center justify-center mx-auto mb-3 text-[#dfbf80]">
                                        <span className="material-symbols-outlined text-2xl">hotel</span>
                                    </div>
                                    <p className="sns-admin-title text-xl text-white">No Curated Hotels Yet</p>
                                    <p className="text-xs text-[#a89485] mt-1 max-w-xs mx-auto">
                                        Click &ldquo;Add Hotel&rdquo; above to list luxury heritage stays and retreats.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>

            {/* Custom Luxury Delete Hotel Confirmation Modal */}
            {deleteHotelCandidate && (
                <div
                    role="dialog"
                    aria-modal="true"
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in"
                    onClick={() => setDeleteHotelCandidate(null)}
                >
                    <div
                        className="bg-[#1c120c] border border-[#dfbf80]/35 rounded-2xl max-w-md w-full p-6 sm:p-7 shadow-2xl text-left relative overflow-hidden"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-[radial-gradient(circle,rgba(223,191,128,0.12),transparent_70%)] pointer-events-none" />
                        <div className="flex items-start gap-4 mb-4 relative z-10">
                            <div className="w-11 h-11 rounded-2xl bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400 shrink-0 shadow-inner">
                                <Trash2 size={20} />
                            </div>
                            <div className="min-w-0 flex-1">
                                <h3 className="sns-admin-title text-xl text-white m-0 font-medium tracking-tight">
                                    Delete Hotel Property?
                                </h3>
                                <p className="text-xs text-[#a89485] m-0 mt-1">
                                    This listing will be permanently removed from recommendations.
                                </p>
                            </div>
                        </div>

                        <p className="text-sm text-[#e2c6af] mb-6 leading-relaxed relative z-10 bg-[#251811]/60 p-3.5 rounded-xl border border-[rgba(226,198,175,0.12)]">
                            Are you sure you want to delete <strong className="text-white font-semibold">"{deleteHotelCandidate.name}"</strong>?
                        </p>

                        <div className="flex items-center justify-end gap-3 relative z-10">
                            <button
                                type="button"
                                onClick={() => setDeleteHotelCandidate(null)}
                                disabled={isDeletingHotel}
                                className="px-4 py-2.5 rounded-xl text-xs font-semibold text-[#c7b4a3] hover:text-white bg-[#251811] hover:bg-[#322117] border border-[rgba(226,198,175,0.2)] transition-all cursor-pointer"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                onClick={confirmDeleteHotel}
                                disabled={isDeletingHotel}
                                className="px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-red-600 hover:bg-red-500 border border-red-400/30 shadow-lg shadow-red-950/50 transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                            >
                                {isDeletingHotel ? 'Deleting…' : 'Delete Property'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
