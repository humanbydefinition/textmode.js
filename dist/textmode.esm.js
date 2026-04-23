class Le {
  i;
  h;
  o;
  u;
  l;
  _;
  v;
  m;
  A;
  M = !1;
  C = /* @__PURE__ */ new Set();
  F() {
    if (this.o = this.i * this.m, this.u = this.h * this.A, this.l = Math.floor((this.v.width - this.o) / 2), this._ = Math.floor((this.v.height - this.u) / 2), this.C.size > 0) for (const t of this.C) t();
  }
  constructor(t, e, s) {
    this.v = t, this.m = e, this.A = s, this.reset();
  }
  P(t) {
    this.C.add(t);
  }
  S(t) {
    this.C.delete(t);
  }
  reset() {
    this.M || (this.i = Math.max(1, Math.floor(this.v.width / this.m)), this.h = Math.max(1, Math.floor(this.v.height / this.A))), this.F();
  }
  U(t, e) {
    this.m = t, this.A = e, this.reset();
  }
  get cellWidth() {
    return this.m;
  }
  get cellHeight() {
    return this.A;
  }
  get cols() {
    return this.i;
  }
  set cols(t) {
    this.M = !0, this.i = Math.max(1, Math.floor(t)), typeof this.h != "number" && (this.h = Math.max(1, Math.floor(this.v.height / this.A))), this.F();
  }
  get rows() {
    return this.h;
  }
  set rows(t) {
    this.M = !0, this.h = Math.max(1, Math.floor(t)), typeof this.i != "number" && (this.i = Math.max(1, Math.floor(this.v.width / this.m))), this.F();
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
  O(t, e) {
    const s = this.v.getBoundingClientRect(), i = t - s.left, n = e - s.top, h = this.v.width / s.width, o = n * (this.v.height / s.height), c = i * h - this.l, a = o - this._, u = Math.floor(c / this.m), l = Math.floor(a / this.A);
    return u >= 0 && u < this.i && l >= 0 && l < this.h ? { x: u - Math.floor((this.i - 1) / 2), y: l - Math.floor(this.h / 2) } : { x: -1 / 0, y: -1 / 0 };
  }
  L() {
    this.C.clear();
  }
}
const D = { readShort: (r, t) => (D.t.uint16[0] = r[t] << 8 | r[t + 1], D.t.int16[0]), readUshort: (r, t) => r[t] << 8 | r[t + 1], readUshorts(r, t, e) {
  const s = [];
  for (let i = 0; i < e; i++) s.push(D.readUshort(r, t + 2 * i));
  return s;
}, readUint(r, t) {
  const e = D.t.uint8;
  return e[3] = r[t], e[2] = r[t + 1], e[1] = r[t + 2], e[0] = r[t + 3], D.t.uint32[0];
}, readASCII(r, t, e) {
  let s = "";
  for (let i = 0; i < e; i++) s += String.fromCharCode(r[t + i]);
  return s;
}, t: (() => {
  const r = new ArrayBuffer(8);
  return { uint8: new Uint8Array(r), int16: new Int16Array(r), uint16: new Uint16Array(r), uint32: new Uint32Array(r) };
})() };
function bt(r) {
  return r + 3 & -4;
}
function xt(r, t, e) {
  r[t] = e >>> 8 & 255, r[t + 1] = 255 & e;
}
function W(r, t, e) {
  r[t] = e >>> 24 & 255, r[t + 1] = e >>> 16 & 255, r[t + 2] = e >>> 8 & 255, r[t + 3] = 255 & e;
}
function De(r, t, e) {
  for (let s = 0; s < e.length; s++) r[t + s] = 255 & e.charCodeAt(s);
}
function Ot(r, t, e) {
  const s = t + e;
  let i = 0;
  const n = D.t;
  for (let h = t; h < s; h += 4) n.uint8[3] = r[h] || 0, n.uint8[2] = r[h + 1] || 0, n.uint8[1] = r[h + 2] || 0, n.uint8[0] = r[h + 3] || 0, i = i + (n.uint32[0] >>> 0) >>> 0;
  return i >>> 0;
}
class Fe {
  b;
  p = 0;
  bitbuf = 0;
  bitcnt = 0;
  constructor(t) {
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
function it(r) {
  let t = 32, e = 0;
  for (const o of r) o && (o < t && (t = o), o > e && (e = o));
  if (e === 0) return { min: 0, max: 0, table: /* @__PURE__ */ new Map() };
  const s = new Uint32Array(e + 1);
  for (const o of r) o && s[o]++;
  const i = new Uint32Array(e + 1);
  let n = 0;
  s[0] = 0;
  for (let o = 1; o <= e; o++) n = n + s[o - 1] << 1, i[o] = n;
  const h = /* @__PURE__ */ new Map();
  for (let o = 0; o < r.length; o++) {
    const c = r[o];
    if (!c) continue;
    const a = i[c]++;
    let u = h.get(c);
    u || (u = [], h.set(c, u)), u[qe(a, c)] = o;
  }
  return { min: t, max: e, table: h };
}
function Nt(r, t) {
  let e = 0;
  for (let s = 1; s <= t.max; s++) {
    e |= r.readBits(1) << s - 1;
    const i = t.table.get(s);
    if (i && e < i.length) {
      const n = i[e];
      if (n !== void 0) return n;
    }
  }
  throw Error("Invalid Huffman code");
}
function qe(r, t) {
  let e = 0;
  for (let s = 0; s < t; s++) e = e << 1 | 1 & r, r >>>= 1;
  return e >>> 0;
}
function Ue(r) {
  if (r.length < 2) throw Error("ZLIB data too short");
  const t = r[0], e = r[1];
  if ((15 & t) != 8) throw Error("Unsupported ZLIB compression method");
  if (((t << 8) + e) % 31 != 0) throw Error("Bad ZLIB header check");
  let s = 2;
  32 & e && (s += 4);
  const i = [];
  return (function(n, h) {
    const o = [3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258], c = [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0], a = [1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577], u = [0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13];
    let l = 0;
    for (; !l; ) {
      l = n.readBits(1);
      const f = n.readBits(2);
      if (f === 0) {
        n.alignToByte();
        const y = n.readBits(16);
        if ((65535 & (65535 ^ y)) !== n.readBits(16)) throw Error("DEFLATE uncompressed LEN/NLEN mismatch");
        for (let m = 0; m < y; m++) h.push(n.readBits(8));
      } else {
        if (f !== 1 && f !== 2) throw Error("Unsupported DEFLATE type");
        {
          let y, m;
          if (f === 1) {
            const p = Array(288).fill(0);
            for (let g = 0; g <= 143; g++) p[g] = 8;
            for (let g = 144; g <= 255; g++) p[g] = 9;
            for (let g = 256; g <= 279; g++) p[g] = 7;
            for (let g = 280; g <= 287; g++) p[g] = 8;
            y = it(p), m = it(Array(32).fill(5));
          } else {
            const p = n.readBits(5) + 257, g = n.readBits(5) + 1, v = n.readBits(4) + 4, w = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15], A = Array(19).fill(0);
            for (let C = 0; C < v; C++) A[w[C]] = n.readBits(3);
            const T = it(A), b = [];
            for (; b.length < p + g; ) {
              const C = Nt(n, T);
              if (C <= 15) b.push(C);
              else if (C === 16) {
                const U = n.readBits(2) + 3, q = b[b.length - 1] || 0;
                for (let B = 0; B < U; B++) b.push(q);
              } else if (C === 17) {
                const U = n.readBits(3) + 3;
                for (let q = 0; q < U; q++) b.push(0);
              } else {
                if (C !== 18) throw Error("Invalid code length symbol");
                {
                  const U = n.readBits(7) + 11;
                  for (let q = 0; q < U; q++) b.push(0);
                }
              }
            }
            const S = b.slice(0, p), R = b.slice(p, p + g);
            y = it(S), m = it(R);
          }
          for (; ; ) {
            const p = Nt(n, y);
            if (p < 256) h.push(p);
            else {
              if (p === 256) break;
              if (p > 256 && p < 286) {
                const g = p - 257;
                let v = o[g];
                const w = c[g];
                w && (v += n.readBits(w));
                const A = Nt(n, m);
                if (A >= 30) throw Error("Invalid distance symbol");
                let T = a[A];
                const b = u[A];
                b && (T += n.readBits(b));
                const S = h.length - T;
                if (S < 0) throw Error("Invalid distance");
                for (let R = 0; R < v; R++) h.push(h[S + R] || 0);
              } else if (p === 286 || p === 287) throw Error("Reserved length symbol");
            }
          }
        }
      }
    }
  })(new Fe(r.subarray(s)), i), new Uint8Array(i);
}
function Oe(r) {
  const t = D, e = new Uint8Array(r);
  if (t.readASCII(e, 0, 4) !== "wOFF") throw Error("Invalid WOFF signature");
  const s = t.readUint(e, 4), i = t.readUshort(e, 12), n = t.readUint(e, 16), h = [];
  let o = 44;
  for (let v = 0; v < i; v++) {
    const w = t.readASCII(e, o, 4), A = t.readUint(e, o + 4), T = t.readUint(e, o + 8), b = t.readUint(e, o + 12), S = t.readUint(e, o + 16);
    h.push({ tag: w, offset: A, compLength: T, origLength: b, checksum: S }), o += 20;
  }
  for (const v of h) {
    const w = new Uint8Array(e.buffer, v.offset, v.compLength);
    if (v.compLength === v.origLength) v.data = new Uint8Array(w);
    else if (v.data = Ue(w), v.data.length !== v.origLength) if (v.data.length < v.origLength) {
      const A = new Uint8Array(v.origLength);
      A.set(v.data), v.data = A;
    } else v.data = v.data.subarray(0, v.origLength);
  }
  const c = i;
  let a = 1, u = 0;
  for (; a << 1 <= c; ) a <<= 1, u++;
  const l = 16 * a, f = 16 * c - l;
  let y = 12 + 16 * c;
  const m = {};
  for (const v of h) m[v.tag] = y, y = bt(y + v.data.length);
  const p = new Uint8Array(Math.max(n || 0, y));
  W(p, 0, s), xt(p, 4, c), xt(p, 6, l), xt(p, 8, u), xt(p, 10, f);
  let g = 12;
  for (const v of h) {
    De(p, g, v.tag), g += 4;
    const w = v.data;
    if (v.tag === "head" && w.length >= 12) {
      const A = new Uint8Array(w);
      W(A, 8, 0), W(p, g, Ot(A, 0, bt(A.length))), g += 4;
    } else
      W(p, g, Ot(w, 0, bt(w.length))), g += 4;
    W(p, g, m[v.tag]), g += 4, W(p, g, v.data.length), g += 4;
  }
  for (const v of h) {
    const w = m[v.tag];
    p.set(v.data, w);
  }
  if (h.find((v) => v.tag === "head")) {
    const v = m.head, w = (function(A, T) {
      const b = T + 8, S = [A[b], A[b + 1], A[b + 2], A[b + 3]];
      W(A, b, 0);
      const R = 2981146554 - (Ot(A, 0, bt(A.length)) >>> 0) >>> 0;
      return A[b] = S[0], A[b + 1] = S[1], A[b + 2] = S[2], A[b + 3] = S[3], R >>> 0;
    })(p, v);
    W(p, v + 8, w);
  }
  return p.buffer;
}
const Ne = { parseTab(r, t, e) {
  const s = { tables: [], ids: {}, off: t };
  r = new Uint8Array(r.buffer, t, e), t = 0;
  const i = D, n = i.readUshort;
  n(r, t);
  const h = n(r, t += 2);
  t += 2;
  const o = [];
  for (let c = 0; c < h; c++) {
    const a = n(r, t), u = n(r, t += 2);
    t += 2;
    const l = i.readUint(r, t);
    t += 4;
    const f = `p${a}e${u}`;
    let y = o.indexOf(l);
    if (y === -1) {
      let m;
      y = s.tables.length, o.push(l);
      const p = n(r, l);
      m = p === 4 ? this.parse4(r, l) : p === 12 ? this.parse12(r, l) : { format: p }, s.tables.push(m);
    }
    s.ids[f] = y;
  }
  return s;
}, parse4(r, t) {
  const e = D, s = e.readUshort, i = e.readUshorts, n = t, h = s(r, t += 2);
  s(r, t += 2);
  const o = s(r, t += 2) >>> 1, c = { format: 4, searchRange: s(r, t += 2), entrySelector: 0, rangeShift: 0, endCount: [], startCount: [], idDelta: [], idRangeOffset: [], glyphIdArray: [] };
  t += 2, c.entrySelector = s(r, t), t += 2, c.rangeShift = s(r, t), t += 2, c.endCount = i(r, t, o), t += 2 * o, t += 2, c.startCount = i(r, t, o), t += 2 * o;
  for (let a = 0; a < o; a++) c.idDelta.push(e.readShort(r, t)), t += 2;
  return c.idRangeOffset = i(r, t, o), t += 2 * o, c.glyphIdArray = i(r, t, n + h - t >> 1), c;
}, parse12(r, t) {
  const e = D.readUint;
  e(r, t += 4), e(r, t += 4);
  const s = e(r, t += 4);
  t += 4;
  const i = new Uint32Array(3 * s);
  for (let n = 0; n < 3 * s; n += 3) i[n] = e(r, t + (n << 2)), i[n + 1] = e(r, t + (n << 2) + 4), i[n + 2] = e(r, t + (n << 2) + 8);
  return { format: 12, groups: i };
} }, Be = { parseTab(r, t, e) {
  const s = D;
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
} }, ze = { parseTab(r, t, e) {
  const s = D;
  t += 4;
  const i = s.readShort, n = s.readUshort;
  return { ascender: i(r, t), descender: i(r, t + 2), lineGap: i(r, t + 4), advanceWidthMax: n(r, t + 6), minLeftSideBearing: i(r, t + 8), minRightSideBearing: i(r, t + 10), xMaxExtent: i(r, t + 12), caretSlopeRise: i(r, t + 14), caretSlopeRun: i(r, t + 16), caretOffset: i(r, t + 18), res0: i(r, t + 20), res1: i(r, t + 22), res2: i(r, t + 24), res3: i(r, t + 26), metricDataFormat: i(r, t + 28), numberOfHMetrics: n(r, t + 30) };
} }, Ie = { parseTab(r, t, e, s) {
  const i = D, n = [], h = [], o = s.maxp.numGlyphs, c = s.hhea.numberOfHMetrics;
  let a = 0, u = 0, l = 0;
  for (; l < c; ) a = i.readUshort(r, t + (l << 2)), u = i.readShort(r, t + (l << 2) + 2), n.push(a), h.push(u), l++;
  for (; l < o; ) n.push(a), h.push(u), l++;
  return { aWidth: n, lsBearing: h };
} }, $t = { cmap: Ne, head: Be, hhea: ze, maxp: { parseTab(r, t, e) {
  const s = D;
  return s.readUint(r, t), t += 4, { numGlyphs: s.readUshort(r, t) };
} }, hmtx: Ie, loca: { parseTab(r, t, e, s) {
  const i = D, n = [], h = s.head.indexToLocFormat, o = s.maxp.numGlyphs + 1;
  if (h === 0) for (let c = 0; c < o; c++) n.push(i.readUshort(r, t + (c << 1)) << 1);
  else if (h === 1) for (let c = 0; c < o; c++) n.push(i.readUint(r, t + (c << 2)));
  return n;
} }, glyf: { parseTab(r, t, e, s) {
  const i = [], n = s.maxp.numGlyphs;
  for (let h = 0; h < n; h++) i.push(null);
  return i;
}, D(r, t) {
  const e = D, s = r.R, i = r.loca;
  if (i[t] === i[t + 1]) return null;
  const n = Lt.findTable(s, "glyf", r.k);
  if (!n) return null;
  let h = n[0] + i[t];
  const o = {};
  if (o.noc = e.readShort(s, h), h += 2, o.xMin = e.readShort(s, h), h += 2, o.yMin = e.readShort(s, h), h += 2, o.xMax = e.readShort(s, h), h += 2, o.yMax = e.readShort(s, h), h += 2, o.xMin >= o.xMax || o.yMin >= o.yMax) return null;
  if (o.noc > 0) {
    o.endPts = [];
    for (let f = 0; f < o.noc; f++) o.endPts.push(e.readUshort(s, h)), h += 2;
    const c = e.readUshort(s, h);
    if (h += 2, s.length - h < c) return null;
    h += c;
    const a = o.endPts[o.noc - 1] + 1;
    o.flags = [];
    for (let f = 0; f < a; f++) {
      const y = s[h];
      if (h++, o.flags.push(y), 8 & y) {
        const m = s[h];
        h++;
        for (let p = 0; p < m; p++) o.flags.push(y), f++;
      }
    }
    o.xs = [];
    for (let f = 0; f < a; f++) {
      const y = o.flags[f], m = !!(16 & y);
      2 & y ? (o.xs.push(m ? s[h] : -s[h]), h++) : m ? o.xs.push(0) : (o.xs.push(e.readShort(s, h)), h += 2);
    }
    o.ys = [];
    for (let f = 0; f < a; f++) {
      const y = o.flags[f], m = !!(32 & y);
      4 & y ? (o.ys.push(m ? s[h] : -s[h]), h++) : m ? o.ys.push(0) : (o.ys.push(e.readShort(s, h)), h += 2);
    }
    let u = 0, l = 0;
    for (let f = 0; f < a; f++) u += o.xs[f], l += o.ys[f], o.xs[f] = u, o.ys[f] = l;
  } else o.parts = [], o.endPts = [], o.flags = [], o.xs = [], o.ys = [];
  return o;
} } }, Lt = { parse(r) {
  const t = new Uint8Array(r);
  D.readASCII(t, 0, 4) === "wOFF" && (r = Oe(r));
  const e = new Uint8Array(r), s = $t, i = {}, n = { R: e, H: 0, k: 0 };
  for (const h in s) {
    const o = h, c = Lt.findTable(e, o, 0);
    if (c) {
      const [a, u] = c;
      let l = i[a];
      l == null && (l = s[o].parseTab(e, a, u, n), i[a] = l), Object.assign(n, { [o]: l });
    }
  }
  return [n];
}, findTable(r, t, e) {
  const s = D, i = s.readUshort(r, e + 4);
  let n = e + 12;
  for (let h = 0; h < i; h++) {
    const o = s.readASCII(r, n, 4);
    s.readUint(r, n + 4);
    const c = s.readUint(r, n + 8), a = s.readUint(r, n + 12);
    if (o === t) return [c, a];
    n += 16;
  }
  return null;
}, T: $t, B: D };
class ut {
  I = /* @__PURE__ */ new Set();
  j(t) {
    this.I.add(t);
  }
  dispose() {
    for (const t of this.I) t();
    this.I.clear();
  }
}
class M extends Error {
  constructor(t, e, s) {
    super(M.N(t, e, s)), this.name = "TextmodeError";
  }
  static N(t, e, s = {}) {
    const { includeContext: i = !0, includeFooterArrows: n = !0 } = s;
    return `${t}${i && e && Object.keys(e).length > 0 ? `

📋 Context:` + Object.entries(e).map(([h, o]) => `
  - ${h}: ${M.G(o)}`).join("") : ""}${n ? `

${"↓".repeat(24)}
` : `

`}`;
  }
  static G(t) {
    if (t === null) return "null";
    if (t === void 0) return "undefined";
    if (typeof t == "string") return `"${t}"`;
    if (typeof t == "number" || typeof t == "boolean") return t + "";
    if (Array.isArray(t)) return t.length === 0 ? "[]" : t.length <= 5 ? `[${t.map((e) => M.G(e)).join(", ")}]` : `[${t.slice(0, 3).map((e) => M.G(e)).join(", ")}, ... +${t.length - 3} more]`;
    if (typeof t == "object") {
      const e = Object.keys(t);
      return e.length === 0 ? "{}" : e.length <= 3 ? `{ ${e.map((s) => `${s}: ${M.G(t[s])}`).join(", ")} }` : `{ ${e.slice(0, 2).map((s) => `${s}: ${M.G(t[s])}`).join(", ")}, ... +${e.length - 2} more }`;
    }
    return t + "";
  }
}
function pe(r, t, e) {
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
class ke {
  X(t) {
    const e = [];
    return t.cmap?.tables ? (t.cmap.tables.forEach((s) => {
      if (s.format === 4) {
        const i = this.Y(s);
        e.push(...i);
      } else if (s.format === 12) {
        const i = this.V(s);
        e.push(...i);
      }
    }), [...new Set(e)]) : [];
  }
  Y(t) {
    const e = [];
    if (!(t.startCount && t.endCount && t.idRangeOffset && t.idDelta)) return e;
    for (let s = 0; s < t.startCount.length; s++) {
      const i = t.startCount[s], n = t.endCount[s];
      if (i !== 65535 || n !== 65535) for (let h = i; h <= n; h++)
        pe(t, h, s) > 0 && this.K(e, h);
    }
    return e;
  }
  V(t) {
    const e = [];
    if (!t.groups) return e;
    for (let s = 0; s < t.groups.length; s += 3) {
      const i = t.groups[s], n = t.groups[s + 1], h = t.groups[s + 2];
      for (let o = i; o <= n; o++)
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
  W;
  Z;
  q;
  J = null;
  $ = 0;
  h = 0;
  constructor(t) {
    this.q = t, this.W = document.createElement("canvas"), this.Z = this.W.getContext("2d", { alpha: !0 });
  }
  tt(t, e, s, i) {
    const n = t.length + 1;
    this.$ = Math.ceil(Math.sqrt(n)), this.h = Math.ceil(n / this.$);
    const h = e.width * this.$, o = e.height * this.h;
    this.it(h, o), this.st(t, e, this.$, s, i), this.J ? this.J.width === h && this.J.height === o || this.J.resize(h, o) : this.J = this.q.et(h, o, 1, { filter: "nearest", depth: !1 }), this.J.rt(this.W);
  }
  it(t, e) {
    this.W.width = t, this.W.height = e, this.W.style.width = t + "px", this.W.style.height = e + "px", this.Z.imageSmoothingEnabled = !1, this.W.style.imageRendering = "pixelated", this.Z.clearRect(0, 0, t, e), this.Z.textBaseline = "top", this.Z.textAlign = "left", this.Z.fillStyle = "white";
  }
  st(t, e, s, i, n) {
    const h = i / n.head.unitsPerEm;
    for (let o = 0; o < t.length; o++) {
      const c = t[o], a = o + 1, u = a % s, l = Math.floor(a / s), f = c.glyphData;
      if (!f) continue;
      const y = f.advanceWidth * h, m = u * e.width, p = l * e.height, g = m + 0.5 * e.width, v = p + 0.5 * e.height, w = Math.round(g - 0.5 * e.width), A = Math.round(v - 0.5 * i), T = w + 0.5 * (e.width - y), b = A + n.hhea.ascender * h;
      this.nt(f, T, b, h);
    }
  }
  nt(t, e, s, i) {
    if (!t || !t.xs || t.noc === 0) return;
    const { xs: n, ys: h, endPts: o, flags: c } = t;
    if (!(n && h && o && c)) return;
    this.Z.beginPath();
    let a = 0;
    for (let u = 0; u < o.length; u++) {
      const l = o[u];
      if (!(l < a)) {
        if (l >= a) {
          const f = e + n[a] * i, y = s - h[a] * i;
          this.Z.moveTo(f, y);
          let m = a + 1;
          for (; m <= l; )
            if (1 & c[m]) {
              const p = e + n[m] * i, g = s - h[m] * i;
              this.Z.lineTo(p, g), m++;
            } else {
              const p = e + n[m] * i, g = s - h[m] * i;
              if (m + 1 > l) {
                const w = e + n[a] * i, A = s - h[a] * i;
                if (1 & c[a]) this.Z.quadraticCurveTo(p, g, w, A);
                else {
                  const T = (p + w) / 2, b = (g + A) / 2;
                  this.Z.quadraticCurveTo(p, g, T, b);
                }
                break;
              }
              const v = m + 1;
              if (1 & c[v]) {
                const w = e + n[v] * i, A = s - h[v] * i;
                this.Z.quadraticCurveTo(p, g, w, A), m = v + 1;
              } else {
                const w = (p + (e + n[v] * i)) / 2, A = (g + (s - h[v] * i)) / 2;
                this.Z.quadraticCurveTo(p, g, w, A), m = v;
              }
            }
          this.Z.closePath();
        }
        a = l + 1;
      }
    }
    this.Z.fill();
  }
  L() {
    this.J?.dispose(), this.J = null;
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
class ge {
  ht(t, e) {
    const s = t.cmap;
    if (!s || !s.tables) return 0;
    let i = 0;
    for (const n of s.tables) if (n.format === 4 ? i = this.ot(e, n) : n.format === 12 && (i = this.ct(e, n)), i > 0) break;
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
    const s = e / t.head.unitsPerEm, i = t.hhea.ascender * s, n = t.hhea.descender * s, h = t.hhea.lineGap * s;
    return { ascender: i, descender: n, lineGap: h, lineHeight: i - n + h, unitsPerEm: t.head.unitsPerEm, scale: s };
  }
  ot(t, e) {
    const s = e.endCount.length;
    let i = -1;
    for (let n = 0; n < s; n++) if (t <= e.endCount[n]) {
      i = n;
      break;
    }
    return i === -1 || t < e.startCount[i] ? 0 : pe(e, t, i);
  }
  ct(t, e) {
    const s = e.groups.length / 3;
    for (let i = 0; i < s; i++) {
      const n = e.groups[3 * i], h = e.groups[3 * i + 1], o = e.groups[3 * i + 2];
      if (t >= n && t <= h) return o + (t - n);
    }
    return 0;
  }
}
class Xe {
  dt;
  constructor() {
    this.dt = new ge();
  }
  _t(t, e, s) {
    let i = 0;
    const n = this.dt.ft(s, e), h = n.lineHeight;
    for (const o of t) {
      const c = this.dt.ut(s, o);
      if (c === 0) continue;
      const a = this.dt.lt(s, c) * n.scale;
      i = Math.max(i, a);
    }
    return { width: Math.ceil(i), height: Math.ceil(h) };
  }
}
let Q;
function It(r) {
  if (r.length === 0) return [];
  const t = Q !== void 0 ? Q : typeof Intl < "u" && "Segmenter" in Intl ? (Q = new Intl.Segmenter(void 0, { granularity: "grapheme" }), Q) : (Q = null, Q);
  return t ? Array.from(t.segment(r), (e) => e.segment) : Array.from(r);
}
function kt(r) {
  return Array.from(r, (t) => t.codePointAt(0)).filter((t) => t !== void 0);
}
class Ze {
  vt;
  constructor() {
    this.vt = new ge();
  }
  gt(t, e) {
    const s = [], i = /* @__PURE__ */ new Map();
    return t.forEach((n, h) => {
      const o = { character: n, unicode: kt(n)[0] ?? 0, color: this.yt(h + 1), glyphData: this.wt(e, n) };
      s.push(o), i.set(n, o);
    }), { array: s, map: i };
  }
  yt(t) {
    return [t % 256 / 255, Math.floor(t / 256) % 256 / 255, 0];
  }
  wt(t, e) {
    const s = e.codePointAt(0) || 0, i = this.vt.ht(t, s);
    if (i === 0) return null;
    const n = this.vt.lt(t, i), h = Lt.T.glyf.D(t, i);
    return h ? { ...h, advanceWidth: n } : null;
  }
}
class O extends ut {
  q;
  At;
  bt = [];
  Mt = /* @__PURE__ */ new Map();
  xt = 16;
  Ct = { width: 0, height: 0 };
  Ft;
  Pt;
  Tt;
  St;
  Et = !1;
  constructor(t, e = 16) {
    super(), this.q = t, this.xt = e, this.Ft = new ke(), this.Pt = new We(t), this.Tt = new Xe(), this.St = new Ze();
  }
  Ot(t = {}) {
    if (!this.Et) throw new M("Cannot fork an uninitialized TextmodeFont.");
    const e = t.fontSize ?? this.xt, s = new O(this.q, e);
    return s.At = this.At, s.bt = this.bt, s.Mt = new Map(this.Mt), s.Et = !0, s.Lt(), s;
  }
  async Dt(t) {
    if (this.Et) return;
    const e = t || "data:font/woff;base64,d09GRgABAAAAABbwAAoAAAAAfywAAQABAAAAAAAAAAAAAAAAAAAAAAAAAABjbWFwAAAA9AAAAbsAAAkgIO8lSWdseWYAAAKwAAAOfgAAaLS4ctN0aGVhZAAAETAAAAAsAAAAOCi8/PVoaGVhAAARXAAAABkAAAAkCwEFAmhtdHgAABF4AAAAhQAABAQEAIOAbG9jYQAAEgAAAAKUAAAECAAy54BtYXhwAAAUlAAAABgAAAAgASIAgm5hbWUAABSsAAAB5wAAA6RWz85KT1MvMgAAFpQAAABFAAAAYM+QEyRwb3N0AAAW3AAAABQAAAAgAGkANHja7dRPSFRRFMfx38wdXblw4cJC7M0bz60gWlULGUFctWgR0UIQQkmDyn27kpAQaaEO2jhWJuafiQFtcDJtSqGhiFZtot5x3jzEVQQhlRJcOb0khiRc1+J94R64uw8cOADCAJT/avwZAiIpRCK3/P999KAS9biOSUxhBhlksYjnWMFrvME7vMca1vEF37ANAwkNqYRKqkk1rdLqscqpVVVQryzbils3rJnocHTWPmgfso/ap+0OuysWjlXHogQKUxVVUw3VUh010DE6QXHqph7qpT66TQmaoAxlaZnyVKC39FHHdbNu0e36or6kr4r4TgsTu75HmEcOy76vUPaVsIFNbOHHX74F3/fyD9+A7ztg1//2de76rH18Z8u+AXqwx/dBN5Z9XfqKiKzLqqzIC8nLkixKThZkXuZkVh7KuNyTuzImKRmVO1KxU7ETMtvmu/lqPptPxjOuKXo3vcveYQ+l2lKlO+Im3H632z3vnis+KaaLKc7zM87yHGc4zdM8zkke5H6+xp3cwRe4jVv5DLdwE5/ik3ycj3Cdk3eWnKfOmDPqJJ3hX9sOCvpPC65QcIWCgv5pPwGY9ak7AHja3V07ryQ5FT62axjQaDWsVmiCFQJpA4QINiAgICDYgICAgICAgICAgICAgIAA//AuF9Xlsn2etqv67iIY6apv3+6yj31e33nYA95FiD4uAAHeA7jyLzoA2Paf/Lp/Dun5W8x/Be/AxyCfO79fnj+e25/ZZzlewcM+3wIhwpfwE/Sc9e8YDyLU1ycF5XUD+to+L98O/An8VKQj0lnOtYdM776OJ71fTVC8//N1rLKDGsXl863OjSl5/iyIUu0HjJ+d+uO3rX3rXd33d/DjfR0/h6/n1iK5kWf36Hf2AxpVa6zU7ZLTnt3Q3wN7+tK6MVcBjUP/3vj56diHuT3YxVbKSvl9FdJHeFE4jfmJn2DSSOS9fuJ27SH7umuoL3oLWGOLxh3f2b8bnn/5Ql8n5SEYFD33q/0lKXxwjQfDOZtGgyEz+W8X5txl2zVb9MXO2S8HfD3ncbHousP6WPV2i/R7C+c06HK5ye/lfdl3Bj5Q2qitaLYhgLQWZY+fr/65A9Ly1r10jI783HOffJWZJ6ee8uuB0nmMXeSqWvRz5Dx/tiWf7H0OF+1DuK7vhy4ffP8An/doofqbQNXTqmlNT1c0v4/Eqpy29eBMLHty0PKZoCMW6VqRlDXNwvbD4RW2MYfyjNdXV3LaJuEdKgXcHvX2nHiz27RxHmC9w/qn0AbS+mJbSeX8pO1zlbbogPK7zJxAs3iFtrV8W/LHsHVZvxJ6Rlt7gum1nvjpnHNO4gFJqaoBWOKFVwKqAangorb2j5KKvG5N31O1ownZdhcZH7FuT9nznoxRv4ylrbfvzA9D88GO8uGDtgN0/1O09ntFlv3YhbIf/ml3/dPGqvi6rCMw6jNd53PM07BnK2eCJXmnzxrruI8ObOuxmZ/dxbd5nS77U7I/xaMdLm5/DXzuLLcwXlOLIVQ0an722pou6raGnpp/QYiwR0V5nwDL0Gk/f2TSUalIGOkSvfNAcVNCesV9a2q675FtsVAk4c5GPEfZT27XVqT9PmpxXtVn0577KO3MGrkXs+xKkHZk6EMUS440uO01t+Ark8yGYYjtsleqoPQksLuF0kOd/7TtbZ3XvNalNRNLqK+90fEDTAfy1FWWOBcT9fkTmrExe+viDNccYF+JqHeIbyBtlYxhStbmSc8DSX9/rICoXkkGSMfEJR7QsYAjNlhgn6iNS7T0AtakNnvaJ+W1TeQdeIxHaHtXaMtU+GP3CL5v+2RqHfc5JC6k9DJ6HhFaHHfu9Lc1Z5HlB5JWNOc8NupiUSlpa/7NIx0W0Ra10YcOVWnDfqhodmgI1CM5nrJS1DYKlMmyeAmoZaLrQnmNSRxAV7qZ0u0sr2Q8WbzUrRivE200nZ+x371Yj+idQH+bsOAFD16woZXuheBJI85UYyA+Ht17bJsTKLHHG+tuQpJX/AGX4eu2lq+vh8gQPgaLUpk1h7fcb1SJ4LEnGb+rdUHRHw96riVV36L5EgdqHNByqCTy82hnkrSSk3k5KTNWnJZ/buTlOvQngiceAkd4OHPz0K+tdOmGUYwJht2kcuBEntSRPOmZfyc40tFqD40IQeb2goGZvKIVzW4G5DMcQ4qOY3zVRzpmo1sMg+U1VemumtLofjFeCcxqJIUnM2vJuQeCHiOOwx4ss7pF6u+PtXxmZApbjCti22JtA+hVxUw7z6Xs2sSzMkeklSLPfwalYkjjt/0bHye4gKkXeaig5MpILVRiAd1vCrtP5Aj5uaN2PF1zxrE7koOgaY2PPL9FkccCKlprUZGr+zr0tw56iCvwGBTs+MFFxVbWeTaCQTj2WCBM1NnoWNxOBpBZU8f00hPsFDr+15wPevNsJG4IN+OGwKyWzKnW8S/GDUHZOd+44SsvbDvCuhYUTQSaQSFeWtoR4Xc833VimVzRvgm58QwZFQTthQ+awgQTeuVI7gLrF638Yixi+ot4RVZ5niDPFxBediyXNj++jUWDgkU3Zc96fDKwv4iiylyA4nalMkLX9C1hf24DNNkZyNDkflOPF4BqwdYbv1vLG9VX03W96PVKiCq+A01i5utY2d9YfSMP0qvQ7eFQUHSKvNfpCl21nqNafqf1UQksqfVe1PEPPNiJpY81iZoP119ZTUHojdpseMYqec5zr/2Jgo695rmycZWzSgOpXzMpbFrHu1Zmq/xA8pX3cgEQZU1/YzaexuQbXIoxF9THdaEzz9VaE5fgNVIPR/sIS8fQyipam9JXqHdOtPEIRllqzP7Ewh9063Z2IYH+GiLNUPFXJIcEM4RYc7bEkjwQL4/1fx+aHL8/62Of5vo3y+p92QX2fh18zrNFcPX9sfZAdBDZu8vxCM4clX31Qr9RrLPkDDDau8v8LZRar2N8lSOj1NGsLJeBZam1TIuwpzwepL3CJAvyANsPnj3BAzsD3a5X6ydEaZUSs50b7g2JrYcyG2lRL+xl+jD+Gfod33w82P0FTuYREa3c70CRS82XCtxIueJHXuIMB6tMt+x7lf7m5U4tyK9L3smuLrxqDxYPI30rYzk2h2NzgPXqAvPrQdqUxvdWF2zVwDrHCq0RoI0Hcrzcn9D8BMxYEMszZBzooqa/jsTxSeTthXTm9FC2n+pYEh8uVqyL9436quMD6pnK7njZM6msy4uYsunVquBSi4clVn8gblYc96TFyF04ll2oqCB300cDIbPxrZoqXZ1DHWvNh2irrNxstSaZYa2VB333tOr9mRcx7ETmXKmSFz6GkidstKjZFE8qIX26eG8KoS/b9uij9GFOiwFIVj5NyErT8rZGstdmD4lc4/xaNevd1uwOPCLX7Ems2TTc81MrUVmzyqdOr1v1PCPat9jmQfUYJEEbzNCSse4DevSYCIXal+bDCC3I2+EeTFKd7ltnFNN0sGLIfRcGfSWKD0BPANWTQIqcNtsaAON/1A/BeywPGhybs2ZEA1sH9FbgDMpTQx5L5k4fN/RR8lBHvif2ftB7oa8isVdrdWDxp/Hp6N8MsdUgqdS0M12EZrhC7TpJZZLZOZelRdeDUyffq3s6xPhztK4Xd9h6f4pIieNu4lI/jEN1XEMjbafK6lry/jkOYedyVMyp2vaHGlM8zBjCkdi28NdrNldgLa/a0orYtN6OwoMh7vPAsxb9eNTDrOdJBWuXsb6En8Evb5yTrJw1Y1XTHnmCFNtPkhHnuN+8QwHGi3JUJf4zeaTJsBpFdnik5V4fZq510ifEHMf7M55f2fteR1DJ73gzf4vyO42Or3Z5mZcWdlY6wb3sRvd0olKfGeaCWm5yGEtDwzLH6yPS95wmcVb2BBrYzig5tGb7Bvb5fkyfvW2nRhlxF3cyz8qGOF//eVLXq7P4oQTop9UASTKPr91h1zu5wu753DbqtXUO8pOT6wzdnQfWn2X3Csr5ktxP4FUmlBHHPThBO0mQ6wTFVxbM5mPCeXWP7ha4YDf8BdvAeaGd/XntlgHlW2eMFAR2CBPYAQzPrGeVy1ieYCOQdtpXGZyss4F2rkr5W8tJh06NTd/HGi+1vbiPN6JTeSfP5k0ihAhRQwgad9wQ1dhoKAntU87DfZy/K8SuEsPg82VQRU5xUGU+ZVrp8SMYtOHiwFC+Z1jLG2dqRuhAw01cZ2qeXBk/ROjaAS1TIuKHVp+Fi5YMrHqqahlY3YbJ0E/N2uUTq/0Cvt717Vfwa/gNfAO/hd/B7+EP8Ef4E/wZ/gJ/hb/B3+Ef8E/4F/z7nla+5T+Afp1wHdQRH/F/+/lF6VrSbuP4v/18VHMVmm7q6TX/Czha0mxJrf+YyNyOfRcYeKSap3+b8UufB8GnJSdec6Iu+toF6nHkaeZxvJ5h4PVgj3ILMz5teArdxnr8/PPoCXqiuvR91zoh2pvS8b0SqUD1FLPubHPaK9Q5lU+GzwI3PgfCOsB9NORgqm5OqfVxLMd1L9+A/s2s+0/0a93MTd3NNRHapruGQLnhZTSzpBMuYFNaz7N5RffPo/MnV2zac3wfRX6Vng0As1cTmE5M38U0eS+H0rvZxXtg6460jlQTZ3Snxw+pO9TKz+mOB5vffTs6umGj+UjMb3/QKfndvlP47UsVAO9Drzo11h+T/rF09Po0st98jHsKh31Ruj2UnbYWLuEd/pM9wOwpZ+KqccfWNZsc4F6c3jtf2ou7Ca6akqXRPThzsadua+/4hq7vgmn6uqux6bXw6AjnLMJbXMM5Ixwi8mR2rc3AOfg2nrs4zZlnDFaChbCtk/bwilwMfBxc0iMYy0MX40x2o/ft9D2Znn9Kl+3MO90HUb747jnzjpyCKVeTuij6DllsctyiUzXN0dgE9We1yK54WBffFqtew9TXpbYfy7dILWH/SXxmqeg4zlvRsZfIbuFnic0SHfRtfj4vsaVq532jl/QpYBykzpe/jec7n1uOmhuETi2xzM5vfy01xQC0vkp6PiKpDd07x6qcUc719K0A1YZjpvLivftqNpzxV/tDtXPTWFrbaowzXj+czsG+nmMt/bQspzj7fnvxeeuG4O/s/Xe412VW3+5VuPT+EV97/r++14Gc3ZvQRHrXMz91IrWHZ4FnK7WOVGjJPfAO3R0BczdLKuevQd5LPVsXd/X8PK6Ll2jK0/NM7P4V1PuI51FvsEMV+KhV4T2+22IQF85a0FlLWXs/IHTOX1B5CGCeEDh6V2ZiTK+eee/dnNjOa2xXz2zndd7sq+XYEZ/Gx/exoK5PoOceWNdnef9W9KCT9EYXqkrPxuhC9GA7faMXpHef1smLTDe1qaDY1N4ozLI4fqsHlwpf+3Cu9F1E/Z4AajG3V8430/6bCdq8QQs9b4OqJyQa1+6BACWaTPI8zrROa//7QGJ19U4tHeTTtePNqu3PnVhXJFSjzZFz4eo3Ndqidi/O6J5Z7X+VsS3cYki51T35Iv+merFeuGe69cbJM3Jq1Fn4kUA5rze4o9CRs22iy5jMsYLMS8g5/wOjbDW/AAB42mNgZGBgAOIzT9tXxvPbfGVgYGEAgZokCXVkmgUizsHABFLNwAAACJYG1HjaY2BkYGBhAAEIyc7AwMiAAhgZAQHPABQAAAB42r1TwRaAIAgD88P59PRA0hxUlw578mBDQOwi0i+oDUzb7nC/xyKH8SuwHH/jSx83jnE745c1RO44G9E1WTE14AQtYvKO6PN6BXRW5EONgCazSS4VXiere+sp7F7cQeSp7Pe2YkaxN7fVFhg/8z/1hfnfaBXnZ8k7wNzp/y13+wRWwErCAAAAeNpl0ylUVVEUBuCtoiKgoiIzAjIIMj9mZBZYMsmMjwcuBhEIBoPBYDAYDAaDwWA0GAwGgsFgMBgMBoPBYDAYDAaDweBnlrX+9e6955x/2oeI//664HbEgTL4HnHwZ8Sh1/AlIm0W3kUc3oN9+BFxJBva4E3E0SvwLCIdR/qniGO98Coiw3vG04hMv5n/fj9GZBUD3iz8xx9FnMiBJxEn0+E+/IrIppNt/VQzvITfEadH4HnEmUG4BV8jchaBn7NZgCMXdy7uXGfzeMjjKZ/PfBwF9hTYU/AhotC5QtpFtIt4K7oLnyOK6RXTKP4TUcJDCe5zNXAHcJTiKOWxlEZZPeAo00U5b+XyltM9vw24KvBWyFzpTOWLiCr5qu6BPdV0qx+Cni+sAc4a3mvw1nqu/RZxsRJkrEsDWeo2wAzq8dY/iGgwpwbfGvTdaA6NOmnUb5PnpiTY00S3SXfN/DU/BustdFrMq8VagqcE/YReEjK3+t4qayuPbTTbdNH2PqJdL+06a5e33VoHjg7vHdY7cXTK2ekedPHWha+b5279ddPo1ndPPuDrkbkH3yX5e/XXy3OvzH34+sy132+//P14B/AO6GuA3qBOB3U6hH/It2Haw2Y2rI9hHV6WdcSsR6eAl1GZx3Qwpr9xcxv3PqGDCbyTvE3KM+muT+lwypkpe6bNaZqfaX6v8j7D8wyNGbwzbyNmdTMrzxxfc9bndDFn5vM8zds37x4smMeCHhf5WTKHJb0uuc/L/C7bs4zrGr2kO5m0ntRZkv8VfazIkvI9RSelg5ReUrKvOrvqHq7p4Lr5retx3fcN/5Mb+Dfs25RpE/8mji0etqzfwLHteZufmzrZobfj/K5ednna0/fe/l+Pca7seNpjYGRgYGRkaGBQYAABJgY0AAAP+ACmeNp1ksFO20AQhv8NgRJaUApSy61LDxVc4uAjNxoJReoNKdCrYy8hZb1rrTcIuPMKfaY+QM899RH6AP3tDJEKqlcefzvzz/xrywD21ScoLK9N3ktW5E3hDl6hL7zG7HvhLrMfhNfxGonwBjUnwj2uz8JbzH4R3sZbPArvIMV34T28wQ+6qG6Puz5+Civyb+EOO/4Ir6GvOsJdaLUrvI53KhXeoGYs3MOu+iq8hai+CW/jo/olvIOiA+E97HeKw/xIp8M0nYQ6O/MunpvZwmbhafv01JK/MKGee6ePB8N/JCFzN6dO+8o4bee5cbnRM+NMyKyuFqHytdHR3MXSF0ZfNQOn93rVORoNm4l64ua3NMjsdYxVfZIkeTBZZC73ZeldPfBhllSLKR0KX2ZzlzyY4BO2JmNjrdeXPtjiAIfIcQTNbz/knWKCgBoZzuDhEHEOgxkWsMyFF9Xne/1Mf8Fdo5i3dY1jDOjz/ymB0eEGp63ao2J/Q5YT8pabqOnQsGn1lvuKjoHRc05Tj4x3jCUzRZu5Wp1winvGl54jruHqjI3C0fVW3qDxuWZ/pEvNPzjhylkxrETR5fQoW09HzYDPwJMm7emm8g5Fq8nIjpWHdronLV0TjJmxXJ4nuGwnWPYcAH8BoeumrAB42mNgYmFgnMDAysDCxMDEAAIQGoiNGc6A+CwMENDAwNDNwFDwGMpliHT00WNwYFBQy4aogJCMgSCSGcJTYGAAAEBYBpIAAAB42mNgZoCANAZjIMnIgAYADecAng==", s = await this.Rt(e);
    await this.kt(s);
  }
  zt(t) {
    if (t === void 0) return this.xt;
    this.xt = t, this.Lt();
  }
  Lt() {
    const t = this.bt.map((e) => e.character);
    this.Ct = this.Tt._t(t, this.xt, this.At), this.Pt.tt(this.bt, this.Ct, this.xt, this.At);
  }
  async Ht(t) {
    try {
      const e = await this.Rt(t);
      await this.kt(e);
    } catch (e) {
      throw new M("Failed to load font: " + (e instanceof Error ? e.message : "Unknown error"), { originalError: e });
    }
  }
  async Rt(t) {
    const e = await fetch(t);
    if (!e.ok) throw new M(`Failed to load font file: ${e.status} ${e.statusText}`);
    return e.arrayBuffer();
  }
  async kt(t) {
    const e = Lt.parse(t);
    if (!e || e.length === 0) throw Error("Failed to parse font file");
    this.At = e[0], await this.It();
  }
  async It() {
    const t = this.Ft.X(this.At), { array: e, map: s } = this.St.gt(t, this.At);
    this.bt = e, this.Mt = s, this.Lt(), this.Et = !0;
  }
  jt(t) {
    const e = this.Mt.get(t);
    return e ? e.color : [0, 0, 0];
  }
  Bt(t) {
    return It(t).map((e) => {
      const s = this.Mt.get(e);
      return s ? s.color : [0, 0, 0];
    });
  }
  dispose() {
    this.Pt.L(), super.dispose();
  }
  get fontFramebuffer() {
    return this.Pt.framebuffer;
  }
  get framebuffer() {
    return this.fontFramebuffer;
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
  get columns() {
    return this.textureColumns;
  }
  get textureRows() {
    return this.Pt.rows;
  }
  get rows() {
    return this.textureRows;
  }
  get maxGlyphDimensions() {
    return this.Ct;
  }
  get cellDimensions() {
    return this.Ct;
  }
  get cellWidth() {
    return this.Ct.width;
  }
  get cellHeight() {
    return this.Ct.height;
  }
  get fontSize() {
    return this.xt;
  }
  get font() {
    return this.At;
  }
}
class Ve {
  W;
  Z;
  q;
  J = null;
  $ = 0;
  h = 0;
  constructor(t) {
    this.q = t, this.W = document.createElement("canvas"), this.Z = this.W.getContext("2d", { alpha: !0 });
  }
  tt(t, e, s, i) {
    const n = t.length + 1;
    this.$ = Math.ceil(Math.sqrt(n)), this.h = Math.ceil(n / this.$);
    const h = e.width * this.$, o = e.height * this.h;
    this.it(h, o), this.Nt(t, e, s, i), this.J ? this.J.width === h && this.J.height === o || this.J.resize(h, o) : this.J = this.q.et(h, o, 1, { filter: "nearest", depth: !1 }), this.J.rt(this.W);
  }
  L() {
    this.J?.dispose(), this.J = null;
  }
  it(t, e) {
    this.W.width = t, this.W.height = e, this.W.style.width = t + "px", this.W.style.height = e + "px", this.Z.imageSmoothingEnabled = !1, this.W.style.imageRendering = "pixelated", this.Z.clearRect(0, 0, t, e);
  }
  Nt(t, e, s, i) {
    for (let n = 0; n < t.length; n++) {
      const h = n + 1, o = h % this.$, c = Math.floor(h / this.$), a = n % i.columns, u = Math.floor(n / i.columns), l = i.marginX + a * (i.cellWidth + i.spacingX), f = i.marginY + u * (i.cellHeight + i.spacingY), y = o * e.width, m = c * e.height;
      this.Z.drawImage(s, l, f, i.cellWidth, i.cellHeight, y, m, e.width, e.height);
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
class P extends ut {
  static Gt = /* @__PURE__ */ new WeakMap();
  static Xt = /* @__PURE__ */ new WeakMap();
  static Yt = 1;
  q;
  Pt = null;
  bt = [];
  Mt = /* @__PURE__ */ new Map();
  Vt = { width: 0, height: 0 };
  Qt = { width: 0, height: 0 };
  xt = 0;
  Kt;
  Wt;
  Zt;
  qt;
  Et = !1;
  constructor(t, e, s) {
    super(), this.q = t, this.xt = e === void 0 ? 0 : Math.abs(e), this.Zt = s;
  }
  Ot(t = {}) {
    if (!this.Et || !this.Wt || !this.qt) throw new M("Cannot fork an uninitialized TextmodeTileset.");
    const e = new P(this.q, t.fontSize ?? this.xt);
    return e.bt = this.qt.characters, e.Mt = new Map(this.qt.characterMap), e.Vt = { ...this.qt.nativeCellDimensions }, e.Kt = this.Kt, e.Wt = { ...this.Wt }, e.Zt = this.Zt, e.Et = !0, e.Jt(this.qt), e.$t(), e;
  }
  async Dt(t) {
    if (this.Et) return;
    if (this.Zt = t ?? this.Zt, !this.Zt) throw new M("Cannot initialize a TextmodeTileset without source options.");
    const e = this.ti(this.Zt), s = this.ii(e);
    if (s) return this.Jt(s), this.bt = s.characters, this.Mt = new Map(s.characterMap), this.Vt = { ...s.nativeCellDimensions }, this.Wt = { ...s.layout }, this.xt === 0 && (this.xt = Math.abs(this.Zt.fontSize ?? s.nativeCellDimensions.height)), this.$t(), void (this.Et = !0);
    const i = await this.si(this.Zt.source), n = this.ei(i), h = this.ri(this.Zt, n.width, n.height), o = this.ni(this.Zt, h), c = await this.hi(this.Zt, o, h.columns), a = this.oi(c), u = new Map(a.map((f) => [f.character, f])), l = new Ve(this.q);
    this.Kt = i, this.Wt = h, this.Vt = { width: h.cellWidth, height: h.cellHeight }, this.bt = a, this.Mt = u, this.xt === 0 && (this.xt = Math.abs(this.Zt.fontSize ?? h.cellHeight)), this.$t(), l.tt(this.bt, this.Vt, i, h), this.Jt({ cacheKey: e, textureAtlas: l, characters: a, characterMap: u, nativeCellDimensions: { ...this.Vt }, layout: { ...h }, referenceCount: 0 }), this.Et = !0;
  }
  zt(t) {
    if (t === void 0) return this.xt;
    this.xt = Math.abs(t), this.$t();
  }
  jt(t) {
    const e = this.Mt.get(t);
    return e ? e.color : [0, 0, 0];
  }
  Bt(t) {
    return It(t).map((e) => this.jt(e));
  }
  dispose() {
    this.ai(), super.dispose();
  }
  Jt(t) {
    this.qt !== t && (this.ai(), P.ci(this.q).set(t.cacheKey, t), t.referenceCount += 1, this.qt = t, this.Pt = t.textureAtlas);
  }
  ai() {
    const t = this.qt;
    t ? (t.referenceCount -= 1, t.referenceCount <= 0 && (t.textureAtlas.L(), P.Gt.get(this.q)?.delete(t.cacheKey)), this.qt = void 0, this.Pt = null) : this.Pt = null;
  }
  ti(t) {
    return JSON.stringify({ source: this.ui(t.source), columns: t.columns, rows: t.rows, count: t.count ?? null, margin: t.margin ?? null, marginX: t.marginX ?? null, marginY: t.marginY ?? null, spacing: t.spacing ?? null, spacingX: t.spacingX ?? null, spacingY: t.spacingY ?? null, mapping: this.li(t) });
  }
  ui(t) {
    return typeof t == "string" || t instanceof URL ? "url:" + (t + "") : "object:" + P.fi(t);
  }
  li(t) {
    return t.map === void 0 ? "auto:32" : Array.isArray(t.map) ? "rows:" + t.map.join(`
`) : t.map instanceof URL ? "url:" + (t.map + "") : this.di(t.map) ? "inline:" + t.map : "url:" + t.map;
  }
  ii(t) {
    return P.Gt.get(this.q)?.get(t);
  }
  static ci(t) {
    let e = P.Gt.get(t);
    return e || (e = /* @__PURE__ */ new Map(), P.Gt.set(t, e)), e;
  }
  static fi(t) {
    const e = P.Xt.get(t);
    if (e !== void 0) return e;
    const s = P.Yt++;
    return P.Xt.set(t, s), s;
  }
  async si(t) {
    if (typeof t != "string" && !(t instanceof URL)) return t;
    const e = t + "";
    return new Promise((s, i) => {
      const n = new Image();
      n.crossOrigin = "anonymous", n.onload = () => s(n), n.onerror = () => i(new M("Failed to load tileset image: " + e)), n.src = e;
    });
  }
  async hi(t, e, s) {
    if (t.map !== void 0) {
      const i = await this._i(t.map), n = this.pi(i, e, s);
      return this.mi(n, "tileset map"), n;
    }
    return this.gi(e);
  }
  async _i(t) {
    return Array.isArray(t) ? [...t] : t instanceof URL ? this.yi(await this.wi(t)) : this.di(t) ? this.yi(t) : this.yi(await this.wi(t));
  }
  pi(t, e, s) {
    const i = Math.ceil(e / s);
    if (t.length !== i) throw new M(`Tileset map must contain exactly ${i} row${i === 1 ? "" : "s"} for ${e} mapped tile${e === 1 ? "" : "s"}.`);
    const n = [];
    let h = e;
    for (let o = 0; o < t.length; o++) {
      const c = It(t[o]), a = Math.min(s, h);
      if (c.length !== a) throw new M(`Tileset map row ${o + 1} must contain exactly ${a} character cell${a === 1 ? "" : "s"}.`);
      n.push(...c), h -= a;
    }
    return n;
  }
  gi(t) {
    this.Ai(t);
    const e = [];
    for (let s = 0; s < t; s++) e.push(String.fromCodePoint(32 + s));
    return e;
  }
  async wi(t) {
    let e;
    try {
      e = await fetch(t);
    } catch (s) {
      throw new M("Failed to load tileset map: " + (s instanceof Error ? s.message : "Unknown error"));
    }
    if (!e.ok) throw new M(`Failed to load tileset map: ${e.status} ${e.statusText}`);
    return e.text();
  }
  yi(t) {
    const e = t.split(/\r\n|\n|\r/);
    return e.length > 0 && e[e.length - 1] === "" && e.pop(), e;
  }
  di(t) {
    return !(!t.includes(`
`) && !t.includes("\r")) || !this.bi(t);
  }
  bi(t) {
    return /^(?:[a-z]+:)?\/\//i.test(t) || t.startsWith("/") || t.startsWith("./") || t.startsWith("../") || t.includes("\\") || /\.[a-z0-9]+(?:$|[?#])/i.test(t);
  }
  ei(t) {
    const e = t, s = e.naturalWidth ?? e.videoWidth ?? e.displayWidth ?? e.width, i = e.naturalHeight ?? e.videoHeight ?? e.displayHeight ?? e.height;
    if (typeof s != "number" || typeof i != "number" || s <= 0 || i <= 0) throw new M("Tileset source must expose positive pixel dimensions.");
    return { width: s, height: i };
  }
  ri(t, e, s) {
    const i = t.marginX ?? t.margin ?? 0, n = t.marginY ?? t.margin ?? 0, h = t.spacingX ?? t.spacing ?? 0, o = t.spacingY ?? t.spacing ?? 0;
    if (t.columns <= 0 || t.rows <= 0) throw new M("Tileset columns and rows must be greater than 0.");
    const c = e - 2 * i - h * (t.columns - 1), a = s - 2 * n - o * (t.rows - 1);
    if (c <= 0 || a <= 0) throw new M("Tileset margins and spacing leave no usable tile area.");
    const u = c / t.columns, l = a / t.rows;
    if (!Number.isInteger(u) || !Number.isInteger(l)) throw new M("Tileset dimensions do not divide evenly. Check columns, rows, margins, and spacing.");
    return { columns: t.columns, rows: t.rows, marginX: i, marginY: n, spacingX: h, spacingY: o, cellWidth: u, cellHeight: l };
  }
  ni(t, e) {
    const s = e.columns * e.rows, i = t.count ?? s;
    if (i <= 0 || i > s) throw new M(`Tileset count must be between 1 and ${s}.`);
    return i;
  }
  Ai(t) {
    if (32 + t - 1 > 1114111) throw new M("Tileset automatic character assignment exceeds the supported Unicode range.");
  }
  mi(t, e) {
    const s = /* @__PURE__ */ new Map();
    for (let i = 0; i < t.length; i++) {
      const n = t[i], h = s.get(n);
      if (h !== void 0) throw new M(`${e} contains duplicate character ${this.Mi(n)} at tile ${h + 1} and tile ${i + 1}.`);
      s.set(n, i);
    }
  }
  Mi(t) {
    const e = kt(t);
    if (e.length === 0) return '""';
    const s = e.map((i) => "U+" + i.toString(16).toUpperCase().padStart(4, "0")).join(" ");
    return `${JSON.stringify(t)} (${s})`;
  }
  oi(t) {
    const e = [];
    for (let s = 0; s < t.length; s++) {
      const i = t[s], n = kt(i)[0];
      if (n === void 0) throw new M(`Tileset character mapping produced an empty character at tile ${s + 1}.`);
      e.push({ character: i, unicode: n, color: this.xi(s + 1) });
    }
    return e;
  }
  xi(t) {
    return [(255 & t) / 255, (t >> 8 & 255) / 255, (t >> 16 & 255) / 255];
  }
  $t() {
    if (this.Vt.height <= 0 || this.Vt.width <= 0) return;
    const t = Math.max(1, this.xt || this.Vt.height), e = t / this.Vt.height;
    this.Qt = { width: Math.max(1, Math.round(this.Vt.width * e)), height: t };
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
}
const hi = Object.freeze(Object.defineProperty({ __proto__: null, TextmodeFont: O, TextmodeTileset: P }, Symbol.toStringTag, { value: "Module" })), ht = ["normal", "additive", "multiply", "screen", "subtract", "darken", "lighten", "overlay", "softLight", "hardLight", "colorDodge", "colorBurn", "difference", "exclusion"];
function z(r) {
  return r * (Math.PI / 180);
}
function _t(r) {
  return r * (180 / Math.PI);
}
function te(r, t, e, s) {
  return _t(Math.atan2(s - t, e - r));
}
function Mt(r, t, e, s) {
  return Math.hypot(e - r, s - t);
}
function Z(r, t, e) {
  return Math.min(Math.max(r, t), e);
}
function me(r) {
  return (r % 360 + 360) % 360 / 360;
}
function V(r = new Float32Array(16)) {
  return r[0] = 1, r[1] = 0, r[2] = 0, r[3] = 0, r[4] = 0, r[5] = 1, r[6] = 0, r[7] = 0, r[8] = 0, r[9] = 0, r[10] = 1, r[11] = 0, r[12] = 0, r[13] = 0, r[14] = 0, r[15] = 1, r;
}
function ee(r, t, e, s = new Float32Array(16)) {
  let i = r[0] - t[0], n = r[1] - t[1], h = r[2] - t[2], o = Math.hypot(i, n, h);
  o === 0 ? h = 1 : (o = 1 / o, i *= o, n *= o, h *= o);
  let c = e[1] * h - e[2] * n, a = e[2] * i - e[0] * h, u = e[0] * n - e[1] * i;
  o = Math.hypot(c, a, u), o === 0 ? (c = 1, a = 0, u = 0) : (o = 1 / o, c *= o, a *= o, u *= o);
  const l = n * u - h * a, f = h * c - i * u, y = i * a - n * c;
  return s[0] = c, s[1] = l, s[2] = i, s[3] = 0, s[4] = a, s[5] = f, s[6] = n, s[7] = 0, s[8] = u, s[9] = y, s[10] = h, s[11] = 0, s[12] = -(c * r[0] + a * r[1] + u * r[2]), s[13] = -(l * r[0] + f * r[1] + y * r[2]), s[14] = -(i * r[0] + n * r[1] + h * r[2]), s[15] = 1, s;
}
var ve = ((r) => (r[r.SILENT = 0] = "SILENT", r[r.WARNING = 1] = "WARNING", r[r.ERROR = 2] = "ERROR", r[r.THROW = 3] = "THROW", r))(ve || {});
class tt {
  static Ci = null;
  Zt = { globalLevel: 3 };
  Fi = /* @__PURE__ */ new Set();
  constructor() {
  }
  static Pi() {
    return tt.Ci || (tt.Ci = new tt()), tt.Ci;
  }
  Ti(t, e) {
    const s = "%c[textmode.js] Oops! (╯°□°)╯︵ Something went wrong in your code.", i = "color: #f44336; font-weight: bold; background: #ffebee; padding: 2px 6px; border-radius: 3px;";
    switch (this.Zt.globalLevel) {
      case 0:
        return !1;
      case 1:
        return !!this.Si("warning", t, e) && (console.group(s, i), console.warn(M.N(t, e, { includeFooterArrows: !1 })), console.groupEnd(), !1);
      case 2:
        return !!this.Si("error", t, e) && (console.group(s, i), console.error(M.N(t, e, { includeFooterArrows: !1 })), console.groupEnd(), !1);
      default:
        throw new M(t, e);
    }
  }
  Ei(t, e, s) {
    return !!t || (this.Ti(e, s), !1);
  }
  Oi(t) {
    this.Zt.globalLevel = t;
  }
  Li(t) {
    t.globalLevel !== void 0 && (this.Zt.globalLevel = t.globalLevel);
  }
  Di() {
    this.Fi.clear();
  }
  Si(t, e, s) {
    const i = this.Ri(t, e, s);
    return !this.Fi.has(i) && (this.Fi.add(i), !0);
  }
  Ri(t, e, s) {
    return `${t}|${e}|${s ? this.ki(s) : ""}`;
  }
  ki(t) {
    return t == null ? t + "" : typeof t == "number" || typeof t == "boolean" || typeof t == "string" ? JSON.stringify(t) : Array.isArray(t) ? `[${t.map((e) => this.ki(e)).join(",")}]` : typeof t == "object" ? `{${Object.entries(t).sort(([e], [s]) => e.localeCompare(s)).map(([e, s]) => `${JSON.stringify(e)}:${this.ki(s)}`).join(",")}}` : t + "";
  }
}
const et = tt.Pi();
class X {
  zi;
  Hi;
  Ii;
  ji;
  Bi;
  Ni;
  Gi;
  Xi;
  Yi;
  constructor(t = 0, e = 0, s = 0, i = 0, n = 0, h = 0, o = 0, c = 1, a = 0) {
    this.zi = t, this.Hi = e, this.Ii = s, this.ji = i, this.Bi = n, this.Ni = h, this.Gi = o, this.Xi = c, this.Yi = a;
  }
  static Vi(t, e) {
    const s = t.Ki.Qi, i = t.Ki.Wi, n = t.Ki.Zi, h = t.Ki.qi, o = t.Ki.Ji, c = t.Ki.$i;
    if (t.Ki.ts) {
      const a = 0.5 * Math.max(1, e) / Math.tan(0.5 * t.Ki.ss);
      return new X(s, i, n + a, s, i, n, h, o, c);
    }
    return new X(t.Ki.es, t.Ki.rs, t.Ki.ns, s, i, n, h, o, c);
  }
  hs(t) {
    t.Ki.cs(this.zi, this.Hi, this.Ii, this.ji, this.Bi, this.Ni, this.Gi, this.Xi, this.Yi);
  }
  setPosition(t, e, s) {
    return this.zi = t, this.Hi = e, this.Ii = s, this;
  }
  lookAt(t, e, s) {
    return this.ji = t, this.Bi = e, this.Ni = s, this;
  }
  setUp(t, e, s) {
    return this.Gi = t, this.Xi = e, this.Yi = s, this;
  }
  move(t, e, s) {
    return this.zi += t, this.Hi += e, this.Ii += s, this.ji += t, this.Bi += e, this.Ni += s, this;
  }
  copy() {
    return new X(this.zi, this.Hi, this.Ii, this.ji, this.Bi, this.Ni, this.Gi, this.Xi, this.Yi);
  }
  get eyeX() {
    return this.zi;
  }
  get eyeY() {
    return this.Hi;
  }
  get eyeZ() {
    return this.Ii;
  }
  get targetX() {
    return this.ji;
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
class He {
  us = null;
  ts = !0;
  es = 0;
  rs = 0;
  ns = 0;
  Qi = 0;
  Wi = 0;
  Zi = 0;
  qi = 0;
  Ji = 1;
  $i = 0;
  ls = "perspective";
  fs;
  ds;
  _s;
  constructor(t) {
    this.ts = t.Ki.ts, this.es = t.Ki.es, this.rs = t.Ki.rs, this.ns = t.Ki.ns, this.Qi = t.Ki.Qi, this.Wi = t.Ki.Wi, this.Zi = t.Ki.Zi, this.qi = t.Ki.qi, this.Ji = t.Ki.Ji, this.$i = t.Ki.$i, t.Ki.ts || (this.us = new X(t.Ki.es, t.Ki.rs, t.Ki.ns, t.Ki.Qi, t.Ki.Wi, t.Ki.Zi, t.Ki.qi, t.Ki.Ji, t.Ki.$i)), t.Ki.ps ? this.ls = "ortho" : (this.ls = "perspective", this.fs = 180 * t.Ki.ss / Math.PI), this.ds = t.Ki.ds, this._s = t.Ki._s;
  }
  createCamera(t, e) {
    let s;
    if (this.ts) {
      const i = Math.max(1, t), n = this.fs ?? e, h = 0.5 * i / Math.tan(n * Math.PI / 360);
      s = new X(this.Qi, this.Wi, this.Zi + h, this.Qi, this.Wi, this.Zi, this.qi, this.Ji, this.$i);
    } else s = new X(this.es, this.rs, this.ns, this.Qi, this.Wi, this.Zi, this.qi, this.Ji, this.$i);
    return this.setCamera(s), s;
  }
  setCamera(t) {
    this.us = t, this.ts = !1, this.es = t.eyeX, this.rs = t.eyeY, this.ns = t.eyeZ, this.Qi = t.targetX, this.Wi = t.targetY, this.Zi = t.targetZ, this.qi = t.upX, this.Ji = t.upY, this.$i = t.upZ;
  }
  resetCamera() {
    this.us = null, this.ts = !0, this.es = 0, this.rs = 0, this.ns = 0, this.Qi = 0, this.Wi = 0, this.Zi = 0, this.qi = 0, this.Ji = 1, this.$i = 0;
  }
  camera(t, e, s, i = 0, n = 0, h = 0, o = 0, c = 1, a = 0) {
    this.us ? this.us.setPosition(t, e, s).lookAt(i, n, h).setUp(o, c, a) : this.us = new X(t, e, s, i, n, h, o, c, a), this.ts = !1, this.es = t, this.rs = e, this.ns = s, this.Qi = i, this.Wi = n, this.Zi = h, this.qi = o, this.Ji = c, this.$i = a;
  }
  lookAt(t, e, s, i, n, h) {
    this.us && (this.us.lookAt(t, e, s), i === void 0 && n === void 0 && h === void 0 || this.us.setUp(i ?? this.us.upX, n ?? this.us.upY, h ?? this.us.upZ)), this.Qi = t, this.Wi = e, this.Zi = s, i !== void 0 && (this.qi = i), n !== void 0 && (this.Ji = n), h !== void 0 && (this.$i = h);
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
class I {
  bs;
  Ms;
  Cs;
  l;
  _;
  Fs;
  xt;
  Ps;
  q;
  Ts;
  Ss;
  At;
  Es;
  Os;
  Ls;
  Ds;
  Rs = () => {
  };
  ks = [];
  zs = !1;
  Hs;
  Is;
  js = /* @__PURE__ */ new Map();
  constructor(t, e = {}) {
    this.q = t, this.bs = e.visible ?? !0, this.Ms = e.opacity ?? 1;
    const s = e.blendMode ?? "normal";
    this.Cs = I.Bs(s) ? s : "normal";
    const i = e.fontSize ?? 16;
    this.xt = Math.abs(i), this.Is = e.fontSize !== void 0, et.Ei(I.Bs(s), `Invalid blend mode. Expected one of: ${ht.join(", ")}.`, { method: "constructor", property: "blendMode", providedValue: e.blendMode }), et.Ei(typeof i == "number", "Font size must be a number.", { method: "fontSize", providedValue: i }), this.l = e.offsetX ?? 0, this._ = e.offsetY ?? 0, this.Fs = e.rotationZ ?? 0;
    const n = e.fontSource;
    this.Ps = n, this.At = n instanceof O || n instanceof P ? n : new O(t, this.xt), this.Hs = new He(t.state);
  }
  async Ns(t) {
    if (this.Ts = t, this.Ps instanceof O || this.Ps instanceof P) {
      this.Ps.Et || await this.Ps.Dt();
      const i = this.Ps, n = i.Ot({ fontSize: this.Gs(i) });
      this.Xs(n);
    }
    this.At.Et || (this.At instanceof O ? await this.At.Dt(this.Ps) : await this.At.Dt());
    const e = this.At.cellDimensions;
    this.Ss = new Le(this.Ts.canvas.canvas, e.width, e.height);
    const s = this.Ss;
    this.Es = this.Ts.createFramebuffer(s.cols, s.rows, 3), this.Os = this.Ts.createFramebuffer(s.width, s.height, 1), this.Ls = this.Ts.createFramebuffer(s.width, s.height, 1), this.Ds = [this.Ts.createFramebuffer(s.width, s.height, 1, { depth: !1 }), this.Ts.createFramebuffer(s.width, s.height, 1, { depth: !1 })], this.Ss.P(() => {
      this.Es.resize(this.Ss.cols, this.Ss.rows), this.Os.resize(this.Ss.width, this.Ss.height), this.Ls?.resize(this.Ss.width, this.Ss.height), this.Ds?.[0].resize(this.Ss.width, this.Ss.height), this.Ds?.[1].resize(this.Ss.width, this.Ss.height);
    });
  }
  draw(t) {
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
    this.Ms = Z(t, 0, 1);
  }
  blendMode(t) {
    if (t === void 0) return this.Cs;
    et.Ei(I.Bs(t), `Invalid blend mode. Expected one of: ${ht.join(", ")}.`, { method: "blendMode", providedValue: t }) && (this.Cs = t);
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
    const t = this.Ys(), e = 180 * (this.Ts?.renderer.state.Ki.ss ?? Math.PI / 4) / Math.PI;
    return this.Hs.createCamera(t.height, e);
  }
  setCamera(t) {
    this.Hs.setCamera(t), this.Vs();
  }
  resetCamera() {
    this.Hs.resetCamera(), this.Vs();
  }
  camera(t, e, s, i = 0, n = 0, h = 0, o = 0, c = 1, a = 0) {
    this.Hs.camera(t, e, s, i, n, h, o, c, a), this.Vs();
  }
  lookAt(t, e, s, i, n, h) {
    this.Hs.lookAt(t, e, s, i, n, h), this.Vs();
  }
  perspective(t, e, s) {
    this.Hs.perspective(t, e, s), this.Vs();
  }
  ortho(t, e) {
    this.Hs.ortho(t, e), this.Vs();
  }
  Qs() {
    return this.Hs.getActiveCamera();
  }
  filter(t, e) {
    this.ks.push({ name: t, params: e });
  }
  setPluginState(t, e) {
    this.js.set(t, e);
  }
  getPluginState(t) {
    return this.js.get(t);
  }
  hasPluginState(t) {
    return this.js.has(t);
  }
  deletePluginState(t) {
    return this.js.delete(t);
  }
  fontSize(t) {
    if (t === void 0) return this.At.fontSize;
    if (!et.Ei(typeof t == "number", "Font size must be a number.", { method: "fontSize", providedValue: t })) return;
    const e = Math.abs(t);
    this.At.fontSize !== e && (this.Is = !0, this.xt = e, this.At.zt(e), this.Ks());
  }
  useTileColors(t) {
    if (t === void 0) return this.zs;
    this.zs = t;
  }
  async loadFont(t) {
    if (!this.At) throw Error("Layer font not initialized. Ensure layer is attached before loading fonts.");
    if (t instanceof O) {
      t.Et || await t.Dt();
      const e = t, s = e.Ot({ fontSize: this.Gs(e) });
      this.Xs(s);
    } else if (this.At instanceof O) await this.At.Ht(t);
    else {
      const e = new O(this.q, this.At.fontSize);
      await e.Dt(t), this.Xs(e);
    }
    return this.Ps = t, this.xt = this.At.fontSize, this.Ks(), this.At;
  }
  async loadTileset(t) {
    if (!this.At) throw Error("Layer font not initialized. Ensure layer is attached before loading tilesets.");
    if (t instanceof P) {
      t.Et || await t.Dt();
      const e = t.Ot({ fontSize: this.Gs(t) });
      this.Xs(e);
    } else {
      const e = this.Is ? this.xt : t.fontSize, s = new P(this.q, e, t);
      await s.Dt(), this.Xs(s);
    }
    return this.Ps = t, this.xt = this.At.fontSize, this.Ks(), this.At;
  }
  Ws(t, e, s = {}) {
    if (!this.bs || !this.Es || !this.Os) return;
    const i = this.Ts.renderer, n = this.Ss, h = s.skipPluginHooks ?? !1;
    h || t.qs.Zs(this);
    try {
      let o = !1;
      try {
        this.Es.begin(), o = !0, i.state.$s.Js(), i.state.te(), this.Hs.applyToState(i.state), t.ie = this, this.Rs.call(t);
      } finally {
        t.ie = void 0, o && this.Es.end();
      }
      h || t.qs.se(this);
      const c = this.ks.length > 0, a = c ? this.Ls : this.Os;
      let u = !1;
      try {
        a.begin(), u = !0, i.ee(e), e.re({ u_characterTexture: this.At.framebuffer, u_charsetDimensions: [this.At.columns, this.At.rows], U5: this.Es.textures[0], U6: this.Es.textures[1], U7: this.Es.textures[2], U8: !(this.At instanceof P && this.zs), U9: [n.cols, n.rows], Ua: [a.width, a.height], Ub: [0, 0, 0, 0] }), i.ne(0, 0, n.width, n.height);
      } finally {
        u && a.end();
      }
      c && this.Ts.filterManager.he(this.Ls.textures[0], this.Os, this.ks, this.Os.width, this.Os.height, this.Ds);
    } finally {
      this.ks = [];
    }
  }
  oe() {
    this.Es && this.Os && this.Ss?.reset();
  }
  L() {
    this.Es?.dispose(), this.Os?.dispose(), this.Ls?.dispose(), this.Ds?.[0].dispose(), this.Ds?.[1].dispose(), this.At?.dispose(), this.Ss?.L();
  }
  get texture() {
    return this.Os?.textures[0];
  }
  get grid() {
    return this.Ss;
  }
  get font() {
    return this.At;
  }
  get width() {
    return this.Os ? this.Os.width : 0;
  }
  get height() {
    return this.Os ? this.Os.height : 0;
  }
  get drawFramebuffer() {
    return this.Es;
  }
  get asciiFramebuffer() {
    return this.Os;
  }
  Ks() {
    if (!this.Ss || !this.At) return;
    const t = this.At.cellDimensions;
    this.Ss.U(t.width, t.height), this.Es && this.Os && this.oe();
  }
  static Bs(t) {
    return typeof t == "string" && ht.includes(t);
  }
  Xs(t) {
    (this.Ps instanceof O || this.Ps instanceof P) && this.At === this.Ps || this.At === t || this.At.dispose(), this.At = t;
  }
  Gs(t) {
    return this.Is ? this.xt : t.fontSize;
  }
  Vs() {
    this.Hs.applyToState(this.Ts.renderer.state);
  }
  Ys() {
    if (this.Es) return { width: Math.max(1, this.Es.width), height: Math.max(1, this.Es.height) };
    if (this.Ss) return { width: Math.max(1, this.Ss.cols), height: Math.max(1, this.Ss.rows) };
    const t = this.Ts?.renderer.context.canvas.width ?? this.Ts?.canvas.width ?? 1, e = this.Ts?.renderer.context.canvas.height ?? this.Ts?.canvas.height ?? 1;
    return { width: Math.max(1, t), height: Math.max(1, e) };
  }
}
class ye {
  ae;
  ce;
  Rs;
  Et = !1;
  constructor(t) {
    this.ae = t;
  }
  draw(t) {
    this.Rs = t;
  }
  async Dt() {
    if (this.Et) return;
    const t = this.ue();
    this.ce = t, this.Et = !0;
  }
  L() {
    this.Et && (this.ce?.L(), this.Et = !1);
  }
  le(t, e) {
    const s = this.ce;
    s.show(), s.draw(() => {
      this.ae.clear(), this.ae.push();
      try {
        (this.Rs || t)(e), this.fe(e);
      } finally {
        this.ae.pop();
      }
    });
  }
  fe(t) {
    const { textmodifier: e, grid: s } = t, i = [116, 101, 120, 116, 109, 111, 100, 101, 46, 106, 115].map((c) => String.fromCharCode(c)).join(""), n = (s.rows + 1 >> 1) - 2, h = 2 - (s.cols + 1 >> 1), o = [[142, 249, 243], [241, 91, 181], [255, 155, 113]];
    e.push(), e.translate(h, n, 0);
    for (let c = 0; c < i.length; c++) {
      const a = i[c], u = Math.floor(0.1 * e.frameCount + 0.5 * c) % o.length, [l, f, y] = o[u], m = e.color(l, f, y);
      e.charColor(m), e.char(a), e.point(), e.translateX(1);
    }
    e.pop();
  }
}
function Et(r) {
  return parseInt(r, 16);
}
const Ke = /^rgba?\(([^)]+)\)$/i;
function H(r) {
  return Number.isNaN(r = Math.round(r)) ? 0 : Z(r, 0, 255);
}
function Ye(r, t = !1) {
  if (!r) return null;
  const e = r.trim().toLowerCase();
  if (!e) return null;
  let s = null;
  return e.startsWith("rgb") && (s = (function(i) {
    const n = Ke.exec(i.trim());
    if (!n) return null;
    const h = n[1].split(",").map((l) => l.trim());
    if (h.length < 3) return null;
    const o = H(parseFloat(h[0])), c = H(parseFloat(h[1])), a = H(parseFloat(h[2]));
    let u = 255;
    if (h[3] !== void 0) {
      const l = h[3].trim();
      let f = parseFloat(l);
      l.endsWith("%") && (f /= 100), u = 255 * Z(f, 0, 1);
    }
    return [o, c, a, Math.round(u)];
  })(e)), s && (t || s[3] !== 0) ? s : null;
}
class E {
  de;
  _e;
  r;
  g;
  b;
  a;
  constructor(t, e, s, i) {
    this.r = H(t), this.g = H(e), this.b = H(s), this.a = H(i);
  }
  static pe(t, e, s, i) {
    if (t instanceof E) return t;
    if (Array.isArray(t)) {
      if (t.length < 3) throw Error("Component tuples must include at least RGB values.");
      const [n, h, o] = t, c = t.length === 4 ? t[3] : 255;
      return E.ve(n, h, o, c);
    }
    if (typeof t == "string") {
      const n = t.trim();
      if (n.length === 0) throw Error("Color strings cannot be empty.");
      const h = Ye(n, !0);
      return h ? E.ve(...h) : E.me(n);
    }
    if (typeof t == "number") return typeof e == "number" && typeof s == "number" ? E.ve(t, e, s, i ?? 255) : typeof e == "number" ? E.ge(t, e) : E.ge(t, i ?? 255);
    throw Error("Unsupported color input passed.");
  }
  static ve(t, e, s, i = 255) {
    return new E(t, e, s, i);
  }
  static ge(t, e = 255) {
    return new E(t, t, t, e);
  }
  static me(t) {
    return new E(...(function(e) {
      const s = e.trim().replace(/^#|0x/gi, "");
      if (!/^[0-9A-Fa-f]+$/.test(s)) throw Error("Invalid hex color: " + e);
      const i = (n = s).length === 3 || n.length === 4 ? n.split("").map((h) => h + h).join("") : n;
      var n;
      if (i.length !== 6 && i.length !== 8) throw Error("Invalid hex color: " + e);
      return [Et(i.slice(0, 2)), Et(i.slice(2, 4)), Et(i.slice(4, 6)), i.length === 8 ? Et(i.slice(6, 8)) : 255];
    })(t));
  }
  static ye(t, e, s, i) {
    return new E(Math.round(255 * t), Math.round(255 * e), Math.round(255 * s), Math.round(255 * i));
  }
  get rgb() {
    return [this.r, this.g, this.b];
  }
  get rgba() {
    return this.de || (this.de = [this.r, this.g, this.b, this.a]), [...this.de];
  }
  get normalized() {
    return this._e || (this._e = [this.r / 255, this.g / 255, this.b / 255, this.a / 255]), [...this._e];
  }
  withAlpha(t) {
    return new E(this.r, this.g, this.b, t);
  }
}
const Je = ({ textmodifier: r, grid: t, errorTitle: e, errorMessage: s }) => {
  r.background("#222323"), r.cellColor("#222323");
  const i = E.pe("#FF6B6B"), n = E.pe("#C0C0C0");
  r.charColor(i), r.push(), r.translate(0, -2, 0), r.char("X"), r.rect(1, 1), r.pop();
  const h = e || "SKETCH ERROR", o = -Math.floor(h.length / 2);
  r.push(), r.translate(o, 0, 0);
  for (const m of h) r.char(m), r.rect(1, 1), r.translateX(1);
  r.pop(), r.charColor(r.color(n.r, n.g, n.b));
  const c = s || "Unknown error", a = Math.floor(0.8 * t.cols), u = se(c, a), l = u.slice(0, 3);
  u.length > 3 && (l[2] = l[2].substring(0, a - 3) + "..."), l.forEach((m, p) => {
    const g = -Math.floor(m.length / 2);
    r.push(), r.translate(g, 3 + p, 0);
    for (const v of m) r.char(v), r.rect(1, 1), r.translateX(1);
    r.pop();
  });
  const f = se("CHECK CONSOLE FOR DETAILS", a), y = 5 + l.length;
  f.forEach((m, p) => {
    const g = -Math.floor(m.length / 2);
    r.push(), r.translate(g, y + p, 0);
    for (const v of m) r.char(v), r.rect(1, 1), r.translateX(1);
    r.pop();
  });
}, se = (r, t) => {
  const e = r.split(" "), s = [];
  let i = "";
  for (const n of e) (i + " " + n).length <= t ? i = i ? i + " " + n : n : (i && s.push(i), i = n);
  return i && s.push(i), s;
};
class we extends ye {
  we = "inactive";
  Ae = "SKETCH ERROR";
  be = "Unknown error";
  Me = "";
  constructor(t) {
    super(t);
  }
  async Dt() {
    this.Et || (await super.Dt(), this.ce.opacity(1), this.ce.hide());
  }
  get xe() {
    return this.Et && this.we === "active";
  }
  Ce(t) {
    this.Fe(t), this.Et && (this.ce.opacity(1), this.ce.show());
  }
  Pe() {
    this.xe && this.Te();
  }
  L() {
    super.L();
  }
  ue() {
    return new I(this.ae.q, { visible: !0, opacity: 1 });
  }
  Te() {
    const t = { textmodifier: this.ae, grid: this.ce.grid, errorTitle: this.Ae, errorMessage: this.be, errorDetails: this.Me || void 0 };
    this.le(Je, t);
  }
  Fe(t) {
    if (this.we = "active", t instanceof Error) {
      const e = t.name?.trim() ? t.name.trim().toUpperCase() : "SKETCH ERROR";
      return this.Ae = e.endsWith("ERROR") ? e : e + " ERROR", this.be = t.message || "Unknown error", void (this.Me = t.stack || "");
    }
    if (typeof t == "string") return this.Ae = "SKETCH ERROR", this.be = t || "Unknown error", void (this.Me = "");
    this.Ae = "SKETCH ERROR", this.be = "Unknown error", this.Me = "";
  }
}
const oi = Object.freeze(Object.defineProperty({ __proto__: null, ErrorLayerController: we, TextmodeError: M, TextmodeErrorLevel: ve }, Symbol.toStringTag, { value: "Module" }));
function Ae(r, t) {
  r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL, 1), r.texImage2D(r.TEXTURE_2D, 0, r.RGBA, r.RGBA, r.UNSIGNED_BYTE, t);
}
function Pt(r, t, e) {
  r.bindTexture(r.TEXTURE_2D, t), Ae(r, e), r.bindTexture(r.TEXTURE_2D, null);
}
function Vt(r, t, e = r.NEAREST, s = r.NEAREST, i = r.CLAMP_TO_EDGE, n = r.CLAMP_TO_EDGE) {
  const h = (function(a, u, l = a.NEAREST, f = a.NEAREST, y = a.CLAMP_TO_EDGE, m = a.CLAMP_TO_EDGE) {
    const p = a.createTexture();
    return a.bindTexture(a.TEXTURE_2D, p), be(a, l, f, y, m), Ae(a, u), a.bindTexture(a.TEXTURE_2D, null), p;
  })(r, t, e, s, i, n), { width: o, height: c } = (function(a) {
    let u = 0, l = 0;
    return a instanceof HTMLVideoElement ? (u = a.videoWidth, l = a.videoHeight) : a instanceof HTMLImageElement ? (u = a.naturalWidth, l = a.naturalHeight) : a instanceof HTMLCanvasElement && (u = a.width, l = a.height), { width: u, height: l };
  })(t);
  return { texture: h, width: o, height: c };
}
function be(r, t, e, s, i) {
  r.texParameteri(r.TEXTURE_2D, r.TEXTURE_MIN_FILTER, t), r.texParameteri(r.TEXTURE_2D, r.TEXTURE_MAG_FILTER, e), r.texParameteri(r.TEXTURE_2D, r.TEXTURE_WRAP_S, s), r.texParameteri(r.TEXTURE_2D, r.TEXTURE_WRAP_T, i);
}
function ot(r, t, e, s, i, n = 0, h = WebGL2RenderingContext.FLOAT, o = !1) {
  r.enableVertexAttribArray(t), r.vertexAttribPointer(t, e, h, o, s, i), r.vertexAttribDivisor(t, n);
}
function Wt(r, t, e, s, i) {
  r.bindBuffer(t, e), r.bufferData(t, s, i), r.bindBuffer(t, null);
}
class Tt extends ut {
  o;
  u;
  Zt;
  Se;
  J;
  Ee = [];
  Oe = null;
  Le;
  q;
  De = null;
  Re = /* @__PURE__ */ new Map();
  constructor(t, e, s = e, i = 1, n = {}, h) {
    super(), this.o = e, this.u = s, this.Se = t, this.Le = Z(i, 1, 8), this.q = h, this.Zt = { filter: "nearest", wrap: "clamp", format: "rgba", type: "unsigned_byte", depth: !0, ...n };
    const o = t.getParameter(t.MAX_DRAW_BUFFERS), c = t.getParameter(t.MAX_COLOR_ATTACHMENTS);
    this.Le = Math.min(this.Le, o, c), this.J = t.createFramebuffer(), this.ke(), this.ze(), this.Zt.depth && this.He();
  }
  ke() {
    const t = this.Se, e = this.Zt.filter === "linear" ? t.LINEAR : t.NEAREST, s = this.Zt.wrap === "repeat" ? t.REPEAT : t.CLAMP_TO_EDGE;
    for (let i = 0; i < this.Le; i++) {
      const n = t.createTexture();
      t.bindTexture(t.TEXTURE_2D, n), be(t, e, e, s, s), this.Ie(n, !1), this.Ee.push(n);
    }
    t.bindTexture(t.TEXTURE_2D, null);
  }
  Ie(t, e = !0) {
    const s = this.Se, i = this.Zt.type === "float" ? s.FLOAT : s.UNSIGNED_BYTE, n = i === s.FLOAT ? s.RGBA32F : s.RGBA8, h = s.RGBA;
    e && s.bindTexture(s.TEXTURE_2D, t), s.texImage2D(s.TEXTURE_2D, 0, n, this.o, this.u, 0, h, i, null);
  }
  ze() {
    const t = this.Se;
    if (t.bindFramebuffer(t.FRAMEBUFFER, this.J), this.Le === 1) t.framebufferTexture2D(t.FRAMEBUFFER, t.COLOR_ATTACHMENT0, t.TEXTURE_2D, this.Ee[0], 0);
    else {
      const e = [];
      for (let s = 0; s < this.Le; s++) {
        const i = t.COLOR_ATTACHMENT0 + s;
        t.framebufferTexture2D(t.FRAMEBUFFER, i, t.TEXTURE_2D, this.Ee[s], 0), e.push(i);
      }
      t.drawBuffers(e);
    }
    t.bindFramebuffer(t.FRAMEBUFFER, null);
  }
  He() {
    const t = this.Se;
    this.Oe = t.createRenderbuffer(), this.je(), t.bindFramebuffer(t.FRAMEBUFFER, this.J), t.framebufferRenderbuffer(t.FRAMEBUFFER, t.DEPTH_ATTACHMENT, t.RENDERBUFFER, this.Oe), t.bindFramebuffer(t.FRAMEBUFFER, null);
  }
  je() {
    if (!this.Oe) return;
    const t = this.Se;
    t.bindRenderbuffer(t.RENDERBUFFER, this.Oe), t.renderbufferStorage(t.RENDERBUFFER, t.DEPTH_COMPONENT24, this.o, this.u), t.bindRenderbuffer(t.RENDERBUFFER, null);
  }
  rt(t) {
    Pt(this.Se, this.Ee[0], t);
  }
  resize(t, e) {
    this.o = t, this.u = e, this.Re.clear();
    const s = this.Se;
    for (const i of this.Ee) this.Ie(i, !0);
    s.bindTexture(s.TEXTURE_2D, null), this.je(), this.De = null;
  }
  readPixels(t) {
    const e = this.Re.get(t);
    if (e) return e;
    const s = this.Se, i = this.o, n = this.u, h = new Uint8Array(i * n * 4), o = s.getParameter(s.READ_FRAMEBUFFER_BINDING);
    s.bindFramebuffer(s.READ_FRAMEBUFFER, this.J), s.readBuffer(s.COLOR_ATTACHMENT0 + t), s.readPixels(0, 0, i, n, s.RGBA, s.UNSIGNED_BYTE, h), s.bindFramebuffer(s.READ_FRAMEBUFFER, o);
    const c = 4 * i, a = new Uint8Array(h.length);
    for (let u = 0; u < n; u++) {
      const l = (n - 1 - u) * c, f = u * c;
      a.set(h.subarray(l, l + c), f);
    }
    return this.Re.set(t, a), a;
  }
  begin() {
    const t = this.Se;
    this.Re.clear(), this.q.Be(), this.q.Ne(this.J, this.o, this.u, this.Le), this.Zt.depth && t.clear(t.DEPTH_BUFFER_BIT), this.q.state.Ge();
  }
  end() {
    this.q.state.Xe(), this.q.Ye(), this.q.Ve();
  }
  Qe() {
    return this.De || this.Ke(), this.De;
  }
  Ke() {
    if (!this.q) return;
    const t = this.Le > 1, e = this.Le > 2, s = this.Le > 3, i = { Uc: this.Ee[0], Ud: t ? this.Ee[1] : this.Ee[0], Ue: e ? this.Ee[2] : this.Ee[0], Uf: s ? this.Ee[3] : this.Ee[0], Ug: [this.o, this.u], Uh: t, Ui: e, Uj: s }, n = this.q.materialManager.We;
    this.De = this.q.materialManager.Ze(n, i);
  }
  dispose() {
    const t = this.Se;
    t.deleteFramebuffer(this.J), this.Ee.forEach((e) => {
      t.deleteTexture(e);
    }), this.Oe && t.deleteRenderbuffer(this.Oe), super.dispose();
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
    return this.Ee;
  }
  get attachmentCount() {
    return this.Le;
  }
}
function st(r) {
  return typeof r == "object" && r !== null && "textures" in r && Array.isArray(r.textures);
}
function xe(r) {
  if (typeof r == "number" || typeof r == "boolean") return !0;
  if (Array.isArray(r)) {
    if (r.length === 0) return !0;
    const t = r[0];
    return typeof t == "number" || !!Array.isArray(t);
  }
  return r instanceof Float32Array || r instanceof Int32Array || !!st(r) || typeof WebGLTexture < "u" && r instanceof WebGLTexture;
}
class at extends ut {
  Se;
  qe;
  Je = /* @__PURE__ */ new Map();
  $e = /* @__PURE__ */ new Map();
  tr = /* @__PURE__ */ new Map();
  ir = 0;
  sr = /* @__PURE__ */ new Map();
  er;
  constructor(t, e, s) {
    super(), this.Se = t, this.er = t.getParameter(t.MAX_TEXTURE_IMAGE_UNITS) ?? 16, this.qe = this.rr(e, s), this.nr();
  }
  nr() {
    const t = this.Se.getProgramParameter(this.qe, this.Se.ACTIVE_UNIFORMS);
    for (let e = 0; e < t; e++) {
      const s = this.Se.getActiveUniform(this.qe, e);
      if (s) {
        const i = s.name.replace(/\[0\]$/, ""), n = this.Se.getUniformLocation(this.qe, i);
        n && (this.Je.set(i, n), this.$e.set(i, { type: s.type, size: s.size }));
      }
    }
  }
  rr(t, e) {
    const s = this.hr(this.Se.VERTEX_SHADER, t), i = this.hr(this.Se.FRAGMENT_SHADER, e), n = this.Se.createProgram();
    if (!n) throw Error("Failed to create WebGL program");
    if (this.Se.attachShader(n, s), this.Se.attachShader(n, i), this.Se.linkProgram(n), !this.Se.getProgramParameter(n, this.Se.LINK_STATUS)) {
      const h = this.Se.getProgramInfoLog(n);
      throw Error("Shader program link error: " + h);
    }
    return this.Se.deleteShader(s), this.Se.deleteShader(i), n;
  }
  hr(t, e) {
    const s = this.Se.createShader(t);
    if (!s) throw Error("Failed to create shader of type " + t);
    if (this.Se.shaderSource(s, e), this.Se.compileShader(s), !this.Se.getShaderParameter(s, this.Se.COMPILE_STATUS)) {
      const i = this.Se.getShaderInfoLog(s);
      throw this.Se.deleteShader(s), Error("Shader compilation error: " + i);
    }
    return s;
  }
  ar() {
    this.Se.useProgram(this.qe), this.cr();
  }
  cr() {
    this.ir = 0, this.sr.clear();
    for (const [t, e] of this.tr) (e instanceof WebGLTexture || st(e)) && this.tr.delete(t);
  }
  re(t) {
    for (const e in t) this.ur(e, t[e]);
  }
  ur(t, e) {
    const s = this.Je.get(t);
    if (!s) return;
    const i = this.tr.get(t);
    let n = !0;
    if (i !== void 0 && (typeof e == "number" || typeof e == "boolean" ? i === e && (n = !1) : (e instanceof WebGLTexture || st(e)) && i === e && (n = !1)), !n) return;
    typeof e == "number" || typeof e == "boolean" || e instanceof WebGLTexture || st(e) ? this.tr.set(t, e) : this.tr.delete(t);
    const h = this.$e.get(t);
    if (!h) return;
    const { type: o, size: c } = h, a = this.Se;
    if (e instanceof WebGLTexture) {
      const u = this.lr(t);
      return a.uniform1i(s, u), a.activeTexture(a.TEXTURE0 + u), void a.bindTexture(a.TEXTURE_2D, e);
    }
    if (st(e)) {
      const u = this.lr(t);
      return a.uniform1i(s, u), a.activeTexture(a.TEXTURE0 + u), void a.bindTexture(a.TEXTURE_2D, e.textures[0]);
    }
    if (xe(e), typeof e != "number") if (typeof e != "boolean") if (Array.isArray(e) && Array.isArray(e[0])) {
      const u = e.flat();
      switch (o) {
        case a.FLOAT_VEC2:
          a.uniform2fv(s, u);
          break;
        case a.FLOAT_VEC3:
          a.uniform3fv(s, u);
          break;
        case a.FLOAT_VEC4:
          a.uniform4fv(s, u);
      }
    } else {
      const u = e;
      switch (o) {
        case a.FLOAT:
          c > 1 ? a.uniform1fv(s, u) : a.uniform1f(s, u[0]);
          break;
        case a.FLOAT_VEC2:
          a.uniform2fv(s, u);
          break;
        case a.FLOAT_VEC3:
          a.uniform3fv(s, u);
          break;
        case a.FLOAT_VEC4:
          a.uniform4fv(s, u);
          break;
        case a.INT:
          c > 1 ? a.uniform1iv(s, u) : a.uniform1i(s, u[0]);
          break;
        case a.INT_VEC2:
          a.uniform2iv(s, u);
          break;
        case a.INT_VEC3:
          a.uniform3iv(s, u);
          break;
        case a.INT_VEC4:
          a.uniform4iv(s, u);
          break;
        case a.BOOL:
          a.uniform1iv(s, u);
          break;
        case a.FLOAT_MAT2:
          a.uniformMatrix2fv(s, !1, u);
          break;
        case a.FLOAT_MAT3:
          a.uniformMatrix3fv(s, !1, u);
          break;
        case a.FLOAT_MAT4:
          a.uniformMatrix4fv(s, !1, u);
      }
    }
    else a.uniform1i(s, e ? 1 : 0);
    else o === a.INT || o === a.BOOL ? a.uniform1i(s, e) : a.uniform1f(s, e);
  }
  lr(t) {
    const e = this.sr.get(t);
    if (e !== void 0) return e;
    if (this.ir >= this.er) throw Error(`[textmode.js] Shader attempted to bind more than ${this.er} texture samplers. Uniform "${t}" cannot be assigned.`);
    const s = this.ir++;
    return this.sr.set(t, s), s;
  }
  get program() {
    return this.qe;
  }
  dispose() {
    this.Se.deleteProgram(this.qe), super.dispose();
  }
}
const Me = /* @__PURE__ */ new WeakMap();
function Bt(r, t) {
  Me.set(r, t);
}
function Ee(r) {
  return Me.get(r);
}
class je {
  dr = 0;
  _r = 0;
  pr = 0;
  vr = 0;
  mr = 0;
  gr = 0;
  yr = 1;
  wr = 1;
  Ar = 1;
  br = V();
  Mr = V();
  Cr = V();
  Fr(t) {
    t.dr = this.dr, t._r = this._r, t.pr = this.pr, t.vr = this.vr, t.mr = this.mr, t.gr = this.gr, t.yr = this.yr, t.wr = this.wr, t.Ar = this.Ar;
    for (let e = 0; e < 16; e++) t.br[e] = this.br[e];
  }
  Pr(t) {
    this.dr = t.dr, this._r = t._r, this.pr = t.pr, this.vr = t.vr, this.mr = t.mr, this.gr = t.gr, this.yr = t.yr, this.wr = t.wr, this.Ar = t.Ar;
    for (let e = 0; e < 16; e++) this.br[e] = t.br[e];
  }
  Tr(t = 0, e = 0, s = 0) {
    t === 0 && e === 0 && s === 0 || (this.Mr[0] = 1, this.Mr[1] = 0, this.Mr[2] = 0, this.Mr[3] = 0, this.Mr[4] = 0, this.Mr[5] = 1, this.Mr[6] = 0, this.Mr[7] = 0, this.Mr[8] = 0, this.Mr[9] = 0, this.Mr[10] = 1, this.Mr[11] = 0, this.Mr[12] = t, this.Mr[13] = e, this.Mr[14] = s, this.Mr[15] = 1, this.Sr(this.Mr));
  }
  Er(t, e, s) {
    const i = e === void 0 ? t : e, n = s === void 0 ? e === void 0 ? t : 1 : s;
    t === 1 && i === 1 && n === 1 || (this.Mr[0] = t, this.Mr[1] = 0, this.Mr[2] = 0, this.Mr[3] = 0, this.Mr[4] = 0, this.Mr[5] = i, this.Mr[6] = 0, this.Mr[7] = 0, this.Mr[8] = 0, this.Mr[9] = 0, this.Mr[10] = n, this.Mr[11] = 0, this.Mr[12] = 0, this.Mr[13] = 0, this.Mr[14] = 0, this.Mr[15] = 1, this.Sr(this.Mr));
  }
  Or(t) {
    if (t === 0) return;
    const e = z(t);
    this.Mr[0] = 1, this.Mr[1] = 0, this.Mr[2] = 0, this.Mr[3] = 0, this.Mr[4] = 0, this.Mr[5] = Math.cos(e), this.Mr[6] = Math.sin(e), this.Mr[7] = 0, this.Mr[8] = 0, this.Mr[9] = -Math.sin(e), this.Mr[10] = Math.cos(e), this.Mr[11] = 0, this.Mr[12] = 0, this.Mr[13] = 0, this.Mr[14] = 0, this.Mr[15] = 1, this.Sr(this.Mr);
  }
  Lr(t) {
    if (t === 0) return;
    const e = z(t);
    this.Mr[0] = Math.cos(e), this.Mr[1] = 0, this.Mr[2] = -Math.sin(e), this.Mr[3] = 0, this.Mr[4] = 0, this.Mr[5] = 1, this.Mr[6] = 0, this.Mr[7] = 0, this.Mr[8] = Math.sin(e), this.Mr[9] = 0, this.Mr[10] = Math.cos(e), this.Mr[11] = 0, this.Mr[12] = 0, this.Mr[13] = 0, this.Mr[14] = 0, this.Mr[15] = 1, this.Sr(this.Mr);
  }
  Dr(t) {
    if (t === 0) return;
    const e = z(t);
    this.Mr[0] = Math.cos(e), this.Mr[1] = Math.sin(e), this.Mr[2] = 0, this.Mr[3] = 0, this.Mr[4] = -Math.sin(e), this.Mr[5] = Math.cos(e), this.Mr[6] = 0, this.Mr[7] = 0, this.Mr[8] = 0, this.Mr[9] = 0, this.Mr[10] = 1, this.Mr[11] = 0, this.Mr[12] = 0, this.Mr[13] = 0, this.Mr[14] = 0, this.Mr[15] = 1, this.Sr(this.Mr);
  }
  Rr(t, e, s, i) {
    if (t === 0) return;
    const n = Math.hypot(e, s, i);
    if (n < 1e-6) return;
    const h = e / n, o = s / n, c = i / n, a = z(t), u = Math.cos(a), l = Math.sin(a), f = 1 - u;
    this.Mr[0] = f * h * h + u, this.Mr[1] = f * h * o + l * c, this.Mr[2] = f * h * c - l * o, this.Mr[3] = 0, this.Mr[4] = f * h * o - l * c, this.Mr[5] = f * o * o + u, this.Mr[6] = f * o * c + l * h, this.Mr[7] = 0, this.Mr[8] = f * h * c + l * o, this.Mr[9] = f * o * c - l * h, this.Mr[10] = f * c * c + u, this.Mr[11] = 0, this.Mr[12] = 0, this.Mr[13] = 0, this.Mr[14] = 0, this.Mr[15] = 1, this.Sr(this.Mr);
  }
  kr() {
    V(this.br), this.dr = 0, this._r = 0, this.pr = 0, this.vr = 0, this.mr = 0, this.gr = 0, this.yr = 1, this.wr = 1, this.Ar = 1;
  }
  zr(t) {
    if (!this.Hr(t)) throw Error("applyMatrix() only supports affine transform matrices without shear or perspective.");
    this.Sr(t);
  }
  Sr(t) {
    (function(e, s, i = new Float32Array(16)) {
      const n = e[0], h = e[1], o = e[2], c = e[3], a = e[4], u = e[5], l = e[6], f = e[7], y = e[8], m = e[9], p = e[10], g = e[11], v = e[12], w = e[13], A = e[14], T = e[15], b = s[0], S = s[1], R = s[2], C = s[3], U = s[4], q = s[5], B = s[6], j = s[7], dt = s[8], pt = s[9], gt = s[10], mt = s[11], vt = s[12], yt = s[13], wt = s[14], At = s[15];
      i[0] = n * b + a * S + y * R + v * C, i[1] = h * b + u * S + m * R + w * C, i[2] = o * b + l * S + p * R + A * C, i[3] = c * b + f * S + g * R + T * C, i[4] = n * U + a * q + y * B + v * j, i[5] = h * U + u * q + m * B + w * j, i[6] = o * U + l * q + p * B + A * j, i[7] = c * U + f * q + g * B + T * j, i[8] = n * dt + a * pt + y * gt + v * mt, i[9] = h * dt + u * pt + m * gt + w * mt, i[10] = o * dt + l * pt + p * gt + A * mt, i[11] = c * dt + f * pt + g * gt + T * mt, i[12] = n * vt + a * yt + y * wt + v * At, i[13] = h * vt + u * yt + m * wt + w * At, i[14] = o * vt + l * yt + p * wt + A * At, i[15] = c * vt + f * yt + g * wt + T * At;
    })(this.br, t, this.Cr);
    for (let e = 0; e < 16; e++) this.br[e] = this.Cr[e];
    this.Ir();
  }
  Ir() {
    const t = this.br, e = this.vr, s = this.mr, i = this.gr;
    this.dr = t[12], this._r = t[13], this.pr = t[14];
    const n = t[0], h = t[1], o = t[2], c = t[4], a = t[5], u = t[6], l = t[8], f = t[9], y = t[10];
    let m = Math.hypot(n, h, o), p = Math.hypot(c, a, u), g = Math.hypot(l, f, y);
    m < 1e-6 && (m = 1e-6), p < 1e-6 && (p = 1e-6), g < 1e-6 && (g = 1e-6), t[0] * (t[5] * t[10] - t[6] * t[9]) - t[4] * (t[1] * t[10] - t[2] * t[9]) + t[8] * (t[1] * t[6] - t[2] * t[5]) < 0 && (g = -g), this.yr = m, this.wr = p, this.Ar = g;
    const v = n / m, w = c / p, A = f / g, T = y / g, b = Z(l / g, -1, 1), S = Math.asin(b);
    let R, C;
    Math.abs(Math.cos(S)) > 1e-6 ? (R = Math.atan2(-A, T), C = Math.atan2(-w, v)) : (R = Math.atan2(t[6] / p, t[5] / p), C = 0);
    const U = this.jr(R + Math.PI), q = this.jr(Math.PI - S), B = this.jr(C + Math.PI), j = Math.abs(this.jr(R - e)) + Math.abs(this.jr(S - s)) + Math.abs(this.jr(C - i));
    Math.abs(this.jr(U - e)) + Math.abs(this.jr(q - s)) + Math.abs(this.jr(B - i)) < j ? (this.vr = U, this.mr = q, this.gr = B) : (this.vr = R, this.mr = S, this.gr = C);
  }
  jr(t) {
    let e = (t + Math.PI) % (2 * Math.PI);
    return e < 0 && (e += 2 * Math.PI), e - Math.PI;
  }
  Hr(t) {
    if (t.length !== 16 || Math.abs(t[3]) > 1e-6 || Math.abs(t[7]) > 1e-6 || Math.abs(t[11]) > 1e-6 || Math.abs(t[15] - 1) > 1e-6) return !1;
    const e = t[0], s = t[1], i = t[2], n = t[4], h = t[5], o = t[6], c = t[8], a = t[9], u = t[10], l = Math.hypot(e, s, i), f = Math.hypot(n, h, o), y = Math.hypot(c, a, u);
    if (l < 1e-6 || f < 1e-6 || y < 1e-6) return !1;
    const m = e / l, p = s / l, g = i / l, v = n / f, w = h / f, A = o / f, T = c / y, b = a / y, S = u / y, R = m * T + p * b + g * S, C = v * T + w * b + A * S;
    return Math.abs(m * v + p * w + g * A) < 1e-4 && Math.abs(R) < 1e-4 && Math.abs(C) < 1e-4;
  }
}
class Qe {
  ps = !1;
  Br = 0;
  Nr = 0;
  ss = z(28.072486935852957);
  ds = 0.1;
  _s = 4096;
  ts = !0;
  es = 0;
  rs = 0;
  ns = 0;
  Qi = 0;
  Wi = 0;
  Zi = 0;
  qi = 0;
  Ji = 1;
  $i = 0;
  Fr(t) {
    t.ps = this.ps, t.Br = this.Br, t.Nr = this.Nr, t.ss = this.ss, t.ds = this.ds, t._s = this._s, t.ts = this.ts, t.es = this.es, t.rs = this.rs, t.ns = this.ns, t.Qi = this.Qi, t.Wi = this.Wi, t.Zi = this.Zi, t.qi = this.qi, t.Ji = this.Ji, t.$i = this.$i;
  }
  Pr(t) {
    this.ps = t.ps, this.Br = t.Br, this.Nr = t.Nr, this.ss = t.ss, this.ds = t.ds, this._s = t._s, this.ts = t.ts, this.es = t.es, this.rs = t.rs, this.ns = t.ns, this.Qi = t.Qi, this.Wi = t.Wi, this.Zi = t.Zi, this.qi = t.qi, this.Ji = t.Ji, this.$i = t.$i;
  }
  Gr(t) {
    if (t)
      return this.ps ? void 0 : (this.ps = !0, void this.Br++);
    this.ps && (this.ps = !1, this.Br++);
  }
  gs(t, e, s) {
    let i = !1;
    if (t !== void 0) {
      const n = z(Math.max(1, Math.min(179, t)));
      this.ss !== n && (this.ss = n, i = !0);
    }
    e === void 0 && s === void 0 || (i = this.Xr(e, s) || i), this.ps && (this.ps = !1, i = !0), i && this.Br++;
  }
  vs(t, e) {
    let s = !1;
    s = this.Xr(t, e) || s, this.ps || (this.ps = !0, s = !0), s && this.Br++;
  }
  cs(t, e, s, i = 0, n = 0, h = 0, o = 0, c = 1, a = 0) {
    (this.ts || this.es !== t || this.rs !== e || this.ns !== s || this.Qi !== i || this.Wi !== n || this.Zi !== h || this.qi !== o || this.Ji !== c || this.$i !== a) && (this.ts = !1, this.es = t, this.rs = e, this.ns = s, this.Qi = i, this.Wi = n, this.Zi = h, this.qi = o, this.Ji = c, this.$i = a, this.Nr++);
  }
  As(t, e, s, i, n, h) {
    let o = this.Qi !== t || this.Wi !== e || this.Zi !== s;
    i !== void 0 && this.qi !== i && (this.qi = i, o = !0), n !== void 0 && this.Ji !== n && (this.Ji = n, o = !0), h !== void 0 && this.$i !== h && (this.$i = h, o = !0), o && (this.Qi = t, this.Wi = e, this.Zi = s, this.Nr++);
  }
  ws() {
    (!this.ts || this.es !== 0 || this.rs !== 0 || this.ns !== 0 || this.Qi !== 0 || this.Wi !== 0 || this.Zi !== 0 || this.qi !== 0 || this.Ji !== 1 || this.$i !== 0) && (this.ts = !0, this.es = 0, this.rs = 0, this.ns = 0, this.Qi = 0, this.Wi = 0, this.Zi = 0, this.qi = 0, this.Ji = 1, this.$i = 0, this.Nr++);
  }
  Yr() {
    this.ps && (this.ps = !1, this.Br++);
  }
  Xr(t, e) {
    if (t === void 0 && e === void 0) return !1;
    const s = t === void 0 ? this.ds : Math.max(1e-4, t), i = s + 1e-4, n = e === void 0 ? Math.max(this._s, i) : Math.max(i, e);
    return (s !== this.ds || n !== this._s) && (this.ds = s, this._s = n, !0);
  }
}
const G = 15;
class Ge {
  Vr = new Float32Array(3);
  Qr = 0;
  Kr = new Float32Array(G);
  Wr = new Float32Array(G);
  Zr = new Float32Array([1, 0, 0]);
  qr = 0;
  Fr(t) {
    t.Vr[0] = this.Vr[0], t.Vr[1] = this.Vr[1], t.Vr[2] = this.Vr[2], t.Qr = this.Qr, t.qr = this.qr;
    for (let e = 0; e < G; e++) t.Kr[e] = this.Kr[e], t.Wr[e] = this.Wr[e];
    t.Zr[0] = this.Zr[0], t.Zr[1] = this.Zr[1], t.Zr[2] = this.Zr[2];
  }
  Pr(t) {
    this.Vr[0] = t.Vr[0], this.Vr[1] = t.Vr[1], this.Vr[2] = t.Vr[2], this.Qr = t.Qr, this.qr = t.qr;
    for (let e = 0; e < G; e++) this.Kr[e] = t.Kr[e], this.Wr[e] = t.Wr[e];
    this.Zr[0] = t.Zr[0], this.Zr[1] = t.Zr[1], this.Zr[2] = t.Zr[2];
  }
  Jr(t, e, s) {
    this.Vr[0] += t, this.Vr[1] += e, this.Vr[2] += s, this.qr++;
  }
  $r(t, e, s, i, n, h) {
    if (this.Qr >= 5) return;
    const o = 3 * this.Qr;
    this.Kr[o] = i, this.Kr[o + 1] = n, this.Kr[o + 2] = h, this.Wr[o] = t, this.Wr[o + 1] = e, this.Wr[o + 2] = s, this.Qr++, this.qr++;
  }
  tn(t, e, s) {
    let i = Math.max(0, t);
    const n = Math.max(0, e), h = Math.max(0, s);
    i === 0 && n === 0 && h === 0 && (i = 1), this.Zr[0] === i && this.Zr[1] === n && this.Zr[2] === h || (this.Zr[0] = i, this.Zr[1] = n, this.Zr[2] = h, this.qr++);
  }
  sn() {
    const t = this.Vr[0] !== 0 || this.Vr[1] !== 0 || this.Vr[2] !== 0, e = this.Qr > 0, s = this.Zr[0] !== 1 || this.Zr[1] !== 0 || this.Zr[2] !== 0;
    if (t || e || s) {
      this.Vr[0] = 0, this.Vr[1] = 0, this.Vr[2] = 0, this.Qr = 0;
      for (let i = 0; i < G; i++) this.Kr[i] = 0, this.Wr[i] = 0;
      this.Zr[0] = 1, this.Zr[1] = 0, this.Zr[2] = 0, this.qr++;
    }
  }
  Js() {
    const t = this.Vr[0] !== 0 || this.Vr[1] !== 0 || this.Vr[2] !== 0;
    if (this.Qr !== 0 || t) {
      this.Vr[0] = 0, this.Vr[1] = 0, this.Vr[2] = 0, this.Qr = 0;
      for (let e = 0; e < G; e++) this.Kr[e] = 0, this.Wr[e] = 0;
      this.qr++;
    }
  }
}
function St(r, t, e, s, i = 255) {
  r[0] = t / 255, r[1] = (e ?? t) / 255, r[2] = (s ?? t) / 255, r[3] = i / 255;
}
class $e {
  en = 1;
  rn = [0, 0, 0];
  nn = "";
  hn = [1, 1, 1, 1];
  an = [0, 0, 0, 1];
  cn = !1;
  un = !1;
  ln = !1;
  dn = 0;
  _n = [0, 0, 0, 1];
  Fr(t) {
    t.pn = this.en, t.vn = this.cn, t.mn = this.un, t.ln = this.ln, t.dn = this.dn, t.gn[0] = this.rn[0], t.gn[1] = this.rn[1], t.gn[2] = this.rn[2], t.yn = this.nn, t.wn[0] = this.hn[0], t.wn[1] = this.hn[1], t.wn[2] = this.hn[2], t.wn[3] = this.hn[3], t.An[0] = this.an[0], t.An[1] = this.an[1], t.An[2] = this.an[2], t.An[3] = this.an[3];
  }
  Pr(t) {
    this.en = t.pn, this.cn = t.vn, this.un = t.mn, this.ln = t.ln, this.dn = t.dn, this.rn[0] = t.gn[0], this.rn[1] = t.gn[1], this.rn[2] = t.gn[2], this.nn = t.yn, this.hn[0] = t.wn[0], this.hn[1] = t.wn[1], this.hn[2] = t.wn[2], this.hn[3] = t.wn[3], this.an[0] = t.An[0], this.an[1] = t.An[1], this.an[2] = t.An[2], this.an[3] = t.An[3];
  }
  bn(t) {
    this.en = Math.abs(t);
  }
  Mn(t) {
    this.rn[0] = t[0], this.rn[1] = t[1], this.rn[2] = t[2];
  }
  xn(t) {
    this.nn = t;
  }
  Cn(t, e, s, i = 255) {
    St(this.hn, t, e, s, i);
  }
  Fn(t, e, s, i = 255) {
    St(this.an, t, e, s, i);
  }
  Pn(t) {
    this.cn = t;
  }
  Tn(t) {
    this.un = t;
  }
  Sn(t) {
    this.ln = t;
  }
  En(t) {
    this.dn = me(t);
  }
  On(t, e, s, i) {
    St(this._n, t, e, s, i);
  }
}
class Dt {
  Ln = new je();
  Ki = new Qe();
  $s = new Ge();
  gn = new $e();
  Dn = [];
  Rn = [];
  static kn() {
    return { pn: 1, dr: 0, _r: 0, pr: 0, vr: 0, mr: 0, gr: 0, yr: 1, wr: 1, Ar: 1, br: V(), dn: 0, vn: !1, mn: !1, ln: !1, ps: !1, Br: 0, Nr: 0, ss: z(28.072486935852957), ds: 0.1, _s: 4096, ts: !0, es: 0, rs: 0, ns: 0, Qi: 0, Wi: 0, Zi: 0, qi: 0, Ji: 1, $i: 0, Qr: 0, Kr: new Float32Array(15), Wr: new Float32Array(15), Vr: new Float32Array(3), Zr: new Float32Array([1, 0, 0]), qr: 0, gn: [0, 0, 0], yn: "", wn: [1, 1, 1, 1], An: [0, 0, 0, 1] };
  }
  zn(t) {
    this.Ln.Fr(t), this.Ki.Fr(t), this.$s.Fr(t), this.gn.Fr(t);
  }
  Hn(t) {
    this.Ln.Pr(t), this.Ki.Pr(t), this.$s.Pr(t), this.gn.Pr(t);
  }
  Ge() {
    let t = this.Rn.pop();
    t || (t = Dt.kn()), this.zn(t), this.Dn.push(t);
  }
  Xe() {
    const t = this.Dn.pop();
    t ? (this.Hn(t), this.Rn.push(t)) : console.warn("pop() called without matching push()");
  }
  te() {
    this.Ln.kr(), this.Ki.Yr();
  }
}
var x = ((r) => (r.RECTANGLE = "rectangle", r.LINE = "line", r.ELLIPSE = "ellipse", r.ARC = "arc", r.TRIANGLE = "triangle", r.BEZIER_CURVE = "bezier_curve", r.BOX = "box", r.SPHERE = "sphere", r.TORUS = "torus", r.CONE = "cone", r.CYLINDER = "cylinder", r.ELLIPSOID = "ellipsoid", r))(x || {});
const ts = { rectangle: 2, line: 2, ellipse: 2, triangle: 2, arc: 3, bezier_curve: 4, box: 5, sphere: 6, torus: 7, cone: 8, cylinder: 5, ellipsoid: 6 }, Xt = new Float32Array([-0.5, -0.5, 0, 0, 0.5, -0.5, 1, 0, -0.5, 0.5, 0, 1, -0.5, 0.5, 0, 1, 0.5, -0.5, 1, 0, 0.5, 0.5, 1, 1]), Y = { In: 16, jn: WebGL2RenderingContext.TRIANGLES, Bn: { Nn: { size: 2, offset: 0 }, Gn: { size: 2, offset: 8 } } };
class es {
  Se;
  Xn;
  Yn;
  constructor(t) {
    this.Se = t, this.Xn = t.createBuffer(), this.Yn = new Float32Array(Xt.length);
  }
  Vn(t, e, s, i) {
    const n = this.Se, h = Ee(this.Se), o = h[2], c = h[3], a = t / o * 2 - 1, u = (t + s) / o * 2 - 1, l = 1 - (e + i) / c * 2, f = 1 - e / c * 2, y = Xt, m = this.Yn;
    for (let p = 0; p < y.length; p += 4) {
      const g = y[p], v = y[p + 1], w = y[p + 2], A = y[p + 3], T = a + (g + 0.5) * (u - a), b = l + (v + 0.5) * (f - l);
      m[p] = T, m[p + 1] = b, m[p + 2] = w, m[p + 3] = A;
    }
    n.bindBuffer(n.ARRAY_BUFFER, this.Xn), n.bufferData(n.ARRAY_BUFFER, m, n.DYNAMIC_DRAW), ot(n, 0, 2, 16, 0), ot(n, 1, 2, 16, 8), n.drawArrays(n.TRIANGLES, 0, 6), n.disableVertexAttribArray(1), n.disableVertexAttribArray(0), n.bindBuffer(n.ARRAY_BUFFER, null);
  }
  L() {
    this.Se.deleteBuffer(this.Xn);
  }
}
class ss {
  Se;
  Qn = /* @__PURE__ */ new Map();
  Kn = null;
  constructor(t) {
    this.Se = t;
  }
  Wn(t, e, s, i, n) {
    const h = this.Se, o = t.program;
    let c = this.Qn.get(t);
    c || (c = /* @__PURE__ */ new Map(), this.Qn.set(t, c), t.j(() => this.Zn(t)));
    let a = c.get(e) || null;
    if (a) this.Kn !== a && (h.bindVertexArray(a), this.Kn = a);
    else {
      a = h.createVertexArray(), c.set(e, a), h.bindVertexArray(a), this.Kn = a, h.bindBuffer(h.ARRAY_BUFFER, i), n && h.bindBuffer(h.ELEMENT_ARRAY_BUFFER, n);
      const u = h.getAttribLocation(o, "A0");
      u !== -1 && ot(h, u, s.Bn.Nn.size, s.In, s.Bn.Nn.offset, 0, h.FLOAT, !1);
      const l = h.getAttribLocation(o, "A1");
      l !== -1 && ot(h, l, s.Bn.Gn.size, s.In, s.Bn.Gn.offset, 0, h.FLOAT, !1);
    }
  }
  Zn(t) {
    const e = this.Qn.get(t);
    if (e) {
      for (const [, s] of e) s && this.Se.deleteVertexArray(s);
      this.Qn.delete(t);
    }
  }
  qn() {
    this.Kn !== null && (this.Se.bindVertexArray(null), this.Kn = null);
  }
  L() {
    for (const [, t] of this.Qn) for (const [, e] of t) e && this.Se.deleteVertexArray(e);
    this.Qn.clear();
  }
}
class k {
  static BYTES_PER_INSTANCE = 144;
  static FLOATS_PER_INSTANCE = 36;
}
function N(r, t) {
  return { location: -1, size: r, type: WebGL2RenderingContext.FLOAT, normalized: !1, stride: k.BYTES_PER_INSTANCE, offset: t, divisor: 1 };
}
class ie {
  static STRIDE = k.BYTES_PER_INSTANCE;
  static ATTRIBUTES = { A2: N(2, 0), A3: N(2, 8), A4: N(3, 16), A5: N(4, 28), A6: N(4, 44), A7: N(4, 60), A8: N(3, 76), A9: N(3, 88), Ab: N(4, 100), Ac: N(4, 116), Aa: N(3, 132) };
}
class is {
  Jn;
  $n;
  th;
  ih = 0;
  sh = 0;
  constructor(t = 1e3, e = 1.5) {
    this.$n = t, this.th = e;
    const s = t * k.FLOATS_PER_INSTANCE;
    this.Jn = new Float32Array(s);
  }
  eh(t) {
    if (t <= this.$n) return;
    const e = Math.ceil(t * this.th), s = this.$n;
    this.$n = e;
    const i = new Float32Array(e * k.FLOATS_PER_INSTANCE), n = s * k.FLOATS_PER_INSTANCE;
    i.set(this.Jn.subarray(0, Math.min(n, this.ih))), this.Jn = i;
  }
  rh(t) {
    this.ih += t, this.sh++;
  }
  nh() {
    this.ih = 0, this.sh = 0;
  }
  hh(t = 0, e) {
    return this.Jn.subarray(t, e ?? this.ih);
  }
}
class rs {
  Jn;
  constructor(t) {
    this.Jn = t;
  }
  oh(t) {
    this.Jn.sh >= this.Jn.$n && this.Jn.eh(this.Jn.sh + 1);
    const e = this.Jn.Jn, s = this.Jn.ih;
    e[s + 0] = t.x, e[s + 1] = t.y, e[s + 2] = t.width, e[s + 3] = t.height, e[s + 4] = t.char0, e[s + 5] = t.char1, e[s + 6] = t.char2, e[s + 7] = t.r1, e[s + 8] = t.g1, e[s + 9] = t.b1, e[s + 10] = t.a1, e[s + 11] = t.r2, e[s + 12] = t.g2, e[s + 13] = t.b2, e[s + 14] = t.a2, e[s + 15] = t.invert, e[s + 16] = t.flipX, e[s + 17] = t.flipY, e[s + 18] = t.charRot, e[s + 19] = t.translationX, e[s + 20] = t.translationY, e[s + 21] = t.translationZ, e[s + 22] = t.rotationX, e[s + 23] = t.rotationY, e[s + 24] = t.rotationZ;
    const i = t.curveParams0, n = t.curveParams1;
    return e[s + 25] = i[0], e[s + 26] = i[1], e[s + 27] = i[2], e[s + 28] = i[3], e[s + 29] = n[0], e[s + 30] = n[1], e[s + 31] = n[2], e[s + 32] = n[3], e[s + 33] = t.depth, e[s + 34] = t.baseZ, e[s + 35] = t.geometryType, this.Jn.rh(k.FLOATS_PER_INSTANCE), this.Jn.sh - 1;
  }
}
class ns {
  Se;
  ah = null;
  uh = 0;
  fh = /* @__PURE__ */ new WeakMap();
  dh = 0;
  _h = /* @__PURE__ */ new WeakMap();
  constructor(t, e = 1e3) {
    this.Se = t, this.ph(e);
  }
  ph(t) {
    const e = this.Se;
    this.ah && e.deleteBuffer(this.ah), this.dh++, this.ah = e.createBuffer();
    const s = t * k.BYTES_PER_INSTANCE;
    Wt(e, e.ARRAY_BUFFER, this.ah, s, e.DYNAMIC_DRAW), this.uh = t;
  }
  mh(t) {
    this.ph(t);
  }
  gh(t, e) {
    if (e === 0) return;
    const s = this.Se;
    s.bindBuffer(s.ARRAY_BUFFER, this.ah);
    const i = e * k.FLOATS_PER_INSTANCE;
    s.bufferSubData(s.ARRAY_BUFFER, 0, t, 0, i);
  }
  yh(t) {
    let e = this.fh.get(t);
    if (!e) {
      e = /* @__PURE__ */ new Map();
      const s = this.Se;
      for (const i in ie.ATTRIBUTES) {
        const n = i, h = s.getAttribLocation(t, n);
        h !== -1 && e.set(n, h);
      }
      this.fh.set(t, e);
    }
    return e;
  }
  wh(t) {
    const e = this.Se, s = t.program;
    if (this._h.get(s) === this.dh) return;
    const i = this.yh(s);
    for (const [n, h] of i) {
      const o = ie.ATTRIBUTES[n];
      o && ot(e, h, o.size, o.stride, o.offset, o.divisor, o.type, o.normalized);
    }
    this._h.set(s, this.dh);
  }
  L() {
    this.ah && (this.Se.deleteBuffer(this.ah), this.ah = null);
  }
}
class hs {
  Se;
  Jn;
  Ah;
  bh;
  constructor(t, e = 1e3, s = 1.5) {
    this.Se = t, this.Jn = new is(e, s), this.Ah = new rs(this.Jn), this.bh = new ns(t, e);
  }
  Mh(t) {
    const e = this.Jn;
    e.sh >= e.$n && e.eh(e.sh + 1);
    const s = e.Jn, i = e.ih;
    return s[i + 0] = t.Nn[0], s[i + 1] = t.Nn[1], s[i + 2] = t.xh[0], s[i + 3] = t.xh[1], s[i + 4] = t.gn[0], s[i + 5] = t.gn[1], s[i + 6] = t.gn[2], s[i + 7] = t.wn[0], s[i + 8] = t.wn[1], s[i + 9] = t.wn[2], s[i + 10] = t.wn[3], s[i + 11] = t.An[0], s[i + 12] = t.An[1], s[i + 13] = t.An[2], s[i + 14] = t.An[3], s[i + 15] = t.Ch[0], s[i + 16] = t.Ch[1], s[i + 17] = t.Ch[2], s[i + 18] = t.dn, s[i + 19] = t.Fh?.[0] ?? 0, s[i + 20] = t.Fh?.[1] ?? 0, s[i + 21] = t.Fh?.[2] ?? 0, s[i + 22] = t.Fs?.[0] ?? 0, s[i + 23] = t.Fs?.[1] ?? 0, s[i + 24] = t.Fs?.[2] ?? 0, t.Ph && t.Th ? (s[i + 25] = t.Sh?.[0] ?? 0, s[i + 26] = t.Sh?.[1] ?? 0, s[i + 27] = t.Eh?.[0] ?? 0, s[i + 28] = t.Eh?.[1] ?? 0, s[i + 29] = t.Ph[0], s[i + 30] = t.Ph[1], s[i + 31] = t.Th[0], s[i + 32] = t.Th[1]) : t.Oh ? (s[i + 25] = t.Oh[0], s[i + 26] = t.Oh[1], s[i + 27] = 0, s[i + 28] = 0, s[i + 29] = 0, s[i + 30] = 0, s[i + 31] = 0, s[i + 32] = 0) : (s[i + 25] = 0, s[i + 26] = 0, s[i + 27] = 0, s[i + 28] = 0, s[i + 29] = 0, s[i + 30] = 0, s[i + 31] = 0, s[i + 32] = 0), s[i + 33] = t.Lh || 0, s[i + 34] = t.Dh || 0, s[i + 35] = t.Rh || 0, e.rh(k.FLOATS_PER_INSTANCE), e.sh - 1;
  }
  kh() {
    this.Jn.$n > this.bh.uh && this.bh.mh(this.Jn.$n);
  }
  get instanceBuffer() {
    return this.Jn;
  }
  get writer() {
    return this.Ah;
  }
  zh() {
    this.Jn.nh();
  }
  wh(t) {
    const e = this.Jn.sh;
    if (e === 0) return;
    this.kh();
    const s = this.Jn.hh();
    this.bh.gh(s, e), this.bh.wh(t);
  }
  Vn(t, e) {
    const s = this.Jn.sh;
    s !== 0 && this.Se.drawArraysInstanced(t, 0, e, s);
  }
  Hh(t, e, s, i = 0) {
    const n = this.Jn.sh;
    n !== 0 && this.Se.drawElementsInstanced(t, e, s, i, n);
  }
  L() {
    this.bh.L();
  }
}
class J {
  Se;
  Ih;
  jh;
  Bh;
  Nh = null;
  Gh = null;
  Xh = [0, 0, 0, 0];
  Yh = [0, 0, 0, 0];
  Vh;
  constructor(t, e, s, i) {
    var n, h;
    this.Se = t, this.Ih = e, this.jh = s, this.Bh = i, this.Vh = (n = this.Xh, h = this.Yh, { x: 0, y: 0, width: 0, height: 0, char0: 0, char1: 0, char2: 0, r1: 0, g1: 0, b1: 0, a1: 0, r2: 0, g2: 0, b2: 0, a2: 0, invert: 0, flipX: 0, flipY: 0, charRot: 0, translationX: 0, translationY: 0, translationZ: 0, rotationX: 0, rotationY: 0, rotationZ: 0, curveParams0: n, curveParams1: h, depth: 0, baseZ: 0, geometryType: 0 });
    const o = this.Se.createBuffer();
    if (Wt(this.Se, this.Se.ARRAY_BUFFER, o, this.Bh.Qh, this.Se.STATIC_DRAW), this.Nh = o, this.Bh.Kh) {
      const c = this.Se.createBuffer();
      Wt(this.Se, this.Se.ELEMENT_ARRAY_BUFFER, c, this.Bh.Kh, this.Se.STATIC_DRAW), this.Gh = c;
    }
  }
  get type() {
    return this.jh;
  }
  get unitGeometry() {
    return this.Bh;
  }
  get unitBuffer() {
    return this.Nh;
  }
  get unitIndexBuffer() {
    return this.Gh;
  }
  get batch() {
    return this.Ih;
  }
  Wh() {
    this.Ih.zh();
  }
  Zh() {
    return this.Ih.Jn.sh !== 0;
  }
  L() {
    this.Ih.L(), this.Se.deleteBuffer(this.Nh), this.Gh && this.Se.deleteBuffer(this.Gh);
  }
  oh(t, e, s, i, n, h) {
    const o = n.dr ?? 0, c = n._r ?? 0, a = n.pr ?? 0, u = n.vr ?? 0, l = n.mr ?? 0, f = n.gr ?? 0, y = n.yr ?? 1, m = n.wr ?? 1, p = n.Ar ?? 1, g = this.Xh, v = this.Yh;
    g[0] = 0, g[1] = 0, g[2] = 0, g[3] = 0, v[0] = 0, v[1] = 0, v[2] = 0, v[3] = 0, h && (h.bezStartX !== void 0 && h.bezStartY !== void 0 && h.bezEndX !== void 0 && h.bezEndY !== void 0 ? (g[0] = h.cp1x ?? 0, g[1] = h.cp1y ?? 0, g[2] = h.cp2x ?? 0, g[3] = h.cp2y ?? 0, v[0] = h.bezStartX ?? 0, v[1] = h.bezStartY ?? 0, v[2] = h.bezEndX ?? 0, v[3] = h.bezEndY ?? 0) : h.arcStart === void 0 && h.arcStop === void 0 || (g[0] = h.arcStart ?? 0, g[1] = h.arcStop ?? 0));
    const w = this.Vh;
    return w.x = t * y, w.y = e * m, w.width = s * y, w.height = i * m, w.char0 = n.gn[0], w.char1 = n.gn[1], w.char2 = n.gn[2], w.r1 = n.wn[0], w.g1 = n.wn[1], w.b1 = n.wn[2], w.a1 = n.wn[3], w.r2 = n.An[0], w.g2 = n.An[1], w.b2 = n.An[2], w.a2 = n.An[3], w.invert = n.ln ? 1 : 0, w.flipX = n.vn ? 1 : 0, w.flipY = n.mn ? 1 : 0, w.charRot = n.dn, w.translationX = o, w.translationY = c, w.translationZ = a, w.rotationX = u, w.rotationY = l, w.rotationZ = f, w.depth = (h?.depth ?? 0) * p, w.baseZ = (h?.baseZ ?? 0) * p, w.geometryType = ts[this.jh] ?? 0, this.Ih.writer.oh(w);
  }
}
const os = { Qh: Xt, qh: 6, ...Y };
class as extends J {
  constructor(t, e) {
    super(t, e, x.RECTANGLE, os);
  }
  Mh(t, e) {
    return this.oh(0, 0, t.width, t.height, e);
  }
}
const cs = { Qh: new Float32Array([0, -0.5, 0, 0, 1, -0.5, 1, 0, 0, 0.5, 0, 1, 0, 0.5, 0, 1, 1, -0.5, 1, 0, 1, 0.5, 1, 1]), qh: 6, ...Y };
class us extends J {
  constructor(t, e) {
    super(t, e, x.LINE, cs);
  }
  Mh(t, e) {
    const s = t.x2 - t.x1, i = t.y2 - t.y1, n = Math.hypot(s, i), h = Math.atan2(i, s), o = e.pn || 1, c = Math.cos(-h), a = Math.sin(-h), u = t.x1 * c - t.y1 * a, l = t.x1 * a + t.y1 * c, f = { ...e, gr: (e.gr || 0) + h };
    return this.oh(u, l, n, o, f);
  }
}
const ls = { Qh: (function(r = 32) {
  const t = [], e = 2 * Math.PI / r;
  for (let s = 0; s < r; s++) {
    const i = s * e, n = (s + 1) % r * e, h = Math.cos(i), o = Math.sin(i), c = 0.5 * (h + 1), a = 0.5 * (o + 1), u = Math.cos(n), l = Math.sin(n), f = 0.5 * (u + 1), y = 0.5 * (l + 1);
    t.push(0, 0, 0.5, 0.5, h, o, c, a, u, l, f, y);
  }
  return new Float32Array(t);
})(32), qh: 96, ...Y };
class fs extends J {
  constructor(t, e) {
    super(t, e, x.ELLIPSE, ls);
  }
  Mh(t, e) {
    return this.oh(0, 0, t.width, t.height, e);
  }
}
const ds = { Qh: (function(r) {
  const t = [];
  for (let e = 0; e < r; e++) {
    const s = e / r, i = (e + 1) / r;
    t.push(s, 0, s, 0, s, 1, s, 1, i, 1, i, 1);
  }
  return new Float32Array(t);
})(32), qh: 96, ...Y };
class ps extends J {
  constructor(t, e) {
    super(t, e, x.ARC, ds);
  }
  Mh(t, e) {
    const s = z(t.start), i = z(t.stop);
    return this.oh(0, 0, t.width, t.height, e, { arcStart: s, arcStop: i });
  }
}
const gs = { Qh: new Float32Array([0, 0, 0, 0, 1, 0, 1, 0, 0.5, 1, 0.5, 1]), qh: 3, ...Y };
class ms extends J {
  constructor(t, e) {
    super(t, e, x.TRIANGLE, gs);
  }
  Mh(t, e) {
    const s = Math.min(t.x1, t.x2, t.x3), i = Math.max(t.x1, t.x2, t.x3), n = Math.min(t.y1, t.y2, t.y3), h = i - s, o = Math.max(t.y1, t.y2, t.y3) - n;
    return this.oh(s, n, h, o, e);
  }
}
const vs = { Qh: (function(r = 16) {
  const t = [];
  for (let e = 0; e < r; e++) {
    const s = e / r, i = (e + 1) / r;
    t.push(s, -0.5, s, 0, i, -0.5, i, 0, s, 0.5, s, 1, s, 0.5, s, 1, i, -0.5, i, 0, i, 0.5, i, 1);
  }
  return new Float32Array(t);
})(16), qh: 96, ...Y };
class ys extends J {
  constructor(t, e) {
    super(t, e, x.BEZIER_CURVE, vs);
  }
  Mh(t, e) {
    return this.oh(0, 0, 1, e.pn || 1, e, { cp1x: t.cp1x, cp1y: t.cp1y, cp2x: t.cp2x, cp2y: t.cp2y, bezStartX: t.x1, bezStartY: t.y1, bezEndX: t.x2, bezEndY: t.y2 });
  }
}
class $ extends J {
  constructor(t, e, s, i) {
    super(t, e, s, (function(n) {
      return { Qh: n.vertices, Kh: n.indices, qh: n.vertices.length / 4, Jh: n.indices.length, $h: WebGL2RenderingContext.UNSIGNED_SHORT, ...Y };
    })(i));
  }
  Mh(t, e) {
    return this.oh(0, 0, t.width, t.height, e, { depth: t.depth });
  }
}
const ws = { vertices: new Float32Array([-0.5, -0.5, 0.5, 0, 0.5, -0.5, 0.5, 0, 0.5, 0.5, 0.5, 0, -0.5, 0.5, 0.5, 0, 0.5, -0.5, -0.5, 0, -0.5, -0.5, -0.5, 0, -0.5, 0.5, -0.5, 0, 0.5, 0.5, -0.5, 0, -0.5, -0.5, -0.5, 0, -0.5, -0.5, 0.5, 0, -0.5, 0.5, 0.5, 0, -0.5, 0.5, -0.5, 0, 0.5, -0.5, 0.5, 0, 0.5, -0.5, -0.5, 0, 0.5, 0.5, -0.5, 0, 0.5, 0.5, 0.5, 0, -0.5, 0.5, 0.5, 0, 0.5, 0.5, 0.5, 0, 0.5, 0.5, -0.5, 0, -0.5, 0.5, -0.5, 0, -0.5, -0.5, -0.5, 0, 0.5, -0.5, -0.5, 0, 0.5, -0.5, 0.5, 0, -0.5, -0.5, 0.5, 0]), indices: new Uint16Array([0, 1, 2, 0, 2, 3, 4, 5, 6, 4, 6, 7, 8, 9, 10, 8, 10, 11, 12, 13, 14, 12, 14, 15, 16, 17, 18, 16, 18, 19, 20, 21, 22, 20, 22, 23]) }, re = (function(r = 12, t = 16) {
  const e = [], s = [];
  for (let n = 0; n <= r; n++) {
    const h = n / r * Math.PI, o = Math.sin(h), c = Math.cos(h);
    for (let a = 0; a <= t; a++) {
      const u = a / t * Math.PI * 2, l = Math.sin(u), f = Math.cos(u) * o * 0.5, y = 0.5 * c, m = l * o * 0.5;
      e.push(f, y, m, 0);
    }
  }
  const i = t + 1;
  for (let n = 0; n < r; n++) for (let h = 0; h < t; h++) {
    const o = n * i + h, c = o + i;
    s.push(o, c, o + 1, o + 1, c, c + 1);
  }
  return { vertices: new Float32Array(e), indices: new Uint16Array(s) };
})(14, 20), As = (function(r = 16, t = 12) {
  const e = [], s = [];
  for (let n = 0; n <= r; n++) {
    const h = n / r * Math.PI * 2, o = Math.cos(h), c = Math.sin(h);
    for (let a = 0; a <= t; a++) {
      const u = a / t * Math.PI * 2, l = Math.cos(u), f = Math.sin(u);
      e.push(o, c, l, f);
    }
  }
  const i = t + 1;
  for (let n = 0; n < r; n++) for (let h = 0; h < t; h++) {
    const o = n * i + h, c = (n + 1) * i + h;
    s.push(o, c, o + 1, o + 1, c, c + 1);
  }
  return { vertices: new Float32Array(e), indices: new Uint16Array(s) };
})(20, 16), bs = (function(r = 20) {
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
})(24), xs = (function(r = 24) {
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
    const n = (i + 1) % r, h = 2 + i, o = 2 + n, c = s + i, a = s + n;
    e.push(0, o, h), e.push(1, c, a), e.push(h, c, o), e.push(o, c, a);
  }
  return { vertices: new Float32Array(t), indices: new Uint16Array(e) };
})(24), Ms = { [x.RECTANGLE]: (r, t) => new as(r, t), [x.LINE]: (r, t) => new us(r, t), [x.ELLIPSE]: (r, t) => new fs(r, t), [x.ARC]: (r, t) => new ps(r, t), [x.TRIANGLE]: (r, t) => new ms(r, t), [x.BEZIER_CURVE]: (r, t) => new ys(r, t), [x.BOX]: (r, t) => new $(r, t, x.BOX, ws), [x.SPHERE]: (r, t) => new $(r, t, x.SPHERE, re), [x.TORUS]: (r, t) => new $(r, t, x.TORUS, As), [x.CONE]: (r, t) => new $(r, t, x.CONE, bs), [x.CYLINDER]: (r, t) => new $(r, t, x.CYLINDER, xs), [x.ELLIPSOID]: (r, t) => new $(r, t, x.ELLIPSOID, re) };
class Es {
  Se;
  io;
  so;
  eo = null;
  ro = /* @__PURE__ */ new Map();
  no = null;
  ho = "";
  oo = V();
  ao = V();
  co = [0, 0, 0];
  uo = [0, 0, 0];
  lo = [0, 1, 0];
  constructor(t) {
    this.Se = t, this.so = new ss(t), this.io = /* @__PURE__ */ new Map();
    for (const e of Object.values(x)) {
      const s = new hs(t), i = (0, Ms[e])(t, s);
      this.io.set(e, i);
    }
  }
  fo(t) {
    this.eo = null, this.ro.clear(), this.no = null, this.ho = "";
    let e = null, s = null, i = null, n = !1, h = -1, o = -1, c = -1, a = null;
    for (const u of t) e === u.material && s === u.type && n === u.state.ps && h === u.state.Br && o === u.state.Nr && c === u.state.qr || (i && i.Zh() && this.do(i, e, s, a), e = u.material, s = u.type, i = this.io.get(s), n = u.state.ps, h = u.state.Br, o = u.state.Nr, c = u.state.qr, a = u.state, i.Wh()), i.Mh(u.params, u.state);
    i && i.Zh() && this.do(i, e, s, a), this.so.qn();
  }
  do(t, e, s, i) {
    this.eo !== e.shader && (e.shader.ar(), this.eo = e.shader), this.no !== e && (e.shader.re(e.uniforms), this.no = e);
    const n = Ee(this.Se), h = `${i.Br}:${i.Nr}:${i.qr}:${n[2]}:${n[3]}`;
    if (this.ro.get(e.shader) !== h) {
      const a = `${i.Br}:${i.Nr}:${n[2]}:${n[3]}`;
      this.ho !== a && (this._o(i, n[2], n[3]), this.ho = a), e.shader.re({ Us: n[2] / n[3], Ut: this.oo, Uu: this.ao, Uv: i.Qr > 0 || i.Vr[0] !== 0 || i.Vr[1] !== 0 || i.Vr[2] !== 0, Uw: i.Vr, Ux: i.Qr, Uy: i.Kr, Uz: i.Wr, UA: i.Zr }), this.ro.set(e.shader, h);
    }
    const o = t.unitGeometry, c = t.unitBuffer;
    try {
      this.so.Wn(e.shader, s + "", o, c, t.unitIndexBuffer), t.batch.wh(e.shader), o.Kh && o.Jh && o.$h !== void 0 ? t.batch.Hh(o.jn, o.Jh, o.$h, o.po ?? 0) : t.batch.Vn(o.jn, o.qh);
    } finally {
      t.Wh();
    }
  }
  _o(t, e, s) {
    const i = Math.max(1, s), n = Math.max(1 / 4096, e / i), h = t.ds, o = t._s;
    if (this.uo[0] = t.Qi, this.uo[1] = t.Wi, this.uo[2] = t.Zi, this.lo[0] = t.qi, this.lo[1] = t.Ji, this.lo[2] = t.$i, t.ts) {
      const c = 0.5 * i / Math.tan(0.5 * t.ss);
      this.co[0] = this.uo[0], this.co[1] = this.uo[1], this.co[2] = this.uo[2] + c, ee(this.co, this.uo, this.lo, this.oo);
    } else this.co[0] = t.es, this.co[1] = t.rs, this.co[2] = t.ns, ee(this.co, this.uo, this.lo, this.oo);
    if (t.ps) {
      const c = 0.5 * e, a = 0.5 * i;
      return void (function(u, l, f, y, m, p, g = new Float32Array(16)) {
        const v = 1 / (u - l), w = 1 / (f - y), A = 1 / (m - p);
        g[0] = -2 * v, g[1] = 0, g[2] = 0, g[3] = 0, g[4] = 0, g[5] = -2 * w, g[6] = 0, g[7] = 0, g[8] = 0, g[9] = 0, g[10] = 2 * A, g[11] = 0, g[12] = (u + l) * v, g[13] = (y + f) * w, g[14] = (p + m) * A, g[15] = 1;
      })(-c, c, -a, a, h, o, this.ao);
    }
    (function(c, a, u, l, f = new Float32Array(16)) {
      const y = 1 / Math.tan(0.5 * c), m = 1 / (u - l);
      f[0] = y / a, f[1] = 0, f[2] = 0, f[3] = 0, f[4] = 0, f[5] = y, f[6] = 0, f[7] = 0, f[8] = 0, f[9] = 0, f[10] = (l + u) * m, f[11] = -1, f[12] = 0, f[13] = 0, f[14] = 2 * l * u * m, f[15] = 0;
    })(t.ss, n, h, o, this.ao);
  }
  L() {
    for (const t of this.io.values()) t.L();
    this.io.clear(), this.so.L();
  }
}
function _e(r) {
  let t = 0;
  for (let e = 0; e < r.length; e++)
    t = (t << 5) - t + r.charCodeAt(e), t &= t;
  return t;
}
const ne = /* @__PURE__ */ new WeakMap();
let _s = 1;
function he(r) {
  if (r == null) return 0;
  if (typeof r != "object" && typeof r != "function") return _e(r + "");
  let t = ne.get(r);
  return t || (t = _s++, ne.set(r, t)), t;
}
function rt(r, t) {
  return (r << 5) - r + t;
}
const Ht = `#version 300 es
in vec2 A0;in vec2 A1;in vec2 A2;in vec2 A3;in vec3 A4;in vec4 A5;in vec4 A6;in vec4 A7;in vec3 A8;in vec3 A9;in vec3 Aa;uniform mat4 Ut;uniform mat4 Uu;out vec2 v_uv;out vec3 v_glyphIndex;out vec4 v_glyphColor;out vec4 v_cellColor;out vec4 v_glyphFlags;out vec3 v_worldPosition;out vec3 v_normal;out float v_geometryType;const float A=2.0f;vec3 B(vec3 C,float D){float E=cos(D);float F=sin(D);return vec3(C.x,C.y*E-C.z*F,C.y*F+C.z*E);}vec3 G(vec3 C,float D){float E=cos(D);float F=sin(D);return vec3(C.x*E+C.z*F,C.y,-C.x*F+C.z*E);}vec3 H(vec3 C,float D){float E=cos(D);float F=sin(D);return vec3(C.x*E-C.y*F,C.x*F+C.y*E,C.z);}vec3 I(vec3 C,vec3 J){vec3 K=C;if(J.z!=0.0f){K=H(K,J.z);}if(J.y!=0.0f){K=G(K,J.y);}if(J.x!=0.0f){K=B(K,J.x);}return K;}void main(){v_uv=A1;v_glyphIndex=A4;v_glyphColor=A5;v_cellColor=A6;v_glyphFlags=A7;vec2 L=A0.xy*A3+A2;float M=Aa.y;vec3 N=vec3(L,M);vec3 O=I(N,A9)+A8;v_worldPosition=O;v_normal=vec3(0.0f,0.0f,1.0f);v_geometryType=A;vec4 P=Uu*Ut*vec4(O,1.0f);P.y=-P.y;gl_Position=P;}`;
class Ts {
  vo = 0;
  ee;
  We;
  mo;
  yo = /* @__PURE__ */ new Map();
  constructor(t) {
    this.ee = new at(t, `#version 300 es
in vec2 A0;in vec2 A1;in vec2 A2;in vec2 A3;in vec3 A4;in vec4 A5;in vec4 A6;in vec4 A7;in vec3 A8;in vec3 A9;in vec4 Ab;in vec4 Ac;in vec3 Aa;uniform mat4 Ut;uniform mat4 Uu;out vec2 v_uv;out vec3 v_glyphIndex;out vec4 v_glyphColor;out vec4 v_cellColor;out vec4 v_glyphFlags;out vec3 v_worldPosition;out vec3 v_normal;out float v_geometryType;const float A=6.28318530718f;const int B=2;const int C=3;const int D=4;const int E=5;const int F=6;const int G=7;const int H=8;vec2 I(float J,vec2 K,vec2 L,vec2 M,vec2 N){float O=1.0f-J;float P=O*O;float Q=P*O;float R=J*J;float S=R*J;return Q*K+3.0f*P*J*L+3.0f*O*R*M+S*N;}vec2 T(float J,vec2 K,vec2 L,vec2 M,vec2 N){float O=1.0f-J;float P=O*O;float R=J*J;return-3.0f*P*K+3.0f*(P-2.0f*O*J)*L+3.0f*(2.0f*O*J-R)*M+3.0f*R*N;}vec3 U(vec3 V,float W){float X=cos(W);float Y=sin(W);return vec3(V.x,V.y*X-V.z*Y,V.y*Y+V.z*X);}vec3 Z(vec3 V,float W){float X=cos(W);float Y=sin(W);return vec3(V.x*X+V.z*Y,V.y,-V.x*Y+V.z*X);}vec3 a(vec3 V,float W){float X=cos(W);float Y=sin(W);return vec3(V.x*X-V.y*Y,V.x*Y+V.y*X,V.z);}vec3 b(vec3 V,vec3 c){vec3 d=V;if(c.z!=0.0f){d=a(d,c.z);}if(c.y!=0.0f){d=Z(d,c.y);}if(c.x!=0.0f){d=U(d,c.x);}return d;}void main(){v_uv=A1;v_glyphIndex=A4;v_glyphColor=A5;v_cellColor=A6;v_glyphFlags=A7;vec4 e=Ab;vec4 f=Ac;vec2 g=A3;vec2 h=A2;float i=Aa.x;float j=Aa.y;int k=int(Aa.z);vec3 l=vec3(0.0f);if(k==D){float J=clamp(A0.x,0.0f,1.0f);vec2 K=f.xy;vec2 L=e.xy;vec2 M=e.zw;vec2 N=f.zw;vec2 m=I(J,K,L,M,N);vec2 n=T(J,K,L,M,N);float o=length(n);vec2 p=o>0.0f?n/o:vec2(1.0f,0.0f);vec2 q=vec2(-p.y,p.x);vec2 r=m+q*A0.y*g.y;l=vec3(r,j);}else if(k==C){float s=mod(e.x,A);if(s<0.0f){s+=A;}float t=mod(e.y,A);if(t<0.0f){t+=A;}float u=s-t;if(u<=0.0f){u+=A;}float W=s-A0.x*u;vec2 v=vec2(cos(W),sin(W))*A0.y;vec2 r=v*g+h;l=vec3(r,j);}else if(k==B){vec2 r=A0.xy*g+h;l=vec3(r,j);}else if(k==G){float w=max(0.0f,g.x*0.5f);float x=max(0.0f,i*0.5f);float y=max(0.0f,g.y*0.5f);float z=max(0.0f,w-y);float AA=max(0.0f,x-y);float AB=A0.x;float AC=A0.y;float AD=A1.x;float AE=A1.y;float AF=z+y*AD;float AG=AA+y*AD;l=vec3(AF*AB+h.x,y*AE+h.y,AG*AC+j);}else if(k==E||k==F||k==H){l=vec3(A0.x*g.x+h.x,A0.y*g.y+h.y,A1.x*i+j);}vec3 AH=b(l,A9);vec3 AI=AH+A8;vec3 AJ=vec3(0.0f,0.0f,1.0f);v_worldPosition=AI;v_normal=AJ;v_geometryType=float(k);vec4 AK=Uu*Ut*vec4(AI,1.0f);AK.y=-AK.y;gl_Position=AK;}`, `#version 300 es
precision highp float;in vec3 v_glyphIndex;in vec4 v_glyphColor;in vec4 v_cellColor;in vec4 v_glyphFlags;in vec3 v_worldPosition;uniform bool Uv;uniform vec3 Uw;uniform int Ux;uniform vec3 Uy[5];uniform vec3 Uz[5];uniform vec3 UA;layout(location=0)out vec4 o_character;layout(location=1)out vec4 o_primaryColor;layout(location=2)out vec4 o_secondaryColor;layout(location=3)out vec4 A;const int B=5;vec3 C(vec3 D){vec3 E=cross(dFdy(D),dFdx(D));float F=length(E);if(F<=0.000001f){return vec3(0.0f,0.0f,1.0f);}return E/F;}vec3 G(vec3 H,vec3 D){if(!Uv){return H;}vec3 I=H*Uw;if(Ux>0){vec3 E=C(D);for(int J=0;J<B;J++){if(J>=Ux){break;}vec3 K=Uy[J]-D;float L=length(K);vec3 M=L>0.000001f?K/L:E;float N=max(dot(E,M),0.0f);float O=UA.x+L*UA.y+L*L*UA.z;float P=O>0.0f?1.0f/O:1.0f;I+=H*Uz[J]*(N*P);}}return clamp(I,0.0f,1.0f);}void main(){int Q=int(v_glyphFlags.r>0.5?1:0);int R=int(v_glyphFlags.g>0.5?1:0);int S=int(v_glyphFlags.b>0.5?1:0);float T=float(Q|(R<<1)|(S<<2))/255.;o_character=vec4(v_glyphIndex.xy,T,clamp(v_glyphFlags.a,0.,1.));vec3 U=G(v_glyphColor.rgb,v_worldPosition);vec3 V=G(v_cellColor.rgb,v_worldPosition);o_primaryColor=vec4(U,v_glyphColor.a);o_secondaryColor=vec4(V,v_cellColor.a);A=vec4(0.);}`), this.We = new at(t, Ht, `#version 300 es
precision highp float;in vec2 v_uv;in vec3 v_worldPosition;uniform sampler2D Uc;uniform sampler2D Ud;uniform sampler2D Ue;uniform sampler2D Uf;uniform vec2 Ug;uniform bool Uh;uniform bool Ui;uniform bool Uj;uniform bool Uv;uniform vec3 Uw;uniform int Ux;uniform vec3 Uy[5];uniform vec3 Uz[5];uniform vec3 UA;layout(location=0)out vec4 o_character;layout(location=1)out vec4 o_primaryColor;layout(location=2)out vec4 o_secondaryColor;layout(location=3)out vec4 A;const int B=5;vec3 C(vec3 D){vec3 E=cross(dFdy(D),dFdx(D));float F=length(E);if(F<=0.000001f){return vec3(0.0f,0.0f,1.0f);}return E/F;}vec3 G(vec3 H,vec3 D){if(!Uv){return H;}vec3 I=H*Uw;if(Ux>0){vec3 E=C(D);for(int J=0;J<B;J++){if(J>=Ux){break;}vec3 K=Uy[J]-D;float L=length(K);vec3 M=L>0.000001f?K/L:E;float N=max(dot(E,M),0.0f);float O=UA.x+L*UA.y+L*L*UA.z;float P=O>0.0f?1.0f/O:1.0f;I+=H*Uz[J]*(N*P);}}return clamp(I,0.0f,1.0f);}void main(){vec2 Q=vec2(v_uv.x,1.-v_uv.y);vec2 R=Q*Ug;vec2 S=(floor(R)+0.5f)/Ug;vec4 T=texture(Uc,S);vec4 U=Uh?texture(Ud,S):vec4(0.);if(Uh&&U.a==0.){discard;}vec4 V=Ui?texture(Ue,S):vec4(0.);vec4 W=Uj?texture(Uf,S):vec4(0.);vec3 X=G(U.rgb,v_worldPosition);vec3 Y=G(V.rgb,v_worldPosition);o_character=T;o_primaryColor=vec4(X,U.a);o_secondaryColor=vec4(Y,V.a);A=W;}`), this.mo = { id: this.vo++, shader: this.ee, uniforms: Object.freeze({}), hash: this.wo(this.ee, {}), isBuiltIn: !0 };
  }
  Ze(t, e = {}) {
    return { id: this.vo++, shader: t, uniforms: Object.freeze({ ...e }), hash: 0, isBuiltIn: !1 };
  }
  wo(t, e) {
    const s = he(t.program), i = (function(n, h) {
      let o = 0;
      const c = Object.keys(n).sort();
      for (const a of c) o = rt(o, _e(a)), o = rt(o, h(n[a]));
      return o;
    })(e, this.Ao.bind(this));
    return rt(s, i);
  }
  Ao(t) {
    return typeof t == "number" || typeof t == "boolean" ? (function(e) {
      return typeof e == "boolean" ? e ? 1 : 0 : Math.floor(e);
    })(t) : Array.isArray(t) ? (function(e) {
      let s = 0;
      const i = Array.isArray(e[0]) ? e.flat() : e;
      for (const n of i) s = rt(s, typeof n == "number" ? n : 0);
      return s;
    })(t) : t instanceof Float32Array || t instanceof Int32Array ? (function(e) {
      let s = 0;
      const i = Math.min(e.length, 16);
      for (let n = 0; n < i; n++) s = rt(s, e[n]);
      return s;
    })(t) : t instanceof WebGLTexture || st(t) ? he(t) : 0;
  }
  L() {
    this.ee.dispose(), this.We.dispose(), this.yo.clear();
  }
}
class Ss {
  bo = [];
  Mo = 1;
  xh = 0;
  xo(t, e) {
    if (this.xh >= this.bo.length) {
      const i = { id: this.Mo++, type: t, params: {}, state: Dt.kn(), material: e };
      this.bo.push(i);
    }
    const s = this.bo[this.xh];
    return s.id = this.Mo++, s.type = t, s.material = e, this.xh++, s;
  }
  Co(t, e, s) {
    const i = this.xo(x.RECTANGLE, s), n = i.params;
    return n.width = t.width, n.height = t.height, e.zn(i.state), i.id;
  }
  Fo(t, e, s) {
    const i = this.xo(x.LINE, s), n = i.params;
    return n.x1 = t.x1, n.y1 = t.y1, n.x2 = t.x2, n.y2 = t.y2, n.thickness = t.thickness, e.zn(i.state), i.id;
  }
  Po(t, e, s) {
    const i = this.xo(x.ELLIPSE, s), n = i.params;
    return n.width = t.width, n.height = t.height, n.startAngle = t.startAngle, n.endAngle = t.endAngle, n.segments = t.segments, e.zn(i.state), i.id;
  }
  To(t, e, s) {
    const i = this.xo(x.ARC, s), n = i.params;
    return n.width = t.width, n.height = t.height, n.start = t.start, n.stop = t.stop, e.zn(i.state), i.id;
  }
  So(t, e, s) {
    const i = this.xo(x.TRIANGLE, s), n = i.params;
    return n.x1 = t.x1, n.y1 = t.y1, n.x2 = t.x2, n.y2 = t.y2, n.x3 = t.x3, n.y3 = t.y3, e.zn(i.state), i.id;
  }
  Eo(t, e, s) {
    const i = this.xo(x.BEZIER_CURVE, s), n = i.params;
    return n.x1 = t.x1, n.y1 = t.y1, n.cp1x = t.cp1x, n.cp1y = t.cp1y, n.cp2x = t.cp2x, n.cp2y = t.cp2y, n.x2 = t.x2, n.y2 = t.y2, n.thickness = t.thickness, n.segments = t.segments, e.zn(i.state), i.id;
  }
  Oo(t, e, s, i) {
    const n = this.xo(t, i), h = n.params;
    return h.width = e.width, h.height = e.height, h.depth = e.depth, s.zn(n.state), n.id;
  }
  zh() {
    this.xh = 0;
  }
  [Symbol.iterator]() {
    let t = 0;
    const e = this.xh, s = this.bo;
    return { next: () => t < e ? { value: s[t++], done: !1 } : { value: void 0, done: !0 } };
  }
}
class Cs {
  Se;
  eo = null;
  Lo;
  Do;
  Ro;
  ko;
  zo;
  Ho = null;
  Io = {};
  jo = [];
  Bo = [];
  No = [];
  Go = [];
  Xo = null;
  Yo = [0, 0, 0, 0];
  Vo = 1;
  Qo = !0;
  Ko = !0;
  Wo = !1;
  Zo = new Float32Array(4);
  qo = /* @__PURE__ */ new Set();
  constructor(t) {
    this.Se = t, t.enable(t.DEPTH_TEST), t.depthFunc(t.LEQUAL), t.clearDepth(1), t.depthMask(!0), this.Qo = !0, this.Ko = !0, t.disable(t.CULL_FACE), this.Ro = new Dt(), this.Do = new Ts(t), this.ko = new Ss(), this.Lo = new Es(t), this.zo = new es(t);
    const e = [0, 0, t.canvas.width, t.canvas.height];
    Bt(t, e), this.Bo.push(null), this.No.push(e), this.Go.push(1), this.Xo = null, this.Yo = e, this.Vo = 1;
  }
  Be() {
    this.Bo.push(this.Xo), this.No.push([...this.Yo]), this.Go.push(this.Vo);
  }
  Ve() {
    const t = this.Bo.pop() ?? null, e = this.No.pop() ?? [0, 0, this.Se.canvas.width, this.Se.canvas.height], s = this.Go.pop() ?? 1;
    this.Ne(t, e[2], e[3], s);
  }
  Ne(t, e, s, i = 1) {
    const n = this.Se;
    this.Xo !== t && (n.bindFramebuffer(n.FRAMEBUFFER, t), this.Xo = t), this.Vo = i;
    const h = [0, 0, e, s];
    this.Yo[0] === h[0] && this.Yo[1] === h[1] && this.Yo[2] === h[2] && this.Yo[3] === h[3] || (n.viewport(...h), Bt(n, h), this.Yo = h);
  }
  ee(t) {
    this.eo !== t && (this.eo = t, t.ar());
  }
  Jo(t) {
    if (this.Wo = t, t) this.qo.clear();
    else {
      for (const e of this.qo) e.$o();
      this.qo.clear();
    }
  }
  ta() {
    return this.Wo;
  }
  hr(t, e) {
    return new at(this.Se, t, e);
  }
  ia(t) {
    this.Ho = t, t && (this.Io = {});
  }
  sa() {
    this.Ho = null, this.Io = {};
  }
  ur(t, e) {
    this.Io[t] = e;
  }
  re(t) {
    Object.assign(this.Io, t);
  }
  ea(t = !1) {
    this.jo.push({ shader: this.Ho, uniforms: { ...this.Io } }), t && this.sa();
  }
  ra() {
    const t = this.jo.pop();
    t && (this.Ho = t.shader, this.Io = t.shader ? { ...t.uniforms } : {});
  }
  na(t) {
    return new at(this.Se, Ht, t);
  }
  ha(t, e, s, i) {
    t instanceof Tt || !i || t.oa(i);
    const n = t.Qe();
    this.ko.Co({ width: e ?? t.width, height: s ?? t.height }, this.Ro, n), t instanceof Tt || !t.aa() || this.qo.add(t);
  }
  ne(t, e, s, i) {
    this.zo.Vn(t, e, s, i);
  }
  ca(t, e) {
    if (this.Ho) {
      const s = this.Do.Ze(this.Ho, this.Io);
      this.ko.Co({ width: t, height: e }, this.Ro, s);
    } else this.ko.Co({ width: t, height: e }, this.Ro, this.Do.mo);
  }
  ua(t, e, s, i) {
    this.ko.Fo({ x1: t, y1: e, x2: s, y2: i }, this.Ro, this.Do.mo);
  }
  la(t, e) {
    this.ko.Po({ width: t, height: e }, this.Ro, this.Do.mo);
  }
  fa(t, e, s, i, n, h) {
    this.ko.So({ x1: t, y1: e, x2: s, y2: i, x3: n, y3: h }, this.Ro, this.Do.mo);
  }
  da(t, e, s, i, n, h, o, c) {
    this.ko.Eo({ x1: t, y1: e, cp1x: s, cp1y: i, cp2x: n, cp2y: h, x2: o, y2: c }, this.Ro, this.Do.mo);
  }
  _a(t, e, s, i) {
    this.ko.To({ width: t, height: e, start: s, stop: i }, this.Ro, this.Do.mo);
  }
  pa(t, e, s) {
    this.ko.Oo(x.BOX, { width: t, height: e, depth: s }, this.Ro, this.Do.mo);
  }
  va(t) {
    this.ko.Oo(x.SPHERE, { width: 2 * t, height: 2 * t, depth: 2 * t }, this.Ro, this.Do.mo);
  }
  ma(t, e) {
    const s = 2 * (t + e);
    this.ko.Oo(x.TORUS, { width: s, height: 2 * e, depth: s }, this.Ro, this.Do.mo);
  }
  ga(t, e) {
    this.ko.Oo(x.CONE, { width: 2 * t, height: e, depth: 2 * t }, this.Ro, this.Do.mo);
  }
  ya(t, e) {
    this.ko.Oo(x.CYLINDER, { width: 2 * t, height: e, depth: 2 * t }, this.Ro, this.Do.mo);
  }
  wa(t, e, s) {
    this.ko.Oo(x.ELLIPSOID, { width: 2 * t, height: 2 * e, depth: 2 * s }, this.Ro, this.Do.mo);
  }
  et(t, e, s = 1, i = {}) {
    return new Tt(this.Se, t, e, s, i, this);
  }
  ba(t, e = t, s = t, i = 255) {
    this.Ro.gn.On(t, e ?? t, s ?? t, i);
    const [n, h, o, c] = this.Ro.gn._n;
    this.Ma(n, h, o, c, !1);
  }
  zh(t = 0, e = 0, s = 0, i = 0) {
    this.Ma(t, e, s, i, !0);
  }
  Ma(t, e, s, i, n) {
    const h = this.Se, o = this.Zo;
    if (this.Vo > 1) {
      o[0] = n ? 1 : 0, o[1] = n ? 1 : 0, o[2] = 0, o[3] = 0, h.clearBufferfv(h.COLOR, 0, o), o[0] = 0, o[1] = 0, o[2] = 0, o[3] = 0, h.clearBufferfv(h.COLOR, 1, o), this.Vo >= 3 && (o[0] = t, o[1] = e, o[2] = s, o[3] = i, h.clearBufferfv(h.COLOR, 2, o)), this.Vo >= 3 && (o[0] = 0, o[1] = 0, o[2] = 0, o[3] = 0);
      for (let c = 3; c < this.Vo; c++) h.clearBufferfv(h.COLOR, c, o);
    } else h.clearColor(t, e, s, i), h.clear(h.COLOR_BUFFER_BIT);
  }
  xa() {
    const t = [0, 0, this.Se.canvas.width, this.Se.canvas.height];
    this.Se.viewport(...t), Bt(this.Se, t), this.Yo = t, this.No.length > 0 && (this.No[0] = t);
  }
  Ca(t) {
    this.Qo !== t && (t ? this.Se.enable(this.Se.DEPTH_TEST) : this.Se.disable(this.Se.DEPTH_TEST), this.Qo = t);
  }
  Fa(t) {
    this.Ko !== t && (this.Se.depthMask(t), this.Ko = t);
  }
  Pa() {
    return this.Qo;
  }
  Ta() {
    return this.Ko;
  }
  Ye() {
    const t = this.ko;
    this.Lo.fo(t), t.zh(), this.eo = null;
  }
  L() {
    this.Do.L(), this.Lo.L(), this.zo.L();
  }
  get context() {
    return this.Se;
  }
  get state() {
    return this.Ro;
  }
  get materialManager() {
    return this.Do;
  }
}
class Rs {
  v;
  Sa = null;
  Ea = !1;
  Oa;
  La = null;
  Da = !0;
  Se = null;
  Ra = null;
  ka = null;
  za = !1;
  constructor(t = {}) {
    if (this.Ea = t.overlay ?? !1, t.gl) this.La = t.gl, this.v = t.gl.canvas, this.Oa = !1, this.Da = !1;
    else if (this.Ea && t.canvas) this.Sa = t.canvas, this.v = this.Ha(), this.Oa = !0, this.Ia();
    else if (t.canvas) {
      if (typeof HTMLVideoElement < "u" && t.canvas instanceof HTMLVideoElement) throw new M("Video elements are only supported in overlay mode.");
      this.v = t.canvas, this.Oa = !1;
    } else this.v = this.ja(t.width, t.height), this.Oa = !0;
    typeof HTMLCanvasElement < "u" && this.v instanceof HTMLCanvasElement && (this.v.style.imageRendering = "pixelated");
  }
  ja(t, e) {
    const s = document.createElement("canvas");
    return s.className = "textmodeCanvas", s.style.imageRendering = "pixelated", s.width = t || 800, s.height = e || 600, this.Ba(s), s;
  }
  Ba(t) {
    const e = () => {
      if (this.za || t.parentNode) return;
      const s = document.body;
      s && s.appendChild(t);
    };
    document.body ? e() : (this.Ra = () => {
      this.Ra = null, e();
    }, document.addEventListener("DOMContentLoaded", this.Ra, { once: !0 }));
  }
  Ha() {
    const t = document.createElement("canvas");
    t.className = "textmodeCanvas", t.style.imageRendering = "pixelated";
    const e = this.Sa.getBoundingClientRect();
    let s = Math.round(e.width), i = Math.round(e.height);
    if (typeof HTMLVideoElement < "u" && this.Sa instanceof HTMLVideoElement) {
      const o = this.Sa;
      (s === 0 || i === 0) && o.videoWidth > 0 && o.videoHeight > 0 && (s = o.videoWidth, i = o.videoHeight);
    }
    t.width = s, t.height = i, t.style.position = "absolute";
    const n = window.getComputedStyle(this.Sa);
    let h = parseInt(n.zIndex || "0", 10);
    return isNaN(h) && (h = 0), t.style.zIndex = "" + (h + 1), t;
  }
  Ia() {
    this.Na(), this.Ga(), this.Sa?.parentNode || document.readyState !== "loading" || (this.ka = () => {
      this.ka = null, this.za || (this.Na(), this.Ga());
    }, document.addEventListener("DOMContentLoaded", this.ka, { once: !0 }));
  }
  Ga() {
    this.v instanceof HTMLCanvasElement && this.Sa && !this.v.parentNode && this.Sa.parentNode?.insertBefore(this.v, this.Sa.nextSibling);
  }
  Na() {
    if (!this.Sa || !(this.v instanceof HTMLCanvasElement)) return;
    const t = this.Sa.getBoundingClientRect(), e = this.Sa.offsetParent;
    if (e && e !== document.body) {
      const s = e.getBoundingClientRect();
      this.v.style.top = t.top - s.top + "px", this.v.style.left = t.left - s.left + "px";
    } else this.v.style.top = t.top + window.scrollY + "px", this.v.style.left = t.left + window.scrollX + "px";
  }
  oe(t, e) {
    if (this.Ea) {
      const s = this.Sa.getBoundingClientRect();
      this.v.width = Math.round(s.width), this.v.height = Math.round(s.height), this.Na();
    } else this.v.width = t ?? this.v.width, this.v.height = e ?? this.v.height;
  }
  Xa() {
    if (this.La) return this.La;
    const t = this.v.getContext("webgl2", { alpha: !0, premultipliedAlpha: !1, preserveDrawingBuffer: !0, antialias: !1, depth: !0, stencil: !1, powerPreference: "high-performance" });
    if (!t) throw new M("`textmode.js` requires WebGL2 support.");
    return this.Se = t, t;
  }
  L() {
    if (this.za || (this.za = !0, this.Ya(), !this.Da)) return;
    const t = this.Se ?? this.La;
    t && t.getExtension("WEBGL_lose_context")?.loseContext(), this.Oa && typeof HTMLCanvasElement < "u" && this.v instanceof HTMLCanvasElement && this.v.parentNode && this.v.parentNode.removeChild(this.v);
  }
  Ya() {
    this.Ra && (document.removeEventListener("DOMContentLoaded", this.Ra), this.Ra = null), this.ka && (document.removeEventListener("DOMContentLoaded", this.ka), this.ka = null);
  }
  get canvas() {
    return this.v;
  }
  get targetCanvas() {
    return this.Sa;
  }
  get width() {
    return this.v.width;
  }
  get height() {
    return this.v.height;
  }
  get ownsContext() {
    return this.Da;
  }
}
class Ft extends ut {
  Se;
  q;
  Va;
  Qa;
  Ka;
  o;
  u;
  De = null;
  Wa = null;
  Za = "brightness";
  qa = null;
  Ja;
  $a = null;
  ln = 0;
  vn = 0;
  mn = 0;
  dn = 0;
  tc = "sampled";
  sc = "fixed";
  ec = null;
  rc = null;
  nc = null;
  hc = null;
  oc = null;
  ac = null;
  wn = [1, 1, 1, 1];
  An = [0, 0, 0, 1];
  cc = [0, 0, 0, 1];
  uc = [[0.1, 0, 0]];
  yn = null;
  lc = null;
  fc = null;
  dc = null;
  _c = null;
  constructor(t, e, s, i, n, h, o, c) {
    super(), this.Se = t, this.q = e, this.Va = s, this.Ja = i, this.Qa = n, this.Ka = h, this.vc(o, c);
  }
  mc(t, e, s, i, n) {
    this.q.ta() ? this.gc(t, e, s, i, n) : (t === "char" ? this.yc(this.wn, e, s, i, n) : t === "cell" ? this.yc(this.An, e, s, i, n) : this.yc(this.cc, e, s, i, n), this.De = null);
  }
  conversionMode(t) {
    return this.q.ta() ? this.$a = t : (this.Za = t, this.qa = null, this.De = null), this;
  }
  dispose() {
    this.Va && (this.Se.deleteTexture(this.Va), this.Va = null), super.dispose();
  }
  invert(t = !0) {
    const e = t ? 1 : 0;
    return this.q.ta() ? this.ec = e : (this.ln = e, this.De = null), this;
  }
  flipX(t = !0) {
    const e = t ? 1 : 0;
    return this.q.ta() ? this.rc = e : (this.vn = e, this.De = null), this;
  }
  flipY(t = !0) {
    const e = t ? 1 : 0;
    return this.q.ta() ? this.nc = e : (this.mn = e, this.De = null), this;
  }
  charRotation(t) {
    const e = me(t);
    return this.q.ta() ? this.hc = e : (this.dn = e, this.De = null), this;
  }
  charColorMode(t) {
    return this.q.ta() ? this.oc = t : (this.tc = t, this.De = null), this;
  }
  cellColorMode(t) {
    return this.q.ta() ? this.ac = t : (this.sc = t, this.De = null), this;
  }
  charColor(t, e, s, i) {
    return this.mc("char", t, e, s, i), this;
  }
  cellColor(t, e, s, i) {
    return this.mc("cell", t, e, s, i), this;
  }
  background(t, e, s, i) {
    return this.mc("background", t, e, s, i), this;
  }
  characters(t) {
    if (this.q.ta()) {
      const e = this.wc(t);
      this._c = e.length > 0 ? e : null;
    } else this.yn = t, this.bc(t), this.De = null;
    return this;
  }
  oa(t) {
    this.Wa !== t && (this.Wa = t, this.yn && this.bc(this.yn), this.De = null);
  }
  get texture() {
    return this.Va;
  }
  get width() {
    return this.o;
  }
  get height() {
    return this.u;
  }
  get originalWidth() {
    return this.Qa;
  }
  get originalHeight() {
    return this.Ka;
  }
  oe(t, e) {
    this.vc(t, e);
  }
  Qe() {
    return this.aa() ? this.Mc() : (this.De || this.Ke(), this.De);
  }
  $o() {
    this.ec = null, this.rc = null, this.nc = null, this.hc = null, this.oc = null, this.ac = null, this.lc = null, this.fc = null, this.dc = null, this._c = null, this.$a = null;
  }
  xc() {
  }
  Ke() {
    this.De = this.Mc();
  }
  Mc() {
    this.xc();
    const t = this.Cc(), e = this.Fc(), s = this.$a ?? this.Za, i = this.Ja.Pc(s, e), n = t.createUniforms(e);
    return this.q.materialManager.Ze(i, n);
  }
  yc(t, e, s, i, n) {
    const h = E.pe(e, s, i, n);
    St(t, h.r, h.g, h.b, h.a);
  }
  bc(t) {
    const e = this.wc(t);
    this.uc = e.length > 0 ? e : this.uc;
  }
  wc(t) {
    return this.Wa ? this.Wa.Bt(t).filter((e) => Array.isArray(e)).slice(0, 255) : [];
  }
  vc(t, e) {
    const { width: s, height: i } = (function(n, h, o, c) {
      const a = Math.min(o / n, c / h);
      return { width: Math.max(1, Math.min(o, Math.round(n * a))), height: Math.max(1, Math.min(c, Math.round(h * a))), scale: a };
    })(this.Qa, this.Ka, t, e);
    this.o = s, this.u = i;
  }
  createBaseConversionUniforms() {
    const t = this.ec ?? this.ln, e = this.rc ?? this.vn, s = this.nc ?? this.mn, i = this.hc ?? this.dn, n = this.oc ?? this.tc, h = this.ac ?? this.sc, o = this.lc ?? this.wn, c = this.fc ?? this.An, a = this.dc ?? this.cc, u = this._c ?? this.uc;
    return { u_image: this.Va, u_invert: !!t, u_flipX: !!e, u_flipY: !!s, u_charRotation: i, u_charColorFixed: n === "fixed", u_charColor: o, u_cellColorFixed: h === "fixed", u_cellColor: c, u_backgroundColor: a, u_charCount: u.length, u_charList: u };
  }
  aa() {
    return this.ec !== null || this.rc !== null || this.nc !== null || this.hc !== null || this.oc !== null || this.ac !== null || this.lc !== null || this.fc !== null || this.dc !== null || this._c !== null || this.$a !== null;
  }
  Cc() {
    const t = this.$a ?? this.Za;
    if (this.qa && this.qa.id === t) return this.qa;
    const e = this.Ja.Tc(t);
    if (!e) throw Error(`[textmode.js] Conversion mode "${t}" is not registered. If this mode is provided by an add-on, make sure its plugin is installed before loading sources.`);
    return this.qa = e, e;
  }
  gc(t, e, s, i, n) {
    let h;
    t === "char" ? (h = this.lc ?? [0, 0, 0, 1], this.lc = h) : t === "cell" ? (h = this.fc ?? [0, 0, 0, 1], this.fc = h) : (h = this.dc ?? [0, 0, 0, 1], this.dc = h), this.yc(h, e, s, i, n);
  }
  Fc() {
    if (!this.Wa) throw Error("[textmode.js] Cannot create conversion context: no active glyph atlas set. Ensure _setActiveFont() is called before rendering.");
    return { renderer: this.q, gl: this.Se, font: this.Wa, glyphAtlas: this.Wa, source: this };
  }
}
class lt extends Ft {
  constructor(t, e, s, i, n, h, o, c) {
    super(t, e, s, i, n, h, o, c);
  }
  static Sc(t, e, s, i, n) {
    const h = t.context, { texture: o, width: c, height: a } = Vt(h, s);
    return new lt(h, t, o, e, c, a, i, n);
  }
}
class Ps {
  Ec;
  Oc;
  Lc = null;
  Dc = 0;
  Rc = !0;
  kc = 0;
  zc = 0;
  Hc = [];
  Ic = 10;
  jc = 0;
  Bc = 0;
  Nc = -1;
  constructor(t = 60) {
    this.Oc = t, this.Ec = 1e3 / t;
  }
  Gc(t) {
    if (!this.Rc) return;
    this.Nc === -1 && (this.Nc = performance.now()), this.Dc = performance.now();
    const e = (s) => {
      if (!this.Rc) return void (this.Lc = null);
      const i = s - this.Dc;
      i >= this.Ec && (t(), this.Dc = s - i % this.Ec), this.Rc && (this.Lc = requestAnimationFrame(e));
    };
    this.Lc = requestAnimationFrame(e);
  }
  Xc() {
    this.Lc && (cancelAnimationFrame(this.Lc), this.Lc = null);
  }
  Yc() {
    this.Rc && (this.Rc = !1, this.Xc());
  }
  Vc(t) {
    this.Rc || (this.Rc = !0, this.Gc(t));
  }
  Qc(t, e) {
    if (t === void 0) return this.kc;
    this.Oc = t, this.Ec = 1e3 / t, this.Rc && e && (this.Xc(), this.Gc(e));
  }
  Kc() {
    const t = performance.now();
    if (this.zc > 0) {
      const e = t - this.zc;
      this.jc = e, this.Hc.push(e), this.Hc.length > this.Ic && this.Hc.shift();
      const s = this.Hc.reduce((i, n) => i + n, 0) / this.Hc.length;
      this.kc = 1e3 / s;
    }
    this.zc = t;
  }
  Wc(t) {
    this.Oc = t, this.Ec = 1e3 / t;
  }
  Zc() {
    this.Bc++;
  }
  get qc() {
    return this.Nc === -1 ? 0 : performance.now() - this.Nc;
  }
  set qc(t) {
    this.Nc = performance.now() - t;
  }
  get Jc() {
    return this.qc / 1e3;
  }
  set Jc(t) {
    this.qc = 1e3 * t;
  }
}
function Zt(r, t, e) {
  return r ? r.O(t, e) : { x: -1 / 0, y: -1 / 0 };
}
class qt {
  $c = [];
  tu(t, e, s, i) {
    const n = s;
    i === void 0 ? t.addEventListener(e, n) : t.addEventListener(e, n, i), this.$c.push({ target: t, type: e, listener: n, capture: typeof i == "boolean" ? i : i?.capture });
  }
  iu() {
    for (let t = this.$c.length - 1; t >= 0; t -= 1) {
      const { target: e, type: s, listener: i, capture: n } = this.$c[t];
      n === void 0 ? e.removeEventListener(s, i) : e.removeEventListener(s, i, n);
    }
    this.$c = [];
  }
}
class Ut {
  $c = {};
  su(t, e) {
    const s = this.$c[t] ??= [], i = { fn: e, once: !1 };
    return s.push(i), () => this.eu(t, e);
  }
  eu(t, e) {
    const s = this.$c[t];
    if (!s) return;
    const i = s.findIndex((n) => n.fn === e);
    i !== -1 && s.splice(i, 1);
  }
  ru(t, e) {
    const s = this.$c[t] ??= [], i = { fn: e, once: !0 };
    return s.push(i), () => this.eu(t, e);
  }
  nu(t, ...e) {
    const s = this.$c[t];
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
  hu(t) {
    const e = this.$c[t];
    return !!e && e.length > 0;
  }
  iu(t) {
    t !== void 0 ? delete this.$c[t] : this.$c = {};
  }
}
class Ls {
  v;
  ou;
  au = { x: -1 / 0, y: -1 / 0 };
  cu = { x: -1 / 0, y: -1 / 0 };
  uu = { x: -1 / 0, y: -1 / 0 };
  lu = { x: -1 / 0, y: -1 / 0 };
  fu = { x: 0, y: 0 };
  du = { x: 0, y: 0 };
  _u = !1;
  pu = null;
  vu = 0;
  $c = new qt();
  mu = !1;
  gu = new Ut();
  constructor(t, e) {
    this.v = t, this.ou = e;
  }
  yu(t) {
    const e = performance.now() + Math.max(0, t);
    e > this.vu && (this.vu = e);
  }
  wu() {
    return performance.now() < this.vu;
  }
  Au(t) {
    const e = this.v.canvas;
    e.style.cursor = t == null || t === "" ? "" : t;
  }
  bu() {
    const t = this.v.canvas;
    return typeof t.requestPointerLock == "function" && (t.requestPointerLock(), !0);
  }
  Mu() {
    this.xu() && typeof document.exitPointerLock == "function" && document.exitPointerLock();
  }
  Cu() {
    if (this.mu) return;
    const t = this.v.canvas;
    this.$c.tu(t, "mousemove", (e) => {
      this.Fu(e), this.Pu(e);
    }, { passive: !0 }), this.$c.tu(t, "mouseleave", () => {
      this.cu = { ...this.au }, this.au.x = -1 / 0, this.au.y = -1 / 0, this.pu = null;
    }, { passive: !0 }), this.$c.tu(t, "mousedown", (e) => {
      this.Fu(e), this.Tu(e);
    }, { passive: !0 }), this.$c.tu(t, "mouseup", (e) => {
      this.Fu(e), this.Su(e);
    }, { passive: !0 }), this.$c.tu(t, "click", (e) => {
      this.Fu(e), this.Eu(e);
    }, { passive: !0 }), this.$c.tu(t, "dblclick", (e) => {
      this.Fu(e), this.Ou(e);
    }, { passive: !0 }), this.$c.tu(t, "wheel", (e) => {
      this.Fu(e), this.Lu(e);
    }, { passive: !1 }), this.$c.tu(window, "mouseup", () => {
      this._u = !1;
    }, { passive: !0 }), this.$c.tu(window, "blur", () => {
      this._u = !1;
    }), this.mu = !0;
  }
  Du() {
    this.mu && (this.$c.iu(), this.mu = !1, this.Mu(), this._u = !1, this.fu = { x: 0, y: 0 }, this.du = { x: 0, y: 0 });
  }
  Ru() {
    if (this.mu) try {
      if (this.pu) {
        const t = new MouseEvent("mousemove", { clientX: this.pu.x, clientY: this.pu.y, bubbles: !1, cancelable: !1 });
        this.Fu(t);
      }
    } catch {
      this.au.x = -1 / 0, this.au.y = -1 / 0;
    }
  }
  ku() {
    return { x: this.au.x, y: this.au.y };
  }
  zu() {
    return { x: this.uu.x, y: this.uu.y };
  }
  Hu() {
    return this.fu.x;
  }
  Iu() {
    return this.fu.y;
  }
  ju() {
    return this._u;
  }
  Bu() {
    this.uu = { ...this.lu }, this.lu = { ...this.au }, this.fu = { ...this.du }, this.du = { x: 0, y: 0 };
  }
  Nu(t, e = {}) {
    return { position: { ...this.au }, previousPosition: { ...this.cu }, originalEvent: t, ...e };
  }
  Pu(t) {
    this.wu() || (this.Gu(t) ? this.gu.nu("mouseDragged", this.Nu(t, { button: this.Xu(t) })) : this.gu.nu("mouseMoved", this.Nu(t)));
  }
  Tu(t) {
    this.wu() || (this._u = !0, this.gu.nu("mousePressed", this.Nu(t, { button: t.button })));
  }
  Su(t) {
    this.wu() || (this._u = !1, this.gu.nu("mouseReleased", this.Nu(t, { button: t.button })));
  }
  Eu(t) {
    this.wu() || this.gu.nu("mouseClicked", this.Nu(t, { button: t.button }));
  }
  Ou(t) {
    this.wu() || this.gu.nu("doubleClicked", this.Nu(t, { button: t.button }));
  }
  Lu(t) {
    this.wu() || this.gu.nu("mouseScrolled", this.Nu(t, { delta: { x: t.deltaX, y: t.deltaY } }));
  }
  Fu(t) {
    const e = this.ou();
    if (this.cu = { ...this.au }, t instanceof MouseEvent && t.type === "mousemove" && this.Yu(t), t instanceof MouseEvent && t.type === "mousemove" && this.xu()) return;
    this.pu = { x: t.clientX, y: t.clientY };
    const s = Zt(e, t.clientX, t.clientY);
    this.au.x = s.x, this.au.y = s.y;
  }
  Gu(t) {
    return t.buttons !== 0;
  }
  Xu(t) {
    return 1 & t.buttons ? 0 : 4 & t.buttons ? 1 : 2 & t.buttons ? 2 : 8 & t.buttons ? 3 : 16 & t.buttons ? 4 : void 0;
  }
  Yu(t) {
    if (this.xu()) return this.du.x += t.movementX, void (this.du.y += t.movementY);
    this.pu && (this.du.x += t.clientX - this.pu.x, this.du.y += t.clientY - this.pu.y);
  }
  xu() {
    return document.pointerLockElement === this.v.canvas;
  }
}
class Ds {
  Vu = /* @__PURE__ */ new Map();
  Qu = null;
  Ku = null;
  $c = new qt();
  mu = !1;
  gu = new Ut();
  Wu = { ArrowUp: "UP_ARROW", ArrowDown: "DOWN_ARROW", ArrowLeft: "LEFT_ARROW", ArrowRight: "RIGHT_ARROW", F1: "F1", F2: "F2", F3: "F3", F4: "F4", F5: "F5", F6: "F6", F7: "F7", F8: "F8", F9: "F9", F10: "F10", F11: "F11", F12: "F12", Enter: "ENTER", Return: "RETURN", Tab: "TAB", Escape: "ESCAPE", Backspace: "BACKSPACE", Delete: "DELETE", Insert: "INSERT", Home: "HOME", End: "END", PageUp: "PAGE_UP", PageDown: "PAGE_DOWN", Shift: "SHIFT", Control: "CONTROL", Alt: "ALT", Meta: "META", " ": "SPACE" };
  Cu() {
    this.mu || (this.$c.tu(window, "keydown", (t) => {
      this.Zu(t);
    }, { passive: !1 }), this.$c.tu(window, "keyup", (t) => {
      this.qu(t);
    }, { passive: !1 }), this.mu = !0);
  }
  Du() {
    this.mu && (this.$c.iu(), this.mu = !1, this.Vu.clear(), this.Qu = null, this.Ku = null);
  }
  Ju(t) {
    const e = this.$u(t);
    return (this.Vu.get(t) || this.Vu.get(e))?.isPressed || !1;
  }
  tl() {
    return this.Qu;
  }
  il() {
    return this.Ku;
  }
  sl() {
    const t = [];
    for (const [e, s] of this.Vu) s.isPressed && t.push(e);
    return t;
  }
  el() {
    return { ctrl: this.Ju("Control"), shift: this.Ju("Shift"), alt: this.Ju("Alt"), meta: this.Ju("Meta") };
  }
  rl() {
    this.Vu.clear(), this.Qu = null, this.Ku = null;
  }
  Zu(t) {
    const e = t.key, s = Date.now();
    this.Vu.has(e) || this.Vu.set(e, { isPressed: !1, lastPressTime: 0, lastReleaseTime: 0 });
    const i = this.Vu.get(e);
    i.isPressed || (i.isPressed = !0, i.lastPressTime = s, this.Qu = e, this.gu.nu("keyPressed", this.Nu(e, !0, t)), this.nl(t) && this.gu.nu("keyTyped", this.Nu(e, !0, t)));
  }
  Nu(t, e, s) {
    return { key: t, keyCode: s.keyCode, ctrlKey: s.ctrlKey, shiftKey: s.shiftKey, altKey: s.altKey, metaKey: s.metaKey, isPressed: e, originalEvent: s };
  }
  qu(t) {
    const e = t.key, s = Date.now();
    this.Vu.has(e) || this.Vu.set(e, { isPressed: !1, lastPressTime: 0, lastReleaseTime: 0 });
    const i = this.Vu.get(e);
    i.isPressed = !1, i.lastReleaseTime = s, this.Ku = e, this.gu.nu("keyReleased", this.Nu(e, !1, t));
  }
  $u(t) {
    return this.Wu[t] || t.toLowerCase();
  }
  nl(t) {
    return !(t.ctrlKey || t.altKey || t.metaKey) && t.key !== "Dead" && Array.from(t.key).length === 1;
  }
}
class Fs {
  hl;
  ol;
  al = /* @__PURE__ */ new Map();
  cl = null;
  ul = 320;
  ll = 350;
  fl = 10;
  dl = 550;
  _l = 14;
  pl = 48;
  vl = 650;
  ml = 0.02;
  yl = 2;
  wl = 0;
  Al = null;
  constructor(t, e) {
    this.hl = t, this.ol = e;
  }
  nh() {
    this.al.forEach((t) => {
      t.timer !== null && window.clearTimeout(t.timer);
    }), this.al.clear(), this.cl = null, this.wl = 0, this.Al = null;
  }
  bl(t, e) {
    const s = { timer: null, fired: !1 };
    s.timer = window.setTimeout(() => {
      this.al.has(t.id) && (s.fired = !0, this.ol.nu("longPress", { touch: this.Ml(t.lastPosition), duration: performance.now() - t.startTime, originalEvent: e }));
    }, this.dl), this.al.set(t.id, s);
  }
  xl(t, e) {
    const s = this.al.get(t.id);
    !s || !e || Mt(e.clientX, e.clientY, t.lastPosition.clientX, t.lastPosition.clientY) > this._l && s.timer !== null && (window.clearTimeout(s.timer), s.timer = null);
  }
  Cl(t, e) {
    const s = this.al.get(t.id);
    s && s.timer !== null && (window.clearTimeout(s.timer), s.timer = null), this.Fl(t, e, s?.fired ?? !1), this.al.delete(t.id);
  }
  Pl(t) {
    const e = this.al.get(t);
    e && e.timer !== null && window.clearTimeout(e.timer), this.al.delete(t);
  }
  Tl(t) {
    if (t.size !== 2) return void (this.cl = null);
    const e = Array.from(t.values()), [s, i] = e, n = [s.id, i.id];
    if (this.cl && this.cl.ids[0] === n[0] && this.cl.ids[1] === n[1]) return;
    const h = Mt(s.x, s.y, i.x, i.y), o = te(s.clientX, s.clientY, i.clientX, i.clientY);
    this.cl = { ids: n, initialDistance: Math.max(h, 1e-4), initialAngle: o, lastScale: 1, lastRotation: 0 };
  }
  Sl(t, e) {
    if (this.Tl(t), !this.cl) return;
    const [s, i] = this.cl.ids, n = t.get(s), h = t.get(i);
    if (!n || !h) return;
    const o = Mt(n.x, n.y, h.x, h.y) / this.cl.initialDistance, c = o - this.cl.lastScale;
    Math.abs(c) > this.ml && (this.ol.nu("pinch", { touches: [this.Ml(n), this.Ml(h)], scale: o, deltaScale: c, center: this.El(n, h), originalEvent: e }), this.cl.lastScale = o);
    let a = te(n.clientX, n.clientY, h.clientX, h.clientY) - this.cl.initialAngle;
    a = (a + 180) % 360 - 180;
    const u = a - this.cl.lastRotation;
    Math.abs(u) > this.yl && (this.ol.nu("rotateGesture", { touches: [this.Ml(n), this.Ml(h)], rotation: a, deltaRotation: u, center: this.El(n, h), originalEvent: e }), this.cl.lastRotation = a);
  }
  El(t, e) {
    const s = (t.clientX + e.clientX) / 2, i = (t.clientY + e.clientY) / 2, n = this.hl(s, i);
    return { x: n.x, y: n.y };
  }
  Fl(t, e, s) {
    const i = performance.now(), n = i - t.startTime, h = t.lastPosition.clientX - t.startPosition.clientX, o = t.lastPosition.clientY - t.startPosition.clientY, c = Math.hypot(h, o);
    if (!s && n <= this.ul && c <= this.fl)
      this.Ol(t.lastPosition, i) ? this.ol.nu("doubleTap", { touch: this.Ml(t.lastPosition), taps: 2, originalEvent: e }) : this.ol.nu("tap", { touch: this.Ml(t.lastPosition), taps: 1, originalEvent: e });
    else if (!s && n <= this.vl && c >= this.pl) {
      const a = Math.max(c, 1e-4), u = { x: h / a, y: o / a }, l = { x: h / n, y: o / n };
      this.ol.nu("swipe", { touch: this.Ml(t.lastPosition), direction: u, distance: a, velocity: l, originalEvent: e });
    }
    this.wl = i, this.Al = this.Ml(t.lastPosition);
  }
  Ol(t, e) {
    return !this.Al || e - this.wl > this.ll ? !1 : Mt(t.clientX, t.clientY, this.Al.clientX, this.Al.clientY) <= this.fl;
  }
  Ml(t) {
    return { ...t };
  }
}
class qs {
  v;
  Ll;
  ou;
  Dl;
  Rl = /* @__PURE__ */ new Map();
  kl = /* @__PURE__ */ new Map();
  zl = /* @__PURE__ */ new Map();
  Hl;
  Il;
  $c = new qt();
  mu = !1;
  gu = new Ut();
  jl = 600;
  constructor(t, e, s) {
    this.v = t, this.ou = e, this.Ll = s, this.Dl = new Fs((n, h) => Zt(this.ou(), n, h), this.gu);
    const i = this.v.canvas;
    this.Hl = i.style.touchAction, this.Il = i.style.userSelect, i.style.touchAction || (i.style.touchAction = "none"), i.style.userSelect || (i.style.userSelect = "none");
  }
  Cu() {
    if (this.mu) return;
    const t = this.v.canvas;
    this.$c.tu(t, "touchstart", (e) => {
      this.Bl(e);
    }, { passive: !1 }), this.$c.tu(t, "touchmove", (e) => {
      this.Nl(e);
    }, { passive: !1 }), this.$c.tu(t, "touchend", (e) => {
      this.Gl(e);
    }, { passive: !1 }), this.$c.tu(t, "touchcancel", (e) => {
      this.Xl(e);
    }, { passive: !1 }), this.mu = !0;
  }
  Du() {
    if (!this.mu) return;
    const t = this.v.canvas;
    this.$c.iu(), this.mu = !1, this.Rl.clear(), this.kl.clear(), this.zl.clear(), this.Dl.nh(), t.style.touchAction = this.Hl, t.style.userSelect = this.Il;
  }
  Ru() {
    if (!this.ou() || this.Rl.size === 0) return;
    const t = /* @__PURE__ */ new Map();
    for (const e of this.Rl.values()) {
      const s = this.hl(e.clientX, e.clientY, e.id, e);
      t.set(e.id, s);
      const i = this.zl.get(e.id);
      i && (i.lastPosition = s);
    }
    this.Rl = t;
  }
  Yl() {
    return Array.from(this.Rl.values()).map((t) => ({ ...t }));
  }
  Bl(t) {
    if (!this.ou()) return;
    t.preventDefault(), this.Ll?.yu(this.jl);
    const e = performance.now(), s = this.Vl(t.changedTouches);
    for (const i of s) {
      const n = this.Rl.get(i.id);
      n && this.kl.set(i.id, this.Ml(n)), this.Rl.set(i.id, i);
      const h = { id: i.id, startPosition: i, lastPosition: i, startTime: e, lastTime: e };
      this.zl.set(i.id, h), this.Dl.bl(h, t), this.gu.nu("touchStarted", this.Ql(i, t, void 0, e));
    }
    this.Dl.Tl(this.Rl);
  }
  Nl(t) {
    if (!this.ou()) return;
    t.preventDefault(), this.Ll?.yu(this.jl);
    const e = performance.now(), s = this.Vl(t.changedTouches);
    for (const i of s) {
      const n = this.Rl.get(i.id), h = n ? this.Ml(n) : void 0;
      h && this.kl.set(i.id, h), this.Rl.set(i.id, i);
      const o = this.zl.get(i.id);
      o && (o.lastPosition = i, o.lastTime = e, this.Dl.xl(o, h)), this.gu.nu("touchMoved", this.Ql(i, t, h, e));
    }
    this.Dl.Sl(this.Rl, t);
  }
  Gl(t) {
    if (!this.ou()) return;
    t.preventDefault();
    const e = performance.now(), s = this.Vl(t.changedTouches);
    for (const i of s) {
      const n = this.Rl.get(i.id), h = n ? this.Ml(n) : void 0, o = this.zl.get(i.id);
      this.gu.nu("touchEnded", this.Ql(i, t, h, e)), o && this.Dl.Cl(o, t), this.zl.delete(i.id), this.kl.delete(i.id), this.Rl.delete(i.id);
    }
    this.Dl.Tl(this.Rl);
  }
  Xl(t) {
    if (!this.ou()) return;
    t.preventDefault();
    const e = performance.now(), s = this.Vl(t.changedTouches);
    for (const i of s) {
      const n = this.Rl.get(i.id), h = n ? this.Ml(n) : void 0;
      this.gu.nu("touchCancelled", this.Ql(i, t, h, e)), this.Dl.Pl(i.id), this.zl.delete(i.id), this.kl.delete(i.id), this.Rl.delete(i.id);
    }
    this.Dl.Tl(this.Rl);
  }
  Vl(t) {
    const e = [];
    for (let s = 0; s < t.length; s += 1) {
      const i = t.item(s);
      i && e.push(this.Kl(i));
    }
    return e;
  }
  Kl(t) {
    return this.hl(t.clientX, t.clientY, t.identifier, { id: t.identifier, x: -1, y: -1, clientX: t.clientX, clientY: t.clientY, pressure: t.force, radiusX: t.radiusX, radiusY: t.radiusY, rotationAngle: t.rotationAngle });
  }
  hl(t, e, s, i) {
    const n = Zt(this.ou(), t, e);
    return { id: s, x: n.x, y: n.y, clientX: t, clientY: e, pressure: i.pressure, radiusX: i.radiusX, radiusY: i.radiusY, rotationAngle: i.rotationAngle };
  }
  Ql(t, e, s, i) {
    const n = this.zl.get(t.id), h = Array.from(this.kl.values()).map((a) => this.Ml(a)), o = Array.from(this.Rl.values()).map((a) => this.Ml(a)), c = this.Vl(e.changedTouches);
    return { touch: this.Ml(t), previousTouch: s ? this.Ml(s) : void 0, touches: o, previousTouches: h, changedTouches: c, deltaTime: n ? i - n.lastTime : 0, originalEvent: e };
  }
  Ml(t) {
    return { ...t };
  }
}
const L = { south: 0, east: 1, west: 2, north: 3, l1: 4, r1: 5, l2: 6, r2: 7, select: 8, start: 9, leftStickPress: 10, rightStickPress: 11, dpadUp: 12, dpadDown: 13, dpadLeft: 14, dpadRight: 15, home: 16 }, nt = { leftStickX: 0, leftStickY: 1, rightStickX: 2, rightStickY: 3 }, Us = new Map(Object.entries(L).map(([r, t]) => [t, r])), Os = new Map(Object.entries(nt).map(([r, t]) => [t, r]));
function Ns(r, t) {
  const e = Array.from(r.buttons, (h) => ({ pressed: !!h.pressed, touched: h.touched === void 0 ? void 0 : !!h.touched, value: h.value })), s = Array.from(r.axes, (h) => h), i = r.mapping === "standard" ? "standard" : "", n = { index: r.index, id: r.id, connected: !!r.connected, mapping: i, timestamp: r.timestamp, buttons: e, axes: s };
  return i === "standard" && (n.standard = (function(h, o, c) {
    const a = h[L.home];
    return { faceButtons: { south: F(h, L.south), east: F(h, L.east), west: F(h, L.west), north: F(h, L.north) }, shoulders: { l1: F(h, L.l1), r1: F(h, L.r1), l2: F(h, L.l2), r2: F(h, L.r2) }, center: { select: F(h, L.select), start: F(h, L.start), leftStickPress: F(h, L.leftStickPress), rightStickPress: F(h, L.rightStickPress), ...a ? { home: F(h, L.home) } : {} }, dpad: { up: F(h, L.dpadUp), down: F(h, L.dpadDown), left: F(h, L.dpadLeft), right: F(h, L.dpadRight) }, leftStick: oe(o, nt.leftStickX, nt.leftStickY, c), rightStick: oe(o, nt.rightStickX, nt.rightStickY, c) };
  })(e, s, t)), n;
}
function F(r, t) {
  return r[t] ?? { pressed: !1, value: 0 };
}
function oe(r, t, e, s) {
  const i = r[t] ?? 0, n = r[e] ?? 0, h = Math.hypot(i, n);
  return h <= s ? { x: 0, y: 0, magnitude: 0 } : { x: i, y: n, magnitude: h };
}
const Bs = { axisDeadzone: 0.15, axisChangeEpsilon: 0.01, buttonPressThreshold: 0.5, buttonReleaseThreshold: 0.45 };
class zs {
  Wl;
  Zl = [];
  ql = /* @__PURE__ */ new Map();
  Jl = /* @__PURE__ */ new Map();
  $c = new qt();
  mu = !1;
  $l = /* @__PURE__ */ new Set();
  tf = /* @__PURE__ */ new Set();
  gu = new Ut();
  constructor(t = {}) {
    this.Wl = { ...Bs, ...t };
  }
  Cu() {
    this.mu || (this.$c.tu(window, "gamepadconnected", (t) => {
      const e = t.gamepad;
      e && (this.$l.add(e.index), this.tf.delete(e.index));
    }), this.$c.tu(window, "gamepaddisconnected", (t) => {
      const e = t.gamepad;
      e && (this.tf.add(e.index), this.$l.delete(e.index));
    }), this.mu = !0);
  }
  Du() {
    this.mu && (this.$c.iu(), this.mu = !1, this.$l.clear(), this.tf.clear(), this.Zl = [], this.ql.clear(), this.Jl.clear());
  }
  Bu() {
    const t = /* @__PURE__ */ new Map();
    for (const e of this.if()) {
      if (!e || !e.connected) continue;
      const s = Ns(e, this.Wl.axisDeadzone);
      t.set(s.index, s);
    }
    for (const [e, s] of this.ql) t.has(e) || this.gu.nu("gamepadDisconnected", { gamepad: { ...s, connected: !1 } });
    for (const [e, s] of t) this.ql.has(e) || this.gu.nu("gamepadConnected", { gamepad: s });
    for (const [e, s] of t) {
      const i = this.ql.get(e);
      i && (this.sf(s, i), this.ef(s, i));
    }
    this.Jl = this.ql, this.ql = t, this.Zl = Array.from(t.values()).sort((e, s) => e.index - s.index), this.$l.clear(), this.tf.clear();
  }
  rf() {
    return this.Zl;
  }
  nf(t) {
    return this.ql.get(t);
  }
  hf(t, e) {
    if (e === "standard") return (function(s, i) {
      if (i === "standard") return Us.get(s);
    })(t, e);
  }
  af(t, e) {
    if (e === "standard") return (function(s, i) {
      if (i === "standard") return Os.get(s);
    })(t, e);
  }
  sf(t, e) {
    const s = Math.max(t.buttons.length, e.buttons.length);
    for (let i = 0; i < s; i++) {
      const n = t.buttons[i] ?? { pressed: !1, value: 0 }, h = e.buttons[i] ?? { pressed: !1, value: 0 }, o = h.value >= this.Wl.buttonPressThreshold;
      n.value >= this.Wl.buttonPressThreshold && !o && this.gu.nu("gamepadButtonPressed", { gamepad: t, buttonIndex: i, button: n, previousButton: h, standardButtonName: this.hf(i, t.mapping) });
      const c = h.value >= this.Wl.buttonReleaseThreshold;
      !(n.value >= this.Wl.buttonReleaseThreshold) && c && this.gu.nu("gamepadButtonReleased", { gamepad: t, buttonIndex: i, button: n, previousButton: h, standardButtonName: this.hf(i, t.mapping) });
    }
  }
  ef(t, e) {
    const s = Math.max(t.axes.length, e.axes.length);
    for (let i = 0; i < s; i++) {
      const n = t.axes[i] ?? 0, h = e.axes[i] ?? 0, o = n - h;
      (Math.abs(h) <= this.Wl.axisDeadzone != Math.abs(n) <= this.Wl.axisDeadzone || Math.abs(o) >= this.Wl.axisChangeEpsilon) && this.gu.nu("gamepadAxisChanged", { gamepad: t, axisIndex: i, value: n, previousValue: h, delta: o, standardAxisName: this.af(i, t.mapping) });
    }
  }
  if() {
    const t = navigator;
    if (typeof t.getGamepads != "function") return [];
    const e = t.getGamepads.call(navigator);
    return Array.from(e ?? []);
  }
}
class Is {
  cf;
  uf = /* @__PURE__ */ new Map();
  constructor(t) {
    this.cf = t;
  }
  lf(t, e, s) {
    let i = this.uf.get(t);
    i || (i = /* @__PURE__ */ new Map(), this.uf.set(t, i));
    for (const [n, h] of this.uf) if (n !== t && h.has(e)) throw new M(`Plugin "${t}" attempted to register layer method "${e}" which is already provided by plugin "${n}".`, { plugin: t, method: e, conflictingPlugin: n });
    i.set(e, s), this.ff(e, s);
  }
  df(t, e) {
    const s = this.uf.get(t);
    if (!s) return;
    s.delete(e);
    let i = !1;
    for (const [n, h] of this.uf) if (n !== t && h.has(e)) {
      i = !0;
      const o = h.get(e);
      this.ff(e, o);
      break;
    }
    i || this._f(e), s.size === 0 && this.uf.delete(t);
  }
  pf(t) {
    const e = this.uf.get(t);
    if (e) {
      for (const s of e.keys()) this._f(s);
      this.uf.delete(t);
    }
  }
  ff(t, e) {
    const s = this.cf();
    Object.defineProperty(s, t, { value: e, writable: !0, configurable: !0, enumerable: !1 });
  }
  _f(t) {
    const e = this.cf(), s = Object.getOwnPropertyDescriptor(e, t);
    s && s.configurable && delete e[t];
  }
}
class ks {
  vf;
  mf = /* @__PURE__ */ new Map();
  gf = /* @__PURE__ */ new Map();
  yf = /* @__PURE__ */ new Map();
  wf = /* @__PURE__ */ new Map();
  Af = /* @__PURE__ */ new Map();
  bf = /* @__PURE__ */ new Map();
  Mf = /* @__PURE__ */ new Map();
  constructor(t) {
    this.vf = t;
  }
  xf(t, e) {
    return this.Cf(this.mf, t, e);
  }
  Ff(t, e) {
    return this.Cf(this.gf, t, e);
  }
  Pf(t, e) {
    return this.Cf(this.yf, t, e);
  }
  Tf(t, e) {
    return this.Cf(this.wf, t, e);
  }
  Sf(t, e) {
    return this.Cf(this.Af, t, e);
  }
  Ef(t, e) {
    return this.Cf(this.bf, t, e);
  }
  Of(t, e) {
    return this.Cf(this.Mf, t, e);
  }
  Lf() {
    this.Df(this.mf, (t) => t());
  }
  Rf() {
    this.Df(this.gf, (t) => t());
  }
  kf(t) {
    this.Df(this.yf, (e) => e(t));
  }
  Zs(t) {
    this.Df(this.wf, (e) => e(t));
  }
  se(t) {
    this.Df(this.Af, (e) => e(t));
  }
  async zf() {
    await this.Hf(this.bf, (t) => t());
  }
  async If() {
    await this.Hf(this.Mf, (t) => t());
  }
  jf(t) {
    this.mf.delete(t), this.gf.delete(t), this.yf.delete(t), this.wf.delete(t), this.Af.delete(t), this.bf.delete(t), this.Mf.delete(t);
  }
  Cf(t, e, s) {
    const i = t.get(e) ?? /* @__PURE__ */ new Set();
    return i.add(s), t.set(e, i), () => {
      const n = t.get(e);
      n && (n.delete(s), n.size === 0 && t.delete(e));
    };
  }
  Df(t, e) {
    for (const s of this.vf) {
      const i = t.get(s);
      i && i.forEach(e);
    }
  }
  async Hf(t, e) {
    for (const s of this.vf) {
      const i = t.get(s);
      if (i) for (const n of i) await e(n);
    }
  }
}
class Ws {
  ae;
  Bf;
  Nf;
  constructor(t, e, s) {
    this.ae = t, this.Bf = e, this.Nf = s;
  }
  Gf(t) {
    const e = this.ae, s = this.Bf, i = this.Nf, n = { get canvas() {
      return e.v.canvas;
    }, get targetCanvas() {
      return e.v.targetCanvas;
    }, get width() {
      return e.v.width;
    }, get height() {
      return e.v.height;
    }, get ownsContext() {
      return e.v.ownsContext;
    } };
    return { get renderer() {
      return e.q;
    }, get canvas() {
      return n;
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
    }, registerPreDrawHook: (h) => s.xf(t, h), registerPostDrawHook: (h) => s.Ff(t, h), registerLayerDisposedHook: (h) => s.Pf(t, h), registerLayerPreRenderHook: (h) => s.Tf(t, h), registerLayerPostRenderHook: (h) => s.Sf(t, h), registerPreSetupHook: (h) => s.Ef(t, h), registerPostSetupHook: (h) => s.Of(t, h), extendLayer: (h, o) => {
      i.lf(t, h, o);
    }, removeLayerExtension: (h) => {
      i.df(t, h);
    } };
  }
}
class Xs {
  Xf = /* @__PURE__ */ new Map();
  vf = [];
  Yf(t) {
    return this.Xf.has(t);
  }
  Tc(t) {
    return this.Xf.get(t);
  }
  tu(t) {
    this.Xf.set(t.name, t), this.vf.push(t.name);
  }
  Vf(t) {
    this.Xf.delete(t);
    const e = this.vf.indexOf(t);
    e !== -1 && this.vf.splice(e, 1);
  }
  Qf() {
    return [...this.vf];
  }
  Kf() {
    return this.vf;
  }
}
class Zs {
  ae;
  Wf;
  Bf;
  Nf;
  Zf;
  constructor(t) {
    this.ae = t, this.Wf = new Xs(), this.Bf = new ks(this.Wf.Kf()), this.Nf = new Is(() => Object.getPrototypeOf(this.ae.layers.base)), this.Zf = new Ws(this.ae, this.Bf, this.Nf);
  }
  qf(t) {
    for (const e of t) {
      if (this.Wf.Yf(e.name)) {
        console.warn(`[textmode.js] Plugin "${e.name}" is already installed.`);
        continue;
      }
      const s = this.Jf(e.name);
      try {
        const i = e.install(this.ae, s);
        i instanceof Promise && i.catch((n) => {
          console.error(`[textmode.js] Async plugin "${e.name}" installation error:`, n), this.$f(e.name);
        });
      } catch (i) {
        throw this.$f(e.name), i;
      }
      this.Wf.tu(e);
    }
  }
  async td(t) {
    for (const e of t) {
      if (this.Wf.Yf(e.name)) {
        console.warn(`[textmode.js] Plugin "${e.name}" is already installed.`);
        continue;
      }
      const s = this.Jf(e.name);
      try {
        await e.install(this.ae, s);
      } catch (i) {
        throw this.$f(e.name), i;
      }
      this.Wf.tu(e);
    }
  }
  async sd(t) {
    const e = this.Wf.Tc(t);
    if (!e) return;
    const s = this.Jf(t);
    e.uninstall && await e.uninstall(this.ae, s), this.Wf.Vf(t), this.$f(t);
  }
  Lf() {
    this.Bf.Lf();
  }
  Rf() {
    this.Bf.Rf();
  }
  kf(t) {
    this.Bf.kf(t);
  }
  Zs(t) {
    this.Bf.Zs(t);
  }
  se(t) {
    this.Bf.se(t);
  }
  async zf() {
    await this.Bf.zf();
  }
  async If() {
    await this.Bf.If();
  }
  async ed() {
    const t = this.Wf.Qf();
    for (const e of t) await this.sd(e);
  }
  Jf(t) {
    return this.Zf.Gf(t);
  }
  $f(t) {
    this.Bf.jf(t), this.Nf.pf(t);
  }
}
const ct = `#version 300 es
layout(location=0)in vec2 A;layout(location=1)in vec2 B;out vec2 v_uv;void main(){v_uv=B;gl_Position=vec4(A,0.,1.);}`, Te = `#version 300 es
precision highp float;uniform sampler2D u_texture;in vec2 v_uv;out vec4 fragColor;void main(){fragColor=texture(u_texture,v_uv);}`, Vs = ({ textmodifier: r }) => {
  const t = "|/-\\", e = Math.floor(r.frameCount / 6) % 4, s = E.pe("#F8F8F8"), i = r.color(s.r, s.g, s.b);
  r.background("#222323"), r.charColor(i), r.cellColor("#222323"), r.push(), r.translate(0, 0, 0), r.char(t[e]), r.rect(1, 1), r.pop();
  const n = "LOADING...", h = E.pe("#C0C0C0"), o = r.color(h.r, h.g, h.b);
  r.charColor(o), r.push(), r.translate(-5, 5, 0);
  for (const c of n) r.char(c), r.rect(1, 1), r.translateX(1);
  r.pop();
}, Hs = { transition: "fade", transitionDuration: 500 };
class Se extends ye {
  Zt;
  we = "active";
  rd = 0;
  nd;
  constructor(t, e) {
    super(t), this.Zt = { ...Hs, ...e ?? {} }, this.Zt.transition === "none" && (this.Zt.transitionDuration = 0);
  }
  async Dt() {
    this.Et || (await super.Dt(), this.ce.opacity(1), this.ce.show());
  }
  get xe() {
    return this.we === "active" || this.we === "transitioning";
  }
  hd() {
    this.Zt.transitionDuration > 0 ? (this.od(), this.rd = performance.now(), this.Et && (this.ce.opacity(1), this.ce.show())) : (this.Et && (this.ce.opacity(0), this.ce.hide()), this.ad(), this.ud());
  }
  ld(t) {
    this.nd = t;
  }
  Pe() {
    if (this.we === "transitioning" && this.fd())
      return this.dd(), void this.ud();
    this.Te();
  }
  ue() {
    return new I(this.ae.q, { visible: !0, opacity: 1, fontSize: 16 });
  }
  ud() {
    this.nd && this.nd();
  }
  fd() {
    if (!this.Et) return !0;
    const t = this.Zt.transitionDuration;
    if (t <= 0) return this.ce.opacity(0), this.ce.hide(), !0;
    const e = performance.now() - this.rd, s = Math.min(1, e / t);
    return this.ce.opacity(1 - s), s >= 1 && (this.ce.hide(), !0);
  }
  Te() {
    if (!this.Et) return;
    const t = { textmodifier: this.ae, grid: this.ce.grid };
    this.le(Vs, t);
  }
  ad() {
    this.we !== "disabled" && (this.we = "done");
  }
  od() {
    this.we !== "disabled" && (this.we = "transitioning");
  }
  dd() {
    this.we === "transitioning" && (this.we = "done");
  }
}
const ai = Object.freeze(Object.defineProperty({ __proto__: null, LoadingLayerController: Se }, Symbol.toStringTag, { value: "Module" })), ae = Object.fromEntries(ht.map((r, t) => [r, t]));
class Ks {
  q;
  _d;
  Ds;
  pd = 0;
  constructor(t, e, s) {
    this.q = t, this._d = t.hr(ct, `#version 300 es
precision highp float;uniform sampler2D Uk;uniform sampler2D Ul;uniform vec2 Um;uniform vec2 Un;uniform vec2 Uo;uniform float Up;uniform float Uq;uniform int Ur;in vec2 v_uv;out vec4 fragColor;const int A=0;const int B=1;const int C=2;const int D=3;const int E=4;const int F=5;const int G=6;const int H=7;const int I=8;const int J=9;const int K=10;const int L=11;const int M=12;const int N=13;vec3 O(vec3 P,vec3 Q){return Q;}vec3 R(vec3 P,vec3 Q){return P+Q;}vec3 S(vec3 P,vec3 Q){return P*Q;}vec3 T(vec3 P,vec3 Q){return 1.-(1.-P)*(1.-Q);}vec3 U(vec3 P,vec3 Q){return max(P-Q,0.);}vec3 V(vec3 P,vec3 Q){return min(P,Q);}vec3 W(vec3 P,vec3 Q){return max(P,Q);}vec3 X(vec3 P,vec3 Q){return mix(2.*P*Q,1.-2.*(1.-P)*(1.-Q),step(0.5,P));}vec3 Y(vec3 P,vec3 Q){return mix(P-(1.-2.*Q)*P*(1.-P),mix(P+(2.*Q-1.)*(P*(3.-2.*P)-P),P+(2.*Q-1.)*(sqrt(P)-P),step(0.25,P)),step(0.5,Q));}vec3 Z(vec3 P,vec3 Q){return mix(2.*P*Q,1.-2.*(1.-P)*(1.-Q),step(0.5,Q));}vec3 a(vec3 P,vec3 Q){return mix(min(vec3(1.),P/max(1.-Q,0.0001)),vec3(1.),step(1.,Q));}vec3 b(vec3 P,vec3 Q){return mix(1.-min(vec3(1.),(1.-P)/max(Q,0.0001)),vec3(0.),step(Q,vec3(0.)));}vec3 c(vec3 P,vec3 Q){return abs(P-Q);}vec3 d(vec3 P,vec3 Q){return P+Q-2.*P*Q;}vec3 e(int f,vec3 P,vec3 Q){if(f==A)return O(P,Q);if(f==B)return R(P,Q);if(f==C)return S(P,Q);if(f==D)return T(P,Q);if(f==E)return U(P,Q);if(f==F)return V(P,Q);if(f==G)return W(P,Q);if(f==H)return X(P,Q);if(f==I)return Y(P,Q);if(f==J)return Z(P,Q);if(f==K)return a(P,Q);if(f==L)return b(P,Q);if(f==M)return c(P,Q);if(f==N)return d(P,Q);return O(P,Q);}void main(){vec4 g=texture(Ul,v_uv);vec2 h=v_uv*Um;vec2 i=h-Uo;vec2 j=Un*0.5;vec2 k=i-j;float l=cos(-Uq);float m=sin(-Uq);vec2 n=vec2(k.x*l-k.y*m,k.x*m+k.y*l);i=n+j;bool o=any(lessThan(i,vec2(0.)))||any(greaterThanEqual(i,Un));if(o){fragColor=g;return;}vec2 p=(floor(i)+0.5)/Un;vec4 q=texture(Uk,p);float r=q.a*Up;if(r<=0.){fragColor=g;return;}vec3 s=e(Ur,g.rgb,q.rgb);vec3 t=mix(g.rgb,s,r);float u=g.a+r*(1.-g.a);fragColor=vec4(t,u);}`), this.Ds = [this.q.et(e, s, 1), this.q.et(e, s, 1)];
  }
  vd(t) {
    const { base: e, targetFramebuffer: s, backgroundColor: i, layers: n, canvasWidth: h, canvasHeight: o } = t, c = this.q.Pa(), a = this.q.Ta();
    this.q.Ca(!1), this.q.Fa(!1);
    const u = this.Ds[0];
    u.begin(), this.q.zh(...i), u.end(), this.pd = 0, e.layer.bs && this.md(e.texture, h, o, e.width, e.height, e.layer.Ms, e.offsetX, e.offsetY, e.layer.Fs, "normal");
    for (const l of n) {
      const f = l.layer;
      f.bs && this.md(l.texture, h, o, l.width, l.height, f.Ms, l.offsetX, l.offsetY, f.Fs, f.Cs);
    }
    this.gd(s, h, o), this.q.Fa(a), this.q.Ca(c);
  }
  md(t, e, s, i, n, h, o, c, a, u) {
    const l = this.Ds[this.pd], f = this.pd === 0 ? 1 : 0, y = this.Ds[f], m = z(a);
    y.begin(), this.q.ee(this._d), this._d.re({ Uk: t, Ul: l.textures[0], Um: [e, s], Un: [i, n], Uo: [o, c], Up: h, Uq: m, Ur: ae[u] }), this.q.ne(0, 0, l.width, l.height), y.end(), this.pd = f;
  }
  gd(t, e, s) {
    const i = this.Ds[this.pd];
    t.begin(), this.q.ee(this._d), this._d.re({ Uk: i.textures[0], Ul: i.textures[0], Um: [e, s], Un: [i.width, i.height], Uo: [0, 0], Up: 1, Uq: 0, Ur: ae.normal }), this.q.ne(0, 0, e, s), t.end();
  }
  oe(t, e) {
    this.Ds[0].resize(t, e), this.Ds[1].resize(t, e);
  }
  L() {
    this._d.dispose(), this.Ds[0].dispose(), this.Ds[1].dispose();
  }
}
class Ys {
  yd = [];
  wd = [];
  Ad = !1;
  Zt;
  constructor(t = {}) {
    this.Zt = t;
  }
  async initialize(t) {
    for (const e of this.wd) t && await t(e), this.yd.push(e), this.Zt.onAdd?.(e);
    this.wd = [], this.Ad = !0;
  }
  get isReady() {
    return this.Ad;
  }
  add(t) {
    return this.Ad ? (this.yd.push(t), this.Zt.onAdd?.(t)) : this.wd.push(t), t;
  }
  addMany(t) {
    for (const e of t) this.add(e);
    return t;
  }
  remove(t) {
    const e = this.yd.indexOf(t);
    if (e !== -1) return this.yd.splice(e, 1), this.bd(t), !0;
    const s = this.wd.indexOf(t);
    return s !== -1 && (this.wd.splice(s, 1), this.bd(t), !0);
  }
  removeAt(t) {
    if (t < 0 || t >= this.yd.length) return;
    const [e] = this.yd.splice(t, 1);
    return this.bd(e), e;
  }
  move(t, e) {
    const s = this.yd.indexOf(t);
    if (s !== -1) {
      this.yd.splice(s, 1);
      const n = Z(e, 0, this.yd.length);
      return this.yd.splice(n, 0, t), this.Zt.onMove?.(t, s, n), !0;
    }
    const i = this.wd.indexOf(t);
    if (i !== -1) {
      this.wd.splice(i, 1);
      const n = Z(e, 0, this.wd.length);
      return this.wd.splice(n, 0, t), !0;
    }
    return !1;
  }
  swap(t, e) {
    if (t === e) return !0;
    const s = this.yd.indexOf(t), i = this.yd.indexOf(e);
    if (s !== -1 && i !== -1) return this.yd[s] = e, this.yd[i] = t, this.Zt.onSwap?.(t, e, s, i), !0;
    const n = this.wd.indexOf(t), h = this.wd.indexOf(e);
    return n !== -1 && h !== -1 && (this.wd[n] = e, this.wd[h] = t, !0);
  }
  clear() {
    for (const t of this.yd) this.bd(t);
    this.yd = [];
    for (const t of this.wd) this.bd(t);
    this.wd = [];
  }
  dispose() {
    this.clear(), this.Ad = !1;
  }
  get all() {
    return this.yd;
  }
  get pending() {
    return this.wd;
  }
  get length() {
    return this.yd.length;
  }
  get totalLength() {
    return this.yd.length + this.wd.length;
  }
  get isEmpty() {
    return this.yd.length === 0;
  }
  get(t) {
    return this.yd[t];
  }
  get first() {
    return this.yd[0];
  }
  get last() {
    return this.yd[this.yd.length - 1];
  }
  indexOf(t) {
    return this.yd.indexOf(t);
  }
  has(t) {
    return this.yd.includes(t) || this.wd.includes(t);
  }
  [Symbol.iterator]() {
    return this.yd[Symbol.iterator]();
  }
  bd(t) {
    this.Zt.onRemove?.(t), this.Zt.onDispose?.(t);
  }
}
async function Ct(r) {
  if (r.startsWith("./") || r.startsWith("../") || r.endsWith(".vert") || r.endsWith(".frag") || r.endsWith(".glsl")) {
    const t = await fetch(r);
    if (!t.ok) throw Error(`Failed to load shader from ${r}: ${t.statusText}`);
    return await t.text();
  }
  return r;
}
class Ce {
  q;
  Md = /* @__PURE__ */ new Map();
  xd = /* @__PURE__ */ new Map();
  We;
  Ds;
  Et = !1;
  constructor(t) {
    this.q = t, this.We = t.hr(ct, Te), this.Cd();
  }
  async register(t, e, s = {}) {
    const i = Object.entries(s), n = i.length > 0 ? i[0][1][0] : null;
    let h;
    if (typeof e == "string") {
      const c = await Ct(e);
      h = this.q.hr(ct, c), this.xd.set(t, h);
    } else h = e, this.xd.set(t, h);
    const o = { id: t, createShader: () => h, createUniforms: (c, a) => {
      const u = { u_resolution: [a.width, a.height] };
      for (const [l, [f, y]] of i) {
        let m = y;
        if (c != null) {
          if (typeof c == "number" && f === n) m = c;
          else if (typeof c == "object" && f in c) {
            const p = c[f];
            xe(p) && (m = p);
          }
        }
        u[l] = m;
      }
      return u;
    } };
    this.Md.set(t, o);
  }
  unregister(t) {
    const e = this.xd.get(t);
    return e && (e.dispose(), this.xd.delete(t)), this.Md.delete(t);
  }
  has(t) {
    return this.Md.has(t);
  }
  Dt(t, e) {
    this.Et || (this.Ds = [this.q.et(t, e, 1, { depth: !1 }), this.q.et(t, e, 1, { depth: !1 })], this.Et = !0);
  }
  Fd(t, e, s, i, n) {
    this.Ds[0].width === i && this.Ds[0].height === n || (this.Ds[0].resize(i, n), this.Ds[1].resize(i, n)), this.he(t, e, s, i, n, this.Ds);
  }
  he(t, e, s, i, n, h) {
    if (s.length === 0) return void this.Pd(t, e, i, n);
    this.Pd(t, h[0], i, n);
    let o = 0;
    for (let c = 0; c < s.length; c++) {
      const a = s[c], u = c === s.length - 1, l = o === 0 ? 1 : 0, f = u ? e : h[l];
      this.Td(a, h[o], f, i, n), u || (o = l);
    }
  }
  Td(t, e, s, i, n) {
    const h = this.Md.get(t.name);
    if (!h) return console.warn(`[textmode.js] Unknown filter: "${t.name}". Skipping.`), void this.Pd(e.textures[0], s, i, n);
    const o = this.Sd(t.name, h, i, n), c = { renderer: this.q, gl: this.q.context, width: i, height: n };
    s.begin(), this.q.ee(o), o.re({ u_texture: e.textures[0] });
    const a = h.createUniforms(t.params, c);
    o.re(a), this.q.ne(0, 0, i, n), s.end();
  }
  Sd(t, e, s, i) {
    let n = this.xd.get(t);
    if (!n && e) {
      const h = { renderer: this.q, gl: this.q.context, width: s, height: i };
      n = e.createShader(h), this.xd.set(t, n);
    }
    return n;
  }
  Pd(t, e, s, i) {
    e.begin(), this.q.ee(this.We), this.We.re({ u_texture: t, u_resolution: [s, i] }), this.q.ne(0, 0, s, i), e.end();
  }
  oe(t, e) {
    this.Ds && (this.Ds[0].resize(t, e), this.Ds[1].resize(t, e));
  }
  L() {
    for (const t of this.xd.values()) t.dispose();
    this.xd.clear(), this.Md.clear(), this.We.dispose(), this.Ds && (this.Ds[0].dispose(), this.Ds[1].dispose()), this.Et = !1;
  }
  Cd() {
    this.register("invert", `#version 300 es
precision highp float;uniform sampler2D u_texture;in vec2 v_uv;out vec4 fragColor;void main(){vec4 A=texture(u_texture,v_uv);fragColor=vec4(1.-A.rgb,A.a);}`, {}), this.register("grayscale", `#version 300 es
precision highp float;uniform sampler2D u_texture;uniform float U1;in vec2 v_uv;out vec4 fragColor;void main(){vec4 A=texture(u_texture,v_uv);float B=dot(A.rgb,vec3(0.299,0.587,0.114));vec3 C=mix(A.rgb,vec3(B),U1);fragColor=vec4(C,A.a);}`, { U1: ["amount", 1] }), this.register("sepia", `#version 300 es
precision highp float;uniform sampler2D u_texture;uniform float U1;in vec2 v_uv;out vec4 fragColor;void main(){vec4 A=texture(u_texture,v_uv);vec3 B;B.r=dot(A.rgb,vec3(0.393,0.769,0.189));B.g=dot(A.rgb,vec3(0.349,0.686,0.168));B.b=dot(A.rgb,vec3(0.272,0.534,0.131));vec3 C=mix(A.rgb,B,U1);fragColor=vec4(C,A.a);}`, { U1: ["amount", 1] }), this.register("threshold", `#version 300 es
precision highp float;uniform sampler2D u_texture;uniform float U4;in vec2 v_uv;out vec4 fragColor;void main(){vec4 A=texture(u_texture,v_uv);float B=dot(A.rgb,vec3(0.299,0.587,0.114));float C=step(U4,B);fragColor=vec4(vec3(C),A.a);}`, { U4: ["threshold", 0.5] });
  }
}
const ci = Object.freeze(Object.defineProperty({ __proto__: null, TextmodeFilterManager: Ce }, Symbol.toStringTag, { value: "Module" }));
class Re {
  ae;
  q;
  Ed;
  Od;
  Ld;
  Dd;
  Ad = !1;
  Rd = /* @__PURE__ */ new Set();
  kd = [];
  zd;
  Hd;
  Id;
  jd;
  Bd;
  constructor(t, e) {
    this.ae = t, this.q = t.q, this.Od = new Ce(this.q), this.Ed = new Ks(this.q, this.ae.v.width, this.ae.v.height), this.Ld = new Ys({ onRemove: (s) => this.ae.qs.kf(s), onDispose: (s) => s?.L() }), this.Dd = new I(this.q, { visible: !0, opacity: 1, fontSize: e.fontSize, fontSource: e.fontSource }), this.jd = new Se(this.ae, e.loadingScreen), this.Bd = new we(this.ae);
  }
  async Dt() {
    await this.Nd(this.Dd);
    const t = this.ae.v;
    this.zd = this.q.et(t.width, t.height, 1), this.Hd = this.q.et(t.width, t.height, 1), this.Id = this.zd, this.Od.Dt(t.width, t.height), await this.jd.Dt(), await this.Bd.Dt(), await this.Nd(this.jd.ce), await this.Nd(this.Bd.ce), await this.Ld.initialize((e) => this.Nd(e)), this.Ad = !0;
  }
  Gd(t, e) {
    this.kd.push({ name: t, params: e });
  }
  Xd() {
    this.kd = [];
  }
  add(t = {}) {
    const e = new I(this.q, t);
    return this.Ld.isReady && this.Nd(e), this.Ld.add(e), e;
  }
  remove(t) {
    this.Ld.remove(t);
  }
  move(t, e) {
    this.Ld.move(t, e);
  }
  swap(t, e) {
    this.Ld.swap(t, e);
  }
  clear() {
    this.Ld.clear();
  }
  Yd(t, e = [], s = !1) {
    this.ae.qs.Lf(), this.Dd.Ws(this.ae, this.ae.Vd);
    const i = [...this.q.state.gn._n];
    let n = i;
    this.Ld.all.forEach((h) => h.Ws(this.ae, this.ae.Vd));
    for (const h of e) h.bs && h.Ws(this.ae, this.ae.Vd, { skipPluginHooks: !0 });
    if (s && e.length > 0) {
      const h = e[0], o = [...this.q.state.gn._n], c = Math.max(0, Math.min(1, h.Ms));
      n = this.Qd(i, o, c);
    }
    this.Kd(t, n, e);
  }
  Qd(t, e, s) {
    const i = 1 - s;
    return [t[0] * i + e[0] * s, t[1] * i + e[1] * s, t[2] * i + e[2] * s, t[3] * i + e[3] * s];
  }
  Wd() {
    this.Yd(this.zd), this.Zd();
  }
  qd(t, e = !1) {
    this.Yd(this.zd, [t], e), this.Zd();
  }
  Zd() {
    let t = this.zd.textures[0];
    if (this.kd.length > 0) {
      const s = this.ae.v;
      this.Od.Fd(this.zd.textures[0], this.Hd, this.kd, s.width, s.height), t = this.Hd.textures[0], this.Id = this.Hd, this.kd = [];
    } else this.Id = this.zd;
    const e = this.ae.v;
    this.q.zh(0, 0, 0, 0), this.q.ee(this.ae.Jd), this.ae.Jd.re({ u_texture: t }), this.q.ne(0, 0, e.width, e.height), this.ae.qs.Rf();
  }
  $d(t) {
    const e = !this.q.ta();
    e && this.q.Jo(!0), this.q.ea(!0), this.q.state.Ge();
    try {
      this.q.state.Ki.ws(), this.q.state.te(), t.Ws(this.ae, this.ae.Vd, { skipPluginHooks: !0 });
      const s = t.texture, i = t.grid;
      if (!s || !i) return;
      this.q.zh(...this.q.state.gn._n), this.q.ee(this.ae.Jd), this.ae.Jd.re({ u_texture: s }), this.q.ne(i.offsetX, i.offsetY, i.width, i.height);
    } finally {
      this.q.state.Xe(), this.q.ra(), e && this.q.Jo(!1);
    }
  }
  Kd(t, e, s = []) {
    const i = this.ae.v, n = this.Dd.grid, h = this.Dd.texture;
    if (!h) return;
    const o = { layer: this.Dd, texture: h, width: n.width, height: n.height, offsetX: n.offsetX + this.Dd.l, offsetY: n.offsetY + this.Dd._ }, c = this.Ld.all.filter((a) => !!a.grid && !!a.texture).map((a) => {
      const u = a.grid;
      return { layer: a, texture: a.texture, width: u.width, height: u.height, offsetX: u.offsetX + a.l, offsetY: u.offsetY + a._ };
    });
    for (const a of s) {
      if (!a.bs || !a.grid || !a.texture) continue;
      const u = a.grid;
      c.push({ layer: a, texture: a.texture, width: u.width, height: u.height, offsetX: u.offsetX + a.l, offsetY: u.offsetY + a._ });
    }
    this.Ed.vd({ base: o, layers: c, targetFramebuffer: t, backgroundColor: e, canvasWidth: i.width, canvasHeight: i.height });
  }
  oe() {
    if (!this.Ad) return;
    const t = this.ae.v;
    this.Dd.oe(), this.Ld.all.forEach((e) => e.oe()), this.jd.ce?.oe(), this.Bd.ce?.oe(), this.Ed.oe(t.width, t.height), this.zd?.resize(t.width, t.height), this.Hd?.resize(t.width, t.height), this.Od?.oe(t.width, t.height);
  }
  L() {
    this.jd.L(), this.Bd.L(), this.Ld.dispose(), this.ae.qs.kf(this.Dd), this.Dd.L(), this.Od.L(), this.Ed.L(), this.zd?.dispose(), this.Hd?.dispose(), this.kd = [], this.Ad = !1;
  }
  get all() {
    return this.Ld.all;
  }
  get base() {
    return this.Dd;
  }
  get filters() {
    return this.Od;
  }
  get resultFramebuffer() {
    const t = this.kd.length > 0 ? this.Hd : this.Id ?? this.zd;
    if (!t) throw new M("LayerManager.resultFramebuffer is not available before initialization completes.");
    return t;
  }
  get loading() {
    return this.jd;
  }
  get errors() {
    return this.Bd;
  }
  t_() {
    const t = this.Ld.all;
    for (let e = t.length - 1; e >= 0; e--) {
      const s = t[e];
      if (s.bs && s.grid) return s.grid;
    }
    return this.Dd.grid;
  }
  i_(t) {
    this.Rd.add(t);
  }
  s_() {
    for (const t of this.Rd) t();
  }
  async Nd(t) {
    const e = { renderer: this.q, canvas: this.ae.v, filterManager: this.Od, createFramebuffer: (s, i, n = 1, h) => this.q.et(s, i, n, h) };
    await t.Ns(e), t.grid?.P(() => this.s_());
  }
}
const ui = Object.freeze(Object.defineProperty({ __proto__: null, TEXTMODE_LAYER_BLEND_MODES: ht, TextmodeLayer: I, TextmodeLayerManager: Re }, Symbol.toStringTag, { value: "Module" })), Js = { id: "brightness", createShader: ({ gl: r }) => new at(r, Ht, `#version 300 es
precision highp float;in vec2 v_uv;in vec3 v_worldPosition;uniform sampler2D u_image;uniform bool u_invert;uniform bool u_flipX;uniform bool u_flipY;uniform float u_charRotation;uniform bool u_charColorFixed;uniform vec4 u_charColor;uniform bool u_cellColorFixed;uniform vec4 u_cellColor;uniform vec4 u_backgroundColor;uniform int u_charCount;uniform vec3 u_charList[255];uniform bool Uv;uniform vec3 Uw;uniform int Ux;uniform vec3 Uy[5];uniform vec3 Uz[5];uniform vec3 UA;layout(location=0)out vec4 o_character;layout(location=1)out vec4 o_primaryColor;layout(location=2)out vec4 o_secondaryColor;layout(location=3)out vec4 A;const int B=5;float C(vec3 D){return dot(D,vec3(0.299f,0.587f,0.114f));}vec3 E(vec3 F){vec3 G=cross(dFdy(F),dFdx(F));float H=length(G);if(H<=0.000001f){return vec3(0.0f,0.0f,1.0f);}return G/H;}vec3 I(vec3 J,vec3 F){if(!Uv){return J;}vec3 K=J*Uw;if(Ux>0){vec3 G=E(F);for(int L=0;L<B;L++){if(L>=Ux){break;}vec3 M=Uy[L]-F;float N=length(M);vec3 O=N>0.000001f?M/N:G;float P=max(dot(G,O),0.0f);float Q=UA.x+N*UA.y+N*N*UA.z;float R=Q>0.0f?1.0f/Q:1.0f;K+=J*Uz[L]*(P*R);}}return clamp(K,0.0f,1.0f);}void main(){vec2 S=vec2(v_uv.x,1.0f-v_uv.y);vec4 T=texture(u_image,S);float U=C(T.rgb);vec2 V=vec2(0.);if(u_charCount>0){float W=float(u_charCount);float X=clamp(U*(W-1.0f),0.0f,W-1.0f);int Y=int(floor(X+0.5f));vec3 Z=u_charList[Y];V=Z.xy;}else{V=vec2(0.0f,0.0f);}vec4 a=u_charColorFixed?u_charColor:T;vec4 b=u_cellColorFixed?u_cellColor:T;if(T.a<0.01f){discard;}vec3 c=I(a.rgb,v_worldPosition);vec3 d=I(b.rgb,v_worldPosition);o_primaryColor=vec4(c,a.a);o_secondaryColor=vec4(d,b.a);A=vec4(0.);int e=int(u_invert?1:0);int f=int(u_flipX?1:0);int g=int(u_flipY?1:0);float h=float(e|(f<<1)|(g<<2))/255.;o_character=vec4(V,h,clamp(u_charRotation,0.0f,1.0f));}`), createUniforms: ({ source: r }) => r.createBaseConversionUniforms() };
class Pe {
  e_ = /* @__PURE__ */ new Map();
  xd = /* @__PURE__ */ new Map();
  constructor() {
    this.r_();
  }
  register(t) {
    this.e_.set(t.id, t);
  }
  unregister(t) {
    const e = this.xd.get(t);
    return e && (e.dispose(), this.xd.delete(t)), this.e_.delete(t);
  }
  has(t) {
    return this.e_.has(t);
  }
  Tc(t) {
    return this.e_.get(t);
  }
  Pc(t, e) {
    let s = this.xd.get(t);
    if (!s) {
      const i = this.e_.get(t);
      if (!i) throw Error(`[textmode.js] Conversion mode "${t}" is not registered.`);
      s = i.createShader(e), this.xd.set(t, s);
    }
    return s;
  }
  L() {
    for (const t of this.xd.values()) t.dispose();
    this.xd.clear(), this.e_.clear();
  }
  r_() {
    this.register(Js);
  }
}
const li = Object.freeze(Object.defineProperty({ __proto__: null, TextmodeConversionManager: Pe }, Symbol.toStringTag, { value: "Module" }));
class d {
  q;
  Vd;
  Jd;
  v;
  n_;
  Ll;
  h_;
  o_;
  a_;
  c_;
  ie;
  Ja;
  u_ = /* @__PURE__ */ new Set();
  qs;
  l_;
  f_;
  Wo = !1;
  d_ = !1;
  za = !1;
  __ = null;
  p_ = () => {
  };
  v_ = () => {
  };
  m_;
  g_;
  y_;
  Ea = !1;
  w_;
  A_;
  constructor(t = {}) {
    this.qs = new Zs(this), this.Ea = t.overlay ?? !1, this.l_ = new Promise((s) => {
      this.f_ = s;
    }), this.v = new Rs(t), this.q = new Cs(this.v.Xa()), this.Vd = this.q.hr(ct, `#version 300 es
precision highp float;uniform sampler2D u_characterTexture;uniform vec2 u_charsetDimensions;uniform sampler2D U6;uniform sampler2D U7;uniform sampler2D U5;uniform bool U8;uniform vec2 U9;uniform vec2 Ua;uniform vec4 Ub;in vec2 v_uv;out vec4 fragColor;mat2 A(float B){float C=sin(B);float D=cos(B);return mat2(D,-C,C,D);}float E(vec3 F){return dot(F,vec3(0.299f,0.587f,0.114f));}void main(){vec2 G=gl_FragCoord.xy/Ua;vec2 H=G*U9;vec2 I=floor(H);vec2 J=(I+0.5)/U9;vec4 K=texture(U6,J);vec4 L=texture(U7,J);vec4 M=texture(U5,J);int N=int(M.r*255.+0.5);int O=int(M.g*255.+0.5);int P=int(M.a*255.+0.5);if(N==255&&O==255&&int(M.b*255.+0.5)==0&&P==0){fragColor=vec4(0.);return;}int Q=int(M.b*255.+0.5);bool R=(Q&1)!=0;bool S=(Q&2)!=0;bool T=(Q&4)!=0;int U=N+O*256;int V=int(u_charsetDimensions.x);int W=U/V;int X=U-(W*V);float Y=(u_charsetDimensions.y-1.)-float(W);vec2 Z=1./u_charsetDimensions;vec2 a=vec2(float(X),Y)*Z;vec2 b=a+Z;float c=-M.a*360.*0.017453292;vec2 d=fract(H)-0.5f;vec2 e=vec2(S?-1.:1.,T?-1.:1.);d*=e;d=A(c)*d+0.5;vec2 f=a+clamp(d,0.,1.)*Z;const float g=0.0001;if(any(lessThan(f,a-g))||any(greaterThan(f,b+g))){fragColor=R?K:L;return;}vec4 h=texture(u_characterTexture,f);if(!U8){fragColor=h;return;}float i=(h.a>0.0f&&E(h.rgb)>0.5f)?1.0f:0.0f;if(R)i=1.0f-i;vec4 j=mix(Ub,L,L.a);fragColor=mix(j,K,i);}`), this.Jd = this.q.hr(ct, Te), this.n_ = new Ps(t.frameRate ?? 60), this.c_ = new Re(this, t);
    const e = () => this.b_();
    this.Ll = new Ls(this.v, e), this.h_ = new qs(this.v, e, this.Ll), this.o_ = new Ds(), this.a_ = new zs(), this.Ja = new Pe(), this.qs.qf(t.plugins ?? []), this.Dt();
  }
  M_(t) {
    this.u_.add(t), t.j?.(() => {
      this.u_.delete(t);
    });
  }
  x_(t, e) {
    this.v.oe(t, e), this.c_?.oe(), this.q.xa(), this.Ws();
  }
  C_() {
    const t = this.c_?.base.grid;
    if (!t) return;
    const e = t.cols, s = t.rows;
    for (const i of this.u_) i instanceof Ft && i.oe(e, s);
    this.w_ && this.w_.oe(e, s);
  }
  async Dt() {
    await this.c_.Dt(), this.f_();
    const t = this.c_.base.grid;
    this.C_(), this.c_.i_(() => {
      this.Ll.Ru(), this.h_.Ru();
    }), this.Ea && (this.w_ = lt.Sc(this.q, this.Ja, this.v.targetCanvas, t.cols, t.rows)), this.F_(), t.P(() => {
      this.C_();
    }), this.n_.Gc(() => this.Ws());
    try {
      await this.qs.zf(), await this.p_(), await this.qs.If(), this.n_.Bc = 0, this.loading.hd();
    } catch (e) {
      this.P_(e, "setup");
    }
  }
  F_() {
    this.m_ = () => {
      this.Ea && this.resizeCanvas(this.v.targetCanvas.width, this.v.targetCanvas.height), this.v_();
    }, window.addEventListener("resize", this.m_), this.Ll.Cu(), this.h_.Cu(), this.o_.Cu(), this.a_.Cu(), this.g_ = () => {
      this.o_.rl();
    }, window.addEventListener("blur", this.g_), this.Ea && (this.y_ = new ResizeObserver(() => {
      this.resizeCanvas(this.v.targetCanvas.width, this.v.targetCanvas.height);
    }), this.y_.observe(this.v.targetCanvas));
  }
  Ws() {
    if (this.n_.Kc(), this.n_.Zc(), this.Ll.Bu(), this.a_.Bu(), this.errors.xe) {
      this.errors.Pe();
      const t = this.errors.ce;
      return void (t && this.c_.$d(t));
    }
    if (this.loading.xe) try {
      this.loading.Pe();
      const t = this.loading.ce;
      this.loading.we === "active" ? t && this.c_.$d(t) : t ? this.c_.qd(t, !0) : this.c_.Wd();
    } catch (t) {
      this.P_(t, "loading screen");
    }
    else {
      this.Wo = !0, this.q.Jo(!0);
      try {
        this.Ea && Pt(this.q.context, this.w_.texture, this.v.targetCanvas), this.c_.Wd();
      } catch (t) {
        this.P_(t, "draw loop");
      } finally {
        if (this.Wo = !1, this.q.Jo(!1), this.d_ && !this.za) this.T_();
        else if (this.__) {
          const { width: t, height: e } = this.__;
          this.__ = null, this.x_(t, e);
        }
      }
    }
  }
  resizeCanvas(t, e) {
    this.Wo ? this.__ = { width: t, height: e } : this.x_(t, e);
  }
  destroy() {
    this.za || this.d_ || (this.d_ = !0, this.n_.Yc(), this.Wo || this.T_());
  }
  async T_() {
    this.v.L(), await this.qs.ed(), window.removeEventListener("resize", this.m_), window.removeEventListener("blur", this.g_), this.y_?.disconnect(), this.Ll.Du(), this.h_.Du(), this.o_.Du(), this.a_.Du(), this.c_?.L(), this.Ja?.L();
    for (const t of this.u_) t.dispose();
    this.u_.clear(), this.Vd.dispose(), this.Jd.dispose(), this.q.L(), this.w_?.dispose(), this.za = !0;
  }
  filter(t, e) {
    this.c_.Gd(t, e);
  }
  draw(t) {
    this.c_.base.draw(t);
  }
  async loadFont(t, e = !0) {
    if (e) return await this.c_.base.loadFont(t), this.c_.base.font;
    if (t instanceof O) return t.Et || await t.Dt(), t;
    const s = new O(this.q);
    return await s.Dt(t), this.M_(s), s;
  }
  async loadTileset(t, e = !0) {
    if (e) return await this.c_.base.loadTileset(t), this.c_.base.font;
    if (t instanceof P) return t.Et || await t.Dt(), t;
    const s = new P(this.q, t.fontSize, t);
    return await s.Dt(), this.M_(s), s;
  }
  fontSize(t) {
    return this.c_.base.fontSize(t);
  }
  useTileColors(t) {
    return this.c_.base.useTileColors(t);
  }
  inputGrid(t) {
    return t === void 0 ? this.A_ ?? "topmost" : t === "topmost" ? (this.A_ = void 0, this.Ll.Ru(), void this.h_.Ru()) : (this.A_ = t, this.Ll.Ru(), void this.h_.Ru());
  }
  b_() {
    return this.A_ ? this.A_ : this.c_.t_();
  }
  P_(t, e) {
    console.error(`Error during ${e}:`, t), this.loading.hd(), this.errors.Ce(t);
  }
  async setup(t) {
    this.p_ = t;
  }
  windowResized(t) {
    this.v_ = t;
  }
  get grid() {
    return this.ie?.grid ?? this.c_.base.grid;
  }
  get font() {
    return this.ie?.font ?? this.c_.base.font;
  }
  get width() {
    return this.v.width;
  }
  get height() {
    return this.v.height;
  }
  get canvas() {
    return this.v.canvas;
  }
  get isDisposed() {
    return this.za;
  }
  get overlay() {
    return this.w_;
  }
  get loading() {
    return this.c_.loading;
  }
  get errors() {
    return this.c_.errors;
  }
  get layers() {
    return this.c_;
  }
  get filters() {
    return this.c_.filters;
  }
  get conversions() {
    return this.Ja;
  }
  get isRenderingFrame() {
    return this.Wo;
  }
}
class Kt {
  constructor() {
  }
  static create(t = {}) {
    return new d(t);
  }
  static setErrorLevel(t) {
    et.Oi(t);
  }
  static get version() {
    return "0.12.0";
  }
}
const Yt = ["keyPressed", "keyTyped", "keyReleased"], Jt = ["mouseClicked", "doubleClicked", "mousePressed", "mouseReleased", "mouseMoved", "mouseDragged", "mouseScrolled"], jt = ["touchStarted", "touchMoved", "touchEnded", "touchCancelled"], Qt = ["tap", "doubleTap", "longPress", "swipe", "pinch", "rotateGesture"], Gt = ["gamepadConnected", "gamepadDisconnected", "gamepadButtonPressed", "gamepadButtonReleased", "gamepadAxisChanged"], js = [...Yt, ...Jt, ...jt, ...Qt, ...Gt], Qs = new Set(Yt), Gs = new Set(Jt), $s = new Set(jt), ti = new Set(Qt), ei = new Set(Gt);
function Rt(r, t) {
  switch ((function(e) {
    const s = e;
    if (Qs.has(s)) return "keyboard";
    if (Gs.has(s)) return "mouse";
    if ($s.has(s)) return "touch";
    if (ti.has(s)) return "gesture";
    if (ei.has(s)) return "gamepad";
    throw Error(`Unknown event: "${s}"`);
  })(t)) {
    case "keyboard":
      return r.o_.gu;
    case "mouse":
      return r.Ll.gu;
    case "touch":
    case "gesture":
      return r.h_.gu;
    case "gamepad":
      return r.a_.gu;
  }
}
const ce = /* @__PURE__ */ new WeakMap();
function _(r, t, e) {
  let s = ce.get(r);
  s || (s = /* @__PURE__ */ new Map(), ce.set(r, s)), s.get(t)?.();
  const i = Rt(r, t).su(t, e);
  s.set(t, i);
}
d.prototype.mouseClicked = function(r) {
  _(this, "mouseClicked", r);
}, d.prototype.doubleClicked = function(r) {
  _(this, "doubleClicked", r);
}, d.prototype.mousePressed = function(r) {
  _(this, "mousePressed", r);
}, d.prototype.mouseReleased = function(r) {
  _(this, "mouseReleased", r);
}, d.prototype.mouseMoved = function(r) {
  _(this, "mouseMoved", r);
}, d.prototype.mouseDragged = function(r) {
  _(this, "mouseDragged", r);
}, d.prototype.mouseScrolled = function(r) {
  _(this, "mouseScrolled", r);
}, d.prototype.cursor = function(r) {
  this.Ll.Au(r);
}, d.prototype.requestPointerLock = function() {
  return this.Ll.bu();
}, d.prototype.exitPointerLock = function() {
  this.Ll.Mu();
}, Object.defineProperty(d.prototype, "mouse", { get: function() {
  return this.Ll.ku();
}, configurable: !0, enumerable: !0 }), Object.defineProperty(d.prototype, "mouseIsPressed", { get: function() {
  return this.Ll.ju();
}, configurable: !0, enumerable: !0 }), Object.defineProperty(d.prototype, "pmouse", { get: function() {
  return this.Ll.zu();
}, configurable: !0, enumerable: !0 }), Object.defineProperty(d.prototype, "movedX", { get: function() {
  return this.Ll.Hu();
}, configurable: !0, enumerable: !0 }), Object.defineProperty(d.prototype, "movedY", { get: function() {
  return this.Ll.Iu();
}, configurable: !0, enumerable: !0 }), d.prototype.frameRate = function(r) {
  return r === void 0 ? this.n_.kc : this.n_.Qc(r, () => this.Ws());
}, d.prototype.targetFrameRate = function(r) {
  if (r === void 0) return this.n_.Oc;
  this.n_.Wc(r);
}, d.prototype.noLoop = function() {
  this.n_.Yc();
}, d.prototype.loop = function() {
  this.n_.Vc(() => this.Ws());
}, d.prototype.redraw = function(r = 1) {
  if (et.Ei(typeof r == "number" && r > 0 && Number.isInteger(r), "Redraw count must be a positive integer.", { method: "redraw", providedValue: r })) for (let t = 0; t < r; t++) this.Ws();
}, d.prototype.isLooping = function() {
  return this.n_.Rc;
}, d.prototype.deltaTime = function() {
  return this.n_.jc;
}, Object.defineProperty(d.prototype, "frameCount", { get: function() {
  return this.n_.Bc;
}, set: function(r) {
  this.n_.Bc = r;
}, configurable: !0, enumerable: !0 }), Object.defineProperty(d.prototype, "millis", { get: function() {
  return this.n_.qc;
}, set: function(r) {
  this.n_.qc = r;
}, configurable: !0, enumerable: !0 }), Object.defineProperty(d.prototype, "secs", { get: function() {
  return this.n_.Jc;
}, set: function(r) {
  this.n_.Jc = r;
}, configurable: !0, enumerable: !0 }), d.prototype.touchStarted = function(r) {
  _(this, "touchStarted", r);
}, d.prototype.touchMoved = function(r) {
  _(this, "touchMoved", r);
}, d.prototype.touchEnded = function(r) {
  _(this, "touchEnded", r);
}, d.prototype.touchCancelled = function(r) {
  _(this, "touchCancelled", r);
}, d.prototype.tap = function(r) {
  _(this, "tap", r);
}, d.prototype.doubleTap = function(r) {
  _(this, "doubleTap", r);
}, d.prototype.longPress = function(r) {
  _(this, "longPress", r);
}, d.prototype.swipe = function(r) {
  _(this, "swipe", r);
}, d.prototype.pinch = function(r) {
  _(this, "pinch", r);
}, d.prototype.rotateGesture = function(r) {
  _(this, "rotateGesture", r);
}, Object.defineProperty(d.prototype, "touches", { get: function() {
  return this.h_.Yl();
}, configurable: !0, enumerable: !0 }), d.prototype.keyPressed = function(r) {
  _(this, "keyPressed", r);
}, d.prototype.keyTyped = function(r) {
  _(this, "keyTyped", r);
}, d.prototype.keyReleased = function(r) {
  _(this, "keyReleased", r);
}, d.prototype.isKeyPressed = function(r) {
  return this.o_.Ju(r);
}, Object.defineProperty(d.prototype, "lastKeyPressed", { get: function() {
  return this.o_.tl();
}, configurable: !0, enumerable: !0 }), Object.defineProperty(d.prototype, "lastKeyReleased", { get: function() {
  return this.o_.il();
}, configurable: !0, enumerable: !0 }), Object.defineProperty(d.prototype, "pressedKeys", { get: function() {
  return this.o_.sl();
}, configurable: !0, enumerable: !0 }), Object.defineProperty(d.prototype, "modifierState", { get: function() {
  return this.o_.el();
}, configurable: !0, enumerable: !0 }), d.prototype.gamepadConnected = function(r) {
  _(this, "gamepadConnected", r);
}, d.prototype.gamepadDisconnected = function(r) {
  _(this, "gamepadDisconnected", r);
}, d.prototype.gamepadButtonPressed = function(r) {
  _(this, "gamepadButtonPressed", r);
}, d.prototype.gamepadButtonReleased = function(r) {
  _(this, "gamepadButtonReleased", r);
}, d.prototype.gamepadAxisChanged = function(r) {
  _(this, "gamepadAxisChanged", r);
}, d.prototype.gamepad = function(r) {
  return this.a_.nf(r);
}, Object.defineProperty(d.prototype, "gamepads", { get: function() {
  return this.a_.rf();
}, configurable: !0, enumerable: !0 }), d.prototype.perspective = function(r, t, e) {
  this.layers.base.perspective(r, t, e);
}, d.prototype.createCamera = function() {
  return this.layers.base.createCamera();
}, d.prototype.setCamera = function(r) {
  this.layers.base.setCamera(r);
}, d.prototype.resetCamera = function() {
  this.layers.base.resetCamera();
}, d.prototype.camera = function(r, t, e, s = 0, i = 0, n = 0, h = 0, o = 1, c = 0) {
  this.layers.base.camera(r, t, e, s, i, n, h, o, c);
}, d.prototype.lookAt = function(r, t, e, s, i, n) {
  this.layers.base.lookAt(r, t, e, s, i, n);
}, d.prototype.ortho = function(r, t) {
  this.layers.base.ortho(r, t);
}, d.prototype.rect = function(r = 1, t = 1) {
  this.q.ca(r, t);
}, d.prototype.point = function() {
  this.q.ca(1, 1);
}, d.prototype.line = function(r, t, e, s) {
  this.q.ua(r, t, e, s);
}, d.prototype.lineWeight = function(r) {
  if (r === void 0) return this.q.state.gn.en;
  this.q.state.gn.bn(r);
}, d.prototype.ellipse = function(r = 1, t = 1) {
  this.q.la(r / 2, t / 2);
}, d.prototype.triangle = function(r, t, e, s, i, n) {
  this.q.fa(r, t, e, s, i, n);
}, d.prototype.arc = function(r, t, e, s) {
  this.q._a(r / 2, t / 2, e, s);
}, d.prototype.bezierCurve = function(r, t, e, s, i, n, h, o) {
  this.q.da(r, t, e, s, i, n, h, o);
}, d.prototype.box = function(r = 50, t, e) {
  const s = t ?? r, i = e ?? s;
  this.q.pa(r, s, i);
}, d.prototype.sphere = function(r = 50) {
  this.q.va(r);
}, d.prototype.torus = function(r = 50, t = 10) {
  this.q.ma(r, t);
}, d.prototype.cone = function(r = 50, t) {
  this.q.ga(r, t ?? r);
}, d.prototype.cylinder = function(r = 50, t) {
  this.q.ya(r, t ?? r);
}, d.prototype.ellipsoid = function(r = 50, t, e) {
  this.q.wa(r, t ?? r, e ?? r);
};
const ue = new Float32Array(16);
function le(r, t, e, s, i) {
  if (t === void 0) {
    const [h, o, c, a] = r.q.state.gn.hn;
    return E.ye(h, o, c, a);
  }
  const n = E.pe(t, e, s, i);
  r.q.state.gn.Cn(n.r, n.g, n.b, n.a);
}
function fe(r, t, e, s, i) {
  if (t === void 0) {
    const [h, o, c, a] = r.q.state.gn.an;
    return E.ye(h, o, c, a);
  }
  const n = E.pe(t, e, s, i);
  r.q.state.gn.Fn(n.r, n.g, n.b, n.a);
}
function de(r) {
  if (typeof r != "object" || r === null) return !1;
  const t = r;
  return typeof t.x == "number" && typeof t.y == "number" && typeof t.z == "number";
}
d.prototype.rotate = function(r = 0, t, e) {
  if (typeof t == "number" || e !== void 0) return this.q.state.Ln.Or(r), this.q.state.Ln.Lr(t ?? 0), void this.q.state.Ln.Dr(e ?? 0);
  t === void 0 ? this.q.state.Ln.Dr(r) : Array.isArray(t) ? this.q.state.Ln.Rr(r, t[0] ?? 0, t[1] ?? 0, t[2] ?? 0) : this.q.state.Ln.Rr(r, t.x ?? 0, t.y ?? 0, t.z ?? 0);
}, d.prototype.rotateX = function(r) {
  if (r === void 0) return _t(this.q.state.Ln.vr);
  this.q.state.Ln.Or(r);
}, d.prototype.rotateY = function(r) {
  if (r === void 0) return _t(this.q.state.Ln.mr);
  this.q.state.Ln.Lr(r);
}, d.prototype.rotateZ = function(r) {
  if (r === void 0) return _t(this.q.state.Ln.gr);
  this.q.state.Ln.Dr(r);
}, d.prototype.translate = function(r = 0, t = 0, e = 0) {
  this.q.state.Ln.Tr(r, t, e);
}, d.prototype.translateX = function(r) {
  if (r === void 0) return this.q.state.Ln.dr;
  this.q.state.Ln.Tr(r, 0, 0);
}, d.prototype.translateY = function(r) {
  if (r === void 0) return this.q.state.Ln._r;
  this.q.state.Ln.Tr(0, r, 0);
}, d.prototype.translateZ = function(r) {
  if (r === void 0) return this.q.state.Ln.pr;
  this.q.state.Ln.Tr(0, 0, r);
}, d.prototype.scale = function(r, t, e) {
  this.q.state.Ln.Er(r, t, e);
}, d.prototype.resetMatrix = function() {
  this.q.state.Ln.kr();
}, d.prototype.applyMatrix = function(...r) {
  let t;
  if (r.length === 1 && typeof r[0] != "number") t = r[0];
  else {
    if (r.length !== 16) throw Error("applyMatrix() expects either a 16-length array-like or 16 numeric arguments.");
    t = r;
  }
  if (t.length !== 16) throw Error("applyMatrix() expects exactly 16 values.");
  for (let e = 0; e < 16; e++) ue[e] = Number(t[e] ?? 0);
  this.q.state.Ln.zr(ue);
}, d.prototype.push = function() {
  this.q.state.Ge();
}, d.prototype.pop = function() {
  this.q.state.Xe();
}, d.prototype.color = function(r, t, e, s) {
  return E.pe(r, t, e, s);
}, d.prototype.background = function(r, t, e, s = 255) {
  if (r === void 0) {
    const [n, h, o, c] = this.q.state.gn._n;
    return E.ye(n, h, o, c);
  }
  const i = E.pe(r, t, e, s);
  this.q.ba(i.r, i.g, i.b, i.a);
}, d.prototype.clear = function() {
  this.q.zh(0, 0, 0, 0);
}, d.prototype.charColor = function(r, t, e, s) {
  return le(this, r, t, e, s);
}, d.prototype.stroke = function(r, t, e, s) {
  return le(this, r, t, e, s);
}, d.prototype.cellColor = function(r, t, e, s) {
  return fe(this, r, t, e, s);
}, d.prototype.fill = function(r, t, e, s) {
  return fe(this, r, t, e, s);
}, d.prototype.char = function(r) {
  if (r === void 0) return this.q.state.gn.nn;
  const t = this.font;
  let e;
  if (e = typeof r == "number" ? t.characters[r].character : r, e.length === 0) throw Error("char() requires at least one character.");
  this.q.state.gn.Mn(t.jt(e)), this.q.state.gn.xn(e);
}, d.prototype.flipX = function(r) {
  if (r === void 0) return this.q.state.gn.cn;
  this.q.state.gn.Pn(r);
}, d.prototype.flipY = function(r) {
  if (r === void 0) return this.q.state.gn.un;
  this.q.state.gn.Tn(r);
}, d.prototype.charRotation = function(r) {
  if (r === void 0) return 360 * this.q.state.gn.dn;
  this.q.state.gn.En(r);
}, d.prototype.invert = function(r) {
  if (r === void 0) return this.q.state.gn.ln;
  this.q.state.gn.Sn(r);
}, d.prototype.ambientLight = function(r, t, e, s) {
  const i = E.pe(r, t, e, s), [n, h, o] = i.normalized;
  this.q.state.$s.Jr(n, h, o);
}, d.prototype.pointLight = function(r, t, e, s, i, n) {
  let h, o;
  if (typeof r == "number" && typeof t == "number" && typeof e == "number") if (h = E.pe(r, t, e), de(s)) o = s;
  else {
    if (typeof s != "number" || typeof i != "number" || typeof n != "number") throw Error("pointLight() expected RGB + XYZ or RGB + { x, y, z }.");
    o = { x: s, y: i, z: n };
  }
  else if (h = E.pe(r), de(t)) o = t;
  else {
    if (typeof t != "number" || typeof e != "number" || typeof s != "number") throw Error("pointLight() expected color + XYZ or color + { x, y, z }.");
    o = { x: t, y: e, z: s };
  }
  const [c, a, u] = h.normalized;
  this.q.state.$s.$r(c, a, u, o.x, o.y, o.z);
}, d.prototype.lightFalloff = function(r, t, e) {
  this.q.state.$s.tn(r, t, e);
}, d.prototype.noLights = function() {
  this.q.state.$s.sn();
}, d.prototype.shader = function(r) {
  this.q.ia(r);
}, d.prototype.resetShader = function() {
  this.q.sa();
}, d.prototype.setUniform = function(r, t) {
  this.q.ur(r, t);
}, d.prototype.setUniforms = function(r) {
  this.q.re(r);
}, d.prototype.createFilterShader = async function(r) {
  const t = await Ct(r), e = this.q.na(t);
  return this.M_(e), e;
}, d.prototype.createShader = async function(r, t) {
  const e = await Ct(r), s = await Ct(t), i = this.q.hr(e, s);
  return this.M_(i), i;
};
class ft extends Ft {
  Kt;
  constructor(t, e, s, i, n, h, o, c, a) {
    super(t, e, s, i, n, h, o, c), this.Kt = a;
  }
  static S_(t, e, s, i, n) {
    const h = t.context, { texture: o, width: c, height: a } = Vt(h, s);
    return new ft(h, t, o, e, c, a, i, n, s);
  }
  rt() {
    this.Kt instanceof HTMLVideoElement ? this.Kt.readyState >= this.Kt.HAVE_CURRENT_DATA && Pt(this.Se, this.Va, this.Kt) : Pt(this.Se, this.Va, this.Kt);
  }
  Qe() {
    return this.De = null, super.Qe();
  }
  xc() {
    this.rt();
  }
  get source() {
    return this.Kt;
  }
}
class K extends ft {
  constructor(t, e, s, i, n, h, o, c, a) {
    super(t, e, s, i, h, o, c, a, n);
  }
  dispose() {
    super.dispose(), this.E_.pause(), this.E_.src = "", this.E_.load();
  }
  static async U_(t) {
    const e = document.createElement("video");
    return e.crossOrigin = "anonymous", e.loop = !0, e.muted = !0, e.playsInline = !0, await new Promise((s, i) => {
      e.addEventListener("loadedmetadata", () => s(), { once: !0 }), e.addEventListener("error", (n) => {
        const h = n.target;
        i(Error("Failed to load video: " + (h.error?.message || "Unknown error")));
      }, { once: !0 }), e.src = t;
    }), e;
  }
  static S_(t, e, s, i, n) {
    const h = t.context, { texture: o, width: c, height: a } = Vt(h, s, h.LINEAR, h.LINEAR, h.CLAMP_TO_EDGE, h.CLAMP_TO_EDGE);
    return new K(h, t, o, e, s, c, a, i, n);
  }
  static async Sc(t, e, s, i, n) {
    const h = await K.U_(s);
    return K.S_(t, e, h, i, n);
  }
  async play() {
    await this.E_.play();
  }
  pause() {
    this.E_.pause();
  }
  stop() {
    this.E_.pause(), this.E_.currentTime = 0;
  }
  speed(t) {
    return this.E_.playbackRate = t, this;
  }
  loop(t = !0) {
    return this.E_.loop = t, this;
  }
  time(t) {
    return this.E_.currentTime = t, this;
  }
  volume(t) {
    return this.E_.volume = Z(t, 0, 1), this;
  }
  get videoElement() {
    return this.E_;
  }
  get currentTime() {
    return this.E_.currentTime;
  }
  get duration() {
    return this.E_.duration;
  }
  get isPlaying() {
    return !this.E_.paused && !this.E_.ended;
  }
  get E_() {
    return this.Kt;
  }
}
var zt;
d.prototype.createFramebuffer = function(r) {
  const t = this.q.et(r.width ?? this.grid.cols, r.height ?? this.grid.rows, r.attachments ?? 3);
  return this.M_(t), t;
}, d.prototype.image = function(r, t, e) {
  this.q.ha(r, t, e, this.font), r instanceof Tt && this.q.Ye();
}, d.prototype.loadImage = async function(r) {
  const t = r, e = new Promise((h, o) => {
    const c = new Image();
    c.crossOrigin = "anonymous", c.onload = () => h(c), c.onerror = (a) => o(a), c.src = t;
  }), [s] = await Promise.all([e, this.l_]), i = this.grid;
  if (!i) throw Error("[textmode.js] Cannot load image before grid initialization completes.");
  const n = lt.Sc(this.q, this.Ja, s, i.cols, i.rows);
  return this.M_(n), n;
}, d.prototype.loadVideo = async function(r) {
  const [t] = await Promise.all([K.U_(r), this.l_]), e = this.grid;
  if (!e) throw Error("[textmode.js] Cannot load video before grid initialization completes.");
  const s = K.S_(this.q, this.Ja, t, e.cols, e.rows);
  return this.M_(s), s;
}, d.prototype.createTexture = function(r) {
  const t = this.grid, e = ft.S_(this.q, this.Ja, r, t?.cols ?? 1, t?.rows ?? 1);
  return this.M_(e), e;
}, (zt = d.prototype).on = function(r, t) {
  return Rt(this, r).su(r, t);
}, zt.off = function(r, t) {
  Rt(this, r).eu(r, t);
}, zt.once = function(r, t) {
  return Rt(this, r).ru(r, t);
};
const fi = Object.freeze(Object.defineProperty({ __proto__: null }, Symbol.toStringTag, { value: "Module" })), di = Object.freeze(Object.defineProperty({ __proto__: null, TextmodeImage: lt, TextmodeSource: Ft, TextmodeTexture: ft, TextmodeVideo: K }, Symbol.toStringTag, { value: "Module" })), si = Object.freeze(Object.defineProperty({ __proto__: null, GAMEPAD_EVENT_NAMES: Gt }, Symbol.toStringTag, { value: "Module" })), ii = Object.freeze(Object.defineProperty({ __proto__: null, KEYBOARD_EVENT_NAMES: Yt }, Symbol.toStringTag, { value: "Module" })), ri = Object.freeze(Object.defineProperty({ __proto__: null, MOUSE_EVENT_NAMES: Jt }, Symbol.toStringTag, { value: "Module" })), ni = Object.freeze(Object.defineProperty({ __proto__: null, GESTURE_EVENT_NAMES: Qt, TOUCH_EVENT_NAMES: jt }, Symbol.toStringTag, { value: "Module" })), pi = Object.freeze(Object.defineProperty({ __proto__: null, INPUT_EVENT_NAMES: js, gamepad: si, keyboard: ii, mouse: ri, touch: ni }, Symbol.toStringTag, { value: "Module" })), gi = Kt.create, mi = Kt.setErrorLevel, vi = Kt.version;
export {
  X as TextmodeCamera,
  E as TextmodeColor,
  Tt as TextmodeFramebuffer,
  Le as TextmodeGrid,
  at as TextmodeShader,
  d as Textmodifier,
  li as conversion,
  gi as create,
  oi as errors,
  ci as filters,
  hi as fonts,
  pi as input,
  ui as layering,
  ai as loading,
  di as media,
  fi as plugins,
  mi as setErrorLevel,
  Kt as textmode,
  vi as version
};
