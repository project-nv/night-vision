import { DataHub } from "./core/dataHub";
import { DataScanner } from "./core/dataScanner";
import { Events } from "./core/events";
import { MetaHub } from "./core/metaHub";
import { Scripts } from "./core/scripts";
import { ColorsObj, ChartConfig, Data, NightVisionProps } from "./types";

export class NightVision {
  constructor(target: string, props?: NightVisionProps);
  private _data: Data;
  private _scripts: string[];
  hub: DataHub;
  meta: MetaHub;
  scan: DataScanner;
  events: Events; // TODO: improve method param types
  scriptHub: Scripts;
  root: HTMLElement;
  comp: any;

  /** Unique html id */
  set id(arg: string);
  get id(): string;

  /** Width of the chart */
  set width(arg: number);
  get width(): number;

  /** Height of the chart */
  set height(arg: number);
  get height(): number;

  /** Colors (modify specific colors) */
  set colors(arg: ColorsObj);
  get colors(): ColorsObj;

  /** Show NightVision logo */
  set showLogo(arg: boolean);
  get showLogo(): boolean;

  /** User-defined scripts */
  set scripts(arg: any[]); // TODO: Fix any
  get scripts(): any[]; // TODO: Fix any

  /** Chart data */
  set data(arg: Data);
  get data(): Data;

  /** Overwrites the default values */
  set config(arg: ChartConfig[]); //TODO: Fix any
  get config(): ChartConfig[]; //TODO: Fix any

  /** Index-based mode of rendering (for stocks) */
  set indexBased(arg: boolean);
  get indexBased(): boolean;

  /** Timezone (Offset from UTC in hours) */
  set timezone(arg: number);
  get timezone(): number;

  // Fix these any | null
  //  `| null` is intentional as the getters return `null` if prop doesn't exist.

  /** Get the chart layout */
  get layout(): any | null;

  /** Time (or index) range  that is currently visible */
  set range(arg: any | null);
  get range(): any | null;

  /** Chart cursor object (crosshair) */
  set cursor(arg: any | null);
  get cursor(): any | null;

  /** Various updates of the chart */
  // TODO: maybe add a full list of updates here?
  update(type?: string, opt?: {}): void;

  /** Reset the chart with the range */
  fullReset(): void;
}
