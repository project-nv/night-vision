<script>
// Show this when there's no main data

export let props

$:style = `
    display: flex;
    width: ${props.width}px;
    height: ${props.height}px;
    background: ${props.colors.back};
    color: ${props.colors.scale};
    font: ${props.config.FONT};
    font-size: 18px;
    font-style: italic;
    user-select: none;
    align-items:center;
    justify-content:center;
`
</script>
<style>
.nvjs-no-data-stub {

}
</style>
<div class="nvjs-no-data-stub" {style}>
    No data ¯\_( °﹏°)_/¯
</div>
