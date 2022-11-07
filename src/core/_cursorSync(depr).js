
// Cursor updater. Makes some adjustment to the cursor:
// - grid magnet (cursor sticks to the t-axis values)
// - sets current cursor values (nearest data points)

import Utils from '../stuff/utils.js'
import hub from '../core/dataHub.js'
import math from '../stuff/math.js'


export function xSync(layout, props, cursor, update) {

    if (update.visible === false) {
        // TODO: make Cursor class, move all method there
        let newX = { values: cursor.values, visible: false }
        newX.getValue = getValue.bind(cursor)
        if (cursor.locked) {
            newX.locked = cursor.locked
            newX.t = cursor.t
        }
        return newX
    }

    let prevT = cursor.t

    Object.assign(cursor, update) // Merge the update
    let start = layout.main.startx
    let step = layout.main.pxStep

    yValues(layout, cursor)

    // If cursor is locked, we get x-coord from stored time
    if (cursor.locked) {
        cursor.x = layout.main.time2x(prevT)  // + 1
        return cursor
    }

    // Quantize x-coordinate
    cursor.x = Math.round((cursor.x - start) / step) * step + start

    // Precision
    cursor.x = Math.floor(cursor.x - 1) + 0.5

    return xValues(layout, props, cursor)

}

// Get nearest data values
export function xValues(layout, props, cursor) {

    // Cursor time
    // TODO: refine cursor t
    if (!cursor.locked) {
        cursor.t = layout.main.x2time(cursor.x)
    }

    let values = []
    for (var pane of hub.panes()) {
        let arr = []
        for (var i = 0; i < pane.overlays.length; i++) {
            let ov = pane.overlays[i]
            arr.push(Utils.nearestTs(cursor.t, ov.dataSubset)[1])
        }
        values.push(arr)
    }
    cursor.values = values
    cursor.getValue = getValue.bind(cursor)
    quantizeTime(layout, props, cursor)

    return cursor
}

// Calculate y-values for each scale
export function yValues(layout, cursor) {
    let gridId = cursor.gridId

    // Calculate y-value from y(px)
    if (!layout.grids[gridId]) return

    cursor.scales = {}
    let grid = layout.grids[gridId]

    for (var scale of Object.values(grid.scales)) {
        let $ = y2value(cursor.y, scale)
        cursor.scales[scale.scaleSpecs.id] = $
    }
}

// Quantize time (by interval)
function quantizeTime(layout, props, cursor) {

    let id = hub.chart.id
    let ovId = hub.mainOv.id

    if (!cursor.values || !cursor.values[id]) return
    let v = cursor.values[id][ovId]
    if (!v) return
    let r = Math.abs((v[0] - cursor.t) / props.interval)

    if (r >= 0.5) {
        // Outside the data range
        // TODO: check on a higher timeframes (1W)
        let n = Math.round(cursor.t / props.interval)
        cursor.t = n * props.interval
    } else {
        cursor.t = v[0]
    }

}

// Copy of the same function from layoutFn.js
function y2value(y, scale) {
    let ls = scale.scaleSpecs.log
    if (ls) return math.exp((y - scale.B) / scale.A)
    return (y - scale.B) / scale.A
}

function getValue(paneId, ovId) {
    if (!this.values) return undefined
    let paneValues = this.values[paneId] || []
    return paneValues[ovId]
}
