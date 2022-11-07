
// Testing various scale changes

import baseData from '../../data/data-scales.json?id=scaleChange'
import data1 from '../../data/ov-data-1.json?id=scaleChange'
import data2 from '../../data/ov-data-2.json?id=scaleChange'
import data3 from '../../data/ov-data-3.json?id=scaleChange'

export default function test(stack, chart) {

    stack.startTest('Scale changes test')

    stack.add('Set base dataset', () => {
        chart.data = baseData
    })

    stack.add('Move overlay to an existing scale', () => {
        chart.data.panes[1].overlays[1].settings.scale = 'A'
        chart.update()
    })

    stack.add('Move overlay to a new scale, change template', () => {
        chart.data.panes[1].overlays[1].settings.scale = 'X'
        chart.data.panes[1].settings.scaleTemplate = [[], ['A', 'B', 'X']]
        chart.update()
    })

    stack.add('Move overlay back, don`t change template', () => {
        chart.data.panes[1].overlays[1].settings.scale = 'B'
        chart.update()
    })

    stack.add('Switch overlay scales', () => {
        chart.data.panes[1].overlays[0].settings.scale = 'B'
        chart.data.panes[1].overlays[1].settings.scale = 'A'
        chart.update()
    })

    stack.add('Switch overlay sides (change template)', () => {
        chart.data.panes[1].settings.scaleTemplate = [['A'], ['B']]
        chart.update()
    })

    stack.add('Switch overlay sides (change template) 2', () => {
        chart.data.panes[1].settings.scaleTemplate = [['A', 'B'], []]
        chart.update()
    })

    stack.add('Move one overlay to the right', () => {
        chart.data.panes[1].settings.scaleTemplate = [['B'], ['A']]
        chart.update()
    })

    stack.add('Change presision of scale A', () => {
        chart.data.panes[1].settings.scales = {
            A: { precision: 2 }
        }
        chart.update()
    })

    stack.add('Change presision of scale B', () => {
        chart.data.panes[1].settings.scales = {
            B: { precision: 2 }
        }
        chart.update()
    })

    stack.endTest()
}
