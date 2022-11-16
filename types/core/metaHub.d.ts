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

  getYtransform(gridId: number, scaleId: number): any;

  getPreSampler(gridId: number, ovId: number): any;

  getLegendFns(gridId: number, ovId: number): any;
}
