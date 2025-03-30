"use client";
import React from "react";
import { Text } from "lucide-react";

interface TextInputProps {
  buttonText: string;
  setButtonText: (text: string) => void;
}

const TextInput: React.FC<TextInputProps> = ({ buttonText, setButtonText }) => {
  return (
    <div>
      <label
        htmlFor="text"
        className="text-xs font-medium tracking-tight mb-1 flex items-center gap-1"
      >
        <Text size={14} /> Text tlačítka
      </label>
      <input
        id="text" // Přidáno id pro propojení s labelem
        name="text"
        type="text"
        placeholder="Text tlačítka"
        value={buttonText}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setButtonText(e.target.value)
        }
        className="text-xs tracking-tight bg-zinc-900/50 border border-zinc-800/50 py-3 px-4 w-full rounded-lg text-white mt-1 focus:border-lime-500 focus:outline-none transition-all"
      />
    </div>
  );
};

export default TextInput;
