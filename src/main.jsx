import React, { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

const MAPS_URL = "https://maps.app.goo.gl/SjAinaMEUt6Tcjgt7?g_st=ic";
const ASSET_BASE = import.meta.env.BASE_URL;

function Opening({ onOpen }) {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  const openInvitation = async () => {
    const video = videoRef.current;
    if (video) {
      try {
        video.currentTime = 0;
        await video.play();
        setPlaying(true);
      } catch {
        setPlaying(true);
      }
    } else {
      setPlaying(true);
    }
  };

  return (
    <section className={`opening ${playing ? "opening--playing" : ""}`}>
      <video
        ref={videoRef}
        className="opening__video"
        src={`${ASSET_BASE}assets/opening.mp4`}
        poster={`${ASSET_BASE}assets/opening-poster.jpg`}
        playsInline
        muted
        preload="metadata"
        onEnded={onOpen}
        aria-hidden="true"
      />
      <div className="opening__veil" />
      {!playing && (
        <button className="seal-button" onClick={openInvitation} aria-label="Open wedding invitation">
          <span className="seal-button__ornament">✦</span>
          <span>Tap to open</span>
          <span className="seal-button__ornament">✦</span>
        </button>
      )}
      {!playing && (
        <div className="opening__caption">
          <span className="ornament-line" />
          <p>YOU ARE INVITED</p>
          <span className="ornament-line" />
        </div>
      )}
      {playing && (
        <button className="skip-button" onClick={onOpen}>Skip intro</button>
      )}
    </section>
  );
}

function ScratchDate() {
  const [scratched, setScratched] = useState(false);
  const canvasRef = useRef(null);
  const drawing = useRef(false);
  const last = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(rect.width * dpr);
      canvas.height = Math.round(rect.height * dpr);
      const ctx = canvas.getContext("2d");
      ctx.scale(dpr, dpr);
      ctx.globalCompositeOperation = "source-over";
      const grad = ctx.createLinearGradient(0, 0, rect.width, rect.height);
      grad.addColorStop(0, "#8b6a25");
      grad.addColorStop(.18, "#f6df8d");
      grad.addColorStop(.38, "#a87922");
      grad.addColorStop(.58, "#fff0ac");
      grad.addColorStop(.78, "#b5842b");
      grad.addColorStop(1, "#f1d477");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, rect.width, rect.height);
      ctx.fillStyle = "rgba(255,255,255,.13)";
      for (let i = -rect.height; i < rect.width + rect.height; i += 14) {
        ctx.save();
        ctx.translate(i, 0);
        ctx.rotate(-0.45);
        ctx.fillRect(0, 0, 3, rect.height * 2);
        ctx.restore();
      }
      ctx.fillStyle = "rgba(44,30,12,.82)";
      ctx.font = "600 12px Georgia, serif";
      ctx.textAlign = "center";
      ctx.fillText("SCRATCH TO REVEAL", rect.width / 2, rect.height / 2 + 4);
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  const point = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const touch = e.touches?.[0];
    const x = (touch ? touch.clientX : e.clientX) - rect.left;
    const y = (touch ? touch.clientY : e.clientY) - rect.top;
    return {x,y};
  };

  const scratch = (e) => {
    if (!drawing.current || scratched) return;
    e.preventDefault();
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const p = point(e);
    const prev = last.current || p;
    ctx.globalCompositeOperation = "destination-out";
    ctx.lineWidth = 42;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.beginPath();
    ctx.moveTo(prev.x, prev.y);
    ctx.lineTo(p.x, p.y);
    ctx.stroke();
    last.current = p;

    const pixels = ctx.getImageData(0,0,canvas.width,canvas.height).data;
    let transparent = 0;
    for (let i=3; i<pixels.length; i+=64) if (pixels[i] < 40) transparent++;
    if (transparent > pixels.length / 64 * 0.46) setScratched(true);
  };

  const end = () => { drawing.current = false; last.current = null; };

  return (
    <div className={`scratch ${scratched ? "scratch--done" : ""}`}>
      <div className="scratch__reveal">
        <span>FRIDAY</span>
        <strong>4</strong>
        <span>DECEMBER 2026</span>
        <small>THE WEDDING DAY</small>
      </div>
      {!scratched && (
        <canvas
          ref={canvasRef}
          onPointerDown={(e)=>{drawing.current=true; last.current=point(e);}}
          onPointerMove={scratch}
          onPointerUp={end}
          onPointerCancel={end}
          onPointerLeave={end}
        />
      )}
    </div>
  );
}

function App() {
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("locked", !opened);
    return () => document.body.classList.remove("locked");
  }, [opened]);

  if (!opened) return <Opening onOpen={() => setOpened(true)} />;

  return (
    <main className="invitation">
      <section className="hero">
        <video
          className="hero__video"
          src={`${ASSET_BASE}assets/background.mp4`}
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          aria-hidden="true"
        />
        <div className="hero__shade" />
        <div className="hero__content">
          <p className="eyebrow">TOGETHER WITH OUR FAMILIES & FRIENDS</p>
          <div className="hero__names">
            <h1>Dr. Piyush</h1>
            <span>&amp;</span>
            <h1>Dr. Shini</h1>
          </div>
          <p className="hero__copy">Request the pleasure of your company as we celebrate our marriage, love, and a lifetime of happiness.</p>
          <div className="date-plaque">
            <span>FRIDAY</span>
            <div><small>DECEMBER</small><b>4</b><small>2026</small></div>
            <span>AT 7 IN THE EVENING</span>
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
  );
}

createRoot(document.getElementById("root")).render(<App />);
