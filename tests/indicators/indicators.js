
const FILES = import.meta.glob(
    '../../data/indicators/*.json', { eager: true })

let IND = {}

for (var file in FILES) {
    let [fn, ext] = file.split('.json')
    IND[fn] = FILES[file].default
}

export default function test(stack, chart) {

    stack.startTest('All indicators')

    for (var fn in IND) {
        stack.add(`Set ${fn}`, ($fn => {
            return () => {
                chart.data = IND[$fn]
                chart.fullReset()
                chart.se.uploadAndExec()
            }
        })(fn))
        stack.stop()
    }

    stack.endTest()

}
