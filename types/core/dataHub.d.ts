import { Data, Overlay, OverlayData, OverlayDataSubset, Pane } from "../types";
import DataView$ from "./dataView";

// TODO: add method doc strings
// TODO: fix any
export interface DataHub {
  filter(data: Data, range: any, offset?: number): DataView$;

  panes(): Pane[];

  overlay(paneId: number, ovId: number): Overlay; // returns a single overlay?

  ovData(paneId: number, ovId: number): OverlayData;

  ovDataSubset(paneId: number, ovId: number): OverlayDataSubset;

  allOverlays(): Overlay[];
}
