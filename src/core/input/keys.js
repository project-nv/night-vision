// Tracking the state of keyboard (easy access) 

export default class Keys {

    constructor(core) {
        this.core = core
        this.map = {}
        this.listeners = 0
        this.keymap = {}
    }

    on(name, handler) {
        if (!handler) return
        this.map[name] = this.map[name] || []
        this.map[name].push(handler)
        this.listeners++
    }

    // Called by Grid.svelte
    emit(name, event) {
        if (name in this.map) {
            for (var f of this.map[name]) {
                f(event)
            }
        }
        if (name === 'keydown') {
            if (!this.keymap[event.key]) {
                this.emit(event.key)
            }
            this.keymap[event.key] = true
        }
        if (name === 'keyup') {
            this.keymap[event.key] = false
        }
    }

    pressed(key) {
        return !!this.keymap[key]
    }

}