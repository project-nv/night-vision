// Grid layer (actuall # grid). Extends Layer class,
// TODO: can be replaced by overlay script

import Layer from '../layer.js'
import Const from '../../stuff/constants.js'

const HPX = Const.HPX

export default class Grid extends Layer {

    constructor(id) {
        super(id, '__$Grid__')

        this.id = id
        this.zIndex = -1000000 // Deep down in the abyss
        this.ctxType = 'Canvas'

        this.overlay = {
            draw: this.draw.bind(this),
            destroy: this.destroy.bind(this)
        }

        this.env = {
            update: this.envEpdate.bind(this),
            destroy: () => {}
        }
    }

    draw(ctx) {

        let layout = this.layout
        if (!layout) return

        ctx.strokeStyle = this.props.colors.grid
        ctx.beginPath()

        const ymax = layout.height
        for (var [x, p] of layout.xs) {

            ctx.moveTo(x + HPX, 0)
            ctx.lineTo(x + HPX, ymax)

        }

        for (var [y, y$] of layout.ys) {

            ctx.moveTo(0, y + HPX)
            ctx.lineTo(layout.width, y + HPX)

        }

        ctx.stroke()

    }

    envEpdate(ovSrc, layout, props) {
        this.ovSrc = ovSrc
        this.layout = layout
        this.props = props
    }

    destroy() {}
}
