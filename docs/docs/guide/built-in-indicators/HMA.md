# HMA

Hull Moving Average

## Data Format

The indicator requires main overlay in the following format:

```js
[<timestamp>, <open>, <high>, <low>, <close>, <volume>]
```

## How to use

Add a new object with type `HMA` to `scripts` array of a selected pane:
```js
// Pane object:
{
    overlays: [], // Non-generated overlays
    scripts: [{
        type: 'HMA',
        props: {}, // Script props
        settings: {} // Script settings
    }]
}
```

::: tip
If you don't see the overlay, try to call `chart.se.uploadAndExec()`. This will upload the data to the script engine and execute all scripts.
:::

## HMA.length
- **Type:** `integer`
- **Default:** `10`

## HMA.color
- **Type:** `color`
- **Default:** `'#3af475'`

## HMA.prec
- **Type:** `integer`
- **Default:** `autoPrec()`

## HMA.zIndex
- **Type:** `integer`
- **Default:** `0`

