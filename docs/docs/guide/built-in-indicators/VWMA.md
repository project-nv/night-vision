# VWMA

Volume Weighted Moving Average

## Data Format

The indicator requires main overlay in the following format:

```js
[<timestamp>, <open>, <high>, <low>, <close>, <volume>]
```

## How to use

Add a new object with type `VWMA` to `scripts` array of a selected pane:
```js
// Pane object:
{
    overlays: [], // Non-generated overlays
    scripts: [{
        type: 'VWMA',
        props: {}, // Script props
        settings: {} // Script settings
    }]
}
```

::: tip
If you don't see the overlay, try to call `chart.se.uploadAndExec()`. This will upload the data to the script engine and execute all scripts.
:::

## VWMA.length
- **Type:** `integer`
- **Default:** `20`

## VWMA.color
- **Type:** `color`
- **Default:** `'#db0670'`

## VWMA.prec
- **Type:** `integer`
- **Default:** `autoPrec()`

## VWMA.zIndex
- **Type:** `integer`
- **Default:** `0`

