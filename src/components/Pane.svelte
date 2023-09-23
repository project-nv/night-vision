<script>

// Pane component: combines grid, sidebars & legend

import { onMount, onDestroy } from 'svelte'
import Grid from './Grid.svelte'
import Sidebar from './Sidebar.svelte'
import SidebarStub from './SidebarStub.svelte'
import Legend from './Legend.svelte'
import Events from '../core/events.js'
import Utils from '../stuff/utils.js'

export let id // Pane id
export let props // General props
export let main // Is this the main Pane
export let layout // Pane/grid layout

let events = Events.instance(props.id)
let lsb  // left sidebar ref
let rsb  // right sidebar ref
let grid // grid ref

$:leftSb = Utils.getScalesBySide(0, layout)
$:rightSb = Utils.getScalesBySide(1, layout)

$:style = `
    width: ${props.width}px;
    height: ${(layout || {}).height}px;
    /* didn't work, coz canvas draws through the border
    border-top: ${id ? '1px solid' : 'none'};
    border-color: ${props.colors.scale};
    box-sizing: border-box;*/
`

// EVENT INTEFACE
events.on(`pane-${id}:update-pane`, update)

onMount(() => {
    // console.log(`Pane ${id} mounted`)
})

onDestroy(() => {
    events.off(`pane-${id}`)
})

// Send updates to all child components
// Update layout ref to get faster updates
function update($layout) {
    if (!$layout.grids) return
    layout = $layout.grids[id]
    events.emitSpec(`grid-${id}`, 'update-grid', layout)
    let layers = (grid && grid.getLayers) ?
        grid.getLayers() : []
    if (lsb) lsb.setLayers(layers)
    if (rsb) rsb.setLayers(layers)
    events.emitSpec(`sb-${id}-left`, 'update-sb', layout)
    events.emitSpec(`sb-${id}-right`, 'update-sb', layout)
}

</script>
<style>
</style>
{#if layout}
<div class="nvjs-pane" {style}>
    <Grid {id} {props} {layout} {main} bind:this={grid}/>
    <Legend {id} {props} {layout} {main}/>
    {#if leftSb.length}
        <Sidebar {id} {props} {layout} bind:this={lsb}
            side='left' scales={leftSb}/>
    {:else}
        <SidebarStub {id} {props} {layout}
            side='left'/>
    {/if}
    {#if rightSb.length}
        <Sidebar {id} {props} {layout}  bind:this={rsb}
            side='right' scales={rightSb}/>
    {:else}
        <SidebarStub {id} {props} {layout}
            side='right'/>
    {/if}
</div>
{/if}
