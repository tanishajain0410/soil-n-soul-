'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import AdminInquiries from '@/components/admin/AdminInquiries';

export default function AdminInquiriesPage() {
    const router = useRouter();
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (!storedToken) {
            router.push('/admin/login');
        } else {
            setToken(storedToken);
        }
    }, [router]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        router.push('/admin/login');
    };

    if (!token) return null;

    return (
        <div className="sns-admin-root py-10 sm:py-14 px-4 sm:px-8">
            <div className="max-w-6xl mx-auto space-y-8">
                {/* ── Header ── */}
                <header className="flex flex-wrap justify-between items-center pb-6 border-b border-[rgba(226,198,175,0.18)] gap-6">
                    <div className="flex items-center gap-4">
                        <Link href="/admin" className="block shrink-0">
                            <img
                                src="/soil-n-soul-logo.svg"
                                alt="SoilNSoul Travels"
                                className="h-10 w-auto object-contain hover:opacity-90 transition-opacity"
                            />
                        </Link>
                        <div className="h-8 w-px bg-[rgba(226,198,175,0.2)] hidden sm:block" />
                        <div>
                            <Link href="/admin" className="sns-admin-eyebrow hover:text-white transition-colors flex items-center gap-1 mb-0.5">
                                <span className="material-symbols-outlined text-[13px]">arrow_back</span> Back to Dashboard
                            </Link>
                            <h1 className="sns-admin-title text-2xl sm:text-3xl m-0 leading-tight">
                                Customer <em>Enquiries &amp; Queries</em>
                            </h1>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <Link href="/admin" className="sns-btn-outline">
                            <span className="material-symbols-outlined text-[15px]">article</span>
                            <span>Editorial &amp; Blogs</span>
                        </Link>
                        <Link href="/admin/hotels" className="sns-btn-outline">
                            <span className="material-symbols-outlined text-[15px]">hotel</span>
                            <span>Manage Hotels</span>
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

                <AdminInquiries token={token} />
            </div>
        </div>
    );
}
