
// Cursor object (crosshair)
// - grid magnet (cursor sticks to the t-axis values)
// - sets current cursor values (nearest data points)

import Utils from '../stuff/utils.js'
import math from '../stuff/math.js'

export default class Cursor {

    constructor(meta) {
        this.meta = meta
    }

    xSync(hub, layout, props, update) {

        if (update.visible === false) {
            this.hide()
            return this
        }

        let prevT = this.ti

        Object.assign(this, update) // Merge the update
        let start = layout.main.startx
        let step = layout.main.pxStep

        this.yValues(layout)

        // If cursor is locked, we get x-coord from stored time
        if (this.locked && !this.meta.scrollLock) {
            this.x = layout.main.time2x(prevT)  // + 1
            return this
        }

        // Quantize x-coordinate
        this.x = Math.round((this.x - start) / step) * step + start

        // Precision
        this.x = Math.floor(this.x - 1) + 0.5

        return this.xValues(hub, layout, props)

    }

    // Get nearest data values
    xValues(hub, layout, props) {

        // Cursor time
        // TODO: refine cursor t
        if (!this.locked || this.meta.scrollLock) {
            this.ti = layout.main.x2ti(this.x)
        }

        let values = []
        let vi // [value, index]
        for (var pane of hub.panes()) {
            let arr = []
            for (var i = 0; i < pane.overlays.length; i++) {
                let ov = pane.overlays[i]
                if (!layout.indexBased) {
                    vi = Utils.nearestTs(this.ti, ov.dataSubset) || []
                } else {
                    let off = ov.indexOffset
                    vi = Utils.nearestTsIb(this.ti, ov.data, off) || []
                }
                if (ov.main) {
                    this.time = vi[1] ? vi[1][0] : undefined
                    //this.index = vi[0] // TODO: ?add index
                }
                arr.push(vi[1])
            }
            values.push(arr)
        }
        this.values = values
        this.quantizeTime(hub, layout, props)
        return this
    }

    // Calculate y-values for each scale
    yValues(layout) {
        let gridId = this.gridId

        // Calculate y-value from y(px)
        if (!layout.grids[gridId]) return

        this.scales = {}
        let grid = layout.grids[gridId]

        for (var scale of Object.values(grid.scales)) {
            let $ = this.y2value(this.y, scale)
            this.scales[scale.scaleSpecs.id] = $
        }
    }

    // Quantize time (by interval)
    quantizeTime(hub, layout, props) {

        let id = hub.chart.id
        let ovId = hub.mainOv.id

        if (!this.values || !this.values[id]) return
        let v = this.values[id][ovId]
        if (!v) return
        let r = Math.abs((v[0] - this.ti) / props.interval)

        if (r >= 0.5) {
            // Outside the data range
            // TODO: check on a higher timeframes (1W)
            let n = Math.round(this.ti / props.interval)
            this.ti = n * props.interval
        } else {
            this.ti = v[0]
        }

        if (!layout.indexBased) {
            this.time = this.ti
        }

    }

    // Copy of the same function from layoutFn.js
    y2value(y, scale) {
        let ls = scale.scaleSpecs.log
        if (ls) return math.exp((y - scale.B) / scale.A)
        return (y - scale.B) / scale.A
    }

    getValue(paneId, ovId) {
        if (!this.values) return undefined
        let paneValues = this.values[paneId] || []
        return paneValues[ovId]
    }

    hide() {
        this.visible = false
        delete this.scales
        delete this.x
        delete this.y
        if (!this.locked) delete this.ti
    }
}
