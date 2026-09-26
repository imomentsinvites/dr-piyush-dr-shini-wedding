export function triggerConfetti() {
  const canvas = document.createElement("canvas");
  canvas.style.position = "fixed";
  canvas.style.top = "0";
  canvas.style.left = "0";
  canvas.style.width = "100vw";
  canvas.style.height = "100vh";
  canvas.style.pointerEvents = "none";
  canvas.style.zIndex = "99999";
  document.body.appendChild(canvas);

  const ctx = canvas.getContext("2d");
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = window.innerWidth * dpr;
  canvas.height = window.innerHeight * dpr;
  ctx.scale(dpr, dpr);

  const colors = [
    "hsl(350, 60%, 45%)",
    "hsl(348, 65%, 38%)",
    "hsl(40, 80%, 65%)",
    "hsl(42, 90%, 75%)",
    "hsl(350, 50%, 94%)",
    "hsl(345, 70%, 84%)",
  ];

  const particles = [];
  for (let i = 0; i < 95; i++) {
    particles.push({
      x: window.innerWidth / 2,
      y: window.innerHeight * 0.45,
      vx: (Math.random() - 0.5) * 18,
      vy: (Math.random() - 0.8) * 19,
      size: Math.random() * 8 + 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * 360,
      vRotation: (Math.random() - 0.5) * 12,
      opacity: 1,
      gravity: 0.35 + Math.random() * 0.22,
    });
  }

  let animationFrame;
  function step() {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    let active = false;
    for (const p of particles) {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += p.gravity;
      p.vx *= 0.98;
      p.rotation += p.vRotation;
      p.opacity -= 0.009;
      if (p.opacity > 0) {
        active = true;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.globalAlpha = Math.max(0, p.opacity);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
        ctx.restore();
      }
    }
    if (active) {
      animationFrame = requestAnimationFrame(step);
    } else {
      cancelAnimationFrame(animationFrame);
      canvas.remove();
    }
  }
  step();
}
