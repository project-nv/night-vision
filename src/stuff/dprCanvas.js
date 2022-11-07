
// Setup canvas element with DPI adjustment

import Utils from './utils.js'

function setup(id, w, h) {

    let canvas = document.getElementById(id)
    let dpr = window.devicePixelRatio || 1
    canvas.style.width = `${w}px`
    canvas.style.height = `${h}px`
    if (dpr < 1) dpr = 1
    var rect = canvas.getBoundingClientRect()
    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr
    let ctx = canvas.getContext('2d', {})
    ctx.scale(dpr, dpr)
    // Fallback fix for Brave browser
    // https://github.com/brave/brave-browser/issues/1738
    if (!ctx.measureTextOrg) {
        ctx.measureTextOrg = ctx.measureText
    }
    let nvjsId = id.split('-').shift()
    ctx.measureText = text =>
        Utils.measureText(ctx, text, nvjsId)

    return [canvas, ctx]

}

function resize(canvas, ctx, w, h) {
    let dpr = window.devicePixelRatio || 1
    canvas.style.width = `${w}px`
    canvas.style.height = `${h}px`
    if (dpr < 1) dpr = 1
    var rect = canvas.getBoundingClientRect()
    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr
    ctx.scale(dpr, dpr)
}

export default { setup, resize }
