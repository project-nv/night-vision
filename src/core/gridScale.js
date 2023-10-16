
// Grid scale is a part of layout that can vary
// depending on overlay (values that correspond to y-axis)

// TODO: feature: display only overlays on the current scale

import Const from '../stuff/constants.js'
import Utils from '../stuff/utils.js'
import math from '../stuff/math.js'
import logScale from './logScale.js'
import MetaHub from '../core/metaHub.js'
import ScriptHub from '../core/scripts.js'

const { $SCALES } = Const
const MAX_INT = Number.MAX_SAFE_INTEGER

export default function Scale(id, src, specs) {

    let { hub, props, settings, height } = specs
    let { ctx } = props
    let meta = MetaHub.instance(props.id)
    let prefabs = ScriptHub.instance(props.id).prefabs
    let self = {}
    let yt = (meta.yTransforms[src.gridId] || [])[id]
    let gridId = src.gridId
    let ovs = src.ovs
    let ls = src.log
    const SAMPLE = props.config.AUTO_PRE_SAMPLE

    function calcSidebar() {

        let maxlen = Math.max(...ovs.map(x => x.dataSubset.length))

        if (maxlen < 2) {
            self.prec = 0
            self.sb = props.config.SBMIN
            return
        }
        // TODO: add custom formatter f()
        if (src.precision !== undefined) {
            self.prec = src.precision
        } else {
            self.prec = 0
            // Find max precision over all overlays on
            // this scale
            for (var ov of ovs) {
                if (ov.settings.precision !== undefined) {
                    var prec = ov.settings.precision
                } else {
                    var prec = calcPrecision(ov)
                }
                if (prec > self.prec) self.prec = prec
            }

        }
        if (!isFinite(self.$hi) || !isFinite(self.$lo) ) {
            self.sb = props.config.SBMIN
            return
        }
        let lens = []
        lens.push(self.$hi.toFixed(self.prec).length)
        lens.push(self.$lo.toFixed(self.prec).length)
        let str = '0'.repeat(Math.max(...lens)) + '    '
        self.sb = ctx.measureText(str).width
        self.sb = Math.max(Math.floor(self.sb), props.config.SBMIN)
        self.sb = Math.min(self.sb, props.config.SBMAX)

        // Prevent sb calculation before meta data
        // extracted  from the scripts
        // if (!meta.ready) self.sb = props.config.SBMIN
    }

    // Calc vertical value range
    function calc$Range() {
        // Need to find minimum & maximum of selected
        // set of overlays (on the same scale)
        var hi = -Infinity, lo = Infinity
        for (var ov of ovs) {
            if (ov.settings.display === false) continue
            let yfn = (meta.yRangeFns[gridId] || [])[ov.id]
            let yfnStatic = prefabs[ov.type].static.yRange 
            if (yfnStatic) {
                yfn = { 
                    exec: yfnStatic,
                    preCalc: yfnStatic.length > 1 // Do we need h & l
                }
            }
            let data = ov.dataSubset
            // Intermediate hi & lo
            var h = -Infinity, l = Infinity
            // Look for a user-defined y-range f()
            // or calculate through iteration. 'preCalc'
            // flag tells if pre-calculated h&l needed
            // TODO: implement a global auto-precision algo
            if (!yfn || (yfn && yfn.preCalc)) {
                for (var i = 0; i < data.length; i++) {
                    for (var j = 1; j < data[i].length; j++) {
                        let v = data[i][j]
                        if (v > h) h = v
                        if (v < l) l = v
                    }
                }
            }
            if (yfn) {
                // Check if result is 'null', then this overlay
                // should not affect the range at all
                var yfnResult = yfn.exec(data, h, l)
                if (yfnResult) {
                    var [h, l, exp] = yfnResult
                } else {
                    var [h, l] = [hi, lo]
                }
            }

            // maximum & minimum over all overlays
            if (h > hi) hi = h
            if (l < lo) lo = l
        }

        // Fixed y-range in non-auto mode
        if (yt && !yt.auto && yt.range) {
            self.$hi = yt.range[0]
            self.$lo = yt.range[1]
        } else {
            if (!ls) {
                exp = exp === false ? 0 : 1
                self.$hi = hi + (hi - lo) * props.config.EXPAND * exp
                self.$lo = lo - (hi - lo) * props.config.EXPAND * exp
            } else {
                self.$hi = hi
                self.$lo = lo
                logScale.expand(self, height)
            }

            if (self.$hi === self.$lo) {
                if (!ls) {
                    self.$hi *= 1.05  // Expand if height range === 0
                    self.$lo *= 0.95
                } else {
                    logScale.expand(self, height)
                }
            }
        }
    }

    // Calculate $ precision for the Y-axis of an overlay
    function calcPrecision(ov) {

        // Maximum digits after floating point
        let maxR = 0
        let sample = []

        // Sample N random elements from the current subset
        let f = meta.getPreSampler(gridId, ov.id)
        f = f || prefabs[ov.type].static.preSampler 
        f = f || Utils.defaultPreSampler
        for (var i = 0; i < SAMPLE; i++) {
            // Random element n
            let n = Math.floor(Math.random() * ov.dataSubset.length)
            let x = f(ov.dataSubset[n])
            if (typeof x === 'number') sample.push(x)
            else sample = sample.concat(x)
        }

        sample.forEach(x => {
            let right = Utils.numberLR(x)[1]
            if (right > maxR) maxR = right
        })

        // Update stored auto-precision
        let aprec = meta.getAutoPrec(gridId, ov.id)
        if (aprec === undefined || maxR > aprec) {
            meta.setAutoPrec(gridId, ov.id, maxR)
            return maxR
        }
        return aprec

    }

    function calcTransform() {
        // Candle Y-transform: (A = scale, B = shift)
        if (!ls) {
            self.A = - height / (self.$hi - self.$lo)
            self.B = - self.$hi * self.A
        } else {
            self.A = - height / (math.log(self.$hi) -
                       math.log(self.$lo))
            self.B = - math.log(self.$hi) * self.A
        }
    }

    // Select nearest good-loking $ step (m is target scale)
    function dollarStep() {
        let yrange = self.$hi - self.$lo
        let m = yrange * (props.config.GRIDY / height)
        let p = parseInt(yrange.toExponential().split('e')[1])
        let d = Math.pow(10, p)
        let s = $SCALES.map(x => x * d)

        // TODO: center the range (look at RSI for example,
        // it looks ugly when "80" is near the top)
        return Utils.strip(Utils.nearestA(m, s)[1])
    }

    function dollarMult() {
        let mult_hi = dollarMultHi()
        let mult_lo = dollarMultLo()
        return Math.max(mult_hi, mult_lo)
    }

    // Price step multiplier (for the log-scale mode)
    function dollarMultHi() {

        let h = Math.min(self.B, height)
        if (h < props.config.GRIDY) return 1
        let n = h / props.config.GRIDY // target grid N
        let yrange = self.$hi
        if (self.$lo > 0) {
            var yratio = self.$hi / self.$lo
        } else {
            yratio = self.$hi / 1 // TODO: small values
        }
        let m = yrange * (props.config.GRIDY / h)
        let p = parseInt(yrange.toExponential().split('e')[1])
        return Math.pow(yratio, 1/n)
    }

    function dollarMultLo() {

        let h = Math.min(height - self.B, height)
        if (h < props.config.GRIDY) return 1
        let n = h / props.config.GRIDY // target grid N
        let yrange = Math.abs(self.$lo)
        if (self.$hi < 0 && self.$lo < 0) {
            var yratio = Math.abs(self.$lo / self.$hi)
        } else {
            yratio = Math.abs(self.$lo) / 1
        }
        let m = yrange * (props.config.GRIDY / h)
        let p = parseInt(yrange.toExponential().split('e')[1])
        return Math.pow(yratio, 1/n)
    }

    // Build the Y-axis grid (non-log mode)
    function gridY() {

        // Prevent duplicate levels
        let m = Math.pow(10, -self.prec)
        self.$step = Math.max(m, dollarStep())
        self.ys = []

        let y1 = self.$lo - self.$lo % self.$step

        for (var y$ = y1; y$ <= self.$hi; y$ += self.$step) {
            let y = Math.floor(y$ * self.A + self.B)
            if (y > height) continue
            self.ys.push([y, Utils.strip(y$)])
        }

    }

    // Build the Y-axis grid (log mode)
    function gridYLog() {

        // TODO: Prevent duplicate levels, is this even
        // a problem here ?
        self.$_mult = dollarMult()
        self.ys = []

        let v = (self.$hi + self.$lo) / 2 // Use mid point
        let y1 = searchStartPos(v)
        let y2 = searchStartNeg(-v)
        let yp = -Infinity // Previous y value
        let n = height / props.config.GRIDY // target grid N

        let q = 1 + (self.$_mult - 1) / 2

        // Over 0
        for (var y$ = y1; y$ > 0; y$ /= self.$_mult) {
            y$ = logRounder(y$, q)
            let y = Math.floor(math.log(y$) * self.A + self.B)
            self.ys.push([y, Utils.strip(y$)])
            if (y > height) break
            if (y - yp < props.config.GRIDY * 0.7) break
            if (self.ys.length > n + 1) break
            yp = y
        }

        // Under 0
        yp = Infinity
        for (var y$ = y2; y$ < 0; y$ /= self.$_mult) {
            y$ = logRounder(y$, q)
            let y = Math.floor(math.log(y$) * self.A + self.B)
            if (yp - y < props.config.GRIDY * 0.7) break
            self.ys.push([y, Utils.strip(y$)])
            if (y < 0) break
            if (self.ys.length > n * 3 + 1) break
            yp = y
        }

        // TODO: remove lines near to 0

    }

    // Search a start for the top grid so that
    // the fixed value always included
    function searchStartPos(value) {
        let N = height / props.config.GRIDY // target grid N
        var y = Infinity, y$ = value, count = 0
        while (y > 0) {
            y = Math.floor(math.log(y$) * self.A + self.B)
            y$ *= self.$_mult
            if (count++ > N * 3) return 0 // Prevents deadloops
        }
        return y$
    }

    function searchStartNeg(value) {
        let N = height / props.config.GRIDY // target grid N
        var y = -Infinity, y$ = value, count = 0
        while (y < height) {
            y = Math.floor(math.log(y$) * self.A + self.B)
            y$ *= self.$_mult
            if (count++ > N * 3) break // Prevents deadloops
        }
        return y$
    }

    // Make log scale levels look great again
    function logRounder(x, quality) {
        let s = Math.sign(x)
        x = Math.abs(x)
        if (x > 10) {
            for (var div = 10; div < MAX_INT; div *= 10) {
                let nice = Math.floor(x / div) * div
                if (x / nice > quality) {  // More than 10% off
                    break
                }
            }
            div /= 10
            return s * Math.floor(x / div) * div
        } else if (x < 1) {
            for (var ro = 10; ro >= 1; ro--) {
                let nice = Utils.round(x, ro)
                if (x / nice > quality) {  // More than 10% off
                    break
                }
            }
            return s * Utils.round(x, ro + 1)
        } else {
            return s * Math.floor(x)
        }
    }

    calc$Range()
    calcSidebar()
    calcTransform()

    ;ls ? gridYLog() : gridY()

    // Indices of the overlays using this scale (ovIdxs).
    // Needed when the final layout is built
    // (see overlayEnv)
    self.scaleSpecs = {
        id: id,
        log: src.log,
        ovIdxs: src.ovIdxs
    }
    self.height = height

    return self

}
