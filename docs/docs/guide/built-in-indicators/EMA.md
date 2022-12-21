# EMA

Exponential Moving Average

## Data Format

The indicator requires main overlay in the following format:

```js
[<timestamp>, <open>, <high>, <low>, <close>, <volume>]
```

## How to use

Add a new object with type `EMA` to `scripts` array of a selected pane:
```js
// Pane object:
{
    overlays: [], // Non-generated overlays
    scripts: [{
        type: 'EMA',
        props: {}, // Script props
        settings: {} // Script settings
    }]
}
```

::: tip
If you don't see the overlay, try to call `chart.se.uploadAndExec()`. This will upload the data to the script engine and execute all scripts.
:::

## EMA.length
- **Type:** `integer`
- **Default:** `12`

## EMA.color
- **Type:** `color`
- **Default:** `'#f7890c'`

## EMA.prec
- **Type:** `integer`
- **Default:** `autoPrec()`

## EMA.zIndex
- **Type:** `integer`
- **Default:** `0`

