export default class Cursor {
    xSync(hub: any, layout: any, props: any, update: any): Cursor;
    x: any;
    xValues(hub: any, layout: any, props: any): Cursor;
    t: any;
    values: any;
    yValues(layout: any): void;
    scales: {};
    quantizeTime(hub: any, layout: any, props: any): void;
    y2value(y: any, scale: any): number;
    getValue(paneId: any, ovId: any): any;
    hide(): void;
    visible: boolean;
}
