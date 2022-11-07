/* NightVisionCharts v0.1.1 | License: MIT
 © 2022 ChartMaster. All rights reserved */
var zi = (t, e, i) => {
  if (!e.has(t))
    throw TypeError("Cannot " + i);
};
var Qe = (t, e, i) => (zi(t, e, "read from private field"), i ? i.call(t) : e.get(t)), ti = (t, e, i) => {
  if (e.has(t))
    throw TypeError("Cannot add the same private member more than once");
  e instanceof WeakSet ? e.add(t) : e.set(t, i);
}, ii = (t, e, i, s) => (zi(t, e, "write to private field"), s ? s.call(t, i) : e.set(t, i), i);
function le() {
}
const Pn = (t) => t;
function Nn(t) {
  return t();
}
function ji() {
  return /* @__PURE__ */ Object.create(null);
}
function ze(t) {
  t.forEach(Nn);
}
function Rn(t) {
  return typeof t == "function";
}
function ge(t, e) {
  return t != t ? e == e : t !== e || t && typeof t == "object" || typeof t == "function";
}
function Os(t) {
  return Object.keys(t).length === 0;
}
const Dn = typeof window != "undefined";
let Ps = Dn ? () => window.performance.now() : () => Date.now(), yi = Dn ? (t) => requestAnimationFrame(t) : le;
const at = /* @__PURE__ */ new Set();
function Bn(t) {
  at.forEach((e) => {
    e.c(t) || (at.delete(e), e.f());
  }), at.size !== 0 && yi(Bn);
}
function Ns(t) {
  let e;
  return at.size === 0 && yi(Bn), {
    promise: new Promise((i) => {
      at.add(e = { c: t, f: i });
    }),
    abort() {
      at.delete(e);
    }
  };
}
function te(t, e) {
  t.appendChild(e);
}
function Tt(t, e, i) {
  const s = bi(t);
  if (!s.getElementById(e)) {
    const n = Z("style");
    n.id = e, n.textContent = i, Ln(s, n);
  }
}
function bi(t) {
  if (!t)
    return document;
  const e = t.getRootNode ? t.getRootNode() : t.ownerDocument;
  return e && e.host ? e : t.ownerDocument;
}
function Rs(t) {
  const e = Z("style");
  return Ln(bi(t), e), e.sheet;
}
function Ln(t, e) {
  return te(t.head || t, e), e.sheet;
}
function W(t, e, i) {
  t.insertBefore(e, i || null);
}
function q(t) {
  t.parentNode.removeChild(t);
}
function ut(t, e) {
  for (let i = 0; i < t.length; i += 1)
    t[i] && t[i].d(e);
}
function Z(t) {
  return document.createElement(t);
}
function Ds(t) {
  return document.createElementNS("http://www.w3.org/2000/svg", t);
}
function st(t) {
  return document.createTextNode(t);
}
function me() {
  return st(" ");
}
function Oe() {
  return st("");
}
function nt(t, e, i, s) {
  return t.addEventListener(e, i, s), () => t.removeEventListener(e, i, s);
}
function Bs(t) {
  return function(e) {
    return e.stopPropagation(), t.call(this, e);
  };
}
function C(t, e, i) {
  i == null ? t.removeAttribute(e) : t.getAttribute(e) !== i && t.setAttribute(e, i);
}
function Ls(t) {
  return Array.from(t.childNodes);
}
function Ft(t, e) {
  e = "" + e, t.wholeText !== e && (t.data = e);
}
function Us(t, e, { bubbles: i = !1, cancelable: s = !1 } = {}) {
  const n = document.createEvent("CustomEvent");
  return n.initCustomEvent(t, i, s, e), n;
}
class Fs {
  constructor(e = !1) {
    this.is_svg = !1, this.is_svg = e, this.e = this.n = null;
  }
  c(e) {
    this.h(e);
  }
  m(e, i, s = null) {
    this.e || (this.is_svg ? this.e = Ds(i.nodeName) : this.e = Z(i.nodeName), this.t = i, this.c(e)), this.i(s);
  }
  h(e) {
    this.e.innerHTML = e, this.n = Array.from(this.e.childNodes);
  }
  i(e) {
    for (let i = 0; i < this.n.length; i += 1)
      W(this.t, this.n[i], e);
  }
  p(e) {
    this.d(), this.h(e), this.i(this.a);
  }
  d() {
    this.n.forEach(q);
  }
}
const Lt = /* @__PURE__ */ new Map();
let Ut = 0;
function Gs(t) {
  let e = 5381, i = t.length;
  for (; i--; )
    e = (e << 5) - e ^ t.charCodeAt(i);
  return e >>> 0;
}
function Hs(t, e) {
  const i = { stylesheet: Rs(e), rules: {} };
  return Lt.set(t, i), i;
}
function qi(t, e, i, s, n, r, o, u = 0) {
  const a = 16.666 / s;
  let l = `{
`;
  for (let g = 0; g <= 1; g += a) {
    const A = e + (i - e) * r(g);
    l += g * 100 + `%{${o(A, 1 - A)}}
`;
  }
  const p = l + `100% {${o(i, 1 - i)}}
}`, m = `__svelte_${Gs(p)}_${u}`, I = bi(t), { stylesheet: y, rules: b } = Lt.get(I) || Hs(I, t);
  b[m] || (b[m] = !0, y.insertRule(`@keyframes ${m} ${p}`, y.cssRules.length));
  const d = t.style.animation || "";
  return t.style.animation = `${d ? `${d}, ` : ""}${m} ${s}ms linear ${n}ms 1 both`, Ut += 1, m;
}
function Vs(t, e) {
  const i = (t.style.animation || "").split(", "), s = i.filter(
    e ? (r) => r.indexOf(e) < 0 : (r) => r.indexOf("__svelte") === -1
  ), n = i.length - s.length;
  n && (t.style.animation = s.join(", "), Ut -= n, Ut || Xs());
}
function Xs() {
  yi(() => {
    Ut || (Lt.forEach((t) => {
      const { ownerNode: e } = t.stylesheet;
      e && q(e);
    }), Lt.clear());
  });
}
let At;
function bt(t) {
  At = t;
}
function Un() {
  if (!At)
    throw new Error("Function called outside component initialization");
  return At;
}
function rt(t) {
  Un().$$.on_mount.push(t);
}
function ht(t) {
  Un().$$.on_destroy.push(t);
}
const It = [], xe = [], Dt = [], Wi = [], zs = Promise.resolve();
let di = !1;
function js() {
  di || (di = !0, zs.then(pe));
}
function _t(t) {
  Dt.push(t);
}
const ni = /* @__PURE__ */ new Set();
let Pt = 0;
function pe() {
  const t = At;
  do {
    for (; Pt < It.length; ) {
      const e = It[Pt];
      Pt++, bt(e), qs(e.$$);
    }
    for (bt(null), It.length = 0, Pt = 0; xe.length; )
      xe.pop()();
    for (let e = 0; e < Dt.length; e += 1) {
      const i = Dt[e];
      ni.has(i) || (ni.add(i), i());
    }
    Dt.length = 0;
  } while (It.length);
  for (; Wi.length; )
    Wi.pop()();
  di = !1, ni.clear(), bt(t);
}
function qs(t) {
  if (t.fragment !== null) {
    t.update(), ze(t.before_update);
    const e = t.dirty;
    t.dirty = [-1], t.fragment && t.fragment.p(t.ctx, e), t.after_update.forEach(_t);
  }
}
let vt;
function Ws() {
  return vt || (vt = Promise.resolve(), vt.then(() => {
    vt = null;
  })), vt;
}
function si(t, e, i) {
  t.dispatchEvent(Us(`${e ? "intro" : "outro"}${i}`));
}
const Bt = /* @__PURE__ */ new Set();
let Be;
function Te() {
  Be = {
    r: 0,
    c: [],
    p: Be
  };
}
function we() {
  Be.r || ze(Be.c), Be = Be.p;
}
function U(t, e) {
  t && t.i && (Bt.delete(t), t.i(e));
}
function X(t, e, i, s) {
  if (t && t.o) {
    if (Bt.has(t))
      return;
    Bt.add(t), Be.c.push(() => {
      Bt.delete(t), s && (i && t.d(1), s());
    }), t.o(e);
  } else
    s && s();
}
const Zs = { duration: 0 };
function Zi(t, e, i, s) {
  let n = e(t, i), r = s ? 0 : 1, o = null, u = null, a = null;
  function l() {
    a && Vs(t, a);
  }
  function p(I, y) {
    const b = I.b - r;
    return y *= Math.abs(b), {
      a: r,
      b: I.b,
      d: b,
      duration: y,
      start: I.start,
      end: I.start + y,
      group: I.group
    };
  }
  function m(I) {
    const { delay: y = 0, duration: b = 300, easing: d = Pn, tick: g = le, css: A } = n || Zs, Y = {
      start: Ps() + y,
      b: I
    };
    I || (Y.group = Be, Be.r += 1), o || u ? u = Y : (A && (l(), a = qi(t, r, I, b, y, d, A)), I && g(0, 1), o = p(Y, b), _t(() => si(t, I, "start")), Ns((E) => {
      if (u && E > u.start && (o = p(u, b), u = null, si(t, o.b, "start"), A && (l(), a = qi(t, r, o.b, o.duration, 0, d, n.css))), o) {
        if (E >= o.end)
          g(r = o.b, 1 - r), si(t, o.b, "end"), u || (o.b ? l() : --o.group.r || ze(o.group.c)), o = null;
        else if (E >= o.start) {
          const P = E - o.start;
          r = o.a + o.d * d(P / o.duration), g(r, 1 - r);
        }
      }
      return !!(o || u);
    }));
  }
  return {
    run(I) {
      Rn(n) ? Ws().then(() => {
        n = n(), m(I);
      }) : m(I);
    },
    end() {
      l(), o = u = null;
    }
  };
}
function de(t) {
  t && t.c();
}
function ce(t, e, i, s) {
  const { fragment: n, on_mount: r, on_destroy: o, after_update: u } = t.$$;
  n && n.m(e, i), s || _t(() => {
    const a = r.map(Nn).filter(Rn);
    o ? o.push(...a) : ze(a), t.$$.on_mount = [];
  }), u.forEach(_t);
}
function ue(t, e) {
  const i = t.$$;
  i.fragment !== null && (ze(i.on_destroy), i.fragment && i.fragment.d(e), i.on_destroy = i.fragment = null, i.ctx = []);
}
function Qs(t, e) {
  t.$$.dirty[0] === -1 && (It.push(t), js(), t.$$.dirty.fill(0)), t.$$.dirty[e / 31 | 0] |= 1 << e % 31;
}
function ve(t, e, i, s, n, r, o, u = [-1]) {
  const a = At;
  bt(t);
  const l = t.$$ = {
    fragment: null,
    ctx: null,
    props: r,
    update: le,
    not_equal: n,
    bound: ji(),
    on_mount: [],
    on_destroy: [],
    on_disconnect: [],
    before_update: [],
    after_update: [],
    context: new Map(e.context || (a ? a.$$.context : [])),
    callbacks: ji(),
    dirty: u,
    skip_bound: !1,
    root: e.target || a.$$.root
  };
  o && o(l.root);
  let p = !1;
  if (l.ctx = i ? i(t, e.props || {}, (m, I, ...y) => {
    const b = y.length ? y[0] : I;
    return l.ctx && n(l.ctx[m], l.ctx[m] = b) && (!l.skip_bound && l.bound[m] && l.bound[m](b), p && Qs(t, m)), I;
  }) : [], l.update(), p = !0, ze(l.before_update), l.fragment = s ? s(l.ctx) : !1, e.target) {
    if (e.hydrate) {
      const m = Ls(e.target);
      l.fragment && l.fragment.l(m), m.forEach(q);
    } else
      l.fragment && l.fragment.c();
    e.intro && U(t.$$.fragment), ce(t, e.target, e.anchor, e.customElement), pe();
  }
  bt(a);
}
class Ie {
  $destroy() {
    ue(this, 1), this.$destroy = le;
  }
  $on(e, i) {
    const s = this.$$.callbacks[e] || (this.$$.callbacks[e] = []);
    return s.push(i), () => {
      const n = s.indexOf(i);
      n !== -1 && s.splice(n, 1);
    };
  }
  $set(e) {
    this.$$set && !Os(e) && (this.$$.skip_bound = !0, this.$$set(e), this.$$.skip_bound = !1);
  }
}
var Fn = {};
function Ks(t) {
  return !!(t && typeof t == "object" && isFinite(t.length) && t.length >= 0 && t.length === Math.floor(t.length) && t.length < 4294967296);
}
function $s(t) {
  return !!(t && typeof t == "object" && typeof t.sort == "function");
}
Fn.isSortableArrayLike = function(t) {
  return Ks(t) && $s(t);
};
var er = {
  numcmp: function(t, e) {
    return t - e;
  },
  strcmp: function(t, e) {
    return t < e ? -1 : t > e ? 1 : 0;
  }
}, Gn = {};
function gi(t, e, i, s, n) {
  var r = i + e >>> 1, o = this.compare(t[r][this.index], s);
  return o ? e >= i ? n[s] = {
    found: !1,
    index: null,
    prev: o < 0 ? i : i - 1,
    next: o < 0 ? i + 1 : i
  } : o > 0 ? gi.call(this, t, e, r - 1, s, n) : gi.call(this, t, r + 1, i, s, n) : n[s] = {
    found: !0,
    index: r,
    prev: null,
    next: null
  };
}
function tr(t) {
  var e = this.data;
  return gi.call(this, e, 0, e.length - 1, t, this.valpos);
}
Gn.search = tr;
var ir = Fn, Qi = er, nr = Gn, ri = je;
function je(t, e) {
  if (!ir.isSortableArrayLike(t))
    throw new Error("Invalid data");
  if (!e || t.length > 0 && !(e in t[0]))
    throw new Error("Invalid index");
  this.data = t, this.index = e, this.setBoundaries(), this.compare = typeof this.minv == "number" ? Qi.numcmp : Qi.strcmp, this.search = nr.search, this.valpos = {}, this.cursor = null, this.nextlow = null, this.nexthigh = null;
}
je.prototype.setCompare = function(t) {
  if (typeof t != "function")
    throw new Error("Invalid argument");
  return this.compare = t, this;
};
je.prototype.setSearch = function(t) {
  if (typeof t != "function")
    throw new Error("Invalid argument");
  return this.search = t, this;
};
je.prototype.sort = function() {
  var t = this, e = this.index;
  return this.data.sort(function(i, s) {
    return t.compare(i[e], s[e]);
  }), this.setBoundaries(), this;
};
je.prototype.setBoundaries = function() {
  var t = this.data, e = this.index;
  return this.minv = t.length && t[0][e], this.maxv = t.length && t[t.length - 1][e], this;
};
je.prototype.fetch = function(t) {
  if (this.data.length === 0)
    return this.cursor = null, this.nextlow = null, this.nexthigh = null, this;
  if (this.compare(t, this.minv) === -1)
    return this.cursor = null, this.nextlow = null, this.nexthigh = 0, this;
  if (this.compare(t, this.maxv) === 1)
    return this.cursor = null, this.nextlow = this.data.length - 1, this.nexthigh = null, this;
  var e = this.valpos, i = e[t];
  if (i)
    return i.found ? (this.cursor = i.index, this.nextlow = null, this.nexthigh = null) : (this.cursor = null, this.nextlow = i.prev, this.nexthigh = i.next), this;
  var s = this.search.call(this, t);
  return this.cursor = s.index, this.nextlow = s.prev, this.nexthigh = s.next, this;
};
je.prototype.get = function(t) {
  t && this.fetch(t);
  var e = this.cursor;
  return e !== null ? this.data[e] : null;
};
je.prototype.getRange = function(t, e) {
  if (this.compare(t, e) === 1)
    return [];
  this.fetch(t);
  var i = this.cursor || this.nexthigh;
  this.fetch(e);
  var s = this.cursor || this.nextlow;
  return i === null || s === null ? [] : this.data.slice(i, s + 1);
};
const Ke = 1e3, Ce = Ke * 60, sr = Ce * 3, Ai = Ce * 5, _i = Ce * 15, Ti = Ce * 30, _e = Ce * 60, Hn = _e * 4, rr = _e * 12, Ye = _e * 24, wi = Ye * 7, $e = wi * 4, et = Ye * 365, or = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
], lr = [
  et * 10,
  et * 5,
  et * 3,
  et * 2,
  et,
  $e * 6,
  $e * 4,
  $e * 3,
  $e * 2,
  $e,
  Ye * 15,
  Ye * 10,
  Ye * 7,
  Ye * 5,
  Ye * 3,
  Ye * 2,
  Ye,
  _e * 12,
  _e * 6,
  _e * 3,
  _e * 1.5,
  _e,
  Ti,
  _i,
  Ce * 10,
  Ai,
  Ce * 2,
  Ce
], ar = [0.05, 0.1, 0.2, 0.25, 0.5, 0.8, 1, 2, 5], cr = {
  back: "#14151c",
  grid: "#252732",
  text: "#adadad",
  textHL: "#dedddd",
  textLG: "#c4c4c4",
  llValue: "#818989",
  llBack: "#14151c77",
  scale: "#606060",
  cross: "#8091a0",
  candleUp: "#41a376",
  candleDw: "#de4646",
  wickUp: "#23a77688",
  wickDw: "#e5415088",
  volUp: "#41a37682",
  volDw: "#de464682",
  panel: "#2a2f38",
  tbBack: void 0,
  tbBorder: "#8282827d"
}, Vn = {
  SBMIN: 60,
  SBMAX: 1 / 0,
  TOOLBAR: 57,
  TB_ICON: 25,
  TB_ITEM_M: 6,
  TB_ICON_BRI: 1,
  TB_ICON_HOLD: 420,
  TB_BORDER: 1,
  TB_B_STYLE: "dotted",
  TOOL_COLL: 7,
  EXPAND: 0.15,
  CANDLEW: 0.7,
  GRIDX: 100,
  GRIDY: 47,
  BOTBAR: 28,
  PANHEIGHT: 22,
  DEFAULT_LEN: 50,
  MINIMUM_LEN: 5,
  MIN_ZOOM: 2,
  MAX_ZOOM: 5e3,
  VOLSCALE: 0.15,
  UX_OPACITY: 0.9,
  ZOOM_MODE: "tv",
  L_BTN_SIZE: 21,
  L_BTN_MARGIN: "-6px 0 -6px 0",
  SCROLL_WHEEL: "prevent",
  QUANTIZE_AFTER: 0,
  AUTO_PRE_SAMPLE: 10
};
Vn.FONT = `11px -apple-system,BlinkMacSystemFont,
    Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,
    Fira Sans,Droid Sans,Helvetica Neue,
    sans-serif`;
const ur = "When using IB mode you should specify timeframe ('tf' filed in 'chart' object),otherwise you can get an unexpected behaviour", hr = {
  "1s": Ke,
  "5s": Ke * 5,
  "10s": Ke * 10,
  "20s": Ke * 20,
  "30s": Ke * 30,
  "1m": Ce,
  "3m": sr,
  "5m": Ai,
  "15m": _i,
  "30m": Ti,
  "1H": _e,
  "2H": _e * 2,
  "3H": _e * 3,
  "4H": Hn,
  "12H": rr,
  "1D": Ye,
  "1W": wi,
  "1M": $e,
  "1Y": et
}, Le = {
  SECOND: Ke,
  MINUTE: Ce,
  MINUTE5: Ai,
  MINUTE15: _i,
  MINUTE30: Ti,
  HOUR: _e,
  HOUR4: Hn,
  DAY: Ye,
  WEEK: wi,
  MONTH: $e,
  YEAR: et,
  MONTHMAP: or,
  TIMESCALES: lr,
  $SCALES: ar,
  ChartConfig: Vn,
  MAP_UNIT: hr,
  IB_TF_WARN: ur,
  COLORS: cr
}, N = {
  clamp(t, e, i) {
    return t <= e ? e : t >= i ? i : t;
  },
  addZero(t) {
    return t < 10 && (t = "0" + t), t;
  },
  dayStart(t) {
    return new Date(t).setUTCHours(0, 0, 0, 0);
  },
  monthStart(t) {
    let e = new Date(t);
    return Date.UTC(
      e.getFullYear(),
      e.getMonth(),
      1
    );
  },
  yearStart(t) {
    return Date.UTC(new Date(t).getFullYear());
  },
  getYear(t) {
    if (!!t)
      return new Date(t).getUTCFullYear();
  },
  getMonth(t) {
    if (!!t)
      return new Date(t).getUTCMonth();
  },
  nearestA(t, e) {
    let i = 1 / 0, s = null, n = -1;
    for (var r = 0; r < e.length; r++) {
      var o = e[r];
      Math.abs(o - t) < i && (i = Math.abs(o - t), s = o, n = r);
    }
    return [n, s];
  },
  nearestTs(t, e) {
    let i = 1 / 0, s = null, n = -1;
    for (var r = 0; r < e.length; r++) {
      var o = e[r][0];
      Math.abs(o - t) < i && (i = Math.abs(o - t), s = e[r], n = r);
    }
    return [n, s];
  },
  round(t, e = 8) {
    return parseFloat(t.toFixed(e));
  },
  strip(t) {
    return parseFloat(
      parseFloat(t).toPrecision(12)
    );
  },
  getDay(t) {
    return t ? new Date(t).getDate() : null;
  },
  overwrite(t, e) {
    t.splice(0, t.length, ...e);
  },
  allOverlays(t = []) {
    return t.map((e) => e.overlays || []).flat();
  },
  detectInterval(t) {
    let e = Math.min(t.length - 1, 99), i = 1 / 0;
    return t.slice(0, e).forEach((s, n) => {
      let r = t[n + 1][0] - s[0];
      r === r && r < i && (i = r);
    }), i >= Le.MONTH && i <= Le.DAY * 30 ? Le.DAY * 31 : i;
  },
  fastFilter(t, e, i) {
    if (!t.length)
      return [t, void 0];
    try {
      let s = new ri(t, "0"), n = s.getRange(e, i), r = s.valpos[e].next;
      return [n, r];
    } catch (s) {
      return [t.filter(
        (n) => n[0] >= e && n[0] <= i
      ), 0];
    }
  },
  fastFilter2(t, e, i) {
    if (!t.length)
      return [t, void 0];
    try {
      let s = new ri(t, "0");
      s.fetch(e);
      let n = s.cursor || s.nexthigh;
      s.fetch(i);
      let r = s.cursor || s.nextlow;
      return [n, r + 1];
    } catch (s) {
      let n = t.filter(
        (u) => u[0] >= e && u[0] <= i
      ), r = t.indexOf(n[0]), o = t.indexOf(n[n.length - 1]);
      return [r, o];
    }
  },
  fastFilterIB(t, e, i) {
    if (!t.length)
      return [t, void 0];
    let s = Math.floor(e);
    s < 0 && (s = 0);
    let n = Math.floor(i + 1);
    return [t.slice(s, n), s];
  },
  fastNearest(t, e) {
    let i = new ri(t, "0");
    return i.fetch(e), [i.nextlow, i.nexthigh];
  },
  now() {
    return new Date().getTime();
  },
  pause(t) {
    return new Promise((e, i) => setTimeout(e, t));
  },
  smartWheel(t) {
    let e = Math.abs(t);
    return e > 500 ? (200 + Math.log(e)) * Math.sign(t) : t;
  },
  getDeltaX(t) {
    return t.originalEvent.deltaX / 12;
  },
  getDeltaY(t) {
    return t.originalEvent.deltaY / 12;
  },
  applyOpacity(t, e) {
    if (t.length === 7) {
      let i = Math.floor(e * 255);
      i = this.clamp(i, 0, 255), t += i.toString(16);
    }
    return t;
  },
  parseTF(t) {
    return typeof t == "string" ? Le.MAP_UNIT[t] : t;
  },
  indexShift(t, e) {
    if (!e.length)
      return 0;
    let i = e[0][0], s;
    for (var n = 1; n < e.length; n++)
      if (e[n][0] !== i) {
        s = e[n][0];
        break;
      }
    for (var r = 0; r < t.length; r++)
      if (t[r][0] === s)
        return r - n;
    return 0;
  },
  measureText(t, e, i) {
    let s = t.measureTextOrg(e);
    if (s.width === 0) {
      const n = document, r = "nvjs-measure-text";
      let o = n.getElementById(r);
      if (!o) {
        let u = n.getElementById(i);
        o = n.createElement("div"), o.id = r, o.style.position = "absolute", o.style.top = "-1000px", u.appendChild(o);
      }
      return t.font && (o.style.font = t.font), o.innerText = e.replace(/ /g, "."), { width: o.offsetWidth };
    } else
      return s;
  },
  uuid(t = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx") {
    return t.replace(/[xy]/g, (e) => {
      var i = Math.random() * 16 | 0, s = e == "x" ? i : i & 3 | 8;
      return s.toString(16);
    });
  },
  uuid2() {
    return this.uuid("xxxxxxxxxxxx");
  },
  uuid3() {
    return Math.random().toString().slice(2).replace(/^0+/, "");
  },
  warn(t, e, i = 0) {
    setTimeout(() => {
      t() && console.warn(e);
    }, i);
  },
  delayedExec(t) {
    if (!t.script || !t.script.execInterval)
      return !0;
    let e = this.now(), i = t.script.execInterval;
    return !t.settings.$last_exec || e > t.settings.$last_exec + i ? (t.settings.$last_exec = e, !0) : !1;
  },
  formatName(t) {
    if (!t.name)
      return;
    let e = t.name;
    for (var i in t.settings || {}) {
      let s = t.settings[i], n = new RegExp(`\\$${i}`, "g");
      e = e.replace(n, s);
    }
    return e;
  },
  xMode() {
    return this.is_mobile ? "explore" : "default";
  },
  defaultPrevented(t) {
    return t.original ? t.original.defaultPrevented : t.defaultPrevented;
  },
  afterAll(t, e, i) {
    clearTimeout(t.__afterAllId__), t.__afterAllId__ = setTimeout(() => e(), i);
  },
  defaultPreSampler(t) {
    if (!t)
      return [];
    let e = [];
    for (var i = 1; i < t.length; i++)
      typeof t[i] == "number" && e.push(t[i]);
    return e;
  },
  getScalesBySide(t, e) {
    return e ? e.settings.scaleTemplate[t].map((s) => e.scales[s]).filter((s) => s) : [];
  },
  autoScaleSideId(t, e, i) {
    e[t].length ? (!i[t] || !e[t].includes(i[t])) && (i[t] = e[t][0]) : i[t] = void 0;
  },
  callsPerSecond() {
    window.__counter__ === void 0 && (window.__counter__ = 0), window.__counter__++, !window.__cpsId__ && (window.__cpsId__ = setTimeout(() => {
      console.log(window.__counter__, "upd/sec"), window.__counter__ = 0, window.__cpsId__ = null;
    }, 1e3));
  },
  formatCash(t) {
    if (t == null)
      return "x";
    if (typeof t != "number")
      return t;
    if (t < 1e3)
      return t.toFixed(0);
    if (t >= 1e3 && t < 1e6)
      return +(t / 1e3).toFixed(2) + "K";
    if (t >= 1e6 && t < 1e9)
      return +(t / 1e6).toFixed(2) + "M";
    if (t >= 1e9 && t < 1e12)
      return +(t / 1e9).toFixed(2) + "B";
    if (t >= 1e12)
      return +(t / 1e12).toFixed(2) + "T";
  },
  isMobile: ((t) => "onorientationchange" in t && (!!navigator.maxTouchPoints || !!navigator.msMaxTouchPoints || "ontouchstart" in t || t.DocumentTouch && document instanceof t.DocumentTouch))(typeof window != "undefined" ? window : {})
}, $ = {
  point2line(t, e, i) {
    let { area: s, base: n } = this.tri(t, e, i);
    return Math.abs(this.tri_h(s, n));
  },
  point2seg(t, e, i) {
    let { area: s, base: n } = this.tri(t, e, i), r = this.dot_prod(t, e, i) / n, o = Math.max(-r, 0), u = Math.max(r - n, 0), a = Math.abs(this.tri_h(s, n));
    return Math.max(a, o, u);
  },
  point2ray(t, e, i) {
    let { area: s, base: n } = this.tri(t, e, i), r = this.dot_prod(t, e, i) / n, o = Math.max(-r, 0), u = Math.abs(this.tri_h(s, n));
    return Math.max(u, o);
  },
  tri(t, e, i) {
    let s = this.area(t, e, i), n = i[0] - e[0], r = i[1] - e[1], o = Math.sqrt(n * n + r * r);
    return { area: s, base: o };
  },
  area(t, e, i) {
    return t[0] * (e[1] - i[1]) + e[0] * (i[1] - t[1]) + i[0] * (t[1] - e[1]);
  },
  tri_h(t, e) {
    return t / e;
  },
  dot_prod(t, e, i) {
    let s = [i[0] - e[0], i[1] - e[1]], n = [t[0] - e[0], t[1] - e[1]];
    return s[0] * n[0] + s[1] * n[1];
  },
  log(t) {
    return Math.sign(t) * Math.log(Math.abs(t) + 1);
  },
  exp(t) {
    return Math.sign(t) * (Math.exp(Math.abs(t)) - 1);
  },
  log_mid(t, e) {
    let i = this.log(t[0]), s = this.log(t[1]), n = e / 2, r = i - n * (i - s) / e;
    return this.exp(r);
  },
  re_range(t, e, i) {
    let s = this.log(t[0]), n = this.log(t[1]), r = this.log(e), o = this.log(i), u = (r - o) * (s - n) / (s - o);
    return this.exp(r - u);
  }
};
class fr {
  constructor() {
  }
  xSync(e, i, s, n) {
    if (n.visible === !1)
      return this.hide(), this;
    let r = this.t;
    Object.assign(this, n);
    let o = i.main.startx, u = i.main.pxStep;
    return this.yValues(i), this.locked ? (this.x = i.main.time2x(r), this) : (this.x = Math.round((this.x - o) / u) * u + o, this.x = Math.floor(this.x - 1) + 0.5, this.xValues(e, i, s));
  }
  xValues(e, i, s) {
    this.locked || (this.t = i.main.x2time(this.x));
    let n = [];
    for (var r of e.panes()) {
      let u = [];
      for (var o = 0; o < r.overlays.length; o++) {
        let a = r.overlays[o];
        u.push(N.nearestTs(this.t, a.dataSubset)[1]);
      }
      n.push(u);
    }
    return this.values = n, this.quantizeTime(e, i, s), this;
  }
  yValues(e) {
    let i = this.gridId;
    if (!e.grids[i])
      return;
    this.scales = {};
    let s = e.grids[i];
    for (var n of Object.values(s.scales)) {
      let r = this.y2value(this.y, n);
      this.scales[n.scaleSpecs.id] = r;
    }
  }
  quantizeTime(e, i, s) {
    let n = e.chart.id, r = e.mainOv.id;
    if (!this.values || !this.values[n])
      return;
    let o = this.values[n][r];
    if (!o)
      return;
    if (Math.abs((o[0] - this.t) / s.interval) >= 0.5) {
      let a = Math.round(this.t / s.interval);
      this.t = a * s.interval;
    } else
      this.t = o[0];
  }
  y2value(e, i) {
    return i.scaleSpecs.log ? $.exp((e - i.B) / i.A) : (e - i.B) / i.A;
  }
  getValue(e, i) {
    return this.values ? (this.values[e] || [])[i] : void 0;
  }
  hide() {
    this.visible = !1, delete this.scales, delete this.x, delete this.y, this.locked || delete this.t;
  }
}
class pr {
  constructor() {
    this.handlers = {};
  }
  emit(e, i) {
    let s = this.handlers[e];
    if (!!s)
      for (var n in s)
        s[n](i);
  }
  emitSpec(e, i, s) {
    let n = this.handlers[i];
    !n || !n[e] || n[e](s);
  }
  on(e, i) {
    let [s, n] = e.split(":");
    this.handlers[n] || (this.handlers[n] = {}), this.handlers[n][s] = i;
  }
  off(e, i = null) {
    if (i && this.handlers[i]) {
      delete this.handlers[i][e];
      return;
    }
    for (var i in this.handlers)
      delete this.handlers[i][e];
  }
}
let oi = {};
function dr(t) {
  return oi[t] || (oi[t] = new pr(t)), oi[t];
}
const he = { instance: dr };
class gr {
  constructor(e, i, s) {
    this.src = e, this.i1 = Math.max(0, i - 1), this.i2 = Math.min(s, e.length - 1), this.length = this.i2 - this.i1 + 1;
  }
  makeSubset() {
    return this.src.slice(
      this.i1,
      this.i2 + 1
    );
  }
}
var tt;
class mr {
  constructor(e) {
    ti(this, tt, void 0);
    let i = he.instance(e);
    ii(this, tt, i), i.on("hub:set-scale-index", this.onScaleIndex.bind(this)), i.on("hub:display-overlay", this.onDisplayOv.bind(this));
  }
  init(e) {
    this.data = e, this.chart = null, this.offchart = null, this.mainOv = null, this.mainPaneId = null;
  }
  updateRange(e) {
    for (var i of this.data.panes)
      for (var s of i.overlays)
        s.dataView = this.filter(s.data, e), s.dataSubset = s.dataView.makeSubset();
  }
  calcSubset(e) {
    var i = 0;
    for (var s of this.data.panes || []) {
      s.id = i++, s.overlays = s.overlays || [], s.settings = s.settings || {};
      var n = 0;
      for (var r of s.overlays)
        r.id = n++, r.main = !!r.main, r.data = r.data || [], r.dataView = this.filter(r.data, e), r.dataSubset = r.dataView.makeSubset(), r.settings = r.settings || {}, r.props = r.props || {}, r.uuid = r.uuid || N.uuid3();
      s.uuid = s.uuid || N.uuid3();
    }
  }
  detectMain() {
    let e = N.allOverlays(this.data.panes), i = e.find((n) => n.main) || e[0];
    if (!(!e.length || !i)) {
      i.main = !0, this.chart = this.data.panes.find(
        (n) => n.overlays.find(
          (r) => r.main
        )
      ), this.offchart = this.data.panes.filter(
        (n) => n !== this.chart
      ), this.mainOv = i, this.mainPaneId = this.panes().indexOf(this.chart);
      for (var s of e)
        s !== i && (s.main = !1);
    }
  }
  filter(e, i) {
    var s = N.fastFilter2(
      e,
      i[0],
      i[1]
    );
    return new gr(e, s[0], s[1]);
  }
  panes() {
    return (this.data.panes || []).filter((e) => e.uuid);
  }
  overlay(e, i) {
    var s;
    return (s = this.panes()[e]) == null ? void 0 : s.overlays[i];
  }
  ovData(e, i) {
    var s, n;
    return (n = (s = this.panes()[e]) == null ? void 0 : s.overlays[i]) == null ? void 0 : n.data;
  }
  ovDataSubset(e, i) {
    var s, n;
    return (n = (s = this.panes()[e]) == null ? void 0 : s.overlays[i]) == null ? void 0 : n.dataSubset;
  }
  allOverlays() {
    return N.allOverlays(this.data.panes);
  }
  onScaleIndex(e) {
    let i = this.panes()[e.paneId];
    !i || (i.settings.scaleIndex = e.index, i.settings.scaleSideIdxs = e.sideIdxs, Qe(this, tt).emitSpec("chart", "update-layout"));
  }
  onDisplayOv(e) {
    let i = this.panes()[e.paneId];
    if (!i)
      return;
    let s = i.overlays[e.ovId];
    if (!s)
      return;
    s.settings.display = e.flag;
    let n = `${e.paneId}-${e.ovId}`;
    Qe(this, tt).emitSpec("chart", "update-layout"), Qe(this, tt).emitSpec(`ll-${n}`, "update-ll");
  }
}
tt = new WeakMap();
let li = {};
function vr(t) {
  return li[t] || (li[t] = new mr(t)), li[t];
}
const Ue = { instance: vr };
var it;
class Ir {
  constructor(e) {
    ti(this, it, void 0);
    let i = he.instance(e);
    this.hub = Ue.instance(e), ii(this, it, i), i.on("meta:sidebar-transform", this.onYTransform.bind(this)), this.storage = {};
  }
  init(e) {
    this.panes = 0, this.legendFns = [], this.yTransforms = [], this.preSamplers = [], this.yRangeFns = [], this.autoPrecisions = [], this.valueTrackers = [];
  }
  exctractFrom(e) {
    let i = e.gridId(), s = e.id();
    var n = this.yRangeFns[i] || [];
    n[s] = e.yRange ? {
      exec: e.yRange,
      preCalc: e.yRangePreCalc
    } : null;
    var r = this.preSamplers[i] || [];
    r[s] = e.preSampler;
    var o = this.legendFns[i] || [];
    o[s] = {
      legend: e.legend,
      legendHtml: e.legendHtml
    };
    var u = this.valueTrackers[i] || [];
    u[s] = e.valueTracker, this.yRangeFns[i] = n, this.preSamplers[i] = r, this.legendFns[i] = o, this.valueTrackers[i] = u;
  }
  onYTransform(e) {
    let i = this.yTransforms[e.gridId] || {}, s = i[e.scaleId] || {};
    i[e.scaleId] = Object.assign(s, e), this.yTransforms[e.gridId] = i, e.updateLayout && Qe(this, it).emitSpec("chart", "update-layout");
  }
  getYtransform(e, i) {
    return (this.yTransforms[e] || [])[i];
  }
  storeAutoPrec(e, i, s) {
    let n = this.autoPrecisions[e] || [];
    n[i] = s, this.autoPrecisions[e] = n;
  }
  getAutoPrec(e, i) {
    return (this.autoPrecisions[e] || [])[i];
  }
  getPreSampler(e, i) {
    return (this.preSamplers[e] || [])[i];
  }
  getLegendFns(e, i) {
    return (this.legendFns[e] || [])[i];
  }
  finish() {
    this.panes++, !(this.panes < this.hub.panes().length) && (this.autoPrecisions = [], this.restore(), setTimeout(() => {
      Qe(this, it).emitSpec("chart", "update-layout"), Qe(this, it).emit("update-legend");
    }));
  }
  store() {
    this.storage = {};
    let e = this.yTransforms || [];
    for (var i in e)
      for (var s in e[i] || []) {
        if (!e[i][s])
          continue;
        let n = this.hub.panes()[i];
        if (!n)
          continue;
        let r = n.overlays[s];
        if (!r)
          continue;
        let o = `${n.uuid}:${r.uuid}`;
        this.storage[o] = e[i][s];
      }
  }
  restore() {
    let e = this.yTransforms;
    for (var i in this.storage) {
      let [s, n] = i.split(":"), r = this.hub.panes().find((u) => u.uuid === s);
      if (!r)
        continue;
      let o = r.overlays.find((u) => u.uuid === n);
      !o || (e[r.id] = [], e[r.id][o.id] = this.storage[i]);
    }
    this.storage = {};
  }
}
it = new WeakMap();
let ai = {};
function yr(t) {
  return ai[t] || (ai[t] = new Ir(t)), ai[t];
}
const Fe = { instance: yr };
class br {
  constructor() {
  }
  init(e) {
    this.props = e, this.hub = Ue.instance(e.id);
  }
  detectInterval() {
    let e = N.allOverlays(this.hub.data.panes);
    e.filter((s) => s.main).length > 1 && console.warn(
      "Two or more overlays with flagged as 'main'"
    );
    let i = e.find((s) => s.main) || e[0];
    return this.main = (i || {}).data || [], this.interval = N.detectInterval(this.main), this.interval;
  }
  defaultRange() {
    const e = this.props.config.DEFAULT_LEN, i = this.props.config.MINIMUM_LEN + 0.5, s = this.main.length - 1;
    if (this.main.length < 2)
      return [];
    if (this.main.length <= e)
      var n = 0, r = i;
    else
      n = s - e, r = 0.5;
    return this.props.indexBased ? [
      n - this.interval * r,
      s + this.interval * i
    ] : [
      this.main[n][0] - this.interval * r,
      this.main[s][0] + this.interval * i
    ];
  }
  calcPanesHash() {
    let e = "";
    for (var i of this.hub.data.panes || []) {
      e += i.uuid;
      for (var s of i.overlays || [])
        e += s.uuid;
    }
    return e;
  }
  panesChanged() {
    return this.calcPanesHash() !== this.panesHash;
  }
  updatePanesHash() {
    this.panesHash = this.calcPanesHash();
  }
}
let ci = {};
function Ar(t) {
  return ci[t] || (ci[t] = new br(t)), ci[t];
}
const Ei = { instance: Ar };
function Xn(t, e) {
  const i = e[1] - e[0], s = t.spacex / i, n = (t.scaleSpecs || {}).log || !1;
  return Object.assign(t, {
    ti2x: (r, o) => {
    },
    time2x: (r) => Math.floor((r - e[0]) * s) - 0.5,
    value2y: (r) => (n && (r = $.log(r)), Math.floor(r * t.A + t.B) - 0.5),
    tMagnet: (r) => {
    },
    y2value: (r) => n ? $.exp((r - t.B) / t.A) : (r - t.B) / t.A,
    x2time: (r) => e[0] + r / s,
    x2ti: (r) => {
    },
    $magnet: (r) => {
    },
    cMagnet: (r) => {
      const o = t.candles || t.master_grid.candles, u = o.map((l) => l.raw[0]), a = N.nearestA(r, u)[0];
      return o[a];
    },
    dataMagnet: (r) => {
    }
  }), t;
}
const Ki = {
  candle(t, e, i, s) {
    return {
      x: e,
      w: t.pxStep * s.config.CANDLEW,
      o: Math.floor($.log(i[1]) * t.A + t.B),
      h: Math.floor($.log(i[2]) * t.A + t.B),
      l: Math.floor($.log(i[3]) * t.A + t.B),
      c: Math.floor($.log(i[4]) * t.A + t.B),
      raw: i
    };
  },
  expand(t, e) {
    let i = -e / ($.log(t.$hi) - $.log(t.$lo)), s = -$.log(t.$hi) * i, n = -e * 0.1, r = e * 1.1;
    t.$hi = $.exp((n - s) / i), t.$lo = $.exp((r - s) / i);
  }
}, { $SCALES: _r } = Le;
function Tr(t, e, i) {
  let { hub: s, props: n, settings: r, height: o } = i, { ctx: u } = n, a = Fe.instance(n.id), l = {}, p = (a.yTransforms[e.gridId] || [])[t], m = e.gridId, I = e.ovs, y = e.log;
  const b = n.config.AUTO_PRE_SAMPLE;
  function d() {
    if (Math.max(...I.map((j) => j.dataSubset.length)) < 2) {
      l.prec = 0, l.sb = n.config.SBMIN;
      return;
    }
    if (e.precision !== void 0)
      l.prec = e.precision;
    else {
      l.prec = 0;
      for (var _ of I) {
        if ("precision" in _.settings)
          var T = _.settings.precision;
        else
          var T = A(_);
        T > l.prec && (l.prec = T);
      }
    }
    if (!isFinite(l.$hi) || !isFinite(l.$lo)) {
      l.sb = n.config.SBMIN;
      return;
    }
    let w = [];
    w.push(l.$hi.toFixed(l.prec).length), w.push(l.$lo.toFixed(l.prec).length);
    let B = "0".repeat(Math.max(...w)) + "    ";
    l.sb = u.measureText(B).width, l.sb = Math.max(Math.floor(l.sb), n.config.SBMIN), l.sb = Math.min(l.sb, n.config.SBMAX);
  }
  function g() {
    var k = -1 / 0, _ = 1 / 0;
    for (var T of I) {
      if (T.settings.display === !1)
        continue;
      let ee = (a.yRangeFns[m] || [])[T.id], Ee = T.dataSubset;
      var w = -1 / 0, B = 1 / 0;
      if (!ee || ee && ee.preCalc)
        for (var j = 0; j < Ee.length; j++)
          for (var V = 1; V < Ee[j].length; V++) {
            let re = Ee[j][V];
            re > w && (w = re), re < B && (B = re);
          }
      if (ee)
        var [w, B, Q] = ee.exec(w, B);
      w > k && (k = w), B < _ && (_ = B);
    }
    p && !p.auto && p.range ? (l.$hi = p.range[0], l.$lo = p.range[1]) : (y ? (l.$hi = k, l.$lo = _, Ki.expand(l, o)) : (Q = Q === !1 ? 0 : 1, l.$hi = k + (k - _) * n.config.EXPAND * Q, l.$lo = _ - (k - _) * n.config.EXPAND * Q), l.$hi === l.$lo && (y ? Ki.expand(l, o) : (l.$hi *= 1.05, l.$lo *= 0.95)));
  }
  function A(k) {
    let _ = 0, T = [], w = a.getPreSampler(m, k.id);
    w = w || N.defaultPreSampler;
    for (var B = 0; B < b; B++) {
      let V = Math.floor(Math.random() * k.dataSubset.length), Q = w(k.dataSubset[V]);
      typeof Q == "number" ? T.push(Q) : T = T.concat(Q);
    }
    T.forEach((V) => {
      var Q = V != null ? V.toString() : "";
      if (V < 1e-6) {
        var [ee, Ee] = Q.split("e-"), [re, G] = ee.split(".");
        G || (G = ""), G = { length: G.length + parseInt(Ee) || 0 };
      } else
        var [re, G] = Q.split(".");
      G && G.length > _ && (_ = G.length);
    });
    let j = a.getAutoPrec(m, k.id);
    return j === void 0 || _ > j ? (a.storeAutoPrec(m, k.id, _), _) : j;
  }
  function Y() {
    y ? (l.A = -o / ($.log(l.$hi) - $.log(l.$lo)), l.B = -$.log(l.$hi) * l.A) : (l.A = -o / (l.$hi - l.$lo), l.B = -l.$hi * l.A);
  }
  function E() {
    let k = l.$hi - l.$lo, _ = k * (n.config.GRIDY / o), T = parseInt(k.toExponential().split("e")[1]), w = Math.pow(10, T), B = _r.map((j) => j * w);
    return N.strip(N.nearestA(_, B)[1]);
  }
  function P() {
    let k = L(), _ = F();
    return Math.max(k, _);
  }
  function L() {
    let k = Math.min(l.B, o);
    if (k < n.config.GRIDY)
      return 1;
    let _ = k / n.config.GRIDY, T = l.$hi;
    if (l.$lo > 0)
      var w = l.$hi / l.$lo;
    else
      w = l.$hi / 1;
    return T * (n.config.GRIDY / k), parseInt(T.toExponential().split("e")[1]), Math.pow(w, 1 / _);
  }
  function F() {
    let k = Math.min(o - l.B, o);
    if (k < n.config.GRIDY)
      return 1;
    let _ = k / n.config.GRIDY, T = Math.abs(l.$lo);
    if (l.$hi < 0 && l.$lo < 0)
      var w = Math.abs(l.$lo / l.$hi);
    else
      w = Math.abs(l.$lo) / 1;
    return T * (n.config.GRIDY / k), parseInt(T.toExponential().split("e")[1]), Math.pow(w, 1 / _);
  }
  function M() {
    let k = Math.pow(10, -l.prec);
    l.$step = Math.max(k, E()), l.ys = [];
    let _ = l.$lo - l.$lo % l.$step;
    for (var T = _; T <= l.$hi; T += l.$step) {
      let w = Math.floor(T * l.A + l.B);
      w > o || l.ys.push([w, N.strip(T)]);
    }
  }
  function R() {
    if (l.$_mult = P(), l.ys = [], !data.length)
      return;
    let k = Math.abs(data[data.length - 1][1] || 1), _ = O(k), T = J(-k), w = -1 / 0, B = o / n.config.GRIDY, j = 1 + (l.$_mult - 1) / 2;
    for (var V = _; V > 0; V /= l.$_mult) {
      V = H(V, j);
      let Q = Math.floor($.log(V) * l.A + l.B);
      if (l.ys.push([Q, N.strip(V)]), Q > o || Q - w < n.config.GRIDY * 0.7 || l.ys.length > B + 1)
        break;
      w = Q;
    }
    w = 1 / 0;
    for (var V = T; V < 0; V /= l.$_mult) {
      V = H(V, j);
      let ee = Math.floor($.log(V) * l.A + l.B);
      if (w - ee < n.config.GRIDY * 0.7 || (l.ys.push([ee, N.strip(V)]), ee < 0) || l.ys.length > B * 3 + 1)
        break;
      w = ee;
    }
  }
  function O(k) {
    let _ = o / n.config.GRIDY;
    for (var T = 1 / 0, w = k, B = 0; T > 0; )
      if (T = Math.floor($.log(w) * l.A + l.B), w *= l.$_mult, B++ > _ * 3)
        return 0;
    return w;
  }
  function J(k) {
    let _ = o / n.config.GRIDY;
    for (var T = -1 / 0, w = k, B = 0; T < o && (T = Math.floor($.log(w) * l.A + l.B), w *= l.$_mult, !(B++ > _ * 3)); )
      ;
    return w;
  }
  function H(k, _) {
    let T = Math.sign(k);
    if (k = Math.abs(k), k > 10) {
      for (var w = 10; w < MAX_INT; w *= 10) {
        let j = Math.floor(k / w) * w;
        if (k / j > _)
          break;
      }
      return w /= 10, T * Math.floor(k / w) * w;
    } else if (k < 1) {
      for (var B = 10; B >= 1; B--) {
        let j = N.round(k, B);
        if (k / j > _)
          break;
      }
      return T * N.round(k, B + 1);
    } else
      return T * Math.floor(k);
  }
  return g(), d(), Y(), y ? R() : M(), l.scaleSpecs = {
    id: t,
    log: e.log,
    ovIdxs: e.ovIdxs
  }, l.height = o, l;
}
const { TIMESCALES: wr, $SCALES: Ll, WEEK: Er, MONTH: Sr, YEAR: $i, HOUR: en, DAY: tn } = Le;
function nn(t, e, i = null) {
  let { hub: s, props: n, settings: r, height: o } = e, { interval: u, range: a, ctx: l, timezone: p } = n, m = {}, I = !!r.logScale, y = s.panes()[t].overlays, b = s.mainOv.dataSubset, d = { tiMap: m };
  function g() {
    let _ = A();
    for (var T = 0; T < y.length; T++) {
      let w = y[T], B = w.settings.scale || "A";
      _[B] || (_[B] = Y(B)), _[B].ovs.push(w), _[B].ovIdxs.push(T);
    }
    return Object.values(_);
  }
  function A() {
    let _ = {
      A: Y("A")
    };
    for (var T in r.scales || {}) {
      let w = r.scales[T];
      _[T] = Y(T, w);
    }
    return _;
  }
  function Y(_, T = {}) {
    var w;
    return {
      id: _,
      gridId: t,
      ovs: [],
      ovIdxs: [],
      log: (w = T.log) != null ? w : I,
      precision: T.precision
    };
  }
  function E() {
    if (b.length < 2)
      return;
    let _ = a[1] - a[0];
    d.spacex = n.width - d.sbMax[0] - d.sbMax[1];
    let T = _ / u;
    d.pxStep = d.spacex / T;
    let w = d.spacex / _;
    d.startx = (b[0][0] - a[0]) * w;
  }
  function P() {
    let _ = m.ib ? 6e4 : 1, w = (a[1] - a[0]) * _ * (n.config.GRIDX / n.width), B = wr;
    return N.nearestA(w, B)[1] / _;
  }
  function L() {
    if (i)
      d.tStep = i.tStep, d.pxStep = i.pxStep, d.startx = i.startx, d.spacex = i.spacex, d.xs = i.xs;
    else {
      E(), d.tStep = P(), d.xs = [];
      const T = a[1] - a[0], w = d.spacex / T;
      for (var _ = 0; _ < b.length; _++) {
        let B = b[_], j = b[_ - 1] || [], V = d.xs[d.xs.length - 1] || [0, []], Q = Math.floor((B[0] - a[0]) * w);
        F(j, B, Q);
        let ee = d.xs[d.xs.length - 1] || [0, []];
        V !== ee && ee[1][0] - V[1][0] < d.tStep * 0.8 && (ee[2] <= V[2] ? d.xs.pop() : d.xs.splice(d.xs.length - 2, 1));
      }
      u < Er && w > 0 && (M(T, w), R(T, w));
    }
  }
  function F(_, T, w, B) {
    let j = m.ib ? m.i2t(_[0]) : _[0], V = m.ib ? m.i2t(T[0]) : T[0];
    m.tf < tn && (j += p * en, V += p * en), (_[0] || u === $i) && N.getYear(V) !== N.getYear(j) ? d.xs.push([w, T, $i]) : _[0] && N.getMonth(V) !== N.getMonth(j) ? d.xs.push([w, T, Sr]) : N.dayStart(V) === V ? d.xs.push([w, T, tn]) : T[0] % d.tStep === 0 && d.xs.push([w, T, u]);
  }
  function M(_, T) {
    if (!d.xs.length || !isFinite(T))
      return;
    let w = d.xs[0][1][0];
    for (; ; ) {
      w -= d.tStep;
      let B = Math.floor((w - a[0]) * T);
      if (B < 0)
        break;
      w % u === 0 && d.xs.unshift([B, [w], u]);
    }
  }
  function R(_, T) {
    if (!d.xs.length || !isFinite(T))
      return;
    let w = d.xs[d.xs.length - 1][1][0];
    for (; ; ) {
      w += d.tStep;
      let B = Math.floor((w - a[0]) * T);
      if (B > d.spacex)
        break;
      w % u === 0 && d.xs.push([B, [w], u]);
    }
  }
  function O() {
    d.width = n.width - d.sbMax[0] - d.sbMax[1], d.height = o;
  }
  function J() {
    let _ = {};
    for (var T of g()) {
      let w = new Tr(T.id, T, e);
      _[T.id] = w;
    }
    d.scales = _;
  }
  function H() {
    d.scales[r.scaleIndex] || (r.scaleIndex = "A"), d.scaleIndex = r.scaleIndex, r.scaleTemplate || (r.scaleTemplate = [[], Object.keys(d.scales)]);
    let _ = r.scaleTemplate;
    (!_[0] || !_[1]) && console.error("Define scaleTemplate as [[],[]]"), r.scaleSideIdxs || (r.scaleSideIdxs = []);
    let T = r.scaleSideIdxs;
    N.autoScaleSideId(0, _, T), N.autoScaleSideId(1, _, T), d.sb = [];
    let w = _[0].includes(T[0]) ? T[0] : null;
    d.sb.push(d.scales[w] ? d.scales[w].sb : 0);
    let B = _[1].includes(T[1]) ? T[1] : null;
    d.sb.push(d.scales[B] ? d.scales[B].sb : 0);
  }
  function k() {
    let _ = d.sb;
    Object.assign(d, d.scales[d.scaleIndex]), d.sb = _, d.ys = d.ys || [];
  }
  return J(), H(), {
    create: () => (L(), O(), i && (d.mainGrid = i), d.settings = r, d.main = !i, d.id = t, k(), Xn(d, a)),
    getLayout: () => d,
    setMaxSidebar: (_) => d.sbMax = _,
    getSidebar: () => d.sb,
    id: () => t
  };
}
function sn(t, e) {
  let i = e.chart, s = e.offchart, n = e.panes().filter((g) => g.settings);
  if (!i)
    return {};
  function r() {
    const g = t.height - t.config.BOTBAR;
    if (n.find((F) => F.settings.height))
      return o(g);
    const A = s.length, Y = 2 * Math.sqrt(A) / 7 / (A || 1), E = Math.floor(g * Y), P = g - E * A;
    let L = Array(A + 1).fill(E);
    return L[e.mainPaneId] = P, L;
  }
  function o(g) {
    let A = e.panes().map((P) => {
      var L;
      return (L = P.settings.height) != null ? L : 1;
    }), Y = A.reduce((P, L) => P + L, 0);
    A = A.map((P) => Math.floor(P / Y * g)), Y = A.reduce((P, L) => P + L, 0);
    for (var E = 0; E < g - Y; E++)
      A[E % A.length]++;
    return A;
  }
  const u = r();
  let a = (g) => ({
    hub: e,
    props: t,
    settings: n[g].settings,
    height: u[g]
  }), l = new nn(
    e.mainPaneId,
    a(e.mainPaneId)
  ), p = [l];
  for (var [m, I] of n.entries())
    m !== e.mainPaneId && p.push(
      new nn(
        m,
        a(m),
        l.getLayout()
      )
    );
  let y = [
    Math.max(...p.map((g) => g.getSidebar()[0])),
    Math.max(...p.map((g) => g.getSidebar()[1]))
  ], b = [], d = 0;
  for (var m = 0; m < p.length; m++) {
    let A = p[m].id();
    p[m].setMaxSidebar(y), b[A] = p[m].create();
  }
  for (var m = 0; m < b.length; m++)
    b[m].offset = d, d += b[m].height;
  return {
    grids: b,
    main: b.find((g) => g.main),
    botbar: {
      width: t.width,
      height: t.config.BOTBAR,
      offset: d,
      xs: b[0] ? b[0].xs : []
    }
  };
}
function Yr(t) {
  let i = document.createElement("canvas").getContext("2d");
  return i.font = t.config.FONT, i;
}
const Mr = `
// NavyJS ~ 0.1-lite

[OVERLAY name=Area, ctx=Canvas, author=ChartMaster, version=1.0.0]

// Define new props
prop('color', { type: 'Color', def: '#31ce31' })
prop('lineWidth', { type: 'Integer', def: 1.25 })
prop('back1', { type: 'Color', def: $props.color + '15' })
prop('back2', { type: 'Color', def: $props.color + '01' })

draw(ctx) {

    const layout = $core.layout
    const data = $core.data // Full dataset
    const view = $core.view // Visible view
    const grd = ctx.createLinearGradient(0, 0, 0, layout.height)
    grd.addColorStop(0, $props.back1)
    grd.addColorStop(1, $props.back2)

    // Line
    ctx.lineWidth = $props.lineWidth
    ctx.strokeStyle = $props.color
    ctx.beginPath()
    for (var i = view.i1, n = view.i2; i <= n; i++) {
        let p = data[i]
        let x = layout.time2x(p[0])
        let y = layout.value2y(p[1])
        ctx.lineTo(x, y)
    }
    ctx.stroke()

    // Area
    ctx.fillStyle = grd
    ctx.beginPath()
    let p0 = (data[0] || [])[0]
    let pN = (data[data.length - 1] || [])[0]
    ctx.lineTo(layout.time2x(p0), layout.height)
    for (var i = view.i1, n = view.i2; i <= n; i++) {
        let p = data[i]
        let x = layout.time2x(p[0])
        let y = layout.value2y(p[1])
        ctx.lineTo(x, y)
    }
    ctx.lineTo(layout.time2x(pN), layout.height)
    ctx.fill()

}

// Legend, defined as pairs [value, color]
legend(x) => [[x[1], $props.color]]
`, kr = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Mr
}, Symbol.toStringTag, { value: "Module" })), Jr = `
// NavyJS ~ 0.1-lite

[OVERLAY name=Candles, ctx=Canvas, author=ChartMaster, version=1.0.0]

// Define the props
prop('colorBodyUp', { type: 'Color', def: $core.colors.candleUp })
prop('colorBodyDw', { type: 'Color', def: $core.colors.candleDw })
prop('colorWickUp', { type: 'Color', def: $core.colors.wickUp })
prop('colorWickDw', { type: 'Color', def: $core.colors.wickDw })
prop('colorVolUp', { type: 'Color', def: $core.colors.volUp })
prop('colorVolDw', { type: 'Color', def: $core.colors.volDw })
prop('showVolume', { type: 'boolean', def: true })
prop('currencySymbol', { type: 'string', def: '$' })
prop('showAvgVolume', { type: 'boolean', def: true })
prop('avgVolumeSMA', { type: 'string', def: 20 })
prop('colorAvgVol', { type: 'Color', def: '#1cccb777'})
prop('scaleSymbol', { type: 'string|boolean', def: false })
prop('priceLine', { type: 'boolean', def: true })
prop('showValueTracker', { type: 'boolean', def: true })


// Draw call
draw(ctx) {

    let cnv = $lib.layoutCnv($core, true, $props.showVolume)
    if (!cnv.upBodies.length) return
    let w = Math.max(cnv.upBodies[0].w, 1)

    drawCvPart(ctx, $lib.candleWick, cnv.dwWicks, 1, 'colorWickDw')
    drawCvPart(ctx, $lib.candleWick, cnv.upWicks, 1, 'colorWickUp')
    drawCvPart(ctx, $lib.candleBody, cnv.dwBodies, w, 'colorBodyDw')
    drawCvPart(ctx, $lib.candleBody, cnv.upBodies, w, 'colorBodyUp')
    drawCvPart(ctx, $lib.volumeBar, cnv.dwVolbars, w, 'colorVolDw')
    drawCvPart(ctx, $lib.volumeBar, cnv.upVolbars, w, 'colorVolUp')

    if ($props.showAvgVolume) $lib.avgVolume(ctx, $core, $props, cnv)

}

// Draw candle part
drawCvPart(ctx, f, arr, w, color) {
    let layout = $core.layout
    ctx.lineWidth = w
    ctx.strokeStyle = $props[color]
    ctx.beginPath()
    for (var i = 0, n = arr.length; i < n; i++) {
        f(ctx, arr[i], layout)
    }
    ctx.stroke()
}

// Define y-range (by finding max High, min Low)
yRange() {
    // Getting updated data faster
    // (we need 1 more update when using $core.dataSubset)
    let data = $core.hub.ovDataSubset($core.paneId, $core.id)
    let len = data.length
    var h, l, high = -Infinity, low = Infinity
    for(var i = 0; i < len; i++) {
        let point = data[i]
        if (point[2] > high) high = point[2]
        if (point[3] < low) low = point[3]
    }
    return [high, low]
}

// Use [Open, Close] for precision detection
preSampler(x) => [x[1], x[4]]

// Price label + Scale symbol + price line
valueTracker(x) => {
    show: $props.showValueTracker,
    symbol: $props.scaleSymbol,
    line: $props.priceLine,
    color: $lib.candleColor($props, $core.data[$core.data.length - 1]),
    value: x[4] // close
}

// Define the OHLCV legend
legendHtml(x, prec, f) {
    let color1 = $core.colors.text
    let v = $core.cursor.getValue($core.paneId, $core.id)
    let sym = $props.currencySymbol
    let color2 = v[4] >= v[1] ?
        $props.colorBodyUp : $props.colorBodyDw
    let fc = $lib.formatCash
    return \`
    <span style="color: \${color2}">
        <span style="margin-left: 3px;"></span>
        <span style="color: \${color1}">O</span>
        <span class="nvjs-ll-value">\${f(x[1])}</span>
        <span style="color: \${color1}">H</span>
        <span class="nvjs-ll-value">\${f(x[2])}</span>
        <span style="color: \${color1}">L</span>
        <span class="nvjs-ll-value">\${f(x[3])}</span>
        <span style="color: \${color1}">C</span>
        <span class="nvjs-ll-value">\${f(x[4])}</span>
        <span style="color: \${color1}">V</span>
        <span class="nvjs-ll-value">\${sym+fc(x[5])}</span>
    <span>
    \`
}
`, xr = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Jr
}, Symbol.toStringTag, { value: "Module" })), Cr = `
// NavyJS ~ 0.1-lite

[OVERLAY name=Spline, ctx=Canvas, author=ChartMaster, version=1.0.0]

// Define new props
prop('color', { type: 'Color', def: '#31ce31' })
prop('lineWidth', { type: 'Integer', def: 1 })
prop('dataIndex', { type: 'Integer', def: 1 })


draw(ctx) {
    ctx.lineWidth = $props.lineWidth
    ctx.lineJoin = "round"
    ctx.strokeStyle = $props.color
    ctx.beginPath()
    const layout = $core.layout
    const data = $core.data // Full dataset
    const view = $core.view // Visible view
    const idx = $props.dataIndex
    for (var i = view.i1, n = view.i2; i <= n; i++) {
        let p = data[i]
        let x = layout.time2x(p[0])
        let y = layout.value2y(p[idx])
        ctx.lineTo(x, y)
    }
    ctx.stroke()
}

// Price label + Scale symbol + price line
/*valueTracker(x) => {
    show: true,
    symbol: $core.src.name,
    line: true,
    color: $props.color,
    value: x[$props.dataIndex]
}*/

// Legend, defined as pairs [value, color]
legend(x) => [[x[$props.dataIndex], $props.color]]
`, Or = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Cr
}, Symbol.toStringTag, { value: "Module" }));
var zn = { exports: {} };
const Pr = (t, e = {}) => {
  const i = e.safe === !0 || e.keepProtected === !0;
  let s = !1;
  const n = (r) => {
    let o = "", u, a;
    for (const l of r.nodes)
      switch (l.type) {
        case "block":
          if (e.first && s === !0) {
            o += n(l);
            break;
          }
          if (e.preserveNewlines === !0) {
            u = n(l), a = u.split(`
`), o += `
`.repeat(a.length - 1);
            break;
          }
          if (i === !0 && l.protected === !0) {
            o += n(l);
            break;
          }
          s = !0;
          break;
        case "line":
          if (e.first && s === !0) {
            o += l.value;
            break;
          }
          i === !0 && l.protected === !0 && (o += l.value), s = !0;
          break;
        case "open":
        case "close":
        case "text":
        case "newline":
        default: {
          o += l.value || "";
          break;
        }
      }
    return o;
  };
  return n(t);
};
var Nr = Pr;
class jn {
  constructor(e) {
    this.type = e.type, e.value && (this.value = e.value), e.match && (this.match = e.match), this.newline = e.newline || "";
  }
  get protected() {
    return Boolean(this.match) && this.match[1] === "!";
  }
}
class Rr extends jn {
  constructor(e) {
    super(e), this.nodes = e.nodes || [];
  }
  push(e) {
    this.nodes.push(e);
  }
  get protected() {
    return this.nodes.length > 0 && this.nodes[0].protected === !0;
  }
}
var Dr = { Node: jn, Block: Rr }, qn = {};
(function(t) {
  t.ada = { LINE_REGEX: /^--.*/ }, t.apl = { LINE_REGEX: /^⍝.*/ }, t.applescript = {
    BLOCK_OPEN_REGEX: /^\(\*/,
    BLOCK_CLOSE_REGEX: /^\*\)/
  }, t.csharp = {
    LINE_REGEX: /^\/\/.*/
  }, t.haskell = {
    BLOCK_OPEN_REGEX: /^\{-/,
    BLOCK_CLOSE_REGEX: /^-\}/,
    LINE_REGEX: /^--.*/
  }, t.javascript = {
    BLOCK_OPEN_REGEX: /^\/\*\*?(!?)/,
    BLOCK_CLOSE_REGEX: /^\*\/(\n?)/,
    LINE_REGEX: /^\/\/(!?).*/
  }, t.lua = {
    BLOCK_OPEN_REGEX: /^--\[\[/,
    BLOCK_CLOSE_REGEX: /^\]\]/,
    LINE_REGEX: /^--.*/
  }, t.matlab = {
    BLOCK_OPEN_REGEX: /^%{/,
    BLOCK_CLOSE_REGEX: /^%}/,
    LINE_REGEX: /^%.*/
  }, t.perl = {
    LINE_REGEX: /^#.*/
  }, t.php = {
    ...t.javascript,
    LINE_REGEX: /^(#|\/\/).*?(?=\?>|\n)/
  }, t.python = {
    BLOCK_OPEN_REGEX: /^"""/,
    BLOCK_CLOSE_REGEX: /^"""/,
    LINE_REGEX: /^#.*/
  }, t.ruby = {
    BLOCK_OPEN_REGEX: /^=begin/,
    BLOCK_CLOSE_REGEX: /^=end/,
    LINE_REGEX: /^#.*/
  }, t.shebang = t.hashbang = {
    LINE_REGEX: /^#!.*/
  }, t.c = t.javascript, t.csharp = t.javascript, t.css = t.javascript, t.java = t.javascript, t.js = t.javascript, t.less = t.javascript, t.pascal = t.applescript, t.ocaml = t.applescript, t.sass = t.javascript, t.sql = t.ada, t.swift = t.javascript, t.ts = t.javascript, t.typscript = t.javascript;
})(qn);
const { Node: Xe, Block: rn } = Dr, Br = qn, ui = {
  ESCAPED_CHAR_REGEX: /^\\./,
  QUOTED_STRING_REGEX: /^(['"`])((?:\\\1|[^\1])*?)(\1)/,
  NEWLINE_REGEX: /^\r*\n/
}, Lr = (t, e = {}) => {
  if (typeof t != "string")
    throw new TypeError("Expected input to be a string");
  const i = new rn({ type: "root", nodes: [] }), s = [i], n = (e.language || "javascript").toLowerCase(), r = Br[n];
  if (typeof r == "undefined")
    throw new Error(`Language "${n}" is not supported by strip-comments`);
  const { LINE_REGEX: o, BLOCK_OPEN_REGEX: u, BLOCK_CLOSE_REGEX: a } = r;
  let l = i, p = t, m, I;
  const y = [u, a].filter(Boolean);
  let b = !1;
  y.every((E) => E.source === '^"""') && (b = !0);
  const d = (E = p[0] || "") => (p = p.slice(E.length), E), g = (E, P = "text") => {
    const L = E.exec(p);
    if (L)
      return d(L[0]), { type: P, value: L[0], match: L };
  }, A = (E) => {
    if (I && I.type === "text" && E.type === "text") {
      I.value += E.value;
      return;
    }
    l.push(E), E.nodes && (s.push(E), l = E), I = E;
  }, Y = () => {
    if (l.type === "root")
      throw new SyntaxError("Unclosed block comment");
    s.pop(), l = s[s.length - 1];
  };
  for (; p !== ""; ) {
    if (m = g(ui.ESCAPED_CHAR_REGEX, "text")) {
      A(new Xe(m));
      continue;
    }
    if (l.type !== "block" && (!I || !/\w$/.test(I.value)) && !(b && p.startsWith('"""')) && (m = g(ui.QUOTED_STRING_REGEX, "text"))) {
      A(new Xe(m));
      continue;
    }
    if (m = g(ui.NEWLINE_REGEX, "newline")) {
      A(new Xe(m));
      continue;
    }
    if (u && e.block && !(b && l.type === "block") && (m = g(u, "open"))) {
      A(new rn({ type: "block" })), A(new Xe(m));
      continue;
    }
    if (a && l.type === "block" && e.block && (m = g(a, "close"))) {
      m.newline = m.match[1] || "", A(new Xe(m)), Y();
      continue;
    }
    if (o && l.type !== "block" && e.line && (m = g(o, "line"))) {
      A(new Xe(m));
      continue;
    }
    if (m = g(/^[a-zABD-Z0-9\t ]+/, "text")) {
      A(new Xe(m));
      continue;
    }
    A(new Xe({ type: "text", value: d(p[0]) }));
  }
  return i;
};
var Ur = Lr;
/*!
 * strip-comments <https://github.com/jonschlinkert/strip-comments>
 * Copyright (c) 2014-present, Jon Schlinkert.
 * Released under the MIT License.
 */
const Gt = Nr, wt = Ur, Ht = zn.exports = (t, e) => {
  const i = { ...e, block: !0, line: !0 };
  return Gt(wt(t, i), i);
};
Ht.block = (t, e) => {
  const i = { ...e, block: !0 };
  return Gt(wt(t, i), i);
};
Ht.line = (t, e) => {
  const i = { ...e, line: !0 };
  return Gt(wt(t, i), i);
};
Ht.first = (t, e) => {
  const i = { ...e, block: !0, line: !0, first: !0 };
  return Gt(wt(t, i), i);
};
Ht.parse = wt;
function Fr(t, e) {
  return zn.exports(t);
}
function Gr(t, e) {
  let i = Wn(t, e);
  for (var s of i) {
    let n = t.slice(0, s[0] + 1);
    n += t.slice(s[0] + 1, s[1]).replaceAll("/*", "[!C~1!]").replaceAll("//", "[!C~2!]"), n += t.slice(s[1]), t = n;
  }
  return t;
}
function Hr(t, e) {
  return t.replaceAll("[!C~1!]", "/*").replaceAll("[!C~2!]", "//");
}
function Wn(t, e) {
  let i = { "'": 0, '"': 0, "`": 0 }, s = [], n = null;
  for (var r = 0; r < t.length; r++)
    for (var o in i)
      if (t[r] === o && t[r - 1] !== "\\" && (i[o]++, n || (n = [r, void 0])), t[r] === o && t[r - 1] !== "\\" && r > n[0] && (i[o] = 0, n && Object.values(i).every((u) => !u) && (n[1] = r, s.push(n), n = null)), i[o] < 0)
        throw `Missing quote ${o} in ${e}`;
  if (n !== null)
    throw `Missing quote in ${e}: ${JSON.stringify(i)}`;
  return s;
}
function Vr(t, e = btoa) {
  let i = /\/([^*\/]?.+)\//g;
  do {
    var s = i.exec(t);
    if (s) {
      let n = s[0].length;
      s[1].slice(-1) === "*" && (n--, s[1] = s[1].slice(0, -1));
      let r = t.slice(0, s.index + 1), o = e(s[1]);
      r += o + t.slice(s.index + n - 1), t = r, i.lastIndex = s.index + o.length;
    }
  } while (s);
  return t;
}
function Xr(t, e, i, s = "{}") {
  let n = s[0], r = s[1], o = { "'": 0, '"': 0, "`": 0 }, u = 0, a = null;
  for (var l = e; l < t.length; l++) {
    for (var p in o)
      if (t[l] === p && t[l - 1] !== "\\" && (o[p]++, a || (a = [l, void 0])), t[l] === p && t[l - 1] !== "\\" && l > a[0] && (o[p] = 0, a && Object.values(o).every((I) => !I) && (a[1] = l, a = null)), o[p] < 0)
        throw `Missing quote ${p} in ${i}`;
    if (o["'"] + o['"'] + o["`"] === 0 && (t[l] === n && u++, t[l] === r && u--, u === 0))
      break;
  }
  if (u !== 0)
    throw `Missing bracket in ${i}: ${s}`;
  if (a !== null)
    throw `Missing quote in ${i}: ${JSON.stringify(o)}`;
  return l;
}
const hi = {
  maskStrings: Gr,
  unmaskStrings: Hr,
  findStrings: Wn,
  maskRegex: Vr,
  decomment: Fr,
  findClosingBracket: Xr
}, Nt = /(function[\s]+|)([$A-Z_][0-9A-Z_$\.]*)[\s]*?\(([^()]*?)\)[\s]*?{/gmi, Rt = /(function[\s]+|)([$A-Z_][0-9A-Z_$\.]*)[\s]*?\(([^()]*?)\)[\s]*?=>[\s]*?{/gmi, fi = /(function[\s]+|)([$A-Z_][0-9A-Z_$\.]*)[\s]*?\(([^()]*?)\)[\s]*?=>/gmi, on = ["if", "for", "while", "switch", "catch", "with"];
class zr {
  constructor(e, i) {
    this.tagProps = this.parseTagProps(e), this.src = i, this.flags = "", this.parseBody();
  }
  parseTagProps(e) {
    let i = {}, s = e.split(",");
    for (var n of s) {
      let [r, o] = n.split("=");
      i[r.trim()] = o.trim();
    }
    return i;
  }
  parseBody() {
    let e = hi.decomment(this.src);
    e = this.prepFuncions1(e), e = this.prepFuncions2(e), e = this.prepFuncions3(e), this.prefab = this.wrapTheCode(e, this.flags);
  }
  prepFuncions1(e) {
    let i = "", s = 0;
    Nt.lastIndex = 0;
    do {
      var n = Nt.exec(e);
      if (n) {
        n[1].trim();
        let r = n[2], o = n[3], u = Nt.lastIndex - 1, a = hi.findClosingBracket(e, u);
        if (on.includes(r))
          i += e.slice(s, a + 1);
        else {
          let l = e.slice(u, a + 1);
          i += e.slice(s, n.index), i += `var ${r} = (${o}) => ${l}`, this.parseFlags(r, o, l);
        }
        Nt.lastIndex = a, s = a + 1;
      }
    } while (n);
    return i + e.slice(s);
  }
  prepFuncions2(e) {
    let i = "", s = 0;
    Rt.lastIndex = 0;
    do {
      var n = Rt.exec(e);
      if (n) {
        n[1].trim();
        let r = n[2], o = n[3], u = Rt.lastIndex - 1, a = hi.findClosingBracket(e, u);
        if (on.includes(r))
          i += e.slice(s, a + 1);
        else {
          let l = e.slice(u, a + 1);
          i += e.slice(s, n.index), i += `var ${r} = (${o}) => (${l})`, this.parseFlags(r, o, l);
        }
        Rt.lastIndex = a, s = a + 1;
      }
    } while (n);
    return i + e.slice(s);
  }
  prepFuncions3(e) {
    let i = "", s = 0;
    fi.lastIndex = 0;
    do {
      var n = fi.exec(e);
      if (n) {
        n[1].trim();
        let r = n[2], o = n[3], u = fi.lastIndex;
        i += e.slice(s, n.index), i += `var ${r} = (${o}) => `, this.parseFlags(r, o, ""), s = u + 1;
      }
    } while (n);
    return i + e.slice(s);
  }
  parseFlags(e, i, s) {
    if (e === "yRange") {
      let n = !!i.trim().length;
      this.flags += `yRangePreCalc: ${n},
`;
    }
  }
  wrapTheCode(e, i) {
    return new Function("env", `

            // Setup the environment
            let { $core, $props, $events } = env
            let prop = (...args) => env.prop(...args)

            // Add primitives
            let $lib = env.lib

            // Function stubs
            var init = () => {}
            var destroy = () => {}
            var meta = () => null
            var dataFormat = () => null
            var draw = () => {}
            var drawSidebar = null
            var drawBotbar = null
            var yRange = null
            var preSampler = null
            var legend = null
            var legendHtml = null
            var valueTracker = null

            // Overlay code
            ${e}

            // Output overlay object
            return {
                gridId: () => $core.layout.id,
                id: () => $core.id,
                init, meta, dataFormat,
                draw, drawSidebar, drawBotbar,
                yRange, preSampler,
                legend, legendHtml,
                valueTracker,
                // Generated flags
                ${i}
            }
        `);
  }
}
const ln = 0.1, jr = "lite", qr = /\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*$/gm, an = /\[OVERLAY[\s]+([\s\S]*?)]([\s\S]*?)(\[OVERLAY|\[SCRIPT|\[EOF)/gm;
class Wr {
  constructor(e, i = "Unknown Script") {
    this.version = ln, this.src = e + `
[EOF]`, this.scriptName = i, this.scriptVers = this.navyVers()[0], this.scriptTag = this.navyVers()[1], this.overlays = [], this.scripts = [], this.scriptVers === 0 && console.warn(`${i}: There is no script version string`), this.scriptVers > this.version && console.warn(`${i}: Script version > parser version`), this.scriptTag !== jr && console.warn(
      `${i}: Script version should have 'lite' tag
Most likely are using the community version of NavyJS
with a script written for the PRO version.
If not the case just use 'lite' tag: ${ln}-lite`
    ), this.overlayTags();
  }
  navyVers() {
    let e = (this.src.match(qr) || [])[0];
    if (e) {
      let i = e.split("~");
      if (i.length < 2)
        return [0];
      let s = parseFloat(i[1]), n = i[1].split("-")[1];
      return [s === s ? s : 0, n];
    }
    return [0];
  }
  overlayTags() {
    for (var e; e = an.exec(this.src); )
      this.overlays.push(new zr(
        e[1],
        e[2]
      )), an.lastIndex -= 10;
  }
}
const Zr = /* @__PURE__ */ Object.assign({ "../scripts/area.navy": kr, "../scripts/candles.navy": xr, "../scripts/spline.navy": Or });
class Qr {
  init(e) {
    this.srcLib = Object.values(Zr).map((i) => i.default), this.srcLib.push(...e), this.prefabs = {}, this.parse();
  }
  parse() {
    this.prefabs = {};
    for (var e of this.srcLib) {
      let s = new Wr(e);
      for (var i of s.overlays)
        this.prefabs[i.tagProps.name] = {
          name: i.tagProps.name,
          author: i.tagProps.author,
          version: i.tagProps.version,
          ctx: i.tagProps.ctx || "Canvas",
          make: i.prefab
        };
    }
  }
}
let pi = {};
function Kr(t) {
  return pi[t] || (pi[t] = new Qr(t)), pi[t];
}
const Zn = { instance: Kr };
class $r {
  constructor(e, i, s, n) {
    this.ctx = s, this.core = e, this.style = n.src[6] || i, this.draw(n);
  }
  draw(e) {
    const i = e.src[4] >= e.src[1], s = i ? this.style.colorCandleUp : this.style.colorCandleDw, n = i ? this.style.colorWickUp : this.style.colorWickDw;
    let r = Math.max(e.w, 1), o = e.x - 1;
    this.ctx.lineWidth = 1, this.ctx.strokeStyle = n, this.ctx.beginPath(), this.ctx.moveTo(o, Math.floor(e.h)), this.ctx.lineTo(o, Math.floor(e.l)), this.ctx.stroke(), this.ctx.lineWidth = r, this.ctx.strokeStyle = s, this.ctx.beginPath(), this.ctx.moveTo(
      o,
      Math.floor(Math.min(e.o, e.c))
    ), this.ctx.lineTo(
      o,
      Math.floor(Math.max(e.o, e.c)) + (e.o === e.c ? 1 : 0)
    ), this.ctx.stroke();
  }
}
function eo(t, e) {
  let i = e.x - 1;
  t.moveTo(
    i,
    Math.floor(Math.min(e.o - 1, e.c - 1))
  ), t.lineTo(
    i,
    Math.floor(Math.max(e.o, e.c))
  );
}
function to(t, e) {
  let i = e.x - 1;
  t.moveTo(i, Math.floor(e.h)), t.lineTo(i, Math.floor(e.l));
}
function io(t, e, i) {
  let s = i.height, n = Math.max(1, e.x2 - e.x1 - 0.5), r = e.h, o = (e.x2 + e.x1) * 0.5;
  t.lineWidth = n, t.moveTo(o, s - r), t.lineTo(o, s);
}
class no {
  constructor(e, i, s, n) {
    this.ctx = s, this.style = n.src[6] || i, this.layout = e.layout, this.draw(n);
  }
  draw(e) {
    let i = this.layout.height, s = e.x2 - e.x1, n = Math.floor(e.h);
    this.ctx.fillStyle = e.green ? this.style.colorVolUp : this.style.colorVolDw, this.ctx.fillRect(
      Math.floor(e.x1),
      Math.floor(i - n - 0.5),
      Math.floor(s),
      Math.floor(n + 1)
    );
  }
}
function so(t, e = !0, i = !0) {
  let s = t.props.config, n = t.props.interval, r = t.data, o = t.layout.time2x, u = t.layout, a = t.view, l = 5, p = [], m = [], I = [], y = [], b = [], d = [];
  if (i)
    var g = ro(t.dataSubset, l), A = s.VOLSCALE * u.height / g;
  var Y, E, P, L = void 0;
  let { A: F, B: M, pxStep: R } = u, O = R * s.CANDLEW, J = R > 5 ? 1 : 0;
  for (var H = a.i1, k = a.i2; H <= k; H++) {
    let _ = r[H], T = _[4] >= _[1];
    if (P = o(_[0]) + 1, r[H - 1] && _[0] - r[H - 1][0] > n && (L = null), e) {
      let w = {
        x: P,
        w: O,
        o: Math.floor(_[1] * F + M),
        h: Math.floor(_[2] * F + M),
        l: Math.floor(_[3] * F + M),
        c: Math.floor(_[4] * F + M),
        green: T,
        src: _
      };
      T ? (p.push(w), I.push(w)) : (m.push(w), y.push(w));
    }
    if (i) {
      Y = L || Math.floor(P - R * 0.5), E = Math.floor(P + R * 0.5) - 0.5;
      let w = {
        x1: Y,
        x2: E,
        h: _[5] * A,
        green: T,
        src: _
      };
      T ? b.push(w) : d.push(w);
    }
    L = E + J;
  }
  return {
    upBodies: p,
    upWicks: I,
    dwBodies: m,
    dwWicks: y,
    upVolbars: b,
    dwVolbars: d,
    maxVolume: g
  };
}
function ro(t, e) {
  let i = 0;
  for (var s = 0; s < t.length; s++) {
    let n = t[s][e];
    n > i && (i = n);
  }
  return i;
}
function Qn(t, e, i, s, n) {
  let r = 0, o = [], u = 0, a = 1 / n, l = Math.max(i - n, 0);
  for (var p = l; p <= s; p++)
    r += t[p][e], u++, u > n && (r -= t[p - n][e], u--), u === n && o.push([t[p][0], r * a]);
  return o;
}
function oo(t, e = []) {
  return e[4] >= e[1] ? t.colorBodyUp : t.colorBodyDw;
}
function lo(t, e, i, s) {
  let n = e.view.i1, r = e.view.i2, o = i.avgVolumeSMA, u = Qn(e.data, 5, n, r, o), a = e.layout, l = s.maxVolume, p = e.props.config.VOLSCALE * a.height / l, m = a.height;
  e.props.config.VOLSCALE * 0.5 * m, t.lineJoin = "round", t.lineWidth = 0.75, t.strokeStyle = i.colorAvgVol, t.beginPath();
  for (var I = 0, y = u.length; I < y; I++) {
    let b = a.time2x(u[I][0]), d = m - u[I][1] * p;
    t.lineTo(b, d);
  }
  t.stroke();
}
const ao = N.formatCash;
class co {
  constructor(e, i, s, n) {
    let r = Ue.instance(n.id), o = Fe.instance(n.id), u = he.instance(n.id), a = Ei.instance(n.id);
    this.ovSrc = i, this.overlay = null, this.id = e, this.$core = { hub: r, meta: o, scan: a }, this.update(i, s, n), this.$props = i.props, this.$events = u, this.lib = {
      Candle: $r,
      Volbar: no,
      layoutCnv: so,
      formatCash: ao,
      candleBody: eo,
      candleWick: to,
      volumeBar: io,
      fastSma: Qn,
      avgVolume: lo,
      candleColor: oo
    };
  }
  prop(e, i = {}) {
    e in this.$props || (this.$props[e] = i.def);
  }
  update(e, i, s) {
    if (!i)
      return;
    let n = this.$core;
    n.layout = this.buildLayout(
      i,
      s.range
    ), n.dataSubset = e.dataSubset, n.data = e.data, n.view = e.dataView, n.id = e.id, n.paneId = n.layout.id, n.uuid = e.uuid, n.range = s.range, n.colors = s.colors, n.cursor = s.cursor, n.src = e, n.props = s;
  }
  buildLayout(e, i) {
    let s = {};
    this.scaleId = this.getScaleId(e);
    let n = e.scales[this.scaleId];
    return Xn(
      Object.assign(s, e, n),
      i
    );
  }
  getScaleId(e) {
    let i = e.scales;
    for (var s in i)
      if (i[s].scaleSpecs.ovIdxs.includes(this.id))
        return s;
  }
}
class Vt {
  constructor(e, i, s) {
    this.id = 0, this.nvId = s, this.name = i, this.zIndex = 0, this.overlay = null, this.ovSrc = null, this.env = null, this.ctxType = null, this.display = !0, this.opacity = void 0;
  }
  update() {
    var e;
    !this.ovSrc || (this.display = (e = this.ovSrc.settings.display) != null ? e : !0);
  }
}
class uo {
  constructor(e) {
    this.t0 = this.t = N.now(), this.id = setInterval(() => {
      N.now() - this.t > 100 || (N.now() - this.t0 > 1200 && this.stop(), this.id && e(this), this.t = N.now());
    }, 16);
  }
  stop() {
    clearInterval(this.id), this.id = null;
  }
}
var Kn = { exports: {} };
/*! Hammer.JS - v2.0.7 - 2016-04-22
 * http://hammerjs.github.io/
 *
 * Copyright (c) 2016 Jorik Tangelder;
 * Licensed under the MIT license */
(function(t) {
  (function(e, i, s, n) {
    var r = ["", "webkit", "Moz", "MS", "ms", "o"], o = i.createElement("div"), u = "function", a = Math.round, l = Math.abs, p = Date.now;
    function m(c, h, f) {
      return setTimeout(E(c, f), h);
    }
    function I(c, h, f) {
      return Array.isArray(c) ? (y(c, f[h], f), !0) : !1;
    }
    function y(c, h, f) {
      var v;
      if (!!c)
        if (c.forEach)
          c.forEach(h, f);
        else if (c.length !== n)
          for (v = 0; v < c.length; )
            h.call(f, c[v], v, c), v++;
        else
          for (v in c)
            c.hasOwnProperty(v) && h.call(f, c[v], v, c);
    }
    function b(c, h, f) {
      var v = "DEPRECATED METHOD: " + h + `
` + f + ` AT 
`;
      return function() {
        var S = new Error("get-stack-trace"), x = S && S.stack ? S.stack.replace(/^[^\(]+?[\n$]/gm, "").replace(/^\s+at\s+/gm, "").replace(/^Object.<anonymous>\s*\(/gm, "{anonymous}()@") : "Unknown Stack Trace", z = e.console && (e.console.warn || e.console.log);
        return z && z.call(e.console, v, x), c.apply(this, arguments);
      };
    }
    var d;
    typeof Object.assign != "function" ? d = function(h) {
      if (h === n || h === null)
        throw new TypeError("Cannot convert undefined or null to object");
      for (var f = Object(h), v = 1; v < arguments.length; v++) {
        var S = arguments[v];
        if (S !== n && S !== null)
          for (var x in S)
            S.hasOwnProperty(x) && (f[x] = S[x]);
      }
      return f;
    } : d = Object.assign;
    var g = b(function(h, f, v) {
      for (var S = Object.keys(f), x = 0; x < S.length; )
        (!v || v && h[S[x]] === n) && (h[S[x]] = f[S[x]]), x++;
      return h;
    }, "extend", "Use `assign`."), A = b(function(h, f) {
      return g(h, f, !0);
    }, "merge", "Use `assign`.");
    function Y(c, h, f) {
      var v = h.prototype, S;
      S = c.prototype = Object.create(v), S.constructor = c, S._super = v, f && d(S, f);
    }
    function E(c, h) {
      return function() {
        return c.apply(h, arguments);
      };
    }
    function P(c, h) {
      return typeof c == u ? c.apply(h && h[0] || n, h) : c;
    }
    function L(c, h) {
      return c === n ? h : c;
    }
    function F(c, h, f) {
      y(J(h), function(v) {
        c.addEventListener(v, f, !1);
      });
    }
    function M(c, h, f) {
      y(J(h), function(v) {
        c.removeEventListener(v, f, !1);
      });
    }
    function R(c, h) {
      for (; c; ) {
        if (c == h)
          return !0;
        c = c.parentNode;
      }
      return !1;
    }
    function O(c, h) {
      return c.indexOf(h) > -1;
    }
    function J(c) {
      return c.trim().split(/\s+/g);
    }
    function H(c, h, f) {
      if (c.indexOf && !f)
        return c.indexOf(h);
      for (var v = 0; v < c.length; ) {
        if (f && c[v][f] == h || !f && c[v] === h)
          return v;
        v++;
      }
      return -1;
    }
    function k(c) {
      return Array.prototype.slice.call(c, 0);
    }
    function _(c, h, f) {
      for (var v = [], S = [], x = 0; x < c.length; ) {
        var z = h ? c[x][h] : c[x];
        H(S, z) < 0 && v.push(c[x]), S[x] = z, x++;
      }
      return f && (h ? v = v.sort(function(se, ae) {
        return se[h] > ae[h];
      }) : v = v.sort()), v;
    }
    function T(c, h) {
      for (var f, v, S = h[0].toUpperCase() + h.slice(1), x = 0; x < r.length; ) {
        if (f = r[x], v = f ? f + S : h, v in c)
          return v;
        x++;
      }
      return n;
    }
    var w = 1;
    function B() {
      return w++;
    }
    function j(c) {
      var h = c.ownerDocument || c;
      return h.defaultView || h.parentWindow || e;
    }
    var V = /mobile|tablet|ip(ad|hone|od)|android/i, Q = "ontouchstart" in e, ee = T(e, "PointerEvent") !== n, Ee = Q && V.test(navigator.userAgent), re = "touch", G = "pen", ie = "mouse", ye = "kinect", Ge = 25, D = 1, fe = 2, K = 4, oe = 8, ot = 1, He = 2, qe = 4, ft = 8, pt = 16, Me = He | qe, We = ft | pt, Yi = Me | We, Mi = ["x", "y"], Et = ["clientX", "clientY"];
    function be(c, h) {
      var f = this;
      this.manager = c, this.callback = h, this.element = c.element, this.target = c.options.inputTarget, this.domHandler = function(v) {
        P(c.options.enable, [c]) && f.handler(v);
      }, this.init();
    }
    be.prototype = {
      handler: function() {
      },
      init: function() {
        this.evEl && F(this.element, this.evEl, this.domHandler), this.evTarget && F(this.target, this.evTarget, this.domHandler), this.evWin && F(j(this.element), this.evWin, this.domHandler);
      },
      destroy: function() {
        this.evEl && M(this.element, this.evEl, this.domHandler), this.evTarget && M(this.target, this.evTarget, this.domHandler), this.evWin && M(j(this.element), this.evWin, this.domHandler);
      }
    };
    function os(c) {
      var h, f = c.options.inputClass;
      return f ? h = f : ee ? h = zt : Ee ? h = Mt : Q ? h = jt : h = Yt, new h(c, ls);
    }
    function ls(c, h, f) {
      var v = f.pointers.length, S = f.changedPointers.length, x = h & D && v - S === 0, z = h & (K | oe) && v - S === 0;
      f.isFirst = !!x, f.isFinal = !!z, x && (c.session = {}), f.eventType = h, as(c, f), c.emit("hammer.input", f), c.recognize(f), c.session.prevInput = f;
    }
    function as(c, h) {
      var f = c.session, v = h.pointers, S = v.length;
      f.firstInput || (f.firstInput = ki(h)), S > 1 && !f.firstMultiple ? f.firstMultiple = ki(h) : S === 1 && (f.firstMultiple = !1);
      var x = f.firstInput, z = f.firstMultiple, ne = z ? z.center : x.center, se = h.center = Ji(v);
      h.timeStamp = p(), h.deltaTime = h.timeStamp - x.timeStamp, h.angle = Xt(ne, se), h.distance = St(ne, se), cs(f, h), h.offsetDirection = Ci(h.deltaX, h.deltaY);
      var ae = xi(h.deltaTime, h.deltaX, h.deltaY);
      h.overallVelocityX = ae.x, h.overallVelocityY = ae.y, h.overallVelocity = l(ae.x) > l(ae.y) ? ae.x : ae.y, h.scale = z ? fs(z.pointers, v) : 1, h.rotation = z ? hs(z.pointers, v) : 0, h.maxPointers = f.prevInput ? h.pointers.length > f.prevInput.maxPointers ? h.pointers.length : f.prevInput.maxPointers : h.pointers.length, us(f, h);
      var Je = c.element;
      R(h.srcEvent.target, Je) && (Je = h.srcEvent.target), h.target = Je;
    }
    function cs(c, h) {
      var f = h.center, v = c.offsetDelta || {}, S = c.prevDelta || {}, x = c.prevInput || {};
      (h.eventType === D || x.eventType === K) && (S = c.prevDelta = {
        x: x.deltaX || 0,
        y: x.deltaY || 0
      }, v = c.offsetDelta = {
        x: f.x,
        y: f.y
      }), h.deltaX = S.x + (f.x - v.x), h.deltaY = S.y + (f.y - v.y);
    }
    function us(c, h) {
      var f = c.lastInterval || h, v = h.timeStamp - f.timeStamp, S, x, z, ne;
      if (h.eventType != oe && (v > Ge || f.velocity === n)) {
        var se = h.deltaX - f.deltaX, ae = h.deltaY - f.deltaY, Je = xi(v, se, ae);
        x = Je.x, z = Je.y, S = l(Je.x) > l(Je.y) ? Je.x : Je.y, ne = Ci(se, ae), c.lastInterval = h;
      } else
        S = f.velocity, x = f.velocityX, z = f.velocityY, ne = f.direction;
      h.velocity = S, h.velocityX = x, h.velocityY = z, h.direction = ne;
    }
    function ki(c) {
      for (var h = [], f = 0; f < c.pointers.length; )
        h[f] = {
          clientX: a(c.pointers[f].clientX),
          clientY: a(c.pointers[f].clientY)
        }, f++;
      return {
        timeStamp: p(),
        pointers: h,
        center: Ji(h),
        deltaX: c.deltaX,
        deltaY: c.deltaY
      };
    }
    function Ji(c) {
      var h = c.length;
      if (h === 1)
        return {
          x: a(c[0].clientX),
          y: a(c[0].clientY)
        };
      for (var f = 0, v = 0, S = 0; S < h; )
        f += c[S].clientX, v += c[S].clientY, S++;
      return {
        x: a(f / h),
        y: a(v / h)
      };
    }
    function xi(c, h, f) {
      return {
        x: h / c || 0,
        y: f / c || 0
      };
    }
    function Ci(c, h) {
      return c === h ? ot : l(c) >= l(h) ? c < 0 ? He : qe : h < 0 ? ft : pt;
    }
    function St(c, h, f) {
      f || (f = Mi);
      var v = h[f[0]] - c[f[0]], S = h[f[1]] - c[f[1]];
      return Math.sqrt(v * v + S * S);
    }
    function Xt(c, h, f) {
      f || (f = Mi);
      var v = h[f[0]] - c[f[0]], S = h[f[1]] - c[f[1]];
      return Math.atan2(S, v) * 180 / Math.PI;
    }
    function hs(c, h) {
      return Xt(h[1], h[0], Et) + Xt(c[1], c[0], Et);
    }
    function fs(c, h) {
      return St(h[0], h[1], Et) / St(c[0], c[1], Et);
    }
    var ps = {
      mousedown: D,
      mousemove: fe,
      mouseup: K
    }, ds = "mousedown", gs = "mousemove mouseup";
    function Yt() {
      this.evEl = ds, this.evWin = gs, this.pressed = !1, be.apply(this, arguments);
    }
    Y(Yt, be, {
      handler: function(h) {
        var f = ps[h.type];
        f & D && h.button === 0 && (this.pressed = !0), f & fe && h.which !== 1 && (f = K), this.pressed && (f & K && (this.pressed = !1), this.callback(this.manager, f, {
          pointers: [h],
          changedPointers: [h],
          pointerType: ie,
          srcEvent: h
        }));
      }
    });
    var ms = {
      pointerdown: D,
      pointermove: fe,
      pointerup: K,
      pointercancel: oe,
      pointerout: oe
    }, vs = {
      2: re,
      3: G,
      4: ie,
      5: ye
    }, Oi = "pointerdown", Pi = "pointermove pointerup pointercancel";
    e.MSPointerEvent && !e.PointerEvent && (Oi = "MSPointerDown", Pi = "MSPointerMove MSPointerUp MSPointerCancel");
    function zt() {
      this.evEl = Oi, this.evWin = Pi, be.apply(this, arguments), this.store = this.manager.session.pointerEvents = [];
    }
    Y(zt, be, {
      handler: function(h) {
        var f = this.store, v = !1, S = h.type.toLowerCase().replace("ms", ""), x = ms[S], z = vs[h.pointerType] || h.pointerType, ne = z == re, se = H(f, h.pointerId, "pointerId");
        x & D && (h.button === 0 || ne) ? se < 0 && (f.push(h), se = f.length - 1) : x & (K | oe) && (v = !0), !(se < 0) && (f[se] = h, this.callback(this.manager, x, {
          pointers: f,
          changedPointers: [h],
          pointerType: z,
          srcEvent: h
        }), v && f.splice(se, 1));
      }
    });
    var Is = {
      touchstart: D,
      touchmove: fe,
      touchend: K,
      touchcancel: oe
    }, ys = "touchstart", bs = "touchstart touchmove touchend touchcancel";
    function Ni() {
      this.evTarget = ys, this.evWin = bs, this.started = !1, be.apply(this, arguments);
    }
    Y(Ni, be, {
      handler: function(h) {
        var f = Is[h.type];
        if (f === D && (this.started = !0), !!this.started) {
          var v = As.call(this, h, f);
          f & (K | oe) && v[0].length - v[1].length === 0 && (this.started = !1), this.callback(this.manager, f, {
            pointers: v[0],
            changedPointers: v[1],
            pointerType: re,
            srcEvent: h
          });
        }
      }
    });
    function As(c, h) {
      var f = k(c.touches), v = k(c.changedTouches);
      return h & (K | oe) && (f = _(f.concat(v), "identifier", !0)), [f, v];
    }
    var _s = {
      touchstart: D,
      touchmove: fe,
      touchend: K,
      touchcancel: oe
    }, Ts = "touchstart touchmove touchend touchcancel";
    function Mt() {
      this.evTarget = Ts, this.targetIds = {}, be.apply(this, arguments);
    }
    Y(Mt, be, {
      handler: function(h) {
        var f = _s[h.type], v = ws.call(this, h, f);
        !v || this.callback(this.manager, f, {
          pointers: v[0],
          changedPointers: v[1],
          pointerType: re,
          srcEvent: h
        });
      }
    });
    function ws(c, h) {
      var f = k(c.touches), v = this.targetIds;
      if (h & (D | fe) && f.length === 1)
        return v[f[0].identifier] = !0, [f, f];
      var S, x, z = k(c.changedTouches), ne = [], se = this.target;
      if (x = f.filter(function(ae) {
        return R(ae.target, se);
      }), h === D)
        for (S = 0; S < x.length; )
          v[x[S].identifier] = !0, S++;
      for (S = 0; S < z.length; )
        v[z[S].identifier] && ne.push(z[S]), h & (K | oe) && delete v[z[S].identifier], S++;
      if (!!ne.length)
        return [
          _(x.concat(ne), "identifier", !0),
          ne
        ];
    }
    var Es = 2500, Ri = 25;
    function jt() {
      be.apply(this, arguments);
      var c = E(this.handler, this);
      this.touch = new Mt(this.manager, c), this.mouse = new Yt(this.manager, c), this.primaryTouch = null, this.lastTouches = [];
    }
    Y(jt, be, {
      handler: function(h, f, v) {
        var S = v.pointerType == re, x = v.pointerType == ie;
        if (!(x && v.sourceCapabilities && v.sourceCapabilities.firesTouchEvents)) {
          if (S)
            Ss.call(this, f, v);
          else if (x && Ys.call(this, v))
            return;
          this.callback(h, f, v);
        }
      },
      destroy: function() {
        this.touch.destroy(), this.mouse.destroy();
      }
    });
    function Ss(c, h) {
      c & D ? (this.primaryTouch = h.changedPointers[0].identifier, Di.call(this, h)) : c & (K | oe) && Di.call(this, h);
    }
    function Di(c) {
      var h = c.changedPointers[0];
      if (h.identifier === this.primaryTouch) {
        var f = { x: h.clientX, y: h.clientY };
        this.lastTouches.push(f);
        var v = this.lastTouches, S = function() {
          var x = v.indexOf(f);
          x > -1 && v.splice(x, 1);
        };
        setTimeout(S, Es);
      }
    }
    function Ys(c) {
      for (var h = c.srcEvent.clientX, f = c.srcEvent.clientY, v = 0; v < this.lastTouches.length; v++) {
        var S = this.lastTouches[v], x = Math.abs(h - S.x), z = Math.abs(f - S.y);
        if (x <= Ri && z <= Ri)
          return !0;
      }
      return !1;
    }
    var Bi = T(o.style, "touchAction"), Li = Bi !== n, Ui = "compute", Fi = "auto", qt = "manipulation", Ze = "none", dt = "pan-x", gt = "pan-y", kt = ks();
    function Wt(c, h) {
      this.manager = c, this.set(h);
    }
    Wt.prototype = {
      set: function(c) {
        c == Ui && (c = this.compute()), Li && this.manager.element.style && kt[c] && (this.manager.element.style[Bi] = c), this.actions = c.toLowerCase().trim();
      },
      update: function() {
        this.set(this.manager.options.touchAction);
      },
      compute: function() {
        var c = [];
        return y(this.manager.recognizers, function(h) {
          P(h.options.enable, [h]) && (c = c.concat(h.getTouchAction()));
        }), Ms(c.join(" "));
      },
      preventDefaults: function(c) {
        var h = c.srcEvent, f = c.offsetDirection;
        if (this.manager.session.prevented) {
          h.preventDefault();
          return;
        }
        var v = this.actions, S = O(v, Ze) && !kt[Ze], x = O(v, gt) && !kt[gt], z = O(v, dt) && !kt[dt];
        if (S) {
          var ne = c.pointers.length === 1, se = c.distance < 2, ae = c.deltaTime < 250;
          if (ne && se && ae)
            return;
        }
        if (!(z && x) && (S || x && f & Me || z && f & We))
          return this.preventSrc(h);
      },
      preventSrc: function(c) {
        this.manager.session.prevented = !0, c.preventDefault();
      }
    };
    function Ms(c) {
      if (O(c, Ze))
        return Ze;
      var h = O(c, dt), f = O(c, gt);
      return h && f ? Ze : h || f ? h ? dt : gt : O(c, qt) ? qt : Fi;
    }
    function ks() {
      if (!Li)
        return !1;
      var c = {}, h = e.CSS && e.CSS.supports;
      return ["auto", "manipulation", "pan-y", "pan-x", "pan-x pan-y", "none"].forEach(function(f) {
        c[f] = h ? e.CSS.supports("touch-action", f) : !0;
      }), c;
    }
    var Jt = 1, Ae = 2, lt = 4, Ve = 8, Pe = Ve, mt = 16, ke = 32;
    function Ne(c) {
      this.options = d({}, this.defaults, c || {}), this.id = B(), this.manager = null, this.options.enable = L(this.options.enable, !0), this.state = Jt, this.simultaneous = {}, this.requireFail = [];
    }
    Ne.prototype = {
      defaults: {},
      set: function(c) {
        return d(this.options, c), this.manager && this.manager.touchAction.update(), this;
      },
      recognizeWith: function(c) {
        if (I(c, "recognizeWith", this))
          return this;
        var h = this.simultaneous;
        return c = xt(c, this), h[c.id] || (h[c.id] = c, c.recognizeWith(this)), this;
      },
      dropRecognizeWith: function(c) {
        return I(c, "dropRecognizeWith", this) ? this : (c = xt(c, this), delete this.simultaneous[c.id], this);
      },
      requireFailure: function(c) {
        if (I(c, "requireFailure", this))
          return this;
        var h = this.requireFail;
        return c = xt(c, this), H(h, c) === -1 && (h.push(c), c.requireFailure(this)), this;
      },
      dropRequireFailure: function(c) {
        if (I(c, "dropRequireFailure", this))
          return this;
        c = xt(c, this);
        var h = H(this.requireFail, c);
        return h > -1 && this.requireFail.splice(h, 1), this;
      },
      hasRequireFailures: function() {
        return this.requireFail.length > 0;
      },
      canRecognizeWith: function(c) {
        return !!this.simultaneous[c.id];
      },
      emit: function(c) {
        var h = this, f = this.state;
        function v(S) {
          h.manager.emit(S, c);
        }
        f < Ve && v(h.options.event + Gi(f)), v(h.options.event), c.additionalEvent && v(c.additionalEvent), f >= Ve && v(h.options.event + Gi(f));
      },
      tryEmit: function(c) {
        if (this.canEmit())
          return this.emit(c);
        this.state = ke;
      },
      canEmit: function() {
        for (var c = 0; c < this.requireFail.length; ) {
          if (!(this.requireFail[c].state & (ke | Jt)))
            return !1;
          c++;
        }
        return !0;
      },
      recognize: function(c) {
        var h = d({}, c);
        if (!P(this.options.enable, [this, h])) {
          this.reset(), this.state = ke;
          return;
        }
        this.state & (Pe | mt | ke) && (this.state = Jt), this.state = this.process(h), this.state & (Ae | lt | Ve | mt) && this.tryEmit(h);
      },
      process: function(c) {
      },
      getTouchAction: function() {
      },
      reset: function() {
      }
    };
    function Gi(c) {
      return c & mt ? "cancel" : c & Ve ? "end" : c & lt ? "move" : c & Ae ? "start" : "";
    }
    function Hi(c) {
      return c == pt ? "down" : c == ft ? "up" : c == He ? "left" : c == qe ? "right" : "";
    }
    function xt(c, h) {
      var f = h.manager;
      return f ? f.get(c) : c;
    }
    function Se() {
      Ne.apply(this, arguments);
    }
    Y(Se, Ne, {
      defaults: {
        pointers: 1
      },
      attrTest: function(c) {
        var h = this.options.pointers;
        return h === 0 || c.pointers.length === h;
      },
      process: function(c) {
        var h = this.state, f = c.eventType, v = h & (Ae | lt), S = this.attrTest(c);
        return v && (f & oe || !S) ? h | mt : v || S ? f & K ? h | Ve : h & Ae ? h | lt : Ae : ke;
      }
    });
    function Ct() {
      Se.apply(this, arguments), this.pX = null, this.pY = null;
    }
    Y(Ct, Se, {
      defaults: {
        event: "pan",
        threshold: 10,
        pointers: 1,
        direction: Yi
      },
      getTouchAction: function() {
        var c = this.options.direction, h = [];
        return c & Me && h.push(gt), c & We && h.push(dt), h;
      },
      directionTest: function(c) {
        var h = this.options, f = !0, v = c.distance, S = c.direction, x = c.deltaX, z = c.deltaY;
        return S & h.direction || (h.direction & Me ? (S = x === 0 ? ot : x < 0 ? He : qe, f = x != this.pX, v = Math.abs(c.deltaX)) : (S = z === 0 ? ot : z < 0 ? ft : pt, f = z != this.pY, v = Math.abs(c.deltaY))), c.direction = S, f && v > h.threshold && S & h.direction;
      },
      attrTest: function(c) {
        return Se.prototype.attrTest.call(this, c) && (this.state & Ae || !(this.state & Ae) && this.directionTest(c));
      },
      emit: function(c) {
        this.pX = c.deltaX, this.pY = c.deltaY;
        var h = Hi(c.direction);
        h && (c.additionalEvent = this.options.event + h), this._super.emit.call(this, c);
      }
    });
    function Zt() {
      Se.apply(this, arguments);
    }
    Y(Zt, Se, {
      defaults: {
        event: "pinch",
        threshold: 0,
        pointers: 2
      },
      getTouchAction: function() {
        return [Ze];
      },
      attrTest: function(c) {
        return this._super.attrTest.call(this, c) && (Math.abs(c.scale - 1) > this.options.threshold || this.state & Ae);
      },
      emit: function(c) {
        if (c.scale !== 1) {
          var h = c.scale < 1 ? "in" : "out";
          c.additionalEvent = this.options.event + h;
        }
        this._super.emit.call(this, c);
      }
    });
    function Qt() {
      Ne.apply(this, arguments), this._timer = null, this._input = null;
    }
    Y(Qt, Ne, {
      defaults: {
        event: "press",
        pointers: 1,
        time: 251,
        threshold: 9
      },
      getTouchAction: function() {
        return [Fi];
      },
      process: function(c) {
        var h = this.options, f = c.pointers.length === h.pointers, v = c.distance < h.threshold, S = c.deltaTime > h.time;
        if (this._input = c, !v || !f || c.eventType & (K | oe) && !S)
          this.reset();
        else if (c.eventType & D)
          this.reset(), this._timer = m(function() {
            this.state = Pe, this.tryEmit();
          }, h.time, this);
        else if (c.eventType & K)
          return Pe;
        return ke;
      },
      reset: function() {
        clearTimeout(this._timer);
      },
      emit: function(c) {
        this.state === Pe && (c && c.eventType & K ? this.manager.emit(this.options.event + "up", c) : (this._input.timeStamp = p(), this.manager.emit(this.options.event, this._input)));
      }
    });
    function Kt() {
      Se.apply(this, arguments);
    }
    Y(Kt, Se, {
      defaults: {
        event: "rotate",
        threshold: 0,
        pointers: 2
      },
      getTouchAction: function() {
        return [Ze];
      },
      attrTest: function(c) {
        return this._super.attrTest.call(this, c) && (Math.abs(c.rotation) > this.options.threshold || this.state & Ae);
      }
    });
    function $t() {
      Se.apply(this, arguments);
    }
    Y($t, Se, {
      defaults: {
        event: "swipe",
        threshold: 10,
        velocity: 0.3,
        direction: Me | We,
        pointers: 1
      },
      getTouchAction: function() {
        return Ct.prototype.getTouchAction.call(this);
      },
      attrTest: function(c) {
        var h = this.options.direction, f;
        return h & (Me | We) ? f = c.overallVelocity : h & Me ? f = c.overallVelocityX : h & We && (f = c.overallVelocityY), this._super.attrTest.call(this, c) && h & c.offsetDirection && c.distance > this.options.threshold && c.maxPointers == this.options.pointers && l(f) > this.options.velocity && c.eventType & K;
      },
      emit: function(c) {
        var h = Hi(c.offsetDirection);
        h && this.manager.emit(this.options.event + h, c), this.manager.emit(this.options.event, c);
      }
    });
    function Ot() {
      Ne.apply(this, arguments), this.pTime = !1, this.pCenter = !1, this._timer = null, this._input = null, this.count = 0;
    }
    Y(Ot, Ne, {
      defaults: {
        event: "tap",
        pointers: 1,
        taps: 1,
        interval: 300,
        time: 250,
        threshold: 9,
        posThreshold: 10
      },
      getTouchAction: function() {
        return [qt];
      },
      process: function(c) {
        var h = this.options, f = c.pointers.length === h.pointers, v = c.distance < h.threshold, S = c.deltaTime < h.time;
        if (this.reset(), c.eventType & D && this.count === 0)
          return this.failTimeout();
        if (v && S && f) {
          if (c.eventType != K)
            return this.failTimeout();
          var x = this.pTime ? c.timeStamp - this.pTime < h.interval : !0, z = !this.pCenter || St(this.pCenter, c.center) < h.posThreshold;
          this.pTime = c.timeStamp, this.pCenter = c.center, !z || !x ? this.count = 1 : this.count += 1, this._input = c;
          var ne = this.count % h.taps;
          if (ne === 0)
            return this.hasRequireFailures() ? (this._timer = m(function() {
              this.state = Pe, this.tryEmit();
            }, h.interval, this), Ae) : Pe;
        }
        return ke;
      },
      failTimeout: function() {
        return this._timer = m(function() {
          this.state = ke;
        }, this.options.interval, this), ke;
      },
      reset: function() {
        clearTimeout(this._timer);
      },
      emit: function() {
        this.state == Pe && (this._input.tapCount = this.count, this.manager.emit(this.options.event, this._input));
      }
    });
    function Re(c, h) {
      return h = h || {}, h.recognizers = L(h.recognizers, Re.defaults.preset), new ei(c, h);
    }
    Re.VERSION = "2.0.7", Re.defaults = {
      domEvents: !1,
      touchAction: Ui,
      enable: !0,
      inputTarget: null,
      inputClass: null,
      preset: [
        [Kt, { enable: !1 }],
        [Zt, { enable: !1 }, ["rotate"]],
        [$t, { direction: Me }],
        [Ct, { direction: Me }, ["swipe"]],
        [Ot],
        [Ot, { event: "doubletap", taps: 2 }, ["tap"]],
        [Qt]
      ],
      cssProps: {
        userSelect: "none",
        touchSelect: "none",
        touchCallout: "none",
        contentZooming: "none",
        userDrag: "none",
        tapHighlightColor: "rgba(0,0,0,0)"
      }
    };
    var Js = 1, Vi = 2;
    function ei(c, h) {
      this.options = d({}, Re.defaults, h || {}), this.options.inputTarget = this.options.inputTarget || c, this.handlers = {}, this.session = {}, this.recognizers = [], this.oldCssProps = {}, this.element = c, this.input = os(this), this.touchAction = new Wt(this, this.options.touchAction), Xi(this, !0), y(this.options.recognizers, function(f) {
        var v = this.add(new f[0](f[1]));
        f[2] && v.recognizeWith(f[2]), f[3] && v.requireFailure(f[3]);
      }, this);
    }
    ei.prototype = {
      set: function(c) {
        return d(this.options, c), c.touchAction && this.touchAction.update(), c.inputTarget && (this.input.destroy(), this.input.target = c.inputTarget, this.input.init()), this;
      },
      stop: function(c) {
        this.session.stopped = c ? Vi : Js;
      },
      recognize: function(c) {
        var h = this.session;
        if (!h.stopped) {
          this.touchAction.preventDefaults(c);
          var f, v = this.recognizers, S = h.curRecognizer;
          (!S || S && S.state & Pe) && (S = h.curRecognizer = null);
          for (var x = 0; x < v.length; )
            f = v[x], h.stopped !== Vi && (!S || f == S || f.canRecognizeWith(S)) ? f.recognize(c) : f.reset(), !S && f.state & (Ae | lt | Ve) && (S = h.curRecognizer = f), x++;
        }
      },
      get: function(c) {
        if (c instanceof Ne)
          return c;
        for (var h = this.recognizers, f = 0; f < h.length; f++)
          if (h[f].options.event == c)
            return h[f];
        return null;
      },
      add: function(c) {
        if (I(c, "add", this))
          return this;
        var h = this.get(c.options.event);
        return h && this.remove(h), this.recognizers.push(c), c.manager = this, this.touchAction.update(), c;
      },
      remove: function(c) {
        if (I(c, "remove", this))
          return this;
        if (c = this.get(c), c) {
          var h = this.recognizers, f = H(h, c);
          f !== -1 && (h.splice(f, 1), this.touchAction.update());
        }
        return this;
      },
      on: function(c, h) {
        if (c !== n && h !== n) {
          var f = this.handlers;
          return y(J(c), function(v) {
            f[v] = f[v] || [], f[v].push(h);
          }), this;
        }
      },
      off: function(c, h) {
        if (c !== n) {
          var f = this.handlers;
          return y(J(c), function(v) {
            h ? f[v] && f[v].splice(H(f[v], h), 1) : delete f[v];
          }), this;
        }
      },
      emit: function(c, h) {
        this.options.domEvents && xs(c, h);
        var f = this.handlers[c] && this.handlers[c].slice();
        if (!(!f || !f.length)) {
          h.type = c, h.preventDefault = function() {
            h.srcEvent.preventDefault();
          };
          for (var v = 0; v < f.length; )
            f[v](h), v++;
        }
      },
      destroy: function() {
        this.element && Xi(this, !1), this.handlers = {}, this.session = {}, this.input.destroy(), this.element = null;
      }
    };
    function Xi(c, h) {
      var f = c.element;
      if (!!f.style) {
        var v;
        y(c.options.cssProps, function(S, x) {
          v = T(f.style, x), h ? (c.oldCssProps[v] = f.style[v], f.style[v] = S) : f.style[v] = c.oldCssProps[v] || "";
        }), h || (c.oldCssProps = {});
      }
    }
    function xs(c, h) {
      var f = i.createEvent("Event");
      f.initEvent(c, !0, !0), f.gesture = h, h.target.dispatchEvent(f);
    }
    d(Re, {
      INPUT_START: D,
      INPUT_MOVE: fe,
      INPUT_END: K,
      INPUT_CANCEL: oe,
      STATE_POSSIBLE: Jt,
      STATE_BEGAN: Ae,
      STATE_CHANGED: lt,
      STATE_ENDED: Ve,
      STATE_RECOGNIZED: Pe,
      STATE_CANCELLED: mt,
      STATE_FAILED: ke,
      DIRECTION_NONE: ot,
      DIRECTION_LEFT: He,
      DIRECTION_RIGHT: qe,
      DIRECTION_UP: ft,
      DIRECTION_DOWN: pt,
      DIRECTION_HORIZONTAL: Me,
      DIRECTION_VERTICAL: We,
      DIRECTION_ALL: Yi,
      Manager: ei,
      Input: be,
      TouchAction: Wt,
      TouchInput: Mt,
      MouseInput: Yt,
      PointerEventInput: zt,
      TouchMouseInput: jt,
      SingleTouchInput: Ni,
      Recognizer: Ne,
      AttrRecognizer: Se,
      Tap: Ot,
      Pan: Ct,
      Swipe: $t,
      Pinch: Zt,
      Rotate: Kt,
      Press: Qt,
      on: F,
      off: M,
      each: y,
      merge: A,
      extend: g,
      assign: d,
      inherit: Y,
      bindFn: E,
      prefixed: T
    });
    var Cs = typeof e != "undefined" ? e : typeof self != "undefined" ? self : {};
    Cs.Hammer = Re, typeof n == "function" && n.amd ? n(function() {
      return Re;
    }) : t.exports ? t.exports = Re : e[s] = Re;
  })(window, document, "Hammer");
})(Kn);
const De = Kn.exports;
var $n = { exports: {} };
(function(t, e) {
  (function(i, s) {
    var n = function(u) {
      return new n.Instance(u);
    };
    n.SUPPORT = "wheel", n.ADD_EVENT = "addEventListener", n.REMOVE_EVENT = "removeEventListener", n.PREFIX = "", n.READY = !1, n.Instance = function(u) {
      return n.READY || (n.normalise.browser(), n.READY = !0), this.element = u, this.handlers = [], this;
    }, n.Instance.prototype = {
      wheel: function(a, l) {
        return n.event.add(this, n.SUPPORT, a, l), n.SUPPORT === "DOMMouseScroll" && n.event.add(this, "MozMousePixelScroll", a, l), this;
      },
      unwheel: function(a, l) {
        return a === void 0 && (a = this.handlers.slice(-1)[0]) && (a = a.original), n.event.remove(this, n.SUPPORT, a, l), n.SUPPORT === "DOMMouseScroll" && n.event.remove(this, "MozMousePixelScroll", a, l), this;
      }
    }, n.event = {
      add: function(a, l, p, m) {
        var I = p;
        p = function(y) {
          y || (y = i.event);
          var b = n.normalise.event(y), d = n.normalise.delta(y);
          return I(b, d[0], d[1], d[2]);
        }, a.element[n.ADD_EVENT](n.PREFIX + l, p, m || !1), a.handlers.push({
          original: I,
          normalised: p
        });
      },
      remove: function(a, l, p, m) {
        for (var I = p, y = {}, b, d = 0, g = a.handlers.length; d < g; ++d)
          y[a.handlers[d].original] = a.handlers[d];
        b = y[I], p = b.normalised, a.element[n.REMOVE_EVENT](n.PREFIX + l, p, m || !1);
        for (var A in a.handlers)
          if (a.handlers[A] == b) {
            a.handlers.splice(A, 1);
            break;
          }
      }
    };
    var r, o;
    n.normalise = {
      browser: function() {
        "onwheel" in s || s.documentMode >= 9 || (n.SUPPORT = s.onmousewheel !== void 0 ? "mousewheel" : "DOMMouseScroll"), i.addEventListener || (n.ADD_EVENT = "attachEvent", n.REMOVE_EVENT = "detachEvent", n.PREFIX = "on");
      },
      event: function(a) {
        var l = {
          originalEvent: a,
          target: a.target || a.srcElement,
          type: "wheel",
          deltaMode: a.type === "MozMousePixelScroll" ? 0 : 1,
          deltaX: 0,
          deltaZ: 0,
          preventDefault: function() {
            a.preventDefault ? a.preventDefault() : a.returnValue = !1;
          },
          stopPropagation: function() {
            a.stopPropagation ? a.stopPropagation() : a.cancelBubble = !1;
          }
        };
        return a.wheelDelta && (l.deltaY = -1 / 40 * a.wheelDelta), a.wheelDeltaX && (l.deltaX = -1 / 40 * a.wheelDeltaX), a.detail && (l.deltaY = a.detail), l;
      },
      delta: function(a) {
        var l = 0, p = 0, m = 0, I = 0, y = 0, b;
        return a.deltaY && (m = a.deltaY * -1, l = m), a.deltaX && (p = a.deltaX, l = p * -1), a.wheelDelta && (l = a.wheelDelta), a.wheelDeltaY && (m = a.wheelDeltaY), a.wheelDeltaX && (p = a.wheelDeltaX * -1), a.detail && (l = a.detail * -1), l === 0 ? [0, 0, 0] : (I = Math.abs(l), (!r || I < r) && (r = I), y = Math.max(Math.abs(m), Math.abs(p)), (!o || y < o) && (o = y), b = l > 0 ? "floor" : "ceil", l = Math[b](l / r), p = Math[b](p / o), m = Math[b](m / o), [l, p, m]);
      }
    }, typeof i.define == "function" && i.define.amd ? i.define("hamster", [], function() {
      return n;
    }) : t.exports = n;
  })(window, window.document);
})($n);
const ho = $n.exports;
class fo {
  setup(e) {
    this.MIN_ZOOM = e.props.config.MIN_ZOOM, this.MAX_ZOOM = e.props.config.MAX_ZOOM, N.isMobile && (this.MIN_ZOOM *= 0.5), this.canvas = e.canvas, this.ctx = e.ctx, this.props = e.props, this.layout = e.layout, this.rrId = e.rrUpdId, this.gridId = e.id, this.cursor = {}, this.oldMeta = {}, this.range = this.props.range, this.interval = this.props.interval, this.offsetX = 0, this.offsetY = 0, this.deltas = 0, this.wmode = this.props.config.SCROLL_WHEEL, this.hub = Ue.instance(this.props.id), this.meta = Fe.instance(this.props.id), this.events = he.instance(this.props.id), this.listeners(), this.mouseEvents("addEventListener");
  }
  mouseEvents(e) {
    ["mousemove", "mouseout", "mouseup", "mousedown"].forEach((i) => {
      e === "addEventListener" && (this["_" + i] = this[i].bind(this)), this.canvas[e](i, this["_" + i]);
    });
  }
  listeners() {
    this.hm = ho(this.canvas), this.hm.wheel((n, r) => this.mousezoom(-r * 50, n));
    let e = this.mc = new De.Manager(this.canvas), i = N.isMobile ? 10 : 0;
    e.add(new De.Pan({ threshold: i })), e.add(new De.Tap()), e.add(new De.Pinch({ threshold: 0 })), e.get("pinch").set({ enable: !0 }), N.isMobile && e.add(new De.Press()), e.on("panstart", (n) => {
      if (this.cursor.scroll_lock)
        return;
      if (this.cursor.mode === "aim")
        return this.emitCursorCoord(n);
      let r = this.layout.scaleIndex, o = this.meta.getYtransform(this.gridId, r);
      this.drug = {
        x: n.center.x + this.offsetX,
        y: n.center.y + this.offsetY,
        r: this.range.slice(),
        t: this.range[1] - this.range[0],
        o: o && o.offset || 0,
        y_r: o && o.range ? o.range.slice() : void 0,
        B: this.layout.B,
        t0: N.now()
      }, this.events.emit("cursor-locked", !0), this.events.emit("cursor-changed", {
        gridId: this.gridId,
        x: n.center.x + this.offsetX,
        y: n.center.y + this.offsetY
      });
    }), e.on("panmove", (n) => {
      N.isMobile && (this.calcOffset(), this.propagate("mousemove", this.touch2mouse(n))), this.drug ? this.mousedrag(
        this.drug.x + n.deltaX,
        this.drug.y + n.deltaY
      ) : this.cursor.mode === "aim" && this.emitCursorCoord(n);
    }), e.on("panend", (n) => {
      N.isMobile && this.drug && this.panFade(n), this.drug = null, this.events.emit("cursor-locked", !1);
    }), e.on("tap", (n) => {
      !N.isMobile || (this.simMousedown(n), this.fade && this.fade.stop(), this.events.emit("cursor-changed", {}), this.events.emit("cursor-changed", {
        mode: "explore"
      }), this.events.emitSpec(this.rrId, "update-rr"));
    }), e.on("pinchstart", () => {
      this.drug = null, this.pinch = {
        t: this.range[1] - this.range[0],
        r: this.range.slice()
      };
    }), e.on("pinchend", () => {
      this.pinch = null;
    }), e.on("pinch", (n) => {
      this.pinch && this.pinchZoom(n.scale);
    }), e.on("press", (n) => {
      !N.isMobile || (this.fade && this.fade.stop(), this.calcOffset(), this.emitCursorCoord(n, { mode: "aim" }), setTimeout(() => this.events.emitSpec(this.rrId, "update-rr")), this.simMousedown(n));
    });
    let s = this.canvas.addEventListener;
    s("gesturestart", this.gesturestart), s("gesturechange", this.gesturechange), s("gestureend", this.gestureend);
  }
  gesturestart(e) {
    e.preventDefault();
  }
  gesturechange(e) {
    e.preventDefault();
  }
  gestureend(e) {
    e.preventDefault();
  }
  mousemove(e) {
    N.isMobile || (this.events.emit("cursor-changed", {
      visible: !0,
      gridId: this.gridId,
      x: e.layerX,
      y: e.layerY
    }), this.calcOffset(), this.propagate("mousemove", e));
  }
  mouseout(e) {
    N.isMobile || (this.events.emit("cursor-changed", { visible: !1 }), this.propagate("mouseout", e));
  }
  mouseup(e) {
    this.drug = null, this.events.emit("cursor-locked", !1), this.propagate("mouseup", e);
  }
  mousedown(e) {
    N.isMobile || (this.events.emit("cursor-locked", !0), this.propagate("mousedown", e), !e.defaultPrevented && this.events.emit("grid-mousedown", [this.gridId, e]));
  }
  simMousedown(e) {
    e.srcEvent.defaultPrevented || (this.events.emit("grid-mousedown", [this.gridId, e]), this.propagate("mousemove", this.touch2mouse(e)), this.events.emitSpec(this.rrId, "update-rr"), this.propagate("mousedown", this.touch2mouse(e)), setTimeout(() => {
      this.propagate("click", this.touch2mouse(e));
    }));
  }
  touch2mouse(e) {
    return this.calcOffset(), {
      original: e.srcEvent,
      layerX: e.center.x + this.offsetX,
      layerY: e.center.y + this.offsetY,
      preventDefault: function() {
        this.original.preventDefault();
      }
    };
  }
  click(e) {
    this.propagate("click", e);
  }
  emitCursorCoord(e, i = {}) {
    this.events.emit("cursor-changed", Object.assign({
      gridId: this.gridId,
      x: e.center.x + this.offsetX,
      y: e.center.y + this.offsetY
    }, i));
  }
  panFade(e) {
    let i = N.now() - this.drug.t0, n = 42 * (this.range[1] - this.drug.r[1]) / i, r = Math.abs(n * 0.01);
    i > 500 || (this.fade && this.fade.stop(), this.fade = new uo((o) => {
      n *= 0.85, Math.abs(n) < r && o.stop(), this.range[0] += n, this.range[1] += n, this.changeRange();
    }));
  }
  calcOffset() {
    let e = this.canvas.getBoundingClientRect();
    this.offsetX = -e.x, this.offsetY = -e.y;
  }
  mousezoom(e, i) {
    if (this.wmode !== "pass") {
      if (this.wmode === "click" && !this.oldMeta.activated)
        return;
      i.originalEvent.preventDefault(), i.preventDefault();
    }
    i.deltaX = i.deltaX || N.getDeltaX(i), i.deltaY = i.deltaY || N.getDeltaY(i), Math.abs(i.deltaX) > 0 && (this.trackpad = !0, Math.abs(i.deltaX) >= Math.abs(i.deltaY) && (e *= 0.1), this.trackpadScroll(i)), this.trackpad && (e *= 0.032), e = N.smartWheel(e);
    let s = this.hub.mainOv.dataSubset;
    if (e < 0 && s.length <= this.MIN_ZOOM || e > 0 && s.length > this.MAX_ZOOM)
      return;
    let n = this.interval / 1e3, r = e * n * s.length, o = this.props.config.ZOOM_MODE === "tl";
    if (i.originalEvent.ctrlKey || o) {
      let a = i.originalEvent.offsetX / (this.canvas.width - 1) * r, l = r - a;
      this.range[0] -= a, this.range[1] += l;
    } else
      this.range[0] -= r;
    if (o) {
      let a = i.originalEvent.offsetY / (this.canvas.height - 1) * 2, l = 2 - a, p = r / (this.range[1] - this.range[0]);
      this.events.emit("rezoom-range", {
        gridId: this.gridId,
        z: p,
        diff1: a,
        diff2: l
      });
    }
    this.changeRange();
  }
  mousedrag(e, i) {
    let s = this.drug.t * (this.drug.x - e) / this.layout.width, n = this.layout.$hi - this.layout.$lo;
    n *= (this.drug.y - i) / this.layout.height;
    let r = this.drug.o + n, o = this.layout.settings.logScale;
    if (o && this.drug.y_r) {
      let p = this.drug.y - i;
      var u = this.drug.y_r.slice();
      u[0] = $.exp((0 - this.drug.B + p) / this.layout.A), u[1] = $.exp(
        (this.layout.height - this.drug.B + p) / this.layout.A
      );
    }
    let a = this.layout.scaleIndex, l = this.meta.getYtransform(this.gridId, a);
    this.drug.y_r && l && !l.auto && this.events.emit("sidebar-transform", {
      gridId: this.gridId,
      scaleId: a,
      range: o ? u || this.drug.y_r : [
        this.drug.y_r[0] - r,
        this.drug.y_r[1] - r
      ]
    }), this.range[0] = this.drug.r[0] + s, this.range[1] = this.drug.r[1] + s, this.changeRange();
  }
  pinchZoom(e) {
    let i = this.hub.mainOv.dataSubset;
    if (e > 1 && i.length <= this.MIN_ZOOM || e < 1 && i.length > this.MAX_ZOOM)
      return;
    let s = this.pinch.t, n = s * 1 / e;
    this.range[0] = this.pinch.r[0] - (n - s) * 0.5, this.range[1] = this.pinch.r[1] + (n - s) * 0.5, this.changeRange();
  }
  trackpadScroll(e) {
    let i = this.range[1] - this.range[0];
    this.range[0] += e.deltaX * i * 0.011, this.range[1] += e.deltaX * i * 0.011, this.changeRange();
  }
  changeRange() {
    let e = this.hub.mainOv.dataSubset;
    if (!this.range.length || e.length < 2)
      return;
    let i = e.length - 1, s = this.range;
    s[0] = N.clamp(
      s[0],
      -1 / 0,
      e[i][0] - this.interval * 5.5
    ), s[1] = N.clamp(
      s[1],
      e[0][0] + this.interval * 5.5,
      1 / 0
    ), this.events.emit("range-changed", s);
  }
  propagate(e, i) {
  }
  destroy() {
    let e = this.canvas.removeEventListener;
    e("gesturestart", this.gesturestart), e("gesturechange", this.gesturechange), e("gestureend", this.gestureend), this.mc && this.mc.destroy(), this.hm && this.hm.unwheel(), this.mouseEvents("removeEventListener");
  }
}
class po extends Vt {
  constructor(e) {
    super(e, "__$Crosshair__"), this.id = e, this.zIndex = 1e6, this.ctxType = "Canvas", this.overlay = {
      draw: this.draw.bind(this),
      destroy: this.destroy.bind(this)
    }, this.env = {
      update: this.envEpdate.bind(this)
    };
  }
  draw(e) {
    if (!this.layout)
      return;
    const i = this.props.cursor;
    !i.visible || (e.save(), e.strokeStyle = this.props.colors.cross, e.beginPath(), e.setLineDash([5]), i.gridId === this.layout.id && (e.moveTo(0, i.y), e.lineTo(this.layout.width - 0.5, i.y)), e.moveTo(i.x, 0), e.lineTo(i.x, this.layout.height), e.stroke(), e.restore());
  }
  envEpdate(e, i, s) {
    this.ovSrc = e, this.layout = i, this.props = s;
  }
  onCursor(e) {
    this.props && (this.props.cursor = e);
  }
  destroy() {
  }
}
class go extends Vt {
  constructor(e) {
    super(e, "__$Grid__"), this.id = e, this.zIndex = -1e6, this.ctxType = "Canvas", this.overlay = {
      draw: this.draw.bind(this),
      destroy: this.destroy.bind(this)
    }, this.env = {
      update: this.envEpdate.bind(this)
    };
  }
  draw(e) {
    let i = this.layout;
    if (!i)
      return;
    e.strokeStyle = this.props.colors.grid, e.beginPath();
    const s = i.height;
    for (var [n, r] of i.xs)
      e.moveTo(n - 0.5, 0), e.lineTo(n - 0.5, s);
    for (var [o, u] of i.ys)
      e.moveTo(0, o - 0.5), e.lineTo(i.width, o - 0.5);
    e.stroke();
  }
  envEpdate(e, i, s) {
    this.ovSrc = e, this.layout = i, this.props = s;
  }
  destroy() {
  }
}
function mo(t, e, i, s, n) {
  var r = i.ys;
  n.font = t.config.FONT;
  var { x: o, y: u, w: a, h: l } = es(t, e, s, n);
  n.fillStyle = t.colors.text, n.beginPath();
  for (var p of r) {
    if (p[0] > e.height)
      continue;
    var m = s === "left" ? a - 0.5 : o - 0.5, I = s === "left" ? m - 4.5 : m + 4.5;
    n.moveTo(m, p[0] - 0.5), n.lineTo(I, p[0] - 0.5);
    var y = s === "left" ? -10 : 10;
    n.textAlign = s === "left" ? "end" : "start";
    let b = i.prec;
    n.fillText(p[1].toFixed(b), m + y, p[0] + 4);
  }
  n.stroke();
}
function es(t, e, i, s) {
  var n = i === "right" ? 1 : 0, r = e.sbMax[n], o, u, a, l;
  switch (i) {
    case "left":
      o = 0, u = 0, a = Math.floor(r), l = e.height, s.clearRect(o, u, a, l), s.strokeStyle = t.colors.scale, s.beginPath(), s.moveTo(o - 0.5 + a, 0), s.lineTo(o - 0.5 + a, l), s.stroke();
      break;
    case "right":
      o = 0, u = 0, a = Math.floor(r), l = e.height, s.clearRect(o, u, a, l), s.strokeStyle = t.colors.scale, s.beginPath(), s.moveTo(o + 0.5, 0), s.lineTo(o + 0.5, l), s.stroke();
      break;
  }
  return { x: o, y: u, w: a, h: l };
}
function vo(t, e, i, s, n) {
  const r = t.config.PANHEIGHT;
  let u = (t.cursor.scales[i.scaleSpecs.id] || 0).toFixed(i.prec);
  n.fillStyle = t.colors.panel;
  var a = s === "right" ? 1 : 0;
  let l = e.sbMax[a] - 5, p = a ? 1 : 4, m = t.cursor.y - r * 0.5 - 0.5, I = a ? 7 : l - 3;
  ts(n, p, m, l, r, 3, a), n.fillStyle = t.colors.textHL, n.textAlign = a ? "left" : "right", n.fillText(u, I, m + 15);
}
function Io(t, e, i, s, n, r) {
  const o = Math.floor(t.config.PANHEIGHT * 0.8);
  let a = r.value.toFixed(i.prec);
  n.fillStyle = r.color;
  var l = s === "right" ? 1 : 0;
  let p = e.sbMax[l] - 5, m = l ? 1 : 4, I = r.y - o * 0.5 - 0.5, y = l ? 7 : p - 3;
  ts(n, m, I, p, o, 3, l), n.fillStyle = t.colors.back, n.textAlign = l ? "left" : "right", n.fillText(a, y, I + o - 4);
}
function ts(t, e, i, s, n, r, o) {
  s < 2 * r && (r = s / 2), n < 2 * r && (r = n / 2), t.beginPath(), t.moveTo(e + r, i), t.arcTo(e + s, i, e + s, i + n, r * o), t.arcTo(e + s, i + n, e, i + n, r * o), t.arcTo(e, i + n, e, i, r * (1 - o)), t.arcTo(e, i, e + s, i, r * (1 - o)), t.closePath(), t.fill();
}
function is(t, e, i) {
  i.strokeStyle = t.colors.scale, i.beginPath(), i.moveTo(0, 0.5), i.lineTo(e.width, 0.5), i.stroke();
}
function yo(t, e, i, s) {
  var n = i === "right" ? 1 : 0, r = e.sbMax[n];
  s.font = t.config.FONT, es(t, e, i, s), e.id && is(t, e, s);
  let o = Math.floor(r * 0.5), u = Math.floor(e.height * 0.5);
  s.fillStyle = t.colors.text, s.textAlign = "center", s.fillText("Error", o, u);
}
const yt = {
  body: mo,
  panel: vo,
  upperBorder: is,
  error: yo,
  tracker: Io
};
function bo(t, e, i) {
  e.strokeStyle = i.color, e.setLineDash([1, 2]), e.beginPath(), e.moveTo(0, i.y), e.lineTo(t.width, i.y), e.stroke(), e.setLineDash([]);
}
class Ao extends Vt {
  constructor(e, i, s) {
    super(e, "__$Trackers__"), this.id = e, this.zIndex = 5e5, this.ctxType = "Canvas", this.hub = Ue.instance(i.id), this.meta = Fe.instance(i.id), this.gridId = s, this.props = i, this.overlay = {
      draw: this.draw.bind(this),
      destroy: this.destroy.bind(this),
      drawSidebar: this.drawSidebar.bind(this)
    }, this.env = {
      update: this.envEpdate.bind(this)
    };
  }
  draw(e) {
    if (!this.layout)
      return;
    let i = this.meta.valueTrackers[this.gridId] || [];
    this.trackers = [];
    for (var s = 0; s < i.length; s++) {
      let n = i[s];
      if (!n)
        continue;
      let r = this.hub.ovData(this.gridId, s) || [], o = r[r.length - 1] || [], u = n(o);
      u.ovId = s, u.show && (u.y = this.layout.value2y(u.value), u.color = u.color || this.props.colors.scale, u.line && bo(this.layout, e, u), this.trackers.push(u));
    }
  }
  drawSidebar(e, i, s) {
    if (!!this.layout)
      for (var n of this.trackers || [])
        this.getScaleId(n.ovId) === s.scaleSpecs.id && yt.tracker(
          this.props,
          this.layout,
          s,
          i,
          e,
          n
        );
  }
  envEpdate(e, i, s) {
    this.ovSrc = e, this.layout = i, this.props = s, this.scaleId = this.getScaleId();
  }
  getScaleId(e) {
    let i = this.layout.scales;
    for (var s in i)
      if (i[s].scaleSpecs.ovIdxs.includes(e))
        return s;
  }
  destroy() {
  }
}
function _o(t, e, i) {
  let s = document.getElementById(t), n = window.devicePixelRatio || 1;
  s.style.width = `${e}px`, s.style.height = `${i}px`, n < 1 && (n = 1);
  var r = s.getBoundingClientRect();
  s.width = r.width * n, s.height = r.height * n;
  let o = s.getContext("2d", {});
  o.scale(n, n), o.measureTextOrg || (o.measureTextOrg = o.measureText);
  let u = t.split("-").shift();
  return o.measureText = (a) => N.measureText(o, a, u), [s, o];
}
function To(t, e, i, s) {
  let n = window.devicePixelRatio || 1;
  t.style.width = `${i}px`, t.style.height = `${s}px`, n < 1 && (n = 1);
  var r = t.getBoundingClientRect();
  t.width = r.width * n, t.height = r.height * n, e.scale(n, n);
}
const ct = { setup: _o, resize: To };
function wo(t) {
  let e, i;
  return {
    c() {
      e = Z("div"), i = Z("canvas"), C(i, "id", t[2]), C(e, "id", t[1]), C(e, "style", t[0]), C(e, "class", "nvjs-canvas-rendrer svelte-8n0n7w");
    },
    m(s, n) {
      W(s, e, n), te(e, i);
    },
    p(s, [n]) {
      n & 1 && C(e, "style", s[0]);
    },
    i: le,
    o: le,
    d(s) {
      s && q(e);
    }
  };
}
function Eo(t, e, i) {
  let s, n, r, { id: o } = e, { props: u = {} } = e, { rr: a = {} } = e, { layout: l = {} } = e, p = he.instance(u.id), m = `rr-${o}-${a.id}`, I = `${u.id}-rr-${o}-${a.id}`, y = `${u.id}-canvas-${o}-${a.id}`;
  p.on(`${m}:update-rr`, L), p.on(`${m}:run-rr-task`, F);
  let b, d, g;
  rt(() => {
    P();
  }), ht(() => {
    p.off(`${m}`), g && g.destroy();
  });
  function A(O) {
    g = O, g.setup({ id: o, canvas: b, ctx: d, props: u, layout: l, rrUpdId: m });
  }
  function Y() {
    g && (g.destroy(), g = null);
  }
  function E() {
    return g;
  }
  function P() {
    [b, d] = ct.setup(y, l.width, l.height), L();
  }
  function L(O = l) {
    i(3, l = O), !(!d || !l) && (d.clearRect(0, 0, b.width, b.height), a.layers.forEach((J) => {
      if (!J.display)
        return;
      d.save();
      let H = J.overlay;
      J.opacity && (d.globalAlpha = J.opacity), H.draw(d), d.globalAlpha = 1, d.restore();
    }), o > 0 && M());
  }
  function F(O) {
    O.handler(b, d, g);
  }
  function M() {
    d.strokeStyle = u.colors.scale, d.beginPath(), d.moveTo(0, 0.5), d.lineTo(l.width, 0.5), d.stroke();
  }
  function R() {
    !b || (ct.resize(b, d, l.width, l.height), L());
  }
  return t.$$set = (O) => {
    "id" in O && i(4, o = O.id), "props" in O && i(5, u = O.props), "rr" in O && i(6, a = O.rr), "layout" in O && i(3, l = O.layout);
  }, t.$$.update = () => {
    t.$$.dirty & 8 && i(0, s = `
    left: ${l.sbMax[0]}px;
    top: ${l.offset || 0}px;
    position: absolute;
    height: ${l.height}px;
}`), t.$$.dirty & 8 && i(11, n = l.width), t.$$.dirty & 8 && i(10, r = l.height), t.$$.dirty & 3072 && R();
  }, [
    s,
    I,
    y,
    l,
    o,
    u,
    a,
    A,
    Y,
    E,
    r,
    n
  ];
}
class So extends Ie {
  constructor(e) {
    super(), ve(this, e, Eo, wo, ge, {
      id: 4,
      props: 5,
      rr: 6,
      layout: 3,
      attach: 7,
      detach: 8,
      getInput: 9
    });
  }
  get attach() {
    return this.$$.ctx[7];
  }
  get detach() {
    return this.$$.ctx[8];
  }
  get getInput() {
    return this.$$.ctx[9];
  }
}
function cn(t, e, i) {
  const s = t.slice();
  return s[20] = e[i], s[21] = e, s[22] = i, s;
}
function un(t) {
  let e, i = t[21], s = t[22], n;
  const r = () => t[7](e, i, s), o = () => t[7](null, i, s);
  let u = {
    id: t[1],
    layout: t[0],
    props: t[2],
    rr: t[20]
  };
  return e = new So({ props: u }), r(), {
    c() {
      de(e.$$.fragment);
    },
    m(a, l) {
      ce(e, a, l), n = !0;
    },
    p(a, l) {
      (i !== a[21] || s !== a[22]) && (o(), i = a[21], s = a[22], r());
      const p = {};
      l & 2 && (p.id = a[1]), l & 1 && (p.layout = a[0]), l & 4 && (p.props = a[2]), l & 8 && (p.rr = a[20]), e.$set(p);
    },
    i(a) {
      n || (U(e.$$.fragment, a), n = !0);
    },
    o(a) {
      X(e.$$.fragment, a), n = !1;
    },
    d(a) {
      o(), ue(e, a);
    }
  };
}
function hn(t) {
  let e, i, s = t[20].ctxType === "Canvas" && un(t);
  return {
    c() {
      s && s.c(), e = Oe();
    },
    m(n, r) {
      s && s.m(n, r), W(n, e, r), i = !0;
    },
    p(n, r) {
      n[20].ctxType === "Canvas" ? s ? (s.p(n, r), r & 8 && U(s, 1)) : (s = un(n), s.c(), U(s, 1), s.m(e.parentNode, e)) : s && (Te(), X(s, 1, 1, () => {
        s = null;
      }), we());
    },
    i(n) {
      i || (U(s), i = !0);
    },
    o(n) {
      X(s), i = !1;
    },
    d(n) {
      s && s.d(n), n && q(e);
    }
  };
}
function Yo(t) {
  let e, i, s = t[3], n = [];
  for (let o = 0; o < s.length; o += 1)
    n[o] = hn(cn(t, s, o));
  const r = (o) => X(n[o], 1, 1, () => {
    n[o] = null;
  });
  return {
    c() {
      e = Z("div");
      for (let o = 0; o < n.length; o += 1)
        n[o].c();
      C(e, "class", "nvjs-grid svelte-1ctdodr"), C(e, "style", t[4]);
    },
    m(o, u) {
      W(o, e, u);
      for (let a = 0; a < n.length; a += 1)
        n[a].m(e, null);
      i = !0;
    },
    p(o, [u]) {
      if (u & 15) {
        s = o[3];
        let a;
        for (a = 0; a < s.length; a += 1) {
          const l = cn(o, s, a);
          n[a] ? (n[a].p(l, u), U(n[a], 1)) : (n[a] = hn(l), n[a].c(), U(n[a], 1), n[a].m(e, null));
        }
        for (Te(), a = s.length; a < n.length; a += 1)
          r(a);
        we();
      }
      (!i || u & 16) && C(e, "style", o[4]);
    },
    i(o) {
      if (!i) {
        for (let u = 0; u < s.length; u += 1)
          U(n[u]);
        i = !0;
      }
    },
    o(o) {
      n = n.filter(Boolean);
      for (let u = 0; u < n.length; u += 1)
        X(n[u]);
      i = !1;
    },
    d(o) {
      o && q(e), ut(n, o);
    }
  };
}
function Mo(t, e, i) {
  let s, { id: n } = e, { props: r } = e, { main: o } = e, { layout: u } = e;
  function a() {
    return y;
  }
  let l = Ue.instance(r.id), p = Fe.instance(r.id), m = he.instance(r.id), I = Zn.instance(r.id), y = [], b = [], d = null;
  m.on(`grid-${n}:update-grid`, P), m.on(`grid-${n}:remake-grid`, g), m.on(`grid-${n}:run-grid-task`, L), rt(() => {
    g();
  });
  function g(M) {
    if (!l.panes()[n])
      return;
    y = Y(), i(3, b = E());
    let R = b[b.length - 1];
    R && setTimeout(() => {
      R.ref && (A(), R.ref.attach(d = new fo()));
    });
  }
  function A() {
    for (var M of b)
      M.ref.detach();
  }
  function Y() {
    let M = l.panes()[n].overlays || [], R = [];
    for (var O = 0; O < M.length; O++) {
      let J = M[O], H = I.prefabs[J.type];
      if (!H)
        continue;
      let k = new Vt(O, J.name, r.id), _ = J.settings.zIndex;
      k.zIndex = _ != null ? _ : J.main ? 0 : -1;
      let T = new co(O, J, u, r);
      k.overlay = H.make(T), k.env = T, k.ovSrc = J, k.ctxType = H.ctx, T.overlay = k.overlay, p.exctractFrom(k.overlay), R.push(k), k.overlay.init();
    }
    return R.push(new po(O++)), R.push(new go(O++)), R.push(new Ao(O++, r, n)), R.sort((J, H) => J.zIndex - H.zIndex), p.finish(), R;
  }
  function E() {
    let M = [], R = null;
    for (var O of y) {
      if (O.ctxType !== R) {
        var J = {
          ctxType: O.ctxType,
          layers: [],
          id: M.length,
          ref: null
        };
        M.push(J), R = O.ctxType;
      }
      J.layers.push(O);
    }
    return M;
  }
  function P(M = u) {
    i(0, u = M), d && (d.layout = u);
    for (var R of y)
      R.env.update(R.ovSrc, u, r), R.update();
    for (var O of b)
      m.emitSpec(`rr-${n}-${O.id}`, "update-rr", u);
  }
  function L(M) {
    M.handler(y, b, { update: P });
  }
  function F(M, R, O) {
    xe[M ? "unshift" : "push"](() => {
      R[O].ref = M, i(3, b);
    });
  }
  return t.$$set = (M) => {
    "id" in M && i(1, n = M.id), "props" in M && i(2, r = M.props), "main" in M && i(5, o = M.main), "layout" in M && i(0, u = M.layout);
  }, t.$$.update = () => {
    t.$$.dirty & 5 && i(4, s = `
    width: ${u.width}px;
    height: ${u.height}px;
    background: ${r.colors.back};
    margin-left: ${u.sbMax[0]}px;
`);
  }, [u, n, r, b, s, o, a, F];
}
class ko extends Ie {
  constructor(e) {
    super(), ve(this, e, Mo, Yo, ge, {
      id: 1,
      props: 2,
      main: 5,
      layout: 0,
      getLayers: 6
    });
  }
  get getLayers() {
    return this.$$.ctx[6];
  }
}
function fn(t, { delay: e = 0, duration: i = 400, easing: s = Pn } = {}) {
  const n = +getComputedStyle(t).opacity;
  return {
    delay: e,
    duration: i,
    easing: s,
    css: (r) => `opacity: ${r * n}`
  };
}
function Jo(t) {
  Tt(t, "svelte-16w6gr6", ".scale-selector.svelte-16w6gr6{position:absolute;bottom:5px;display:grid;justify-content:center;align-content:center}.scale-button.svelte-16w6gr6{border-radius:3px;text-align:center;user-select:none;margin:auto;margin-top:1px}.scale-button.svelte-16w6gr6:hover{filter:brightness(1.2)}");
}
function pn(t, e, i) {
  const s = t.slice();
  s[13] = e[i], s[15] = i;
  const n = s[13].scaleSpecs.id;
  return s[1] = n, s;
}
function dn(t) {
  let e, i = t[1] + "", s, n, r, o, u;
  function a() {
    return t[10](t[1]);
  }
  return {
    c() {
      e = Z("div"), s = st(i), n = me(), C(e, "class", "scale-button svelte-16w6gr6"), C(e, "style", r = t[2](t[1]));
    },
    m(l, p) {
      W(l, e, p), te(e, s), te(e, n), o || (u = nt(e, "click", Bs(a)), o = !0);
    },
    p(l, p) {
      t = l, p & 1 && i !== (i = t[1] + "") && Ft(s, i), p & 5 && r !== (r = t[2](t[1])) && C(e, "style", r);
    },
    d(l) {
      l && q(e), o = !1, u();
    }
  };
}
function xo(t) {
  let e, i, s, n = t[0], r = [];
  for (let o = 0; o < n.length; o += 1)
    r[o] = dn(pn(t, n, o));
  return {
    c() {
      e = Z("div");
      for (let o = 0; o < r.length; o += 1)
        r[o].c();
      C(e, "class", "scale-selector svelte-16w6gr6"), C(e, "id", t[4]), C(e, "style", t[3]);
    },
    m(o, u) {
      W(o, e, u);
      for (let a = 0; a < r.length; a += 1)
        r[a].m(e, null);
      s = !0;
    },
    p(o, [u]) {
      if (u & 37) {
        n = o[0];
        let a;
        for (a = 0; a < n.length; a += 1) {
          const l = pn(o, n, a);
          r[a] ? r[a].p(l, u) : (r[a] = dn(l), r[a].c(), r[a].m(e, null));
        }
        for (; a < r.length; a += 1)
          r[a].d(1);
        r.length = n.length;
      }
      (!s || u & 8) && C(e, "style", o[3]);
    },
    i(o) {
      s || (_t(() => {
        i || (i = Zi(e, fn, { duration: 150 }, !0)), i.run(1);
      }), s = !0);
    },
    o(o) {
      i || (i = Zi(e, fn, { duration: 150 }, !1)), i.run(0), s = !1;
    },
    d(o) {
      o && q(e), ut(r, o), o && i && i.end();
    }
  };
}
function Co(t, e, i) {
  let s, n, r, { id: o } = e, { props: u } = e, { layout: a } = e, { scales: l } = e, { side: p } = e, m = he.instance(u.id), I = p === "right" ? 1 : 0, y = `${u.id}-ss-${o}-${p}`;
  function b(g) {
    l[g];
    let A = a.settings.scaleSideIdxs;
    A[I] = g, m.emitSpec("hub", "set-scale-index", { paneId: o, index: g, sideIdxs: A });
  }
  const d = (g) => b(g);
  return t.$$set = (g) => {
    "id" in g && i(1, o = g.id), "props" in g && i(6, u = g.props), "layout" in g && i(7, a = g.layout), "scales" in g && i(0, l = g.scales), "side" in g && i(8, p = g.side);
  }, t.$$.update = () => {
    t.$$.dirty & 129 && i(9, s = function() {
      let A = {}, Y = a.sbMax[I];
      switch (l.length) {
        case 2:
        case 4:
        default:
          A.ssw = 46, A.ssm = (Y - A.ssw) / 2, A.bw = 18, A.bh = 18, A.tmp = "50% 50%";
          break;
        case 3:
          A.ssw = 54, A.ssm = (Y - A.ssw) / 3, A.bw = 15, A.bh = 15, A.tmp = "33% 33% 33%";
          break;
      }
      return A;
    }()), t.$$.dirty & 576 && i(3, n = `
    grid-template-columns: ${s.tmp};
    font: ${u.config.FONT};
    width: ${s.ssw}px;
    margin-left: ${s.ssm}px;
`), t.$$.dirty & 704 && i(2, r = (g) => {
      let Y = g === a.settings.scaleSideIdxs[I] ? u.colors.text : u.colors.scale;
      return `
    background: ${u.colors.back};
    line-height: ${s.bh}px;
    width: ${s.bw}px;
    height: ${s.bh}px;
    box-shadow: 0 0 0 1px ${u.colors.back};
    border: 1px solid ${Y};
    color: ${Y};
`;
    });
  }, [
    l,
    o,
    r,
    n,
    y,
    b,
    u,
    a,
    p,
    s,
    d
  ];
}
class Oo extends Ie {
  constructor(e) {
    super(), ve(
      this,
      e,
      Co,
      xo,
      ge,
      {
        id: 1,
        props: 6,
        layout: 7,
        scales: 0,
        side: 8
      },
      Jo
    );
  }
}
function gn(t) {
  let e, i;
  return e = new Oo({
    props: {
      id: t[1],
      props: t[2],
      layout: t[0],
      scales: t[4],
      side: t[3]
    }
  }), {
    c() {
      de(e.$$.fragment);
    },
    m(s, n) {
      ce(e, s, n), i = !0;
    },
    p(s, n) {
      const r = {};
      n[0] & 2 && (r.id = s[1]), n[0] & 4 && (r.props = s[2]), n[0] & 1 && (r.layout = s[0]), n[0] & 16 && (r.scales = s[4]), n[0] & 8 && (r.side = s[3]), e.$set(r);
    },
    i(s) {
      i || (U(e.$$.fragment, s), i = !0);
    },
    o(s) {
      X(e.$$.fragment, s), i = !1;
    },
    d(s) {
      ue(e, s);
    }
  };
}
function Po(t) {
  let e, i, s, n, r, o, u = t[4].length > 1 && t[5] && gn(t);
  return {
    c() {
      e = Z("div"), i = Z("canvas"), s = me(), u && u.c(), C(i, "id", t[8]), C(e, "id", t[7]), C(e, "style", t[6]), C(e, "class", "nvjs-sidebar svelte-gpuvhh");
    },
    m(a, l) {
      W(a, e, l), te(e, i), te(e, s), u && u.m(e, null), n = !0, r || (o = [
        nt(e, "click", t[9]),
        nt(e, "mouseover", t[10]),
        nt(e, "mouseleave", t[11])
      ], r = !0);
    },
    p(a, l) {
      a[4].length > 1 && a[5] ? u ? (u.p(a, l), l[0] & 48 && U(u, 1)) : (u = gn(a), u.c(), U(u, 1), u.m(e, null)) : u && (Te(), X(u, 1, 1, () => {
        u = null;
      }), we()), (!n || l[0] & 64) && C(e, "style", a[6]);
    },
    i(a) {
      n || (U(u), n = !0);
    },
    o(a) {
      X(u), n = !1;
    },
    d(a) {
      a && q(e), u && u.d(), r = !1, ze(o);
    }
  };
}
function No(t, e, i) {
  let s, n, r, o, { id: u } = e, { props: a = {} } = e, { layout: l = {} } = e, { side: p } = e, { scales: m = [] } = e, I = [];
  function y(G) {
    I = G;
  }
  let b = Fe.instance(a.id), d = he.instance(a.id), g = p === "right" ? 1 : 0, A = `sb-${u}-${p}`, Y = `${a.id}-sb-${u}-${p}`, E = `${a.id}-sb-canvas-${u}-${p}`, P = !1;
  d.on(`${A}:update-sb`, _);
  let L, F, M, R = 1, O, J;
  rt(() => {
    H();
  }), ht(() => {
    d.off(`${A}`), M && M.destroy();
  });
  function H() {
    [L, F] = ct.setup(E, l.sbMax[g], l.height), _(), n && k();
  }
  function k() {
    M = new De.Manager(L), M.add(new De.Pan({
      direction: De.DIRECTION_VERTICAL,
      threshold: 0
    })), M.add(new De.Tap({
      event: "doubletap",
      taps: 2,
      posThreshold: 50
    })), M.on("panstart", (G) => {
      if (!n)
        return;
      let ie = Q();
      ie ? R = ie.zoom : R = 1, O = [n.$hi, n.$lo], J = {
        y: G.center.y,
        z: R,
        mid: $.log_mid(O, l.height),
        A: n.A,
        B: n.B
      };
    }), M.on("panmove", (G) => {
      J && (R = B(G), d.emit("sidebar-transform", {
        gridId: u,
        scaleId: n.scaleSpecs.id,
        zoom: R,
        auto: !1,
        range: j(),
        drugging: !0,
        updateLayout: !0
      }), _());
    }), M.on("panend", () => {
      J = null, n && d.emit("sidebar-transform", {
        gridId: u,
        scaleId: n.scaleSpecs.id,
        drugging: !1,
        updateLayout: !0
      });
    }), M.on("doubletap", () => {
      d.emit("sidebar-transform", {
        gridId: u,
        scaleId: n.scaleSpecs.id,
        zoom: 1,
        auto: !0,
        updateLayout: !0
      }), R = 1, _();
    });
  }
  function _(G = l) {
    if (!!G) {
      if (i(0, l = G), n = V(), !n)
        return yt.error(a, l, p, F);
      yt.body(a, l, n, p, F), T(), u && yt.upperBorder(a, l, F), a.cursor.y && a.cursor.scales && a.cursor.gridId === l.id && yt.panel(a, l, n, p, F);
    }
  }
  function T() {
    for (var G of I) {
      let ie = G.overlay;
      ie.drawSidebar && ie.drawSidebar(F, p, n);
    }
  }
  function w() {
    !L || (ct.resize(L, F, l.sbMax[g], l.height), _());
  }
  function B(G) {
    let ie = J.y - G.center.y, Ge = 1 + (ie > 0 ? 3 : 1) * ie / l.height;
    return N.clamp(J.z * Ge, 5e-3, 100);
  }
  function j(G = 1, ie = 1) {
    let ye = R / J.z, Ge = (1 / ye - 1) / 2, D = O.slice(), fe = D[0] - D[1];
    if (!n.log)
      D[0] = D[0] + fe * Ge * G, D[1] = D[1] - fe * Ge * ie;
    else {
      let K = l.height / 2, oe = K - K * (1 / ye), ot = K + K * (1 / ye), He = (qe) => $.exp((qe - J.B) / J.A);
      D.slice(), D[0] = He(oe), D[1] = He(ot);
    }
    return D;
  }
  function V() {
    let G = l.scales, ie = l.settings.scaleTemplate[g], ye = G[l.settings.scaleSideIdxs[g]];
    return ye && ie.includes(ye.scaleSpecs.id) ? ye : null;
  }
  function Q() {
    if (!b.yTransforms[u])
      return;
    let G = n.scaleSpecs.id;
    return b.yTransforms[u][G];
  }
  function ee(G) {
    !n || d.emitSpec("hub", "set-scale-index", {
      paneId: u,
      index: n.scaleSpecs.id,
      sideIdxs: l.settings.scaleSideIdxs
    });
  }
  function Ee() {
    i(5, P = !0);
  }
  function re() {
    i(5, P = !1);
  }
  return t.$$set = (G) => {
    "id" in G && i(1, u = G.id), "props" in G && i(2, a = G.props), "layout" in G && i(0, l = G.layout), "side" in G && i(3, p = G.side), "scales" in G && i(4, m = G.scales);
  }, t.$$.update = () => {
    t.$$.dirty[0] & 5 && i(6, s = `
    left: ${g * (l.width + l.sbMax[0])}px;
    top: ${l.offset || 0}px;
    position: absolute;
    background: ${a.colors.back};
    height: ${l.height}px;
`), t.$$.dirty[0] & 1 && (n = V()), t.$$.dirty[0] & 1 && i(14, r = l.width), t.$$.dirty[0] & 1 && i(13, o = l.height), t.$$.dirty[0] & 24576 && w();
  }, [
    l,
    u,
    a,
    p,
    m,
    P,
    s,
    Y,
    E,
    ee,
    Ee,
    re,
    y,
    o,
    r
  ];
}
class ns extends Ie {
  constructor(e) {
    super(), ve(
      this,
      e,
      No,
      Po,
      ge,
      {
        id: 1,
        props: 2,
        layout: 0,
        side: 3,
        scales: 4,
        setLayers: 12
      },
      null,
      [-1, -1]
    );
  }
  get setLayers() {
    return this.$$.ctx[12];
  }
}
function mn(t) {
  let e;
  return {
    c() {
      e = Z("div"), C(e, "id", t[3]), C(e, "style", t[1]), C(e, "class", "nvjs-sidebar-stub svelte-yr5ja6");
    },
    m(i, s) {
      W(i, e, s);
    },
    p(i, s) {
      s & 2 && C(e, "style", i[1]);
    },
    d(i) {
      i && q(e);
    }
  };
}
function Ro(t) {
  let e, i = t[0].sbMax[t[2]] && mn(t);
  return {
    c() {
      i && i.c(), e = Oe();
    },
    m(s, n) {
      i && i.m(s, n), W(s, e, n);
    },
    p(s, [n]) {
      s[0].sbMax[s[2]] ? i ? i.p(s, n) : (i = mn(s), i.c(), i.m(e.parentNode, e)) : i && (i.d(1), i = null);
    },
    i: le,
    o: le,
    d(s) {
      i && i.d(s), s && q(e);
    }
  };
}
function Do(t, e, i) {
  let s, { id: n } = e, { props: r = {} } = e, { layout: o = {} } = e, { side: u } = e, a = u === "right" ? 1 : 0, l = `${r.id}-stub-${n}-${u}`;
  return t.$$set = (p) => {
    "id" in p && i(4, n = p.id), "props" in p && i(5, r = p.props), "layout" in p && i(0, o = p.layout), "side" in p && i(6, u = p.side);
  }, t.$$.update = () => {
    t.$$.dirty & 113 && i(1, s = `
    left: ${a * (o.width + o.sbMax[0])}px;
    top: ${o.offset || 0}px;
    width: ${o.sbMax[a] - 1}px;
    height: ${o.height - (n ? 1 : 0)}px;
    position: absolute;
    border: 1px solid;
    border-${u}: none;
    border-bottom: none;
    /* TODO: remove to-boder, it's in the pane now */
    border-top: ${n ? "auto" : "none"};
    border-color: ${r.colors.scale};
    background: ${r.colors.back}
`);
  }, [o, s, a, l, n, r, u];
}
class ss extends Ie {
  constructor(e) {
    super(), ve(this, e, Do, Ro, ge, { id: 4, props: 5, layout: 0, side: 6 });
  }
}
const Bo = "data:image/png;base64,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", Lo = "data:image/png;base64,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", Uo = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IB2cksfwAAAAlwSFlzAAALEwAACxMBAJqcGAAABVxJREFUeJztmlmoVlUUx/30XjVLnFC0bJTsWlmZQwRlYlE+FIR2jQzRBpSISooGobKi0aLoRlSEUolU0EMDRQ9JUdFgiA9NFA0oDTfLVTaZZdb/39oXD/tb55x9vnvOPUp7wQ/u/c4e1lpnT2et3a9flChRokSJEiVKlChRokSJEiVKxSJdHYPBTeBD8BfYBb4ED4FRdetXqcDAA8BH4J8UtoDpdetZicCwQeD9DON7EDC+bn1LFxh1SYDxPayqW99SBQbtB34wDH0FPOHWgeTvf4OJdetdmsCYqwzjXwQN9/wO4/nDYEDduvdaYMT+YKNn3HYwNVFmJPjaK8P/Z9SpeykCI64Df3rGPWOUu8EYBatBWx16lyJQ/kBj5f8NTDbKDgObvbLd4KS+VroBjgAXgtvBrWAx6Cg6J1F+hTvsJI1am1H+amMUrAHtBfUfD+aLHrjuApdxyuW2gwJDwDLwlaEIT2uXg6GBihwGPvba+JnOzajD3eILr873YHZgn+2gE2xwO0mynW3gXjA6rXJ/8LixJSXh23wU7JujSMN15rfVFWDEIqPf58HAnHpt4Fo3xbLOGOvpaKuBTsNraU7oylqc8OxYsMmr92Oq95sN8dcNjpx5GXUabpj/EqA/ucdq5E2jIA8vW43fd7jp0LQmOGUeMN7+yjzjE23MN+q/DPZJ6W+Oc7CvJ4e9v73+Z5fVqT90PgETwJQU53AvvwD099qZJs1rCB05vIADBojO42Qbv4LzjLIzwXeGflyzTgXjwNP+c6tTv4EViWeTDIV6lOrscYJ7G48Yb695yOU7YanRDo/O7Yky0w1nk2/ALNl90jy7FQcs955zG3zDKMf5ebHoIjpRdNVOPv8cHNmCA0aDdcaom+Oez5bmcwP5DJySHJn4+6xeO8CV4eL2nlGW68T5okEN/9n10uKZHvXOleZzxGvgNGeo3xcdcoY0T8vSHMAhPgN8YJTnImStI6n7foADRokufv4C3G303+2GurUwl+MAV45DfaYx1C2uafXtJ/qb64zO6ud3sEBStuZSHZBwwjzwU4ZSjPlN6I3xrq8R4IWMfv4QPUKnHpRKd4Arz61qoaQfPpb5c7FVcQZsN/rgVybP+4MD6pfrgES9uW4IJuvyuDmuRXutPviNssbrY6foAtsIqF+dA1zdxW4osh737kUFbQzp42TZvcjyyL4ydH2p3AGu/hLwqehWGHzqK9D+QDfX+bV4pxT7RK7eAXuyRAdEB3Sc+X93wKzogOiA6IDogOiA6IBiDritBl0rEdEoUa4D/M9axub3+js7oneSVoc44HVjFDwnGhEu5bu+r0U0R3ifNEeXt1qFGdTcaTiBX3jLwTFgSA12FBLRr0ZGp3klZ71hD7nfqsiA52MpFQhzAMwN3AxOEA1b1z4ynN4Mmx0nehOFofusUN07qS9SNPLylOTnCBmk3OQ6uxuc40bIQWC4VHCpQTQEN9QN66NEv/BuEc0dMPdghcx83gZj8jridTbG87YENOg7hXUYr+eVmJdEM8kcMZeKxvhPByeK5uqPB5MdU9xv01wZOpQBFoa8HhTNDjMfwTB7d6CxSZi8YbZ6WBGP821yAflWslPmrbLLOW1HwIhrFSZs1oKjezP0eM3lIvCqaBKyKmXLciqN5jy/EhwuAUHTUEe0OWfwVHWF6IL5rujNzroMZvqb0+1J0SQMDzyHgkGlGJ3jEF5HGSu6IDFXxztFN4pmh58VTanzXjAztaEXF5Iw1M75znn/lmhyZJXomrLUGcv1g/ePM/MCfSqiWSPe9eE2ebDonkxFpxaEuwoz0oeAMaI7wN5/cXJPk38Bz1zMtWby+i0AAAAASUVORK5CYII=", mi = {
  "open-eye": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAMAAACdt4HsAAAAAXNSR0IB2cksfwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAelQTFRFAAAAmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYMxdw0QAAAKN0Uk5TAB1Pq7bV/v/5xZFHCw6h6NOCOQMRbNGwTgdo7PPOlIAlJDOSoNr7w0FL1+ubRRgCIVqz/CIKkPbpexsBPOFcJ/WDCBm5mULqye/BYocVtyxQDDIFjCpyslXi8j70d17PH5cEU+54V4anWUmeUmuatBS4c6ac58cgW/1Gsc0PE+Znn+S1Ott9LfAaEmlRFi+kxiNUNEhtK7p6nUzWcWEu2aKt90TEJrgAAALFSURBVHic7VZrWxJBFF5pdbxkRWkKSolGRYmhZBkYoWSIRaFkXjIx7GIWXSktzS6opVlJZvf7L+3MLpszuzvL9jz1bd8vMO8579mZMzPnDMcZMGDgPyPPtI7PL0CosIgvLln/l+JS04aNiMIm8+YtuuVl5VuRCioqLbrkFmuV4F9t27a9xg6ordvh2ClQu3br0Dv3YNe99a4GgtznbmzCtIffn0PefOAg+LUc8iosvtZ6PI3Dfk39ERv4BNra1a3Bo3gWHc1s/bEQOHS62Q7OMDh0NbDMxwPw+ROaU4ychAiOU+pGK9jCUTnb3RMkh7HTkIlAr5r+TCFC+cokt3dW97mIsa8f5jlQq9T3DIJeLfJZhIbOxQhiGCLEu+VuvZCe0IjazDh8As4nCGIUCF6+F7B/FyKqem4Yb95FkrkExGXaaQwyc0Vdz43jAAHqaF0F5hpJmIBIMvRiAHSdpCw3IGTZ2vgmJOBWTC6UcFsIEKY4Lxy5O2vDFEJ3R1h67p54mycocvI+QqPS4AFcICtT78+Wg3GankJo+mH2vyugEWCmhRkgLgXAS3hEL+HxkxnhN+F8KhUkegl+cgmcF5KYppI4i+bmn9nt/WMFkv45pV+AJFYQ4yh4lFMeVfKK2EFaLWnYxkWSwQdpkiReyPTKg7REfZCLw1F+SRJddIBcR5l7BTsRIi/DxACpf01eJnw0lxWFTXGdI00eSa7nOmcLSoYgYkmbsAdDdEF5gwvKilKvWtIyb1eTK3pLWraoypNDI5LGRfUdy1yJy3pao/k4Hbis17AdxMZiZjTR4HuckpRGY4HWVoxbW+jDgtLU+tGTu7UBPn0WmmuKaq4+d2Of0FzTGabwDyzz4j0YXP7yFXd3+7dV83exvU8v5ZZjLKo/MKZ0PjAwSk0/FE+c2URuHYW86E8ePzZ+FfF1JZqZN2DAwL/Ab6ixeYt2jKORAAAAAElFTkSuQmCC",
  "closed-eye": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAMAAACdt4HsAAAAAXNSR0IB2cksfwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAblQTFRFAAAAmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYZNB/+AAAAJN0Uk5TAB1Pq7bV/v/5xZFHCw6h6NOCOQMRbNGwTgdo7PPOlIAlJDOSoNr7w0FL1+ubRRgCIVqz/CIKkPbpexsBPOFcJ/WDCBm5mULqye/BYocVtyxQBYwqclXiMvLkrF7PDB/9U+5XhqdZnlJrtBS4ppznW0axzQ/mtRoSURYvScYjMFQ0K7p6nUzWsn1xYS5t2aI6BK33FoqWFQAAAl5JREFUeJxjYBgFo2AU0BgwMjGzsLKxs3NwsnBx85ComZeJj58dBQgICgkTrV1EVIwdCxCXkCRKu6SUNFi9jKycvIIiECgpq6iqgYXUNYjQr6kFUqqto6uHJKhvYGgEEjZmMSGg3dTMHKjOwtIKQ8baRgfkDFs7vPrtZYFqHBydsMs6u4Bc4WqKW7+bO1CBhwFuBZqeQAVeerikvR2A1vvgdaKvH9AEVX/sklJAOc8AvPoZGAKDgCHhEIxNKoSDnZ2VUCADAzMU6M4wJUyJ8AigfgyTmSOjrNHFooEmxMSiiwYDg8c9DsPYeHZ2DAMYEoB+ZUGPC2D8JfpiugurAQxJQBOSUYVSgCGTiqkShwEMaUAT0pEFmIACGVgU4jJAMhNooQiCnwUMgOxAEgxgsAImuRwEN5edPQ8zAPEZwJAPlEmAcQqAGUgKqzLcBjAUsrMXFUPZug7kGRADMwDkhRISvWCH7AUGK2AglpIUiGXAQBRH4gcAo1GUBAMkS4HRWI4sAkpI+cQbAEpIFahCMcCkXEmsAViSMkMVMCbcMTMDVgOqgfprMAo27NkZmwHYszO0QKlFE3Suc0YTsa4HFSgNmPopL9KghSp64KAC31JQodqIS1oCVKyX4ikXNVVBxboCbgWQikUQRyXq3ASqWHLxVCzAqo0LVLW5N5dhStm0GBOu2oCgtQ1cueaiVK7WBobt4Mq1FD2asADJDkj1HlHT2QWq3RW7ewR7IdV7UQVh7SBQjr2BUUhkAwMEeJn6MJo4/ROI1g4BjAETWUCNjUmcLMrceEN+FIyCUUANAAAY0GNbcYUV2AAAAABJRU5ErkJggg==",
  king: Bo,
  king2: Lo,
  king3: Uo
};
function Fo(t) {
  Tt(t, "svelte-1cdflqk", ".nvjs-eye.svelte-1cdflqk{width:20px;height:20px;float:right;margin-right:2px;margin-left:7px}.nvjs-eye.svelte-1cdflqk:hover{filter:brightness(1.25)}");
}
function Go(t) {
  let e, i, s;
  return {
    c() {
      e = Z("div"), C(e, "class", "nvjs-eye svelte-1cdflqk"), C(e, "style", t[0]);
    },
    m(n, r) {
      W(n, e, r), i || (s = nt(e, "click", t[1]), i = !0);
    },
    p(n, [r]) {
      r & 1 && C(e, "style", n[0]);
    },
    i: le,
    o: le,
    d(n) {
      n && q(e), i = !1, s();
    }
  };
}
function Ho(t, e, i) {
  let s, n, r, { gridId: o } = e, { ov: u } = e, { props: a } = e, { height: l } = e, p = he.instance(a.id);
  function m() {
    i(7, s = u.settings.display !== !1);
  }
  function I() {
    p.emitSpec("hub", "display-overlay", {
      paneId: o,
      ovId: u.id,
      flag: u.settings.display === void 0 ? !1 : !u.settings.display
    });
  }
  return t.$$set = (y) => {
    "gridId" in y && i(2, o = y.gridId), "ov" in y && i(3, u = y.ov), "props" in y && i(4, a = y.props), "height" in y && i(5, l = y.height);
  }, t.$$.update = () => {
    t.$$.dirty & 8 && i(7, s = u.settings.display !== !1), t.$$.dirty & 128 && i(8, n = s ? "open" : "closed"), t.$$.dirty & 288 && i(0, r = `
    background-image: url(${mi[n + "-eye"]});
    background-size: contain;
    background-repeat: no-repeat;
    margin-top: ${(l - 20) * 0.5 - 3}px;
    /* FIX 'overflow: hidden' changes baseline */
    margin-bottom: -2px;
`);
  }, [r, I, o, u, a, l, m, s, n];
}
class Vo extends Ie {
  constructor(e) {
    super(), ve(
      this,
      e,
      Ho,
      Go,
      ge,
      {
        gridId: 2,
        ov: 3,
        props: 4,
        height: 5,
        update: 6
      },
      Fo
    );
  }
  get update() {
    return this.$$.ctx[6];
  }
}
const Xo = [
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAVQAAAC0CAMAAAD8fySxAAAAAXNSR0IB2cksfwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAvpQTFRFAAAA///////////////+/////////////////////////////v/////////////////////////////////////////////////////////////////////////////////+//////////7////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////7////////+///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+///////////+//////////////////////////////////7////+////poUcigAAAP50Uk5TAD1AGUAtKyYkC/+5/5qTrNlmOjU5b2nMT+EDZMFjRT//7MT/aI+NGhUIM+YFusm38+0s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"
];
function zo(t) {
  Tt(t, "svelte-5spisq", ".nvjs-legend-line.svelte-5spisq{pointer-events:all;position:relative;user-select:none;border-radius:3px;padding:2px 5px;margin-bottom:2px;width:fit-content}.nvjs-logo.svelte-5spisq{width:35px;height:20px;float:left;margin-left:-5px;margin-right:2px;opacity:0.85}.nvjs-ll-data.svelte-5spisq{font-variant-numeric:tabular-nums}.nvjs-ll-value{margin-left:3px}.nvjs-ll-x{margin-left:3px}.nvjs-eye.svelte-5spisq{width:20px;height:20px;float:right;margin-right:2px;margin-left:7px}.nvjs-eye.svelte-5spisq:hover{filter:brightness(1.25)}.king-icon.svelte-5spisq{padding-left:8px;padding-right:8px;margin-right:4px;filter:grayscale()}");
}
function vn(t, e, i) {
  const s = t.slice();
  return s[41] = e[i], s[43] = i, s;
}
function In(t, e, i) {
  const s = t.slice();
  return s[41] = e[i], s[43] = i, s;
}
function yn(t) {
  let e;
  return {
    c() {
      e = Z("div"), C(e, "class", "nvjs-logo svelte-5spisq"), C(e, "style", t[16]);
    },
    m(i, s) {
      W(i, e, s);
    },
    p(i, s) {
      s[0] & 65536 && C(e, "style", i[16]);
    },
    d(i) {
      i && q(e);
    }
  };
}
function bn(t) {
  let e;
  return {
    c() {
      e = Z("span"), C(e, "class", "king-icon svelte-5spisq"), C(e, "style", t[14]);
    },
    m(i, s) {
      W(i, e, s);
    },
    p(i, s) {
      s[0] & 16384 && C(e, "style", i[14]);
    },
    d(i) {
      i && q(e);
    }
  };
}
function An(t) {
  let e;
  function i(r, o) {
    if (!r[12] && !r[11])
      return Wo;
    if (r[11] && r[8].length)
      return qo;
    if (r[8].length)
      return jo;
  }
  let s = i(t), n = s && s(t);
  return {
    c() {
      e = Z("span"), n && n.c(), C(e, "class", "nvjs-ll-data svelte-5spisq"), C(e, "style", t[17]);
    },
    m(r, o) {
      W(r, e, o), n && n.m(e, null);
    },
    p(r, o) {
      s === (s = i(r)) && n ? n.p(r, o) : (n && n.d(1), n = s && s(r), n && (n.c(), n.m(e, null))), o[0] & 131072 && C(e, "style", r[17]);
    },
    d(r) {
      r && q(e), n && n.d();
    }
  };
}
function jo(t) {
  let e, i = t[12](t[8], t[10]), s = [];
  for (let n = 0; n < i.length; n += 1)
    s[n] = _n(vn(t, i, n));
  return {
    c() {
      for (let n = 0; n < s.length; n += 1)
        s[n].c();
      e = Oe();
    },
    m(n, r) {
      for (let o = 0; o < s.length; o += 1)
        s[o].m(n, r);
      W(n, e, r);
    },
    p(n, r) {
      if (r[0] & 2102528) {
        i = n[12](n[8], n[10]);
        let o;
        for (o = 0; o < i.length; o += 1) {
          const u = vn(n, i, o);
          s[o] ? s[o].p(u, r) : (s[o] = _n(u), s[o].c(), s[o].m(e.parentNode, e));
        }
        for (; o < s.length; o += 1)
          s[o].d(1);
        s.length = i.length;
      }
    },
    d(n) {
      ut(s, n), n && q(e);
    }
  };
}
function qo(t) {
  let e, i = t[11](t[8], t[10], t[21]) + "", s;
  return {
    c() {
      e = new Fs(!1), s = Oe(), e.a = s;
    },
    m(n, r) {
      e.m(i, n, r), W(n, s, r);
    },
    p(n, r) {
      r[0] & 3328 && i !== (i = n[11](n[8], n[10], n[21]) + "") && e.p(i);
    },
    d(n) {
      n && q(s), n && e.d();
    }
  };
}
function Wo(t) {
  let e, i = t[8], s = [];
  for (let n = 0; n < i.length; n += 1)
    s[n] = Tn(In(t, i, n));
  return {
    c() {
      for (let n = 0; n < s.length; n += 1)
        s[n].c();
      e = Oe();
    },
    m(n, r) {
      for (let o = 0; o < s.length; o += 1)
        s[o].m(n, r);
      W(n, e, r);
    },
    p(n, r) {
      if (r[0] & 2097408) {
        i = n[8];
        let o;
        for (o = 0; o < i.length; o += 1) {
          const u = In(n, i, o);
          s[o] ? s[o].p(u, r) : (s[o] = Tn(u), s[o].c(), s[o].m(e.parentNode, e));
        }
        for (; o < s.length; o += 1)
          s[o].d(1);
        s.length = i.length;
      }
    },
    d(n) {
      ut(s, n), n && q(e);
    }
  };
}
function _n(t) {
  let e, i = t[21](t[41][0]) + "", s, n, r;
  return {
    c() {
      e = Z("span"), s = st(i), n = me(), C(e, "class", "nvjs-ll-value"), C(e, "style", r = `color: ${t[41][1]}`);
    },
    m(o, u) {
      W(o, e, u), te(e, s), te(e, n);
    },
    p(o, u) {
      u[0] & 5376 && i !== (i = o[21](o[41][0]) + "") && Ft(s, i), u[0] & 5376 && r !== (r = `color: ${o[41][1]}`) && C(e, "style", r);
    },
    d(o) {
      o && q(e);
    }
  };
}
function Zo(t) {
  let e;
  function i(r, o) {
    return r[41] != null ? Ko : Qo;
  }
  let s = i(t), n = s(t);
  return {
    c() {
      n.c(), e = Oe();
    },
    m(r, o) {
      n.m(r, o), W(r, e, o);
    },
    p(r, o) {
      s === (s = i(r)) && n ? n.p(r, o) : (n.d(1), n = s(r), n && (n.c(), n.m(e.parentNode, e)));
    },
    d(r) {
      n.d(r), r && q(e);
    }
  };
}
function Qo(t) {
  let e;
  return {
    c() {
      e = Z("span"), e.textContent = "x", C(e, "class", "nvjs-ll-x");
    },
    m(i, s) {
      W(i, e, s);
    },
    p: le,
    d(i) {
      i && q(e);
    }
  };
}
function Ko(t) {
  let e, i = t[21](t[41]) + "", s, n;
  return {
    c() {
      e = Z("span"), s = st(i), n = me(), C(e, "class", "nvjs-ll-value");
    },
    m(r, o) {
      W(r, e, o), te(e, s), te(e, n);
    },
    p(r, o) {
      o[0] & 256 && i !== (i = r[21](r[41]) + "") && Ft(s, i);
    },
    d(r) {
      r && q(e);
    }
  };
}
function Tn(t) {
  let e, i = t[43] > 0 && Zo(t);
  return {
    c() {
      i && i.c(), e = Oe();
    },
    m(s, n) {
      i && i.m(s, n), W(s, e, n);
    },
    p(s, n) {
      s[43] > 0 && i.p(s, n);
    },
    d(s) {
      i && i.d(s), s && q(e);
    }
  };
}
function wn(t) {
  let e;
  return {
    c() {
      e = Z("div"), C(e, "class", "nvjs-eye svelte-5spisq"), C(e, "style", t[15]);
    },
    m(i, s) {
      W(i, e, s);
    },
    p(i, s) {
      s[0] & 32768 && C(e, "style", i[15]);
    },
    d(i) {
      i && q(e);
    }
  };
}
function En(t) {
  let e, i, s = {
    gridId: t[0],
    ov: t[1],
    props: t[2],
    height: t[6].height
  };
  return e = new Vo({ props: s }), t[31](e), {
    c() {
      de(e.$$.fragment);
    },
    m(n, r) {
      ce(e, n, r), i = !0;
    },
    p(n, r) {
      const o = {};
      r[0] & 1 && (o.gridId = n[0]), r[0] & 2 && (o.ov = n[1]), r[0] & 4 && (o.props = n[2]), r[0] & 64 && (o.height = n[6].height), e.$set(o);
    },
    i(n) {
      i || (U(e.$$.fragment, n), i = !0);
    },
    o(n) {
      X(e.$$.fragment, n), i = !1;
    },
    d(n) {
      t[31](null), ue(e, n);
    }
  };
}
function $o(t) {
  let e, i, s, n, r, o, u, a, l, p, m, I = t[1].main && t[2].showLogo && yn(t), y = t[1].main && bn(t), b = t[7] && !t[3] && An(t), d = !t[7] && !t[3] && wn(t), g = t[3] && En(t);
  return {
    c() {
      e = Z("div"), I && I.c(), i = me(), s = Z("span"), n = st(t[18]), r = me(), y && y.c(), o = me(), b && b.c(), u = me(), d && d.c(), a = me(), g && g.c(), C(s, "class", "nvjs-ll-name svelte-5spisq"), C(e, "class", "nvjs-legend-line svelte-5spisq"), C(e, "style", t[13]);
    },
    m(A, Y) {
      W(A, e, Y), I && I.m(e, null), te(e, i), te(e, s), te(s, n), te(s, r), y && y.m(s, null), t[30](s), te(e, o), b && b.m(e, null), te(e, u), d && d.m(e, null), te(e, a), g && g.m(e, null), t[32](e), l = !0, p || (m = [
        nt(e, "mousemove", t[19]),
        nt(e, "mouseleave", t[20])
      ], p = !0);
    },
    p(A, Y) {
      A[1].main && A[2].showLogo ? I ? I.p(A, Y) : (I = yn(A), I.c(), I.m(e, i)) : I && (I.d(1), I = null), (!l || Y[0] & 262144) && Ft(n, A[18]), A[1].main ? y ? y.p(A, Y) : (y = bn(A), y.c(), y.m(s, null)) : y && (y.d(1), y = null), A[7] && !A[3] ? b ? b.p(A, Y) : (b = An(A), b.c(), b.m(e, u)) : b && (b.d(1), b = null), !A[7] && !A[3] ? d ? d.p(A, Y) : (d = wn(A), d.c(), d.m(e, a)) : d && (d.d(1), d = null), A[3] ? g ? (g.p(A, Y), Y[0] & 8 && U(g, 1)) : (g = En(A), g.c(), U(g, 1), g.m(e, null)) : g && (Te(), X(g, 1, 1, () => {
        g = null;
      }), we()), (!l || Y[0] & 8192) && C(e, "style", A[13]);
    },
    i(A) {
      l || (U(g), l = !0);
    },
    o(A) {
      X(g), l = !1;
    },
    d(A) {
      A && q(e), I && I.d(), y && y.d(), t[30](null), b && b.d(), d && d.d(), g && g.d(), t[32](null), p = !1, ze(m);
    }
  };
}
function el(t, e, i) {
  let s, n, r, o, u, a, l, p, m, I, y, b, d, g, A, Y, E, P, L, F, M, { gridId: R } = e, { ov: O } = e, { props: J } = e, { layout: H } = e, k = Fe.instance(J.id), _ = he.instance(J.id), T = !1, w, B, j;
  rt(() => {
    _.on(`${s}:update-ll`, V);
  }), ht(() => {
    _.off(s);
  });
  function V() {
    i(7, F = O.settings.display !== !1), j && j.update();
  }
  function Q(D) {
    D.clientX < y.x + y.width + 35 && !T && setTimeout(() => {
      G(), i(3, T = !0);
    });
  }
  function ee(D) {
    setTimeout(() => {
      G(), i(3, T = !1);
    });
  }
  function Ee(D, fe = L) {
    return D == null ? "x" : typeof D != "number" ? D : D.toFixed(fe);
  }
  function re(D) {
    return Object.values(D).find((fe) => fe.scaleSpecs.ovIdxs.includes(O.id)) || D[H.scaleIndex];
  }
  function G() {
    i(6, I = w.getBoundingClientRect());
  }
  function ie(D) {
    xe[D ? "unshift" : "push"](() => {
      B = D, i(5, B);
    });
  }
  function ye(D) {
    xe[D ? "unshift" : "push"](() => {
      j = D, i(9, j);
    });
  }
  function Ge(D) {
    xe[D ? "unshift" : "push"](() => {
      w = D, i(4, w);
    });
  }
  return t.$$set = (D) => {
    "gridId" in D && i(0, R = D.gridId), "ov" in D && i(1, O = D.ov), "props" in D && i(2, J = D.props), "layout" in D && i(22, H = D.layout);
  }, t.$$.update = () => {
    var D;
    t.$$.dirty[0] & 3 && (s = `ll-${R}-${O.id}`), t.$$.dirty[0] & 2 && i(18, n = (D = O.name) != null ? D : `${O.type || "Overlay"}-${O.id}`), t.$$.dirty[0] & 4 && i(29, r = parseInt(J.config.FONT.split("px").shift())), t.$$.dirty[0] & 541065222 && i(28, o = `
    font: ${J.config.FONT};
    font-size: ${r + (O.main ? 5 : 3)}px;
    font-weight: 300;
    color: ${J.colors.textLG};
    background: ${J.colors.llBack};
    border: 1px solid transparent;
    margin-right: 30px;
    max-width: ${H.width - 20}px;
    overflow-x: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
`), t.$$.dirty[0] & 4 && i(27, u = `
    background: ${J.colors.back};
    border: 1px solid ${J.colors.grid};
`), t.$$.dirty[0] & 536870918 && i(17, a = `
    font-size: ${r + (O.main ? 3 : 2)}px;
    color: ${J.colors.llValue}
`), t.$$.dirty[0] & 2 && i(7, F = O.settings.display !== !1), t.$$.dirty[0] & 128 && i(23, M = F ? "open" : "closed"), t.$$.dirty[0] & 16 && i(6, I = w ? w.getBoundingClientRect() : {}), t.$$.dirty[0] & 8388672 && i(15, p = `
    background-image: url(${mi[M + "-eye"]});
    background-size: contain;
    background-repeat: no-repeat;
    margin-top: ${(I.height - 20) * 0.5 - 3}px;
    margin-bottom: -2px;
`), t.$$.dirty[0] & 64 && `${I.width}${I.height}`, t.$$.dirty[0] & 4 && i(25, Y = J.cursor.values || []), t.$$.dirty[0] & 33554435 && i(8, E = (Y[R] || [])[O.id] || []), t.$$.dirty[0] & 392 && i(14, m = `
    background-image: url(${mi.king3});
    background-size: contain;
    background-repeat: no-repeat;
    margin-left: ${T || !F || !E.length ? 7 : 3}px;
`), t.$$.dirty[0] & 32 && (y = B ? B.getBoundingClientRect() : {}), t.$$.dirty[0] & 402653192 && i(13, b = o + (T ? u : "")), t.$$.dirty[0] & 3 && i(26, d = k.getLegendFns(R, O.id) || {}), t.$$.dirty[0] & 67108864 && i(12, g = d.legend), t.$$.dirty[0] & 67108864 && i(11, A = d.legendHtml), t.$$.dirty[0] & 4194304 && i(24, P = re(H.scales)), t.$$.dirty[0] & 16777216 && i(10, L = P.prec);
  }, i(16, l = `
    background-image: url(${Xo[0]});
    background-size: contain;
    background-repeat: no-repeat;
`), [
    R,
    O,
    J,
    T,
    w,
    B,
    I,
    F,
    E,
    j,
    L,
    A,
    g,
    b,
    m,
    p,
    l,
    a,
    n,
    Q,
    ee,
    Ee,
    H,
    M,
    P,
    Y,
    d,
    u,
    o,
    r,
    ie,
    ye,
    Ge
  ];
}
class tl extends Ie {
  constructor(e) {
    super(), ve(this, e, el, $o, ge, { gridId: 0, ov: 1, props: 2, layout: 22 }, zo, [-1, -1]);
  }
}
function il(t) {
  Tt(t, "svelte-16ib1si", ".nvjs-legend.svelte-16ib1si{pointer-events:none}");
}
function Sn(t, e, i) {
  const s = t.slice();
  return s[9] = e[i], s[11] = i, s;
}
function Yn(t) {
  let e, i, s = t[5].panes()[t[0]].overlays, n = [];
  for (let o = 0; o < s.length; o += 1)
    n[o] = Mn(Sn(t, s, o));
  const r = (o) => X(n[o], 1, 1, () => {
    n[o] = null;
  });
  return {
    c() {
      e = Z("div");
      for (let o = 0; o < n.length; o += 1)
        n[o].c();
      C(e, "class", "nvjs-legend svelte-16ib1si"), C(e, "style", t[4]);
    },
    m(o, u) {
      W(o, e, u);
      for (let a = 0; a < n.length; a += 1)
        n[a].m(e, null);
      i = !0;
    },
    p(o, u) {
      if (u & 39) {
        s = o[5].panes()[o[0]].overlays;
        let a;
        for (a = 0; a < s.length; a += 1) {
          const l = Sn(o, s, a);
          n[a] ? (n[a].p(l, u), U(n[a], 1)) : (n[a] = Mn(l), n[a].c(), U(n[a], 1), n[a].m(e, null));
        }
        for (Te(), a = s.length; a < n.length; a += 1)
          r(a);
        we();
      }
      (!i || u & 16) && C(e, "style", o[4]);
    },
    i(o) {
      if (!i) {
        for (let u = 0; u < s.length; u += 1)
          U(n[u]);
        i = !0;
      }
    },
    o(o) {
      n = n.filter(Boolean);
      for (let u = 0; u < n.length; u += 1)
        X(n[u]);
      i = !1;
    },
    d(o) {
      o && q(e), ut(n, o);
    }
  };
}
function Mn(t) {
  let e, i;
  return e = new tl({
    props: {
      gridId: t[0],
      props: t[1],
      layout: t[2],
      ov: t[9]
    }
  }), {
    c() {
      de(e.$$.fragment);
    },
    m(s, n) {
      ce(e, s, n), i = !0;
    },
    p(s, n) {
      const r = {};
      n & 1 && (r.gridId = s[0]), n & 2 && (r.props = s[1]), n & 4 && (r.layout = s[2]), n & 1 && (r.ov = s[9]), e.$set(r);
    },
    i(s) {
      i || (U(e.$$.fragment, s), i = !0);
    },
    o(s) {
      X(e.$$.fragment, s), i = !1;
    },
    d(s) {
      ue(e, s);
    }
  };
}
function kn(t) {
  let e = t[5].panes()[t[0]], i, s, n = e && Yn(t);
  return {
    c() {
      n && n.c(), i = Oe();
    },
    m(r, o) {
      n && n.m(r, o), W(r, i, o), s = !0;
    },
    p(r, o) {
      o & 1 && (e = r[5].panes()[r[0]]), e ? n ? (n.p(r, o), o & 1 && U(n, 1)) : (n = Yn(r), n.c(), U(n, 1), n.m(i.parentNode, i)) : n && (Te(), X(n, 1, 1, () => {
        n = null;
      }), we());
    },
    i(r) {
      s || (U(n), s = !0);
    },
    o(r) {
      X(n), s = !1;
    },
    d(r) {
      n && n.d(r), r && q(i);
    }
  };
}
function nl(t) {
  let e = t[3], i, s, n = kn(t);
  return {
    c() {
      n.c(), i = Oe();
    },
    m(r, o) {
      n.m(r, o), W(r, i, o), s = !0;
    },
    p(r, [o]) {
      o & 8 && ge(e, e = r[3]) ? (Te(), X(n, 1, 1, le), we(), n = kn(r), n.c(), U(n, 1), n.m(i.parentNode, i)) : n.p(r, o);
    },
    i(r) {
      s || (U(n), s = !0);
    },
    o(r) {
      X(n), s = !1;
    },
    d(r) {
      r && q(i), n.d(r);
    }
  };
}
function sl(t, e, i) {
  let s, { id: n } = e, { props: r } = e, { main: o } = e, { layout: u } = e, a = Ue.instance(r.id), l = he.instance(r.id), p = 0;
  l.on(`legend-${n}:update-legend`, m), ht(() => {
    l.off(`legend-${n}`);
  });
  function m() {
    i(3, p++, p);
  }
  return t.$$set = (I) => {
    "id" in I && i(0, n = I.id), "props" in I && i(1, r = I.props), "main" in I && i(6, o = I.main), "layout" in I && i(2, u = I.layout);
  }, t.$$.update = () => {
    t.$$.dirty & 4 && i(4, s = `
    left: ${u.sbMax[0] + 5}px;
    top: ${(u.offset || 0) + 5}px;
    position: absolute;
`);
  }, [n, r, u, p, s, a, o];
}
class rl extends Ie {
  constructor(e) {
    super(), ve(this, e, sl, nl, ge, { id: 0, props: 1, main: 6, layout: 2 }, il);
  }
}
function Jn(t) {
  let e, i, s, n, r, o, u, a, l, p, m, I = {
    id: t[1],
    props: t[2],
    layout: t[0],
    main: t[3]
  };
  i = new ko({ props: I }), t[10](i), n = new rl({
    props: {
      id: t[1],
      props: t[2],
      layout: t[0],
      main: t[3]
    }
  });
  const y = [ll, ol], b = [];
  function d(E, P) {
    return E[9].length ? 0 : 1;
  }
  o = d(t), u = b[o] = y[o](t);
  const g = [cl, al], A = [];
  function Y(E, P) {
    return E[8].length ? 0 : 1;
  }
  return l = Y(t), p = A[l] = g[l](t), {
    c() {
      e = Z("div"), de(i.$$.fragment), s = me(), de(n.$$.fragment), r = me(), u.c(), a = me(), p.c(), C(e, "class", "nvjs-pane svelte-9o7s1l"), C(e, "style", t[7]);
    },
    m(E, P) {
      W(E, e, P), ce(i, e, null), te(e, s), ce(n, e, null), te(e, r), b[o].m(e, null), te(e, a), A[l].m(e, null), m = !0;
    },
    p(E, P) {
      const L = {};
      P & 2 && (L.id = E[1]), P & 4 && (L.props = E[2]), P & 1 && (L.layout = E[0]), P & 8 && (L.main = E[3]), i.$set(L);
      const F = {};
      P & 2 && (F.id = E[1]), P & 4 && (F.props = E[2]), P & 1 && (F.layout = E[0]), P & 8 && (F.main = E[3]), n.$set(F);
      let M = o;
      o = d(E), o === M ? b[o].p(E, P) : (Te(), X(b[M], 1, 1, () => {
        b[M] = null;
      }), we(), u = b[o], u ? u.p(E, P) : (u = b[o] = y[o](E), u.c()), U(u, 1), u.m(e, a));
      let R = l;
      l = Y(E), l === R ? A[l].p(E, P) : (Te(), X(A[R], 1, 1, () => {
        A[R] = null;
      }), we(), p = A[l], p ? p.p(E, P) : (p = A[l] = g[l](E), p.c()), U(p, 1), p.m(e, null)), (!m || P & 128) && C(e, "style", E[7]);
    },
    i(E) {
      m || (U(i.$$.fragment, E), U(n.$$.fragment, E), U(u), U(p), m = !0);
    },
    o(E) {
      X(i.$$.fragment, E), X(n.$$.fragment, E), X(u), X(p), m = !1;
    },
    d(E) {
      E && q(e), t[10](null), ue(i), ue(n), b[o].d(), A[l].d();
    }
  };
}
function ol(t) {
  let e, i;
  return e = new ss({
    props: {
      id: t[1],
      props: t[2],
      layout: t[0],
      side: "left"
    }
  }), {
    c() {
      de(e.$$.fragment);
    },
    m(s, n) {
      ce(e, s, n), i = !0;
    },
    p(s, n) {
      const r = {};
      n & 2 && (r.id = s[1]), n & 4 && (r.props = s[2]), n & 1 && (r.layout = s[0]), e.$set(r);
    },
    i(s) {
      i || (U(e.$$.fragment, s), i = !0);
    },
    o(s) {
      X(e.$$.fragment, s), i = !1;
    },
    d(s) {
      ue(e, s);
    }
  };
}
function ll(t) {
  let e, i, s = {
    id: t[1],
    props: t[2],
    layout: t[0],
    side: "left",
    scales: t[9]
  };
  return e = new ns({ props: s }), t[11](e), {
    c() {
      de(e.$$.fragment);
    },
    m(n, r) {
      ce(e, n, r), i = !0;
    },
    p(n, r) {
      const o = {};
      r & 2 && (o.id = n[1]), r & 4 && (o.props = n[2]), r & 1 && (o.layout = n[0]), r & 512 && (o.scales = n[9]), e.$set(o);
    },
    i(n) {
      i || (U(e.$$.fragment, n), i = !0);
    },
    o(n) {
      X(e.$$.fragment, n), i = !1;
    },
    d(n) {
      t[11](null), ue(e, n);
    }
  };
}
function al(t) {
  let e, i;
  return e = new ss({
    props: {
      id: t[1],
      props: t[2],
      layout: t[0],
      side: "right"
    }
  }), {
    c() {
      de(e.$$.fragment);
    },
    m(s, n) {
      ce(e, s, n), i = !0;
    },
    p(s, n) {
      const r = {};
      n & 2 && (r.id = s[1]), n & 4 && (r.props = s[2]), n & 1 && (r.layout = s[0]), e.$set(r);
    },
    i(s) {
      i || (U(e.$$.fragment, s), i = !0);
    },
    o(s) {
      X(e.$$.fragment, s), i = !1;
    },
    d(s) {
      ue(e, s);
    }
  };
}
function cl(t) {
  let e, i, s = {
    id: t[1],
    props: t[2],
    layout: t[0],
    side: "right",
    scales: t[8]
  };
  return e = new ns({ props: s }), t[12](e), {
    c() {
      de(e.$$.fragment);
    },
    m(n, r) {
      ce(e, n, r), i = !0;
    },
    p(n, r) {
      const o = {};
      r & 2 && (o.id = n[1]), r & 4 && (o.props = n[2]), r & 1 && (o.layout = n[0]), r & 256 && (o.scales = n[8]), e.$set(o);
    },
    i(n) {
      i || (U(e.$$.fragment, n), i = !0);
    },
    o(n) {
      X(e.$$.fragment, n), i = !1;
    },
    d(n) {
      t[12](null), ue(e, n);
    }
  };
}
function ul(t) {
  let e, i, s = t[0] && Jn(t);
  return {
    c() {
      s && s.c(), e = Oe();
    },
    m(n, r) {
      s && s.m(n, r), W(n, e, r), i = !0;
    },
    p(n, [r]) {
      n[0] ? s ? (s.p(n, r), r & 1 && U(s, 1)) : (s = Jn(n), s.c(), U(s, 1), s.m(e.parentNode, e)) : s && (Te(), X(s, 1, 1, () => {
        s = null;
      }), we());
    },
    i(n) {
      i || (U(s), i = !0);
    },
    o(n) {
      X(s), i = !1;
    },
    d(n) {
      s && s.d(n), n && q(e);
    }
  };
}
function hl(t, e, i) {
  let s, n, r, { id: o } = e, { props: u } = e, { main: a } = e, { layout: l } = e, p = he.instance(u.id), m, I, y;
  p.on(`pane-${o}:update-pane`, b), rt(() => {
  });
  function b(Y) {
    if (!Y.grids)
      return;
    i(0, l = Y.grids[o]), p.emitSpec(`grid-${o}`, "update-grid", l);
    let E = y && y.getLayers ? y.getLayers() : [];
    m && m.setLayers(E), I && I.setLayers(E), p.emitSpec(`sb-${o}-left`, "update-sb", l), p.emitSpec(`sb-${o}-right`, "update-sb", l);
  }
  function d(Y) {
    xe[Y ? "unshift" : "push"](() => {
      y = Y, i(6, y);
    });
  }
  function g(Y) {
    xe[Y ? "unshift" : "push"](() => {
      m = Y, i(4, m);
    });
  }
  function A(Y) {
    xe[Y ? "unshift" : "push"](() => {
      I = Y, i(5, I);
    });
  }
  return t.$$set = (Y) => {
    "id" in Y && i(1, o = Y.id), "props" in Y && i(2, u = Y.props), "main" in Y && i(3, a = Y.main), "layout" in Y && i(0, l = Y.layout);
  }, t.$$.update = () => {
    t.$$.dirty & 1 && i(9, s = N.getScalesBySide(0, l)), t.$$.dirty & 1 && i(8, n = N.getScalesBySide(1, l)), t.$$.dirty & 7 && i(7, r = `
    width: ${u.width}px;
    height: ${(l || {}).height}px;
    /* didn't work, coz canvas draws through the border
    border-top: ${o ? "1px solid" : "none"};
    border-color: ${u.colors.scale};
    box-sizing: border-box;*/
`);
  }, [
    l,
    o,
    u,
    a,
    m,
    I,
    y,
    r,
    n,
    s,
    d,
    g,
    A
  ];
}
class fl extends Ie {
  constructor(e) {
    super(), ve(this, e, hl, ul, ge, { id: 1, props: 2, main: 3, layout: 0 });
  }
}
const {
  MINUTE15: pl,
  MINUTE: Ul,
  HOUR: Si,
  DAY: vi,
  WEEK: dl,
  MONTH: gl,
  YEAR: Ii,
  MONTHMAP: rs
} = Le;
function ml(t, e, i) {
  const s = e.botbar.width, n = e.botbar.height, r = e.main.sbMax[0];
  e.main.sbMax[1], i.font = t.config.FONT, i.clearRect(0, 0, s, n), i.strokeStyle = t.colors.scale, i.beginPath(), i.moveTo(0, 0.5), i.lineTo(Math.floor(s + 1), 0.5), i.stroke(), i.fillStyle = t.colors.text, i.beginPath();
  for (var o of e.botbar.xs) {
    let u = Il(t, o), a = o[0] + r;
    i.moveTo(a - 0.5, 0), i.lineTo(a - 0.5, 4.5), bl(t, o[1][0]) || (i.globalAlpha = 0.85), i.textAlign = "center", i.fillText(u, a, 18), i.globalAlpha = 1;
  }
  i.stroke();
}
function vl(t, e, i) {
  let s = yl(t);
  i.fillStyle = t.colors.panel;
  let n = i.measureText(s + "    "), r = Math.floor(n.width + 10), o = t.cursor.x + e.main.sbMax[0], u = Math.floor(o - r * 0.5), a = 1, l = t.config.PANHEIGHT;
  Al(i, u, a, r, l + 0.5, 3), i.fillStyle = t.colors.textHL, i.textAlign = "center", i.fillText(s, o, a + 16);
}
function Il(t, e) {
  let i = e[1][0], n = t.interval < vi ? 1 : 0, r = i + n * t.timezone * Si, o = new Date(r);
  if (e[2] === Ii || N.yearStart(i) === i)
    return o.getUTCFullYear();
  if (e[2] === gl || N.monthStart(i) === i)
    return rs[o.getUTCMonth()];
  if (N.dayStart(r) === r)
    return o.getUTCDate();
  let u = N.addZero(o.getUTCHours()), a = N.addZero(o.getUTCMinutes());
  return u + ":" + a;
}
function yl(t) {
  let e = t.cursor.t, i = t.interval, s = i < vi ? 1 : 0, n = new Date(e + s * t.timezone * Si);
  if (i === Ii)
    return n.getUTCFullYear();
  if (i < Ii)
    var r = "`" + `${n.getUTCFullYear()}`.slice(-2), o = rs[n.getUTCMonth()], u = "01";
  i <= dl && (u = n.getUTCDate());
  let a = `${u} ${o} ${r}`, l = "";
  if (i < vi) {
    let p = N.addZero(n.getUTCHours()), m = N.addZero(n.getUTCMinutes());
    l = p + ":" + m;
  }
  return `${a}  ${l}`;
}
function bl(t, e) {
  let i = t.interval;
  return e === 0 || N.monthStart(e) === e || N.dayStart(e) === e || i <= pl && e % Si === 0;
}
function Al(t, e, i, s, n, r) {
  s < 2 * r && (r = s / 2), n < 2 * r && (r = n / 2), t.beginPath(), t.moveTo(e + r, i), t.arcTo(e + s, i, e + s, i + n, 0), t.arcTo(e + s, i + n, e, i + n, r), t.arcTo(e, i + n, e, i, r), t.arcTo(e, i, e + s, i, 0), t.closePath(), t.fill();
}
const xn = {
  body: ml,
  panel: vl
};
function _l(t) {
  let e, i;
  return {
    c() {
      e = Z("div"), i = Z("canvas"), C(i, "id", t[2]), C(e, "class", "nvjs-botbar svelte-8gplax"), C(e, "id", t[1]), C(e, "style", t[0]);
    },
    m(s, n) {
      W(s, e, n), te(e, i);
    },
    p(s, [n]) {
      n & 1 && C(e, "style", s[0]);
    },
    i: le,
    o: le,
    d(s) {
      s && q(e);
    }
  };
}
function Tl(t, e, i) {
  let s, n, { props: r = {} } = e, { layout: o = {} } = e, u = "botbar", a = `${r.id}-botbar`, l = `${r.id}-botbar-canvas`, p = he.instance(r.id);
  p.on(`${u}:update-bb`, b);
  let m, I;
  rt(() => {
    y();
  }), ht(() => {
    p.off(`${u}`);
  });
  function y() {
    let g = o.botbar;
    [m, I] = ct.setup(l, g.width, g.height), b();
  }
  function b(g = o) {
    i(3, o = g), o.botbar && (xn.body(r, o, I), r.cursor.x && r.cursor.t !== void 0 && xn.panel(r, o, I));
  }
  function d() {
    let g = o.botbar;
    !m || !g || (ct.resize(m, I, g.width, g.height), b());
  }
  return t.$$set = (g) => {
    "props" in g && i(4, r = g.props), "layout" in g && i(3, o = g.layout);
  }, t.$$.update = () => {
    t.$$.dirty & 24 && i(0, s = `
    background: ${r.colors.back};
    width: ${(o.botbar || {}).width}px;
    height: ${(o.botbar || {}).height}px;
`), t.$$.dirty & 8 && i(5, n = (o.botbar || {}).width), t.$$.dirty & 32 && d();
  }, [s, a, l, o, r, n];
}
class wl extends Ie {
  constructor(e) {
    super(), ve(this, e, Tl, _l, ge, { props: 4, layout: 3 });
  }
}
function El(t) {
  let e, i;
  return {
    c() {
      e = Z("div"), i = st("No data \xAF\\_( \xB0\uFE4F\xB0)_/\xAF"), C(e, "class", "nvjs-no-data-stub svelte-172ri4o"), C(e, "style", t[0]);
    },
    m(s, n) {
      W(s, e, n), te(e, i);
    },
    p(s, [n]) {
      n & 1 && C(e, "style", s[0]);
    },
    i: le,
    o: le,
    d(s) {
      s && q(e);
    }
  };
}
function Sl(t, e, i) {
  let s, { props: n } = e;
  return t.$$set = (r) => {
    "props" in r && i(1, n = r.props);
  }, t.$$.update = () => {
    t.$$.dirty & 2 && i(0, s = `
    display: flex;
    width: ${n.width}px;
    height: ${n.height}px;
    background: ${n.colors.back};
    color: ${n.colors.scale};
    font: ${n.config.FONT};
    font-size: 18px;
    font-style: italic;
    user-select: none;
    align-items:center;
    justify-content:center;
`);
  }, [s, n];
}
class Yl extends Ie {
  constructor(e) {
    super(), ve(this, e, Sl, El, ge, { props: 1 });
  }
}
function Cn(t, e, i) {
  const s = t.slice();
  return s[23] = e[i], s[25] = i, s;
}
function Ml(t) {
  let e, i;
  return e = new Yl({ props: { props: t[0] } }), {
    c() {
      de(e.$$.fragment);
    },
    m(s, n) {
      ce(e, s, n), i = !0;
    },
    p(s, n) {
      const r = {};
      n & 1 && (r.props = s[0]), e.$set(r);
    },
    i(s) {
      i || (U(e.$$.fragment, s), i = !0);
    },
    o(s) {
      X(e.$$.fragment, s), i = !1;
    },
    d(s) {
      ue(e, s);
    }
  };
}
function kl(t) {
  let e, i, s, n = t[3].panes(), r = [];
  for (let u = 0; u < n.length; u += 1)
    r[u] = On(Cn(t, n, u));
  const o = (u) => X(r[u], 1, 1, () => {
    r[u] = null;
  });
  return i = new wl({
    props: {
      props: t[2],
      layout: t[1]
    }
  }), {
    c() {
      for (let u = 0; u < r.length; u += 1)
        r[u].c();
      e = me(), de(i.$$.fragment);
    },
    m(u, a) {
      for (let l = 0; l < r.length; l += 1)
        r[l].m(u, a);
      W(u, e, a), ce(i, u, a), s = !0;
    },
    p(u, a) {
      if (a & 14) {
        n = u[3].panes();
        let p;
        for (p = 0; p < n.length; p += 1) {
          const m = Cn(u, n, p);
          r[p] ? (r[p].p(m, a), U(r[p], 1)) : (r[p] = On(m), r[p].c(), U(r[p], 1), r[p].m(e.parentNode, e));
        }
        for (Te(), p = n.length; p < r.length; p += 1)
          o(p);
        we();
      }
      const l = {};
      a & 4 && (l.props = u[2]), a & 2 && (l.layout = u[1]), i.$set(l);
    },
    i(u) {
      if (!s) {
        for (let a = 0; a < n.length; a += 1)
          U(r[a]);
        U(i.$$.fragment, u), s = !0;
      }
    },
    o(u) {
      r = r.filter(Boolean);
      for (let a = 0; a < r.length; a += 1)
        X(r[a]);
      X(i.$$.fragment, u), s = !1;
    },
    d(u) {
      ut(r, u), u && q(e), ue(i, u);
    }
  };
}
function On(t) {
  let e, i;
  return e = new fl({
    props: {
      id: t[25],
      layout: t[1].grids[t[25]],
      props: t[2],
      main: t[23] === t[3].chart
    }
  }), {
    c() {
      de(e.$$.fragment);
    },
    m(s, n) {
      ce(e, s, n), i = !0;
    },
    p(s, n) {
      const r = {};
      n & 2 && (r.layout = s[1].grids[s[25]]), n & 4 && (r.props = s[2]), e.$set(r);
    },
    i(s) {
      i || (U(e.$$.fragment, s), i = !0);
    },
    o(s) {
      X(e.$$.fragment, s), i = !1;
    },
    d(s) {
      ue(e, s);
    }
  };
}
function Jl(t) {
  let e, i, s, n;
  const r = [kl, Ml], o = [];
  function u(a, l) {
    return a[1] && a[1].main ? 0 : 1;
  }
  return i = u(t), s = o[i] = r[i](t), {
    c() {
      e = Z("div"), s.c(), C(e, "class", "nvjs-chart svelte-pr5wst");
    },
    m(a, l) {
      W(a, e, l), o[i].m(e, null), n = !0;
    },
    p(a, [l]) {
      let p = i;
      i = u(a), i === p ? o[i].p(a, l) : (Te(), X(o[p], 1, 1, () => {
        o[p] = null;
      }), we(), s = o[i], s ? s.p(a, l) : (s = o[i] = r[i](a), s.c()), U(s, 1), s.m(e, null));
    },
    i(a) {
      n || (U(s), n = !0);
    },
    o(a) {
      X(s), n = !1;
    },
    d(a) {
      a && q(e), o[i].d();
    }
  };
}
function xl(t, e, i) {
  let s, { props: n = {} } = e;
  function r() {
    return E;
  }
  function o() {
    return d;
  }
  function u() {
    return g;
  }
  function a(J) {
    var k;
    let H = !((k = J.preventDefault) == null || k);
    delete J.preventDefault, Object.assign(d, J), F(d, H);
  }
  function l(J) {
    var k;
    let H = !((k = J.preventDefault) == null || k);
    delete J.preventDefault, Object.assign(g, J), P(g, H);
  }
  let p = Ue.instance(n.id), m = Fe.instance(n.id), I = he.instance(n.id), y = Ei.instance(n.id);
  y.init(n);
  let b = y.detectInterval(), d = y.defaultRange(), g = new fr(), A = {}, Y = new Yr(n), E = null;
  I.on("chart:cursor-changed", P), I.on("chart:cursor-locked", L), I.on("chart:range-changed", F), I.on("chart:update-layout", R), I.on("chart:full-update", O), rt(() => {
    p.calcSubset(d), p.detectMain(), m.init(n), y.updatePanesHash(), i(1, E = new sn(s, p));
  }), ht(() => {
    I.off("chart");
  });
  function P(J, H = !0) {
    H && I.emit("$cursor-update", J), J.mode && i(11, g.mode = J.mode, g), g.mode !== "explore" && (g.xSync(p, E, s, J), J.visible === !1 && setTimeout(() => R())), R();
  }
  function L(J) {
    g.scrollLock && J || i(11, g.locked = J, g);
  }
  function F(J, H = !0) {
    if (H && I.emit("$range-update", J), i(10, d = J), p.updateRange(d), g.locked)
      return;
    g.xValues(p, E, s), g.yValues(E), R();
    let k = n.config.QUANTIZE_AFTER;
    k && N.afterAll(A, M, k);
  }
  function M() {
    g.xSync(p, E, s, g), R();
  }
  function R(J = !0) {
    if (J && I.emit("$chart-update"), y.panesChanged())
      return O();
    i(11, g = g), i(1, E = new sn(s, p)), I.emit("update-pane", E), I.emitSpec("botbar", "update-bb", E);
  }
  function O(J = {}) {
    i(9, b = y.detectInterval()), (!d.length || J.resetRange) && i(10, d = y.defaultRange()), p.calcSubset(d), p.init(p.data), p.detectMain(), m.store(), m.init(n), y.updatePanesHash(), R(), I.emit("remake-grid");
  }
  return t.$$set = (J) => {
    "props" in J && i(0, n = J.props);
  }, t.$$.update = () => {
    t.$$.dirty & 3585 && i(2, s = Object.assign({ interval: b, range: d, ctx: Y, cursor: g }, n));
  }, [
    n,
    E,
    s,
    p,
    r,
    o,
    u,
    a,
    l,
    b,
    d,
    g
  ];
}
class Cl extends Ie {
  constructor(e) {
    super(), ve(this, e, xl, Jl, ge, {
      props: 0,
      getLayout: 4,
      getRange: 5,
      getCursor: 6,
      setRange: 7,
      setCursor: 8
    });
  }
  get getLayout() {
    return this.$$.ctx[4];
  }
  get getRange() {
    return this.$$.ctx[5];
  }
  get getCursor() {
    return this.$$.ctx[6];
  }
  get setRange() {
    return this.$$.ctx[7];
  }
  get setCursor() {
    return this.$$.ctx[8];
  }
}
function Ol(t) {
  Tt(t, "svelte-z09kpl", ".svelte-z09kpl::after,.svelte-z09kpl::before{box-sizing:content-box}.night-vision.svelte-z09kpl{position:relative}");
}
function Pl(t) {
  let e, i, s, n = { props: t[1] };
  return i = new Cl({ props: n }), t[19](i), {
    c() {
      e = Z("div"), de(i.$$.fragment), C(e, "class", "night-vision svelte-z09kpl"), C(e, "id", t[0]), C(e, "style", t[3]);
    },
    m(r, o) {
      W(r, e, o), ce(i, e, null), s = !0;
    },
    p(r, [o]) {
      const u = {};
      o & 2 && (u.props = r[1]), i.$set(u), (!s || o & 1) && C(e, "id", r[0]), (!s || o & 8) && C(e, "style", r[3]);
    },
    i(r) {
      s || (U(i.$$.fragment, r), s = !0);
    },
    o(r) {
      X(i.$$.fragment, r), s = !1;
    },
    d(r) {
      r && q(e), t[19](null), ue(i);
    }
  };
}
function Nl(t, e, i) {
  let s, n, r, o, u, a;
  function l() {
    return a;
  }
  let { showLogo: p = !1 } = e, { id: m = "nvjs" } = e, { width: I = 750 } = e, { height: y = 420 } = e, { colors: b = {} } = e, { toolbar: d = !1 } = e, { scripts: g = [] } = e, { config: A = {} } = e, { indexBased: Y = !1 } = e, { timezone: E = 0 } = e, { data: P = {} } = e, { autoResize: L = !1 } = e;
  function F(M) {
    xe[M ? "unshift" : "push"](() => {
      a = M, i(2, a);
    });
  }
  return t.$$set = (M) => {
    "showLogo" in M && i(5, p = M.showLogo), "id" in M && i(0, m = M.id), "width" in M && i(6, I = M.width), "height" in M && i(7, y = M.height), "colors" in M && i(8, b = M.colors), "toolbar" in M && i(9, d = M.toolbar), "scripts" in M && i(10, g = M.scripts), "config" in M && i(11, A = M.config), "indexBased" in M && i(12, Y = M.indexBased), "timezone" in M && i(13, E = M.timezone), "data" in M && i(14, P = M.data), "autoResize" in M && i(15, L = M.autoResize);
  }, t.$$.update = () => {
    t.$$.dirty & 2048 && i(16, s = Object.assign(Le.ChartConfig, A)), t.$$.dirty & 2560 && i(18, n = d ? A.TOOLBAR : 0), t.$$.dirty & 256 && i(17, r = Object.assign(Le.COLORS, b)), t.$$.dirty & 472289 && i(1, o = {
      showLogo: p,
      id: m,
      width: I - n,
      height: y,
      colors: r,
      scripts: g,
      config: s,
      indexBased: Y,
      timezone: E
    }), t.$$.dirty & 2 && i(3, u = `
    width: ${o.width}px;
    height: ${o.height}px;
`);
  }, [
    m,
    o,
    a,
    u,
    l,
    p,
    I,
    y,
    b,
    d,
    g,
    A,
    Y,
    E,
    P,
    L,
    s,
    r,
    n,
    F
  ];
}
class Rl extends Ie {
  constructor(e) {
    super(), ve(
      this,
      e,
      Nl,
      Pl,
      ge,
      {
        getChart: 4,
        showLogo: 5,
        id: 0,
        width: 6,
        height: 7,
        colors: 8,
        toolbar: 9,
        scripts: 10,
        config: 11,
        indexBased: 12,
        timezone: 13,
        data: 14,
        autoResize: 15
      },
      Ol
    );
  }
  get getChart() {
    return this.$$.ctx[4];
  }
  get showLogo() {
    return this.$$.ctx[5];
  }
  set showLogo(e) {
    this.$$set({ showLogo: e }), pe();
  }
  get id() {
    return this.$$.ctx[0];
  }
  set id(e) {
    this.$$set({ id: e }), pe();
  }
  get width() {
    return this.$$.ctx[6];
  }
  set width(e) {
    this.$$set({ width: e }), pe();
  }
  get height() {
    return this.$$.ctx[7];
  }
  set height(e) {
    this.$$set({ height: e }), pe();
  }
  get colors() {
    return this.$$.ctx[8];
  }
  set colors(e) {
    this.$$set({ colors: e }), pe();
  }
  get toolbar() {
    return this.$$.ctx[9];
  }
  set toolbar(e) {
    this.$$set({ toolbar: e }), pe();
  }
  get scripts() {
    return this.$$.ctx[10];
  }
  set scripts(e) {
    this.$$set({ scripts: e }), pe();
  }
  get config() {
    return this.$$.ctx[11];
  }
  set config(e) {
    this.$$set({ config: e }), pe();
  }
  get indexBased() {
    return this.$$.ctx[12];
  }
  set indexBased(e) {
    this.$$set({ indexBased: e }), pe();
  }
  get timezone() {
    return this.$$.ctx[13];
  }
  set timezone(e) {
    this.$$set({ timezone: e }), pe();
  }
  get data() {
    return this.$$.ctx[14];
  }
  set data(e) {
    this.$$set({ data: e }), pe();
  }
  get autoResize() {
    return this.$$.ctx[15];
  }
  set autoResize(e) {
    this.$$set({ autoResize: e }), pe();
  }
}
function Dl(t) {
  new ResizeObserver((i) => {
    let s = t.root.getBoundingClientRect();
    t.width = s.width, t.height = s.height;
  }).observe(t.root);
}
class Fl {
  constructor(e, i = {}) {
    this._data = i.data || {}, this._scripts = i.scripts || [];
    let s = i.id || "nvjs";
    this.hub = Ue.instance(s), this.meta = Fe.instance(s), this.scan = Ei.instance(s), this.events = he.instance(s), this.scriptHub = Zn.instance(s), this.hub.init(this._data), this.scriptHub.init(this._scripts), this.root = document.getElementById(e), this.comp = new Rl({
      target: this.root,
      props: i
    }), i.autoResize && Dl(this);
  }
  get id() {
    return this.comp.id;
  }
  set id(e) {
    this.comp.$set({ id: e });
  }
  get width() {
    return this.comp.width;
  }
  set width(e) {
    this.comp.$set({ width: e }), setTimeout(() => this.update());
  }
  get height() {
    return this.comp.height;
  }
  set height(e) {
    this.comp.$set({ height: e }), setTimeout(() => this.update());
  }
  get colors() {
    return this.comp.colors;
  }
  set colors(e) {
    this.comp.$set({ colors: e });
  }
  get showLogo() {
    return this.comp.showLogo;
  }
  set showLogo(e) {
    this.comp.$set({ id: e });
  }
  get scripts() {
    return this._scripts;
  }
  set scripts(e) {
    this._scripts = e, this.scriptHub.init(this._scripts), this.update("full");
  }
  get data() {
    return this._data;
  }
  set data(e) {
    this._data = e, this.update("full");
  }
  get config() {
    return this.comp.config;
  }
  set config(e) {
    this.comp.$set({ config: e });
  }
  get indexBased() {
    return this.comp.indexBased;
  }
  set indexBased(e) {
    this.comp.$set({ indexBased: e });
  }
  get timezone() {
    return this.comp.timezone;
  }
  set timezone(e) {
    this.comp.$set({ timezone: e }), setTimeout(() => this.update());
  }
  get layout() {
    let e = this.comp.getChart();
    return e ? e.getLayout() : null;
  }
  get range() {
    let e = this.comp.getChart();
    return e ? e.getRange() : null;
  }
  set range(e) {
    let i = this.comp.getChart();
    !i || i.setRange(e);
  }
  get cursor() {
    let e = this.comp.getChart();
    return e ? e.getCursor() : null;
  }
  set cursor(e) {
    let i = this.comp.getChart();
    !i || i.setCursor(e);
  }
  update(s = "layout", i = {}) {
    var [s, n] = s.split("-");
    const r = this.events;
    switch (s) {
      case "layout":
        r.emitSpec("chart", "update-layout", i);
        break;
      case "range":
        this.hub.updateRange(this.range), r.emitSpec("chart", "update-layout", i);
        break;
      case "full":
        this.hub.init(this._data), r.emitSpec("chart", "full-update", i);
        break;
      case "grid":
        if (n === void 0)
          r.emit("remake-grid");
        else {
          let o = `grid-${n}`;
          r.emitSpec(o, "remake-grid", i);
        }
        break;
      case "legend":
        if (n === void 0)
          r.emit("update-legend");
        else {
          let o = `legend-${n}`;
          r.emitSpec(o, "update-legend", i);
        }
        break;
    }
  }
  fullReset() {
    this.update("full", { resetRange: !0 });
  }
}
export {
  Ue as DataHub,
  Ei as DataScan,
  he as Events,
  Fe as MetaHub,
  Fl as NightVision,
  Zn as Scripts
};
