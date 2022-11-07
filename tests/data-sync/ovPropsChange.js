
// Overlay props changes

import data from '../../data/data-2.json?id=ovPropsChange'

function rndColor() {
    return "#" + ("000000" + Math.floor(Math.random() * 16777216).toString(16)).substr(-6);
}

export default function test(stack, chart) {

    stack.startTest('Overlay props change test')

    stack.add('Set base data', () => {
        chart.data = data
    })

    stack.add('Make overlay lines bolder', () => {
        chart.data.panes[0].overlays[0].props.lineWidth = 2
        chart.data.panes[1].overlays[0].props.lineWidth = 2
        chart.data.panes[1].overlays[1].props.lineWidth = 2
        chart.update()
    })

    stack.add('Change line colors', () => {
        chart.data.panes[0].overlays[0].props.color = rndColor()
        chart.data.panes[1].overlays[0].props.color = rndColor()
        chart.data.panes[1].overlays[1].props.color = rndColor()
        chart.update()
    })

    stack.endTest()

}
