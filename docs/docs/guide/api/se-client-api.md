
# SE Client API

Script Engine Client API.

## se.uploadData()

- **Type:** `async` `function`
- **Returns:** `Promise`
- **Related:** [Indicator Scripts](/guide/navy-js/indicator-scripts.html)

Uploads all data into the Script Engine.

## se.updateData()

- **Type:** `async` `function`
- **Returns:** `Promise`
- **Related:** [Indicator Scripts](/guide/navy-js/indicator-scripts.html)

Updates data in the Script Engine. Sends two last candles, performs an update of overlays.

When you are receiving new price data through live stream, you need to call this periodically:

```js
async function update() {
    await chart.se.updateData()
    var delay  = 100 // Update rate
    setTimeout(update, delay)
}
```

## se.execScripts()

- **Type:** `async` `function`
- **Returns:** `Promise`
- **Related:** [Indicator Scripts](/guide/navy-js/indicator-scripts.html)

Sends and executes all scripts in the Script Engine.

## se.uploadAndExec()

- **Type:** `async` `function`
- **Returns:** `Promise`
- **Related:** [Indicator Scripts](/guide/navy-js/indicator-scripts.html)

Performs `se.updateData()` and `se.execScripts()` together.

If you updated the main dataset and also have indicator scripts in your data structure it is necessary to call this function to update the scripts:

```js
chart.hub.mainOv.data.unshift(newChunk)
chart.se.uploadAndExec()
```
