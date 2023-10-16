
// Scripts preprocessing/store
// TODO: ScriptHub - shared script storage
// (sharing prefabs b/w nvjs instances)

import Parser from '../core/navy/parser.js'
import WebWork from '../core/se/webWork.js'

const Overlays = import.meta.glob(
    '../scripts/*.navy', { eager: true })

const Tools = import.meta.glob(
    '../scripts/tools/*.navy', { eager: true })

const Indicators = import.meta.glob(
    '../scripts/indicators/*.navy', { eager: true })

class Scripts {

    constructor(id) {
        this.ww = WebWork.instance(id)
    }

    async init(srcs) {

        this.srcLib = Object.values(Overlays).map(x => x.default)
        this.srcLib.push(...Object.values(Tools).map(x => x.default))
        this.srcLib.push(...Object.values(Indicators).map(x => x.default))
        this.srcLib.push(...srcs)
        this.prefabs = {} // Overlay prefabs
        this.iScripts = {} // Indicator scripts
        this.parse()

        this.ww.exec('upload-scripts', {
            // Removing make() functions
            prefabs: Object.keys(this.prefabs).reduce((a, k) => {
                a[k] = {
                    name: this.prefabs[k].name,
                    author: this.prefabs[k].author,
                    version: this.prefabs[k].version,
                }
                return a
            }, {}),
            iScripts: this.iScripts
        })

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
                    make: ov.prefab,
                    static: ov.static
                }
            }
            for (var ind of parser.indicators) {
                this.iScripts[ind.tagProps.name] = {
                    name: ind.tagProps.name,
                    author: ind.tagProps.author,
                    version: ind.tagProps.version,
                    code: {
                        init: ind.init,
                        update: ind.update,
                        post: ind.post
                    }
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
