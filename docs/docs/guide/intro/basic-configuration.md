
# Basic Configuration

## The Chart Instance

When you call `new NightVision()`, you create the main component written in Svelte and get its pure-js wrapper:

```js
import NightVision from 'night-vision'

let chart = new NightVision('<root-element-id>', {
    /* Main component props */
})
```

## Main props

The main props define how the chart will look and optionally can include a data object and user scripts:

```js
let chart = new NightVision('root', {
    width: 800,
    height: 420,
    colors: { back: 'navy' },
    scripts: [], // Overlay / indicator scripts
    chartConfig: {}, // Rewrites chart constants
    data: {}, // Main data object
    // ... (more options)
})
```   

When you assign a new value to any of the props, the engine automatically updates the internal state and re-renders the chart if necessary.

```js
chart.data = data() // Automatically resets the data
```

However, if you change a nested structure of a prop (e.g. `data`), you'll need to call `update()` method:

```js
chart.data = data()
chart.data.panes.pop() // Remove the pane
chart.update() // Update the changes
```

## Full chart API

You can find the full list of chart props and methods in [Chart API](/guide/api/chart-api)
