"use client";
import React from "react";
import { Zap } from "lucide-react";

interface AnimationSettingsProps {
  hoverAnimation: string;
  setHoverAnimation: (value: string) => void;
  activeAnimation: string;
  setActiveAnimation: (value: string) => void;
}

// Definice presetů animací (musí odpovídat CSS třídám)
const animationPresets = [
  { value: "animate-none", label: "Žádná" },
  { value: "animate-pulse-once", label: "Pulse" },
  { value: "animate-shake-once", label: "Shake" },
  { value: "animate-bounce-once", label: "Bounce" },
  { value: "animate-tada-once", label: "Tada" },
  { value: "animate-ping-subtle-once", label: "Ping Subtle" },
];

const AnimationSettings: React.FC<AnimationSettingsProps> = ({
  hoverAnimation,
  setHoverAnimation,
  activeAnimation,
  setActiveAnimation,
}) => {
  const selectStyles =
    "text-xs tracking-tight bg-zinc-900/50 border border-zinc-800/50 py-3 px-4 w-full rounded-lg text-white mt-1 focus:border-lime-500 focus:outline-none transition-all appearance-none cursor-pointer"; // Přidán appearance-none

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div>
        <label
          htmlFor="hoverAnimation"
          className="text-xs font-medium tracking-tight mb-1 flex items-center gap-1"
        >
          <Zap size={14} /> Hover animace
        </label>
        <div className="relative">
          <select
            id="hoverAnimation"
            name="hoverAnimation"
            value={hoverAnimation}
            onChange={(e) => setHoverAnimation(e.target.value)}
            className={selectStyles}
          >
            {animationPresets.map((preset) => (
              <option key={preset.value} value={preset.value}>
                {preset.label}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
            <svg
              className="fill-current h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>
      </div>
      <div>
        <label
          htmlFor="activeAnimation"
          className="text-xs font-medium tracking-tight mb-1 flex items-center gap-1"
        >
          <Zap size={14} /> Active animace
        </label>
        <div className="relative">
          <select
            id="activeAnimation"
            name="activeAnimation"
            value={activeAnimation}
            onChange={(e) => setActiveAnimation(e.target.value)}
            className={selectStyles}
          >
            {animationPresets.map((preset) => (
              <option key={preset.value} value={preset.value}>
                {preset.label}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
            <svg
              className="fill-current h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimationSettings;
