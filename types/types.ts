type OHLCV = [number, number, number, number, number, number];

type ChartInfo = {
  name: string;
  type: string;
  main: boolean;
  data: OHLCV[];
};

type Pane = {
  overlays: ChartInfo[];
};

export type Data = {
  panes: Pane[];
};

export type Color = { [key: string]: string }; //TODO: specify valid color keys

export type NightVisionProps = {
  id?: string;
  width?: number;
  height?: number;
  colors?: Color;
  showLogo?: boolean;
  // TODO: Fix `any`
  scripts?: any[];
  data?: Data;
  config?: any[];
  indexBased?: boolean;
  timezone?: number;
  // getters return null if not found: interference.js //TODO: Fix `any`
  layout?: any | null;
  range?: any | null;
  cursor?: any | null;
  autoResize?: boolean;
};
