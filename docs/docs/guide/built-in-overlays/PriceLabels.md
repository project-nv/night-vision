# PriceLabels

Price labels that stick to candles

## Data Format

```js
[<timestamp>, <LabelObject>]
 <LabelObject> {
   text :: string, text of the label
   dir :: direction, 1 = points up, -1 = points down
   pin :: "open" | "high" | "low" | "close"
   ?color :: color, text color
   ?back :: color, background
   ?stroke :: stroke color
   ?offset, px, offest from the pin
 }
```

## PriceLabels.color
- **Type:** `Color`
- **Default:** `$core.colors.text`

## PriceLabels.back
- **Type:** `Color`
- **Default:** `$core.colors.back`

## PriceLabels.stroke
- **Type:** `Color`
- **Default:** `$core.colors.scale`

## PriceLabels.borderRadius
- **Type:** `number`
- **Default:** `3`

## PriceLabels.offset
- **Type:** `number`
- **Default:** `5`

