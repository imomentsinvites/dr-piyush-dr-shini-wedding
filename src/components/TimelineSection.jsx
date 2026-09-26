import React from "react";
import { OrnateDivider, ClockIcon } from "./common/Icons";
import { WEDDING_DATA } from "../constants/weddingData";

export function TimelineSection() {
  return (
    <section className="py-16 md:py-24 px-6 cream-bg relative overflow-hidden text-center">
      <div className="max-w-md mx-auto">
        <ClockIcon className="w-7 h-7 mx-auto text-primary mb-3" />
        <h2 className="font-calligraphy text-4xl md:text-5xl text-primary mb-2">
          Program Timeline
        </h2>
        <OrnateDivider />

        {/* Clean, well-spaced timeline with proper padding & connected spine */}
        <div className="mt-10 max-w-sm mx-auto text-left px-2 sm:px-4">
          {WEDDING_DATA.events.map((ev, idx) => (
            <div key={idx} className="flex gap-4 sm:gap-5 relative">
              {/* Left Column: Event Node Dot & Continuous Connecting Spine */}
              <div className="flex flex-col items-center pt-0.5">
                <div
                  className="w-4 h-4 rounded-full bg-primary shrink-0 z-10"
                  style={{
                    boxShadow: "0 0 0 4px hsl(var(--cream)), 0 2px 8px rgba(139, 35, 58, 0.4)",
                  }}
                />
                {idx < WEDDING_DATA.events.length - 1 && (
                  <div className="timeline-spine-track" />
                )}
              </div>

              {/* Right Column: Event Content with generous margin & padding */}
              <div className={`flex-1 ${idx < WEDDING_DATA.events.length - 1 ? "pb-12 sm:pb-14" : "pb-4"}`}>
                <h3 className="text-primary font-display font-semibold text-lg md:text-xl leading-snug">
                  {ev.title}
                </h3>
                <p className="text-sm font-display font-medium text-foreground mt-1 mb-2">
                  {ev.date}
                  {ev.time ? ` • ${ev.time}` : ""}
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed font-body">
                  {ev.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
