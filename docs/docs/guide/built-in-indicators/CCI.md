# CCI

Commodity Channel Index

## Data Format

The indicator requires main overlay in the following format:

```js
[<timestamp>, <open>, <high>, <low>, <close>, <volume>]
```

## How to use

Add a new object with type `CCI` to `scripts` array of a selected pane:
```js
// Pane object:
{
    overlays: [], // Non-generated overlays
    scripts: [{
        type: 'CCI',
        props: {}, // Script props
        settings: {} // Script settings
    }]
}
```

::: tip
If you don't see the overlay, try to call `chart.se.uploadAndExec()`. This will upload the data to the script engine and execute all scripts.
:::

## CCI.length
- **Type:** `integer`
- **Default:** `21`

## CCI.upperBand
- **Type:** `number`
- **Default:** `100`

## CCI.lowerBand
- **Type:** `number`
- **Default:** `-100`

## CCI.color
- **Type:** `color`
- **Default:** `'#e28a3dee'`

## CCI.backColor
- **Type:** `color`
- **Default:** `'#e28a3d11'`

## CCI.bandColor
- **Type:** `color`
- **Default:** `'#999999'`

## CCI.prec
- **Type:** `integer`
- **Default:** `2`

## CCI.zIndex
- **Type:** `integer`
- **Default:** `0`

