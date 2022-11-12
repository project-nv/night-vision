type OHLCV = [number, number, number, number, number, number];

type ChartInfo = {
  name: string;
  type: string;
  main: boolean;
  data: OHLCV[]; //TODO: fix, not completely accurate based on what I see in README
  settings: any; // TODO: fix any
};

type Pane = {
  overlays: ChartInfo[];
};

export type Data = {
  panes: Pane[];
};

export type ColorsObj = { [key: string]: string }; //TODO: specify valid color keys

export type NightVisionProps = {
  id?: string;
  width?: number;
  height?: number;
  colors?: ColorsObj;
  showLogo?: boolean;
  // TODO: Fix `any`
  scripts?: any[];
  data?: Data;
  config?: any[];
  indexBased?: boolean;
  timezone?: number;
  // getters return null if not found: interface.js //TODO: Fix `any`
  layout?: any | null;
  range?: any | null;
  cursor?: any | null;
  autoResize?: boolean;
};
