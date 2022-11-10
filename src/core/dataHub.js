
// Data container (original plus subset data)
// + Completes the structure to a full state
// + Implements various update operations.

import Utils from '../stuff/utils.js'
import Events from './events.js'
import DataView$ from './dataView.js'

class DataHub {

    #events
    constructor(nvId) {

        let events = Events.instance(nvId)
        this.#events = events

        // EVENT INTERFACE
        events.on('hub:set-scale-index', this.onScaleIndex.bind(this))
        events.on('hub:display-overlay', this.onDisplayOv.bind(this))
    }

    init(data) {

        // Raw data object
        this.data = data
        this.indexBased = data.indexBased ?? false

        this.chart = null
        this.offchart = null
        this.mainOv = null
        this.mainPaneId = null

    }

    // Update data on 'range-changed'. Should apply
    // filters only (not updating the full structure)
    updateRange(range) {
        for (var pane of this.data.panes) {
            for (var ov of pane.overlays) {
                ov.dataView = this.filter(ov.data, range)
                ov.dataSubset = ov.dataView.makeSubset()
            }
        }
    }

    // Calculate visible data section
    // (& completes the main structure)
    // TODO: smarter algo of adding/removing panes. Uuids
    // should remain the same if pane still exists
    calcSubset(range) {
        var paneId = 0
        for (var pane of this.data.panes || []) {
            pane.id =  paneId++
            pane.overlays = pane.overlays || []
            pane.settings = pane.settings || {}
            var ovId = 0
            for (var ov of pane.overlays) {
                ov.id = ovId++
                ov.main = !!ov.main
                ov.data = ov.data || []
                ov.dataView = this.filter(ov.data, range)
                ov.dataSubset = ov.dataView.makeSubset()
                ov.settings = ov.settings || {}
                ov.props = ov.props || {}
                ov.uuid = ov.uuid || Utils.uuid3()
            }
            // Flag that pane is ready for rendering
            pane.uuid = pane.uuid || Utils.uuid3()
        }
    }

    // Detect the main chart, define offcharts
    detectMain() {

        // TODO: remove duplicate code here & in dataScanner
        let all = Utils.allOverlays(this.data.panes)
        let mainOv = all.find(x => x.main) || all[0]

        if (!all.length || !mainOv) return

        mainOv.main = true // If there is only one OV

        this.chart = this.data.panes.find(
            x => x.overlays.find(
                y => y.main
            )
        )

        this.offchart = this.data.panes.filter(
            x => x !== this.chart
        )

        this.mainOv = mainOv

        this.mainPaneId = this.panes().indexOf(this.chart)

        // Remove all 'main' overlays except the first
        for (var ov of all) {
            if (ov !== mainOv) ov.main = false
        }

    }

    // Create a subset of timeseries
    filter (data, range) {
        let filter = this.indexBased ?
            Utils.fastFilterIB : Utils.fastFilter2
        var ix = filter(
            data,
            range[0], // -interval
            range[1]
        )
        return new DataView$(data, ix[0], ix[1])
    }

    // Short-cut
    panes() {
        return (this.data.panes || []).filter(x =>
            x.uuid)
    }

    // Short-cut
    overlay(paneId, ovId) {
        return this.panes()[paneId]?.overlays[ovId]
    }

    // Short-cut
    ovData(paneId, ovId) {
        return this.panes()[paneId]
            ?.overlays[ovId]?.data
    }

    // Short-cut
    ovDataSubset(paneId, ovId) {
        return this.panes()[paneId]
            ?.overlays[ovId]?.dataSubset
    }

    // Short-cut
    allOverlays() {
        return Utils.allOverlays(this.data.panes)
    }

    // Event handlers

    onScaleIndex(event) {

        let pane = this.panes()[event.paneId]
        if (!pane) return

        // Main scale index (that used for the grid)
        pane.settings.scaleIndex = event.index

        // Local left & right indices used to
        // display the correct Scale
        pane.settings.scaleSideIdxs = event.sideIdxs

        this.#events.emitSpec('chart', 'update-layout')
    }

    onDisplayOv(event) {

        let pane = this.panes()[event.paneId]
        if (!pane) return

        let ov = pane.overlays[event.ovId]
        if (!ov) return

        ov.settings.display = event.flag

        // Legend-line id
        let llId = `${event.paneId}-${event.ovId}`

        this.#events.emitSpec('chart', 'update-layout')
        this.#events.emitSpec(`ll-${llId}`, 'update-ll')

    }

}

let instances = {}

function instance(id) {
    if (!instances[id]) {
        instances[id] = new DataHub(id)
    }
    return instances[id]
}

export default { instance }
