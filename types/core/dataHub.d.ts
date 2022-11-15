import { Data, Overlay, OverlayData, OverlayDataSubset, Pane } from "../types";
import DataView$ from "./dataView";
import { Events } from "./events";

// TODO: add method doc strings
// TODO: fix any
export interface DataHub {
  init(data: Data): void;

  updateRange(range: any): void;

  calcSubset(range: any): void;

  detectMain(): void;

  filter(data: Data, range: any, offset?: number): DataView$;

  panes(): Pane[];

  overlay(paneId: number, ovId: number): Overlay; // returns a single overlay?

  ovData(paneId: number, ovId: number): OverlayData;

  ovDataSubset(paneId: number, ovId: number): OverlayDataSubset;

  allOverlays(): Overlay[];

  onScaleIndex(event: Events): void;

  onDisplayOv(event: Events): void;
}
