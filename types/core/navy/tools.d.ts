declare namespace _default {
    export { maskStrings };
    export { unmaskStrings };
    export { findStrings };
    export { maskRegex };
    export { decomment };
    export { findClosingBracket };
}
export default _default;
declare function maskStrings(src: any, file: any): any;
declare function unmaskStrings(src: any, file: any): any;
declare function findStrings(src: any, file: any): number[][];
declare function maskRegex(src: any, f?: typeof btoa): any;
declare function decomment(src: any, file: any): any;
declare function findClosingBracket(src: any, startPos: any, file: any, btype?: string): any;
