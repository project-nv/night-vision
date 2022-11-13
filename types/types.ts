
// BS: Would like to look into whether eliminating `any` is possible, but looks good for now.

// OVERLAY OBJECT

type OverlaySettings = {
  display?: boolean;
  scale?: string;
  precision?: number;
  zIndex?: number;
};

type Overlay = {
  name: string;
  type: string;
  main?: boolean;
  data: any[][]; //TODO: fix any, if possible
  settings?: OverlaySettings;
  props?: Object;
};

// PANE OBJECT

type Scale = {
  precision?: number;
};

type PaneSettings = {
  scales?: { [key: string]: Scale };
  scaleTemplate?: string[][]; // [['B', …], ['A', …]] ???
  scaleIndex?: string;
  scaleSideIdxs?: [];
  height?: number;
};

type Pane = {
  id: number;
  uuid: string; // TODO: the question remains, does user need to see auto-gen props
  overlays: Overlay[];
  settings: PaneSettings;
};

// THE TOP LEVEL

export type Data = {
  indexBased: boolean; // new
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
  scripts?: string[]; // CM: array of strings

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
