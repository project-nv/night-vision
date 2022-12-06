
/* Listens to native keyboard events,
   propagates to all overlays through Grid */

export default class Keyboard {

    constructor(updId, events) {
        this._keydown = this.keydown.bind(this)
        this._keyup = this.keyup.bind(this)
        this._keypress = this.keypress.bind(this)
        window.addEventListener('keydown', this._keydown)
        window.addEventListener('keyup', this._keyup)
        window.addEventListener('keypress', this._keypress)
        this.events = events
        this.updId = updId
    }

    off() {
        window.removeEventListener('keydown', this._keydown)
        window.removeEventListener('keyup', this._keyup)
        window.removeEventListener('keypress', this._keypress)
    }

    keydown(event) {
        this.events.emitSpec(this.updId, 'propagate', {
            name: 'keydown',
            event: event
        })
    }

    keyup(event) {
        this.events.emitSpec(this.updId, 'propagate', {
            name: 'keyup',
            event: event
        })
    }

    keypress(event) {
        this.events.emitSpec(this.updId, 'propagate', {
            name: 'keypress',
            event: event
        })
    }
}
