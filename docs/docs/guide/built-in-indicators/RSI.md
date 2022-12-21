# RSI

Relative Strength Index

## Data Format

The indicator requires main overlay in the following format:

```js
[<timestamp>, <open>, <high>, <low>, <close>, <volume>]
```

## How to use

Add a new object with type `RSI` to `scripts` array of a selected pane:
```js
// Pane object:
{
    overlays: [], // Non-generated overlays
    scripts: [{
        type: 'RSI',
        props: {}, // Script props
        settings: {} // Script settings
    }]
}
```

::: tip
If you don't see the overlay, try to call `chart.se.uploadAndExec()`. This will upload the data to the script engine and execute all scripts.
:::

## RSI.length
- **Type:** `integer`
- **Default:** `14`

## RSI.color
- **Type:** `color`
- **Default:** `'#3399ff'`

## RSI.prec
- **Type:** `integer`
- **Default:** `2`

## RSI.zIndex
- **Type:** `integer`
- **Default:** `0`

