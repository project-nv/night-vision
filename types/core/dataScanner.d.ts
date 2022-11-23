import { Overlay } from "../types";
import { DataHub } from "./dataHub";

export interface DataScanner {
  readonly props: { [key: string]: any };

  readonly hub: DataHub;

  readonly all: Overlay[];

  readonly main: Overlay;

  readonly tf: number;

  readonly interval: number;

  readonly ibMode: boolean;

  /** Range shown on chart start up */
  defaultRange(): number;
}
