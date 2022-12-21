# ALMA

Arnaud Legoux Moving Average

## Data Format

The indicator requires main overlay in the following format:

```js
[<timestamp>, <open>, <high>, <low>, <close>, <volume>]
```

## How to use

Add a new object with type `ALMA` to `scripts` array of a selected pane:
```js
// Pane object:
{
    overlays: [], // Non-generated overlays
    scripts: [{
        type: 'ALMA',
        props: {}, // Script props
        settings: {} // Script settings
    }]
}
```

::: tip
If you don't see the overlay, try to call `chart.se.uploadAndExec()`. This will upload the data to the script engine and execute all scripts.
:::

## ALMA.length
- **Type:** `integer`
- **Default:** `10`

## ALMA.offset
- **Type:** `number`
- **Default:** `0.9`

## ALMA.sigma
- **Type:** `number`
- **Default:** `5`

## ALMA.color
- **Type:** `color`
- **Default:** `'#559de0'`

## ALMA.prec
- **Type:** `integer`
- **Default:** `autoPrec()`

## ALMA.zIndex
- **Type:** `integer`
- **Default:** `0`

