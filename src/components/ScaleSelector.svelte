<script>

// Switching between scale on the same side
import { fade } from 'svelte/transition'
import Events from '../core/events.js'

//TODO: Show a hint on the scale (name of overlay)
//TODO: Allow user to specify a scale color
//TODO: Highlight an overlay on scale btn hover

export let id
export let props
export let layout
export let scales
export let side

let events = Events.instance(props.id)

let S = side === 'right' ? 1 : 0
let ssId = `${props.id}-ss-${id}-${side}`

$:specs = (function ssWidth() {
    let obj = {}
    let sb = layout.sbMax[S]
    switch (scales.length) {
        case 2:
        case 4:
        default:
            obj.ssw = 46 // ss width, TODO: move to constants
            obj.ssm = (sb - obj.ssw) / 2  // ss margin
            obj.bw = 18 // button width
            obj.bh = 18 // button height
            obj.tmp = `50% 50%`
            break
        case 3:
            obj.ssw = 54 // ss width, TODO: move to constants
            obj.ssm = (sb - obj.ssw) / 3  // ss margin
            obj.bw = 15 // button width
            obj.bh = 15 // button height
            obj.tmp = `33% 33% 33%`
            break
    }
    return obj
})()

$:ssStyle = `
    grid-template-columns: ${specs.tmp};
    font: ${props.config.FONT};
    width: ${specs.ssw}px;
    margin-left: ${specs.ssm}px;
`

$:sbStyle = i => {
    let sel = i === layout.settings.scaleSideIdxs[S]
    let color = sel ?
        props.colors.text :
        props.colors.scale
    return `
    background: ${props.colors.back};
    line-height: ${specs.bh}px;
    width: ${specs.bw}px;
    height: ${specs.bh}px;
    box-shadow: 0 0 0 1px ${props.colors.back};
    border: 1px solid ${color};
    color: ${color};
`
}

function onClick(index) {
    let scale = scales[index]
    let idxs = layout.settings.scaleSideIdxs
    idxs[S] = index
    events.emitSpec('hub', 'set-scale-index', {
        paneId: id,
        index: index,
        sideIdxs: idxs
    })
}

</script>
<style>
.scale-selector {
    position: absolute;
    bottom: 5px;
    display: grid;
    justify-content: center;
    align-content: center;
}
.scale-button {
    border-radius: 3px;
    text-align: center;
    user-select: none;
    margin: auto;
    margin-top: 1px;
}
.scale-button:hover {
    filter: brightness(1.2);
}
</style>
<div class="scale-selector" id={ssId} style={ssStyle}
    transition:fade={{duration: 150}}>
    {#each scales as scale, i}
    {@const id = scale.scaleSpecs.id  }
    <div class="scale-button" style={sbStyle(id)}
        on:click|stopPropagation={() => onClick(id)}>
        {id}
    </div>
    {/each}
</div>
