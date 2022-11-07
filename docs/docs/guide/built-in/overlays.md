
# Built-in Overlays

## Candles

## Candles.colorBodyUp

- **Type:** `Color`
- **Default:** `$core.colors.candleUp`

Color of a "green" candle body

## Candles.colorBodyDw

- **Type:** `Color`
- **Default:** `$core.colors.candleDw`

Color of a "red" candle body


## Candles.colorWickUp

- **Type:** `Color`
- **Default:** `$core.colors.wickUp`

Color of a "green" candle wick

## Candles.colorWickDw

- **Type:** `Color`
- **Default:** `$core.colors.wickDw`

Color of a "red" candle wick

## Candles.colorVolUp

- **Type:** `Color`
- **Default:** `$core.colors.volUp`

Color of a "green" volume bad

## Candles.colorVolDw

- **Type:** `Color`
- **Default:** `$core.colors.volDw`

Color of a "red" volume bad

## Candles.showVolume

- **Type:** `boolean`
- **Default:** `true`

Enable/disable volume bars

## Candles.currencySymbol

- **Type:** `string`
- **Default:** `'$'`

Currency symbol displayed in the legend

## Candles.showAvgVolume

- **Type:** `boolean`
- **Default:** `true`

Enable/disable average volume SMA

## Candles.avgVolumeSMA

- **Type:** `string`
- **Default:** `20`

Length of the average volume SMA

## Candles.colorAvgVol

- **Type:** `Color`
- **Default:** `'#1cccb777'`

Color of the average volume SMA

## Candles.scaleSymbol

- **Type:** `string|boolean`
- **Default:** `false`

::: danger
`[In Development]`
:::

## Candles.priceLine

- **Type:** `boolean`
- **Default:** `true`

Enable/disable the price line

## Candles.showValueTracker

- **Type:** `boolean`
- **Default:** `true`

Enable/disable the volume tracker (price line + price label)


## Spline

## Spline.color

- **Type:** `Color`
- **Default:** `'#31ce31'`

Spline color, duh

## Spline.lineWidth

- **Type:** `Integer`
- **Default:** `1`

Spline line width

## Spline.dataIndex

- **Type:** `Integer`
- **Default:** `1`

Data index used be the overlay. E.g. `[<time>, <value-1>, <value-2>, <value-3>]` with `dataIndex = 2` draws `<value-2>`

## Area


## Area.color

- **Type:** `Color`
- **Default:** `'#31ce31'`

Area color (the line)

## Area.lineWidth

- **Type:** `Integer`
- **Default:** `1.25`

The line width

## Area.back1

- **Type:** `Color`
- **Default:** `$props.color + '15'`

Gradient starting color

## Area.back2

- **Type:** `Color`
- **Default:** `$props.color + '01'`

Gradient ending color 
