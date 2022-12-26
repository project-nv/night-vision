
// Candle object for Candles overlay

import Const from '../../../stuff/constants.js'

const HPX = Const.HPX

export default class Candle {

    constructor(core, props, ctx, data) {
        this.ctx = ctx
        this.core = core
        this.style = data.src[6] || props
        this.draw(data)
    }

    draw(data) {
        const green = data.src[4] >= data.src[1]
        const bodyColor = green ?
            this.style.colorCandleUp :
            this.style.colorCandleDw

        const wickColor = green ?
            this.style.colorWickUp :
            this.style.colorWickDw

        let w = Math.max(data.w, 1)
        //let hw = Math.max(Math.floor(w * 0.5), 1)
        //let h = Math.abs(data.o - data.c)
        //let max_h = data.c === data.o ? 1 : 2
        let x05 = data.x - 1 // Math.floor(data.x) + HPX

        this.ctx.lineWidth = 1
        this.ctx.strokeStyle = wickColor

        this.ctx.beginPath()
        this.ctx.moveTo(x05, Math.floor(data.h))
        this.ctx.lineTo(x05, Math.floor(data.l))

        this.ctx.stroke()

        /*if (data.w > 1.5) {

            this.ctx.fillStyle = bodyColor
            // TODO: Move common calculations to layout.js
            let s = green ? 1 : -1
            this.ctx.fillRect(
                Math.floor(data.x - hw -1),
                data.c,
                Math.floor(hw * 2 + 1),
                s * Math.max(h, max_h),
            )

        } else {*/
            this.ctx.lineWidth = w
            this.ctx.strokeStyle = bodyColor

            this.ctx.beginPath()
            this.ctx.moveTo(
                x05,
                Math.floor(Math.min(data.o, data.c)),
            )
            this.ctx.lineTo(
                x05,
                Math.floor(Math.max(data.o, data.c)) +
                    (data.o === data.c ? 1 : 0)
            )

            this.ctx.stroke()

    //    }

    }

}
