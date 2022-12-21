# SAR

Parabolic SAR

## Data Format

The indicator requires main overlay in the following format:

```js
[<timestamp>, <open>, <high>, <low>, <close>, <volume>]
```

## How to use

Add a new object with type `SAR` to `scripts` array of a selected pane:
```js
// Pane object:
{
    overlays: [], // Non-generated overlays
    scripts: [{
        type: 'SAR',
        props: {}, // Script props
        settings: {} // Script settings
    }]
}
```

::: tip
If you don't see the overlay, try to call `chart.se.uploadAndExec()`. This will upload the data to the script engine and execute all scripts.
:::

## SAR.start
- **Type:** `number`
- **Default:** `0.02`

## SAR.inc
- **Type:** `number`
- **Default:** `0.02`

## SAR.max
- **Type:** `number`
- **Default:** `0.2`

## SAR.color
- **Type:** `color`
- **Default:** `'#35a9c6'`

## SAR.prec
- **Type:** `integer`
- **Default:** `autoPrec()`

## SAR.zIndex
- **Type:** `integer`
- **Default:** `0`

