
// NavyScript parser

import ParserOV from './parserOv.js'
import ParserIND from './parserInd.js'

const VERSION = 0.2
const TAG = 'lite'
const VERS_REGX = /\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*$/gm
const OV_REGX = /\[OVERLAY[\s]+([\s\S]*?)]([\s\S]*?)(\[OVERLAY|\[INDICATOR|\[EOF)/gm
const IND_REGX = /\[INDICATOR[\s]+([\s\S]*?)]([\s\S]*?)(\[OVERLAY|\[INDICATOR|\[EOF)/gm

export default class Parser {

    constructor(src, name = 'Unknown Script') {

        name = this.extractName(src) || name
        this.version = VERSION
        this.src = src + '\n[EOF]'
        this.scriptName = name
        this.scriptVers = this.navyVers()[0]
        this.scriptTag = this.navyVers()[1]
        this.overlays = []
        this.indicators = []

        if (this.scriptVers === 0) {
            console.warn(`${name}: There is no script version string`)
        }

        if (this.scriptVers > this.version) {
            console.warn(`${name}: Script version > parser version`)
        }

        if (this.scriptVers < 0.2 && 
            src.includes('OVERLAY') && src.includes('yRange')) {
            console.warn(`${name}: Update yRange() function (see docs)`)
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
        this.indicatorTags()
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

    extractName(script) {
        const regex = /\[.*?name=([^\s,]+)/;
        const match = script.match(regex);
        if (match && match[1]) {
            return match[1].trim();
        } else {
            return null; // If 'name' field is not found
        }
    }


    // Parse [OVERLAY] tags
    overlayTags() {
        OV_REGX.lastIndex = 0
        var match
        while (match = OV_REGX.exec(this.src)) {
            this.overlays.push(new ParserOV(
                match[1],
                match[2]
            ))
            OV_REGX.lastIndex -= 10 // Exclude stopping tags
        }
    }

    // Parse [INDICATOR] tags
    indicatorTags() {
        IND_REGX.lastIndex = 0
        var match
        while (match = IND_REGX.exec(this.src)) {
            this.indicators.push(new ParserIND(
                match[1],
                match[2]
            ))
            IND_REGX.lastIndex -= 12 // Exclude stopping tags
        }
    }
}
