
// Parser of [OVERLAY] section

// TODO: add support of imports
// (imports functions from other .navy scripts)

// TODO: check overlay names collisions, when [export=true]

// TODO: way to define primitives, maybe with [PRIMITIVE] tag

import tools from './tools.js'

// Functions with brackets: fname() { }
const FREGX1 = /(function[\s]+|)([$A-Z_][0-9A-Z_$\.]*)[\s]*?\(([^()]*?)\)[\s]*?{/gmi
const FREGX2 = /(function[\s]+|)([$A-Z_][0-9A-Z_$\.]*)[\s]*?\(([^()]*?)\)[\s]*?=>[\s]*?{/gmi
const FREGX3 = /(function[\s]+|)([$A-Z_][0-9A-Z_$\.]*)[\s]*?\(([^()]*?)\)[\s]*?=>/gmi

const KWORDS = ['if', 'for', 'while', 'switch', 'catch', 'with']

export default class ParserOV {

    constructor(tagProps, src) {

        this.tagProps = this.parseTagProps(tagProps)
        this.src = src
        this.flags = ''

        this.parseBody()

    }

    parseTagProps(src) {

        let obj = {}
        let pairs = src.split(',')
        for (var p of pairs) {
            let [key, val] = p.split('=')
            obj[key.trim()] = val.trim()
        }
        return obj

    }

    parseBody() {

        let code = tools.decomment(this.src)
        code = this.prepFuncions1(code)
        code = this.prepFuncions2(code)
        code = this.prepFuncions3(code)

        this.prefab = this.wrapTheCode(code, this.flags)

    }

    // Find all function declarations & replace them with
    // arrow functions (first category: f() {} )
    prepFuncions1(code) {
        let copy = ''
        let i = 0
        FREGX1.lastIndex = 0
        do {
            var m = FREGX1.exec(code)
            if (m) {
                let fkeyword = m[1].trim()
                let fname = m[2]
                let fargs = m[3]

                // Skipping the function code block
                let open = FREGX1.lastIndex - 1
                let close = tools.findClosingBracket(code, open)

                if (!KWORDS.includes(fname)) {
                    let block = code.slice(open, close + 1)
                    copy += code.slice(i, m.index)
                    copy += `var ${fname} = (${fargs}) => ${block}`
                    this.parseFlags(fname, fargs, block)
                } else {
                    copy += code.slice(i, close+1)
                }

                FREGX1.lastIndex = close
                i = close + 1

            }
        } while (m)
        return copy + code.slice(i) // The rest
    }

    // Find all function declarations & replace them with
    // arrow functions (third category: f() => {})
    prepFuncions2(code) {
        let copy = ''
        let i = 0
        FREGX2.lastIndex = 0
        do {
            var m = FREGX2.exec(code)
            if (m) {
                let fkeyword = m[1].trim()
                let fname = m[2]
                let fargs = m[3]

                // Skipping the function code block
                let open = FREGX2.lastIndex - 1
                let close = tools.findClosingBracket(code, open)

                if (!KWORDS.includes(fname)) {
                    let block = code.slice(open, close + 1)
                    copy += code.slice(i, m.index)
                    copy += `var ${fname} = (${fargs}) => (${block})`
                    this.parseFlags(fname, fargs, block)
                } else {
                    copy += code.slice(i, close+1)
                }

                FREGX2.lastIndex = close
                i = close + 1

            }
        } while (m)
        return copy + code.slice(i) // The rest
    }

    // Find all function declarations & replace them with
    // arrow functions (third category: f() => Expression)
    prepFuncions3(code) {
        let copy = ''
        let i = 0
        FREGX3.lastIndex = 0
        do {
            var m = FREGX3.exec(code)
            if (m) {
                let fkeyword = m[1].trim()
                let fname = m[2]
                let fargs = m[3]

                let arrow = FREGX3.lastIndex

                copy += code.slice(i, m.index)
                copy += `var ${fname} = (${fargs}) => `
                let block = code.slice(arrow).split('\n')[0].trim()
                this.parseFlags(fname, fargs, block)

                i = arrow + 1

            }
        } while (m)
        return copy + code.slice(i) // The rest
    }

    // Add some flag for the future use (e.g. in layout)
    parseFlags(name, fargs, block) {
        if (name === 'yRange') {
            let x = !!fargs.trim().length
            this.flags += `yRangePreCalc: ${x},\n`
        } else if (name === 'legend') {
            if (block === 'null' || block === 'undefined') {
                this.flags += `noLegend: true,\n`
            }
        }
    }

    // Create a function that returns a new overlay object
    wrapTheCode(code, flags) {
        return new Function('env', `

            // Setup the environment
            let { $core, $props, $events } = env
            let prop = (...args) => env.prop(...args)
            let watchProp = (...args) => env.watchProp(...args)

            // Add primitives
            let $lib = env.lib

            // Function stubs
            var init = () => {}
            var destroy = () => {}
            var meta = () => null
            var dataFormat = () => null
            var draw = () => {}
            var drawSidebar = null
            var drawBotbar = null
            var yRange = null
            var preSampler = null
            var legend = null
            var legendHtml = null
            var valueTracker = null
            var ohlc = null

            // Event handler stubs
            var mousemove = null
            var mouseout = null
            var mouseup = null
            var mousedown = null
            var click = null
            var keyup = null
            var keydown = null
            var keypress = null

            // Overlay code
            ${code}

            // Output overlay object
            return {
                gridId: () => $core.layout.id,
                id: () => $core.id,
                init, destroy, meta, dataFormat,
                draw, drawSidebar, drawBotbar,
                yRange, preSampler,
                legend, legendHtml,
                valueTracker, ohlc,
                mousemove, mouseout, mouseup,
                mousedown, click, keyup, keydown,
                keypress,
                // Generated flags
                ${flags}
            }
        `);
    }
}
