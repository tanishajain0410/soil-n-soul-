"use client";
import { usePathname } from "next/navigation";
import LuxuryNavbar from "./LuxuryNavbar";
import Footer from "./Footer";
import FloatingContactButtons from "./FloatingContactButtons";

export default function SiteChrome({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const hidden = pathname ? ["/admin", "/hakunamata"].some((p) => pathname.startsWith(p)) : false;

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
        </>
      )}
    </>
  );
}
