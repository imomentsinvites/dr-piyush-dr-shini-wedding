# Dr. Piyush & Dr. Shini — Wedding Invitation

A mobile-first React/Vite wedding invitation designed to stay **full-screen portrait on phones** rather than creating a laptop-shaped mockup.

## Current details

- Couple: **Dr. Piyush & Dr. Shini**
- Pre-wedding celebrations: **3 December 2026**
- Wedding: **4 December 2026**
- Venue: **Raj Vilas, Orchha, Madhya Pradesh**
- Google Maps: https://maps.app.goo.gl/SjAinaMEUt6Tcjgt7?g_st=ic

## Videos

`public/assets/opening.mp4` is the supplied 1080×1920 opening video.

The website expects the second, behind-the-text video at:

`public/assets/background.mp4`

Put your second 9:16 video there before building.

The background video is intentionally:
- `object-fit: cover` — it fills the phone viewport without stretching.
- Slightly enlarged — prevents blurred edges from the CSS blur.
- `filter: blur(7px) brightness(.53)` — creates the dark/soft background seen in the reference.
- `preload="none"` — it does not compete with the opening experience for the first network request.

## Run locally

```bash
npm install
npm run dev
```

Then open the Vite local URL on your phone or use the browser's network/LAN URL.

## Build for GitHub Pages / Vercel / Netlify

```bash
npm run build
```

The production files are created in `dist/`.

## Important mobile behavior

There is no fixed 9:16 device frame and no desktop-style centered phone mockup.

The actual page is always:

```css
width: 100%;
height: 100dvh;
object-fit: cover;
```

This means a video is never geometrically stretched. On unusual phone aspect ratios, `cover` crops the excess edges instead, preserving the video's proportions.

## Scratch card

The wedding date uses a lightweight HTML canvas scratch layer. It works with touch/pointer input and reveals:

**FRIDAY · 4 · DECEMBER 2026**

No third-party scratch-card library is required.

## Customizing event names/times

The event cards are in `src/main.jsx`. Replace the two descriptions with the actual Haldi / Engagement / Mehendi / etc. schedule when ready.

## Performance notes

- React + Vite, no UI framework.
- No external font dependency.
- Opening video is 1080×1920 and used with `playsInline`.
- Background video is lazy-loaded with `preload="none"`.
- The opening has a poster image so the first visual can appear before the video has downloaded.

## GitHub Pages deployment

This project is configured for the repository `dr-piyush-dr-shini-wedding`.

- Vite base path: `/dr-piyush-dr-shini-wedding/`
- GitHub Pages source: **GitHub Actions**
- Deployment workflow: `.github/workflows/deploy.yml`

Push to `main` to build and deploy automatically.
