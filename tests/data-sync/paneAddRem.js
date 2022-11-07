
// Add/remove pane sync test

import baseData from '../../data/data-1.json'
import data from '../../data/ov-data-3.json?id=paneAddRem'

// TODO: check that meta-functions updated

export default function test(stack, chart) {

    stack.startTest('Pane add/remove test')

    stack.add('Set base dataset', () => {
        chart.data = baseData
    })

    stack.add('Hide main overlay', () => {
        chart.events.emitSpec('hub', 'display-overlay', {
            paneId: 0,
            ovId: 0,
            flag: false
        })
    })

    stack.add('Add new pane pane below', () => {
        chart.data.panes.push({
            overlays: [{
                name: 'SMA(RND)',
                type: 'Spline',
                data: data
            }]
        })
        chart.update()
    })

    stack.add('Add new pane pane above', () => {
        chart.data.panes.unshift({
            overlays: [{
                name: 'SMA(RND)',
                type: 'Spline',
                data: data
            }]
        })
        chart.update()
    })

    stack.add('Turn the main pane on', () => {
        chart.events.emitSpec('hub', 'display-overlay', {
            paneId: 1,
            ovId: 0,
            flag: true
        })
    })

    stack.add('Remove the pane below', () => {
        chart.data.panes.pop()
        chart.update()
    })

    stack.add('Remove the pane above', () => {
        chart.data.panes.shift()
        chart.update()
    })

    stack.add('Remove the main pane', () => {
        chart.data.panes.pop()
        chart.update()
    })

    stack.endTest()

}
