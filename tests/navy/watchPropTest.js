
// Full data reset test

import data from '../../data/data-ohlcv-rsi.json?id=rangeTool'
import WatchProp from './scripts/WatchProp.navy'

let ov = null
let intervalId = null

export default function test(stack, chart) {

    stack.startTest('Watcha prop test')

    stack.add('Set base dataset', () => {
        chart.data = data
        chart.scripts = [WatchProp]
    })

    stack.add('Add WatchOverlay to dataset', () => {
        for (var p = 0; p < 1; p++) {
            chart.data.panes[p].overlays.push({
                name: 'WatchOverlay',
                type: 'WatchOverlay',
                data: [],
                props: {
                    color: '#00ff3333',
                    value: Math.random() * 100
                },
                settings: {
                    zIndex: 1000
                }
            })
        }
        chart.data.panes.pop()
        chart.update()
    })

    stack.add('Start changing props', () => {
        ov = chart.data.panes[0].overlays[1]
        intervalId = setInterval(() => {
            ov.props.value = Math.random() * 100
            ov.props.color = `#${Math.floor(Math.random() * 16777215).toString(16)}33`
            console.log(ov.props)
            chart.update()
        }, 1000)
    }, { delay: 5000 })

    stack.add('Remove overlay, check no events', () => {
        chart.data.panes[0].overlays.pop()
        chart.update()
    }, { delay: 5000 })

    stack.add('Stop updating', () => {
        clearInterval(intervalId)
    })

    stack.endTest()

}
