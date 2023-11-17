
// Object that contains all pre-set variables for
// overlay-maker function

import Events from '../events.js'
import layoutFn from '../layoutFn.js'
import DataHub from '../dataHub.js'
import MetaHub from '../metaHub.js'
import Scan from '../dataScanner.js'
import Utils from '../../stuff/utils.js'
import Mouse from '../input/mouse.js'
import Keys from '../input/keys.js'

// Build-in primitives
import Candle from '../primitives/navyLib/candle.js'
import candleBody from '../primitives/navyLib/candleBody.js'
import candleWick from '../primitives/navyLib/candleWick.js'
import volumeBar from '../primitives/navyLib/volumeBar.js'
import Volbar from '../primitives/navyLib/volbar.js'
import layoutCnv from '../primitives/navyLib/layoutCnvFast.js'
import avgVolume from '../primitives/navyLib/avgVolume.js'
import roundRect from '../primitives/navyLib/roundRect.js'
import drawArrow from '../primitives/navyLib/arrow.js'
import TrendLine from '../primitives/navyLib/trendLine.js'
import Segment from '../primitives/navyLib/seg.js'
import Pin from '../primitives/navyLib/pin.js'
import {
    fastSma, candleColor, rescaleFont
} from '../primitives/navyLib/helperFns.js'

const formatCash = Utils.formatCash

export default class OverlayEnv {

    // TODO: auto update on prop/data change
    constructor(id, ovSrc, layout, props) {

        let hub = DataHub.instance(props.id)
        let meta = MetaHub.instance(props.id)
        let events = Events.instance(props.id)
        let scan = Scan.instance(props.id)

        this.ovSrc = ovSrc
        this.overlay = null // Overlay instance ref
        this.id = id
        this.handlers = {}

        this.$core = { hub, meta, scan, events }
        this.update(ovSrc, layout, props)

        this.$props = ovSrc.props
        this.$events = events

        this.$core.mouse = new Mouse(this.$core)
        this.$core.keys = new Keys(this.$core)

        this.lib = {
            Candle, Volbar, layoutCnv, formatCash,
            candleBody, candleWick, volumeBar,
            fastSma, avgVolume, candleColor, 
            roundRect, rescaleFont, drawArrow, 
            TrendLine, Segment, Pin,
            Utils
        }

        this.$core.lib = this.lib 

    }

    // Defines new property
    prop(name, obj = {}) {
        if (!(name in this.$props)) {
            this.$props[name] = obj.def
        }
    }

    // Update evnironment variables
    update(overlay, layout, props) {
        if (!layout) return // If not exists
        let core = this.$core
        core.layout = this.buildLayout(
            layout, props.range, overlay
        )
        core.dataSubset = overlay.dataSubset
        core.data = overlay.data
        core.view = overlay.dataView
        core.dataExt = overlay.dataExt
        core.id = overlay.id
        core.paneId = core.layout.id
        // TODO: core.fullLayout = ...
        core.uuid = overlay.uuid
        core.range = props.range
        core.colors = props.colors
        core.cursor = props.cursor
        core.src = overlay
        core.props = props
        core.indexOffset = overlay.indexOffset

    }

    // Build the final layout API by merging
    // the selected scale to the rest layout
    // variables
    buildLayout(layout, range, overlay) {
        let obj = {}
        // TODO: Disabling scaleId caching allows to
        // track changes with simple update(). Think.
        this.scaleId = /*this.scaleId !== undefined ?
            this.scaleId :*/
            this.getScaleId(layout)
        let s = layout.scales[this.scaleId]
        return layoutFn(
            Object.assign(obj, layout, s),
            range, overlay
        )
    }

    // Get the scale id of this overlay
    getScaleId(layout) {
        let scales = layout.scales
        for (var i in scales) {
            let ovIdxs = scales[i].scaleSpecs.ovIdxs
            if (ovIdxs.includes(this.id)) {
                return i
            }
        }
    }

    watchProp(propName, handler) {
        // Save the handler
        this.handlers[propName] = this.handlers[propName] || []
        this.handlers[propName].push(handler)

        // Save the current property value
        let oldValue = this.$props[propName]

        // Remove the property from $props
        delete this.$props[propName]

        // Redefine the property with custom setter
        Object.defineProperty(this.$props, propName, {
            get: () => oldValue,
            set: (newValue) => {
                let tmp = oldValue
                oldValue = newValue

                // Call all handlers
                for (let handler of this.handlers[propName]) {
                    handler(newValue, tmp)
                }
            },
            enumerable: true,
            configurable: true
        })
    }

    destroy() {

        // Restore non-reactive properties
        for (let prop in this.handlers) {
            let value = this.$props[prop]
            delete this.$props[prop]
            this.$props[prop] = value
        }

        // Clear all handlers
        this.handlers = {}
    }
}
