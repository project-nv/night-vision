
const FILES = import.meta.glob(
    '../../data/all-time-frames/*.json', { eager: true })

let TFS = {}

for (var file in FILES) {
    let [fn, ext] = file.split('.json')
    let tf = fn.split('-').pop()
    TFS[tf] = FILES[file].default
}

export default function test(stack, chart) {

    stack.startTest('All timeframes, index-based')

    for (var tf in TFS) {
        stack.add(`Set ${tf} data`, ($tf => {
            return () => {
                chart.data = TFS[$tf]
                chart.data.indexBased = true // Set the IB Mode
                chart.data.panes[0].overlays[0].name += ' [IB]'
                chart.fullReset()
            }
        })(tf))
        stack.stop()
    }

    stack.endTest()

}
