
# MetaHub <img src="/el.png" style="display: inline-block; margin: 0; width: 32px;" />

**MetaHub** is a place for meta information about panes and overlays. By *meta* we understand a properties that specify the exact way we want to render stuff. The MetaHub listens to events emitted by layers and stores that information. The layout-building algorithms then uses this info to adjust the output.

Here are some categories, stored in MetaHub:

- Legend Functions
- Y-Transforms
- Precision Samplers
- Y-Rrange Functions

```js
let chart = new NightVision()
console.log(chart.meta)  
```  

## Legend Functions

*Legend Function* - is a custom legend formatter, allowing you to present selected data points in a specific format. There are two types of these functions:

- `legend()` - returns an array of `[value, color]` pairs
- `legendHtml()` - returns your own HTML markup

As we saw in the [Custom Overlays](/guide/intro/10-basic-examples.html#_7-custom-overlays) example, the legend functions are defined inside  `.navy` scripts. Here is another example, this time with `legendHtml()`:

<iframe src="https://codesandbox.io/embed/metahub-html-legend-c45ows?fontsize=14&hidenavigation=1&module=%2Fmain.js&theme=dark"
     style="width:100%; height:490px; border:0; border-radius: 8px; overflow:hidden;"
     title="metahub-html-legend"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

```js
// HTML legend formatter
// x represents one data item e.g. [<time>, <value>]
// prec - current scale precision
// f - default number formatter
legendHtml(x, prec, f) => `
    <style>
    .custom-html-legend {
        background-color: ${gradient(x[1])};
        padding: 1px 3px;
        border-radius: 3px;
        color: black;
        font-weight: bold;
    }
    </style>
    <span style="margin: 0px 3px;">DOINK</span>
    <span class="custom-html-legend">
        ${f(x[1])}
    </span>
`
```

You can disable legend line by returning `null` from `legend()` function:

```js
legend() => null
```


## Y-Transforms

An `Y-transform` is created when you make a mouse drag on the sidebar. This means you requested a custom Y-range range for a particular scale. Double-clicking will reset the y-range to the default `auto` state and set the corresponding transform to `null`.

You'll find all current y-transforms in `chart.mata.yTransforms`:

```js
// Example of yTransforms: Array(gridId => yTransform)
[
  { // Grid 0
    A: {
      gridId: 0,
      scaleId: 'A',
      zoom: 0.4821428571428571,
      auto: false,
      range: [
        6.562853703703704,
        3.6926462962962967
      ],
      drugging: false,
      updateLayout: true
    }
  },
  // ... other Grids
]
```

## Precision Samplers

By default the library detects an overlay data precision automatically (by selecting a number with the most digits after the point). However, if you have some exotic data format, where each item is not an array of numbers but a nested structure, you'll need to set a **precision sampler**.

This is a function returning a number that will be used by the auto-detection algo:

```js
// Example of an "exotic" data format
[
    [1648400400000, { price: 100.1, currency: '$' }],
    [1648404000000, { price: 100.2, currency: '$' }],
    [1648407600000, { price: 99.99, currency: '$' }],    
    // ...
]
```

```js
// Precision sampler, defined in an overlay script
preSampler(x) => x.price
```

Detected precision will be: `2`. This number can be found in `chart.meta.autoPrecisions`.

::: info
If you want to set a custom precision, you can do it on two levels: in `Overlay.settings` and `Pane.settings.scale`:
```js
// Overlay precision
{
    settings: {
        precision: 1
    }
}

// Scale precision (overwrites all overlay precisions)
{
    settings: {
        scale: {
            name: 'A',
            precision: 1
        }
    }
}
```
:::


## Y-Range Functions

Sometimes you need to set a y-range that is different from the auto-detected one or totally unrelated to the data. The solution is to define a custom `yRange` function:

```js
// Totally new range
yRange() => [100, 0] // [upper limit, lower limit]

// Modification of the auto-detected range
yRange(hi, lo) => [hi * 1.1, lo * 0.9]

// The library expands the range by 5% (by default)
// To disable this, set the third element to 'false'
yRange(hi, lo) => [hi, lo, false]
```
