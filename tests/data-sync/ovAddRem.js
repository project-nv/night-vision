
// Add/remove overlay sync test


import baseData from '../../data/data-1.json?id=ovAddRem'
import data1 from '../../data/ov-data-1.json?id=ovAddRem'
import data2 from '../../data/ov-data-2.json?id=ovAddRem'
import data3 from '../../data/ov-data-3.json?id=ovAddRem'

const baseCopy = JSON.parse(
    JSON.stringify(baseData.panes[0].overlays[0])
)

// TODO: check inputs/renderers sync when an overlay
// addition/removal changes the renderer list

// TODO: main overlay changed

// TODO: check how changes in the order affect scales

export default function test(stack, chart) {

    stack.startTest('Overlay add/remove test')

    stack.add('Set base dataset', () => {
        chart.data = baseData
    })

    stack.add('Add first overlay (onchart)', () => {
        chart.data.panes[0].overlays.push({
            name: 'SMA 1',
            type: 'Spline',
            data: data1,
            props: {
                color: '#4cba5c'
            }
        })
        chart.update()
    })

    stack.add('Add second overlay (onchart)', () => {
        chart.data.panes[0].overlays.push({
            name: 'SMA 2',
            type: 'Spline',
            data: data2,
            props: {
                color: '#4c8cba'
            }
        })
        chart.update()
    })

    stack.add('Add pane with overlay', () => {
        chart.data.panes.push({ overlays: [] })
        chart.data.panes[1].overlays.push({
            name: 'SMA 1',
            type: 'Spline',
            data: data1,
            props: {
                color: '#4c8cba'
            }
        })
        chart.update()
    })

    stack.add('Add overlay with new scale', () => {
        chart.data.panes[1].overlays.push({
            name: 'SMA(RND)',
            type: 'Spline',
            data: data3,
            props: {
                color: '#c93660'
            },
            settings: {
                scale: {
                    name: 'new'
                }
            }
        })
        chart.update()
    })

    stack.pause()

    stack.add('Remove ov from the end of overlays[]', () => {
        chart.data.panes[1].overlays.pop()
        chart.update()
    })

    stack.add('Remove main overlay', () => {
        chart.data.panes[0].overlays.shift()
        chart.update()
    })

    stack.add('Sweep overlay from one pane to another', () => {
        let ov = chart.data.panes[0].overlays.pop()
        chart.data.panes[1].overlays.push(ov)

        chart.update()
    })

    stack.add('Add new main overlay at the beginning', () => {
        chart.data.panes[0].overlays.unshift(
            baseCopy
        )
        chart.update()
    })

}
