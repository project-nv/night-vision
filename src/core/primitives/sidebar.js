
// Drawing sidebar with CanvasJS

import Const from '../../stuff/constants.js'
import Utils from '../../stuff/utils.js'

const HPX = Const.HPX

function body(props, layout, scale, side, ctx) {

    var points = scale.ys
    ctx.font = props.config.FONT

    var {x, y, w, h} = border(props, layout, side, ctx)

    ctx.fillStyle = props.colors.text
    ctx.beginPath()

    for (var p of points) {

        if (p[0] > layout.height) continue

        var x1 = side === 'left' ? w + HPX : x + HPX
        var x2 = side === 'left' ? x1 - 4.5 : x1 + 4.5

        ctx.moveTo(x1, p[0] + HPX)
        ctx.lineTo(x2, p[0] + HPX)

        var offst = side === 'left' ? -10 : 10
        ctx.textAlign = side === 'left' ? 'end' : 'start'
        let d = scale.prec
        ctx.fillText(p[1].toFixed(d), x1 + offst, p[0] + 4)
    }

    ctx.stroke()

}

function border(props, layout, side, ctx) {
    var S = side === 'right' ? 1 : 0
    var sb = layout.sbMax[S]
    var x, y, w, h
    switch (side) {
        case 'left':
            x = 0
            y = 0
            w = Math.floor(sb)
            h = layout.height

            ctx.clearRect(x, y, w, h)

            ctx.strokeStyle = props.colors.scale

            ctx.beginPath()
            ctx.moveTo(x + HPX + w, 0)
            ctx.lineTo(x + HPX + w, h)
            ctx.stroke()

            break
        case 'right':
            x = 0
            y = 0
            w = Math.floor(sb)
            h = layout.height

            ctx.clearRect(x, y, w, h)

            ctx.strokeStyle = props.colors.scale

            ctx.beginPath()
            ctx.moveTo(x - HPX, 0)
            ctx.lineTo(x - HPX, h)
            ctx.stroke()
            break
    }

    return {x, y, w, h}
}

function panel(props, layout, scale, side, ctx) {

    const panHeight = props.config.PANHEIGHT
    let $ = props.cursor.scales[scale.scaleSpecs.id] || 0
    let lbl = $.toFixed(scale.prec)
    ctx.fillStyle = props.colors.panel
    var S = side === 'right' ? 1 : 0
    let panWidth = layout.sbMax[S] - 5
    let x = S ? 1 : 4
    let y = props.cursor.y - panHeight * 0.5 + HPX
    let a = S ? 7 : panWidth - 3
    roundRect(ctx, x , y, panWidth, panHeight, 3, S)
    ctx.fillStyle = props.colors.textHL
    ctx.textAlign = S ? 'left' : 'right'
    ctx.fillText(lbl, a, y + 15)

}

function tracker(props, layout, scale, side, ctx, tracker) {
    const panHeight = Math.floor(props.config.PANHEIGHT * 0.8)
    const ct = props.config.CANDLE_TIME && props.timeFrame >= Const.MINUTE
    let $ = tracker.value
    let lbl = $.toFixed(scale.prec)
    ctx.fillStyle = tracker.color
    var S = side === 'right' ? 1 : 0
    let panWidth = layout.sbMax[S] - 5
    let x = S ? 1 : 4
    let y = tracker.y - panHeight * 0.5 + HPX
    let a = S ? 7 : panWidth - 3
    let h = ct ? Math.floor(panHeight * 1.75) + 2 + HPX : panHeight
    roundRect(ctx, x , y, panWidth, h, 3, S)
    ctx.fillStyle = props.colors.back
    ctx.textAlign = S ? 'left' : 'right'
    ctx.fillText(lbl, a, y + panHeight - 4) // TODO: remove hardcode
    if (ct) {
        let rt = Utils.getCandleTime(props.timeFrame)
        ctx.textAlign = S ? 'left' : 'right'
        ctx.fillText(rt, a, y + panHeight + 9) // TODO: remove hardcode
    }

}

function roundRect(ctx, x, y, w, h, r, s) {
    if (w < 2 * r) r = w / 2
    if (h < 2 * r) r = h / 2
    ctx.beginPath()
    ctx.moveTo(x+r, y)
    ctx.arcTo(x+w, y,   x+w, y+h, r*s)
    ctx.arcTo(x+w, y+h, x,   y+h, r*s)
    ctx.arcTo(x,   y+h, x,   y,   r*(1-s))
    ctx.arcTo(x,   y,   x+w, y,   r*(1-s))
    ctx.closePath()
    ctx.fill()
}

function upperBorder(props, layout, ctx) {

    ctx.strokeStyle = props.colors.scale
    ctx.beginPath()
    ctx.moveTo(0, 0.5)
    ctx.lineTo(layout.width, 0.5)
    ctx.stroke()

}

function error(props, layout, side, ctx) {

    var S = side === 'right' ? 1 : 0
    var sb = layout.sbMax[S]
    ctx.font = props.config.FONT

    border(props, layout, side, ctx)

    if (layout.id) upperBorder(props, layout, ctx)

    let x = Math.floor(sb * 0.5)
    let y = Math.floor(layout.height * 0.5)

    ctx.fillStyle = props.colors.text
    ctx.textAlign = 'center'
    ctx.fillText('Error', x, y)

}

export default {
    body,
    border,
    panel,
    upperBorder,
    error,
    tracker
}
