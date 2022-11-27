import { Overlay } from "../types";

export interface MetaHub {
  /** Legend formatters */
  readonly legendFns: any[];

  /** yTransforms of sidebars */
  readonly yTransforms: any[];

  /** Auto-precision samplers */
  readonly preSamplers: any[];

  /** yRange functions of overlays */
  readonly yRangeFns: any[];

  /** Auto-precision for overlays */
  readonly autoPrecisions: any[];

  /** Price labels + price lines */
  readonly valueTrackers: any[];

  readonly selectedOverlay: Overlay;

  /** OHLC map of the main Overlay */
  readonly ohlcMap: any[];

  /** OHLC mapper function */
  readonly ohlcFn: any;

  /** Get y-transform of a specific scale */
  getYtransform(gridId: number, scaleId: number): any;

  /** Get auto precision of a specific overlay */
  getAutoPrec(gridId: number, ovId: number): any;

  /** Get a precision sampler of a specific overlay */
  getPreSampler(gridId: number, ovId: number): any;

  /** Get legend formatter of a specific overlay */
  getLegendFns(gridId: number, ovId: number): any;

  /** Get OHLC values to use as "magnet" values */
  ohlc(t: any): any;
}
