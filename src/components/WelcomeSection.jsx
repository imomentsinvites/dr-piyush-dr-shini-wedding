import React from "react";
import { HeartIcon } from "./common/Icons";
import { WEDDING_DATA } from "../constants/weddingData";

export function WelcomeSection() {
  return (
    <section
      className="relative px-6 py-20 md:py-28 overflow-hidden text-center"
      style={{
        background:
          "linear-gradient(to bottom, #282E39 0%, #282E39 65%, #6a646c 84%, #F5E5E8 100%)",
      }}
    >
      <div className="max-w-2xl mx-auto relative z-10">
        {/* Top Ornament */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <div
            className="h-px w-20"
            style={{ background: "linear-gradient(to right, transparent, #e5a4b1)" }}
          />
          <HeartIcon size={14} style={{ color: "#e5a4b1" }} />
          <div
            className="h-px w-20"
            style={{ background: "linear-gradient(to left, transparent, #e5a4b1)" }}
          />
        </div>

        {/* Message */}
        <p
          className="font-calligraphic text-2xl md:text-3xl leading-relaxed italic whitespace-pre-wrap break-words"
          style={{
            color: "#FFF2F5",
            textShadow: "0 2px 14px rgba(0,0,0,0.75)",
          }}
        >
          {WEDDING_DATA.welcomeMessage}
        </p>

        {/* Bottom Ornament */}
        <div className="flex items-center justify-center gap-3 mt-6">
          <div
            className="h-px w-20"
            style={{ background: "linear-gradient(to right, transparent, #e5a4b1)" }}
          />
          <HeartIcon size={14} style={{ color: "#e5a4b1" }} />
          <div
            className="h-px w-20"
            style={{ background: "linear-gradient(to left, transparent, #e5a4b1)" }}
          />
        </div>
      </div>
    </section>
  );
}
