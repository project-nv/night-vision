


import data from '../../data/data-2.json?id=ovDataChange'

let updater = data => {
    data[data.length - 1][1] += (Math.random() - 0.45) / 100
    data[data.length - 1][1] = parseFloat(data[data.length - 1][1].toFixed(4))
}
let ids = []
let counter = 0

export default function test(stack, chart) {

    stack.startTest('Overlay data change test')

    stack.add('Set base data', () => {
        console.log('SELECT DATA RANGE')
        chart.data = data
    }, { delay: 5000 })

    stack.add('Start data updates', () => {
        console.log('Data length = ', chart.hub.mainOv.dataSubset.length)
        let tester = () => {
            let d1 = chart.data.panes[0].overlays[0].data
            let d2 = chart.data.panes[1].overlays[0].data
            let d3 = chart.data.panes[1].overlays[1].data

            updater(d1)
            updater(d2)
            updater(d3)

            chart.update()
            counter++
        }

        for (var i = 0; i < 10; i++) {
            ids.push(setInterval(tester))
        }

    }, { delay: 10000 } )

    stack.add('Stop data updates', () => {

        for (var id of ids) {
            clearInterval(id)
        }

        console.log('Avg. speed: ', (counter / 10).toFixed(0), 'upd/sec')

    })

    stack.endTest()

}
