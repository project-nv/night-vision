
// Full data reset test

import data1 from '../../data/data-1.json?id=fullReset'
import data2 from '../../data/data-2.json?id=fullReset'
import data3 from '../../data/data-3.json?id=fullReset'

const EMPTY = {}

export default function test(stack, chart) {

    stack.startTest('Full-reset test')

    stack.add('Set base dataset', () => {
        chart.data = data1
    })

    stack.add('Set dataset #1', () => {
        chart.data = data2
    })

    stack.add('Set dataset #2', () => {
        chart.data = data3
    })

    stack.add('Set dataset #3', () => {
        chart.data = data1
    })

    stack.add('Set empty dataset', () => {
        chart.data = EMPTY
    })

    stack.endTest()

}
