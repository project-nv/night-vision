<script>

// Overlay's legend line
// TODO: For legendHtml formatter - create web-components
// and macros to make code easier & more compact
// TODO: prevent trackpad events from scrolling the
// browser page back
// TODO: combining (& linking) several overlays. Will allow to
// collapse several lines into one. Need to add 'group' field

import { onMount, onDestroy } from 'svelte'
import LegendControls from './LegendControls.svelte'
import Events from '../core/events.js'
import MetaHub from '../core/metaHub.js'
import logo from '../assets/logo.json'
import icons from '../assets/icons.json'

export let gridId // gridId
export let ov // Overlay
export let props // General props
export let layout // Pane/grid layout

let meta = MetaHub.instance(props.id)
let events = Events.instance(props.id)

let hover = false
let ref // Reference to the legend-line div
let nRef // Reference to the legend-name span
let ctrlRef // Reference to the legend controls
let selected = false
let show = true

$:updId = `ll-${gridId}-${ov.id}`

onMount(() => {
    // EVENT INTEFACE
    events.on(`${updId}:update-ll`, update)
    events.on(`${updId}:grid-mousedown`, onDeselect)
    events.on(`${updId}:select-overlay`, onDeselect)
})

onDestroy(() => {
    events.off(updId)
})

$:name = ov.name ?? (`${ov.type || 'Overlay'}-${ov.id}`)
$:fontSz = parseInt(props.config.FONT.split('px').shift())
$:styleBase = `
    font: ${props.config.FONT};
    font-size: ${fontSz + (ov.main ? 5 : 3)}px;
    font-weight: 300;
    color: ${props.colors.textLG};
    background: ${
        selected ? props.colors.back : props.colors.llBack
    };
    border: 1px solid transparent;
    margin-right: 30px;
    max-width: ${layout.width - 20}px;
    overflow-x: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    border-color: ${
        selected ? props.colors.llSelect : 'auto'
    } !important;
`

$:styleHover = `
    background: ${props.colors.back};
    border: 1px solid ${props.colors.grid};

`

$:dataStyle = `
    font-size: ${fontSz + (ov.main ? 3 : 2)}px;
    color: ${props.colors.llValue}
`

$:logoStyle = `
    background-image: url(${logo[0]});
    background-size: contain;
    background-repeat: no-repeat;
`

$:eyeStyle = `
    background-image: url(${icons[state+'-eye']});
    background-size: contain;
    background-repeat: no-repeat;
    margin-top: ${(boundary.height - 20) * 0.5 - 3}px;
    margin-bottom: -2px;
`

$:touchBoxStyle = `
    width: ${boundary.width}px;
    height: ${boundary.height}px;
    background: #55f9;
    top: -1px;
    left: -2px;
`

$:kingStyle = `
    background-image: url(${icons['king3']});
    background-size: contain;
    background-repeat: no-repeat;
    margin-left: ${
        hover || !display || !data.length ? 7 : 3
    }px;
`

$:boundary = ref ? ref.getBoundingClientRect() : {}
$:nBoundary = nRef ? nRef.getBoundingClientRect() : {}
$:style = styleBase + (hover ? styleHover : '')
$:legendFns = meta.getLegendFns(gridId, ov.id) || {}
$:legend = legendFns.legend
$:legendHtml = legendFns.legendHtml
$:values = props.cursor.values || []
$:data = (values[gridId] || [])[ov.id] || []
$:scale = findOverlayScale(layout.scales)
$:prec = scale.prec
$:display = ov.settings.display !== false
$:state = display ? 'open' : 'closed'

// Disable legend if legend() returns null dynamically
$:if(legend && data && !legend(data, prec)) show = false

function update() {
    display = ov.settings.display !== false
    if (ctrlRef) ctrlRef.update()
}

function onMouseMove(e) {
    if (e.clientX < nBoundary.x + nBoundary.width + 35
        && !hover) {
        setTimeout(() => {
            updateBoundaries()
            hover = true
        })
    }
}

function onMouseLeave(e) {
    setTimeout(() => {
        updateBoundaries()
        hover = false
    })
}

function onClick() {
    events.emit('select-overlay', {
        index: [gridId, ov.id]
    })
    selected = true
}

function onDeselect(event) {
    selected = false
}

// Format legend value
function formatter(x, $prec = prec) {
    if (x == undefined) return 'x'
    if (typeof x !== 'number') return x
    return x.toFixed($prec)
}

// Find overlay's scale (by searching in ovIdxs)
function findOverlayScale(scales) {
    return Object.values(scales).find(
        x => x.scaleSpecs.ovIdxs.includes(ov.id)
    ) || scales[layout.scaleIndex]
}

function updateBoundaries() {
    if (!ref) return
    boundary = ref.getBoundingClientRect()
}

function disableLegend() {
    console.log('here')
}

</script>
<style>
.nvjs-legend-line {
    pointer-events: all;
    position: relative;
    user-select: none;
    border-radius: 3px;
    padding: 2px 5px;
    margin-bottom: 2px;
    width: fit-content;
}
.nvjs-logo {
    width: 35px;
    height: 20px;
    float: left;
    margin-left: -5px;
    margin-right: 2px;
    opacity: 0.85;
}
.nvjs-ll-data {
    font-variant-numeric: tabular-nums;
}
:global(.nvjs-ll-value) {
    margin-left: 3px;
}
:global(.nvjs-ll-x) {
    margin-left: 3px;
}
.nvjs-eye {
    width: 20px;
    height: 20px;
    float: right;
    margin-right: 2px;
    margin-left: 7px;
}
.nvjs-eye:hover {
    filter: brightness(1.25);
}
.king-icon {
    padding-left: 8px;
    padding-right: 8px;
    /*padding-top: 3px;*/
    margin-right: 4px;
    filter: grayscale();
}
/*.king-icon:hover {
    filter: none;
}*/
</style>
{#if !legendFns.noLegend && ov.settings.showLegend !== false && show}
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="nvjs-legend-line" {style}
    on:mousemove={onMouseMove}
    on:mouseleave={onMouseLeave}
    on:click={onClick}
    on:keypress={null}
    bind:this={ref}>
    {#if ov.main && props.showLogo}
    <div class="nvjs-logo" style={logoStyle}></div>
    {/if}
    <span class="nvjs-ll-name" bind:this={nRef}>
        {@html name}
        {#if ov.main}
        <span class="king-icon" style={kingStyle}>
        </span>
        {/if}
    </span>
    {#if display && !hover}
    <span class="nvjs-ll-data" style={dataStyle}>
        {#if ov.settings.legendHtml}
            {@html ov.settings.legendHtml}
        {:else if !legend && !legendHtml}
            {#each data as v, i}
            {#if i > 0} <!-- filter out time -->
                {#if v != null}
                <span class="nvjs-ll-value">
                    {formatter(v)}
                </span>
                {:else}
                <span class="nvjs-ll-x">x</span>
                {/if}
            {/if}
            {/each}
        {:else if legendHtml && data.length}
            {@html legendHtml(data, prec, formatter)}
        {:else if data.length}
            {#each legend(data, prec) || [] as v, i}
            <span class="nvjs-ll-value"
                  style={`color: ${v[1]}`}>
                {formatter(v[0])}
            </span>
            {/each}
        {/if}
    </span>
    {/if}
    {#if !display && !hover}
    <div class="nvjs-eye" style={eyeStyle}>
    </div>
    {/if}
    {#if hover}
        <LegendControls bind:this={ctrlRef}
            {gridId} {ov} {props}
            height={boundary.height}/>
    {/if}
</div>
{/if}