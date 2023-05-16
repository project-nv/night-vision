
# NavyJS API (Overlays)

Core functions and environments for building overlay / indicators.

<div class="tip custom-block section-split">Life Cycle</div>

## init()

Called when overlay is created. Should contain a code that runs **once**, for example adding event listeners:

```js
init() {
    // Add event listener, which should use an unique component id
    $events.on(`rsi-${core.uuid}:some-event`, e => {
        console.log(e)
    })
}
```

## destroy()

Called when overlay is destroyed. Should contain a code that runs **once**, for example removing event listeners:

```js
destroy() {
    // Remove all event listeners of this overlay
    $events.off(`rsi-${core.uuid}`)
}
```

<div class="tip custom-block section-split next">Drawing Functions</div>

## draw(ctx)

- **Arguments:**
    - `ctx`: `Context` Renderer context

Main drawing call handler. Provides a context of the overlay's renderer. This function will be called every time a chart data or view is updated.

::: tip
This handler should be optimized if you want to get a great chart performance. Keep in mind, that in a real charting app it will be called at least 200-300 times per second. There are some tips how to make it faster:
- Use `for (var i = 0; ...)` loop instead of `for (var x of ...)` or `arr.forEach(...)` when iterating through big arrays.
- Limit number of `ctx.beginPath()` calls by combining several primitives into one path
- Draw primitives with the same color **together**. This tip alone increased performance of **Candles** overlay 2X.
:::

```js
// Example of drawing call
draw(ctx) {
    const layout = $core.layout // Grid layout
    ctx.fillStyle = $props.color
    ctx.fillRect(0, 0, layout.width, layout.height)
}
```

## drawSidebar(ctx, side, scale)

- **Arguments:**
    - `ctx`: `Context` Sidebar canvas context
    - `side`: `string` left | right
    - `scale`: `Scale` Scale object of this sidebar

Drawing call of sidebar. The same as [draw()](#draw-ctx), but `ctx` is a CanvasJS context of a sidebar.  

```js
// Example of value tracker drawing call
drawSidebar(ctx, side, scale) {
    for (var tracker of this.trackers || []) {
        sidebar.tracker(
            this.props, this.layout, scale, side, ctx, tracker
        )
    }
}
```

## drawBotbar(ctx)

Drawing call of botbar. [Not implemented yet]

<div class="tip custom-block section-split next">Samplers / transforms</div>

## yRange(?hi, ?lo)

- **Arguments:**
    - `?hi`: `number` Pre-calculated max-value of the data view
    - `?lo`: `number` Pre-calculated min-value of the data view
- **Returns** `array`
    Should return an array containing a new range: `[<high>, <low>]`. Optionally can disable the default range expansion: `[<high>, <low>, false]`


::: tip
If you write this function without arguments, the library will skip the default min-max detection algo:
```js
// Spends CPU:
yRange(hi, lo) => [1, 0]
// Doesn't:
yRange() => [1, 0]
```
:::

Redefines y-range of overlay. See [this](/guide/navy-js/overlay-scripts.html#y-range-function) for more info.

## preSampler(x)

- **Arguments:**
    - `x`: `object` A data point form the overlay's data.
- **Returns** `array`
    Array of numbers for sampling.


Defines a sampler for the precision detection algo. See more information [here](/guide/navy-js/overlay-scripts.html#precision-samplers)

```js
// Code from Candles.navy
preSampler(x) => [x[1], x[4]]
```

## ohlc(x)

- **Arguments:**
    - `x`: `object` A data point form the overlay's data.
- **Returns** `array`
    Array of OHLC values.  

Mapping data point to OHLC value for candle magnets. For example, if you have `Spline` overlay which doesn't have all 4 values, you can emulate them:

```js
// Code from Spline.navy
ohlc(x) => Array(4).fill(x[$props.dataIndex])
```

If you defined `ohlc()` function for your main overlay, you can use this values in other overlays:

```js
// Code from ArrowTrades.navy
for (var i = view.i1, n = view.i2; i <= n; i++) {
    let p = data[i]
    let ohlc = layout.ohlc(p[0]) // Getting OHLC from the data-point
    if (!ohlc) continue
    var y = layout.value2y(ohlc[1]) // High
    // ...
}
```

<div class="tip custom-block section-split next">UI functions</div>

## legend(x, prec)

- **Arguments:**
    - `x`: `object` Data point selected by cursor, e.g. `[<timestamp>, <x1>, <x2>]`
    - `prec`: `number` Pre-calculated data precision
- **Returns** `array`
    Array of `[value, color]` pairs.

Defines legend as `[value, color]` pairs. [More Info](/guide/navy-js/overlay-scripts.html#custom-legend).
To hide the legend line return `null`. 

## legendHtml(x, prec, formatter)

- **Arguments:**
    - `x`: `object` Data point selected by cursor, e.g. `[<timestamp>, <x1>, <x2>]`
    - `prec`: `number` Pre-calculated data precision
    - `formatter`: `function` Default number formatter
- **Returns** `string`
    HMTL code

Defines legend as a custom HTML. [More Info](/guide/navy-js/overlay-scripts.html#custom-legend).  

## valueTracker(x)

- **Arguments:**
    - `x`: `object` The last data point
- **Returns** `object` Descriptor

![ValueTracker](/v-tracker.png)

Sets price label + price line parameters.

```js
// Code from Candles.navy
valueTracker(x) => {
    show: $props.showValueTracker, // Show the tracker, boolean
    symbol: $props.scaleSymbol, // Symbol label [Not implemented]
    line: $props.priceLine, // Show price line, boolean
    color: $lib.candleColor($props, $core.data[$core.data.length - 1]),
    value: x[4] // Tracker value (candle close)
}
```

<div class="tip custom-block section-split next">Mouse listeners</div>


## mousemove(event)

- **Arguments:**
    - `event`: `Event` Mouse Event

Called when 'mousemove' event is triggered on the grid.

```js
mousemove(event) {
    console.log(event)
}
```

## mouseout(event)

- **Arguments:**
    - `event`: `Event` Mouse Event

Called when 'mouseout' event is triggered on the grid.

## mouseup(event)

- **Arguments:**
    - `event`: `Event` Mouse Event

Called when 'mouseup' event is triggered on the grid.

## mousedown(event)

- **Arguments:**
    - `event`: `Event` Mouse Event

Called when 'mousedown' event is triggered on the grid.

## click(event)

- **Arguments:**
    - `event`: `Event` Mouse Event

Called when 'click' event is triggered on the grid.

<div class="tip custom-block section-split next">Keyboard listeners</div>

## keyup(event)

- **Arguments:**
    - `event`: `Event` Keyboard Event

Called when 'keyup' event is triggered on the grid.

## keydown(event)

- **Arguments:**
    - `event`: `Event` Keyboard Event

Called when 'keydown' event is triggered on the grid.

## keypress(event)

- **Arguments:**
    - `event`: `Event` Keyboard Event

Called when 'keypress' event is triggered on the grid.

<div class="tip custom-block section-split next">Overlay Environment</div>

## $core

Collection of all core elements and other variables.

```js
// Code from Band.navy
draw() {
    // ...
    const data = $core.data
    const view = $core.view
    const layout = $core.layout
    // ...
}
```

### $core.layout <span style="font-weight: 300;">[`Layout`](/guide/main-comp/layout.html#layout) - Grid Layout</span>

### $core.dataSubset <span style="font-weight: 300;">`array` - Visible data subset</span>

### $core.data <span style="font-weight: 300;">`array` - All overlay data</span>

### $core.view <span style="font-weight: 300;">`object` - Current data view</span>

### $core.id <span style="font-weight: 300;">`number` - Overlay sequential id</span>

### $core.paneId <span style="font-weight: 300;">`number` - Pane sequential id</span>

### $core.uuid <span style="font-weight: 300;">`string` - Overlay unique id</span>

### $core.range <span style="font-weight: 300;">`array` - Overlay unique id</span>

### $core.colors <span style="font-weight: 300;">`object` - Chart colors, [Defaults](/guide/api/default-colors.html) </span>

### $core.cursor <span style="font-weight: 300;">`object` - Chart [Cursor](/guide/main-comp/cursor.html#cursor)</span>

### $core.src <span style="font-weight: 300;">`object` - [Overlay Object](/guide/data-struct/overlay-object.html)</span>

### $core.props <span style="font-weight: 300;">`object` - General Chart Props</span>

### $core.indexOffset <span style="font-weight: 300;">`number` - Index Offset of overlay (in index-based mode)</span>

## $props

- **Type:** `object`

Overlay props (`props` field of [OverlayObject](/guide/data-struct/overlay-object.html)). [Read More](/guide/navy-js/overlay-scripts.html#props)

## $events

- **Type:** `object`

[Events](/guide/main-comp/events.html) component.

## $lib

Collection of primitives & helper functions.

### $lib.Candle <span style="font-weight: 300;"> - Draws candle [src](https://github.com/project-nv/night-vision/blob/main/src/core/primitives/navyLib/candle.js)</span>
### $lib.Volbar <span style="font-weight: 300;"> - Draws volume bar [src](https://github.com/project-nv/night-vision/blob/main/src/core/primitives/navyLib/volbar.js)</span>
### $lib.layoutCnv <span style="font-weight: 300;"> - Calculates candle & volume layout [src](https://github.com/project-nv/night-vision/blob/main/src/core/primitives/navyLib/layoutCnvFast.js)</span>
### $lib.formatCash <span style="font-weight: 300;"> - Formats number in the following format, e.g.: `1.2M` [src](https://github.com/project-nv/night-vision/blob/main/src/stuff/utils.js#L466)</span>
### $lib.candleBody <span style="font-weight: 300;"> - Draws candle body fast [src](https://github.com/project-nv/night-vision/blob/main/src/core/primitives/navyLib/candleBody.js)</span>
### $lib.candleWick <span style="font-weight: 300;"> - Draws candle wick fast [src](https://github.com/project-nv/night-vision/blob/main/src/core/primitives/navyLib/candleWick.js)</span>
### $lib.volumeBar <span style="font-weight: 300;"> - Draws volume bar fast [src](https://github.com/project-nv/night-vision/blob/main/src/core/primitives/navyLib/volumeBar.js)</span>
### $lib.fastSma <span style="font-weight: 300;"> - Calculates SMA fast [scr](https://github.com/project-nv/night-vision/blob/main/src/core/primitives/navyLib/helperFns.js#L6)</span>
### $lib.avgVolume <span style="font-weight: 300;"> - Draws average volume fast [src](https://github.com/project-nv/night-vision/blob/main/src/core/primitives/navyLib/avgVolume.js)</span>
### $lib.candleColor <span style="font-weight: 300;"> - Detects candle color [src](https://github.com/project-nv/night-vision/blob/main/src/core/primitives/navyLib/helperFns.js)</span>

<br/><br/>

# NavyJS API (Indicators)

## Indicator Std Functions

See [Script Engine Std Library](/guide/api/se-std-lib.html)

## Indicator Environment


<div class="tip custom-block section-split">Variables available in all sections of a script.</div>

### self

Script Environment of the script: [src](https://github.com/project-nv/night-vision/blob/main/src/core/se/script_env.js).

### ohlcv

Main OHLCV dataset.

### shared

Shared data. You can use it to communicate between scripts:

```js
// First script
[INDICATOR name=Ind1]
[UPDATE]
shared.ts = ema(close, 200)
```

```js
// Second script
[INDICATOR name=Ind2]
[UPDATE]
Spline(shared.ts)
```

To make sure that script are executed in the right order, set an incremental [`execOrder`](/guide/data-struct/script-object.html#script-settings-execorder).

### settings

[Script settings](/guide/data-struct/script-object.html#script-settings).  

### tf

Time-frame of the main dataset. Calculated by [DataScan](/guide/main-comp/data-scan.html), or provided by [user](/guide/data-struct/overlay-object.html#overlay-settings-timeframe).

### range

Current chart range. The same as [this](/guide/api/chart-api.html#chart-range).  

### se

Script Engine reference. [src](https://github.com/project-nv/night-vision/blob/main/src/core/se/script_engine.js)

<div class="tip custom-block section-split">Variables available in the [UPDATE] section of a script.</div>

### iter

Current value of OHLCV data iterator. Starting from `0`, ending at `ohlcv.length - 1`.  

### t

Current value of OHLCV data timestamp. Value equals to `ohclv[iter][0]`.
