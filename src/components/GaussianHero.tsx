import { useRef, useEffect } from "react";
import { DATASETS } from "../data/dataset";

// ── Funzioni helper ────────────────────────────────────────

function gaussian(x: number, mu: number, sigma: number): number {
  return (
    Math.exp(-0.5 * Math.pow((x - mu) / sigma, 2)) /
    (sigma * Math.sqrt(2 * Math.PI))
  );
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

function lerpColor(
  a: [number, number, number],
  b: [number, number, number],
  t: number,
): [number, number, number] {
  return [
    Math.round(lerp(a[0], b[0], t)),
    Math.round(lerp(a[1], b[1], t)),
    Math.round(lerp(a[2], b[2], t)),
  ];
}

// Easing: accelera e decelera
function easeInOut(t: number): number {
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
}

// ── Tipo per lo state dell'animazione ──────────────────────

type AnimState = {
  currentIdx: number;
  nextIdx: number;
  mu: number;
  sigma: number;
  color: [number, number, number];
  label: string;
  phase: "hold" | "transition";
  timer: number;
  time: number;
};

// ── Componente ─────────────────────────────────────────────

function GaussianHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // useRef per i dati dell'animazione — NON useState!
  // Perché: questi valori cambiano 60x al secondo.
  // Se usassimo useState, causeremmo 60 re-render al secondo.
  // Con useRef, il canvas si aggiorna ma React non re-renderizza.
  const stateRef = useRef<AnimState>({
    currentIdx: 0,
    nextIdx: 1,
    mu: DATASETS[0].mu,
    sigma: DATASETS[0].sigma,
    color: [...DATASETS[0].color],
    label: DATASETS[0].label,
    phase: "hold",
    timer: 0,
    time: 0,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio, 2);
    let w: number, h: number;

    // ── Resize handler ──────────────────
    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      w = parent.clientWidth;
      h = parent.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    // ── Coordinate helpers ──────────────
    const xToCanvas = (x: number) => w * 0.5 + x * w * 0.18;
    const yToCanvas = (y: number) => h * 0.78 - y * h * 1.4;

    // ── Costanti animazione ─────────────
    const HOLD_DUR = 1.3; // secondi in pausa
    const TRANSITION_DUR = 2.0; // secondi di transizione

    // ── Draw frame ──────────────────────
    const draw = (dt: number) => {
      const st = stateRef.current;
      st.time += dt;
      st.timer += dt;

      // ── State machine: hold ↔ transition ──
      if (st.phase === "hold" && st.timer > HOLD_DUR) {
        st.phase = "transition";
        st.timer = 0;
        st.nextIdx = (st.currentIdx + 1) % DATASETS.length;
      }

      if (st.phase === "transition") {
        const progress = Math.min(st.timer / TRANSITION_DUR, 1);
        const ease = easeInOut(progress);
        const from = DATASETS[st.currentIdx];
        const to = DATASETS[st.nextIdx];

        st.mu = lerp(from.mu, to.mu, ease);
        st.sigma = lerp(from.sigma, to.sigma, ease);
        st.color = lerpColor(from.color, to.color, ease);
        st.label = progress > 0.5 ? to.label : from.label;

        if (progress >= 1) {
          st.currentIdx = st.nextIdx;
          st.phase = "hold";
          st.timer = 0;
        }
      }

      // ── Pulisci ──
      ctx.clearRect(0, 0, w, h);

      const [cr, cg, cb] = st.color;

      // ── Griglia ──
      ctx.strokeStyle = "rgba(255,255,255,0.03)";
      ctx.lineWidth = 1;
      for (let gx = -3; gx <= 3; gx += 0.5) {
        const cx = xToCanvas(gx);
        ctx.beginPath();
        ctx.moveTo(cx, h * 0.15);
        ctx.lineTo(cx, h * 0.8);
        ctx.stroke();
      }
      for (let gy = 0; gy < 5; gy++) {
        const cy = h * 0.78 - gy * h * 0.13;
        ctx.beginPath();
        ctx.moveTo(w * 0.02, cy);
        ctx.lineTo(w * 0.98, cy);
        ctx.stroke();
      }

      // ── Asse X ──
      ctx.strokeStyle = "rgba(255,255,255,0.08)";
      ctx.beginPath();
      ctx.moveTo(w * 0.02, h * 0.78);
      ctx.lineTo(w * 0.98, h * 0.78);
      ctx.stroke();

      // ── Label asse X ──
      ctx.font = "10px monospace";
      ctx.fillStyle = "rgba(255,255,255,0.15)";
      ctx.textAlign = "center";
      for (let gx = -3; gx <= 3; gx++) {
        ctx.fillText(`${gx}σ`, xToCanvas(gx), h * 0.78 + 18);
      }

      // ── Mini istogramma sotto la curva ──
      const barCount = 30;
      const barW = (w * 0.96) / barCount;
      for (let i = 0; i < barCount; i++) {
        const bx = w * 0.02 + i * barW;
        const x = (bx - w * 0.5) / (w * 0.18);
        const peak = gaussian(st.mu, st.mu, st.sigma);
        const intensity = peak > 0 ? gaussian(x, st.mu, st.sigma) / peak : 0;
        const barH = intensity * 16 * (0.7 + 0.3 * Math.sin(st.time + i * 0.5));
        ctx.fillStyle = `rgba(${cr},${cg},${cb},${0.08 + intensity * 0.08})`;
        ctx.fillRect(bx + 1, h * 0.78 - barH, barW - 2, barH);
      }

      // ── Curva gaussiana ──
      ctx.beginPath();
      let first = true;
      for (let px = 0; px <= w; px += 1.5) {
        const x = (px - w * 0.5) / (w * 0.18);
        const y = gaussian(x, st.mu, st.sigma);
        const cy = yToCanvas(y);
        if (first) {
          ctx.moveTo(px, cy);
          first = false;
        } else ctx.lineTo(px, cy);
      }
      ctx.strokeStyle = `rgba(${cr},${cg},${cb},0.8)`;
      ctx.lineWidth = 2.5;
      ctx.stroke();

      // ── Area riempita sotto la curva ──
      ctx.lineTo(w, h * 0.78);
      ctx.lineTo(w, h * 0.78);
      ctx.closePath();
      const grad = ctx.createLinearGradient(0, h * 0.2, 0, h * 0.78);
      grad.addColorStop(0, `rgba(${cr},${cg},${cb},0.12)`);
      grad.addColorStop(1, `rgba(${cr},${cg},${cb},0.01)`);
      ctx.fillStyle = grad;
      ctx.fill();

      // ── Linea media (tratteggiata) ──
      const meanX = xToCanvas(st.mu);
      const peakY = yToCanvas(gaussian(st.mu, st.mu, st.sigma));
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(meanX, h * 0.78);
      ctx.lineTo(meanX, peakY - 12);
      ctx.strokeStyle = `rgba(${cr},${cg},${cb},0.5)`;
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.setLineDash([]);

      // ── Label μ ──
      ctx.font = "600 11px monospace";
      ctx.fillStyle = `rgba(${cr},${cg},${cb},0.7)`;
      ctx.textAlign = "center";
      ctx.fillText(`μ = ${st.mu.toFixed(2)}`, meanX, peakY - 18);

      // ── Bracket σ ──
      const sigL = xToCanvas(st.mu - st.sigma);
      const sigR = xToCanvas(st.mu + st.sigma);
      const bracketY = h * 0.78 + 36;
      ctx.strokeStyle = `rgba(${cr},${cg},${cb},0.3)`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(sigL, bracketY - 4);
      ctx.lineTo(sigL, bracketY);
      ctx.lineTo(sigR, bracketY);
      ctx.lineTo(sigR, bracketY - 4);
      ctx.stroke();
      ctx.font = "10px monospace";
      ctx.fillStyle = `rgba(${cr},${cg},${cb},0.4)`;
      ctx.fillText(
        `σ = ${st.sigma.toFixed(2)}`,
        (sigL + sigR) / 2,
        bracketY + 14,
      );

      // ── Dataset label (alto destra) ──
      ctx.font = "500 13px monospace";
      ctx.fillStyle = `rgba(${cr},${cg},${cb},0.5)`;
      ctx.textAlign = "right";
      ctx.fillText(`analyzing: ${st.label}`, w * 0.98, h * 0.12);
    };

    // ── Animation loop ──────────────────
    let last = performance.now();
    let frameId: number;

    const loop = (now: number) => {
      frameId = requestAnimationFrame(loop);
      const dt = Math.min((now - last) / 1000, 0.1);
      last = now;
      draw(dt);
    };

    frameId = requestAnimationFrame(loop);

    // ── Event listeners ─────────────────
    window.addEventListener("resize", resize);

    // ── Cleanup ─────────────────────────
    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: "absolute", inset: 0, zIndex: 0 }}
    />
  );
}

export default GaussianHero;
