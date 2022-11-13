
const FILES = import.meta.glob(
    '../../data/all-time-frames/*.json', { eager: true })

let TFS = {}

for (var file in FILES) {
    let [fn, ext] = file.split('.json')
    let tf = fn.split('-').pop()
    TFS[tf] = FILES[file].default
    TFS[tf].indexBased = true // Set the IB Mode
    TFS[tf].panes[0].overlays[0].name += ' [IB]'
}

/* FIX:
    - 12 H (fix month offset )
    - 1 D (fix month offset )
    - 1 M (fix year offset )
    - 1 s (More divisions)
    - 5 m (Daily offset fix again ???)
*/

export default function test(stack, chart) {

    stack.startTest('All timeframes, index-based')

    for (var tf in TFS) {
        stack.add(`Set ${tf} data`, ($tf => {
            return () => {
                chart.data = TFS[$tf]
                chart.fullReset()
            }
        })(tf))
        stack.stop()
    }

    stack.endTest()

}
