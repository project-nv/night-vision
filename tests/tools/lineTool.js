
// LineTool data set 

import data from '../../data/data-ohlcv-rsi.json?id=lineTool'

export default function test(stack, chart) {

    stack.startTest('LineTool test')

    stack.add('Set base dataset', () => {
        chart.data = data
        chart.fullReset()
        chart.se.uploadAndExec()
    })

    stack.add('Add LineTool to dataset', () => {
        for (var p = 0; p < 2; p++) {
            chart.data.panes[p].overlays.push({
                name: 'LineTool',
                type: 'LineTool',
                data: [],
                dataExt: {}, // Here we place non-timeseries data
                props: {},
                settings: {
                    zIndex: 1
                }
            })
        }
        chart.update()
    })

    stack.add('Tap & hold to create a line', () => { })

    stack.endTest()

}
