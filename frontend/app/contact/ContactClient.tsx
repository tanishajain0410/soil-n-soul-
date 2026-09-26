"use client";

import Link from "next/link";
import { Compass, Headset, Landmark, UserRound, BedDouble } from "lucide-react";
import JourneyEnquiry from "@/components/JourneyEnquiry";
import LuxuryNavbar from "@/components/LuxuryNavbar";

const promises = [
  [UserRound, "Personalised", "Trips crafted around you"],
  [Compass, "Local Experts", "Real insights, not just itineraries"],
  [BedDouble, "Seamless Planning", "From stay to experience"],
] as const;
const values = [
  [Compass, "Tailor-Made Itineraries", "Experiences curated\naround your interests."],
  [BedDouble, "Handpicked Stays", "Heritage hotels and\ncomfortable options."],
  [Landmark, "Authentic Experiences", "Cultural, spiritual,\nand local life."],
  [Headset, "End-to-End Support", "We plan, you experience\n— stress free."],
] as const;

export default function ContactClient() {
  return (
    <div className="contact-reference-page">
      <LuxuryNavbar />
      <section className="contact-reference-hero" aria-label="Design your journey">
        <div className="contact-hero-shade" />
        <div className="contact-hero-inner">
          <p className="contact-ref-eyebrow">CONTACT &amp; BESPOKE PLANNING • KASHI, AT YOUR PACE</p>
          <h1>Design <em>My Journey</em></h1>
          <p className="contact-hero-copy">Share what you love. We’ll help you find it in Banaras.</p>
          <div className="contact-hero-promises">
            {promises.map(([Icon, title, copy]) => (
              <div className="contact-hero-promise" key={title}>
                <span><Icon size={18}/></span>
                <div><strong>{title}</strong><small>{copy}</small></div>
              </div>
            ))}
          </div>
        </div>

        {/* Constrained decorative wrapper for Your Kashi Story */}
        <div className="contact-hero-decoration-wrap" aria-hidden="true">
          <img
            className="contact-hero-temple"
            src="/images/temple-hero-watermark.png"
            alt=""
            aria-hidden="true"
          />
          <div className="contact-handwritten">
            Your<br />Kashi<br />Story
          </div>
        </div>
      </section>

      <JourneyEnquiry variant="contact" />

      <section className="contact-reference-values" aria-label="The Soil N Soul difference">
        <div className="contact-values-inner">
          {values.map(([Icon, title, copy]) => (
            <div className="contact-value" key={title}>
              <Icon size={28} strokeWidth={1.2}/>
              <h2>{title}</h2>
              <p>{copy}</p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
