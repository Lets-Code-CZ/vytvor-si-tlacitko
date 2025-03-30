"use client";
import React from "react";
import { Settings2 } from "lucide-react";

// Import jednotlivých sekcí nastavení
import TextInput from "@/components/settings/TextInput"; // Uprav cesty dle potřeby
import RoundnessInput from "@/components/settings/RoundnessInput";
import PaddingInput from "@/components/settings/PaddingInput";
import ColorSettings from "@/components/settings/ColorSettings";
import ExportSection from "@/components/settings/ExportSection";

// Props pro ButtonSettings - obsahuje všechny stavy a settery z page.tsx
interface ButtonSettingsProps {
  buttonText: string;
  setButtonText: (text: string) => void;
  roundedTL: number;
  setRoundedTL: (value: number) => void;
  roundedTR: number;
  setRoundedTR: (value: number) => void;
  roundedBR: number;
  setRoundedBR: (value: number) => void;
  roundedBL: number;
  setRoundedBL: (value: number) => void;
  paddingX: number;
  setPaddingX: (value: number) => void;
  paddingY: number;
  setPaddingY: (value: number) => void;
  lockRoundness: boolean;
  setLockRoundness: (locked: boolean) => void;
  lockPadding: boolean;
  setLockPadding: (locked: boolean) => void;
  tailwindCode: string;
  copyToClipboard: () => void;
  buttonColor: string;
  setButtonColor: (color: string) => void;
  useSameBorder: boolean;
  setUseSameBorder: (useSame: boolean) => void;
  borderColor: string;
  setBorderColor: (color: string) => void;
  textColor: string;
  setTextColor: (color: string) => void;
}

const ButtonSettings: React.FC<ButtonSettingsProps> = (props) => {
  return (
    // Hlavní kontejner pro panel nastavení
    <aside className="w-full md:w-1/2 lg:w-1/3 xl:w-[400px] bg-zinc-950 border border-zinc-900 rounded-xl p-3 flex flex-col justify-between gap-4 h-full max-h-full overflow-hidden">
      {/* Hlavička panelu */}
      <div className="p-2 flex items-center justify-between gap-4 flex-shrink-0">
        <h2 className="text-xl tracking-tighter font-bold">
          Nastavení tlačítka
        </h2>
        <p className="text-sm text-zinc-400 tracking-tight">v0.2</p>{" "}
        {/* Mírně upravená verze */}
      </div>

      {/* Kontejner pro rolovatelný obsah nastavení */}
      <div className="flex-grow bg-zinc-900/50 border border-zinc-800/50 rounded-lg overflow-y-auto p-3 lg:p-4 !pt-0 custom-scrollbar">
        {/* Nadpis sekce nastavení */}
        <p className="text-zinc-400 tracking-wide font-mono uppercase text-xs flex items-center gap-2 mb-4 sticky top-0 bg-zinc-900 py-2.5 -mx-4 px-3 lg:px-4 z-10 border-b border-zinc-800/50">
          <Settings2 size={14} className="text-lime-400" /> Nastavení
        </p>
        {/* Jednotlivé sekce nastavení */}
        <div className="flex flex-col gap-5">
          {" "}
          {/* Zvětšen mezera mezi sekcemi */}
          <TextInput
            buttonText={props.buttonText}
            setButtonText={props.setButtonText}
          />
          <div className="border-t border-zinc-800/50"></div>
          <RoundnessInput
            roundedTL={props.roundedTL}
            setRoundedTL={props.setRoundedTL}
            roundedTR={props.roundedTR}
            setRoundedTR={props.setRoundedTR}
            roundedBR={props.roundedBR}
            setRoundedBR={props.setRoundedBR}
            roundedBL={props.roundedBL}
            setRoundedBL={props.setRoundedBL}
            lockRoundness={props.lockRoundness}
            setLockRoundness={props.setLockRoundness}
          />
          <div className="border-t border-zinc-800/50"></div>
          <PaddingInput
            paddingX={props.paddingX}
            setPaddingX={props.setPaddingX}
            paddingY={props.paddingY}
            setPaddingY={props.setPaddingY}
            lockPadding={props.lockPadding}
            setLockPadding={props.setLockPadding}
          />
          <div className="border-t border-zinc-800/50"></div>
          <ColorSettings
            buttonColor={props.buttonColor}
            setButtonColor={props.setButtonColor}
            useSameBorder={props.useSameBorder}
            setUseSameBorder={props.setUseSameBorder}
            borderColor={props.borderColor}
            setBorderColor={props.setBorderColor}
            textColor={props.textColor}
            setTextColor={props.setTextColor}
          />
        </div>
      </div>

      {/* Sekce exportu - pevně dole */}
      <div className="flex-shrink-0">
        <ExportSection
          tailwindCode={props.tailwindCode}
          copyToClipboard={props.copyToClipboard}
        />
      </div>
    </aside>
  );
};

export default ButtonSettings;

// Přidání stylů pro vlastní scrollbar (volitelné)
// Můžeš přidat do globálního CSS nebo <style jsx global> v page.tsx
/*
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: #3f3f46; // zinc-700
  border-radius: 10px;
  border: 3px solid transparent;
}
.custom-scrollbar {
  scrollbar-width: thin;
  scrollbar-color: #3f3f46 transparent; // zinc-700
}
*/
