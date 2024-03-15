
// Vanilla JS interface

import NightVisionComp from './NightVision.svelte'
import DataHub from './core/dataHub.js'
import MetaHub from './core/metaHub.js'
import DataScan from './core/dataScanner.js'
import Scripts from './core/scripts.js'
import Events from './core/events.js'
import WebWork from './core/se/webWork.js'
import SeClient from './core/se/seClient.js'

import resizeTracker from './stuff/resizeTracker.js'

class NightVision {

    constructor(target, props = {}) {

        this._data = props.data || {}
        this._scripts = props.scripts || []

        let id = props.id || 'nvjs'

        // Script engine & web-worker interfaces
        this.ww = WebWork.instance(id, this)
        this.se = SeClient.instance(id, this)

        // Singleton stores for data & scripts
        this.hub = DataHub.instance(id)
        this.meta = MetaHub.instance(id)
        this.scan = DataScan.instance(id)
        this.events = Events.instance(id)
        this.scriptHub = Scripts.instance(id)
        this.hub.init(this._data)
        this.scriptHub.init(this._scripts)

        this.root = document.getElementById(target)
        this.comp = new NightVisionComp({
            target: this.root,
            props: props
        })

        // TODO: remove the observer on chart destroy
        if (props.autoResize) {
            resizeTracker(this)
        }

        this.se.setRefs(this.hub, this.scan)
    }

    // *** PROPS ***
    // (see the default values in NightVision.svelte)

    // Chart container id (should be unique)
    get id() {
        return this.comp.id
    }
    set id(val) {
        this.comp.$set({id: val})
    }

    // Width of the chart
    get width() {
        return this.comp.width
    }
    set width(val) {
        this.comp.$set({width: val})
        setTimeout(() => this.update())
    }

    // Height of the chart
    get height() {
        return this.comp.height
    }
    set height(val) {
        this.comp.$set({height: val})
        setTimeout(() => this.update())
    }

    // Colors (modify specific colors)
    // TODO: not reactive enough
    get colors() {
        return this.comp.colors
    }
    set colors(val) {
        this.comp.$set({colors: val})
    }

    // Show NV logo or not
    get showLogo() {
        return this.comp.showLogo
    }
    set showLogo(val) {
        this.comp.$set({id: val})
    }


    // User-defined scripts (overlays & indicators)
    get scripts() {
        return this._scripts
    }
    set scripts(val) {
        this._scripts = val
        this.scriptHub.init(this._scripts)
        this.update('full')
    }

    // The data (auto-updated on reset)
    get data() {
        return this._data
    }
    set data(val) {
        this._data = val
        this.update('full')
    }

    // Overwrites the default config values
    get config() {
        return this.comp.config
    }
    set config(val) {
        this.comp.$set({config: val})
    }

    // Index-based mode of rendering
    get indexBased() {
        return this.comp.indexBased
    }
    set indexBased(val) {
        this.comp.$set({indexBased: val})
    }

    // Timezone (Shift from UTC, hours)
    get timezone() {
        return this.comp.timezone
    }
    set timezone(val) {
        this.comp.$set({timezone: val})
        setTimeout(() => this.update())
    }

    // *** Internal variables ***

    get layout() {
        let chart = this.comp.getChart()
        if (!chart) return null
        return chart.getLayout()
    }

    get range() {
        let chart = this.comp.getChart()
        if (!chart) return null
        return chart.getRange()
    }

    set range(val) {
        let chart = this.comp.getChart()
        if (!chart) return
        chart.setRange(val)
    }

    get cursor() {
        let chart = this.comp.getChart()
        if (!chart) return null
        return chart.getCursor()
    }

    set cursor(val) {
        let chart = this.comp.getChart()
        if (!chart) return
        chart.setCursor(val)
    }

    // *** METHODS ***

    // Various updates of the chart
    update(type = 'layout', opt = {}) {
        var [type, id] = type.split('-')
        const ev = this.events
        switch(type) {
            case 'layout':
                ev.emitSpec('chart', 'update-layout', opt)
            break
            case 'data':
                // TODO: update cursor if it's ahead of the last candle
                // (needs to track the new last)
                this.hub.updateRange(this.range)
                this.meta.calcOhlcMap()
                ev.emitSpec('chart', 'update-layout', opt)
            break
            case 'full':
                this.hub.init(this._data)
                ev.emitSpec('chart', 'full-update', opt)
            break
            case 'grid':
                if (id === undefined) {
                    ev.emit('remake-grid')
                } else {
                    let gridId = `grid-${id}`
                    ev.emitSpec(gridId, 'remake-grid', opt)
                }
            break
            case 'legend':
                if (id === undefined) {
                    ev.emit('update-legend')
                } else {
                    let gridId = `legend-${id}`
                    ev.emitSpec(gridId, 'update-legend', opt)
                }
            break
        }
    }

    // Reset everything
    fullReset() {
        this.update('full', {resetRange: true})
    }

    // Go to time/index
    goto(ti) {
        let range = this.range
        let dti = range[1] - range[0]
        this.range = [ti - dti, ti]
    }

    // Scroll on interval forward
    // TODO: keep legend updated, when the cursor is outside
    scroll() {
        if (this.cursor.locked) return
        let main = this.hub.mainOv.data
        let last = main[main.length - 1]
        let ib = this.hub.indexBased
        if (!last) return
        let tl = ib ? main.length - 1 : last[0]
        let d = this.range[1] - tl
        let int = this.scan.interval
        if (d > 0) this.goto(this.range[1] + int)
    }

    // Should call this to clean-up memory / events
    destroy() {
        this.comp.$destroy()
        this.ww.stop()
    } 
}

export {
    NightVision
}
