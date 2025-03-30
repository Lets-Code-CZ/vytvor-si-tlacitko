// src/types/react-color.d.ts

// Tento soubor poskytuje základní typové definice pro react-color,
// aby TypeScript a ESLint lépe rozuměly props komponent jako SketchPicker.

declare module "react-color" {
  import * as React from "react";

  export interface RGBColor {
    r: number;
    g: number;
    b: number;
    a?: number;
  }

  export interface HSLColor {
    h: number;
    s: number;
    l: number;
    a?: number;
  }

  export interface HSVColor {
    h: number;
    s: number;
    v: number;
    a?: number;
  }

  export interface ColorResult {
    hex: string;
    rgb: RGBColor;
    hsl: HSLColor;
    hsv: HSVColor;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    source?: any; // Zdroj barvy může být různý
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  export type ColorChangeHandler = (
    color: ColorResult,
    event: React.ChangeEvent<any>
  ) => void;

  // OPRAVA: Odstraněn nepoužitý generický parametr <A>
  export interface ColorPickerProps {
    color?: string | RGBColor | HSLColor | HSVColor;
    className?: string;
    // OPRAVA: Použití Record<string, any> místo Partial<any> a ponechání disable komentáře pro jistotu
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    styles?: Partial<Record<string, any>>; // Styly mohou být komplexní
    onChange?: ColorChangeHandler;
    onChangeComplete?: ColorChangeHandler;
  }

  // Typ pro SketchPicker rozšiřuje obecný ColorPickerProps
  export interface SketchPickerProps extends ColorPickerProps {
    disableAlpha?: boolean;
    presetColors?: string[] | { color: string; title: string }[];
    width?: string | number;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  export class SketchPicker extends React.Component<SketchPickerProps, any> {}

  // Zde můžeš přidat další exporty pro jiné pickery, pokud je používáš
  // např. ChromePicker, PhotoshopPicker atd.
}
