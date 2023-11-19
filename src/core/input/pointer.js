
// Regular mouse/touch input. The object can be
// attached to a renderer.
// ~ Information flow ~
// Input: mouse events / touch events
// Output: internal events

import FrameAnimation from '../../stuff/frame.js'
import Utils from '../../stuff/utils.js'
import math from '../../stuff/math.js'
import Events from '../events.js'
import DataHub from '../dataHub.js'
import MetaHub from '../metaHub.js'

export default class Input {

    async setup(comp) {

        this.MIN_ZOOM = comp.props.config.MIN_ZOOM
        this.MAX_ZOOM = comp.props.config.MAX_ZOOM

        if (Utils.isMobile) this.MIN_ZOOM *= 0.5

        this.canvas = comp.canvas
        this.ctx = comp.ctx
        this.props = comp.props
        this.layout = comp.layout
        this.rrId = comp.rrUpdId
        this.gridUpdId = comp.gridUpdId
        this.gridId = comp.id
        this.cursor = {} // TODO: implement
        this.oldMeta = {} // TODO: implement
        this.range = this.props.range
        this.interval = this.props.interval
        this.offsetX = 0
        this.offsetY = 0
        this.deltas = 0 // Wheel delta events
        this.wmode = this.props.config.SCROLL_WHEEL

        this.hub = DataHub.instance(this.props.id)
        this.meta = MetaHub.instance(this.props.id)
        this.events = Events.instance(this.props.id)

        await this.listeners()
        this.mouseEvents('addEventListener')
    }

    mouseEvents(cmd) {
        ['mousemove', 'mouseout', 'mouseup', 'mousedown', 'click']
        .forEach(e => {
            if (cmd === 'addEventListener') {
                // Save the handler to remove it later
                this['_' + e] = this[e].bind(this)
            }
            this.canvas[cmd](e, this['_' + e])
        })
    }

    async listeners() {
        const Hamster = await import('hamsterjs');
        const Hammer = await import('hammerjs');

        this.hm = Hamster.default(this.canvas)
        this.hm.wheel((event, delta) => this.mousezoom(-delta * 50, event))

        let mc = this.mc = new Hammer.Manager(this.canvas)
        let T = Utils.isMobile ? 10 : 0
        mc.add(new Hammer.Pan({ threshold: T}))
        mc.add(new Hammer.Tap())
        mc.add(new Hammer.Pinch({ threshold: 0}))
        mc.get('pinch').set({ enable: true })
        if (Utils.isMobile) mc.add(new Hammer.Press())

        mc.on('panstart', event => {
            if (this.cursor.scroll_lock) return
            if (this.cursor.mode === 'aim') {
                return this.emitCursorCoord(event)
            }
            let scaleId = this.layout.scaleIndex
            let tfrm = this.meta.getYtransform(this.gridId, scaleId)
            this.drug = {
                x: event.center.x + this.offsetX,
                y: event.center.y + this.offsetY,
                r: this.range.slice(),
                t: this.range[1] - this.range[0],
                o: tfrm ?
                    (tfrm.offset || 0) : 0,
                y_r: tfrm && tfrm.range ?
                    tfrm.range.slice() : undefined,
                B: this.layout.B,
                t0: Utils.now()
            }
            this.events.emit('cursor-locked', true)
            this.events.emit('cursor-changed', {
                gridId: this.gridId,
                x: event.center.x + this.offsetX,
                y: event.center.y + this.offsetY
            })
        })

        mc.on('panmove', event => {
            if (Utils.isMobile) {
                this.calcOffset()
                this.propagate('mousemove', this.touch2mouse(event))
            }
            if (this.drug) {
                this.mousedrag(
                    this.drug.x + event.deltaX,
                    this.drug.y + event.deltaY,
                )
                /*this.events.emit('cursor-changed', {
                    gridId: this.gridId,
                    x: event.center.x + this.offsetX,
                    y: event.center.y + this.offsetY
                })*/
            } else if (this.cursor.mode === 'aim') {
                this.emitCursorCoord(event)
            }
        })

        mc.on('panend', event => {
            if (Utils.isMobile && this.drug) {
                this.panFade(event)
            }
            this.drug = null
            this.events.emit('cursor-locked', false)
        })

        mc.on('tap', event => {
            if (!Utils.isMobile) return
            this.simMousedown(event)
            if (this.fade) this.fade.stop()
            this.events.emit('cursor-changed', {})
            this.events.emit('cursor-changed', {
                mode: 'explore'
            })
            this.events.emitSpec(this.rrId, 'update-rr')
        })

        mc.on('pinchstart', () =>  {
            this.drug = null
            this.pinch = {
                t: this.range[1] - this.range[0],
                r: this.range.slice()
            }
        })

        mc.on('pinchend', () =>  {
            this.pinch = null
        })

        mc.on('pinch', event => {
            if (this.pinch) this.pinchZoom(event.scale)
        })

        mc.on('press', event => {
            if (!Utils.isMobile) return
            if (this.fade) this.fade.stop()
            this.calcOffset()
            this.emitCursorCoord(event, { mode: 'aim' })
            setTimeout(() => this.events.emitSpec(this.rrId, 'update-rr'))
            this.simMousedown(event)
        })

        // TODO: Add only once?
        let add = this.canvas.addEventListener
        add("gesturestart", this.gesturestart)
        add("gesturechange", this.gesturechange)
        add("gestureend", this.gestureend)
    }

    gesturestart(event) { event.preventDefault() }
    gesturechange(event) { event.preventDefault() }
    gestureend(event) { event.preventDefault() }

    mousemove(event) {
        if (Utils.isMobile) return
        event = Utils.adjustMouse(event, this.canvas)
        this.events.emit('cursor-changed', {
            visible: true,
            gridId: this.gridId,
            x: event.layerX,
            y: event.layerY - 1 // Align with the crosshair
        })
        this.calcOffset()
        this.propagate('mousemove', event)
    }

    mouseout(event) {
        if (Utils.isMobile) return
        event = Utils.adjustMouse(event, this.canvas)
        this.events.emit('cursor-changed', { visible: false })
        this.propagate('mouseout', event)
    }

    mouseup(event) {
        event = Utils.adjustMouse(event, this.canvas)
        this.drug = null
        this.events.emit('cursor-locked', false)
        this.propagate('mouseup', event)
    }

    mousedown(event) {
        event = Utils.adjustMouse(event, this.canvas)
        if (Utils.isMobile) return
        this.events.emit('cursor-locked', true)
        this.propagate('mousedown', event)
        if (event.defaultPrevented) return
        this.events.emit('grid-mousedown', [this.gridId, event])
    }

    // Simulated mousedown (for mobile)
   simMousedown(event) {
       event = Utils.adjustMouse(event, this.canvas)
       if (event.srcEvent.defaultPrevented) return
       this.events.emit('grid-mousedown', [this.gridId, event])
       this.propagate('mousemove', this.touch2mouse(event))
       this.events.emitSpec(this.rrId, 'update-rr')
       this.propagate('mousedown', this.touch2mouse(event))
       setTimeout(() => {
           this.propagate('click', this.touch2mouse(event))
       })
   }

   // Convert touch to "mouse" event
   touch2mouse(e) {
       this.calcOffset()
       return {
           original: e.srcEvent,
           layerX: e.center.x + this.offsetX,
           layerY: e.center.y + this.offsetY,
           preventDefault: function() {
               this.original.preventDefault()
           }
       }
   }

   click(event) {
       this.propagate('click', event)
   }

   emitCursorCoord(event, add = {}) {
       this.events.emit('cursor-changed', Object.assign({
           gridId: this.gridId,
           x: event.center.x + this.offsetX,
           y: event.center.y + this.offsetY //+ this.layout.offset
       }, add))
   }

   panFade(event) {
       let dt = Utils.now() - this.drug.t0
       let dx = this.range[1] - this.drug.r[1]
       let v = 42 * dx / dt
       let v0 = Math.abs(v * 0.01)
       if (dt > 500) return
       if (this.fade) this.fade.stop()
       this.fade = new FrameAnimation(self => {
           v *= 0.85
           if (Math.abs(v) < v0) {
               self.stop()
           }
           this.range[0] += v
           this.range[1] += v
           this.changeRange()
       })
   }

   calcOffset() {
       let rect = this.canvas.getBoundingClientRect()
       this.offsetX = -rect.x
       this.offsetY = -rect.y
   }

   mousezoom(delta, event) {

        if (this.meta.scrollLock) return

        // TODO: for mobile
        if (this.wmode !== 'pass') {
            if (this.wmode === 'click' && !this.oldMeta.activated) {
                return
            }
            event.originalEvent.preventDefault()
            event.preventDefault()
        }

        event.deltaX = event.deltaX || Utils.getDeltaX(event)
        event.deltaY = event.deltaY || Utils.getDeltaY(event)

        let updated = false
        if (Math.abs(event.deltaX) > 0) {
            this.trackpad = true
            if (Math.abs(event.deltaX) >= Math.abs(event.deltaY)) {
                delta *= 0.1
            }
            this.trackpadScroll(event)
            updated = true
        }

        if (this.trackpad) delta *= 0.032

        delta = Utils.smartWheel(delta)

        const dpr = window.devicePixelRatio ?? 1;

        // TODO: mouse zooming is a little jerky,
        // needs to follow f(mouse_wheel_speed) and
        // if speed is low, scroll shoud be slower
        let data = this.hub.mainOv.dataSubset
        if (delta < 0 && data.length <= this.MIN_ZOOM) return
        if (delta > 0 && data.length > this.MAX_ZOOM) return
        let k = this.interval / 1000
        let diff = delta * k * data.length
        let tl = this.props.config.ZOOM_MODE === 'tl'
        if (event.originalEvent.ctrlKey || tl) {
            let offset = event.originalEvent.offsetX
            let diff1 = offset / (this.canvas.width/dpr-1) * diff
            let diff2 = diff - diff1
            this.range[0] -= diff1
            this.range[1] += diff2
        } else {
            this.range[0] -= diff
        }

        if (tl) {
            let offset = event.originalEvent.offsetY
            let diff1 = offset / (this.canvas.height/dpr-1) * 2
            let diff2 = 2 - diff1
            let z = diff / (this.range[1] - this.range[0])
            //rezoom_range(z, diff_x, diff_y)
            // TODO: ?implement
            this.events.emit('rezoom-range', {
                gridId: this.gridId, z, diff1, diff2
            })
        }
        // TODO: fix doulbe updates (only on120hz macbook)
        /*if (!updated)*/ this.changeRange()

    }

    mousedrag(x, y) {

        if (this.meta.scrollLock) return

        let dt = this.drug.t * (this.drug.x - x) / this.layout.width
        let d$ = this.layout.$hi - this.layout.$lo
        d$ *= (this.drug.y - y) / this.layout.height
        let offset = this.drug.o + d$
        let ls = this.layout.settings.logScale

        if (ls && this.drug.y_r) {
            let dy = this.drug.y - y
            var range = this.drug.y_r.slice()
            range[0] = math.exp((0 - this.drug.B + dy) /
                this.layout.A)
            range[1] = math.exp(
                (this.layout.height - this.drug.B + dy) /
                this.layout.A)
        }

        let scaleId = this.layout.scaleIndex
        let yTransform = this.meta.getYtransform(this.gridId, scaleId)
        if (this.drug.y_r && yTransform &&
            !yTransform.auto) {
            this.events.emit('sidebar-transform', {
                gridId: this.gridId,
                scaleId: scaleId,
                range: ls ? (range || this.drug.y_r) : [
                    this.drug.y_r[0] - offset,
                    this.drug.y_r[1] - offset,
                ]
            })
        }

        this.range[0] = this.drug.r[0] + dt
        this.range[1] = this.drug.r[1] + dt

        this.changeRange()

    }

    pinchZoom(scale) {

        if (this.meta.scrollLock) return

        let data = this.hub.mainOv.dataSubset

        if (scale > 1 && data.length <= this.MIN_ZOOM) return
        if (scale < 1 && data.length > this.MAX_ZOOM) return

        let t = this.pinch.t
        let nt = t * 1 / scale

        this.range[0] = this.pinch.r[0] - (nt - t) * 0.5
        this.range[1] = this.pinch.r[1] + (nt - t) * 0.5

        this.changeRange()

    }

    trackpadScroll(event) {

        if (this.meta.scrollLock) return

        let dt = this.range[1] - this.range[0]

        this.range[0] += event.deltaX * dt * 0.011
        this.range[1] += event.deltaX * dt * 0.011

        this.changeRange()


    }

    changeRange() {

        // TODO: better way to limit the view. Problem:
        // when you are at the dead end of the data,
        // and keep scrolling,
        // the chart continues to scale down a little.
        // Solution: I don't know yet

        let data = this.hub.mainOv.data
        if (!this.range.length || data.length < 2) return

        let l = data.length - 1
        let range = this.range
        let layout = this.layout

        range[0] = Utils.clamp(
            range[0],
            -Infinity,
            layout.ti(data[l][0], l) - this.interval * 5.5,
        )

        range[1] = Utils.clamp(
            range[1],
            layout.ti(data[0][0], 0) + this.interval * 5.5,
            Infinity
        )

        this.events.emit('range-changed', range)
    }

    // Propagate mouse event to overlays
    propagate(name, event) {
        this.events.emitSpec(this.gridUpdId, 'propagate', {
            name, event
        })
    }

    destroy() {
        let rm = this.canvas.removeEventListener
        rm("gesturestart", this.gesturestart)
        rm("gesturechange", this.gesturechange)
        rm("gestureend", this.gestureend)
        if (this.mc) this.mc.destroy()
        if (this.hm) this.hm.unwheel()
        this.mouseEvents('removeEventListener')
    }

}
