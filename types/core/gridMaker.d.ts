export default GridMaker;
declare function GridMaker(id: any, specs: any, mainGrid?: any): {
    create: () => any;
    getLayout: () => {
        tiMap: {};
    };
    setMaxSidebar: (v: any) => any;
    getSidebar: () => any;
    id: () => any;
};
