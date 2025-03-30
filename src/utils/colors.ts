/**
 * Převádí RGBA hodnoty na HEX formát (včetně alfa kanálu jako 8místný hex).
 * @param r - Červená složka (0-255)
 * @param g - Zelená složka (0-255)
 * @param b - Modrá složka (0-255)
 * @param a - Alfa kanál (0-1)
 * @returns HEX řetězec (např. #rrggbbaa)
 */
export const rgbaToHex = (
  r: number,
  g: number,
  b: number,
  a: number
): string => {
  const toHex = (n: number) => {
    // Zajistí, že hodnota je celé číslo v rozsahu 0-255
    const clamped = Math.max(0, Math.min(255, Math.round(n)));
    const hex = clamped.toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  };
  const rHex = toHex(r);
  const gHex = toHex(g);
  const bHex = toHex(b);
  // Převod alfa kanálu (0-1) na hex (00-ff)
  const aHex = toHex(a * 255);
  return `#${rHex}${gHex}${bHex}${aHex}`;
};
