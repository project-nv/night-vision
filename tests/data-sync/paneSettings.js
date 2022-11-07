
// Pane settings changes

import data from '../../data/data-2.json?id=paneSettings'

export default function test(stack, chart) {

    stack.startTest('Pane settings test')

    stack.add('Set base data', () => {
        chart.data = data
    })

    stack.add('Change selected scale index & side idx', () => {
        chart.events.emitSpec('hub', 'set-scale-index', {
            paneId: 1,
            index: 1,
            sideIdxs: ['A', 'B']
        })
    })

    stack.add('Test scaleIndex out of range', () => {
        chart.events.emitSpec('hub', 'set-scale-index', {
            paneId: 1,
            index: 'X',
            sideIdxs: ['A', 'A']
        })
        chart.update()
    })


    stack.add('Test sideIdxs out of range', () => {
        chart.events.emitSpec('hub', 'set-scale-index', {
            paneId: 1,
            index: 0,
            sideIdxs: ['X', 'Z']
        })
        chart.update()
    })

    stack.add('Reset sideIdxs and check auto-detect algo', () => {
        chart.events.emitSpec('hub', 'set-scale-index', {
            paneId: 1,
            index: 0,
            sideIdxs: null
        })
        chart.update()
    })

    stack.add('Resize second pane', () => {
        chart.data.panes[1].settings.height = 1
        chart.update()
    })

    stack.add('Resize first pane back', () => {
        chart.data.panes[0].settings.height = 1.618
        chart.update()
    })


    stack.endTest()

}
