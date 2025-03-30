"use client";
import React, { useState } from "react";
import { ArrowLeftRight, SlidersHorizontal } from "lucide-react";

interface TransitionSettingsProps {
  transitionDuration: number;
  setTransitionDuration: (value: number) => void;
  transitionEasing: string;
  setTransitionEasing: (value: string) => void;
  customTransitionEasing: string;
  setCustomTransitionEasing: (value: string) => void;
}

// Standardní Tailwind easing funkce
const easingOptions = [
  { value: "linear", label: "Linear" },
  { value: "in", label: "Ease In" },
  { value: "out", label: "Ease Out" },
  { value: "in-out", label: "Ease In Out" },
  { value: "custom", label: "Vlastní (Cubic Bezier)" },
];

const TransitionSettings: React.FC<TransitionSettingsProps> = ({
  transitionDuration,
  setTransitionDuration,
  transitionEasing,
  setTransitionEasing,
  customTransitionEasing,
  setCustomTransitionEasing,
}) => {
  const handleDurationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setTransitionDuration(value >= 0 ? value : 0);
  };

  const handleEasingChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTransitionEasing(e.target.value);
  };

  const selectStyles =
    "text-xs tracking-tight bg-zinc-900/50 border border-zinc-800/50 py-3 px-4 w-full rounded-lg text-white mt-1 focus:border-lime-500 focus:outline-none transition-all appearance-none cursor-pointer";

  return (
    <div className="flex flex-col gap-4">
      <p className="text-xs font-medium tracking-tight mb-0 flex items-center gap-1">
        <ArrowLeftRight size={14} /> Přechod mezi stavy
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Duration Input */}
        <div>
          <label
            htmlFor="transitionDuration"
            className="text-xs font-medium tracking-tight mb-1 block"
          >
            Délka (ms)
          </label>
          <input
            id="transitionDuration"
            name="transitionDuration"
            type="number"
            min="0"
            placeholder="např. 300"
            value={transitionDuration}
            onChange={handleDurationChange}
            className="text-xs tracking-tight bg-zinc-900/50 border border-zinc-800/50 py-3 px-4 w-full rounded-lg text-white mt-1 focus:border-lime-500 focus:outline-none transition-all"
          />
        </div>

        {/* Easing Select */}
        <div>
          <label
            htmlFor="transitionEasing"
            className="text-xs font-medium tracking-tight mb-1 block"
          >
            Zrychlení (Easing)
          </label>
          <div className="relative">
            <select
              id="transitionEasing"
              name="transitionEasing"
              value={transitionEasing}
              onChange={handleEasingChange}
              className={selectStyles}
            >
              {easingOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
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

      {/* Custom Easing Input (conditional) */}
      {transitionEasing === "custom" && (
        <div>
          <label
            htmlFor="customTransitionEasing"
            className="text-xs font-medium tracking-tight mb-1 block"
          >
            Vlastní Cubic Bezier
          </label>
          <input
            id="customTransitionEasing"
            name="customTransitionEasing"
            type="text"
            placeholder="např. cubic-bezier(0.4, 0, 0.2, 1)"
            value={customTransitionEasing}
            onChange={(e) => setCustomTransitionEasing(e.target.value)}
            className="text-xs tracking-tight bg-zinc-900/50 border border-zinc-800/50 py-3 px-4 w-full rounded-lg text-white mt-1 focus:border-lime-500 focus:outline-none transition-all font-mono"
          />
          <p className="text-xs text-zinc-500 mt-1">
            Zadej platnou `cubic-bezier(...)` hodnotu.
          </p>
        </div>
      )}
    </div>
  );
};

export default TransitionSettings;
