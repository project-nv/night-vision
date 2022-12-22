
# Indicator Scripts

**Indicator scripts** can be used to run different mathematical functions on the chart data using **Script Engine**. The result of execution - new overlays.  

## Core concepts

**Timeseries (TS)** is a regular js Array with `__id__` and `__len__` properties (id & buffer length). New elements are added at the beginning of the TS:

```js
-> [2, 2, 2, 2, 2, 2]
```

The array is limited by `__len__` (applied each step).

[**Std-lib**](/guide/api/se-std-lib.html) is a collection of built-in functions:

```
atr()
bb()
cci()
cmo()
dmi()
ema()
...
```

You can use an output of one function as input for another:

```js
Spline(sma(atr(close, 14), 20))
```

**Script Sections**

During the parsing process, the source code is divided into several parts, each of which executed as a separate function:  

1. `[INDICATOR]` is called once, before any updates
2. `[UPDATE]` is executed at each step. Calculates and adds data points to overlays time-series.
3. `[POST]` is called after all updates (optional)

```js
[INDICATOR type=RSI]
// [1]
[UPDATE]
// [2]
[POST]
// [3]
```

You can pass variables between them using `this` context:

```
[INDICATOR name=Test]

this.a = 10

[UPDATE]

Spline(this.a) // Draws a horizontal line
```

## Drawing Overlays

To add a new overlay, simply use an overlay type as a function:

```js
Spline(x)
```

This will create a timeseries containing all recorded values of `x` and will use it as a `data` field of a new overlay:

```js
// Will be produced:
{
    name: 'Spline-0',
    type: 'Spline',
    props: {},
    settings: {}
}
```

Under the hood SE translates this code into something a little bit different:

```js
pane.self.Spline(x)
```

You can see that we are telling the engine to place the overlay on the same pane as the script is sitting on.

::: info
This combinations will be available in the future releases:
```js
pane.below.Spline(x) // Draw on the pane below
pane.above.Spline(x) // ... above
pane.main.Spline(x) // On the main pane
pane.id0.Spline(x) // On the pane with id=0
// ...
```
:::

## Specifying name, props & settings

Most overlays have some properties and all of them support settings. You can provide your freshly minted overlay with some good stuff:

```js
[INDICATOR name=ProperScript]

prop('color', { type: 'color', def: 'green' })

[UPDATE]

Spline(ema(close, 100), {
    name: 'EMA, 100', // Setting custom name
    props: {
        color: $props.color, // Setting property
    },
    settings: {
        zIndex: 10 // Placing it on top
    }
})
```
Will propduce:

```js
{
    name: 'EMA, 100',
    type: 'Spline',
    props: {
        color: 'green'
    },
    settings: {
        zIndex: 10
    }
}
```

## Multiple overlays

Yes, this is possible:

```js
Spline(ema(close, 12), { name: 'EMA, 12' })
Spline(ema(close, 26), { name: 'EMA, 26' })
```

## How To Apply PINE Knowledge

NavyJS and PINE use a similar approach, however NavyJS has less syntax sugar. For example:

```js
// PINE:
hl2 = (high + low) / 2

// NavyJS:
let hl2 = ts((high[0] + low[0]) / 2)
```

Sometimes you need to build a new TS with the `ts(x)` function. This function takes `x` and records it every step. Then you can use it as a source in the build-in functions:

```js
let hl2 = ts((high[0] + low[0]) / 2)
return ema(hl2, 100)[0]
```

## What To Avoid

Currently you can get issues with the following code constructions:

```js
// Avoid complex indices (brackets inside brackets):

ts1[[i][0] + arr[n]]

```
