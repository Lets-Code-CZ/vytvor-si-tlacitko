/* src/types/react-color.d.ts */
declare module "react-color" {
  import * as React from "react";
  
  export interface ColorResult {
    hex: string;
  }
  
  export interface SketchPickerProps {
    color: string;
    onChange?: (color: ColorResult, event?: any) => void;
    onChangeComplete?: (color: ColorResult, event?: any) => void;
    disableAlpha?: boolean;
    presetColors?: string[];
    styles?: any;
  }
  
  export class SketchPicker extends React.Component<SketchPickerProps> {}
}
