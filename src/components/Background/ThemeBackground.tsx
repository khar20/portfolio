import { useEffect, useState } from "react";
import DitherField from "./DitherField";
import CheckerBlocks from "./CheckerBlocks";

const DITHER_ALPHA = 0.09;
const CHECKER_ALPHA = 0.1;

function parseHex(raw: string): [number, number, number] {
  let hex = raw.trim().replace(/^#/, "");
  if (hex.length === 3) hex = hex.split("").map((c) => c + c).join("");
  const n = parseInt(hex, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

const rgba = ([r, g, b]: [number, number, number], a: number) =>
  `rgba(${r},${g},${b},${a})`;

function readPalette() {
  const cs = getComputedStyle(document.documentElement);
  const raw = (name: string, fallback: string) =>
    (cs.getPropertyValue(name) || fallback).trim();
  const bg = parseHex(raw("--bg", "#0f0f0f"));
  const teal = parseHex(raw("--teal", "#4ec9b0"));
  return { bg, teal };
}

export default function ThemeBackground() {
  const [colors, setColors] = useState<{ bg: [number, number, number]; teal: [number, number, number] } | null>(null);

  useEffect(() => {
    setColors(readPalette());
    const root = document.documentElement;
    const observer = new MutationObserver(() => setColors(readPalette()));
    observer.observe(root, { attributes: true, attributeFilter: ["data-theme"] });
    return () => observer.disconnect();
  }, []);

  if (!colors) return null;

  return (
    <div className="bg-fx" aria-hidden="true">
      <DitherField color={rgba(colors.teal, DITHER_ALPHA)} />
      <CheckerBlocks className="bg-hero" color={rgba(colors.teal, CHECKER_ALPHA)} backgroundColor="transparent" />
    </div>
  );
}
