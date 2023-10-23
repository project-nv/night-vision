
# Chart API

**Chart API** describes the main chart interface.

::: warning
Some properties are not fully reactive - we are working on this.
:::

<div class="tip custom-block section-split">Chart Properties</div>

Put the following values in the property-object:

```js
let chart = new NightVision('<root-element-id>', {
    /* Property object */
    width: ...,
    height: ...
    // ...
})
```   

## chart.id

- **Type:** `string`
- **Default:** `nvjs`

**Main chart id**. Used as a prefix to all html-indices of the internal elements. If you are creating multiple instances, each of them should get a unique id. See [Multi-chart Example](/guide/intro/10-basic-examples.html#_8-multiple-chart-instances).   

## chart.width

- **Type:** `number`
- **Default:** `750`

**Full chart width**. Measured from the left edge to the right (includes the toolbar and sidebar).  

## chart.height

- **Type:** `number`
- **Default:** `420`

**Full chart height**. Measured from the top edge to the bottom (includes the botbar).  

## chart.autoResize

- **Type:** `boolean`
- **Default:** `false`

Sets the auto-resize mode. This means, the library will track a size of the root-container with `<root-element-id>`. This is useful when you are making a responsive grid of charts.

## chart.colors

- **Type:** `Object`
- **Default:** `{}`

Allows you to overwrite the [default colors](/guide/api/default-colors). For example: `colors: { back: 'gray' }` will change the background color.     

## chart.showLogo

- **Type:** `boolean`
- **Default:** `false`

Show `NV` logo or not

## chart.scripts

- **Type:** `Array` Array of strings
- **Default:** `[]`

User's collection of [NavyJS scripts](/guide/main-comp/scripts.html).   

## chart.data

- **Type:** `Object`
- **Default:** `{}`

**Main dataset**. Should follow a [specific structure](/guide/data-struct/the-top-level.html)

## chart.config

- **Type:** `Object`
- **Default:** `{}`

Allows you to overwrite the [chart config](/guide/api/chart-config). For example: `config: { MAX_ZOOM: 10000 }` will increase a maximum amount of candles the library can display.     

## chart.timezone

- **Type:** `number`
- **Default:** `0`

Shift from UTC, hours.

<div class="tip custom-block section-split next">Internal Variables</div>

Here you can access some internal stuff, e.g.:

```js
console.log(chart.layout)
```

## chart.hub

- **Type:** `DataHub`

A reference to the [DataHub](/guide/main-comp/data-hub.html) instance of this chart. Alternatively, can be accessed through the singleton class:

 ```js
 import { DataHub } from 'night-vision'
 let chart = new NightVision()
 let hub = DataHub.instance(chart.id)
 ```

## chart.meta

- **Type:** `MetaHub`

A reference to the [MetaHub](/guide/main-comp/meta-hub.html) instance of this chart. Alternatively, can be accessed through the singleton class (see [chart.hub](#chart-hub))

## chart.scan

- **Type:** `DataScan`

A reference to the [DataScan](/guide/main-comp/data-scan.html) instance of this chart. Alternatively, can be accessed through the singleton class (see [chart.hub](#chart-hub))

## chart.events

- **Type:** `Events`

A reference to the [Events](/guide/main-comp/events.html) instance of this chart. Alternatively, can be accessed through the singleton class (see [chart.hub](#chart-hub))

## chart.scriptHub

- **Type:** `Scripts`

A reference to the [Scripts](/guide/main-comp/scripts.html) instance of this chart. Alternatively, can be accessed through the singleton class (see [chart.hub](#chart-hub))

## chart.root

- **Type:** `HtmlElement`

Root HTML element of the chart

## chart.comp

- **Type:** `Object`

Main [Svelte](https://svelte.dev/) component

## chart.layout

- **Type**: `Layout`

The [Layout](/guide/main-comp/layout.html) object of the chart. See [Layout API](/guide/api/layout-api.html) for the full description.    

## chart.range

::: warning
May change in the future
:::

- **Type**: `Array` Array of `[<number>, <number>]`

A time range of the visible area of the chart: `[timeStart, timeEnd]`

## chart.cursor

- **Type**: `Cursor`

Chart [Cursor](/guide/main-comp/cursor.html)

<div class="tip custom-block section-split next">Chart Methods</div>

```js
// For example
chart.update()
```

## chart.update(?type, ?opt)

- **Type**: `function`
- **Arguments:**
    - `?type`: `string` Update type, default `layout`
    - `?opt`: `object` Update options, default `{}`

A function that allows you to perform different chart updates:
- **"layout"**
    A regular fast update, re-calculating the [Layout](/guide/main-comp/layout.html) & triggering renderers.
- **"data"** 
    An update to be used when the overlay data changes (if the length, timestamp sequence changes).  
- **"full"**
    A full update, resetting [pane & overlay](/guide/data-struct/the-top-level) structure. Slower than the previous.
- **"grid"**
    An update re-making grids (rebuilding the layers and the renderer list). Optionally can by sent to only one grid: `"grid-0"`
- **"legend"**
    A legend update. Optionally can by sent to only one legend: `"legend-1"`

## chart.fullReset

- **Type**: `function`

A full update that also resets the time-range. Equivalent of:

```js
chart.update('full', {resetRange: true})
```

## chart.goto

- **Type**: `function`

Go to time/index (depending on the mode). 

```js
chart.goto(new Date().getTime()) // Warp into now
```

## chart.scroll

- **Type**: `function`

Scrolls the chart on one interval forward. Useful when you add a new candle. 

## chart.destroy 

- **Type**: `function`

Destroys the chart instance and cleans up all event listeners. 
