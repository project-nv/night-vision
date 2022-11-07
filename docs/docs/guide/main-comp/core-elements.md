
# Core Elements

From the beginning, the library was designed to be very hackable. That's why you can access almost all internal parts of the library through the chart wrapper. The most important of them are:

- [DataHub](./data-hub) - Main data wrapper
- [Layout](./layout) - Info how grids & scales will look  
- [Scripts](./scripts) - NavyJs script collection
- [MetaHub](./meta-hub) - Meta info about grids & scales
- [DataScan](./data-scan) - Meta info about the main data
- [Cursor](./cursor) - Current cursor position & values
- [Events](./events) - Event Hub

`DataHub`, `Scripts`, `MetaHub`, `DataScan` and `Events` are implemented using the *singleton* pattern and can be imported anywhere in your app (useful for interaction between chart instances).  

## Accessing Core Elements

A new `NightVision` object will include references to all core elements:

```js
let chart = new NightVision()

let panes = chart.hub.panes()
let x = chart.cursor
//...
chart.events.emit('update-layout')

```

::: tip
It is very useful to make a global reference to the `chart` object in your test app. It will allow you to easily access all internal components through the developer-tools console:
```js
window.chart = chart
> chart.hub
> chart.update()
```
:::

## The Diagram

![my image](/diagram.png#center)  
