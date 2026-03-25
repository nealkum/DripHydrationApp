import type { CSSProperties } from "react";

export const B = {
  teal: "#1a3a3a",
  tealLight: "#2d5a5a",
  tealAccent: "#3d8b8b",
  cyan: "#5bbfbf",
  cyanLight: "#7ed4d4",
  gold: "#c9a96e",
  goldLight: "#e8d5a8",
  cream: "#f5f0e8",
  warmWhite: "#faf8f4",
  white: "#ffffff",
  bg: "#0f2b2b",
  bgCard: "#1a3a3a",
  bgSurface: "#163030",
  textPrimary: "#ffffff",
  textSecondary: "rgba(255,255,255,0.7)",
  textMuted: "rgba(255,255,255,0.45)",
  textDark: "#1a3a3a",
  border: "rgba(255,255,255,0.1)",
  borderLight: "rgba(255,255,255,0.06)",
  success: "#5bbfbf",
  cardR: "16px",
} as const;

export const SERIF = "'Playfair Display', Georgia, 'Times New Roman', serif";
export const SANS = "'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";

export const T = {
  hero:    { fontFamily: SERIF, fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1.15 } as CSSProperties,
  heading: { fontFamily: SERIF, fontWeight: 700, letterSpacing: "-0.01em", lineHeight: 1.2 } as CSSProperties,
  product: { fontFamily: SANS, fontWeight: 700, letterSpacing: "-0.01em" } as CSSProperties,
  body:    { fontFamily: SANS, fontWeight: 400, lineHeight: 1.5 } as CSSProperties,
  ui:      { fontFamily: SANS, fontWeight: 500 } as CSSProperties,
  price:   { fontFamily: SANS, fontWeight: 700 } as CSSProperties,
  btn:     { fontFamily: SANS, fontWeight: 700, textTransform: "uppercase" as const, letterSpacing: "0.08em" },
  tag:     { fontFamily: SANS, fontWeight: 700, textTransform: "uppercase" as const, letterSpacing: "0.06em" },
  over:    { fontFamily: SANS, fontWeight: 700, textTransform: "uppercase" as const, letterSpacing: "0.12em" },
};
