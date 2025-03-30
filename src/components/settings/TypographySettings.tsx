"use client";
import React from "react";
import { Type, Bold, Pilcrow } from "lucide-react"; // Ikony pro typografii

interface TypographySettingsProps {
  textSize: string;
  setTextSize: (value: string) => void;
  fontWeight: string;
  setFontWeight: (value: string) => void;
  letterSpacing: string;
  setLetterSpacing: (value: string) => void;
}

// Možnosti pro Tailwind třídy
const textSizes = [
  { value: "xs", label: "xs (0.75rem)" },
  { value: "sm", label: "sm (0.875rem)" },
  { value: "base", label: "base (1rem)" },
  { value: "lg", label: "lg (1.125rem)" },
  { value: "xl", label: "xl (1.25rem)" },
  { value: "2xl", label: "2xl (1.5rem)" },
  { value: "3xl", label: "3xl (1.875rem)" },
  { value: "4xl", label: "4xl (2.25rem)" },
  { value: "5xl", label: "5xl (3rem)" },
];

const fontWeights = [
  { value: "thin", label: "Thin (100)" },
  { value: "extralight", label: "Extra Light (200)" },
  { value: "light", label: "Light (300)" },
  { value: "normal", label: "Normal (400)" },
  { value: "medium", label: "Medium (500)" },
  { value: "semibold", label: "Semibold (600)" },
  { value: "bold", label: "Bold (700)" },
  { value: "extrabold", label: "Extra Bold (800)" },
  { value: "black", label: "Black (900)" },
];

const letterSpacings = [
  { value: "tighter", label: "Tighter (-0.05em)" },
  { value: "tight", label: "Tight (-0.025em)" },
  { value: "normal", label: "Normal (0em)" },
  { value: "wide", label: "Wide (0.025em)" },
  { value: "wider", label: "Wider (0.05em)" },
  { value: "widest", label: "Widest (0.1em)" },
];

const TypographySettings: React.FC<TypographySettingsProps> = ({
  textSize,
  setTextSize,
  fontWeight,
  setFontWeight,
  letterSpacing,
  setLetterSpacing,
}) => {
  const selectStyles =
    "text-xs tracking-tight bg-zinc-900/50 border border-zinc-800/50 py-3 px-4 w-full rounded-lg text-white mt-1 focus:border-lime-500 focus:outline-none transition-all appearance-none cursor-pointer";

  // ZMĚNA: Použití grid-cols-1 pro vertikální layout
  return (
    <div className="grid grid-cols-1 gap-4">
      {/* Text Size */}
      <div>
        <label
          htmlFor="textSize"
          className="text-xs font-medium tracking-tight mb-1 flex items-center gap-1"
        >
          <Type size={14} /> Velikost písma
        </label>
        <div className="relative">
          <select
            id="textSize"
            name="textSize"
            value={textSize}
            onChange={(e) => setTextSize(e.target.value)}
            className={selectStyles}
          >
            {textSizes.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
            <svg
              className="fill-current h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Font Weight */}
      <div>
        <label
          htmlFor="fontWeight"
          className="text-xs font-medium tracking-tight mb-1 flex items-center gap-1"
        >
          <Bold size={14} /> Tloušťka písma
        </label>
        <div className="relative">
          <select
            id="fontWeight"
            name="fontWeight"
            value={fontWeight}
            onChange={(e) => setFontWeight(e.target.value)}
            className={selectStyles}
          >
            {fontWeights.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
            <svg
              className="fill-current h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Letter Spacing */}
      <div>
        <label
          htmlFor="letterSpacing"
          className="text-xs font-medium tracking-tight mb-1 flex items-center gap-1"
        >
          <Pilcrow size={14} /> Proklad znaků
        </label>
        <div className="relative">
          <select
            id="letterSpacing"
            name="letterSpacing"
            value={letterSpacing}
            onChange={(e) => setLetterSpacing(e.target.value)}
            className={selectStyles}
          >
            {letterSpacings.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
            <svg
              className="fill-current h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TypographySettings;
