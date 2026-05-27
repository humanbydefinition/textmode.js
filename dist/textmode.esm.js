var Ye = Object.defineProperty;
var Ke = (r, t, e) => t in r ? Ye(r, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : r[t] = e;
var o = (r, t, e) => Ke(r, typeof t != "symbol" ? t + "" : t, e);
class We {
  constructor(t, e, s) {
    o(this, "i");
    o(this, "h");
    o(this, "o");
    o(this, "u");
    o(this, "l");
    o(this, "_");
    o(this, "p");
    o(this, "m");
    o(this, "v");
    o(this, "A", !1);
    o(this, "M", /* @__PURE__ */ new Set());
    this.p = t, this.m = e, this.v = s, this.reset();
  }
  C() {
    if (this.o = this.i * this.m, this.u = this.h * this.v, this.l = Math.floor((this.p.width - this.o) / 2), this._ = Math.floor((this.p.height - this.u) / 2), this.M.size > 0) for (const t of this.M) t();
  }
  F(t) {
    this.M.add(t);
  }
  P(t) {
    this.M.delete(t);
  }
  reset() {
    this.A || (this.i = Math.max(1, Math.floor(this.p.width / this.m)), this.h = Math.max(1, Math.floor(this.p.height / this.v))), this.C();
  }
  S(t, e) {
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
    this.A = !0, this.i = Math.max(1, Math.floor(t)), typeof this.h != "number" && (this.h = Math.max(1, Math.floor(this.p.height / this.v))), this.C();
  }
  get rows() {
    return this.h;
  }
  set rows(t) {
    this.A = !0, this.h = Math.max(1, Math.floor(t)), typeof this.i != "number" && (this.i = Math.max(1, Math.floor(this.p.width / this.m))), this.C();
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
    this.A = !1;
  }
  U(t, e) {
    const s = this.p.getBoundingClientRect(), i = t - s.left, n = e - s.top, h = this.p.width / s.width, a = n * (this.p.height / s.height), c = i * h - this.l, l = a - this._, u = Math.floor(c / this.m), f = Math.floor(l / this.v);
    return u >= 0 && u < this.i && f >= 0 && f < this.h ? { x: u - Math.floor((this.i - 1) / 2), y: f - Math.floor(this.h / 2) } : { x: -1 / 0, y: -1 / 0 };
  }
  k() {
    this.M.clear();
  }
}
class dt {
  constructor() {
    o(this, "L", /* @__PURE__ */ new Set());
  }
  D(t) {
    this.L.add(t);
  }
  dispose() {
    for (const t of this.L) t();
    this.L.clear();
  }
}
class b extends Error {
  constructor(t, e, s) {
    super(b.R(t, e, s)), this.name = "TextmodeError";
  }
  static R(t, e, s = {}) {
    const { includeContext: i = !0, includeFooterArrows: n = !0 } = s;
    return `${t}${i && e && Object.keys(e).length > 0 ? `

📋 Context:` + Object.entries(e).map(([h, a]) => `
  - ${h}: ${b.O(a)}`).join("") : ""}${n ? `

${"↓".repeat(24)}
` : `

`}`;
  }
  static O(t) {
    if (t === null) return "null";
    if (t === void 0) return "undefined";
    if (typeof t == "string") return `"${t}"`;
    if (typeof t == "number" || typeof t == "boolean") return t + "";
    if (Array.isArray(t)) return t.length === 0 ? "[]" : t.length <= 5 ? `[${t.map((e) => b.O(e)).join(", ")}]` : `[${t.slice(0, 3).map((e) => b.O(e)).join(", ")}, ... +${t.length - 3} more]`;
    if (typeof t == "object") {
      const e = Object.keys(t);
      return e.length === 0 ? "{}" : e.length <= 3 ? `{ ${e.map((s) => `${s}: ${b.O(t[s])}`).join(", ")} }` : `{ ${e.slice(0, 2).map((s) => `${s}: ${b.O(t[s])}`).join(", ")}, ... +${e.length - 2} more }`;
    }
    return t + "";
  }
}
function ie(r, t, e) {
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
const ue = /* @__PURE__ */ new WeakMap();
function je(r) {
  return r.platformID === 0 || r.platformID === 3 && (r.encodingID === 1 || r.encodingID === 10);
}
function Ee(r) {
  const t = ue.get(r);
  if (t) return t;
  const e = (function(s) {
    const i = s.cmap;
    if (!(i != null && i.tables)) return { characterTables: [], lookupTables: [] };
    const n = i.tables.map((c, l) => (function(u, f, d) {
      if (!(function(m) {
        return m.format === 4 || m.format === 12;
      })(f)) return null;
      const p = (function(m, v, y) {
        const w = /* @__PURE__ */ new Map();
        for (const A of m.encodings ?? []) A.tableIndex === y && w.set(Kt(A), A);
        for (const A of v.encodings ?? []) A.tableIndex === y && w.set(Kt(A), A);
        for (const [A, _] of Object.entries(m.ids ?? {})) {
          if (_ !== y) continue;
          const x = Ge(A, v.format, y);
          x && w.set(Kt(x), x);
        }
        return [...w.values()];
      })(u, f, d);
      return { table: f, tableIndex: d, encodings: p, isUnicode: p.some(je) };
    })(i, c, l)).filter((c) => c !== null).filter((c) => (function(l) {
      return l.format === 4 ? (function(u) {
        if (!(u.startCount && u.endCount && u.idRangeOffset && u.idDelta)) return !1;
        for (let f = 0; f < u.startCount.length; f++) {
          const d = u.startCount[f], p = u.endCount[f];
          if (d !== 65535 || p !== 65535) {
            for (let m = d; m <= p; m++) if (ie(u, m, f) > 0) return !0;
          }
        }
        return !1;
      })(l) : (function(u) {
        if (!u.groups) return !1;
        for (let f = 0; f < u.groups.length; f += 3) {
          const d = u.groups[f], p = u.groups[f + 1], m = u.groups[f + 2];
          if (d <= p && m + (p - d) > 0) return !0;
        }
        return !1;
      })(l);
    })(c.table)), h = n.filter((c) => c.isUnicode), a = h.length > 0 ? h : n;
    return { characterTables: a, lookupTables: [...a].sort(He) };
  })(r);
  return ue.set(r, e), e;
}
function Ge(r, t, e) {
  const s = /^p(\d+)e(\d+)$/.exec(r);
  return s ? { platformID: Number(s[1]), encodingID: Number(s[2]), format: t, tableIndex: e } : null;
}
function Kt(r) {
  return `${r.platformID}:${r.encodingID}:${r.format}:${r.tableIndex}`;
}
function He(r, t) {
  const e = le(r) - le(t);
  return e !== 0 ? e : r.tableIndex - t.tableIndex;
}
function le(r) {
  const t = r.isUnicode ? 0 : 3;
  return r.table.format === 12 ? t : r.table.format === 4 ? t + 1 : t + 2;
}
class Qe {
  I(t) {
    const e = [];
    return (function(s) {
      return Ee(s).characterTables;
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
        ie(t, h, s) > 0 && this.N(e, h);
    }
    return e;
  }
  H(t) {
    const e = [];
    if (!t.groups) return e;
    for (let s = 0; s < t.groups.length; s += 3) {
      const i = t.groups[s], n = t.groups[s + 1], h = t.groups[s + 2];
      for (let a = i; a <= n; a++)
        h + (a - i) > 0 && this.N(e, a);
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
class Ce {
  constructor(t) {
    this.X = t, this.G = null, this.V = 0, this.h = 0, this.o = 0, this.u = 0, this.p = document.createElement("canvas"), this.Z = this.p.getContext("2d", { alpha: !0 });
  }
  W(t, e, s) {
    this.V = Math.ceil(Math.sqrt(t)), this.h = Math.ceil(t / this.V), this.o = e * this.V, this.u = s * this.h, this.p.width = this.o, this.p.height = this.u, this.p.style.width = this.o + "px", this.p.style.height = this.u + "px", this.Z.imageSmoothingEnabled = !1, this.p.style.imageRendering = "pixelated", this.Z.clearRect(0, 0, this.o, this.u);
  }
  Y() {
    this.G ? this.G.width === this.o && this.G.height === this.u || this.G.resize(this.o, this.u) : this.G = this.X.K(this.o, this.u, 1, { filter: "nearest", depth: !1 }), this.G.$(this.p);
  }
  k() {
    var t;
    (t = this.G) == null || t.dispose(), this.G = null;
  }
}
class $e {
  constructor(t) {
    this.q = new Ce(t);
  }
  J(t, e, s, i) {
    this.q.W(t.length, e.width, e.height);
    const n = this.q.Z;
    n.textBaseline = "top", n.textAlign = "left", n.fillStyle = "white", this.tt(t, e, this.q.V, s, i), this.q.Y();
  }
  tt(t, e, s, i, n) {
    const h = i / n.head.unitsPerEm, a = this.q.Z;
    for (let c = 0; c < t.length; c++) {
      const l = t[c], u = c % s, f = Math.floor(c / s), d = l.glyphData;
      if (!d) continue;
      const p = d.advanceWidth * h, m = u * e.width, v = f * e.height, y = m + 0.5 * e.width, w = v + 0.5 * e.height, A = Math.round(y - 0.5 * e.width), _ = Math.round(w - 0.5 * i), x = A + 0.5 * (e.width - p), T = _ + n.hhea.ascender * h;
      this.it(a, d, x, T, h);
    }
  }
  it(t, e, s, i, n) {
    if (!e || !e.xs || e.noc === 0) return;
    const { xs: h, ys: a, endPts: c, flags: l } = e;
    if (!(h && a && c && l)) return;
    t.beginPath();
    let u = 0;
    for (let f = 0; f < c.length; f++) {
      const d = c[f];
      if (!(d < u)) {
        if (d >= u) {
          const p = s + h[u] * n, m = i - a[u] * n;
          t.moveTo(p, m);
          let v = u + 1;
          for (; v <= d; )
            if (1 & l[v]) {
              const y = s + h[v] * n, w = i - a[v] * n;
              t.lineTo(y, w), v++;
            } else {
              const y = s + h[v] * n, w = i - a[v] * n;
              if (v + 1 > d) {
                const _ = s + h[u] * n, x = i - a[u] * n;
                if (1 & l[u]) t.quadraticCurveTo(y, w, _, x);
                else {
                  const T = (y + _) / 2, R = (w + x) / 2;
                  t.quadraticCurveTo(y, w, T, R);
                }
                break;
              }
              const A = v + 1;
              if (1 & l[A]) {
                const _ = s + h[A] * n, x = i - a[A] * n;
                t.quadraticCurveTo(y, w, _, x), v = A + 1;
              } else {
                const _ = (y + (s + h[A] * n)) / 2, x = (w + (i - a[A] * n)) / 2;
                t.quadraticCurveTo(y, w, _, x), v = A;
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
    return this.q.G;
  }
  get columns() {
    return this.q.V;
  }
  get rows() {
    return this.q.h;
  }
}
class Te {
  st(t, e) {
    let s = 0;
    for (const { table: i } of (function(n) {
      return Ee(n).lookupTables;
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
    return i === -1 || t < e.startCount[i] ? 0 : ie(e, t, i);
  }
  rt(t, e) {
    const s = e.groups.length / 3;
    for (let i = 0; i < s; i++) {
      const n = e.groups[3 * i], h = e.groups[3 * i + 1], a = e.groups[3 * i + 2];
      if (t >= n && t <= h) return a + (t - n);
    }
    return 0;
  }
}
class Je {
  constructor() {
    o(this, "ct");
    this.ct = new Te();
  }
  ut(t, e, s) {
    let i = 0;
    const n = this.ct.ot(s, e);
    let h = 0, a = !1;
    for (const c of t) {
      const l = c.glyphData;
      let u = 0;
      if (!l && (u = this.ct.nt(s, c.character), u === 0)) continue;
      const f = ((l == null ? void 0 : l.advanceWidth) ?? this.ct.ht(s, u)) * n.scale;
      if (i = Math.max(i, f), l) {
        const d = Math.max(0, l.yMax - l.yMin) * n.scale;
        h = Math.max(h, d), a = !0;
      }
    }
    return a || (h = n.lineHeight), { width: Math.ceil(i), height: Math.ceil(h) };
  }
}
const P = { readShort: (r, t) => (P.t.uint16[0] = r[t] << 8 | r[t + 1], P.t.int16[0]), readUshort: (r, t) => r[t] << 8 | r[t + 1], readUshorts(r, t, e) {
  const s = [];
  for (let i = 0; i < e; i++) s.push(P.readUshort(r, t + 2 * i));
  return s;
}, readUint(r, t) {
  const e = P.t.uint8;
  return e[3] = r[t], e[2] = r[t + 1], e[1] = r[t + 2], e[0] = r[t + 3], P.t.uint32[0];
}, readASCII(r, t, e) {
  let s = "";
  for (let i = 0; i < e; i++) s += String.fromCharCode(r[t + i]);
  return s;
}, t: (() => {
  const r = new ArrayBuffer(8);
  return { uint8: new Uint8Array(r), int16: new Int16Array(r), uint16: new Uint16Array(r), uint32: new Uint32Array(r) };
})() };
function Lt(r) {
  return r + 3 & -4;
}
function Ct(r, t, e) {
  r[t] = e >>> 8 & 255, r[t + 1] = 255 & e;
}
function K(r, t, e) {
  r[t] = e >>> 24 & 255, r[t + 1] = e >>> 16 & 255, r[t + 2] = e >>> 8 & 255, r[t + 3] = 255 & e;
}
function qe(r, t, e) {
  for (let s = 0; s < e.length; s++) r[t + s] = 255 & e.charCodeAt(s);
}
function Gt(r, t, e) {
  const s = t + e;
  let i = 0;
  const n = P.t;
  for (let h = t; h < s; h += 4) n.uint8[3] = r[h] || 0, n.uint8[2] = r[h + 1] || 0, n.uint8[1] = r[h + 2] || 0, n.uint8[0] = r[h + 3] || 0, i = i + (n.uint32[0] >>> 0) >>> 0;
  return i >>> 0;
}
const ts = { parseTab(r, t, e) {
  const s = { tables: [], ids: {}, encodings: [], off: t };
  r = new Uint8Array(r.buffer, t, e), t = 0;
  const i = P, n = i.readUshort;
  n(r, t);
  const h = n(r, t += 2);
  t += 2;
  const a = [];
  for (let c = 0; c < h; c++) {
    const l = n(r, t), u = n(r, t += 2);
    t += 2;
    const f = i.readUint(r, t);
    t += 4;
    const d = `p${l}e${u}`;
    let p = a.indexOf(f);
    if (p === -1) {
      let y;
      p = s.tables.length, a.push(f);
      const w = n(r, f);
      y = w === 4 ? this.parse4(r, f) : w === 12 ? this.parse12(r, f) : { format: w }, s.tables.push(y);
    }
    s.ids[d] = p;
    const m = s.tables[p], v = { platformID: l, encodingID: u, format: m.format, tableIndex: p };
    s.encodings.push(v), (m.encodings ?? (m.encodings = [])).push(v);
  }
  return s;
}, parse4(r, t) {
  const e = P, s = e.readUshort, i = e.readUshorts, n = t, h = s(r, t += 2);
  s(r, t += 2);
  const a = s(r, t += 2) >>> 1, c = { format: 4, encodings: [], searchRange: s(r, t += 2), entrySelector: 0, rangeShift: 0, endCount: [], startCount: [], idDelta: [], idRangeOffset: [], glyphIdArray: [] };
  t += 2, c.entrySelector = s(r, t), t += 2, c.rangeShift = s(r, t), t += 2, c.endCount = i(r, t, a), t += 2 * a, t += 2, c.startCount = i(r, t, a), t += 2 * a;
  for (let l = 0; l < a; l++) c.idDelta.push(e.readShort(r, t)), t += 2;
  return c.idRangeOffset = i(r, t, a), t += 2 * a, c.glyphIdArray = i(r, t, n + h - t >> 1), c;
}, parse12(r, t) {
  const e = P.readUint;
  e(r, t += 4), e(r, t += 4);
  const s = e(r, t += 4);
  t += 4;
  const i = new Uint32Array(3 * s);
  for (let n = 0; n < 3 * s; n += 3) i[n] = e(r, t + (n << 2)), i[n + 1] = e(r, t + (n << 2) + 4), i[n + 2] = e(r, t + (n << 2) + 8);
  return { format: 12, encodings: [], groups: i };
} }, es = { parseTab(r, t, e) {
  const s = P;
  t += 18;
  const i = s.readUshort(r, t);
  t += 2, t += 16;
  const n = s.readShort(r, t);
  t += 2;
  const h = s.readShort(r, t);
  t += 2;
  const a = s.readShort(r, t);
  t += 2;
  const c = s.readShort(r, t);
  return t += 2, t += 6, { unitsPerEm: i, xMin: n, yMin: h, xMax: a, yMax: c, indexToLocFormat: s.readShort(r, t) };
} }, ss = { parseTab(r, t, e) {
  const s = P;
  t += 4;
  const i = s.readShort, n = s.readUshort;
  return { ascender: i(r, t), descender: i(r, t + 2), lineGap: i(r, t + 4), advanceWidthMax: n(r, t + 6), minLeftSideBearing: i(r, t + 8), minRightSideBearing: i(r, t + 10), xMaxExtent: i(r, t + 12), caretSlopeRise: i(r, t + 14), caretSlopeRun: i(r, t + 16), caretOffset: i(r, t + 18), res0: i(r, t + 20), res1: i(r, t + 22), res2: i(r, t + 24), res3: i(r, t + 26), metricDataFormat: i(r, t + 28), numberOfHMetrics: n(r, t + 30) };
} }, is = { parseTab(r, t, e, s) {
  const i = P, n = [], h = [], a = s.maxp.numGlyphs, c = s.hhea.numberOfHMetrics;
  let l = 0, u = 0, f = 0;
  for (; f < c; ) l = i.readUshort(r, t + (f << 2)), u = i.readShort(r, t + (f << 2) + 2), n.push(l), h.push(u), f++;
  for (; f < a; ) n.push(l), h.push(u), f++;
  return { aWidth: n, lsBearing: h };
} }, fe = { cmap: ts, head: es, hhea: ss, maxp: { parseTab(r, t, e) {
  const s = P;
  return s.readUint(r, t), t += 4, { numGlyphs: s.readUshort(r, t) };
} }, hmtx: is, loca: { parseTab(r, t, e, s) {
  const i = P, n = [], h = s.head.indexToLocFormat, a = s.maxp.numGlyphs + 1;
  if (h === 0) for (let c = 0; c < a; c++) n.push(i.readUshort(r, t + (c << 1)) << 1);
  else if (h === 1) for (let c = 0; c < a; c++) n.push(i.readUint(r, t + (c << 2)));
  return n;
} }, glyf: { parseTab(r, t, e, s) {
  const i = [], n = s.maxp.numGlyphs;
  for (let h = 0; h < n; h++) i.push(null);
  return i;
}, lt(r, t) {
  const e = P, s = r.ft, i = r.loca;
  if (i[t] === i[t + 1]) return null;
  const n = ct.findTable(s, "glyf", r.dt);
  if (!n) return null;
  let h = n[0] + i[t];
  const a = {};
  if (a.noc = e.readShort(s, h), h += 2, a.xMin = e.readShort(s, h), h += 2, a.yMin = e.readShort(s, h), h += 2, a.xMax = e.readShort(s, h), h += 2, a.yMax = e.readShort(s, h), h += 2, a.xMin >= a.xMax || a.yMin >= a.yMax) return null;
  if (a.noc > 0) {
    a.endPts = [];
    for (let d = 0; d < a.noc; d++) a.endPts.push(e.readUshort(s, h)), h += 2;
    const c = e.readUshort(s, h);
    if (h += 2, s.length - h < c) return null;
    h += c;
    const l = a.endPts[a.noc - 1] + 1;
    a.flags = [];
    for (let d = 0; d < l; d++) {
      const p = s[h];
      if (h++, a.flags.push(p), 8 & p) {
        const m = s[h];
        h++;
        for (let v = 0; v < m; v++) a.flags.push(p), d++;
      }
    }
    a.xs = [];
    for (let d = 0; d < l; d++) {
      const p = a.flags[d], m = !!(16 & p);
      2 & p ? (a.xs.push(m ? s[h] : -s[h]), h++) : m ? a.xs.push(0) : (a.xs.push(e.readShort(s, h)), h += 2);
    }
    a.ys = [];
    for (let d = 0; d < l; d++) {
      const p = a.flags[d], m = !!(32 & p);
      4 & p ? (a.ys.push(m ? s[h] : -s[h]), h++) : m ? a.ys.push(0) : (a.ys.push(e.readShort(s, h)), h += 2);
    }
    let u = 0, f = 0;
    for (let d = 0; d < l; d++) u += a.xs[d], f += a.ys[d], a.xs[d] = u, a.ys[d] = f;
  } else a.parts = [], a.endPts = [], a.flags = [], a.xs = [], a.ys = [];
  return a;
} } }, ct = { parse(r) {
  const t = new Uint8Array(r), e = fe, s = {}, i = { ft: t, _t: 0, dt: 0 };
  for (const n in e) {
    const h = n, a = ct.findTable(t, h, 0);
    if (a) {
      const [c, l] = a;
      let u = s[c];
      u == null && (u = e[h].parseTab(t, c, l, i), s[c] = u), Object.assign(i, { [h]: u });
    }
  }
  return [i];
}, findTable(r, t, e) {
  const s = P, i = s.readUshort(r, e + 4);
  let n = e + 12;
  for (let h = 0; h < i; h++) {
    const a = s.readASCII(r, n, 4);
    s.readUint(r, n + 4);
    const c = s.readUint(r, n + 8), l = s.readUint(r, n + 12);
    if (a === t) return [c, l];
    n += 16;
  }
  return null;
}, T: fe, B: P };
let q;
function Ht(r) {
  if (r.length === 0) return [];
  const t = q !== void 0 ? q : typeof Intl < "u" && "Segmenter" in Intl ? (q = new Intl.Segmenter(void 0, { granularity: "grapheme" }), q) : (q = null, q);
  return t ? Array.from(t.segment(r), (e) => e.segment) : Array.from(r);
}
function Qt(r) {
  return Array.from(r, (t) => t.codePointAt(0)).filter((t) => t !== void 0);
}
class rs {
  constructor() {
    o(this, "gt");
    this.gt = new Te();
  }
  vt(t, e) {
    const s = [], i = /* @__PURE__ */ new Map();
    return t.forEach((n, h) => {
      const a = { character: n, unicode: Qt(n)[0] ?? 0, color: this.yt(h), glyphData: this.wt(e, n) };
      s.push(a), i.set(n, a);
    }), { array: s, map: i };
  }
  yt(t) {
    return [t % 256 / 255, Math.floor(t / 256) % 256 / 255, 0];
  }
  wt(t, e) {
    const s = e.codePointAt(0) || 0, i = this.gt.st(t, s);
    if (i === 0) return null;
    const n = this.gt.ht(t, i), h = ct.T.glyf.lt(t, i);
    return h ? { ...h, advanceWidth: n } : null;
  }
}
async function ns(r) {
  if (typeof DecompressionStream > "u") throw Error("[textmode.js] WOFF font loading requires DecompressionStream support.");
  const t = P, e = new Uint8Array(r);
  if (e.length < 44) throw Error("Invalid WOFF header.");
  if (t.readASCII(e, 0, 4) !== "wOFF") throw Error("Invalid WOFF signature.");
  const s = t.readUint(e, 4), i = t.readUshort(e, 12), n = t.readUint(e, 16);
  if (44 + 20 * i > e.length) throw Error("Invalid WOFF table directory.");
  const h = [];
  let a = 44;
  for (let l = 0; l < i; l++) {
    const u = t.readASCII(e, a, 4), f = t.readUint(e, a + 4), d = t.readUint(e, a + 8), p = t.readUint(e, a + 12);
    if (t.readUint(e, a + 16), f + d > e.length) throw Error(`Invalid WOFF table bounds for ${u}.`);
    if (d > p) throw Error(`Invalid WOFF table length for ${u}.`);
    h.push({ tag: u, offset: f, compLength: d, origLength: p }), a += 20;
  }
  const c = await Promise.all(h.map((l) => (async function(u, f) {
    const d = new Uint8Array(u.buffer, f.offset, f.compLength);
    let p;
    return f.compLength === f.origLength ? p = new Uint8Array(d) : (p = await (async function(m) {
      const v = new ReadableStream({ start(w) {
        w.enqueue(m), w.close();
      } }).pipeThrough(new DecompressionStream("deflate")), y = await new Response(v).arrayBuffer();
      return new Uint8Array(y);
    })(d), p = (function(m, v) {
      if (m.length === v) return m;
      if (m.length < v) {
        const y = new Uint8Array(v);
        return y.set(m), y;
      }
      return m.subarray(0, v);
    })(p, f.origLength)), { ...f, data: p };
  })(e, l)));
  return (function(l, u, f) {
    const d = f.length;
    let p = 1, m = 0;
    for (; p << 1 <= d; ) p <<= 1, m++;
    const v = 16 * p, y = 16 * d - v;
    let w = 12 + 16 * d;
    const A = {};
    for (const C of f) A[C.tag] = w, w = Lt(w + C.data.length);
    const _ = Math.max(u || 0, w), x = new Uint8Array(_);
    K(x, 0, l), Ct(x, 4, d), Ct(x, 6, v), Ct(x, 8, m), Ct(x, 10, y);
    let T = 12;
    for (const C of f) qe(x, T, C.tag), T += 4, K(x, T, hs(C)), T += 4, K(x, T, A[C.tag]), T += 4, K(x, T, C.data.length), T += 4;
    for (const C of f) x.set(C.data, A[C.tag]);
    const R = A.head;
    if (R !== void 0) {
      const C = (function(M, B) {
        const F = B + 8, O = [M[F], M[F + 1], M[F + 2], M[F + 3]];
        K(M, F, 0);
        const Z = 2981146554 - (Gt(M, 0, Lt(M.length)) >>> 0) >>> 0;
        return M[F] = O[0], M[F + 1] = O[1], M[F + 2] = O[2], M[F + 3] = O[3], Z >>> 0;
      })(x, R);
      K(x, R + 8, C);
    }
    return x.buffer;
  })(s, n, c);
}
function hs(r) {
  if (r.tag !== "head" || r.data.length < 12) return Gt(r.data, 0, Lt(r.data.length));
  const t = new Uint8Array(r.data);
  return K(t, 8, 0), Gt(t, 0, Lt(t.length));
}
class D extends dt {
  constructor(e, s = 16) {
    super();
    o(this, "X");
    o(this, "At");
    o(this, "bt", []);
    o(this, "Mt", /* @__PURE__ */ new Map());
    o(this, "Ct", 16);
    o(this, "xt", { width: 0, height: 0 });
    o(this, "Ft");
    o(this, "Pt");
    o(this, "St");
    o(this, "Tt");
    o(this, "Et", !1);
    this.X = e, this.Ct = s, this.Ft = new Qe(), this.Pt = new $e(e), this.St = new Je(), this.Tt = new rs();
  }
  kt(e = {}) {
    if (!this.Et) throw new b("Cannot fork an uninitialized TextmodeFont.");
    const s = e.fontSize ?? this.Ct, i = new D(this.X, s);
    return i.At = this.At, i.bt = this.bt, i.Mt = new Map(this.Mt), i.Et = !0, i.Lt(), i;
  }
  async Dt(e) {
    if (this.Et) return;
    if (!e) throw new b("TextmodeFont requires an explicit font source.");
    const s = await this.Rt(e);
    await this.Ot(s);
  }
  Bt(e) {
    if (e === void 0) return this.Ct;
    this.Ct = e, this.Lt();
  }
  Lt() {
    this.xt = this.St.ut(this.bt, this.Ct, this.At), this.Pt.J(this.bt, this.xt, this.Ct, this.At);
  }
  async It(e) {
    try {
      const s = await this.Rt(e);
      await this.Ot(s);
    } catch (s) {
      throw new b("Failed to load font: " + (s instanceof Error ? s.message : "Unknown error"), { originalError: s });
    }
  }
  async Rt(e) {
    const s = await fetch(e);
    if (!s.ok) throw new b(`Failed to load font file: ${s.status} ${s.statusText}`);
    return s.arrayBuffer();
  }
  async Ot(e) {
    const s = await (async function(i) {
      const n = P.readASCII(new Uint8Array(i), 0, 4);
      if (n === "wOFF") {
        const h = await ns(i);
        return ct.parse(h);
      }
      if (n === "wOF2") throw Error("[textmode.js] WOFF2 fonts are not supported. Use .woff, .ttf, or .otf.");
      return ct.parse(i);
    })(e);
    if (!s || s.length === 0) throw Error("Failed to parse font file");
    this.At = s[0], await this.jt();
  }
  async jt() {
    const e = this.Ft.I(this.At);
    if (e.length === 0) throw new b("[textmode.js] Font has no supported cmap glyphs.");
    const { array: s, map: i } = this.Tt.vt(e, this.At);
    this.bt = s, this.Mt = i, this.Lt(), this.Et = !0;
  }
  zt(e) {
    const s = this.Mt.get(e);
    return s ? s.color : [1, 1, 0];
  }
  Ht(e) {
    return Ht(e).map((s) => {
      const i = this.Mt.get(s);
      return i ? i.color : [1, 1, 0];
    });
  }
  dispose() {
    this.Pt.k(), super.dispose();
  }
  get framebuffer() {
    return this.Pt.framebuffer;
  }
  get characterMap() {
    return this.Mt;
  }
  get characters() {
    return this.bt;
  }
  get textureColumns() {
    return this.Pt.columns;
  }
  get textureRows() {
    return this.Pt.rows;
  }
  get columns() {
    return this.Pt.columns;
  }
  get rows() {
    return this.Pt.rows;
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
    return this.At;
  }
}
class os {
  constructor(t) {
    this.q = new Ce(t);
  }
  J(t, e, s, i) {
    this.q.W(t.length, e.width, e.height), this.Qt(t, e, s, i), this.q.Y();
  }
  k() {
    this.q.k();
  }
  Qt(t, e, s, i) {
    const n = this.q.Z, h = this.q.V;
    for (let a = 0; a < t.length; a++) {
      const c = a % h, l = Math.floor(a / h), u = a % i.columns, f = Math.floor(a / i.columns), d = i.marginX + u * (i.cellWidth + i.spacingX), p = i.marginY + f * (i.cellHeight + i.spacingY), m = c * e.width, v = l * e.height;
      n.drawImage(s, d, p, i.cellWidth, i.cellHeight, m, v, e.width, e.height);
    }
  }
  get framebuffer() {
    return this.q.G;
  }
  get columns() {
    return this.q.V;
  }
  get rows() {
    return this.q.h;
  }
}
const U = class U extends dt {
  constructor(e, s, i) {
    super();
    o(this, "X");
    o(this, "Pt", null);
    o(this, "bt", []);
    o(this, "Mt", /* @__PURE__ */ new Map());
    o(this, "Vt", { width: 0, height: 0 });
    o(this, "Zt", { width: 0, height: 0 });
    o(this, "Ct", 0);
    o(this, "Wt");
    o(this, "Yt");
    o(this, "Kt");
    o(this, "$t");
    o(this, "Et", !1);
    this.X = e, this.Ct = s === void 0 ? 0 : Math.abs(s), this.Kt = i;
  }
  kt(e = {}) {
    if (!this.Et || !this.Yt || !this.$t) throw new b("Cannot fork an uninitialized TextmodeTileset.");
    const s = new U(this.X, e.fontSize ?? this.Ct);
    return s.bt = this.$t.characters, s.Mt = new Map(this.$t.characterMap), s.Vt = { ...this.$t.nativeCellDimensions }, s.Wt = this.Wt, s.Yt = { ...this.Yt }, s.Kt = this.Kt, s.Et = !0, s.qt(this.$t), s.Jt(), s;
  }
  async Dt(e) {
    if (this.Et) return;
    if (this.Kt = e ?? this.Kt, !this.Kt) throw new b("Cannot initialize a TextmodeTileset without source options.");
    const s = this.ti(this.Kt), i = this.ii(s);
    if (i) return this.qt(i), this.bt = i.characters, this.Mt = new Map(i.characterMap), this.Vt = { ...i.nativeCellDimensions }, this.Yt = { ...i.layout }, this.Ct === 0 && (this.Ct = Math.abs(this.Kt.fontSize ?? i.nativeCellDimensions.height)), this.Jt(), void (this.Et = !0);
    const n = await this.si(this.Kt.source), h = this.ei(n), a = this.ri(this.Kt, h.width, h.height), c = this.ni(this.Kt, a), l = await this.hi(this.Kt, c, a.columns), u = this.oi(l), f = new Map(u.map((p) => [p.character, p])), d = new os(this.X);
    this.Wt = n, this.Yt = a, this.Vt = { width: a.cellWidth, height: a.cellHeight }, this.bt = u, this.Mt = f, this.Ct === 0 && (this.Ct = Math.abs(this.Kt.fontSize ?? a.cellHeight)), this.Jt(), d.J(this.bt, this.Vt, n, a), this.qt({ cacheKey: s, textureAtlas: d, characters: u, characterMap: f, nativeCellDimensions: { ...this.Vt }, layout: { ...a }, referenceCount: 0 }), this.Et = !0;
  }
  Bt(e) {
    if (e === void 0) return this.Ct;
    this.Ct = Math.abs(e), this.Jt();
  }
  zt(e) {
    const s = this.Mt.get(e);
    return s ? s.color : [1, 1, 0];
  }
  Ht(e) {
    return Ht(e).map((s) => this.zt(s));
  }
  dispose() {
    this.ai(), super.dispose();
  }
  qt(e) {
    this.$t !== e && (this.ai(), U.ci(this.X).set(e.cacheKey, e), e.referenceCount += 1, this.$t = e, this.Pt = e.textureAtlas);
  }
  ai() {
    const e = this.$t;
    if (e) {
      if (e.referenceCount -= 1, e.referenceCount <= 0) {
        e.textureAtlas.k();
        const s = U.Nt.get(this.X);
        s == null || s.delete(e.cacheKey);
      }
      this.$t = void 0, this.Pt = null;
    } else this.Pt = null;
  }
  ti(e) {
    return JSON.stringify({ source: this.ui(e.source), columns: e.columns, rows: e.rows, count: e.count ?? null, margin: e.margin ?? null, marginX: e.marginX ?? null, marginY: e.marginY ?? null, spacing: e.spacing ?? null, spacingX: e.spacingX ?? null, spacingY: e.spacingY ?? null, mapping: this.li(e) });
  }
  ui(e) {
    return typeof e == "string" || e instanceof URL ? "url:" + (e + "") : "object:" + U.fi(e);
  }
  li(e) {
    return e.map === void 0 ? "auto:32" : Array.isArray(e.map) ? "rows:" + e.map.join(`
`) : e.map instanceof URL ? "url:" + (e.map + "") : this.di(e.map) ? "inline:" + e.map : "url:" + e.map;
  }
  ii(e) {
    var s;
    return (s = U.Nt.get(this.X)) == null ? void 0 : s.get(e);
  }
  static ci(e) {
    let s = U.Nt.get(e);
    return s || (s = /* @__PURE__ */ new Map(), U.Nt.set(e, s)), s;
  }
  static fi(e) {
    const s = U.Xt.get(e);
    if (s !== void 0) return s;
    const i = U.Gt++;
    return U.Xt.set(e, i), i;
  }
  async si(e) {
    if (typeof e != "string" && !(e instanceof URL)) return e;
    const s = e + "";
    return new Promise((i, n) => {
      const h = new Image();
      h.crossOrigin = "anonymous", h.onload = () => i(h), h.onerror = () => n(new b("Failed to load tileset image: " + s)), h.src = s;
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
    if (e.length !== n) throw new b(`Tileset map must contain exactly ${n} row${n === 1 ? "" : "s"} for ${s} mapped tile${s === 1 ? "" : "s"}.`);
    const h = [];
    let a = s;
    for (let c = 0; c < e.length; c++) {
      const l = Ht(e[c]), u = Math.min(i, a);
      if (l.length !== u) throw new b(`Tileset map row ${c + 1} must contain exactly ${u} character cell${u === 1 ? "" : "s"}.`);
      h.push(...l), a -= u;
    }
    return h;
  }
  gi(e) {
    this.Ai(e);
    const s = [];
    for (let i = 0; i < e; i++) s.push(String.fromCodePoint(32 + i));
    return s;
  }
  async wi(e) {
    let s;
    try {
      s = await fetch(e);
    } catch (i) {
      throw new b("Failed to load tileset map: " + (i instanceof Error ? i.message : "Unknown error"));
    }
    if (!s.ok) throw new b(`Failed to load tileset map: ${s.status} ${s.statusText}`);
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
    if (typeof i != "number" || typeof n != "number" || i <= 0 || n <= 0) throw new b("Tileset source must expose positive pixel dimensions.");
    return { width: i, height: n };
  }
  ri(e, s, i) {
    const n = e.marginX ?? e.margin ?? 0, h = e.marginY ?? e.margin ?? 0, a = e.spacingX ?? e.spacing ?? 0, c = e.spacingY ?? e.spacing ?? 0;
    if (e.columns <= 0 || e.rows <= 0) throw new b("Tileset columns and rows must be greater than 0.");
    const l = s - 2 * n - a * (e.columns - 1), u = i - 2 * h - c * (e.rows - 1);
    if (l <= 0 || u <= 0) throw new b("Tileset margins and spacing leave no usable tile area.");
    const f = l / e.columns, d = u / e.rows;
    if (!Number.isInteger(f) || !Number.isInteger(d)) throw new b("Tileset dimensions do not divide evenly. Check columns, rows, margins, and spacing.");
    return { columns: e.columns, rows: e.rows, marginX: n, marginY: h, spacingX: a, spacingY: c, cellWidth: f, cellHeight: d };
  }
  ni(e, s) {
    const i = s.columns * s.rows, n = e.count ?? i;
    if (n <= 0 || n > i) throw new b(`Tileset count must be between 1 and ${i}.`);
    return n;
  }
  Ai(e) {
    if (32 + e - 1 > 1114111) throw new b("Tileset automatic character assignment exceeds the supported Unicode range.");
  }
  mi(e, s) {
    const i = /* @__PURE__ */ new Map();
    for (let n = 0; n < e.length; n++) {
      const h = e[n], a = i.get(h);
      if (a !== void 0) throw new b(`${s} contains duplicate character ${this.Mi(h)} at tile ${a + 1} and tile ${n + 1}.`);
      i.set(h, n);
    }
  }
  Mi(e) {
    const s = Qt(e);
    if (s.length === 0) return '""';
    const i = s.map((n) => "U+" + n.toString(16).toUpperCase().padStart(4, "0")).join(" ");
    return `${JSON.stringify(e)} (${i})`;
  }
  oi(e) {
    const s = [];
    for (let i = 0; i < e.length; i++) {
      const n = e[i], h = Qt(n)[0];
      if (h === void 0) throw new b(`Tileset character mapping produced an empty character at tile ${i + 1}.`);
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
    this.Zt = { width: Math.max(1, Math.round(this.Vt.width * s)), height: e };
  }
  get characters() {
    return this.bt;
  }
  get characterMap() {
    return this.Mt;
  }
  get framebuffer() {
    return this.Pt.framebuffer;
  }
  get fontFramebuffer() {
    return this.framebuffer;
  }
  get columns() {
    return this.Pt.columns;
  }
  get rows() {
    return this.Pt.rows;
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
    return this.Zt;
  }
  get cellDimensions() {
    return this.Zt;
  }
  get cellWidth() {
    return this.Zt.width;
  }
  get cellHeight() {
    return this.Zt.height;
  }
  get fontSize() {
    return this.Ct;
  }
};
o(U, "Nt", /* @__PURE__ */ new WeakMap()), o(U, "Xt", /* @__PURE__ */ new WeakMap()), o(U, "Gt", 1);
let k = U;
const Xi = Object.freeze(Object.defineProperty({ __proto__: null, TextmodeFont: D, TextmodeTileset: k }, Symbol.toStringTag, { value: "Module" })), at = ["normal", "additive", "multiply", "screen", "subtract", "darken", "lighten", "overlay", "softLight", "hardLight", "colorDodge", "colorBurn", "difference", "exclusion"];
function V(r) {
  return r * (Math.PI / 180);
}
function Xt(r) {
  return r * (180 / Math.PI);
}
function de(r, t, e, s) {
  return Xt(Math.atan2(s - t, e - r));
}
function Tt(r, t, e, s) {
  return Math.hypot(e - r, s - t);
}
function Q(r, t, e) {
  return Math.min(Math.max(r, t), e);
}
function $t(r) {
  return (r % 360 + 360) % 360 / 360;
}
function j(r = new Float32Array(16)) {
  return r[0] = 1, r[1] = 0, r[2] = 0, r[3] = 0, r[4] = 0, r[5] = 1, r[6] = 0, r[7] = 0, r[8] = 0, r[9] = 0, r[10] = 1, r[11] = 0, r[12] = 0, r[13] = 0, r[14] = 0, r[15] = 1, r;
}
function pe(r, t, e, s = new Float32Array(16)) {
  let i = r[0] - t[0], n = r[1] - t[1], h = r[2] - t[2], a = Math.hypot(i, n, h);
  a === 0 ? h = 1 : (a = 1 / a, i *= a, n *= a, h *= a);
  let c = e[1] * h - e[2] * n, l = e[2] * i - e[0] * h, u = e[0] * n - e[1] * i;
  a = Math.hypot(c, l, u), a === 0 ? (c = 1, l = 0, u = 0) : (a = 1 / a, c *= a, l *= a, u *= a);
  const f = n * u - h * l, d = h * c - i * u, p = i * l - n * c;
  return s[0] = c, s[1] = f, s[2] = i, s[3] = 0, s[4] = l, s[5] = d, s[6] = n, s[7] = 0, s[8] = u, s[9] = p, s[10] = h, s[11] = 0, s[12] = -(c * r[0] + l * r[1] + u * r[2]), s[13] = -(f * r[0] + d * r[1] + p * r[2]), s[14] = -(i * r[0] + n * r[1] + h * r[2]), s[15] = 1, s;
}
var Me = ((r) => (r[r.SILENT = 0] = "SILENT", r[r.WARNING = 1] = "WARNING", r[r.ERROR = 2] = "ERROR", r[r.THROW = 3] = "THROW", r))(Me || {});
const W = class W {
  constructor() {
    o(this, "Kt", { globalLevel: 3 });
    o(this, "Fi", /* @__PURE__ */ new Set());
  }
  static Pi() {
    return W.xi || (W.xi = new W()), W.xi;
  }
  Si(t, e) {
    const s = "%c[textmode.js] Oops! (╯°□°)╯︵ Something went wrong in your code.", i = "color: #f44336; font-weight: bold; background: #ffebee; padding: 2px 6px; border-radius: 3px;";
    switch (this.Kt.globalLevel) {
      case 0:
        return !1;
      case 1:
        return !!this.Ti("warning", t, e) && (console.group(s, i), console.warn(b.R(t, e, { includeFooterArrows: !1 })), console.groupEnd(), !1);
      case 2:
        return !!this.Ti("error", t, e) && (console.group(s, i), console.error(b.R(t, e, { includeFooterArrows: !1 })), console.groupEnd(), !1);
      default:
        throw new b(t, e);
    }
  }
  Ei(t, e, s) {
    return !!t || (this.Si(e, s), !1);
  }
  Ui(t) {
    this.Kt.globalLevel = t;
  }
  ki(t) {
    t.globalLevel !== void 0 && (this.Kt.globalLevel = t.globalLevel);
  }
  Li() {
    this.Fi.clear();
  }
  Ti(t, e, s) {
    const i = this.Di(t, e, s);
    return !this.Fi.has(i) && (this.Fi.add(i), !0);
  }
  Di(t, e, s) {
    return `${t}|${e}|${s ? this.Ri(s) : ""}`;
  }
  Ri(t) {
    return t == null ? t + "" : typeof t == "number" || typeof t == "boolean" || typeof t == "string" ? JSON.stringify(t) : Array.isArray(t) ? `[${t.map((e) => this.Ri(e)).join(",")}]` : typeof t == "object" ? `{${Object.entries(t).sort(([e], [s]) => e.localeCompare(s)).map(([e, s]) => `${JSON.stringify(e)}:${this.Ri(s)}`).join(",")}}` : t + "";
  }
};
o(W, "xi", null);
let Jt = W;
const st = Jt.Pi();
class Y {
  constructor(t = 0, e = 0, s = 0, i = 0, n = 0, h = 0, a = 0, c = 1, l = 0) {
    o(this, "Oi");
    o(this, "Bi");
    o(this, "Ii");
    o(this, "ji");
    o(this, "zi");
    o(this, "Hi");
    o(this, "Qi");
    o(this, "Ni");
    o(this, "Xi");
    this.Oi = t, this.Bi = e, this.Ii = s, this.ji = i, this.zi = n, this.Hi = h, this.Qi = a, this.Ni = c, this.Xi = l;
  }
  static Gi(t, e) {
    const s = t.Zi.Vi, i = t.Zi.Wi, n = t.Zi.Yi, h = t.Zi.Ki, a = t.Zi.$i, c = t.Zi.qi;
    if (t.Zi.Ji) {
      const l = 0.5 * Math.max(1, e) / Math.tan(0.5 * t.Zi.ts);
      return new Y(s, i, n + l, s, i, n, h, a, c);
    }
    return new Y(t.Zi.ss, t.Zi.es, t.Zi.rs, s, i, n, h, a, c);
  }
  ns(t) {
    t.Zi.hs(this.Oi, this.Bi, this.Ii, this.ji, this.zi, this.Hi, this.Qi, this.Ni, this.Xi);
  }
  setPosition(t, e, s) {
    return this.Oi = t, this.Bi = e, this.Ii = s, this;
  }
  lookAt(t, e, s) {
    return this.ji = t, this.zi = e, this.Hi = s, this;
  }
  setUp(t, e, s) {
    return this.Qi = t, this.Ni = e, this.Xi = s, this;
  }
  move(t, e, s) {
    return this.Oi += t, this.Bi += e, this.Ii += s, this.ji += t, this.zi += e, this.Hi += s, this;
  }
  copy() {
    return new Y(this.Oi, this.Bi, this.Ii, this.ji, this.zi, this.Hi, this.Qi, this.Ni, this.Xi);
  }
  get eyeX() {
    return this.Oi;
  }
  get eyeY() {
    return this.Bi;
  }
  get eyeZ() {
    return this.Ii;
  }
  get targetX() {
    return this.ji;
  }
  get targetY() {
    return this.zi;
  }
  get targetZ() {
    return this.Hi;
  }
  get upX() {
    return this.Qi;
  }
  get upY() {
    return this.Ni;
  }
  get upZ() {
    return this.Xi;
  }
}
class as {
  constructor(t) {
    o(this, "cs", null);
    o(this, "Ji", !0);
    o(this, "ss", 0);
    o(this, "es", 0);
    o(this, "rs", 0);
    o(this, "Vi", 0);
    o(this, "Wi", 0);
    o(this, "Yi", 0);
    o(this, "Ki", 0);
    o(this, "$i", 1);
    o(this, "qi", 0);
    o(this, "us", "perspective");
    o(this, "ls");
    o(this, "fs");
    o(this, "ds");
    this.Ji = t.Zi.Ji, this.ss = t.Zi.ss, this.es = t.Zi.es, this.rs = t.Zi.rs, this.Vi = t.Zi.Vi, this.Wi = t.Zi.Wi, this.Yi = t.Zi.Yi, this.Ki = t.Zi.Ki, this.$i = t.Zi.$i, this.qi = t.Zi.qi, t.Zi.Ji || (this.cs = new Y(t.Zi.ss, t.Zi.es, t.Zi.rs, t.Zi.Vi, t.Zi.Wi, t.Zi.Yi, t.Zi.Ki, t.Zi.$i, t.Zi.qi)), t.Zi._s ? this.us = "ortho" : (this.us = "perspective", this.ls = 180 * t.Zi.ts / Math.PI), this.fs = t.Zi.fs, this.ds = t.Zi.ds;
  }
  createCamera(t, e) {
    let s;
    if (this.Ji) {
      const i = Math.max(1, t), n = this.ls ?? e, h = 0.5 * i / Math.tan(n * Math.PI / 360);
      s = new Y(this.Vi, this.Wi, this.Yi + h, this.Vi, this.Wi, this.Yi, this.Ki, this.$i, this.qi);
    } else s = new Y(this.ss, this.es, this.rs, this.Vi, this.Wi, this.Yi, this.Ki, this.$i, this.qi);
    return this.setCamera(s), s;
  }
  setCamera(t) {
    this.cs = t, this.Ji = !1, this.ss = t.eyeX, this.es = t.eyeY, this.rs = t.eyeZ, this.Vi = t.targetX, this.Wi = t.targetY, this.Yi = t.targetZ, this.Ki = t.upX, this.$i = t.upY, this.qi = t.upZ;
  }
  resetCamera() {
    this.cs = null, this.Ji = !0, this.ss = 0, this.es = 0, this.rs = 0, this.Vi = 0, this.Wi = 0, this.Yi = 0, this.Ki = 0, this.$i = 1, this.qi = 0;
  }
  camera(t, e, s, i = 0, n = 0, h = 0, a = 0, c = 1, l = 0) {
    this.cs ? this.cs.setPosition(t, e, s).lookAt(i, n, h).setUp(a, c, l) : this.cs = new Y(t, e, s, i, n, h, a, c, l), this.Ji = !1, this.ss = t, this.es = e, this.rs = s, this.Vi = i, this.Wi = n, this.Yi = h, this.Ki = a, this.$i = c, this.qi = l;
  }
  lookAt(t, e, s, i, n, h) {
    this.cs && (this.cs.lookAt(t, e, s), i === void 0 && n === void 0 && h === void 0 || this.cs.setUp(i ?? this.cs.upX, n ?? this.cs.upY, h ?? this.cs.upZ)), this.Vi = t, this.Wi = e, this.Yi = s, i !== void 0 && (this.Ki = i), n !== void 0 && (this.$i = n), h !== void 0 && (this.qi = h);
  }
  perspective(t, e, s) {
    this.us = "perspective", t !== void 0 && (this.ls = t), e !== void 0 && (this.fs = e), s !== void 0 && (this.ds = s);
  }
  ortho(t, e) {
    this.us = "ortho", t !== void 0 && (this.fs = t), e !== void 0 && (this.ds = e);
  }
  getActiveCamera() {
    return this.cs;
  }
  applyToState(t) {
    if (this.us === "ortho" ? t.Zi.ps(this.fs, this.ds) : t.Zi.gs(this.ls, this.fs, this.ds), this.Ji) return t.Zi.vs(), void (this.Vi === 0 && this.Wi === 0 && this.Yi === 0 && this.Ki === 0 && this.$i === 1 && this.qi === 0 || t.Zi.ws(this.Vi, this.Wi, this.Yi, this.Ki, this.$i, this.qi));
    t.Zi.hs(this.ss, this.es, this.rs, this.Vi, this.Wi, this.Yi, this.Ki, this.$i, this.qi);
  }
}
const cs = Object.freeze({ source: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAITElEQVR42u1d2XLkIAz0//909jWVHYPUhyR7SNXUHnhsDI3ULQlyXdf1s/usfiLtv6/5+/dPz4r0Y3XN6ru750fHIPv8u3FC3u/umt39b/oXf/nfN7gb0FU7OwBo+18gRiYrsgAQgN5dd7dYVAD4ND+jAJCxHp8GKfLyu9WwAyVjAVfvkgVA1PoEF5jfBUxpX012BphZAEdWPeviVgBYjVcYAHc3Qgc4stJUFijCAVgAZFwQyyEibYn+5VxAZFI+mTiFj4/4bYZEoi5gBzC1f9+12TiAyge6J5ABEEMCs8QPVTHI6qdUwPlc1OQP//gHTrEaoyuQsTCohagGohwACMPNtKOrbWfSMiSzkoMgZlwV6MrwmI8AWAVMMhoW9bXI5K6IJ6oCUAsTVUU7tZUNdBELdAYAohqZkZiR560UzK49S5KRMK4NANHViLQ7Qq27OACaC4ia2Kxejy4K9Pm0C+gEADIpWSugirQhk6/gANkwM8wBOkkgk0mrYvkulRCxUEggKwSAJ8jA8xkQB4iij5GBzPfQFZJZRVkFcwAgkmHZ2Ds6ic72iZHNEgBk0rUrQhm5PwqADEvPyrBpbg/mAKxpRy1AliDtJKEaAEiwZ8jk1yWDsjo840ZWQZcqAERkMds3hcqisoHsgxUVNRmXIBogqY9nXZCh7zNcABL0KVwlMoLXAYDNvY8WHkbKemQgq6OzcXxhJIuNhcv63wWIbCn6fySQKCgMmejM/RX+LZNZrOi/SmWoXMBtLmCVGmYA4ACMcsVMAQBjAYlnaAIpTNVrdMCZXHp2kBmAd/IAwJLWhVIzE6y0INn/V4Sqp1qAZU0gAwBV2bLLRLMAYAs+OjlAKBDEsGgFy87G29XZQLZ/T7iejgSez4vrAdQ6nSlbFpc90yQPLeqMhqpZl8Nsfr1QEuTy2Yr7u2QnS3JZ/hDc7Zutl7hSN6vQ8eo4APt8tcphikUjZedtAFBJJHQAIwOMvJ8SACxAkXR4CgBIPvppFgCNQ7ChcGV8JVqBBQPA6QLexgHU76cmgVsAOFhyhwpAq4YdKkB5f7sKOJ8vjwOoV7Di+24Vwuh0dyTUdU4hnAuokoWuegM3ANhcQQYUSLZ1HADYejxH/l6VDq7OpAp2ZnlMoKMkTKUymFWqyogqr0GJcZgDsBVD7CpRhaozGU3X1u8JpelbC5CNbLE6vhIAQKBEEiFU+/lSAOy2XrET5DbBLAl0Vy0r8gnEzqKjhU89gHDXzxM3SqjLtZxlXdbzAaZ03BEsYUPJkwBmPSAi6oPVMlC1c0eVDXRUPasKa5H7U7mA7kghuzFjSkWQas/CriAk+X49O2kqs3GZAyicoWoWALuCEDC0/TwLoNbZ3fUAbhlLA+AOZU/hAKpYv6peIQsCRRzj1AOczzkgYspBEGwkVHxCyTklY8r7ObalBUCE+XAHC6/YeNJdEeQCwKc+Bce/bkDRNOfTC0LcoeZsqvvPNVoL4NhfP7EghI1GqgtCiP2b+HZkpOyL3cvGxPrZgpCuI2LU+RoZAJjVs0NpJg6hjKUrK44mqYAlAM7niz8/5p/q41rVEUml9s+OD3JNevzeCoApRZfo+KAJJBgAUwI7VRM82QIorEV4nKoAkH3pae3oBGUBwFqMkQCIMGzFGX3KdvUEKayF8hmlLuCJAMhKMZVMc4OgjQMwgzuh3Ukgqwh2Kwf4hoyectNGmSXIsmaElKBFjVPaHeHeyBY2tsQsFQjqBsDKFyPtf/+faa8AwCqdOwIA7NFmb7IADAmMAmBVycOUrLcDYPfv3QS5vp9NOKE+OQpAdPPpsQBGC8BE6hRb1BTfScvALgBkfX8FB3DkBth0ehkAjgrwASAbhZSelloBgPPx//o5GwDeHgiKrLrdn2hpnCLZRM9BdS5gJXFW5m11XWSSdj5/Z14jnEFZt69wSwcACdmHWgD2bERXnUL4+m8DQEZ/Z0CgrpJmrz0AAE1+RnJWnSLKVj0tr/9WDpAxtQoOsNP/qLuQAcBZFDqZBLIWIJOwQQI5yuNkPj5nWlXwRFnIcADXOAlL1vpCnB3br9RxCjaQ5hif5LP0Z/CtMm+Mj1MBQGmhMlFRtwugAZA1K5HTw5UyR12QUXXyRwUJJFzOvuAAqUhBXjTKbhWrIlsRjBxyEbVgChk4HgDsCkYBpCi2QM8qrAoEkQTd7wJYADgiZegAdyalsiBOA8BBApUmXOmTK7JxFckggUyvy3M7Sp5cMq8znqEoT4MAMFlHuybQqTgq+se2X+zu2KrDE5nUavb+jj65+se2X4oOTQIBO6GVk6/qH9WOsHilj3ds3kSUhGLyO/sHtztkHCrlqgbQ/Xx3u7h/Wtnj1tEdPrvSJ7PjB9xfL3vcOnoSZ+kAhLJ/l0PaVehoVkZ1Ru4qDqtKy8A31PqrtHnX/ZtOUDsAOAA4ADgAcBzCGJGRbLLDcX/2/VyJG3sy6ADgywEw3UR3m/Dp5xyD/TsAOAA4ADgAmBToyUbCIhs4VKXq6tPBs+OIhI03+zXqfgGCa3/8FAAoSBwzRnQouPMwY5YJdwMA7T8LgGgCaGEN+s+yZe+9A4DbvzP9VwAgulN5uS9APfFoiZkaALvVkl2pUw57Xh0pG60n+OgC3D+OAfx2AEhIYPXPFAC4t2NXAQAmgT8P/+nmAN0AsJNA51k2lS7njjeo3rETANE9nTfvrdvZw1TsdKiMNwFgNdEbEOj29nVsbcq4COZI1SpSrJ787TXVAZ0pvzTpLQCITP7yWjbf3g2Abg4wJRAEcwA1ANCyZufKcXKACaFgigM4AIBmCx0VMSwHqN7fzxxjN4IDOFfTkwpLK9PBDAf4BzY4SAYFZUTuAAAAAElFTkSuQmCC", columns: 16, rows: 16, map: `☺☻♥♦♣♠•◘○◙♂♀♪♫☼
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
class N {
  constructor(t, e = {}) {
    o(this, "As");
    o(this, "bs");
    o(this, "Ms");
    o(this, "l");
    o(this, "_");
    o(this, "Cs");
    o(this, "Ct");
    o(this, "Fs");
    o(this, "X");
    o(this, "Ps");
    o(this, "Ss");
    o(this, "At");
    o(this, "Ts");
    o(this, "Es");
    o(this, "ks");
    o(this, "Ls");
    o(this, "Ds", () => {
    });
    o(this, "Rs", () => {
    });
    o(this, "Os", []);
    o(this, "Bs", []);
    o(this, "Is", !1);
    o(this, "js", !1);
    o(this, "zs");
    o(this, "Hs");
    o(this, "Qs", /* @__PURE__ */ new Map());
    this.X = t, this.As = e.visible ?? !0, this.bs = e.opacity ?? 1;
    const s = e.blendMode ?? "normal";
    this.Ms = N.Ns(s) ? s : "normal";
    const i = e.fontSize ?? 16;
    this.Ct = Math.abs(i), this.Hs = e.fontSize !== void 0, st.Ei(N.Ns(s), `Invalid blend mode. Expected one of: ${at.join(", ")}.`, { method: "constructor", property: "blendMode", providedValue: e.blendMode }), st.Ei(typeof i == "number", "Font size must be a number.", { method: "fontSize", providedValue: i }), this.l = e.offsetX ?? 0, this._ = e.offsetY ?? 0, this.Cs = e.rotationZ ?? 0;
    const n = e.fontSource;
    this.Fs = n, this.At = n instanceof D || n instanceof k ? n : n === void 0 ? new k(t, this.Ct, cs) : new D(t, this.Ct), this.zs = new as(t.state);
  }
  async Xs(t) {
    if (this.Ps = t, this.Fs instanceof D || this.Fs instanceof k) {
      this.Fs.Et || await this.Fs.Dt();
      const i = this.Fs, n = i.kt({ fontSize: this.Gs(i) });
      this.Vs(n);
    }
    this.At.Et || (this.At instanceof D ? await this.At.Dt(this.Fs) : await this.At.Dt());
    const e = this.At.maxGlyphDimensions;
    this.Ss = new We(this.Ps.canvas.canvas, e.width, e.height);
    const s = this.Ss;
    this.Ts = this.Ps.createFramebuffer(s.cols, s.rows, 3), this.Es = this.Ps.createFramebuffer(s.width, s.height, 1), this.ks = this.Ps.createFramebuffer(s.width, s.height, 1), this.Ls = [this.Ps.createFramebuffer(s.width, s.height, 1, { depth: !1 }), this.Ps.createFramebuffer(s.width, s.height, 1, { depth: !1 })], this.Ss.F(() => {
      var i, n, h;
      this.Ts.resize(this.Ss.cols, this.Ss.rows), this.Es.resize(this.Ss.width, this.Ss.height), (i = this.ks) == null || i.resize(this.Ss.width, this.Ss.height), (n = this.Ls) == null || n[0].resize(this.Ss.width, this.Ss.height), (h = this.Ls) == null || h[1].resize(this.Ss.width, this.Ss.height);
    });
  }
  draw(t) {
    this.Ds = t;
  }
  postDraw(t) {
    this.Rs = t;
  }
  show() {
    this.As = !0;
  }
  hide() {
    this.As = !1;
  }
  opacity(t) {
    if (t === void 0) return this.bs;
    this.bs = Q(t, 0, 1);
  }
  blendMode(t) {
    if (t === void 0) return this.Ms;
    st.Ei(N.Ns(t), `Invalid blend mode. Expected one of: ${at.join(", ")}.`, { method: "blendMode", providedValue: t }) && (this.Ms = t);
  }
  offset(t, e = 0) {
    if (t === void 0) return { x: this.l, y: this._ };
    this.l = t, this._ = e;
  }
  rotateZ(t) {
    if (t === void 0) return this.Cs;
    this.Cs = t;
  }
  createCamera() {
    var s;
    const t = this.Zs(), e = 180 * (((s = this.Ps) == null ? void 0 : s.renderer.state.Zi.ts) ?? Math.PI / 4) / Math.PI;
    return this.zs.createCamera(t.height, e);
  }
  setCamera(t) {
    this.zs.setCamera(t), this.Ws();
  }
  resetCamera() {
    this.zs.resetCamera(), this.Ws();
  }
  camera(t, e, s, i = 0, n = 0, h = 0, a = 0, c = 1, l = 0) {
    this.zs.camera(t, e, s, i, n, h, a, c, l), this.Ws();
  }
  lookAt(t, e, s, i, n, h) {
    this.zs.lookAt(t, e, s, i, n, h), this.Ws();
  }
  perspective(t, e, s) {
    this.zs.perspective(t, e, s), this.Ws();
  }
  ortho(t, e) {
    this.zs.ortho(t, e), this.Ws();
  }
  Ys() {
    return this.zs.getActiveCamera();
  }
  filter(t, e) {
    (this.Is ? this.Bs : this.Os).push({ name: t, params: e });
  }
  setPluginState(t, e) {
    this.Qs.set(t, e);
  }
  getPluginState(t) {
    return this.Qs.get(t);
  }
  hasPluginState(t) {
    return this.Qs.has(t);
  }
  deletePluginState(t) {
    return this.Qs.delete(t);
  }
  fontSize(t) {
    if (t === void 0) return this.At.fontSize;
    if (!st.Ei(typeof t == "number", "Font size must be a number.", { method: "fontSize", providedValue: t })) return;
    const e = Math.abs(t);
    this.At.fontSize !== e && (this.Hs = !0, this.Ct = e, this.At.Bt(e), this.Ks());
  }
  useTileColors(t) {
    if (t === void 0) return this.js;
    this.js = t;
  }
  async loadFont(t) {
    if (!this.At) throw Error("Layer font not initialized. Ensure layer is attached before loading fonts.");
    if (t instanceof D) {
      t.Et || await t.Dt();
      const e = t, s = e.kt({ fontSize: this.Gs(e) });
      this.Vs(s);
    } else if (this.At instanceof D) await this.At.It(t);
    else {
      const e = new D(this.X, this.At.fontSize);
      await e.Dt(t), this.Vs(e);
    }
    return this.Fs = t, this.Ct = this.At.fontSize, this.Ks(), this.At;
  }
  async loadTileset(t) {
    if (!this.At) throw Error("Layer font not initialized. Ensure layer is attached before loading tilesets.");
    if (t instanceof k) {
      t.Et || await t.Dt();
      const e = t.kt({ fontSize: this.Gs(t) });
      this.Vs(e);
    } else {
      const e = this.Hs ? this.Ct : t.fontSize, s = new k(this.X, e, t);
      await s.Dt(), this.Vs(s);
    }
    return this.Fs = t, this.Ct = this.At.fontSize, this.Ks(), this.At;
  }
  $s(t, e, s = {}) {
    if (!this.As || !this.Ts || !this.Es) return;
    const i = this.Ps.renderer, n = this.Ss, h = s.skipPluginHooks ?? !1;
    h || t.Js.qs(this);
    try {
      let a = !1;
      try {
        this.Ts.begin(), a = !0, i.state.ie.te(), i.state.se(), this.zs.applyToState(i.state), t.ee = this, this.Ds.call(t);
      } finally {
        t.ee = void 0, a && this.Ts.end();
      }
      h || t.Js.re(this);
      const c = this.Os.length > 0, l = c ? this.ks : this.Es;
      let u = !1;
      try {
        l.begin(), u = !0, i.ne(e), e.he({ u_characterTexture: this.At.framebuffer, u_charsetDimensions: [this.At.textureColumns, this.At.textureRows], U9: this.Ts.textures[0], Ua: this.Ts.textures[1], Ub: this.Ts.textures[2], Uc: !(this.At instanceof k && this.js), Ud: [n.cols, n.rows], Ue: [l.width, l.height], Uf: [0, 0, 0, 0] }), i.oe(0, 0, n.width, n.height);
      } finally {
        u && l.end();
      }
      c && this.Ps.filterManager.ae(this.ks.textures[0], this.Es, this.Os, this.Es.width, this.Es.height, this.Ls);
      try {
        this.Is = !0, t.ee = this, this.Rs.call(t);
      } finally {
        this.Is = !1, t.ee = void 0;
      }
      this.Bs.length > 0 && this.Ps.filterManager.ae(this.Es.textures[0], this.Es, this.Bs, this.Es.width, this.Es.height, this.Ls);
    } finally {
      this.Os = [], this.Bs = [], this.Is = !1;
    }
  }
  ce() {
    var t;
    this.Ts && this.Es && ((t = this.Ss) == null || t.reset());
  }
  k() {
    var t, e, s, i, n, h, a;
    (t = this.Ts) == null || t.dispose(), (e = this.Es) == null || e.dispose(), (s = this.ks) == null || s.dispose(), (i = this.Ls) == null || i[0].dispose(), (n = this.Ls) == null || n[1].dispose(), (h = this.At) == null || h.dispose(), (a = this.Ss) == null || a.k();
  }
  get texture() {
    var t;
    return (t = this.Es) == null ? void 0 : t.textures[0];
  }
  get grid() {
    return this.Ss;
  }
  get font() {
    return this.At;
  }
  get width() {
    return this.Es ? this.Es.width : 0;
  }
  get height() {
    return this.Es ? this.Es.height : 0;
  }
  get drawFramebuffer() {
    return this.Ts;
  }
  get asciiFramebuffer() {
    return this.Es;
  }
  Ks() {
    if (!this.Ss || !this.At) return;
    const t = this.At.maxGlyphDimensions;
    this.Ss.S(t.width, t.height), this.Ts && this.Es && this.ce();
  }
  static Ns(t) {
    return typeof t == "string" && at.includes(t);
  }
  Vs(t) {
    (this.Fs instanceof D || this.Fs instanceof k) && this.At === this.Fs || this.At === t || this.At.dispose(), this.At = t;
  }
  Gs(t) {
    return this.Hs ? this.Ct : t.fontSize;
  }
  Ws() {
    this.zs.applyToState(this.Ps.renderer.state);
  }
  Zs() {
    var s, i, n, h;
    if (this.Ts) return { width: Math.max(1, this.Ts.width), height: Math.max(1, this.Ts.height) };
    if (this.Ss) return { width: Math.max(1, this.Ss.cols), height: Math.max(1, this.Ss.rows) };
    const t = ((s = this.Ps) == null ? void 0 : s.renderer.context.canvas.width) ?? ((i = this.Ps) == null ? void 0 : i.canvas.width) ?? 1, e = ((n = this.Ps) == null ? void 0 : n.renderer.context.canvas.height) ?? ((h = this.Ps) == null ? void 0 : h.canvas.height) ?? 1;
    return { width: Math.max(1, t), height: Math.max(1, e) };
  }
}
class Se {
  constructor(t) {
    o(this, "ue");
    o(this, "le");
    o(this, "Ds");
    o(this, "Et", !1);
    this.ue = t;
  }
  draw(t) {
    this.Ds = t;
  }
  async Dt() {
    if (this.Et) return;
    const t = this.fe();
    this.le = t, this.Et = !0;
  }
  k() {
    var t;
    this.Et && ((t = this.le) == null || t.k(), this.Et = !1);
  }
  de(t, e) {
    const s = this.le;
    s.show(), s.draw(() => {
      this.ue.clear(), this.ue.push();
      try {
        (this.Ds || t)(e), this._e(e);
      } finally {
        this.ue.pop();
      }
    });
  }
  _e(t) {
    const { textmodifier: e, grid: s } = t, i = [116, 101, 120, 116, 109, 111, 100, 101, 46, 106, 115].map((c) => String.fromCharCode(c)).join(""), n = (s.rows + 1 >> 1) - 2, h = 2 - (s.cols + 1 >> 1), a = [[142, 249, 243], [241, 91, 181], [255, 155, 113]];
    e.push(), e.translate(h, n, 0);
    for (let c = 0; c < i.length; c++) {
      const l = i[c], u = Math.floor(0.1 * e.frameCount + 0.5 * c) % a.length, [f, d, p] = a[u], m = e.color(f, d, p);
      e.charColor(m), e.char(l), e.point(), e.translateX(1);
    }
    e.pop();
  }
}
function it(r, t, e) {
  (function(s, i, n, h) {
    s.push(), s.translate(n, h, 0);
    for (const a of i) s.char(a), s.rect(1, 1), s.translateX(1);
    s.pop();
  })(r, t, -Math.floor(t.length / 2), e);
}
const us = ({ textmodifier: r, grid: t, errorTitle: e, errorMessage: s }) => {
  r.background("#222323"), r.cellColor("#222323"), r.charColor("#FF6B6B"), it(r, "X", -2), it(r, e || "SKETCH ERROR", 0), r.charColor("#C0C0C0");
  const i = s || "Unknown error", n = Math.floor(0.8 * t.cols), h = ge(i, n), a = h.slice(0, 3);
  h.length > 3 && (a[2] = a[2].substring(0, n - 3) + "..."), a.forEach((u, f) => {
    it(r, u, 3 + f);
  });
  const c = ge("CHECK CONSOLE FOR DETAILS", n), l = 5 + a.length;
  c.forEach((u, f) => {
    it(r, u, l + f);
  });
}, ge = (r, t) => {
  const e = r.split(" "), s = [];
  let i = "";
  for (const n of e) (i + " " + n).length <= t ? i = i ? i + " " + n : n : (i && s.push(i), i = n);
  return i && s.push(i), s;
};
class Xe extends Se {
  constructor(e) {
    super(e);
    o(this, "pe", "inactive");
    o(this, "me", "SKETCH ERROR");
    o(this, "ge", "Unknown error");
    o(this, "ve", "");
  }
  async Dt() {
    this.Et || (await super.Dt(), this.le.opacity(1), this.le.hide());
  }
  get ye() {
    return this.Et && this.pe === "active";
  }
  we(e) {
    this.Ae(e), this.Et && (this.le.opacity(1), this.le.show());
  }
  be() {
    this.ye && this.Me();
  }
  k() {
    super.k();
  }
  fe() {
    return new N(this.ue.X, { visible: !0, opacity: 1 });
  }
  Me() {
    const e = { textmodifier: this.ue, grid: this.le.grid, errorTitle: this.me, errorMessage: this.ge, errorDetails: this.ve || void 0 };
    this.de(us, e);
  }
  Ae(e) {
    var s;
    if (this.pe = "active", e instanceof Error) {
      const i = (s = e.name) != null && s.trim() ? e.name.trim().toUpperCase() : "SKETCH ERROR";
      return this.me = i.endsWith("ERROR") ? i : i + " ERROR", this.ge = e.message || "Unknown error", void (this.ve = e.stack || "");
    }
    if (typeof e == "string") return this.me = "SKETCH ERROR", this.ge = e || "Unknown error", void (this.ve = "");
    this.me = "SKETCH ERROR", this.ge = "Unknown error", this.ve = "";
  }
}
const Pi = Object.freeze(Object.defineProperty({ __proto__: null, ErrorLayerController: Xe, TextmodeError: b, TextmodeErrorLevel: Me }, Symbol.toStringTag, { value: "Module" }));
function Pe(r, t) {
  r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL, 1), r.texImage2D(r.TEXTURE_2D, 0, r.RGBA, r.RGBA, r.UNSIGNED_BYTE, t);
}
function Ut(r, t, e) {
  r.bindTexture(r.TEXTURE_2D, t), Pe(r, e), r.bindTexture(r.TEXTURE_2D, null);
}
function re(r, t, e = r.NEAREST, s = r.NEAREST, i = r.CLAMP_TO_EDGE, n = r.CLAMP_TO_EDGE) {
  const h = r.createTexture();
  r.bindTexture(r.TEXTURE_2D, h), Re(r, e, s, i, n), Pe(r, t), r.bindTexture(r.TEXTURE_2D, null);
  const { width: a, height: c } = (function(l) {
    let u = 0, f = 0;
    return l instanceof HTMLVideoElement ? (u = l.videoWidth, f = l.videoHeight) : l instanceof HTMLImageElement ? (u = l.naturalWidth, f = l.naturalHeight) : l instanceof HTMLCanvasElement && (u = l.width, f = l.height), { width: u, height: f };
  })(t);
  return { texture: h, width: a, height: c };
}
function Re(r, t, e, s, i) {
  r.texParameteri(r.TEXTURE_2D, r.TEXTURE_MIN_FILTER, t), r.texParameteri(r.TEXTURE_2D, r.TEXTURE_MAG_FILTER, e), r.texParameteri(r.TEXTURE_2D, r.TEXTURE_WRAP_S, s), r.texParameteri(r.TEXTURE_2D, r.TEXTURE_WRAP_T, i);
}
function ut(r, t, e, s, i, n = 0, h = r.FLOAT, a = !1) {
  r.enableVertexAttribArray(t), r.vertexAttribPointer(t, e, h, a, s, i), r.vertexAttribDivisor(t, n);
}
function qt(r, t, e, s, i) {
  r.bindBuffer(t, e), r.bufferData(t, s, i), r.bindBuffer(t, null);
}
class nt extends dt {
  constructor(e, s, i = s, n = 1, h = {}, a) {
    super();
    o(this, "o");
    o(this, "u");
    o(this, "Kt");
    o(this, "Ce");
    o(this, "G");
    o(this, "xe", []);
    o(this, "Fe", null);
    o(this, "Pe");
    o(this, "X");
    o(this, "Se", null);
    o(this, "Te", /* @__PURE__ */ new Map());
    this.o = s, this.u = i, this.Ce = e, this.Pe = Q(n, 1, 8), this.X = a, this.Kt = { filter: "nearest", wrap: "clamp", type: "unsigned_byte", depth: !0, ...h };
    const c = e.getParameter(e.MAX_DRAW_BUFFERS), l = e.getParameter(e.MAX_COLOR_ATTACHMENTS);
    this.Pe = Math.min(this.Pe, c, l), this.G = e.createFramebuffer(), this.Ee(), this.ke(), this.Kt.depth && this.Le();
  }
  Ee() {
    const e = this.Ce, s = this.Kt.filter === "linear" ? e.LINEAR : e.NEAREST, i = this.Kt.wrap === "repeat" ? e.REPEAT : e.CLAMP_TO_EDGE;
    for (let n = 0; n < this.Pe; n++) {
      const h = e.createTexture();
      e.bindTexture(e.TEXTURE_2D, h), Re(e, s, s, i, i), this.De(h, !1), this.xe.push(h);
    }
    e.bindTexture(e.TEXTURE_2D, null);
  }
  De(e, s = !0) {
    const i = this.Ce, n = this.Kt.type === "float" ? i.FLOAT : i.UNSIGNED_BYTE, h = n === i.FLOAT ? i.RGBA32F : i.RGBA8, a = i.RGBA;
    s && i.bindTexture(i.TEXTURE_2D, e), i.texImage2D(i.TEXTURE_2D, 0, h, this.o, this.u, 0, a, n, null);
  }
  ke() {
    const e = this.Ce;
    if (e.bindFramebuffer(e.FRAMEBUFFER, this.G), this.Pe === 1) e.framebufferTexture2D(e.FRAMEBUFFER, e.COLOR_ATTACHMENT0, e.TEXTURE_2D, this.xe[0], 0);
    else {
      const s = [];
      for (let i = 0; i < this.Pe; i++) {
        const n = e.COLOR_ATTACHMENT0 + i;
        e.framebufferTexture2D(e.FRAMEBUFFER, n, e.TEXTURE_2D, this.xe[i], 0), s.push(n);
      }
      e.drawBuffers(s);
    }
    e.bindFramebuffer(e.FRAMEBUFFER, null);
  }
  Le() {
    const e = this.Ce;
    this.Fe = e.createRenderbuffer(), this.Re(), e.bindFramebuffer(e.FRAMEBUFFER, this.G), e.framebufferRenderbuffer(e.FRAMEBUFFER, e.DEPTH_ATTACHMENT, e.RENDERBUFFER, this.Fe), e.bindFramebuffer(e.FRAMEBUFFER, null);
  }
  Re() {
    if (!this.Fe) return;
    const e = this.Ce;
    e.bindRenderbuffer(e.RENDERBUFFER, this.Fe), e.renderbufferStorage(e.RENDERBUFFER, e.DEPTH_COMPONENT24, this.o, this.u), e.bindRenderbuffer(e.RENDERBUFFER, null);
  }
  $(e) {
    Ut(this.Ce, this.xe[0], e);
  }
  resize(e, s) {
    this.o = e, this.u = s, this.Te.clear();
    const i = this.Ce;
    for (const n of this.xe) this.De(n, !0);
    i.bindTexture(i.TEXTURE_2D, null), this.Re(), this.Se = null;
  }
  readPixels(e) {
    const s = this.Te.get(e);
    if (s) return s;
    const i = this.Ce, n = this.o, h = this.u, a = new Uint8Array(n * h * 4), c = i.getParameter(i.READ_FRAMEBUFFER_BINDING);
    i.bindFramebuffer(i.READ_FRAMEBUFFER, this.G), i.readBuffer(i.COLOR_ATTACHMENT0 + e), i.readPixels(0, 0, n, h, i.RGBA, i.UNSIGNED_BYTE, a), i.bindFramebuffer(i.READ_FRAMEBUFFER, c);
    const l = 4 * n, u = new Uint8Array(a.length);
    for (let f = 0; f < h; f++) {
      const d = (h - 1 - f) * l, p = f * l;
      u.set(a.subarray(d, d + l), p);
    }
    return this.Te.set(e, u), u;
  }
  begin() {
    const e = this.Ce;
    this.Te.clear(), this.X.Oe(), this.X.Be(this.G, this.o, this.u, this.Pe), this.Kt.depth && e.clear(e.DEPTH_BUFFER_BIT), this.X.state.Ie();
  }
  end() {
    this.X.state.je(), this.X.ze(), this.X.He();
  }
  Qe() {
    return this.Se || this.Ne(), this.Se;
  }
  Ne() {
    if (!this.X) return;
    const e = this.Pe > 1, s = this.Pe > 2, i = this.Pe > 3, n = { U1: this.xe[0], U2: e ? this.xe[1] : this.xe[0], U3: s ? this.xe[2] : this.xe[0], U4: i ? this.xe[3] : this.xe[0], U5: [this.o, this.u], U6: e, U7: s, U8: i }, h = this.X.materialManager.Xe;
    this.Se = this.X.materialManager.Ge(h, n);
  }
  dispose() {
    const e = this.Ce;
    e.deleteFramebuffer(this.G), this.xe.forEach((s) => {
      e.deleteTexture(s);
    }), this.Fe && e.deleteRenderbuffer(this.Fe), super.dispose();
  }
  get width() {
    return this.o;
  }
  get height() {
    return this.u;
  }
  get framebuffer() {
    return this.G;
  }
  get textures() {
    return this.xe;
  }
  get attachmentCount() {
    return this.Pe;
  }
}
function ht(r) {
  return typeof r == "object" && r !== null && "textures" in r && Array.isArray(r.textures);
}
class lt extends dt {
  constructor(e, s, i) {
    super();
    o(this, "Ce");
    o(this, "Ve");
    o(this, "Ze", /* @__PURE__ */ new Map());
    o(this, "We", /* @__PURE__ */ new Map());
    o(this, "Ye", /* @__PURE__ */ new Map());
    o(this, "Ke", 0);
    o(this, "$e", /* @__PURE__ */ new Map());
    o(this, "qe");
    this.Ce = e, this.qe = e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS) ?? 16, this.Ve = this.Je(s, i), this.tr();
  }
  tr() {
    const e = this.Ce.getProgramParameter(this.Ve, this.Ce.ACTIVE_UNIFORMS);
    for (let s = 0; s < e; s++) {
      const i = this.Ce.getActiveUniform(this.Ve, s);
      if (i) {
        const n = i.name.replace(/\[0\]$/, ""), h = this.Ce.getUniformLocation(this.Ve, n);
        h && (this.Ze.set(n, h), this.We.set(n, { type: i.type, size: i.size }));
      }
    }
  }
  Je(e, s) {
    const i = this.ir(this.Ce.VERTEX_SHADER, e), n = this.ir(this.Ce.FRAGMENT_SHADER, s), h = this.Ce.createProgram();
    if (!h) throw Error("Failed to create WebGL program");
    if (this.Ce.attachShader(h, i), this.Ce.attachShader(h, n), this.Ce.linkProgram(h), !this.Ce.getProgramParameter(h, this.Ce.LINK_STATUS)) {
      const a = this.Ce.getProgramInfoLog(h);
      throw Error("Shader program link error: " + a);
    }
    return this.Ce.deleteShader(i), this.Ce.deleteShader(n), h;
  }
  ir(e, s) {
    const i = this.Ce.createShader(e);
    if (!i) throw Error("Failed to create shader of type " + e);
    if (this.Ce.shaderSource(i, s), this.Ce.compileShader(i), !this.Ce.getShaderParameter(i, this.Ce.COMPILE_STATUS)) {
      const n = this.Ce.getShaderInfoLog(i);
      throw this.Ce.deleteShader(i), Error("Shader compilation error: " + n);
    }
    return i;
  }
  sr() {
    this.Ce.useProgram(this.Ve), this.er();
  }
  er() {
    this.Ke = 0, this.$e.clear();
    for (const [e, s] of this.Ye) (s instanceof WebGLTexture || ht(s)) && this.Ye.delete(e);
  }
  he(e) {
    for (const s in e) this.rr(s, e[s]);
  }
  rr(e, s) {
    const i = this.Ze.get(e);
    if (!i) return;
    const n = this.Ye.get(e);
    let h = !0;
    if (n !== void 0 && (typeof s == "number" || typeof s == "boolean" ? n === s && (h = !1) : (s instanceof WebGLTexture || ht(s)) && n === s && (h = !1)), !h) return;
    typeof s == "number" || typeof s == "boolean" || s instanceof WebGLTexture || ht(s) ? this.Ye.set(e, s) : this.Ye.delete(e);
    const a = this.We.get(e);
    if (!a) return;
    const { type: c, size: l } = a, u = this.Ce;
    if (s instanceof WebGLTexture) {
      const f = this.nr(e);
      return u.uniform1i(i, f), u.activeTexture(u.TEXTURE0 + f), void u.bindTexture(u.TEXTURE_2D, s);
    }
    if (ht(s)) {
      const f = this.nr(e);
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
  nr(e) {
    const s = this.$e.get(e);
    if (s !== void 0) return s;
    if (this.Ke >= this.qe) throw Error(`[textmode.js] Shader attempted to bind more than ${this.qe} texture samplers. Uniform "${e}" cannot be assigned.`);
    const i = this.Ke++;
    return this.$e.set(e, i), i;
  }
  get program() {
    return this.Ve;
  }
  dispose() {
    this.Ce.deleteProgram(this.Ve), super.dispose();
  }
}
const Fe = /* @__PURE__ */ new WeakMap();
function Wt(r, t) {
  Fe.set(r, t);
}
function Le(r) {
  return Fe.get(r);
}
class ls {
  constructor() {
    o(this, "hr", 0);
    o(this, "ar", 0);
    o(this, "cr", 0);
    o(this, "ur", 0);
    o(this, "lr", 0);
    o(this, "dr", 0);
    o(this, "_r", 1);
    o(this, "pr", 1);
    o(this, "mr", 1);
    o(this, "gr", j());
    o(this, "vr", j());
    o(this, "yr", j());
  }
  wr(t) {
    t.hr = this.hr, t.ar = this.ar, t.cr = this.cr, t.ur = this.ur, t.lr = this.lr, t.dr = this.dr, t._r = this._r, t.pr = this.pr, t.mr = this.mr;
    for (let e = 0; e < 16; e++) t.gr[e] = this.gr[e];
  }
  Ar(t) {
    this.hr = t.hr, this.ar = t.ar, this.cr = t.cr, this.ur = t.ur, this.lr = t.lr, this.dr = t.dr, this._r = t._r, this.pr = t.pr, this.mr = t.mr;
    for (let e = 0; e < 16; e++) this.gr[e] = t.gr[e];
  }
  br(t = 0, e = 0, s = 0) {
    t === 0 && e === 0 && s === 0 || (this.vr[0] = 1, this.vr[1] = 0, this.vr[2] = 0, this.vr[3] = 0, this.vr[4] = 0, this.vr[5] = 1, this.vr[6] = 0, this.vr[7] = 0, this.vr[8] = 0, this.vr[9] = 0, this.vr[10] = 1, this.vr[11] = 0, this.vr[12] = t, this.vr[13] = e, this.vr[14] = s, this.vr[15] = 1, this.Mr(this.vr));
  }
  Cr(t, e, s) {
    const i = e === void 0 ? t : e, n = s === void 0 ? e === void 0 ? t : 1 : s;
    t === 1 && i === 1 && n === 1 || (this.vr[0] = t, this.vr[1] = 0, this.vr[2] = 0, this.vr[3] = 0, this.vr[4] = 0, this.vr[5] = i, this.vr[6] = 0, this.vr[7] = 0, this.vr[8] = 0, this.vr[9] = 0, this.vr[10] = n, this.vr[11] = 0, this.vr[12] = 0, this.vr[13] = 0, this.vr[14] = 0, this.vr[15] = 1, this.Mr(this.vr));
  }
  Fr(t) {
    if (t === 0) return;
    const e = V(t);
    this.vr[0] = 1, this.vr[1] = 0, this.vr[2] = 0, this.vr[3] = 0, this.vr[4] = 0, this.vr[5] = Math.cos(e), this.vr[6] = Math.sin(e), this.vr[7] = 0, this.vr[8] = 0, this.vr[9] = -Math.sin(e), this.vr[10] = Math.cos(e), this.vr[11] = 0, this.vr[12] = 0, this.vr[13] = 0, this.vr[14] = 0, this.vr[15] = 1, this.Mr(this.vr);
  }
  Pr(t) {
    if (t === 0) return;
    const e = V(t);
    this.vr[0] = Math.cos(e), this.vr[1] = 0, this.vr[2] = -Math.sin(e), this.vr[3] = 0, this.vr[4] = 0, this.vr[5] = 1, this.vr[6] = 0, this.vr[7] = 0, this.vr[8] = Math.sin(e), this.vr[9] = 0, this.vr[10] = Math.cos(e), this.vr[11] = 0, this.vr[12] = 0, this.vr[13] = 0, this.vr[14] = 0, this.vr[15] = 1, this.Mr(this.vr);
  }
  Sr(t) {
    if (t === 0) return;
    const e = V(t);
    this.vr[0] = Math.cos(e), this.vr[1] = Math.sin(e), this.vr[2] = 0, this.vr[3] = 0, this.vr[4] = -Math.sin(e), this.vr[5] = Math.cos(e), this.vr[6] = 0, this.vr[7] = 0, this.vr[8] = 0, this.vr[9] = 0, this.vr[10] = 1, this.vr[11] = 0, this.vr[12] = 0, this.vr[13] = 0, this.vr[14] = 0, this.vr[15] = 1, this.Mr(this.vr);
  }
  Tr(t, e, s, i) {
    if (t === 0) return;
    const n = Math.hypot(e, s, i);
    if (n < 1e-6) return;
    const h = e / n, a = s / n, c = i / n, l = V(t), u = Math.cos(l), f = Math.sin(l), d = 1 - u;
    this.vr[0] = d * h * h + u, this.vr[1] = d * h * a + f * c, this.vr[2] = d * h * c - f * a, this.vr[3] = 0, this.vr[4] = d * h * a - f * c, this.vr[5] = d * a * a + u, this.vr[6] = d * a * c + f * h, this.vr[7] = 0, this.vr[8] = d * h * c + f * a, this.vr[9] = d * a * c - f * h, this.vr[10] = d * c * c + u, this.vr[11] = 0, this.vr[12] = 0, this.vr[13] = 0, this.vr[14] = 0, this.vr[15] = 1, this.Mr(this.vr);
  }
  Er() {
    j(this.gr), this.hr = 0, this.ar = 0, this.cr = 0, this.ur = 0, this.lr = 0, this.dr = 0, this._r = 1, this.pr = 1, this.mr = 1;
  }
  kr(t) {
    if (!this.Lr(t)) throw Error("applyMatrix() only supports affine transform matrices without shear or perspective.");
    this.Mr(t);
  }
  Mr(t) {
    (function(e, s, i = new Float32Array(16)) {
      const n = e[0], h = e[1], a = e[2], c = e[3], l = e[4], u = e[5], f = e[6], d = e[7], p = e[8], m = e[9], v = e[10], y = e[11], w = e[12], A = e[13], _ = e[14], x = e[15], T = s[0], R = s[1], C = s[2], M = s[3], B = s[4], F = s[5], O = s[6], Z = s[7], vt = s[8], yt = s[9], wt = s[10], _t = s[11], At = s[12], bt = s[13], xt = s[14], Et = s[15];
      i[0] = n * T + l * R + p * C + w * M, i[1] = h * T + u * R + m * C + A * M, i[2] = a * T + f * R + v * C + _ * M, i[3] = c * T + d * R + y * C + x * M, i[4] = n * B + l * F + p * O + w * Z, i[5] = h * B + u * F + m * O + A * Z, i[6] = a * B + f * F + v * O + _ * Z, i[7] = c * B + d * F + y * O + x * Z, i[8] = n * vt + l * yt + p * wt + w * _t, i[9] = h * vt + u * yt + m * wt + A * _t, i[10] = a * vt + f * yt + v * wt + _ * _t, i[11] = c * vt + d * yt + y * wt + x * _t, i[12] = n * At + l * bt + p * xt + w * Et, i[13] = h * At + u * bt + m * xt + A * Et, i[14] = a * At + f * bt + v * xt + _ * Et, i[15] = c * At + d * bt + y * xt + x * Et;
    })(this.gr, t, this.yr);
    for (let e = 0; e < 16; e++) this.gr[e] = this.yr[e];
    this.Dr();
  }
  Dr() {
    const t = this.gr, e = this.ur, s = this.lr, i = this.dr;
    this.hr = t[12], this.ar = t[13], this.cr = t[14];
    const n = t[0], h = t[1], a = t[2], c = t[4], l = t[5], u = t[6], f = t[8], d = t[9], p = t[10];
    let m = Math.hypot(n, h, a), v = Math.hypot(c, l, u), y = Math.hypot(f, d, p);
    m < 1e-6 && (m = 1e-6), v < 1e-6 && (v = 1e-6), y < 1e-6 && (y = 1e-6), t[0] * (t[5] * t[10] - t[6] * t[9]) - t[4] * (t[1] * t[10] - t[2] * t[9]) + t[8] * (t[1] * t[6] - t[2] * t[5]) < 0 && (y = -y), this._r = m, this.pr = v, this.mr = y;
    const w = n / m, A = c / v, _ = d / y, x = p / y, T = Q(f / y, -1, 1), R = Math.asin(T);
    let C, M;
    Math.abs(Math.cos(R)) > 1e-6 ? (C = Math.atan2(-_, x), M = Math.atan2(-A, w)) : (C = Math.atan2(t[6] / v, t[5] / v), M = 0);
    const B = this.Rr(C + Math.PI), F = this.Rr(Math.PI - R), O = this.Rr(M + Math.PI), Z = Math.abs(this.Rr(C - e)) + Math.abs(this.Rr(R - s)) + Math.abs(this.Rr(M - i));
    Math.abs(this.Rr(B - e)) + Math.abs(this.Rr(F - s)) + Math.abs(this.Rr(O - i)) < Z ? (this.ur = B, this.lr = F, this.dr = O) : (this.ur = C, this.lr = R, this.dr = M);
  }
  Rr(t) {
    let e = (t + Math.PI) % (2 * Math.PI);
    return e < 0 && (e += 2 * Math.PI), e - Math.PI;
  }
  Lr(t) {
    if (t.length !== 16 || Math.abs(t[3]) > 1e-6 || Math.abs(t[7]) > 1e-6 || Math.abs(t[11]) > 1e-6 || Math.abs(t[15] - 1) > 1e-6) return !1;
    const e = t[0], s = t[1], i = t[2], n = t[4], h = t[5], a = t[6], c = t[8], l = t[9], u = t[10], f = Math.hypot(e, s, i), d = Math.hypot(n, h, a), p = Math.hypot(c, l, u);
    if (f < 1e-6 || d < 1e-6 || p < 1e-6) return !1;
    const m = e / f, v = s / f, y = i / f, w = n / d, A = h / d, _ = a / d, x = c / p, T = l / p, R = u / p, C = m * x + v * T + y * R, M = w * x + A * T + _ * R;
    return Math.abs(m * w + v * A + y * _) < 1e-4 && Math.abs(C) < 1e-4 && Math.abs(M) < 1e-4;
  }
}
const Ue = 0.4899573262537283;
class fs {
  constructor() {
    o(this, "_s", !1);
    o(this, "Or", 0);
    o(this, "Br", 0);
    o(this, "ts", Ue);
    o(this, "fs", 0.1);
    o(this, "ds", 4096);
    o(this, "Ji", !0);
    o(this, "ss", 0);
    o(this, "es", 0);
    o(this, "rs", 0);
    o(this, "Vi", 0);
    o(this, "Wi", 0);
    o(this, "Yi", 0);
    o(this, "Ki", 0);
    o(this, "$i", 1);
    o(this, "qi", 0);
  }
  wr(t) {
    t._s = this._s, t.Or = this.Or, t.Br = this.Br, t.ts = this.ts, t.fs = this.fs, t.ds = this.ds, t.Ji = this.Ji, t.ss = this.ss, t.es = this.es, t.rs = this.rs, t.Vi = this.Vi, t.Wi = this.Wi, t.Yi = this.Yi, t.Ki = this.Ki, t.$i = this.$i, t.qi = this.qi;
  }
  Ar(t) {
    this._s = t._s, this.Or = t.Or, this.Br = t.Br, this.ts = t.ts, this.fs = t.fs, this.ds = t.ds, this.Ji = t.Ji, this.ss = t.ss, this.es = t.es, this.rs = t.rs, this.Vi = t.Vi, this.Wi = t.Wi, this.Yi = t.Yi, this.Ki = t.Ki, this.$i = t.$i, this.qi = t.qi;
  }
  Ir(t) {
    if (t)
      return this._s ? void 0 : (this._s = !0, void this.Or++);
    this._s && (this._s = !1, this.Or++);
  }
  gs(t, e, s) {
    let i = !1;
    if (t !== void 0) {
      const n = V(Math.max(1, Math.min(179, t)));
      this.ts !== n && (this.ts = n, i = !0);
    }
    e === void 0 && s === void 0 || (i = this.jr(e, s) || i), this._s && (this._s = !1, i = !0), i && this.Or++;
  }
  ps(t, e) {
    let s = !1;
    s = this.jr(t, e) || s, this._s || (this._s = !0, s = !0), s && this.Or++;
  }
  hs(t, e, s, i = 0, n = 0, h = 0, a = 0, c = 1, l = 0) {
    (this.Ji || this.ss !== t || this.es !== e || this.rs !== s || this.Vi !== i || this.Wi !== n || this.Yi !== h || this.Ki !== a || this.$i !== c || this.qi !== l) && (this.Ji = !1, this.ss = t, this.es = e, this.rs = s, this.Vi = i, this.Wi = n, this.Yi = h, this.Ki = a, this.$i = c, this.qi = l, this.Br++);
  }
  ws(t, e, s, i, n, h) {
    let a = this.Vi !== t || this.Wi !== e || this.Yi !== s;
    i !== void 0 && this.Ki !== i && (this.Ki = i, a = !0), n !== void 0 && this.$i !== n && (this.$i = n, a = !0), h !== void 0 && this.qi !== h && (this.qi = h, a = !0), a && (this.Vi = t, this.Wi = e, this.Yi = s, this.Br++);
  }
  vs() {
    (!this.Ji || this.ss !== 0 || this.es !== 0 || this.rs !== 0 || this.Vi !== 0 || this.Wi !== 0 || this.Yi !== 0 || this.Ki !== 0 || this.$i !== 1 || this.qi !== 0) && (this.Ji = !0, this.ss = 0, this.es = 0, this.rs = 0, this.Vi = 0, this.Wi = 0, this.Yi = 0, this.Ki = 0, this.$i = 1, this.qi = 0, this.Br++);
  }
  zr() {
    this._s && (this._s = !1, this.Or++);
  }
  jr(t, e) {
    if (t === void 0 && e === void 0) return !1;
    const s = t === void 0 ? this.fs : Math.max(1e-4, t), i = s + 1e-4, n = e === void 0 ? Math.max(this.ds, i) : Math.max(i, e);
    return (s !== this.fs || n !== this.ds) && (this.fs = s, this.ds = n, !0);
  }
}
const tt = 15;
class ds {
  constructor() {
    o(this, "Hr", new Float32Array(3));
    o(this, "Qr", 0);
    o(this, "Nr", new Float32Array(tt));
    o(this, "Xr", new Float32Array(tt));
    o(this, "Gr", new Float32Array([1, 0, 0]));
    o(this, "Vr", !1);
    o(this, "Zr", 0);
  }
  wr(t) {
    t.Hr[0] = this.Hr[0], t.Hr[1] = this.Hr[1], t.Hr[2] = this.Hr[2], t.Qr = this.Qr, t.Vr = this.Vr, t.Zr = this.Zr;
    for (let e = 0; e < tt; e++) t.Nr[e] = this.Nr[e], t.Xr[e] = this.Xr[e];
    t.Gr[0] = this.Gr[0], t.Gr[1] = this.Gr[1], t.Gr[2] = this.Gr[2];
  }
  Ar(t) {
    this.Hr[0] = t.Hr[0], this.Hr[1] = t.Hr[1], this.Hr[2] = t.Hr[2], this.Qr = t.Qr, this.Vr = t.Vr, this.Zr = t.Zr;
    for (let e = 0; e < tt; e++) this.Nr[e] = t.Nr[e], this.Xr[e] = t.Xr[e];
    this.Gr[0] = t.Gr[0], this.Gr[1] = t.Gr[1], this.Gr[2] = t.Gr[2];
  }
  Wr(t, e, s) {
    this.Vr = !0, this.Hr[0] += t, this.Hr[1] += e, this.Hr[2] += s, this.Zr++;
  }
  Yr(t, e, s, i, n, h) {
    if (this.Qr >= 5) return;
    this.Vr = !0;
    const a = 3 * this.Qr;
    this.Nr[a] = i, this.Nr[a + 1] = n, this.Nr[a + 2] = h, this.Xr[a] = t, this.Xr[a + 1] = e, this.Xr[a + 2] = s, this.Qr++, this.Zr++;
  }
  Kr(t, e, s) {
    let i = Math.max(0, t);
    const n = Math.max(0, e), h = Math.max(0, s);
    i === 0 && n === 0 && h === 0 && (i = 1), this.Gr[0] === i && this.Gr[1] === n && this.Gr[2] === h || (this.Gr[0] = i, this.Gr[1] = n, this.Gr[2] = h, this.Zr++);
  }
  $r() {
    const t = this.Hr[0] !== 0 || this.Hr[1] !== 0 || this.Hr[2] !== 0, e = this.Qr > 0, s = this.Vr || t || e, i = this.Gr[0] !== 1 || this.Gr[1] !== 0 || this.Gr[2] !== 0;
    if (s || i) {
      this.Vr = !1, this.Hr[0] = 0, this.Hr[1] = 0, this.Hr[2] = 0, this.Qr = 0;
      for (let n = 0; n < tt; n++) this.Nr[n] = 0, this.Xr[n] = 0;
      this.Gr[0] = 1, this.Gr[1] = 0, this.Gr[2] = 0, this.Zr++;
    }
  }
  te() {
    const t = this.Hr[0] !== 0 || this.Hr[1] !== 0 || this.Hr[2] !== 0;
    if (this.Qr !== 0 || t || this.Vr) {
      this.Vr = !1, this.Hr[0] = 0, this.Hr[1] = 0, this.Hr[2] = 0, this.Qr = 0;
      for (let e = 0; e < tt; e++) this.Nr[e] = 0, this.Xr[e] = 0;
      this.Zr++;
    }
  }
}
function Pt(r, t, e, s, i = 255) {
  r[0] = t / 255, r[1] = (e ?? t) / 255, r[2] = (s ?? t) / 255, r[3] = i / 255;
}
class ps {
  constructor() {
    o(this, "qr", 1);
    o(this, "Jr", [1, 1, 0]);
    o(this, "tn", "");
    o(this, "sn", [1, 1, 1, 1]);
    o(this, "en", [0, 0, 0, 1]);
    o(this, "rn", !1);
    o(this, "nn", !1);
    o(this, "hn", !1);
    o(this, "an", 0);
    o(this, "cn", [0, 0, 0, 1]);
  }
  wr(t) {
    t.un = this.qr, t.ln = this.rn, t.dn = this.nn, t.hn = this.hn, t.an = this.an, t._n[0] = this.Jr[0], t._n[1] = this.Jr[1], t._n[2] = this.Jr[2], t.pn = this.tn, t.mn[0] = this.sn[0], t.mn[1] = this.sn[1], t.mn[2] = this.sn[2], t.mn[3] = this.sn[3], t.gn[0] = this.en[0], t.gn[1] = this.en[1], t.gn[2] = this.en[2], t.gn[3] = this.en[3];
  }
  Ar(t) {
    this.qr = t.un, this.rn = t.ln, this.nn = t.dn, this.hn = t.hn, this.an = t.an, this.Jr[0] = t._n[0], this.Jr[1] = t._n[1], this.Jr[2] = t._n[2], this.tn = t.pn, this.sn[0] = t.mn[0], this.sn[1] = t.mn[1], this.sn[2] = t.mn[2], this.sn[3] = t.mn[3], this.en[0] = t.gn[0], this.en[1] = t.gn[1], this.en[2] = t.gn[2], this.en[3] = t.gn[3];
  }
  vn(t) {
    this.qr = Math.abs(t);
  }
  yn(t) {
    this.Jr[0] = t[0], this.Jr[1] = t[1], this.Jr[2] = t[2];
  }
  wn(t) {
    this.tn = t;
  }
  An(t, e, s, i = 255) {
    Pt(this.sn, t, e, s, i);
  }
  bn(t, e, s, i = 255) {
    Pt(this.en, t, e, s, i);
  }
  Mn(t) {
    this.rn = t;
  }
  Cn(t) {
    this.nn = t;
  }
  xn(t) {
    this.hn = t;
  }
  Fn(t) {
    this.an = $t(t);
  }
  Pn(t, e, s, i) {
    Pt(this.cn, t, e, s, i);
  }
}
class Ot {
  constructor() {
    o(this, "Sn", new ls());
    o(this, "Zi", new fs());
    o(this, "ie", new ds());
    o(this, "_n", new ps());
    o(this, "Tn", []);
    o(this, "En", []);
  }
  static kn() {
    return { un: 1, hr: 0, ar: 0, cr: 0, ur: 0, lr: 0, dr: 0, _r: 1, pr: 1, mr: 1, gr: j(), an: 0, ln: !1, dn: !1, hn: !1, _s: !1, Or: 0, Br: 0, ts: Ue, fs: 0.1, ds: 4096, Ji: !0, ss: 0, es: 0, rs: 0, Vi: 0, Wi: 0, Yi: 0, Ki: 0, $i: 1, qi: 0, Qr: 0, Nr: new Float32Array(15), Xr: new Float32Array(15), Hr: new Float32Array(3), Gr: new Float32Array([1, 0, 0]), Vr: !1, Zr: 0, _n: [1, 1, 0], pn: "", mn: [1, 1, 1, 1], gn: [0, 0, 0, 1] };
  }
  Ln(t) {
    this.Sn.wr(t), this.Zi.wr(t), this.ie.wr(t), this._n.wr(t);
  }
  Dn(t) {
    this.Sn.Ar(t), this.Zi.Ar(t), this.ie.Ar(t), this._n.Ar(t);
  }
  Ie() {
    let t = this.En.pop();
    t || (t = Ot.kn()), this.Ln(t), this.Tn.push(t);
  }
  je() {
    const t = this.Tn.pop();
    t ? (this.Dn(t), this.En.push(t)) : console.warn("pop() called without matching push()");
  }
  se() {
    this.Sn.Er(), this.Zi.zr();
  }
}
var E = ((r) => (r.RECTANGLE = "rectangle", r.LINE = "line", r.ELLIPSE = "ellipse", r.ARC = "arc", r.TRIANGLE = "triangle", r.BEZIER_CURVE = "bezier_curve", r.BOX = "box", r.SPHERE = "sphere", r.TORUS = "torus", r.CONE = "cone", r.CYLINDER = "cylinder", r.ELLIPSOID = "ellipsoid", r))(E || {});
const gs = { rectangle: 2, line: 2, ellipse: 2, triangle: 2, arc: 3, bezier_curve: 4, box: 5, sphere: 6, torus: 7, cone: 8, cylinder: 5, ellipsoid: 6 }, te = new Float32Array([-0.5, -0.5, 0, 0, 0.5, -0.5, 1, 0, -0.5, 0.5, 0, 1, -0.5, 0.5, 0, 1, 0.5, -0.5, 1, 0, 0.5, 0.5, 1, 1]), $ = { Rn: 16, On: { Bn: { size: 2, offset: 0 }, In: { size: 2, offset: 8 } } };
class ms {
  constructor(t) {
    o(this, "Ce");
    o(this, "jn");
    o(this, "zn");
    this.Ce = t, this.jn = t.createBuffer(), this.zn = new Float32Array(te.length);
  }
  Hn(t, e, s, i) {
    const n = this.Ce, h = Le(this.Ce), a = h[2], c = h[3], l = t / a * 2 - 1, u = (t + s) / a * 2 - 1, f = 1 - (e + i) / c * 2, d = 1 - e / c * 2, p = te, m = this.zn;
    for (let v = 0; v < p.length; v += 4) {
      const y = p[v], w = p[v + 1], A = p[v + 2], _ = p[v + 3], x = l + (y + 0.5) * (u - l), T = f + (w + 0.5) * (d - f);
      m[v] = x, m[v + 1] = T, m[v + 2] = A, m[v + 3] = _;
    }
    n.bindBuffer(n.ARRAY_BUFFER, this.jn), n.bufferData(n.ARRAY_BUFFER, m, n.DYNAMIC_DRAW), ut(n, 0, 2, 16, 0), ut(n, 1, 2, 16, 8), n.drawArrays(n.TRIANGLES, 0, 6), n.disableVertexAttribArray(1), n.disableVertexAttribArray(0), n.bindBuffer(n.ARRAY_BUFFER, null);
  }
  k() {
    this.Ce.deleteBuffer(this.jn);
  }
}
class vs {
  constructor(t) {
    o(this, "Ce");
    o(this, "Qn", /* @__PURE__ */ new Map());
    o(this, "Nn", null);
    this.Ce = t;
  }
  Xn(t, e, s, i, n) {
    const h = this.Ce, a = t.program;
    let c = this.Qn.get(t);
    c || (c = /* @__PURE__ */ new Map(), this.Qn.set(t, c), t.D(() => this.Gn(t)));
    let l = c.get(e) || null;
    if (l) this.Nn !== l && (h.bindVertexArray(l), this.Nn = l);
    else {
      l = h.createVertexArray(), c.set(e, l), h.bindVertexArray(l), this.Nn = l, h.bindBuffer(h.ARRAY_BUFFER, i), n && h.bindBuffer(h.ELEMENT_ARRAY_BUFFER, n);
      const u = h.getAttribLocation(a, "A0");
      u !== -1 && ut(h, u, s.On.Bn.size, s.Rn, s.On.Bn.offset, 0, h.FLOAT, !1);
      const f = h.getAttribLocation(a, "A1");
      f !== -1 && ut(h, f, s.On.In.size, s.Rn, s.On.In.offset, 0, h.FLOAT, !1);
    }
  }
  Gn(t) {
    const e = this.Qn.get(t);
    if (e) {
      for (const [, s] of e) s && this.Ce.deleteVertexArray(s);
      this.Qn.delete(t);
    }
  }
  Vn() {
    this.Nn !== null && (this.Ce.bindVertexArray(null), this.Nn = null);
  }
  k() {
    for (const [, t] of this.Qn) for (const [, e] of t) e && this.Ce.deleteVertexArray(e);
    this.Qn.clear();
  }
}
class z {
}
o(z, "BYTES_PER_INSTANCE", 144), o(z, "FLOATS_PER_INSTANCE", 36);
function I(r, t) {
  return { location: -1, size: r, stride: z.BYTES_PER_INSTANCE, offset: t, divisor: 1 };
}
class Dt {
}
o(Dt, "STRIDE", z.BYTES_PER_INSTANCE), o(Dt, "ATTRIBUTES", { A2: I(2, 0), A3: I(2, 8), A4: I(3, 16), A5: I(4, 28), A6: I(4, 44), A7: I(4, 60), A8: I(3, 76), A9: I(3, 88), Ab: I(4, 100), Ac: I(4, 116), Aa: I(3, 132) });
class ys {
  constructor(t = 1e3, e = 1.5) {
    o(this, "Zn");
    o(this, "Wn");
    o(this, "Yn");
    o(this, "Kn", 0);
    o(this, "$n", 0);
    this.Wn = t, this.Yn = e;
    const s = t * z.FLOATS_PER_INSTANCE;
    this.Zn = new Float32Array(s);
  }
  qn(t) {
    if (t <= this.Wn) return;
    const e = Math.ceil(t * this.Yn), s = this.Wn;
    this.Wn = e;
    const i = new Float32Array(e * z.FLOATS_PER_INSTANCE), n = s * z.FLOATS_PER_INSTANCE;
    i.set(this.Zn.subarray(0, Math.min(n, this.Kn))), this.Zn = i;
  }
  Jn(t) {
    this.Kn += t, this.$n++;
  }
  th() {
    this.Kn = 0, this.$n = 0;
  }
  ih(t = 0, e) {
    return this.Zn.subarray(t, e ?? this.Kn);
  }
}
class ws {
  constructor(t) {
    o(this, "Zn");
    this.Zn = t;
  }
  sh(t) {
    this.Zn.$n >= this.Zn.Wn && this.Zn.qn(this.Zn.$n + 1);
    const e = this.Zn.Zn, s = this.Zn.Kn;
    e[s + 0] = t.x, e[s + 1] = t.y, e[s + 2] = t.width, e[s + 3] = t.height, e[s + 4] = t.char0, e[s + 5] = t.char1, e[s + 6] = t.char2, e[s + 7] = t.r1, e[s + 8] = t.g1, e[s + 9] = t.b1, e[s + 10] = t.a1, e[s + 11] = t.r2, e[s + 12] = t.g2, e[s + 13] = t.b2, e[s + 14] = t.a2, e[s + 15] = t.invert, e[s + 16] = t.flipX, e[s + 17] = t.flipY, e[s + 18] = t.charRot, e[s + 19] = t.translationX, e[s + 20] = t.translationY, e[s + 21] = t.translationZ, e[s + 22] = t.rotationX, e[s + 23] = t.rotationY, e[s + 24] = t.rotationZ;
    const i = t.curveParams0, n = t.curveParams1;
    return e[s + 25] = i[0], e[s + 26] = i[1], e[s + 27] = i[2], e[s + 28] = i[3], e[s + 29] = n[0], e[s + 30] = n[1], e[s + 31] = n[2], e[s + 32] = n[3], e[s + 33] = t.depth, e[s + 34] = t.baseZ, e[s + 35] = t.geometryType, this.Zn.Jn(z.FLOATS_PER_INSTANCE), this.Zn.$n - 1;
  }
}
class _s {
  constructor(t, e = 1e3) {
    o(this, "Ce");
    o(this, "eh", null);
    o(this, "rh", 0);
    o(this, "nh", /* @__PURE__ */ new WeakMap());
    o(this, "hh", 0);
    o(this, "oh", /* @__PURE__ */ new WeakMap());
    this.Ce = t, this.ah(e);
  }
  ah(t) {
    const e = this.Ce;
    this.eh && e.deleteBuffer(this.eh), this.hh++, this.eh = e.createBuffer();
    const s = t * z.BYTES_PER_INSTANCE;
    qt(e, e.ARRAY_BUFFER, this.eh, s, e.DYNAMIC_DRAW), this.rh = t;
  }
  uh(t) {
    this.ah(t);
  }
  Y(t, e) {
    if (e === 0) return;
    const s = this.Ce;
    s.bindBuffer(s.ARRAY_BUFFER, this.eh), s.bufferSubData(s.ARRAY_BUFFER, 0, t, 0, e);
  }
  fh(t) {
    let e = this.nh.get(t);
    if (!e) {
      e = /* @__PURE__ */ new Map();
      const s = this.Ce;
      for (const i in Dt.ATTRIBUTES) {
        const n = i, h = s.getAttribLocation(t, n);
        h !== -1 && e.set(n, h);
      }
      this.nh.set(t, e);
    }
    return e;
  }
  dh(t) {
    const e = this.Ce, s = t.program;
    if (this.oh.get(s) === this.hh) return;
    const i = this.fh(s);
    for (const [n, h] of i) {
      const a = Dt.ATTRIBUTES[n];
      a && ut(e, h, a.size, a.stride, a.offset, a.divisor);
    }
    this.oh.set(s, this.hh);
  }
  k() {
    this.eh && (this.Ce.deleteBuffer(this.eh), this.eh = null);
  }
}
class As {
  constructor(t, e = 1e3, s = 1.5) {
    o(this, "Ce");
    o(this, "Zn");
    o(this, "_h");
    o(this, "ph");
    this.Ce = t, this.Zn = new ys(e, s), this._h = new ws(this.Zn), this.ph = new _s(t, e);
  }
  mh() {
    this.Zn.Wn > this.ph.rh && this.ph.uh(this.Zn.Wn);
  }
  get writer() {
    return this._h;
  }
  gh() {
    this.Zn.th();
  }
  dh(t) {
    this.Zn.$n !== 0 && (this.mh(), this.ph.Y(this.Zn.Zn, this.Zn.Kn), this.ph.dh(t));
  }
  Hn(t, e) {
    const s = this.Zn.$n;
    s !== 0 && this.Ce.drawArraysInstanced(t, 0, e, s);
  }
  yh(t, e, s, i = 0) {
    const n = this.Zn.$n;
    n !== 0 && this.Ce.drawElementsInstanced(t, e, s, i, n);
  }
  k() {
    this.ph.k();
  }
}
class J {
  constructor(t, e, s, i) {
    o(this, "Ce");
    o(this, "wh");
    o(this, "Ah");
    o(this, "bh");
    o(this, "Mh", null);
    o(this, "Ch", null);
    o(this, "xh", [0, 0, 0, 0]);
    o(this, "Fh", [0, 0, 0, 0]);
    o(this, "Ph");
    var n, h;
    this.Ce = t, this.wh = e, this.Ah = s, this.bh = i, this.Ph = (n = this.xh, h = this.Fh, { x: 0, y: 0, width: 0, height: 0, char0: 0, char1: 0, char2: 0, r1: 0, g1: 0, b1: 0, a1: 0, r2: 0, g2: 0, b2: 0, a2: 0, invert: 0, flipX: 0, flipY: 0, charRot: 0, translationX: 0, translationY: 0, translationZ: 0, rotationX: 0, rotationY: 0, rotationZ: 0, curveParams0: n, curveParams1: h, depth: 0, baseZ: 0, geometryType: 0 });
    const a = this.Ce.createBuffer();
    if (qt(this.Ce, this.Ce.ARRAY_BUFFER, a, this.bh.Sh, this.Ce.STATIC_DRAW), this.Mh = a, this.bh.Th) {
      const c = this.Ce.createBuffer();
      qt(this.Ce, this.Ce.ELEMENT_ARRAY_BUFFER, c, this.bh.Th, this.Ce.STATIC_DRAW), this.Ch = c;
    }
  }
  get type() {
    return this.Ah;
  }
  get unitGeometry() {
    return this.bh;
  }
  get unitBuffer() {
    return this.Mh;
  }
  get unitIndexBuffer() {
    return this.Ch;
  }
  get batch() {
    return this.wh;
  }
  Eh() {
    this.wh.gh();
  }
  Uh() {
    return this.wh.Zn.$n !== 0;
  }
  k() {
    this.wh.k(), this.Ce.deleteBuffer(this.Mh), this.Ch && this.Ce.deleteBuffer(this.Ch);
  }
  sh(t, e, s, i, n, h, a) {
    const c = n.hr ?? 0, l = n.ar ?? 0, u = n.cr ?? 0, f = n.ur ?? 0, d = n.lr ?? 0, p = a ?? n.dr ?? 0, m = n._r ?? 1, v = n.pr ?? 1, y = n.mr ?? 1, w = this.xh, A = this.Fh;
    w[0] = 0, w[1] = 0, w[2] = 0, w[3] = 0, A[0] = 0, A[1] = 0, A[2] = 0, A[3] = 0, h && (h.bezStartX !== void 0 && h.bezStartY !== void 0 && h.bezEndX !== void 0 && h.bezEndY !== void 0 ? (w[0] = h.cp1x ?? 0, w[1] = h.cp1y ?? 0, w[2] = h.cp2x ?? 0, w[3] = h.cp2y ?? 0, A[0] = h.bezStartX ?? 0, A[1] = h.bezStartY ?? 0, A[2] = h.bezEndX ?? 0, A[3] = h.bezEndY ?? 0) : h.arcStart === void 0 && h.arcStop === void 0 || (w[0] = h.arcStart ?? 0, w[1] = h.arcStop ?? 0));
    const _ = this.Ph;
    return _.x = t * m, _.y = e * v, _.width = s * m, _.height = i * v, _.char0 = n._n[0], _.char1 = n._n[1], _.char2 = n._n[2], _.r1 = n.mn[0], _.g1 = n.mn[1], _.b1 = n.mn[2], _.a1 = n.mn[3], _.r2 = n.gn[0], _.g2 = n.gn[1], _.b2 = n.gn[2], _.a2 = n.gn[3], _.invert = n.hn ? 1 : 0, _.flipX = n.ln ? 1 : 0, _.flipY = n.dn ? 1 : 0, _.charRot = n.an, _.translationX = c, _.translationY = l, _.translationZ = u, _.rotationX = f, _.rotationY = d, _.rotationZ = p, _.depth = ((h == null ? void 0 : h.depth) ?? 0) * y, _.baseZ = ((h == null ? void 0 : h.baseZ) ?? 0) * y, _.geometryType = gs[this.Ah] ?? 0, this.wh.writer.sh(_);
  }
}
const bs = { Sh: te, kh: 6, ...$ };
class xs extends J {
  constructor(t, e) {
    super(t, e, E.RECTANGLE, bs);
  }
  Lh(t, e) {
    return this.sh(0, 0, t.width, t.height, e);
  }
}
const Es = { Sh: new Float32Array([0, -0.5, 0, 0, 1, -0.5, 1, 0, 0, 0.5, 0, 1, 0, 0.5, 0, 1, 1, -0.5, 1, 0, 1, 0.5, 1, 1]), kh: 6, ...$ };
class Cs extends J {
  constructor(t, e) {
    super(t, e, E.LINE, Es);
  }
  Lh(t, e) {
    const s = t.x2 - t.x1, i = t.y2 - t.y1, n = Math.hypot(s, i), h = Math.atan2(i, s), a = e.un || 1, c = Math.cos(-h), l = Math.sin(-h), u = t.x1 * c - t.y1 * l, f = t.x1 * l + t.y1 * c;
    return this.sh(u, f, n, a, e, null, (e.dr || 0) + h);
  }
}
const Ts = { Sh: (function(r = 32) {
  const t = [], e = 2 * Math.PI / r;
  for (let s = 0; s < r; s++) {
    const i = s * e, n = (s + 1) % r * e, h = Math.cos(i), a = Math.sin(i), c = 0.5 * (h + 1), l = 0.5 * (a + 1), u = Math.cos(n), f = Math.sin(n), d = 0.5 * (u + 1), p = 0.5 * (f + 1);
    t.push(0, 0, 0.5, 0.5, h, a, c, l, u, f, d, p);
  }
  return new Float32Array(t);
})(32), kh: 96, ...$ };
class Ms extends J {
  constructor(t, e) {
    super(t, e, E.ELLIPSE, Ts);
  }
  Lh(t, e) {
    return this.sh(0, 0, t.width, t.height, e);
  }
}
const Ss = { Sh: (function(r) {
  const t = [];
  for (let e = 0; e < r; e++) {
    const s = e / r, i = (e + 1) / r;
    t.push(s, 0, s, 0, s, 1, s, 1, i, 1, i, 1);
  }
  return new Float32Array(t);
})(32), kh: 96, ...$ };
class Xs extends J {
  constructor(t, e) {
    super(t, e, E.ARC, Ss);
  }
  Lh(t, e) {
    const s = V(t.start), i = V(t.stop);
    return this.sh(0, 0, t.width, t.height, e, { arcStart: s, arcStop: i });
  }
}
const Ps = { Sh: new Float32Array([0, 0, 0, 0, 1, 0, 1, 0, 0.5, 1, 0.5, 1]), kh: 3, ...$ };
class Rs extends J {
  constructor(t, e) {
    super(t, e, E.TRIANGLE, Ps);
  }
  Lh(t, e) {
    const s = Math.min(t.x1, t.x2, t.x3), i = Math.max(t.x1, t.x2, t.x3), n = Math.min(t.y1, t.y2, t.y3), h = i - s, a = Math.max(t.y1, t.y2, t.y3) - n;
    return this.sh(s, n, h, a, e);
  }
}
const Fs = { Sh: (function(r = 16) {
  const t = [];
  for (let e = 0; e < r; e++) {
    const s = e / r, i = (e + 1) / r;
    t.push(s, -0.5, s, 0, i, -0.5, i, 0, s, 0.5, s, 1, s, 0.5, s, 1, i, -0.5, i, 0, i, 0.5, i, 1);
  }
  return new Float32Array(t);
})(16), kh: 96, ...$ };
class Ls extends J {
  constructor(t, e) {
    super(t, e, E.BEZIER_CURVE, Fs);
  }
  Lh(t, e) {
    return this.sh(0, 0, 1, e.un || 1, e, { cp1x: t.cp1x, cp1y: t.cp1y, cp2x: t.cp2x, cp2y: t.cp2y, bezStartX: t.x1, bezStartY: t.y1, bezEndX: t.x2, bezEndY: t.y2 });
  }
}
class et extends J {
  constructor(t, e, s, i) {
    super(t, e, s, (function(n) {
      return { Sh: n.vertices, Th: n.indices, kh: n.vertices.length / 4, Dh: n.indices.length, ...$ };
    })(i));
  }
  Lh(t, e) {
    return this.sh(0, 0, t.width, t.height, e, { depth: t.depth });
  }
}
const Us = { vertices: new Float32Array([-0.5, -0.5, 0.5, 0, 0.5, -0.5, 0.5, 0, 0.5, 0.5, 0.5, 0, -0.5, 0.5, 0.5, 0, 0.5, -0.5, -0.5, 0, -0.5, -0.5, -0.5, 0, -0.5, 0.5, -0.5, 0, 0.5, 0.5, -0.5, 0, -0.5, -0.5, -0.5, 0, -0.5, -0.5, 0.5, 0, -0.5, 0.5, 0.5, 0, -0.5, 0.5, -0.5, 0, 0.5, -0.5, 0.5, 0, 0.5, -0.5, -0.5, 0, 0.5, 0.5, -0.5, 0, 0.5, 0.5, 0.5, 0, -0.5, 0.5, 0.5, 0, 0.5, 0.5, 0.5, 0, 0.5, 0.5, -0.5, 0, -0.5, 0.5, -0.5, 0, -0.5, -0.5, -0.5, 0, 0.5, -0.5, -0.5, 0, 0.5, -0.5, 0.5, 0, -0.5, -0.5, 0.5, 0]), indices: new Uint16Array([0, 1, 2, 0, 2, 3, 4, 5, 6, 4, 6, 7, 8, 9, 10, 8, 10, 11, 12, 13, 14, 12, 14, 15, 16, 17, 18, 16, 18, 19, 20, 21, 22, 20, 22, 23]) }, me = (function(r = 12, t = 16) {
  const e = [], s = [];
  for (let n = 0; n <= r; n++) {
    const h = n / r * Math.PI, a = Math.sin(h), c = Math.cos(h);
    for (let l = 0; l <= t; l++) {
      const u = l / t * Math.PI * 2, f = Math.sin(u), d = Math.cos(u) * a * 0.5, p = 0.5 * c, m = f * a * 0.5;
      e.push(d, p, m, 0);
    }
  }
  const i = t + 1;
  for (let n = 0; n < r; n++) for (let h = 0; h < t; h++) {
    const a = n * i + h, c = a + i;
    s.push(a, c, a + 1, a + 1, c, c + 1);
  }
  return { vertices: new Float32Array(e), indices: new Uint16Array(s) };
})(14, 20), Ds = (function(r = 16, t = 12) {
  const e = [], s = [];
  for (let n = 0; n <= r; n++) {
    const h = n / r * Math.PI * 2, a = Math.cos(h), c = Math.sin(h);
    for (let l = 0; l <= t; l++) {
      const u = l / t * Math.PI * 2, f = Math.cos(u), d = Math.sin(u);
      e.push(a, c, f, d);
    }
  }
  const i = t + 1;
  for (let n = 0; n < r; n++) for (let h = 0; h < t; h++) {
    const a = n * i + h, c = (n + 1) * i + h;
    s.push(a, c, a + 1, a + 1, c, c + 1);
  }
  return { vertices: new Float32Array(e), indices: new Uint16Array(s) };
})(20, 16), Os = (function(r = 20) {
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
})(24), ks = (function(r = 24) {
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
    const n = (i + 1) % r, h = 2 + i, a = 2 + n, c = s + i, l = s + n;
    e.push(0, a, h), e.push(1, c, l), e.push(h, c, a), e.push(a, c, l);
  }
  return { vertices: new Float32Array(t), indices: new Uint16Array(e) };
})(24), Is = { [E.RECTANGLE]: (r, t) => new xs(r, t), [E.LINE]: (r, t) => new Cs(r, t), [E.ELLIPSE]: (r, t) => new Ms(r, t), [E.ARC]: (r, t) => new Xs(r, t), [E.TRIANGLE]: (r, t) => new Rs(r, t), [E.BEZIER_CURVE]: (r, t) => new Ls(r, t), [E.BOX]: (r, t) => new et(r, t, E.BOX, Us), [E.SPHERE]: (r, t) => new et(r, t, E.SPHERE, me), [E.TORUS]: (r, t) => new et(r, t, E.TORUS, Ds), [E.CONE]: (r, t) => new et(r, t, E.CONE, Os), [E.CYLINDER]: (r, t) => new et(r, t, E.CYLINDER, ks), [E.ELLIPSOID]: (r, t) => new et(r, t, E.ELLIPSOID, me) };
class Bs {
  constructor(t) {
    o(this, "Ce");
    o(this, "Rh");
    o(this, "Oh");
    o(this, "Bh", null);
    o(this, "Ih", /* @__PURE__ */ new Map());
    o(this, "jh", null);
    o(this, "zh", "");
    o(this, "Hh", j());
    o(this, "Qh", j());
    o(this, "Nh", [0, 0, 0]);
    o(this, "Xh", [0, 0, 0]);
    o(this, "Gh", [0, 1, 0]);
    this.Ce = t, this.Oh = new vs(t), this.Rh = /* @__PURE__ */ new Map();
    for (const e of Object.values(E)) {
      const s = new As(t), i = (0, Is[e])(t, s);
      this.Rh.set(e, i);
    }
  }
  Vh(t) {
    this.Bh = null, this.Ih.clear(), this.jh = null, this.zh = "";
    let e = null, s = null, i = null, n = !1, h = -1, a = -1, c = -1, l = null;
    for (const u of t) e === u.material && s === u.type && n === u.state._s && h === u.state.Or && a === u.state.Br && c === u.state.Zr || (i && i.Uh() && this.Zh(i, e, s, l), e = u.material, s = u.type, i = this.Rh.get(s), n = u.state._s, h = u.state.Or, a = u.state.Br, c = u.state.Zr, l = u.state, i.Eh()), i.Lh(u.params, u.state);
    i && i.Uh() && this.Zh(i, e, s, l), this.Oh.Vn();
  }
  Zh(t, e, s, i) {
    this.Bh !== e.shader && (e.shader.sr(), this.Bh = e.shader), this.jh !== e && (e.shader.he(e.uniforms), this.jh = e);
    const n = Le(this.Ce), h = `${i.Or}:${i.Br}:${i.Zr}:${n[2]}:${n[3]}`;
    if (this.Ih.get(e.shader) !== h) {
      const u = `${i.Or}:${i.Br}:${n[2]}:${n[3]}`;
      this.zh !== u && (this.Wh(i, n[2], n[3]), this.zh = u), e.shader.he({ Um: n[2] / n[3], Un: this.Hh, Uo: this.Qh, u_tmUseLighting: i.Vr || i.Qr > 0 || i.Hr[0] !== 0 || i.Hr[1] !== 0 || i.Hr[2] !== 0, u_tmAmbientLightColor: i.Hr, u_tmPointLightCount: i.Qr, u_tmPointLightPositions: i.Nr, u_tmPointLightColors: i.Xr, u_tmLightFalloff: i.Gr }), this.Ih.set(e.shader, h);
    }
    const a = t.unitGeometry, c = t.unitBuffer, l = a.Yh ?? this.Ce.TRIANGLES;
    try {
      this.Oh.Xn(e.shader, s + "", a, c, t.unitIndexBuffer), t.batch.dh(e.shader), a.Th && a.Dh ? t.batch.yh(l, a.Dh, a.Kh ?? this.Ce.UNSIGNED_SHORT, a.$h ?? 0) : t.batch.Hn(l, a.kh);
    } finally {
      t.Eh();
    }
  }
  Wh(t, e, s) {
    const i = Math.max(1, s), n = Math.max(1 / 4096, e / i), h = t.fs, a = t.ds;
    if (this.Xh[0] = t.Vi, this.Xh[1] = t.Wi, this.Xh[2] = t.Yi, this.Gh[0] = t.Ki, this.Gh[1] = t.$i, this.Gh[2] = t.qi, t.Ji) {
      const c = 0.5 * i / Math.tan(0.5 * t.ts);
      this.Nh[0] = this.Xh[0], this.Nh[1] = this.Xh[1], this.Nh[2] = this.Xh[2] + c, pe(this.Nh, this.Xh, this.Gh, this.Hh);
    } else this.Nh[0] = t.ss, this.Nh[1] = t.es, this.Nh[2] = t.rs, pe(this.Nh, this.Xh, this.Gh, this.Hh);
    if (t._s) {
      const c = 0.5 * e, l = 0.5 * i;
      return void (function(u, f, d, p, m, v, y = new Float32Array(16)) {
        const w = 1 / (u - f), A = 1 / (d - p), _ = 1 / (m - v);
        y[0] = -2 * w, y[1] = 0, y[2] = 0, y[3] = 0, y[4] = 0, y[5] = -2 * A, y[6] = 0, y[7] = 0, y[8] = 0, y[9] = 0, y[10] = 2 * _, y[11] = 0, y[12] = (u + f) * w, y[13] = (p + d) * A, y[14] = (v + m) * _, y[15] = 1;
      })(-c, c, -l, l, h, a, this.Qh);
    }
    (function(c, l, u, f, d = new Float32Array(16)) {
      const p = 1 / Math.tan(0.5 * c), m = 1 / (u - f);
      d[0] = p / l, d[1] = 0, d[2] = 0, d[3] = 0, d[4] = 0, d[5] = p, d[6] = 0, d[7] = 0, d[8] = 0, d[9] = 0, d[10] = (f + u) * m, d[11] = -1, d[12] = 0, d[13] = 0, d[14] = 2 * f * u * m, d[15] = 0;
    })(t.ts, n, h, a, this.Qh);
  }
  k() {
    for (const t of this.Rh.values()) t.k();
    this.Rh.clear(), this.Oh.k();
  }
}
const De = "vec3 rotateAroundX(vec3 A,float B){float C=cos(B);float D=sin(B);return vec3(A.x,A.y*C-A.z*D,A.y*D+A.z*C);}vec3 rotateAroundY(vec3 A,float B){float C=cos(B);float D=sin(B);return vec3(A.x*C+A.z*D,A.y,-A.x*D+A.z*C);}vec3 rotateAroundZ(vec3 A,float B){float C=cos(B);float D=sin(B);return vec3(A.x*C-A.y*D,A.x*D+A.y*C,A.z);}vec3 applyRotation(vec3 A,vec3 E){vec3 F=A;if(E.z!=0.0f){F=rotateAroundZ(F,E.z);}if(E.y!=0.0f){F=rotateAroundY(F,E.y);}if(E.x!=0.0f){F=rotateAroundX(F,E.x);}return F;}", Ns = `#version 300 es
in vec2 A0;in vec2 A1;in vec2 A2;in vec2 A3;in vec3 A4;in vec4 A5;in vec4 A6;in vec4 A7;in vec3 A8;in vec3 A9;in vec4 Ab;in vec4 Ac;in vec3 Aa;uniform mat4 Un;uniform mat4 Uo;out vec2 v_uv;out vec3 v_glyphIndex;out vec4 v_glyphColor;out vec4 v_cellColor;out vec4 v_glyphFlags;out vec3 v_worldPosition;out vec3 v_normal;out float v_geometryType;const float A=6.28318530718f;const int B=2;const int C=3;const int D=4;const int E=5;const int F=6;const int G=7;const int H=8;
` + De + `
vec2 I(float J,vec2 K,vec2 L,vec2 M,vec2 N){float O=1.0f-J;float P=O*O;float Q=P*O;float R=J*J;float S=R*J;return Q*K+3.0f*P*J*L+3.0f*O*R*M+S*N;}vec2 T(float J,vec2 K,vec2 L,vec2 M,vec2 N){float O=1.0f-J;float P=O*O;float R=J*J;return-3.0f*P*K+3.0f*(P-2.0f*O*J)*L+3.0f*(2.0f*O*J-R)*M+3.0f*R*N;}void main(){v_uv=A1;v_glyphIndex=A4;v_glyphColor=A5;v_cellColor=A6;v_glyphFlags=A7;vec4 U=Ab;vec4 V=Ac;vec2 W=A3;vec2 X=A2;float Y=Aa.x;float Z=Aa.y;int a=int(Aa.z);vec3 b=vec3(0.0f);if(a==D){float J=clamp(A0.x,0.0f,1.0f);vec2 K=V.xy;vec2 L=U.xy;vec2 M=U.zw;vec2 N=V.zw;vec2 c=I(J,K,L,M,N);vec2 d=T(J,K,L,M,N);float e=length(d);vec2 f=e>0.0f?d/e:vec2(1.0f,0.0f);vec2 g=vec2(-f.y,f.x);vec2 h=c+g*A0.y*W.y;b=vec3(h,Z);}else if(a==C){float i=mod(U.x,A);if(i<0.0f){i+=A;}float j=mod(U.y,A);if(j<0.0f){j+=A;}float k=i-j;if(k<=0.0f){k+=A;}float l=i-A0.x*k;vec2 m=vec2(cos(l),sin(l))*A0.y;vec2 h=m*W+X;b=vec3(h,Z);}else if(a==B){vec2 h=A0.xy*W+X;b=vec3(h,Z);}else if(a==G){float n=max(0.0f,W.x*0.5f);float o=max(0.0f,Y*0.5f);float p=max(0.0f,W.y*0.5f);float q=max(0.0f,n-p);float r=max(0.0f,o-p);float s=A0.x;float t=A0.y;float u=A1.x;float v=A1.y;float w=q+p*u;float x=r+p*u;b=vec3(w*s+X.x,p*v+X.y,x*t+Z);}else if(a==E||a==F||a==H){b=vec3(A0.x*W.x+X.x,A0.y*W.y+X.y,A1.x*Y+Z);}vec3 y=applyRotation(b,A9);vec3 z=y+A8;vec3 AA=vec3(0.0f,0.0f,1.0f);v_worldPosition=z;v_normal=AA;v_geometryType=float(a);vec4 AB=Uo*Un*vec4(z,1.0f);AB.y=-AB.y;gl_Position=AB;}`, ne = `#version 300 es
in vec2 A0;in vec2 A1;in vec2 A2;in vec2 A3;in vec3 A4;in vec4 A5;in vec4 A6;in vec4 A7;in vec3 A8;in vec3 A9;in vec3 Aa;uniform mat4 Un;uniform mat4 Uo;out vec2 v_uv;out vec3 v_glyphIndex;out vec4 v_glyphColor;out vec4 v_cellColor;out vec4 v_glyphFlags;out vec3 v_worldPosition;out vec3 v_normal;out float v_geometryType;const float A=2.0f;
` + De + `
void main(){v_uv=A1;v_glyphIndex=A4;v_glyphColor=A5;v_cellColor=A6;v_glyphFlags=A7;vec2 B=A0.xy*A3+A2;float C=Aa.y;vec3 D=vec3(B,C);vec3 E=applyRotation(D,A9)+A8;v_worldPosition=E;v_normal=vec3(0.0f,0.0f,1.0f);v_geometryType=A;vec4 F=Uo*Un*vec4(E,1.0f);F.y=-F.y;gl_Position=F;}`, he = "uniform bool u_tmUseLighting;uniform vec3 u_tmAmbientLightColor;uniform int u_tmPointLightCount;uniform vec3 u_tmPointLightPositions[5];uniform vec3 u_tmPointLightColors[5];uniform vec3 u_tmLightFalloff;const int TM_MAX_POINT_LIGHTS=5;vec3 tmComputeGeometricNormal(vec3 A){vec3 B=cross(dFdy(A),dFdx(A));float C=length(B);if(C<=0.000001f){return vec3(0.0f,0.0f,1.0f);}return B/C;}vec3 tmApplyLighting(vec3 D,vec3 A){if(!u_tmUseLighting){return D;}vec3 E=D*u_tmAmbientLightColor;if(u_tmPointLightCount>0){vec3 B=tmComputeGeometricNormal(A);for(int F=0;F<TM_MAX_POINT_LIGHTS;F++){if(F>=u_tmPointLightCount){break;}vec3 G=u_tmPointLightPositions[F]-A;float H=length(G);vec3 I=H>0.000001f?G/H:B;float J=max(dot(B,I),0.0f);float K=u_tmLightFalloff.x+H*u_tmLightFalloff.y+H*H*u_tmLightFalloff.z;float L=K>0.0f?1.0f/K:1.0f;E+=D*u_tmPointLightColors[F]*(J*L);}}return clamp(E,0.0f,1.0f);}", zs = `#version 300 es
precision highp float;in vec3 v_glyphIndex;in vec4 v_glyphColor;in vec4 v_cellColor;in vec4 v_glyphFlags;in vec3 v_worldPosition;layout(location=0)out vec4 o_character;layout(location=1)out vec4 o_primaryColor;layout(location=2)out vec4 o_secondaryColor;layout(location=3)out vec4 o_statePayload;
` + he + `
void main(){int A=int(v_glyphFlags.r>0.5?1:0);int B=int(v_glyphFlags.g>0.5?1:0);int C=int(v_glyphFlags.b>0.5?1:0);float D=float(A|(B<<1)|(C<<2))/255.;o_character=vec4(v_glyphIndex.xy,D,clamp(v_glyphFlags.a,0.,1.));vec3 E=tmApplyLighting(v_glyphColor.rgb,v_worldPosition);vec3 F=tmApplyLighting(v_cellColor.rgb,v_worldPosition);o_primaryColor=vec4(E,v_glyphColor.a);o_secondaryColor=vec4(F,v_cellColor.a);o_statePayload=vec4(0.);}`, Zs = `#version 300 es
precision highp float;in vec2 v_uv;in vec3 v_worldPosition;uniform sampler2D U1;uniform sampler2D U2;uniform sampler2D U3;uniform sampler2D U4;uniform vec2 U5;uniform bool U6;uniform bool U7;uniform bool U8;layout(location=0)out vec4 o_character;layout(location=1)out vec4 o_primaryColor;layout(location=2)out vec4 o_secondaryColor;layout(location=3)out vec4 o_statePayload;
` + he + `
void main(){vec2 A=vec2(v_uv.x,1.-v_uv.y);vec2 B=A*U5;vec2 C=(floor(B)+0.5f)/U5;vec4 D=texture(U1,C);vec4 E=U6?texture(U2,C):vec4(0.);if(U6&&E.a==0.){discard;}vec4 F=U7?texture(U3,C):vec4(0.);vec4 G=U8?texture(U4,C):vec4(0.);vec3 H=tmApplyLighting(E.rgb,v_worldPosition);vec3 I=tmApplyLighting(F.rgb,v_worldPosition);o_character=D;o_primaryColor=vec4(H,E.a);o_secondaryColor=vec4(I,F.a);o_statePayload=G;}`;
class Vs {
  constructor(t) {
    o(this, "qh", 0);
    o(this, "ne");
    o(this, "Xe");
    o(this, "Jh");
    this.ne = new lt(t, Ns, zs), this.Xe = new lt(t, ne, Zs), this.Jh = { id: this.qh++, shader: this.ne, uniforms: Object.freeze({}), isBuiltIn: !0 };
  }
  Ge(t, e = {}) {
    return { id: this.qh++, shader: t, uniforms: Object.freeze({ ...e }), isBuiltIn: !1 };
  }
  k() {
    this.ne.dispose(), this.Xe.dispose();
  }
}
class Ys {
  constructor() {
    o(this, "io", []);
    o(this, "so", 1);
    o(this, "eo", 0);
  }
  ro(t, e) {
    if (this.eo >= this.io.length) {
      const i = { id: this.so++, type: t, params: {}, state: Ot.kn(), material: e };
      this.io.push(i);
    }
    const s = this.io[this.eo];
    return s.id = this.so++, s.type = t, s.material = e, this.eo++, s;
  }
  no(t, e, s, i) {
    const n = this.ro(E.RECTANGLE, i), h = n.params;
    return h.width = t, h.height = e, s.Ln(n.state), n.id;
  }
  ho(t, e, s, i, n, h) {
    const a = this.ro(E.LINE, h), c = a.params;
    return c.x1 = t, c.y1 = e, c.x2 = s, c.y2 = i, n.Ln(a.state), a.id;
  }
  oo(t, e, s, i) {
    const n = this.ro(E.ELLIPSE, i), h = n.params;
    return h.width = t, h.height = e, s.Ln(n.state), n.id;
  }
  ao(t, e, s, i, n, h) {
    const a = this.ro(E.ARC, h), c = a.params;
    return c.width = t, c.height = e, c.start = s, c.stop = i, n.Ln(a.state), a.id;
  }
  co(t, e, s, i, n, h, a, c) {
    const l = this.ro(E.TRIANGLE, c), u = l.params;
    return u.x1 = t, u.y1 = e, u.x2 = s, u.y2 = i, u.x3 = n, u.y3 = h, a.Ln(l.state), l.id;
  }
  uo(t, e, s, i, n, h, a, c, l, u) {
    const f = this.ro(E.BEZIER_CURVE, u), d = f.params;
    return d.x1 = t, d.y1 = e, d.cp1x = s, d.cp1y = i, d.cp2x = n, d.cp2y = h, d.x2 = a, d.y2 = c, l.Ln(f.state), f.id;
  }
  lo(t, e, s, i, n, h) {
    const a = this.ro(t, h), c = a.params;
    return c.width = e, c.height = s, c.depth = i, n.Ln(a.state), a.id;
  }
  gh() {
    this.eo = 0;
  }
  [Symbol.iterator]() {
    let t = 0;
    const e = this.eo, s = this.io;
    return { next: () => t < e ? { value: s[t++], done: !1 } : { value: void 0, done: !0 } };
  }
}
class Ks {
  constructor(t) {
    o(this, "Ce");
    o(this, "Bh", null);
    o(this, "fo");
    o(this, "do");
    o(this, "_o");
    o(this, "po");
    o(this, "mo");
    o(this, "vo", null);
    o(this, "yo", {});
    o(this, "wo", []);
    o(this, "Ao", []);
    o(this, "bo", []);
    o(this, "Mo", []);
    o(this, "Co", null);
    o(this, "xo", [0, 0, 0, 0]);
    o(this, "Fo", 1);
    o(this, "Po", !0);
    o(this, "So", !0);
    o(this, "To", !1);
    o(this, "Eo", new Float32Array(4));
    o(this, "ko", /* @__PURE__ */ new Set());
    this.Ce = t, t.enable(t.DEPTH_TEST), t.depthFunc(t.LEQUAL), t.clearDepth(1), t.depthMask(!0), this.Po = !0, this.So = !0, t.disable(t.CULL_FACE), this._o = new Ot(), this.do = new Vs(t), this.po = new Ys(), this.fo = new Bs(t), this.mo = new ms(t);
    const e = [0, 0, t.canvas.width, t.canvas.height];
    Wt(t, e), this.Ao.push(null), this.bo.push(e), this.Mo.push(1), this.Co = null, this.xo = e, this.Fo = 1;
  }
  Oe() {
    this.Ao.push(this.Co), this.bo.push([...this.xo]), this.Mo.push(this.Fo);
  }
  He() {
    const t = this.Ao.pop() ?? null, e = this.bo.pop() ?? [0, 0, this.Ce.canvas.width, this.Ce.canvas.height], s = this.Mo.pop() ?? 1;
    this.Be(t, e[2], e[3], s);
  }
  Be(t, e, s, i = 1) {
    const n = this.Ce;
    this.Co !== t && (n.bindFramebuffer(n.FRAMEBUFFER, t), this.Co = t), this.Fo = i;
    const h = [0, 0, e, s];
    this.xo[0] === h[0] && this.xo[1] === h[1] && this.xo[2] === h[2] && this.xo[3] === h[3] || (n.viewport(...h), Wt(n, h), this.xo = h);
  }
  ne(t) {
    this.Bh !== t && (this.Bh = t, t.sr());
  }
  Lo(t) {
    if (this.To = t, t) this.ko.clear();
    else {
      for (const e of this.ko) e.Do();
      this.ko.clear();
    }
  }
  Ro() {
    return this.To;
  }
  ir(t, e) {
    return new lt(this.Ce, t, e);
  }
  Oo(t) {
    this.vo = t, t && (this.yo = {});
  }
  Bo() {
    this.vo = null, this.yo = {};
  }
  rr(t, e) {
    this.yo[t] = e;
  }
  he(t) {
    Object.assign(this.yo, t);
  }
  Io(t = !1) {
    this.wo.push({ shader: this.vo, uniforms: { ...this.yo } }), t && this.Bo();
  }
  jo() {
    const t = this.wo.pop();
    t && (this.vo = t.shader, this.yo = t.shader ? { ...t.uniforms } : {});
  }
  zo(t) {
    return new lt(this.Ce, ne, t);
  }
  Ho(t, e, s, i) {
    t instanceof nt || !i || t.Qo(i);
    const n = t instanceof nt ? [t.Qe()] : t.No(), h = e ?? t.width, a = s ?? t.height;
    for (const c of n) this.po.no(h, a, this._o, c);
    t instanceof nt || !t.Xo() || this.ko.add(t);
  }
  oe(t, e, s, i) {
    this.mo.Hn(t, e, s, i);
  }
  Go(t, e) {
    let s = this.do.Jh;
    this.vo && (s = this.do.Ge(this.vo, this.yo)), this.po.no(t, e, this._o, s);
  }
  Vo(t, e, s, i) {
    this.po.ho(t, e, s, i, this._o, this.do.Jh);
  }
  Zo(t, e) {
    this.po.oo(t, e, this._o, this.do.Jh);
  }
  Wo(t, e, s, i, n, h) {
    this.po.co(t, e, s, i, n, h, this._o, this.do.Jh);
  }
  Yo(t, e, s, i, n, h, a, c) {
    this.po.uo(t, e, s, i, n, h, a, c, this._o, this.do.Jh);
  }
  Ko(t, e, s, i) {
    this.po.ao(t, e, s, i, this._o, this.do.Jh);
  }
  $o(t, e, s) {
    this.po.lo(E.BOX, t, e, s, this._o, this.do.Jh);
  }
  qo(t) {
    const e = 2 * t;
    this.po.lo(E.SPHERE, e, e, e, this._o, this.do.Jh);
  }
  Jo(t, e) {
    const s = 2 * (t + e);
    this.po.lo(E.TORUS, s, 2 * e, s, this._o, this.do.Jh);
  }
  ta(t, e) {
    const s = 2 * t;
    this.po.lo(E.CONE, s, e, s, this._o, this.do.Jh);
  }
  ia(t, e) {
    const s = 2 * t;
    this.po.lo(E.CYLINDER, s, e, s, this._o, this.do.Jh);
  }
  sa(t, e, s) {
    this.po.lo(E.ELLIPSOID, 2 * t, 2 * e, 2 * s, this._o, this.do.Jh);
  }
  K(t, e, s = 1, i = {}) {
    return new nt(this.Ce, t, e, s, i, this);
  }
  ea(t, e = t, s = t, i = 255) {
    this._o._n.Pn(t, e ?? t, s ?? t, i);
    const [n, h, a, c] = this._o._n.cn;
    this.ra(n, h, a, c);
  }
  gh(t = 0, e = 0, s = 0, i = 0) {
    this.ra(t, e, s, i);
  }
  ra(t, e, s, i) {
    const n = this.Ce, h = this.Eo;
    if (this.Fo > 1) {
      h[0] = 1, h[1] = 1, h[2] = 0, h[3] = 0, n.clearBufferfv(n.COLOR, 0, h), h[0] = 0, h[1] = 0, h[2] = 0, h[3] = 0, n.clearBufferfv(n.COLOR, 1, h), this.Fo >= 3 && (h[0] = t, h[1] = e, h[2] = s, h[3] = i, n.clearBufferfv(n.COLOR, 2, h)), this.Fo >= 3 && (h[0] = 0, h[1] = 0, h[2] = 0, h[3] = 0);
      for (let a = 3; a < this.Fo; a++) n.clearBufferfv(n.COLOR, a, h);
    } else n.clearColor(t, e, s, i), n.clear(n.COLOR_BUFFER_BIT);
  }
  na() {
    const t = [0, 0, this.Ce.canvas.width, this.Ce.canvas.height];
    this.Ce.viewport(...t), Wt(this.Ce, t), this.xo = t, this.bo.length > 0 && (this.bo[0] = t);
  }
  ha(t) {
    this.Po !== t && (t ? this.Ce.enable(this.Ce.DEPTH_TEST) : this.Ce.disable(this.Ce.DEPTH_TEST), this.Po = t);
  }
  oa(t) {
    this.So !== t && (this.Ce.depthMask(t), this.So = t);
  }
  aa() {
    return this.Po;
  }
  ca() {
    return this.So;
  }
  ze() {
    const t = this.po;
    this.fo.Vh(t), t.gh(), this.Bh = null;
  }
  k() {
    this.do.k(), this.fo.k(), this.mo.k();
  }
  get context() {
    return this.Ce;
  }
  get state() {
    return this._o;
  }
  get materialManager() {
    return this.do;
  }
}
class Ws {
  constructor(t = {}) {
    o(this, "p");
    o(this, "ua", null);
    o(this, "la", !1);
    o(this, "fa");
    o(this, "da", null);
    o(this, "_a", !0);
    o(this, "Ce", null);
    o(this, "pa", null);
    o(this, "ma", null);
    o(this, "ga", !1);
    if (this.la = t.overlay ?? !1, t.gl) this.da = t.gl, this.p = t.gl.canvas, this.fa = !1, this._a = !1;
    else if (this.la && t.canvas) this.ua = t.canvas, this.p = this.va(), this.fa = !0, this.ya();
    else if (t.canvas) {
      if (typeof HTMLVideoElement < "u" && t.canvas instanceof HTMLVideoElement) throw new b("Video elements are only supported in overlay mode.");
      this.p = t.canvas, this.fa = !1;
    } else this.p = this.wa(t.width, t.height), this.fa = !0;
    typeof HTMLCanvasElement < "u" && this.p instanceof HTMLCanvasElement && (this.p.style.imageRendering = "pixelated");
  }
  wa(t, e) {
    const s = document.createElement("canvas");
    return s.className = "textmodeCanvas", s.style.imageRendering = "pixelated", s.width = t || 800, s.height = e || 600, this.ba(s), s;
  }
  ba(t) {
    const e = () => {
      if (this.ga || t.parentNode) return;
      const s = document.body;
      s && s.appendChild(t);
    };
    document.body ? e() : (this.pa = () => {
      this.pa = null, e();
    }, document.addEventListener("DOMContentLoaded", this.pa, { once: !0 }));
  }
  va() {
    const t = document.createElement("canvas");
    t.className = "textmodeCanvas", t.style.imageRendering = "pixelated";
    const e = this.ua.getBoundingClientRect();
    let s = Math.round(e.width), i = Math.round(e.height);
    if (typeof HTMLVideoElement < "u" && this.ua instanceof HTMLVideoElement) {
      const a = this.ua;
      (s === 0 || i === 0) && a.videoWidth > 0 && a.videoHeight > 0 && (s = a.videoWidth, i = a.videoHeight);
    }
    t.width = s, t.height = i, t.style.position = "absolute";
    const n = window.getComputedStyle(this.ua);
    let h = parseInt(n.zIndex || "0", 10);
    return isNaN(h) && (h = 0), t.style.zIndex = "" + (h + 1), t;
  }
  ya() {
    var t;
    this.Ma(), this.Ca(), (t = this.ua) != null && t.parentNode || document.readyState !== "loading" || (this.ma = () => {
      this.ma = null, this.ga || (this.Ma(), this.Ca());
    }, document.addEventListener("DOMContentLoaded", this.ma, { once: !0 }));
  }
  Ca() {
    var t;
    this.p instanceof HTMLCanvasElement && this.ua && !this.p.parentNode && ((t = this.ua.parentNode) == null || t.insertBefore(this.p, this.ua.nextSibling));
  }
  Ma() {
    if (!this.ua || !(this.p instanceof HTMLCanvasElement)) return;
    const t = this.ua.getBoundingClientRect(), e = this.ua.offsetParent;
    if (e && e !== document.body) {
      const s = e.getBoundingClientRect();
      this.p.style.top = t.top - s.top + "px", this.p.style.left = t.left - s.left + "px";
    } else this.p.style.top = t.top + window.scrollY + "px", this.p.style.left = t.left + window.scrollX + "px";
  }
  ce(t, e) {
    if (this.la) {
      const s = this.ua.getBoundingClientRect();
      this.p.width = Math.round(s.width), this.p.height = Math.round(s.height), this.Ma();
    } else this.p.width = t ?? this.p.width, this.p.height = e ?? this.p.height;
  }
  xa() {
    if (this.da) return this.da;
    const t = this.p.getContext("webgl2", { alpha: !0, premultipliedAlpha: !1, preserveDrawingBuffer: !0, antialias: !1, depth: !0, stencil: !1, powerPreference: "high-performance" });
    if (!t) throw new b("`textmode.js` requires WebGL2 support.");
    return this.Ce = t, t;
  }
  k() {
    if (this.ga || (this.ga = !0, this.Fa(), !this._a)) return;
    const t = this.Ce ?? this.da;
    if (t) {
      const e = t.getExtension("WEBGL_lose_context");
      e == null || e.loseContext();
    }
    this.fa && typeof HTMLCanvasElement < "u" && this.p instanceof HTMLCanvasElement && this.p.parentNode && this.p.parentNode.removeChild(this.p);
  }
  Fa() {
    this.pa && (document.removeEventListener("DOMContentLoaded", this.pa), this.pa = null), this.ma && (document.removeEventListener("DOMContentLoaded", this.ma), this.ma = null);
  }
  get canvas() {
    return this.p;
  }
  get targetCanvas() {
    return this.ua;
  }
  get width() {
    return this.p.width;
  }
  get height() {
    return this.p.height;
  }
  get ownsContext() {
    return this._a;
  }
}
function Mt(r) {
  return parseInt(r, 16);
}
const js = /^rgba?\(([^)]+)\)$/i;
function G(r) {
  return Number.isNaN(r = Math.round(r)) ? 0 : Q(r, 0, 255);
}
function Gs(r, t = !1) {
  if (!r) return null;
  const e = r.trim().toLowerCase();
  if (!e) return null;
  let s = null;
  return e.startsWith("rgb") && (s = (function(i) {
    const n = js.exec(i.trim());
    if (!n) return null;
    const h = n[1].split(",").map((f) => f.trim());
    if (h.length < 3) return null;
    const a = G(parseFloat(h[0])), c = G(parseFloat(h[1])), l = G(parseFloat(h[2]));
    let u = 255;
    if (h[3] !== void 0) {
      const f = h[3].trim();
      let d = parseFloat(f);
      f.endsWith("%") && (d /= 100), u = 255 * Q(d, 0, 1);
    }
    return [a, c, l, Math.round(u)];
  })(e)), s && (t || s[3] !== 0) ? s : null;
}
class S {
  constructor(t, e, s, i) {
    o(this, "Pa");
    o(this, "Sa");
    o(this, "r");
    o(this, "g");
    o(this, "b");
    o(this, "a");
    this.r = G(t), this.g = G(e), this.b = G(s), this.a = G(i);
  }
  static Ta(t, e, s, i) {
    if (t instanceof S) return t;
    if (Array.isArray(t)) {
      if (t.length < 3) throw Error("Component tuples must include at least RGB values.");
      const [n, h, a] = t, c = t.length === 4 ? t[3] : 255;
      return S.Ea(n, h, a, c);
    }
    if (typeof t == "string") {
      const n = t.trim();
      if (n.length === 0) throw Error("Color strings cannot be empty.");
      const h = Gs(n, !0);
      return h ? S.Ea(...h) : S.ka(n);
    }
    if (typeof t == "number") return typeof e == "number" && typeof s == "number" ? S.Ea(t, e, s, i ?? 255) : typeof e == "number" ? S.La(t, e) : S.La(t, i ?? 255);
    throw Error("Unsupported color input passed.");
  }
  static Ea(t, e, s, i = 255) {
    return new S(t, e, s, i);
  }
  static La(t, e = 255) {
    return new S(t, t, t, e);
  }
  static ka(t) {
    return new S(...(function(e) {
      const s = e.trim().replace(/^#|0x/gi, "");
      if (!/^[0-9A-Fa-f]+$/.test(s)) throw Error("Invalid hex color: " + e);
      const i = (n = s).length === 3 || n.length === 4 ? n.split("").map((h) => h + h).join("") : n;
      var n;
      if (i.length !== 6 && i.length !== 8) throw Error("Invalid hex color: " + e);
      return [Mt(i.slice(0, 2)), Mt(i.slice(2, 4)), Mt(i.slice(4, 6)), i.length === 8 ? Mt(i.slice(6, 8)) : 255];
    })(t));
  }
  static Da(t, e, s, i) {
    return new S(Math.round(255 * t), Math.round(255 * e), Math.round(255 * s), Math.round(255 * i));
  }
  get rgb() {
    return [this.r, this.g, this.b];
  }
  get rgba() {
    return this.Pa || (this.Pa = [this.r, this.g, this.b, this.a]), [...this.Pa];
  }
  get normalized() {
    return this.Sa || (this.Sa = [this.r / 255, this.g / 255, this.b / 255, this.a / 255]), [...this.Sa];
  }
  withAlpha(t) {
    return new S(this.r, this.g, this.b, t);
  }
}
class pt extends dt {
  constructor(e, s, i, n, h, a, c, l) {
    super();
    o(this, "Ce");
    o(this, "X");
    o(this, "Ra");
    o(this, "Oa");
    o(this, "Ba");
    o(this, "o");
    o(this, "u");
    o(this, "Se", null);
    o(this, "Ia", null);
    o(this, "ja", "brightness");
    o(this, "za", null);
    o(this, "Ha");
    o(this, "Qa", null);
    o(this, "Na", null);
    o(this, "Xa", null);
    o(this, "Ga", null);
    o(this, "Va");
    o(this, "hn", 0);
    o(this, "ln", 0);
    o(this, "dn", 0);
    o(this, "an", 0);
    o(this, "Za", 0);
    o(this, "Wa", 1);
    o(this, "Ya", "sampled");
    o(this, "Ka", "fixed");
    o(this, "$a", null);
    o(this, "qa", null);
    o(this, "Ja", null);
    o(this, "tc", null);
    o(this, "sc", null);
    o(this, "ec", null);
    o(this, "rc", null);
    o(this, "nc", null);
    o(this, "mn", [1, 1, 1, 1]);
    o(this, "gn", [0, 0, 0, 1]);
    o(this, "hc", [0, 0, 0, 1]);
    o(this, "oc", [[0.1, 0, 0]]);
    o(this, "ac", null);
    o(this, "cc", !0);
    o(this, "pn", null);
    o(this, "uc", null);
    o(this, "lc", null);
    o(this, "fc", null);
    o(this, "dc", null);
    o(this, "_c", null);
    o(this, "mc", !1);
    this.Ce = e, this.X = s, this.Ra = i, this.Ha = n, this.Oa = h, this.Ba = a, this.gc(c, l);
  }
  vc() {
    var e, s;
    this.Se = null, (e = this.Na) == null || e.forEach((i) => {
      i.material = null;
    }), (s = this.Xa) == null || s.forEach((i) => {
      i.material = null;
    });
  }
  yc(e, s, i, n, h) {
    this.X.Ro() ? this.wc(e, s, i, n, h) : (e === "char" ? this.bc(this.mn, s, i, n, h) : e === "cell" ? this.bc(this.gn, s, i, n, h) : this.bc(this.hc, s, i, n, h), this.vc());
  }
  conversionMode(e) {
    return this.X.Ro() ? (this.Qa = e, this.Mc(this.Xa), this.Xa = null) : (this.ja = e, this.za = null, this.Mc(this.Na), this.Na = null, this.vc()), this;
  }
  conversions(e) {
    if (!Array.isArray(e)) throw new b("[textmode.js] conversions() expects an array of conversion steps.", { method: "conversions", providedValue: e });
    if (e.length === 0) return this.clearConversions();
    const s = e.map((i, n) => this.Cc(i, n));
    return this.X.Ro() ? (this.Qa = null, this.Mc(this.Xa), this.Xa = s) : (this.Mc(this.Na), this.Na = s, this.vc()), this;
  }
  clearConversions() {
    return this.X.Ro() ? (this.Qa = null, this.Mc(this.Xa), this.Xa = []) : (this.Mc(this.Na), this.Na = null, this.vc()), this;
  }
  dispose() {
    this.Ra && (this.Ce.deleteTexture(this.Ra), this.Ra = null), this.xc(this.ac), this.xc(this._c), this.Mc(this.Na), this.Mc(this.Xa), this.ac = null, this._c = null, this.Na = null, this.Xa = null, super.dispose();
  }
  invert(e = !0) {
    const s = e ? 1 : 0;
    return this.X.Ro() ? this.$a = s : (this.hn = s, this.vc()), this;
  }
  flipX(e = !0) {
    const s = e ? 1 : 0;
    return this.X.Ro() ? this.qa = s : (this.ln = s, this.vc()), this;
  }
  flipY(e = !0) {
    const s = e ? 1 : 0;
    return this.X.Ro() ? this.Ja = s : (this.dn = s, this.vc()), this;
  }
  charRotation(e) {
    const s = $t(e);
    return this.X.Ro() ? this.tc = s : (this.an = s, this.vc()), this;
  }
  brightnessRange(e, s) {
    const [i, n] = this.Fc(e, s, "brightnessRange");
    return this.X.Ro() ? (this.sc = i, this.ec = n) : (this.Za = i, this.Wa = n, this.vc()), this;
  }
  charColorMode(e) {
    return this.X.Ro() ? this.rc = e : (this.Ya = e, this.vc()), this;
  }
  cellColorMode(e) {
    return this.X.Ro() ? this.nc = e : (this.Ka = e, this.vc()), this;
  }
  charColor(e, s, i, n) {
    return this.yc("char", e, s, i, n), this;
  }
  cellColor(e, s, i, n) {
    return this.yc("cell", e, s, i, n), this;
  }
  background(e, s, i, n) {
    return this.yc("background", e, s, i, n), this;
  }
  characters(e) {
    if (this.X.Ro()) {
      const s = this.Pc(e);
      this.dc = s.length > 0 ? s : null, this.mc = s.length > 0;
    } else this.pn = e, this.Sc(e), this.vc();
    return this;
  }
  Qo(e) {
    this.Ia !== e && (this.Ia = e, this.pn && this.Sc(this.pn), this.Tc(this.Na), this.Tc(this.Xa), this.vc());
  }
  get texture() {
    return this.Ra;
  }
  get width() {
    return this.o;
  }
  get height() {
    return this.u;
  }
  get originalWidth() {
    return this.Oa;
  }
  get originalHeight() {
    return this.Ba;
  }
  ce(e, s) {
    this.gc(e, s), this.vc();
  }
  Qe() {
    return this.Xo() ? this.Ec() : (this.Se || this.Ne(), this.Se);
  }
  No() {
    const e = this.kc();
    if (!e) return [this.Qe()];
    this.Lc();
    const s = !this.Dc();
    return e.map((i, n) => this.Rc(i, n, e.length, s));
  }
  Do() {
    this.$a = null, this.qa = null, this.Ja = null, this.tc = null, this.sc = null, this.ec = null, this.rc = null, this.nc = null, this.uc = null, this.lc = null, this.fc = null, this.dc = null, this.mc = !1, this.Qa = null, this.Mc(this.Xa), this.Xa = null;
  }
  Lc() {
  }
  Ne() {
    this.Se = this.Ec();
  }
  Ec(e = this.Qa ?? this.ja, s = null, i) {
    s || this.Lc();
    const n = this.Ga, h = this.Va;
    this.Ga = s, this.Va = i;
    try {
      const a = s ? this.Oc(e) : this.Bc(), c = this.Ic(i), l = this.Ha.jc(e, c), u = a.createUniforms(c);
      return this.X.materialManager.Ge(l, u);
    } finally {
      this.Ga = n, this.Va = h;
    }
  }
  Rc(e, s, i, n) {
    if (n && e.material) return e.material;
    const h = { index: s, count: i, mode: e.mode, options: e.options }, a = this.Ec(e.mode, e, h);
    return n && (e.material = a), a;
  }
  Cc(e, s) {
    if (!e || typeof e != "object") throw new b("[textmode.js] Conversion stack steps must be objects.", { method: "conversions", index: s, providedValue: e });
    if (typeof e.mode != "string" || e.mode.trim() === "") throw new b("[textmode.js] Conversion stack step mode must be a non-empty string.", { method: "conversions", index: s, providedValue: e.mode });
    const i = { mode: e.mode, options: this.zc(e.options, s), paletteTexture: null, paletteDirty: !1, material: null };
    if (e.characters !== void 0) {
      if (typeof e.characters != "string") throw new b("[textmode.js] Conversion stack step characters must be a string.", { method: "conversions", index: s, providedValue: e.characters });
      i.characters = e.characters, i.glyphColors = this.Pc(e.characters), i.paletteDirty = !0;
    }
    if (e.invert !== void 0 && (i.invert = e.invert ? 1 : 0), e.flipX !== void 0 && (i.flipX = e.flipX ? 1 : 0), e.flipY !== void 0 && (i.flipY = e.flipY ? 1 : 0), e.charRotation !== void 0 && (i.charRotation = $t(e.charRotation)), e.brightnessStart !== void 0 || e.brightnessEnd !== void 0) {
      if (e.brightnessStart === void 0 || e.brightnessEnd === void 0) throw new b("[textmode.js] Conversion stack step brightnessStart and brightnessEnd must be provided together.", { method: "conversions", index: s, brightnessStart: e.brightnessStart, brightnessEnd: e.brightnessEnd });
      const [n, h] = this.Fc(e.brightnessStart, e.brightnessEnd, "conversions", s);
      i.brightnessStart = n, i.brightnessEnd = h;
    }
    return e.charColorMode !== void 0 && (this.Hc(e.charColorMode, "charColorMode", s), i.charColorMode = e.charColorMode), e.cellColorMode !== void 0 && (this.Hc(e.cellColorMode, "cellColorMode", s), i.cellColorMode = e.cellColorMode), e.charColor !== void 0 && (i.charColor = this.Qc(e.charColor)), e.cellColor !== void 0 && (i.cellColor = this.Qc(e.cellColor)), i;
  }
  Hc(e, s, i) {
    if (e !== "sampled" && e !== "fixed") throw new b(`[textmode.js] Conversion stack step ${s} must be 'sampled' or 'fixed'.`, { method: "conversions", index: i, providedValue: e });
  }
  zc(e, s) {
    if (e === void 0) return {};
    if (e === null || typeof e != "object" || Array.isArray(e)) throw new b("[textmode.js] Conversion stack step options must be an object.", { method: "conversions", index: s, providedValue: e });
    return { ...e };
  }
  Qc(e) {
    return S.Ta(e).normalized;
  }
  Fc(e, s, i, n) {
    const h = { method: i, start: e, end: s };
    if (n !== void 0 && (h.index = n), !Number.isFinite(e) || !Number.isFinite(s)) throw new b("[textmode.js] brightness range values must be finite numbers.", h);
    if (e < 0 || e > 255 || s < 0 || s > 255) throw new b("[textmode.js] brightness range values must be between 0 and 255.", h);
    if (e > s) throw new b("[textmode.js] brightness range start must be less than or equal to end.", h);
    return [e / 255, s / 255];
  }
  bc(e, s, i, n, h) {
    const a = S.Ta(s, i, n, h);
    Pt(e, a.r, a.g, a.b, a.a);
  }
  Sc(e) {
    const s = this.Pc(e);
    s.length > 0 && (this.oc = s, this.cc = !0);
  }
  Tc(e) {
    if (e) for (const s of e) s.characters !== void 0 && (s.glyphColors = this.Pc(s.characters), s.paletteDirty = !0, s.material = null);
  }
  Pc(e) {
    return this.Ia ? this.Ia.Ht(e).filter((s) => Array.isArray(s)) : [];
  }
  kc() {
    return this.Qa !== null ? null : this.Xa !== null ? this.Xa.length > 0 ? this.Xa : null : this.Na;
  }
  Dc() {
    return this.$a !== null || this.qa !== null || this.Ja !== null || this.tc !== null || this.sc !== null || this.ec !== null || this.rc !== null || this.nc !== null || this.uc !== null || this.lc !== null || this.fc !== null || this.dc !== null;
  }
  gc(e, s) {
    const { width: i, height: n } = (function(h, a, c, l) {
      const u = Math.min(c / h, l / a);
      return { width: Math.max(1, Math.min(c, Math.round(h * u))), height: Math.max(1, Math.min(l, Math.round(a * u))), scale: u };
    })(this.Oa, this.Ba, e, s);
    this.o = i, this.u = n;
  }
  createBaseConversionUniforms() {
    const e = this.Ga, s = (e == null ? void 0 : e.invert) ?? this.$a ?? this.hn, i = (e == null ? void 0 : e.flipX) ?? this.qa ?? this.ln, n = (e == null ? void 0 : e.flipY) ?? this.Ja ?? this.dn, h = (e == null ? void 0 : e.charRotation) ?? this.tc ?? this.an, a = (e == null ? void 0 : e.brightnessStart) ?? this.sc ?? this.Za, c = (e == null ? void 0 : e.brightnessEnd) ?? this.ec ?? this.Wa, l = (e == null ? void 0 : e.charColorMode) ?? this.rc ?? this.Ya, u = (e == null ? void 0 : e.cellColorMode) ?? this.nc ?? this.Ka, f = (e == null ? void 0 : e.charColor) ?? this.uc ?? this.mn, d = (e == null ? void 0 : e.cellColor) ?? this.lc ?? this.gn, p = this.fc ?? this.hc, m = (e == null ? void 0 : e.glyphColors) !== void 0, v = !m && this.dc !== null, y = m ? e.glyphColors : this.dc ?? this.oc, w = this.Nc(y, v, e);
    return { u_image: this.Ra, u_invert: !!s, u_flipX: !!i, u_flipY: !!n, u_charRotation: h, Uk: a, Ul: c, u_charColorFixed: l === "fixed", u_charColor: f, u_cellColorFixed: u === "fixed", u_cellColor: d, u_backgroundColor: p, u_charCount: y.length, u_charPaletteTexture: w.texture, u_charPaletteDimensions: [w.columns, w.rows] };
  }
  Nc(e, s, i = null) {
    return (i == null ? void 0 : i.glyphColors) !== void 0 ? (i.paletteTexture && !i.paletteDirty || (i.paletteTexture = this.Xc(e, i.paletteTexture), i.paletteDirty = !1), i.paletteTexture) : s ? (this._c && !this.mc || (this._c = this.Xc(e, this._c), this.mc = !1), this._c) : (this.ac && !this.cc || (this.ac = this.Xc(e, this.ac), this.cc = !1), this.ac);
  }
  Xc(e, s) {
    const i = this.Ce, n = Math.max(1, Number(i.getParameter(i.MAX_TEXTURE_SIZE)) || 4096), h = Math.min(n * n, 65535);
    if (e.length > h) throw new b("[textmode.js] Character palette exceeds the supported GPU texture capacity.", { requestedCharacters: e.length, maxCharacters: h, maxTextureSize: n });
    const a = Math.max(e.length, 1), c = Math.min(n, Math.ceil(Math.sqrt(a))), l = Math.max(1, Math.ceil(a / c)), u = this.Gc(e, c, l), f = (s == null ? void 0 : s.texture) ?? i.createTexture();
    if (!f) throw new b("[textmode.js] Failed to create character palette texture.");
    return i.bindTexture(i.TEXTURE_2D, f), i.texParameteri(i.TEXTURE_2D, i.TEXTURE_MIN_FILTER, i.NEAREST), i.texParameteri(i.TEXTURE_2D, i.TEXTURE_MAG_FILTER, i.NEAREST), i.texParameteri(i.TEXTURE_2D, i.TEXTURE_WRAP_S, i.CLAMP_TO_EDGE), i.texParameteri(i.TEXTURE_2D, i.TEXTURE_WRAP_T, i.CLAMP_TO_EDGE), i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL, 0), s && s.columns === c && s.rows === l ? i.texSubImage2D(i.TEXTURE_2D, 0, 0, 0, c, l, i.RGBA, i.UNSIGNED_BYTE, u) : i.texImage2D(i.TEXTURE_2D, 0, i.RGBA8, c, l, 0, i.RGBA, i.UNSIGNED_BYTE, u), i.bindTexture(i.TEXTURE_2D, null), { texture: f, count: e.length, columns: c, rows: l };
  }
  Gc(e, s, i) {
    const n = new Uint8Array(s * i * 4);
    for (let h = 0; h < e.length; h++) {
      const a = e[h], c = 4 * h;
      n[c] = this.Vc(a[0]), n[c + 1] = this.Vc(a[1]), n[c + 2] = this.Vc(a[2]), n[c + 3] = 255;
    }
    return n;
  }
  Vc(e) {
    return Math.max(0, Math.min(255, Math.round(255 * e)));
  }
  xc(e) {
    e && this.Ce.deleteTexture(e.texture);
  }
  Mc(e) {
    if (e) for (const s of e) this.xc(s.paletteTexture), s.paletteTexture = null, s.material = null;
  }
  Xo() {
    return this.Dc() || this.Qa !== null || this.Xa !== null;
  }
  Oc(e) {
    const s = this.Ha.Zc(e);
    if (!s) throw Error(`[textmode.js] Conversion mode "${e}" is not registered. If this mode is provided by an add-on, make sure its plugin is installed before loading sources.`);
    return s;
  }
  Bc() {
    const e = this.Qa ?? this.ja;
    if (this.za && this.za.id === e) return this.za;
    const s = this.Oc(e);
    return this.za = s, s;
  }
  wc(e, s, i, n, h) {
    let a;
    e === "char" ? (a = this.uc ?? [0, 0, 0, 1], this.uc = a) : e === "cell" ? (a = this.lc ?? [0, 0, 0, 1], this.lc = a) : (a = this.fc ?? [0, 0, 0, 1], this.fc = a), this.bc(a, s, i, n, h);
  }
  Ic(e) {
    if (!this.Ia) throw Error("[textmode.js] Cannot create conversion context: no active glyph atlas set. Ensure _setActiveFont() is called before rendering.");
    const s = { renderer: this.X, gl: this.Ce, font: this.Ia, glyphAtlas: this.Ia, source: this }, i = e ?? this.Va;
    return i && (s.pass = i), s;
  }
}
class gt extends pt {
  constructor(t, e, s, i, n, h, a, c) {
    super(t, e, s, i, n, h, a, c);
  }
  static Wc(t, e, s, i, n) {
    const h = t.context, { texture: a, width: c, height: l } = re(h, s);
    return new gt(h, t, a, e, c, l, i, n);
  }
}
class Hs {
  constructor(t = 60) {
    o(this, "Yc");
    o(this, "Kc");
    o(this, "$c", null);
    o(this, "qc", 0);
    o(this, "Jc", null);
    o(this, "tu", null);
    o(this, "iu", !0);
    o(this, "su", 0);
    o(this, "eu", 0);
    o(this, "ru", []);
    o(this, "nu", 10);
    o(this, "hu", 0);
    o(this, "ou", 0);
    o(this, "au", -1);
    this.Kc = t, this.Yc = 1e3 / t;
  }
  cu(t, e) {
    if (this.Jc = t, e !== void 0 && (this.tu = e), !this.uu() || (this.au === -1 && (this.au = performance.now()), this.$c !== null)) return;
    this.qc = performance.now();
    const s = (i) => {
      var a;
      if (!this.uu()) return void (this.$c = null);
      const n = typeof i == "number" ? i : performance.now(), h = n - this.qc;
      h >= this.Yc && ((a = this.Jc) == null || a.call(this), this.qc = n - h % this.Yc), this.uu() ? this.$c = requestAnimationFrame(s) : this.$c = null;
    };
    this.$c = requestAnimationFrame(s);
  }
  lu() {
    this.$c !== null && (cancelAnimationFrame(this.$c), this.$c = null);
  }
  fu() {
    this.iu && (this.iu = !1, this.uu() || this.lu());
  }
  du(t) {
    this.iu || (this.iu = !0, this.cu(t));
  }
  _u(t, e) {
    if (t === void 0) return this.su;
    this.Kc = t, this.Yc = 1e3 / t, this.$c !== null && e && (this.lu(), this.cu(e));
  }
  pu() {
    const t = performance.now();
    if (this.eu > 0) {
      const e = t - this.eu;
      this.hu = e, this.ru.push(e), this.ru.length > this.nu && this.ru.shift();
      const s = this.ru.reduce((i, n) => i + n, 0) / this.ru.length;
      this.su = 1e3 / s;
    }
    this.eu = t;
  }
  mu(t) {
    this.Kc = t, this.Yc = 1e3 / t;
  }
  uu() {
    var t;
    return this.iu || ((t = this.tu) == null ? void 0 : t.call(this)) === !0;
  }
  gu() {
    this.ou++;
  }
  get vu() {
    return this.au === -1 ? 0 : performance.now() - this.au;
  }
  set vu(t) {
    this.au = performance.now() - t;
  }
  get yu() {
    return this.vu / 1e3;
  }
  set yu(t) {
    this.vu = 1e3 * t;
  }
}
function ee(r, t, e) {
  return r ? r.U(t, e) : { x: -1 / 0, y: -1 / 0 };
}
class kt {
  constructor() {
    o(this, "wu", []);
  }
  Au(t, e, s, i) {
    const n = s;
    i === void 0 ? t.addEventListener(e, n) : t.addEventListener(e, n, i), this.wu.push({ target: t, type: e, listener: n, capture: typeof i == "boolean" ? i : i == null ? void 0 : i.capture });
  }
  bu() {
    for (let t = this.wu.length - 1; t >= 0; t -= 1) {
      const { target: e, type: s, listener: i, capture: n } = this.wu[t];
      n === void 0 ? e.removeEventListener(s, i) : e.removeEventListener(s, i, n);
    }
    this.wu = [];
  }
}
class It {
  constructor() {
    o(this, "wu", {});
  }
  Mu(t, e) {
    var n;
    const s = (n = this.wu)[t] ?? (n[t] = []), i = { fn: e, once: !1 };
    return s.push(i), () => this.Cu(t, e);
  }
  Cu(t, e) {
    const s = this.wu[t];
    if (!s) return;
    const i = s.findIndex((n) => n.fn === e);
    i !== -1 && s.splice(i, 1);
  }
  xu(t, e) {
    var n;
    const s = (n = this.wu)[t] ?? (n[t] = []), i = { fn: e, once: !0 };
    return s.push(i), () => this.Cu(t, e);
  }
  Fu(t, ...e) {
    const s = this.wu[t];
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
  Pu(t) {
    const e = this.wu[t];
    return !!e && e.length > 0;
  }
  bu(t) {
    t !== void 0 ? delete this.wu[t] : this.wu = {};
  }
}
class Qs {
  constructor(t, e) {
    o(this, "p");
    o(this, "Su");
    o(this, "Tu", { x: -1 / 0, y: -1 / 0 });
    o(this, "Eu", { x: -1 / 0, y: -1 / 0 });
    o(this, "ku", { x: -1 / 0, y: -1 / 0 });
    o(this, "Lu", { x: -1 / 0, y: -1 / 0 });
    o(this, "Du", { x: 0, y: 0 });
    o(this, "Ru", { x: 0, y: 0 });
    o(this, "Ou", !1);
    o(this, "Bu", null);
    o(this, "Iu", 0);
    o(this, "wu", new kt());
    o(this, "ju", !1);
    o(this, "zu", new It());
    this.p = t, this.Su = e;
  }
  Hu(t) {
    const e = performance.now() + Math.max(0, t);
    e > this.Iu && (this.Iu = e);
  }
  Qu() {
    return performance.now() < this.Iu;
  }
  Nu(t) {
    const e = this.p.canvas;
    e.style.cursor = t == null || t === "" ? "" : t;
  }
  Xu() {
    const t = this.p.canvas;
    return typeof t.requestPointerLock == "function" && (t.requestPointerLock(), !0);
  }
  Gu() {
    this.Vu() && typeof document.exitPointerLock == "function" && document.exitPointerLock();
  }
  Zu() {
    if (this.ju) return;
    const t = this.p.canvas;
    this.wu.Au(t, "mousemove", (e) => {
      this.Wu(e), this.Yu(e);
    }, { passive: !0 }), this.wu.Au(t, "mouseleave", () => {
      this.Eu = { ...this.Tu }, this.Tu.x = -1 / 0, this.Tu.y = -1 / 0, this.Bu = null;
    }, { passive: !0 }), this.wu.Au(t, "mousedown", (e) => {
      this.Wu(e), this.Ku(e);
    }, { passive: !0 }), this.wu.Au(t, "mouseup", (e) => {
      this.Wu(e), this.$u(e);
    }, { passive: !0 }), this.wu.Au(t, "click", (e) => {
      this.Wu(e), this.qu(e);
    }, { passive: !0 }), this.wu.Au(t, "dblclick", (e) => {
      this.Wu(e), this.Ju(e);
    }, { passive: !0 }), this.wu.Au(t, "wheel", (e) => {
      this.Wu(e), this.tl(e);
    }, { passive: !1 }), this.wu.Au(window, "mouseup", () => {
      this.Ou = !1;
    }, { passive: !0 }), this.wu.Au(window, "blur", () => {
      this.Ou = !1;
    }), this.ju = !0;
  }
  il() {
    this.ju && (this.wu.bu(), this.ju = !1, this.Gu(), this.Ou = !1, this.Du = { x: 0, y: 0 }, this.Ru = { x: 0, y: 0 });
  }
  sl() {
    if (this.ju) try {
      if (this.Bu) {
        const t = new MouseEvent("mousemove", { clientX: this.Bu.x, clientY: this.Bu.y, bubbles: !1, cancelable: !1 });
        this.Wu(t);
      }
    } catch {
      this.Tu.x = -1 / 0, this.Tu.y = -1 / 0;
    }
  }
  el() {
    return { x: this.Tu.x, y: this.Tu.y };
  }
  rl() {
    return { x: this.ku.x, y: this.ku.y };
  }
  nl() {
    return this.Du.x;
  }
  hl() {
    return this.Du.y;
  }
  ol() {
    return this.Ou;
  }
  al() {
    this.ku = { ...this.Lu }, this.Lu = { ...this.Tu }, this.Du = { ...this.Ru }, this.Ru = { x: 0, y: 0 };
  }
  cl(t, e = {}) {
    return { position: { ...this.Tu }, previousPosition: { ...this.Eu }, originalEvent: t, ...e };
  }
  Yu(t) {
    this.Qu() || (this.ul(t) ? this.zu.Fu("mouseDragged", this.cl(t, { button: this.ll(t) })) : this.zu.Fu("mouseMoved", this.cl(t)));
  }
  Ku(t) {
    this.Qu() || (this.Ou = !0, this.zu.Fu("mousePressed", this.cl(t, { button: t.button })));
  }
  $u(t) {
    this.Qu() || (this.Ou = !1, this.zu.Fu("mouseReleased", this.cl(t, { button: t.button })));
  }
  qu(t) {
    this.Qu() || this.zu.Fu("mouseClicked", this.cl(t, { button: t.button }));
  }
  Ju(t) {
    this.Qu() || this.zu.Fu("doubleClicked", this.cl(t, { button: t.button }));
  }
  tl(t) {
    this.Qu() || this.zu.Fu("mouseScrolled", this.cl(t, { delta: { x: t.deltaX, y: t.deltaY } }));
  }
  Wu(t) {
    const e = this.Su();
    if (this.Eu = { ...this.Tu }, t instanceof MouseEvent && t.type === "mousemove" && this.fl(t), t instanceof MouseEvent && t.type === "mousemove" && this.Vu()) return;
    this.Bu = { x: t.clientX, y: t.clientY };
    const s = ee(e, t.clientX, t.clientY);
    this.Tu.x = s.x, this.Tu.y = s.y;
  }
  ul(t) {
    return t.buttons !== 0;
  }
  ll(t) {
    return 1 & t.buttons ? 0 : 4 & t.buttons ? 1 : 2 & t.buttons ? 2 : 8 & t.buttons ? 3 : 16 & t.buttons ? 4 : void 0;
  }
  fl(t) {
    if (this.Vu()) return this.Ru.x += t.movementX, void (this.Ru.y += t.movementY);
    this.Bu && (this.Ru.x += t.clientX - this.Bu.x, this.Ru.y += t.clientY - this.Bu.y);
  }
  Vu() {
    return document.pointerLockElement === this.p.canvas;
  }
}
class $s {
  constructor() {
    o(this, "dl", /* @__PURE__ */ new Map());
    o(this, "_l", null);
    o(this, "pl", null);
    o(this, "wu", new kt());
    o(this, "ju", !1);
    o(this, "zu", new It());
    o(this, "ml", { ArrowUp: "UP_ARROW", ArrowDown: "DOWN_ARROW", ArrowLeft: "LEFT_ARROW", ArrowRight: "RIGHT_ARROW", F1: "F1", F2: "F2", F3: "F3", F4: "F4", F5: "F5", F6: "F6", F7: "F7", F8: "F8", F9: "F9", F10: "F10", F11: "F11", F12: "F12", Enter: "ENTER", Return: "RETURN", Tab: "TAB", Escape: "ESCAPE", Backspace: "BACKSPACE", Delete: "DELETE", Insert: "INSERT", Home: "HOME", End: "END", PageUp: "PAGE_UP", PageDown: "PAGE_DOWN", Shift: "SHIFT", Control: "CONTROL", Alt: "ALT", Meta: "META", " ": "SPACE" });
  }
  Zu() {
    this.ju || (this.wu.Au(window, "keydown", (t) => {
      this.vl(t);
    }, { passive: !1 }), this.wu.Au(window, "keyup", (t) => {
      this.yl(t);
    }, { passive: !1 }), this.ju = !0);
  }
  il() {
    this.ju && (this.wu.bu(), this.ju = !1, this.dl.clear(), this._l = null, this.pl = null);
  }
  wl(t) {
    const e = this.Al(t), s = this.dl.get(t) || this.dl.get(e);
    return (s == null ? void 0 : s.isPressed) || !1;
  }
  bl() {
    return this._l;
  }
  Ml() {
    return this.pl;
  }
  Cl() {
    const t = [];
    for (const [e, s] of this.dl) s.isPressed && t.push(e);
    return t;
  }
  xl() {
    return { ctrl: this.wl("Control"), shift: this.wl("Shift"), alt: this.wl("Alt"), meta: this.wl("Meta") };
  }
  Fl() {
    this.dl.clear(), this._l = null, this.pl = null;
  }
  vl(t) {
    const e = t.key, s = Date.now();
    this.dl.has(e) || this.dl.set(e, { isPressed: !1, lastPressTime: 0, lastReleaseTime: 0 });
    const i = this.dl.get(e);
    i.isPressed || (i.isPressed = !0, i.lastPressTime = s, this._l = e, this.zu.Fu("keyPressed", this.cl(e, !0, t)), this.Pl(t) && this.zu.Fu("keyTyped", this.cl(e, !0, t)));
  }
  cl(t, e, s) {
    return { key: t, keyCode: s.keyCode, ctrlKey: s.ctrlKey, shiftKey: s.shiftKey, altKey: s.altKey, metaKey: s.metaKey, isPressed: e, originalEvent: s };
  }
  yl(t) {
    const e = t.key, s = Date.now();
    this.dl.has(e) || this.dl.set(e, { isPressed: !1, lastPressTime: 0, lastReleaseTime: 0 });
    const i = this.dl.get(e);
    i.isPressed = !1, i.lastReleaseTime = s, this.pl = e, this.zu.Fu("keyReleased", this.cl(e, !1, t));
  }
  Al(t) {
    return this.ml[t] || t.toLowerCase();
  }
  Pl(t) {
    return !(t.ctrlKey || t.altKey || t.metaKey) && t.key !== "Dead" && Array.from(t.key).length === 1;
  }
}
class Js {
  constructor(t, e) {
    o(this, "Sl");
    o(this, "Tl");
    o(this, "El", /* @__PURE__ */ new Map());
    o(this, "kl", null);
    o(this, "Ll", 320);
    o(this, "Dl", 350);
    o(this, "Rl", 10);
    o(this, "Ol", 550);
    o(this, "Bl", 14);
    o(this, "Il", 48);
    o(this, "jl", 650);
    o(this, "zl", 0.02);
    o(this, "Hl", 2);
    o(this, "Ql", 0);
    o(this, "Nl", null);
    this.Sl = t, this.Tl = e;
  }
  th() {
    this.El.forEach((t) => {
      t.timer !== null && window.clearTimeout(t.timer);
    }), this.El.clear(), this.kl = null, this.Ql = 0, this.Nl = null;
  }
  Xl(t, e) {
    const s = { timer: null, fired: !1 };
    s.timer = window.setTimeout(() => {
      this.El.has(t.id) && (s.fired = !0, this.Tl.Fu("longPress", { touch: this.Gl(t.lastPosition), duration: performance.now() - t.startTime, originalEvent: e }));
    }, this.Ol), this.El.set(t.id, s);
  }
  Vl(t, e) {
    const s = this.El.get(t.id);
    !s || !e || Tt(e.clientX, e.clientY, t.lastPosition.clientX, t.lastPosition.clientY) > this.Bl && s.timer !== null && (window.clearTimeout(s.timer), s.timer = null);
  }
  Zl(t, e) {
    const s = this.El.get(t.id);
    s && s.timer !== null && (window.clearTimeout(s.timer), s.timer = null), this.Wl(t, e, (s == null ? void 0 : s.fired) ?? !1), this.El.delete(t.id);
  }
  Yl(t) {
    const e = this.El.get(t);
    e && e.timer !== null && window.clearTimeout(e.timer), this.El.delete(t);
  }
  Kl(t) {
    if (t.size !== 2) return void (this.kl = null);
    const e = Array.from(t.values()), [s, i] = e, n = [s.id, i.id];
    if (this.kl && this.kl.ids[0] === n[0] && this.kl.ids[1] === n[1]) return;
    const h = Tt(s.x, s.y, i.x, i.y), a = de(s.clientX, s.clientY, i.clientX, i.clientY);
    this.kl = { ids: n, initialDistance: Math.max(h, 1e-4), initialAngle: a, lastScale: 1, lastRotation: 0 };
  }
  $l(t, e) {
    if (this.Kl(t), !this.kl) return;
    const [s, i] = this.kl.ids, n = t.get(s), h = t.get(i);
    if (!n || !h) return;
    const a = Tt(n.x, n.y, h.x, h.y) / this.kl.initialDistance, c = a - this.kl.lastScale;
    Math.abs(c) > this.zl && (this.Tl.Fu("pinch", { touches: [this.Gl(n), this.Gl(h)], scale: a, deltaScale: c, center: this.ql(n, h), originalEvent: e }), this.kl.lastScale = a);
    let l = de(n.clientX, n.clientY, h.clientX, h.clientY) - this.kl.initialAngle;
    l = (l + 180) % 360 - 180;
    const u = l - this.kl.lastRotation;
    Math.abs(u) > this.Hl && (this.Tl.Fu("rotateGesture", { touches: [this.Gl(n), this.Gl(h)], rotation: l, deltaRotation: u, center: this.ql(n, h), originalEvent: e }), this.kl.lastRotation = l);
  }
  ql(t, e) {
    const s = (t.clientX + e.clientX) / 2, i = (t.clientY + e.clientY) / 2, n = this.Sl(s, i);
    return { x: n.x, y: n.y };
  }
  Wl(t, e, s) {
    const i = performance.now(), n = i - t.startTime, h = t.lastPosition.clientX - t.startPosition.clientX, a = t.lastPosition.clientY - t.startPosition.clientY, c = Math.hypot(h, a);
    if (!s && n <= this.Ll && c <= this.Rl)
      this.Jl(t.lastPosition, i) ? this.Tl.Fu("doubleTap", { touch: this.Gl(t.lastPosition), taps: 2, originalEvent: e }) : this.Tl.Fu("tap", { touch: this.Gl(t.lastPosition), taps: 1, originalEvent: e });
    else if (!s && n <= this.jl && c >= this.Il) {
      const l = Math.max(c, 1e-4), u = { x: h / l, y: a / l }, f = { x: h / n, y: a / n };
      this.Tl.Fu("swipe", { touch: this.Gl(t.lastPosition), direction: u, distance: l, velocity: f, originalEvent: e });
    }
    this.Ql = i, this.Nl = this.Gl(t.lastPosition);
  }
  Jl(t, e) {
    return !this.Nl || e - this.Ql > this.Dl ? !1 : Tt(t.clientX, t.clientY, this.Nl.clientX, this.Nl.clientY) <= this.Rl;
  }
  Gl(t) {
    return { ...t };
  }
}
class qs {
  constructor(t, e, s) {
    o(this, "p");
    o(this, "tf");
    o(this, "Su");
    o(this, "if");
    o(this, "sf", /* @__PURE__ */ new Map());
    o(this, "ef", /* @__PURE__ */ new Map());
    o(this, "rf", /* @__PURE__ */ new Map());
    o(this, "nf");
    o(this, "hf");
    o(this, "wu", new kt());
    o(this, "ju", !1);
    o(this, "zu", new It());
    o(this, "af", 600);
    this.p = t, this.Su = e, this.tf = s, this.if = new Js((n, h) => ee(this.Su(), n, h), this.zu);
    const i = this.p.canvas;
    this.nf = i.style.touchAction, this.hf = i.style.userSelect, i.style.touchAction || (i.style.touchAction = "none"), i.style.userSelect || (i.style.userSelect = "none");
  }
  Zu() {
    if (this.ju) return;
    const t = this.p.canvas;
    this.wu.Au(t, "touchstart", (e) => {
      this.cf(e);
    }, { passive: !1 }), this.wu.Au(t, "touchmove", (e) => {
      this.uf(e);
    }, { passive: !1 }), this.wu.Au(t, "touchend", (e) => {
      this.lf(e);
    }, { passive: !1 }), this.wu.Au(t, "touchcancel", (e) => {
      this.ff(e);
    }, { passive: !1 }), this.ju = !0;
  }
  il() {
    if (!this.ju) return;
    const t = this.p.canvas;
    this.wu.bu(), this.ju = !1, this.sf.clear(), this.ef.clear(), this.rf.clear(), this.if.th(), t.style.touchAction = this.nf, t.style.userSelect = this.hf;
  }
  sl() {
    if (!this.Su() || this.sf.size === 0) return;
    const t = /* @__PURE__ */ new Map();
    for (const e of this.sf.values()) {
      const s = this.Sl(e.clientX, e.clientY, e.id, e);
      t.set(e.id, s);
      const i = this.rf.get(e.id);
      i && (i.lastPosition = s);
    }
    this.sf = t;
  }
  df() {
    return Array.from(this.sf.values()).map((t) => ({ ...t }));
  }
  cf(t) {
    var i;
    if (!this.Su()) return;
    t.preventDefault(), (i = this.tf) == null || i.Hu(this.af);
    const e = performance.now(), s = this._f(t.changedTouches);
    for (const n of s) {
      const h = this.sf.get(n.id);
      h && this.ef.set(n.id, this.Gl(h)), this.sf.set(n.id, n);
      const a = { id: n.id, startPosition: n, lastPosition: n, startTime: e, lastTime: e };
      this.rf.set(n.id, a), this.if.Xl(a, t), this.zu.Fu("touchStarted", this.pf(n, t, void 0, e));
    }
    this.if.Kl(this.sf);
  }
  uf(t) {
    var i;
    if (!this.Su()) return;
    t.preventDefault(), (i = this.tf) == null || i.Hu(this.af);
    const e = performance.now(), s = this._f(t.changedTouches);
    for (const n of s) {
      const h = this.sf.get(n.id), a = h ? this.Gl(h) : void 0;
      a && this.ef.set(n.id, a), this.sf.set(n.id, n);
      const c = this.rf.get(n.id);
      c && (c.lastPosition = n, c.lastTime = e, this.if.Vl(c, a)), this.zu.Fu("touchMoved", this.pf(n, t, a, e));
    }
    this.if.$l(this.sf, t);
  }
  lf(t) {
    if (!this.Su()) return;
    t.preventDefault();
    const e = performance.now(), s = this._f(t.changedTouches);
    for (const i of s) {
      const n = this.sf.get(i.id), h = n ? this.Gl(n) : void 0, a = this.rf.get(i.id);
      this.zu.Fu("touchEnded", this.pf(i, t, h, e)), a && this.if.Zl(a, t), this.rf.delete(i.id), this.ef.delete(i.id), this.sf.delete(i.id);
    }
    this.if.Kl(this.sf);
  }
  ff(t) {
    if (!this.Su()) return;
    t.preventDefault();
    const e = performance.now(), s = this._f(t.changedTouches);
    for (const i of s) {
      const n = this.sf.get(i.id), h = n ? this.Gl(n) : void 0;
      this.zu.Fu("touchCancelled", this.pf(i, t, h, e)), this.if.Yl(i.id), this.rf.delete(i.id), this.ef.delete(i.id), this.sf.delete(i.id);
    }
    this.if.Kl(this.sf);
  }
  _f(t) {
    const e = [];
    for (let s = 0; s < t.length; s += 1) {
      const i = t.item(s);
      i && e.push(this.mf(i));
    }
    return e;
  }
  mf(t) {
    return this.Sl(t.clientX, t.clientY, t.identifier, { id: t.identifier, x: -1, y: -1, clientX: t.clientX, clientY: t.clientY, pressure: t.force, radiusX: t.radiusX, radiusY: t.radiusY, rotationAngle: t.rotationAngle });
  }
  Sl(t, e, s, i) {
    const n = ee(this.Su(), t, e);
    return { id: s, x: n.x, y: n.y, clientX: t, clientY: e, pressure: i.pressure, radiusX: i.radiusX, radiusY: i.radiusY, rotationAngle: i.rotationAngle };
  }
  pf(t, e, s, i) {
    const n = this.rf.get(t.id), h = Array.from(this.ef.values()).map((l) => this.Gl(l)), a = Array.from(this.sf.values()).map((l) => this.Gl(l)), c = this._f(e.changedTouches);
    return { touch: this.Gl(t), previousTouch: s ? this.Gl(s) : void 0, touches: a, previousTouches: h, changedTouches: c, deltaTime: n ? i - n.lastTime : 0, originalEvent: e };
  }
  Gl(t) {
    return { ...t };
  }
}
const X = { south: 0, east: 1, west: 2, north: 3, l1: 4, r1: 5, l2: 6, r2: 7, select: 8, start: 9, leftStickPress: 10, rightStickPress: 11, dpadUp: 12, dpadDown: 13, dpadLeft: 14, dpadRight: 15, home: 16 }, ot = { leftStickX: 0, leftStickY: 1, rightStickX: 2, rightStickY: 3 }, ti = new Map(Object.entries(X).map(([r, t]) => [t, r])), ei = new Map(Object.entries(ot).map(([r, t]) => [t, r]));
function si(r, t) {
  const e = Array.from(r.buttons, (h) => ({ pressed: !!h.pressed, touched: h.touched === void 0 ? void 0 : !!h.touched, value: h.value })), s = Array.from(r.axes, (h) => h), i = r.mapping === "standard" ? "standard" : "", n = { index: r.index, id: r.id, connected: !!r.connected, mapping: i, timestamp: r.timestamp, buttons: e, axes: s };
  return i === "standard" && (n.standard = (function(h, a, c) {
    const l = h[X.home];
    return { faceButtons: { south: L(h, X.south), east: L(h, X.east), west: L(h, X.west), north: L(h, X.north) }, shoulders: { l1: L(h, X.l1), r1: L(h, X.r1), l2: L(h, X.l2), r2: L(h, X.r2) }, center: { select: L(h, X.select), start: L(h, X.start), leftStickPress: L(h, X.leftStickPress), rightStickPress: L(h, X.rightStickPress), ...l ? { home: L(h, X.home) } : {} }, dpad: { up: L(h, X.dpadUp), down: L(h, X.dpadDown), left: L(h, X.dpadLeft), right: L(h, X.dpadRight) }, leftStick: ve(a, ot.leftStickX, ot.leftStickY, c), rightStick: ve(a, ot.rightStickX, ot.rightStickY, c) };
  })(e, s, t)), n;
}
function L(r, t) {
  return r[t] ?? { pressed: !1, value: 0 };
}
function ve(r, t, e, s) {
  const i = r[t] ?? 0, n = r[e] ?? 0, h = Math.hypot(i, n);
  return h <= s ? { x: 0, y: 0, magnitude: 0 } : { x: i, y: n, magnitude: h };
}
const ii = { axisDeadzone: 0.15, axisChangeEpsilon: 0.01, buttonPressThreshold: 0.5, buttonReleaseThreshold: 0.45 };
class ri {
  constructor(t = {}) {
    o(this, "gf");
    o(this, "vf", []);
    o(this, "yf", /* @__PURE__ */ new Map());
    o(this, "wf", /* @__PURE__ */ new Map());
    o(this, "wu", new kt());
    o(this, "ju", !1);
    o(this, "Af", /* @__PURE__ */ new Set());
    o(this, "bf", /* @__PURE__ */ new Set());
    o(this, "zu", new It());
    this.gf = { ...ii, ...t };
  }
  Zu() {
    this.ju || (this.wu.Au(window, "gamepadconnected", (t) => {
      const e = t.gamepad;
      e && (this.Af.add(e.index), this.bf.delete(e.index));
    }), this.wu.Au(window, "gamepaddisconnected", (t) => {
      const e = t.gamepad;
      e && (this.bf.add(e.index), this.Af.delete(e.index));
    }), this.ju = !0);
  }
  il() {
    this.ju && (this.wu.bu(), this.ju = !1, this.Af.clear(), this.bf.clear(), this.vf = [], this.yf.clear(), this.wf.clear());
  }
  al() {
    const t = /* @__PURE__ */ new Map();
    for (const e of this.Mf()) {
      if (!e || !e.connected) continue;
      const s = si(e, this.gf.axisDeadzone);
      t.set(s.index, s);
    }
    for (const [e, s] of this.yf) t.has(e) || this.zu.Fu("gamepadDisconnected", { gamepad: { ...s, connected: !1 } });
    for (const [e, s] of t) this.yf.has(e) || this.zu.Fu("gamepadConnected", { gamepad: s });
    for (const [e, s] of t) {
      const i = this.yf.get(e);
      i && (this.Cf(s, i), this.xf(s, i));
    }
    this.wf = this.yf, this.yf = t, this.vf = Array.from(t.values()).sort((e, s) => e.index - s.index), this.Af.clear(), this.bf.clear();
  }
  Ff() {
    return this.vf;
  }
  Pf(t) {
    return this.yf.get(t);
  }
  Sf(t, e) {
    if (e === "standard") return (function(s, i) {
      if (i === "standard") return ti.get(s);
    })(t, e);
  }
  Tf(t, e) {
    if (e === "standard") return (function(s, i) {
      if (i === "standard") return ei.get(s);
    })(t, e);
  }
  Cf(t, e) {
    const s = Math.max(t.buttons.length, e.buttons.length);
    for (let i = 0; i < s; i++) {
      const n = t.buttons[i] ?? { pressed: !1, value: 0 }, h = e.buttons[i] ?? { pressed: !1, value: 0 }, a = h.value >= this.gf.buttonPressThreshold;
      n.value >= this.gf.buttonPressThreshold && !a && this.zu.Fu("gamepadButtonPressed", { gamepad: t, buttonIndex: i, button: n, previousButton: h, standardButtonName: this.Sf(i, t.mapping) });
      const c = h.value >= this.gf.buttonReleaseThreshold;
      !(n.value >= this.gf.buttonReleaseThreshold) && c && this.zu.Fu("gamepadButtonReleased", { gamepad: t, buttonIndex: i, button: n, previousButton: h, standardButtonName: this.Sf(i, t.mapping) });
    }
  }
  xf(t, e) {
    const s = Math.max(t.axes.length, e.axes.length);
    for (let i = 0; i < s; i++) {
      const n = t.axes[i] ?? 0, h = e.axes[i] ?? 0, a = n - h;
      (Math.abs(h) <= this.gf.axisDeadzone != Math.abs(n) <= this.gf.axisDeadzone || Math.abs(a) >= this.gf.axisChangeEpsilon) && this.zu.Fu("gamepadAxisChanged", { gamepad: t, axisIndex: i, value: n, previousValue: h, delta: a, standardAxisName: this.Tf(i, t.mapping) });
    }
  }
  Mf() {
    const t = navigator;
    if (typeof t.getGamepads != "function") return [];
    const e = t.getGamepads.call(navigator);
    return Array.from(e ?? []);
  }
}
class ni {
  constructor(t) {
    o(this, "Ef");
    o(this, "kf", /* @__PURE__ */ new Map());
    o(this, "Lf", /* @__PURE__ */ new Map());
    o(this, "Df", /* @__PURE__ */ new Map());
    o(this, "Rf", /* @__PURE__ */ new Map());
    o(this, "Of", /* @__PURE__ */ new Map());
    o(this, "Bf", /* @__PURE__ */ new Map());
    o(this, "If", /* @__PURE__ */ new Map());
    this.Ef = t;
  }
  jf(t, e) {
    return this.zf(this.kf, t, e);
  }
  Hf(t, e) {
    return this.zf(this.Lf, t, e);
  }
  Qf(t, e) {
    return this.zf(this.Df, t, e);
  }
  Nf(t, e) {
    return this.zf(this.Rf, t, e);
  }
  Xf(t, e) {
    return this.zf(this.Of, t, e);
  }
  Gf(t, e) {
    return this.zf(this.Bf, t, e);
  }
  Vf(t, e) {
    return this.zf(this.If, t, e);
  }
  Zf() {
    this.Wf(this.kf, (t) => t());
  }
  Yf() {
    this.Wf(this.Lf, (t) => t());
  }
  Kf(t) {
    this.Wf(this.Df, (e) => e(t));
  }
  qs(t) {
    this.Wf(this.Rf, (e) => e(t));
  }
  re(t) {
    this.Wf(this.Of, (e) => e(t));
  }
  async $f() {
    await this.qf(this.Bf, (t) => t());
  }
  async Jf() {
    await this.qf(this.If, (t) => t());
  }
  td(t) {
    this.kf.delete(t), this.Lf.delete(t), this.Df.delete(t), this.Rf.delete(t), this.Of.delete(t), this.Bf.delete(t), this.If.delete(t);
  }
  zf(t, e, s) {
    const i = t.get(e) ?? /* @__PURE__ */ new Set();
    return i.add(s), t.set(e, i), () => {
      const n = t.get(e);
      n && (n.delete(s), n.size === 0 && t.delete(e));
    };
  }
  Wf(t, e) {
    for (const s of this.Ef) {
      const i = t.get(s);
      i && i.forEach(e);
    }
  }
  async qf(t, e) {
    for (const s of this.Ef) {
      const i = t.get(s);
      if (i) for (const n of i) await e(n);
    }
  }
}
class ye {
  constructor(t) {
    o(this, "sd");
    o(this, "ed");
    o(this, "rd", /* @__PURE__ */ new Map());
    this.sd = t.targetName, this.ed = t.getPrototype;
  }
  nd(t, e, s) {
    let i = this.rd.get(t);
    i || (i = /* @__PURE__ */ new Map(), this.rd.set(t, i));
    for (const [n, h] of this.rd) if (n !== t && h.has(e)) throw new b(`Plugin "${t}" attempted to register ${this.sd} method "${e}" which is already provided by plugin "${n}".`, { plugin: t, method: e, conflictingPlugin: n });
    i.set(e, s), this.hd(e, s);
  }
  od(t, e) {
    const s = this.rd.get(t);
    if (!s) return;
    s.delete(e);
    let i = !1;
    for (const [n, h] of this.rd) if (n !== t && h.has(e)) {
      i = !0;
      const a = h.get(e);
      this.hd(e, a);
      break;
    }
    i || this.ad(e), s.size === 0 && this.rd.delete(t);
  }
  ud(t) {
    const e = this.rd.get(t);
    if (e) {
      for (const s of e.keys()) this.ad(s);
      this.rd.delete(t);
    }
  }
  hd(t, e) {
    const s = this.ed();
    Object.defineProperty(s, t, { value: e, writable: !0, configurable: !0, enumerable: !1 });
  }
  ad(t) {
    const e = this.ed(), s = Object.getOwnPropertyDescriptor(e, t);
    s && s.configurable && delete e[t];
  }
}
class hi {
  constructor(t, e, s, i) {
    o(this, "ue");
    o(this, "ld");
    o(this, "fd");
    o(this, "dd");
    this.ue = t, this.ld = e, this.fd = s, this.dd = i;
  }
  _d(t) {
    const e = this.ue, s = this.ld, i = this.fd, n = this.dd, h = { get canvas() {
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
      return e.X;
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
    }, registerPreDrawHook: (a) => s.jf(t, a), registerPostDrawHook: (a) => s.Hf(t, a), registerLayerDisposedHook: (a) => s.Qf(t, a), registerLayerPreRenderHook: (a) => s.Nf(t, a), registerLayerPostRenderHook: (a) => s.Xf(t, a), registerPreSetupHook: (a) => s.Gf(t, a), registerPostSetupHook: (a) => s.Vf(t, a), extendLayer: (a, c) => {
      i.nd(t, a, c);
    }, removeLayerExtension: (a) => {
      i.od(t, a);
    }, extendSource: (a, c) => {
      n.nd(t, a, c);
    }, removeSourceExtension: (a) => {
      n.od(t, a);
    } };
  }
}
class oi {
  constructor() {
    o(this, "pd", /* @__PURE__ */ new Map());
    o(this, "Ef", []);
  }
  md(t) {
    return this.pd.has(t);
  }
  Zc(t) {
    return this.pd.get(t);
  }
  Au(t) {
    this.pd.set(t.name, t), this.Ef.push(t.name);
  }
  gd(t) {
    this.pd.delete(t);
    const e = this.Ef.indexOf(t);
    e !== -1 && this.Ef.splice(e, 1);
  }
  vd() {
    return [...this.Ef];
  }
  yd() {
    return this.Ef;
  }
}
class ai {
  constructor(t) {
    o(this, "ue");
    o(this, "wd");
    o(this, "ld");
    o(this, "fd");
    o(this, "dd");
    o(this, "Ad");
    this.ue = t, this.wd = new oi(), this.ld = new ni(this.wd.yd()), this.fd = new ye({ targetName: "layer", getPrototype: () => Object.getPrototypeOf(this.ue.layers.base) }), this.dd = new ye({ targetName: "source", getPrototype: () => pt.prototype }), this.Ad = new hi(this.ue, this.ld, this.fd, this.dd);
  }
  bd(t) {
    for (const e of t) {
      if (this.wd.md(e.name)) {
        console.warn(`[textmode.js] Plugin "${e.name}" is already installed.`);
        continue;
      }
      const s = this.Md(e.name);
      try {
        const i = e.install(this.ue, s);
        i instanceof Promise && i.catch((n) => {
          console.error(`[textmode.js] Async plugin "${e.name}" installation error:`, n), this.Cd(e.name);
        });
      } catch (i) {
        throw this.Cd(e.name), i;
      }
      this.wd.Au(e);
    }
  }
  async xd(t) {
    for (const e of t) {
      if (this.wd.md(e.name)) {
        console.warn(`[textmode.js] Plugin "${e.name}" is already installed.`);
        continue;
      }
      const s = this.Md(e.name);
      try {
        await e.install(this.ue, s);
      } catch (i) {
        throw this.Cd(e.name), i;
      }
      this.wd.Au(e);
    }
  }
  async Fd(t) {
    const e = this.wd.Zc(t);
    if (!e) return;
    const s = this.Md(t);
    e.uninstall && await e.uninstall(this.ue, s), this.wd.gd(t), this.Cd(t);
  }
  Zf() {
    this.ld.Zf();
  }
  Yf() {
    this.ld.Yf();
  }
  Kf(t) {
    this.ld.Kf(t);
  }
  qs(t) {
    this.ld.qs(t);
  }
  re(t) {
    this.ld.re(t);
  }
  async $f() {
    await this.ld.$f();
  }
  async Jf() {
    await this.ld.Jf();
  }
  async Pd() {
    const t = this.wd.vd();
    for (const e of t) await this.Fd(e);
  }
  Md(t) {
    return this.Ad._d(t);
  }
  Cd(t) {
    this.ld.td(t), this.fd.ud(t), this.dd.ud(t);
  }
}
const rt = `#version 300 es
layout(location=0)in vec2 A0;layout(location=1)in vec2 A1;out vec2 v_uv;void main(){v_uv=A1;gl_Position=vec4(A0,0.,1.);}`, Oe = `#version 300 es
precision highp float;uniform sampler2D u_texture;in vec2 v_uv;out vec4 fragColor;void main(){fragColor=texture(u_texture,v_uv);}`, ci = ({ textmodifier: r }) => {
  const t = "|/-\\", e = Math.floor(r.millis / 120) % 4;
  r.background("#222323"), r.charColor("#F8F8F8"), r.cellColor("#222323"), it(r, t[e], 0), r.charColor("#C0C0C0"), it(r, "LOADING...", 5);
}, ui = { transition: "fade", transitionDuration: 500 };
class ke extends Se {
  constructor(e, s) {
    super(e);
    o(this, "Kt");
    o(this, "pe", "active");
    o(this, "Sd", 0);
    o(this, "Td");
    this.Kt = { ...ui, ...s ?? {} }, this.Kt.transition === "none" && (this.Kt.transitionDuration = 0);
  }
  async Dt() {
    this.Et || (await super.Dt(), this.le.opacity(1), this.le.show());
  }
  get ye() {
    return this.pe === "active" || this.pe === "transitioning";
  }
  Ed() {
    this.Kt.transitionDuration > 0 ? (this.kd(), this.Sd = performance.now(), this.Et && (this.le.opacity(1), this.le.show())) : (this.Et && (this.le.opacity(0), this.le.hide()), this.Ld(), this.Dd());
  }
  Rd(e) {
    this.Td = e;
  }
  be() {
    if (this.pe === "transitioning" && this.Od())
      return this.Bd(), void this.Dd();
    this.Me();
  }
  fe() {
    return new N(this.ue.X, { visible: !0, opacity: 1, fontSize: 16 });
  }
  Dd() {
    this.Td && this.Td();
  }
  Od() {
    if (!this.Et) return !0;
    const e = this.Kt.transitionDuration;
    if (e <= 0) return this.le.opacity(0), this.le.hide(), !0;
    const s = performance.now() - this.Sd, i = Math.min(1, s / e);
    return this.le.opacity(1 - i), i >= 1 && (this.le.hide(), !0);
  }
  Me() {
    if (!this.Et) return;
    const e = { textmodifier: this.ue, grid: this.le.grid };
    this.de(ci, e);
  }
  Ld() {
    this.pe !== "disabled" && (this.pe = "done");
  }
  kd() {
    this.pe !== "disabled" && (this.pe = "transitioning");
  }
  Bd() {
    this.pe === "transitioning" && (this.pe = "done");
  }
}
const Ri = Object.freeze(Object.defineProperty({ __proto__: null, LoadingLayerController: ke }, Symbol.toStringTag, { value: "Module" })), we = Object.fromEntries(at.map((r, t) => [r, t]));
class li {
  constructor(t, e, s) {
    o(this, "X");
    o(this, "Id");
    o(this, "Ls");
    o(this, "jd", 0);
    this.X = t, this.Id = t.ir(rt, `#version 300 es
precision highp float;uniform sampler2D Up;uniform sampler2D Uq;uniform vec2 Ur;uniform vec2 Us;uniform vec2 Ut;uniform float Uu;uniform float Uv;uniform int Uw;in vec2 v_uv;out vec4 fragColor;const int A=0;const int B=1;const int C=2;const int D=3;const int E=4;const int F=5;const int G=6;const int H=7;const int I=8;const int J=9;const int K=10;const int L=11;const int M=12;const int N=13;vec3 O(vec3 P,vec3 Q){return Q;}vec3 R(vec3 P,vec3 Q){return P+Q;}vec3 S(vec3 P,vec3 Q){return P*Q;}vec3 T(vec3 P,vec3 Q){return 1.-(1.-P)*(1.-Q);}vec3 U(vec3 P,vec3 Q){return max(P-Q,0.);}vec3 V(vec3 P,vec3 Q){return min(P,Q);}vec3 W(vec3 P,vec3 Q){return max(P,Q);}vec3 X(vec3 P,vec3 Q){return mix(2.*P*Q,1.-2.*(1.-P)*(1.-Q),step(0.5,P));}vec3 Y(vec3 P,vec3 Q){return mix(P-(1.-2.*Q)*P*(1.-P),mix(P+(2.*Q-1.)*(P*(3.-2.*P)-P),P+(2.*Q-1.)*(sqrt(P)-P),step(0.25,P)),step(0.5,Q));}vec3 Z(vec3 P,vec3 Q){return mix(2.*P*Q,1.-2.*(1.-P)*(1.-Q),step(0.5,Q));}vec3 a(vec3 P,vec3 Q){return mix(min(vec3(1.),P/max(1.-Q,0.0001)),vec3(1.),step(1.,Q));}vec3 b(vec3 P,vec3 Q){return mix(1.-min(vec3(1.),(1.-P)/max(Q,0.0001)),vec3(0.),step(Q,vec3(0.)));}vec3 c(vec3 P,vec3 Q){return abs(P-Q);}vec3 d(vec3 P,vec3 Q){return P+Q-2.*P*Q;}vec3 e(int f,vec3 P,vec3 Q){if(f==A)return O(P,Q);if(f==B)return R(P,Q);if(f==C)return S(P,Q);if(f==D)return T(P,Q);if(f==E)return U(P,Q);if(f==F)return V(P,Q);if(f==G)return W(P,Q);if(f==H)return X(P,Q);if(f==I)return Y(P,Q);if(f==J)return Z(P,Q);if(f==K)return a(P,Q);if(f==L)return b(P,Q);if(f==M)return c(P,Q);if(f==N)return d(P,Q);return O(P,Q);}void main(){vec4 g=texture(Uq,v_uv);vec2 h=v_uv*Ur;vec2 i=h-Ut;vec2 j=Us*0.5;vec2 k=i-j;float l=cos(-Uv);float m=sin(-Uv);vec2 n=vec2(k.x*l-k.y*m,k.x*m+k.y*l);i=n+j;bool o=any(lessThan(i,vec2(0.)))||any(greaterThanEqual(i,Us));if(o){fragColor=g;return;}vec2 p=(floor(i)+0.5)/Us;vec4 q=texture(Up,p);float r=q.a*Uu;if(r<=0.){fragColor=g;return;}vec3 s=e(Uw,g.rgb,q.rgb);vec3 t=mix(g.rgb,s,r);float u=g.a+r*(1.-g.a);fragColor=vec4(t,u);}`), this.Ls = [this.X.K(e, s, 1), this.X.K(e, s, 1)];
  }
  zd(t) {
    const { base: e, targetFramebuffer: s, backgroundColor: i, layers: n, canvasWidth: h, canvasHeight: a } = t, c = this.X.aa(), l = this.X.ca();
    this.X.ha(!1), this.X.oa(!1);
    const u = this.Ls[0];
    u.begin(), this.X.gh(...i), u.end(), this.jd = 0, e.layer.As && this.Hd(e.texture, h, a, e.width, e.height, e.layer.bs, e.offsetX, e.offsetY, e.layer.Cs, "normal");
    for (const f of n) {
      const d = f.layer;
      d.As && this.Hd(f.texture, h, a, f.width, f.height, d.bs, f.offsetX, f.offsetY, d.Cs, d.Ms);
    }
    this.Qd(s, h, a), this.X.oa(l), this.X.ha(c);
  }
  Hd(t, e, s, i, n, h, a, c, l, u) {
    const f = this.Ls[this.jd], d = this.jd === 0 ? 1 : 0, p = this.Ls[d], m = V(l);
    p.begin(), this.X.ne(this.Id), this.Id.he({ Up: t, Uq: f.textures[0], Ur: [e, s], Us: [i, n], Ut: [a, c], Uu: h, Uv: m, Uw: we[u] }), this.X.oe(0, 0, f.width, f.height), p.end(), this.jd = d;
  }
  Qd(t, e, s) {
    const i = this.Ls[this.jd];
    t.begin(), this.X.ne(this.Id), this.Id.he({ Up: i.textures[0], Uq: i.textures[0], Ur: [e, s], Us: [i.width, i.height], Ut: [0, 0], Uu: 1, Uv: 0, Uw: we.normal }), this.X.oe(0, 0, e, s), t.end();
  }
  ce(t, e) {
    this.Ls[0].resize(t, e), this.Ls[1].resize(t, e);
  }
  k() {
    this.Id.dispose(), this.Ls[0].dispose(), this.Ls[1].dispose();
  }
}
function fi(r) {
  if (typeof r == "number" || typeof r == "boolean") return !0;
  if (Array.isArray(r)) {
    if (r.length === 0) return !0;
    const t = r[0];
    return typeof t == "number" || !!Array.isArray(t);
  }
  return r instanceof Float32Array || r instanceof Int32Array || !!ht(r) || typeof WebGLTexture < "u" && r instanceof WebGLTexture;
}
async function Rt(r) {
  if (r.startsWith("./") || r.startsWith("../") || r.endsWith(".vert") || r.endsWith(".frag") || r.endsWith(".glsl")) {
    const t = await fetch(r);
    if (!t.ok) throw Error(`Failed to load shader from ${r}: ${t.statusText}`);
    return await t.text();
  }
  return r;
}
class Ie {
  constructor(t) {
    o(this, "X");
    o(this, "Nd", /* @__PURE__ */ new Map());
    o(this, "Xd", /* @__PURE__ */ new Map());
    o(this, "Xe");
    o(this, "Ls");
    o(this, "Et", !1);
    this.X = t, this.Xe = t.ir(rt, Oe), this.Gd();
  }
  async register(t, e, s = {}) {
    const i = typeof e == "string" ? this.X.ir(rt, await Rt(e)) : e;
    this.Vd(t, i, s);
  }
  Zd(t, e, s) {
    this.Vd(t, this.X.ir(rt, e), s);
  }
  Vd(t, e, s) {
    this.Xd.set(t, e);
    const i = Object.entries(s), n = i.length > 0 ? i[0][1][0] : null;
    this.Nd.set(t, { id: t, createShader: () => e, createUniforms: (h, a) => {
      const c = { u_resolution: [a.width, a.height] };
      for (const [l, [u, f]] of i) {
        let d = f;
        if (h != null) {
          if (typeof h == "number" && u === n) d = h;
          else if (typeof h == "object" && u in h) {
            const p = h[u];
            fi(p) && (d = p);
          }
        }
        c[l] = d;
      }
      return c;
    } });
  }
  unregister(t) {
    const e = this.Xd.get(t);
    return e && (e.dispose(), this.Xd.delete(t)), this.Nd.delete(t);
  }
  has(t) {
    return this.Nd.has(t);
  }
  Dt(t, e) {
    this.Et || (this.Ls = [this.X.K(t, e, 1, { depth: !1 }), this.X.K(t, e, 1, { depth: !1 })], this.Et = !0);
  }
  Wd(t, e, s, i, n) {
    this.Ls[0].width === i && this.Ls[0].height === n || (this.Ls[0].resize(i, n), this.Ls[1].resize(i, n)), this.ae(t, e, s, i, n, this.Ls);
  }
  ae(t, e, s, i, n, h) {
    if (s.length === 0) return void this.Yd(t, e, i, n);
    this.Yd(t, h[0], i, n);
    let a = 0;
    for (let c = 0; c < s.length; c++) {
      const l = s[c], u = c === s.length - 1, f = a === 0 ? 1 : 0, d = u ? e : h[f];
      this.Kd(l, h[a], d, i, n), u || (a = f);
    }
  }
  Kd(t, e, s, i, n) {
    const h = this.Nd.get(t.name);
    if (!h) return console.warn(`[textmode.js] Unknown filter: "${t.name}". Skipping.`), void this.Yd(e.textures[0], s, i, n);
    const a = this.$d(t.name, h, i, n), c = { renderer: this.X, gl: this.X.context, width: i, height: n };
    s.begin(), this.X.ne(a), a.he({ u_texture: e.textures[0] });
    const l = h.createUniforms(t.params, c);
    a.he(l), this.X.oe(0, 0, i, n), s.end();
  }
  $d(t, e, s, i) {
    let n = this.Xd.get(t);
    if (!n && e) {
      const h = { renderer: this.X, gl: this.X.context, width: s, height: i };
      n = e.createShader(h), this.Xd.set(t, n);
    }
    return n;
  }
  Yd(t, e, s, i) {
    e.begin(), this.X.ne(this.Xe), this.Xe.he({ u_texture: t, u_resolution: [s, i] }), this.X.oe(0, 0, s, i), e.end();
  }
  ce(t, e) {
    this.Ls && (this.Ls[0].resize(t, e), this.Ls[1].resize(t, e));
  }
  k() {
    for (const t of this.Xd.values()) t.dispose();
    this.Xd.clear(), this.Nd.clear(), this.Xe.dispose(), this.Ls && (this.Ls[0].dispose(), this.Ls[1].dispose()), this.Et = !1;
  }
  Gd() {
    this.Zd("invert", `#version 300 es
precision highp float;uniform sampler2D u_texture;in vec2 v_uv;out vec4 fragColor;void main(){vec4 A=texture(u_texture,v_uv);fragColor=vec4(1.-A.rgb,A.a);}`, {}), this.Zd("grayscale", `#version 300 es
precision highp float;uniform sampler2D u_texture;uniform float Ug;in vec2 v_uv;out vec4 fragColor;void main(){vec4 A=texture(u_texture,v_uv);float B=dot(A.rgb,vec3(0.299,0.587,0.114));vec3 C=mix(A.rgb,vec3(B),Ug);fragColor=vec4(C,A.a);}`, { Ug: ["amount", 1] }), this.Zd("sepia", `#version 300 es
precision highp float;uniform sampler2D u_texture;uniform float Ug;in vec2 v_uv;out vec4 fragColor;void main(){vec4 A=texture(u_texture,v_uv);vec3 B;B.r=dot(A.rgb,vec3(0.393,0.769,0.189));B.g=dot(A.rgb,vec3(0.349,0.686,0.168));B.b=dot(A.rgb,vec3(0.272,0.534,0.131));vec3 C=mix(A.rgb,B,Ug);fragColor=vec4(C,A.a);}`, { Ug: ["amount", 1] }), this.Zd("threshold", `#version 300 es
precision highp float;uniform sampler2D u_texture;uniform float Uj;in vec2 v_uv;out vec4 fragColor;void main(){vec4 A=texture(u_texture,v_uv);float B=dot(A.rgb,vec3(0.299,0.587,0.114));float C=step(Uj,B);fragColor=vec4(vec3(C),A.a);}`, { Uj: ["threshold", 0.5] });
  }
}
const Fi = Object.freeze(Object.defineProperty({ __proto__: null, TextmodeFilterManager: Ie }, Symbol.toStringTag, { value: "Module" }));
class Be {
  constructor(t, e) {
    o(this, "ue");
    o(this, "X");
    o(this, "qd");
    o(this, "Jd");
    o(this, "t_", []);
    o(this, "i_", []);
    o(this, "s_");
    o(this, "e_", !1);
    o(this, "r_", /* @__PURE__ */ new Set());
    o(this, "n_", []);
    o(this, "h_", []);
    o(this, "o_", !1);
    o(this, "a_", () => {
    });
    o(this, "c_");
    o(this, "u_");
    o(this, "l_");
    o(this, "f_");
    o(this, "d_");
    o(this, "__", { As: !0, bs: 1, Cs: 0, Ms: "normal" });
    this.ue = t, this.X = t.X, this.Jd = new Ie(this.X), this.qd = new li(this.X, this.ue.p.width, this.ue.p.height), this.s_ = new N(this.X, { visible: !0, opacity: 1, fontSize: e.fontSize, fontSource: e.fontSource }), this.f_ = new ke(this.ue, e.loadingScreen), this.d_ = new Xe(this.ue);
  }
  async Dt() {
    await this.p_(this.s_);
    const t = this.ue.p;
    this.c_ = this.X.K(t.width, t.height, 1), this.u_ = this.X.K(t.width, t.height, 1), this.l_ = this.c_, this.Jd.Dt(t.width, t.height), await this.f_.Dt(), await this.d_.Dt(), await this.p_(this.f_.le), await this.p_(this.d_.le), await this.m_(), this.e_ = !0;
  }
  g_(t, e) {
    (this.o_ ? this.h_ : this.n_).push({ name: t, params: e });
  }
  v_(t) {
    this.a_ = t;
  }
  y_() {
    this.n_ = [], this.h_ = [];
  }
  add(t = {}) {
    const e = new N(this.X, t);
    return this.e_ ? (this.p_(e), this.t_.push(e)) : this.i_.push(e), e;
  }
  remove(t) {
    this.w_(this.t_, t) || this.w_(this.i_, t);
  }
  move(t, e) {
    this.A_(this.t_, t, e) || this.A_(this.i_, t, e);
  }
  swap(t, e) {
    this.b_(this.t_, t, e) || this.b_(this.i_, t, e);
  }
  clear() {
    this.M_(this.t_), this.t_ = [], this.M_(this.i_), this.i_ = [];
  }
  C_(t, e = [], s = !1) {
    this.ue.Js.Zf(), this.s_.$s(this.ue, this.ue.x_);
    const i = [...this.X.state._n.cn];
    let n = i;
    for (const h of this.t_) h.$s(this.ue, this.ue.x_);
    for (const h of e) h.As && h.$s(this.ue, this.ue.x_, { skipPluginHooks: !0 });
    if (s && e.length > 0) {
      const h = e[0], a = [...this.X.state._n.cn], c = Math.max(0, Math.min(1, h.bs));
      n = this.F_(i, a, c);
    }
    this.P_(t, n, e);
  }
  F_(t, e, s) {
    const i = 1 - s;
    return [t[0] * i + e[0] * s, t[1] * i + e[1] * s, t[2] * i + e[2] * s, t[3] * i + e[3] * s];
  }
  S_() {
    this.C_(this.c_), this.T_();
  }
  E_(t, e = !1) {
    this.C_(this.c_, [t], e), this.T_();
  }
  T_() {
    let t = this.c_.textures[0];
    if (this.n_.length > 0) {
      const e = this.ue.p;
      this.Jd.Wd(this.c_.textures[0], this.u_, this.n_, e.width, e.height), t = this.u_.textures[0], this.l_ = this.u_, this.n_ = [];
    } else this.l_ = this.c_;
    try {
      try {
        this.o_ = !0, this.a_.call(this.ue);
      } finally {
        this.o_ = !1;
      }
      if (this.h_.length > 0) {
        const e = this.u_;
        this.Jd.Wd(this.l_.textures[0], e, this.h_, this.ue.p.width, this.ue.p.height), t = e.textures[0], this.l_ = e;
      }
    } finally {
      this.h_ = [], this.o_ = !1;
    }
    this.U_(t), this.ue.Js.Yf();
  }
  U_(t) {
    const e = this.ue.p;
    this.X.gh(0, 0, 0, 0), this.X.ne(this.ue.k_), this.ue.k_.he({ u_texture: t }), this.X.oe(0, 0, e.width, e.height);
  }
  L_(t) {
    this.D_(() => {
      t.$s(this.ue, this.ue.x_, { skipPluginHooks: !0 });
      const e = t.texture, s = t.grid;
      e && s && (this.X.gh(...this.X.state._n.cn), this.X.ne(this.ue.k_), this.ue.k_.he({ u_texture: e }), this.X.oe(s.offsetX, s.offsetY, s.width, s.height));
    });
  }
  R_(t, e = !1) {
    this.D_(() => {
      const s = this.ue.p, i = this.l_ ?? this.c_, n = i.textures[0];
      if (!n) return;
      t.$s(this.ue, this.ue.x_, { skipPluginHooks: !0 });
      const h = this.O_(t);
      if (!h) return void this.U_(n);
      let a = [0, 0, 0, 0];
      if (e) {
        const l = [...this.X.state._n.cn], u = Math.max(0, Math.min(1, t.bs));
        a = this.F_(a, l, u);
      }
      const c = this.B_(i);
      this.qd.zd({ base: { layer: this.__, texture: n, width: s.width, height: s.height, offsetX: 0, offsetY: 0 }, layers: [h], targetFramebuffer: c, backgroundColor: a, canvasWidth: s.width, canvasHeight: s.height }), this.U_(c.textures[0]);
    });
  }
  D_(t) {
    const e = !this.X.Ro();
    e && this.X.Lo(!0), this.X.Io(!0), this.X.state.Ie();
    try {
      this.X.state.Zi.vs(), this.X.state.se(), t();
    } finally {
      this.X.state.je(), this.X.jo(), e && this.X.Lo(!1);
    }
  }
  B_(t) {
    return t === this.c_ ? this.u_ : this.c_;
  }
  O_(t) {
    if (!t.grid || !t.texture) return;
    const e = t.grid;
    return { layer: t, texture: t.texture, width: e.width, height: e.height, offsetX: e.offsetX + t.l, offsetY: e.offsetY + t._ };
  }
  P_(t, e, s = []) {
    const i = this.ue.p, n = this.O_(this.s_);
    if (!n) return;
    const h = [];
    for (const a of this.t_) {
      const c = this.O_(a);
      c && h.push(c);
    }
    for (const a of s) {
      if (!a.As) continue;
      const c = this.O_(a);
      c && h.push(c);
    }
    this.qd.zd({ base: n, layers: h, targetFramebuffer: t, backgroundColor: e, canvasWidth: i.width, canvasHeight: i.height });
  }
  ce() {
    var e, s, i, n, h;
    if (!this.e_) return;
    const t = this.ue.p;
    this.s_.ce();
    for (const a of this.t_) a.ce();
    (e = this.f_.le) == null || e.ce(), (s = this.d_.le) == null || s.ce(), this.qd.ce(t.width, t.height), (i = this.c_) == null || i.resize(t.width, t.height), (n = this.u_) == null || n.resize(t.width, t.height), (h = this.Jd) == null || h.ce(t.width, t.height);
  }
  k() {
    var t, e;
    this.f_.k(), this.d_.k(), this.clear(), this.ue.Js.Kf(this.s_), this.s_.k(), this.Jd.k(), this.qd.k(), (t = this.c_) == null || t.dispose(), (e = this.u_) == null || e.dispose(), this.n_ = [], this.h_ = [], this.o_ = !1, this.e_ = !1;
  }
  get all() {
    return this.t_;
  }
  get base() {
    return this.s_;
  }
  get filters() {
    return this.Jd;
  }
  get resultFramebuffer() {
    const t = this.n_.length > 0 || this.h_.length > 0 ? this.u_ : this.l_ ?? this.c_;
    if (!t) throw new b("LayerManager.resultFramebuffer is not available before initialization completes.");
    return t;
  }
  get loading() {
    return this.f_;
  }
  get errors() {
    return this.d_;
  }
  I_() {
    const t = this.t_;
    for (let e = t.length - 1; e >= 0; e--) {
      const s = t[e];
      if (s.As && s.grid) return s.grid;
    }
    return this.s_.grid;
  }
  j_(t) {
    this.r_.add(t);
  }
  z_() {
    for (const t of this.r_) t();
  }
  async m_() {
    for (let t = 0; t < this.i_.length; t++) {
      const e = this.i_[t];
      await this.p_(e), this.t_.push(e);
    }
    this.i_ = [];
  }
  w_(t, e) {
    const s = t.indexOf(e);
    return s !== -1 && (t.splice(s, 1), this.H_(e), !0);
  }
  A_(t, e, s) {
    const i = t.indexOf(e);
    return i !== -1 && (t.splice(i, 1), t.splice(Q(s, 0, t.length), 0, e), !0);
  }
  b_(t, e, s) {
    if (e === s) return !0;
    const i = t.indexOf(e), n = t.indexOf(s);
    return i !== -1 && n !== -1 && (t[i] = s, t[n] = e, !0);
  }
  M_(t) {
    for (const e of t) this.H_(e);
  }
  H_(t) {
    this.ue.Js.Kf(t), t.k();
  }
  async p_(t) {
    var s;
    const e = { renderer: this.X, canvas: this.ue.p, filterManager: this.Jd, createFramebuffer: (i, n, h = 1, a) => this.X.K(i, n, h, a) };
    await t.Xs(e), (s = t.grid) == null || s.F(() => this.z_());
  }
}
const Li = Object.freeze(Object.defineProperty({ __proto__: null, TEXTMODE_LAYER_BLEND_MODES: at, TextmodeLayer: N, TextmodeLayerManager: Be }, Symbol.toStringTag, { value: "Module" })), di = `#version 300 es
precision highp float;in vec2 v_uv;in vec3 v_worldPosition;uniform sampler2D u_image;uniform bool u_invert;uniform bool u_flipX;uniform bool u_flipY;uniform float u_charRotation;uniform float Uk;uniform float Ul;uniform bool u_charColorFixed;uniform vec4 u_charColor;uniform bool u_cellColorFixed;uniform vec4 u_cellColor;uniform vec4 u_backgroundColor;uniform int u_charCount;uniform sampler2D u_charPaletteTexture;uniform ivec2 u_charPaletteDimensions;layout(location=0)out vec4 o_character;layout(location=1)out vec4 o_primaryColor;layout(location=2)out vec4 o_secondaryColor;layout(location=3)out vec4 o_statePayload;
` + he + `
float A(vec3 B){return dot(B,vec3(0.299f,0.587f,0.114f));}vec3 C(int D){int E=max(u_charPaletteDimensions.x,1);int F=D/E;int G=D%E;return texelFetch(u_charPaletteTexture,ivec2(G,F),0).rgb;}void main(){vec2 H=vec2(v_uv.x,1.0f-v_uv.y);vec4 I=texture(u_image,H);float J=A(I.rgb);if(I.a<0.01f||J<Uk||J>Ul){discard;}vec2 K=vec2(0.);if(u_charCount>0){float L=float(u_charCount);float M=clamp(J*(L-1.0f),0.0f,L-1.0f);int N=int(floor(M+0.5f));vec3 O=C(N);K=O.xy;}else{K=vec2(0.0f,0.0f);}vec4 P=u_charColorFixed?u_charColor:I;vec4 Q=u_cellColorFixed?u_cellColor:I;vec3 R=tmApplyLighting(P.rgb,v_worldPosition);vec3 S=tmApplyLighting(Q.rgb,v_worldPosition);o_primaryColor=vec4(R,P.a);o_secondaryColor=vec4(S,Q.a);o_statePayload=vec4(0.);int T=int(u_invert?1:0);int U=int(u_flipX?1:0);int V=int(u_flipY?1:0);float W=float(T|(U<<1)|(V<<2))/255.;o_character=vec4(K,W,clamp(u_charRotation,0.0f,1.0f));}`, pi = { id: "brightness", createShader: ({ gl: r }) => new lt(r, ne, di), createUniforms: ({ source: r }) => r.createBaseConversionUniforms() };
class Ne {
  constructor() {
    o(this, "Q_", /* @__PURE__ */ new Map());
    o(this, "Xd", /* @__PURE__ */ new Map());
    this.N_();
  }
  register(t) {
    this.Q_.set(t.id, t);
  }
  unregister(t) {
    const e = this.Xd.get(t);
    return e && (e.dispose(), this.Xd.delete(t)), this.Q_.delete(t);
  }
  has(t) {
    return this.Q_.has(t);
  }
  Zc(t) {
    return this.Q_.get(t);
  }
  jc(t, e) {
    let s = this.Xd.get(t);
    if (!s) {
      const i = this.Q_.get(t);
      if (!i) throw Error(`[textmode.js] Conversion mode "${t}" is not registered.`);
      s = i.createShader(e), this.Xd.set(t, s);
    }
    return s;
  }
  k() {
    for (const t of this.Xd.values()) t.dispose();
    this.Xd.clear(), this.Q_.clear();
  }
  N_() {
    this.register(pi);
  }
}
const Ui = Object.freeze(Object.defineProperty({ __proto__: null, TextmodeConversionManager: Ne }, Symbol.toStringTag, { value: "Module" })), se = "textmode-v1";
function ze() {
  var t, e;
  const r = globalThis.crypto;
  if (r != null && r.getRandomValues) {
    const s = new Uint32Array(4);
    return r.getRandomValues(s), `auto:${s[0]}:${s[1]}:${s[2]}:${s[3]}`;
  }
  return `auto:${Date.now()}:${((e = (t = globalThis.performance) == null ? void 0 : t.now) == null ? void 0 : e.call(t)) ?? 0}:${Math.random()}`;
}
function oe(r) {
  return typeof r == "number" ? "number:" + (r + "") : "string:" + r;
}
function St(r, t) {
  let e = (2166136261 ^ t) >>> 0;
  for (let s = 0; s < r.length; s += 1) e ^= r.charCodeAt(s), e = Math.imul(e, 16777619), e ^= e >>> 13;
  return e ^= r.length, e = Math.imul(e ^ e >>> 16, 2146121005), e = Math.imul(e ^ e >>> 15, 2221713035), (e ^ e >>> 16) >>> 0;
}
function _e(r) {
  const t = r[0] + r[1] + r[3] | 0;
  return r[3] = r[3] + 1 | 0, r[0] = r[1] ^ r[1] >>> 9, r[1] = r[2] + (r[2] << 3) | 0, r[2] = r[2] << 21 | r[2] >>> 11, r[2] = r[2] + t | 0, t >>> 0;
}
class ae {
  constructor(t = ze()) {
    o(this, "pe");
    this.randomSeed(t);
  }
  random(t, e) {
    if (Array.isArray(t))
      return t.length === 0 ? void 0 : t[Math.floor(this.X_() * t.length)];
    const s = this.X_();
    return typeof t != "number" ? s : e === void 0 ? s * t : t + s * (e - t);
  }
  randomSeed(t) {
    this.pe = (function(e) {
      const s = `${se}\0${e}`, i = [St(s, 608135816), St(s, 2242054355), St(s, 320440878), St(s, 57701188)];
      i.every((n) => n === 0) && (i[0] = 1831565813);
      for (let n = 0; n < 12; n += 1) _e(i);
      return i;
    })(oe(t));
  }
  X_() {
    return _e(this.pe) / 4294967296;
  }
  static get G_() {
    return se;
  }
}
const Di = Object.freeze(Object.defineProperty({ __proto__: null, TEXTMODE_RANDOM_ALGORITHM: se, TextmodeRandom: ae }, Symbol.toStringTag, { value: "Module" }));
class g {
  constructor(t = {}) {
    o(this, "X");
    o(this, "x_");
    o(this, "k_");
    o(this, "p");
    o(this, "V_");
    o(this, "tf");
    o(this, "Z_");
    o(this, "W_");
    o(this, "Y_");
    o(this, "K_");
    o(this, "ee");
    o(this, "Ha");
    o(this, "q_", /* @__PURE__ */ new Set());
    o(this, "Js");
    o(this, "J_");
    o(this, "tp");
    o(this, "ip", /* @__PURE__ */ new Map());
    o(this, "sp");
    o(this, "ep");
    o(this, "rp");
    o(this, "To", !1);
    o(this, "np", !1);
    o(this, "ga", !1);
    o(this, "hp", null);
    o(this, "op", !1);
    o(this, "ap", 0);
    o(this, "cp", () => {
    });
    o(this, "lp", () => {
    });
    o(this, "fp");
    o(this, "dp");
    o(this, "_p");
    o(this, "la", !1);
    o(this, "pp");
    o(this, "mp");
    this.Js = new ai(this), this.la = t.overlay ?? !1;
    const e = t.seed ?? ze();
    this.tp = oe(e), this.J_ = new ae(e), this.sp = new Promise((i) => {
      this.rp = i;
    }), this.p = new Ws(t), this.X = new Ks(this.p.xa()), this.x_ = this.X.ir(rt, `#version 300 es
precision highp float;uniform sampler2D u_characterTexture;uniform vec2 u_charsetDimensions;uniform sampler2D Ua;uniform sampler2D Ub;uniform sampler2D U9;uniform bool Uc;uniform vec2 Ud;uniform vec2 Ue;uniform vec4 Uf;in vec2 v_uv;out vec4 fragColor;mat2 A(float B){float C=sin(B);float D=cos(B);return mat2(D,-C,C,D);}float E(vec3 F){return dot(F,vec3(0.299f,0.587f,0.114f));}void main(){vec2 G=gl_FragCoord.xy/Ue;vec2 H=G*Ud;vec2 I=floor(H);vec2 J=(I+0.5)/Ud;vec4 K=texture(Ua,J);vec4 L=texture(Ub,J);vec4 M=texture(U9,J);int N=int(M.r*255.+0.5);int O=int(M.g*255.+0.5);int P=int(M.a*255.+0.5);if(N==255&&O==255){fragColor=mix(Uf,L,L.a);return;}int Q=int(M.b*255.+0.5);bool R=(Q&1)!=0;bool S=(Q&2)!=0;bool T=(Q&4)!=0;int U=N+O*256;int V=int(u_charsetDimensions.x);int W=U/V;int X=U-(W*V);float Y=(u_charsetDimensions.y-1.)-float(W);vec2 Z=1./u_charsetDimensions;vec2 a=vec2(float(X),Y)*Z;vec2 b=a+Z;float c=-M.a*360.*0.017453292;vec2 d=fract(H)-0.5f;vec2 e=vec2(S?-1.:1.,T?-1.:1.);d*=e;d=A(c)*d+0.5;vec2 f=a+clamp(d,0.,1.)*Z;const float g=0.0001;if(any(lessThan(f,a-g))||any(greaterThan(f,b+g))){fragColor=R?K:L;return;}vec4 h=texture(u_characterTexture,f);if(!Uc){fragColor=h;return;}float i=(h.a>0.0f&&E(h.rgb)>0.5f)?1.0f:0.0f;if(R)i=1.0f-i;vec4 j=mix(Uf,L,L.a);fragColor=mix(j,K,i);}`), this.k_ = this.X.ir(rt, Oe), this.V_ = new Hs(t.frameRate ?? 60), this.K_ = new Be(this, t);
    const s = () => this.gp();
    this.tf = new Qs(this.p, s), this.Z_ = new qs(this.p, s, this.tf), this.W_ = new $s(), this.Y_ = new ri(), this.Ha = new Ne(), this.Js.bd(t.plugins ?? []), this.ep = this.Dt();
  }
  vp(t) {
    var e;
    this.q_.add(t), (e = t.D) == null || e.call(t, () => {
      this.q_.delete(t);
    });
  }
  yp(t, e) {
    var s;
    this.p.ce(t, e), (s = this.K_) == null || s.ce(), this.X.na(), this.$s();
  }
  wp() {
    var i;
    const t = (i = this.K_) == null ? void 0 : i.base.grid;
    if (!t) return;
    const e = t.cols, s = t.rows;
    for (const n of this.q_) n instanceof pt && n.ce(e, s);
    this.pp && this.pp.ce(e, s);
  }
  async Dt() {
    await this.K_.Dt(), this.rp();
    const t = this.K_.base.grid;
    this.wp(), this.K_.j_(() => {
      this.tf.sl(), this.Z_.sl();
    }), this.la && (this.pp = gt.Wc(this.X, this.Ha, this.p.targetCanvas, t.cols, t.rows)), this.Ap(), t.F(() => {
      this.wp();
    }), this.bp();
    try {
      await this.Js.$f(), await this.cp(), await this.Js.Jf(), this.V_.ou = 0, this.loading.Ed(), this.op = !0, this.bp();
    } catch (e) {
      this.Mp(e, "setup");
    }
  }
  bp() {
    this.V_.cu(() => this.$s(), () => this.Cp());
  }
  Cp() {
    return !this.np && !this.ga && (this.loading.ye || this.errors.ye || this.op || this.ap > 0 || this.hp !== null);
  }
  xp(t) {
    this.ap += t, this.bp(), this.To || this.loading.ye || this.errors.ye || this.Fp();
  }
  Ap() {
    this.fp = () => {
      this.la && this.resizeCanvas(this.p.targetCanvas.width, this.p.targetCanvas.height), this.lp();
    }, window.addEventListener("resize", this.fp), this.tf.Zu(), this.Z_.Zu(), this.W_.Zu(), this.Y_.Zu(), this.dp = () => {
      this.W_.Fl();
    }, window.addEventListener("blur", this.dp), this.la && (this._p = new ResizeObserver(() => {
      this.resizeCanvas(this.p.targetCanvas.width, this.p.targetCanvas.height);
    }), this._p.observe(this.p.targetCanvas));
  }
  $s() {
    if (this.errors.ye) {
      this.errors.be();
      const t = this.errors.le;
      return void (t && this.K_.L_(t));
    }
    if (this.loading.ye) try {
      this.loading.be();
      const t = this.loading.le;
      if (!t || !this.loading.ye) return;
      if (this.loading.pe === "transitioning") {
        if (this.Pp(), this.errors.ye || !this.loading.ye) return;
        this.K_.R_(t, !0);
      } else this.K_.L_(t);
    } catch (t) {
      this.Mp(t, "loading screen");
    }
    else this.Fp() || this.Sp() && this.Tp();
  }
  Sp() {
    return this.op || this.V_.iu;
  }
  Pp() {
    this.Sp() && this.Tp();
  }
  Fp() {
    if (this.loading.ye || this.errors.ye || this.ap <= 0) return !1;
    for (this.op = !1; this.ap > 0; ) this.ap--, this.Tp();
    return !0;
  }
  Tp() {
    this.op = !1, this.V_.pu(), this.V_.gu(), this.tf.al(), this.Y_.al(), this.To = !0, this.X.Lo(!0);
    try {
      this.la && Ut(this.X.context, this.pp.texture, this.p.targetCanvas), this.K_.S_();
    } catch (t) {
      this.Mp(t, "draw loop");
    } finally {
      if (this.To = !1, this.X.Lo(!1), this.np && !this.ga) this.Ep();
      else if (this.hp) {
        const { width: t, height: e } = this.hp;
        this.hp = null, this.yp(t, e);
      }
    }
  }
  resizeCanvas(t, e) {
    this.To ? this.hp = { width: t, height: e } : this.yp(t, e);
  }
  destroy() {
    this.ga || this.np || (this.np = !0, this.V_.fu(), this.To || this.Ep());
  }
  async Ep() {
    var t, e, s, i;
    this.p.k(), await this.Js.Pd(), window.removeEventListener("resize", this.fp), window.removeEventListener("blur", this.dp), (t = this._p) == null || t.disconnect(), this.tf.il(), this.Z_.il(), this.W_.il(), this.Y_.il(), (e = this.K_) == null || e.k(), (s = this.Ha) == null || s.k();
    for (const n of this.q_) n.dispose();
    this.q_.clear(), this.x_.dispose(), this.k_.dispose(), this.X.k(), (i = this.pp) == null || i.dispose(), this.ga = !0;
  }
  filter(t, e) {
    this.K_.g_(t, e);
  }
  draw(t) {
    this.K_.base.draw(t);
  }
  postDraw(t) {
    this.K_.base.postDraw(t);
  }
  finalDraw(t) {
    this.K_.v_(t);
  }
  async loadFont(t, e = !0) {
    if (e) return await this.K_.base.loadFont(t), this.K_.base.font;
    if (t instanceof D) return t.Et || await t.Dt(), t;
    const s = new D(this.X);
    return await s.Dt(t), this.vp(s), s;
  }
  async loadTileset(t, e = !0) {
    if (e) return await this.K_.base.loadTileset(t), this.K_.base.font;
    if (t instanceof k) return t.Et || await t.Dt(), t;
    const s = new k(this.X, t.fontSize, t);
    return await s.Dt(), this.vp(s), s;
  }
  fontSize(t) {
    return this.K_.base.fontSize(t);
  }
  useTileColors(t) {
    return this.K_.base.useTileColors(t);
  }
  inputGrid(t) {
    return t === void 0 ? this.mp ?? "topmost" : t === "topmost" ? (this.mp = void 0, this.tf.sl(), void this.Z_.sl()) : (this.mp = t, this.tf.sl(), void this.Z_.sl());
  }
  gp() {
    return this.mp ? this.mp : this.K_.I_();
  }
  Mp(t, e) {
    console.error(`Error during ${e}:`, t), this.loading.Ed(), this.errors.we(t), this.bp();
  }
  async setup(t) {
    this.cp = t;
  }
  windowResized(t) {
    this.lp = t;
  }
  get grid() {
    var t;
    return ((t = this.ee) == null ? void 0 : t.grid) ?? this.K_.base.grid;
  }
  get font() {
    var t;
    return ((t = this.ee) == null ? void 0 : t.font) ?? this.K_.base.font;
  }
  get width() {
    return this.p.width;
  }
  get height() {
    return this.p.height;
  }
  get canvas() {
    return this.p.canvas;
  }
  get isDisposed() {
    return this.ga;
  }
  get overlay() {
    return this.pp;
  }
  get loading() {
    return this.K_.loading;
  }
  get errors() {
    return this.K_.errors;
  }
  get layers() {
    return this.K_;
  }
  get filters() {
    return this.K_.filters;
  }
  get conversions() {
    return this.Ha;
  }
  get isRenderingFrame() {
    return this.To;
  }
}
class ce {
  constructor() {
  }
  static create(t = {}) {
    return new g(t);
  }
  static setErrorLevel(t) {
    st.Ui(t);
  }
  static get version() {
    return "0.15.0";
  }
}
const Bt = ["keyPressed", "keyTyped", "keyReleased"], Nt = ["mouseClicked", "doubleClicked", "mousePressed", "mouseReleased", "mouseMoved", "mouseDragged", "mouseScrolled"], zt = ["touchStarted", "touchMoved", "touchEnded", "touchCancelled"], Zt = ["tap", "doubleTap", "longPress", "swipe", "pinch", "rotateGesture"], Vt = ["gamepadConnected", "gamepadDisconnected", "gamepadButtonPressed", "gamepadButtonReleased", "gamepadAxisChanged"], gi = [...Bt, ...Nt, ...zt, ...Zt, ...Vt], mi = new Set(Bt), vi = new Set(Nt), yi = new Set(zt), wi = new Set(Zt), _i = new Set(Vt);
function Ft(r, t) {
  switch ((function(e) {
    const s = e;
    if (mi.has(s)) return "keyboard";
    if (vi.has(s)) return "mouse";
    if (yi.has(s)) return "touch";
    if (wi.has(s)) return "gesture";
    if (_i.has(s)) return "gamepad";
    throw Error(`Unknown event: "${s}"`);
  })(t)) {
    case "keyboard":
      return r.W_.zu;
    case "mouse":
      return r.tf.zu;
    case "touch":
    case "gesture":
      return r.Z_.zu;
    case "gamepad":
      return r.Y_.zu;
  }
}
const Ae = /* @__PURE__ */ new WeakMap();
function Ai(r, t, e) {
  var n;
  let s = Ae.get(r);
  s || (s = /* @__PURE__ */ new Map(), Ae.set(r, s)), (n = s.get(t)) == null || n();
  const i = Ft(r, t).Mu(t, e);
  s.set(t, i);
}
function ft(r) {
  const t = g.prototype;
  for (const e of r) t[e] = function(s) {
    Ai(this, e, s);
  };
}
function Yt(r) {
  for (const { name: t, get: e } of r) Object.defineProperty(g.prototype, t, { get: e, configurable: !0, enumerable: !0 });
}
function Ze(r, t) {
  const e = g.prototype;
  e[r] = e[t];
}
function Ve(r, t) {
  return function(e, s, i, n) {
    if (e === void 0) return S.Da(...r.call(this));
    const h = S.Ta(e, s, i, n);
    t.call(this, h);
  };
}
const bi = Object.freeze(Object.defineProperty({ __proto__: null, MOUSE_EVENT_NAMES: Nt }, Symbol.toStringTag, { value: "Module" }));
ft(Nt), g.prototype.cursor = function(r) {
  this.tf.Nu(r);
}, g.prototype.requestPointerLock = function() {
  return this.tf.Xu();
}, g.prototype.exitPointerLock = function() {
  this.tf.Gu();
}, Yt([{ name: "mouse", get: function() {
  return this.tf.el();
} }, { name: "mouseIsPressed", get: function() {
  return this.tf.ol();
} }, { name: "pmouse", get: function() {
  return this.tf.rl();
} }, { name: "movedX", get: function() {
  return this.tf.nl();
} }, { name: "movedY", get: function() {
  return this.tf.hl();
} }]), g.prototype.frameRate = function(r) {
  return r === void 0 ? this.V_.su : this.V_._u(r, () => this.$s());
}, g.prototype.targetFrameRate = function(r) {
  if (r === void 0) return this.V_.Kc;
  this.V_.mu(r);
}, g.prototype.noLoop = function() {
  this.V_.fu();
}, g.prototype.loop = function() {
  this.V_.du(() => this.$s());
}, g.prototype.redraw = function(r = 1) {
  st.Ei(typeof r == "number" && r > 0 && Number.isInteger(r), "Redraw count must be a positive integer.", { method: "redraw", providedValue: r }) && this.xp(r);
}, g.prototype.isLooping = function() {
  return this.V_.iu;
}, g.prototype.deltaTime = function() {
  return this.V_.hu;
}, Object.defineProperty(g.prototype, "frameCount", { get: function() {
  return this.V_.ou;
}, set: function(r) {
  this.V_.ou = r;
}, configurable: !0, enumerable: !0 }), Object.defineProperty(g.prototype, "millis", { get: function() {
  return this.V_.vu;
}, set: function(r) {
  this.V_.vu = r;
}, configurable: !0, enumerable: !0 }), Object.defineProperty(g.prototype, "secs", { get: function() {
  return this.V_.yu;
}, set: function(r) {
  this.V_.yu = r;
}, configurable: !0, enumerable: !0 });
const xi = Object.freeze(Object.defineProperty({ __proto__: null, GESTURE_EVENT_NAMES: Zt, TOUCH_EVENT_NAMES: zt }, Symbol.toStringTag, { value: "Module" }));
ft(zt), ft(Zt), Yt([{ name: "touches", get: function() {
  return this.Z_.df();
} }]);
const Ei = Object.freeze(Object.defineProperty({ __proto__: null, KEYBOARD_EVENT_NAMES: Bt }, Symbol.toStringTag, { value: "Module" }));
ft(Bt), g.prototype.isKeyPressed = function(r) {
  return this.W_.wl(r);
}, Yt([{ name: "lastKeyPressed", get: function() {
  return this.W_.bl();
} }, { name: "lastKeyReleased", get: function() {
  return this.W_.Ml();
} }, { name: "pressedKeys", get: function() {
  return this.W_.Cl();
} }, { name: "modifierState", get: function() {
  return this.W_.xl();
} }]);
const Ci = Object.freeze(Object.defineProperty({ __proto__: null, GAMEPAD_EVENT_NAMES: Vt }, Symbol.toStringTag, { value: "Module" }));
ft(Vt), g.prototype.gamepad = function(r) {
  return this.Y_.Pf(r);
}, Yt([{ name: "gamepads", get: function() {
  return this.Y_.Ff();
} }]), g.prototype.perspective = function(r, t, e) {
  this.layers.base.perspective(r, t, e);
}, g.prototype.createCamera = function() {
  return this.layers.base.createCamera();
}, g.prototype.setCamera = function(r) {
  this.layers.base.setCamera(r);
}, g.prototype.resetCamera = function() {
  this.layers.base.resetCamera();
}, g.prototype.camera = function(r, t, e, s = 0, i = 0, n = 0, h = 0, a = 1, c = 0) {
  this.layers.base.camera(r, t, e, s, i, n, h, a, c);
}, g.prototype.lookAt = function(r, t, e, s, i, n) {
  this.layers.base.lookAt(r, t, e, s, i, n);
}, g.prototype.ortho = function(r, t) {
  this.layers.base.ortho(r, t);
}, g.prototype.rect = function(r = 1, t = 1) {
  this.X.Go(r, t);
}, g.prototype.point = function() {
  this.X.Go(1, 1);
}, g.prototype.line = function(r, t, e, s) {
  this.X.Vo(r, t, e, s);
}, g.prototype.lineWeight = function(r) {
  if (r === void 0) return this.X.state._n.qr;
  this.X.state._n.vn(r);
}, g.prototype.ellipse = function(r = 1, t = 1) {
  this.X.Zo(r / 2, t / 2);
}, g.prototype.triangle = function(r, t, e, s, i, n) {
  this.X.Wo(r, t, e, s, i, n);
}, g.prototype.arc = function(r, t, e, s) {
  this.X.Ko(r / 2, t / 2, e, s);
}, g.prototype.bezierCurve = function(r, t, e, s, i, n, h, a) {
  this.X.Yo(r, t, e, s, i, n, h, a);
}, g.prototype.box = function(r = 50, t, e) {
  const s = t ?? r, i = e ?? s;
  this.X.$o(r, s, i);
}, g.prototype.sphere = function(r = 50) {
  this.X.qo(r);
}, g.prototype.torus = function(r = 50, t = 10) {
  this.X.Jo(r, t);
}, g.prototype.cone = function(r = 50, t) {
  this.X.ta(r, t ?? r);
}, g.prototype.cylinder = function(r = 50, t) {
  this.X.ia(r, t ?? r);
}, g.prototype.ellipsoid = function(r = 50, t, e) {
  this.X.sa(r, t ?? r, e ?? r);
};
const be = new Float32Array(16);
g.prototype.rotate = function(r = 0, t, e) {
  const s = this.X.state.Sn;
  if (typeof t == "number" || e !== void 0) return s.Fr(r), s.Pr(t ?? 0), void s.Sr(e ?? 0);
  t === void 0 ? s.Sr(r) : Array.isArray(t) ? s.Tr(r, t[0] ?? 0, t[1] ?? 0, t[2] ?? 0) : s.Tr(r, t.x ?? 0, t.y ?? 0, t.z ?? 0);
}, g.prototype.rotateX = function(r) {
  if (r === void 0) return Xt(this.X.state.Sn.ur);
  this.X.state.Sn.Fr(r);
}, g.prototype.rotateY = function(r) {
  if (r === void 0) return Xt(this.X.state.Sn.lr);
  this.X.state.Sn.Pr(r);
}, g.prototype.rotateZ = function(r) {
  if (r === void 0) return Xt(this.X.state.Sn.dr);
  this.X.state.Sn.Sr(r);
}, g.prototype.translate = function(r = 0, t = 0, e = 0) {
  this.X.state.Sn.br(r, t, e);
}, g.prototype.translateX = function(r) {
  if (r === void 0) return this.X.state.Sn.hr;
  this.X.state.Sn.br(r, 0, 0);
}, g.prototype.translateY = function(r) {
  if (r === void 0) return this.X.state.Sn.ar;
  this.X.state.Sn.br(0, r, 0);
}, g.prototype.translateZ = function(r) {
  if (r === void 0) return this.X.state.Sn.cr;
  this.X.state.Sn.br(0, 0, r);
}, g.prototype.scale = function(r, t, e) {
  this.X.state.Sn.Cr(r, t, e);
}, g.prototype.resetMatrix = function() {
  this.X.state.Sn.Er();
}, g.prototype.applyMatrix = function(...r) {
  let t;
  if (r.length === 1 && typeof r[0] != "number") t = r[0];
  else {
    if (r.length !== 16) throw Error("applyMatrix() expects either a 16-length array-like or 16 numeric arguments.");
    t = r;
  }
  if (t.length !== 16) throw Error("applyMatrix() expects exactly 16 values.");
  for (let e = 0; e < 16; e++) be[e] = Number(t[e] ?? 0);
  this.X.state.Sn.kr(be);
}, g.prototype.push = function() {
  this.X.state.Ie();
}, g.prototype.pop = function() {
  this.X.state.je();
}, g.prototype.color = function(r, t, e, s) {
  return S.Ta(r, t, e, s);
}, g.prototype.background = function(r, t, e, s = 255) {
  if (r === void 0) {
    const [n, h, a, c] = this.X.state._n.cn;
    return S.Da(n, h, a, c);
  }
  const i = S.Ta(r, t, e, s);
  this.X.state._n.Pn(i.r, i.g, i.b, i.a), this.X.ea(i.r, i.g, i.b, i.a);
}, g.prototype.clear = function() {
  this.X.gh(0, 0, 0, 0);
};
const Ti = Ve(function() {
  return this.X.state._n.sn;
}, function(r) {
  this.X.state._n.An(r.r, r.g, r.b, r.a);
});
g.prototype.charColor = Ti, Ze("stroke", "charColor");
const Mi = Ve(function() {
  return this.X.state._n.en;
}, function(r) {
  this.X.state._n.bn(r.r, r.g, r.b, r.a);
});
function xe(r) {
  if (typeof r != "object" || r === null) return !1;
  const t = r;
  return typeof t.x == "number" && typeof t.y == "number" && typeof t.z == "number";
}
g.prototype.cellColor = Mi, Ze("fill", "cellColor"), g.prototype.char = function(r) {
  if (r === void 0) return this.X.state._n.tn;
  const t = typeof r == "number" ? this.font.characters[r].character : r;
  if (t.length === 0) throw Error("char() requires at least one character.");
  this.X.state._n.yn(this.font.zt(t)), this.X.state._n.wn(t);
}, g.prototype.flipX = function(r) {
  if (r === void 0) return this.X.state._n.rn;
  this.X.state._n.Mn(r);
}, g.prototype.flipY = function(r) {
  if (r === void 0) return this.X.state._n.nn;
  this.X.state._n.Cn(r);
}, g.prototype.charRotation = function(r) {
  if (r === void 0) return 360 * this.X.state._n.an;
  this.X.state._n.Fn(r);
}, g.prototype.invert = function(r) {
  if (r === void 0) return this.X.state._n.hn;
  this.X.state._n.xn(r);
}, g.prototype.ambientLight = function(r, t, e, s) {
  const i = S.Ta(r, t, e, s), [n, h, a] = i.normalized;
  this.X.state.ie.Wr(n, h, a);
}, g.prototype.pointLight = function(r, t, e, s, i, n) {
  let h, a;
  if (typeof r == "number" && typeof t == "number" && typeof e == "number") if (h = S.Ta(r, t, e), xe(s)) a = s;
  else {
    if (typeof s != "number" || typeof i != "number" || typeof n != "number") throw Error("pointLight() expected RGB + XYZ or RGB + { x, y, z }.");
    a = { x: s, y: i, z: n };
  }
  else if (h = S.Ta(r), xe(t)) a = t;
  else {
    if (typeof t != "number" || typeof e != "number" || typeof s != "number") throw Error("pointLight() expected color + XYZ or color + { x, y, z }.");
    a = { x: t, y: e, z: s };
  }
  const [c, l, u] = h.normalized;
  this.X.state.ie.Yr(c, l, u, a.x, a.y, a.z);
}, g.prototype.lightFalloff = function(r, t, e) {
  this.X.state.ie.Kr(r, t, e);
}, g.prototype.noLights = function() {
  this.X.state.ie.$r();
}, g.prototype.shader = function(r) {
  this.X.Oo(r);
}, g.prototype.resetShader = function() {
  this.X.Bo();
}, g.prototype.setUniform = function(r, t) {
  this.X.rr(r, t);
}, g.prototype.setUniforms = function(r) {
  this.X.he(r);
}, g.prototype.createFilterShader = async function(r) {
  const t = await Rt(r), e = this.X.zo(t);
  return this.vp(e), e;
}, g.prototype.createShader = async function(r, t) {
  const e = await Rt(r), s = await Rt(t), i = this.X.ir(e, s);
  return this.vp(i), i;
};
class mt extends pt {
  constructor(e, s, i, n, h, a, c, l, u) {
    super(e, s, i, n, h, a, c, l);
    o(this, "Wt");
    this.Wt = u;
  }
  static kp(e, s, i, n, h) {
    const a = e.context, { texture: c, width: l, height: u } = re(a, i);
    return new mt(a, e, c, s, l, u, n, h, i);
  }
  $() {
    this.Wt instanceof HTMLVideoElement ? this.Wt.readyState >= this.Wt.HAVE_CURRENT_DATA && Ut(this.Ce, this.Ra, this.Wt) : Ut(this.Ce, this.Ra, this.Wt);
  }
  Qe() {
    return this.Se = null, super.Qe();
  }
  Lc() {
    this.$();
  }
  get source() {
    return this.Wt;
  }
}
class H extends mt {
  constructor(t, e, s, i, n, h, a, c, l) {
    super(t, e, s, i, h, a, c, l, n);
  }
  dispose() {
    super.dispose(), this.Lp.pause(), this.Lp.src = "", this.Lp.load();
  }
  static async Dp(t) {
    const e = document.createElement("video");
    return e.crossOrigin = "anonymous", e.loop = !0, e.muted = !0, e.playsInline = !0, await new Promise((s, i) => {
      e.addEventListener("loadedmetadata", () => s(), { once: !0 }), e.addEventListener("error", (n) => {
        var a;
        const h = n.target;
        i(Error("Failed to load video: " + (((a = h.error) == null ? void 0 : a.message) || "Unknown error")));
      }, { once: !0 }), e.src = t;
    }), e;
  }
  static kp(t, e, s, i, n) {
    const h = t.context, { texture: a, width: c, height: l } = re(h, s, h.LINEAR, h.LINEAR, h.CLAMP_TO_EDGE, h.CLAMP_TO_EDGE);
    return new H(h, t, a, e, s, c, l, i, n);
  }
  static async Wc(t, e, s, i, n) {
    const h = await H.Dp(s);
    return H.kp(t, e, h, i, n);
  }
  async play() {
    await this.Lp.play();
  }
  pause() {
    this.Lp.pause();
  }
  stop() {
    this.Lp.pause(), this.Lp.currentTime = 0;
  }
  speed(t) {
    return this.Lp.playbackRate = t, this;
  }
  loop(t = !0) {
    return this.Lp.loop = t, this;
  }
  time(t) {
    return this.Lp.currentTime = t, this;
  }
  volume(t) {
    return this.Lp.volume = Q(t, 0, 1), this;
  }
  get videoElement() {
    return this.Lp;
  }
  get currentTime() {
    return this.Lp.currentTime;
  }
  get duration() {
    return this.Lp.duration;
  }
  get isPlaying() {
    return !this.Lp.paused && !this.Lp.ended;
  }
  get Lp() {
    return this.Wt;
  }
}
var jt;
g.prototype.createFramebuffer = function(r) {
  const t = this.X.K(r.width ?? this.grid.cols, r.height ?? this.grid.rows, r.attachments ?? 3);
  return this.vp(t), t;
}, g.prototype.image = function(r, t, e) {
  this.X.Ho(r, t, e, this.font), r instanceof nt && this.X.ze();
}, g.prototype.loadImage = async function(r) {
  const t = r, e = new Promise((h, a) => {
    const c = new Image();
    c.crossOrigin = "anonymous", c.onload = () => h(c), c.onerror = (l) => a(l), c.src = t;
  }), [s] = await Promise.all([e, this.sp]), i = this.grid;
  if (!i) throw Error("[textmode.js] Cannot load image before grid initialization completes.");
  const n = gt.Wc(this.X, this.Ha, s, i.cols, i.rows);
  return this.vp(n), n;
}, g.prototype.loadVideo = async function(r) {
  const [t] = await Promise.all([H.Dp(r), this.sp]), e = this.grid;
  if (!e) throw Error("[textmode.js] Cannot load video before grid initialization completes.");
  const s = H.kp(this.X, this.Ha, t, e.cols, e.rows);
  return this.vp(s), s;
}, g.prototype.createTexture = function(r) {
  const t = this.grid, e = mt.kp(this.X, this.Ha, r, (t == null ? void 0 : t.cols) ?? 1, (t == null ? void 0 : t.rows) ?? 1);
  return this.vp(e), e;
}, (jt = g.prototype).on = function(r, t) {
  return Ft(this, r).Mu(r, t);
}, jt.off = function(r, t) {
  Ft(this, r).Cu(r, t);
}, jt.once = function(r, t) {
  return Ft(this, r).xu(r, t);
}, g.prototype.random = function(r, t) {
  return Array.isArray(r) ? this.J_.random(r) : typeof r != "number" ? this.J_.random() : typeof t != "number" ? this.J_.random(r) : this.J_.random(r, t);
}, g.prototype.randomSeed = function(r) {
  this.tp = oe(r), this.J_.randomSeed(r), this.ip.clear();
}, g.prototype.randomStream = function(r) {
  const t = r + "", e = this.ip.get(t);
  if (e) return e;
  const s = new ae((function(i, n) {
    return `stream:${i.length}:${i}:${n.length}:${n}`;
  })(this.tp, t));
  return this.ip.set(t, s), s;
};
const Oi = Object.freeze(Object.defineProperty({ __proto__: null, TextmodeImage: gt, TextmodeSource: pt, TextmodeTexture: mt, TextmodeVideo: H }, Symbol.toStringTag, { value: "Module" })), ki = Object.freeze(Object.defineProperty({ __proto__: null, INPUT_EVENT_NAMES: gi, gamepad: Ci, keyboard: Ei, mouse: bi, touch: xi }, Symbol.toStringTag, { value: "Module" })), Ii = Object.freeze(Object.defineProperty({ __proto__: null }, Symbol.toStringTag, { value: "Module" })), Bi = ce.create, Ni = ce.setErrorLevel, zi = ce.version;
export {
  Xe as ErrorLayerController,
  gi as INPUT_EVENT_NAMES,
  ke as LoadingLayerController,
  at as TEXTMODE_LAYER_BLEND_MODES,
  Y as TextmodeCamera,
  S as TextmodeColor,
  Ne as TextmodeConversionManager,
  b as TextmodeError,
  Me as TextmodeErrorLevel,
  Ie as TextmodeFilterManager,
  D as TextmodeFont,
  nt as TextmodeFramebuffer,
  We as TextmodeGrid,
  gt as TextmodeImage,
  N as TextmodeLayer,
  Be as TextmodeLayerManager,
  ae as TextmodeRandom,
  lt as TextmodeShader,
  pt as TextmodeSource,
  mt as TextmodeTexture,
  k as TextmodeTileset,
  H as TextmodeVideo,
  g as Textmodifier,
  Ui as conversion,
  Bi as create,
  Pi as errors,
  Fi as filters,
  Xi as fonts,
  ki as input,
  Li as layering,
  Ri as loading,
  Oi as media,
  Ii as plugins,
  Di as random,
  Ni as setErrorLevel,
  ce as textmode,
  zi as version
};
