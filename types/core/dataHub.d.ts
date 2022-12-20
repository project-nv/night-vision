import { Data, Overlay, OverlayData, OverlayDataSubset, Pane } from "../types";
import DataView$ from "./dataView";

// TODO: add method doc strings
// TODO: fix any
export interface DataHub {
  /** Data object */
  readonly data: any;

  /** Index based mode */
  readonly indexBased: boolean;

  /** Pane with the main overlay (main pane) */
  readonly chart: Pane;

  readonly offchart: Pane[] | any; // Not sure if Pane[] is correct.
  // `any` is insurance.

  /** Main overlay ref */
  readonly mainOv: any;

  /** Main pane ID */
  readonly mainPaneId: number;

  /** Create a subset of timeseries */
  filter(data: Data, range: any, offset?: number): DataView$;

  /** Get all active panes (with UUID) */
  panes(): Pane[];

  /** Get overlay ref by paneId & ovId */
  overlay(paneId: number, ovId: number): Overlay; // returns a single overlay?

  /** Get overlaya data by paneId & ovId */
  ovData(paneId: number, ovId: number): OverlayData;

  /** Get overlay data subset by paneId & ovId */
  ovDataSubset(paneId: number, ovId: number): OverlayDataSubset;

  /** Get All overlays */
  allOverlays(type: any): Overlay[];
}
