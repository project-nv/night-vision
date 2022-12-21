# DMI

Directional Movement Index

## Data Format

The indicator requires main overlay in the following format:

```js
[<timestamp>, <open>, <high>, <low>, <close>, <volume>]
```

## How to use

Add a new object with type `DMI` to `scripts` array of a selected pane:
```js
// Pane object:
{
    overlays: [], // Non-generated overlays
    scripts: [{
        type: 'DMI',
        props: {}, // Script props
        settings: {} // Script settings
    }]
}
```

::: tip
If you don't see the overlay, try to call `chart.se.uploadAndExec()`. This will upload the data to the script engine and execute all scripts.
:::

## DMI.length
- **Type:** `integer`
- **Default:** `15`

## DMI.smooth
- **Type:** `integer`
- **Default:** `15`

## DMI.color1
- **Type:** `color`
- **Default:** `"#ef1360"`

## DMI.color2
- **Type:** `color`
- **Default:** `"#3782f2"`

## DMI.color3
- **Type:** `color`
- **Default:** `"#f48709"`

## DMI.prec
- **Type:** `integer`
- **Default:** `2`

## DMI.zIndex
- **Type:** `integer`
- **Default:** `0`

