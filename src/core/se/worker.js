// Web-worker

//import se from './script_engine.js'
import Utils from '../../stuff/utils.js'
//import * as u from './script_utils.js'
//import { DatasetWW} from './dataset.js'

//var data_requested = false

// Storage of indicators & overlays
self.scriptHub = {}

// DC => WW
self.onmessage = async e => {
    //console.log('Worker got:', e.data.type)
    switch (e.data.type) {
        case 'upload-scripts':
            self.scriptHub = e.data.data
            console.log(self.scriptHub)
            break
    }

}

// WW => DC
/*
se.send = (type, data) => {
    switch (type) {
        case 'overlay-data':
        case 'overlay-update':
        case 'engine-state':
        case 'modify-overlay':
        case 'module-data':
        case 'script-signal':
            self.postMessage({
                type,
                data
            })
            break
    }
}*/
