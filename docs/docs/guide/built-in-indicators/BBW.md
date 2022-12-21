# BBW

Bollinger Bands Width

## Data Format

The indicator requires main overlay in the following format:

```js
[<timestamp>, <open>, <high>, <low>, <close>, <volume>]
```

## How to use

Add a new object with type `BBW` to `scripts` array of a selected pane:
```js
// Pane object:
{
    overlays: [], // Non-generated overlays
    scripts: [{
        type: 'BBW',
        props: {}, // Script props
        settings: {} // Script settings
    }]
}
```

::: tip
If you don't see the overlay, try to call `chart.se.uploadAndExec()`. This will upload the data to the script engine and execute all scripts.
:::

## BBW.length
- **Type:** `integer`
- **Default:** `21`

## BBW.stddev
- **Type:** `number`
- **Default:** `2`

## BBW.color
- **Type:** `color`
- **Default:** `'#2cc6c9ab'`

## BBW.prec
- **Type:** `integer`
- **Default:** `autoPrec()`

## BBW.zIndex
- **Type:** `integer`
- **Default:** `0`

