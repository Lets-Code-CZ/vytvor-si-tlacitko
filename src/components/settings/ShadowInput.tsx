"use client";
import React from "react";
import { Eclipse, Layers } from "lucide-react"; // Ikona pro stín

interface ShadowInputProps {
  boxShadow: string;
  setBoxShadow: (value: string) => void;
  // Poznámka: Inner shadow přidáme později, pokud bude potřeba komplexnější řešení
}

const ShadowInput: React.FC<ShadowInputProps> = ({
  boxShadow,
  setBoxShadow,
}) => {
  return (
    <div>
      <label
        htmlFor="boxShadow"
        className="text-xs font-medium tracking-tight mb-1 flex items-center gap-1"
      >
        <Eclipse size={14} /> (CSS) Stín tlačítka
      </label>
      <input
        id="boxShadow"
        name="boxShadow"
        type="text"
        placeholder="např. 0 4px 6px -1px rgba(0,0,0,0.1)"
        value={boxShadow}
        onChange={(e) => setBoxShadow(e.target.value)}
        className="text-xs tracking-tight bg-zinc-900/50 border border-zinc-800/50 py-3 px-4 w-full rounded-lg text-white mt-1 focus:border-lime-500 focus:outline-none transition-all font-mono"
      />
      <p className="text-xs tracking-tight text-zinc-500 mt-2">
        Zadej platnou CSS `box-shadow` hodnotu. Pro vnitřní stín přidej `inset`.
      </p>
    </div>
  );
};

export default ShadowInput;
