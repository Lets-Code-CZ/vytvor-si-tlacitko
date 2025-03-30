"use client";
import React from "react";
import { Spline } from "lucide-react";

interface RoundnessInputProps {
  roundedTL: number;
  setRoundedTL: (value: number) => void;
  roundedTR: number;
  setRoundedTR: (value: number) => void;
  roundedBR: number;
  setRoundedBR: (value: number) => void;
  roundedBL: number;
  setRoundedBL: (value: number) => void;
  lockRoundness: boolean;
  setLockRoundness: (locked: boolean) => void;
}

const RoundnessInput: React.FC<RoundnessInputProps> = ({
  roundedTL,
  setRoundedTL,
  roundedTR,
  setRoundedTR,
  roundedBR,
  setRoundedBR,
  roundedBL,
  setRoundedBL,
  lockRoundness,
  setLockRoundness,
}) => {
  // Handler pro změnu hodnoty v inputu
  const handleChange = (setter: (value: number) => void, valueStr: string) => {
    const value = Number(valueStr) < 0 ? 0 : Number(valueStr); // Zajistí, že hodnota není záporná
    if (lockRoundness) {
      // Pokud je zamčeno, nastaví všechny rohy na stejnou hodnotu
      setRoundedTL(value);
      setRoundedTR(value);
      setRoundedBL(value);
      setRoundedBR(value);
    } else {
      // Jinak nastaví pouze konkrétní roh
      setter(value);
    }
  };

  return (
    <div>
      <label className="text-xs font-medium tracking-tight mb-1 flex items-center gap-1">
        <Spline size={14} /> Zaoblení (px)
      </label>
      {/* Checkbox pro zamčení hodnot */}
      <div className="flex items-center justify-start gap-2 w-full my-2">
        <input
          id="lockRoundness" // Přidáno id
          name="lockRoundness"
          type="checkbox"
          checked={lockRoundness}
          onChange={(e) => setLockRoundness(e.target.checked)}
          className="w-auto accent-lime-500 cursor-pointer"
        />
        <label
          htmlFor="lockRoundness"
          className="w-full text-xs tracking-tight text-zinc-400 cursor-pointer"
        >
          Zamknout hodnoty
        </label>
      </div>
      {/* Inputy pro jednotlivé rohy */}
      <div className="grid grid-cols-2 gap-2 mb-1">
        <input
          name="roundedTL"
          type="number"
          min="0" // HTML validace pro nezáporná čísla
          placeholder="Top left"
          value={roundedTL}
          onChange={(e) => handleChange(setRoundedTL, e.target.value)}
          className="text-xs tracking-tight bg-zinc-900/50 border border-zinc-800/50 py-3 px-4 w-full rounded-lg text-white mt-1 focus:border-lime-500 focus:outline-none transition-all"
        />
        <input
          name="roundedTR"
          type="number"
          min="0"
          placeholder="Top right"
          value={roundedTR}
          onChange={(e) => handleChange(setRoundedTR, e.target.value)}
          className="text-xs tracking-tight bg-zinc-900/50 border border-zinc-800/50 py-3 px-4 w-full rounded-lg text-white mt-1 focus:border-lime-500 focus:outline-none transition-all"
        />
      </div>
      <div className="grid grid-cols-2 gap-2">
        <input
          name="roundedBL"
          type="number"
          min="0"
          placeholder="Bottom left"
          value={roundedBL}
          onChange={(e) => handleChange(setRoundedBL, e.target.value)}
          className="text-xs tracking-tight bg-zinc-900/50 border border-zinc-800/50 py-3 px-4 w-full rounded-lg text-white mt-1 focus:border-lime-500 focus:outline-none transition-all"
        />
        <input
          name="roundedBR"
          type="number"
          min="0"
          placeholder="Bottom right"
          value={roundedBR}
          onChange={(e) => handleChange(setRoundedBR, e.target.value)}
          className="text-xs tracking-tight bg-zinc-900/50 border border-zinc-800/50 py-3 px-4 w-full rounded-lg text-white mt-1 focus:border-lime-500 focus:outline-none transition-all"
        />
      </div>
    </div>
  );
};

export default RoundnessInput;
