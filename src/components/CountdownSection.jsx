import React, { useState, useEffect } from "react";
import { OrnateDivider } from "./common/Icons";
import { WEDDING_DATA } from "../constants/weddingData";

function RollingNumber({ value }) {
  const [currentVal, setCurrentVal] = useState(value);
  const [prevVal, setPrevVal] = useState(value);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    if (value !== currentVal) {
      setPrevVal(currentVal);
      setCurrentVal(value);
      setAnimating(true);
      const timer = setTimeout(() => {
        setAnimating(false);
      }, 480);
      return () => clearTimeout(timer);
    }
  }, [value, currentVal]);

  const formattedCurrent = String(currentVal).padStart(2, "0");
  const formattedPrev = String(prevVal).padStart(2, "0");

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      {animating ? (
        <>
          {/* Old number smoothly going down */}
          <span className="absolute inset-0 flex items-center justify-center font-display text-2xl sm:text-3xl font-bold text-primary tabular-nums select-none animate-roll-out-down">
            {formattedPrev}
          </span>
          {/* New number coming from up */}
          <span className="absolute inset-0 flex items-center justify-center font-display text-2xl sm:text-3xl font-bold text-primary tabular-nums select-none animate-roll-in-from-top">
            {formattedCurrent}
          </span>
        </>
      ) : (
        <span className="font-display text-2xl sm:text-3xl font-bold text-primary tabular-nums select-none">
          {formattedCurrent}
        </span>
      )}
    </div>
  );
}

export function CountdownSection() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const updateCountdown = () => {
      const now = Date.now();
      const diff = WEDDING_DATA.targetTimestamp - now;
      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
      });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  const timeBlocks = [
    { label: "DAYS", value: timeLeft.days },
    { label: "HOURS", value: timeLeft.hours },
    { label: "MINS", value: timeLeft.minutes },
    { label: "SECS", value: timeLeft.seconds },
  ];

  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 cream-bg relative overflow-hidden text-center">
      <div className="max-w-md mx-auto">
        <h2 className="font-calligraphy text-4xl md:text-5xl text-primary mb-2">
          Counting Down to Forever
        </h2>
        <OrnateDivider />

        {/* Digital rolling clock boxes in pinkish white earlier style */}
        <div className="flex justify-center gap-2.5 sm:gap-3.5 mt-8">
          {timeBlocks.map((block) => (
            <div
              key={block.label}
              className="countdown-box-card group hover:border-primary/40 transition-all"
            >
              {/* Rolling Number Container (clipped) */}
              <div className="relative w-full flex-1 flex items-center justify-center overflow-hidden">
                <RollingNumber value={block.value} />
              </div>

              {/* Label inside the card bottom (DAYS, HOURS, MINS, SECS) */}
              <span className="countdown-box-label">
                {block.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
