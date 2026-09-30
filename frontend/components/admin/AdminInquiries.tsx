'use client';

import React, { useEffect, useState, useCallback } from 'react';
import {
  Inquiry,
  InquiryStats,
  getInquiries,
  updateInquiry,
  deleteInquiry,
} from '@/lib/inquiries';

interface AdminInquiriesProps {
  token: string;
}

export default function AdminInquiries({ token }: AdminInquiriesProps) {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [stats, setStats] = useState<InquiryStats>({
    total: 0,
    newCount: 0,
    contactedCount: 0,
    resolvedCount: 0,
  });
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [expandedNotes, setExpandedNotes] = useState<Record<string, boolean>>({});
  const [notesDrafts, setNotesDrafts] = useState<Record<string, string>>({});
  const [savingNoteId, setSavingNoteId] = useState<string | null>(null);

  const fetchInquiriesData = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    try {
      const data = await getInquiries(token, {
        status: activeFilter,
        search: searchQuery,
      });
      if (data.success) {
        setInquiries(data.inquiries || []);
        if (data.stats) {
          setStats(data.stats);
        }
      }
    } catch (err) {
      console.error('Error loading inquiries:', err);
    } finally {
      setLoading(false);
    }
  }, [token, activeFilter, searchQuery]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchInquiriesData();
    }, 250);
    return () => clearTimeout(timer);
  }, [fetchInquiriesData]);

  const handleStatusChange = async (
    id: string,
    newStatus: 'new' | 'contacted' | 'resolved' | 'archived'
  ) => {
    setActionLoading(id);
    try {
      const res = await updateInquiry(id, token, { status: newStatus });
      if (res.success && res.inquiry) {
        setInquiries((prev) =>
          prev.map((item) => (item._id === id ? { ...item, status: newStatus } : item))
        );
        // Refresh counts
        getInquiries(token, { status: 'all' }).then((d) => {
          if (d.success && d.stats) setStats(d.stats);
        });
      } else {
        alert(res.message || 'Failed to update status');
      }
    } catch {
      alert('Error updating status');
    } finally {
      setActionLoading(null);
    }
  };

  const handleSaveNote = async (id: string) => {
    const noteText = notesDrafts[id] !== undefined ? notesDrafts[id] : '';
    setSavingNoteId(id);
    try {
      const res = await updateInquiry(id, token, { notes: noteText });
      if (res.success) {
        setInquiries((prev) =>
          prev.map((item) => (item._id === id ? { ...item, notes: noteText } : item))
        );
      } else {
        alert(res.message || 'Failed to save note');
      }
    } catch {
      alert('Error saving note');
    } finally {
      setSavingNoteId(null);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!window.confirm(`Are you sure you want to delete the enquiry from "${name}"?`)) {
      return;
    }
    setActionLoading(id);
    try {
      const res = await deleteInquiry(id, token);
      if (res.success) {
        setInquiries((prev) => prev.filter((item) => item._id !== id));
        // Refresh counts
        getInquiries(token, { status: 'all' }).then((d) => {
          if (d.success && d.stats) setStats(d.stats);
        });
      } else {
        alert(res.message || 'Failed to delete');
      }
    } catch {
      alert('Error deleting enquiry');
    } finally {
      setActionLoading(null);
    }
  };

  const getCleanPhoneForWhatsApp = (phoneStr: string) => {
    let cleaned = phoneStr.replace(/\D/g, '');
    if (cleaned.length === 10) {
      cleaned = '91' + cleaned;
    }
    return cleaned;
  };

  const formatSource = (source?: string) => {
    switch (source) {
      case 'journey_enquiry':
        return 'Journey Enquiry';
      case 'journeys_page':
        return 'Journeys Page';
      case 'contact_page':
        return 'Contact Page';
      case 'lead_modal':
        return 'Popup Modal';
      case 'service_modal':
        return 'Service Modal';
      case 'service_detail':
        return 'Service Detail';
      case 'newsletter_form':
        return 'Newsletter';
      default:
        return source || 'Website';
    }
  };

  const formatDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      return date.toLocaleString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="space-y-6">
      {/* ── Stat Cards ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Inquiries */}
        <div
          onClick={() => setActiveFilter('all')}
          className={`cursor-pointer sns-card p-4 sm:p-5 transition-all hover:border-[rgba(226,198,175,0.38)] ${
            activeFilter === 'all' ? '!border-[#dfbf80] shadow-lg shadow-[#dfbf80]/15' : ''
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] uppercase font-bold tracking-wider text-[#a89485]">
              Total Queries
            </span>
            <span className="material-symbols-outlined text-[#dfbf80] text-xl">contact_mail</span>
          </div>
          <p className="sns-admin-title text-3xl sm:text-4xl text-white m-0 font-normal">{stats.total}</p>
          <span className="text-[11px] text-[#a89485] mt-1.5 block">All incoming customer leads</span>
        </div>

        {/* New / Action Required */}
        <div
          onClick={() => setActiveFilter('new')}
          className={`cursor-pointer sns-card p-4 sm:p-5 transition-all hover:border-[rgba(226,198,175,0.38)] ${
            activeFilter === 'new'
              ? '!border-[#dfbf80] shadow-lg shadow-[#dfbf80]/20 bg-gradient-to-br from-[#dfbf80]/10 to-transparent'
              : ''
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-[#dfbf80] text-[10px] uppercase font-bold tracking-wider flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#dfbf80] animate-ping" />
              New / Unread
            </span>
            <span className="material-symbols-outlined text-[#dfbf80] text-xl">mark_email_unread</span>
          </div>
          <p className="sns-admin-title text-3xl sm:text-4xl text-[#dfbf80] m-0 font-normal">{stats.newCount}</p>
          <span className="text-[11px] text-[#dfbf80]/80 mt-1.5 block">Requires prompt reply</span>
        </div>

        {/* Contacted */}
        <div
          onClick={() => setActiveFilter('contacted')}
          className={`cursor-pointer sns-card p-4 sm:p-5 transition-all hover:border-[rgba(226,198,175,0.38)] ${
            activeFilter === 'contacted'
              ? '!border-sky-400 shadow-lg shadow-sky-500/20 bg-sky-500/5'
              : ''
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-sky-300 text-[10px] uppercase font-bold tracking-wider">
              In Contact
            </span>
            <span className="material-symbols-outlined text-sky-400 text-xl">forum</span>
          </div>
          <p className="sns-admin-title text-3xl sm:text-4xl text-sky-300 m-0 font-normal">{stats.contactedCount}</p>
          <span className="text-[11px] text-sky-300/80 mt-1.5 block">Discussion in progress</span>
        </div>

        {/* Resolved */}
        <div
          onClick={() => setActiveFilter('resolved')}
          className={`cursor-pointer sns-card p-4 sm:p-5 transition-all hover:border-[rgba(226,198,175,0.38)] ${
            activeFilter === 'resolved'
              ? '!border-emerald-400 shadow-lg shadow-emerald-500/20 bg-emerald-500/5'
              : ''
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-emerald-300 text-[10px] uppercase font-bold tracking-wider">
              Resolved / Booked
            </span>
            <span className="material-symbols-outlined text-emerald-400 text-xl">check_circle</span>
          </div>
          <p className="sns-admin-title text-3xl sm:text-4xl text-emerald-300 m-0 font-normal">{stats.resolvedCount}</p>
          <span className="text-[11px] text-emerald-300/80 mt-1.5 block">Successfully fulfilled</span>
        </div>
      </div>

      {/* ── Search, Filter Tabs & Refresh Bar ── */}
      <div className="sns-card-subtle p-4 rounded-2xl flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-[#a89485] text-base">
            search
          </span>
          <input
            type="text"
            placeholder="Search queries by name, phone, email, journey..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#23140d] border border-[rgba(226,198,175,0.2)] focus:border-[#dfbf80] rounded-full pl-10 pr-8 py-2 text-xs text-white placeholder:text-[#8e7a6d] outline-none transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#a89485] hover:text-white"
            >
              <span className="material-symbols-outlined text-xs">close</span>
            </button>
          )}
        </div>

        {/* Filter Pills & Refresh */}
        <div className="flex flex-wrap items-center gap-2">
          {[
            { id: 'all', label: 'All', count: stats.total },
            { id: 'new', label: 'New', count: stats.newCount },
            { id: 'contacted', label: 'Contacted', count: stats.contactedCount },
            { id: 'resolved', label: 'Resolved', count: stats.resolvedCount },
          ].map((pill) => (
            <button
              key={pill.id}
              onClick={() => setActiveFilter(pill.id)}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeFilter === pill.id
                  ? 'bg-[#d9ad57] text-[#1a0e08] shadow-md font-extrabold'
                  : 'bg-white/5 hover:bg-white/10 text-[#d4c5b8] border border-white/5'
              }`}
            >
              <span>{pill.label}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  activeFilter === pill.id ? 'bg-[#1a0e08]/20 text-[#1a0e08]' : 'bg-white/10 text-slate-300'
                }`}
              >
                {pill.count}
              </span>
            </button>
          ))}

          <button
            onClick={() => fetchInquiriesData()}
            disabled={loading}
            title="Refresh Inquiries"
            className="w-8 h-8 rounded-full bg-white/5 hover:bg-[#dfbf80]/20 text-[#dfbf80] border border-[rgba(226,198,175,0.2)] flex items-center justify-center transition-colors ml-auto md:ml-2"
          >
            <span
              className={`material-symbols-outlined text-[17px] ${
                loading ? 'animate-spin text-[#dfbf80]' : ''
              }`}
            >
              refresh
            </span>
          </button>
        </div>
      </div>

      {/* ── Inquiries List ── */}
      {loading && inquiries.length === 0 ? (
        <div className="bg-white/5 border border-white/10 rounded-2xl p-12 text-center text-slate-400 flex flex-col items-center justify-center gap-3">
          <span className="material-symbols-outlined text-4xl animate-spin text-primary">
            autorenew
          </span>
          <p className="text-sm">Loading customer queries...</p>
        </div>
      ) : inquiries.length === 0 ? (
        <div className="bg-white/5 border border-white/10 rounded-2xl p-12 text-center text-slate-400 flex flex-col items-center justify-center gap-3">
          <span className="material-symbols-outlined text-5xl text-slate-600">inbox</span>
          <h3 className="text-lg font-bold text-white">No customer queries found</h3>
          <p className="text-xs text-slate-500 max-w-sm">
            {searchQuery
              ? `No inquiries matched "${searchQuery}". Try clearing the search filter.`
              : 'When travelers submit enquiries from journey cards, service pages, or popups, they will appear here.'}
          </p>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="mt-2 text-xs text-primary hover:underline font-semibold"
            >
              Clear Search Filter
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {inquiries.map((item) => {
            const cleanPhone = getCleanPhoneForWhatsApp(item.phone);
            const waText = encodeURIComponent(
              `Hello ${item.name}! Thank you for contacting SoilNSoul Travels regarding "${
                item.service || 'your journey'
              }". We would be delighted to assist you.`
            );
            const waLink = `https://wa.me/${cleanPhone}?text=${waText}`;
            const isNoteOpen = expandedNotes[item._id];
            const currentDraft =
              notesDrafts[item._id] !== undefined ? notesDrafts[item._id] : item.notes || '';

            return (
              <div
                key={item._id}
                className={`sns-card p-5 sm:p-6 transition-all hover:border-[rgba(226,198,175,0.35)] ${
                  item.status === 'new'
                    ? '!border-[#dfbf80]/45 shadow-lg shadow-[#dfbf80]/10 bg-gradient-to-br from-[#dfbf80]/[0.06] to-transparent'
                    : ''
                }`}
              >
                {/* Header Row: Customer Identity + Status + Delete */}
                <div className="flex flex-wrap items-start justify-between gap-3 pb-4 border-b border-[rgba(226,198,175,0.12)]">
                  <div className="flex items-center gap-3.5">
                    <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-[#d9ad57] to-[#91341e] flex items-center justify-center text-[#1a0e08] font-bold text-base font-serif uppercase shrink-0 shadow-md">
                      {item.name.charAt(0) || 'U'}
                    </div>
                    <div>
                      <div className="flex items-center gap-2.5 flex-wrap">
                        <h3 className="sns-admin-title text-xl sm:text-2xl text-white m-0">{item.name}</h3>
                        <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-[#dfbf80]/15 text-[#dfbf80] border border-[#dfbf80]/25">
                          {formatSource(item.source)}
                        </span>
                      </div>
                      <p className="text-[#a89485] text-xs mt-1 flex items-center gap-1.5 m-0">
                        <span className="material-symbols-outlined text-[13px] text-[#dfbf80]">
                          schedule
                        </span>
                        {formatDate(item.createdAt)}
                      </p>
                    </div>
                  </div>

                  {/* Status Picker & Delete Button */}
                  <div className="flex items-center gap-2.5">
                    <select
                      value={item.status}
                      disabled={actionLoading === item._id}
                      onChange={(e) =>
                        handleStatusChange(
                          item._id,
                          e.target.value as 'new' | 'contacted' | 'resolved' | 'archived'
                        )
                      }
                      className={`text-xs font-bold px-3.5 py-1.5 rounded-full border outline-none cursor-pointer transition-all ${
                        item.status === 'new'
                          ? 'bg-[#dfbf80]/20 text-[#dfbf80] border-[#dfbf80]/40'
                          : item.status === 'contacted'
                          ? 'bg-sky-500/20 text-sky-300 border-sky-500/40'
                          : item.status === 'resolved'
                          ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                          : 'bg-slate-500/20 text-slate-400 border-slate-500/40'
                      }`}
                    >
                      <option value="new" className="bg-[#23140d] text-[#dfbf80]">
                        ● New / Unread
                      </option>
                      <option value="contacted" className="bg-[#23140d] text-sky-300">
                        ● In Contact
                      </option>
                      <option value="resolved" className="bg-[#23140d] text-emerald-300">
                        ● Resolved / Booked
                      </option>
                      <option value="archived" className="bg-[#23140d] text-slate-400">
                        ● Archived
                      </option>
                    </select>

                    <button
                      onClick={() => handleDelete(item._id, item.name)}
                      disabled={actionLoading === item._id}
                      className="w-8 h-8 rounded-full bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 flex items-center justify-center transition-all"
                      title="Delete inquiry"
                    >
                      <span className="material-symbols-outlined text-[15px]">delete</span>
                    </button>
                  </div>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 my-4 text-xs">
                  {/* Phone / WhatsApp */}
                  <div className="bg-[#23140d]/80 rounded-xl p-3 border border-[rgba(226,198,175,0.12)]">
                    <span className="text-[#a89485] uppercase tracking-wider text-[10px] font-bold block mb-1">
                      Phone / WhatsApp
                    </span>
                    <div className="flex items-center justify-between">
                      <span className="text-[#f7ede2] font-semibold">{item.phone || 'Not provided'}</span>
                      {item.phone && (
                        <div className="flex items-center gap-1.5">
                          <a
                            href={waLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-7 h-7 rounded-full bg-green-500/10 hover:bg-green-500/20 border border-green-500/30 text-green-400 flex items-center justify-center transition-colors"
                            title="Chat on WhatsApp"
                          >
                            <span className="material-symbols-outlined text-sm">chat</span>
                          </a>
                          <a
                            href={`tel:${item.phone}`}
                            className="w-7 h-7 rounded-full bg-sky-500/10 hover:bg-sky-500/20 border border-sky-500/30 text-sky-400 flex items-center justify-center transition-colors"
                            title="Call Phone"
                          >
                            <span className="material-symbols-outlined text-sm">phone</span>
                          </a>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Email */}
                  <div className="bg-[#23140d]/80 rounded-xl p-3 border border-[rgba(226,198,175,0.12)]">
                    <span className="text-[#a89485] uppercase tracking-wider text-[10px] font-bold block mb-1">
                      Email Address
                    </span>
                    <div className="flex items-center justify-between">
                      <span className="text-[#f7ede2] font-semibold truncate max-w-[150px]">
                        {item.email || '—'}
                      </span>
                      {item.email && (
                        <a
                          href={`mailto:${item.email}?subject=${encodeURIComponent(
                            `SoilNSoul Travels - Inquiry for ${item.service || 'Varanasi'}`
                          )}`}
                          className="w-7 h-7 rounded-full bg-[#dfbf80]/10 hover:bg-[#dfbf80]/20 border border-[#dfbf80]/30 text-[#dfbf80] flex items-center justify-center transition-colors"
                          title="Send Email"
                        >
                          <span className="material-symbols-outlined text-sm">mail</span>
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Service / Journey */}
                  <div className="bg-[#23140d]/80 rounded-xl p-3 border border-[rgba(226,198,175,0.12)]">
                    <span className="text-[#a89485] uppercase tracking-wider text-[10px] font-bold block mb-1">
                      Service / Journey
                    </span>
                    <span className="text-[#dfbf80] font-semibold truncate block" title={item.service}>
                      {item.service || 'General Inquiry'}
                    </span>
                  </div>

                  {/* Travel Dates & Guests */}
                  <div className="bg-[#23140d]/80 rounded-xl p-3 border border-[rgba(226,198,175,0.12)]">
                    <span className="text-[#a89485] uppercase tracking-wider text-[10px] font-bold block mb-1">
                      Dates &amp; Guests
                    </span>
                    <span className="text-[#f7ede2] font-semibold block">
                      {item.dates || 'Flexible'}{' '}
                      {item.guests ? `• ${item.guests} guests` : ''}
                    </span>
                  </div>
                </div>

                {/* Origin & Interests if available */}
                {(item.origin || item.interests) && (
                  <div className="flex flex-wrap items-center gap-2 mb-3.5 text-xs">
                    {item.origin && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#23140d] border border-[rgba(226,198,175,0.15)] text-[#d4c5b8]">
                        <span className="material-symbols-outlined text-[14px] text-[#dfbf80]">
                          location_on
                        </span>
                        Traveling from: <strong className="text-white">{item.origin}</strong>
                      </span>
                    )}
                    {item.interests && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#23140d] border border-[rgba(226,198,175,0.15)] text-[#d4c5b8]">
                        <span className="material-symbols-outlined text-[14px] text-[#dfbf80]">
                          interests
                        </span>
                        Interests: <strong className="text-white">{item.interests}</strong>
                      </span>
                    )}
                  </div>
                )}

                {/* Message Box */}
                {item.message && (
                  <div className="bg-[#1a0e08] border border-[rgba(226,198,175,0.18)] rounded-xl p-4 mb-3.5 text-sm">
                    <p className="text-[#a89485] text-[10px] font-bold mb-1.5 uppercase tracking-wider">
                      Client Message / Requirements:
                    </p>
                    <p className="text-[#fffaf4] leading-relaxed font-serif italic text-base m-0 whitespace-pre-wrap">
                      "{item.message}"
                    </p>
                  </div>
                )}

                {/* Internal Admin Note Bar */}
                <div className="mt-3.5 pt-3.5 border-t border-[rgba(226,198,175,0.12)]">
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() =>
                        setExpandedNotes((prev) => ({ ...prev, [item._id]: !prev[item._id] }))
                      }
                      className="text-xs text-[#a89485] hover:text-[#dfbf80] flex items-center gap-1.5 transition-colors"
                    >
                      <span className="material-symbols-outlined text-sm">
                        {isNoteOpen ? 'expand_less' : 'edit_note'}
                      </span>
                      {item.notes ? (
                        <span>
                          Internal Note:{' '}
                          <strong className="text-[#d4c5b8] font-normal">
                            {item.notes.slice(0, 50)}
                            {item.notes.length > 50 ? '...' : ''}
                          </strong>
                        </span>
                      ) : (
                        <span>+ Add internal note</span>
                      )}
                    </button>

                    {/* Quick WhatsApp Contact CTA */}
                    {item.phone && (
                      <a
                        href={waLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="sns-btn-gold !bg-gradient-to-r !from-emerald-700 !to-emerald-600 !text-white !border-emerald-500/30 !py-1.5 !px-3.5 text-xs shadow-sm"
                      >
                        <span className="material-symbols-outlined text-sm">chat</span>
                        <span>Reply on WhatsApp</span>
                      </a>
                    )}
                  </div>

                  {isNoteOpen && (
                    <div className="mt-3 bg-[#1d100a] border border-[rgba(226,198,175,0.18)] rounded-xl p-3.5 space-y-2">
                      <label className="text-[10px] text-[#a89485] uppercase tracking-wider font-bold block">
                        Internal Team Notes (Only visible to admin):
                      </label>
                      <textarea
                        rows={2}
                        value={currentDraft}
                        onChange={(e) =>
                          setNotesDrafts((prev) => ({ ...prev, [item._id]: e.target.value }))
                        }
                        placeholder="e.g. Sent bespoke itinerary via WhatsApp. Waiting for confirmed dates."
                        className="w-full bg-[#23140d] border border-[rgba(226,198,175,0.2)] focus:border-[#dfbf80] rounded-lg p-2.5 text-xs text-white placeholder:text-[#8e7a6d] outline-none resize-none"
                      />
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => handleSaveNote(item._id)}
                          disabled={savingNoteId === item._id}
                          className="sns-btn-gold !py-1 !px-3.5 text-[10px]"
                        >
                          {savingNoteId === item._id ? 'Saving...' : 'Save Note'}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
