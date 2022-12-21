# MACD

Moving Average Convergence/Divergence

## Data Format

The indicator requires main overlay in the following format:

```js
[<timestamp>, <open>, <high>, <low>, <close>, <volume>]
```

## How to use

Add a new object with type `MACD` to `scripts` array of a selected pane:
```js
// Pane object:
{
    overlays: [], // Non-generated overlays
    scripts: [{
        type: 'MACD',
        props: {}, // Script props
        settings: {} // Script settings
    }]
}
```

::: tip
If you don't see the overlay, try to call `chart.se.uploadAndExec()`. This will upload the data to the script engine and execute all scripts.
:::

## MACD.fast
- **Type:** `integer`
- **Default:** `12`

## MACD.slow
- **Type:** `integer`
- **Default:** `26`

## MACD.smooth
- **Type:** `integer`
- **Default:** `9`

## MACD.colorMacd
- **Type:** `color`
- **Default:** `'#3782f2'`

## MACD.colorSignal
- **Type:** `color`
- **Default:** `'#f48709'`

## MACD.colorUp
- **Type:** `Color`
- **Default:** `'#35a776'`

## MACD.colorDw
- **Type:** `Color`
- **Default:** `'#e54150'`

## MACD.colorSemiUp
- **Type:** `Color`
- **Default:** `'#79e0b3'`

## MACD.colorSemiDw
- **Type:** `Color`
- **Default:** `'#ea969e'`

## MACD.prec
- **Type:** `integer`
- **Default:** `autoPrec()`

## MACD.zIndex
- **Type:** `integer`
- **Default:** `0`

