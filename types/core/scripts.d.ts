export interface Scripts {
  init(srcs: any): void;
  srcLib: any[];
  prefabs: { [key: string]: any };
  parse(): void;
}
