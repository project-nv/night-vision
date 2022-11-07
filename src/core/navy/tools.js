
// Parser tools

import strip from '@freecodecamp/strip-comments'

const COMMENTS = /(\/\*([\s\S]*?)\*\/)|(\/\/(.*)$)/gm

function decomment(src, file) {
    //src = maskStrings(src, file)
    //src = strip(maskRegex(src))//.replace(COMMENTS, '')
    //src = maskRegex(src, atob)
    //return unmaskStrings(src)

    // TODO: incorrectly parsing comments like: /*  /*  */
    return strip(src)

}

// Mask comments inside all strings
// (needed b/c there could  be comment symbols // & /*)
function maskStrings(src, file) {

    let quotes = findStrings(src, file)
    for (var q of quotes) {
        let tmp = src.slice(0, q[0] + 1)
        tmp += src.slice(q[0] + 1, q[1])
            .replaceAll('/*', '[!C~1!]')
            .replaceAll('//', '[!C~2!]')
        tmp += src.slice(q[1])
        src = tmp
    }

    return src
}

// Unmask comment symbols back
function unmaskStrings(src, file) {
    return src
        .replaceAll('[!C~1!]', '/*')
        .replaceAll('[!C~2!]', '//')
}


// Find all strings (``, '' or "")
function findStrings(src, file) {

    let count = { '\'' : 0, '"' : 0, '`' : 0 }
    let pairs = []
    let pair = null

    for (var i = 0; i < src.length; i++) {

        for (var type in count) {

            if (src[i] === type && src[i-1] !== '\\') {
                count[type]++
                if (!pair) pair = [i, undefined]
            }

            if (src[i] === type && src[i-1] !== '\\' &&
                i > pair[0] ) {
                count[type] = 0
                if (pair && Object.values(count).every(x => !x)) {
                    pair[1] = i
                    pairs.push(pair)
                    pair = null
                }
            }

            if (count[type] < 0) {
                throw `Missing quote ${type} in ${file}`
            }
        }
    }

    if (pair !== null) {
        throw `Missing quote in ${file}: ${JSON.stringify(count)}`
    }

    return pairs

}

function errsrc(src, i) {
    return `\n>>> ${src.slice(i-25, i+25)}`
}

// Hide/show RegExp content with base64
//(needed b/c there could be comment symbols // & /*)
function maskRegex(src, f = btoa) {
    // Regex
    let rex = /\/([^*\/]?.+)\//g
    do {
        var m = rex.exec(src)
        if (m) {
            let length = m[0].length
            if (m[1].slice(-1) === '*') {
                length--
                m[1] = m[1].slice(0, -1)
            }
            let tmp = src.slice(0, m.index + 1)
            let r = f(m[1])
            tmp += r + src.slice(m.index + length - 1)
            src = tmp
            rex.lastIndex = m.index + r.length
        }
    } while (m)
    return src
}

function findClosingBracket(src, startPos, file, btype = '{}') {
    let open = btype[0]
    let close = btype[1]

    let count = { '\'' : 0, '"' : 0, '`' : 0 }
    let count2 = 0
    let pairs = []
    let pair = null

    for (var i = startPos; i < src.length; i++) {

        for (var type in count) {

            if (src[i] === type && src[i-1] !== '\\') {
                count[type]++
                if (!pair) pair = [i, undefined]
            }

            if (src[i] === type && src[i-1] !== '\\' &&
                i > pair[0] ) {
                count[type] = 0
                if (pair && Object.values(count).every(x => !x)) {
                    pair[1] = i
                    pairs.push(pair)
                    pair = null
                }
            }

            if (count[type] < 0) {
                throw `Missing quote ${type} in ${file}`
            }
        }

        // Don't count brackets inside strings
        let sum = count['\''] + count['"'] + count['`']
        if (sum === 0) {
            if (src[i] === open) count2++
            if (src[i] === close) count2--

            if (count2 === 0) break // Closing bracket
        }
    }

    if (count2 !== 0) {
        throw `Missing bracket in ${file}: ${btype}`
    }

    if (pair !== null) {
        throw `Missing quote in ${file}: ${JSON.stringify(count)}`
    }

    return i

}

export default {
    maskStrings, unmaskStrings, findStrings, maskRegex,
    decomment, findClosingBracket
}
