
// Average volume (SMA)

import { fastSma } from './helperFns.js'

export default function avgVolume(ctx, core, props, cnv) {

    let i1 = core.view.i1
    let i2 = core.view.i2
    let len = props.avgVolumeSMA
    let sma = fastSma(core.data, 5, i1, i2, len)
    let layout  = core.layout
    let maxv = cnv.maxVolume
    let vs = core.props.config.VOLSCALE * layout.height / maxv
    let h = layout.height
    let h05 = core.props.config.VOLSCALE * 0.5 * h

    ctx.lineJoin = "round"
    ctx.lineWidth = 0.75
    ctx.strokeStyle = props.colorAvgVol
    ctx.beginPath()

    // TODO: Calculate layout index offset
    for (var i = 0, n = sma.length; i < n; i++) {
        let x = layout.time2x(sma[i][0])
        let y = h - sma[i][1] * vs
        ctx.lineTo(x, y)
    }
    ctx.stroke()

}
