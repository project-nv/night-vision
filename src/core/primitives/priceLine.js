
// Draw (value) price line

export function priceLine(layout, ctx, tracker) {

    ctx.strokeStyle = tracker.color
    ctx.setLineDash([1, 2])
    ctx.beginPath()
    ctx.moveTo(0, tracker.y)
    ctx.lineTo(layout.width, tracker.y)
    ctx.stroke()
    ctx.setLineDash([])

}

export function priceSymbol() {

    // TODO
}
