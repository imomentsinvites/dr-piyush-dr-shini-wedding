import React, { useRef, useState } from "react";
import { DamaskPatternBackground } from "./components/common/Icons";
import { MusicControl } from "./components/MusicControl";
import { HeroSection } from "./components/HeroSection";
import { WelcomeSection } from "./components/WelcomeSection";
import { ScratchCardSection } from "./components/ScratchCardSection";
import { CountdownSection } from "./components/CountdownSection";
import { TimelineSection } from "./components/TimelineSection";
import { VenueSection } from "./components/VenueSection";
import { BlessingsSection } from "./components/BlessingsSection";
import { FooterSection } from "./components/FooterSection";
import { WEDDING_DATA } from "./constants/weddingData";

export default function App() {
  const audioRef = useRef(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [playingMusic, setPlayingMusic] = useState(false);
  const assetBase = import.meta.env.BASE_URL;

  const handleStartPlayback = () => {
    setIsVideoPlaying(true);
    const audio = audioRef.current;
    if (audio) {
      audio
        .play()
        .then(() => setPlayingMusic(true))
        .catch(() => {});
    }
  };

  return (
    <div className="desktop-ambient-backdrop">
      {/* Background Audio Tag */}
      <audio ref={audioRef} loop preload="auto" src={`${assetBase}music/track1.mp3`} />

      {/* Mobile Floating Sound Control Button (Fixed strictly at top-right of mobile screen) */}
      <div className="md:hidden">
        <MusicControl
          audioRef={audioRef}
          playing={playingMusic}
          setPlaying={setPlayingMusic}
          isVideoPlaying={isVideoPlaying}
          onStartPlayback={handleStartPlayback}
          className="mobile-sound-btn"
        />
      </div>

      {/* Desktop Flanking Left: DR. PIYUSH & DR. SHINI badge */}
      <div className="hidden md:flex desktop-flank-left">
        <div className="desktop-header-pill">
          <span style={{ color: "#f5d77f" }}>✦</span>
          <span style={{ color: "#ffffff", fontWeight: 700 }}>DR. PIYUSH &amp; DR. SHINI</span>
        </div>
      </div>

      {/* Desktop Flanking Right: Royal Invitation badge + Music Control */}
      <div className="hidden md:flex desktop-flank-right">
        <div className="desktop-badge-pill">
          <span>✨</span>
          <span style={{ color: "#ffffff", fontWeight: 700 }}>Royal Invitation</span>
        </div>

        {/* Desktop Sound Button right beside the badge */}
        <MusicControl
          audioRef={audioRef}
          playing={playingMusic}
          setPlaying={setPlayingMusic}
          isVideoPlaying={isVideoPlaying}
          onStartPlayback={handleStartPlayback}
          className="desktop-sound-btn"
        />
      </div>

      {/* Mobile Frame Container (Strictly Mobile Viewport on every screen, matching photo) */}
      <main className="mobile-phone-frame">
        {/* Damask Texture Overlay inside the invitation */}
        <DamaskPatternBackground />

        {/* 1. Hero & Opening Video Screen */}
        <HeroSection
          isVideoPlaying={isVideoPlaying}
          onStartPlayback={handleStartPlayback}
        />

        {/* 2. Welcome Message Section */}
        <WelcomeSection />

        {/* 3. Interactive Save The Date & Scratch Card Section */}
        <ScratchCardSection />

        {/* 4. Live Countdown Timer Section with Rolling Digits Animation */}
        <CountdownSection />

        {/* 5. Celebrations & Program Timeline Section with Unbroken Connecting Line */}
        <TimelineSection />

        {/* 6. Venue & Google Maps Section */}
        <VenueSection />

        {/* 7. Gifts & Blessings Section */}
        <BlessingsSection />

        {/* 8. Footer & End Message Section */}
        <FooterSection />
      </main>

      {/* Desktop Bottom Footer Note (Visible with bright luminous contrast) */}
      <footer className="hidden md:block select-none desktop-footer-text">
        {WEDDING_DATA.datesSummary}
      </footer>
    </div>
  );
}
