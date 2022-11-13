export default class Mouse {
    constructor(comp: any);
    comp: any;
    map: {};
    listeners: number;
    pressed: boolean;
    x: any;
    y: any;
    t: any;
    y$: any;
    on(name: any, handler: any, dir?: string): void;
    off(name: any, handler: any): void;
    emit(name: any, event: any): void;
}
