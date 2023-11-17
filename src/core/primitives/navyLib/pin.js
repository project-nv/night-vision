// Interactive pin 

export default class Pin {

    constructor(core, line, name, params = {}) {

        this.RADIUS = core.props.config.PIN_RADIUS 
        this.RADIUS_SQ = Math.pow(this.RADIUS + 7, 2)

        if (core.lib.Utils.isMobile) {
            this.RADIUS += 2
            this.RADIUS_SQ *= 2.5
        }

        this.COLOR_BACK = core.colors.back
        this.COLOR_BR = core.colors.text

        this.core = core
        this.line = line
        this.data = line.data
        this.name = name
        this.state = params.state || 'settled'
        this.hidden = params.hidden || false
        this.mouse = this.core.mouse

        this.init()

    }

    // Init from data
    init() {
        if (this.data && this.data[this.name]) {
            let p = this.data[this.name]
            this.t = p[0]
            this.y$ = p[1]
        }
    }

    draw(ctx) {
        if (this.hidden) return
        switch (this.state) {
            case 'tracking':
                break
            case 'dragging':
                if (!this.moved) this.draw_circle(ctx)
                break
            case 'settled':
                this.draw_circle(ctx)
                break
        }
    }

    draw_circle(ctx) {

        if (this.line.selected) {
            var r = this.RADIUS, lw = 1.5
        } else {
            var r = this.RADIUS * 0.95, lw = 1
        }

        ctx.lineWidth = lw
        ctx.strokeStyle = this.COLOR_BR
        ctx.fillStyle = this.COLOR_BACK
        ctx.beginPath()
        ctx.arc(
            this.x = this.core.layout.time2x(this.t),
            this.y = this.core.layout.value2y(this.y$),
            r + 0.5, 0, Math.PI * 2, true)
        ctx.fill()
        ctx.stroke()
    }

    update() {

        let y$ = this.core.layout.y2value(this.core.cursor.y)

        this.x = this.core.cursor.x
        this.y = this.core.cursor.y
        this.t = this.core.cursor.time
        this.y$ = y$

        // Save current position in dataExt
        this.data[this.name] = [this.t, this.y$]

    }

    mousemove(event) {

        switch (this.state) {
            case 'tracking':
            case 'dragging':
                this.moved = true
                this.update()
                break
        }


    }

    mousedown(event, force = false) {
        const Utils = this.core.lib.Utils
        if (Utils.defaultPrevented(event) && !force) return
        switch (this.state) {
            case 'tracking':
                this.state = 'settled'
                if (this.onSettled) this.onSettled()
                this.core.events.emit('scroll-lock', false)
                break
            case 'settled':
                if (this.hidden) return
                if (this.hover()) {
                    this.state = 'dragging'
                    this.moved = false
                    this.core.events.emit('scroll-lock', true)
                    //TODO: this.core.events.emit('object-selected') 
                }
                break
        }
        if (this.hover()) {
            event.preventDefault()
        }
    }

    mouseup(event) {
        switch (this.state) {
            case 'dragging':
                this.state = 'settled'
                if (this.onSettled) this.onSettled()
                this.core.events.emit('scroll-lock', false)
                break
        }
    }

    on(name, handler) {
        switch (name) {
            case 'settled':
                this.onSettled = handler
                break
        }
    }

    hover() {
        let x = this.x
        let y = this.y
        return (
            (x - this.mouse.x) * (x - this.mouse.x) +
            (y - this.mouse.y) * (y - this.mouse.y)
        ) < this.RADIUS_SQ
    }

}