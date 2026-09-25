"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, Phone, Mail, MapPin } from "lucide-react";
import { whatsapp } from "@/data/journeys";

interface JourneyEnquiryProps {
  journey?: string;
  duration?: string;
  variant?: "default" | "journeys" | "contact";
}

const interestOptions = [
  "Spiritual",
  "Heritage",
  "Food",
  "Photography",
  "Celebrations",
  "Slow Travel",
];

export default function JourneyEnquiry({
  journey = "",
  duration = "",
  variant = "default",
}: JourneyEnquiryProps) {
  const [ready, setReady] = useState("");
  const [selectedDuration, setSelectedDuration] = useState(duration);
  const [submitted, setSubmitted] = useState(false);
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
    const interests = data.getAll("interests").join(", ") || "All experiences";
    const text = `Hello Soil n Soul,\n${
      journey ? `I would love to plan: ${journey}.` : "I would love to design my private Varanasi journey."
    }\n\n*Name:* ${data.get("name")}\n*WhatsApp:* ${data.get("contact")}\n*Email:* ${
      data.get("email") || "Not provided"
    }\n*Preferred Dates:* ${data.get("dates") || "Flexible"}\n*Guests:* ${data.get("guests") || "2"}${
      selectedDuration ? `\n*Duration:* ${selectedDuration}` : ""
    }\n*Interests:* ${interests}\n*Message:* ${data.get("message") || "Looking forward to your guidance."}`;

    const link = whatsapp(text);
    setReady(link);
    setSubmitted(true);
    window.open(link, "_blank", "noopener,noreferrer");
  };

  return (
    <section id="contact" className={`enquiry-section-reference${variant === "journeys" ? " journey-enquiry-dark" : ""}${variant === "contact" ? " contact-enquiry-reference" : ""}`} aria-label="Journey Enquiry">
      <div className="enquiry-container">
        {/* Left Column: Heading, description & direct contact info */}
        <div className="enquiry-info-col">
          <p className="enquiry-eyebrow">DESIGN MY JOURNEY</p>
          <h2 className="enquiry-title">
            Every meaningful journey<br />
            begins with <em>a conversation.</em>
          </h2>
          <p className="enquiry-description">
            Tell us what draws you to Kashi. We’ll take care of the details that make it yours.
          </p>

          <div className="enquiry-contact-items">
            <a href="tel:+919580417547" className="enquiry-contact-link">
              <span className="enquiry-contact-icon">
                <Phone size={14} />
              </span>
              <span>+91 95804 17547</span>
            </a>
            <a href={variant === "contact" ? "mailto:info@soilnsoultravels.com" : "mailto:hello@soilnsoul.in"} className="enquiry-contact-link">
              <span className="enquiry-contact-icon">
                <Mail size={14} />
              </span>
              <span>{variant === "contact" ? "info@soilnsoultravels.com" : "hello@soilnsoul.in"}</span>
            </a>
            <div className="enquiry-contact-link">
              <span className="enquiry-contact-icon">
                <MapPin size={14} />
              </span>
              <span>Varanasi, Uttar Pradesh, India</span>
            </div>
          </div>
        </div>

        {/* Right Column: 2-column wide form */}
        <div className="enquiry-form-col">
          <form ref={formRef} onSubmit={handleSubmit} className="enquiry-form-grid">
            {/* Full Name */}
            <div className="form-field">
              <label htmlFor="enquiry-name">Full Name*</label>
              <input
                id="enquiry-name"
                name="name"
                type="text"
                placeholder="Your name"
                required
                maxLength={100}
                autoComplete="name"
              />
            </div>

            {/* WhatsApp Number */}
            <div className="form-field">
              <label htmlFor="enquiry-contact">WhatsApp Number*</label>
              <input
                id="enquiry-contact"
                name="contact"
                type="tel"
                placeholder="+91 95804 17547"
                required
                maxLength={20}
                autoComplete="tel"
              />
            </div>

            {/* Preferred Dates */}
            <div className="form-field">
              <label htmlFor="enquiry-dates">Preferred Dates</label>
              <input
                id="enquiry-dates"
                name="dates"
                type="text"
                placeholder="e.g. 12–14 October, or Flexible"
                maxLength={100}
              />
            </div>

            {/* Number of Guests */}
            <div className="form-field">
              <label htmlFor="enquiry-guests">Number of Guests</label>
              <select id="enquiry-guests" name="guests" defaultValue="2">
                <option value="1">1 Guest</option>
                <option value="2">2 Guests</option>
                <option value="3">3 Guests</option>
                <option value="4">4 Guests</option>
                <option value="5">5 Guests</option>
                <option value="6+">6+ Guests (Private Group)</option>
              </select>
            </div>

            {/* Email (Full Width) */}
            <div className="form-field form-field-full">
              <label htmlFor="enquiry-email">Email (optional)</label>
              <input
                id="enquiry-email"
                name="email"
                type="email"
                placeholder="you@example.com"
                maxLength={120}
                autoComplete="email"
              />
            </div>

            {/* Interests Checkboxes (Full Width) */}
            <div className="form-field form-field-full">
              <label className="form-legend-label">Interests</label>
              <div className="form-interests-row">
                {interestOptions.map((interest) => (
                  <label key={interest} className="interest-checkbox-label">
                    <input type="checkbox" name="interests" value={interest} />
                    <span>{interest}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Message (Full Width) */}
            <div className="form-field form-field-full">
              <label htmlFor="enquiry-message">Message</label>
              <textarea
                id="enquiry-message"
                name="message"
                rows={3}
                placeholder="A place you dream of. A moment you want to feel..."
                maxLength={1000}
              />
            </div>

            {/* Form Actions (Buttons Side by Side) */}
            <div className="form-actions-row">
              <button type="submit" className="enquiry-submit-btn">
                <span>DESIGN MY JOURNEY</span>
                <ArrowRight size={14} />
              </button>

              <a
                href="https://wa.me/919580417547?text=Hello%20Soil%20n%20Soul%2C%20I%20would%20love%20to%20plan%20a%20Varanasi%20journey."
                target="_blank"
                rel="noreferrer"
                className="enquiry-whatsapp-btn"
              >
                <WhatsAppSvgIcon />
                <span>Enquire on WhatsApp</span>
              </a>
            </div>

            {submitted && ready && (
              <div className="enquiry-success-message">
                <p>Thank you! Your enquiry has been forwarded to WhatsApp.</p>
                <a href={ready} target="_blank" rel="noreferrer">
                  Re-open WhatsApp chat ↗
                </a>
              </div>
            )}
          </form>
        </div>
        {(variant === "journeys" || variant === "contact") && <aside className={`journey-map-panel${variant === "contact" ? " contact-map-panel" : ""}`} aria-label="Our home in Varanasi">
          {variant === "contact" && <img className="contact-map-photo" src="/images/about-ref/enquiry_card_top.png" alt="Sunset over the Ganges and Varanasi ghats" />}
          <div className="journey-map-frame">
            <iframe title="Map of Varanasi, Uttar Pradesh, India" src="https://maps.google.com/maps?q=Varanasi%2C%20Uttar%20Pradesh%2C%20India&t=&z=13&ie=UTF8&iwloc=&output=embed" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
          </div>
          <div className="journey-map-caption"><span className="journey-map-pin"><MapPin size={17}/></span><div><strong>Varanasi, Uttar Pradesh, India</strong><small>Our home. Your beginning.</small></div><a href="https://www.google.com/maps/search/?api=1&query=Varanasi%2C+Uttar+Pradesh%2C+India" target="_blank" rel="noreferrer" aria-label="Open Varanasi in Maps"><ArrowRight size={16}/></a></div>
          {variant === "contact" && <div className="contact-map-foot"><span>OUR HOME. YOUR BEGINNING.</span><strong>Varanasi, India</strong><a href="https://www.google.com/maps/search/?api=1&query=Varanasi%2C+Uttar+Pradesh%2C+India" target="_blank" rel="noreferrer">Explore the map →</a></div>}
        </aside>}
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
