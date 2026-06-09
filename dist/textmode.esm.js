var ms = Object.defineProperty;
var ys = (r, t, e) => t in r ? ms(r, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : r[t] = e;
var a = (r, t, e) => ys(r, typeof t != "symbol" ? t + "" : t, e);
class vs {
  constructor(t, e, s) {
    a(this, "i");
    a(this, "h");
    a(this, "o");
    a(this, "u");
    a(this, "l");
    a(this, "_");
    a(this, "p");
    a(this, "m");
    a(this, "v");
    a(this, "M", !1);
    a(this, "A", /* @__PURE__ */ new Set());
    this.p = t, this.m = e, this.v = s, this.reset();
  }
  C() {
    if (this.o = this.i * this.m, this.u = this.h * this.v, this.l = Math.floor((this.p.width - this.o) / 2), this._ = Math.floor((this.p.height - this.u) / 2), this.A.size > 0) for (const t of this.A) t();
  }
  F(t) {
    this.A.add(t);
  }
  S(t) {
    this.A.delete(t);
  }
  reset() {
    this.M || (this.i = Math.max(1, Math.floor(this.p.width / this.m)), this.h = Math.max(1, Math.floor(this.p.height / this.v))), this.C();
  }
  P(t, e) {
    this.m = t, this.v = e, this.reset();
  }
  get cellWidth() {
    return this.m;
  }
  get cellHeight() {
    return this.v;
  }
  get cols() {
    return this.i;
  }
  set cols(t) {
    this.M = !0, this.i = Math.max(1, Math.floor(t)), typeof this.h != "number" && (this.h = Math.max(1, Math.floor(this.p.height / this.v))), this.C();
  }
  get rows() {
    return this.h;
  }
  set rows(t) {
    this.M = !0, this.h = Math.max(1, Math.floor(t)), typeof this.i != "number" && (this.i = Math.max(1, Math.floor(this.p.width / this.m))), this.C();
  }
  get width() {
    return this.o;
  }
  get height() {
    return this.u;
  }
  get offsetX() {
    return this.l;
  }
  get offsetY() {
    return this._;
  }
  responsive() {
    this.M = !1;
  }
  U(t, e) {
    const s = this.p.getBoundingClientRect(), i = t - s.left, n = e - s.top, h = this.p.width / s.width, o = n * (this.p.height / s.height), c = i * h - this.l, l = o - this._, u = Math.floor(c / this.m), f = Math.floor(l / this.v);
    return u >= 0 && u < this.i && f >= 0 && f < this.h ? { x: u - Math.floor((this.i - 1) / 2), y: f - Math.floor(this.h / 2) } : { x: -1 / 0, y: -1 / 0 };
  }
  k() {
    this.A.clear();
  }
}
class Ct {
  constructor() {
    a(this, "L", /* @__PURE__ */ new Set());
  }
  D(t) {
    this.L.add(t);
  }
  dispose() {
    for (const t of this.L) t();
    this.L.clear();
  }
}
class M extends Error {
  constructor(t, e, s) {
    super(M.O(t, e, s)), this.name = "TextmodeError";
  }
  static O(t, e, s = {}) {
    const { includeContext: i = !0, includeFooterArrows: n = !0 } = s;
    return `${t}${i && e && Object.keys(e).length > 0 ? `

📋 Context:` + Object.entries(e).map(([h, o]) => `
  - ${h}: ${M.R(o)}`).join("") : ""}${n ? `

${"↓".repeat(24)}
` : `

`}`;
  }
  static R(t) {
    if (t === null) return "null";
    if (t === void 0) return "undefined";
    if (typeof t == "string") return `"${t}"`;
    if (typeof t == "number" || typeof t == "boolean") return t + "";
    if (Array.isArray(t)) return t.length === 0 ? "[]" : t.length <= 5 ? `[${t.map((e) => M.R(e)).join(", ")}]` : `[${t.slice(0, 3).map((e) => M.R(e)).join(", ")}, ... +${t.length - 3} more]`;
    if (typeof t == "object") {
      const e = Object.keys(t);
      return e.length === 0 ? "{}" : e.length <= 3 ? `{ ${e.map((s) => `${s}: ${M.R(t[s])}`).join(", ")} }` : `{ ${e.slice(0, 2).map((s) => `${s}: ${M.R(t[s])}`).join(", ")}, ... +${e.length - 2} more }`;
    }
    return t + "";
  }
}
function ce(r, t, e) {
  if (r.idRangeOffset[e] === 0) return t + r.idDelta[e] & 65535;
  {
    const s = r.startCount.length, i = r.idRangeOffset[e] / 2 + (t - r.startCount[e]) - (s - e);
    if (i >= 0 && r.glyphIdArray && i < r.glyphIdArray.length) {
      const n = r.glyphIdArray[i];
      if (n !== 0) return n + r.idDelta[e] & 65535;
    }
  }
  return 0;
}
const Ae = /* @__PURE__ */ new WeakMap();
function ws(r) {
  return r.platformID === 0 || r.platformID === 3 && (r.encodingID === 1 || r.encodingID === 10);
}
function Ve(r) {
  const t = Ae.get(r);
  if (t) return t;
  const e = (function(s) {
    const i = s.cmap;
    if (!(i != null && i.tables)) return { characterTables: [], lookupTables: [] };
    const n = i.tables.map((c, l) => (function(u, f, d) {
      if (!(function(y) {
        return y.format === 4 || y.format === 12;
      })(f)) return null;
      const m = (function(y, w, v) {
        const g = /* @__PURE__ */ new Map();
        for (const x of y.encodings ?? []) x.tableIndex === v && g.set(Qt(x), x);
        for (const x of w.encodings ?? []) x.tableIndex === v && g.set(Qt(x), x);
        for (const [x, b] of Object.entries(y.ids ?? {})) {
          if (b !== v) continue;
          const A = xs(x, w.format, v);
          A && g.set(Qt(A), A);
        }
        return [...g.values()];
      })(u, f, d);
      return { table: f, tableIndex: d, encodings: m, isUnicode: m.some(ws) };
    })(i, c, l)).filter((c) => c !== null).filter((c) => (function(l) {
      return l.format === 4 ? (function(u) {
        if (!(u.startCount && u.endCount && u.idRangeOffset && u.idDelta)) return !1;
        for (let f = 0; f < u.startCount.length; f++) {
          const d = u.startCount[f], m = u.endCount[f];
          if (d !== 65535 || m !== 65535) {
            for (let y = d; y <= m; y++) if (ce(u, y, f) > 0) return !0;
          }
        }
        return !1;
      })(l) : (function(u) {
        if (!u.groups) return !1;
        for (let f = 0; f < u.groups.length; f += 3) {
          const d = u.groups[f], m = u.groups[f + 1], y = u.groups[f + 2];
          if (d <= m && y + (m - d) > 0) return !0;
        }
        return !1;
      })(l);
    })(c.table)), h = n.filter((c) => c.isUnicode), o = h.length > 0 ? h : n;
    return { characterTables: o, lookupTables: [...o].sort(bs) };
  })(r);
  return Ae.set(r, e), e;
}
function xs(r, t, e) {
  const s = /^p(\d+)e(\d+)$/.exec(r);
  return s ? { platformID: Number(s[1]), encodingID: Number(s[2]), format: t, tableIndex: e } : null;
}
function Qt(r) {
  return `${r.platformID}:${r.encodingID}:${r.format}:${r.tableIndex}`;
}
function bs(r, t) {
  const e = Me(r) - Me(t);
  return e !== 0 ? e : r.tableIndex - t.tableIndex;
}
function Me(r) {
  const t = r.isUnicode ? 0 : 3;
  return r.table.format === 12 ? t : r.table.format === 4 ? t + 1 : t + 2;
}
class As {
  I(t) {
    const e = [];
    return (function(s) {
      return Ve(s).characterTables;
    })(t).forEach(({ table: s }) => {
      if (s.format === 4) {
        const i = this.j(s);
        e.push(...i);
      } else if (s.format === 12) {
        const i = this.H(s);
        e.push(...i);
      }
    }), [...new Set(e)];
  }
  j(t) {
    const e = [];
    if (!(t.startCount && t.endCount && t.idRangeOffset && t.idDelta)) return e;
    for (let s = 0; s < t.startCount.length; s++) {
      const i = t.startCount[s], n = t.endCount[s];
      if (i !== 65535 || n !== 65535) for (let h = i; h <= n; h++)
        ce(t, h, s) > 0 && this.N(e, h);
    }
    return e;
  }
  H(t) {
    const e = [];
    if (!t.groups) return e;
    for (let s = 0; s < t.groups.length; s += 3) {
      const i = t.groups[s], n = t.groups[s + 1], h = t.groups[s + 2];
      for (let o = i; o <= n; o++)
        h + (o - i) > 0 && this.N(e, o);
    }
    return e;
  }
  N(t, e) {
    try {
      const s = String.fromCodePoint(e);
      t.push(s);
    } catch {
    }
  }
}
class je {
  constructor(t) {
    this.G = t, this.X = null, this.V = 0, this.h = 0, this.o = 0, this.u = 0, this.p = document.createElement("canvas"), this.W = this.p.getContext("2d", { alpha: !0 });
  }
  Y(t, e, s) {
    this.V = Math.ceil(Math.sqrt(t)), this.h = Math.ceil(t / this.V), this.o = e * this.V, this.u = s * this.h, this.p.width = this.o, this.p.height = this.u, this.p.style.width = this.o + "px", this.p.style.height = this.u + "px", this.W.imageSmoothingEnabled = !1, this.p.style.imageRendering = "pixelated", this.W.clearRect(0, 0, this.o, this.u);
  }
  Z() {
    this.X ? this.X.width === this.o && this.X.height === this.u || this.X.resize(this.o, this.u) : this.X = this.G.K(this.o, this.u, 1, { filter: "nearest", depth: !1 }), this.X.$(this.p);
  }
  k() {
    var t;
    (t = this.X) == null || t.dispose(), this.X = null;
  }
}
class Ms {
  constructor(t) {
    this.q = new je(t);
  }
  J(t, e, s, i) {
    this.q.Y(t.length, e.width, e.height);
    const n = this.q.W;
    n.textBaseline = "top", n.textAlign = "left", n.fillStyle = "white", this.tt(t, e, this.q.V, s, i), this.q.Z();
  }
  tt(t, e, s, i, n) {
    const h = i / n.head.unitsPerEm, o = this.q.W;
    for (let c = 0; c < t.length; c++) {
      const l = t[c], u = c % s, f = Math.floor(c / s), d = l.glyphData;
      if (!d) continue;
      const m = d.advanceWidth * h, y = u * e.width, w = f * e.height, v = y + 0.5 * e.width, g = w + 0.5 * e.height, x = Math.round(v - 0.5 * e.width), b = Math.round(g - 0.5 * i), A = x + 0.5 * (e.width - m), E = b + n.hhea.ascender * h;
      this.it(o, d, A, E, h);
    }
  }
  it(t, e, s, i, n) {
    if (!e || !e.xs || e.noc === 0) return;
    const { xs: h, ys: o, endPts: c, flags: l } = e;
    if (!(h && o && c && l)) return;
    t.beginPath();
    let u = 0;
    for (let f = 0; f < c.length; f++) {
      const d = c[f];
      if (!(d < u)) {
        if (d >= u) {
          const m = s + h[u] * n, y = i - o[u] * n;
          t.moveTo(m, y);
          let w = u + 1;
          for (; w <= d; )
            if (1 & l[w]) {
              const v = s + h[w] * n, g = i - o[w] * n;
              t.lineTo(v, g), w++;
            } else {
              const v = s + h[w] * n, g = i - o[w] * n;
              if (w + 1 > d) {
                const b = s + h[u] * n, A = i - o[u] * n;
                if (1 & l[u]) t.quadraticCurveTo(v, g, b, A);
                else {
                  const E = (v + b) / 2, S = (g + A) / 2;
                  t.quadraticCurveTo(v, g, E, S);
                }
                break;
              }
              const x = w + 1;
              if (1 & l[x]) {
                const b = s + h[x] * n, A = i - o[x] * n;
                t.quadraticCurveTo(v, g, b, A), w = x + 1;
              } else {
                const b = (v + (s + h[x] * n)) / 2, A = (g + (i - o[x] * n)) / 2;
                t.quadraticCurveTo(v, g, b, A), w = x;
              }
            }
          t.closePath();
        }
        u = d + 1;
      }
    }
    t.fill();
  }
  k() {
    this.q.k();
  }
  get framebuffer() {
    return this.q.X;
  }
  get columns() {
    return this.q.V;
  }
  get rows() {
    return this.q.h;
  }
}
class He {
  st(t, e) {
    let s = 0;
    for (const { table: i } of (function(n) {
      return Ve(n).lookupTables;
    })(t)) if (i.format === 4 ? s = this.et(e, i) : i.format === 12 && (s = this.rt(e, i)), s > 0) break;
    return s;
  }
  nt(t, e) {
    const s = e.codePointAt(0);
    return s === void 0 ? 0 : this.st(t, s);
  }
  ht(t, e) {
    const s = t.hmtx;
    return s && s.aWidth && s.aWidth.length !== 0 ? e < s.aWidth.length ? s.aWidth[e] : s.aWidth[s.aWidth.length - 1] : 0;
  }
  ot(t, e) {
    const s = e / t.head.unitsPerEm;
    return { lineHeight: t.hhea.ascender * s - t.hhea.descender * s + t.hhea.lineGap * s, scale: s };
  }
  et(t, e) {
    const s = e.endCount.length;
    let i = -1;
    for (let n = 0; n < s; n++) if (t <= e.endCount[n]) {
      i = n;
      break;
    }
    return i === -1 || t < e.startCount[i] ? 0 : ce(e, t, i);
  }
  rt(t, e) {
    const s = e.groups.length / 3;
    for (let i = 0; i < s; i++) {
      const n = e.groups[3 * i], h = e.groups[3 * i + 1], o = e.groups[3 * i + 2];
      if (t >= n && t <= h) return o + (t - n);
    }
    return 0;
  }
}
class _s {
  constructor() {
    a(this, "ct");
    this.ct = new He();
  }
  ut(t, e, s) {
    let i = 0;
    const n = this.ct.ot(s, e);
    let h = 0, o = !1;
    for (const c of t) {
      const l = c.glyphData;
      let u = 0;
      if (!l && (u = this.ct.nt(s, c.character), u === 0)) continue;
      const f = ((l == null ? void 0 : l.advanceWidth) ?? this.ct.ht(s, u)) * n.scale;
      if (i = Math.max(i, f), l) {
        const d = Math.max(0, l.yMax - l.yMin) * n.scale;
        h = Math.max(h, d), o = !0;
      }
    }
    return o || (h = n.lineHeight), { width: Math.ceil(i), height: Math.ceil(h) };
  }
}
const G = { readShort: (r, t) => (G.t.uint16[0] = r[t] << 8 | r[t + 1], G.t.int16[0]), readUshort: (r, t) => r[t] << 8 | r[t + 1], readUshorts(r, t, e) {
  const s = [];
  for (let i = 0; i < e; i++) s.push(G.readUshort(r, t + 2 * i));
  return s;
}, readUint(r, t) {
  const e = G.t.uint8;
  return e[3] = r[t], e[2] = r[t + 1], e[1] = r[t + 2], e[0] = r[t + 3], G.t.uint32[0];
}, readASCII(r, t, e) {
  let s = "";
  for (let i = 0; i < e; i++) s += String.fromCharCode(r[t + i]);
  return s;
}, t: (() => {
  const r = new ArrayBuffer(8);
  return { uint8: new Uint8Array(r), int16: new Int16Array(r), uint16: new Uint16Array(r), uint32: new Uint32Array(r) };
})() };
function It(r) {
  return r + 3 & -4;
}
function Ft(r, t, e) {
  r[t] = e >>> 8 & 255, r[t + 1] = 255 & e;
}
function J(r, t, e) {
  r[t] = e >>> 24 & 255, r[t + 1] = e >>> 16 & 255, r[t + 2] = e >>> 8 & 255, r[t + 3] = 255 & e;
}
function Es(r, t, e) {
  for (let s = 0; s < e.length; s++) r[t + s] = 255 & e.charCodeAt(s);
}
function $t(r, t, e) {
  const s = t + e;
  let i = 0;
  const n = G.t;
  for (let h = t; h < s; h += 4) n.uint8[3] = r[h] || 0, n.uint8[2] = r[h + 1] || 0, n.uint8[1] = r[h + 2] || 0, n.uint8[0] = r[h + 3] || 0, i = i + (n.uint32[0] >>> 0) >>> 0;
  return i >>> 0;
}
const Ts = { parseTab(r, t, e) {
  const s = { tables: [], ids: {}, encodings: [], off: t };
  r = new Uint8Array(r.buffer, t, e), t = 0;
  const i = G, n = i.readUshort;
  n(r, t);
  const h = n(r, t += 2);
  t += 2;
  const o = [];
  for (let c = 0; c < h; c++) {
    const l = n(r, t), u = n(r, t += 2);
    t += 2;
    const f = i.readUint(r, t);
    t += 4;
    const d = `p${l}e${u}`;
    let m = o.indexOf(f);
    if (m === -1) {
      let v;
      m = s.tables.length, o.push(f);
      const g = n(r, f);
      v = g === 4 ? this.parse4(r, f) : g === 12 ? this.parse12(r, f) : { format: g }, s.tables.push(v);
    }
    s.ids[d] = m;
    const y = s.tables[m], w = { platformID: l, encodingID: u, format: y.format, tableIndex: m };
    s.encodings.push(w), (y.encodings ?? (y.encodings = [])).push(w);
  }
  return s;
}, parse4(r, t) {
  const e = G, s = e.readUshort, i = e.readUshorts, n = t, h = s(r, t += 2);
  s(r, t += 2);
  const o = s(r, t += 2) >>> 1, c = { format: 4, encodings: [], searchRange: s(r, t += 2), entrySelector: 0, rangeShift: 0, endCount: [], startCount: [], idDelta: [], idRangeOffset: [], glyphIdArray: [] };
  t += 2, c.entrySelector = s(r, t), t += 2, c.rangeShift = s(r, t), t += 2, c.endCount = i(r, t, o), t += 2 * o, t += 2, c.startCount = i(r, t, o), t += 2 * o;
  for (let l = 0; l < o; l++) c.idDelta.push(e.readShort(r, t)), t += 2;
  return c.idRangeOffset = i(r, t, o), t += 2 * o, c.glyphIdArray = i(r, t, n + h - t >> 1), c;
}, parse12(r, t) {
  const e = G.readUint;
  e(r, t += 4), e(r, t += 4);
  const s = e(r, t += 4);
  t += 4;
  const i = new Uint32Array(3 * s);
  for (let n = 0; n < 3 * s; n += 3) i[n] = e(r, t + (n << 2)), i[n + 1] = e(r, t + (n << 2) + 4), i[n + 2] = e(r, t + (n << 2) + 8);
  return { format: 12, encodings: [], groups: i };
} }, Cs = { parseTab(r, t, e) {
  const s = G;
  t += 18;
  const i = s.readUshort(r, t);
  t += 2, t += 16;
  const n = s.readShort(r, t);
  t += 2;
  const h = s.readShort(r, t);
  t += 2;
  const o = s.readShort(r, t);
  t += 2;
  const c = s.readShort(r, t);
  return t += 2, t += 6, { unitsPerEm: i, xMin: n, yMin: h, xMax: o, yMax: c, indexToLocFormat: s.readShort(r, t) };
} }, Ss = { parseTab(r, t, e) {
  const s = G;
  t += 4;
  const i = s.readShort, n = s.readUshort;
  return { ascender: i(r, t), descender: i(r, t + 2), lineGap: i(r, t + 4), advanceWidthMax: n(r, t + 6), minLeftSideBearing: i(r, t + 8), minRightSideBearing: i(r, t + 10), xMaxExtent: i(r, t + 12), caretSlopeRise: i(r, t + 14), caretSlopeRun: i(r, t + 16), caretOffset: i(r, t + 18), res0: i(r, t + 20), res1: i(r, t + 22), res2: i(r, t + 24), res3: i(r, t + 26), metricDataFormat: i(r, t + 28), numberOfHMetrics: n(r, t + 30) };
} }, Ps = { parseTab(r, t, e, s) {
  const i = G, n = [], h = [], o = s.maxp.numGlyphs, c = s.hhea.numberOfHMetrics;
  let l = 0, u = 0, f = 0;
  for (; f < c; ) l = i.readUshort(r, t + (f << 2)), u = i.readShort(r, t + (f << 2) + 2), n.push(l), h.push(u), f++;
  for (; f < o; ) n.push(l), h.push(u), f++;
  return { aWidth: n, lsBearing: h };
} }, _e = { cmap: Ts, head: Cs, hhea: Ss, maxp: { parseTab(r, t, e) {
  const s = G;
  return s.readUint(r, t), t += 4, { numGlyphs: s.readUshort(r, t) };
} }, hmtx: Ps, loca: { parseTab(r, t, e, s) {
  const i = G, n = [], h = s.head.indexToLocFormat, o = s.maxp.numGlyphs + 1;
  if (h === 0) for (let c = 0; c < o; c++) n.push(i.readUshort(r, t + (c << 1)) << 1);
  else if (h === 1) for (let c = 0; c < o; c++) n.push(i.readUint(r, t + (c << 2)));
  return n;
} }, glyf: { parseTab(r, t, e, s) {
  const i = [], n = s.maxp.numGlyphs;
  for (let h = 0; h < n; h++) i.push(null);
  return i;
}, lt(r, t) {
  const e = G, s = r.ft, i = r.loca;
  if (i[t] === i[t + 1]) return null;
  const n = Mt.findTable(s, "glyf", r.dt);
  if (!n) return null;
  let h = n[0] + i[t];
  const o = {};
  if (o.noc = e.readShort(s, h), h += 2, o.xMin = e.readShort(s, h), h += 2, o.yMin = e.readShort(s, h), h += 2, o.xMax = e.readShort(s, h), h += 2, o.yMax = e.readShort(s, h), h += 2, o.xMin >= o.xMax || o.yMin >= o.yMax) return null;
  if (o.noc > 0) {
    o.endPts = [];
    for (let d = 0; d < o.noc; d++) o.endPts.push(e.readUshort(s, h)), h += 2;
    const c = e.readUshort(s, h);
    if (h += 2, s.length - h < c) return null;
    h += c;
    const l = o.endPts[o.noc - 1] + 1;
    o.flags = [];
    for (let d = 0; d < l; d++) {
      const m = s[h];
      if (h++, o.flags.push(m), 8 & m) {
        const y = s[h];
        h++;
        for (let w = 0; w < y; w++) o.flags.push(m), d++;
      }
    }
    o.xs = [];
    for (let d = 0; d < l; d++) {
      const m = o.flags[d], y = !!(16 & m);
      2 & m ? (o.xs.push(y ? s[h] : -s[h]), h++) : y ? o.xs.push(0) : (o.xs.push(e.readShort(s, h)), h += 2);
    }
    o.ys = [];
    for (let d = 0; d < l; d++) {
      const m = o.flags[d], y = !!(32 & m);
      4 & m ? (o.ys.push(y ? s[h] : -s[h]), h++) : y ? o.ys.push(0) : (o.ys.push(e.readShort(s, h)), h += 2);
    }
    let u = 0, f = 0;
    for (let d = 0; d < l; d++) u += o.xs[d], f += o.ys[d], o.xs[d] = u, o.ys[d] = f;
  } else o.parts = [], o.endPts = [], o.flags = [], o.xs = [], o.ys = [];
  return o;
} } }, Mt = { parse(r) {
  const t = new Uint8Array(r), e = _e, s = {}, i = { ft: t, _t: 0, dt: 0 };
  for (const n in e) {
    const h = n, o = Mt.findTable(t, h, 0);
    if (o) {
      const [c, l] = o;
      let u = s[c];
      u == null && (u = e[h].parseTab(t, c, l, i), s[c] = u), Object.assign(i, { [h]: u });
    }
  }
  return [i];
}, findTable(r, t, e) {
  const s = G, i = s.readUshort(r, e + 4);
  let n = e + 12;
  for (let h = 0; h < i; h++) {
    const o = s.readASCII(r, n, 4);
    s.readUint(r, n + 4);
    const c = s.readUint(r, n + 8), l = s.readUint(r, n + 12);
    if (o === t) return [c, l];
    n += 16;
  }
  return null;
}, T: _e, B: G };
let at;
function Nt(r) {
  if (r.length === 0) return [];
  const t = at !== void 0 ? at : typeof Intl < "u" && "Segmenter" in Intl ? (at = new Intl.Segmenter(void 0, { granularity: "grapheme" }), at) : (at = null, at);
  return t ? Array.from(t.segment(r), (e) => e.segment) : Array.from(r);
}
function Jt(r) {
  return Array.from(r, (t) => t.codePointAt(0)).filter((t) => t !== void 0);
}
class Rs {
  constructor() {
    a(this, "gt");
    this.gt = new He();
  }
  vt(t, e) {
    const s = [], i = /* @__PURE__ */ new Map();
    return t.forEach((n, h) => {
      const o = { character: n, unicode: Jt(n)[0] ?? 0, color: this.yt(h), glyphData: this.wt(e, n) };
      s.push(o), i.set(n, o);
    }), { array: s, map: i };
  }
  yt(t) {
    return [t % 256 / 255, Math.floor(t / 256) % 256 / 255, 0];
  }
  wt(t, e) {
    const s = e.codePointAt(0) || 0, i = this.gt.st(t, s);
    if (i === 0) return null;
    const n = this.gt.ht(t, i), h = Mt.T.glyf.lt(t, i);
    return h ? { ...h, advanceWidth: n } : null;
  }
}
async function Fs(r) {
  if (typeof DecompressionStream > "u") throw Error("[textmode.js] WOFF font loading requires DecompressionStream support.");
  const t = G, e = new Uint8Array(r);
  if (e.length < 44) throw Error("Invalid WOFF header.");
  if (t.readASCII(e, 0, 4) !== "wOFF") throw Error("Invalid WOFF signature.");
  const s = t.readUint(e, 4), i = t.readUshort(e, 12), n = t.readUint(e, 16);
  if (44 + 20 * i > e.length) throw Error("Invalid WOFF table directory.");
  const h = [];
  let o = 44;
  for (let l = 0; l < i; l++) {
    const u = t.readASCII(e, o, 4), f = t.readUint(e, o + 4), d = t.readUint(e, o + 8), m = t.readUint(e, o + 12);
    if (t.readUint(e, o + 16), f + d > e.length) throw Error(`Invalid WOFF table bounds for ${u}.`);
    if (d > m) throw Error(`Invalid WOFF table length for ${u}.`);
    h.push({ tag: u, offset: f, compLength: d, origLength: m }), o += 20;
  }
  const c = await Promise.all(h.map((l) => (async function(u, f) {
    const d = new Uint8Array(u.buffer, f.offset, f.compLength);
    let m;
    return f.compLength === f.origLength ? m = new Uint8Array(d) : (m = await (async function(y) {
      const w = new ReadableStream({ start(g) {
        g.enqueue(y), g.close();
      } }).pipeThrough(new DecompressionStream("deflate")), v = await new Response(w).arrayBuffer();
      return new Uint8Array(v);
    })(d), m = (function(y, w) {
      if (y.length === w) return y;
      if (y.length < w) {
        const v = new Uint8Array(w);
        return v.set(y), v;
      }
      return y.subarray(0, w);
    })(m, f.origLength)), { ...f, data: m };
  })(e, l)));
  return (function(l, u, f) {
    const d = f.length;
    let m = 1, y = 0;
    for (; m << 1 <= d; ) m <<= 1, y++;
    const w = 16 * m, v = 16 * d - w;
    let g = 12 + 16 * d;
    const x = {};
    for (const C of f) x[C.tag] = g, g = It(g + C.data.length);
    const b = Math.max(u || 0, g), A = new Uint8Array(b);
    J(A, 0, l), Ft(A, 4, d), Ft(A, 6, w), Ft(A, 8, y), Ft(A, 10, v);
    let E = 12;
    for (const C of f) Es(A, E, C.tag), E += 4, J(A, E, Ds(C)), E += 4, J(A, E, x[C.tag]), E += 4, J(A, E, C.data.length), E += 4;
    for (const C of f) A.set(C.data, x[C.tag]);
    const S = x.head;
    if (S !== void 0) {
      const C = (function(T, R) {
        const F = R + 8, k = [T[F], T[F + 1], T[F + 2], T[F + 3]];
        J(T, F, 0);
        const W = 2981146554 - ($t(T, 0, It(T.length)) >>> 0) >>> 0;
        return T[F] = k[0], T[F + 1] = k[1], T[F + 2] = k[2], T[F + 3] = k[3], W >>> 0;
      })(A, S);
      J(A, S + 8, C);
    }
    return A.buffer;
  })(s, n, c);
}
function Ds(r) {
  if (r.tag !== "head" || r.data.length < 12) return $t(r.data, 0, It(r.data.length));
  const t = new Uint8Array(r.data);
  return J(t, 8, 0), $t(t, 0, It(t.length));
}
class I extends Ct {
  constructor(e, s = 16) {
    super();
    a(this, "G");
    a(this, "Mt");
    a(this, "bt", []);
    a(this, "At", /* @__PURE__ */ new Map());
    a(this, "Ct", 16);
    a(this, "xt", { width: 0, height: 0 });
    a(this, "Ft");
    a(this, "St");
    a(this, "Pt");
    a(this, "Et");
    a(this, "Tt", !1);
    this.G = e, this.Ct = s, this.Ft = new As(), this.St = new Ms(e), this.Pt = new _s(), this.Et = new Rs();
  }
  kt(e = {}) {
    if (!this.Tt) throw new M("Cannot fork an uninitialized TextmodeFont.");
    const s = e.fontSize ?? this.Ct, i = new I(this.G, s);
    return i.Mt = this.Mt, i.bt = this.bt, i.At = new Map(this.At), i.Tt = !0, i.Lt(), i;
  }
  async Dt(e) {
    if (this.Tt) return;
    if (!e) throw new M("TextmodeFont requires an explicit font source.");
    const s = await this.Ot(e);
    await this.Rt(s);
  }
  Bt(e) {
    if (e === void 0) return this.Ct;
    this.Ct = e, this.Lt();
  }
  Lt() {
    this.xt = this.Pt.ut(this.bt, this.Ct, this.Mt), this.St.J(this.bt, this.xt, this.Ct, this.Mt);
  }
  async It(e) {
    try {
      const s = await this.Ot(e);
      await this.Rt(s);
    } catch (s) {
      throw new M("Failed to load font: " + (s instanceof Error ? s.message : "Unknown error"), { originalError: s });
    }
  }
  async Ot(e) {
    const s = await fetch(e);
    if (!s.ok) throw new M(`Failed to load font file: ${s.status} ${s.statusText}`);
    return s.arrayBuffer();
  }
  async Rt(e) {
    const s = await (async function(i) {
      const n = G.readASCII(new Uint8Array(i), 0, 4);
      if (n === "wOFF") {
        const h = await Fs(i);
        return Mt.parse(h);
      }
      if (n === "wOF2") throw Error("[textmode.js] WOFF2 fonts are not supported. Use .woff, .ttf, or .otf.");
      return Mt.parse(i);
    })(e);
    if (!s || s.length === 0) throw Error("Failed to parse font file");
    this.Mt = s[0], await this.jt();
  }
  async jt() {
    const e = this.Ft.I(this.Mt);
    if (e.length === 0) throw new M("[textmode.js] Font has no supported cmap glyphs.");
    const { array: s, map: i } = this.Et.vt(e, this.Mt);
    this.bt = s, this.At = i, this.Lt(), this.Tt = !0;
  }
  zt(e) {
    const s = this.At.get(e);
    return s ? s.color : [1, 1, 0];
  }
  Qt(e) {
    return Nt(e).map((s) => {
      const i = this.At.get(s);
      return i ? i.color : [1, 1, 0];
    });
  }
  dispose() {
    this.St.k(), super.dispose();
  }
  get framebuffer() {
    return this.St.framebuffer;
  }
  get characterMap() {
    return this.At;
  }
  get characters() {
    return this.bt;
  }
  get textureColumns() {
    return this.St.columns;
  }
  get textureRows() {
    return this.St.rows;
  }
  get columns() {
    return this.St.columns;
  }
  get rows() {
    return this.St.rows;
  }
  get cellWidth() {
    return this.xt.width;
  }
  get cellHeight() {
    return this.xt.height;
  }
  get cellDimensions() {
    return this.xt;
  }
  get maxGlyphDimensions() {
    return this.xt;
  }
  get fontSize() {
    return this.Ct;
  }
  get font() {
    return this.Mt;
  }
}
class Gs {
  constructor(t) {
    this.q = new je(t);
  }
  J(t, e, s, i) {
    this.q.Y(t.length, e.width, e.height), this.Ht(t, e, s, i), this.q.Z();
  }
  k() {
    this.q.k();
  }
  Ht(t, e, s, i) {
    const n = this.q.W, h = this.q.V;
    for (let o = 0; o < t.length; o++) {
      const c = o % h, l = Math.floor(o / h), u = o % i.columns, f = Math.floor(o / i.columns), d = i.marginX + u * (i.cellWidth + i.spacingX), m = i.marginY + f * (i.cellHeight + i.spacingY), y = c * e.width, w = l * e.height;
      n.drawImage(s, d, m, i.cellWidth, i.cellHeight, y, w, e.width, e.height);
    }
  }
  get framebuffer() {
    return this.q.X;
  }
  get columns() {
    return this.q.V;
  }
  get rows() {
    return this.q.h;
  }
}
const B = class B extends Ct {
  constructor(e, s, i) {
    super();
    a(this, "G");
    a(this, "St", null);
    a(this, "bt", []);
    a(this, "At", /* @__PURE__ */ new Map());
    a(this, "Vt", { width: 0, height: 0 });
    a(this, "Wt", { width: 0, height: 0 });
    a(this, "Ct", 0);
    a(this, "Yt");
    a(this, "Zt");
    a(this, "Kt");
    a(this, "$t");
    a(this, "Tt", !1);
    this.G = e, this.Ct = s === void 0 ? 0 : Math.abs(s), this.Kt = i;
  }
  kt(e = {}) {
    if (!this.Tt || !this.Zt || !this.$t) throw new M("Cannot fork an uninitialized TextmodeTileset.");
    const s = new B(this.G, e.fontSize ?? this.Ct);
    return s.bt = this.$t.characters, s.At = new Map(this.$t.characterMap), s.Vt = { ...this.$t.nativeCellDimensions }, s.Yt = this.Yt, s.Zt = { ...this.Zt }, s.Kt = this.Kt, s.Tt = !0, s.qt(this.$t), s.Jt(), s;
  }
  async Dt(e) {
    if (this.Tt) return;
    if (this.Kt = e ?? this.Kt, !this.Kt) throw new M("Cannot initialize a TextmodeTileset without source options.");
    const s = this.ti(this.Kt), i = this.ii(s);
    if (i) return this.qt(i), this.bt = i.characters, this.At = new Map(i.characterMap), this.Vt = { ...i.nativeCellDimensions }, this.Zt = { ...i.layout }, this.Ct === 0 && (this.Ct = Math.abs(this.Kt.fontSize ?? i.nativeCellDimensions.height)), this.Jt(), void (this.Tt = !0);
    const n = await this.si(this.Kt.source), h = this.ei(n), o = this.ri(this.Kt, h.width, h.height), c = this.ni(this.Kt, o), l = await this.hi(this.Kt, c, o.columns), u = this.oi(l), f = new Map(u.map((m) => [m.character, m])), d = new Gs(this.G);
    this.Yt = n, this.Zt = o, this.Vt = { width: o.cellWidth, height: o.cellHeight }, this.bt = u, this.At = f, this.Ct === 0 && (this.Ct = Math.abs(this.Kt.fontSize ?? o.cellHeight)), this.Jt(), d.J(this.bt, this.Vt, n, o), this.qt({ cacheKey: s, textureAtlas: d, characters: u, characterMap: f, nativeCellDimensions: { ...this.Vt }, layout: { ...o }, referenceCount: 0 }), this.Tt = !0;
  }
  Bt(e) {
    if (e === void 0) return this.Ct;
    this.Ct = Math.abs(e), this.Jt();
  }
  zt(e) {
    const s = this.At.get(e);
    return s ? s.color : [1, 1, 0];
  }
  Qt(e) {
    return Nt(e).map((s) => this.zt(s));
  }
  dispose() {
    this.ai(), super.dispose();
  }
  qt(e) {
    this.$t !== e && (this.ai(), B.ci(this.G).set(e.cacheKey, e), e.referenceCount += 1, this.$t = e, this.St = e.textureAtlas);
  }
  ai() {
    const e = this.$t;
    if (e) {
      if (e.referenceCount -= 1, e.referenceCount <= 0) {
        e.textureAtlas.k();
        const s = B.Nt.get(this.G);
        s == null || s.delete(e.cacheKey);
      }
      this.$t = void 0, this.St = null;
    } else this.St = null;
  }
  ti(e) {
    return JSON.stringify({ source: this.ui(e.source), columns: e.columns, rows: e.rows, count: e.count ?? null, margin: e.margin ?? null, marginX: e.marginX ?? null, marginY: e.marginY ?? null, spacing: e.spacing ?? null, spacingX: e.spacingX ?? null, spacingY: e.spacingY ?? null, mapping: this.li(e) });
  }
  ui(e) {
    return typeof e == "string" || e instanceof URL ? "url:" + (e + "") : "object:" + B.fi(e);
  }
  li(e) {
    return e.map === void 0 ? "auto:32" : Array.isArray(e.map) ? "rows:" + e.map.join(`
`) : e.map instanceof URL ? "url:" + (e.map + "") : this.di(e.map) ? "inline:" + e.map : "url:" + e.map;
  }
  ii(e) {
    var s;
    return (s = B.Nt.get(this.G)) == null ? void 0 : s.get(e);
  }
  static ci(e) {
    let s = B.Nt.get(e);
    return s || (s = /* @__PURE__ */ new Map(), B.Nt.set(e, s)), s;
  }
  static fi(e) {
    const s = B.Gt.get(e);
    if (s !== void 0) return s;
    const i = B.Xt++;
    return B.Gt.set(e, i), i;
  }
  async si(e) {
    if (typeof e != "string" && !(e instanceof URL)) return e;
    const s = e + "";
    return new Promise((i, n) => {
      const h = new Image();
      h.crossOrigin = "anonymous", h.onload = () => i(h), h.onerror = () => n(new M("Failed to load tileset image: " + s)), h.src = s;
    });
  }
  async hi(e, s, i) {
    if (e.map !== void 0) {
      const n = await this._i(e.map), h = this.pi(n, s, i);
      return this.mi(h, "tileset map"), h;
    }
    return this.gi(s);
  }
  async _i(e) {
    return Array.isArray(e) ? [...e] : e instanceof URL ? this.yi(await this.wi(e)) : this.di(e) ? this.yi(e) : this.yi(await this.wi(e));
  }
  pi(e, s, i) {
    const n = Math.ceil(s / i);
    if (e.length !== n) throw new M(`Tileset map must contain exactly ${n} row${n === 1 ? "" : "s"} for ${s} mapped tile${s === 1 ? "" : "s"}.`);
    const h = [];
    let o = s;
    for (let c = 0; c < e.length; c++) {
      const l = Nt(e[c]), u = Math.min(i, o);
      if (l.length !== u) throw new M(`Tileset map row ${c + 1} must contain exactly ${u} character cell${u === 1 ? "" : "s"}.`);
      h.push(...l), o -= u;
    }
    return h;
  }
  gi(e) {
    this.Mi(e);
    const s = [];
    for (let i = 0; i < e; i++) s.push(String.fromCodePoint(32 + i));
    return s;
  }
  async wi(e) {
    let s;
    try {
      s = await fetch(e);
    } catch (i) {
      throw new M("Failed to load tileset map: " + (i instanceof Error ? i.message : "Unknown error"));
    }
    if (!s.ok) throw new M(`Failed to load tileset map: ${s.status} ${s.statusText}`);
    return s.text();
  }
  yi(e) {
    const s = e.split(/\r\n|\n|\r/);
    return s.length > 0 && s[s.length - 1] === "" && s.pop(), s;
  }
  di(e) {
    return !(!e.includes(`
`) && !e.includes("\r")) || !this.bi(e);
  }
  bi(e) {
    return /^(?:[a-z]+:)?\/\//i.test(e) || e.startsWith("/") || e.startsWith("./") || e.startsWith("../") || e.includes("\\") || /\.[a-z0-9]+(?:$|[?#])/i.test(e);
  }
  ei(e) {
    const s = e, i = s.naturalWidth ?? s.videoWidth ?? s.displayWidth ?? s.width, n = s.naturalHeight ?? s.videoHeight ?? s.displayHeight ?? s.height;
    if (typeof i != "number" || typeof n != "number" || i <= 0 || n <= 0) throw new M("Tileset source must expose positive pixel dimensions.");
    return { width: i, height: n };
  }
  ri(e, s, i) {
    const n = e.marginX ?? e.margin ?? 0, h = e.marginY ?? e.margin ?? 0, o = e.spacingX ?? e.spacing ?? 0, c = e.spacingY ?? e.spacing ?? 0;
    if (e.columns <= 0 || e.rows <= 0) throw new M("Tileset columns and rows must be greater than 0.");
    const l = s - 2 * n - o * (e.columns - 1), u = i - 2 * h - c * (e.rows - 1);
    if (l <= 0 || u <= 0) throw new M("Tileset margins and spacing leave no usable tile area.");
    const f = l / e.columns, d = u / e.rows;
    if (!Number.isInteger(f) || !Number.isInteger(d)) throw new M("Tileset dimensions do not divide evenly. Check columns, rows, margins, and spacing.");
    return { columns: e.columns, rows: e.rows, marginX: n, marginY: h, spacingX: o, spacingY: c, cellWidth: f, cellHeight: d };
  }
  ni(e, s) {
    const i = s.columns * s.rows, n = e.count ?? i;
    if (n <= 0 || n > i) throw new M(`Tileset count must be between 1 and ${i}.`);
    return n;
  }
  Mi(e) {
    if (32 + e - 1 > 1114111) throw new M("Tileset automatic character assignment exceeds the supported Unicode range.");
  }
  mi(e, s) {
    const i = /* @__PURE__ */ new Map();
    for (let n = 0; n < e.length; n++) {
      const h = e[n], o = i.get(h);
      if (o !== void 0) throw new M(`${s} contains duplicate character ${this.Ai(h)} at tile ${o + 1} and tile ${n + 1}.`);
      i.set(h, n);
    }
  }
  Ai(e) {
    const s = Jt(e);
    if (s.length === 0) return '""';
    const i = s.map((n) => "U+" + n.toString(16).toUpperCase().padStart(4, "0")).join(" ");
    return `${JSON.stringify(e)} (${i})`;
  }
  oi(e) {
    const s = [];
    for (let i = 0; i < e.length; i++) {
      const n = e[i], h = Jt(n)[0];
      if (h === void 0) throw new M(`Tileset character mapping produced an empty character at tile ${i + 1}.`);
      s.push({ character: n, unicode: h, color: this.Ci(i) });
    }
    return s;
  }
  Ci(e) {
    return [(255 & e) / 255, (e >> 8 & 255) / 255, (e >> 16 & 255) / 255];
  }
  Jt() {
    if (this.Vt.height <= 0 || this.Vt.width <= 0) return;
    const e = Math.max(1, this.Ct || this.Vt.height), s = e / this.Vt.height;
    this.Wt = { width: Math.max(1, Math.round(this.Vt.width * s)), height: e };
  }
  get characters() {
    return this.bt;
  }
  get characterMap() {
    return this.At;
  }
  get framebuffer() {
    return this.St.framebuffer;
  }
  get fontFramebuffer() {
    return this.framebuffer;
  }
  get columns() {
    return this.St.columns;
  }
  get rows() {
    return this.St.rows;
  }
  get textureColumns() {
    return this.columns;
  }
  get textureRows() {
    return this.rows;
  }
  get nativeCellDimensions() {
    return this.Vt;
  }
  get maxGlyphDimensions() {
    return this.Wt;
  }
  get cellDimensions() {
    return this.Wt;
  }
  get cellWidth() {
    return this.Wt.width;
  }
  get cellHeight() {
    return this.Wt.height;
  }
  get fontSize() {
    return this.Ct;
  }
};
a(B, "Nt", /* @__PURE__ */ new WeakMap()), a(B, "Gt", /* @__PURE__ */ new WeakMap()), a(B, "Xt", 1);
let X = B;
const or = Object.freeze(Object.defineProperty({ __proto__: null, TextmodeFont: I, TextmodeTileset: X }, Symbol.toStringTag, { value: "Module" })), bt = ["normal", "additive", "multiply", "screen", "subtract", "darken", "lighten", "overlay", "softLight", "hardLight", "colorDodge", "colorBurn", "difference", "exclusion"];
function V(r) {
  return r * (Math.PI / 180);
}
function gt(r) {
  return r * (180 / Math.PI);
}
function Ee(r, t, e, s) {
  return gt(Math.atan2(s - t, e - r));
}
function yt(r, t, e, s) {
  return Math.hypot(e - r, s - t);
}
function O(r, t, e) {
  return Math.min(Math.max(r, t), e);
}
const Ls = ["linear", "inQuad", "outQuad", "inOutQuad", "inCubic", "outCubic", "inOutCubic", "inQuart", "outQuart", "inOutQuart", "inQuint", "outQuint", "inOutQuint", "inSine", "outSine", "inOutSine", "inExpo", "outExpo", "inOutExpo", "inCirc", "outCirc", "inOutCirc", "inBack", "outBack", "inOutBack", "inElastic", "outElastic", "inOutElastic", "inBounce", "outBounce", "inOutBounce"], Te = 1.70158, Ce = 2.5949095, Se = 2 * Math.PI / 3, Pe = 2 * Math.PI / 4.5;
function Dt(r) {
  if (r < 1 / 2.75) return 7.5625 * r * r;
  if (r < 2 / 2.75) {
    const i = r - 0.5454545454545454;
    return 7.5625 * i * i + 0.75;
  }
  if (r < 2.5 / 2.75) {
    const i = r - 0.8181818181818182;
    return 7.5625 * i * i + 0.9375;
  }
  const s = r - 2.625 / 2.75;
  return 7.5625 * s * s + 0.984375;
}
const Us = { linear: (r) => r, inQuad: (r) => r * r, outQuad: (r) => 1 - Math.pow(1 - r, 2), inOutQuad: (r) => r < 0.5 ? 2 * r * r : 1 - Math.pow(-2 * r + 2, 2) / 2, inCubic: (r) => r * r * r, outCubic: (r) => 1 - Math.pow(1 - r, 3), inOutCubic: (r) => r < 0.5 ? 4 * r * r * r : 1 - Math.pow(-2 * r + 2, 3) / 2, inQuart: (r) => r * r * r * r, outQuart: (r) => 1 - Math.pow(1 - r, 4), inOutQuart: (r) => r < 0.5 ? 8 * Math.pow(r, 4) : 1 - Math.pow(-2 * r + 2, 4) / 2, inQuint: (r) => r * r * r * r * r, outQuint: (r) => 1 - Math.pow(1 - r, 5), inOutQuint: (r) => r < 0.5 ? 16 * Math.pow(r, 5) : 1 - Math.pow(-2 * r + 2, 5) / 2, inSine: (r) => 1 - Math.cos(r * Math.PI / 2), outSine: (r) => Math.sin(r * Math.PI / 2), inOutSine: (r) => -(Math.cos(Math.PI * r) - 1) / 2, inExpo: (r) => r === 0 ? 0 : Math.pow(2, 10 * r - 10), outExpo: (r) => r === 1 ? 1 : 1 - Math.pow(2, -10 * r), inOutExpo: (r) => r === 0 || r === 1 ? r : r < 0.5 ? Math.pow(2, 20 * r - 10) / 2 : (2 - Math.pow(2, -20 * r + 10)) / 2, inCirc: (r) => 1 - Math.sqrt(1 - Math.pow(r, 2)), outCirc: (r) => Math.sqrt(1 - Math.pow(r - 1, 2)), inOutCirc: (r) => r < 0.5 ? (1 - Math.sqrt(1 - Math.pow(2 * r, 2))) / 2 : (Math.sqrt(1 - Math.pow(-2 * r + 2, 2)) + 1) / 2, inBack: (r) => 2.70158 * r * r * r - Te * r * r, outBack: (r) => 1 + 2.70158 * Math.pow(r - 1, 3) + Te * Math.pow(r - 1, 2), inOutBack: (r) => r < 0.5 ? Math.pow(2 * r, 2) * (7.189819 * r - Ce) / 2 : (Math.pow(2 * r - 2, 2) * (3.5949095 * (2 * r - 2) + Ce) + 2) / 2, inElastic: (r) => r === 0 || r === 1 ? r : -Math.pow(2, 10 * r - 10) * Math.sin((10 * r - 10.75) * Se), outElastic: (r) => r === 0 || r === 1 ? r : Math.pow(2, -10 * r) * Math.sin((10 * r - 0.75) * Se) + 1, inOutElastic: (r) => r === 0 || r === 1 ? r : r < 0.5 ? -Math.pow(2, 20 * r - 10) * Math.sin((20 * r - 11.125) * Pe) / 2 : Math.pow(2, -20 * r + 10) * Math.sin((20 * r - 11.125) * Pe) / 2 + 1, inBounce: (r) => 1 - Dt(1 - r), outBounce: Dt, inOutBounce: (r) => r < 0.5 ? (1 - Dt(1 - 2 * r)) / 2 : (1 + Dt(2 * r - 1)) / 2 };
function Bs(r, t) {
  const e = Us[r];
  if (!e) throw Error(`Unknown easing function "${r}". Available easing functions: ${Ls.join(", ")}.`);
  return e((function(s) {
    return Number.isNaN(s) ? 0 : s === 1 / 0 ? 1 : s === -1 / 0 ? 0 : O(s, 0, 1);
  })(t));
}
function Ot(r) {
  return (r % 360 + 360) % 360 / 360;
}
function et(r = new Float32Array(16)) {
  return r[0] = 1, r[1] = 0, r[2] = 0, r[3] = 0, r[4] = 0, r[5] = 1, r[6] = 0, r[7] = 0, r[8] = 0, r[9] = 0, r[10] = 1, r[11] = 0, r[12] = 0, r[13] = 0, r[14] = 0, r[15] = 1, r;
}
function Re(r, t, e, s = new Float32Array(16)) {
  let i = r[0] - t[0], n = r[1] - t[1], h = r[2] - t[2], o = Math.hypot(i, n, h);
  o === 0 ? h = 1 : (o = 1 / o, i *= o, n *= o, h *= o);
  let c = e[1] * h - e[2] * n, l = e[2] * i - e[0] * h, u = e[0] * n - e[1] * i;
  o = Math.hypot(c, l, u), o === 0 ? (c = 1, l = 0, u = 0) : (o = 1 / o, c *= o, l *= o, u *= o);
  const f = n * u - h * l, d = h * c - i * u, m = i * l - n * c;
  return s[0] = c, s[1] = f, s[2] = i, s[3] = 0, s[4] = l, s[5] = d, s[6] = n, s[7] = 0, s[8] = u, s[9] = m, s[10] = h, s[11] = 0, s[12] = -(c * r[0] + l * r[1] + u * r[2]), s[13] = -(f * r[0] + d * r[1] + m * r[2]), s[14] = -(i * r[0] + n * r[1] + h * r[2]), s[15] = 1, s;
}
var Qe = ((r) => (r[r.SILENT = 0] = "SILENT", r[r.WARNING = 1] = "WARNING", r[r.ERROR = 2] = "ERROR", r[r.THROW = 3] = "THROW", r))(Qe || {});
const tt = class tt {
  constructor() {
    a(this, "Kt", { globalLevel: 3 });
    a(this, "Fi", /* @__PURE__ */ new Set());
  }
  static Si() {
    return tt.xi || (tt.xi = new tt()), tt.xi;
  }
  Pi(t, e) {
    const s = "%c[textmode.js] Oops! (╯°□°)╯︵ Something went wrong in your code.", i = "color: #f44336; font-weight: bold; background: #ffebee; padding: 2px 6px; border-radius: 3px;";
    switch (this.Kt.globalLevel) {
      case 0:
        return !1;
      case 1:
        return !!this.Ei("warning", t, e) && (console.group(s, i), console.warn(M.O(t, e, { includeFooterArrows: !1 })), console.groupEnd(), !1);
      case 2:
        return !!this.Ei("error", t, e) && (console.group(s, i), console.error(M.O(t, e, { includeFooterArrows: !1 })), console.groupEnd(), !1);
      default:
        throw new M(t, e);
    }
  }
  Ti(t, e, s) {
    return !!t || (this.Pi(e, s), !1);
  }
  ki(t) {
    this.Kt.globalLevel = t;
  }
  Li(t) {
    t.globalLevel !== void 0 && (this.Kt.globalLevel = t.globalLevel);
  }
  Di() {
    this.Fi.clear();
  }
  Ei(t, e, s) {
    const i = this.Oi(t, e, s);
    return !this.Fi.has(i) && (this.Fi.add(i), !0);
  }
  Oi(t, e, s) {
    return `${t}|${e}|${s ? this.Ri(s) : ""}`;
  }
  Ri(t) {
    return t == null ? t + "" : typeof t == "number" || typeof t == "boolean" || typeof t == "string" ? JSON.stringify(t) : Array.isArray(t) ? `[${t.map((e) => this.Ri(e)).join(",")}]` : typeof t == "object" ? `{${Object.entries(t).sort(([e], [s]) => e.localeCompare(s)).map(([e, s]) => `${JSON.stringify(e)}:${this.Ri(s)}`).join(",")}}` : t + "";
  }
};
a(tt, "xi", null);
let te = tt;
const dt = te.Si();
class Z {
  constructor(t = 0, e = 0, s = 0, i = 0, n = 0, h = 0, o = 0, c = 1, l = 0) {
    a(this, "Bi");
    a(this, "Ii");
    a(this, "ji");
    a(this, "zi");
    a(this, "Qi");
    a(this, "Hi");
    a(this, "Ni");
    a(this, "Gi");
    a(this, "Xi");
    this.Bi = t, this.Ii = e, this.ji = s, this.zi = i, this.Qi = n, this.Hi = h, this.Ni = o, this.Gi = c, this.Xi = l;
  }
  static Vi(t, e) {
    const s = t.Yi.Wi, i = t.Yi.Zi, n = t.Yi.Ki, h = t.Yi.$i, o = t.Yi.qi, c = t.Yi.Ji;
    if (t.Yi.ts) {
      const l = 0.5 * Math.max(1, e) / Math.tan(0.5 * t.Yi.ss);
      return new Z(s, i, n + l, s, i, n, h, o, c);
    }
    return new Z(t.Yi.es, t.Yi.rs, t.Yi.ns, s, i, n, h, o, c);
  }
  hs(t) {
    t.Yi.cs(this.Bi, this.Ii, this.ji, this.zi, this.Qi, this.Hi, this.Ni, this.Gi, this.Xi);
  }
  setPosition(t, e, s) {
    return this.Bi = t, this.Ii = e, this.ji = s, this;
  }
  lookAt(t, e, s) {
    return this.zi = t, this.Qi = e, this.Hi = s, this;
  }
  setUp(t, e, s) {
    return this.Ni = t, this.Gi = e, this.Xi = s, this;
  }
  move(t, e, s) {
    return this.Bi += t, this.Ii += e, this.ji += s, this.zi += t, this.Qi += e, this.Hi += s, this;
  }
  copy() {
    return new Z(this.Bi, this.Ii, this.ji, this.zi, this.Qi, this.Hi, this.Ni, this.Gi, this.Xi);
  }
  get eyeX() {
    return this.Bi;
  }
  get eyeY() {
    return this.Ii;
  }
  get eyeZ() {
    return this.ji;
  }
  get targetX() {
    return this.zi;
  }
  get targetY() {
    return this.Qi;
  }
  get targetZ() {
    return this.Hi;
  }
  get upX() {
    return this.Ni;
  }
  get upY() {
    return this.Gi;
  }
  get upZ() {
    return this.Xi;
  }
}
class ks {
  constructor(t) {
    a(this, "us", null);
    a(this, "ts", !0);
    a(this, "es", 0);
    a(this, "rs", 0);
    a(this, "ns", 0);
    a(this, "Wi", 0);
    a(this, "Zi", 0);
    a(this, "Ki", 0);
    a(this, "$i", 0);
    a(this, "qi", 1);
    a(this, "Ji", 0);
    a(this, "ls", "perspective");
    a(this, "fs");
    a(this, "ds");
    a(this, "_s");
    this.ts = t.Yi.ts, this.es = t.Yi.es, this.rs = t.Yi.rs, this.ns = t.Yi.ns, this.Wi = t.Yi.Wi, this.Zi = t.Yi.Zi, this.Ki = t.Yi.Ki, this.$i = t.Yi.$i, this.qi = t.Yi.qi, this.Ji = t.Yi.Ji, t.Yi.ts || (this.us = new Z(t.Yi.es, t.Yi.rs, t.Yi.ns, t.Yi.Wi, t.Yi.Zi, t.Yi.Ki, t.Yi.$i, t.Yi.qi, t.Yi.Ji)), t.Yi.ps ? this.ls = "ortho" : (this.ls = "perspective", this.fs = 180 * t.Yi.ss / Math.PI), this.ds = t.Yi.ds, this._s = t.Yi._s;
  }
  createCamera(t, e) {
    let s;
    if (this.ts) {
      const i = Math.max(1, t), n = this.fs ?? e, h = 0.5 * i / Math.tan(n * Math.PI / 360);
      s = new Z(this.Wi, this.Zi, this.Ki + h, this.Wi, this.Zi, this.Ki, this.$i, this.qi, this.Ji);
    } else s = new Z(this.es, this.rs, this.ns, this.Wi, this.Zi, this.Ki, this.$i, this.qi, this.Ji);
    return this.setCamera(s), s;
  }
  setCamera(t) {
    this.us = t, this.ts = !1, this.es = t.eyeX, this.rs = t.eyeY, this.ns = t.eyeZ, this.Wi = t.targetX, this.Zi = t.targetY, this.Ki = t.targetZ, this.$i = t.upX, this.qi = t.upY, this.Ji = t.upZ;
  }
  resetCamera() {
    this.us = null, this.ts = !0, this.es = 0, this.rs = 0, this.ns = 0, this.Wi = 0, this.Zi = 0, this.Ki = 0, this.$i = 0, this.qi = 1, this.Ji = 0;
  }
  camera(t, e, s, i = 0, n = 0, h = 0, o = 0, c = 1, l = 0) {
    this.us ? this.us.setPosition(t, e, s).lookAt(i, n, h).setUp(o, c, l) : this.us = new Z(t, e, s, i, n, h, o, c, l), this.ts = !1, this.es = t, this.rs = e, this.ns = s, this.Wi = i, this.Zi = n, this.Ki = h, this.$i = o, this.qi = c, this.Ji = l;
  }
  lookAt(t, e, s, i, n, h) {
    this.us && (this.us.lookAt(t, e, s), i === void 0 && n === void 0 && h === void 0 || this.us.setUp(i ?? this.us.upX, n ?? this.us.upY, h ?? this.us.upZ)), this.Wi = t, this.Zi = e, this.Ki = s, i !== void 0 && (this.$i = i), n !== void 0 && (this.qi = n), h !== void 0 && (this.Ji = h);
  }
  perspective(t, e, s) {
    this.ls = "perspective", t !== void 0 && (this.fs = t), e !== void 0 && (this.ds = e), s !== void 0 && (this._s = s);
  }
  ortho(t, e) {
    this.ls = "ortho", t !== void 0 && (this.ds = t), e !== void 0 && (this._s = e);
  }
  getActiveCamera() {
    return this.us;
  }
  applyToState(t) {
    if (this.ls === "ortho" ? t.Yi.gs(this.ds, this._s) : t.Yi.vs(this.fs, this.ds, this._s), this.ts) return t.Yi.ws(), void (this.Wi === 0 && this.Zi === 0 && this.Ki === 0 && this.$i === 0 && this.qi === 1 && this.Ji === 0 || t.Yi.Ms(this.Wi, this.Zi, this.Ki, this.$i, this.qi, this.Ji));
    t.Yi.cs(this.es, this.rs, this.ns, this.Wi, this.Zi, this.Ki, this.$i, this.qi, this.Ji);
  }
}
const Is = Object.freeze({ source: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAITElEQVR42u1d2XLkIAz0//909jWVHYPUhyR7SNXUHnhsDI3ULQlyXdf1s/usfiLtv6/5+/dPz4r0Y3XN6ru750fHIPv8u3FC3u/umt39b/oXf/nfN7gb0FU7OwBo+18gRiYrsgAQgN5dd7dYVAD4ND+jAJCxHp8GKfLyu9WwAyVjAVfvkgVA1PoEF5jfBUxpX012BphZAEdWPeviVgBYjVcYAHc3Qgc4stJUFijCAVgAZFwQyyEibYn+5VxAZFI+mTiFj4/4bYZEoi5gBzC1f9+12TiAyge6J5ABEEMCs8QPVTHI6qdUwPlc1OQP//gHTrEaoyuQsTCohagGohwACMPNtKOrbWfSMiSzkoMgZlwV6MrwmI8AWAVMMhoW9bXI5K6IJ6oCUAsTVUU7tZUNdBELdAYAohqZkZiR560UzK49S5KRMK4NANHViLQ7Qq27OACaC4ia2Kxejy4K9Pm0C+gEADIpWSugirQhk6/gANkwM8wBOkkgk0mrYvkulRCxUEggKwSAJ8jA8xkQB4iij5GBzPfQFZJZRVkFcwAgkmHZ2Ds6ic72iZHNEgBk0rUrQhm5PwqADEvPyrBpbg/mAKxpRy1AliDtJKEaAEiwZ8jk1yWDsjo840ZWQZcqAERkMds3hcqisoHsgxUVNRmXIBogqY9nXZCh7zNcABL0KVwlMoLXAYDNvY8WHkbKemQgq6OzcXxhJIuNhcv63wWIbCn6fySQKCgMmejM/RX+LZNZrOi/SmWoXMBtLmCVGmYA4ACMcsVMAQBjAYlnaAIpTNVrdMCZXHp2kBmAd/IAwJLWhVIzE6y0INn/V4Sqp1qAZU0gAwBV2bLLRLMAYAs+OjlAKBDEsGgFy87G29XZQLZ/T7iejgSez4vrAdQ6nSlbFpc90yQPLeqMhqpZl8Nsfr1QEuTy2Yr7u2QnS3JZ/hDc7Zutl7hSN6vQ8eo4APt8tcphikUjZedtAFBJJHQAIwOMvJ8SACxAkXR4CgBIPvppFgCNQ7ChcGV8JVqBBQPA6QLexgHU76cmgVsAOFhyhwpAq4YdKkB5f7sKOJ8vjwOoV7Di+24Vwuh0dyTUdU4hnAuokoWuegM3ANhcQQYUSLZ1HADYejxH/l6VDq7OpAp2ZnlMoKMkTKUymFWqyogqr0GJcZgDsBVD7CpRhaozGU3X1u8JpelbC5CNbLE6vhIAQKBEEiFU+/lSAOy2XrET5DbBLAl0Vy0r8gnEzqKjhU89gHDXzxM3SqjLtZxlXdbzAaZ03BEsYUPJkwBmPSAi6oPVMlC1c0eVDXRUPasKa5H7U7mA7kghuzFjSkWQas/CriAk+X49O2kqs3GZAyicoWoWALuCEDC0/TwLoNbZ3fUAbhlLA+AOZU/hAKpYv6peIQsCRRzj1AOczzkgYspBEGwkVHxCyTklY8r7ObalBUCE+XAHC6/YeNJdEeQCwKc+Bce/bkDRNOfTC0LcoeZsqvvPNVoL4NhfP7EghI1GqgtCiP2b+HZkpOyL3cvGxPrZgpCuI2LU+RoZAJjVs0NpJg6hjKUrK44mqYAlAM7niz8/5p/q41rVEUml9s+OD3JNevzeCoApRZfo+KAJJBgAUwI7VRM82QIorEV4nKoAkH3pae3oBGUBwFqMkQCIMGzFGX3KdvUEKayF8hmlLuCJAMhKMZVMc4OgjQMwgzuh3Ukgqwh2Kwf4hoyectNGmSXIsmaElKBFjVPaHeHeyBY2tsQsFQjqBsDKFyPtf/+faa8AwCqdOwIA7NFmb7IADAmMAmBVycOUrLcDYPfv3QS5vp9NOKE+OQpAdPPpsQBGC8BE6hRb1BTfScvALgBkfX8FB3DkBth0ehkAjgrwASAbhZSelloBgPPx//o5GwDeHgiKrLrdn2hpnCLZRM9BdS5gJXFW5m11XWSSdj5/Z14jnEFZt69wSwcACdmHWgD2bERXnUL4+m8DQEZ/Z0CgrpJmrz0AAE1+RnJWnSLKVj0tr/9WDpAxtQoOsNP/qLuQAcBZFDqZBLIWIJOwQQI5yuNkPj5nWlXwRFnIcADXOAlL1vpCnB3br9RxCjaQ5hif5LP0Z/CtMm+Mj1MBQGmhMlFRtwugAZA1K5HTw5UyR12QUXXyRwUJJFzOvuAAqUhBXjTKbhWrIlsRjBxyEbVgChk4HgDsCkYBpCi2QM8qrAoEkQTd7wJYADgiZegAdyalsiBOA8BBApUmXOmTK7JxFckggUyvy3M7Sp5cMq8znqEoT4MAMFlHuybQqTgq+se2X+zu2KrDE5nUavb+jj65+se2X4oOTQIBO6GVk6/qH9WOsHilj3ds3kSUhGLyO/sHtztkHCrlqgbQ/Xx3u7h/Wtnj1tEdPrvSJ7PjB9xfL3vcOnoSZ+kAhLJ/l0PaVehoVkZ1Ru4qDqtKy8A31PqrtHnX/ZtOUDsAOAA4ADgAcBzCGJGRbLLDcX/2/VyJG3sy6ADgywEw3UR3m/Dp5xyD/TsAOAA4ADgAmBToyUbCIhs4VKXq6tPBs+OIhI03+zXqfgGCa3/8FAAoSBwzRnQouPMwY5YJdwMA7T8LgGgCaGEN+s+yZe+9A4DbvzP9VwAgulN5uS9APfFoiZkaALvVkl2pUw57Xh0pG60n+OgC3D+OAfx2AEhIYPXPFAC4t2NXAQAmgT8P/+nmAN0AsJNA51k2lS7njjeo3rETANE9nTfvrdvZw1TsdKiMNwFgNdEbEOj29nVsbcq4COZI1SpSrJ787TXVAZ0pvzTpLQCITP7yWjbf3g2Abg4wJRAEcwA1ANCyZufKcXKACaFgigM4AIBmCx0VMSwHqN7fzxxjN4IDOFfTkwpLK9PBDAf4BzY4SAYFZUTuAAAAAElFTkSuQmCC", columns: 16, rows: 16, map: `☺☻♥♦♣♠•◘○◙♂♀♪♫☼
►◄↕‼¶§▬↨↑↓→←∟↔▲▼
 !"#$%&'()*+,-./
0123456789:;<=>?
@ABCDEFGHIJKLMNO
PQRSTUVWXYZ[\\]^_
\`abcdefghijklmno
pqrstuvwxyz{|}~⌂
ÇüéâäàåçêëèïîìÄÅ
ÉæÆôöòûùÿÖÜ¢£¥₧ƒ
áíóúñÑªº¿⌐¬½¼¡«»
░▒▓│┤╡╢╖╕╣║╗╝╜╛┐
└┴┬├─┼╞╟╚╔╩╦╠═╬╧
╨╤╥╙╘╒╓╫╪┘┌█▄▌▐▀
αßΓπΣσµτΦΘΩδ∞φε∩
≡±≥≤⌠⌡÷≈°∙·√ⁿ²■□
` });
class j {
  constructor(t, e = {}) {
    a(this, "bs");
    a(this, "As");
    a(this, "Cs");
    a(this, "l");
    a(this, "_");
    a(this, "Fs");
    a(this, "Ct");
    a(this, "Ss");
    a(this, "G");
    a(this, "Ps");
    a(this, "Es");
    a(this, "Mt");
    a(this, "Ts");
    a(this, "ks");
    a(this, "Ls");
    a(this, "Ds");
    a(this, "Os", () => {
    });
    a(this, "Rs", () => {
    });
    a(this, "Bs", []);
    a(this, "Is", []);
    a(this, "js", !1);
    a(this, "zs", !1);
    a(this, "Qs");
    a(this, "Hs");
    a(this, "Ns", /* @__PURE__ */ new Map());
    this.G = t, this.bs = e.visible ?? !0, this.As = e.opacity ?? 1;
    const s = e.blendMode ?? "normal";
    this.Cs = j.Gs(s) ? s : "normal";
    const i = e.fontSize ?? 16;
    this.Ct = Math.abs(i), this.Hs = e.fontSize !== void 0, dt.Ti(j.Gs(s), `Invalid blend mode. Expected one of: ${bt.join(", ")}.`, { method: "constructor", property: "blendMode", providedValue: e.blendMode }), dt.Ti(typeof i == "number", "Font size must be a number.", { method: "fontSize", providedValue: i }), this.l = e.offsetX ?? 0, this._ = e.offsetY ?? 0, this.Fs = e.rotationZ ?? 0;
    const n = e.fontSource;
    this.Ss = n, this.Mt = n instanceof I || n instanceof X ? n : n === void 0 ? new X(t, this.Ct, Is) : new I(t, this.Ct), this.Qs = new ks(t.state);
  }
  async Xs(t) {
    if (this.Ps = t, this.Ss instanceof I || this.Ss instanceof X) {
      this.Ss.Tt || await this.Ss.Dt();
      const i = this.Ss, n = i.kt({ fontSize: this.Vs(i) });
      this.Ws(n);
    }
    this.Mt.Tt || (this.Mt instanceof I ? await this.Mt.Dt(this.Ss) : await this.Mt.Dt());
    const e = this.Mt.maxGlyphDimensions;
    this.Es = new vs(this.Ps.canvas.canvas, e.width, e.height);
    const s = this.Es;
    this.Ts = this.Ps.createFramebuffer(s.cols, s.rows, 3), this.ks = this.Ps.createFramebuffer(s.width, s.height, 1, { depth: !1 }), this.Ls = this.Ps.createFramebuffer(s.width, s.height, 1, { depth: !1 }), this.Ds = [this.Ps.createFramebuffer(s.width, s.height, 1, { depth: !1 }), this.Ps.createFramebuffer(s.width, s.height, 1, { depth: !1 })], this.Es.F(() => {
      var i, n, h;
      this.Ts.resize(this.Es.cols, this.Es.rows), this.ks.resize(this.Es.width, this.Es.height), (i = this.Ls) == null || i.resize(this.Es.width, this.Es.height), (n = this.Ds) == null || n[0].resize(this.Es.width, this.Es.height), (h = this.Ds) == null || h[1].resize(this.Es.width, this.Es.height);
    });
  }
  draw(t) {
    this.Os = t;
  }
  postDraw(t) {
    this.Rs = t;
  }
  show() {
    this.bs = !0;
  }
  hide() {
    this.bs = !1;
  }
  opacity(t) {
    if (t === void 0) return this.As;
    this.As = O(t, 0, 1);
  }
  blendMode(t) {
    if (t === void 0) return this.Cs;
    dt.Ti(j.Gs(t), `Invalid blend mode. Expected one of: ${bt.join(", ")}.`, { method: "blendMode", providedValue: t }) && (this.Cs = t);
  }
  offset(t, e = 0) {
    if (t === void 0) return { x: this.l, y: this._ };
    this.l = t, this._ = e;
  }
  rotateZ(t) {
    if (t === void 0) return this.Fs;
    this.Fs = t;
  }
  createCamera() {
    var s;
    const t = this.Ys(), e = 180 * (((s = this.Ps) == null ? void 0 : s.renderer.state.Yi.ss) ?? Math.PI / 4) / Math.PI;
    return this.Qs.createCamera(t.height, e);
  }
  setCamera(t) {
    this.Qs.setCamera(t), this.Zs();
  }
  resetCamera() {
    this.Qs.resetCamera(), this.Zs();
  }
  camera(t, e, s, i = 0, n = 0, h = 0, o = 0, c = 1, l = 0) {
    this.Qs.camera(t, e, s, i, n, h, o, c, l), this.Zs();
  }
  lookAt(t, e, s, i, n, h) {
    this.Qs.lookAt(t, e, s, i, n, h), this.Zs();
  }
  perspective(t, e, s) {
    this.Qs.perspective(t, e, s), this.Zs();
  }
  ortho(t, e) {
    this.Qs.ortho(t, e), this.Zs();
  }
  Ks() {
    return this.Qs.getActiveCamera();
  }
  filter(t, e) {
    (this.js ? this.Is : this.Bs).push({ name: t, params: e });
  }
  setPluginState(t, e) {
    this.Ns.set(t, e);
  }
  getPluginState(t) {
    return this.Ns.get(t);
  }
  hasPluginState(t) {
    return this.Ns.has(t);
  }
  deletePluginState(t) {
    return this.Ns.delete(t);
  }
  fontSize(t) {
    if (t === void 0) return this.Mt.fontSize;
    if (!dt.Ti(typeof t == "number", "Font size must be a number.", { method: "fontSize", providedValue: t })) return;
    const e = Math.abs(t);
    this.Mt.fontSize !== e && (this.Hs = !0, this.Ct = e, this.Mt.Bt(e), this.$s());
  }
  useTileColors(t) {
    if (t === void 0) return this.zs;
    this.zs = t;
  }
  async loadFont(t) {
    if (!this.Mt) throw Error("Layer font not initialized. Ensure layer is attached before loading fonts.");
    if (t instanceof I) {
      t.Tt || await t.Dt();
      const e = t, s = e.kt({ fontSize: this.Vs(e) });
      this.Ws(s);
    } else if (this.Mt instanceof I) await this.Mt.It(t);
    else {
      const e = new I(this.G, this.Mt.fontSize);
      await e.Dt(t), this.Ws(e);
    }
    return this.Ss = t, this.Ct = this.Mt.fontSize, this.$s(), this.Mt;
  }
  async loadTileset(t) {
    if (!this.Mt) throw Error("Layer font not initialized. Ensure layer is attached before loading tilesets.");
    if (t instanceof X) {
      t.Tt || await t.Dt();
      const e = t.kt({ fontSize: this.Vs(t) });
      this.Ws(e);
    } else {
      const e = this.Hs ? this.Ct : t.fontSize, s = new X(this.G, e, t);
      await s.Dt(), this.Ws(s);
    }
    return this.Ss = t, this.Ct = this.Mt.fontSize, this.$s(), this.Mt;
  }
  qs(t, e, s = {}) {
    if (!this.bs || !this.Ts || !this.ks) return;
    const i = this.Ps.renderer, n = this.Es, h = s.skipPluginHooks ?? !1;
    h || t.te.Js(this);
    try {
      let o = !1;
      try {
        this.Ts.begin(), o = !0, i.state.se.ie(), i.state.ee(), this.Qs.applyToState(i.state), t.re = this, this.Os.call(t);
      } finally {
        t.re = void 0, o && this.Ts.end();
      }
      h || t.te.ne(this);
      const c = this.Bs.length > 0, l = c ? this.Ls : this.ks;
      let u = !1;
      try {
        l.begin(), u = !0, i.he(e), e.oe({ u_characterTexture: this.Mt.framebuffer, u_charsetDimensions: [this.Mt.textureColumns, this.Mt.textureRows], Ub: this.Ts.textures[0], Uc: this.Ts.textures[1], Ud: this.Ts.textures[2], Ue: !(this.Mt instanceof X && this.zs), Uf: [n.cols, n.rows], Ug: [l.width, l.height], Uh: [0, 0, 0, 0] }), i.ae(0, 0, n.width, n.height);
      } finally {
        u && l.end();
      }
      c && this.Ps.filterManager.ce(this.Ls.textures[0], this.ks, this.Bs, this.ks.width, this.ks.height, this.Ds);
      try {
        this.js = !0, t.re = this, this.Rs.call(t);
      } finally {
        this.js = !1, t.re = void 0;
      }
      this.Is.length > 0 && this.Ps.filterManager.ce(this.ks.textures[0], this.ks, this.Is, this.ks.width, this.ks.height, this.Ds);
    } finally {
      this.Bs = [], this.Is = [], this.js = !1;
    }
  }
  ue() {
    var t;
    this.Ts && this.ks && ((t = this.Es) == null || t.reset());
  }
  k() {
    var t, e, s, i, n, h, o;
    (t = this.Ts) == null || t.dispose(), (e = this.ks) == null || e.dispose(), (s = this.Ls) == null || s.dispose(), (i = this.Ds) == null || i[0].dispose(), (n = this.Ds) == null || n[1].dispose(), (h = this.Mt) == null || h.dispose(), (o = this.Es) == null || o.k();
  }
  get texture() {
    var t;
    return (t = this.ks) == null ? void 0 : t.textures[0];
  }
  get grid() {
    return this.Es;
  }
  get font() {
    return this.Mt;
  }
  get width() {
    return this.ks ? this.ks.width : 0;
  }
  get height() {
    return this.ks ? this.ks.height : 0;
  }
  get drawFramebuffer() {
    return this.Ts;
  }
  get asciiFramebuffer() {
    return this.ks;
  }
  $s() {
    if (!this.Es || !this.Mt) return;
    const t = this.Mt.maxGlyphDimensions;
    this.Es.P(t.width, t.height), this.Ts && this.ks && this.ue();
  }
  static Gs(t) {
    return typeof t == "string" && bt.includes(t);
  }
  Ws(t) {
    (this.Ss instanceof I || this.Ss instanceof X) && this.Mt === this.Ss || this.Mt === t || this.Mt.dispose(), this.Mt = t;
  }
  Vs(t) {
    return this.Hs ? this.Ct : t.fontSize;
  }
  Zs() {
    this.Qs.applyToState(this.Ps.renderer.state);
  }
  Ys() {
    var s, i, n, h;
    if (this.Ts) return { width: Math.max(1, this.Ts.width), height: Math.max(1, this.Ts.height) };
    if (this.Es) return { width: Math.max(1, this.Es.cols), height: Math.max(1, this.Es.rows) };
    const t = ((s = this.Ps) == null ? void 0 : s.renderer.context.canvas.width) ?? ((i = this.Ps) == null ? void 0 : i.canvas.width) ?? 1, e = ((n = this.Ps) == null ? void 0 : n.renderer.context.canvas.height) ?? ((h = this.Ps) == null ? void 0 : h.canvas.height) ?? 1;
    return { width: Math.max(1, t), height: Math.max(1, e) };
  }
}
class qe {
  constructor(t) {
    a(this, "le");
    a(this, "fe");
    a(this, "Os");
    a(this, "Tt", !1);
    this.le = t;
  }
  draw(t) {
    this.Os = t;
  }
  async Dt() {
    if (this.Tt) return;
    const t = this.de();
    this.fe = t, this.Tt = !0;
  }
  k() {
    var t;
    this.Tt && ((t = this.fe) == null || t.k(), this.Tt = !1);
  }
  _e(t, e) {
    const s = this.fe;
    s.show(), s.draw(() => {
      this.le.clear(), this.le.push();
      try {
        (this.Os || t)(e), this.pe(e);
      } finally {
        this.le.pop();
      }
    });
  }
  pe(t) {
    const { textmodifier: e, grid: s } = t, i = [116, 101, 120, 116, 109, 111, 100, 101, 46, 106, 115].map((c) => String.fromCharCode(c)).join(""), n = (s.rows + 1 >> 1) - 2, h = 2 - (s.cols + 1 >> 1), o = [[142, 249, 243], [241, 91, 181], [255, 155, 113]];
    e.push(), e.translate(h, n, 0);
    for (let c = 0; c < i.length; c++) {
      const l = i[c], u = Math.floor(0.1 * e.frameCount + 0.5 * c) % o.length, [f, d, m] = o[u], y = e.color(f, d, m);
      e.charColor(y), e.char(l), e.point(), e.translateX(1);
    }
    e.pop();
  }
}
function pt(r, t, e) {
  (function(s, i, n, h) {
    s.push(), s.translate(n, h, 0);
    for (const o of i) s.char(o), s.rect(1, 1), s.translateX(1);
    s.pop();
  })(r, t, -Math.floor(t.length / 2), e);
}
const Ns = ({ textmodifier: r, grid: t, errorTitle: e, errorMessage: s }) => {
  r.background("#222323"), r.cellColor("#222323"), r.charColor("#FF6B6B"), pt(r, "X", -2), pt(r, e || "SKETCH ERROR", 0), r.charColor("#C0C0C0");
  const i = s || "Unknown error", n = Math.floor(0.8 * t.cols), h = Fe(i, n), o = h.slice(0, 3);
  h.length > 3 && (o[2] = o[2].substring(0, n - 3) + "..."), o.forEach((u, f) => {
    pt(r, u, 3 + f);
  });
  const c = Fe("CHECK CONSOLE FOR DETAILS", n), l = 5 + o.length;
  c.forEach((u, f) => {
    pt(r, u, l + f);
  });
}, Fe = (r, t) => {
  const e = r.split(" "), s = [];
  let i = "";
  for (const n of e) (i + " " + n).length <= t ? i = i ? i + " " + n : n : (i && s.push(i), i = n);
  return i && s.push(i), s;
};
class Ke extends qe {
  constructor(e) {
    super(e);
    a(this, "me", "inactive");
    a(this, "ge", "SKETCH ERROR");
    a(this, "ve", "Unknown error");
    a(this, "ye", "");
  }
  async Dt() {
    this.Tt || (await super.Dt(), this.fe.opacity(1), this.fe.hide());
  }
  get we() {
    return this.Tt && this.me === "active";
  }
  Me(e) {
    this.be(e), this.Tt && (this.fe.opacity(1), this.fe.show());
  }
  Ae() {
    this.we && this.Ce();
  }
  k() {
    super.k();
  }
  de() {
    return new j(this.le.G, { visible: !0, opacity: 1 });
  }
  Ce() {
    const e = { textmodifier: this.le, grid: this.fe.grid, errorTitle: this.ge, errorMessage: this.ve, errorDetails: this.ye || void 0 };
    this._e(Ns, e);
  }
  be(e) {
    var s;
    if (this.me = "active", e instanceof Error) {
      const i = (s = e.name) != null && s.trim() ? e.name.trim().toUpperCase() : "SKETCH ERROR";
      return this.ge = i.endsWith("ERROR") ? i : i + " ERROR", this.ve = e.message || "Unknown error", void (this.ye = e.stack || "");
    }
    if (typeof e == "string") return this.ge = "SKETCH ERROR", this.ve = e || "Unknown error", void (this.ye = "");
    this.ge = "SKETCH ERROR", this.ve = "Unknown error", this.ye = "";
  }
}
const ar = Object.freeze(Object.defineProperty({ __proto__: null, ErrorLayerController: Ke, TextmodeError: M, TextmodeErrorLevel: Qe }, Symbol.toStringTag, { value: "Module" }));
function Ze(r, t) {
  r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL, 1), r.texImage2D(r.TEXTURE_2D, 0, r.RGBA, r.RGBA, r.UNSIGNED_BYTE, t);
}
function Xt(r, t, e) {
  r.bindTexture(r.TEXTURE_2D, t), Ze(r, e), r.bindTexture(r.TEXTURE_2D, null);
}
function ue(r, t, e = r.NEAREST, s = r.NEAREST, i = r.CLAMP_TO_EDGE, n = r.CLAMP_TO_EDGE) {
  const h = r.createTexture();
  r.bindTexture(r.TEXTURE_2D, h), $e(r, e, s, i, n), Ze(r, t), r.bindTexture(r.TEXTURE_2D, null);
  const { width: o, height: c } = (function(l) {
    let u = 0, f = 0;
    return l instanceof HTMLVideoElement ? (u = l.videoWidth, f = l.videoHeight) : l instanceof HTMLImageElement ? (u = l.naturalWidth, f = l.naturalHeight) : l instanceof HTMLCanvasElement && (u = l.width, f = l.height), { width: u, height: f };
  })(t);
  return { texture: h, width: o, height: c };
}
function $e(r, t, e, s, i) {
  r.texParameteri(r.TEXTURE_2D, r.TEXTURE_MIN_FILTER, t), r.texParameteri(r.TEXTURE_2D, r.TEXTURE_MAG_FILTER, e), r.texParameteri(r.TEXTURE_2D, r.TEXTURE_WRAP_S, s), r.texParameteri(r.TEXTURE_2D, r.TEXTURE_WRAP_T, i);
}
function _t(r, t, e, s, i, n = 0, h = r.FLOAT, o = !1) {
  r.enableVertexAttribArray(t), r.vertexAttribPointer(t, e, h, o, s, i), r.vertexAttribDivisor(t, n);
}
function ee(r, t, e, s, i) {
  r.bindBuffer(t, e), r.bufferData(t, s, i), r.bindBuffer(t, null);
}
class vt extends Ct {
  constructor(e, s, i = s, n = 1, h = {}, o) {
    super();
    a(this, "o");
    a(this, "u");
    a(this, "Kt");
    a(this, "xe");
    a(this, "X");
    a(this, "Fe", []);
    a(this, "Se", null);
    a(this, "Pe");
    a(this, "G");
    a(this, "Ee", null);
    a(this, "Te", /* @__PURE__ */ new Map());
    this.o = s, this.u = i, this.xe = e, this.Pe = O(n, 1, 8), this.G = o, this.Kt = { filter: "nearest", wrap: "clamp", type: "unsigned_byte", depth: !0, ...h };
    const c = e.getParameter(e.MAX_DRAW_BUFFERS), l = e.getParameter(e.MAX_COLOR_ATTACHMENTS);
    this.Pe = Math.min(this.Pe, c, l), this.X = e.createFramebuffer(), this.ke(), this.Le(), this.Kt.depth && this.De();
  }
  ke() {
    const e = this.xe, s = this.Kt.filter === "linear" ? e.LINEAR : e.NEAREST, i = this.Kt.wrap === "repeat" ? e.REPEAT : e.CLAMP_TO_EDGE;
    for (let n = 0; n < this.Pe; n++) {
      const h = e.createTexture();
      e.bindTexture(e.TEXTURE_2D, h), $e(e, s, s, i, i), this.Oe(h, !1), this.Fe.push(h);
    }
    e.bindTexture(e.TEXTURE_2D, null);
  }
  Oe(e, s = !0) {
    const i = this.xe, n = this.Kt.type === "float" ? i.FLOAT : i.UNSIGNED_BYTE, h = n === i.FLOAT ? i.RGBA32F : i.RGBA8, o = i.RGBA;
    s && i.bindTexture(i.TEXTURE_2D, e), i.texImage2D(i.TEXTURE_2D, 0, h, this.o, this.u, 0, o, n, null);
  }
  Le() {
    const e = this.xe;
    if (e.bindFramebuffer(e.FRAMEBUFFER, this.X), this.Pe === 1) e.framebufferTexture2D(e.FRAMEBUFFER, e.COLOR_ATTACHMENT0, e.TEXTURE_2D, this.Fe[0], 0);
    else {
      const s = [];
      for (let i = 0; i < this.Pe; i++) {
        const n = e.COLOR_ATTACHMENT0 + i;
        e.framebufferTexture2D(e.FRAMEBUFFER, n, e.TEXTURE_2D, this.Fe[i], 0), s.push(n);
      }
      e.drawBuffers(s);
    }
    e.bindFramebuffer(e.FRAMEBUFFER, null);
  }
  De() {
    const e = this.xe;
    this.Se = e.createRenderbuffer(), this.Re(), e.bindFramebuffer(e.FRAMEBUFFER, this.X), e.framebufferRenderbuffer(e.FRAMEBUFFER, e.DEPTH_ATTACHMENT, e.RENDERBUFFER, this.Se), e.bindFramebuffer(e.FRAMEBUFFER, null);
  }
  Re() {
    if (!this.Se) return;
    const e = this.xe;
    e.bindRenderbuffer(e.RENDERBUFFER, this.Se), e.renderbufferStorage(e.RENDERBUFFER, e.DEPTH_COMPONENT24, this.o, this.u), e.bindRenderbuffer(e.RENDERBUFFER, null);
  }
  $(e) {
    Xt(this.xe, this.Fe[0], e);
  }
  resize(e, s) {
    this.o = e, this.u = s, this.Te.clear();
    const i = this.xe;
    for (const n of this.Fe) this.Oe(n, !0);
    i.bindTexture(i.TEXTURE_2D, null), this.Re(), this.Ee = null;
  }
  readPixels(e) {
    const s = this.Te.get(e);
    if (s) return s;
    const i = this.xe, n = this.o, h = this.u, o = new Uint8Array(n * h * 4), c = i.getParameter(i.READ_FRAMEBUFFER_BINDING);
    i.bindFramebuffer(i.READ_FRAMEBUFFER, this.X), i.readBuffer(i.COLOR_ATTACHMENT0 + e), i.readPixels(0, 0, n, h, i.RGBA, i.UNSIGNED_BYTE, o), i.bindFramebuffer(i.READ_FRAMEBUFFER, c);
    const l = 4 * n, u = new Uint8Array(o.length);
    for (let f = 0; f < h; f++) {
      const d = (h - 1 - f) * l, m = f * l;
      u.set(o.subarray(d, d + l), m);
    }
    return this.Te.set(e, u), u;
  }
  begin() {
    const e = this.xe;
    this.Te.clear(), this.G.Be(), this.G.Ie(this.X, this.o, this.u, this.Pe), this.Kt.depth && e.clear(e.DEPTH_BUFFER_BIT), this.G.state.je();
  }
  end() {
    this.G.state.ze(), this.G.Qe(), this.G.He();
  }
  Ne() {
    return this.Ee || this.Ge(), this.Ee;
  }
  Ge() {
    if (!this.G) return;
    const e = this.Pe > 1, s = this.Pe > 2, i = this.Pe > 3, n = { U1: this.Fe[0], U2: e ? this.Fe[1] : this.Fe[0], U3: s ? this.Fe[2] : this.Fe[0], U4: i ? this.Fe[3] : this.Fe[0], U5: [this.o, this.u], U6: e, U7: s, U8: i }, h = this.G.materialManager.Xe;
    this.Ee = this.G.materialManager.Ve(h, n);
  }
  dispose() {
    const e = this.xe;
    e.deleteFramebuffer(this.X), this.Fe.forEach((s) => {
      e.deleteTexture(s);
    }), this.Se && e.deleteRenderbuffer(this.Se), super.dispose();
  }
  get width() {
    return this.o;
  }
  get height() {
    return this.u;
  }
  get framebuffer() {
    return this.X;
  }
  get textures() {
    return this.Fe;
  }
  get attachmentCount() {
    return this.Pe;
  }
}
function wt(r) {
  return typeof r == "object" && r !== null && "textures" in r && Array.isArray(r.textures);
}
class Et extends Ct {
  constructor(e, s, i) {
    super();
    a(this, "xe");
    a(this, "We");
    a(this, "Ye", /* @__PURE__ */ new Map());
    a(this, "Ze", /* @__PURE__ */ new Map());
    a(this, "Ke", /* @__PURE__ */ new Map());
    a(this, "$e", 0);
    a(this, "qe", /* @__PURE__ */ new Map());
    a(this, "Je");
    this.xe = e, this.Je = e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS) ?? 16, this.We = this.tr(s, i), this.ir();
  }
  ir() {
    const e = this.xe.getProgramParameter(this.We, this.xe.ACTIVE_UNIFORMS);
    for (let s = 0; s < e; s++) {
      const i = this.xe.getActiveUniform(this.We, s);
      if (i) {
        const n = i.name.replace(/\[0\]$/, ""), h = this.xe.getUniformLocation(this.We, n);
        h && (this.Ye.set(n, h), this.Ze.set(n, { type: i.type, size: i.size }));
      }
    }
  }
  tr(e, s) {
    const i = this.sr(this.xe.VERTEX_SHADER, e), n = this.sr(this.xe.FRAGMENT_SHADER, s), h = this.xe.createProgram();
    if (!h) throw Error("Failed to create WebGL program");
    if (this.xe.attachShader(h, i), this.xe.attachShader(h, n), this.xe.linkProgram(h), !this.xe.getProgramParameter(h, this.xe.LINK_STATUS)) {
      const o = this.xe.getProgramInfoLog(h);
      throw Error("Shader program link error: " + o);
    }
    return this.xe.deleteShader(i), this.xe.deleteShader(n), h;
  }
  sr(e, s) {
    const i = this.xe.createShader(e);
    if (!i) throw Error("Failed to create shader of type " + e);
    if (this.xe.shaderSource(i, s), this.xe.compileShader(i), !this.xe.getShaderParameter(i, this.xe.COMPILE_STATUS)) {
      const n = this.xe.getShaderInfoLog(i);
      throw this.xe.deleteShader(i), Error("Shader compilation error: " + n);
    }
    return i;
  }
  er() {
    this.xe.useProgram(this.We), this.rr();
  }
  rr() {
    this.$e = 0, this.qe.clear();
    for (const [e, s] of this.Ke) (s instanceof WebGLTexture || wt(s)) && this.Ke.delete(e);
  }
  oe(e) {
    for (const s in e) this.nr(s, e[s]);
  }
  nr(e, s) {
    const i = this.Ye.get(e);
    if (!i) return;
    const n = this.Ke.get(e);
    let h = !0;
    if (n !== void 0 && (typeof s == "number" || typeof s == "boolean" ? n === s && (h = !1) : (s instanceof WebGLTexture || wt(s)) && n === s && (h = !1)), !h) return;
    typeof s == "number" || typeof s == "boolean" || s instanceof WebGLTexture || wt(s) ? this.Ke.set(e, s) : this.Ke.delete(e);
    const o = this.Ze.get(e);
    if (!o) return;
    const { type: c, size: l } = o, u = this.xe;
    if (s instanceof WebGLTexture) {
      const f = this.hr(e);
      return u.uniform1i(i, f), u.activeTexture(u.TEXTURE0 + f), void u.bindTexture(u.TEXTURE_2D, s);
    }
    if (wt(s)) {
      const f = this.hr(e);
      return u.uniform1i(i, f), u.activeTexture(u.TEXTURE0 + f), void u.bindTexture(u.TEXTURE_2D, s.textures[0]);
    }
    if (typeof s != "number") if (typeof s != "boolean") if (Array.isArray(s) && Array.isArray(s[0])) {
      const f = s.flat();
      switch (c) {
        case u.FLOAT_VEC2:
          u.uniform2fv(i, f);
          break;
        case u.FLOAT_VEC3:
          u.uniform3fv(i, f);
          break;
        case u.FLOAT_VEC4:
          u.uniform4fv(i, f);
      }
    } else {
      const f = s;
      switch (c) {
        case u.FLOAT:
          l > 1 ? u.uniform1fv(i, f) : u.uniform1f(i, f[0]);
          break;
        case u.FLOAT_VEC2:
          u.uniform2fv(i, f);
          break;
        case u.FLOAT_VEC3:
          u.uniform3fv(i, f);
          break;
        case u.FLOAT_VEC4:
          u.uniform4fv(i, f);
          break;
        case u.INT:
          l > 1 ? u.uniform1iv(i, f) : u.uniform1i(i, f[0]);
          break;
        case u.INT_VEC2:
          u.uniform2iv(i, f);
          break;
        case u.INT_VEC3:
          u.uniform3iv(i, f);
          break;
        case u.INT_VEC4:
          u.uniform4iv(i, f);
          break;
        case u.BOOL:
          u.uniform1iv(i, f);
          break;
        case u.FLOAT_MAT2:
          u.uniformMatrix2fv(i, !1, f);
          break;
        case u.FLOAT_MAT3:
          u.uniformMatrix3fv(i, !1, f);
          break;
        case u.FLOAT_MAT4:
          u.uniformMatrix4fv(i, !1, f);
      }
    }
    else u.uniform1i(i, s ? 1 : 0);
    else c === u.INT || c === u.BOOL ? u.uniform1i(i, s) : u.uniform1f(i, s);
  }
  hr(e) {
    const s = this.qe.get(e);
    if (s !== void 0) return s;
    if (this.$e >= this.Je) throw Error(`[textmode.js] Shader attempted to bind more than ${this.Je} texture samplers. Uniform "${e}" cannot be assigned.`);
    const i = this.$e++;
    return this.qe.set(e, i), i;
  }
  get program() {
    return this.We;
  }
  dispose() {
    this.xe.deleteProgram(this.We), super.dispose();
  }
}
const Je = /* @__PURE__ */ new WeakMap();
function qt(r, t) {
  Je.set(r, t);
}
function ts(r) {
  return Je.get(r);
}
const Os = [255, 255, 255, 255], Xs = [360, 100, 100, 1];
function es(r) {
  return [(t = r === "rgb" ? Os : Xs)[0], t[1], t[2], t[3]];
  var t;
}
function se() {
  return { mode: "rgb", maxes: es("rgb") };
}
function ie(r, t) {
  return Number.isNaN(r) ? 0 : O(r, 0, t) / t;
}
function At(r, t) {
  return Math.round(255 * ie(r, t));
}
function ss(r, t) {
  return At(r ?? t, t);
}
function Kt(r, t, e) {
  return e < 0 && (e += 1), e > 1 && (e -= 1), e < 1 / 6 ? r + 6 * (t - r) * e : e < 0.5 ? t : e < 2 / 3 ? r + (t - r) * (2 / 3 - e) * 6 : r;
}
function Ys(r, t, e, s, i) {
  if (Array.isArray(r)) {
    if (r.length < 3) throw Error("Component tuples must include at least RGB values.");
    return De(r[0], r[1], r[2], r.length === 4 ? r[3] : void 0, i);
  }
  return typeof t == "number" && typeof e == "number" ? De(r, t, e, s, i) : (function(n, h, o) {
    const c = o.mode === "rgb" ? o.maxes[0] : o.maxes[2], l = At(n, c);
    return [l, l, l, ss(h, o.maxes[3])];
  })(r, t ?? s, i);
}
function De(r, t, e, s, i) {
  const [n, h, o, c] = i.maxes, l = ss(s, c);
  if (i.mode === "rgb") return [At(r, n), At(t, h), At(e, o), l];
  const u = (d = n, Number.isNaN(f = r) ? 0 : (f % d + d) % d / d);
  var f, d;
  const m = ie(t, h), y = ie(e, o), [w, v, g] = i.mode === "hsb" ? (function(x, b, A) {
    if (b === 0) return [A, A, A];
    const E = 6 * x, S = Math.floor(E), C = E - S, T = A * (1 - b), R = A * (1 - C * b), F = A * (1 - (1 - C) * b);
    switch (S % 6) {
      case 0:
        return [A, F, T];
      case 1:
        return [R, A, T];
      case 2:
        return [T, A, F];
      case 3:
        return [T, R, A];
      case 4:
        return [F, T, A];
      default:
        return [A, T, R];
    }
  })(u, m, y) : (function(x, b, A) {
    if (b === 0) return [A, A, A];
    const E = A < 0.5 ? A * (1 + b) : A + b - A * b, S = 2 * A - E;
    return [Kt(S, E, x + 1 / 3), Kt(S, E, x), Kt(S, E, x - 1 / 3)];
  })(u, m, y);
  return [Math.round(255 * w), Math.round(255 * v), Math.round(255 * g), l];
}
class Ws {
  constructor() {
    a(this, "ar", 0);
    a(this, "cr", 0);
    a(this, "ur", 0);
    a(this, "lr", 0);
    a(this, "dr", 0);
    a(this, "_r", 0);
    a(this, "pr", 1);
    a(this, "mr", 1);
    a(this, "gr", 1);
    a(this, "vr", et());
    a(this, "yr", et());
    a(this, "wr", et());
  }
  Mr(t) {
    t.ar = this.ar, t.cr = this.cr, t.ur = this.ur, t.lr = this.lr, t.dr = this.dr, t._r = this._r, t.pr = this.pr, t.mr = this.mr, t.gr = this.gr;
    for (let e = 0; e < 16; e++) t.vr[e] = this.vr[e];
  }
  br(t) {
    this.ar = t.ar, this.cr = t.cr, this.ur = t.ur, this.lr = t.lr, this.dr = t.dr, this._r = t._r, this.pr = t.pr, this.mr = t.mr, this.gr = t.gr;
    for (let e = 0; e < 16; e++) this.vr[e] = t.vr[e];
  }
  Ar(t = 0, e = 0, s = 0) {
    t === 0 && e === 0 && s === 0 || (this.yr[0] = 1, this.yr[1] = 0, this.yr[2] = 0, this.yr[3] = 0, this.yr[4] = 0, this.yr[5] = 1, this.yr[6] = 0, this.yr[7] = 0, this.yr[8] = 0, this.yr[9] = 0, this.yr[10] = 1, this.yr[11] = 0, this.yr[12] = t, this.yr[13] = e, this.yr[14] = s, this.yr[15] = 1, this.Cr(this.yr));
  }
  Fr(t, e, s) {
    const i = e === void 0 ? t : e, n = s === void 0 ? e === void 0 ? t : 1 : s;
    t === 1 && i === 1 && n === 1 || (this.yr[0] = t, this.yr[1] = 0, this.yr[2] = 0, this.yr[3] = 0, this.yr[4] = 0, this.yr[5] = i, this.yr[6] = 0, this.yr[7] = 0, this.yr[8] = 0, this.yr[9] = 0, this.yr[10] = n, this.yr[11] = 0, this.yr[12] = 0, this.yr[13] = 0, this.yr[14] = 0, this.yr[15] = 1, this.Cr(this.yr));
  }
  Sr(t) {
    if (t === 0) return;
    const e = V(t);
    this.yr[0] = 1, this.yr[1] = 0, this.yr[2] = 0, this.yr[3] = 0, this.yr[4] = 0, this.yr[5] = Math.cos(e), this.yr[6] = Math.sin(e), this.yr[7] = 0, this.yr[8] = 0, this.yr[9] = -Math.sin(e), this.yr[10] = Math.cos(e), this.yr[11] = 0, this.yr[12] = 0, this.yr[13] = 0, this.yr[14] = 0, this.yr[15] = 1, this.Cr(this.yr);
  }
  Pr(t) {
    if (t === 0) return;
    const e = V(t);
    this.yr[0] = Math.cos(e), this.yr[1] = 0, this.yr[2] = -Math.sin(e), this.yr[3] = 0, this.yr[4] = 0, this.yr[5] = 1, this.yr[6] = 0, this.yr[7] = 0, this.yr[8] = Math.sin(e), this.yr[9] = 0, this.yr[10] = Math.cos(e), this.yr[11] = 0, this.yr[12] = 0, this.yr[13] = 0, this.yr[14] = 0, this.yr[15] = 1, this.Cr(this.yr);
  }
  Er(t) {
    if (t === 0) return;
    const e = V(t);
    this.yr[0] = Math.cos(e), this.yr[1] = Math.sin(e), this.yr[2] = 0, this.yr[3] = 0, this.yr[4] = -Math.sin(e), this.yr[5] = Math.cos(e), this.yr[6] = 0, this.yr[7] = 0, this.yr[8] = 0, this.yr[9] = 0, this.yr[10] = 1, this.yr[11] = 0, this.yr[12] = 0, this.yr[13] = 0, this.yr[14] = 0, this.yr[15] = 1, this.Cr(this.yr);
  }
  Tr(t, e, s, i) {
    if (t === 0) return;
    const n = Math.hypot(e, s, i);
    if (n < 1e-6) return;
    const h = e / n, o = s / n, c = i / n, l = V(t), u = Math.cos(l), f = Math.sin(l), d = 1 - u;
    this.yr[0] = d * h * h + u, this.yr[1] = d * h * o + f * c, this.yr[2] = d * h * c - f * o, this.yr[3] = 0, this.yr[4] = d * h * o - f * c, this.yr[5] = d * o * o + u, this.yr[6] = d * o * c + f * h, this.yr[7] = 0, this.yr[8] = d * h * c + f * o, this.yr[9] = d * o * c - f * h, this.yr[10] = d * c * c + u, this.yr[11] = 0, this.yr[12] = 0, this.yr[13] = 0, this.yr[14] = 0, this.yr[15] = 1, this.Cr(this.yr);
  }
  kr() {
    et(this.vr), this.ar = 0, this.cr = 0, this.ur = 0, this.lr = 0, this.dr = 0, this._r = 0, this.pr = 1, this.mr = 1, this.gr = 1;
  }
  Lr(t) {
    if (!this.Dr(t)) throw Error("applyMatrix() only supports affine transform matrices without shear or perspective.");
    this.Cr(t);
  }
  Cr(t) {
    (function(e, s, i = new Float32Array(16)) {
      const n = e[0], h = e[1], o = e[2], c = e[3], l = e[4], u = e[5], f = e[6], d = e[7], m = e[8], y = e[9], w = e[10], v = e[11], g = e[12], x = e[13], b = e[14], A = e[15], E = s[0], S = s[1], C = s[2], T = s[3], R = s[4], F = s[5], k = s[6], W = s[7], ht = s[8], ot = s[9], z = s[10], L = s[11], $ = s[12], H = s[13], Q = s[14], q = s[15];
      i[0] = n * E + l * S + m * C + g * T, i[1] = h * E + u * S + y * C + x * T, i[2] = o * E + f * S + w * C + b * T, i[3] = c * E + d * S + v * C + A * T, i[4] = n * R + l * F + m * k + g * W, i[5] = h * R + u * F + y * k + x * W, i[6] = o * R + f * F + w * k + b * W, i[7] = c * R + d * F + v * k + A * W, i[8] = n * ht + l * ot + m * z + g * L, i[9] = h * ht + u * ot + y * z + x * L, i[10] = o * ht + f * ot + w * z + b * L, i[11] = c * ht + d * ot + v * z + A * L, i[12] = n * $ + l * H + m * Q + g * q, i[13] = h * $ + u * H + y * Q + x * q, i[14] = o * $ + f * H + w * Q + b * q, i[15] = c * $ + d * H + v * Q + A * q;
    })(this.vr, t, this.wr);
    for (let e = 0; e < 16; e++) this.vr[e] = this.wr[e];
    this.Or();
  }
  Or() {
    const t = this.vr, e = this.lr, s = this.dr, i = this._r;
    this.ar = t[12], this.cr = t[13], this.ur = t[14];
    const n = t[0], h = t[1], o = t[2], c = t[4], l = t[5], u = t[6], f = t[8], d = t[9], m = t[10];
    let y = Math.hypot(n, h, o), w = Math.hypot(c, l, u), v = Math.hypot(f, d, m);
    y < 1e-6 && (y = 1e-6), w < 1e-6 && (w = 1e-6), v < 1e-6 && (v = 1e-6), t[0] * (t[5] * t[10] - t[6] * t[9]) - t[4] * (t[1] * t[10] - t[2] * t[9]) + t[8] * (t[1] * t[6] - t[2] * t[5]) < 0 && (v = -v), this.pr = y, this.mr = w, this.gr = v;
    const g = n / y, x = c / w, b = d / v, A = m / v, E = O(f / v, -1, 1), S = Math.asin(E);
    let C, T;
    Math.abs(Math.cos(S)) > 1e-6 ? (C = Math.atan2(-b, A), T = Math.atan2(-x, g)) : (C = Math.atan2(t[6] / w, t[5] / w), T = 0);
    const R = this.Rr(C + Math.PI), F = this.Rr(Math.PI - S), k = this.Rr(T + Math.PI), W = Math.abs(this.Rr(C - e)) + Math.abs(this.Rr(S - s)) + Math.abs(this.Rr(T - i));
    Math.abs(this.Rr(R - e)) + Math.abs(this.Rr(F - s)) + Math.abs(this.Rr(k - i)) < W ? (this.lr = R, this.dr = F, this._r = k) : (this.lr = C, this.dr = S, this._r = T);
  }
  Rr(t) {
    let e = (t + Math.PI) % (2 * Math.PI);
    return e < 0 && (e += 2 * Math.PI), e - Math.PI;
  }
  Dr(t) {
    if (t.length !== 16 || Math.abs(t[3]) > 1e-6 || Math.abs(t[7]) > 1e-6 || Math.abs(t[11]) > 1e-6 || Math.abs(t[15] - 1) > 1e-6) return !1;
    const e = t[0], s = t[1], i = t[2], n = t[4], h = t[5], o = t[6], c = t[8], l = t[9], u = t[10], f = Math.hypot(e, s, i), d = Math.hypot(n, h, o), m = Math.hypot(c, l, u);
    if (f < 1e-6 || d < 1e-6 || m < 1e-6) return !1;
    const y = e / f, w = s / f, v = i / f, g = n / d, x = h / d, b = o / d, A = c / m, E = l / m, S = u / m, C = y * A + w * E + v * S, T = g * A + x * E + b * S;
    return Math.abs(y * g + w * x + v * b) < 1e-4 && Math.abs(C) < 1e-4 && Math.abs(T) < 1e-4;
  }
}
const is = 0.4899573262537283;
class zs {
  constructor() {
    a(this, "ps", !1);
    a(this, "Br", 0);
    a(this, "Ir", 0);
    a(this, "ss", is);
    a(this, "ds", 0.1);
    a(this, "_s", 4096);
    a(this, "ts", !0);
    a(this, "es", 0);
    a(this, "rs", 0);
    a(this, "ns", 0);
    a(this, "Wi", 0);
    a(this, "Zi", 0);
    a(this, "Ki", 0);
    a(this, "$i", 0);
    a(this, "qi", 1);
    a(this, "Ji", 0);
  }
  Mr(t) {
    t.ps = this.ps, t.Br = this.Br, t.Ir = this.Ir, t.ss = this.ss, t.ds = this.ds, t._s = this._s, t.ts = this.ts, t.es = this.es, t.rs = this.rs, t.ns = this.ns, t.Wi = this.Wi, t.Zi = this.Zi, t.Ki = this.Ki, t.$i = this.$i, t.qi = this.qi, t.Ji = this.Ji;
  }
  br(t) {
    this.ps = t.ps, this.Br = t.Br, this.Ir = t.Ir, this.ss = t.ss, this.ds = t.ds, this._s = t._s, this.ts = t.ts, this.es = t.es, this.rs = t.rs, this.ns = t.ns, this.Wi = t.Wi, this.Zi = t.Zi, this.Ki = t.Ki, this.$i = t.$i, this.qi = t.qi, this.Ji = t.Ji;
  }
  jr(t) {
    if (t)
      return this.ps ? void 0 : (this.ps = !0, void this.Br++);
    this.ps && (this.ps = !1, this.Br++);
  }
  vs(t, e, s) {
    let i = !1;
    if (t !== void 0) {
      const n = V(Math.max(1, Math.min(179, t)));
      this.ss !== n && (this.ss = n, i = !0);
    }
    e === void 0 && s === void 0 || (i = this.zr(e, s) || i), this.ps && (this.ps = !1, i = !0), i && this.Br++;
  }
  gs(t, e) {
    let s = !1;
    s = this.zr(t, e) || s, this.ps || (this.ps = !0, s = !0), s && this.Br++;
  }
  cs(t, e, s, i = 0, n = 0, h = 0, o = 0, c = 1, l = 0) {
    (this.ts || this.es !== t || this.rs !== e || this.ns !== s || this.Wi !== i || this.Zi !== n || this.Ki !== h || this.$i !== o || this.qi !== c || this.Ji !== l) && (this.ts = !1, this.es = t, this.rs = e, this.ns = s, this.Wi = i, this.Zi = n, this.Ki = h, this.$i = o, this.qi = c, this.Ji = l, this.Ir++);
  }
  Ms(t, e, s, i, n, h) {
    let o = this.Wi !== t || this.Zi !== e || this.Ki !== s;
    i !== void 0 && this.$i !== i && (this.$i = i, o = !0), n !== void 0 && this.qi !== n && (this.qi = n, o = !0), h !== void 0 && this.Ji !== h && (this.Ji = h, o = !0), o && (this.Wi = t, this.Zi = e, this.Ki = s, this.Ir++);
  }
  ws() {
    (!this.ts || this.es !== 0 || this.rs !== 0 || this.ns !== 0 || this.Wi !== 0 || this.Zi !== 0 || this.Ki !== 0 || this.$i !== 0 || this.qi !== 1 || this.Ji !== 0) && (this.ts = !0, this.es = 0, this.rs = 0, this.ns = 0, this.Wi = 0, this.Zi = 0, this.Ki = 0, this.$i = 0, this.qi = 1, this.Ji = 0, this.Ir++);
  }
  Qr() {
    this.ps && (this.ps = !1, this.Br++);
  }
  zr(t, e) {
    if (t === void 0 && e === void 0) return !1;
    const s = t === void 0 ? this.ds : Math.max(1e-4, t), i = s + 1e-4, n = e === void 0 ? Math.max(this._s, i) : Math.max(i, e);
    return (s !== this.ds || n !== this._s) && (this.ds = s, this._s = n, !0);
  }
}
const ct = 15;
class Vs {
  constructor() {
    a(this, "Hr", new Float32Array(3));
    a(this, "Nr", 0);
    a(this, "Gr", new Float32Array(ct));
    a(this, "Xr", new Float32Array(ct));
    a(this, "Vr", new Float32Array([1, 0, 0]));
    a(this, "Wr", !1);
    a(this, "Yr", 0);
  }
  Mr(t) {
    t.Hr[0] = this.Hr[0], t.Hr[1] = this.Hr[1], t.Hr[2] = this.Hr[2], t.Nr = this.Nr, t.Wr = this.Wr, t.Yr = this.Yr;
    for (let e = 0; e < ct; e++) t.Gr[e] = this.Gr[e], t.Xr[e] = this.Xr[e];
    t.Vr[0] = this.Vr[0], t.Vr[1] = this.Vr[1], t.Vr[2] = this.Vr[2];
  }
  br(t) {
    this.Hr[0] = t.Hr[0], this.Hr[1] = t.Hr[1], this.Hr[2] = t.Hr[2], this.Nr = t.Nr, this.Wr = t.Wr, this.Yr = t.Yr;
    for (let e = 0; e < ct; e++) this.Gr[e] = t.Gr[e], this.Xr[e] = t.Xr[e];
    this.Vr[0] = t.Vr[0], this.Vr[1] = t.Vr[1], this.Vr[2] = t.Vr[2];
  }
  Zr(t, e, s) {
    this.Wr = !0, this.Hr[0] += t, this.Hr[1] += e, this.Hr[2] += s, this.Yr++;
  }
  Kr(t, e, s, i, n, h) {
    if (this.Nr >= 5) return;
    this.Wr = !0;
    const o = 3 * this.Nr;
    this.Gr[o] = i, this.Gr[o + 1] = n, this.Gr[o + 2] = h, this.Xr[o] = t, this.Xr[o + 1] = e, this.Xr[o + 2] = s, this.Nr++, this.Yr++;
  }
  $r(t, e, s) {
    let i = Math.max(0, t);
    const n = Math.max(0, e), h = Math.max(0, s);
    i === 0 && n === 0 && h === 0 && (i = 1), this.Vr[0] === i && this.Vr[1] === n && this.Vr[2] === h || (this.Vr[0] = i, this.Vr[1] = n, this.Vr[2] = h, this.Yr++);
  }
  qr() {
    const t = this.Hr[0] !== 0 || this.Hr[1] !== 0 || this.Hr[2] !== 0, e = this.Nr > 0, s = this.Wr || t || e, i = this.Vr[0] !== 1 || this.Vr[1] !== 0 || this.Vr[2] !== 0;
    if (s || i) {
      this.Wr = !1, this.Hr[0] = 0, this.Hr[1] = 0, this.Hr[2] = 0, this.Nr = 0;
      for (let n = 0; n < ct; n++) this.Gr[n] = 0, this.Xr[n] = 0;
      this.Vr[0] = 1, this.Vr[1] = 0, this.Vr[2] = 0, this.Yr++;
    }
  }
  ie() {
    const t = this.Hr[0] !== 0 || this.Hr[1] !== 0 || this.Hr[2] !== 0;
    if (this.Nr !== 0 || t || this.Wr) {
      this.Wr = !1, this.Hr[0] = 0, this.Hr[1] = 0, this.Hr[2] = 0, this.Nr = 0;
      for (let e = 0; e < ct; e++) this.Gr[e] = 0, this.Xr[e] = 0;
      this.Yr++;
    }
  }
}
function Ut(r, t, e, s, i = 255) {
  r[0] = t / 255, r[1] = (e ?? t) / 255, r[2] = (s ?? t) / 255, r[3] = i / 255;
}
class js {
  constructor() {
    a(this, "Jr", 1);
    a(this, "tn", [1, 1, 0]);
    a(this, "sn", "");
    a(this, "en", [1, 1, 1, 1]);
    a(this, "rn", [0, 0, 0, 1]);
    a(this, "nn", "rgb");
    a(this, "hn", se().maxes);
    a(this, "an", !1);
    a(this, "cn", !1);
    a(this, "un", !1);
    a(this, "ln", 0);
    a(this, "dn", [0, 0, 0, 1]);
  }
  Mr(t) {
    t._n = this.Jr, t.pn = this.an, t.mn = this.cn, t.un = this.un, t.ln = this.ln, t.gn[0] = this.tn[0], t.gn[1] = this.tn[1], t.gn[2] = this.tn[2], t.vn = this.sn, t.yn[0] = this.en[0], t.yn[1] = this.en[1], t.yn[2] = this.en[2], t.yn[3] = this.en[3], t.wn[0] = this.rn[0], t.wn[1] = this.rn[1], t.wn[2] = this.rn[2], t.wn[3] = this.rn[3], t.nn = this.nn, t.hn[0] = this.hn[0], t.hn[1] = this.hn[1], t.hn[2] = this.hn[2], t.hn[3] = this.hn[3];
  }
  br(t) {
    this.Jr = t._n, this.an = t.pn, this.cn = t.mn, this.un = t.un, this.ln = t.ln, this.tn[0] = t.gn[0], this.tn[1] = t.gn[1], this.tn[2] = t.gn[2], this.sn = t.vn, this.en[0] = t.yn[0], this.en[1] = t.yn[1], this.en[2] = t.yn[2], this.en[3] = t.yn[3], this.rn[0] = t.wn[0], this.rn[1] = t.wn[1], this.rn[2] = t.wn[2], this.rn[3] = t.wn[3], this.nn = t.nn, this.hn[0] = t.hn[0], this.hn[1] = t.hn[1], this.hn[2] = t.hn[2], this.hn[3] = t.hn[3];
  }
  Mn(t) {
    this.Jr = Math.abs(t);
  }
  bn(t) {
    this.tn[0] = t[0], this.tn[1] = t[1], this.tn[2] = t[2];
  }
  An(t) {
    this.sn = t;
  }
  Cn(t, e, s, i = 255) {
    Ut(this.en, t, e, s, i);
  }
  xn(t, e, s, i = 255) {
    Ut(this.rn, t, e, s, i);
  }
  Fn(t) {
    this.an = t;
  }
  Sn(t) {
    this.cn = t;
  }
  Pn(t) {
    this.un = t;
  }
  En(t) {
    this.ln = Ot(t);
  }
  Tn(t, e, s, i) {
    Ut(this.dn, t, e, s, i);
  }
  kn() {
    return { mode: this.nn, maxes: [this.hn[0], this.hn[1], this.hn[2], this.hn[3]] };
  }
  Ln(t, e) {
    this.nn = t, this.hn[0] = e[0], this.hn[1] = e[1], this.hn[2] = e[2], this.hn[3] = e[3];
  }
}
class zt {
  constructor() {
    a(this, "Dn", new Ws());
    a(this, "Yi", new zs());
    a(this, "se", new Vs());
    a(this, "gn", new js());
    a(this, "On", []);
    a(this, "Rn", []);
  }
  static Bn() {
    return { _n: 1, ar: 0, cr: 0, ur: 0, lr: 0, dr: 0, _r: 0, pr: 1, mr: 1, gr: 1, vr: et(), ln: 0, pn: !1, mn: !1, un: !1, ps: !1, Br: 0, Ir: 0, ss: is, ds: 0.1, _s: 4096, ts: !0, es: 0, rs: 0, ns: 0, Wi: 0, Zi: 0, Ki: 0, $i: 0, qi: 1, Ji: 0, Nr: 0, Gr: new Float32Array(15), Xr: new Float32Array(15), Hr: new Float32Array(3), Vr: new Float32Array([1, 0, 0]), Wr: !1, Yr: 0, gn: [1, 1, 0], vn: "", yn: [1, 1, 1, 1], wn: [0, 0, 0, 1], nn: se().mode, hn: se().maxes };
  }
  In(t) {
    this.Dn.Mr(t), this.Yi.Mr(t), this.se.Mr(t), this.gn.Mr(t);
  }
  jn(t) {
    this.Dn.br(t), this.Yi.br(t), this.se.br(t), this.gn.br(t);
  }
  je() {
    let t = this.Rn.pop();
    t || (t = zt.Bn()), this.In(t), this.On.push(t);
  }
  ze() {
    const t = this.On.pop();
    t ? (this.jn(t), this.Rn.push(t)) : console.warn("pop() called without matching push()");
  }
  ee() {
    this.Dn.kr(), this.Yi.Qr();
  }
}
var _ = ((r) => (r.RECTANGLE = "rectangle", r.LINE = "line", r.ELLIPSE = "ellipse", r.ARC = "arc", r.TRIANGLE = "triangle", r.BEZIER_CURVE = "bezier_curve", r.BOX = "box", r.SPHERE = "sphere", r.TORUS = "torus", r.CONE = "cone", r.CYLINDER = "cylinder", r.ELLIPSOID = "ellipsoid", r))(_ || {});
const rs = { rectangle: 2, line: 2, ellipse: 2, triangle: 2, arc: 3, bezier_curve: 4, box: 5, sphere: 6, torus: 7, cone: 8, cylinder: 5, ellipsoid: 6 }, re = new Float32Array([-0.5, -0.5, 0, 0, 0.5, -0.5, 1, 0, -0.5, 0.5, 0, 1, -0.5, 0.5, 0, 1, 0.5, -0.5, 1, 0, 0.5, 0.5, 1, 1]), rt = { zn: 16, Qn: { Hn: { size: 2, offset: 0 }, Nn: { size: 2, offset: 8 } } };
class Hs {
  constructor(t) {
    a(this, "xe");
    a(this, "Gn");
    a(this, "Xn");
    this.xe = t, this.Gn = t.createBuffer(), this.Xn = new Float32Array(re.length);
  }
  Vn(t, e, s, i) {
    const n = this.xe, h = ts(this.xe), o = h[2], c = h[3], l = t / o * 2 - 1, u = (t + s) / o * 2 - 1, f = 1 - (e + i) / c * 2, d = 1 - e / c * 2, m = re, y = this.Xn;
    for (let w = 0; w < m.length; w += 4) {
      const v = m[w], g = m[w + 1], x = m[w + 2], b = m[w + 3], A = l + (v + 0.5) * (u - l), E = f + (g + 0.5) * (d - f);
      y[w] = A, y[w + 1] = E, y[w + 2] = x, y[w + 3] = b;
    }
    n.bindBuffer(n.ARRAY_BUFFER, this.Gn), n.bufferData(n.ARRAY_BUFFER, y, n.DYNAMIC_DRAW), _t(n, 0, 2, 16, 0), _t(n, 1, 2, 16, 8), n.drawArrays(n.TRIANGLES, 0, 6), n.disableVertexAttribArray(1), n.disableVertexAttribArray(0), n.bindBuffer(n.ARRAY_BUFFER, null);
  }
  k() {
    this.xe.deleteBuffer(this.Gn);
  }
}
const ne = "glyph_run";
class Qs {
  constructor(t) {
    a(this, "xe");
    a(this, "Wn", /* @__PURE__ */ new Map());
    a(this, "Yn", null);
    this.xe = t;
  }
  Zn(t) {
    const { shader: e, geometryKey: s, unit: i, geometryBuffer: n, indexBuffer: h, instanceAttributes: o } = t, c = this.xe, l = e.program;
    let u = this.Wn.get(e);
    u || (u = /* @__PURE__ */ new Map(), this.Wn.set(e, u), e.D(() => this.Kn(e)));
    let f = u.get(s);
    if (f && f.instanceBufferVersion !== o.$n && (f.vao && (c.deleteVertexArray(f.vao), this.Yn === f.vao && (this.Yn = null)), u.delete(s), f = void 0), f) this.Yn !== f.vao && (c.bindVertexArray(f.vao), this.Yn = f.vao);
    else {
      const d = c.createVertexArray();
      f = { vao: d, instanceBufferVersion: o.$n }, u.set(s, f), c.bindVertexArray(d), this.Yn = d, c.bindBuffer(c.ARRAY_BUFFER, n), h && c.bindBuffer(c.ELEMENT_ARRAY_BUFFER, h);
      const m = c.getAttribLocation(l, "A0");
      m !== -1 && _t(c, m, i.Qn.Hn.size, i.zn, i.Qn.Hn.offset, 0, c.FLOAT, !1);
      const y = c.getAttribLocation(l, "A1");
      y !== -1 && _t(c, y, i.Qn.Nn.size, i.zn, i.Qn.Nn.offset, 0, c.FLOAT, !1), o.qn(e);
    }
  }
  Kn(t) {
    const e = this.Wn.get(t);
    if (e) {
      for (const [, s] of e) s.vao && this.xe.deleteVertexArray(s.vao);
      this.Wn.delete(t);
    }
  }
  Jn() {
    this.Yn !== null && (this.xe.bindVertexArray(null), this.Yn = null);
  }
  k() {
    for (const [, t] of this.Wn) for (const [, e] of t) e.vao && this.xe.deleteVertexArray(e.vao);
    this.Wn.clear();
  }
}
class N {
}
a(N, "BYTES_PER_INSTANCE", 144), a(N, "FLOATS_PER_INSTANCE", 36);
function Y(r, t) {
  return { location: -1, size: r, stride: N.BYTES_PER_INSTANCE, offset: t, divisor: 1 };
}
class Yt {
}
a(Yt, "STRIDE", N.BYTES_PER_INSTANCE), a(Yt, "ATTRIBUTES", { A2: Y(2, 0), A3: Y(2, 8), A4: Y(3, 16), A5: Y(4, 28), A6: Y(4, 44), A7: Y(4, 60), A8: Y(3, 76), A9: Y(3, 88), Aa: Y(4, 100), Ab: Y(4, 116), Ac: Y(3, 132) });
class qs {
  constructor(t = 1e3, e = 1.5) {
    a(this, "th");
    a(this, "ih");
    a(this, "sh");
    a(this, "eh", 0);
    a(this, "rh", 0);
    this.ih = t, this.sh = e;
    const s = t * N.FLOATS_PER_INSTANCE;
    this.th = new Float32Array(s);
  }
  nh(t) {
    if (t <= this.ih) return;
    const e = Math.ceil(t * this.sh), s = this.ih;
    this.ih = e;
    const i = new Float32Array(e * N.FLOATS_PER_INSTANCE), n = s * N.FLOATS_PER_INSTANCE;
    i.set(this.th.subarray(0, Math.min(n, this.eh))), this.th = i;
  }
  hh(t) {
    this.eh += t, this.rh++;
  }
  oh() {
    this.eh = 0, this.rh = 0;
  }
  ah(t = 0, e) {
    return this.th.subarray(t, e ?? this.eh);
  }
}
class Ks {
  constructor(t) {
    a(this, "th");
    this.th = t;
  }
  uh(t) {
    this.th.rh >= this.th.ih && this.th.nh(this.th.rh + 1);
    const e = this.th.th, s = this.th.eh;
    e[s + 0] = t.x, e[s + 1] = t.y, e[s + 2] = t.width, e[s + 3] = t.height, e[s + 4] = t.char0, e[s + 5] = t.char1, e[s + 6] = t.char2, e[s + 7] = t.r1, e[s + 8] = t.g1, e[s + 9] = t.b1, e[s + 10] = t.a1, e[s + 11] = t.r2, e[s + 12] = t.g2, e[s + 13] = t.b2, e[s + 14] = t.a2, e[s + 15] = t.invert, e[s + 16] = t.flipX, e[s + 17] = t.flipY, e[s + 18] = t.charRot, e[s + 19] = t.translationX, e[s + 20] = t.translationY, e[s + 21] = t.translationZ, e[s + 22] = t.rotationX, e[s + 23] = t.rotationY, e[s + 24] = t.rotationZ;
    const i = t.curveParams0, n = t.curveParams1;
    return e[s + 25] = i[0], e[s + 26] = i[1], e[s + 27] = i[2], e[s + 28] = i[3], e[s + 29] = n[0], e[s + 30] = n[1], e[s + 31] = n[2], e[s + 32] = n[3], e[s + 33] = t.depth, e[s + 34] = t.baseZ, e[s + 35] = t.geometryType, this.th.hh(N.FLOATS_PER_INSTANCE), this.th.rh - 1;
  }
}
class Zs {
  constructor(t, e = 1e3) {
    a(this, "xe");
    a(this, "fh", null);
    a(this, "dh", 0);
    a(this, "_h", /* @__PURE__ */ new WeakMap());
    a(this, "ph", 0);
    this.xe = t, this.mh(e);
  }
  mh(t) {
    const e = this.xe;
    this.fh && e.deleteBuffer(this.fh), this.ph++, this.fh = e.createBuffer();
    const s = t * N.BYTES_PER_INSTANCE;
    ee(e, e.ARRAY_BUFFER, this.fh, s, e.DYNAMIC_DRAW), this.dh = t;
  }
  gh(t) {
    this.mh(t);
  }
  Z(t, e) {
    if (e === 0) return;
    const s = this.xe;
    s.bindBuffer(s.ARRAY_BUFFER, this.fh), s.bufferSubData(s.ARRAY_BUFFER, 0, t, 0, e);
  }
  get $n() {
    return this.ph;
  }
  yh(t) {
    let e = this._h.get(t);
    if (!e) {
      e = /* @__PURE__ */ new Map();
      const s = this.xe;
      for (const i in Yt.ATTRIBUTES) {
        const n = i, h = s.getAttribLocation(t, n);
        h !== -1 && e.set(n, h);
      }
      this._h.set(t, e);
    }
    return e;
  }
  qn(t) {
    const e = this.xe, s = t.program, i = this.yh(s);
    e.bindBuffer(e.ARRAY_BUFFER, this.fh);
    for (const [n, h] of i) {
      const o = Yt.ATTRIBUTES[n];
      o && _t(e, h, o.size, o.stride, o.offset, o.divisor);
    }
  }
  k() {
    this.fh && (this.xe.deleteBuffer(this.fh), this.fh = null);
  }
}
class $s {
  constructor(t, e = 1e3, s = 1.5) {
    a(this, "xe");
    a(this, "th");
    a(this, "wh");
    a(this, "Mh");
    this.xe = t, this.th = new qs(e, s), this.wh = new Ks(this.th), this.Mh = new Zs(t, e);
  }
  bh() {
    this.th.ih > this.Mh.dh && this.Mh.gh(this.th.ih);
  }
  get writer() {
    return this.wh;
  }
  get Ah() {
    return this.Mh;
  }
  Ch() {
    this.th.oh();
  }
  xh(t, e) {
    if (e === 0) return;
    const s = e * N.FLOATS_PER_INSTANCE;
    this.th.nh(this.th.rh + e);
    const i = this.th.th, n = this.th.eh;
    for (let h = 0; h < s; h++) i[n + h] = t[h];
    this.th.eh += s, this.th.rh += e;
  }
  Fh() {
    this.th.rh !== 0 && (this.bh(), this.Mh.Z(this.th.th, this.th.eh));
  }
  Vn(t, e) {
    const s = this.th.rh;
    s !== 0 && this.xe.drawArraysInstanced(t, 0, e, s);
  }
  Sh(t, e, s, i = 0) {
    const n = this.th.rh;
    n !== 0 && this.xe.drawElementsInstanced(t, e, s, i, n);
  }
  k() {
    this.Mh.k();
  }
}
class nt {
  constructor(t, e, s, i) {
    a(this, "xe");
    a(this, "Ph");
    a(this, "Eh");
    a(this, "Th");
    a(this, "kh", null);
    a(this, "Lh", null);
    a(this, "Dh", [0, 0, 0, 0]);
    a(this, "Oh", [0, 0, 0, 0]);
    a(this, "Rh");
    var n, h;
    this.xe = t, this.Ph = e, this.Eh = s, this.Th = i, this.Rh = (n = this.Dh, h = this.Oh, { x: 0, y: 0, width: 0, height: 0, char0: 0, char1: 0, char2: 0, r1: 0, g1: 0, b1: 0, a1: 0, r2: 0, g2: 0, b2: 0, a2: 0, invert: 0, flipX: 0, flipY: 0, charRot: 0, translationX: 0, translationY: 0, translationZ: 0, rotationX: 0, rotationY: 0, rotationZ: 0, curveParams0: n, curveParams1: h, depth: 0, baseZ: 0, geometryType: 0 });
    const o = this.xe.createBuffer();
    if (ee(this.xe, this.xe.ARRAY_BUFFER, o, this.Th.Bh, this.xe.STATIC_DRAW), this.kh = o, this.Th.Ih) {
      const c = this.xe.createBuffer();
      ee(this.xe, this.xe.ELEMENT_ARRAY_BUFFER, c, this.Th.Ih, this.xe.STATIC_DRAW), this.Lh = c;
    }
  }
  get type() {
    return this.Eh;
  }
  get unitGeometry() {
    return this.Th;
  }
  get unitBuffer() {
    return this.kh;
  }
  get unitIndexBuffer() {
    return this.Lh;
  }
  get batch() {
    return this.Ph;
  }
  jh() {
    this.Ph.Ch();
  }
  zh() {
    return this.Ph.th.rh !== 0;
  }
  k() {
    this.Ph.k(), this.xe.deleteBuffer(this.kh), this.Lh && this.xe.deleteBuffer(this.Lh);
  }
  uh(t, e, s, i, n, h, o) {
    const c = n.ar ?? 0, l = n.cr ?? 0, u = n.ur ?? 0, f = n.lr ?? 0, d = n.dr ?? 0, m = o ?? n._r ?? 0, y = n.pr ?? 1, w = n.mr ?? 1, v = n.gr ?? 1, g = this.Dh, x = this.Oh;
    g[0] = 0, g[1] = 0, g[2] = 0, g[3] = 0, x[0] = 0, x[1] = 0, x[2] = 0, x[3] = 0, h && (h.bezStartX !== void 0 && h.bezStartY !== void 0 && h.bezEndX !== void 0 && h.bezEndY !== void 0 ? (g[0] = h.cp1x ?? 0, g[1] = h.cp1y ?? 0, g[2] = h.cp2x ?? 0, g[3] = h.cp2y ?? 0, x[0] = h.bezStartX ?? 0, x[1] = h.bezStartY ?? 0, x[2] = h.bezEndX ?? 0, x[3] = h.bezEndY ?? 0) : h.arcStart === void 0 && h.arcStop === void 0 || (g[0] = h.arcStart ?? 0, g[1] = h.arcStop ?? 0));
    const b = this.Rh;
    return b.x = t * y, b.y = e * w, b.width = s * y, b.height = i * w, b.char0 = n.gn[0], b.char1 = n.gn[1], b.char2 = n.gn[2], b.r1 = n.yn[0], b.g1 = n.yn[1], b.b1 = n.yn[2], b.a1 = n.yn[3], b.r2 = n.wn[0], b.g2 = n.wn[1], b.b2 = n.wn[2], b.a2 = n.wn[3], b.invert = n.un ? 1 : 0, b.flipX = n.pn ? 1 : 0, b.flipY = n.mn ? 1 : 0, b.charRot = n.ln, b.translationX = c, b.translationY = l, b.translationZ = u, b.rotationX = f, b.rotationY = d, b.rotationZ = m, b.depth = ((h == null ? void 0 : h.depth) ?? 0) * v, b.baseZ = ((h == null ? void 0 : h.baseZ) ?? 0) * v, b.geometryType = rs[this.Eh] ?? 0, this.Ph.writer.uh(b);
  }
}
const Js = { Bh: re, Qh: 6, ...rt };
class ti extends nt {
  constructor(t, e) {
    super(t, e, _.RECTANGLE, Js);
  }
  Hh(t, e) {
    return this.uh(0, 0, t.width, t.height, e);
  }
}
const ei = { Bh: new Float32Array([0, -0.5, 0, 0, 1, -0.5, 1, 0, 0, 0.5, 0, 1, 0, 0.5, 0, 1, 1, -0.5, 1, 0, 1, 0.5, 1, 1]), Qh: 6, ...rt };
class si extends nt {
  constructor(t, e) {
    super(t, e, _.LINE, ei);
  }
  Hh(t, e) {
    const s = t.x2 - t.x1, i = t.y2 - t.y1, n = Math.hypot(s, i), h = Math.atan2(i, s), o = e._n || 1, c = Math.cos(-h), l = Math.sin(-h), u = t.x1 * c - t.y1 * l, f = t.x1 * l + t.y1 * c;
    return this.uh(u, f, n, o, e, null, (e._r || 0) + h);
  }
}
const ii = { Bh: (function(r = 32) {
  const t = [], e = 2 * Math.PI / r;
  for (let s = 0; s < r; s++) {
    const i = s * e, n = (s + 1) % r * e, h = Math.cos(i), o = Math.sin(i), c = 0.5 * (h + 1), l = 0.5 * (o + 1), u = Math.cos(n), f = Math.sin(n), d = 0.5 * (u + 1), m = 0.5 * (f + 1);
    t.push(0, 0, 0.5, 0.5, h, o, c, l, u, f, d, m);
  }
  return new Float32Array(t);
})(32), Qh: 96, ...rt };
class ri extends nt {
  constructor(t, e) {
    super(t, e, _.ELLIPSE, ii);
  }
  Hh(t, e) {
    return this.uh(0, 0, t.width, t.height, e);
  }
}
const ni = { Bh: (function(r) {
  const t = [];
  for (let e = 0; e < r; e++) {
    const s = e / r, i = (e + 1) / r;
    t.push(s, 0, s, 0, s, 1, s, 1, i, 1, i, 1);
  }
  return new Float32Array(t);
})(32), Qh: 96, ...rt };
class hi extends nt {
  constructor(t, e) {
    super(t, e, _.ARC, ni);
  }
  Hh(t, e) {
    const s = V(t.start), i = V(t.stop);
    return this.uh(0, 0, t.width, t.height, e, { arcStart: s, arcStop: i });
  }
}
const oi = { Bh: new Float32Array([0, 0, 0, 0, 1, 0, 1, 0, 0.5, 1, 0.5, 1]), Qh: 3, ...rt };
class ai extends nt {
  constructor(t, e) {
    super(t, e, _.TRIANGLE, oi);
  }
  Hh(t, e) {
    const s = Math.min(t.x1, t.x2, t.x3), i = Math.max(t.x1, t.x2, t.x3), n = Math.min(t.y1, t.y2, t.y3), h = i - s, o = Math.max(t.y1, t.y2, t.y3) - n;
    return this.uh(s, n, h, o, e);
  }
}
const ci = { Bh: (function(r = 16) {
  const t = [];
  for (let e = 0; e < r; e++) {
    const s = e / r, i = (e + 1) / r;
    t.push(s, -0.5, s, 0, i, -0.5, i, 0, s, 0.5, s, 1, s, 0.5, s, 1, i, -0.5, i, 0, i, 0.5, i, 1);
  }
  return new Float32Array(t);
})(16), Qh: 96, ...rt };
class ui extends nt {
  constructor(t, e) {
    super(t, e, _.BEZIER_CURVE, ci);
  }
  Hh(t, e) {
    return this.uh(0, 0, 1, e._n || 1, e, { cp1x: t.cp1x, cp1y: t.cp1y, cp2x: t.cp2x, cp2y: t.cp2y, bezStartX: t.x1, bezStartY: t.y1, bezEndX: t.x2, bezEndY: t.y2 });
  }
}
class ut extends nt {
  constructor(t, e, s, i) {
    super(t, e, s, (function(n) {
      return { Bh: n.vertices, Ih: n.indices, Qh: n.vertices.length / 4, Nh: n.indices.length, ...rt };
    })(i));
  }
  Hh(t, e) {
    return this.uh(0, 0, t.width, t.height, e, { depth: t.depth });
  }
}
const li = { vertices: new Float32Array([-0.5, -0.5, 0.5, 0, 0.5, -0.5, 0.5, 0, 0.5, 0.5, 0.5, 0, -0.5, 0.5, 0.5, 0, 0.5, -0.5, -0.5, 0, -0.5, -0.5, -0.5, 0, -0.5, 0.5, -0.5, 0, 0.5, 0.5, -0.5, 0, -0.5, -0.5, -0.5, 0, -0.5, -0.5, 0.5, 0, -0.5, 0.5, 0.5, 0, -0.5, 0.5, -0.5, 0, 0.5, -0.5, 0.5, 0, 0.5, -0.5, -0.5, 0, 0.5, 0.5, -0.5, 0, 0.5, 0.5, 0.5, 0, -0.5, 0.5, 0.5, 0, 0.5, 0.5, 0.5, 0, 0.5, 0.5, -0.5, 0, -0.5, 0.5, -0.5, 0, -0.5, -0.5, -0.5, 0, 0.5, -0.5, -0.5, 0, 0.5, -0.5, 0.5, 0, -0.5, -0.5, 0.5, 0]), indices: new Uint16Array([0, 1, 2, 0, 2, 3, 4, 5, 6, 4, 6, 7, 8, 9, 10, 8, 10, 11, 12, 13, 14, 12, 14, 15, 16, 17, 18, 16, 18, 19, 20, 21, 22, 20, 22, 23]) }, Ge = (function(r = 12, t = 16) {
  const e = [], s = [];
  for (let n = 0; n <= r; n++) {
    const h = n / r * Math.PI, o = Math.sin(h), c = Math.cos(h);
    for (let l = 0; l <= t; l++) {
      const u = l / t * Math.PI * 2, f = Math.sin(u), d = Math.cos(u) * o * 0.5, m = 0.5 * c, y = f * o * 0.5;
      e.push(d, m, y, 0);
    }
  }
  const i = t + 1;
  for (let n = 0; n < r; n++) for (let h = 0; h < t; h++) {
    const o = n * i + h, c = o + i;
    s.push(o, c, o + 1, o + 1, c, c + 1);
  }
  return { vertices: new Float32Array(e), indices: new Uint16Array(s) };
})(14, 20), fi = (function(r = 16, t = 12) {
  const e = [], s = [];
  for (let n = 0; n <= r; n++) {
    const h = n / r * Math.PI * 2, o = Math.cos(h), c = Math.sin(h);
    for (let l = 0; l <= t; l++) {
      const u = l / t * Math.PI * 2, f = Math.cos(u), d = Math.sin(u);
      e.push(o, c, f, d);
    }
  }
  const i = t + 1;
  for (let n = 0; n < r; n++) for (let h = 0; h < t; h++) {
    const o = n * i + h, c = (n + 1) * i + h;
    s.push(o, c, o + 1, o + 1, c, c + 1);
  }
  return { vertices: new Float32Array(e), indices: new Uint16Array(s) };
})(20, 16), di = (function(r = 20) {
  const t = [], e = [];
  t.push(0, 0.5, 0, 0), t.push(0, -0.5, 0, 0);
  for (let s = 0; s < r; s++) {
    const i = s / r * Math.PI * 2, n = 0.5 * Math.cos(i), h = 0.5 * Math.sin(i);
    t.push(n, -0.5, h, 0);
  }
  for (let s = 0; s < r; s++) {
    const i = 2 + s, n = 2 + (s + 1) % r;
    e.push(0, i, n), e.push(1, n, i);
  }
  return { vertices: new Float32Array(t), indices: new Uint16Array(e) };
})(24), pi = (function(r = 24) {
  const t = [], e = [];
  t.push(0, 0.5, 0, 0), t.push(0, -0.5, 0, 0);
  for (let i = 0; i < r; i++) {
    const n = i / r * Math.PI * 2;
    t.push(0.5 * Math.cos(n), 0.5, 0.5 * Math.sin(n), 0);
  }
  for (let i = 0; i < r; i++) {
    const n = i / r * Math.PI * 2;
    t.push(0.5 * Math.cos(n), -0.5, 0.5 * Math.sin(n), 0);
  }
  const s = 2 + r;
  for (let i = 0; i < r; i++) {
    const n = (i + 1) % r, h = 2 + i, o = 2 + n, c = s + i, l = s + n;
    e.push(0, o, h), e.push(1, c, l), e.push(h, c, o), e.push(o, c, l);
  }
  return { vertices: new Float32Array(t), indices: new Uint16Array(e) };
})(24), gi = { [_.RECTANGLE]: (r, t) => new ti(r, t), [_.LINE]: (r, t) => new si(r, t), [_.ELLIPSE]: (r, t) => new ri(r, t), [_.ARC]: (r, t) => new hi(r, t), [_.TRIANGLE]: (r, t) => new ai(r, t), [_.BEZIER_CURVE]: (r, t) => new ui(r, t), [_.BOX]: (r, t) => new ut(r, t, _.BOX, li), [_.SPHERE]: (r, t) => new ut(r, t, _.SPHERE, Ge), [_.TORUS]: (r, t) => new ut(r, t, _.TORUS, fi), [_.CONE]: (r, t) => new ut(r, t, _.CONE, di), [_.CYLINDER]: (r, t) => new ut(r, t, _.CYLINDER, pi), [_.ELLIPSOID]: (r, t) => new ut(r, t, _.ELLIPSOID, Ge) };
class mi {
  constructor(t) {
    a(this, "xe");
    a(this, "Gh");
    a(this, "Xh");
    a(this, "Vh", null);
    a(this, "Wh", /* @__PURE__ */ new Map());
    a(this, "Yh", null);
    a(this, "Zh", "");
    a(this, "Kh", et());
    a(this, "$h", et());
    a(this, "qh", [0, 0, 0]);
    a(this, "Jh", [0, 0, 0]);
    a(this, "io", [0, 1, 0]);
    this.xe = t, this.Xh = new Qs(t), this.Gh = /* @__PURE__ */ new Map();
    for (const e of Object.values(_)) {
      const s = new $s(t), i = (0, gi[e])(t, s);
      this.Gh.set(e, i);
    }
  }
  so(t) {
    this.Vh = null, this.Wh.clear(), this.Yh = null, this.Zh = "";
    let e = null, s = null, i = null, n = !1, h = -1, o = -1, c = -1, l = null;
    for (const u of t) {
      const f = u.type === ne ? _.RECTANGLE : u.type;
      e === u.material && s === f && n === u.state.ps && h === u.state.Br && o === u.state.Ir && c === u.state.Yr || (i && i.zh() && this.eo(i, e, s, l), e = u.material, s = f, i = this.Gh.get(s), n = u.state.ps, h = u.state.Br, o = u.state.Ir, c = u.state.Yr, l = u.state, i.jh()), u.type === ne ? i.batch.xh(u.params.data, u.params.instanceCount) : i.Hh(u.params, u.state);
    }
    i && i.zh() && this.eo(i, e, s, l), this.Xh.Jn();
  }
  eo(t, e, s, i) {
    this.Vh !== e.shader && (e.shader.er(), this.Vh = e.shader), this.Yh !== e && (e.shader.oe(e.uniforms), this.Yh = e);
    const n = ts(this.xe), h = `${i.Br}:${i.Ir}:${i.Yr}:${n[2]}:${n[3]}`;
    if (this.Wh.get(e.shader) !== h) {
      const u = `${i.Br}:${i.Ir}:${n[2]}:${n[3]}`;
      this.Zh !== u && (this.ro(i, n[2], n[3]), this.Zh = u), e.shader.oe({ Um: n[2] / n[3], Un: this.Kh, Uo: this.$h, u_tmUseLighting: i.Wr || i.Nr > 0 || i.Hr[0] !== 0 || i.Hr[1] !== 0 || i.Hr[2] !== 0, u_tmAmbientLightColor: i.Hr, u_tmPointLightCount: i.Nr, u_tmPointLightPositions: i.Gr, u_tmPointLightColors: i.Xr, u_tmLightFalloff: i.Vr }), this.Wh.set(e.shader, h);
    }
    const o = t.unitGeometry, c = t.unitBuffer, l = o.no ?? this.xe.TRIANGLES;
    try {
      t.batch.Fh(), this.Xh.Zn({ shader: e.shader, geometryKey: s + "", unit: o, geometryBuffer: c, indexBuffer: t.unitIndexBuffer, instanceAttributes: t.batch.Ah }), o.Ih && o.Nh ? t.batch.Sh(l, o.Nh, o.ho ?? this.xe.UNSIGNED_SHORT, o.oo ?? 0) : t.batch.Vn(l, o.Qh);
    } finally {
      t.jh();
    }
  }
  ro(t, e, s) {
    const i = Math.max(1, s), n = Math.max(1 / 4096, e / i), h = t.ds, o = t._s;
    if (this.Jh[0] = t.Wi, this.Jh[1] = t.Zi, this.Jh[2] = t.Ki, this.io[0] = t.$i, this.io[1] = t.qi, this.io[2] = t.Ji, t.ts) {
      const c = 0.5 * i / Math.tan(0.5 * t.ss);
      this.qh[0] = this.Jh[0], this.qh[1] = this.Jh[1], this.qh[2] = this.Jh[2] + c, Re(this.qh, this.Jh, this.io, this.Kh);
    } else this.qh[0] = t.es, this.qh[1] = t.rs, this.qh[2] = t.ns, Re(this.qh, this.Jh, this.io, this.Kh);
    if (t.ps) {
      const c = 0.5 * e, l = 0.5 * i;
      return void (function(u, f, d, m, y, w, v = new Float32Array(16)) {
        const g = 1 / (u - f), x = 1 / (d - m), b = 1 / (y - w);
        v[0] = -2 * g, v[1] = 0, v[2] = 0, v[3] = 0, v[4] = 0, v[5] = -2 * x, v[6] = 0, v[7] = 0, v[8] = 0, v[9] = 0, v[10] = 2 * b, v[11] = 0, v[12] = (u + f) * g, v[13] = (m + d) * x, v[14] = (w + y) * b, v[15] = 1;
      })(-c, c, -l, l, h, o, this.$h);
    }
    (function(c, l, u, f, d = new Float32Array(16)) {
      const m = 1 / Math.tan(0.5 * c), y = 1 / (u - f);
      d[0] = m / l, d[1] = 0, d[2] = 0, d[3] = 0, d[4] = 0, d[5] = m, d[6] = 0, d[7] = 0, d[8] = 0, d[9] = 0, d[10] = (f + u) * y, d[11] = -1, d[12] = 0, d[13] = 0, d[14] = 2 * f * u * y, d[15] = 0;
    })(t.ss, n, h, o, this.$h);
  }
  k() {
    for (const t of this.Gh.values()) t.k();
    this.Gh.clear(), this.Xh.k();
  }
}
const ns = "vec3 rotateAroundX(vec3 A,float B){float C=cos(B);float D=sin(B);return vec3(A.x,A.y*C-A.z*D,A.y*D+A.z*C);}vec3 rotateAroundY(vec3 A,float B){float C=cos(B);float D=sin(B);return vec3(A.x*C+A.z*D,A.y,-A.x*D+A.z*C);}vec3 rotateAroundZ(vec3 A,float B){float C=cos(B);float D=sin(B);return vec3(A.x*C-A.y*D,A.x*D+A.y*C,A.z);}vec3 applyRotation(vec3 A,vec3 E){vec3 F=A;if(E.z!=0.0f){F=rotateAroundZ(F,E.z);}if(E.y!=0.0f){F=rotateAroundY(F,E.y);}if(E.x!=0.0f){F=rotateAroundX(F,E.x);}return F;}", hs = `#version 300 es
in vec2 A0;in vec2 A1;in vec2 A2;in vec2 A3;in vec3 A4;in vec4 A5;in vec4 A6;in vec4 A7;in vec3 A8;in vec3 A9;in vec4 Aa;in vec4 Ab;in vec3 Ac;uniform mat4 Un;uniform mat4 Uo;out vec2 v_uv;out vec3 v_glyphIndex;out vec4 v_glyphColor;out vec4 v_cellColor;out vec4 v_glyphFlags;out vec3 v_worldPosition;out vec3 v_normal;out float v_geometryType;const float A=6.28318530718f;const int B=2;const int C=3;const int D=4;const int E=5;const int F=6;const int G=7;const int H=8;
` + ns + `
vec2 I(float J,vec2 K,vec2 L,vec2 M,vec2 N){float O=1.0f-J;float P=O*O;float Q=P*O;float R=J*J;float S=R*J;return Q*K+3.0f*P*J*L+3.0f*O*R*M+S*N;}vec2 T(float J,vec2 K,vec2 L,vec2 M,vec2 N){float O=1.0f-J;float P=O*O;float R=J*J;return-3.0f*P*K+3.0f*(P-2.0f*O*J)*L+3.0f*(2.0f*O*J-R)*M+3.0f*R*N;}void main(){v_uv=A1;v_glyphIndex=A4;v_glyphColor=A5;v_cellColor=A6;v_glyphFlags=A7;vec4 U=Aa;vec4 V=Ab;vec2 W=A3;vec2 X=A2;float Y=Ac.x;float Z=Ac.y;int a=int(Ac.z);vec3 b=vec3(0.0f);if(a==D){float J=clamp(A0.x,0.0f,1.0f);vec2 K=V.xy;vec2 L=U.xy;vec2 M=U.zw;vec2 N=V.zw;vec2 c=I(J,K,L,M,N);vec2 d=T(J,K,L,M,N);float e=length(d);vec2 f=e>0.0f?d/e:vec2(1.0f,0.0f);vec2 g=vec2(-f.y,f.x);vec2 h=c+g*A0.y*W.y;b=vec3(h,Z);}else if(a==C){float i=mod(U.x,A);if(i<0.0f){i+=A;}float j=mod(U.y,A);if(j<0.0f){j+=A;}float k=i-j;if(k<=0.0f){k+=A;}float l=i-A0.x*k;vec2 m=vec2(cos(l),sin(l))*A0.y;vec2 h=m*W+X;b=vec3(h,Z);}else if(a==B){vec2 h=A0.xy*W+X;b=vec3(h,Z);}else if(a==G){float n=max(0.0f,W.x*0.5f);float o=max(0.0f,Y*0.5f);float p=max(0.0f,W.y*0.5f);float q=max(0.0f,n-p);float r=max(0.0f,o-p);float s=A0.x;float t=A0.y;float u=A1.x;float v=A1.y;float w=q+p*u;float x=r+p*u;b=vec3(w*s+X.x,p*v+X.y,x*t+Z);}else if(a==E||a==F||a==H){b=vec3(A0.x*W.x+X.x,A0.y*W.y+X.y,A1.x*Y+Z);}vec3 y=applyRotation(b,A9);vec3 z=y+A8;vec3 AA=vec3(0.0f,0.0f,1.0f);v_worldPosition=z;v_normal=AA;v_geometryType=float(a);vec4 AB=Uo*Un*vec4(z,1.0f);AB.y=-AB.y;gl_Position=AB;}`, os = `#version 300 es
in vec2 A0;in vec2 A1;in vec2 A2;in vec2 A3;in vec3 A4;in vec4 A5;in vec4 A6;in vec4 A7;in vec3 A8;in vec3 A9;in vec3 Ac;uniform mat4 Un;uniform mat4 Uo;out vec2 v_uv;out vec3 v_glyphIndex;out vec4 v_glyphColor;out vec4 v_cellColor;out vec4 v_glyphFlags;out vec3 v_worldPosition;out vec3 v_normal;out float v_geometryType;const float A=2.0f;
` + ns + `
void main(){v_uv=A1;v_glyphIndex=A4;v_glyphColor=A5;v_cellColor=A6;v_glyphFlags=A7;vec2 B=A0.xy*A3+A2;float C=Ac.y;vec3 D=vec3(B,C);vec3 E=applyRotation(D,A9)+A8;v_worldPosition=E;v_normal=vec3(0.0f,0.0f,1.0f);v_geometryType=A;vec4 F=Uo*Un*vec4(E,1.0f);F.y=-F.y;gl_Position=F;}`, le = "uniform bool u_tmUseLighting;uniform vec3 u_tmAmbientLightColor;uniform int u_tmPointLightCount;uniform vec3 u_tmPointLightPositions[5];uniform vec3 u_tmPointLightColors[5];uniform vec3 u_tmLightFalloff;const int TM_MAX_POINT_LIGHTS=5;vec3 tmComputeGeometricNormal(vec3 A){vec3 B=cross(dFdy(A),dFdx(A));float C=length(B);if(C<=0.000001f){return vec3(0.0f,0.0f,1.0f);}return B/C;}vec3 tmApplyLighting(vec3 D,vec3 A){if(!u_tmUseLighting){return D;}vec3 E=D*u_tmAmbientLightColor;if(u_tmPointLightCount>0){vec3 B=tmComputeGeometricNormal(A);for(int F=0;F<TM_MAX_POINT_LIGHTS;F++){if(F>=u_tmPointLightCount){break;}vec3 G=u_tmPointLightPositions[F]-A;float H=length(G);vec3 I=H>0.000001f?G/H:B;float J=max(dot(B,I),0.0f);float K=u_tmLightFalloff.x+H*u_tmLightFalloff.y+H*H*u_tmLightFalloff.z;float L=K>0.0f?1.0f/K:1.0f;E+=D*u_tmPointLightColors[F]*(J*L);}}return clamp(E,0.0f,1.0f);}", yi = `#version 300 es
precision highp float;in vec3 v_glyphIndex;in vec4 v_glyphColor;in vec4 v_cellColor;in vec4 v_glyphFlags;in vec3 v_worldPosition;layout(location=0)out vec4 o_character;layout(location=1)out vec4 o_primaryColor;layout(location=2)out vec4 o_secondaryColor;layout(location=3)out vec4 o_statePayload;
` + le + `
void main(){int A=int(v_glyphFlags.r>0.5?1:0);int B=int(v_glyphFlags.g>0.5?1:0);int C=int(v_glyphFlags.b>0.5?1:0);float D=float(A|(B<<1)|(C<<2))/255.;o_character=vec4(v_glyphIndex.xy,D,clamp(v_glyphFlags.a,0.,1.));vec3 E=tmApplyLighting(v_glyphColor.rgb,v_worldPosition);vec3 F=tmApplyLighting(v_cellColor.rgb,v_worldPosition);o_primaryColor=vec4(E,v_glyphColor.a);o_secondaryColor=vec4(F,v_cellColor.a);o_statePayload=vec4(0.);}`, vi = `#version 300 es
precision highp float;in vec2 v_uv;in vec3 v_worldPosition;uniform sampler2D U1;uniform sampler2D U2;uniform sampler2D U3;uniform sampler2D U4;uniform vec2 U5;uniform bool U6;uniform bool U7;uniform bool U8;layout(location=0)out vec4 o_character;layout(location=1)out vec4 o_primaryColor;layout(location=2)out vec4 o_secondaryColor;layout(location=3)out vec4 o_statePayload;
` + le + `
void main(){vec2 A=vec2(v_uv.x,1.-v_uv.y);vec2 B=A*U5;vec2 C=(floor(B)+0.5f)/U5;vec4 D=texture(U1,C);vec4 E=U6?texture(U2,C):vec4(0.);if(U6&&E.a==0.){discard;}vec4 F=U7?texture(U3,C):vec4(0.);vec4 G=U8?texture(U4,C):vec4(0.);vec3 H=tmApplyLighting(E.rgb,v_worldPosition);vec3 I=tmApplyLighting(F.rgb,v_worldPosition);o_character=D;o_primaryColor=vec4(H,E.a);o_secondaryColor=vec4(I,F.a);o_statePayload=G;}`;
class wi {
  constructor(t) {
    a(this, "ao", 0);
    a(this, "he");
    a(this, "Xe");
    a(this, "co");
    this.he = new Et(t, hs, yi), this.Xe = new Et(t, os, vi), this.co = { id: this.ao++, shader: this.he, uniforms: Object.freeze({}), isBuiltIn: !0 };
  }
  Ve(t, e = {}) {
    return { id: this.ao++, shader: t, uniforms: Object.freeze({ ...e }), isBuiltIn: !1 };
  }
  k() {
    this.he.dispose(), this.Xe.dispose();
  }
}
class xi {
  constructor() {
    a(this, "uo", []);
    a(this, "lo", 1);
    a(this, "fo", 0);
  }
  do(t, e) {
    if (this.fo >= this.uo.length) {
      const i = { id: this.lo++, type: t, params: {}, state: zt.Bn(), material: e };
      this.uo.push(i);
    }
    const s = this.uo[this.fo];
    return s.id = this.lo++, s.type = t, s.material = e, this.fo++, s;
  }
  _o(t, e) {
    var i;
    if (t.data && t.data.length >= e) return;
    let s = Math.max(N.FLOATS_PER_INSTANCE, ((i = t.data) == null ? void 0 : i.length) ?? 0);
    for (; s < e; ) s *= 2;
    t.data = new Float32Array(s);
  }
  po(t, e, s, i) {
    const n = this.do(_.RECTANGLE, i), h = n.params;
    return h.width = t, h.height = e, s.In(n.state), n.id;
  }
  mo(t, e, s, i, n, h) {
    const o = this.do(_.LINE, h), c = o.params;
    return c.x1 = t, c.y1 = e, c.x2 = s, c.y2 = i, n.In(o.state), o.id;
  }
  vo(t, e, s, i) {
    const n = this.do(_.ELLIPSE, i), h = n.params;
    return h.width = t, h.height = e, s.In(n.state), n.id;
  }
  yo(t, e, s, i, n, h) {
    const o = this.do(_.ARC, h), c = o.params;
    return c.width = t, c.height = e, c.start = s, c.stop = i, n.In(o.state), o.id;
  }
  wo(t, e, s, i, n, h, o, c) {
    const l = this.do(_.TRIANGLE, c), u = l.params;
    return u.x1 = t, u.y1 = e, u.x2 = s, u.y2 = i, u.x3 = n, u.y3 = h, o.In(l.state), l.id;
  }
  Mo(t, e, s, i, n, h, o, c, l, u) {
    const f = this.do(_.BEZIER_CURVE, u), d = f.params;
    return d.x1 = t, d.y1 = e, d.cp1x = s, d.cp1y = i, d.cp2x = n, d.cp2y = h, d.x2 = o, d.y2 = c, l.In(f.state), f.id;
  }
  bo(t, e, s, i, n, h) {
    const o = this.do(t, h), c = o.params;
    return c.width = e, c.height = s, c.depth = i, n.In(o.state), o.id;
  }
  Ao(t, e, s, i) {
    const n = this.do(ne, i), h = n.params, o = e * N.FLOATS_PER_INSTANCE;
    this._o(h, o);
    for (let c = 0; c < o; c++) h.data[c] = t[c];
    return h.instanceCount = e, s.In(n.state), n.id;
  }
  Ch() {
    this.fo = 0;
  }
  [Symbol.iterator]() {
    let t = 0;
    const e = this.fo, s = this.uo;
    return { next: () => t < e ? { value: s[t++], done: !1 } : { value: void 0, done: !0 } };
  }
}
class bi {
  constructor(t) {
    a(this, "xe");
    a(this, "Vh", null);
    a(this, "Co");
    a(this, "xo");
    a(this, "Fo");
    a(this, "So");
    a(this, "Po");
    a(this, "Eo", null);
    a(this, "To", {});
    a(this, "ko", []);
    a(this, "Lo", []);
    a(this, "Do", []);
    a(this, "Oo", []);
    a(this, "Ro", null);
    a(this, "Bo", [0, 0, 0, 0]);
    a(this, "Io", 1);
    a(this, "jo", !0);
    a(this, "zo", !0);
    a(this, "Qo", !1);
    a(this, "Ho", new Float32Array(4));
    a(this, "No", /* @__PURE__ */ new Set());
    this.xe = t, t.enable(t.DEPTH_TEST), t.depthFunc(t.LEQUAL), t.clearDepth(1), t.depthMask(!0), this.jo = !0, this.zo = !0, t.disable(t.CULL_FACE), this.Fo = new zt(), this.xo = new wi(t), this.So = new xi(), this.Co = new mi(t), this.Po = new Hs(t);
    const e = [0, 0, t.canvas.width, t.canvas.height];
    qt(t, e), this.Lo.push(null), this.Do.push(e), this.Oo.push(1), this.Ro = null, this.Bo = e, this.Io = 1;
  }
  Be() {
    this.Lo.push(this.Ro), this.Do.push([...this.Bo]), this.Oo.push(this.Io);
  }
  He() {
    const t = this.Lo.pop() ?? null, e = this.Do.pop() ?? [0, 0, this.xe.canvas.width, this.xe.canvas.height], s = this.Oo.pop() ?? 1;
    this.Ie(t, e[2], e[3], s);
  }
  Ie(t, e, s, i = 1) {
    const n = this.xe;
    this.Ro !== t && (n.bindFramebuffer(n.FRAMEBUFFER, t), this.Ro = t), this.Io = i;
    const h = [0, 0, e, s];
    this.Bo[0] === h[0] && this.Bo[1] === h[1] && this.Bo[2] === h[2] && this.Bo[3] === h[3] || (n.viewport(...h), qt(n, h), this.Bo = h);
  }
  he(t) {
    this.Vh !== t && (this.Vh = t, t.er());
  }
  Go(t) {
    if (this.Qo = t, t) this.No.clear();
    else {
      for (const e of this.No) e.Xo();
      this.No.clear();
    }
  }
  Vo() {
    return this.Qo;
  }
  sr(t, e) {
    return new Et(this.xe, t, e);
  }
  Wo(t) {
    this.Eo = t, t && (this.To = {});
  }
  Yo() {
    this.Eo = null, this.To = {};
  }
  nr(t, e) {
    this.To[t] = e;
  }
  oe(t) {
    Object.assign(this.To, t);
  }
  Zo(t = !1) {
    this.ko.push({ shader: this.Eo, uniforms: { ...this.To } }), t && this.Yo();
  }
  Ko() {
    const t = this.ko.pop();
    t && (this.Eo = t.shader, this.To = t.shader ? { ...t.uniforms } : {});
  }
  $o(t) {
    return new Et(this.xe, hs, t);
  }
  qo() {
    return this.Eo ? this.xo.Ve(this.Eo, this.To) : this.xo.co;
  }
  Jo(t, e, s, i) {
    t instanceof vt || !i || t.ta(i);
    const n = t instanceof vt ? [t.Ne()] : t.ia(), h = e ?? t.width, o = s ?? t.height;
    for (const c of n) this.So.po(h, o, this.Fo, c);
    t instanceof vt || !t.sa() || this.No.add(t);
  }
  ae(t, e, s, i) {
    this.Po.Vn(t, e, s, i);
  }
  ea(t, e) {
    this.So.po(t, e, this.Fo, this.qo());
  }
  Ao(t, e) {
    e !== 0 && this.So.Ao(t, e, this.Fo, this.qo());
  }
  ra(t, e, s, i) {
    this.So.mo(t, e, s, i, this.Fo, this.qo());
  }
  na(t, e) {
    this.So.vo(t, e, this.Fo, this.qo());
  }
  ha(t, e, s, i, n, h) {
    this.So.wo(t, e, s, i, n, h, this.Fo, this.qo());
  }
  oa(t, e, s, i, n, h, o, c) {
    this.So.Mo(t, e, s, i, n, h, o, c, this.Fo, this.qo());
  }
  aa(t, e, s, i) {
    this.So.yo(t, e, s, i, this.Fo, this.qo());
  }
  ca(t, e, s) {
    this.So.bo(_.BOX, t, e, s, this.Fo, this.qo());
  }
  ua(t) {
    const e = 2 * t;
    this.So.bo(_.SPHERE, e, e, e, this.Fo, this.qo());
  }
  la(t, e) {
    const s = 2 * (t + e);
    this.So.bo(_.TORUS, s, 2 * e, s, this.Fo, this.qo());
  }
  fa(t, e) {
    const s = 2 * t;
    this.So.bo(_.CONE, s, e, s, this.Fo, this.qo());
  }
  da(t, e) {
    const s = 2 * t;
    this.So.bo(_.CYLINDER, s, e, s, this.Fo, this.qo());
  }
  _a(t, e, s) {
    this.So.bo(_.ELLIPSOID, 2 * t, 2 * e, 2 * s, this.Fo, this.qo());
  }
  K(t, e, s = 1, i = {}) {
    return new vt(this.xe, t, e, s, i, this);
  }
  pa(t, e = t, s = t, i = 255) {
    this.Fo.gn.Tn(t, e ?? t, s ?? t, i);
    const [n, h, o, c] = this.Fo.gn.dn;
    this.ma(n, h, o, c);
  }
  Ch(t = 0, e = 0, s = 0, i = 0) {
    this.ma(t, e, s, i);
  }
  ma(t, e, s, i) {
    const n = this.xe, h = this.Ho;
    if (this.Io > 1) {
      h[0] = 1, h[1] = 1, h[2] = 0, h[3] = 0, n.clearBufferfv(n.COLOR, 0, h), h[0] = 0, h[1] = 0, h[2] = 0, h[3] = 0, n.clearBufferfv(n.COLOR, 1, h), this.Io >= 3 && (h[0] = t, h[1] = e, h[2] = s, h[3] = i, n.clearBufferfv(n.COLOR, 2, h)), this.Io >= 3 && (h[0] = 0, h[1] = 0, h[2] = 0, h[3] = 0);
      for (let o = 3; o < this.Io; o++) n.clearBufferfv(n.COLOR, o, h);
    } else n.clearColor(t, e, s, i), n.clear(n.COLOR_BUFFER_BIT);
  }
  ga() {
    const t = [0, 0, this.xe.canvas.width, this.xe.canvas.height];
    this.xe.viewport(...t), qt(this.xe, t), this.Bo = t, this.Do.length > 0 && (this.Do[0] = t);
  }
  va(t) {
    this.jo !== t && (t ? this.xe.enable(this.xe.DEPTH_TEST) : this.xe.disable(this.xe.DEPTH_TEST), this.jo = t);
  }
  ya(t) {
    this.zo !== t && (this.xe.depthMask(t), this.zo = t);
  }
  wa() {
    return this.jo;
  }
  Ma() {
    return this.zo;
  }
  Qe() {
    const t = this.So;
    this.Co.so(t), t.Ch(), this.Vh = null;
  }
  k() {
    this.xo.k(), this.Co.k(), this.Po.k();
  }
  get context() {
    return this.xe;
  }
  get state() {
    return this.Fo;
  }
  get materialManager() {
    return this.xo;
  }
}
class Ai {
  constructor(t = {}) {
    a(this, "p");
    a(this, "ba", null);
    a(this, "Ca", !1);
    a(this, "xa");
    a(this, "Fa", null);
    a(this, "Sa", !0);
    a(this, "xe", null);
    a(this, "Pa", null);
    a(this, "Ea", null);
    a(this, "Ta", !1);
    a(this, "ka");
    if (this.Ca = t.overlay ?? !1, this.ka = t.pixelDensity ?? 1, t.gl) this.Fa = t.gl, this.p = t.gl.canvas, this.xa = !1, this.Sa = !1;
    else if (this.Ca && t.canvas) this.ba = t.canvas, this.p = this.La(), this.xa = !0, this.Da();
    else if (t.canvas) {
      if (typeof HTMLVideoElement < "u" && t.canvas instanceof HTMLVideoElement) throw new M("Video elements are only supported in overlay mode.");
      this.p = t.canvas, this.xa = !1;
    } else this.p = this.Oa(t.width, t.height), this.xa = !0;
    typeof HTMLCanvasElement < "u" && this.p instanceof HTMLCanvasElement && (this.p.style.imageRendering = "pixelated");
  }
  Oa(t, e) {
    const s = document.createElement("canvas");
    s.className = "textmodeCanvas", s.style.imageRendering = "pixelated";
    const i = t || 800, n = e || 600;
    return s.width = i * this.ka, s.height = n * this.ka, s.style.width = i + "px", s.style.height = n + "px", this.Ra(s), s;
  }
  Ra(t) {
    const e = () => {
      if (this.Ta || t.parentNode) return;
      const s = document.body;
      s && s.appendChild(t);
    };
    document.body ? e() : (this.Pa = () => {
      this.Pa = null, e();
    }, document.addEventListener("DOMContentLoaded", this.Pa, { once: !0 }));
  }
  La() {
    const t = document.createElement("canvas");
    t.className = "textmodeCanvas", t.style.imageRendering = "pixelated";
    const e = this.ba.getBoundingClientRect();
    let s = Math.round(e.width), i = Math.round(e.height);
    if (typeof HTMLVideoElement < "u" && this.ba instanceof HTMLVideoElement) {
      const o = this.ba;
      (s === 0 || i === 0) && o.videoWidth > 0 && o.videoHeight > 0 && (s = o.videoWidth, i = o.videoHeight);
    }
    t.width = s * this.ka, t.height = i * this.ka, t.style.width = s + "px", t.style.height = i + "px", t.style.position = "absolute";
    const n = window.getComputedStyle(this.ba);
    let h = parseInt(n.zIndex || "0", 10);
    return isNaN(h) && (h = 0), t.style.zIndex = "" + (h + 1), t;
  }
  Da() {
    var t;
    this.Ba(), this.Ia(), (t = this.ba) != null && t.parentNode || document.readyState !== "loading" || (this.Ea = () => {
      this.Ea = null, this.Ta || (this.Ba(), this.Ia());
    }, document.addEventListener("DOMContentLoaded", this.Ea, { once: !0 }));
  }
  Ia() {
    var t;
    this.p instanceof HTMLCanvasElement && this.ba && !this.p.parentNode && ((t = this.ba.parentNode) == null || t.insertBefore(this.p, this.ba.nextSibling));
  }
  Ba() {
    if (!this.ba || !(this.p instanceof HTMLCanvasElement)) return;
    const t = this.ba.getBoundingClientRect(), e = this.ba.offsetParent;
    if (e && e !== document.body) {
      const s = e.getBoundingClientRect();
      this.p.style.top = t.top - s.top + "px", this.p.style.left = t.left - s.left + "px";
    } else this.p.style.top = t.top + window.scrollY + "px", this.p.style.left = t.left + window.scrollX + "px";
  }
  ue(t, e) {
    if (this.Ca) {
      const s = this.ba.getBoundingClientRect(), i = Math.round(s.width), n = Math.round(s.height);
      this.p.width = i * this.ka, this.p.height = n * this.ka, this.p.style.width = i + "px", this.p.style.height = n + "px", this.Ba();
    } else {
      const s = t ?? Math.round(this.p.width / this.ka), i = e ?? Math.round(this.p.height / this.ka);
      this.p.width = s * this.ka, this.p.height = i * this.ka, this.p instanceof HTMLCanvasElement && (this.p.style.width = s + "px", this.p.style.height = i + "px");
    }
  }
  ja() {
    if (this.Fa) return this.Fa;
    const t = this.p.getContext("webgl2", { alpha: !0, premultipliedAlpha: !1, preserveDrawingBuffer: !0, antialias: !1, depth: !0, stencil: !1, powerPreference: "high-performance" });
    if (!t) throw new M("`textmode.js` requires WebGL2 support.");
    return this.xe = t, t;
  }
  k() {
    if (this.Ta || (this.Ta = !0, this.za(), !this.Sa)) return;
    const t = this.xe ?? this.Fa;
    if (t) {
      const e = t.getExtension("WEBGL_lose_context");
      e == null || e.loseContext();
    }
    this.xa && typeof HTMLCanvasElement < "u" && this.p instanceof HTMLCanvasElement && this.p.parentNode && this.p.parentNode.removeChild(this.p);
  }
  za() {
    this.Pa && (document.removeEventListener("DOMContentLoaded", this.Pa), this.Pa = null), this.Ea && (document.removeEventListener("DOMContentLoaded", this.Ea), this.Ea = null);
  }
  get canvas() {
    return this.p;
  }
  get targetCanvas() {
    return this.ba;
  }
  get width() {
    return this.p.width;
  }
  get height() {
    return this.p.height;
  }
  get ownsContext() {
    return this.Sa;
  }
  get pixelDensity() {
    return this.ka;
  }
  Qa(t) {
    t <= 0 || (this.ka = t);
  }
}
function Gt(r) {
  return parseInt(r, 16);
}
const Mi = /^rgba?\(([^)]+)\)$/i;
function st(r) {
  return Number.isNaN(r = Math.round(r)) ? 0 : O(r, 0, 255);
}
function _i(r, t = !1) {
  if (!r) return null;
  const e = r.trim().toLowerCase();
  if (!e) return null;
  let s = null;
  return e.startsWith("rgb") && (s = (function(i) {
    const n = Mi.exec(i.trim());
    if (!n) return null;
    const h = n[1].split(",").map((f) => f.trim());
    if (h.length < 3) return null;
    const o = st(parseFloat(h[0])), c = st(parseFloat(h[1])), l = st(parseFloat(h[2]));
    let u = 255;
    if (h[3] !== void 0) {
      const f = h[3].trim();
      let d = parseFloat(f);
      f.endsWith("%") && (d /= 100), u = 255 * O(d, 0, 1);
    }
    return [o, c, l, Math.round(u)];
  })(e)), s && (t || s[3] !== 0) ? s : null;
}
class P {
  constructor(t, e, s, i) {
    a(this, "Ha");
    a(this, "Na");
    a(this, "r");
    a(this, "g");
    a(this, "b");
    a(this, "a");
    this.r = st(t), this.g = st(e), this.b = st(s), this.a = st(i);
  }
  static Ga(t, e, s, i) {
    if (t instanceof P) return t;
    if (Array.isArray(t)) {
      if (t.length < 3) throw Error("Component tuples must include at least RGB values.");
      const [n, h, o] = t, c = t.length === 4 ? t[3] : 255;
      return P.Xa(n, h, o, c);
    }
    if (typeof t == "string") {
      const n = t.trim();
      if (n.length === 0) throw Error("Color strings cannot be empty.");
      const h = _i(n, !0);
      return h ? P.Xa(...h) : P.Va(n);
    }
    if (typeof t == "number") return typeof e == "number" && typeof s == "number" ? P.Xa(t, e, s, i ?? 255) : typeof e == "number" ? P.Wa(t, e) : P.Wa(t, i ?? 255);
    throw Error("Unsupported color input passed.");
  }
  static Ya(t, e, s, i, n) {
    if (t instanceof P || typeof t == "string") return P.Ga(t);
    const [h, o, c, l] = Ys(t, e, s, i, n);
    return P.Xa(h, o, c, l);
  }
  static Xa(t, e, s, i = 255) {
    return new P(t, e, s, i);
  }
  static Wa(t, e = 255) {
    return new P(t, t, t, e);
  }
  static Va(t) {
    return new P(...(function(e) {
      const s = e.trim().replace(/^#|0x/gi, "");
      if (!/^[0-9A-Fa-f]+$/.test(s)) throw Error("Invalid hex color: " + e);
      const i = (n = s).length === 3 || n.length === 4 ? n.split("").map((h) => h + h).join("") : n;
      var n;
      if (i.length !== 6 && i.length !== 8) throw Error("Invalid hex color: " + e);
      return [Gt(i.slice(0, 2)), Gt(i.slice(2, 4)), Gt(i.slice(4, 6)), i.length === 8 ? Gt(i.slice(6, 8)) : 255];
    })(t));
  }
  static Za(t, e, s, i) {
    return new P(Math.round(255 * t), Math.round(255 * e), Math.round(255 * s), Math.round(255 * i));
  }
  get rgb() {
    return [this.r, this.g, this.b];
  }
  get rgba() {
    return this.Ha || (this.Ha = [this.r, this.g, this.b, this.a]), [...this.Ha];
  }
  get normalized() {
    return this.Na || (this.Na = [this.r / 255, this.g / 255, this.b / 255, this.a / 255]), [...this.Na];
  }
  withAlpha(t) {
    return new P(this.r, this.g, this.b, t);
  }
}
class St extends Ct {
  constructor(e, s, i, n, h, o, c, l, u = P.Ga) {
    super();
    a(this, "xe");
    a(this, "G");
    a(this, "$a");
    a(this, "Ja");
    a(this, "tc");
    a(this, "o");
    a(this, "u");
    a(this, "Ee", null);
    a(this, "ec", null);
    a(this, "rc", "brightness");
    a(this, "nc", null);
    a(this, "qa");
    a(this, "hc", null);
    a(this, "oc", null);
    a(this, "ac", null);
    a(this, "cc", null);
    a(this, "uc");
    a(this, "un", 0);
    a(this, "pn", 0);
    a(this, "mn", 0);
    a(this, "ln", 0);
    a(this, "lc", 0);
    a(this, "fc", 1);
    a(this, "dc", "sampled");
    a(this, "_c", "fixed");
    a(this, "mc", null);
    a(this, "gc", null);
    a(this, "vc", null);
    a(this, "yc", null);
    a(this, "wc", null);
    a(this, "Mc", null);
    a(this, "bc", null);
    a(this, "Cc", null);
    a(this, "yn", [1, 1, 1, 1]);
    a(this, "wn", [0, 0, 0, 1]);
    a(this, "xc", [0, 0, 0, 1]);
    a(this, "Fc", [[0.1, 0, 0]]);
    a(this, "Sc", null);
    a(this, "Pc", !0);
    a(this, "vn", null);
    a(this, "Ec", null);
    a(this, "Tc", null);
    a(this, "kc", null);
    a(this, "Lc", null);
    a(this, "Dc", null);
    a(this, "Oc", !1);
    this.Ka = u, this.xe = e, this.G = s, this.$a = i, this.qa = n, this.Ja = h, this.tc = o, this.sc(c, l);
  }
  Rc() {
    var e, s;
    this.Ee = null, (e = this.oc) == null || e.forEach((i) => {
      i.material = null;
    }), (s = this.ac) == null || s.forEach((i) => {
      i.material = null;
    });
  }
  Bc(e, s, i, n, h) {
    this.G.Vo() ? this.Ic(e, s, i, n, h) : (e === "char" ? this.jc(this.yn, s, i, n, h) : e === "cell" ? this.jc(this.wn, s, i, n, h) : this.jc(this.xc, s, i, n, h), this.Rc());
  }
  conversionMode(e) {
    return this.G.Vo() ? (this.hc = e, this.zc(this.ac), this.ac = null) : (this.rc = e, this.nc = null, this.zc(this.oc), this.oc = null, this.Rc()), this;
  }
  conversions(e) {
    if (!Array.isArray(e)) throw new M("[textmode.js] conversions() expects an array of conversion steps.", { method: "conversions", providedValue: e });
    if (e.length === 0) return this.clearConversions();
    const s = e.map((i, n) => this.Qc(i, n));
    return this.G.Vo() ? (this.hc = null, this.zc(this.ac), this.ac = s) : (this.zc(this.oc), this.oc = s, this.Rc()), this;
  }
  clearConversions() {
    return this.G.Vo() ? (this.hc = null, this.zc(this.ac), this.ac = []) : (this.zc(this.oc), this.oc = null, this.Rc()), this;
  }
  dispose() {
    this.$a && (this.xe.deleteTexture(this.$a), this.$a = null), this.Hc(this.Sc), this.Hc(this.Dc), this.zc(this.oc), this.zc(this.ac), this.Sc = null, this.Dc = null, this.oc = null, this.ac = null, super.dispose();
  }
  invert(e = !0) {
    const s = e ? 1 : 0;
    return this.G.Vo() ? this.mc = s : (this.un = s, this.Rc()), this;
  }
  flipX(e = !0) {
    const s = e ? 1 : 0;
    return this.G.Vo() ? this.gc = s : (this.pn = s, this.Rc()), this;
  }
  flipY(e = !0) {
    const s = e ? 1 : 0;
    return this.G.Vo() ? this.vc = s : (this.mn = s, this.Rc()), this;
  }
  charRotation(e) {
    const s = Ot(e);
    return this.G.Vo() ? this.yc = s : (this.ln = s, this.Rc()), this;
  }
  brightnessRange(e, s) {
    const [i, n] = this.Nc(e, s, "brightnessRange");
    return this.G.Vo() ? (this.wc = i, this.Mc = n) : (this.lc = i, this.fc = n, this.Rc()), this;
  }
  charColorMode(e) {
    return this.G.Vo() ? this.bc = e : (this.dc = e, this.Rc()), this;
  }
  cellColorMode(e) {
    return this.G.Vo() ? this.Cc = e : (this._c = e, this.Rc()), this;
  }
  charColor(e, s, i, n) {
    return this.Bc("char", e, s, i, n), this;
  }
  cellColor(e, s, i, n) {
    return this.Bc("cell", e, s, i, n), this;
  }
  background(e, s, i, n) {
    return this.Bc("background", e, s, i, n), this;
  }
  characters(e) {
    if (this.G.Vo()) {
      const s = this.Gc(e);
      this.Lc = s.length > 0 ? s : null, this.Oc = s.length > 0;
    } else this.vn = e, this.Xc(e), this.Rc();
    return this;
  }
  ta(e) {
    this.ec !== e && (this.ec = e, this.vn && this.Xc(this.vn), this.Vc(this.oc), this.Vc(this.ac), this.Rc());
  }
  get texture() {
    return this.$a;
  }
  get width() {
    return this.o;
  }
  get height() {
    return this.u;
  }
  get originalWidth() {
    return this.Ja;
  }
  get originalHeight() {
    return this.tc;
  }
  ue(e, s) {
    this.sc(e, s), this.Rc();
  }
  Ne() {
    return this.sa() ? this.Wc() : (this.Ee || this.Ge(), this.Ee);
  }
  ia() {
    const e = this.Yc();
    if (!e) return [this.Ne()];
    this.Zc();
    const s = !this.Kc();
    return e.map((i, n) => this.$c(i, n, e.length, s));
  }
  Xo() {
    this.mc = null, this.gc = null, this.vc = null, this.yc = null, this.wc = null, this.Mc = null, this.bc = null, this.Cc = null, this.Ec = null, this.Tc = null, this.kc = null, this.Lc = null, this.Oc = !1, this.hc = null, this.zc(this.ac), this.ac = null;
  }
  Zc() {
  }
  Ge() {
    this.Ee = this.Wc();
  }
  Wc(e = this.hc ?? this.rc, s = null, i) {
    s || this.Zc();
    const n = this.cc, h = this.uc;
    this.cc = s, this.uc = i;
    try {
      const o = s ? this.qc(e) : this.Jc(), c = this.tu(i), l = this.qa.iu(e, c), u = o.createUniforms(c);
      return this.G.materialManager.Ve(l, u);
    } finally {
      this.cc = n, this.uc = h;
    }
  }
  $c(e, s, i, n) {
    if (n && e.material) return e.material;
    const h = { index: s, count: i, mode: e.mode, options: e.options }, o = this.Wc(e.mode, e, h);
    return n && (e.material = o), o;
  }
  Qc(e, s) {
    if (!e || typeof e != "object") throw new M("[textmode.js] Conversion stack steps must be objects.", { method: "conversions", index: s, providedValue: e });
    if (typeof e.mode != "string" || e.mode.trim() === "") throw new M("[textmode.js] Conversion stack step mode must be a non-empty string.", { method: "conversions", index: s, providedValue: e.mode });
    const i = { mode: e.mode, options: this.su(e.options, s), paletteTexture: null, paletteDirty: !1, material: null };
    if (e.characters !== void 0) {
      if (typeof e.characters != "string") throw new M("[textmode.js] Conversion stack step characters must be a string.", { method: "conversions", index: s, providedValue: e.characters });
      i.characters = e.characters, i.glyphColors = this.Gc(e.characters), i.paletteDirty = !0;
    }
    if (e.invert !== void 0 && (i.invert = e.invert ? 1 : 0), e.flipX !== void 0 && (i.flipX = e.flipX ? 1 : 0), e.flipY !== void 0 && (i.flipY = e.flipY ? 1 : 0), e.charRotation !== void 0 && (i.charRotation = Ot(e.charRotation)), e.brightnessStart !== void 0 || e.brightnessEnd !== void 0) {
      if (e.brightnessStart === void 0 || e.brightnessEnd === void 0) throw new M("[textmode.js] Conversion stack step brightnessStart and brightnessEnd must be provided together.", { method: "conversions", index: s, brightnessStart: e.brightnessStart, brightnessEnd: e.brightnessEnd });
      const [n, h] = this.Nc(e.brightnessStart, e.brightnessEnd, "conversions", s);
      i.brightnessStart = n, i.brightnessEnd = h;
    }
    return e.charColorMode !== void 0 && (this.eu(e.charColorMode, "charColorMode", s), i.charColorMode = e.charColorMode), e.cellColorMode !== void 0 && (this.eu(e.cellColorMode, "cellColorMode", s), i.cellColorMode = e.cellColorMode), e.charColor !== void 0 && (i.charColor = this.ru(e.charColor)), e.cellColor !== void 0 && (i.cellColor = this.ru(e.cellColor)), i;
  }
  eu(e, s, i) {
    if (e !== "sampled" && e !== "fixed") throw new M(`[textmode.js] Conversion stack step ${s} must be 'sampled' or 'fixed'.`, { method: "conversions", index: i, providedValue: e });
  }
  su(e, s) {
    if (e === void 0) return {};
    if (e === null || typeof e != "object" || Array.isArray(e)) throw new M("[textmode.js] Conversion stack step options must be an object.", { method: "conversions", index: s, providedValue: e });
    return { ...e };
  }
  ru(e) {
    return this.Ka(e).normalized;
  }
  Nc(e, s, i, n) {
    const h = { method: i, start: e, end: s };
    if (n !== void 0 && (h.index = n), !Number.isFinite(e) || !Number.isFinite(s)) throw new M("[textmode.js] brightness range values must be finite numbers.", h);
    if (e < 0 || e > 255 || s < 0 || s > 255) throw new M("[textmode.js] brightness range values must be between 0 and 255.", h);
    if (e > s) throw new M("[textmode.js] brightness range start must be less than or equal to end.", h);
    return [e / 255, s / 255];
  }
  jc(e, s, i, n, h) {
    const o = this.Ka(s, i, n, h);
    Ut(e, o.r, o.g, o.b, o.a);
  }
  Xc(e) {
    const s = this.Gc(e);
    s.length > 0 && (this.Fc = s, this.Pc = !0);
  }
  Vc(e) {
    if (e) for (const s of e) s.characters !== void 0 && (s.glyphColors = this.Gc(s.characters), s.paletteDirty = !0, s.material = null);
  }
  Gc(e) {
    return this.ec ? this.ec.Qt(e).filter((s) => Array.isArray(s)) : [];
  }
  Yc() {
    return this.hc !== null ? null : this.ac !== null ? this.ac.length > 0 ? this.ac : null : this.oc;
  }
  Kc() {
    return this.mc !== null || this.gc !== null || this.vc !== null || this.yc !== null || this.wc !== null || this.Mc !== null || this.bc !== null || this.Cc !== null || this.Ec !== null || this.Tc !== null || this.kc !== null || this.Lc !== null;
  }
  sc(e, s) {
    const { width: i, height: n } = (function(h, o, c, l) {
      const u = Math.min(c / h, l / o);
      return { width: Math.max(1, Math.min(c, Math.round(h * u))), height: Math.max(1, Math.min(l, Math.round(o * u))), scale: u };
    })(this.Ja, this.tc, e, s);
    this.o = i, this.u = n;
  }
  createBaseConversionUniforms() {
    const e = this.cc, s = (e == null ? void 0 : e.invert) ?? this.mc ?? this.un, i = (e == null ? void 0 : e.flipX) ?? this.gc ?? this.pn, n = (e == null ? void 0 : e.flipY) ?? this.vc ?? this.mn, h = (e == null ? void 0 : e.charRotation) ?? this.yc ?? this.ln, o = (e == null ? void 0 : e.brightnessStart) ?? this.wc ?? this.lc, c = (e == null ? void 0 : e.brightnessEnd) ?? this.Mc ?? this.fc, l = (e == null ? void 0 : e.charColorMode) ?? this.bc ?? this.dc, u = (e == null ? void 0 : e.cellColorMode) ?? this.Cc ?? this._c, f = (e == null ? void 0 : e.charColor) ?? this.Ec ?? this.yn, d = (e == null ? void 0 : e.cellColor) ?? this.Tc ?? this.wn, m = this.kc ?? this.xc, y = (e == null ? void 0 : e.glyphColors) !== void 0, w = !y && this.Lc !== null, v = y ? e.glyphColors : this.Lc ?? this.Fc, g = this.nu(v, w, e);
    return { u_image: this.$a, u_invert: !!s, u_flipX: !!i, u_flipY: !!n, u_charRotation: h, U9: o, Ua: c, u_charColorFixed: l === "fixed", u_charColor: f, u_cellColorFixed: u === "fixed", u_cellColor: d, u_backgroundColor: m, u_charCount: v.length, u_charPaletteTexture: g.texture, u_charPaletteDimensions: [g.columns, g.rows] };
  }
  nu(e, s, i = null) {
    return (i == null ? void 0 : i.glyphColors) !== void 0 ? (i.paletteTexture && !i.paletteDirty || (i.paletteTexture = this.hu(e, i.paletteTexture), i.paletteDirty = !1), i.paletteTexture) : s ? (this.Dc && !this.Oc || (this.Dc = this.hu(e, this.Dc), this.Oc = !1), this.Dc) : (this.Sc && !this.Pc || (this.Sc = this.hu(e, this.Sc), this.Pc = !1), this.Sc);
  }
  hu(e, s) {
    const i = this.xe, n = Math.max(1, Number(i.getParameter(i.MAX_TEXTURE_SIZE)) || 4096), h = Math.min(n * n, 65535);
    if (e.length > h) throw new M("[textmode.js] Character palette exceeds the supported GPU texture capacity.", { requestedCharacters: e.length, maxCharacters: h, maxTextureSize: n });
    const o = Math.max(e.length, 1), c = Math.min(n, Math.ceil(Math.sqrt(o))), l = Math.max(1, Math.ceil(o / c)), u = this.ou(e, c, l), f = (s == null ? void 0 : s.texture) ?? i.createTexture();
    if (!f) throw new M("[textmode.js] Failed to create character palette texture.");
    return i.bindTexture(i.TEXTURE_2D, f), i.texParameteri(i.TEXTURE_2D, i.TEXTURE_MIN_FILTER, i.NEAREST), i.texParameteri(i.TEXTURE_2D, i.TEXTURE_MAG_FILTER, i.NEAREST), i.texParameteri(i.TEXTURE_2D, i.TEXTURE_WRAP_S, i.CLAMP_TO_EDGE), i.texParameteri(i.TEXTURE_2D, i.TEXTURE_WRAP_T, i.CLAMP_TO_EDGE), i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL, 0), s && s.columns === c && s.rows === l ? i.texSubImage2D(i.TEXTURE_2D, 0, 0, 0, c, l, i.RGBA, i.UNSIGNED_BYTE, u) : i.texImage2D(i.TEXTURE_2D, 0, i.RGBA8, c, l, 0, i.RGBA, i.UNSIGNED_BYTE, u), i.bindTexture(i.TEXTURE_2D, null), { texture: f, count: e.length, columns: c, rows: l };
  }
  ou(e, s, i) {
    const n = new Uint8Array(s * i * 4);
    for (let h = 0; h < e.length; h++) {
      const o = e[h], c = 4 * h;
      n[c] = this.au(o[0]), n[c + 1] = this.au(o[1]), n[c + 2] = this.au(o[2]), n[c + 3] = 255;
    }
    return n;
  }
  au(e) {
    return Math.max(0, Math.min(255, Math.round(255 * e)));
  }
  Hc(e) {
    e && this.xe.deleteTexture(e.texture);
  }
  zc(e) {
    if (e) for (const s of e) this.Hc(s.paletteTexture), s.paletteTexture = null, s.material = null;
  }
  sa() {
    return this.Kc() || this.hc !== null || this.ac !== null;
  }
  qc(e) {
    const s = this.qa.cu(e);
    if (!s) throw Error(`[textmode.js] Conversion mode "${e}" is not registered. If this mode is provided by an add-on, make sure its plugin is installed before loading sources.`);
    return s;
  }
  Jc() {
    const e = this.hc ?? this.rc;
    if (this.nc && this.nc.id === e) return this.nc;
    const s = this.qc(e);
    return this.nc = s, s;
  }
  Ic(e, s, i, n, h) {
    let o;
    e === "char" ? (o = this.Ec ?? [0, 0, 0, 1], this.Ec = o) : e === "cell" ? (o = this.Tc ?? [0, 0, 0, 1], this.Tc = o) : (o = this.kc ?? [0, 0, 0, 1], this.kc = o), this.jc(o, s, i, n, h);
  }
  tu(e) {
    if (!this.ec) throw Error("[textmode.js] Cannot create conversion context: no active glyph atlas set. Ensure _setActiveFont() is called before rendering.");
    const s = { renderer: this.G, gl: this.xe, font: this.ec, glyphAtlas: this.ec, source: this }, i = e ?? this.uc;
    return i && (s.pass = i), s;
  }
}
class Pt extends St {
  constructor(t, e, s, i, n, h, o, c, l) {
    super(t, e, s, i, n, h, o, c, l);
  }
  static uu(t, e, s, i, n, h) {
    const o = t.context, { texture: c, width: l, height: u } = ue(o, s);
    return new Pt(o, t, c, e, l, u, i, n, h);
  }
}
class Ei {
  constructor(t = 60) {
    a(this, "lu");
    a(this, "fu");
    a(this, "du", null);
    a(this, "_u", 0);
    a(this, "pu", null);
    a(this, "mu", null);
    a(this, "gu", !0);
    a(this, "vu", 0);
    a(this, "yu", 0);
    a(this, "wu", []);
    a(this, "Mu", 10);
    a(this, "bu", 0);
    a(this, "Au", 0);
    a(this, "Cu", -1);
    this.fu = t, this.lu = 1e3 / t;
  }
  xu(t, e) {
    if (this.pu = t, e !== void 0 && (this.mu = e), !this.Fu() || (this.Cu === -1 && (this.Cu = performance.now()), this.du !== null)) return;
    this._u = performance.now();
    const s = (i) => {
      var o;
      if (!this.Fu()) return void (this.du = null);
      const n = typeof i == "number" ? i : performance.now(), h = n - this._u;
      h >= this.lu && ((o = this.pu) == null || o.call(this), this._u = n - h % this.lu), this.Fu() ? this.du = requestAnimationFrame(s) : this.du = null;
    };
    this.du = requestAnimationFrame(s);
  }
  Su() {
    this.du !== null && (cancelAnimationFrame(this.du), this.du = null);
  }
  Pu() {
    this.gu && (this.gu = !1, this.Fu() || this.Su());
  }
  Eu(t) {
    this.gu || (this.gu = !0, this.xu(t));
  }
  Tu(t, e) {
    if (t === void 0) return this.vu;
    this.fu = t, this.lu = 1e3 / t, this.du !== null && e && (this.Su(), this.xu(e));
  }
  ku() {
    const t = performance.now();
    if (this.yu > 0) {
      const e = t - this.yu;
      this.bu = e, this.wu.push(e), this.wu.length > this.Mu && this.wu.shift();
      const s = this.wu.reduce((i, n) => i + n, 0) / this.wu.length;
      this.vu = 1e3 / s;
    }
    this.yu = t;
  }
  Lu(t) {
    this.fu = t, this.lu = 1e3 / t;
  }
  Fu() {
    var t;
    return this.gu || ((t = this.mu) == null ? void 0 : t.call(this)) === !0;
  }
  Du() {
    this.Au++;
  }
  get Ou() {
    return this.Cu === -1 ? 0 : performance.now() - this.Cu;
  }
  set Ou(t) {
    this.Cu = performance.now() - t;
  }
  get Ru() {
    return this.Ou / 1e3;
  }
  set Ru(t) {
    this.Ou = 1e3 * t;
  }
}
function he(r, t, e) {
  return r ? r.U(t, e) : { x: -1 / 0, y: -1 / 0 };
}
class Vt {
  constructor() {
    a(this, "Bu", []);
  }
  Iu(t, e, s, i) {
    const n = s;
    i === void 0 ? t.addEventListener(e, n) : t.addEventListener(e, n, i), this.Bu.push({ target: t, type: e, listener: n, capture: typeof i == "boolean" ? i : i == null ? void 0 : i.capture });
  }
  ju() {
    for (let t = this.Bu.length - 1; t >= 0; t -= 1) {
      const { target: e, type: s, listener: i, capture: n } = this.Bu[t];
      n === void 0 ? e.removeEventListener(s, i) : e.removeEventListener(s, i, n);
    }
    this.Bu = [];
  }
}
const fe = ["keyPressed", "keyTyped", "keyReleased"], de = ["mouseClicked", "doubleClicked", "mousePressed", "mouseReleased", "mouseMoved", "mouseDragged", "mouseScrolled"], pe = ["touchStarted", "touchMoved", "touchEnded", "touchCancelled"], ge = ["tap", "doubleTap", "longPress", "swipe", "pinch", "rotateGesture"], me = ["gamepadConnected", "gamepadDisconnected", "gamepadButtonPressed", "gamepadButtonReleased", "gamepadAxisChanged"], Ti = [...fe, ...de, ...pe, ...ge, ...me];
class Ci {
  constructor() {
    a(this, "Bu", {});
  }
  zu(t, e) {
    var n;
    const s = (n = this.Bu)[t] ?? (n[t] = []), i = { fn: e, once: !1 };
    return s.push(i), () => this.Qu(t, e);
  }
  Qu(t, e) {
    const s = this.Bu[t];
    if (!s) return;
    const i = s.findIndex((n) => n.fn === e);
    i !== -1 && s.splice(i, 1);
  }
  Hu(t, e) {
    var n;
    const s = (n = this.Bu)[t] ?? (n[t] = []), i = { fn: e, once: !0 };
    return s.push(i), () => this.Qu(t, e);
  }
  Nu(t, ...e) {
    const s = this.Bu[t];
    if (!s || s.length === 0) return;
    const i = s.slice();
    for (const n of i) {
      if (n.once) {
        const h = s.indexOf(n);
        h !== -1 && s.splice(h, 1);
      }
      n.fn(...e);
    }
  }
  Gu(t) {
    const e = this.Bu[t];
    return !!e && e.length > 0;
  }
  ju(t) {
    t !== void 0 ? delete this.Bu[t] : this.Bu = {};
  }
}
class Si {
  constructor(t, e, s) {
    a(this, "p");
    a(this, "Xu");
    a(this, "Vu", { x: -1 / 0, y: -1 / 0 });
    a(this, "Wu", { x: -1 / 0, y: -1 / 0 });
    a(this, "Yu", { x: -1 / 0, y: -1 / 0 });
    a(this, "Zu", { x: -1 / 0, y: -1 / 0 });
    a(this, "Ku", { x: 0, y: 0 });
    a(this, "$u", { x: 0, y: 0 });
    a(this, "qu", !1);
    a(this, "Ju", null);
    a(this, "tl", 0);
    a(this, "Bu", new Vt());
    a(this, "il", !1);
    a(this, "sl");
    this.p = t, this.Xu = e, this.sl = s;
  }
  el(t) {
    const e = performance.now() + Math.max(0, t);
    e > this.tl && (this.tl = e);
  }
  rl() {
    return performance.now() < this.tl;
  }
  nl(t) {
    const e = this.p.canvas;
    e.style.cursor = t == null || t === "" ? "" : t;
  }
  hl() {
    const t = this.p.canvas;
    return typeof t.requestPointerLock == "function" && (t.requestPointerLock(), !0);
  }
  ol() {
    this.al() && typeof document.exitPointerLock == "function" && document.exitPointerLock();
  }
  cl() {
    if (this.il) return;
    const t = this.p.canvas;
    this.Bu.Iu(t, "mousemove", (e) => {
      this.ul(e), this.ll(e);
    }, { passive: !0 }), this.Bu.Iu(t, "mouseleave", () => {
      this.Wu = { ...this.Vu }, this.Vu.x = -1 / 0, this.Vu.y = -1 / 0, this.Ju = null;
    }, { passive: !0 }), this.Bu.Iu(t, "mousedown", (e) => {
      this.ul(e), this.fl(e);
    }, { passive: !0 }), this.Bu.Iu(t, "mouseup", (e) => {
      this.ul(e), this.dl(e);
    }, { passive: !0 }), this.Bu.Iu(t, "click", (e) => {
      this.ul(e), this._l(e);
    }, { passive: !0 }), this.Bu.Iu(t, "dblclick", (e) => {
      this.ul(e), this.pl(e);
    }, { passive: !0 }), this.Bu.Iu(t, "wheel", (e) => {
      this.ul(e), this.ml(e);
    }, { passive: !1 }), this.Bu.Iu(window, "mouseup", () => {
      this.qu = !1;
    }, { passive: !0 }), this.Bu.Iu(window, "blur", () => {
      this.qu = !1;
    }), this.il = !0;
  }
  vl() {
    this.il && (this.Bu.ju(), this.il = !1, this.ol(), this.qu = !1, this.Ku = { x: 0, y: 0 }, this.$u = { x: 0, y: 0 });
  }
  yl() {
    if (this.il) try {
      if (this.Ju) {
        const t = new MouseEvent("mousemove", { clientX: this.Ju.x, clientY: this.Ju.y, bubbles: !1, cancelable: !1 });
        this.ul(t);
      }
    } catch {
      this.Vu.x = -1 / 0, this.Vu.y = -1 / 0;
    }
  }
  wl() {
    return { x: this.Vu.x, y: this.Vu.y };
  }
  Ml() {
    return { x: this.Yu.x, y: this.Yu.y };
  }
  bl() {
    return this.Ku.x;
  }
  Al() {
    return this.Ku.y;
  }
  Cl() {
    return this.qu;
  }
  xl() {
    this.Yu = { ...this.Zu }, this.Zu = { ...this.Vu }, this.Ku = { ...this.$u }, this.$u = { x: 0, y: 0 };
  }
  Fl(t, e = {}) {
    return { position: { ...this.Vu }, previousPosition: { ...this.Wu }, originalEvent: t, ...e };
  }
  ll(t) {
    this.rl() || (this.Sl(t) ? this.sl.Nu("mouseDragged", this.Fl(t, { button: this.Pl(t) })) : this.sl.Nu("mouseMoved", this.Fl(t)));
  }
  fl(t) {
    this.rl() || (this.qu = !0, this.sl.Nu("mousePressed", this.Fl(t, { button: t.button })));
  }
  dl(t) {
    this.rl() || (this.qu = !1, this.sl.Nu("mouseReleased", this.Fl(t, { button: t.button })));
  }
  _l(t) {
    this.rl() || this.sl.Nu("mouseClicked", this.Fl(t, { button: t.button }));
  }
  pl(t) {
    this.rl() || this.sl.Nu("doubleClicked", this.Fl(t, { button: t.button }));
  }
  ml(t) {
    this.rl() || this.sl.Nu("mouseScrolled", this.Fl(t, { delta: { x: t.deltaX, y: t.deltaY } }));
  }
  ul(t) {
    const e = this.Xu();
    if (this.Wu = { ...this.Vu }, t instanceof MouseEvent && t.type === "mousemove" && this.El(t), t instanceof MouseEvent && t.type === "mousemove" && this.al()) return;
    this.Ju = { x: t.clientX, y: t.clientY };
    const s = he(e, t.clientX, t.clientY);
    this.Vu.x = s.x, this.Vu.y = s.y;
  }
  Sl(t) {
    return t.buttons !== 0;
  }
  Pl(t) {
    return 1 & t.buttons ? 0 : 4 & t.buttons ? 1 : 2 & t.buttons ? 2 : 8 & t.buttons ? 3 : 16 & t.buttons ? 4 : void 0;
  }
  El(t) {
    if (this.al()) return this.$u.x += t.movementX, void (this.$u.y += t.movementY);
    this.Ju && (this.$u.x += t.clientX - this.Ju.x, this.$u.y += t.clientY - this.Ju.y);
  }
  al() {
    return document.pointerLockElement === this.p.canvas;
  }
}
class Pi {
  constructor(t) {
    a(this, "Tl", /* @__PURE__ */ new Map());
    a(this, "kl", null);
    a(this, "Ll", null);
    a(this, "Bu", new Vt());
    a(this, "il", !1);
    a(this, "sl");
    a(this, "Dl", { ArrowUp: "UP_ARROW", ArrowDown: "DOWN_ARROW", ArrowLeft: "LEFT_ARROW", ArrowRight: "RIGHT_ARROW", F1: "F1", F2: "F2", F3: "F3", F4: "F4", F5: "F5", F6: "F6", F7: "F7", F8: "F8", F9: "F9", F10: "F10", F11: "F11", F12: "F12", Enter: "ENTER", Return: "RETURN", Tab: "TAB", Escape: "ESCAPE", Backspace: "BACKSPACE", Delete: "DELETE", Insert: "INSERT", Home: "HOME", End: "END", PageUp: "PAGE_UP", PageDown: "PAGE_DOWN", Shift: "SHIFT", Control: "CONTROL", Alt: "ALT", Meta: "META", " ": "SPACE" });
    this.sl = t;
  }
  cl() {
    this.il || (this.Bu.Iu(window, "keydown", (t) => {
      this.Ol(t);
    }, { passive: !1 }), this.Bu.Iu(window, "keyup", (t) => {
      this.Rl(t);
    }, { passive: !1 }), this.il = !0);
  }
  vl() {
    this.il && (this.Bu.ju(), this.il = !1, this.Tl.clear(), this.kl = null, this.Ll = null);
  }
  Bl(t) {
    const e = this.Il(t), s = this.Tl.get(t) || this.Tl.get(e);
    return (s == null ? void 0 : s.isPressed) || !1;
  }
  jl() {
    return this.kl;
  }
  zl() {
    return this.Ll;
  }
  Ql() {
    const t = [];
    for (const [e, s] of this.Tl) s.isPressed && t.push(e);
    return t;
  }
  Hl() {
    return { ctrl: this.Bl("Control"), shift: this.Bl("Shift"), alt: this.Bl("Alt"), meta: this.Bl("Meta") };
  }
  Nl() {
    this.Tl.clear(), this.kl = null, this.Ll = null;
  }
  Ol(t) {
    const e = t.key, s = Date.now();
    this.Tl.has(e) || this.Tl.set(e, { isPressed: !1, lastPressTime: 0, lastReleaseTime: 0 });
    const i = this.Tl.get(e);
    i.isPressed || (i.isPressed = !0, i.lastPressTime = s, this.kl = e, this.sl.Nu("keyPressed", this.Fl(e, !0, t)), this.Gl(t) && this.sl.Nu("keyTyped", this.Fl(e, !0, t)));
  }
  Fl(t, e, s) {
    return { key: t, keyCode: s.keyCode, ctrlKey: s.ctrlKey, shiftKey: s.shiftKey, altKey: s.altKey, metaKey: s.metaKey, isPressed: e, originalEvent: s };
  }
  Rl(t) {
    const e = t.key, s = Date.now();
    this.Tl.has(e) || this.Tl.set(e, { isPressed: !1, lastPressTime: 0, lastReleaseTime: 0 });
    const i = this.Tl.get(e);
    i.isPressed = !1, i.lastReleaseTime = s, this.Ll = e, this.sl.Nu("keyReleased", this.Fl(e, !1, t));
  }
  Il(t) {
    return this.Dl[t] || t.toLowerCase();
  }
  Gl(t) {
    return !(t.ctrlKey || t.altKey || t.metaKey) && t.key !== "Dead" && Array.from(t.key).length === 1;
  }
}
class Ri {
  constructor(t, e) {
    a(this, "Xl");
    a(this, "Vl");
    a(this, "Wl", /* @__PURE__ */ new Map());
    a(this, "Yl", null);
    a(this, "Zl", 320);
    a(this, "Kl", 350);
    a(this, "$l", 10);
    a(this, "ql", 550);
    a(this, "Jl", 14);
    a(this, "tf", 48);
    a(this, "if", 650);
    a(this, "sf", 0.02);
    a(this, "ef", 2);
    a(this, "rf", 0);
    a(this, "nf", null);
    this.Xl = t, this.Vl = e;
  }
  oh() {
    this.Wl.forEach((t) => {
      t.timer !== null && window.clearTimeout(t.timer);
    }), this.Wl.clear(), this.Yl = null, this.rf = 0, this.nf = null;
  }
  hf(t, e) {
    const s = { timer: null, fired: !1 };
    s.timer = window.setTimeout(() => {
      this.Wl.has(t.id) && (s.fired = !0, this.Vl.Nu("longPress", { touch: this.af(t.lastPosition), duration: performance.now() - t.startTime, originalEvent: e }));
    }, this.ql), this.Wl.set(t.id, s);
  }
  cf(t, e) {
    const s = this.Wl.get(t.id);
    !s || !e || yt(e.clientX, e.clientY, t.lastPosition.clientX, t.lastPosition.clientY) > this.Jl && s.timer !== null && (window.clearTimeout(s.timer), s.timer = null);
  }
  uf(t, e) {
    const s = this.Wl.get(t.id);
    s && s.timer !== null && (window.clearTimeout(s.timer), s.timer = null), this.lf(t, e, (s == null ? void 0 : s.fired) ?? !1), this.Wl.delete(t.id);
  }
  ff(t) {
    const e = this.Wl.get(t);
    e && e.timer !== null && window.clearTimeout(e.timer), this.Wl.delete(t);
  }
  df(t) {
    if (t.size !== 2) return void (this.Yl = null);
    const e = Array.from(t.values()), [s, i] = e, n = [s.id, i.id];
    if (this.Yl && this.Yl.ids[0] === n[0] && this.Yl.ids[1] === n[1]) return;
    const h = yt(s.x, s.y, i.x, i.y), o = Ee(s.clientX, s.clientY, i.clientX, i.clientY);
    this.Yl = { ids: n, initialDistance: Math.max(h, 1e-4), initialAngle: o, lastScale: 1, lastRotation: 0 };
  }
  _f(t, e) {
    if (this.df(t), !this.Yl) return;
    const [s, i] = this.Yl.ids, n = t.get(s), h = t.get(i);
    if (!n || !h) return;
    const o = yt(n.x, n.y, h.x, h.y) / this.Yl.initialDistance, c = o - this.Yl.lastScale;
    Math.abs(c) > this.sf && (this.Vl.Nu("pinch", { touches: [this.af(n), this.af(h)], scale: o, deltaScale: c, center: this.pf(n, h), originalEvent: e }), this.Yl.lastScale = o);
    let l = Ee(n.clientX, n.clientY, h.clientX, h.clientY) - this.Yl.initialAngle;
    l = (l + 180) % 360 - 180;
    const u = l - this.Yl.lastRotation;
    Math.abs(u) > this.ef && (this.Vl.Nu("rotateGesture", { touches: [this.af(n), this.af(h)], rotation: l, deltaRotation: u, center: this.pf(n, h), originalEvent: e }), this.Yl.lastRotation = l);
  }
  pf(t, e) {
    const s = (t.clientX + e.clientX) / 2, i = (t.clientY + e.clientY) / 2, n = this.Xl(s, i);
    return { x: n.x, y: n.y };
  }
  lf(t, e, s) {
    const i = performance.now(), n = i - t.startTime, h = t.lastPosition.clientX - t.startPosition.clientX, o = t.lastPosition.clientY - t.startPosition.clientY, c = Math.hypot(h, o);
    if (!s && n <= this.Zl && c <= this.$l)
      this.mf(t.lastPosition, i) ? this.Vl.Nu("doubleTap", { touch: this.af(t.lastPosition), taps: 2, originalEvent: e }) : this.Vl.Nu("tap", { touch: this.af(t.lastPosition), taps: 1, originalEvent: e });
    else if (!s && n <= this.if && c >= this.tf) {
      const l = Math.max(c, 1e-4), u = { x: h / l, y: o / l }, f = { x: h / n, y: o / n };
      this.Vl.Nu("swipe", { touch: this.af(t.lastPosition), direction: u, distance: l, velocity: f, originalEvent: e });
    }
    this.rf = i, this.nf = this.af(t.lastPosition);
  }
  mf(t, e) {
    return !this.nf || e - this.rf > this.Kl ? !1 : yt(t.clientX, t.clientY, this.nf.clientX, this.nf.clientY) <= this.$l;
  }
  af(t) {
    return { ...t };
  }
}
class Fi {
  constructor(t, e, s, i) {
    a(this, "p");
    a(this, "gf");
    a(this, "Xu");
    a(this, "vf");
    a(this, "yf", /* @__PURE__ */ new Map());
    a(this, "wf", /* @__PURE__ */ new Map());
    a(this, "Mf", /* @__PURE__ */ new Map());
    a(this, "bf");
    a(this, "Af");
    a(this, "Bu", new Vt());
    a(this, "il", !1);
    a(this, "sl");
    a(this, "Cf", 600);
    this.p = t, this.Xu = e, this.sl = s, this.gf = i, this.vf = new Ri((h, o) => he(this.Xu(), h, o), this.sl);
    const n = this.p.canvas;
    this.bf = n.style.touchAction, this.Af = n.style.userSelect, n.style.touchAction || (n.style.touchAction = "none"), n.style.userSelect || (n.style.userSelect = "none");
  }
  cl() {
    if (this.il) return;
    const t = this.p.canvas;
    this.Bu.Iu(t, "touchstart", (e) => {
      this.xf(e);
    }, { passive: !1 }), this.Bu.Iu(t, "touchmove", (e) => {
      this.Ff(e);
    }, { passive: !1 }), this.Bu.Iu(t, "touchend", (e) => {
      this.Sf(e);
    }, { passive: !1 }), this.Bu.Iu(t, "touchcancel", (e) => {
      this.Pf(e);
    }, { passive: !1 }), this.il = !0;
  }
  vl() {
    if (!this.il) return;
    const t = this.p.canvas;
    this.Bu.ju(), this.il = !1, this.yf.clear(), this.wf.clear(), this.Mf.clear(), this.vf.oh(), t.style.touchAction = this.bf, t.style.userSelect = this.Af;
  }
  yl() {
    if (!this.Xu() || this.yf.size === 0) return;
    const t = /* @__PURE__ */ new Map();
    for (const e of this.yf.values()) {
      const s = this.Xl(e.clientX, e.clientY, e.id, e);
      t.set(e.id, s);
      const i = this.Mf.get(e.id);
      i && (i.lastPosition = s);
    }
    this.yf = t;
  }
  Ef() {
    return Array.from(this.yf.values()).map((t) => ({ ...t }));
  }
  xf(t) {
    var i;
    if (!this.Xu()) return;
    t.preventDefault(), (i = this.gf) == null || i.el(this.Cf);
    const e = performance.now(), s = this.Tf(t.changedTouches);
    for (const n of s) {
      const h = this.yf.get(n.id);
      h && this.wf.set(n.id, this.af(h)), this.yf.set(n.id, n);
      const o = { id: n.id, startPosition: n, lastPosition: n, startTime: e, lastTime: e };
      this.Mf.set(n.id, o), this.vf.hf(o, t), this.sl.Nu("touchStarted", this.kf(n, t, void 0, e));
    }
    this.vf.df(this.yf);
  }
  Ff(t) {
    var i;
    if (!this.Xu()) return;
    t.preventDefault(), (i = this.gf) == null || i.el(this.Cf);
    const e = performance.now(), s = this.Tf(t.changedTouches);
    for (const n of s) {
      const h = this.yf.get(n.id), o = h ? this.af(h) : void 0;
      o && this.wf.set(n.id, o), this.yf.set(n.id, n);
      const c = this.Mf.get(n.id);
      c && (c.lastPosition = n, c.lastTime = e, this.vf.cf(c, o)), this.sl.Nu("touchMoved", this.kf(n, t, o, e));
    }
    this.vf._f(this.yf, t);
  }
  Sf(t) {
    if (!this.Xu()) return;
    t.preventDefault();
    const e = performance.now(), s = this.Tf(t.changedTouches);
    for (const i of s) {
      const n = this.yf.get(i.id), h = n ? this.af(n) : void 0, o = this.Mf.get(i.id);
      this.sl.Nu("touchEnded", this.kf(i, t, h, e)), o && this.vf.uf(o, t), this.Mf.delete(i.id), this.wf.delete(i.id), this.yf.delete(i.id);
    }
    this.vf.df(this.yf);
  }
  Pf(t) {
    if (!this.Xu()) return;
    t.preventDefault();
    const e = performance.now(), s = this.Tf(t.changedTouches);
    for (const i of s) {
      const n = this.yf.get(i.id), h = n ? this.af(n) : void 0;
      this.sl.Nu("touchCancelled", this.kf(i, t, h, e)), this.vf.ff(i.id), this.Mf.delete(i.id), this.wf.delete(i.id), this.yf.delete(i.id);
    }
    this.vf.df(this.yf);
  }
  Tf(t) {
    const e = [];
    for (let s = 0; s < t.length; s += 1) {
      const i = t.item(s);
      i && e.push(this.Lf(i));
    }
    return e;
  }
  Lf(t) {
    return this.Xl(t.clientX, t.clientY, t.identifier, { id: t.identifier, x: -1, y: -1, clientX: t.clientX, clientY: t.clientY, pressure: t.force, radiusX: t.radiusX, radiusY: t.radiusY, rotationAngle: t.rotationAngle });
  }
  Xl(t, e, s, i) {
    const n = he(this.Xu(), t, e);
    return { id: s, x: n.x, y: n.y, clientX: t, clientY: e, pressure: i.pressure, radiusX: i.radiusX, radiusY: i.radiusY, rotationAngle: i.rotationAngle };
  }
  kf(t, e, s, i) {
    const n = this.Mf.get(t.id), h = Array.from(this.wf.values()).map((l) => this.af(l)), o = Array.from(this.yf.values()).map((l) => this.af(l)), c = this.Tf(e.changedTouches);
    return { touch: this.af(t), previousTouch: s ? this.af(s) : void 0, touches: o, previousTouches: h, changedTouches: c, deltaTime: n ? i - n.lastTime : 0, originalEvent: e };
  }
  af(t) {
    return { ...t };
  }
}
const D = { south: 0, east: 1, west: 2, north: 3, l1: 4, r1: 5, l2: 6, r2: 7, select: 8, start: 9, leftStickPress: 10, rightStickPress: 11, dpadUp: 12, dpadDown: 13, dpadLeft: 14, dpadRight: 15, home: 16 }, xt = { leftStickX: 0, leftStickY: 1, rightStickX: 2, rightStickY: 3 }, Di = new Map(Object.entries(D).map(([r, t]) => [t, r])), Gi = new Map(Object.entries(xt).map(([r, t]) => [t, r]));
function Li(r, t) {
  const e = Array.from(r.buttons, (h) => ({ pressed: !!h.pressed, touched: h.touched === void 0 ? void 0 : !!h.touched, value: h.value })), s = Array.from(r.axes, (h) => h), i = r.mapping === "standard" ? "standard" : "", n = { index: r.index, id: r.id, connected: !!r.connected, mapping: i, timestamp: r.timestamp, buttons: e, axes: s };
  return i === "standard" && (n.standard = (function(h, o, c) {
    const l = h[D.home];
    return { faceButtons: { south: U(h, D.south), east: U(h, D.east), west: U(h, D.west), north: U(h, D.north) }, shoulders: { l1: U(h, D.l1), r1: U(h, D.r1), l2: U(h, D.l2), r2: U(h, D.r2) }, center: { select: U(h, D.select), start: U(h, D.start), leftStickPress: U(h, D.leftStickPress), rightStickPress: U(h, D.rightStickPress), ...l ? { home: U(h, D.home) } : {} }, dpad: { up: U(h, D.dpadUp), down: U(h, D.dpadDown), left: U(h, D.dpadLeft), right: U(h, D.dpadRight) }, leftStick: Le(o, xt.leftStickX, xt.leftStickY, c), rightStick: Le(o, xt.rightStickX, xt.rightStickY, c) };
  })(e, s, t)), n;
}
function U(r, t) {
  return r[t] ?? { pressed: !1, value: 0 };
}
function Le(r, t, e, s) {
  const i = r[t] ?? 0, n = r[e] ?? 0, h = Math.hypot(i, n);
  return h <= s ? { x: 0, y: 0, magnitude: 0 } : { x: i, y: n, magnitude: h };
}
const Ui = { axisDeadzone: 0.15, axisChangeEpsilon: 0.01, buttonPressThreshold: 0.5, buttonReleaseThreshold: 0.45 };
class Bi {
  constructor(t, e = {}) {
    a(this, "Df");
    a(this, "Of", []);
    a(this, "Rf", /* @__PURE__ */ new Map());
    a(this, "Bf", /* @__PURE__ */ new Map());
    a(this, "Bu", new Vt());
    a(this, "il", !1);
    a(this, "If", /* @__PURE__ */ new Set());
    a(this, "jf", /* @__PURE__ */ new Set());
    a(this, "sl");
    this.Df = { ...Ui, ...e }, this.sl = t;
  }
  cl() {
    this.il || (this.Bu.Iu(window, "gamepadconnected", (t) => {
      const e = t.gamepad;
      e && (this.If.add(e.index), this.jf.delete(e.index));
    }), this.Bu.Iu(window, "gamepaddisconnected", (t) => {
      const e = t.gamepad;
      e && (this.jf.add(e.index), this.If.delete(e.index));
    }), this.il = !0);
  }
  vl() {
    this.il && (this.Bu.ju(), this.il = !1, this.If.clear(), this.jf.clear(), this.Of = [], this.Rf.clear(), this.Bf.clear());
  }
  xl() {
    const t = /* @__PURE__ */ new Map();
    for (const e of this.zf()) {
      if (!e || !e.connected) continue;
      const s = Li(e, this.Df.axisDeadzone);
      t.set(s.index, s);
    }
    for (const [e, s] of this.Rf) t.has(e) || this.sl.Nu("gamepadDisconnected", { gamepad: { ...s, connected: !1 } });
    for (const [e, s] of t) this.Rf.has(e) || this.sl.Nu("gamepadConnected", { gamepad: s });
    for (const [e, s] of t) {
      const i = this.Rf.get(e);
      i && (this.Qf(s, i), this.Hf(s, i));
    }
    this.Bf = this.Rf, this.Rf = t, this.Of = Array.from(t.values()).sort((e, s) => e.index - s.index), this.If.clear(), this.jf.clear();
  }
  Nf() {
    return this.Of;
  }
  Gf(t) {
    return this.Rf.get(t);
  }
  Xf(t, e) {
    if (e === "standard") return (function(s, i) {
      if (i === "standard") return Di.get(s);
    })(t, e);
  }
  Vf(t, e) {
    if (e === "standard") return (function(s, i) {
      if (i === "standard") return Gi.get(s);
    })(t, e);
  }
  Qf(t, e) {
    const s = Math.max(t.buttons.length, e.buttons.length);
    for (let i = 0; i < s; i++) {
      const n = t.buttons[i] ?? { pressed: !1, value: 0 }, h = e.buttons[i] ?? { pressed: !1, value: 0 }, o = h.value >= this.Df.buttonPressThreshold;
      n.value >= this.Df.buttonPressThreshold && !o && this.sl.Nu("gamepadButtonPressed", { gamepad: t, buttonIndex: i, button: n, previousButton: h, standardButtonName: this.Xf(i, t.mapping) });
      const c = h.value >= this.Df.buttonReleaseThreshold;
      !(n.value >= this.Df.buttonReleaseThreshold) && c && this.sl.Nu("gamepadButtonReleased", { gamepad: t, buttonIndex: i, button: n, previousButton: h, standardButtonName: this.Xf(i, t.mapping) });
    }
  }
  Hf(t, e) {
    const s = Math.max(t.axes.length, e.axes.length);
    for (let i = 0; i < s; i++) {
      const n = t.axes[i] ?? 0, h = e.axes[i] ?? 0, o = n - h;
      (Math.abs(h) <= this.Df.axisDeadzone != Math.abs(n) <= this.Df.axisDeadzone || Math.abs(o) >= this.Df.axisChangeEpsilon) && this.sl.Nu("gamepadAxisChanged", { gamepad: t, axisIndex: i, value: n, previousValue: h, delta: o, standardAxisName: this.Vf(i, t.mapping) });
    }
  }
  zf() {
    const t = navigator;
    if (typeof t.getGamepads != "function") return [];
    const e = t.getGamepads.call(navigator);
    return Array.from(e ?? []);
  }
}
class ki {
  constructor(t) {
    a(this, "Wf");
    a(this, "Yf", /* @__PURE__ */ new Map());
    a(this, "Zf", /* @__PURE__ */ new Map());
    a(this, "Kf", /* @__PURE__ */ new Map());
    a(this, "$f", /* @__PURE__ */ new Map());
    a(this, "qf", /* @__PURE__ */ new Map());
    a(this, "Jf", /* @__PURE__ */ new Map());
    a(this, "td", /* @__PURE__ */ new Map());
    this.Wf = t;
  }
  sd(t, e) {
    return this.ed(this.Yf, t, e);
  }
  rd(t, e) {
    return this.ed(this.Zf, t, e);
  }
  nd(t, e) {
    return this.ed(this.Kf, t, e);
  }
  hd(t, e) {
    return this.ed(this.$f, t, e);
  }
  od(t, e) {
    return this.ed(this.qf, t, e);
  }
  ad(t, e) {
    return this.ed(this.Jf, t, e);
  }
  ud(t, e) {
    return this.ed(this.td, t, e);
  }
  ld() {
    this.fd(this.Yf, (t) => t());
  }
  dd() {
    this.fd(this.Zf, (t) => t());
  }
  _d(t) {
    this.fd(this.Kf, (e) => e(t));
  }
  Js(t) {
    this.fd(this.$f, (e) => e(t));
  }
  ne(t) {
    this.fd(this.qf, (e) => e(t));
  }
  async pd() {
    await this.md(this.Jf, (t) => t());
  }
  async gd() {
    await this.md(this.td, (t) => t());
  }
  vd(t) {
    this.Yf.delete(t), this.Zf.delete(t), this.Kf.delete(t), this.$f.delete(t), this.qf.delete(t), this.Jf.delete(t), this.td.delete(t);
  }
  ed(t, e, s) {
    const i = t.get(e) ?? /* @__PURE__ */ new Set();
    return i.add(s), t.set(e, i), () => {
      const n = t.get(e);
      n && (n.delete(s), n.size === 0 && t.delete(e));
    };
  }
  fd(t, e) {
    for (const s of this.Wf) {
      const i = t.get(s);
      i && i.forEach(e);
    }
  }
  async md(t, e) {
    for (const s of this.Wf) {
      const i = t.get(s);
      if (i) for (const n of i) await e(n);
    }
  }
}
class Ue {
  constructor(t) {
    a(this, "yd");
    a(this, "wd");
    a(this, "Md", /* @__PURE__ */ new Map());
    this.yd = t.targetName, this.wd = t.getPrototype;
  }
  bd(t, e, s) {
    let i = this.Md.get(t);
    i || (i = /* @__PURE__ */ new Map(), this.Md.set(t, i));
    for (const [n, h] of this.Md) if (n !== t && h.has(e)) throw new M(`Plugin "${t}" attempted to register ${this.yd} method "${e}" which is already provided by plugin "${n}".`, { plugin: t, method: e, conflictingPlugin: n });
    i.set(e, s), this.Ad(e, s);
  }
  Cd(t, e) {
    const s = this.Md.get(t);
    if (!s) return;
    s.delete(e);
    let i = !1;
    for (const [n, h] of this.Md) if (n !== t && h.has(e)) {
      i = !0;
      const o = h.get(e);
      this.Ad(e, o);
      break;
    }
    i || this.xd(e), s.size === 0 && this.Md.delete(t);
  }
  Fd(t) {
    const e = this.Md.get(t);
    if (e) {
      for (const s of e.keys()) this.xd(s);
      this.Md.delete(t);
    }
  }
  Ad(t, e) {
    const s = this.wd();
    Object.defineProperty(s, t, { value: e, writable: !0, configurable: !0, enumerable: !1 });
  }
  xd(t) {
    const e = this.wd(), s = Object.getOwnPropertyDescriptor(e, t);
    s && s.configurable && delete e[t];
  }
}
class Ii {
  constructor(t, e, s, i) {
    a(this, "le");
    a(this, "Sd");
    a(this, "Pd");
    a(this, "Ed");
    this.le = t, this.Sd = e, this.Pd = s, this.Ed = i;
  }
  Td(t) {
    const e = this.le, s = this.Sd, i = this.Pd, n = this.Ed, h = { get canvas() {
      return e.p.canvas;
    }, get targetCanvas() {
      return e.p.targetCanvas;
    }, get width() {
      return e.p.width;
    }, get height() {
      return e.p.height;
    }, get ownsContext() {
      return e.p.ownsContext;
    } };
    return { get renderer() {
      return e.G;
    }, get canvas() {
      return h;
    }, get layerManager() {
      return e.layers;
    }, get font() {
      return e.layers.base.font;
    }, get glyphAtlas() {
      return e.layers.base.font;
    }, get grid() {
      return e.layers.base.grid;
    }, get drawFramebuffer() {
      return e.layers.base.drawFramebuffer;
    }, get asciiFramebuffer() {
      return e.layers.base.asciiFramebuffer;
    }, registerPreDrawHook: (o) => s.sd(t, o), registerPostDrawHook: (o) => s.rd(t, o), registerLayerDisposedHook: (o) => s.nd(t, o), registerLayerPreRenderHook: (o) => s.hd(t, o), registerLayerPostRenderHook: (o) => s.od(t, o), registerPreSetupHook: (o) => s.ad(t, o), registerPostSetupHook: (o) => s.ud(t, o), extendLayer: (o, c) => {
      i.bd(t, o, c);
    }, removeLayerExtension: (o) => {
      i.Cd(t, o);
    }, extendSource: (o, c) => {
      n.bd(t, o, c);
    }, removeSourceExtension: (o) => {
      n.Cd(t, o);
    } };
  }
}
class Ni {
  constructor() {
    a(this, "kd", /* @__PURE__ */ new Map());
    a(this, "Wf", []);
  }
  Ld(t) {
    return this.kd.has(t);
  }
  cu(t) {
    return this.kd.get(t);
  }
  Iu(t) {
    this.kd.set(t.name, t), this.Wf.push(t.name);
  }
  Dd(t) {
    this.kd.delete(t);
    const e = this.Wf.indexOf(t);
    e !== -1 && this.Wf.splice(e, 1);
  }
  Od() {
    return [...this.Wf];
  }
  Rd() {
    return this.Wf;
  }
}
class Oi {
  constructor(t) {
    a(this, "le");
    a(this, "Bd");
    a(this, "Sd");
    a(this, "Pd");
    a(this, "Ed");
    a(this, "Id");
    this.le = t, this.Bd = new Ni(), this.Sd = new ki(this.Bd.Rd()), this.Pd = new Ue({ targetName: "layer", getPrototype: () => Object.getPrototypeOf(this.le.layers.base) }), this.Ed = new Ue({ targetName: "source", getPrototype: () => St.prototype }), this.Id = new Ii(this.le, this.Sd, this.Pd, this.Ed);
  }
  jd(t) {
    for (const e of t) {
      if (this.Bd.Ld(e.name)) {
        console.warn(`[textmode.js] Plugin "${e.name}" is already installed.`);
        continue;
      }
      const s = this.zd(e.name);
      try {
        const i = e.install(this.le, s);
        i instanceof Promise && i.catch((n) => {
          console.error(`[textmode.js] Async plugin "${e.name}" installation error:`, n), this.Qd(e.name);
        });
      } catch (i) {
        throw this.Qd(e.name), i;
      }
      this.Bd.Iu(e);
    }
  }
  async Hd(t) {
    for (const e of t) {
      if (this.Bd.Ld(e.name)) {
        console.warn(`[textmode.js] Plugin "${e.name}" is already installed.`);
        continue;
      }
      const s = this.zd(e.name);
      try {
        await e.install(this.le, s);
      } catch (i) {
        throw this.Qd(e.name), i;
      }
      this.Bd.Iu(e);
    }
  }
  async Nd(t) {
    const e = this.Bd.cu(t);
    if (!e) return;
    const s = this.zd(t);
    e.uninstall && await e.uninstall(this.le, s), this.Bd.Dd(t), this.Qd(t);
  }
  ld() {
    this.Sd.ld();
  }
  dd() {
    this.Sd.dd();
  }
  _d(t) {
    this.Sd._d(t);
  }
  Js(t) {
    this.Sd.Js(t);
  }
  ne(t) {
    this.Sd.ne(t);
  }
  async pd() {
    await this.Sd.pd();
  }
  async gd() {
    await this.Sd.gd();
  }
  async Gd() {
    const t = this.Bd.Od();
    for (const e of t) await this.Nd(e);
  }
  zd(t) {
    return this.Id.Td(t);
  }
  Qd(t) {
    this.Sd.vd(t), this.Pd.Fd(t), this.Ed.Fd(t);
  }
}
const mt = `#version 300 es
layout(location=0)in vec2 A0;layout(location=1)in vec2 A1;out vec2 v_uv;void main(){v_uv=A1;gl_Position=vec4(A0,0.,1.);}`, as = `#version 300 es
precision highp float;uniform sampler2D u_texture;in vec2 v_uv;out vec4 fragColor;void main(){fragColor=texture(u_texture,v_uv);}`, Xi = ({ textmodifier: r }) => {
  const t = "|/-\\", e = Math.floor(r.millis / 120) % 4;
  r.background("#222323"), r.charColor("#F8F8F8"), r.cellColor("#222323"), pt(r, t[e], 0), r.charColor("#C0C0C0"), pt(r, "LOADING...", 5);
}, Yi = { transition: "fade", transitionDuration: 500 };
class cs extends qe {
  constructor(e, s) {
    super(e);
    a(this, "Kt");
    a(this, "me", "active");
    a(this, "Xd", 0);
    a(this, "Vd");
    this.Kt = { ...Yi, ...s ?? {} }, this.Kt.transition === "none" && (this.Kt.transitionDuration = 0);
  }
  async Dt() {
    this.Tt || (await super.Dt(), this.fe.opacity(1), this.fe.show());
  }
  get we() {
    return this.me === "active" || this.me === "transitioning";
  }
  Wd() {
    this.Kt.transitionDuration > 0 ? (this.Yd(), this.Xd = performance.now(), this.Tt && (this.fe.opacity(1), this.fe.show())) : (this.Tt && (this.fe.opacity(0), this.fe.hide()), this.Zd(), this.Kd());
  }
  $d(e) {
    this.Vd = e;
  }
  Ae() {
    if (this.me === "transitioning" && this.qd())
      return this.Jd(), void this.Kd();
    this.Ce();
  }
  de() {
    return new j(this.le.G, { visible: !0, opacity: 1, fontSize: 16 });
  }
  Kd() {
    this.Vd && this.Vd();
  }
  qd() {
    if (!this.Tt) return !0;
    const e = this.Kt.transitionDuration;
    if (e <= 0) return this.fe.opacity(0), this.fe.hide(), !0;
    const s = performance.now() - this.Xd, i = Math.min(1, s / e);
    return this.fe.opacity(1 - i), i >= 1 && (this.fe.hide(), !0);
  }
  Ce() {
    if (!this.Tt) return;
    const e = { textmodifier: this.le, grid: this.fe.grid };
    this._e(Xi, e);
  }
  Zd() {
    this.me !== "disabled" && (this.me = "done");
  }
  Yd() {
    this.me !== "disabled" && (this.me = "transitioning");
  }
  Jd() {
    this.me === "transitioning" && (this.me = "done");
  }
}
const cr = Object.freeze(Object.defineProperty({ __proto__: null, LoadingLayerController: cs }, Symbol.toStringTag, { value: "Module" })), Be = Object.fromEntries(bt.map((r, t) => [r, t]));
class Wi {
  constructor(t, e, s) {
    a(this, "G");
    a(this, "t_");
    a(this, "Ds");
    a(this, "i_", 0);
    this.G = t, this.t_ = t.sr(mt, `#version 300 es
precision highp float;uniform sampler2D Up;uniform sampler2D Uq;uniform vec2 Ur;uniform vec2 Us;uniform vec2 Ut;uniform float Uu;uniform float Uv;uniform int Uw;in vec2 v_uv;out vec4 fragColor;const int A=0;const int B=1;const int C=2;const int D=3;const int E=4;const int F=5;const int G=6;const int H=7;const int I=8;const int J=9;const int K=10;const int L=11;const int M=12;const int N=13;vec3 O(vec3 P,vec3 Q){return Q;}vec3 R(vec3 P,vec3 Q){return P+Q;}vec3 S(vec3 P,vec3 Q){return P*Q;}vec3 T(vec3 P,vec3 Q){return 1.-(1.-P)*(1.-Q);}vec3 U(vec3 P,vec3 Q){return max(P-Q,0.);}vec3 V(vec3 P,vec3 Q){return min(P,Q);}vec3 W(vec3 P,vec3 Q){return max(P,Q);}vec3 X(vec3 P,vec3 Q){return mix(2.*P*Q,1.-2.*(1.-P)*(1.-Q),step(0.5,P));}vec3 Y(vec3 P,vec3 Q){return mix(P-(1.-2.*Q)*P*(1.-P),mix(P+(2.*Q-1.)*(P*(3.-2.*P)-P),P+(2.*Q-1.)*(sqrt(P)-P),step(0.25,P)),step(0.5,Q));}vec3 Z(vec3 P,vec3 Q){return mix(2.*P*Q,1.-2.*(1.-P)*(1.-Q),step(0.5,Q));}vec3 a(vec3 P,vec3 Q){return mix(min(vec3(1.),P/max(1.-Q,0.0001)),vec3(1.),step(1.,Q));}vec3 b(vec3 P,vec3 Q){return mix(1.-min(vec3(1.),(1.-P)/max(Q,0.0001)),vec3(0.),step(Q,vec3(0.)));}vec3 c(vec3 P,vec3 Q){return abs(P-Q);}vec3 d(vec3 P,vec3 Q){return P+Q-2.*P*Q;}vec3 e(int f,vec3 P,vec3 Q){if(f==A)return O(P,Q);if(f==B)return R(P,Q);if(f==C)return S(P,Q);if(f==D)return T(P,Q);if(f==E)return U(P,Q);if(f==F)return V(P,Q);if(f==G)return W(P,Q);if(f==H)return X(P,Q);if(f==I)return Y(P,Q);if(f==J)return Z(P,Q);if(f==K)return a(P,Q);if(f==L)return b(P,Q);if(f==M)return c(P,Q);if(f==N)return d(P,Q);return O(P,Q);}void main(){vec4 g=texture(Uq,v_uv);vec2 h=v_uv*Ur;vec2 i=h-Ut;vec2 j=Us*0.5;vec2 k=i-j;float l=cos(-Uv);float m=sin(-Uv);vec2 n=vec2(k.x*l-k.y*m,k.x*m+k.y*l);i=n+j;bool o=any(lessThan(i,vec2(0.)))||any(greaterThanEqual(i,Us));if(o){fragColor=g;return;}vec2 p=(floor(i)+0.5)/Us;vec4 q=texture(Up,p);float r=q.a*Uu;if(r<=0.){fragColor=g;return;}vec3 s=e(Uw,g.rgb,q.rgb);vec3 t=mix(g.rgb,s,r);float u=g.a+r*(1.-g.a);fragColor=vec4(t,u);}`), this.Ds = [this.G.K(e, s, 1, { depth: !1 }), this.G.K(e, s, 1, { depth: !1 })];
  }
  s_(t) {
    const { base: e, targetFramebuffer: s, backgroundColor: i, layers: n, canvasWidth: h, canvasHeight: o } = t, c = this.G.wa(), l = this.G.Ma();
    this.G.va(!1), this.G.ya(!1);
    const u = this.Ds[0];
    u.begin(), this.G.Ch(...i), u.end(), this.i_ = 0, e.layer.bs && this.e_(e.texture, h, o, e.width, e.height, e.layer.As, e.offsetX, e.offsetY, e.layer.Fs, "normal");
    for (const f of n) {
      const d = f.layer;
      d.bs && this.e_(f.texture, h, o, f.width, f.height, d.As, f.offsetX, f.offsetY, d.Fs, d.Cs);
    }
    this.r_(s, h, o), this.G.ya(l), this.G.va(c);
  }
  e_(t, e, s, i, n, h, o, c, l, u) {
    const f = this.Ds[this.i_], d = this.i_ === 0 ? 1 : 0, m = this.Ds[d], y = V(l);
    m.begin(), this.G.he(this.t_), this.t_.oe({ Up: t, Uq: f.textures[0], Ur: [e, s], Us: [i, n], Ut: [o, c], Uu: h, Uv: y, Uw: Be[u] }), this.G.ae(0, 0, f.width, f.height), m.end(), this.i_ = d;
  }
  r_(t, e, s) {
    const i = this.Ds[this.i_];
    t.begin(), this.G.he(this.t_), this.t_.oe({ Up: i.textures[0], Uq: i.textures[0], Ur: [e, s], Us: [i.width, i.height], Ut: [0, 0], Uu: 1, Uv: 0, Uw: Be.normal }), this.G.ae(0, 0, e, s), t.end();
  }
  ue(t, e) {
    this.Ds[0].resize(t, e), this.Ds[1].resize(t, e);
  }
  k() {
    this.t_.dispose(), this.Ds[0].dispose(), this.Ds[1].dispose();
  }
}
function zi(r) {
  if (typeof r == "number" || typeof r == "boolean") return !0;
  if (Array.isArray(r)) {
    if (r.length === 0) return !0;
    const t = r[0];
    return typeof t == "number" || !!Array.isArray(t);
  }
  return r instanceof Float32Array || r instanceof Int32Array || !!wt(r) || typeof WebGLTexture < "u" && r instanceof WebGLTexture;
}
async function Bt(r) {
  if (r.startsWith("./") || r.startsWith("../") || r.endsWith(".vert") || r.endsWith(".frag") || r.endsWith(".glsl")) {
    const t = await fetch(r);
    if (!t.ok) throw Error(`Failed to load shader from ${r}: ${t.statusText}`);
    return await t.text();
  }
  return r;
}
class us {
  constructor(t) {
    a(this, "G");
    a(this, "n_", /* @__PURE__ */ new Map());
    a(this, "h_", /* @__PURE__ */ new Map());
    a(this, "Xe");
    a(this, "Ds");
    a(this, "Tt", !1);
    this.G = t, this.Xe = t.sr(mt, as), this.o_();
  }
  async register(t, e, s = {}) {
    const i = typeof e == "string" ? this.G.sr(mt, await Bt(e)) : e;
    this.a_(t, i, s);
  }
  c_(t, e, s) {
    this.a_(t, this.G.sr(mt, e), s);
  }
  a_(t, e, s) {
    this.h_.set(t, e);
    const i = Object.entries(s), n = i.length > 0 ? i[0][1][0] : null;
    this.n_.set(t, { id: t, createShader: () => e, createUniforms: (h, o) => {
      const c = { u_resolution: [o.width, o.height] };
      for (const [l, [u, f]] of i) {
        let d = f;
        if (h != null) {
          if (typeof h == "number" && u === n) d = h;
          else if (typeof h == "object" && u in h) {
            const m = h[u];
            zi(m) && (d = m);
          }
        }
        c[l] = d;
      }
      return c;
    } });
  }
  unregister(t) {
    const e = this.h_.get(t);
    return e && (e.dispose(), this.h_.delete(t)), this.n_.delete(t);
  }
  has(t) {
    return this.n_.has(t);
  }
  Dt(t, e) {
    this.Tt || (this.Ds = [this.G.K(t, e, 1, { depth: !1 }), this.G.K(t, e, 1, { depth: !1 })], this.Tt = !0);
  }
  u_(t, e, s, i, n) {
    this.Ds[0].width === i && this.Ds[0].height === n || (this.Ds[0].resize(i, n), this.Ds[1].resize(i, n)), this.ce(t, e, s, i, n, this.Ds);
  }
  ce(t, e, s, i, n, h) {
    if (s.length === 0)
      return this.l_(t, e) ? void 0 : void this.f_(t, e, i, n);
    let o = t, c = 0;
    for (let l = 0; l < s.length; l++) {
      const u = s[l];
      let f = e;
      if (l !== s.length - 1 || this.l_(o, e)) {
        const d = this.d_(o, h, c);
        f = d.buffer, c = d.index === 0 ? 1 : 0;
      }
      this.__(u, o, f, i, n), o = f.textures[0];
    }
    this.l_(o, e) || this.f_(o, e, i, n);
  }
  __(t, e, s, i, n) {
    const h = this.n_.get(t.name);
    if (!h) return console.warn(`[textmode.js] Unknown filter: "${t.name}". Skipping.`), void this.f_(e, s, i, n);
    const o = this.p_(t.name, h, i, n), c = { renderer: this.G, gl: this.G.context, width: i, height: n };
    s.begin(), this.G.he(o), o.oe({ u_texture: e });
    const l = h.createUniforms(t.params, c);
    o.oe(l), this.G.ae(0, 0, i, n), s.end();
  }
  l_(t, e) {
    return e.textures.includes(t);
  }
  d_(t, e, s) {
    const i = e[s];
    if (!this.l_(t, i)) return { buffer: i, index: s };
    const n = s === 0 ? 1 : 0, h = e[n];
    return this.l_(t, h) ? { buffer: i, index: s } : { buffer: h, index: n };
  }
  p_(t, e, s, i) {
    let n = this.h_.get(t);
    if (!n && e) {
      const h = { renderer: this.G, gl: this.G.context, width: s, height: i };
      n = e.createShader(h), this.h_.set(t, n);
    }
    return n;
  }
  f_(t, e, s, i) {
    e.begin(), this.G.he(this.Xe), this.Xe.oe({ u_texture: t, u_resolution: [s, i] }), this.G.ae(0, 0, s, i), e.end();
  }
  ue(t, e) {
    this.Ds && (this.Ds[0].resize(t, e), this.Ds[1].resize(t, e));
  }
  k() {
    for (const t of this.h_.values()) t.dispose();
    this.h_.clear(), this.n_.clear(), this.Xe.dispose(), this.Ds && (this.Ds[0].dispose(), this.Ds[1].dispose()), this.Tt = !1;
  }
  o_() {
    this.c_("invert", `#version 300 es
precision highp float;uniform sampler2D u_texture;in vec2 v_uv;out vec4 fragColor;void main(){vec4 A=texture(u_texture,v_uv);fragColor=vec4(1.-A.rgb,A.a);}`, {}), this.c_("grayscale", `#version 300 es
precision highp float;uniform sampler2D u_texture;uniform float Ui;in vec2 v_uv;out vec4 fragColor;void main(){vec4 A=texture(u_texture,v_uv);float B=dot(A.rgb,vec3(0.299,0.587,0.114));vec3 C=mix(A.rgb,vec3(B),Ui);fragColor=vec4(C,A.a);}`, { Ui: ["amount", 1] }), this.c_("sepia", `#version 300 es
precision highp float;uniform sampler2D u_texture;uniform float Ui;in vec2 v_uv;out vec4 fragColor;void main(){vec4 A=texture(u_texture,v_uv);vec3 B;B.r=dot(A.rgb,vec3(0.393,0.769,0.189));B.g=dot(A.rgb,vec3(0.349,0.686,0.168));B.b=dot(A.rgb,vec3(0.272,0.534,0.131));vec3 C=mix(A.rgb,B,Ui);fragColor=vec4(C,A.a);}`, { Ui: ["amount", 1] }), this.c_("threshold", `#version 300 es
precision highp float;uniform sampler2D u_texture;uniform float Ul;in vec2 v_uv;out vec4 fragColor;void main(){vec4 A=texture(u_texture,v_uv);float B=dot(A.rgb,vec3(0.299,0.587,0.114));float C=step(Ul,B);fragColor=vec4(vec3(C),A.a);}`, { Ul: ["threshold", 0.5] });
  }
}
const ur = Object.freeze(Object.defineProperty({ __proto__: null, TextmodeFilterManager: us }, Symbol.toStringTag, { value: "Module" }));
class ls {
  constructor(t, e) {
    a(this, "le");
    a(this, "G");
    a(this, "m_");
    a(this, "g_");
    a(this, "v_", []);
    a(this, "y_", []);
    a(this, "w_");
    a(this, "M_", !1);
    a(this, "b_", /* @__PURE__ */ new Set());
    a(this, "A_", []);
    a(this, "C_", []);
    a(this, "x_", !1);
    a(this, "F_", () => {
    });
    a(this, "S_");
    a(this, "P_");
    a(this, "E_");
    a(this, "T_");
    a(this, "U_");
    a(this, "k_", { bs: !0, As: 1, Fs: 0, Cs: "normal" });
    this.le = t, this.G = t.G, this.g_ = new us(this.G), this.m_ = new Wi(this.G, this.le.p.width, this.le.p.height), this.w_ = new j(this.G, { visible: !0, opacity: 1, fontSize: e.fontSize, fontSource: e.fontSource }), this.T_ = new cs(this.le, e.loadingScreen), this.U_ = new Ke(this.le);
  }
  async Dt() {
    await this.L_(this.w_);
    const t = this.le.p;
    this.S_ = this.G.K(t.width, t.height, 1, { depth: !1 }), this.P_ = this.G.K(t.width, t.height, 1, { depth: !1 }), this.E_ = this.S_, this.g_.Dt(t.width, t.height), await this.T_.Dt(), await this.U_.Dt(), await this.L_(this.T_.fe), await this.L_(this.U_.fe), await this.D_(), this.M_ = !0;
  }
  O_(t, e) {
    (this.x_ ? this.C_ : this.A_).push({ name: t, params: e });
  }
  R_(t) {
    this.F_ = t;
  }
  B_() {
    this.A_ = [], this.C_ = [];
  }
  add(t = {}) {
    const e = new j(this.G, t);
    return this.M_ ? (this.L_(e), this.v_.push(e)) : this.y_.push(e), e;
  }
  remove(t) {
    this.I_(this.v_, t) || this.I_(this.y_, t);
  }
  move(t, e) {
    this.j_(this.v_, t, e) || this.j_(this.y_, t, e);
  }
  swap(t, e) {
    this.z_(this.v_, t, e) || this.z_(this.y_, t, e);
  }
  clear() {
    this.Q_(this.v_), this.v_ = [], this.Q_(this.y_), this.y_ = [];
  }
  H_(t, e = [], s = !1) {
    this.le.te.ld(), this.w_.qs(this.le, this.le.N_);
    const i = [...this.G.state.gn.dn];
    let n = i;
    for (const h of this.v_) h.qs(this.le, this.le.N_);
    for (const h of e) h.bs && h.qs(this.le, this.le.N_, { skipPluginHooks: !0 });
    if (s && e.length > 0) {
      const h = e[0], o = [...this.G.state.gn.dn], c = Math.max(0, Math.min(1, h.As));
      n = this.G_(i, o, c);
    }
    this.X_(t, n, e);
  }
  G_(t, e, s) {
    const i = 1 - s;
    return [t[0] * i + e[0] * s, t[1] * i + e[1] * s, t[2] * i + e[2] * s, t[3] * i + e[3] * s];
  }
  V_() {
    this.H_(this.S_), this.W_();
  }
  Y_(t, e = !1) {
    this.H_(this.S_, [t], e), this.W_();
  }
  W_() {
    let t = this.S_.textures[0];
    if (this.A_.length > 0) {
      const e = this.le.p;
      this.g_.u_(this.S_.textures[0], this.P_, this.A_, e.width, e.height), t = this.P_.textures[0], this.E_ = this.P_, this.A_ = [];
    } else this.E_ = this.S_;
    try {
      try {
        this.x_ = !0, this.F_.call(this.le);
      } finally {
        this.x_ = !1;
      }
      if (this.C_.length > 0) {
        const e = this.P_;
        this.g_.u_(this.E_.textures[0], e, this.C_, this.le.p.width, this.le.p.height), t = e.textures[0], this.E_ = e;
      }
    } finally {
      this.C_ = [], this.x_ = !1;
    }
    this.Z_(t), this.le.te.dd();
  }
  Z_(t) {
    const e = this.le.p;
    this.G.Ch(0, 0, 0, 0), this.G.he(this.le.K_), this.le.K_.oe({ u_texture: t }), this.G.ae(0, 0, e.width, e.height);
  }
  q_(t) {
    this.J_(() => {
      t.qs(this.le, this.le.N_, { skipPluginHooks: !0 });
      const e = t.texture, s = t.grid;
      e && s && (this.G.Ch(...this.G.state.gn.dn), this.G.he(this.le.K_), this.le.K_.oe({ u_texture: e }), this.G.ae(s.offsetX, s.offsetY, s.width, s.height));
    });
  }
  tp(t, e = !1) {
    this.J_(() => {
      const s = this.le.p, i = this.E_ ?? this.S_, n = i.textures[0];
      if (!n) return;
      t.qs(this.le, this.le.N_, { skipPluginHooks: !0 });
      const h = this.ip(t);
      if (!h) return void this.Z_(n);
      let o = [0, 0, 0, 0];
      if (e) {
        const l = [...this.G.state.gn.dn], u = Math.max(0, Math.min(1, t.As));
        o = this.G_(o, l, u);
      }
      const c = this.sp(i);
      this.m_.s_({ base: { layer: this.k_, texture: n, width: s.width, height: s.height, offsetX: 0, offsetY: 0 }, layers: [h], targetFramebuffer: c, backgroundColor: o, canvasWidth: s.width, canvasHeight: s.height }), this.Z_(c.textures[0]);
    });
  }
  J_(t) {
    const e = !this.G.Vo();
    e && this.G.Go(!0), this.G.Zo(!0), this.G.state.je();
    try {
      this.G.state.Yi.ws(), this.G.state.ee(), t();
    } finally {
      this.G.state.ze(), this.G.Ko(), e && this.G.Go(!1);
    }
  }
  sp(t) {
    return t === this.S_ ? this.P_ : this.S_;
  }
  ip(t) {
    if (!t.grid || !t.texture) return;
    const e = t.grid;
    return { layer: t, texture: t.texture, width: e.width, height: e.height, offsetX: e.offsetX + t.l, offsetY: e.offsetY + t._ };
  }
  X_(t, e, s = []) {
    const i = this.le.p, n = this.ip(this.w_);
    if (!n) return;
    const h = [];
    for (const o of this.v_) {
      const c = this.ip(o);
      c && h.push(c);
    }
    for (const o of s) {
      if (!o.bs) continue;
      const c = this.ip(o);
      c && h.push(c);
    }
    this.m_.s_({ base: n, layers: h, targetFramebuffer: t, backgroundColor: e, canvasWidth: i.width, canvasHeight: i.height });
  }
  ue() {
    var e, s, i, n, h;
    if (!this.M_) return;
    const t = this.le.p;
    this.w_.ue();
    for (const o of this.v_) o.ue();
    (e = this.T_.fe) == null || e.ue(), (s = this.U_.fe) == null || s.ue(), this.m_.ue(t.width, t.height), (i = this.S_) == null || i.resize(t.width, t.height), (n = this.P_) == null || n.resize(t.width, t.height), (h = this.g_) == null || h.ue(t.width, t.height);
  }
  k() {
    var t, e;
    this.T_.k(), this.U_.k(), this.clear(), this.le.te._d(this.w_), this.w_.k(), this.g_.k(), this.m_.k(), (t = this.S_) == null || t.dispose(), (e = this.P_) == null || e.dispose(), this.A_ = [], this.C_ = [], this.x_ = !1, this.M_ = !1;
  }
  get all() {
    return this.v_;
  }
  get base() {
    return this.w_;
  }
  get filters() {
    return this.g_;
  }
  get resultFramebuffer() {
    const t = this.A_.length > 0 || this.C_.length > 0 ? this.P_ : this.E_ ?? this.S_;
    if (!t) throw new M("LayerManager.resultFramebuffer is not available before initialization completes.");
    return t;
  }
  get loading() {
    return this.T_;
  }
  get errors() {
    return this.U_;
  }
  ep() {
    const t = this.v_;
    for (let e = t.length - 1; e >= 0; e--) {
      const s = t[e];
      if (s.bs && s.grid) return s.grid;
    }
    return this.w_.grid;
  }
  rp(t) {
    this.b_.add(t);
  }
  np() {
    for (const t of this.b_) t();
  }
  async D_() {
    for (let t = 0; t < this.y_.length; t++) {
      const e = this.y_[t];
      await this.L_(e), this.v_.push(e);
    }
    this.y_ = [];
  }
  I_(t, e) {
    const s = t.indexOf(e);
    return s !== -1 && (t.splice(s, 1), this.hp(e), !0);
  }
  j_(t, e, s) {
    const i = t.indexOf(e);
    return i !== -1 && (t.splice(i, 1), t.splice(O(s, 0, t.length), 0, e), !0);
  }
  z_(t, e, s) {
    if (e === s) return !0;
    const i = t.indexOf(e), n = t.indexOf(s);
    return i !== -1 && n !== -1 && (t[i] = s, t[n] = e, !0);
  }
  Q_(t) {
    for (const e of t) this.hp(e);
  }
  hp(t) {
    this.le.te._d(t), t.k();
  }
  async L_(t) {
    var s;
    const e = { renderer: this.G, canvas: this.le.p, filterManager: this.g_, createFramebuffer: (i, n, h = 1, o) => this.G.K(i, n, h, o) };
    await t.Xs(e), (s = t.grid) == null || s.F(() => this.np());
  }
}
const lr = Object.freeze(Object.defineProperty({ __proto__: null, TEXTMODE_LAYER_BLEND_MODES: bt, TextmodeLayer: j, TextmodeLayerManager: ls }, Symbol.toStringTag, { value: "Module" })), Vi = `#version 300 es
precision highp float;in vec2 v_uv;in vec3 v_worldPosition;uniform sampler2D u_image;uniform bool u_invert;uniform bool u_flipX;uniform bool u_flipY;uniform float u_charRotation;uniform float U9;uniform float Ua;uniform bool u_charColorFixed;uniform vec4 u_charColor;uniform bool u_cellColorFixed;uniform vec4 u_cellColor;uniform vec4 u_backgroundColor;uniform int u_charCount;uniform sampler2D u_charPaletteTexture;uniform ivec2 u_charPaletteDimensions;layout(location=0)out vec4 o_character;layout(location=1)out vec4 o_primaryColor;layout(location=2)out vec4 o_secondaryColor;layout(location=3)out vec4 o_statePayload;
` + le + `
float A(vec3 B){return dot(B,vec3(0.299f,0.587f,0.114f));}vec3 C(int D){int E=max(u_charPaletteDimensions.x,1);int F=D/E;int G=D%E;return texelFetch(u_charPaletteTexture,ivec2(G,F),0).rgb;}void main(){vec2 H=vec2(v_uv.x,1.0f-v_uv.y);vec4 I=texture(u_image,H);float J=A(I.rgb);if(I.a<0.01f||J<U9||J>Ua){discard;}vec2 K=vec2(0.);if(u_charCount>0){float L=float(u_charCount);float M=clamp(J*(L-1.0f),0.0f,L-1.0f);int N=int(floor(M+0.5f));vec3 O=C(N);K=O.xy;}else{K=vec2(0.0f,0.0f);}vec4 P=u_charColorFixed?u_charColor:I;vec4 Q=u_cellColorFixed?u_cellColor:I;vec3 R=tmApplyLighting(P.rgb,v_worldPosition);vec3 S=tmApplyLighting(Q.rgb,v_worldPosition);o_primaryColor=vec4(R,P.a);o_secondaryColor=vec4(S,Q.a);o_statePayload=vec4(0.);int T=int(u_invert?1:0);int U=int(u_flipX?1:0);int V=int(u_flipY?1:0);float W=float(T|(U<<1)|(V<<2))/255.;o_character=vec4(K,W,clamp(u_charRotation,0.0f,1.0f));}`, ji = { id: "brightness", createShader: ({ gl: r }) => new Et(r, os, Vi), createUniforms: ({ source: r }) => r.createBaseConversionUniforms() };
class fs {
  constructor() {
    a(this, "op", /* @__PURE__ */ new Map());
    a(this, "h_", /* @__PURE__ */ new Map());
    this.ap();
  }
  register(t) {
    this.op.set(t.id, t);
  }
  unregister(t) {
    const e = this.h_.get(t);
    return e && (e.dispose(), this.h_.delete(t)), this.op.delete(t);
  }
  has(t) {
    return this.op.has(t);
  }
  cu(t) {
    return this.op.get(t);
  }
  iu(t, e) {
    let s = this.h_.get(t);
    if (!s) {
      const i = this.op.get(t);
      if (!i) throw Error(`[textmode.js] Conversion mode "${t}" is not registered.`);
      s = i.createShader(e), this.h_.set(t, s);
    }
    return s;
  }
  k() {
    for (const t of this.h_.values()) t.dispose();
    this.h_.clear(), this.op.clear();
  }
  ap() {
    this.register(ji);
  }
}
const fr = Object.freeze(Object.defineProperty({ __proto__: null, TextmodeConversionManager: fs }, Symbol.toStringTag, { value: "Module" })), oe = "textmode-v1";
function ds() {
  var t, e;
  const r = globalThis.crypto;
  if (r != null && r.getRandomValues) {
    const s = new Uint32Array(4);
    return r.getRandomValues(s), `auto:${s[0]}:${s[1]}:${s[2]}:${s[3]}`;
  }
  return `auto:${Date.now()}:${((e = (t = globalThis.performance) == null ? void 0 : t.now) == null ? void 0 : e.call(t)) ?? 0}:${Math.random()}`;
}
function ye(r) {
  return typeof r == "number" ? "number:" + (r + "") : "string:" + r;
}
function ae(r, t) {
  return `stream:${r.length}:${r}:${t.length}:${t}`;
}
function Lt(r, t) {
  let e = (2166136261 ^ t) >>> 0;
  for (let s = 0; s < r.length; s += 1) e ^= r.charCodeAt(s), e = Math.imul(e, 16777619), e ^= e >>> 13;
  return e ^= r.length, e = Math.imul(e ^ e >>> 16, 2146121005), e = Math.imul(e ^ e >>> 15, 2221713035), (e ^ e >>> 16) >>> 0;
}
function ke(r) {
  const t = r[0] + r[1] + r[3] | 0;
  return r[3] = r[3] + 1 | 0, r[0] = r[1] ^ r[1] >>> 9, r[1] = r[2] + (r[2] << 3) | 0, r[2] = r[2] << 21 | r[2] >>> 11, r[2] = r[2] + t | 0, t >>> 0;
}
class jt {
  constructor(t = ds()) {
    a(this, "me");
    a(this, "cp");
    this.randomSeed(t);
  }
  random(t, e) {
    if (Array.isArray(t))
      return t.length === 0 ? void 0 : t[Math.floor(this.lp() * t.length)];
    const s = this.lp();
    return typeof t != "number" ? s : e === void 0 ? s * t : t + s * (e - t);
  }
  randomGaussian(t = 0, e = 1) {
    if (this.cp !== void 0) {
      const o = this.cp;
      return this.cp = void 0, t + o * e;
    }
    const s = Math.sqrt(-2 * Math.log(1 - this.lp())), i = 2 * Math.PI * this.lp(), n = s * Math.cos(i), h = s * Math.sin(i);
    return this.cp = h, t + n * e;
  }
  randomSeed(t) {
    this.me = (function(e) {
      const s = `${oe}\0${e}`, i = [Lt(s, 608135816), Lt(s, 2242054355), Lt(s, 320440878), Lt(s, 57701188)];
      i.every((n) => n === 0) && (i[0] = 1831565813);
      for (let n = 0; n < 12; n += 1) ke(i);
      return i;
    })(ye(t)), this.cp = void 0;
  }
  lp() {
    return ke(this.me) / 4294967296;
  }
  static get fp() {
    return oe;
  }
}
const dr = Object.freeze(Object.defineProperty({ __proto__: null, TEXTMODE_RANDOM_ALGORITHM: oe, TextmodeRandom: jt }, Symbol.toStringTag, { value: "Module" })), K = 4095;
function Zt(r) {
  return 0.5 * (1 - Math.cos(r * Math.PI));
}
class Hi {
  constructor(t) {
    a(this, "dp", []);
    a(this, "_p", 4);
    a(this, "pp", 0.5);
    this.noiseSeed(t);
  }
  noise(t, e = 0, s = 0) {
    t < 0 && (t = -t), e < 0 && (e = -e), s < 0 && (s = -s);
    let i = Math.floor(t), n = Math.floor(e), h = Math.floor(s), o = t - i, c = e - n, l = s - h, u = 0, f = 0.5;
    for (let d = 0; d < this._p; d += 1) {
      let m = i + (n << 4) + (h << 8);
      const y = Zt(o), w = Zt(c);
      let v = this.dp[m & K], g = this.dp[m + 1 & K];
      v += y * (g - v), g = this.dp[m + 16 & K];
      let x = this.dp[m + 16 + 1 & K];
      g += y * (x - g), v += w * (g - v), m += 256, g = this.dp[m & K], x = this.dp[m + 1 & K], g += y * (x - g);
      let b = this.dp[m + 16 & K];
      x = this.dp[m + 16 + 1 & K], b += y * (x - b), g += w * (b - g), v += Zt(l) * (g - v), u += v * f, f *= this.pp, i <<= 1, o *= 2, n <<= 1, c *= 2, h <<= 1, l *= 2, o >= 1 && (i += 1, o -= 1), c >= 1 && (n += 1, c -= 1), l >= 1 && (h += 1, l -= 1);
    }
    return O(u, 0, 1);
  }
  noiseSeed(t) {
    const e = new jt(t);
    this.dp = Array.from({ length: 4096 }, () => e.random());
  }
  noiseDetail(t, e) {
    this._p = Number.isFinite(t) ? Math.max(1, Math.floor(t)) : 1, e !== void 0 && Number.isFinite(e) && (this.pp = O(e, 0, 1));
  }
}
const pr = Object.freeze(Object.defineProperty({ __proto__: null, TextmodeColor: P }, Symbol.toStringTag, { value: "Module" }));
class p {
  constructor(t = {}) {
    a(this, "G");
    a(this, "N_");
    a(this, "K_");
    a(this, "p");
    a(this, "mp");
    a(this, "gf");
    a(this, "gp");
    a(this, "vp");
    a(this, "yp");
    a(this, "wp");
    a(this, "Mp");
    a(this, "re");
    a(this, "qa");
    a(this, "bp", /* @__PURE__ */ new Set());
    a(this, "te");
    a(this, "Ap");
    a(this, "Cp");
    a(this, "xp", /* @__PURE__ */ new Map());
    a(this, "Fp");
    a(this, "Sp");
    a(this, "Pp");
    a(this, "Ep");
    a(this, "Qo", !1);
    a(this, "Tp", !1);
    a(this, "Ta", !1);
    a(this, "kp", null);
    a(this, "Lp", !1);
    a(this, "Dp", 0);
    a(this, "Op", () => {
    });
    a(this, "Rp", () => {
    });
    a(this, "Bp");
    a(this, "Ip");
    a(this, "jp");
    a(this, "Ca", !1);
    a(this, "zp");
    a(this, "Qp");
    a(this, "Gp", (t, e, s, i) => P.Ya(t, e, s, i, this.G.state.gn.kn()));
    this.te = new Oi(this), this.Ca = t.overlay ?? !1;
    const e = t.seed ?? ds();
    this.Cp = ye(e), this.Ap = new jt(e), this.Fp = new Hi(ae(this.Cp, "noise")), this.Sp = new Promise((i) => {
      this.Ep = i;
    }), this.p = new Ai(t), this.G = new bi(this.p.ja()), this.N_ = this.G.sr(mt, `#version 300 es
precision highp float;uniform sampler2D u_characterTexture;uniform vec2 u_charsetDimensions;uniform sampler2D Uc;uniform sampler2D Ud;uniform sampler2D Ub;uniform bool Ue;uniform vec2 Uf;uniform vec2 Ug;uniform vec4 Uh;in vec2 v_uv;out vec4 fragColor;mat2 A(float B){float C=sin(B);float D=cos(B);return mat2(D,-C,C,D);}float E(vec3 F){return dot(F,vec3(0.299f,0.587f,0.114f));}void main(){vec2 G=gl_FragCoord.xy/Ug;vec2 H=G*Uf;vec2 I=floor(H);vec2 J=(I+0.5)/Uf;vec4 K=texture(Uc,J);vec4 L=texture(Ud,J);vec4 M=texture(Ub,J);int N=int(M.r*255.+0.5);int O=int(M.g*255.+0.5);int P=int(M.a*255.+0.5);if(N==255&&O==255){fragColor=mix(Uh,L,L.a);return;}int Q=int(M.b*255.+0.5);bool R=(Q&1)!=0;bool S=(Q&2)!=0;bool T=(Q&4)!=0;int U=N+O*256;int V=int(u_charsetDimensions.x);int W=U/V;int X=U-(W*V);float Y=(u_charsetDimensions.y-1.)-float(W);vec2 Z=1./u_charsetDimensions;vec2 a=vec2(float(X),Y)*Z;vec2 b=a+Z;float c=-M.a*360.*0.017453292;vec2 d=fract(H)-0.5f;vec2 e=vec2(S?-1.:1.,T?-1.:1.);d*=e;d=A(c)*d+0.5;vec2 f=a+clamp(d,0.,1.)*Z;const float g=0.0001;if(any(lessThan(f,a-g))||any(greaterThan(f,b+g))){fragColor=R?K:L;return;}vec4 h=texture(u_characterTexture,f);if(!Ue){fragColor=h;return;}float i=(h.a>0.0f&&E(h.rgb)>0.5f)?1.0f:0.0f;if(R)i=1.0f-i;vec4 j=mix(Uh,L,L.a);fragColor=mix(j,K,i);}`), this.K_ = this.G.sr(mt, as), this.mp = new Ei(t.frameRate ?? 60), this.Mp = new ls(this, t);
    const s = () => this.Hp();
    this.wp = new Ci(), this.gf = new Si(this.p, s, this.wp), this.gp = new Fi(this.p, s, this.wp, this.gf), this.vp = new Pi(this.wp), this.yp = new Bi(this.wp), this.qa = new fs(), this.te.jd(t.plugins ?? []), this.Pp = this.Dt();
  }
  Np(t) {
    var e;
    this.bp.add(t), (e = t.D) == null || e.call(t, () => {
      this.bp.delete(t);
    });
  }
  Xp(t, e) {
    var s;
    this.p.ue(t, e), (s = this.Mp) == null || s.ue(), this.G.ga(), this.qs();
  }
  Vp() {
    var i;
    const t = (i = this.Mp) == null ? void 0 : i.base.grid;
    if (!t) return;
    const e = t.cols, s = t.rows;
    for (const n of this.bp) n instanceof St && n.ue(e, s);
    this.zp && this.zp.ue(e, s);
  }
  async Dt() {
    await this.Mp.Dt(), this.Ep();
    const t = this.Mp.base.grid;
    this.Vp(), this.Mp.rp(() => {
      this.gf.yl(), this.gp.yl();
    }), this.Ca && (this.zp = Pt.uu(this.G, this.qa, this.p.targetCanvas, t.cols, t.rows, this.Gp)), this.Wp(), t.F(() => {
      this.Vp();
    }), this.Yp();
    try {
      await this.te.pd(), await this.Op(), await this.te.gd(), this.mp.Au = 0, this.loading.Wd(), this.Lp = !0, this.Yp();
    } catch (e) {
      this.Zp(e, "setup");
    }
  }
  Yp() {
    this.mp.xu(() => this.qs(), () => this.Kp());
  }
  Kp() {
    return !this.Tp && !this.Ta && (this.loading.we || this.errors.we || this.Lp || this.Dp > 0 || this.kp !== null);
  }
  $p(t) {
    this.Dp += t, this.Yp(), this.Qo || this.loading.we || this.errors.we || this.qp();
  }
  Wp() {
    this.Bp = () => {
      if (this.Ca) {
        const t = this.p.targetCanvas.getBoundingClientRect();
        this.resizeCanvas(Math.round(t.width), Math.round(t.height));
      }
      this.Rp();
    }, window.addEventListener("resize", this.Bp), this.gf.cl(), this.gp.cl(), this.vp.cl(), this.yp.cl(), this.Ip = () => {
      this.vp.Nl();
    }, window.addEventListener("blur", this.Ip), this.Ca && (this.jp = new ResizeObserver(() => {
      const t = this.p.targetCanvas.getBoundingClientRect();
      this.resizeCanvas(Math.round(t.width), Math.round(t.height));
    }), this.jp.observe(this.p.targetCanvas));
  }
  qs() {
    if (this.errors.we) {
      this.errors.Ae();
      const t = this.errors.fe;
      return void (t && this.Mp.q_(t));
    }
    if (this.loading.we) try {
      this.loading.Ae();
      const t = this.loading.fe;
      if (!t || !this.loading.we) return;
      if (this.loading.me === "transitioning") {
        if (this.Jp(), this.errors.we || !this.loading.we) return;
        this.Mp.tp(t, !0);
      } else this.Mp.q_(t);
    } catch (t) {
      this.Zp(t, "loading screen");
    }
    else this.qp() || this.tm() && this.im();
  }
  tm() {
    return this.Lp || this.mp.gu;
  }
  Jp() {
    this.tm() && this.im();
  }
  qp() {
    if (this.loading.we || this.errors.we || this.Dp <= 0) return !1;
    for (this.Lp = !1; this.Dp > 0; ) this.Dp--, this.im();
    return !0;
  }
  im() {
    this.Lp = !1, this.mp.ku(), this.mp.Du(), this.gf.xl(), this.yp.xl(), this.Qo = !0, this.G.Go(!0);
    try {
      this.Ca && Xt(this.G.context, this.zp.texture, this.p.targetCanvas), this.Mp.V_();
    } catch (t) {
      this.Zp(t, "draw loop");
    } finally {
      if (this.Qo = !1, this.G.Go(!1), this.Tp && !this.Ta) this.sm();
      else if (this.kp) {
        const { width: t, height: e } = this.kp;
        this.kp = null, this.Xp(t, e);
      }
    }
  }
  resizeCanvas(t, e) {
    this.Qo ? this.kp = { width: t, height: e } : this.Xp(t, e);
  }
  destroy() {
    this.Ta || this.Tp || (this.Tp = !0, this.mp.Pu(), this.Qo || this.sm());
  }
  async sm() {
    var t, e, s, i;
    this.p.k(), await this.te.Gd(), window.removeEventListener("resize", this.Bp), window.removeEventListener("blur", this.Ip), (t = this.jp) == null || t.disconnect(), this.gf.vl(), this.gp.vl(), this.vp.vl(), this.yp.vl(), (e = this.Mp) == null || e.k(), (s = this.qa) == null || s.k();
    for (const n of this.bp) n.dispose();
    this.bp.clear(), this.N_.dispose(), this.K_.dispose(), this.G.k(), (i = this.zp) == null || i.dispose(), this.Ta = !0;
  }
  filter(t, e) {
    this.Mp.O_(t, e);
  }
  draw(t) {
    this.Mp.base.draw(t);
  }
  postDraw(t) {
    this.Mp.base.postDraw(t);
  }
  finalDraw(t) {
    this.Mp.R_(t);
  }
  async loadFont(t, e = !0) {
    if (e) return await this.Mp.base.loadFont(t), this.Mp.base.font;
    if (t instanceof I) return t.Tt || await t.Dt(), t;
    const s = new I(this.G);
    return await s.Dt(t), this.Np(s), s;
  }
  async loadTileset(t, e = !0) {
    if (e) return await this.Mp.base.loadTileset(t), this.Mp.base.font;
    if (t instanceof X) return t.Tt || await t.Dt(), t;
    const s = new X(this.G, t.fontSize, t);
    return await s.Dt(), this.Np(s), s;
  }
  fontSize(t) {
    return this.Mp.base.fontSize(t);
  }
  useTileColors(t) {
    return this.Mp.base.useTileColors(t);
  }
  inputGrid(t) {
    return t === void 0 ? this.Qp ?? "topmost" : t === "topmost" ? (this.Qp = void 0, this.gf.yl(), void this.gp.yl()) : (this.Qp = t, this.gf.yl(), void this.gp.yl());
  }
  Hp() {
    return this.Qp ? this.Qp : this.Mp.ep();
  }
  Zp(t, e) {
    console.error(`Error during ${e}:`, t), this.loading.Wd(), this.errors.Me(t), this.Yp();
  }
  async setup(t) {
    this.Op = t;
  }
  windowResized(t) {
    this.Rp = t;
  }
  get grid() {
    var t;
    return ((t = this.re) == null ? void 0 : t.grid) ?? this.Mp.base.grid;
  }
  get font() {
    var t;
    return ((t = this.re) == null ? void 0 : t.font) ?? this.Mp.base.font;
  }
  get width() {
    return this.p.width;
  }
  get height() {
    return this.p.height;
  }
  pixelDensity(t) {
    if (t === void 0) return this.p.pixelDensity;
    if (t <= 0 || t === this.p.pixelDensity) return;
    const e = this.p.pixelDensity, s = this.p.width / e, i = this.p.height / e;
    this.p.Qa(t), this.resizeCanvas(s, i);
  }
  get canvas() {
    return this.p.canvas;
  }
  get isDisposed() {
    return this.Ta;
  }
  get overlay() {
    return this.zp;
  }
  get loading() {
    return this.Mp.loading;
  }
  get errors() {
    return this.Mp.errors;
  }
  get layers() {
    return this.Mp;
  }
  get filters() {
    return this.Mp.filters;
  }
  get conversions() {
    return this.qa;
  }
  get isRenderingFrame() {
    return this.Qo;
  }
}
class ve {
  constructor() {
  }
  static create(t = {}) {
    return new p(t);
  }
  static setErrorLevel(t) {
    dt.ki(t);
  }
  static get version() {
    return "0.16.0";
  }
}
const Ie = /* @__PURE__ */ new WeakMap();
function Qi(r, t, e) {
  var n;
  let s = Ie.get(r);
  s || (s = /* @__PURE__ */ new Map(), Ie.set(r, s)), (n = s.get(t)) == null || n();
  const i = r.wp.zu(t, e);
  s.set(t, i);
}
function Tt(r) {
  const t = p.prototype;
  for (const e of r) t[e] = function(s) {
    Qi(this, e, s);
  };
}
function Ht(r) {
  for (const { name: t, get: e } of r) Object.defineProperty(p.prototype, t, { get: e, configurable: !0, enumerable: !0 });
}
function ps(r, t) {
  const e = p.prototype;
  e[r] = e[t];
}
function gs(r, t) {
  return function(e, s, i, n) {
    if (e === void 0) return P.Za(...r.call(this));
    const h = this.Gp(e, s, i, n);
    t.call(this, h);
  };
}
const qi = Object.freeze(Object.defineProperty({ __proto__: null, MOUSE_EVENT_NAMES: de }, Symbol.toStringTag, { value: "Module" }));
Tt(de), p.prototype.cursor = function(r) {
  this.gf.nl(r);
}, p.prototype.requestPointerLock = function() {
  return this.gf.hl();
}, p.prototype.exitPointerLock = function() {
  this.gf.ol();
}, Ht([{ name: "mouse", get: function() {
  return this.gf.wl();
} }, { name: "mouseIsPressed", get: function() {
  return this.gf.Cl();
} }, { name: "pmouse", get: function() {
  return this.gf.Ml();
} }, { name: "movedX", get: function() {
  return this.gf.bl();
} }, { name: "movedY", get: function() {
  return this.gf.Al();
} }]), p.prototype.frameRate = function(r) {
  return r === void 0 ? this.mp.vu : this.mp.Tu(r, () => this.qs());
}, p.prototype.targetFrameRate = function(r) {
  if (r === void 0) return this.mp.fu;
  this.mp.Lu(r);
}, p.prototype.noLoop = function() {
  this.mp.Pu();
}, p.prototype.loop = function() {
  this.mp.Eu(() => this.qs());
}, p.prototype.redraw = function(r = 1) {
  dt.Ti(typeof r == "number" && r > 0 && Number.isInteger(r), "Redraw count must be a positive integer.", { method: "redraw", providedValue: r }) && this.$p(r);
}, p.prototype.isLooping = function() {
  return this.mp.gu;
}, p.prototype.deltaTime = function() {
  return this.mp.bu;
}, Object.defineProperty(p.prototype, "frameCount", { get: function() {
  return this.mp.Au;
}, set: function(r) {
  this.mp.Au = r;
}, configurable: !0, enumerable: !0 }), Object.defineProperty(p.prototype, "millis", { get: function() {
  return this.mp.Ou;
}, set: function(r) {
  this.mp.Ou = r;
}, configurable: !0, enumerable: !0 }), Object.defineProperty(p.prototype, "secs", { get: function() {
  return this.mp.Ru;
}, set: function(r) {
  this.mp.Ru = r;
}, configurable: !0, enumerable: !0 });
const Ki = Object.freeze(Object.defineProperty({ __proto__: null, GESTURE_EVENT_NAMES: ge, TOUCH_EVENT_NAMES: pe }, Symbol.toStringTag, { value: "Module" }));
Tt(pe), Tt(ge), Ht([{ name: "touches", get: function() {
  return this.gp.Ef();
} }]);
const Zi = Object.freeze(Object.defineProperty({ __proto__: null, KEYBOARD_EVENT_NAMES: fe }, Symbol.toStringTag, { value: "Module" }));
Tt(fe), p.prototype.isKeyPressed = function(r) {
  return this.vp.Bl(r);
}, Ht([{ name: "lastKeyPressed", get: function() {
  return this.vp.jl();
} }, { name: "lastKeyReleased", get: function() {
  return this.vp.zl();
} }, { name: "pressedKeys", get: function() {
  return this.vp.Ql();
} }, { name: "modifierState", get: function() {
  return this.vp.Hl();
} }]);
const $i = Object.freeze(Object.defineProperty({ __proto__: null, GAMEPAD_EVENT_NAMES: me }, Symbol.toStringTag, { value: "Module" }));
Tt(me), p.prototype.gamepad = function(r) {
  return this.yp.Gf(r);
}, Ht([{ name: "gamepads", get: function() {
  return this.yp.Nf();
} }]), p.prototype.perspective = function(r, t, e) {
  this.layers.base.perspective(r, t, e);
}, p.prototype.createCamera = function() {
  return this.layers.base.createCamera();
}, p.prototype.setCamera = function(r) {
  this.layers.base.setCamera(r);
}, p.prototype.resetCamera = function() {
  this.layers.base.resetCamera();
}, p.prototype.camera = function(r, t, e, s = 0, i = 0, n = 0, h = 0, o = 1, c = 0) {
  this.layers.base.camera(r, t, e, s, i, n, h, o, c);
}, p.prototype.lookAt = function(r, t, e, s, i, n) {
  this.layers.base.lookAt(r, t, e, s, i, n);
}, p.prototype.ortho = function(r, t) {
  this.layers.base.ortho(r, t);
}, p.prototype.rect = function(r = 1, t = 1) {
  this.G.ea(r, t);
}, p.prototype.point = function() {
  this.G.ea(1, 1);
}, p.prototype.line = function(r, t, e, s) {
  this.G.ra(r, t, e, s);
}, p.prototype.lineWeight = function(r) {
  if (r === void 0) return this.G.state.gn.Jr;
  this.G.state.gn.Mn(r);
}, p.prototype.ellipse = function(r = 1, t = 1) {
  this.G.na(r / 2, t / 2);
}, p.prototype.triangle = function(r, t, e, s, i, n) {
  this.G.ha(r, t, e, s, i, n);
}, p.prototype.arc = function(r, t, e, s) {
  this.G.aa(r / 2, t / 2, e, s);
}, p.prototype.bezierCurve = function(r, t, e, s, i, n, h, o) {
  this.G.oa(r, t, e, s, i, n, h, o);
}, p.prototype.box = function(r = 50, t, e) {
  const s = t ?? r, i = e ?? s;
  this.G.ca(r, s, i);
}, p.prototype.sphere = function(r = 50) {
  this.G.ua(r);
}, p.prototype.torus = function(r = 50, t = 10) {
  this.G.la(r, t);
}, p.prototype.cone = function(r = 50, t) {
  this.G.fa(r, t ?? r);
}, p.prototype.cylinder = function(r = 50, t) {
  this.G.da(r, t ?? r);
}, p.prototype.ellipsoid = function(r = 50, t, e) {
  this.G._a(r, t ?? r, e ?? r);
};
const Ne = new Float32Array(16);
p.prototype.rotate = function(r = 0, t, e) {
  const s = this.G.state.Dn;
  if (typeof t == "number" || e !== void 0) return s.Sr(r), s.Pr(t ?? 0), void s.Er(e ?? 0);
  t === void 0 ? s.Er(r) : Array.isArray(t) ? s.Tr(r, t[0] ?? 0, t[1] ?? 0, t[2] ?? 0) : s.Tr(r, t.x ?? 0, t.y ?? 0, t.z ?? 0);
}, p.prototype.rotateX = function(r) {
  if (r === void 0) return gt(this.G.state.Dn.lr);
  this.G.state.Dn.Sr(r);
}, p.prototype.rotateY = function(r) {
  if (r === void 0) return gt(this.G.state.Dn.dr);
  this.G.state.Dn.Pr(r);
}, p.prototype.rotateZ = function(r) {
  if (r === void 0) return gt(this.G.state.Dn._r);
  this.G.state.Dn.Er(r);
}, p.prototype.translate = function(r = 0, t = 0, e = 0) {
  this.G.state.Dn.Ar(r, t, e);
}, p.prototype.translateX = function(r) {
  if (r === void 0) return this.G.state.Dn.ar;
  this.G.state.Dn.Ar(r, 0, 0);
}, p.prototype.translateY = function(r) {
  if (r === void 0) return this.G.state.Dn.cr;
  this.G.state.Dn.Ar(0, r, 0);
}, p.prototype.translateZ = function(r) {
  if (r === void 0) return this.G.state.Dn.ur;
  this.G.state.Dn.Ar(0, 0, r);
}, p.prototype.scale = function(r, t, e) {
  this.G.state.Dn.Fr(r, t, e);
}, p.prototype.resetMatrix = function() {
  this.G.state.Dn.kr();
}, p.prototype.applyMatrix = function(...r) {
  let t;
  if (r.length === 1 && typeof r[0] != "number") t = r[0];
  else {
    if (r.length !== 16) throw Error("applyMatrix() expects either a 16-length array-like or 16 numeric arguments.");
    t = r;
  }
  if (t.length !== 16) throw Error("applyMatrix() expects exactly 16 values.");
  for (let e = 0; e < 16; e++) Ne[e] = Number(t[e] ?? 0);
  this.G.state.Dn.Lr(Ne);
}, p.prototype.push = function() {
  this.G.state.je();
}, p.prototype.pop = function() {
  this.G.state.ze();
}, Object.defineProperty(p.prototype, "windowWidth", { get: function() {
  return window.innerWidth;
}, configurable: !0, enumerable: !0 }), Object.defineProperty(p.prototype, "windowHeight", { get: function() {
  return window.innerHeight;
}, configurable: !0, enumerable: !0 }), Object.defineProperty(p.prototype, "displayWidth", { get: function() {
  return screen.width;
}, configurable: !0, enumerable: !0 }), Object.defineProperty(p.prototype, "displayHeight", { get: function() {
  return screen.height;
}, configurable: !0, enumerable: !0 }), p.prototype.color = function(r, t, e, s) {
  return this.Gp(r, t, e, s);
}, p.prototype.colorMode = function(r, t, e, s, i) {
  const n = this.G.state.gn;
  if (r === void 0) return n.kn();
  const h = (function(o, c, l, u, f) {
    if (o !== "rgb" && o !== "hsb" && o !== "hsl") throw Error("colorMode() mode must be 'rgb', 'hsb', or 'hsl'.");
    let d = es(o);
    if (c !== void 0 && l === void 0 && u === void 0 && f === void 0) d = [c, c, c, c];
    else if (c !== void 0 || l !== void 0 || u !== void 0 || f !== void 0) {
      if (c === void 0 || l === void 0 || u === void 0) throw Error("colorMode() expects either one shared max or max1, max2, and max3.");
      d = [c, l, u, f ?? d[3]];
    }
    for (const m of d) if (!Number.isFinite(m) || m <= 0) throw Error("colorMode() max values must be finite numbers greater than 0.");
    return { mode: o, maxes: d };
  })(r, t, e, s, i);
  n.Ln(h.mode, h.maxes);
}, p.prototype.background = function(r, t, e, s = 255) {
  if (r === void 0) {
    const [n, h, o, c] = this.G.state.gn.dn;
    return P.Za(n, h, o, c);
  }
  const i = this.Gp(r, t, e, s);
  this.G.state.gn.Tn(i.r, i.g, i.b, i.a), this.G.pa(i.r, i.g, i.b, i.a);
}, p.prototype.clear = function() {
  this.G.Ch(0, 0, 0, 0);
};
const Ji = gs(function() {
  return this.G.state.gn.en;
}, function(r) {
  this.G.state.gn.Cn(r.r, r.g, r.b, r.a);
});
p.prototype.charColor = Ji, ps("stroke", "charColor");
const tr = gs(function() {
  return this.G.state.gn.rn;
}, function(r) {
  this.G.state.gn.xn(r.r, r.g, r.b, r.a);
});
function Oe(r) {
  if (typeof r != "object" || r === null) return !1;
  const t = r;
  return typeof t.x == "number" && typeof t.y == "number" && typeof t.z == "number";
}
p.prototype.cellColor = tr, ps("fill", "cellColor"), p.prototype.char = function(r) {
  if (r === void 0) return this.G.state.gn.sn;
  const t = typeof r == "number" ? this.font.characters[r].character : r;
  if (t.length === 0) throw Error("char() requires at least one character.");
  this.G.state.gn.bn(this.font.zt(t)), this.G.state.gn.An(t);
}, p.prototype.flipX = function(r) {
  if (r === void 0) return this.G.state.gn.an;
  this.G.state.gn.Fn(r);
}, p.prototype.flipY = function(r) {
  if (r === void 0) return this.G.state.gn.cn;
  this.G.state.gn.Sn(r);
}, p.prototype.charRotation = function(r) {
  if (r === void 0) return 360 * this.G.state.gn.ln;
  this.G.state.gn.En(r);
}, p.prototype.invert = function(r) {
  if (r === void 0) return this.G.state.gn.un;
  this.G.state.gn.Pn(r);
}, p.prototype.ambientLight = function(r, t, e, s) {
  const i = P.Ga(r, t, e, s), [n, h, o] = i.normalized;
  this.G.state.se.Zr(n, h, o);
}, p.prototype.pointLight = function(r, t, e, s, i, n) {
  let h, o;
  if (typeof r == "number" && typeof t == "number" && typeof e == "number") if (h = P.Ga(r, t, e), Oe(s)) o = s;
  else {
    if (typeof s != "number" || typeof i != "number" || typeof n != "number") throw Error("pointLight() expected RGB + XYZ or RGB + { x, y, z }.");
    o = { x: s, y: i, z: n };
  }
  else if (h = P.Ga(r), Oe(t)) o = t;
  else {
    if (typeof t != "number" || typeof e != "number" || typeof s != "number") throw Error("pointLight() expected color + XYZ or color + { x, y, z }.");
    o = { x: t, y: e, z: s };
  }
  const [c, l, u] = h.normalized;
  this.G.state.se.Kr(c, l, u, o.x, o.y, o.z);
}, p.prototype.lightFalloff = function(r, t, e) {
  this.G.state.se.$r(r, t, e);
}, p.prototype.noLights = function() {
  this.G.state.se.qr();
}, p.prototype.shader = function(r) {
  this.G.Wo(r);
}, p.prototype.resetShader = function() {
  this.G.Yo();
}, p.prototype.setUniform = function(r, t) {
  this.G.nr(r, t);
}, p.prototype.setUniforms = function(r) {
  this.G.oe(r);
}, p.prototype.createMaterialShader = async function(r) {
  const t = await Bt(r), e = this.G.$o(t);
  return this.Np(e), e;
}, p.prototype.createFilterShader = async function(r) {
  return this.createMaterialShader(r);
}, p.prototype.createShader = async function(r, t) {
  const e = await Bt(r), s = await Bt(t), i = this.G.sr(e, s);
  return this.Np(i), i;
};
class Rt extends St {
  constructor(e, s, i, n, h, o, c, l, u, f) {
    super(e, s, i, n, h, o, c, l, f);
    a(this, "Yt");
    this.Yt = u;
  }
  static rm(e, s, i, n, h, o) {
    const c = e.context, { texture: l, width: u, height: f } = ue(c, i);
    return new Rt(c, e, l, s, u, f, n, h, i, o);
  }
  $() {
    this.Yt instanceof HTMLVideoElement ? this.Yt.readyState >= this.Yt.HAVE_CURRENT_DATA && Xt(this.xe, this.$a, this.Yt) : Xt(this.xe, this.$a, this.Yt);
  }
  Ne() {
    return this.Ee = null, super.Ne();
  }
  Zc() {
    this.$();
  }
  get source() {
    return this.Yt;
  }
}
class it extends Rt {
  constructor(t, e, s, i, n, h, o, c, l, u) {
    super(t, e, s, i, h, o, c, l, n, u);
  }
  dispose() {
    super.dispose(), this.nm.pause(), this.nm.src = "", this.nm.load();
  }
  static async hm(t) {
    const e = document.createElement("video");
    return e.crossOrigin = "anonymous", e.loop = !0, e.muted = !0, e.playsInline = !0, await new Promise((s, i) => {
      e.addEventListener("loadedmetadata", () => s(), { once: !0 }), e.addEventListener("error", (n) => {
        var o;
        const h = n.target;
        i(Error("Failed to load video: " + (((o = h.error) == null ? void 0 : o.message) || "Unknown error")));
      }, { once: !0 }), e.src = t;
    }), e;
  }
  static rm(t, e, s, i, n, h) {
    const o = t.context, { texture: c, width: l, height: u } = ue(o, s, o.LINEAR, o.LINEAR, o.CLAMP_TO_EDGE, o.CLAMP_TO_EDGE);
    return new it(o, t, c, e, s, l, u, i, n, h);
  }
  static async uu(t, e, s, i, n, h) {
    const o = await it.hm(s);
    return it.rm(t, e, o, i, n, h);
  }
  async play() {
    await this.nm.play();
  }
  pause() {
    this.nm.pause();
  }
  stop() {
    this.nm.pause(), this.nm.currentTime = 0;
  }
  speed(t) {
    return this.nm.playbackRate = t, this;
  }
  loop(t = !0) {
    return this.nm.loop = t, this;
  }
  time(t) {
    return this.nm.currentTime = t, this;
  }
  volume(t) {
    return this.nm.volume = O(t, 0, 1), this;
  }
  get videoElement() {
    return this.nm;
  }
  get currentTime() {
    return this.nm.currentTime;
  }
  get duration() {
    return this.nm.duration;
  }
  get isPlaying() {
    return !this.nm.paused && !this.nm.ended;
  }
  get nm() {
    return this.Yt;
  }
}
p.prototype.createFramebuffer = function(r) {
  const t = this.G.K(r.width ?? this.grid.cols, r.height ?? this.grid.rows, r.attachments ?? 3);
  return this.Np(t), t;
}, p.prototype.image = function(r, t, e) {
  this.G.Jo(r, t, e, this.font), r instanceof vt && this.G.Qe();
}, p.prototype.loadImage = async function(r) {
  const t = r, e = new Promise((h, o) => {
    const c = new Image();
    c.crossOrigin = "anonymous", c.onload = () => h(c), c.onerror = (l) => o(l), c.src = t;
  }), [s] = await Promise.all([e, this.Sp]), i = this.grid;
  if (!i) throw Error("[textmode.js] Cannot load image before grid initialization completes.");
  const n = Pt.uu(this.G, this.qa, s, i.cols, i.rows, this.Gp);
  return this.Np(n), n;
}, p.prototype.loadVideo = async function(r) {
  const [t] = await Promise.all([it.hm(r), this.Sp]), e = this.grid;
  if (!e) throw Error("[textmode.js] Cannot load video before grid initialization completes.");
  const s = it.rm(this.G, this.qa, t, e.cols, e.rows, this.Gp);
  return this.Np(s), s;
}, p.prototype.createTexture = function(r) {
  const t = this.grid, e = Rt.rm(this.G, this.qa, r, (t == null ? void 0 : t.cols) ?? 1, (t == null ? void 0 : t.rows) ?? 1, this.Gp);
  return this.Np(e), e;
}, p.prototype.on = function(r, t) {
  return this.wp.zu(r, t);
}, p.prototype.off = function(r, t) {
  this.wp.Qu(r, t);
}, p.prototype.once = function(r, t) {
  return this.wp.Hu(r, t);
}, p.prototype.random = function(r, t) {
  return Array.isArray(r) ? this.Ap.random(r) : typeof r != "number" ? this.Ap.random() : typeof t != "number" ? this.Ap.random(r) : this.Ap.random(r, t);
}, p.prototype.randomGaussian = function(r, t) {
  return this.Ap.randomGaussian(r, t);
}, p.prototype.randomSeed = function(r) {
  this.Cp = ye(r), this.Ap.randomSeed(r), this.xp.clear(), this.Fp.noiseSeed(ae(this.Cp, "noise"));
}, p.prototype.randomStream = function(r) {
  const t = r + "", e = this.xp.get(t);
  if (e) return e;
  const s = new jt(ae(this.Cp, t));
  return this.xp.set(t, s), s;
}, p.prototype.noise = function(r, t, e) {
  return this.Fp.noise(r, t, e);
}, p.prototype.noiseSeed = function(r) {
  this.Fp.noiseSeed(r);
}, p.prototype.noiseDetail = function(r, t) {
  this.Fp.noiseDetail(r, t);
};
class Wt {
  constructor(t = 0, e = 0, s = 0) {
    a(this, "x");
    a(this, "y");
    a(this, "z");
    this.x = t, this.y = e, this.z = s;
  }
  set(t, e, s) {
    return we(t) ? (this.x = t.x, this.y = t.y, this.z = t.z ?? 0, this) : xe(t) ? (this.x = t[0] ?? 0, this.y = t[1] ?? 0, this.z = t[2] ?? 0, this) : (this.x = t ?? 0, this.y = e ?? 0, this.z = s ?? 0, this);
  }
  copy() {
    return new Wt(this.x, this.y, this.z);
  }
  add(t, e, s) {
    const [i, n, h] = Xe(t, e, s);
    return this.x += i, this.y += n, this.z += h, this;
  }
  sub(t, e, s) {
    const [i, n, h] = Xe(t, e, s);
    return this.x -= i, this.y -= n, this.z -= h, this;
  }
  mult(t, e, s) {
    const [i, n, h] = Ye(t, e, s);
    return this.x *= i, this.y *= n, this.z *= h, this;
  }
  div(t, e, s) {
    const [i, n, h] = Ye(t, e, s);
    return this.x /= i, this.y /= n, this.z /= h, this;
  }
  mag() {
    return Math.hypot(this.x, this.y, this.z);
  }
  magSq() {
    return this.x * this.x + this.y * this.y + this.z * this.z;
  }
  normalize() {
    const t = this.mag();
    return t !== 0 && this.div(t), this;
  }
  limit(t) {
    return this.magSq() > t * t && this.setMag(t), this;
  }
  setMag(t) {
    return this.normalize().mult(t);
  }
  dist(t, e, s) {
    const [i, n, h] = kt(t, e, s);
    return Math.hypot(this.x - i, this.y - n, this.z - h);
  }
  dot(t, e, s) {
    const [i, n, h] = kt(t, e, s);
    return this.x * i + this.y * n + this.z * h;
  }
  cross(t, e, s) {
    const [i, n, h] = kt(t, e, s);
    return new Wt(this.y * h - this.z * n, this.z * i - this.x * h, this.x * n - this.y * i);
  }
  heading() {
    return gt(Math.atan2(this.y, this.x));
  }
}
function we(r) {
  return typeof r == "object" && r !== null && "x" in r && "y" in r && typeof r.x == "number" && typeof r.y == "number";
}
function xe(r) {
  return Array.isArray(r);
}
function kt(r, t, e) {
  return we(r) ? [r.x, r.y, r.z ?? 0] : xe(r) ? [r[0] ?? 0, r[1] ?? 0, r[2] ?? 0] : [r ?? 0, t ?? 0, e ?? 0];
}
function Xe(r, t, e) {
  return kt(r, t, e);
}
function Ye(r, t, e) {
  if (we(r)) return [r.x, r.y, r.z ?? 1];
  if (xe(r)) {
    if (r.length === 1) {
      const s = r[0] ?? 1;
      return [s, s, s];
    }
    return [r[0] ?? 1, r[1] ?? 1, r[2] ?? 1];
  }
  return r !== void 0 && t === void 0 && e === void 0 ? [r, r, r] : [r ?? 1, t ?? 1, e ?? 1];
}
p.prototype.sin = Math.sin, p.prototype.cos = Math.cos, p.prototype.tan = Math.tan, p.prototype.asin = Math.asin, p.prototype.acos = Math.acos, p.prototype.atan = Math.atan, p.prototype.atan2 = Math.atan2, p.prototype.floor = Math.floor, p.prototype.ceil = Math.ceil, p.prototype.round = function(r, t = 0) {
  if (t <= 0) return Math.round(r);
  const e = Math.pow(10, t);
  return Math.round(r * e) / e;
}, p.prototype.abs = Math.abs, p.prototype.min = function(...r) {
  const t = Array.isArray(r[0]) ? r[0] : r;
  return Math.min(...t);
}, p.prototype.max = function(...r) {
  const t = Array.isArray(r[0]) ? r[0] : r;
  return Math.max(...t);
}, p.prototype.sq = function(r) {
  return r * r;
}, p.prototype.sqrt = Math.sqrt, p.prototype.pow = Math.pow, p.prototype.fract = function(r) {
  return r - Math.floor(r);
}, p.prototype.exp = Math.exp, p.prototype.log = Math.log, p.prototype.lerp = function(r, t, e) {
  return r + (t - r) * e;
}, p.prototype.ease = function(r, t) {
  return Bs(r, t);
}, p.prototype.map = function(r, t, e, s, i) {
  return s + (i - s) * (r - t) / (e - t);
}, p.prototype.norm = function(r, t, e) {
  return this.map(r, t, e, 0, 1);
}, p.prototype.constrain = function(r, t, e) {
  return O(r, t, e);
}, p.prototype.clamp = function(r, t, e) {
  return O(r, t, e);
}, p.prototype.dist = function(r, t, e, s) {
  return yt(r, t, e, s);
}, p.prototype.degrees = function(r) {
  return gt(r);
}, p.prototype.radians = function(r) {
  return V(r);
}, p.prototype.createVector = function(r = 0, t = 0, e = 0) {
  return new Wt(r, t, e);
};
class be {
  constructor(t) {
    a(this, "om");
    a(this, "characters");
    a(this, "length");
    const e = Nt(t);
    if (e.length < 2) throw Error("TextmodeGlyphRamp requires at least two characters.");
    this.characters = t, this.length = e.length, this.om = e;
  }
  at(t, e, s) {
    if (e !== void 0 || s !== void 0) {
      if (e === void 0 || s === void 0) throw Error("TextmodeGlyphRamp.at() range mapping requires both min and max.");
      if (e === s) throw Error("TextmodeGlyphRamp.at() requires min and max to be different.");
      return this.at((t - e) / (s - e));
    }
    const i = (function(h) {
      return Number.isNaN(h) ? 0 : h === 1 / 0 ? 1 : h === -1 / 0 ? 0 : Math.min(Math.max(h, 0), 1);
    })(t), n = Math.min(Math.floor(i * this.length), this.length - 1);
    return this.om[n];
  }
  shift(t) {
    const e = (Math.trunc(t) % this.length + this.length) % this.length, s = [...this.om.slice(e), ...this.om.slice(0, e)].join("");
    return new be(s);
  }
}
p.prototype.createGlyphRamp = function(r) {
  return new be(r);
};
const er = { red: "#ff0000", green: "#00ff00", blue: "#0000ff", yellow: "#ffff00", cyan: "#00ffff", magenta: "#ff00ff", white: "#ffffff", black: "#000000", gray: "#808080", grey: "#808080", orange: "#ffa500", purple: "#800080", pink: "#ffc0cb", brown: "#a52a2a" }, ft = N.FLOATS_PER_INSTANCE, sr = rs[_.RECTANGLE];
function ir(r) {
  if (r.startsWith("fg=")) return { kind: "fg", value: r.substring(3).trim() };
  if (r === "/fg") return { kind: "/fg" };
  if (r.startsWith("bg=")) return { kind: "bg", value: r.substring(3).trim() };
  if (r === "/bg") return { kind: "/bg" };
  if (r.startsWith("rot=")) {
    const t = r.substring(4).trim(), e = t.length > 0 ? Number(t) : NaN;
    return { kind: "rot", value: Number.isFinite(e) ? e : void 0 };
  }
  return r === "/rot" ? { kind: "/rot" } : r === "inv" ? { kind: "inv" } : r === "/inv" ? { kind: "/inv" } : r === "fx" ? { kind: "fx" } : r === "/fx" ? { kind: "/fx" } : r === "fy" ? { kind: "fy" } : r === "/fy" ? { kind: "/fy" } : void 0;
}
function rr(r, t, e, s, i) {
  let n = new Float32Array(Math.max(16, Math.min(r.length, 256)) * ft);
  const h = [], o = [], c = (function(v) {
    const g = v.G.state.gn;
    return { fg: [ze(g.en)], bg: [ze(g.rn)], invert: [g.un], flipX: [g.an], flipY: [g.cn], charRotation: [g.ln] };
  })(this), l = this.font;
  let u = 0, f = 0, d = 0, m = 0, y = 0;
  const w = (v) => {
    ((E) => {
      if (E * ft <= n.length) return;
      let S = n.length / ft;
      for (; S < E; ) S *= 2;
      const C = new Float32Array(S * ft);
      C.set(n), n = C;
    })(u + 1);
    const g = u * ft, x = l.zt(v), b = c.fg[c.fg.length - 1], A = c.bg[c.bg.length - 1];
    n[g + 0] = d * (1 + i), n[g + 1] = f * e, n[g + 2] = 1, n[g + 3] = 1, n[g + 4] = x[0], n[g + 5] = x[1], n[g + 6] = x[2], n[g + 7] = b[0], n[g + 8] = b[1], n[g + 9] = b[2], n[g + 10] = b[3], n[g + 11] = A[0], n[g + 12] = A[1], n[g + 13] = A[2], n[g + 14] = A[3], n[g + 15] = c.invert[c.invert.length - 1] ? 1 : 0, n[g + 16] = c.flipX[c.flipX.length - 1] ? 1 : 0, n[g + 17] = c.flipY[c.flipY.length - 1] ? 1 : 0, n[g + 18] = c.charRotation[c.charRotation.length - 1], n[g + 19] = 0, n[g + 20] = 0, n[g + 21] = 0, n[g + 22] = 0, n[g + 23] = 0, n[g + 24] = 0, n[g + 25] = 0, n[g + 26] = 0, n[g + 27] = 0, n[g + 28] = 0, n[g + 29] = 0, n[g + 30] = 0, n[g + 31] = 0, n[g + 32] = 0, n[g + 33] = 0, n[g + 34] = 0, n[g + 35] = sr, h[u] = f, u++;
  };
  for (; y < r.length; ) {
    const v = r[y];
    if (v !== `
`) if (t && v === "[" && r[y + 1] === "[") w("["), m++, d++, y += 2;
    else if (t && v === "]" && r[y + 1] === "]") w("]"), m++, d++, y += 2;
    else {
      if (t && v === "[") {
        const g = r.indexOf("]", y);
        if (g !== -1) {
          const x = ir(r.substring(y + 1, g));
          if (x) {
            nr(x, c), y = g + 1;
            continue;
          }
        }
      }
      v !== "	" ? (w(v), m++, d++, y++) : (m++, d += s, y++);
    }
    else o.push(m), m = 0, f++, d = 0, y++;
  }
  return o.push(m), { data: n, glyphLines: h, glyphCount: u, lineWidths: o };
}
function nr(r, t) {
  r.kind === "fg" ? We(t.fg, r.value) : r.kind === "/fg" ? lt(t.fg) : r.kind === "bg" ? We(t.bg, r.value) : r.kind === "/bg" ? lt(t.bg) : r.kind === "inv" ? t.invert.push(!0) : r.kind === "/inv" ? lt(t.invert) : r.kind === "fx" ? t.flipX.push(!0) : r.kind === "/fx" ? lt(t.flipX) : r.kind === "fy" ? t.flipY.push(!0) : r.kind === "/fy" ? lt(t.flipY) : r.kind === "rot" ? t.charRotation.push(r.value === void 0 ? t.charRotation[t.charRotation.length - 1] : Ot(r.value)) : r.kind === "/rot" && lt(t.charRotation);
}
function We(r, t) {
  const e = er[t.toLowerCase()] || t;
  try {
    r.push([(s = P.Ga(e)).r / 255, s.g / 255, s.b / 255, s.a / 255]);
  } catch {
    r.push(r[r.length - 1]);
  }
  var s;
}
function ze(r) {
  return [r[0], r[1], r[2], r[3]];
}
function lt(r) {
  r.length > 1 && r.pop();
}
p.prototype.printAlign = function(r, t = "top") {
  this.am = r, this.um = t;
}, p.prototype.print = function(r, t, e, s) {
  const i = (s == null ? void 0 : s.leading) ?? 1, n = (s == null ? void 0 : s.tabSize) ?? 4, h = (s == null ? void 0 : s.letterSpacing) ?? 0, o = (s == null ? void 0 : s.markup) !== !1, c = this.am || "left", l = this.um || "top", u = rr.call(this, r, o, i, n, h);
  u.glyphCount !== 0 && ((function(f, d, m, y, w, v, g) {
    const { data: x, glyphLines: b, glyphCount: A, lineWidths: E } = d, S = E.length;
    let C = 0;
    v === "middle" ? C = -Math.floor((S - 1) * g / 2) : v === "bottom" && (C = -(S - 1) * g);
    const T = f.G.state.Dn, R = T.vr, F = T.pr, k = T.mr, W = T.lr, ht = T.dr, ot = T._r;
    for (let z = 0; z < A; z++) {
      const L = z * ft, $ = E[b[z]] ?? 0;
      let H = 0;
      w === "center" ? H = -Math.floor($ / 2) : w === "right" && (H = -$);
      const Q = m + H + x[L + 0], q = y + C + x[L + 1];
      x[L + 0] = 0, x[L + 1] = 0, x[L + 2] = F, x[L + 3] = k, x[L + 19] = R[0] * Q + R[4] * q + R[12], x[L + 20] = R[1] * Q + R[5] * q + R[13], x[L + 21] = R[2] * Q + R[6] * q + R[14], x[L + 22] = W, x[L + 23] = ht, x[L + 24] = ot;
    }
  })(this, u, t, e, c, l, i), this.G.Ao(u.data, u.glyphCount));
};
const gr = Object.freeze(Object.defineProperty({ __proto__: null, TextmodeImage: Pt, TextmodeSource: St, TextmodeTexture: Rt, TextmodeVideo: it }, Symbol.toStringTag, { value: "Module" })), mr = Object.freeze(Object.defineProperty({ __proto__: null, INPUT_EVENT_NAMES: Ti, gamepad: $i, keyboard: Zi, mouse: qi, touch: Ki }, Symbol.toStringTag, { value: "Module" })), yr = Object.freeze(Object.defineProperty({ __proto__: null }, Symbol.toStringTag, { value: "Module" })), vr = ve.create, wr = ve.setErrorLevel, xr = ve.version;
export {
  Ke as ErrorLayerController,
  Ti as INPUT_EVENT_NAMES,
  cs as LoadingLayerController,
  Ls as TEXTMODE_EASE_NAMES,
  bt as TEXTMODE_LAYER_BLEND_MODES,
  Z as TextmodeCamera,
  fs as TextmodeConversionManager,
  M as TextmodeError,
  Qe as TextmodeErrorLevel,
  us as TextmodeFilterManager,
  I as TextmodeFont,
  vt as TextmodeFramebuffer,
  be as TextmodeGlyphRamp,
  vs as TextmodeGrid,
  Pt as TextmodeImage,
  j as TextmodeLayer,
  ls as TextmodeLayerManager,
  jt as TextmodeRandom,
  Et as TextmodeShader,
  St as TextmodeSource,
  Rt as TextmodeTexture,
  X as TextmodeTileset,
  Wt as TextmodeVector,
  it as TextmodeVideo,
  p as Textmodifier,
  pr as color,
  fr as conversion,
  vr as create,
  ar as errors,
  ur as filters,
  or as fonts,
  mr as input,
  lr as layering,
  cr as loading,
  gr as media,
  yr as plugins,
  dr as random,
  wr as setErrorLevel,
  ve as textmode,
  xr as version
};
