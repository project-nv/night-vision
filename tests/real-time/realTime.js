// Real-time data test

import { DataLoader } from './lib/dataLoader.js'

export default function test(stack, chart) {

    stack.startTest('Real-time data test')

    stack.add('Load the data', () => {

        let dl = new DataLoader();

        // Load the first piece of the data
        dl.load((data) => {
            chart.data = data;
            chart.fullReset()
            //el("loading").hidden = true;
        });

        function loadMore() {
            let data = chart.hub.mainOv.data;
            let t0 = data[0][0];
            if (chart.range[0] < t0) {
                //el("loading").hidden = false;
                dl.loadMore(t0 - 1, (chunk) => {
                    // Add a new chunk at the beginning
                    data.unshift(...chunk);
                    // Yo need to update "range"
                    // when the data range is changed
                    chart.update("range");
                       //el("loading").hidden = true;
                });
            }
        }

        // Load new data when user scrolls left
        chart.events.on("app:$range-update", loadMore)

        // Plus check for updates every second
        setInterval(loadMore, 500)
    })

    stack.endTest()

}
