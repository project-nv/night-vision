
<svelte:options accessors={true}/>
<script>

import Chart from './components/Chart.svelte'
import Const from './stuff/constants.js'

let chart // Chart reference

export function getChart() { return chart }

// Title text
export let showLogo = false

// Unique html id (when multiple instances used)
export let id = 'nvjs'

// Width of the chart
export let width = 750

// Height of the chart
export let height = 420

// Colors (modify specific colors)
export let colors = {} // TODO: default colors

// Enable toolbar or not
export let toolbar = false

// User-defined scripts (overlays & studies)
export let scripts = []

// Override the default values
export let config = {}

// Extend / replace legend buttons
//export let legendButtons = []

// Index-based mode of rendering (for stocks)
export let indexBased = false

// User-defined extensions
//export let extensions = []

// Extension settings
//export let xSettings = {}

// Skin selector (by id)
//export let skin = undefined

// Timezone (Shift from UTC, hours)
export let timezone = 0

// Dummy prop stubs
export let data = {}
export let autoResize = false

$:configMerge = Object.assign(Const.ChartConfig, config)
$:offset = toolbar ? config.TOOLBAR : 0
$:colorsUser = Object.assign(Const.COLORS, colors)
$:props = {
    showLogo,
    id,
    width: width - offset,
    height,
    colors: colorsUser,
    //toolbar,
    scripts,
    config: configMerge,
    //legendButtons,
    //indexBased,
    //extensions,
    //xSettings,
    //skin,
    timezone
}
$:style = `
    width: ${props.width}px;
    height: ${props.height}px;
`

</script>
<style>
/* Anit-boostrap tactix */
.night-vision *, ::after, ::before {
    box-sizing: content-box;
}
.night-vision img {
    vertical-align: initial;
}
.night-vision {
    position: relative;
    direction: ltr; /* TODO: Explore */
}
</style>
<!-- Main component  -->
<div class="night-vision" id={id} {style}>
    <Chart props={props} bind:this={chart}/>
</div>
