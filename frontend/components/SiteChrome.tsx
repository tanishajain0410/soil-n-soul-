"use client";
import { useState } from "react";
import { usePathname } from "next/navigation";
import LuxuryNavbar from "./LuxuryNavbar";
import Footer from "./Footer";
import FloatingContactButtons from "./FloatingContactButtons";
import LeadCaptureModal from "./LeadCaptureModal";

export default function SiteChrome({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const hidden = pathname ? pathname.startsWith("/admin") : false;
  const [leadCaptureOpen, setLeadCaptureOpen] = useState(true);

  return (
    <>
      {!hidden && (
        <>
          <a className="sn-skip" href="#main-content">
            Skip to content
          </a>
          <LuxuryNavbar />
        </>
      )}
      <main id="main-content">{children}</main>
      {!hidden && (
        <>
          <Footer />
          <FloatingContactButtons />
          {leadCaptureOpen && <LeadCaptureModal onClose={() => setLeadCaptureOpen(false)} />}
        </>
      )}
    </>
  );
}
