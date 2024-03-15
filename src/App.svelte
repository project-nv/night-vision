<!-- App.svelte -->
<script>
import.meta.hot
import { NightVision } from './index.js'
import { onMount } from 'svelte'
import data from '../data/data-ohlcv-rsi.json?id=main'
import data2 from '../data/data-area.json?id=main-2'
import data3 from '../data/data-aapl.json?id=main-3'
import TestStack from '../tests/testStack.js'


// Tests
import fullReset from '../tests/data-sync/fullReset.js'
import paneAddRem from '../tests/data-sync/paneAddRem.js'
import paneSettings from '../tests/data-sync/paneSettings.js'
import ovAddRem from '../tests/data-sync/ovAddRem.js'
import scaleChange from '../tests/data-sync/scaleChange.js'
import mainOverlay from '../tests/data-sync/mainOverlay.js'
import ovSettings from '../tests/data-sync/ovSettings.js'
import ovPropsChange from '../tests/data-sync/ovPropsChange.js'
import ovDataChange from '../tests/data-sync/ovDataChange.js'

// More tests
import realTime from '../tests/real-time/realTime.js'

// More tests
import timeBased from '../tests/tfs-test/allTimeBased.js'
import indexBased from '../tests/tfs-test/allIndexBased.js'

// More tests
import indicators from '../tests/indicators/indicators.js'
import rangeTool from '../tests/tools/rangeTool.js'
import lineTool from '../tests/tools/lineTool.js'
import watchPropTest from '../tests/navy/watchPropTest.js'

// More tests
import logScaleTest from '../tests/scales/logScale.js'
import memoryTest from '../tests/memory/memoryTest.js'

/*
TODO: data-api interface:
.getPanes()
.getAllOverlays()
.pane('main').getRenderers()
.pane(0).getOverlay('<name>').getRenderer() // id
...
*/

// TODO: Memory leak tests

let stack = new TestStack()
let chart = null

//data.indexBased = true

onMount(() => {
    chart = new NightVision('chart-container', {
        data: data,
        //autoResize: true,
        //indexBased: true
    })
    //chart.data = data2
    window.chart = chart
    window.stack = stack

    stack.setGroup('data-sync')

    fullReset(stack, chart)
    paneAddRem(stack, chart)
    paneSettings(stack, chart)
    ovAddRem(stack, chart)
    scaleChange(stack, chart)
    mainOverlay(stack, chart)
    ovSettings(stack, chart)
    ovPropsChange(stack, chart)
    ovDataChange(stack, chart)

    stack.setGroup('real-time')

    realTime(stack, chart)

    stack.setGroup('tfs-test')

    timeBased(stack, chart)
    indexBased(stack, chart)

    stack.setGroup('ind-test')

    indicators(stack, chart)

    stack.setGroup('tools-test')

    //rangeTool(stack, chart)
    lineTool(stack, chart)

    stack.setGroup('navy-test')

    watchPropTest(stack, chart)

    stack.setGroup('scales-test')

    logScaleTest(stack, chart)

    stack.setGroup('memory-test')

    memoryTest(stack, chart)

    //  Type in the console: stack.execAll()
    //  or: stack.exec('<group>')    

})

</script>
<style>
#chart-container {
    position: absolute;
    width: 100%;
    height: 100%;
}
</style>
<div class="app">
    <div id="chart-container"></div>
</div>
