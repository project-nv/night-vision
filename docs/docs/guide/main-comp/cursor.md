
# Cursor <img src="/el.png" style="display: inline-block; margin: 0; width: 32px;" />

**Cursor** keeps current XY-position of the crosshair, time, current scale values and the selected values of overlays (you can see them in the legend).

```js
let chart = new NightVision()
console.log(chart.cursor)  
```  

```js
// Example of a cursor object
{
    visible: true,
    gridId: 0,
    values: [
        [
            [
                1663434000000,
                4.9385
            ]
        ]
    ],
    x: 473.5,
    y: 213,
    scales: {
        A: 5.067736096938775
    },
    t: 1663434000000
}
```

## Syncing multiple cursors

You can set the cursor by assigning a new value, therefore can track a cursor of a different chart:

```js
chart2.events.on("app:$cursor-update", (range) => {
    chart1.cursor = cursor;
});
```

See [Basic Example #8](/guide/intro/10-basic-examples.html#_8-multiple-chart-instances) for the full implementation.

The following are useful methods of the cursor.

## cursor.getValue(paneId, ovId)

- **Type:** `function`
- **Arguments**
    - `paneId`: `number` Pane id
    - `ovId`: `number` Overlay id
- **Returns** `Array` Data element `[<time>, <value1>, ...]`

Returns a specific data value by **Pane id** and **Overlay id**. This is a short-cut for accessing `values`. You can also access them directly:

```js
let value = chart.cursor.values[paneId][overlayId]
```
