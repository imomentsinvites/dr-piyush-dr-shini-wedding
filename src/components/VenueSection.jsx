import React, { useState } from "react";
import { OrnateDivider, MapPinIcon, ExternalLinkIcon, BusIcon, NavigationIcon } from "./common/Icons";
import { WEDDING_DATA } from "../constants/weddingData";

export function VenueSection() {
  const [activeTab, setActiveTab] = useState("all");

  const baratVenue = WEDDING_DATA.venues[0];
  const destinationVenue = WEDDING_DATA.venues[1];

  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 relative overflow-hidden text-center">
      <div className="max-w-xl mx-auto">
        <MapPinIcon className="w-7 h-7 mx-auto text-primary mb-3" />
        <h2 className="font-calligraphy text-4xl md:text-5xl text-primary mb-2">
          Wedding Venues &amp; Journey
        </h2>
        <OrnateDivider />

        <p className="text-muted-foreground font-display text-xs sm:text-sm max-w-md mx-auto -mt-2 mb-6">
          The celebrations begin with the Baraat in Narnaul, followed by the grand destination wedding in Orchha, MP.
        </p>

        {/* View Switcher Tabs */}
        <div className="flex items-center justify-center gap-1.5 p-1 bg-primary/10 rounded-full max-w-xs mx-auto mb-8 text-xs font-display font-medium">
          <button
            type="button"
            onClick={() => setActiveTab("all")}
            className={`px-3 py-1.5 rounded-full transition-all cursor-pointer ${
              activeTab === "all"
                ? "bg-primary text-primary-foreground shadow-sm font-semibold"
                : "text-foreground/75 hover:text-foreground"
            }`}
          >
            Full Route (1 &amp; 2)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("barat")}
            className={`px-3 py-1.5 rounded-full transition-all cursor-pointer ${
              activeTab === "barat"
                ? "bg-primary text-primary-foreground shadow-sm font-semibold"
                : "text-foreground/75 hover:text-foreground"
            }`}
          >
            1. Baraat
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("destination")}
            className={`px-3 py-1.5 rounded-full transition-all cursor-pointer ${
              activeTab === "destination"
                ? "bg-primary text-primary-foreground shadow-sm font-semibold"
                : "text-foreground/75 hover:text-foreground"
            }`}
          >
            2. Destination
          </button>
        </div>

        {/* ----------------- LOCATION 1: BARAAT VENUE ----------------- */}
        {(activeTab === "all" || activeTab === "barat") && (
          <div className="rounded-3xl border border-primary/20 bg-card p-5 sm:p-7 shadow-elegant text-left relative overflow-hidden mb-6">
            {/* Top Badge Row */}
            <div className="flex items-center justify-between gap-3 mb-3">
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-full bg-primary text-primary-foreground font-display font-bold text-sm flex items-center justify-center shadow-gold shrink-0">
                  1
                </span>
                <div>
                  <span className="text-[11px] font-display font-bold uppercase tracking-wider text-primary block">
                    Baraat &amp; Pre-Wedding
                  </span>
                  <span className="text-xs text-muted-foreground font-display">
                    Starting Point
                  </span>
                </div>
              </div>

              <span className="text-[11px] font-display font-semibold px-2.5 py-1 rounded-full bg-primary/10 text-primary whitespace-nowrap">
                1st – 2nd Dec 2026
              </span>
            </div>

            {/* Venue Details */}
            <h3 className="font-display text-2xl font-bold text-foreground">
              {baratVenue.name}
            </h3>
            <p className="text-xs font-display font-medium text-primary mt-0.5">
              {baratVenue.subtitle}
            </p>
            <p className="text-sm font-display text-muted-foreground mt-1 mb-3">
              {baratVenue.address}
            </p>

            {/* Highlights pill */}
            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs font-display text-amber-950 mb-4 leading-relaxed">
              <p className="font-bold text-amber-900 mb-0.5">
                Key Ceremonies in Narnaul:
              </p>
              Lagan Ceremony (1st Dec, 5 PM) • Nikashi (2nd Dec, 7 PM) • Baraat Departure (2nd Dec, 11 PM)
            </div>

            {/* Embedded Google Map */}
            <div className="rounded-2xl overflow-hidden shadow-sm border border-border mb-4">
              <iframe
                src={baratVenue.googleMapsEmbed}
                width="100%"
                height="220"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Pooja Hospital Narnaul Map"
              />
            </div>

            <a
              href={baratVenue.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl font-display text-xs font-semibold tracking-wider uppercase shadow-gold hover:opacity-95 transition-all transform active:scale-95 cursor-pointer"
              style={{ backgroundColor: "hsl(var(--primary))", color: "#ffffff" }}
            >
              <NavigationIcon className="w-4 h-4" />
              <span>Get Directions to Pooja Hospital</span>
              <ExternalLinkIcon className="w-3.5 h-3.5" />
            </a>
          </div>
        )}

        {/* ----------------- CONNECTING ROYAL JOURNEY PATH SVG ----------------- */}
        {activeTab === "all" && (
          <div className="relative py-2 my-2 flex flex-col items-center justify-center">
            {/* Upper Path Line with Animated Pulse */}
            <svg
              width="60"
              height="36"
              viewBox="0 0 60 36"
              fill="none"
              className="text-primary/40"
            >
              <path
                d="M30 0 V36"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeDasharray="4 4"
              />
              <circle cx="30" cy="18" r="3" fill="hsl(var(--primary))" />
            </svg>

            {/* Center Journey Pill Card */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-[#fffdfa] via-[#fef7ec] to-[#fffdfa] border-2 border-[#c99738]/40 shadow-gold text-center max-w-sm w-full relative">
              <div className="inline-flex items-center justify-center gap-1.5 px-3 py-1 rounded-full bg-[#c99738]/20 text-[#8b6514] text-xs font-display font-bold tracking-wider uppercase mb-1.5">
                <BusIcon className="w-3.5 h-3.5" />
                <span>Baraat Journey • Step 1 ➔ Step 2</span>
              </div>

              <h4 className="font-display font-bold text-base text-foreground leading-snug">
                Narnaul (Haryana) ➔ Orchha (MP)
              </h4>

              <p className="text-xs font-display font-semibold text-primary mt-1">
                Departure: 2nd December at 11:00 PM by Bus
              </p>
              <p className="text-[11px] text-muted-foreground font-body mt-0.5">
                Overnight travel together to Raj Vilas Palace for Destination Wedding
              </p>
            </div>

            {/* Lower Path Line with Arrow */}
            <svg
              width="60"
              height="40"
              viewBox="0 0 60 40"
              fill="none"
              className="text-primary/40"
            >
              <path
                d="M30 0 V30"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeDasharray="4 4"
              />
              <path
                d="M24 24 L30 32 L36 24"
                stroke="hsl(var(--primary))"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        )}

        {/* ----------------- LOCATION 2: DESTINATION WEDDING VENUE ----------------- */}
        {(activeTab === "all" || activeTab === "destination") && (
          <div className="rounded-3xl border border-primary/20 bg-card p-5 sm:p-7 shadow-elegant text-left relative overflow-hidden">
            {/* Top Badge Row */}
            <div className="flex items-center justify-between gap-3 mb-3">
              <div className="flex items-center gap-2.5">
                <span
                  className="w-8 h-8 rounded-full font-display font-bold text-sm flex items-center justify-center shadow-gold shrink-0"
                  style={{ backgroundColor: "hsl(var(--primary))", color: "#ffffff" }}
                >
                  2
                </span>
                <div>
                  <span className="text-[11px] font-display font-bold uppercase tracking-wider text-primary block">
                    Destination Wedding
                  </span>
                  <span className="text-xs text-muted-foreground font-display">
                    Royal Palace &amp; Stay
                  </span>
                </div>
              </div>

              <span className="text-[11px] font-display font-semibold px-2.5 py-1 rounded-full bg-primary/10 text-primary whitespace-nowrap">
                3rd – 5th Dec 2026
              </span>
            </div>

            {/* Venue Details */}
            <h3 className="font-display text-2xl font-bold text-foreground">
              {destinationVenue.name}
            </h3>
            <p className="text-xs font-display font-medium text-primary mt-0.5">
              {destinationVenue.subtitle}
            </p>
            <p className="text-sm font-display text-muted-foreground mt-1 mb-3">
              {destinationVenue.address}
            </p>

            {/* Highlights pill */}
            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs font-display text-amber-950 mb-4 leading-relaxed">
              <p className="font-bold text-amber-900 mb-0.5">
                Destination Festivities in Orchha:
              </p>
              Mehendi (3rd Dec) • Royal Sangeet (3rd Dec) • Haldi &amp; Wedding Pheras (4th Dec) • Vidai (5th Dec)
            </div>

            {/* Embedded Google Map */}
            <div className="rounded-2xl overflow-hidden shadow-sm border border-border mb-4">
              <iframe
                src={destinationVenue.googleMapsEmbed}
                width="100%"
                height="220"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Raj Vilas Palace Orchha Map"
              />
            </div>

            <a
              href={destinationVenue.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl font-display text-xs font-semibold tracking-wider uppercase shadow-gold hover:opacity-95 transition-all transform active:scale-95 cursor-pointer"
              style={{ backgroundColor: "hsl(var(--primary))", color: "#ffffff" }}
            >
              <NavigationIcon className="w-4 h-4" />
              <span>Get Directions to Raj Vilas Palace</span>
              <ExternalLinkIcon className="w-3.5 h-3.5" />
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
