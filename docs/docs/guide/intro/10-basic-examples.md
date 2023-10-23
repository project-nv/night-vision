
# 10 Basic Examples

Let's take a little tour into the land of real charting. These examples will demonstrate what this library is capable of. Here are a few of the features:
- **plotting data with different overlays**
- **making custom overlays**
- **integration with Python**
- **displaying real-time charts**

## 1. First real-data chart

Let's be honest, the chart from [Getting Started](/guide/intro/getting-started) page wasn't so real - the data was generated on the spot. What if we have a cryptocurrency dataset? No problem:

<iframe src="https://codesandbox.io/embed/playing-around-1-15lwqr?fontsize=14&hidenavigation=1&module=%2Fmain.js&theme=dark"
     style="width:100%; height:490px; border:0; border-radius: 8px; overflow:hidden;"
     title="playing-around-1"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

::: tip
Btw, you can explore each example app by going into the CodeSandbox's full screen mode. To see the data press `Open Sandbox` button (or move the slider from the left to the right) and select `data-1.json` file.
:::


The dataset, although, should follow a specific format:

```js
{
    // Defines panes (vertical sections of the chart)
    "panes": [
        {
            // Defines overlays (layers of graphics)
            "overlays": [
                {
                    "name": "APE / Tether US",
                    "type": "Spline", // Overlay type
                    "main": true, // Is this the main overlay
                    "data": […], // Time-series: [[<time>, value], …]
                    "settings": {}, // Overlay settings
                    "props": {
                        "color": "orange"
                    }
                }
            ],
            "settings": {}, // Pane settings
        }
    ]
}

```

We will talk about the settings later. The full dataset description can be found in the [Data Structure](/guide/data-struct/the-top-level.html) section.

## 2. Changing overlay type

Well, that wasn't so bad, but it still looks boring. The same data can be displayed with a different overlay type, for example, with `Area` chart:

<iframe src="https://codesandbox.io/embed/playing-around-2-eotc2k?fontsize=14&hidenavigation=1&module=%2Fmain.js&theme=dark"
     style="width:100%; height:490px; border:0; border-radius: 8px; overflow:hidden;"
     title="playing-around-2"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

Now, it does look much better, doesn't it? And all we did was change the overlay type and set some new props:

```js
// The main pane
{
    "overlays": [
        {
            "name": "APE / Tether US",
            "type": "Area", // We are using a different overlay
            "main": true,
            "settings": {},
            "props": {
                "color": "#ba0179", // Setting custom colors
                "back1": "#ba017925",
                "back2": "#bd11db05"
            }
        }
    ]
}
```

In this example we used `Area`, which is a part of the [Built-in overlay collection](/guide/built-in-overlays/Candles) (here you'll find all props and their descriptions)

## 3. Candlestick chart with TA

Now, this is the moment we've all been waiting for! The absolute classic of technical analysis - **Japanese candlestick charts.** This stuff is so good, that it became a de facto standard of financial industry. Here is the same `APE Coin` chart, built from a full **OHLCV** dataset (OHLCV stands for `Open-High-Low-Close-Volume`):    


<iframe src="https://codesandbox.io/embed/playing-around-3-voc5c6?fontsize=14&hidenavigation=1&module=%2Fmain.js&theme=dark"
     style="width:100%; height:490px; border:0; border-radius: 8px; overflow:hidden;"
     title="playing-around-3"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

::: info
All candles are green, isn't that cool? Let's enjoy some night vision vibes before switching to the boring red/green color scheme. Btw, you can set a new color theme by providing `colors` prop:
```js
colors: {
    back: "#1b1b1c",
    grid: "#2e2f3099",
    candleDw: "#0c5b3bff",
    candleUp: "#41a35bff",
    // ...
  }
```
The full list of color can be found in [Chart API](/guide/api/chart-api)
:::

You can notice that there are two hidden overlays. You can hide/show overlays both from `settings` and with the library UI.

```js
// Overlay object
{
    "name": "SMA 1",
    "type": "Spline",
    "data": […],
    "settings": {
        "display": false // Hide the overlay
    },
    "props": {
        "color": "#39f"
    }
}
```  

::: info
**Main overlay** is the one used for grid calculation. You can recognize it by the crown icon <img src="/king.png" style="display: inline-block; margin: 0; width: 16px; margin-top: 10px;" />. You can make any overlay primary by setting `main: true`:
```js
// Pane object
{
    settings: {
        main: true
    }
}
```
Of course, there can be **only one** such overlay.

:::

## 4. Chart updates (low-level API)

Here we try to add/remove one pane and one overlay plus show & hide the overlays. To apply changes we need to call `update()` function. The chart is not fully reactive, but there is a good reason - **performance**. To track all small changes in the data we would have to spend precious CPU-time.

<iframe src="https://codesandbox.io/embed/playing-around-4-j6dxwh?fontsize=14&hidenavigation=1&module=%2Fmain.js&theme=dark"
     style="width:100%; height:490px; border:0; border-radius: 8px; overflow:hidden;"
     title="playing-around-4"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

Here are the button-click handlers form `main.js`:

```js
// Add/remove pane
function onButton1() {
  if (chart.data.panes.length <= 1) {
    chart.data.panes.push({ // Pushing a new pane object
      settings: {},
      overlays: [ovData2]
    });
    // ...
  } else {
    chart.data.panes.pop();
    // ...
  }
  chart.update(); // Need to call to apply changes
}

// Add/remove overlay
function onButton2() {
  let overlays = chart.data.panes[0].overlays;
  if (overlays.length <= 2) {
    overlays.push(ovData1);
    // ...
  } else {
    overlays.pop();
    // ...
  }
  chart.update(); // Need to call to apply changes
}

// Show/hide overlays
function onButton3() {
  // ...
  // Here we are using a helper function of DataHub
  chart.hub.allOverlays().forEach((x, i) => {
    if (i === 0) return; // Except the main
    x.settings.display = flag; // (true/false)
  });
  // IMPORTANT: Here we have to call one more update
  // (for the legend)
  chart.update();
  chart.update("legend");
}
```

The high-level API ([Data API](/guide/api/data-api)), that bundles data updates with the chart updates, will be released soon.

## 5. Displaying Stock data

To be released, see the [Roadmap](#)

## 6. Multiple Scales

Sometimes we need to compare several datasets, placing them on the same pane. But the values can have a different Y-ranges, for example `[0, 1]` and `[0, 100]`. The solution is to use several `Scales`:

<iframe src="https://codesandbox.io/embed/playing-around-6-ekmmsg?fontsize=14&hidenavigation=1&module=%2Fmain.js&theme=dark"
     style="width:100%; height:490px; border:0; border-radius: 8px; overflow:hidden;"
     title="playing-around-5"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

:::tip
By hovering the scale bar with mouse, you can access to the switch between scales, also clicking on the scale bar will set the **main scale**, used by the grid.
:::

You can change a configuration of scales by setting `scaleTemplate` settings:

```js
// Pane object
{
    settings: {
        // Any config: [['A', 'B'], []] or [['A'], ['A']]
        scaleTemplate: [[], ['A', 'B']]
    }
}
```  

```js
// Overlay object
{
    settings: {
        scale: 'B' // Set or create a scale
    }
}
```

To apply the scale settings, you'll need to call `update()`:

```js
// Change scale side
function onButton1() {
    // ...
    if (!template[0].length) {
        settings.scaleTemplate = [["A"], ["B"]];
        //...
    } else {
        settings.scaleTemplate = [[], ["A", "B"]];
        // ...
    }
    chart.update();
}

```

## 7. Custom Overlays

The biggest power of this project comes from the **ability to create custom overlays**. You can express almost any kind of idea, not presented in other charting libraries. Let's create a simple custom overlay using **NavyJS** framework.

<iframe src="https://codesandbox.io/embed/playing-around-7-xyquxe?fontsize=14&hidenavigation=1&module=%2Fmain.js&theme=dark"
     style="width:100%; height:490px; border:0; border-radius: 8px; overflow:hidden;"
     title="playing-around-7"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

To produce this nice chart, you need to add a new script to the chart's collection (see `main.js`):

```js

// Navy ~ 0.2-lite
// ^^^ First comment should provide a NavyJS version

// Meta tag
[OVERLAY name=Custom, ctx=Canvas, author=ChartMaster, version=1.0.0]

// Define new props
// (the same as in 'settings.props' of Overlay object)
prop('radius', {  type: 'number', def: 3 })

// Any variables/constants
const _3Y = 60 * 60 * 24 * 365 * 3 * 1000

// Draw function (called on each update)
// Library provides a lot of useful variables to make
// overlays ($core in the main collection)
draw(ctx) {

    ctx.strokeStyle = $props.back
    ctx.lineWidth = 1
    const layout = $core.layout
    const data = $core.data // Full dataset
    const view = $core.view // Visible view
    const radius = $props.radius

    for (var i = view.i1, n = view.i2; i <= n; i++) {
        ctx.beginPath()
        let p = data[i]
        // Mapping function used to transform values into
        // coordinates
        let x = layout.time2x(p[0])
        let y = layout.value2y(p[1])
        ctx.fillStyle = gradient(p[1])
        ctx.arc(x, y, radius, 0, Math.PI * 2, false)
        ctx.fill()
    }
}

// Make a gradient depending on the y-value
gradient(val) {
    let lo = $core.layout.$lo * 1.01
    let hi = $core.layout.$hi * 0.99
    let pos = (val - lo) / (hi - lo)
    let h = (1.0 - pos) * 240
    return "hsl(" + h + ", 90%, 50%)"
}

// Legend formatter, Array of [value, color] pairs
// x represents one data item e.g. [<time>, <value>]
legend(x) => [
    [x[1], gradient(x[1])],
    ['°F', 'white'],
    [new Date(x[0] + _3Y).toLocaleDateString(), 'gray']
]
```

**Overlays are shaders** that transform your data into graphics. You can define a drawing function, props, legend formatter and a lot more. We will dive into the [NavyJS API](/guide/main-comp/scripts.html) later.     


## 8. Multiple chart instances

Usually, when you trading, you want to display more than one chart on the same screen. To achieve this, you need to give different ids to all chart instances:   

<iframe src="https://codesandbox.io/embed/playing-around-8-5b3z6d?fontsize=14&hidenavigation=1&module=%2Fmain.js&theme=dark"
     style="width:100%; height:490px; border:0; border-radius: 8px; overflow:hidden;"
     title="playing-around-8"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

::: info
The chart are not synced perfectly, but we are working on this.
:::

```js
// The full code is in 'main.js'
let chart1 = new NightVision({ id: 'nvjs-1'})
let chart2 = new NightVision({ id: 'nvjs-2'})
// ...
```
::: warning
Datasets for each instance should also be different, otherwise you'll get an unexpected behavior.
:::

To sync the time-ranges, you'll need to listen to `$range-update` event, emitted from each instance:

```js
// Time-range sync
// Subscribing to the events of the first instance
chart1.events.on("app:$range-update", (range) => {
    chart2.range = range;
});
// Subscribing to the events of the second instance
chart2.events.on("app:$range-update", (range) => {
    chart1.range = range;
});
```

The same goes for the cursor (see `main.js` in the sandbox).


## 9. Using the lib with Python

One simple way to connect **NightVision** with **Python** is to create a simple plot-server that will listen to requests from py-script and display the received data.  

<iframe src="https://codesandbox.io/embed/playing-around-9-cs4gyu?fontsize=14&hidenavigation=1&module=%2Fmain.js&theme=dark"
     style="width:100%; height:200px; border:0; border-radius: 8px; overflow:hidden;"
     title="playing-around-9"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

::: tip
To download the sandbox content, click `Open Sandbox`, then find the Files menu and press the ↓ download button. Here you'll see *`No data ¯\_( °﹏°)_/¯`*. That's ok, you'll get it after running the python script.     
:::

Download this sandbox and run a few commands in the project's folder:

```sh
python3 -m pip install requests
npm install
```

Each time you run `client.py` a new dataset will be generated and sent to the charting library:

```py

import requests
import datetime
import math
import random

# Generate some fake data
time_series = []
for i in range(30):
    time = datetime.datetime.strptime('2022-11-' + str(i + 1), '%Y-%m-%d')
    t = math.floor(time.timestamp()) * 1000
    time_series.append([t, random.random() * (i + 1)])

# Data that we will send in POST request
data = {
    'panes': [{
        'overlays': [{
            'name': 'APE Stock',
            'type': 'Spline',
            'data': time_series,
            'settings': {
                'precision': 2
            }
        }]
    }]
}

# The POST request to our NightVision server
res = requests.post('http://127.0.0.1:7779/plot', json=data)

# Convert response data to json
returned_data = res.json()

print(returned_data)
```

You should get the same result as in the [Getting Started example](/guide/intro/getting-started.html#step-3-make-your-first-chart)

## 10. Full real-time chart of Bitcoin

::: warning
Due to the limitations of CodeSandBox, there are no updates via the websocket here. See [this](https://github.com/project-nv/night-vision/blob/main/tests/real-time/realTime.js) as a fully working example.  
:::

Are you ready for the full **NightVision** experience?

<iframe src="https://codesandbox.io/embed/playing-around-10-0zh0jh?fontsize=14&hidenavigation=1&module=%2Fmain.js&theme=dark"
     style="width:100%; height:490px; border:0; border-radius: 8px; overflow:hidden;"
     title="playing-around-10"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

::: tip
Scroll to the left to see how the app loads new data.
:::

The app consists of three important parts:

- **`dataLoader.js`** - class for preloading OHLCV data
- **`wsx.js`** - web socket stream of trades
- **`ohlcvSampler.js`** - OHLCV sampler (makes/updates candles)

`main.js` uses all these parts to build the final chart:

```js
import "./style.css";
import { NightVision } from "./night-vision.js";
import { DataLoader } from "./dataLoader.js";
import wsx from "./wsx.js";
import sampler from "./ohlcvSampler.js";

// ...

let chart = new NightVision("chart-container", {
  autoResize: true,
  colors: {
    back: "#1b1b1c",
    grid: "#2e2f3099"
  }
});

let dl = new DataLoader();

// Load the first piece of the data
dl.load((data) => {
  chart.data = data;
  el("loading").hidden = true;
});

// Load deeper into the history
function loadMore() {
  if (!chart.hub.mainOv) return;
  let data = chart.hub.mainOv.data; // Main OHLCV
  let t0 = data[0][0]; // Leftmost timestamp
  // Check if we out of data
  if (chart.range[0] < t0) {
    el("loading").hidden = false;
    dl.loadMore(t0 - 1, (chunk) => {
      // Add a new chunk at the beginning
      data.unshift(...chunk);
      // You need to update "range"
      // when the data range is changed
      chart.update("data");
      el("loading").hidden = true;
    });
  }
}

// Load new data when user scrolls left
chart.events.on("app:$range-update", loadMore);

// Plus check for updates every half-second
setInterval(loadMore, 500);

// Setup a trade data stream
wsx.init(["APE-PERP"]);
wsx.ontrades = (d) => {
  if (!chart.hub.mainOv) return;
  let data = chart.hub.mainOv.data;
  let trade = {
    price: d.price,
    volume: d.price * d.size
  };
  if (sampler(data, trade)) {
    chart.update("data"); // New candle
  } else {
    chart.update(); // Candle update
  }
};

// ...

```

## What's next?

Now that we've seen the true power of this library, we can move to learning "the boring" stuff. To get 100% of the project's value you must know **how this lib works internally**. With this knowledge you'll **dramatically decrease** time you spend building your charts.

From the experience of the previous project [TradinVueJs](https://github.com/tvjsx/trading-vue-js/issues), it became clear that most of the questions arise when you don't know where to find stuff you need to fix. Well, let's fix that!
