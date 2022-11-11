export default class Layer {
    constructor(id: any, name: any, nvId: any);
    id: number;
    nvId: any;
    name: any;
    zIndex: number;
    overlay: any;
    ovSrc: any;
    env: any;
    ctxType: any;
    display: boolean;
    opacity: any;
    update(): void;
}
