"use client";
import React, { useState, useEffect, useRef } from "react";
import { ArrowRight, CheckCircle2, FileDown, Paintbrush, Palette, Settings2, Spline, Text, UnfoldHorizontal, X } from "lucide-react";
import Image from "next/image";
import { SketchPicker } from "react-color";

// Utility function to convert RGBA to HEX (including alpha as 8-digit hex)
const rgbaToHex = (r: number, g: number, b: number, a: number): string => {
  const toHex = (n: number) => {
    const hex = Math.round(n).toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  };
  const rHex = toHex(r);
  const gHex = toHex(g);
  const bHex = toHex(b);
  const aHex = toHex(a * 255);
  return `#${rHex}${gHex}${bHex}${aHex}`;
};

type ButtonSettingsProps = {
  buttonText: string;
  setButtonText: React.Dispatch<React.SetStateAction<string>>;
  roundedTL: number;
  setRoundedTL: React.Dispatch<React.SetStateAction<number>>;
  roundedTR: number;
  setRoundedTR: React.Dispatch<React.SetStateAction<number>>;
  roundedBR: number;
  setRoundedBR: React.Dispatch<React.SetStateAction<number>>;
  roundedBL: number;
  setRoundedBL: React.Dispatch<React.SetStateAction<number>>;
  paddingX: number;
  setPaddingX: React.Dispatch<React.SetStateAction<number>>;
  paddingY: number;
  setPaddingY: React.Dispatch<React.SetStateAction<number>>;
  lockRoundness: boolean;
  setLockRoundness: React.Dispatch<React.SetStateAction<boolean>>;
  lockPadding: boolean;
  setLockPadding: React.Dispatch<React.SetStateAction<boolean>>;
  tailwindCode: string;
  copyToClipboard: () => void;
  buttonColor: string;
  setButtonColor: React.Dispatch<React.SetStateAction<string>>;
  useSameBorder: boolean;
  setUseSameBorder: React.Dispatch<React.SetStateAction<boolean>>;
  borderColor: string;
  setBorderColor: React.Dispatch<React.SetStateAction<string>>;
  textColor: string;
  setTextColor: React.Dispatch<React.SetStateAction<string>>;
};

function ButtonSettings({ 
  buttonText, setButtonText,
  roundedTL, setRoundedTL,
  roundedTR, setRoundedTR,
  roundedBR, setRoundedBR,
  roundedBL, setRoundedBL,
  paddingX, setPaddingX,
  paddingY, setPaddingY,
  lockRoundness, setLockRoundness,
  lockPadding, setLockPadding,
  tailwindCode,
  copyToClipboard,
  buttonColor,
  setButtonColor,
  useSameBorder,
  setUseSameBorder,
  borderColor,
  setBorderColor,
  textColor,
  setTextColor
}: ButtonSettingsProps) {
  // For background color picker
  const [showColorPicker, setShowColorPicker] = useState(false);
  const pickerContainerRef = useRef<HTMLDivElement>(null);
  // For border color picker
  const [showBorderPicker, setShowBorderPicker] = useState(false);
  const borderPickerRef = useRef<HTMLDivElement>(null);
  // For text color picker
  const [showTextPicker, setShowTextPicker] = useState(false);
  const textPickerRef = useRef<HTMLDivElement>(null);

  // Hide background color picker if clicked outside.
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        pickerContainerRef.current &&
        !pickerContainerRef.current.contains(event.target as Node)
      ) {
        setShowColorPicker(false);
      }
    }
    if (showColorPicker) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showColorPicker]);

  // Hide border color picker if clicked outside.
  useEffect(() => {
    function handleBorderClickOutside(event: MouseEvent) {
      if (
        borderPickerRef.current &&
        !borderPickerRef.current.contains(event.target as Node)
      ) {
        setShowBorderPicker(false);
      }
    }
    if (showBorderPicker) {
      document.addEventListener("mousedown", handleBorderClickOutside);
    } else {
      document.removeEventListener("mousedown", handleBorderClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleBorderClickOutside);
  }, [showBorderPicker]);

  // Hide text color picker if clicked outside.
  useEffect(() => {
    function handleTextClickOutside(event: MouseEvent) {
      if (
        textPickerRef.current &&
        !textPickerRef.current.contains(event.target as Node)
      ) {
        setShowTextPicker(false);
      }
    }
    if (showTextPicker) {
      document.addEventListener("mousedown", handleTextClickOutside);
    } else {
      document.removeEventListener("mousedown", handleTextClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleTextClickOutside);
  }, [showTextPicker]);

  // Determine dark mode based on document class.
  const isDark =
    typeof window !== "undefined" &&
    document.documentElement.classList.contains("dark");
  const pickerStyles = {
    default: {
      picker: {
        boxShadow: "none",
        background: isDark ? "#1f2937" : "#fff",
        border: "none",
      },
      compact: {
        background: isDark ? "#1f2937" : "#fff",
      },
    },
  };

  return (
    <aside className="xl:w-1/4 lg:w-1/3 md:w-1/2 bg-zinc-950 border border-zinc-900 rounded-xl p-2 flex flex-col justify-between gap-4">
      <div className="p-2 lg:p-4 !pb-0 flex items-center justify-between gap-4">
        <h2 className="text-xl tracking-tighter font-bold">Generate me a button</h2>
        <p className="text-sm text-zinc-400 tracking-tight">v0.6</p>
      </div>
      {/* Settings */}
      <div className="h-full max-h-full bg-zinc-900/50 border border-zinc-800/50 rounded-lg overflow-y-auto p-2 lg:p-4">
        <p className="text-zinc-400 tracking-wide font-mono uppercase text-xs flex items-center gap-2 mb-2">
          <Settings2 size={14} className="text-lime-400" /> Button settings
        </p>
        <div className="h-fit flex flex-col gap-4">
          {/* Button text input */}
          <div>
            <label htmlFor="text" className="text-xs font-medium tracking-tight mb-1 flex items-center gap-1">
              <Text size={14} /> Button Text
            </label>
            <input
              name="text"
              type="text"
              placeholder="Text of the button"
              value={buttonText}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setButtonText(e.target.value)}
              className="text-xs tracking-tight bg-zinc-900/50 border border-zinc-800/50 py-3 px-4 w-full rounded-lg text-white mt-1 focus:border-lime-500 focus:outline-none transition-all"
            />
          </div>
          <div className="border-t border-zinc-900"></div>
          {/* Roundness inputs */}
          <div>
            <label className="text-xs font-medium tracking-tight mb-1 flex items-center gap-1">
              <Spline size={14} /> Roundness
            </label>
            <div className="flex items-center justify-start gap-2 w-full my-2">
              <input
                name="lockRoundness"
                type="checkbox"
                checked={lockRoundness}
                onChange={(e) => setLockRoundness(e.target.checked)}
                className="w-auto accent-lime-500"
              />
              <span className="w-full text-xs tracking-tight text-zinc-400">Lock roundness</span>
            </div>
            <div className="flex items-center gap-2 mb-1">
              <input
                name="roundedTL"
                type="number"
                placeholder="Top left"
                value={roundedTL}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const value = Number(e.target.value);
                  if(lockRoundness){
                    setRoundedTL(value);
                    setRoundedTR(value);
                    setRoundedBL(value);
                    setRoundedBR(value);
                  } else {
                    setRoundedTL(value);
                  }
                }}
                className="text-xs tracking-tight bg-zinc-900/50 border border-zinc-800/50 py-3 px-4 w-full rounded-lg text-white mt-1 focus:border-lime-500 focus:outline-none transition-all"
              />
              <input
                name="roundedTR"
                type="number"
                placeholder="Top right"
                value={roundedTR}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const value = Number(e.target.value);
                  if(lockRoundness){
                    setRoundedTL(value);
                    setRoundedTR(value);
                    setRoundedBL(value);
                    setRoundedBR(value);
                  } else {
                    setRoundedTR(value);
                  }
                }}
                className="text-xs tracking-tight bg-zinc-900/50 border border-zinc-800/50 py-3 px-4 w-full rounded-lg text-white mt-1 focus:border-lime-500 focus:outline-none transition-all"
              />
            </div>
            <div className="flex items-center gap-2">
              <input
                name="roundedBL"
                type="number"
                placeholder="Bottom left"
                value={roundedBL}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const value = Number(e.target.value);
                  if(lockRoundness){
                    setRoundedTL(value);
                    setRoundedTR(value);
                    setRoundedBL(value);
                    setRoundedBR(value);
                  } else {
                    setRoundedBL(value);
                  }
                }}
                className="text-xs tracking-tight bg-zinc-900/50 border border-zinc-800/50 py-3 px-4 w-full rounded-lg text-white mt-1 focus:border-lime-500 focus:outline-none transition-all"
              />
              <input
                name="roundedBR"
                type="number"
                placeholder="Bottom right"
                value={roundedBR}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const value = Number(e.target.value);
                  if(lockRoundness){
                    setRoundedTL(value);
                    setRoundedTR(value);
                    setRoundedBL(value);
                    setRoundedBR(value);
                  } else {
                    setRoundedBR(value);
                  }
                }}
                className="text-xs tracking-tight bg-zinc-900/50 border border-zinc-800/50 py-3 px-4 w-full rounded-lg text-white mt-1 focus:border-lime-500 focus:outline-none transition-all"
              />
            </div>
          </div>
          <div className="border-t border-zinc-900"></div>
          {/* Padding inputs */}
          <div>
            <label className="text-xs font-medium tracking-tight mb-1 flex items-center gap-1">
              <UnfoldHorizontal size={14} /> Padding
            </label>
            <div className="flex items-center justify-start gap-2 w-full my-2">
              <input
                name="lockPadding"
                type="checkbox"
                checked={lockPadding}
                onChange={(e) => setLockPadding(e.target.checked)}
                className="w-auto accent-lime-500"
              />
              <span className="w-full text-xs tracking-tight text-zinc-400">Lock padding</span>
            </div>
            <div className="flex items-center gap-2">
              <input
                name="paddingX"
                type="number"
                placeholder="X size"
                value={paddingX}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const value = Number(e.target.value);
                  if(lockPadding){
                    setPaddingX(value);
                    setPaddingY(value);
                  } else {
                    setPaddingX(value);
                  }
                }}
                className="text-xs tracking-tight bg-zinc-900/50 border border-zinc-800/50 py-3 px-4 w-full rounded-lg text-white mt-1 focus:border-lime-500 focus:outline-none transition-all"
              />
              <input
                name="paddingY"
                type="number"
                placeholder="Y size"
                value={paddingY}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const value = Number(e.target.value);
                  if(lockPadding){
                    setPaddingX(value);
                    setPaddingY(value);
                  } else {
                    setPaddingY(value);
                  }
                }}
                className="text-xs tracking-tight bg-zinc-900/50 border border-zinc-800/50 py-3 px-4 w-full rounded-lg text-white mt-1 focus:border-lime-500 focus:outline-none transition-all"
              />
            </div>
          </div>
          <div className="border-t border-zinc-900"></div>
          {/* Background Color picker input */}
          <div ref={pickerContainerRef} className="relative">
          <label className="text-xs font-medium tracking-tight mb-1 flex items-center gap-1">
              <Palette size={14} /> Background color
            </label>
            {showColorPicker && (
              <div className="absolute left-0 -top-[220px] w-full z-10">
                <SketchPicker
                  color={buttonColor}
                  onChange={(color: any) => {
                    const { r, g, b, a } = color.rgb;
                    const hex = rgbaToHex(r, g, b, a);
                    setButtonColor(hex);
                  }}
                  presetColors={[]}
                  styles={pickerStyles}
                />
              </div>
            )}
            <input
              type="text"
              value={buttonColor}
              onClick={() => setShowColorPicker(!showColorPicker)}
              onChange={(e) => setButtonColor(e.target.value)}
              className="text-xs bg-zinc-900/50 border border-zinc-800/50 py-2 px-3 rounded text-white w-full focus:border-lime-500 focus:outline-none transition-all cursor-pointer"
            />
          </div>
          {/* Border same as background checkbox */}
          <div className="mt-0">
            <label className="flex items-center gap-2 text-xs font-medium tracking-tight">
              <input
                type="checkbox"
                checked={useSameBorder}
                onChange={(e) => setUseSameBorder(e.target.checked)}
                className="accent-lime-500"
              />
              Border same as background
            </label>
            { !useSameBorder && (
              <div ref={borderPickerRef} className="relative mt-2">
                <label className="text-xs font-medium tracking-tight mb-1 flex items-center gap-1">
                  <Palette size={14} /> Border color
                </label>
                {showBorderPicker && (
                  <div className="absolute left-0 -top-[220px] w-full z-10">
                    <SketchPicker
                      color={borderColor}
                      onChange={(color: any) => {
                        const { r, g, b, a } = color.rgb;
                        const hex = rgbaToHex(r, g, b, a);
                        setBorderColor(hex);
                      }}
                      presetColors={[]}
                      styles={pickerStyles}
                    />
                  </div>
                )}
                <input
                  type="text"
                  value={borderColor}
                  onClick={() => setShowBorderPicker(!showBorderPicker)}
                  onChange={(e) => setBorderColor(e.target.value)}
                  className="text-xs bg-zinc-900/50 border border-zinc-800/50 py-2 px-3 rounded text-white w-full focus:border-lime-500 focus:outline-none transition-all cursor-pointer"
                />
              </div>
            )}
          </div>
          <div className="border-t border-zinc-900"></div>
          {/* Text Color picker input */}
          <div ref={textPickerRef}>
            <label className="text-xs font-medium tracking-tight mb-1 flex items-center gap-1">
              <Paintbrush size={14} /> Text color
            </label>
            {showTextPicker && (
              <div className="absolute left-10 top-[310px] w-full z-10">
                <SketchPicker
                  color={textColor}
                  onChange={(color: any) => {
                    const { r, g, b, a } = color.rgb;
                    const hex = rgbaToHex(r, g, b, a);
                    setTextColor(hex);
                  }}
                  presetColors={[]}
                  styles={pickerStyles}
                />
              </div>
            )}
            <input
              type="text"
              value={textColor}
              onClick={() => setShowTextPicker(!showTextPicker)}
              onChange={(e) => setTextColor(e.target.value)}
              className="text-xs bg-zinc-900/50 border border-zinc-800/50 py-2 px-3 rounded text-white w-full focus:border-lime-500 focus:outline-none transition-all cursor-pointer"
            />
          </div>
        </div>
      </div>
      <div>
        <p className="text-zinc-400 tracking-wide font-mono uppercase text-xs flex items-center gap-2 mb-2">
          <FileDown size={14} className="text-lime-400" /> Export to Tailwind
        </p>
        <div className="h-12 w-full bg-zinc-900/60 border border-b-0 border-zinc-800/50 rounded-t-lg p-2 px-4 flex items-center justify-between">
          <p className="text-xs font-medium tracking-tight">ExportButton.tsx</p>
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded bg-lime-400 hover:h-4 transition-all"></span>
            <span className="w-2 h-2 rounded bg-amber-500 hover:h-4 transition-all"></span>
            <span className="w-2 h-2 rounded bg-rose-500 hover:h-4 transition-all"></span>
          </div>
        </div>
        <textarea
          readOnly 
          value={tailwindCode}
          className="text-xs text-zinc-400 tracking-tight font-mono rounded-b-lg w-full h-48 p-4 bg-zinc-900/50 border border-zinc-800/50 focus:outline-none"
        />
        <button 
          onClick={copyToClipboard}
          className="cursor-pointer mt-2 bg-lime-400 dark:bg-lime-800 border border-lime-500 dark:border-lime-600 w-full p-4 rounded-lg text-xs tracking-tight flex items-center justify-center gap-2 text-zinc-950 dark:text-white hover:bg-lime-500 hover:border-lime-500 dark:hover:text-zinc-950 transition-all"
        >
          Click to copy code <ArrowRight size={14} />
        </button>
      </div>
    </aside>
  );
}

type ButtonPreviewProps = {
  buttonText: string;
  style: React.CSSProperties;
};

function ButtonPreview({ buttonText, style }: ButtonPreviewProps) {
  return (
    <button
      id="button"
      style={style}
      className="w-fit self-start border border-lime-500 dark:border-lime-600 text-xs tracking-tight flex items-center justify-center gap-2 text-zinc-950 dark:text-white hover:border-lime-500 dark:hover:text-zinc-950 transition-all"
    >
      {buttonText}
    </button>
  );
}

function Modal({ code, onClose }: { code: string; onClose: () => void }) {
  const [animate, setAnimate] = useState(false);
  useEffect(() => {
    setAnimate(true);
  }, []);
  const handleClose = () => {
    setAnimate(false);
    setTimeout(onClose, 300);
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div 
        className={`absolute inset-0 bg-zinc-950/50 backdrop-blur-sm transition-all duration-300 ${animate ? "opacity-100" : "opacity-0"}`}
        onClick={handleClose}
      ></div>
      <div className={`relative bg-white dark:bg-zinc-900/50 border border-zinc-800/50 backdrop-blur-lg rounded-xl p-4 lg:p-6 max-w-[600px] w-full transition-all duration-300 ${animate ? "opacity-100" : "opacity-0"}`}>
        <div className="flex items-center justify-between mb-4 gap-2">
          <h2 className="text-xl font-bold tracking-tighter flex items-center gap-3"><CheckCircle2 size={24} className="text-lime-400" /> Code was successfully copied!</h2>
          <button onClick={handleClose} className="cursor-pointer flex items-center justify-center w-12 h-12 bg-zinc-800/50 border border-zinc-700/50 rounded-full hover:bg-zinc-700/50 transition-all">
            <X size={20} />
          </button>
        </div>
        <pre className="bg-zinc-900 border border-zinc-800/50 text-xs tracking-tight font-mono text-zinc-400 p-4 rounded-md overflow-x-auto text-wrap leading-5">{code}</pre>
      </div>
    </div>
  );
}

export default function Home() {
  const [buttonText, setButtonText] = useState("This is a test button.");
  const [roundedTL, setRoundedTL] = useState(0);
  const [roundedTR, setRoundedTR] = useState(0);
  const [roundedBR, setRoundedBR] = useState(0);
  const [roundedBL, setRoundedBL] = useState(0);
  const [paddingX, setPaddingX] = useState(10);
  const [paddingY, setPaddingY] = useState(10);
  const [lockRoundness, setLockRoundness] = useState(false);
  const [lockPadding, setLockPadding] = useState(false);
  const [buttonColor, setButtonColor] = useState("#84cc16");
  const [useSameBorder, setUseSameBorder] = useState(true);
  const [borderColor, setBorderColor] = useState("#84cc16");
  const [textColor, setTextColor] = useState("#000000");
  const [showModal, setShowModal] = useState(false);

  const borderRadiusClasses = `rounded-tl-[${roundedTL}px] rounded-tr-[${roundedTR}px] rounded-br-[${roundedBR}px] rounded-bl-[${roundedBL}px]`;
  const paddingClasses = `py-[${paddingY}px] px-[${paddingX}px]`;
  const baseClasses = `w-fit self-start border border-lime-500 dark:border-lime-600 ${borderRadiusClasses} ${paddingClasses} text-xs tracking-tight flex items-center justify-center gap-2 transition-all`;
  
  // Determine which color to use for border
  const finalBorderColor = useSameBorder ? buttonColor : borderColor;
  const tailwindCode = `<button class="${baseClasses} bg-[${buttonColor}] border-[${finalBorderColor}] text-[${textColor}]">${buttonText}</button>`;
  const previewStyle = {
    backgroundColor: buttonColor,
    padding: `${paddingY}px ${paddingX}px`,
    borderRadius: `${roundedTL}px ${roundedTR}px ${roundedBR}px ${roundedBL}px`,
    borderColor: finalBorderColor,
    color: textColor
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(tailwindCode);
      setShowModal(true);
    } catch (err) {
      alert("Chyba při kopírování kódu.");
    }
  };

  return (
    <div className="p-4 flex gap-4 h-screen">
      {showModal && <Modal code={tailwindCode} onClose={() => setShowModal(false)} />}
      <ButtonSettings
        buttonText={buttonText}
        setButtonText={setButtonText}
        roundedTL={roundedTL}
        setRoundedTL={setRoundedTL}
        roundedTR={roundedTR}
        setRoundedTR={setRoundedTR}
        roundedBR={roundedBR}
        setRoundedBR={setRoundedBR}
        roundedBL={roundedBL}
        setRoundedBL={setRoundedBL}
        paddingX={paddingX}
        setPaddingX={setPaddingX}
        paddingY={paddingY}
        setPaddingY={setPaddingY}
        lockRoundness={lockRoundness}
        setLockRoundness={setLockRoundness}
        lockPadding={lockPadding}
        setLockPadding={setLockPadding}
        tailwindCode={tailwindCode}
        copyToClipboard={copyToClipboard}
        buttonColor={buttonColor}
        setButtonColor={setButtonColor}
        useSameBorder={useSameBorder}
        setUseSameBorder={setUseSameBorder}
        borderColor={borderColor}
        setBorderColor={setBorderColor}
        textColor={textColor}
        setTextColor={setTextColor}
      />
      <main className="w-full bg-zinc-950 border border-zinc-900 rounded-xl p-4 lg:p-6 xl:p-8 flex flex-col gap-4">
        <h1 className="text-4xl font-bold mb-4">Preview</h1>
        <p className="mb-4">Nastavte vlastnosti tlačítka a zobrazí se zde náhled.</p>
        <ButtonPreview buttonText={buttonText} style={previewStyle} />
      </main>
    </div>
  );
}
