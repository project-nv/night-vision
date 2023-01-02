// BS: Would like to look into whether eliminating `any` is possible, but looks good for now.

// OVERLAY OBJECT

type OverlaySettings = {
  display?: boolean;
  scale?: string;
  precision?: number;
  zIndex?: number;
};

export type OverlayData = any[][]; //TODO: fix any, if possible
export type OverlayDataSubset = any[][]; // BSOUP: Are these 2 always identical ?

export type CandleData = [timeMs: number, open: number, high: number, low: number, close: number, volume: number];
export type SplineData = [timeMs: number, value: number];

export type BuiltInCandleOverlay = {
  name: string;
  type: "Candles";
  main?: boolean;
  data?: CandleData[];
  props?: Object;
  settings?: OverlaySettings;
};

export type BuiltInSplineOverlay = {
  name: string;
  type: "Spline";
  main?: boolean;
  data?: SplineData[];
  props?: Object;
  settings?: OverlaySettings;
};

export type BuiltInOverlay = BuiltInCandleOverlay | BuiltInSplineOverlay;

export type Overlay = {
  readonly id?: number;
  readonly uuid?: string;
  name: string;
  type: string;
  main?: boolean;
  data?: OverlayData;
  readonly dataSubset?: OverlayDataSubset;
  readonly dataView?: { [key: string]: any }; //TODO: more accurate typing
  props?: Object;
  settings?: OverlaySettings;
} | BuiltInOverlay;

// PANE OBJECT

type Scale = {
  precision?: number;
};

type PaneSettings = {
  scales?: { [key: string]: Scale };
  scaleTemplate?: string[][];
  scaleIndex?: string;
  scaleSideIdxs?: string[];
  height?: number;
};

export type Pane = {
  readonly id?: number; // These are read-only for sure
  readonly uuid?: string;
  overlays: Overlay[];
  settings?: PaneSettings;
};

// THE TOP LEVEL

export type Data = {
  indexBased?: boolean; // new
  panes: Pane[];
};

// INTERFACE

export type ColorsObj = { [key: string]: string }; //TODO: specify valid color keys

export type ChartConfig = { [key: string]: any };

export type NightVisionProps = {
  /** The container id (should be unique) */
  id?: string;

  /** Width of the chart */
  width?: number;

  /** Height of the chart */
  height?: number;

  /** Colors (modify specific colors) */
  colors?: ColorsObj;

  /** Show NightVision logo */
  showLogo?: boolean;

  /** User-defined scripts */
  scripts?: string[];

  /** Chart data (auto-updates chart on reset) */
  data?: Data;

  /** Overwrites the default config values */
  config?: ChartConfig[];

  /** Index-based mode of rendering (for stocks) */
  indexBased?: boolean;

  /** Timezone (Offset from UTC in hours) */
  timezone?: number;

  /** Tracking the container size */
  autoResize?: boolean;
};
