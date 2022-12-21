# ATR

Average True Range

## Data Format

The indicator requires main overlay in the following format:

```js
[<timestamp>, <open>, <high>, <low>, <close>, <volume>]
```

## How to use

Add a new object with type `ATR` to `scripts` array of a selected pane:
```js
// Pane object:
{
    overlays: [], // Non-generated overlays
    scripts: [{
        type: 'ATR',
        props: {}, // Script props
        settings: {} // Script settings
    }]
}
```

::: tip
If you don't see the overlay, try to call `chart.se.uploadAndExec()`. This will upload the data to the script engine and execute all scripts.
:::

## ATR.length
- **Type:** `integer`
- **Default:** `15`

## ATR.color
- **Type:** `color`
- **Default:** `'#e52468'`

## ATR.prec
- **Type:** `integer`
- **Default:** `autoPrec()`

## ATR.zIndex
- **Type:** `integer`
- **Default:** `0`

