"use client";
import React from "react";

interface ButtonPreviewProps {
  buttonText: string;
  style: React.CSSProperties; // Přijímá přímo CSSProperties objekt
}

const ButtonPreview: React.FC<ButtonPreviewProps> = ({ buttonText, style }) => {
  return (
    <button
      id="button-preview" // Přidáno ID pro případné testování nebo stylování
      style={style}
      // Základní třídy pro vzhled, který není pokryt inline stylem (např. transition)
      // POZNÁMKA: Většina stylů je řízena přes `style` prop z `page.tsx`
      className="cursor-pointer self-start border text-sm tracking-tight flex items-center justify-center gap-2 transition-all duration-200 ease-in-out"
    >
      {/* Zobrazí text tlačítka nebo placeholder, pokud je prázdný */}
      {buttonText || "Náhled tlačítka"}
    </button>
  );
};

export default ButtonPreview;
