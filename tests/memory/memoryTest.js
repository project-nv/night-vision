
import data from '../../data/data-ohlcv-rsi.json?id=main'
import { NightVision } from '../../src/index.js'

export default function test(stack, chart) {

    stack.startTest('Memory-leak test')

    stack.add('Create multiple chart containers', () => {
        const baseContainer = document.querySelector('#chart-container');
        if (!baseContainer) {
            console.error('Base container not found.');
            return;
        }

        for (let i = 0; i < 6; i++) {
            const newContainer = document.createElement('div');
            newContainer.id = 'chart-' + i.toString();
            baseContainer.appendChild(newContainer);
        }
        chart.destroy()
    })   

    stack.add('Start create-destroy loop', () => {
        setInterval(() => {
            console.log('Create')
            let charts = []
            for (var i = 0; i < 6; i++) {
                chart = new NightVision(`chart-${i}`, {
                    id: 'nvjs-' + i,
                    data: data
                })
                charts.push(chart)
            }
            setTimeout(() => {
                console.log('Destroy')
                charts.forEach(x => x.destroy())
            }, 500)
        }, 1000)
    })

    stack.endTest()
}
