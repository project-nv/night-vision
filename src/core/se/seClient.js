
// Client-side api for Script Engine. Emits/listens to se events

import DataHub from '../dataHub.js'
import Utils from '../../stuff/utils.js'

class SeClient {

    constructor(id, chart) {

        this.chart = chart
        this.ww = chart.ww
        this.ww.onevent = this.onEvent.bind(this)

    }

    setRefs(hub, scan) {
        this.hub = hub
        this.scan = scan
    }

    // Listen to the events from web-worker
    onEvent(e) {
        switch (e.data.type) {
            case 'overlay-data':
                this.onOverlayData(e.data.data)
            case 'engine-state':
                this.onEngineState(e.data.data)
            break
        }
    }

    // Upload initial data
    async uploadData() {
        if (!this.hub.mainOv) return
        await this.ww.exec('upload-data', {
            meta: {
                range: this.chart.range,
                tf: this.scan.tf
            },
            dss: {
                // TODO: 'cv' data key for [close, vol] chart
                ohlcv: this.hub.mainOv.data
            }
        })
    }

    // Update data (when new live data arrives)
    // TODO: autoscroll
    async updateData() {
        if (!this.hub.mainOv || !this.hub.mainOv.data) return
        let ohlcv = this.hub.mainOv.data
        let data = await this.ww.exec('update-data', {
            // Send the last two candles
            ohlcv: ohlcv.slice(-2)
        })
        let unshift = false
        for (var ov of this.hub.allOverlays()) {
            if (data[ov.uuid]) {
                let last = ov.data[ov.data.length - 1]
                let nw = data[ov.uuid]
                if (!last || nw[0] > last[0]) {
                    ov.data.push(nw)
                    unshift = true
                } else if (nw[0] === last[0]) {
                    ov.data[ov.data.length - 1] = nw
                }
            }
        }
        if (unshift) {
            this.chart.update('data')
        } else {
            this.chart.update()
        }
    }

    async execScripts() {
        let list = this.hub.panes().map(x => ({
            id: x.id,
            uuid: x.uuid,
            scripts: x.scripts
        }))
        await this.ww.exec('exec-all-scripts', list)
    }

    async uploadAndExec() {
        await this.uploadData()
        await this.execScripts()
    }

    // Remove all overlays produced by scripts & add new
    replaceOverlays(data) {
        for (var pane of this.hub.panes()) {
            // Filter old produced overlays
            pane.overlays = pane.overlays.filter(x => !x.prod)
            let p = data.find(x => x.uuid === pane.uuid)
            if (p && p.overlays) {
                pane.overlays.push(...p.overlays)
            }
        }
        this.chart.update()
    }

    // Opdate data of overlays produced by scripts
    updateOverlays(data) {
        for (var pane of this.hub.panes()) {
            let p = data.find(x => x.uuid === pane.uuid)
            if (p && p.overlays) {
                // Updating only produced overlays
                let ovs = pane.overlays.filter(x => x.prod)
                for (var i = 0; i < ovs.length; i++) {
                    let dst = ovs[i]
                    let src = p.overlays[i]
                    if (dst && src) {
                        dst.name = src.name
                        dst.data = src.data
                        dst.uuid = src.uuid
                        // TODO: what if user changed a prop manually?
                        //dst.props = src.props
                        //dst.settings = src.settings
                    }
                }
            }
        }
        // Updating only data, preventing full update
        this.chart.update('data', {updateHash: true})
    }

    // Event handlers

    onOverlayData(data) {

        let h1 = Utils.ovDispositionHash(this.hub.panes())
        let h2 = Utils.ovDispositionHash(data)

        if (h1 === h2) {
            this.updateOverlays(data)
        } else {
            this.replaceOverlays(data)
        }
    }

    onEngineState(data) {
        this.state = Object.assign(this.state || {}, data)
    }
}

let instances = {}

function instance(id, chart) {
    if (!instances[id]) {
        instances[id] = new SeClient(id, chart)
    }
    return instances[id]
}

export default { instance }
