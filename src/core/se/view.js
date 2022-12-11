
// Script representation of View

import * as u from './script_utils.js'
import { Sym } from './symbol.js'

export default class View {

    constructor(std, name, props) {
        this.std = std
        this.name = name
        this.props = props || {}
        this.props.$synth = true
        this.props.tf = u.tf_from_str(this.props.tf)
        this.tf = this.props.tf
        this.iter = {
            onchart: (x, n, s) => this.onchart(x, n, s, true),
            offchart: (x, n, s) => this.offchart(x, n, s, true)
        }
    }

    // Add chart point
    chart(x, sett = {}) {
        if (this.tf && !this.std.onclose(this.tf)) return
        sett.view = this.name
        sett.vprops = this.props
        if (x && x.aggtype) {
            let x0 = [
                x.open[0],
                x.high[0],
                x.low[0],
                x.close[0],
                x.vol[0]
            ]
            this.std.chart(x0, sett)
        } else {
            this.std.chart(x, sett)
        }
    }

    // Add onchart point
    onchart(x, name, sett = {}, iter) {
        if (this.tf && !this.std.onclose(this.tf) && !iter) return
        sett.view = this.name
        sett.vprops = this.props
        name = sett.view + '/' + (name || 'OV')
        this.std.onchart(x, name, sett)
    }

    // Add offchart point
    offchart(x, name, sett = {}, iter) {
        if (this.tf && !this.std.onclose(this.tf) && !iter) return
        sett.view = this.name
        sett.vprops = this.props
        name = sett.view + '/' + (name || 'OV')
        this.std.offchart(x, name, sett)
    }

    // Setters (set the entire overlay object)
    $chart(data, sett = {}) {
        let type = sett.type
        sett.$synth = true
        sett.skipNaN = true
        this.std.env.chart[this.name] = {
            type: type || 'Candles',
            data: data,
            settings: sett,
            view: this.name,
            vprops: this.props,
            indexBased: this.props.ib,
            tf: this.props.tf
        }
        delete sett.type
        delete sett.vprops
        delete sett.view
    }

    $onchart(data, name, sett = {}) {
        let type = sett.type
        name = this.name + '/' + (name || 'OV')
        sett.$synth = true
        sett.skipNaN = true
        this.std.env.onchart[name] = {
            name: name,
            type: type || 'Spline',
            data: data,
            settings: sett,
            scripts: false,
            grid: sett.grid || {},
            view: this.name,
            vprops: this.props
        }
        delete sett.type
        delete sett.grid
    }

    $offchart(data, name, sett = {}) {
        let type = sett.type
        name = this.name + '/' + (name || 'OV')
        sett.$synth = true
        sett.skipNaN = true
        this.std.env.offchart[name] = {
            name: name,
            type: type || 'Spline',
            data: data,
            settings: sett,
            scripts: false,
            grid: sett.grid || {},
            view: this.name,
            vprops: this.props
        }
        delete sett.type
        delete sett.grid
    }

}
