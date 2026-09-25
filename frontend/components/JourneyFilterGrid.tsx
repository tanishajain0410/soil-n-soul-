"use client";
import { useState, type ReactNode } from "react";
import { CalendarDays, RotateCcw, Tag, Users } from "lucide-react";
import { journeys } from "@/data/journeys";
import JourneyCard from "./JourneyCard";
const durations = ["All durations", "1 Day", "2–3 Days", "4–5 Days", "6+ Days"];
const groups = ["All group sizes", "1–2", "3–4", "5–6", "7–10", "10+"];
const interests = [
  "All interests",
  "Spiritual",
  "Heritage",
  "Culture",
  "Food",
  "Photography",
  "Family",
  "Beyond Kashi",
];
const interestWords: Record<string, RegExp> = {
  Spiritual: /temple|ritual|aarti|sacred|spiritual|buddh/i,
  Heritage: /heritage|historic|fort|museum|old city/i,
  Culture: /culture|cultural|music|silk|weav|craft/i,
  Food: /food|dining|kitchen|chaat|meal|flavour/i,
  Photography: /photograph|sunrise|dawn|sunset/i,
  Family: /family/i,
  "Beyond Kashi": /Beyond Kashi/,
};
export default function JourneyFilterGrid({ children }: { children?: ReactNode }) {
  const [duration, setDuration] = useState(durations[0]);
  const [group, setGroup] = useState(groups[0]);
  const [interest, setInterest] = useState(interests[0]);
  const filtered = journeys.filter((j) => {
    const days = j.durationOptions.map((d) => parseInt(d, 10));
    const durationMatch =
      duration === durations[0] ||
      days.some((d) =>
        duration === "1 Day"
          ? d === 1
          : duration === "2–3 Days"
            ? d >= 2 && d <= 3
            : duration === "4–5 Days"
              ? d >= 4 && d <= 5
              : d >= 6,
      );
    const groupMatch =
      group === groups[0] ||
      j.groupSizeOptions.some((g) => g.replace(" Guests", "").replace(/–/g, "-") === group.replace(/–/g, "-"));
    const interestMatch =
      interest === interests[0] ||
      interestWords[interest].test(
        [j.name, j.category, j.description, j.story, ...j.highlights].join(" "),
      );
    return durationMatch && groupMatch && interestMatch;
  });
  const reset = () => {
    setDuration(durations[0]);
    setGroup(groups[0]);
    setInterest(interests[0]);
  };
  return (
    <div className="sn-journey-explorer" id="journey-filters">
      <div className="sn-refined-filters">
        {[
          {
            label: "Duration",
            icon: CalendarDays,
            value: duration,
            set: setDuration,
            options: durations,
          },
          { label: "Group Size", icon: Users, value: group, set: setGroup, options: groups },
          {
            label: "Interests",
            icon: Tag,
            value: interest,
            set: setInterest,
            options: interests,
          },
        ].map((f) => (
          <label key={f.label} className="journey-filter-field">
            <span className="journey-filter-label"><f.icon size={17} strokeWidth={1.4}/>{f.label}</span>
            <select value={f.value} onChange={(e) => f.set(e.target.value)}>
              {f.options.map((o) => (
                <option key={o}>{o}</option>
              ))}
            </select>
          </label>
        ))}
        <button className="sn-filter-reset" onClick={reset}>
          <><RotateCcw size={15} strokeWidth={1.5}/> Reset Filters</>
        </button>
      </div>
      {children}
      <p className="sn-results-count" role="status">
        {filtered.length} {filtered.length === 1 ? "journey" : "journeys"} to
        explore · Dates and details shaped around you
      </p>
      <div className="sn-journey-results">
        {filtered.map((j) => (
          <JourneyCard key={j.slug} journey={j} />
        ))}
      </div>
      {!filtered.length && (
        <div className="sn-filter-empty">
          <h2>A different starting point?</h2>
          <p>
            Try another combination, or let us design a journey around your
            interests.
          </p>
          <button className="sn-text-link" onClick={reset}>
            Clear filters →
          </button>
        </div>
      )}
    </div>
  );
}
