// Web-worker

//import se from './script_engine.js'
import Utils from '../../stuff/utils.js'
//import * as u from './script_utils.js'
//import { DatasetWW} from './dataset.js'

//var data_requested = false

// Storage of indicators & overlays
self.scriptHub = {}
self.se = {}

// DC => WW
self.onmessage = async e => {
    //console.log('Worker got:', e.data.type)
    switch (e.data.type) {
        case 'upload-scripts':
            self.scriptHub = e.data.data
            break
        case 'upload-data':
            console.log('DATA', e.data.data)
            se.send('data-uploaded', {}, e.data.id)
            break
        case 'exec-all-scripts':
            console.log('EXEC', e.data.data)
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
