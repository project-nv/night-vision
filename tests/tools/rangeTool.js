
// Full data reset test

import data from '../../data/data-ohlcv-rsi.json?id=rangeTool'

export default function test(stack, chart) {

    stack.startTest('RangeTool test')

    stack.add('Set base dataset', () => {
        chart.data = data
        chart.fullReset()
        chart.se.uploadAndExec()
    })

    stack.add('Add RangeTool to dataset', () => {
        for (var p = 0; p < 2; p++) {
            chart.data.panes[p].overlays.push({
                name: 'RangeTool',
                type: 'RangeTool',
                data: [],
                props: {},
                settings: {
                    zIndex: 1000
                }
            })
        }
        chart.update()
    })

    stack.add('Press SHIFT+click', () => {})

    stack.endTest()

}
