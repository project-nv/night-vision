# ROC

Rate of Change

## Data Format

The indicator requires main overlay in the following format:

```js
[<timestamp>, <open>, <high>, <low>, <close>, <volume>]
```

## How to use

Add a new object with type `ROC` to `scripts` array of a selected pane:
```js
// Pane object:
{
    overlays: [], // Non-generated overlays
    scripts: [{
        type: 'ROC',
        props: {}, // Script props
        settings: {} // Script settings
    }]
}
```

::: tip
If you don't see the overlay, try to call `chart.se.uploadAndExec()`. This will upload the data to the script engine and execute all scripts.
:::

## ROC.length
- **Type:** `integer`
- **Default:** `9`

## ROC.color
- **Type:** `color`
- **Default:** `'#279fc4'`

## ROC.prec
- **Type:** `integer`
- **Default:** `autoPrec()`

## ROC.zIndex
- **Type:** `integer`
- **Default:** `0`

