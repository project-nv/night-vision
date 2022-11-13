export default class Parser {
    constructor(src: any, name?: string);
    version: number;
    src: string;
    scriptName: string;
    scriptVers: string | number;
    scriptTag: string | number;
    overlays: any[];
    scripts: any[];
    navyVers(): (string | number)[];
    overlayTags(): void;
}
