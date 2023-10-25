<script>
// The Side Bar. Information flow:
// Input: props, layout, mouse/touch events
// Output: canvas, ytransform events

// TODO: right-click menu
// - Reset this scale
// - Reset All Scales
// - Move ...

// TODO: add support of overlays with
// drawSidebar() function

// TODO: hiver hint component (e.g. for sidebar errors)

import { onMount, onDestroy } from 'svelte'
import { fade } from 'svelte/transition'
import ScaleSelector from './ScaleSelector.svelte'
import Events from '../core/events.js'
import Utils from '../stuff/utils.js'
import Const from '../stuff/constants.js'
import math from '../stuff/math.js'
import dpr from '../stuff/dprCanvas.js'
import sb from '../core/primitives/sidebar.js'
import MetaHub from '../core/metaHub.js'

export let id // Sidebar id (=pane/grid id)
export let props = {} // General props
export let layout = {} // Grid layout
export let side // Left/right side
export let scales = [] // List of scales

let layers = []
export function setLayers($layers) {
    layers = $layers
}

let meta = MetaHub.instance(props.id)
let events = Events.instance(props.id)

let S = side === 'right' ? 1 : 0

let sbUpdId = `sb-${id}-${side}`
let sbId = `${props.id}-sb-${id}-${side}`
let canvasId = `${props.id}-sb-canvas-${id}-${side}`
let showSwitch = false
let showPanel = true

// EVENT INTERFACE
events.on(`${sbUpdId}:update-sb`, update)
events.on(`${sbUpdId}:show-sb-panel`, f => showPanel = f)

$:sbStyle = `
    left: ${S * (layout.width + layout.sbMax[0])}px;
    top: ${layout.offset || 0}px;
    position: absolute;
    background: ${props.colors.back};
    height: ${layout.height}px;
`
$:scale = getCurrentScale(layout)

let canvas // Canvas ref
let ctx // Canvas context
let mc // Mouse controller
let zoom = 1
let yRange
let drug
let updId 

$:width = layout.width
$:height = layout.height
$:resizeWatch(width, height)

onMount(async () => { await setup() })
onDestroy(() => {
    events.off(`${sbUpdId}`)
    if (mc) mc.destroy()
    clearInterval(updId)
})

async function setup() {
    [canvas, ctx] = dpr.setup(
        canvasId, layout.sbMax[S], layout.height)

    update()
    if (scale) await listeners()

    // Start updates to show fresh candle time 
    if (props.config.CANDLE_TIME && props.timeFrame >= Const.MINUTE) {
        let dt = Const.SECOND / 5 
        updId = setInterval(update, dt)
    }
}

// TODO: add mouse wheel/touchpad zoom
async function listeners() {
    const Hammer = await import('hammerjs');
    mc = new Hammer.Manager(canvas)
        mc.add(new Hammer.Pan({
            direction: Hammer.DIRECTION_VERTICAL,
            threshold: 0
        }))

        mc.add( new Hammer.Tap({
            event: 'doubletap',
            taps: 2,
            posThreshold: 50
        }))

        mc.on('panstart', event => {
            if (!scale) return
            let yTransform = getYtransform()
            if (yTransform) {
                zoom = yTransform.zoom
            } else {
                zoom = 1.0
            }
            yRange = [
                scale.$hi,
                scale.$lo
            ]
            drug = {
                y: event.center.y,
                z: zoom,
                mid: math.log_mid(yRange, layout.height),
                A: scale.A,
                B: scale.B
            }
        })

        mc.on('panmove', event => {
            if (drug) {
                zoom = calcZoom(event)
                events.emit('sidebar-transform', {
                    gridId: id,
                    scaleId: scale.scaleSpecs.id,
                    zoom: zoom,
                    auto: false,
                    range: calcRange(),
                    drugging: true,
                    updateLayout: true
                })
                update()
            }
        })

        mc.on('panend', () => {
            drug = null
            if (!scale) return
            events.emit('sidebar-transform', {
                gridId: id,
                scaleId: scale.scaleSpecs.id,
                drugging: false,
                updateLayout: true
            })
        })

        mc.on('doubletap', () => {
            events.emit('sidebar-transform', {
                gridId: id,
                scaleId: scale.scaleSpecs.id,
                zoom: 1.0,
                auto: true,
                updateLayout: true
            })
            zoom = 1.0
            update()
        })

        // TODO: Do later for mobile version

}

function update($layout = layout) {

    if (!$layout) return // If not exists

    layout = $layout
    //scales = Utils.getScalesBySide(S, layout)
    scale = getCurrentScale()

    if (!scale) {
        return sb.error(props, layout, side, ctx)
    }

    // Draw only when data extracted from the srcipts
    //if (meta.ready) {
        sb.body(props, layout, scale, side, ctx)
    //} else {
    //    sb.border(props, layout, side, ctx)
    //}

    ovDrawCalls()

    if (id) sb.upperBorder(props, layout, ctx)

    if (props.cursor.y && props.cursor.scales && showPanel) {
        if (props.cursor.gridId === layout.id) {
            sb.panel(props, layout, scale, side, ctx)
        }
    }
}

// Draw stuff from overlay scripts
function ovDrawCalls() {
    for (var l of layers) {
        let ov = l.overlay
        if (ov.drawSidebar) {
            ov.drawSidebar(ctx, side, scale)
        }
    }
}

function resizeWatch() {
    if (!canvas) return
    dpr.resize(canvas, ctx, layout.sbMax[S], layout.height)
    update()
}

function calcZoom(event) {
    let d = drug.y - event.center.y
    let speed = d > 0 ? 3 : 1
    let k = 1 + speed * d / layout.height
    return Utils.clamp(drug.z * k, 0.005, 100)
}

// Not the best place to calculate y-range but
// this is the simplest solution I found up to
// date
function calcRange(diff1 = 1, diff2 = 1) {

    let z = zoom / drug.z
    let zk = (1 / z - 1) / 2

    let range = yRange.slice()
    let delta = range[0] - range[1]

    if (!scale.log) {
        range[0] = range[0] + delta * zk * diff1
        range[1] = range[1] - delta * zk * diff2
    } else {

        let px_mid = layout.height / 2
        let new_hi = px_mid - px_mid * (1 / z)
        let new_lo = px_mid + px_mid * (1 / z)

        // Use old mapping to get a new range
        let f = y => math.exp((y - drug.B) / drug.A)

        let copy = range.slice()
        range[0] = f(new_hi)
        range[1] = f(new_lo)

    }

    return range
}

// TODO: log scale work with distortions when auto is disabled
function rezoomRange(delta, diff1, diff2) {

    let yTransform = getYtransform()
    if (!yTransform || yTransform.auto) return

    zoom = 1.0
    // TODO: further work (improve scaling ratio)
    if (delta < 0) delta /= 3.75 // Btw, idk why 3.75, but it works
    delta *= 0.25
    yRange = [
        scale.$hi,
        scale.$lo
    ]
    drug = {
        y: 0,
        z: zoom,
        mid: math.log_mid(yRange, layout.height),
        A: scale.A,
        B: scale.B
    }
    zoom = calcZoom({
        center: {
            y: delta * layout.height
        }
    })

    events.emit('sidebar-transform', {
        gridId: id,
        scaleId: scale.scaleSpecs.id,
        zoom: zoom,
        auto: false,
        range: calcRange(diff1, diff2),
        drugging: true,
        updateLayout: true // Update layout
    })
    drug = null
    events.emit('sidebar-transform', {
        gridId: id,
        scaleId: scale.scaleSpecs.id,
        drugging: false,
        updateLayout: true
    })
}

// Get current scale displayed on this side.
// Should be in the scales list & template
function getCurrentScale() {
    let scales = layout.scales
    let template = layout.settings.scaleTemplate[S]
    let s = scales[layout.settings.scaleSideIdxs[S]]
    if (s && template.includes(s.scaleSpecs.id)) {
        return s
    }
    return null
}

function getYtransform() {
    if (!meta.yTransforms[id]) return
    let scaleId = scale.scaleSpecs.id
    return meta.yTransforms[id][scaleId]
}

function onClick(e) {
    if (!scale) return
    events.emitSpec('hub', 'set-scale-index', {
        paneId: id,
        index: scale.scaleSpecs.id,
        sideIdxs: layout.settings.scaleSideIdxs
    })
}

function onMouseOver() {
    showSwitch = true
}

function onMouseLeave() {
    showSwitch = false
}

</script>
<style>
.nvjs-sidebar {}
</style>
<div id={sbId} style={sbStyle} class="nvjs-sidebar"
    on:click={onClick}
    on:mouseover={onMouseOver}
    on:mouseleave={onMouseLeave}>
    <canvas id={canvasId}></canvas>
    {#if scales.length > 1 && showSwitch}
        <ScaleSelector {id} {props} {layout}
            {scales} {side} />
    {/if}
</div>
