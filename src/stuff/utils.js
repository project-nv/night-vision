
import IndexedArray from 'arrayslicer'
import Const from './constants.js'

const {
    MINUTE, MINUTE5, MINUTE15, HOUR, HOUR4,
    DAY, WEEK, MONTH, YEAR
} = Const

export default {

    clamp(num, min, max) {
        return num <= min ? min : num >= max ? max : num
    },

    addZero(i) {
        if (i < 10) {
            i = "0" + i;
        }
        return i
    },

    // Start of the day (zero millisecond)
    dayStart(t) {
        let start = new Date(t)
        return start.setUTCHours(0,0,0,0)
    },

    // Start of the month
    monthStart(t) {
        let date = new Date(t)
        return Date.UTC(
            date.getFullYear(),
            date.getMonth(), 1
        )
    },

    // Start of the year
    yearStart(t) {
        return Date.UTC(new Date(t).getFullYear())
    },

    getYear(t) {
        if (!t) return undefined
        return new Date(t).getUTCFullYear()
    },

    getMonth(t) {
        if (!t) return undefined
        return new Date(t).getUTCMonth()
    },

    // Nearest in array
    nearestA(x, array) {
        let dist = Infinity
        let val = null
        let index = -1
        for (var i = 0; i < array.length; i++) {
            var xi = array[i]
            if (Math.abs(xi - x) < dist) {
                dist = Math.abs(xi - x)
                val = xi
                index = i
            }
        }
        return [index, val]
    },

    // Nearest value by time (in timeseries)
    nearestTs(t, ts) {
        let dist = Infinity
        let val = null
        let index = -1
        for (var i = 0; i < ts.length; i++) {
            var ti = ts[i][0]
            if (Math.abs(ti - t) < dist) {
                dist = Math.abs(ti - t)
                val = ts[i]
                index = i
            }
        }
        return [index, val]
    },

    // Nearest value by index (in timeseries)
    nearestTsIb(i, ts, offset) {
        let index = Math.floor(i - offset) + 1
        let val = ts[index] || null
        return [index, val]
    },

    round(num, decimals = 8) {
        return parseFloat(num.toFixed(decimals))
    },

    // Strip? No, it's ugly floats in js
    strip(number) {
        return parseFloat(
            parseFloat(number).toPrecision(12)
        )
    },

    getDay(t) {
        return t ? new Date(t).getDate() : null
    },

    // Update array keeping the same reference
    overwrite(arr, new_arr) {
        arr.splice(0, arr.length, ...new_arr)
    },

    // Get full list of overlays on all panes
    allOverlays(panes = []) {
        return panes.map(x => x.overlays || []).flat()
    },

    // Detects a timeframe of the data
    detectTimeframe(data) {
        let len = Math.min(data.length - 1, 99)
        let min = Infinity
        data.slice(0, len).forEach((x, i) => {
            let d = data[i+1][0] - x[0]
            if (d === d && d < min) min = d
        })
        // This saves monthly chart from being awkward
        if (min >= Const.MONTH && min <= Const.DAY * 30) {
            return Const.DAY * 31
        }
        return min
    },

    // Fast filter. Really fast, like 10X
    fastFilter(arr, t1, t2) {
        if (!arr.length) return [arr, undefined]
        try {
            let ia = new IndexedArray(arr, "0")
            let res = ia.getRange(t1, t2)
            let i0 = ia.valpos[t1].next
            return [res, i0]
        } catch(e) {
            // Something wrong with fancy slice lib
            // Fast fix: fallback to filter
            return [arr.filter(x =>
                x[0] >= t1 && x[0] <= t2
            ), 0]
        }
    },

    // Fast filter 2 (returns indices)
    fastFilter2(arr, t1, t2) {
        if (!arr.length) return [arr, undefined]
        try {
            let ia = new IndexedArray(arr, "0")

            // fetch start and default to the next index above
            ia.fetch(t1)
            let start = ia.cursor || ia.nexthigh

            // fetch finish and default to the next index below
            ia.fetch(t2)
            let finish = ia.cursor || ia.nextlow

            return [start, finish+1]
        } catch(e) {
            // Something wrong with fancy slice lib
            // Fast fix: fallback to filter
            let subset = arr.filter(x =>
                x[0] >= t1 && x[0] <= t2
            )
            let i1 = arr.indexOf(subset[0])
            let i2 = arr.indexOf(subset[subset.length - 1])

            return [i1, i2]
        }
    },

    // Fast filter (index-based)
    fastFilterIB(arr, t1, t2) {
        if (!arr.length) return [undefined, undefined]
        let i1 =  Math.floor(t1)
        if (i1 < 0) i1 = 0
        let i2 =  Math.floor(t2 + 1)
        //let res = arr.slice(i1, i2)
        return [i1, i2]
    },

    // Nearest indexes (left and right)
    fastNearest(arr, t1) {
        let ia = new IndexedArray(arr, "0")
        ia.fetch(t1)
        return [ia.nextlow, ia.nexthigh]
    },

    now() { return (new Date()).getTime() },

    pause(delay) {
        return new Promise((rs, rj) => setTimeout(rs, delay))
    },

    // Limit crazy wheel delta values
    smartWheel(delta) {
        let abs = Math.abs(delta)
        if (abs > 500) {
            return (200 + Math.log(abs)) * Math.sign(delta)
        }
        return delta
    },

    // Parse the original mouse event to find deltaX
    getDeltaX(event) {
        return event.originalEvent.deltaX / 12
    },

    // Parse the original mouse event to find deltaY
    getDeltaY(event) {
        return event.originalEvent.deltaY / 12
    },

    // Apply opacity to a hex color
    applyOpacity(c, op) {
        if (c.length === 7) {
            let n = Math.floor(op * 255)
            n = this.clamp(n, 0, 255)
            c += n.toString(16)
        }
        return c
    },

    // Parse timeframe or return value in ms
    // TODO: add full parser
    // (https://github.com/tvjsx/trading-vue-js/
    // blob/master/src/helpers/script_utils.js#L98)
    parseTf(smth) {
        if (typeof smth === 'string') {
            return Const.MAP_UNIT[smth]
        } else {
            return smth
        }
    },

    // Detect index shift between the main data subset
    // and the overlay's subset (for IB-mode)
    indexShift(sub, data) {

        // Find the second timestamp (by value)
        if (!data.length) return 0
        let first = data[0][0]
        let second

        for (var i = 1; i < data.length; i++) {
            if (data[i][0] !== first) {
                second = data[i][0]
                break
            }
        }

        for (var j = 0; j < sub.length; j++) {
            if (sub[j][0] === second) {
                return j - i
            }
        }

        return 0
    },

    // Fallback fix for Brave browser
    // https://github.com/brave/brave-browser/issues/1738
    measureText(ctx, text, nvId) {
        let m = ctx.measureTextOrg(text)
        if (m.width === 0) {
            const doc = document
            const id = 'nvjs-measure-text'
            let el = doc.getElementById(id)
            if (!el) {
                let base = doc.getElementById(nvId)
                el = doc.createElement("div")
                el.id = id
                el.style.position = 'absolute'
                el.style.top = '-1000px'
                base.appendChild(el)
            }
            if(ctx.font) el.style.font = ctx.font
            el.innerText = text.replace(/ /g, '.');
            return { width: el.offsetWidth }
        } else {
            return m
        }
    },

    uuid(temp = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx') {
        return temp
            .replace(/[xy]/g, c => {
            var r = Math.random() * 16 | 0, v = c == 'x' ?
                r :
                (r & 0x3 | 0x8)
            return v.toString(16)
        })
    },

    uuid2() {
        return this.uuid('xxxxxxxxxxxx')
    },

    uuid3() {
        return Math.random().toString().slice(2).replace(/^0+/, '')
    },

    // Delayed warning, f = condition lambda fn
    warn(f, text, delay = 0) {
        setTimeout(() => {
            if (f()) console.warn(text)
        }, delay)
    },

    // Checks if script props updated
    // (and not style settings or something else)
    /*isScrPropsUpd(n, prev) {
        let p = prev.find(x => x.v.$uuid === n.v.$uuid)
        if (!p) return false

        let props = n.p.settings.$props
        if (!props) return false

        return props.some(x => n.v[x] !== p.v[x])
    },*/

    // Checks if it's time to make a script update
    // (based on execInterval in ms)
    delayedExec(v) {
        if (!v.script || !v.script.execInterval)
            return true
        let t = this.now()
        let dt = v.script.execInterval
        if (!v.settings.$last_exec ||
            t > v.settings.$last_exec + dt) {
            v.settings.$last_exec = t
            return true
        }
        return false
    },

    // Format names such 'RSI, $length', where
    // length - is one of the settings
    formatName(ov) {
        if (!ov.name) return undefined

        let name = ov.name

        for (var k in ov.settings || {}) {
            let val = ov.settings[k]
            let reg = new RegExp(`\\$${k}`, 'g')
            name = name.replace(reg, val)
        }

        return name
    },

    // Default cursor mode
    xMode() {
        return this.is_mobile ? 'explore' : 'default'
    },

    defaultPrevented(event) {
        if (event.original) {
            return event.original.defaultPrevented
        }
        return event.defaultPrevented
    },

    // Get a view from the data by the name
    /*view(data, name) {
        if (!data.views) return data
        let v = data.views.find(x => x.name === name)
        if (!v) return data
        return v.data
    },*/

    /*concatArrays(arrays) {
        var acc = []
        for (var a of arrays) {
            acc = acc.concat(a)
        }
        return acc
    },*/

    // Call
    afterAll(object, f, time) {
        clearTimeout(object.__afterAllId__)
        object.__afterAllId__ = setTimeout(() => f(), time)
    },

    // Default auto-precision sampler for a generic
    // timeseries-element: [time, x1, x2, x3, ...]
    defaultPreSampler(el) {
        if (!el) return []
        let out = []
        for (var i = 1; i < el.length; i++) {
            if (typeof el[i] === 'number') {
                out.push(el[i])
            }
        }
        return out
    },

    // Get scales by side id (0 - left, 1 - right)
    getScalesBySide(side, layout) {
        if (!layout) return []
        let template = layout.settings.scaleTemplate
        return template[side]
            .map(id => layout.scales[id])
            .filter(x => x) // Clean undefined
    },

    // If scaleTemplate is changed there could be a
    // situation when user forget to reset scaleSideIdxs.
    // Here we attemp to get them in sync
    autoScaleSideId(S, sides, idxs) {
        if (sides[S].length) {
            if (!idxs[S] || !sides[S].includes(idxs[S])) {
                idxs[S] = sides[S][0]
            }
        } else {
            idxs[S] = undefined
        }
    },

    // Debug function, shows how many times
    // this method is called per second
    callsPerSecond() {
        if (window.__counter__ === undefined) {
            window.__counter__ = 0
        }
        window.__counter__++
        if (window.__cpsId__) return
        window.__cpsId__ = setTimeout(() => {
            console.log(window.__counter__, 'upd/sec')
            window.__counter__ = 0
            window.__cpsId__ = null
        }, 1000)
    },

    // Calculate an index offset for a timeseries
    // against the main ts. (for indexBased mode)
    findIndexOffset(mainTs, ts) {
        let set1 = {} // main set of time => index
        let set2 = {} // another set
        for (var i = 0; i < mainTs.length; i++) {
            set1[mainTs[i][0]] = i
        }
        for (var i = 0; i < ts.length; i++) {
            set2[ts[i][0]] = i
        }
        let deltas = []
        for (var t in set2) {
            if (set1[t] !== undefined) {
                let d = set1[t] - set2[t]
                if (!deltas.length || deltas[0] === d) {
                    deltas.unshift(d)
                }
                // 3 equal deltas means that we likely found
                // the true index offset
                if (deltas.length === 3) {
                    return deltas.pop()
                }
            }
        }
        return 0 // We didn't find the offset
    },

    // Format cash values
    formatCash(n) {
        if (n == undefined) return 'x'
        if (typeof n !== 'number') return n
        if (n < 1e3) return n.toFixed(0)
        if (n >= 1e3 && n < 1e6) return +(n / 1e3).toFixed(2) + "K"
        if (n >= 1e6 && n < 1e9) return +(n / 1e6).toFixed(2) + "M"
        if (n >= 1e9 && n < 1e12) return +(n / 1e9).toFixed(2) + "B"
        if (n >= 1e12) return +(n / 1e12).toFixed(2) + "T"
    },

    // Time range of a data subset (from i0 to iN-1)
    realTimeRange(data) {
        if (!data.length) return 0
        return data[data.length - 1][0] - data[0][0]
    },

    // Get sizes left and right parts of a number
    // (11.22 -> ['11', '22'])
    numberLR(x) {
        var str = x != null ? x.toString() : ''
        if (x < 0.000001) {
            // Parsing the exponential form. Gosh this
            // smells trickily
            var [ls, rs] = str.split('e-')
            var [l, r] = ls.split('.')
            if (!r) r = ''
            r = { length: r.length + parseInt(rs) || 0 }
        } else {
            var [l, r] = str.split('.')
        }
        return [l.length, r ? r.length : 0]
    },

    // Get a hash of current overlay disposition:
    // pane1.uuid+ov1.type+ov2.type+...+pane2.uuid+...
    ovDispositionHash(panes) {
        let h = ''
        for (var pane of panes) {
            h += pane.uuid
            for (var ov of pane.overlays) {
                if (ov.main) continue
                h += ov.type
            }
        }
        return h
    },

    // Format cursor event for the '$cursor-update' hook
    // TODO: doesn't work for renko
    makeCursorEvent($cursor, cursor, layout) {
        $cursor.values = cursor.values
        $cursor.ti = cursor.ti
        $cursor.time = cursor.time
        $cursor.ohlcCoord = () => {
            let ohlc = layout.main.ohlc(cursor.time)
            return ohlc ? {
                x: layout.main.time2x(cursor.ti),
                ys: ohlc.map(x => layout.main.value2y(x))
            } : null;
        }
        return $cursor
    },

    // Adjust mouse coords to fix the shift caused by 
    // css transforms
    adjustMouse(event, canvas) {
       
        const rect = canvas.getBoundingClientRect();

        // Calculate the adjusted coordinates
        const adjustedX = event.clientX - rect.left;
        const adjustedY = event.clientY - rect.top;

        return new Proxy(event, {
            get(target, prop) {
                // Intercept access to layerX and layerY
                if (prop === 'layerX') {
                    return adjustedX;
                } else if (prop === 'layerY') {
                    return adjustedY;
                }

                // Ensure methods like preventDefault keep their original context
                if (typeof target[prop] === 'function') {
                    return target[prop].bind(target);
                }

                // Default behavior for other properties
                return target[prop];
            }
        });

    },

    // GPT to the moon!
    getCandleTime(tf) {
        const now = new Date(),
            h = now.getUTCHours(),
            m = now.getUTCMinutes(),
            s = now.getUTCSeconds(),
            Mo = now.getUTCMonth(),
            D = now.getUTCDay(),
            Y = now.getUTCFullYear();

        let rt; 

        switch (tf) {
            case MINUTE:
                rt = 60 - s;
                return `00:${rt < 10 ? '0' : ''}${rt}`;
            case MINUTE5:
                rt = 5 * 60 - (m % 5) * 60 - s;
                return `${Math.floor(rt / 60)}:${rt % 60 < 10 ? '0' : ''}${rt % 60}`;
            case MINUTE15:
                rt = 15 * 60 - (m % 15) * 60 - s;
                return `${Math.floor(rt / 60)}:${rt % 60 < 10 ? '0' : ''}${rt % 60}`;
            case HOUR:
                rt = 60 * 60 - m * 60 - s;
                return `${(Math.floor(rt % 3600 / 60) + '').padStart(2, '0')}:` +
                    `${(rt % 60 + '').padStart(2, '0')}`;
            case HOUR4:
                rt = 4 * 60 * 60 - (h % 4) * 3600 - m * 60 - s;
                const hours = Math.floor(rt / 3600);
                const minutes = Math.floor(rt % 3600 / 60);
                if (hours === 0) {
                    return `${minutes}:${(rt % 60 + '').padStart(2, '0')}`;
                } else {
                    return `${hours}:${(minutes + '').padStart(2, '0')}:${(rt % 60 + '').padStart(2, '0')}`;
                }
            case DAY:
                rt = 24 * 60 * 60 - h * 3600 - m * 60 - s;
                return `${Math.floor(rt / 3600)}:` +
                    `${(Math.floor(rt % 3600 / 60) + '').padStart(2, '0')}:` +
                    `${(rt % 60 + '').padStart(2, '0')}`;
            case WEEK:
                rt = 7 * 24 * 60 * 60 - (D || 7) * 24 * 60 * 60 - h * 3600 - m * 60 - s;
                return `${Math.floor(rt / (24 * 3600))}d ${Math.floor(rt % (24 * 3600) / 3600)}h`;
            case MONTH:
                const endOfMonth = new Date(Date.UTC(now.getUTCFullYear(), Mo + 1, 1));
                rt = (endOfMonth - now) / 1000;
                return `${Math.floor(rt / (24 * 3600))}d ${Math.floor(rt % (24 * 3600) / 3600)}h`;
            case YEAR:
                const startOfYear = new Date(Date.UTC(Y, 0, 1));
                const endOfYear = new Date(Date.UTC(Y + 1, 0, 1));
                const totalSecondsInYear = (endOfYear - startOfYear) / 1000;
                rt = totalSecondsInYear - ((now - startOfYear) / 1000);
                return `${Math.floor(rt / (24 * 3600))}d ${Math.floor(rt % (24 * 3600) / 3600)}h`;
            default:
                return "Unk TF";
        }
    },

    // WTF with modern web development
    isMobile: (w => 'onorientationchange' in w &&
       (!!navigator.maxTouchPoints ||
        !!navigator.msMaxTouchPoints ||
        ('ontouchstart' in w ||
        (w.DocumentTouch &&
        document instanceof w.DocumentTouch))))
        (typeof window !== 'undefined' ? window : {})

}
