export default class Keys {
    constructor(comp: any);
    comp: any;
    map: {};
    listeners: number;
    keymap: {};
    on(name: any, handler: any): void;
    emit(name: any, event: any): void;
    pressed(key: any): any;
}
