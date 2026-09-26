import React from "react";
import { OrnateDivider, MapPinIcon, ExternalLinkIcon } from "./common/Icons";
import { WEDDING_DATA } from "../constants/weddingData";

export function VenueSection() {
  return (
    <section className="py-16 md:py-24 px-6 relative overflow-hidden text-center">
      <div className="max-w-2xl mx-auto">
        <MapPinIcon className="w-7 h-7 mx-auto text-primary mb-3" />
        <h2 className="font-calligraphy text-4xl md:text-5xl text-primary mb-2">
          The Venue
        </h2>
        <OrnateDivider />

        <div className="text-center mb-8">
          <p className="font-display text-2xl md:text-3xl font-semibold text-foreground mb-1">
            {WEDDING_DATA.venueName}
          </p>
          <p className="text-muted-foreground font-display text-base">
            {WEDDING_DATA.venueAddress}
          </p>
        </div>

        {/* Embedded Google Map */}
        <div className="max-w-xl mx-auto rounded-2xl overflow-hidden shadow-elegant border border-border mb-8">
          <iframe
            src="https://maps.google.com/maps?q=Raj+Vilas+Orchha+Madhya+Pradesh&t=m&z=14&output=embed"
            width="100%"
            height="300"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Raj Vilas Venue Map"
          />
        </div>

        <a
          href={WEDDING_DATA.googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-display text-sm tracking-wider uppercase font-semibold shadow-gold hover:opacity-95 transition-all transform active:scale-95 cursor-pointer"
        >
          <span>View on Google Maps</span>
          <ExternalLinkIcon className="w-4 h-4" />
        </a>
      </div>
    </section>
  );
}
