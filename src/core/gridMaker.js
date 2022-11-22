import Const from '../stuff/constants.js'
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

    let { hub, meta, props, settings, height } = specs
    let { interval, timeFrame, range, ctx, timezone } = props

    let y_t = null // TODO: implement
    let ls = !!settings.logScale // Pane's log scale

    // All overlays
    let ovs = hub.panes()[id].overlays

    // Main data
    let data = hub.mainOv.dataSubset
    let view = hub.mainOv.dataView

    // Layout object
    let self = { indexBased: hub.indexBased }

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
        let k = self.indexBased ? timeFrame : 1
        let xrange = (range[1] - range[0]) * k
        let m = xrange * (props.config.GRIDX / props.width)
        let s = TIMESCALES
        return Utils.nearestA(m, s)[1]
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

            // Real dt determened by the data

            let realDt = Utils.realTimeRange(data)
            if (!self.indexBased) realDt = dt

            // Fix calculation of fixOffset in the index-based mode,
            // when showing dataSubset partially
            if (self.indexBased && range[1] - view.src.length > 0) {
                let k = 1 - (range[1] - view.src.length) / dt
                realDt /= k
            }
            // We should start outside of the screen to make marks
            // presistent. Good starting points: start of a month,
            // and start of a year
            let fixOffset = realDt / DAY > 10
            let fixOffset2 = realDt / MONTH > 10
            let i0 = view.i1
            if (fixOffset2) {
                i0 = findYearStart(view.i1)
            } else if (fixOffset) {
                i0 = findMonthStart(view.i1)
            }
            for (var i = i0, n = view.i2; i <= n; i++) {
                let p = view.src[i]
                let prev = view.src[i-1] || []
                let prev_xs = self.xs[self.xs.length - 1] || [0,[]]
                let ti = self.indexBased ? i : p[0]
                let x = Math.floor((ti - range[0]) * r)

                insertLine(prev, p, x)

                // Filtering lines that are too near
                let xs = self.xs[self.xs.length - 1] || [0, []]

                if (prev_xs === xs) continue

                if (xs[1] - prev_xs[1] < self.tStep * 0.8) {

                    // prev_xs is a higher "rank" label
                    if (xs[2] * xs[3] <= prev_xs[2] * prev_xs[3]) {
                        self.xs.pop()
                    } else {
                        // Otherwise
                        self.xs.splice(self.xs.length - 2, 1)
                    }
                }
            }

            // TODO: fix grid extension for bigger timeframes
            if (!self.indexBased && timeFrame < WEEK && r > 0) {
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

    function findMonthStart(i1) {
        let m0 = Utils.getMonth(view.src[i1][0])
        for (var i = i1 - 1; i >= 0; i--) {
            let mi = Utils.getMonth(view.src[i][0])
            if (mi !== m0) return i
        }
        return 0
    }

    function findYearStart(i1) {
        let y0 = Utils.getYear(view.src[i1][0])
        for (var i = i1 - 1; i >= 0; i--) {
            let yi = Utils.getYear(view.src[i][0])
            if (yi !== y0) return i
        }
        return 0
    }

    function insertLine(prev, p, x, m0) {

        let prevT = prev[0]
        let t = p[0]

        if (timeFrame < DAY) {
            prevT += timezone * HOUR
            t += timezone * HOUR
        }
        let d = timezone * HOUR

        // TODO: take this block =========> (see below)
        if ((prev[0] || timeFrame === YEAR) &&
            Utils.getYear(t) !== Utils.getYear(prevT)) {
            self.xs.push([x, t, YEAR, 1]) // [px, time, rank]
        }
        else if (prev[0] &&
            Utils.getMonth(t) !== Utils.getMonth(prevT)) {
            self.xs.push([x, t, MONTH, 1])
        }
        // TODO: should be added if this day !== prev day
        // And the same for 'botbar.js', TODO(*)
        else if (Utils.dayStart(t) === t) {
            // rank2 = 0 means lower priority
            let r2 = Utils.getDay(t) === 13 ? 0 : 0.9
            self.xs.push([x, t, DAY, r2])
        }
        else if (t % self.tStep === 0) {
            self.xs.push([x, t, timeFrame, 1])
        }
    }

    function extendLeft(dt, r) {

        if (!self.xs.length || !isFinite(r)) return

        let t = self.xs[0][1]
        while (true) {
            t -= self.tStep
            let x = Math.floor((t  - range[0]) * r)
            if (x < 0) break
            // TODO: ==========> And insert it here somehow
            if (t % timeFrame === 0) {
                self.xs.unshift([x, t, timeFrame, 1])
            }
        }
    }

    function extendRight(dt, r) {

        if (!self.xs.length || !isFinite(r)) return

        let t = self.xs[self.xs.length - 1][1]
        while (true) {
            t += self.tStep
            let x = Math.floor((t  - range[0]) * r)
            if (x > self.spacex) break
            if (t % interval === 0) {
                self.xs.push([x, t, interval, 1])
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
            self.ohlc = meta.ohlc.bind(meta)
            return layoutFn(self, range)

        },
        getLayout: () => self,
        setMaxSidebar: v => self.sbMax = v,
        getSidebar: () => self.sb,
        id: () => id
    }
}

export default GridMaker
