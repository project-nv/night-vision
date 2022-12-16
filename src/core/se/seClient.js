
// Client-side api for Script Engine. Emits/listens to se events

import DataHub from '../dataHub.js'

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
    async uploadData(range, tf) {
        await this.ww.exec('upload-data', {
            meta: {
                range: range,
                tf: tf,
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
        let ohlcv = this.hub.mainOv.data
        let data = await this.ww.exec('update-data', {
            // Send the last two candles
            ohlcv: ohlcv.slice(-2)
        })
        for (var ov of this.hub.allOverlays()) {
            if (data[ov.uuid]) {
                let last = ov.data[ov.data.length - 1]
                let nw = data[ov.uuid]
                if (!last || nw[0] > last[0]) {
                    ov.data.push(nw)
                } else if (nw[0] === last[0]) {
                    ov.data[ov.data.length - 1] = nw
                }
            }
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
        await this.uploadData(chart.range, this.scan.tf)
        await this.execScripts()
    }

    // Event handlers

    onOverlayData(data) {
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
