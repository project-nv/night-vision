import Const from '../stuff/constants'
import Utils from '../stuff/utils.js'

import layoutFn from './layoutFn.js'
import Scale from './gridScale.js'

const { TIMESCALES, $SCALES, WEEK, MONTH, YEAR, HOUR, DAY } = Const
const MAX_INT = Number.MAX_SAFE_INTEGER


/* Scales System:

    scaleTemplate: [['C'], ['A','B']] // Scales displayed
    scaleSideIdxs: ['C','A'] // Selected scales for each side
    scaleIndex: 'A' // Main scale (applied to the grid)

    Each overlay can be attached to a scale:

    overlay.settings = {
        scale: 'A' // By default, or
        scale: 'X' // 'custom' scale
    }

    // TODO: implement
    pane.settings = {
        linkScales: {
            scales: ['A', 'X'],
            type: 'percent'
        }
    }

*/

// mainGrid - ref to the main grid
function GridMaker(id, specs, mainGrid = null) {

    let { hub, props, settings, height } = specs
    let { interval, range, ctx, timezone } = props

    let y_t = null // TODO: implement
    let tiMap = {}
    let ls = !!settings.logScale // Pane's log scale

    // All overlays
    let ovs = hub.panes()[id].overlays

    // Main data
    let data = hub.mainOv.dataSubset

    // Layout object
    let self = { tiMap }
    //var lm = layers_meta[id]

    // Split overlays by scale (default scale: 'A')
    function scaleSplit() {
        let scales = unpackScales()
        for (var i = 0; i < ovs.length; i++) {
            let ov = ovs[i]
            let id = ov.settings.scale || 'A'
            if (!scales[id]) {
                scales[id] = defineNewScale(id)
            }
            scales[id].ovs.push(ov)
            scales[id].ovIdxs.push(i)
        }
        return Object.values(scales)
    }

    // Unpack scales defined in pane.settings.scale
    function unpackScales() {
        let out = {
            'A': defineNewScale('A')
        }
        for (var scaleId in settings.scales || {}) {
            let proto = settings.scales[scaleId]
            out[scaleId] = defineNewScale(scaleId, proto)
        }
        return out
    }

    function defineNewScale(scaleId, proto = {}) {
        return {
            id: scaleId,
            gridId: id,
            ovs: [],
            ovIdxs: [],
            log: proto.log ?? ls,
            precision: proto.precision
        }
    }

    function calcPositions() {

        if (data.length < 2) return

        let dt = range[1] - range[0]

        // A pixel space available to draw on (x-axis)
        self.spacex = props.width - self.sbMax[0] - self.sbMax[1]

        // Candle capacity
        let capacity = dt / interval
        self.pxStep = self.spacex / capacity

        // px / time ratio
        let r = self.spacex / dt
        self.startx = (data[0][0] - range[0]) * r

    }

    // Select nearest good-loking t step (m is target scale)
    function timeStep() {
        let k = tiMap.ib ? 60000 : 1
        let xrange = (range[1] - range[0]) * k
        let m = xrange * (props.config.GRIDX / props.width)
        let s = TIMESCALES
        return Utils.nearestA(m, s)[1] / k
    }

    function gridX() {

        // If this is a subgrid, no need to calc a timeline,
        // we just borrow it from the mainGrid
        if (!mainGrid) {

            calcPositions()

            self.tStep = timeStep()
            self.xs = []
            const dt = range[1] - range[0]
            const r = self.spacex / dt

            /* TODO: remove the left-side glitch

            let year_0 = Utils.getYear(data[0][0])
            for (var t0 = year_0; t0 < range[0]; t0 += self.tStep) {}

            let m0 = Utils.getMonth(t0)*/

            for (var i = 0; i < data.length; i++) {
                let p = data[i]
                let prev = data[i-1] || []
                let prev_xs = self.xs[self.xs.length - 1] || [0,[]]
                let x = Math.floor((p[0] - range[0]) * r)

                insertLine(prev, p, x)

                // Filtering lines that are too near
                let xs = self.xs[self.xs.length - 1] || [0, []]

                if (prev_xs === xs) continue

                if (xs[1][0] - prev_xs[1][0] < self.tStep * 0.8) {

                    // prev_xs is a higher "rank" label
                    if (xs[2] <= prev_xs[2]) {
                        self.xs.pop()
                    } else {
                        // Otherwise
                        self.xs.splice(self.xs.length - 2, 1)
                    }
                }
            }

            // TODO: fix grid extension for bigger timeframes
            if (interval < WEEK && r > 0) {
                extendLeft(dt, r)
                extendRight(dt, r)
            }

        } else {

            self.tStep = mainGrid.tStep
            self.pxStep = mainGrid.pxStep
            self.startx = mainGrid.startx
            self.spacex = mainGrid.spacex
            self.xs = mainGrid.xs

        }
    }

    function insertLine(prev, p, x, m0) {

        let prev_t = tiMap.ib ? tiMap.i2t(prev[0]) : prev[0]
        let p_t = tiMap.ib ? tiMap.i2t(p[0]) : p[0]

        if (tiMap.tf < DAY) {
            prev_t += timezone * HOUR
            p_t += timezone * HOUR
        }
        let d = timezone * HOUR

        // TODO: take this block =========> (see below)
        if ((prev[0] || interval === YEAR) &&
            Utils.getYear(p_t) !== Utils.getYear(prev_t)) {
            self.xs.push([x, p, YEAR]) // [px, [...], rank]
        }
        else if (prev[0] &&
            Utils.getMonth(p_t) !== Utils.getMonth(prev_t)) {
            self.xs.push([x, p, MONTH])
        }
        // TODO: should be added if this day !== prev day
        // And the same for 'botbar.js', TODO(*)
        else if (Utils.dayStart(p_t) === p_t) {
            self.xs.push([x, p, DAY])
        }
        else if (p[0] % self.tStep === 0) {
            self.xs.push([x, p, interval])
        }
    }

    function extendLeft(dt, r) {

        if (!self.xs.length || !isFinite(r)) return

        let t = self.xs[0][1][0]
        while (true) {
            t -= self.tStep
            let x = Math.floor((t  - range[0]) * r)
            if (x < 0) break
            // TODO: ==========> And insert it here somehow
            if (t % interval === 0) {
                self.xs.unshift([x,[t], interval])
            }
        }
    }

    function extendRight(dt, r) {

        if (!self.xs.length || !isFinite(r)) return

        let t = self.xs[self.xs.length - 1][1][0]
        while (true) {
            t += self.tStep
            let x = Math.floor((t  - range[0]) * r)
            if (x > self.spacex) break
            if (t % interval === 0) {
                self.xs.push([x,[t], interval])
            }
        }
    }

    function applySizes() {
        self.width = props.width - self.sbMax[0] - self.sbMax[1]
        self.height = height
    }

    function makeScales() {
        let scales = {}
        for (var src of scaleSplit()) {
            let scale = new Scale(src.id, src, specs)
            scales[src.id] = scale
        }
        self.scales = scales
    }

    // Select left and right sidebars, set the main scale
    function selectSidebars() {

        if (!self.scales[settings.scaleIndex]) {
            settings.scaleIndex = 'A'
        }
        self.scaleIndex = settings.scaleIndex

        // Scale sides config
        if (!settings.scaleTemplate) {
             settings.scaleTemplate = [[], Object.keys(self.scales)]
        }
        let sides = settings.scaleTemplate
        if (!sides[0] || !sides[1]) {
            console.error('Define scaleTemplate as [[],[]]')
        }

        // Left and right indices
        if (!settings.scaleSideIdxs) {
            settings.scaleSideIdxs = []
        }
        // Auto-detect initial idxs
        let idxs = settings.scaleSideIdxs
        Utils.autoScaleSideId(0, sides, idxs)
        Utils.autoScaleSideId(1, sides, idxs)

        // Sidebars' widths
        self.sb = []

        // Left sidebar id
        let lid = sides[0].includes(idxs[0]) ? idxs[0] : null
        self.sb.push(self.scales[lid] ? self.scales[lid].sb : 0)

        // Right sidebar id
        let rid = sides[1].includes(idxs[1]) ? idxs[1] : null
        self.sb.push(self.scales[rid] ? self.scales[rid].sb : 0)

    }

    // Merge current selected scale with x-axis variables
    function mergeScale() {
        let sb = self.sb // save scale pair
        Object.assign(self, self.scales[self.scaleIndex])
        self.sb = sb

        // If there are no overlays/scales
        self.ys = self.ys || []
    }

    makeScales()
    selectSidebars()

    return {
        // First we need to calculate max sidebar width
        // (among all grids). Then we can actually make
        // them
        create: () => {
            gridX()
            applySizes()

            // Link to the master grid (candlesticks)
            if (mainGrid) {
                self.mainGrid = mainGrid
            }

            self.settings = settings // Grid params
            self.main = !mainGrid // Main grid or not
            self.id = id // Grid Id

            mergeScale() // Merge selected scale

            // Here we add some helpful functions for
            // plugin creators
            return layoutFn(self, range)

        },
        getLayout: () => self,
        setMaxSidebar: v => self.sbMax = v,
        getSidebar: () => self.sb,
        id: () => id
    }
}

export default GridMaker
