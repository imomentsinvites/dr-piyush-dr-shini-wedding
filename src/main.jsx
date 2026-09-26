import React, { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

const MAPS_URL = "https://maps.app.goo.gl/SjAinaMEUt6Tcjgt7?g_st=ic";
const MUSIC_URL = "/assets/music.mp3";

function Opening({ onOpen }) {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  const openInvitation = async () => {
    const video = videoRef.current;
    setPlaying(true);
    if (video) {
      try {
        video.currentTime = 0;
        await video.play();
      } catch {
        // Some browsers can still block playback; the invitation remains usable.
      }
    }
  };

  return (
    <section className={`opening ${playing ? "opening--playing" : ""}`}>
      <video
        ref={videoRef}
        className="opening__video"
        src="/assets/opening.mp4"
        poster="/assets/opening-poster.jpg"
        playsInline
        muted
        preload="metadata"
        onEnded={onOpen}
        aria-hidden="true"
      />
      <div className="opening__veil" />
      {!playing && (
        <>
          <button className="seal-button" onClick={openInvitation} aria-label="Open wedding invitation">
            <span className="seal-button__ornament">✦</span>
            <span>Tap to open</span>
            <span className="seal-button__ornament">✦</span>
          </button>
          <div className="opening__caption">
            <span className="ornament-line" />
            <p>YOU ARE INVITED</p>
            <span className="ornament-line" />
          </div>
        </>
      )}
      {playing && <button className="skip-button" onClick={onOpen}>Skip intro</button>}
    </section>
  );
}

function ScratchDate() {
  const [scratched, setScratched] = useState(false);
  const canvasRef = useRef(null);
  const drawing = useRef(false);
  const last = useRef(null);
  const revealCheck = useRef(null);

  const paintFoil = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.max(1, Math.round(rect.width * dpr));
    canvas.height = Math.max(1, Math.round(rect.height * dpr));
    const ctx = canvas.getContext("2d");
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.globalCompositeOperation = "source-over";

    const grad = ctx.createLinearGradient(0, 0, rect.width, rect.height);
    grad.addColorStop(0, "#72521c");
    grad.addColorStop(0.14, "#f4d77c");
    grad.addColorStop(0.30, "#9c7020");
    grad.addColorStop(0.48, "#fff0ad");
    grad.addColorStop(0.65, "#b17f24");
    grad.addColorStop(0.82, "#f6dc85");
    grad.addColorStop(1, "#85611f");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, rect.width, rect.height);

    ctx.save();
    ctx.globalAlpha = 0.14;
    ctx.fillStyle = "#fff";
    for (let i = -rect.height; i < rect.width + rect.height; i += 12) {
      ctx.save();
      ctx.translate(i, 0);
      ctx.rotate(-0.45);
      ctx.fillRect(0, 0, 2, rect.height * 2);
      ctx.restore();
    }
    ctx.restore();

    ctx.fillStyle = "rgba(44,30,12,.86)";
    ctx.font = "600 12px Georgia, serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("SCRATCH TO REVEAL", rect.width / 2, rect.height / 2);
  };

  useEffect(() => {
    paintFoil();
    const onResize = () => {
      if (!scratched) paintFoil();
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [scratched]);

  const point = (event) => {
    const rect = canvasRef.current.getBoundingClientRect();
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };
  };

  const checkReveal = () => {
    if (revealCheck.current) return;
    revealCheck.current = requestAnimationFrame(() => {
      revealCheck.current = null;
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
      let transparent = 0;
      let sampled = 0;
      for (let i = 3; i < pixels.length; i += 64) {
        sampled += 1;
        if (pixels[i] < 50) transparent += 1;
      }
      if (sampled && transparent / sampled > 0.42) setScratched(true);
    });
  };

  const scratch = (event) => {
    if (!drawing.current || scratched) return;
    event.preventDefault();
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const p = point(event);
    const prev = last.current || p;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    ctx.save();
    ctx.scale(scaleX, scaleY);
    ctx.globalCompositeOperation = "destination-out";
    ctx.lineWidth = 44;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.beginPath();
    ctx.moveTo(prev.x, prev.y);
    ctx.lineTo(p.x, p.y);
    ctx.stroke();
    ctx.restore();

    last.current = p;
    checkReveal();
  };

  const end = () => {
    drawing.current = false;
    last.current = null;
  };

  return (
    <div className={`scratch ${scratched ? "scratch--done" : ""}`}>
      <div className="scratch__reveal" aria-hidden={!scratched}>
        <span>FRIDAY</span>
        <strong>4</strong>
        <span>DECEMBER 2026</span>
        <small>THE WEDDING DAY</small>
      </div>
      {!scratched && (
        <canvas
          ref={canvasRef}
          onPointerDown={(event) => {
            event.currentTarget.setPointerCapture?.(event.pointerId);
            drawing.current = true;
            last.current = point(event);
          }}
          onPointerMove={scratch}
          onPointerUp={end}
          onPointerCancel={end}
        />
      )}
    </div>
  );
}

function MusicPlayer({ audioRef }) {
  const [playing, setPlaying] = useState(false);
  const [available, setAvailable] = useState(true);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onError = () => setAvailable(false);
    audio.addEventListener("error", onError);
    return () => audio.removeEventListener("error", onError);
  }, [audioRef]);

  const toggle = async () => {
    const audio = audioRef.current;
    if (!audio || !available) return;
    try {
      if (audio.paused) {
        await audio.play();
        setPlaying(true);
      } else {
        audio.pause();
        setPlaying(false);
      }
    } catch {
      setPlaying(false);
    }
  };

  if (!available) return null;

  return (
    <button className="music-button" onClick={toggle} aria-label={playing ? "Pause music" : "Play music"}>
      <span className={`music-button__icon ${playing ? "is-playing" : ""}`}>{playing ? "Ⅱ" : "♪"}</span>
      <span>{playing ? "Music on" : "Music"}</span>
    </button>
  );
}

function App() {
  const [opened, setOpened] = useState(false);
  const audioRef = useRef(null);

  const openInvitation = () => {
    setOpened(true);
    const audio = audioRef.current;
    if (audio) {
      audio.volume = 0.48;
      audio.currentTime = 0;
      audio.play().catch(() => {
        // Autoplay is allowed after a tap on most mobile browsers; if not, the music button remains available.
      });
    }
  };

  useEffect(() => {
    document.body.classList.toggle("locked", !opened);
    return () => document.body.classList.remove("locked");
  }, [opened]);

  return (
    <>
      <audio ref={audioRef} src={MUSIC_URL} loop preload="none" />
      {!opened ? (
        <Opening onOpen={openInvitation} />
      ) : (
        <main className="invitation">
          <section className="hero">
            <video
              className="hero__video"
              src="/assets/background.mp4"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              aria-hidden="true"
            />
            <div className="hero__shade" />
            <MusicPlayer audioRef={audioRef} />
            <div className="hero__content">
              <p className="eyebrow">TOGETHER WITH OUR FAMILIES &amp; FRIENDS</p>
              <div className="hero__names">
                <h1>Dr. Piyush</h1>
                <span>&amp;</span>
                <h1>Dr. Shini</h1>
              </div>
              <p className="hero__copy">Request the pleasure of your company as we celebrate our marriage, love, and a lifetime of happiness.</p>
              <div className="date-plaque">
                <span>FRIDAY</span>
                <div><small>DECEMBER</small><b>4</b><small>2026</small></div>
                <span>THE WEDDING DAY</span>
              </div>
            </div>
          </section>

          <section className="section section--paper">
            <p className="eyebrow">THE CELEBRATIONS</p>
            <h2>Two days. One beautiful beginning.</h2>
            <div className="events">
              <article className="event-card">
                <span>03</span>
                <div><small>DECEMBER 2026</small><h3>Pre-Wedding Celebrations</h3><p>Join us as the festivities begin.</p></div>
              </article>
              <article className="event-card event-card--wedding">
                <span>04</span>
                <div><small>DECEMBER 2026</small><h3>The Wedding</h3><p>A day of vows, family, love and celebration.</p></div>
              </article>
            </div>
          </section>

          <section className="section section--dark">
            <p className="eyebrow">A LITTLE SECRET</p>
            <h2>Reveal the date</h2>
            <ScratchDate />
          </section>

          <section className="section venue">
            <p className="eyebrow">THE VENUE</p>
            <h2>Raj Vilas</h2>
            <p className="venue__place">Orchha, Madhya Pradesh</p>
            <div className="venue__ornament">✦</div>
            <a className="map-button" href={MAPS_URL} target="_blank" rel="noreferrer">Open in Google Maps <span>↗</span></a>
          </section>

          <footer className="footer">
            <p>WITH LOVE,</p>
            <strong>Dr. Piyush &amp; Dr. Shini</strong>
            <span>03 · 04 DECEMBER 2026</span>
          </footer>
        </main>
      )}
    </>
  );

}

createRoot(document.getElementById("root")).render(<App />);
