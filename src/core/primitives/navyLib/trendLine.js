// Interactive trend line (line, ray or segment)
// Combining line primitive and pins

export default class TrendLine {

    constructor(core, line, nw = false) {
        this.core = core
        this.data = line
        this.hover = false
        this.selected = false
        this.onSelect = () => {}
        switch (line.type) {
            case 'segment':
                this.line = new core.lib.Segment(core)
            break
        }
        this.pins = [
            new core.lib.Pin(core, this, 'p1'),
            new core.lib.Pin(core, this, 'p2')
        ]
        if (nw) this.pins[1].state = 'tracking'
    }

    draw(ctx) {

        this.line.update(this.data.p1, this.data.p2)
        ctx.lineWidth = 1
        ctx.strokeStyle = '#33ff33'
        ctx.beginPath()
        this.line.draw(ctx)
        ctx.stroke()

        if (this.hover || this.selected) {
            for (var pin of this.pins) {
                pin.draw(ctx)
            }
        }
    }

    collision() {
        const mouse = this.core.mouse
        let [x, y] = [mouse.x, mouse.y]
        return this.line.collision(x, y)
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
}