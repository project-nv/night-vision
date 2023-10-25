
# Scripts <img src="/el.png" style="display: inline-block; margin: 0; width: 32px;" />

::: warning
This part of the documentation is likely to be rewritten. The API is not finalized yet.   
:::

::: info 
To use `.navy` files in your projects, you need to add [vite-raw-plugin.js](https://github.com/project-nv/night-vision/blob/a089ce451f5226b0c5e1c39435cc50ff9c5d3842/vite/vite-raw-plugin.js#L1) to import scripts as text. If you don't use Vite, replace it with something similar.  
:::

**Scripts** component is an essential part of the library that make this project unique. They allow to fully reprogram the looks and functionality of the chart.

The framework called **NavyJS**, the file extension is `.navy`. It's basically a regular **JavaScript** with some syntax sugar. Let's review several important features.

## Added Syntax

A script can define several building blocks of the chart:

- **Overlay**
- Indicator script (*In The Future*)
- Overlay primitive (*In The Future*)
- Indicator library (*In The Future*)
- Extension (*In The Future*)

Each block starts with a corresponding tag:

```js
// Navy ~ 1.0

[OVERLAY name=Custom, ctx=Canvas, author=ChartMaster, version=1.0.0]

// ...

[INDICATOR name=GodMoney version=1.1.0]

// ...

```

Each script can contain unlimited amount of these. A block is defined as a code starting after some tag and going until another tag or the end of the file. There could be sub-tags, splitting blocks into additional sections:

```js
// Navy ~ 1.0

[INDICATOR name=GodMoney version=1.1.0]

// Indicator initialization

[UPDATE]

// Indicator update

[POST]

// Called after all updates

```

## Syntax Sugar

You may have noticed that the script in the [10 Basic Examples](/guide/intro/10-basic-examples.html#_7-custom-overlays) has weird function declarations:

```js
// Like this one:
legend(x) => [
    [x[1], gradient(x[1])],
    ['°F', 'white'],
    [new Date(x[0] + _3Y).toLocaleDateString(), 'gray']
]
```

This is actually a short form of:

```js
var legend = (x) => [
    [x[1], gradient(x[1])],
    ['°F', 'white'],
    [new Date(x[0] + _3Y).toLocaleDateString(), 'gray']
]
```

This works with curly brackets as well:

```js
meta() => { someInfo: 123 }

// Equals to:
var meta = () => {
    return {
        someInfo: 123
    }
}
```

If you need a full function declaration, just use this (no need for `function` keyword):

```js
meta() {
    return {
        someInfo: 123
    }
}
```

## Overlay Environment     

The library provides you with everything you need to build custom overlays. A context stuffed with the core elements and props is called **Overlay Environment**. The most important objects there are:

- **`$core`** Collection of all core elements and even more stuff
- **`$props`** Overlay props (`props` field in `overlay` object)
- **`$events`** Events component
- **`$lib`** Primitives & helper functions

We will dive deep into overlay-building in the [NavyJS](#) chapter *(when you are truly ready)*.

## What's next

If you are still reading this, you are a kind of stoic person. Even the author got bored while writing this part. **Well done!** But in the next chapters we are going even deeper into the weeds.

<center><img src="/doc.png" alt="wink" width="128"/></center>
