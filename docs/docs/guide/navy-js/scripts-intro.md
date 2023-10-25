
![Navy JS Banner](/navy-js.png)

# Navy JS

::: warning
NightVision is currently in an active development state, the API is not finalized. However, it is already suitable for displaying candlestick / time-series data and using simple TA scripts.
:::

::: info 
To use `.navy` files in your projects, you need to add [vite-raw-plugin.js](https://github.com/project-nv/night-vision/blob/a089ce451f5226b0c5e1c39435cc50ff9c5d3842/vite/vite-raw-plugin.js#L1) to import scripts as text. If you don't use Vite, replace it with something similar.  
:::

If you want to stand out from the crowd of other chart technicians (aka adepts of TA), this section is definitely for you. With **navy** scripts you can implement almost any charting idea.

**99% of libraries and services limit your ability to produce new and unique stuff.** For example, TradngView has **PINE** script, which provides an easy way to display various mathematical functions. However, it lacks the ability to create custom overlays (you have a predefined set of primitives).

**NavyJS** provides both a scripting system, similar to **PINE** and custom overlays, implemented with **CanvasJS** api. You can define them in one script:


```js
// Navy ~ 0.2-lite

[OVERLAY name=Spline, ctx=Canvas, version=1.0.0]

// Define new props
prop('color', { type: 'color', def: '#31ce31' })

draw(ctx) {
    // Here you draw the data with CanvasJS API
}

[INDICATOR name=SMA, version=1.0.0]

// Here you init the script, add props (optionally)

[UPDATE]

// Adds a new point to the Spline overlay data
Spline(sma(close, 20), { color: '#999' })
```    

## How Scripts Work

To create a script you need to add a new [Script Object](/guide/data-struct/script-object.html) to `scripts` array of the pane:

```js
// Pane object (BEFORE execution)
{
    overlays: [],
    scripts: [{
        type: 'RSI',
        props: {
            length: 28,
            zIndex: 1
        }
    }]
}
```  

::: info
`type` should be present in the scripts library, if you are using a custom indicator you should provide its `.navy` source to the chart:
```js
let chart = new NightVision('<root-el>', {
    scripts: [
        `
            [INDICATOR type=RSI]
            // ...
            [UPDATE]
            // ...
        `,
        // ...
    ]
})
```
:::

Then when you call `chart.se.uploadAndExec()` **OHLCV** data and all scripts will be uploaded to the script engine, which will return new overlays back. You can define where to place overlay and how it should look by setting the corresponding props inside the script.

The result will look something like this:

```js
// Pane object (AFTER execution)
{
    overlays: [{
        name: 'RSI, 14',
        type: 'RSI',
        prod: '53458739485793845', // Uuid of the script (producer)
        props: {
            color: 'purple' // Prop defined by the script
        },
        settings: {}
    }],
    scripts: [{
        type: 'RSI',
        uuid: '53458739485793845',
        props: {
            length: 28,
            zIndex: 1
        }
    }]
}
```  

The engine also supports real-time updates.   

## Script Engine (SE)

**Script engine** is a time-series TA engine that allows to run multiple scripts in parallel.
