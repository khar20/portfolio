import { useEffect, useRef } from "react";

export interface CheckerBlocksProps {
  className?: string;

  backgroundColor?: string;

  color?: string;

  cellSize?: number;
  speed?: number;
  paused?: boolean;
}

type Pattern =
  | { kind: "empty" }
  | { kind: "solid" }
  | { kind: "ring" }
  | { kind: "dot" }
  | { kind: "checker"; divisions: number; phase: number };

const BEAT = 1.2;
const GLITCH_STEP = 0.08;
const GLITCH_STEPS = 3;
const GLITCH_WINDOW = GLITCH_STEP * (GLITCH_STEPS + 1);

const randomPattern = (big: boolean): Pattern => {
  const r = Math.random();
  if (r < 0.4) return { kind: "empty" };
  if (r < 0.6) return { kind: "solid" };
  if (r < 0.65) return { kind: "ring" };
  if (r < 0.67 && !big) return { kind: "dot" };
  const options = big ? [4, 6, 8] : [2, 4, 8, 12, 16, 24];
  return {
    kind: "checker",
    divisions: options[Math.floor(Math.random() * options.length)],
    phase: Math.random() < 0.5 ? 0 : 1,
  };
};

interface Block {
  col: number;
  row: number;

  span: number;
  pattern: Pattern;

  glitch: Pattern[];
  changedAt: number;
}

export default function CheckerBlocks({
  className = "",
  backgroundColor = "transparent",
  color = "#ffffff",
  cellSize = 84,
  speed = 1,
  paused = false,
}: CheckerBlocksProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    const canvas = canvasRef.current;
    if (!host || !canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;
    const cell = Number.isFinite(cellSize) ? Math.max(24, Math.round(cellSize)) : 84;
    const rate = Number.isFinite(speed) ? Math.max(0, speed) : 1;
    const opaque = backgroundColor !== "transparent";
    const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");

    let width = 0;
    let height = 0;
    let offsetX = 0;
    let offsetY = 0;
    let blocks: Block[] = [];
    let frame = 0;
    let previous = 0;
    let elapsed = 0;
    let nextBeat = BEAT;
    let visible = false;
    let dirty = true;

    const build = (columns: number, rows: number) => {
      blocks = [];
      for (let row = 0; row < rows; row += 2) {
        for (let col = 0; col < columns; col += 2) {
          if (Math.random() < 0.3) {
            blocks.push({
              col,
              row,
              span: 2,
              pattern: randomPattern(true),
              glitch: [],
              changedAt: -Infinity,
            });
            continue;
          }
          for (let i = 0; i < 4; i++) {
            blocks.push({
              col: col + (i & 1),
              row: row + (i >> 1),
              span: 1,
              pattern: randomPattern(false),
              glitch: [],
              changedAt: -Infinity,
            });
          }
        }
      }
    };

    const change = (block: Block) => {
      block.glitch = Array.from({ length: GLITCH_STEPS }, (_, i) => ({
        kind: "checker" as const,
        divisions: [8, 16, 32][i] * block.span,
        phase: i & 1,
      }));
      block.pattern = randomPattern(block.span === 2);
      block.changedAt = elapsed;
    };

    const beat = () => {
      for (const block of blocks) {
        if (Math.random() > 0.08) continue;
        change(block);
      }
    };

    const paint = (pattern: Pattern, x: number, y: number, size: number) => {
      ctx.fillStyle = color;
      switch (pattern.kind) {
        case "empty":
          return;
        case "solid":
          ctx.fillRect(x, y, size, size);
          return;
        case "ring": {
          const inset = Math.round(size / 4);
          ctx.fillRect(x, y, size, size);
          if (opaque) {
            ctx.fillStyle = backgroundColor;
            ctx.fillRect(x + inset, y + inset, size - inset * 2, size - inset * 2);
          } else {
            ctx.clearRect(x + inset, y + inset, size - inset * 2, size - inset * 2);
          }
          return;
        }
        case "dot":
          ctx.beginPath();
          ctx.arc(x + size / 2, y + size / 2, size * 0.36, 0, Math.PI * 2);
          ctx.fill();
          return;
        case "checker": {
          const n = pattern.divisions;
          for (let j = 0; j < n; j++) {
            const y0 = y + Math.round((j * size) / n);
            const y1 = y + Math.round(((j + 1) * size) / n);
            for (let i = (j + pattern.phase) & 1; i < n; i += 2) {
              const x0 = x + Math.round((i * size) / n);
              const x1 = x + Math.round(((i + 1) * size) / n);
              ctx.fillRect(x0, y0, x1 - x0, y1 - y0);
            }
          }
        }
      }
    };

    const draw = () => {
      if (opaque) {
        ctx.fillStyle = backgroundColor;
        ctx.fillRect(0, 0, width, height);
      } else {
        ctx.clearRect(0, 0, width, height);
      }
      for (const block of blocks) {
        const step = Math.floor((elapsed - block.changedAt) / GLITCH_STEP);
        const pattern =
          step >= 0 && step < block.glitch.length ? block.glitch[step] : block.pattern;
        paint(
          pattern,
          offsetX + block.col * cell,
          offsetY + block.row * cell,
          block.span * cell,
        );
      }
      dirty = false;
    };

    const tick = (now: number) => {
      elapsed += Math.min((now - previous) / 1000, 0.1) * rate;
      previous = now;
      if (elapsed >= nextBeat) {
        beat();
        nextBeat = elapsed + BEAT;
      }
      const glitching = blocks.some((block) => elapsed - block.changedAt <= GLITCH_WINDOW);
      if (glitching || dirty) draw();
      frame = requestAnimationFrame(tick);
    };
    const update = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      draw();
      if (!paused && rate > 0 && visible && !document.hidden && !reducedMotion.matches) {
        previous = performance.now();
        frame = requestAnimationFrame(tick);
      }
    };
    const resize = () => {
      width = host.clientWidth;
      height = host.clientHeight;
      const dpr = Math.min(devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const columns = Math.ceil(width / cell / 2) * 2;
      const rows = Math.ceil(height / cell / 2) * 2;
      offsetX = Math.round((width - columns * cell) / 2);
      offsetY = Math.round((height - rows * cell) / 2);
      build(columns, rows);
      draw();
    };
    const observer = new ResizeObserver(resize);
    observer.observe(host);
    resize();
    const intersection = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      update();
    });
    intersection.observe(host);
    reducedMotion.addEventListener("change", update);
    document.addEventListener("visibilitychange", update);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      intersection.disconnect();
      reducedMotion.removeEventListener("change", update);
      document.removeEventListener("visibilitychange", update);
    };
  }, [backgroundColor, color, cellSize, speed, paused]);

  return (
    <div ref={hostRef} className={`bg-layer ${className}`}>
      <canvas ref={canvasRef} aria-hidden="true" />
    </div>
  );
}
