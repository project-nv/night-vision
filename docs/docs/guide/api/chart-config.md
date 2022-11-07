
# Chart Config

Various constants. You can overwrite this values by providing `config` object in the props:

```js
let chart = new NightVision('<root>', {
    config: {
        MAX_ZOOM: 10000,
        // ...
    }
})
```

## config.SBMIN

- **Type:** `number`
- **Default:** `60`

Minimal sidebar, px


## config.SBMAX

- **Type:** `number`
- **Default:** `Infinity`

Max sidebar, px


## config.EXPAND

- **Type:** `number`
- **Default:** `0.15`

Expand y-range, %/100 of range


## config.CANDLEW

- **Type:** `number`
- **Default:** `0.7`

Candle width, %/100 of step


## config.GRIDX

- **Type:** `number`
- **Default:** `100`

Grid x-step target, px


## config.GRIDY

- **Type:** `number`
- **Default:** `47`

Grid y-step target, px


## config.BOTBAR

- **Type:** `number`
- **Default:** `28`

Bottom bar height, px


## config.PANHEIGHT

- **Type:** `number`
- **Default:** `22`

Scale panel height, px


## config.DEFAULT_LEN

- **Type:** `number`
- **Default:** `50`

Starting range, candles


## config.MINIMUM_LEN

- **Type:** `number`
- **Default:** `5`

Minimal starting range, candles


## config.MIN_ZOOM

- **Type:** `number`
- **Default:** `2`

Minimal zoom, candles


## config.MAX_ZOOM

- **Type:** `number`
- **Default:** `5000`

Maximal zoom, candles,


## config.VOLSCALE

- **Type:** `number`
- **Default:** `0.15`

Volume bars height, %/100 of layout.height


## config.ZOOM_MODE

- **Type:** `string`
- **Default:** `'tv'`

Zoom mode, 'tv' or 'tl'


## config.QUANTIZE_AFTER

- **Type:** `number`
- **Default:** `0`

Quantize cursor after, ms


## config.AUTO_PRE_SAMPLE

- **Type:** `number`
- **Default:** `10`

Sample size for auto-precision
