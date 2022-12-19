// Web-worker

import se from './script_engine.js'
import Utils from '../../stuff/utils.js'
import * as u from './script_utils.js'
import { DatasetWW} from './dataset.js'

//var data_requested = false

// Storage of indicators & overlays
self.scriptLib = {}

// Pane structure
self.paneStruct = {}

// DC => WW
self.onmessage = async e => {
    //console.log('Worker got:', e.data.type)
    switch (e.data.type) {
        case 'upload-scripts':
            //console.log('SCRIPTS', e.data.data)
            self.scriptLib = e.data.data
            break
        case 'send-meta-info':
            //console.log('META', e.data.data)
            se.tf = u.tf_from_str(e.data.data.tf)
            se.range = e.data.data.range
            break
        case 'upload-data':
            //console.log('DATA', e.data.data)
            se.tf = u.tf_from_str(e.data.data.meta.tf)
            se.range = e.data.data.meta.range
            for (var id in e.data.data.dss) {
                let data = e.data.data.dss[id]
                se.data[id] = new DatasetWW(id, data)
            }
            se.recalc_size()
            se.send('data-uploaded', {}, e.data.id)
            break
        case 'exec-all-scripts':
            //console.log('EXEC', e.data.data)
            self.paneStruct = e.data.data
            se.exec_all()
            break
        case 'update-data':
            //console.log('UPDATE', e.data.data)
            DatasetWW.update_all(se, e.data.data)
            if (e.data.data.ohlcv) {
                se.update(e.data.data.ohlcv, e)
            }
            break
    }

}

// WW => DC

se.send = (type, data, id) => {
    id = id ?? Utils.uuid()
    switch (type) {
        case 'data-uploaded':
        case 'overlay-data':
        case 'overlay-update':
        case 'engine-state':
        case 'modify-overlay':
        case 'module-data':
        case 'script-signal':
            self.postMessage({
                type,
                data,
                id
            })
            break
    }
}
