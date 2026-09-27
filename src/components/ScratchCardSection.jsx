import React, { useRef, useState, useEffect } from "react";
import { OrnateDivider, CalendarIcon, ChevronDownIcon } from "./common/Icons";
import { WEDDING_DATA, SCRATCH_PALETTE } from "../constants/weddingData";
import { triggerConfetti } from "../utils/confetti";
import { openGoogleCalendar, downloadIcsFile } from "../utils/calendar";

export function ScratchCardSection() {
  const assetBase = import.meta.env.BASE_URL;
  const [scratched, setScratched] = useState(false);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const canvasRef = useRef(null);
  const drawingRef = useRef(false);
  const lastPointRef = useRef(null);

  // Initialize Canvas with radial metallic rose-gold gradient & specks
  useEffect(() => {
    if (scratched) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.offsetWidth;
    const height = canvas.offsetHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    ctx.scale(dpr, dpr);

    // Radial rose-gold metallic gradient
    const grad = ctx.createRadialGradient(
      width * 0.45,
      height * 0.35,
      10,
      width * 0.5,
      height * 0.5,
      Math.max(width, height) * 0.75
    );
    grad.addColorStop(0, SCRATCH_PALETTE.gradStart);
    grad.addColorStop(0.45, SCRATCH_PALETTE.gradMid);
    grad.addColorStop(1, SCRATCH_PALETTE.gradEnd);
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    // Glitter specks
    const speckCount = Math.floor(width * height * 0.22);
    for (let i = 0; i < speckCount; i++) {
      const rx = Math.random() * width;
      const ry = Math.random() * height;
      const q = Math.random();
      let color;
      if (q < 0.55) color = `rgba(${SCRATCH_PALETTE.speckLightRgb}, ${0.35 + Math.random() * 0.55})`;
      else if (q < 0.85) color = `rgba(${SCRATCH_PALETTE.speckMidRgb}, ${0.4 + Math.random() * 0.5})`;
      else color = `rgba(255, 255, 255, ${0.55 + Math.random() * 0.4})`;
      ctx.fillStyle = color;
      const size = Math.random() < 0.92 ? 1 : 1.5;
      ctx.fillRect(rx, ry, size, size);
    }

    // Sparkle stars
    for (let i = 0; i < 70; i++) {
      const sx = Math.random() * width;
      const sy = Math.random() * height;
      ctx.fillStyle = `rgba(${SCRATCH_PALETTE.sparkleRgb}, ${0.7 + Math.random() * 0.3})`;
      ctx.beginPath();
      ctx.arc(sx, sy, 1 + Math.random() * 1.2, 0, Math.PI * 2);
      ctx.fill();
    }

    // Text instructions on scratch canvas
    ctx.fillStyle = "rgba(74, 21, 37, 0.8)";
    ctx.font = "600 13px 'Playfair Display', serif";
    ctx.textAlign = "center";
    ctx.fillText("SCRATCH TO REVEAL", width / 2, height / 2 + 5);
  }, [scratched]);

  const getPoint = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const rect = canvas.getBoundingClientRect();
    const touch = e.touches ? e.touches[0] : e;
    return {
      x: touch.clientX - rect.left,
      y: touch.clientY - rect.top,
    };
  };

  const handlePointerDown = (e) => {
    if (scratched) return;
    drawingRef.current = true;
    lastPointRef.current = getPoint(e);
  };

  const handlePointerMove = (e) => {
    if (!drawingRef.current || scratched) return;
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const currentPoint = getPoint(e);
    if (!currentPoint) return;

    ctx.globalCompositeOperation = "destination-out";
    ctx.lineWidth = 44;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    if (lastPointRef.current) {
      ctx.beginPath();
      ctx.moveTo(lastPointRef.current.x, lastPointRef.current.y);
      ctx.lineTo(currentPoint.x, currentPoint.y);
      ctx.stroke();
    } else {
      ctx.beginPath();
      ctx.arc(currentPoint.x, currentPoint.y, 22, 0, Math.PI * 2);
      ctx.fill();
    }
    lastPointRef.current = currentPoint;

    // Check transparency ratio
    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let cleared = 0;
    const totalSampled = imgData.data.length / 16;
    for (let i = 3; i < imgData.data.length; i += 16) {
      if (imgData.data[i] < 180) cleared++;
    }

    if (cleared / totalSampled >= 0.36) {
      setScratched(true);
      triggerConfetti();
    }
  };

  const handlePointerUp = () => {
    drawingRef.current = false;
    lastPointRef.current = null;
  };

  return (
    <section className="py-16 md:py-24 px-6 cream-bg relative text-center">
      {/* SVG Clip Path for Heart */}
      <svg width="0" height="0" className="absolute" aria-hidden="true">
        <defs>
          <clipPath id="royalHeartClip" clipPathUnits="objectBoundingBox">
            <path d="M0.5,0.96 C0.5,0.96 0.06,0.70 0.06,0.36 C0.06,0.18 0.20,0.06 0.32,0.06 C0.42,0.06 0.48,0.14 0.5,0.24 C0.52,0.14 0.58,0.06 0.68,0.06 C0.80,0.06 0.94,0.18 0.94,0.36 C0.94,0.70 0.5,0.96 0.5,0.96 Z" />
          </clipPath>
        </defs>
      </svg>

      <div className="max-w-md mx-auto">
        <h2 className="font-calligraphy text-4xl md:text-5xl text-primary mb-2">
          {scratched ? "Our Forever Begins" : "Scratch to Reveal"}
        </h2>
        <OrnateDivider />

        {/* Heart Scratch Container with Prominent Silhouette, Drop Shadow & Golden Border */}
        <div
          className="relative mx-auto aspect-[13/12] w-full max-w-[230px] sm:max-w-[270px] my-6"
          style={{
            filter: "drop-shadow(0 14px 28px rgba(90, 20, 38, 0.28))",
          }}
        >
          {/* Heart Clipped Content Area */}
          <div
            className="absolute inset-0 overflow-hidden"
            style={{
              clipPath: "url(#royalHeartClip)",
              WebkitClipPath: "url(#royalHeartClip)",
            }}
          >
            {/* Scratched Heart Backdrop with 6837.jpg Watercolor Texture */}
            <div
              className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center select-none bg-cover bg-center"
              style={{
                backgroundImage: `url(${assetBase}assets/6837.jpg)`,
                backgroundPosition: "center center",
                backgroundSize: "cover",
              }}
            >
              {/* Soft subtle radial lightness veil so the pink watercolor is vibrant yet typography is ultra clear */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(ellipse at center, rgba(255,255,255,0.45) 0%, rgba(255,255,255,0.15) 75%, transparent 100%)",
                }}
              />

              <div className="relative z-10 flex flex-col items-center justify-center">
                <p
                  className="font-calligraphic text-xl md:text-2xl mb-1 italic font-bold tracking-wide"
                  style={{ color: SCRATCH_PALETTE.titleColor }}
                >
                  You're Invited!
                </p>
                {(() => {
                  const dateMatch = WEDDING_DATA.weddingDateFormatted.match(/^(\d+)(ST|ND|RD|TH)?\s+(.+)$/i);
                  const dayNum = dateMatch ? dateMatch[1] : "";
                  const daySuffix = dateMatch ? dateMatch[2] : "";
                  const restOfDate = dateMatch ? dateMatch[3] : WEDDING_DATA.weddingDateFormatted;

                  return dayNum ? (
                    <div
                      className="font-display font-bold mt-0.5 mb-1 flex items-baseline justify-center gap-1.5"
                      style={{ color: SCRATCH_PALETTE.dateColor }}
                    >
                      <span
                        className="font-extrabold"
                        style={{
                          fontSize: "clamp(2.1rem, 8.5vw, 2.65rem)",
                          lineHeight: 1,
                          color: SCRATCH_PALETTE.dateColor,
                          textShadow: "0 1px 3px rgba(74, 21, 37, 0.2)",
                        }}
                      >
                        {dayNum}
                        {daySuffix && (
                          <span
                            style={{
                              fontSize: "0.48em",
                              verticalAlign: "super",
                              marginLeft: "1px",
                              fontWeight: 700,
                            }}
                          >
                            {daySuffix}
                          </span>
                        )}
                      </span>
                      <span
                        className="font-bold tracking-wider uppercase"
                        style={{
                          fontSize: "clamp(1.02rem, 3.8vw, 1.25rem)",
                          letterSpacing: "0.06em",
                          lineHeight: 1,
                        }}
                      >
                        {restOfDate}
                      </span>
                    </div>
                  ) : (
                    <p
                      className="font-display text-lg sm:text-xl font-bold tracking-wider mt-1"
                      style={{ color: SCRATCH_PALETTE.dateColor }}
                    >
                      {WEDDING_DATA.weddingDateFormatted}
                    </p>
                  );
                })()}
                <p
                  className="font-calligraphic text-base sm:text-lg font-bold tracking-widest"
                  style={{ color: SCRATCH_PALETTE.dayColor }}
                >
                  {WEDDING_DATA.weddingDayOfWeek}
                </p>
                <p
                  className="text-xs uppercase tracking-widest mt-1 font-display font-semibold"
                  style={{ color: SCRATCH_PALETTE.timeColor }}
                >
                  {WEDDING_DATA.weddingTimeFormatted}
                </p>
              </div>
            </div>

            {/* Canvas Scratch Overlay */}
            {!scratched && (
              <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full cursor-pointer touch-none z-10"
                onMouseDown={handlePointerDown}
                onMouseMove={handlePointerMove}
                onMouseUp={handlePointerUp}
                onMouseLeave={handlePointerUp}
                onTouchStart={handlePointerDown}
                onTouchMove={handlePointerMove}
                onTouchEnd={handlePointerUp}
              />
            )}
          </div>

          {/* Delicate Heart Outline Border (made smaller/thinner as requested) */}
          <svg
            viewBox="0 0 100 100"
            className="absolute inset-0 w-full h-full pointer-events-none z-20"
            fill="none"
            preserveAspectRatio="none"
          >
            <path
              d="M50 96 C50 96 6 70 6 36 C6 18 20 6 32 6 C42 6 48 14 50 24 C52 14 58 6 68 6 C80 6 94 18 94 36 C94 70 50 96 50 96 Z"
              stroke="hsl(350, 60%, 42%)"
              strokeWidth="1.3"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.8"
            />
          </svg>
        </div>

        {/* Save The Date Button & Side-by-Side Calendar Options */}
        <div className="relative mt-4 flex flex-col items-center justify-center text-center w-full">
          <button
            onClick={() => setCalendarOpen(!calendarOpen)}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-display text-sm tracking-wider uppercase font-semibold shadow-gold hover:opacity-95 transition-all transform active:scale-95 cursor-pointer"
          >
            <CalendarIcon className="w-4 h-4" />
            <span>Save The Date</span>
            <ChevronDownIcon
              className={`w-3.5 h-3.5 transition-transform duration-300 ${calendarOpen ? "rotate-180" : ""}`}
            />
          </button>

          {calendarOpen && (
            <div className="mt-3.5 w-full max-w-sm grid grid-cols-2 gap-2.5 px-2 py-2">
              <button
                type="button"
                onClick={() => {
                  openGoogleCalendar();
                  setCalendarOpen(false);
                }}
                className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-card border border-primary/30 shadow-elegant hover:bg-primary/10 transition-all text-xs font-display font-medium text-foreground cursor-pointer active:scale-95"
              >
                <span className="w-2 h-2 rounded-full bg-primary shrink-0" />
                <span className="whitespace-nowrap">Google Calendar</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  downloadIcsFile();
                  setCalendarOpen(false);
                }}
                className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-card border border-primary/30 shadow-elegant hover:bg-primary/10 transition-all text-xs font-display font-medium text-foreground cursor-pointer active:scale-95"
              >
                <span className="w-2 h-2 rounded-full bg-primary shrink-0" />
                <span className="whitespace-nowrap">Apple / Outlook</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
