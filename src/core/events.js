
// Central event manager

class Events {

    // TODO: add component call priority (think)
    // TODO: build event inspector (think)
    constructor() {
        this.handlers = {}
    }

    // Immediately calls all handlers with the
    // specified type (there can be only one
    // listener of this type per each component)
    emit(type, obj) {

        // General update
        // components: { name1: h1, name2, h2, ... }
        let components = this.handlers[type]
        if (!components) return

        for (var name in components) {
            components[name](obj)
        }
    }

    // Component-specific update
    emitSpec(comp, type, obj) {
        let components = this.handlers[type]
        if (!components) return
        if (!components[comp]) return
        components[comp](obj)
    }

    // TODO: imlement more specific emitter, e.g.
    // emitRegex() which uses RegEx to match
    // components

    // Add event listener to a specific component:
    // '<component>:<event-type>'
    on(compAndType, f) {
        let [comp, type] = compAndType.split(':')
        if (!this.handlers[type]) {
            this.handlers[type] = {}
        }
        this.handlers[type][comp] = f
    }

    // Remove event listeners / one listener
    off(comp, type = null) {
        // Remove one listener
        if (type && this.handlers[type]) {
            delete this.handlers[type][comp]
            return
        }

        // Clear all listeners on the component
        for (var type in this.handlers) {
            delete this.handlers[type][comp]
        }
    }

}


let instances = {}

function instance(id) {
    if (!instances[id]) {
        instances[id] = new Events(id)
    }
    return instances[id]
}

export default { instance }
