"use client";
import React, { useState, useMemo } from "react";

// Import komponent
import ButtonSettings from "@/components/ButtonSettings"; // Uprav cesty dle potřeby
import ButtonPreview from "@/components/ButtonPreview";
import Modal from "@/components/common/Modal";

// Definice populárních barev
const popularColors: { [key: string]: string } = {
  /* ... (stejné jako předtím) ... */ black: "#000000",
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

// Helper funkce pro generování Tailwind třídy pro barvu
const getColorClass = (prefix: string, colorValue: string): string => {
  const normalizedHex = colorValue.toLowerCase().slice(0, 7);
  // OPRAVA: Vráceno '_' pro nepoužitý klíč
  const entry = Object.entries(popularColors).find(
    ([_, value]) => value.toLowerCase() === normalizedHex
  );
  const colorName = entry ? entry[0] : null;
  if (!colorValue || colorValue === "transparent" || colorValue.endsWith("00"))
    return "";
  return colorName ? `${prefix}-${colorName}` : `${prefix}-[${colorValue}]`;
};

export default function Home() {
  // --- Stavy ---
  // (Stavy zůstávají stejné)
  const [buttonText, setButtonText] = useState("Super Tlačítko");
  const [textSize, setTextSize] = useState("base");
  const [fontWeight, setFontWeight] = useState("semibold");
  const [letterSpacing, setLetterSpacing] = useState("tight");
  const [roundedTL, setRoundedTL] = useState(8);
  const [roundedTR, setRoundedTR] = useState(8);
  const [roundedBR, setRoundedBR] = useState(8);
  const [roundedBL, setRoundedBL] = useState(8);
  const [paddingX, setPaddingX] = useState(24);
  const [paddingY, setPaddingY] = useState(12);
  const [lockRoundness, setLockRoundness] = useState(true);
  const [lockPadding, setLockPadding] = useState(false);
  const [buttonColor, setButtonColor] = useState("#84cc16");
  const [useSameBorder, setUseSameBorder] = useState(true);
  const [borderColor, setBorderColor] = useState("#4d7c0f");
  const [textColor, setTextColor] = useState("#1a2e05");
  const [borderWidth, setBorderWidth] = useState(1);
  const [boxShadow, setBoxShadow] = useState(
    "0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -2px rgba(0,0,0,0.1)"
  );
  const [hoverBgColor, setHoverBgColor] = useState("#a3e635");
  const [hoverBorderColor, setHoverBorderColor] = useState("#65a30d");
  const [hoverTextColor, setHoverTextColor] = useState("#1a2e05");
  const [activeBgColor, setActiveBgColor] = useState("#65a30d");
  const [activeBorderColor, setActiveBorderColor] = useState("#3f6212");
  const [activeTextColor, setActiveTextColor] = useState("#ffffff");
  const [hoverAnimation, setHoverAnimation] = useState("animate-none");
  const [activeAnimation, setActiveAnimation] = useState("animate-pulse-once");
  const [transitionDuration, setTransitionDuration] = useState(200);
  const [transitionEasing, setTransitionEasing] = useState("in-out");
  const [customTransitionEasing, setCustomTransitionEasing] = useState(
    "cubic-bezier(0.4, 0, 0.2, 1)"
  );
  const [showModal, setShowModal] = useState(false);

  // --- Odvozené hodnoty a výpočty ---
  const finalBorderColor = useMemo(
    () => (useSameBorder ? buttonColor : borderColor),
    [useSameBorder, buttonColor, borderColor]
  );

  // Výpočet Tailwind tříd
  const tailwindCode = useMemo(() => {
    const classes: string[] = [];
    classes.push(
      "cursor-pointer",
      "inline-flex",
      "items-center",
      "justify-center",
      "gap-2"
    );
    classes.push(`text-${textSize}`);
    classes.push(`font-${fontWeight}`);
    if (letterSpacing !== "normal") {
      classes.push(`tracking-${letterSpacing}`);
    }
    const isUniformRoundness =
      roundedTL === roundedTR &&
      roundedTR === roundedBR &&
      roundedBR === roundedBL;
    classes.push(
      isUniformRoundness
        ? `rounded-[${roundedTL}px]`
        : `rounded-tl-[${roundedTL}px] rounded-tr-[${roundedTR}px] rounded-br-[${roundedBR}px] rounded-bl-[${roundedBL}px]`
    );
    const isUniformPadding = paddingX === paddingY;
    classes.push(
      isUniformPadding
        ? `p-[${paddingX}px]`
        : `px-[${paddingX}px] py-[${paddingY}px]`
    );
    classes.push(getColorClass("bg", buttonColor));
    classes.push(getColorClass("text", textColor));
    classes.push(`border-[${borderWidth}px]`);
    classes.push(getColorClass("border", finalBorderColor));
    if (boxShadow && boxShadow.trim() !== "none" && boxShadow.trim() !== "") {
      const shadowValue = boxShadow.replace(/\s+/g, "_");
      classes.push(`shadow-[${shadowValue}]`);
    }
    classes.push("transition-all");
    classes.push(`duration-[${transitionDuration}ms]`);
    if (transitionEasing === "custom") {
      const bezierValue = customTransitionEasing.replace(/\s+/g, "");
      if (
        bezierValue.startsWith("cubic-bezier(") &&
        bezierValue.endsWith(")")
      ) {
        classes.push(`ease-[${bezierValue}]`);
      } else {
        classes.push("ease-in-out");
      }
    } else {
      classes.push(`ease-${transitionEasing}`);
    }
    const hoverBgClass = getColorClass("hover:bg", hoverBgColor);
    const hoverBorderClass = getColorClass("hover:border", hoverBorderColor);
    const hoverTextClass = getColorClass("hover:text", hoverTextColor);
    if (hoverBgClass) classes.push(hoverBgClass);
    if (hoverBorderClass) classes.push(hoverBorderClass);
    if (hoverTextClass) classes.push(hoverTextClass);
    if (hoverAnimation !== "animate-none")
      classes.push(`hover:${hoverAnimation}`);
    const activeBgClass = getColorClass("active:bg", activeBgColor);
    const activeBorderClass = getColorClass("active:border", activeBorderColor);
    const activeTextClass = getColorClass("active:text", activeTextColor);
    if (activeBgClass) classes.push(activeBgClass);
    if (activeBorderClass) classes.push(activeBorderClass);
    if (activeTextClass) classes.push(activeTextClass);
    if (activeAnimation !== "animate-none")
      classes.push(`active:${activeAnimation}`);

    const classString = classes.filter((c) => c !== "").join(" ");
    return `<button className="${classString}">\n  ${
      buttonText || "Tlačítko"
    }\n</button>`;
  }, [
    buttonText,
    textSize,
    fontWeight,
    letterSpacing,
    roundedTL,
    roundedTR,
    roundedBR,
    roundedBL,
    paddingX,
    paddingY,
    buttonColor,
    textColor,
    borderWidth,
    finalBorderColor,
    boxShadow,
    transitionDuration,
    transitionEasing,
    customTransitionEasing,
    hoverBgColor,
    hoverBorderColor,
    hoverTextColor,
    hoverAnimation,
    activeBgColor,
    activeBorderColor,
    activeTextColor,
    activeAnimation,
  ]);

  // --- Funkce ---
  const copyToClipboard = async () => {
    /* ... (stejné jako předtím) ... */
    try {
      await navigator.clipboard.writeText(tailwindCode);
      setShowModal(true);
    } catch (err) {
      console.error("Chyba:", err);
      alert("Chyba.");
    }
  };
  const closeModal = () => setShowModal(false);

  // --- Render ---
  return (
    <div className="flex flex-col md:flex-row gap-4 p-4 h-screen max-h-screen bg-zinc-900 text-white overflow-hidden">
      {showModal && <Modal code={tailwindCode} onClose={closeModal} />}

      {/* Panel nastavení */}
      <ButtonSettings
        // ... (všechny props) ...
        buttonText={buttonText}
        setButtonText={setButtonText}
        textSize={textSize}
        setTextSize={setTextSize}
        fontWeight={fontWeight}
        setFontWeight={setFontWeight}
        letterSpacing={letterSpacing}
        setLetterSpacing={setLetterSpacing}
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
        boxShadow={boxShadow}
        setBoxShadow={setBoxShadow}
        borderWidth={borderWidth}
        setBorderWidth={setBorderWidth}
        hoverBgColor={hoverBgColor}
        setHoverBgColor={setHoverBgColor}
        hoverBorderColor={hoverBorderColor}
        setHoverBorderColor={setHoverBorderColor}
        hoverTextColor={hoverTextColor}
        setHoverTextColor={setHoverTextColor}
        activeBgColor={activeBgColor}
        setActiveBgColor={setActiveBgColor}
        activeBorderColor={activeBorderColor}
        setActiveBorderColor={setActiveBorderColor}
        activeTextColor={activeTextColor}
        setActiveTextColor={setActiveTextColor}
        hoverAnimation={hoverAnimation}
        setHoverAnimation={setHoverAnimation}
        activeAnimation={activeAnimation}
        setActiveAnimation={setActiveAnimation}
        transitionDuration={transitionDuration}
        setTransitionDuration={setTransitionDuration}
        transitionEasing={transitionEasing}
        setTransitionEasing={setTransitionEasing}
        customTransitionEasing={customTransitionEasing}
        setCustomTransitionEasing={setCustomTransitionEasing}
      />

      {/* Hlavní oblast pro náhled */}
      <main className="w-full flex-grow bg-zinc-950 border border-zinc-900 rounded-xl p-4 lg:p-6 xl:p-8 flex flex-col items-center justify-center text-center gap-6 relative overflow-hidden">
        {/* Mřížka na pozadí */}
        <div
          className="absolute inset-0 z-0 opacity-10"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        ></div>

        {/* Obsah náhledu */}
        <div className="relative z-10 flex flex-col items-center">
          <div className="mb-8 max-w-lg">
            <h1 className="text-3xl sm:text-4xl md:text-5xl tracking-tighter font-bold mb-3">
              Náhled tlačítka
            </h1>
            <p className="text-sm sm:text-base text-zinc-400 tracking-tight">
              Experimentuj s nastaveními! Náhled nyní zobrazuje i změnu barev
              při najetí myší, kliknutí a nastavení typografie. Pro plný efekt
              (animace) zkopíruj kód.
            </p>
          </div>
          {/* Komponenta náhledu tlačítka */}
          <div className="mt-4">
            <ButtonPreview
              buttonText={buttonText}
              baseBgColor={buttonColor}
              baseBorderColor={finalBorderColor}
              baseTextColor={textColor}
              hoverBgColor={hoverBgColor}
              hoverBorderColor={hoverBorderColor}
              hoverTextColor={hoverTextColor}
              activeBgColor={activeBgColor}
              activeBorderColor={activeBorderColor}
              activeTextColor={activeTextColor}
              paddingX={paddingX}
              paddingY={paddingY}
              roundedTL={roundedTL}
              roundedTR={roundedTR}
              roundedBR={roundedBR}
              roundedBL={roundedBL}
              borderWidth={borderWidth}
              boxShadow={boxShadow}
              transitionDuration={transitionDuration}
              transitionEasing={transitionEasing}
              customTransitionEasing={customTransitionEasing}
              textSize={textSize}
              fontWeight={fontWeight}
              letterSpacing={letterSpacing}
            />
          </div>
        </div>
      </main>

      {/* Globální styly pro scrollbar */}
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #3f3f46;
          border-radius: 10px;
        }
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #3f3f46 transparent;
        }
      `}</style>
    </div>
  );
}
