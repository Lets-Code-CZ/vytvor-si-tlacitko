"use client";
import React, { useState, useEffect, useRef } from "react";
import { SketchPicker, ColorResult } from "react-color";
import { rgbaToHex } from "@/utils/colors"; // Uprav cestu podle potřeby

interface ColorPickerInputProps {
  label: string;
  color: string;
  setColor: (color: string) => void;
  icon: React.ReactNode; // Pro ikonu vedle labelu
}

const ColorPickerInput: React.FC<ColorPickerInputProps> = ({
  label,
  color,
  setColor,
  icon,
}) => {
  const [showPicker, setShowPicker] = useState(false);
  const pickerRef = useRef<HTMLDivElement>(null);

  // Zavření pickeru při kliknutí mimo něj
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        pickerRef.current &&
        !pickerRef.current.contains(event.target as Node)
      ) {
        setShowPicker(false);
      }
    };

    if (showPicker) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showPicker]);

  // Zpracování změny barvy z SketchPicker
  const handleColorChange = (colorResult: ColorResult) => {
    const { r, g, b, a } = colorResult.rgb;
    const alpha = a === undefined ? 1 : a;
    const hex = rgbaToHex(r, g, b, alpha);
    setColor(hex);
  };

  // Odstranili jsme isDark a pickerStyles, styling bude řešen globálním CSS

  return (
    <div ref={pickerRef} className="relative">
      <label className="text-xs font-medium tracking-tight mb-1 flex items-center gap-1">
        {icon} {label}
      </label>
      {/* Podmíněné zobrazení SketchPicker */}
      {showPicker && (
        // Obalující div pro picker zůstává pro pozicování a základní vzhled
        <div className="absolute left-0 -top-[230px] w-full z-20 p-1 bg-white dark:bg-zinc-800 border border-gray-300 dark:border-zinc-700 rounded-lg shadow-lg">
          {/* SketchPicker komponenta - nyní bez 'styles' prop */}
          <SketchPicker
            color={color}
            onChange={handleColorChange} // Používáme onChange pro live update
            presetColors={[]}
            width="100%"
            className="sketch-picker-themed" // Přidána třída pro snazší cílení v CSS
          />
        </div>
      )}
      {/* Textové pole pro zobrazení/zadání barvy a otevření pickeru */}
      <input
        type="text"
        value={color}
        onClick={() => setShowPicker((prev) => !prev)} // Přepínání zobrazení pickeru
        onChange={(e) => setColor(e.target.value)} // Umožní i přímé zadání HEX kódu
        readOnly // Doporučeno nechat, aby uživatel primárně používal picker
        className="text-xs bg-zinc-900/50 border border-zinc-800/50 py-3 px-4 w-full rounded-lg text-white mt-1 focus:border-lime-500 focus:outline-none transition-all cursor-pointer"
      />
    </div>
  );
};

export default ColorPickerInput;
