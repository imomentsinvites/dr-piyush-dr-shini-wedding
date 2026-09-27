import React from "react";
import { CornerOrnament, WavyDivider } from "./common/Icons";
import { WEDDING_DATA } from "../constants/weddingData";

export function FooterSection() {
  return (
    <footer className="py-16 md:py-24 px-6 text-center border-t border-border relative overflow-hidden">
      {/* Corner Embellishments */}
      <CornerOrnament className="absolute top-2 left-2 w-12 h-12 text-primary opacity-25" />
      <CornerOrnament className="absolute top-2 right-2 w-12 h-12 text-primary opacity-25 -scale-x-100" />

      <div className="max-w-lg mx-auto relative z-10">
        <WavyDivider className="text-primary mb-6" />

        <p className="font-calligraphy text-4xl md:text-5xl text-primary leading-tight mb-4">
          We can’t wait to celebrate with you!
        </p>

        <p className="text-xs uppercase tracking-widest text-muted-foreground font-display mt-6 font-medium">
          WITH LOVE,
        </p>

        <h3 className="font-dancing text-4xl md:text-5xl text-primary mt-2">
          {"Dr. Usha,\nDr.Dinesh Sharma"} &amp; {"Kaushik Family"}
        </h3>

        <p className="text-xs md:text-sm tracking-widest text-muted-foreground uppercase font-display mt-3">
          {WEDDING_DATA.datesSummary}
        </p>

        <WavyDivider className="text-primary mt-8 rotate-180" />
      </div>
    </footer>
  );
}
