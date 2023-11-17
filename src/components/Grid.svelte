<script>

// Grid is the component that builds the actuall chart.
// ~ Information flow ~
// Input: props (tf, range, ...), overlay scripts, data
// Output: bunch of renderers, each for different context

import { onMount, onDestroy } from 'svelte'
import Scripts from '../core/scripts.js'
import DataHub from '../core/dataHub.js'
import MetaHub from '../core/metaHub.js'
import Events from '../core/events.js'
import OverlayEnv from '../core/navy/overlayEnv.js'
import Layer from '../core/layer.js'
import Pointer from '../core/input/pointer.js'
import Keyboard from '../core/input/keyboard.js'
import Crosshair from '../core/primitives/crosshair.js'
import Grid from '../core/primitives/grid.js'
import Trackers from '../core/primitives/trackers.js'

// Renderers
import Canvas from '../components/renderers/Canvas.svelte'

export let id // Pane/grid id
export let props // General props
export let main // Is this the main grid?
export let layout // Grid layout (scales, etc...)

export function getLayers() { return layers }

let hub = DataHub.instance(props.id)
let meta = MetaHub.instance(props.id)
let events = Events.instance(props.id)
let scripts = Scripts.instance(props.id)

let layers = []
let renderers = []
let input = null
let keyboard = null

// EVENT INTEFACE
events.on(`grid-${id}:update-grid`, update)
events.on(`grid-${id}:remake-grid`, make)
events.on(`grid-${id}:propagate`, propagate)
events.on(`grid-${id}:run-grid-task`, onTask)

$:style = `
    width: ${layout.width}px;
    height: ${layout.height}px;
    background: ${props.colors.back};
    margin-left: ${layout.sbMax[0]}px;
`

onMount(() => {
    make('mounted')
    keyboard = new Keyboard(`grid-${id}`, events)
})

onDestroy(() => {
    events.off(`grid-${id}`)
    keyboard.off()
})

function make(event) {

    if (!hub.panes()[id]) return // If not exists

    // console.log(`Grid ${id} ${event || 're-made'}`)

    destroyLayers()

    layers = makeLayers()
    renderers = mergeByCtx()

    // Attach input to the last renderer
    let last = renderers[renderers.length - 1]
    if (last) setTimeout(() => {
        if (last.ref) {
            detachInputs()
            // TODO: when grid is 're-made', input
            // internal state is lost, need to store it,
            // or just reuse the input instance
            last.ref.attach(input = new Pointer())
        }
    })
}

// Detach inputs from previous "last" renderer
function detachInputs() {
    for (var rr of renderers) {
        rr.ref.detach()
    }
}

// Call destroy() function on each layer
function destroyLayers() {
    for (var layer of layers) {
        layer.overlay.destroy()
        layer.env.destroy()
    }
}

// Take data + scripts and form new layers
function makeLayers() {

    let list = hub.panes()[id].overlays || []
    let layers = []

    for (var i = 0; i < list.length; i++) {
        let ov = list[i]

        // Search for overlay prefab by type
        let prefab = scripts.prefabs[ov.type]
        if (!prefab) continue

        let l = new Layer(i, ov.name, props.id)
        let z = ov.settings.zIndex
        l.zIndex = z ?? (ov.main ? 0 : -1)

        // Create overlay environment
        let env = new OverlayEnv(i, ov, layout, props)

        l.overlay = prefab.make(env)
        l.env = env
        l.ovSrc = ov
        l.ctxType = prefab.ctx
        env.overlay = l.overlay // make a reference
        meta.exctractFrom(l.overlay)
        layers.push(l)

        l.overlay.init()

    }

    // TODO: make crosshair customizable
    // TODO: check order if overlay list is changed
    // TODO: switch Grid/X from the pane settings
    layers.push(new Crosshair(i++, props.id))
    layers.push(new Grid(i++, props.id))
    layers.push(new Trackers(i++, props, id))
    layers.sort((l1, l2) => l1.zIndex - l2.zIndex)

    // Submit meta-info to the hub (yRanges ...)
    meta.finish()

    return layers
}

// Merge layers by context type
// (send to the same renderer)
function mergeByCtx() {

    let rrs = [] // renderer list
    let lastCtx = null

    for (var l of layers) {
        if (l.ctxType !== lastCtx) {
            // Renderer descriptor
            var last = {
                ctxType: l.ctxType,
                layers: [],
                id: rrs.length,
                ref: null // Renderer reference
            }
            rrs.push(last)
            lastCtx = l.ctxType
        }
        // Add layer to the last renderer
        last.layers.push(l)
    }
    return rrs
}

// Update all renderers
function update($layout = layout) {
    layout = $layout
    if (input) input.layout = layout
    for (var l of layers) {
        // Update environment variables
        l.env.update(l.ovSrc, layout, props)
        l.update()
    }
    // Prevent drawing before meta data extracted
    // from the scripts
    // if (!meta.ready) return
    // Now draw
    for (var rr of renderers) {
        events.emitSpec(`rr-${id}-${rr.id}`,
            'update-rr', layout)
    }
}

function propagate(e) {
    let { name, event } = e
    for (var layer of layers) {
        if (layer.overlay[name]) {
            layer.overlay[name](event)
        }
        if (layer.env.$core) {
            const mouse = layer.env.$core.mouse
            const keys = layer.env.$core.keys
            mouse.emit(name, event)
            keys.emit(name, event)
        }
    }
}

// Perform various task over layers / renderers
function onTask(event) {
    event.handler(layers, renderers, { update })
}

</script>
<style>
</style>
<div class="nvjs-grid" {style}>
    {#each renderers as rr, i}
        {#if rr.ctxType === 'Canvas'}
            <Canvas {id} bind:this={rr.ref}
                layout={layout}
                props={props} rr={rr}/>
        {/if}
    {/each}
</div>
