# SMA

Simple Moving Average

## Data Format

The indicator requires main overlay in the following format:

```js
[<timestamp>, <open>, <high>, <low>, <close>, <volume>]
```

## How to use

Add a new object with type `SMA` to `scripts` array of a selected pane:
```js
// Pane object:
{
    overlays: [], // Non-generated overlays
    scripts: [{
        type: 'SMA',
        props: {}, // Script props
        settings: {} // Script settings
    }]
}
```

::: tip
If you don't see the overlay, try to call `chart.se.uploadAndExec()`. This will upload the data to the script engine and execute all scripts.
:::

## SMA.length
- **Type:** `integer`
- **Default:** `12`

## SMA.color
- **Type:** `color`
- **Default:** `'#d1385c'`

## SMA.prec
- **Type:** `integer`
- **Default:** `autoPrec()`

## SMA.zIndex
- **Type:** `integer`
- **Default:** `0`

