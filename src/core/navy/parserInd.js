
// Parser of [INDICATOR] section

import tools from './tools.js'

// Functions with brackets: fname() { }
/*const FREGX1 = /(function[\s]+|)([$A-Z_][0-9A-Z_$\.]*)[\s]*?\(([^()]*?)\)[\s]*?{/gmi
const FREGX2 = /(function[\s]+|)([$A-Z_][0-9A-Z_$\.]*)[\s]*?\(([^()]*?)\)[\s]*?=>[\s]*?{/gmi
const FREGX3 = /(function[\s]+|)([$A-Z_][0-9A-Z_$\.]*)[\s]*?\(([^()]*?)\)[\s]*?=>/gmi

const KWORDS = ['if', 'for', 'while', 'switch', 'catch', 'with']*/

export default class ParserIND {

    constructor(tagProps, src) {

        this.tagProps = this.parseTagProps(tagProps)
        this.src = src

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

        // ...

    }
}
