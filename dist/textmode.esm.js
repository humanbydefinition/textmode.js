var Ls = Object.defineProperty;
var Ds = (i, t, e) => t in i ? Ls(i, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : i[t] = e;
var o = (i, t, e) => Ds(i, typeof t != "symbol" ? t + "" : t, e);
class Us {
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
    o(this, "M", !1);
    o(this, "A", /* @__PURE__ */ new Set());
    this.p = t, this.m = e, this.v = s, this.reset();
  }
  C() {
    if (this.o = this.i * this.m, this.u = this.h * this.v, this.l = Math.floor((this.p.width - this.o) / 2), this._ = Math.floor((this.p.height - this.u) / 2), this.A.size > 0) for (const t of this.A) t();
  }
  S(t) {
    this.A.add(t);
  }
  F(t) {
    this.A.delete(t);
  }
  reset() {
    this.M || (this.i = Math.max(1, Math.floor(this.p.width / this.m)), this.h = Math.max(1, Math.floor(this.p.height / this.v))), this.C();
  }
  U(t, e) {
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
  P(t, e) {
    const s = this.p.getBoundingClientRect(), r = t - s.left, n = e - s.top, h = this.p.width / s.width, a = n * (this.p.height / s.height), c = r * h - this.l, u = a - this._, l = Math.floor(c / this.m), f = Math.floor(u / this.v);
    return l >= 0 && l < this.i && f >= 0 && f < this.h ? { x: l - Math.floor((this.i - 1) / 2), y: f - Math.floor(this.h / 2) } : { x: -1 / 0, y: -1 / 0 };
  }
  L() {
    this.A.clear();
  }
}
class Rt {
  constructor() {
    o(this, "D", /* @__PURE__ */ new Set());
  }
  k(t) {
    this.D.add(t);
  }
  dispose() {
    for (const t of this.D) t();
    this.D.clear();
  }
}
class _ extends Error {
  constructor(t, e, s) {
    super(_.R(t, e, s)), this.name = "TextmodeError";
  }
  static R(t, e, s = {}) {
    const { includeContext: r = !0, includeFooterArrows: n = !0 } = s;
    return `${t}${r && e && Object.keys(e).length > 0 ? `

📋 Context:` + Object.entries(e).map(([h, a]) => `
  - ${h}: ${_.O(a)}`).join("") : ""}${n ? `

${"↓".repeat(24)}
` : `

`}`;
  }
  static O(t) {
    if (t === null) return "null";
    if (t === void 0) return "undefined";
    if (typeof t == "string") return `"${t}"`;
    if (typeof t == "number" || typeof t == "boolean") return t + "";
    if (Array.isArray(t)) return t.length === 0 ? "[]" : t.length <= 5 ? `[${t.map((e) => _.O(e)).join(", ")}]` : `[${t.slice(0, 3).map((e) => _.O(e)).join(", ")}, ... +${t.length - 3} more]`;
    if (typeof t == "object") {
      const e = Object.keys(t);
      return e.length === 0 ? "{}" : e.length <= 3 ? `{ ${e.map((s) => `${s}: ${_.O(t[s])}`).join(", ")} }` : `{ ${e.slice(0, 2).map((s) => `${s}: ${_.O(t[s])}`).join(", ")}, ... +${e.length - 2} more }`;
    }
    return t + "";
  }
}
function ve(i, t, e) {
  if (i.idRangeOffset[e] === 0) return t + i.idDelta[e] & 65535;
  {
    const s = i.startCount.length, r = i.idRangeOffset[e] / 2 + (t - i.startCount[e]) - (s - e);
    if (r >= 0 && i.glyphIdArray && r < i.glyphIdArray.length) {
      const n = i.glyphIdArray[r];
      if (n !== 0) return n + i.idDelta[e] & 65535;
    }
  }
  return 0;
}
const Se = /* @__PURE__ */ new WeakMap();
function Gs(i) {
  return i.platformID === 0 || i.platformID === 3 && (i.encodingID === 1 || i.encodingID === 10);
}
function es(i) {
  const t = Se.get(i);
  if (t) return t;
  const e = (function(s) {
    const r = s.cmap;
    if (!(r != null && r.tables)) return { characterTables: [], lookupTables: [] };
    const n = r.tables.map((c, u) => (function(l, f, d) {
      if (!(function(v) {
        return v.format === 4 || v.format === 12;
      })(f)) return null;
      const p = (function(v, w, y) {
        const g = /* @__PURE__ */ new Map();
        for (const b of v.encodings ?? []) b.tableIndex === y && g.set(Jt(b), b);
        for (const b of w.encodings ?? []) b.tableIndex === y && g.set(Jt(b), b);
        for (const [b, M] of Object.entries(v.ids ?? {})) {
          if (M !== y) continue;
          const A = Ns(b, w.format, y);
          A && g.set(Jt(A), A);
        }
        return [...g.values()];
      })(l, f, d);
      return { table: f, tableIndex: d, encodings: p, isUnicode: p.some(Gs) };
    })(r, c, u)).filter((c) => c !== null).filter((c) => (function(u) {
      return u.format === 4 ? (function(l) {
        if (!(l.startCount && l.endCount && l.idRangeOffset && l.idDelta)) return !1;
        for (let f = 0; f < l.startCount.length; f++) {
          const d = l.startCount[f], p = l.endCount[f];
          if (d !== 65535 || p !== 65535) {
            for (let v = d; v <= p; v++) if (ve(l, v, f) > 0) return !0;
          }
        }
        return !1;
      })(u) : (function(l) {
        if (!l.groups) return !1;
        for (let f = 0; f < l.groups.length; f += 3) {
          const d = l.groups[f], p = l.groups[f + 1], v = l.groups[f + 2];
          if (d <= p && v + (p - d) > 0) return !0;
        }
        return !1;
      })(u);
    })(c.table)), h = n.filter((c) => c.isUnicode), a = h.length > 0 ? h : n;
    return { characterTables: a, lookupTables: [...a].sort(Os) };
  })(i);
  return Se.set(i, e), e;
}
function Ns(i, t, e) {
  const s = /^p(\d+)e(\d+)$/.exec(i);
  return s ? { platformID: Number(s[1]), encodingID: Number(s[2]), format: t, tableIndex: e } : null;
}
function Jt(i) {
  return `${i.platformID}:${i.encodingID}:${i.format}:${i.tableIndex}`;
}
function Os(i, t) {
  const e = Re(i) - Re(t);
  return e !== 0 ? e : i.tableIndex - t.tableIndex;
}
function Re(i) {
  const t = i.isUnicode ? 0 : 3;
  return i.table.format === 12 ? t : i.table.format === 4 ? t + 1 : t + 2;
}
class Is {
  I(t) {
    const e = [];
    return (function(s) {
      return es(s).characterTables;
    })(t).forEach(({ table: s }) => {
      if (s.format === 4) {
        const r = this.N(s);
        e.push(...r);
      } else if (s.format === 12) {
        const r = this.j(s);
        e.push(...r);
      }
    }), [...new Set(e)];
  }
  N(t) {
    const e = [];
    if (!(t.startCount && t.endCount && t.idRangeOffset && t.idDelta)) return e;
    for (let s = 0; s < t.startCount.length; s++) {
      const r = t.startCount[s], n = t.endCount[s];
      if (r !== 65535 || n !== 65535) for (let h = r; h <= n; h++)
        ve(t, h, s) > 0 && this.H(e, h);
    }
    return e;
  }
  j(t) {
    const e = [];
    if (!t.groups) return e;
    for (let s = 0; s < t.groups.length; s += 3) {
      const r = t.groups[s], n = t.groups[s + 1], h = t.groups[s + 2];
      for (let a = r; a <= n; a++)
        h + (a - r) > 0 && this.H(e, a);
    }
    return e;
  }
  H(t, e) {
    try {
      const s = String.fromCodePoint(e);
      t.push(s);
    } catch {
    }
  }
}
class ss {
  constructor(t) {
    this.G = t, this.V = null, this.X = 0, this.h = 0, this.o = 0, this.u = 0, this.p = document.createElement("canvas"), this.Y = this.p.getContext("2d", { alpha: !0 });
  }
  K(t, e, s) {
    this.X = Math.ceil(Math.sqrt(t)), this.h = Math.ceil(t / this.X), this.o = e * this.X, this.u = s * this.h, this.p.width = this.o, this.p.height = this.u, this.p.style.width = this.o + "px", this.p.style.height = this.u + "px", this.Y.imageSmoothingEnabled = !1, this.p.style.imageRendering = "pixelated", this.Y.clearRect(0, 0, this.o, this.u);
  }
  W() {
    this.V ? this.V.width === this.o && this.V.height === this.u || this.V.resize(this.o, this.u) : this.V = this.G.Z(this.o, this.u, 1, { filter: "nearest", depth: !1 }), this.V.$(this.p);
  }
  L() {
    var t;
    (t = this.V) == null || t.dispose(), this.V = null;
  }
}
class Bs {
  constructor(t) {
    this.q = new ss(t);
  }
  J(t, e, s, r) {
    this.q.K(t.length, e.width, e.height);
    const n = this.q.Y;
    n.textBaseline = "top", n.textAlign = "left", n.fillStyle = "white", this.tt(t, e, this.q.X, s, r), this.q.W();
  }
  tt(t, e, s, r, n) {
    const h = r / n.head.unitsPerEm, a = this.q.Y;
    for (let c = 0; c < t.length; c++) {
      const u = t[c], l = c % s, f = Math.floor(c / s), d = u.glyphData;
      if (!d) continue;
      const p = d.advanceWidth * h, v = l * e.width, w = f * e.height, y = v + 0.5 * e.width, g = w + 0.5 * e.height, b = Math.round(y - 0.5 * e.width), M = Math.round(g - 0.5 * r), A = b + 0.5 * (e.width - p), x = M + n.hhea.ascender * h;
      this.it(a, d, A, x, h);
    }
  }
  it(t, e, s, r, n) {
    if (!e || !e.xs || e.noc === 0) return;
    const { xs: h, ys: a, endPts: c, flags: u } = e;
    if (!(h && a && c && u)) return;
    t.beginPath();
    let l = 0;
    for (let f = 0; f < c.length; f++) {
      const d = c[f];
      if (!(d < l)) {
        if (d >= l) {
          const p = s + h[l] * n, v = r - a[l] * n;
          t.moveTo(p, v);
          let w = l + 1;
          for (; w <= d; )
            if (1 & u[w]) {
              const y = s + h[w] * n, g = r - a[w] * n;
              t.lineTo(y, g), w++;
            } else {
              const y = s + h[w] * n, g = r - a[w] * n;
              if (w + 1 > d) {
                const M = s + h[l] * n, A = r - a[l] * n;
                if (1 & u[l]) t.quadraticCurveTo(y, g, M, A);
                else {
                  const x = (y + M) / 2, F = (g + A) / 2;
                  t.quadraticCurveTo(y, g, x, F);
                }
                break;
              }
              const b = w + 1;
              if (1 & u[b]) {
                const M = s + h[b] * n, A = r - a[b] * n;
                t.quadraticCurveTo(y, g, M, A), w = b + 1;
              } else {
                const M = (y + (s + h[b] * n)) / 2, A = (g + (r - a[b] * n)) / 2;
                t.quadraticCurveTo(y, g, M, A), w = b;
              }
            }
          t.closePath();
        }
        l = d + 1;
      }
    }
    t.fill();
  }
  L() {
    this.q.L();
  }
  get framebuffer() {
    return this.q.V;
  }
  get columns() {
    return this.q.X;
  }
  get rows() {
    return this.q.h;
  }
}
class is {
  st(t, e) {
    let s = 0;
    for (const { table: r } of (function(n) {
      return es(n).lookupTables;
    })(t)) if (r.format === 4 ? s = this.et(e, r) : r.format === 12 && (s = this.rt(e, r)), s > 0) break;
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
    let r = -1;
    for (let n = 0; n < s; n++) if (t <= e.endCount[n]) {
      r = n;
      break;
    }
    return r === -1 || t < e.startCount[r] ? 0 : ve(e, t, r);
  }
  rt(t, e) {
    const s = e.groups.length / 3;
    for (let r = 0; r < s; r++) {
      const n = e.groups[3 * r], h = e.groups[3 * r + 1], a = e.groups[3 * r + 2];
      if (t >= n && t <= h) return a + (t - n);
    }
    return 0;
  }
}
class ks {
  constructor() {
    o(this, "ct");
    this.ct = new is();
  }
  ut(t, e, s) {
    let r = 0;
    const n = this.ct.ot(s, e);
    let h = 0, a = !1;
    for (const c of t) {
      const u = c.glyphData;
      let l = 0;
      if (!u && (l = this.ct.nt(s, c.character), l === 0)) continue;
      const f = ((u == null ? void 0 : u.advanceWidth) ?? this.ct.ht(s, l)) * n.scale;
      if (r = Math.max(r, f), u) {
        const d = Math.max(0, u.yMax - u.yMin) * n.scale;
        h = Math.max(h, d), a = !0;
      }
    }
    return a || (h = n.lineHeight), { width: Math.ceil(r), height: Math.ceil(h) };
  }
}
const U = { readShort: (i, t) => (U.t.uint16[0] = i[t] << 8 | i[t + 1], U.t.int16[0]), readUshort: (i, t) => i[t] << 8 | i[t + 1], readUshorts(i, t, e) {
  const s = [];
  for (let r = 0; r < e; r++) s.push(U.readUshort(i, t + 2 * r));
  return s;
}, readUint(i, t) {
  const e = U.t.uint8;
  return e[3] = i[t], e[2] = i[t + 1], e[1] = i[t + 2], e[0] = i[t + 3], U.t.uint32[0];
}, readASCII(i, t, e) {
  let s = "";
  for (let r = 0; r < e; r++) s += String.fromCharCode(i[t + r]);
  return s;
}, t: (() => {
  const i = new ArrayBuffer(8);
  return { uint8: new Uint8Array(i), int16: new Int16Array(i), uint16: new Uint16Array(i), uint32: new Uint32Array(i) };
})() };
function zt(i) {
  return i + 3 & -4;
}
function Dt(i, t, e) {
  i[t] = e >>> 8 & 255, i[t + 1] = 255 & e;
}
function et(i, t, e) {
  i[t] = e >>> 24 & 255, i[t + 1] = e >>> 16 & 255, i[t + 2] = e >>> 8 & 255, i[t + 3] = 255 & e;
}
function Xs(i, t, e) {
  for (let s = 0; s < e.length; s++) i[t + s] = 255 & e.charCodeAt(s);
}
function ne(i, t, e) {
  const s = t + e;
  let r = 0;
  const n = U.t;
  for (let h = t; h < s; h += 4) n.uint8[3] = i[h] || 0, n.uint8[2] = i[h + 1] || 0, n.uint8[1] = i[h + 2] || 0, n.uint8[0] = i[h + 3] || 0, r = r + (n.uint32[0] >>> 0) >>> 0;
  return r >>> 0;
}
const zs = { parseTab(i, t, e) {
  const s = { tables: [], ids: {}, encodings: [], off: t };
  i = new Uint8Array(i.buffer, t, e), t = 0;
  const r = U, n = r.readUshort;
  n(i, t);
  const h = n(i, t += 2);
  t += 2;
  const a = [];
  for (let c = 0; c < h; c++) {
    const u = n(i, t), l = n(i, t += 2);
    t += 2;
    const f = r.readUint(i, t);
    t += 4;
    const d = `p${u}e${l}`;
    let p = a.indexOf(f);
    if (p === -1) {
      let y;
      p = s.tables.length, a.push(f);
      const g = n(i, f);
      y = g === 4 ? this.parse4(i, f) : g === 12 ? this.parse12(i, f) : { format: g }, s.tables.push(y);
    }
    s.ids[d] = p;
    const v = s.tables[p], w = { platformID: u, encodingID: l, format: v.format, tableIndex: p };
    s.encodings.push(w), (v.encodings ?? (v.encodings = [])).push(w);
  }
  return s;
}, parse4(i, t) {
  const e = U, s = e.readUshort, r = e.readUshorts, n = t, h = s(i, t += 2);
  s(i, t += 2);
  const a = s(i, t += 2) >>> 1, c = { format: 4, encodings: [], searchRange: s(i, t += 2), entrySelector: 0, rangeShift: 0, endCount: [], startCount: [], idDelta: [], idRangeOffset: [], glyphIdArray: [] };
  t += 2, c.entrySelector = s(i, t), t += 2, c.rangeShift = s(i, t), t += 2, c.endCount = r(i, t, a), t += 2 * a, t += 2, c.startCount = r(i, t, a), t += 2 * a;
  for (let u = 0; u < a; u++) c.idDelta.push(e.readShort(i, t)), t += 2;
  return c.idRangeOffset = r(i, t, a), t += 2 * a, c.glyphIdArray = r(i, t, n + h - t >> 1), c;
}, parse12(i, t) {
  const e = U.readUint;
  e(i, t += 4), e(i, t += 4);
  const s = e(i, t += 4);
  t += 4;
  const r = new Uint32Array(3 * s);
  for (let n = 0; n < 3 * s; n += 3) r[n] = e(i, t + (n << 2)), r[n + 1] = e(i, t + (n << 2) + 4), r[n + 2] = e(i, t + (n << 2) + 8);
  return { format: 12, encodings: [], groups: r };
} }, Ys = { parseTab(i, t, e) {
  const s = U;
  t += 18;
  const r = s.readUshort(i, t);
  t += 2, t += 16;
  const n = s.readShort(i, t);
  t += 2;
  const h = s.readShort(i, t);
  t += 2;
  const a = s.readShort(i, t);
  t += 2;
  const c = s.readShort(i, t);
  return t += 2, t += 6, { unitsPerEm: r, xMin: n, yMin: h, xMax: a, yMax: c, indexToLocFormat: s.readShort(i, t) };
} }, Zs = { parseTab(i, t, e) {
  const s = U;
  t += 4;
  const r = s.readShort, n = s.readUshort;
  return { ascender: r(i, t), descender: r(i, t + 2), lineGap: r(i, t + 4), advanceWidthMax: n(i, t + 6), minLeftSideBearing: r(i, t + 8), minRightSideBearing: r(i, t + 10), xMaxExtent: r(i, t + 12), caretSlopeRise: r(i, t + 14), caretSlopeRun: r(i, t + 16), caretOffset: r(i, t + 18), res0: r(i, t + 20), res1: r(i, t + 22), res2: r(i, t + 24), res3: r(i, t + 26), metricDataFormat: r(i, t + 28), numberOfHMetrics: n(i, t + 30) };
} }, Ws = { parseTab(i, t, e, s) {
  const r = U, n = [], h = [], a = s.maxp.numGlyphs, c = s.hhea.numberOfHMetrics;
  let u = 0, l = 0, f = 0;
  for (; f < c; ) u = r.readUshort(i, t + (f << 2)), l = r.readShort(i, t + (f << 2) + 2), n.push(u), h.push(l), f++;
  for (; f < a; ) n.push(u), h.push(l), f++;
  return { aWidth: n, lsBearing: h };
} }, Pe = { cmap: zs, head: Ys, hhea: Zs, maxp: { parseTab(i, t, e) {
  const s = U;
  return s.readUint(i, t), t += 4, { numGlyphs: s.readUshort(i, t) };
} }, hmtx: Ws, loca: { parseTab(i, t, e, s) {
  const r = U, n = [], h = s.head.indexToLocFormat, a = s.maxp.numGlyphs + 1;
  if (h === 0) for (let c = 0; c < a; c++) n.push(r.readUshort(i, t + (c << 1)) << 1);
  else if (h === 1) for (let c = 0; c < a; c++) n.push(r.readUint(i, t + (c << 2)));
  return n;
} }, glyf: { parseTab(i, t, e, s) {
  const r = [], n = s.maxp.numGlyphs;
  for (let h = 0; h < n; h++) r.push(null);
  return r;
}, lt(i, t) {
  const e = U, s = i.ft, r = i.loca;
  if (r[t] === r[t + 1]) return null;
  const n = Tt.findTable(s, "glyf", i.dt);
  if (!n) return null;
  let h = n[0] + r[t];
  const a = {};
  if (a.noc = e.readShort(s, h), h += 2, a.xMin = e.readShort(s, h), h += 2, a.yMin = e.readShort(s, h), h += 2, a.xMax = e.readShort(s, h), h += 2, a.yMax = e.readShort(s, h), h += 2, a.xMin >= a.xMax || a.yMin >= a.yMax) return null;
  if (a.noc > 0) {
    a.endPts = [];
    for (let d = 0; d < a.noc; d++) a.endPts.push(e.readUshort(s, h)), h += 2;
    const c = e.readUshort(s, h);
    if (h += 2, s.length - h < c) return null;
    h += c;
    const u = a.endPts[a.noc - 1] + 1;
    a.flags = [];
    for (let d = 0; d < u; d++) {
      const p = s[h];
      if (h++, a.flags.push(p), 8 & p) {
        const v = s[h];
        h++;
        for (let w = 0; w < v; w++) a.flags.push(p), d++;
      }
    }
    a.xs = [];
    for (let d = 0; d < u; d++) {
      const p = a.flags[d], v = !!(16 & p);
      2 & p ? (a.xs.push(v ? s[h] : -s[h]), h++) : v ? a.xs.push(0) : (a.xs.push(e.readShort(s, h)), h += 2);
    }
    a.ys = [];
    for (let d = 0; d < u; d++) {
      const p = a.flags[d], v = !!(32 & p);
      4 & p ? (a.ys.push(v ? s[h] : -s[h]), h++) : v ? a.ys.push(0) : (a.ys.push(e.readShort(s, h)), h += 2);
    }
    let l = 0, f = 0;
    for (let d = 0; d < u; d++) l += a.xs[d], f += a.ys[d], a.xs[d] = l, a.ys[d] = f;
  } else a.parts = [], a.endPts = [], a.flags = [], a.xs = [], a.ys = [];
  return a;
} } }, Tt = { parse(i) {
  const t = new Uint8Array(i), e = Pe, s = {}, r = { ft: t, _t: 0, dt: 0 };
  for (const n in e) {
    const h = n, a = Tt.findTable(t, h, 0);
    if (a) {
      const [c, u] = a;
      let l = s[c];
      l == null && (l = e[h].parseTab(t, c, u, r), s[c] = l), Object.assign(r, { [h]: l });
    }
  }
  return [r];
}, findTable(i, t, e) {
  const s = U, r = s.readUshort(i, e + 4);
  let n = e + 12;
  for (let h = 0; h < r; h++) {
    const a = s.readASCII(i, n, 4);
    s.readUint(i, n + 4);
    const c = s.readUint(i, n + 8), u = s.readUint(i, n + 12);
    if (a === t) return [c, u];
    n += 16;
  }
  return null;
}, T: Pe, B: U };
let ct;
function Yt(i) {
  if (i.length === 0) return [];
  const t = ct !== void 0 ? ct : typeof Intl < "u" && "Segmenter" in Intl ? (ct = new Intl.Segmenter(void 0, { granularity: "grapheme" }), ct) : (ct = null, ct);
  return t ? Array.from(t.segment(i), (e) => e.segment) : Array.from(i);
}
function he(i) {
  return Array.from(i, (t) => t.codePointAt(0)).filter((t) => t !== void 0);
}
class js {
  constructor() {
    o(this, "gt");
    this.gt = new is();
  }
  vt(t, e) {
    const s = [], r = /* @__PURE__ */ new Map();
    return t.forEach((n, h) => {
      const a = { character: n, unicode: he(n)[0] ?? 0, color: this.yt(h), glyphData: this.wt(e, n) };
      s.push(a), r.set(n, a);
    }), { array: s, map: r };
  }
  yt(t) {
    return [t % 256 / 255, Math.floor(t / 256) % 256 / 255, 0];
  }
  wt(t, e) {
    const s = e.codePointAt(0) || 0, r = this.gt.st(t, s);
    if (r === 0) return null;
    const n = this.gt.ht(t, r), h = Tt.T.glyf.lt(t, r);
    return h ? { ...h, advanceWidth: n } : null;
  }
}
async function Vs(i) {
  if (typeof DecompressionStream > "u") throw Error("[textmode.js] WOFF font loading requires DecompressionStream support.");
  const t = U, e = new Uint8Array(i);
  if (e.length < 44) throw Error("Invalid WOFF header.");
  if (t.readASCII(e, 0, 4) !== "wOFF") throw Error("Invalid WOFF signature.");
  const s = t.readUint(e, 4), r = t.readUshort(e, 12), n = t.readUint(e, 16);
  if (44 + 20 * r > e.length) throw Error("Invalid WOFF table directory.");
  const h = [];
  let a = 44;
  for (let u = 0; u < r; u++) {
    const l = t.readASCII(e, a, 4), f = t.readUint(e, a + 4), d = t.readUint(e, a + 8), p = t.readUint(e, a + 12);
    if (t.readUint(e, a + 16), f + d > e.length) throw Error(`Invalid WOFF table bounds for ${l}.`);
    if (d > p) throw Error(`Invalid WOFF table length for ${l}.`);
    h.push({ tag: l, offset: f, compLength: d, origLength: p }), a += 20;
  }
  const c = await Promise.all(h.map((u) => (async function(l, f) {
    const d = new Uint8Array(l.buffer, f.offset, f.compLength);
    let p;
    return f.compLength === f.origLength ? p = new Uint8Array(d) : (p = await (async function(v) {
      const w = new ReadableStream({ start(g) {
        g.enqueue(v), g.close();
      } }).pipeThrough(new DecompressionStream("deflate")), y = await new Response(w).arrayBuffer();
      return new Uint8Array(y);
    })(d), p = (function(v, w) {
      if (v.length === w) return v;
      if (v.length < w) {
        const y = new Uint8Array(w);
        return y.set(v), y;
      }
      return v.subarray(0, w);
    })(p, f.origLength)), { ...f, data: p };
  })(e, u)));
  return (function(u, l, f) {
    const d = f.length;
    let p = 1, v = 0;
    for (; p << 1 <= d; ) p <<= 1, v++;
    const w = 16 * p, y = 16 * d - w;
    let g = 12 + 16 * d;
    const b = {};
    for (const T of f) b[T.tag] = g, g = zt(g + T.data.length);
    const M = Math.max(l || 0, g), A = new Uint8Array(M);
    et(A, 0, u), Dt(A, 4, d), Dt(A, 6, w), Dt(A, 8, v), Dt(A, 10, y);
    let x = 12;
    for (const T of f) Xs(A, x, T.tag), x += 4, et(A, x, Ks(T)), x += 4, et(A, x, b[T.tag]), x += 4, et(A, x, T.data.length), x += 4;
    for (const T of f) A.set(T.data, b[T.tag]);
    const F = b.head;
    if (F !== void 0) {
      const T = (function(E, R) {
        const P = R + 8, I = [E[P], E[P + 1], E[P + 2], E[P + 3]];
        et(E, P, 0);
        const Z = 2981146554 - (ne(E, 0, zt(E.length)) >>> 0) >>> 0;
        return E[P] = I[0], E[P + 1] = I[1], E[P + 2] = I[2], E[P + 3] = I[3], Z >>> 0;
      })(A, F);
      et(A, F + 8, T);
    }
    return A.buffer;
  })(s, n, c);
}
function Ks(i) {
  if (i.tag !== "head" || i.data.length < 12) return ne(i.data, 0, zt(i.data.length));
  const t = new Uint8Array(i.data);
  return et(t, 8, 0), ne(t, 0, zt(t.length));
}
class B extends Rt {
  constructor(e, s = 16) {
    super();
    o(this, "G");
    o(this, "bt");
    o(this, "Mt", []);
    o(this, "At", /* @__PURE__ */ new Map());
    o(this, "Ct", 16);
    o(this, "xt", { width: 0, height: 0 });
    o(this, "St");
    o(this, "Et");
    o(this, "Ft");
    o(this, "Tt");
    o(this, "Pt", !1);
    this.G = e, this.Ct = s, this.St = new Is(), this.Et = new Bs(e), this.Ft = new ks(), this.Tt = new js();
  }
  Lt(e = {}) {
    if (!this.Pt) throw new _("Cannot fork an uninitialized TextmodeFont.");
    const s = e.fontSize ?? this.Ct, r = new B(this.G, s);
    return r.bt = this.bt, r.Mt = this.Mt, r.At = new Map(this.At), r.Pt = !0, r.Dt(), r;
  }
  async kt(e) {
    if (this.Pt) return;
    if (!e) throw new _("TextmodeFont requires an explicit font source.");
    const s = await this.Rt(e);
    await this.Ot(s);
  }
  Bt(e) {
    if (e === void 0) return this.Ct;
    this.Ct = e, this.Dt();
  }
  Dt() {
    this.xt = this.Ft.ut(this.Mt, this.Ct, this.bt), this.Et.J(this.Mt, this.xt, this.Ct, this.bt);
  }
  async It(e) {
    try {
      const s = await this.Rt(e);
      await this.Ot(s);
    } catch (s) {
      throw new _("Failed to load font: " + (s instanceof Error ? s.message : "Unknown error"), { originalError: s });
    }
  }
  async Rt(e) {
    const s = await fetch(e);
    if (!s.ok) throw new _(`Failed to load font file: ${s.status} ${s.statusText}`);
    return s.arrayBuffer();
  }
  async Ot(e) {
    const s = await (async function(r) {
      const n = U.readASCII(new Uint8Array(r), 0, 4);
      if (n === "wOFF") {
        const h = await Vs(r);
        return Tt.parse(h);
      }
      if (n === "wOF2") throw Error("[textmode.js] WOFF2 fonts are not supported. Use .woff, .ttf, or .otf.");
      return Tt.parse(r);
    })(e);
    if (!s || s.length === 0) throw Error("Failed to parse font file");
    this.bt = s[0], await this.Nt();
  }
  async Nt() {
    const e = this.St.I(this.bt);
    if (e.length === 0) throw new _("[textmode.js] Font has no supported cmap glyphs.");
    const { array: s, map: r } = this.Tt.vt(e, this.bt);
    this.Mt = s, this.At = r, this.Dt(), this.Pt = !0;
  }
  jt(e) {
    const s = this.At.get(e);
    return s ? s.color : [1, 1, 0];
  }
  Qt(e) {
    return Yt(e).map((s) => {
      const r = this.At.get(s);
      return r ? r.color : [1, 1, 0];
    });
  }
  dispose() {
    this.Et.L(), super.dispose();
  }
  get framebuffer() {
    return this.Et.framebuffer;
  }
  get characterMap() {
    return this.At;
  }
  get characters() {
    return this.Mt;
  }
  get textureColumns() {
    return this.Et.columns;
  }
  get textureRows() {
    return this.Et.rows;
  }
  get columns() {
    return this.Et.columns;
  }
  get rows() {
    return this.Et.rows;
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
    return this.bt;
  }
}
class Hs {
  constructor(t) {
    this.q = new ss(t);
  }
  J(t, e, s, r) {
    this.q.K(t.length, e.width, e.height), this.zt(t, e, s, r), this.q.W();
  }
  L() {
    this.q.L();
  }
  zt(t, e, s, r) {
    const n = this.q.Y, h = this.q.X;
    for (let a = 0; a < t.length; a++) {
      const c = a % h, u = Math.floor(a / h), l = a % r.columns, f = Math.floor(a / r.columns), d = r.marginX + l * (r.cellWidth + r.spacingX), p = r.marginY + f * (r.cellHeight + r.spacingY), v = c * e.width, w = u * e.height;
      n.drawImage(s, d, p, r.cellWidth, r.cellHeight, v, w, e.width, e.height);
    }
  }
  get framebuffer() {
    return this.q.V;
  }
  get columns() {
    return this.q.X;
  }
  get rows() {
    return this.q.h;
  }
}
const O = class O extends Rt {
  constructor(e, s, r) {
    super();
    o(this, "G");
    o(this, "Et", null);
    o(this, "Mt", []);
    o(this, "At", /* @__PURE__ */ new Map());
    o(this, "Xt", { width: 0, height: 0 });
    o(this, "Yt", { width: 0, height: 0 });
    o(this, "Ct", 0);
    o(this, "Kt");
    o(this, "Wt");
    o(this, "Zt");
    o(this, "$t");
    o(this, "Pt", !1);
    this.G = e, this.Ct = s === void 0 ? 0 : Math.abs(s), this.Zt = r;
  }
  Lt(e = {}) {
    if (!this.Pt || !this.Wt || !this.$t) throw new _("Cannot fork an uninitialized TextmodeTileset.");
    const s = new O(this.G, e.fontSize ?? this.Ct);
    return s.Mt = this.$t.characters, s.At = new Map(this.$t.characterMap), s.Xt = { ...this.$t.nativeCellDimensions }, s.Kt = this.Kt, s.Wt = { ...this.Wt }, s.Zt = this.Zt, s.Pt = !0, s.qt(this.$t), s.Jt(), s;
  }
  async kt(e) {
    if (this.Pt) return;
    if (this.Zt = e ?? this.Zt, !this.Zt) throw new _("Cannot initialize a TextmodeTileset without source options.");
    const s = this.ti(this.Zt), r = this.ii(s);
    if (r) return this.qt(r), this.Mt = r.characters, this.At = new Map(r.characterMap), this.Xt = { ...r.nativeCellDimensions }, this.Wt = { ...r.layout }, this.Ct === 0 && (this.Ct = Math.abs(this.Zt.fontSize ?? r.nativeCellDimensions.height)), this.Jt(), void (this.Pt = !0);
    const n = await this.si(this.Zt.source), h = this.ei(n), a = this.ri(this.Zt, h.width, h.height), c = this.ni(this.Zt, a), u = await this.hi(this.Zt, c, a.columns), l = this.oi(u), f = new Map(l.map((p) => [p.character, p])), d = new Hs(this.G);
    this.Kt = n, this.Wt = a, this.Xt = { width: a.cellWidth, height: a.cellHeight }, this.Mt = l, this.At = f, this.Ct === 0 && (this.Ct = Math.abs(this.Zt.fontSize ?? a.cellHeight)), this.Jt(), d.J(this.Mt, this.Xt, n, a), this.qt({ cacheKey: s, textureAtlas: d, characters: l, characterMap: f, nativeCellDimensions: { ...this.Xt }, layout: { ...a }, referenceCount: 0 }), this.Pt = !0;
  }
  Bt(e) {
    if (e === void 0) return this.Ct;
    this.Ct = Math.abs(e), this.Jt();
  }
  jt(e) {
    const s = this.At.get(e);
    return s ? s.color : [1, 1, 0];
  }
  Qt(e) {
    return Yt(e).map((s) => this.jt(s));
  }
  dispose() {
    this.ai(), super.dispose();
  }
  qt(e) {
    this.$t !== e && (this.ai(), O.ci(this.G).set(e.cacheKey, e), e.referenceCount += 1, this.$t = e, this.Et = e.textureAtlas);
  }
  ai() {
    const e = this.$t;
    if (e) {
      if (e.referenceCount -= 1, e.referenceCount <= 0) {
        e.textureAtlas.L();
        const s = O.Ht.get(this.G);
        s == null || s.delete(e.cacheKey);
      }
      this.$t = void 0, this.Et = null;
    } else this.Et = null;
  }
  ti(e) {
    return JSON.stringify({ source: this.ui(e.source), columns: e.columns, rows: e.rows, count: e.count ?? null, margin: e.margin ?? null, marginX: e.marginX ?? null, marginY: e.marginY ?? null, spacing: e.spacing ?? null, spacingX: e.spacingX ?? null, spacingY: e.spacingY ?? null, mapping: this.li(e) });
  }
  ui(e) {
    return typeof e == "string" || e instanceof URL ? "url:" + (e + "") : "object:" + O.fi(e);
  }
  li(e) {
    return e.map === void 0 ? "auto:32" : Array.isArray(e.map) ? "rows:" + e.map.join(`
`) : e.map instanceof URL ? "url:" + (e.map + "") : this.di(e.map) ? "inline:" + e.map : "url:" + e.map;
  }
  ii(e) {
    var s;
    return (s = O.Ht.get(this.G)) == null ? void 0 : s.get(e);
  }
  static ci(e) {
    let s = O.Ht.get(e);
    return s || (s = /* @__PURE__ */ new Map(), O.Ht.set(e, s)), s;
  }
  static fi(e) {
    const s = O.Gt.get(e);
    if (s !== void 0) return s;
    const r = O.Vt++;
    return O.Gt.set(e, r), r;
  }
  async si(e) {
    if (typeof e != "string" && !(e instanceof URL)) return e;
    const s = e + "";
    return new Promise((r, n) => {
      const h = new Image();
      h.crossOrigin = "anonymous", h.onload = () => r(h), h.onerror = () => n(new _("Failed to load tileset image: " + s)), h.src = s;
    });
  }
  async hi(e, s, r) {
    if (e.map !== void 0) {
      const n = await this._i(e.map), h = this.pi(n, s, r);
      return this.mi(h, "tileset map"), h;
    }
    return this.gi(s);
  }
  async _i(e) {
    return Array.isArray(e) ? [...e] : e instanceof URL ? this.yi(await this.wi(e)) : this.di(e) ? this.yi(e) : this.yi(await this.wi(e));
  }
  pi(e, s, r) {
    const n = Math.ceil(s / r);
    if (e.length !== n) throw new _(`Tileset map must contain exactly ${n} row${n === 1 ? "" : "s"} for ${s} mapped tile${s === 1 ? "" : "s"}.`);
    const h = [];
    let a = s;
    for (let c = 0; c < e.length; c++) {
      const u = Yt(e[c]), l = Math.min(r, a);
      if (u.length !== l) throw new _(`Tileset map row ${c + 1} must contain exactly ${l} character cell${l === 1 ? "" : "s"}.`);
      h.push(...u), a -= l;
    }
    return h;
  }
  gi(e) {
    this.bi(e);
    const s = [];
    for (let r = 0; r < e; r++) s.push(String.fromCodePoint(32 + r));
    return s;
  }
  async wi(e) {
    let s;
    try {
      s = await fetch(e);
    } catch (r) {
      throw new _("Failed to load tileset map: " + (r instanceof Error ? r.message : "Unknown error"));
    }
    if (!s.ok) throw new _(`Failed to load tileset map: ${s.status} ${s.statusText}`);
    return s.text();
  }
  yi(e) {
    const s = e.split(/\r\n|\n|\r/);
    return s.length > 0 && s[s.length - 1] === "" && s.pop(), s;
  }
  di(e) {
    return !(!e.includes(`
`) && !e.includes("\r")) || !this.Mi(e);
  }
  Mi(e) {
    return /^(?:[a-z]+:)?\/\//i.test(e) || e.startsWith("/") || e.startsWith("./") || e.startsWith("../") || e.includes("\\") || /\.[a-z0-9]+(?:$|[?#])/i.test(e);
  }
  ei(e) {
    const s = e, r = s.naturalWidth ?? s.videoWidth ?? s.displayWidth ?? s.width, n = s.naturalHeight ?? s.videoHeight ?? s.displayHeight ?? s.height;
    if (typeof r != "number" || typeof n != "number" || r <= 0 || n <= 0) throw new _("Tileset source must expose positive pixel dimensions.");
    return { width: r, height: n };
  }
  ri(e, s, r) {
    const n = e.marginX ?? e.margin ?? 0, h = e.marginY ?? e.margin ?? 0, a = e.spacingX ?? e.spacing ?? 0, c = e.spacingY ?? e.spacing ?? 0;
    if (e.columns <= 0 || e.rows <= 0) throw new _("Tileset columns and rows must be greater than 0.");
    const u = s - 2 * n - a * (e.columns - 1), l = r - 2 * h - c * (e.rows - 1);
    if (u <= 0 || l <= 0) throw new _("Tileset margins and spacing leave no usable tile area.");
    const f = u / e.columns, d = l / e.rows;
    if (!Number.isInteger(f) || !Number.isInteger(d)) throw new _("Tileset dimensions do not divide evenly. Check columns, rows, margins, and spacing.");
    return { columns: e.columns, rows: e.rows, marginX: n, marginY: h, spacingX: a, spacingY: c, cellWidth: f, cellHeight: d };
  }
  ni(e, s) {
    const r = s.columns * s.rows, n = e.count ?? r;
    if (n <= 0 || n > r) throw new _(`Tileset count must be between 1 and ${r}.`);
    return n;
  }
  bi(e) {
    if (32 + e - 1 > 1114111) throw new _("Tileset automatic character assignment exceeds the supported Unicode range.");
  }
  mi(e, s) {
    const r = /* @__PURE__ */ new Map();
    for (let n = 0; n < e.length; n++) {
      const h = e[n], a = r.get(h);
      if (a !== void 0) throw new _(`${s} contains duplicate character ${this.Ai(h)} at tile ${a + 1} and tile ${n + 1}.`);
      r.set(h, n);
    }
  }
  Ai(e) {
    const s = he(e);
    if (s.length === 0) return '""';
    const r = s.map((n) => "U+" + n.toString(16).toUpperCase().padStart(4, "0")).join(" ");
    return `${JSON.stringify(e)} (${r})`;
  }
  oi(e) {
    const s = [];
    for (let r = 0; r < e.length; r++) {
      const n = e[r], h = he(n)[0];
      if (h === void 0) throw new _(`Tileset character mapping produced an empty character at tile ${r + 1}.`);
      s.push({ character: n, unicode: h, color: this.Ci(r) });
    }
    return s;
  }
  Ci(e) {
    return [(255 & e) / 255, (e >> 8 & 255) / 255, (e >> 16 & 255) / 255];
  }
  Jt() {
    if (this.Xt.height <= 0 || this.Xt.width <= 0) return;
    const e = Math.max(1, this.Ct || this.Xt.height), s = e / this.Xt.height;
    this.Yt = { width: Math.max(1, Math.round(this.Xt.width * s)), height: e };
  }
  get characters() {
    return this.Mt;
  }
  get characterMap() {
    return this.At;
  }
  get framebuffer() {
    return this.Et.framebuffer;
  }
  get fontFramebuffer() {
    return this.framebuffer;
  }
  get columns() {
    return this.Et.columns;
  }
  get rows() {
    return this.Et.rows;
  }
  get textureColumns() {
    return this.columns;
  }
  get textureRows() {
    return this.rows;
  }
  get nativeCellDimensions() {
    return this.Xt;
  }
  get maxGlyphDimensions() {
    return this.Yt;
  }
  get cellDimensions() {
    return this.Yt;
  }
  get cellWidth() {
    return this.Yt.width;
  }
  get cellHeight() {
    return this.Yt.height;
  }
  get fontSize() {
    return this.Ct;
  }
};
o(O, "Ht", /* @__PURE__ */ new WeakMap()), o(O, "Gt", /* @__PURE__ */ new WeakMap()), o(O, "Vt", 1);
let z = O;
const Nr = Object.freeze(Object.defineProperty({ __proto__: null, TextmodeFont: B, TextmodeTileset: z }, Symbol.toStringTag, { value: "Module" })), Zt = ["normal", "additive", "multiply", "screen", "subtract", "darken", "lighten", "overlay", "softLight", "hardLight", "colorDodge", "colorBurn", "difference", "exclusion"];
var rs = ((i) => (i[i.SILENT = 0] = "SILENT", i[i.WARNING = 1] = "WARNING", i[i.ERROR = 2] = "ERROR", i[i.THROW = 3] = "THROW", i))(rs || {});
const st = class st {
  constructor() {
    o(this, "Zt", { globalLevel: 3 });
    o(this, "Si", /* @__PURE__ */ new Set());
  }
  static Ei() {
    return st.xi || (st.xi = new st()), st.xi;
  }
  Fi(t, e) {
    const s = "%c[textmode.js] Oops! (╯°□°)╯︵ Something went wrong in your code.", r = "color: #f44336; font-weight: bold; background: #ffebee; padding: 2px 6px; border-radius: 3px;";
    switch (this.Zt.globalLevel) {
      case 0:
        return !1;
      case 1:
        return !!this.Ti("warning", t, e) && (console.group(s, r), console.warn(_.R(t, e, { includeFooterArrows: !1 })), console.groupEnd(), !1);
      case 2:
        return !!this.Ti("error", t, e) && (console.group(s, r), console.error(_.R(t, e, { includeFooterArrows: !1 })), console.groupEnd(), !1);
      default:
        throw new _(t, e);
    }
  }
  Pi(t, e, s) {
    return !!t || (this.Fi(e, s), !1);
  }
  Li(t) {
    this.Zt.globalLevel = t;
  }
  Di(t) {
    t.globalLevel !== void 0 && (this.Zt.globalLevel = t.globalLevel);
  }
  ki() {
    this.Si.clear();
  }
  Ti(t, e, s) {
    const r = this.Ri(t, e, s);
    return !this.Si.has(r) && (this.Si.add(r), !0);
  }
  Ri(t, e, s) {
    return `${t}|${e}|${s ? this.Oi(s) : ""}`;
  }
  Oi(t) {
    return t == null ? t + "" : typeof t == "number" || typeof t == "boolean" || typeof t == "string" ? JSON.stringify(t) : Array.isArray(t) ? `[${t.map((e) => this.Oi(e)).join(",")}]` : typeof t == "object" ? `{${Object.entries(t).sort(([e], [s]) => e.localeCompare(s)).map(([e, s]) => `${JSON.stringify(e)}:${this.Oi(s)}`).join(",")}}` : t + "";
  }
};
o(st, "xi", null);
let oe = st;
const pt = oe.Ei();
var L = ((i) => (i[i.NORMAL = 0] = "NORMAL", i[i.ADDITIVE = 1] = "ADDITIVE", i[i.MULTIPLY = 2] = "MULTIPLY", i[i.SCREEN = 3] = "SCREEN", i[i.SUBTRACT = 4] = "SUBTRACT", i[i.DARKEN = 5] = "DARKEN", i[i.LIGHTEN = 6] = "LIGHTEN", i[i.OVERLAY = 7] = "OVERLAY", i[i.SOFT_LIGHT = 8] = "SOFT_LIGHT", i[i.HARD_LIGHT = 9] = "HARD_LIGHT", i[i.COLOR_DODGE = 10] = "COLOR_DODGE", i[i.COLOR_BURN = 11] = "COLOR_BURN", i[i.DIFFERENCE = 12] = "DIFFERENCE", i[i.EXCLUSION = 13] = "EXCLUSION", i))(L || {});
const Ot = new Map(Zt.map((i, t) => [i, t]));
new Map(Array.from(Ot.entries()).map(([i, t]) => [t, i]));
const $s = new Set(Object.values(L).filter((i) => typeof i == "number"));
function V(i) {
  return i * (Math.PI / 180);
}
function vt(i) {
  return i * (180 / Math.PI);
}
function Le(i, t, e, s) {
  return vt(Math.atan2(s - t, e - i));
}
function _t(i, t, e, s) {
  return Math.hypot(e - i, s - t);
}
function X(i, t, e) {
  return Math.min(Math.max(i, t), e);
}
const qs = ["linear", "inQuad", "outQuad", "inOutQuad", "inCubic", "outCubic", "inOutCubic", "inQuart", "outQuart", "inOutQuart", "inQuint", "outQuint", "inOutQuint", "inSine", "outSine", "inOutSine", "inExpo", "outExpo", "inOutExpo", "inCirc", "outCirc", "inOutCirc", "inBack", "outBack", "inOutBack", "inElastic", "outElastic", "inOutElastic", "inBounce", "outBounce", "inOutBounce"], De = 1.70158, Ue = 2.5949095, Ge = 2 * Math.PI / 3, Ne = 2 * Math.PI / 4.5;
function Ut(i) {
  if (i < 1 / 2.75) return 7.5625 * i * i;
  if (i < 2 / 2.75) {
    const r = i - 0.5454545454545454;
    return 7.5625 * r * r + 0.75;
  }
  if (i < 2.5 / 2.75) {
    const r = i - 0.8181818181818182;
    return 7.5625 * r * r + 0.9375;
  }
  const s = i - 2.625 / 2.75;
  return 7.5625 * s * s + 0.984375;
}
const Qs = { linear: (i) => i, inQuad: (i) => i * i, outQuad: (i) => 1 - Math.pow(1 - i, 2), inOutQuad: (i) => i < 0.5 ? 2 * i * i : 1 - Math.pow(-2 * i + 2, 2) / 2, inCubic: (i) => i * i * i, outCubic: (i) => 1 - Math.pow(1 - i, 3), inOutCubic: (i) => i < 0.5 ? 4 * i * i * i : 1 - Math.pow(-2 * i + 2, 3) / 2, inQuart: (i) => i * i * i * i, outQuart: (i) => 1 - Math.pow(1 - i, 4), inOutQuart: (i) => i < 0.5 ? 8 * Math.pow(i, 4) : 1 - Math.pow(-2 * i + 2, 4) / 2, inQuint: (i) => i * i * i * i * i, outQuint: (i) => 1 - Math.pow(1 - i, 5), inOutQuint: (i) => i < 0.5 ? 16 * Math.pow(i, 5) : 1 - Math.pow(-2 * i + 2, 5) / 2, inSine: (i) => 1 - Math.cos(i * Math.PI / 2), outSine: (i) => Math.sin(i * Math.PI / 2), inOutSine: (i) => -(Math.cos(Math.PI * i) - 1) / 2, inExpo: (i) => i === 0 ? 0 : Math.pow(2, 10 * i - 10), outExpo: (i) => i === 1 ? 1 : 1 - Math.pow(2, -10 * i), inOutExpo: (i) => i === 0 || i === 1 ? i : i < 0.5 ? Math.pow(2, 20 * i - 10) / 2 : (2 - Math.pow(2, -20 * i + 10)) / 2, inCirc: (i) => 1 - Math.sqrt(1 - Math.pow(i, 2)), outCirc: (i) => Math.sqrt(1 - Math.pow(i - 1, 2)), inOutCirc: (i) => i < 0.5 ? (1 - Math.sqrt(1 - Math.pow(2 * i, 2))) / 2 : (Math.sqrt(1 - Math.pow(-2 * i + 2, 2)) + 1) / 2, inBack: (i) => 2.70158 * i * i * i - De * i * i, outBack: (i) => 1 + 2.70158 * Math.pow(i - 1, 3) + De * Math.pow(i - 1, 2), inOutBack: (i) => i < 0.5 ? Math.pow(2 * i, 2) * (7.189819 * i - Ue) / 2 : (Math.pow(2 * i - 2, 2) * (3.5949095 * (2 * i - 2) + Ue) + 2) / 2, inElastic: (i) => i === 0 || i === 1 ? i : -Math.pow(2, 10 * i - 10) * Math.sin((10 * i - 10.75) * Ge), outElastic: (i) => i === 0 || i === 1 ? i : Math.pow(2, -10 * i) * Math.sin((10 * i - 0.75) * Ge) + 1, inOutElastic: (i) => i === 0 || i === 1 ? i : i < 0.5 ? -Math.pow(2, 20 * i - 10) * Math.sin((20 * i - 11.125) * Ne) / 2 : Math.pow(2, -20 * i + 10) * Math.sin((20 * i - 11.125) * Ne) / 2 + 1, inBounce: (i) => 1 - Ut(1 - i), outBounce: Ut, inOutBounce: (i) => i < 0.5 ? (1 - Ut(1 - 2 * i)) / 2 : (1 + Ut(2 * i - 1)) / 2 };
function Js(i, t) {
  const e = Qs[i];
  if (!e) throw Error(`Unknown easing function "${i}". Available easing functions: ${qs.join(", ")}.`);
  return e((function(s) {
    return Number.isNaN(s) ? 0 : s === 1 / 0 ? 1 : s === -1 / 0 ? 0 : X(s, 0, 1);
  })(t));
}
function Kt(i) {
  return (i % 360 + 360) % 360 / 360;
}
function it(i = new Float32Array(16)) {
  return i[0] = 1, i[1] = 0, i[2] = 0, i[3] = 0, i[4] = 0, i[5] = 1, i[6] = 0, i[7] = 0, i[8] = 0, i[9] = 0, i[10] = 1, i[11] = 0, i[12] = 0, i[13] = 0, i[14] = 0, i[15] = 1, i;
}
function Oe(i, t, e, s = new Float32Array(16)) {
  let r = i[0] - t[0], n = i[1] - t[1], h = i[2] - t[2], a = Math.hypot(r, n, h);
  a === 0 ? h = 1 : (a = 1 / a, r *= a, n *= a, h *= a);
  let c = e[1] * h - e[2] * n, u = e[2] * r - e[0] * h, l = e[0] * n - e[1] * r;
  a = Math.hypot(c, u, l), a === 0 ? (c = 1, u = 0, l = 0) : (a = 1 / a, c *= a, u *= a, l *= a);
  const f = n * l - h * u, d = h * c - r * l, p = r * u - n * c;
  return s[0] = c, s[1] = f, s[2] = r, s[3] = 0, s[4] = u, s[5] = d, s[6] = n, s[7] = 0, s[8] = l, s[9] = p, s[10] = h, s[11] = 0, s[12] = -(c * i[0] + u * i[1] + l * i[2]), s[13] = -(f * i[0] + d * i[1] + p * i[2]), s[14] = -(r * i[0] + n * i[1] + h * i[2]), s[15] = 1, s;
}
class J {
  constructor(t = 0, e = 0, s = 0, r = 0, n = 0, h = 0, a = 0, c = 1, u = 0) {
    o(this, "Bi");
    o(this, "Ii");
    o(this, "Ni");
    o(this, "ji");
    o(this, "Qi");
    o(this, "zi");
    o(this, "Hi");
    o(this, "Gi");
    o(this, "Vi");
    this.Bi = t, this.Ii = e, this.Ni = s, this.ji = r, this.Qi = n, this.zi = h, this.Hi = a, this.Gi = c, this.Vi = u;
  }
  static Xi(t, e) {
    const s = t.Ki.Yi, r = t.Ki.Wi, n = t.Ki.Zi, h = t.Ki.$i, a = t.Ki.qi, c = t.Ki.Ji;
    if (t.Ki.ts) {
      const u = 0.5 * Math.max(1, e) / Math.tan(0.5 * t.Ki.ss);
      return new J(s, r, n + u, s, r, n, h, a, c);
    }
    return new J(t.Ki.es, t.Ki.rs, t.Ki.ns, s, r, n, h, a, c);
  }
  hs(t) {
    t.Ki.cs(this.Bi, this.Ii, this.Ni, this.ji, this.Qi, this.zi, this.Hi, this.Gi, this.Vi);
  }
  setPosition(t, e, s) {
    return this.Bi = t, this.Ii = e, this.Ni = s, this;
  }
  lookAt(t, e, s) {
    return this.ji = t, this.Qi = e, this.zi = s, this;
  }
  setUp(t, e, s) {
    return this.Hi = t, this.Gi = e, this.Vi = s, this;
  }
  move(t, e, s) {
    return this.Bi += t, this.Ii += e, this.Ni += s, this.ji += t, this.Qi += e, this.zi += s, this;
  }
  copy() {
    return new J(this.Bi, this.Ii, this.Ni, this.ji, this.Qi, this.zi, this.Hi, this.Gi, this.Vi);
  }
  get eyeX() {
    return this.Bi;
  }
  get eyeY() {
    return this.Ii;
  }
  get eyeZ() {
    return this.Ni;
  }
  get targetX() {
    return this.ji;
  }
  get targetY() {
    return this.Qi;
  }
  get targetZ() {
    return this.zi;
  }
  get upX() {
    return this.Hi;
  }
  get upY() {
    return this.Gi;
  }
  get upZ() {
    return this.Vi;
  }
}
class ti {
  constructor(t) {
    o(this, "us", null);
    o(this, "ts", !0);
    o(this, "es", 0);
    o(this, "rs", 0);
    o(this, "ns", 0);
    o(this, "Yi", 0);
    o(this, "Wi", 0);
    o(this, "Zi", 0);
    o(this, "$i", 0);
    o(this, "qi", 1);
    o(this, "Ji", 0);
    o(this, "ls", "perspective");
    o(this, "fs");
    o(this, "ds");
    o(this, "_s");
    this.ts = t.Ki.ts, this.es = t.Ki.es, this.rs = t.Ki.rs, this.ns = t.Ki.ns, this.Yi = t.Ki.Yi, this.Wi = t.Ki.Wi, this.Zi = t.Ki.Zi, this.$i = t.Ki.$i, this.qi = t.Ki.qi, this.Ji = t.Ki.Ji, t.Ki.ts || (this.us = new J(t.Ki.es, t.Ki.rs, t.Ki.ns, t.Ki.Yi, t.Ki.Wi, t.Ki.Zi, t.Ki.$i, t.Ki.qi, t.Ki.Ji)), t.Ki.ps ? this.ls = "ortho" : (this.ls = "perspective", this.fs = 180 * t.Ki.ss / Math.PI), this.ds = t.Ki.ds, this._s = t.Ki._s;
  }
  createCamera(t, e) {
    let s;
    if (this.ts) {
      const r = Math.max(1, t), n = this.fs ?? e, h = 0.5 * r / Math.tan(n * Math.PI / 360);
      s = new J(this.Yi, this.Wi, this.Zi + h, this.Yi, this.Wi, this.Zi, this.$i, this.qi, this.Ji);
    } else s = new J(this.es, this.rs, this.ns, this.Yi, this.Wi, this.Zi, this.$i, this.qi, this.Ji);
    return this.setCamera(s), s;
  }
  setCamera(t) {
    this.us = t, this.ts = !1, this.es = t.eyeX, this.rs = t.eyeY, this.ns = t.eyeZ, this.Yi = t.targetX, this.Wi = t.targetY, this.Zi = t.targetZ, this.$i = t.upX, this.qi = t.upY, this.Ji = t.upZ;
  }
  resetCamera() {
    this.us = null, this.ts = !0, this.es = 0, this.rs = 0, this.ns = 0, this.Yi = 0, this.Wi = 0, this.Zi = 0, this.$i = 0, this.qi = 1, this.Ji = 0;
  }
  camera(t, e, s, r = 0, n = 0, h = 0, a = 0, c = 1, u = 0) {
    this.us ? this.us.setPosition(t, e, s).lookAt(r, n, h).setUp(a, c, u) : this.us = new J(t, e, s, r, n, h, a, c, u), this.ts = !1, this.es = t, this.rs = e, this.ns = s, this.Yi = r, this.Wi = n, this.Zi = h, this.$i = a, this.qi = c, this.Ji = u;
  }
  lookAt(t, e, s, r, n, h) {
    this.us && (this.us.lookAt(t, e, s), r === void 0 && n === void 0 && h === void 0 || this.us.setUp(r ?? this.us.upX, n ?? this.us.upY, h ?? this.us.upZ)), this.Yi = t, this.Wi = e, this.Zi = s, r !== void 0 && (this.$i = r), n !== void 0 && (this.qi = n), h !== void 0 && (this.Ji = h);
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
    if (this.ls === "ortho" ? t.Ki.gs(this.ds, this._s) : t.Ki.vs(this.fs, this.ds, this._s), this.ts) return t.Ki.ws(), void (this.Yi === 0 && this.Wi === 0 && this.Zi === 0 && this.$i === 0 && this.qi === 1 && this.Ji === 0 || t.Ki.bs(this.Yi, this.Wi, this.Zi, this.$i, this.qi, this.Ji));
    t.Ki.cs(this.es, this.rs, this.ns, this.Yi, this.Wi, this.Zi, this.$i, this.qi, this.Ji);
  }
}
const ei = Object.freeze({ source: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAITElEQVR42u1d2XLkIAz0//909jWVHYPUhyR7SNXUHnhsDI3ULQlyXdf1s/usfiLtv6/5+/dPz4r0Y3XN6ru750fHIPv8u3FC3u/umt39b/oXf/nfN7gb0FU7OwBo+18gRiYrsgAQgN5dd7dYVAD4ND+jAJCxHp8GKfLyu9WwAyVjAVfvkgVA1PoEF5jfBUxpX012BphZAEdWPeviVgBYjVcYAHc3Qgc4stJUFijCAVgAZFwQyyEibYn+5VxAZFI+mTiFj4/4bYZEoi5gBzC1f9+12TiAyge6J5ABEEMCs8QPVTHI6qdUwPlc1OQP//gHTrEaoyuQsTCohagGohwACMPNtKOrbWfSMiSzkoMgZlwV6MrwmI8AWAVMMhoW9bXI5K6IJ6oCUAsTVUU7tZUNdBELdAYAohqZkZiR560UzK49S5KRMK4NANHViLQ7Qq27OACaC4ia2Kxejy4K9Pm0C+gEADIpWSugirQhk6/gANkwM8wBOkkgk0mrYvkulRCxUEggKwSAJ8jA8xkQB4iij5GBzPfQFZJZRVkFcwAgkmHZ2Ds6ic72iZHNEgBk0rUrQhm5PwqADEvPyrBpbg/mAKxpRy1AliDtJKEaAEiwZ8jk1yWDsjo840ZWQZcqAERkMds3hcqisoHsgxUVNRmXIBogqY9nXZCh7zNcABL0KVwlMoLXAYDNvY8WHkbKemQgq6OzcXxhJIuNhcv63wWIbCn6fySQKCgMmejM/RX+LZNZrOi/SmWoXMBtLmCVGmYA4ACMcsVMAQBjAYlnaAIpTNVrdMCZXHp2kBmAd/IAwJLWhVIzE6y0INn/V4Sqp1qAZU0gAwBV2bLLRLMAYAs+OjlAKBDEsGgFy87G29XZQLZ/T7iejgSez4vrAdQ6nSlbFpc90yQPLeqMhqpZl8Nsfr1QEuTy2Yr7u2QnS3JZ/hDc7Zutl7hSN6vQ8eo4APt8tcphikUjZedtAFBJJHQAIwOMvJ8SACxAkXR4CgBIPvppFgCNQ7ChcGV8JVqBBQPA6QLexgHU76cmgVsAOFhyhwpAq4YdKkB5f7sKOJ8vjwOoV7Di+24Vwuh0dyTUdU4hnAuokoWuegM3ANhcQQYUSLZ1HADYejxH/l6VDq7OpAp2ZnlMoKMkTKUymFWqyogqr0GJcZgDsBVD7CpRhaozGU3X1u8JpelbC5CNbLE6vhIAQKBEEiFU+/lSAOy2XrET5DbBLAl0Vy0r8gnEzqKjhU89gHDXzxM3SqjLtZxlXdbzAaZ03BEsYUPJkwBmPSAi6oPVMlC1c0eVDXRUPasKa5H7U7mA7kghuzFjSkWQas/CriAk+X49O2kqs3GZAyicoWoWALuCEDC0/TwLoNbZ3fUAbhlLA+AOZU/hAKpYv6peIQsCRRzj1AOczzkgYspBEGwkVHxCyTklY8r7ObalBUCE+XAHC6/YeNJdEeQCwKc+Bce/bkDRNOfTC0LcoeZsqvvPNVoL4NhfP7EghI1GqgtCiP2b+HZkpOyL3cvGxPrZgpCuI2LU+RoZAJjVs0NpJg6hjKUrK44mqYAlAM7niz8/5p/q41rVEUml9s+OD3JNevzeCoApRZfo+KAJJBgAUwI7VRM82QIorEV4nKoAkH3pae3oBGUBwFqMkQCIMGzFGX3KdvUEKayF8hmlLuCJAMhKMZVMc4OgjQMwgzuh3Ukgqwh2Kwf4hoyectNGmSXIsmaElKBFjVPaHeHeyBY2tsQsFQjqBsDKFyPtf/+faa8AwCqdOwIA7NFmb7IADAmMAmBVycOUrLcDYPfv3QS5vp9NOKE+OQpAdPPpsQBGC8BE6hRb1BTfScvALgBkfX8FB3DkBth0ehkAjgrwASAbhZSelloBgPPx//o5GwDeHgiKrLrdn2hpnCLZRM9BdS5gJXFW5m11XWSSdj5/Z14jnEFZt69wSwcACdmHWgD2bERXnUL4+m8DQEZ/Z0CgrpJmrz0AAE1+RnJWnSLKVj0tr/9WDpAxtQoOsNP/qLuQAcBZFDqZBLIWIJOwQQI5yuNkPj5nWlXwRFnIcADXOAlL1vpCnB3br9RxCjaQ5hif5LP0Z/CtMm+Mj1MBQGmhMlFRtwugAZA1K5HTw5UyR12QUXXyRwUJJFzOvuAAqUhBXjTKbhWrIlsRjBxyEbVgChk4HgDsCkYBpCi2QM8qrAoEkQTd7wJYADgiZegAdyalsiBOA8BBApUmXOmTK7JxFckggUyvy3M7Sp5cMq8znqEoT4MAMFlHuybQqTgq+se2X+zu2KrDE5nUavb+jj65+se2X4oOTQIBO6GVk6/qH9WOsHilj3ds3kSUhGLyO/sHtztkHCrlqgbQ/Xx3u7h/Wtnj1tEdPrvSJ7PjB9xfL3vcOnoSZ+kAhLJ/l0PaVehoVkZ1Ru4qDqtKy8A31PqrtHnX/ZtOUDsAOAA4ADgAcBzCGJGRbLLDcX/2/VyJG3sy6ADgywEw3UR3m/Dp5xyD/TsAOAA4ADgAmBToyUbCIhs4VKXq6tPBs+OIhI03+zXqfgGCa3/8FAAoSBwzRnQouPMwY5YJdwMA7T8LgGgCaGEN+s+yZe+9A4DbvzP9VwAgulN5uS9APfFoiZkaALvVkl2pUw57Xh0pG60n+OgC3D+OAfx2AEhIYPXPFAC4t2NXAQAmgT8P/+nmAN0AsJNA51k2lS7njjeo3rETANE9nTfvrdvZw1TsdKiMNwFgNdEbEOj29nVsbcq4COZI1SpSrJ787TXVAZ0pvzTpLQCITP7yWjbf3g2Abg4wJRAEcwA1ANCyZufKcXKACaFgigM4AIBmCx0VMSwHqN7fzxxjN4IDOFfTkwpLK9PBDAf4BzY4SAYFZUTuAAAAAElFTkSuQmCC", columns: 16, rows: 16, map: `☺☻♥♦♣♠•◘○◙♂♀♪♫☼
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
class K {
  constructor(t, e = {}) {
    o(this, "Ms");
    o(this, "As");
    o(this, "Cs");
    o(this, "l");
    o(this, "_");
    o(this, "Ss");
    o(this, "Ct");
    o(this, "Es");
    o(this, "Fs");
    o(this, "G");
    o(this, "Ts");
    o(this, "Ps");
    o(this, "bt");
    o(this, "Ls");
    o(this, "Ds");
    o(this, "ks");
    o(this, "Rs");
    o(this, "Os", () => {
    });
    o(this, "Bs", () => {
    });
    o(this, "Is", []);
    o(this, "Ns", []);
    o(this, "js", !1);
    o(this, "Qs", !1);
    o(this, "zs");
    o(this, "Hs");
    o(this, "Gs", /* @__PURE__ */ new Map());
    this.G = t, this.Ms = e.visible ?? !0, this.As = e.opacity ?? 1;
    const s = e.blendMode ?? L.NORMAL;
    this.Cs = L.NORMAL, K.Vs(s) && (this.Cs = typeof s == "string" ? Ot.get(s) : s), pt.Pi(K.Vs(s), `Invalid blend mode. Expected one of: ${Zt.join(", ")} or a LayerBlendMode constant (e.g. t.BLEND_ADDITIVE).`, { method: "constructor", property: "blendMode", providedValue: e.blendMode });
    const r = e.fontSize ?? 16;
    this.Ct = Math.abs(r), this.Hs = e.fontSize !== void 0, pt.Pi(typeof r == "number", "Font size must be a number.", { method: "fontSize", providedValue: r }), this.l = e.offsetX ?? 0, this._ = e.offsetY ?? 0, this.Ss = e.rotationZ ?? 0;
    const n = e.fontSource;
    this.Es = n, this.bt = n instanceof B || n instanceof z ? n : n === void 0 ? new z(t, this.Ct, ei) : new B(t, this.Ct), this.zs = new ti(t.state);
  }
  async Xs(t) {
    if (this.Ts = t, this.Es instanceof B || this.Es instanceof z) {
      this.Es.Pt || await this.Es.kt();
      const r = this.Es, n = r.Lt({ fontSize: this.Ys(r) });
      this.Ks(n);
    }
    this.bt.Pt || (this.bt instanceof B ? await this.bt.kt(this.Es) : await this.bt.kt());
    const e = this.bt.maxGlyphDimensions;
    this.Ps = new Us(this.Ts.canvas.canvas, e.width, e.height);
    const s = this.Ps;
    this.Ls = this.Ts.createFramebuffer(s.cols, s.rows, 3), this.Ds = this.Ts.createFramebuffer(s.width, s.height, 1, { depth: !1 }), this.ks = this.Ts.createFramebuffer(s.width, s.height, 1, { depth: !1 }), this.Rs = [this.Ts.createFramebuffer(s.width, s.height, 1, { depth: !1 }), this.Ts.createFramebuffer(s.width, s.height, 1, { depth: !1 })], this.Ps.S(() => {
      var r, n, h;
      this.Ls.resize(this.Ps.cols, this.Ps.rows), this.Ds.resize(this.Ps.width, this.Ps.height), (r = this.ks) == null || r.resize(this.Ps.width, this.Ps.height), (n = this.Rs) == null || n[0].resize(this.Ps.width, this.Ps.height), (h = this.Rs) == null || h[1].resize(this.Ps.width, this.Ps.height);
    });
  }
  draw(t) {
    this.Os = t;
  }
  postDraw(t) {
    this.Bs = t;
  }
  show() {
    this.Ms = !0;
  }
  hide() {
    this.Ms = !1;
  }
  opacity(t) {
    if (t === void 0) return this.As;
    this.As = X(t, 0, 1);
  }
  blendMode(t) {
    if (t === void 0) return this.Cs;
    pt.Pi(K.Vs(t), `Invalid blend mode. Expected one of: ${Zt.join(", ")} or a LayerBlendMode constant (e.g. t.BLEND_ADDITIVE).`, { method: "blendMode", providedValue: t }) && (this.Cs = typeof t == "string" ? Ot.get(t) : t);
  }
  offset(t, e = 0) {
    if (t === void 0) return { x: this.l, y: this._ };
    this.l = t, this._ = e;
  }
  rotateZ(t) {
    if (t === void 0) return this.Ss;
    this.Ss = t;
  }
  createCamera() {
    var s;
    const t = this.Ws(), e = 180 * (((s = this.Ts) == null ? void 0 : s.renderer.state.Ki.ss) ?? Math.PI / 4) / Math.PI;
    return this.zs.createCamera(t.height, e);
  }
  setCamera(t) {
    this.zs.setCamera(t), this.Zs();
  }
  resetCamera() {
    this.zs.resetCamera(), this.Zs();
  }
  camera(t, e, s, r = 0, n = 0, h = 0, a = 0, c = 1, u = 0) {
    this.zs.camera(t, e, s, r, n, h, a, c, u), this.Zs();
  }
  lookAt(t, e, s, r, n, h) {
    this.zs.lookAt(t, e, s, r, n, h), this.Zs();
  }
  perspective(t, e, s) {
    this.zs.perspective(t, e, s), this.Zs();
  }
  ortho(t, e) {
    this.zs.ortho(t, e), this.Zs();
  }
  $s() {
    return this.zs.getActiveCamera();
  }
  filter(t, e) {
    (this.js ? this.Ns : this.Is).push({ name: t, params: e });
  }
  setPluginState(t, e) {
    this.Gs.set(t, e);
  }
  getPluginState(t) {
    return this.Gs.get(t);
  }
  hasPluginState(t) {
    return this.Gs.has(t);
  }
  deletePluginState(t) {
    return this.Gs.delete(t);
  }
  fontSize(t) {
    if (t === void 0) return this.bt.fontSize;
    if (!pt.Pi(typeof t == "number", "Font size must be a number.", { method: "fontSize", providedValue: t })) return;
    const e = Math.abs(t);
    this.bt.fontSize !== e && (this.Hs = !0, this.Ct = e, this.bt.Bt(e), this.qs());
  }
  useTileColors(t) {
    if (t === void 0) return this.Qs;
    this.Qs = t;
  }
  async loadFont(t) {
    if (!this.bt) throw Error("Layer font not initialized. Ensure layer is attached before loading fonts.");
    if (t instanceof B) {
      t.Pt || await t.kt();
      const e = t, s = e.Lt({ fontSize: this.Ys(e) });
      this.Ks(s);
    } else if (this.bt instanceof B) await this.bt.It(t);
    else {
      const e = new B(this.G, this.bt.fontSize);
      await e.kt(t), this.Ks(e);
    }
    return this.Es = t, this.Ct = this.bt.fontSize, this.qs(), this.bt;
  }
  async loadTileset(t) {
    if (!this.bt) throw Error("Layer font not initialized. Ensure layer is attached before loading tilesets.");
    if (t instanceof z) {
      t.Pt || await t.kt();
      const e = t.Lt({ fontSize: this.Ys(t) });
      this.Ks(e);
    } else {
      const e = this.Hs ? this.Ct : t.fontSize, s = new z(this.G, e, t);
      await s.kt(), this.Ks(s);
    }
    return this.Es = t, this.Ct = this.bt.fontSize, this.qs(), this.bt;
  }
  Js(t, e, s = {}) {
    if (!this.Ms || !this.Ls || !this.Ds) return;
    const r = this.Ts.renderer, n = this.Ps, h = s.skipPluginHooks ?? !1;
    h || t.ie.te(this);
    try {
      let a = !1;
      try {
        this.Ls.begin(), a = !0, r.state.ee.se(), r.state.re(), this.zs.applyToState(r.state), t.ne = this, this.Os.call(t);
      } finally {
        t.ne = void 0, a && this.Ls.end();
      }
      h || t.ie.he(this);
      const c = this.Is.length > 0, u = c ? this.ks : this.Ds;
      let l = !1;
      try {
        u.begin(), l = !0, r.oe(e), e.ae({ u_characterTexture: this.bt.framebuffer, u_charsetDimensions: [this.bt.textureColumns, this.bt.textureRows], Un: this.Ls.textures[0], Uo: this.Ls.textures[1], Up: this.Ls.textures[2], Uq: !(this.bt instanceof z && this.Qs), Ur: [n.cols, n.rows], Us: [u.width, u.height], Ut: [0, 0, 0, 0] }), r.ce(0, 0, n.width, n.height);
      } finally {
        l && u.end();
      }
      c && this.Ts.filterManager.ue(this.ks.textures[0], this.Ds, this.Is, this.Ds.width, this.Ds.height, this.Rs);
      try {
        this.js = !0, t.ne = this, this.Bs.call(t);
      } finally {
        this.js = !1, t.ne = void 0;
      }
      this.Ns.length > 0 && this.Ts.filterManager.ue(this.Ds.textures[0], this.Ds, this.Ns, this.Ds.width, this.Ds.height, this.Rs);
    } finally {
      this.Is = [], this.Ns = [], this.js = !1;
    }
  }
  le(t) {
    this.Fs = [...t];
  }
  fe() {
    this.Fs = void 0;
  }
  de() {
    var t;
    this.Ls && this.Ds && ((t = this.Ps) == null || t.reset());
  }
  L() {
    var t, e, s, r, n, h, a;
    (t = this.Ls) == null || t.dispose(), (e = this.Ds) == null || e.dispose(), (s = this.ks) == null || s.dispose(), (r = this.Rs) == null || r[0].dispose(), (n = this.Rs) == null || n[1].dispose(), (h = this.bt) == null || h.dispose(), (a = this.Ps) == null || a.L();
  }
  get texture() {
    var t;
    return (t = this.Ds) == null ? void 0 : t.textures[0];
  }
  get grid() {
    return this.Ps;
  }
  get font() {
    return this.bt;
  }
  get width() {
    return this.Ds ? this.Ds.width : 0;
  }
  get height() {
    return this.Ds ? this.Ds.height : 0;
  }
  get drawFramebuffer() {
    return this.Ls;
  }
  get asciiFramebuffer() {
    return this.Ds;
  }
  qs() {
    if (!this.Ps || !this.bt) return;
    const t = this.bt.maxGlyphDimensions;
    this.Ps.U(t.width, t.height), this.Ls && this.Ds && this.de();
  }
  static Vs(t) {
    return typeof t == "number" ? $s.has(t) : typeof t == "string" && Ot.has(t);
  }
  Ks(t) {
    (this.Es instanceof B || this.Es instanceof z) && this.bt === this.Es || this.bt === t || this.bt.dispose(), this.bt = t;
  }
  Ys(t) {
    return this.Hs ? this.Ct : t.fontSize;
  }
  Zs() {
    this.zs.applyToState(this.Ts.renderer.state);
  }
  Ws() {
    var s, r, n, h;
    if (this.Ls) return { width: Math.max(1, this.Ls.width), height: Math.max(1, this.Ls.height) };
    if (this.Ps) return { width: Math.max(1, this.Ps.cols), height: Math.max(1, this.Ps.rows) };
    const t = ((s = this.Ts) == null ? void 0 : s.renderer.context.canvas.width) ?? ((r = this.Ts) == null ? void 0 : r.canvas.width) ?? 1, e = ((n = this.Ts) == null ? void 0 : n.renderer.context.canvas.height) ?? ((h = this.Ts) == null ? void 0 : h.canvas.height) ?? 1;
    return { width: Math.max(1, t), height: Math.max(1, e) };
  }
}
class ns {
  constructor(t) {
    o(this, "_e");
    o(this, "pe");
    o(this, "Os");
    o(this, "Pt", !1);
    this._e = t;
  }
  draw(t) {
    this.Os = t;
  }
  async kt() {
    if (this.Pt) return;
    const t = this.me();
    this.pe = t, this.Pt = !0;
  }
  L() {
    var t;
    this.Pt && ((t = this.pe) == null || t.L(), this.Pt = !1);
  }
  ge(t, e) {
    const s = this.pe;
    s.show(), s.draw(() => {
      this._e.clear(), this._e.push();
      try {
        (this.Os || t)(e), this.ve(e);
      } finally {
        this._e.pop();
      }
    });
  }
  ve(t) {
    const { textmodifier: e, grid: s } = t, r = [116, 101, 120, 116, 109, 111, 100, 101, 46, 106, 115].map((c) => String.fromCharCode(c)).join(""), n = (s.rows + 1 >> 1) - 2, h = 2 - (s.cols + 1 >> 1), a = [[142, 249, 243], [241, 91, 181], [255, 155, 113]];
    e.push(), e.translate(h, n, 0);
    for (let c = 0; c < r.length; c++) {
      const u = r[c], l = Math.floor(0.1 * e.frameCount + 0.5 * c) % a.length, [f, d, p] = a[l], v = e.color(f, d, p);
      e.charColor(v), e.char(u), e.point(), e.translateX(1);
    }
    e.pop();
  }
}
function mt(i, t, e) {
  (function(s, r, n, h) {
    s.push(), s.translate(n, h, 0);
    for (const a of r) s.char(a), s.rect(1, 1), s.translateX(1);
    s.pop();
  })(i, t, -Math.floor(t.length / 2), e);
}
const si = ({ textmodifier: i, grid: t, errorTitle: e, errorMessage: s }) => {
  i.background("#222323"), i.cellColor("#222323"), i.charColor("#FF6B6B"), mt(i, "X", -2), mt(i, e || "SKETCH ERROR", 0), i.charColor("#C0C0C0");
  const r = s || "Unknown error", n = Math.floor(0.8 * t.cols), h = Ie(r, n), a = h.slice(0, 3);
  h.length > 3 && (a[2] = a[2].substring(0, n - 3) + "..."), a.forEach((l, f) => {
    mt(i, l, 3 + f);
  });
  const c = Ie("CHECK CONSOLE FOR DETAILS", n), u = 5 + a.length;
  c.forEach((l, f) => {
    mt(i, l, u + f);
  });
}, Ie = (i, t) => {
  const e = i.split(" "), s = [];
  let r = "";
  for (const n of e) (r + " " + n).length <= t ? r = r ? r + " " + n : n : (r && s.push(r), r = n);
  return r && s.push(r), s;
};
class hs extends ns {
  constructor(e) {
    super(e);
    o(this, "ye", "inactive");
    o(this, "we", "SKETCH ERROR");
    o(this, "be", "Unknown error");
    o(this, "Me", "");
  }
  async kt() {
    this.Pt || (await super.kt(), this.pe.opacity(1), this.pe.hide());
  }
  get Ae() {
    return this.Pt && this.ye === "active";
  }
  Ce(e) {
    this.xe(e), this.Pt && (this.pe.opacity(1), this.pe.show());
  }
  Se() {
    this.Ae && this.Ee();
  }
  L() {
    super.L();
  }
  me() {
    return new K(this._e.G, { visible: !0, opacity: 1 });
  }
  Ee() {
    const e = { textmodifier: this._e, grid: this.pe.grid, errorTitle: this.we, errorMessage: this.be, errorDetails: this.Me || void 0 };
    this.ge(si, e);
  }
  xe(e) {
    var s;
    if (this.ye = "active", e instanceof Error) {
      const r = (s = e.name) != null && s.trim() ? e.name.trim().toUpperCase() : "SKETCH ERROR";
      return this.we = r.endsWith("ERROR") ? r : r + " ERROR", this.be = e.message || "Unknown error", void (this.Me = e.stack || "");
    }
    if (typeof e == "string") return this.we = "SKETCH ERROR", this.be = e || "Unknown error", void (this.Me = "");
    this.we = "SKETCH ERROR", this.be = "Unknown error", this.Me = "";
  }
}
const Or = Object.freeze(Object.defineProperty({ __proto__: null, ErrorLayerController: hs, TextmodeError: _, TextmodeErrorLevel: rs }, Symbol.toStringTag, { value: "Module" }));
function os(i, t) {
  i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL, 1), i.texImage2D(i.TEXTURE_2D, 0, i.RGBA, i.RGBA, i.UNSIGNED_BYTE, t);
}
function as(i) {
  if (i instanceof HTMLVideoElement) return i.readyState >= i.HAVE_CURRENT_DATA && i.videoWidth > 0 && i.videoHeight > 0;
  const { width: t, height: e } = ls(i);
  return t > 0 && e > 0;
}
function Wt(i, t, e) {
  as(e) && (i.bindTexture(i.TEXTURE_2D, t), os(i, e), i.bindTexture(i.TEXTURE_2D, null));
}
function ye(i, t, e = i.NEAREST, s = i.NEAREST, r = i.CLAMP_TO_EDGE, n = i.CLAMP_TO_EDGE) {
  const h = i.createTexture();
  i.bindTexture(i.TEXTURE_2D, h), cs(i, e, s, r, n), as(t) ? os(i, t) : (function(u) {
    u.texImage2D(u.TEXTURE_2D, 0, u.RGBA, 1, 1, 0, u.RGBA, u.UNSIGNED_BYTE, new Uint8Array([0, 0, 0, 0]));
  })(i), i.bindTexture(i.TEXTURE_2D, null);
  const { width: a, height: c } = ls(t);
  return { texture: h, width: Math.max(1, a), height: Math.max(1, c) };
}
function cs(i, t, e, s, r) {
  i.texParameteri(i.TEXTURE_2D, i.TEXTURE_MIN_FILTER, t), i.texParameteri(i.TEXTURE_2D, i.TEXTURE_MAG_FILTER, e), i.texParameteri(i.TEXTURE_2D, i.TEXTURE_WRAP_S, s), i.texParameteri(i.TEXTURE_2D, i.TEXTURE_WRAP_T, r);
}
function Ft(i, t, e, s, r, n = 0, h = i.FLOAT, a = !1) {
  i.enableVertexAttribArray(t), i.vertexAttribPointer(t, e, h, a, s, r), i.vertexAttribDivisor(t, n);
}
function ae(i, t, e, s, r) {
  i.bindBuffer(t, e), i.bufferData(t, s, r), i.bindBuffer(t, null);
}
function ls(i) {
  let t = 0, e = 0;
  return i instanceof HTMLVideoElement ? (t = i.videoWidth, e = i.videoHeight) : i instanceof HTMLImageElement ? (t = i.naturalWidth, e = i.naturalHeight) : i instanceof HTMLCanvasElement && (t = i.width, e = i.height), { width: t, height: e };
}
class gt extends Rt {
  constructor(e, s, r = s, n = 1, h = {}, a) {
    super();
    o(this, "o");
    o(this, "u");
    o(this, "Zt");
    o(this, "Fe");
    o(this, "V");
    o(this, "Te", []);
    o(this, "Pe", null);
    o(this, "Le");
    o(this, "G");
    o(this, "De", null);
    o(this, "ke", /* @__PURE__ */ new Map());
    this.o = s, this.u = r, this.Fe = e, this.Le = X(n, 1, 8), this.G = a, this.Zt = { filter: "nearest", wrap: "clamp", type: "unsigned_byte", depth: !0, ...h };
    const c = e.getParameter(e.MAX_DRAW_BUFFERS), u = e.getParameter(e.MAX_COLOR_ATTACHMENTS);
    this.Le = Math.min(this.Le, c, u), this.V = e.createFramebuffer(), this.Re(), this.Oe(), this.Zt.depth && this.Be();
  }
  Re() {
    const e = this.Fe, s = this.Zt.filter === "linear" ? e.LINEAR : e.NEAREST, r = this.Zt.wrap === "repeat" ? e.REPEAT : e.CLAMP_TO_EDGE;
    for (let n = 0; n < this.Le; n++) {
      const h = e.createTexture();
      e.bindTexture(e.TEXTURE_2D, h), cs(e, s, s, r, r), this.Ie(h, !1), this.Te.push(h);
    }
    e.bindTexture(e.TEXTURE_2D, null);
  }
  Ie(e, s = !0) {
    const r = this.Fe, n = this.Zt.type === "float" ? r.FLOAT : r.UNSIGNED_BYTE, h = n === r.FLOAT ? r.RGBA32F : r.RGBA8, a = r.RGBA;
    s && r.bindTexture(r.TEXTURE_2D, e), r.texImage2D(r.TEXTURE_2D, 0, h, this.o, this.u, 0, a, n, null);
  }
  Oe() {
    const e = this.Fe;
    if (e.bindFramebuffer(e.FRAMEBUFFER, this.V), this.Le === 1) e.framebufferTexture2D(e.FRAMEBUFFER, e.COLOR_ATTACHMENT0, e.TEXTURE_2D, this.Te[0], 0);
    else {
      const s = [];
      for (let r = 0; r < this.Le; r++) {
        const n = e.COLOR_ATTACHMENT0 + r;
        e.framebufferTexture2D(e.FRAMEBUFFER, n, e.TEXTURE_2D, this.Te[r], 0), s.push(n);
      }
      e.drawBuffers(s);
    }
    e.bindFramebuffer(e.FRAMEBUFFER, null);
  }
  Be() {
    const e = this.Fe;
    this.Pe = e.createRenderbuffer(), this.Ne(), e.bindFramebuffer(e.FRAMEBUFFER, this.V), e.framebufferRenderbuffer(e.FRAMEBUFFER, e.DEPTH_ATTACHMENT, e.RENDERBUFFER, this.Pe), e.bindFramebuffer(e.FRAMEBUFFER, null);
  }
  Ne() {
    if (!this.Pe) return;
    const e = this.Fe;
    e.bindRenderbuffer(e.RENDERBUFFER, this.Pe), e.renderbufferStorage(e.RENDERBUFFER, e.DEPTH_COMPONENT24, this.o, this.u), e.bindRenderbuffer(e.RENDERBUFFER, null);
  }
  $(e) {
    Wt(this.Fe, this.Te[0], e);
  }
  resize(e, s) {
    this.o = e, this.u = s, this.ke.clear();
    const r = this.Fe;
    for (const n of this.Te) this.Ie(n, !0);
    r.bindTexture(r.TEXTURE_2D, null), this.Ne(), this.De = null;
  }
  readPixels(e) {
    const s = this.ke.get(e);
    if (s) return s;
    const r = this.Fe, n = this.o, h = this.u, a = new Uint8Array(n * h * 4), c = r.getParameter(r.READ_FRAMEBUFFER_BINDING);
    r.bindFramebuffer(r.READ_FRAMEBUFFER, this.V), r.readBuffer(r.COLOR_ATTACHMENT0 + e), r.readPixels(0, 0, n, h, r.RGBA, r.UNSIGNED_BYTE, a), r.bindFramebuffer(r.READ_FRAMEBUFFER, c);
    const u = 4 * n, l = new Uint8Array(a.length);
    for (let f = 0; f < h; f++) {
      const d = (h - 1 - f) * u, p = f * u;
      l.set(a.subarray(d, d + u), p);
    }
    return this.ke.set(e, l), l;
  }
  begin() {
    const e = this.Fe;
    this.ke.clear(), this.G.je(), this.G.Qe(this.V, this.o, this.u, this.Le), this.Zt.depth && e.clear(e.DEPTH_BUFFER_BIT), this.G.state.ze();
  }
  end() {
    this.G.state.He(), this.G.Ge(), this.G.Ve();
  }
  Xe() {
    return this.De || this.Ye(), this.De;
  }
  Ye() {
    if (!this.G) return;
    const e = this.Le > 1, s = this.Le > 2, r = this.Le > 3, n = { Uf: this.Te[0], Ug: e ? this.Te[1] : this.Te[0], Uh: s ? this.Te[2] : this.Te[0], Ui: r ? this.Te[3] : this.Te[0], Uj: [this.o, this.u], Uk: e, Ul: s, Um: r }, h = this.G.materialManager.Ke;
    this.De = this.G.materialManager.We(h, n);
  }
  dispose() {
    const e = this.Fe;
    e.deleteFramebuffer(this.V), this.Te.forEach((s) => {
      e.deleteTexture(s);
    }), this.Pe && e.deleteRenderbuffer(this.Pe), super.dispose();
  }
  get width() {
    return this.o;
  }
  get height() {
    return this.u;
  }
  get framebuffer() {
    return this.V;
  }
  get textures() {
    return this.Te;
  }
  get attachmentCount() {
    return this.Le;
  }
}
function xt(i) {
  return typeof i == "object" && i !== null && "textures" in i && Array.isArray(i.textures);
}
class rt extends Rt {
  constructor(e, s, r) {
    super();
    o(this, "Fe");
    o(this, "Ze");
    o(this, "$e", /* @__PURE__ */ new Map());
    o(this, "qe", /* @__PURE__ */ new Map());
    o(this, "Je", /* @__PURE__ */ new Map());
    o(this, "tr", 0);
    o(this, "ir", /* @__PURE__ */ new Map());
    o(this, "sr");
    this.Fe = e, this.sr = e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS) ?? 16, this.Ze = this.er(s, r), this.rr();
  }
  rr() {
    const e = this.Fe.getProgramParameter(this.Ze, this.Fe.ACTIVE_UNIFORMS);
    for (let s = 0; s < e; s++) {
      const r = this.Fe.getActiveUniform(this.Ze, s);
      if (r) {
        const n = r.name.replace(/\[0\]$/, ""), h = this.Fe.getUniformLocation(this.Ze, n);
        h && (this.$e.set(n, h), this.qe.set(n, { type: r.type, size: r.size }));
      }
    }
  }
  er(e, s) {
    const r = this.nr(this.Fe.VERTEX_SHADER, e), n = this.nr(this.Fe.FRAGMENT_SHADER, s), h = this.Fe.createProgram();
    if (!h) throw Error("Failed to create WebGL program");
    if (this.Fe.attachShader(h, r), this.Fe.attachShader(h, n), this.Fe.linkProgram(h), !this.Fe.getProgramParameter(h, this.Fe.LINK_STATUS)) {
      const a = this.Fe.getProgramInfoLog(h);
      throw Error("Shader program link error: " + a);
    }
    return this.Fe.deleteShader(r), this.Fe.deleteShader(n), h;
  }
  nr(e, s) {
    const r = this.Fe.createShader(e);
    if (!r) throw Error("Failed to create shader of type " + e);
    if (this.Fe.shaderSource(r, s), this.Fe.compileShader(r), !this.Fe.getShaderParameter(r, this.Fe.COMPILE_STATUS)) {
      const n = this.Fe.getShaderInfoLog(r);
      throw this.Fe.deleteShader(r), Error("Shader compilation error: " + n);
    }
    return r;
  }
  hr() {
    this.Fe.useProgram(this.Ze), this.ar();
  }
  ar() {
    this.tr = 0, this.ir.clear();
    for (const [e, s] of this.Je) (s instanceof WebGLTexture || xt(s)) && this.Je.delete(e);
  }
  ae(e) {
    for (const s in e) this.cr(s, e[s]);
  }
  cr(e, s) {
    const r = this.$e.get(e);
    if (!r) return;
    const n = this.Je.get(e);
    let h = !0;
    if (n !== void 0 && (typeof s == "number" || typeof s == "boolean" ? n === s && (h = !1) : (s instanceof WebGLTexture || xt(s)) && n === s && (h = !1)), !h) return;
    typeof s == "number" || typeof s == "boolean" || s instanceof WebGLTexture || xt(s) ? this.Je.set(e, s) : this.Je.delete(e);
    const a = this.qe.get(e);
    if (!a) return;
    const { type: c, size: u } = a, l = this.Fe;
    if (s instanceof WebGLTexture) {
      const f = this.ur(e);
      return l.uniform1i(r, f), l.activeTexture(l.TEXTURE0 + f), void l.bindTexture(l.TEXTURE_2D, s);
    }
    if (xt(s)) {
      const f = this.ur(e);
      return l.uniform1i(r, f), l.activeTexture(l.TEXTURE0 + f), void l.bindTexture(l.TEXTURE_2D, s.textures[0]);
    }
    if (typeof s != "number") if (typeof s != "boolean") if (Array.isArray(s) && Array.isArray(s[0])) {
      const f = s.flat();
      switch (c) {
        case l.FLOAT_VEC2:
          l.uniform2fv(r, f);
          break;
        case l.FLOAT_VEC3:
          l.uniform3fv(r, f);
          break;
        case l.FLOAT_VEC4:
          l.uniform4fv(r, f);
      }
    } else {
      const f = s;
      switch (c) {
        case l.FLOAT:
          u > 1 ? l.uniform1fv(r, f) : l.uniform1f(r, f[0]);
          break;
        case l.FLOAT_VEC2:
          l.uniform2fv(r, f);
          break;
        case l.FLOAT_VEC3:
          l.uniform3fv(r, f);
          break;
        case l.FLOAT_VEC4:
          l.uniform4fv(r, f);
          break;
        case l.INT:
          u > 1 ? l.uniform1iv(r, f) : l.uniform1i(r, f[0]);
          break;
        case l.INT_VEC2:
          l.uniform2iv(r, f);
          break;
        case l.INT_VEC3:
          l.uniform3iv(r, f);
          break;
        case l.INT_VEC4:
          l.uniform4iv(r, f);
          break;
        case l.BOOL:
          l.uniform1iv(r, f);
          break;
        case l.FLOAT_MAT2:
          l.uniformMatrix2fv(r, !1, f);
          break;
        case l.FLOAT_MAT3:
          l.uniformMatrix3fv(r, !1, f);
          break;
        case l.FLOAT_MAT4:
          l.uniformMatrix4fv(r, !1, f);
      }
    }
    else l.uniform1i(r, s ? 1 : 0);
    else c === l.INT || c === l.BOOL ? l.uniform1i(r, s) : l.uniform1f(r, s);
  }
  ur(e) {
    const s = this.ir.get(e);
    if (s !== void 0) return s;
    if (this.tr >= this.sr) throw Error(`[textmode.js] Shader attempted to bind more than ${this.sr} texture samplers. Uniform "${e}" cannot be assigned.`);
    const r = this.tr++;
    return this.ir.set(e, r), r;
  }
  get program() {
    return this.Ze;
  }
  dispose() {
    this.Fe.deleteProgram(this.Ze), super.dispose();
  }
}
const us = /* @__PURE__ */ new WeakMap();
function te(i, t) {
  us.set(i, t);
}
function fs(i) {
  return us.get(i);
}
const ii = [255, 255, 255, 255], ri = [360, 100, 100, 1];
function ds(i) {
  return [(t = i === "rgb" ? ii : ri)[0], t[1], t[2], t[3]];
  var t;
}
function ce() {
  return { mode: "rgb", maxes: ds("rgb") };
}
function le(i, t) {
  return Number.isNaN(i) ? 0 : X(i, 0, t) / t;
}
function Ct(i, t) {
  return Math.round(255 * le(i, t));
}
function ps(i, t) {
  return Ct(i ?? t, t);
}
function ee(i, t, e) {
  return e < 0 && (e += 1), e > 1 && (e -= 1), e < 1 / 6 ? i + 6 * (t - i) * e : e < 0.5 ? t : e < 2 / 3 ? i + (t - i) * (2 / 3 - e) * 6 : i;
}
function ni(i, t, e, s, r) {
  if (Array.isArray(i)) {
    if (i.length < 3) throw Error("Component tuples must include at least RGB values.");
    return Be(i[0], i[1], i[2], i.length === 4 ? i[3] : void 0, r);
  }
  return typeof t == "number" && typeof e == "number" ? Be(i, t, e, s, r) : (function(n, h, a) {
    const c = a.mode === "rgb" ? a.maxes[0] : a.maxes[2], u = Ct(n, c);
    return [u, u, u, ps(h, a.maxes[3])];
  })(i, t ?? s, r);
}
function Be(i, t, e, s, r) {
  const [n, h, a, c] = r.maxes, u = ps(s, c);
  if (r.mode === "rgb") return [Ct(i, n), Ct(t, h), Ct(e, a), u];
  const l = (d = n, Number.isNaN(f = i) ? 0 : (f % d + d) % d / d);
  var f, d;
  const p = le(t, h), v = le(e, a), [w, y, g] = r.mode === "hsb" ? (function(b, M, A) {
    if (M === 0) return [A, A, A];
    const x = 6 * b, F = Math.floor(x), T = x - F, E = A * (1 - M), R = A * (1 - T * M), P = A * (1 - (1 - T) * M);
    switch (F % 6) {
      case 0:
        return [A, P, E];
      case 1:
        return [R, A, E];
      case 2:
        return [E, A, P];
      case 3:
        return [E, R, A];
      case 4:
        return [P, E, A];
      default:
        return [A, E, R];
    }
  })(l, p, v) : (function(b, M, A) {
    if (M === 0) return [A, A, A];
    const x = A < 0.5 ? A * (1 + M) : A + M - A * M, F = 2 * A - x;
    return [ee(F, x, b + 1 / 3), ee(F, x, b), ee(F, x, b - 1 / 3)];
  })(l, p, v);
  return [Math.round(255 * w), Math.round(255 * y), Math.round(255 * g), u];
}
class hi {
  constructor() {
    o(this, "lr", 0);
    o(this, "dr", 0);
    o(this, "_r", 0);
    o(this, "pr", 0);
    o(this, "mr", 0);
    o(this, "gr", 0);
    o(this, "vr", 1);
    o(this, "yr", 1);
    o(this, "wr", 1);
    o(this, "br", it());
    o(this, "Mr", it());
    o(this, "Ar", it());
  }
  Cr(t) {
    t.lr = this.lr, t.dr = this.dr, t._r = this._r, t.pr = this.pr, t.mr = this.mr, t.gr = this.gr, t.vr = this.vr, t.yr = this.yr, t.wr = this.wr;
    for (let e = 0; e < 16; e++) t.br[e] = this.br[e];
  }
  Sr(t) {
    this.lr = t.lr, this.dr = t.dr, this._r = t._r, this.pr = t.pr, this.mr = t.mr, this.gr = t.gr, this.vr = t.vr, this.yr = t.yr, this.wr = t.wr;
    for (let e = 0; e < 16; e++) this.br[e] = t.br[e];
  }
  Er(t = 0, e = 0, s = 0) {
    t === 0 && e === 0 && s === 0 || (this.Mr[0] = 1, this.Mr[1] = 0, this.Mr[2] = 0, this.Mr[3] = 0, this.Mr[4] = 0, this.Mr[5] = 1, this.Mr[6] = 0, this.Mr[7] = 0, this.Mr[8] = 0, this.Mr[9] = 0, this.Mr[10] = 1, this.Mr[11] = 0, this.Mr[12] = t, this.Mr[13] = e, this.Mr[14] = s, this.Mr[15] = 1, this.Fr(this.Mr));
  }
  Tr(t, e, s) {
    const r = e === void 0 ? t : e, n = s === void 0 ? e === void 0 ? t : 1 : s;
    t === 1 && r === 1 && n === 1 || (this.Mr[0] = t, this.Mr[1] = 0, this.Mr[2] = 0, this.Mr[3] = 0, this.Mr[4] = 0, this.Mr[5] = r, this.Mr[6] = 0, this.Mr[7] = 0, this.Mr[8] = 0, this.Mr[9] = 0, this.Mr[10] = n, this.Mr[11] = 0, this.Mr[12] = 0, this.Mr[13] = 0, this.Mr[14] = 0, this.Mr[15] = 1, this.Fr(this.Mr));
  }
  Pr(t) {
    if (t === 0) return;
    const e = V(t);
    this.Mr[0] = 1, this.Mr[1] = 0, this.Mr[2] = 0, this.Mr[3] = 0, this.Mr[4] = 0, this.Mr[5] = Math.cos(e), this.Mr[6] = Math.sin(e), this.Mr[7] = 0, this.Mr[8] = 0, this.Mr[9] = -Math.sin(e), this.Mr[10] = Math.cos(e), this.Mr[11] = 0, this.Mr[12] = 0, this.Mr[13] = 0, this.Mr[14] = 0, this.Mr[15] = 1, this.Fr(this.Mr);
  }
  Lr(t) {
    if (t === 0) return;
    const e = V(t);
    this.Mr[0] = Math.cos(e), this.Mr[1] = 0, this.Mr[2] = -Math.sin(e), this.Mr[3] = 0, this.Mr[4] = 0, this.Mr[5] = 1, this.Mr[6] = 0, this.Mr[7] = 0, this.Mr[8] = Math.sin(e), this.Mr[9] = 0, this.Mr[10] = Math.cos(e), this.Mr[11] = 0, this.Mr[12] = 0, this.Mr[13] = 0, this.Mr[14] = 0, this.Mr[15] = 1, this.Fr(this.Mr);
  }
  Dr(t) {
    if (t === 0) return;
    const e = V(t);
    this.Mr[0] = Math.cos(e), this.Mr[1] = Math.sin(e), this.Mr[2] = 0, this.Mr[3] = 0, this.Mr[4] = -Math.sin(e), this.Mr[5] = Math.cos(e), this.Mr[6] = 0, this.Mr[7] = 0, this.Mr[8] = 0, this.Mr[9] = 0, this.Mr[10] = 1, this.Mr[11] = 0, this.Mr[12] = 0, this.Mr[13] = 0, this.Mr[14] = 0, this.Mr[15] = 1, this.Fr(this.Mr);
  }
  kr(t, e, s, r) {
    if (t === 0) return;
    const n = Math.hypot(e, s, r);
    if (n < 1e-6) return;
    const h = e / n, a = s / n, c = r / n, u = V(t), l = Math.cos(u), f = Math.sin(u), d = 1 - l;
    this.Mr[0] = d * h * h + l, this.Mr[1] = d * h * a + f * c, this.Mr[2] = d * h * c - f * a, this.Mr[3] = 0, this.Mr[4] = d * h * a - f * c, this.Mr[5] = d * a * a + l, this.Mr[6] = d * a * c + f * h, this.Mr[7] = 0, this.Mr[8] = d * h * c + f * a, this.Mr[9] = d * a * c - f * h, this.Mr[10] = d * c * c + l, this.Mr[11] = 0, this.Mr[12] = 0, this.Mr[13] = 0, this.Mr[14] = 0, this.Mr[15] = 1, this.Fr(this.Mr);
  }
  Rr() {
    it(this.br), this.lr = 0, this.dr = 0, this._r = 0, this.pr = 0, this.mr = 0, this.gr = 0, this.vr = 1, this.yr = 1, this.wr = 1;
  }
  Or(t) {
    if (!this.Br(t)) throw Error("applyMatrix() only supports affine transform matrices without shear or perspective.");
    this.Fr(t);
  }
  Fr(t) {
    (function(e, s, r = new Float32Array(16)) {
      const n = e[0], h = e[1], a = e[2], c = e[3], u = e[4], l = e[5], f = e[6], d = e[7], p = e[8], v = e[9], w = e[10], y = e[11], g = e[12], b = e[13], M = e[14], A = e[15], x = s[0], F = s[1], T = s[2], E = s[3], R = s[4], P = s[5], I = s[6], Z = s[7], ot = s[8], at = s[9], W = s[10], G = s[11], tt = s[12], H = s[13], $ = s[14], q = s[15];
      r[0] = n * x + u * F + p * T + g * E, r[1] = h * x + l * F + v * T + b * E, r[2] = a * x + f * F + w * T + M * E, r[3] = c * x + d * F + y * T + A * E, r[4] = n * R + u * P + p * I + g * Z, r[5] = h * R + l * P + v * I + b * Z, r[6] = a * R + f * P + w * I + M * Z, r[7] = c * R + d * P + y * I + A * Z, r[8] = n * ot + u * at + p * W + g * G, r[9] = h * ot + l * at + v * W + b * G, r[10] = a * ot + f * at + w * W + M * G, r[11] = c * ot + d * at + y * W + A * G, r[12] = n * tt + u * H + p * $ + g * q, r[13] = h * tt + l * H + v * $ + b * q, r[14] = a * tt + f * H + w * $ + M * q, r[15] = c * tt + d * H + y * $ + A * q;
    })(this.br, t, this.Ar);
    for (let e = 0; e < 16; e++) this.br[e] = this.Ar[e];
    this.Ir();
  }
  Ir() {
    const t = this.br, e = this.pr, s = this.mr, r = this.gr;
    this.lr = t[12], this.dr = t[13], this._r = t[14];
    const n = t[0], h = t[1], a = t[2], c = t[4], u = t[5], l = t[6], f = t[8], d = t[9], p = t[10];
    let v = Math.hypot(n, h, a), w = Math.hypot(c, u, l), y = Math.hypot(f, d, p);
    v < 1e-6 && (v = 1e-6), w < 1e-6 && (w = 1e-6), y < 1e-6 && (y = 1e-6), t[0] * (t[5] * t[10] - t[6] * t[9]) - t[4] * (t[1] * t[10] - t[2] * t[9]) + t[8] * (t[1] * t[6] - t[2] * t[5]) < 0 && (y = -y), this.vr = v, this.yr = w, this.wr = y;
    const g = n / v, b = c / w, M = d / y, A = p / y, x = X(f / y, -1, 1), F = Math.asin(x);
    let T, E;
    Math.abs(Math.cos(F)) > 1e-6 ? (T = Math.atan2(-M, A), E = Math.atan2(-b, g)) : (T = Math.atan2(t[6] / w, t[5] / w), E = 0);
    const R = this.Nr(T + Math.PI), P = this.Nr(Math.PI - F), I = this.Nr(E + Math.PI), Z = Math.abs(this.Nr(T - e)) + Math.abs(this.Nr(F - s)) + Math.abs(this.Nr(E - r));
    Math.abs(this.Nr(R - e)) + Math.abs(this.Nr(P - s)) + Math.abs(this.Nr(I - r)) < Z ? (this.pr = R, this.mr = P, this.gr = I) : (this.pr = T, this.mr = F, this.gr = E);
  }
  Nr(t) {
    let e = (t + Math.PI) % (2 * Math.PI);
    return e < 0 && (e += 2 * Math.PI), e - Math.PI;
  }
  Br(t) {
    if (t.length !== 16 || Math.abs(t[3]) > 1e-6 || Math.abs(t[7]) > 1e-6 || Math.abs(t[11]) > 1e-6 || Math.abs(t[15] - 1) > 1e-6) return !1;
    const e = t[0], s = t[1], r = t[2], n = t[4], h = t[5], a = t[6], c = t[8], u = t[9], l = t[10], f = Math.hypot(e, s, r), d = Math.hypot(n, h, a), p = Math.hypot(c, u, l);
    if (f < 1e-6 || d < 1e-6 || p < 1e-6) return !1;
    const v = e / f, w = s / f, y = r / f, g = n / d, b = h / d, M = a / d, A = c / p, x = u / p, F = l / p, T = v * A + w * x + y * F, E = g * A + b * x + M * F;
    return Math.abs(v * g + w * b + y * M) < 1e-4 && Math.abs(T) < 1e-4 && Math.abs(E) < 1e-4;
  }
}
const ms = 0.4899573262537283;
class oi {
  constructor() {
    o(this, "ps", !1);
    o(this, "jr", 0);
    o(this, "Qr", 0);
    o(this, "ss", ms);
    o(this, "ds", 0.1);
    o(this, "_s", 4096);
    o(this, "ts", !0);
    o(this, "es", 0);
    o(this, "rs", 0);
    o(this, "ns", 0);
    o(this, "Yi", 0);
    o(this, "Wi", 0);
    o(this, "Zi", 0);
    o(this, "$i", 0);
    o(this, "qi", 1);
    o(this, "Ji", 0);
  }
  Cr(t) {
    t.ps = this.ps, t.jr = this.jr, t.Qr = this.Qr, t.ss = this.ss, t.ds = this.ds, t._s = this._s, t.ts = this.ts, t.es = this.es, t.rs = this.rs, t.ns = this.ns, t.Yi = this.Yi, t.Wi = this.Wi, t.Zi = this.Zi, t.$i = this.$i, t.qi = this.qi, t.Ji = this.Ji;
  }
  Sr(t) {
    this.ps = t.ps, this.jr = t.jr, this.Qr = t.Qr, this.ss = t.ss, this.ds = t.ds, this._s = t._s, this.ts = t.ts, this.es = t.es, this.rs = t.rs, this.ns = t.ns, this.Yi = t.Yi, this.Wi = t.Wi, this.Zi = t.Zi, this.$i = t.$i, this.qi = t.qi, this.Ji = t.Ji;
  }
  zr(t) {
    if (t)
      return this.ps ? void 0 : (this.ps = !0, void this.jr++);
    this.ps && (this.ps = !1, this.jr++);
  }
  vs(t, e, s) {
    let r = !1;
    if (t !== void 0) {
      const n = V(Math.max(1, Math.min(179, t)));
      this.ss !== n && (this.ss = n, r = !0);
    }
    e === void 0 && s === void 0 || (r = this.Hr(e, s) || r), this.ps && (this.ps = !1, r = !0), r && this.jr++;
  }
  gs(t, e) {
    let s = !1;
    s = this.Hr(t, e) || s, this.ps || (this.ps = !0, s = !0), s && this.jr++;
  }
  cs(t, e, s, r = 0, n = 0, h = 0, a = 0, c = 1, u = 0) {
    (this.ts || this.es !== t || this.rs !== e || this.ns !== s || this.Yi !== r || this.Wi !== n || this.Zi !== h || this.$i !== a || this.qi !== c || this.Ji !== u) && (this.ts = !1, this.es = t, this.rs = e, this.ns = s, this.Yi = r, this.Wi = n, this.Zi = h, this.$i = a, this.qi = c, this.Ji = u, this.Qr++);
  }
  bs(t, e, s, r, n, h) {
    let a = this.Yi !== t || this.Wi !== e || this.Zi !== s;
    r !== void 0 && this.$i !== r && (this.$i = r, a = !0), n !== void 0 && this.qi !== n && (this.qi = n, a = !0), h !== void 0 && this.Ji !== h && (this.Ji = h, a = !0), a && (this.Yi = t, this.Wi = e, this.Zi = s, this.Qr++);
  }
  ws() {
    (!this.ts || this.es !== 0 || this.rs !== 0 || this.ns !== 0 || this.Yi !== 0 || this.Wi !== 0 || this.Zi !== 0 || this.$i !== 0 || this.qi !== 1 || this.Ji !== 0) && (this.ts = !0, this.es = 0, this.rs = 0, this.ns = 0, this.Yi = 0, this.Wi = 0, this.Zi = 0, this.$i = 0, this.qi = 1, this.Ji = 0, this.Qr++);
  }
  Gr() {
    this.ps && (this.ps = !1, this.jr++);
  }
  Hr(t, e) {
    if (t === void 0 && e === void 0) return !1;
    const s = t === void 0 ? this.ds : Math.max(1e-4, t), r = s + 1e-4, n = e === void 0 ? Math.max(this._s, r) : Math.max(r, e);
    return (s !== this.ds || n !== this._s) && (this.ds = s, this._s = n, !0);
  }
}
const lt = 15;
class ai {
  constructor() {
    o(this, "Vr", new Float32Array(3));
    o(this, "Xr", 0);
    o(this, "Yr", new Float32Array(lt));
    o(this, "Kr", new Float32Array(lt));
    o(this, "Wr", new Float32Array([1, 0, 0]));
    o(this, "Zr", !1);
    o(this, "$r", 0);
  }
  Cr(t) {
    t.Vr[0] = this.Vr[0], t.Vr[1] = this.Vr[1], t.Vr[2] = this.Vr[2], t.Xr = this.Xr, t.Zr = this.Zr, t.$r = this.$r;
    for (let e = 0; e < lt; e++) t.Yr[e] = this.Yr[e], t.Kr[e] = this.Kr[e];
    t.Wr[0] = this.Wr[0], t.Wr[1] = this.Wr[1], t.Wr[2] = this.Wr[2];
  }
  Sr(t) {
    this.Vr[0] = t.Vr[0], this.Vr[1] = t.Vr[1], this.Vr[2] = t.Vr[2], this.Xr = t.Xr, this.Zr = t.Zr, this.$r = t.$r;
    for (let e = 0; e < lt; e++) this.Yr[e] = t.Yr[e], this.Kr[e] = t.Kr[e];
    this.Wr[0] = t.Wr[0], this.Wr[1] = t.Wr[1], this.Wr[2] = t.Wr[2];
  }
  qr(t, e, s) {
    this.Zr = !0, this.Vr[0] += t, this.Vr[1] += e, this.Vr[2] += s, this.$r++;
  }
  Jr(t, e, s, r, n, h) {
    if (this.Xr >= 5) return;
    this.Zr = !0;
    const a = 3 * this.Xr;
    this.Yr[a] = r, this.Yr[a + 1] = n, this.Yr[a + 2] = h, this.Kr[a] = t, this.Kr[a + 1] = e, this.Kr[a + 2] = s, this.Xr++, this.$r++;
  }
  tn(t, e, s) {
    let r = Math.max(0, t);
    const n = Math.max(0, e), h = Math.max(0, s);
    r === 0 && n === 0 && h === 0 && (r = 1), this.Wr[0] === r && this.Wr[1] === n && this.Wr[2] === h || (this.Wr[0] = r, this.Wr[1] = n, this.Wr[2] = h, this.$r++);
  }
  sn() {
    const t = this.Vr[0] !== 0 || this.Vr[1] !== 0 || this.Vr[2] !== 0, e = this.Xr > 0, s = this.Zr || t || e, r = this.Wr[0] !== 1 || this.Wr[1] !== 0 || this.Wr[2] !== 0;
    if (s || r) {
      this.Zr = !1, this.Vr[0] = 0, this.Vr[1] = 0, this.Vr[2] = 0, this.Xr = 0;
      for (let n = 0; n < lt; n++) this.Yr[n] = 0, this.Kr[n] = 0;
      this.Wr[0] = 1, this.Wr[1] = 0, this.Wr[2] = 0, this.$r++;
    }
  }
  se() {
    const t = this.Vr[0] !== 0 || this.Vr[1] !== 0 || this.Vr[2] !== 0;
    if (this.Xr !== 0 || t || this.Zr) {
      this.Zr = !1, this.Vr[0] = 0, this.Vr[1] = 0, this.Vr[2] = 0, this.Xr = 0;
      for (let e = 0; e < lt; e++) this.Yr[e] = 0, this.Kr[e] = 0;
      this.$r++;
    }
  }
}
function It(i, t, e, s, r = 255) {
  i[0] = t / 255, i[1] = (e ?? t) / 255, i[2] = (s ?? t) / 255, i[3] = r / 255;
}
class ci {
  constructor() {
    o(this, "en", 1);
    o(this, "rn", [1, 1, 0]);
    o(this, "nn", "");
    o(this, "hn", [1, 1, 1, 1]);
    o(this, "an", [0, 0, 0, 1]);
    o(this, "cn", "rgb");
    o(this, "un", ce().maxes);
    o(this, "ln", !1);
    o(this, "dn", !1);
    o(this, "_n", !1);
    o(this, "pn", 0);
    o(this, "Fs", [0, 0, 0, 1]);
  }
  Cr(t) {
    t.mn = this.en, t.gn = this.ln, t.vn = this.dn, t._n = this._n, t.pn = this.pn, t.yn[0] = this.rn[0], t.yn[1] = this.rn[1], t.yn[2] = this.rn[2], t.wn = this.nn, t.bn[0] = this.hn[0], t.bn[1] = this.hn[1], t.bn[2] = this.hn[2], t.bn[3] = this.hn[3], t.Mn[0] = this.an[0], t.Mn[1] = this.an[1], t.Mn[2] = this.an[2], t.Mn[3] = this.an[3], t.cn = this.cn, t.un[0] = this.un[0], t.un[1] = this.un[1], t.un[2] = this.un[2], t.un[3] = this.un[3];
  }
  Sr(t) {
    this.en = t.mn, this.ln = t.gn, this.dn = t.vn, this._n = t._n, this.pn = t.pn, this.rn[0] = t.yn[0], this.rn[1] = t.yn[1], this.rn[2] = t.yn[2], this.nn = t.wn, this.hn[0] = t.bn[0], this.hn[1] = t.bn[1], this.hn[2] = t.bn[2], this.hn[3] = t.bn[3], this.an[0] = t.Mn[0], this.an[1] = t.Mn[1], this.an[2] = t.Mn[2], this.an[3] = t.Mn[3], this.cn = t.cn, this.un[0] = t.un[0], this.un[1] = t.un[1], this.un[2] = t.un[2], this.un[3] = t.un[3];
  }
  An(t) {
    this.en = Math.abs(t);
  }
  Cn(t) {
    this.rn[0] = t[0], this.rn[1] = t[1], this.rn[2] = t[2];
  }
  xn(t) {
    this.nn = t;
  }
  Sn(t, e, s, r = 255) {
    It(this.hn, t, e, s, r);
  }
  En(t, e, s, r = 255) {
    It(this.an, t, e, s, r);
  }
  Fn(t) {
    this.ln = t;
  }
  Tn(t) {
    this.dn = t;
  }
  Pn(t) {
    this._n = t;
  }
  Ln(t) {
    this.pn = Kt(t);
  }
  Dn(t, e, s, r) {
    It(this.Fs, t, e, s, r);
  }
  kn() {
    this.Fs[0] = 0, this.Fs[1] = 0, this.Fs[2] = 0, this.Fs[3] = 0;
  }
  Rn() {
    return { mode: this.cn, maxes: [this.un[0], this.un[1], this.un[2], this.un[3]] };
  }
  On(t, e) {
    this.cn = t, this.un[0] = e[0], this.un[1] = e[1], this.un[2] = e[2], this.un[3] = e[3];
  }
}
function ke(i, t) {
  i[0] = t[0], i[1] = t[1], i[2] = t[2], i[3] = t[3];
}
function se(i, t) {
  if (t.kind === "none") return i.kind = "none", i.source = null, void (i.framebuffer = null);
  if (t.kind === "source") {
    const s = i;
    return s.kind = "source", s.source = t.source, s.palette = t.palette, s.brightnessStart = t.brightnessStart, s.brightnessEnd = t.brightnessEnd, s.invert = t.invert, s.flipX = t.flipX, s.flipY = t.flipY, s.charRotation = t.charRotation, s.charColorMode = t.charColorMode, s.cellColorMode = t.cellColorMode, s.charColor ?? (s.charColor = [1, 1, 1, 1]), s.cellColor ?? (s.cellColor = [0, 0, 0, 1]), ke(s.charColor, t.charColor), void ke(s.cellColor, t.cellColor);
  }
  const e = i;
  e.kind = "framebuffer", e.framebuffer = t.framebuffer, e.textures ?? (e.textures = []), e.textures.length = t.textures.length;
  for (let s = 0; s < t.textures.length; s++) e.textures[s] = t.textures[s];
  e.width = t.width, e.height = t.height, e.attachmentCount = t.attachmentCount;
}
class li {
  constructor() {
    o(this, "Bn", { kind: "source", source: null, palette: null, brightnessStart: 0, brightnessEnd: 1, invert: !1, flipX: !1, flipY: !1, charRotation: 0, charColorMode: "sampled", cellColorMode: "fixed", charColor: [1, 1, 1, 1], cellColor: [0, 0, 0, 1] });
    o(this, "In", 0);
    this.Bn.kind = "none", this.Bn.source = null, this.Bn.framebuffer = null;
  }
  Nn(t) {
    se(this.Bn, t), this.In++;
  }
  jn(t) {
    const e = this.Bn;
    e.kind = "framebuffer", e.framebuffer = t, e.textures ?? (e.textures = []), e.textures.length = t.textures.length;
    for (let s = 0; s < t.textures.length; s++) e.textures[s] = t.textures[s];
    e.width = t.width, e.height = t.height, e.attachmentCount = t.attachmentCount, this.In++;
  }
  Qn() {
    this.Bn.kind !== "none" && (this.Bn.kind = "none", this.Bn.source = null, this.Bn.framebuffer = null, this.In++);
  }
  Cr(t) {
    t.zn = this.In, se(t.Hn, this.Bn);
  }
  Sr(t) {
    this.In = t.zn, se(this.Bn, t.Hn);
  }
  get current() {
    return this.Bn;
  }
}
class wt {
  constructor() {
    o(this, "Gn", new hi());
    o(this, "Ki", new oi());
    o(this, "ee", new ai());
    o(this, "yn", new ci());
    o(this, "Vn", new li());
    o(this, "Xn", []);
    o(this, "Yn", []);
  }
  static Kn() {
    return { mn: 1, lr: 0, dr: 0, _r: 0, pr: 0, mr: 0, gr: 0, vr: 1, yr: 1, wr: 1, br: it(), pn: 0, gn: !1, vn: !1, _n: !1, ps: !1, jr: 0, Qr: 0, ss: ms, ds: 0.1, _s: 4096, ts: !0, es: 0, rs: 0, ns: 0, Yi: 0, Wi: 0, Zi: 0, $i: 0, qi: 1, Ji: 0, Xr: 0, Yr: new Float32Array(15), Kr: new Float32Array(15), Vr: new Float32Array(3), Wr: new Float32Array([1, 0, 0]), Zr: !1, $r: 0, zn: 0, Hn: { kind: "source", source: null, palette: null, brightnessStart: 0, brightnessEnd: 1, invert: !1, flipX: !1, flipY: !1, charRotation: 0, charColorMode: "sampled", cellColorMode: "fixed", charColor: [1, 1, 1, 1], cellColor: [0, 0, 0, 1] }, yn: [1, 1, 0], wn: "", bn: [1, 1, 1, 1], Mn: [0, 0, 0, 1], cn: ce().mode, un: ce().maxes };
  }
  Wn(t) {
    this.Gn.Cr(t), this.Ki.Cr(t), this.ee.Cr(t), this.yn.Cr(t), this.Vn.Cr(t);
  }
  Zn(t) {
    this.Gn.Sr(t), this.Ki.Sr(t), this.ee.Sr(t), this.yn.Sr(t), this.Vn.Sr(t);
  }
  $n(t) {
    this.Zn(t);
  }
  ze() {
    let t = this.Yn.pop();
    t || (t = wt.Kn()), this.Wn(t), this.Xn.push(t);
  }
  He() {
    const t = this.Xn.pop();
    t ? (this.Zn(t), this.Yn.push(t)) : console.warn("pop() called without matching push()");
  }
  re() {
    this.Gn.Rr(), this.Ki.Gr();
  }
}
var C = ((i) => (i.RECTANGLE = "rectangle", i.LINE = "line", i.ELLIPSE = "ellipse", i.ARC = "arc", i.BEZIER_CURVE = "bezier_curve", i.BOX = "box", i.SPHERE = "sphere", i.TORUS = "torus", i.CONE = "cone", i.CYLINDER = "cylinder", i.ELLIPSOID = "ellipsoid", i))(C || {});
const gs = { rectangle: 2, line: 2, ellipse: 2, arc: 3, bezier_curve: 4, box: 5, sphere: 6, torus: 7, cone: 8, cylinder: 9, ellipsoid: 6 }, ue = new Float32Array([-0.5, -0.5, 0, 0, 0.5, -0.5, 1, 0, -0.5, 0.5, 0, 1, -0.5, 0.5, 0, 1, 0.5, -0.5, 1, 0, 0.5, 0.5, 1, 1]), bt = { qn: 16, Jn: { th: { size: 2, offset: 0 }, ih: { size: 2, offset: 8 } } }, ui = { qn: 20, Jn: { th: { size: 3, offset: 0 }, ih: { size: 2, offset: 12 } } }, fi = { qn: 24, Jn: { th: { size: 4, offset: 0 }, ih: { size: 2, offset: 16 } } };
class di {
  constructor(t) {
    o(this, "Fe");
    o(this, "sh");
    o(this, "eh");
    this.Fe = t, this.sh = t.createBuffer(), this.eh = new Float32Array(ue.length);
  }
  rh(t, e, s, r) {
    const n = this.Fe, h = fs(this.Fe), a = h[2], c = h[3], u = t / a * 2 - 1, l = (t + s) / a * 2 - 1, f = 1 - (e + r) / c * 2, d = 1 - e / c * 2, p = ue, v = this.eh;
    for (let w = 0; w < p.length; w += 4) {
      const y = p[w], g = p[w + 1], b = p[w + 2], M = p[w + 3], A = u + (y + 0.5) * (l - u), x = f + (g + 0.5) * (d - f);
      v[w] = A, v[w + 1] = x, v[w + 2] = b, v[w + 3] = M;
    }
    n.bindBuffer(n.ARRAY_BUFFER, this.sh), n.bufferData(n.ARRAY_BUFFER, v, n.DYNAMIC_DRAW), Ft(n, 0, 2, 16, 0), Ft(n, 1, 2, 16, 8), n.drawArrays(n.TRIANGLES, 0, 6), n.disableVertexAttribArray(1), n.disableVertexAttribArray(0), n.bindBuffer(n.ARRAY_BUFFER, null);
  }
  L() {
    this.Fe.deleteBuffer(this.sh);
  }
}
const fe = "glyph_run", vs = "custom_shape";
class pi {
  constructor(t) {
    o(this, "Fe");
    o(this, "nh", /* @__PURE__ */ new Map());
    o(this, "hh", null);
    this.Fe = t;
  }
  oh(t) {
    const { shader: e, geometryKey: s, unit: r, geometryBuffer: n, indexBuffer: h, instanceAttributes: a } = t, c = this.Fe, u = e.program;
    let l = this.nh.get(e);
    l || (l = /* @__PURE__ */ new Map(), this.nh.set(e, l), e.k(() => this.ah(e)));
    let f = l.get(s);
    if (f && f.instanceBufferVersion !== a.uh && (f.vao && (c.deleteVertexArray(f.vao), this.hh === f.vao && (this.hh = null)), l.delete(s), f = void 0), f) this.hh !== f.vao && (c.bindVertexArray(f.vao), this.hh = f.vao);
    else {
      const d = c.createVertexArray();
      f = { vao: d, instanceBufferVersion: a.uh }, l.set(s, f), c.bindVertexArray(d), this.hh = d, c.bindBuffer(c.ARRAY_BUFFER, n), h && c.bindBuffer(c.ELEMENT_ARRAY_BUFFER, h);
      const p = c.getAttribLocation(u, "A0");
      p !== -1 && Ft(c, p, r.Jn.th.size, r.qn, r.Jn.th.offset, 0, c.FLOAT, !1);
      const v = c.getAttribLocation(u, "A1");
      v !== -1 && Ft(c, v, r.Jn.ih.size, r.qn, r.Jn.ih.offset, 0, c.FLOAT, !1), a.fh(e);
    }
  }
  ah(t) {
    const e = this.nh.get(t);
    if (e) {
      for (const [, s] of e) s.vao && this.Fe.deleteVertexArray(s.vao);
      this.nh.delete(t);
    }
  }
  dh() {
    this.hh !== null && (this.Fe.bindVertexArray(null), this.hh = null);
  }
  L() {
    for (const [, t] of this.nh) for (const [, e] of t) e.vao && this.Fe.deleteVertexArray(e.vao);
    this.nh.clear();
  }
}
class k {
}
o(k, "BYTES_PER_INSTANCE", 144), o(k, "FLOATS_PER_INSTANCE", 36);
function Y(i, t) {
  return { location: -1, size: i, stride: k.BYTES_PER_INSTANCE, offset: t, divisor: 1 };
}
class jt {
}
o(jt, "STRIDE", k.BYTES_PER_INSTANCE), o(jt, "ATTRIBUTES", { A2: Y(2, 0), A3: Y(2, 8), A4: Y(3, 16), A5: Y(4, 28), A6: Y(4, 44), A7: Y(4, 60), A8: Y(3, 76), A9: Y(3, 88), Aa: Y(4, 100), Ab: Y(4, 116), Ac: Y(3, 132) });
class mi {
  constructor(t = 1e3, e = 1.5) {
    o(this, "_h");
    o(this, "ph");
    o(this, "mh");
    o(this, "gh", 0);
    o(this, "yh", 0);
    this.ph = t, this.mh = e;
    const s = t * k.FLOATS_PER_INSTANCE;
    this._h = new Float32Array(s);
  }
  wh(t) {
    if (t <= this.ph) return;
    const e = Math.ceil(t * this.mh), s = this.ph;
    this.ph = e;
    const r = new Float32Array(e * k.FLOATS_PER_INSTANCE), n = s * k.FLOATS_PER_INSTANCE;
    r.set(this._h.subarray(0, Math.min(n, this.gh))), this._h = r;
  }
  bh(t) {
    this.gh += t, this.yh++;
  }
  Mh() {
    this.gh = 0, this.yh = 0;
  }
  Ah(t = 0, e) {
    return this._h.subarray(t, e ?? this.gh);
  }
}
function ys(i, t) {
  return { x: 0, y: 0, width: 0, height: 0, char0: 0, char1: 0, char2: 0, r1: 0, g1: 0, b1: 0, a1: 0, r2: 0, g2: 0, b2: 0, a2: 0, invert: 0, flipX: 0, flipY: 0, charRot: 0, translationX: 0, translationY: 0, translationZ: 0, rotationX: 0, rotationY: 0, rotationZ: 0, curveParams0: i, curveParams1: t, depth: 0, baseZ: 0, geometryType: 0 };
}
class gi {
  constructor(t) {
    o(this, "_h");
    this._h = t;
  }
  Ch(t) {
    this._h.yh >= this._h.ph && this._h.wh(this._h.yh + 1);
    const e = this._h._h, s = this._h.gh;
    e[s + 0] = t.x, e[s + 1] = t.y, e[s + 2] = t.width, e[s + 3] = t.height, e[s + 4] = t.char0, e[s + 5] = t.char1, e[s + 6] = t.char2, e[s + 7] = t.r1, e[s + 8] = t.g1, e[s + 9] = t.b1, e[s + 10] = t.a1, e[s + 11] = t.r2, e[s + 12] = t.g2, e[s + 13] = t.b2, e[s + 14] = t.a2, e[s + 15] = t.invert, e[s + 16] = t.flipX, e[s + 17] = t.flipY, e[s + 18] = t.charRot, e[s + 19] = t.translationX, e[s + 20] = t.translationY, e[s + 21] = t.translationZ, e[s + 22] = t.rotationX, e[s + 23] = t.rotationY, e[s + 24] = t.rotationZ;
    const r = t.curveParams0, n = t.curveParams1;
    return e[s + 25] = r[0], e[s + 26] = r[1], e[s + 27] = r[2], e[s + 28] = r[3], e[s + 29] = n[0], e[s + 30] = n[1], e[s + 31] = n[2], e[s + 32] = n[3], e[s + 33] = t.depth, e[s + 34] = t.baseZ, e[s + 35] = t.geometryType, this._h.bh(k.FLOATS_PER_INSTANCE), this._h.yh - 1;
  }
}
class vi {
  constructor(t, e = 1e3) {
    o(this, "Fe");
    o(this, "xh", null);
    o(this, "Sh", 0);
    o(this, "Eh", /* @__PURE__ */ new WeakMap());
    o(this, "In", 0);
    this.Fe = t, this.Fh(e);
  }
  Fh(t) {
    const e = this.Fe;
    this.xh && e.deleteBuffer(this.xh), this.In++, this.xh = e.createBuffer();
    const s = t * k.BYTES_PER_INSTANCE;
    ae(e, e.ARRAY_BUFFER, this.xh, s, e.DYNAMIC_DRAW), this.Sh = t;
  }
  Th(t) {
    this.Fh(t);
  }
  W(t, e) {
    if (e === 0) return;
    const s = this.Fe;
    s.bindBuffer(s.ARRAY_BUFFER, this.xh), s.bufferSubData(s.ARRAY_BUFFER, 0, t, 0, e);
  }
  get uh() {
    return this.In;
  }
  Ph(t) {
    let e = this.Eh.get(t);
    if (!e) {
      e = /* @__PURE__ */ new Map();
      const s = this.Fe;
      for (const r in jt.ATTRIBUTES) {
        const n = r, h = s.getAttribLocation(t, n);
        h !== -1 && e.set(n, h);
      }
      this.Eh.set(t, e);
    }
    return e;
  }
  fh(t) {
    const e = this.Fe, s = t.program, r = this.Ph(s);
    e.bindBuffer(e.ARRAY_BUFFER, this.xh);
    for (const [n, h] of r) {
      const a = jt.ATTRIBUTES[n];
      a && Ft(e, h, a.size, a.stride, a.offset, a.divisor);
    }
  }
  L() {
    this.xh && (this.Fe.deleteBuffer(this.xh), this.xh = null);
  }
}
class ws {
  constructor(t, e = 1e3, s = 1.5) {
    o(this, "Fe");
    o(this, "_h");
    o(this, "Lh");
    o(this, "Dh");
    this.Fe = t, this._h = new mi(e, s), this.Lh = new gi(this._h), this.Dh = new vi(t, e);
  }
  kh() {
    this._h.ph > this.Dh.Sh && this.Dh.Th(this._h.ph);
  }
  get writer() {
    return this.Lh;
  }
  get Rh() {
    return this.Dh;
  }
  Oh() {
    this._h.Mh();
  }
  Bh(t, e) {
    if (e === 0) return;
    const s = e * k.FLOATS_PER_INSTANCE;
    this._h.wh(this._h.yh + e);
    const r = this._h._h, n = this._h.gh;
    for (let h = 0; h < s; h++) r[n + h] = t[h];
    this._h.gh += s, this._h.yh += e;
  }
  Ih() {
    this._h.yh !== 0 && (this.kh(), this.Dh.W(this._h._h, this._h.gh));
  }
  rh(t, e) {
    const s = this._h.yh;
    s !== 0 && this.Fe.drawArraysInstanced(t, 0, e, s);
  }
  Nh(t, e, s, r = 0) {
    const n = this._h.yh;
    n !== 0 && this.Fe.drawElementsInstanced(t, e, s, r, n);
  }
  L() {
    this.Dh.L();
  }
}
class Mt {
  constructor(t, e, s, r) {
    o(this, "Fe");
    o(this, "jh");
    o(this, "Qh");
    o(this, "zh");
    o(this, "Hh", null);
    o(this, "Gh", null);
    o(this, "Vh", [0, 0, 0, 0]);
    o(this, "Xh", [0, 0, 0, 0]);
    o(this, "Yh");
    this.Fe = t, this.jh = e, this.Qh = s, this.zh = r, this.Yh = ys(this.Vh, this.Xh);
    const n = this.Fe.createBuffer();
    if (ae(this.Fe, this.Fe.ARRAY_BUFFER, n, this.zh.Kh, this.Fe.STATIC_DRAW), this.Hh = n, this.zh.Wh) {
      const h = this.Fe.createBuffer();
      ae(this.Fe, this.Fe.ELEMENT_ARRAY_BUFFER, h, this.zh.Wh, this.Fe.STATIC_DRAW), this.Gh = h;
    }
  }
  get type() {
    return this.Qh;
  }
  get unitGeometry() {
    return this.zh;
  }
  get unitBuffer() {
    return this.Hh;
  }
  get unitIndexBuffer() {
    return this.Gh;
  }
  get batch() {
    return this.jh;
  }
  Zh() {
    this.jh.Oh();
  }
  $h() {
    return this.jh._h.yh !== 0;
  }
  L() {
    this.jh.L(), this.Fe.deleteBuffer(this.Hh), this.Gh && this.Fe.deleteBuffer(this.Gh);
  }
  Ch(t, e, s, r, n, h, a) {
    const c = n.lr ?? 0, u = n.dr ?? 0, l = n._r ?? 0, f = n.pr ?? 0, d = n.mr ?? 0, p = a ?? n.gr ?? 0, v = n.vr ?? 1, w = n.yr ?? 1, y = n.wr ?? 1, g = this.Vh, b = this.Xh;
    g[0] = 0, g[1] = 0, g[2] = 0, g[3] = 0, b[0] = 0, b[1] = 0, b[2] = 0, b[3] = 0, h && (h.bezStartX !== void 0 && h.bezStartY !== void 0 && h.bezEndX !== void 0 && h.bezEndY !== void 0 ? (g[0] = h.cp1x ?? 0, g[1] = h.cp1y ?? 0, g[2] = h.cp2x ?? 0, g[3] = h.cp2y ?? 0, b[0] = h.bezStartX ?? 0, b[1] = h.bezStartY ?? 0, b[2] = h.bezEndX ?? 0, b[3] = h.bezEndY ?? 0) : h.arcStart === void 0 && h.arcStop === void 0 || (g[0] = h.arcStart ?? 0, g[1] = h.arcStop ?? 0));
    const M = this.Yh;
    return M.x = t * v, M.y = e * w, M.width = s * v, M.height = r * w, M.char0 = n.yn[0], M.char1 = n.yn[1], M.char2 = n.yn[2], M.r1 = n.bn[0], M.g1 = n.bn[1], M.b1 = n.bn[2], M.a1 = n.bn[3], M.r2 = n.Mn[0], M.g2 = n.Mn[1], M.b2 = n.Mn[2], M.a2 = n.Mn[3], M.invert = n._n ? 1 : 0, M.flipX = n.gn ? 1 : 0, M.flipY = n.vn ? 1 : 0, M.charRot = n.pn, M.translationX = c, M.translationY = u, M.translationZ = l, M.rotationX = f, M.rotationY = d, M.rotationZ = p, M.depth = ((h == null ? void 0 : h.depth) ?? 0) * y, M.baseZ = ((h == null ? void 0 : h.baseZ) ?? 0) * y, M.geometryType = gs[this.Qh] ?? 0, this.jh.writer.Ch(M);
  }
}
const yi = { Kh: ue, qh: 6, ...bt };
class wi extends Mt {
  constructor(t, e) {
    super(t, e, C.RECTANGLE, yi);
  }
  Jh(t, e) {
    return this.Ch(0, 0, t.width, t.height, e);
  }
}
const bi = { Kh: new Float32Array([0, -0.5, 0, 0, 1, -0.5, 1, 0, 0, 0.5, 0, 1, 0, 0.5, 0, 1, 1, -0.5, 1, 0, 1, 0.5, 1, 1]), qh: 6, ...bt };
class Mi extends Mt {
  constructor(t, e) {
    super(t, e, C.LINE, bi);
  }
  Jh(t, e) {
    const s = t.x2 - t.x1, r = t.y2 - t.y1, n = Math.hypot(s, r), h = Math.atan2(r, s), a = e.mn || 1, c = Math.cos(-h), u = Math.sin(-h), l = t.x1 * c - t.y1 * u, f = t.x1 * u + t.y1 * c;
    return this.Ch(l, f, n, a, e, null, (e.gr || 0) + h);
  }
}
const Ai = { Kh: (function(i = 32) {
  const t = [], e = 2 * Math.PI / i;
  for (let s = 0; s < i; s++) {
    const r = s * e, n = (s + 1) % i * e, h = Math.cos(r), a = Math.sin(r), c = 0.5 * (h + 1), u = 0.5 * (a + 1), l = Math.cos(n), f = Math.sin(n), d = 0.5 * (l + 1), p = 0.5 * (f + 1);
    t.push(0, 0, 0.5, 0.5, h, a, c, u, l, f, d, p);
  }
  return new Float32Array(t);
})(32), qh: 96, ...bt };
class _i extends Mt {
  constructor(t, e) {
    super(t, e, C.ELLIPSE, Ai);
  }
  Jh(t, e) {
    return this.Ch(0, 0, t.width, t.height, e);
  }
}
const xi = { Kh: (function(i) {
  const t = [];
  for (let e = 0; e < i; e++) {
    const s = e / i, r = (e + 1) / i;
    t.push(s, 0, s, 0, s, 1, s, 1, r, 1, r, 1);
  }
  return new Float32Array(t);
})(32), qh: 96, ...bt };
class Ei extends Mt {
  constructor(t, e) {
    super(t, e, C.ARC, xi);
  }
  Jh(t, e) {
    const s = V(t.start), r = V(t.stop);
    return this.Ch(0, 0, t.width, t.height, e, { arcStart: s, arcStop: r });
  }
}
const Ci = { Kh: (function(i = 16) {
  const t = [];
  for (let e = 0; e < i; e++) {
    const s = e / i, r = (e + 1) / i;
    t.push(s, -0.5, s, 0, r, -0.5, r, 0, s, 0.5, s, 1, s, 0.5, s, 1, r, -0.5, r, 0, r, 0.5, r, 1);
  }
  return new Float32Array(t);
})(16), qh: 96, ...bt };
class Ti extends Mt {
  constructor(t, e) {
    super(t, e, C.BEZIER_CURVE, Ci);
  }
  Jh(t, e) {
    return this.Ch(0, 0, 1, e.mn || 1, e, { cp1x: t.cp1x, cp1y: t.cp1y, cp2x: t.cp2x, cp2y: t.cp2y, bezStartX: t.x1, bezStartY: t.y1, bezEndX: t.x2, bezEndY: t.y2 });
  }
}
class ut extends Mt {
  constructor(t, e, s, r) {
    super(t, e, s, (function(n, h) {
      const a = n === C.TORUS ? fi : ui;
      return { Kh: h.vertices, Wh: h.indices, qh: h.vertices.length / (a.qn / 4), io: h.indices.length, ...a };
    })(s, r));
  }
  Jh(t, e) {
    return this.Ch(0, 0, t.width, t.height, e, { depth: t.depth });
  }
}
const Fi = { Kh: new Float32Array(0), qh: 0, ...bt };
class Si {
  constructor(t) {
    o(this, "Fe");
    o(this, "_h");
    o(this, "jh");
    o(this, "zh", { ...Fi });
    o(this, "so", [0, 0, 0, 0]);
    o(this, "eo", [0, 0, 0, 0]);
    o(this, "ro");
    o(this, "no", 1);
    o(this, "ho", 0);
    this.Fe = t, this._h = t.createBuffer(), this.jh = new ws(t, 1), this.ro = ys(this.so, this.eo);
  }
  rh(t, e, s, r, n) {
    s !== 0 && (this.oo(e, s), this.Ch(r), this.jh.Ih(), n.oh({ shader: t, geometryKey: "custom_shape:" + this.no, unit: this.zh, geometryBuffer: this._h, instanceAttributes: this.jh.Rh }), this.jh.rh(this.Fe.TRIANGLES, s), this.jh.Oh());
  }
  L() {
    this.jh.L(), this.Fe.deleteBuffer(this._h);
  }
  oo(t, e) {
    const s = 4 * e;
    s > this.ho && (this.ho = s, this.no++), this.zh.qh = e, this.Fe.bindBuffer(this.Fe.ARRAY_BUFFER, this._h), this.Fe.bufferData(this.Fe.ARRAY_BUFFER, t.subarray(0, s), this.Fe.DYNAMIC_DRAW);
  }
  Ch(t) {
    this.jh.Oh();
    const e = this.ro;
    e.x = 0, e.y = 0, e.width = t.vr ?? 1, e.height = t.yr ?? 1, e.char0 = t.yn[0], e.char1 = t.yn[1], e.char2 = t.yn[2], e.r1 = t.bn[0], e.g1 = t.bn[1], e.b1 = t.bn[2], e.a1 = t.bn[3], e.r2 = t.Mn[0], e.g2 = t.Mn[1], e.b2 = t.Mn[2], e.a2 = t.Mn[3], e.invert = t._n ? 1 : 0, e.flipX = t.gn ? 1 : 0, e.flipY = t.vn ? 1 : 0, e.charRot = t.pn, e.translationX = t.lr ?? 0, e.translationY = t.dr ?? 0, e.translationZ = t._r ?? 0, e.rotationX = t.pr ?? 0, e.rotationY = t.mr ?? 0, e.rotationZ = t.gr ?? 0, e.depth = t.wr ?? 1, e.baseZ = 0, e.geometryType = 10, this.jh.writer.Ch(e);
  }
}
const Ri = { vertices: new Float32Array([-0.5, -0.5, 0.5, 0, 0, 0.5, -0.5, 0.5, 1, 0, 0.5, 0.5, 0.5, 1, 1, -0.5, 0.5, 0.5, 0, 1, 0.5, -0.5, -0.5, 0, 0, -0.5, -0.5, -0.5, 1, 0, -0.5, 0.5, -0.5, 1, 1, 0.5, 0.5, -0.5, 0, 1, -0.5, -0.5, -0.5, 0, 0, -0.5, -0.5, 0.5, 1, 0, -0.5, 0.5, 0.5, 1, 1, -0.5, 0.5, -0.5, 0, 1, 0.5, -0.5, 0.5, 0, 0, 0.5, -0.5, -0.5, 1, 0, 0.5, 0.5, -0.5, 1, 1, 0.5, 0.5, 0.5, 0, 1, -0.5, 0.5, 0.5, 0, 0, 0.5, 0.5, 0.5, 1, 0, 0.5, 0.5, -0.5, 1, 1, -0.5, 0.5, -0.5, 0, 1, -0.5, -0.5, -0.5, 0, 0, 0.5, -0.5, -0.5, 1, 0, 0.5, -0.5, 0.5, 1, 1, -0.5, -0.5, 0.5, 0, 1]), indices: new Uint16Array([0, 1, 2, 0, 2, 3, 4, 5, 6, 4, 6, 7, 8, 9, 10, 8, 10, 11, 12, 13, 14, 12, 14, 15, 16, 17, 18, 16, 18, 19, 20, 21, 22, 20, 22, 23]) }, Xe = (function(i = 12, t = 16) {
  const e = [], s = [];
  for (let n = 0; n <= i; n++) {
    const h = n / i, a = h * Math.PI, c = Math.sin(a), u = Math.cos(a);
    for (let l = 0; l <= t; l++) {
      const f = l / t, d = f * Math.PI * 2, p = Math.sin(d), v = Math.cos(d) * c * 0.5, w = 0.5 * u, y = p * c * 0.5;
      e.push(v, w, y, f, h);
    }
  }
  const r = t + 1;
  for (let n = 0; n < i; n++) for (let h = 0; h < t; h++) {
    const a = n * r + h, c = a + r;
    s.push(a, c, a + 1, a + 1, c, c + 1);
  }
  return { vertices: new Float32Array(e), indices: new Uint16Array(s) };
})(14, 20), Pi = (function(i = 16, t = 12) {
  const e = [], s = [];
  for (let n = 0; n <= i; n++) {
    const h = n / i * Math.PI * 2, a = Math.cos(h), c = Math.sin(h);
    for (let u = 0; u <= t; u++) {
      const l = u / t * Math.PI * 2, f = Math.cos(l), d = Math.sin(l);
      e.push(a, c, f, d, n / i, u / t);
    }
  }
  const r = t + 1;
  for (let n = 0; n < i; n++) for (let h = 0; h < t; h++) {
    const a = n * r + h, c = (n + 1) * r + h;
    s.push(a, c, a + 1, a + 1, c, c + 1);
  }
  return { vertices: new Float32Array(e), indices: new Uint16Array(s) };
})(20, 16), Li = (function(i = 20) {
  const t = [], e = [];
  for (let s = 0; s < i; s++) {
    const r = s / i, n = (s + 1) / i, h = r * Math.PI * 2, a = n * Math.PI * 2, c = t.length / 5;
    t.push(0, 0.5, 0, 0.5 * (r + n), 1, 0.5 * Math.cos(h), -0.5, 0.5 * Math.sin(h), r, 0, 0.5 * Math.cos(a), -0.5, 0.5 * Math.sin(a), n, 0, 0, -0.5, 0, 0.5, 0.5), e.push(c, c + 1, c + 2, c + 3, c + 2, c + 1);
  }
  return { vertices: new Float32Array(t), indices: new Uint16Array(e) };
})(24), Di = (function(i = 24) {
  const t = [], e = [];
  for (let s = 0; s < i; s++) {
    const r = s / i, n = (s + 1) / i, h = r * Math.PI * 2, a = n * Math.PI * 2, c = 0.5 * Math.cos(h), u = 0.5 * Math.sin(h), l = 0.5 * Math.cos(a), f = 0.5 * Math.sin(a), d = t.length / 5;
    t.push(c, 0.5, u, r, 1, c, -0.5, u, r, 0, l, 0.5, f, n, 1, l, -0.5, f, n, 0), e.push(d, d + 1, d + 2, d + 2, d + 1, d + 3);
    const p = t.length / 5;
    t.push(0, 0.5, 0, 0.5, 0.5, l, 0.5, f, l + 0.5, f + 0.5, c, 0.5, u, c + 0.5, u + 0.5, 0, -0.5, 0, 0.5, 0.5, c, -0.5, u, c + 0.5, u + 0.5, l, -0.5, f, l + 0.5, f + 0.5), e.push(p, p + 1, p + 2, p + 3, p + 4, p + 5);
  }
  return { vertices: new Float32Array(t), indices: new Uint16Array(e) };
})(24), Ui = { [C.RECTANGLE]: (i, t) => new wi(i, t), [C.LINE]: (i, t) => new Mi(i, t), [C.ELLIPSE]: (i, t) => new _i(i, t), [C.ARC]: (i, t) => new Ei(i, t), [C.BEZIER_CURVE]: (i, t) => new Ti(i, t), [C.BOX]: (i, t) => new ut(i, t, C.BOX, Ri), [C.SPHERE]: (i, t) => new ut(i, t, C.SPHERE, Xe), [C.TORUS]: (i, t) => new ut(i, t, C.TORUS, Pi), [C.CONE]: (i, t) => new ut(i, t, C.CONE, Li), [C.CYLINDER]: (i, t) => new ut(i, t, C.CYLINDER, Di), [C.ELLIPSOID]: (i, t) => new ut(i, t, C.ELLIPSOID, Xe) };
class Gi {
  constructor(t) {
    o(this, "Fe");
    o(this, "ao");
    o(this, "co");
    o(this, "uo");
    o(this, "lo", null);
    o(this, "fo", /* @__PURE__ */ new Map());
    o(this, "do", null);
    o(this, "_o", "");
    o(this, "po", it());
    o(this, "mo", it());
    o(this, "vo", [0, 0, 0]);
    o(this, "yo", [0, 0, 0]);
    o(this, "wo", [0, 1, 0]);
    this.Fe = t, this.co = new pi(t), this.uo = new Si(t), this.ao = /* @__PURE__ */ new Map();
    for (const e of Object.values(C)) {
      const s = new ws(t), r = (0, Ui[e])(t, s);
      this.ao.set(e, r);
    }
  }
  bo(t) {
    this.lo = null, this.fo.clear(), this.do = null, this._o = "";
    let e = null, s = null, r = null, n = !1, h = -1, a = -1, c = -1, u = null;
    for (const l of t) {
      if (l.type === vs) {
        r && r.$h() && this.Mo(r, e, s, u), e = null, s = null, r = null, n = !1, h = -1, a = -1, c = -1, u = null, this.Ao(l);
        continue;
      }
      const f = l.type === fe ? C.RECTANGLE : l.type;
      e === l.material && s === f && n === l.state.ps && h === l.state.jr && a === l.state.Qr && c === l.state.$r || (r && r.$h() && this.Mo(r, e, s, u), e = l.material, s = f, r = this.ao.get(s), n = l.state.ps, h = l.state.jr, a = l.state.Qr, c = l.state.$r, u = l.state, r.Zh()), l.type === fe ? r.batch.Bh(l.params.data, l.params.instanceCount) : r.Jh(l.params, l.state);
    }
    r && r.$h() && this.Mo(r, e, s, u), this.co.dh();
  }
  Ao(t) {
    this.Co(t.material, t.state), this.uo.rh(t.material.shader, t.params.vertices, t.params.vertexCount, t.state, this.co);
  }
  Mo(t, e, s, r) {
    this.Co(e, r);
    const n = t.unitGeometry, h = t.unitBuffer, a = n.xo ?? this.Fe.TRIANGLES;
    try {
      t.batch.Ih(), this.co.oh({ shader: e.shader, geometryKey: s + "", unit: n, geometryBuffer: h, indexBuffer: t.unitIndexBuffer, instanceAttributes: t.batch.Rh }), n.Wh && n.io ? t.batch.Nh(a, n.io, n.So ?? this.Fe.UNSIGNED_SHORT, n.Eo ?? 0) : t.batch.rh(a, n.qh);
    } finally {
      t.Zh();
    }
  }
  Co(t, e) {
    this.lo !== t.shader && (t.shader.hr(), this.lo = t.shader), this.do !== t && (t.shader.ae(t.uniforms), this.do = t);
    const s = fs(this.Fe), r = `${e.jr}:${e.Qr}:${e.$r}:${s[2]}:${s[3]}`;
    if (this.fo.get(t.shader) === r) return;
    const n = `${e.jr}:${e.Qr}:${s[2]}:${s[3]}`;
    this._o !== n && (this.Fo(e, s[2], s[3]), this._o = n), t.shader.ae({ UK: s[2] / s[3], UL: this.po, UM: this.mo, u_tmUseLighting: e.Zr || e.Xr > 0 || e.Vr[0] !== 0 || e.Vr[1] !== 0 || e.Vr[2] !== 0, u_tmAmbientLightColor: e.Vr, u_tmPointLightCount: e.Xr, u_tmPointLightPositions: e.Yr, u_tmPointLightColors: e.Kr, u_tmLightFalloff: e.Wr }), this.fo.set(t.shader, r);
  }
  Fo(t, e, s) {
    const r = Math.max(1, s), n = Math.max(1 / 4096, e / r), h = t.ds, a = t._s;
    if (this.yo[0] = t.Yi, this.yo[1] = t.Wi, this.yo[2] = t.Zi, this.wo[0] = t.$i, this.wo[1] = t.qi, this.wo[2] = t.Ji, t.ts) {
      const c = 0.5 * r / Math.tan(0.5 * t.ss);
      this.vo[0] = this.yo[0], this.vo[1] = this.yo[1], this.vo[2] = this.yo[2] + c, Oe(this.vo, this.yo, this.wo, this.po);
    } else this.vo[0] = t.es, this.vo[1] = t.rs, this.vo[2] = t.ns, Oe(this.vo, this.yo, this.wo, this.po);
    if (t.ps) {
      const c = 0.5 * e, u = 0.5 * r;
      return void (function(l, f, d, p, v, w, y = new Float32Array(16)) {
        const g = 1 / (l - f), b = 1 / (d - p), M = 1 / (v - w);
        y[0] = -2 * g, y[1] = 0, y[2] = 0, y[3] = 0, y[4] = 0, y[5] = -2 * b, y[6] = 0, y[7] = 0, y[8] = 0, y[9] = 0, y[10] = 2 * M, y[11] = 0, y[12] = (l + f) * g, y[13] = (p + d) * b, y[14] = (w + v) * M, y[15] = 1;
      })(-c, c, -u, u, h, a, this.mo);
    }
    (function(c, u, l, f, d = new Float32Array(16)) {
      const p = 1 / Math.tan(0.5 * c), v = 1 / (l - f);
      d[0] = p / u, d[1] = 0, d[2] = 0, d[3] = 0, d[4] = 0, d[5] = p, d[6] = 0, d[7] = 0, d[8] = 0, d[9] = 0, d[10] = (f + l) * v, d[11] = -1, d[12] = 0, d[13] = 0, d[14] = 2 * f * l * v, d[15] = 0;
    })(t.ss, n, h, a, this.mo);
  }
  L() {
    for (const t of this.ao.values()) t.L();
    this.ao.clear(), this.uo.L(), this.co.L();
  }
}
const bs = "vec3 rotateAroundX(vec3 A,float B){float C=cos(B);float D=sin(B);return vec3(A.x,A.y*C-A.z*D,A.y*D+A.z*C);}vec3 rotateAroundY(vec3 A,float B){float C=cos(B);float D=sin(B);return vec3(A.x*C+A.z*D,A.y,-A.x*D+A.z*C);}vec3 rotateAroundZ(vec3 A,float B){float C=cos(B);float D=sin(B);return vec3(A.x*C-A.y*D,A.x*D+A.y*C,A.z);}vec3 applyRotation(vec3 A,vec3 E){vec3 F=A;if(E.z!=0.0f){F=rotateAroundZ(F,E.z);}if(E.y!=0.0f){F=rotateAroundY(F,E.y);}if(E.x!=0.0f){F=rotateAroundX(F,E.x);}return F;}", Bt = `#version 300 es
in vec4 A0;in vec2 A1;in vec2 A2;in vec2 A3;in vec3 A4;in vec4 A5;in vec4 A6;in vec4 A7;in vec3 A8;in vec3 A9;in vec4 Aa;in vec4 Ab;in vec3 Ac;uniform mat4 UL;uniform mat4 UM;out vec2 v_uv;out vec2 v_textureUv;out vec3 v_glyphIndex;out vec4 v_glyphColor;out vec4 v_cellColor;out vec4 v_glyphFlags;out vec3 v_worldPosition;out vec3 v_normal;out float v_geometryType;const float A=6.28318530718f;const int B=2;const int C=3;const int D=4;const int E=5;const int F=6;const int G=7;const int H=8;const int I=9;const int J=10;
` + bs + `
vec2 K(float L,vec2 M,vec2 N,vec2 O,vec2 P){float Q=1.0f-L;float R=Q*Q;float S=R*Q;float T=L*L;float U=T*L;return S*M+3.0f*R*L*N+3.0f*Q*T*O+U*P;}vec2 V(float L,vec2 M,vec2 N,vec2 O,vec2 P){float Q=1.0f-L;float R=Q*Q;float T=L*L;return-3.0f*R*M+3.0f*(R-2.0f*Q*L)*N+3.0f*(2.0f*Q*L-T)*O+3.0f*T*P;}void main(){vec2 W=A1;vec2 X=A1;v_glyphIndex=A4;v_glyphColor=A5;v_cellColor=A6;v_glyphFlags=A7;vec4 Y=Aa;vec4 Z=Ab;vec2 a=A3;vec2 b=A2;float c=Ac.x;float d=Ac.y;int e=int(Ac.z);vec3 f=vec3(0.0f);if(e==D){float L=clamp(A0.x,0.0f,1.0f);vec2 M=Z.xy;vec2 N=Y.xy;vec2 O=Y.zw;vec2 P=Z.zw;vec2 g=K(L,M,N,O,P);vec2 h=V(L,M,N,O,P);float i=length(h);vec2 j=i>0.0f?h/i:vec2(1.0f,0.0f);vec2 k=vec2(-j.y,j.x);vec2 l=g+k*A0.y*a.y;f=vec3(l,d);}else if(e==C){float m=mod(Y.x,A);if(m<0.0f){m+=A;}float n=mod(Y.y,A);if(n<0.0f){n+=A;}float o=m-n;if(o<=0.0f){o+=A;}float p=m-A0.x*o;vec2 q=vec2(cos(p),sin(p))*A0.y;vec2 l=q*a+b;f=vec3(l,d);}else if(e==B){vec2 l=A0.xy*a+b;f=vec3(l,d);}else if(e==J){vec2 l=A0.xy*a+b;f=vec3(l,A1.x*c+d);}else if(e==G){float r=max(0.0f,a.x*0.5f);float s=max(0.0f,c*0.5f);float t=max(0.0f,a.y*0.5f);float u=max(0.0f,r-t);float v=max(0.0f,s-t);float w=A0.x;float x=A0.y;float y=A0.z;float z=A0.w;W=vec2(y,z);float AA=u+t*y;float AB=v+t*y;f=vec3(AA*w+b.x,t*z+b.y,AB*x+d);}else if(e==E||e==F||e==H||e==I){vec3 AC=A0.xyz;W=vec2(AC.z,0.0f);f=vec3(A0.x*a.x+b.x,A0.y*a.y+b.y,A0.z*c+d);}vec3 AD=applyRotation(f,A9);vec3 AE=AD+A8;vec3 AF=vec3(0.0f,0.0f,1.0f);v_uv=W;v_textureUv=X;v_worldPosition=AE;v_normal=AF;v_geometryType=float(e);vec4 AG=UM*UL*vec4(AE,1.0f);AG.y=-AG.y;gl_Position=AG;}`, Ms = `#version 300 es
in vec2 A0;in vec2 A1;in vec2 A2;in vec2 A3;in vec3 A4;in vec4 A5;in vec4 A6;in vec4 A7;in vec3 A8;in vec3 A9;in vec3 Ac;uniform mat4 UL;uniform mat4 UM;out vec2 v_uv;out vec2 v_textureUv;out vec3 v_glyphIndex;out vec4 v_glyphColor;out vec4 v_cellColor;out vec4 v_glyphFlags;out vec3 v_worldPosition;out vec3 v_normal;out float v_geometryType;const float A=2.0f;
` + bs + `
void main(){v_uv=A1;v_textureUv=A1;v_glyphIndex=A4;v_glyphColor=A5;v_cellColor=A6;v_glyphFlags=A7;vec2 B=A0.xy*A3+A2;float C=Ac.y;vec3 D=vec3(B,C);vec3 E=applyRotation(D,A9)+A8;v_worldPosition=E;v_normal=vec3(0.0f,0.0f,1.0f);v_geometryType=A;vec4 F=UM*UL*vec4(E,1.0f);F.y=-F.y;gl_Position=F;}`, Ht = "uniform bool u_tmUseLighting;uniform vec3 u_tmAmbientLightColor;uniform int u_tmPointLightCount;uniform vec3 u_tmPointLightPositions[5];uniform vec3 u_tmPointLightColors[5];uniform vec3 u_tmLightFalloff;const int TM_MAX_POINT_LIGHTS=5;vec3 tmComputeGeometricNormal(vec3 A){vec3 B=cross(dFdy(A),dFdx(A));float C=length(B);if(C<=0.000001f){return vec3(0.0f,0.0f,1.0f);}return B/C;}vec3 tmApplyLighting(vec3 D,vec3 A){if(!u_tmUseLighting){return D;}vec3 E=D*u_tmAmbientLightColor;if(u_tmPointLightCount>0){vec3 B=tmComputeGeometricNormal(A);for(int F=0;F<TM_MAX_POINT_LIGHTS;F++){if(F>=u_tmPointLightCount){break;}vec3 G=u_tmPointLightPositions[F]-A;float H=length(G);vec3 I=H>0.000001f?G/H:B;float J=max(dot(B,I),0.0f);float K=u_tmLightFalloff.x+H*u_tmLightFalloff.y+H*H*u_tmLightFalloff.z;float L=K>0.0f?1.0f/K:1.0f;E+=D*u_tmPointLightColors[F]*(J*L);}}return clamp(E,0.0f,1.0f);}", Ni = `#version 300 es
precision highp float;in vec3 v_glyphIndex;in vec4 v_glyphColor;in vec4 v_cellColor;in vec4 v_glyphFlags;in vec3 v_worldPosition;layout(location=0)out vec4 o_character;layout(location=1)out vec4 o_primaryColor;layout(location=2)out vec4 o_secondaryColor;layout(location=3)out vec4 o_statePayload;
` + Ht + `
void main(){int A=int(v_glyphFlags.r>0.5?1:0);int B=int(v_glyphFlags.g>0.5?1:0);int C=int(v_glyphFlags.b>0.5?1:0);float D=float(A|(B<<1)|(C<<2))/255.;o_character=vec4(v_glyphIndex.xy,D,clamp(v_glyphFlags.a,0.,1.));vec3 E=tmApplyLighting(v_glyphColor.rgb,v_worldPosition);vec3 F=tmApplyLighting(v_cellColor.rgb,v_worldPosition);o_primaryColor=vec4(E,v_glyphColor.a);o_secondaryColor=vec4(F,v_cellColor.a);o_statePayload=vec4(0.);}`, Oi = `#version 300 es
precision highp float;in vec2 v_textureUv;in vec3 v_worldPosition;uniform sampler2D U1;uniform bool U2;uniform bool U3;uniform bool U4;uniform float U5;uniform float U6;uniform float U7;uniform bool U8;uniform vec4 U9;uniform bool Ua;uniform vec4 Ub;uniform int Uc;uniform sampler2D Ud;uniform ivec2 Ue;layout(location=0)out vec4 o_character;layout(location=1)out vec4 o_primaryColor;layout(location=2)out vec4 o_secondaryColor;layout(location=3)out vec4 o_statePayload;
` + Ht + `
float A(vec3 B){return dot(B,vec3(0.299f,0.587f,0.114f));}vec3 C(int D){int E=max(Ue.x,1);int F=D/E;int G=D%E;return texelFetch(Ud,ivec2(G,F),0).rgb;}void main(){vec2 H=vec2(v_textureUv.x,1.0f-v_textureUv.y);vec4 I=texture(U1,H);if(U2){I.rgb=vec3(1.0f)-I.rgb;}float J=A(I.rgb);if(I.a<0.01f||J<U6||J>U7){discard;}vec2 K=vec2(0.0f);if(Uc>0){float L=float(Uc);float M=clamp(J*(L-1.0f),0.0f,L-1.0f);int N=int(floor(M+0.5f));K=C(N).xy;}vec4 O=U8?U9:I;vec4 P=Ua?Ub:I;vec3 Q=tmApplyLighting(O.rgb,v_worldPosition);vec3 R=tmApplyLighting(P.rgb,v_worldPosition);int S=int(U2?1:0);int T=int(U3?1:0);int U=int(U4?1:0);float V=float(S|(T<<1)|(U<<2))/255.0f;o_character=vec4(K,V,clamp(U5,0.0f,1.0f));o_primaryColor=vec4(Q,O.a);o_secondaryColor=vec4(R,P.a);o_statePayload=vec4(0.0f);}`, ze = `#version 300 es
precision highp float;in vec2 v_textureUv;in vec3 v_worldPosition;uniform sampler2D Uf;uniform sampler2D Ug;uniform sampler2D Uh;uniform sampler2D Ui;uniform vec2 Uj;uniform bool Uk;uniform bool Ul;uniform bool Um;layout(location=0)out vec4 o_character;layout(location=1)out vec4 o_primaryColor;layout(location=2)out vec4 o_secondaryColor;layout(location=3)out vec4 o_statePayload;
` + Ht + `
void main(){vec2 A=vec2(v_textureUv.x,1.-v_textureUv.y);vec2 B=A*Uj;vec2 C=(floor(B)+0.5f)/Uj;vec4 D=texture(Uf,C);vec4 E=Uk?texture(Ug,C):vec4(0.);if(Uk&&E.a==0.){discard;}vec4 F=Ul?texture(Uh,C):vec4(0.);vec4 G=Um?texture(Ui,C):vec4(0.);vec3 H=tmApplyLighting(E.rgb,v_worldPosition);vec3 I=tmApplyLighting(F.rgb,v_worldPosition);o_character=D;o_primaryColor=vec4(H,E.a);o_secondaryColor=vec4(I,F.a);o_statePayload=G;}`;
class Ii {
  constructor(t) {
    o(this, "To", 0);
    o(this, "oe");
    o(this, "Po");
    o(this, "Lo");
    o(this, "Ke");
    o(this, "Do");
    this.oe = new rt(t, Bt, Ni), this.Po = new rt(t, Bt, Oi), this.Lo = new rt(t, Bt, ze), this.Ke = new rt(t, Ms, ze), this.Do = { id: this.To++, shader: this.oe, uniforms: Object.freeze({}), isBuiltIn: !0 };
  }
  We(t, e = {}) {
    return { id: this.To++, shader: t, uniforms: Object.freeze({ ...e }), isBuiltIn: !1 };
  }
  ko(t) {
    return this.We(this.Po, t);
  }
  Ro(t) {
    return this.We(this.Lo, t);
  }
  L() {
    this.oe.dispose(), this.Po.dispose(), this.Lo.dispose(), this.Ke.dispose();
  }
}
class Bi {
  constructor() {
    o(this, "Oo", []);
    o(this, "Bo", 1);
    o(this, "Io", 0);
  }
  No(t, e) {
    if (this.Io >= this.Oo.length) {
      const r = { id: this.Bo++, type: t, params: {}, state: wt.Kn(), material: e };
      this.Oo.push(r);
    }
    const s = this.Oo[this.Io];
    return s.id = this.Bo++, s.type = t, s.material = e, this.Io++, s;
  }
  jo(t, e) {
    var r;
    if (t.data && t.data.length >= e) return;
    let s = Math.max(k.FLOATS_PER_INSTANCE, ((r = t.data) == null ? void 0 : r.length) ?? 0);
    for (; s < e; ) s *= 2;
    t.data = new Float32Array(s);
  }
  Qo(t, e) {
    var r;
    if (t.vertices && t.vertices.length >= e) return;
    let s = Math.max(24, ((r = t.vertices) == null ? void 0 : r.length) ?? 0);
    for (; s < e; ) s *= 2;
    t.vertices = new Float32Array(s);
  }
  zo(t, e, s, r) {
    const n = this.No(C.RECTANGLE, r), h = n.params;
    return h.width = t, h.height = e, s.Wn(n.state), n.id;
  }
  Ho(t, e, s, r, n, h) {
    const a = this.No(C.LINE, h), c = a.params;
    return c.x1 = t, c.y1 = e, c.x2 = s, c.y2 = r, n.Wn(a.state), a.id;
  }
  Go(t, e, s, r) {
    const n = this.No(C.ELLIPSE, r), h = n.params;
    return h.width = t, h.height = e, s.Wn(n.state), n.id;
  }
  Vo(t, e, s, r, n, h) {
    const a = this.No(C.ARC, h), c = a.params;
    return c.width = t, c.height = e, c.start = s, c.stop = r, n.Wn(a.state), a.id;
  }
  Xo(t, e, s, r, n, h, a, c, u, l) {
    const f = this.No(C.BEZIER_CURVE, l), d = f.params;
    return d.x1 = t, d.y1 = e, d.cp1x = s, d.cp1y = r, d.cp2x = n, d.cp2y = h, d.x2 = a, d.y2 = c, u.Wn(f.state), f.id;
  }
  Yo(t, e, s, r, n, h) {
    const a = this.No(t, h), c = a.params;
    return c.width = e, c.height = s, c.depth = r, n.Wn(a.state), a.id;
  }
  Ko(t, e, s, r) {
    const n = this.No(fe, r), h = n.params, a = e * k.FLOATS_PER_INSTANCE;
    this.jo(h, a);
    for (let c = 0; c < a; c++) h.data[c] = t[c];
    return h.instanceCount = e, s.Wn(n.state), n.id;
  }
  Wo(t, e, s, r) {
    if (e === 0) return 0;
    const n = this.No(vs, r), h = n.params, a = 4 * e;
    this.Qo(h, a);
    for (let c = 0; c < a; c++) h.vertices[c] = t[c];
    return h.vertexCount = e, s.Wn(n.state), n.id;
  }
  Oh() {
    this.Io = 0;
  }
  [Symbol.iterator]() {
    let t = 0;
    const e = this.Io, s = this.Oo;
    return { next: () => t < e ? { value: s[t++], done: !1 } : { value: void 0, done: !0 } };
  }
}
class ki {
  constructor(t, e = 64) {
    o(this, "Zo", /* @__PURE__ */ new Map());
    o(this, "$o", /* @__PURE__ */ new WeakMap());
    o(this, "ph");
    o(this, "qo", 0);
    o(this, "Jo", 1);
    this.Fe = t, this.ph = Math.max(1, e);
  }
  resolve(t, e = null) {
    const s = this.ta(), r = Math.min(s * s, 65535);
    if (t.length > r) throw new _("[textmode.js] Character palette exceeds the supported GPU texture capacity.", { requestedCharacters: t.length, maxCharacters: r, maxTextureSize: s });
    const n = this.ia(t), h = `${e ? this.sa(e) : "none"}:${t.length}:${this.ea(n)}`, a = this.Zo.get(h);
    if (a && this.ra(a.data, n)) return a.lastUsed = ++this.qo, a;
    const c = this.W(t, n, h);
    return this.Zo.set(h, c), this.na(), c;
  }
  dispose() {
    for (const t of this.Zo.values()) this.Fe.deleteTexture(t.texture);
    this.Zo.clear();
  }
  get size() {
    return this.Zo.size;
  }
  W(t, e, s) {
    const r = Math.max(t.length, 1), n = this.ta(), h = Math.min(n, Math.ceil(Math.sqrt(r))), a = Math.max(1, Math.ceil(r / h)), c = new Uint8Array(h * a * 4);
    c.set(e);
    const u = this.Fe.createTexture();
    if (!u) throw new _("[textmode.js] Failed to create character palette texture.");
    const l = this.Fe;
    return l.bindTexture(l.TEXTURE_2D, u), l.texParameteri(l.TEXTURE_2D, l.TEXTURE_MIN_FILTER, l.NEAREST), l.texParameteri(l.TEXTURE_2D, l.TEXTURE_MAG_FILTER, l.NEAREST), l.texParameteri(l.TEXTURE_2D, l.TEXTURE_WRAP_S, l.CLAMP_TO_EDGE), l.texParameteri(l.TEXTURE_2D, l.TEXTURE_WRAP_T, l.CLAMP_TO_EDGE), l.pixelStorei(l.UNPACK_FLIP_Y_WEBGL, 0), l.texImage2D(l.TEXTURE_2D, 0, l.RGBA8, h, a, 0, l.RGBA, l.UNSIGNED_BYTE, c), l.bindTexture(l.TEXTURE_2D, null), { texture: u, columns: h, rows: a, count: t.length, key: s, data: e, lastUsed: ++this.qo };
  }
  ia(t) {
    const e = new Uint8Array(4 * Math.max(t.length, 1));
    for (let s = 0; s < t.length; s++) {
      const r = t[s], n = 4 * s;
      e[n] = this.ha(r[0]), e[n + 1] = this.ha(r[1]), e[n + 2] = this.ha(r[2]), e[n + 3] = 255;
    }
    return e;
  }
  ha(t) {
    return Math.max(0, Math.min(255, Math.round(255 * t)));
  }
  ta() {
    return Math.max(1, Number(this.Fe.getParameter(this.Fe.MAX_TEXTURE_SIZE)) || 4096);
  }
  ea(t) {
    let e = 2166136261;
    for (let s = 0; s < t.length; s++) e ^= t[s], e = Math.imul(e, 16777619);
    return (e >>> 0).toString(16);
  }
  ra(t, e) {
    if (t.length !== e.length) return !1;
    for (let s = 0; s < t.length; s++) if (t[s] !== e[s]) return !1;
    return !0;
  }
  sa(t) {
    const e = t;
    return (e.id ?? e.oa ?? this.aa(t)) + "";
  }
  aa(t) {
    const e = this.$o.get(t);
    if (e) return e;
    const s = this.Jo++;
    return this.$o.set(t, s), s;
  }
  na() {
    for (; this.Zo.size > this.ph; ) {
      let t = null, e = 1 / 0;
      for (const [r, n] of this.Zo) n.lastUsed < e && (e = n.lastUsed, t = r);
      if (!t) return;
      const s = this.Zo.get(t);
      s && (this.Fe.deleteTexture(s.texture), this.Zo.delete(t));
    }
  }
}
class Xi {
  constructor(t) {
    o(this, "ca", /* @__PURE__ */ new Map());
    o(this, "ua", /* @__PURE__ */ new WeakMap());
    o(this, "la", 1);
    this.G = t;
  }
  materialFor(t) {
    t.kind === "source" && t.source.fa();
    const e = this.da(t), s = this.ca.get(e);
    if (s) return s;
    const r = t.kind === "source" ? this.G.materialManager.ko(this.G._a(t)) : this.G.materialManager.Ro(this.G.pa(t));
    return this.ca.set(e, r), r;
  }
  dispose() {
    this.ca.clear();
  }
  get size() {
    return this.ca.size;
  }
  da(t) {
    return t.kind === "source" ? ["source", this.ma(t.source.texture), this.ma(t.palette.texture), t.palette.count, t.palette.columns, t.palette.rows, t.brightnessStart, t.brightnessEnd, t.invert ? 1 : 0, t.flipX ? 1 : 0, t.flipY ? 1 : 0, t.charRotation, t.charColorMode, t.cellColorMode, ...t.charColor, ...t.cellColor].join("|") : ["framebuffer", this.aa(t.framebuffer), t.attachmentCount, t.width, t.height, ...t.textures.map((e) => this.ma(e))].join("|");
  }
  ma(t) {
    return this.aa(t);
  }
  aa(t) {
    const e = this.ua.get(t);
    if (e) return e;
    const s = this.la++;
    return this.ua.set(t, s), s;
  }
}
class zi {
  constructor(t) {
    o(this, "Fe");
    o(this, "lo", null);
    o(this, "ga");
    o(this, "va");
    o(this, "ya");
    o(this, "wa");
    o(this, "ba");
    o(this, "Ma");
    o(this, "Ca");
    o(this, "xa", null);
    o(this, "Sa", {});
    o(this, "Ea", []);
    o(this, "Fa", []);
    o(this, "Ta", []);
    o(this, "Pa", []);
    o(this, "La", null);
    o(this, "Da", [0, 0, 0, 0]);
    o(this, "ka", 1);
    o(this, "Ra", !0);
    o(this, "Oa", !0);
    o(this, "Ba", !1);
    o(this, "Ia", new Float32Array(4));
    o(this, "Na", new Float32Array(12));
    o(this, "ja", /* @__PURE__ */ new Set());
    this.Fe = t, t.enable(t.DEPTH_TEST), t.depthFunc(t.LEQUAL), t.clearDepth(1), t.depthMask(!0), this.Ra = !0, this.Oa = !0, t.disable(t.CULL_FACE), this.ba = new wt(), this.va = new Ii(t), this.ya = new ki(t), this.wa = new Xi(this), this.Ma = new Bi(), this.ga = new Gi(t), this.Ca = new di(t);
    const e = [0, 0, t.canvas.width, t.canvas.height];
    te(t, e), this.Fa.push(null), this.Ta.push(e), this.Pa.push(1), this.La = null, this.Da = e, this.ka = 1;
  }
  je() {
    this.Fa.push(this.La), this.Ta.push([...this.Da]), this.Pa.push(this.ka);
  }
  Ve() {
    const t = this.Fa.pop() ?? null, e = this.Ta.pop() ?? [0, 0, this.Fe.canvas.width, this.Fe.canvas.height], s = this.Pa.pop() ?? 1;
    this.Qe(t, e[2], e[3], s);
  }
  Qe(t, e, s, r = 1) {
    const n = this.Fe;
    this.La !== t && (n.bindFramebuffer(n.FRAMEBUFFER, t), this.La = t), this.ka = r;
    const h = [0, 0, e, s];
    this.Da[0] === h[0] && this.Da[1] === h[1] && this.Da[2] === h[2] && this.Da[3] === h[3] || (n.viewport(...h), te(n, h), this.Da = h);
  }
  oe(t) {
    this.lo !== t && (this.lo = t, t.hr());
  }
  Qa(t) {
    if (this.Ba = t, t) this.ja.clear();
    else {
      for (const e of this.ja) e.za();
      this.ja.clear();
    }
  }
  Ha() {
    return this.Ba;
  }
  Ga(t) {
    this.ja.add(t);
  }
  nr(t, e) {
    return new rt(this.Fe, t, e);
  }
  Va(t) {
    this.xa = t, t && (this.Sa = {});
  }
  Xa() {
    this.xa = null, this.Sa = {};
  }
  cr(t, e) {
    this.Sa[t] = e;
  }
  ae(t) {
    Object.assign(this.Sa, t);
  }
  Ya(t = !1) {
    this.Ea.push({ shader: this.xa, uniforms: { ...this.Sa } }), t && this.Xa();
  }
  Ka() {
    const t = this.Ea.pop();
    t && (this.xa = t.shader, this.Sa = t.shader ? { ...t.uniforms } : {});
  }
  Wa(t) {
    return new rt(this.Fe, Bt, t);
  }
  Za() {
    if (this.xa) return this.va.We(this.xa, this.Sa);
    const t = this.ba.Vn.current;
    return t.kind === "source" || t.kind === "framebuffer" ? this.wa.materialFor(t) : this.va.Do;
  }
  _a(t) {
    return t.source.fa(), { U1: t.source.texture, U2: t.invert, U3: t.flipX, U4: t.flipY, U5: t.charRotation, U6: t.brightnessStart, U7: t.brightnessEnd, U8: t.charColorMode === "fixed", U9: t.charColor, Ua: t.cellColorMode === "fixed", Ub: t.cellColor, Uc: t.palette.count, Ud: t.palette.texture, Ue: [t.palette.columns, t.palette.rows] };
  }
  pa(t) {
    const e = t.textures, s = t.attachmentCount > 1, r = t.attachmentCount > 2, n = t.attachmentCount > 3;
    return { Uf: e[0], Ug: s ? e[1] : e[0], Uh: r ? e[2] : e[0], Ui: n ? e[3] : e[0], Uj: [t.width, t.height], Uk: s, Ul: r, Um: n };
  }
  $a(t, e, s, r) {
    t instanceof gt || !r || t.qa(r);
    const n = t instanceof gt ? [t.Xe()] : t.Ja(), h = e ?? t.width, a = s ?? t.height;
    for (const c of n) this.Ma.zo(h, a, this.ba, c);
    t instanceof gt || !t.tc() || this.Ga(t);
  }
  ce(t, e, s, r) {
    this.Ca.rh(t, e, s, r);
  }
  sc(t, e) {
    this.Ma.zo(t, e, this.ba, this.Za());
  }
  Ko(t, e) {
    e !== 0 && this.Ma.Ko(t, e, this.ba, this.Za());
  }
  ec(t, e, s, r) {
    this.Ma.Ho(t, e, s, r, this.ba, this.Za());
  }
  rc(t, e) {
    this.Ma.Wo(t, e, this.ba, this.Za());
  }
  nc(t, e) {
    this.Ma.Go(t, e, this.ba, this.Za());
  }
  hc(t, e, s, r, n, h) {
    this.Na[0] = t, this.Na[1] = e, this.Na[2] = 0, this.Na[3] = 0, this.Na[4] = s, this.Na[5] = r, this.Na[6] = 0, this.Na[7] = 0, this.Na[8] = n, this.Na[9] = h, this.Na[10] = 0, this.Na[11] = 0, this.Ma.Wo(this.Na, 3, this.ba, this.Za());
  }
  oc(t, e, s, r, n, h, a, c) {
    this.Ma.Xo(t, e, s, r, n, h, a, c, this.ba, this.Za());
  }
  ac(t, e, s, r) {
    this.Ma.Vo(t, e, s, r, this.ba, this.Za());
  }
  cc(t, e, s) {
    this.Ma.Yo(C.BOX, t, e, s, this.ba, this.Za());
  }
  uc(t) {
    const e = 2 * t;
    this.Ma.Yo(C.SPHERE, e, e, e, this.ba, this.Za());
  }
  lc(t, e) {
    const s = 2 * (t + e);
    this.Ma.Yo(C.TORUS, s, 2 * e, s, this.ba, this.Za());
  }
  fc(t, e) {
    const s = 2 * t;
    this.Ma.Yo(C.CONE, s, e, s, this.ba, this.Za());
  }
  dc(t, e) {
    const s = 2 * t;
    this.Ma.Yo(C.CYLINDER, s, e, s, this.ba, this.Za());
  }
  _c(t, e, s) {
    this.Ma.Yo(C.ELLIPSOID, 2 * t, 2 * e, 2 * s, this.ba, this.Za());
  }
  Z(t, e, s = 1, r = {}) {
    return new gt(this.Fe, t, e, s, r, this);
  }
  mc(t, e = t, s = t, r = 255) {
    this.ba.yn.Dn(t, e ?? t, s ?? t, r);
    const [n, h, a, c] = this.ba.yn.Fs;
    this.gc(n, h, a, c);
  }
  Oh(t = 0, e = 0, s = 0, r = 0) {
    this.gc(t, e, s, r);
  }
  gc(t, e, s, r) {
    const n = this.Fe, h = this.Ia;
    if (this.ka > 1) {
      h[0] = 1, h[1] = 1, h[2] = 0, h[3] = 0, n.clearBufferfv(n.COLOR, 0, h), h[0] = 0, h[1] = 0, h[2] = 0, h[3] = 0, n.clearBufferfv(n.COLOR, 1, h), this.ka >= 3 && (h[0] = t, h[1] = e, h[2] = s, h[3] = r, n.clearBufferfv(n.COLOR, 2, h)), this.ka >= 3 && (h[0] = 0, h[1] = 0, h[2] = 0, h[3] = 0);
      for (let a = 3; a < this.ka; a++) n.clearBufferfv(n.COLOR, a, h);
    } else n.clearColor(t, e, s, r), n.clear(n.COLOR_BUFFER_BIT);
  }
  vc() {
    const t = [0, 0, this.Fe.canvas.width, this.Fe.canvas.height];
    this.Fe.viewport(...t), te(this.Fe, t), this.Da = t, this.Ta.length > 0 && (this.Ta[0] = t);
  }
  yc(t) {
    this.Ra !== t && (t ? this.Fe.enable(this.Fe.DEPTH_TEST) : this.Fe.disable(this.Fe.DEPTH_TEST), this.Ra = t);
  }
  wc(t) {
    this.Oa !== t && (this.Fe.depthMask(t), this.Oa = t);
  }
  bc() {
    return this.Ra;
  }
  Mc() {
    return this.Oa;
  }
  Ge() {
    const t = this.Ma;
    this.ga.bo(t), t.Oh(), this.lo = null;
  }
  L() {
    this.wa.dispose(), this.ya.dispose(), this.va.L(), this.ga.L(), this.Ca.L();
  }
  get context() {
    return this.Fe;
  }
  get state() {
    return this.ba;
  }
  get materialManager() {
    return this.va;
  }
  get glyphPaletteService() {
    return this.ya;
  }
}
class Yi {
  constructor(t = {}) {
    o(this, "p");
    o(this, "Cc", null);
    o(this, "xc", !1);
    o(this, "Sc");
    o(this, "Ec", null);
    o(this, "Fc", !0);
    o(this, "Fe", null);
    o(this, "Tc", null);
    o(this, "Pc", null);
    o(this, "Lc", !1);
    o(this, "Dc");
    if (this.xc = t.overlay ?? !1, this.Dc = t.pixelDensity ?? 1, t.gl) this.Ec = t.gl, this.p = t.gl.canvas, this.Sc = !1, this.Fc = !1;
    else if (this.xc && t.canvas) this.Cc = t.canvas, this.p = this.kc(), this.Sc = !0, this.Rc();
    else if (t.canvas) {
      if (typeof HTMLVideoElement < "u" && t.canvas instanceof HTMLVideoElement) throw new _("Video elements are only supported in overlay mode.");
      this.p = t.canvas, this.Sc = !1;
    } else this.p = this.Oc(t.width, t.height), this.Sc = !0;
    typeof HTMLCanvasElement < "u" && this.p instanceof HTMLCanvasElement && (this.p.style.imageRendering = "pixelated");
  }
  Oc(t, e) {
    const s = document.createElement("canvas");
    s.className = "textmodeCanvas", s.style.imageRendering = "pixelated";
    const r = t || 800, n = e || 600;
    return s.width = r * this.Dc, s.height = n * this.Dc, s.style.width = r + "px", s.style.height = n + "px", this.Bc(s), s;
  }
  Bc(t) {
    const e = () => {
      if (this.Lc || t.parentNode) return;
      const s = document.body;
      s && s.appendChild(t);
    };
    document.body ? e() : (this.Tc = () => {
      this.Tc = null, e();
    }, document.addEventListener("DOMContentLoaded", this.Tc, { once: !0 }));
  }
  kc() {
    const t = document.createElement("canvas");
    t.className = "textmodeCanvas", t.style.imageRendering = "pixelated";
    const e = this.Cc.getBoundingClientRect();
    let s = Math.round(e.width), r = Math.round(e.height);
    if (typeof HTMLVideoElement < "u" && this.Cc instanceof HTMLVideoElement) {
      const a = this.Cc;
      (s === 0 || r === 0) && a.videoWidth > 0 && a.videoHeight > 0 && (s = a.videoWidth, r = a.videoHeight);
    }
    t.width = s * this.Dc, t.height = r * this.Dc, t.style.width = s + "px", t.style.height = r + "px", t.style.position = "absolute";
    const n = window.getComputedStyle(this.Cc);
    let h = parseInt(n.zIndex || "0", 10);
    return isNaN(h) && (h = 0), t.style.zIndex = "" + (h + 1), t;
  }
  Rc() {
    var t;
    this.Ic(), this.Nc(), (t = this.Cc) != null && t.parentNode || document.readyState !== "loading" || (this.Pc = () => {
      this.Pc = null, this.Lc || (this.Ic(), this.Nc());
    }, document.addEventListener("DOMContentLoaded", this.Pc, { once: !0 }));
  }
  Nc() {
    var t;
    this.p instanceof HTMLCanvasElement && this.Cc && !this.p.parentNode && ((t = this.Cc.parentNode) == null || t.insertBefore(this.p, this.Cc.nextSibling));
  }
  Ic() {
    if (!this.Cc || !(this.p instanceof HTMLCanvasElement)) return;
    const t = this.Cc.getBoundingClientRect(), e = this.Cc.offsetParent;
    if (e && e !== document.body) {
      const s = e.getBoundingClientRect();
      this.p.style.top = t.top - s.top + "px", this.p.style.left = t.left - s.left + "px";
    } else this.p.style.top = t.top + window.scrollY + "px", this.p.style.left = t.left + window.scrollX + "px";
  }
  de(t, e) {
    if (this.xc) {
      const s = this.Cc.getBoundingClientRect(), r = Math.round(s.width), n = Math.round(s.height);
      this.p.width = r * this.Dc, this.p.height = n * this.Dc, this.p.style.width = r + "px", this.p.style.height = n + "px", this.Ic();
    } else {
      const s = t ?? Math.round(this.p.width / this.Dc), r = e ?? Math.round(this.p.height / this.Dc);
      this.p.width = s * this.Dc, this.p.height = r * this.Dc, this.p instanceof HTMLCanvasElement && (this.p.style.width = s + "px", this.p.style.height = r + "px");
    }
  }
  jc() {
    if (this.Ec) return this.Ec;
    const t = this.p.getContext("webgl2", { alpha: !0, premultipliedAlpha: !1, preserveDrawingBuffer: !0, antialias: !1, depth: !0, stencil: !1, powerPreference: "high-performance" });
    if (!t) throw new _("`textmode.js` requires WebGL2 support.");
    return this.Fe = t, t;
  }
  L() {
    if (this.Lc || (this.Lc = !0, this.Qc(), !this.Fc)) return;
    const t = this.Fe ?? this.Ec;
    if (t) {
      const e = t.getExtension("WEBGL_lose_context");
      e == null || e.loseContext();
    }
    this.Sc && typeof HTMLCanvasElement < "u" && this.p instanceof HTMLCanvasElement && this.p.parentNode && this.p.parentNode.removeChild(this.p);
  }
  Qc() {
    this.Tc && (document.removeEventListener("DOMContentLoaded", this.Tc), this.Tc = null), this.Pc && (document.removeEventListener("DOMContentLoaded", this.Pc), this.Pc = null);
  }
  get canvas() {
    return this.p;
  }
  get targetCanvas() {
    return this.Cc;
  }
  get width() {
    return this.p.width;
  }
  get height() {
    return this.p.height;
  }
  get ownsContext() {
    return this.Fc;
  }
  get pixelDensity() {
    return this.Dc;
  }
  zc(t) {
    t <= 0 || (this.Dc = t);
  }
}
function Gt(i) {
  return parseInt(i, 16);
}
const Zi = /^rgba?\(([^)]+)\)$/i;
function nt(i) {
  return Number.isNaN(i = Math.round(i)) ? 0 : X(i, 0, 255);
}
function Wi(i, t = !1) {
  if (!i) return null;
  const e = i.trim().toLowerCase();
  if (!e) return null;
  let s = null;
  return e.startsWith("rgb") && (s = (function(r) {
    const n = Zi.exec(r.trim());
    if (!n) return null;
    const h = n[1].split(",").map((f) => f.trim());
    if (h.length < 3) return null;
    const a = nt(parseFloat(h[0])), c = nt(parseFloat(h[1])), u = nt(parseFloat(h[2]));
    let l = 255;
    if (h[3] !== void 0) {
      const f = h[3].trim();
      let d = parseFloat(f);
      f.endsWith("%") && (d /= 100), l = 255 * X(d, 0, 1);
    }
    return [a, c, u, Math.round(l)];
  })(e)), s && (t || s[3] !== 0) ? s : null;
}
class S {
  constructor(t, e, s, r) {
    o(this, "Hc");
    o(this, "Gc");
    o(this, "r");
    o(this, "g");
    o(this, "b");
    o(this, "a");
    this.r = nt(t), this.g = nt(e), this.b = nt(s), this.a = nt(r);
  }
  static Vc(t, e, s, r) {
    if (t instanceof S) return t;
    if (Array.isArray(t)) {
      if (t.length < 3) throw Error("Component tuples must include at least RGB values.");
      const [n, h, a] = t, c = t.length === 4 ? t[3] : 255;
      return S.Xc(n, h, a, c);
    }
    if (typeof t == "string") {
      const n = t.trim();
      if (n.length === 0) throw Error("Color strings cannot be empty.");
      const h = Wi(n, !0);
      return h ? S.Xc(...h) : S.Yc(n);
    }
    if (typeof t == "number") return typeof e == "number" && typeof s == "number" ? S.Xc(t, e, s, r ?? 255) : typeof e == "number" ? S.Kc(t, e) : S.Kc(t, r ?? 255);
    throw Error("Unsupported color input passed.");
  }
  static Wc(t, e, s, r, n) {
    if (t instanceof S || typeof t == "string") return S.Vc(t);
    const [h, a, c, u] = ni(t, e, s, r, n);
    return S.Xc(h, a, c, u);
  }
  static Xc(t, e, s, r = 255) {
    return new S(t, e, s, r);
  }
  static Kc(t, e = 255) {
    return new S(t, t, t, e);
  }
  static Yc(t) {
    return new S(...(function(e) {
      const s = e.trim().replace(/^#|0x/gi, "");
      if (!/^[0-9A-Fa-f]+$/.test(s)) throw Error("Invalid hex color: " + e);
      const r = (n = s).length === 3 || n.length === 4 ? n.split("").map((h) => h + h).join("") : n;
      var n;
      if (r.length !== 6 && r.length !== 8) throw Error("Invalid hex color: " + e);
      return [Gt(r.slice(0, 2)), Gt(r.slice(2, 4)), Gt(r.slice(4, 6)), r.length === 8 ? Gt(r.slice(6, 8)) : 255];
    })(t));
  }
  static Zc(t, e, s, r) {
    return new S(Math.round(255 * t), Math.round(255 * e), Math.round(255 * s), Math.round(255 * r));
  }
  get rgb() {
    return [this.r, this.g, this.b];
  }
  get rgba() {
    return this.Hc || (this.Hc = [this.r, this.g, this.b, this.a]), [...this.Hc];
  }
  get normalized() {
    return this.Gc || (this.Gc = [this.r / 255, this.g / 255, this.b / 255, this.a / 255]), [...this.Gc];
  }
  withAlpha(t) {
    return new S(this.r, this.g, this.b, t);
  }
}
class ji {
  constructor(t, e, s) {
    o(this, "tu", "brightness");
    o(this, "iu", null);
    o(this, "su", null);
    o(this, "eu", null);
    this.$c = t, this.qc = e, this.Jc = s;
  }
  get conversionMode() {
    return this.tu;
  }
  setConversionMode(t, e) {
    e ? (this.iu = t, this.qc.disposeStack(this.eu), this.eu = null) : (this.tu = t, this.qc.disposeStack(this.su), this.su = null);
  }
  setConversions(t, e) {
    if (!Array.isArray(t)) throw new _("[textmode.js] conversions() expects an array of conversion steps.", { method: "conversions", providedValue: t });
    if (t.length === 0) return this.clearConversions(e), !1;
    const s = t.map((r, n) => this.ru(r, n));
    return e ? (this.iu = null, this.qc.disposeStack(this.eu), this.eu = s) : (this.qc.disposeStack(this.su), this.su = s), !0;
  }
  clearConversions(t) {
    t ? (this.iu = null, this.qc.disposeStack(this.eu), this.eu = []) : (this.qc.disposeStack(this.su), this.su = null);
  }
  clearFrameOverrides() {
    this.iu = null, this.qc.disposeStack(this.eu), this.eu = null;
  }
  getActiveStack() {
    return this.iu !== null ? null : this.eu !== null ? this.eu.length > 0 ? this.eu : null : this.su;
  }
  getSingleMode() {
    return this.iu ?? this.tu;
  }
  hasFrameOverrides() {
    return this.iu !== null || this.eu !== null;
  }
  invalidateMaterials() {
    var t, e;
    (t = this.su) == null || t.forEach((s) => {
      s.material = null;
    }), (e = this.eu) == null || e.forEach((s) => {
      s.material = null;
    });
  }
  refreshPalettes() {
    this.nu(this.su), this.nu(this.eu);
  }
  dispose() {
    this.qc.disposeStack(this.su), this.qc.disposeStack(this.eu), this.su = null, this.eu = null;
  }
  get debugSnapshot() {
    return { conversionMode: this.tu, conversionStack: this.su, frameConversionStack: this.eu };
  }
  ru(t, e) {
    if (!t || typeof t != "object") throw new _("[textmode.js] Conversion stack steps must be objects.", { method: "conversions", index: e, providedValue: t });
    if (typeof t.mode != "string" || t.mode.trim() === "") throw new _("[textmode.js] Conversion stack step mode must be a non-empty string.", { method: "conversions", index: e, providedValue: t.mode });
    const s = { mode: t.mode, options: this.hu(t.options, e), paletteTexture: null, paletteDirty: !1, material: null };
    if (t.characters !== void 0) {
      if (typeof t.characters != "string") throw new _("[textmode.js] Conversion stack step characters must be a string.", { method: "conversions", index: e, providedValue: t.characters });
      s.characters = t.characters, s.glyphColors = this.$c.getCharacterPalette(t.characters), s.paletteDirty = !0;
    }
    if (t.invert !== void 0 && (s.invert = t.invert ? 1 : 0), t.flipX !== void 0 && (s.flipX = t.flipX ? 1 : 0), t.flipY !== void 0 && (s.flipY = t.flipY ? 1 : 0), t.charRotation !== void 0 && (s.charRotation = Kt(t.charRotation)), t.brightnessStart !== void 0 || t.brightnessEnd !== void 0) {
      if (t.brightnessStart === void 0 || t.brightnessEnd === void 0) throw new _("[textmode.js] Conversion stack step brightnessStart and brightnessEnd must be provided together.", { method: "conversions", index: e, brightnessStart: t.brightnessStart, brightnessEnd: t.brightnessEnd });
      const [r, n] = this.ou(t.brightnessStart, t.brightnessEnd, "conversions", e);
      s.brightnessStart = r, s.brightnessEnd = n;
    }
    return t.charColorMode !== void 0 && (this.au(t.charColorMode, "charColorMode", e), s.charColorMode = t.charColorMode), t.cellColorMode !== void 0 && (this.au(t.cellColorMode, "cellColorMode", e), s.cellColorMode = t.cellColorMode), t.charColor !== void 0 && (s.charColor = this.Jc(t.charColor)), t.cellColor !== void 0 && (s.cellColor = this.Jc(t.cellColor)), s;
  }
  au(t, e, s) {
    if (t !== "sampled" && t !== "fixed") throw new _(`[textmode.js] Conversion stack step ${e} must be 'sampled' or 'fixed'.`, { method: "conversions", index: s, providedValue: t });
  }
  hu(t, e) {
    if (t === void 0) return {};
    if (t === null || typeof t != "object" || Array.isArray(t)) throw new _("[textmode.js] Conversion stack step options must be an object.", { method: "conversions", index: e, providedValue: t });
    return { ...t };
  }
  ou(t, e, s, r) {
    const n = { method: s, start: t, end: e };
    if (r !== void 0 && (n.index = r), !Number.isFinite(t) || !Number.isFinite(e)) throw new _("[textmode.js] brightness range values must be finite numbers.", n);
    if (t < 0 || t > 255 || e < 0 || e > 255) throw new _("[textmode.js] brightness range values must be between 0 and 255.", n);
    if (t > e) throw new _("[textmode.js] brightness range start must be less than or equal to end.", n);
    return [t / 255, e / 255];
  }
  nu(t) {
    if (t) for (const e of t) e.characters !== void 0 && (e.glyphColors = this.$c.getCharacterPalette(e.characters), e.paletteDirty = !0, e.material = null);
  }
}
class Vi {
  constructor(t) {
    o(this, "uu", null);
    o(this, "lu", null);
    o(this, "fu", !0);
    o(this, "du", !1);
    o(this, "_u", null);
    this.cu = t;
  }
  setActiveGlyphAtlas(t) {
    this._u = t, this.markBaseDirty(), this.markFrameDirty();
  }
  markBaseDirty() {
    this.fu = !0;
  }
  markFrameDirty() {
    this.du = !0;
  }
  clearFrame() {
    this.du = !1;
  }
  getBase(t) {
    return this.uu && !this.fu || (this.uu = this.W(t, this.uu), this.fu = !1), this.uu;
  }
  getFrame(t) {
    return this.lu && !this.du || (this.lu = this.W(t, this.lu), this.du = !1), this.lu;
  }
  getStep(t, e) {
    return t.paletteTexture && !t.paletteDirty || (t.paletteTexture = this.W(e, t.paletteTexture), t.paletteDirty = !1), t.paletteTexture;
  }
  disposeStep(t) {
    t.paletteTexture = null, t.material = null;
  }
  disposeStack(t) {
    if (t) for (const e of t) this.disposeStep(e);
  }
  disposeAll() {
    this.uu = null, this.lu = null;
  }
  get basePalette() {
    return this.uu;
  }
  get framePalette() {
    return this.lu;
  }
  W(t, e) {
    const s = this.cu.resolve(t, this._u);
    return (e == null ? void 0 : e.texture) === s.texture ? e : s;
  }
}
class Ki {
  constructor(t = S.Vc) {
    o(this, "_u", null);
    o(this, "wn", null);
    o(this, "_n", 0);
    o(this, "gn", 0);
    o(this, "vn", 0);
    o(this, "pn", 0);
    o(this, "pu", 0);
    o(this, "mu", 1);
    o(this, "gu", "sampled");
    o(this, "vu", "fixed");
    o(this, "bn", [1, 1, 1, 1]);
    o(this, "Mn", [0, 0, 0, 1]);
    o(this, "yu", [0, 0, 0, 1]);
    o(this, "wu", [[0.1, 0, 0]]);
    o(this, "bu", null);
    o(this, "Mu", null);
    o(this, "Au", null);
    o(this, "Cu", null);
    o(this, "xu", null);
    o(this, "Su", null);
    o(this, "Eu", null);
    o(this, "Fu", null);
    o(this, "Tu", null);
    o(this, "Pu", null);
    o(this, "Lu", null);
    o(this, "Du", null);
    this.Jc = t;
  }
  get activeGlyphAtlas() {
    return this._u;
  }
  setActiveGlyphAtlas(t, e) {
    return this._u !== t && (this._u = t, e.setActiveGlyphAtlas(t), this.wn && this.ku(this.wn, e), !0);
  }
  setInvert(t, e) {
    this.Ru("invert", t ? 1 : 0, e);
  }
  setFlipX(t, e) {
    this.Ru("flipX", t ? 1 : 0, e);
  }
  setFlipY(t, e) {
    this.Ru("flipY", t ? 1 : 0, e);
  }
  setCharRotation(t, e) {
    this.Ru("charRotation", Kt(t), e);
  }
  setBrightnessRange(t, e, s) {
    const r = t / 255, n = e / 255;
    s ? (this.xu = r, this.Su = n) : (this.pu = r, this.mu = n);
  }
  setCharColorMode(t, e) {
    e ? this.Eu = t : this.gu = t;
  }
  setCellColorMode(t, e) {
    e ? this.Fu = t : this.vu = t;
  }
  setColor(t, e, s, r, n, h) {
    const a = this.Ou(t, e), c = this.Jc(s, r, n, h);
    It(a, c.r, c.g, c.b, c.a);
  }
  setCharacters(t, e, s) {
    if (e) {
      const r = this.getCharacterPalette(t);
      return this.Du = r.length > 0 ? r : null, void (r.length > 0 && s.markFrameDirty());
    }
    this.wn = t, this.ku(t, s);
  }
  clearFrameOverrides(t) {
    this.bu = null, this.Mu = null, this.Au = null, this.Cu = null, this.xu = null, this.Su = null, this.Eu = null, this.Fu = null, this.Tu = null, this.Pu = null, this.Lu = null, this.Du = null, t.clearFrame();
  }
  hasFrameUniformOverrides() {
    return this.bu !== null || this.Mu !== null || this.Au !== null || this.Cu !== null || this.xu !== null || this.Su !== null || this.Eu !== null || this.Fu !== null || this.Tu !== null || this.Pu !== null || this.Lu !== null || this.Du !== null;
  }
  getCharacterPalette(t) {
    return this._u ? this._u.Qt(t).filter((e) => Array.isArray(e)) : [];
  }
  createBaseUniforms(t, e, s) {
    const r = (e == null ? void 0 : e.invert) ?? this.bu ?? this._n, n = (e == null ? void 0 : e.flipX) ?? this.Mu ?? this.gn, h = (e == null ? void 0 : e.flipY) ?? this.Au ?? this.vn, a = (e == null ? void 0 : e.charRotation) ?? this.Cu ?? this.pn, c = (e == null ? void 0 : e.brightnessStart) ?? this.xu ?? this.pu, u = (e == null ? void 0 : e.brightnessEnd) ?? this.Su ?? this.mu, l = (e == null ? void 0 : e.charColorMode) ?? this.Eu ?? this.gu, f = (e == null ? void 0 : e.cellColorMode) ?? this.Fu ?? this.vu, d = (e == null ? void 0 : e.charColor) ?? this.Tu ?? this.bn, p = (e == null ? void 0 : e.cellColor) ?? this.Pu ?? this.Mn, v = this.Lu ?? this.yu, w = (e == null ? void 0 : e.glyphColors) !== void 0, y = !w && this.Du !== null, g = w ? e.glyphColors : this.Du ?? this.wu, b = w ? s.getStep(e, g) : y ? s.getFrame(g) : s.getBase(g);
    return { u_image: t, u_invert: !!r, u_flipX: !!n, u_flipY: !!h, u_charRotation: a, Uy: c, Uz: u, u_charColorFixed: l === "fixed", u_charColor: d, u_cellColorFixed: f === "fixed", u_cellColor: p, u_backgroundColor: v, u_charCount: g.length, u_charPaletteTexture: b.texture, u_charPaletteDimensions: [b.columns, b.rows] };
  }
  createGeometryTextureSnapshot(t, e) {
    const s = this.bu ?? this._n, r = this.Mu ?? this.gn, n = this.Au ?? this.vn, h = this.Cu ?? this.pn, a = this.xu ?? this.pu, c = this.Su ?? this.mu, u = this.Eu ?? this.gu, l = this.Fu ?? this.vu, f = this.Tu ?? this.bn, d = this.Pu ?? this.Mn, p = this.Du ?? this.wu;
    return { kind: "source", source: t, palette: this.Du ? e.getFrame(p) : e.getBase(p), brightnessStart: a, brightnessEnd: c, invert: !!s, flipX: !!r, flipY: !!n, charRotation: h, charColorMode: u, cellColorMode: l, charColor: [f[0], f[1], f[2], f[3]], cellColor: [d[0], d[1], d[2], d[3]] };
  }
  get debugSnapshot() {
    return { invert: this._n, flipX: this.gn, flipY: this.vn, charRotation: this.pn, brightnessStart: this.pu, brightnessEnd: this.mu, charColorMode: this.gu, cellColorMode: this.vu, charColor: this.bn, cellColor: this.Mn, backgroundColor: this.yu, glyphColors: this.wu };
  }
  Ru(t, e, s) {
    t === "invert" ? s ? this.bu = e : this._n = e : t === "flipX" ? s ? this.Mu = e : this.gn = e : t === "flipY" ? s ? this.Au = e : this.vn = e : s ? this.Cu = e : this.pn = e;
  }
  Ou(t, e) {
    return e ? t === "char" ? (this.Tu ?? (this.Tu = [0, 0, 0, 1]), this.Tu) : t === "cell" ? (this.Pu ?? (this.Pu = [0, 0, 0, 1]), this.Pu) : (this.Lu ?? (this.Lu = [0, 0, 0, 1]), this.Lu) : t === "char" ? this.bn : t === "cell" ? this.Mn : this.yu;
  }
  ku(t, e) {
    const s = this.getCharacterPalette(t);
    s.length > 0 && (this.wu = s, e.markBaseDirty());
  }
}
class Hi {
  constructor(t) {
    o(this, "De", null);
    o(this, "Bu", null);
    o(this, "Iu", null);
    o(this, "Nu");
    this.Zt = t;
  }
  invalidateMaterials() {
    this.De = null, this.Zt.stackState.invalidateMaterials();
  }
  clearStrategyCache() {
    this.Bu = null;
  }
  getMaterial() {
    return this.hasFrameOverrides() ? this.ju() : (this.De || (this.De = this.ju()), this.De);
  }
  getMaterials() {
    const t = this.Zt.stackState.getActiveStack();
    if (!t) return [this.getMaterial()];
    this.Zt.beforeMaterialUpdate();
    const e = !this.Zt.conversionState.hasFrameUniformOverrides();
    return t.map((s, r) => this.Qu(s, r, t.length, e));
  }
  hasFrameOverrides() {
    return this.Zt.conversionState.hasFrameUniformOverrides() || this.Zt.stackState.hasFrameOverrides();
  }
  createBaseUniforms() {
    return this.Zt.conversionState.createBaseUniforms(this.Zt.getTexture(), this.Iu, this.Zt.paletteCache);
  }
  get material() {
    return this.De;
  }
  ju(t = this.Zt.stackState.getSingleMode(), e = null, s) {
    e || this.Zt.beforeMaterialUpdate();
    const r = this.Iu, n = this.Nu;
    this.Iu = e, this.Nu = s;
    try {
      const h = e ? this.zu(t) : this.Hu(), a = this.Gu(s), c = this.Zt.conversionManager.Vu(t, a), u = h.createUniforms(a);
      return this.Zt.renderer.materialManager.We(c, u);
    } finally {
      this.Iu = r, this.Nu = n;
    }
  }
  Qu(t, e, s, r) {
    if (r && t.material) return t.material;
    const n = { index: e, count: s, mode: t.mode, options: t.options }, h = this.ju(t.mode, t, n);
    return r && (t.material = h), h;
  }
  zu(t) {
    const e = this.Zt.conversionManager.Xu(t);
    if (!e) throw Error(`[textmode.js] Conversion mode "${t}" is not registered. If this mode is provided by an add-on, make sure its plugin is installed before loading sources.`);
    return e;
  }
  Hu() {
    const t = this.Zt.stackState.getSingleMode();
    if (this.Bu && this.Bu.id === t) return this.Bu;
    const e = this.zu(t);
    return this.Bu = e, e;
  }
  Gu(t) {
    const e = this.Zt.conversionState.activeGlyphAtlas;
    if (!e) throw Error("[textmode.js] Cannot create conversion context: no active glyph atlas set. Ensure _setActiveFont() is called before rendering.");
    const s = t ?? this.Nu, r = { renderer: this.Zt.renderer, gl: this.Zt.gl, font: e, glyphAtlas: e, source: this.Zt.source, createBaseUniforms: () => this.createBaseUniforms() };
    return s && (r.pass = s), r;
  }
}
class At extends Rt {
  constructor(e, s, r, n, h, a, c, u, l = S.Vc) {
    super();
    o(this, "Fe");
    o(this, "G");
    o(this, "Vn");
    o(this, "Yu");
    o(this, "Ku");
    o(this, "o");
    o(this, "u");
    o(this, "qc");
    o(this, "$c");
    o(this, "Wu");
    o(this, "Zu");
    this.Fe = e, this.G = s, this.Vn = r, this.Yu = h, this.Ku = a, this.$u(c, u), this.qc = new Vi(s.glyphPaletteService), this.$c = new Ki(l), this.Wu = new ji(this.$c, this.qc, (f) => l(f).normalized), this.Zu = new Hi({ gl: e, renderer: s, conversionManager: n, source: this, stackState: this.Wu, conversionState: this.$c, paletteCache: this.qc, getTexture: () => this.Vn, beforeMaterialUpdate: () => this.qu() });
  }
  conversionMode(e) {
    const s = this.Ba();
    return this.Wu.setConversionMode(e, s), s || (this.Zu.clearStrategyCache(), this.Zu.invalidateMaterials()), this;
  }
  conversions(e) {
    const s = this.Ba(), r = this.Wu.setConversions(e, s);
    return !s && r && this.Zu.invalidateMaterials(), this;
  }
  clearConversions() {
    const e = this.Ba();
    return this.Wu.clearConversions(e), e || this.Zu.invalidateMaterials(), this;
  }
  dispose() {
    this.Vn && (this.Fe.deleteTexture(this.Vn), this.Vn = null), this.Wu.dispose(), this.qc.disposeAll(), super.dispose();
  }
  invert(e = !0) {
    return this.$c.setInvert(e, this.Ba()), this.Ju(), this;
  }
  flipX(e = !0) {
    return this.$c.setFlipX(e, this.Ba()), this.Ju(), this;
  }
  flipY(e = !0) {
    return this.$c.setFlipY(e, this.Ba()), this.Ju(), this;
  }
  charRotation(e) {
    return this.$c.setCharRotation(e, this.Ba()), this.Ju(), this;
  }
  brightnessRange(e, s) {
    return this.tl(e, s), this.$c.setBrightnessRange(e, s, this.Ba()), this.Ju(), this;
  }
  charColorMode(e) {
    return this.$c.setCharColorMode(e, this.Ba()), this.Ju(), this;
  }
  cellColorMode(e) {
    return this.$c.setCellColorMode(e, this.Ba()), this.Ju(), this;
  }
  charColor(e, s, r, n) {
    return this.il("char", e, s, r, n), this;
  }
  cellColor(e, s, r, n) {
    return this.il("cell", e, s, r, n), this;
  }
  background(e, s, r, n) {
    return this.il("background", e, s, r, n), this;
  }
  characters(e) {
    return this.$c.setCharacters(e, this.Ba(), this.qc), this.Ju(), this;
  }
  qa(e) {
    this.$c.setActiveGlyphAtlas(e, this.qc) && (this.Wu.refreshPalettes(), this.Zu.invalidateMaterials());
  }
  get texture() {
    return this.Vn;
  }
  get width() {
    return this.o;
  }
  get height() {
    return this.u;
  }
  get originalWidth() {
    return this.Yu;
  }
  get originalHeight() {
    return this.Ku;
  }
  de(e, s) {
    this.$u(e, s), this.Zu.invalidateMaterials();
  }
  Xe() {
    return this.Zu.getMaterial();
  }
  Ja() {
    return this.Zu.getMaterials();
  }
  sl(e) {
    if (this.qa(e), this.Wu.getActiveStack()) throw new _("[textmode.js] texture() does not support conversion stacks. Call clearConversions() or draw the stacked source with image().", { method: "texture" });
    const s = this.Wu.getSingleMode();
    if (s !== "brightness") throw new _("[textmode.js] texture() supports the built-in brightness conversion mode only. Use image() for custom conversion modes.", { method: "texture", conversionMode: s });
    return this.$c.createGeometryTextureSnapshot(this, this.qc);
  }
  fa() {
  }
  za() {
    this.$c.clearFrameOverrides(this.qc), this.Wu.clearFrameOverrides();
  }
  tc() {
    return this.Zu.hasFrameOverrides();
  }
  qu() {
  }
  el() {
    this.Zu.invalidateMaterials();
  }
  rl() {
    return { sourceState: this.$c.debugSnapshot, stackState: this.Wu.debugSnapshot, material: this.Zu.material, basePalette: this.qc.basePalette, framePalette: this.qc.framePalette };
  }
  $u(e, s) {
    const { width: r, height: n } = (function(h, a, c, u) {
      const l = Math.min(c / h, u / a);
      return { width: Math.max(1, Math.min(c, Math.round(h * l))), height: Math.max(1, Math.min(u, Math.round(a * l))), scale: l };
    })(this.Yu, this.Ku, e, s);
    this.o = r, this.u = n;
  }
  il(e, s, r, n, h) {
    this.$c.setColor(e, this.Ba(), s, r, n, h), this.Ju();
  }
  Ju() {
    this.Ba() || this.Zu.invalidateMaterials();
  }
  Ba() {
    return this.G.Ha();
  }
  tl(e, s) {
    const r = { method: "brightnessRange", start: e, end: s };
    if (!Number.isFinite(e) || !Number.isFinite(s)) throw new _("[textmode.js] brightness range values must be finite numbers.", r);
    if (e < 0 || e > 255 || s < 0 || s > 255) throw new _("[textmode.js] brightness range values must be between 0 and 255.", r);
    if (e > s) throw new _("[textmode.js] brightness range start must be less than or equal to end.", r);
  }
}
class Pt extends At {
  constructor(t, e, s, r, n, h, a, c, u) {
    super(t, e, s, r, n, h, a, c, u);
  }
  static nl(t, e, s, r, n, h) {
    const a = t.context, { texture: c, width: u, height: l } = ye(a, s);
    return new Pt(a, t, c, e, u, l, r, n, h);
  }
}
class $i {
  constructor(t = 60) {
    o(this, "hl");
    o(this, "ol");
    o(this, "al", null);
    o(this, "cl", 0);
    o(this, "ul", null);
    o(this, "ll", null);
    o(this, "fl", !0);
    o(this, "dl", 0);
    o(this, "_l", 0);
    o(this, "pl", []);
    o(this, "ml", 10);
    o(this, "vl", 0);
    o(this, "yl", 0);
    o(this, "wl", -1);
    this.ol = t, this.hl = 1e3 / t;
  }
  bl(t, e) {
    if (this.ul = t, e !== void 0 && (this.ll = e), !this.Ml() || (this.wl === -1 && (this.wl = performance.now()), this.al !== null)) return;
    this.cl = performance.now();
    const s = (r) => {
      var a;
      if (!this.Ml()) return void (this.al = null);
      const n = typeof r == "number" ? r : performance.now(), h = n - this.cl;
      h >= this.hl && ((a = this.ul) == null || a.call(this), this.cl = n - h % this.hl), this.Ml() ? this.al = requestAnimationFrame(s) : this.al = null;
    };
    this.al = requestAnimationFrame(s);
  }
  Al() {
    this.al !== null && (cancelAnimationFrame(this.al), this.al = null);
  }
  Cl() {
    this.fl && (this.fl = !1, this.Ml() || this.Al());
  }
  xl(t) {
    this.fl || (this.fl = !0, this.bl(t));
  }
  Sl(t, e) {
    if (t === void 0) return this.dl;
    this.ol = t, this.hl = 1e3 / t, this.al !== null && e && (this.Al(), this.bl(e));
  }
  El() {
    const t = performance.now();
    if (this._l > 0) {
      const e = t - this._l;
      this.vl = e, this.pl.push(e), this.pl.length > this.ml && this.pl.shift();
      const s = this.pl.reduce((r, n) => r + n, 0) / this.pl.length;
      this.dl = 1e3 / s;
    }
    this._l = t;
  }
  Fl(t) {
    this.ol = t, this.hl = 1e3 / t;
  }
  Ml() {
    var t;
    return this.fl || ((t = this.ll) == null ? void 0 : t.call(this)) === !0;
  }
  Tl() {
    this.yl++;
  }
  get Pl() {
    return this.wl === -1 ? 0 : performance.now() - this.wl;
  }
  set Pl(t) {
    this.wl = performance.now() - t;
  }
  get Ll() {
    return this.Pl / 1e3;
  }
  set Ll(t) {
    this.Pl = 1e3 * t;
  }
}
function de(i, t, e) {
  return i ? i.P(t, e) : { x: -1 / 0, y: -1 / 0 };
}
class $t {
  constructor() {
    o(this, "Dl", []);
  }
  kl(t, e, s, r) {
    const n = s;
    r === void 0 ? t.addEventListener(e, n) : t.addEventListener(e, n, r), this.Dl.push({ target: t, type: e, listener: n, capture: typeof r == "boolean" ? r : r == null ? void 0 : r.capture });
  }
  Rl() {
    for (let t = this.Dl.length - 1; t >= 0; t -= 1) {
      const { target: e, type: s, listener: r, capture: n } = this.Dl[t];
      n === void 0 ? e.removeEventListener(s, r) : e.removeEventListener(s, r, n);
    }
    this.Dl = [];
  }
}
const we = ["keyPressed", "keyTyped", "keyReleased"], be = ["mouseClicked", "doubleClicked", "mousePressed", "mouseReleased", "mouseMoved", "mouseDragged", "mouseScrolled"], Me = ["touchStarted", "touchMoved", "touchEnded", "touchCancelled"], Ae = ["tap", "doubleTap", "longPress", "swipe", "pinch", "rotateGesture"], _e = ["gamepadConnected", "gamepadDisconnected", "gamepadButtonPressed", "gamepadButtonReleased", "gamepadAxisChanged"], qi = [...we, ...be, ...Me, ...Ae, ..._e];
class Qi {
  constructor() {
    o(this, "Dl", {});
  }
  Ol(t, e) {
    var n;
    const s = (n = this.Dl)[t] ?? (n[t] = []), r = { fn: e, once: !1 };
    return s.push(r), () => this.Bl(t, e);
  }
  Bl(t, e) {
    const s = this.Dl[t];
    if (!s) return;
    const r = s.findIndex((n) => n.fn === e);
    r !== -1 && s.splice(r, 1);
  }
  Il(t, e) {
    var n;
    const s = (n = this.Dl)[t] ?? (n[t] = []), r = { fn: e, once: !0 };
    return s.push(r), () => this.Bl(t, e);
  }
  Nl(t, ...e) {
    const s = this.Dl[t];
    if (!s || s.length === 0) return;
    const r = s.slice();
    for (const n of r) {
      if (n.once) {
        const h = s.indexOf(n);
        h !== -1 && s.splice(h, 1);
      }
      n.fn(...e);
    }
  }
  jl(t) {
    const e = this.Dl[t];
    return !!e && e.length > 0;
  }
  Rl(t) {
    t !== void 0 ? delete this.Dl[t] : this.Dl = {};
  }
}
class Ji {
  constructor(t, e, s) {
    o(this, "p");
    o(this, "Ql");
    o(this, "zl", { x: -1 / 0, y: -1 / 0 });
    o(this, "Hl", { x: -1 / 0, y: -1 / 0 });
    o(this, "Gl", { x: -1 / 0, y: -1 / 0 });
    o(this, "Vl", { x: -1 / 0, y: -1 / 0 });
    o(this, "Xl", { x: 0, y: 0 });
    o(this, "Yl", { x: 0, y: 0 });
    o(this, "Kl", !1);
    o(this, "Wl", null);
    o(this, "Zl", 0);
    o(this, "Dl", new $t());
    o(this, "$l", !1);
    o(this, "ql");
    this.p = t, this.Ql = e, this.ql = s;
  }
  Jl(t) {
    const e = performance.now() + Math.max(0, t);
    e > this.Zl && (this.Zl = e);
  }
  tf() {
    return performance.now() < this.Zl;
  }
  if(t) {
    const e = this.p.canvas;
    e.style.cursor = t == null || t === "" ? "" : t;
  }
  sf() {
    const t = this.p.canvas;
    return typeof t.requestPointerLock == "function" && (t.requestPointerLock(), !0);
  }
  ef() {
    this.rf() && typeof document.exitPointerLock == "function" && document.exitPointerLock();
  }
  nf() {
    if (this.$l) return;
    const t = this.p.canvas;
    this.Dl.kl(t, "mousemove", (e) => {
      this.hf(e), this.af(e);
    }, { passive: !0 }), this.Dl.kl(t, "mouseleave", () => {
      this.Hl = { ...this.zl }, this.zl.x = -1 / 0, this.zl.y = -1 / 0, this.Wl = null;
    }, { passive: !0 }), this.Dl.kl(t, "mousedown", (e) => {
      this.hf(e), this.cf(e);
    }, { passive: !0 }), this.Dl.kl(t, "mouseup", (e) => {
      this.hf(e), this.uf(e);
    }, { passive: !0 }), this.Dl.kl(t, "click", (e) => {
      this.hf(e), this.lf(e);
    }, { passive: !0 }), this.Dl.kl(t, "dblclick", (e) => {
      this.hf(e), this.ff(e);
    }, { passive: !0 }), this.Dl.kl(t, "wheel", (e) => {
      this.hf(e), this.df(e);
    }, { passive: !1 }), this.Dl.kl(window, "mouseup", () => {
      this.Kl = !1;
    }, { passive: !0 }), this.Dl.kl(window, "blur", () => {
      this.Kl = !1;
    }), this.$l = !0;
  }
  _f() {
    this.$l && (this.Dl.Rl(), this.$l = !1, this.ef(), this.Kl = !1, this.Xl = { x: 0, y: 0 }, this.Yl = { x: 0, y: 0 });
  }
  pf() {
    if (this.$l) try {
      if (this.Wl) {
        const t = new MouseEvent("mousemove", { clientX: this.Wl.x, clientY: this.Wl.y, bubbles: !1, cancelable: !1 });
        this.hf(t);
      }
    } catch {
      this.zl.x = -1 / 0, this.zl.y = -1 / 0;
    }
  }
  mf() {
    return { x: this.zl.x, y: this.zl.y };
  }
  gf() {
    return { x: this.Gl.x, y: this.Gl.y };
  }
  vf() {
    return this.Xl.x;
  }
  yf() {
    return this.Xl.y;
  }
  wf() {
    return this.Kl;
  }
  bf() {
    this.Gl = { ...this.Vl }, this.Vl = { ...this.zl }, this.Xl = { ...this.Yl }, this.Yl = { x: 0, y: 0 };
  }
  Mf(t, e = {}) {
    return { position: { ...this.zl }, previousPosition: { ...this.Hl }, originalEvent: t, ...e };
  }
  af(t) {
    this.tf() || (this.Af(t) ? this.ql.Nl("mouseDragged", this.Mf(t, { button: this.Cf(t) })) : this.ql.Nl("mouseMoved", this.Mf(t)));
  }
  cf(t) {
    this.tf() || (this.Kl = !0, this.ql.Nl("mousePressed", this.Mf(t, { button: t.button })));
  }
  uf(t) {
    this.tf() || (this.Kl = !1, this.ql.Nl("mouseReleased", this.Mf(t, { button: t.button })));
  }
  lf(t) {
    this.tf() || this.ql.Nl("mouseClicked", this.Mf(t, { button: t.button }));
  }
  ff(t) {
    this.tf() || this.ql.Nl("doubleClicked", this.Mf(t, { button: t.button }));
  }
  df(t) {
    this.tf() || this.ql.Nl("mouseScrolled", this.Mf(t, { delta: { x: t.deltaX, y: t.deltaY } }));
  }
  hf(t) {
    const e = this.Ql();
    if (this.Hl = { ...this.zl }, t instanceof MouseEvent && t.type === "mousemove" && this.xf(t), t instanceof MouseEvent && t.type === "mousemove" && this.rf()) return;
    this.Wl = { x: t.clientX, y: t.clientY };
    const s = de(e, t.clientX, t.clientY);
    this.zl.x = s.x, this.zl.y = s.y;
  }
  Af(t) {
    return t.buttons !== 0;
  }
  Cf(t) {
    return 1 & t.buttons ? 0 : 4 & t.buttons ? 1 : 2 & t.buttons ? 2 : 8 & t.buttons ? 3 : 16 & t.buttons ? 4 : void 0;
  }
  xf(t) {
    if (this.rf()) return this.Yl.x += t.movementX, void (this.Yl.y += t.movementY);
    this.Wl && (this.Yl.x += t.clientX - this.Wl.x, this.Yl.y += t.clientY - this.Wl.y);
  }
  rf() {
    return document.pointerLockElement === this.p.canvas;
  }
}
class tr {
  constructor(t) {
    o(this, "Sf", /* @__PURE__ */ new Map());
    o(this, "Ef", null);
    o(this, "Ff", null);
    o(this, "Dl", new $t());
    o(this, "$l", !1);
    o(this, "ql");
    o(this, "Tf", { ArrowUp: "UP_ARROW", ArrowDown: "DOWN_ARROW", ArrowLeft: "LEFT_ARROW", ArrowRight: "RIGHT_ARROW", F1: "F1", F2: "F2", F3: "F3", F4: "F4", F5: "F5", F6: "F6", F7: "F7", F8: "F8", F9: "F9", F10: "F10", F11: "F11", F12: "F12", Enter: "ENTER", Return: "RETURN", Tab: "TAB", Escape: "ESCAPE", Backspace: "BACKSPACE", Delete: "DELETE", Insert: "INSERT", Home: "HOME", End: "END", PageUp: "PAGE_UP", PageDown: "PAGE_DOWN", Shift: "SHIFT", Control: "CONTROL", Alt: "ALT", Meta: "META", " ": "SPACE" });
    this.ql = t;
  }
  nf() {
    this.$l || (this.Dl.kl(window, "keydown", (t) => {
      this.Pf(t);
    }, { passive: !1 }), this.Dl.kl(window, "keyup", (t) => {
      this.Lf(t);
    }, { passive: !1 }), this.$l = !0);
  }
  _f() {
    this.$l && (this.Dl.Rl(), this.$l = !1, this.Sf.clear(), this.Ef = null, this.Ff = null);
  }
  Df(t) {
    const e = this.kf(t), s = this.Sf.get(t) || this.Sf.get(e);
    return (s == null ? void 0 : s.isPressed) || !1;
  }
  Rf() {
    return this.Ef;
  }
  Of() {
    return this.Ff;
  }
  Bf() {
    const t = [];
    for (const [e, s] of this.Sf) s.isPressed && t.push(e);
    return t;
  }
  If() {
    return { ctrl: this.Df("Control"), shift: this.Df("Shift"), alt: this.Df("Alt"), meta: this.Df("Meta") };
  }
  Nf() {
    this.Sf.clear(), this.Ef = null, this.Ff = null;
  }
  Pf(t) {
    const e = t.key, s = Date.now();
    this.Sf.has(e) || this.Sf.set(e, { isPressed: !1, lastPressTime: 0, lastReleaseTime: 0 });
    const r = this.Sf.get(e);
    r.isPressed || (r.isPressed = !0, r.lastPressTime = s, this.Ef = e, this.ql.Nl("keyPressed", this.Mf(e, !0, t)), this.jf(t) && this.ql.Nl("keyTyped", this.Mf(e, !0, t)));
  }
  Mf(t, e, s) {
    return { key: t, keyCode: s.keyCode, ctrlKey: s.ctrlKey, shiftKey: s.shiftKey, altKey: s.altKey, metaKey: s.metaKey, isPressed: e, originalEvent: s };
  }
  Lf(t) {
    const e = t.key, s = Date.now();
    this.Sf.has(e) || this.Sf.set(e, { isPressed: !1, lastPressTime: 0, lastReleaseTime: 0 });
    const r = this.Sf.get(e);
    r.isPressed = !1, r.lastReleaseTime = s, this.Ff = e, this.ql.Nl("keyReleased", this.Mf(e, !1, t));
  }
  kf(t) {
    return this.Tf[t] || t.toLowerCase();
  }
  jf(t) {
    return !(t.ctrlKey || t.altKey || t.metaKey) && t.key !== "Dead" && Array.from(t.key).length === 1;
  }
}
class er {
  constructor(t, e) {
    o(this, "Qf");
    o(this, "zf");
    o(this, "Hf", /* @__PURE__ */ new Map());
    o(this, "Gf", null);
    o(this, "Vf", 320);
    o(this, "Xf", 350);
    o(this, "Yf", 10);
    o(this, "Kf", 550);
    o(this, "Wf", 14);
    o(this, "Zf", 48);
    o(this, "$f", 650);
    o(this, "qf", 0.02);
    o(this, "Jf", 2);
    o(this, "td", 0);
    o(this, "sd", null);
    this.Qf = t, this.zf = e;
  }
  Mh() {
    this.Hf.forEach((t) => {
      t.timer !== null && window.clearTimeout(t.timer);
    }), this.Hf.clear(), this.Gf = null, this.td = 0, this.sd = null;
  }
  ed(t, e) {
    const s = { timer: null, fired: !1 };
    s.timer = window.setTimeout(() => {
      this.Hf.has(t.id) && (s.fired = !0, this.zf.Nl("longPress", { touch: this.rd(t.lastPosition), duration: performance.now() - t.startTime, originalEvent: e }));
    }, this.Kf), this.Hf.set(t.id, s);
  }
  nd(t, e) {
    const s = this.Hf.get(t.id);
    !s || !e || _t(e.clientX, e.clientY, t.lastPosition.clientX, t.lastPosition.clientY) > this.Wf && s.timer !== null && (window.clearTimeout(s.timer), s.timer = null);
  }
  hd(t, e) {
    const s = this.Hf.get(t.id);
    s && s.timer !== null && (window.clearTimeout(s.timer), s.timer = null), this.od(t, e, (s == null ? void 0 : s.fired) ?? !1), this.Hf.delete(t.id);
  }
  ad(t) {
    const e = this.Hf.get(t);
    e && e.timer !== null && window.clearTimeout(e.timer), this.Hf.delete(t);
  }
  ud(t) {
    if (t.size !== 2) return void (this.Gf = null);
    const e = Array.from(t.values()), [s, r] = e, n = [s.id, r.id];
    if (this.Gf && this.Gf.ids[0] === n[0] && this.Gf.ids[1] === n[1]) return;
    const h = _t(s.x, s.y, r.x, r.y), a = Le(s.clientX, s.clientY, r.clientX, r.clientY);
    this.Gf = { ids: n, initialDistance: Math.max(h, 1e-4), initialAngle: a, lastScale: 1, lastRotation: 0 };
  }
  ld(t, e) {
    if (this.ud(t), !this.Gf) return;
    const [s, r] = this.Gf.ids, n = t.get(s), h = t.get(r);
    if (!n || !h) return;
    const a = _t(n.x, n.y, h.x, h.y) / this.Gf.initialDistance, c = a - this.Gf.lastScale;
    Math.abs(c) > this.qf && (this.zf.Nl("pinch", { touches: [this.rd(n), this.rd(h)], scale: a, deltaScale: c, center: this.fd(n, h), originalEvent: e }), this.Gf.lastScale = a);
    let u = Le(n.clientX, n.clientY, h.clientX, h.clientY) - this.Gf.initialAngle;
    u = (u + 180) % 360 - 180;
    const l = u - this.Gf.lastRotation;
    Math.abs(l) > this.Jf && (this.zf.Nl("rotateGesture", { touches: [this.rd(n), this.rd(h)], rotation: u, deltaRotation: l, center: this.fd(n, h), originalEvent: e }), this.Gf.lastRotation = u);
  }
  fd(t, e) {
    const s = (t.clientX + e.clientX) / 2, r = (t.clientY + e.clientY) / 2, n = this.Qf(s, r);
    return { x: n.x, y: n.y };
  }
  od(t, e, s) {
    const r = performance.now(), n = r - t.startTime, h = t.lastPosition.clientX - t.startPosition.clientX, a = t.lastPosition.clientY - t.startPosition.clientY, c = Math.hypot(h, a);
    if (!s && n <= this.Vf && c <= this.Yf)
      this.dd(t.lastPosition, r) ? this.zf.Nl("doubleTap", { touch: this.rd(t.lastPosition), taps: 2, originalEvent: e }) : this.zf.Nl("tap", { touch: this.rd(t.lastPosition), taps: 1, originalEvent: e });
    else if (!s && n <= this.$f && c >= this.Zf) {
      const u = Math.max(c, 1e-4), l = { x: h / u, y: a / u }, f = { x: h / n, y: a / n };
      this.zf.Nl("swipe", { touch: this.rd(t.lastPosition), direction: l, distance: u, velocity: f, originalEvent: e });
    }
    this.td = r, this.sd = this.rd(t.lastPosition);
  }
  dd(t, e) {
    return !this.sd || e - this.td > this.Xf ? !1 : _t(t.clientX, t.clientY, this.sd.clientX, this.sd.clientY) <= this.Yf;
  }
  rd(t) {
    return { ...t };
  }
}
class sr {
  constructor(t, e, s, r) {
    o(this, "p");
    o(this, "_d");
    o(this, "Ql");
    o(this, "pd");
    o(this, "md", /* @__PURE__ */ new Map());
    o(this, "gd", /* @__PURE__ */ new Map());
    o(this, "vd", /* @__PURE__ */ new Map());
    o(this, "yd");
    o(this, "wd");
    o(this, "Dl", new $t());
    o(this, "$l", !1);
    o(this, "ql");
    o(this, "bd", 600);
    this.p = t, this.Ql = e, this.ql = s, this._d = r, this.pd = new er((h, a) => de(this.Ql(), h, a), this.ql);
    const n = this.p.canvas;
    this.yd = n.style.touchAction, this.wd = n.style.userSelect, n.style.touchAction || (n.style.touchAction = "none"), n.style.userSelect || (n.style.userSelect = "none");
  }
  nf() {
    if (this.$l) return;
    const t = this.p.canvas;
    this.Dl.kl(t, "touchstart", (e) => {
      this.Md(e);
    }, { passive: !1 }), this.Dl.kl(t, "touchmove", (e) => {
      this.Ad(e);
    }, { passive: !1 }), this.Dl.kl(t, "touchend", (e) => {
      this.Cd(e);
    }, { passive: !1 }), this.Dl.kl(t, "touchcancel", (e) => {
      this.xd(e);
    }, { passive: !1 }), this.$l = !0;
  }
  _f() {
    if (!this.$l) return;
    const t = this.p.canvas;
    this.Dl.Rl(), this.$l = !1, this.md.clear(), this.gd.clear(), this.vd.clear(), this.pd.Mh(), t.style.touchAction = this.yd, t.style.userSelect = this.wd;
  }
  pf() {
    if (!this.Ql() || this.md.size === 0) return;
    const t = /* @__PURE__ */ new Map();
    for (const e of this.md.values()) {
      const s = this.Qf(e.clientX, e.clientY, e.id, e);
      t.set(e.id, s);
      const r = this.vd.get(e.id);
      r && (r.lastPosition = s);
    }
    this.md = t;
  }
  Sd() {
    return Array.from(this.md.values()).map((t) => ({ ...t }));
  }
  Md(t) {
    var r;
    if (!this.Ql()) return;
    t.preventDefault(), (r = this._d) == null || r.Jl(this.bd);
    const e = performance.now(), s = this.Ed(t.changedTouches);
    for (const n of s) {
      const h = this.md.get(n.id);
      h && this.gd.set(n.id, this.rd(h)), this.md.set(n.id, n);
      const a = { id: n.id, startPosition: n, lastPosition: n, startTime: e, lastTime: e };
      this.vd.set(n.id, a), this.pd.ed(a, t), this.ql.Nl("touchStarted", this.Fd(n, t, void 0, e));
    }
    this.pd.ud(this.md);
  }
  Ad(t) {
    var r;
    if (!this.Ql()) return;
    t.preventDefault(), (r = this._d) == null || r.Jl(this.bd);
    const e = performance.now(), s = this.Ed(t.changedTouches);
    for (const n of s) {
      const h = this.md.get(n.id), a = h ? this.rd(h) : void 0;
      a && this.gd.set(n.id, a), this.md.set(n.id, n);
      const c = this.vd.get(n.id);
      c && (c.lastPosition = n, c.lastTime = e, this.pd.nd(c, a)), this.ql.Nl("touchMoved", this.Fd(n, t, a, e));
    }
    this.pd.ld(this.md, t);
  }
  Cd(t) {
    if (!this.Ql()) return;
    t.preventDefault();
    const e = performance.now(), s = this.Ed(t.changedTouches);
    for (const r of s) {
      const n = this.md.get(r.id), h = n ? this.rd(n) : void 0, a = this.vd.get(r.id);
      this.ql.Nl("touchEnded", this.Fd(r, t, h, e)), a && this.pd.hd(a, t), this.vd.delete(r.id), this.gd.delete(r.id), this.md.delete(r.id);
    }
    this.pd.ud(this.md);
  }
  xd(t) {
    if (!this.Ql()) return;
    t.preventDefault();
    const e = performance.now(), s = this.Ed(t.changedTouches);
    for (const r of s) {
      const n = this.md.get(r.id), h = n ? this.rd(n) : void 0;
      this.ql.Nl("touchCancelled", this.Fd(r, t, h, e)), this.pd.ad(r.id), this.vd.delete(r.id), this.gd.delete(r.id), this.md.delete(r.id);
    }
    this.pd.ud(this.md);
  }
  Ed(t) {
    const e = [];
    for (let s = 0; s < t.length; s += 1) {
      const r = t.item(s);
      r && e.push(this.Td(r));
    }
    return e;
  }
  Td(t) {
    return this.Qf(t.clientX, t.clientY, t.identifier, { id: t.identifier, x: -1, y: -1, clientX: t.clientX, clientY: t.clientY, pressure: t.force, radiusX: t.radiusX, radiusY: t.radiusY, rotationAngle: t.rotationAngle });
  }
  Qf(t, e, s, r) {
    const n = de(this.Ql(), t, e);
    return { id: s, x: n.x, y: n.y, clientX: t, clientY: e, pressure: r.pressure, radiusX: r.radiusX, radiusY: r.radiusY, rotationAngle: r.rotationAngle };
  }
  Fd(t, e, s, r) {
    const n = this.vd.get(t.id), h = Array.from(this.gd.values()).map((u) => this.rd(u)), a = Array.from(this.md.values()).map((u) => this.rd(u)), c = this.Ed(e.changedTouches);
    return { touch: this.rd(t), previousTouch: s ? this.rd(s) : void 0, touches: a, previousTouches: h, changedTouches: c, deltaTime: n ? r - n.lastTime : 0, originalEvent: e };
  }
  rd(t) {
    return { ...t };
  }
}
const D = { south: 0, east: 1, west: 2, north: 3, l1: 4, r1: 5, l2: 6, r2: 7, select: 8, start: 9, leftStickPress: 10, rightStickPress: 11, dpadUp: 12, dpadDown: 13, dpadLeft: 14, dpadRight: 15, home: 16 }, Et = { leftStickX: 0, leftStickY: 1, rightStickX: 2, rightStickY: 3 }, ir = new Map(Object.entries(D).map(([i, t]) => [t, i])), rr = new Map(Object.entries(Et).map(([i, t]) => [t, i]));
function nr(i, t) {
  const e = Array.from(i.buttons, (h) => ({ pressed: !!h.pressed, touched: h.touched === void 0 ? void 0 : !!h.touched, value: h.value })), s = Array.from(i.axes, (h) => h), r = i.mapping === "standard" ? "standard" : "", n = { index: i.index, id: i.id, connected: !!i.connected, mapping: r, timestamp: i.timestamp, buttons: e, axes: s };
  return r === "standard" && (n.standard = (function(h, a, c) {
    const u = h[D.home];
    return { faceButtons: { south: N(h, D.south), east: N(h, D.east), west: N(h, D.west), north: N(h, D.north) }, shoulders: { l1: N(h, D.l1), r1: N(h, D.r1), l2: N(h, D.l2), r2: N(h, D.r2) }, center: { select: N(h, D.select), start: N(h, D.start), leftStickPress: N(h, D.leftStickPress), rightStickPress: N(h, D.rightStickPress), ...u ? { home: N(h, D.home) } : {} }, dpad: { up: N(h, D.dpadUp), down: N(h, D.dpadDown), left: N(h, D.dpadLeft), right: N(h, D.dpadRight) }, leftStick: Ye(a, Et.leftStickX, Et.leftStickY, c), rightStick: Ye(a, Et.rightStickX, Et.rightStickY, c) };
  })(e, s, t)), n;
}
function N(i, t) {
  return i[t] ?? { pressed: !1, value: 0 };
}
function Ye(i, t, e, s) {
  const r = i[t] ?? 0, n = i[e] ?? 0, h = Math.hypot(r, n);
  return h <= s ? { x: 0, y: 0, magnitude: 0 } : { x: r, y: n, magnitude: h };
}
const hr = { axisDeadzone: 0.15, axisChangeEpsilon: 0.01, buttonPressThreshold: 0.5, buttonReleaseThreshold: 0.45 };
class or {
  constructor(t, e = {}) {
    o(this, "Pd");
    o(this, "Ld", []);
    o(this, "Dd", /* @__PURE__ */ new Map());
    o(this, "kd", /* @__PURE__ */ new Map());
    o(this, "Dl", new $t());
    o(this, "$l", !1);
    o(this, "Rd", /* @__PURE__ */ new Set());
    o(this, "Od", /* @__PURE__ */ new Set());
    o(this, "ql");
    this.Pd = { ...hr, ...e }, this.ql = t;
  }
  nf() {
    this.$l || (this.Dl.kl(window, "gamepadconnected", (t) => {
      const e = t.gamepad;
      e && (this.Rd.add(e.index), this.Od.delete(e.index));
    }), this.Dl.kl(window, "gamepaddisconnected", (t) => {
      const e = t.gamepad;
      e && (this.Od.add(e.index), this.Rd.delete(e.index));
    }), this.$l = !0);
  }
  _f() {
    this.$l && (this.Dl.Rl(), this.$l = !1, this.Rd.clear(), this.Od.clear(), this.Ld = [], this.Dd.clear(), this.kd.clear());
  }
  bf() {
    const t = /* @__PURE__ */ new Map();
    for (const e of this.Bd()) {
      if (!e || !e.connected) continue;
      const s = nr(e, this.Pd.axisDeadzone);
      t.set(s.index, s);
    }
    for (const [e, s] of this.Dd) t.has(e) || this.ql.Nl("gamepadDisconnected", { gamepad: { ...s, connected: !1 } });
    for (const [e, s] of t) this.Dd.has(e) || this.ql.Nl("gamepadConnected", { gamepad: s });
    for (const [e, s] of t) {
      const r = this.Dd.get(e);
      r && (this.Id(s, r), this.Nd(s, r));
    }
    this.kd = this.Dd, this.Dd = t, this.Ld = Array.from(t.values()).sort((e, s) => e.index - s.index), this.Rd.clear(), this.Od.clear();
  }
  jd() {
    return this.Ld;
  }
  Qd(t) {
    return this.Dd.get(t);
  }
  zd(t, e) {
    if (e === "standard") return (function(s, r) {
      if (r === "standard") return ir.get(s);
    })(t, e);
  }
  Hd(t, e) {
    if (e === "standard") return (function(s, r) {
      if (r === "standard") return rr.get(s);
    })(t, e);
  }
  Id(t, e) {
    const s = Math.max(t.buttons.length, e.buttons.length);
    for (let r = 0; r < s; r++) {
      const n = t.buttons[r] ?? { pressed: !1, value: 0 }, h = e.buttons[r] ?? { pressed: !1, value: 0 }, a = h.value >= this.Pd.buttonPressThreshold;
      n.value >= this.Pd.buttonPressThreshold && !a && this.ql.Nl("gamepadButtonPressed", { gamepad: t, buttonIndex: r, button: n, previousButton: h, standardButtonName: this.zd(r, t.mapping) });
      const c = h.value >= this.Pd.buttonReleaseThreshold;
      !(n.value >= this.Pd.buttonReleaseThreshold) && c && this.ql.Nl("gamepadButtonReleased", { gamepad: t, buttonIndex: r, button: n, previousButton: h, standardButtonName: this.zd(r, t.mapping) });
    }
  }
  Nd(t, e) {
    const s = Math.max(t.axes.length, e.axes.length);
    for (let r = 0; r < s; r++) {
      const n = t.axes[r] ?? 0, h = e.axes[r] ?? 0, a = n - h;
      (Math.abs(h) <= this.Pd.axisDeadzone != Math.abs(n) <= this.Pd.axisDeadzone || Math.abs(a) >= this.Pd.axisChangeEpsilon) && this.ql.Nl("gamepadAxisChanged", { gamepad: t, axisIndex: r, value: n, previousValue: h, delta: a, standardAxisName: this.Hd(r, t.mapping) });
    }
  }
  Bd() {
    const t = navigator;
    if (typeof t.getGamepads != "function") return [];
    const e = t.getGamepads.call(navigator);
    return Array.from(e ?? []);
  }
}
class ar {
  constructor(t) {
    o(this, "Gd");
    o(this, "Vd", /* @__PURE__ */ new Map());
    o(this, "Xd", /* @__PURE__ */ new Map());
    o(this, "Yd", /* @__PURE__ */ new Map());
    o(this, "Kd", /* @__PURE__ */ new Map());
    o(this, "Wd", /* @__PURE__ */ new Map());
    o(this, "Zd", /* @__PURE__ */ new Map());
    o(this, "$d", /* @__PURE__ */ new Map());
    this.Gd = t;
  }
  qd(t, e) {
    return this.Jd(this.Vd, t, e);
  }
  t_(t, e) {
    return this.Jd(this.Xd, t, e);
  }
  i_(t, e) {
    return this.Jd(this.Yd, t, e);
  }
  s_(t, e) {
    return this.Jd(this.Kd, t, e);
  }
  e_(t, e) {
    return this.Jd(this.Wd, t, e);
  }
  r_(t, e) {
    return this.Jd(this.Zd, t, e);
  }
  n_(t, e) {
    return this.Jd(this.$d, t, e);
  }
  h_() {
    this.o_(this.Vd, (t) => t());
  }
  a_() {
    this.o_(this.Xd, (t) => t());
  }
  c_(t) {
    this.o_(this.Yd, (e) => e(t));
  }
  te(t) {
    this.o_(this.Kd, (e) => e(t));
  }
  he(t) {
    this.o_(this.Wd, (e) => e(t));
  }
  async u_() {
    await this.l_(this.Zd, (t) => t());
  }
  async f_() {
    await this.l_(this.$d, (t) => t());
  }
  d_(t) {
    this.Vd.delete(t), this.Xd.delete(t), this.Yd.delete(t), this.Kd.delete(t), this.Wd.delete(t), this.Zd.delete(t), this.$d.delete(t);
  }
  Jd(t, e, s) {
    const r = t.get(e) ?? /* @__PURE__ */ new Set();
    return r.add(s), t.set(e, r), () => {
      const n = t.get(e);
      n && (n.delete(s), n.size === 0 && t.delete(e));
    };
  }
  o_(t, e) {
    for (const s of this.Gd) {
      const r = t.get(s);
      r && r.forEach(e);
    }
  }
  async l_(t, e) {
    for (const s of this.Gd) {
      const r = t.get(s);
      if (r) for (const n of r) await e(n);
    }
  }
}
class Ze {
  constructor(t) {
    o(this, "__");
    o(this, "p_");
    o(this, "m_", /* @__PURE__ */ new Map());
    this.__ = t.targetName, this.p_ = t.getPrototype;
  }
  g_(t, e, s) {
    let r = this.m_.get(t);
    r || (r = /* @__PURE__ */ new Map(), this.m_.set(t, r));
    for (const [n, h] of this.m_) if (n !== t && h.has(e)) throw new _(`Plugin "${t}" attempted to register ${this.__} method "${e}" which is already provided by plugin "${n}".`, { plugin: t, method: e, conflictingPlugin: n });
    r.set(e, s), this.v_(e, s);
  }
  y_(t, e) {
    const s = this.m_.get(t);
    if (!s) return;
    s.delete(e);
    let r = !1;
    for (const [n, h] of this.m_) if (n !== t && h.has(e)) {
      r = !0;
      const a = h.get(e);
      this.v_(e, a);
      break;
    }
    r || this.w_(e), s.size === 0 && this.m_.delete(t);
  }
  b_(t) {
    const e = this.m_.get(t);
    if (e) {
      for (const s of e.keys()) this.w_(s);
      this.m_.delete(t);
    }
  }
  v_(t, e) {
    const s = this.p_();
    Object.defineProperty(s, t, { value: e, writable: !0, configurable: !0, enumerable: !1 });
  }
  w_(t) {
    const e = this.p_(), s = Object.getOwnPropertyDescriptor(e, t);
    s && s.configurable && delete e[t];
  }
}
class cr {
  constructor(t, e, s, r) {
    o(this, "_e");
    o(this, "M_");
    o(this, "A_");
    o(this, "C_");
    this._e = t, this.M_ = e, this.A_ = s, this.C_ = r;
  }
  x_(t) {
    const e = this._e, s = this.M_, r = this.A_, n = this.C_, h = { get canvas() {
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
    }, registerPreDrawHook: (a) => s.qd(t, a), registerPostDrawHook: (a) => s.t_(t, a), registerLayerDisposedHook: (a) => s.i_(t, a), registerLayerPreRenderHook: (a) => s.s_(t, a), registerLayerPostRenderHook: (a) => s.e_(t, a), registerPreSetupHook: (a) => s.r_(t, a), registerPostSetupHook: (a) => s.n_(t, a), extendLayer: (a, c) => {
      r.g_(t, a, c);
    }, removeLayerExtension: (a) => {
      r.y_(t, a);
    }, extendSource: (a, c) => {
      n.g_(t, a, c);
    }, removeSourceExtension: (a) => {
      n.y_(t, a);
    } };
  }
}
class lr {
  constructor() {
    o(this, "S_", /* @__PURE__ */ new Map());
    o(this, "Gd", []);
  }
  E_(t) {
    return this.S_.has(t);
  }
  Xu(t) {
    return this.S_.get(t);
  }
  kl(t) {
    this.S_.set(t.name, t), this.Gd.push(t.name);
  }
  F_(t) {
    this.S_.delete(t);
    const e = this.Gd.indexOf(t);
    e !== -1 && this.Gd.splice(e, 1);
  }
  U_() {
    return [...this.Gd];
  }
  T_() {
    return this.Gd;
  }
}
class ur {
  constructor(t) {
    o(this, "_e");
    o(this, "P_");
    o(this, "M_");
    o(this, "A_");
    o(this, "C_");
    o(this, "L_");
    this._e = t, this.P_ = new lr(), this.M_ = new ar(this.P_.T_()), this.A_ = new Ze({ targetName: "layer", getPrototype: () => Object.getPrototypeOf(this._e.layers.base) }), this.C_ = new Ze({ targetName: "source", getPrototype: () => At.prototype }), this.L_ = new cr(this._e, this.M_, this.A_, this.C_);
  }
  D_(t) {
    for (const e of t) {
      if (this.P_.E_(e.name)) {
        console.warn(`[textmode.js] Plugin "${e.name}" is already installed.`);
        continue;
      }
      const s = this.k_(e.name);
      try {
        const r = e.install(this._e, s);
        r instanceof Promise && r.catch((n) => {
          console.error(`[textmode.js] Async plugin "${e.name}" installation error:`, n), this.R_(e.name);
        });
      } catch (r) {
        throw this.R_(e.name), r;
      }
      this.P_.kl(e);
    }
  }
  async O_(t) {
    for (const e of t) {
      if (this.P_.E_(e.name)) {
        console.warn(`[textmode.js] Plugin "${e.name}" is already installed.`);
        continue;
      }
      const s = this.k_(e.name);
      try {
        await e.install(this._e, s);
      } catch (r) {
        throw this.R_(e.name), r;
      }
      this.P_.kl(e);
    }
  }
  async B_(t) {
    const e = this.P_.Xu(t);
    if (!e) return;
    const s = this.k_(t);
    e.uninstall && await e.uninstall(this._e, s), this.P_.F_(t), this.R_(t);
  }
  h_() {
    this.M_.h_();
  }
  a_() {
    this.M_.a_();
  }
  c_(t) {
    this.M_.c_(t);
  }
  te(t) {
    this.M_.te(t);
  }
  he(t) {
    this.M_.he(t);
  }
  async u_() {
    await this.M_.u_();
  }
  async f_() {
    await this.M_.f_();
  }
  async I_() {
    const t = this.P_.U_();
    for (const e of t) await this.B_(e);
  }
  k_(t) {
    return this.L_.x_(t);
  }
  R_(t) {
    this.M_.d_(t), this.A_.b_(t), this.C_.b_(t);
  }
}
const yt = `#version 300 es
layout(location=0)in vec2 A0;layout(location=1)in vec2 A1;out vec2 v_uv;void main(){v_uv=A1;gl_Position=vec4(A0,0.,1.);}`, As = `#version 300 es
precision highp float;uniform sampler2D u_texture;in vec2 v_uv;out vec4 fragColor;void main(){fragColor=texture(u_texture,v_uv);}`, fr = ({ textmodifier: i }) => {
  const t = "|/-\\", e = Math.floor(i.millis / 120) % 4;
  i.background("#222323"), i.charColor("#F8F8F8"), i.cellColor("#222323"), mt(i, t[e], 0), i.charColor("#C0C0C0"), mt(i, "LOADING...", 5);
}, dr = { transition: "fade", transitionDuration: 500 };
class _s extends ns {
  constructor(e, s) {
    super(e);
    o(this, "Zt");
    o(this, "ye", "active");
    o(this, "N_", 0);
    o(this, "j_");
    this.Zt = { ...dr, ...s ?? {} }, this.Zt.transition === "none" && (this.Zt.transitionDuration = 0);
  }
  async kt() {
    this.Pt || (await super.kt(), this.pe.opacity(1), this.pe.show());
  }
  get Ae() {
    return this.ye === "active" || this.ye === "transitioning";
  }
  Q_() {
    this.Zt.transitionDuration > 0 ? (this.z_(), this.N_ = performance.now(), this.Pt && (this.pe.opacity(1), this.pe.show())) : (this.Pt && (this.pe.opacity(0), this.pe.hide()), this.H_(), this.G_());
  }
  V_(e) {
    this.j_ = e;
  }
  Se() {
    if (this.ye === "transitioning" && this.X_())
      return this.Y_(), void this.G_();
    this.Ee();
  }
  me() {
    return new K(this._e.G, { visible: !0, opacity: 1, fontSize: 16 });
  }
  G_() {
    this.j_ && this.j_();
  }
  X_() {
    if (!this.Pt) return !0;
    const e = this.Zt.transitionDuration;
    if (e <= 0) return this.pe.opacity(0), this.pe.hide(), !0;
    const s = performance.now() - this.N_, r = Math.min(1, s / e);
    return this.pe.opacity(1 - r), r >= 1 && (this.pe.hide(), !0);
  }
  Ee() {
    if (!this.Pt) return;
    const e = { textmodifier: this._e, grid: this.pe.grid };
    this.ge(fr, e);
  }
  H_() {
    this.ye !== "disabled" && (this.ye = "done");
  }
  z_() {
    this.ye !== "disabled" && (this.ye = "transitioning");
  }
  Y_() {
    this.ye === "transitioning" && (this.ye = "done");
  }
}
const Ir = Object.freeze(Object.defineProperty({ __proto__: null, LoadingLayerController: _s }, Symbol.toStringTag, { value: "Module" }));
class pr {
  constructor(t, e, s) {
    o(this, "G");
    o(this, "K_");
    o(this, "Rs");
    o(this, "W_", 0);
    this.G = t, this.K_ = t.nr(yt, `#version 300 es
precision highp float;uniform sampler2D UA;uniform sampler2D UB;uniform vec2 UC;uniform vec2 UD;uniform vec2 UE;uniform float UF;uniform float UG;uniform int UH;uniform bool UI;uniform vec4 UJ;in vec2 v_uv;out vec4 fragColor;const int A=0;const int B=1;const int C=2;const int D=3;const int E=4;const int F=5;const int G=6;const int H=7;const int I=8;const int J=9;const int K=10;const int L=11;const int M=12;const int N=13;vec3 O(vec3 P,vec3 Q){return Q;}vec3 R(vec3 P,vec3 Q){return P+Q;}vec3 S(vec3 P,vec3 Q){return P*Q;}vec3 T(vec3 P,vec3 Q){return 1.-(1.-P)*(1.-Q);}vec3 U(vec3 P,vec3 Q){return max(P-Q,0.);}vec3 V(vec3 P,vec3 Q){return min(P,Q);}vec3 W(vec3 P,vec3 Q){return max(P,Q);}vec3 X(vec3 P,vec3 Q){return mix(2.*P*Q,1.-2.*(1.-P)*(1.-Q),step(0.5,P));}vec3 Y(vec3 P,vec3 Q){return mix(P-(1.-2.*Q)*P*(1.-P),mix(P+(2.*Q-1.)*(P*(3.-2.*P)-P),P+(2.*Q-1.)*(sqrt(P)-P),step(0.25,P)),step(0.5,Q));}vec3 Z(vec3 P,vec3 Q){return mix(2.*P*Q,1.-2.*(1.-P)*(1.-Q),step(0.5,Q));}vec3 a(vec3 P,vec3 Q){return mix(min(vec3(1.),P/max(1.-Q,0.0001)),vec3(1.),step(1.,Q));}vec3 b(vec3 P,vec3 Q){return mix(1.-min(vec3(1.),(1.-P)/max(Q,0.0001)),vec3(0.),step(Q,vec3(0.)));}vec3 c(vec3 P,vec3 Q){return abs(P-Q);}vec3 d(vec3 P,vec3 Q){return P+Q-2.*P*Q;}vec3 e(int f,vec3 P,vec3 Q){if(f==A)return O(P,Q);if(f==B)return R(P,Q);if(f==C)return S(P,Q);if(f==D)return T(P,Q);if(f==E)return U(P,Q);if(f==F)return V(P,Q);if(f==G)return W(P,Q);if(f==H)return X(P,Q);if(f==I)return Y(P,Q);if(f==J)return Z(P,Q);if(f==K)return a(P,Q);if(f==L)return b(P,Q);if(f==M)return c(P,Q);if(f==N)return d(P,Q);return O(P,Q);}void main(){vec4 g=texture(UB,v_uv);vec2 h=v_uv*UC;vec2 i=h-UE;vec2 j=UD*0.5;vec2 k=i-j;float l=cos(-UG);float m=sin(-UG);vec2 n=vec2(k.x*l-k.y*m,k.x*m+k.y*l);i=n+j;bool o=any(lessThan(i,vec2(0.)))||any(greaterThanEqual(i,UD));vec4 p;if(o){if(!UI){fragColor=g;return;}p=UJ;}else{vec2 q=(floor(i)+0.5)/UD;p=texture(UA,q);}float r=p.a*UF;if(r<=0.){fragColor=g;return;}vec3 s=e(UH,g.rgb,p.rgb);vec3 t=mix(g.rgb,s,r);float u=g.a+r*(1.-g.a);fragColor=vec4(t,u);}`), this.Rs = [this.G.Z(e, s, 1, { depth: !1 }), this.G.Z(e, s, 1, { depth: !1 })];
  }
  Z_(t) {
    const { base: e, targetFramebuffer: s, backgroundColor: r, layers: n, canvasWidth: h, canvasHeight: a } = t, c = this.G.bc(), u = this.G.Mc();
    this.G.yc(!1), this.G.wc(!1);
    const l = this.Rs[0];
    l.begin(), this.G.Oh(...r), l.end(), this.W_ = 0, e.layer.Ms && this.q_(e.texture, h, a, e.width, e.height, e.layer.As, e.offsetX, e.offsetY, e.layer.Ss, L.NORMAL, e.canvasBackgroundColor);
    for (const f of n) {
      const d = f.layer;
      d.Ms && this.q_(f.texture, h, a, f.width, f.height, d.As, f.offsetX, f.offsetY, d.Ss, d.Cs, f.canvasBackgroundColor);
    }
    this.J_(s, h, a), this.G.wc(u), this.G.yc(c);
  }
  q_(t, e, s, r, n, h, a, c, u, l, f) {
    const d = this.Rs[this.W_], p = this.W_ === 0 ? 1 : 0, v = this.Rs[p], w = V(u);
    v.begin(), this.G.oe(this.K_), this.K_.ae({ UA: t, UB: d.textures[0], UC: [e, s], UD: [r, n], UE: [a, c], UF: h, UG: w, UH: l, UI: f !== void 0, UJ: f ?? [0, 0, 0, 0] }), this.G.ce(0, 0, d.width, d.height), v.end(), this.W_ = p;
  }
  J_(t, e, s) {
    const r = this.Rs[this.W_];
    t.begin(), this.G.oe(this.K_), this.K_.ae({ UA: r.textures[0], UB: r.textures[0], UC: [e, s], UD: [r.width, r.height], UE: [0, 0], UF: 1, UG: 0, UH: L.NORMAL, UI: !1, UJ: [0, 0, 0, 0] }), this.G.ce(0, 0, e, s), t.end();
  }
  de(t, e) {
    this.Rs[0].resize(t, e), this.Rs[1].resize(t, e);
  }
  L() {
    this.K_.dispose(), this.Rs[0].dispose(), this.Rs[1].dispose();
  }
}
function mr(i) {
  if (typeof i == "number" || typeof i == "boolean") return !0;
  if (Array.isArray(i)) {
    if (i.length === 0) return !0;
    const t = i[0];
    return typeof t == "number" || !!Array.isArray(t);
  }
  return i instanceof Float32Array || i instanceof Int32Array || !!xt(i) || typeof WebGLTexture < "u" && i instanceof WebGLTexture;
}
async function kt(i) {
  if (i.startsWith("./") || i.startsWith("../") || i.endsWith(".vert") || i.endsWith(".frag") || i.endsWith(".glsl")) {
    const t = await fetch(i);
    if (!t.ok) throw Error(`Failed to load shader from ${i}: ${t.statusText}`);
    return await t.text();
  }
  return i;
}
class xs {
  constructor(t) {
    o(this, "G");
    o(this, "tp", /* @__PURE__ */ new Map());
    o(this, "ip", /* @__PURE__ */ new Map());
    o(this, "Ke");
    o(this, "Rs");
    o(this, "Pt", !1);
    this.G = t, this.Ke = t.nr(yt, As), this.sp();
  }
  async register(t, e, s = {}) {
    const r = typeof e == "string" ? this.G.nr(yt, await kt(e)) : e;
    this.ep(t, r, s);
  }
  rp(t, e, s) {
    this.ep(t, this.G.nr(yt, e), s);
  }
  ep(t, e, s) {
    this.ip.set(t, e);
    const r = Object.entries(s), n = r.length > 0 ? r[0][1][0] : null;
    this.tp.set(t, { id: t, createShader: () => e, createUniforms: (h, a) => {
      const c = { u_resolution: [a.width, a.height] };
      for (const [u, [l, f]] of r) {
        let d = f;
        if (h != null) {
          if (typeof h == "number" && l === n) d = h;
          else if (typeof h == "object" && l in h) {
            const p = h[l];
            mr(p) && (d = p);
          }
        }
        c[u] = d;
      }
      return c;
    } });
  }
  unregister(t) {
    const e = this.ip.get(t);
    return e && (e.dispose(), this.ip.delete(t)), this.tp.delete(t);
  }
  has(t) {
    return this.tp.has(t);
  }
  kt(t, e) {
    this.Pt || (this.Rs = [this.G.Z(t, e, 1, { depth: !1 }), this.G.Z(t, e, 1, { depth: !1 })], this.Pt = !0);
  }
  np(t, e, s, r, n) {
    this.Rs[0].width === r && this.Rs[0].height === n || (this.Rs[0].resize(r, n), this.Rs[1].resize(r, n)), this.ue(t, e, s, r, n, this.Rs);
  }
  ue(t, e, s, r, n, h) {
    if (s.length === 0)
      return this.hp(t, e) ? void 0 : void this.op(t, e, r, n);
    let a = t, c = 0;
    for (let u = 0; u < s.length; u++) {
      const l = s[u];
      let f = e;
      if (u !== s.length - 1 || this.hp(a, e)) {
        const d = this.ap(a, h, c);
        f = d.buffer, c = d.index === 0 ? 1 : 0;
      }
      this.cp(l, a, f, r, n), a = f.textures[0];
    }
    this.hp(a, e) || this.op(a, e, r, n);
  }
  cp(t, e, s, r, n) {
    const h = this.tp.get(t.name);
    if (!h) return console.warn(`[textmode.js] Unknown filter: "${t.name}". Skipping.`), void this.op(e, s, r, n);
    const a = this.lp(t.name, h, r, n), c = { renderer: this.G, gl: this.G.context, width: r, height: n };
    s.begin(), this.G.oe(a), a.ae({ u_texture: e });
    const u = h.createUniforms(t.params, c);
    a.ae(u), this.G.ce(0, 0, r, n), s.end();
  }
  hp(t, e) {
    return e.textures.includes(t);
  }
  ap(t, e, s) {
    const r = e[s];
    if (!this.hp(t, r)) return { buffer: r, index: s };
    const n = s === 0 ? 1 : 0, h = e[n];
    return this.hp(t, h) ? { buffer: r, index: s } : { buffer: h, index: n };
  }
  lp(t, e, s, r) {
    let n = this.ip.get(t);
    if (!n && e) {
      const h = { renderer: this.G, gl: this.G.context, width: s, height: r };
      n = e.createShader(h), this.ip.set(t, n);
    }
    return n;
  }
  op(t, e, s, r) {
    e.begin(), this.G.oe(this.Ke), this.Ke.ae({ u_texture: t, u_resolution: [s, r] }), this.G.ce(0, 0, s, r), e.end();
  }
  de(t, e) {
    this.Rs && (this.Rs[0].resize(t, e), this.Rs[1].resize(t, e));
  }
  L() {
    for (const t of this.ip.values()) t.dispose();
    this.ip.clear(), this.tp.clear(), this.Ke.dispose(), this.Rs && (this.Rs[0].dispose(), this.Rs[1].dispose()), this.Pt = !1;
  }
  sp() {
    this.rp("invert", `#version 300 es
precision highp float;uniform sampler2D u_texture;in vec2 v_uv;out vec4 fragColor;void main(){vec4 A=texture(u_texture,v_uv);fragColor=vec4(1.-A.rgb,A.a);}`, {}), this.rp("grayscale", `#version 300 es
precision highp float;uniform sampler2D u_texture;uniform float Uu;in vec2 v_uv;out vec4 fragColor;void main(){vec4 A=texture(u_texture,v_uv);float B=dot(A.rgb,vec3(0.299,0.587,0.114));vec3 C=mix(A.rgb,vec3(B),Uu);fragColor=vec4(C,A.a);}`, { Uu: ["amount", 1] }), this.rp("sepia", `#version 300 es
precision highp float;uniform sampler2D u_texture;uniform float Uu;in vec2 v_uv;out vec4 fragColor;void main(){vec4 A=texture(u_texture,v_uv);vec3 B;B.r=dot(A.rgb,vec3(0.393,0.769,0.189));B.g=dot(A.rgb,vec3(0.349,0.686,0.168));B.b=dot(A.rgb,vec3(0.272,0.534,0.131));vec3 C=mix(A.rgb,B,Uu);fragColor=vec4(C,A.a);}`, { Uu: ["amount", 1] }), this.rp("threshold", `#version 300 es
precision highp float;uniform sampler2D u_texture;uniform float Ux;in vec2 v_uv;out vec4 fragColor;void main(){vec4 A=texture(u_texture,v_uv);float B=dot(A.rgb,vec3(0.299,0.587,0.114));float C=step(Ux,B);fragColor=vec4(vec3(C),A.a);}`, { Ux: ["threshold", 0.5] });
  }
}
const Br = Object.freeze(Object.defineProperty({ __proto__: null, TextmodeFilterManager: xs }, Symbol.toStringTag, { value: "Module" }));
class Es {
  constructor(t, e) {
    o(this, "_e");
    o(this, "G");
    o(this, "fp");
    o(this, "dp");
    o(this, "_p", []);
    o(this, "pp", []);
    o(this, "mp");
    o(this, "gp", !1);
    o(this, "vp", /* @__PURE__ */ new Set());
    o(this, "yp", []);
    o(this, "wp", []);
    o(this, "bp", !1);
    o(this, "Mp", () => {
    });
    o(this, "Ap");
    o(this, "Cp");
    o(this, "xp");
    o(this, "Sp");
    o(this, "Ep");
    o(this, "Fp", { Ms: !0, As: 1, Ss: 0, Cs: L.NORMAL });
    this._e = t, this.G = t.G, this.dp = new xs(this.G), this.fp = new pr(this.G, this._e.p.width, this._e.p.height), this.mp = new K(this.G, { visible: !0, opacity: 1, fontSize: e.fontSize, fontSource: e.fontSource }), this.Sp = new _s(this._e, e.loadingScreen), this.Ep = new hs(this._e);
  }
  async kt() {
    await this.Tp(this.mp);
    const t = this._e.p;
    this.Ap = this.G.Z(t.width, t.height, 1, { depth: !1 }), this.Cp = this.G.Z(t.width, t.height, 1, { depth: !1 }), this.xp = this.Ap, this.dp.kt(t.width, t.height), await this.Sp.kt(), await this.Ep.kt(), await this.Tp(this.Sp.pe), await this.Tp(this.Ep.pe), await this.Pp(), this.gp = !0;
  }
  Lp(t, e) {
    (this.bp ? this.wp : this.yp).push({ name: t, params: e });
  }
  Dp(t) {
    this.Mp = t;
  }
  kp() {
    this.yp = [], this.wp = [];
  }
  add(t = {}) {
    const e = new K(this.G, t);
    return this.gp ? (this.Tp(e), this._p.push(e)) : this.pp.push(e), e;
  }
  remove(t) {
    this.Rp(this._p, t) || this.Rp(this.pp, t);
  }
  move(t, e) {
    this.Op(this._p, t, e) || this.Op(this.pp, t, e);
  }
  swap(t, e) {
    this.Bp(this._p, t, e) || this.Bp(this.pp, t, e);
  }
  clear() {
    this.Ip(this._p), this._p = [], this.Ip(this.pp), this.pp = [];
  }
  Np(t, e = []) {
    this._e.ie.h_(), this.mp.Js(this._e, this._e.jp);
    const s = [...this.G.state.yn.Fs];
    for (const r of this._p) r.Js(this._e, this._e.jp);
    for (const r of e) r.Ms && r.Js(this._e, this._e.jp, { skipPluginHooks: !0 });
    this.Qp(t, s, e);
  }
  zp() {
    this.Np(this.Ap), this.Hp();
  }
  Hp() {
    let t = this.Ap.textures[0];
    if (this.yp.length > 0) {
      const e = this._e.p;
      this.dp.np(this.Ap.textures[0], this.Cp, this.yp, e.width, e.height), t = this.Cp.textures[0], this.xp = this.Cp, this.yp = [];
    } else this.xp = this.Ap;
    try {
      try {
        this.bp = !0, this.Mp.call(this._e);
      } finally {
        this.bp = !1;
      }
      if (this.wp.length > 0) {
        const e = this.Cp;
        this.dp.np(this.xp.textures[0], e, this.wp, this._e.p.width, this._e.p.height), t = e.textures[0], this.xp = e;
      }
    } finally {
      this.wp = [], this.bp = !1;
    }
    this.Gp(t), this._e.ie.a_();
  }
  Gp(t) {
    const e = this._e.p;
    this.G.Oh(0, 0, 0, 0), this.G.oe(this._e.Vp), this._e.Vp.ae({ u_texture: t }), this.G.ce(0, 0, e.width, e.height);
  }
  Xp(t) {
    this.Yp(() => {
      t.Js(this._e, this._e.jp, { skipPluginHooks: !0 });
      const e = t.texture, s = t.grid;
      e && s && (this.G.Oh(...this.G.state.yn.Fs), this.G.oe(this._e.Vp), this._e.Vp.ae({ u_texture: e }), this.G.ce(s.offsetX, s.offsetY, s.width, s.height));
    });
  }
  Kp(t) {
    this.Yp(() => {
      const e = this._e.p, s = this.xp ?? this.Ap, r = s.textures[0];
      if (!r) return;
      t.Js(this._e, this._e.jp, { skipPluginHooks: !0 });
      const n = this.Wp(t);
      if (!n) return void this.Gp(r);
      const h = this.Zp(s);
      this.fp.Z_({ base: { layer: this.Fp, texture: r, width: e.width, height: e.height, offsetX: 0, offsetY: 0 }, layers: [n], targetFramebuffer: h, backgroundColor: [0, 0, 0, 0], canvasWidth: e.width, canvasHeight: e.height }), this.Gp(h.textures[0]);
    });
  }
  Yp(t) {
    const e = !this.G.Ha();
    e && this.G.Qa(!0), this.G.Ya(!0), this.G.state.ze();
    try {
      this.G.state.Ki.ws(), this.G.state.re(), t();
    } finally {
      this.G.state.He(), this.G.Ka(), e && this.G.Qa(!1);
    }
  }
  Zp(t) {
    return t === this.Ap ? this.Cp : this.Ap;
  }
  Wp(t, e = !0) {
    if (!t.grid || !t.texture) return;
    const s = t.grid, r = { layer: t, texture: t.texture, width: s.width, height: s.height, offsetX: s.offsetX + t.l, offsetY: s.offsetY + t._ };
    return e && t.Fs && (r.canvasBackgroundColor = t.Fs), r;
  }
  Qp(t, e, s = []) {
    const r = this._e.p, n = this.Wp(this.mp, !1);
    if (!n) return;
    const h = [];
    for (const a of this._p) {
      const c = this.Wp(a);
      c && h.push(c);
    }
    for (const a of s) {
      if (!a.Ms) continue;
      const c = this.Wp(a);
      c && h.push(c);
    }
    this.fp.Z_({ base: n, layers: h, targetFramebuffer: t, backgroundColor: e, canvasWidth: r.width, canvasHeight: r.height });
  }
  de() {
    var e, s, r, n, h;
    if (!this.gp) return;
    const t = this._e.p;
    this.mp.de();
    for (const a of this._p) a.de();
    (e = this.Sp.pe) == null || e.de(), (s = this.Ep.pe) == null || s.de(), this.fp.de(t.width, t.height), (r = this.Ap) == null || r.resize(t.width, t.height), (n = this.Cp) == null || n.resize(t.width, t.height), (h = this.dp) == null || h.de(t.width, t.height);
  }
  L() {
    var t, e;
    this.Sp.L(), this.Ep.L(), this.clear(), this._e.ie.c_(this.mp), this.mp.L(), this.dp.L(), this.fp.L(), (t = this.Ap) == null || t.dispose(), (e = this.Cp) == null || e.dispose(), this.yp = [], this.wp = [], this.bp = !1, this.gp = !1;
  }
  get all() {
    return this._p;
  }
  get base() {
    return this.mp;
  }
  get filters() {
    return this.dp;
  }
  get resultFramebuffer() {
    const t = this.yp.length > 0 || this.wp.length > 0 ? this.Cp : this.xp ?? this.Ap;
    if (!t) throw new _("LayerManager.resultFramebuffer is not available before initialization completes.");
    return t;
  }
  get loading() {
    return this.Sp;
  }
  get errors() {
    return this.Ep;
  }
  $p() {
    const t = this._p;
    for (let e = t.length - 1; e >= 0; e--) {
      const s = t[e];
      if (s.Ms && s.grid) return s.grid;
    }
    return this.mp.grid;
  }
  qp(t) {
    this.vp.add(t);
  }
  Jp() {
    for (const t of this.vp) t();
  }
  async Pp() {
    for (let t = 0; t < this.pp.length; t++) {
      const e = this.pp[t];
      await this.Tp(e), this._p.push(e);
    }
    this.pp = [];
  }
  Rp(t, e) {
    const s = t.indexOf(e);
    return s !== -1 && (t.splice(s, 1), this.tm(e), !0);
  }
  Op(t, e, s) {
    const r = t.indexOf(e);
    return r !== -1 && (t.splice(r, 1), t.splice(X(s, 0, t.length), 0, e), !0);
  }
  Bp(t, e, s) {
    if (e === s) return !0;
    const r = t.indexOf(e), n = t.indexOf(s);
    return r !== -1 && n !== -1 && (t[r] = s, t[n] = e, !0);
  }
  Ip(t) {
    for (const e of t) this.tm(e);
  }
  tm(t) {
    this._e.ie.c_(t), t.L();
  }
  async Tp(t) {
    var s;
    const e = { renderer: this.G, canvas: this._e.p, filterManager: this.dp, createFramebuffer: (r, n, h = 1, a) => this.G.Z(r, n, h, a) };
    await t.Xs(e), (s = t.grid) == null || s.S(() => this.Jp());
  }
}
const kr = Object.freeze(Object.defineProperty({ __proto__: null, LayerBlendMode: L, TEXTMODE_LAYER_BLEND_MODES: Zt, TextmodeLayer: K, TextmodeLayerManager: Es }, Symbol.toStringTag, { value: "Module" })), gr = `#version 300 es
precision highp float;in vec2 v_uv;in vec3 v_worldPosition;uniform sampler2D u_image;uniform bool u_invert;uniform bool u_flipX;uniform bool u_flipY;uniform float u_charRotation;uniform float Uy;uniform float Uz;uniform bool u_charColorFixed;uniform vec4 u_charColor;uniform bool u_cellColorFixed;uniform vec4 u_cellColor;uniform vec4 u_backgroundColor;uniform int u_charCount;uniform sampler2D u_charPaletteTexture;uniform ivec2 u_charPaletteDimensions;layout(location=0)out vec4 o_character;layout(location=1)out vec4 o_primaryColor;layout(location=2)out vec4 o_secondaryColor;layout(location=3)out vec4 o_statePayload;
` + Ht + `
float A(vec3 B){return dot(B,vec3(0.299f,0.587f,0.114f));}vec3 C(int D){int E=max(u_charPaletteDimensions.x,1);int F=D/E;int G=D%E;return texelFetch(u_charPaletteTexture,ivec2(G,F),0).rgb;}void main(){vec2 H=vec2(v_uv.x,1.0f-v_uv.y);vec4 I=texture(u_image,H);float J=A(I.rgb);if(I.a<0.01f||J<Uy||J>Uz){discard;}vec2 K=vec2(0.);if(u_charCount>0){float L=float(u_charCount);float M=clamp(J*(L-1.0f),0.0f,L-1.0f);int N=int(floor(M+0.5f));vec3 O=C(N);K=O.xy;}else{K=vec2(0.0f,0.0f);}vec4 P=u_charColorFixed?u_charColor:I;vec4 Q=u_cellColorFixed?u_cellColor:I;vec3 R=tmApplyLighting(P.rgb,v_worldPosition);vec3 S=tmApplyLighting(Q.rgb,v_worldPosition);o_primaryColor=vec4(R,P.a);o_secondaryColor=vec4(S,Q.a);o_statePayload=vec4(0.);int T=int(u_invert?1:0);int U=int(u_flipX?1:0);int V=int(u_flipY?1:0);float W=float(T|(U<<1)|(V<<2))/255.;o_character=vec4(K,W,clamp(u_charRotation,0.0f,1.0f));}`, vr = { id: "brightness", createShader: ({ gl: i }) => new rt(i, Ms, gr), createUniforms: (i) => i.createBaseUniforms() };
class Cs {
  constructor() {
    o(this, "im", /* @__PURE__ */ new Map());
    o(this, "ip", /* @__PURE__ */ new Map());
    this.sm();
  }
  register(t) {
    this.im.set(t.id, t);
  }
  unregister(t) {
    const e = this.ip.get(t);
    return e && (e.dispose(), this.ip.delete(t)), this.im.delete(t);
  }
  has(t) {
    return this.im.has(t);
  }
  Xu(t) {
    return this.im.get(t);
  }
  Vu(t, e) {
    let s = this.ip.get(t);
    if (!s) {
      const r = this.im.get(t);
      if (!r) throw Error(`[textmode.js] Conversion mode "${t}" is not registered.`);
      s = r.createShader(e), this.ip.set(t, s);
    }
    return s;
  }
  L() {
    for (const t of this.ip.values()) t.dispose();
    this.ip.clear(), this.im.clear();
  }
  sm() {
    this.register(vr);
  }
}
const Xr = Object.freeze(Object.defineProperty({ __proto__: null, TextmodeConversionManager: Cs }, Symbol.toStringTag, { value: "Module" })), pe = "textmode-v1";
function Ts() {
  var t, e;
  const i = globalThis.crypto;
  if (i != null && i.getRandomValues) {
    const s = new Uint32Array(4);
    return i.getRandomValues(s), `auto:${s[0]}:${s[1]}:${s[2]}:${s[3]}`;
  }
  return `auto:${Date.now()}:${((e = (t = globalThis.performance) == null ? void 0 : t.now) == null ? void 0 : e.call(t)) ?? 0}:${Math.random()}`;
}
function xe(i) {
  return typeof i == "number" ? "number:" + (i + "") : "string:" + i;
}
function me(i, t) {
  return `stream:${i.length}:${i}:${t.length}:${t}`;
}
function Nt(i, t) {
  let e = (2166136261 ^ t) >>> 0;
  for (let s = 0; s < i.length; s += 1) e ^= i.charCodeAt(s), e = Math.imul(e, 16777619), e ^= e >>> 13;
  return e ^= i.length, e = Math.imul(e ^ e >>> 16, 2146121005), e = Math.imul(e ^ e >>> 15, 2221713035), (e ^ e >>> 16) >>> 0;
}
function We(i) {
  const t = i[0] + i[1] + i[3] | 0;
  return i[3] = i[3] + 1 | 0, i[0] = i[1] ^ i[1] >>> 9, i[1] = i[2] + (i[2] << 3) | 0, i[2] = i[2] << 21 | i[2] >>> 11, i[2] = i[2] + t | 0, t >>> 0;
}
class qt {
  constructor(t = Ts()) {
    o(this, "ye");
    o(this, "rm");
    this.randomSeed(t);
  }
  random(t, e) {
    if (Array.isArray(t))
      return t.length === 0 ? void 0 : t[Math.floor(this.nm() * t.length)];
    const s = this.nm();
    return typeof t != "number" ? s : e === void 0 ? s * t : t + s * (e - t);
  }
  randomGaussian(t = 0, e = 1) {
    if (this.rm !== void 0) {
      const a = this.rm;
      return this.rm = void 0, t + a * e;
    }
    const s = Math.sqrt(-2 * Math.log(1 - this.nm())), r = 2 * Math.PI * this.nm(), n = s * Math.cos(r), h = s * Math.sin(r);
    return this.rm = h, t + n * e;
  }
  randomSeed(t) {
    this.ye = (function(e) {
      const s = `${pe}\0${e}`, r = [Nt(s, 608135816), Nt(s, 2242054355), Nt(s, 320440878), Nt(s, 57701188)];
      r.every((n) => n === 0) && (r[0] = 1831565813);
      for (let n = 0; n < 12; n += 1) We(r);
      return r;
    })(xe(t)), this.rm = void 0;
  }
  nm() {
    return We(this.ye) / 4294967296;
  }
  static get hm() {
    return pe;
  }
}
const zr = Object.freeze(Object.defineProperty({ __proto__: null, TEXTMODE_RANDOM_ALGORITHM: pe, TextmodeRandom: qt }, Symbol.toStringTag, { value: "Module" })), Q = 4095;
function ie(i) {
  return 0.5 * (1 - Math.cos(i * Math.PI));
}
class yr {
  constructor(t) {
    o(this, "om", []);
    o(this, "am", 4);
    o(this, "um", 0.5);
    this.noiseSeed(t);
  }
  noise(t, e = 0, s = 0) {
    t < 0 && (t = -t), e < 0 && (e = -e), s < 0 && (s = -s);
    let r = Math.floor(t), n = Math.floor(e), h = Math.floor(s), a = t - r, c = e - n, u = s - h, l = 0, f = 0.5;
    for (let d = 0; d < this.am; d += 1) {
      let p = r + (n << 4) + (h << 8);
      const v = ie(a), w = ie(c);
      let y = this.om[p & Q], g = this.om[p + 1 & Q];
      y += v * (g - y), g = this.om[p + 16 & Q];
      let b = this.om[p + 16 + 1 & Q];
      g += v * (b - g), y += w * (g - y), p += 256, g = this.om[p & Q], b = this.om[p + 1 & Q], g += v * (b - g);
      let M = this.om[p + 16 & Q];
      b = this.om[p + 16 + 1 & Q], M += v * (b - M), g += w * (M - g), y += ie(u) * (g - y), l += y * f, f *= this.um, r <<= 1, a *= 2, n <<= 1, c *= 2, h <<= 1, u *= 2, a >= 1 && (r += 1, a -= 1), c >= 1 && (n += 1, c -= 1), u >= 1 && (h += 1, u -= 1);
    }
    return X(l, 0, 1);
  }
  noiseSeed(t) {
    const e = new qt(t);
    this.om = Array.from({ length: 4096 }, () => e.random());
  }
  noiseDetail(t, e) {
    this.am = Number.isFinite(t) ? Math.max(1, Math.floor(t)) : 1, e !== void 0 && Number.isFinite(e) && (this.um = X(e, 0, 1));
  }
}
const Yr = Object.freeze(Object.defineProperty({ __proto__: null, TextmodeColor: S }, Symbol.toStringTag, { value: "Module" }));
class m {
  constructor(t = {}) {
    o(this, "G");
    o(this, "jp");
    o(this, "Vp");
    o(this, "p");
    o(this, "lm");
    o(this, "_d");
    o(this, "fm");
    o(this, "dm");
    o(this, "_m");
    o(this, "pm");
    o(this, "gm");
    o(this, "ne");
    o(this, "vm");
    o(this, "ym", null);
    o(this, "wm", []);
    o(this, "bm", []);
    o(this, "Mm", []);
    o(this, "Am", []);
    o(this, "Cm", []);
    o(this, "xm", null);
    o(this, "Sm", new Float32Array(24));
    o(this, "Em", /* @__PURE__ */ new Set());
    o(this, "ie");
    o(this, "Fm");
    o(this, "Tm");
    o(this, "Pm", /* @__PURE__ */ new Map());
    o(this, "Lm");
    o(this, "Dm");
    o(this, "km");
    o(this, "Rm");
    o(this, "Ba", !1);
    o(this, "Om", !1);
    o(this, "Lc", !1);
    o(this, "Bm", null);
    o(this, "Im", !1);
    o(this, "Nm", 0);
    o(this, "jm", () => {
    });
    o(this, "Qm", () => {
    });
    o(this, "zm");
    o(this, "Hm");
    o(this, "Gm");
    o(this, "xc", !1);
    o(this, "Vm");
    o(this, "Xm");
    o(this, "Wm", (t, e, s, r) => S.Wc(t, e, s, r, this.G.state.yn.Rn()));
    this.ie = new ur(this), this.xc = t.overlay ?? !1;
    const e = t.seed ?? Ts();
    this.Tm = xe(e), this.Fm = new qt(e), this.Lm = new yr(me(this.Tm, "noise")), this.Dm = new Promise((r) => {
      this.Rm = r;
    }), this.p = new Yi(t), this.G = new zi(this.p.jc()), this.jp = this.G.nr(yt, `#version 300 es
precision highp float;uniform sampler2D u_characterTexture;uniform vec2 u_charsetDimensions;uniform sampler2D Uo;uniform sampler2D Up;uniform sampler2D Un;uniform bool Uq;uniform vec2 Ur;uniform vec2 Us;uniform vec4 Ut;in vec2 v_uv;out vec4 fragColor;mat2 A(float B){float C=sin(B);float D=cos(B);return mat2(D,-C,C,D);}float E(vec3 F){return dot(F,vec3(0.299f,0.587f,0.114f));}void main(){vec2 G=gl_FragCoord.xy/Us;vec2 H=G*Ur;vec2 I=floor(H);vec2 J=(I+0.5)/Ur;vec4 K=texture(Uo,J);vec4 L=texture(Up,J);vec4 M=texture(Un,J);int N=int(M.r*255.+0.5);int O=int(M.g*255.+0.5);int P=int(M.a*255.+0.5);if(N==255&&O==255){fragColor=mix(Ut,L,L.a);return;}int Q=int(M.b*255.+0.5);bool R=(Q&1)!=0;bool S=(Q&2)!=0;bool T=(Q&4)!=0;int U=N+O*256;int V=int(u_charsetDimensions.x);int W=U/V;int X=U-(W*V);float Y=(u_charsetDimensions.y-1.)-float(W);vec2 Z=1./u_charsetDimensions;vec2 a=vec2(float(X),Y)*Z;vec2 b=a+Z;float c=-M.a*360.*0.017453292;vec2 d=fract(H)-0.5f;vec2 e=vec2(S?-1.:1.,T?-1.:1.);d*=e;d=A(c)*d+0.5;vec2 f=a+clamp(d,0.,1.)*Z;const float g=0.0001;if(any(lessThan(f,a-g))||any(greaterThan(f,b+g))){fragColor=R?K:L;return;}vec4 h=texture(u_characterTexture,f);if(!Uq){fragColor=h;return;}float i=(h.a>0.0f&&E(h.rgb)>0.5f)?1.0f:0.0f;if(R)i=1.0f-i;vec4 j=mix(Ut,L,L.a);fragColor=mix(j,K,i);}`), this.Vp = this.G.nr(yt, As), this.lm = new $i(t.frameRate ?? 60), this.gm = new Es(this, t);
    const s = () => this.Ym();
    this.pm = new Qi(), this._d = new Ji(this.p, s, this.pm), this.fm = new sr(this.p, s, this.pm, this._d), this.dm = new tr(this.pm), this._m = new or(this.pm), this.vm = new Cs(), this.ie.D_(t.plugins ?? []), this.km = this.kt();
  }
  Km(t) {
    var e;
    this.Em.add(t), (e = t.k) == null || e.call(t, () => {
      this.Em.delete(t);
    });
  }
  Zm(t, e) {
    var s;
    this.p.de(t, e), (s = this.gm) == null || s.de(), this.G.vc(), this.Js();
  }
  $m() {
    var r;
    const t = (r = this.gm) == null ? void 0 : r.base.grid;
    if (!t) return;
    const e = t.cols, s = t.rows;
    for (const n of this.Em) n instanceof At && n.de(e, s);
    this.Vm && this.Vm.de(e, s);
  }
  async kt() {
    await this.gm.kt(), this.Rm();
    const t = this.gm.base.grid;
    this.$m(), this.gm.qp(() => {
      this._d.pf(), this.fm.pf();
    }), this.xc && (this.Vm = Pt.nl(this.G, this.vm, this.p.targetCanvas, t.cols, t.rows, this.Wm)), this.qm(), t.S(() => {
      this.$m();
    }), this.Jm();
    try {
      await this.ie.u_(), await this.jm(), await this.ie.f_(), this.lm.yl = 0, this.loading.Q_(), this.Im = !0, this.Jm();
    } catch (e) {
      this.tg(e, "setup");
    }
  }
  Jm() {
    this.lm.bl(() => this.Js(), () => this.ig());
  }
  ig() {
    return !this.Om && !this.Lc && (this.loading.Ae || this.errors.Ae || this.Im || this.Nm > 0 || this.Bm !== null);
  }
  sg(t) {
    this.Nm += t, this.Jm(), this.Ba || this.loading.Ae || this.errors.Ae || this.eg();
  }
  qm() {
    this.zm = () => {
      if (this.xc) {
        const t = this.p.targetCanvas.getBoundingClientRect();
        this.resizeCanvas(Math.round(t.width), Math.round(t.height));
      }
      this.Qm();
    }, window.addEventListener("resize", this.zm), this._d.nf(), this.fm.nf(), this.dm.nf(), this._m.nf(), this.Hm = () => {
      this.dm.Nf();
    }, window.addEventListener("blur", this.Hm), this.xc && (this.Gm = new ResizeObserver(() => {
      const t = this.p.targetCanvas.getBoundingClientRect();
      this.resizeCanvas(Math.round(t.width), Math.round(t.height));
    }), this.Gm.observe(this.p.targetCanvas));
  }
  Js() {
    if (this.errors.Ae) {
      this.errors.Se();
      const t = this.errors.pe;
      return void (t && this.gm.Xp(t));
    }
    if (this.loading.Ae) try {
      this.loading.Se();
      const t = this.loading.pe;
      if (!t || !this.loading.Ae) return;
      if (this.loading.ye === "transitioning") {
        if (this.rg(), this.errors.Ae || !this.loading.Ae) return;
        this.gm.Kp(t);
      } else this.gm.Xp(t);
    } catch (t) {
      this.tg(t, "loading screen");
    }
    else this.eg() || this.ng() && this.hg();
  }
  ng() {
    return this.Im || this.lm.fl;
  }
  rg() {
    this.ng() && this.hg();
  }
  eg() {
    if (this.loading.Ae || this.errors.Ae || this.Nm <= 0) return !1;
    for (this.Im = !1; this.Nm > 0; ) this.Nm--, this.hg();
    return !0;
  }
  hg() {
    this.Im = !1, this.lm.El(), this.lm.Tl(), this._d.bf(), this._m.bf(), this.Ba = !0, this.G.Qa(!0);
    try {
      this.xc && Wt(this.G.context, this.Vm.texture, this.p.targetCanvas), this.gm.zp();
    } catch (t) {
      this.tg(t, "draw loop");
    } finally {
      if (this.Ba = !1, this.G.Qa(!1), this.Om && !this.Lc) this.og();
      else if (this.Bm) {
        const { width: t, height: e } = this.Bm;
        this.Bm = null, this.Zm(t, e);
      }
    }
  }
  resizeCanvas(t, e) {
    this.Ba ? this.Bm = { width: t, height: e } : this.Zm(t, e);
  }
  destroy() {
    this.Lc || this.Om || (this.Om = !0, this.lm.Cl(), this.Ba || this.og());
  }
  async og() {
    var t, e, s, r;
    this.p.L(), await this.ie.I_(), window.removeEventListener("resize", this.zm), window.removeEventListener("blur", this.Hm), (t = this.Gm) == null || t.disconnect(), this._d._f(), this.fm._f(), this.dm._f(), this._m._f(), (e = this.gm) == null || e.L(), (s = this.vm) == null || s.L();
    for (const n of this.Em) n.dispose();
    this.Em.clear(), this.jp.dispose(), this.Vp.dispose(), this.G.L(), (r = this.Vm) == null || r.dispose(), this.Lc = !0;
  }
  filter(t, e) {
    this.gm.Lp(t, e);
  }
  draw(t) {
    this.gm.base.draw(t);
  }
  postDraw(t) {
    this.gm.base.postDraw(t);
  }
  finalDraw(t) {
    this.gm.Dp(t);
  }
  async loadFont(t, e = !0) {
    if (e) return await this.gm.base.loadFont(t), this.gm.base.font;
    if (t instanceof B) return t.Pt || await t.kt(), t;
    const s = new B(this.G);
    return await s.kt(t), this.Km(s), s;
  }
  async loadTileset(t, e = !0) {
    if (e) return await this.gm.base.loadTileset(t), this.gm.base.font;
    if (t instanceof z) return t.Pt || await t.kt(), t;
    const s = new z(this.G, t.fontSize, t);
    return await s.kt(), this.Km(s), s;
  }
  fontSize(t) {
    return this.gm.base.fontSize(t);
  }
  useTileColors(t) {
    return this.gm.base.useTileColors(t);
  }
  inputGrid(t) {
    return t === void 0 ? this.Xm ?? "topmost" : t === "topmost" ? (this.Xm = void 0, this._d.pf(), void this.fm.pf()) : (this.Xm = t, this._d.pf(), void this.fm.pf());
  }
  Ym() {
    return this.Xm ? this.Xm : this.gm.$p();
  }
  tg(t, e) {
    console.error(`Error during ${e}:`, t), this.loading.Q_(), this.errors.Ce(t), this.Jm();
  }
  async setup(t) {
    this.jm = t;
  }
  windowResized(t) {
    this.Qm = t;
  }
  get grid() {
    var t;
    return ((t = this.ne) == null ? void 0 : t.grid) ?? this.gm.base.grid;
  }
  get font() {
    var t;
    return ((t = this.ne) == null ? void 0 : t.font) ?? this.gm.base.font;
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
    const e = this.p.pixelDensity, s = this.p.width / e, r = this.p.height / e;
    this.p.zc(t), this.resizeCanvas(s, r);
  }
  get canvas() {
    return this.p.canvas;
  }
  get isDisposed() {
    return this.Lc;
  }
  get overlay() {
    return this.Vm;
  }
  get loading() {
    return this.gm.loading;
  }
  get errors() {
    return this.gm.errors;
  }
  get layers() {
    return this.gm;
  }
  get filters() {
    return this.gm.filters;
  }
  get conversions() {
    return this.vm;
  }
  get isRenderingFrame() {
    return this.Ba;
  }
}
class Ee {
  constructor() {
  }
  static create(t = {}) {
    return new m(t);
  }
  static setErrorLevel(t) {
    pt.Li(t);
  }
  static get version() {
    return "0.17.0";
  }
}
const je = /* @__PURE__ */ new WeakMap();
function wr(i, t, e) {
  var n;
  let s = je.get(i);
  s || (s = /* @__PURE__ */ new Map(), je.set(i, s)), (n = s.get(t)) == null || n();
  const r = i.pm.Ol(t, e);
  s.set(t, r);
}
function St(i) {
  const t = m.prototype;
  for (const e of i) t[e] = function(s) {
    wr(this, e, s);
  };
}
function Qt(i) {
  for (const { name: t, get: e } of i) Object.defineProperty(m.prototype, t, { get: e, configurable: !0, enumerable: !0 });
}
function Fs(i, t) {
  const e = m.prototype;
  e[i] = e[t];
}
function Ss(i, t) {
  return function(e, s, r, n) {
    if (e === void 0) return S.Zc(...i.call(this));
    const h = this.Wm(e, s, r, n);
    t.call(this, h);
  };
}
const br = Object.freeze(Object.defineProperty({ __proto__: null, MOUSE_EVENT_NAMES: be }, Symbol.toStringTag, { value: "Module" }));
St(be), m.prototype.cursor = function(i) {
  this._d.if(i);
}, m.prototype.requestPointerLock = function() {
  return this._d.sf();
}, m.prototype.exitPointerLock = function() {
  this._d.ef();
}, Qt([{ name: "mouse", get: function() {
  return this._d.mf();
} }, { name: "mouseIsPressed", get: function() {
  return this._d.wf();
} }, { name: "pmouse", get: function() {
  return this._d.gf();
} }, { name: "movedX", get: function() {
  return this._d.vf();
} }, { name: "movedY", get: function() {
  return this._d.yf();
} }]), m.prototype.frameRate = function(i) {
  return i === void 0 ? this.lm.dl : this.lm.Sl(i, () => this.Js());
}, m.prototype.targetFrameRate = function(i) {
  if (i === void 0) return this.lm.ol;
  this.lm.Fl(i);
}, m.prototype.noLoop = function() {
  this.lm.Cl();
}, m.prototype.loop = function() {
  this.lm.xl(() => this.Js());
}, m.prototype.redraw = function(i = 1) {
  pt.Pi(typeof i == "number" && i > 0 && Number.isInteger(i), "Redraw count must be a positive integer.", { method: "redraw", providedValue: i }) && this.sg(i);
}, m.prototype.isLooping = function() {
  return this.lm.fl;
}, m.prototype.deltaTime = function() {
  return this.lm.vl;
}, Object.defineProperty(m.prototype, "frameCount", { get: function() {
  return this.lm.yl;
}, set: function(i) {
  this.lm.yl = i;
}, configurable: !0, enumerable: !0 }), Object.defineProperty(m.prototype, "millis", { get: function() {
  return this.lm.Pl;
}, set: function(i) {
  this.lm.Pl = i;
}, configurable: !0, enumerable: !0 }), Object.defineProperty(m.prototype, "secs", { get: function() {
  return this.lm.Ll;
}, set: function(i) {
  this.lm.Ll = i;
}, configurable: !0, enumerable: !0 });
const Mr = Object.freeze(Object.defineProperty({ __proto__: null, GESTURE_EVENT_NAMES: Ae, TOUCH_EVENT_NAMES: Me }, Symbol.toStringTag, { value: "Module" }));
St(Me), St(Ae), Qt([{ name: "touches", get: function() {
  return this.fm.Sd();
} }]);
const Ar = Object.freeze(Object.defineProperty({ __proto__: null, KEYBOARD_EVENT_NAMES: we }, Symbol.toStringTag, { value: "Module" }));
St(we), m.prototype.isKeyPressed = function(i) {
  return this.dm.Df(i);
}, Qt([{ name: "lastKeyPressed", get: function() {
  return this.dm.Rf();
} }, { name: "lastKeyReleased", get: function() {
  return this.dm.Of();
} }, { name: "pressedKeys", get: function() {
  return this.dm.Bf();
} }, { name: "modifierState", get: function() {
  return this.dm.If();
} }]);
const _r = Object.freeze(Object.defineProperty({ __proto__: null, GAMEPAD_EVENT_NAMES: _e }, Symbol.toStringTag, { value: "Module" }));
St(_e), m.prototype.gamepad = function(i) {
  return this._m.Qd(i);
}, Qt([{ name: "gamepads", get: function() {
  return this._m.jd();
} }]), m.prototype.perspective = function(i, t, e) {
  this.layers.base.perspective(i, t, e);
}, m.prototype.createCamera = function() {
  return this.layers.base.createCamera();
}, m.prototype.setCamera = function(i) {
  this.layers.base.setCamera(i);
}, m.prototype.resetCamera = function() {
  this.layers.base.resetCamera();
}, m.prototype.camera = function(i, t, e, s = 0, r = 0, n = 0, h = 0, a = 1, c = 0) {
  this.layers.base.camera(i, t, e, s, r, n, h, a, c);
}, m.prototype.lookAt = function(i, t, e, s, r, n) {
  this.layers.base.lookAt(i, t, e, s, r, n);
}, m.prototype.ortho = function(i, t) {
  this.layers.base.ortho(i, t);
};
var xr = ((i) => (i[i.POINTS = 0] = "POINTS", i[i.LINES = 1] = "LINES", i[i.LINE_STRIP = 2] = "LINE_STRIP", i[i.LINE_LOOP = 3] = "LINE_LOOP", i[i.TRIANGLES = 4] = "TRIANGLES", i[i.TRIANGLE_STRIP = 5] = "TRIANGLE_STRIP", i[i.TRIANGLE_FAN = 6] = "TRIANGLE_FAN", i[i.QUADS = 7] = "QUADS", i[i.QUAD_STRIP = 8] = "QUAD_STRIP", i))(xr || {});
const Er = { POINTS: 0, LINES: 1, LINE_STRIP: 2, LINE_LOOP: 3, TRIANGLES: 4, TRIANGLE_STRIP: 5, TRIANGLE_FAN: 6, QUADS: 7, QUAD_STRIP: 8 }, Cr = { 0: function(i, t, e, s, r, n) {
  for (let h = 0; h < n; h++) {
    const a = i.G.state;
    a.ze(), a.$n(r[h]), a.Gn.Er(t[h], e[h], s[h]), i.G.sc(1, 1), a.He();
  }
}, 1: function(i, t, e, s, r, n) {
  for (let h = 0; h + 1 < n; h += 2) ge(i, t, e, r, h, h + 1);
}, 2: Ve, 3: function(i, t, e, s, r, n) {
  Ve(i, t, e, s, r, n, "close");
}, 4: function(i, t, e, s, r, n) {
  for (let h = 0; h + 2 < n; h += 3) re(i, t, e, s, r[h], h, h + 1, h + 2);
}, 5: function(i, t, e, s, r, n) {
  for (let h = 0; h + 2 < n; h++) re(i, t, e, s, r[h], h, h + 1, h + 2);
}, 6: function(i, t, e, s, r, n) {
  for (let h = 1; h + 1 < n; h++) re(i, t, e, s, r[0], 0, h, h + 1);
}, 7: function(i, t, e, s, r, n) {
  for (let h = 0; h + 3 < n; h += 4) Ke(i, t, e, s, r[h], h, h + 1, h + 2, h + 3);
}, 8: function(i, t, e, s, r, n) {
  for (let h = 0; h + 3 < n; h += 2) Ke(i, t, e, s, r[h], h, h + 1, h + 3, h + 2);
} };
for (const [i, t] of Object.entries(Er)) Object.defineProperty(m.prototype, i, { configurable: !0, enumerable: !1, value: t, writable: !1 });
function Ve(i, t, e, s, r, n, h) {
  for (let a = 0; a + 1 < n; a++) ge(i, t, e, r, a, a + 1);
  h === "close" && n > 2 && ge(i, t, e, r, n - 1, 0);
}
function ge(i, t, e, s, r, n) {
  const h = i.G.state;
  h.ze(), h.$n(s[r]), i.G.ec(t[r], e[r], t[n], e[n]), h.He();
}
function re(i, t, e, s, r, n, h, a) {
  Ps(i, 12);
  const c = i.Sm;
  j(c, 0, t[n], e[n], s[n]), j(c, 4, t[h], e[h], s[h]), j(c, 8, t[a], e[a], s[a]), Rs(i, r, 3);
}
function Ke(i, t, e, s, r, n, h, a, c) {
  Ps(i, 24);
  const u = i.Sm;
  j(u, 0, t[n], e[n], s[n]), j(u, 4, t[h], e[h], s[h]), j(u, 8, t[a], e[a], s[a]), j(u, 12, t[n], e[n], s[n]), j(u, 16, t[a], e[a], s[a]), j(u, 20, t[c], e[c], s[c]), Rs(i, r, 6);
}
function Rs(i, t, e) {
  const s = i.G.state;
  s.ze(), s.$n(t), i.G.rc(i.Sm, e), s.He();
}
function j(i, t, e, s, r) {
  i[t] = e, i[t + 1] = s, i[t + 2] = r, i[t + 3] = 0;
}
function Ps(i, t) {
  if (i.Sm.length >= t) return;
  let e = i.Sm.length;
  for (; e < t; ) e *= 2;
  i.Sm = new Float32Array(e);
}
m.prototype.rect = function(i = 1, t = 1) {
  this.G.sc(i, t);
}, m.prototype.point = function() {
  this.G.sc(1, 1);
}, m.prototype.line = function(i, t, e, s) {
  this.G.ec(i, t, e, s);
}, m.prototype.lineWeight = function(i) {
  if (i === void 0) return this.G.state.yn.en;
  this.G.state.yn.An(i);
}, m.prototype.ellipse = function(i = 1, t = 1) {
  this.G.nc(i / 2, t / 2);
}, m.prototype.triangle = function(i, t, e, s, r, n) {
  this.G.hc(i, t, e, s, r, n);
}, m.prototype.arc = function(i, t, e, s) {
  this.G.ac(i / 2, t / 2, e, s);
}, m.prototype.bezierCurve = function(i, t, e, s, r, n, h, a) {
  this.G.oc(i, t, e, s, r, n, h, a);
}, m.prototype.beginShape = function(i = 2) {
  if (this.ym !== null) throw Error("beginShape() called before endShape(). Call endShape() first.");
  this.ym = i, this.wm.length = 0, this.bm.length = 0, this.Mm.length = 0, this.Am.length = 0, this.xm ?? (this.xm = wt.Kn()), this.G.state.Wn(this.xm);
}, m.prototype.vertex = function(i, t, e = 0) {
  if (this.ym === null) throw Error("vertex() must be called between beginShape() and endShape().");
  const s = this.Cm.pop() ?? wt.Kn();
  this.G.state.Wn(s), this.wm.push(i), this.bm.push(t), this.Mm.push(e), this.Am.push(s);
}, m.prototype.endShape = function(i) {
  if (this.ym === null || this.xm === null) throw Error("endShape() must be called after beginShape().");
  const t = this.ym, e = this.wm, s = this.bm, r = this.Mm, n = this.Am, h = n.length, a = this.xm;
  try {
    (function(c, u, l, f, d, p, v, w) {
      const y = Cr[u];
      y == null || y(c, l, f, d, p, v, w);
    })(this, t, e, s, r, n, h, i);
  } finally {
    this.G.state.$n(a);
    for (let c = 0; c < n.length; c++) this.Cm.push(n[c]);
    e.length = 0, s.length = 0, r.length = 0, n.length = 0, this.ym = null;
  }
}, m.prototype.box = function(i = 50, t, e) {
  const s = t ?? i, r = e ?? s;
  this.G.cc(i, s, r);
}, m.prototype.sphere = function(i = 50) {
  this.G.uc(i);
}, m.prototype.torus = function(i = 50, t = 10) {
  this.G.lc(i, t);
}, m.prototype.cone = function(i = 50, t) {
  this.G.fc(i, t ?? i);
}, m.prototype.cylinder = function(i = 50, t) {
  this.G.dc(i, t ?? i);
}, m.prototype.ellipsoid = function(i = 50, t, e) {
  this.G._c(i, t ?? i, e ?? i);
};
const He = new Float32Array(16);
m.prototype.rotate = function(i = 0, t, e) {
  const s = this.G.state.Gn;
  if (typeof t == "number" || e !== void 0) return s.Pr(i), s.Lr(t ?? 0), void s.Dr(e ?? 0);
  t === void 0 ? s.Dr(i) : Array.isArray(t) ? s.kr(i, t[0] ?? 0, t[1] ?? 0, t[2] ?? 0) : s.kr(i, t.x ?? 0, t.y ?? 0, t.z ?? 0);
}, m.prototype.rotateX = function(i) {
  if (i === void 0) return vt(this.G.state.Gn.pr);
  this.G.state.Gn.Pr(i);
}, m.prototype.rotateY = function(i) {
  if (i === void 0) return vt(this.G.state.Gn.mr);
  this.G.state.Gn.Lr(i);
}, m.prototype.rotateZ = function(i) {
  if (i === void 0) return vt(this.G.state.Gn.gr);
  this.G.state.Gn.Dr(i);
}, m.prototype.translate = function(i = 0, t = 0, e = 0) {
  this.G.state.Gn.Er(i, t, e);
}, m.prototype.translateX = function(i) {
  if (i === void 0) return this.G.state.Gn.lr;
  this.G.state.Gn.Er(i, 0, 0);
}, m.prototype.translateY = function(i) {
  if (i === void 0) return this.G.state.Gn.dr;
  this.G.state.Gn.Er(0, i, 0);
}, m.prototype.translateZ = function(i) {
  if (i === void 0) return this.G.state.Gn._r;
  this.G.state.Gn.Er(0, 0, i);
}, m.prototype.scale = function(i, t, e) {
  this.G.state.Gn.Tr(i, t, e);
}, m.prototype.resetMatrix = function() {
  this.G.state.Gn.Rr();
}, m.prototype.applyMatrix = function(...i) {
  let t;
  if (i.length === 1 && typeof i[0] != "number") t = i[0];
  else {
    if (i.length !== 16) throw Error("applyMatrix() expects either a 16-length array-like or 16 numeric arguments.");
    t = i;
  }
  if (t.length !== 16) throw Error("applyMatrix() expects exactly 16 values.");
  for (let e = 0; e < 16; e++) He[e] = Number(t[e] ?? 0);
  this.G.state.Gn.Or(He);
}, m.prototype.push = function() {
  this.G.state.ze();
}, m.prototype.pop = function() {
  this.G.state.He();
}, Object.defineProperty(m.prototype, "windowWidth", { get: function() {
  return window.innerWidth;
}, configurable: !0, enumerable: !0 }), Object.defineProperty(m.prototype, "windowHeight", { get: function() {
  return window.innerHeight;
}, configurable: !0, enumerable: !0 }), Object.defineProperty(m.prototype, "displayWidth", { get: function() {
  return screen.width;
}, configurable: !0, enumerable: !0 }), Object.defineProperty(m.prototype, "displayHeight", { get: function() {
  return screen.height;
}, configurable: !0, enumerable: !0 }), m.prototype.color = function(i, t, e, s) {
  return this.Wm(i, t, e, s);
}, m.prototype.colorMode = function(i, t, e, s, r) {
  const n = this.G.state.yn;
  if (i === void 0) return n.Rn();
  const h = (function(a, c, u, l, f) {
    if (a !== "rgb" && a !== "hsb" && a !== "hsl") throw Error("colorMode() mode must be 'rgb', 'hsb', or 'hsl'.");
    let d = ds(a);
    if (c !== void 0 && u === void 0 && l === void 0 && f === void 0) d = [c, c, c, c];
    else if (c !== void 0 || u !== void 0 || l !== void 0 || f !== void 0) {
      if (c === void 0 || u === void 0 || l === void 0) throw Error("colorMode() expects either one shared max or max1, max2, and max3.");
      d = [c, u, l, f ?? d[3]];
    }
    for (const p of d) if (!Number.isFinite(p) || p <= 0) throw Error("colorMode() max values must be finite numbers greater than 0.");
    return { mode: a, maxes: d };
  })(i, t, e, s, r);
  n.On(h.mode, h.maxes);
}, m.prototype.background = function(i, t, e, s = 255) {
  var n;
  if (i === void 0) {
    const [h, a, c, u] = this.G.state.yn.Fs;
    return S.Zc(h, a, c, u);
  }
  const r = this.Wm(i, t, e, s);
  this.G.state.yn.Dn(r.r, r.g, r.b, r.a), (n = this.ne) == null || n.le(r.normalized), this.G.mc(r.r, r.g, r.b, r.a);
}, m.prototype.clear = function() {
  var i;
  (i = this.ne) == null || i.fe(), this.G.state.yn.kn(), this.G.Oh(0, 0, 0, 0);
};
const Tr = Ss(function() {
  return this.G.state.yn.hn;
}, function(i) {
  this.G.state.yn.Sn(i.r, i.g, i.b, i.a);
});
m.prototype.charColor = Tr, Fs("stroke", "charColor");
const Fr = Ss(function() {
  return this.G.state.yn.an;
}, function(i) {
  this.G.state.yn.En(i.r, i.g, i.b, i.a);
});
function $e(i) {
  if (typeof i != "object" || i === null) return !1;
  const t = i;
  return typeof t.x == "number" && typeof t.y == "number" && typeof t.z == "number";
}
m.prototype.cellColor = Fr, Fs("fill", "cellColor"), m.prototype.char = function(i) {
  if (i === void 0) return this.G.state.yn.nn;
  const t = typeof i == "number" ? this.font.characters[i].character : i;
  if (t.length === 0) throw Error("char() requires at least one character.");
  this.G.state.yn.Cn(this.font.jt(t)), this.G.state.yn.xn(t);
}, m.prototype.flipX = function(i) {
  if (i === void 0) return this.G.state.yn.ln;
  this.G.state.yn.Fn(i);
}, m.prototype.flipY = function(i) {
  if (i === void 0) return this.G.state.yn.dn;
  this.G.state.yn.Tn(i);
}, m.prototype.charRotation = function(i) {
  if (i === void 0) return 360 * this.G.state.yn.pn;
  this.G.state.yn.Ln(i);
}, m.prototype.invert = function(i) {
  if (i === void 0) return this.G.state.yn._n;
  this.G.state.yn.Pn(i);
}, m.prototype.ambientLight = function(i, t, e, s) {
  const r = S.Vc(i, t, e, s), [n, h, a] = r.normalized;
  this.G.state.ee.qr(n, h, a);
}, m.prototype.pointLight = function(i, t, e, s, r, n) {
  let h, a;
  if (typeof i == "number" && typeof t == "number" && typeof e == "number") if (h = S.Vc(i, t, e), $e(s)) a = s;
  else {
    if (typeof s != "number" || typeof r != "number" || typeof n != "number") throw Error("pointLight() expected RGB + XYZ or RGB + { x, y, z }.");
    a = { x: s, y: r, z: n };
  }
  else if (h = S.Vc(i), $e(t)) a = t;
  else {
    if (typeof t != "number" || typeof e != "number" || typeof s != "number") throw Error("pointLight() expected color + XYZ or color + { x, y, z }.");
    a = { x: t, y: e, z: s };
  }
  const [c, u, l] = h.normalized;
  this.G.state.ee.Jr(c, u, l, a.x, a.y, a.z);
}, m.prototype.lightFalloff = function(i, t, e) {
  this.G.state.ee.tn(i, t, e);
}, m.prototype.noLights = function() {
  this.G.state.ee.sn();
}, m.prototype.shader = function(i) {
  this.G.Va(i);
}, m.prototype.resetShader = function() {
  this.G.Xa();
}, m.prototype.setUniform = function(i, t) {
  this.G.cr(i, t);
}, m.prototype.setUniforms = function(i) {
  this.G.ae(i);
}, m.prototype.createMaterialShader = async function(i) {
  const t = await kt(i), e = this.G.Wa(t);
  return this.Km(e), e;
}, m.prototype.createFilterShader = async function(i) {
  return this.createMaterialShader(i);
}, m.prototype.createShader = async function(i, t) {
  const e = await kt(i), s = await kt(t), r = this.G.nr(e, s);
  return this.Km(r), r;
};
class Lt extends At {
  constructor(e, s, r, n, h, a, c, u, l, f) {
    super(e, s, r, n, h, a, c, u, f);
    o(this, "Kt");
    this.Kt = l;
  }
  static ag(e, s, r, n, h, a) {
    const c = e.context, { texture: u, width: l, height: f } = ye(c, r);
    return new Lt(c, e, u, s, l, f, n, h, r, a);
  }
  $() {
    this.Kt instanceof HTMLVideoElement ? this.Kt.readyState >= this.Kt.HAVE_CURRENT_DATA && Wt(this.Fe, this.Vn, this.Kt) : Wt(this.Fe, this.Vn, this.Kt);
  }
  Xe() {
    return this.el(), super.Xe();
  }
  Ja() {
    return this.el(), super.Ja();
  }
  qu() {
    this.$();
  }
  fa() {
    this.$();
  }
  get source() {
    return this.Kt;
  }
}
class ht extends Lt {
  constructor(t, e, s, r, n, h, a, c, u, l) {
    super(t, e, s, r, h, a, c, u, n, l);
  }
  dispose() {
    super.dispose(), this.cg.pause(), this.cg.src = "", this.cg.load();
  }
  static async ug(t) {
    const e = document.createElement("video");
    return e.crossOrigin = "anonymous", e.loop = !0, e.muted = !0, e.playsInline = !0, await new Promise((s, r) => {
      e.addEventListener("loadedmetadata", () => s(), { once: !0 }), e.addEventListener("error", (n) => {
        var a;
        const h = n.target;
        r(Error("Failed to load video: " + (((a = h.error) == null ? void 0 : a.message) || "Unknown error")));
      }, { once: !0 }), e.src = t;
    }), e;
  }
  static ag(t, e, s, r, n, h) {
    const a = t.context, { texture: c, width: u, height: l } = ye(a, s, a.LINEAR, a.LINEAR, a.CLAMP_TO_EDGE, a.CLAMP_TO_EDGE);
    return new ht(a, t, c, e, s, u, l, r, n, h);
  }
  static async nl(t, e, s, r, n, h) {
    const a = await ht.ug(s);
    return ht.ag(t, e, a, r, n, h);
  }
  async play() {
    await this.cg.play();
  }
  pause() {
    this.cg.pause();
  }
  stop() {
    this.cg.pause(), this.cg.currentTime = 0;
  }
  speed(t) {
    return this.cg.playbackRate = t, this;
  }
  loop(t = !0) {
    return this.cg.loop = t, this;
  }
  time(t) {
    return this.cg.currentTime = t, this;
  }
  volume(t) {
    return this.cg.volume = X(t, 0, 1), this;
  }
  get videoElement() {
    return this.cg;
  }
  get currentTime() {
    return this.cg.currentTime;
  }
  get duration() {
    return this.cg.duration;
  }
  get isPlaying() {
    return !this.cg.paused && !this.cg.ended;
  }
  get cg() {
    return this.Kt;
  }
}
m.prototype.createFramebuffer = function(i) {
  const t = this.G.Z(i.width ?? this.grid.cols, i.height ?? this.grid.rows, i.attachments ?? 3);
  return this.Km(t), t;
}, m.prototype.image = function(i, t, e) {
  this.G.$a(i, t, e, this.font), i instanceof gt && this.G.Ge();
}, m.prototype.loadImage = async function(i) {
  const t = i, e = new Promise((h, a) => {
    const c = new Image();
    c.crossOrigin = "anonymous", c.onload = () => h(c), c.onerror = (u) => a(u), c.src = t;
  }), [s] = await Promise.all([e, this.Dm]), r = this.grid;
  if (!r) throw Error("[textmode.js] Cannot load image before grid initialization completes.");
  const n = Pt.nl(this.G, this.vm, s, r.cols, r.rows, this.Wm);
  return this.Km(n), n;
}, m.prototype.loadVideo = async function(i) {
  const [t] = await Promise.all([ht.ug(i), this.Dm]), e = this.grid;
  if (!e) throw Error("[textmode.js] Cannot load video before grid initialization completes.");
  const s = ht.ag(this.G, this.vm, t, e.cols, e.rows, this.Wm);
  return this.Km(s), s;
}, m.prototype.createTexture = function(i) {
  const t = this.grid, e = Lt.ag(this.G, this.vm, i, (t == null ? void 0 : t.cols) ?? 1, (t == null ? void 0 : t.rows) ?? 1, this.Wm);
  return this.Km(e), e;
}, m.prototype.texture = function(i) {
  if (i instanceof gt) return void this.G.state.Vn.jn(i);
  if (!(i instanceof At)) throw new _("[textmode.js] texture() expects a TextmodeImage, TextmodeVideo, TextmodeTexture, or TextmodeFramebuffer source.", { method: "texture", providedValue: i });
  const t = i.sl(this.font);
  i.tc() && this.G.Ga(i), this.G.state.Vn.Nn(t);
}, m.prototype.noTexture = function() {
  this.G.state.Vn.Qn();
};
const Sr = { BLEND_NORMAL: L.NORMAL, BLEND_ADDITIVE: L.ADDITIVE, BLEND_MULTIPLY: L.MULTIPLY, BLEND_SCREEN: L.SCREEN, BLEND_SUBTRACT: L.SUBTRACT, BLEND_DARKEN: L.DARKEN, BLEND_LIGHTEN: L.LIGHTEN, BLEND_OVERLAY: L.OVERLAY, BLEND_SOFT_LIGHT: L.SOFT_LIGHT, BLEND_HARD_LIGHT: L.HARD_LIGHT, BLEND_COLOR_DODGE: L.COLOR_DODGE, BLEND_COLOR_BURN: L.COLOR_BURN, BLEND_DIFFERENCE: L.DIFFERENCE, BLEND_EXCLUSION: L.EXCLUSION };
for (const [i, t] of Object.entries(Sr)) Object.defineProperty(m.prototype, i, { configurable: !0, enumerable: !1, value: t, writable: !1 });
m.prototype.on = function(i, t) {
  return this.pm.Ol(i, t);
}, m.prototype.off = function(i, t) {
  this.pm.Bl(i, t);
}, m.prototype.once = function(i, t) {
  return this.pm.Il(i, t);
}, m.prototype.random = function(i, t) {
  return Array.isArray(i) ? this.Fm.random(i) : typeof i != "number" ? this.Fm.random() : typeof t != "number" ? this.Fm.random(i) : this.Fm.random(i, t);
}, m.prototype.randomGaussian = function(i, t) {
  return this.Fm.randomGaussian(i, t);
}, m.prototype.randomSeed = function(i) {
  this.Tm = xe(i), this.Fm.randomSeed(i), this.Pm.clear(), this.Lm.noiseSeed(me(this.Tm, "noise"));
}, m.prototype.randomStream = function(i) {
  const t = i + "", e = this.Pm.get(t);
  if (e) return e;
  const s = new qt(me(this.Tm, t));
  return this.Pm.set(t, s), s;
}, m.prototype.noise = function(i, t, e) {
  return this.Lm.noise(i, t, e);
}, m.prototype.noiseSeed = function(i) {
  this.Lm.noiseSeed(i);
}, m.prototype.noiseDetail = function(i, t) {
  this.Lm.noiseDetail(i, t);
};
class Vt {
  constructor(t = 0, e = 0, s = 0) {
    o(this, "x");
    o(this, "y");
    o(this, "z");
    this.x = t, this.y = e, this.z = s;
  }
  set(t, e, s) {
    return Ce(t) ? (this.x = t.x, this.y = t.y, this.z = t.z ?? 0, this) : Te(t) ? (this.x = t[0] ?? 0, this.y = t[1] ?? 0, this.z = t[2] ?? 0, this) : (this.x = t ?? 0, this.y = e ?? 0, this.z = s ?? 0, this);
  }
  copy() {
    return new Vt(this.x, this.y, this.z);
  }
  add(t, e, s) {
    const [r, n, h] = qe(t, e, s);
    return this.x += r, this.y += n, this.z += h, this;
  }
  sub(t, e, s) {
    const [r, n, h] = qe(t, e, s);
    return this.x -= r, this.y -= n, this.z -= h, this;
  }
  mult(t, e, s) {
    const [r, n, h] = Qe(t, e, s);
    return this.x *= r, this.y *= n, this.z *= h, this;
  }
  div(t, e, s) {
    const [r, n, h] = Qe(t, e, s);
    return this.x /= r, this.y /= n, this.z /= h, this;
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
    const [r, n, h] = Xt(t, e, s);
    return Math.hypot(this.x - r, this.y - n, this.z - h);
  }
  dot(t, e, s) {
    const [r, n, h] = Xt(t, e, s);
    return this.x * r + this.y * n + this.z * h;
  }
  cross(t, e, s) {
    const [r, n, h] = Xt(t, e, s);
    return new Vt(this.y * h - this.z * n, this.z * r - this.x * h, this.x * n - this.y * r);
  }
  heading() {
    return vt(Math.atan2(this.y, this.x));
  }
}
function Ce(i) {
  return typeof i == "object" && i !== null && "x" in i && "y" in i && typeof i.x == "number" && typeof i.y == "number";
}
function Te(i) {
  return Array.isArray(i);
}
function Xt(i, t, e) {
  return Ce(i) ? [i.x, i.y, i.z ?? 0] : Te(i) ? [i[0] ?? 0, i[1] ?? 0, i[2] ?? 0] : [i ?? 0, t ?? 0, e ?? 0];
}
function qe(i, t, e) {
  return Xt(i, t, e);
}
function Qe(i, t, e) {
  if (Ce(i)) return [i.x, i.y, i.z ?? 1];
  if (Te(i)) {
    if (i.length === 1) {
      const s = i[0] ?? 1;
      return [s, s, s];
    }
    return [i[0] ?? 1, i[1] ?? 1, i[2] ?? 1];
  }
  return i !== void 0 && t === void 0 && e === void 0 ? [i, i, i] : [i ?? 1, t ?? 1, e ?? 1];
}
m.prototype.sin = Math.sin, m.prototype.cos = Math.cos, m.prototype.tan = Math.tan, m.prototype.asin = Math.asin, m.prototype.acos = Math.acos, m.prototype.atan = Math.atan, m.prototype.atan2 = Math.atan2, m.prototype.floor = Math.floor, m.prototype.ceil = Math.ceil, m.prototype.round = function(i, t = 0) {
  if (t <= 0) return Math.round(i);
  const e = Math.pow(10, t);
  return Math.round(i * e) / e;
}, m.prototype.abs = Math.abs, m.prototype.min = function(...i) {
  const t = Array.isArray(i[0]) ? i[0] : i;
  return Math.min(...t);
}, m.prototype.max = function(...i) {
  const t = Array.isArray(i[0]) ? i[0] : i;
  return Math.max(...t);
}, m.prototype.sq = function(i) {
  return i * i;
}, m.prototype.sqrt = Math.sqrt, m.prototype.pow = Math.pow, m.prototype.fract = function(i) {
  return i - Math.floor(i);
}, m.prototype.exp = Math.exp, m.prototype.log = Math.log, m.prototype.lerp = function(i, t, e) {
  return i + (t - i) * e;
}, m.prototype.ease = function(i, t) {
  return Js(i, t);
}, m.prototype.map = function(i, t, e, s, r) {
  return s + (r - s) * (i - t) / (e - t);
}, m.prototype.norm = function(i, t, e) {
  return this.map(i, t, e, 0, 1);
}, m.prototype.constrain = function(i, t, e) {
  return X(i, t, e);
}, m.prototype.clamp = function(i, t, e) {
  return X(i, t, e);
}, m.prototype.dist = function(i, t, e, s) {
  return _t(i, t, e, s);
}, m.prototype.degrees = function(i) {
  return vt(i);
}, m.prototype.radians = function(i) {
  return V(i);
}, m.prototype.createVector = function(i = 0, t = 0, e = 0) {
  return new Vt(i, t, e);
};
class Fe {
  constructor(t) {
    o(this, "lg");
    o(this, "characters");
    o(this, "length");
    const e = Yt(t);
    if (e.length < 2) throw Error("TextmodeGlyphRamp requires at least two characters.");
    this.characters = t, this.length = e.length, this.lg = e;
  }
  at(t, e, s) {
    if (e !== void 0 || s !== void 0) {
      if (e === void 0 || s === void 0) throw Error("TextmodeGlyphRamp.at() range mapping requires both min and max.");
      if (e === s) throw Error("TextmodeGlyphRamp.at() requires min and max to be different.");
      return this.at((t - e) / (s - e));
    }
    const r = (function(h) {
      return Number.isNaN(h) ? 0 : h === 1 / 0 ? 1 : h === -1 / 0 ? 0 : Math.min(Math.max(h, 0), 1);
    })(t), n = Math.min(Math.floor(r * this.length), this.length - 1);
    return this.lg[n];
  }
  shift(t) {
    const e = (Math.trunc(t) % this.length + this.length) % this.length, s = [...this.lg.slice(e), ...this.lg.slice(0, e)].join("");
    return new Fe(s);
  }
}
m.prototype.createGlyphRamp = function(i) {
  return new Fe(i);
};
const Rr = { red: "#ff0000", green: "#00ff00", blue: "#0000ff", yellow: "#ffff00", cyan: "#00ffff", magenta: "#ff00ff", white: "#ffffff", black: "#000000", gray: "#808080", grey: "#808080", orange: "#ffa500", purple: "#800080", pink: "#ffc0cb", brown: "#a52a2a" }, dt = k.FLOATS_PER_INSTANCE, Pr = gs[C.RECTANGLE];
function Lr(i) {
  if (i.startsWith("fg=")) return { kind: "fg", value: i.substring(3).trim() };
  if (i === "/fg") return { kind: "/fg" };
  if (i.startsWith("bg=")) return { kind: "bg", value: i.substring(3).trim() };
  if (i === "/bg") return { kind: "/bg" };
  if (i.startsWith("rot=")) {
    const t = i.substring(4).trim(), e = t.length > 0 ? Number(t) : NaN;
    return { kind: "rot", value: Number.isFinite(e) ? e : void 0 };
  }
  return i === "/rot" ? { kind: "/rot" } : i === "inv" ? { kind: "inv" } : i === "/inv" ? { kind: "/inv" } : i === "fx" ? { kind: "fx" } : i === "/fx" ? { kind: "/fx" } : i === "fy" ? { kind: "fy" } : i === "/fy" ? { kind: "/fy" } : void 0;
}
function Dr(i, t, e, s, r) {
  let n = new Float32Array(Math.max(16, Math.min(i.length, 256)) * dt);
  const h = [], a = [], c = (function(y) {
    const g = y.G.state.yn;
    return { fg: [ts(g.hn)], bg: [ts(g.an)], invert: [g._n], flipX: [g.ln], flipY: [g.dn], charRotation: [g.pn] };
  })(this), u = this.font;
  let l = 0, f = 0, d = 0, p = 0, v = 0;
  const w = (y) => {
    ((x) => {
      if (x * dt <= n.length) return;
      let F = n.length / dt;
      for (; F < x; ) F *= 2;
      const T = new Float32Array(F * dt);
      T.set(n), n = T;
    })(l + 1);
    const g = l * dt, b = u.jt(y), M = c.fg[c.fg.length - 1], A = c.bg[c.bg.length - 1];
    n[g + 0] = d * (1 + r), n[g + 1] = f * e, n[g + 2] = 1, n[g + 3] = 1, n[g + 4] = b[0], n[g + 5] = b[1], n[g + 6] = b[2], n[g + 7] = M[0], n[g + 8] = M[1], n[g + 9] = M[2], n[g + 10] = M[3], n[g + 11] = A[0], n[g + 12] = A[1], n[g + 13] = A[2], n[g + 14] = A[3], n[g + 15] = c.invert[c.invert.length - 1] ? 1 : 0, n[g + 16] = c.flipX[c.flipX.length - 1] ? 1 : 0, n[g + 17] = c.flipY[c.flipY.length - 1] ? 1 : 0, n[g + 18] = c.charRotation[c.charRotation.length - 1], n[g + 19] = 0, n[g + 20] = 0, n[g + 21] = 0, n[g + 22] = 0, n[g + 23] = 0, n[g + 24] = 0, n[g + 25] = 0, n[g + 26] = 0, n[g + 27] = 0, n[g + 28] = 0, n[g + 29] = 0, n[g + 30] = 0, n[g + 31] = 0, n[g + 32] = 0, n[g + 33] = 0, n[g + 34] = 0, n[g + 35] = Pr, h[l] = f, l++;
  };
  for (; v < i.length; ) {
    const y = i[v];
    if (y !== `
`) if (t && y === "[" && i[v + 1] === "[") w("["), p++, d++, v += 2;
    else if (t && y === "]" && i[v + 1] === "]") w("]"), p++, d++, v += 2;
    else {
      if (t && y === "[") {
        const g = i.indexOf("]", v);
        if (g !== -1) {
          const b = Lr(i.substring(v + 1, g));
          if (b) {
            Ur(b, c), v = g + 1;
            continue;
          }
        }
      }
      y !== "	" ? (w(y), p++, d++, v++) : (p++, d += s, v++);
    }
    else a.push(p), p = 0, f++, d = 0, v++;
  }
  return a.push(p), { data: n, glyphLines: h, glyphCount: l, lineWidths: a };
}
function Ur(i, t) {
  i.kind === "fg" ? Je(t.fg, i.value) : i.kind === "/fg" ? ft(t.fg) : i.kind === "bg" ? Je(t.bg, i.value) : i.kind === "/bg" ? ft(t.bg) : i.kind === "inv" ? t.invert.push(!0) : i.kind === "/inv" ? ft(t.invert) : i.kind === "fx" ? t.flipX.push(!0) : i.kind === "/fx" ? ft(t.flipX) : i.kind === "fy" ? t.flipY.push(!0) : i.kind === "/fy" ? ft(t.flipY) : i.kind === "rot" ? t.charRotation.push(i.value === void 0 ? t.charRotation[t.charRotation.length - 1] : Kt(i.value)) : i.kind === "/rot" && ft(t.charRotation);
}
function Je(i, t) {
  const e = Rr[t.toLowerCase()] || t;
  try {
    i.push([(s = S.Vc(e)).r / 255, s.g / 255, s.b / 255, s.a / 255]);
  } catch {
    i.push(i[i.length - 1]);
  }
  var s;
}
function ts(i) {
  return [i[0], i[1], i[2], i[3]];
}
function ft(i) {
  i.length > 1 && i.pop();
}
m.prototype.printAlign = function(i, t = "top") {
  this.dg = i, this._g = t;
}, m.prototype.print = function(i, t, e, s) {
  const r = (s == null ? void 0 : s.leading) ?? 1, n = (s == null ? void 0 : s.tabSize) ?? 4, h = (s == null ? void 0 : s.letterSpacing) ?? 0, a = (s == null ? void 0 : s.markup) !== !1, c = this.dg || "left", u = this._g || "top", l = Dr.call(this, i, a, r, n, h);
  l.glyphCount !== 0 && ((function(f, d, p, v, w, y, g) {
    const { data: b, glyphLines: M, glyphCount: A, lineWidths: x } = d, F = x.length;
    let T = 0;
    y === "middle" ? T = -Math.floor((F - 1) * g / 2) : y === "bottom" && (T = -(F - 1) * g);
    const E = f.G.state.Gn, R = E.br, P = E.vr, I = E.yr, Z = E.pr, ot = E.mr, at = E.gr;
    for (let W = 0; W < A; W++) {
      const G = W * dt, tt = x[M[W]] ?? 0;
      let H = 0;
      w === "center" ? H = -Math.floor(tt / 2) : w === "right" && (H = -tt);
      const $ = p + H + b[G + 0], q = v + T + b[G + 1];
      b[G + 0] = 0, b[G + 1] = 0, b[G + 2] = P, b[G + 3] = I, b[G + 19] = R[0] * $ + R[4] * q + R[12], b[G + 20] = R[1] * $ + R[5] * q + R[13], b[G + 21] = R[2] * $ + R[6] * q + R[14], b[G + 22] = Z, b[G + 23] = ot, b[G + 24] = at;
    }
  })(this, l, t, e, c, u, r), this.G.Ko(l.data, l.glyphCount));
};
const Zr = Object.freeze(Object.defineProperty({ __proto__: null, TextmodeImage: Pt, TextmodeSource: At, TextmodeTexture: Lt, TextmodeVideo: ht }, Symbol.toStringTag, { value: "Module" })), Wr = Object.freeze(Object.defineProperty({ __proto__: null, INPUT_EVENT_NAMES: qi, gamepad: _r, keyboard: Ar, mouse: br, touch: Mr }, Symbol.toStringTag, { value: "Module" })), jr = Object.freeze(Object.defineProperty({ __proto__: null }, Symbol.toStringTag, { value: "Module" })), Vr = Ee.create, Kr = Ee.setErrorLevel, Hr = Ee.version;
export {
  hs as ErrorLayerController,
  qi as INPUT_EVENT_NAMES,
  L as LayerBlendMode,
  _s as LoadingLayerController,
  xr as ShapeAssemblyMode,
  qs as TEXTMODE_EASE_NAMES,
  Zt as TEXTMODE_LAYER_BLEND_MODES,
  J as TextmodeCamera,
  Cs as TextmodeConversionManager,
  _ as TextmodeError,
  rs as TextmodeErrorLevel,
  xs as TextmodeFilterManager,
  B as TextmodeFont,
  gt as TextmodeFramebuffer,
  Fe as TextmodeGlyphRamp,
  Us as TextmodeGrid,
  Pt as TextmodeImage,
  K as TextmodeLayer,
  Es as TextmodeLayerManager,
  qt as TextmodeRandom,
  rt as TextmodeShader,
  At as TextmodeSource,
  Lt as TextmodeTexture,
  z as TextmodeTileset,
  Vt as TextmodeVector,
  ht as TextmodeVideo,
  m as Textmodifier,
  Yr as color,
  Xr as conversion,
  Vr as create,
  Or as errors,
  Br as filters,
  Nr as fonts,
  Wr as input,
  kr as layering,
  Ir as loading,
  Zr as media,
  jr as plugins,
  zr as random,
  Kr as setErrorLevel,
  Ee as textmode,
  Hr as version
};
