
// Script engine, Fuck yeah

import ScriptEnv from './script_env.js'
import Utils from '../../stuff/utils.js'
import * as u from './script_utils.js'
import symstd from './symstd.js'
import TS from './script_ts.js'

const DEF_LIMIT = 5   // default buff length
const WAIT_EXEC = 10  // merge script execs, ms

class ScriptEngine {

    constructor() {
        this.map = {}
        this.data = {}
        this.queue = []         // Script exec queue
        this.delta_queue = []   // Settings queue
        this.update_queue = []  // Live update queue
        this.sett = {}
        this.state = {}
        this.mods = {}          // Modules (extensions)
        this.std_plus = {}      // Functions to inject
        this.tf = undefined     // Main chart TF
    }

    async exec_all() {
        // Wait for the data
        if (!this.data.ohlcv) return

        this.map = this.struct_to_map(self.paneStruct)

        if (!this.init_state()) return
        this.init_map()

        if (Object.keys(this.map).length) {
            await this.run()
            this.drain_queues()
        } else {
            this.send('overlay-data', this.format_data())
        }
        this.send_state()

    }

    // Exec selected
    async exec_sel(delta) {

        // Wait for the data
        // TODO: Check data requirements
        if (!this.data.ohlcv) return

        let sel = Object.keys(delta).filter(x => x in this.map)

        if (!this.init_state(sel)) {
            this.delta_queue.push(delta)
            return
        }

        for (var id in delta) {
            if (!this.map[id]) continue

            let props = this.map[id].src.props || {}
            for (var k in props) {
                if (k in delta[id]) {
                    props[k].val = delta[id][k]
                }
            }

            this.add_script(this.map[id])

        }

        await this.run(sel)
        this.drain_queues()
        this.send_state()

    }

    // Add script (create a new ScriptEnv, add to the map)
    add_script(s) {

        //if (!s.src.conf) s.src.conf = {}
        let script = self.scriptLib.iScripts[s.type]
        if (!script) {
            delete this.map[s.uuid]
            return console.log('Unknown script: ', s.type)
        }

        s.code = {
            init: script.code.init || '',
            update: script.code.update || '',
            post: script.code.post || ''
        }

        // Parse non-default symbols
        symstd.parse(s)

        for (var id in this.mods) {
            if (this.mods[id].pre_env) {
                this.mods[id].pre_env(s.uuid, s)
            }
        }

        s.env = new ScriptEnv(s, Object.assign(this.shared, {
            open: this.open,
            high: this.high,
            low: this.low,
            close: this.close,
            vol: this.vol,
            dss: this.data,
            t: () => this.t,
            iter: () => this.iter,
            tf: this.tf,
            range: this.range,
            onclose: true
        }, this.tss))

        this.map[s.uuid] = s

        for (var id in this.mods) {
            if (this.mods[id].new_env) {
                this.mods[id].new_env(s.uuid, s)
            }
        }

        // Build te box after mod's interfaces injected
        s.env.build()
    }

    // Live update
    update(candles, e) {
        if (!this.data.ohlcv || !this.data.ohlcv.data.length) {
            return this.send_update(e.data.id)
        }

        if (this.running) {
            this.update_queue.push([candles, e])
            return
        }

        if (!this.shared) return // Not initialized yet

        let mfs1 = this.make_mods_hooks('pre_step')
        let mfs2 = this.make_mods_hooks('post_step')

        let step = (sel, unshift) => {
            for (var m = 0; m < mfs1.length; m++) {
                mfs1[m](sel) // pre_step
            }

            for (var id of sel) {
                this.map[id].env.step(unshift)
            }

            for (var m = 0; m < mfs2.length; m++) {
                mfs2[m](sel) // post_step
            }
        }

        try {
            let ohlcv = this.data.ohlcv.data
            let i = ohlcv.length - 1
            let last = ohlcv[i]
            let sel = Object.keys(this.map)
            let unshift = false
            this.shared.event = 'update'

            for (var candle of candles) {
                if (candle[0] > last[0]) {
                    this.shared.onclose = true
                    step(sel, false) // On candle close
                    ohlcv.push(candle)
                    unshift = true
                    i++
                } else if (candle[0] < last[0]) {
                    continue
                } else {
                    ohlcv[i] = candle
                }
            }

            this.iter = i
            this.t = ohlcv[i][0]
            this.step(ohlcv[i], unshift)

            this.shared.onclose = false
            step(sel, unshift)

            this.limit()
            this.send_update(e.data.id)
            this.send_state()

        } catch(err) {
            console.log(err)
        }
    }

    init_state(sel) {

        sel = sel ?? Object.keys(this.map)
        let task = sel.join(',')

        // Stop previous run only if the task is the same
        if (this.running) {
            this._restart = (task === this.task)
            return false
        }

        // Inverted arrays
        this.open = TS('open', [])
        this.high = TS('high', [])
        this.low = TS('low', [])
        this.close = TS('close', [])
        this.vol = TS('vol', [])

        // Shared TSs & user vars
        this.tss = {}
        this.std_plus = {}
        this.shared = {}

        // Engine state
        this.iter = 0
        this.t = 0
        this.skip = false // skip the step
        this.running = false
        this.task = task

        return true
    }

    // Convert full script struct to a map
    struct_to_map(struct) {
        let map = {}
        let list = []
        for (var pane of struct) {
            for (var s of pane.scripts) {
                list.push([s.uuid, s, s.settings.execOrder ?? 1])
            }
        }
        list.sort((a, b) => a[2] - b[2])
        list.forEach(x => {
            map[x[0]] = x[1]
        })
        return map
    }

    // Inject/override functions in the std lib object
    std_inject(std) {
        let proto = Object.getPrototypeOf(std)
        Object.assign(proto, this.std_plus)
        return std
    }

    send_state() {
        this.send('engine-state', {
            scripts: Object.keys(this.map).length,
            last_perf: this.perf,
            iter: this.iter,
            last_t: this.t,
            data_size: this.data_size,
            running: false
        })
    }

    send_update(taskId) {
        this.send(
            'overlay-update', this.format_update(),
            taskId
        )
    }

    init_map() {
        for (var id in this.map) {
            this.add_script(this.map[id])
        }
    }

    async run(sel) {

        this.send('engine-state', { running: true })

        var t1 = Utils.now()
        sel = sel || Object.keys(this.map)

        this.pre_run_mods(sel)
        let mfs1 = this.make_mods_hooks('pre_step')
        let mfs2 = this.make_mods_hooks('post_step')

        this.running = true

        try {

            for (var id of sel) {
                this.map[id].env.init()
            }

            let ohlcv = this.data.ohlcv.data
            let start = this.start(ohlcv)
            this.shared.event = 'step'

            for (var i = start; i < ohlcv.length; i++) {

                // Make a pause to read new WW msg
                // TODO: speedup pause()
                // TODO: emit progress %
                if (i % 5000 === 0) await Utils.pause(0)
                if (this.restarted()) return

                this.iter = i - start
                this.t = ohlcv[i][0]
                this.step(ohlcv[i])
                this.shared.onclose = i !== ohlcv.length - 1

                // SLOW DOWN TEST:
                //for (var k = 1; k < 1000000; k++) {}
                for (var m = 0; m < mfs1.length; m++) {
                    mfs1[m](sel) // pre_step
                }

                for (var id of sel) this.map[id].env.step()

                for (var m = 0; m < mfs2.length; m++) {
                    mfs2[m](sel) // post_step
                }

                this.limit()
            }

            for (var id of sel) {
                this.map[id].env.output.post()
            }

        } catch(err) {
            console.log(err)
        }

        this.post_run_mods(sel)

        this.perf = Utils.now() - t1
        this.running = false

        this.send('overlay-data', this.format_data())
    }

    step(data, unshift = true) {
        if (unshift) {
            this.open.unshift(data[1])
            this.high.unshift(data[2])
            this.low.unshift(data[3])
            this.close.unshift(data[4])
            this.vol.unshift(data[5])
            for (var id in this.tss) {
                if (this.tss[id].__tf__) this.tss[id].__fn__()
                else this.tss[id].unshift(this.tss[id].__fn__())
            }
        } else {
            this.open[0] = data[1]
            this.high[0] = data[2]
            this.low[0] = data[3]
            this.close[0] = data[4]
            this.vol[0] = data[5]
            for (var id in this.tss) {
                if (this.tss[id].__tf__) this.tss[id].__fn__()
                else this.tss[id][0] = this.tss[id].__fn__()
            }
        }
    }


    limit() {
        this.open.length = this.open.__len__ || DEF_LIMIT
        this.high.length = this.high.__len__ || DEF_LIMIT
        this.low.length = this.low.__len__ || DEF_LIMIT
        this.close.length = this.close.__len__ || DEF_LIMIT
        this.vol.length = this.vol.__len__ || DEF_LIMIT
    }

    start(ohlcv) {
        let depth = this.sett.script_depth
        return depth ?
            Math.max(ohlcv.length - depth, 0) : 0
    }

    drain_queues() {

        // Check if there are any new scripts (recieved during
        // the current run)
        if (this.queue.length) {
            this.exec_all()
        }
        // Check if there are any new settings deltas (...)
        else if (this.delta_queue.length) {
            this.exec_sel(this.delta_queue.pop())
            this.delta_queue = []
        }
        else {
            while (this.update_queue.length) {
                let upd = this.update_queue.shift()
                this.update(...upd)
            }
        }
    }

    format_data() {
        return self.paneStruct.map(x => ({
            id: x.id,
            uuid: x.uuid,
            overlays: this.override_overlays(x.overlays || [])
        }))
    }

    // Override overlay fields with 'script.overlay'
    override_overlays(ovs) {
        //let out = []
        for (var ov of ovs) {
            // Find the producer script by uuid (prod) 
            let s = this.map[ov.prod]
            if (!s) continue
            if (s.overlay) {
                ov = u.overrideOverlay(ov, s.overlay)
            }
        }
        return ovs
    }

    format_update() {
        let map = {}
        for (var pane of self.paneStruct) {
            for (var ov of pane.overlays || []) {
                map[ov.uuid] = ov.data[ov.data.length - 1]
            }
        }
        return map
    }

    restarted() {
        if (this._restart) {
            this._restart = false
            this.running = false
            this.perf = 0
            //console.log('Restarted')
            return true
        }
        return false
    }

    remove_scripts(ids) {
        for (var id of ids) delete this.map[id]
        this.send_state()
    }

    pre_run_mods(sel) {
        for (var id in this.mods) {
            if (this.mods[id].pre_run) {
                this.mods[id].pre_run(sel)
            }
        }
    }

    post_run_mods(sel) {
        for (var id in this.mods) {
            if (this.mods[id].post_run) {
                this.mods[id].post_run(sel)
            }
        }
    }

    make_mods_hooks(name) {
        let arr = []
        for (var id in this.mods) {
            if (this.mods[id][name]) {
                arr.push(this.mods[id][name]
                    .bind(this.mods[id]))
            }
        }
        return arr
    }

    // Calculate data size
    recalc_size() {
        while(true) {
            var sz = u.size_of_dss(this.data) / (1024 * 1024)
            let lim = this.sett.ww_ram_limit
            if (lim && sz > lim) {
                this.limit_size()
            } else break
        }
        this.data_size = +sz.toFixed(2)
        this.send_state()
    }

    // Limit data size by throwing out the least
    // active datasets (measured by 'last_upd')
    limit_size() {
        let dss = Object.values(this.data).map(x => ({
            id: x.id,
            t: x.last_upd
        }))
        dss.sort((a, b) => a.t - b.t)
        if (dss.length) {
            delete this.data[dss[0].id]
        }
    }
}

export default new ScriptEngine()
