import { Data, NightVisionProps } from "./types";

export class NightVision {
  constructor(target: string, props?: NightVisionProps);
  private _data: Data;
  private _scripts: any[];
  hub: any;
  meta: any;
  scan: any;
  events: any;
  scriptHub: any;
  root: HTMLElement;
  comp: any;
  set id(arg: string);
  get id(): string;
  set width(arg: number);
  get width(): number;
  set height(arg: number);
  get height(): number;
  set colors(arg: any); // Typescript cant assign different types for setter arg (string) & getter return type (Color). TODO: find better solution
  get colors(): any;
  set showLogo(arg: boolean);
  get showLogo(): boolean;
  set scripts(arg: any[]); // TODO: Fix any
  get scripts(): any[]; // TODO: Fix any
  set data(arg: Data);
  get data(): Data;
  set config(arg: any[]); //TODO: Fix any
  get config(): any[]; //TODO: Fix any
  set indexBased(arg: boolean);
  get indexBased(): boolean;
  set timezone(arg: number);
  get timezone(): number;
  // Fix these any | null
  //  `| null` is intentional as the getters return `null` if prop doesn't exist.
  get layout(): any | null;
  set range(arg: any | null);
  get range(): any | null;
  set cursor(arg: any | null);
  get cursor(): any | null;
  update(type?: string, opt?: {}): void;
  fullReset(): void;
}
