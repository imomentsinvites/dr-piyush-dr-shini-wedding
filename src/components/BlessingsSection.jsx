import React, { useState } from "react";
import { OrnateDivider, GiftIcon, HeartIcon, WhatsAppIcon } from "./common/Icons";
import { triggerConfetti } from "../utils/confetti";
import { WEDDING_DATA } from "../constants/weddingData";

export function BlessingsSection() {
  const [wish, setWish] = useState("");
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!wish.trim()) return;

    const sender = name.trim() || "A Well-Wisher";
    const messageText = `Warmest Blessings to Dr. Piyush & Dr. Shini! 💐✨\n\nFrom: ${sender}\n"${wish.trim()}"\n\nWishing you a lifetime of endless love, laughter, and happiness! 💖`;
    const whatsappUrl = `https://wa.me/${WEDDING_DATA.whatsappRawNumber}?text=${encodeURIComponent(messageText)}`;

    // Open WhatsApp directly with the pre-filled blessing message
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");

    setSubmitted(true);
    triggerConfetti();
  };

  return (
    <section className="py-16 md:py-24 px-6 cream-bg relative overflow-hidden text-center">
      <div className="max-w-md mx-auto">
        <GiftIcon className="w-7 h-7 mx-auto text-primary mb-3" />
        <h2 className="font-calligraphy text-4xl md:text-5xl text-primary mb-2">
          Gifts &amp; Blessings
        </h2>
        <OrnateDivider />

        <p className="text-muted-foreground leading-relaxed font-body mb-8">
          “Your love, blessings, and warm presence are the greatest gifts we could ever ask for.”
        </p>

        {submitted ? (
          <div className="p-6 rounded-2xl bg-card border border-primary/30 shadow-gold text-center animate-pulse-slow">
            <HeartIcon size={32} className="mx-auto text-primary mb-3" />
            <p className="font-display font-semibold text-lg text-primary">
              Thank You{name ? `, ${name}` : ""}!
            </p>
            <p className="text-sm text-muted-foreground mt-1 mb-4 font-body">
              Your heartfelt blessings have been sent to Dr. Piyush &amp; Dr. Shini on WhatsApp.
            </p>
            <div className="flex flex-col items-center gap-2.5">
              <a
                href={`https://wa.me/${WEDDING_DATA.whatsappRawNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="whatsapp-btn"
                style={{ maxWidth: "260px" }}
              >
                <WhatsAppIcon className="w-4 h-4 text-white" />
                <span>Open WhatsApp Chat</span>
              </a>
              <button
                type="button"
                onClick={() => {
                  setSubmitted(false);
                  setWish("");
                }}
                className="text-xs text-primary font-display font-medium underline underline-offset-4 hover:opacity-80 pt-2 cursor-pointer"
              >
                Send Another Blessing
              </button>
            </div>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="p-6 rounded-2xl bg-card border border-border shadow-sm text-left space-y-4"
          >
            <h3 className="font-display font-semibold text-base text-foreground text-center mb-1">
              Send Warm Wishes to the Couple
            </h3>

            <div>
              <label className="block text-xs uppercase tracking-wider text-muted-foreground font-display mb-1.5 font-medium">
                Your Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Rahul &amp; Family"
                className="w-full px-3.5 py-2.5 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-muted-foreground font-display mb-1.5 font-medium">
                Your Blessings / Message
              </label>
              <textarea
                rows="3"
                required
                value={wish}
                onChange={(e) => setWish(e.target.value)}
                placeholder="Wishing you a lifetime of endless love, laughter, and happiness..."
                className="w-full px-3.5 py-2.5 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
              />
            </div>

            <button type="submit" className="whatsapp-btn">
              <WhatsAppIcon className="w-5 h-5 text-white" />
              <span>Send Blessings via WhatsApp</span>
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
