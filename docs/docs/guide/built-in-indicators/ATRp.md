# ATRp

Average True Range, percentage

## Data Format

The indicator requires main overlay in the following format:

```js
[<timestamp>, <open>, <high>, <low>, <close>, <volume>]
```

## How to use

Add a new object with type `ATRp` to `scripts` array of a selected pane:
```js
// Pane object:
{
    overlays: [], // Non-generated overlays
    scripts: [{
        type: 'ATRp',
        props: {}, // Script props
        settings: {} // Script settings
    }]
}
```

::: tip
If you don't see the overlay, try to call `chart.se.uploadAndExec()`. This will upload the data to the script engine and execute all scripts.
:::

## ATRp.length
- **Type:** `integer`
- **Default:** `15`

## ATRp.color
- **Type:** `color`
- **Default:** `'#f44336'`

## ATRp.prec
- **Type:** `integer`
- **Default:** `autoPrec()`

## ATRp.zIndex
- **Type:** `integer`
- **Default:** `0`

