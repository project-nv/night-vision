# TSI

True Strength Index

## Data Format

The indicator requires main overlay in the following format:

```js
[<timestamp>, <open>, <high>, <low>, <close>, <volume>]
```

## How to use

Add a new object with type `TSI` to `scripts` array of a selected pane:
```js
// Pane object:
{
    overlays: [], // Non-generated overlays
    scripts: [{
        type: 'TSI',
        props: {}, // Script props
        settings: {} // Script settings
    }]
}
```

::: tip
If you don't see the overlay, try to call `chart.se.uploadAndExec()`. This will upload the data to the script engine and execute all scripts.
:::

## TSI.long
- **Type:** `integer`
- **Default:** `25`

## TSI.short
- **Type:** `integer`
- **Default:** `13`

## TSI.signal
- **Type:** `integer`
- **Default:** `13`

## TSI.color1
- **Type:** `color`
- **Default:** `'#3bb3e4'`

## TSI.color2
- **Type:** `color`
- **Default:** `'#f7046d'`

## TSI.prec
- **Type:** `integer`
- **Default:** `autoPrec()`

## TSI.zIndex
- **Type:** `integer`
- **Default:** `0`

