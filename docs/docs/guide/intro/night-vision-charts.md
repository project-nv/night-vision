
![PepeNV](/nv-banner.jpeg)

# <span style="">Night Vision Charts</span>

**NightVision** is a highly customizable charting library, created for professional traders. It is a continuation of [TradingVueJS](https://github.com/tvjsx/trading-vue-js) project, borrowing its core ideas, but applying better design decisions and improving performance.   

::: warning
NightVision is currently in an active development state, the API is not finalized. However, it is already suitable for displaying candlestick / time-series data.
:::

## Why

TradingVueJS (TVJS) was the first open-source library that brought a new approach to making custom financial charts. It uses **mapping functions** and CanvasJS primitives that allow users to draw virtually **any kind of graphics**. The library found its niche market pretty quickly.

However, there were some factors limiting the further development. The first and the most important, with the third version of the Vue framework (Vue 3), the library in some cases became 2 times slower. The reason for that was probably javascript **Proxies**, which made the data-tracking a really heavy task.

The second factor, TVJS has some controversial design decisions, for example, splitting all data between *onchart* & *offchart* sections. This particular thing brought a lot of pain to the life of the core developer. The concept of a simple 'Pane' could've saved the situation.  

And the third, but not the least, is the name that sounded pretty much like a well-known service for traders (TradingView.com)... But who the author is trying to kid, that was THE idea - to bring their excellent design to the open-source community!

Overall, the project needed a total reboot.

## Improvements over TradingVueJS

There are some serious changes.

### It uses Svelte under the hood

Yes, you've heard it right - there is a better framework for this particular task. It was decided to use [Svelte](https://svelte.dev/) for its performance, simplicity and ability to make development really fast. But we have to emphasize the "under the hood" part. The new library provides a vanilla-js API and can be used with any framework (Vue, React and Svelte itself).


### 2X Faster

First tests show that it is at least 2X faster than TVJS, which is a huge improvement by itself. During the bull market of 2021 the core developer was trading with 6-chart matrix and lags were making him mad (especially during the most heated times!). Hopefully, they will not bother users like this anymore.

### NavyJS scripting framework

Instead of making the overlay-building api framework-dependent, this time was decided to introduce a new "language". But basically, it is a superset of javascript, adding some syntax sugar, called **NavyJS**. Scripts are pre-processed (compiled) in the run time and can define overlays, indicator scripts and extensions (in the future releases) all in one place.

```js
[OVERLAY name="Spline"]
// ... Spline overlay definition
draw(ctx) {}

[INDICATOR name="EMA"]
// ... Script initialization code
[UPDATE]
// Using Spline overlay defined above
spline(ema(close, 42))
```  

### Panes instead of onchart/offchart

To be honest, this seemed like a great concept when it was invented. By splitting all overlays into two categories (read more [here](https://github.com/tvjsx/trading-vue-js#data-structure)), it is possible to make the data structure more compact. But that comes with some negative side-effects, e.g. weird indexing required to put several offchart overlays on the same pane.  

The solution is very simple and straight-forward - just use a regular panes!

```js
Data = {
    panes: [{
        overlays: []
    }]
}
```  

Now we can use overlays freely, and even display "offchart" panes above the main chart.

### Scales

New scale system allows to mix different datasets on the same pane, switch between them and move them to the left-side. Pretty neat, huh?

### Multiple renderers

Each renderer is an instance of CanvasJS with a bunch of layers (overlays). Now you can stack multiple renderers on top of each other (like a sandwich), thus achieving independent rendering process.
