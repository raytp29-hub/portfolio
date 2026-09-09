/**
 * Design tokens del portfolio.
 *
 * Fase 1: fonte di verità dei colori e dei font-stack.
 * I componenti importano `fonts` per garantire che i font custom
 * (Instrument Serif, JetBrains Mono, DM Sans) siano applicati correttamente
 * al posto dei fallback generici del browser.
 *
 * Fase 2 (futura): passaggio a CSS variables in :root per abilitare
 * un light theme + toggle senza toccare i componenti.
 */

export const colors = {
  // Backgrounds
  bg: "#212121",
  bgOverlay: "#1a1a1a",
  bgWindow: "#1e1e1e",
  bgSurface: "#252525",
  bgSurfaceHover: "#2a2a2a",
  bgCard: "#2a2a2a",
  bgCardHover: "#2e2e2e",

  // Borders
  border: "#333",
  borderStrong: "#444",

  // Text
  textPrimary: "#f2f2f2",
  textSecondary: "#e8e8e8",
  textBody: "#ccc",
  textMuted: "#888",
  textDim: "#666",
  textFaint: "#555",

  // Accents
  primary: "#00b894",       // mint (accento principale)
  primaryLight: "#00d4aa",
  accent: "#6c5ce7",        // viola (accento secondario)
  accentBlue: "#0984e3",
  accentPink: "#fd79a8",
  accentYellow: "#fdcb6e",

  // Traffic-light dots (window mockups)
  dotRed: "#ff5f57",
  dotYellow: "#febc2e",
  dotGreen: "#28c840",
} as const;

/**
 * Font stack con fallback espliciti.
 *
 * IMPORTANTE: usare SEMPRE queste costanti nei componenti.
 * Se scrivi `fontFamily: "serif"` o `fontFamily: "monospace"`
 * il browser mostra Times / Courier al posto dei font custom.
 */
export const fonts = {
  serif: "'Instrument Serif', Georgia, serif",
  mono: "'JetBrains Mono', ui-monospace, Menlo, monospace",
  sans: "'DM Sans', system-ui, -apple-system, sans-serif",
} as const;
