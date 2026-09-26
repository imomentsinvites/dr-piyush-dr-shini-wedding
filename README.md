# Dr. Piyush & Dr. Shini — Wedding Invitation

A mobile-first React/Vite wedding invitation designed to use the **entire mobile browser viewport** rather than a laptop/phone mockup.

## Current details

- Couple: **Dr. Piyush & Dr. Shini**
- Pre-wedding celebrations: **3 December 2026**
- Wedding: **4 December 2026**
- Venue: **Raj Vilas, Orchha, Madhya Pradesh**
- Google Maps: https://maps.app.goo.gl/SjAinaMEUt6Tcjgt7?g_st=ic

## Assets

Put the invitation media in `public/assets/` with these exact names:

```text
opening.mp4
background.mp4
music.mp3        (optional)
opening-poster.jpg
```

The supplied opening video is already included as `opening.mp4`.

The supplied second video is already included as `background.mp4`.

### Opening video

The opening video is 1080×1920 portrait. It plays once after the visitor taps **Tap to open**. The tap is intentional because mobile browsers commonly restrict video/audio playback until there is a user gesture.

### Background video

The supplied second video is 1080×1920 portrait. It is used behind the invitation text and:

- loops continuously;
- uses `object-fit: cover`, so it is never stretched;
- is slightly enlarged to prevent blur edges from showing;
- is softened with CSS blur;
- is darkened with a layered overlay for readable text;
- loads after the opening experience rather than competing with it.

When the 10-second video reaches the end, the browser loops it automatically.

## Music

Music is optional. If `public/assets/music.mp3` exists, it starts when the visitor taps **Tap to open** and loops throughout the invitation.

To change the music later, simply replace:

```text
public/assets/music.mp3
```

with another MP3 **using the same filename**. No React code needs to be changed.

There is also a small Music on/off button in the hero. If no `music.mp3` is present, that button automatically stays hidden and the invitation still works normally.

## Scratch-to-reveal wedding date

The invitation includes a touch-friendly canvas scratch card. Visitors scratch the gold foil to reveal:

**FRIDAY · 4 · DECEMBER 2026**

It works with touch, mouse, and pointer input and does not require a third-party scratch-card library.

## Run locally

```bash
npm install
npm run dev
```

Then open the Vite local URL. For testing on a phone on the same Wi-Fi network, use the LAN URL printed by Vite.

## Build

```bash
npm run build
```

The production files are created in `dist/`.

## Git / deployment

This is a standard Vite project and can be pushed directly to GitHub. It can be deployed to Vercel, Netlify, GitHub Pages, or another static host that supports Vite builds.

For GitHub Pages with a repository path, configure the Vite `base` setting to match the repository name before deployment. Vercel and Netlify generally work with the default root configuration.

## Mobile behavior

There is no fixed 9:16 device frame and no desktop-style centered phone mockup. The actual page uses the browser viewport.

The videos use `object-fit: cover`, which preserves their original proportions. On phones whose aspect ratio differs from 9:16, the browser crops excess edges rather than stretching the video.

Safe-area spacing is included for iPhone notches/Dynamic Island areas.

## Performance notes

- React + Vite with no UI framework.
- No external font dependency.
- Opening video: 1080×1920 MP4.
- Background video: 1080×1920 MP4, ~7 MB supplied file.
- Background video is loaded only when the invitation opens.
- Background video loops natively rather than downloading separate copies.
- Music is lazy-loaded only when the invitation is opened.
- No scratch-card dependency.
