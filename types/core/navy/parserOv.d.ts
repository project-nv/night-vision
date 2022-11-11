export default class ParserOV {
    constructor(tagProps: any, src: any);
    tagProps: {};
    src: any;
    flags: string;
    parseTagProps(src: any): {};
    parseBody(): void;
    prefab: Function;
    prepFuncions1(code: any): string;
    prepFuncions2(code: any): string;
    prepFuncions3(code: any): string;
    parseFlags(name: any, fargs: any, block: any): void;
    wrapTheCode(code: any, flags: any): Function;
}
