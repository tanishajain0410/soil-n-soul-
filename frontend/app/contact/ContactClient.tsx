"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Compass, Headset, Landmark, UserRound, BedDouble, Plus, Minus, Phone, Mail, MapPin, Clock } from "lucide-react";
import Image from "next/image";
import JourneyEnquiry from "@/components/JourneyEnquiry";

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
const reasons = [
  ["Personalised Planning", "Journeys shaped around you.", "/SnS/private-journey-travel.webp"],
  ["Local Expertise", "Real insights, not just guidebooks.", "/SnS/local-storyteller.webp"],
  ["Seamless Support", "From planning to your final day.", "/SnS/private-journey-other-support.webp"],
] as const;
const faqs = [
  ["Can you help me plan a custom itinerary?", "Yes. Share your interests, dates and pace, and our local team will help shape a personal Varanasi journey."],
  ["Do you arrange accommodation and transport?", "We can help coordinate stays and transport as part of your journey planning."],
  ["Is it suitable for solo travellers?", "Yes. We can tailor experiences and local support to solo travellers and their comfort level."],
  ["Can you accommodate dietary preferences?", "Tell us about your dietary needs and we will discuss suitable local food experiences with you."],
  ["What is the best time to visit Varanasi?", "Varanasi has different rhythms through the year. Let us know what you hope to experience and we can help you choose dates."],
  ["Do you offer experiences beyond Varanasi?", "Yes. We can also help plan journeys to places such as Sarnath, Ayodhya and Prayagraj."],
] as const;

export default function ContactClient() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  return (
    <div className="contact-reference-page">
      <section className="contact-reference-hero" aria-label="Design your journey">
        <div className="contact-hero-shade" />
        <div className="contact-hero-inner">
          <p className="contact-ref-eyebrow">CONTACT &amp; BESPOKE PLANNING • KASHI, AT YOUR PACE</p>
          <h1>Design <em>My Journey</em></h1>
          <p className="contact-hero-copy">Share what you love. We’ll help you find it in Banaras.</p>
          <a className="contact-hero-cta" href="#contact">DESIGN MY JOURNEY <ArrowRight size={14}/></a>
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

      <section className="contact-connection-section" aria-labelledby="contact-connection-heading">
        <div className="contact-connection-inner">
          <div className="contact-connection-copy">
            <p className="contact-ref-eyebrow">WHY CONNECT WITH US</p>
            <h2 id="contact-connection-heading">More than a trip.<br/><em>A deeper connection.</em></h2>
            <p>We are based in Varanasi and work closely with local experts, artisans and heritage partners to create meaningful and responsible travel experiences.</p>
            <Link href="/about" className="contact-editorial-link">Our approach <ArrowRight size={14}/></Link>
          </div>
          <div className="contact-reasons-grid">
            {reasons.map(([title, copy, image]) => (
              <article className="contact-reason-card" key={title}>
                <div className="contact-reason-image"><Image src={image} alt="" fill sizes="(max-width: 700px) 85vw, 25vw"/></div>
                <h3>{title}</h3><p>{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="contact-details-faq" aria-label="Contact details and frequently asked questions">
        <div className="contact-details-inner">
          <div className="contact-details-copy">
            <p className="contact-ref-eyebrow">OUR DETAILS</p>
            <h2>Let’s start<br/><em>a conversation.</em></h2>
            <p>Have a question, a special request, or simply want to explore possibilities? We’d love to hear from you.</p>
            <a href="tel:+919580417547"><Phone size={15}/>+91 95804 17547</a>
            <a href="mailto:info@soilnsoultravels.com"><Mail size={15}/>info@soilnsoultravels.com</a>
            <span><MapPin size={15}/>Varanasi, Uttar Pradesh, India</span>
            <span><Clock size={15}/>Mon – Sat, 9:00 AM – 7:00 PM (IST)</span>
          </div>
          <div className="contact-faq-panel">
            <p className="contact-ref-eyebrow">FREQUENTLY ASKED QUESTIONS</p>
            <h2>Questions we<br/>hear every week.</h2>
            <p className="contact-faq-intro">Quick answers to help you plan, connect and travel with confidence.</p>
            <div className="contact-faq-list">
              {faqs.map(([question, answer], index) => (
                <div className={`contact-faq-item${openFaq === index ? " is-open" : ""}`} key={question}>
                  <button type="button" aria-expanded={openFaq === index} onClick={() => setOpenFaq(openFaq === index ? null : index)}>
                    <span>{question}</span>{openFaq === index ? <Minus size={15}/> : <Plus size={15}/>}
                  </button>
                  {openFaq === index && <p>{answer}</p>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="contact-founder-quote" aria-label="A note from our founder">
        <Image src="/images/about-way-diya.jpg" alt="A diya beside the Ganges at dusk in Varanasi" fill sizes="100vw"/>
        <div className="contact-founder-quote-shade"/>
        <div className="contact-founder-quote-copy">
          <p className="contact-ref-eyebrow">A PERSONAL WELCOME</p>
          <blockquote>Every journey to Kashi<br/>begins with <em>a conversation.</em></blockquote>
          <p>— Anchal Pandey <span>Founder, Soil &amp; Soul</span></p>
        </div>
      </section>

    </div>
  );
}
