
// Client-side api for Script Engine. Emits/listens to se events

import DataHub from '../dataHub.js'

class SeClient {

    constructor(id, chart) {

        this.chart = chart
        this.ww = chart.ww

    }

    async uploadScripts(range, tf) {
        let map = {}
        this.hub.panes().forEach(x => {
            map[x.uuid] = x.scripts
        })
        await this.ww.exec('upload-data', {
            range: range,
            tf: tf,
            data: this.hub.mainOv.data
        })
        await this.ww.exec('exec-all-scripts', map)
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
