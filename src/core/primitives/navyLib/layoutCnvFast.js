// Calculations for candles & volume overlays

import Utils from '../../../stuff/utils.js'
import Const from '../../../stuff/constants.js'
import math from '../../../stuff/math.js'

const HPX = Const.HPX

// Calulate positions & sizes for candles (if $c),
// volume bars (if $v), or both by default
export default function layoutCnv(
    core, $c = true, $v = true, vIndex = 5, dirIndex, vScale) {

    let config = core.props.config
    let interval = core.props.interval
    let data = core.data
    let ti2x = core.layout.ti2x
    let layout = core.layout
    let view = core.view
    let ls = layout.scaleSpecs.log

    let upBodies = []
    let dwBodies = []
    let upWicks = []
    let dwWicks = []
    let upVolbars = []
    let dwVolbars = []

    // The volume bar height is determined as a percentage of
    // the chart's height (VOLSCALE)

    if ($v) {
        var volScale = vScale ?? config.VOLSCALE
        var maxv = maxVolume(core.dataSubset, vIndex)
        var vs = volScale * layout.height / maxv
    }
    var x1, x2, mid, prev = undefined
    let { A, B, pxStep } = layout
    let w = pxStep * config.CANDLEW

    let splitter = pxStep > 5 ? 1 : 0

    // A & B are current chart transformations:
    // A === scale,  B === Y-axis shift
    for (var i = view.i1, n = view.i2; i <= n; i++) {
        let p = data[i]
        let green = dirIndex ? p[dirIndex] > 0 : p[4] >= p[1]
        mid = ti2x(p[0], i) + 1

        // Clear volume bar if there is a time gap
        if (data[i - 1] && p[0] - data[i - 1][0] > interval) {
            prev = null
        }

        if ($c) {
            let candle = ls ? {
                x: mid,
                w: w,
                o: Math.floor(math.log(p[1]) * A + B),
                h: Math.floor(math.log(p[2]) * A + B),
                l: Math.floor(math.log(p[3]) * A + B),
                c: Math.floor(math.log(p[4]) * A + B),
                green: green,
                src: p
            } : {
                x: mid,
                w: w,
                o: Math.floor(p[1] * A + B),
                h: Math.floor(p[2] * A + B),
                l: Math.floor(p[3] * A + B),
                c: Math.floor(p[4] * A + B),
                green: green,
                src: p
            }
            if (green) {
                upBodies.push(candle)
                upWicks.push(candle)
            } else {
                dwBodies.push(candle)
                dwWicks.push(candle)
            }
        }

        if ($v) {
            x1 = prev || Math.floor(mid - pxStep * 0.5)
            x2 = Math.floor(mid + pxStep * 0.5) + HPX
            let volbar = {
                x1: x1,
                x2: x2,
                h: p[vIndex] * vs,
                green: green,
                src: p
            }
            if (green) {
                upVolbars.push(volbar)
            } else {
                dwVolbars.push(volbar)
            }
        }

        prev = x2 + splitter
    }

    return {
        upBodies, upWicks, dwBodies, dwWicks,
        upVolbars, dwVolbars,
        maxVolume: maxv,
        volScale: vs
    }

}

function maxVolume(data, index) {
    let max = 0
    for (var i = 0; i < data.length; i++) {
        let val = data[i][index]
        if (val > max) max = val
    }
    return max
}
