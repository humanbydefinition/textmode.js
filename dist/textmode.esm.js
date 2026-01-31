var he = Object.defineProperty;
var oe = (n, t, e) => t in n ? he(n, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : n[t] = e;
var o = (n, t, e) => oe(n, typeof t != "symbol" ? t + "" : t, e);
class S extends Error {
  constructor(t, e) {
    super(S.i(t, e)), this.name = "TextmodeError";
  }
  static i(t, e) {
    return `${t}${e && Object.keys(e).length > 0 ? `

📋 Context:` + Object.entries(e).map(([i, s]) => `
  - ${i}: ${S.h(s)}`).join("") : ""}

${"↓".repeat(24)}
`;
  }
  static h(t) {
    if (t === null) return "null";
    if (t === void 0) return "undefined";
    if (typeof t == "string") return `"${t}"`;
    if (typeof t == "number" || typeof t == "boolean") return t + "";
    if (Array.isArray(t)) return t.length === 0 ? "[]" : t.length <= 5 ? `[${t.map((e) => S.h(e)).join(", ")}]` : `[${t.slice(0, 3).map((e) => S.h(e)).join(", ")}, ... +${t.length - 3} more]`;
    if (typeof t == "object") {
      const e = Object.keys(t);
      return e.length === 0 ? "{}" : e.length <= 3 ? `{ ${e.map((i) => `${i}: ${S.h(t[i])}`).join(", ")} }` : `{ ${e.slice(0, 2).map((i) => `${i}: ${S.h(t[i])}`).join(", ")}, ... +${e.length - 2} more }`;
    }
    return t + "";
  }
}
var ae = ((n) => (n[n.SILENT = 0] = "SILENT", n[n.WARNING = 1] = "WARNING", n[n.ERROR = 2] = "ERROR", n[n.THROW = 3] = "THROW", n))(ae || {});
const _ = class _ {
  constructor() {
    o(this, "l", { globalLevel: 3 });
  }
  static u() {
    return _.o || (_.o = new _()), _.o;
  }
  v(t, e) {
    const i = "%c[textmode.js] Oops! (╯°□°)╯︵ Something went wrong in your code.", s = "color: #f44336; font-weight: bold; background: #ffebee; padding: 2px 6px; border-radius: 3px;";
    switch (this.l.globalLevel) {
      case 0:
        return !1;
      case 1:
        return console.group(i, s), console.warn(S.i(t, e)), console.groupEnd(), !1;
      case 2:
        return console.group(i, s), console.error(S.i(t, e)), console.groupEnd(), !1;
      default:
        throw new S(t, e);
    }
  }
  m(t, e, i) {
    return !!t || (this.v(e, i), !1);
  }
  _(t) {
    this.l.globalLevel = t;
  }
};
o(_, "o", null);
let pt = _;
const At = pt.u();
class at {
  constructor() {
    o(this, "A", /* @__PURE__ */ new Set());
  }
  C(t) {
    this.A.add(t);
  }
  dispose() {
    for (const t of this.A) t();
    this.A.clear();
  }
}
function N(n) {
  return n * (Math.PI / 180);
}
function et(n) {
  return n * (180 / Math.PI);
}
function Rt(n, t, e, i) {
  return et(Math.atan2(i - t, e - n));
}
function $(n, t, e, i) {
  return Math.hypot(e - n, i - t);
}
function L(n, t, e) {
  return Math.min(Math.max(n, t), e);
}
function Pt(n) {
  return (n % 360 + 360) % 360 / 360;
}
function St(n, t) {
  n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL, 1), n.texImage2D(n.TEXTURE_2D, 0, n.RGBA, n.RGBA, n.UNSIGNED_BYTE, t);
}
function rt(n, t, e) {
  n.bindTexture(n.TEXTURE_2D, t), St(n, e), n.bindTexture(n.TEXTURE_2D, null);
}
function wt(n, t, e = n.NEAREST, i = n.NEAREST, s = n.CLAMP_TO_EDGE, r = n.CLAMP_TO_EDGE) {
  const h = n.createTexture();
  return n.bindTexture(n.TEXTURE_2D, h), Ot(n, e, i, s, r), St(n, t), n.bindTexture(n.TEXTURE_2D, null), h;
}
function Ot(n, t, e, i, s) {
  n.texParameteri(n.TEXTURE_2D, n.TEXTURE_MIN_FILTER, t), n.texParameteri(n.TEXTURE_2D, n.TEXTURE_MAG_FILTER, e), n.texParameteri(n.TEXTURE_2D, n.TEXTURE_WRAP_S, i), n.texParameteri(n.TEXTURE_2D, n.TEXTURE_WRAP_T, s);
}
function j(n, t, e, i, s, r = 0, h = WebGL2RenderingContext.FLOAT, a = !1) {
  n.enableVertexAttribArray(t), n.vertexAttribPointer(t, e, h, a, i, s), n.vertexAttribDivisor(t, r);
}
function Ut(n, t, e, i, s) {
  n.bindBuffer(t, e), n.bufferData(t, i, s), n.bindBuffer(t, null);
}
function bt(n) {
  let t = 0, e = 0;
  return n instanceof HTMLVideoElement ? (t = n.videoWidth, e = n.videoHeight) : n instanceof HTMLImageElement ? (t = n.naturalWidth, e = n.naturalHeight) : n instanceof HTMLCanvasElement && (t = n.width, e = n.height), { width: t, height: e };
}
class vt extends at {
  constructor(e, i, s = i, r = 1, h = {}, a) {
    super();
    o(this, "M");
    o(this, "F");
    o(this, "l");
    o(this, "$");
    o(this, "P");
    o(this, "S", []);
    o(this, "U", null);
    o(this, "k");
    o(this, "R");
    o(this, "D", null);
    o(this, "L", /* @__PURE__ */ new Map());
    this.M = i, this.F = s, this.$ = e, this.k = L(r, 1, 8), this.R = a, this.l = { filter: "nearest", wrap: "clamp", format: "rgba", type: "unsigned_byte", depth: !0, ...h };
    const l = e.getParameter(e.MAX_DRAW_BUFFERS), u = e.getParameter(e.MAX_COLOR_ATTACHMENTS);
    this.k = Math.min(this.k, l, u), this.P = e.createFramebuffer(), this.O(), this.H(), this.l.depth && this.I();
  }
  O() {
    const e = this.$, i = this.l.filter === "linear" ? e.LINEAR : e.NEAREST, s = this.l.wrap === "repeat" ? e.REPEAT : e.CLAMP_TO_EDGE;
    for (let r = 0; r < this.k; r++) {
      const h = e.createTexture();
      e.bindTexture(e.TEXTURE_2D, h), Ot(e, i, i, s, s), this.G(h, !1), this.S.push(h);
    }
    e.bindTexture(e.TEXTURE_2D, null);
  }
  G(e, i = !0) {
    const s = this.$, r = this.l.type === "float" ? s.FLOAT : s.UNSIGNED_BYTE, h = r === s.FLOAT ? s.RGBA32F : s.RGBA8, a = s.RGBA;
    i && s.bindTexture(s.TEXTURE_2D, e), s.texImage2D(s.TEXTURE_2D, 0, h, this.M, this.F, 0, a, r, null);
  }
  H() {
    const e = this.$;
    if (e.bindFramebuffer(e.FRAMEBUFFER, this.P), this.k === 1) e.framebufferTexture2D(e.FRAMEBUFFER, e.COLOR_ATTACHMENT0, e.TEXTURE_2D, this.S[0], 0);
    else {
      const i = [];
      for (let s = 0; s < this.k; s++) {
        const r = e.COLOR_ATTACHMENT0 + s;
        e.framebufferTexture2D(e.FRAMEBUFFER, r, e.TEXTURE_2D, this.S[s], 0), i.push(r);
      }
      e.drawBuffers(i);
    }
    e.bindFramebuffer(e.FRAMEBUFFER, null);
  }
  I() {
    const e = this.$;
    this.U = e.createRenderbuffer(), this.j(), e.bindFramebuffer(e.FRAMEBUFFER, this.P), e.framebufferRenderbuffer(e.FRAMEBUFFER, e.DEPTH_ATTACHMENT, e.RENDERBUFFER, this.U), e.bindFramebuffer(e.FRAMEBUFFER, null);
  }
  j() {
    if (!this.U) return;
    const e = this.$;
    e.bindRenderbuffer(e.RENDERBUFFER, this.U), e.renderbufferStorage(e.RENDERBUFFER, e.DEPTH_COMPONENT24, this.M, this.F), e.bindRenderbuffer(e.RENDERBUFFER, null);
  }
  N(e) {
    rt(this.$, this.S[0], e);
  }
  resize(e, i) {
    this.M = e, this.F = i, this.L.clear();
    const s = this.$;
    for (const r of this.S) this.G(r, !0);
    s.bindTexture(s.TEXTURE_2D, null), this.j(), this.D = null;
  }
  readPixels(e) {
    const i = this.L.get(e);
    if (i) return i;
    const s = this.$, r = this.M, h = this.F, a = new Uint8Array(r * h * 4), l = s.getParameter(s.READ_FRAMEBUFFER_BINDING);
    s.bindFramebuffer(s.READ_FRAMEBUFFER, this.P), s.readBuffer(s.COLOR_ATTACHMENT0 + e), s.readPixels(0, 0, r, h, s.RGBA, s.UNSIGNED_BYTE, a), s.bindFramebuffer(s.READ_FRAMEBUFFER, l);
    const u = 4 * r, c = new Uint8Array(a.length);
    for (let f = 0; f < h; f++) {
      const g = (h - 1 - f) * u, p = f * u;
      c.set(a.subarray(g, g + u), p);
    }
    return this.L.set(e, c), c;
  }
  begin() {
    const e = this.$;
    this.L.clear(), this.R.X(), this.R.Y(this.P, this.M, this.F, this.k), this.l.depth && e.clear(e.DEPTH_BUFFER_BIT), this.R.state.K();
  }
  end() {
    this.R.state.W(), this.R.Z(), this.R.q();
  }
  V() {
    return this.D || this.J(), this.D;
  }
  J() {
    if (!this.R) return;
    const e = this.k > 1, i = this.k > 2, s = this.k > 3, r = { U0: this.S[0], U1: e ? this.S[1] : this.S[0], U2: i ? this.S[2] : this.S[0], U3: s ? this.S[3] : this.S[0], U4: [this.M, this.F], U5: e, U6: i, U7: s }, h = this.R.materialManager.tt;
    this.D = this.R.materialManager.st(h, r);
  }
  dispose() {
    const e = this.$;
    e.deleteFramebuffer(this.P), this.S.forEach((i) => {
      e.deleteTexture(i);
    }), this.U && e.deleteRenderbuffer(this.U), super.dispose();
  }
  get width() {
    return this.M;
  }
  get height() {
    return this.F;
  }
  get framebuffer() {
    return this.P;
  }
  get textures() {
    return this.S;
  }
  get attachmentCount() {
    return this.k;
  }
}
function I(n) {
  return typeof n == "object" && n !== null && "textures" in n && Array.isArray(n.textures);
}
function Xt(n) {
  if (typeof n == "number" || typeof n == "boolean") return !0;
  if (Array.isArray(n)) {
    if (n.length === 0) return !0;
    const t = n[0];
    return typeof t == "number" || !!Array.isArray(t);
  }
  return n instanceof Float32Array || n instanceof Int32Array || !!I(n) || typeof WebGLTexture < "u" && n instanceof WebGLTexture;
}
class K extends at {
  constructor(e, i, s) {
    super();
    o(this, "$");
    o(this, "et");
    o(this, "it", /* @__PURE__ */ new Map());
    o(this, "rt", /* @__PURE__ */ new Map());
    o(this, "nt", /* @__PURE__ */ new Map());
    o(this, "ht", 0);
    o(this, "ot", /* @__PURE__ */ new Map());
    o(this, "ct");
    this.$ = e, this.ct = e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS) ?? 16, this.et = this.lt(i, s), this.ut();
  }
  ut() {
    const e = this.$.getProgramParameter(this.et, this.$.ACTIVE_UNIFORMS);
    for (let i = 0; i < e; i++) {
      const s = this.$.getActiveUniform(this.et, i);
      if (s) {
        const r = s.name.replace(/\[0\]$/, ""), h = this.$.getUniformLocation(this.et, r);
        h && (this.it.set(r, h), this.rt.set(r, { type: s.type, size: s.size }));
      }
    }
  }
  lt(e, i) {
    const s = this.ft(this.$.VERTEX_SHADER, e), r = this.ft(this.$.FRAGMENT_SHADER, i), h = this.$.createProgram();
    if (!h) throw Error("Failed to create WebGL program");
    if (this.$.attachShader(h, s), this.$.attachShader(h, r), this.$.linkProgram(h), !this.$.getProgramParameter(h, this.$.LINK_STATUS)) {
      const a = this.$.getProgramInfoLog(h);
      throw Error("Shader program link error: " + a);
    }
    return this.$.deleteShader(s), this.$.deleteShader(r), h;
  }
  ft(e, i) {
    const s = this.$.createShader(e);
    if (!s) throw Error("Failed to create shader of type " + e);
    if (this.$.shaderSource(s, i), this.$.compileShader(s), !this.$.getShaderParameter(s, this.$.COMPILE_STATUS)) {
      const r = this.$.getShaderInfoLog(s);
      throw this.$.deleteShader(s), Error("Shader compilation error: " + r);
    }
    return s;
  }
  dt() {
    this.$.useProgram(this.et), this.vt();
  }
  vt() {
    this.ht = 0, this.ot.clear();
    for (const [e, i] of this.nt) (i instanceof WebGLTexture || I(i)) && this.nt.delete(e);
  }
  gt(e) {
    for (const i in e) this._t(i, e[i]);
  }
  _t(e, i) {
    const s = this.it.get(e);
    if (!s) return;
    const r = this.nt.get(e);
    let h = !0;
    if (r !== void 0 && (typeof i == "number" || typeof i == "boolean" ? r === i && (h = !1) : (i instanceof WebGLTexture || I(i)) && r === i && (h = !1)), !h) return;
    typeof i == "number" || typeof i == "boolean" || i instanceof WebGLTexture || I(i) ? this.nt.set(e, i) : this.nt.delete(e);
    const a = this.rt.get(e);
    if (!a) return;
    const { type: l, size: u } = a, c = this.$;
    if (i instanceof WebGLTexture) {
      const f = this.yt(e);
      return c.uniform1i(s, f), c.activeTexture(c.TEXTURE0 + f), void c.bindTexture(c.TEXTURE_2D, i);
    }
    if (I(i)) {
      const f = this.yt(e);
      return c.uniform1i(s, f), c.activeTexture(c.TEXTURE0 + f), void c.bindTexture(c.TEXTURE_2D, i.textures[0]);
    }
    if (Xt(i), typeof i != "number") if (typeof i != "boolean") if (Array.isArray(i) && Array.isArray(i[0])) {
      const f = i.flat();
      switch (l) {
        case c.FLOAT_VEC2:
          c.uniform2fv(s, f);
          break;
        case c.FLOAT_VEC3:
          c.uniform3fv(s, f);
          break;
        case c.FLOAT_VEC4:
          c.uniform4fv(s, f);
      }
    } else {
      const f = i;
      switch (l) {
        case c.FLOAT:
          u > 1 ? c.uniform1fv(s, f) : c.uniform1f(s, f[0]);
          break;
        case c.FLOAT_VEC2:
          c.uniform2fv(s, f);
          break;
        case c.FLOAT_VEC3:
          c.uniform3fv(s, f);
          break;
        case c.FLOAT_VEC4:
          c.uniform4fv(s, f);
          break;
        case c.INT:
          u > 1 ? c.uniform1iv(s, f) : c.uniform1i(s, f[0]);
          break;
        case c.INT_VEC2:
          c.uniform2iv(s, f);
          break;
        case c.INT_VEC3:
          c.uniform3iv(s, f);
          break;
        case c.INT_VEC4:
          c.uniform4iv(s, f);
          break;
        case c.BOOL:
          c.uniform1iv(s, f);
          break;
        case c.FLOAT_MAT2:
          c.uniformMatrix2fv(s, !1, f);
          break;
        case c.FLOAT_MAT3:
          c.uniformMatrix3fv(s, !1, f);
          break;
        case c.FLOAT_MAT4:
          c.uniformMatrix4fv(s, !1, f);
      }
    }
    else c.uniform1i(s, i ? 1 : 0);
    else l === c.INT || l === c.BOOL ? c.uniform1i(s, i) : c.uniform1f(s, i);
  }
  yt(e) {
    const i = this.ot.get(e);
    if (i !== void 0) return i;
    if (this.ht >= this.ct) throw Error(`[textmode.js] Shader attempted to bind more than ${this.ct} texture samplers. Uniform "${e}" cannot be assigned.`);
    const s = this.ht++;
    return this.ot.set(e, s), s;
  }
  get program() {
    return this.et;
  }
  dispose() {
    this.$.deleteProgram(this.et), super.dispose();
  }
}
const Lt = /* @__PURE__ */ new WeakMap();
function ft(n, t) {
  Lt.set(n, t);
}
function Dt(n) {
  return Lt.get(n);
}
function it(n, t, e, i, s = 255) {
  n[0] = t / 255, n[1] = (e ?? t) / 255, n[2] = (i ?? t) / 255, n[3] = s / 255;
}
class lt {
  constructor() {
    o(this, "At", 1);
    o(this, "wt", 0);
    o(this, "bt", 0);
    o(this, "Ct", 0);
    o(this, "xt", 0);
    o(this, "Mt", 0);
    o(this, "Ft", 0);
    o(this, "$t", [0, 0, 0]);
    o(this, "Pt", "");
    o(this, "Tt", [1, 1, 1, 1]);
    o(this, "St", [0, 0, 0, 1]);
    o(this, "Et", !1);
    o(this, "kt", !1);
    o(this, "Rt", !1);
    o(this, "Dt", 0);
    o(this, "Lt", [0, 0, 0, 1]);
    o(this, "Ot", !1);
    o(this, "zt", []);
    o(this, "Ht", []);
  }
  static Bt() {
    return { It: 1, wt: 0, bt: 0, Ct: 0, xt: 0, Mt: 0, Ft: 0, Dt: 0, Gt: !1, jt: !1, Rt: !1, Ot: !1, Qt: [0, 0, 0], Nt: "", Xt: [1, 1, 1, 1], Yt: [0, 0, 0, 1] };
  }
  Kt(t) {
    t.It = this.At, t.wt = this.wt, t.bt = this.bt, t.Ct = this.Ct, t.xt = this.xt, t.Mt = this.Mt, t.Ft = this.Ft, t.Gt = this.Et, t.jt = this.kt, t.Rt = this.Rt, t.Dt = this.Dt, t.Ot = this.Ot, t.Qt[0] = this.$t[0], t.Qt[1] = this.$t[1], t.Qt[2] = this.$t[2], t.Nt = this.Pt, t.Xt[0] = this.Tt[0], t.Xt[1] = this.Tt[1], t.Xt[2] = this.Tt[2], t.Xt[3] = this.Tt[3], t.Yt[0] = this.St[0], t.Yt[1] = this.St[1], t.Yt[2] = this.St[2], t.Yt[3] = this.St[3];
  }
  Wt(t) {
    this.At = t.It, this.wt = t.wt, this.bt = t.bt, this.Ct = t.Ct, this.xt = t.xt, this.Mt = t.Mt, this.Ft = t.Ft, this.Et = t.Gt, this.kt = t.jt, this.Rt = t.Rt, this.Dt = t.Dt, this.Ot = t.Ot, this.$t[0] = t.Qt[0], this.$t[1] = t.Qt[1], this.$t[2] = t.Qt[2], this.Pt = t.Nt, this.Tt[0] = t.Xt[0], this.Tt[1] = t.Xt[1], this.Tt[2] = t.Xt[2], this.Tt[3] = t.Xt[3], this.St[0] = t.Yt[0], this.St[1] = t.Yt[1], this.St[2] = t.Yt[2], this.St[3] = t.Yt[3];
  }
  K() {
    let t = this.Ht.pop();
    t || (t = lt.Bt()), this.Kt(t), this.zt.push(t);
  }
  W() {
    const t = this.zt.pop();
    t ? (this.Wt(t), this.Ht.push(t)) : console.warn("pop() called without matching push()");
  }
  Zt(t) {
    this.Kt(t);
  }
  qt(t) {
    this.At = Math.abs(t);
  }
  Vt() {
    this.wt = 0, this.bt = 0, this.Ct = 0, this.xt = 0, this.Mt = 0, this.Ft = 0, this.Ot = !1;
  }
  Jt(t) {
    t !== 0 && (this.xt += N(t));
  }
  ts(t) {
    t !== 0 && (this.Mt += N(t));
  }
  ss(t) {
    t !== 0 && (this.Ft += N(t));
  }
  es(t = 0, e = 0, i = 0) {
    t === 0 && e === 0 && i === 0 || (this.wt += t, this.bt += e, this.Ct += i);
  }
  rs(t) {
    this.es(t, 0, 0);
  }
  ns(t) {
    this.es(0, t, 0);
  }
  hs(t) {
    this.es(0, 0, t);
  }
  cs(t) {
    this.$t[0] = t[0], this.$t[1] = t[1], this.$t[2] = t[2];
  }
  ls(t) {
    this.Pt = t;
  }
  us(t, e, i, s = 255) {
    it(this.Tt, t, e, i, s);
  }
  fs(t, e, i, s = 255) {
    it(this.St, t, e, i, s);
  }
  ds(t) {
    this.Et = t;
  }
  ps(t) {
    this.kt = t;
  }
  vs(t) {
    this.Rt = t;
  }
  gs(t) {
    this.Dt = Pt(t);
  }
  _s(t, e, i, s) {
    it(this.Lt, t, e, i, s);
  }
  As(t) {
    this.Ot = t;
  }
  get canvasBackgroundColor() {
    return this.Lt;
  }
  get charColor() {
    return this.Tt;
  }
  get cellColor() {
    return this.St;
  }
  get lineWeight() {
    return this.At;
  }
  get character() {
    return this.$t;
  }
  get characterString() {
    return this.Pt;
  }
  get useOrtho() {
    return this.Ot;
  }
  get rotationX() {
    return this.xt;
  }
  get rotationY() {
    return this.Mt;
  }
  get rotationZ() {
    return this.Ft;
  }
  get translationX() {
    return this.wt;
  }
  get translationY() {
    return this.bt;
  }
  get translationZ() {
    return this.Ct;
  }
  get charRotation() {
    return this.Dt;
  }
  get flipX() {
    return this.Et;
  }
  get flipY() {
    return this.kt;
  }
  get invert() {
    return this.Rt;
  }
}
const mt = new Float32Array([-0.5, -0.5, 0, 0, 0.5, -0.5, 1, 0, -0.5, 0.5, 0, 1, -0.5, 0.5, 0, 1, 0.5, -0.5, 1, 0, 0.5, 0.5, 1, 1]), k = { ws: 16, bs: WebGL2RenderingContext.TRIANGLES, Cs: { Ms: { size: 2, offset: 0 }, Fs: { size: 2, offset: 8 } } };
class le {
  constructor(t) {
    o(this, "$");
    o(this, "$s");
    o(this, "Ps");
    this.$ = t, this.$s = t.createBuffer(), this.Ps = new Float32Array(mt.length);
  }
  Ts(t, e, i, s) {
    const r = this.$, h = Dt(this.$), a = h[2], l = h[3], u = t / a * 2 - 1, c = (t + i) / a * 2 - 1, f = 1 - (e + s) / l * 2, g = 1 - e / l * 2, p = mt, v = this.Ps;
    for (let d = 0; d < p.length; d += 4) {
      const m = p[d], y = p[d + 1], w = p[d + 2], A = p[d + 3], R = u + (m + 0.5) * (c - u), b = f + (y + 0.5) * (g - f);
      v[d] = R, v[d + 1] = b, v[d + 2] = w, v[d + 3] = A;
    }
    r.bindBuffer(r.ARRAY_BUFFER, this.$s), r.bufferData(r.ARRAY_BUFFER, v, r.DYNAMIC_DRAW), j(r, 0, 2, 16, 0), j(r, 1, 2, 16, 8), r.drawArrays(r.TRIANGLES, 0, 6), r.disableVertexAttribArray(1), r.disableVertexAttribArray(0), r.bindBuffer(r.ARRAY_BUFFER, null);
  }
  Ss() {
    this.$.deleteBuffer(this.$s);
  }
}
var E = ((n) => (n.RECTANGLE = "rectangle", n.LINE = "line", n.ELLIPSE = "ellipse", n.ARC = "arc", n.TRIANGLE = "triangle", n.BEZIER_CURVE = "bezier_curve", n))(E || {});
const ce = { rectangle: 2, line: 2, ellipse: 2, triangle: 2, arc: 3, bezier_curve: 4 };
class ue {
  constructor(t) {
    o(this, "$");
    o(this, "Es", /* @__PURE__ */ new Map());
    o(this, "ks", null);
    this.$ = t;
  }
  Rs(t, e, i, s) {
    const r = this.$, h = t.program;
    let a = this.Es.get(t);
    a || (a = /* @__PURE__ */ new Map(), this.Es.set(t, a), t.C(() => this.Ds(t)));
    let l = a.get(e) || null;
    if (l) this.ks !== l && (r.bindVertexArray(l), this.ks = l);
    else {
      l = r.createVertexArray(), a.set(e, l), r.bindVertexArray(l), this.ks = l, r.bindBuffer(r.ARRAY_BUFFER, s);
      const u = r.getAttribLocation(h, "A0");
      u !== -1 && j(r, u, i.Cs.Ms.size, i.ws, i.Cs.Ms.offset, 0, r.FLOAT, !1);
      const c = r.getAttribLocation(h, "A1");
      c !== -1 && j(r, c, i.Cs.Fs.size, i.ws, i.Cs.Fs.offset, 0, r.FLOAT, !1);
    }
  }
  Ds(t) {
    const e = this.Es.get(t);
    if (e) {
      for (const [, i] of e) i && this.$.deleteVertexArray(i);
      this.Es.delete(t);
    }
  }
  Ls() {
    this.ks !== null && (this.$.bindVertexArray(null), this.ks = null);
  }
  Ss() {
    for (const [, t] of this.Es) for (const [, e] of t) e && this.$.deleteVertexArray(e);
    this.Es.clear();
  }
}
class U {
}
o(U, "BYTES_PER_INSTANCE", 144), o(U, "FLOATS_PER_INSTANCE", 36);
function O(n, t) {
  return { location: -1, size: n, type: WebGL2RenderingContext.FLOAT, normalized: !1, stride: U.BYTES_PER_INSTANCE, offset: t, divisor: 1 };
}
class nt {
}
o(nt, "STRIDE", U.BYTES_PER_INSTANCE), o(nt, "ATTRIBUTES", { A2: O(2, 0), A3: O(2, 8), A4: O(3, 16), A5: O(4, 28), A6: O(4, 44), A7: O(4, 60), A8: O(3, 76), A9: O(3, 88), Aa: O(4, 100), Ab: O(4, 116), Ac: O(3, 132) });
class fe {
  constructor(t = 1e3, e = 1.5) {
    o(this, "Os");
    o(this, "zs");
    o(this, "Hs");
    o(this, "Bs", 0);
    o(this, "Is", 0);
    this.zs = t, this.Hs = e;
    const i = t * U.FLOATS_PER_INSTANCE;
    this.Os = new Float32Array(i);
  }
  Gs(t) {
    if (t <= this.zs) return;
    const e = Math.ceil(t * this.Hs), i = this.zs;
    this.zs = e;
    const s = new Float32Array(e * U.FLOATS_PER_INSTANCE), r = i * U.FLOATS_PER_INSTANCE;
    s.set(this.Os.subarray(0, Math.min(r, this.Bs))), this.Os = s;
  }
  js(t) {
    this.Bs += t, this.Is++;
  }
  Qs() {
    this.Bs = 0, this.Is = 0;
  }
  Ns(t = 0, e) {
    return this.Os.subarray(t, e ?? this.Bs);
  }
  get Xs() {
    return this.Is;
  }
  get Ys() {
    return this.zs;
  }
  get Ks() {
    return this.Bs;
  }
  get Ws() {
    return this.Is === 0;
  }
}
class de {
  constructor(t) {
    o(this, "Os");
    this.Os = t;
  }
  Zs(t) {
    this.Os.Is >= this.Os.zs && this.Os.Gs(this.Os.Is + 1);
    const e = this.Os.Os, i = this.Os.Bs;
    e[i + 0] = t.x, e[i + 1] = t.y, e[i + 2] = t.width, e[i + 3] = t.height, e[i + 4] = t.char0, e[i + 5] = t.char1, e[i + 6] = t.char2, e[i + 7] = t.r1, e[i + 8] = t.g1, e[i + 9] = t.b1, e[i + 10] = t.a1, e[i + 11] = t.r2, e[i + 12] = t.g2, e[i + 13] = t.b2, e[i + 14] = t.a2, e[i + 15] = t.invert, e[i + 16] = t.flipX, e[i + 17] = t.flipY, e[i + 18] = t.charRot, e[i + 19] = t.translationX, e[i + 20] = t.translationY, e[i + 21] = t.translationZ, e[i + 22] = t.rotationX, e[i + 23] = t.rotationY, e[i + 24] = t.rotationZ;
    const s = t.curveParams0, r = t.curveParams1;
    return e[i + 25] = s[0], e[i + 26] = s[1], e[i + 27] = s[2], e[i + 28] = s[3], e[i + 29] = r[0], e[i + 30] = r[1], e[i + 31] = r[2], e[i + 32] = r[3], e[i + 33] = t.depth, e[i + 34] = t.baseZ, e[i + 35] = t.geometryType, this.Os.js(U.FLOATS_PER_INSTANCE), this.Os.Is - 1;
  }
  get Xs() {
    return this.Os.Xs;
  }
}
class ge {
  constructor(t, e = 1e3) {
    o(this, "$");
    o(this, "qs", null);
    o(this, "Vs", 0);
    o(this, "Js", /* @__PURE__ */ new WeakMap());
    o(this, "te", 0);
    o(this, "se", /* @__PURE__ */ new WeakMap());
    this.$ = t, this.ee(e);
  }
  ee(t) {
    const e = this.$;
    this.qs && e.deleteBuffer(this.qs), this.te++, this.qs = e.createBuffer();
    const i = t * U.BYTES_PER_INSTANCE;
    Ut(e, e.ARRAY_BUFFER, this.qs, i, e.DYNAMIC_DRAW), this.Vs = t;
  }
  ie(t) {
    this.ee(t);
  }
  get Ys() {
    return this.Vs;
  }
  re(t, e) {
    if (e === 0) return;
    const i = this.$;
    i.bindBuffer(i.ARRAY_BUFFER, this.qs);
    const s = e * U.FLOATS_PER_INSTANCE;
    i.bufferSubData(i.ARRAY_BUFFER, 0, t, 0, s);
  }
  ne(t) {
    let e = this.Js.get(t);
    if (!e) {
      e = /* @__PURE__ */ new Map();
      const i = this.$;
      for (const s in nt.ATTRIBUTES) {
        const r = s, h = i.getAttribLocation(t, r);
        h !== -1 && e.set(r, h);
      }
      this.Js.set(t, e);
    }
    return e;
  }
  he(t) {
    const e = this.$, i = t.program;
    if (this.se.get(i) === this.te) return;
    const s = this.ne(i);
    for (const [r, h] of s) {
      const a = nt.ATTRIBUTES[r];
      a && j(e, h, a.size, a.stride, a.offset, a.divisor, a.type, a.normalized);
    }
    this.se.set(i, this.te);
  }
  Ss() {
    this.qs && (this.$.deleteBuffer(this.qs), this.qs = null);
  }
}
class pe {
  constructor(t, e = 1e3, i = 1.5) {
    o(this, "$");
    o(this, "Os");
    o(this, "oe");
    o(this, "ae");
    this.$ = t, this.Os = new fe(e, i), this.oe = new de(this.Os), this.ae = new ge(t, e);
  }
  ce(t) {
    var r, h, a, l, u, c, f, g, p, v;
    const e = this.Os;
    e.Is >= e.zs && e.Gs(e.Is + 1);
    const i = e.Os, s = e.Bs;
    return i[s + 0] = t.Ms[0], i[s + 1] = t.Ms[1], i[s + 2] = t.le[0], i[s + 3] = t.le[1], i[s + 4] = t.Qt[0], i[s + 5] = t.Qt[1], i[s + 6] = t.Qt[2], i[s + 7] = t.Xt[0], i[s + 8] = t.Xt[1], i[s + 9] = t.Xt[2], i[s + 10] = t.Xt[3], i[s + 11] = t.Yt[0], i[s + 12] = t.Yt[1], i[s + 13] = t.Yt[2], i[s + 14] = t.Yt[3], i[s + 15] = t.ue[0], i[s + 16] = t.ue[1], i[s + 17] = t.ue[2], i[s + 18] = t.Dt, i[s + 19] = ((r = t.fe) == null ? void 0 : r[0]) ?? 0, i[s + 20] = ((h = t.fe) == null ? void 0 : h[1]) ?? 0, i[s + 21] = ((a = t.fe) == null ? void 0 : a[2]) ?? 0, i[s + 22] = ((l = t.de) == null ? void 0 : l[0]) ?? 0, i[s + 23] = ((u = t.de) == null ? void 0 : u[1]) ?? 0, i[s + 24] = ((c = t.de) == null ? void 0 : c[2]) ?? 0, t.pe && t.ve ? (i[s + 25] = ((f = t.ge) == null ? void 0 : f[0]) ?? 0, i[s + 26] = ((g = t.ge) == null ? void 0 : g[1]) ?? 0, i[s + 27] = ((p = t.me) == null ? void 0 : p[0]) ?? 0, i[s + 28] = ((v = t.me) == null ? void 0 : v[1]) ?? 0, i[s + 29] = t.pe[0], i[s + 30] = t.pe[1], i[s + 31] = t.ve[0], i[s + 32] = t.ve[1]) : t._e ? (i[s + 25] = t._e[0], i[s + 26] = t._e[1], i[s + 27] = 0, i[s + 28] = 0, i[s + 29] = 0, i[s + 30] = 0, i[s + 31] = 0, i[s + 32] = 0) : (i[s + 25] = 0, i[s + 26] = 0, i[s + 27] = 0, i[s + 28] = 0, i[s + 29] = 0, i[s + 30] = 0, i[s + 31] = 0, i[s + 32] = 0), i[s + 33] = t.ye || 0, i[s + 34] = t.Ae || 0, i[s + 35] = t.we || 0, e.js(U.FLOATS_PER_INSTANCE), e.Is - 1;
  }
  be() {
    this.Os.Ys > this.ae.Ys && this.ae.ie(this.Os.Ys);
  }
  get instanceBuffer() {
    return this.Os;
  }
  get writer() {
    return this.oe;
  }
  get Ce() {
    return this.Os.Xs;
  }
  get Ws() {
    return this.Os.Ws;
  }
  xe() {
    this.Os.Qs();
  }
  he(t) {
    const e = this.Os.Xs;
    if (e === 0) return;
    this.be();
    const i = this.Os.Ns();
    this.ae.re(i, e), this.ae.he(t);
  }
  Ts(t, e) {
    const i = this.Os.Xs;
    i !== 0 && this.$.drawArraysInstanced(t, 0, e, i);
  }
  Ss() {
    this.ae.Ss();
  }
}
class z {
  constructor(t, e, i, s) {
    o(this, "$");
    o(this, "Me");
    o(this, "Fe");
    o(this, "$e");
    o(this, "Pe", null);
    o(this, "Te", [0, 0, 0, 0]);
    o(this, "Se", [0, 0, 0, 0]);
    o(this, "Ee");
    var r, h;
    this.$ = t, this.Me = e, this.Fe = i, this.$e = s, this.Ee = (r = this.Te, h = this.Se, { x: 0, y: 0, width: 0, height: 0, char0: 0, char1: 0, char2: 0, r1: 0, g1: 0, b1: 0, a1: 0, r2: 0, g2: 0, b2: 0, a2: 0, invert: 0, flipX: 0, flipY: 0, charRot: 0, translationX: 0, translationY: 0, translationZ: 0, rotationX: 0, rotationY: 0, rotationZ: 0, curveParams0: r, curveParams1: h, depth: 0, baseZ: 0, geometryType: 0 });
    const a = this.$.createBuffer();
    Ut(this.$, this.$.ARRAY_BUFFER, a, this.$e.ke, this.$.STATIC_DRAW), this.Pe = a;
  }
  get type() {
    return this.Fe;
  }
  get unitGeometry() {
    return this.$e;
  }
  get unitBuffer() {
    return this.Pe;
  }
  get batch() {
    return this.Me;
  }
  Re() {
    this.Me.xe();
  }
  De() {
    return !this.Me.Ws;
  }
  Ss() {
    this.Me.Ss(), this.$.deleteBuffer(this.Pe);
  }
  Le(t, e, i) {
    return this.Me.ce(t);
  }
  Oe(t, e, i, s, r, h) {
    const a = r.wt ?? 0, l = r.bt ?? 0, u = r.Ct ?? 0, c = r.xt ?? 0, f = r.Mt ?? 0, g = r.Ft ?? 0, p = this.Te, v = this.Se;
    p[0] = 0, p[1] = 0, p[2] = 0, p[3] = 0, v[0] = 0, v[1] = 0, v[2] = 0, v[3] = 0, h && (h.bezStartX !== void 0 && h.bezStartY !== void 0 && h.bezEndX !== void 0 && h.bezEndY !== void 0 ? (p[0] = h.cp1x ?? 0, p[1] = h.cp1y ?? 0, p[2] = h.cp2x ?? 0, p[3] = h.cp2y ?? 0, v[0] = h.bezStartX ?? 0, v[1] = h.bezStartY ?? 0, v[2] = h.bezEndX ?? 0, v[3] = h.bezEndY ?? 0) : h.arcStart === void 0 && h.arcStop === void 0 || (p[0] = h.arcStart ?? 0, p[1] = h.arcStop ?? 0));
    const d = this.Ee;
    return d.x = t, d.y = e, d.width = i, d.height = s, d.char0 = r.Qt[0], d.char1 = r.Qt[1], d.char2 = r.Qt[2], d.r1 = r.Xt[0], d.g1 = r.Xt[1], d.b1 = r.Xt[2], d.a1 = r.Xt[3], d.r2 = r.Yt[0], d.g2 = r.Yt[1], d.b2 = r.Yt[2], d.a2 = r.Yt[3], d.invert = r.Rt ? 1 : 0, d.flipX = r.Gt ? 1 : 0, d.flipY = r.jt ? 1 : 0, d.charRot = r.Dt, d.translationX = a, d.translationY = l, d.translationZ = u, d.rotationX = c, d.rotationY = f, d.rotationZ = g, d.depth = (h == null ? void 0 : h.depth) ?? 0, d.baseZ = (h == null ? void 0 : h.baseZ) ?? 0, d.geometryType = ce[this.Fe] ?? 0, this.Me.writer.Zs(d);
  }
}
const ve = { ke: mt, ze: 6, ...k }, me = { ke: new Float32Array([0, -0.5, 0, 0, 1, -0.5, 1, 0, 0, 0.5, 0, 1, 0, 0.5, 0, 1, 1, -0.5, 1, 0, 1, 0.5, 1, 1]), ze: 6, ...k }, ye = { ke: function(n = 32) {
  const t = [], e = 2 * Math.PI / n;
  for (let i = 0; i < n; i++) {
    const s = i * e, r = (i + 1) % n * e, h = Math.cos(s), a = Math.sin(s), l = 0.5 * (h + 1), u = 0.5 * (a + 1), c = Math.cos(r), f = Math.sin(r), g = 0.5 * (c + 1), p = 0.5 * (f + 1);
    t.push(0, 0, 0.5, 0.5, h, a, l, u, c, f, g, p);
  }
  return new Float32Array(t);
}(32), ze: 96, ...k };
let Ae = { ke: function(n) {
  const t = [];
  for (let e = 0; e < n; e++) {
    const i = e / n, s = (e + 1) / n;
    t.push(i, 0, i, 0, i, 1, i, 1, s, 1, s, 1);
  }
  return new Float32Array(t);
}(32), ze: 96, ...k };
const we = { ke: new Float32Array([0, 0, 0, 0, 1, 0, 1, 0, 0.5, 1, 0.5, 1]), ze: 3, ...k }, be = { ke: function(n = 16) {
  const t = [];
  for (let e = 0; e < n; e++) {
    const i = e / n, s = (e + 1) / n;
    t.push(i, -0.5, i, 0, s, -0.5, s, 0, i, 0.5, i, 1, i, 0.5, i, 1, s, -0.5, s, 0, s, 0.5, s, 1);
  }
  return new Float32Array(t);
}(16), ze: 96, ...k }, xe = { [E.RECTANGLE]: class extends z {
  constructor(n, t) {
    super(n, t, E.RECTANGLE, ve);
  }
  ce(n, t) {
    return this.Oe(0, 0, n.width, n.height, t);
  }
}, [E.LINE]: class extends z {
  constructor(n, t) {
    super(n, t, E.LINE, me);
  }
  ce(n, t) {
    const e = n.x2 - n.x1, i = n.y2 - n.y1, s = Math.hypot(e, i), r = Math.atan2(i, e), h = t.It || 1, a = Math.cos(-r), l = Math.sin(-r), u = n.x1 * a - n.y1 * l, c = n.x1 * l + n.y1 * a, f = { ...t, Ft: (t.Ft || 0) + r };
    return this.Oe(u, c, s, h, f);
  }
}, [E.ELLIPSE]: class extends z {
  constructor(n, t) {
    super(n, t, E.ELLIPSE, ye);
  }
  ce(n, t) {
    return this.Oe(0, 0, n.width, n.height, t);
  }
}, [E.ARC]: class extends z {
  constructor(n, t) {
    super(n, t, E.ARC, Ae);
  }
  ce(n, t) {
    const e = N(n.start), i = N(n.stop);
    return this.Oe(0, 0, n.width, n.height, t, { arcStart: e, arcStop: i });
  }
}, [E.TRIANGLE]: class extends z {
  constructor(n, t) {
    super(n, t, E.TRIANGLE, we);
  }
  ce(n, t) {
    const e = Math.min(n.x1, n.x2, n.x3), i = Math.max(n.x1, n.x2, n.x3), s = Math.min(n.y1, n.y2, n.y3), r = i - e, h = Math.max(n.y1, n.y2, n.y3) - s;
    return this.Oe(e, s, r, h, t);
  }
}, [E.BEZIER_CURVE]: class extends z {
  constructor(n, t) {
    super(n, t, E.BEZIER_CURVE, be);
  }
  ce(n, t) {
    return this.Oe(0, 0, 1, t.It || 1, t, { cp1x: n.cp1x, cp1y: n.cp1y, cp2x: n.cp2x, cp2y: n.cp2y, bezStartX: n.x1, bezStartY: n.y1, bezEndX: n.x2, bezEndY: n.y2 });
  }
} };
class Ee {
  constructor(t) {
    o(this, "$");
    o(this, "He");
    o(this, "Be");
    o(this, "Ie", null);
    o(this, "Ge", /* @__PURE__ */ new Map());
    o(this, "je", null);
    this.$ = t, this.Be = new ue(t), this.He = /* @__PURE__ */ new Map();
    for (const e of Object.values(E)) {
      const i = new pe(t), s = new xe[e](t, i);
      this.He.set(e, s);
    }
  }
  Qe(t) {
    this.Ie = null, this.Ge.clear(), this.je = null;
    let e = null, i = null, s = null, r = !1;
    for (const h of t) e === h.material && i === h.type && r === h.state.Ot || (s && s.De() && this.Ne(s, e, i, r), e = h.material, i = h.type, s = this.He.get(i), r = h.state.Ot, s.Re()), s.ce(h.params, h.state);
    s && s.De() && this.Ne(s, e, i, r), this.Be.Ls();
  }
  Ne(t, e, i, s) {
    if (this.Ie !== e.shader && (e.shader.dt(), this.Ie = e.shader), this.je !== e && (e.shader.gt(e.uniforms), this.je = e), this.Ge.get(e.shader) !== s) {
      const a = Dt(this.$);
      e.shader.gt({ Ur: a[2] / a[3], Us: [a[2], a[3]], Ut: 1, Uu: s ? 1 : 0 }), this.Ge.set(e.shader, s);
    }
    const r = t.unitGeometry, h = t.unitBuffer;
    try {
      this.Be.Rs(e.shader, i + "", r, h), t.batch.he(e.shader), t.batch.Ts(r.bs, r.ze);
    } finally {
      t.Re();
    }
  }
  Ss() {
    for (const t of this.He.values()) t.Ss();
    this.He.clear(), this.Be.Ss();
  }
}
function _t(n) {
  let t = 0;
  for (let e = 0; e < n.length; e++)
    t = (t << 5) - t + n.charCodeAt(e), t &= t;
  return t;
}
const Tt = /* @__PURE__ */ new WeakMap();
let Re = 1;
function Mt(n) {
  if (n == null) return 0;
  if (typeof n != "object" && typeof n != "function") return _t(n + "");
  let t = Tt.get(n);
  return t || (t = Re++, Tt.set(n, t)), t;
}
function H(n, t) {
  return (n << 5) - n + t;
}
const ht = `#version 300 es
in vec2 A0;in vec2 A1;in vec2 A2;in vec2 A3;in vec3 A4;in vec4 A5;in vec4 A6;in vec4 A7;in vec3 A8;in vec3 A9;in vec4 Aa;in vec4 Ab;in vec3 Ac;uniform vec2 Us;uniform float Ut;uniform float Uu;out vec2 v_uv;out vec3 v_glyphIndex;out vec4 v_glyphColor;out vec4 v_cellColor;out vec4 v_glyphFlags;out vec3 v_worldPosition;out vec3 v_normal;out float v_geometryType;const float A=6.28318530718f;const int B=2;const int C=3;const int D=4;vec2 E(float F,vec2 G,vec2 H,vec2 I,vec2 J){float K=1.0f-F;float L=K*K;float M=L*K;float N=F*F;float O=N*F;return M*G+3.0f*L*F*H+3.0f*K*N*I+O*J;}vec2 P(float F,vec2 G,vec2 H,vec2 I,vec2 J){float K=1.0f-F;float L=K*K;float N=F*F;return-3.0f*L*G+3.0f*(L-2.0f*K*F)*H+3.0f*(2.0f*K*F-N)*I+3.0f*N*J;}vec3 Q(vec3 R,float S){float T=cos(S);float U=sin(S);return vec3(R.x,R.y*T-R.z*U,R.y*U+R.z*T);}vec3 V(vec3 R,float S){float T=cos(S);float U=sin(S);return vec3(R.x*T+R.z*U,R.y,-R.x*U+R.z*T);}vec3 W(vec3 R,float S){float T=cos(S);float U=sin(S);return vec3(R.x*T-R.y*U,R.x*U+R.y*T,R.z);}vec3 X(vec3 R,vec3 Y){vec3 Z=R;if(Y.z!=0.0f){Z=W(Z,Y.z);}if(Y.y!=0.0f){Z=V(Z,Y.y);}if(Y.x!=0.0f){Z=Q(Z,Y.x);}return Z;}void main(){v_uv=A1;v_glyphIndex=A4;v_glyphColor=A5;v_cellColor=A6;v_glyphFlags=A7;vec4 a=Aa;vec4 b=Ab;vec2 c=A3;vec2 d=A2;float e=Ac.x;float f=Ac.y;int g=int(Ac.z);vec2 h=d;vec2 i=h+c*0.5f;float j=f+e*0.5f;vec3 k=vec3(i,j);vec3 l;if(g==D){float F=clamp(A0.x,0.0f,1.0f);vec2 G=b.xy;vec2 H=a.xy;vec2 I=a.zw;vec2 J=b.zw;vec2 m=E(F,G,H,I,J);vec2 n=P(F,G,H,I,J);float o=length(n);vec2 p=o>0.0f?n/o:vec2(1.0f,0.0f);vec2 q=vec2(-p.y,p.x);vec2 r=m;vec2 s=r+q*A0.y*c.y;l=vec3(s,f);}else if(g==C){float t=mod(a.x,A);if(t<0.0f){t+=A;}float u=mod(a.y,A);if(u<0.0f){u+=A;}float v=t-u;if(v<=0.0f){v+=A;}float S=t-A0.x*v;vec2 w=vec2(cos(S),sin(S))*A0.y;vec2 s=w*c+h;l=vec3(s,f);}else if(g==B){vec2 s=A0.xy*c+h;l=vec3(s,f);}vec3 x=X(l,A9);vec3 y=x+A8;vec3 z=vec3(0.0f,0.0f,1.0f);v_worldPosition=y;v_normal=z;v_geometryType=float(g);vec2 AA=((y.xy)/Us)*2.0f;AA.y=-AA.y;float AB=y.z/Us.y;float AC=clamp(-AB*Ut,-0.99f,0.99f);if(Uu>0.5f){gl_Position=vec4(AA,AC,1.0f);}else{float AD=0.5f;float AE=1.0f/(1.0f-AB*AD);AA*=AE;gl_Position=vec4(AA,AC,1.0f);}}`;
class Te {
  constructor(t) {
    o(this, "Xe", 0);
    o(this, "Ye");
    o(this, "Ke");
    o(this, "We");
    o(this, "Ze", /* @__PURE__ */ new Map());
    this.Ye = new K(t, ht, `#version 300 es
precision highp float;in vec3 v_glyphIndex;in vec4 v_glyphColor;in vec4 v_cellColor;in vec4 v_glyphFlags;layout(location=0)out vec4 o_character;layout(location=1)out vec4 o_primaryColor;layout(location=2)out vec4 o_secondaryColor;layout(location=3)out vec4 A;void main(){int B=int(v_glyphFlags.r>0.5?1:0);int C=int(v_glyphFlags.g>0.5?1:0);int D=int(v_glyphFlags.b>0.5?1:0);float E=float(B|(C<<1)|(D<<2))/255.;o_character=vec4(v_glyphIndex.xy,E,clamp(v_glyphFlags.a,0.,1.));o_primaryColor=vec4(v_glyphColor.rgb,v_glyphColor.a);o_secondaryColor=vec4(v_cellColor.rgb,v_cellColor.a);A=vec4(0.);}`), this.Ke = new K(t, ht, `#version 300 es
precision highp float;in vec2 v_uv;uniform sampler2D U0;uniform sampler2D U1;uniform sampler2D U2;uniform sampler2D U3;uniform vec2 U4;uniform bool U5;uniform bool U6;uniform bool U7;layout(location=0)out vec4 o_character;layout(location=1)out vec4 o_primaryColor;layout(location=2)out vec4 o_secondaryColor;layout(location=3)out vec4 A;void main(){vec2 B=vec2(v_uv.x,1.-v_uv.y);vec2 C=B*U4;vec2 D=(floor(C)+0.5f)/U4;vec4 E=texture(U0,D);vec4 F=U5?texture(U1,D):vec4(0.);if(U5&&F.a==0.){discard;}vec4 G=U6?texture(U2,D):vec4(0.);vec4 H=U7?texture(U3,D):vec4(0.);o_character=E;o_primaryColor=F;o_secondaryColor=G;A=H;}`), this.We = { id: this.Xe++, shader: this.Ye, uniforms: Object.freeze({}), hash: this.qe(this.Ye, {}), isBuiltIn: !0 };
  }
  get Ve() {
    return this.We;
  }
  get tt() {
    return this.Ke;
  }
  st(t, e = {}) {
    return { id: this.Xe++, shader: t, uniforms: Object.freeze({ ...e }), hash: 0, isBuiltIn: !1 };
  }
  qe(t, e) {
    const i = Mt(t.program), s = function(r, h) {
      let a = 0;
      const l = Object.keys(r).sort();
      for (const u of l) a = H(a, _t(u)), a = H(a, h(r[u]));
      return a;
    }(e, this.Je.bind(this));
    return H(i, s);
  }
  Je(t) {
    return typeof t == "number" || typeof t == "boolean" ? function(e) {
      return typeof e == "boolean" ? e ? 1 : 0 : Math.floor(e);
    }(t) : Array.isArray(t) ? function(e) {
      let i = 0;
      const s = Array.isArray(e[0]) ? e.flat() : e;
      for (const r of s) i = H(i, typeof r == "number" ? r : 0);
      return i;
    }(t) : t instanceof Float32Array || t instanceof Int32Array ? function(e) {
      let i = 0;
      const s = Math.min(e.length, 16);
      for (let r = 0; r < s; r++) i = H(i, e[r]);
      return i;
    }(t) : t instanceof WebGLTexture || I(t) ? Mt(t) : 0;
  }
  Ss() {
    this.Ye.dispose(), this.Ke.dispose(), this.Ze.clear();
  }
}
class Me {
  constructor() {
    o(this, "ti", []);
    o(this, "si", 1);
    o(this, "le", 0);
  }
  ei(t, e) {
    if (this.le >= this.ti.length) {
      const s = { id: this.si++, type: t, params: {}, state: lt.Bt(), material: e };
      this.ti.push(s);
    }
    const i = this.ti[this.le];
    return i.id = this.si++, i.type = t, i.material = e, this.le++, i;
  }
  ii(t, e, i) {
    const s = this.ei(E.RECTANGLE, i), r = s.params;
    return r.width = t.width, r.height = t.height, e.Zt(s.state), s.id;
  }
  ri(t, e, i) {
    const s = this.ei(E.LINE, i), r = s.params;
    return r.x1 = t.x1, r.y1 = t.y1, r.x2 = t.x2, r.y2 = t.y2, r.thickness = t.thickness, e.Zt(s.state), s.id;
  }
  ni(t, e, i) {
    const s = this.ei(E.ELLIPSE, i), r = s.params;
    return r.width = t.width, r.height = t.height, r.startAngle = t.startAngle, r.endAngle = t.endAngle, r.segments = t.segments, e.Zt(s.state), s.id;
  }
  hi(t, e, i) {
    const s = this.ei(E.ARC, i), r = s.params;
    return r.width = t.width, r.height = t.height, r.start = t.start, r.stop = t.stop, e.Zt(s.state), s.id;
  }
  oi(t, e, i) {
    const s = this.ei(E.TRIANGLE, i), r = s.params;
    return r.x1 = t.x1, r.y1 = t.y1, r.x2 = t.x2, r.y2 = t.y2, r.x3 = t.x3, r.y3 = t.y3, e.Zt(s.state), s.id;
  }
  ai(t, e, i) {
    const s = this.ei(E.BEZIER_CURVE, i), r = s.params;
    return r.x1 = t.x1, r.y1 = t.y1, r.cp1x = t.cp1x, r.cp1y = t.cp1y, r.cp2x = t.cp2x, r.cp2y = t.cp2y, r.x2 = t.x2, r.y2 = t.y2, r.thickness = t.thickness, r.segments = t.segments, e.Zt(s.state), s.id;
  }
  xe() {
    this.le = 0;
  }
  [Symbol.iterator]() {
    let t = 0;
    const e = this.le, i = this.ti;
    return { next: () => t < e ? { value: i[t++], done: !1 } : { value: void 0, done: !0 } };
  }
}
class Fe {
  constructor(t) {
    o(this, "$");
    o(this, "Ie", null);
    o(this, "ci");
    o(this, "li");
    o(this, "ui");
    o(this, "fi");
    o(this, "di");
    o(this, "pi", null);
    o(this, "gi", {});
    o(this, "mi", []);
    o(this, "_i", []);
    o(this, "yi", []);
    o(this, "Ai", null);
    o(this, "wi", [0, 0, 0, 0]);
    o(this, "bi", 1);
    o(this, "Ci", new Float32Array(4));
    this.$ = t, t.enable(t.DEPTH_TEST), t.depthFunc(t.LEQUAL), t.clearDepth(1), t.depthMask(!0), t.disable(t.CULL_FACE), this.ui = new lt(), this.li = new Te(t), this.fi = new Me(), this.ci = new Ee(t), this.di = new le(t);
    const e = [0, 0, t.canvas.width, t.canvas.height];
    ft(t, e), this.mi.push(null), this._i.push(e), this.yi.push(1), this.Ai = null, this.wi = e, this.bi = 1;
  }
  X() {
    this.mi.push(this.Ai), this._i.push([...this.wi]), this.yi.push(this.bi);
  }
  q() {
    const t = this.mi.pop() ?? null, e = this._i.pop() ?? [0, 0, this.$.canvas.width, this.$.canvas.height], i = this.yi.pop() ?? 1;
    this.Y(t, e[2], e[3], i);
  }
  Y(t, e, i, s = 1) {
    const r = this.$;
    this.Ai !== t && (r.bindFramebuffer(r.FRAMEBUFFER, t), this.Ai = t), this.bi = s;
    const h = [0, 0, e, i];
    this.wi[0] === h[0] && this.wi[1] === h[1] && this.wi[2] === h[2] && this.wi[3] === h[3] || (r.viewport(...h), ft(r, h), this.wi = h);
  }
  xi(t) {
    this.Ie !== t && (this.Ie = t, t.dt());
  }
  Mi(t, e) {
    return new K(this.$, t, e);
  }
  Fi(t) {
    this.pi = t, t && (this.gi = {});
  }
  $i() {
    this.pi = null, this.gi = {};
  }
  _t(t, e) {
    this.gi[t] = e;
  }
  gt(t) {
    Object.assign(this.gi, t);
  }
  Pi(t) {
    return new K(this.$, ht, t);
  }
  Ti(t, e, i, s) {
    t instanceof vt || !s || t.Si(s), this.fi.ii({ width: e ?? t.width, height: i ?? t.height }, this.ui, t.V());
  }
  Ei(t, e, i, s) {
    this.di.Ts(t, e, i, s);
  }
  ki(t, e) {
    if (this.pi) {
      const i = this.li.st(this.pi, this.gi);
      this.fi.ii({ width: t, height: e }, this.ui, i);
    } else this.fi.ii({ width: t, height: e }, this.ui, this.li.Ve);
  }
  Ri(t, e, i, s) {
    this.fi.ri({ x1: t, y1: e, x2: i, y2: s }, this.ui, this.li.Ve);
  }
  Di(t, e) {
    this.fi.ni({ width: t, height: e }, this.ui, this.li.Ve);
  }
  Li(t, e, i, s, r, h) {
    this.fi.oi({ x1: t, y1: e, x2: i, y2: s, x3: r, y3: h }, this.ui, this.li.Ve);
  }
  Oi(t, e, i, s, r, h, a, l) {
    this.fi.ai({ x1: t, y1: e, cp1x: i, cp1y: s, cp2x: r, cp2y: h, x2: a, y2: l }, this.ui, this.li.Ve);
  }
  zi(t, e, i, s) {
    this.fi.hi({ width: t, height: e, start: i, stop: s }, this.ui, this.li.Ve);
  }
  Hi(t, e, i = 1, s = {}) {
    return new vt(this.$, t, e, i, s, this);
  }
  Bi(t, e = t, i = t, s = 255) {
    this.ui._s(t, e ?? t, i ?? t, s);
    const [r, h, a, l] = this.ui.canvasBackgroundColor;
    this.Ii(r, h, a, l, !1);
  }
  xe(t = 0, e = 0, i = 0, s = 0) {
    this.Ii(t, e, i, s, !0);
  }
  Ii(t, e, i, s, r) {
    const h = this.$, a = this.Ci;
    if (this.bi > 1) {
      a[0] = r ? 1 : 0, a[1] = r ? 1 : 0, a[2] = 0, a[3] = 0, h.clearBufferfv(h.COLOR, 0, a), a[0] = 0, a[1] = 0, a[2] = 0, a[3] = 0, h.clearBufferfv(h.COLOR, 1, a), this.bi >= 3 && (a[0] = t, a[1] = e, a[2] = i, a[3] = s, h.clearBufferfv(h.COLOR, 2, a)), this.bi >= 3 && (a[0] = 0, a[1] = 0, a[2] = 0, a[3] = 0);
      for (let l = 3; l < this.bi; l++) h.clearBufferfv(h.COLOR, l, a);
    } else h.clearColor(t, e, i, s), h.clear(h.COLOR_BUFFER_BIT);
  }
  Gi() {
    const t = [0, 0, this.$.canvas.width, this.$.canvas.height];
    this.$.viewport(...t), ft(this.$, t), this.wi = t, this._i.length > 0 && (this._i[0] = t);
  }
  Z() {
    const t = this.fi;
    this.ci.Qe(t), t.xe(), this.Ie = null;
  }
  Ss() {
    this.li.Ss(), this.ci.Ss(), this.di.Ss();
  }
  get context() {
    return this.$;
  }
  get state() {
    return this.ui;
  }
  get materialManager() {
    return this.li;
  }
}
const M = { readShort: (n, t) => (M.t.uint16[0] = n[t] << 8 | n[t + 1], M.t.int16[0]), readUshort: (n, t) => n[t] << 8 | n[t + 1], readUshorts(n, t, e) {
  const i = [];
  for (let s = 0; s < e; s++) i.push(M.readUshort(n, t + 2 * s));
  return i;
}, readUint(n, t) {
  const e = M.t.uint8;
  return e[3] = n[t], e[2] = n[t + 1], e[1] = n[t + 2], e[0] = n[t + 3], M.t.uint32[0];
}, readASCII(n, t, e) {
  let i = "";
  for (let s = 0; s < e; s++) i += String.fromCharCode(n[t + s]);
  return i;
}, t: (() => {
  const n = new ArrayBuffer(8);
  return { uint8: new Uint8Array(n), int16: new Int16Array(n), uint16: new Uint16Array(n), uint32: new Uint32Array(n) };
})() };
function q(n) {
  return n + 3 & -4;
}
function J(n, t, e) {
  n[t] = e >>> 8 & 255, n[t + 1] = 255 & e;
}
function D(n, t, e) {
  n[t] = e >>> 24 & 255, n[t + 1] = e >>> 16 & 255, n[t + 2] = e >>> 8 & 255, n[t + 3] = 255 & e;
}
function Ce(n, t, e) {
  for (let i = 0; i < e.length; i++) n[t + i] = 255 & e.charCodeAt(i);
}
function dt(n, t, e) {
  const i = t + e;
  let s = 0;
  const r = M.t;
  for (let h = t; h < i; h += 4) r.uint8[3] = n[h] || 0, r.uint8[2] = n[h + 1] || 0, r.uint8[1] = n[h + 2] || 0, r.uint8[0] = n[h + 3] || 0, s = s + (r.uint32[0] >>> 0) >>> 0;
  return s >>> 0;
}
class Pe {
  constructor(t) {
    o(this, "b");
    o(this, "p", 0);
    o(this, "bitbuf", 0);
    o(this, "bitcnt", 0);
    this.b = t;
  }
  readBits(t) {
    for (; this.bitcnt < t; ) {
      const i = this.b[this.p++] || 0;
      this.bitbuf |= i << this.bitcnt, this.bitcnt += 8;
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
function G(n) {
  let t = 32, e = 0;
  for (const a of n) a && (a < t && (t = a), a > e && (e = a));
  if (e === 0) return { min: 0, max: 0, table: /* @__PURE__ */ new Map() };
  const i = new Uint32Array(e + 1);
  for (const a of n) a && i[a]++;
  const s = new Uint32Array(e + 1);
  let r = 0;
  i[0] = 0;
  for (let a = 1; a <= e; a++) r = r + i[a - 1] << 1, s[a] = r;
  const h = /* @__PURE__ */ new Map();
  for (let a = 0; a < n.length; a++) {
    const l = n[a];
    if (!l) continue;
    const u = s[l]++;
    let c = h.get(l);
    c || (c = [], h.set(l, c)), c[Se(u, l)] = a;
  }
  return { min: t, max: e, table: h };
}
function gt(n, t) {
  let e = 0;
  for (let i = 1; i <= t.max; i++) {
    e |= n.readBits(1) << i - 1;
    const s = t.table.get(i);
    if (s && e < s.length) {
      const r = s[e];
      if (r !== void 0) return r;
    }
  }
  throw Error("Invalid Huffman code");
}
function Se(n, t) {
  let e = 0;
  for (let i = 0; i < t; i++) e = e << 1 | 1 & n, n >>>= 1;
  return e >>> 0;
}
function Oe(n) {
  if (n.length < 2) throw Error("ZLIB data too short");
  const t = n[0], e = n[1];
  if ((15 & t) != 8) throw Error("Unsupported ZLIB compression method");
  if (((t << 8) + e) % 31 != 0) throw Error("Bad ZLIB header check");
  let i = 2;
  32 & e && (i += 4);
  const s = [];
  return function(r, h) {
    const a = [3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258], l = [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0], u = [1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577], c = [0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13];
    let f = 0;
    for (; !f; ) {
      f = r.readBits(1);
      const g = r.readBits(2);
      if (g === 0) {
        r.alignToByte();
        const p = r.readBits(16);
        if ((65535 & (65535 ^ p)) !== r.readBits(16)) throw Error("DEFLATE uncompressed LEN/NLEN mismatch");
        for (let v = 0; v < p; v++) h.push(r.readBits(8));
      } else {
        if (g !== 1 && g !== 2) throw Error("Unsupported DEFLATE type");
        {
          let p, v;
          if (g === 1) {
            const d = Array(288).fill(0);
            for (let m = 0; m <= 143; m++) d[m] = 8;
            for (let m = 144; m <= 255; m++) d[m] = 9;
            for (let m = 256; m <= 279; m++) d[m] = 7;
            for (let m = 280; m <= 287; m++) d[m] = 8;
            p = G(d), v = G(Array(32).fill(5));
          } else {
            const d = r.readBits(5) + 257, m = r.readBits(5) + 1, y = r.readBits(4) + 4, w = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15], A = Array(19).fill(0);
            for (let T = 0; T < y; T++) A[w[T]] = r.readBits(3);
            const R = G(A), b = [];
            for (; b.length < d + m; ) {
              const T = gt(r, R);
              if (T <= 15) b.push(T);
              else if (T === 16) {
                const X = r.readBits(2) + 3, C = b[b.length - 1] || 0;
                for (let Q = 0; Q < X; Q++) b.push(C);
              } else if (T === 17) {
                const X = r.readBits(3) + 3;
                for (let C = 0; C < X; C++) b.push(0);
              } else {
                if (T !== 18) throw Error("Invalid code length symbol");
                {
                  const X = r.readBits(7) + 11;
                  for (let C = 0; C < X; C++) b.push(0);
                }
              }
            }
            const F = b.slice(0, d), P = b.slice(d, d + m);
            p = G(F), v = G(P);
          }
          for (; ; ) {
            const d = gt(r, p);
            if (d < 256) h.push(d);
            else {
              if (d === 256) break;
              if (d > 256 && d < 286) {
                const m = d - 257;
                let y = a[m];
                const w = l[m];
                w && (y += r.readBits(w));
                const A = gt(r, v);
                if (A >= 30) throw Error("Invalid distance symbol");
                let R = u[A];
                const b = c[A];
                b && (R += r.readBits(b));
                const F = h.length - R;
                if (F < 0) throw Error("Invalid distance");
                for (let P = 0; P < y; P++) h.push(h[F + P] || 0);
              } else if (d === 286 || d === 287) throw Error("Reserved length symbol");
            }
          }
        }
      }
    }
  }(new Pe(n.subarray(i)), s), new Uint8Array(s);
}
function Ue(n) {
  const t = M, e = new Uint8Array(n);
  if (t.readASCII(e, 0, 4) !== "wOFF") throw Error("Invalid WOFF signature");
  const i = t.readUint(e, 4), s = t.readUshort(e, 12), r = t.readUint(e, 16), h = [];
  let a = 44;
  for (let y = 0; y < s; y++) {
    const w = t.readASCII(e, a, 4), A = t.readUint(e, a + 4), R = t.readUint(e, a + 8), b = t.readUint(e, a + 12), F = t.readUint(e, a + 16);
    h.push({ tag: w, offset: A, compLength: R, origLength: b, checksum: F }), a += 20;
  }
  for (const y of h) {
    const w = new Uint8Array(e.buffer, y.offset, y.compLength);
    if (y.compLength === y.origLength) y.data = new Uint8Array(w);
    else if (y.data = Oe(w), y.data.length !== y.origLength) if (y.data.length < y.origLength) {
      const A = new Uint8Array(y.origLength);
      A.set(y.data), y.data = A;
    } else y.data = y.data.subarray(0, y.origLength);
  }
  const l = s;
  let u = 1, c = 0;
  for (; u << 1 <= l; ) u <<= 1, c++;
  const f = 16 * u, g = 16 * l - f;
  let p = 12 + 16 * l;
  const v = {};
  for (const y of h) v[y.tag] = p, p = q(p + y.data.length);
  const d = new Uint8Array(Math.max(r || 0, p));
  D(d, 0, i), J(d, 4, l), J(d, 6, f), J(d, 8, c), J(d, 10, g);
  let m = 12;
  for (const y of h) {
    Ce(d, m, y.tag), m += 4;
    const w = y.data;
    if (y.tag === "head" && w.length >= 12) {
      const A = new Uint8Array(w);
      D(A, 8, 0), D(d, m, dt(A, 0, q(A.length))), m += 4;
    } else
      D(d, m, dt(w, 0, q(w.length))), m += 4;
    D(d, m, v[y.tag]), m += 4, D(d, m, y.data.length), m += 4;
  }
  for (const y of h) {
    const w = v[y.tag];
    d.set(y.data, w);
  }
  if (h.find((y) => y.tag === "head")) {
    const y = v.head, w = function(A, R) {
      const b = R + 8, F = [A[b], A[b + 1], A[b + 2], A[b + 3]];
      D(A, b, 0);
      const P = 2981146554 - (dt(A, 0, q(A.length)) >>> 0) >>> 0;
      return A[b] = F[0], A[b + 1] = F[1], A[b + 2] = F[2], A[b + 3] = F[3], P >>> 0;
    }(d, y);
    D(d, y + 8, w);
  }
  return d.buffer;
}
const Xe = { parseTab(n, t, e) {
  const i = { tables: [], ids: {}, off: t };
  n = new Uint8Array(n.buffer, t, e), t = 0;
  const s = M, r = s.readUshort;
  r(n, t);
  const h = r(n, t += 2);
  t += 2;
  const a = [];
  for (let l = 0; l < h; l++) {
    const u = r(n, t), c = r(n, t += 2);
    t += 2;
    const f = s.readUint(n, t);
    t += 4;
    const g = `p${u}e${c}`;
    let p = a.indexOf(f);
    if (p === -1) {
      let v;
      p = i.tables.length, a.push(f);
      const d = r(n, f);
      v = d === 4 ? this.parse4(n, f) : d === 12 ? this.parse12(n, f) : { format: d }, i.tables.push(v);
    }
    i.ids[g] = p;
  }
  return i;
}, parse4(n, t) {
  const e = M, i = e.readUshort, s = e.readUshorts, r = t, h = i(n, t += 2);
  i(n, t += 2);
  const a = i(n, t += 2) >>> 1, l = { format: 4, searchRange: i(n, t += 2), entrySelector: 0, rangeShift: 0, endCount: [], startCount: [], idDelta: [], idRangeOffset: [], glyphIdArray: [] };
  t += 2, l.entrySelector = i(n, t), t += 2, l.rangeShift = i(n, t), t += 2, l.endCount = s(n, t, a), t += 2 * a, t += 2, l.startCount = s(n, t, a), t += 2 * a;
  for (let u = 0; u < a; u++) l.idDelta.push(e.readShort(n, t)), t += 2;
  return l.idRangeOffset = s(n, t, a), t += 2 * a, l.glyphIdArray = s(n, t, r + h - t >> 1), l;
}, parse12(n, t) {
  const e = M.readUint;
  e(n, t += 4), e(n, t += 4);
  const i = e(n, t += 4);
  t += 4;
  const s = new Uint32Array(3 * i);
  for (let r = 0; r < 3 * i; r += 3) s[r] = e(n, t + (r << 2)), s[r + 1] = e(n, t + (r << 2) + 4), s[r + 2] = e(n, t + (r << 2) + 8);
  return { format: 12, groups: s };
} }, Le = { parseTab(n, t, e) {
  const i = M;
  t += 18;
  const s = i.readUshort(n, t);
  t += 2, t += 16;
  const r = i.readShort(n, t);
  t += 2;
  const h = i.readShort(n, t);
  t += 2;
  const a = i.readShort(n, t);
  t += 2;
  const l = i.readShort(n, t);
  return t += 2, t += 6, { unitsPerEm: s, xMin: r, yMin: h, xMax: a, yMax: l, indexToLocFormat: i.readShort(n, t) };
} }, De = { parseTab(n, t, e) {
  const i = M;
  t += 4;
  const s = i.readShort, r = i.readUshort;
  return { ascender: s(n, t), descender: s(n, t + 2), lineGap: s(n, t + 4), advanceWidthMax: r(n, t + 6), minLeftSideBearing: s(n, t + 8), minRightSideBearing: s(n, t + 10), xMaxExtent: s(n, t + 12), caretSlopeRise: s(n, t + 14), caretSlopeRun: s(n, t + 16), caretOffset: s(n, t + 18), res0: s(n, t + 20), res1: s(n, t + 22), res2: s(n, t + 24), res3: s(n, t + 26), metricDataFormat: s(n, t + 28), numberOfHMetrics: r(n, t + 30) };
} }, _e = { parseTab(n, t, e, i) {
  const s = M, r = [], h = [], a = i.maxp.numGlyphs, l = i.hhea.numberOfHMetrics;
  let u = 0, c = 0, f = 0;
  for (; f < l; ) u = s.readUshort(n, t + (f << 2)), c = s.readShort(n, t + (f << 2) + 2), r.push(u), h.push(c), f++;
  for (; f < a; ) r.push(u), h.push(c), f++;
  return { aWidth: r, lsBearing: h };
} }, Ft = { cmap: Xe, head: Le, hhea: De, maxp: { parseTab(n, t, e) {
  const i = M;
  return i.readUint(n, t), t += 4, { numGlyphs: i.readUshort(n, t) };
} }, hmtx: _e, loca: { parseTab(n, t, e, i) {
  const s = M, r = [], h = i.head.indexToLocFormat, a = i.maxp.numGlyphs + 1;
  if (h === 0) for (let l = 0; l < a; l++) r.push(s.readUshort(n, t + (l << 1)) << 1);
  else if (h === 1) for (let l = 0; l < a; l++) r.push(s.readUint(n, t + (l << 2)));
  return r;
} }, glyf: { parseTab(n, t, e, i) {
  const s = [], r = i.maxp.numGlyphs;
  for (let h = 0; h < r; h++) s.push(null);
  return s;
}, ji(n, t) {
  const e = M, i = n.Qi, s = n.loca;
  if (s[t] === s[t + 1]) return null;
  const r = ct.findTable(i, "glyf", n.Ni);
  if (!r) return null;
  let h = r[0] + s[t];
  const a = {};
  if (a.noc = e.readShort(i, h), h += 2, a.xMin = e.readShort(i, h), h += 2, a.yMin = e.readShort(i, h), h += 2, a.xMax = e.readShort(i, h), h += 2, a.yMax = e.readShort(i, h), h += 2, a.xMin >= a.xMax || a.yMin >= a.yMax) return null;
  if (a.noc > 0) {
    a.endPts = [];
    for (let g = 0; g < a.noc; g++) a.endPts.push(e.readUshort(i, h)), h += 2;
    const l = e.readUshort(i, h);
    if (h += 2, i.length - h < l) return null;
    h += l;
    const u = a.endPts[a.noc - 1] + 1;
    a.flags = [];
    for (let g = 0; g < u; g++) {
      const p = i[h];
      if (h++, a.flags.push(p), 8 & p) {
        const v = i[h];
        h++;
        for (let d = 0; d < v; d++) a.flags.push(p), g++;
      }
    }
    a.xs = [];
    for (let g = 0; g < u; g++) {
      const p = a.flags[g], v = !!(16 & p);
      2 & p ? (a.xs.push(v ? i[h] : -i[h]), h++) : v ? a.xs.push(0) : (a.xs.push(e.readShort(i, h)), h += 2);
    }
    a.ys = [];
    for (let g = 0; g < u; g++) {
      const p = a.flags[g], v = !!(32 & p);
      4 & p ? (a.ys.push(v ? i[h] : -i[h]), h++) : v ? a.ys.push(0) : (a.ys.push(e.readShort(i, h)), h += 2);
    }
    let c = 0, f = 0;
    for (let g = 0; g < u; g++) c += a.xs[g], f += a.ys[g], a.xs[g] = c, a.ys[g] = f;
  } else a.parts = [], a.endPts = [], a.flags = [], a.xs = [], a.ys = [];
  return a;
} } }, ct = { parse(n) {
  const t = new Uint8Array(n);
  M.readASCII(t, 0, 4) === "wOFF" && (n = Ue(n));
  const e = new Uint8Array(n), i = Ft, s = {}, r = { Qi: e, Xi: 0, Ni: 0 };
  for (const h in i) {
    const a = h, l = ct.findTable(e, a, 0);
    if (l) {
      const [u, c] = l;
      let f = s[u];
      f == null && (f = i[a].parseTab(e, u, c, r), s[u] = f), Object.assign(r, { [a]: f });
    }
  }
  return [r];
}, findTable(n, t, e) {
  const i = M, s = i.readUshort(n, e + 4);
  let r = e + 12;
  for (let h = 0; h < s; h++) {
    const a = i.readASCII(n, r, 4);
    i.readUint(n, r + 4);
    const l = i.readUint(n, r + 8), u = i.readUint(n, r + 12);
    if (a === t) return [l, u];
    r += 16;
  }
  return null;
}, T: Ft, B: M };
function Bt(n, t, e) {
  if (n.idRangeOffset[e] === 0) return t + n.idDelta[e] & 65535;
  {
    const i = n.startCount.length, s = n.idRangeOffset[e] / 2 + (t - n.startCount[e]) - (i - e);
    if (s >= 0 && n.glyphIdArray && s < n.glyphIdArray.length) {
      const r = n.glyphIdArray[s];
      if (r !== 0) return r + n.idDelta[e] & 65535;
    }
  }
  return 0;
}
class Be {
  Yi(t) {
    var i;
    const e = [];
    return (i = t.cmap) != null && i.tables ? (t.cmap.tables.forEach((s) => {
      if (s.format === 4) {
        const r = this.Ki(s);
        e.push(...r);
      } else if (s.format === 12) {
        const r = this.Wi(s);
        e.push(...r);
      }
    }), [...new Set(e)]) : [];
  }
  Ki(t) {
    const e = [];
    if (!(t.startCount && t.endCount && t.idRangeOffset && t.idDelta)) return e;
    for (let i = 0; i < t.startCount.length; i++) {
      const s = t.startCount[i], r = t.endCount[i];
      if (s !== 65535 || r !== 65535) for (let h = s; h <= r; h++)
        Bt(t, h, i) > 0 && this.Zi(e, h);
    }
    return e;
  }
  Wi(t) {
    const e = [];
    if (!t.groups) return e;
    for (let i = 0; i < t.groups.length; i += 3) {
      const s = t.groups[i], r = t.groups[i + 1], h = t.groups[i + 2];
      for (let a = s; a <= r; a++)
        h + (a - s) > 0 && this.Zi(e, a);
    }
    return e;
  }
  Zi(t, e) {
    try {
      const i = String.fromCodePoint(e);
      t.push(i);
    } catch {
    }
  }
}
class ze {
  constructor(t) {
    o(this, "qi");
    o(this, "Vi");
    o(this, "R");
    o(this, "P", null);
    o(this, "Ji", 0);
    o(this, "tr", 0);
    this.R = t, this.qi = document.createElement("canvas"), this.Vi = this.qi.getContext("2d", { willReadFrequently: !0, alpha: !0 });
  }
  sr(t, e, i, s) {
    const r = t.length;
    this.Ji = Math.ceil(Math.sqrt(r)), this.tr = Math.ceil(r / this.Ji);
    const h = e.width * this.Ji, a = e.height * this.tr;
    this.er(h, a), this.ir(t, e, this.Ji, i, s), this.P ? this.P.width === h && this.P.height === a || this.P.resize(h, a) : this.P = this.R.Hi(h, a, 1, { filter: "nearest" }), this.P.N(this.qi);
  }
  er(t, e) {
    this.qi.width = t, this.qi.height = e, this.qi.style.width = t + "px", this.qi.style.height = e + "px", this.Vi.imageSmoothingEnabled = !1, this.qi.style.imageRendering = "pixelated", this.Vi.clearRect(0, 0, t, e), this.Vi.textBaseline = "top", this.Vi.textAlign = "left", this.Vi.fillStyle = "white";
  }
  ir(t, e, i, s, r) {
    const h = s / r.head.unitsPerEm;
    for (let a = 0; a < t.length; a++) {
      const l = a % i, u = Math.floor(a / i), c = t[a].glyphData;
      if (!c) continue;
      const f = c.advanceWidth * h, g = l * e.width, p = u * e.height, v = g + 0.5 * e.width, d = p + 0.5 * e.height, m = Math.round(v - 0.5 * e.width), y = Math.round(d - 0.5 * s), w = m + 0.5 * (e.width - f), A = y + r.hhea.ascender * h;
      this.rr(c, w, A, h);
    }
  }
  rr(t, e, i, s) {
    if (!t || !t.xs || t.noc === 0) return;
    const { xs: r, ys: h, endPts: a, flags: l } = t;
    if (!(r && h && a && l)) return;
    this.Vi.beginPath();
    let u = 0;
    for (let c = 0; c < a.length; c++) {
      const f = a[c];
      if (!(f < u)) {
        if (f >= u) {
          const g = e + r[u] * s, p = i - h[u] * s;
          this.Vi.moveTo(g, p);
          let v = u + 1;
          for (; v <= f; )
            if (1 & l[v]) {
              const d = e + r[v] * s, m = i - h[v] * s;
              this.Vi.lineTo(d, m), v++;
            } else {
              const d = e + r[v] * s, m = i - h[v] * s;
              if (v + 1 > f) {
                const w = e + r[u] * s, A = i - h[u] * s;
                if (1 & l[u]) this.Vi.quadraticCurveTo(d, m, w, A);
                else {
                  const R = (d + w) / 2, b = (m + A) / 2;
                  this.Vi.quadraticCurveTo(d, m, R, b);
                }
                break;
              }
              const y = v + 1;
              if (1 & l[y]) {
                const w = e + r[y] * s, A = i - h[y] * s;
                this.Vi.quadraticCurveTo(d, m, w, A), v = y + 1;
              } else {
                const w = (d + (e + r[y] * s)) / 2, A = (m + (i - h[y] * s)) / 2;
                this.Vi.quadraticCurveTo(d, m, w, A), v = y;
              }
            }
          this.Vi.closePath();
        }
        u = f + 1;
      }
    }
    this.Vi.fill();
  }
  Ss() {
    var t;
    (t = this.P) == null || t.dispose(), this.P = null;
  }
  get framebuffer() {
    return this.P;
  }
  get columns() {
    return this.Ji;
  }
  get rows() {
    return this.tr;
  }
}
class zt {
  nr(t, e) {
    const i = t.cmap;
    if (!i || !i.tables) return 0;
    let s = 0;
    for (const r of i.tables) if (r.format === 4 ? s = this.hr(e, r) : r.format === 12 && (s = this.ar(e, r)), s > 0) break;
    return s;
  }
  cr(t, e) {
    const i = e.codePointAt(0);
    return i === void 0 ? 0 : this.nr(t, i);
  }
  lr(t, e) {
    const i = t.hmtx;
    return i && i.aWidth && i.aWidth.length !== 0 ? e < i.aWidth.length ? i.aWidth[e] : i.aWidth[i.aWidth.length - 1] : 0;
  }
  ur(t, e) {
    const i = e / t.head.unitsPerEm, s = t.hhea.ascender * i, r = t.hhea.descender * i, h = t.hhea.lineGap * i;
    return { ascender: s, descender: r, lineGap: h, lineHeight: s - r + h, unitsPerEm: t.head.unitsPerEm, scale: i };
  }
  hr(t, e) {
    const i = e.endCount.length;
    let s = -1;
    for (let r = 0; r < i; r++) if (t <= e.endCount[r]) {
      s = r;
      break;
    }
    return s === -1 || t < e.startCount[s] ? 0 : Bt(e, t, s);
  }
  ar(t, e) {
    const i = e.groups.length / 3;
    for (let s = 0; s < i; s++) {
      const r = e.groups[3 * s], h = e.groups[3 * s + 1], a = e.groups[3 * s + 2];
      if (t >= r && t <= h) return a + (t - r);
    }
    return 0;
  }
}
class Ie {
  constructor() {
    o(this, "dr");
    this.dr = new zt();
  }
  pr(t, e, i) {
    let s = 0;
    const r = this.dr.ur(i, e), h = r.lineHeight;
    for (const a of t) {
      const l = this.dr.cr(i, a);
      if (l === 0) continue;
      const u = this.dr.lr(i, l) * r.scale;
      s = Math.max(s, u);
    }
    return { width: Math.ceil(s), height: Math.ceil(h) };
  }
}
class Ne {
  constructor() {
    o(this, "vr");
    this.vr = new zt();
  }
  gr(t, e) {
    const i = [], s = /* @__PURE__ */ new Map();
    return t.forEach((r, h) => {
      const a = r.codePointAt(0) || 0, l = { character: r, unicode: a, color: this.mr(h), glyphData: this._r(e, r) };
      i.push(l), s.set(r, l);
    }), { array: i, map: s };
  }
  mr(t) {
    return [t % 256 / 255, Math.floor(t / 256) % 256 / 255, 0];
  }
  _r(t, e) {
    const i = e.codePointAt(0) || 0, s = this.vr.nr(t, i);
    if (s === 0) return null;
    const r = this.vr.lr(t, s), h = ct.T.glyf.ji(t, s);
    return h ? { ...h, advanceWidth: r } : null;
  }
}
class Y extends at {
  constructor(e, i = 16) {
    super();
    o(this, "yr");
    o(this, "Ar", []);
    o(this, "wr", /* @__PURE__ */ new Map());
    o(this, "br", 16);
    o(this, "Cr", { width: 0, height: 0 });
    o(this, "Mr");
    o(this, "Fr");
    o(this, "$r");
    o(this, "Pr");
    o(this, "Tr");
    o(this, "Sr", !1);
    this.br = i, this.Fr = new Be(), this.$r = new ze(e), this.Pr = new Ie(), this.Tr = new Ne();
  }
  async Er(e) {
    if (this.Sr) return;
    const i = e || "data:font/woff;base64,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", s = await this.kr(i);
    await this.Rr(s);
  }
  Dr(e) {
    if (e === void 0) return this.br;
    this.br = e, this.Lr();
  }
  Lr() {
    const e = this.Ar.map((i) => i.character);
    this.Cr = this.Pr.pr(e, this.br, this.yr), this.$r.sr(this.Ar, this.Cr, this.br, this.yr);
  }
  async Or(e) {
    try {
      const i = await this.kr(e);
      await this.Rr(i);
    } catch (i) {
      throw new S("Failed to load font: " + (i instanceof Error ? i.message : "Unknown error"), { originalError: i });
    }
  }
  async kr(e) {
    const i = await fetch(e);
    if (!i.ok) throw new S(`Failed to load font file: ${i.status} ${i.statusText}`);
    return i.arrayBuffer();
  }
  async Rr(e) {
    await this.zr(e);
    const i = ct.parse(e);
    if (!i || i.length === 0) throw Error("Failed to parse font file");
    this.yr = i[0], await this.Hr();
  }
  async zr(e) {
    this.Mr && document.fonts.delete(this.Mr);
    const i = Date.now();
    this.Mr = new FontFace("CustomFont_" + i, e), await this.Mr.load(), document.fonts.add(this.Mr);
  }
  async Hr() {
    const e = this.Fr.Yi(this.yr), { array: i, map: s } = this.Tr.gr(e, this.yr);
    this.Ar = i, this.wr = s, this.Lr(), this.Sr = !0;
  }
  Br(e) {
    const i = this.wr.get(e);
    return i ? i.color : [0, 0, 0];
  }
  Ir(e) {
    return Array.from(e).map((i) => {
      const s = this.wr.get(i);
      return s ? s.color : [0, 0, 0];
    });
  }
  dispose() {
    this.$r.Ss(), this.Mr && document.fonts.delete(this.Mr), super.dispose();
  }
  get Gr() {
    return this.Sr;
  }
  get fontFramebuffer() {
    return this.$r.framebuffer;
  }
  get characterMap() {
    return this.wr;
  }
  get characters() {
    return this.Ar;
  }
  get textureColumns() {
    return this.$r.columns;
  }
  get textureRows() {
    return this.$r.rows;
  }
  get maxGlyphDimensions() {
    return this.Cr;
  }
  get fontSize() {
    return this.br;
  }
  get font() {
    return this.yr;
  }
}
class Ye {
  constructor(t, e, i) {
    o(this, "jr");
    o(this, "tr");
    o(this, "M");
    o(this, "F");
    o(this, "Qr");
    o(this, "Nr");
    o(this, "Xr");
    o(this, "Yr");
    o(this, "Kr");
    o(this, "Wr", !1);
    o(this, "Zr", /* @__PURE__ */ new Set());
    this.Xr = t, this.Yr = e, this.Kr = i, this.reset();
  }
  qr() {
    if (this.M = this.jr * this.Yr, this.F = this.tr * this.Kr, this.Qr = Math.floor((this.Xr.width - this.M) / 2), this.Nr = Math.floor((this.Xr.height - this.F) / 2), this.Zr.size > 0) for (const t of this.Zr) t();
  }
  Vr(t) {
    this.Zr.add(t);
  }
  Jr(t) {
    this.Zr.delete(t);
  }
  reset() {
    this.Wr || (this.jr = Math.floor(this.Xr.width / this.Yr), this.tr = Math.floor(this.Xr.height / this.Kr)), this.qr();
  }
  tn(t, e) {
    this.Yr = t, this.Kr = e, this.reset();
  }
  get cellWidth() {
    return this.Yr;
  }
  get cellHeight() {
    return this.Kr;
  }
  get cols() {
    return this.jr;
  }
  set cols(t) {
    this.Wr = !0, this.jr = Math.max(1, Math.floor(t)), typeof this.tr != "number" && (this.tr = Math.max(1, Math.floor(this.Xr.height / this.Kr))), this.qr();
  }
  get rows() {
    return this.tr;
  }
  set rows(t) {
    this.Wr = !0, this.tr = Math.max(1, Math.floor(t)), typeof this.jr != "number" && (this.jr = Math.max(1, Math.floor(this.Xr.width / this.Yr))), this.qr();
  }
  get width() {
    return this.M;
  }
  get height() {
    return this.F;
  }
  get offsetX() {
    return this.Qr;
  }
  get offsetY() {
    return this.Nr;
  }
  responsive() {
    this.Wr = !1;
  }
  sn(t, e) {
    const i = this.Xr.getBoundingClientRect(), s = t - i.left, r = e - i.top, h = this.Xr.width / i.width, a = r * (this.Xr.height / i.height), l = s * h - this.Qr, u = a - this.Nr, c = Math.floor(l / this.Yr), f = Math.floor(u / this.Kr);
    return c >= 0 && c < this.jr && f >= 0 && f < this.tr ? { x: c - Math.floor((this.jr - 1) / 2), y: f - Math.floor(this.tr / 2) } : { x: -1 / 0, y: -1 / 0 };
  }
  Ss() {
    this.Zr.clear();
  }
}
function tt(n) {
  return parseInt(n, 16);
}
const ke = /^rgba?\(([^)]+)\)$/i;
function B(n) {
  return Number.isNaN(n = Math.round(n)) ? 0 : L(n, 0, 255);
}
function It(n, t = !1) {
  if (!n) return null;
  const e = n.trim().toLowerCase();
  if (!e) return null;
  let i = null;
  return e.startsWith("rgb") && (i = function(s) {
    const r = ke.exec(s.trim());
    if (!r) return null;
    const h = r[1].split(",").map((f) => f.trim());
    if (h.length < 3) return null;
    const a = B(parseFloat(h[0])), l = B(parseFloat(h[1])), u = B(parseFloat(h[2]));
    let c = 255;
    if (h[3] !== void 0) {
      const f = h[3].trim();
      let g = parseFloat(f);
      f.endsWith("%") && (g /= 100), c = 255 * L(g, 0, 1);
    }
    return [a, l, u, Math.round(c)];
  }(e)), i && (t || i[3] !== 0) ? i : null;
}
class He {
  constructor(t = {}) {
    o(this, "Xr");
    o(this, "en", null);
    o(this, "rn", !1);
    o(this, "nn");
    o(this, "hn", null);
    o(this, "an", !0);
    o(this, "$", null);
    if (this.rn = t.overlay ?? !1, t.gl) this.hn = t.gl, this.Xr = t.gl.canvas, this.nn = !1, this.an = !1;
    else if (this.rn && t.canvas) this.en = t.canvas, this.Xr = this.cn(), this.nn = !0, this.ln();
    else if (t.canvas) {
      if (t.canvas instanceof HTMLVideoElement) throw new S("Video elements are only supported in overlay mode.");
      this.Xr = t.canvas, this.nn = !1;
    } else this.Xr = this.un(t.width, t.height), this.nn = !0;
    this.Xr.style.imageRendering = "pixelated";
  }
  un(t, e) {
    const i = document.createElement("canvas");
    return i.className = "textmodeCanvas", i.style.imageRendering = "pixelated", i.width = t || 800, i.height = e || 600, document.body.appendChild(i), i;
  }
  cn() {
    const t = document.createElement("canvas");
    t.className = "textmodeCanvas", t.style.imageRendering = "pixelated";
    const e = this.en.getBoundingClientRect();
    let i = Math.round(e.width), s = Math.round(e.height);
    if (this.en instanceof HTMLVideoElement) {
      const a = this.en;
      (i === 0 || s === 0) && a.videoWidth > 0 && a.videoHeight > 0 && (i = a.videoWidth, s = a.videoHeight);
    }
    t.width = i, t.height = s, t.style.position = "absolute", t.style.pointerEvents = "none";
    const r = window.getComputedStyle(this.en);
    let h = parseInt(r.zIndex || "0", 10);
    return isNaN(h) && (h = 0), t.style.zIndex = "" + (h + 1), t;
  }
  ln() {
    var t;
    this.fn(), (t = this.en.parentNode) == null || t.insertBefore(this.Xr, this.en.nextSibling);
  }
  dn() {
    const t = [];
    return this.rn && this.en instanceof HTMLElement && (t.push(this.en), this.en.parentElement && t.push(this.en.parentElement)), this.Xr.parentElement && t.push(this.Xr.parentElement), t.push(this.Xr), t.push(document.body), t.push(document.documentElement), t;
  }
  pn() {
    const t = this.dn();
    for (const e of t) {
      if (!e) continue;
      const i = It(window.getComputedStyle(e).backgroundColor);
      if (i) return i;
    }
    return [255, 255, 255, 255];
  }
  fn() {
    if (!this.en) return;
    const t = this.en.getBoundingClientRect();
    let e = this.en.offsetParent;
    if (e && e !== document.body) {
      const i = e.getBoundingClientRect();
      this.Xr.style.top = t.top - i.top + "px", this.Xr.style.left = t.left - i.left + "px";
    } else this.Xr.style.top = t.top + window.scrollY + "px", this.Xr.style.left = t.left + window.scrollX + "px";
  }
  vn(t, e) {
    if (this.rn) {
      const i = this.en.getBoundingClientRect();
      this.Xr.width = Math.round(i.width), this.Xr.height = Math.round(i.height), this.fn();
    } else this.Xr.width = t ?? this.Xr.width, this.Xr.height = e ?? this.Xr.height;
  }
  gn() {
    if (this.hn) return this.hn;
    const t = this.Xr.getContext("webgl2", { alpha: !0, premultipliedAlpha: !1, preserveDrawingBuffer: !0, antialias: !1, depth: !0, stencil: !1, powerPreference: "high-performance" });
    if (!t) throw new S("`textmode.js` requires WebGL2 support.");
    return this.$ = t, t;
  }
  Ss() {
    if (!this.an) return;
    const t = this.$ ?? this.hn;
    if (t) {
      const e = t.getExtension("WEBGL_lose_context");
      e == null || e.loseContext();
    }
    this.nn && this.Xr.parentNode && this.Xr.parentNode.removeChild(this.Xr);
  }
  get canvas() {
    return this.Xr;
  }
  get targetCanvas() {
    return this.en;
  }
  get width() {
    return this.Xr.width;
  }
  get height() {
    return this.Xr.height;
  }
  get ownsContext() {
    return this.an;
  }
}
class x {
  constructor(t, e, i, s) {
    o(this, "mn");
    o(this, "_n");
    o(this, "r");
    o(this, "g");
    o(this, "b");
    o(this, "a");
    this.r = B(t), this.g = B(e), this.b = B(i), this.a = B(s);
  }
  static yn(t, e, i, s) {
    if (x.An(t)) return t;
    if (Array.isArray(t)) {
      if (t.length < 3) throw Error("Component tuples must include at least RGB values.");
      const [r, h, a] = t, l = t.length === 4 ? t[3] : 255;
      return x.wn(r, h, a, l);
    }
    if (typeof t == "string") {
      const r = t.trim();
      if (r.length === 0) throw Error("Color strings cannot be empty.");
      const h = It(r, !0);
      return h ? x.wn(...h) : x.bn(r);
    }
    if (typeof t == "number") return typeof e == "number" && typeof i == "number" ? x.wn(t, e, i, s ?? 255) : typeof e == "number" ? x.Cn(t, e) : x.Cn(t, s ?? 255);
    throw Error("Unsupported color input passed to TextmodeColor.$from.");
  }
  static wn(t, e, i, s = 255) {
    return new x(t, e, i, s);
  }
  static Cn(t, e = 255) {
    return new x(t, t, t, e);
  }
  static bn(t) {
    return new x(...function(e) {
      const i = e.trim().replace(/^#|0x/gi, "");
      if (!/^[0-9A-Fa-f]+$/.test(i)) throw Error("Invalid hex color: " + e);
      const s = (r = i).length === 3 || r.length === 4 ? r.split("").map((h) => h + h).join("") : r;
      var r;
      if (s.length !== 6 && s.length !== 8) throw Error("Invalid hex color: " + e);
      return [tt(s.slice(0, 2)), tt(s.slice(2, 4)), tt(s.slice(4, 6)), s.length === 8 ? tt(s.slice(6, 8)) : 255];
    }(t));
  }
  static xn(t, e, i, s) {
    return new x(Math.round(255 * t), Math.round(255 * e), Math.round(255 * i), Math.round(255 * s));
  }
  get rgb() {
    return [this.r, this.g, this.b];
  }
  get rgba() {
    return this.mn || (this.mn = [this.r, this.g, this.b, this.a]), [...this.mn];
  }
  get normalized() {
    return this._n || (this._n = [this.r / 255, this.g / 255, this.b / 255, this.a / 255]), [...this._n];
  }
  withAlpha(t) {
    return new x(this.r, this.g, this.b, t);
  }
  static An(t) {
    return t instanceof x;
  }
}
class xt extends at {
  constructor(e, i, s, r, h, a, l, u) {
    super();
    o(this, "$");
    o(this, "R");
    o(this, "Mn");
    o(this, "Fn");
    o(this, "$n");
    o(this, "M");
    o(this, "F");
    o(this, "D", null);
    o(this, "Pn", null);
    o(this, "Tn", "brightness");
    o(this, "Sn", null);
    o(this, "En");
    o(this, "Rt", 0);
    o(this, "Gt", 0);
    o(this, "jt", 0);
    o(this, "Dt", 0);
    o(this, "kn", "sampled");
    o(this, "Rn", "fixed");
    o(this, "Xt", [1, 1, 1, 1]);
    o(this, "Yt", [0, 0, 0, 1]);
    o(this, "Dn", [0, 0, 0, 1]);
    o(this, "Ln", [[0.1, 0, 0]]);
    o(this, "Nt", null);
    this.$ = e, this.R = i, this.Mn = s, this.En = r, this.Fn = h, this.$n = a;
    const { width: c, height: f } = function(g, p, v, d) {
      const m = Math.min(v / g, d / p);
      return { width: Math.max(1, Math.floor(g * m)), height: Math.max(1, Math.floor(p * m)), scale: m };
    }(h, a, l, u);
    this.M = c, this.F = f;
  }
  conversionMode(e) {
    return this.Tn = e, this.Sn = null, this.D = null, this;
  }
  dispose() {
    this.Mn && (this.$.deleteTexture(this.Mn), this.Mn = null), super.dispose();
  }
  invert(e = !0) {
    return this.Rt = e ? 1 : 0, this.D = null, this;
  }
  flipX(e = !0) {
    return this.Gt = e ? 1 : 0, this.D = null, this;
  }
  flipY(e = !0) {
    return this.jt = e ? 1 : 0, this.D = null, this;
  }
  charRotation(e) {
    return this.Dt = Pt(e), this.D = null, this;
  }
  charColorMode(e) {
    return this.kn = e, this.D = null, this;
  }
  cellColorMode(e) {
    return this.Rn = e, this.D = null, this;
  }
  charColor(e, i, s, r) {
    return this.On(this.Xt, e, i, s, r), this.D = null, this;
  }
  cellColor(e, i, s, r) {
    return this.On(this.Yt, e, i, s, r), this.D = null, this;
  }
  background(e, i, s, r) {
    return this.On(this.Dn, e, i, s, r), this.D = null, this;
  }
  characters(e) {
    return this.Nt = e, this.zn(e), this.D = null, this;
  }
  Si(e) {
    this.Pn !== e && (this.Pn = e, this.Nt && this.zn(this.Nt), this.D = null);
  }
  get texture() {
    return this.Mn;
  }
  get width() {
    return this.M;
  }
  get height() {
    return this.F;
  }
  get originalWidth() {
    return this.Fn;
  }
  get originalHeight() {
    return this.$n;
  }
  V() {
    return this.D || this.J(), this.D;
  }
  Hn() {
  }
  Bn() {
    return this.Mn;
  }
  J() {
    this.Hn();
    const e = this.In(), i = this.Gn(), s = this.En.jn(this.Tn, i), r = e.createUniforms(i);
    this.D = this.R.materialManager.st(s, r);
  }
  On(e, i, s, r, h) {
    const a = x.yn(i, s, r, h);
    it(e, a.r, a.g, a.b, a.a);
  }
  zn(e) {
    if (!this.Pn) return;
    const i = this.Pn.Ir(e).filter((s) => Array.isArray(s)).slice(0, 255);
    this.Ln = i.length > 0 ? i : this.Ln;
  }
  createBaseConversionUniforms() {
    return { u_image: this.Bn(), u_invert: !!this.Rt, u_flipX: !!this.Gt, u_flipY: !!this.jt, u_charRotation: this.Dt, u_charColorFixed: this.kn === "fixed", u_charColor: this.Xt, u_cellColorFixed: this.Rn === "fixed", u_cellColor: this.Yt, u_backgroundColor: this.Dn, u_charCount: this.Ln.length, u_charList: this.Ln };
  }
  In() {
    if (this.Sn && this.Sn.id === this.Tn) return this.Sn;
    const e = this.En.Qn(this.Tn);
    if (!e) throw Error(`[textmode.js] Conversion mode "${this.Tn}" is not registered. If this mode is provided by an add-on, make sure its plugin is installed before loading sources.`);
    return this.Sn = e, e;
  }
  Gn() {
    if (!this.Pn) throw Error("[textmode.js] Cannot create conversion context: no active font set. Ensure $setActiveFont() is called before rendering.");
    return { renderer: this.R, gl: this.$, font: this.Pn, source: this };
  }
}
class V extends xt {
  constructor(t, e, i, s, r, h, a, l) {
    super(t, e, i, s, r, h, a, l);
  }
  static Nn(t, e, i, s, r) {
    const h = t.context, a = wt(h, i), { width: l, height: u } = bt(i);
    return new V(h, t, a, e, l, u, s, r);
  }
}
class Nt {
  constructor(t = 60) {
    o(this, "Xn");
    o(this, "Yn");
    o(this, "Kn", null);
    o(this, "Wn", 0);
    o(this, "Zn", !0);
    o(this, "qn", 0);
    o(this, "Vn", 0);
    o(this, "Jn", []);
    o(this, "th", 10);
    o(this, "sh", 0);
    o(this, "eh", 0);
    o(this, "ih", -1);
    this.Yn = t, this.Xn = 1e3 / t;
  }
  rh(t) {
    if (!this.Zn) return;
    this.ih === -1 && (this.ih = performance.now()), this.Wn = performance.now();
    const e = (i) => {
      if (!this.Zn) return void (this.Kn = null);
      const s = i - this.Wn;
      s >= this.Xn && (t(), this.Wn = i - s % this.Xn), this.Zn && (this.Kn = requestAnimationFrame(e));
    };
    this.Kn = requestAnimationFrame(e);
  }
  nh() {
    this.Kn && (cancelAnimationFrame(this.Kn), this.Kn = null);
  }
  hh() {
    this.Zn && (this.Zn = !1, this.nh());
  }
  oh(t) {
    this.Zn || (this.Zn = !0, this.rh(t));
  }
  ah(t, e) {
    if (t === void 0) return this.qn;
    this.Yn = t, this.Xn = 1e3 / t, this.Zn && e && (this.nh(), this.rh(e));
  }
  uh() {
    const t = performance.now();
    if (this.Vn > 0) {
      const e = t - this.Vn;
      this.sh = e, this.Jn.push(e), this.Jn.length > this.th && this.Jn.shift();
      const i = this.Jn.reduce((s, r) => s + r, 0) / this.Jn.length;
      this.qn = 1e3 / i;
    }
    this.Vn = t;
  }
  get fh() {
    return this.Zn;
  }
  get dh() {
    return this.qn;
  }
  get ph() {
    return this.Yn;
  }
  set ph(t) {
    this.Yn = t, this.Xn = 1e3 / t;
  }
  get gh() {
    return this.eh;
  }
  set gh(t) {
    this.eh = t;
  }
  mh() {
    this.eh++;
  }
  get _h() {
    return this.ih === -1 ? 0 : performance.now() - this.ih;
  }
  set _h(t) {
    this.ih = performance.now() - t;
  }
  get yh() {
    return this._h / 1e3;
  }
  set yh(t) {
    this._h = 1e3 * t;
  }
  get Ah() {
    return this.sh;
  }
}
function Yt(n, t, e) {
  return n ? n.sn(t, e) : { x: -1 / 0, y: -1 / 0 };
}
class kt {
  constructor(t, e) {
    o(this, "Xr");
    o(this, "wh");
    o(this, "bh", { x: -1 / 0, y: -1 / 0 });
    o(this, "Ch", { x: -1 / 0, y: -1 / 0 });
    o(this, "xh", null);
    o(this, "Mh", 0);
    o(this, "Fh");
    o(this, "$h");
    o(this, "Ph");
    o(this, "Th");
    o(this, "Sh");
    o(this, "Eh");
    o(this, "kh", !1);
    o(this, "Rh");
    o(this, "Dh");
    o(this, "Lh");
    o(this, "Oh");
    o(this, "zh");
    this.Xr = t, this.wh = e;
  }
  Hh(t) {
    const e = performance.now() + Math.max(0, t);
    e > this.Mh && (this.Mh = e);
  }
  Bh() {
    return performance.now() < this.Mh;
  }
  Ih(t) {
    const e = this.Xr.canvas;
    e.style.cursor = t == null || t === "" ? "" : t;
  }
  Gh() {
    if (this.kh) return;
    const t = this.Xr.canvas;
    this.Fh = (e) => {
      this.jh(e), this.Qh(e);
    }, this.$h = () => {
      this.Ch = { ...this.bh }, this.bh.x = -1 / 0, this.bh.y = -1 / 0, this.xh = null;
    }, this.Ph = (e) => {
      this.jh(e), this.Nh(e);
    }, this.Th = (e) => {
      this.jh(e), this.Xh(e);
    }, this.Sh = (e) => {
      this.jh(e), this.Yh(e);
    }, this.Eh = (e) => {
      this.jh(e), this.Kh(e);
    }, t.addEventListener("mousemove", this.Fh, { passive: !0 }), t.addEventListener("mouseleave", this.$h, { passive: !0 }), t.addEventListener("mousedown", this.Ph, { passive: !0 }), t.addEventListener("mouseup", this.Th, { passive: !0 }), t.addEventListener("click", this.Sh, { passive: !0 }), t.addEventListener("wheel", this.Eh, { passive: !1 }), this.kh = !0;
  }
  Wh() {
    if (!this.kh) return;
    const t = this.Xr.canvas;
    t.removeEventListener("mousemove", this.Fh), t.removeEventListener("mouseleave", this.$h), t.removeEventListener("mousedown", this.Ph), t.removeEventListener("mouseup", this.Th), t.removeEventListener("click", this.Sh), t.removeEventListener("wheel", this.Eh), this.kh = !1;
  }
  Zh() {
    if (this.kh) try {
      if (this.xh) {
        const t = new MouseEvent("mousemove", { clientX: this.xh.x, clientY: this.xh.y, bubbles: !1, cancelable: !1 });
        this.jh(t);
      }
    } catch {
      this.bh.x = -1 / 0, this.bh.y = -1 / 0;
    }
  }
  qh(t) {
    this.Rh = t;
  }
  Vh(t) {
    this.Dh = t;
  }
  Jh(t) {
    this.Lh = t;
  }
  so(t) {
    this.Oh = t;
  }
  eo(t) {
    this.zh = t;
  }
  io() {
    return { x: this.bh.x, y: this.bh.y };
  }
  ro(t, e = {}) {
    return { position: { ...this.bh }, previousPosition: { ...this.Ch }, originalEvent: t, ...e };
  }
  Qh(t) {
    this.Oh && !this.Bh() && this.Oh(this.ro(t));
  }
  Nh(t) {
    this.Dh && !this.Bh() && this.Dh(this.ro(t, { button: t.button }));
  }
  Xh(t) {
    this.Lh && !this.Bh() && this.Lh(this.ro(t, { button: t.button }));
  }
  Yh(t) {
    this.Rh && !this.Bh() && this.Rh(this.ro(t, { button: t.button }));
  }
  Kh(t) {
    this.zh && !this.Bh() && this.zh(this.ro(t, { delta: { x: t.deltaX, y: t.deltaY } }));
  }
  jh(t) {
    const e = this.wh();
    this.Ch = { ...this.bh }, this.xh = { x: t.clientX, y: t.clientY };
    const i = Yt(e, t.clientX, t.clientY);
    this.bh.x = i.x, this.bh.y = i.y;
  }
}
const Ge = Object.freeze(Object.defineProperty({ __proto__: null, MouseManager: kt }, Symbol.toStringTag, { value: "Module" }));
class Ht {
  constructor() {
    o(this, "no", /* @__PURE__ */ new Map());
    o(this, "ho", null);
    o(this, "oo", null);
    o(this, "ao");
    o(this, "co");
    o(this, "kh", !1);
    o(this, "lo");
    o(this, "uo");
    o(this, "fo", { ArrowUp: "UP_ARROW", ArrowDown: "DOWN_ARROW", ArrowLeft: "LEFT_ARROW", ArrowRight: "RIGHT_ARROW", F1: "F1", F2: "F2", F3: "F3", F4: "F4", F5: "F5", F6: "F6", F7: "F7", F8: "F8", F9: "F9", F10: "F10", F11: "F11", F12: "F12", Enter: "ENTER", Return: "RETURN", Tab: "TAB", Escape: "ESCAPE", Backspace: "BACKSPACE", Delete: "DELETE", Insert: "INSERT", Home: "HOME", End: "END", PageUp: "PAGE_UP", PageDown: "PAGE_DOWN", Shift: "SHIFT", Control: "CONTROL", Alt: "ALT", Meta: "META", " ": "SPACE" });
  }
  Gh() {
    this.kh || (this.ao = (t) => {
      this.do(t);
    }, this.co = (t) => {
      this.po(t);
    }, window.addEventListener("keydown", this.ao, { passive: !1 }), window.addEventListener("keyup", this.co, { passive: !1 }), this.kh = !0);
  }
  Wh() {
    this.kh && (window.removeEventListener("keydown", this.ao), window.removeEventListener("keyup", this.co), this.kh = !1, this.no.clear(), this.ho = null, this.oo = null);
  }
  Vh(t) {
    this.lo = t;
  }
  Jh(t) {
    this.uo = t;
  }
  vo(t) {
    const e = this.mo(t), i = this.no.get(t) || this.no.get(e);
    return (i == null ? void 0 : i.isPressed) || !1;
  }
  _o() {
    return this.ho;
  }
  yo() {
    return this.oo;
  }
  Ao() {
    const t = [];
    for (const [e, i] of this.no) i.isPressed && t.push(e);
    return t;
  }
  wo() {
    return { ctrl: this.vo("Control"), shift: this.vo("Shift"), alt: this.vo("Alt"), meta: this.vo("Meta") };
  }
  bo() {
    this.no.clear(), this.ho = null, this.oo = null;
  }
  do(t) {
    const e = t.key, i = Date.now();
    this.no.has(e) || this.no.set(e, { isPressed: !1, lastPressTime: 0, lastReleaseTime: 0 });
    const s = this.no.get(e);
    s.isPressed || (s.isPressed = !0, s.lastPressTime = i, this.ho = e, this.lo && this.lo(this.ro(e, !0, t)));
  }
  ro(t, e, i) {
    return { key: t, keyCode: i.keyCode, ctrlKey: i.ctrlKey, shiftKey: i.shiftKey, altKey: i.altKey, metaKey: i.metaKey, isPressed: e, originalEvent: i };
  }
  po(t) {
    const e = t.key, i = Date.now();
    this.no.has(e) || this.no.set(e, { isPressed: !1, lastPressTime: 0, lastReleaseTime: 0 });
    const s = this.no.get(e);
    s.isPressed = !1, s.lastReleaseTime = i, this.oo = e, this.uo && this.uo(this.ro(e, !1, t));
  }
  mo(t) {
    return this.fo[t] || t.toLowerCase();
  }
}
const je = Object.freeze(Object.defineProperty({ __proto__: null, KeyboardManager: Ht }, Symbol.toStringTag, { value: "Module" }));
class Gt {
  constructor(t, e, i) {
    o(this, "Xr");
    o(this, "Co");
    o(this, "wh");
    o(this, "xo", /* @__PURE__ */ new Map());
    o(this, "Mo", /* @__PURE__ */ new Map());
    o(this, "Fo", /* @__PURE__ */ new Map());
    o(this, "$o", null);
    o(this, "Po");
    o(this, "To");
    o(this, "So");
    o(this, "Eo");
    o(this, "ko");
    o(this, "Ro");
    o(this, "kh", !1);
    o(this, "Do");
    o(this, "Lo");
    o(this, "Oo");
    o(this, "zo");
    o(this, "Ho");
    o(this, "Bo");
    o(this, "Io");
    o(this, "Go");
    o(this, "jo");
    o(this, "Qo");
    o(this, "No", 320);
    o(this, "Xo", 350);
    o(this, "Yo", 10);
    o(this, "Ko", 550);
    o(this, "Wo", 14);
    o(this, "Zo", 48);
    o(this, "qo", 650);
    o(this, "Vo", 0.02);
    o(this, "Jo", 2);
    o(this, "ta", 600);
    o(this, "sa", 0);
    o(this, "ea", null);
    this.Xr = t, this.wh = e, this.Co = i;
    const s = this.Xr.canvas;
    this.Po = s.style.touchAction, this.To = s.style.userSelect, s.style.touchAction || (s.style.touchAction = "none"), s.style.userSelect || (s.style.userSelect = "none");
  }
  Gh() {
    if (this.kh) return;
    const t = this.Xr.canvas;
    this.So = (e) => {
      this.ia(e);
    }, this.Eo = (e) => {
      this.ra(e);
    }, this.ko = (e) => {
      this.na(e);
    }, this.Ro = (e) => {
      this.ha(e);
    }, t.addEventListener("touchstart", this.So, { passive: !1 }), t.addEventListener("touchmove", this.Eo, { passive: !1 }), t.addEventListener("touchend", this.ko, { passive: !1 }), t.addEventListener("touchcancel", this.Ro, { passive: !1 }), this.kh = !0;
  }
  Wh() {
    if (!this.kh) return;
    const t = this.Xr.canvas;
    t.removeEventListener("touchstart", this.So), t.removeEventListener("touchmove", this.Eo), t.removeEventListener("touchend", this.ko), t.removeEventListener("touchcancel", this.Ro), this.kh = !1, this.$o = null, this.xo.clear(), this.Mo.clear(), this.Fo.forEach((e) => {
      e.longPressTimer !== null && window.clearTimeout(e.longPressTimer);
    }), this.Fo.clear(), this.ea = null, this.sa = 0, t.style.touchAction = this.Po, t.style.userSelect = this.To;
  }
  Zh() {
    if (!this.wh() || this.xo.size === 0) return;
    const t = /* @__PURE__ */ new Map();
    for (const e of this.xo.values()) {
      const i = this.oa(e.clientX, e.clientY, e.id, e);
      t.set(e.id, i);
    }
    this.xo = t;
  }
  aa() {
    return Array.from(this.xo.values()).map((t) => ({ ...t }));
  }
  ca(t) {
    this.Do = t;
  }
  so(t) {
    this.Lo = t;
  }
  la(t) {
    this.Oo = t;
  }
  ua(t) {
    this.zo = t;
  }
  fa(t) {
    this.Ho = t;
  }
  da(t) {
    this.Bo = t;
  }
  pa(t) {
    this.Io = t;
  }
  va(t) {
    this.Go = t;
  }
  ga(t) {
    this.jo = t;
  }
  ma(t) {
    this.Qo = t;
  }
  ia(t) {
    var s;
    if (!this.wh()) return;
    t.preventDefault(), (s = this.Co) == null || s.Hh(this.ta);
    const e = performance.now(), i = this._a(t.changedTouches);
    for (const r of i) {
      const h = this.xo.get(r.id);
      h && this.Mo.set(r.id, this.ya(h)), this.xo.set(r.id, r);
      const a = { id: r.id, startPosition: r, lastPosition: r, startTime: e, lastTime: e, longPressTimer: null, longPressFired: !1 };
      this.Io && (a.longPressTimer = window.setTimeout(() => {
        const l = this.xo.get(r.id);
        l && (a.longPressFired = !0, this.Io({ touch: this.ya(l), duration: performance.now() - a.startTime, originalEvent: t }));
      }, this.Ko)), this.Fo.set(r.id, a), this.Do && this.Do(this.wa(r, t, void 0, e));
    }
    this.xo.size === 2 && this.ba();
  }
  ra(t) {
    var s;
    if (!this.wh()) return;
    t.preventDefault(), (s = this.Co) == null || s.Hh(this.ta);
    const e = performance.now(), i = this._a(t.changedTouches);
    for (const r of i) {
      const h = this.xo.get(r.id), a = h ? this.ya(h) : void 0;
      a && this.Mo.set(r.id, a), this.xo.set(r.id, r);
      const l = this.Fo.get(r.id);
      l && (l.lastPosition = r, l.lastTime = e, a) && $(a.clientX, a.clientY, r.clientX, r.clientY) > this.Wo && l.longPressTimer !== null && (window.clearTimeout(l.longPressTimer), l.longPressTimer = null), this.Lo && this.Lo(this.wa(r, t, a, e));
    }
    this.xo.size === 2 ? this.Ca(t) : this.$o = null;
  }
  na(t) {
    if (!this.wh()) return;
    t.preventDefault();
    const e = performance.now(), i = this._a(t.changedTouches);
    for (const s of i) {
      const r = this.xo.get(s.id), h = r ? this.ya(r) : void 0, a = this.Fo.get(s.id);
      a && a.longPressTimer !== null && (window.clearTimeout(a.longPressTimer), a.longPressTimer = null), this.Oo && this.Oo(this.wa(s, t, h, e)), a && this.xa(a, t), this.Fo.delete(s.id), this.Mo.delete(s.id), this.xo.delete(s.id);
    }
    this.xo.size < 2 && (this.$o = null);
  }
  ha(t) {
    if (!this.wh()) return;
    t.preventDefault();
    const e = performance.now(), i = this._a(t.changedTouches);
    for (const s of i) {
      const r = this.xo.get(s.id), h = r ? this.ya(r) : void 0, a = this.Fo.get(s.id);
      a && a.longPressTimer !== null && (window.clearTimeout(a.longPressTimer), a.longPressTimer = null), this.zo && this.zo(this.wa(s, t, h, e)), this.Fo.delete(s.id), this.Mo.delete(s.id), this.xo.delete(s.id);
    }
    this.xo.size < 2 && (this.$o = null);
  }
  _a(t) {
    const e = [];
    for (let i = 0; i < t.length; i += 1) {
      const s = t.item(i);
      s && e.push(this.Ma(s));
    }
    return e;
  }
  Ma(t) {
    return this.oa(t.clientX, t.clientY, t.identifier, { id: t.identifier, x: -1, y: -1, clientX: t.clientX, clientY: t.clientY, pressure: t.force, radiusX: t.radiusX, radiusY: t.radiusY, rotationAngle: t.rotationAngle });
  }
  oa(t, e, i, s) {
    const r = Yt(this.wh(), t, e);
    return { id: i, x: r.x, y: r.y, clientX: t, clientY: e, pressure: s.pressure, radiusX: s.radiusX, radiusY: s.radiusY, rotationAngle: s.rotationAngle };
  }
  wa(t, e, i, s) {
    const r = this.Fo.get(t.id), h = Array.from(this.Mo.values()).map((u) => this.ya(u)), a = Array.from(this.xo.values()).map((u) => this.ya(u)), l = this._a(e.changedTouches);
    return { touch: this.ya(t), previousTouch: i ? this.ya(i) : void 0, touches: a, previousTouches: h, changedTouches: l, deltaTime: r ? s - r.lastTime : 0, originalEvent: e };
  }
  ba() {
    if (this.xo.size !== 2) return void (this.$o = null);
    const t = Array.from(this.xo.values()), [e, i] = t, s = $(e.x, e.y, i.x, i.y), r = Rt(e.clientX, e.clientY, i.clientX, i.clientY);
    this.$o = { ids: [e.id, i.id], initialDistance: Math.max(s, 1e-4), initialAngle: r, lastScale: 1, lastRotation: 0 };
  }
  Ca(t) {
    if (this.$o || this.ba(), !this.$o) return;
    const [e, i] = this.$o.ids, s = this.xo.get(e), r = this.xo.get(i);
    if (!s || !r) return;
    const h = $(s.x, s.y, r.x, r.y) / this.$o.initialDistance, a = h - this.$o.lastScale;
    this.jo && Math.abs(a) > this.Vo && (this.jo({ touches: [this.ya(s), this.ya(r)], scale: h, deltaScale: a, center: this.Fa(s, r), originalEvent: t }), this.$o.lastScale = h);
    let l = Rt(s.clientX, s.clientY, r.clientX, r.clientY) - this.$o.initialAngle;
    l = (l + 180) % 360 - 180;
    const u = l - this.$o.lastRotation;
    this.Qo && Math.abs(u) > this.Jo && (this.Qo({ touches: [this.ya(s), this.ya(r)], rotation: l, deltaRotation: u, center: this.Fa(s, r), originalEvent: t }), this.$o.lastRotation = l);
  }
  Fa(t, e) {
    const i = (t.clientX + e.clientX) / 2, s = (t.clientY + e.clientY) / 2, r = this.oa(i, s, -1, { id: -1, x: -1, y: -1, clientX: i, clientY: s });
    return { x: r.x, y: r.y };
  }
  xa(t, e) {
    const i = performance.now(), s = i - t.startTime, r = t.lastPosition.clientX - t.startPosition.clientX, h = t.lastPosition.clientY - t.startPosition.clientY, a = Math.hypot(r, h);
    if (!t.longPressFired && s <= this.No && a <= this.Yo)
      this.$a(t.lastPosition, i) && this.Bo ? this.Bo({ touch: this.ya(t.lastPosition), taps: 2, originalEvent: e }) : this.Ho && this.Ho({ touch: this.ya(t.lastPosition), taps: 1, originalEvent: e });
    else if (!t.longPressFired && s <= this.qo && a >= this.Zo) {
      const l = Math.max(a, 1e-4), u = { x: r / l, y: h / l }, c = { x: r / s, y: h / s };
      this.Go && this.Go({ touch: this.ya(t.lastPosition), direction: u, distance: l, velocity: c, originalEvent: e });
    }
    this.sa = i, this.ea = this.ya(t.lastPosition);
  }
  $a(t, e) {
    return !this.ea || e - this.sa > this.Xo ? !1 : $(t.clientX, t.clientY, this.ea.clientX, this.ea.clientY) <= this.Yo;
  }
  ya(t) {
    return { ...t };
  }
}
const Ke = Object.freeze(Object.defineProperty({ __proto__: null, TouchManager: Gt }, Symbol.toStringTag, { value: "Module" }));
class Z extends xt {
  constructor(e, i, s, r, h, a, l, u, c) {
    super(e, i, s, r, h, a, l, u);
    o(this, "Pa");
    this.Pa = c;
  }
  static Ta(e, i, s, r, h) {
    const a = e.context, l = wt(a, s), { width: u, height: c } = bt(s);
    return new Z(a, e, l, i, u, c, r, h, s);
  }
  Sa() {
    this.Pa instanceof HTMLVideoElement ? this.Pa.readyState >= this.Pa.HAVE_CURRENT_DATA && rt(this.$, this.Mn, this.Pa) : rt(this.$, this.Mn, this.Pa);
  }
  V() {
    return this.D = null, super.V();
  }
  Hn() {
    this.Sa();
  }
  get source() {
    return this.Pa;
  }
}
class ut extends Z {
  constructor(t, e, i, s, r, h, a, l, u) {
    super(t, e, i, s, h, a, l, u, r);
  }
  dispose() {
    super.dispose(), this.Ua.pause(), this.Ua.src = "", this.Ua.load();
  }
  Ea() {
    this.Sa();
  }
  static async Nn(t, e, i, s, r) {
    const h = t.context, a = document.createElement("video");
    a.crossOrigin = "anonymous", a.loop = !0, a.muted = !0, a.playsInline = !0, await new Promise((f, g) => {
      a.addEventListener("loadedmetadata", () => f(), { once: !0 }), a.addEventListener("error", (p) => {
        var d;
        const v = p.target;
        g(Error("Failed to load video: " + (((d = v.error) == null ? void 0 : d.message) || "Unknown error")));
      }, { once: !0 }), a.src = i;
    });
    const l = wt(h, a, h.LINEAR, h.LINEAR, h.CLAMP_TO_EDGE, h.CLAMP_TO_EDGE), { width: u, height: c } = bt(a);
    return new ut(h, t, l, e, a, u, c, s, r);
  }
  async play() {
    await this.Ua.play();
  }
  pause() {
    this.Ua.pause();
  }
  stop() {
    this.Ua.pause(), this.Ua.currentTime = 0;
  }
  speed(t) {
    return this.Ua.playbackRate = t, this;
  }
  loop(t = !0) {
    return this.Ua.loop = t, this;
  }
  time(t) {
    return this.Ua.currentTime = t, this;
  }
  volume(t) {
    return this.Ua.volume = L(t, 0, 1), this;
  }
  get videoElement() {
    return this.Ua;
  }
  get currentTime() {
    return this.Ua.currentTime;
  }
  get duration() {
    return this.Ua.duration;
  }
  get isPlaying() {
    return !this.Ua.paused && !this.Ua.ended;
  }
  get Ua() {
    return this.Pa;
  }
}
async function st(n) {
  if (n.startsWith("./") || n.startsWith("../") || n.endsWith(".vert") || n.endsWith(".frag") || n.endsWith(".glsl")) {
    const t = await fetch(n);
    if (!t.ok) throw Error(`Failed to load shader from ${n}: ${t.statusText}`);
    return await t.text();
  }
  return n;
}
const We = (n) => class extends n {
  rotate(t = 0, e = 0, i = 0) {
    this.R.state.Jt(t), this.R.state.ts(e), this.R.state.ss(i);
  }
  rotateX(t) {
    if (t === void 0) return et(this.R.state.rotationX);
    this.R.state.Jt(t);
  }
  rotateY(t) {
    if (t === void 0) return et(this.R.state.rotationY);
    this.R.state.ts(t);
  }
  rotateZ(t) {
    if (t === void 0) return et(this.R.state.rotationZ);
    this.R.state.ss(t);
  }
  translate(t = 0, e = 0, i = 0) {
    this.R.state.es(t, e, i);
  }
  translateX(t) {
    if (t === void 0) return this.R.state.translationX;
    this.R.state.es(t, 0, 0);
  }
  translateY(t) {
    if (t === void 0) return this.R.state.translationY;
    this.R.state.es(0, t, 0);
  }
  translateZ(t) {
    if (t === void 0) return this.R.state.translationZ;
    this.R.state.es(0, 0, t);
  }
  ortho() {
    this.R.state.As(!0);
  }
  push() {
    this.R.state.K();
  }
  pop() {
    this.R.state.W();
  }
  color(t, e, i, s) {
    return x.yn(t, e, i, s);
  }
  rect(t = 1, e = 1) {
    this.R.ki(t, e);
  }
  point() {
    this.R.ki(1, 1);
  }
  line(t, e, i, s) {
    this.R.Ri(t, e, i, s);
  }
  lineWeight(t) {
    if (t === void 0) return this.R.state.lineWeight;
    this.R.state.qt(t);
  }
  background(t, e, i, s = 255) {
    if (t === void 0) {
      const [h, a, l, u] = this.R.state.canvasBackgroundColor;
      return x.xn(h, a, l, u);
    }
    const r = x.yn(t, e, i, s);
    this.R.Bi(r.r, r.g, r.b, r.a);
  }
  char(t) {
    if (t === void 0) return this.R.state.characterString;
    let e;
    typeof t == "number" ? e = this.font.characters[t].character : e = t;
    const i = Array.from(e);
    if (i.length === 0) throw Error("char() requires at least one character.");
    const s = i[0];
    this.R.state.cs(this.font.Br(s)), this.R.state.ls(s);
  }
  Xt(t, e, i, s) {
    if (t === void 0) {
      const [h, a, l, u] = this.R.state.charColor;
      return x.xn(h, a, l, u);
    }
    const r = x.yn(t, e, i, s);
    this.R.state.us(r.r, r.g, r.b, r.a);
  }
  charColor(t, e, i, s) {
    return this.Xt(t, e, i, s);
  }
  stroke(t, e, i, s) {
    return this.Xt(t, e, i, s);
  }
  Yt(t, e, i, s) {
    if (t === void 0) {
      const [h, a, l, u] = this.R.state.cellColor;
      return x.xn(h, a, l, u);
    }
    const r = x.yn(t, e, i, s);
    this.R.state.fs(r.r, r.g, r.b, r.a);
  }
  cellColor(t, e, i, s) {
    return this.Yt(t, e, i, s);
  }
  fill(t, e, i, s) {
    return this.Yt(t, e, i, s);
  }
  flipX(t) {
    if (t === void 0) return this.R.state.flipX;
    this.R.state.ds(t);
  }
  flipY(t) {
    if (t === void 0) return this.R.state.flipY;
    this.R.state.ps(t);
  }
  charRotation(t) {
    if (t === void 0) return 360 * this.R.state.charRotation;
    this.R.state.gs(t);
  }
  invert(t) {
    if (t === void 0) return this.R.state.invert;
    this.R.state.vs(t);
  }
  clear() {
    this.R.xe(0, 0, 0, 0);
  }
  ellipse(t = 1, e = 1) {
    this.R.Di(t / 2, e / 2);
  }
  triangle(t, e, i, s, r, h) {
    this.R.Li(t, e, i, s, r, h);
  }
  bezierCurve(t, e, i, s, r, h, a, l) {
    this.R.Oi(t, e, i, s, r, h, a, l);
  }
  arc(t, e, i, s) {
    this.R.zi(t / 2, e / 2, i, s);
  }
  shader(t) {
    this.R.Fi(t);
  }
  resetShader() {
    this.R.$i();
  }
  setUniform(t, e) {
    this.R._t(t, e);
  }
  setUniforms(t) {
    this.R.gt(t);
  }
  async createFilterShader(t) {
    const e = await st(t), i = this.R.Pi(e);
    return this.ka(i), i;
  }
  async createShader(t, e) {
    const i = await st(t), s = await st(e), r = this.R.Mi(i, s);
    return this.ka(r), r;
  }
  createFramebuffer(t) {
    const e = this.R.Hi(t.width ?? this.grid.cols, t.height ?? this.grid.rows, t.attachments ?? 3);
    return this.ka(e), e;
  }
  image(t, e, i) {
    this.R.Ti(t, e, i, this.font), t instanceof vt && this.R.Z();
  }
  async loadImage(t) {
    const e = t, i = await new Promise((r, h) => {
      const a = new Image();
      a.crossOrigin = "anonymous", a.onload = () => r(a), a.onerror = (l) => h(l), a.src = e;
    }), s = V.Nn(this.R, this.En, i, this.grid.cols, this.grid.rows);
    return this.ka(s), s;
  }
  async loadVideo(t) {
    const e = await ut.Nn(this.R, this.En, t, this.grid.cols, this.grid.rows);
    return this.ka(e), e;
  }
  createTexture(t) {
    const e = Z.Ta(this.R, this.En, t, this.grid.cols, this.grid.rows);
    return this.ka(e), e;
  }
}, Ve = (n) => class extends n {
  get frameCount() {
    return this.Ra.gh;
  }
  set frameCount(t) {
    this.Ra.gh = t;
  }
  frameRate(t) {
    return t === void 0 ? this.Ra.dh : this.Ra.ah(t, () => this.Da());
  }
  targetFrameRate(t) {
    if (t === void 0) return this.Ra.ph;
    this.Ra.ph = t;
  }
  noLoop() {
    this.Ra.hh();
  }
  loop() {
    this.Ra.oh(() => this.Da());
  }
  redraw(t = 1) {
    if (At.m(typeof t == "number" && t > 0 && Number.isInteger(t), "Redraw count must be a positive integer.", { method: "redraw", providedValue: t })) for (let e = 0; e < t; e++) this.Da();
  }
  isLooping() {
    return this.Ra.fh;
  }
  get millis() {
    return this.Ra._h;
  }
  set millis(t) {
    this.Ra._h = t;
  }
  get secs() {
    return this.Ra.yh;
  }
  set secs(t) {
    this.Ra.yh = t;
  }
  deltaTime() {
    return this.Ra.Ah;
  }
}, Ze = (n) => class extends n {
  constructor(...t) {
    super(...t);
  }
  mouseClicked(t) {
    this.Co.qh(t);
  }
  mousePressed(t) {
    this.Co.Vh(t);
  }
  mouseReleased(t) {
    this.Co.Jh(t);
  }
  mouseMoved(t) {
    this.Co.so(t);
  }
  mouseScrolled(t) {
    this.Co.eo(t);
  }
  get mouse() {
    return this.Co.io();
  }
  cursor(t) {
    this.Co.Ih(t);
  }
}, Qe = (n) => class extends n {
  constructor(...t) {
    super(...t);
  }
  touchStarted(t) {
    this.La.ca(t);
  }
  touchMoved(t) {
    this.La.so(t);
  }
  touchEnded(t) {
    this.La.la(t);
  }
  touchCancelled(t) {
    this.La.ua(t);
  }
  tap(t) {
    this.La.fa(t);
  }
  doubleTap(t) {
    this.La.da(t);
  }
  longPress(t) {
    this.La.pa(t);
  }
  swipe(t) {
    this.La.va(t);
  }
  pinch(t) {
    this.La.ga(t);
  }
  rotateGesture(t) {
    this.La.ma(t);
  }
  get touches() {
    return this.La.aa();
  }
}, $e = (n) => class extends n {
  constructor(...t) {
    super(...t);
  }
  keyPressed(t) {
    this.Oa.Vh(t);
  }
  keyReleased(t) {
    this.Oa.Jh(t);
  }
  isKeyPressed(t) {
    return this.Oa.vo(t);
  }
  get lastKeyPressed() {
    return this.Oa._o();
  }
  get lastKeyReleased() {
    return this.Oa.yo();
  }
  get pressedKeys() {
    return this.Oa.Ao();
  }
  get modifierState() {
    return this.Oa.wo();
  }
};
class jt {
  constructor(t) {
    o(this, "za");
    o(this, "Ha", /* @__PURE__ */ new Map());
    o(this, "Ba", []);
    o(this, "Ia", /* @__PURE__ */ new Map());
    o(this, "Ga", /* @__PURE__ */ new Map());
    o(this, "ja", /* @__PURE__ */ new Map());
    o(this, "Qa", /* @__PURE__ */ new Map());
    o(this, "Na", /* @__PURE__ */ new Map());
    o(this, "Xa", /* @__PURE__ */ new Map());
    o(this, "Ya", /* @__PURE__ */ new Map());
    o(this, "Ka", /* @__PURE__ */ new Map());
    this.za = t;
  }
  Wa(t) {
    for (const e of t) {
      if (this.Ha.has(e.name)) return void console.warn(`[textmode.js] Plugin "${e.name}" is already installed.`);
      const i = this.Za(e.name);
      try {
        const s = e.install(this.za, i);
        s instanceof Promise && s.catch((r) => {
          console.error(`[textmode.js] Async plugin "${e.name}" installation error:`, r), this.qa(e.name);
        });
      } catch (s) {
        throw this.qa(e.name), s;
      }
      this.Ha.set(e.name, e), this.Ba.push(e.name);
    }
  }
  async Va(t) {
    for (const e of t) {
      if (this.Ha.has(e.name)) return void console.warn(`[textmode.js] Plugin "${e.name}" is already installed.`);
      const i = this.Za(e.name);
      try {
        await e.install(this.za, i);
      } catch (s) {
        throw this.qa(e.name), s;
      }
      this.Ha.set(e.name, e), this.Ba.push(e.name);
    }
  }
  async Ja(t) {
    const e = this.Ha.get(t);
    if (!e) return;
    const i = this.Za(t);
    e.uninstall && await e.uninstall(this.za, i), this.Ha.delete(t), this.Ba.splice(this.Ba.indexOf(t), 1), this.qa(t);
  }
  tc() {
    this.sc(this.Ia, (t) => t());
  }
  ec() {
    this.sc(this.Ga, (t) => t());
  }
  rc(t) {
    this.sc(this.ja, (e) => e(t));
  }
  nc(t) {
    this.sc(this.Qa, (e) => e(t));
  }
  hc(t) {
    this.sc(this.Na, (e) => e(t));
  }
  async oc() {
    await this.ac(this.Xa, (t) => t());
  }
  async cc() {
    await this.ac(this.Ya, (t) => t());
  }
  async lc() {
    const t = [...this.Ha.keys()];
    for (const e of t) await this.Ja(e);
  }
  Za(t) {
    const e = this.za, i = this;
    return { get renderer() {
      return e.R;
    }, get canvas() {
      return e.Xr;
    }, get layerManager() {
      return e.layers;
    }, get font() {
      return e.layers.base.font;
    }, get grid() {
      return e.layers.base.grid;
    }, get drawFramebuffer() {
      return e.layers.base.drawFramebuffer;
    }, get asciiFramebuffer() {
      return e.layers.base.asciiFramebuffer;
    }, registerPreDrawHook: (s) => i.uc(i.Ia, t, s), registerPostDrawHook: (s) => i.uc(i.Ga, t, s), registerLayerDisposedHook: (s) => i.uc(i.ja, t, s), registerLayerPreRenderHook: (s) => i.uc(i.Qa, t, s), registerLayerPostRenderHook: (s) => i.uc(i.Na, t, s), registerPreSetupHook: (s) => i.uc(i.Xa, t, s), registerPostSetupHook: (s) => i.uc(i.Ya, t, s), extendLayer: (s, r) => {
      i.fc(t, s, r);
    }, removeLayerExtension: (s) => {
      i.dc(t, s);
    } };
  }
  uc(t, e, i) {
    const s = t.get(e) ?? /* @__PURE__ */ new Set();
    return s.add(i), t.set(e, s), () => {
      const r = t.get(e);
      r && (r.delete(i), r.size === 0 && t.delete(e));
    };
  }
  qa(t) {
    this.Ia.delete(t), this.Ga.delete(t), this.ja.delete(t), this.Qa.delete(t), this.Na.delete(t), this.Xa.delete(t), this.Ya.delete(t);
    const e = this.Ka.get(t);
    if (e) {
      for (const i of e.keys()) this.vc(i);
      this.Ka.delete(t);
    }
  }
  sc(t, e) {
    for (const i of this.Ba) {
      const s = t.get(i);
      s && s.forEach(e);
    }
  }
  async ac(t, e) {
    for (const i of this.Ba) {
      const s = t.get(i);
      if (s) for (const r of s) await e(r);
    }
  }
  fc(t, e, i) {
    let s = this.Ka.get(t);
    s || (s = /* @__PURE__ */ new Map(), this.Ka.set(t, s));
    for (const [r, h] of this.Ka) r !== t && h.has(e) && console.warn(`[textmode.js] Plugin "${t}" is overwriting layer method "${e}" previously added by plugin "${r}".`);
    s.set(e, i), this.gc(e, i);
  }
  dc(t, e) {
    const i = this.Ka.get(t);
    if (!i) return;
    i.delete(e);
    let s = !1;
    for (const [r, h] of this.Ka) if (r !== t && h.has(e)) {
      s = !0;
      const a = h.get(e);
      this.gc(e, a);
      break;
    }
    s || this.vc(e);
  }
  gc(t, e) {
    const i = Object.getPrototypeOf(this.za.layers.base);
    Object.defineProperty(i, t, { value: e, writable: !0, configurable: !0, enumerable: !1 });
  }
  vc(t) {
    const e = Object.getPrototypeOf(this.za.layers.base), i = Object.getOwnPropertyDescriptor(e, t);
    i && i.configurable && delete e[t];
  }
}
const ri = Object.freeze(Object.defineProperty({ __proto__: null, TextmodePluginManager: jt }, Symbol.toStringTag, { value: "Module" })), W = `#version 300 es
layout(location=0)in vec2 A;layout(location=1)in vec2 B;out vec2 v_uv;void main(){v_uv=B;gl_Position=vec4(A,0.,1.);}`, Kt = `#version 300 es
precision highp float;uniform sampler2D u_texture;in vec2 v_uv;out vec4 fragColor;void main(){fragColor=texture(u_texture,v_uv);}`;
class Wt {
  constructor() {
    o(this, "mc", /* @__PURE__ */ new Map());
    o(this, "_c", []);
    o(this, "yc", 0);
    o(this, "wc", 0);
    o(this, "bc");
  }
  get Cc() {
    return this.yc;
  }
  get xc() {
    if (this.yc === 0) return 0;
    let t = 0;
    for (const e of this._c) {
      const i = this.mc.get(e);
      i && (t += L(i.progress, 0, 1) * i.weight);
    }
    return Math.min(1, t / this.yc);
  }
  Mc(t) {
    this.bc = t;
  }
  Fc(t, e = 1) {
    const i = `phase-${this._c.length + 1}-${Date.now()}`, s = { id: i, label: t, weight: Math.max(1e-3, e), progress: 0, status: "running" };
    return this.mc.set(i, s), this._c.push(i), this.yc += s.weight, i;
  }
  $c(t, e) {
    const i = this.mc.get(t);
    if (!i) return;
    i.progress = L(e, 0, 1), i.status = i.progress >= 1 ? "complete" : "running";
    const s = this.xc;
    Math.abs(s - this.wc) > 1e-3 && (this.wc = s, this.bc && this.bc(s));
  }
  Pc(t) {
    const e = this.mc.get(t);
    e && (e.progress = 1, e.status = "complete", this.$c(t, 1));
  }
  Tc(t) {
    const e = this.mc.get(t);
    e && (e.status = "failed");
  }
  Sc() {
    return this._c.map((t) => {
      const e = this.mc.get(t);
      return e ? { id: e.id, label: e.label, weight: e.weight, progress: e.progress, status: e.status } : { id: t, label: t, weight: 1, progress: 0, status: "pending" };
    });
  }
}
class Vt {
  constructor(t = "active") {
    o(this, "Ec");
    o(this, "kc", "");
    o(this, "Rc", "");
    this.Ec = t;
  }
  get Dc() {
    return this.Ec;
  }
  get Lc() {
    return this.Ec !== "disabled";
  }
  get Oc() {
    return this.Ec === "active" || this.Ec === "transitioning" || this.Ec === "error";
  }
  get zc() {
    return this.kc;
  }
  get Hc() {
    return this.Rc;
  }
  Bc() {
    this.Ec !== "done" && this.Ec !== "transitioning" || (this.Ec = "active");
  }
  Ic() {
    this.Ec !== "disabled" && (this.Ec = "done");
  }
  Gc() {
    this.Ec !== "disabled" && (this.Ec = "transitioning");
  }
  jc() {
    this.Ec === "transitioning" && (this.Ec = "done");
  }
  Qc(t) {
    this.Ec !== "disabled" && (this.Ec = "error", t instanceof Error ? (this.kc = t.message, this.Rc = t.stack || "") : (this.kc = t, this.Rc = ""));
  }
  Nc() {
    this.Ec = "disabled";
  }
}
class Zt {
  constructor(t, e) {
    o(this, "Xc", 0);
    o(this, "Yc", 1);
    o(this, "Kc");
    o(this, "Wc");
    this.Kc = t, this.Wc = e;
  }
  get Zc() {
    return this.Yc;
  }
  get qc() {
    return this.Yc < 1;
  }
  rh() {
    this.Kc !== "none" && this.Wc > 0 && (this.Xc = performance.now());
  }
  N() {
    if (this.Kc === "none" || this.Wc === 0) return this.Yc = 1, !1;
    const t = performance.now() - this.Xc, e = Math.min(1, t / this.Wc);
    return e >= 1 ? (this.Yc = 0, !0) : (this.Yc = 1 - e, !1);
  }
  Qs() {
    this.Yc = 1, this.Xc = 0;
  }
}
function yt(n, t) {
  const e = n.tone ?? "auto";
  let i = "dark";
  return e === "light" || e === "dark" ? i = e : t && (i = function(s) {
    if (!s) return 0;
    const [r, h, a] = s.map((u) => u / 255), l = (u) => u <= 0.04045 ? u / 12.92 : Math.pow((u + 0.055) / 1.055, 2.4);
    return 0.2126 * l(r) + 0.7152 * l(h) + 0.0722 * l(a);
  }(t) > 0.5 ? "light" : "dark"), { mode: i, background: t, textColor: i === "light" ? "#1A1A1A" : "#F8F8F8", subtleColor: i === "light" ? "#4A4A4A" : "#C0C0C0" };
}
function Qt(n) {
  return n.mode === "light" ? ["#E91E63", "#9C27B0", "#FF6F00"] : ["#8EF9F3", "#F15BB5", "#FF9B71"];
}
function $t(n, t) {
  return n.length ? n.map((e) => x.yn(e)) : [t.color("#FFFFFF")];
}
class qt {
  constructor(t, e, i, s) {
    this.Vc = t, this.id = e, this.label = i, this.Jc = s;
  }
  report(t) {
    this.Vc.$c(this.id, t);
  }
  complete() {
    this.Vc.Pc(this.id);
  }
  fail(t) {
    this.Vc.Tc(this.id), this.Jc && this.Jc(t ?? Error(`Loading phase "${this.label}" failed`));
  }
  async track(t) {
    try {
      const e = typeof t == "function" ? await t() : await t;
      return this.complete(), e;
    } catch (e) {
      throw this.fail(e instanceof Error ? e : e + ""), e;
    }
  }
}
const qe = ({ textmodifier: n, grid: t, progress: e, frameCount: i, message: s, palette: r, theme: h, phases: a, transitionOpacity: l, isError: u, errorMessage: c }) => {
  const f = "|/-\\", g = Math.floor(i / 6) % 4, p = x.yn(h.textColor), v = Math.floor(255 * l), d = n.color(p.r, p.g, p.b, v);
  if (n.charColor(d), n.cellColor(0, 0, 0, 0), u) {
    const m = x.yn(h.mode === "light" ? "#D32F2F" : "#FF6B6B").withAlpha(v);
    n.charColor(m), n.push(), n.translate(0, -2, 0), n.char("X"), n.rect(1, 1), n.pop();
    const y = "SETUP ERROR", w = -Math.floor(y.length / 2);
    n.push(), n.translate(w, 0, 0);
    for (const A of y) n.char(A), n.rect(1, 1), n.translateX(1);
    if (n.pop(), c) {
      const A = x.yn(h.subtleColor), R = n.color(A.r, A.g, A.b, v);
      n.charColor(R);
      const b = Math.floor(0.8 * t.cols), F = c.split(" "), P = [];
      let T = "";
      for (const C of F) (T + " " + C).length <= b ? T = T ? T + " " + C : C : (T && P.push(T), T = C);
      T && P.push(T);
      const X = P.slice(0, 3);
      P.length > 3 && (X[2] = X[2].substring(0, b - 3) + "..."), X.forEach((C, Q) => {
        const re = -Math.floor(C.length / 2);
        n.push(), n.translate(re, 3 + Q, 0);
        for (const ne of C) n.char(ne), n.rect(1, 1), n.translateX(1);
        n.pop();
      });
    }
    return;
  }
  if (n.push(), n.translate(0, 0, 0), n.char(f[g]), n.rect(1, 1), n.pop(), e > 0 || a.some((m) => m.status !== "pending")) {
    const m = Math.max(6, Math.floor(0.6 * t.cols)), y = -Math.floor(m / 2), w = Math.floor(m * e), A = r.length ? r : [n.color("#FFFFFF")];
    n.push(), n.translate(y, 3, 0);
    for (let R = 0; R < m; R++) {
      const b = R < w ? "*" : ".", F = A[R % A.length], P = n.color(F.r, F.g, F.b, v);
      n.charColor(P), n.char(b), n.rect(1, 1), n.translateX(1);
    }
    n.pop();
  }
  if (s) {
    const m = x.yn(h.subtleColor), y = n.color(m.r, m.g, m.b, v);
    n.charColor(y);
    const w = -Math.floor(s.length / 2);
    n.push(), n.translate(w, 5, 0);
    for (const A of s) n.char(A), n.rect(1, 1), n.translateX(1);
    n.pop();
  }
};
class ot {
  constructor(t, e = {}) {
    o(this, "tl");
    o(this, "Zc");
    o(this, "sl");
    o(this, "el");
    o(this, "il");
    o(this, "rl");
    o(this, "nl");
    o(this, "hl");
    o(this, "ol");
    o(this, "al");
    o(this, "yr");
    o(this, "cl");
    o(this, "ll");
    o(this, "ul");
    o(this, "fl");
    o(this, "dl", () => {
    });
    o(this, "pl", []);
    o(this, "vl", /* @__PURE__ */ new Map());
    this.tl = e.visible ?? !0, this.Zc = e.opacity ?? 1, this.sl = e.blendMode ?? "normal", this.el = e.offsetX ?? 0, this.il = e.offsetY ?? 0, this.rl = e.rotationZ ?? 0, this.nl = e.fontSize ?? 16, this.hl = e.fontSource, e.fontSource instanceof Y ? this.yr = e.fontSource : this.yr = new Y(t, this.nl);
  }
  async ml(t) {
    this.ol = t, this.yr.Gr || await this.yr.Er(this.hl);
    const e = this.yr.maxGlyphDimensions;
    this.al = new Ye(this.ol.canvas.canvas, e.width, e.height);
    const i = this.al;
    this.cl = this.ol.createFramebuffer(i.cols, i.rows, 3), this.ll = this.ol.createFramebuffer(i.width, i.height, 1), this.ul = this.ol.createFramebuffer(i.width, i.height, 1), this.fl = [this.ol.createFramebuffer(i.width, i.height, 1, { depth: !1 }), this.ol.createFramebuffer(i.width, i.height, 1, { depth: !1 })], this.al.Vr(() => {
      var s, r, h;
      this.cl.resize(this.al.cols, this.al.rows), this.ll.resize(this.al.width, this.al.height), (s = this.ul) == null || s.resize(this.al.width, this.al.height), (r = this.fl) == null || r[0].resize(this.al.width, this.al.height), (h = this.fl) == null || h[1].resize(this.al.width, this.al.height);
    });
  }
  draw(t) {
    this.dl = t;
  }
  show() {
    this.tl = !0;
  }
  hide() {
    this.tl = !1;
  }
  opacity(t) {
    if (t === void 0) return this.Zc;
    this.Zc = L(t, 0, 1);
  }
  blendMode(t) {
    if (t === void 0) return this.sl;
    this.sl = t;
  }
  offset(t, e = 0) {
    if (t === void 0) return { x: this.el, y: this.il };
    this.el = t, this.il = e;
  }
  rotateZ(t) {
    if (t === void 0) return this.rl;
    this.rl = t;
  }
  filter(t, e) {
    this.pl.push({ name: t, params: e });
  }
  setPluginState(t, e) {
    this.vl.set(t, e);
  }
  getPluginState(t) {
    return this.vl.get(t);
  }
  hasPluginState(t) {
    return this.vl.has(t);
  }
  deletePluginState(t) {
    return this.vl.delete(t);
  }
  fontSize(t) {
    if (t === void 0) return this.yr.fontSize;
    At.m(typeof t == "number" && t > 0, "Font size must be a positive number greater than 0.", { method: "fontSize", providedValue: t }) && this.yr.fontSize !== t && (this.yr.Dr(t), this._l());
  }
  async loadFont(t) {
    if (!this.yr) throw Error("Layer font not initialized. Ensure layer is attached before loading fonts.");
    return t instanceof Y ? (this.yr !== t && this.yr.dispose(), this.yr = t, this.yr.Gr || await this.yr.Er()) : await this.yr.Or(t), this._l(), this.yr;
  }
  Da(t, e) {
    if (!this.tl || !this.cl || !this.ll) return;
    const i = this.ol.renderer, s = this.al;
    t.yl.nc(this), this.cl.begin(), i.state.Vt(), t.Al = this;
    try {
      this.dl.call(t);
    } finally {
      t.Al = void 0;
    }
    this.cl.end(), t.yl.hc(this);
    const r = this.pl.length > 0, h = r ? this.ul : this.ll;
    h.begin(), i.xi(e), e.gt({ u_characterTexture: this.yr.fontFramebuffer, u_charsetDimensions: [this.yr.textureColumns, this.yr.textureRows], Uf: this.cl.textures[0], Ud: this.cl.textures[1], Ue: this.cl.textures[2], Ug: [s.cols, s.rows], Uh: [h.width, h.height], Ui: [0, 0, 0, 0] }), i.Ei(0, 0, s.width, s.height), h.end(), r && this.ol.filterManager.wl(this.ul.textures[0], this.ll, this.pl, this.ll.width, this.ll.height, this.fl), this.pl = [];
  }
  vn() {
    var t;
    this.cl && this.ll && ((t = this.al) == null || t.reset());
  }
  Ss() {
    var t, e, i, s, r, h, a;
    (t = this.cl) == null || t.dispose(), (e = this.ll) == null || e.dispose(), (i = this.ul) == null || i.dispose(), (s = this.fl) == null || s[0].dispose(), (r = this.fl) == null || r[1].dispose(), (h = this.yr) == null || h.dispose(), (a = this.al) == null || a.Ss();
  }
  get texture() {
    var t;
    return (t = this.ll) == null ? void 0 : t.textures[0];
  }
  get grid() {
    return this.al;
  }
  get font() {
    return this.yr;
  }
  get width() {
    return this.ll ? this.ll.width : 0;
  }
  get height() {
    return this.ll ? this.ll.height : 0;
  }
  get drawFramebuffer() {
    return this.cl;
  }
  get asciiFramebuffer() {
    return this.ll;
  }
  _l() {
    if (!this.al || !this.yr) return;
    const t = this.yr.maxGlyphDimensions;
    this.al.tn(t.width, t.height), this.cl && this.ll && this.vn();
  }
}
const Je = { message: "LOADING...", tone: "auto", transition: "fade", transitionDuration: 500 };
class Jt {
  constructor(t, e, i) {
    o(this, "za");
    o(this, "l");
    o(this, "bl");
    o(this, "Vc");
    o(this, "Cl");
    o(this, "xl");
    o(this, "Ml");
    o(this, "Fl");
    o(this, "$l", []);
    o(this, "Pl");
    o(this, "Tl", performance.now());
    o(this, "Sl", 0);
    o(this, "El", !1);
    o(this, "Sr", !1);
    o(this, "Ll");
    this.za = t, this.l = { ...Je, ...e ?? {} }, this.bl = new Vt("active"), this.Vc = new Wt(), this.Cl = new Zt(this.l.transition, this.l.transitionDuration), this.xl = new Nt(60), this.Pl = yt(this.l, i);
    const s = Qt(this.Pl);
    this.$l = $t(s, this.za), this.Fl = this.kl(), this.Vc.Mc((r) => {
      r >= 0.999 && this.Ic();
    });
  }
  async Er() {
    if (this.Sr) return;
    const t = this.za.R, e = this.za.Xr;
    this.Ml = new ot(t, { visible: !0, opacity: 1, fontSize: 16 }), await this.Ml.ml({ renderer: t, canvas: e, filterManager: null, createFramebuffer: (i, s, r = 1, h) => t.Hi(i, s, r, h) }), this.Sr = !0;
  }
  get Oc() {
    return this.bl.Oc && this.El;
  }
  rh() {
    this.El || (this.El = !0, this.Tl = performance.now(), this.Sl = 0, this.xl.rh(() => this.Rl()));
  }
  nh() {
    this.El && (this.El = !1, this.xl.nh());
  }
  vn() {
    this.Sr && this.Ml.vn();
  }
  Ss() {
    this.nh(), this.Sr && (this.Ml.Ss(), this.Sr = !1);
  }
  get progress() {
    return this.Vc.xc;
  }
  message(t) {
    return typeof t == "string" && (this.l.message = t), this.l.message;
  }
  addPhase(t, e = 1) {
    this.bl.Bc();
    const i = this.Vc.Fc(t, e);
    return new qt(this.Vc, i, t, (s) => this.error(s));
  }
  Ic() {
    this.bl.Dc !== "error" && (this.l.transition !== "none" && this.l.transitionDuration > 0 ? (this.bl.Gc(), this.Cl.rh()) : (this.bl.Ic(), this.nh(), this.Dl()));
  }
  Dl() {
    this.Ll && this.Ll();
  }
  Ol(t) {
    this.Ll = t;
  }
  error(t) {
    this.bl.Qc(t);
  }
  Rl() {
    if (this.bl.Oc) {
      if (this.Sl++, this.bl.Dc === "transitioning" && this.Cl.N())
        return this.bl.jc(), this.Dl(), void this.nh();
      this.zl();
    }
  }
  zl() {
    if (!this.Sr) return;
    const t = this.Ml, e = t.grid, i = this.za.R, s = { textmodifier: this.za, grid: e, progress: this.progress, elapsedMs: performance.now() - this.Tl, frameCount: this.Sl, message: this.l.message, palette: this.$l, theme: this.Pl, phases: this.Vc.Sc(), transitionOpacity: this.Cl.Zc, isError: this.bl.Dc === "error", errorMessage: this.bl.zc || void 0, errorDetails: this.bl.Hc || void 0 };
    t.draw(() => {
      this.za.resetShader(), this.za.clear(), this.za.push();
      try {
        this.Fl(s);
      } finally {
        this.za.pop();
      }
    }), t.Da(this.za, this.za.Hl);
    const r = t.texture;
    r && (i.xe(...i.state.canvasBackgroundColor), i.xi(this.za.Bl), this.za.Bl.gt({ u_texture: r }), i.Ei(e.offsetX, e.offsetY, e.width, e.height));
  }
  Il(t) {
    this.Pl = yt(this.l, t);
  }
  kl() {
    const t = this.l.renderer || qe;
    return (e) => {
      t(e), this.Gl(e);
    };
  }
  Gl(t) {
    const { textmodifier: e, grid: i, frameCount: s, theme: r, transitionOpacity: h } = t, a = [116, 101, 120, 116, 109, 111, 100, 101, 46, 106, 115].map((f) => String.fromCharCode(f)).join(""), l = (i.rows + 1 >> 1) - 2, u = 2 - (i.cols + 1 >> 1), c = r.mode === "light" ? [[233, 30, 99], [156, 39, 176], [255, 111, 0]] : [[142, 249, 243], [241, 91, 181], [255, 155, 113]];
    e.push(), e.translate(u, l, 0);
    for (let f = 0; f < a.length; f++) {
      const g = a[f], p = Math.floor(0.1 * s + 0.5 * f) % c.length, [v, d, m] = c[p], y = Math.floor(255 * h), w = e.color(v, d, m, y);
      e.charColor(w), e.char(g), e.point(), e.translateX(1);
    }
    e.pop();
  }
}
const Ct = { normal: 0, additive: 1, multiply: 2, screen: 3, subtract: 4, darken: 5, lighten: 6, overlay: 7, softLight: 8, hardLight: 9, colorDodge: 10, colorBurn: 11, difference: 12, exclusion: 13 };
class te {
  constructor(t, e, i) {
    o(this, "R");
    o(this, "jl");
    o(this, "fl");
    o(this, "Ql", 0);
    this.R = t, this.jl = t.Mi(W, `#version 300 es
precision highp float;uniform sampler2D Uj;uniform sampler2D Uk;uniform vec2 Ul;uniform vec2 Um;uniform vec2 Un;uniform float Uo;uniform float Up;uniform int Uq;in vec2 v_uv;out vec4 fragColor;const int A=0;const int B=1;const int C=2;const int D=3;const int E=4;const int F=5;const int G=6;const int H=7;const int I=8;const int J=9;const int K=10;const int L=11;const int M=12;const int N=13;vec3 O(vec3 P,vec3 Q){return Q;}vec3 R(vec3 P,vec3 Q){return P+Q;}vec3 S(vec3 P,vec3 Q){return P*Q;}vec3 T(vec3 P,vec3 Q){return 1.-(1.-P)*(1.-Q);}vec3 U(vec3 P,vec3 Q){return max(P-Q,0.);}vec3 V(vec3 P,vec3 Q){return min(P,Q);}vec3 W(vec3 P,vec3 Q){return max(P,Q);}vec3 X(vec3 P,vec3 Q){return mix(2.*P*Q,1.-2.*(1.-P)*(1.-Q),step(0.5,P));}vec3 Y(vec3 P,vec3 Q){return mix(P-(1.-2.*Q)*P*(1.-P),mix(P+(2.*Q-1.)*(P*(3.-2.*P)-P),P+(2.*Q-1.)*(sqrt(P)-P),step(0.25,P)),step(0.5,Q));}vec3 Z(vec3 P,vec3 Q){return mix(2.*P*Q,1.-2.*(1.-P)*(1.-Q),step(0.5,Q));}vec3 a(vec3 P,vec3 Q){return mix(min(vec3(1.),P/max(1.-Q,0.0001)),vec3(1.),step(1.,Q));}vec3 b(vec3 P,vec3 Q){return mix(1.-min(vec3(1.),(1.-P)/max(Q,0.0001)),vec3(0.),step(Q,vec3(0.)));}vec3 c(vec3 P,vec3 Q){return abs(P-Q);}vec3 d(vec3 P,vec3 Q){return P+Q-2.*P*Q;}vec3 e(int f,vec3 P,vec3 Q){if(f==A)return O(P,Q);if(f==B)return R(P,Q);if(f==C)return S(P,Q);if(f==D)return T(P,Q);if(f==E)return U(P,Q);if(f==F)return V(P,Q);if(f==G)return W(P,Q);if(f==H)return X(P,Q);if(f==I)return Y(P,Q);if(f==J)return Z(P,Q);if(f==K)return a(P,Q);if(f==L)return b(P,Q);if(f==M)return c(P,Q);if(f==N)return d(P,Q);return O(P,Q);}void main(){vec4 g=texture(Uk,v_uv);vec2 h=v_uv*Ul;vec2 i=h-Un;vec2 j=Um*0.5;vec2 k=i-j;float l=cos(-Up);float m=sin(-Up);vec2 n=vec2(k.x*l-k.y*m,k.x*m+k.y*l);i=n+j;bool o=any(lessThan(i,vec2(0.)))||any(greaterThanEqual(i,Um));if(o){fragColor=g;return;}vec2 p=(floor(i)+0.5)/Um;vec4 q=texture(Uj,p);float r=q.a*Uo;if(r<=0.){fragColor=g;return;}vec3 s=e(Uq,g.rgb,q.rgb);vec3 t=mix(g.rgb,s,r);float u=g.a+r*(1.-g.a);fragColor=vec4(t,u);}`), this.fl = [this.R.Hi(e, i, 1), this.R.Hi(e, i, 1)];
  }
  Nl(t) {
    const e = this.R.context, { base: i, targetFramebuffer: s, backgroundColor: r, layers: h, canvasWidth: a, canvasHeight: l } = t, u = e.isEnabled(e.DEPTH_TEST), c = e.getParameter(e.DEPTH_WRITEMASK);
    u && e.disable(e.DEPTH_TEST), c && e.depthMask(!1);
    const f = this.fl[0];
    f.begin(), this.R.xe(...r), f.end(), this.Ql = 0, i.layer.tl && this.Xl(i.texture, a, l, i.width, i.height, i.layer.Zc, i.offsetX, i.offsetY, i.layer.rl, "normal");
    for (const g of h) {
      const p = g.layer;
      p.tl && this.Xl(g.texture, a, l, g.width, g.height, p.Zc, g.offsetX, g.offsetY, p.rl, p.sl);
    }
    this.Yl(s, a, l), e.depthMask(c), u && e.enable(e.DEPTH_TEST);
  }
  Xl(t, e, i, s, r, h, a, l, u, c) {
    const f = this.fl[this.Ql], g = this.Ql === 0 ? 1 : 0, p = this.fl[g], v = N(u);
    p.begin(), this.R.xi(this.jl), this.jl.gt({ Uj: t, Uk: f.textures[0], Ul: [e, i], Um: [s, r], Un: [a, l], Uo: h, Up: v, Uq: Ct[c] }), this.R.Ei(0, 0, f.width, f.height), p.end(), this.Ql = g;
  }
  Yl(t, e, i) {
    const s = this.fl[this.Ql];
    t.begin(), this.R.xi(this.jl), this.jl.gt({ Uj: s.textures[0], Uk: s.textures[0], Ul: [e, i], Um: [s.width, s.height], Un: [0, 0], Uo: 1, Up: 0, Uq: Ct.normal }), this.R.Ei(0, 0, e, i), t.end();
  }
  vn(t, e) {
    this.fl[0].resize(t, e), this.fl[1].resize(t, e);
  }
  Ss() {
    this.jl.dispose(), this.fl[0].dispose(), this.fl[1].dispose();
  }
}
class ti {
  constructor(t = {}) {
    o(this, "Kl", []);
    o(this, "Wl", []);
    o(this, "Zl", !1);
    o(this, "l");
    this.l = t;
  }
  async initialize(t) {
    var e, i;
    for (const s of this.Wl) t && await t(s), this.Kl.push(s), (i = (e = this.l).onAdd) == null || i.call(e, s);
    this.Wl = [], this.Zl = !0;
  }
  get isReady() {
    return this.Zl;
  }
  add(t) {
    var e, i;
    return this.Zl ? (this.Kl.push(t), (i = (e = this.l).onAdd) == null || i.call(e, t)) : this.Wl.push(t), t;
  }
  addMany(t) {
    for (const e of t) this.add(e);
    return t;
  }
  remove(t) {
    const e = this.Kl.indexOf(t);
    if (e !== -1) return this.Kl.splice(e, 1), this.ql(t), !0;
    const i = this.Wl.indexOf(t);
    return i !== -1 && (this.Wl.splice(i, 1), this.ql(t), !0);
  }
  removeAt(t) {
    if (t < 0 || t >= this.Kl.length) return;
    const [e] = this.Kl.splice(t, 1);
    return this.ql(e), e;
  }
  move(t, e) {
    var r, h;
    const i = this.Kl.indexOf(t);
    if (i !== -1) {
      this.Kl.splice(i, 1);
      const a = L(e, 0, this.Kl.length);
      return this.Kl.splice(a, 0, t), (h = (r = this.l).onMove) == null || h.call(r, t, i, a), !0;
    }
    const s = this.Wl.indexOf(t);
    if (s !== -1) {
      this.Wl.splice(s, 1);
      const a = L(e, 0, this.Wl.length);
      return this.Wl.splice(a, 0, t), !0;
    }
    return !1;
  }
  swap(t, e) {
    var a, l;
    if (t === e) return !0;
    const i = this.Kl.indexOf(t), s = this.Kl.indexOf(e);
    if (i !== -1 && s !== -1) return this.Kl[i] = e, this.Kl[s] = t, (l = (a = this.l).onSwap) == null || l.call(a, t, e, i, s), !0;
    const r = this.Wl.indexOf(t), h = this.Wl.indexOf(e);
    return r !== -1 && h !== -1 && (this.Wl[r] = e, this.Wl[h] = t, !0);
  }
  clear() {
    for (const t of this.Kl) this.ql(t);
    this.Kl = [];
    for (const t of this.Wl) this.ql(t);
    this.Wl = [];
  }
  dispose() {
    this.clear(), this.Zl = !1;
  }
  get all() {
    return this.Kl;
  }
  get pending() {
    return this.Wl;
  }
  get length() {
    return this.Kl.length;
  }
  get totalLength() {
    return this.Kl.length + this.Wl.length;
  }
  get isEmpty() {
    return this.Kl.length === 0;
  }
  get(t) {
    return this.Kl[t];
  }
  get first() {
    return this.Kl[0];
  }
  get last() {
    return this.Kl[this.Kl.length - 1];
  }
  indexOf(t) {
    return this.Kl.indexOf(t);
  }
  has(t) {
    return this.Kl.includes(t) || this.Wl.includes(t);
  }
  [Symbol.iterator]() {
    return this.Kl[Symbol.iterator]();
  }
  ql(t) {
    var e, i, s, r;
    (i = (e = this.l).onRemove) == null || i.call(e, t), (r = (s = this.l).onDispose) == null || r.call(s, t);
  }
}
class ee {
  constructor(t) {
    o(this, "R");
    o(this, "Vl", /* @__PURE__ */ new Map());
    o(this, "Jl", /* @__PURE__ */ new Map());
    o(this, "Ke");
    o(this, "fl");
    o(this, "Sr", !1);
    this.R = t, this.Ke = t.Mi(W, Kt), this.tu();
  }
  async register(t, e, i = {}) {
    const s = Object.entries(i), r = s.length > 0 ? s[0][1][0] : null;
    let h;
    if (typeof e == "string") {
      const l = await st(e);
      h = this.R.Mi(W, l), this.Jl.set(t, h);
    } else h = e, this.Jl.set(t, h);
    const a = { id: t, createShader: () => h, createUniforms: (l, u) => {
      const c = { u_resolution: [u.width, u.height] };
      for (const [f, [g, p]] of s) {
        let v = p;
        if (l != null) {
          if (typeof l == "number" && g === r) v = l;
          else if (typeof l == "object" && g in l) {
            const d = l[g];
            Xt(d) && (v = d);
          }
        }
        c[f] = v;
      }
      return c;
    } };
    this.Vl.set(t, a);
  }
  unregister(t) {
    const e = this.Jl.get(t);
    return e && (e.dispose(), this.Jl.delete(t)), this.Vl.delete(t);
  }
  has(t) {
    return this.Vl.has(t);
  }
  Er(t, e) {
    this.Sr || (this.fl = [this.R.Hi(t, e, 1, { depth: !1 }), this.R.Hi(t, e, 1, { depth: !1 })], this.Sr = !0);
  }
  su(t, e, i, s, r) {
    this.fl[0].width === s && this.fl[0].height === r || (this.fl[0].resize(s, r), this.fl[1].resize(s, r)), this.wl(t, e, i, s, r, this.fl);
  }
  wl(t, e, i, s, r, h) {
    if (i.length === 0) return void this.eu(t, e, s, r);
    this.eu(t, h[0], s, r);
    let a = 0;
    for (let l = 0; l < i.length; l++) {
      const u = i[l], c = l === i.length - 1, f = a === 0 ? 1 : 0, g = c ? e : h[f];
      this.iu(u, h[a], g, s, r), c || (a = f);
    }
  }
  iu(t, e, i, s, r) {
    const h = this.Vl.get(t.name);
    if (!h) return console.warn(`[textmode.js] Unknown filter: "${t.name}". Skipping.`), void this.eu(e.textures[0], i, s, r);
    const a = this.ru(t.name, h, s, r), l = { renderer: this.R, gl: this.R.context, width: s, height: r };
    i.begin(), this.R.xi(a), a.gt({ u_texture: e.textures[0] });
    const u = h.createUniforms(t.params, l);
    a.gt(u), this.R.Ei(0, 0, s, r), i.end();
  }
  ru(t, e, i, s) {
    let r = this.Jl.get(t);
    if (!r && e) {
      const h = { renderer: this.R, gl: this.R.context, width: i, height: s };
      r = e.createShader(h), this.Jl.set(t, r);
    }
    return r;
  }
  eu(t, e, i, s) {
    e.begin(), this.R.xi(this.Ke), this.Ke.gt({ u_texture: t, u_resolution: [i, s] }), this.R.Ei(0, 0, i, s), e.end();
  }
  vn(t, e) {
    this.fl && (this.fl[0].resize(t, e), this.fl[1].resize(t, e));
  }
  Ss() {
    for (const t of this.Jl.values()) t.dispose();
    this.Jl.clear(), this.Vl.clear(), this.Ke.dispose(), this.fl && (this.fl[0].dispose(), this.fl[1].dispose()), this.Sr = !1;
  }
  tu() {
    this.register("invert", `#version 300 es
precision highp float;uniform sampler2D u_texture;in vec2 v_uv;out vec4 fragColor;void main(){vec4 A=texture(u_texture,v_uv);fragColor=vec4(1.-A.rgb,A.a);}`, {}), this.register("grayscale", `#version 300 es
precision highp float;uniform sampler2D u_texture;uniform float U8;in vec2 v_uv;out vec4 fragColor;void main(){vec4 A=texture(u_texture,v_uv);float B=dot(A.rgb,vec3(0.299,0.587,0.114));vec3 C=mix(A.rgb,vec3(B),U8);fragColor=vec4(C,A.a);}`, { U8: ["amount", 1] }), this.register("sepia", `#version 300 es
precision highp float;uniform sampler2D u_texture;uniform float U8;in vec2 v_uv;out vec4 fragColor;void main(){vec4 A=texture(u_texture,v_uv);vec3 B;B.r=dot(A.rgb,vec3(0.393,0.769,0.189));B.g=dot(A.rgb,vec3(0.349,0.686,0.168));B.b=dot(A.rgb,vec3(0.272,0.534,0.131));vec3 C=mix(A.rgb,B,U8);fragColor=vec4(C,A.a);}`, { U8: ["amount", 1] }), this.register("threshold", `#version 300 es
precision highp float;uniform sampler2D u_texture;uniform float Uc;in vec2 v_uv;out vec4 fragColor;void main(){vec4 A=texture(u_texture,v_uv);float B=dot(A.rgb,vec3(0.299,0.587,0.114));float C=step(Uc,B);fragColor=vec4(vec3(C),A.a);}`, { Uc: ["threshold", 0.5] });
  }
}
const ni = Object.freeze(Object.defineProperty({ __proto__: null, TextmodeFilterManager: ee }, Symbol.toStringTag, { value: "Module" }));
class ie {
  constructor(t, e) {
    o(this, "za");
    o(this, "R");
    o(this, "nu");
    o(this, "hu");
    o(this, "ou");
    o(this, "au");
    o(this, "Zl", !1);
    o(this, "cu", /* @__PURE__ */ new Set());
    o(this, "lu", []);
    o(this, "uu");
    o(this, "fu");
    this.za = t, this.R = t.R, this.hu = new ee(this.R), this.nu = new te(this.R, this.za.Xr.width, this.za.Xr.height), this.ou = new ti({ onRemove: (i) => this.za.yl.rc(i), onDispose: (i) => i == null ? void 0 : i.Ss() }), this.au = new ot(this.R, { visible: !0, opacity: 1, fontSize: e.fontSize, fontSource: e.fontSource });
  }
  async Er() {
    await this.du(this.au);
    const t = this.za.Xr;
    this.uu = this.R.Hi(t.width, t.height, 1), this.fu = this.R.Hi(t.width, t.height, 1), this.hu.Er(t.width, t.height), await this.ou.initialize((e) => this.du(e)), this.Zl = !0;
  }
  pu(t, e) {
    this.lu.push({ name: t, params: e });
  }
  vu() {
    this.lu = [];
  }
  add(t = {}) {
    const e = new ot(this.R, t);
    return this.ou.isReady && this.du(e), this.ou.add(e), e;
  }
  remove(t) {
    this.ou.remove(t);
  }
  move(t, e) {
    this.ou.move(t, e);
  }
  swap(t, e) {
    this.ou.swap(t, e);
  }
  clear() {
    this.ou.clear();
  }
  gu(t) {
    this.za.yl.tc(), this.au.Da(this.za, this.za.Hl);
    const e = [...this.R.state.canvasBackgroundColor];
    this.ou.all.forEach((i) => i.Da(this.za, this.za.Hl)), this.mu(t, e);
  }
  _u() {
    this.gu(this.uu);
    let t = this.uu.textures[0];
    if (this.lu.length > 0) {
      const i = this.za.Xr;
      this.hu.su(this.uu.textures[0], this.fu, this.lu, i.width, i.height), t = this.fu.textures[0], this.lu = [];
    }
    const e = this.za.Xr;
    this.R.xe(0, 0, 0, 0), this.R.xi(this.za.Bl), this.za.Bl.gt({ u_texture: t }), this.R.Ei(0, 0, e.width, e.height), this.za.yl.ec();
  }
  mu(t, e) {
    const i = this.za.Xr, s = this.au.grid, r = this.au.texture;
    if (!r) return;
    const h = { layer: this.au, texture: r, width: s.width, height: s.height, offsetX: s.offsetX + this.au.el, offsetY: s.offsetY + this.au.il }, a = this.ou.all.filter((l) => !!l.grid && !!l.texture).map((l) => {
      const u = l.grid;
      return { layer: l, texture: l.texture, width: u.width, height: u.height, offsetX: u.offsetX + l.el, offsetY: u.offsetY + l.il };
    });
    this.nu.Nl({ base: h, layers: a, targetFramebuffer: t, backgroundColor: e, canvasWidth: i.width, canvasHeight: i.height });
  }
  vn() {
    var e, i, s;
    if (!this.Zl) return;
    const t = this.za.Xr;
    this.au.vn(), this.ou.all.forEach((r) => r.vn()), this.nu.vn(t.width, t.height), (e = this.uu) == null || e.resize(t.width, t.height), (i = this.fu) == null || i.resize(t.width, t.height), (s = this.hu) == null || s.vn(t.width, t.height);
  }
  Ss() {
    var t, e;
    this.ou.dispose(), this.za.yl.rc(this.au), this.au.Ss(), this.hu.Ss(), this.nu.Ss(), (t = this.uu) == null || t.dispose(), (e = this.fu) == null || e.dispose(), this.lu = [];
  }
  get all() {
    return this.ou.all;
  }
  get base() {
    return this.au;
  }
  get filters() {
    return this.hu;
  }
  get resultFramebuffer() {
    return this.fu;
  }
  yu() {
    const t = this.ou.all;
    for (let e = t.length - 1; e >= 0; e--) {
      const i = t[e];
      if (i.tl && i.grid) return i.grid;
    }
    return this.au.grid;
  }
  Au(t) {
    this.cu.add(t);
  }
  wu() {
    for (const t of this.cu) t();
  }
  async du(t) {
    var i;
    const e = { renderer: this.R, canvas: this.za.Xr, filterManager: this.hu, createFramebuffer: (s, r, h = 1, a) => this.R.Hi(s, r, h, a) };
    await t.ml(e), (i = t.grid) == null || i.Vr(() => this.wu());
  }
}
const ei = { id: "brightness", createShader: ({ gl: n }) => new K(n, ht, `#version 300 es
precision highp float;in vec2 v_uv;uniform sampler2D u_image;uniform bool u_invert;uniform bool u_flipX;uniform bool u_flipY;uniform float u_charRotation;uniform bool u_charColorFixed;uniform vec4 u_charColor;uniform bool u_cellColorFixed;uniform vec4 u_cellColor;uniform vec4 u_backgroundColor;uniform int u_charCount;uniform vec3 u_charList[255];layout(location=0)out vec4 o_character;layout(location=1)out vec4 o_primaryColor;layout(location=2)out vec4 o_secondaryColor;layout(location=3)out vec4 A;float B(vec3 C){return dot(C,vec3(0.299f,0.587f,0.114f));}void main(){vec2 D=vec2(v_uv.x,1.0f-v_uv.y);vec4 E=texture(u_image,D);float F=B(E.rgb);vec2 G=vec2(0.);if(u_charCount>0){float H=float(u_charCount);float I=clamp(F*(H-1.0f),0.0f,H-1.0f);int J=int(floor(I+0.5f));vec3 K=u_charList[J];G=K.xy;}else{G=vec2(0.0f,0.0f);}vec4 L=u_charColorFixed?u_charColor:E;vec4 M=u_cellColorFixed?u_cellColor:E;if(E.a<0.01f){discard;}o_primaryColor=vec4(L.rgb,L.a);o_secondaryColor=vec4(M.rgb,M.a);A=vec4(0.);int N=int(u_invert?1:0);int O=int(u_flipX?1:0);int P=int(u_flipY?1:0);float Q=float(N|(O<<1)|(P<<2))/255.;o_character=vec4(G,Q,clamp(u_charRotation,0.0f,1.0f));}`), createUniforms: ({ source: n }) => n.createBaseConversionUniforms() };
class se {
  constructor() {
    o(this, "bu", /* @__PURE__ */ new Map());
    o(this, "Jl", /* @__PURE__ */ new Map());
    this.Cu();
  }
  register(t) {
    this.bu.set(t.id, t);
  }
  unregister(t) {
    const e = this.Jl.get(t);
    return e && (e.dispose(), this.Jl.delete(t)), this.bu.delete(t);
  }
  has(t) {
    return this.bu.has(t);
  }
  Qn(t) {
    return this.bu.get(t);
  }
  jn(t, e) {
    let i = this.Jl.get(t);
    if (!i) {
      const s = this.bu.get(t);
      if (!s) throw Error(`[textmode.js] Conversion mode "${t}" is not registered.`);
      i = s.createShader(e), this.Jl.set(t, i);
    }
    return i;
  }
  Ss() {
    for (const t of this.Jl.values()) t.dispose();
    this.Jl.clear(), this.bu.clear();
  }
  Cu() {
    this.register(ei);
  }
}
const hi = Object.freeze(Object.defineProperty({ __proto__: null, TextmodeConversionManager: se }, Symbol.toStringTag, { value: "Module" }));
class ii extends function(e, ...i) {
  return i.reduce((s, r) => r(s), e);
}(class {
}, We, Ve, Ze, Qe, $e) {
  constructor(e = {}) {
    super();
    o(this, "R");
    o(this, "Hl");
    o(this, "Bl");
    o(this, "Xr");
    o(this, "Ra");
    o(this, "Co");
    o(this, "La");
    o(this, "Oa");
    o(this, "xu");
    o(this, "Mu");
    o(this, "Al");
    o(this, "En");
    o(this, "Fu", /* @__PURE__ */ new Set());
    o(this, "yl");
    o(this, "$u", !1);
    o(this, "Pu", !1);
    o(this, "Tu", !1);
    o(this, "Su", !1);
    o(this, "Eu", () => {
    });
    o(this, "ku", () => {
    });
    o(this, "Ru");
    o(this, "Du");
    o(this, "Lu");
    o(this, "rn", !1);
    o(this, "Ou");
    o(this, "zu");
    this.yl = new jt(this), this.rn = e.overlay ?? !1, this.Xr = new He(e), this.R = new Fe(this.Xr.gn()), this.Hl = this.R.Mi(W, `#version 300 es
precision highp float;uniform sampler2D u_characterTexture;uniform vec2 u_charsetDimensions;uniform sampler2D Ud;uniform sampler2D Ue;uniform sampler2D Uf;uniform vec2 Ug;uniform vec2 Uh;uniform vec4 Ui;in vec2 v_uv;out vec4 fragColor;mat2 A(float B){float C=sin(B);float D=cos(B);return mat2(D,-C,C,D);}void main(){vec2 E=gl_FragCoord.xy/Uh;vec2 F=E*Ug;vec2 G=floor(F);vec2 H=(G+0.5)/Ug;vec4 I=texture(Ud,H);vec4 J=texture(Ue,H);vec4 K=texture(Uf,H);int L=int(K.b*255.+0.5);bool M=(L&1)!=0;bool N=(L&2)!=0;bool O=(L&4)!=0;int P=int(K.r*255.+0.5)+int(K.g*255.+0.5)*256;int Q=int(u_charsetDimensions.x);int R=P/Q;int S=P-(R*Q);float T=(u_charsetDimensions.y-1.)-float(R);vec2 U=1./u_charsetDimensions;vec2 V=vec2(float(S),T)*U;vec2 W=V+U;float X=-K.a*360.*0.017453292;vec2 Y=fract(F)-0.5f;vec2 Z=vec2(N?-1.:1.,O?-1.:1.);Y*=Z;Y=A(X)*Y+0.5;vec2 a=V+clamp(Y,0.,1.)*U;const float b=0.0001;if(any(lessThan(a,V-b))||any(greaterThan(a,W+b))){fragColor=M?I:J;return;}vec4 c=texture(u_characterTexture,a);if(M)c.rgb=mix(c.rgb,1.-c.rgb,float(M));vec4 d=mix(Ui,J,J.a);fragColor=mix(d,I,c);}`), this.Bl = this.R.Mi(W, Kt), this.Ra = new Nt(e.frameRate ?? 60), this.xu = new Jt(this, e.loadingScreen, this.Xr.pn()), this.xu.Ol(() => {
      this.Ra.gh = 0, this.Su = !0;
    }), this.Mu = new ie(this, e);
    const i = () => this.Hu();
    this.Co = new kt(this.Xr, i), this.La = new Gt(this.Xr, i, this.Co), this.Oa = new Ht(), this.En = new se(), this.yl.Wa(e.plugins ?? []), this.xu.rh(), this.Bu();
  }
  ka(e) {
    var i;
    this.Fu.add(e), (i = e.C) == null || i.call(e, () => {
      this.Fu.delete(e);
    });
  }
  async Bu() {
    await this.Mu.Er(), await this.xu.Er();
    const e = this.Mu.base.grid;
    this.Mu.Au(() => {
      this.Co.Zh(), this.La.Zh();
    }), this.rn && (this.Ou = V.Nn(this.R, this.En, this.Xr.targetCanvas, e.cols, e.rows)), this.Iu(), this.Ra.rh(() => this.Da());
    try {
      await this.yl.oc(), await this.Eu(), await this.yl.cc(), this.xu.Ic();
    } catch (i) {
      console.error("Error during setup:", i), this.xu.error(i);
    }
  }
  Iu() {
    this.Ru = () => {
      this.rn && this.resizeCanvas(this.Xr.targetCanvas.width, this.Xr.targetCanvas.height), this.ku();
    }, window.addEventListener("resize", this.Ru), this.Co.Gh(), this.La.Gh(), this.Oa.Gh(), this.Du = () => {
      this.Oa.bo();
    }, window.addEventListener("blur", this.Du), this.rn && (this.Lu = new ResizeObserver(() => {
      this.resizeCanvas(this.Xr.targetCanvas.width, this.Xr.targetCanvas.height);
    }), this.Lu.observe(this.Xr.targetCanvas));
  }
  Da() {
    if (!this.xu.Oc && this.Su) {
      this.Pu = !0;
      try {
        this.Ra.uh(), this.Ra.mh(), this.rn && rt(this.R.context, this.Ou.texture, this.Xr.targetCanvas), this.Mu._u();
      } finally {
        this.Pu = !1, this.$u && !this.Tu && this.Gu();
      }
    }
  }
  resizeCanvas(e, i) {
    var s;
    this.Xr.vn(e, i), this.xu.Il(this.Xr.pn()), this.xu.vn(), (s = this.Mu) == null || s.vn(), this.R.Gi(), this.Da();
  }
  destroy() {
    this.Tu || this.$u || (this.$u = !0, this.Ra.hh(), this.Pu || this.Gu());
  }
  Gu() {
    var e, i, s, r;
    this.$u = !1, this.Xr.Ss(), this.xu.Ss(), this.yl.lc(), window.removeEventListener("resize", this.Ru), window.removeEventListener("blur", this.Du), (e = this.Lu) == null || e.disconnect(), this.Co.Wh(), this.La.Wh(), this.Oa.Wh(), (i = this.Mu) == null || i.Ss(), (s = this.En) == null || s.Ss();
    for (const h of this.Fu) h.dispose();
    this.Fu.clear(), this.Hl.dispose(), this.Bl.dispose(), this.R.Ss(), (r = this.Ou) == null || r.dispose(), this.Tu = !0;
  }
  filter(e, i) {
    this.Mu.pu(e, i);
  }
  draw(e) {
    this.Mu.base.draw(e);
  }
  async loadFont(e, i = !0) {
    if (i) return await this.Mu.base.loadFont(e), this.Mu.base.font;
    if (e instanceof Y) return e.Gr || await e.Er(), e;
    const s = new Y(this.R);
    return await s.Er(e), this.ka(s), s;
  }
  fontSize(e) {
    return this.Mu.base.fontSize(e);
  }
  inputGrid(e) {
    return e === void 0 ? this.zu ?? "topmost" : e === "topmost" ? (this.zu = void 0, this.Co.Zh(), void this.La.Zh()) : (this.zu = e, this.Co.Zh(), void this.La.Zh());
  }
  Hu() {
    return this.zu ? this.zu : this.Mu.yu();
  }
  async setup(e) {
    this.Eu = e;
  }
  windowResized(e) {
    this.ku = e;
  }
  get grid() {
    var e;
    return ((e = this.Al) == null ? void 0 : e.grid) ?? this.Mu.base.grid;
  }
  get font() {
    var e;
    return ((e = this.Al) == null ? void 0 : e.font) ?? this.Mu.base.font;
  }
  get width() {
    return this.Xr.width;
  }
  get height() {
    return this.Xr.height;
  }
  get canvas() {
    return this.Xr.canvas;
  }
  get isDisposed() {
    return this.Tu;
  }
  get overlay() {
    return this.Ou;
  }
  get loading() {
    return this.xu;
  }
  get layers() {
    return this.Mu;
  }
  get filters() {
    return this.Mu.filters;
  }
  get conversions() {
    return this.En;
  }
  get isRenderingFrame() {
    return this.Pu;
  }
}
class Et {
  constructor() {
  }
  static create(t = {}) {
    return new ii(t);
  }
  static setErrorLevel(t) {
    At._(t);
  }
  static get version() {
    return "0.9.0-beta.8";
  }
}
const oi = Object.freeze(Object.defineProperty({ __proto__: null, LoadingPhase: qt, LoadingPhaseTracker: Wt, LoadingScreenManager: Jt, LoadingScreenStateMachine: Vt, LoadingScreenTransition: Zt, resolveColorInputs: $t, resolveDefaultPalette: Qt, resolveTheme: yt }, Symbol.toStringTag, { value: "Module" })), ai = Object.freeze(Object.defineProperty({ __proto__: null, TextmodeFont: Y, TextmodeImage: V, TextmodeSource: xt, TextmodeTexture: Z, TextmodeVideo: ut }, Symbol.toStringTag, { value: "Module" })), li = Object.freeze(Object.defineProperty({ __proto__: null, keyboard: je, mouse: Ge, touch: Ke }, Symbol.toStringTag, { value: "Module" })), ci = Object.freeze(Object.defineProperty({ __proto__: null, LayerCompositor: te, TextmodeLayer: ot, TextmodeLayerManager: ie }, Symbol.toStringTag, { value: "Module" })), ui = Et.create, fi = Et.setErrorLevel, di = Et.version;
export {
  He as TextmodeCanvas,
  x as TextmodeColor,
  S as TextmodeError,
  ae as TextmodeErrorLevel,
  vt as TextmodeFramebuffer,
  Ye as TextmodeGrid,
  K as TextmodeShader,
  ii as Textmodifier,
  hi as conversion,
  ui as create,
  ni as filters,
  li as input,
  ci as layering,
  ai as loadables,
  oi as loading,
  ri as plugins,
  fi as setErrorLevel,
  Et as textmode,
  di as version
};
