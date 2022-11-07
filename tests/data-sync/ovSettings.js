
// Overlay settings changes

import data from '../../data/data-2.json?id=ovSettings'

// zIndex
// display
// precision

export default function test(stack, chart) {

    stack.startTest('Overlay settings change test')

    stack.add('Set base data', () => {
        chart.data = data
    })

    stack.add('Make overlay line bolder', () => {
        chart.data.panes[1].overlays[0].props.lineWidth = 5
        chart.data.panes[1].overlays[1].props.lineWidth = 5
        chart.update()
    })

    stack.add('Move the first ov to the top', () => {
        chart.data.panes[1].overlays[0].settings.zIndex = 1
        chart.update('grid-1')
    })

    stack.add('Hide second overlay', () => {
        chart.data.panes[1].overlays[1].settings.display = false
        chart.update('legend-1')
    })

    stack.add('Show second overlay back', () => {
        chart.data.panes[1].overlays[1].settings.display = true
        chart.update('legend-1')
    })

    stack.endTest()

}
