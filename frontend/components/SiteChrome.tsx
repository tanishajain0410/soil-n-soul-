'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import LeadCaptureModal from '@/components/LeadCaptureModal';

const HIDE_CHROME_PREFIXES = ['/admin', '/hakunamata'];

const WhatsAppButton = () => (
  <a
    href="https://wa.me/919580417547"
    target="_blank"
    rel="noopener noreferrer"
    className="fixed bottom-6 right-4 sm:bottom-8 sm:right-6 w-13 h-13 sm:w-14 sm:h-14 bg-green-600 hover:bg-green-500 text-white rounded-full flex items-center justify-center shadow-2xl z-50 transition-transform hover:scale-110 active:scale-95"
    aria-label="Chat on WhatsApp"
    style={{ width: '52px', height: '52px' }}
  >
    <span className="material-symbols-outlined text-xl">chat</span>
  </a>
);

export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hideChrome = HIDE_CHROME_PREFIXES.some((prefix) => pathname.startsWith(prefix));
  const [showLead, setShowLead] = useState(false);

  useEffect(() => {
    if (hideChrome) return;
    if (sessionStorage.getItem('popup_shown')) return;
    const timer = setTimeout(() => {
      setShowLead(true);
      sessionStorage.setItem('popup_shown', '1');
    }, 6000);
    return () => clearTimeout(timer);
  }, [hideChrome]);

  return (
    <>
      {!hideChrome && <Navbar />}
      <main>{children}</main>
      {!hideChrome && <Footer />}
      {!hideChrome && showLead && <LeadCaptureModal onClose={() => setShowLead(false)} />}
      {!hideChrome && <WhatsAppButton />}
    </>
  );
}
