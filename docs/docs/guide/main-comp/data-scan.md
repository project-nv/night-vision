
# DataScan <img src="/el.png" style="display: inline-block; margin: 0; width: 32px;" />

**DataScan** a short for **Data Scanner**, is a module for analysing the main datset and tracking its changes. In the current version, it solves a few simple tasks:

- Detects the main interval (time distance b/w points)
- Sets the default time range
- Calculates hashes for panes & overlays (to track changes)

```js
let chart = new NightVision()
console.log(chart.scan)  
```  
