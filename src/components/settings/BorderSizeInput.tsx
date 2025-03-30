"use client";
import React from "react";
import { Square } from "lucide-react"; // Ikona pro rámeček

interface BorderSizeInputProps {
  borderWidth: number;
  setBorderWidth: (value: number) => void;
}

const BorderSizeInput: React.FC<BorderSizeInputProps> = ({
  borderWidth,
  setBorderWidth,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setBorderWidth(value >= 0 ? value : 0); // Zajistí nezápornou hodnotu
  };

  return (
    <div>
      <label
        htmlFor="borderWidth"
        className="text-xs font-medium tracking-tight mb-1 flex items-center gap-1"
      >
        <Square size={14} /> Šířka rámečku (px)
      </label>
      <input
        id="borderWidth"
        name="borderWidth"
        type="number"
        min="0"
        placeholder="např. 1"
        value={borderWidth}
        onChange={handleChange}
        className="text-xs tracking-tight bg-zinc-900/50 border border-zinc-800/50 py-3 px-4 w-full rounded-lg text-white mt-1 focus:border-lime-500 focus:outline-none transition-all"
      />
    </div>
  );
};

export default BorderSizeInput;
