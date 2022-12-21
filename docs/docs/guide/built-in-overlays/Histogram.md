# Histogram

Colored histogram, can be used for MACD

## Data Format

```js
[<timestamp>, <hist>, <?value>, <?signal>]
 <hist> :: histogram value (e.g. MACD bars)
 <?value> :: value of the first line (e.g. MACD value)
 <?signal> :: value of the second line (e.g. MACD signal)
```

## Histogram.barWidth
- **Type:** `number`
- **Default:** `4`

## Histogram.lineWidth
- **Type:** `number`
- **Default:** `1`

## Histogram.colorUp
- **Type:** `Color`
- **Default:** `'#35a776'`

## Histogram.colorDw
- **Type:** `Color`
- **Default:** `'#e54150'`

## Histogram.colorSemiUp
- **Type:** `Color`
- **Default:** `'#79e0b3'`

## Histogram.colorSemiDw
- **Type:** `Color`
- **Default:** `'#ea969e'`

## Histogram.colorValue
- **Type:** `Color`
- **Default:** `'#3782f2'`

## Histogram.colorSignal
- **Type:** `Color`
- **Default:** `'#f48709'`

