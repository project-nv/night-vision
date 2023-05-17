

![PepeNV](https://github.com/project-nv/night-vision/blob/main/docs/docs/public/nv-banner.jpeg?raw=true)

<div align="center">

![npm](https://img.shields.io/npm/v/night-vision.svg?color=brightgreen&label=version) ![license](https://img.shields.io/badge/license-MIT-blue.svg) ![build](https://img.shields.io/badge/build-passing-brightgreen.svg)

</div>

# <center> Night Vision Charts™ </center>

**NightVision** is a highly customizable charting library, created for professional traders. It is a continuation of [TradingVueJS](https://github.com/tvjsx/trading-vue-js) project, borrowing its core ideas, but applying better design decisions and improving performance. Built with Svelte.   

Start your charting journey with our interactive [**[DOCS]**](https://nightvision.dev/guide/intro/night-vision-charts.html).

![Screen](https://raw.githubusercontent.com/project-nv/night-vision/main/docs/docs/public/screen.png)

## Installation

```sh
npm i night-vision
```

## Usage

```js

import { NightVision } from 'night-vision'

let chart = new NightVision('<root-element-id>')

// Generate some random data
function data() {
    return Array(30).fill(1).map((x, i) => [
        new Date(`${i+1} Nov 2022 GMT+0000`).getTime(),
        i * Math.random()
    ])
}

// Set the dataset
chart.data = {
    panes: [{
        overlays: [{
            name: 'APE Stock',
            type: 'Spline',
            data: data(),
            settings: {
                precision: 2
            }
        }]
    }]
}
```

## Roadmap

- ~~Add stocks support (Index-Based mode)~~
- ~~Improve the layout: x/y axis calculation~~
- ~~Expand the built-in overlay collection~~
- ~~Add keyboard & mouse events~~
- ~~Port the script system from TVJS~~
- ~~Create a built-in indicator collection~~
- NavyJS tutorial
- Data API (the high-level API)
- *Add tool overlays* ???
- *Toolbar* ??? 
- Mobile support


<div align="center">

Happy charting!

<img src="https://raw.githubusercontent.com/project-nv/night-vision/main/docs/docs/public/wink.gif" alt="wink" width="64"/>

</div>
