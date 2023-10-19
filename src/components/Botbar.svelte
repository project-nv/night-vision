<script>
// The Bottom Bar. Information flow:
// Input: props, layout, (?events)
// Output: canvas, (?events)

// TODO: add support of overlays with
// drawBotbar() function

import { onMount, onDestroy } from 'svelte'
import Events from '../core/events.js'
import Utils from '../stuff/utils.js'
import dpr from '../stuff/dprCanvas.js'
import bb from '../core/primitives/botbar.js'

export let props = {} // General props
export let layout = {} // Grid layout

let bbUpdId = `botbar`
let bbId = `${props.id}-botbar`
let canvasId = `${props.id}-botbar-canvas`

let events = Events.instance(props.id)

// EVENT INTERFACE
events.on(`${bbUpdId}:update-bb`, update)
events.on(`${bbUpdId}:show-bb-panel`, f => showPanel = f)

$:bbStyle = `
    background: ${props.colors.back};
    width: ${(layout.botbar || {}).width}px;
    height: ${(layout.botbar || {}).height}px;
`

let canvas // Canvas ref
let ctx // Canvas context
let showPanel = true

$:width = (layout.botbar || {}).width
$:resizeWatch(width)

onMount(() => { setup() })
onDestroy(() => {
    events.off(`${bbUpdId}`)
})

function setup() {
    let botbar = layout.botbar;
    [canvas, ctx] = dpr.setup(
        canvasId, botbar.width, botbar.height)

    update()
}

function update($layout = layout) {
    layout = $layout

    if (!layout.botbar) return // If not exists

    bb.body(props, layout, ctx)

    // applyShaders()

    if (props.cursor.x && props.cursor.ti !== undefined && showPanel) {
        bb.panel(props, layout, ctx)
    }
}

function resizeWatch() {
    let botbar = layout.botbar
    if (!canvas || !botbar) return
    dpr.resize(canvas, ctx, botbar.width, botbar.height)
    update()
}

/*function applyShaders() {
    let props = {
        layout: layout,
        cursor: props.cursor
    }
    for (var s of props.bb_shaders) {
        ctx.save()
        s.draw(ctx, props)
        ctx.restore()
    }
}*/

</script>
<style>
.nvjs-botbar {}
</style>
<div class="nvjs-botbar" id={bbId} style={bbStyle}>
    <canvas id={canvasId}></canvas>
</div>
