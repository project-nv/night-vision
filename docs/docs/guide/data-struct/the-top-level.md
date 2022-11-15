
# Data Structure (The Top Level)

As you already know, the top level of the dataset structure looks like this (if not, what are you even doing here? Start with [10 Basic Examples](/guide/intro/10-basic-examples.html):

```js
{
    // Defines panes (vertical sections of the chart)
    panes: [
        {
            // Defines overlays (layers of graphics)
            overlays: [
                {
                    name: "…", // Overlay name
                    type: "…", // Overlay type
                    data: […], // Time-series: [[<time>, value, …], …]
                    settings: {…}, // Overlay settings
                    props: {…}, // Overlay props
                    // ...
                }
            ],
            settings: {…}, // Pane settings
        }
    ]
}
```
In this chapter you'll find definitions of the dataset parts. ([Pane](/guide/data-struct/pane-object.html) object, [Overlay](/guide/data-struct/pane-object.html) object and their settings).

The dataset can be called a **central source of the truth** in the library. Both user and the library itself can change it. When the library is expected to change a value of a certain property, you will see a robot tag: <img src="/robot.png" style="display: inline-block; width: 25px; margin: -10px 0 -7px 0;" />. If a property can be manipulated by human, you guessed it right: <img src="/human.png" style="display: inline-block; width: 25px; margin: -10px 0 -7px 0;" />

Following the notion of the [Low-Level API](/guide/intro/10-basic-examples.html#_4-chart-updates-low-level-api), to change the chart state you need to:
1. Change the dataset
2. Call the corresponding update or several updates

::: info
The dataset is made **unreactive** on purpose. Modern frameworks like Vue, try to track every small part of nested objects, decreasing the overall performance. In comparison with [TradingVueJS](https://github.com/tvjsx/trading-vue-js), this library has at least 30% boost due to the fact that data are not wrapped into **Proxies* and not being tracked with hidden `__ob__` objects.   
:::

## data.panes <img src="/human.png" class="rh-tag" title="human" />

- **Type:** `Array`
- **Default** `[]`

List of [Pane](/guide/data-struct/pane-object.html) objects.

## data.indexBased <img src="/human.png" class="rh-tag" title="human" />

- **Type:** `boolean`
- **Default** `false`

Sets the index-based mode. Read more [here](/guide/main-comp/layout.html#the-problem).
