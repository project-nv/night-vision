
// Scripts preprocessing/store
// TODO: ScriptHub - shared script storage
// (sharing prefabs b/w nvjs instances)

import Parser from '../core/navy/parser.js'

const Overlays = import.meta.glob(
    '../scripts/*.navy', { eager: true })

const Indicators = import.meta.glob(
    '../scripts/indicators/*.navy', { eager: true })

class Scripts {

    init(srcs) {

        this.srcLib = Object.values(Overlays).map(x => x.default)
        this.srcLib.push(...Object.values(Indicators).map(x => x.default))
        this.srcLib.push(...srcs)
        this.prefabs = {} // Overlay prefabs
        this.parse()

    }

    parse() {
        this.prefabs = {}
        for (var s of this.srcLib) {
            let parser = new Parser(s)
            for (var ov of parser.overlays) {
                this.prefabs[ov.tagProps.name] = {
                    name: ov.tagProps.name,
                    author: ov.tagProps.author,
                    version: ov.tagProps.version,
                    ctx: ov.tagProps.ctx || 'Canvas',
                    make: ov.prefab
                }
            }
        }
    }
}

let instances = {}

function instance(id) {
    if (!instances[id]) {
        instances[id] = new Scripts(id)
    }
    return instances[id]
}

export default { instance }
