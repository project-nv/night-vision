// not sure what is internal/external here

export interface Scripts {
  // init(srcs: any): void; // internal ?
  srcLib: any[];
  prefabs: { [key: string]: any };
  parse(): void;
}
