
// Pane interface for drawing overlays from scripts

import se from './script_engine.js'
import * as u from './script_utils.js'
import Utils from '../../stuff/utils.js'

export default class Pane {

    constructor(env) {
        this.scriptId = env.id
        this.env = env
        this.selfId = this.findSelfId(env.id)
        this.paneMap = this.createMap()
        this.name2ov = {}
        this.self = this.paneLib(this.selfId)
    }

    // Create a virtual pane with all overlays, so
    // we can call, e.g.: pane.self.<OverlayType>(...)
    paneLib(uuid) {
        let lib = {}
        for (var k in self.scriptLib.prefabs) {
            lib[k] = ((type) => {
                return (v, specs, _id) => {
                    let name = u.get_fn_id(type, _id ?? specs)
                    if (!this.name2ov[name]) {
                        let pane = this.paneMap[uuid]
                        if (!pane) pane = this.createPane()
                        this.name2ov[name] = this.newOverlay(
                            pane, name, type, specs
                        )
                    }
                    let ov = this.name2ov[name]
                    this.addNewValue(ov, v)
                }
            })(k)
        }
        return lib
    }

    // Create {pane.uuid => pane} map
    createMap() {
        let map = {}
        for (var pane of self.paneStruct) {
            map[pane.uuid] = pane
        }
        return map
    }

    // Find pane.self id
    findSelfId(id) {
        for (var pane of self.paneStruct) {
            for (var script of pane.scripts) {
                if (script.uuid === id) {
                    return pane.uuid
                }
            }
        }
    }

    // Add a new overlay to the struct
    newOverlay(pane, name, type, specs) {
        if (!pane.overlays) pane.overlays = []
        let ov = {
            name: specs.name ?? name,
            type: type,
            settings: specs.settings ?? {},
            props: specs.props ?? {},
            uuid: Utils.uuid3(),
            prod: this.scriptId,
            data: []
        }
        pane.overlays.push(ov)
        return ov
    }

    // Add new value to overlay's data
    addNewValue(ov, x) {
        let off = 0
        if (x && x.__id__) {
            off = x.__offset__ || 0
            x = x[0]
        }
        if (Array.isArray(x) && x[0] && x[0].__id__) {
            off = x[0].__offset__ || 0
            x = x.map(x => x[0])
        }
        off *= se.tf
        let v = Array.isArray(x) ?
            [se.t + off, ...x] : [se.t + off, x]
        u.update(ov.data, v)
    }

    createPane() {
        // TODO: implement
    }
}
