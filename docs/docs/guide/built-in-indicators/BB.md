# BB

Bollinger Bands

## Data Format

The indicator requires main overlay in the following format:

```js
[<timestamp>, <open>, <high>, <low>, <close>, <volume>]
```

## How to use

Add a new object with type `BB` to `scripts` array of a selected pane:
```js
// Pane object:
{
    overlays: [], // Non-generated overlays
    scripts: [{
        type: 'BB',
        props: {}, // Script props
        settings: {} // Script settings
    }]
}
```

::: tip
If you don't see the overlay, try to call `chart.se.uploadAndExec()`. This will upload the data to the script engine and execute all scripts.
:::

## BB.length
- **Type:** `integer`
- **Default:** `21`

## BB.stddev
- **Type:** `number`
- **Default:** `2`

## BB.color
- **Type:** `color`
- **Default:** `'#2cc6c9ab'`

## BB.backColor
- **Type:** `color`
- **Default:** `'#2cc6c90a'`

## BB.prec
- **Type:** `integer`
- **Default:** `autoPrec()`

## BB.zIndex
- **Type:** `integer`
- **Default:** `0`

