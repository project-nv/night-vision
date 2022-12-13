
// Client-side api for Script Engine. Emits/listens to se events

import DataHub from '../dataHub.js'

class SeClient {

    constructor(id, chart) {

        this.chart = chart
        this.ww = chart.ww
        this.ww.onevent = this.onEvent.bind(this)

    }

    // Listen to the events from web-worker
    onEvent(e) {
        switch (e.data.type) {
            case 'overlay-data':
                this.onOverlayData(e.data.data)
            break
        }
    }

    async uploadData(range, tf) {
        await this.ww.exec('upload-data', {
            meta: {
                range: range,
                tf: tf,
            },
            dss: {
                ohlcv: this.hub.mainOv.data
            }
        })
    }

    async execScripts() {
        let list = this.hub.panes().map(x => ({
            id: x.id,
            uuid: x.uuid,
            scripts: x.scripts
        }))
        await this.ww.exec('exec-all-scripts', list)
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
}

let instances = {}

function instance(id, chart) {
    if (!instances[id]) {
        instances[id] = new SeClient(id, chart)
    }
    return instances[id]
}

export default { instance }
