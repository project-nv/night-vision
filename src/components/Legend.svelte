<script>
// Legend block (collection of LegendLines)

import { onMount, onDestroy } from 'svelte'
import Events from '../core/events.js'
import DataHub from '../core/dataHub.js'
import LegendLine from './LegendLine.svelte'

export let id // Legend/pane id
export let props // General props
export let main // Is this the main Pane
export let layout // Pane/grid layout

let hub = DataHub.instance(props.id)
let events = Events.instance(props.id)

let legendRR = 0 // Re-render key

$:style = `
    left: ${layout.sbMax[0] + 5}px;
    top: ${(layout.offset || 0) + 5}px;
    position: absolute;
`

// EVENT INTEFACE
events.on(`legend-${id}:update-legend`, update)

onDestroy(() => {
    events.off(`legend-${id}`)
})

function update() {
    legendRR++
}

</script>
<style>
.nvjs-legend {
    pointer-events: none;
}
</style>
{#key legendRR} <!-- Full chart re-render -->
{#if hub.panes()[id]}
<div class="nvjs-legend" {style}>
    {#each hub.panes()[id].overlays as ov, i}
    <LegendLine gridId={id}
        {props} {layout} {ov} />
    {/each}
</div>
{/if}
{/key}
