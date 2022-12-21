# Ichimoku

Ichimoku Cloud

## Data Format

The indicator requires main overlay in the following format:

```js
[<timestamp>, <open>, <high>, <low>, <close>, <volume>]
```

## How to use

Add a new object with type `Ichimoku` to `scripts` array of a selected pane:
```js
// Pane object:
{
    overlays: [], // Non-generated overlays
    scripts: [{
        type: 'Ichimoku',
        props: {}, // Script props
        settings: {} // Script settings
    }]
}
```

::: tip
If you don't see the overlay, try to call `chart.se.uploadAndExec()`. This will upload the data to the script engine and execute all scripts.
:::

## Ichimoku.convLength
- **Type:** `integer`
- **Default:** `9`

## Ichimoku.baseLength
- **Type:** `integer`
- **Default:** `26`

## Ichimoku.laggingLength
- **Type:** `integer`
- **Default:** `52`

## Ichimoku.displacement
- **Type:** `integer`
- **Default:** `26`

## Ichimoku.cloudUpColor
- **Type:** `color`
- **Default:** `'#79ffde18'`

## Ichimoku.cloudDwColor
- **Type:** `color`
- **Default:** `'#ff246c18'`

## Ichimoku.convColor
- **Type:** `color`
- **Default:** `'#4eb6d8'`

## Ichimoku.baseColor
- **Type:** `color`
- **Default:** `'#d626a1'`

## Ichimoku.laggingColor
- **Type:** `color`
- **Default:** `'#66cc66'`

## Ichimoku.prec
- **Type:** `integer`
- **Default:** `autoPrec()`

## Ichimoku.zIndex
- **Type:** `integer`
- **Default:** `0`

