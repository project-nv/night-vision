
# Layout API

This object you'll find by calling:

```js
console.log(chart.layout)
```

Or in your overlay script:

```js
console.log($core.layout)
```

## layout.main

- **Type:** `undefined`

A reference to the main grid

## layout.grid.scales

- **Type:** `undefined`

Associative array of scales: { A => {...}, ...}

## layout.grid.scaleIndex

- **Type:** `string`

Current main scale index

## layout.grid.sb

- **Type:** `object`

Sidebar widths of this pane `[<left>, <right>]`

## layout.grid.sbMax

- **Type:** `object`

Max sidebar widths over all panes `[<left>, <right>]`

## layout.grid.spacex

- **Type:** `number`

x-space for overlays, px

## layout.grid.pxStep

- **Type:** `number`

Pixel step b/w data points

## layout.grid.startx

- **Type:** `number`

Start of the first data point, px

## layout.grid.tStep

- **Type:** `number`

Time-step

## layout.grid.xs

- **Type:** `object`

x-axis marks (coordinates, values)

## layout.grid.width

- **Type:** `number`

Width of the grid, px

## layout.grid.height

- **Type:** `number`

Height of the grid, px

## layout.grid.settings

- **Type:** `undefined`

Grid settings, see [pane.settings](/guide/data-struct/pane-object.html#pane-settings)

## layout.grid.main

- **Type:** `boolean`

Is it the main grid or not

## layout.grid.id

- **Type:** `number`

Grid id

## layout.grid.$hi

- **Type:** `number`

The higest point of y-range

## layout.grid.$lo

- **Type:** `number`

The lowest point of y-range

## layout.grid.prec

- **Type:** `number`

Grid precision

## layout.grid.A

- **Type:** `number`

A-transform of y-axis

## layout.grid.B

- **Type:** `number`

B-transform of y-axis

## layout.grid.$step

- **Type:** `number`

Value-step (e.g. price)

## layout.grid.ys

- **Type:** `object`

y-axis marks (coordinates, values)

## layout.grid.scaleSpecs

- **Type:** `undefined`

Specs of the current main scale

## layout.grid.offset

- **Type:** `number`

Grid y-offset from the top, px

## layout.botbar.width

- **Type:** `number`

Bottom bar width, px

## layout.botbar.height

- **Type:** `number`

Bottom bar height, px

## layout.botbar.offset

- **Type:** `number`

Bottom bar y-offset, px
