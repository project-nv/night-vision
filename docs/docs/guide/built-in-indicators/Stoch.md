# Stoch

Stochastic

## Data Format

The indicator requires main overlay in the following format:

```js
[<timestamp>, <open>, <high>, <low>, <close>, <volume>]
```

## How to use

Add a new object with type `Stoch` to `scripts` array of a selected pane:
```js
// Pane object:
{
    overlays: [], // Non-generated overlays
    scripts: [{
        type: 'Stoch',
        props: {}, // Script props
        settings: {} // Script settings
    }]
}
```

::: tip
If you don't see the overlay, try to call `chart.se.uploadAndExec()`. This will upload the data to the script engine and execute all scripts.
:::

## Stoch.kColor
- **Type:** `color`
- **Default:** `'#3782f2'`

## Stoch.dColor
- **Type:** `color`
- **Default:** `'#f48709'`

## Stoch.bandColor
- **Type:** `color`
- **Default:** `'#535559'`

## Stoch.backColor
- **Type:** `color`
- **Default:** `'#381e9c16'`

## Stoch.upperBand
- **Type:** `number`
- **Default:** `80`

## Stoch.lowerBand
- **Type:** `number`
- **Default:** `20`

## Stoch.kColor
- **Type:** `color`
- **Default:** `'#3782f2'`

## Stoch.dColor
- **Type:** `color`
- **Default:** `'#f48709'`

## Stoch.prec
- **Type:** `integer`
- **Default:** `2`

## Stoch.zIndex
- **Type:** `integer`
- **Default:** `0`

