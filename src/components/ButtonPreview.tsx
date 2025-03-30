"use client";
import React, { useState, useMemo } from "react";

// Mapování Tailwind hodnot na CSS (pro náhled)
const textSizeMap: { [key: string]: string } = {
  xs: "0.75rem",
  sm: "0.875rem",
  base: "1rem",
  lg: "1.125rem",
  xl: "1.25rem",
  "2xl": "1.5rem",
  "3xl": "1.875rem",
  "4xl": "2.25rem",
  "5xl": "3rem",
};
const fontWeightMap: { [key: string]: number } = {
  thin: 100,
  extralight: 200,
  light: 300,
  normal: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  extrabold: 800,
  black: 900,
};
const letterSpacingMap: { [key: string]: string } = {
  tighter: "-0.05em",
  tight: "-0.025em",
  normal: "0em",
  wide: "0.025em",
  wider: "0.05em",
  widest: "0.1em",
};

// Rozšířené props
interface ButtonPreviewProps {
  buttonText: string;
  baseBgColor: string;
  baseBorderColor: string;
  baseTextColor: string;
  hoverBgColor: string;
  hoverBorderColor: string;
  hoverTextColor: string;
  activeBgColor: string;
  activeBorderColor: string;
  activeTextColor: string;
  paddingX: number;
  paddingY: number;
  roundedTL: number;
  roundedTR: number;
  roundedBR: number;
  roundedBL: number;
  borderWidth: number;
  boxShadow: string;
  transitionDuration: number;
  transitionEasing: string;
  customTransitionEasing: string;
  // Nové props pro typografii
  textSize: string;
  fontWeight: string;
  letterSpacing: string;
}

const ButtonPreview: React.FC<ButtonPreviewProps> = ({
  buttonText,
  baseBgColor,
  baseBorderColor,
  baseTextColor,
  hoverBgColor,
  hoverBorderColor,
  hoverTextColor,
  activeBgColor,
  activeBorderColor,
  activeTextColor,
  paddingX,
  paddingY,
  roundedTL,
  roundedTR,
  roundedBR,
  roundedBL,
  borderWidth,
  boxShadow,
  transitionDuration,
  transitionEasing,
  customTransitionEasing,
  textSize,
  fontWeight,
  letterSpacing, // Přijetí nových props
}) => {
  const [isHovering, setIsHovering] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  // Výpočet aktuálního stylu
  const currentStyle: React.CSSProperties = useMemo(() => {
    let currentBgColor: string,
      currentBorderColor: string,
      currentTextColor: string;
    if (isPressed) {
      currentBgColor = activeBgColor;
      currentBorderColor = activeBorderColor;
      currentTextColor = activeTextColor;
    } else if (isHovering) {
      currentBgColor = hoverBgColor;
      currentBorderColor = hoverBorderColor;
      currentTextColor = hoverTextColor;
    } else {
      currentBgColor = baseBgColor;
      currentBorderColor = baseBorderColor;
      currentTextColor = baseTextColor;
    }
    const combinedShadow =
      boxShadow && boxShadow.trim() !== "none" ? boxShadow : undefined;
    let timingFunction = `ease-${transitionEasing}`;
    if (transitionEasing === "custom") {
      const bezierValue = customTransitionEasing.replace(/\s+/g, "");
      if (
        bezierValue.startsWith("cubic-bezier(") &&
        bezierValue.endsWith(")")
      ) {
        timingFunction = bezierValue;
      } else {
        timingFunction = "ease-in-out";
      }
    } else if (["linear", "in", "out", "in-out"].includes(transitionEasing)) {
      timingFunction = `ease-${transitionEasing}`; // Tailwind 'in' maps to 'ease-in' etc.
      if (transitionEasing === "linear") timingFunction = "linear";
      if (transitionEasing === "in") timingFunction = "ease-in";
      if (transitionEasing === "out") timingFunction = "ease-out";
      if (transitionEasing === "in-out") timingFunction = "ease-in-out";
    } else {
      timingFunction = "ease-in-out";
    }

    return {
      backgroundColor: currentBgColor,
      borderColor: currentBorderColor,
      color: currentTextColor,
      padding: `${paddingY}px ${paddingX}px`,
      borderRadius: `${roundedTL}px ${roundedTR}px ${roundedBR}px ${roundedBL}px`,
      borderWidth: `${borderWidth}px`,
      borderStyle: "solid",
      boxShadow: combinedShadow,
      transitionProperty:
        "color, background-color, border-color, box-shadow, transform",
      transitionDuration: `${transitionDuration}ms`,
      transitionTimingFunction: timingFunction,
      cursor: "pointer",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "0.5rem",
      outline: "none",
      // Aplikace typografie --- NOVÉ ---
      fontSize: textSizeMap[textSize] || "1rem", // Fallback na 'base'
      fontWeight: fontWeightMap[fontWeight] || 400, // Fallback na 'normal'
      letterSpacing: letterSpacingMap[letterSpacing] || "0em", // Fallback na 'normal'
    };
  }, [
    isHovering,
    isPressed,
    baseBgColor,
    baseBorderColor,
    baseTextColor,
    hoverBgColor,
    hoverBorderColor,
    hoverTextColor,
    activeBgColor,
    activeBorderColor,
    activeTextColor,
    paddingX,
    paddingY,
    roundedTL,
    roundedTR,
    roundedBR,
    roundedBL,
    borderWidth,
    boxShadow,
    transitionDuration,
    transitionEasing,
    customTransitionEasing,
    textSize,
    fontWeight,
    letterSpacing, // Přidány závislosti na typografii
  ]);

  return (
    <button
      id="button-preview"
      style={currentStyle}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => {
        setIsHovering(false);
        setIsPressed(false);
      }}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      className="antialiased" // Jen pro font smoothing
    >
      {buttonText || "Náhled tlačítka"}
    </button>
  );
};

export default ButtonPreview;
