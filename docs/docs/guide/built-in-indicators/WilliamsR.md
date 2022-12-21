# WilliamsR

Williams %R

## Data Format

The indicator requires main overlay in the following format:

```js
[<timestamp>, <open>, <high>, <low>, <close>, <volume>]
```

## How to use

Add a new object with type `WilliamsR` to `scripts` array of a selected pane:
```js
// Pane object:
{
    overlays: [], // Non-generated overlays
    scripts: [{
        type: 'WilliamsR',
        props: {}, // Script props
        settings: {} // Script settings
    }]
}
```

::: tip
If you don't see the overlay, try to call `chart.se.uploadAndExec()`. This will upload the data to the script engine and execute all scripts.
:::

## WilliamsR.length
- **Type:** `integer`
- **Default:** `14`

## WilliamsR.upperBand
- **Type:** `number`
- **Default:** `-20`

## WilliamsR.lowerBand
- **Type:** `number`
- **Default:** `-80`

## WilliamsR.color
- **Type:** `color`
- **Default:** `'#0980e8'`

## WilliamsR.backColor
- **Type:** `color`
- **Default:** `'#9b9ba316'`

## WilliamsR.bandColor
- **Type:** `color`
- **Default:** `'#535559'`

## WilliamsR.prec
- **Type:** `integer`
- **Default:** `autoPrec()`

## WilliamsR.zIndex
- **Type:** `integer`
- **Default:** `0`

