"use client";
import React from "react";
import { FileDown, ArrowRight } from "lucide-react";

interface ExportSectionProps {
  tailwindCode: string;
  copyToClipboard: () => void;
}

const ExportSection: React.FC<ExportSectionProps> = ({
  tailwindCode,
  copyToClipboard,
}) => {
  return (
    <div>
      {/* Hlavička sekce exportu */}
      <p className="text-zinc-400 tracking-wide font-mono uppercase text-xs flex items-center gap-2 mb-2">
        <FileDown size={14} className="text-lime-400" /> Export do Tailwind
      </p>
      {/* Falešný "název souboru" a indikátory okna */}
      <div className="h-12 w-full bg-zinc-900/60 border border-b-0 border-zinc-800/50 rounded-t-lg p-2 px-4 flex items-center justify-between">
        <p className="text-xs font-medium tracking-tight">ExportButton.tsx</p>
        <div className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-rose-500"></span>
          <span className="w-2 h-2 rounded-full bg-amber-500"></span>
          <span className="w-2 h-2 rounded-full bg-lime-400"></span>
        </div>
      </div>
      {/* Textarea pro zobrazení kódu */}
      <textarea
        readOnly
        value={tailwindCode}
        className="text-xs text-zinc-400 tracking-tight font-mono rounded-b-lg w-full h-48 p-4 bg-zinc-900/50 border border-t-0 border-zinc-800/50 focus:outline-none resize-none" // Přidáno resize-none
        aria-label="Vygenerovaný Tailwind kód" // Pro přístupnost
      />
      {/* Tlačítko pro kopírování */}
      <button
        onClick={copyToClipboard}
        className="cursor-pointer mt-2 bg-lime-400 dark:bg-lime-500 border border-lime-500 dark:border-lime-600 w-full p-4 rounded-lg text-sm tracking-tight font-semibold flex items-center justify-center gap-2 text-zinc-950 dark:text-zinc-950 hover:bg-lime-500 dark:hover:bg-lime-600 hover:border-lime-600 dark:hover:border-lime-700 transition-all"
      >
        Zkopírovat kód <ArrowRight size={16} /> {/* Zvětšena ikona */}
      </button>
    </div>
  );
};

export default ExportSection;
