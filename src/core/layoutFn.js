// Layout functional interface

import Utils from '../stuff/utils.js'
import Const from '../stuff/constants.js'
import math from '../stuff/math.js'

const HPX = Const.HPX

// If `overlay` provided, that means this is an
// overlay-specific layout-api
export default function(self, range, overlay = null) {

    //const ib = self.tiMap.ib
    const dt = range[1] - range[0]
    const r = self.spacex / dt
    const ls = (self.scaleSpecs || {}).log || false // TODO: from scale specs
    const offset = (overlay ? overlay.indexOffset : 0) ?? 0

    Object.assign(self, {
        // Time and global index to screen x-coordinate
        // (universal mapping that works both in timeBased
        // & indexBased modes):

        // Time-index switch (returns time or index depending on the mode)
        ti: (t, i) => {
            return self.indexBased ? i : t
        },
        // Time-or-index to screen x-coordinate
        ti2x: (t, i) => {
            let src = self.indexBased ? (i + offset) : t
            return Math.floor((src - range[0]) * r) + HPX
        },
        // Time to screen x-coordinates
        time2x: t => {
            return Math.floor((t - range[0]) * r) + HPX
        },
        // Price/value to screen y-coordinates
        value2y: y => {
            if (ls) y = math.log(y)
            return Math.floor(y * self.A + self.B) + HPX
        },
        // Time-axis nearest step
        tMagnet: t => {
            // TODO: reimplement
            //if (ib) t = self.tiMap.smth2i(t)
            /*const cn = self.candles || self.master_grid.candles
            const arr = cn.map(x => x.raw[0])
            const i = Utils.nearestA(t, arr)[0]
            if (!cn[i]) return
            return Math.floor(cn[i].x) + HPX */
        },
        // Screen-Y to dollar value (or whatever)
        y2value: y => {
            if (ls) return math.exp((y - self.B) / self.A)
            return (y - self.B) / self.A
        },
        // Screen-X to timestamp
        x2time: x => {
            // return Math.floor(range[0] + x / r)
            return range[0] + x / r
        },
        // Screen-X to time-index
        x2ti: x => {
            // TODO: implement
            return range[0] + x / r
        },
        // $-axis nearest step
        $magnet: price => { },
        // Nearest candlestick
        cMagnet: t => {
            const cn = self.candles || self.master_grid.candles
            const arr = cn.map(x => x.raw[0])
            const i = Utils.nearestA(t, arr)[0]
            return cn[i]
        },
        // Nearest data points
        dataMagnet: t => {  /* TODO: implement */ }
    })

    return self

}
