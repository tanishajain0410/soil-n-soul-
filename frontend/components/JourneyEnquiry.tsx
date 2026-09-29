"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, Phone, Mail, MapPin } from "lucide-react";
import { whatsapp } from "@/data/journeys";

interface JourneyEnquiryProps {
  journey?: string;
  duration?: string;
  variant?: "default" | "journeys" | "contact";
}

const interestOptions = ["A custom Kashi trip", "Spiritual experiences", "Heritage and culture", "Food and local life", "Stays and transport", "Celebrations and rituals"];

export default function JourneyEnquiry({
  journey = "",
  duration = "",
  variant = "default",
}: JourneyEnquiryProps) {
  const [ready, setReady] = useState("");
  const [selectedDuration, setSelectedDuration] = useState(duration);
  const [submitted, setSubmitted] = useState(false);
  const [travellers, setTravellers] = useState("1 to 2");
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const handlePreferences = (event: Event) => {
      const pref = (
        event as CustomEvent<{ duration: string; guests: string; date: string }>
      ).detail;
      setSelectedDuration(pref.duration);
      setReady("");
      const form = formRef.current;
      if (!form) return;
      const dateInput = form.elements.namedItem("dates") as HTMLInputElement;
      const guestsInput = form.elements.namedItem("guests") as HTMLSelectElement;
      if (dateInput) dateInput.value = pref.date;
      if (guestsInput) guestsInput.value = pref.guests.replace(/\D/g, "") || "2";
    };

    window.addEventListener("journey-preferences", handlePreferences);
    return () => window.removeEventListener("journey-preferences", handlePreferences);
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const interests = data.get("interests") || "A custom Kashi trip";
    const text = `Hello Soil n Soul,\n${
      journey ? `I would love to plan: ${journey}.` : "I would love to design my private Varanasi journey."
    }\n\n*Name:* ${data.get("name")}\n*WhatsApp:* ${data.get("contact")}\n*Email:* ${
      data.get("email") || "Not provided"
    }\n*Preferred Dates:* ${data.get("dates") || "Flexible"}\n*Guests:* ${data.get("guests") || "2"}${
      selectedDuration ? `\n*Duration:* ${selectedDuration}` : ""
    }\n*Travelling from:* ${data.get("origin") || "Not provided"}\n*Interests:* ${interests}\n*Message:* ${data.get("message") || "Looking forward to your guidance."}`;

    const link = whatsapp(text);
    setReady(link);
    setSubmitted(true);
    window.open(link, "_blank", "noopener,noreferrer");
  };

  return (
    <section id="contact" className={`enquiry-section-reference${variant === "journeys" ? " journey-enquiry-dark" : ""}${variant === "contact" ? " contact-enquiry-reference" : ""}`} aria-label="Journey Enquiry">
      <div className="enquiry-container reference-trip-shell">
        <div className="enquiry-info-col reference-trip-intro">
          <p className="enquiry-eyebrow">CONTACT</p>
          <h2 className="enquiry-title">Share your dates.<br/>We’ll draw the plan.</h2>
          <p className="enquiry-description">Tell us when you are coming and who is coming with you. We reply on WhatsApp with a full plan, including ritual timings by tithi.</p>
          <div className="reference-contact-cards">
            <div className="reference-contact-card"><span className="enquiry-contact-icon"><Phone size={16}/></span><span><small>CALL OR WHATSAPP</small><strong>+91 95804 17547</strong></span><button type="button" onClick={() => navigator.clipboard?.writeText("+91 95804 17547")}>Copy</button></div>
            <div className="reference-contact-card"><span className="enquiry-contact-icon"><Mail size={16}/></span><span><small>EMAIL</small><strong>info@soilnsoultravels.com</strong></span><button type="button" onClick={() => navigator.clipboard?.writeText("info@soilnsoultravels.com")}>Copy</button></div>
            <div className="reference-contact-card"><span className="enquiry-contact-icon"><MapPin size={16}/></span><span><small>BASED IN</small><strong>Varanasi, Uttar Pradesh</strong></span></div>
          </div>
        </div>

        <div className="enquiry-form-col reference-trip-form-wrap">
          <div className="reference-trip-form-heading"><h3><strong>नमस्ते,</strong> <em>tell us about your trip</em></h3><p>Every field helps, but only your name and phone are required.</p></div>
          <form ref={formRef} onSubmit={handleSubmit} className="enquiry-form-grid reference-trip-form">
            <div className="form-field"><label htmlFor="enquiry-name">YOUR NAME</label><input id="enquiry-name" name="name" type="text" placeholder="Full name" required maxLength={100} autoComplete="name" /></div>
            <div className="form-field"><label htmlFor="enquiry-contact">PHONE / WHATSAPP</label><input id="enquiry-contact" name="contact" type="tel" placeholder="+91" required maxLength={20} autoComplete="tel" /></div>
            <div className="form-field"><label htmlFor="enquiry-dates">ARRIVAL DATE</label><input id="enquiry-dates" name="dates" type="date" /></div>
            <div className="form-field"><label htmlFor="enquiry-origin">TRAVELLING FROM</label><input id="enquiry-origin" name="origin" type="text" placeholder="City, country" maxLength={100} /></div>
            <div className="form-field form-field-full reference-travellers"><label>TRAVELLERS</label><input type="hidden" name="guests" value={travellers}/><div className="reference-traveller-pills">{["1 to 2", "3 to 4", "5 to 8", "9 or more"].map((value) => <button key={value} type="button" className={travellers === value ? "is-selected" : ""} onClick={() => setTravellers(value)}>{value}</button>)}</div></div>
            <div className="form-field form-field-full"><label htmlFor="enquiry-interests">I AM INTERESTED IN</label><select id="enquiry-interests" name="interests" defaultValue={journey || interestOptions[0]}>{journey && <option value={journey}>{journey}</option>}{interestOptions.map((interest) => <option key={interest} value={interest}>{interest}</option>)}</select></div>
            <div className="form-field form-field-full"><label htmlFor="enquiry-message">ANYTHING WE SHOULD KNOW</label><textarea id="enquiry-message" name="message" rows={3} placeholder="Elders travelling, specific rituals, dietary needs..." maxLength={1000}/></div>
            <div className="form-actions-row reference-trip-actions"><button type="submit" className="enquiry-submit-btn"><span>Send on WhatsApp</span><ArrowRight size={14}/></button><p>Your details open in WhatsApp, ready to send to +91 95804 17547.</p></div>
            {submitted && ready && <div className="enquiry-success-message"><p>Your enquiry is ready in WhatsApp.</p><a href={ready} target="_blank" rel="noreferrer">Re-open WhatsApp chat ↗</a></div>}
          </form>
        </div>
      </div>
    </section>
  );
}

function WhatsAppSvgIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="16"
      height="16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M20.2 11.7a8.2 8.2 0 0 1-12.1 7.2L3 20l1.2-4.8a8.2 8.2 0 1 1 16-3.5Z" />
      <path d="M8.5 8.4c.3 2.2 2.4 4.4 4.8 5.2l1.3-1.1 2 .9c.2.1.3.3.2.5-.3 1.1-1.2 1.6-2.3 1.6-3.7-.2-7.7-4-7.8-7.6 0-1.1.6-1.9 1.6-2.2.2-.1.4 0 .5.2l.8 2-1.1.5Z" />
    </svg>
  );
}
