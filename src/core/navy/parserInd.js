
// Parser of [INDICATOR] section

import tools from './tools.js'

const SPLIT = /\[[\s]*?UPDATE[\s]*?\]|\[[\s]*?POST[\s]*?\]/gm
const UPDATE = /\[[\s]*?UPDATE[\s]*?\]([\s\S]*?)(\[POST|\[UPDATE|\[EOF)/gm
const POST = /\[[\s]*?POST[\s]*?\]([\s\S]*?)(\[POST|\[UPDATE|\[EOF)/gm

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

        SPLIT.lastIndex = 0
        UPDATE.lastIndex = 0
        POST.lastIndex = 0

        let code = tools.decomment(this.src)

        this.init = code.split(SPLIT)[0]
        code += '\n[EOF]'
        this.update = (UPDATE.exec(code) || [])[1]
        this.post = (POST.exec(code) || [])[1]

    }
}
