# KC

Keltner Channels

## Data Format

The indicator requires main overlay in the following format:

```js
[<timestamp>, <open>, <high>, <low>, <close>, <volume>]
```

## How to use

Add a new object with type `KC` to `scripts` array of a selected pane:
```js
// Pane object:
{
    overlays: [], // Non-generated overlays
    scripts: [{
        type: 'KC',
        props: {}, // Script props
        settings: {} // Script settings
    }]
}
```

::: tip
If you don't see the overlay, try to call `chart.se.uploadAndExec()`. This will upload the data to the script engine and execute all scripts.
:::

## KC.length
- **Type:** `integer`
- **Default:** `20`

## KC.mult
- **Type:** `number`
- **Default:** `1`

## KC.trueRange
- **Type:** `boolean`
- **Default:** `true`

## KC.color
- **Type:** `color`
- **Default:** `'#4c8dffab'`

## KC.backColor
- **Type:** `color`
- **Default:** `'#4c8dff0a'`

## KC.prec
- **Type:** `integer`
- **Default:** `autoPrec()`

## KC.zIndex
- **Type:** `integer`
- **Default:** `0`

