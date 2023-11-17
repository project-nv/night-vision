// Tracking the state of mouse (easy access) 

export default class Mouse {

    constructor(core) {
        const l = core.layout
        this.core = core
        this.map = {}
        this.listeners = 0
        this.pressed = false
        this.x = core.cursor.x
        this.y = core.cursor.y
        this.t = core.cursor.t
        this.y$ = l.y2value(core.cursor.y)
    }

    // You can choose where to place the handler
    // (beginning or end of the queue)
    on(name, handler, dir = "unshift") {
        if (!handler) return
        this.map[name] = this.map[name] || []
        this.map[name][dir](handler)
        this.listeners++
    }

    off(name, handler) {
        if (!this.map[name]) return
        let i = this.map[name].indexOf(handler)
        if (i < 0) return
        this.map[name].splice(i, 1)
        this.listeners--
    }

    // Called by Grid.svelte
    emit(name, event) {
        const l = this.core.layout
        if (name in this.map) {
            for (var f of this.map[name]) {
                f(event)
            }
        }
        if (name === 'mousemove') {
            this.x = event.layerX
            this.y = event.layerY
            this.t = l.x2time(this.x)
            this.y$ = l.y2value(this.y)
        }
        if (name === 'mousedown') {
            this.pressed = true
        }
        if (name === 'mouseup') {
            this.pressed = false
        }
    }

}