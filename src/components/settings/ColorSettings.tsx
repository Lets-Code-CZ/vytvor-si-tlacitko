"use client";
import React from "react";
import { Palette, Paintbrush } from "lucide-react";
import ColorPickerInput from "@/components/common/ColorPickerInput"; // Uprav cestu podle potřeby

interface ColorSettingsProps {
  buttonColor: string;
  setButtonColor: (color: string) => void;
  useSameBorder: boolean;
  setUseSameBorder: (useSame: boolean) => void;
  borderColor: string;
  setBorderColor: (color: string) => void;
  textColor: string;
  setTextColor: (color: string) => void;
}

const ColorSettings: React.FC<ColorSettingsProps> = ({
  buttonColor,
  setButtonColor,
  useSameBorder,
  setUseSameBorder,
  borderColor,
  setBorderColor,
  textColor,
  setTextColor,
}) => {
  return (
    <div className="flex flex-col gap-4">
      {/* Výběr barvy pozadí */}
      <ColorPickerInput
        label="Barva pozadí"
        color={buttonColor}
        setColor={setButtonColor}
        icon={<Palette size={14} />}
      />

      {/* Nastavení barvy rámečku */}
      <div>
        <label className="flex items-center gap-2 text-xs font-medium tracking-tight cursor-pointer mb-2">
          <input
            type="checkbox"
            checked={useSameBorder}
            onChange={(e) => setUseSameBorder(e.target.checked)}
            className="accent-lime-500 cursor-pointer"
          />
          Rámeček stejný jako pozadí
        </label>
        {/* Zobrazí výběr barvy rámečku, pouze pokud není zaškrtnuto "stejný jako pozadí" */}
        {!useSameBorder && (
          <ColorPickerInput
            label="Barva rámečku"
            color={borderColor}
            setColor={setBorderColor}
            icon={<Palette size={14} />}
          />
        )}
      </div>

      {/* Výběr barvy textu */}
      <ColorPickerInput
        label="Barva textu"
        color={textColor}
        setColor={setTextColor}
        icon={<Paintbrush size={14} />}
      />
    </div>
  );
};

export default ColorSettings;
