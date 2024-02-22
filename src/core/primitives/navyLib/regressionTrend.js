// Interactive Regression Trend
// Combining line primitives, pins, and a linear regression

import { regressionMedLine } from '../../../stuff/linreg.js'

export default class RegressionTrend {
    constructor(core, inputLine, nw = false, params = { extend: true }) {
        this.extend = params.extend
        this.core = core
        this.data = inputLine
        this.hover = false
        this.selected = false
        this.onSelect = () => {}
        switch (inputLine.type) {
            case 'segment':
                this.inputLine = new core.lib.Segment(core)
                break
        }
        this.pins = [
            new core.lib.Pin(core, this, 'p1'),
            new core.lib.Pin(core, this, 'p2')
        ]

        for (var pin of this.pins) {
            pin.onSettled = () => {
                this.calculateRegression()
            }
        }
        if (nw) {
            this.pins[1].state = 'tracking'
        }

        this.boundaryPoints = {}
        this.boundaryRays = [
            new core.lib.Segment(core),
            new core.lib.Segment(core)
        ]

        if (this.extend) {
            this.medianExtensionLine = new core.lib.Segment(core)
        }
    }

    draw(ctx) {
        // adjust input line
        this.inputLine.update(this.data.p1, this.data.p2)

        if (
            !(
                this.pins[1].state === 'dragging' ||
                this.pins[0].state === 'dragging'
            ) &&
            Object.keys(this.boundaryPoints).length != 0
        ) {
            ctx.setLineDash([])
            // ctx.lineWidth = 1.5
            ctx.strokeStyle = '#5482f6'

            // draw upper boundary ray
            this.boundaryRays[0].update(
                this.boundaryPoints.u1,
                this.boundaryPoints.u2
            )
            ctx.beginPath()
            this.boundaryRays[0].draw(ctx)
            ctx.stroke()

            // draw lower boundary ray
            this.boundaryRays[1].update(
                this.boundaryPoints.l1,
                this.boundaryPoints.l2
            )
            ctx.beginPath()
            this.boundaryRays[1].draw(ctx)
            ctx.stroke()

            // if extended, draw additional segment for median line
            // begins at the endpoint of the inputline, ends halfway between the two boundary points.

            if (this.extend) {
                // very janky way of calculating p2
                // need to reconsider output of regressionMedLine()

                let median$2 =
                    (this.boundaryPoints.u2[1] + this.boundaryPoints.l2[1]) / 2
                this.medianExtensionLine.update(this.data.p2, [
                    this.boundaryPoints.l2[0],
                    median$2
                ])
                ctx.setLineDash([3, 3])
                ctx.strokeStyle = '#b24d65'
                ctx.beginPath()
                this.medianExtensionLine.draw(ctx)
                ctx.stroke()
                ctx.setLineDash([])
            }

            // fill upper area

            ctx.globalAlpha = 0.5
            ctx.beginPath()
            ctx.moveTo(this.boundaryRays[0].x1, this.boundaryRays[0].y1)
            ctx.lineTo(this.boundaryRays[0].x2, this.boundaryRays[0].y2)
            this.extend
                ? ctx.lineTo(
                      this.medianExtensionLine.x2,
                      this.medianExtensionLine.y2
                  )
                : ctx.lineTo(this.inputLine.x2, this.inputLine.y2)
            ctx.lineTo(this.inputLine.x1, this.inputLine.y1)
            ctx.closePath()
            ctx.fillStyle = '#1d2e5c'
            ctx.fill()

            // fill lower area
            ctx.beginPath()
            ctx.moveTo(this.boundaryRays[1].x1, this.boundaryRays[1].y1)
            ctx.lineTo(this.boundaryRays[1].x2, this.boundaryRays[1].y2)
            this.extend
                ? ctx.lineTo(
                      this.medianExtensionLine.x2,
                      this.medianExtensionLine.y2
                  )
                : ctx.lineTo(this.inputLine.x2, this.inputLine.y2)
            ctx.lineTo(this.inputLine.x1, this.inputLine.y1)
            ctx.closePath()
            ctx.fillStyle = '#5b2228'
            ctx.fill()

            ctx.globalAlpha = 1
        }

        ctx.setLineDash([3, 3])
        // ctx.lineWidth = 1
        this.pins[1].state === 'dragging' || this.pins[0].state === 'dragging'
            ? (ctx.strokeStyle = '#33ff33')
            : (ctx.strokeStyle = '#b24d65')

        ctx.beginPath()
        this.inputLine.draw(ctx)
        ctx.stroke()
        ctx.setLineDash([])

        // TODO: consider other conditions or mechanics for selection.
        // want to have pins show whenever any of the RegressionTrend object is selected.
        if (this.hover || this.selected) {
            // console.log(this.pins[0].state, this.pins[1].state)
            for (var pin of this.pins) {
                pin.draw(ctx)
            }
        }
    }

    collision() {
        const mouse = this.core.mouse
        let [x, y] = [mouse.x, mouse.y]
        return this.inputLine.collision(x, y)
    }

    propagate(name, data) {
        for (var pin of this.pins) {
            pin[name](data)
        }
    }

    mousedown(event) {
        this.propagate('mousedown', event)
        if (this.collision()) {
            this.onSelect(this.data.uuid)
        }
    }

    mouseup(event) {
        this.propagate('mouseup', event)
    }

    mousemove(event) {
        this.hover = this.collision()
        this.propagate('mousemove', event)
    }

    // there has to be an inbuilt for this, possibly within symbol.js?
    // should be replaced with a param to choose source
    transformCloseArray(inputArray) {
        return inputArray.map((subArray) => subArray[4])
    }

    calculateRegression() {
        console.log('finished tracking')
        // filter dataSubset
        let regressionWindowData = this.core.hub
            .filter(this.core.hub.mainOv.dataSubset, [
                this.pins[0].t,
                this.pins[1].t
            ])
            .makeUnexpandedSubset()

        let closePoints = this.transformCloseArray(regressionWindowData)
        // must be mindful that the output of regressionMedLine is using an index based approach, which is essentially normalizing the time values.
        // TODO: refactor regressionMedLine to accomodate a third point $3 for extending the trendline
        // Consider a function that takes a dataSubset and the two pin points as inputs
        let { m, b, stdDev } = regressionMedLine(closePoints)
        let $1 = m * 0 + b // for the first point
        let $2 = m * (regressionWindowData.length - 1) + b // for the last point

        this.pins[0].y$ = $1
        this.pins[1].y$ = $2

        // adjust input trend line points
        this.data.p1 = [this.pins[0].t, $1]
        this.data.p2 = [this.pins[1].t, $2]

        // adjust upper boundary ray points
        this.boundaryPoints.u1 = [this.pins[0].t, $1 + stdDev]
        this.boundaryPoints.u2 = [this.pins[1].t, $2 + stdDev]

        // adjust lower boundary ray points
        this.boundaryPoints.l1 = [this.pins[0].t, $1 - stdDev]
        this.boundaryPoints.l2 = [this.pins[1].t, $2 - stdDev]

        // if extending, use the slope of the regression window but use the
        // end point of our boundaries for the last value in dataSubset
        // has to go from the first point of the regression, to the last point in the dataSubset.
        if (this.extend) {
            let tLast =
                this.core.hub.mainOv.dataSubset[
                    this.core.hub.mainOv.dataSubset.length - 1
                ][0]

            // there must be a way to do this without recalculating the datawindow.
            // had to do this because the slope m is index based. Couldn't figure it out using just dataSubset.length and regressionWindowData.length
            let extendedWindowData = this.core.hub
                .filter(this.core.hub.mainOv.dataSubset, [
                    this.pins[0].t,
                    tLast
                ])
                .makeUnexpandedSubset()
            $2 = m * (extendedWindowData.length - 1) + b
            this.boundaryPoints.u2 = [tLast, $2 + stdDev]
            this.boundaryPoints.l2 = [tLast, $2 - stdDev]
        }
    }
}
