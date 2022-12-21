# Ribbon

Exponential Moving Average Ribbon

## Data Format

The indicator requires main overlay in the following format:

```js
[<timestamp>, <open>, <high>, <low>, <close>, <volume>]
```

## How to use

Add a new object with type `Ribbon` to `scripts` array of a selected pane:
```js
// Pane object:
{
    overlays: [], // Non-generated overlays
    scripts: [{
        type: 'Ribbon',
        props: {}, // Script props
        settings: {} // Script settings
    }]
}
```

::: tip
If you don't see the overlay, try to call `chart.se.uploadAndExec()`. This will upload the data to the script engine and execute all scripts.
:::

## Ribbon.start
- **Type:** `integer`
- **Default:** `10`

## Ribbon.number
- **Type:** `integer`
- **Default:** `5`

## Ribbon.step
- **Type:** `integer`
- **Default:** `10`

## Ribbon.colors
- **Type:** `array`
- **Default:** `["#3aaaf4ee"]`

## Ribbon.prec
- **Type:** `integer`
- **Default:** `autoPrec()`

## Ribbon.zIndex
- **Type:** `integer`
- **Default:** `0`

