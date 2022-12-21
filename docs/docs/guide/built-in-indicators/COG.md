# COG

Center of Gravity

## Data Format

The indicator requires main overlay in the following format:

```js
[<timestamp>, <open>, <high>, <low>, <close>, <volume>]
```

## How to use

Add a new object with type `COG` to `scripts` array of a selected pane:
```js
// Pane object:
{
    overlays: [], // Non-generated overlays
    scripts: [{
        type: 'COG',
        props: {}, // Script props
        settings: {} // Script settings
    }]
}
```

::: tip
If you don't see the overlay, try to call `chart.se.uploadAndExec()`. This will upload the data to the script engine and execute all scripts.
:::

## COG.length
- **Type:** `integer`
- **Default:** `10`

## COG.color
- **Type:** `color`
- **Default:** `'#559de0'`

## COG.prec
- **Type:** `integer`
- **Default:** `autoPrec()`

## COG.zIndex
- **Type:** `integer`
- **Default:** `0`

