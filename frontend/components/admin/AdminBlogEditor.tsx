'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import 'react-quill-new/dist/quill.snow.css';
import { API_URL } from '@/lib/constants';

// Need to dynamically import ReactQuill to prevent SSR issues
const ReactQuill = dynamic(
    async () => {
        const { default: RQ } = await import('react-quill-new');
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return function Comp({ forwardedRef, ...props }: any) {
            return <RQ ref={forwardedRef} {...props} />;
        };
    },
    { ssr: false }
);

const CATEGORIES = [
    'General', 'Spirituality', 'Crafts & Culture', 'Wellness', 'Music',
    'Solo Women Travel', 'Travel Guide', 'Rituals', 'Shopping', 'Food',
    'Photography', 'Heritage',
];

export default function AdminBlogEditor() {
    const params = useParams();
    const slug = params?.slug as string | undefined;
    const router = useRouter();
    const [token, setToken] = useState<string | null>(null);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const quillRef = useRef<any>(null);
    const isEditing = Boolean(slug);

    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [uploadingBanner, setUploadingBanner] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [blogId, setBlogId] = useState<string | null>(null);
    const [preview, setPreview] = useState(false);
    const [content, setContent] = useState('');

    const [form, setForm] = useState({
        title: '',
        excerpt: '',
        category: 'General',
        status: 'draft' as 'draft' | 'published',
        tags: '',
        bannerImage: '',
        seoTitle: '',
        seoDescription: '',
        seoKeywords: '',
    });

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (!storedToken) {
            router.push('/hakunamata');
        } else {
            setToken(storedToken);
        }
    }, [router]);

    // ── Image upload handler for Quill inline images ──────────────────────────
    const imageHandler = () => {
        const input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');
        input.click();
        input.onchange = async () => {
            const file = input.files?.[0];
            if (!file) return;
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
                    const imageUrl = data.url.startsWith('http') ? data.url : `${API_URL.replace('/api', '')}${data.url}`;
                    const editor = quillRef.current?.getEditor();
                    if (editor) {
                        const range = editor.getSelection(true);
                        editor.insertEmbed(range.index, 'image', imageUrl);
                        editor.setSelection(range.index + 1, 0);
                    }
                }
            } catch {
                alert('Image upload failed. Check backend connection.');
            }
        };
    };

    // ── Quill toolbar modules ─────────────────────────────────────────────────
    const modules = useMemo(() => ({
        toolbar: {
            container: [
                [{ header: [1, 2, 3, 4, false] }],
                [{ font: [] }],
                [{ size: ['small', false, 'large', 'huge'] }],
                ['bold', 'italic', 'underline', 'strike'],
                [{ color: [] }, { background: [] }],
                [{ align: [] }],
                [{ list: 'ordered' }, { list: 'bullet' }],
                [{ indent: '-1' }, { indent: '+1' }],
                ['blockquote', 'code-block'],
                ['link', 'image'],
                ['clean'],
            ],
            handlers: { image: imageHandler },
        },
        clipboard: { matchVisual: false },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }), [token]);

    const formats = [
        'header', 'font', 'size',
        'bold', 'italic', 'underline', 'strike',
        'color', 'background', 'align',
        'list', 'indent',
        'blockquote', 'code-block',
        'link', 'image',
    ];

    // ── Load blog when editing ────────────────────────────────────────────────
    useEffect(() => {
        if (!isEditing) return;
        setLoading(true);
        fetch(`${API_URL}/blogs/${slug}`)
            .then(r => r.json())
            .then(data => {
                if (data.success && data.blog) {
                    const b = data.blog;
                    setBlogId(b._id);
                    setContent(b.content || '');
                    setForm({
                        title: b.title || '',
                        excerpt: b.excerpt || '',
                        category: b.category || 'General',
                        status: b.status || (b.published ? 'published' : 'draft'),
                        tags: Array.isArray(b.tags) ? b.tags.join(', ') : '',
                        bannerImage: b.bannerImage || '',
                        seoTitle: b.seoTitle || '',
                        seoDescription: b.seoDescription || '',
                        seoKeywords: Array.isArray(b.seoKeywords) ? b.seoKeywords.join(', ') : '',
                    });
                }
            })
            .catch(() => setError('Failed to load blog.'))
            .finally(() => setLoading(false));
    }, [slug, isEditing]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setForm(f => ({ ...f, [e.target.name]: e.target.value }));
    };

    const handleBannerUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setUploadingBanner(true);
        setError('');
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
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                setForm((f: any) => ({ ...f, bannerImage: url }));
            } else {
                setError(data.message || 'Upload failed.');
            }
        } catch {
            setError('Upload failed. Make sure the backend is running.');
        } finally {
            setUploadingBanner(false);
            e.target.value = '';
        }
    };

    const handleSave = async (forcedStatus?: 'draft' | 'published') => {
        const trimmedContent = content.replace(/<(.|\n)*?>/g, '').trim();
        if (!form.title.trim()) { setError('Title is required.'); return; }
        if (!form.excerpt.trim()) { setError('Excerpt is required.'); return; }
        if (!trimmedContent) { setError('Content cannot be empty.'); return; }

        setSaving(true);
        setError('');
        setSuccess('');

        const status = forcedStatus || form.status;
        const payload = {
            title: form.title,
            excerpt: form.excerpt,
            content,
            category: form.category,
            status,
            published: status === 'published',
            bannerImage: form.bannerImage,
            tags: form.tags.split(',').map(t => t.trim()).filter(Boolean),
            seoTitle: form.seoTitle || form.title,
            seoDescription: form.seoDescription,
            seoKeywords: form.seoKeywords.split(',').map(k => k.trim()).filter(Boolean),
        };

        try {
            const url = isEditing && blogId ? `${API_URL}/blogs/${blogId}` : `${API_URL}/blogs`;
            const method = isEditing && blogId ? 'PUT' : 'POST';
            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
                body: JSON.stringify(payload),
            });
            const data = await res.json();
            if (data.success) {
                setSuccess(status === 'published' ? '✨ Published successfully!' : '📝 Saved as draft!');
                setTimeout(() => router.push('/admin'), 1500);
            } else {
                setError(data.message || 'Save failed.');
            }
        } catch {
            setError('Server error. Is the backend running?');
        } finally {
            setSaving(false);
        }
    };

    const slugPreview = form.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    if (!token) return null;

    if (loading) return (
        <div className="min-h-screen sns-admin-root flex flex-col items-center justify-center gap-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
                src="/soil-n-soul-logo.svg"
                alt="SoilNSoul Travels"
                className="h-10 w-auto object-contain brightness-0 invert animate-pulse opacity-80"
            />
            <div className="sns-admin-eyebrow text-[#dfbf80]">Loading Chronicle Editor…</div>
        </div>
    );

    return (
        <div className="sns-admin-root text-slate-100 min-h-screen pb-16">
            {/* ── Top Bar ───────────────────────────────────────────────────────── */}
            <div className="sticky top-0 z-30 bg-[#140d09]/95 backdrop-blur-md border-b border-[rgba(226,198,175,0.14)] px-4 sm:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-4 min-w-0">
                    <Link href="/admin" className="shrink-0 group">
                        <div className="p-2 rounded-xl bg-[#140d09] border border-[#dfbf80]/30 shadow group-hover:border-[#dfbf80]/60 transition-all flex items-center gap-2">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src="/soil-n-soul-logo.svg"
                                alt="SoilNSoul Travels"
                                className="h-7 w-auto object-contain brightness-0 invert drop-shadow-[0_2px_8px_rgba(223,191,128,0.25)]"
                            />
                        </div>
                    </Link>
                    <div className="min-w-0">
                        <div className="flex items-center gap-2">
                            <Link href="/admin" className="text-xs text-[#a89485] hover:text-[#dfbf80] transition-colors flex items-center gap-1 font-semibold uppercase tracking-wider">
                                <span className="material-symbols-outlined text-[13px]">arrow_back</span>
                                Admin
                            </Link>
                            <span className="text-xs text-[#dfbf80]/40">•</span>
                            <span className="sns-admin-eyebrow text-[9px] truncate">
                                {isEditing ? 'Editing Story' : 'New Chronicle'}
                            </span>
                        </div>
                        <h2 className="sns-admin-title text-base sm:text-lg truncate max-w-xs sm:max-w-md mt-0.5">
                            {form.title ? form.title : (isEditing ? slug : 'Untitled Story')}
                        </h2>
                    </div>
                </div>

                <div className="flex flex-wrap items-center gap-2.5">
                    <button 
                        type="button"
                        onClick={() => setPreview(p => !p)}
                        className="sns-btn-outline text-xs px-3.5 py-2"
                    >
                        <span className="material-symbols-outlined text-[15px]">{preview ? 'edit_note' : 'visibility'}</span>
                        {preview ? 'Edit Content' : 'Preview Article'}
                    </button>
                    <button 
                        type="button"
                        onClick={() => handleSave('draft')} 
                        disabled={saving}
                        className="sns-btn-outline text-xs px-3.5 py-2"
                    >
                        <span className="material-symbols-outlined text-[15px]">save</span>
                        Save Draft
                    </button>
                    <button 
                        type="button"
                        onClick={() => handleSave('published')} 
                        disabled={saving}
                        className="sns-btn-gold text-xs px-5 py-2"
                    >
                        <span className="material-symbols-outlined text-[16px]">auto_awesome</span>
                        {saving ? 'Publishing…' : 'Publish Story'}
                    </button>
                </div>
            </div>

            {/* Alerts */}
            <div className="max-w-5xl mx-auto px-4 sm:px-8 mt-5">
                {error && (
                    <div className="bg-red-500/10 border border-red-500/30 text-red-300 rounded-xl p-3.5 flex items-center gap-2.5 text-sm shadow">
                        <span className="material-symbols-outlined text-base text-red-400">error</span>
                        <span>{error}</span>
                    </div>
                )}
                {success && (
                    <div className="bg-[#dfbf80]/15 border border-[#dfbf80]/40 text-[#fffaf4] rounded-xl p-3.5 flex items-center gap-2.5 text-sm shadow">
                        <span className="material-symbols-outlined text-base text-[#dfbf80]">check_circle</span>
                        <span>{success}</span>
                    </div>
                )}
            </div>

            <div className="max-w-5xl mx-auto px-4 sm:px-8 py-6 space-y-6">

                {/* ── CONTENT SECTION ── */}
                <div className="sns-card p-6 sm:p-8 space-y-6">
                    <div className="pb-4 border-b border-[rgba(226,198,175,0.14)] flex items-center justify-between">
                        <div>
                            <span className="sns-admin-eyebrow">Editorial Narrative</span>
                            <h2 className="sns-admin-title text-2xl text-white mt-0.5">
                                Story Title &amp; <em>Narrative</em>
                            </h2>
                        </div>
                    </div>

                    <div className="space-y-5">
                        {/* Title */}
                        <div>
                            <label className="sns-label">
                                Chronicle Title <span className="text-[#dfbf80]">*</span>
                            </label>
                            <input 
                                name="title" 
                                required 
                                value={form.title} 
                                onChange={handleChange}
                                placeholder="e.g. Subah-e-Banaras: Dawn Awakening along the Ancient Ghats"
                                className="sns-input text-lg font-serif" 
                            />
                            {form.title && (
                                <p className="text-xs text-[#a89485] mt-1.5 flex items-center gap-1">
                                    <span className="material-symbols-outlined text-[12px]">link</span>
                                    Canonical URL: <span className="text-[#dfbf80]">/blog/{slugPreview}</span>
                                </p>
                            )}
                        </div>

                        {/* Excerpt */}
                        <div>
                            <div className="flex justify-between items-center mb-1.5">
                                <label className="sns-label mb-0">
                                    Editorial Excerpt / Teaser <span className="text-[#dfbf80]">*</span>
                                </label>
                                <span className={`text-[11px] ${form.excerpt.length > 500 ? 'text-red-400' : 'text-[#a89485]'}`}>
                                    {form.excerpt.length} / 500
                                </span>
                            </div>
                            <textarea 
                                name="excerpt" 
                                rows={3} 
                                value={form.excerpt} 
                                onChange={handleChange}
                                placeholder="A rich, poetic summary that introduces the spirit of this journey..."
                                className="sns-input text-sm leading-relaxed resize-none" 
                            />
                        </div>

                        {/* Quill Editor or HTML Preview */}
                        <div>
                            <label className="sns-label">
                                Chronicle Body <span className="text-[#dfbf80]">*</span>
                            </label>
                            {preview ? (
                                <div className="sns-card-subtle p-8 rounded-2xl min-h-[380px] prose prose-invert max-w-none border border-[#dfbf80]/20">
                                    <div className="text-xs font-semibold uppercase tracking-widest text-[#dfbf80] mb-4 pb-2 border-b border-[rgba(226,198,175,0.15)] flex items-center gap-2">
                                        <span className="material-symbols-outlined text-[16px]">visibility</span>
                                        Live Reader Preview
                                    </div>
                                    <div 
                                        className="text-[#f7ede2] leading-relaxed font-serif text-base space-y-4"
                                        dangerouslySetInnerHTML={{ __html: content || '<p class="text-[#a89485] italic font-sans">No content crafted yet.</p>' }}
                                    />
                                </div>
                            ) : (
                                <div className="sns-quill-wrapper rounded-2xl overflow-hidden border border-[rgba(226,198,175,0.18)]">
                                    <ReactQuill
                                        forwardedRef={quillRef}
                                        theme="snow"
                                        value={content}
                                        onChange={setContent}
                                        modules={modules}
                                        formats={formats}
                                        placeholder="Begin writing your soulful story..."
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* ── FEATURED BANNER IMAGE ── */}
                <div className="sns-card p-6 sm:p-8 space-y-6">
                    <div className="pb-4 border-b border-[rgba(226,198,175,0.14)]">
                        <span className="sns-admin-eyebrow">Visual Heritage</span>
                        <h2 className="sns-admin-title text-2xl text-white mt-0.5">
                            Featured <em>Hero Banner</em>
                        </h2>
                    </div>

                    <div className="flex flex-col sm:flex-row items-start gap-6">
                        {/* Upload box */}
                        <label className="cursor-pointer shrink-0">
                            <div className={`w-40 h-28 rounded-2xl border-2 border-dashed flex flex-col items-center justify-center gap-1.5 transition-all overflow-hidden bg-[#120b07] ${form.bannerImage ? 'border-[#dfbf80]/60 ring-2 ring-[#dfbf80]/20' : 'border-[rgba(226,198,175,0.22)] hover:border-[#dfbf80]/50'}`}>
                                {form.bannerImage ? (
                                    /* eslint-disable-next-line @next/next/no-img-element */
                                    <img src={form.bannerImage} alt="Banner" className="w-full h-full object-cover" />
                                ) : (
                                    <>
                                        <span className="material-symbols-outlined text-[24px] text-[#dfbf80]">add_photo_alternate</span>
                                        <span className="text-[#c9b7a8] text-xs font-semibold text-center leading-tight px-2">Upload Banner</span>
                                    </>
                                )}
                            </div>
                            <input type="file" accept="image/*" className="hidden" onChange={handleBannerUpload} disabled={uploadingBanner} />
                        </label>

                        <div className="flex-1 w-full space-y-2.5">
                            <p className="text-[#a89485] text-xs leading-relaxed">
                                Recommended: <strong className="text-[#f7ede2]">1600×900px</strong> or <strong className="text-[#f7ede2]">1200×630px</strong> · Landscape · Max 5MB · JPG/PNG/WebP
                            </p>
                            {uploadingBanner && <p className="text-[#dfbf80] text-xs font-semibold animate-pulse flex items-center gap-1.5"><span className="material-symbols-outlined text-[14px]">sync</span> Uploading banner imagery…</p>}
                            <input
                                type="url" 
                                name="bannerImage" 
                                value={form.bannerImage} 
                                onChange={handleChange}
                                placeholder="Or enter direct image URL (https://...)"
                                className="sns-input text-xs"
                            />
                            {form.bannerImage && (
                                <button 
                                    type="button" 
                                    onClick={() => setForm(f => ({ ...f, bannerImage: '' }))}
                                    className="text-red-400 hover:text-red-300 text-xs flex items-center gap-1 pt-1 transition-colors"
                                >
                                    <span className="material-symbols-outlined text-[13px]">delete</span>
                                    Remove Banner
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* ── METADATA & TAXONOMY ── */}
                <div className="sns-card p-6 sm:p-8 space-y-6">
                    <div className="pb-4 border-b border-[rgba(226,198,175,0.14)]">
                        <span className="sns-admin-eyebrow">Classification</span>
                        <h2 className="sns-admin-title text-2xl text-white mt-0.5">
                            Category &amp; <em>Publishing State</em>
                        </h2>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-5">
                        <div>
                            <label className="sns-label">Journal Category</label>
                            <div className="relative">
                                <select 
                                    name="category" 
                                    value={form.category} 
                                    onChange={handleChange}
                                    className="sns-input appearance-none pr-10 cursor-pointer"
                                >
                                    {CATEGORIES.map(c => <option key={c} value={c} className="bg-[#180e09] text-white">{c}</option>)}
                                </select>
                                <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-[#dfbf80] pointer-events-none text-lg">
                                    expand_more
                                </span>
                            </div>
                        </div>

                        <div>
                            <label className="sns-label">Publication State</label>
                            <div className="relative">
                                <select 
                                    name="status" 
                                    value={form.status} 
                                    onChange={handleChange}
                                    className="sns-input appearance-none pr-10 cursor-pointer"
                                >
                                    <option value="draft" className="bg-[#180e09] text-[#dfbf80]">Draft (Private)</option>
                                    <option value="published" className="bg-[#180e09] text-emerald-400">Published (Public)</option>
                                </select>
                                <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-[#dfbf80] pointer-events-none text-lg">
                                    expand_more
                                </span>
                            </div>
                        </div>

                        <div className="sm:col-span-2">
                            <label className="sns-label">
                                Topic Tags <span className="text-[#a89485] font-normal lowercase">(comma-separated)</span>
                            </label>
                            <input 
                                name="tags" 
                                value={form.tags} 
                                onChange={handleChange}
                                placeholder="kashi, ganga-aarti, morning-boat, spiritual-travel"
                                className="sns-input text-sm" 
                            />
                        </div>
                    </div>
                </div>

                {/* ── SEO ENHANCEMENT ── */}
                <div className="sns-card p-6 sm:p-8 space-y-6">
                    <div className="pb-4 border-b border-[rgba(226,198,175,0.14)]">
                        <span className="sns-admin-eyebrow">Search Engine Optimization</span>
                        <h2 className="sns-admin-title text-2xl text-white mt-0.5">
                            Search &amp; <em>Social Meta</em>
                        </h2>
                    </div>

                    <div className="space-y-5">
                        <div>
                            <div className="flex justify-between items-center mb-1.5">
                                <label className="sns-label mb-0">Custom SEO Meta Title</label>
                                <span className={`text-[11px] ${form.seoTitle.length > 60 ? 'text-[#dfbf80]' : 'text-[#a89485]'}`}>
                                    {form.seoTitle.length} / 60
                                </span>
                            </div>
                            <input 
                                name="seoTitle" 
                                value={form.seoTitle} 
                                onChange={handleChange}
                                placeholder="Optimal title displayed on Google Search and social cards"
                                className="sns-input text-sm" 
                            />
                        </div>

                        <div>
                            <div className="flex justify-between items-center mb-1.5">
                                <label className="sns-label mb-0">Meta Description</label>
                                <span className={`text-[11px] ${form.seoDescription.length > 160 ? 'text-red-400' : 'text-[#a89485]'}`}>
                                    {form.seoDescription.length} / 160
                                </span>
                            </div>
                            <textarea 
                                name="seoDescription" 
                                rows={2} 
                                value={form.seoDescription} 
                                onChange={handleChange}
                                placeholder="Concise snippet summarizing this chronicle for search results (140-160 characters)"
                                className="sns-input text-sm leading-relaxed resize-none" 
                            />
                        </div>

                        <div>
                            <label className="sns-label">SEO Keywords (comma-separated)</label>
                            <input 
                                name="seoKeywords" 
                                value={form.seoKeywords} 
                                onChange={handleChange}
                                placeholder="varanasi travel, luxury spiritual experience, ghats guide"
                                className="sns-input text-sm" 
                            />
                        </div>
                    </div>
                </div>

                {/* ── Bottom Save Action Bar ── */}
                <div className="flex flex-wrap items-center justify-end gap-3 pt-4">
                    <Link href="/admin" className="sns-btn-outline text-xs">
                        Cancel &amp; Return
                    </Link>
                    <button 
                        type="button" 
                        onClick={() => handleSave('draft')} 
                        disabled={saving}
                        className="sns-btn-outline text-xs"
                    >
                        <span className="material-symbols-outlined text-[15px]">save</span>
                        Save Draft
                    </button>
                    <button 
                        type="button" 
                        onClick={() => handleSave('published')} 
                        disabled={saving}
                        className="sns-btn-gold text-xs px-6 py-2.5"
                    >
                        <span className="material-symbols-outlined text-[16px]">auto_awesome</span>
                        {saving ? 'Publishing…' : 'Publish Story'}
                    </button>
                </div>
            </div>
        </div>
    );
}
