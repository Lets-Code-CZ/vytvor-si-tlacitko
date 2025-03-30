"use client";
import React, { useState, useMemo } from "react";

// Import refaktorovaných komponent
import ButtonSettings from "@/components/ButtonSettings"; // Uprav cesty dle potřeby
import ButtonPreview from "@/components/ButtonPreview";
import Modal from "@/components/common/Modal";

// Definice populárních barev (může být i v constants/colors.ts)
const popularColors: { [key: string]: string } = {
  black: "#000000",
  white: "#ffffff",
  "slate-500": "#64748b",
  "slate-700": "#334155",
  "gray-500": "#6b7280",
  "gray-700": "#374151",
  "zinc-500": "#71717a",
  "zinc-700": "#3f3f46",
  "neutral-500": "#737373",
  "neutral-700": "#404040",
  "stone-500": "#78716c",
  "stone-700": "#44403c",
  "red-500": "#ef4444",
  "red-700": "#b91c1c",
  "orange-500": "#f97316",
  "orange-700": "#c2410c",
  "amber-500": "#f59e0b",
  "amber-700": "#b45309",
  "yellow-500": "#eab308",
  "yellow-700": "#a16207",
  "lime-500": "#84cc16",
  "lime-700": "#4d7c0f",
  "green-500": "#22c55e",
  "green-700": "#15803d",
  "emerald-500": "#10b981",
  "emerald-700": "#047857",
  "teal-500": "#14b8a6",
  "teal-700": "#0f766e",
  "cyan-500": "#06b6d4",
  "cyan-700": "#0e7490",
  "sky-500": "#0ea5e9",
  "sky-700": "#0369a1",
  "blue-500": "#3b82f6",
  "blue-700": "#1d4ed8",
  "indigo-500": "#6366f1",
  "indigo-700": "#4338ca",
  "violet-500": "#8b5cf6",
  "violet-700": "#6d28d9",
  "purple-500": "#a855f7",
  "purple-700": "#7e22ce",
  "fuchsia-500": "#d946ef",
  "fuchsia-700": "#a21caf",
  "pink-500": "#ec4899",
  "pink-700": "#be185d",
  "rose-500": "#f43f5e",
  "rose-700": "#be123c",
};

// Funkce pro nalezení nejbližší Tailwind barvy (zjednodušená verze, pouze hledá přesný match)
// Může být rozšířena o hledání nejbližší barvy, pokud přesný match neexistuje.
const findTailwindColorName = (hexColor: string): string | null => {
  // Normalizace HEX (odstranění alfa, malá písmena)
  const normalizedHex = hexColor.toLowerCase().slice(0, 7); // Bereme jen #rrggbb
  const entry = Object.entries(popularColors).find(
    ([_, value]) => value.toLowerCase() === normalizedHex
  );
  return entry ? entry[0] : null; // Vrací název barvy (např. "lime-500") nebo null
};

export default function Home() {
  // --- Stavy ---
  const [buttonText, setButtonText] = useState("Klikni na mě!");
  const [roundedTL, setRoundedTL] = useState(8);
  const [roundedTR, setRoundedTR] = useState(8);
  const [roundedBR, setRoundedBR] = useState(8);
  const [roundedBL, setRoundedBL] = useState(8);
  const [paddingX, setPaddingX] = useState(20); // Zvětšený výchozí padding
  const [paddingY, setPaddingY] = useState(12); // Zvětšený výchozí padding
  const [lockRoundness, setLockRoundness] = useState(true); // Výchozí zamčení
  const [lockPadding, setLockPadding] = useState(false);
  const [buttonColor, setButtonColor] = useState("#84cc16"); // Lime-500
  const [useSameBorder, setUseSameBorder] = useState(true);
  const [borderColor, setBorderColor] = useState("#4d7c0f"); // Lime-700 (pro případ, že useSameBorder=false)
  const [textColor, setTextColor] = useState("#1a2e05"); // Tmavě zelená pro kontrast s lime
  const [showModal, setShowModal] = useState(false);

  // --- Odvozené hodnoty a výpočty (optimalizováno s useMemo) ---

  // Výpočet finální barvy rámečku
  const finalBorderColor = useMemo(
    () => (useSameBorder ? buttonColor : borderColor),
    [useSameBorder, buttonColor, borderColor]
  );

  // Výpočet Tailwind tříd (optimalizováno)
  const tailwindCode = useMemo(() => {
    // Zaoblení
    const isUniformRoundness =
      roundedTL === roundedTR &&
      roundedTR === roundedBR &&
      roundedBR === roundedBL;
    const borderRadiusClasses = isUniformRoundness
      ? `rounded-[${roundedTL}px]`
      : `rounded-tl-[${roundedTL}px] rounded-tr-[${roundedTR}px] rounded-br-[${roundedBR}px] rounded-bl-[${roundedBL}px]`;

    // Padding
    const isUniformPadding = paddingX === paddingY;
    const paddingClasses = isUniformPadding
      ? `p-[${paddingX}px]`
      : `px-[${paddingX}px] py-[${paddingY}px]`;

    // Barvy - pokus o nalezení Tailwind názvu, jinak fallback na arbitrary value
    const bgColorName = findTailwindColorName(buttonColor);
    const bgColorClass = bgColorName
      ? `bg-${bgColorName}`
      : `bg-[${buttonColor}]`;

    const textColorName = findTailwindColorName(textColor);
    const textColorClass = textColorName
      ? `text-${textColorName}`
      : `text-[${textColor}]`;

    const borderColorName = findTailwindColorName(finalBorderColor);
    const borderColorClass = borderColorName
      ? `border-${borderColorName}`
      : `border-[${finalBorderColor}]`;

    // Základní třídy
    const baseClasses = `cursor-pointer inline-flex items-center justify-center gap-2 transition-all duration-200 ease-in-out border`; // Přidáno inline-flex

    return `<button className="${baseClasses} ${borderRadiusClasses} ${paddingClasses} ${bgColorClass} ${borderColorClass} ${textColorClass}">\n  ${buttonText}\n</button>`;
  }, [
    buttonText,
    roundedTL,
    roundedTR,
    roundedBR,
    roundedBL,
    paddingX,
    paddingY,
    buttonColor,
    finalBorderColor,
    textColor,
  ]);

  // Výpočet inline stylů pro náhled (optimalizováno)
  const previewStyle: React.CSSProperties = useMemo(
    () => ({
      backgroundColor: buttonColor,
      padding: `${paddingY}px ${paddingX}px`,
      borderRadius: `${roundedTL}px ${roundedTR}px ${roundedBR}px ${roundedBL}px`,
      borderColor: finalBorderColor,
      color: textColor,
      borderWidth: "1px", // Zajistíme viditelnost borderu
      borderStyle: "solid", // Zajistíme viditelnost borderu
    }),
    [
      buttonColor,
      paddingY,
      paddingX,
      roundedTL,
      roundedTR,
      roundedBR,
      roundedBL,
      finalBorderColor,
      textColor,
    ]
  );

  // --- Funkce ---

  // Kopírování do schránky
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(tailwindCode);
      setShowModal(true); // Zobrazí modal po úspěšném kopírování
    } catch (err) {
      console.error("Chyba při kopírování kódu:", err);
      alert("Chyba při kopírování kódu."); // Záložní alert
    }
  };

  // Zavření modalu
  const closeModal = () => setShowModal(false);

  // --- Render ---
  return (
    // Hlavní layout stránky
    <div className="flex flex-col md:flex-row gap-4 p-4 h-screen max-h-screen bg-zinc-900 text-white overflow-hidden">
      {/* Zobrazení modalu, pokud je showModal true */}
      {showModal && <Modal code={tailwindCode} onClose={closeModal} />}

      {/* Panel nastavení */}
      <ButtonSettings
        // Předání všech stavů a setterů jako props
        buttonText={buttonText}
        setButtonText={setButtonText}
        roundedTL={roundedTL}
        setRoundedTL={setRoundedTL}
        roundedTR={roundedTR}
        setRoundedTR={setRoundedTR}
        roundedBR={roundedBR}
        setRoundedBR={setRoundedBR}
        roundedBL={roundedBL}
        setRoundedBL={setRoundedBL}
        paddingX={paddingX}
        setPaddingX={setPaddingX}
        paddingY={paddingY}
        setPaddingY={setPaddingY}
        lockRoundness={lockRoundness}
        setLockRoundness={setLockRoundness}
        lockPadding={lockPadding}
        setLockPadding={setLockPadding}
        tailwindCode={tailwindCode}
        copyToClipboard={copyToClipboard}
        buttonColor={buttonColor}
        setButtonColor={setButtonColor}
        useSameBorder={useSameBorder}
        setUseSameBorder={setUseSameBorder}
        borderColor={borderColor}
        setBorderColor={setBorderColor}
        textColor={textColor}
        setTextColor={setTextColor}
      />

      {/* Hlavní oblast pro náhled */}
      <main className="w-full flex-grow bg-zinc-950 border border-zinc-900 rounded-xl p-4 lg:p-6 xl:p-8 flex flex-col items-center justify-center text-center gap-6 relative overflow-hidden">
        {/* Mřížka na pozadí (volitelné) */}
        <div
          className="absolute inset-0 z-0 opacity-10"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        ></div>

        {/* Obsah náhledu - nad mřížkou */}
        <div className="relative z-10 flex flex-col items-center">
          <div className="mb-8 max-w-md">
            {" "}
            {/* Omezení šířky textu */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl tracking-tighter font-bold mb-3">
              Náhled tlačítka
            </h1>
            <p className="text-sm sm:text-base text-zinc-400 tracking-tight">
              Uprav vlastnosti v panelu vlevo a sleduj, jak se tlačítko mění v
              reálném čase. Až budeš spokojený, zkopíruj si vygenerovaný
              Tailwind kód.
            </p>
          </div>
          {/* Komponenta náhledu tlačítka */}
          <div className="mt-4">
            {" "}
            {/* Přidán margin top pro oddělení */}
            <ButtonPreview buttonText={buttonText} style={previewStyle} />
          </div>
        </div>
      </main>

      {/* Přidání globálních stylů pro scrollbar, pokud je potřeba */}
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #3f3f46; // zinc-700
          border-radius: 10px;
        }
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #3f3f46 transparent; // zinc-700
        }
      `}</style>
    </div>
  );
}
