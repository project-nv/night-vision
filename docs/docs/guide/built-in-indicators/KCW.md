# KCW

Keltner Channels Width

## Data Format

The indicator requires main overlay in the following format:

```js
[<timestamp>, <open>, <high>, <low>, <close>, <volume>]
```

## How to use

Add a new object with type `KCW` to `scripts` array of a selected pane:
```js
// Pane object:
{
    overlays: [], // Non-generated overlays
    scripts: [{
        type: 'KCW',
        props: {}, // Script props
        settings: {} // Script settings
    }]
}
```

::: tip
If you don't see the overlay, try to call `chart.se.uploadAndExec()`. This will upload the data to the script engine and execute all scripts.
:::

## KCW.length
- **Type:** `integer`
- **Default:** `20`

## KCW.mult
- **Type:** `number`
- **Default:** `1`

## KCW.trueRange
- **Type:** `boolean`
- **Default:** `true`

## KCW.color
- **Type:** `color`
- **Default:** `'#4c8dffab'`

## KCW.backColor
- **Type:** `color`
- **Default:** `'#4c8dff0a'`

## KCW.prec
- **Type:** `integer`
- **Default:** `autoPrec()`

## KCW.zIndex
- **Type:** `integer`
- **Default:** `0`

