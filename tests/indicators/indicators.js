
import Utils from '../../src/stuff/utils.js'

const FILES = import.meta.glob(
    '../../data/indicators/*.json', { eager: true })

let IND = {}

for (var file in FILES) {
    let [fn, ext] = file.split('.json')
    IND[fn.split('/').pop().split('-')[0]] = FILES[file].default
}

export default function test(stack, chart) {

    stack.startTest('All indicators')

    stack.add(`Choose indicator to show`, () => {
        chart.data = IND['rsi']
        chart.fullReset()
        chart.se.uploadAndExec()

        console.log(
            '%c Call ind(<indicator-name>) \n or showcase()',
            'font-size: 1.25em; color: orange;')

        window.ind = (name) => {
            name = name.toLowerCase()
            if (!IND[name]) {
                console.warn('There is no indicator ' + name + '\n',
                `Indicator list: \n ${Object.keys(IND)}`)
                return
            }
            chart.data = IND[name]
            chart.fullReset()
            chart.se.uploadAndExec()
        }

        window.showcase = async (delay = 1000) => {
            for (var name in IND) {
                chart.data = IND[name]
                chart.fullReset()
                chart.se.uploadAndExec()
                await Utils.pause(delay)
            }
        }
    })
    stack.stop()
    stack.endTest()

}
