var Se = Object.defineProperty;
var De = (n, t, e) => t in n ? Se(n, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : n[t] = e;
var a = (n, t, e) => De(n, typeof t != "symbol" ? t + "" : t, e);
class Le {
  constructor(t, e, s) {
    a(this, "i");
    a(this, "h");
    a(this, "o");
    a(this, "u");
    a(this, "l");
    a(this, "_");
    a(this, "m");
    a(this, "v");
    a(this, "A");
    a(this, "M", !1);
    a(this, "C", /* @__PURE__ */ new Set());
    this.m = t, this.v = e, this.A = s, this.reset();
  }
  P() {
    if (this.o = this.i * this.v, this.u = this.h * this.A, this.l = Math.floor((this.m.width - this.o) / 2), this._ = Math.floor((this.m.height - this.u) / 2), this.C.size > 0) for (const t of this.C) t();
  }
  F(t) {
    this.C.add(t);
  }
  S(t) {
    this.C.delete(t);
  }
  reset() {
    this.M || (this.i = Math.max(1, Math.floor(this.m.width / this.v)), this.h = Math.max(1, Math.floor(this.m.height / this.A))), this.P();
  }
  L(t, e) {
    this.v = t, this.A = e, this.reset();
  }
  get cellWidth() {
    return this.v;
  }
  get cellHeight() {
    return this.A;
  }
  get cols() {
    return this.i;
  }
  set cols(t) {
    this.M = !0, this.i = Math.max(1, Math.floor(t)), typeof this.h != "number" && (this.h = Math.max(1, Math.floor(this.m.height / this.A))), this.P();
  }
  get rows() {
    return this.h;
  }
  set rows(t) {
    this.M = !0, this.h = Math.max(1, Math.floor(t)), typeof this.i != "number" && (this.i = Math.max(1, Math.floor(this.m.width / this.v))), this.P();
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
    const s = this.m.getBoundingClientRect(), i = t - s.left, r = e - s.top, h = this.m.width / s.width, o = r * (this.m.height / s.height), c = i * h - this.l, u = o - this._, l = Math.floor(c / this.v), f = Math.floor(u / this.A);
    return l >= 0 && l < this.i && f >= 0 && f < this.h ? { x: l - Math.floor((this.i - 1) / 2), y: f - Math.floor(this.h / 2) } : { x: -1 / 0, y: -1 / 0 };
  }
  O() {
    this.C.clear();
  }
}
const S = { readShort: (n, t) => (S.t.uint16[0] = n[t] << 8 | n[t + 1], S.t.int16[0]), readUshort: (n, t) => n[t] << 8 | n[t + 1], readUshorts(n, t, e) {
  const s = [];
  for (let i = 0; i < e; i++) s.push(S.readUshort(n, t + 2 * i));
  return s;
}, readUint(n, t) {
  const e = S.t.uint8;
  return e[3] = n[t], e[2] = n[t + 1], e[1] = n[t + 2], e[0] = n[t + 3], S.t.uint32[0];
}, readASCII(n, t, e) {
  let s = "";
  for (let i = 0; i < e; i++) s += String.fromCharCode(n[t + i]);
  return s;
}, t: (() => {
  const n = new ArrayBuffer(8);
  return { uint8: new Uint8Array(n), int16: new Int16Array(n), uint16: new Uint16Array(n), uint32: new Uint32Array(n) };
})() };
function Mt(n) {
  return n + 3 & -4;
}
function Tt(n, t, e) {
  n[t] = e >>> 8 & 255, n[t + 1] = 255 & e;
}
function Z(n, t, e) {
  n[t] = e >>> 24 & 255, n[t + 1] = e >>> 16 & 255, n[t + 2] = e >>> 8 & 255, n[t + 3] = 255 & e;
}
function qe(n, t, e) {
  for (let s = 0; s < e.length; s++) n[t + s] = 255 & e.charCodeAt(s);
}
function Xt(n, t, e) {
  const s = t + e;
  let i = 0;
  const r = S.t;
  for (let h = t; h < s; h += 4) r.uint8[3] = n[h] || 0, r.uint8[2] = n[h + 1] || 0, r.uint8[1] = n[h + 2] || 0, r.uint8[0] = n[h + 3] || 0, i = i + (r.uint32[0] >>> 0) >>> 0;
  return i >>> 0;
}
class Ue {
  constructor(t) {
    a(this, "b");
    a(this, "p", 0);
    a(this, "bitbuf", 0);
    a(this, "bitcnt", 0);
    this.b = t;
  }
  readBits(t) {
    for (; this.bitcnt < t; ) {
      const s = this.b[this.p++] || 0;
      this.bitbuf |= s << this.bitcnt, this.bitcnt += 8;
    }
    const e = this.bitbuf & (1 << t) - 1;
    return this.bitbuf >>>= t, this.bitcnt -= t, e;
  }
  alignToByte() {
    this.bitbuf = 0, this.bitcnt = 0;
  }
  get offset() {
    return this.p;
  }
}
function nt(n) {
  let t = 32, e = 0;
  for (const o of n) o && (o < t && (t = o), o > e && (e = o));
  if (e === 0) return { min: 0, max: 0, table: /* @__PURE__ */ new Map() };
  const s = new Uint32Array(e + 1);
  for (const o of n) o && s[o]++;
  const i = new Uint32Array(e + 1);
  let r = 0;
  s[0] = 0;
  for (let o = 1; o <= e; o++) r = r + s[o - 1] << 1, i[o] = r;
  const h = /* @__PURE__ */ new Map();
  for (let o = 0; o < n.length; o++) {
    const c = n[o];
    if (!c) continue;
    const u = i[c]++;
    let l = h.get(c);
    l || (l = [], h.set(c, l)), l[Ne(u, c)] = o;
  }
  return { min: t, max: e, table: h };
}
function It(n, t) {
  let e = 0;
  for (let s = 1; s <= t.max; s++) {
    e |= n.readBits(1) << s - 1;
    const i = t.table.get(s);
    if (i && e < i.length) {
      const r = i[e];
      if (r !== void 0) return r;
    }
  }
  throw Error("Invalid Huffman code");
}
function Ne(n, t) {
  let e = 0;
  for (let s = 0; s < t; s++) e = e << 1 | 1 & n, n >>>= 1;
  return e >>> 0;
}
function Be(n) {
  if (n.length < 2) throw Error("ZLIB data too short");
  const t = n[0], e = n[1];
  if ((15 & t) != 8) throw Error("Unsupported ZLIB compression method");
  if (((t << 8) + e) % 31 != 0) throw Error("Bad ZLIB header check");
  let s = 2;
  32 & e && (s += 4);
  const i = [];
  return (function(r, h) {
    const o = [3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258], c = [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0], u = [1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577], l = [0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13];
    let f = 0;
    for (; !f; ) {
      f = r.readBits(1);
      const d = r.readBits(2);
      if (d === 0) {
        r.alignToByte();
        const y = r.readBits(16);
        if ((65535 & (65535 ^ y)) !== r.readBits(16)) throw Error("DEFLATE uncompressed LEN/NLEN mismatch");
        for (let v = 0; v < y; v++) h.push(r.readBits(8));
      } else {
        if (d !== 1 && d !== 2) throw Error("Unsupported DEFLATE type");
        {
          let y, v;
          if (d === 1) {
            const g = Array(288).fill(0);
            for (let m = 0; m <= 143; m++) g[m] = 8;
            for (let m = 144; m <= 255; m++) g[m] = 9;
            for (let m = 256; m <= 279; m++) g[m] = 7;
            for (let m = 280; m <= 287; m++) g[m] = 8;
            y = nt(g), v = nt(Array(32).fill(5));
          } else {
            const g = r.readBits(5) + 257, m = r.readBits(5) + 1, A = r.readBits(4) + 4, w = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15], b = Array(19).fill(0);
            for (let P = 0; P < A; P++) b[w[P]] = r.readBits(3);
            const C = nt(b), x = [];
            for (; x.length < g + m; ) {
              const P = It(r, C);
              if (P <= 15) x.push(P);
              else if (P === 16) {
                const U = r.readBits(2) + 3, L = x[x.length - 1] || 0;
                for (let k = 0; k < U; k++) x.push(L);
              } else if (P === 17) {
                const U = r.readBits(3) + 3;
                for (let L = 0; L < U; L++) x.push(0);
              } else {
                if (P !== 18) throw Error("Invalid code length symbol");
                {
                  const U = r.readBits(7) + 11;
                  for (let L = 0; L < U; L++) x.push(0);
                }
              }
            }
            const F = x.slice(0, g), O = x.slice(g, g + m);
            y = nt(F), v = nt(O);
          }
          for (; ; ) {
            const g = It(r, y);
            if (g < 256) h.push(g);
            else {
              if (g === 256) break;
              if (g > 256 && g < 286) {
                const m = g - 257;
                let A = o[m];
                const w = c[m];
                w && (A += r.readBits(w));
                const b = It(r, v);
                if (b >= 30) throw Error("Invalid distance symbol");
                let C = u[b];
                const x = l[b];
                x && (C += r.readBits(x));
                const F = h.length - C;
                if (F < 0) throw Error("Invalid distance");
                for (let O = 0; O < A; O++) h.push(h[F + O] || 0);
              } else if (g === 286 || g === 287) throw Error("Reserved length symbol");
            }
          }
        }
      }
    }
  })(new Ue(n.subarray(s)), i), new Uint8Array(i);
}
function Xe(n) {
  const t = S, e = new Uint8Array(n);
  if (t.readASCII(e, 0, 4) !== "wOFF") throw Error("Invalid WOFF signature");
  const s = t.readUint(e, 4), i = t.readUshort(e, 12), r = t.readUint(e, 16), h = [];
  let o = 44;
  for (let A = 0; A < i; A++) {
    const w = t.readASCII(e, o, 4), b = t.readUint(e, o + 4), C = t.readUint(e, o + 8), x = t.readUint(e, o + 12), F = t.readUint(e, o + 16);
    h.push({ tag: w, offset: b, compLength: C, origLength: x, checksum: F }), o += 20;
  }
  for (const A of h) {
    const w = new Uint8Array(e.buffer, A.offset, A.compLength);
    if (A.compLength === A.origLength) A.data = new Uint8Array(w);
    else if (A.data = Be(w), A.data.length !== A.origLength) if (A.data.length < A.origLength) {
      const b = new Uint8Array(A.origLength);
      b.set(A.data), A.data = b;
    } else A.data = A.data.subarray(0, A.origLength);
  }
  const c = i;
  let u = 1, l = 0;
  for (; u << 1 <= c; ) u <<= 1, l++;
  const f = 16 * u, d = 16 * c - f;
  let y = 12 + 16 * c;
  const v = {};
  for (const A of h) v[A.tag] = y, y = Mt(y + A.data.length);
  const g = new Uint8Array(Math.max(r || 0, y));
  Z(g, 0, s), Tt(g, 4, c), Tt(g, 6, f), Tt(g, 8, l), Tt(g, 10, d);
  let m = 12;
  for (const A of h) {
    qe(g, m, A.tag), m += 4;
    const w = A.data;
    if (A.tag === "head" && w.length >= 12) {
      const b = new Uint8Array(w);
      Z(b, 8, 0), Z(g, m, Xt(b, 0, Mt(b.length))), m += 4;
    } else
      Z(g, m, Xt(w, 0, Mt(w.length))), m += 4;
    Z(g, m, v[A.tag]), m += 4, Z(g, m, A.data.length), m += 4;
  }
  for (const A of h) {
    const w = v[A.tag];
    g.set(A.data, w);
  }
  if (h.find((A) => A.tag === "head")) {
    const A = v.head, w = (function(b, C) {
      const x = C + 8, F = [b[x], b[x + 1], b[x + 2], b[x + 3]];
      Z(b, x, 0);
      const O = 2981146554 - (Xt(b, 0, Mt(b.length)) >>> 0) >>> 0;
      return b[x] = F[0], b[x + 1] = F[1], b[x + 2] = F[2], b[x + 3] = F[3], O >>> 0;
    })(g, A);
    Z(g, A + 8, w);
  }
  return g.buffer;
}
const Ie = { parseTab(n, t, e) {
  const s = { tables: [], ids: {}, off: t };
  n = new Uint8Array(n.buffer, t, e), t = 0;
  const i = S, r = i.readUshort;
  r(n, t);
  const h = r(n, t += 2);
  t += 2;
  const o = [];
  for (let c = 0; c < h; c++) {
    const u = r(n, t), l = r(n, t += 2);
    t += 2;
    const f = i.readUint(n, t);
    t += 4;
    const d = `p${u}e${l}`;
    let y = o.indexOf(f);
    if (y === -1) {
      let v;
      y = s.tables.length, o.push(f);
      const g = r(n, f);
      v = g === 4 ? this.parse4(n, f) : g === 12 ? this.parse12(n, f) : { format: g }, s.tables.push(v);
    }
    s.ids[d] = y;
  }
  return s;
}, parse4(n, t) {
  const e = S, s = e.readUshort, i = e.readUshorts, r = t, h = s(n, t += 2);
  s(n, t += 2);
  const o = s(n, t += 2) >>> 1, c = { format: 4, searchRange: s(n, t += 2), entrySelector: 0, rangeShift: 0, endCount: [], startCount: [], idDelta: [], idRangeOffset: [], glyphIdArray: [] };
  t += 2, c.entrySelector = s(n, t), t += 2, c.rangeShift = s(n, t), t += 2, c.endCount = i(n, t, o), t += 2 * o, t += 2, c.startCount = i(n, t, o), t += 2 * o;
  for (let u = 0; u < o; u++) c.idDelta.push(e.readShort(n, t)), t += 2;
  return c.idRangeOffset = i(n, t, o), t += 2 * o, c.glyphIdArray = i(n, t, r + h - t >> 1), c;
}, parse12(n, t) {
  const e = S.readUint;
  e(n, t += 4), e(n, t += 4);
  const s = e(n, t += 4);
  t += 4;
  const i = new Uint32Array(3 * s);
  for (let r = 0; r < 3 * s; r += 3) i[r] = e(n, t + (r << 2)), i[r + 1] = e(n, t + (r << 2) + 4), i[r + 2] = e(n, t + (r << 2) + 8);
  return { format: 12, groups: i };
} }, ke = { parseTab(n, t, e) {
  const s = S;
  t += 18;
  const i = s.readUshort(n, t);
  t += 2, t += 16;
  const r = s.readShort(n, t);
  t += 2;
  const h = s.readShort(n, t);
  t += 2;
  const o = s.readShort(n, t);
  t += 2;
  const c = s.readShort(n, t);
  return t += 2, t += 6, { unitsPerEm: i, xMin: r, yMin: h, xMax: o, yMax: c, indexToLocFormat: s.readShort(n, t) };
} }, ze = { parseTab(n, t, e) {
  const s = S;
  t += 4;
  const i = s.readShort, r = s.readUshort;
  return { ascender: i(n, t), descender: i(n, t + 2), lineGap: i(n, t + 4), advanceWidthMax: r(n, t + 6), minLeftSideBearing: i(n, t + 8), minRightSideBearing: i(n, t + 10), xMaxExtent: i(n, t + 12), caretSlopeRise: i(n, t + 14), caretSlopeRun: i(n, t + 16), caretOffset: i(n, t + 18), res0: i(n, t + 20), res1: i(n, t + 22), res2: i(n, t + 24), res3: i(n, t + 26), metricDataFormat: i(n, t + 28), numberOfHMetrics: r(n, t + 30) };
} }, He = { parseTab(n, t, e, s) {
  const i = S, r = [], h = [], o = s.maxp.numGlyphs, c = s.hhea.numberOfHMetrics;
  let u = 0, l = 0, f = 0;
  for (; f < c; ) u = i.readUshort(n, t + (f << 2)), l = i.readShort(n, t + (f << 2) + 2), r.push(u), h.push(l), f++;
  for (; f < o; ) r.push(u), h.push(l), f++;
  return { aWidth: r, lsBearing: h };
} }, re = { cmap: Ie, head: ke, hhea: ze, maxp: { parseTab(n, t, e) {
  const s = S;
  return s.readUint(n, t), t += 4, { numGlyphs: s.readUshort(n, t) };
} }, hmtx: He, loca: { parseTab(n, t, e, s) {
  const i = S, r = [], h = s.head.indexToLocFormat, o = s.maxp.numGlyphs + 1;
  if (h === 0) for (let c = 0; c < o; c++) r.push(i.readUshort(n, t + (c << 1)) << 1);
  else if (h === 1) for (let c = 0; c < o; c++) r.push(i.readUint(n, t + (c << 2)));
  return r;
} }, glyf: { parseTab(n, t, e, s) {
  const i = [], r = s.maxp.numGlyphs;
  for (let h = 0; h < r; h++) i.push(null);
  return i;
}, D(n, t) {
  const e = S, s = n.k, i = n.loca;
  if (i[t] === i[t + 1]) return null;
  const r = qt.findTable(s, "glyf", n.R);
  if (!r) return null;
  let h = r[0] + i[t];
  const o = {};
  if (o.noc = e.readShort(s, h), h += 2, o.xMin = e.readShort(s, h), h += 2, o.yMin = e.readShort(s, h), h += 2, o.xMax = e.readShort(s, h), h += 2, o.yMax = e.readShort(s, h), h += 2, o.xMin >= o.xMax || o.yMin >= o.yMax) return null;
  if (o.noc > 0) {
    o.endPts = [];
    for (let d = 0; d < o.noc; d++) o.endPts.push(e.readUshort(s, h)), h += 2;
    const c = e.readUshort(s, h);
    if (h += 2, s.length - h < c) return null;
    h += c;
    const u = o.endPts[o.noc - 1] + 1;
    o.flags = [];
    for (let d = 0; d < u; d++) {
      const y = s[h];
      if (h++, o.flags.push(y), 8 & y) {
        const v = s[h];
        h++;
        for (let g = 0; g < v; g++) o.flags.push(y), d++;
      }
    }
    o.xs = [];
    for (let d = 0; d < u; d++) {
      const y = o.flags[d], v = !!(16 & y);
      2 & y ? (o.xs.push(v ? s[h] : -s[h]), h++) : v ? o.xs.push(0) : (o.xs.push(e.readShort(s, h)), h += 2);
    }
    o.ys = [];
    for (let d = 0; d < u; d++) {
      const y = o.flags[d], v = !!(32 & y);
      4 & y ? (o.ys.push(v ? s[h] : -s[h]), h++) : v ? o.ys.push(0) : (o.ys.push(e.readShort(s, h)), h += 2);
    }
    let l = 0, f = 0;
    for (let d = 0; d < u; d++) l += o.xs[d], f += o.ys[d], o.xs[d] = l, o.ys[d] = f;
  } else o.parts = [], o.endPts = [], o.flags = [], o.xs = [], o.ys = [];
  return o;
} } }, qt = { parse(n) {
  const t = new Uint8Array(n);
  S.readASCII(t, 0, 4) === "wOFF" && (n = Xe(n));
  const e = new Uint8Array(n), s = re, i = {}, r = { k: e, j: 0, R: 0 };
  for (const h in s) {
    const o = h, c = qt.findTable(e, o, 0);
    if (c) {
      const [u, l] = c;
      let f = i[u];
      f == null && (f = s[o].parseTab(e, u, l, r), i[u] = f), Object.assign(r, { [o]: f });
    }
  }
  return [r];
}, findTable(n, t, e) {
  const s = S, i = s.readUshort(n, e + 4);
  let r = e + 12;
  for (let h = 0; h < i; h++) {
    const o = s.readASCII(n, r, 4);
    s.readUint(n, r + 4);
    const c = s.readUint(n, r + 8), u = s.readUint(n, r + 12);
    if (o === t) return [c, u];
    r += 16;
  }
  return null;
}, T: re, B: S };
class dt {
  constructor() {
    a(this, "H", /* @__PURE__ */ new Set());
  }
  I(t) {
    this.H.add(t);
  }
  dispose() {
    for (const t of this.H) t();
    this.H.clear();
  }
}
class _ extends Error {
  constructor(t, e, s) {
    super(_.N(t, e, s)), this.name = "TextmodeError";
  }
  static N(t, e, s = {}) {
    const { includeContext: i = !0, includeFooterArrows: r = !0 } = s;
    return `${t}${i && e && Object.keys(e).length > 0 ? `

📋 Context:` + Object.entries(e).map(([h, o]) => `
  - ${h}: ${_.G(o)}`).join("") : ""}${r ? `

${"↓".repeat(24)}
` : `

`}`;
  }
  static G(t) {
    if (t === null) return "null";
    if (t === void 0) return "undefined";
    if (typeof t == "string") return `"${t}"`;
    if (typeof t == "number" || typeof t == "boolean") return t + "";
    if (Array.isArray(t)) return t.length === 0 ? "[]" : t.length <= 5 ? `[${t.map((e) => _.G(e)).join(", ")}]` : `[${t.slice(0, 3).map((e) => _.G(e)).join(", ")}, ... +${t.length - 3} more]`;
    if (typeof t == "object") {
      const e = Object.keys(t);
      return e.length === 0 ? "{}" : e.length <= 3 ? `{ ${e.map((s) => `${s}: ${_.G(t[s])}`).join(", ")} }` : `{ ${e.slice(0, 2).map((s) => `${s}: ${_.G(t[s])}`).join(", ")}, ... +${e.length - 2} more }`;
    }
    return t + "";
  }
}
function ge(n, t, e) {
  if (n.idRangeOffset[e] === 0) return t + n.idDelta[e] & 65535;
  {
    const s = n.startCount.length, i = n.idRangeOffset[e] / 2 + (t - n.startCount[e]) - (s - e);
    if (i >= 0 && n.glyphIdArray && i < n.glyphIdArray.length) {
      const r = n.glyphIdArray[i];
      if (r !== 0) return r + n.idDelta[e] & 65535;
    }
  }
  return 0;
}
class Ze {
  X(t) {
    var s;
    const e = [];
    return (s = t.cmap) != null && s.tables ? (t.cmap.tables.forEach((i) => {
      if (i.format === 4) {
        const r = this.Y(i);
        e.push(...r);
      } else if (i.format === 12) {
        const r = this.V(i);
        e.push(...r);
      }
    }), [...new Set(e)]) : [];
  }
  Y(t) {
    const e = [];
    if (!(t.startCount && t.endCount && t.idRangeOffset && t.idDelta)) return e;
    for (let s = 0; s < t.startCount.length; s++) {
      const i = t.startCount[s], r = t.endCount[s];
      if (i !== 65535 || r !== 65535) for (let h = i; h <= r; h++)
        ge(t, h, s) > 0 && this.K(e, h);
    }
    return e;
  }
  V(t) {
    const e = [];
    if (!t.groups) return e;
    for (let s = 0; s < t.groups.length; s += 3) {
      const i = t.groups[s], r = t.groups[s + 1], h = t.groups[s + 2];
      for (let o = i; o <= r; o++)
        h + (o - i) > 0 && this.K(e, o);
    }
    return e;
  }
  K(t, e) {
    try {
      const s = String.fromCodePoint(e);
      t.push(s);
    } catch {
    }
  }
}
class We {
  constructor(t) {
    a(this, "W");
    a(this, "Z");
    a(this, "q");
    a(this, "J", null);
    a(this, "$", 0);
    a(this, "h", 0);
    this.q = t, this.W = document.createElement("canvas"), this.Z = this.W.getContext("2d", { alpha: !0 });
  }
  tt(t, e, s, i) {
    const r = t.length + 1;
    this.$ = Math.ceil(Math.sqrt(r)), this.h = Math.ceil(r / this.$);
    const h = e.width * this.$, o = e.height * this.h;
    this.it(h, o), this.st(t, e, this.$, s, i), this.J ? this.J.width === h && this.J.height === o || this.J.resize(h, o) : this.J = this.q.et(h, o, 1, { filter: "nearest", depth: !1 }), this.J.rt(this.W);
  }
  it(t, e) {
    this.W.width = t, this.W.height = e, this.W.style.width = t + "px", this.W.style.height = e + "px", this.Z.imageSmoothingEnabled = !1, this.W.style.imageRendering = "pixelated", this.Z.clearRect(0, 0, t, e), this.Z.textBaseline = "top", this.Z.textAlign = "left", this.Z.fillStyle = "white";
  }
  st(t, e, s, i, r) {
    const h = i / r.head.unitsPerEm;
    for (let o = 0; o < t.length; o++) {
      const c = t[o], u = o + 1, l = u % s, f = Math.floor(u / s), d = c.glyphData;
      if (!d) continue;
      const y = d.advanceWidth * h, v = l * e.width, g = f * e.height, m = v + 0.5 * e.width, A = g + 0.5 * e.height, w = Math.round(m - 0.5 * e.width), b = Math.round(A - 0.5 * i), C = w + 0.5 * (e.width - y), x = b + r.hhea.ascender * h;
      this.nt(d, C, x, h);
    }
  }
  nt(t, e, s, i) {
    if (!t || !t.xs || t.noc === 0) return;
    const { xs: r, ys: h, endPts: o, flags: c } = t;
    if (!(r && h && o && c)) return;
    this.Z.beginPath();
    let u = 0;
    for (let l = 0; l < o.length; l++) {
      const f = o[l];
      if (!(f < u)) {
        if (f >= u) {
          const d = e + r[u] * i, y = s - h[u] * i;
          this.Z.moveTo(d, y);
          let v = u + 1;
          for (; v <= f; )
            if (1 & c[v]) {
              const g = e + r[v] * i, m = s - h[v] * i;
              this.Z.lineTo(g, m), v++;
            } else {
              const g = e + r[v] * i, m = s - h[v] * i;
              if (v + 1 > f) {
                const w = e + r[u] * i, b = s - h[u] * i;
                if (1 & c[u]) this.Z.quadraticCurveTo(g, m, w, b);
                else {
                  const C = (g + w) / 2, x = (m + b) / 2;
                  this.Z.quadraticCurveTo(g, m, C, x);
                }
                break;
              }
              const A = v + 1;
              if (1 & c[A]) {
                const w = e + r[A] * i, b = s - h[A] * i;
                this.Z.quadraticCurveTo(g, m, w, b), v = A + 1;
              } else {
                const w = (g + (e + r[A] * i)) / 2, b = (m + (s - h[A] * i)) / 2;
                this.Z.quadraticCurveTo(g, m, w, b), v = A;
              }
            }
          this.Z.closePath();
        }
        u = f + 1;
      }
    }
    this.Z.fill();
  }
  O() {
    var t;
    (t = this.J) == null || t.dispose(), this.J = null;
  }
  get framebuffer() {
    return this.J;
  }
  get columns() {
    return this.$;
  }
  get rows() {
    return this.h;
  }
}
class ve {
  ht(t, e) {
    const s = t.cmap;
    if (!s || !s.tables) return 0;
    let i = 0;
    for (const r of s.tables) if (r.format === 4 ? i = this.ot(e, r) : r.format === 12 && (i = this.ct(e, r)), i > 0) break;
    return i;
  }
  ut(t, e) {
    const s = e.codePointAt(0);
    return s === void 0 ? 0 : this.ht(t, s);
  }
  lt(t, e) {
    const s = t.hmtx;
    return s && s.aWidth && s.aWidth.length !== 0 ? e < s.aWidth.length ? s.aWidth[e] : s.aWidth[s.aWidth.length - 1] : 0;
  }
  ft(t, e) {
    const s = e / t.head.unitsPerEm;
    return { lineHeight: t.hhea.ascender * s - t.hhea.descender * s + t.hhea.lineGap * s, scale: s };
  }
  ot(t, e) {
    const s = e.endCount.length;
    let i = -1;
    for (let r = 0; r < s; r++) if (t <= e.endCount[r]) {
      i = r;
      break;
    }
    return i === -1 || t < e.startCount[i] ? 0 : ge(e, t, i);
  }
  ct(t, e) {
    const s = e.groups.length / 3;
    for (let i = 0; i < s; i++) {
      const r = e.groups[3 * i], h = e.groups[3 * i + 1], o = e.groups[3 * i + 2];
      if (t >= r && t <= h) return o + (t - r);
    }
    return 0;
  }
}
class Ye {
  constructor() {
    a(this, "dt");
    this.dt = new ve();
  }
  _t(t, e, s) {
    let i = 0;
    const r = this.dt.ft(s, e);
    let h = 0, o = !1;
    for (const c of t) {
      const u = c.glyphData;
      let l = 0;
      if (!u && (l = this.dt.ut(s, c.character), l === 0)) continue;
      const f = ((u == null ? void 0 : u.advanceWidth) ?? this.dt.lt(s, l)) * r.scale;
      if (i = Math.max(i, f), u) {
        const d = Math.max(0, u.yMax - u.yMin) * r.scale;
        h = Math.max(h, d), o = !0;
      }
    }
    return o || (h = r.lineHeight), { width: Math.ceil(i), height: Math.ceil(h) };
  }
}
let tt;
function Ht(n) {
  if (n.length === 0) return [];
  const t = tt !== void 0 ? tt : typeof Intl < "u" && "Segmenter" in Intl ? (tt = new Intl.Segmenter(void 0, { granularity: "grapheme" }), tt) : (tt = null, tt);
  return t ? Array.from(t.segment(n), (e) => e.segment) : Array.from(n);
}
function Zt(n) {
  return Array.from(n, (t) => t.codePointAt(0)).filter((t) => t !== void 0);
}
class je {
  constructor() {
    a(this, "vt");
    this.vt = new ve();
  }
  gt(t, e) {
    const s = [], i = /* @__PURE__ */ new Map();
    return t.forEach((r, h) => {
      const o = { character: r, unicode: Zt(r)[0] ?? 0, color: this.yt(h + 1), glyphData: this.wt(e, r) };
      s.push(o), i.set(r, o);
    }), { array: s, map: i };
  }
  yt(t) {
    return [t % 256 / 255, Math.floor(t / 256) % 256 / 255, 0];
  }
  wt(t, e) {
    const s = e.codePointAt(0) || 0, i = this.vt.ht(t, s);
    if (i === 0) return null;
    const r = this.vt.lt(t, i), h = qt.T.glyf.D(t, i);
    return h ? { ...h, advanceWidth: r } : null;
  }
}
class N extends dt {
  constructor(e, s = 16) {
    super();
    a(this, "q");
    a(this, "At");
    a(this, "bt", []);
    a(this, "Mt", /* @__PURE__ */ new Map());
    a(this, "xt", 16);
    a(this, "Ct", { width: 0, height: 0 });
    a(this, "Pt");
    a(this, "Ft");
    a(this, "St");
    a(this, "Tt");
    a(this, "Et", !1);
    this.q = e, this.xt = s, this.Pt = new Ze(), this.Ft = new We(e), this.St = new Ye(), this.Tt = new je();
  }
  Lt(e = {}) {
    if (!this.Et) throw new _("Cannot fork an uninitialized TextmodeFont.");
    const s = e.fontSize ?? this.xt, i = new N(this.q, s);
    return i.At = this.At, i.bt = this.bt, i.Mt = new Map(this.Mt), i.Et = !0, i.Ot(), i;
  }
  async Dt(e) {
    if (this.Et) return;
    const s = e || "data:font/woff;base64,d09GRgABAAAAABbwAAoAAAAAfywAAQABAAAAAAAAAAAAAAAAAAAAAAAAAABjbWFwAAAA9AAAAbsAAAkgIO8lSWdseWYAAAKwAAAOfgAAaLS4ctN0aGVhZAAAETAAAAAsAAAAOCi8/PVoaGVhAAARXAAAABkAAAAkCwEFAmhtdHgAABF4AAAAhQAABAQEAIOAbG9jYQAAEgAAAAKUAAAECAAy54BtYXhwAAAUlAAAABgAAAAgASIAgm5hbWUAABSsAAAB5wAAA6RWz85KT1MvMgAAFpQAAABFAAAAYM+QEyRwb3N0AAAW3AAAABQAAAAgAGkANHja7dRPSFRRFMfx38wdXblw4cJC7M0bz60gWlULGUFctWgR0UIQQkmDyn27kpAQaaEO2jhWJuafiQFtcDJtSqGhiFZtot5x3jzEVQQhlRJcOb0khiRc1+J94R64uw8cOADCAJT/avwZAiIpRCK3/P999KAS9biOSUxhBhlksYjnWMFrvME7vMca1vEF37ANAwkNqYRKqkk1rdLqscqpVVVQryzbils3rJnocHTWPmgfso/ap+0OuysWjlXHogQKUxVVUw3VUh010DE6QXHqph7qpT66TQmaoAxlaZnyVKC39FHHdbNu0e36or6kr4r4TgsTu75HmEcOy76vUPaVsIFNbOHHX74F3/fyD9+A7ztg1//2de76rH18Z8u+AXqwx/dBN5Z9XfqKiKzLqqzIC8nLkixKThZkXuZkVh7KuNyTuzImKRmVO1KxU7ETMtvmu/lqPptPxjOuKXo3vcveYQ+l2lKlO+Im3H632z3vnis+KaaLKc7zM87yHGc4zdM8zkke5H6+xp3cwRe4jVv5DLdwE5/ik3ycj3Cdk3eWnKfOmDPqJJ3hX9sOCvpPC65QcIWCgv5pPwGY9ak7AHja3V07ryQ5FT62axjQaDWsVmiCFQJpA4QINiAgICDYgICAgICAgICAgICAgIAA//AuF9Xlsn2etqv67iIY6apv3+6yj31e33nYA95FiD4uAAHeA7jyLzoA2Paf/Lp/Dun5W8x/Be/AxyCfO79fnj+e25/ZZzlewcM+3wIhwpfwE/Sc9e8YDyLU1ycF5XUD+to+L98O/An8VKQj0lnOtYdM776OJ71fTVC8//N1rLKDGsXl863OjSl5/iyIUu0HjJ+d+uO3rX3rXd33d/DjfR0/h6/n1iK5kWf36Hf2AxpVa6zU7ZLTnt3Q3wN7+tK6MVcBjUP/3vj56diHuT3YxVbKSvl9FdJHeFE4jfmJn2DSSOS9fuJ27SH7umuoL3oLWGOLxh3f2b8bnn/5Ql8n5SEYFD33q/0lKXxwjQfDOZtGgyEz+W8X5txl2zVb9MXO2S8HfD3ncbHousP6WPV2i/R7C+c06HK5ye/lfdl3Bj5Q2qitaLYhgLQWZY+fr/65A9Ly1r10jI783HOffJWZJ6ee8uuB0nmMXeSqWvRz5Dx/tiWf7H0OF+1DuK7vhy4ffP8An/doofqbQNXTqmlNT1c0v4/Eqpy29eBMLHty0PKZoCMW6VqRlDXNwvbD4RW2MYfyjNdXV3LaJuEdKgXcHvX2nHiz27RxHmC9w/qn0AbS+mJbSeX8pO1zlbbogPK7zJxAs3iFtrV8W/LHsHVZvxJ6Rlt7gum1nvjpnHNO4gFJqaoBWOKFVwKqAangorb2j5KKvG5N31O1ownZdhcZH7FuT9nznoxRv4ylrbfvzA9D88GO8uGDtgN0/1O09ntFlv3YhbIf/ml3/dPGqvi6rCMw6jNd53PM07BnK2eCJXmnzxrruI8ObOuxmZ/dxbd5nS77U7I/xaMdLm5/DXzuLLcwXlOLIVQ0an722pou6raGnpp/QYiwR0V5nwDL0Gk/f2TSUalIGOkSvfNAcVNCesV9a2q675FtsVAk4c5GPEfZT27XVqT9PmpxXtVn0577KO3MGrkXs+xKkHZk6EMUS440uO01t+Ark8yGYYjtsleqoPQksLuF0kOd/7TtbZ3XvNalNRNLqK+90fEDTAfy1FWWOBcT9fkTmrExe+viDNccYF+JqHeIbyBtlYxhStbmSc8DSX9/rICoXkkGSMfEJR7QsYAjNlhgn6iNS7T0AtakNnvaJ+W1TeQdeIxHaHtXaMtU+GP3CL5v+2RqHfc5JC6k9DJ6HhFaHHfu9Lc1Z5HlB5JWNOc8NupiUSlpa/7NIx0W0Ra10YcOVWnDfqhodmgI1CM5nrJS1DYKlMmyeAmoZaLrQnmNSRxAV7qZ0u0sr2Q8WbzUrRivE200nZ+x371Yj+idQH+bsOAFD16woZXuheBJI85UYyA+Ht17bJsTKLHHG+tuQpJX/AGX4eu2lq+vh8gQPgaLUpk1h7fcb1SJ4LEnGb+rdUHRHw96riVV36L5EgdqHNByqCTy82hnkrSSk3k5KTNWnJZ/buTlOvQngiceAkd4OHPz0K+tdOmGUYwJht2kcuBEntSRPOmZfyc40tFqD40IQeb2goGZvKIVzW4G5DMcQ4qOY3zVRzpmo1sMg+U1VemumtLofjFeCcxqJIUnM2vJuQeCHiOOwx4ss7pF6u+PtXxmZApbjCti22JtA+hVxUw7z6Xs2sSzMkeklSLPfwalYkjjt/0bHye4gKkXeaig5MpILVRiAd1vCrtP5Aj5uaN2PF1zxrE7koOgaY2PPL9FkccCKlprUZGr+zr0tw56iCvwGBTs+MFFxVbWeTaCQTj2WCBM1NnoWNxOBpBZU8f00hPsFDr+15wPevNsJG4IN+OGwKyWzKnW8S/GDUHZOd+44SsvbDvCuhYUTQSaQSFeWtoR4Xc833VimVzRvgm58QwZFQTthQ+awgQTeuVI7gLrF638Yixi+ot4RVZ5niDPFxBediyXNj++jUWDgkU3Zc96fDKwv4iiylyA4nalMkLX9C1hf24DNNkZyNDkflOPF4BqwdYbv1vLG9VX03W96PVKiCq+A01i5utY2d9YfSMP0qvQ7eFQUHSKvNfpCl21nqNafqf1UQksqfVe1PEPPNiJpY81iZoP119ZTUHojdpseMYqec5zr/2Jgo695rmycZWzSgOpXzMpbFrHu1Zmq/xA8pX3cgEQZU1/YzaexuQbXIoxF9THdaEzz9VaE5fgNVIPR/sIS8fQyipam9JXqHdOtPEIRllqzP7Ewh9063Z2IYH+GiLNUPFXJIcEM4RYc7bEkjwQL4/1fx+aHL8/62Of5vo3y+p92QX2fh18zrNFcPX9sfZAdBDZu8vxCM4clX31Qr9RrLPkDDDau8v8LZRar2N8lSOj1NGsLJeBZam1TIuwpzwepL3CJAvyANsPnj3BAzsD3a5X6ydEaZUSs50b7g2JrYcyG2lRL+xl+jD+Gfod33w82P0FTuYREa3c70CRS82XCtxIueJHXuIMB6tMt+x7lf7m5U4tyK9L3smuLrxqDxYPI30rYzk2h2NzgPXqAvPrQdqUxvdWF2zVwDrHCq0RoI0Hcrzcn9D8BMxYEMszZBzooqa/jsTxSeTthXTm9FC2n+pYEh8uVqyL9436quMD6pnK7njZM6msy4uYsunVquBSi4clVn8gblYc96TFyF04ll2oqCB300cDIbPxrZoqXZ1DHWvNh2irrNxstSaZYa2VB333tOr9mRcx7ETmXKmSFz6GkidstKjZFE8qIX26eG8KoS/b9uij9GFOiwFIVj5NyErT8rZGstdmD4lc4/xaNevd1uwOPCLX7Ems2TTc81MrUVmzyqdOr1v1PCPat9jmQfUYJEEbzNCSse4DevSYCIXal+bDCC3I2+EeTFKd7ltnFNN0sGLIfRcGfSWKD0BPANWTQIqcNtsaAON/1A/BeywPGhybs2ZEA1sH9FbgDMpTQx5L5k4fN/RR8lBHvif2ftB7oa8isVdrdWDxp/Hp6N8MsdUgqdS0M12EZrhC7TpJZZLZOZelRdeDUyffq3s6xPhztK4Xd9h6f4pIieNu4lI/jEN1XEMjbafK6lry/jkOYedyVMyp2vaHGlM8zBjCkdi28NdrNldgLa/a0orYtN6OwoMh7vPAsxb9eNTDrOdJBWuXsb6En8Evb5yTrJw1Y1XTHnmCFNtPkhHnuN+8QwHGi3JUJf4zeaTJsBpFdnik5V4fZq510ifEHMf7M55f2fteR1DJ73gzf4vyO42Or3Z5mZcWdlY6wb3sRvd0olKfGeaCWm5yGEtDwzLH6yPS95wmcVb2BBrYzig5tGb7Bvb5fkyfvW2nRhlxF3cyz8qGOF//eVLXq7P4oQTop9UASTKPr91h1zu5wu753DbqtXUO8pOT6wzdnQfWn2X3Csr5ktxP4FUmlBHHPThBO0mQ6wTFVxbM5mPCeXWP7ha4YDf8BdvAeaGd/XntlgHlW2eMFAR2CBPYAQzPrGeVy1ieYCOQdtpXGZyss4F2rkr5W8tJh06NTd/HGi+1vbiPN6JTeSfP5k0ihAhRQwgad9wQ1dhoKAntU87DfZy/K8SuEsPg82VQRU5xUGU+ZVrp8SMYtOHiwFC+Z1jLG2dqRuhAw01cZ2qeXBk/ROjaAS1TIuKHVp+Fi5YMrHqqahlY3YbJ0E/N2uUTq/0Cvt717Vfwa/gNfAO/hd/B7+EP8Ef4E/wZ/gJ/hb/B3+Ef8E/4F/z7nla+5T+Afp1wHdQRH/F/+/lF6VrSbuP4v/18VHMVmm7q6TX/Czha0mxJrf+YyNyOfRcYeKSap3+b8UufB8GnJSdec6Iu+toF6nHkaeZxvJ5h4PVgj3ILMz5teArdxnr8/PPoCXqiuvR91zoh2pvS8b0SqUD1FLPubHPaK9Q5lU+GzwI3PgfCOsB9NORgqm5OqfVxLMd1L9+A/s2s+0/0a93MTd3NNRHapruGQLnhZTSzpBMuYFNaz7N5RffPo/MnV2zac3wfRX6Vng0As1cTmE5M38U0eS+H0rvZxXtg6460jlQTZ3Snxw+pO9TKz+mOB5vffTs6umGj+UjMb3/QKfndvlP47UsVAO9Drzo11h+T/rF09Po0st98jHsKh31Ruj2UnbYWLuEd/pM9wOwpZ+KqccfWNZsc4F6c3jtf2ou7Ca6akqXRPThzsadua+/4hq7vgmn6uqux6bXw6AjnLMJbXMM5Ixwi8mR2rc3AOfg2nrs4zZlnDFaChbCtk/bwilwMfBxc0iMYy0MX40x2o/ft9D2Znn9Kl+3MO90HUb747jnzjpyCKVeTuij6DllsctyiUzXN0dgE9We1yK54WBffFqtew9TXpbYfy7dILWH/SXxmqeg4zlvRsZfIbuFnic0SHfRtfj4vsaVq532jl/QpYBykzpe/jec7n1uOmhuETi2xzM5vfy01xQC0vkp6PiKpDd07x6qcUc719K0A1YZjpvLivftqNpzxV/tDtXPTWFrbaowzXj+czsG+nmMt/bQspzj7fnvxeeuG4O/s/Xe412VW3+5VuPT+EV97/r++14Gc3ZvQRHrXMz91IrWHZ4FnK7WOVGjJPfAO3R0BczdLKuevQd5LPVsXd/X8PK6Ll2jK0/NM7P4V1PuI51FvsEMV+KhV4T2+22IQF85a0FlLWXs/IHTOX1B5CGCeEDh6V2ZiTK+eee/dnNjOa2xXz2zndd7sq+XYEZ/Gx/exoK5PoOceWNdnef9W9KCT9EYXqkrPxuhC9GA7faMXpHef1smLTDe1qaDY1N4ozLI4fqsHlwpf+3Cu9F1E/Z4AajG3V8430/6bCdq8QQs9b4OqJyQa1+6BACWaTPI8zrROa//7QGJ19U4tHeTTtePNqu3PnVhXJFSjzZFz4eo3Ndqidi/O6J5Z7X+VsS3cYki51T35Iv+merFeuGe69cbJM3Jq1Fn4kUA5rze4o9CRs22iy5jMsYLMS8g5/wOjbDW/AAB42mNgZGBgAOIzT9tXxvPbfGVgYGEAgZokCXVkmgUizsHABFLNwAAACJYG1HjaY2BkYGBhAAEIyc7AwMiAAhgZAQHPABQAAAB42r1TwRaAIAgD88P59PRA0hxUlw578mBDQOwi0i+oDUzb7nC/xyKH8SuwHH/jSx83jnE745c1RO44G9E1WTE14AQtYvKO6PN6BXRW5EONgCazSS4VXiere+sp7F7cQeSp7Pe2YkaxN7fVFhg/8z/1hfnfaBXnZ8k7wNzp/y13+wRWwErCAAAAeNpl0ylUVVEUBuCtoiKgoiIzAjIIMj9mZBZYMsmMjwcuBhEIBoPBYDAYDAaDwWA0GAwGgsFgMBgMBoPBYDAYDAaDweBnlrX+9e6955x/2oeI//664HbEgTL4HnHwZ8Sh1/AlIm0W3kUc3oN9+BFxJBva4E3E0SvwLCIdR/qniGO98Coiw3vG04hMv5n/fj9GZBUD3iz8xx9FnMiBJxEn0+E+/IrIppNt/VQzvITfEadH4HnEmUG4BV8jchaBn7NZgCMXdy7uXGfzeMjjKZ/PfBwF9hTYU/AhotC5QtpFtIt4K7oLnyOK6RXTKP4TUcJDCe5zNXAHcJTiKOWxlEZZPeAo00U5b+XyltM9vw24KvBWyFzpTOWLiCr5qu6BPdV0qx+Cni+sAc4a3mvw1nqu/RZxsRJkrEsDWeo2wAzq8dY/iGgwpwbfGvTdaA6NOmnUb5PnpiTY00S3SXfN/DU/BustdFrMq8VagqcE/YReEjK3+t4qayuPbTTbdNH2PqJdL+06a5e33VoHjg7vHdY7cXTK2ekedPHWha+b5279ddPo1ndPPuDrkbkH3yX5e/XXy3OvzH34+sy132+//P14B/AO6GuA3qBOB3U6hH/It2Haw2Y2rI9hHV6WdcSsR6eAl1GZx3Qwpr9xcxv3PqGDCbyTvE3KM+muT+lwypkpe6bNaZqfaX6v8j7D8wyNGbwzbyNmdTMrzxxfc9bndDFn5vM8zds37x4smMeCHhf5WTKHJb0uuc/L/C7bs4zrGr2kO5m0ntRZkv8VfazIkvI9RSelg5ReUrKvOrvqHq7p4Lr5retx3fcN/5Mb+Dfs25RpE/8mji0etqzfwLHteZufmzrZobfj/K5ednna0/fe/l+Pca7seNpjYGRgYGRkaGBQYAABJgY0AAAP+ACmeNp1ksFO20AQhv8NgRJaUApSy61LDxVc4uAjNxoJReoNKdCrYy8hZb1rrTcIuPMKfaY+QM899RH6AP3tDJEKqlcefzvzz/xrywD21ScoLK9N3ktW5E3hDl6hL7zG7HvhLrMfhNfxGonwBjUnwj2uz8JbzH4R3sZbPArvIMV34T28wQ+6qG6Puz5+Civyb+EOO/4Ir6GvOsJdaLUrvI53KhXeoGYs3MOu+iq8hai+CW/jo/olvIOiA+E97HeKw/xIp8M0nYQ6O/MunpvZwmbhafv01JK/MKGee6ePB8N/JCFzN6dO+8o4bee5cbnRM+NMyKyuFqHytdHR3MXSF0ZfNQOn93rVORoNm4l64ua3NMjsdYxVfZIkeTBZZC73ZeldPfBhllSLKR0KX2ZzlzyY4BO2JmNjrdeXPtjiAIfIcQTNbz/knWKCgBoZzuDhEHEOgxkWsMyFF9Xne/1Mf8Fdo5i3dY1jDOjz/ymB0eEGp63ao2J/Q5YT8pabqOnQsGn1lvuKjoHRc05Tj4x3jCUzRZu5Wp1winvGl54jruHqjI3C0fVW3qDxuWZ/pEvNPzjhylkxrETR5fQoW09HzYDPwJMm7emm8g5Fq8nIjpWHdronLV0TjJmxXJ4nuGwnWPYcAH8BoeumrAB42mNgYmFgnMDAysDCxMDEAAIQGoiNGc6A+CwMENDAwNDNwFDwGMpliHT00WNwYFBQy4aogJCMgSCSGcJTYGAAAEBYBpIAAAB42mNgZoCANAZjIMnIgAYADecAng==", i = await this.kt(s);
    await this.Rt(i);
  }
  zt(e) {
    if (e === void 0) return this.xt;
    this.xt = e, this.Ot();
  }
  Ot() {
    this.Ct = this.St._t(this.bt, this.xt, this.At), this.Ft.tt(this.bt, this.Ct, this.xt, this.At);
  }
  async jt(e) {
    try {
      const s = await this.kt(e);
      await this.Rt(s);
    } catch (s) {
      throw new _("Failed to load font: " + (s instanceof Error ? s.message : "Unknown error"), { originalError: s });
    }
  }
  async kt(e) {
    const s = await fetch(e);
    if (!s.ok) throw new _(`Failed to load font file: ${s.status} ${s.statusText}`);
    return s.arrayBuffer();
  }
  async Rt(e) {
    const s = qt.parse(e);
    if (!s || s.length === 0) throw Error("Failed to parse font file");
    this.At = s[0], await this.Ht();
  }
  async Ht() {
    const e = this.Pt.X(this.At), { array: s, map: i } = this.Tt.gt(e, this.At);
    this.bt = s, this.Mt = i, this.Ot(), this.Et = !0;
  }
  It(e) {
    const s = this.Mt.get(e);
    return s ? s.color : [0, 0, 0];
  }
  Bt(e) {
    return Ht(e).map((s) => {
      const i = this.Mt.get(s);
      return i ? i.color : [0, 0, 0];
    });
  }
  dispose() {
    this.Ft.O(), super.dispose();
  }
  get framebuffer() {
    return this.Ft.framebuffer;
  }
  get characterMap() {
    return this.Mt;
  }
  get characters() {
    return this.bt;
  }
  get textureColumns() {
    return this.Ft.columns;
  }
  get textureRows() {
    return this.Ft.rows;
  }
  get columns() {
    return this.Ft.columns;
  }
  get rows() {
    return this.Ft.rows;
  }
  get cellWidth() {
    return this.Ct.width;
  }
  get cellHeight() {
    return this.Ct.height;
  }
  get cellDimensions() {
    return this.Ct;
  }
  get maxGlyphDimensions() {
    return this.Ct;
  }
  get fontSize() {
    return this.xt;
  }
  get font() {
    return this.At;
  }
}
class Je {
  constructor(t) {
    a(this, "W");
    a(this, "Z");
    a(this, "q");
    a(this, "J", null);
    a(this, "$", 0);
    a(this, "h", 0);
    this.q = t, this.W = document.createElement("canvas"), this.Z = this.W.getContext("2d", { alpha: !0 });
  }
  tt(t, e, s, i) {
    const r = t.length + 1;
    this.$ = Math.ceil(Math.sqrt(r)), this.h = Math.ceil(r / this.$);
    const h = e.width * this.$, o = e.height * this.h;
    this.it(h, o), this.Nt(t, e, s, i), this.J ? this.J.width === h && this.J.height === o || this.J.resize(h, o) : this.J = this.q.et(h, o, 1, { filter: "nearest", depth: !1 }), this.J.rt(this.W);
  }
  O() {
    var t;
    (t = this.J) == null || t.dispose(), this.J = null;
  }
  it(t, e) {
    this.W.width = t, this.W.height = e, this.W.style.width = t + "px", this.W.style.height = e + "px", this.Z.imageSmoothingEnabled = !1, this.W.style.imageRendering = "pixelated", this.Z.clearRect(0, 0, t, e);
  }
  Nt(t, e, s, i) {
    for (let r = 0; r < t.length; r++) {
      const h = r + 1, o = h % this.$, c = Math.floor(h / this.$), u = r % i.columns, l = Math.floor(r / i.columns), f = i.marginX + u * (i.cellWidth + i.spacingX), d = i.marginY + l * (i.cellHeight + i.spacingY), y = o * e.width, v = c * e.height;
      this.Z.drawImage(s, f, d, i.cellWidth, i.cellHeight, y, v, e.width, e.height);
    }
  }
  get framebuffer() {
    return this.J;
  }
  get columns() {
    return this.$;
  }
  get rows() {
    return this.h;
  }
}
const q = class q extends dt {
  constructor(e, s, i) {
    super();
    a(this, "q");
    a(this, "Ft", null);
    a(this, "bt", []);
    a(this, "Mt", /* @__PURE__ */ new Map());
    a(this, "Vt", { width: 0, height: 0 });
    a(this, "Qt", { width: 0, height: 0 });
    a(this, "xt", 0);
    a(this, "Kt");
    a(this, "Wt");
    a(this, "Zt");
    a(this, "qt");
    a(this, "Et", !1);
    this.q = e, this.xt = s === void 0 ? 0 : Math.abs(s), this.Zt = i;
  }
  Lt(e = {}) {
    if (!this.Et || !this.Wt || !this.qt) throw new _("Cannot fork an uninitialized TextmodeTileset.");
    const s = new q(this.q, e.fontSize ?? this.xt);
    return s.bt = this.qt.characters, s.Mt = new Map(this.qt.characterMap), s.Vt = { ...this.qt.nativeCellDimensions }, s.Kt = this.Kt, s.Wt = { ...this.Wt }, s.Zt = this.Zt, s.Et = !0, s.Jt(this.qt), s.$t(), s;
  }
  async Dt(e) {
    if (this.Et) return;
    if (this.Zt = e ?? this.Zt, !this.Zt) throw new _("Cannot initialize a TextmodeTileset without source options.");
    const s = this.ti(this.Zt), i = this.ii(s);
    if (i) return this.Jt(i), this.bt = i.characters, this.Mt = new Map(i.characterMap), this.Vt = { ...i.nativeCellDimensions }, this.Wt = { ...i.layout }, this.xt === 0 && (this.xt = Math.abs(this.Zt.fontSize ?? i.nativeCellDimensions.height)), this.$t(), void (this.Et = !0);
    const r = await this.si(this.Zt.source), h = this.ei(r), o = this.ri(this.Zt, h.width, h.height), c = this.ni(this.Zt, o), u = await this.hi(this.Zt, c, o.columns), l = this.oi(u), f = new Map(l.map((y) => [y.character, y])), d = new Je(this.q);
    this.Kt = r, this.Wt = o, this.Vt = { width: o.cellWidth, height: o.cellHeight }, this.bt = l, this.Mt = f, this.xt === 0 && (this.xt = Math.abs(this.Zt.fontSize ?? o.cellHeight)), this.$t(), d.tt(this.bt, this.Vt, r, o), this.Jt({ cacheKey: s, textureAtlas: d, characters: l, characterMap: f, nativeCellDimensions: { ...this.Vt }, layout: { ...o }, referenceCount: 0 }), this.Et = !0;
  }
  zt(e) {
    if (e === void 0) return this.xt;
    this.xt = Math.abs(e), this.$t();
  }
  It(e) {
    const s = this.Mt.get(e);
    return s ? s.color : [0, 0, 0];
  }
  Bt(e) {
    return Ht(e).map((s) => this.It(s));
  }
  dispose() {
    this.ai(), super.dispose();
  }
  Jt(e) {
    this.qt !== e && (this.ai(), q.ci(this.q).set(e.cacheKey, e), e.referenceCount += 1, this.qt = e, this.Ft = e.textureAtlas);
  }
  ai() {
    const e = this.qt;
    if (e) {
      if (e.referenceCount -= 1, e.referenceCount <= 0) {
        e.textureAtlas.O();
        const s = q.Gt.get(this.q);
        s == null || s.delete(e.cacheKey);
      }
      this.qt = void 0, this.Ft = null;
    } else this.Ft = null;
  }
  ti(e) {
    return JSON.stringify({ source: this.ui(e.source), columns: e.columns, rows: e.rows, count: e.count ?? null, margin: e.margin ?? null, marginX: e.marginX ?? null, marginY: e.marginY ?? null, spacing: e.spacing ?? null, spacingX: e.spacingX ?? null, spacingY: e.spacingY ?? null, mapping: this.li(e) });
  }
  ui(e) {
    return typeof e == "string" || e instanceof URL ? "url:" + (e + "") : "object:" + q.fi(e);
  }
  li(e) {
    return e.map === void 0 ? "auto:32" : Array.isArray(e.map) ? "rows:" + e.map.join(`
`) : e.map instanceof URL ? "url:" + (e.map + "") : this.di(e.map) ? "inline:" + e.map : "url:" + e.map;
  }
  ii(e) {
    var s;
    return (s = q.Gt.get(this.q)) == null ? void 0 : s.get(e);
  }
  static ci(e) {
    let s = q.Gt.get(e);
    return s || (s = /* @__PURE__ */ new Map(), q.Gt.set(e, s)), s;
  }
  static fi(e) {
    const s = q.Xt.get(e);
    if (s !== void 0) return s;
    const i = q.Yt++;
    return q.Xt.set(e, i), i;
  }
  async si(e) {
    if (typeof e != "string" && !(e instanceof URL)) return e;
    const s = e + "";
    return new Promise((i, r) => {
      const h = new Image();
      h.crossOrigin = "anonymous", h.onload = () => i(h), h.onerror = () => r(new _("Failed to load tileset image: " + s)), h.src = s;
    });
  }
  async hi(e, s, i) {
    if (e.map !== void 0) {
      const r = await this._i(e.map), h = this.mi(r, s, i);
      return this.pi(h, "tileset map"), h;
    }
    return this.gi(s);
  }
  async _i(e) {
    return Array.isArray(e) ? [...e] : e instanceof URL ? this.yi(await this.wi(e)) : this.di(e) ? this.yi(e) : this.yi(await this.wi(e));
  }
  mi(e, s, i) {
    const r = Math.ceil(s / i);
    if (e.length !== r) throw new _(`Tileset map must contain exactly ${r} row${r === 1 ? "" : "s"} for ${s} mapped tile${s === 1 ? "" : "s"}.`);
    const h = [];
    let o = s;
    for (let c = 0; c < e.length; c++) {
      const u = Ht(e[c]), l = Math.min(i, o);
      if (u.length !== l) throw new _(`Tileset map row ${c + 1} must contain exactly ${l} character cell${l === 1 ? "" : "s"}.`);
      h.push(...u), o -= l;
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
      throw new _("Failed to load tileset map: " + (i instanceof Error ? i.message : "Unknown error"));
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
`) && !e.includes("\r")) || !this.bi(e);
  }
  bi(e) {
    return /^(?:[a-z]+:)?\/\//i.test(e) || e.startsWith("/") || e.startsWith("./") || e.startsWith("../") || e.includes("\\") || /\.[a-z0-9]+(?:$|[?#])/i.test(e);
  }
  ei(e) {
    const s = e, i = s.naturalWidth ?? s.videoWidth ?? s.displayWidth ?? s.width, r = s.naturalHeight ?? s.videoHeight ?? s.displayHeight ?? s.height;
    if (typeof i != "number" || typeof r != "number" || i <= 0 || r <= 0) throw new _("Tileset source must expose positive pixel dimensions.");
    return { width: i, height: r };
  }
  ri(e, s, i) {
    const r = e.marginX ?? e.margin ?? 0, h = e.marginY ?? e.margin ?? 0, o = e.spacingX ?? e.spacing ?? 0, c = e.spacingY ?? e.spacing ?? 0;
    if (e.columns <= 0 || e.rows <= 0) throw new _("Tileset columns and rows must be greater than 0.");
    const u = s - 2 * r - o * (e.columns - 1), l = i - 2 * h - c * (e.rows - 1);
    if (u <= 0 || l <= 0) throw new _("Tileset margins and spacing leave no usable tile area.");
    const f = u / e.columns, d = l / e.rows;
    if (!Number.isInteger(f) || !Number.isInteger(d)) throw new _("Tileset dimensions do not divide evenly. Check columns, rows, margins, and spacing.");
    return { columns: e.columns, rows: e.rows, marginX: r, marginY: h, spacingX: o, spacingY: c, cellWidth: f, cellHeight: d };
  }
  ni(e, s) {
    const i = s.columns * s.rows, r = e.count ?? i;
    if (r <= 0 || r > i) throw new _(`Tileset count must be between 1 and ${i}.`);
    return r;
  }
  Ai(e) {
    if (32 + e - 1 > 1114111) throw new _("Tileset automatic character assignment exceeds the supported Unicode range.");
  }
  pi(e, s) {
    const i = /* @__PURE__ */ new Map();
    for (let r = 0; r < e.length; r++) {
      const h = e[r], o = i.get(h);
      if (o !== void 0) throw new _(`${s} contains duplicate character ${this.Mi(h)} at tile ${o + 1} and tile ${r + 1}.`);
      i.set(h, r);
    }
  }
  Mi(e) {
    const s = Zt(e);
    if (s.length === 0) return '""';
    const i = s.map((r) => "U+" + r.toString(16).toUpperCase().padStart(4, "0")).join(" ");
    return `${JSON.stringify(e)} (${i})`;
  }
  oi(e) {
    const s = [];
    for (let i = 0; i < e.length; i++) {
      const r = e[i], h = Zt(r)[0];
      if (h === void 0) throw new _(`Tileset character mapping produced an empty character at tile ${i + 1}.`);
      s.push({ character: r, unicode: h, color: this.xi(i + 1) });
    }
    return s;
  }
  xi(e) {
    return [(255 & e) / 255, (e >> 8 & 255) / 255, (e >> 16 & 255) / 255];
  }
  $t() {
    if (this.Vt.height <= 0 || this.Vt.width <= 0) return;
    const e = Math.max(1, this.xt || this.Vt.height), s = e / this.Vt.height;
    this.Qt = { width: Math.max(1, Math.round(this.Vt.width * s)), height: e };
  }
  get characters() {
    return this.bt;
  }
  get characterMap() {
    return this.Mt;
  }
  get framebuffer() {
    return this.Ft.framebuffer;
  }
  get fontFramebuffer() {
    return this.framebuffer;
  }
  get columns() {
    return this.Ft.columns;
  }
  get rows() {
    return this.Ft.rows;
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
    return this.Qt;
  }
  get cellDimensions() {
    return this.Qt;
  }
  get cellWidth() {
    return this.Qt.width;
  }
  get cellHeight() {
    return this.Qt.height;
  }
  get fontSize() {
    return this.xt;
  }
};
a(q, "Gt", /* @__PURE__ */ new WeakMap()), a(q, "Xt", /* @__PURE__ */ new WeakMap()), a(q, "Yt", 1);
let X = q;
const li = Object.freeze(Object.defineProperty({ __proto__: null, TextmodeFont: N, TextmodeTileset: X }, Symbol.toStringTag, { value: "Module" })), ct = ["normal", "additive", "multiply", "screen", "subtract", "darken", "lighten", "overlay", "softLight", "hardLight", "colorDodge", "colorBurn", "difference", "exclusion"];
function z(n) {
  return n * (Math.PI / 180);
}
function Pt(n) {
  return n * (180 / Math.PI);
}
function ne(n, t, e, s) {
  return Pt(Math.atan2(s - t, e - n));
}
function Ct(n, t, e, s) {
  return Math.hypot(e - n, s - t);
}
function Y(n, t, e) {
  return Math.min(Math.max(n, t), e);
}
function Wt(n) {
  return (n % 360 + 360) % 360 / 360;
}
function J(n = new Float32Array(16)) {
  return n[0] = 1, n[1] = 0, n[2] = 0, n[3] = 0, n[4] = 0, n[5] = 1, n[6] = 0, n[7] = 0, n[8] = 0, n[9] = 0, n[10] = 1, n[11] = 0, n[12] = 0, n[13] = 0, n[14] = 0, n[15] = 1, n;
}
function he(n, t, e, s = new Float32Array(16)) {
  let i = n[0] - t[0], r = n[1] - t[1], h = n[2] - t[2], o = Math.hypot(i, r, h);
  o === 0 ? h = 1 : (o = 1 / o, i *= o, r *= o, h *= o);
  let c = e[1] * h - e[2] * r, u = e[2] * i - e[0] * h, l = e[0] * r - e[1] * i;
  o = Math.hypot(c, u, l), o === 0 ? (c = 1, u = 0, l = 0) : (o = 1 / o, c *= o, u *= o, l *= o);
  const f = r * l - h * u, d = h * c - i * l, y = i * u - r * c;
  return s[0] = c, s[1] = f, s[2] = i, s[3] = 0, s[4] = u, s[5] = d, s[6] = r, s[7] = 0, s[8] = l, s[9] = y, s[10] = h, s[11] = 0, s[12] = -(c * n[0] + u * n[1] + l * n[2]), s[13] = -(f * n[0] + d * n[1] + y * n[2]), s[14] = -(i * n[0] + r * n[1] + h * n[2]), s[15] = 1, s;
}
var ye = ((n) => (n[n.SILENT = 0] = "SILENT", n[n.WARNING = 1] = "WARNING", n[n.ERROR = 2] = "ERROR", n[n.THROW = 3] = "THROW", n))(ye || {});
const j = class j {
  constructor() {
    a(this, "Zt", { globalLevel: 3 });
    a(this, "Pi", /* @__PURE__ */ new Set());
  }
  static Fi() {
    return j.Ci || (j.Ci = new j()), j.Ci;
  }
  Si(t, e) {
    const s = "%c[textmode.js] Oops! (╯°□°)╯︵ Something went wrong in your code.", i = "color: #f44336; font-weight: bold; background: #ffebee; padding: 2px 6px; border-radius: 3px;";
    switch (this.Zt.globalLevel) {
      case 0:
        return !1;
      case 1:
        return !!this.Ti("warning", t, e) && (console.group(s, i), console.warn(_.N(t, e, { includeFooterArrows: !1 })), console.groupEnd(), !1);
      case 2:
        return !!this.Ti("error", t, e) && (console.group(s, i), console.error(_.N(t, e, { includeFooterArrows: !1 })), console.groupEnd(), !1);
      default:
        throw new _(t, e);
    }
  }
  Ei(t, e, s) {
    return !!t || (this.Si(e, s), !1);
  }
  Li(t) {
    this.Zt.globalLevel = t;
  }
  Oi(t) {
    t.globalLevel !== void 0 && (this.Zt.globalLevel = t.globalLevel);
  }
  Di() {
    this.Pi.clear();
  }
  Ti(t, e, s) {
    const i = this.ki(t, e, s);
    return !this.Pi.has(i) && (this.Pi.add(i), !0);
  }
  ki(t, e, s) {
    return `${t}|${e}|${s ? this.Ri(s) : ""}`;
  }
  Ri(t) {
    return t == null ? t + "" : typeof t == "number" || typeof t == "boolean" || typeof t == "string" ? JSON.stringify(t) : Array.isArray(t) ? `[${t.map((e) => this.Ri(e)).join(",")}]` : typeof t == "object" ? `{${Object.entries(t).sort(([e], [s]) => e.localeCompare(s)).map(([e, s]) => `${JSON.stringify(e)}:${this.Ri(s)}`).join(",")}}` : t + "";
  }
};
a(j, "Ci", null);
let Yt = j;
const it = Yt.Fi();
class W {
  constructor(t = 0, e = 0, s = 0, i = 0, r = 0, h = 0, o = 0, c = 1, u = 0) {
    a(this, "zi");
    a(this, "ji");
    a(this, "Hi");
    a(this, "Ii");
    a(this, "Bi");
    a(this, "Ni");
    a(this, "Gi");
    a(this, "Xi");
    a(this, "Yi");
    this.zi = t, this.ji = e, this.Hi = s, this.Ii = i, this.Bi = r, this.Ni = h, this.Gi = o, this.Xi = c, this.Yi = u;
  }
  static Vi(t, e) {
    const s = t.Ki.Qi, i = t.Ki.Wi, r = t.Ki.Zi, h = t.Ki.qi, o = t.Ki.Ji, c = t.Ki.$i;
    if (t.Ki.ts) {
      const u = 0.5 * Math.max(1, e) / Math.tan(0.5 * t.Ki.ss);
      return new W(s, i, r + u, s, i, r, h, o, c);
    }
    return new W(t.Ki.es, t.Ki.rs, t.Ki.ns, s, i, r, h, o, c);
  }
  hs(t) {
    t.Ki.cs(this.zi, this.ji, this.Hi, this.Ii, this.Bi, this.Ni, this.Gi, this.Xi, this.Yi);
  }
  setPosition(t, e, s) {
    return this.zi = t, this.ji = e, this.Hi = s, this;
  }
  lookAt(t, e, s) {
    return this.Ii = t, this.Bi = e, this.Ni = s, this;
  }
  setUp(t, e, s) {
    return this.Gi = t, this.Xi = e, this.Yi = s, this;
  }
  move(t, e, s) {
    return this.zi += t, this.ji += e, this.Hi += s, this.Ii += t, this.Bi += e, this.Ni += s, this;
  }
  copy() {
    return new W(this.zi, this.ji, this.Hi, this.Ii, this.Bi, this.Ni, this.Gi, this.Xi, this.Yi);
  }
  get eyeX() {
    return this.zi;
  }
  get eyeY() {
    return this.ji;
  }
  get eyeZ() {
    return this.Hi;
  }
  get targetX() {
    return this.Ii;
  }
  get targetY() {
    return this.Bi;
  }
  get targetZ() {
    return this.Ni;
  }
  get upX() {
    return this.Gi;
  }
  get upY() {
    return this.Xi;
  }
  get upZ() {
    return this.Yi;
  }
}
class Ke {
  constructor(t) {
    a(this, "us", null);
    a(this, "ts", !0);
    a(this, "es", 0);
    a(this, "rs", 0);
    a(this, "ns", 0);
    a(this, "Qi", 0);
    a(this, "Wi", 0);
    a(this, "Zi", 0);
    a(this, "qi", 0);
    a(this, "Ji", 1);
    a(this, "$i", 0);
    a(this, "ls", "perspective");
    a(this, "fs");
    a(this, "ds");
    a(this, "_s");
    this.ts = t.Ki.ts, this.es = t.Ki.es, this.rs = t.Ki.rs, this.ns = t.Ki.ns, this.Qi = t.Ki.Qi, this.Wi = t.Ki.Wi, this.Zi = t.Ki.Zi, this.qi = t.Ki.qi, this.Ji = t.Ki.Ji, this.$i = t.Ki.$i, t.Ki.ts || (this.us = new W(t.Ki.es, t.Ki.rs, t.Ki.ns, t.Ki.Qi, t.Ki.Wi, t.Ki.Zi, t.Ki.qi, t.Ki.Ji, t.Ki.$i)), t.Ki.ps ? this.ls = "ortho" : (this.ls = "perspective", this.fs = 180 * t.Ki.ss / Math.PI), this.ds = t.Ki.ds, this._s = t.Ki._s;
  }
  createCamera(t, e) {
    let s;
    if (this.ts) {
      const i = Math.max(1, t), r = this.fs ?? e, h = 0.5 * i / Math.tan(r * Math.PI / 360);
      s = new W(this.Qi, this.Wi, this.Zi + h, this.Qi, this.Wi, this.Zi, this.qi, this.Ji, this.$i);
    } else s = new W(this.es, this.rs, this.ns, this.Qi, this.Wi, this.Zi, this.qi, this.Ji, this.$i);
    return this.setCamera(s), s;
  }
  setCamera(t) {
    this.us = t, this.ts = !1, this.es = t.eyeX, this.rs = t.eyeY, this.ns = t.eyeZ, this.Qi = t.targetX, this.Wi = t.targetY, this.Zi = t.targetZ, this.qi = t.upX, this.Ji = t.upY, this.$i = t.upZ;
  }
  resetCamera() {
    this.us = null, this.ts = !0, this.es = 0, this.rs = 0, this.ns = 0, this.Qi = 0, this.Wi = 0, this.Zi = 0, this.qi = 0, this.Ji = 1, this.$i = 0;
  }
  camera(t, e, s, i = 0, r = 0, h = 0, o = 0, c = 1, u = 0) {
    this.us ? this.us.setPosition(t, e, s).lookAt(i, r, h).setUp(o, c, u) : this.us = new W(t, e, s, i, r, h, o, c, u), this.ts = !1, this.es = t, this.rs = e, this.ns = s, this.Qi = i, this.Wi = r, this.Zi = h, this.qi = o, this.Ji = c, this.$i = u;
  }
  lookAt(t, e, s, i, r, h) {
    this.us && (this.us.lookAt(t, e, s), i === void 0 && r === void 0 && h === void 0 || this.us.setUp(i ?? this.us.upX, r ?? this.us.upY, h ?? this.us.upZ)), this.Qi = t, this.Wi = e, this.Zi = s, i !== void 0 && (this.qi = i), r !== void 0 && (this.Ji = r), h !== void 0 && (this.$i = h);
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
    if (this.ls === "ortho" ? t.Ki.vs(this.ds, this._s) : t.Ki.gs(this.fs, this.ds, this._s), this.ts) return t.Ki.ws(), void (this.Qi === 0 && this.Wi === 0 && this.Zi === 0 && this.qi === 0 && this.Ji === 1 && this.$i === 0 || t.Ki.As(this.Qi, this.Wi, this.Zi, this.qi, this.Ji, this.$i));
    t.Ki.cs(this.es, this.rs, this.ns, this.Qi, this.Wi, this.Zi, this.qi, this.Ji, this.$i);
  }
}
class H {
  constructor(t, e = {}) {
    a(this, "bs");
    a(this, "Ms");
    a(this, "Cs");
    a(this, "l");
    a(this, "_");
    a(this, "Ps");
    a(this, "xt");
    a(this, "Fs");
    a(this, "q");
    a(this, "Ss");
    a(this, "Ts");
    a(this, "At");
    a(this, "Es");
    a(this, "Ls");
    a(this, "Os");
    a(this, "Ds");
    a(this, "ks", () => {
    });
    a(this, "Rs", () => {
    });
    a(this, "zs", []);
    a(this, "js", []);
    a(this, "Hs", !1);
    a(this, "Is", !1);
    a(this, "Bs");
    a(this, "Ns");
    a(this, "Gs", /* @__PURE__ */ new Map());
    this.q = t, this.bs = e.visible ?? !0, this.Ms = e.opacity ?? 1;
    const s = e.blendMode ?? "normal";
    this.Cs = H.Xs(s) ? s : "normal";
    const i = e.fontSize ?? 16;
    this.xt = Math.abs(i), this.Ns = e.fontSize !== void 0, it.Ei(H.Xs(s), `Invalid blend mode. Expected one of: ${ct.join(", ")}.`, { method: "constructor", property: "blendMode", providedValue: e.blendMode }), it.Ei(typeof i == "number", "Font size must be a number.", { method: "fontSize", providedValue: i }), this.l = e.offsetX ?? 0, this._ = e.offsetY ?? 0, this.Ps = e.rotationZ ?? 0;
    const r = e.fontSource;
    this.Fs = r, this.At = r instanceof N || r instanceof X ? r : new N(t, this.xt), this.Bs = new Ke(t.state);
  }
  async Ys(t) {
    if (this.Ss = t, this.Fs instanceof N || this.Fs instanceof X) {
      this.Fs.Et || await this.Fs.Dt();
      const i = this.Fs, r = i.Lt({ fontSize: this.Vs(i) });
      this.Qs(r);
    }
    this.At.Et || (this.At instanceof N ? await this.At.Dt(this.Fs) : await this.At.Dt());
    const e = this.At.maxGlyphDimensions;
    this.Ts = new Le(this.Ss.canvas.canvas, e.width, e.height);
    const s = this.Ts;
    this.Es = this.Ss.createFramebuffer(s.cols, s.rows, 3), this.Ls = this.Ss.createFramebuffer(s.width, s.height, 1), this.Os = this.Ss.createFramebuffer(s.width, s.height, 1), this.Ds = [this.Ss.createFramebuffer(s.width, s.height, 1, { depth: !1 }), this.Ss.createFramebuffer(s.width, s.height, 1, { depth: !1 })], this.Ts.F(() => {
      var i, r, h;
      this.Es.resize(this.Ts.cols, this.Ts.rows), this.Ls.resize(this.Ts.width, this.Ts.height), (i = this.Os) == null || i.resize(this.Ts.width, this.Ts.height), (r = this.Ds) == null || r[0].resize(this.Ts.width, this.Ts.height), (h = this.Ds) == null || h[1].resize(this.Ts.width, this.Ts.height);
    });
  }
  draw(t) {
    this.ks = t;
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
    if (t === void 0) return this.Ms;
    this.Ms = Y(t, 0, 1);
  }
  blendMode(t) {
    if (t === void 0) return this.Cs;
    it.Ei(H.Xs(t), `Invalid blend mode. Expected one of: ${ct.join(", ")}.`, { method: "blendMode", providedValue: t }) && (this.Cs = t);
  }
  offset(t, e = 0) {
    if (t === void 0) return { x: this.l, y: this._ };
    this.l = t, this._ = e;
  }
  rotateZ(t) {
    if (t === void 0) return this.Ps;
    this.Ps = t;
  }
  createCamera() {
    var s;
    const t = this.Ks(), e = 180 * (((s = this.Ss) == null ? void 0 : s.renderer.state.Ki.ss) ?? Math.PI / 4) / Math.PI;
    return this.Bs.createCamera(t.height, e);
  }
  setCamera(t) {
    this.Bs.setCamera(t), this.Ws();
  }
  resetCamera() {
    this.Bs.resetCamera(), this.Ws();
  }
  camera(t, e, s, i = 0, r = 0, h = 0, o = 0, c = 1, u = 0) {
    this.Bs.camera(t, e, s, i, r, h, o, c, u), this.Ws();
  }
  lookAt(t, e, s, i, r, h) {
    this.Bs.lookAt(t, e, s, i, r, h), this.Ws();
  }
  perspective(t, e, s) {
    this.Bs.perspective(t, e, s), this.Ws();
  }
  ortho(t, e) {
    this.Bs.ortho(t, e), this.Ws();
  }
  Zs() {
    return this.Bs.getActiveCamera();
  }
  filter(t, e) {
    (this.Hs ? this.js : this.zs).push({ name: t, params: e });
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
    if (t === void 0) return this.At.fontSize;
    if (!it.Ei(typeof t == "number", "Font size must be a number.", { method: "fontSize", providedValue: t })) return;
    const e = Math.abs(t);
    this.At.fontSize !== e && (this.Ns = !0, this.xt = e, this.At.zt(e), this.qs());
  }
  useTileColors(t) {
    if (t === void 0) return this.Is;
    this.Is = t;
  }
  async loadFont(t) {
    if (!this.At) throw Error("Layer font not initialized. Ensure layer is attached before loading fonts.");
    if (t instanceof N) {
      t.Et || await t.Dt();
      const e = t, s = e.Lt({ fontSize: this.Vs(e) });
      this.Qs(s);
    } else if (this.At instanceof N) await this.At.jt(t);
    else {
      const e = new N(this.q, this.At.fontSize);
      await e.Dt(t), this.Qs(e);
    }
    return this.Fs = t, this.xt = this.At.fontSize, this.qs(), this.At;
  }
  async loadTileset(t) {
    if (!this.At) throw Error("Layer font not initialized. Ensure layer is attached before loading tilesets.");
    if (t instanceof X) {
      t.Et || await t.Dt();
      const e = t.Lt({ fontSize: this.Vs(t) });
      this.Qs(e);
    } else {
      const e = this.Ns ? this.xt : t.fontSize, s = new X(this.q, e, t);
      await s.Dt(), this.Qs(s);
    }
    return this.Fs = t, this.xt = this.At.fontSize, this.qs(), this.At;
  }
  Js(t, e, s = {}) {
    if (!this.bs || !this.Es || !this.Ls) return;
    const i = this.Ss.renderer, r = this.Ts, h = s.skipPluginHooks ?? !1;
    h || t.te.$s(this);
    try {
      let o = !1;
      try {
        this.Es.begin(), o = !0, i.state.se.ie(), i.state.ee(), this.Bs.applyToState(i.state), t.re = this, this.ks.call(t);
      } finally {
        t.re = void 0, o && this.Es.end();
      }
      h || t.te.ne(this);
      const c = this.zs.length > 0, u = c ? this.Os : this.Ls;
      let l = !1;
      try {
        u.begin(), l = !0, i.he(e), e.oe({ u_characterTexture: this.At.framebuffer, u_charsetDimensions: [this.At.textureColumns, this.At.textureRows], Ub: this.Es.textures[0], Uc: this.Es.textures[1], Ud: this.Es.textures[2], Ue: !(this.At instanceof X && this.Is), Uf: [r.cols, r.rows], Ug: [u.width, u.height], Uh: [0, 0, 0, 0] }), i.ae(0, 0, r.width, r.height);
      } finally {
        l && u.end();
      }
      c && this.Ss.filterManager.ce(this.Os.textures[0], this.Ls, this.zs, this.Ls.width, this.Ls.height, this.Ds);
      try {
        this.Hs = !0, t.re = this, this.Rs.call(t);
      } finally {
        this.Hs = !1, t.re = void 0;
      }
      this.js.length > 0 && this.Ss.filterManager.ce(this.Ls.textures[0], this.Ls, this.js, this.Ls.width, this.Ls.height, this.Ds);
    } finally {
      this.zs = [], this.js = [], this.Hs = !1;
    }
  }
  ue() {
    var t;
    this.Es && this.Ls && ((t = this.Ts) == null || t.reset());
  }
  O() {
    var t, e, s, i, r, h, o;
    (t = this.Es) == null || t.dispose(), (e = this.Ls) == null || e.dispose(), (s = this.Os) == null || s.dispose(), (i = this.Ds) == null || i[0].dispose(), (r = this.Ds) == null || r[1].dispose(), (h = this.At) == null || h.dispose(), (o = this.Ts) == null || o.O();
  }
  get texture() {
    var t;
    return (t = this.Ls) == null ? void 0 : t.textures[0];
  }
  get grid() {
    return this.Ts;
  }
  get font() {
    return this.At;
  }
  get width() {
    return this.Ls ? this.Ls.width : 0;
  }
  get height() {
    return this.Ls ? this.Ls.height : 0;
  }
  get drawFramebuffer() {
    return this.Es;
  }
  get asciiFramebuffer() {
    return this.Ls;
  }
  qs() {
    if (!this.Ts || !this.At) return;
    const t = this.At.maxGlyphDimensions;
    this.Ts.L(t.width, t.height), this.Es && this.Ls && this.ue();
  }
  static Xs(t) {
    return typeof t == "string" && ct.includes(t);
  }
  Qs(t) {
    (this.Fs instanceof N || this.Fs instanceof X) && this.At === this.Fs || this.At === t || this.At.dispose(), this.At = t;
  }
  Vs(t) {
    return this.Ns ? this.xt : t.fontSize;
  }
  Ws() {
    this.Bs.applyToState(this.Ss.renderer.state);
  }
  Ks() {
    var s, i, r, h;
    if (this.Es) return { width: Math.max(1, this.Es.width), height: Math.max(1, this.Es.height) };
    if (this.Ts) return { width: Math.max(1, this.Ts.cols), height: Math.max(1, this.Ts.rows) };
    const t = ((s = this.Ss) == null ? void 0 : s.renderer.context.canvas.width) ?? ((i = this.Ss) == null ? void 0 : i.canvas.width) ?? 1, e = ((r = this.Ss) == null ? void 0 : r.renderer.context.canvas.height) ?? ((h = this.Ss) == null ? void 0 : h.canvas.height) ?? 1;
    return { width: Math.max(1, t), height: Math.max(1, e) };
  }
}
class Ae {
  constructor(t) {
    a(this, "le");
    a(this, "fe");
    a(this, "ks");
    a(this, "Et", !1);
    this.le = t;
  }
  draw(t) {
    this.ks = t;
  }
  async Dt() {
    if (this.Et) return;
    const t = this.de();
    this.fe = t, this.Et = !0;
  }
  O() {
    var t;
    this.Et && ((t = this.fe) == null || t.O(), this.Et = !1);
  }
  _e(t, e) {
    const s = this.fe;
    s.show(), s.draw(() => {
      this.le.clear(), this.le.push();
      try {
        (this.ks || t)(e), this.me(e);
      } finally {
        this.le.pop();
      }
    });
  }
  me(t) {
    const { textmodifier: e, grid: s } = t, i = [116, 101, 120, 116, 109, 111, 100, 101, 46, 106, 115].map((c) => String.fromCharCode(c)).join(""), r = (s.rows + 1 >> 1) - 2, h = 2 - (s.cols + 1 >> 1), o = [[142, 249, 243], [241, 91, 181], [255, 155, 113]];
    e.push(), e.translate(h, r, 0);
    for (let c = 0; c < i.length; c++) {
      const u = i[c], l = Math.floor(0.1 * e.frameCount + 0.5 * c) % o.length, [f, d, y] = o[l], v = e.color(f, d, y);
      e.charColor(v), e.char(u), e.point(), e.translateX(1);
    }
    e.pop();
  }
}
function Ft(n) {
  return parseInt(n, 16);
}
const Ge = /^rgba?\(([^)]+)\)$/i;
function K(n) {
  return Number.isNaN(n = Math.round(n)) ? 0 : Y(n, 0, 255);
}
function Ve(n, t = !1) {
  if (!n) return null;
  const e = n.trim().toLowerCase();
  if (!e) return null;
  let s = null;
  return e.startsWith("rgb") && (s = (function(i) {
    const r = Ge.exec(i.trim());
    if (!r) return null;
    const h = r[1].split(",").map((f) => f.trim());
    if (h.length < 3) return null;
    const o = K(parseFloat(h[0])), c = K(parseFloat(h[1])), u = K(parseFloat(h[2]));
    let l = 255;
    if (h[3] !== void 0) {
      const f = h[3].trim();
      let d = parseFloat(f);
      f.endsWith("%") && (d /= 100), l = 255 * Y(d, 0, 1);
    }
    return [o, c, u, Math.round(l)];
  })(e)), s && (t || s[3] !== 0) ? s : null;
}
class M {
  constructor(t, e, s, i) {
    a(this, "pe");
    a(this, "ve");
    a(this, "r");
    a(this, "g");
    a(this, "b");
    a(this, "a");
    this.r = K(t), this.g = K(e), this.b = K(s), this.a = K(i);
  }
  static ge(t, e, s, i) {
    if (t instanceof M) return t;
    if (Array.isArray(t)) {
      if (t.length < 3) throw Error("Component tuples must include at least RGB values.");
      const [r, h, o] = t, c = t.length === 4 ? t[3] : 255;
      return M.ye(r, h, o, c);
    }
    if (typeof t == "string") {
      const r = t.trim();
      if (r.length === 0) throw Error("Color strings cannot be empty.");
      const h = Ve(r, !0);
      return h ? M.ye(...h) : M.we(r);
    }
    if (typeof t == "number") return typeof e == "number" && typeof s == "number" ? M.ye(t, e, s, i ?? 255) : typeof e == "number" ? M.Ae(t, e) : M.Ae(t, i ?? 255);
    throw Error("Unsupported color input passed.");
  }
  static ye(t, e, s, i = 255) {
    return new M(t, e, s, i);
  }
  static Ae(t, e = 255) {
    return new M(t, t, t, e);
  }
  static we(t) {
    return new M(...(function(e) {
      const s = e.trim().replace(/^#|0x/gi, "");
      if (!/^[0-9A-Fa-f]+$/.test(s)) throw Error("Invalid hex color: " + e);
      const i = (r = s).length === 3 || r.length === 4 ? r.split("").map((h) => h + h).join("") : r;
      var r;
      if (i.length !== 6 && i.length !== 8) throw Error("Invalid hex color: " + e);
      return [Ft(i.slice(0, 2)), Ft(i.slice(2, 4)), Ft(i.slice(4, 6)), i.length === 8 ? Ft(i.slice(6, 8)) : 255];
    })(t));
  }
  static be(t, e, s, i) {
    return new M(Math.round(255 * t), Math.round(255 * e), Math.round(255 * s), Math.round(255 * i));
  }
  get rgb() {
    return [this.r, this.g, this.b];
  }
  get rgba() {
    return this.pe || (this.pe = [this.r, this.g, this.b, this.a]), [...this.pe];
  }
  get normalized() {
    return this.ve || (this.ve = [this.r / 255, this.g / 255, this.b / 255, this.a / 255]), [...this.ve];
  }
  withAlpha(t) {
    return new M(this.r, this.g, this.b, t);
  }
}
const Qe = ({ textmodifier: n, grid: t, errorTitle: e, errorMessage: s }) => {
  n.background("#222323"), n.cellColor("#222323");
  const i = M.ge("#FF6B6B"), r = M.ge("#C0C0C0");
  n.charColor(i), n.push(), n.translate(0, -2, 0), n.char("X"), n.rect(1, 1), n.pop();
  const h = e || "SKETCH ERROR", o = -Math.floor(h.length / 2);
  n.push(), n.translate(o, 0, 0);
  for (const v of h) n.char(v), n.rect(1, 1), n.translateX(1);
  n.pop(), n.charColor(n.color(r.r, r.g, r.b));
  const c = s || "Unknown error", u = Math.floor(0.8 * t.cols), l = oe(c, u), f = l.slice(0, 3);
  l.length > 3 && (f[2] = f[2].substring(0, u - 3) + "..."), f.forEach((v, g) => {
    const m = -Math.floor(v.length / 2);
    n.push(), n.translate(m, 3 + g, 0);
    for (const A of v) n.char(A), n.rect(1, 1), n.translateX(1);
    n.pop();
  });
  const d = oe("CHECK CONSOLE FOR DETAILS", u), y = 5 + f.length;
  d.forEach((v, g) => {
    const m = -Math.floor(v.length / 2);
    n.push(), n.translate(m, y + g, 0);
    for (const A of v) n.char(A), n.rect(1, 1), n.translateX(1);
    n.pop();
  });
}, oe = (n, t) => {
  const e = n.split(" "), s = [];
  let i = "";
  for (const r of e) (i + " " + r).length <= t ? i = i ? i + " " + r : r : (i && s.push(i), i = r);
  return i && s.push(i), s;
};
class we extends Ae {
  constructor(e) {
    super(e);
    a(this, "Me", "inactive");
    a(this, "xe", "SKETCH ERROR");
    a(this, "Ce", "Unknown error");
    a(this, "Pe", "");
  }
  async Dt() {
    this.Et || (await super.Dt(), this.fe.opacity(1), this.fe.hide());
  }
  get Fe() {
    return this.Et && this.Me === "active";
  }
  Se(e) {
    this.Te(e), this.Et && (this.fe.opacity(1), this.fe.show());
  }
  Ee() {
    this.Fe && this.Le();
  }
  O() {
    super.O();
  }
  de() {
    return new H(this.le.q, { visible: !0, opacity: 1 });
  }
  Le() {
    const e = { textmodifier: this.le, grid: this.fe.grid, errorTitle: this.xe, errorMessage: this.Ce, errorDetails: this.Pe || void 0 };
    this._e(Qe, e);
  }
  Te(e) {
    var s;
    if (this.Me = "active", e instanceof Error) {
      const i = (s = e.name) != null && s.trim() ? e.name.trim().toUpperCase() : "SKETCH ERROR";
      return this.xe = i.endsWith("ERROR") ? i : i + " ERROR", this.Ce = e.message || "Unknown error", void (this.Pe = e.stack || "");
    }
    if (typeof e == "string") return this.xe = "SKETCH ERROR", this.Ce = e || "Unknown error", void (this.Pe = "");
    this.xe = "SKETCH ERROR", this.Ce = "Unknown error", this.Pe = "";
  }
}
const fi = Object.freeze(Object.defineProperty({ __proto__: null, ErrorLayerController: we, TextmodeError: _, TextmodeErrorLevel: ye }, Symbol.toStringTag, { value: "Module" }));
function be(n, t) {
  n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL, 1), n.texImage2D(n.TEXTURE_2D, 0, n.RGBA, n.RGBA, n.UNSIGNED_BYTE, t);
}
function Dt(n, t, e) {
  n.bindTexture(n.TEXTURE_2D, t), be(n, e), n.bindTexture(n.TEXTURE_2D, null);
}
function Gt(n, t, e = n.NEAREST, s = n.NEAREST, i = n.CLAMP_TO_EDGE, r = n.CLAMP_TO_EDGE) {
  const h = (function(u, l, f = u.NEAREST, d = u.NEAREST, y = u.CLAMP_TO_EDGE, v = u.CLAMP_TO_EDGE) {
    const g = u.createTexture();
    return u.bindTexture(u.TEXTURE_2D, g), _e(u, f, d, y, v), be(u, l), u.bindTexture(u.TEXTURE_2D, null), g;
  })(n, t, e, s, i, r), { width: o, height: c } = (function(u) {
    let l = 0, f = 0;
    return u instanceof HTMLVideoElement ? (l = u.videoWidth, f = u.videoHeight) : u instanceof HTMLImageElement ? (l = u.naturalWidth, f = u.naturalHeight) : u instanceof HTMLCanvasElement && (l = u.width, f = u.height), { width: l, height: f };
  })(t);
  return { texture: h, width: o, height: c };
}
function _e(n, t, e, s, i) {
  n.texParameteri(n.TEXTURE_2D, n.TEXTURE_MIN_FILTER, t), n.texParameteri(n.TEXTURE_2D, n.TEXTURE_MAG_FILTER, e), n.texParameteri(n.TEXTURE_2D, n.TEXTURE_WRAP_S, s), n.texParameteri(n.TEXTURE_2D, n.TEXTURE_WRAP_T, i);
}
function ut(n, t, e, s, i, r = 0, h = n.FLOAT, o = !1) {
  n.enableVertexAttribArray(t), n.vertexAttribPointer(t, e, h, o, s, i), n.vertexAttribDivisor(t, r);
}
function jt(n, t, e, s, i) {
  n.bindBuffer(t, e), n.bufferData(t, s, i), n.bindBuffer(t, null);
}
class ot extends dt {
  constructor(e, s, i = s, r = 1, h = {}, o) {
    super();
    a(this, "o");
    a(this, "u");
    a(this, "Zt");
    a(this, "Oe");
    a(this, "J");
    a(this, "De", []);
    a(this, "ke", null);
    a(this, "Re");
    a(this, "q");
    a(this, "ze", null);
    a(this, "je", /* @__PURE__ */ new Map());
    this.o = s, this.u = i, this.Oe = e, this.Re = Y(r, 1, 8), this.q = o, this.Zt = { filter: "nearest", wrap: "clamp", format: "rgba", type: "unsigned_byte", depth: !0, ...h };
    const c = e.getParameter(e.MAX_DRAW_BUFFERS), u = e.getParameter(e.MAX_COLOR_ATTACHMENTS);
    this.Re = Math.min(this.Re, c, u), this.J = e.createFramebuffer(), this.He(), this.Ie(), this.Zt.depth && this.Be();
  }
  He() {
    const e = this.Oe, s = this.Zt.filter === "linear" ? e.LINEAR : e.NEAREST, i = this.Zt.wrap === "repeat" ? e.REPEAT : e.CLAMP_TO_EDGE;
    for (let r = 0; r < this.Re; r++) {
      const h = e.createTexture();
      e.bindTexture(e.TEXTURE_2D, h), _e(e, s, s, i, i), this.Ne(h, !1), this.De.push(h);
    }
    e.bindTexture(e.TEXTURE_2D, null);
  }
  Ne(e, s = !0) {
    const i = this.Oe, r = this.Zt.type === "float" ? i.FLOAT : i.UNSIGNED_BYTE, h = r === i.FLOAT ? i.RGBA32F : i.RGBA8, o = i.RGBA;
    s && i.bindTexture(i.TEXTURE_2D, e), i.texImage2D(i.TEXTURE_2D, 0, h, this.o, this.u, 0, o, r, null);
  }
  Ie() {
    const e = this.Oe;
    if (e.bindFramebuffer(e.FRAMEBUFFER, this.J), this.Re === 1) e.framebufferTexture2D(e.FRAMEBUFFER, e.COLOR_ATTACHMENT0, e.TEXTURE_2D, this.De[0], 0);
    else {
      const s = [];
      for (let i = 0; i < this.Re; i++) {
        const r = e.COLOR_ATTACHMENT0 + i;
        e.framebufferTexture2D(e.FRAMEBUFFER, r, e.TEXTURE_2D, this.De[i], 0), s.push(r);
      }
      e.drawBuffers(s);
    }
    e.bindFramebuffer(e.FRAMEBUFFER, null);
  }
  Be() {
    const e = this.Oe;
    this.ke = e.createRenderbuffer(), this.Ge(), e.bindFramebuffer(e.FRAMEBUFFER, this.J), e.framebufferRenderbuffer(e.FRAMEBUFFER, e.DEPTH_ATTACHMENT, e.RENDERBUFFER, this.ke), e.bindFramebuffer(e.FRAMEBUFFER, null);
  }
  Ge() {
    if (!this.ke) return;
    const e = this.Oe;
    e.bindRenderbuffer(e.RENDERBUFFER, this.ke), e.renderbufferStorage(e.RENDERBUFFER, e.DEPTH_COMPONENT24, this.o, this.u), e.bindRenderbuffer(e.RENDERBUFFER, null);
  }
  rt(e) {
    Dt(this.Oe, this.De[0], e);
  }
  resize(e, s) {
    this.o = e, this.u = s, this.je.clear();
    const i = this.Oe;
    for (const r of this.De) this.Ne(r, !0);
    i.bindTexture(i.TEXTURE_2D, null), this.Ge(), this.ze = null;
  }
  readPixels(e) {
    const s = this.je.get(e);
    if (s) return s;
    const i = this.Oe, r = this.o, h = this.u, o = new Uint8Array(r * h * 4), c = i.getParameter(i.READ_FRAMEBUFFER_BINDING);
    i.bindFramebuffer(i.READ_FRAMEBUFFER, this.J), i.readBuffer(i.COLOR_ATTACHMENT0 + e), i.readPixels(0, 0, r, h, i.RGBA, i.UNSIGNED_BYTE, o), i.bindFramebuffer(i.READ_FRAMEBUFFER, c);
    const u = 4 * r, l = new Uint8Array(o.length);
    for (let f = 0; f < h; f++) {
      const d = (h - 1 - f) * u, y = f * u;
      l.set(o.subarray(d, d + u), y);
    }
    return this.je.set(e, l), l;
  }
  begin() {
    const e = this.Oe;
    this.je.clear(), this.q.Xe(), this.q.Ye(this.J, this.o, this.u, this.Re), this.Zt.depth && e.clear(e.DEPTH_BUFFER_BIT), this.q.state.Ve();
  }
  end() {
    this.q.state.Qe(), this.q.Ke(), this.q.We();
  }
  Ze() {
    return this.ze || this.qe(), this.ze;
  }
  qe() {
    if (!this.q) return;
    const e = this.Re > 1, s = this.Re > 2, i = this.Re > 3, r = { U3: this.De[0], U4: e ? this.De[1] : this.De[0], U5: s ? this.De[2] : this.De[0], U6: i ? this.De[3] : this.De[0], U7: [this.o, this.u], U8: e, U9: s, Ua: i }, h = this.q.materialManager.Je;
    this.ze = this.q.materialManager.$e(h, r);
  }
  dispose() {
    const e = this.Oe;
    e.deleteFramebuffer(this.J), this.De.forEach((s) => {
      e.deleteTexture(s);
    }), this.ke && e.deleteRenderbuffer(this.ke), super.dispose();
  }
  get width() {
    return this.o;
  }
  get height() {
    return this.u;
  }
  get framebuffer() {
    return this.J;
  }
  get textures() {
    return this.De;
  }
  get attachmentCount() {
    return this.Re;
  }
}
function rt(n) {
  return typeof n == "object" && n !== null && "textures" in n && Array.isArray(n.textures);
}
function xe(n) {
  if (typeof n == "number" || typeof n == "boolean") return !0;
  if (Array.isArray(n)) {
    if (n.length === 0) return !0;
    const t = n[0];
    return typeof t == "number" || !!Array.isArray(t);
  }
  return n instanceof Float32Array || n instanceof Int32Array || !!rt(n) || typeof WebGLTexture < "u" && n instanceof WebGLTexture;
}
class lt extends dt {
  constructor(e, s, i) {
    super();
    a(this, "Oe");
    a(this, "tr");
    a(this, "ir", /* @__PURE__ */ new Map());
    a(this, "sr", /* @__PURE__ */ new Map());
    a(this, "er", /* @__PURE__ */ new Map());
    a(this, "rr", 0);
    a(this, "nr", /* @__PURE__ */ new Map());
    a(this, "hr");
    this.Oe = e, this.hr = e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS) ?? 16, this.tr = this.ar(s, i), this.cr();
  }
  cr() {
    const e = this.Oe.getProgramParameter(this.tr, this.Oe.ACTIVE_UNIFORMS);
    for (let s = 0; s < e; s++) {
      const i = this.Oe.getActiveUniform(this.tr, s);
      if (i) {
        const r = i.name.replace(/\[0\]$/, ""), h = this.Oe.getUniformLocation(this.tr, r);
        h && (this.ir.set(r, h), this.sr.set(r, { type: i.type, size: i.size }));
      }
    }
  }
  ar(e, s) {
    const i = this.ur(this.Oe.VERTEX_SHADER, e), r = this.ur(this.Oe.FRAGMENT_SHADER, s), h = this.Oe.createProgram();
    if (!h) throw Error("Failed to create WebGL program");
    if (this.Oe.attachShader(h, i), this.Oe.attachShader(h, r), this.Oe.linkProgram(h), !this.Oe.getProgramParameter(h, this.Oe.LINK_STATUS)) {
      const o = this.Oe.getProgramInfoLog(h);
      throw Error("Shader program link error: " + o);
    }
    return this.Oe.deleteShader(i), this.Oe.deleteShader(r), h;
  }
  ur(e, s) {
    const i = this.Oe.createShader(e);
    if (!i) throw Error("Failed to create shader of type " + e);
    if (this.Oe.shaderSource(i, s), this.Oe.compileShader(i), !this.Oe.getShaderParameter(i, this.Oe.COMPILE_STATUS)) {
      const r = this.Oe.getShaderInfoLog(i);
      throw this.Oe.deleteShader(i), Error("Shader compilation error: " + r);
    }
    return i;
  }
  lr() {
    this.Oe.useProgram(this.tr), this.dr();
  }
  dr() {
    this.rr = 0, this.nr.clear();
    for (const [e, s] of this.er) (s instanceof WebGLTexture || rt(s)) && this.er.delete(e);
  }
  oe(e) {
    for (const s in e) this._r(s, e[s]);
  }
  _r(e, s) {
    const i = this.ir.get(e);
    if (!i) return;
    const r = this.er.get(e);
    let h = !0;
    if (r !== void 0 && (typeof s == "number" || typeof s == "boolean" ? r === s && (h = !1) : (s instanceof WebGLTexture || rt(s)) && r === s && (h = !1)), !h) return;
    typeof s == "number" || typeof s == "boolean" || s instanceof WebGLTexture || rt(s) ? this.er.set(e, s) : this.er.delete(e);
    const o = this.sr.get(e);
    if (!o) return;
    const { type: c, size: u } = o, l = this.Oe;
    if (s instanceof WebGLTexture) {
      const f = this.mr(e);
      return l.uniform1i(i, f), l.activeTexture(l.TEXTURE0 + f), void l.bindTexture(l.TEXTURE_2D, s);
    }
    if (rt(s)) {
      const f = this.mr(e);
      return l.uniform1i(i, f), l.activeTexture(l.TEXTURE0 + f), void l.bindTexture(l.TEXTURE_2D, s.textures[0]);
    }
    if (xe(s), typeof s != "number") if (typeof s != "boolean") if (Array.isArray(s) && Array.isArray(s[0])) {
      const f = s.flat();
      switch (c) {
        case l.FLOAT_VEC2:
          l.uniform2fv(i, f);
          break;
        case l.FLOAT_VEC3:
          l.uniform3fv(i, f);
          break;
        case l.FLOAT_VEC4:
          l.uniform4fv(i, f);
      }
    } else {
      const f = s;
      switch (c) {
        case l.FLOAT:
          u > 1 ? l.uniform1fv(i, f) : l.uniform1f(i, f[0]);
          break;
        case l.FLOAT_VEC2:
          l.uniform2fv(i, f);
          break;
        case l.FLOAT_VEC3:
          l.uniform3fv(i, f);
          break;
        case l.FLOAT_VEC4:
          l.uniform4fv(i, f);
          break;
        case l.INT:
          u > 1 ? l.uniform1iv(i, f) : l.uniform1i(i, f[0]);
          break;
        case l.INT_VEC2:
          l.uniform2iv(i, f);
          break;
        case l.INT_VEC3:
          l.uniform3iv(i, f);
          break;
        case l.INT_VEC4:
          l.uniform4iv(i, f);
          break;
        case l.BOOL:
          l.uniform1iv(i, f);
          break;
        case l.FLOAT_MAT2:
          l.uniformMatrix2fv(i, !1, f);
          break;
        case l.FLOAT_MAT3:
          l.uniformMatrix3fv(i, !1, f);
          break;
        case l.FLOAT_MAT4:
          l.uniformMatrix4fv(i, !1, f);
      }
    }
    else l.uniform1i(i, s ? 1 : 0);
    else c === l.INT || c === l.BOOL ? l.uniform1i(i, s) : l.uniform1f(i, s);
  }
  mr(e) {
    const s = this.nr.get(e);
    if (s !== void 0) return s;
    if (this.rr >= this.hr) throw Error(`[textmode.js] Shader attempted to bind more than ${this.hr} texture samplers. Uniform "${e}" cannot be assigned.`);
    const i = this.rr++;
    return this.nr.set(e, i), i;
  }
  get program() {
    return this.tr;
  }
  dispose() {
    this.Oe.deleteProgram(this.tr), super.dispose();
  }
}
const Ee = /* @__PURE__ */ new WeakMap();
function kt(n, t) {
  Ee.set(n, t);
}
function Me(n) {
  return Ee.get(n);
}
class $e {
  constructor() {
    a(this, "pr", 0);
    a(this, "vr", 0);
    a(this, "gr", 0);
    a(this, "yr", 0);
    a(this, "wr", 0);
    a(this, "Ar", 0);
    a(this, "br", 1);
    a(this, "Mr", 1);
    a(this, "Cr", 1);
    a(this, "Pr", J());
    a(this, "Fr", J());
    a(this, "Sr", J());
  }
  Tr(t) {
    t.pr = this.pr, t.vr = this.vr, t.gr = this.gr, t.yr = this.yr, t.wr = this.wr, t.Ar = this.Ar, t.br = this.br, t.Mr = this.Mr, t.Cr = this.Cr;
    for (let e = 0; e < 16; e++) t.Pr[e] = this.Pr[e];
  }
  Er(t) {
    this.pr = t.pr, this.vr = t.vr, this.gr = t.gr, this.yr = t.yr, this.wr = t.wr, this.Ar = t.Ar, this.br = t.br, this.Mr = t.Mr, this.Cr = t.Cr;
    for (let e = 0; e < 16; e++) this.Pr[e] = t.Pr[e];
  }
  Lr(t = 0, e = 0, s = 0) {
    t === 0 && e === 0 && s === 0 || (this.Fr[0] = 1, this.Fr[1] = 0, this.Fr[2] = 0, this.Fr[3] = 0, this.Fr[4] = 0, this.Fr[5] = 1, this.Fr[6] = 0, this.Fr[7] = 0, this.Fr[8] = 0, this.Fr[9] = 0, this.Fr[10] = 1, this.Fr[11] = 0, this.Fr[12] = t, this.Fr[13] = e, this.Fr[14] = s, this.Fr[15] = 1, this.Or(this.Fr));
  }
  Dr(t, e, s) {
    const i = e === void 0 ? t : e, r = s === void 0 ? e === void 0 ? t : 1 : s;
    t === 1 && i === 1 && r === 1 || (this.Fr[0] = t, this.Fr[1] = 0, this.Fr[2] = 0, this.Fr[3] = 0, this.Fr[4] = 0, this.Fr[5] = i, this.Fr[6] = 0, this.Fr[7] = 0, this.Fr[8] = 0, this.Fr[9] = 0, this.Fr[10] = r, this.Fr[11] = 0, this.Fr[12] = 0, this.Fr[13] = 0, this.Fr[14] = 0, this.Fr[15] = 1, this.Or(this.Fr));
  }
  kr(t) {
    if (t === 0) return;
    const e = z(t);
    this.Fr[0] = 1, this.Fr[1] = 0, this.Fr[2] = 0, this.Fr[3] = 0, this.Fr[4] = 0, this.Fr[5] = Math.cos(e), this.Fr[6] = Math.sin(e), this.Fr[7] = 0, this.Fr[8] = 0, this.Fr[9] = -Math.sin(e), this.Fr[10] = Math.cos(e), this.Fr[11] = 0, this.Fr[12] = 0, this.Fr[13] = 0, this.Fr[14] = 0, this.Fr[15] = 1, this.Or(this.Fr);
  }
  Rr(t) {
    if (t === 0) return;
    const e = z(t);
    this.Fr[0] = Math.cos(e), this.Fr[1] = 0, this.Fr[2] = -Math.sin(e), this.Fr[3] = 0, this.Fr[4] = 0, this.Fr[5] = 1, this.Fr[6] = 0, this.Fr[7] = 0, this.Fr[8] = Math.sin(e), this.Fr[9] = 0, this.Fr[10] = Math.cos(e), this.Fr[11] = 0, this.Fr[12] = 0, this.Fr[13] = 0, this.Fr[14] = 0, this.Fr[15] = 1, this.Or(this.Fr);
  }
  zr(t) {
    if (t === 0) return;
    const e = z(t);
    this.Fr[0] = Math.cos(e), this.Fr[1] = Math.sin(e), this.Fr[2] = 0, this.Fr[3] = 0, this.Fr[4] = -Math.sin(e), this.Fr[5] = Math.cos(e), this.Fr[6] = 0, this.Fr[7] = 0, this.Fr[8] = 0, this.Fr[9] = 0, this.Fr[10] = 1, this.Fr[11] = 0, this.Fr[12] = 0, this.Fr[13] = 0, this.Fr[14] = 0, this.Fr[15] = 1, this.Or(this.Fr);
  }
  jr(t, e, s, i) {
    if (t === 0) return;
    const r = Math.hypot(e, s, i);
    if (r < 1e-6) return;
    const h = e / r, o = s / r, c = i / r, u = z(t), l = Math.cos(u), f = Math.sin(u), d = 1 - l;
    this.Fr[0] = d * h * h + l, this.Fr[1] = d * h * o + f * c, this.Fr[2] = d * h * c - f * o, this.Fr[3] = 0, this.Fr[4] = d * h * o - f * c, this.Fr[5] = d * o * o + l, this.Fr[6] = d * o * c + f * h, this.Fr[7] = 0, this.Fr[8] = d * h * c + f * o, this.Fr[9] = d * o * c - f * h, this.Fr[10] = d * c * c + l, this.Fr[11] = 0, this.Fr[12] = 0, this.Fr[13] = 0, this.Fr[14] = 0, this.Fr[15] = 1, this.Or(this.Fr);
  }
  Hr() {
    J(this.Pr), this.pr = 0, this.vr = 0, this.gr = 0, this.yr = 0, this.wr = 0, this.Ar = 0, this.br = 1, this.Mr = 1, this.Cr = 1;
  }
  Ir(t) {
    if (!this.Br(t)) throw Error("applyMatrix() only supports affine transform matrices without shear or perspective.");
    this.Or(t);
  }
  Or(t) {
    (function(e, s, i = new Float32Array(16)) {
      const r = e[0], h = e[1], o = e[2], c = e[3], u = e[4], l = e[5], f = e[6], d = e[7], y = e[8], v = e[9], g = e[10], m = e[11], A = e[12], w = e[13], b = e[14], C = e[15], x = s[0], F = s[1], O = s[2], P = s[3], U = s[4], L = s[5], k = s[6], $ = s[7], vt = s[8], yt = s[9], At = s[10], wt = s[11], bt = s[12], _t = s[13], xt = s[14], Et = s[15];
      i[0] = r * x + u * F + y * O + A * P, i[1] = h * x + l * F + v * O + w * P, i[2] = o * x + f * F + g * O + b * P, i[3] = c * x + d * F + m * O + C * P, i[4] = r * U + u * L + y * k + A * $, i[5] = h * U + l * L + v * k + w * $, i[6] = o * U + f * L + g * k + b * $, i[7] = c * U + d * L + m * k + C * $, i[8] = r * vt + u * yt + y * At + A * wt, i[9] = h * vt + l * yt + v * At + w * wt, i[10] = o * vt + f * yt + g * At + b * wt, i[11] = c * vt + d * yt + m * At + C * wt, i[12] = r * bt + u * _t + y * xt + A * Et, i[13] = h * bt + l * _t + v * xt + w * Et, i[14] = o * bt + f * _t + g * xt + b * Et, i[15] = c * bt + d * _t + m * xt + C * Et;
    })(this.Pr, t, this.Sr);
    for (let e = 0; e < 16; e++) this.Pr[e] = this.Sr[e];
    this.Nr();
  }
  Nr() {
    const t = this.Pr, e = this.yr, s = this.wr, i = this.Ar;
    this.pr = t[12], this.vr = t[13], this.gr = t[14];
    const r = t[0], h = t[1], o = t[2], c = t[4], u = t[5], l = t[6], f = t[8], d = t[9], y = t[10];
    let v = Math.hypot(r, h, o), g = Math.hypot(c, u, l), m = Math.hypot(f, d, y);
    v < 1e-6 && (v = 1e-6), g < 1e-6 && (g = 1e-6), m < 1e-6 && (m = 1e-6), t[0] * (t[5] * t[10] - t[6] * t[9]) - t[4] * (t[1] * t[10] - t[2] * t[9]) + t[8] * (t[1] * t[6] - t[2] * t[5]) < 0 && (m = -m), this.br = v, this.Mr = g, this.Cr = m;
    const A = r / v, w = c / g, b = d / m, C = y / m, x = Y(f / m, -1, 1), F = Math.asin(x);
    let O, P;
    Math.abs(Math.cos(F)) > 1e-6 ? (O = Math.atan2(-b, C), P = Math.atan2(-w, A)) : (O = Math.atan2(t[6] / g, t[5] / g), P = 0);
    const U = this.Gr(O + Math.PI), L = this.Gr(Math.PI - F), k = this.Gr(P + Math.PI), $ = Math.abs(this.Gr(O - e)) + Math.abs(this.Gr(F - s)) + Math.abs(this.Gr(P - i));
    Math.abs(this.Gr(U - e)) + Math.abs(this.Gr(L - s)) + Math.abs(this.Gr(k - i)) < $ ? (this.yr = U, this.wr = L, this.Ar = k) : (this.yr = O, this.wr = F, this.Ar = P);
  }
  Gr(t) {
    let e = (t + Math.PI) % (2 * Math.PI);
    return e < 0 && (e += 2 * Math.PI), e - Math.PI;
  }
  Br(t) {
    if (t.length !== 16 || Math.abs(t[3]) > 1e-6 || Math.abs(t[7]) > 1e-6 || Math.abs(t[11]) > 1e-6 || Math.abs(t[15] - 1) > 1e-6) return !1;
    const e = t[0], s = t[1], i = t[2], r = t[4], h = t[5], o = t[6], c = t[8], u = t[9], l = t[10], f = Math.hypot(e, s, i), d = Math.hypot(r, h, o), y = Math.hypot(c, u, l);
    if (f < 1e-6 || d < 1e-6 || y < 1e-6) return !1;
    const v = e / f, g = s / f, m = i / f, A = r / d, w = h / d, b = o / d, C = c / y, x = u / y, F = l / y, O = v * C + g * x + m * F, P = A * C + w * x + b * F;
    return Math.abs(v * A + g * w + m * b) < 1e-4 && Math.abs(O) < 1e-4 && Math.abs(P) < 1e-4;
  }
}
class ts {
  constructor() {
    a(this, "ps", !1);
    a(this, "Xr", 0);
    a(this, "Yr", 0);
    a(this, "ss", z(28.072486935852957));
    a(this, "ds", 0.1);
    a(this, "_s", 4096);
    a(this, "ts", !0);
    a(this, "es", 0);
    a(this, "rs", 0);
    a(this, "ns", 0);
    a(this, "Qi", 0);
    a(this, "Wi", 0);
    a(this, "Zi", 0);
    a(this, "qi", 0);
    a(this, "Ji", 1);
    a(this, "$i", 0);
  }
  Tr(t) {
    t.ps = this.ps, t.Xr = this.Xr, t.Yr = this.Yr, t.ss = this.ss, t.ds = this.ds, t._s = this._s, t.ts = this.ts, t.es = this.es, t.rs = this.rs, t.ns = this.ns, t.Qi = this.Qi, t.Wi = this.Wi, t.Zi = this.Zi, t.qi = this.qi, t.Ji = this.Ji, t.$i = this.$i;
  }
  Er(t) {
    this.ps = t.ps, this.Xr = t.Xr, this.Yr = t.Yr, this.ss = t.ss, this.ds = t.ds, this._s = t._s, this.ts = t.ts, this.es = t.es, this.rs = t.rs, this.ns = t.ns, this.Qi = t.Qi, this.Wi = t.Wi, this.Zi = t.Zi, this.qi = t.qi, this.Ji = t.Ji, this.$i = t.$i;
  }
  Vr(t) {
    if (t)
      return this.ps ? void 0 : (this.ps = !0, void this.Xr++);
    this.ps && (this.ps = !1, this.Xr++);
  }
  gs(t, e, s) {
    let i = !1;
    if (t !== void 0) {
      const r = z(Math.max(1, Math.min(179, t)));
      this.ss !== r && (this.ss = r, i = !0);
    }
    e === void 0 && s === void 0 || (i = this.Qr(e, s) || i), this.ps && (this.ps = !1, i = !0), i && this.Xr++;
  }
  vs(t, e) {
    let s = !1;
    s = this.Qr(t, e) || s, this.ps || (this.ps = !0, s = !0), s && this.Xr++;
  }
  cs(t, e, s, i = 0, r = 0, h = 0, o = 0, c = 1, u = 0) {
    (this.ts || this.es !== t || this.rs !== e || this.ns !== s || this.Qi !== i || this.Wi !== r || this.Zi !== h || this.qi !== o || this.Ji !== c || this.$i !== u) && (this.ts = !1, this.es = t, this.rs = e, this.ns = s, this.Qi = i, this.Wi = r, this.Zi = h, this.qi = o, this.Ji = c, this.$i = u, this.Yr++);
  }
  As(t, e, s, i, r, h) {
    let o = this.Qi !== t || this.Wi !== e || this.Zi !== s;
    i !== void 0 && this.qi !== i && (this.qi = i, o = !0), r !== void 0 && this.Ji !== r && (this.Ji = r, o = !0), h !== void 0 && this.$i !== h && (this.$i = h, o = !0), o && (this.Qi = t, this.Wi = e, this.Zi = s, this.Yr++);
  }
  ws() {
    (!this.ts || this.es !== 0 || this.rs !== 0 || this.ns !== 0 || this.Qi !== 0 || this.Wi !== 0 || this.Zi !== 0 || this.qi !== 0 || this.Ji !== 1 || this.$i !== 0) && (this.ts = !0, this.es = 0, this.rs = 0, this.ns = 0, this.Qi = 0, this.Wi = 0, this.Zi = 0, this.qi = 0, this.Ji = 1, this.$i = 0, this.Yr++);
  }
  Kr() {
    this.ps && (this.ps = !1, this.Xr++);
  }
  Qr(t, e) {
    if (t === void 0 && e === void 0) return !1;
    const s = t === void 0 ? this.ds : Math.max(1e-4, t), i = s + 1e-4, r = e === void 0 ? Math.max(this._s, i) : Math.max(i, e);
    return (s !== this.ds || r !== this._s) && (this.ds = s, this._s = r, !0);
  }
}
const et = 15;
class es {
  constructor() {
    a(this, "Wr", new Float32Array(3));
    a(this, "Zr", 0);
    a(this, "qr", new Float32Array(et));
    a(this, "Jr", new Float32Array(et));
    a(this, "$r", new Float32Array([1, 0, 0]));
    a(this, "tn", 0);
  }
  Tr(t) {
    t.Wr[0] = this.Wr[0], t.Wr[1] = this.Wr[1], t.Wr[2] = this.Wr[2], t.Zr = this.Zr, t.tn = this.tn;
    for (let e = 0; e < et; e++) t.qr[e] = this.qr[e], t.Jr[e] = this.Jr[e];
    t.$r[0] = this.$r[0], t.$r[1] = this.$r[1], t.$r[2] = this.$r[2];
  }
  Er(t) {
    this.Wr[0] = t.Wr[0], this.Wr[1] = t.Wr[1], this.Wr[2] = t.Wr[2], this.Zr = t.Zr, this.tn = t.tn;
    for (let e = 0; e < et; e++) this.qr[e] = t.qr[e], this.Jr[e] = t.Jr[e];
    this.$r[0] = t.$r[0], this.$r[1] = t.$r[1], this.$r[2] = t.$r[2];
  }
  sn(t, e, s) {
    this.Wr[0] += t, this.Wr[1] += e, this.Wr[2] += s, this.tn++;
  }
  en(t, e, s, i, r, h) {
    if (this.Zr >= 5) return;
    const o = 3 * this.Zr;
    this.qr[o] = i, this.qr[o + 1] = r, this.qr[o + 2] = h, this.Jr[o] = t, this.Jr[o + 1] = e, this.Jr[o + 2] = s, this.Zr++, this.tn++;
  }
  rn(t, e, s) {
    let i = Math.max(0, t);
    const r = Math.max(0, e), h = Math.max(0, s);
    i === 0 && r === 0 && h === 0 && (i = 1), this.$r[0] === i && this.$r[1] === r && this.$r[2] === h || (this.$r[0] = i, this.$r[1] = r, this.$r[2] = h, this.tn++);
  }
  nn() {
    const t = this.Wr[0] !== 0 || this.Wr[1] !== 0 || this.Wr[2] !== 0, e = this.Zr > 0, s = this.$r[0] !== 1 || this.$r[1] !== 0 || this.$r[2] !== 0;
    if (t || e || s) {
      this.Wr[0] = 0, this.Wr[1] = 0, this.Wr[2] = 0, this.Zr = 0;
      for (let i = 0; i < et; i++) this.qr[i] = 0, this.Jr[i] = 0;
      this.$r[0] = 1, this.$r[1] = 0, this.$r[2] = 0, this.tn++;
    }
  }
  ie() {
    const t = this.Wr[0] !== 0 || this.Wr[1] !== 0 || this.Wr[2] !== 0;
    if (this.Zr !== 0 || t) {
      this.Wr[0] = 0, this.Wr[1] = 0, this.Wr[2] = 0, this.Zr = 0;
      for (let e = 0; e < et; e++) this.qr[e] = 0, this.Jr[e] = 0;
      this.tn++;
    }
  }
}
function Ot(n, t, e, s, i = 255) {
  n[0] = t / 255, n[1] = (e ?? t) / 255, n[2] = (s ?? t) / 255, n[3] = i / 255;
}
class ss {
  constructor() {
    a(this, "hn", 1);
    a(this, "an", [0, 0, 0]);
    a(this, "cn", "");
    a(this, "un", [1, 1, 1, 1]);
    a(this, "ln", [0, 0, 0, 1]);
    a(this, "dn", !1);
    a(this, "_n", !1);
    a(this, "mn", !1);
    a(this, "pn", 0);
    a(this, "vn", [0, 0, 0, 1]);
  }
  Tr(t) {
    t.gn = this.hn, t.yn = this.dn, t.wn = this._n, t.mn = this.mn, t.pn = this.pn, t.An[0] = this.an[0], t.An[1] = this.an[1], t.An[2] = this.an[2], t.bn = this.cn, t.Mn[0] = this.un[0], t.Mn[1] = this.un[1], t.Mn[2] = this.un[2], t.Mn[3] = this.un[3], t.xn[0] = this.ln[0], t.xn[1] = this.ln[1], t.xn[2] = this.ln[2], t.xn[3] = this.ln[3];
  }
  Er(t) {
    this.hn = t.gn, this.dn = t.yn, this._n = t.wn, this.mn = t.mn, this.pn = t.pn, this.an[0] = t.An[0], this.an[1] = t.An[1], this.an[2] = t.An[2], this.cn = t.bn, this.un[0] = t.Mn[0], this.un[1] = t.Mn[1], this.un[2] = t.Mn[2], this.un[3] = t.Mn[3], this.ln[0] = t.xn[0], this.ln[1] = t.xn[1], this.ln[2] = t.xn[2], this.ln[3] = t.xn[3];
  }
  Cn(t) {
    this.hn = Math.abs(t);
  }
  Pn(t) {
    this.an[0] = t[0], this.an[1] = t[1], this.an[2] = t[2];
  }
  Fn(t) {
    this.cn = t;
  }
  Sn(t, e, s, i = 255) {
    Ot(this.un, t, e, s, i);
  }
  Tn(t, e, s, i = 255) {
    Ot(this.ln, t, e, s, i);
  }
  En(t) {
    this.dn = t;
  }
  Ln(t) {
    this._n = t;
  }
  On(t) {
    this.mn = t;
  }
  Dn(t) {
    this.pn = Wt(t);
  }
  kn(t, e, s, i) {
    Ot(this.vn, t, e, s, i);
  }
}
class Ut {
  constructor() {
    a(this, "Rn", new $e());
    a(this, "Ki", new ts());
    a(this, "se", new es());
    a(this, "An", new ss());
    a(this, "zn", []);
    a(this, "jn", []);
  }
  static Hn() {
    return { gn: 1, pr: 0, vr: 0, gr: 0, yr: 0, wr: 0, Ar: 0, br: 1, Mr: 1, Cr: 1, Pr: J(), pn: 0, yn: !1, wn: !1, mn: !1, ps: !1, Xr: 0, Yr: 0, ss: z(28.072486935852957), ds: 0.1, _s: 4096, ts: !0, es: 0, rs: 0, ns: 0, Qi: 0, Wi: 0, Zi: 0, qi: 0, Ji: 1, $i: 0, Zr: 0, qr: new Float32Array(15), Jr: new Float32Array(15), Wr: new Float32Array(3), $r: new Float32Array([1, 0, 0]), tn: 0, An: [0, 0, 0], bn: "", Mn: [1, 1, 1, 1], xn: [0, 0, 0, 1] };
  }
  In(t) {
    this.Rn.Tr(t), this.Ki.Tr(t), this.se.Tr(t), this.An.Tr(t);
  }
  Bn(t) {
    this.Rn.Er(t), this.Ki.Er(t), this.se.Er(t), this.An.Er(t);
  }
  Ve() {
    let t = this.jn.pop();
    t || (t = Ut.Hn()), this.In(t), this.zn.push(t);
  }
  Qe() {
    const t = this.zn.pop();
    t ? (this.Bn(t), this.jn.push(t)) : console.warn("pop() called without matching push()");
  }
  ee() {
    this.Rn.Hr(), this.Ki.Kr();
  }
}
var E = ((n) => (n.RECTANGLE = "rectangle", n.LINE = "line", n.ELLIPSE = "ellipse", n.ARC = "arc", n.TRIANGLE = "triangle", n.BEZIER_CURVE = "bezier_curve", n.BOX = "box", n.SPHERE = "sphere", n.TORUS = "torus", n.CONE = "cone", n.CYLINDER = "cylinder", n.ELLIPSOID = "ellipsoid", n))(E || {});
const is = { rectangle: 2, line: 2, ellipse: 2, triangle: 2, arc: 3, bezier_curve: 4, box: 5, sphere: 6, torus: 7, cone: 8, cylinder: 5, ellipsoid: 6 }, Jt = new Float32Array([-0.5, -0.5, 0, 0, 0.5, -0.5, 1, 0, -0.5, 0.5, 0, 1, -0.5, 0.5, 0, 1, 0.5, -0.5, 1, 0, 0.5, 0.5, 1, 1]), V = { Nn: 16, Gn: { Xn: { size: 2, offset: 0 }, Yn: { size: 2, offset: 8 } } };
class rs {
  constructor(t) {
    a(this, "Oe");
    a(this, "Vn");
    a(this, "Qn");
    this.Oe = t, this.Vn = t.createBuffer(), this.Qn = new Float32Array(Jt.length);
  }
  Kn(t, e, s, i) {
    const r = this.Oe, h = Me(this.Oe), o = h[2], c = h[3], u = t / o * 2 - 1, l = (t + s) / o * 2 - 1, f = 1 - (e + i) / c * 2, d = 1 - e / c * 2, y = Jt, v = this.Qn;
    for (let g = 0; g < y.length; g += 4) {
      const m = y[g], A = y[g + 1], w = y[g + 2], b = y[g + 3], C = u + (m + 0.5) * (l - u), x = f + (A + 0.5) * (d - f);
      v[g] = C, v[g + 1] = x, v[g + 2] = w, v[g + 3] = b;
    }
    r.bindBuffer(r.ARRAY_BUFFER, this.Vn), r.bufferData(r.ARRAY_BUFFER, v, r.DYNAMIC_DRAW), ut(r, 0, 2, 16, 0), ut(r, 1, 2, 16, 8), r.drawArrays(r.TRIANGLES, 0, 6), r.disableVertexAttribArray(1), r.disableVertexAttribArray(0), r.bindBuffer(r.ARRAY_BUFFER, null);
  }
  O() {
    this.Oe.deleteBuffer(this.Vn);
  }
}
class ns {
  constructor(t) {
    a(this, "Oe");
    a(this, "Wn", /* @__PURE__ */ new Map());
    a(this, "Zn", null);
    this.Oe = t;
  }
  qn(t, e, s, i, r) {
    const h = this.Oe, o = t.program;
    let c = this.Wn.get(t);
    c || (c = /* @__PURE__ */ new Map(), this.Wn.set(t, c), t.I(() => this.Jn(t)));
    let u = c.get(e) || null;
    if (u) this.Zn !== u && (h.bindVertexArray(u), this.Zn = u);
    else {
      u = h.createVertexArray(), c.set(e, u), h.bindVertexArray(u), this.Zn = u, h.bindBuffer(h.ARRAY_BUFFER, i), r && h.bindBuffer(h.ELEMENT_ARRAY_BUFFER, r);
      const l = h.getAttribLocation(o, "A0");
      l !== -1 && ut(h, l, s.Gn.Xn.size, s.Nn, s.Gn.Xn.offset, 0, h.FLOAT, !1);
      const f = h.getAttribLocation(o, "A1");
      f !== -1 && ut(h, f, s.Gn.Yn.size, s.Nn, s.Gn.Yn.offset, 0, h.FLOAT, !1);
    }
  }
  Jn(t) {
    const e = this.Wn.get(t);
    if (e) {
      for (const [, s] of e) s && this.Oe.deleteVertexArray(s);
      this.Wn.delete(t);
    }
  }
  $n() {
    this.Zn !== null && (this.Oe.bindVertexArray(null), this.Zn = null);
  }
  O() {
    for (const [, t] of this.Wn) for (const [, e] of t) e && this.Oe.deleteVertexArray(e);
    this.Wn.clear();
  }
}
class I {
}
a(I, "BYTES_PER_INSTANCE", 144), a(I, "FLOATS_PER_INSTANCE", 36);
function B(n, t) {
  return { location: -1, size: n, stride: I.BYTES_PER_INSTANCE, offset: t, divisor: 1 };
}
class Lt {
}
a(Lt, "STRIDE", I.BYTES_PER_INSTANCE), a(Lt, "ATTRIBUTES", { A2: B(2, 0), A3: B(2, 8), A4: B(3, 16), A5: B(4, 28), A6: B(4, 44), A7: B(4, 60), A8: B(3, 76), A9: B(3, 88), Ab: B(4, 100), Ac: B(4, 116), Aa: B(3, 132) });
class hs {
  constructor(t = 1e3, e = 1.5) {
    a(this, "th");
    a(this, "ih");
    a(this, "sh");
    a(this, "eh", 0);
    a(this, "rh", 0);
    this.ih = t, this.sh = e;
    const s = t * I.FLOATS_PER_INSTANCE;
    this.th = new Float32Array(s);
  }
  nh(t) {
    if (t <= this.ih) return;
    const e = Math.ceil(t * this.sh), s = this.ih;
    this.ih = e;
    const i = new Float32Array(e * I.FLOATS_PER_INSTANCE), r = s * I.FLOATS_PER_INSTANCE;
    i.set(this.th.subarray(0, Math.min(r, this.eh))), this.th = i;
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
class os {
  constructor(t) {
    a(this, "th");
    this.th = t;
  }
  uh(t) {
    this.th.rh >= this.th.ih && this.th.nh(this.th.rh + 1);
    const e = this.th.th, s = this.th.eh;
    e[s + 0] = t.x, e[s + 1] = t.y, e[s + 2] = t.width, e[s + 3] = t.height, e[s + 4] = t.char0, e[s + 5] = t.char1, e[s + 6] = t.char2, e[s + 7] = t.r1, e[s + 8] = t.g1, e[s + 9] = t.b1, e[s + 10] = t.a1, e[s + 11] = t.r2, e[s + 12] = t.g2, e[s + 13] = t.b2, e[s + 14] = t.a2, e[s + 15] = t.invert, e[s + 16] = t.flipX, e[s + 17] = t.flipY, e[s + 18] = t.charRot, e[s + 19] = t.translationX, e[s + 20] = t.translationY, e[s + 21] = t.translationZ, e[s + 22] = t.rotationX, e[s + 23] = t.rotationY, e[s + 24] = t.rotationZ;
    const i = t.curveParams0, r = t.curveParams1;
    return e[s + 25] = i[0], e[s + 26] = i[1], e[s + 27] = i[2], e[s + 28] = i[3], e[s + 29] = r[0], e[s + 30] = r[1], e[s + 31] = r[2], e[s + 32] = r[3], e[s + 33] = t.depth, e[s + 34] = t.baseZ, e[s + 35] = t.geometryType, this.th.hh(I.FLOATS_PER_INSTANCE), this.th.rh - 1;
  }
}
class as {
  constructor(t, e = 1e3) {
    a(this, "Oe");
    a(this, "fh", null);
    a(this, "dh", 0);
    a(this, "_h", /* @__PURE__ */ new WeakMap());
    a(this, "mh", 0);
    a(this, "ph", /* @__PURE__ */ new WeakMap());
    this.Oe = t, this.gh(e);
  }
  gh(t) {
    const e = this.Oe;
    this.fh && e.deleteBuffer(this.fh), this.mh++, this.fh = e.createBuffer();
    const s = t * I.BYTES_PER_INSTANCE;
    jt(e, e.ARRAY_BUFFER, this.fh, s, e.DYNAMIC_DRAW), this.dh = t;
  }
  yh(t) {
    this.gh(t);
  }
  wh(t, e) {
    if (e === 0) return;
    const s = this.Oe;
    s.bindBuffer(s.ARRAY_BUFFER, this.fh);
    const i = e * I.FLOATS_PER_INSTANCE;
    s.bufferSubData(s.ARRAY_BUFFER, 0, t, 0, i);
  }
  Ah(t) {
    let e = this._h.get(t);
    if (!e) {
      e = /* @__PURE__ */ new Map();
      const s = this.Oe;
      for (const i in Lt.ATTRIBUTES) {
        const r = i, h = s.getAttribLocation(t, r);
        h !== -1 && e.set(r, h);
      }
      this._h.set(t, e);
    }
    return e;
  }
  bh(t) {
    const e = this.Oe, s = t.program;
    if (this.ph.get(s) === this.mh) return;
    const i = this.Ah(s);
    for (const [r, h] of i) {
      const o = Lt.ATTRIBUTES[r];
      o && ut(e, h, o.size, o.stride, o.offset, o.divisor);
    }
    this.ph.set(s, this.mh);
  }
  O() {
    this.fh && (this.Oe.deleteBuffer(this.fh), this.fh = null);
  }
}
class cs {
  constructor(t, e = 1e3, s = 1.5) {
    a(this, "Oe");
    a(this, "th");
    a(this, "Mh");
    a(this, "xh");
    this.Oe = t, this.th = new hs(e, s), this.Mh = new os(this.th), this.xh = new as(t, e);
  }
  Ch(t) {
    var r, h, o, c, u, l, f, d, y, v;
    const e = this.th;
    e.rh >= e.ih && e.nh(e.rh + 1);
    const s = e.th, i = e.eh;
    return s[i + 0] = t.Xn[0], s[i + 1] = t.Xn[1], s[i + 2] = t.Ph[0], s[i + 3] = t.Ph[1], s[i + 4] = t.An[0], s[i + 5] = t.An[1], s[i + 6] = t.An[2], s[i + 7] = t.Mn[0], s[i + 8] = t.Mn[1], s[i + 9] = t.Mn[2], s[i + 10] = t.Mn[3], s[i + 11] = t.xn[0], s[i + 12] = t.xn[1], s[i + 13] = t.xn[2], s[i + 14] = t.xn[3], s[i + 15] = t.Fh[0], s[i + 16] = t.Fh[1], s[i + 17] = t.Fh[2], s[i + 18] = t.pn, s[i + 19] = ((r = t.Sh) == null ? void 0 : r[0]) ?? 0, s[i + 20] = ((h = t.Sh) == null ? void 0 : h[1]) ?? 0, s[i + 21] = ((o = t.Sh) == null ? void 0 : o[2]) ?? 0, s[i + 22] = ((c = t.Ps) == null ? void 0 : c[0]) ?? 0, s[i + 23] = ((u = t.Ps) == null ? void 0 : u[1]) ?? 0, s[i + 24] = ((l = t.Ps) == null ? void 0 : l[2]) ?? 0, t.Th && t.Eh ? (s[i + 25] = ((f = t.Lh) == null ? void 0 : f[0]) ?? 0, s[i + 26] = ((d = t.Lh) == null ? void 0 : d[1]) ?? 0, s[i + 27] = ((y = t.Oh) == null ? void 0 : y[0]) ?? 0, s[i + 28] = ((v = t.Oh) == null ? void 0 : v[1]) ?? 0, s[i + 29] = t.Th[0], s[i + 30] = t.Th[1], s[i + 31] = t.Eh[0], s[i + 32] = t.Eh[1]) : t.Dh ? (s[i + 25] = t.Dh[0], s[i + 26] = t.Dh[1], s[i + 27] = 0, s[i + 28] = 0, s[i + 29] = 0, s[i + 30] = 0, s[i + 31] = 0, s[i + 32] = 0) : (s[i + 25] = 0, s[i + 26] = 0, s[i + 27] = 0, s[i + 28] = 0, s[i + 29] = 0, s[i + 30] = 0, s[i + 31] = 0, s[i + 32] = 0), s[i + 33] = t.kh || 0, s[i + 34] = t.Rh || 0, s[i + 35] = t.zh || 0, e.hh(I.FLOATS_PER_INSTANCE), e.rh - 1;
  }
  jh() {
    this.th.ih > this.xh.dh && this.xh.yh(this.th.ih);
  }
  get instanceBuffer() {
    return this.th;
  }
  get writer() {
    return this.Mh;
  }
  Hh() {
    this.th.oh();
  }
  bh(t) {
    const e = this.th.rh;
    if (e === 0) return;
    this.jh();
    const s = this.th.ah();
    this.xh.wh(s, e), this.xh.bh(t);
  }
  Kn(t, e) {
    const s = this.th.rh;
    s !== 0 && this.Oe.drawArraysInstanced(t, 0, e, s);
  }
  Ih(t, e, s, i = 0) {
    const r = this.th.rh;
    r !== 0 && this.Oe.drawElementsInstanced(t, e, s, i, r);
  }
  O() {
    this.xh.O();
  }
}
class Q {
  constructor(t, e, s, i) {
    a(this, "Oe");
    a(this, "Bh");
    a(this, "Nh");
    a(this, "Gh");
    a(this, "Xh", null);
    a(this, "Yh", null);
    a(this, "Vh", [0, 0, 0, 0]);
    a(this, "Qh", [0, 0, 0, 0]);
    a(this, "Kh");
    var r, h;
    this.Oe = t, this.Bh = e, this.Nh = s, this.Gh = i, this.Kh = (r = this.Vh, h = this.Qh, { x: 0, y: 0, width: 0, height: 0, char0: 0, char1: 0, char2: 0, r1: 0, g1: 0, b1: 0, a1: 0, r2: 0, g2: 0, b2: 0, a2: 0, invert: 0, flipX: 0, flipY: 0, charRot: 0, translationX: 0, translationY: 0, translationZ: 0, rotationX: 0, rotationY: 0, rotationZ: 0, curveParams0: r, curveParams1: h, depth: 0, baseZ: 0, geometryType: 0 });
    const o = this.Oe.createBuffer();
    if (jt(this.Oe, this.Oe.ARRAY_BUFFER, o, this.Gh.Wh, this.Oe.STATIC_DRAW), this.Xh = o, this.Gh.Zh) {
      const c = this.Oe.createBuffer();
      jt(this.Oe, this.Oe.ELEMENT_ARRAY_BUFFER, c, this.Gh.Zh, this.Oe.STATIC_DRAW), this.Yh = c;
    }
  }
  get type() {
    return this.Nh;
  }
  get unitGeometry() {
    return this.Gh;
  }
  get unitBuffer() {
    return this.Xh;
  }
  get unitIndexBuffer() {
    return this.Yh;
  }
  get batch() {
    return this.Bh;
  }
  qh() {
    this.Bh.Hh();
  }
  Jh() {
    return this.Bh.th.rh !== 0;
  }
  O() {
    this.Bh.O(), this.Oe.deleteBuffer(this.Xh), this.Yh && this.Oe.deleteBuffer(this.Yh);
  }
  uh(t, e, s, i, r, h) {
    const o = r.pr ?? 0, c = r.vr ?? 0, u = r.gr ?? 0, l = r.yr ?? 0, f = r.wr ?? 0, d = r.Ar ?? 0, y = r.br ?? 1, v = r.Mr ?? 1, g = r.Cr ?? 1, m = this.Vh, A = this.Qh;
    m[0] = 0, m[1] = 0, m[2] = 0, m[3] = 0, A[0] = 0, A[1] = 0, A[2] = 0, A[3] = 0, h && (h.bezStartX !== void 0 && h.bezStartY !== void 0 && h.bezEndX !== void 0 && h.bezEndY !== void 0 ? (m[0] = h.cp1x ?? 0, m[1] = h.cp1y ?? 0, m[2] = h.cp2x ?? 0, m[3] = h.cp2y ?? 0, A[0] = h.bezStartX ?? 0, A[1] = h.bezStartY ?? 0, A[2] = h.bezEndX ?? 0, A[3] = h.bezEndY ?? 0) : h.arcStart === void 0 && h.arcStop === void 0 || (m[0] = h.arcStart ?? 0, m[1] = h.arcStop ?? 0));
    const w = this.Kh;
    return w.x = t * y, w.y = e * v, w.width = s * y, w.height = i * v, w.char0 = r.An[0], w.char1 = r.An[1], w.char2 = r.An[2], w.r1 = r.Mn[0], w.g1 = r.Mn[1], w.b1 = r.Mn[2], w.a1 = r.Mn[3], w.r2 = r.xn[0], w.g2 = r.xn[1], w.b2 = r.xn[2], w.a2 = r.xn[3], w.invert = r.mn ? 1 : 0, w.flipX = r.yn ? 1 : 0, w.flipY = r.wn ? 1 : 0, w.charRot = r.pn, w.translationX = o, w.translationY = c, w.translationZ = u, w.rotationX = l, w.rotationY = f, w.rotationZ = d, w.depth = ((h == null ? void 0 : h.depth) ?? 0) * g, w.baseZ = ((h == null ? void 0 : h.baseZ) ?? 0) * g, w.geometryType = is[this.Nh] ?? 0, this.Bh.writer.uh(w);
  }
}
const us = { Wh: Jt, $h: 6, ...V };
class ls extends Q {
  constructor(t, e) {
    super(t, e, E.RECTANGLE, us);
  }
  Ch(t, e) {
    return this.uh(0, 0, t.width, t.height, e);
  }
}
const fs = { Wh: new Float32Array([0, -0.5, 0, 0, 1, -0.5, 1, 0, 0, 0.5, 0, 1, 0, 0.5, 0, 1, 1, -0.5, 1, 0, 1, 0.5, 1, 1]), $h: 6, ...V };
class ds extends Q {
  constructor(t, e) {
    super(t, e, E.LINE, fs);
  }
  Ch(t, e) {
    const s = t.x2 - t.x1, i = t.y2 - t.y1, r = Math.hypot(s, i), h = Math.atan2(i, s), o = e.gn || 1, c = Math.cos(-h), u = Math.sin(-h), l = t.x1 * c - t.y1 * u, f = t.x1 * u + t.y1 * c, d = { ...e, Ar: (e.Ar || 0) + h };
    return this.uh(l, f, r, o, d);
  }
}
const ps = { Wh: (function(n = 32) {
  const t = [], e = 2 * Math.PI / n;
  for (let s = 0; s < n; s++) {
    const i = s * e, r = (s + 1) % n * e, h = Math.cos(i), o = Math.sin(i), c = 0.5 * (h + 1), u = 0.5 * (o + 1), l = Math.cos(r), f = Math.sin(r), d = 0.5 * (l + 1), y = 0.5 * (f + 1);
    t.push(0, 0, 0.5, 0.5, h, o, c, u, l, f, d, y);
  }
  return new Float32Array(t);
})(32), $h: 96, ...V };
class ms extends Q {
  constructor(t, e) {
    super(t, e, E.ELLIPSE, ps);
  }
  Ch(t, e) {
    return this.uh(0, 0, t.width, t.height, e);
  }
}
const gs = { Wh: (function(n) {
  const t = [];
  for (let e = 0; e < n; e++) {
    const s = e / n, i = (e + 1) / n;
    t.push(s, 0, s, 0, s, 1, s, 1, i, 1, i, 1);
  }
  return new Float32Array(t);
})(32), $h: 96, ...V };
class vs extends Q {
  constructor(t, e) {
    super(t, e, E.ARC, gs);
  }
  Ch(t, e) {
    const s = z(t.start), i = z(t.stop);
    return this.uh(0, 0, t.width, t.height, e, { arcStart: s, arcStop: i });
  }
}
const ys = { Wh: new Float32Array([0, 0, 0, 0, 1, 0, 1, 0, 0.5, 1, 0.5, 1]), $h: 3, ...V };
class As extends Q {
  constructor(t, e) {
    super(t, e, E.TRIANGLE, ys);
  }
  Ch(t, e) {
    const s = Math.min(t.x1, t.x2, t.x3), i = Math.max(t.x1, t.x2, t.x3), r = Math.min(t.y1, t.y2, t.y3), h = i - s, o = Math.max(t.y1, t.y2, t.y3) - r;
    return this.uh(s, r, h, o, e);
  }
}
const ws = { Wh: (function(n = 16) {
  const t = [];
  for (let e = 0; e < n; e++) {
    const s = e / n, i = (e + 1) / n;
    t.push(s, -0.5, s, 0, i, -0.5, i, 0, s, 0.5, s, 1, s, 0.5, s, 1, i, -0.5, i, 0, i, 0.5, i, 1);
  }
  return new Float32Array(t);
})(16), $h: 96, ...V };
class bs extends Q {
  constructor(t, e) {
    super(t, e, E.BEZIER_CURVE, ws);
  }
  Ch(t, e) {
    return this.uh(0, 0, 1, e.gn || 1, e, { cp1x: t.cp1x, cp1y: t.cp1y, cp2x: t.cp2x, cp2y: t.cp2y, bezStartX: t.x1, bezStartY: t.y1, bezEndX: t.x2, bezEndY: t.y2 });
  }
}
class st extends Q {
  constructor(t, e, s, i) {
    super(t, e, s, (function(r) {
      return { Wh: r.vertices, Zh: r.indices, $h: r.vertices.length / 4, io: r.indices.length, ...V };
    })(i));
  }
  Ch(t, e) {
    return this.uh(0, 0, t.width, t.height, e, { depth: t.depth });
  }
}
const _s = { vertices: new Float32Array([-0.5, -0.5, 0.5, 0, 0.5, -0.5, 0.5, 0, 0.5, 0.5, 0.5, 0, -0.5, 0.5, 0.5, 0, 0.5, -0.5, -0.5, 0, -0.5, -0.5, -0.5, 0, -0.5, 0.5, -0.5, 0, 0.5, 0.5, -0.5, 0, -0.5, -0.5, -0.5, 0, -0.5, -0.5, 0.5, 0, -0.5, 0.5, 0.5, 0, -0.5, 0.5, -0.5, 0, 0.5, -0.5, 0.5, 0, 0.5, -0.5, -0.5, 0, 0.5, 0.5, -0.5, 0, 0.5, 0.5, 0.5, 0, -0.5, 0.5, 0.5, 0, 0.5, 0.5, 0.5, 0, 0.5, 0.5, -0.5, 0, -0.5, 0.5, -0.5, 0, -0.5, -0.5, -0.5, 0, 0.5, -0.5, -0.5, 0, 0.5, -0.5, 0.5, 0, -0.5, -0.5, 0.5, 0]), indices: new Uint16Array([0, 1, 2, 0, 2, 3, 4, 5, 6, 4, 6, 7, 8, 9, 10, 8, 10, 11, 12, 13, 14, 12, 14, 15, 16, 17, 18, 16, 18, 19, 20, 21, 22, 20, 22, 23]) }, ae = (function(n = 12, t = 16) {
  const e = [], s = [];
  for (let r = 0; r <= n; r++) {
    const h = r / n * Math.PI, o = Math.sin(h), c = Math.cos(h);
    for (let u = 0; u <= t; u++) {
      const l = u / t * Math.PI * 2, f = Math.sin(l), d = Math.cos(l) * o * 0.5, y = 0.5 * c, v = f * o * 0.5;
      e.push(d, y, v, 0);
    }
  }
  const i = t + 1;
  for (let r = 0; r < n; r++) for (let h = 0; h < t; h++) {
    const o = r * i + h, c = o + i;
    s.push(o, c, o + 1, o + 1, c, c + 1);
  }
  return { vertices: new Float32Array(e), indices: new Uint16Array(s) };
})(14, 20), xs = (function(n = 16, t = 12) {
  const e = [], s = [];
  for (let r = 0; r <= n; r++) {
    const h = r / n * Math.PI * 2, o = Math.cos(h), c = Math.sin(h);
    for (let u = 0; u <= t; u++) {
      const l = u / t * Math.PI * 2, f = Math.cos(l), d = Math.sin(l);
      e.push(o, c, f, d);
    }
  }
  const i = t + 1;
  for (let r = 0; r < n; r++) for (let h = 0; h < t; h++) {
    const o = r * i + h, c = (r + 1) * i + h;
    s.push(o, c, o + 1, o + 1, c, c + 1);
  }
  return { vertices: new Float32Array(e), indices: new Uint16Array(s) };
})(20, 16), Es = (function(n = 20) {
  const t = [], e = [];
  t.push(0, 0.5, 0, 0), t.push(0, -0.5, 0, 0);
  for (let s = 0; s < n; s++) {
    const i = s / n * Math.PI * 2, r = 0.5 * Math.cos(i), h = 0.5 * Math.sin(i);
    t.push(r, -0.5, h, 0);
  }
  for (let s = 0; s < n; s++) {
    const i = 2 + s, r = 2 + (s + 1) % n;
    e.push(0, i, r), e.push(1, r, i);
  }
  return { vertices: new Float32Array(t), indices: new Uint16Array(e) };
})(24), Ms = (function(n = 24) {
  const t = [], e = [];
  t.push(0, 0.5, 0, 0), t.push(0, -0.5, 0, 0);
  for (let i = 0; i < n; i++) {
    const r = i / n * Math.PI * 2;
    t.push(0.5 * Math.cos(r), 0.5, 0.5 * Math.sin(r), 0);
  }
  for (let i = 0; i < n; i++) {
    const r = i / n * Math.PI * 2;
    t.push(0.5 * Math.cos(r), -0.5, 0.5 * Math.sin(r), 0);
  }
  const s = 2 + n;
  for (let i = 0; i < n; i++) {
    const r = (i + 1) % n, h = 2 + i, o = 2 + r, c = s + i, u = s + r;
    e.push(0, o, h), e.push(1, c, u), e.push(h, c, o), e.push(o, c, u);
  }
  return { vertices: new Float32Array(t), indices: new Uint16Array(e) };
})(24), Ts = { [E.RECTANGLE]: (n, t) => new ls(n, t), [E.LINE]: (n, t) => new ds(n, t), [E.ELLIPSE]: (n, t) => new ms(n, t), [E.ARC]: (n, t) => new vs(n, t), [E.TRIANGLE]: (n, t) => new As(n, t), [E.BEZIER_CURVE]: (n, t) => new bs(n, t), [E.BOX]: (n, t) => new st(n, t, E.BOX, _s), [E.SPHERE]: (n, t) => new st(n, t, E.SPHERE, ae), [E.TORUS]: (n, t) => new st(n, t, E.TORUS, xs), [E.CONE]: (n, t) => new st(n, t, E.CONE, Es), [E.CYLINDER]: (n, t) => new st(n, t, E.CYLINDER, Ms), [E.ELLIPSOID]: (n, t) => new st(n, t, E.ELLIPSOID, ae) };
class Cs {
  constructor(t) {
    a(this, "Oe");
    a(this, "so");
    a(this, "eo");
    a(this, "ro", null);
    a(this, "no", /* @__PURE__ */ new Map());
    a(this, "ho", null);
    a(this, "oo", "");
    a(this, "ao", J());
    a(this, "co", J());
    a(this, "uo", [0, 0, 0]);
    a(this, "lo", [0, 0, 0]);
    a(this, "fo", [0, 1, 0]);
    this.Oe = t, this.eo = new ns(t), this.so = /* @__PURE__ */ new Map();
    for (const e of Object.values(E)) {
      const s = new cs(t), i = (0, Ts[e])(t, s);
      this.so.set(e, i);
    }
  }
  do(t) {
    this.ro = null, this.no.clear(), this.ho = null, this.oo = "";
    let e = null, s = null, i = null, r = !1, h = -1, o = -1, c = -1, u = null;
    for (const l of t) e === l.material && s === l.type && r === l.state.ps && h === l.state.Xr && o === l.state.Yr && c === l.state.tn || (i && i.Jh() && this._o(i, e, s, u), e = l.material, s = l.type, i = this.so.get(s), r = l.state.ps, h = l.state.Xr, o = l.state.Yr, c = l.state.tn, u = l.state, i.qh()), i.Ch(l.params, l.state);
    i && i.Jh() && this._o(i, e, s, u), this.eo.$n();
  }
  _o(t, e, s, i) {
    this.ro !== e.shader && (e.shader.lr(), this.ro = e.shader), this.ho !== e && (e.shader.oe(e.uniforms), this.ho = e);
    const r = Me(this.Oe), h = `${i.Xr}:${i.Yr}:${i.tn}:${r[2]}:${r[3]}`;
    if (this.no.get(e.shader) !== h) {
      const l = `${i.Xr}:${i.Yr}:${r[2]}:${r[3]}`;
      this.oo !== l && (this.mo(i, r[2], r[3]), this.oo = l), e.shader.oe({ Uw: r[2] / r[3], Uu: this.ao, Uv: this.co, u_tmUseLighting: i.Zr > 0 || i.Wr[0] !== 0 || i.Wr[1] !== 0 || i.Wr[2] !== 0, u_tmAmbientLightColor: i.Wr, u_tmPointLightCount: i.Zr, u_tmPointLightPositions: i.qr, u_tmPointLightColors: i.Jr, u_tmLightFalloff: i.$r }), this.no.set(e.shader, h);
    }
    const o = t.unitGeometry, c = t.unitBuffer, u = o.po ?? this.Oe.TRIANGLES;
    try {
      this.eo.qn(e.shader, s + "", o, c, t.unitIndexBuffer), t.batch.bh(e.shader), o.Zh && o.io ? t.batch.Ih(u, o.io, o.vo ?? this.Oe.UNSIGNED_SHORT, o.yo ?? 0) : t.batch.Kn(u, o.$h);
    } finally {
      t.qh();
    }
  }
  mo(t, e, s) {
    const i = Math.max(1, s), r = Math.max(1 / 4096, e / i), h = t.ds, o = t._s;
    if (this.lo[0] = t.Qi, this.lo[1] = t.Wi, this.lo[2] = t.Zi, this.fo[0] = t.qi, this.fo[1] = t.Ji, this.fo[2] = t.$i, t.ts) {
      const c = 0.5 * i / Math.tan(0.5 * t.ss);
      this.uo[0] = this.lo[0], this.uo[1] = this.lo[1], this.uo[2] = this.lo[2] + c, he(this.uo, this.lo, this.fo, this.ao);
    } else this.uo[0] = t.es, this.uo[1] = t.rs, this.uo[2] = t.ns, he(this.uo, this.lo, this.fo, this.ao);
    if (t.ps) {
      const c = 0.5 * e, u = 0.5 * i;
      return void (function(l, f, d, y, v, g, m = new Float32Array(16)) {
        const A = 1 / (l - f), w = 1 / (d - y), b = 1 / (v - g);
        m[0] = -2 * A, m[1] = 0, m[2] = 0, m[3] = 0, m[4] = 0, m[5] = -2 * w, m[6] = 0, m[7] = 0, m[8] = 0, m[9] = 0, m[10] = 2 * b, m[11] = 0, m[12] = (l + f) * A, m[13] = (y + d) * w, m[14] = (g + v) * b, m[15] = 1;
      })(-c, c, -u, u, h, o, this.co);
    }
    (function(c, u, l, f, d = new Float32Array(16)) {
      const y = 1 / Math.tan(0.5 * c), v = 1 / (l - f);
      d[0] = y / u, d[1] = 0, d[2] = 0, d[3] = 0, d[4] = 0, d[5] = y, d[6] = 0, d[7] = 0, d[8] = 0, d[9] = 0, d[10] = (f + l) * v, d[11] = -1, d[12] = 0, d[13] = 0, d[14] = 2 * f * l * v, d[15] = 0;
    })(t.ss, r, h, o, this.co);
  }
  O() {
    for (const t of this.so.values()) t.O();
    this.so.clear(), this.eo.O();
  }
}
function Te(n) {
  let t = 0;
  for (let e = 0; e < n.length; e++)
    t = (t << 5) - t + n.charCodeAt(e), t &= t;
  return t;
}
const ce = /* @__PURE__ */ new WeakMap();
let Fs = 1;
function ue(n) {
  if (n == null) return 0;
  if (typeof n != "object" && typeof n != "function") return Te(n + "");
  let t = ce.get(n);
  return t || (t = Fs++, ce.set(n, t)), t;
}
function ht(n, t) {
  return (n << 5) - n + t;
}
const Vt = `#version 300 es
in vec2 A0;in vec2 A1;in vec2 A2;in vec2 A3;in vec3 A4;in vec4 A5;in vec4 A6;in vec4 A7;in vec3 A8;in vec3 A9;in vec3 Aa;uniform mat4 Uu;uniform mat4 Uv;out vec2 v_uv;out vec3 v_glyphIndex;out vec4 v_glyphColor;out vec4 v_cellColor;out vec4 v_glyphFlags;out vec3 v_worldPosition;out vec3 v_normal;out float v_geometryType;const float A=2.0f;vec3 B(vec3 C,float D){float E=cos(D);float F=sin(D);return vec3(C.x,C.y*E-C.z*F,C.y*F+C.z*E);}vec3 G(vec3 C,float D){float E=cos(D);float F=sin(D);return vec3(C.x*E+C.z*F,C.y,-C.x*F+C.z*E);}vec3 H(vec3 C,float D){float E=cos(D);float F=sin(D);return vec3(C.x*E-C.y*F,C.x*F+C.y*E,C.z);}vec3 I(vec3 C,vec3 J){vec3 K=C;if(J.z!=0.0f){K=H(K,J.z);}if(J.y!=0.0f){K=G(K,J.y);}if(J.x!=0.0f){K=B(K,J.x);}return K;}void main(){v_uv=A1;v_glyphIndex=A4;v_glyphColor=A5;v_cellColor=A6;v_glyphFlags=A7;vec2 L=A0.xy*A3+A2;float M=Aa.y;vec3 N=vec3(L,M);vec3 O=I(N,A9)+A8;v_worldPosition=O;v_normal=vec3(0.0f,0.0f,1.0f);v_geometryType=A;vec4 P=Uv*Uu*vec4(O,1.0f);P.y=-P.y;gl_Position=P;}`;
class Ps {
  constructor(t) {
    a(this, "wo", 0);
    a(this, "he");
    a(this, "Je");
    a(this, "Ao");
    a(this, "bo", /* @__PURE__ */ new Map());
    this.he = new lt(t, `#version 300 es
in vec2 A0;in vec2 A1;in vec2 A2;in vec2 A3;in vec3 A4;in vec4 A5;in vec4 A6;in vec4 A7;in vec3 A8;in vec3 A9;in vec4 Ab;in vec4 Ac;in vec3 Aa;uniform mat4 Uu;uniform mat4 Uv;out vec2 v_uv;out vec3 v_glyphIndex;out vec4 v_glyphColor;out vec4 v_cellColor;out vec4 v_glyphFlags;out vec3 v_worldPosition;out vec3 v_normal;out float v_geometryType;const float A=6.28318530718f;const int B=2;const int C=3;const int D=4;const int E=5;const int F=6;const int G=7;const int H=8;vec2 I(float J,vec2 K,vec2 L,vec2 M,vec2 N){float O=1.0f-J;float P=O*O;float Q=P*O;float R=J*J;float S=R*J;return Q*K+3.0f*P*J*L+3.0f*O*R*M+S*N;}vec2 T(float J,vec2 K,vec2 L,vec2 M,vec2 N){float O=1.0f-J;float P=O*O;float R=J*J;return-3.0f*P*K+3.0f*(P-2.0f*O*J)*L+3.0f*(2.0f*O*J-R)*M+3.0f*R*N;}vec3 U(vec3 V,float W){float X=cos(W);float Y=sin(W);return vec3(V.x,V.y*X-V.z*Y,V.y*Y+V.z*X);}vec3 Z(vec3 V,float W){float X=cos(W);float Y=sin(W);return vec3(V.x*X+V.z*Y,V.y,-V.x*Y+V.z*X);}vec3 a(vec3 V,float W){float X=cos(W);float Y=sin(W);return vec3(V.x*X-V.y*Y,V.x*Y+V.y*X,V.z);}vec3 b(vec3 V,vec3 c){vec3 d=V;if(c.z!=0.0f){d=a(d,c.z);}if(c.y!=0.0f){d=Z(d,c.y);}if(c.x!=0.0f){d=U(d,c.x);}return d;}void main(){v_uv=A1;v_glyphIndex=A4;v_glyphColor=A5;v_cellColor=A6;v_glyphFlags=A7;vec4 e=Ab;vec4 f=Ac;vec2 g=A3;vec2 h=A2;float i=Aa.x;float j=Aa.y;int k=int(Aa.z);vec3 l=vec3(0.0f);if(k==D){float J=clamp(A0.x,0.0f,1.0f);vec2 K=f.xy;vec2 L=e.xy;vec2 M=e.zw;vec2 N=f.zw;vec2 m=I(J,K,L,M,N);vec2 n=T(J,K,L,M,N);float o=length(n);vec2 p=o>0.0f?n/o:vec2(1.0f,0.0f);vec2 q=vec2(-p.y,p.x);vec2 r=m+q*A0.y*g.y;l=vec3(r,j);}else if(k==C){float s=mod(e.x,A);if(s<0.0f){s+=A;}float t=mod(e.y,A);if(t<0.0f){t+=A;}float u=s-t;if(u<=0.0f){u+=A;}float W=s-A0.x*u;vec2 v=vec2(cos(W),sin(W))*A0.y;vec2 r=v*g+h;l=vec3(r,j);}else if(k==B){vec2 r=A0.xy*g+h;l=vec3(r,j);}else if(k==G){float w=max(0.0f,g.x*0.5f);float x=max(0.0f,i*0.5f);float y=max(0.0f,g.y*0.5f);float z=max(0.0f,w-y);float AA=max(0.0f,x-y);float AB=A0.x;float AC=A0.y;float AD=A1.x;float AE=A1.y;float AF=z+y*AD;float AG=AA+y*AD;l=vec3(AF*AB+h.x,y*AE+h.y,AG*AC+j);}else if(k==E||k==F||k==H){l=vec3(A0.x*g.x+h.x,A0.y*g.y+h.y,A1.x*i+j);}vec3 AH=b(l,A9);vec3 AI=AH+A8;vec3 AJ=vec3(0.0f,0.0f,1.0f);v_worldPosition=AI;v_normal=AJ;v_geometryType=float(k);vec4 AK=Uv*Uu*vec4(AI,1.0f);AK.y=-AK.y;gl_Position=AK;}`, `#version 300 es
precision highp float;in vec3 v_glyphIndex;in vec4 v_glyphColor;in vec4 v_cellColor;in vec4 v_glyphFlags;in vec3 v_worldPosition;uniform bool u_tmUseLighting;uniform vec3 u_tmAmbientLightColor;uniform int u_tmPointLightCount;uniform vec3 u_tmPointLightPositions[5];uniform vec3 u_tmPointLightColors[5];uniform vec3 u_tmLightFalloff;layout(location=0)out vec4 o_character;layout(location=1)out vec4 o_primaryColor;layout(location=2)out vec4 o_secondaryColor;layout(location=3)out vec4 A;const int B=5;vec3 C(vec3 D){vec3 E=cross(dFdy(D),dFdx(D));float F=length(E);if(F<=0.000001f){return vec3(0.0f,0.0f,1.0f);}return E/F;}vec3 G(vec3 H,vec3 D){if(!u_tmUseLighting){return H;}vec3 I=H*u_tmAmbientLightColor;if(u_tmPointLightCount>0){vec3 E=C(D);for(int J=0;J<B;J++){if(J>=u_tmPointLightCount){break;}vec3 K=u_tmPointLightPositions[J]-D;float L=length(K);vec3 M=L>0.000001f?K/L:E;float N=max(dot(E,M),0.0f);float O=u_tmLightFalloff.x+L*u_tmLightFalloff.y+L*L*u_tmLightFalloff.z;float P=O>0.0f?1.0f/O:1.0f;I+=H*u_tmPointLightColors[J]*(N*P);}}return clamp(I,0.0f,1.0f);}void main(){int Q=int(v_glyphFlags.r>0.5?1:0);int R=int(v_glyphFlags.g>0.5?1:0);int S=int(v_glyphFlags.b>0.5?1:0);float T=float(Q|(R<<1)|(S<<2))/255.;o_character=vec4(v_glyphIndex.xy,T,clamp(v_glyphFlags.a,0.,1.));vec3 U=G(v_glyphColor.rgb,v_worldPosition);vec3 V=G(v_cellColor.rgb,v_worldPosition);o_primaryColor=vec4(U,v_glyphColor.a);o_secondaryColor=vec4(V,v_cellColor.a);A=vec4(0.);}`), this.Je = new lt(t, Vt, `#version 300 es
precision highp float;in vec2 v_uv;in vec3 v_worldPosition;uniform sampler2D U3;uniform sampler2D U4;uniform sampler2D U5;uniform sampler2D U6;uniform vec2 U7;uniform bool U8;uniform bool U9;uniform bool Ua;uniform bool u_tmUseLighting;uniform vec3 u_tmAmbientLightColor;uniform int u_tmPointLightCount;uniform vec3 u_tmPointLightPositions[5];uniform vec3 u_tmPointLightColors[5];uniform vec3 u_tmLightFalloff;layout(location=0)out vec4 o_character;layout(location=1)out vec4 o_primaryColor;layout(location=2)out vec4 o_secondaryColor;layout(location=3)out vec4 A;const int B=5;vec3 C(vec3 D){vec3 E=cross(dFdy(D),dFdx(D));float F=length(E);if(F<=0.000001f){return vec3(0.0f,0.0f,1.0f);}return E/F;}vec3 G(vec3 H,vec3 D){if(!u_tmUseLighting){return H;}vec3 I=H*u_tmAmbientLightColor;if(u_tmPointLightCount>0){vec3 E=C(D);for(int J=0;J<B;J++){if(J>=u_tmPointLightCount){break;}vec3 K=u_tmPointLightPositions[J]-D;float L=length(K);vec3 M=L>0.000001f?K/L:E;float N=max(dot(E,M),0.0f);float O=u_tmLightFalloff.x+L*u_tmLightFalloff.y+L*L*u_tmLightFalloff.z;float P=O>0.0f?1.0f/O:1.0f;I+=H*u_tmPointLightColors[J]*(N*P);}}return clamp(I,0.0f,1.0f);}void main(){vec2 Q=vec2(v_uv.x,1.-v_uv.y);vec2 R=Q*U7;vec2 S=(floor(R)+0.5f)/U7;vec4 T=texture(U3,S);vec4 U=U8?texture(U4,S):vec4(0.);if(U8&&U.a==0.){discard;}vec4 V=U9?texture(U5,S):vec4(0.);vec4 W=Ua?texture(U6,S):vec4(0.);vec3 X=G(U.rgb,v_worldPosition);vec3 Y=G(V.rgb,v_worldPosition);o_character=T;o_primaryColor=vec4(X,U.a);o_secondaryColor=vec4(Y,V.a);A=W;}`), this.Ao = { id: this.wo++, shader: this.he, uniforms: Object.freeze({}), hash: this.Mo(this.he, {}), isBuiltIn: !0 };
  }
  $e(t, e = {}) {
    return { id: this.wo++, shader: t, uniforms: Object.freeze({ ...e }), hash: 0, isBuiltIn: !1 };
  }
  Mo(t, e) {
    const s = ue(t.program), i = (function(r, h) {
      let o = 0;
      const c = Object.keys(r).sort();
      for (const u of c) o = ht(o, Te(u)), o = ht(o, h(r[u]));
      return o;
    })(e, this.xo.bind(this));
    return ht(s, i);
  }
  xo(t) {
    return typeof t == "number" || typeof t == "boolean" ? (function(e) {
      return typeof e == "boolean" ? e ? 1 : 0 : Math.floor(e);
    })(t) : Array.isArray(t) ? (function(e) {
      let s = 0;
      const i = Array.isArray(e[0]) ? e.flat() : e;
      for (const r of i) s = ht(s, typeof r == "number" ? r : 0);
      return s;
    })(t) : t instanceof Float32Array || t instanceof Int32Array ? (function(e) {
      let s = 0;
      const i = Math.min(e.length, 16);
      for (let r = 0; r < i; r++) s = ht(s, e[r]);
      return s;
    })(t) : t instanceof WebGLTexture || rt(t) ? ue(t) : 0;
  }
  O() {
    this.he.dispose(), this.Je.dispose(), this.bo.clear();
  }
}
class Os {
  constructor() {
    a(this, "Co", []);
    a(this, "Po", 1);
    a(this, "Ph", 0);
  }
  Fo(t, e) {
    if (this.Ph >= this.Co.length) {
      const i = { id: this.Po++, type: t, params: {}, state: Ut.Hn(), material: e };
      this.Co.push(i);
    }
    const s = this.Co[this.Ph];
    return s.id = this.Po++, s.type = t, s.material = e, this.Ph++, s;
  }
  So(t, e, s) {
    const i = this.Fo(E.RECTANGLE, s), r = i.params;
    return r.width = t.width, r.height = t.height, e.In(i.state), i.id;
  }
  To(t, e, s) {
    const i = this.Fo(E.LINE, s), r = i.params;
    return r.x1 = t.x1, r.y1 = t.y1, r.x2 = t.x2, r.y2 = t.y2, r.thickness = t.thickness, e.In(i.state), i.id;
  }
  Eo(t, e, s) {
    const i = this.Fo(E.ELLIPSE, s), r = i.params;
    return r.width = t.width, r.height = t.height, r.startAngle = t.startAngle, r.endAngle = t.endAngle, r.segments = t.segments, e.In(i.state), i.id;
  }
  Lo(t, e, s) {
    const i = this.Fo(E.ARC, s), r = i.params;
    return r.width = t.width, r.height = t.height, r.start = t.start, r.stop = t.stop, e.In(i.state), i.id;
  }
  Oo(t, e, s) {
    const i = this.Fo(E.TRIANGLE, s), r = i.params;
    return r.x1 = t.x1, r.y1 = t.y1, r.x2 = t.x2, r.y2 = t.y2, r.x3 = t.x3, r.y3 = t.y3, e.In(i.state), i.id;
  }
  Do(t, e, s) {
    const i = this.Fo(E.BEZIER_CURVE, s), r = i.params;
    return r.x1 = t.x1, r.y1 = t.y1, r.cp1x = t.cp1x, r.cp1y = t.cp1y, r.cp2x = t.cp2x, r.cp2y = t.cp2y, r.x2 = t.x2, r.y2 = t.y2, r.thickness = t.thickness, r.segments = t.segments, e.In(i.state), i.id;
  }
  ko(t, e, s, i) {
    const r = this.Fo(t, i), h = r.params;
    return h.width = e.width, h.height = e.height, h.depth = e.depth, s.In(r.state), r.id;
  }
  Hh() {
    this.Ph = 0;
  }
  [Symbol.iterator]() {
    let t = 0;
    const e = this.Ph, s = this.Co;
    return { next: () => t < e ? { value: s[t++], done: !1 } : { value: void 0, done: !0 } };
  }
}
class Rs {
  constructor(t) {
    a(this, "Oe");
    a(this, "ro", null);
    a(this, "Ro");
    a(this, "zo");
    a(this, "jo");
    a(this, "Ho");
    a(this, "Io");
    a(this, "Bo", null);
    a(this, "No", {});
    a(this, "Go", []);
    a(this, "Xo", []);
    a(this, "Yo", []);
    a(this, "Vo", []);
    a(this, "Qo", null);
    a(this, "Ko", [0, 0, 0, 0]);
    a(this, "Wo", 1);
    a(this, "Zo", !0);
    a(this, "qo", !0);
    a(this, "Jo", !1);
    a(this, "$o", new Float32Array(4));
    a(this, "ta", /* @__PURE__ */ new Set());
    this.Oe = t, t.enable(t.DEPTH_TEST), t.depthFunc(t.LEQUAL), t.clearDepth(1), t.depthMask(!0), this.Zo = !0, this.qo = !0, t.disable(t.CULL_FACE), this.jo = new Ut(), this.zo = new Ps(t), this.Ho = new Os(), this.Ro = new Cs(t), this.Io = new rs(t);
    const e = [0, 0, t.canvas.width, t.canvas.height];
    kt(t, e), this.Xo.push(null), this.Yo.push(e), this.Vo.push(1), this.Qo = null, this.Ko = e, this.Wo = 1;
  }
  Xe() {
    this.Xo.push(this.Qo), this.Yo.push([...this.Ko]), this.Vo.push(this.Wo);
  }
  We() {
    const t = this.Xo.pop() ?? null, e = this.Yo.pop() ?? [0, 0, this.Oe.canvas.width, this.Oe.canvas.height], s = this.Vo.pop() ?? 1;
    this.Ye(t, e[2], e[3], s);
  }
  Ye(t, e, s, i = 1) {
    const r = this.Oe;
    this.Qo !== t && (r.bindFramebuffer(r.FRAMEBUFFER, t), this.Qo = t), this.Wo = i;
    const h = [0, 0, e, s];
    this.Ko[0] === h[0] && this.Ko[1] === h[1] && this.Ko[2] === h[2] && this.Ko[3] === h[3] || (r.viewport(...h), kt(r, h), this.Ko = h);
  }
  he(t) {
    this.ro !== t && (this.ro = t, t.lr());
  }
  ia(t) {
    if (this.Jo = t, t) this.ta.clear();
    else {
      for (const e of this.ta) e.sa();
      this.ta.clear();
    }
  }
  ea() {
    return this.Jo;
  }
  ur(t, e) {
    return new lt(this.Oe, t, e);
  }
  ra(t) {
    this.Bo = t, t && (this.No = {});
  }
  na() {
    this.Bo = null, this.No = {};
  }
  _r(t, e) {
    this.No[t] = e;
  }
  oe(t) {
    Object.assign(this.No, t);
  }
  ha(t = !1) {
    this.Go.push({ shader: this.Bo, uniforms: { ...this.No } }), t && this.na();
  }
  oa() {
    const t = this.Go.pop();
    t && (this.Bo = t.shader, this.No = t.shader ? { ...t.uniforms } : {});
  }
  aa(t) {
    return new lt(this.Oe, Vt, t);
  }
  ca(t, e, s, i) {
    t instanceof ot || !i || t.ua(i);
    const r = t instanceof ot ? [t.Ze()] : t.la(), h = { width: e ?? t.width, height: s ?? t.height };
    for (const o of r) this.Ho.So(h, this.jo, o);
    t instanceof ot || !t.fa() || this.ta.add(t);
  }
  ae(t, e, s, i) {
    this.Io.Kn(t, e, s, i);
  }
  da(t, e) {
    if (this.Bo) {
      const s = this.zo.$e(this.Bo, this.No);
      this.Ho.So({ width: t, height: e }, this.jo, s);
    } else this.Ho.So({ width: t, height: e }, this.jo, this.zo.Ao);
  }
  _a(t, e, s, i) {
    this.Ho.To({ x1: t, y1: e, x2: s, y2: i }, this.jo, this.zo.Ao);
  }
  ma(t, e) {
    this.Ho.Eo({ width: t, height: e }, this.jo, this.zo.Ao);
  }
  pa(t, e, s, i, r, h) {
    this.Ho.Oo({ x1: t, y1: e, x2: s, y2: i, x3: r, y3: h }, this.jo, this.zo.Ao);
  }
  va(t, e, s, i, r, h, o, c) {
    this.Ho.Do({ x1: t, y1: e, cp1x: s, cp1y: i, cp2x: r, cp2y: h, x2: o, y2: c }, this.jo, this.zo.Ao);
  }
  ga(t, e, s, i) {
    this.Ho.Lo({ width: t, height: e, start: s, stop: i }, this.jo, this.zo.Ao);
  }
  ya(t, e, s) {
    this.Ho.ko(E.BOX, { width: t, height: e, depth: s }, this.jo, this.zo.Ao);
  }
  wa(t) {
    this.Ho.ko(E.SPHERE, { width: 2 * t, height: 2 * t, depth: 2 * t }, this.jo, this.zo.Ao);
  }
  ba(t, e) {
    const s = 2 * (t + e);
    this.Ho.ko(E.TORUS, { width: s, height: 2 * e, depth: s }, this.jo, this.zo.Ao);
  }
  Ma(t, e) {
    this.Ho.ko(E.CONE, { width: 2 * t, height: e, depth: 2 * t }, this.jo, this.zo.Ao);
  }
  xa(t, e) {
    this.Ho.ko(E.CYLINDER, { width: 2 * t, height: e, depth: 2 * t }, this.jo, this.zo.Ao);
  }
  Ca(t, e, s) {
    this.Ho.ko(E.ELLIPSOID, { width: 2 * t, height: 2 * e, depth: 2 * s }, this.jo, this.zo.Ao);
  }
  et(t, e, s = 1, i = {}) {
    return new ot(this.Oe, t, e, s, i, this);
  }
  Pa(t, e = t, s = t, i = 255) {
    this.jo.An.kn(t, e ?? t, s ?? t, i);
    const [r, h, o, c] = this.jo.An.vn;
    this.Fa(r, h, o, c, !1);
  }
  Hh(t = 0, e = 0, s = 0, i = 0) {
    this.Fa(t, e, s, i, !0);
  }
  Fa(t, e, s, i, r) {
    const h = this.Oe, o = this.$o;
    if (this.Wo > 1) {
      o[0] = r ? 1 : 0, o[1] = r ? 1 : 0, o[2] = 0, o[3] = 0, h.clearBufferfv(h.COLOR, 0, o), o[0] = 0, o[1] = 0, o[2] = 0, o[3] = 0, h.clearBufferfv(h.COLOR, 1, o), this.Wo >= 3 && (o[0] = t, o[1] = e, o[2] = s, o[3] = i, h.clearBufferfv(h.COLOR, 2, o)), this.Wo >= 3 && (o[0] = 0, o[1] = 0, o[2] = 0, o[3] = 0);
      for (let c = 3; c < this.Wo; c++) h.clearBufferfv(h.COLOR, c, o);
    } else h.clearColor(t, e, s, i), h.clear(h.COLOR_BUFFER_BIT);
  }
  Sa() {
    const t = [0, 0, this.Oe.canvas.width, this.Oe.canvas.height];
    this.Oe.viewport(...t), kt(this.Oe, t), this.Ko = t, this.Yo.length > 0 && (this.Yo[0] = t);
  }
  Ta(t) {
    this.Zo !== t && (t ? this.Oe.enable(this.Oe.DEPTH_TEST) : this.Oe.disable(this.Oe.DEPTH_TEST), this.Zo = t);
  }
  Ea(t) {
    this.qo !== t && (this.Oe.depthMask(t), this.qo = t);
  }
  La() {
    return this.Zo;
  }
  Oa() {
    return this.qo;
  }
  Ke() {
    const t = this.Ho;
    this.Ro.do(t), t.Hh(), this.ro = null;
  }
  O() {
    this.zo.O(), this.Ro.O(), this.Io.O();
  }
  get context() {
    return this.Oe;
  }
  get state() {
    return this.jo;
  }
  get materialManager() {
    return this.zo;
  }
}
class Ss {
  constructor(t = {}) {
    a(this, "m");
    a(this, "Da", null);
    a(this, "ka", !1);
    a(this, "Ra");
    a(this, "za", null);
    a(this, "ja", !0);
    a(this, "Oe", null);
    a(this, "Ha", null);
    a(this, "Ia", null);
    a(this, "Ba", !1);
    if (this.ka = t.overlay ?? !1, t.gl) this.za = t.gl, this.m = t.gl.canvas, this.Ra = !1, this.ja = !1;
    else if (this.ka && t.canvas) this.Da = t.canvas, this.m = this.Na(), this.Ra = !0, this.Ga();
    else if (t.canvas) {
      if (typeof HTMLVideoElement < "u" && t.canvas instanceof HTMLVideoElement) throw new _("Video elements are only supported in overlay mode.");
      this.m = t.canvas, this.Ra = !1;
    } else this.m = this.Xa(t.width, t.height), this.Ra = !0;
    typeof HTMLCanvasElement < "u" && this.m instanceof HTMLCanvasElement && (this.m.style.imageRendering = "pixelated");
  }
  Xa(t, e) {
    const s = document.createElement("canvas");
    return s.className = "textmodeCanvas", s.style.imageRendering = "pixelated", s.width = t || 800, s.height = e || 600, this.Ya(s), s;
  }
  Ya(t) {
    const e = () => {
      if (this.Ba || t.parentNode) return;
      const s = document.body;
      s && s.appendChild(t);
    };
    document.body ? e() : (this.Ha = () => {
      this.Ha = null, e();
    }, document.addEventListener("DOMContentLoaded", this.Ha, { once: !0 }));
  }
  Na() {
    const t = document.createElement("canvas");
    t.className = "textmodeCanvas", t.style.imageRendering = "pixelated";
    const e = this.Da.getBoundingClientRect();
    let s = Math.round(e.width), i = Math.round(e.height);
    if (typeof HTMLVideoElement < "u" && this.Da instanceof HTMLVideoElement) {
      const o = this.Da;
      (s === 0 || i === 0) && o.videoWidth > 0 && o.videoHeight > 0 && (s = o.videoWidth, i = o.videoHeight);
    }
    t.width = s, t.height = i, t.style.position = "absolute";
    const r = window.getComputedStyle(this.Da);
    let h = parseInt(r.zIndex || "0", 10);
    return isNaN(h) && (h = 0), t.style.zIndex = "" + (h + 1), t;
  }
  Ga() {
    var t;
    this.Va(), this.Qa(), (t = this.Da) != null && t.parentNode || document.readyState !== "loading" || (this.Ia = () => {
      this.Ia = null, this.Ba || (this.Va(), this.Qa());
    }, document.addEventListener("DOMContentLoaded", this.Ia, { once: !0 }));
  }
  Qa() {
    var t;
    this.m instanceof HTMLCanvasElement && this.Da && !this.m.parentNode && ((t = this.Da.parentNode) == null || t.insertBefore(this.m, this.Da.nextSibling));
  }
  Va() {
    if (!this.Da || !(this.m instanceof HTMLCanvasElement)) return;
    const t = this.Da.getBoundingClientRect(), e = this.Da.offsetParent;
    if (e && e !== document.body) {
      const s = e.getBoundingClientRect();
      this.m.style.top = t.top - s.top + "px", this.m.style.left = t.left - s.left + "px";
    } else this.m.style.top = t.top + window.scrollY + "px", this.m.style.left = t.left + window.scrollX + "px";
  }
  ue(t, e) {
    if (this.ka) {
      const s = this.Da.getBoundingClientRect();
      this.m.width = Math.round(s.width), this.m.height = Math.round(s.height), this.Va();
    } else this.m.width = t ?? this.m.width, this.m.height = e ?? this.m.height;
  }
  Ka() {
    if (this.za) return this.za;
    const t = this.m.getContext("webgl2", { alpha: !0, premultipliedAlpha: !1, preserveDrawingBuffer: !0, antialias: !1, depth: !0, stencil: !1, powerPreference: "high-performance" });
    if (!t) throw new _("`textmode.js` requires WebGL2 support.");
    return this.Oe = t, t;
  }
  O() {
    if (this.Ba || (this.Ba = !0, this.Wa(), !this.ja)) return;
    const t = this.Oe ?? this.za;
    if (t) {
      const e = t.getExtension("WEBGL_lose_context");
      e == null || e.loseContext();
    }
    this.Ra && typeof HTMLCanvasElement < "u" && this.m instanceof HTMLCanvasElement && this.m.parentNode && this.m.parentNode.removeChild(this.m);
  }
  Wa() {
    this.Ha && (document.removeEventListener("DOMContentLoaded", this.Ha), this.Ha = null), this.Ia && (document.removeEventListener("DOMContentLoaded", this.Ia), this.Ia = null);
  }
  get canvas() {
    return this.m;
  }
  get targetCanvas() {
    return this.Da;
  }
  get width() {
    return this.m.width;
  }
  get height() {
    return this.m.height;
  }
  get ownsContext() {
    return this.ja;
  }
}
class pt extends dt {
  constructor(e, s, i, r, h, o, c, u) {
    super();
    a(this, "Oe");
    a(this, "q");
    a(this, "Za");
    a(this, "qa");
    a(this, "Ja");
    a(this, "o");
    a(this, "u");
    a(this, "ze", null);
    a(this, "$a", null);
    a(this, "tc", "brightness");
    a(this, "sc", null);
    a(this, "ec");
    a(this, "rc", null);
    a(this, "nc", null);
    a(this, "hc", null);
    a(this, "oc", null);
    a(this, "ac");
    a(this, "mn", 0);
    a(this, "yn", 0);
    a(this, "wn", 0);
    a(this, "pn", 0);
    a(this, "cc", 0);
    a(this, "uc", 1);
    a(this, "lc", "sampled");
    a(this, "fc", "fixed");
    a(this, "dc", null);
    a(this, "_c", null);
    a(this, "mc", null);
    a(this, "vc", null);
    a(this, "gc", null);
    a(this, "yc", null);
    a(this, "wc", null);
    a(this, "bc", null);
    a(this, "Mn", [1, 1, 1, 1]);
    a(this, "xn", [0, 0, 0, 1]);
    a(this, "Mc", [0, 0, 0, 1]);
    a(this, "xc", [[0.1, 0, 0]]);
    a(this, "Cc", null);
    a(this, "Pc", !0);
    a(this, "bn", null);
    a(this, "Fc", null);
    a(this, "Sc", null);
    a(this, "Tc", null);
    a(this, "Ec", null);
    a(this, "Lc", null);
    a(this, "Oc", !1);
    this.Oe = e, this.q = s, this.Za = i, this.ec = r, this.qa = h, this.Ja = o, this.Dc(c, u);
  }
  kc() {
    var e, s;
    this.ze = null, (e = this.nc) == null || e.forEach((i) => {
      i.material = null;
    }), (s = this.hc) == null || s.forEach((i) => {
      i.material = null;
    });
  }
  Rc(e, s, i, r, h) {
    this.q.ea() ? this.zc(e, s, i, r, h) : (e === "char" ? this.jc(this.Mn, s, i, r, h) : e === "cell" ? this.jc(this.xn, s, i, r, h) : this.jc(this.Mc, s, i, r, h), this.kc());
  }
  conversionMode(e) {
    return this.q.ea() ? (this.rc = e, this.Hc(this.hc), this.hc = null) : (this.tc = e, this.sc = null, this.Hc(this.nc), this.nc = null, this.kc()), this;
  }
  conversions(e) {
    if (!Array.isArray(e)) throw new _("[textmode.js] conversions() expects an array of conversion steps.", { method: "conversions", providedValue: e });
    if (e.length === 0) return this.clearConversions();
    const s = e.map((i, r) => this.Ic(i, r));
    return this.q.ea() ? (this.rc = null, this.Hc(this.hc), this.hc = s) : (this.Hc(this.nc), this.nc = s, this.kc()), this;
  }
  clearConversions() {
    return this.q.ea() ? (this.rc = null, this.Hc(this.hc), this.hc = []) : (this.Hc(this.nc), this.nc = null, this.kc()), this;
  }
  dispose() {
    this.Za && (this.Oe.deleteTexture(this.Za), this.Za = null), this.Bc(this.Cc), this.Bc(this.Lc), this.Hc(this.nc), this.Hc(this.hc), this.Cc = null, this.Lc = null, this.nc = null, this.hc = null, super.dispose();
  }
  invert(e = !0) {
    const s = e ? 1 : 0;
    return this.q.ea() ? this.dc = s : (this.mn = s, this.kc()), this;
  }
  flipX(e = !0) {
    const s = e ? 1 : 0;
    return this.q.ea() ? this._c = s : (this.yn = s, this.kc()), this;
  }
  flipY(e = !0) {
    const s = e ? 1 : 0;
    return this.q.ea() ? this.mc = s : (this.wn = s, this.kc()), this;
  }
  charRotation(e) {
    const s = Wt(e);
    return this.q.ea() ? this.vc = s : (this.pn = s, this.kc()), this;
  }
  brightnessRange(e, s) {
    const [i, r] = this.Nc(e, s, "brightnessRange");
    return this.q.ea() ? (this.gc = i, this.yc = r) : (this.cc = i, this.uc = r, this.kc()), this;
  }
  charColorMode(e) {
    return this.q.ea() ? this.wc = e : (this.lc = e, this.kc()), this;
  }
  cellColorMode(e) {
    return this.q.ea() ? this.bc = e : (this.fc = e, this.kc()), this;
  }
  charColor(e, s, i, r) {
    return this.Rc("char", e, s, i, r), this;
  }
  cellColor(e, s, i, r) {
    return this.Rc("cell", e, s, i, r), this;
  }
  background(e, s, i, r) {
    return this.Rc("background", e, s, i, r), this;
  }
  characters(e) {
    if (this.q.ea()) {
      const s = this.Gc(e);
      this.Ec = s.length > 0 ? s : null, this.Oc = s.length > 0;
    } else this.bn = e, this.Xc(e), this.kc();
    return this;
  }
  ua(e) {
    this.$a !== e && (this.$a = e, this.bn && this.Xc(this.bn), this.Yc(this.nc), this.Yc(this.hc), this.kc());
  }
  get texture() {
    return this.Za;
  }
  get width() {
    return this.o;
  }
  get height() {
    return this.u;
  }
  get originalWidth() {
    return this.qa;
  }
  get originalHeight() {
    return this.Ja;
  }
  ue(e, s) {
    this.Dc(e, s), this.kc();
  }
  Ze() {
    return this.fa() ? this.Vc() : (this.ze || this.qe(), this.ze);
  }
  la() {
    const e = this.Qc();
    if (!e) return [this.Ze()];
    this.Kc();
    const s = !this.Wc();
    return e.map((i, r) => this.Zc(i, r, e.length, s));
  }
  sa() {
    this.dc = null, this._c = null, this.mc = null, this.vc = null, this.gc = null, this.yc = null, this.wc = null, this.bc = null, this.Fc = null, this.Sc = null, this.Tc = null, this.Ec = null, this.Oc = !1, this.rc = null, this.Hc(this.hc), this.hc = null;
  }
  Kc() {
  }
  qe() {
    this.ze = this.Vc();
  }
  Vc(e = this.rc ?? this.tc, s = null, i) {
    s || this.Kc();
    const r = this.oc, h = this.ac;
    this.oc = s, this.ac = i;
    try {
      const o = s ? this.qc(e) : this.Jc(), c = this.$c(i), u = this.ec.tu(e, c), l = o.createUniforms(c);
      return this.q.materialManager.$e(u, l);
    } finally {
      this.oc = r, this.ac = h;
    }
  }
  Zc(e, s, i, r) {
    if (r && e.material) return e.material;
    const h = { index: s, count: i, mode: e.mode, options: e.options }, o = this.Vc(e.mode, e, h);
    return r && (e.material = o), o;
  }
  Ic(e, s) {
    if (!e || typeof e != "object") throw new _("[textmode.js] Conversion stack steps must be objects.", { method: "conversions", index: s, providedValue: e });
    if (typeof e.mode != "string" || e.mode.trim() === "") throw new _("[textmode.js] Conversion stack step mode must be a non-empty string.", { method: "conversions", index: s, providedValue: e.mode });
    const i = { mode: e.mode, options: this.iu(e.options, s), paletteTexture: null, paletteDirty: !1, material: null };
    if (e.characters !== void 0) {
      if (typeof e.characters != "string") throw new _("[textmode.js] Conversion stack step characters must be a string.", { method: "conversions", index: s, providedValue: e.characters });
      i.characters = e.characters, i.glyphColors = this.Gc(e.characters), i.paletteDirty = !0;
    }
    if (e.invert !== void 0 && (i.invert = e.invert ? 1 : 0), e.flipX !== void 0 && (i.flipX = e.flipX ? 1 : 0), e.flipY !== void 0 && (i.flipY = e.flipY ? 1 : 0), e.charRotation !== void 0 && (i.charRotation = Wt(e.charRotation)), e.brightnessStart !== void 0 || e.brightnessEnd !== void 0) {
      if (e.brightnessStart === void 0 || e.brightnessEnd === void 0) throw new _("[textmode.js] Conversion stack step brightnessStart and brightnessEnd must be provided together.", { method: "conversions", index: s, brightnessStart: e.brightnessStart, brightnessEnd: e.brightnessEnd });
      const [r, h] = this.Nc(e.brightnessStart, e.brightnessEnd, "conversions", s);
      i.brightnessStart = r, i.brightnessEnd = h;
    }
    return e.charColorMode !== void 0 && (this.su(e.charColorMode, "charColorMode", s), i.charColorMode = e.charColorMode), e.cellColorMode !== void 0 && (this.su(e.cellColorMode, "cellColorMode", s), i.cellColorMode = e.cellColorMode), e.charColor !== void 0 && (i.charColor = this.eu(e.charColor)), e.cellColor !== void 0 && (i.cellColor = this.eu(e.cellColor)), i;
  }
  su(e, s, i) {
    if (e !== "sampled" && e !== "fixed") throw new _(`[textmode.js] Conversion stack step ${s} must be 'sampled' or 'fixed'.`, { method: "conversions", index: i, providedValue: e });
  }
  iu(e, s) {
    if (e === void 0) return {};
    if (e === null || typeof e != "object" || Array.isArray(e)) throw new _("[textmode.js] Conversion stack step options must be an object.", { method: "conversions", index: s, providedValue: e });
    return { ...e };
  }
  eu(e) {
    return M.ge(e).normalized;
  }
  Nc(e, s, i, r) {
    const h = { method: i, start: e, end: s };
    if (r !== void 0 && (h.index = r), !Number.isFinite(e) || !Number.isFinite(s)) throw new _("[textmode.js] brightness range values must be finite numbers.", h);
    if (e < 0 || e > 255 || s < 0 || s > 255) throw new _("[textmode.js] brightness range values must be between 0 and 255.", h);
    if (e > s) throw new _("[textmode.js] brightness range start must be less than or equal to end.", h);
    return [e / 255, s / 255];
  }
  jc(e, s, i, r, h) {
    const o = M.ge(s, i, r, h);
    Ot(e, o.r, o.g, o.b, o.a);
  }
  Xc(e) {
    const s = this.Gc(e);
    s.length > 0 && (this.xc = s, this.Pc = !0);
  }
  Yc(e) {
    if (e) for (const s of e) s.characters !== void 0 && (s.glyphColors = this.Gc(s.characters), s.paletteDirty = !0, s.material = null);
  }
  Gc(e) {
    return this.$a ? this.$a.Bt(e).filter((s) => Array.isArray(s)) : [];
  }
  Qc() {
    return this.rc !== null ? null : this.hc !== null ? this.hc.length > 0 ? this.hc : null : this.nc;
  }
  Wc() {
    return this.dc !== null || this._c !== null || this.mc !== null || this.vc !== null || this.gc !== null || this.yc !== null || this.wc !== null || this.bc !== null || this.Fc !== null || this.Sc !== null || this.Tc !== null || this.Ec !== null;
  }
  Dc(e, s) {
    const { width: i, height: r } = (function(h, o, c, u) {
      const l = Math.min(c / h, u / o);
      return { width: Math.max(1, Math.min(c, Math.round(h * l))), height: Math.max(1, Math.min(u, Math.round(o * l))), scale: l };
    })(this.qa, this.Ja, e, s);
    this.o = i, this.u = r;
  }
  createBaseConversionUniforms() {
    const e = this.oc, s = (e == null ? void 0 : e.invert) ?? this.dc ?? this.mn, i = (e == null ? void 0 : e.flipX) ?? this._c ?? this.yn, r = (e == null ? void 0 : e.flipY) ?? this.mc ?? this.wn, h = (e == null ? void 0 : e.charRotation) ?? this.vc ?? this.pn, o = (e == null ? void 0 : e.brightnessStart) ?? this.gc ?? this.cc, c = (e == null ? void 0 : e.brightnessEnd) ?? this.yc ?? this.uc, u = (e == null ? void 0 : e.charColorMode) ?? this.wc ?? this.lc, l = (e == null ? void 0 : e.cellColorMode) ?? this.bc ?? this.fc, f = (e == null ? void 0 : e.charColor) ?? this.Fc ?? this.Mn, d = (e == null ? void 0 : e.cellColor) ?? this.Sc ?? this.xn, y = this.Tc ?? this.Mc, v = (e == null ? void 0 : e.glyphColors) !== void 0, g = !v && this.Ec !== null, m = v ? e.glyphColors : this.Ec ?? this.xc, A = this.ru(m, g, e);
    return { u_image: this.Za, u_invert: !!s, u_flipX: !!i, u_flipY: !!r, u_charRotation: h, U1: o, U2: c, u_charColorFixed: u === "fixed", u_charColor: f, u_cellColorFixed: l === "fixed", u_cellColor: d, u_backgroundColor: y, u_charCount: m.length, u_charPaletteTexture: A.texture, u_charPaletteDimensions: [A.columns, A.rows] };
  }
  ru(e, s, i = null) {
    return (i == null ? void 0 : i.glyphColors) !== void 0 ? (i.paletteTexture && !i.paletteDirty || (i.paletteTexture = this.nu(e, i.paletteTexture), i.paletteDirty = !1), i.paletteTexture) : s ? (this.Lc && !this.Oc || (this.Lc = this.nu(e, this.Lc), this.Oc = !1), this.Lc) : (this.Cc && !this.Pc || (this.Cc = this.nu(e, this.Cc), this.Pc = !1), this.Cc);
  }
  nu(e, s) {
    const i = this.Oe, r = Math.max(1, Number(i.getParameter(i.MAX_TEXTURE_SIZE)) || 4096), h = Math.min(r * r, 65535);
    if (e.length > h) throw new _("[textmode.js] Character palette exceeds the supported GPU texture capacity.", { requestedCharacters: e.length, maxCharacters: h, maxTextureSize: r });
    const o = Math.max(e.length, 1), c = Math.min(r, Math.ceil(Math.sqrt(o))), u = Math.max(1, Math.ceil(o / c)), l = this.hu(e, c, u), f = (s == null ? void 0 : s.texture) ?? i.createTexture();
    if (!f) throw new _("[textmode.js] Failed to create character palette texture.");
    return i.bindTexture(i.TEXTURE_2D, f), i.texParameteri(i.TEXTURE_2D, i.TEXTURE_MIN_FILTER, i.NEAREST), i.texParameteri(i.TEXTURE_2D, i.TEXTURE_MAG_FILTER, i.NEAREST), i.texParameteri(i.TEXTURE_2D, i.TEXTURE_WRAP_S, i.CLAMP_TO_EDGE), i.texParameteri(i.TEXTURE_2D, i.TEXTURE_WRAP_T, i.CLAMP_TO_EDGE), i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL, 0), s && s.columns === c && s.rows === u ? i.texSubImage2D(i.TEXTURE_2D, 0, 0, 0, c, u, i.RGBA, i.UNSIGNED_BYTE, l) : i.texImage2D(i.TEXTURE_2D, 0, i.RGBA8, c, u, 0, i.RGBA, i.UNSIGNED_BYTE, l), i.bindTexture(i.TEXTURE_2D, null), { texture: f, count: e.length, columns: c, rows: u };
  }
  hu(e, s, i) {
    const r = new Uint8Array(s * i * 4);
    for (let h = 0; h < e.length; h++) {
      const o = e[h], c = 4 * h;
      r[c] = this.ou(o[0]), r[c + 1] = this.ou(o[1]), r[c + 2] = this.ou(o[2]), r[c + 3] = 255;
    }
    return r;
  }
  ou(e) {
    return Math.max(0, Math.min(255, Math.round(255 * e)));
  }
  Bc(e) {
    e && this.Oe.deleteTexture(e.texture);
  }
  Hc(e) {
    if (e) for (const s of e) this.Bc(s.paletteTexture), s.paletteTexture = null, s.material = null;
  }
  fa() {
    return this.Wc() || this.rc !== null || this.hc !== null;
  }
  qc(e) {
    const s = this.ec.au(e);
    if (!s) throw Error(`[textmode.js] Conversion mode "${e}" is not registered. If this mode is provided by an add-on, make sure its plugin is installed before loading sources.`);
    return s;
  }
  Jc() {
    const e = this.rc ?? this.tc;
    if (this.sc && this.sc.id === e) return this.sc;
    const s = this.qc(e);
    return this.sc = s, s;
  }
  zc(e, s, i, r, h) {
    let o;
    e === "char" ? (o = this.Fc ?? [0, 0, 0, 1], this.Fc = o) : e === "cell" ? (o = this.Sc ?? [0, 0, 0, 1], this.Sc = o) : (o = this.Tc ?? [0, 0, 0, 1], this.Tc = o), this.jc(o, s, i, r, h);
  }
  $c(e) {
    if (!this.$a) throw Error("[textmode.js] Cannot create conversion context: no active glyph atlas set. Ensure _setActiveFont() is called before rendering.");
    const s = { renderer: this.q, gl: this.Oe, font: this.$a, glyphAtlas: this.$a, source: this }, i = e ?? this.ac;
    return i && (s.pass = i), s;
  }
}
class mt extends pt {
  constructor(t, e, s, i, r, h, o, c) {
    super(t, e, s, i, r, h, o, c);
  }
  static cu(t, e, s, i, r) {
    const h = t.context, { texture: o, width: c, height: u } = Gt(h, s);
    return new mt(h, t, o, e, c, u, i, r);
  }
}
class Ds {
  constructor(t = 60) {
    a(this, "uu");
    a(this, "lu");
    a(this, "fu", null);
    a(this, "du", 0);
    a(this, "_u", !0);
    a(this, "mu", 0);
    a(this, "pu", 0);
    a(this, "vu", []);
    a(this, "gu", 10);
    a(this, "yu", 0);
    a(this, "wu", 0);
    a(this, "Au", -1);
    this.lu = t, this.uu = 1e3 / t;
  }
  bu(t) {
    if (!this._u) return;
    this.Au === -1 && (this.Au = performance.now()), this.du = performance.now();
    const e = (s) => {
      if (!this._u) return void (this.fu = null);
      const i = s - this.du;
      i >= this.uu && (t(), this.du = s - i % this.uu), this._u && (this.fu = requestAnimationFrame(e));
    };
    this.fu = requestAnimationFrame(e);
  }
  Mu() {
    this.fu && (cancelAnimationFrame(this.fu), this.fu = null);
  }
  xu() {
    this._u && (this._u = !1, this.Mu());
  }
  Cu(t) {
    this._u || (this._u = !0, this.bu(t));
  }
  Pu(t, e) {
    if (t === void 0) return this.mu;
    this.lu = t, this.uu = 1e3 / t, this._u && e && (this.Mu(), this.bu(e));
  }
  Fu() {
    const t = performance.now();
    if (this.pu > 0) {
      const e = t - this.pu;
      this.yu = e, this.vu.push(e), this.vu.length > this.gu && this.vu.shift();
      const s = this.vu.reduce((i, r) => i + r, 0) / this.vu.length;
      this.mu = 1e3 / s;
    }
    this.pu = t;
  }
  Su(t) {
    this.lu = t, this.uu = 1e3 / t;
  }
  Tu() {
    this.wu++;
  }
  get Eu() {
    return this.Au === -1 ? 0 : performance.now() - this.Au;
  }
  set Eu(t) {
    this.Au = performance.now() - t;
  }
  get Lu() {
    return this.Eu / 1e3;
  }
  set Lu(t) {
    this.Eu = 1e3 * t;
  }
}
function Kt(n, t, e) {
  return n ? n.U(t, e) : { x: -1 / 0, y: -1 / 0 };
}
class Nt {
  constructor() {
    a(this, "Ou", []);
  }
  Du(t, e, s, i) {
    const r = s;
    i === void 0 ? t.addEventListener(e, r) : t.addEventListener(e, r, i), this.Ou.push({ target: t, type: e, listener: r, capture: typeof i == "boolean" ? i : i == null ? void 0 : i.capture });
  }
  ku() {
    for (let t = this.Ou.length - 1; t >= 0; t -= 1) {
      const { target: e, type: s, listener: i, capture: r } = this.Ou[t];
      r === void 0 ? e.removeEventListener(s, i) : e.removeEventListener(s, i, r);
    }
    this.Ou = [];
  }
}
class Bt {
  constructor() {
    a(this, "Ou", {});
  }
  Ru(t, e) {
    var r;
    const s = (r = this.Ou)[t] ?? (r[t] = []), i = { fn: e, once: !1 };
    return s.push(i), () => this.zu(t, e);
  }
  zu(t, e) {
    const s = this.Ou[t];
    if (!s) return;
    const i = s.findIndex((r) => r.fn === e);
    i !== -1 && s.splice(i, 1);
  }
  ju(t, e) {
    var r;
    const s = (r = this.Ou)[t] ?? (r[t] = []), i = { fn: e, once: !0 };
    return s.push(i), () => this.zu(t, e);
  }
  Hu(t, ...e) {
    const s = this.Ou[t];
    if (!s || s.length === 0) return;
    const i = s.slice();
    for (const r of i) {
      if (r.once) {
        const h = s.indexOf(r);
        h !== -1 && s.splice(h, 1);
      }
      r.fn(...e);
    }
  }
  Iu(t) {
    const e = this.Ou[t];
    return !!e && e.length > 0;
  }
  ku(t) {
    t !== void 0 ? delete this.Ou[t] : this.Ou = {};
  }
}
class Ls {
  constructor(t, e) {
    a(this, "m");
    a(this, "Bu");
    a(this, "Nu", { x: -1 / 0, y: -1 / 0 });
    a(this, "Gu", { x: -1 / 0, y: -1 / 0 });
    a(this, "Xu", { x: -1 / 0, y: -1 / 0 });
    a(this, "Yu", { x: -1 / 0, y: -1 / 0 });
    a(this, "Vu", { x: 0, y: 0 });
    a(this, "Qu", { x: 0, y: 0 });
    a(this, "Ku", !1);
    a(this, "Wu", null);
    a(this, "Zu", 0);
    a(this, "Ou", new Nt());
    a(this, "qu", !1);
    a(this, "Ju", new Bt());
    this.m = t, this.Bu = e;
  }
  $u(t) {
    const e = performance.now() + Math.max(0, t);
    e > this.Zu && (this.Zu = e);
  }
  tl() {
    return performance.now() < this.Zu;
  }
  il(t) {
    const e = this.m.canvas;
    e.style.cursor = t == null || t === "" ? "" : t;
  }
  sl() {
    const t = this.m.canvas;
    return typeof t.requestPointerLock == "function" && (t.requestPointerLock(), !0);
  }
  el() {
    this.rl() && typeof document.exitPointerLock == "function" && document.exitPointerLock();
  }
  nl() {
    if (this.qu) return;
    const t = this.m.canvas;
    this.Ou.Du(t, "mousemove", (e) => {
      this.hl(e), this.ol(e);
    }, { passive: !0 }), this.Ou.Du(t, "mouseleave", () => {
      this.Gu = { ...this.Nu }, this.Nu.x = -1 / 0, this.Nu.y = -1 / 0, this.Wu = null;
    }, { passive: !0 }), this.Ou.Du(t, "mousedown", (e) => {
      this.hl(e), this.al(e);
    }, { passive: !0 }), this.Ou.Du(t, "mouseup", (e) => {
      this.hl(e), this.cl(e);
    }, { passive: !0 }), this.Ou.Du(t, "click", (e) => {
      this.hl(e), this.ul(e);
    }, { passive: !0 }), this.Ou.Du(t, "dblclick", (e) => {
      this.hl(e), this.ll(e);
    }, { passive: !0 }), this.Ou.Du(t, "wheel", (e) => {
      this.hl(e), this.fl(e);
    }, { passive: !1 }), this.Ou.Du(window, "mouseup", () => {
      this.Ku = !1;
    }, { passive: !0 }), this.Ou.Du(window, "blur", () => {
      this.Ku = !1;
    }), this.qu = !0;
  }
  dl() {
    this.qu && (this.Ou.ku(), this.qu = !1, this.el(), this.Ku = !1, this.Vu = { x: 0, y: 0 }, this.Qu = { x: 0, y: 0 });
  }
  _l() {
    if (this.qu) try {
      if (this.Wu) {
        const t = new MouseEvent("mousemove", { clientX: this.Wu.x, clientY: this.Wu.y, bubbles: !1, cancelable: !1 });
        this.hl(t);
      }
    } catch {
      this.Nu.x = -1 / 0, this.Nu.y = -1 / 0;
    }
  }
  ml() {
    return { x: this.Nu.x, y: this.Nu.y };
  }
  pl() {
    return { x: this.Xu.x, y: this.Xu.y };
  }
  vl() {
    return this.Vu.x;
  }
  yl() {
    return this.Vu.y;
  }
  wl() {
    return this.Ku;
  }
  Al() {
    this.Xu = { ...this.Yu }, this.Yu = { ...this.Nu }, this.Vu = { ...this.Qu }, this.Qu = { x: 0, y: 0 };
  }
  bl(t, e = {}) {
    return { position: { ...this.Nu }, previousPosition: { ...this.Gu }, originalEvent: t, ...e };
  }
  ol(t) {
    this.tl() || (this.Ml(t) ? this.Ju.Hu("mouseDragged", this.bl(t, { button: this.xl(t) })) : this.Ju.Hu("mouseMoved", this.bl(t)));
  }
  al(t) {
    this.tl() || (this.Ku = !0, this.Ju.Hu("mousePressed", this.bl(t, { button: t.button })));
  }
  cl(t) {
    this.tl() || (this.Ku = !1, this.Ju.Hu("mouseReleased", this.bl(t, { button: t.button })));
  }
  ul(t) {
    this.tl() || this.Ju.Hu("mouseClicked", this.bl(t, { button: t.button }));
  }
  ll(t) {
    this.tl() || this.Ju.Hu("doubleClicked", this.bl(t, { button: t.button }));
  }
  fl(t) {
    this.tl() || this.Ju.Hu("mouseScrolled", this.bl(t, { delta: { x: t.deltaX, y: t.deltaY } }));
  }
  hl(t) {
    const e = this.Bu();
    if (this.Gu = { ...this.Nu }, t instanceof MouseEvent && t.type === "mousemove" && this.Cl(t), t instanceof MouseEvent && t.type === "mousemove" && this.rl()) return;
    this.Wu = { x: t.clientX, y: t.clientY };
    const s = Kt(e, t.clientX, t.clientY);
    this.Nu.x = s.x, this.Nu.y = s.y;
  }
  Ml(t) {
    return t.buttons !== 0;
  }
  xl(t) {
    return 1 & t.buttons ? 0 : 4 & t.buttons ? 1 : 2 & t.buttons ? 2 : 8 & t.buttons ? 3 : 16 & t.buttons ? 4 : void 0;
  }
  Cl(t) {
    if (this.rl()) return this.Qu.x += t.movementX, void (this.Qu.y += t.movementY);
    this.Wu && (this.Qu.x += t.clientX - this.Wu.x, this.Qu.y += t.clientY - this.Wu.y);
  }
  rl() {
    return document.pointerLockElement === this.m.canvas;
  }
}
class qs {
  constructor() {
    a(this, "Pl", /* @__PURE__ */ new Map());
    a(this, "Fl", null);
    a(this, "Sl", null);
    a(this, "Ou", new Nt());
    a(this, "qu", !1);
    a(this, "Ju", new Bt());
    a(this, "Tl", { ArrowUp: "UP_ARROW", ArrowDown: "DOWN_ARROW", ArrowLeft: "LEFT_ARROW", ArrowRight: "RIGHT_ARROW", F1: "F1", F2: "F2", F3: "F3", F4: "F4", F5: "F5", F6: "F6", F7: "F7", F8: "F8", F9: "F9", F10: "F10", F11: "F11", F12: "F12", Enter: "ENTER", Return: "RETURN", Tab: "TAB", Escape: "ESCAPE", Backspace: "BACKSPACE", Delete: "DELETE", Insert: "INSERT", Home: "HOME", End: "END", PageUp: "PAGE_UP", PageDown: "PAGE_DOWN", Shift: "SHIFT", Control: "CONTROL", Alt: "ALT", Meta: "META", " ": "SPACE" });
  }
  nl() {
    this.qu || (this.Ou.Du(window, "keydown", (t) => {
      this.El(t);
    }, { passive: !1 }), this.Ou.Du(window, "keyup", (t) => {
      this.Ll(t);
    }, { passive: !1 }), this.qu = !0);
  }
  dl() {
    this.qu && (this.Ou.ku(), this.qu = !1, this.Pl.clear(), this.Fl = null, this.Sl = null);
  }
  Ol(t) {
    const e = this.Dl(t), s = this.Pl.get(t) || this.Pl.get(e);
    return (s == null ? void 0 : s.isPressed) || !1;
  }
  kl() {
    return this.Fl;
  }
  Rl() {
    return this.Sl;
  }
  zl() {
    const t = [];
    for (const [e, s] of this.Pl) s.isPressed && t.push(e);
    return t;
  }
  jl() {
    return { ctrl: this.Ol("Control"), shift: this.Ol("Shift"), alt: this.Ol("Alt"), meta: this.Ol("Meta") };
  }
  Hl() {
    this.Pl.clear(), this.Fl = null, this.Sl = null;
  }
  El(t) {
    const e = t.key, s = Date.now();
    this.Pl.has(e) || this.Pl.set(e, { isPressed: !1, lastPressTime: 0, lastReleaseTime: 0 });
    const i = this.Pl.get(e);
    i.isPressed || (i.isPressed = !0, i.lastPressTime = s, this.Fl = e, this.Ju.Hu("keyPressed", this.bl(e, !0, t)), this.Il(t) && this.Ju.Hu("keyTyped", this.bl(e, !0, t)));
  }
  bl(t, e, s) {
    return { key: t, keyCode: s.keyCode, ctrlKey: s.ctrlKey, shiftKey: s.shiftKey, altKey: s.altKey, metaKey: s.metaKey, isPressed: e, originalEvent: s };
  }
  Ll(t) {
    const e = t.key, s = Date.now();
    this.Pl.has(e) || this.Pl.set(e, { isPressed: !1, lastPressTime: 0, lastReleaseTime: 0 });
    const i = this.Pl.get(e);
    i.isPressed = !1, i.lastReleaseTime = s, this.Sl = e, this.Ju.Hu("keyReleased", this.bl(e, !1, t));
  }
  Dl(t) {
    return this.Tl[t] || t.toLowerCase();
  }
  Il(t) {
    return !(t.ctrlKey || t.altKey || t.metaKey) && t.key !== "Dead" && Array.from(t.key).length === 1;
  }
}
class Us {
  constructor(t, e) {
    a(this, "Bl");
    a(this, "Nl");
    a(this, "Gl", /* @__PURE__ */ new Map());
    a(this, "Xl", null);
    a(this, "Yl", 320);
    a(this, "Vl", 350);
    a(this, "Ql", 10);
    a(this, "Kl", 550);
    a(this, "Wl", 14);
    a(this, "Zl", 48);
    a(this, "ql", 650);
    a(this, "Jl", 0.02);
    a(this, "$l", 2);
    a(this, "tf", 0);
    a(this, "if", null);
    this.Bl = t, this.Nl = e;
  }
  oh() {
    this.Gl.forEach((t) => {
      t.timer !== null && window.clearTimeout(t.timer);
    }), this.Gl.clear(), this.Xl = null, this.tf = 0, this.if = null;
  }
  sf(t, e) {
    const s = { timer: null, fired: !1 };
    s.timer = window.setTimeout(() => {
      this.Gl.has(t.id) && (s.fired = !0, this.Nl.Hu("longPress", { touch: this.ef(t.lastPosition), duration: performance.now() - t.startTime, originalEvent: e }));
    }, this.Kl), this.Gl.set(t.id, s);
  }
  rf(t, e) {
    const s = this.Gl.get(t.id);
    !s || !e || Ct(e.clientX, e.clientY, t.lastPosition.clientX, t.lastPosition.clientY) > this.Wl && s.timer !== null && (window.clearTimeout(s.timer), s.timer = null);
  }
  nf(t, e) {
    const s = this.Gl.get(t.id);
    s && s.timer !== null && (window.clearTimeout(s.timer), s.timer = null), this.hf(t, e, (s == null ? void 0 : s.fired) ?? !1), this.Gl.delete(t.id);
  }
  af(t) {
    const e = this.Gl.get(t);
    e && e.timer !== null && window.clearTimeout(e.timer), this.Gl.delete(t);
  }
  cf(t) {
    if (t.size !== 2) return void (this.Xl = null);
    const e = Array.from(t.values()), [s, i] = e, r = [s.id, i.id];
    if (this.Xl && this.Xl.ids[0] === r[0] && this.Xl.ids[1] === r[1]) return;
    const h = Ct(s.x, s.y, i.x, i.y), o = ne(s.clientX, s.clientY, i.clientX, i.clientY);
    this.Xl = { ids: r, initialDistance: Math.max(h, 1e-4), initialAngle: o, lastScale: 1, lastRotation: 0 };
  }
  uf(t, e) {
    if (this.cf(t), !this.Xl) return;
    const [s, i] = this.Xl.ids, r = t.get(s), h = t.get(i);
    if (!r || !h) return;
    const o = Ct(r.x, r.y, h.x, h.y) / this.Xl.initialDistance, c = o - this.Xl.lastScale;
    Math.abs(c) > this.Jl && (this.Nl.Hu("pinch", { touches: [this.ef(r), this.ef(h)], scale: o, deltaScale: c, center: this.lf(r, h), originalEvent: e }), this.Xl.lastScale = o);
    let u = ne(r.clientX, r.clientY, h.clientX, h.clientY) - this.Xl.initialAngle;
    u = (u + 180) % 360 - 180;
    const l = u - this.Xl.lastRotation;
    Math.abs(l) > this.$l && (this.Nl.Hu("rotateGesture", { touches: [this.ef(r), this.ef(h)], rotation: u, deltaRotation: l, center: this.lf(r, h), originalEvent: e }), this.Xl.lastRotation = u);
  }
  lf(t, e) {
    const s = (t.clientX + e.clientX) / 2, i = (t.clientY + e.clientY) / 2, r = this.Bl(s, i);
    return { x: r.x, y: r.y };
  }
  hf(t, e, s) {
    const i = performance.now(), r = i - t.startTime, h = t.lastPosition.clientX - t.startPosition.clientX, o = t.lastPosition.clientY - t.startPosition.clientY, c = Math.hypot(h, o);
    if (!s && r <= this.Yl && c <= this.Ql)
      this.ff(t.lastPosition, i) ? this.Nl.Hu("doubleTap", { touch: this.ef(t.lastPosition), taps: 2, originalEvent: e }) : this.Nl.Hu("tap", { touch: this.ef(t.lastPosition), taps: 1, originalEvent: e });
    else if (!s && r <= this.ql && c >= this.Zl) {
      const u = Math.max(c, 1e-4), l = { x: h / u, y: o / u }, f = { x: h / r, y: o / r };
      this.Nl.Hu("swipe", { touch: this.ef(t.lastPosition), direction: l, distance: u, velocity: f, originalEvent: e });
    }
    this.tf = i, this.if = this.ef(t.lastPosition);
  }
  ff(t, e) {
    return !this.if || e - this.tf > this.Vl ? !1 : Ct(t.clientX, t.clientY, this.if.clientX, this.if.clientY) <= this.Ql;
  }
  ef(t) {
    return { ...t };
  }
}
class Ns {
  constructor(t, e, s) {
    a(this, "m");
    a(this, "df");
    a(this, "Bu");
    a(this, "_f");
    a(this, "mf", /* @__PURE__ */ new Map());
    a(this, "pf", /* @__PURE__ */ new Map());
    a(this, "vf", /* @__PURE__ */ new Map());
    a(this, "gf");
    a(this, "yf");
    a(this, "Ou", new Nt());
    a(this, "qu", !1);
    a(this, "Ju", new Bt());
    a(this, "wf", 600);
    this.m = t, this.Bu = e, this.df = s, this._f = new Us((r, h) => Kt(this.Bu(), r, h), this.Ju);
    const i = this.m.canvas;
    this.gf = i.style.touchAction, this.yf = i.style.userSelect, i.style.touchAction || (i.style.touchAction = "none"), i.style.userSelect || (i.style.userSelect = "none");
  }
  nl() {
    if (this.qu) return;
    const t = this.m.canvas;
    this.Ou.Du(t, "touchstart", (e) => {
      this.Af(e);
    }, { passive: !1 }), this.Ou.Du(t, "touchmove", (e) => {
      this.bf(e);
    }, { passive: !1 }), this.Ou.Du(t, "touchend", (e) => {
      this.Mf(e);
    }, { passive: !1 }), this.Ou.Du(t, "touchcancel", (e) => {
      this.xf(e);
    }, { passive: !1 }), this.qu = !0;
  }
  dl() {
    if (!this.qu) return;
    const t = this.m.canvas;
    this.Ou.ku(), this.qu = !1, this.mf.clear(), this.pf.clear(), this.vf.clear(), this._f.oh(), t.style.touchAction = this.gf, t.style.userSelect = this.yf;
  }
  _l() {
    if (!this.Bu() || this.mf.size === 0) return;
    const t = /* @__PURE__ */ new Map();
    for (const e of this.mf.values()) {
      const s = this.Bl(e.clientX, e.clientY, e.id, e);
      t.set(e.id, s);
      const i = this.vf.get(e.id);
      i && (i.lastPosition = s);
    }
    this.mf = t;
  }
  Cf() {
    return Array.from(this.mf.values()).map((t) => ({ ...t }));
  }
  Af(t) {
    var i;
    if (!this.Bu()) return;
    t.preventDefault(), (i = this.df) == null || i.$u(this.wf);
    const e = performance.now(), s = this.Pf(t.changedTouches);
    for (const r of s) {
      const h = this.mf.get(r.id);
      h && this.pf.set(r.id, this.ef(h)), this.mf.set(r.id, r);
      const o = { id: r.id, startPosition: r, lastPosition: r, startTime: e, lastTime: e };
      this.vf.set(r.id, o), this._f.sf(o, t), this.Ju.Hu("touchStarted", this.Ff(r, t, void 0, e));
    }
    this._f.cf(this.mf);
  }
  bf(t) {
    var i;
    if (!this.Bu()) return;
    t.preventDefault(), (i = this.df) == null || i.$u(this.wf);
    const e = performance.now(), s = this.Pf(t.changedTouches);
    for (const r of s) {
      const h = this.mf.get(r.id), o = h ? this.ef(h) : void 0;
      o && this.pf.set(r.id, o), this.mf.set(r.id, r);
      const c = this.vf.get(r.id);
      c && (c.lastPosition = r, c.lastTime = e, this._f.rf(c, o)), this.Ju.Hu("touchMoved", this.Ff(r, t, o, e));
    }
    this._f.uf(this.mf, t);
  }
  Mf(t) {
    if (!this.Bu()) return;
    t.preventDefault();
    const e = performance.now(), s = this.Pf(t.changedTouches);
    for (const i of s) {
      const r = this.mf.get(i.id), h = r ? this.ef(r) : void 0, o = this.vf.get(i.id);
      this.Ju.Hu("touchEnded", this.Ff(i, t, h, e)), o && this._f.nf(o, t), this.vf.delete(i.id), this.pf.delete(i.id), this.mf.delete(i.id);
    }
    this._f.cf(this.mf);
  }
  xf(t) {
    if (!this.Bu()) return;
    t.preventDefault();
    const e = performance.now(), s = this.Pf(t.changedTouches);
    for (const i of s) {
      const r = this.mf.get(i.id), h = r ? this.ef(r) : void 0;
      this.Ju.Hu("touchCancelled", this.Ff(i, t, h, e)), this._f.af(i.id), this.vf.delete(i.id), this.pf.delete(i.id), this.mf.delete(i.id);
    }
    this._f.cf(this.mf);
  }
  Pf(t) {
    const e = [];
    for (let s = 0; s < t.length; s += 1) {
      const i = t.item(s);
      i && e.push(this.Sf(i));
    }
    return e;
  }
  Sf(t) {
    return this.Bl(t.clientX, t.clientY, t.identifier, { id: t.identifier, x: -1, y: -1, clientX: t.clientX, clientY: t.clientY, pressure: t.force, radiusX: t.radiusX, radiusY: t.radiusY, rotationAngle: t.rotationAngle });
  }
  Bl(t, e, s, i) {
    const r = Kt(this.Bu(), t, e);
    return { id: s, x: r.x, y: r.y, clientX: t, clientY: e, pressure: i.pressure, radiusX: i.radiusX, radiusY: i.radiusY, rotationAngle: i.rotationAngle };
  }
  Ff(t, e, s, i) {
    const r = this.vf.get(t.id), h = Array.from(this.pf.values()).map((u) => this.ef(u)), o = Array.from(this.mf.values()).map((u) => this.ef(u)), c = this.Pf(e.changedTouches);
    return { touch: this.ef(t), previousTouch: s ? this.ef(s) : void 0, touches: o, previousTouches: h, changedTouches: c, deltaTime: r ? i - r.lastTime : 0, originalEvent: e };
  }
  ef(t) {
    return { ...t };
  }
}
const R = { south: 0, east: 1, west: 2, north: 3, l1: 4, r1: 5, l2: 6, r2: 7, select: 8, start: 9, leftStickPress: 10, rightStickPress: 11, dpadUp: 12, dpadDown: 13, dpadLeft: 14, dpadRight: 15, home: 16 }, at = { leftStickX: 0, leftStickY: 1, rightStickX: 2, rightStickY: 3 }, Bs = new Map(Object.entries(R).map(([n, t]) => [t, n])), Xs = new Map(Object.entries(at).map(([n, t]) => [t, n]));
function Is(n, t) {
  const e = Array.from(n.buttons, (h) => ({ pressed: !!h.pressed, touched: h.touched === void 0 ? void 0 : !!h.touched, value: h.value })), s = Array.from(n.axes, (h) => h), i = n.mapping === "standard" ? "standard" : "", r = { index: n.index, id: n.id, connected: !!n.connected, mapping: i, timestamp: n.timestamp, buttons: e, axes: s };
  return i === "standard" && (r.standard = (function(h, o, c) {
    const u = h[R.home];
    return { faceButtons: { south: D(h, R.south), east: D(h, R.east), west: D(h, R.west), north: D(h, R.north) }, shoulders: { l1: D(h, R.l1), r1: D(h, R.r1), l2: D(h, R.l2), r2: D(h, R.r2) }, center: { select: D(h, R.select), start: D(h, R.start), leftStickPress: D(h, R.leftStickPress), rightStickPress: D(h, R.rightStickPress), ...u ? { home: D(h, R.home) } : {} }, dpad: { up: D(h, R.dpadUp), down: D(h, R.dpadDown), left: D(h, R.dpadLeft), right: D(h, R.dpadRight) }, leftStick: le(o, at.leftStickX, at.leftStickY, c), rightStick: le(o, at.rightStickX, at.rightStickY, c) };
  })(e, s, t)), r;
}
function D(n, t) {
  return n[t] ?? { pressed: !1, value: 0 };
}
function le(n, t, e, s) {
  const i = n[t] ?? 0, r = n[e] ?? 0, h = Math.hypot(i, r);
  return h <= s ? { x: 0, y: 0, magnitude: 0 } : { x: i, y: r, magnitude: h };
}
const ks = { axisDeadzone: 0.15, axisChangeEpsilon: 0.01, buttonPressThreshold: 0.5, buttonReleaseThreshold: 0.45 };
class zs {
  constructor(t = {}) {
    a(this, "Tf");
    a(this, "Ef", []);
    a(this, "Lf", /* @__PURE__ */ new Map());
    a(this, "Of", /* @__PURE__ */ new Map());
    a(this, "Ou", new Nt());
    a(this, "qu", !1);
    a(this, "Df", /* @__PURE__ */ new Set());
    a(this, "kf", /* @__PURE__ */ new Set());
    a(this, "Ju", new Bt());
    this.Tf = { ...ks, ...t };
  }
  nl() {
    this.qu || (this.Ou.Du(window, "gamepadconnected", (t) => {
      const e = t.gamepad;
      e && (this.Df.add(e.index), this.kf.delete(e.index));
    }), this.Ou.Du(window, "gamepaddisconnected", (t) => {
      const e = t.gamepad;
      e && (this.kf.add(e.index), this.Df.delete(e.index));
    }), this.qu = !0);
  }
  dl() {
    this.qu && (this.Ou.ku(), this.qu = !1, this.Df.clear(), this.kf.clear(), this.Ef = [], this.Lf.clear(), this.Of.clear());
  }
  Al() {
    const t = /* @__PURE__ */ new Map();
    for (const e of this.Rf()) {
      if (!e || !e.connected) continue;
      const s = Is(e, this.Tf.axisDeadzone);
      t.set(s.index, s);
    }
    for (const [e, s] of this.Lf) t.has(e) || this.Ju.Hu("gamepadDisconnected", { gamepad: { ...s, connected: !1 } });
    for (const [e, s] of t) this.Lf.has(e) || this.Ju.Hu("gamepadConnected", { gamepad: s });
    for (const [e, s] of t) {
      const i = this.Lf.get(e);
      i && (this.zf(s, i), this.jf(s, i));
    }
    this.Of = this.Lf, this.Lf = t, this.Ef = Array.from(t.values()).sort((e, s) => e.index - s.index), this.Df.clear(), this.kf.clear();
  }
  Hf() {
    return this.Ef;
  }
  If(t) {
    return this.Lf.get(t);
  }
  Bf(t, e) {
    if (e === "standard") return (function(s, i) {
      if (i === "standard") return Bs.get(s);
    })(t, e);
  }
  Nf(t, e) {
    if (e === "standard") return (function(s, i) {
      if (i === "standard") return Xs.get(s);
    })(t, e);
  }
  zf(t, e) {
    const s = Math.max(t.buttons.length, e.buttons.length);
    for (let i = 0; i < s; i++) {
      const r = t.buttons[i] ?? { pressed: !1, value: 0 }, h = e.buttons[i] ?? { pressed: !1, value: 0 }, o = h.value >= this.Tf.buttonPressThreshold;
      r.value >= this.Tf.buttonPressThreshold && !o && this.Ju.Hu("gamepadButtonPressed", { gamepad: t, buttonIndex: i, button: r, previousButton: h, standardButtonName: this.Bf(i, t.mapping) });
      const c = h.value >= this.Tf.buttonReleaseThreshold;
      !(r.value >= this.Tf.buttonReleaseThreshold) && c && this.Ju.Hu("gamepadButtonReleased", { gamepad: t, buttonIndex: i, button: r, previousButton: h, standardButtonName: this.Bf(i, t.mapping) });
    }
  }
  jf(t, e) {
    const s = Math.max(t.axes.length, e.axes.length);
    for (let i = 0; i < s; i++) {
      const r = t.axes[i] ?? 0, h = e.axes[i] ?? 0, o = r - h;
      (Math.abs(h) <= this.Tf.axisDeadzone != Math.abs(r) <= this.Tf.axisDeadzone || Math.abs(o) >= this.Tf.axisChangeEpsilon) && this.Ju.Hu("gamepadAxisChanged", { gamepad: t, axisIndex: i, value: r, previousValue: h, delta: o, standardAxisName: this.Nf(i, t.mapping) });
    }
  }
  Rf() {
    const t = navigator;
    if (typeof t.getGamepads != "function") return [];
    const e = t.getGamepads.call(navigator);
    return Array.from(e ?? []);
  }
}
class Hs {
  constructor(t) {
    a(this, "Gf");
    a(this, "Xf", /* @__PURE__ */ new Map());
    this.Gf = t;
  }
  Yf(t, e, s) {
    let i = this.Xf.get(t);
    i || (i = /* @__PURE__ */ new Map(), this.Xf.set(t, i));
    for (const [r, h] of this.Xf) if (r !== t && h.has(e)) throw new _(`Plugin "${t}" attempted to register layer method "${e}" which is already provided by plugin "${r}".`, { plugin: t, method: e, conflictingPlugin: r });
    i.set(e, s), this.Vf(e, s);
  }
  Qf(t, e) {
    const s = this.Xf.get(t);
    if (!s) return;
    s.delete(e);
    let i = !1;
    for (const [r, h] of this.Xf) if (r !== t && h.has(e)) {
      i = !0;
      const o = h.get(e);
      this.Vf(e, o);
      break;
    }
    i || this.Kf(e), s.size === 0 && this.Xf.delete(t);
  }
  Wf(t) {
    const e = this.Xf.get(t);
    if (e) {
      for (const s of e.keys()) this.Kf(s);
      this.Xf.delete(t);
    }
  }
  Vf(t, e) {
    const s = this.Gf();
    Object.defineProperty(s, t, { value: e, writable: !0, configurable: !0, enumerable: !1 });
  }
  Kf(t) {
    const e = this.Gf(), s = Object.getOwnPropertyDescriptor(e, t);
    s && s.configurable && delete e[t];
  }
}
class Zs {
  constructor(t) {
    a(this, "Zf");
    a(this, "qf", /* @__PURE__ */ new Map());
    a(this, "Jf", /* @__PURE__ */ new Map());
    a(this, "$f", /* @__PURE__ */ new Map());
    a(this, "td", /* @__PURE__ */ new Map());
    a(this, "sd", /* @__PURE__ */ new Map());
    a(this, "ed", /* @__PURE__ */ new Map());
    a(this, "rd", /* @__PURE__ */ new Map());
    this.Zf = t;
  }
  nd(t, e) {
    return this.hd(this.qf, t, e);
  }
  od(t, e) {
    return this.hd(this.Jf, t, e);
  }
  ad(t, e) {
    return this.hd(this.$f, t, e);
  }
  ud(t, e) {
    return this.hd(this.td, t, e);
  }
  ld(t, e) {
    return this.hd(this.sd, t, e);
  }
  fd(t, e) {
    return this.hd(this.ed, t, e);
  }
  dd(t, e) {
    return this.hd(this.rd, t, e);
  }
  _d() {
    this.md(this.qf, (t) => t());
  }
  pd() {
    this.md(this.Jf, (t) => t());
  }
  vd(t) {
    this.md(this.$f, (e) => e(t));
  }
  $s(t) {
    this.md(this.td, (e) => e(t));
  }
  ne(t) {
    this.md(this.sd, (e) => e(t));
  }
  async gd() {
    await this.yd(this.ed, (t) => t());
  }
  async wd() {
    await this.yd(this.rd, (t) => t());
  }
  Ad(t) {
    this.qf.delete(t), this.Jf.delete(t), this.$f.delete(t), this.td.delete(t), this.sd.delete(t), this.ed.delete(t), this.rd.delete(t);
  }
  hd(t, e, s) {
    const i = t.get(e) ?? /* @__PURE__ */ new Set();
    return i.add(s), t.set(e, i), () => {
      const r = t.get(e);
      r && (r.delete(s), r.size === 0 && t.delete(e));
    };
  }
  md(t, e) {
    for (const s of this.Zf) {
      const i = t.get(s);
      i && i.forEach(e);
    }
  }
  async yd(t, e) {
    for (const s of this.Zf) {
      const i = t.get(s);
      if (i) for (const r of i) await e(r);
    }
  }
}
class Ws {
  constructor(t) {
    a(this, "bd");
    a(this, "Xf", /* @__PURE__ */ new Map());
    this.bd = t;
  }
  Yf(t, e, s) {
    let i = this.Xf.get(t);
    i || (i = /* @__PURE__ */ new Map(), this.Xf.set(t, i));
    for (const [r, h] of this.Xf) if (r !== t && h.has(e)) throw new _(`Plugin "${t}" attempted to register source method "${e}" which is already provided by plugin "${r}".`, { plugin: t, method: e, conflictingPlugin: r });
    i.set(e, s), this.Md(e, s);
  }
  Qf(t, e) {
    const s = this.Xf.get(t);
    if (!s) return;
    s.delete(e);
    let i = !1;
    for (const [r, h] of this.Xf) if (r !== t && h.has(e)) {
      i = !0;
      const o = h.get(e);
      this.Md(e, o);
      break;
    }
    i || this.xd(e), s.size === 0 && this.Xf.delete(t);
  }
  Wf(t) {
    const e = this.Xf.get(t);
    if (e) {
      for (const s of e.keys()) this.xd(s);
      this.Xf.delete(t);
    }
  }
  Md(t, e) {
    const s = this.bd();
    Object.defineProperty(s, t, { value: e, writable: !0, configurable: !0, enumerable: !1 });
  }
  xd(t) {
    const e = this.bd(), s = Object.getOwnPropertyDescriptor(e, t);
    s && s.configurable && delete e[t];
  }
}
class Ys {
  constructor(t, e, s, i) {
    a(this, "le");
    a(this, "Cd");
    a(this, "Pd");
    a(this, "Fd");
    this.le = t, this.Cd = e, this.Pd = s, this.Fd = i;
  }
  Sd(t) {
    const e = this.le, s = this.Cd, i = this.Pd, r = this.Fd, h = { get canvas() {
      return e.m.canvas;
    }, get targetCanvas() {
      return e.m.targetCanvas;
    }, get width() {
      return e.m.width;
    }, get height() {
      return e.m.height;
    }, get ownsContext() {
      return e.m.ownsContext;
    } };
    return { get renderer() {
      return e.q;
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
    }, registerPreDrawHook: (o) => s.nd(t, o), registerPostDrawHook: (o) => s.od(t, o), registerLayerDisposedHook: (o) => s.ad(t, o), registerLayerPreRenderHook: (o) => s.ud(t, o), registerLayerPostRenderHook: (o) => s.ld(t, o), registerPreSetupHook: (o) => s.fd(t, o), registerPostSetupHook: (o) => s.dd(t, o), extendLayer: (o, c) => {
      i.Yf(t, o, c);
    }, removeLayerExtension: (o) => {
      i.Qf(t, o);
    }, extendSource: (o, c) => {
      r.Yf(t, o, c);
    }, removeSourceExtension: (o) => {
      r.Qf(t, o);
    } };
  }
}
class js {
  constructor() {
    a(this, "Td", /* @__PURE__ */ new Map());
    a(this, "Zf", []);
  }
  Ed(t) {
    return this.Td.has(t);
  }
  au(t) {
    return this.Td.get(t);
  }
  Du(t) {
    this.Td.set(t.name, t), this.Zf.push(t.name);
  }
  Ld(t) {
    this.Td.delete(t);
    const e = this.Zf.indexOf(t);
    e !== -1 && this.Zf.splice(e, 1);
  }
  Od() {
    return [...this.Zf];
  }
  Dd() {
    return this.Zf;
  }
}
class Js {
  constructor(t) {
    a(this, "le");
    a(this, "kd");
    a(this, "Cd");
    a(this, "Pd");
    a(this, "Fd");
    a(this, "Rd");
    this.le = t, this.kd = new js(), this.Cd = new Zs(this.kd.Dd()), this.Pd = new Hs(() => Object.getPrototypeOf(this.le.layers.base)), this.Fd = new Ws(() => pt.prototype), this.Rd = new Ys(this.le, this.Cd, this.Pd, this.Fd);
  }
  zd(t) {
    for (const e of t) {
      if (this.kd.Ed(e.name)) {
        console.warn(`[textmode.js] Plugin "${e.name}" is already installed.`);
        continue;
      }
      const s = this.jd(e.name);
      try {
        const i = e.install(this.le, s);
        i instanceof Promise && i.catch((r) => {
          console.error(`[textmode.js] Async plugin "${e.name}" installation error:`, r), this.Hd(e.name);
        });
      } catch (i) {
        throw this.Hd(e.name), i;
      }
      this.kd.Du(e);
    }
  }
  async Id(t) {
    for (const e of t) {
      if (this.kd.Ed(e.name)) {
        console.warn(`[textmode.js] Plugin "${e.name}" is already installed.`);
        continue;
      }
      const s = this.jd(e.name);
      try {
        await e.install(this.le, s);
      } catch (i) {
        throw this.Hd(e.name), i;
      }
      this.kd.Du(e);
    }
  }
  async Bd(t) {
    const e = this.kd.au(t);
    if (!e) return;
    const s = this.jd(t);
    e.uninstall && await e.uninstall(this.le, s), this.kd.Ld(t), this.Hd(t);
  }
  _d() {
    this.Cd._d();
  }
  pd() {
    this.Cd.pd();
  }
  vd(t) {
    this.Cd.vd(t);
  }
  $s(t) {
    this.Cd.$s(t);
  }
  ne(t) {
    this.Cd.ne(t);
  }
  async gd() {
    await this.Cd.gd();
  }
  async wd() {
    await this.Cd.wd();
  }
  async Nd() {
    const t = this.kd.Od();
    for (const e of t) await this.Bd(e);
  }
  jd(t) {
    return this.Rd.Sd(t);
  }
  Hd(t) {
    this.Cd.Ad(t), this.Pd.Wf(t), this.Fd.Wf(t);
  }
}
const ft = `#version 300 es
layout(location=0)in vec2 A;layout(location=1)in vec2 B;out vec2 v_uv;void main(){v_uv=B;gl_Position=vec4(A,0.,1.);}`, Ce = `#version 300 es
precision highp float;uniform sampler2D u_texture;in vec2 v_uv;out vec4 fragColor;void main(){fragColor=texture(u_texture,v_uv);}`, Ks = ({ textmodifier: n }) => {
  const t = "|/-\\", e = Math.floor(n.frameCount / 6) % 4, s = M.ge("#F8F8F8"), i = n.color(s.r, s.g, s.b);
  n.background("#222323"), n.charColor(i), n.cellColor("#222323"), n.push(), n.translate(0, 0, 0), n.char(t[e]), n.rect(1, 1), n.pop();
  const r = "LOADING...", h = M.ge("#C0C0C0"), o = n.color(h.r, h.g, h.b);
  n.charColor(o), n.push(), n.translate(-5, 5, 0);
  for (const c of r) n.char(c), n.rect(1, 1), n.translateX(1);
  n.pop();
}, Gs = { transition: "fade", transitionDuration: 500 };
class Fe extends Ae {
  constructor(e, s) {
    super(e);
    a(this, "Zt");
    a(this, "Me", "active");
    a(this, "Gd", 0);
    a(this, "Xd");
    this.Zt = { ...Gs, ...s ?? {} }, this.Zt.transition === "none" && (this.Zt.transitionDuration = 0);
  }
  async Dt() {
    this.Et || (await super.Dt(), this.fe.opacity(1), this.fe.show());
  }
  get Fe() {
    return this.Me === "active" || this.Me === "transitioning";
  }
  Yd() {
    this.Zt.transitionDuration > 0 ? (this.Vd(), this.Gd = performance.now(), this.Et && (this.fe.opacity(1), this.fe.show())) : (this.Et && (this.fe.opacity(0), this.fe.hide()), this.Qd(), this.Kd());
  }
  Wd(e) {
    this.Xd = e;
  }
  Ee() {
    if (this.Me === "transitioning" && this.Zd())
      return this.qd(), void this.Kd();
    this.Le();
  }
  de() {
    return new H(this.le.q, { visible: !0, opacity: 1, fontSize: 16 });
  }
  Kd() {
    this.Xd && this.Xd();
  }
  Zd() {
    if (!this.Et) return !0;
    const e = this.Zt.transitionDuration;
    if (e <= 0) return this.fe.opacity(0), this.fe.hide(), !0;
    const s = performance.now() - this.Gd, i = Math.min(1, s / e);
    return this.fe.opacity(1 - i), i >= 1 && (this.fe.hide(), !0);
  }
  Le() {
    if (!this.Et) return;
    const e = { textmodifier: this.le, grid: this.fe.grid };
    this._e(Ks, e);
  }
  Qd() {
    this.Me !== "disabled" && (this.Me = "done");
  }
  Vd() {
    this.Me !== "disabled" && (this.Me = "transitioning");
  }
  qd() {
    this.Me === "transitioning" && (this.Me = "done");
  }
}
const di = Object.freeze(Object.defineProperty({ __proto__: null, LoadingLayerController: Fe }, Symbol.toStringTag, { value: "Module" })), fe = Object.fromEntries(ct.map((n, t) => [n, t]));
class Vs {
  constructor(t, e, s) {
    a(this, "q");
    a(this, "Jd");
    a(this, "Ds");
    a(this, "$d", 0);
    this.q = t, this.Jd = t.ur(ft, `#version 300 es
precision highp float;uniform sampler2D Um;uniform sampler2D Un;uniform vec2 Uo;uniform vec2 Up;uniform vec2 Uq;uniform float Ur;uniform float Us;uniform int Ut;in vec2 v_uv;out vec4 fragColor;const int A=0;const int B=1;const int C=2;const int D=3;const int E=4;const int F=5;const int G=6;const int H=7;const int I=8;const int J=9;const int K=10;const int L=11;const int M=12;const int N=13;vec3 O(vec3 P,vec3 Q){return Q;}vec3 R(vec3 P,vec3 Q){return P+Q;}vec3 S(vec3 P,vec3 Q){return P*Q;}vec3 T(vec3 P,vec3 Q){return 1.-(1.-P)*(1.-Q);}vec3 U(vec3 P,vec3 Q){return max(P-Q,0.);}vec3 V(vec3 P,vec3 Q){return min(P,Q);}vec3 W(vec3 P,vec3 Q){return max(P,Q);}vec3 X(vec3 P,vec3 Q){return mix(2.*P*Q,1.-2.*(1.-P)*(1.-Q),step(0.5,P));}vec3 Y(vec3 P,vec3 Q){return mix(P-(1.-2.*Q)*P*(1.-P),mix(P+(2.*Q-1.)*(P*(3.-2.*P)-P),P+(2.*Q-1.)*(sqrt(P)-P),step(0.25,P)),step(0.5,Q));}vec3 Z(vec3 P,vec3 Q){return mix(2.*P*Q,1.-2.*(1.-P)*(1.-Q),step(0.5,Q));}vec3 a(vec3 P,vec3 Q){return mix(min(vec3(1.),P/max(1.-Q,0.0001)),vec3(1.),step(1.,Q));}vec3 b(vec3 P,vec3 Q){return mix(1.-min(vec3(1.),(1.-P)/max(Q,0.0001)),vec3(0.),step(Q,vec3(0.)));}vec3 c(vec3 P,vec3 Q){return abs(P-Q);}vec3 d(vec3 P,vec3 Q){return P+Q-2.*P*Q;}vec3 e(int f,vec3 P,vec3 Q){if(f==A)return O(P,Q);if(f==B)return R(P,Q);if(f==C)return S(P,Q);if(f==D)return T(P,Q);if(f==E)return U(P,Q);if(f==F)return V(P,Q);if(f==G)return W(P,Q);if(f==H)return X(P,Q);if(f==I)return Y(P,Q);if(f==J)return Z(P,Q);if(f==K)return a(P,Q);if(f==L)return b(P,Q);if(f==M)return c(P,Q);if(f==N)return d(P,Q);return O(P,Q);}void main(){vec4 g=texture(Un,v_uv);vec2 h=v_uv*Uo;vec2 i=h-Uq;vec2 j=Up*0.5;vec2 k=i-j;float l=cos(-Us);float m=sin(-Us);vec2 n=vec2(k.x*l-k.y*m,k.x*m+k.y*l);i=n+j;bool o=any(lessThan(i,vec2(0.)))||any(greaterThanEqual(i,Up));if(o){fragColor=g;return;}vec2 p=(floor(i)+0.5)/Up;vec4 q=texture(Um,p);float r=q.a*Ur;if(r<=0.){fragColor=g;return;}vec3 s=e(Ut,g.rgb,q.rgb);vec3 t=mix(g.rgb,s,r);float u=g.a+r*(1.-g.a);fragColor=vec4(t,u);}`), this.Ds = [this.q.et(e, s, 1), this.q.et(e, s, 1)];
  }
  t_(t) {
    const { base: e, targetFramebuffer: s, backgroundColor: i, layers: r, canvasWidth: h, canvasHeight: o } = t, c = this.q.La(), u = this.q.Oa();
    this.q.Ta(!1), this.q.Ea(!1);
    const l = this.Ds[0];
    l.begin(), this.q.Hh(...i), l.end(), this.$d = 0, e.layer.bs && this.i_(e.texture, h, o, e.width, e.height, e.layer.Ms, e.offsetX, e.offsetY, e.layer.Ps, "normal");
    for (const f of r) {
      const d = f.layer;
      d.bs && this.i_(f.texture, h, o, f.width, f.height, d.Ms, f.offsetX, f.offsetY, d.Ps, d.Cs);
    }
    this.s_(s, h, o), this.q.Ea(u), this.q.Ta(c);
  }
  i_(t, e, s, i, r, h, o, c, u, l) {
    const f = this.Ds[this.$d], d = this.$d === 0 ? 1 : 0, y = this.Ds[d], v = z(u);
    y.begin(), this.q.he(this.Jd), this.Jd.oe({ Um: t, Un: f.textures[0], Uo: [e, s], Up: [i, r], Uq: [o, c], Ur: h, Us: v, Ut: fe[l] }), this.q.ae(0, 0, f.width, f.height), y.end(), this.$d = d;
  }
  s_(t, e, s) {
    const i = this.Ds[this.$d];
    t.begin(), this.q.he(this.Jd), this.Jd.oe({ Um: i.textures[0], Un: i.textures[0], Uo: [e, s], Up: [i.width, i.height], Uq: [0, 0], Ur: 1, Us: 0, Ut: fe.normal }), this.q.ae(0, 0, e, s), t.end();
  }
  ue(t, e) {
    this.Ds[0].resize(t, e), this.Ds[1].resize(t, e);
  }
  O() {
    this.Jd.dispose(), this.Ds[0].dispose(), this.Ds[1].dispose();
  }
}
class Qs {
  constructor(t = {}) {
    a(this, "e_", []);
    a(this, "r_", []);
    a(this, "n_", !1);
    a(this, "Zt");
    this.Zt = t;
  }
  async initialize(t) {
    var e, s;
    for (const i of this.r_) t && await t(i), this.e_.push(i), (s = (e = this.Zt).onAdd) == null || s.call(e, i);
    this.r_ = [], this.n_ = !0;
  }
  get isReady() {
    return this.n_;
  }
  add(t) {
    var e, s;
    return this.n_ ? (this.e_.push(t), (s = (e = this.Zt).onAdd) == null || s.call(e, t)) : this.r_.push(t), t;
  }
  addMany(t) {
    for (const e of t) this.add(e);
    return t;
  }
  remove(t) {
    const e = this.e_.indexOf(t);
    if (e !== -1) return this.e_.splice(e, 1), this.h_(t), !0;
    const s = this.r_.indexOf(t);
    return s !== -1 && (this.r_.splice(s, 1), this.h_(t), !0);
  }
  removeAt(t) {
    if (t < 0 || t >= this.e_.length) return;
    const [e] = this.e_.splice(t, 1);
    return this.h_(e), e;
  }
  move(t, e) {
    var r, h;
    const s = this.e_.indexOf(t);
    if (s !== -1) {
      this.e_.splice(s, 1);
      const o = Y(e, 0, this.e_.length);
      return this.e_.splice(o, 0, t), (h = (r = this.Zt).onMove) == null || h.call(r, t, s, o), !0;
    }
    const i = this.r_.indexOf(t);
    if (i !== -1) {
      this.r_.splice(i, 1);
      const o = Y(e, 0, this.r_.length);
      return this.r_.splice(o, 0, t), !0;
    }
    return !1;
  }
  swap(t, e) {
    var o, c;
    if (t === e) return !0;
    const s = this.e_.indexOf(t), i = this.e_.indexOf(e);
    if (s !== -1 && i !== -1) return this.e_[s] = e, this.e_[i] = t, (c = (o = this.Zt).onSwap) == null || c.call(o, t, e, s, i), !0;
    const r = this.r_.indexOf(t), h = this.r_.indexOf(e);
    return r !== -1 && h !== -1 && (this.r_[r] = e, this.r_[h] = t, !0);
  }
  clear() {
    for (const t of this.e_) this.h_(t);
    this.e_ = [];
    for (const t of this.r_) this.h_(t);
    this.r_ = [];
  }
  dispose() {
    this.clear(), this.n_ = !1;
  }
  get all() {
    return this.e_;
  }
  get pending() {
    return this.r_;
  }
  get length() {
    return this.e_.length;
  }
  get totalLength() {
    return this.e_.length + this.r_.length;
  }
  get isEmpty() {
    return this.e_.length === 0;
  }
  get(t) {
    return this.e_[t];
  }
  get first() {
    return this.e_[0];
  }
  get last() {
    return this.e_[this.e_.length - 1];
  }
  indexOf(t) {
    return this.e_.indexOf(t);
  }
  has(t) {
    return this.e_.includes(t) || this.r_.includes(t);
  }
  [Symbol.iterator]() {
    return this.e_[Symbol.iterator]();
  }
  h_(t) {
    var e, s, i, r;
    (s = (e = this.Zt).onRemove) == null || s.call(e, t), (r = (i = this.Zt).onDispose) == null || r.call(i, t);
  }
}
async function Rt(n) {
  if (n.startsWith("./") || n.startsWith("../") || n.endsWith(".vert") || n.endsWith(".frag") || n.endsWith(".glsl")) {
    const t = await fetch(n);
    if (!t.ok) throw Error(`Failed to load shader from ${n}: ${t.statusText}`);
    return await t.text();
  }
  return n;
}
class Pe {
  constructor(t) {
    a(this, "q");
    a(this, "o_", /* @__PURE__ */ new Map());
    a(this, "a_", /* @__PURE__ */ new Map());
    a(this, "Je");
    a(this, "Ds");
    a(this, "Et", !1);
    this.q = t, this.Je = t.ur(ft, Ce), this.c_();
  }
  async register(t, e, s = {}) {
    const i = Object.entries(s), r = i.length > 0 ? i[0][1][0] : null;
    let h;
    if (typeof e == "string") {
      const c = await Rt(e);
      h = this.q.ur(ft, c), this.a_.set(t, h);
    } else h = e, this.a_.set(t, h);
    const o = { id: t, createShader: () => h, createUniforms: (c, u) => {
      const l = { u_resolution: [u.width, u.height] };
      for (const [f, [d, y]] of i) {
        let v = y;
        if (c != null) {
          if (typeof c == "number" && d === r) v = c;
          else if (typeof c == "object" && d in c) {
            const g = c[d];
            xe(g) && (v = g);
          }
        }
        l[f] = v;
      }
      return l;
    } };
    this.o_.set(t, o);
  }
  unregister(t) {
    const e = this.a_.get(t);
    return e && (e.dispose(), this.a_.delete(t)), this.o_.delete(t);
  }
  has(t) {
    return this.o_.has(t);
  }
  Dt(t, e) {
    this.Et || (this.Ds = [this.q.et(t, e, 1, { depth: !1 }), this.q.et(t, e, 1, { depth: !1 })], this.Et = !0);
  }
  u_(t, e, s, i, r) {
    this.Ds[0].width === i && this.Ds[0].height === r || (this.Ds[0].resize(i, r), this.Ds[1].resize(i, r)), this.ce(t, e, s, i, r, this.Ds);
  }
  ce(t, e, s, i, r, h) {
    if (s.length === 0) return void this.l_(t, e, i, r);
    this.l_(t, h[0], i, r);
    let o = 0;
    for (let c = 0; c < s.length; c++) {
      const u = s[c], l = c === s.length - 1, f = o === 0 ? 1 : 0, d = l ? e : h[f];
      this.f_(u, h[o], d, i, r), l || (o = f);
    }
  }
  f_(t, e, s, i, r) {
    const h = this.o_.get(t.name);
    if (!h) return console.warn(`[textmode.js] Unknown filter: "${t.name}". Skipping.`), void this.l_(e.textures[0], s, i, r);
    const o = this.d_(t.name, h, i, r), c = { renderer: this.q, gl: this.q.context, width: i, height: r };
    s.begin(), this.q.he(o), o.oe({ u_texture: e.textures[0] });
    const u = h.createUniforms(t.params, c);
    o.oe(u), this.q.ae(0, 0, i, r), s.end();
  }
  d_(t, e, s, i) {
    let r = this.a_.get(t);
    if (!r && e) {
      const h = { renderer: this.q, gl: this.q.context, width: s, height: i };
      r = e.createShader(h), this.a_.set(t, r);
    }
    return r;
  }
  l_(t, e, s, i) {
    e.begin(), this.q.he(this.Je), this.Je.oe({ u_texture: t, u_resolution: [s, i] }), this.q.ae(0, 0, s, i), e.end();
  }
  ue(t, e) {
    this.Ds && (this.Ds[0].resize(t, e), this.Ds[1].resize(t, e));
  }
  O() {
    for (const t of this.a_.values()) t.dispose();
    this.a_.clear(), this.o_.clear(), this.Je.dispose(), this.Ds && (this.Ds[0].dispose(), this.Ds[1].dispose()), this.Et = !1;
  }
  c_() {
    this.register("invert", `#version 300 es
precision highp float;uniform sampler2D u_texture;in vec2 v_uv;out vec4 fragColor;void main(){vec4 A=texture(u_texture,v_uv);fragColor=vec4(1.-A.rgb,A.a);}`, {}), this.register("grayscale", `#version 300 es
precision highp float;uniform sampler2D u_texture;uniform float Ui;in vec2 v_uv;out vec4 fragColor;void main(){vec4 A=texture(u_texture,v_uv);float B=dot(A.rgb,vec3(0.299,0.587,0.114));vec3 C=mix(A.rgb,vec3(B),Ui);fragColor=vec4(C,A.a);}`, { Ui: ["amount", 1] }), this.register("sepia", `#version 300 es
precision highp float;uniform sampler2D u_texture;uniform float Ui;in vec2 v_uv;out vec4 fragColor;void main(){vec4 A=texture(u_texture,v_uv);vec3 B;B.r=dot(A.rgb,vec3(0.393,0.769,0.189));B.g=dot(A.rgb,vec3(0.349,0.686,0.168));B.b=dot(A.rgb,vec3(0.272,0.534,0.131));vec3 C=mix(A.rgb,B,Ui);fragColor=vec4(C,A.a);}`, { Ui: ["amount", 1] }), this.register("threshold", `#version 300 es
precision highp float;uniform sampler2D u_texture;uniform float Ul;in vec2 v_uv;out vec4 fragColor;void main(){vec4 A=texture(u_texture,v_uv);float B=dot(A.rgb,vec3(0.299,0.587,0.114));float C=step(Ul,B);fragColor=vec4(vec3(C),A.a);}`, { Ul: ["threshold", 0.5] });
  }
}
const pi = Object.freeze(Object.defineProperty({ __proto__: null, TextmodeFilterManager: Pe }, Symbol.toStringTag, { value: "Module" }));
class Oe {
  constructor(t, e) {
    a(this, "le");
    a(this, "q");
    a(this, "__");
    a(this, "m_");
    a(this, "p_");
    a(this, "v_");
    a(this, "n_", !1);
    a(this, "g_", /* @__PURE__ */ new Set());
    a(this, "y_", []);
    a(this, "w_", []);
    a(this, "A_", !1);
    a(this, "b_", () => {
    });
    a(this, "M_");
    a(this, "x_");
    a(this, "C_");
    a(this, "P_");
    a(this, "F_");
    this.le = t, this.q = t.q, this.m_ = new Pe(this.q), this.__ = new Vs(this.q, this.le.m.width, this.le.m.height), this.p_ = new Qs({ onRemove: (s) => this.le.te.vd(s), onDispose: (s) => s == null ? void 0 : s.O() }), this.v_ = new H(this.q, { visible: !0, opacity: 1, fontSize: e.fontSize, fontSource: e.fontSource }), this.P_ = new Fe(this.le, e.loadingScreen), this.F_ = new we(this.le);
  }
  async Dt() {
    await this.S_(this.v_);
    const t = this.le.m;
    this.M_ = this.q.et(t.width, t.height, 1), this.x_ = this.q.et(t.width, t.height, 1), this.C_ = this.M_, this.m_.Dt(t.width, t.height), await this.P_.Dt(), await this.F_.Dt(), await this.S_(this.P_.fe), await this.S_(this.F_.fe), await this.p_.initialize((e) => this.S_(e)), this.n_ = !0;
  }
  T_(t, e) {
    (this.A_ ? this.w_ : this.y_).push({ name: t, params: e });
  }
  E_(t) {
    this.b_ = t;
  }
  L_() {
    this.y_ = [], this.w_ = [];
  }
  add(t = {}) {
    const e = new H(this.q, t);
    return this.p_.isReady && this.S_(e), this.p_.add(e), e;
  }
  remove(t) {
    this.p_.remove(t);
  }
  move(t, e) {
    this.p_.move(t, e);
  }
  swap(t, e) {
    this.p_.swap(t, e);
  }
  clear() {
    this.p_.clear();
  }
  U_(t, e = [], s = !1) {
    this.le.te._d(), this.v_.Js(this.le, this.le.O_);
    const i = [...this.q.state.An.vn];
    let r = i;
    for (const h of this.p_.all) h.Js(this.le, this.le.O_);
    for (const h of e) h.bs && h.Js(this.le, this.le.O_, { skipPluginHooks: !0 });
    if (s && e.length > 0) {
      const h = e[0], o = [...this.q.state.An.vn], c = Math.max(0, Math.min(1, h.Ms));
      r = this.D_(i, o, c);
    }
    this.k_(t, r, e);
  }
  D_(t, e, s) {
    const i = 1 - s;
    return [t[0] * i + e[0] * s, t[1] * i + e[1] * s, t[2] * i + e[2] * s, t[3] * i + e[3] * s];
  }
  R_() {
    this.U_(this.M_), this.z_();
  }
  j_(t, e = !1) {
    this.U_(this.M_, [t], e), this.z_();
  }
  z_() {
    let t = this.M_.textures[0];
    if (this.y_.length > 0) {
      const s = this.le.m;
      this.m_.u_(this.M_.textures[0], this.x_, this.y_, s.width, s.height), t = this.x_.textures[0], this.C_ = this.x_, this.y_ = [];
    } else this.C_ = this.M_;
    try {
      try {
        this.A_ = !0, this.b_.call(this.le);
      } finally {
        this.A_ = !1;
      }
      if (this.w_.length > 0) {
        const s = this.x_;
        this.m_.u_(this.C_.textures[0], s, this.w_, this.le.m.width, this.le.m.height), t = s.textures[0], this.C_ = s;
      }
    } finally {
      this.w_ = [], this.A_ = !1;
    }
    const e = this.le.m;
    this.q.Hh(0, 0, 0, 0), this.q.he(this.le.H_), this.le.H_.oe({ u_texture: t }), this.q.ae(0, 0, e.width, e.height), this.le.te.pd();
  }
  I_(t) {
    const e = !this.q.ea();
    e && this.q.ia(!0), this.q.ha(!0), this.q.state.Ve();
    try {
      this.q.state.Ki.ws(), this.q.state.ee(), t.Js(this.le, this.le.O_, { skipPluginHooks: !0 });
      const s = t.texture, i = t.grid;
      if (!s || !i) return;
      this.q.Hh(...this.q.state.An.vn), this.q.he(this.le.H_), this.le.H_.oe({ u_texture: s }), this.q.ae(i.offsetX, i.offsetY, i.width, i.height);
    } finally {
      this.q.state.Qe(), this.q.oa(), e && this.q.ia(!1);
    }
  }
  k_(t, e, s = []) {
    const i = this.le.m, r = this.v_.grid, h = this.v_.texture;
    if (!h) return;
    const o = { layer: this.v_, texture: h, width: r.width, height: r.height, offsetX: r.offsetX + this.v_.l, offsetY: r.offsetY + this.v_._ }, c = [];
    for (const u of this.p_.all) {
      if (!u.grid || !u.texture) continue;
      const l = u.grid;
      c.push({ layer: u, texture: u.texture, width: l.width, height: l.height, offsetX: l.offsetX + u.l, offsetY: l.offsetY + u._ });
    }
    for (const u of s) {
      if (!u.bs || !u.grid || !u.texture) continue;
      const l = u.grid;
      c.push({ layer: u, texture: u.texture, width: l.width, height: l.height, offsetX: l.offsetX + u.l, offsetY: l.offsetY + u._ });
    }
    this.__.t_({ base: o, layers: c, targetFramebuffer: t, backgroundColor: e, canvasWidth: i.width, canvasHeight: i.height });
  }
  ue() {
    var e, s, i, r, h;
    if (!this.n_) return;
    const t = this.le.m;
    this.v_.ue();
    for (const o of this.p_.all) o.ue();
    (e = this.P_.fe) == null || e.ue(), (s = this.F_.fe) == null || s.ue(), this.__.ue(t.width, t.height), (i = this.M_) == null || i.resize(t.width, t.height), (r = this.x_) == null || r.resize(t.width, t.height), (h = this.m_) == null || h.ue(t.width, t.height);
  }
  O() {
    var t, e;
    this.P_.O(), this.F_.O(), this.p_.dispose(), this.le.te.vd(this.v_), this.v_.O(), this.m_.O(), this.__.O(), (t = this.M_) == null || t.dispose(), (e = this.x_) == null || e.dispose(), this.y_ = [], this.w_ = [], this.A_ = !1, this.n_ = !1;
  }
  get all() {
    return this.p_.all;
  }
  get base() {
    return this.v_;
  }
  get filters() {
    return this.m_;
  }
  get resultFramebuffer() {
    const t = this.y_.length > 0 || this.w_.length > 0 ? this.x_ : this.C_ ?? this.M_;
    if (!t) throw new _("LayerManager.resultFramebuffer is not available before initialization completes.");
    return t;
  }
  get loading() {
    return this.P_;
  }
  get errors() {
    return this.F_;
  }
  B_() {
    const t = this.p_.all;
    for (let e = t.length - 1; e >= 0; e--) {
      const s = t[e];
      if (s.bs && s.grid) return s.grid;
    }
    return this.v_.grid;
  }
  N_(t) {
    this.g_.add(t);
  }
  G_() {
    for (const t of this.g_) t();
  }
  async S_(t) {
    var s;
    const e = { renderer: this.q, canvas: this.le.m, filterManager: this.m_, createFramebuffer: (i, r, h = 1, o) => this.q.et(i, r, h, o) };
    await t.Ys(e), (s = t.grid) == null || s.F(() => this.G_());
  }
}
const mi = Object.freeze(Object.defineProperty({ __proto__: null, TEXTMODE_LAYER_BLEND_MODES: ct, TextmodeLayer: H, TextmodeLayerManager: Oe }, Symbol.toStringTag, { value: "Module" })), $s = { id: "brightness", createShader: ({ gl: n }) => new lt(n, Vt, `#version 300 es
precision highp float;in vec2 v_uv;in vec3 v_worldPosition;uniform sampler2D u_image;uniform bool u_invert;uniform bool u_flipX;uniform bool u_flipY;uniform float u_charRotation;uniform float U1;uniform float U2;uniform bool u_charColorFixed;uniform vec4 u_charColor;uniform bool u_cellColorFixed;uniform vec4 u_cellColor;uniform vec4 u_backgroundColor;uniform int u_charCount;uniform sampler2D u_charPaletteTexture;uniform ivec2 u_charPaletteDimensions;uniform bool u_tmUseLighting;uniform vec3 u_tmAmbientLightColor;uniform int u_tmPointLightCount;uniform vec3 u_tmPointLightPositions[5];uniform vec3 u_tmPointLightColors[5];uniform vec3 u_tmLightFalloff;layout(location=0)out vec4 o_character;layout(location=1)out vec4 o_primaryColor;layout(location=2)out vec4 o_secondaryColor;layout(location=3)out vec4 A;const int B=5;float C(vec3 D){return dot(D,vec3(0.299f,0.587f,0.114f));}vec3 E(int F){int G=max(u_charPaletteDimensions.x,1);int H=F/G;int I=F%G;return texelFetch(u_charPaletteTexture,ivec2(I,H),0).rgb;}vec3 J(vec3 K){vec3 L=cross(dFdy(K),dFdx(K));float M=length(L);if(M<=0.000001f){return vec3(0.0f,0.0f,1.0f);}return L/M;}vec3 N(vec3 O,vec3 K){if(!u_tmUseLighting){return O;}vec3 P=O*u_tmAmbientLightColor;if(u_tmPointLightCount>0){vec3 L=J(K);for(int Q=0;Q<B;Q++){if(Q>=u_tmPointLightCount){break;}vec3 R=u_tmPointLightPositions[Q]-K;float S=length(R);vec3 T=S>0.000001f?R/S:L;float U=max(dot(L,T),0.0f);float V=u_tmLightFalloff.x+S*u_tmLightFalloff.y+S*S*u_tmLightFalloff.z;float W=V>0.0f?1.0f/V:1.0f;P+=O*u_tmPointLightColors[Q]*(U*W);}}return clamp(P,0.0f,1.0f);}void main(){vec2 X=vec2(v_uv.x,1.0f-v_uv.y);vec4 Y=texture(u_image,X);float Z=C(Y.rgb);if(Y.a<0.01f||Z<U1||Z>U2){discard;}vec2 a=vec2(0.);if(u_charCount>0){float b=float(u_charCount);float c=clamp(Z*(b-1.0f),0.0f,b-1.0f);int d=int(floor(c+0.5f));vec3 e=E(d);a=e.xy;}else{a=vec2(0.0f,0.0f);}vec4 f=u_charColorFixed?u_charColor:Y;vec4 g=u_cellColorFixed?u_cellColor:Y;vec3 h=N(f.rgb,v_worldPosition);vec3 i=N(g.rgb,v_worldPosition);o_primaryColor=vec4(h,f.a);o_secondaryColor=vec4(i,g.a);A=vec4(0.);int j=int(u_invert?1:0);int k=int(u_flipX?1:0);int l=int(u_flipY?1:0);float m=float(j|(k<<1)|(l<<2))/255.;o_character=vec4(a,m,clamp(u_charRotation,0.0f,1.0f));}`), createUniforms: ({ source: n }) => n.createBaseConversionUniforms() };
class Re {
  constructor() {
    a(this, "X_", /* @__PURE__ */ new Map());
    a(this, "a_", /* @__PURE__ */ new Map());
    this.Y_();
  }
  register(t) {
    this.X_.set(t.id, t);
  }
  unregister(t) {
    const e = this.a_.get(t);
    return e && (e.dispose(), this.a_.delete(t)), this.X_.delete(t);
  }
  has(t) {
    return this.X_.has(t);
  }
  au(t) {
    return this.X_.get(t);
  }
  tu(t, e) {
    let s = this.a_.get(t);
    if (!s) {
      const i = this.X_.get(t);
      if (!i) throw Error(`[textmode.js] Conversion mode "${t}" is not registered.`);
      s = i.createShader(e), this.a_.set(t, s);
    }
    return s;
  }
  O() {
    for (const t of this.a_.values()) t.dispose();
    this.a_.clear(), this.X_.clear();
  }
  Y_() {
    this.register($s);
  }
}
const gi = Object.freeze(Object.defineProperty({ __proto__: null, TextmodeConversionManager: Re }, Symbol.toStringTag, { value: "Module" }));
class p {
  constructor(t = {}) {
    a(this, "q");
    a(this, "O_");
    a(this, "H_");
    a(this, "m");
    a(this, "V_");
    a(this, "df");
    a(this, "Q_");
    a(this, "K_");
    a(this, "W_");
    a(this, "Z_");
    a(this, "re");
    a(this, "ec");
    a(this, "q_", /* @__PURE__ */ new Set());
    a(this, "te");
    a(this, "J_");
    a(this, "tm");
    a(this, "im");
    a(this, "Jo", !1);
    a(this, "sm", !1);
    a(this, "Ba", !1);
    a(this, "rm", null);
    a(this, "nm", () => {
    });
    a(this, "hm", () => {
    });
    a(this, "om");
    a(this, "am");
    a(this, "um");
    a(this, "ka", !1);
    a(this, "lm");
    a(this, "fm");
    this.te = new Js(this), this.ka = t.overlay ?? !1, this.J_ = new Promise((s) => {
      this.im = s;
    }), this.m = new Ss(t), this.q = new Rs(this.m.Ka()), this.O_ = this.q.ur(ft, `#version 300 es
precision highp float;uniform sampler2D u_characterTexture;uniform vec2 u_charsetDimensions;uniform sampler2D Uc;uniform sampler2D Ud;uniform sampler2D Ub;uniform bool Ue;uniform vec2 Uf;uniform vec2 Ug;uniform vec4 Uh;in vec2 v_uv;out vec4 fragColor;mat2 A(float B){float C=sin(B);float D=cos(B);return mat2(D,-C,C,D);}float E(vec3 F){return dot(F,vec3(0.299f,0.587f,0.114f));}void main(){vec2 G=gl_FragCoord.xy/Ug;vec2 H=G*Uf;vec2 I=floor(H);vec2 J=(I+0.5)/Uf;vec4 K=texture(Uc,J);vec4 L=texture(Ud,J);vec4 M=texture(Ub,J);int N=int(M.r*255.+0.5);int O=int(M.g*255.+0.5);int P=int(M.a*255.+0.5);if(N==255&&O==255&&int(M.b*255.+0.5)==0&&P==0){fragColor=vec4(0.);return;}int Q=int(M.b*255.+0.5);bool R=(Q&1)!=0;bool S=(Q&2)!=0;bool T=(Q&4)!=0;int U=N+O*256;int V=int(u_charsetDimensions.x);int W=U/V;int X=U-(W*V);float Y=(u_charsetDimensions.y-1.)-float(W);vec2 Z=1./u_charsetDimensions;vec2 a=vec2(float(X),Y)*Z;vec2 b=a+Z;float c=-M.a*360.*0.017453292;vec2 d=fract(H)-0.5f;vec2 e=vec2(S?-1.:1.,T?-1.:1.);d*=e;d=A(c)*d+0.5;vec2 f=a+clamp(d,0.,1.)*Z;const float g=0.0001;if(any(lessThan(f,a-g))||any(greaterThan(f,b+g))){fragColor=R?K:L;return;}vec4 h=texture(u_characterTexture,f);if(!Ue){fragColor=h;return;}float i=(h.a>0.0f&&E(h.rgb)>0.5f)?1.0f:0.0f;if(R)i=1.0f-i;vec4 j=mix(Uh,L,L.a);fragColor=mix(j,K,i);}`), this.H_ = this.q.ur(ft, Ce), this.V_ = new Ds(t.frameRate ?? 60), this.Z_ = new Oe(this, t);
    const e = () => this.dm();
    this.df = new Ls(this.m, e), this.Q_ = new Ns(this.m, e, this.df), this.K_ = new qs(), this.W_ = new zs(), this.ec = new Re(), this.te.zd(t.plugins ?? []), this.tm = this.Dt();
  }
  _m(t) {
    var e;
    this.q_.add(t), (e = t.I) == null || e.call(t, () => {
      this.q_.delete(t);
    });
  }
  pm(t, e) {
    var s;
    this.m.ue(t, e), (s = this.Z_) == null || s.ue(), this.q.Sa(), this.Js();
  }
  vm() {
    var i;
    const t = (i = this.Z_) == null ? void 0 : i.base.grid;
    if (!t) return;
    const e = t.cols, s = t.rows;
    for (const r of this.q_) r instanceof pt && r.ue(e, s);
    this.lm && this.lm.ue(e, s);
  }
  async Dt() {
    await this.Z_.Dt(), this.im();
    const t = this.Z_.base.grid;
    this.vm(), this.Z_.N_(() => {
      this.df._l(), this.Q_._l();
    }), this.ka && (this.lm = mt.cu(this.q, this.ec, this.m.targetCanvas, t.cols, t.rows)), this.gm(), t.F(() => {
      this.vm();
    }), this.V_.bu(() => this.Js());
    try {
      await this.te.gd(), await this.nm(), await this.te.wd(), this.V_.wu = 0, this.loading.Yd();
    } catch (e) {
      this.ym(e, "setup");
    }
  }
  gm() {
    this.om = () => {
      this.ka && this.resizeCanvas(this.m.targetCanvas.width, this.m.targetCanvas.height), this.hm();
    }, window.addEventListener("resize", this.om), this.df.nl(), this.Q_.nl(), this.K_.nl(), this.W_.nl(), this.am = () => {
      this.K_.Hl();
    }, window.addEventListener("blur", this.am), this.ka && (this.um = new ResizeObserver(() => {
      this.resizeCanvas(this.m.targetCanvas.width, this.m.targetCanvas.height);
    }), this.um.observe(this.m.targetCanvas));
  }
  Js() {
    if (this.V_.Fu(), this.V_.Tu(), this.df.Al(), this.W_.Al(), this.errors.Fe) {
      this.errors.Ee();
      const t = this.errors.fe;
      return void (t && this.Z_.I_(t));
    }
    if (this.loading.Fe) try {
      this.loading.Ee();
      const t = this.loading.fe;
      this.loading.Me === "active" ? t && this.Z_.I_(t) : t ? this.Z_.j_(t, !0) : this.Z_.R_();
    } catch (t) {
      this.ym(t, "loading screen");
    }
    else {
      this.Jo = !0, this.q.ia(!0);
      try {
        this.ka && Dt(this.q.context, this.lm.texture, this.m.targetCanvas), this.Z_.R_();
      } catch (t) {
        this.ym(t, "draw loop");
      } finally {
        if (this.Jo = !1, this.q.ia(!1), this.sm && !this.Ba) this.wm();
        else if (this.rm) {
          const { width: t, height: e } = this.rm;
          this.rm = null, this.pm(t, e);
        }
      }
    }
  }
  resizeCanvas(t, e) {
    this.Jo ? this.rm = { width: t, height: e } : this.pm(t, e);
  }
  destroy() {
    this.Ba || this.sm || (this.sm = !0, this.V_.xu(), this.Jo || this.wm());
  }
  async wm() {
    var t, e, s, i;
    this.m.O(), await this.te.Nd(), window.removeEventListener("resize", this.om), window.removeEventListener("blur", this.am), (t = this.um) == null || t.disconnect(), this.df.dl(), this.Q_.dl(), this.K_.dl(), this.W_.dl(), (e = this.Z_) == null || e.O(), (s = this.ec) == null || s.O();
    for (const r of this.q_) r.dispose();
    this.q_.clear(), this.O_.dispose(), this.H_.dispose(), this.q.O(), (i = this.lm) == null || i.dispose(), this.Ba = !0;
  }
  filter(t, e) {
    this.Z_.T_(t, e);
  }
  draw(t) {
    this.Z_.base.draw(t);
  }
  postDraw(t) {
    this.Z_.base.postDraw(t);
  }
  finalDraw(t) {
    this.Z_.E_(t);
  }
  async loadFont(t, e = !0) {
    if (e) return await this.Z_.base.loadFont(t), this.Z_.base.font;
    if (t instanceof N) return t.Et || await t.Dt(), t;
    const s = new N(this.q);
    return await s.Dt(t), this._m(s), s;
  }
  async loadTileset(t, e = !0) {
    if (e) return await this.Z_.base.loadTileset(t), this.Z_.base.font;
    if (t instanceof X) return t.Et || await t.Dt(), t;
    const s = new X(this.q, t.fontSize, t);
    return await s.Dt(), this._m(s), s;
  }
  fontSize(t) {
    return this.Z_.base.fontSize(t);
  }
  useTileColors(t) {
    return this.Z_.base.useTileColors(t);
  }
  inputGrid(t) {
    return t === void 0 ? this.fm ?? "topmost" : t === "topmost" ? (this.fm = void 0, this.df._l(), void this.Q_._l()) : (this.fm = t, this.df._l(), void this.Q_._l());
  }
  dm() {
    return this.fm ? this.fm : this.Z_.B_();
  }
  ym(t, e) {
    console.error(`Error during ${e}:`, t), this.loading.Yd(), this.errors.Se(t);
  }
  async setup(t) {
    this.nm = t;
  }
  windowResized(t) {
    this.hm = t;
  }
  get grid() {
    var t;
    return ((t = this.re) == null ? void 0 : t.grid) ?? this.Z_.base.grid;
  }
  get font() {
    var t;
    return ((t = this.re) == null ? void 0 : t.font) ?? this.Z_.base.font;
  }
  get width() {
    return this.m.width;
  }
  get height() {
    return this.m.height;
  }
  get canvas() {
    return this.m.canvas;
  }
  get isDisposed() {
    return this.Ba;
  }
  get overlay() {
    return this.lm;
  }
  get loading() {
    return this.Z_.loading;
  }
  get errors() {
    return this.Z_.errors;
  }
  get layers() {
    return this.Z_;
  }
  get filters() {
    return this.Z_.filters;
  }
  get conversions() {
    return this.ec;
  }
  get isRenderingFrame() {
    return this.Jo;
  }
}
class Qt {
  constructor() {
  }
  static create(t = {}) {
    return new p(t);
  }
  static setErrorLevel(t) {
    it.Li(t);
  }
  static get version() {
    return "0.14.0";
  }
}
const $t = ["keyPressed", "keyTyped", "keyReleased"], te = ["mouseClicked", "doubleClicked", "mousePressed", "mouseReleased", "mouseMoved", "mouseDragged", "mouseScrolled"], ee = ["touchStarted", "touchMoved", "touchEnded", "touchCancelled"], se = ["tap", "doubleTap", "longPress", "swipe", "pinch", "rotateGesture"], ie = ["gamepadConnected", "gamepadDisconnected", "gamepadButtonPressed", "gamepadButtonReleased", "gamepadAxisChanged"], ti = [...$t, ...te, ...ee, ...se, ...ie], ei = new Set($t), si = new Set(te), ii = new Set(ee), ri = new Set(se), ni = new Set(ie);
function St(n, t) {
  switch ((function(e) {
    const s = e;
    if (ei.has(s)) return "keyboard";
    if (si.has(s)) return "mouse";
    if (ii.has(s)) return "touch";
    if (ri.has(s)) return "gesture";
    if (ni.has(s)) return "gamepad";
    throw Error(`Unknown event: "${s}"`);
  })(t)) {
    case "keyboard":
      return n.K_.Ju;
    case "mouse":
      return n.df.Ju;
    case "touch":
    case "gesture":
      return n.Q_.Ju;
    case "gamepad":
      return n.W_.Ju;
  }
}
const de = /* @__PURE__ */ new WeakMap();
function T(n, t, e) {
  var r;
  let s = de.get(n);
  s || (s = /* @__PURE__ */ new Map(), de.set(n, s)), (r = s.get(t)) == null || r();
  const i = St(n, t).Ru(t, e);
  s.set(t, i);
}
p.prototype.mouseClicked = function(n) {
  T(this, "mouseClicked", n);
}, p.prototype.doubleClicked = function(n) {
  T(this, "doubleClicked", n);
}, p.prototype.mousePressed = function(n) {
  T(this, "mousePressed", n);
}, p.prototype.mouseReleased = function(n) {
  T(this, "mouseReleased", n);
}, p.prototype.mouseMoved = function(n) {
  T(this, "mouseMoved", n);
}, p.prototype.mouseDragged = function(n) {
  T(this, "mouseDragged", n);
}, p.prototype.mouseScrolled = function(n) {
  T(this, "mouseScrolled", n);
}, p.prototype.cursor = function(n) {
  this.df.il(n);
}, p.prototype.requestPointerLock = function() {
  return this.df.sl();
}, p.prototype.exitPointerLock = function() {
  this.df.el();
}, Object.defineProperty(p.prototype, "mouse", { get: function() {
  return this.df.ml();
}, configurable: !0, enumerable: !0 }), Object.defineProperty(p.prototype, "mouseIsPressed", { get: function() {
  return this.df.wl();
}, configurable: !0, enumerable: !0 }), Object.defineProperty(p.prototype, "pmouse", { get: function() {
  return this.df.pl();
}, configurable: !0, enumerable: !0 }), Object.defineProperty(p.prototype, "movedX", { get: function() {
  return this.df.vl();
}, configurable: !0, enumerable: !0 }), Object.defineProperty(p.prototype, "movedY", { get: function() {
  return this.df.yl();
}, configurable: !0, enumerable: !0 }), p.prototype.frameRate = function(n) {
  return n === void 0 ? this.V_.mu : this.V_.Pu(n, () => this.Js());
}, p.prototype.targetFrameRate = function(n) {
  if (n === void 0) return this.V_.lu;
  this.V_.Su(n);
}, p.prototype.noLoop = function() {
  this.V_.xu();
}, p.prototype.loop = function() {
  this.V_.Cu(() => this.Js());
}, p.prototype.redraw = function(n = 1) {
  if (it.Ei(typeof n == "number" && n > 0 && Number.isInteger(n), "Redraw count must be a positive integer.", { method: "redraw", providedValue: n })) for (let t = 0; t < n; t++) this.Js();
}, p.prototype.isLooping = function() {
  return this.V_._u;
}, p.prototype.deltaTime = function() {
  return this.V_.yu;
}, Object.defineProperty(p.prototype, "frameCount", { get: function() {
  return this.V_.wu;
}, set: function(n) {
  this.V_.wu = n;
}, configurable: !0, enumerable: !0 }), Object.defineProperty(p.prototype, "millis", { get: function() {
  return this.V_.Eu;
}, set: function(n) {
  this.V_.Eu = n;
}, configurable: !0, enumerable: !0 }), Object.defineProperty(p.prototype, "secs", { get: function() {
  return this.V_.Lu;
}, set: function(n) {
  this.V_.Lu = n;
}, configurable: !0, enumerable: !0 }), p.prototype.touchStarted = function(n) {
  T(this, "touchStarted", n);
}, p.prototype.touchMoved = function(n) {
  T(this, "touchMoved", n);
}, p.prototype.touchEnded = function(n) {
  T(this, "touchEnded", n);
}, p.prototype.touchCancelled = function(n) {
  T(this, "touchCancelled", n);
}, p.prototype.tap = function(n) {
  T(this, "tap", n);
}, p.prototype.doubleTap = function(n) {
  T(this, "doubleTap", n);
}, p.prototype.longPress = function(n) {
  T(this, "longPress", n);
}, p.prototype.swipe = function(n) {
  T(this, "swipe", n);
}, p.prototype.pinch = function(n) {
  T(this, "pinch", n);
}, p.prototype.rotateGesture = function(n) {
  T(this, "rotateGesture", n);
}, Object.defineProperty(p.prototype, "touches", { get: function() {
  return this.Q_.Cf();
}, configurable: !0, enumerable: !0 }), p.prototype.keyPressed = function(n) {
  T(this, "keyPressed", n);
}, p.prototype.keyTyped = function(n) {
  T(this, "keyTyped", n);
}, p.prototype.keyReleased = function(n) {
  T(this, "keyReleased", n);
}, p.prototype.isKeyPressed = function(n) {
  return this.K_.Ol(n);
}, Object.defineProperty(p.prototype, "lastKeyPressed", { get: function() {
  return this.K_.kl();
}, configurable: !0, enumerable: !0 }), Object.defineProperty(p.prototype, "lastKeyReleased", { get: function() {
  return this.K_.Rl();
}, configurable: !0, enumerable: !0 }), Object.defineProperty(p.prototype, "pressedKeys", { get: function() {
  return this.K_.zl();
}, configurable: !0, enumerable: !0 }), Object.defineProperty(p.prototype, "modifierState", { get: function() {
  return this.K_.jl();
}, configurable: !0, enumerable: !0 }), p.prototype.gamepadConnected = function(n) {
  T(this, "gamepadConnected", n);
}, p.prototype.gamepadDisconnected = function(n) {
  T(this, "gamepadDisconnected", n);
}, p.prototype.gamepadButtonPressed = function(n) {
  T(this, "gamepadButtonPressed", n);
}, p.prototype.gamepadButtonReleased = function(n) {
  T(this, "gamepadButtonReleased", n);
}, p.prototype.gamepadAxisChanged = function(n) {
  T(this, "gamepadAxisChanged", n);
}, p.prototype.gamepad = function(n) {
  return this.W_.If(n);
}, Object.defineProperty(p.prototype, "gamepads", { get: function() {
  return this.W_.Hf();
}, configurable: !0, enumerable: !0 }), p.prototype.perspective = function(n, t, e) {
  this.layers.base.perspective(n, t, e);
}, p.prototype.createCamera = function() {
  return this.layers.base.createCamera();
}, p.prototype.setCamera = function(n) {
  this.layers.base.setCamera(n);
}, p.prototype.resetCamera = function() {
  this.layers.base.resetCamera();
}, p.prototype.camera = function(n, t, e, s = 0, i = 0, r = 0, h = 0, o = 1, c = 0) {
  this.layers.base.camera(n, t, e, s, i, r, h, o, c);
}, p.prototype.lookAt = function(n, t, e, s, i, r) {
  this.layers.base.lookAt(n, t, e, s, i, r);
}, p.prototype.ortho = function(n, t) {
  this.layers.base.ortho(n, t);
}, p.prototype.rect = function(n = 1, t = 1) {
  this.q.da(n, t);
}, p.prototype.point = function() {
  this.q.da(1, 1);
}, p.prototype.line = function(n, t, e, s) {
  this.q._a(n, t, e, s);
}, p.prototype.lineWeight = function(n) {
  if (n === void 0) return this.q.state.An.hn;
  this.q.state.An.Cn(n);
}, p.prototype.ellipse = function(n = 1, t = 1) {
  this.q.ma(n / 2, t / 2);
}, p.prototype.triangle = function(n, t, e, s, i, r) {
  this.q.pa(n, t, e, s, i, r);
}, p.prototype.arc = function(n, t, e, s) {
  this.q.ga(n / 2, t / 2, e, s);
}, p.prototype.bezierCurve = function(n, t, e, s, i, r, h, o) {
  this.q.va(n, t, e, s, i, r, h, o);
}, p.prototype.box = function(n = 50, t, e) {
  const s = t ?? n, i = e ?? s;
  this.q.ya(n, s, i);
}, p.prototype.sphere = function(n = 50) {
  this.q.wa(n);
}, p.prototype.torus = function(n = 50, t = 10) {
  this.q.ba(n, t);
}, p.prototype.cone = function(n = 50, t) {
  this.q.Ma(n, t ?? n);
}, p.prototype.cylinder = function(n = 50, t) {
  this.q.xa(n, t ?? n);
}, p.prototype.ellipsoid = function(n = 50, t, e) {
  this.q.Ca(n, t ?? n, e ?? n);
};
const pe = new Float32Array(16);
function me(n) {
  if (typeof n != "object" || n === null) return !1;
  const t = n;
  return typeof t.x == "number" && typeof t.y == "number" && typeof t.z == "number";
}
p.prototype.rotate = function(n = 0, t, e) {
  const s = this.q.state.Rn;
  if (typeof t == "number" || e !== void 0) return s.kr(n), s.Rr(t ?? 0), void s.zr(e ?? 0);
  t === void 0 ? s.zr(n) : Array.isArray(t) ? s.jr(n, t[0] ?? 0, t[1] ?? 0, t[2] ?? 0) : s.jr(n, t.x ?? 0, t.y ?? 0, t.z ?? 0);
}, p.prototype.rotateX = function(n) {
  if (n === void 0) return Pt(this.q.state.Rn.yr);
  this.q.state.Rn.kr(n);
}, p.prototype.rotateY = function(n) {
  if (n === void 0) return Pt(this.q.state.Rn.wr);
  this.q.state.Rn.Rr(n);
}, p.prototype.rotateZ = function(n) {
  if (n === void 0) return Pt(this.q.state.Rn.Ar);
  this.q.state.Rn.zr(n);
}, p.prototype.translate = function(n = 0, t = 0, e = 0) {
  this.q.state.Rn.Lr(n, t, e);
}, p.prototype.translateX = function(n) {
  if (n === void 0) return this.q.state.Rn.pr;
  this.q.state.Rn.Lr(n, 0, 0);
}, p.prototype.translateY = function(n) {
  if (n === void 0) return this.q.state.Rn.vr;
  this.q.state.Rn.Lr(0, n, 0);
}, p.prototype.translateZ = function(n) {
  if (n === void 0) return this.q.state.Rn.gr;
  this.q.state.Rn.Lr(0, 0, n);
}, p.prototype.scale = function(n, t, e) {
  this.q.state.Rn.Dr(n, t, e);
}, p.prototype.resetMatrix = function() {
  this.q.state.Rn.Hr();
}, p.prototype.applyMatrix = function(...n) {
  let t;
  if (n.length === 1 && typeof n[0] != "number") t = n[0];
  else {
    if (n.length !== 16) throw Error("applyMatrix() expects either a 16-length array-like or 16 numeric arguments.");
    t = n;
  }
  if (t.length !== 16) throw Error("applyMatrix() expects exactly 16 values.");
  for (let e = 0; e < 16; e++) pe[e] = Number(t[e] ?? 0);
  this.q.state.Rn.Ir(pe);
}, p.prototype.push = function() {
  this.q.state.Ve();
}, p.prototype.pop = function() {
  this.q.state.Qe();
}, p.prototype.color = function(n, t, e, s) {
  return M.ge(n, t, e, s);
}, p.prototype.background = function(n, t, e, s = 255) {
  if (n === void 0) {
    const [r, h, o, c] = this.q.state.An.vn;
    return M.be(r, h, o, c);
  }
  const i = M.ge(n, t, e, s);
  this.q.state.An.kn(i.r, i.g, i.b, i.a), this.q.Pa(i.r, i.g, i.b, i.a);
}, p.prototype.clear = function() {
  this.q.Hh(0, 0, 0, 0);
}, p.prototype.charColor = function(n, t, e, s) {
  if (n === void 0) {
    const [r, h, o, c] = this.q.state.An.un;
    return M.be(r, h, o, c);
  }
  const i = M.ge(n, t, e, s);
  this.q.state.An.Sn(i.r, i.g, i.b, i.a);
}, p.prototype.stroke = function(n, t, e, s) {
  if (n === void 0) {
    const [r, h, o, c] = this.q.state.An.un;
    return M.be(r, h, o, c);
  }
  const i = M.ge(n, t, e, s);
  this.q.state.An.Sn(i.r, i.g, i.b, i.a);
}, p.prototype.cellColor = function(n, t, e, s) {
  if (n === void 0) {
    const [r, h, o, c] = this.q.state.An.ln;
    return M.be(r, h, o, c);
  }
  const i = M.ge(n, t, e, s);
  this.q.state.An.Tn(i.r, i.g, i.b, i.a);
}, p.prototype.fill = function(n, t, e, s) {
  if (n === void 0) {
    const [r, h, o, c] = this.q.state.An.ln;
    return M.be(r, h, o, c);
  }
  const i = M.ge(n, t, e, s);
  this.q.state.An.Tn(i.r, i.g, i.b, i.a);
}, p.prototype.char = function(n) {
  if (n === void 0) return this.q.state.An.cn;
  const t = typeof n == "number" ? this.font.characters[n].character : n;
  if (t.length === 0) throw Error("char() requires at least one character.");
  this.q.state.An.Pn(this.font.It(t)), this.q.state.An.Fn(t);
}, p.prototype.flipX = function(n) {
  if (n === void 0) return this.q.state.An.dn;
  this.q.state.An.En(n);
}, p.prototype.flipY = function(n) {
  if (n === void 0) return this.q.state.An._n;
  this.q.state.An.Ln(n);
}, p.prototype.charRotation = function(n) {
  if (n === void 0) return 360 * this.q.state.An.pn;
  this.q.state.An.Dn(n);
}, p.prototype.invert = function(n) {
  if (n === void 0) return this.q.state.An.mn;
  this.q.state.An.On(n);
}, p.prototype.ambientLight = function(n, t, e, s) {
  const i = M.ge(n, t, e, s), [r, h, o] = i.normalized;
  this.q.state.se.sn(r, h, o);
}, p.prototype.pointLight = function(n, t, e, s, i, r) {
  let h, o;
  if (typeof n == "number" && typeof t == "number" && typeof e == "number") if (h = M.ge(n, t, e), me(s)) o = s;
  else {
    if (typeof s != "number" || typeof i != "number" || typeof r != "number") throw Error("pointLight() expected RGB + XYZ or RGB + { x, y, z }.");
    o = { x: s, y: i, z: r };
  }
  else if (h = M.ge(n), me(t)) o = t;
  else {
    if (typeof t != "number" || typeof e != "number" || typeof s != "number") throw Error("pointLight() expected color + XYZ or color + { x, y, z }.");
    o = { x: t, y: e, z: s };
  }
  const [c, u, l] = h.normalized;
  this.q.state.se.en(c, u, l, o.x, o.y, o.z);
}, p.prototype.lightFalloff = function(n, t, e) {
  this.q.state.se.rn(n, t, e);
}, p.prototype.noLights = function() {
  this.q.state.se.nn();
}, p.prototype.shader = function(n) {
  this.q.ra(n);
}, p.prototype.resetShader = function() {
  this.q.na();
}, p.prototype.setUniform = function(n, t) {
  this.q._r(n, t);
}, p.prototype.setUniforms = function(n) {
  this.q.oe(n);
}, p.prototype.createFilterShader = async function(n) {
  const t = await Rt(n), e = this.q.aa(t);
  return this._m(e), e;
}, p.prototype.createShader = async function(n, t) {
  const e = await Rt(n), s = await Rt(t), i = this.q.ur(e, s);
  return this._m(i), i;
};
class gt extends pt {
  constructor(e, s, i, r, h, o, c, u, l) {
    super(e, s, i, r, h, o, c, u);
    a(this, "Kt");
    this.Kt = l;
  }
  static Am(e, s, i, r, h) {
    const o = e.context, { texture: c, width: u, height: l } = Gt(o, i);
    return new gt(o, e, c, s, u, l, r, h, i);
  }
  rt() {
    this.Kt instanceof HTMLVideoElement ? this.Kt.readyState >= this.Kt.HAVE_CURRENT_DATA && Dt(this.Oe, this.Za, this.Kt) : Dt(this.Oe, this.Za, this.Kt);
  }
  Ze() {
    return this.ze = null, super.Ze();
  }
  Kc() {
    this.rt();
  }
  get source() {
    return this.Kt;
  }
}
class G extends gt {
  constructor(t, e, s, i, r, h, o, c, u) {
    super(t, e, s, i, h, o, c, u, r);
  }
  dispose() {
    super.dispose(), this.bm.pause(), this.bm.src = "", this.bm.load();
  }
  static async Mm(t) {
    const e = document.createElement("video");
    return e.crossOrigin = "anonymous", e.loop = !0, e.muted = !0, e.playsInline = !0, await new Promise((s, i) => {
      e.addEventListener("loadedmetadata", () => s(), { once: !0 }), e.addEventListener("error", (r) => {
        var o;
        const h = r.target;
        i(Error("Failed to load video: " + (((o = h.error) == null ? void 0 : o.message) || "Unknown error")));
      }, { once: !0 }), e.src = t;
    }), e;
  }
  static Am(t, e, s, i, r) {
    const h = t.context, { texture: o, width: c, height: u } = Gt(h, s, h.LINEAR, h.LINEAR, h.CLAMP_TO_EDGE, h.CLAMP_TO_EDGE);
    return new G(h, t, o, e, s, c, u, i, r);
  }
  static async cu(t, e, s, i, r) {
    const h = await G.Mm(s);
    return G.Am(t, e, h, i, r);
  }
  async play() {
    await this.bm.play();
  }
  pause() {
    this.bm.pause();
  }
  stop() {
    this.bm.pause(), this.bm.currentTime = 0;
  }
  speed(t) {
    return this.bm.playbackRate = t, this;
  }
  loop(t = !0) {
    return this.bm.loop = t, this;
  }
  time(t) {
    return this.bm.currentTime = t, this;
  }
  volume(t) {
    return this.bm.volume = Y(t, 0, 1), this;
  }
  get videoElement() {
    return this.bm;
  }
  get currentTime() {
    return this.bm.currentTime;
  }
  get duration() {
    return this.bm.duration;
  }
  get isPlaying() {
    return !this.bm.paused && !this.bm.ended;
  }
  get bm() {
    return this.Kt;
  }
}
var zt;
p.prototype.createFramebuffer = function(n) {
  const t = this.q.et(n.width ?? this.grid.cols, n.height ?? this.grid.rows, n.attachments ?? 3);
  return this._m(t), t;
}, p.prototype.image = function(n, t, e) {
  this.q.ca(n, t, e, this.font), n instanceof ot && this.q.Ke();
}, p.prototype.loadImage = async function(n) {
  const t = n, e = new Promise((h, o) => {
    const c = new Image();
    c.crossOrigin = "anonymous", c.onload = () => h(c), c.onerror = (u) => o(u), c.src = t;
  }), [s] = await Promise.all([e, this.J_]), i = this.grid;
  if (!i) throw Error("[textmode.js] Cannot load image before grid initialization completes.");
  const r = mt.cu(this.q, this.ec, s, i.cols, i.rows);
  return this._m(r), r;
}, p.prototype.loadVideo = async function(n) {
  const [t] = await Promise.all([G.Mm(n), this.J_]), e = this.grid;
  if (!e) throw Error("[textmode.js] Cannot load video before grid initialization completes.");
  const s = G.Am(this.q, this.ec, t, e.cols, e.rows);
  return this._m(s), s;
}, p.prototype.createTexture = function(n) {
  const t = this.grid, e = gt.Am(this.q, this.ec, n, (t == null ? void 0 : t.cols) ?? 1, (t == null ? void 0 : t.rows) ?? 1);
  return this._m(e), e;
}, (zt = p.prototype).on = function(n, t) {
  return St(this, n).Ru(n, t);
}, zt.off = function(n, t) {
  St(this, n).zu(n, t);
}, zt.once = function(n, t) {
  return St(this, n).ju(n, t);
};
const vi = Object.freeze(Object.defineProperty({ __proto__: null, TextmodeImage: mt, TextmodeSource: pt, TextmodeTexture: gt, TextmodeVideo: G }, Symbol.toStringTag, { value: "Module" })), hi = Object.freeze(Object.defineProperty({ __proto__: null, GAMEPAD_EVENT_NAMES: ie }, Symbol.toStringTag, { value: "Module" })), oi = Object.freeze(Object.defineProperty({ __proto__: null, KEYBOARD_EVENT_NAMES: $t }, Symbol.toStringTag, { value: "Module" })), ai = Object.freeze(Object.defineProperty({ __proto__: null, MOUSE_EVENT_NAMES: te }, Symbol.toStringTag, { value: "Module" })), ci = Object.freeze(Object.defineProperty({ __proto__: null, GESTURE_EVENT_NAMES: se, TOUCH_EVENT_NAMES: ee }, Symbol.toStringTag, { value: "Module" })), yi = Object.freeze(Object.defineProperty({ __proto__: null, INPUT_EVENT_NAMES: ti, gamepad: hi, keyboard: oi, mouse: ai, touch: ci }, Symbol.toStringTag, { value: "Module" })), Ai = Object.freeze(Object.defineProperty({ __proto__: null }, Symbol.toStringTag, { value: "Module" })), wi = Qt.create, bi = Qt.setErrorLevel, _i = Qt.version;
export {
  we as ErrorLayerController,
  ti as INPUT_EVENT_NAMES,
  Fe as LoadingLayerController,
  ct as TEXTMODE_LAYER_BLEND_MODES,
  W as TextmodeCamera,
  M as TextmodeColor,
  Re as TextmodeConversionManager,
  _ as TextmodeError,
  ye as TextmodeErrorLevel,
  Pe as TextmodeFilterManager,
  N as TextmodeFont,
  ot as TextmodeFramebuffer,
  Le as TextmodeGrid,
  mt as TextmodeImage,
  H as TextmodeLayer,
  Oe as TextmodeLayerManager,
  lt as TextmodeShader,
  pt as TextmodeSource,
  gt as TextmodeTexture,
  X as TextmodeTileset,
  G as TextmodeVideo,
  p as Textmodifier,
  gi as conversion,
  wi as create,
  fi as errors,
  pi as filters,
  li as fonts,
  yi as input,
  mi as layering,
  di as loading,
  vi as media,
  Ai as plugins,
  bi as setErrorLevel,
  Qt as textmode,
  _i as version
};
