
# Layout <img src="/el.png" style="display: inline-block; margin: 0; width: 32px;" />

If you could pick the most important thing in the library, it would be the **Layout**. The Layout contains all positions, sizes and markups for building the chart. It consists of three main parts:

- [Grids](#grid) (there could be several of them)
- [Scales](#scale) (actually they defined inside the grids)
- [Botbar](#botbar) (x-axis scale)

Each time when user requests a chart update, a new `Layout` object is created. The algos inside the lib are working very hard to create the best possible view of user data. This includes calculating the grids, scales, precisions and [mapping functions](#mapping-functions).

When a new layout is created, it is passed almost to all places in the library, including renderers, legends and the main interface. You can access it through `chart` reference:

```js
let chart = new NightVision()
console.log(chart.layout)  
```   

## Grid

**Grid** is the main container for overlays. In the layout it represents a math descriptor of a single pane with an x-axis/y-axis scales, sizes and [mapping functions](#mapping-functions). Using the grid object, the library puts the corresponding components in the right places and provides overlay scripts with all necessary information to draw graphics.

```js
// Grid object example
{
    scales: {A: {…}}, // Scales of this grid    
    width: 690,
    height: 392,
    id: 0,
    main: true,
    offset: 0,
    prec: 4,
    pxStep: 5.5157780028854715
    // ...
}
```

A full description can be found in the [Layout API](/guide/api/layout-api.html).

## Scale

Is a descriptor of the y-axis scale. You can switch between the scales and choose how they are displayed (left/right, combined on one side) using a special scale-template. Read how to work with scales [here](/guide/data-struct/pane-object.html#pane-settings-scaletemplate).

```js
// Scale object example
{
    $hi: 5.98425,
    $lo: 4.36575,
    $step: 0.2,
    A: -242.1995675007723, // Components of Y-transform:
    B: 1449.3827618164967, // (A * y + B)
    height: 392,
    prec: 4,
    sb: 60,
    scaleSpecs: {
        id: 'A',
        log: false, // Log scale
        ovIdxs: […]
    },
    ys: […]
}
```

## Botbar

Is the simplest component of the layout, defining the x-axis bar:

```js
// Botbar object example
{
    height: 28,
    offset: 392,
    width: 750,
    xs: […]
}
```

## Mapping Functions

::: warning
This part of the documentation is likely to be rewritten. The API is not finalized yet.   
:::

To display any kind of data on a chart, we need to somehow convert time and price values (in the case of financial data) into screen coordinates. The **mapping functions** do exactly that.

There are several functions, working in different directions (e.g. from `time` to `x-coordinate` and from `x-coordinate` to `time`):

```js
layout.time2x(t) // time -> x
layout.value2y($) // price -> y
layout.y2value(y) // y -> price
layout.x2time(x) // x -> time
// ...
```  

### The problem

We can definitely use `time` as a source of data point positioning. It feels very natural to place events on the time-scale, but there is one problem: in some cases we want to use a `data index` instead. For example, well-known [Renko-chart](https://www.investopedia.com/terms/r/renkochart.asp) can easily include several consecutive candles with **the same timestamp**:

```js
[
    [1584428400000,5300,5325,5300,5325,518.94863323],
    [1584428400000,5325,5350,5325,5350,518.94863323],
    [1584428400000,5350,5375,5350,5375,518.94863323],
    [1584428400000,5375,5400,5375,5400,518.94863323],
    [1584432000000,5375,5375,5350,5350,710.36249024],
    // ...
]
```     

If we use a time-mapping function, we will get all 4 first candles placed at the same x-coordinate, which is totally undesirable.   

### The solution

You could say, why not to use the index-based mapping all the time? This seems like a solid solution for all cases. But here's the catch: **sometimes we need the time-based mapping too**. When you want to plot a sparse data, the only way you can do that is by using time (for example, if you are displaying high-frequency trades).  

As they say, the truth is somewhere in-between. So the solution is to give the library user **both modes**.

*To be continued...*
