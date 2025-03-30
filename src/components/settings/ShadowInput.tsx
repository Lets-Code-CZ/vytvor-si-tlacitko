"use client";
import React from "react";
// OPRAVA: Odstraněn nepoužitý import 'Layers'
// import { Layers } from 'lucide-react';

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
      {/* Použijeme obecnější ikonu nebo žádnou, pokud Layers není potřeba */}
      <label
        htmlFor="boxShadow"
        className="text-xs font-medium tracking-tight mb-1 flex items-center gap-1"
      >
        {/* <Layers size={14} /> - Nahrazeno nebo odstraněno */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-box-select"
        >
          <path d="M5 3a2 2 0 0 0-2 2" />
          <path d="M19 3a2 2 0 0 1 2 2" />
          <path d="M21 19a2 2 0 0 1-2 2" />
          <path d="M5 21a2 2 0 0 1-2-2" />
          <path d="M9 3h1" />
          <path d="M14 3h1" />
          <path d="M21 9v1" />
          <path d="M21 14v1" />
          <path d="M15 21h-1" />
          <path d="M10 21h-1" />
          <path d="M3 9v1" />
          <path d="M3 14v1" />
        </svg>
        Box Shadow (CSS)
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
      <p className="text-xs text-zinc-500 mt-1">
        Zadej platnou CSS `box-shadow` hodnotu. Pro vnitřní stín přidej `inset`.
      </p>
    </div>
  );
};

export default ShadowInput;
