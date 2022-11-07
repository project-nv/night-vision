<script>
// Replacement for an empty scale

export let id // Sidebar id (=pane/grid id)
export let props = {} // General props
export let layout = {} // Grid layout
export let side // Left/right side

let S = side === 'right' ? 1 : 0

let stubId = `${props.id}-stub-${id}-${side}`

$:stubStyle = `
    left: ${S * (layout.width + layout.sbMax[0])}px;
    top: ${layout.offset || 0}px;
    width: ${layout.sbMax[S] - 1}px;
    height: ${layout.height - (id ? 1 : 0)}px;
    position: absolute;
    border: 1px solid;
    border-${side}: none;
    border-bottom: none;
    /* TODO: remove to-boder, it's in the pane now */
    border-top: ${id ? 'auto' : 'none'};
    border-color: ${props.colors.scale};
    background: ${props.colors.back}
`

</script>
<style>
.nvjs-sidebar-stub {}
</style>
{#if layout.sbMax[S]}
<div id={stubId} style={stubStyle}
    class="nvjs-sidebar-stub"></div>
{/if}
