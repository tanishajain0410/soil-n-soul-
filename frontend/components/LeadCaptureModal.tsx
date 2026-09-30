'use client';
import { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';
import { submitInquiry } from '@/lib/inquiries';

const SERVICES_LIST = [
  'Verified & Safe Stays',
  'Ritual & Priest Arrangements',
  'Local Cultural Tours',
  'Airport / Railway Pickup',
  'Banarasi Silk Shopping',
  'Pre-Wedding Photography',
  'General Inquiry',
];

interface LeadCaptureModalProps {
  onClose: () => void;
}

const LeadCaptureModal = ({ onClose }: LeadCaptureModalProps) => {
  const [form, setForm] = useState({ name: '', phone: '', service: '', message: '' });
  const [adminSubmitState, setAdminSubmitState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const inquiry = {
      name: form.name.trim(),
      phone: form.phone.trim(),
      service: form.service || 'General Inquiry',
      message: form.message.trim(),
      source: 'lead_modal',
    };

    const text = `Hello! I'm interested in *${form.service || 'your services'}*.\n\n*Name:* ${form.name}\n*Phone:* ${form.phone}\n*Message:* ${form.message}`;
    const submitter = (e.nativeEvent as SubmitEvent).submitter as HTMLButtonElement | null;
    if (submitter?.value === 'admin') {
      setAdminSubmitState('submitting');
      try {
        const result = await submitInquiry(inquiry);
        setAdminSubmitState(result.success ? 'success' : 'error');
      } catch {
        setAdminSubmitState('error');
      }
      return;
    }

    // Keep WhatsApp enquiries in the admin inbox as well as opening the chat.
    void submitInquiry(inquiry).catch(console.error);
    window.open(`https://wa.me/919580417547?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
    onClose();
  };

  // Handle escape key
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(12, 7, 5, 0.76)',
        backdropFilter: 'blur(4px)',
        padding: '16px'
      }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div 
        style={{
          width: '100%',
          maxWidth: '380px',
          maxHeight: '90dvh',
          overflowY: 'auto',
          background: 'linear-gradient(145deg, #512311 0%, #37170f 50%, #26100b 100%)',
          border: '1px solid rgba(164, 93, 41, 0.7)',
          borderRadius: '16px',
          boxShadow: '0 24px 60px rgba(0,0,0,0.55)'
        }}
      >
        <div style={{ position: 'relative', padding: '24px 25px 13px' }}>
          <button 
            onClick={onClose} 
            style={{ position: 'absolute', top: '13px', right: '13px', width: '28px', height: '28px', display: 'grid', placeItems: 'center', background: 'rgba(255,255,255,.16)', border: '1px solid rgba(255,255,255,.24)', borderRadius: '50%', color: '#fff4e7', cursor: 'pointer', padding: '0' }}
            aria-label="Close popup"
          >
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '7px', marginBottom: '10px' }}>
            <Sparkles size={13} color="#e6ad42" strokeWidth={1.7} aria-hidden="true" />
            <div>
              <p style={{ color: '#e6ad42', fontSize: '9px', fontWeight: 700, letterSpacing: '1.2px', textTransform: 'uppercase', margin: 0 }}>SoilNSoul Travels</p>
            </div>
          </div>
          <h3 style={{ color: '#fff8ef', fontSize: '20px', fontWeight: 600, margin: '0 0 6px', fontFamily: 'var(--font-playfair), Georgia, serif', letterSpacing: '-.2px' }}>Plan your Varanasi journey</h3>
          <p style={{ color: '#c9b4a7', fontSize: '11px', margin: 0, lineHeight: 1.45, maxWidth: '280px' }}>Send us a quick message and we'll respond within the hour.</p>
        </div>

        <form onSubmit={handleSubmit} style={{ padding: '22px 25px 24px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'nowrap' }}>
            <div style={{ flex: '1 1 0', minWidth: 0 }}>
              <label htmlFor="lead-name" style={{ fontSize: '9px', color: '#b49d90', fontWeight: 700, letterSpacing: '.65px', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>Your Name *</label>
              <input id="lead-name" name="name" required value={form.name} onChange={handleChange} placeholder="Rahul Sharma"
                style={{ boxSizing: 'border-box', width: '100%', background: 'rgba(255,244,231,.08)', border: '1px solid rgba(226,198,175,.28)', borderRadius: '8px', padding: '10px 11px', color: '#fff7ee', fontSize: '11px', outline: 'none' }}
              />
            </div>
            <div style={{ flex: '1 1 0', minWidth: 0 }}>
              <label htmlFor="lead-phone" style={{ fontSize: '9px', color: '#b49d90', fontWeight: 700, letterSpacing: '.65px', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>Phone / WhatsApp *</label>
              <input id="lead-phone" name="phone" required value={form.phone} onChange={handleChange} placeholder="+91 9876543210" type="tel"
                style={{ boxSizing: 'border-box', width: '100%', background: 'rgba(255,244,231,.08)', border: '1px solid rgba(226,198,175,.28)', borderRadius: '8px', padding: '10px 11px', color: '#fff7ee', fontSize: '11px', outline: 'none' }}
              />
            </div>
          </div>

          <div>
            <label htmlFor="lead-service" style={{ fontSize: '9px', color: '#b49d90', fontWeight: 700, letterSpacing: '.65px', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>Service Interested In</label>
            <select id="lead-service" name="service" value={form.service} onChange={handleChange}
              style={{ boxSizing: 'border-box', width: '100%', background: '#44261d', border: '1px solid rgba(226,198,175,.28)', borderRadius: '8px', padding: '10px 11px', color: '#fff7ee', fontSize: '11px', outline: 'none' }}>
              <option value="">Select a service...</option>
              {SERVICES_LIST.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="lead-message" style={{ fontSize: '9px', color: '#b49d90', fontWeight: 700, letterSpacing: '.65px', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>Your Message</label>
            <textarea id="lead-message" name="message" value={form.message} onChange={handleChange} placeholder="e.g. I'm planning to visit Varanasi in March with my family..." rows={3}
              style={{ boxSizing: 'border-box', width: '100%', background: 'rgba(255,244,231,.08)', border: '1px solid rgba(226,198,175,.28)', borderRadius: '8px', padding: '10px 11px', color: '#fff7ee', fontSize: '11px', lineHeight: 1.4, outline: 'none', resize: 'none', minHeight: '66px' }} />
          </div>

          <button type="submit" name="destination" value="admin" disabled={adminSubmitState === 'submitting'}
            style={{ width: '100%', minHeight: '40px', background: 'transparent', color: '#f3dfc7', padding: '10px 14px', borderRadius: '999px', border: '1px solid rgba(226,198,175,.48)', fontSize: '10px', fontWeight: 700, letterSpacing: '.4px', textTransform: 'uppercase', cursor: adminSubmitState === 'submitting' ? 'wait' : 'pointer', marginTop: '2px', opacity: adminSubmitState === 'submitting' ? .7 : 1 }}
          >
            {adminSubmitState === 'submitting' ? 'SUBMITTING…' : 'SUBMIT ENQUIRY TO ADMIN'}
          </button>
          <button type="submit" name="destination" value="whatsapp"
            style={{ width: '100%', minHeight: '40px', background: '#20c968', color: '#fff', padding: '10px 14px', borderRadius: '999px', border: 'none', fontSize: '10px', fontWeight: 700, letterSpacing: '.4px', textTransform: 'uppercase', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '7px', marginTop: '2px' }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.52 3.48A11.8 11.8 0 0 0 12.1 0C5.55 0 .22 5.33.22 11.88c0 2.1.55 4.15 1.6 5.96L.12 24l6.3-1.65a11.9 11.9 0 0 0 5.68 1.45h.01c6.55 0 11.88-5.33 11.88-11.88a11.8 11.8 0 0 0-3.47-8.44ZM12.1 21.78a9.9 9.9 0 0 1-5.05-1.38l-.36-.21-3.74.98 1-3.64-.24-.38a9.86 9.86 0 0 1-1.52-5.27c0-5.47 4.45-9.92 9.92-9.92a9.85 9.85 0 0 1 7.02 2.91 9.86 9.86 0 0 1 2.9 7.02c0 5.47-4.45 9.92-9.92 9.92Zm5.44-7.43c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.06-.17-.3-.02-.46.13-.61.14-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.91-2.21-.24-.58-.48-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.06 2.87 1.21 3.07.15.2 2.09 3.2 5.07 4.49.71.31 1.26.49 1.69.63.71.23 1.36.19 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.42-.07-.12-.27-.2-.57-.35Z"/></svg>
            SEND VIA WHATSAPP
          </button>
          
          <p style={{ textAlign: 'center', fontSize: '10px', color: '#bda99a', margin: '0' }}>
            Or call us: <a href="tel:+919580417547" style={{ color: '#e6ad42', textDecoration: 'none', fontWeight: 600 }}>+91 95804 17547</a>
          </p>
          {adminSubmitState === 'success' && <p role="status" style={{ textAlign: 'center', fontSize: '11px', color: '#8de0a8', margin: '0' }}>Your enquiry has been sent to our team. We’ll be in touch shortly.</p>}
          {adminSubmitState === 'error' && <p role="alert" style={{ textAlign: 'center', fontSize: '11px', color: '#ffc1a8', margin: '0' }}>We couldn’t submit your enquiry just now. Please try again or use WhatsApp.</p>}
        </form>
      </div>
    </div>
  );
};

export default LeadCaptureModal;
