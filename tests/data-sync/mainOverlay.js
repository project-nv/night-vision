
import data2 from '../../data/data-2.json?id=mainOverlay'
import ovData1 from '../../data/ov-data-1.json?id=mainOverlay'
import ovData2 from '../../data/ov-data-2.json?id=mainOverlay'

export default function test(stack, chart) {

    stack.startTest('Main ovelray switch test')

    stack.add('Set base dataset', () => {
        chart.data = data2
    })

    stack.add('Add onchart overlays', () => {
        chart.data.panes[0].overlays.push({
            name: 'SMA 1',
            type: 'Spline',
            data: ovData1,
            props: {
                color: '#4cba5c'
            }
        })
        chart.data.panes[0].overlays.push({
            name: 'SMA 2',
            type: 'Spline',
            data: ovData2,
            props: {
                color: '#4c8cba'
            }
        })
        chart.update()
    })

    stack.add('Switch main overlay 1', () => {
        chart.data.panes[0].overlays[0].main = false
        chart.data.panes[0].overlays[1].main = true
        chart.update('full')
    })

    stack.add('Switch main overlay 2', () => {
        chart.data.panes[0].overlays[1].main = false
        chart.data.panes[0].overlays[2].main = true
        chart.update('full')
    })

    stack.add('Switch main overlay 3', () => {
        chart.data.panes[0].overlays[2].main = false
        chart.data.panes[1].overlays[0].main = true
        chart.update('full')
    })

    stack.add('Switch main overlay 4', () => {
        chart.data.panes[1].overlays[0].main = false
        chart.data.panes[1].overlays[1].main = true
        chart.update('full')
    })

    stack.add('Remove main overlay', () => {
        chart.data.panes[1].overlays.pop()
        chart.update('full')
    })

    stack.endTest()

}
