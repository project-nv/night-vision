
// NavyScript parser

import ParserOV from './parserOv.js'

const VERSION = 0.1
const TAG = 'lite'
const VERS_REGX = /\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*$/gm
const OV_REGX = /\[OVERLAY[\s]+([\s\S]*?)]([\s\S]*?)(\[OVERLAY|\[SCRIPT|\[EOF)/gm

export default class Parser {

    constructor(src, name = 'Unknown Script') {

        this.version = VERSION
        this.src = src + '\n[EOF]'
        this.scriptName = name
        this.scriptVers = this.navyVers()[0]
        this.scriptTag = this.navyVers()[1]
        this.overlays = []
        this.scripts = []

        if (this.scriptVers === 0) {
            console.warn(`${name}: There is no script version string`)
        }

        if (this.scriptVers > this.version) {
            console.warn(`${name}: Script version > parser version`)
        }

        if (this.scriptTag !== TAG) {
            console.warn(
                `${name}: Script version should have 'lite' tag\n` +
                `Most likely are using the community version of NavyJS\n` +
                `with a script written for the PRO version.\n` +
                `If not the case just use 'lite' tag: ${VERSION}-lite`
            )
        }

        this.overlayTags()
    }

    // Parse the version
    navyVers() {

        let first = (this.src.match(VERS_REGX) || [])[0]

        if (first) {
            let pair = first.split('~')
            if (pair.length < 2) return [0]
            let vers = parseFloat(pair[1])
            let tag = pair[1].split('-')[1]

            return [vers === vers ? vers : 0, tag]
        }

        return [0]
    }

    // Parse [OVERLAY] tags
    overlayTags() {
        var match
        while (match = OV_REGX.exec(this.src)) {
            this.overlays.push(new ParserOV(
                match[1],
                match[2]
            ))
            OV_REGX.lastIndex -= 10 // Exclude stopping tags
        }

    }
}
