
// Full data reset test

import data from '../../data/data-aapl.json?id=logScale'

export default function test(stack, chart) {

    stack.startTest('Log-scale test')

    stack.add('Set log scale', () => {
        chart.data = data
        chart.data.panes[0].settings = {
            scales: {
                A: {
                    log: true,
                }
            }
        }
        chart.se.uploadAndExec()
    })

    stack.endTest()

}
