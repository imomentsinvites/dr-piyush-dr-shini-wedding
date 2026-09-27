import React, { useState } from "react";
import { OrnateDivider, ClockIcon, BusIcon, MapPinIcon, UtensilsIcon } from "./common/Icons";
import { WEDDING_DATA } from "../constants/weddingData";

export function TimelineSection() {
  const [activeFilter, setActiveFilter] = useState("all");

  const filteredEvents = WEDDING_DATA.events.filter((ev) => {
    if (activeFilter === "narnaul") return ev.step === 1;
    if (activeFilter === "orchha") return ev.step === 2;
    return true;
  });

  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 cream-bg relative overflow-hidden text-center">
      <div className="max-w-md mx-auto">
        <ClockIcon className="w-7 h-7 mx-auto text-primary mb-3" />
        <h2 className="font-calligraphy text-4xl md:text-5xl text-primary mb-2">
          Program Timeline
        </h2>
        <OrnateDivider />

        <p className="text-xs uppercase tracking-widest text-muted-foreground font-display -mt-2 mb-6 font-semibold">
          01 – 05 December 2026 • Narnaul &amp; Orchha
        </p>

        {/* Phase Filter Tabs */}
        <div className="flex items-center justify-center gap-1.5 p-1 bg-primary/10 rounded-full max-w-xs mx-auto mb-9 text-xs font-display font-medium">
          <button
            type="button"
            onClick={() => setActiveFilter("all")}
            className={`px-3 py-1.5 rounded-full transition-all cursor-pointer ${
              activeFilter === "all"
                ? "bg-primary text-primary-foreground shadow-sm font-semibold"
                : "text-foreground/75 hover:text-foreground"
            }`}
          >
            All Events
          </button>
          <button
            type="button"
            onClick={() => setActiveFilter("narnaul")}
            className={`px-3 py-1.5 rounded-full transition-all cursor-pointer ${
              activeFilter === "narnaul"
                ? "bg-primary text-primary-foreground shadow-sm font-semibold"
                : "text-foreground/75 hover:text-foreground"
            }`}
          >
            1. Narnaul &amp; Baraat
          </button>
          <button
            type="button"
            onClick={() => setActiveFilter("orchha")}
            className={`px-3 py-1.5 rounded-full transition-all cursor-pointer ${
              activeFilter === "orchha"
                ? "bg-primary text-primary-foreground shadow-sm font-semibold"
                : "text-foreground/75 hover:text-foreground"
            }`}
          >
            2. Orchha Palace
          </button>
        </div>

        {/* Timeline Event Stream with generous card separation */}
        <div className="max-w-sm mx-auto text-left px-1 sm:px-3">
          {filteredEvents.map((ev, idx) => {
            const isLast = idx === filteredEvents.length - 1;
            return (
              <div key={idx} className="flex gap-4 sm:gap-5 relative">
                {/* Left Column: Spine & Dot */}
                <div className="flex flex-col items-center pt-1.5 shrink-0">
                  <div
                    className={`w-4 h-4 rounded-full z-10 flex items-center justify-center shrink-0 ${
                      ev.isJourney ? "bg-[#c99738]" : "bg-primary"
                    }`}
                    style={{
                      boxShadow: "0 0 0 4px hsl(var(--cream)), 0 2px 8px rgba(139, 35, 58, 0.4)",
                    }}
                  />
                  {!isLast && <div className="timeline-spine-track" />}
                </div>

                {/* Right Column: Event Content Card with guaranteed 34px bottom padding */}
                <div
                  className={`flex-1 timeline-card-col ${isLast ? "last-item" : ""}`}
                  style={{ paddingBottom: isLast ? "10px" : "34px" }}
                >
                  <div
                    className={`p-5 sm:p-6 rounded-2xl border transition-all ${
                      ev.isJourney
                        ? "bg-gradient-to-br from-card via-[#fffaf0] to-card border-[#c99738]/50 shadow-gold"
                        : "bg-card border-border shadow-sm"
                    }`}
                  >
                    {/* Top Row: Location Badge & Time */}
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span
                        className={`inline-flex items-center gap-1.5 text-[11px] font-display font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                          ev.isJourney
                            ? "bg-[#c99738]/15 text-[#8b6514]"
                            : ev.step === 1
                            ? "bg-primary/10 text-primary"
                            : "bg-primary/10 text-primary"
                        }`}
                      >
                        {ev.isJourney ? (
                          <BusIcon className="w-3 h-3 shrink-0" />
                        ) : (
                          <MapPinIcon className="w-3 h-3 shrink-0" />
                        )}
                        <span>{ev.locationTag}</span>
                      </span>

                      <span className="text-xs font-display font-bold text-primary">
                        {ev.time}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-foreground font-display font-semibold text-lg leading-snug">
                      {ev.title}
                    </h3>

                    {/* Date */}
                    <p className="text-xs font-display font-medium text-muted-foreground mt-0.5 mb-2.5">
                      {ev.date}
                    </p>

                    {/* Venue indicator */}
                    {ev.venueName && (
                      <p className="text-xs text-foreground/85 font-display font-medium flex items-center gap-1.5 mb-2.5">
                        <MapPinIcon className="w-3.5 h-3.5 text-primary shrink-0" />
                        <span>{ev.venueName}</span>
                      </p>
                    )}

                    {/* Highlight Dinner pill if specified */}
                    {ev.dinnerTime && (
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-950 text-xs font-display font-semibold mb-2.5">
                        <UtensilsIcon className="w-3.5 h-3.5 text-amber-800 shrink-0" />
                        <span>Dinner at {ev.dinnerTime}</span>
                      </div>
                    )}

                    {/* Special Journey Callout */}
                    {ev.isJourney && (
                      <div className="p-3 rounded-xl bg-amber-50/90 border border-amber-200/80 text-xs font-body text-amber-950 mb-2.5 leading-relaxed">
                        <p className="font-display font-bold text-[#8b6514] mb-1 flex items-center gap-1.5">
                          <BusIcon className="w-3.5 h-3.5 text-[#8b6514] shrink-0" />
                          <span>Overnight Journey by Bus</span>
                        </p>
                        Departure strictly at 11:00 PM from Pooja Hospital, Narnaul to Raj Vilas Palace, Orchha (MP).
                      </div>
                    )}

                    {/* Description */}
                    <p className="text-xs text-muted-foreground leading-relaxed font-body">
                      {ev.desc}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
