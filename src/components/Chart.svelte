<script>

// Main component combining all grids, scales, etc.
// Also, main event router, root of 'update' events

import { onMount, onDestroy } from 'svelte'
import Cursor from '../core/cursor.js'
import DataHub from '../core/dataHub.js'
import MetaHub from '../core/metaHub.js'
import Scan from '../core/dataScanner.js'
import Events from '../core/events.js'
import Const from '../stuff/constants.js'
import Utils from '../stuff/utils.js'
import Layout from '../core/layout.js'
import Context from '../stuff/context.js'
import Pane from './Pane.svelte'
import Botbar from './Botbar.svelte'
import NoDataStub from './NoDataStub.svelte'

export let props = {}

// Getters
export function getLayout() { return layout }
export function getRange() { return range }
export function getCursor() { return cursor }

// Setters
export function setRange(val) {
    let emit = !(val.preventDefault ?? true)
    delete val.preventDefault
    Object.assign(range, val) // keeping the same ref
    onRangeChanged(range, emit)
}

export function setCursor(val) {
    let emit = !(val.preventDefault ?? true)
    delete val.preventDefault
    Object.assign(cursor, val)
    onCursorChanged(cursor, emit)
}

// Singleton instances
let hub = DataHub.instance(props.id)
let meta = MetaHub.instance(props.id)
let events = Events.instance(props.id)
let scan = Scan.instance(props.id)

scan.init(props)

let interval = scan.detectInterval()
let timeFrame = scan.getTimeframe()
let range = scan.defaultRange()
let cursor = new Cursor(meta)
let storage = {} // Storage for helper variables
let ctx = new Context(props) // For measuring text
let chartRR = 0
let layout = null

scan.calcIndexOffsets()

$:chartProps = Object.assign(
    {interval, timeFrame, range, ctx, cursor},
    props
)

// EVENT INTEFACE
events.on('chart:cursor-changed', onCursorChanged)
events.on('chart:cursor-locked', onCursorLocked)
events.on('chart:range-changed', onRangeChanged)
events.on('chart:update-layout', update)
events.on('chart:full-update', fullUpdate)

onMount(() => {

    hub.calcSubset(range)
    hub.detectMain()
    hub.loadScripts(range, scan.tf, true)
    meta.init(props)

    scan.updatePanesHash()

    layout = new Layout(chartProps, hub, meta)

    // console.log(layout) // DEBUG
})

onDestroy(() => {
    // Clean-up event listeners on 'chart' component
    events.off('chart')
})

function onCursorChanged($cursor, emit = true) {
    // Emit a global event (hook)
    if ($cursor.mode) cursor.mode = $cursor.mode
    if (cursor.mode !== 'explore') {
        cursor.xSync(hub, layout, chartProps, $cursor)
        if ($cursor.visible === false) {
            // One more update to hide the cursor
            setTimeout(() => update())
        }
    }
    if (emit) events.emit('$cursor-update', 
        Utils.makeCursorEvent($cursor, cursor, layout)
    )
    //if (cursor.locked) return // filter double updates (*)
    update()
}

function onCursorLocked(state) {
    if (cursor.scrollLock && state) return
    cursor.locked = state
}

// TODO: init cursor when trackpad scrolling
// is the first input (no mousemove yet)
function onRangeChanged($range, emit = true) {
    // Emit a global event (hook)
    if (emit) events.emit('$range-update', $range)
    rangeUpdate($range)
    hub.updateRange(range)
    // TODO: Shoud be enabled (*), but it creates cursor lag
    if (cursor.locked) return // filter double updates (**)
    cursor.xValues(hub, layout, chartProps)
    cursor.yValues(layout)
    update()
    // Quantize cursor after events stop coming in
    let Q = props.config.QUANTIZE_AFTER
    if (Q) Utils.afterAll(storage, quantizeCursor, Q)
}

function quantizeCursor() {
    cursor.xSync(hub, layout, chartProps, cursor)
    update()
}

function update(opt = {}, emit = true) {
    // Emit a global event (hook)
    if (emit) events.emit('$chart-pre-update')
    //Utils.callsPerSecond()
    // If we changed UUIDs of but don't want to trigger
    // the full update, we need to set updateHash:true
    if (opt.updateHash) scan.updatePanesHash()
    if (scan.panesChanged()) return fullUpdate(opt)
    cursor = cursor // Trigger Svelte update
    layout = new Layout(chartProps, hub, meta)
    events.emit('update-pane', layout) // Update all panes
    events.emitSpec('botbar', 'update-bb', layout)
    if (emit) events.emit('$chart-update')
}

// Full update when the dataset changed completely
// or the list of panes/overlays is changed
// TODO: we can update only panes with
// overlay changes. But it requires more work
function fullUpdate(opt = {}) {

    let prevIbMode = scan.ibMode
    interval = scan.detectInterval()
    timeFrame = scan.getTimeframe()
    let ibc = scan.ibMode !== prevIbMode
    if (!range.length || opt.resetRange || ibc) {
        rangeUpdate(scan.defaultRange())
    }
    scan.calcIndexOffsets()
    hub.calcSubset(range)
    hub.init(hub.data)
    hub.detectMain()
    // TODO: exec only if scripts changed
    hub.loadScripts()
    meta.init(props)
    meta.restore()
    scan.updatePanesHash()
    update()
    events.emit('remake-grid')
}

// Instant range update
function rangeUpdate($range) {
    range = $range
    chartProps.range = range // Instant update
}

</script>
<style>
</style>
{#key chartRR} <!-- Full chart re-render -->
<div class="nvjs-chart" >
    {#if layout && layout.main}
        {#each hub.panes() as pane, i}
    	<Pane id={i}
            layout={layout.grids[i]}
            props={chartProps}
            main={pane === hub.chart}
        />
        {/each}
        <Botbar props={chartProps} {layout}/>
    {:else}
        <NoDataStub {props}/>
    {/if}
</div>
{/key}
