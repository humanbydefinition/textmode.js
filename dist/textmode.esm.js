var ne = Object.defineProperty;
var he = (n, t, e) => t in n ? ne(n, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : n[t] = e;
var o = (n, t, e) => he(n, typeof t != "symbol" ? t + "" : t, e);
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
var oe = ((n) => (n[n.SILENT = 0] = "SILENT", n[n.WARNING = 1] = "WARNING", n[n.ERROR = 2] = "ERROR", n[n.THROW = 3] = "THROW", n))(oe || {});
const N = class N {
  constructor() {
    o(this, "l", { globalLevel: 3 });
  }
  static u() {
    return N.o || (N.o = new N()), N.o;
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
o(N, "o", null);
let vt = N;
const wt = vt.u();
class lt {
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
function X(n) {
  return n * (Math.PI / 180);
}
function it(n) {
  return n * (180 / Math.PI);
}
function xt(n, t, e, i) {
  return it(Math.atan2(i - t, e - n));
}
function K(n, t, e, i) {
  return Math.hypot(e - n, i - t);
}
function L(n, t, e) {
  return Math.min(Math.max(n, t), e);
}
function Pt(n) {
  return (n % 360 + 360) % 360 / 360;
}
function Ct(n, t) {
  n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL, 1), n.texImage2D(n.TEXTURE_2D, 0, n.RGBA, n.RGBA, n.UNSIGNED_BYTE, t);
}
function ht(n, t, e) {
  n.bindTexture(n.TEXTURE_2D, t), Ct(n, e), n.bindTexture(n.TEXTURE_2D, null);
}
function bt(n, t, e = n.NEAREST, i = n.NEAREST, s = n.CLAMP_TO_EDGE, r = n.CLAMP_TO_EDGE) {
  const h = function(l, u, f = l.NEAREST, p = l.NEAREST, m = l.CLAMP_TO_EDGE, g = l.CLAMP_TO_EDGE) {
    const d = l.createTexture();
    return l.bindTexture(l.TEXTURE_2D, d), St(l, f, p, m, g), Ct(l, u), l.bindTexture(l.TEXTURE_2D, null), d;
  }(n, t, e, i, s, r), { width: a, height: c } = function(l) {
    let u = 0, f = 0;
    return l instanceof HTMLVideoElement ? (u = l.videoWidth, f = l.videoHeight) : l instanceof HTMLImageElement ? (u = l.naturalWidth, f = l.naturalHeight) : l instanceof HTMLCanvasElement && (u = l.width, f = l.height), { width: u, height: f };
  }(t);
  return { texture: h, width: a, height: c };
}
function St(n, t, e, i, s) {
  n.texParameteri(n.TEXTURE_2D, n.TEXTURE_MIN_FILTER, t), n.texParameteri(n.TEXTURE_2D, n.TEXTURE_MAG_FILTER, e), n.texParameteri(n.TEXTURE_2D, n.TEXTURE_WRAP_S, i), n.texParameteri(n.TEXTURE_2D, n.TEXTURE_WRAP_T, s);
}
function Q(n, t, e, i, s, r = 0, h = WebGL2RenderingContext.FLOAT, a = !1) {
  n.enableVertexAttribArray(t), n.vertexAttribPointer(t, e, h, a, i, s), n.vertexAttribDivisor(t, r);
}
function Ot(n, t, e, i, s) {
  n.bindBuffer(t, e), n.bufferData(t, i, s), n.bindBuffer(t, null);
}
class st extends lt {
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
    o(this, "L", null);
    o(this, "D", /* @__PURE__ */ new Map());
    this.M = i, this.F = s, this.$ = e, this.k = L(r, 1, 8), this.R = a, this.l = { filter: "nearest", wrap: "clamp", format: "rgba", type: "unsigned_byte", depth: !0, ...h };
    const c = e.getParameter(e.MAX_DRAW_BUFFERS), l = e.getParameter(e.MAX_COLOR_ATTACHMENTS);
    this.k = Math.min(this.k, c, l), this.P = e.createFramebuffer(), this.O(), this.H(), this.l.depth && this.I();
  }
  O() {
    const e = this.$, i = this.l.filter === "linear" ? e.LINEAR : e.NEAREST, s = this.l.wrap === "repeat" ? e.REPEAT : e.CLAMP_TO_EDGE;
    for (let r = 0; r < this.k; r++) {
      const h = e.createTexture();
      e.bindTexture(e.TEXTURE_2D, h), St(e, i, i, s, s), this.G(h, !1), this.S.push(h);
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
    ht(this.$, this.S[0], e);
  }
  resize(e, i) {
    this.M = e, this.F = i, this.D.clear();
    const s = this.$;
    for (const r of this.S) this.G(r, !0);
    s.bindTexture(s.TEXTURE_2D, null), this.j(), this.L = null;
  }
  readPixels(e) {
    const i = this.D.get(e);
    if (i) return i;
    const s = this.$, r = this.M, h = this.F, a = new Uint8Array(r * h * 4), c = s.getParameter(s.READ_FRAMEBUFFER_BINDING);
    s.bindFramebuffer(s.READ_FRAMEBUFFER, this.P), s.readBuffer(s.COLOR_ATTACHMENT0 + e), s.readPixels(0, 0, r, h, s.RGBA, s.UNSIGNED_BYTE, a), s.bindFramebuffer(s.READ_FRAMEBUFFER, c);
    const l = 4 * r, u = new Uint8Array(a.length);
    for (let f = 0; f < h; f++) {
      const p = (h - 1 - f) * l, m = f * l;
      u.set(a.subarray(p, p + l), m);
    }
    return this.D.set(e, u), u;
  }
  begin() {
    const e = this.$;
    this.D.clear(), this.R.X(), this.R.Y(this.P, this.M, this.F, this.k), this.l.depth && e.clear(e.DEPTH_BUFFER_BIT), this.R.state.K();
  }
  end() {
    this.R.state.W(), this.R.Z(), this.R.q();
  }
  V() {
    return this.L || this.J(), this.L;
  }
  J() {
    if (!this.R) return;
    const e = this.k > 1, i = this.k > 2, s = this.k > 3, r = { U0: this.S[0], U1: e ? this.S[1] : this.S[0], U2: i ? this.S[2] : this.S[0], U3: s ? this.S[3] : this.S[0], U4: [this.M, this.F], U5: e, U6: i, U7: s }, h = this.R.materialManager.tt;
    this.L = this.R.materialManager.st(h, r);
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
function k(n) {
  return typeof n == "object" && n !== null && "textures" in n && Array.isArray(n.textures);
}
function Ut(n) {
  if (typeof n == "number" || typeof n == "boolean") return !0;
  if (Array.isArray(n)) {
    if (n.length === 0) return !0;
    const t = n[0];
    return typeof t == "number" || !!Array.isArray(t);
  }
  return n instanceof Float32Array || n instanceof Int32Array || !!k(n) || typeof WebGLTexture < "u" && n instanceof WebGLTexture;
}
class $ extends lt {
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
    for (const [e, i] of this.nt) (i instanceof WebGLTexture || k(i)) && this.nt.delete(e);
  }
  gt(e) {
    for (const i in e) this._t(i, e[i]);
  }
  _t(e, i) {
    const s = this.it.get(e);
    if (!s) return;
    const r = this.nt.get(e);
    let h = !0;
    if (r !== void 0 && (typeof i == "number" || typeof i == "boolean" ? r === i && (h = !1) : (i instanceof WebGLTexture || k(i)) && r === i && (h = !1)), !h) return;
    typeof i == "number" || typeof i == "boolean" || i instanceof WebGLTexture || k(i) ? this.nt.set(e, i) : this.nt.delete(e);
    const a = this.rt.get(e);
    if (!a) return;
    const { type: c, size: l } = a, u = this.$;
    if (i instanceof WebGLTexture) {
      const f = this.yt(e);
      return u.uniform1i(s, f), u.activeTexture(u.TEXTURE0 + f), void u.bindTexture(u.TEXTURE_2D, i);
    }
    if (k(i)) {
      const f = this.yt(e);
      return u.uniform1i(s, f), u.activeTexture(u.TEXTURE0 + f), void u.bindTexture(u.TEXTURE_2D, i.textures[0]);
    }
    if (Ut(i), typeof i != "number") if (typeof i != "boolean") if (Array.isArray(i) && Array.isArray(i[0])) {
      const f = i.flat();
      switch (c) {
        case u.FLOAT_VEC2:
          u.uniform2fv(s, f);
          break;
        case u.FLOAT_VEC3:
          u.uniform3fv(s, f);
          break;
        case u.FLOAT_VEC4:
          u.uniform4fv(s, f);
      }
    } else {
      const f = i;
      switch (c) {
        case u.FLOAT:
          l > 1 ? u.uniform1fv(s, f) : u.uniform1f(s, f[0]);
          break;
        case u.FLOAT_VEC2:
          u.uniform2fv(s, f);
          break;
        case u.FLOAT_VEC3:
          u.uniform3fv(s, f);
          break;
        case u.FLOAT_VEC4:
          u.uniform4fv(s, f);
          break;
        case u.INT:
          l > 1 ? u.uniform1iv(s, f) : u.uniform1i(s, f[0]);
          break;
        case u.INT_VEC2:
          u.uniform2iv(s, f);
          break;
        case u.INT_VEC3:
          u.uniform3iv(s, f);
          break;
        case u.INT_VEC4:
          u.uniform4iv(s, f);
          break;
        case u.BOOL:
          u.uniform1iv(s, f);
          break;
        case u.FLOAT_MAT2:
          u.uniformMatrix2fv(s, !1, f);
          break;
        case u.FLOAT_MAT3:
          u.uniformMatrix3fv(s, !1, f);
          break;
        case u.FLOAT_MAT4:
          u.uniformMatrix4fv(s, !1, f);
      }
    }
    else u.uniform1i(s, i ? 1 : 0);
    else c === u.INT || c === u.BOOL ? u.uniform1i(s, i) : u.uniform1f(s, i);
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
const Bt = /* @__PURE__ */ new WeakMap();
function gt(n, t) {
  Bt.set(n, t);
}
function Lt(n) {
  return Bt.get(n);
}
function rt(n, t, e, i, s = 255) {
  n[0] = t / 255, n[1] = (e ?? t) / 255, n[2] = (i ?? t) / 255, n[3] = s / 255;
}
class ut {
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
    o(this, "Lt", 0);
    o(this, "Dt", [0, 0, 0, 1]);
    o(this, "Ot", !1);
    o(this, "Ht", []);
    o(this, "zt", []);
  }
  static Bt() {
    return { It: 1, wt: 0, bt: 0, Ct: 0, xt: 0, Mt: 0, Ft: 0, Lt: 0, Gt: !1, jt: !1, Rt: !1, Ot: !1, Qt: [0, 0, 0], Nt: "", Xt: [1, 1, 1, 1], Yt: [0, 0, 0, 1] };
  }
  Kt(t) {
    t.It = this.At, t.wt = this.wt, t.bt = this.bt, t.Ct = this.Ct, t.xt = this.xt, t.Mt = this.Mt, t.Ft = this.Ft, t.Gt = this.Et, t.jt = this.kt, t.Rt = this.Rt, t.Lt = this.Lt, t.Ot = this.Ot, t.Qt[0] = this.$t[0], t.Qt[1] = this.$t[1], t.Qt[2] = this.$t[2], t.Nt = this.Pt, t.Xt[0] = this.Tt[0], t.Xt[1] = this.Tt[1], t.Xt[2] = this.Tt[2], t.Xt[3] = this.Tt[3], t.Yt[0] = this.St[0], t.Yt[1] = this.St[1], t.Yt[2] = this.St[2], t.Yt[3] = this.St[3];
  }
  Wt(t) {
    this.At = t.It, this.wt = t.wt, this.bt = t.bt, this.Ct = t.Ct, this.xt = t.xt, this.Mt = t.Mt, this.Ft = t.Ft, this.Et = t.Gt, this.kt = t.jt, this.Rt = t.Rt, this.Lt = t.Lt, this.Ot = t.Ot, this.$t[0] = t.Qt[0], this.$t[1] = t.Qt[1], this.$t[2] = t.Qt[2], this.Pt = t.Nt, this.Tt[0] = t.Xt[0], this.Tt[1] = t.Xt[1], this.Tt[2] = t.Xt[2], this.Tt[3] = t.Xt[3], this.St[0] = t.Yt[0], this.St[1] = t.Yt[1], this.St[2] = t.Yt[2], this.St[3] = t.Yt[3];
  }
  K() {
    let t = this.zt.pop();
    t || (t = ut.Bt()), this.Kt(t), this.Ht.push(t);
  }
  W() {
    const t = this.Ht.pop();
    t ? (this.Wt(t), this.zt.push(t)) : console.warn("pop() called without matching push()");
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
    t !== 0 && (this.xt += X(t));
  }
  ts(t) {
    t !== 0 && (this.Mt += X(t));
  }
  ss(t) {
    t !== 0 && (this.Ft += X(t));
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
    rt(this.Tt, t, e, i, s);
  }
  fs(t, e, i, s = 255) {
    rt(this.St, t, e, i, s);
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
    this.Lt = Pt(t);
  }
  _s(t, e, i, s) {
    rt(this.Dt, t, e, i, s);
  }
  As(t) {
    this.Ot = t;
  }
  get canvasBackgroundColor() {
    return this.Dt;
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
    return this.Lt;
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
const At = new Float32Array([-0.5, -0.5, 0, 0, 0.5, -0.5, 1, 0, -0.5, 0.5, 0, 1, -0.5, 0.5, 0, 1, 0.5, -0.5, 1, 0, 0.5, 0.5, 1, 1]), Y = { ws: 16, bs: WebGL2RenderingContext.TRIANGLES, Cs: { Ms: { size: 2, offset: 0 }, Fs: { size: 2, offset: 8 } } };
class ae {
  constructor(t) {
    o(this, "$");
    o(this, "$s");
    o(this, "Ps");
    this.$ = t, this.$s = t.createBuffer(), this.Ps = new Float32Array(At.length);
  }
  Ts(t, e, i, s) {
    const r = this.$, h = Lt(this.$), a = h[2], c = h[3], l = t / a * 2 - 1, u = (t + i) / a * 2 - 1, f = 1 - (e + s) / c * 2, p = 1 - e / c * 2, m = At, g = this.Ps;
    for (let d = 0; d < m.length; d += 4) {
      const A = m[d], v = m[d + 1], w = m[d + 2], y = m[d + 3], R = l + (A + 0.5) * (u - l), b = f + (v + 0.5) * (p - f);
      g[d] = R, g[d + 1] = b, g[d + 2] = w, g[d + 3] = y;
    }
    r.bindBuffer(r.ARRAY_BUFFER, this.$s), r.bufferData(r.ARRAY_BUFFER, g, r.DYNAMIC_DRAW), Q(r, 0, 2, 16, 0), Q(r, 1, 2, 16, 8), r.drawArrays(r.TRIANGLES, 0, 6), r.disableVertexAttribArray(1), r.disableVertexAttribArray(0), r.bindBuffer(r.ARRAY_BUFFER, null);
  }
  Ss() {
    this.$.deleteBuffer(this.$s);
  }
}
var x = ((n) => (n.RECTANGLE = "rectangle", n.LINE = "line", n.ELLIPSE = "ellipse", n.ARC = "arc", n.TRIANGLE = "triangle", n.BEZIER_CURVE = "bezier_curve", n))(x || {});
const ce = { rectangle: 2, line: 2, ellipse: 2, triangle: 2, arc: 3, bezier_curve: 4 };
class le {
  constructor(t) {
    o(this, "$");
    o(this, "Es", /* @__PURE__ */ new Map());
    o(this, "ks", null);
    this.$ = t;
  }
  Rs(t, e, i, s) {
    const r = this.$, h = t.program;
    let a = this.Es.get(t);
    a || (a = /* @__PURE__ */ new Map(), this.Es.set(t, a), t.C(() => this.Ls(t)));
    let c = a.get(e) || null;
    if (c) this.ks !== c && (r.bindVertexArray(c), this.ks = c);
    else {
      c = r.createVertexArray(), a.set(e, c), r.bindVertexArray(c), this.ks = c, r.bindBuffer(r.ARRAY_BUFFER, s);
      const l = r.getAttribLocation(h, "A0");
      l !== -1 && Q(r, l, i.Cs.Ms.size, i.ws, i.Cs.Ms.offset, 0, r.FLOAT, !1);
      const u = r.getAttribLocation(h, "A1");
      u !== -1 && Q(r, u, i.Cs.Fs.size, i.ws, i.Cs.Fs.offset, 0, r.FLOAT, !1);
    }
  }
  Ls(t) {
    const e = this.Es.get(t);
    if (e) {
      for (const [, i] of e) i && this.$.deleteVertexArray(i);
      this.Es.delete(t);
    }
  }
  Ds() {
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
class ot {
}
o(ot, "STRIDE", U.BYTES_PER_INSTANCE), o(ot, "ATTRIBUTES", { A2: O(2, 0), A3: O(2, 8), A4: O(3, 16), A5: O(4, 28), A6: O(4, 44), A7: O(4, 60), A8: O(3, 76), A9: O(3, 88), Aa: O(4, 100), Ab: O(4, 116), Ac: O(3, 132) });
class ue {
  constructor(t = 1e3, e = 1.5) {
    o(this, "Os");
    o(this, "Hs");
    o(this, "zs");
    o(this, "Bs", 0);
    o(this, "Is", 0);
    this.Hs = t, this.zs = e;
    const i = t * U.FLOATS_PER_INSTANCE;
    this.Os = new Float32Array(i);
  }
  Gs(t) {
    if (t <= this.Hs) return;
    const e = Math.ceil(t * this.zs), i = this.Hs;
    this.Hs = e;
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
    return this.Hs;
  }
  get Ks() {
    return this.Bs;
  }
  get Ws() {
    return this.Is === 0;
  }
}
class fe {
  constructor(t) {
    o(this, "Os");
    this.Os = t;
  }
  Zs(t) {
    this.Os.Is >= this.Os.Hs && this.Os.Gs(this.Os.Is + 1);
    const e = this.Os.Os, i = this.Os.Bs;
    e[i + 0] = t.x, e[i + 1] = t.y, e[i + 2] = t.width, e[i + 3] = t.height, e[i + 4] = t.char0, e[i + 5] = t.char1, e[i + 6] = t.char2, e[i + 7] = t.r1, e[i + 8] = t.g1, e[i + 9] = t.b1, e[i + 10] = t.a1, e[i + 11] = t.r2, e[i + 12] = t.g2, e[i + 13] = t.b2, e[i + 14] = t.a2, e[i + 15] = t.invert, e[i + 16] = t.flipX, e[i + 17] = t.flipY, e[i + 18] = t.charRot, e[i + 19] = t.translationX, e[i + 20] = t.translationY, e[i + 21] = t.translationZ, e[i + 22] = t.rotationX, e[i + 23] = t.rotationY, e[i + 24] = t.rotationZ;
    const s = t.curveParams0, r = t.curveParams1;
    return e[i + 25] = s[0], e[i + 26] = s[1], e[i + 27] = s[2], e[i + 28] = s[3], e[i + 29] = r[0], e[i + 30] = r[1], e[i + 31] = r[2], e[i + 32] = r[3], e[i + 33] = t.depth, e[i + 34] = t.baseZ, e[i + 35] = t.geometryType, this.Os.js(U.FLOATS_PER_INSTANCE), this.Os.Is - 1;
  }
  get Xs() {
    return this.Os.Xs;
  }
}
class de {
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
    Ot(e, e.ARRAY_BUFFER, this.qs, i, e.DYNAMIC_DRAW), this.Vs = t;
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
      for (const s in ot.ATTRIBUTES) {
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
      const a = ot.ATTRIBUTES[r];
      a && Q(e, h, a.size, a.stride, a.offset, a.divisor, a.type, a.normalized);
    }
    this.se.set(i, this.te);
  }
  Ss() {
    this.qs && (this.$.deleteBuffer(this.qs), this.qs = null);
  }
}
class ge {
  constructor(t, e = 1e3, i = 1.5) {
    o(this, "$");
    o(this, "Os");
    o(this, "oe");
    o(this, "ae");
    this.$ = t, this.Os = new ue(e, i), this.oe = new fe(this.Os), this.ae = new de(t, e);
  }
  ce(t) {
    var r, h, a, c, l, u, f, p, m, g;
    const e = this.Os;
    e.Is >= e.Hs && e.Gs(e.Is + 1);
    const i = e.Os, s = e.Bs;
    return i[s + 0] = t.Ms[0], i[s + 1] = t.Ms[1], i[s + 2] = t.le[0], i[s + 3] = t.le[1], i[s + 4] = t.Qt[0], i[s + 5] = t.Qt[1], i[s + 6] = t.Qt[2], i[s + 7] = t.Xt[0], i[s + 8] = t.Xt[1], i[s + 9] = t.Xt[2], i[s + 10] = t.Xt[3], i[s + 11] = t.Yt[0], i[s + 12] = t.Yt[1], i[s + 13] = t.Yt[2], i[s + 14] = t.Yt[3], i[s + 15] = t.ue[0], i[s + 16] = t.ue[1], i[s + 17] = t.ue[2], i[s + 18] = t.Lt, i[s + 19] = ((r = t.fe) == null ? void 0 : r[0]) ?? 0, i[s + 20] = ((h = t.fe) == null ? void 0 : h[1]) ?? 0, i[s + 21] = ((a = t.fe) == null ? void 0 : a[2]) ?? 0, i[s + 22] = ((c = t.de) == null ? void 0 : c[0]) ?? 0, i[s + 23] = ((l = t.de) == null ? void 0 : l[1]) ?? 0, i[s + 24] = ((u = t.de) == null ? void 0 : u[2]) ?? 0, t.pe && t.ve ? (i[s + 25] = ((f = t.ge) == null ? void 0 : f[0]) ?? 0, i[s + 26] = ((p = t.ge) == null ? void 0 : p[1]) ?? 0, i[s + 27] = ((m = t.me) == null ? void 0 : m[0]) ?? 0, i[s + 28] = ((g = t.me) == null ? void 0 : g[1]) ?? 0, i[s + 29] = t.pe[0], i[s + 30] = t.pe[1], i[s + 31] = t.ve[0], i[s + 32] = t.ve[1]) : t._e ? (i[s + 25] = t._e[0], i[s + 26] = t._e[1], i[s + 27] = 0, i[s + 28] = 0, i[s + 29] = 0, i[s + 30] = 0, i[s + 31] = 0, i[s + 32] = 0) : (i[s + 25] = 0, i[s + 26] = 0, i[s + 27] = 0, i[s + 28] = 0, i[s + 29] = 0, i[s + 30] = 0, i[s + 31] = 0, i[s + 32] = 0), i[s + 33] = t.ye || 0, i[s + 34] = t.Ae || 0, i[s + 35] = t.we || 0, e.js(U.FLOATS_PER_INSTANCE), e.Is - 1;
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
    Ot(this.$, this.$.ARRAY_BUFFER, a, this.$e.ke, this.$.STATIC_DRAW), this.Pe = a;
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
  Le() {
    return !this.Me.Ws;
  }
  Ss() {
    this.Me.Ss(), this.$.deleteBuffer(this.Pe);
  }
  De(t, e, i) {
    return this.Me.ce(t);
  }
  Oe(t, e, i, s, r, h) {
    const a = r.wt ?? 0, c = r.bt ?? 0, l = r.Ct ?? 0, u = r.xt ?? 0, f = r.Mt ?? 0, p = r.Ft ?? 0, m = this.Te, g = this.Se;
    m[0] = 0, m[1] = 0, m[2] = 0, m[3] = 0, g[0] = 0, g[1] = 0, g[2] = 0, g[3] = 0, h && (h.bezStartX !== void 0 && h.bezStartY !== void 0 && h.bezEndX !== void 0 && h.bezEndY !== void 0 ? (m[0] = h.cp1x ?? 0, m[1] = h.cp1y ?? 0, m[2] = h.cp2x ?? 0, m[3] = h.cp2y ?? 0, g[0] = h.bezStartX ?? 0, g[1] = h.bezStartY ?? 0, g[2] = h.bezEndX ?? 0, g[3] = h.bezEndY ?? 0) : h.arcStart === void 0 && h.arcStop === void 0 || (m[0] = h.arcStart ?? 0, m[1] = h.arcStop ?? 0));
    const d = this.Ee;
    return d.x = t, d.y = e, d.width = i, d.height = s, d.char0 = r.Qt[0], d.char1 = r.Qt[1], d.char2 = r.Qt[2], d.r1 = r.Xt[0], d.g1 = r.Xt[1], d.b1 = r.Xt[2], d.a1 = r.Xt[3], d.r2 = r.Yt[0], d.g2 = r.Yt[1], d.b2 = r.Yt[2], d.a2 = r.Yt[3], d.invert = r.Rt ? 1 : 0, d.flipX = r.Gt ? 1 : 0, d.flipY = r.jt ? 1 : 0, d.charRot = r.Lt, d.translationX = a, d.translationY = c, d.translationZ = l, d.rotationX = u, d.rotationY = f, d.rotationZ = p, d.depth = (h == null ? void 0 : h.depth) ?? 0, d.baseZ = (h == null ? void 0 : h.baseZ) ?? 0, d.geometryType = ce[this.Fe] ?? 0, this.Me.writer.Zs(d);
  }
}
const pe = { ke: At, He: 6, ...Y }, me = { ke: new Float32Array([0, -0.5, 0, 0, 1, -0.5, 1, 0, 0, 0.5, 0, 1, 0, 0.5, 0, 1, 1, -0.5, 1, 0, 1, 0.5, 1, 1]), He: 6, ...Y }, ve = { ke: function(n = 32) {
  const t = [], e = 2 * Math.PI / n;
  for (let i = 0; i < n; i++) {
    const s = i * e, r = (i + 1) % n * e, h = Math.cos(s), a = Math.sin(s), c = 0.5 * (h + 1), l = 0.5 * (a + 1), u = Math.cos(r), f = Math.sin(r), p = 0.5 * (u + 1), m = 0.5 * (f + 1);
    t.push(0, 0, 0.5, 0.5, h, a, c, l, u, f, p, m);
  }
  return new Float32Array(t);
}(32), He: 96, ...Y };
let Ae = { ke: function(n) {
  const t = [];
  for (let e = 0; e < n; e++) {
    const i = e / n, s = (e + 1) / n;
    t.push(i, 0, i, 0, i, 1, i, 1, s, 1, s, 1);
  }
  return new Float32Array(t);
}(32), He: 96, ...Y };
const ye = { ke: new Float32Array([0, 0, 0, 0, 1, 0, 1, 0, 0.5, 1, 0.5, 1]), He: 3, ...Y }, we = { ke: function(n = 16) {
  const t = [];
  for (let e = 0; e < n; e++) {
    const i = e / n, s = (e + 1) / n;
    t.push(i, -0.5, i, 0, s, -0.5, s, 0, i, 0.5, i, 1, i, 0.5, i, 1, s, -0.5, s, 0, s, 0.5, s, 1);
  }
  return new Float32Array(t);
}(16), He: 96, ...Y }, be = { [x.RECTANGLE]: class extends z {
  constructor(n, t) {
    super(n, t, x.RECTANGLE, pe);
  }
  ce(n, t) {
    return this.Oe(0, 0, n.width, n.height, t);
  }
}, [x.LINE]: class extends z {
  constructor(n, t) {
    super(n, t, x.LINE, me);
  }
  ce(n, t) {
    const e = n.x2 - n.x1, i = n.y2 - n.y1, s = Math.hypot(e, i), r = Math.atan2(i, e), h = t.It || 1, a = Math.cos(-r), c = Math.sin(-r), l = n.x1 * a - n.y1 * c, u = n.x1 * c + n.y1 * a, f = { ...t, Ft: (t.Ft || 0) + r };
    return this.Oe(l, u, s, h, f);
  }
}, [x.ELLIPSE]: class extends z {
  constructor(n, t) {
    super(n, t, x.ELLIPSE, ve);
  }
  ce(n, t) {
    return this.Oe(0, 0, n.width, n.height, t);
  }
}, [x.ARC]: class extends z {
  constructor(n, t) {
    super(n, t, x.ARC, Ae);
  }
  ce(n, t) {
    const e = X(n.start), i = X(n.stop);
    return this.Oe(0, 0, n.width, n.height, t, { arcStart: e, arcStop: i });
  }
}, [x.TRIANGLE]: class extends z {
  constructor(n, t) {
    super(n, t, x.TRIANGLE, ye);
  }
  ce(n, t) {
    const e = Math.min(n.x1, n.x2, n.x3), i = Math.max(n.x1, n.x2, n.x3), s = Math.min(n.y1, n.y2, n.y3), r = i - e, h = Math.max(n.y1, n.y2, n.y3) - s;
    return this.Oe(e, s, r, h, t);
  }
}, [x.BEZIER_CURVE]: class extends z {
  constructor(n, t) {
    super(n, t, x.BEZIER_CURVE, we);
  }
  ce(n, t) {
    return this.Oe(0, 0, 1, t.It || 1, t, { cp1x: n.cp1x, cp1y: n.cp1y, cp2x: n.cp2x, cp2y: n.cp2y, bezStartX: n.x1, bezStartY: n.y1, bezEndX: n.x2, bezEndY: n.y2 });
  }
} };
class Ee {
  constructor(t) {
    o(this, "$");
    o(this, "ze");
    o(this, "Be");
    o(this, "Ie", null);
    o(this, "Ge", /* @__PURE__ */ new Map());
    o(this, "je", null);
    this.$ = t, this.Be = new le(t), this.ze = /* @__PURE__ */ new Map();
    for (const e of Object.values(x)) {
      const i = new ge(t), s = new be[e](t, i);
      this.ze.set(e, s);
    }
  }
  Qe(t) {
    this.Ie = null, this.Ge.clear(), this.je = null;
    let e = null, i = null, s = null, r = !1;
    for (const h of t) e === h.material && i === h.type && r === h.state.Ot || (s && s.Le() && this.Ne(s, e, i, r), e = h.material, i = h.type, s = this.ze.get(i), r = h.state.Ot, s.Re()), s.ce(h.params, h.state);
    s && s.Le() && this.Ne(s, e, i, r), this.Be.Ds();
  }
  Ne(t, e, i, s) {
    if (this.Ie !== e.shader && (e.shader.dt(), this.Ie = e.shader), this.je !== e && (e.shader.gt(e.uniforms), this.je = e), this.Ge.get(e.shader) !== s) {
      const a = Lt(this.$);
      e.shader.gt({ Ur: a[2] / a[3], Us: [a[2], a[3]], Ut: 1, Uu: s ? 1 : 0 }), this.Ge.set(e.shader, s);
    }
    const r = t.unitGeometry, h = t.unitBuffer;
    try {
      this.Be.Rs(e.shader, i + "", r, h), t.batch.he(e.shader), t.batch.Ts(r.bs, r.He);
    } finally {
      t.Re();
    }
  }
  Ss() {
    for (const t of this.ze.values()) t.Ss();
    this.ze.clear(), this.Be.Ss();
  }
}
function _t(n) {
  let t = 0;
  for (let e = 0; e < n.length; e++)
    t = (t << 5) - t + n.charCodeAt(e), t &= t;
  return t;
}
const Rt = /* @__PURE__ */ new WeakMap();
let xe = 1;
function Tt(n) {
  if (n == null) return 0;
  if (typeof n != "object" && typeof n != "function") return _t(n + "");
  let t = Rt.get(n);
  return t || (t = xe++, Rt.set(n, t)), t;
}
function j(n, t) {
  return (n << 5) - n + t;
}
const at = `#version 300 es
in vec2 A0;in vec2 A1;in vec2 A2;in vec2 A3;in vec3 A4;in vec4 A5;in vec4 A6;in vec4 A7;in vec3 A8;in vec3 A9;in vec4 Aa;in vec4 Ab;in vec3 Ac;uniform vec2 Us;uniform float Ut;uniform float Uu;out vec2 v_uv;out vec3 v_glyphIndex;out vec4 v_glyphColor;out vec4 v_cellColor;out vec4 v_glyphFlags;out vec3 v_worldPosition;out vec3 v_normal;out float v_geometryType;const float A=6.28318530718f;const int B=2;const int C=3;const int D=4;vec2 E(float F,vec2 G,vec2 H,vec2 I,vec2 J){float K=1.0f-F;float L=K*K;float M=L*K;float N=F*F;float O=N*F;return M*G+3.0f*L*F*H+3.0f*K*N*I+O*J;}vec2 P(float F,vec2 G,vec2 H,vec2 I,vec2 J){float K=1.0f-F;float L=K*K;float N=F*F;return-3.0f*L*G+3.0f*(L-2.0f*K*F)*H+3.0f*(2.0f*K*F-N)*I+3.0f*N*J;}vec3 Q(vec3 R,float S){float T=cos(S);float U=sin(S);return vec3(R.x,R.y*T-R.z*U,R.y*U+R.z*T);}vec3 V(vec3 R,float S){float T=cos(S);float U=sin(S);return vec3(R.x*T+R.z*U,R.y,-R.x*U+R.z*T);}vec3 W(vec3 R,float S){float T=cos(S);float U=sin(S);return vec3(R.x*T-R.y*U,R.x*U+R.y*T,R.z);}vec3 X(vec3 R,vec3 Y){vec3 Z=R;if(Y.z!=0.0f){Z=W(Z,Y.z);}if(Y.y!=0.0f){Z=V(Z,Y.y);}if(Y.x!=0.0f){Z=Q(Z,Y.x);}return Z;}void main(){v_uv=A1;v_glyphIndex=A4;v_glyphColor=A5;v_cellColor=A6;v_glyphFlags=A7;vec4 a=Aa;vec4 b=Ab;vec2 c=A3;vec2 d=A2;float e=Ac.x;float f=Ac.y;int g=int(Ac.z);vec2 h=d;vec2 i=h+c*0.5f;float j=f+e*0.5f;vec3 k=vec3(i,j);vec3 l;if(g==D){float F=clamp(A0.x,0.0f,1.0f);vec2 G=b.xy;vec2 H=a.xy;vec2 I=a.zw;vec2 J=b.zw;vec2 m=E(F,G,H,I,J);vec2 n=P(F,G,H,I,J);float o=length(n);vec2 p=o>0.0f?n/o:vec2(1.0f,0.0f);vec2 q=vec2(-p.y,p.x);vec2 r=m;vec2 s=r+q*A0.y*c.y;l=vec3(s,f);}else if(g==C){float t=mod(a.x,A);if(t<0.0f){t+=A;}float u=mod(a.y,A);if(u<0.0f){u+=A;}float v=t-u;if(v<=0.0f){v+=A;}float S=t-A0.x*v;vec2 w=vec2(cos(S),sin(S))*A0.y;vec2 s=w*c+h;l=vec3(s,f);}else if(g==B){vec2 s=A0.xy*c+h;l=vec3(s,f);}vec3 x=X(l,A9);vec3 y=x+A8;vec3 z=vec3(0.0f,0.0f,1.0f);v_worldPosition=y;v_normal=z;v_geometryType=float(g);vec2 AA=((y.xy)/Us)*2.0f;AA.y=-AA.y;float AB=y.z/Us.y;float AC=clamp(-AB*Ut,-0.99f,0.99f);if(Uu>0.5f){gl_Position=vec4(AA,AC,1.0f);}else{float AD=0.5f;float AE=1.0f/(1.0f-AB*AD);AA*=AE;gl_Position=vec4(AA,AC,1.0f);}}`;
class Re {
  constructor(t) {
    o(this, "Xe", 0);
    o(this, "Ye");
    o(this, "Ke");
    o(this, "We");
    o(this, "Ze", /* @__PURE__ */ new Map());
    this.Ye = new $(t, at, `#version 300 es
precision highp float;in vec3 v_glyphIndex;in vec4 v_glyphColor;in vec4 v_cellColor;in vec4 v_glyphFlags;layout(location=0)out vec4 o_character;layout(location=1)out vec4 o_primaryColor;layout(location=2)out vec4 o_secondaryColor;layout(location=3)out vec4 A;void main(){int B=int(v_glyphFlags.r>0.5?1:0);int C=int(v_glyphFlags.g>0.5?1:0);int D=int(v_glyphFlags.b>0.5?1:0);float E=float(B|(C<<1)|(D<<2))/255.;o_character=vec4(v_glyphIndex.xy,E,clamp(v_glyphFlags.a,0.,1.));o_primaryColor=vec4(v_glyphColor.rgb,v_glyphColor.a);o_secondaryColor=vec4(v_cellColor.rgb,v_cellColor.a);A=vec4(0.);}`), this.Ke = new $(t, at, `#version 300 es
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
    const i = Tt(t.program), s = function(r, h) {
      let a = 0;
      const c = Object.keys(r).sort();
      for (const l of c) a = j(a, _t(l)), a = j(a, h(r[l]));
      return a;
    }(e, this.Je.bind(this));
    return j(i, s);
  }
  Je(t) {
    return typeof t == "number" || typeof t == "boolean" ? function(e) {
      return typeof e == "boolean" ? e ? 1 : 0 : Math.floor(e);
    }(t) : Array.isArray(t) ? function(e) {
      let i = 0;
      const s = Array.isArray(e[0]) ? e.flat() : e;
      for (const r of s) i = j(i, typeof r == "number" ? r : 0);
      return i;
    }(t) : t instanceof Float32Array || t instanceof Int32Array ? function(e) {
      let i = 0;
      const s = Math.min(e.length, 16);
      for (let r = 0; r < s; r++) i = j(i, e[r]);
      return i;
    }(t) : t instanceof WebGLTexture || k(t) ? Tt(t) : 0;
  }
  Ss() {
    this.Ye.dispose(), this.Ke.dispose(), this.Ze.clear();
  }
}
class Te {
  constructor() {
    o(this, "ti", []);
    o(this, "si", 1);
    o(this, "le", 0);
  }
  ei(t, e) {
    if (this.le >= this.ti.length) {
      const s = { id: this.si++, type: t, params: {}, state: ut.Bt(), material: e };
      this.ti.push(s);
    }
    const i = this.ti[this.le];
    return i.id = this.si++, i.type = t, i.material = e, this.le++, i;
  }
  ii(t, e, i) {
    const s = this.ei(x.RECTANGLE, i), r = s.params;
    return r.width = t.width, r.height = t.height, e.Zt(s.state), s.id;
  }
  ri(t, e, i) {
    const s = this.ei(x.LINE, i), r = s.params;
    return r.x1 = t.x1, r.y1 = t.y1, r.x2 = t.x2, r.y2 = t.y2, r.thickness = t.thickness, e.Zt(s.state), s.id;
  }
  ni(t, e, i) {
    const s = this.ei(x.ELLIPSE, i), r = s.params;
    return r.width = t.width, r.height = t.height, r.startAngle = t.startAngle, r.endAngle = t.endAngle, r.segments = t.segments, e.Zt(s.state), s.id;
  }
  hi(t, e, i) {
    const s = this.ei(x.ARC, i), r = s.params;
    return r.width = t.width, r.height = t.height, r.start = t.start, r.stop = t.stop, e.Zt(s.state), s.id;
  }
  oi(t, e, i) {
    const s = this.ei(x.TRIANGLE, i), r = s.params;
    return r.x1 = t.x1, r.y1 = t.y1, r.x2 = t.x2, r.y2 = t.y2, r.x3 = t.x3, r.y3 = t.y3, e.Zt(s.state), s.id;
  }
  ai(t, e, i) {
    const s = this.ei(x.BEZIER_CURVE, i), r = s.params;
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
class Me {
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
    o(this, "Ci", !0);
    o(this, "xi", !0);
    o(this, "Mi", !1);
    o(this, "Fi", new Float32Array(4));
    o(this, "$i", /* @__PURE__ */ new Set());
    this.$ = t, t.enable(t.DEPTH_TEST), t.depthFunc(t.LEQUAL), t.clearDepth(1), t.depthMask(!0), this.Ci = !0, this.xi = !0, t.disable(t.CULL_FACE), this.ui = new ut(), this.li = new Re(t), this.fi = new Te(), this.ci = new Ee(t), this.di = new ae(t);
    const e = [0, 0, t.canvas.width, t.canvas.height];
    gt(t, e), this.mi.push(null), this._i.push(e), this.yi.push(1), this.Ai = null, this.wi = e, this.bi = 1;
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
    this.wi[0] === h[0] && this.wi[1] === h[1] && this.wi[2] === h[2] && this.wi[3] === h[3] || (r.viewport(...h), gt(r, h), this.wi = h);
  }
  Pi(t) {
    this.Ie !== t && (this.Ie = t, t.dt());
  }
  Ti(t) {
    if (this.Mi = t, t) this.$i.clear();
    else {
      for (const e of this.$i) e.Si();
      this.$i.clear();
    }
  }
  Ei() {
    return this.Mi;
  }
  ki(t, e) {
    return new $(this.$, t, e);
  }
  Ri(t) {
    this.pi = t, t && (this.gi = {});
  }
  Li() {
    this.pi = null, this.gi = {};
  }
  _t(t, e) {
    this.gi[t] = e;
  }
  gt(t) {
    Object.assign(this.gi, t);
  }
  Di(t) {
    return new $(this.$, at, t);
  }
  Oi(t, e, i, s) {
    t instanceof st || !s || t.Hi(s);
    const r = t.V();
    this.fi.ii({ width: e ?? t.width, height: i ?? t.height }, this.ui, r), t instanceof st || !t.zi() || this.$i.add(t);
  }
  Bi(t, e, i, s) {
    this.di.Ts(t, e, i, s);
  }
  Ii(t, e) {
    if (this.pi) {
      const i = this.li.st(this.pi, this.gi);
      this.fi.ii({ width: t, height: e }, this.ui, i);
    } else this.fi.ii({ width: t, height: e }, this.ui, this.li.Ve);
  }
  Gi(t, e, i, s) {
    this.fi.ri({ x1: t, y1: e, x2: i, y2: s }, this.ui, this.li.Ve);
  }
  ji(t, e) {
    this.fi.ni({ width: t, height: e }, this.ui, this.li.Ve);
  }
  Qi(t, e, i, s, r, h) {
    this.fi.oi({ x1: t, y1: e, x2: i, y2: s, x3: r, y3: h }, this.ui, this.li.Ve);
  }
  Ni(t, e, i, s, r, h, a, c) {
    this.fi.ai({ x1: t, y1: e, cp1x: i, cp1y: s, cp2x: r, cp2y: h, x2: a, y2: c }, this.ui, this.li.Ve);
  }
  Xi(t, e, i, s) {
    this.fi.hi({ width: t, height: e, start: i, stop: s }, this.ui, this.li.Ve);
  }
  Yi(t, e, i = 1, s = {}) {
    return new st(this.$, t, e, i, s, this);
  }
  Ki(t, e = t, i = t, s = 255) {
    this.ui._s(t, e ?? t, i ?? t, s);
    const [r, h, a, c] = this.ui.canvasBackgroundColor;
    this.Wi(r, h, a, c, !1);
  }
  xe(t = 0, e = 0, i = 0, s = 0) {
    this.Wi(t, e, i, s, !0);
  }
  Wi(t, e, i, s, r) {
    const h = this.$, a = this.Fi;
    if (this.bi > 1) {
      a[0] = r ? 1 : 0, a[1] = r ? 1 : 0, a[2] = 0, a[3] = 0, h.clearBufferfv(h.COLOR, 0, a), a[0] = 0, a[1] = 0, a[2] = 0, a[3] = 0, h.clearBufferfv(h.COLOR, 1, a), this.bi >= 3 && (a[0] = t, a[1] = e, a[2] = i, a[3] = s, h.clearBufferfv(h.COLOR, 2, a)), this.bi >= 3 && (a[0] = 0, a[1] = 0, a[2] = 0, a[3] = 0);
      for (let c = 3; c < this.bi; c++) h.clearBufferfv(h.COLOR, c, a);
    } else h.clearColor(t, e, i, s), h.clear(h.COLOR_BUFFER_BIT);
  }
  Zi() {
    const t = [0, 0, this.$.canvas.width, this.$.canvas.height];
    this.$.viewport(...t), gt(this.$, t), this.wi = t, this._i.length > 0 && (this._i[0] = t);
  }
  qi(t) {
    this.Ci !== t && (t ? this.$.enable(this.$.DEPTH_TEST) : this.$.disable(this.$.DEPTH_TEST), this.Ci = t);
  }
  Vi(t) {
    this.xi !== t && (this.$.depthMask(t), this.xi = t);
  }
  Ji() {
    return this.Ci;
  }
  tr() {
    return this.xi;
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
function J(n) {
  return n + 3 & -4;
}
function tt(n, t, e) {
  n[t] = e >>> 8 & 255, n[t + 1] = 255 & e;
}
function _(n, t, e) {
  n[t] = e >>> 24 & 255, n[t + 1] = e >>> 16 & 255, n[t + 2] = e >>> 8 & 255, n[t + 3] = 255 & e;
}
function Fe(n, t, e) {
  for (let i = 0; i < e.length; i++) n[t + i] = 255 & e.charCodeAt(i);
}
function pt(n, t, e) {
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
    const c = n[a];
    if (!c) continue;
    const l = s[c]++;
    let u = h.get(c);
    u || (u = [], h.set(c, u)), u[Ce(l, c)] = a;
  }
  return { min: t, max: e, table: h };
}
function mt(n, t) {
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
function Ce(n, t) {
  let e = 0;
  for (let i = 0; i < t; i++) e = e << 1 | 1 & n, n >>>= 1;
  return e >>> 0;
}
function Se(n) {
  if (n.length < 2) throw Error("ZLIB data too short");
  const t = n[0], e = n[1];
  if ((15 & t) != 8) throw Error("Unsupported ZLIB compression method");
  if (((t << 8) + e) % 31 != 0) throw Error("Bad ZLIB header check");
  let i = 2;
  32 & e && (i += 4);
  const s = [];
  return function(r, h) {
    const a = [3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258], c = [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0], l = [1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577], u = [0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13];
    let f = 0;
    for (; !f; ) {
      f = r.readBits(1);
      const p = r.readBits(2);
      if (p === 0) {
        r.alignToByte();
        const m = r.readBits(16);
        if ((65535 & (65535 ^ m)) !== r.readBits(16)) throw Error("DEFLATE uncompressed LEN/NLEN mismatch");
        for (let g = 0; g < m; g++) h.push(r.readBits(8));
      } else {
        if (p !== 1 && p !== 2) throw Error("Unsupported DEFLATE type");
        {
          let m, g;
          if (p === 1) {
            const d = Array(288).fill(0);
            for (let A = 0; A <= 143; A++) d[A] = 8;
            for (let A = 144; A <= 255; A++) d[A] = 9;
            for (let A = 256; A <= 279; A++) d[A] = 7;
            for (let A = 280; A <= 287; A++) d[A] = 8;
            m = G(d), g = G(Array(32).fill(5));
          } else {
            const d = r.readBits(5) + 257, A = r.readBits(5) + 1, v = r.readBits(4) + 4, w = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15], y = Array(19).fill(0);
            for (let T = 0; T < v; T++) y[w[T]] = r.readBits(3);
            const R = G(y), b = [];
            for (; b.length < d + A; ) {
              const T = mt(r, R);
              if (T <= 15) b.push(T);
              else if (T === 16) {
                const B = r.readBits(2) + 3, P = b[b.length - 1] || 0;
                for (let W = 0; W < B; W++) b.push(P);
              } else if (T === 17) {
                const B = r.readBits(3) + 3;
                for (let P = 0; P < B; P++) b.push(0);
              } else {
                if (T !== 18) throw Error("Invalid code length symbol");
                {
                  const B = r.readBits(7) + 11;
                  for (let P = 0; P < B; P++) b.push(0);
                }
              }
            }
            const F = b.slice(0, d), C = b.slice(d, d + A);
            m = G(F), g = G(C);
          }
          for (; ; ) {
            const d = mt(r, m);
            if (d < 256) h.push(d);
            else {
              if (d === 256) break;
              if (d > 256 && d < 286) {
                const A = d - 257;
                let v = a[A];
                const w = c[A];
                w && (v += r.readBits(w));
                const y = mt(r, g);
                if (y >= 30) throw Error("Invalid distance symbol");
                let R = l[y];
                const b = u[y];
                b && (R += r.readBits(b));
                const F = h.length - R;
                if (F < 0) throw Error("Invalid distance");
                for (let C = 0; C < v; C++) h.push(h[F + C] || 0);
              } else if (d === 286 || d === 287) throw Error("Reserved length symbol");
            }
          }
        }
      }
    }
  }(new Pe(n.subarray(i)), s), new Uint8Array(s);
}
function Oe(n) {
  const t = M, e = new Uint8Array(n);
  if (t.readASCII(e, 0, 4) !== "wOFF") throw Error("Invalid WOFF signature");
  const i = t.readUint(e, 4), s = t.readUshort(e, 12), r = t.readUint(e, 16), h = [];
  let a = 44;
  for (let v = 0; v < s; v++) {
    const w = t.readASCII(e, a, 4), y = t.readUint(e, a + 4), R = t.readUint(e, a + 8), b = t.readUint(e, a + 12), F = t.readUint(e, a + 16);
    h.push({ tag: w, offset: y, compLength: R, origLength: b, checksum: F }), a += 20;
  }
  for (const v of h) {
    const w = new Uint8Array(e.buffer, v.offset, v.compLength);
    if (v.compLength === v.origLength) v.data = new Uint8Array(w);
    else if (v.data = Se(w), v.data.length !== v.origLength) if (v.data.length < v.origLength) {
      const y = new Uint8Array(v.origLength);
      y.set(v.data), v.data = y;
    } else v.data = v.data.subarray(0, v.origLength);
  }
  const c = s;
  let l = 1, u = 0;
  for (; l << 1 <= c; ) l <<= 1, u++;
  const f = 16 * l, p = 16 * c - f;
  let m = 12 + 16 * c;
  const g = {};
  for (const v of h) g[v.tag] = m, m = J(m + v.data.length);
  const d = new Uint8Array(Math.max(r || 0, m));
  _(d, 0, i), tt(d, 4, c), tt(d, 6, f), tt(d, 8, u), tt(d, 10, p);
  let A = 12;
  for (const v of h) {
    Fe(d, A, v.tag), A += 4;
    const w = v.data;
    if (v.tag === "head" && w.length >= 12) {
      const y = new Uint8Array(w);
      _(y, 8, 0), _(d, A, pt(y, 0, J(y.length))), A += 4;
    } else
      _(d, A, pt(w, 0, J(w.length))), A += 4;
    _(d, A, g[v.tag]), A += 4, _(d, A, v.data.length), A += 4;
  }
  for (const v of h) {
    const w = g[v.tag];
    d.set(v.data, w);
  }
  if (h.find((v) => v.tag === "head")) {
    const v = g.head, w = function(y, R) {
      const b = R + 8, F = [y[b], y[b + 1], y[b + 2], y[b + 3]];
      _(y, b, 0);
      const C = 2981146554 - (pt(y, 0, J(y.length)) >>> 0) >>> 0;
      return y[b] = F[0], y[b + 1] = F[1], y[b + 2] = F[2], y[b + 3] = F[3], C >>> 0;
    }(d, v);
    _(d, v + 8, w);
  }
  return d.buffer;
}
const Ue = { parseTab(n, t, e) {
  const i = { tables: [], ids: {}, off: t };
  n = new Uint8Array(n.buffer, t, e), t = 0;
  const s = M, r = s.readUshort;
  r(n, t);
  const h = r(n, t += 2);
  t += 2;
  const a = [];
  for (let c = 0; c < h; c++) {
    const l = r(n, t), u = r(n, t += 2);
    t += 2;
    const f = s.readUint(n, t);
    t += 4;
    const p = `p${l}e${u}`;
    let m = a.indexOf(f);
    if (m === -1) {
      let g;
      m = i.tables.length, a.push(f);
      const d = r(n, f);
      g = d === 4 ? this.parse4(n, f) : d === 12 ? this.parse12(n, f) : { format: d }, i.tables.push(g);
    }
    i.ids[p] = m;
  }
  return i;
}, parse4(n, t) {
  const e = M, i = e.readUshort, s = e.readUshorts, r = t, h = i(n, t += 2);
  i(n, t += 2);
  const a = i(n, t += 2) >>> 1, c = { format: 4, searchRange: i(n, t += 2), entrySelector: 0, rangeShift: 0, endCount: [], startCount: [], idDelta: [], idRangeOffset: [], glyphIdArray: [] };
  t += 2, c.entrySelector = i(n, t), t += 2, c.rangeShift = i(n, t), t += 2, c.endCount = s(n, t, a), t += 2 * a, t += 2, c.startCount = s(n, t, a), t += 2 * a;
  for (let l = 0; l < a; l++) c.idDelta.push(e.readShort(n, t)), t += 2;
  return c.idRangeOffset = s(n, t, a), t += 2 * a, c.glyphIdArray = s(n, t, r + h - t >> 1), c;
}, parse12(n, t) {
  const e = M.readUint;
  e(n, t += 4), e(n, t += 4);
  const i = e(n, t += 4);
  t += 4;
  const s = new Uint32Array(3 * i);
  for (let r = 0; r < 3 * i; r += 3) s[r] = e(n, t + (r << 2)), s[r + 1] = e(n, t + (r << 2) + 4), s[r + 2] = e(n, t + (r << 2) + 8);
  return { format: 12, groups: s };
} }, Be = { parseTab(n, t, e) {
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
  const c = i.readShort(n, t);
  return t += 2, t += 6, { unitsPerEm: s, xMin: r, yMin: h, xMax: a, yMax: c, indexToLocFormat: i.readShort(n, t) };
} }, Le = { parseTab(n, t, e) {
  const i = M;
  t += 4;
  const s = i.readShort, r = i.readUshort;
  return { ascender: s(n, t), descender: s(n, t + 2), lineGap: s(n, t + 4), advanceWidthMax: r(n, t + 6), minLeftSideBearing: s(n, t + 8), minRightSideBearing: s(n, t + 10), xMaxExtent: s(n, t + 12), caretSlopeRise: s(n, t + 14), caretSlopeRun: s(n, t + 16), caretOffset: s(n, t + 18), res0: s(n, t + 20), res1: s(n, t + 22), res2: s(n, t + 24), res3: s(n, t + 26), metricDataFormat: s(n, t + 28), numberOfHMetrics: r(n, t + 30) };
} }, _e = { parseTab(n, t, e, i) {
  const s = M, r = [], h = [], a = i.maxp.numGlyphs, c = i.hhea.numberOfHMetrics;
  let l = 0, u = 0, f = 0;
  for (; f < c; ) l = s.readUshort(n, t + (f << 2)), u = s.readShort(n, t + (f << 2) + 2), r.push(l), h.push(u), f++;
  for (; f < a; ) r.push(l), h.push(u), f++;
  return { aWidth: r, lsBearing: h };
} }, Mt = { cmap: Ue, head: Be, hhea: Le, maxp: { parseTab(n, t, e) {
  const i = M;
  return i.readUint(n, t), t += 4, { numGlyphs: i.readUshort(n, t) };
} }, hmtx: _e, loca: { parseTab(n, t, e, i) {
  const s = M, r = [], h = i.head.indexToLocFormat, a = i.maxp.numGlyphs + 1;
  if (h === 0) for (let c = 0; c < a; c++) r.push(s.readUshort(n, t + (c << 1)) << 1);
  else if (h === 1) for (let c = 0; c < a; c++) r.push(s.readUint(n, t + (c << 2)));
  return r;
} }, glyf: { parseTab(n, t, e, i) {
  const s = [], r = i.maxp.numGlyphs;
  for (let h = 0; h < r; h++) s.push(null);
  return s;
}, sr(n, t) {
  const e = M, i = n.er, s = n.loca;
  if (s[t] === s[t + 1]) return null;
  const r = ft.findTable(i, "glyf", n.ir);
  if (!r) return null;
  let h = r[0] + s[t];
  const a = {};
  if (a.noc = e.readShort(i, h), h += 2, a.xMin = e.readShort(i, h), h += 2, a.yMin = e.readShort(i, h), h += 2, a.xMax = e.readShort(i, h), h += 2, a.yMax = e.readShort(i, h), h += 2, a.xMin >= a.xMax || a.yMin >= a.yMax) return null;
  if (a.noc > 0) {
    a.endPts = [];
    for (let p = 0; p < a.noc; p++) a.endPts.push(e.readUshort(i, h)), h += 2;
    const c = e.readUshort(i, h);
    if (h += 2, i.length - h < c) return null;
    h += c;
    const l = a.endPts[a.noc - 1] + 1;
    a.flags = [];
    for (let p = 0; p < l; p++) {
      const m = i[h];
      if (h++, a.flags.push(m), 8 & m) {
        const g = i[h];
        h++;
        for (let d = 0; d < g; d++) a.flags.push(m), p++;
      }
    }
    a.xs = [];
    for (let p = 0; p < l; p++) {
      const m = a.flags[p], g = !!(16 & m);
      2 & m ? (a.xs.push(g ? i[h] : -i[h]), h++) : g ? a.xs.push(0) : (a.xs.push(e.readShort(i, h)), h += 2);
    }
    a.ys = [];
    for (let p = 0; p < l; p++) {
      const m = a.flags[p], g = !!(32 & m);
      4 & m ? (a.ys.push(g ? i[h] : -i[h]), h++) : g ? a.ys.push(0) : (a.ys.push(e.readShort(i, h)), h += 2);
    }
    let u = 0, f = 0;
    for (let p = 0; p < l; p++) u += a.xs[p], f += a.ys[p], a.xs[p] = u, a.ys[p] = f;
  } else a.parts = [], a.endPts = [], a.flags = [], a.xs = [], a.ys = [];
  return a;
} } }, ft = { parse(n) {
  const t = new Uint8Array(n);
  M.readASCII(t, 0, 4) === "wOFF" && (n = Oe(n));
  const e = new Uint8Array(n), i = Mt, s = {}, r = { er: e, rr: 0, ir: 0 };
  for (const h in i) {
    const a = h, c = ft.findTable(e, a, 0);
    if (c) {
      const [l, u] = c;
      let f = s[l];
      f == null && (f = i[a].parseTab(e, l, u, r), s[l] = f), Object.assign(r, { [a]: f });
    }
  }
  return [r];
}, findTable(n, t, e) {
  const i = M, s = i.readUshort(n, e + 4);
  let r = e + 12;
  for (let h = 0; h < s; h++) {
    const a = i.readASCII(n, r, 4);
    i.readUint(n, r + 4);
    const c = i.readUint(n, r + 8), l = i.readUint(n, r + 12);
    if (a === t) return [c, l];
    r += 16;
  }
  return null;
}, T: Mt, B: M };
function Nt(n, t, e) {
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
class Ne {
  nr(t) {
    var i;
    const e = [];
    return (i = t.cmap) != null && i.tables ? (t.cmap.tables.forEach((s) => {
      if (s.format === 4) {
        const r = this.hr(s);
        e.push(...r);
      } else if (s.format === 12) {
        const r = this.ar(s);
        e.push(...r);
      }
    }), [...new Set(e)]) : [];
  }
  hr(t) {
    const e = [];
    if (!(t.startCount && t.endCount && t.idRangeOffset && t.idDelta)) return e;
    for (let i = 0; i < t.startCount.length; i++) {
      const s = t.startCount[i], r = t.endCount[i];
      if (s !== 65535 || r !== 65535) for (let h = s; h <= r; h++)
        Nt(t, h, i) > 0 && this.cr(e, h);
    }
    return e;
  }
  ar(t) {
    const e = [];
    if (!t.groups) return e;
    for (let i = 0; i < t.groups.length; i += 3) {
      const s = t.groups[i], r = t.groups[i + 1], h = t.groups[i + 2];
      for (let a = s; a <= r; a++)
        h + (a - s) > 0 && this.cr(e, a);
    }
    return e;
  }
  cr(t, e) {
    try {
      const i = String.fromCodePoint(e);
      t.push(i);
    } catch {
    }
  }
}
class Ie {
  constructor(t) {
    o(this, "lr");
    o(this, "ur");
    o(this, "R");
    o(this, "P", null);
    o(this, "dr", 0);
    o(this, "pr", 0);
    this.R = t, this.lr = document.createElement("canvas"), this.ur = this.lr.getContext("2d", { willReadFrequently: !0, alpha: !0 });
  }
  vr(t, e, i, s) {
    const r = t.length;
    this.dr = Math.ceil(Math.sqrt(r)), this.pr = Math.ceil(r / this.dr);
    const h = e.width * this.dr, a = e.height * this.pr;
    this.gr(h, a), this.mr(t, e, this.dr, i, s), this.P ? this.P.width === h && this.P.height === a || this.P.resize(h, a) : this.P = this.R.Yi(h, a, 1, { filter: "nearest" }), this.P.N(this.lr);
  }
  gr(t, e) {
    this.lr.width = t, this.lr.height = e, this.lr.style.width = t + "px", this.lr.style.height = e + "px", this.ur.imageSmoothingEnabled = !1, this.lr.style.imageRendering = "pixelated", this.ur.clearRect(0, 0, t, e), this.ur.textBaseline = "top", this.ur.textAlign = "left", this.ur.fillStyle = "white";
  }
  mr(t, e, i, s, r) {
    const h = s / r.head.unitsPerEm;
    for (let a = 0; a < t.length; a++) {
      const c = a % i, l = Math.floor(a / i), u = t[a].glyphData;
      if (!u) continue;
      const f = u.advanceWidth * h, p = c * e.width, m = l * e.height, g = p + 0.5 * e.width, d = m + 0.5 * e.height, A = Math.round(g - 0.5 * e.width), v = Math.round(d - 0.5 * s), w = A + 0.5 * (e.width - f), y = v + r.hhea.ascender * h;
      this._r(u, w, y, h);
    }
  }
  _r(t, e, i, s) {
    if (!t || !t.xs || t.noc === 0) return;
    const { xs: r, ys: h, endPts: a, flags: c } = t;
    if (!(r && h && a && c)) return;
    this.ur.beginPath();
    let l = 0;
    for (let u = 0; u < a.length; u++) {
      const f = a[u];
      if (!(f < l)) {
        if (f >= l) {
          const p = e + r[l] * s, m = i - h[l] * s;
          this.ur.moveTo(p, m);
          let g = l + 1;
          for (; g <= f; )
            if (1 & c[g]) {
              const d = e + r[g] * s, A = i - h[g] * s;
              this.ur.lineTo(d, A), g++;
            } else {
              const d = e + r[g] * s, A = i - h[g] * s;
              if (g + 1 > f) {
                const w = e + r[l] * s, y = i - h[l] * s;
                if (1 & c[l]) this.ur.quadraticCurveTo(d, A, w, y);
                else {
                  const R = (d + w) / 2, b = (A + y) / 2;
                  this.ur.quadraticCurveTo(d, A, R, b);
                }
                break;
              }
              const v = g + 1;
              if (1 & c[v]) {
                const w = e + r[v] * s, y = i - h[v] * s;
                this.ur.quadraticCurveTo(d, A, w, y), g = v + 1;
              } else {
                const w = (d + (e + r[v] * s)) / 2, y = (A + (i - h[v] * s)) / 2;
                this.ur.quadraticCurveTo(d, A, w, y), g = v;
              }
            }
          this.ur.closePath();
        }
        l = f + 1;
      }
    }
    this.ur.fill();
  }
  Ss() {
    var t;
    (t = this.P) == null || t.dispose(), this.P = null;
  }
  get framebuffer() {
    return this.P;
  }
  get columns() {
    return this.dr;
  }
  get rows() {
    return this.pr;
  }
}
class It {
  yr(t, e) {
    const i = t.cmap;
    if (!i || !i.tables) return 0;
    let s = 0;
    for (const r of i.tables) if (r.format === 4 ? s = this.Ar(e, r) : r.format === 12 && (s = this.wr(e, r)), s > 0) break;
    return s;
  }
  br(t, e) {
    const i = e.codePointAt(0);
    return i === void 0 ? 0 : this.yr(t, i);
  }
  Cr(t, e) {
    const i = t.hmtx;
    return i && i.aWidth && i.aWidth.length !== 0 ? e < i.aWidth.length ? i.aWidth[e] : i.aWidth[i.aWidth.length - 1] : 0;
  }
  Mr(t, e) {
    const i = e / t.head.unitsPerEm, s = t.hhea.ascender * i, r = t.hhea.descender * i, h = t.hhea.lineGap * i;
    return { ascender: s, descender: r, lineGap: h, lineHeight: s - r + h, unitsPerEm: t.head.unitsPerEm, scale: i };
  }
  Ar(t, e) {
    const i = e.endCount.length;
    let s = -1;
    for (let r = 0; r < i; r++) if (t <= e.endCount[r]) {
      s = r;
      break;
    }
    return s === -1 || t < e.startCount[s] ? 0 : Nt(e, t, s);
  }
  wr(t, e) {
    const i = e.groups.length / 3;
    for (let s = 0; s < i; s++) {
      const r = e.groups[3 * s], h = e.groups[3 * s + 1], a = e.groups[3 * s + 2];
      if (t >= r && t <= h) return a + (t - r);
    }
    return 0;
  }
}
class De {
  constructor() {
    o(this, "Fr");
    this.Fr = new It();
  }
  $r(t, e, i) {
    let s = 0;
    const r = this.Fr.Mr(i, e), h = r.lineHeight;
    for (const a of t) {
      const c = this.Fr.br(i, a);
      if (c === 0) continue;
      const l = this.Fr.Cr(i, c) * r.scale;
      s = Math.max(s, l);
    }
    return { width: Math.ceil(s), height: Math.ceil(h) };
  }
}
class ze {
  constructor() {
    o(this, "Pr");
    this.Pr = new It();
  }
  Tr(t, e) {
    const i = [], s = /* @__PURE__ */ new Map();
    return t.forEach((r, h) => {
      const a = r.codePointAt(0) || 0, c = { character: r, unicode: a, color: this.Sr(h), glyphData: this.Er(e, r) };
      i.push(c), s.set(r, c);
    }), { array: i, map: s };
  }
  Sr(t) {
    return [t % 256 / 255, Math.floor(t / 256) % 256 / 255, 0];
  }
  Er(t, e) {
    const i = e.codePointAt(0) || 0, s = this.Pr.yr(t, i);
    if (s === 0) return null;
    const r = this.Pr.Cr(t, s), h = ft.T.glyf.sr(t, s);
    return h ? { ...h, advanceWidth: r } : null;
  }
}
class H extends lt {
  constructor(e, i = 16) {
    super();
    o(this, "kr");
    o(this, "Rr", []);
    o(this, "Lr", /* @__PURE__ */ new Map());
    o(this, "Dr", 16);
    o(this, "Or", { width: 0, height: 0 });
    o(this, "Hr");
    o(this, "zr");
    o(this, "Br");
    o(this, "Ir");
    o(this, "Gr");
    o(this, "jr", !1);
    this.Dr = i, this.zr = new Ne(), this.Br = new Ie(e), this.Ir = new De(), this.Gr = new ze();
  }
  async Qr(e) {
    if (this.jr) return;
    const i = e || "data:font/woff;base64,d09GRgABAAAAABbwAAoAAAAAfywAAQABAAAAAAAAAAAAAAAAAAAAAAAAAABjbWFwAAAA9AAAAbsAAAkgIO8lSWdseWYAAAKwAAAOfgAAaLS4ctN0aGVhZAAAETAAAAAsAAAAOCi8/PVoaGVhAAARXAAAABkAAAAkCwEFAmhtdHgAABF4AAAAhQAABAQEAIOAbG9jYQAAEgAAAAKUAAAECAAy54BtYXhwAAAUlAAAABgAAAAgASIAgm5hbWUAABSsAAAB5wAAA6RWz85KT1MvMgAAFpQAAABFAAAAYM+QEyRwb3N0AAAW3AAAABQAAAAgAGkANHja7dRPSFRRFMfx38wdXblw4cJC7M0bz60gWlULGUFctWgR0UIQQkmDyn27kpAQaaEO2jhWJuafiQFtcDJtSqGhiFZtot5x3jzEVQQhlRJcOb0khiRc1+J94R64uw8cOADCAJT/avwZAiIpRCK3/P999KAS9biOSUxhBhlksYjnWMFrvME7vMca1vEF37ANAwkNqYRKqkk1rdLqscqpVVVQryzbils3rJnocHTWPmgfso/ap+0OuysWjlXHogQKUxVVUw3VUh010DE6QXHqph7qpT66TQmaoAxlaZnyVKC39FHHdbNu0e36or6kr4r4TgsTu75HmEcOy76vUPaVsIFNbOHHX74F3/fyD9+A7ztg1//2de76rH18Z8u+AXqwx/dBN5Z9XfqKiKzLqqzIC8nLkixKThZkXuZkVh7KuNyTuzImKRmVO1KxU7ETMtvmu/lqPptPxjOuKXo3vcveYQ+l2lKlO+Im3H632z3vnis+KaaLKc7zM87yHGc4zdM8zkke5H6+xp3cwRe4jVv5DLdwE5/ik3ycj3Cdk3eWnKfOmDPqJJ3hX9sOCvpPC65QcIWCgv5pPwGY9ak7AHja3V07ryQ5FT62axjQaDWsVmiCFQJpA4QINiAgICDYgICAgICAgICAgICAgIAA//AuF9Xlsn2etqv67iIY6apv3+6yj31e33nYA95FiD4uAAHeA7jyLzoA2Paf/Lp/Dun5W8x/Be/AxyCfO79fnj+e25/ZZzlewcM+3wIhwpfwE/Sc9e8YDyLU1ycF5XUD+to+L98O/An8VKQj0lnOtYdM776OJ71fTVC8//N1rLKDGsXl863OjSl5/iyIUu0HjJ+d+uO3rX3rXd33d/DjfR0/h6/n1iK5kWf36Hf2AxpVa6zU7ZLTnt3Q3wN7+tK6MVcBjUP/3vj56diHuT3YxVbKSvl9FdJHeFE4jfmJn2DSSOS9fuJ27SH7umuoL3oLWGOLxh3f2b8bnn/5Ql8n5SEYFD33q/0lKXxwjQfDOZtGgyEz+W8X5txl2zVb9MXO2S8HfD3ncbHousP6WPV2i/R7C+c06HK5ye/lfdl3Bj5Q2qitaLYhgLQWZY+fr/65A9Ly1r10jI783HOffJWZJ6ee8uuB0nmMXeSqWvRz5Dx/tiWf7H0OF+1DuK7vhy4ffP8An/doofqbQNXTqmlNT1c0v4/Eqpy29eBMLHty0PKZoCMW6VqRlDXNwvbD4RW2MYfyjNdXV3LaJuEdKgXcHvX2nHiz27RxHmC9w/qn0AbS+mJbSeX8pO1zlbbogPK7zJxAs3iFtrV8W/LHsHVZvxJ6Rlt7gum1nvjpnHNO4gFJqaoBWOKFVwKqAangorb2j5KKvG5N31O1ownZdhcZH7FuT9nznoxRv4ylrbfvzA9D88GO8uGDtgN0/1O09ntFlv3YhbIf/ml3/dPGqvi6rCMw6jNd53PM07BnK2eCJXmnzxrruI8ObOuxmZ/dxbd5nS77U7I/xaMdLm5/DXzuLLcwXlOLIVQ0an722pou6raGnpp/QYiwR0V5nwDL0Gk/f2TSUalIGOkSvfNAcVNCesV9a2q675FtsVAk4c5GPEfZT27XVqT9PmpxXtVn0577KO3MGrkXs+xKkHZk6EMUS440uO01t+Ark8yGYYjtsleqoPQksLuF0kOd/7TtbZ3XvNalNRNLqK+90fEDTAfy1FWWOBcT9fkTmrExe+viDNccYF+JqHeIbyBtlYxhStbmSc8DSX9/rICoXkkGSMfEJR7QsYAjNlhgn6iNS7T0AtakNnvaJ+W1TeQdeIxHaHtXaMtU+GP3CL5v+2RqHfc5JC6k9DJ6HhFaHHfu9Lc1Z5HlB5JWNOc8NupiUSlpa/7NIx0W0Ra10YcOVWnDfqhodmgI1CM5nrJS1DYKlMmyeAmoZaLrQnmNSRxAV7qZ0u0sr2Q8WbzUrRivE200nZ+x371Yj+idQH+bsOAFD16woZXuheBJI85UYyA+Ht17bJsTKLHHG+tuQpJX/AGX4eu2lq+vh8gQPgaLUpk1h7fcb1SJ4LEnGb+rdUHRHw96riVV36L5EgdqHNByqCTy82hnkrSSk3k5KTNWnJZ/buTlOvQngiceAkd4OHPz0K+tdOmGUYwJht2kcuBEntSRPOmZfyc40tFqD40IQeb2goGZvKIVzW4G5DMcQ4qOY3zVRzpmo1sMg+U1VemumtLofjFeCcxqJIUnM2vJuQeCHiOOwx4ss7pF6u+PtXxmZApbjCti22JtA+hVxUw7z6Xs2sSzMkeklSLPfwalYkjjt/0bHye4gKkXeaig5MpILVRiAd1vCrtP5Aj5uaN2PF1zxrE7koOgaY2PPL9FkccCKlprUZGr+zr0tw56iCvwGBTs+MFFxVbWeTaCQTj2WCBM1NnoWNxOBpBZU8f00hPsFDr+15wPevNsJG4IN+OGwKyWzKnW8S/GDUHZOd+44SsvbDvCuhYUTQSaQSFeWtoR4Xc833VimVzRvgm58QwZFQTthQ+awgQTeuVI7gLrF638Yixi+ot4RVZ5niDPFxBediyXNj++jUWDgkU3Zc96fDKwv4iiylyA4nalMkLX9C1hf24DNNkZyNDkflOPF4BqwdYbv1vLG9VX03W96PVKiCq+A01i5utY2d9YfSMP0qvQ7eFQUHSKvNfpCl21nqNafqf1UQksqfVe1PEPPNiJpY81iZoP119ZTUHojdpseMYqec5zr/2Jgo695rmycZWzSgOpXzMpbFrHu1Zmq/xA8pX3cgEQZU1/YzaexuQbXIoxF9THdaEzz9VaE5fgNVIPR/sIS8fQyipam9JXqHdOtPEIRllqzP7Ewh9063Z2IYH+GiLNUPFXJIcEM4RYc7bEkjwQL4/1fx+aHL8/62Of5vo3y+p92QX2fh18zrNFcPX9sfZAdBDZu8vxCM4clX31Qr9RrLPkDDDau8v8LZRar2N8lSOj1NGsLJeBZam1TIuwpzwepL3CJAvyANsPnj3BAzsD3a5X6ydEaZUSs50b7g2JrYcyG2lRL+xl+jD+Gfod33w82P0FTuYREa3c70CRS82XCtxIueJHXuIMB6tMt+x7lf7m5U4tyK9L3smuLrxqDxYPI30rYzk2h2NzgPXqAvPrQdqUxvdWF2zVwDrHCq0RoI0Hcrzcn9D8BMxYEMszZBzooqa/jsTxSeTthXTm9FC2n+pYEh8uVqyL9436quMD6pnK7njZM6msy4uYsunVquBSi4clVn8gblYc96TFyF04ll2oqCB300cDIbPxrZoqXZ1DHWvNh2irrNxstSaZYa2VB333tOr9mRcx7ETmXKmSFz6GkidstKjZFE8qIX26eG8KoS/b9uij9GFOiwFIVj5NyErT8rZGstdmD4lc4/xaNevd1uwOPCLX7Ems2TTc81MrUVmzyqdOr1v1PCPat9jmQfUYJEEbzNCSse4DevSYCIXal+bDCC3I2+EeTFKd7ltnFNN0sGLIfRcGfSWKD0BPANWTQIqcNtsaAON/1A/BeywPGhybs2ZEA1sH9FbgDMpTQx5L5k4fN/RR8lBHvif2ftB7oa8isVdrdWDxp/Hp6N8MsdUgqdS0M12EZrhC7TpJZZLZOZelRdeDUyffq3s6xPhztK4Xd9h6f4pIieNu4lI/jEN1XEMjbafK6lry/jkOYedyVMyp2vaHGlM8zBjCkdi28NdrNldgLa/a0orYtN6OwoMh7vPAsxb9eNTDrOdJBWuXsb6En8Evb5yTrJw1Y1XTHnmCFNtPkhHnuN+8QwHGi3JUJf4zeaTJsBpFdnik5V4fZq510ifEHMf7M55f2fteR1DJ73gzf4vyO42Or3Z5mZcWdlY6wb3sRvd0olKfGeaCWm5yGEtDwzLH6yPS95wmcVb2BBrYzig5tGb7Bvb5fkyfvW2nRhlxF3cyz8qGOF//eVLXq7P4oQTop9UASTKPr91h1zu5wu753DbqtXUO8pOT6wzdnQfWn2X3Csr5ktxP4FUmlBHHPThBO0mQ6wTFVxbM5mPCeXWP7ha4YDf8BdvAeaGd/XntlgHlW2eMFAR2CBPYAQzPrGeVy1ieYCOQdtpXGZyss4F2rkr5W8tJh06NTd/HGi+1vbiPN6JTeSfP5k0ihAhRQwgad9wQ1dhoKAntU87DfZy/K8SuEsPg82VQRU5xUGU+ZVrp8SMYtOHiwFC+Z1jLG2dqRuhAw01cZ2qeXBk/ROjaAS1TIuKHVp+Fi5YMrHqqahlY3YbJ0E/N2uUTq/0Cvt717Vfwa/gNfAO/hd/B7+EP8Ef4E/wZ/gJ/hb/B3+Ef8E/4F/z7nla+5T+Afp1wHdQRH/F/+/lF6VrSbuP4v/18VHMVmm7q6TX/Czha0mxJrf+YyNyOfRcYeKSap3+b8UufB8GnJSdec6Iu+toF6nHkaeZxvJ5h4PVgj3ILMz5teArdxnr8/PPoCXqiuvR91zoh2pvS8b0SqUD1FLPubHPaK9Q5lU+GzwI3PgfCOsB9NORgqm5OqfVxLMd1L9+A/s2s+0/0a93MTd3NNRHapruGQLnhZTSzpBMuYFNaz7N5RffPo/MnV2zac3wfRX6Vng0As1cTmE5M38U0eS+H0rvZxXtg6460jlQTZ3Snxw+pO9TKz+mOB5vffTs6umGj+UjMb3/QKfndvlP47UsVAO9Drzo11h+T/rF09Po0st98jHsKh31Ruj2UnbYWLuEd/pM9wOwpZ+KqccfWNZsc4F6c3jtf2ou7Ca6akqXRPThzsadua+/4hq7vgmn6uqux6bXw6AjnLMJbXMM5Ixwi8mR2rc3AOfg2nrs4zZlnDFaChbCtk/bwilwMfBxc0iMYy0MX40x2o/ft9D2Znn9Kl+3MO90HUb747jnzjpyCKVeTuij6DllsctyiUzXN0dgE9We1yK54WBffFqtew9TXpbYfy7dILWH/SXxmqeg4zlvRsZfIbuFnic0SHfRtfj4vsaVq532jl/QpYBykzpe/jec7n1uOmhuETi2xzM5vfy01xQC0vkp6PiKpDd07x6qcUc719K0A1YZjpvLivftqNpzxV/tDtXPTWFrbaowzXj+czsG+nmMt/bQspzj7fnvxeeuG4O/s/Xe412VW3+5VuPT+EV97/r++14Gc3ZvQRHrXMz91IrWHZ4FnK7WOVGjJPfAO3R0BczdLKuevQd5LPVsXd/X8PK6Ll2jK0/NM7P4V1PuI51FvsEMV+KhV4T2+22IQF85a0FlLWXs/IHTOX1B5CGCeEDh6V2ZiTK+eee/dnNjOa2xXz2zndd7sq+XYEZ/Gx/exoK5PoOceWNdnef9W9KCT9EYXqkrPxuhC9GA7faMXpHef1smLTDe1qaDY1N4ozLI4fqsHlwpf+3Cu9F1E/Z4AajG3V8430/6bCdq8QQs9b4OqJyQa1+6BACWaTPI8zrROa//7QGJ19U4tHeTTtePNqu3PnVhXJFSjzZFz4eo3Ndqidi/O6J5Z7X+VsS3cYki51T35Iv+merFeuGe69cbJM3Jq1Fn4kUA5rze4o9CRs22iy5jMsYLMS8g5/wOjbDW/AAB42mNgZGBgAOIzT9tXxvPbfGVgYGEAgZokCXVkmgUizsHABFLNwAAACJYG1HjaY2BkYGBhAAEIyc7AwMiAAhgZAQHPABQAAAB42r1TwRaAIAgD88P59PRA0hxUlw578mBDQOwi0i+oDUzb7nC/xyKH8SuwHH/jSx83jnE745c1RO44G9E1WTE14AQtYvKO6PN6BXRW5EONgCazSS4VXiere+sp7F7cQeSp7Pe2YkaxN7fVFhg/8z/1hfnfaBXnZ8k7wNzp/y13+wRWwErCAAAAeNpl0ylUVVEUBuCtoiKgoiIzAjIIMj9mZBZYMsmMjwcuBhEIBoPBYDAYDAaDwWA0GAwGgsFgMBgMBoPBYDAYDAaDweBnlrX+9e6955x/2oeI//664HbEgTL4HnHwZ8Sh1/AlIm0W3kUc3oN9+BFxJBva4E3E0SvwLCIdR/qniGO98Coiw3vG04hMv5n/fj9GZBUD3iz8xx9FnMiBJxEn0+E+/IrIppNt/VQzvITfEadH4HnEmUG4BV8jchaBn7NZgCMXdy7uXGfzeMjjKZ/PfBwF9hTYU/AhotC5QtpFtIt4K7oLnyOK6RXTKP4TUcJDCe5zNXAHcJTiKOWxlEZZPeAo00U5b+XyltM9vw24KvBWyFzpTOWLiCr5qu6BPdV0qx+Cni+sAc4a3mvw1nqu/RZxsRJkrEsDWeo2wAzq8dY/iGgwpwbfGvTdaA6NOmnUb5PnpiTY00S3SXfN/DU/BustdFrMq8VagqcE/YReEjK3+t4qayuPbTTbdNH2PqJdL+06a5e33VoHjg7vHdY7cXTK2ekedPHWha+b5279ddPo1ndPPuDrkbkH3yX5e/XXy3OvzH34+sy132+//P14B/AO6GuA3qBOB3U6hH/It2Haw2Y2rI9hHV6WdcSsR6eAl1GZx3Qwpr9xcxv3PqGDCbyTvE3KM+muT+lwypkpe6bNaZqfaX6v8j7D8wyNGbwzbyNmdTMrzxxfc9bndDFn5vM8zds37x4smMeCHhf5WTKHJb0uuc/L/C7bs4zrGr2kO5m0ntRZkv8VfazIkvI9RSelg5ReUrKvOrvqHq7p4Lr5retx3fcN/5Mb+Dfs25RpE/8mji0etqzfwLHteZufmzrZobfj/K5ednna0/fe/l+Pca7seNpjYGRgYGRkaGBQYAABJgY0AAAP+ACmeNp1ksFO20AQhv8NgRJaUApSy61LDxVc4uAjNxoJReoNKdCrYy8hZb1rrTcIuPMKfaY+QM899RH6AP3tDJEKqlcefzvzz/xrywD21ScoLK9N3ktW5E3hDl6hL7zG7HvhLrMfhNfxGonwBjUnwj2uz8JbzH4R3sZbPArvIMV34T28wQ+6qG6Puz5+Civyb+EOO/4Ir6GvOsJdaLUrvI53KhXeoGYs3MOu+iq8hai+CW/jo/olvIOiA+E97HeKw/xIp8M0nYQ6O/MunpvZwmbhafv01JK/MKGee6ePB8N/JCFzN6dO+8o4bee5cbnRM+NMyKyuFqHytdHR3MXSF0ZfNQOn93rVORoNm4l64ua3NMjsdYxVfZIkeTBZZC73ZeldPfBhllSLKR0KX2ZzlzyY4BO2JmNjrdeXPtjiAIfIcQTNbz/knWKCgBoZzuDhEHEOgxkWsMyFF9Xne/1Mf8Fdo5i3dY1jDOjz/ymB0eEGp63ao2J/Q5YT8pabqOnQsGn1lvuKjoHRc05Tj4x3jCUzRZu5Wp1winvGl54jruHqjI3C0fVW3qDxuWZ/pEvNPzjhylkxrETR5fQoW09HzYDPwJMm7emm8g5Fq8nIjpWHdronLV0TjJmxXJ4nuGwnWPYcAH8BoeumrAB42mNgYmFgnMDAysDCxMDEAAIQGoiNGc6A+CwMENDAwNDNwFDwGMpliHT00WNwYFBQy4aogJCMgSCSGcJTYGAAAEBYBpIAAAB42mNgZoCANAZjIMnIgAYADecAng==", s = await this.Nr(i);
    await this.Xr(s);
  }
  Yr(e) {
    if (e === void 0) return this.Dr;
    this.Dr = e, this.Kr();
  }
  Kr() {
    const e = this.Rr.map((i) => i.character);
    this.Or = this.Ir.$r(e, this.Dr, this.kr), this.Br.vr(this.Rr, this.Or, this.Dr, this.kr);
  }
  async Wr(e) {
    try {
      const i = await this.Nr(e);
      await this.Xr(i);
    } catch (i) {
      throw new S("Failed to load font: " + (i instanceof Error ? i.message : "Unknown error"), { originalError: i });
    }
  }
  async Nr(e) {
    const i = await fetch(e);
    if (!i.ok) throw new S(`Failed to load font file: ${i.status} ${i.statusText}`);
    return i.arrayBuffer();
  }
  async Xr(e) {
    await this.Zr(e);
    const i = ft.parse(e);
    if (!i || i.length === 0) throw Error("Failed to parse font file");
    this.kr = i[0], await this.qr();
  }
  async Zr(e) {
    this.Hr && document.fonts.delete(this.Hr);
    const i = Date.now();
    this.Hr = new FontFace("CustomFont_" + i, e), await this.Hr.load(), document.fonts.add(this.Hr);
  }
  async qr() {
    const e = this.zr.nr(this.kr), { array: i, map: s } = this.Gr.Tr(e, this.kr);
    this.Rr = i, this.Lr = s, this.Kr(), this.jr = !0;
  }
  Vr(e) {
    const i = this.Lr.get(e);
    return i ? i.color : [0, 0, 0];
  }
  Jr(e) {
    return Array.from(e).map((i) => {
      const s = this.Lr.get(i);
      return s ? s.color : [0, 0, 0];
    });
  }
  dispose() {
    this.Br.Ss(), this.Hr && document.fonts.delete(this.Hr), super.dispose();
  }
  get tn() {
    return this.jr;
  }
  get fontFramebuffer() {
    return this.Br.framebuffer;
  }
  get characterMap() {
    return this.Lr;
  }
  get characters() {
    return this.Rr;
  }
  get textureColumns() {
    return this.Br.columns;
  }
  get textureRows() {
    return this.Br.rows;
  }
  get maxGlyphDimensions() {
    return this.Or;
  }
  get fontSize() {
    return this.Dr;
  }
  get font() {
    return this.kr;
  }
}
class ke {
  constructor(t, e, i) {
    o(this, "sn");
    o(this, "pr");
    o(this, "M");
    o(this, "F");
    o(this, "en");
    o(this, "rn");
    o(this, "nn");
    o(this, "hn");
    o(this, "an");
    o(this, "cn", !1);
    o(this, "ln", /* @__PURE__ */ new Set());
    this.nn = t, this.hn = e, this.an = i, this.reset();
  }
  un() {
    if (this.M = this.sn * this.hn, this.F = this.pr * this.an, this.en = Math.floor((this.nn.width - this.M) / 2), this.rn = Math.floor((this.nn.height - this.F) / 2), this.ln.size > 0) for (const t of this.ln) t();
  }
  fn(t) {
    this.ln.add(t);
  }
  dn(t) {
    this.ln.delete(t);
  }
  reset() {
    this.cn || (this.sn = Math.max(1, Math.floor(this.nn.width / this.hn)), this.pr = Math.max(1, Math.floor(this.nn.height / this.an))), this.un();
  }
  pn(t, e) {
    this.hn = t, this.an = e, this.reset();
  }
  get cellWidth() {
    return this.hn;
  }
  get cellHeight() {
    return this.an;
  }
  get cols() {
    return this.sn;
  }
  set cols(t) {
    this.cn = !0, this.sn = Math.max(1, Math.floor(t)), typeof this.pr != "number" && (this.pr = Math.max(1, Math.floor(this.nn.height / this.an))), this.un();
  }
  get rows() {
    return this.pr;
  }
  set rows(t) {
    this.cn = !0, this.pr = Math.max(1, Math.floor(t)), typeof this.sn != "number" && (this.sn = Math.max(1, Math.floor(this.nn.width / this.hn))), this.un();
  }
  get width() {
    return this.M;
  }
  get height() {
    return this.F;
  }
  get offsetX() {
    return this.en;
  }
  get offsetY() {
    return this.rn;
  }
  responsive() {
    this.cn = !1;
  }
  vn(t, e) {
    const i = this.nn.getBoundingClientRect(), s = t - i.left, r = e - i.top, h = this.nn.width / i.width, a = r * (this.nn.height / i.height), c = s * h - this.en, l = a - this.rn, u = Math.floor(c / this.hn), f = Math.floor(l / this.an);
    return u >= 0 && u < this.sn && f >= 0 && f < this.pr ? { x: u - Math.floor((this.sn - 1) / 2), y: f - Math.floor(this.pr / 2) } : { x: -1 / 0, y: -1 / 0 };
  }
  Ss() {
    this.ln.clear();
  }
}
function et(n) {
  return parseInt(n, 16);
}
const Xe = /^rgba?\(([^)]+)\)$/i;
function I(n) {
  return Number.isNaN(n = Math.round(n)) ? 0 : L(n, 0, 255);
}
function Dt(n, t = !1) {
  if (!n) return null;
  const e = n.trim().toLowerCase();
  if (!e) return null;
  let i = null;
  return e.startsWith("rgb") && (i = function(s) {
    const r = Xe.exec(s.trim());
    if (!r) return null;
    const h = r[1].split(",").map((f) => f.trim());
    if (h.length < 3) return null;
    const a = I(parseFloat(h[0])), c = I(parseFloat(h[1])), l = I(parseFloat(h[2]));
    let u = 255;
    if (h[3] !== void 0) {
      const f = h[3].trim();
      let p = parseFloat(f);
      f.endsWith("%") && (p /= 100), u = 255 * L(p, 0, 1);
    }
    return [a, c, l, Math.round(u)];
  }(e)), i && (t || i[3] !== 0) ? i : null;
}
class He {
  constructor(t = {}) {
    o(this, "nn");
    o(this, "gn", null);
    o(this, "mn", !1);
    o(this, "_n");
    o(this, "yn", null);
    o(this, "An", !0);
    o(this, "$", null);
    if (this.mn = t.overlay ?? !1, t.gl) this.yn = t.gl, this.nn = t.gl.canvas, this._n = !1, this.An = !1;
    else if (this.mn && t.canvas) this.gn = t.canvas, this.nn = this.wn(), this._n = !0, this.bn();
    else if (t.canvas) {
      if (typeof HTMLVideoElement < "u" && t.canvas instanceof HTMLVideoElement) throw new S("Video elements are only supported in overlay mode.");
      this.nn = t.canvas, this._n = !1;
    } else this.nn = this.Cn(t.width, t.height), this._n = !0;
    typeof HTMLCanvasElement < "u" && this.nn instanceof HTMLCanvasElement && (this.nn.style.imageRendering = "pixelated");
  }
  Cn(t, e) {
    const i = document.createElement("canvas");
    return i.className = "textmodeCanvas", i.style.imageRendering = "pixelated", i.width = t || 800, i.height = e || 600, document.body.appendChild(i), i;
  }
  wn() {
    const t = document.createElement("canvas");
    t.className = "textmodeCanvas", t.style.imageRendering = "pixelated";
    const e = this.gn.getBoundingClientRect();
    let i = Math.round(e.width), s = Math.round(e.height);
    if (typeof HTMLVideoElement < "u" && this.gn instanceof HTMLVideoElement) {
      const a = this.gn;
      (i === 0 || s === 0) && a.videoWidth > 0 && a.videoHeight > 0 && (i = a.videoWidth, s = a.videoHeight);
    }
    t.width = i, t.height = s, t.style.position = "absolute";
    const r = window.getComputedStyle(this.gn);
    let h = parseInt(r.zIndex || "0", 10);
    return isNaN(h) && (h = 0), t.style.zIndex = "" + (h + 1), t;
  }
  bn() {
    var t;
    this.xn(), this.nn instanceof HTMLCanvasElement && ((t = this.gn.parentNode) == null || t.insertBefore(this.nn, this.gn.nextSibling));
  }
  Mn() {
    const t = [];
    return this.mn && this.gn instanceof HTMLElement && (t.push(this.gn), this.gn.parentElement && t.push(this.gn.parentElement)), t.push(document.body), t.push(document.documentElement), t;
  }
  Fn() {
    const t = this.Mn();
    for (const e of t) {
      if (!e) continue;
      const i = Dt(window.getComputedStyle(e).backgroundColor);
      if (i) return i;
    }
    return [255, 255, 255, 255];
  }
  xn() {
    if (!this.gn || !(this.nn instanceof HTMLCanvasElement)) return;
    const t = this.gn.getBoundingClientRect(), e = this.gn.offsetParent;
    if (e && e !== document.body) {
      const i = e.getBoundingClientRect();
      this.nn.style.top = t.top - i.top + "px", this.nn.style.left = t.left - i.left + "px";
    } else this.nn.style.top = t.top + window.scrollY + "px", this.nn.style.left = t.left + window.scrollX + "px";
  }
  $n(t, e) {
    if (this.mn) {
      const i = this.gn.getBoundingClientRect();
      this.nn.width = Math.round(i.width), this.nn.height = Math.round(i.height), this.xn();
    } else this.nn.width = t ?? this.nn.width, this.nn.height = e ?? this.nn.height;
  }
  Pn() {
    if (this.yn) return this.yn;
    const t = this.nn.getContext("webgl2", { alpha: !0, premultipliedAlpha: !1, preserveDrawingBuffer: !0, antialias: !1, depth: !0, stencil: !1, powerPreference: "high-performance" });
    if (!t) throw new S("`textmode.js` requires WebGL2 support.");
    return this.$ = t, t;
  }
  Ss() {
    if (!this.An) return;
    const t = this.$ ?? this.yn;
    if (t) {
      const e = t.getExtension("WEBGL_lose_context");
      e == null || e.loseContext();
    }
    this._n && typeof HTMLCanvasElement < "u" && this.nn instanceof HTMLCanvasElement && this.nn.parentNode && this.nn.parentNode.removeChild(this.nn);
  }
  get canvas() {
    return this.nn;
  }
  get targetCanvas() {
    return this.gn;
  }
  get width() {
    return this.nn.width;
  }
  get height() {
    return this.nn.height;
  }
  get ownsContext() {
    return this.An;
  }
}
class E {
  constructor(t, e, i, s) {
    o(this, "Tn");
    o(this, "Sn");
    o(this, "r");
    o(this, "g");
    o(this, "b");
    o(this, "a");
    this.r = I(t), this.g = I(e), this.b = I(i), this.a = I(s);
  }
  static En(t, e, i, s) {
    if (E.kn(t)) return t;
    if (Array.isArray(t)) {
      if (t.length < 3) throw Error("Component tuples must include at least RGB values.");
      const [r, h, a] = t, c = t.length === 4 ? t[3] : 255;
      return E.Rn(r, h, a, c);
    }
    if (typeof t == "string") {
      const r = t.trim();
      if (r.length === 0) throw Error("Color strings cannot be empty.");
      const h = Dt(r, !0);
      return h ? E.Rn(...h) : E.Ln(r);
    }
    if (typeof t == "number") return typeof e == "number" && typeof i == "number" ? E.Rn(t, e, i, s ?? 255) : typeof e == "number" ? E.Dn(t, e) : E.Dn(t, s ?? 255);
    throw Error("Unsupported color input passed to TextmodeColor.$from.");
  }
  static Rn(t, e, i, s = 255) {
    return new E(t, e, i, s);
  }
  static Dn(t, e = 255) {
    return new E(t, t, t, e);
  }
  static Ln(t) {
    return new E(...function(e) {
      const i = e.trim().replace(/^#|0x/gi, "");
      if (!/^[0-9A-Fa-f]+$/.test(i)) throw Error("Invalid hex color: " + e);
      const s = (r = i).length === 3 || r.length === 4 ? r.split("").map((h) => h + h).join("") : r;
      var r;
      if (s.length !== 6 && s.length !== 8) throw Error("Invalid hex color: " + e);
      return [et(s.slice(0, 2)), et(s.slice(2, 4)), et(s.slice(4, 6)), s.length === 8 ? et(s.slice(6, 8)) : 255];
    }(t));
  }
  static On(t, e, i, s) {
    return new E(Math.round(255 * t), Math.round(255 * e), Math.round(255 * i), Math.round(255 * s));
  }
  get rgb() {
    return [this.r, this.g, this.b];
  }
  get rgba() {
    return this.Tn || (this.Tn = [this.r, this.g, this.b, this.a]), [...this.Tn];
  }
  get normalized() {
    return this.Sn || (this.Sn = [this.r / 255, this.g / 255, this.b / 255, this.a / 255]), [...this.Sn];
  }
  withAlpha(t) {
    return new E(this.r, this.g, this.b, t);
  }
  static kn(t) {
    return t instanceof E;
  }
}
class dt extends lt {
  constructor(e, i, s, r, h, a, c, l) {
    super();
    o(this, "$");
    o(this, "R");
    o(this, "Hn");
    o(this, "zn");
    o(this, "Bn");
    o(this, "M");
    o(this, "F");
    o(this, "L", null);
    o(this, "In", null);
    o(this, "Gn", "brightness");
    o(this, "jn", null);
    o(this, "Qn");
    o(this, "Nn", null);
    o(this, "Rt", 0);
    o(this, "Gt", 0);
    o(this, "jt", 0);
    o(this, "Lt", 0);
    o(this, "Xn", "sampled");
    o(this, "Yn", "fixed");
    o(this, "Kn", null);
    o(this, "Wn", null);
    o(this, "Zn", null);
    o(this, "qn", null);
    o(this, "Vn", null);
    o(this, "Jn", null);
    o(this, "Xt", [1, 1, 1, 1]);
    o(this, "Yt", [0, 0, 0, 1]);
    o(this, "th", [0, 0, 0, 1]);
    o(this, "sh", [[0.1, 0, 0]]);
    o(this, "Nt", null);
    o(this, "eh", null);
    o(this, "ih", null);
    o(this, "rh", null);
    o(this, "nh", null);
    this.$ = e, this.R = i, this.Hn = s, this.Qn = r, this.zn = h, this.Bn = a, this.hh(c, l);
  }
  oh(e, i, s) {
    this.R.Ei() ? this[e] = s : (this[i] = s, this.L = null);
  }
  ah(e, i, s) {
    this.R.Ei() ? this[e] = s : (this[i] = s, this.jn = null, this.L = null);
  }
  uh(e, i, s, r, h) {
    this.R.Ei() ? this.fh(e, i, s, r, h) : (e === "char" ? this.dh(this.Xt, i, s, r, h) : e === "cell" ? this.dh(this.Yt, i, s, r, h) : this.dh(this.th, i, s, r, h), this.L = null);
  }
  conversionMode(e) {
    return this.ah("_frameConversionMode", "_conversionMode", e), this;
  }
  dispose() {
    this.Hn && (this.$.deleteTexture(this.Hn), this.Hn = null), super.dispose();
  }
  invert(e = !0) {
    const i = e ? 1 : 0;
    return this.oh("_frameInvert", "_invert", i), this;
  }
  flipX(e = !0) {
    const i = e ? 1 : 0;
    return this.oh("_frameFlipX", "_flipX", i), this;
  }
  flipY(e = !0) {
    const i = e ? 1 : 0;
    return this.oh("_frameFlipY", "_flipY", i), this;
  }
  charRotation(e) {
    const i = Pt(e);
    return this.oh("_frameCharRotation", "_charRotation", i), this;
  }
  charColorMode(e) {
    return this.oh("_frameCharColorMode", "_charColorMode", e), this;
  }
  cellColorMode(e) {
    return this.oh("_frameCellColorMode", "_cellColorMode", e), this;
  }
  charColor(e, i, s, r) {
    return this.uh("char", e, i, s, r), this;
  }
  cellColor(e, i, s, r) {
    return this.uh("cell", e, i, s, r), this;
  }
  background(e, i, s, r) {
    return this.uh("background", e, i, s, r), this;
  }
  characters(e) {
    if (this.R.Ei()) {
      const i = this.ph(e);
      this.nh = i.length > 0 ? i : null;
    } else this.Nt = e, this.gh(e), this.L = null;
    return this;
  }
  Hi(e) {
    this.In !== e && (this.In = e, this.Nt && this.gh(this.Nt), this.L = null);
  }
  get texture() {
    return this.Hn;
  }
  get width() {
    return this.M;
  }
  get height() {
    return this.F;
  }
  get originalWidth() {
    return this.zn;
  }
  get originalHeight() {
    return this.Bn;
  }
  $n(e, i) {
    this.hh(e, i);
  }
  V() {
    return this.mh() ? this._h() : (this.L || this.J(), this.L);
  }
  zi() {
    return this.mh();
  }
  Si() {
    this.Kn = null, this.Wn = null, this.Zn = null, this.qn = null, this.Vn = null, this.Jn = null, this.eh = null, this.ih = null, this.rh = null, this.nh = null, this.Nn = null;
  }
  yh() {
  }
  Ah() {
    return this.Hn;
  }
  J() {
    this.L = this._h();
  }
  _h() {
    this.yh();
    const e = this.wh(), i = this.bh(), s = this.Nn ?? this.Gn, r = this.Qn.Ch(s, i), h = e.createUniforms(i);
    return this.R.materialManager.st(r, h);
  }
  dh(e, i, s, r, h) {
    const a = E.En(i, s, r, h);
    rt(e, a.r, a.g, a.b, a.a);
  }
  gh(e) {
    const i = this.ph(e);
    this.sh = i.length > 0 ? i : this.sh;
  }
  ph(e) {
    return this.In ? this.In.Jr(e).filter((i) => Array.isArray(i)).slice(0, 255) : [];
  }
  hh(e, i) {
    const { width: s, height: r } = function(h, a, c, l) {
      const u = Math.min(c / h, l / a);
      return { width: Math.max(1, Math.floor(h * u)), height: Math.max(1, Math.floor(a * u)), scale: u };
    }(this.zn, this.Bn, e, i);
    this.M = s, this.F = r;
  }
  createBaseConversionUniforms() {
    const e = this.Kn ?? this.Rt, i = this.Wn ?? this.Gt, s = this.Zn ?? this.jt, r = this.qn ?? this.Lt, h = this.Vn ?? this.Xn, a = this.Jn ?? this.Yn, c = this.eh ?? this.Xt, l = this.ih ?? this.Yt, u = this.rh ?? this.th, f = this.nh ?? this.sh;
    return { u_image: this.Ah(), u_invert: !!e, u_flipX: !!i, u_flipY: !!s, u_charRotation: r, u_charColorFixed: h === "fixed", u_charColor: c, u_cellColorFixed: a === "fixed", u_cellColor: l, u_backgroundColor: u, u_charCount: f.length, u_charList: f };
  }
  mh() {
    return this.Kn !== null || this.Wn !== null || this.Zn !== null || this.qn !== null || this.Vn !== null || this.Jn !== null || this.eh !== null || this.ih !== null || this.rh !== null || this.nh !== null || this.Nn !== null;
  }
  wh() {
    const e = this.Nn ?? this.Gn;
    if (this.jn && this.jn.id === e) return this.jn;
    const i = this.Qn.xh(e);
    if (!i) throw Error(`[textmode.js] Conversion mode "${e}" is not registered. If this mode is provided by an add-on, make sure its plugin is installed before loading sources.`);
    return this.jn = i, i;
  }
  fh(e, i, s, r, h) {
    let a;
    e === "char" ? (a = this.eh ?? [0, 0, 0, 1], this.eh = a) : e === "cell" ? (a = this.ih ?? [0, 0, 0, 1], this.ih = a) : (a = this.rh ?? [0, 0, 0, 1], this.rh = a), this.dh(a, i, s, r, h);
  }
  bh() {
    if (!this.In) throw Error("[textmode.js] Cannot create conversion context: no active font set. Ensure $setActiveFont() is called before rendering.");
    return { renderer: this.R, gl: this.$, font: this.In, source: this };
  }
}
class V extends dt {
  constructor(t, e, i, s, r, h, a, c) {
    super(t, e, i, s, r, h, a, c);
  }
  static Mh(t, e, i, s, r) {
    const h = t.context, { texture: a, width: c, height: l } = bt(h, i);
    return new V(h, t, a, e, c, l, s, r);
  }
}
class zt {
  constructor(t = 60) {
    o(this, "Fh");
    o(this, "$h");
    o(this, "Ph", null);
    o(this, "Th", 0);
    o(this, "Sh", !0);
    o(this, "Eh", 0);
    o(this, "kh", 0);
    o(this, "Rh", []);
    o(this, "Lh", 10);
    o(this, "Dh", 0);
    o(this, "Oh", 0);
    o(this, "Hh", -1);
    this.$h = t, this.Fh = 1e3 / t;
  }
  zh(t) {
    if (!this.Sh) return;
    this.Hh === -1 && (this.Hh = performance.now()), this.Th = performance.now();
    const e = (i) => {
      if (!this.Sh) return void (this.Ph = null);
      const s = i - this.Th;
      s >= this.Fh && (t(), this.Th = i - s % this.Fh), this.Sh && (this.Ph = requestAnimationFrame(e));
    };
    this.Ph = requestAnimationFrame(e);
  }
  Bh() {
    this.Ph && (cancelAnimationFrame(this.Ph), this.Ph = null);
  }
  Ih() {
    this.Sh && (this.Sh = !1, this.Bh());
  }
  Gh(t) {
    this.Sh || (this.Sh = !0, this.zh(t));
  }
  jh(t, e) {
    if (t === void 0) return this.Eh;
    this.$h = t, this.Fh = 1e3 / t, this.Sh && e && (this.Bh(), this.zh(e));
  }
  Qh() {
    const t = performance.now();
    if (this.kh > 0) {
      const e = t - this.kh;
      this.Dh = e, this.Rh.push(e), this.Rh.length > this.Lh && this.Rh.shift();
      const i = this.Rh.reduce((s, r) => s + r, 0) / this.Rh.length;
      this.Eh = 1e3 / i;
    }
    this.kh = t;
  }
  get Nh() {
    return this.Sh;
  }
  get Xh() {
    return this.Eh;
  }
  get Yh() {
    return this.$h;
  }
  set Yh(t) {
    this.$h = t, this.Fh = 1e3 / t;
  }
  get Kh() {
    return this.Oh;
  }
  set Kh(t) {
    this.Oh = t;
  }
  Wh() {
    this.Oh++;
  }
  get Zh() {
    return this.Hh === -1 ? 0 : performance.now() - this.Hh;
  }
  set Zh(t) {
    this.Hh = performance.now() - t;
  }
  get qh() {
    return this.Zh / 1e3;
  }
  set qh(t) {
    this.Zh = 1e3 * t;
  }
  get Vh() {
    return this.Dh;
  }
}
function kt(n, t, e) {
  return n ? n.vn(t, e) : { x: -1 / 0, y: -1 / 0 };
}
class Xt {
  constructor(t, e) {
    o(this, "nn");
    o(this, "Jh");
    o(this, "so", { x: -1 / 0, y: -1 / 0 });
    o(this, "eo", { x: -1 / 0, y: -1 / 0 });
    o(this, "io", null);
    o(this, "ro", 0);
    o(this, "no");
    o(this, "ho");
    o(this, "oo");
    o(this, "ao");
    o(this, "co");
    o(this, "lo");
    o(this, "uo", !1);
    o(this, "fo");
    o(this, "do");
    o(this, "po");
    o(this, "vo");
    o(this, "mo");
    this.nn = t, this.Jh = e;
  }
  _o(t) {
    const e = performance.now() + Math.max(0, t);
    e > this.ro && (this.ro = e);
  }
  yo() {
    return performance.now() < this.ro;
  }
  Ao(t) {
    const e = this.nn.canvas;
    e.style.cursor = t == null || t === "" ? "" : t;
  }
  wo() {
    if (this.uo) return;
    const t = this.nn.canvas;
    this.no = (e) => {
      this.bo(e), this.Co(e);
    }, this.ho = () => {
      this.eo = { ...this.so }, this.so.x = -1 / 0, this.so.y = -1 / 0, this.io = null;
    }, this.oo = (e) => {
      this.bo(e), this.xo(e);
    }, this.ao = (e) => {
      this.bo(e), this.Mo(e);
    }, this.co = (e) => {
      this.bo(e), this.Fo(e);
    }, this.lo = (e) => {
      this.bo(e), this.$o(e);
    }, t.addEventListener("mousemove", this.no, { passive: !0 }), t.addEventListener("mouseleave", this.ho, { passive: !0 }), t.addEventListener("mousedown", this.oo, { passive: !0 }), t.addEventListener("mouseup", this.ao, { passive: !0 }), t.addEventListener("click", this.co, { passive: !0 }), t.addEventListener("wheel", this.lo, { passive: !1 }), this.uo = !0;
  }
  Po() {
    if (!this.uo) return;
    const t = this.nn.canvas;
    t.removeEventListener("mousemove", this.no), t.removeEventListener("mouseleave", this.ho), t.removeEventListener("mousedown", this.oo), t.removeEventListener("mouseup", this.ao), t.removeEventListener("click", this.co), t.removeEventListener("wheel", this.lo), this.uo = !1;
  }
  To() {
    if (this.uo) try {
      if (this.io) {
        const t = new MouseEvent("mousemove", { clientX: this.io.x, clientY: this.io.y, bubbles: !1, cancelable: !1 });
        this.bo(t);
      }
    } catch {
      this.so.x = -1 / 0, this.so.y = -1 / 0;
    }
  }
  So(t) {
    this.fo = t;
  }
  Eo(t) {
    this.do = t;
  }
  ko(t) {
    this.po = t;
  }
  Ro(t) {
    this.vo = t;
  }
  Lo(t) {
    this.mo = t;
  }
  Do() {
    return { x: this.so.x, y: this.so.y };
  }
  Oo(t, e = {}) {
    return { position: { ...this.so }, previousPosition: { ...this.eo }, originalEvent: t, ...e };
  }
  Co(t) {
    this.vo && !this.yo() && this.vo(this.Oo(t));
  }
  xo(t) {
    this.do && !this.yo() && this.do(this.Oo(t, { button: t.button }));
  }
  Mo(t) {
    this.po && !this.yo() && this.po(this.Oo(t, { button: t.button }));
  }
  Fo(t) {
    this.fo && !this.yo() && this.fo(this.Oo(t, { button: t.button }));
  }
  $o(t) {
    this.mo && !this.yo() && this.mo(this.Oo(t, { delta: { x: t.deltaX, y: t.deltaY } }));
  }
  bo(t) {
    const e = this.Jh();
    this.eo = { ...this.so }, this.io = { x: t.clientX, y: t.clientY };
    const i = kt(e, t.clientX, t.clientY);
    this.so.x = i.x, this.so.y = i.y;
  }
}
const Ye = Object.freeze(Object.defineProperty({ __proto__: null, MouseManager: Xt }, Symbol.toStringTag, { value: "Module" }));
class Ht {
  constructor() {
    o(this, "Ho", /* @__PURE__ */ new Map());
    o(this, "zo", null);
    o(this, "Bo", null);
    o(this, "Io");
    o(this, "Go");
    o(this, "uo", !1);
    o(this, "jo");
    o(this, "Qo");
    o(this, "No", { ArrowUp: "UP_ARROW", ArrowDown: "DOWN_ARROW", ArrowLeft: "LEFT_ARROW", ArrowRight: "RIGHT_ARROW", F1: "F1", F2: "F2", F3: "F3", F4: "F4", F5: "F5", F6: "F6", F7: "F7", F8: "F8", F9: "F9", F10: "F10", F11: "F11", F12: "F12", Enter: "ENTER", Return: "RETURN", Tab: "TAB", Escape: "ESCAPE", Backspace: "BACKSPACE", Delete: "DELETE", Insert: "INSERT", Home: "HOME", End: "END", PageUp: "PAGE_UP", PageDown: "PAGE_DOWN", Shift: "SHIFT", Control: "CONTROL", Alt: "ALT", Meta: "META", " ": "SPACE" });
  }
  wo() {
    this.uo || (this.Io = (t) => {
      this.Xo(t);
    }, this.Go = (t) => {
      this.Yo(t);
    }, window.addEventListener("keydown", this.Io, { passive: !1 }), window.addEventListener("keyup", this.Go, { passive: !1 }), this.uo = !0);
  }
  Po() {
    this.uo && (window.removeEventListener("keydown", this.Io), window.removeEventListener("keyup", this.Go), this.uo = !1, this.Ho.clear(), this.zo = null, this.Bo = null);
  }
  Eo(t) {
    this.jo = t;
  }
  ko(t) {
    this.Qo = t;
  }
  Ko(t) {
    const e = this.Wo(t), i = this.Ho.get(t) || this.Ho.get(e);
    return (i == null ? void 0 : i.isPressed) || !1;
  }
  Zo() {
    return this.zo;
  }
  qo() {
    return this.Bo;
  }
  Vo() {
    const t = [];
    for (const [e, i] of this.Ho) i.isPressed && t.push(e);
    return t;
  }
  Jo() {
    return { ctrl: this.Ko("Control"), shift: this.Ko("Shift"), alt: this.Ko("Alt"), meta: this.Ko("Meta") };
  }
  ta() {
    this.Ho.clear(), this.zo = null, this.Bo = null;
  }
  Xo(t) {
    const e = t.key, i = Date.now();
    this.Ho.has(e) || this.Ho.set(e, { isPressed: !1, lastPressTime: 0, lastReleaseTime: 0 });
    const s = this.Ho.get(e);
    s.isPressed || (s.isPressed = !0, s.lastPressTime = i, this.zo = e, this.jo && this.jo(this.Oo(e, !0, t)));
  }
  Oo(t, e, i) {
    return { key: t, keyCode: i.keyCode, ctrlKey: i.ctrlKey, shiftKey: i.shiftKey, altKey: i.altKey, metaKey: i.metaKey, isPressed: e, originalEvent: i };
  }
  Yo(t) {
    const e = t.key, i = Date.now();
    this.Ho.has(e) || this.Ho.set(e, { isPressed: !1, lastPressTime: 0, lastReleaseTime: 0 });
    const s = this.Ho.get(e);
    s.isPressed = !1, s.lastReleaseTime = i, this.Bo = e, this.Qo && this.Qo(this.Oo(e, !1, t));
  }
  Wo(t) {
    return this.No[t] || t.toLowerCase();
  }
}
const je = Object.freeze(Object.defineProperty({ __proto__: null, KeyboardManager: Ht }, Symbol.toStringTag, { value: "Module" }));
class Yt {
  constructor(t, e, i) {
    o(this, "nn");
    o(this, "sa");
    o(this, "Jh");
    o(this, "ea", /* @__PURE__ */ new Map());
    o(this, "ia", /* @__PURE__ */ new Map());
    o(this, "ra", /* @__PURE__ */ new Map());
    o(this, "na", null);
    o(this, "ha");
    o(this, "oa");
    o(this, "aa");
    o(this, "ca");
    o(this, "la");
    o(this, "ua");
    o(this, "uo", !1);
    o(this, "fa");
    o(this, "da");
    o(this, "pa");
    o(this, "va");
    o(this, "ga");
    o(this, "ma");
    o(this, "_a");
    o(this, "ya");
    o(this, "wa");
    o(this, "ba");
    o(this, "Ca", 320);
    o(this, "xa", 350);
    o(this, "Ma", 10);
    o(this, "Fa", 550);
    o(this, "$a", 14);
    o(this, "Pa", 48);
    o(this, "Ta", 650);
    o(this, "Sa", 0.02);
    o(this, "Ea", 2);
    o(this, "Ua", 600);
    o(this, "ka", 0);
    o(this, "Ra", null);
    this.nn = t, this.Jh = e, this.sa = i;
    const s = this.nn.canvas;
    this.ha = s.style.touchAction, this.oa = s.style.userSelect, s.style.touchAction || (s.style.touchAction = "none"), s.style.userSelect || (s.style.userSelect = "none");
  }
  wo() {
    if (this.uo) return;
    const t = this.nn.canvas;
    this.aa = (e) => {
      this.La(e);
    }, this.ca = (e) => {
      this.Da(e);
    }, this.la = (e) => {
      this.Oa(e);
    }, this.ua = (e) => {
      this.Ha(e);
    }, t.addEventListener("touchstart", this.aa, { passive: !1 }), t.addEventListener("touchmove", this.ca, { passive: !1 }), t.addEventListener("touchend", this.la, { passive: !1 }), t.addEventListener("touchcancel", this.ua, { passive: !1 }), this.uo = !0;
  }
  Po() {
    if (!this.uo) return;
    const t = this.nn.canvas;
    t.removeEventListener("touchstart", this.aa), t.removeEventListener("touchmove", this.ca), t.removeEventListener("touchend", this.la), t.removeEventListener("touchcancel", this.ua), this.uo = !1, this.na = null, this.ea.clear(), this.ia.clear(), this.ra.forEach((e) => {
      e.longPressTimer !== null && window.clearTimeout(e.longPressTimer);
    }), this.ra.clear(), this.Ra = null, this.ka = 0, t.style.touchAction = this.ha, t.style.userSelect = this.oa;
  }
  To() {
    if (!this.Jh() || this.ea.size === 0) return;
    const t = /* @__PURE__ */ new Map();
    for (const e of this.ea.values()) {
      const i = this.za(e.clientX, e.clientY, e.id, e);
      t.set(e.id, i);
    }
    this.ea = t;
  }
  Ba() {
    return Array.from(this.ea.values()).map((t) => ({ ...t }));
  }
  Ia(t) {
    this.fa = t;
  }
  Ro(t) {
    this.da = t;
  }
  Ga(t) {
    this.pa = t;
  }
  ja(t) {
    this.va = t;
  }
  Qa(t) {
    this.ga = t;
  }
  Na(t) {
    this.ma = t;
  }
  Xa(t) {
    this._a = t;
  }
  Ya(t) {
    this.ya = t;
  }
  Ka(t) {
    this.wa = t;
  }
  Wa(t) {
    this.ba = t;
  }
  La(t) {
    var s;
    if (!this.Jh()) return;
    t.preventDefault(), (s = this.sa) == null || s._o(this.Ua);
    const e = performance.now(), i = this.Za(t.changedTouches);
    for (const r of i) {
      const h = this.ea.get(r.id);
      h && this.ia.set(r.id, this.qa(h)), this.ea.set(r.id, r);
      const a = { id: r.id, startPosition: r, lastPosition: r, startTime: e, lastTime: e, longPressTimer: null, longPressFired: !1 };
      this._a && (a.longPressTimer = window.setTimeout(() => {
        const c = this.ea.get(r.id);
        c && (a.longPressFired = !0, this._a({ touch: this.qa(c), duration: performance.now() - a.startTime, originalEvent: t }));
      }, this.Fa)), this.ra.set(r.id, a), this.fa && this.fa(this.Va(r, t, void 0, e));
    }
    this.ea.size === 2 && this.Ja();
  }
  Da(t) {
    var s;
    if (!this.Jh()) return;
    t.preventDefault(), (s = this.sa) == null || s._o(this.Ua);
    const e = performance.now(), i = this.Za(t.changedTouches);
    for (const r of i) {
      const h = this.ea.get(r.id), a = h ? this.qa(h) : void 0;
      a && this.ia.set(r.id, a), this.ea.set(r.id, r);
      const c = this.ra.get(r.id);
      c && (c.lastPosition = r, c.lastTime = e, a) && K(a.clientX, a.clientY, r.clientX, r.clientY) > this.$a && c.longPressTimer !== null && (window.clearTimeout(c.longPressTimer), c.longPressTimer = null), this.da && this.da(this.Va(r, t, a, e));
    }
    this.ea.size === 2 ? this.tc(t) : this.na = null;
  }
  Oa(t) {
    if (!this.Jh()) return;
    t.preventDefault();
    const e = performance.now(), i = this.Za(t.changedTouches);
    for (const s of i) {
      const r = this.ea.get(s.id), h = r ? this.qa(r) : void 0, a = this.ra.get(s.id);
      a && a.longPressTimer !== null && (window.clearTimeout(a.longPressTimer), a.longPressTimer = null), this.pa && this.pa(this.Va(s, t, h, e)), a && this.sc(a, t), this.ra.delete(s.id), this.ia.delete(s.id), this.ea.delete(s.id);
    }
    this.ea.size < 2 && (this.na = null);
  }
  Ha(t) {
    if (!this.Jh()) return;
    t.preventDefault();
    const e = performance.now(), i = this.Za(t.changedTouches);
    for (const s of i) {
      const r = this.ea.get(s.id), h = r ? this.qa(r) : void 0, a = this.ra.get(s.id);
      a && a.longPressTimer !== null && (window.clearTimeout(a.longPressTimer), a.longPressTimer = null), this.va && this.va(this.Va(s, t, h, e)), this.ra.delete(s.id), this.ia.delete(s.id), this.ea.delete(s.id);
    }
    this.ea.size < 2 && (this.na = null);
  }
  Za(t) {
    const e = [];
    for (let i = 0; i < t.length; i += 1) {
      const s = t.item(i);
      s && e.push(this.ec(s));
    }
    return e;
  }
  ec(t) {
    return this.za(t.clientX, t.clientY, t.identifier, { id: t.identifier, x: -1, y: -1, clientX: t.clientX, clientY: t.clientY, pressure: t.force, radiusX: t.radiusX, radiusY: t.radiusY, rotationAngle: t.rotationAngle });
  }
  za(t, e, i, s) {
    const r = kt(this.Jh(), t, e);
    return { id: i, x: r.x, y: r.y, clientX: t, clientY: e, pressure: s.pressure, radiusX: s.radiusX, radiusY: s.radiusY, rotationAngle: s.rotationAngle };
  }
  Va(t, e, i, s) {
    const r = this.ra.get(t.id), h = Array.from(this.ia.values()).map((l) => this.qa(l)), a = Array.from(this.ea.values()).map((l) => this.qa(l)), c = this.Za(e.changedTouches);
    return { touch: this.qa(t), previousTouch: i ? this.qa(i) : void 0, touches: a, previousTouches: h, changedTouches: c, deltaTime: r ? s - r.lastTime : 0, originalEvent: e };
  }
  Ja() {
    if (this.ea.size !== 2) return void (this.na = null);
    const t = Array.from(this.ea.values()), [e, i] = t, s = K(e.x, e.y, i.x, i.y), r = xt(e.clientX, e.clientY, i.clientX, i.clientY);
    this.na = { ids: [e.id, i.id], initialDistance: Math.max(s, 1e-4), initialAngle: r, lastScale: 1, lastRotation: 0 };
  }
  tc(t) {
    if (this.na || this.Ja(), !this.na) return;
    const [e, i] = this.na.ids, s = this.ea.get(e), r = this.ea.get(i);
    if (!s || !r) return;
    const h = K(s.x, s.y, r.x, r.y) / this.na.initialDistance, a = h - this.na.lastScale;
    this.wa && Math.abs(a) > this.Sa && (this.wa({ touches: [this.qa(s), this.qa(r)], scale: h, deltaScale: a, center: this.rc(s, r), originalEvent: t }), this.na.lastScale = h);
    let c = xt(s.clientX, s.clientY, r.clientX, r.clientY) - this.na.initialAngle;
    c = (c + 180) % 360 - 180;
    const l = c - this.na.lastRotation;
    this.ba && Math.abs(l) > this.Ea && (this.ba({ touches: [this.qa(s), this.qa(r)], rotation: c, deltaRotation: l, center: this.rc(s, r), originalEvent: t }), this.na.lastRotation = c);
  }
  rc(t, e) {
    const i = (t.clientX + e.clientX) / 2, s = (t.clientY + e.clientY) / 2, r = this.za(i, s, -1, { id: -1, x: -1, y: -1, clientX: i, clientY: s });
    return { x: r.x, y: r.y };
  }
  sc(t, e) {
    const i = performance.now(), s = i - t.startTime, r = t.lastPosition.clientX - t.startPosition.clientX, h = t.lastPosition.clientY - t.startPosition.clientY, a = Math.hypot(r, h);
    if (!t.longPressFired && s <= this.Ca && a <= this.Ma)
      this.nc(t.lastPosition, i) && this.ma ? this.ma({ touch: this.qa(t.lastPosition), taps: 2, originalEvent: e }) : this.ga && this.ga({ touch: this.qa(t.lastPosition), taps: 1, originalEvent: e });
    else if (!t.longPressFired && s <= this.Ta && a >= this.Pa) {
      const c = Math.max(a, 1e-4), l = { x: r / c, y: h / c }, u = { x: r / s, y: h / s };
      this.ya && this.ya({ touch: this.qa(t.lastPosition), direction: l, distance: c, velocity: u, originalEvent: e });
    }
    this.ka = i, this.Ra = this.qa(t.lastPosition);
  }
  nc(t, e) {
    return !this.Ra || e - this.ka > this.xa ? !1 : K(t.clientX, t.clientY, this.Ra.clientX, this.Ra.clientY) <= this.Ma;
  }
  qa(t) {
    return { ...t };
  }
}
const Ge = Object.freeze(Object.defineProperty({ __proto__: null, TouchManager: Yt }, Symbol.toStringTag, { value: "Module" }));
class Z extends dt {
  constructor(e, i, s, r, h, a, c, l, u) {
    super(e, i, s, r, h, a, c, l);
    o(this, "hc");
    this.hc = u;
  }
  static oc(e, i, s, r, h) {
    const a = e.context, { texture: c, width: l, height: u } = bt(a, s);
    return new Z(a, e, c, i, l, u, r, h, s);
  }
  update() {
    this.hc instanceof HTMLVideoElement ? this.hc.readyState >= this.hc.HAVE_CURRENT_DATA && ht(this.$, this.Hn, this.hc) : ht(this.$, this.Hn, this.hc);
  }
  V() {
    return this.L = null, super.V();
  }
  yh() {
    this.update();
  }
  get source() {
    return this.hc;
  }
}
class D extends Z {
  constructor(t, e, i, s, r, h, a, c, l) {
    super(t, e, i, s, h, a, c, l, r);
  }
  dispose() {
    super.dispose(), this.ac.pause(), this.ac.src = "", this.ac.load();
  }
  static async cc(t) {
    const e = document.createElement("video");
    return e.crossOrigin = "anonymous", e.loop = !0, e.muted = !0, e.playsInline = !0, await new Promise((i, s) => {
      e.addEventListener("loadedmetadata", () => i(), { once: !0 }), e.addEventListener("error", (r) => {
        var a;
        const h = r.target;
        s(Error("Failed to load video: " + (((a = h.error) == null ? void 0 : a.message) || "Unknown error")));
      }, { once: !0 }), e.src = t;
    }), e;
  }
  static oc(t, e, i, s, r) {
    const h = t.context, { texture: a, width: c, height: l } = bt(h, i, h.LINEAR, h.LINEAR, h.CLAMP_TO_EDGE, h.CLAMP_TO_EDGE);
    return new D(h, t, a, e, i, c, l, s, r);
  }
  static async Mh(t, e, i, s, r) {
    const h = await D.cc(i);
    return D.oc(t, e, h, s, r);
  }
  async play() {
    await this.ac.play();
  }
  pause() {
    this.ac.pause();
  }
  stop() {
    this.ac.pause(), this.ac.currentTime = 0;
  }
  speed(t) {
    return this.ac.playbackRate = t, this;
  }
  loop(t = !0) {
    return this.ac.loop = t, this;
  }
  time(t) {
    return this.ac.currentTime = t, this;
  }
  volume(t) {
    return this.ac.volume = L(t, 0, 1), this;
  }
  get videoElement() {
    return this.ac;
  }
  get currentTime() {
    return this.ac.currentTime;
  }
  get duration() {
    return this.ac.duration;
  }
  get isPlaying() {
    return !this.ac.paused && !this.ac.ended;
  }
  get ac() {
    return this.hc;
  }
}
async function nt(n) {
  if (n.startsWith("./") || n.startsWith("../") || n.endsWith(".vert") || n.endsWith(".frag") || n.endsWith(".glsl")) {
    const t = await fetch(n);
    if (!t.ok) throw Error(`Failed to load shader from ${n}: ${t.statusText}`);
    return await t.text();
  }
  return n;
}
const Qe = (n) => class extends n {
  rotate(t = 0, e = 0, i = 0) {
    this.R.state.Jt(t), this.R.state.ts(e), this.R.state.ss(i);
  }
  rotateX(t) {
    if (t === void 0) return it(this.R.state.rotationX);
    this.R.state.Jt(t);
  }
  rotateY(t) {
    if (t === void 0) return it(this.R.state.rotationY);
    this.R.state.ts(t);
  }
  rotateZ(t) {
    if (t === void 0) return it(this.R.state.rotationZ);
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
    return E.En(t, e, i, s);
  }
  rect(t = 1, e = 1) {
    this.R.Ii(t, e);
  }
  point() {
    this.R.Ii(1, 1);
  }
  line(t, e, i, s) {
    this.R.Gi(t, e, i, s);
  }
  lineWeight(t) {
    if (t === void 0) return this.R.state.lineWeight;
    this.R.state.qt(t);
  }
  background(t, e, i, s = 255) {
    if (t === void 0) {
      const [h, a, c, l] = this.R.state.canvasBackgroundColor;
      return E.On(h, a, c, l);
    }
    const r = E.En(t, e, i, s);
    this.R.Ki(r.r, r.g, r.b, r.a);
  }
  char(t) {
    if (t === void 0) return this.R.state.characterString;
    let e;
    typeof t == "number" ? e = this.font.characters[t].character : e = t;
    const i = Array.from(e);
    if (i.length === 0) throw Error("char() requires at least one character.");
    const s = i[0];
    this.R.state.cs(this.font.Vr(s)), this.R.state.ls(s);
  }
  Xt(t, e, i, s) {
    if (t === void 0) {
      const [h, a, c, l] = this.R.state.charColor;
      return E.On(h, a, c, l);
    }
    const r = E.En(t, e, i, s);
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
      const [h, a, c, l] = this.R.state.cellColor;
      return E.On(h, a, c, l);
    }
    const r = E.En(t, e, i, s);
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
    this.R.ji(t / 2, e / 2);
  }
  triangle(t, e, i, s, r, h) {
    this.R.Qi(t, e, i, s, r, h);
  }
  bezierCurve(t, e, i, s, r, h, a, c) {
    this.R.Ni(t, e, i, s, r, h, a, c);
  }
  arc(t, e, i, s) {
    this.R.Xi(t / 2, e / 2, i, s);
  }
  shader(t) {
    this.R.Ri(t);
  }
  resetShader() {
    this.R.Li();
  }
  setUniform(t, e) {
    this.R._t(t, e);
  }
  setUniforms(t) {
    this.R.gt(t);
  }
  async createFilterShader(t) {
    const e = await nt(t), i = this.R.Di(e);
    return this.lc(i), i;
  }
  async createShader(t, e) {
    const i = await nt(t), s = await nt(e), r = this.R.ki(i, s);
    return this.lc(r), r;
  }
  createFramebuffer(t) {
    const e = this.R.Yi(t.width ?? this.grid.cols, t.height ?? this.grid.rows, t.attachments ?? 3);
    return this.lc(e), e;
  }
  image(t, e, i) {
    this.R.Oi(t, e, i, this.font), t instanceof st && this.R.Z();
  }
  async loadImage(t) {
    const e = t, i = new Promise((a, c) => {
      const l = new Image();
      l.crossOrigin = "anonymous", l.onload = () => a(l), l.onerror = (u) => c(u), l.src = e;
    }), [s] = await Promise.all([i, this.uc]), r = this.grid;
    if (!r) throw Error("[textmode.js] Cannot load image before grid initialization completes.");
    const h = V.Mh(this.R, this.Qn, s, r.cols, r.rows);
    return this.lc(h), h;
  }
  async loadVideo(t) {
    const [e] = await Promise.all([D.cc(t), this.uc]), i = this.grid;
    if (!i) throw Error("[textmode.js] Cannot load video before grid initialization completes.");
    const s = D.oc(this.R, this.Qn, e, i.cols, i.rows);
    return this.lc(s), s;
  }
  createTexture(t) {
    const e = this.grid, i = Z.oc(this.R, this.Qn, t, (e == null ? void 0 : e.cols) ?? 1, (e == null ? void 0 : e.rows) ?? 1);
    return this.lc(i), i;
  }
}, $e = (n) => class extends n {
  get frameCount() {
    return this.fc.Kh;
  }
  set frameCount(t) {
    this.fc.Kh = t;
  }
  frameRate(t) {
    return t === void 0 ? this.fc.Xh : this.fc.jh(t, () => this.dc());
  }
  targetFrameRate(t) {
    if (t === void 0) return this.fc.Yh;
    this.fc.Yh = t;
  }
  noLoop() {
    this.fc.Ih();
  }
  loop() {
    this.fc.Gh(() => this.dc());
  }
  redraw(t = 1) {
    if (wt.m(typeof t == "number" && t > 0 && Number.isInteger(t), "Redraw count must be a positive integer.", { method: "redraw", providedValue: t })) for (let e = 0; e < t; e++) this.dc();
  }
  isLooping() {
    return this.fc.Nh;
  }
  get millis() {
    return this.fc.Zh;
  }
  set millis(t) {
    this.fc.Zh = t;
  }
  get secs() {
    return this.fc.qh;
  }
  set secs(t) {
    this.fc.qh = t;
  }
  deltaTime() {
    return this.fc.Vh;
  }
}, qe = (n) => class extends n {
  constructor(...t) {
    super(...t);
  }
  mouseClicked(t) {
    this.sa.So(t);
  }
  mousePressed(t) {
    this.sa.Eo(t);
  }
  mouseReleased(t) {
    this.sa.ko(t);
  }
  mouseMoved(t) {
    this.sa.Ro(t);
  }
  mouseScrolled(t) {
    this.sa.Lo(t);
  }
  get mouse() {
    return this.sa.Do();
  }
  cursor(t) {
    this.sa.Ao(t);
  }
}, Ve = (n) => class extends n {
  constructor(...t) {
    super(...t);
  }
  touchStarted(t) {
    this.vc.Ia(t);
  }
  touchMoved(t) {
    this.vc.Ro(t);
  }
  touchEnded(t) {
    this.vc.Ga(t);
  }
  touchCancelled(t) {
    this.vc.ja(t);
  }
  tap(t) {
    this.vc.Qa(t);
  }
  doubleTap(t) {
    this.vc.Na(t);
  }
  longPress(t) {
    this.vc.Xa(t);
  }
  swipe(t) {
    this.vc.Ya(t);
  }
  pinch(t) {
    this.vc.Ka(t);
  }
  rotateGesture(t) {
    this.vc.Wa(t);
  }
  get touches() {
    return this.vc.Ba();
  }
}, Ze = (n) => class extends n {
  constructor(...t) {
    super(...t);
  }
  keyPressed(t) {
    this.gc.Eo(t);
  }
  keyReleased(t) {
    this.gc.ko(t);
  }
  isKeyPressed(t) {
    return this.gc.Ko(t);
  }
  get lastKeyPressed() {
    return this.gc.Zo();
  }
  get lastKeyReleased() {
    return this.gc.qo();
  }
  get pressedKeys() {
    return this.gc.Vo();
  }
  get modifierState() {
    return this.gc.Jo();
  }
};
class jt {
  constructor(t) {
    o(this, "mc");
    o(this, "_c", /* @__PURE__ */ new Map());
    o(this, "yc", []);
    o(this, "wc", /* @__PURE__ */ new Map());
    o(this, "bc", /* @__PURE__ */ new Map());
    o(this, "Cc", /* @__PURE__ */ new Map());
    o(this, "xc", /* @__PURE__ */ new Map());
    o(this, "Mc", /* @__PURE__ */ new Map());
    o(this, "Fc", /* @__PURE__ */ new Map());
    o(this, "$c", /* @__PURE__ */ new Map());
    o(this, "Pc", /* @__PURE__ */ new Map());
    this.mc = t;
  }
  Tc(t) {
    for (const e of t) {
      if (this._c.has(e.name)) return void console.warn(`[textmode.js] Plugin "${e.name}" is already installed.`);
      const i = this.Sc(e.name);
      try {
        const s = e.install(this.mc, i);
        s instanceof Promise && s.catch((r) => {
          console.error(`[textmode.js] Async plugin "${e.name}" installation error:`, r), this.Ec(e.name);
        });
      } catch (s) {
        throw this.Ec(e.name), s;
      }
      this._c.set(e.name, e), this.yc.push(e.name);
    }
  }
  async kc(t) {
    for (const e of t) {
      if (this._c.has(e.name)) return void console.warn(`[textmode.js] Plugin "${e.name}" is already installed.`);
      const i = this.Sc(e.name);
      try {
        await e.install(this.mc, i);
      } catch (s) {
        throw this.Ec(e.name), s;
      }
      this._c.set(e.name, e), this.yc.push(e.name);
    }
  }
  async Rc(t) {
    const e = this._c.get(t);
    if (!e) return;
    const i = this.Sc(t);
    e.uninstall && await e.uninstall(this.mc, i), this._c.delete(t), this.yc.splice(this.yc.indexOf(t), 1), this.Ec(t);
  }
  Lc() {
    this.Dc(this.wc, (t) => t());
  }
  Oc() {
    this.Dc(this.bc, (t) => t());
  }
  Hc(t) {
    this.Dc(this.Cc, (e) => e(t));
  }
  zc(t) {
    this.Dc(this.xc, (e) => e(t));
  }
  Bc(t) {
    this.Dc(this.Mc, (e) => e(t));
  }
  async Ic() {
    await this.Gc(this.Fc, (t) => t());
  }
  async jc() {
    await this.Gc(this.$c, (t) => t());
  }
  async Qc() {
    const t = [...this._c.keys()];
    for (const e of t) await this.Rc(e);
  }
  Sc(t) {
    const e = this.mc, i = this;
    return { get renderer() {
      return e.R;
    }, get canvas() {
      return e.nn;
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
    }, registerPreDrawHook: (s) => i.Nc(i.wc, t, s), registerPostDrawHook: (s) => i.Nc(i.bc, t, s), registerLayerDisposedHook: (s) => i.Nc(i.Cc, t, s), registerLayerPreRenderHook: (s) => i.Nc(i.xc, t, s), registerLayerPostRenderHook: (s) => i.Nc(i.Mc, t, s), registerPreSetupHook: (s) => i.Nc(i.Fc, t, s), registerPostSetupHook: (s) => i.Nc(i.$c, t, s), extendLayer: (s, r) => {
      i.Xc(t, s, r);
    }, removeLayerExtension: (s) => {
      i.Yc(t, s);
    } };
  }
  Nc(t, e, i) {
    const s = t.get(e) ?? /* @__PURE__ */ new Set();
    return s.add(i), t.set(e, s), () => {
      const r = t.get(e);
      r && (r.delete(i), r.size === 0 && t.delete(e));
    };
  }
  Ec(t) {
    this.wc.delete(t), this.bc.delete(t), this.Cc.delete(t), this.xc.delete(t), this.Mc.delete(t), this.Fc.delete(t), this.$c.delete(t);
    const e = this.Pc.get(t);
    if (e) {
      for (const i of e.keys()) this.Kc(i);
      this.Pc.delete(t);
    }
  }
  Dc(t, e) {
    for (const i of this.yc) {
      const s = t.get(i);
      s && s.forEach(e);
    }
  }
  async Gc(t, e) {
    for (const i of this.yc) {
      const s = t.get(i);
      if (s) for (const r of s) await e(r);
    }
  }
  Xc(t, e, i) {
    let s = this.Pc.get(t);
    s || (s = /* @__PURE__ */ new Map(), this.Pc.set(t, s));
    for (const [r, h] of this.Pc) r !== t && h.has(e) && console.warn(`[textmode.js] Plugin "${t}" is overwriting layer method "${e}" previously added by plugin "${r}".`);
    s.set(e, i), this.Wc(e, i);
  }
  Yc(t, e) {
    const i = this.Pc.get(t);
    if (!i) return;
    i.delete(e);
    let s = !1;
    for (const [r, h] of this.Pc) if (r !== t && h.has(e)) {
      s = !0;
      const a = h.get(e);
      this.Wc(e, a);
      break;
    }
    s || this.Kc(e);
  }
  Wc(t, e) {
    const i = Object.getPrototypeOf(this.mc.layers.base);
    Object.defineProperty(i, t, { value: e, writable: !0, configurable: !0, enumerable: !1 });
  }
  Kc(t) {
    const e = Object.getPrototypeOf(this.mc.layers.base), i = Object.getOwnPropertyDescriptor(e, t);
    i && i.configurable && delete e[t];
  }
}
const si = Object.freeze(Object.defineProperty({ __proto__: null, TextmodePluginManager: jt }, Symbol.toStringTag, { value: "Module" })), q = `#version 300 es
layout(location=0)in vec2 A;layout(location=1)in vec2 B;out vec2 v_uv;void main(){v_uv=B;gl_Position=vec4(A,0.,1.);}`, Gt = `#version 300 es
precision highp float;uniform sampler2D u_texture;in vec2 v_uv;out vec4 fragColor;void main(){fragColor=texture(u_texture,v_uv);}`;
class Qt {
  constructor() {
    o(this, "Zc", /* @__PURE__ */ new Map());
    o(this, "qc", []);
    o(this, "Vc", 0);
    o(this, "Jc", 0);
    o(this, "tl");
  }
  get sl() {
    return this.Vc;
  }
  get el() {
    if (this.Vc === 0) return 0;
    let t = 0;
    for (const e of this.qc) {
      const i = this.Zc.get(e);
      i && (t += L(i.progress, 0, 1) * i.weight);
    }
    return Math.min(1, t / this.Vc);
  }
  il(t) {
    this.tl = t;
  }
  rl(t, e = 1) {
    const i = `phase-${this.qc.length + 1}-${Date.now()}`, s = { id: i, label: t, weight: Math.max(1e-3, e), progress: 0, status: "running" };
    return this.Zc.set(i, s), this.qc.push(i), this.Vc += s.weight, i;
  }
  nl(t, e) {
    const i = this.Zc.get(t);
    if (!i) return;
    i.progress = L(e, 0, 1), i.status = i.progress >= 1 ? "complete" : "running";
    const s = this.el;
    Math.abs(s - this.Jc) > 1e-3 && (this.Jc = s, this.tl && this.tl(s));
  }
  hl(t) {
    const e = this.Zc.get(t);
    e && (e.progress = 1, e.status = "complete", this.nl(t, 1));
  }
  ol(t) {
    const e = this.Zc.get(t);
    e && (e.status = "failed");
  }
  al() {
    return this.qc.map((t) => {
      const e = this.Zc.get(t);
      return e ? { id: e.id, label: e.label, weight: e.weight, progress: e.progress, status: e.status } : { id: t, label: t, weight: 1, progress: 0, status: "pending" };
    });
  }
}
class $t {
  constructor(t = "active") {
    o(this, "cl");
    o(this, "ll", "");
    o(this, "ul", "");
    this.cl = t;
  }
  get fl() {
    return this.cl;
  }
  get dl() {
    return this.cl !== "disabled";
  }
  get pl() {
    return this.cl === "active" || this.cl === "transitioning" || this.cl === "error";
  }
  get vl() {
    return this.ll;
  }
  get ml() {
    return this.ul;
  }
  _l() {
    this.cl !== "done" && this.cl !== "transitioning" || (this.cl = "active");
  }
  yl() {
    this.cl !== "disabled" && (this.cl = "done");
  }
  Al() {
    this.cl !== "disabled" && (this.cl = "transitioning");
  }
  wl() {
    this.cl === "transitioning" && (this.cl = "done");
  }
  bl(t) {
    this.cl !== "disabled" && (this.cl = "error", t instanceof Error ? (this.ll = t.message, this.ul = t.stack || "") : (this.ll = t, this.ul = ""));
  }
  Cl() {
    this.cl = "disabled";
  }
}
class qt {
  constructor(t, e) {
    o(this, "xl", 0);
    o(this, "Ml", 1);
    o(this, "Fl");
    o(this, "$l");
    this.Fl = t, this.$l = e;
  }
  get Pl() {
    return this.Ml;
  }
  get Tl() {
    return this.Ml < 1;
  }
  zh() {
    this.Fl !== "none" && this.$l > 0 && (this.xl = performance.now());
  }
  N() {
    if (this.Fl === "none" || this.$l === 0) return this.Ml = 1, !1;
    const t = performance.now() - this.xl, e = Math.min(1, t / this.$l);
    return e >= 1 ? (this.Ml = 0, !0) : (this.Ml = 1 - e, !1);
  }
  Qs() {
    this.Ml = 1, this.xl = 0;
  }
}
function yt(n, t) {
  const e = n.tone ?? "auto";
  let i = "dark";
  return e === "light" || e === "dark" ? i = e : t && (i = function(s) {
    if (!s) return 0;
    const [r, h, a] = s.map((l) => l / 255), c = (l) => l <= 0.04045 ? l / 12.92 : Math.pow((l + 0.055) / 1.055, 2.4);
    return 0.2126 * c(r) + 0.7152 * c(h) + 0.0722 * c(a);
  }(t) > 0.5 ? "light" : "dark"), { mode: i, background: t, textColor: i === "light" ? "#1A1A1A" : "#F8F8F8", subtleColor: i === "light" ? "#4A4A4A" : "#C0C0C0" };
}
function Vt(n) {
  return n.mode === "light" ? ["#E91E63", "#9C27B0", "#FF6F00"] : ["#8EF9F3", "#F15BB5", "#FF9B71"];
}
function Zt(n, t) {
  return n.length ? n.map((e) => E.En(e)) : [t.color("#FFFFFF")];
}
class Wt {
  constructor(t, e, i, s) {
    this.Sl = t, this.id = e, this.label = i, this.El = s;
  }
  report(t) {
    this.Sl.nl(this.id, t);
  }
  complete() {
    this.Sl.hl(this.id);
  }
  fail(t) {
    this.Sl.ol(this.id), this.El && this.El(t ?? Error(`Loading phase "${this.label}" failed`));
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
const We = ({ textmodifier: n, grid: t, progress: e, frameCount: i, message: s, palette: r, theme: h, phases: a, transitionOpacity: c, isError: l, errorMessage: u }) => {
  const f = "|/-\\", p = Math.floor(i / 6) % 4, m = E.En(h.textColor), g = Math.floor(255 * c), d = n.color(m.r, m.g, m.b, g);
  if (n.charColor(d), n.cellColor(0, 0, 0, 0), l) {
    const A = E.En(h.mode === "light" ? "#D32F2F" : "#FF6B6B").withAlpha(g);
    n.charColor(A), n.push(), n.translate(0, -2, 0), n.char("X"), n.rect(1, 1), n.pop();
    const v = "SETUP ERROR", w = -Math.floor(v.length / 2);
    n.push(), n.translate(w, 0, 0);
    for (const y of v) n.char(y), n.rect(1, 1), n.translateX(1);
    if (n.pop(), u) {
      const y = E.En(h.subtleColor), R = n.color(y.r, y.g, y.b, g);
      n.charColor(R);
      const b = Math.floor(0.8 * t.cols), F = u.split(" "), C = [];
      let T = "";
      for (const P of F) (T + " " + P).length <= b ? T = T ? T + " " + P : P : (T && C.push(T), T = P);
      T && C.push(T);
      const B = C.slice(0, 3);
      C.length > 3 && (B[2] = B[2].substring(0, b - 3) + "..."), B.forEach((P, W) => {
        const se = -Math.floor(P.length / 2);
        n.push(), n.translate(se, 3 + W, 0);
        for (const re of P) n.char(re), n.rect(1, 1), n.translateX(1);
        n.pop();
      });
    }
    return;
  }
  if (n.push(), n.translate(0, 0, 0), n.char(f[p]), n.rect(1, 1), n.pop(), e > 0 || a.some((A) => A.status !== "pending")) {
    const A = Math.max(6, Math.floor(0.6 * t.cols)), v = -Math.floor(A / 2), w = Math.floor(A * e), y = r.length ? r : [n.color("#FFFFFF")];
    n.push(), n.translate(v, 3, 0);
    for (let R = 0; R < A; R++) {
      const b = R < w ? "*" : ".", F = y[R % y.length], C = n.color(F.r, F.g, F.b, g);
      n.charColor(C), n.char(b), n.rect(1, 1), n.translateX(1);
    }
    n.pop();
  }
  if (s) {
    const A = E.En(h.subtleColor), v = n.color(A.r, A.g, A.b, g);
    n.charColor(v);
    const w = -Math.floor(s.length / 2);
    n.push(), n.translate(w, 5, 0);
    for (const y of s) n.char(y), n.rect(1, 1), n.translateX(1);
    n.pop();
  }
};
class ct {
  constructor(t, e = {}) {
    o(this, "kl");
    o(this, "Pl");
    o(this, "Rl");
    o(this, "Ll");
    o(this, "Dl");
    o(this, "Ol");
    o(this, "Hl");
    o(this, "zl");
    o(this, "Bl");
    o(this, "Il");
    o(this, "kr");
    o(this, "Gl");
    o(this, "jl");
    o(this, "Ql");
    o(this, "Nl");
    o(this, "Xl", () => {
    });
    o(this, "Yl", []);
    o(this, "Kl", /* @__PURE__ */ new Map());
    this.kl = e.visible ?? !0, this.Pl = e.opacity ?? 1, this.Rl = e.blendMode ?? "normal", this.Ll = e.offsetX ?? 0, this.Dl = e.offsetY ?? 0, this.Ol = e.rotationZ ?? 0, this.Hl = e.fontSize ?? 16, this.zl = e.fontSource, e.fontSource instanceof H ? this.kr = e.fontSource : this.kr = new H(t, this.Hl);
  }
  async Wl(t) {
    this.Bl = t, this.kr.tn || await this.kr.Qr(this.zl);
    const e = this.kr.maxGlyphDimensions;
    this.Il = new ke(this.Bl.canvas.canvas, e.width, e.height);
    const i = this.Il;
    this.Gl = this.Bl.createFramebuffer(i.cols, i.rows, 3), this.jl = this.Bl.createFramebuffer(i.width, i.height, 1), this.Ql = this.Bl.createFramebuffer(i.width, i.height, 1), this.Nl = [this.Bl.createFramebuffer(i.width, i.height, 1, { depth: !1 }), this.Bl.createFramebuffer(i.width, i.height, 1, { depth: !1 })], this.Il.fn(() => {
      var s, r, h;
      this.Gl.resize(this.Il.cols, this.Il.rows), this.jl.resize(this.Il.width, this.Il.height), (s = this.Ql) == null || s.resize(this.Il.width, this.Il.height), (r = this.Nl) == null || r[0].resize(this.Il.width, this.Il.height), (h = this.Nl) == null || h[1].resize(this.Il.width, this.Il.height);
    });
  }
  draw(t) {
    this.Xl = t;
  }
  show() {
    this.kl = !0;
  }
  hide() {
    this.kl = !1;
  }
  opacity(t) {
    if (t === void 0) return this.Pl;
    this.Pl = L(t, 0, 1);
  }
  blendMode(t) {
    if (t === void 0) return this.Rl;
    this.Rl = t;
  }
  offset(t, e = 0) {
    if (t === void 0) return { x: this.Ll, y: this.Dl };
    this.Ll = t, this.Dl = e;
  }
  rotateZ(t) {
    if (t === void 0) return this.Ol;
    this.Ol = t;
  }
  filter(t, e) {
    this.Yl.push({ name: t, params: e });
  }
  setPluginState(t, e) {
    this.Kl.set(t, e);
  }
  getPluginState(t) {
    return this.Kl.get(t);
  }
  hasPluginState(t) {
    return this.Kl.has(t);
  }
  deletePluginState(t) {
    return this.Kl.delete(t);
  }
  fontSize(t) {
    if (t === void 0) return this.kr.fontSize;
    wt.m(typeof t == "number" && t > 0, "Font size must be a positive number greater than 0.", { method: "fontSize", providedValue: t }) && this.kr.fontSize !== t && (this.kr.Yr(t), this.Zl());
  }
  async loadFont(t) {
    if (!this.kr) throw Error("Layer font not initialized. Ensure layer is attached before loading fonts.");
    return t instanceof H ? (this.kr !== t && this.kr.dispose(), this.kr = t, this.kr.tn || await this.kr.Qr()) : await this.kr.Wr(t), this.Zl(), this.kr;
  }
  dc(t, e) {
    if (!this.kl || !this.Gl || !this.jl) return;
    const i = this.Bl.renderer, s = this.Il;
    t.ql.zc(this), this.Gl.begin(), i.state.Vt(), t.Vl = this;
    try {
      this.Xl.call(t);
    } finally {
      t.Vl = void 0;
    }
    this.Gl.end(), t.ql.Bc(this);
    const r = this.Yl.length > 0, h = r ? this.Ql : this.jl;
    h.begin(), i.Pi(e), e.gt({ u_characterTexture: this.kr.fontFramebuffer, u_charsetDimensions: [this.kr.textureColumns, this.kr.textureRows], Ud: this.Gl.textures[0], Ue: this.Gl.textures[1], Uf: this.Gl.textures[2], Ug: [s.cols, s.rows], Uh: [h.width, h.height], Ui: [0, 0, 0, 0] }), i.Bi(0, 0, s.width, s.height), h.end(), r && this.Bl.filterManager.Jl(this.Ql.textures[0], this.jl, this.Yl, this.jl.width, this.jl.height, this.Nl), this.Yl = [];
  }
  $n() {
    var t;
    this.Gl && this.jl && ((t = this.Il) == null || t.reset());
  }
  Ss() {
    var t, e, i, s, r, h, a;
    (t = this.Gl) == null || t.dispose(), (e = this.jl) == null || e.dispose(), (i = this.Ql) == null || i.dispose(), (s = this.Nl) == null || s[0].dispose(), (r = this.Nl) == null || r[1].dispose(), (h = this.kr) == null || h.dispose(), (a = this.Il) == null || a.Ss();
  }
  get texture() {
    var t;
    return (t = this.jl) == null ? void 0 : t.textures[0];
  }
  get grid() {
    return this.Il;
  }
  get font() {
    return this.kr;
  }
  get width() {
    return this.jl ? this.jl.width : 0;
  }
  get height() {
    return this.jl ? this.jl.height : 0;
  }
  get drawFramebuffer() {
    return this.Gl;
  }
  get asciiFramebuffer() {
    return this.jl;
  }
  Zl() {
    if (!this.Il || !this.kr) return;
    const t = this.kr.maxGlyphDimensions;
    this.Il.pn(t.width, t.height), this.Gl && this.jl && this.$n();
  }
}
const Ke = { message: "LOADING...", tone: "auto", transition: "fade", transitionDuration: 500 };
class Kt {
  constructor(t, e, i) {
    o(this, "mc");
    o(this, "l");
    o(this, "tu");
    o(this, "Sl");
    o(this, "su");
    o(this, "eu");
    o(this, "iu");
    o(this, "ru");
    o(this, "nu", []);
    o(this, "hu");
    o(this, "ou", performance.now());
    o(this, "au", 0);
    o(this, "cu", !1);
    o(this, "jr", !1);
    o(this, "du");
    this.mc = t, this.l = { ...Ke, ...e ?? {} }, this.tu = new $t("active"), this.Sl = new Qt(), this.su = new qt(this.l.transition, this.l.transitionDuration), this.eu = new zt(60), this.hu = yt(this.l, i);
    const s = Vt(this.hu);
    this.nu = Zt(s, this.mc), this.ru = this.lu(), this.Sl.il((r) => {
      r >= 0.999 && this.yl();
    });
  }
  async Qr() {
    if (this.jr) return;
    const t = this.mc.R, e = this.mc.nn;
    this.iu = new ct(t, { visible: !0, opacity: 1, fontSize: 16 }), await this.iu.Wl({ renderer: t, canvas: e, filterManager: null, createFramebuffer: (i, s, r = 1, h) => t.Yi(i, s, r, h) }), this.jr = !0;
  }
  get pl() {
    return this.tu.pl && this.cu;
  }
  zh() {
    this.cu || (this.cu = !0, this.ou = performance.now(), this.au = 0, this.eu.zh(() => this.uu()));
  }
  Bh() {
    this.cu && (this.cu = !1, this.eu.Bh());
  }
  $n() {
    this.jr && this.iu.$n();
  }
  Ss() {
    this.Bh(), this.jr && (this.iu.Ss(), this.jr = !1);
  }
  get progress() {
    return this.Sl.el;
  }
  message(t) {
    return typeof t == "string" && (this.l.message = t), this.l.message;
  }
  addPhase(t, e = 1) {
    this.tu._l();
    const i = this.Sl.rl(t, e);
    return new Wt(this.Sl, i, t, (s) => this.error(s));
  }
  yl() {
    this.tu.fl !== "error" && (this.l.transition !== "none" && this.l.transitionDuration > 0 ? (this.tu.Al(), this.su.zh()) : (this.tu.yl(), this.Bh(), this.fu()));
  }
  fu() {
    this.du && this.du();
  }
  pu(t) {
    this.du = t;
  }
  error(t) {
    this.tu.bl(t);
  }
  uu() {
    if (this.tu.pl) {
      if (this.au++, this.tu.fl === "transitioning" && this.su.N())
        return this.tu.wl(), this.fu(), void this.Bh();
      this.vu();
    }
  }
  vu() {
    if (!this.jr) return;
    const t = this.iu, e = t.grid, i = this.mc.R, s = { textmodifier: this.mc, grid: e, progress: this.progress, elapsedMs: performance.now() - this.ou, frameCount: this.au, message: this.l.message, palette: this.nu, theme: this.hu, phases: this.Sl.al(), transitionOpacity: this.su.Pl, isError: this.tu.fl === "error", errorMessage: this.tu.vl || void 0, errorDetails: this.tu.ml || void 0 };
    t.draw(() => {
      this.mc.resetShader(), this.mc.clear(), this.mc.push();
      try {
        this.ru(s);
      } finally {
        this.mc.pop();
      }
    }), t.dc(this.mc, this.mc.gu);
    const r = t.texture;
    r && (i.xe(...i.state.canvasBackgroundColor), i.Pi(this.mc.mu), this.mc.mu.gt({ u_texture: r }), i.Bi(e.offsetX, e.offsetY, e.width, e.height));
  }
  _u(t) {
    this.hu = yt(this.l, t);
  }
  lu() {
    const t = this.l.renderer || We;
    return (e) => {
      t(e), this.yu(e);
    };
  }
  yu(t) {
    const { textmodifier: e, grid: i, frameCount: s, theme: r, transitionOpacity: h } = t, a = [116, 101, 120, 116, 109, 111, 100, 101, 46, 106, 115].map((f) => String.fromCharCode(f)).join(""), c = (i.rows + 1 >> 1) - 2, l = 2 - (i.cols + 1 >> 1), u = r.mode === "light" ? [[233, 30, 99], [156, 39, 176], [255, 111, 0]] : [[142, 249, 243], [241, 91, 181], [255, 155, 113]];
    e.push(), e.translate(l, c, 0);
    for (let f = 0; f < a.length; f++) {
      const p = a[f], m = Math.floor(0.1 * s + 0.5 * f) % u.length, [g, d, A] = u[m], v = Math.floor(255 * h), w = e.color(g, d, A, v);
      e.charColor(w), e.char(p), e.point(), e.translateX(1);
    }
    e.pop();
  }
}
const Ft = { normal: 0, additive: 1, multiply: 2, screen: 3, subtract: 4, darken: 5, lighten: 6, overlay: 7, softLight: 8, hardLight: 9, colorDodge: 10, colorBurn: 11, difference: 12, exclusion: 13 };
class Jt {
  constructor(t, e, i) {
    o(this, "R");
    o(this, "Au");
    o(this, "Nl");
    o(this, "wu", 0);
    this.R = t, this.Au = t.ki(q, `#version 300 es
precision highp float;uniform sampler2D Uj;uniform sampler2D Uk;uniform vec2 Ul;uniform vec2 Um;uniform vec2 Un;uniform float Uo;uniform float Up;uniform int Uq;in vec2 v_uv;out vec4 fragColor;const int A=0;const int B=1;const int C=2;const int D=3;const int E=4;const int F=5;const int G=6;const int H=7;const int I=8;const int J=9;const int K=10;const int L=11;const int M=12;const int N=13;vec3 O(vec3 P,vec3 Q){return Q;}vec3 R(vec3 P,vec3 Q){return P+Q;}vec3 S(vec3 P,vec3 Q){return P*Q;}vec3 T(vec3 P,vec3 Q){return 1.-(1.-P)*(1.-Q);}vec3 U(vec3 P,vec3 Q){return max(P-Q,0.);}vec3 V(vec3 P,vec3 Q){return min(P,Q);}vec3 W(vec3 P,vec3 Q){return max(P,Q);}vec3 X(vec3 P,vec3 Q){return mix(2.*P*Q,1.-2.*(1.-P)*(1.-Q),step(0.5,P));}vec3 Y(vec3 P,vec3 Q){return mix(P-(1.-2.*Q)*P*(1.-P),mix(P+(2.*Q-1.)*(P*(3.-2.*P)-P),P+(2.*Q-1.)*(sqrt(P)-P),step(0.25,P)),step(0.5,Q));}vec3 Z(vec3 P,vec3 Q){return mix(2.*P*Q,1.-2.*(1.-P)*(1.-Q),step(0.5,Q));}vec3 a(vec3 P,vec3 Q){return mix(min(vec3(1.),P/max(1.-Q,0.0001)),vec3(1.),step(1.,Q));}vec3 b(vec3 P,vec3 Q){return mix(1.-min(vec3(1.),(1.-P)/max(Q,0.0001)),vec3(0.),step(Q,vec3(0.)));}vec3 c(vec3 P,vec3 Q){return abs(P-Q);}vec3 d(vec3 P,vec3 Q){return P+Q-2.*P*Q;}vec3 e(int f,vec3 P,vec3 Q){if(f==A)return O(P,Q);if(f==B)return R(P,Q);if(f==C)return S(P,Q);if(f==D)return T(P,Q);if(f==E)return U(P,Q);if(f==F)return V(P,Q);if(f==G)return W(P,Q);if(f==H)return X(P,Q);if(f==I)return Y(P,Q);if(f==J)return Z(P,Q);if(f==K)return a(P,Q);if(f==L)return b(P,Q);if(f==M)return c(P,Q);if(f==N)return d(P,Q);return O(P,Q);}void main(){vec4 g=texture(Uk,v_uv);vec2 h=v_uv*Ul;vec2 i=h-Un;vec2 j=Um*0.5;vec2 k=i-j;float l=cos(-Up);float m=sin(-Up);vec2 n=vec2(k.x*l-k.y*m,k.x*m+k.y*l);i=n+j;bool o=any(lessThan(i,vec2(0.)))||any(greaterThanEqual(i,Um));if(o){fragColor=g;return;}vec2 p=(floor(i)+0.5)/Um;vec4 q=texture(Uj,p);float r=q.a*Uo;if(r<=0.){fragColor=g;return;}vec3 s=e(Uq,g.rgb,q.rgb);vec3 t=mix(g.rgb,s,r);float u=g.a+r*(1.-g.a);fragColor=vec4(t,u);}`), this.Nl = [this.R.Yi(e, i, 1), this.R.Yi(e, i, 1)];
  }
  bu(t) {
    const { base: e, targetFramebuffer: i, backgroundColor: s, layers: r, canvasWidth: h, canvasHeight: a } = t, c = this.R.Ji(), l = this.R.tr();
    this.R.qi(!1), this.R.Vi(!1);
    const u = this.Nl[0];
    u.begin(), this.R.xe(...s), u.end(), this.wu = 0, e.layer.kl && this.Cu(e.texture, h, a, e.width, e.height, e.layer.Pl, e.offsetX, e.offsetY, e.layer.Ol, "normal");
    for (const f of r) {
      const p = f.layer;
      p.kl && this.Cu(f.texture, h, a, f.width, f.height, p.Pl, f.offsetX, f.offsetY, p.Ol, p.Rl);
    }
    this.xu(i, h, a), this.R.Vi(l), this.R.qi(c);
  }
  Cu(t, e, i, s, r, h, a, c, l, u) {
    const f = this.Nl[this.wu], p = this.wu === 0 ? 1 : 0, m = this.Nl[p], g = X(l);
    m.begin(), this.R.Pi(this.Au), this.Au.gt({ Uj: t, Uk: f.textures[0], Ul: [e, i], Um: [s, r], Un: [a, c], Uo: h, Up: g, Uq: Ft[u] }), this.R.Bi(0, 0, f.width, f.height), m.end(), this.wu = p;
  }
  xu(t, e, i) {
    const s = this.Nl[this.wu];
    t.begin(), this.R.Pi(this.Au), this.Au.gt({ Uj: s.textures[0], Uk: s.textures[0], Ul: [e, i], Um: [s.width, s.height], Un: [0, 0], Uo: 1, Up: 0, Uq: Ft.normal }), this.R.Bi(0, 0, e, i), t.end();
  }
  $n(t, e) {
    this.Nl[0].resize(t, e), this.Nl[1].resize(t, e);
  }
  Ss() {
    this.Au.dispose(), this.Nl[0].dispose(), this.Nl[1].dispose();
  }
}
class Je {
  constructor(t = {}) {
    o(this, "Mu", []);
    o(this, "Fu", []);
    o(this, "$u", !1);
    o(this, "l");
    this.l = t;
  }
  async initialize(t) {
    var e, i;
    for (const s of this.Fu) t && await t(s), this.Mu.push(s), (i = (e = this.l).onAdd) == null || i.call(e, s);
    this.Fu = [], this.$u = !0;
  }
  get isReady() {
    return this.$u;
  }
  add(t) {
    var e, i;
    return this.$u ? (this.Mu.push(t), (i = (e = this.l).onAdd) == null || i.call(e, t)) : this.Fu.push(t), t;
  }
  addMany(t) {
    for (const e of t) this.add(e);
    return t;
  }
  remove(t) {
    const e = this.Mu.indexOf(t);
    if (e !== -1) return this.Mu.splice(e, 1), this.Pu(t), !0;
    const i = this.Fu.indexOf(t);
    return i !== -1 && (this.Fu.splice(i, 1), this.Pu(t), !0);
  }
  removeAt(t) {
    if (t < 0 || t >= this.Mu.length) return;
    const [e] = this.Mu.splice(t, 1);
    return this.Pu(e), e;
  }
  move(t, e) {
    var r, h;
    const i = this.Mu.indexOf(t);
    if (i !== -1) {
      this.Mu.splice(i, 1);
      const a = L(e, 0, this.Mu.length);
      return this.Mu.splice(a, 0, t), (h = (r = this.l).onMove) == null || h.call(r, t, i, a), !0;
    }
    const s = this.Fu.indexOf(t);
    if (s !== -1) {
      this.Fu.splice(s, 1);
      const a = L(e, 0, this.Fu.length);
      return this.Fu.splice(a, 0, t), !0;
    }
    return !1;
  }
  swap(t, e) {
    var a, c;
    if (t === e) return !0;
    const i = this.Mu.indexOf(t), s = this.Mu.indexOf(e);
    if (i !== -1 && s !== -1) return this.Mu[i] = e, this.Mu[s] = t, (c = (a = this.l).onSwap) == null || c.call(a, t, e, i, s), !0;
    const r = this.Fu.indexOf(t), h = this.Fu.indexOf(e);
    return r !== -1 && h !== -1 && (this.Fu[r] = e, this.Fu[h] = t, !0);
  }
  clear() {
    for (const t of this.Mu) this.Pu(t);
    this.Mu = [];
    for (const t of this.Fu) this.Pu(t);
    this.Fu = [];
  }
  dispose() {
    this.clear(), this.$u = !1;
  }
  get all() {
    return this.Mu;
  }
  get pending() {
    return this.Fu;
  }
  get length() {
    return this.Mu.length;
  }
  get totalLength() {
    return this.Mu.length + this.Fu.length;
  }
  get isEmpty() {
    return this.Mu.length === 0;
  }
  get(t) {
    return this.Mu[t];
  }
  get first() {
    return this.Mu[0];
  }
  get last() {
    return this.Mu[this.Mu.length - 1];
  }
  indexOf(t) {
    return this.Mu.indexOf(t);
  }
  has(t) {
    return this.Mu.includes(t) || this.Fu.includes(t);
  }
  [Symbol.iterator]() {
    return this.Mu[Symbol.iterator]();
  }
  Pu(t) {
    var e, i, s, r;
    (i = (e = this.l).onRemove) == null || i.call(e, t), (r = (s = this.l).onDispose) == null || r.call(s, t);
  }
}
class te {
  constructor(t) {
    o(this, "R");
    o(this, "Tu", /* @__PURE__ */ new Map());
    o(this, "Su", /* @__PURE__ */ new Map());
    o(this, "Ke");
    o(this, "Nl");
    o(this, "jr", !1);
    this.R = t, this.Ke = t.ki(q, Gt), this.Eu();
  }
  async register(t, e, i = {}) {
    const s = Object.entries(i), r = s.length > 0 ? s[0][1][0] : null;
    let h;
    if (typeof e == "string") {
      const c = await nt(e);
      h = this.R.ki(q, c), this.Su.set(t, h);
    } else h = e, this.Su.set(t, h);
    const a = { id: t, createShader: () => h, createUniforms: (c, l) => {
      const u = { u_resolution: [l.width, l.height] };
      for (const [f, [p, m]] of s) {
        let g = m;
        if (c != null) {
          if (typeof c == "number" && p === r) g = c;
          else if (typeof c == "object" && p in c) {
            const d = c[p];
            Ut(d) && (g = d);
          }
        }
        u[f] = g;
      }
      return u;
    } };
    this.Tu.set(t, a);
  }
  unregister(t) {
    const e = this.Su.get(t);
    return e && (e.dispose(), this.Su.delete(t)), this.Tu.delete(t);
  }
  has(t) {
    return this.Tu.has(t);
  }
  Qr(t, e) {
    this.jr || (this.Nl = [this.R.Yi(t, e, 1, { depth: !1 }), this.R.Yi(t, e, 1, { depth: !1 })], this.jr = !0);
  }
  ku(t, e, i, s, r) {
    this.Nl[0].width === s && this.Nl[0].height === r || (this.Nl[0].resize(s, r), this.Nl[1].resize(s, r)), this.Jl(t, e, i, s, r, this.Nl);
  }
  Jl(t, e, i, s, r, h) {
    if (i.length === 0) return void this.Ru(t, e, s, r);
    this.Ru(t, h[0], s, r);
    let a = 0;
    for (let c = 0; c < i.length; c++) {
      const l = i[c], u = c === i.length - 1, f = a === 0 ? 1 : 0, p = u ? e : h[f];
      this.Lu(l, h[a], p, s, r), u || (a = f);
    }
  }
  Lu(t, e, i, s, r) {
    const h = this.Tu.get(t.name);
    if (!h) return console.warn(`[textmode.js] Unknown filter: "${t.name}". Skipping.`), void this.Ru(e.textures[0], i, s, r);
    const a = this.Du(t.name, h, s, r), c = { renderer: this.R, gl: this.R.context, width: s, height: r };
    i.begin(), this.R.Pi(a), a.gt({ u_texture: e.textures[0] });
    const l = h.createUniforms(t.params, c);
    a.gt(l), this.R.Bi(0, 0, s, r), i.end();
  }
  Du(t, e, i, s) {
    let r = this.Su.get(t);
    if (!r && e) {
      const h = { renderer: this.R, gl: this.R.context, width: i, height: s };
      r = e.createShader(h), this.Su.set(t, r);
    }
    return r;
  }
  Ru(t, e, i, s) {
    e.begin(), this.R.Pi(this.Ke), this.Ke.gt({ u_texture: t, u_resolution: [i, s] }), this.R.Bi(0, 0, i, s), e.end();
  }
  $n(t, e) {
    this.Nl && (this.Nl[0].resize(t, e), this.Nl[1].resize(t, e));
  }
  Ss() {
    for (const t of this.Su.values()) t.dispose();
    this.Su.clear(), this.Tu.clear(), this.Ke.dispose(), this.Nl && (this.Nl[0].dispose(), this.Nl[1].dispose()), this.jr = !1;
  }
  Eu() {
    this.register("invert", `#version 300 es
precision highp float;uniform sampler2D u_texture;in vec2 v_uv;out vec4 fragColor;void main(){vec4 A=texture(u_texture,v_uv);fragColor=vec4(1.-A.rgb,A.a);}`, {}), this.register("grayscale", `#version 300 es
precision highp float;uniform sampler2D u_texture;uniform float U8;in vec2 v_uv;out vec4 fragColor;void main(){vec4 A=texture(u_texture,v_uv);float B=dot(A.rgb,vec3(0.299,0.587,0.114));vec3 C=mix(A.rgb,vec3(B),U8);fragColor=vec4(C,A.a);}`, { U8: ["amount", 1] }), this.register("sepia", `#version 300 es
precision highp float;uniform sampler2D u_texture;uniform float U8;in vec2 v_uv;out vec4 fragColor;void main(){vec4 A=texture(u_texture,v_uv);vec3 B;B.r=dot(A.rgb,vec3(0.393,0.769,0.189));B.g=dot(A.rgb,vec3(0.349,0.686,0.168));B.b=dot(A.rgb,vec3(0.272,0.534,0.131));vec3 C=mix(A.rgb,B,U8);fragColor=vec4(C,A.a);}`, { U8: ["amount", 1] }), this.register("threshold", `#version 300 es
precision highp float;uniform sampler2D u_texture;uniform float Uc;in vec2 v_uv;out vec4 fragColor;void main(){vec4 A=texture(u_texture,v_uv);float B=dot(A.rgb,vec3(0.299,0.587,0.114));float C=step(Uc,B);fragColor=vec4(vec3(C),A.a);}`, { Uc: ["threshold", 0.5] });
  }
}
const ri = Object.freeze(Object.defineProperty({ __proto__: null, TextmodeFilterManager: te }, Symbol.toStringTag, { value: "Module" }));
class ee {
  constructor(t, e) {
    o(this, "mc");
    o(this, "R");
    o(this, "Ou");
    o(this, "Hu");
    o(this, "zu");
    o(this, "Bu");
    o(this, "$u", !1);
    o(this, "Iu", /* @__PURE__ */ new Set());
    o(this, "Gu", []);
    o(this, "ju");
    o(this, "Qu");
    this.mc = t, this.R = t.R, this.Hu = new te(this.R), this.Ou = new Jt(this.R, this.mc.nn.width, this.mc.nn.height), this.zu = new Je({ onRemove: (i) => this.mc.ql.Hc(i), onDispose: (i) => i == null ? void 0 : i.Ss() }), this.Bu = new ct(this.R, { visible: !0, opacity: 1, fontSize: e.fontSize, fontSource: e.fontSource });
  }
  async Qr() {
    await this.Nu(this.Bu);
    const t = this.mc.nn;
    this.ju = this.R.Yi(t.width, t.height, 1), this.Qu = this.R.Yi(t.width, t.height, 1), this.Hu.Qr(t.width, t.height), await this.zu.initialize((e) => this.Nu(e)), this.$u = !0;
  }
  Xu(t, e) {
    this.Gu.push({ name: t, params: e });
  }
  Yu() {
    this.Gu = [];
  }
  add(t = {}) {
    const e = new ct(this.R, t);
    return this.zu.isReady && this.Nu(e), this.zu.add(e), e;
  }
  remove(t) {
    this.zu.remove(t);
  }
  move(t, e) {
    this.zu.move(t, e);
  }
  swap(t, e) {
    this.zu.swap(t, e);
  }
  clear() {
    this.zu.clear();
  }
  Ku(t) {
    this.mc.ql.Lc(), this.Bu.dc(this.mc, this.mc.gu);
    const e = [...this.R.state.canvasBackgroundColor];
    this.zu.all.forEach((i) => i.dc(this.mc, this.mc.gu)), this.Wu(t, e);
  }
  Zu() {
    this.Ku(this.ju);
    let t = this.ju.textures[0];
    if (this.Gu.length > 0) {
      const i = this.mc.nn;
      this.Hu.ku(this.ju.textures[0], this.Qu, this.Gu, i.width, i.height), t = this.Qu.textures[0], this.Gu = [];
    }
    const e = this.mc.nn;
    this.R.xe(0, 0, 0, 0), this.R.Pi(this.mc.mu), this.mc.mu.gt({ u_texture: t }), this.R.Bi(0, 0, e.width, e.height), this.mc.ql.Oc();
  }
  Wu(t, e) {
    const i = this.mc.nn, s = this.Bu.grid, r = this.Bu.texture;
    if (!r) return;
    const h = { layer: this.Bu, texture: r, width: s.width, height: s.height, offsetX: s.offsetX + this.Bu.Ll, offsetY: s.offsetY + this.Bu.Dl }, a = this.zu.all.filter((c) => !!c.grid && !!c.texture).map((c) => {
      const l = c.grid;
      return { layer: c, texture: c.texture, width: l.width, height: l.height, offsetX: l.offsetX + c.Ll, offsetY: l.offsetY + c.Dl };
    });
    this.Ou.bu({ base: h, layers: a, targetFramebuffer: t, backgroundColor: e, canvasWidth: i.width, canvasHeight: i.height });
  }
  $n() {
    var e, i, s;
    if (!this.$u) return;
    const t = this.mc.nn;
    this.Bu.$n(), this.zu.all.forEach((r) => r.$n()), this.Ou.$n(t.width, t.height), (e = this.ju) == null || e.resize(t.width, t.height), (i = this.Qu) == null || i.resize(t.width, t.height), (s = this.Hu) == null || s.$n(t.width, t.height);
  }
  Ss() {
    var t, e;
    this.zu.dispose(), this.mc.ql.Hc(this.Bu), this.Bu.Ss(), this.Hu.Ss(), this.Ou.Ss(), (t = this.ju) == null || t.dispose(), (e = this.Qu) == null || e.dispose(), this.Gu = [];
  }
  get all() {
    return this.zu.all;
  }
  get base() {
    return this.Bu;
  }
  get filters() {
    return this.Hu;
  }
  get resultFramebuffer() {
    return this.Qu;
  }
  qu() {
    const t = this.zu.all;
    for (let e = t.length - 1; e >= 0; e--) {
      const i = t[e];
      if (i.kl && i.grid) return i.grid;
    }
    return this.Bu.grid;
  }
  Vu(t) {
    this.Iu.add(t);
  }
  Ju() {
    for (const t of this.Iu) t();
  }
  async Nu(t) {
    var i;
    const e = { renderer: this.R, canvas: this.mc.nn, filterManager: this.Hu, createFramebuffer: (s, r, h = 1, a) => this.R.Yi(s, r, h, a) };
    await t.Wl(e), (i = t.grid) == null || i.fn(() => this.Ju());
  }
}
const ti = { id: "brightness", createShader: ({ gl: n }) => new $(n, at, `#version 300 es
precision highp float;in vec2 v_uv;uniform sampler2D u_image;uniform bool u_invert;uniform bool u_flipX;uniform bool u_flipY;uniform float u_charRotation;uniform bool u_charColorFixed;uniform vec4 u_charColor;uniform bool u_cellColorFixed;uniform vec4 u_cellColor;uniform vec4 u_backgroundColor;uniform int u_charCount;uniform vec3 u_charList[255];layout(location=0)out vec4 o_character;layout(location=1)out vec4 o_primaryColor;layout(location=2)out vec4 o_secondaryColor;layout(location=3)out vec4 A;float B(vec3 C){return dot(C,vec3(0.299f,0.587f,0.114f));}void main(){vec2 D=vec2(v_uv.x,1.0f-v_uv.y);vec4 E=texture(u_image,D);float F=B(E.rgb);vec2 G=vec2(0.);if(u_charCount>0){float H=float(u_charCount);float I=clamp(F*(H-1.0f),0.0f,H-1.0f);int J=int(floor(I+0.5f));vec3 K=u_charList[J];G=K.xy;}else{G=vec2(0.0f,0.0f);}vec4 L=u_charColorFixed?u_charColor:E;vec4 M=u_cellColorFixed?u_cellColor:E;if(E.a<0.01f){discard;}o_primaryColor=vec4(L.rgb,L.a);o_secondaryColor=vec4(M.rgb,M.a);A=vec4(0.);int N=int(u_invert?1:0);int O=int(u_flipX?1:0);int P=int(u_flipY?1:0);float Q=float(N|(O<<1)|(P<<2))/255.;o_character=vec4(G,Q,clamp(u_charRotation,0.0f,1.0f));}`), createUniforms: ({ source: n }) => n.createBaseConversionUniforms() };
class ie {
  constructor() {
    o(this, "tf", /* @__PURE__ */ new Map());
    o(this, "Su", /* @__PURE__ */ new Map());
    this.sf();
  }
  register(t) {
    this.tf.set(t.id, t);
  }
  unregister(t) {
    const e = this.Su.get(t);
    return e && (e.dispose(), this.Su.delete(t)), this.tf.delete(t);
  }
  has(t) {
    return this.tf.has(t);
  }
  xh(t) {
    return this.tf.get(t);
  }
  Ch(t, e) {
    let i = this.Su.get(t);
    if (!i) {
      const s = this.tf.get(t);
      if (!s) throw Error(`[textmode.js] Conversion mode "${t}" is not registered.`);
      i = s.createShader(e), this.Su.set(t, i);
    }
    return i;
  }
  Ss() {
    for (const t of this.Su.values()) t.dispose();
    this.Su.clear(), this.tf.clear();
  }
  sf() {
    this.register(ti);
  }
}
const ni = Object.freeze(Object.defineProperty({ __proto__: null, TextmodeConversionManager: ie }, Symbol.toStringTag, { value: "Module" }));
class ei extends function(e, ...i) {
  return i.reduce((s, r) => r(s), e);
}(class {
}, Qe, $e, qe, Ve, Ze) {
  constructor(e = {}) {
    super();
    o(this, "R");
    o(this, "gu");
    o(this, "mu");
    o(this, "nn");
    o(this, "fc");
    o(this, "sa");
    o(this, "vc");
    o(this, "gc");
    o(this, "ef");
    o(this, "if");
    o(this, "Vl");
    o(this, "Qn");
    o(this, "rf", /* @__PURE__ */ new Set());
    o(this, "ql");
    o(this, "uc");
    o(this, "nf");
    o(this, "hf", !1);
    o(this, "Mi", !1);
    o(this, "af", !1);
    o(this, "cf", !1);
    o(this, "lf", () => {
    });
    o(this, "uf", () => {
    });
    o(this, "ff");
    o(this, "df");
    o(this, "pf");
    o(this, "mn", !1);
    o(this, "vf");
    o(this, "gf");
    this.ql = new jt(this), this.mn = e.overlay ?? !1, this.uc = new Promise((s) => {
      this.nf = s;
    }), this.nn = new He(e), this.R = new Me(this.nn.Pn()), this.gu = this.R.ki(q, `#version 300 es
precision highp float;uniform sampler2D u_characterTexture;uniform vec2 u_charsetDimensions;uniform sampler2D Ue;uniform sampler2D Uf;uniform sampler2D Ud;uniform vec2 Ug;uniform vec2 Uh;uniform vec4 Ui;in vec2 v_uv;out vec4 fragColor;mat2 A(float B){float C=sin(B);float D=cos(B);return mat2(D,-C,C,D);}void main(){vec2 E=gl_FragCoord.xy/Uh;vec2 F=E*Ug;vec2 G=floor(F);vec2 H=(G+0.5)/Ug;vec4 I=texture(Ue,H);vec4 J=texture(Uf,H);vec4 K=texture(Ud,H);int L=int(K.b*255.+0.5);bool M=(L&1)!=0;bool N=(L&2)!=0;bool O=(L&4)!=0;int P=int(K.r*255.+0.5)+int(K.g*255.+0.5)*256;int Q=int(u_charsetDimensions.x);int R=P/Q;int S=P-(R*Q);float T=(u_charsetDimensions.y-1.)-float(R);vec2 U=1./u_charsetDimensions;vec2 V=vec2(float(S),T)*U;vec2 W=V+U;float X=-K.a*360.*0.017453292;vec2 Y=fract(F)-0.5f;vec2 Z=vec2(N?-1.:1.,O?-1.:1.);Y*=Z;Y=A(X)*Y+0.5;vec2 a=V+clamp(Y,0.,1.)*U;const float b=0.0001;if(any(lessThan(a,V-b))||any(greaterThan(a,W+b))){fragColor=M?I:J;return;}vec4 c=texture(u_characterTexture,a);if(M)c.rgb=mix(c.rgb,1.-c.rgb,float(M));vec4 d=mix(Ui,J,J.a);fragColor=mix(d,I,c);}`), this.mu = this.R.ki(q, Gt), this.fc = new zt(e.frameRate ?? 60), this.ef = new Kt(this, e.loadingScreen, this.nn.Fn()), this.ef.pu(() => {
      this.fc.Kh = 0, this.cf = !0;
    }), this.if = new ee(this, e);
    const i = () => this.mf();
    this.sa = new Xt(this.nn, i), this.vc = new Yt(this.nn, i, this.sa), this.gc = new Ht(), this.Qn = new ie(), this.ql.Tc(e.plugins ?? []), this.ef.zh(), this._f();
  }
  lc(e) {
    var i;
    this.rf.add(e), (i = e.C) == null || i.call(e, () => {
      this.rf.delete(e);
    });
  }
  yf() {
    var r;
    const e = (r = this.if) == null ? void 0 : r.base.grid;
    if (!e) return;
    const i = e.cols, s = e.rows;
    for (const h of this.rf) h instanceof dt && h.$n(i, s);
    this.vf && this.vf.$n(i, s);
  }
  async _f() {
    await this.if.Qr(), this.nf(), await this.ef.Qr();
    const e = this.if.base.grid;
    this.yf(), this.if.Vu(() => {
      this.sa.To(), this.vc.To();
    }), this.mn && (this.vf = V.Mh(this.R, this.Qn, this.nn.targetCanvas, e.cols, e.rows)), this.Af(), e.fn(() => {
      this.yf();
    }), this.fc.zh(() => this.dc());
    try {
      await this.ql.Ic(), await this.lf(), await this.ql.jc(), this.ef.yl();
    } catch (i) {
      console.error("Error during setup:", i), this.ef.error(i);
    }
  }
  Af() {
    this.ff = () => {
      this.mn && this.resizeCanvas(this.nn.targetCanvas.width, this.nn.targetCanvas.height), this.uf();
    }, window.addEventListener("resize", this.ff), this.sa.wo(), this.vc.wo(), this.gc.wo(), this.df = () => {
      this.gc.ta();
    }, window.addEventListener("blur", this.df), this.mn && (this.pf = new ResizeObserver(() => {
      this.resizeCanvas(this.nn.targetCanvas.width, this.nn.targetCanvas.height);
    }), this.pf.observe(this.nn.targetCanvas));
  }
  dc() {
    if (!this.ef.pl && this.cf) {
      this.Mi = !0, this.R.Ti(!0);
      try {
        this.fc.Qh(), this.fc.Wh(), this.mn && ht(this.R.context, this.vf.texture, this.nn.targetCanvas), this.if.Zu();
      } finally {
        this.Mi = !1, this.R.Ti(!1), this.hf && !this.af && this.wf();
      }
    }
  }
  resizeCanvas(e, i) {
    var s;
    this.nn.$n(e, i), this.ef._u(this.nn.Fn()), this.ef.$n(), (s = this.if) == null || s.$n(), this.R.Zi(), this.dc();
  }
  destroy() {
    this.af || this.hf || (this.hf = !0, this.fc.Ih(), this.Mi || this.wf());
  }
  wf() {
    var e, i, s, r;
    this.hf = !1, this.nn.Ss(), this.ef.Ss(), this.ql.Qc(), window.removeEventListener("resize", this.ff), window.removeEventListener("blur", this.df), (e = this.pf) == null || e.disconnect(), this.sa.Po(), this.vc.Po(), this.gc.Po(), (i = this.if) == null || i.Ss(), (s = this.Qn) == null || s.Ss();
    for (const h of this.rf) h.dispose();
    this.rf.clear(), this.gu.dispose(), this.mu.dispose(), this.R.Ss(), (r = this.vf) == null || r.dispose(), this.af = !0;
  }
  filter(e, i) {
    this.if.Xu(e, i);
  }
  draw(e) {
    this.if.base.draw(e);
  }
  async loadFont(e, i = !0) {
    if (i) return await this.if.base.loadFont(e), this.if.base.font;
    if (e instanceof H) return e.tn || await e.Qr(), e;
    const s = new H(this.R);
    return await s.Qr(e), this.lc(s), s;
  }
  fontSize(e) {
    return this.if.base.fontSize(e);
  }
  inputGrid(e) {
    return e === void 0 ? this.gf ?? "topmost" : e === "topmost" ? (this.gf = void 0, this.sa.To(), void this.vc.To()) : (this.gf = e, this.sa.To(), void this.vc.To());
  }
  mf() {
    return this.gf ? this.gf : this.if.qu();
  }
  async setup(e) {
    this.lf = e;
  }
  windowResized(e) {
    this.uf = e;
  }
  get grid() {
    var e;
    return ((e = this.Vl) == null ? void 0 : e.grid) ?? this.if.base.grid;
  }
  get font() {
    var e;
    return ((e = this.Vl) == null ? void 0 : e.font) ?? this.if.base.font;
  }
  get width() {
    return this.nn.width;
  }
  get height() {
    return this.nn.height;
  }
  get canvas() {
    return this.nn.canvas;
  }
  get isDisposed() {
    return this.af;
  }
  get overlay() {
    return this.vf;
  }
  get loading() {
    return this.ef;
  }
  get layers() {
    return this.if;
  }
  get filters() {
    return this.if.filters;
  }
  get conversions() {
    return this.Qn;
  }
  get isRenderingFrame() {
    return this.Mi;
  }
}
class Et {
  constructor() {
  }
  static create(t = {}) {
    return new ei(t);
  }
  static setErrorLevel(t) {
    wt._(t);
  }
  static get version() {
    return "0.10.0";
  }
}
const hi = Object.freeze(Object.defineProperty({ __proto__: null, LoadingPhase: Wt, LoadingPhaseTracker: Qt, LoadingScreenManager: Kt, LoadingScreenStateMachine: $t, LoadingScreenTransition: qt, resolveColorInputs: Zt, resolveDefaultPalette: Vt, resolveTheme: yt }, Symbol.toStringTag, { value: "Module" })), oi = Object.freeze(Object.defineProperty({ __proto__: null, TextmodeFont: H, TextmodeImage: V, TextmodeSource: dt, TextmodeTexture: Z, TextmodeVideo: D }, Symbol.toStringTag, { value: "Module" })), ai = Object.freeze(Object.defineProperty({ __proto__: null, keyboard: je, mouse: Ye, touch: Ge }, Symbol.toStringTag, { value: "Module" })), ci = Object.freeze(Object.defineProperty({ __proto__: null, LayerCompositor: Jt, TextmodeLayer: ct, TextmodeLayerManager: ee }, Symbol.toStringTag, { value: "Module" })), li = Et.create, ui = Et.setErrorLevel, fi = Et.version;
export {
  He as TextmodeCanvas,
  E as TextmodeColor,
  S as TextmodeError,
  oe as TextmodeErrorLevel,
  st as TextmodeFramebuffer,
  ke as TextmodeGrid,
  $ as TextmodeShader,
  ei as Textmodifier,
  ni as conversion,
  li as create,
  ri as filters,
  ai as input,
  ci as layering,
  oi as loadables,
  hi as loading,
  si as plugins,
  ui as setErrorLevel,
  Et as textmode,
  fi as version
};
