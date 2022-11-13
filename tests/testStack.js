
// Enviroment for running tests. Allows to stack
// tests together, make groups, choose the speed

// TODO: stop on a first console.error

import Utils from '../src/stuff/utils.js'

export default class TestStack {

    constructor(props = {}) {

        this.groups = { 'main': {} }
        this.currentGroup = 'main'
        this.currentTest = null
        this.speed = 1
        this.stopFlag = false

        if (props.stopOnError) {
            console.errorFunction = console.error
            console.error = (...messages) => {
                console.errorFunction(...messages)
                this.stopFlag = true
            }
        }

    }

    // Start executing a test group
    async exec(group, speed = 1) {

        this.speed = speed

        if (!this.groups[group]) {
            console.warn(`There's no test group ${group}`)
            return
        }

        console.log(
            `%c Starting test group: '${group}'...`,
            'font-size: 1.5em; font-weight: bolder;'
        )

        this.currentGroup = group

        for (var testName in this.groups[group]) {

            let test = this.groups[group][testName]

            console.log(
                `%c Starting test: '${testName}'...`,
                'font-size: 1.25em; font-weight: bolder;'
            )

            this.currentTest = test

            // Going through test transactions
            for (var tx of test.txs) {

                if (this.stopFlag) {
                    console.log('[STOP] Call stack.resume()')
                    await this.pitStop()
                }

                if (tx.props.name !== '__$pause__') {
                    console.log(
                        '%c '+ tx.props.name, 'color: #48ba63'
                    )
                    tx.handler()
                }
                let delay = tx.props.delay ?? 1000;
                await Utils.pause(delay / this.speed)

            }

            this.currentTest = null

            console.log(`Test '${testName}' %c [DONE]`,
                'font-weight: bolder; color: #48ba63')

            await Utils.pause(1000 / this.speed)
        }

        console.log(`Group '${group}' %c [FINISHED]`,
            'font-weight: bolder; color: #48ba63')

        await Utils.pause(1000 / this.speed)
    }

    // Execute all groups
    async execAll(speed = 1) {

        this.speed = speed

        for (var group in this.groups) {

            // Skip groups without tests
            if (!Object.values(this.groups[group]).length) {
                continue
            }

            await this.exec(group)
        }

    }

    setGroup(group) {
        this.currentGroup = group

        if (!this.groups[group]) {
            this.groups[group] = {}
        }
    }

    // Add new test
    startTest(name) {

        let group = this.groups[this.currentGroup]

        // Add test
        group[name] = { txs: [], props: {} }

        this.currentTest = name

    }

    // Add a transaction
    add(name, handler, props = {}) {

        let group = this.groups[this.currentGroup]
        let test = group[this.currentTest]

        if (!test) {
            console.error(
                'There is no current test. Use startTest()'
            )
            return
        }

        props.name = name
        test.txs.push({ handler, props })

    }

    // End the test
    endTest() {
        this.currentTest = null
    }

    // Add pause
    pause(delay) {
        this.add('__$pause__', () => {}, { delay })
    }

    // If you need to stop after a particular tx
    stop() {
        /*this.add('__$pause__', () => {}, {
            delay: 10000000
        })*/
        this.add('__$stop__', () => {
            this.stopFlag = true
        }, { delay: 0 })
    }

    // Endless loop, until continue()
    async pitStop() {
        while(this.stopFlag) await Utils.pause(100)
    }

    resume() {
        this.stopFlag = false
    }

}
