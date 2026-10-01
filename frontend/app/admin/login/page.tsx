'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { API_URL } from '@/lib/constants';
import '../admin-theme.css';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (data.success) {
        localStorage.setItem('token', data.token);
        router.push('/admin');
      } else {
        setError(data.message || 'Invalid credentials');
      }
    } catch {
      setError('Cannot reach the server. Please ensure the backend is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="sns-admin-root min-h-screen flex items-center justify-center p-4 sm:p-6 relative overflow-hidden">
      {/* Decorative ambient radial glows */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[radial-gradient(circle,rgba(217,173,87,0.12),transparent_70%)] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-96 h-96 bg-[radial-gradient(circle,rgba(145,52,30,0.14),transparent_70%)] pointer-events-none" />

      <div className="max-w-md w-full sns-card p-8 sm:p-10 relative z-10">
        {/* Brand Logo */}
        <div className="flex flex-col items-center text-center mb-7">
          <div className="p-3.5 rounded-2xl bg-[#140d09] border border-[#dfbf80]/35 shadow-2xl mb-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/soil-n-soul-logo.svg"
              alt="SoilNSoul Travels"
              className="h-11 sm:h-12 w-auto object-contain brightness-0 invert drop-shadow-[0_2px_12px_rgba(223,191,128,0.35)]"
            />
          </div>
          <span className="sns-admin-eyebrow text-[10px]">
            Executive Portal • SoilNSoul Travels
          </span>
          <h1 className="sns-admin-title text-2xl sm:text-3xl mt-1">
            Admin <em>Authentication</em>
          </h1>
          <p className="text-xs text-[#a89485] mt-1 max-w-xs">
            Sign in to curate soul journeys, review travel inquiries, and publish stories.
          </p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-300 text-xs p-3.5 rounded-xl mb-5 flex items-center gap-2.5 shadow">
            <span className="material-symbols-outlined text-base text-red-400">error</span>
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="sns-label">
              Admin Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="sns-input text-sm"
              placeholder="admin@soilnsoul.in"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="sns-label mb-0">
                Password
              </label>
            </div>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="sns-input text-sm"
              placeholder="••••••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="sns-btn-gold w-full py-3.5 text-xs font-bold tracking-widest mt-2 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {loading ? (
              <>
                <span className="material-symbols-outlined text-base animate-spin">progress_activity</span>
                <span>Authenticating…</span>
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-[17px]">lock_open</span>
                <span>Enter Admin Sanctuary</span>
              </>
            )}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-[rgba(226,198,175,0.14)] text-center">
          <Link
            href="/"
            className="text-xs text-[#a89485] hover:text-[#dfbf80] transition-colors inline-flex items-center gap-1.5 font-medium"
          >
            <span className="material-symbols-outlined text-[14px]">arrow_back</span>
            Return to Public Website
          </Link>
        </div>
      </div>
    </div>
  );
}
