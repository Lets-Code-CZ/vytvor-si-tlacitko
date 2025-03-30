"use client";
import React from "react";
import { UnfoldHorizontal } from "lucide-react";

interface PaddingInputProps {
  paddingX: number;
  setPaddingX: (value: number) => void;
  paddingY: number;
  setPaddingY: (value: number) => void;
  lockPadding: boolean;
  setLockPadding: (locked: boolean) => void;
}

const PaddingInput: React.FC<PaddingInputProps> = ({
  paddingX,
  setPaddingX,
  paddingY,
  setPaddingY,
  lockPadding,
  setLockPadding,
}) => {
  // Handler pro změnu hodnoty paddingu
  const handleChange = (axis: "x" | "y", valueStr: string) => {
    const value = Number(valueStr) < 0 ? 0 : Number(valueStr); // Zajistí nezápornost
    if (lockPadding) {
      // Pokud je zamčeno, nastaví obě osy
      setPaddingX(value);
      setPaddingY(value);
    } else {
      // Jinak nastaví jen konkrétní osu
      if (axis === "x") {
        setPaddingX(value);
      } else {
        setPaddingY(value);
      }
    }
  };

  return (
    <div>
      <label className="text-xs font-medium tracking-tight mb-1 flex items-center gap-1">
        <UnfoldHorizontal size={14} /> Padding (px)
      </label>
      {/* Checkbox pro zamčení hodnot */}
      <div className="flex items-center justify-start gap-2 w-full my-2">
        <input
          id="lockPadding" // Přidáno id
          name="lockPadding"
          type="checkbox"
          checked={lockPadding}
          onChange={(e) => setLockPadding(e.target.checked)}
          className="w-auto accent-lime-500 cursor-pointer"
        />
        <label
          htmlFor="lockPadding"
          className="w-full text-xs tracking-tight text-zinc-400 cursor-pointer"
        >
          Zamknout hodnoty (X a Y)
        </label>
      </div>
      {/* Inputy pro osy X a Y */}
      <div className="grid grid-cols-2 gap-2">
        <input
          name="paddingX"
          type="number"
          min="0"
          placeholder="Padding X"
          value={paddingX}
          onChange={(e) => handleChange("x", e.target.value)}
          className="text-xs tracking-tight bg-zinc-900/50 border border-zinc-800/50 py-3 px-4 w-full rounded-lg text-white mt-1 focus:border-lime-500 focus:outline-none transition-all"
        />
        <input
          name="paddingY"
          type="number"
          min="0"
          placeholder="Padding Y"
          value={paddingY}
          onChange={(e) => handleChange("y", e.target.value)}
          className="text-xs tracking-tight bg-zinc-900/50 border border-zinc-800/50 py-3 px-4 w-full rounded-lg text-white mt-1 focus:border-lime-500 focus:outline-none transition-all"
        />
      </div>
    </div>
  );
};

export default PaddingInput;
