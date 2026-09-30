'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { API_URL } from '@/lib/constants';
import AdminInquiries from '@/components/admin/AdminInquiries';
import { getInquiries } from '@/lib/inquiries';
import { Trash2, Pencil } from 'lucide-react';

type RevalStatus = 'idle' | 'loading' | 'success' | 'error';
type TabType = 'inquiries' | 'blogs';

export default function AdminDashboard() {
    const router = useRouter();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [blogs, setBlogs] = useState<any[]>([]);
    const [revalStatus, setRevalStatus] = useState<RevalStatus>('idle');
    const [token, setToken] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState<TabType>('inquiries');
    const [newInquiriesCount, setNewInquiriesCount] = useState<number>(0);
    const [blogStatusFilter, setBlogStatusFilter] = useState<'all' | 'published' | 'draft'>('all');
    const [blogCategoryFilter, setBlogCategoryFilter] = useState<string>('all');
    const [blogSearch, setBlogSearch] = useState<string>('');
    const [deleteBlogCandidate, setDeleteBlogCandidate] = useState<{ id: string; title: string } | null>(null);
    const [isDeletingBlog, setIsDeletingBlog] = useState(false);

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (!storedToken) {
            router.push('/hakunamata');
        } else {
            setToken(storedToken);
            fetchBlogs();
            fetchInquiryStats(storedToken);
        }
    }, [router]);

    const fetchBlogs = () => {
        fetch(`${API_URL}/blogs`)
            .then(res => res.json())
            .then(data => {
                if (data.success) setBlogs(data.blogs);
            })
            .catch(err => console.error(err));
    };

    const fetchInquiryStats = async (authToken: string) => {
        try {
            const data = await getInquiries(authToken, { status: 'new' });
            if (data.success && data.stats) {
                setNewInquiriesCount(data.stats.newCount || 0);
            }
        } catch (err) {
            console.error('Error fetching inquiry stats:', err);
        }
    };

    const promptDeleteBlog = (id: string, title: string) => {
        setDeleteBlogCandidate({ id, title });
    };

    const confirmDeleteBlog = async () => {
        if (!deleteBlogCandidate) return;
        setIsDeletingBlog(true);
        try {
            const res = await fetch(`${API_URL}/blogs/${deleteBlogCandidate.id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await res.json();
            if (data.success) {
                setBlogs(blogs.filter(b => b._id !== deleteBlogCandidate.id));
                setDeleteBlogCandidate(null);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setIsDeletingBlog(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        router.push('/hakunamata');
    };

    /**
     * On-demand revalidation
     */
    const handleRevalidate = async () => {
        setRevalStatus('loading');
        try {
            const res = await fetch('/api/revalidate', {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}` },
            });
            const data = await res.json();
            if (data.success) {
                setRevalStatus('success');
                fetchBlogs();
            } else {
                setRevalStatus('error');
            }
        } catch {
            setRevalStatus('error');
        } finally {
            setTimeout(() => setRevalStatus('idle'), 3500);
        }
    };

    const categories = Array.from(
        new Set(blogs.map(b => b.category?.trim()).filter(Boolean))
    ).sort();

    const publishedCount = blogs.filter(b => b.status === 'published').length;
    const draftCount = blogs.filter(b => b.status !== 'published').length;

    const filteredBlogs = blogs.filter(blog => {
        // Status filter
        const status = blog.status === 'published' ? 'published' : 'draft';
        if (blogStatusFilter !== 'all' && status !== blogStatusFilter) {
            return false;
        }
        // Category filter
        if (blogCategoryFilter !== 'all' && blog.category?.trim().toLowerCase() !== blogCategoryFilter.toLowerCase()) {
            return false;
        }
        // Search filter
        if (blogSearch.trim()) {
            const query = blogSearch.toLowerCase();
            const matchesTitle = blog.title?.toLowerCase().includes(query);
            const matchesSlug = blog.slug?.toLowerCase().includes(query);
            const matchesCat = blog.category?.toLowerCase().includes(query);
            if (!matchesTitle && !matchesSlug && !matchesCat) return false;
        }
        return true;
    });

    if (!token) return null;

    return (
        <div className="sns-admin-root py-10 sm:py-14 px-4 sm:px-8">
            <div className="max-w-6xl mx-auto space-y-8">
                {/* ── Top Header ── */}
                <header className="flex flex-wrap justify-between items-center pb-6 border-b border-[rgba(226,198,175,0.18)] gap-6">
                    <div className="flex items-center gap-4">
                        <Link href="/" target="_blank" className="block shrink-0">
                            <img
                                src="/soil-n-soul-logo.svg"
                                alt="SoilNSoul Travels"
                                className="h-10 w-auto object-contain hover:opacity-90 transition-opacity"
                            />
                        </Link>
                        <div className="h-8 w-px bg-[rgba(226,198,175,0.2)] hidden sm:block" />
                        <div>
                            <span className="sns-admin-eyebrow block mb-0.5">ADMIN CONCIERGE &amp; CMS</span>
                            <h1 className="sns-admin-title text-2xl sm:text-3xl m-0 leading-tight">
                                Editorial <em>&amp; Operations</em>
                            </h1>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <Link
                            href="/"
                            target="_blank"
                            className="sns-btn-outline"
                        >
                            <span>Live Website</span>
                            <span className="material-symbols-outlined text-[15px]">open_in_new</span>
                        </Link>
                        <button
                            onClick={handleLogout}
                            className="sns-btn-outline hover:!border-red-400/40 hover:!text-red-300"
                        >
                            <span>Logout</span>
                            <span className="material-symbols-outlined text-[16px]">logout</span>
                        </button>
                    </div>
                </header>

                {/* ── Navigation Tabs ── */}
                <div className="flex flex-wrap items-center gap-3 pb-2">
                    <button
                        onClick={() => setActiveTab('inquiries')}
                        className={`sns-tab-pill ${activeTab === 'inquiries' ? 'active' : 'inactive'}`}
                    >
                        <span className="material-symbols-outlined text-[18px]">mark_email_unread</span>
                        <span>Customer Enquiries</span>
                        {newInquiriesCount > 0 && (
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${
                                activeTab === 'inquiries' ? 'bg-[#1a0e08] text-[#dfbf80]' : 'bg-[#d9ad57] text-[#1a0e08] animate-pulse'
                            }`}>
                                {newInquiriesCount} new
                            </span>
                        )}
                    </button>

                    <button
                        onClick={() => setActiveTab('blogs')}
                        className={`sns-tab-pill ${activeTab === 'blogs' ? 'active' : 'inactive'}`}
                    >
                        <span className="material-symbols-outlined text-[18px]">article</span>
                        <span>Editorial &amp; Blogs</span>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                            activeTab === 'blogs' ? 'bg-[#1a0e08] text-[#dfbf80]' : 'bg-white/10 text-slate-300'
                        }`}>
                            {blogs.length}
                        </span>
                    </button>

                    <Link
                        href="/admin/hotels"
                        className="sns-btn-outline ml-auto hidden sm:inline-flex"
                    >
                        <span className="material-symbols-outlined text-[17px]">hotel</span>
                        <span>Manage Stays &amp; Hotels</span>
                    </Link>
                </div>

                {/* ── Tab Content ── */}
                {activeTab === 'inquiries' ? (
                    <div className="animate-in fade-in duration-200">
                        <AdminInquiries token={token} />
                    </div>
                ) : (
                    <div className="animate-in fade-in duration-200 space-y-8">
                        {/* ── ISR Revalidation Banner ── */}
                        <div className="sns-card p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 border border-[rgba(226,198,175,0.2)]">
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1.5">
                                    <span className="material-symbols-outlined text-[#dfbf80] text-[20px]">autorenew</span>
                                    <h3 className="sns-admin-title text-xl text-white m-0">
                                        Instant Cache <em>Revalidation</em>
                                    </h3>
                                </div>
                                <p className="text-[#c7b8aa] text-xs sm:text-sm leading-relaxed max-w-2xl m-0">
                                    Published or edited an article? Clear the edge cache so travelers receive the latest content instantly across the live website without server restarts.
                                </p>
                            </div>
                            <button
                                onClick={handleRevalidate}
                                disabled={revalStatus === 'loading'}
                                className={
                                    revalStatus === 'success'
                                        ? 'sns-btn-gold !bg-emerald-600 !text-white'
                                        : revalStatus === 'error'
                                        ? 'sns-btn-outline !border-red-400 !text-red-300'
                                        : 'sns-btn-gold'
                                }
                            >
                                {revalStatus === 'loading' && <span className="material-symbols-outlined text-[16px] animate-spin">autorenew</span>}
                                {revalStatus === 'success' && <span className="material-symbols-outlined text-[16px]">check_circle</span>}
                                {revalStatus === 'error' && <span className="material-symbols-outlined text-[16px]">error</span>}
                                {revalStatus === 'idle' && <span className="material-symbols-outlined text-[16px]">autorenew</span>}
                                <span>{revalStatus === 'loading' ? 'Clearing Cache...' : revalStatus === 'success' ? 'Cache Cleared ✓' : revalStatus === 'error' ? 'Failed — Retry' : 'Revalidate Cache'}</span>
                            </button>
                        </div>

                        {/* ── Blogs Table ── */}
                        <div className="sns-card p-6 sm:p-8">
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                                <div>
                                    <span className="sns-admin-eyebrow block mb-1">CURATED EDITORIAL</span>
                                    <h2 className="sns-admin-title text-2xl sm:text-3xl m-0">All <em>Stories &amp; Guides</em></h2>
                                    <p className="text-xs text-[#a89485] mt-1.5">
                                        Showing {filteredBlogs.length} of {blogs.length} articles in database
                                    </p>
                                </div>
                                <div className="flex flex-wrap items-center gap-3">
                                    <Link
                                        href="/admin/hotels"
                                        className="sns-btn-outline"
                                    >
                                        <span className="material-symbols-outlined text-[16px]">hotel</span>
                                        <span>Manage Hotels</span>
                                    </Link>
                                    <Link
                                        href="/admin/blog/new"
                                        className="sns-btn-gold"
                                    >
                                        <span className="material-symbols-outlined text-[17px]">add_circle</span>
                                        <span>New Story</span>
                                    </Link>
                                </div>
                            </div>

                            {/* ── Blog Filter Controls: Category, Published, Draft ── */}
                            <div className="sns-card-subtle p-4 mb-6 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
                                {/* Status Filters: All, Published, Draft */}
                                <div className="flex flex-wrap items-center gap-2">
                                    <span className="text-[11px] uppercase tracking-wider text-[#a89485] font-bold mr-1">Status:</span>
                                    <button
                                        type="button"
                                        onClick={() => setBlogStatusFilter('all')}
                                        className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
                                            blogStatusFilter === 'all'
                                                ? 'bg-[#d9ad57] text-[#1a0e08] shadow-sm font-extrabold'
                                                : 'bg-white/5 hover:bg-white/10 text-[#d4c5b8] border border-white/5'
                                        }`}
                                    >
                                        <span>All</span>
                                        <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                                            blogStatusFilter === 'all' ? 'bg-[#1a0e08]/20 text-[#1a0e08]' : 'bg-white/10 text-slate-300'
                                        }`}>
                                            {blogs.length}
                                        </span>
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => setBlogStatusFilter('published')}
                                        className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
                                            blogStatusFilter === 'published'
                                                ? 'bg-emerald-600 text-white shadow-md'
                                                : 'bg-emerald-600/10 hover:bg-emerald-600/20 text-emerald-300 border border-emerald-500/25'
                                        }`}
                                    >
                                        <span className="w-2 h-2 rounded-full bg-emerald-400" />
                                        <span>Published</span>
                                        <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                                            blogStatusFilter === 'published' ? 'bg-black/30 text-white' : 'bg-emerald-500/20 text-emerald-300'
                                        }`}>
                                            {publishedCount}
                                        </span>
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => setBlogStatusFilter('draft')}
                                        className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
                                            blogStatusFilter === 'draft'
                                                ? 'bg-[#d9ad57] text-[#1a0e08] shadow-md font-extrabold'
                                                : 'bg-[#d9ad57]/10 hover:bg-[#d9ad57]/20 text-[#dfbf80] border border-[#d9ad57]/25'
                                        }`}
                                    >
                                        <span className="w-2 h-2 rounded-full bg-[#dfbf80]" />
                                        <span>Draft</span>
                                        <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                                            blogStatusFilter === 'draft' ? 'bg-[#1a0e08]/20 text-[#1a0e08]' : 'bg-[#dfbf80]/20 text-[#dfbf80]'
                                        }`}>
                                            {draftCount}
                                        </span>
                                    </button>
                                </div>

                                {/* Right: Category Dropdown & Search */}
                                <div className="flex flex-wrap sm:flex-nowrap items-center gap-3">
                                    {/* Category Filter Dropdown */}
                                    <div className="flex items-center gap-2 w-full sm:w-auto">
                                        <span className="text-[11px] uppercase tracking-wider text-[#a89485] font-bold whitespace-nowrap">Category:</span>
                                        <div className="relative w-full sm:w-auto">
                                            <select
                                                value={blogCategoryFilter}
                                                onChange={(e) => setBlogCategoryFilter(e.target.value)}
                                                className="w-full sm:w-auto bg-[#23140d] border border-[rgba(226,198,175,0.2)] hover:border-[#dfbf80]/40 focus:border-[#dfbf80] text-[#f7ede2] text-xs font-medium rounded-full pl-4 pr-9 py-2 outline-none cursor-pointer appearance-none transition-colors"
                                            >
                                                <option value="all">All Categories ({blogs.length})</option>
                                                {categories.map((cat) => {
                                                    const count = blogs.filter(b => b.category?.trim().toLowerCase() === cat.toLowerCase()).length;
                                                    return (
                                                        <option key={cat} value={cat}>
                                                            {cat} ({count})
                                                        </option>
                                                    );
                                                })}
                                            </select>
                                            <span className="material-symbols-outlined text-[#dfbf80] text-base absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                                                expand_more
                                            </span>
                                        </div>
                                    </div>

                                    {/* Search Input */}
                                    <div className="relative w-full sm:w-56">
                                        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#a89485] text-base">
                                            search
                                        </span>
                                        <input
                                            type="text"
                                            placeholder="Search stories..."
                                            value={blogSearch}
                                            onChange={(e) => setBlogSearch(e.target.value)}
                                            className="w-full bg-[#23140d] border border-[rgba(226,198,175,0.2)] focus:border-[#dfbf80] rounded-full pl-9 pr-8 py-2 text-xs text-white placeholder:text-[#8e7a6d] outline-none transition-all"
                                        />
                                        {blogSearch && (
                                            <button
                                                type="button"
                                                onClick={() => setBlogSearch('')}
                                                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#a89485] hover:text-white"
                                            >
                                                <span className="material-symbols-outlined text-xs">close</span>
                                            </button>
                                        )}
                                    </div>

                                    {/* Reset Button */}
                                    {(blogStatusFilter !== 'all' || blogCategoryFilter !== 'all' || blogSearch.trim() !== '') && (
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setBlogStatusFilter('all');
                                                setBlogCategoryFilter('all');
                                                setBlogSearch('');
                                            }}
                                            className="text-xs text-[#dfbf80] hover:text-white underline font-semibold whitespace-nowrap"
                                        >
                                            Reset
                                        </button>
                                    )}
                                </div>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="sns-table-head">
                                            <th className="pb-3 px-4">Story Title</th>
                                            <th className="pb-3 px-4">Category</th>
                                            <th className="pb-3 px-4">Status</th>
                                            <th className="pb-3 px-4">Published Date</th>
                                            <th className="pb-3 px-4 text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredBlogs.map(blog => (
                                            <tr key={blog._id} className="sns-table-row group">
                                                <td className="py-4 px-4">
                                                    <p className="sns-blog-title m-0">{blog.title}</p>
                                                    <p className="sns-blog-slug mt-1 m-0">/blog/{blog.slug}</p>
                                                </td>
                                                <td className="py-4 px-4 text-xs text-[#d6c7ba] font-medium">{blog.category}</td>
                                                <td className="py-4 px-4">
                                                    {blog.status === 'published' ? (
                                                        <span className="sns-badge-published">
                                                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                                                            published
                                                        </span>
                                                    ) : (
                                                        <span className="sns-badge-draft">
                                                            <span className="w-1.5 h-1.5 rounded-full bg-[#dfbf80]" />
                                                            {blog.status || 'draft'}
                                                        </span>
                                                    )}
                                                </td>
                                                <td className="py-4 px-4 text-xs text-[#a89485]">
                                                    {new Date(blog.createdAt).toLocaleDateString('en-US', {
                                                        year: 'numeric',
                                                        month: 'short',
                                                        day: 'numeric',
                                                    })}
                                                </td>
                                                <td className="py-4 px-4 text-right">
                                                    <div className="flex items-center justify-end gap-2 sm:gap-2.5 opacity-100 sm:opacity-80 sm:group-hover:opacity-100 transition-opacity">
                                                        <Link
                                                            href={`/admin/blog/edit/${blog.slug}`}
                                                            className="w-8 h-8 rounded-full bg-white/5 hover:bg-[#d9ad57]/20 border border-[rgba(226,198,175,0.15)] hover:border-[#d9ad57]/40 text-[#dfbf80] flex items-center justify-center transition-all hover:scale-105 shrink-0"
                                                            title="Edit Story"
                                                        >
                                                            <Pencil size={14} className="shrink-0" />
                                                        </Link>
                                                        <button
                                                            onClick={() => promptDeleteBlog(blog._id, blog.title)}
                                                            className="w-8 h-8 rounded-full bg-red-500/15 hover:bg-red-500/25 border border-red-500/30 text-red-400 flex items-center justify-center transition-all hover:scale-105 cursor-pointer shrink-0"
                                                            title="Delete Story"
                                                        >
                                                            <Trash2 size={14} className="shrink-0" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>

                                {filteredBlogs.length === 0 && (
                                    <div className="text-center py-14 text-[#a89485] text-sm">
                                        {blogs.length === 0 ? (
                                            <p>No stories found. Click the button above to create one.</p>
                                        ) : (
                                            <div className="space-y-2">
                                                <p className="text-white font-semibold font-serif text-lg">No stories matched your filter criteria.</p>
                                                <p className="text-xs text-[#a89485]">
                                                    {blogStatusFilter !== 'all' ? `Status: "${blogStatusFilter}"` : ''} 
                                                    {blogCategoryFilter !== 'all' ? ` • Category: "${blogCategoryFilter}"` : ''}
                                                    {blogSearch.trim() ? ` • Search: "${blogSearch}"` : ''}
                                                </p>
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        setBlogStatusFilter('all');
                                                        setBlogCategoryFilter('all');
                                                        setBlogSearch('');
                                                    }}
                                                    className="mt-2 text-xs text-[#dfbf80] hover:underline font-semibold"
                                                >
                                                    Reset all filters
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}

            </div>

            {/* Custom Luxury Delete Blog Confirmation Modal */}
            {deleteBlogCandidate && (
                <div
                    role="dialog"
                    aria-modal="true"
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in"
                    onClick={() => setDeleteBlogCandidate(null)}
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
                                    Delete Blog Story?
                                </h3>
                                <p className="text-xs text-[#a89485] m-0 mt-1">
                                    This story will be permanently removed from publication.
                                </p>
                            </div>
                        </div>

                        <p className="text-sm text-[#e2c6af] mb-6 leading-relaxed relative z-10 bg-[#251811]/60 p-3.5 rounded-xl border border-[rgba(226,198,175,0.12)]">
                            Are you sure you want to delete <strong className="text-white font-semibold">"{deleteBlogCandidate.title}"</strong>?
                        </p>

                        <div className="flex items-center justify-end gap-3 relative z-10">
                            <button
                                type="button"
                                onClick={() => setDeleteBlogCandidate(null)}
                                disabled={isDeletingBlog}
                                className="px-4 py-2.5 rounded-xl text-xs font-semibold text-[#c7b4a3] hover:text-white bg-[#251811] hover:bg-[#322117] border border-[rgba(226,198,175,0.2)] transition-all cursor-pointer"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                onClick={confirmDeleteBlog}
                                disabled={isDeletingBlog}
                                className="px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-red-600 hover:bg-red-500 border border-red-400/30 shadow-lg shadow-red-950/50 transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                            >
                                {isDeletingBlog ? 'Deleting…' : 'Delete Story'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
