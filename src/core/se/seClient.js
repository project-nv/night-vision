
// Client-side api for Script Engine. Emits/listens to se events

import DataHub from '../dataHub.js'

class SeClient {

    constructor(id, chart) {

        this.chart = chart
        this.ww = chart.ww

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
}

let instances = {}

function instance(id, chart) {
    if (!instances[id]) {
        instances[id] = new SeClient(id, chart)
    }
    return instances[id]
}

export default { instance }
