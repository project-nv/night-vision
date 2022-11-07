
# DataHub <img src="/el.png" style="display: inline-block; margin: 0; width: 32px;" />

**Datahub** is a container of the main dataset, providing some core functions:

- produces `view` (current visible subset of the data)
- listens to some inner update events (e.g. overlay `display` flag)
- provides helper functions to make data access easier

```js
let chart = new NightVision()
console.log(chart.hub)  
```  

For example, you can use DataHub API to hide all overlays, except the main one:

```js
chart.hub.allOverlays().forEach((x, i) => {
    if (x.main) return; // Except the main
    x.settings.display = false;
});
// Here we have to call one more update
// (for the legend)
chart.update();
chart.update("legend");
```

## Full DataHub API

See [Full DahaHub API](/guide/api/datahub-api)
