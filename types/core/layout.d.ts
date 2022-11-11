export default Layout;
declare function Layout(props: any, hub: any): {
    grids?: undefined;
    main?: undefined;
    botbar?: undefined;
} | {
    grids: any[];
    main: any;
    botbar: {
        width: any;
        height: any;
        offset: number;
        xs: any;
    };
};
