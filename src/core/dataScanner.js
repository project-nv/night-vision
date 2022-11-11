// Data meta-analysis (detects starting range, interval, etc)
// + tracks changes in the pane/overlay order

import Utils from '../stuff/utils.js'
import DataHub from './dataHub.js'

class DataScanner {

    constructor() {}

    init(props) {
        this.props = props
        this.hub = DataHub.instance(props.id)
    }

    detectInterval() {

        // Find main overlay
        let all = Utils.allOverlays(this.hub.data.panes)
        if (all.filter(x => x.main).length > 1) {
            console.warn(
                `Two or more overlays with flagged as 'main'`
            )
        }
        let mainOv = all.find(x => x.main) || all[0]
        this.main = (mainOv || {}).data || []
        this.tf = Utils.detectTimeframe(this.main)
        this.interval = this.hub.data.indexBased ? 1 : this.tf

        return this.interval

    }

    getTimeframe() {
        return this.tf
    }

    defaultRange() {

        const dl = this.props.config.DEFAULT_LEN
        const ml = this.props.config.MINIMUM_LEN + 0.5
        const l = this.main.length - 1

        if (this.main.length < 2) return []
        if (this.main.length <= dl) {
            var s = 0, d = ml
        } else {
            s = l - dl, d = 0.5
        }
        if (!this.hub.data.indexBased) {
            return [
                this.main[s][0] - this.interval * d,
                this.main[l][0] + this.interval * ml
            ]
        } else {
            return [
                s - this.interval * d,
                l + this.interval * ml
            ]
        }
    }

    calcIndexOffsets() {
        Utils.findIndexOffset()
    }

    // Calculte hash of the current panes
    calcPanesHash() {
        let hash = ''
        for (var pane of this.hub.data.panes || []) {
            hash += pane.uuid
            for (var ov of pane.overlays || []) {
                hash += ov.uuid
            }
        }
        return hash
    }

    // Detect changes in pane order/collection
    panesChanged() {
        let hash = this.calcPanesHash()
        /// if (hash.length !== this.panesHash.length) ...
        return hash !== this.panesHash
    }

    updatePanesHash() {
        this.panesHash = this.calcPanesHash()
    }
}

let instances = {}

function instance(id) {
    if (!instances[id]) {
        instances[id] = new DataScanner(id)
    }
    return instances[id]
}

export default { instance }
