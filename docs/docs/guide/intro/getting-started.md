
# Getting Started

This section will help you build first NightVision chart from ground up. You'll need a basic knowledge of javascript and the npm ecosystem.

::: warning
NightVision is currently in an active development state, the API is not finalized. However, it is already suitable for displaying candlestick / time-series data.
:::


## Step 1: Create a new Vite project

This will create a new directory **night-vision-101** with a vanilla-js Vite template:

```sh
# npm 6.x
npm create vite@latest night-vision-101 --template vanilla

# npm 7+, extra double-dash is needed:
npm create vite@latest night-vision-101 -- --template vanilla

# yarn
yarn create vite night-vision-101 --template vanilla

# pnpm
pnpm create vite night-vision-101 --template vanilla
```  

Run the following commands to install it:

```sh
cd night-vision-101
npm install
```

## Step 2: Install NightVision package

```sh
npm i night-vision
```

## Step 3: Make your first chart

Replace the content of `main.js` in the root folder with:

```js
import './style.css'
import { NightVision } from 'night-vision'

document.querySelector('#app').innerHTML = `
<style>
body {
    background-color: #0c0d0e;
}
</style>
<h1>Night Vision Charts</h1>
<div id="chart-container"></div>
`
// Generate some random data
function data() {
    return Array(30).fill(1).map((x, i) => [
        new Date(`${i+1} Nov 2022 GMT+0000`).getTime(),
        i * Math.random()
    ])
}
let chart = new NightVision('chart-container')
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

And run:

```sh
npm run dev
```

Voila! The chart is live.

<iframe src="https://codesandbox.io/embed/night-vision-101-4f4ych?fontsize=14&hidenavigation=1&theme=dark&module=%2Fmain.js"
     style="width:100%; height:490px; border:0; border-radius: 8px; overflow:hidden;"
     title="night-vision-101"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

::: tip
Here and in the rest of the guide you can try examples directly in your browser.  
:::

## What's next?

Now that you know how easy it is to create a great simple chart, we can move towards making mega-charts, packed with various indicators and custom overlays. First, we will learn about the main component configuration, then will study the chart internals and finally will dive into overlay-creation API and real-world charts.

<center><img src="/wink.gif" alt="wink" width="64"/></center>
