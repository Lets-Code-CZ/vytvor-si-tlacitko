"use client";
import React from "react";
import { MousePointer2, Pointer } from "lucide-react";
import ColorPickerInput from "@/components/common/ColorPickerInput"; // Uprav cestu

interface HoverActiveSettingsProps {
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
}

const HoverActiveSettings: React.FC<HoverActiveSettingsProps> = (props) => {
  return (
    <div className="flex flex-col gap-5">
      {/* Hover States */}
      <div>
        <p className="text-xs font-medium tracking-tight mb-2 flex items-center gap-1">
          <MousePointer2 size={14} /> Hover stav - při najetí myší
        </p>
        {/* ZMĚNA: Použití grid-cols-1 pro zobrazení pod sebou */}
        <div className="grid grid-cols-1 gap-4">
          <ColorPickerInput
            label="Pozadí (Hover)"
            color={props.hoverBgColor}
            setColor={props.setHoverBgColor}
            icon={<span className="text-xs">(BG)</span>}
          />
          <ColorPickerInput
            label="Rámeček (Hover)"
            color={props.hoverBorderColor}
            setColor={props.setHoverBorderColor}
            icon={<span className="text-xs">(BR)</span>}
          />
          <ColorPickerInput
            label="Text (Hover)"
            color={props.hoverTextColor}
            setColor={props.setHoverTextColor}
            icon={<span className="text-xs">(TX)</span>}
          />
        </div>
      </div>

      {/* Active States */}
      <div>
        <p className="text-xs font-medium tracking-tight mb-2 flex items-center gap-1">
          <Pointer size={14} /> Active stav - při kliknutí
        </p>
        {/* ZMĚNA: Použití grid-cols-1 pro zobrazení pod sebou */}
        <div className="grid grid-cols-1 gap-4">
          <ColorPickerInput
            label="Pozadí (Active)"
            color={props.activeBgColor}
            setColor={props.setActiveBgColor}
            icon={<span className="text-xs">(BG)</span>}
          />
          <ColorPickerInput
            label="Rámeček (Active)"
            color={props.activeBorderColor}
            setColor={props.setActiveBorderColor}
            icon={<span className="text-xs">(BR)</span>}
          />
          <ColorPickerInput
            label="Text (Active)"
            color={props.activeTextColor}
            setColor={props.setActiveTextColor}
            icon={<span className="text-xs">(TX)</span>}
          />
        </div>
      </div>
    </div>
  );
};

export default HoverActiveSettings;
