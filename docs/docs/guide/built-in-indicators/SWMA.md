# SWMA

Symmetrically Weighted Moving Average

## Data Format

The indicator requires main overlay in the following format:

```js
[<timestamp>, <open>, <high>, <low>, <close>, <volume>]
```

## How to use

Add a new object with type `SWMA` to `scripts` array of a selected pane:
```js
// Pane object:
{
    overlays: [], // Non-generated overlays
    scripts: [{
        type: 'SWMA',
        props: {}, // Script props
        settings: {} // Script settings
    }]
}
```

::: tip
If you don't see the overlay, try to call `chart.se.uploadAndExec()`. This will upload the data to the script engine and execute all scripts.
:::

## SWMA.color
- **Type:** `color`
- **Default:** `'#e57440'`

## SWMA.prec
- **Type:** `integer`
- **Default:** `autoPrec()`

## SWMA.zIndex
- **Type:** `integer`
- **Default:** `0`

