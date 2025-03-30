"use client";
import React, { useState, useEffect } from "react";
import { CheckCircle2, X } from "lucide-react";

interface ModalProps {
  code: string;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ code, onClose }) => {
  const [animate, setAnimate] = useState(false);

  // Spuštění animace při zobrazení
  useEffect(() => {
    setAnimate(true);
  }, []);

  // Funkce pro zavření modalu s animací
  const handleClose = () => {
    setAnimate(false);
    // Počkáme na dokončení animace před zavřením
    setTimeout(onClose, 300);
  };

  return (
    // Overlay pro celý modal
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
      {/* Pozadí s rozmazáním */}
      <div
        className={`absolute inset-0 bg-zinc-950/80 backdrop-blur-sm transition-opacity duration-300 ${
          animate ? "opacity-100" : "opacity-0"
        }`}
        onClick={handleClose} // Zavření kliknutím na pozadí
      ></div>
      {/* Samotný obsah modalu */}
      <div
        className={`relative bg-zinc-900 border border-zinc-800/50 rounded-xl p-4 lg:p-6 max-w-[600px] w-full transition-all duration-300 ${
          animate ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
      >
        {/* Hlavička modalu */}
        <div className="flex items-center justify-between mb-4 gap-2">
          <h2 className="text-lg md:text-xl font-bold tracking-tighter flex items-center gap-3">
            <CheckCircle2 size={24} className="text-lime-400 flex-shrink-0" />
            Kód byl úspěšně zkopírován!
          </h2>
          {/* Tlačítko pro zavření */}
          <button
            onClick={handleClose}
            className="cursor-pointer flex items-center justify-center w-10 h-10 bg-zinc-800/50 border border-zinc-700/50 rounded-full hover:bg-zinc-700/50 transition-all flex-shrink-0"
          >
            <X size={20} />
          </button>
        </div>
        {/* Zobrazení zkopírovaného kódu */}
        <pre className="bg-zinc-950/50 border border-zinc-800/50 text-xs tracking-tight font-mono text-zinc-400 p-4 rounded-md overflow-x-auto text-wrap leading-5">
          {code}
        </pre>
      </div>
    </div>
  );
};

export default Modal;
