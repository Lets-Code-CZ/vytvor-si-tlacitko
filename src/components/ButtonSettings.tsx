"use client";
import React from "react";
import { Settings2 } from "lucide-react";

// Import původních i nových sekcí nastavení
import TextInput from "@/components/settings/TextInput";
import TypographySettings from "@/components/settings/TypographySettings"; // Nové
import RoundnessInput from "@/components/settings/RoundnessInput";
import PaddingInput from "@/components/settings/PaddingInput";
import ColorSettings from "@/components/settings/ColorSettings";
import BorderSizeInput from "@/components/settings/BorderSizeInput";
import ShadowInput from "@/components/settings/ShadowInput";
import HoverActiveSettings from "@/components/settings/HoverActiveSettings";
import AnimationSettings from "@/components/settings/AnimationSettings";
import TransitionSettings from "@/components/settings/TransitionSettings";
import ExportSection from "@/components/settings/ExportSection";

// Rozšířené props pro ButtonSettings
interface ButtonSettingsProps {
  // Původní
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
  boxShadow: string;
  setBoxShadow: (value: string) => void;
  borderWidth: number;
  setBorderWidth: (value: number) => void;
  hoverBgColor: string;
  setHoverBgColor: (color: string) => void;
  hoverBorderColor: string;
  setHoverBorderColor: (color: string) => void;
  hoverTextColor: string;
  setHoverTextColor: (color: string) => void;
  activeBgColor: string;
  setActiveBgColor: (color: string) => void;
  activeBorderColor: string;
  setActiveBorderColor: (color: string) => void;
  activeTextColor: string;
  setActiveTextColor: (color: string) => void;
  hoverAnimation: string;
  setHoverAnimation: (value: string) => void;
  activeAnimation: string;
  setActiveAnimation: (value: string) => void;
  transitionDuration: number;
  setTransitionDuration: (value: number) => void;
  transitionEasing: string;
  setTransitionEasing: (value: string) => void;
  customTransitionEasing: string;
  setCustomTransitionEasing: (value: string) => void;
  // Nové pro typografii
  textSize: string;
  setTextSize: (value: string) => void;
  fontWeight: string;
  setFontWeight: (value: string) => void;
  letterSpacing: string;
  setLetterSpacing: (value: string) => void;
}

const ButtonSettings: React.FC<ButtonSettingsProps> = (props) => {
  return (
    // Hlavní kontejner pro panel nastavení
    <aside className="w-full md:w-1/2 lg:w-1/3 xl:w-[450px] bg-zinc-950 border border-zinc-900 rounded-xl p-3 flex flex-col justify-between gap-4 h-full max-h-full overflow-hidden">
      {/* Hlavička panelu */}
      <div className="p-2 flex items-center justify-between gap-4 flex-shrink-0">
        <h2 className="text-xl tracking-tighter font-bold">
          Vytvoř si tlačítko
        </h2>
        <p className="text-sm text-zinc-400 tracking-tight">v0.4</p>{" "}
        {/* Zvýšená verze */}
      </div>

      {/* Kontejner pro rolovatelný obsah nastavení */}
      <div className="flex-grow bg-zinc-900/50 border border-zinc-800/50 rounded-lg overflow-y-auto p-3 lg:p-4 !pt-0 custom-scrollbar">
        {/* Nadpis sekce nastavení */}
        <p className="text-zinc-400 tracking-wide font-mono uppercase text-xs flex items-center gap-2 mb-4 sticky top-0 bg-zinc-900 py-2.5 -mx-3 lg:-mx-4 px-3 lg:px-4 z-10 border-b border-zinc-800/50">
          <Settings2 size={14} className="text-lime-400" /> Nastavení
        </p>
        {/* Jednotlivé sekce nastavení */}
        <div className="flex flex-col gap-5">
          {/* Základní Text */}
          <TextInput
            buttonText={props.buttonText}
            setButtonText={props.setButtonText}
          />
          <div className="border-t border-zinc-800/50"></div>
          {/* Typografie --- NOVÁ SEKCE --- */}
          <TypographySettings
            textSize={props.textSize}
            setTextSize={props.setTextSize}
            fontWeight={props.fontWeight}
            setFontWeight={props.setFontWeight}
            letterSpacing={props.letterSpacing}
            setLetterSpacing={props.setLetterSpacing}
          />
          <div className="border-t border-zinc-800/50"></div>
          {/* Rozměry a Vzhled */}
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
          <BorderSizeInput
            borderWidth={props.borderWidth}
            setBorderWidth={props.setBorderWidth}
          />
          <div className="border-t border-zinc-800/50"></div>
          {/* Barvy */}
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
          <div className="border-t border-zinc-800/50"></div>
          {/* Stín */}
          <ShadowInput
            boxShadow={props.boxShadow}
            setBoxShadow={props.setBoxShadow}
          />
          <div className="border-t border-zinc-800/50"></div>
          {/* Interaktivita */}
          <HoverActiveSettings
            hoverBgColor={props.hoverBgColor}
            setHoverBgColor={props.setHoverBgColor}
            hoverBorderColor={props.hoverBorderColor}
            setHoverBorderColor={props.setHoverBorderColor}
            hoverTextColor={props.hoverTextColor}
            setHoverTextColor={props.setHoverTextColor}
            activeBgColor={props.activeBgColor}
            setActiveBgColor={props.setActiveBgColor}
            activeBorderColor={props.activeBorderColor}
            setActiveBorderColor={props.setActiveBorderColor}
            activeTextColor={props.activeTextColor}
            setActiveTextColor={props.setActiveTextColor}
          />
          <div className="border-t border-zinc-800/50"></div>
          <AnimationSettings
            hoverAnimation={props.hoverAnimation}
            setHoverAnimation={props.setHoverAnimation}
            activeAnimation={props.activeAnimation}
            setActiveAnimation={props.setActiveAnimation}
          />
          <div className="border-t border-zinc-800/50"></div>
          <TransitionSettings
            transitionDuration={props.transitionDuration}
            setTransitionDuration={props.setTransitionDuration}
            transitionEasing={props.transitionEasing}
            setTransitionEasing={props.setTransitionEasing}
            customTransitionEasing={props.customTransitionEasing}
            setCustomTransitionEasing={props.setCustomTransitionEasing}
          />
        </div>
      </div>

      {/* Sekce exportu - pevně dole */}
      <div className="flex-shrink-0 mt-4">
        <ExportSection
          tailwindCode={props.tailwindCode}
          copyToClipboard={props.copyToClipboard}
        />
      </div>
    </aside>
  );
};

export default ButtonSettings;
