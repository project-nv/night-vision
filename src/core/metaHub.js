
// Container for y-transforms, meta functions, other info
// of overlays (e.g. yRange)

import Utils from '../stuff/utils.js'
import Events from './events.js'
import DataHub from './dataHub.js'

class MetaHub {
    #events
    constructor(nvId) {

        let events = Events.instance(nvId)
        this.hub = DataHub.instance(nvId)
        this.#events = events

        // EVENT INTERFACE
        events.on('meta:sidebar-transform', this.onYTransform.bind(this))

        // Persistent meta storage
        this.storage = {}
    }

    init(props) {

        this.panes = 0 // Panes processed
        this.legendFns = [] // Legend formatters
        this.yTransforms = [] // yTransforms of sidebars
        this.preSamplers = [] // Auto-precision samplers
        this.yRangeFns = [] // yRange functions of overlays
        this.autoPrecisions = [] // Auto-precision for overlays
        this.valueTrackers = [] // Price labels + price lines
        // TODO: legend formatters ...
        // TODO: last values
    }

    // Extract meta functions from overlay
    exctractFrom(overlay) {
        let gridId = overlay.gridId()
        let id = overlay.id()

        // yRange functions
        var yrfs = this.yRangeFns[gridId] || []
        yrfs[id] = overlay.yRange ? {
            exec: overlay.yRange,
            preCalc: overlay.yRangePreCalc
        } : null

        // Precision samplers
        var aps = this.preSamplers[gridId] || []
        aps[id] = overlay.preSampler

        // Legend formatters
        var lfs = this.legendFns[gridId] || []
        lfs[id] = {
            legend: overlay.legend,
            legendHtml: overlay.legendHtml
        }

        // Value trackers
        var vts = this.valueTrackers[gridId] || []
        vts[id] = overlay.valueTracker

        this.yRangeFns[gridId] = yrfs
        this.preSamplers[gridId] = aps
        this.legendFns[gridId] = lfs
        this.valueTrackers[gridId] = vts

    }

    onYTransform(event) {
        let yts = this.yTransforms[event.gridId] || {}
        let tx = yts[event.scaleId] || {}
        yts[event.scaleId] = Object.assign(tx, event)
        this.yTransforms[event.gridId] = yts
        if (event.updateLayout) {
            this.#events.emitSpec('chart', 'update-layout')
        }
    }

    getYtransform(gridId, scaleId) {
        return (this.yTransforms[gridId] || [])[scaleId]
    }

    // Store auto precision for a specific overlay
    storeAutoPrec(gridId, ovId, prec) {
        let aps = this.autoPrecisions[gridId] || []
        aps[ovId] = prec
        this.autoPrecisions[gridId] = aps
    }

    // Store auto precision for a specific overlay
    getAutoPrec(gridId, ovId) {
        return (this.autoPrecisions[gridId] || [])[ovId]
    }

    getPreSampler(gridId, ovId) {
        return (this.preSamplers[gridId] || [])[ovId]
    }

    getLegendFns(gridId, ovId) {
        return (this.legendFns[gridId] || [])[ovId]
    }

    // Call this after all overlays are processed
    // We need to make an update to apply freshly
    // extracted functions
    // TODO: probably can do better
    finish() {
        this.panes++
        if (this.panes < this.hub.panes().length) return
        this.autoPrecisions = [] // wait for preSamplers
        this.restore()
        setTimeout(() => {
            this.#events.emitSpec('chart', 'update-layout')
            this.#events.emit('update-legend')
        })
    }

    // Store some meta info such as ytransform by
    // (pane.uuid + overlay.uuid) hash
    store() {
        this.storage = {}
        let yts = this.yTransforms || []
        for (var paneId in yts) {
            for (var ovId in yts[paneId] || []) {
                if (!yts[paneId][ovId]) continue
                let pane = this.hub.panes()[paneId]
                if (!pane) continue
                let ov = pane.overlays[ovId]
                if (!ov) continue
                let hash = `${pane.uuid}:${ov.uuid}`
                this.storage[hash] = yts[paneId][ovId]
            }
        }
    }

    // Restore that info after an update in the
    // pane/overlay order
    restore() {
        let yts = this.yTransforms
        for (var hash in this.storage) {
            let [uuid1, uuid2] = hash.split(':')
            let pane = this.hub.panes().find(x => x.uuid === uuid1)
            if (!pane) continue
            let ov = pane.overlays.find(x => x.uuid === uuid2)
            if (!ov) continue
            yts[pane.id] = []
            yts[pane.id][ov.id] = this.storage[hash]
        }
        this.storage = {}
    }
}


let instances = {}

function instance(id) {
    if (!instances[id]) {
        instances[id] = new MetaHub(id)
    }
    return instances[id]
}

export default { instance }
