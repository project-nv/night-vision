
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
                dataExt: {
                    lines: [
                        {
                            type: 'segment',
                            p1: [1663347600000, 4.56],
                            p2: [1663416000000, 4.7],
                            uuid: '123'
                        }
                    ]
                }, // Here we place non-timeseries data
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
