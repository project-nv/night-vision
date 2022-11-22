// Layout calculations (grid, scales, etc)

import GridMaker from './gridMaker.js'
import Utils from '../stuff/utils.js'
import math from '../stuff/math.js'
import logScale from './logScale.js'

function Layout(props, hub, meta) {

    let chart = hub.chart
    let offchart = hub.offchart
    let panes = hub.panes().filter(x => x.settings)

    if (!chart) return {}

    // Splits space between main chart
    // and offchart indicator grids
    function gridHs() {

        const height = props.height - props.config.BOTBAR

        // When at least one height defined (default = 1),
        // Pxs calculated as: (sum of weights) / number
        if (panes.find(x => x.settings.height)) {
            return weightedHs(height)
        }

        const n = offchart.length
        const off_h = (2 * Math.sqrt(n) / 7) / (n || 1)

        // Offchart pane height
        const px = Math.floor(height * off_h)

        // Main pane height
        const m = height - px * n

        let hs = Array(n+1).fill(px)
        hs[hub.mainPaneId] = m
        return hs

    }

    // Weighted grid heights
    function weightedHs(height) {
        let hs = hub.panes().map(x => x.settings.height ?? 1)
        let sum = hs.reduce((a, b) => a + b, 0)
        hs = hs.map(x => Math.floor((x / sum) * height))

        // Refine the height if Math.floor decreased px sum
        sum = hs.reduce((a, b) => a + b, 0)
        for (var i = 0; i < height - sum; i++) hs[i % hs.length]++
        return hs
    }

    //  Place all grids in the right order
    const hs = gridHs()
    let specs = i => ({
        hub, meta, props, settings: panes[i].settings,
        height: hs[i]
    })
    let mainGm = new GridMaker(
        hub.mainPaneId,
        specs(hub.mainPaneId)
    )
    let gms = [mainGm]
    for (var [i, pane] of panes.entries()) {
        if (i !== hub.mainPaneId) {
            gms.push(new GridMaker(
                i, specs(i), mainGm.getLayout())
            )
        }
    }

    // Max sidebar among all grinds
    // (for left & right side)
    let sb = [
        Math.max(...gms.map(x => x.getSidebar()[0])),
        Math.max(...gms.map(x => x.getSidebar()[1]))
    ]

    let grids = [], offset = 0

    // Create grids (first should be created the main grid)
    for (var i = 0; i < gms.length; i++) {
        let id = gms[i].id()
        gms[i].setMaxSidebar(sb)
        grids[id] = gms[i].create()
    }
    for (var i = 0; i < grids.length; i++) {
        grids[i].offset = offset
        offset += grids[i].height
    }

    return {
        grids: grids,
        main: grids.find(x => x.main),
        indexBased: hub.indexBased,
        botbar: {
            width: props.width,
            height: props.config.BOTBAR,
            offset: offset,
            xs: grids[0] ? grids[0].xs : []
        }
    }
}

export default Layout
