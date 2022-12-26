
// Old implementation of volume bar

import Const from '../../../stuff/constants.js'

const HPX = Const.HPX

export default class VolbarExt {

    constructor(core, props, ctx, data) {
        this.ctx = ctx
        this.style = data.src[6] || props
        this.layout = core.layout
        this.draw(data)
    }

    draw(data) {
        let y0 = this.layout.height
        let w = data.x2 - data.x1
        let h = Math.floor(data.h)

        this.ctx.fillStyle = data.green ?
            this.style.colorVolUp :
            this.style.colorVolDw

        this.ctx.fillRect(
            Math.floor(data.x1),
            Math.floor(y0 - h + HPX),
            Math.floor(w),
            Math.floor(h + 1)
        )

    }

}
