# MOM

Momentum

## Data Format

The indicator requires main overlay in the following format:

```js
[<timestamp>, <open>, <high>, <low>, <close>, <volume>]
```

## How to use

Add a new object with type `MOM` to `scripts` array of a selected pane:
```js
// Pane object:
{
    overlays: [], // Non-generated overlays
    scripts: [{
        type: 'MOM',
        props: {}, // Script props
        settings: {} // Script settings
    }]
}
```

::: tip
If you don't see the overlay, try to call `chart.se.uploadAndExec()`. This will upload the data to the script engine and execute all scripts.
:::

## MOM.length
- **Type:** `integer`
- **Default:** `11`

## MOM.color
- **Type:** `color`
- **Default:** `'#bcc427ee'`

## MOM.prec
- **Type:** `integer`
- **Default:** `autoPrec()`

## MOM.zIndex
- **Type:** `integer`
- **Default:** `0`

