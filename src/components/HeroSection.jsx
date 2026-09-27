import React, { useRef, useState, useEffect } from "react";
import { HeartIcon } from "./common/Icons";
import { WEDDING_DATA } from "../constants/weddingData";

export function HeroSection({ isVideoPlaying, onStartPlayback }) {
  const videoRef = useRef(null);
  const [showOverlay, setShowOverlay] = useState(false);
  const assetBase = import.meta.env.BASE_URL;

  // Handle click on the hero screen to start playback
  const handleHeroClick = () => {
    if (!isVideoPlaying && onStartPlayback) {
      onStartPlayback();
    }
  };

  // Play/pause the video when isVideoPlaying state changes
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (isVideoPlaying) {
      video.play().catch(() => { });
      // Fallback timer for 8 seconds (0:08)
      const timer = setTimeout(() => {
        setShowOverlay(true);
      }, 8000);
      return () => clearTimeout(timer);
    }
  }, [isVideoPlaying]);

  // Trigger text overlay precisely at time 0.08 (8.0 seconds)
  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (video && video.currentTime >= 8.0 && !showOverlay) {
      setShowOverlay(true);
    }
  };

  const handleOpeningEnded = () => {
    setShowOverlay(true);
    const video = videoRef.current;
    if (video) {
      video.src = `${assetBase}assets/background.mp4`;
      video.loop = true;
      video.play().catch(() => { });
    }
  };

  return (
    <section
      className="hero-viewport"
      onClick={handleHeroClick}
    >
      {/* Video Element with exact 0.08 timeupdate detection */}
      <video
        ref={videoRef}
        src={`${assetBase}assets/opening.mp4`}
        poster={`${assetBase}assets/opening-poster.jpg`}
        className="absolute inset-0 h-full w-full object-cover"
        playsInline
        muted
        preload="auto"
        controls={false}
        disablePictureInPicture
        controlsList="nodownload noplaybackrate noremoteplayback nofullscreen"
        onContextMenu={(e) => e.preventDefault()}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleOpeningEnded}
      />

      {/* Cinematic Vignette Overlay matching reference */}
      <div
        className={`absolute inset-0 pointer-events-none transition-opacity duration-1000 ${showOverlay ? "opacity-100" : "opacity-0"
          }`}
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.15) 45%, rgba(0,0,0,0.55) 100%)",
        }}
      />

      {/* Opened Couple Names Overlay - Appears at time 0.08 */}
      <div
        className={`relative z-10 flex w-full flex-col items-center justify-center px-4 sm:px-6 text-center transition-all duration-1000 transform ${showOverlay
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 translate-y-6 pointer-events-none"
          }`}
      >
        {/* 1. Top Heart Icon */}
        <div className="mb-2">
          <HeartIcon
            size={24}
            className="mx-auto"
            style={{ color: "#f5e6e0" }}
          />
        </div>

        {/* 2. Intro Message in 'Great Vibes' / Dancing Script */}
        <p
          className="mb-1.5 whitespace-pre-line leading-tight"
          style={{
            fontFamily: "'Great Vibes', 'Dancing Script', cursive",
            color: "#f5e6e0",
            fontSize: "clamp(22px, 5.5vw, 26px)",
            textShadow: "0 2px 12px rgba(0,0,0,0.75)",
          }}
        >
          {WEDDING_DATA.introMessage}
        </p>

        {/* 3. Divider with Center Heart */}
        <div className="mt-1.5 mb-3 sm:mb-4 flex items-center justify-center gap-2.5">
          <div
            className="h-px w-14"
            style={{ backgroundColor: "rgba(245,230,224,0.45)" }}
          />
          <HeartIcon
            size={10}
            style={{ color: "#f5e6e0" }}
          />
          <div
            className="h-px w-14"
            style={{ backgroundColor: "rgba(245,230,224,0.45)" }}
          />
        </div>

        {/* 4. Groom Name in 'Great Vibes' */}
        <h1
          className="font-normal"
          style={{
            fontFamily: "'Great Vibes', 'Dancing Script', cursive",
            color: "#f5e6e0",
            fontSize: "clamp(2.6rem, 9.5vw, 3.6rem)",
            lineHeight: 1.1,
            paddingTop: "0.2rem",
            textShadow: "0 2px 14px rgba(0,0,0,0.75)",
          }}
        >
          {WEDDING_DATA.groom}
        </h1>

        {/* Groom Parents */}
        {WEDDING_DATA.groomParents && (
          <p
            className="mt-0.5 mb-1.5 font-display tracking-wide"
            style={{
              fontFamily: "'Cormorant Garamond', 'Playfair Display', serif",
              color: "rgba(245, 230, 224, 0.92)",
              fontSize: "clamp(0.9rem, 3.2vw, 1.08rem)",
              letterSpacing: "0.025em",
              textShadow: "0 2px 10px rgba(0,0,0,0.8)",
              fontWeight: 500,
            }}
          >
            {WEDDING_DATA.groomParents}
          </p>
        )}

        {/* 5. With in 'Great Vibes' */}
        <p
          className="my-0.5"
          style={{
            fontFamily: "'Great Vibes', 'Dancing Script', cursive",
            color: "rgba(245,230,224,0.85)",
            fontSize: "clamp(20px, 5vw, 25px)",
            textShadow: "0 2px 10px rgba(0,0,0,0.6)",
          }}
        >
          {WEDDING_DATA.withText || "With"}
        </p>

        {/* 6. Bride Name in 'Great Vibes' */}
        <h1
          className="leading-none font-normal"
          style={{
            fontFamily: "'Great Vibes', 'Dancing Script', cursive",
            color: "#f5e6e0",
            fontSize: "clamp(2.6rem, 9.5vw, 3.6rem)",
            lineHeight: 1.1,
            textShadow: "0 2px 14px rgba(0,0,0,0.75)",
          }}
        >
          {WEDDING_DATA.bride}
        </h1>

        {/* Bride Parents */}
        {WEDDING_DATA.brideParents && (
          <p
            className="mt-0.5 font-display tracking-wide"
            style={{
              fontFamily: "'Cormorant Garamond', 'Playfair Display', serif",
              color: "rgba(245, 230, 224, 0.92)",
              fontSize: "clamp(0.9rem, 3.2vw, 1.08rem)",
              letterSpacing: "0.025em",
              textShadow: "0 2px 10px rgba(0,0,0,0.8)",
              fontWeight: 500,
            }}
          >
            {WEDDING_DATA.brideParents}
          </p>
        )}
      </div>

      {/* Unopened hint at bottom of envelope screen */}
      {!isVideoPlaying && (
        <div className="absolute inset-x-0 bottom-8 z-20 flex flex-col items-center gap-2 pointer-events-none animate-pulse-slow">
          <div className="px-4 py-1.5 rounded-full bg-black/40 border border-white/20 backdrop-blur-md text-[#f5e6e0] text-xs font-display tracking-widest uppercase">
            Tap anywhere to open
          </div>
        </div>
      )}

      {/* 7. Bottom Bouncing Scroll Down indicator */}
      {showOverlay && (
        <div className="absolute inset-x-0 bottom-12 z-10 flex flex-col items-center gap-1.5 pointer-events-none animate-bounce-slow">
          <span
            className="text-xs uppercase tracking-[0.25em]"
            style={{
              color: "rgba(245,230,224,0.75)",
              textShadow: "0 1px 6px rgba(0,0,0,0.7)",
            }}
          >
            SCROLL
          </span>
          <svg
            className="w-5 h-5"
            style={{ color: "#f5e6e0" }}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      )}
    </section>
  );
}
