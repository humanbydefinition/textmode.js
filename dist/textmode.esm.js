var sA = Object.defineProperty;
var rA = (o, A, t) => A in o ? sA(o, A, { enumerable: !0, configurable: !0, writable: !0, value: t }) : o[A] = t;
var E = (o, A, t) => rA(o, typeof A != "symbol" ? A + "" : A, t);
class I extends Error {
  constructor(A, t = {}) {
    super(I.A(A, t)), this.name = "TextmodeError";
  }
  static A(A, t) {
    let e = A;
    if (t && Object.keys(t).length > 0) {
      e += `

📋 Context:`;
      for (const [s, r] of Object.entries(t))
        e += `
  - ${s}: ${I.i(r)}`;
    }
    return e += `

`, e += "↓".repeat(24) + `
`, e;
  }
  static i(A) {
    if (A === null) return "null";
    if (A === void 0) return "undefined";
    if (typeof A == "string") return `"${A}"`;
    if (typeof A == "number" || typeof A == "boolean") return A + "";
    if (Array.isArray(A)) return A.length === 0 ? "[]" : A.length <= 5 ? `[${A.map((t) => I.i(t)).join(", ")}]` : `[${A.slice(0, 3).map((t) => I.i(t)).join(", ")}, ... +${A.length - 3} more]`;
    if (typeof A == "object") {
      const t = Object.keys(A);
      return t.length === 0 ? "{}" : t.length <= 3 ? `{ ${t.map((e) => `${e}: ${I.i(A[e])}`).join(", ")} }` : `{ ${t.slice(0, 2).map((e) => `${e}: ${I.i(A[e])}`).join(", ")}, ... +${t.length - 2} more }`;
    }
    return A + "";
  }
}
var iA = ((o) => (o[o.SILENT = 0] = "SILENT", o[o.WARNING = 1] = "WARNING", o[o.ERROR = 2] = "ERROR", o[o.THROW = 3] = "THROW", o))(iA || {});
const v = class v {
  constructor() {
    E(this, "h", { globalLevel: 3 });
  }
  static l() {
    return v.o || (v.o = new v()), v.o;
  }
  D(A, t) {
    const e = "%c[textmode.js] Oops! (╯°□°)╯︵ Something went wrong in your code.", s = "color: #f44336; font-weight: bold; background: #ffebee; padding: 2px 6px; border-radius: 3px;";
    switch (this.h.globalLevel) {
      case 0:
        return !1;
      case 1:
        return console.group(e, s), console.warn(I.A(A, t)), console.groupEnd(), !1;
      case 2:
        return console.group(e, s), console.error(I.A(A, t)), console.groupEnd(), !1;
      default:
        throw new I(A, t);
    }
  }
  C(A, t, e) {
    return !!A || (this.D(t, e), !1);
  }
  u(A) {
    this.h.globalLevel = A;
  }
};
E(v, "o", null);
let U = v;
const D = U.l(), j = /* @__PURE__ */ new WeakMap();
function F(o, A) {
  j.set(o, A);
}
function J(o) {
  return j.get(o);
}
class X {
  constructor(A, t = A, e = {}) {
    E(this, "P");
    E(this, "I");
    E(this, "h");
    E(this, "m", null);
    this.P = A, this.I = t, this.h = { filter: "nearest", wrap: "clamp", format: "rgba", type: "unsigned_byte", ...e };
  }
  get width() {
    return this.P;
  }
  get height() {
    return this.I;
  }
  get pixels() {
    return this.m;
  }
  get options() {
    return { ...this.h };
  }
  validateCoordinates(A, t, e = !0) {
    return (A < 0 || t < 0 || A >= this.P || t >= this.I) && e && console.warn("The x and y values passed to Framebuffer.get are outside of its range and will be clamped."), [Math.max(0, Math.min(A, this.P - 1)), Math.max(0, Math.min(t, this.I - 1))];
  }
  validateRegion(A, t, e, s) {
    return [A = Math.max(0, Math.min(A, this.P - 1)), t = Math.max(0, Math.min(t, this.I - 1)), e = Math.max(1, Math.min(e, this.P - A)), s = Math.max(1, Math.min(s, this.I - t))];
  }
  updateDimensions(A, t) {
    this.P = A, this.I = t, this.m = null;
  }
}
class K extends X {
  constructor(t, e, s = e, r = {}) {
    super(e, s, r);
    E(this, "p");
    E(this, "_");
    E(this, "v");
    E(this, "M", null);
    this.p = t, this.v = this.G(), this._ = t.createFramebuffer(), this.F();
  }
  $(t) {
    const { p: e } = this, s = e.getParameter(e.FRAMEBUFFER_BINDING);
    e.bindFramebuffer(e.FRAMEBUFFER, this._);
    try {
      return t();
    } finally {
      e.bindFramebuffer(e.FRAMEBUFFER, s);
    }
  }
  G() {
    const { p: t } = this, e = t.createTexture();
    t.bindTexture(t.TEXTURE_2D, e);
    const s = this.h.filter === "linear" ? t.LINEAR : t.NEAREST, r = this.h.wrap === "repeat" ? t.REPEAT : t.CLAMP_TO_EDGE;
    return t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MIN_FILTER, s), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MAG_FILTER, s), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_S, r), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_T, r), this.Y(), e;
  }
  Y() {
    const { p: t } = this, e = this.h.type === "float" ? t.FLOAT : t.UNSIGNED_BYTE;
    t.texImage2D(t.TEXTURE_2D, 0, t.RGBA, this.P, this.I, 0, t.RGBA, e, null);
  }
  F() {
    const { p: t } = this;
    t.bindFramebuffer(t.FRAMEBUFFER, this._), t.framebufferTexture2D(t.FRAMEBUFFER, t.COLOR_ATTACHMENT0, t.TEXTURE_2D, this.v, 0), t.bindFramebuffer(t.FRAMEBUFFER, null);
  }
  S(t) {
    const { p: e } = this;
    e.bindTexture(e.TEXTURE_2D, this.v), e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL, 1), e.texImage2D(e.TEXTURE_2D, 0, e.RGBA, e.RGBA, e.UNSIGNED_BYTE, t), e.bindTexture(e.TEXTURE_2D, null);
  }
  updatePixels(t, e, s) {
    const { p: r } = this;
    r.bindTexture(r.TEXTURE_2D, this.v), r.texImage2D(r.TEXTURE_2D, 0, r.RGBA, e, s, 0, r.RGBA, r.UNSIGNED_BYTE, t), r.bindTexture(r.TEXTURE_2D, null);
  }
  resize(t, e) {
    const { p: s } = this;
    this.updateDimensions(t, e), s.bindTexture(s.TEXTURE_2D, this.v), this.Y(), s.bindTexture(s.TEXTURE_2D, null);
  }
  begin() {
    const { p: t } = this;
    this.M = { framebuffer: t.getParameter(t.FRAMEBUFFER_BINDING), viewport: t.getParameter(t.VIEWPORT) }, t.bindFramebuffer(t.FRAMEBUFFER, this._), t.viewport(0, 0, this.P, this.I), F(t, [0, 0, this.P, this.I]);
  }
  end() {
    if (!this.M) return;
    const { p: t } = this;
    t.bindFramebuffer(t.FRAMEBUFFER, this.M.framebuffer), t.viewport(...this.M.viewport), F(t, this.M.viewport), this.M = null;
  }
  loadPixels() {
    const { p: t } = this;
    this.m || (this.m = new Uint8Array(this.P * this.I * 4)), this.$(() => {
      t.readPixels(0, 0, this.P, this.I, t.RGBA, t.UNSIGNED_BYTE, this.m);
    });
  }
  get(t, e, s, r) {
    const { p: i } = this;
    if (t === void 0 && e === void 0) {
      const B = new Uint8Array(this.P * this.I * 4);
      return this.$(() => (i.readPixels(0, 0, this.P, this.I, i.RGBA, i.UNSIGNED_BYTE, B), B));
    }
    if (s === void 0 && r === void 0) {
      const [B, Q] = this.validateCoordinates(t, e), n = new Uint8Array(4);
      return this.$(() => (i.readPixels(B, Q, 1, 1, i.RGBA, i.UNSIGNED_BYTE, n), [n[0], n[1], n[2], n[3]]));
    }
    {
      const [B, Q, n, g] = this.validateRegion(t, e, s, r), a = new Uint8Array(n * g * 4);
      return this.$(() => (i.readPixels(B, Q, n, g, i.RGBA, i.UNSIGNED_BYTE, a), a));
    }
  }
  O() {
    this._ && this.p.deleteFramebuffer(this._), this.v && this.p.deleteTexture(this.v);
  }
  get framebuffer() {
    return this._;
  }
  get texture() {
    return this.v;
  }
}
class q {
  constructor() {
    E(this, "U", !1);
  }
  get isReady() {
    return this.U;
  }
  setUniforms(A) {
    for (const [t, e] of Object.entries(A)) this.setUniform(t, e);
  }
}
class p extends q {
  constructor(t, e, s) {
    super();
    E(this, "p");
    E(this, "R");
    E(this, "k", /* @__PURE__ */ new Map());
    E(this, "V", /* @__PURE__ */ new Map());
    E(this, "H", 0);
    E(this, "L");
    this.p = t, this.R = this.J(e, s), this.L = t.getParameter(t.MAX_TEXTURE_IMAGE_UNITS), this.j(), this.U = !0;
  }
  static fromSource(t, e) {
    return new p(t, e.vertex, e.fragment);
  }
  j() {
    const t = this.p.getProgramParameter(this.R, this.p.ACTIVE_UNIFORMS);
    for (let e = 0; e < t; e++) {
      const s = this.p.getActiveUniform(this.R, e);
      if (s) {
        const r = this.p.getUniformLocation(this.R, s.name);
        r && (this.k.set(s.name, r), this.V.set(s.name, s.type));
      }
    }
  }
  J(t, e) {
    const s = this.K(this.p.VERTEX_SHADER, t), r = this.K(this.p.FRAGMENT_SHADER, e), i = this.p.createProgram();
    if (this.p.attachShader(i, s), this.p.attachShader(i, r), this.p.linkProgram(i), !this.p.getProgramParameter(i, this.p.LINK_STATUS)) {
      const B = this.p.getProgramInfoLog(i);
      throw Error("Shader program link error: " + B);
    }
    return this.p.deleteShader(s), this.p.deleteShader(r), i;
  }
  K(t, e) {
    const s = this.p.createShader(t);
    if (this.p.shaderSource(s, e), this.p.compileShader(s), !this.p.getShaderParameter(s, this.p.COMPILE_STATUS)) {
      const r = this.p.getShaderInfoLog(s);
      throw this.p.deleteShader(s), Error("Shader compilation error: " + r);
    }
    return s;
  }
  W() {
    this.p.useProgram(this.R), this.N();
  }
  N() {
    this.H = 0;
  }
  setUniform(t, e) {
    const s = this.k.get(t);
    if (s) if (typeof e == "number")
      this.Z(t) ? this.p.uniform1i(s, Math.floor(e)) : this.p.uniform1f(s, e);
    else if (typeof e == "boolean") this.p.uniform1i(s, e ? 1 : 0);
    else if (Array.isArray(e)) switch (e.length) {
      case 2:
        this.p.uniform2f(s, e[0], e[1]);
        break;
      case 3:
        this.p.uniform3f(s, e[0], e[1], e[2]);
        break;
      case 4:
        this.p.uniform4f(s, e[0], e[1], e[2], e[3]);
        break;
      default:
        console.warn(`Unsupported array length ${e.length} for uniform '${t}'`);
    }
    else if (e instanceof WebGLTexture) {
      const r = this.X();
      this.p.uniform1i(s, r), this.p.activeTexture(this.p.TEXTURE0 + r), this.p.bindTexture(this.p.TEXTURE_2D, e);
    } else if (e instanceof K) {
      const r = this.X();
      this.p.uniform1i(s, r), this.p.activeTexture(this.p.TEXTURE0 + r), this.p.bindTexture(this.p.TEXTURE_2D, e.texture);
    } else if (typeof e == "object" && "texture" in e) {
      const r = this.X();
      this.p.uniform1i(s, r), this.p.activeTexture(this.p.TEXTURE0 + r), this.p.bindTexture(this.p.TEXTURE_2D, e.texture);
    } else console.warn(`Unsupported uniform type for '${t}':`, typeof e);
  }
  X() {
    return this.H >= this.L && console.warn(`Exceeded maximum texture units (${this.L}). Texture may not render correctly.`), this.H++;
  }
  Z(t) {
    const e = this.V.get(t);
    return !!e && (e === this.p.INT || e === this.p.INT_VEC2 || e === this.p.INT_VEC3 || e === this.p.INT_VEC4 || e === this.p.SAMPLER_2D || e === this.p.SAMPLER_CUBE);
  }
  get glProgram() {
    return this.R;
  }
  O() {
    this.p.deleteProgram(this.R);
  }
}
class AA {
  constructor(A) {
    E(this, "p");
    E(this, "q", null);
    E(this, "AA", 16);
    E(this, "tA", /* @__PURE__ */ new Map());
    this.p = A;
  }
  eA() {
    if (this.q) return;
    const A = this.p;
    this.q = A.createBuffer(), A.bindBuffer(A.ARRAY_BUFFER, this.q);
  }
  sA() {
    const A = this.p, t = A.getParameter(A.CURRENT_PROGRAM);
    let e = this.tA.get(t);
    return e || (e = { a_position: A.getAttribLocation(t, "a_position"), a_texCoord: A.getAttribLocation(t, "a_texCoord") }, this.tA.set(t, e)), A.enableVertexAttribArray(e.a_position), A.vertexAttribPointer(e.a_position, 2, A.FLOAT, !1, this.AA, 0), A.enableVertexAttribArray(e.a_texCoord), A.vertexAttribPointer(e.a_texCoord, 2, A.FLOAT, !1, this.AA, 8), { positionLoc: e.a_position, texLoc: e.a_texCoord };
  }
  rA(A, t) {
    const e = this.p;
    e.disableVertexAttribArray(A), e.disableVertexAttribArray(t);
  }
  BA(A, t) {
    const e = this.p, s = J(e) || [0, 0, e.canvas.width, e.canvas.height];
    return { nx: A / s[2] * 2 - 1, ny: 1 - t / s[3] * 2 };
  }
  iA(A, t, e, s) {
    const r = this.p;
    this.eA(), r.bindBuffer(r.ARRAY_BUFFER, this.q);
    const i = new Float32Array([A, s, 0, 0, e, s, 1, 0, A, t, 0, 1, A, t, 0, 1, e, s, 1, 0, e, t, 1, 1]);
    r.bufferData(r.ARRAY_BUFFER, i, r.DYNAMIC_DRAW);
  }
  O() {
    this.q && this.p.deleteBuffer(this.q);
  }
}
class BA extends AA {
  constructor(A) {
    super(A);
  }
  QA(A, t, e, s) {
    const r = this.BA(A, t), i = this.BA(A + e, t + s);
    this.iA(r.nx, r.ny, i.nx, i.ny);
    const B = this.sA();
    this.p.drawArrays(this.p.TRIANGLES, 0, 6), this.rA(B.positionLoc, B.texLoc);
  }
  EA(A, t, e, s, r) {
    this.QA(A, t, e, r), this.QA(A + e - r, t, r, s), this.QA(A, t + s - r, e, r), this.QA(A, t, r, s);
  }
}
class oA extends AA {
  constructor(A) {
    super(A);
  }
  oA(A, t, e, s, r) {
    const i = e - A, B = s - t, Q = Math.hypot(i, B);
    if (Q === 0) {
      const g = r / 2, a = this.BA(A - g, t - g), h = this.BA(A + g, t + g);
      this.iA(a.nx, a.ny, h.nx, h.ny);
    } else {
      const g = -B / Q, a = i / Q, h = r / 2, u = A + g * h, c = t + a * h, l = A - g * h, d = t - a * h, C = e + g * h, P = s + a * h, w = e - g * h, m = s - a * h, y = this.BA(u, c), x = this.BA(l, d), _ = this.BA(C, P), V = this.BA(w, m), T = this.p;
      this.eA(), T.bindBuffer(T.ARRAY_BUFFER, this.q);
      const eA = new Float32Array([y.nx, y.ny, 0, 0, x.nx, x.ny, 0, 1, _.nx, _.ny, 1, 0, x.nx, x.ny, 0, 1, V.nx, V.ny, 1, 1, _.nx, _.ny, 1, 0]);
      T.bufferData(T.ARRAY_BUFFER, eA, T.DYNAMIC_DRAW);
    }
    const n = this.sA();
    this.p.drawArrays(this.p.TRIANGLES, 0, 6), this.rA(n.positionLoc, n.texLoc);
  }
}
var Y = "attribute vec2 a_position;attribute vec2 a_texCoord;varying vec2 v_uv;uniform float u_rotation;uniform vec2 u_center;uniform float u_aspectRatio;mat2 rotate2D(float angle){float s=sin(angle);float c=cos(angle);return mat2(c,-s,s,c);}void main(){v_uv=a_texCoord;vec2 pos=a_position;pos-=u_center;pos.x*=u_aspectRatio;pos=rotate2D(-u_rotation)*pos;pos.x/=u_aspectRatio;pos+=u_center;gl_Position=vec4(pos,0.0,1.0);}";
class EA {
  constructor(A) {
    E(this, "p");
    E(this, "gA");
    E(this, "nA");
    E(this, "aA", null);
    E(this, "hA");
    E(this, "lA");
    E(this, "cA", [1, 1, 1, 1]);
    E(this, "DA", !0);
    E(this, "CA", [0, 0, 0, 1]);
    E(this, "uA", 1);
    E(this, "PA", !0);
    E(this, "IA", 0);
    E(this, "wA", []);
    this.p = A, this.gA = new p(this.p, Y, "precision lowp float;uniform sampler2D u_texture;varying vec2 v_uv;void main(){gl_FragColor=texture2D(u_texture,v_uv);}"), this.nA = new p(this.p, Y, "precision lowp float;uniform vec4 u_color;void main(){gl_FragColor=u_color;}"), this.hA = new BA(this.p), this.lA = new oA(this.p), this.p.enable(this.p.BLEND), this.p.blendEquation(this.p.FUNC_ADD), this.p.blendFunc(this.p.ONE, this.p.ONE_MINUS_SRC_ALPHA), F(this.p, [0, 0, this.p.canvas.width, this.p.canvas.height]);
  }
  fA(A) {
    this.aA !== A && (this.aA = A, A.W());
  }
  dA(A, t, e, s) {
    if (this.DA = !0, t === void 0 && e === void 0 && s === void 0) {
      const r = A / 255;
      this.cA = [r, r, r, 1];
    } else if (e !== void 0 && s === void 0) this.cA = [A / 255, t / 255, e / 255, 1];
    else {
      if (e === void 0 || s === void 0) throw Error("Invalid fill parameters. Use fill(gray), fill(r,g,b), or fill(r,g,b,a)");
      this.cA = [A / 255, t / 255, e / 255, s / 255];
    }
  }
  mA(A, t, e, s) {
    if (this.PA = !0, t === void 0 && e === void 0 && s === void 0) {
      const r = A / 255;
      this.CA = [r, r, r, 1];
    } else if (e !== void 0 && s === void 0) this.CA = [A / 255, t / 255, e / 255, 1];
    else {
      if (e === void 0 || s === void 0) throw Error("Invalid stroke parameters. Use stroke(gray), stroke(r,g,b), or stroke(r,g,b,a)");
      this.CA = [A / 255, t / 255, e / 255, s / 255];
    }
  }
  pA(A) {
    if (A < 0) throw Error("Stroke weight must be non-negative");
    this.uA = A;
  }
  _A() {
    this.PA = !1;
  }
  vA() {
    this.DA = !1;
  }
  bA(A) {
    this.IA = A;
  }
  xA() {
    this.wA.push({ fillColor: [...this.cA], fillMode: this.DA, strokeColor: [...this.CA], strokeWeight: this.uA, strokeMode: this.PA, rotation: this.IA });
  }
  yA() {
    const A = this.wA.pop();
    A ? (this.cA = A.fillColor, this.DA = A.fillMode, this.CA = A.strokeColor, this.uA = A.strokeWeight, this.PA = A.strokeMode, this.IA = A.rotation) : console.warn("pop() called without matching push()");
  }
  MA() {
    this.aA = null, this.wA = [], this.IA = 0;
  }
  GA(A) {
    const t = A.replace(/\/\*[\s\S]*?\*\//g, "").replace(/\/\/.*$/gm, "").trim().match(/^#version\s+(\d+)\s+(es)?/i);
    return t ? parseInt(t[1], 10) >= 300 : !1;
  }
  FA(A, t) {
    return new p(this.p, A, t);
  }
  $A(A) {
    const t = this.GA(A) ? `#version 300 es
in vec2 a_position;in vec2 a_texCoord;out vec2 v_uv;uniform float u_rotation;uniform vec2 u_center;uniform float u_aspectRatio;mat2 rotate2D(float angle){float s=sin(angle);float c=cos(angle);return mat2(c,-s,s,c);}void main(){v_uv=a_texCoord;vec2 pos=a_position;pos-=u_center;pos.x*=u_aspectRatio;pos=rotate2D(-u_rotation)*pos;pos.x/=u_aspectRatio;pos+=u_center;gl_Position=vec4(pos,0.0,1.0);}` : Y;
    return new p(this.p, t, A);
  }
  YA(A, t) {
    this.aA.setUniform(A, t);
  }
  TA(A, t, e, s) {
    if (this.aA !== null) {
      const { centerX: a, centerY: h, radians: u, aspectRatio: c } = this.SA(A, t, e, s);
      return this.YA("u_rotation", u), this.YA("u_center", [a, h]), this.YA("u_aspectRatio", c), this.hA.QA(A, t, e, s), void (this.aA = null);
    }
    const r = this.nA;
    let i = 0, B = 0, Q = 0, n = 1;
    const g = this.SA(A, t, e, s);
    i = g.centerX, B = g.centerY, Q = g.radians, n = g.aspectRatio, this.DA && (this.fA(r), this.YA("u_color", this.cA), this.YA("u_rotation", Q), this.YA("u_center", [i, B]), this.YA("u_aspectRatio", n), this.hA.QA(A, t, e, s)), this.PA && this.uA > 0 && (this.fA(r), this.YA("u_color", this.CA), this.YA("u_rotation", Q), this.YA("u_center", [i, B]), this.YA("u_aspectRatio", n), this.hA.EA(A, t, e, s, this.uA)), this.aA = null;
  }
  OA(A, t, e, s) {
    if (this.aA !== null) {
      const l = (A + e) / 2, d = (t + s) / 2, C = Math.abs(e - A) || 1, P = Math.abs(s - t) || 1, { centerX: w, centerY: m, radians: y, aspectRatio: x } = this.SA(l - C / 2, d - P / 2, C, P);
      this.YA("u_rotation", y), this.YA("u_center", [w, m]), this.YA("u_aspectRatio", x);
      const _ = this.uA > 0 ? this.uA : 1;
      return this.lA.oA(A, t, e, s, _), void (this.aA = null);
    }
    if (!this.PA || this.uA <= 0) return;
    const r = this.nA, i = (A + e) / 2, B = (t + s) / 2, Q = Math.abs(e - A) || 1, n = Math.abs(s - t) || 1, g = this.IA !== 0;
    let a = 0, h = 0, u = 0, c = 1;
    if (g) {
      const l = this.SA(i - Q / 2, B - n / 2, Q, n);
      a = l.centerX, h = l.centerY, u = l.radians, c = l.aspectRatio;
    }
    this.fA(r), this.YA("u_color", this.CA), g && (this.YA("u_rotation", u), this.YA("u_center", [a, h]), this.YA("u_aspectRatio", c)), this.lA.oA(A, t, e, s, this.uA);
  }
  SA(A, t, e, s) {
    const r = J(this.p) || [0, 0, this.p.canvas.width, this.p.canvas.height], i = r[2], B = r[3], Q = i / B;
    return { centerX: (A + e / 2) / i * 2 - 1, centerY: 1 - (t + s / 2) / B * 2, radians: this.IA * Math.PI / 180, aspectRatio: Q };
  }
  UA(A, t, e = {}) {
    return new K(this.p, A, t, e);
  }
  RA(A, t = A, e = A, s = 255) {
    this.kA(A / 255, t / 255, e / 255, s / 255);
  }
  kA(A = 0, t = 0, e = 0, s = 0) {
    this.p.clearColor(A, t, e, s), this.p.clear(this.p.COLOR_BUFFER_BIT);
  }
  VA() {
    this.p.viewport(0, 0, this.p.canvas.width, this.p.canvas.height), F(this.p, [0, 0, this.p.canvas.width, this.p.canvas.height]);
  }
  get context() {
    return this.p;
  }
  O() {
    this.gA.O(), this.nA.O(), this.hA.O(), this.lA.O();
  }
  HA(A, t, e, s, r) {
    const i = this.p, B = s ?? A.width, Q = r ?? A.height;
    this.fA(this.gA), this.YA("u_texture", A);
    const n = this.SA(t, e, B, Q);
    this.YA("u_rotation", n.radians), this.YA("u_center", [n.centerX, n.centerY]), this.YA("u_aspectRatio", n.aspectRatio), this.hA.QA(t, e, B, Q), i.bindTexture(i.TEXTURE_2D, null), this.aA = null;
  }
}
const f = { readShort: (o, A) => (f.t.uint16[0] = o[A] << 8 | o[A + 1], f.t.int16[0]), readUshort: (o, A) => o[A] << 8 | o[A + 1], readUshorts(o, A, t) {
  const e = [];
  for (let s = 0; s < t; s++) e.push(f.readUshort(o, A + 2 * s));
  return e;
}, readUint(o, A) {
  const t = f.t.uint8;
  return t[3] = o[A], t[2] = o[A + 1], t[1] = o[A + 2], t[0] = o[A + 3], f.t.uint32[0];
}, readASCII(o, A, t) {
  let e = "";
  for (let s = 0; s < t; s++) e += String.fromCharCode(o[A + s]);
  return e;
}, t: (() => {
  const o = new ArrayBuffer(8);
  return { uint8: new Uint8Array(o), int16: new Int16Array(o), uint16: new Uint16Array(o), uint32: new Uint32Array(o) };
})() }, QA = { parseTab(o, A, t) {
  const e = { tables: [], ids: {}, off: A };
  o = new Uint8Array(o.buffer, A, t), A = 0;
  const s = f, r = s.readUshort, i = r(o, A += 2);
  A += 2;
  const B = [];
  for (let Q = 0; Q < i; Q++) {
    const n = r(o, A), g = r(o, A += 2);
    A += 2;
    const a = s.readUint(o, A);
    A += 4;
    const h = `p${n}e${g}`;
    let u = B.indexOf(a);
    if (u === -1) {
      let c;
      u = e.tables.length, B.push(a);
      const l = r(o, a);
      c = l === 4 ? this.parse4(o, a) : l === 12 ? this.parse12(o, a) : { format: l }, e.tables.push(c);
    }
    e.ids[h] != null && console.warn("Multiple tables for one platform+encoding: " + h), e.ids[h] = u;
  }
  return e;
}, parse4(o, A) {
  const t = f, e = t.readUshort, s = t.readUshorts, r = A, i = e(o, A += 2);
  A += 2;
  const B = e(o, A += 2) >>> 1, Q = { format: 4, searchRange: e(o, A += 2), entrySelector: 0, rangeShift: 0, endCount: [], startCount: [], idDelta: [], idRangeOffset: [], glyphIdArray: [] };
  A += 2, Q.entrySelector = e(o, A), A += 2, Q.rangeShift = e(o, A), A += 2, Q.endCount = s(o, A, B), A += 2 * B, A += 2, Q.startCount = s(o, A, B), A += 2 * B;
  for (let n = 0; n < B; n++) Q.idDelta.push(t.readShort(o, A)), A += 2;
  return Q.idRangeOffset = s(o, A, B), A += 2 * B, Q.glyphIdArray = s(o, A, r + i - A >> 1), Q;
}, parse12(o, A) {
  const t = f.readUint;
  t(o, A += 4), t(o, A += 4);
  const e = t(o, A += 4);
  A += 4;
  const s = new Uint32Array(3 * e);
  for (let r = 0; r < 3 * e; r += 3) s[r] = t(o, A + (r << 2)), s[r + 1] = t(o, A + (r << 2) + 4), s[r + 2] = t(o, A + (r << 2) + 8);
  return { format: 12, groups: s };
} }, nA = { parseTab(o, A, t) {
  const e = f;
  A += 18;
  const s = e.readUshort(o, A);
  A += 2, A += 16;
  const r = e.readShort(o, A);
  A += 2;
  const i = e.readShort(o, A);
  A += 2;
  const B = e.readShort(o, A);
  A += 2;
  const Q = e.readShort(o, A);
  return A += 2, A += 6, { unitsPerEm: s, xMin: r, yMin: i, xMax: B, yMax: Q, indexToLocFormat: e.readShort(o, A) };
} }, gA = { parseTab(o, A, t) {
  const e = f;
  A += 4;
  const s = ["ascender", "descender", "lineGap", "advanceWidthMax", "minLeftSideBearing", "minRightSideBearing", "xMaxExtent", "caretSlopeRise", "caretSlopeRun", "caretOffset", "res0", "res1", "res2", "res3", "metricDataFormat", "numberOfHMetrics"], r = {};
  for (let i = 0; i < s.length; i++) {
    const B = s[i], Q = B === "advanceWidthMax" || B === "numberOfHMetrics" ? e.readUshort : e.readShort;
    r[B] = Q(o, A + 2 * i);
  }
  return r;
} }, hA = { parseTab(o, A, t, e) {
  if (!e) throw Error("Font object required for hmtx parsing");
  const s = f, r = [], i = [], B = e.maxp.numGlyphs, Q = e.hhea.numberOfHMetrics;
  let n = 0, g = 0, a = 0;
  for (; a < Q; ) n = s.readUshort(o, A + (a << 2)), g = s.readShort(o, A + (a << 2) + 2), r.push(n), i.push(g), a++;
  for (; a < B; ) r.push(n), i.push(g), a++;
  return { aWidth: r, lsBearing: i };
} }, N = { cmap: QA, head: nA, hhea: gA, maxp: { parseTab(o, A, t) {
  const e = f;
  return e.readUint(o, A), A += 4, { numGlyphs: e.readUshort(o, A) };
} }, hmtx: hA, loca: { parseTab(o, A, t, e) {
  if (!e) throw Error("Font object required for loca parsing");
  const s = f, r = [], i = e.head.indexToLocFormat, B = e.maxp.numGlyphs + 1;
  if (i === 0) for (let Q = 0; Q < B; Q++) r.push(s.readUshort(o, A + (Q << 1)) << 1);
  else if (i === 1) for (let Q = 0; Q < B; Q++) r.push(s.readUint(o, A + (Q << 2)));
  return r;
} }, glyf: { parseTab(o, A, t, e) {
  if (!e) throw Error("Font object required for glyf parsing");
  const s = [], r = e.maxp.numGlyphs;
  for (let i = 0; i < r; i++) s.push(null);
  return s;
}, zA(o, A) {
  const t = f, e = o.LA, s = o.loca;
  if (s[A] === s[A + 1]) return null;
  const r = b.findTable(e, "glyf", o.JA);
  if (!r) return null;
  let i = r[0] + s[A];
  const B = {};
  if (B.noc = t.readShort(e, i), i += 2, B.xMin = t.readShort(e, i), i += 2, B.yMin = t.readShort(e, i), i += 2, B.xMax = t.readShort(e, i), i += 2, B.yMax = t.readShort(e, i), i += 2, B.xMin >= B.xMax || B.yMin >= B.yMax) return null;
  if (B.noc > 0) {
    B.endPts = [];
    for (let h = 0; h < B.noc; h++) B.endPts.push(t.readUshort(e, i)), i += 2;
    const Q = t.readUshort(e, i);
    if (i += 2, e.length - i < Q) return null;
    i += Q;
    const n = B.endPts[B.noc - 1] + 1;
    B.flags = [];
    for (let h = 0; h < n; h++) {
      const u = e[i];
      if (i++, B.flags.push(u), 8 & u) {
        const c = e[i];
        i++;
        for (let l = 0; l < c; l++) B.flags.push(u), h++;
      }
    }
    B.xs = [];
    for (let h = 0; h < n; h++) {
      const u = B.flags[h], c = !!(16 & u);
      2 & u ? (B.xs.push(c ? e[i] : -e[i]), i++) : c ? B.xs.push(0) : (B.xs.push(t.readShort(e, i)), i += 2);
    }
    B.ys = [];
    for (let h = 0; h < n; h++) {
      const u = B.flags[h], c = !!(32 & u);
      4 & u ? (B.ys.push(c ? e[i] : -e[i]), i++) : c ? B.ys.push(0) : (B.ys.push(t.readShort(e, i)), i += 2);
    }
    let g = 0, a = 0;
    for (let h = 0; h < n; h++) g += B.xs[h], a += B.ys[h], B.xs[h] = g, B.ys[h] = a;
  } else B.parts = [], B.endPts = [], B.flags = [], B.xs = [], B.ys = [];
  return B;
} } }, b = { parse: (o) => [((A, t, e, s) => {
  const r = N, i = { LA: A, jA: t, JA: e };
  for (const B in r) {
    const Q = B, n = b.findTable(A, Q, e);
    if (n) {
      const [g, a] = n;
      let h = s[g];
      h == null && (h = r[Q].parseTab(A, g, a, i), s[g] = h), i[Q] = h;
    }
  }
  return i;
})(new Uint8Array(o), 0, 0, {})], findTable(o, A, t) {
  const e = f, s = e.readUshort(o, t + 4);
  let r = t + 12;
  for (let i = 0; i < s; i++) {
    const B = e.readASCII(o, r, 4);
    e.readUint(o, r + 4);
    const Q = e.readUint(o, r + 8), n = e.readUint(o, r + 12);
    if (B === A) return [Q, n];
    r += 16;
  }
  return null;
}, T: N, B: f };
class G {
  constructor() {
    E(this, "KA", /* @__PURE__ */ new Map());
    E(this, "WA", /* @__PURE__ */ new Map());
  }
  NA(A, t) {
    const e = `${this.ZA(A)}_${t}`;
    if (this.KA.has(e)) return this.KA.get(e);
    const s = A.cmap;
    if (!s || !s.tables) return this.KA.set(e, 0), 0;
    let r = 0;
    for (const i of s.tables) if (i.format === 4 ? r = this.XA(t, i) : i.format === 12 && (r = this.qA(t, i)), r > 0) break;
    return this.KA.set(e, r), r;
  }
  At(A, t) {
    const e = t.codePointAt(0);
    return e === void 0 ? 0 : this.NA(A, e);
  }
  tt(A, t) {
    const e = A.hmtx;
    return e && e.aWidth && e.aWidth.length !== 0 ? t < e.aWidth.length ? e.aWidth[t] : e.aWidth[e.aWidth.length - 1] : 0;
  }
  et(A, t) {
    const e = t / A.head.unitsPerEm, s = A.hhea.ascender * e, r = A.hhea.descender * e, i = A.hhea.lineGap * e;
    return { ascender: s, descender: r, lineGap: i, lineHeight: s - r + i, unitsPerEm: A.head.unitsPerEm, scale: e };
  }
  st() {
    this.KA.clear(), this.WA.clear();
  }
  ZA(A) {
    return `${A.JA}_${A.LA.length}`;
  }
  XA(A, t) {
    const e = t.endCount.length;
    let s = -1;
    for (let r = 0; r < e; r++) if (A <= t.endCount[r]) {
      s = r;
      break;
    }
    if (s === -1 || A < t.startCount[s]) return 0;
    if (t.idRangeOffset[s] === 0) return A + t.idDelta[s] & 65535;
    {
      const r = t.idRangeOffset[s] / 2 + (A - t.startCount[s]) - (e - s);
      if (r >= 0 && r < t.glyphIdArray.length) {
        const i = t.glyphIdArray[r];
        return i === 0 ? 0 : i + t.idDelta[s] & 65535;
      }
    }
    return 0;
  }
  qA(A, t) {
    const e = t.groups.length / 3;
    for (let s = 0; s < e; s++) {
      const r = t.groups[3 * s], i = t.groups[3 * s + 1], B = t.groups[3 * s + 2];
      if (A >= r && A <= i) return B + (A - r);
    }
    return 0;
  }
}
class aA {
  constructor(A) {
    E(this, "rt");
    this.rt = A;
  }
  Bt(A) {
    var e;
    const t = [];
    return (e = A == null ? void 0 : A.cmap) != null && e.tables ? (A.cmap.tables.forEach((s) => {
      if (s.format === 4) {
        const r = this.it(s);
        t.push(...r);
      } else if (s.format === 12) {
        const r = this.Qt(s);
        t.push(...r);
      }
    }), [...new Set(t)]) : [];
  }
  Et(A, t) {
    return this.rt.At(A, t) > 0;
  }
  ot(A, t) {
    for (const e of t) if (!this.Et(A, e)) return !1;
    return !0;
  }
  gt(A, t) {
    return t.filter((e) => this.Et(A, e));
  }
  nt(A) {
    return A.filter((t) => this.ht(t));
  }
  it(A) {
    const t = [];
    if (!(A.startCount && A.endCount && A.idRangeOffset && A.idDelta)) return t;
    for (let e = 0; e < A.startCount.length; e++) {
      const s = A.startCount[e], r = A.endCount[e];
      if (s !== 65535 || r !== 65535) {
        for (let i = s; i <= r; i++)
          if (this.lt(A, i, e) > 0) try {
            const B = String.fromCodePoint(i);
            t.push(B);
          } catch {
          }
      }
    }
    return t;
  }
  Qt(A) {
    const t = [];
    if (!A.groups) return t;
    for (let e = 0; e < A.groups.length; e += 3) {
      const s = A.groups[e], r = A.groups[e + 1], i = A.groups[e + 2];
      for (let B = s; B <= r; B++)
        if (i + (B - s) > 0) try {
          const Q = String.fromCodePoint(B);
          t.push(Q);
        } catch {
        }
    }
    return t;
  }
  lt(A, t, e) {
    if (A.idRangeOffset[e] === 0) return t + A.idDelta[e] & 65535;
    {
      const s = A.idRangeOffset[e] / 2 + (t - A.startCount[e]) - (A.startCount.length - e);
      if (s >= 0 && A.glyphIdArray && s < A.glyphIdArray.length) {
        const r = A.glyphIdArray[s];
        if (r !== 0) return r + A.idDelta[e] & 65535;
      }
    }
    return 0;
  }
  ht(A) {
    const t = A.codePointAt(0) || 0;
    return !(t >= 0 && t <= 31 && t !== 9 && t !== 10 && t !== 13 || t >= 127 && t <= 159);
  }
}
class lA {
  constructor() {
    E(this, "ct");
    const A = new G();
    this.ct = new aA(A);
  }
  extractCharacters(A) {
    return this.ct.Bt(A);
  }
  filterProblematicCharacters(A) {
    return this.ct.nt(A);
  }
  characterExists(A, t) {
    return this.ct.Et(A, t);
  }
  allCharactersExist(A, t) {
    return this.ct.ot(A, t);
  }
}
class cA {
  constructor(A) {
    E(this, "Dt");
    E(this, "Ct");
    E(this, "ut");
    E(this, "Pt");
    this.ut = A, this.Pt = new G(), this.Dt = document.createElement("canvas"), this.Ct = this.Dt.getContext("2d", { willReadFrequently: !0, alpha: !1 });
  }
  createTextureAtlas(A, t, e, s) {
    const r = A.length, i = Math.ceil(Math.sqrt(r)), B = Math.ceil(r / i), Q = t.width * i, n = t.height * B, g = typeof s == "object" ? s : null;
    this.It(Q, n), this.wt(A, t, i, e, g);
    const a = this.ut.UA(Q, n, { filter: "nearest" });
    return a.S(this.Dt), { framebuffer: a, columns: i, rows: B };
  }
  It(A, t) {
    this.Dt.width = A, this.Dt.height = t, this.Dt.style.width = A + "px", this.Dt.style.height = A + "px", this.Ct.imageSmoothingEnabled = !1, this.Dt.style.imageRendering = "pixelated", this.Ct.fillStyle = "black", this.Ct.fillRect(0, 0, A, t), this.Ct.textBaseline = "top", this.Ct.textAlign = "left", this.Ct.fillStyle = "white";
  }
  wt(A, t, e, s, r) {
    const i = s / r.head.unitsPerEm;
    for (let B = 0; B < A.length; B++) {
      const Q = B % e, n = Math.floor(B / e), g = A[B].character, a = this.ft(r, g);
      if (!a) continue;
      const h = g.codePointAt(0) || 0, u = this.Pt.NA(r, h), c = this.dt(r, u) * i, l = Q * t.width, d = n * t.height, C = l + 0.5 * t.width, P = d + 0.5 * t.height, w = Math.round(C - 0.5 * t.width), m = Math.round(P - 0.5 * s), y = w + 0.5 * (t.width - c), x = m + r.hhea.ascender * i;
      this._t(a, y, x, i);
    }
  }
  ft(A, t) {
    const e = t.codePointAt(0) || 0, s = this.Pt.NA(A, e);
    if (s === 0) return null;
    if (A.glyf && A.glyf[s] !== null) return A.glyf[s];
    if (b && b.T && b.T.glyf) {
      const r = b.T.glyf.zA(A, s);
      return A.glyf && r && (A.glyf[s] = r), r;
    }
    return null;
  }
  dt(A, t) {
    const e = A.hmtx;
    return e && e.aWidth ? t < e.aWidth.length ? e.aWidth[t] : e.aWidth[e.aWidth.length - 1] : 0;
  }
  _t(A, t, e, s) {
    if (!A || !A.xs || A.noc === 0) return;
    const { xs: r, ys: i, endPts: B, flags: Q } = A;
    if (!(r && i && B && Q)) return;
    this.Ct.beginPath();
    let n = 0;
    for (let g = 0; g < B.length; g++) {
      const a = B[g];
      if (!(a < n)) {
        if (a >= n) {
          const h = t + r[n] * s, u = e - i[n] * s;
          this.Ct.moveTo(h, u);
          let c = n + 1;
          for (; c <= a; )
            if (1 & Q[c]) {
              const l = t + r[c] * s, d = e - i[c] * s;
              this.Ct.lineTo(l, d), c++;
            } else {
              const l = t + r[c] * s, d = e - i[c] * s;
              let C = c + 1 > a ? n : c + 1;
              if (1 & Q[C]) {
                const P = t + r[C] * s, w = e - i[C] * s;
                this.Ct.quadraticCurveTo(l, d, P, w), c = C + 1;
              } else {
                const P = (l + (t + r[C] * s)) / 2, w = (d + (e - i[C] * s)) / 2;
                this.Ct.quadraticCurveTo(l, d, P, w), c = C;
              }
            }
          this.Ct.closePath();
        }
        n = a + 1;
      }
    }
    this.Ct.fill();
  }
}
class uA {
  constructor() {
    E(this, "rt");
    this.rt = new G();
  }
  calculateMaxGlyphDimensions(A, t, e) {
    let s = 0;
    const r = this.rt.et(e, t), i = r.lineHeight;
    for (const B of A) {
      const Q = this.rt.At(e, B);
      if (Q === 0) continue;
      const n = this.rt.tt(e, Q) * r.scale;
      s = Math.max(s, n);
    }
    return { width: Math.ceil(s), height: Math.ceil(i) };
  }
  getCharacterAdvanceWidth(A, t, e) {
    const s = this.rt.et(e, t), r = this.rt.At(e, A);
    return this.rt.tt(e, r) * s.scale;
  }
  getFontMetrics(A, t) {
    return this.rt.et(t, A);
  }
  st() {
    this.rt.st();
  }
}
class CA {
  constructor() {
    E(this, "Pt");
    this.Pt = new G();
  }
  createCharacterObjects(A, t) {
    return A.map((e, s) => {
      const r = e.codePointAt(0) || 0, i = this.vt(s);
      let B = 0;
      if (t.hmtx && t.hmtx.aWidth) {
        const Q = this.Pt.NA(t, r);
        Q > 0 && t.hmtx.aWidth[Q] !== void 0 && (B = t.hmtx.aWidth[Q]);
      }
      return { character: e, unicode: r, color: i, advanceWidth: B };
    });
  }
  vt(A) {
    return [A % 256, Math.floor(A / 256) % 256, Math.floor(A / 65536) % 256];
  }
  getCharacterColor(A, t) {
    if (!D.C(typeof A == "string", "Character must be a string.", { method: "getCharacterColor", providedValue: A })) return [0, 0, 0];
    const e = t.find((s) => s.character === A);
    return e ? e.color : [0, 0, 0];
  }
  getCharacterColors(A, t) {
    return D.C(typeof A == "string" && A.length > 0, "Characters must be a string with at least one character.", { method: "getCharacterColors", providedValue: A }) ? Array.from(A).map((e) => this.getCharacterColor(e, t) || [0, 0, 0]) : [[0, 0, 0]];
  }
}
class DA {
  constructor(A, t = 16) {
    E(this, "bt");
    E(this, "xt", []);
    E(this, "yt");
    E(this, "Mt", 16);
    E(this, "Gt", 0);
    E(this, "Ft", 0);
    E(this, "$t", { width: 0, height: 0 });
    E(this, "Yt");
    E(this, "Tt", "UrsaFont");
    E(this, "St");
    E(this, "Ot");
    E(this, "Ut");
    E(this, "Rt");
    this.Mt = t, this.St = new lA(), this.Ot = new cA(A), this.Ut = new uA(), this.Rt = new CA();
  }
  async kt(A) {
    let t;
    if (A) {
      const e = await fetch(A);
      if (!e.ok) throw new I(`Failed to load font file: ${e.status} ${e.statusText}`);
      t = await e.arrayBuffer();
    } else
      t = await (await fetch(`data:font/truetype;charset=utf-8;base64,AAEAAAAKAIAAAwAgT1MvMs+QEyQAAAEoAAAAYGNtYXAg7yVJAAAFjAAACSBnbHlmuHLTdAAAErQAAGi0aGVhZFvXdUwAAACsAAAANmhoZWELAQUCAAAA5AAAACRobXR4BACDgAAAAYgAAAQEbG9jYQAy54AAAA6sAAAECG1heHABIgCCAAABCAAAACBuYW1lVs/OSgAAe2gAAAOicG9zdABpADQAAH8MAAAAIAABAAAAAQAAzOWHqV8PPPUAAAQAAAAAAHxiGCcAAAAAfGIYJwAAAAAEAAQAAAAACAACAAEAAAAAAAEAAAQAAAAAAAQAAAAAAAcAAAEAAAAAAAAAAAAAAAAAAAEBAAEAAAEBAIAAIAAAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAgQAAZAABQAEAgACAAAAAAACAAIAAAACAAAzAMwAAAAABAAAAAAAAACAAACLAABw4wAAAAAAAAAAWUFMLgBAACAmawQAAAAAAAQAAAAAAAFRAAAAAAMABAAAAAAgAAAEAAAABAAAAAQAAAAEAAGABAABAAQAAIAEAACABAAAgAQAAIAEAAGABAABAAQAAQAEAACABAABAAQAAIAEAACABAABAAQAAIAEAACABAAAgAQAAIAEAACABAAAgAQAAIAEAACABAAAgAQAAIAEAACABAABAAQAAIAEAAEABAAAgAQAAIAEAACABAAAgAQAAIAEAACABAAAgAQAAIAEAACABAAAgAQAAIAEAACABAAAgAQAAIAEAACABAAAgAQAAIAEAACABAAAgAQAAIAEAACABAAAgAQAAIAEAACABAAAgAQAAIAEAACABAAAgAQAAIAEAACABAABAAQAAIAEAAEABAAAgAQAAIAEAAEABAAAgAQAAIAEAACABAAAgAQAAIAEAAEABAAAgAQAAIAEAAGABAAAgAQAAIAEAAGABAAAgAQAAIAEAACABAAAgAQAAIAEAAEABAAAgAQAAIAEAACABAAAgAQAAIAEAACABAAAgAQAAIAEAACABAABgAQAAQAEAACABAAAAAQAAgAEAACABAAAgAQAAIAEAACABAACAAQAAAAEAAIABAABgAQAAgAEAACABAAAgAQAAAAEAACABAAAAAQAAAAEAAAABAAAAAQAAAAEAAIABAADAAQAAAAEAAAABAAAgAQAAYAEAAAABAAAAAQAAIAEAAAA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AIAAAACA/YAAgAAAAIAAAP8AAoABAAAA/4AAAP+A/4AAgAAAAIAAAP8AA4AAAP8AAAAAgAAAAIAAAP+AAAD/gAAA/4AAAP+AAAD/gAAA/4AAAACAAAAAgAAAAIAAAACAAAAAgAAAAAAAAP+AAAD/gAAAAAAAAP8AAAAAgAAAAAAAAP+AAAD/gAAAAAAAAwCAAIAEAAQAABcAHQAjAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAIAAAAAgAAA/4AAAACAAAAAgAAA/4AAAACAAAD9AAAA/4AAAACAAAD/gAAAAIAAgAAAAIAAAACAAAD/AAAAAQAAAP+AAAAEAAAA/4AAAP8AAAD/gAAAAIAAAP8AAAD/gAAA/4AAAACAAAABAAAAAIAAAAEAAAAAAP+AAAD/gAAAAQD+gP8AAAAAgAAAAIAAAAABAYACgAKABAAAAwAAAQEBAQGAAQAAAP8ABAAAAP6AAAAAAAABAQAAgAMABAAAEwAAAQEBAQEBAQEBAQEBAQEBAQEBAQECAAEAAAD/gAAA/4AAAACAAAAAgAAA/wAAAP+AAAD/gAAAAIAAAACABAAAAP+AAAD/gAAA/oAAAP+AAAD/gAAAAIAAAACAAAABgAAAAIAAAAAAAAEBAACAAwAEAAATAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEAAQAAAACAAAAAgAAA/4AAAP+AAAD/AAAAAIAAAACAAAD/gAAA/4AEAAAA/4AAAP+AAAD+gAAA/4AAAP+AAAAAgAAAAIAAAAGAAAAAgAAAAAAABQCAAYADgAQAAAMABwATABcAGwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAAIAAAP+AAYAAgAAA/4D/AAEAAAABAAAA/wAAAP8AAAD/AAAAAQD/gACAAAD/gAGAAIAAAP+ABAAAAP+AAAAAgAAA/4AAAAAAAAD/gAAA/4AAAP+AAAAAgAAAAIAAAP8AAAD/gAAAAIAAAP+AAAAAAAABAQAAgAOAAwAACwAAAQEBAQEBAQEBAQEBAgAAgAAAAQAAAP8AAAD/gAAA/wAAAAEAAwAAAP8AAAD/gAAA/wAAAAEAAAAAgAAAAAAAAQCAAAACAAGAAAcAAAEBAQEBAQEBAQABAAAA/4AAAP8AAAAAgAGAAAD/AAAA/4AAAACAAAAAAAABAIABgAOAAgAAAwAAAQEBAQCAAwAAAP0AAgAAAP+AAAAAAAABAQAAgAIAAYAAAwAAAQEBAQEAAQAAAP8AAYAAAP8AAAAAAAABAIAAgAQAA4AAFwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAwABAAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/AAAAAIAAAACAAAAAgAAAAIAAAACAA4AAAP+AAAD/gAAA/4AAAP+AAAD/gAAA/4AAAACAAAAAgAAAAIAAAACAAAAAgAAAAAAAAwCAAIADgAQAAAsAEQAXAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAIAAAAAgAAA/4AAAP4AAAD/gAAAAIAAgAAAAIAAAACAAAD/gAAA/4AAAAEAAAAEAAAA/4AAAP2AAAD/gAAAAIAAAAKAAAAAAP8AAAAAgAAAAID/AP+AAAD/AAAAAYAAAAABAIAAgAOABAAADQAAAQEBAQEBAQEBAQEBAQEBgAEAAAABAAAA/QAAAAEAAAD/AAAAAIAAAACABAAAAP0AAAD/gAAAAIAAAAGAAAAAgAAAAIAAAAABAIAAgAOABAAAGwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAAgAAAACAAAD/gAAA/4AAAP+AAAABgAAA/QAAAACAAAAAgAAAAIAAAACAAAD/AAAA/wAAAACABAAAAP+AAAD/AAAA/4AAAP+AAAD/gAAA/4AAAACAAAAAgAAAAIAAAACAAAABAAAA/wAAAAEAAAAAAAABAIAAgAOABAAAGwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAAgAAAACAAAD/gAAAAIAAAP+AAAD+AAAA/4AAAAEAAAABAAAA/wAAAAEAAAD/AAAA/wAAAACABAAAAP+AAAD/AAAA/4AAAP8AAAD/gAAAAIAAAACAAAD/gAAAAQAAAACAAAABAAAA/4AAAACAAAAAAAABAIAAgAOABAAAEQAAAQEBAQEBAQEBAQEBAQEBAQEBAYABAAAA/4AAAP+AAAABAAAAAQAAAP8AAAD+AAAAAIAAAACABAAAAP+AAAD/gAAA/wAAAAEAAAD9gAAAAQAAAAGAAAAAgAAAAAEAgACAA4AEAAATAAABAQEBAQEBAQEBAQEBAQEBAQEBAQCAAwAAAP4AAAABgAAAAIAAAP+AAAD+AAAA/4AAAAEAAAABAAAA/gAEAAAA/4AAAP8AAAD/gAAA/wAAAP+AAAAAgAAAAIAAAP+AAAABAAAAAAAAAgCAAIADgAQAABMAFwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQACAAAAAIAAAP8AAAD/AAAAAYAAAACAAAD/gAAA/gAAAP+AAAAAgACAAAABAAAABAAAAP+AAAD/gAAAAIAAAP8AAAD/gAAA/wAAAP+AAAAAgAAAAoAAAP6A/wAAAAEAAAEAgACAA4AEAAAPAAABAQEBAQEBAQEBAQEBAQEBAIADAAAA/4AAAP+AAAD/AAAAAIAAAACAAAD+gAAA/4AEAAAA/oAAAP+AAAD+gAAAAYAAAACAAAABAAAA/4AAAAAAAAMAgACAA4AEAAATABcAGwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAAgAAAACAAAD/gAAAAIAAAP+AAAD+AAAA/4AAAACAAAD/gAAAAIAAgAAAAQAAAP8AAAABAAAABAAAAP+AAAD/AAAA/4AAAP8AAAD/gAAAAIAAAAEAAAAAgAAAAQAAAAAA/wAAAAEA/oD/AAAAAQAAAAACAIAAgAOABAAACwAPAAABAQEBAQEBAQEBAQEBAQEBAQACAAAAAIAAAP8AAAD+gAAA/4AAAACAAIAAAAEAAAAEAAAA/4AAAP0AAAABAAAAAIAAAAGAAAAAAP6AAAABgAACAQABAAIAA4AAAwAHAAABAQEBAQEBAQEAAQAAAP8AAAABAAAA/wADgAAA/wAAAP+AAAD/AAAAAAIAgACAAgADgAADAAsAAAEBAQEBAQEBAQEBAQEAAQAAAP8AAAABAAAA/4AAAP8AAAAAgAOAAAD/AAAA/4AAAP8AAAD/gAAAAIAAAAABAQAAgAOABAAAGwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQKAAQAAAP+AAAD/gAAA/4AAAACAAAAAgAAAAIAAAP8AAAD/gAAA/4AAAP+AAAAAgAAAAIAAAACABAAAAP+AAAD/gAAA/4AAAP+AAAD/gAAA/4AAAP+AAAAAgAAAAIAAAACAAAAAgAAAAIAAAACAAAAAAAACAIABgAOAAwAAAwAHAAABAQEBAQEBAQCAAwAAAP0AAAADAAAA/QADAAAA/4AAAP+AAAD/gAAAAAEAgACAAwAEAAAbAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAIABAAAAAIAAAACAAAAAgAAA/4AAAP+AAAD/gAAA/wAAAACAAAAAgAAAAIAAAP+AAAD/gAAA/4AEAAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/gAAA/4AAAACAAAAAgAAAAIAAAACAAAAAgAAAAIAAAAAAAAIAgACAA4AEAAATABcAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAAgAAAACAAAD/gAAA/4AAAP8AAAAAgAAAAIAAAP8AAAD/AAAAAIAAgAEAAAD/AAQAAAD/gAAA/4AAAP+AAAD/gAAAAIAAAACAAAAAgAAA/4AAAACAAAD+AAAA/wAAAAACAIAAgAOABAAAEQAVAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQACAAAAAIAAAP6AAAAAgAAA/wAAAAGAAAD+AAAA/4AAAACAAgAAgAAA/4AEAAAA/4AAAP6AAAABAAAAAIAAAP2AAAD/gAAAAIAAAAKAAAD+AAAA/4AAAAAAAAIAgACAA4AEAAAPABMAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAYABAAAAAIAAAACAAAD/AAAA/wAAAP8AAAAAgAAAAIAAAAAAAQAAAAQAAAD/gAAA/4AAAP2AAAABAAAA/wAAAAKAAAAAgAAA/4D/AAAAAQAAAwCAAIADgAQAAAsADwATAAABAQEBAQEBAQEBAQEBAQEBAQEBAQCAAoAAAACAAAD/gAAAAIAAAP+AAAD9gAEAAAABAAAA/wAAAAEAAAAEAAAA/4AAAP8AAAD/gAAA/wAAAP+AAAADAP8AAAABAP6A/wAAAAEAAAAAAQCAAIADgAQAABMAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQACAAAAAIAAAP8AAAD/AAAAAQAAAAEAAAD/gAAA/gAAAP+AAAAAgAQAAAD/gAAA/4AAAACAAAD9gAAAAIAAAP+AAAD/gAAAAIAAAAKAAAAAAAACAIAAgAOABAAACwATAAABAQEBAQEBAQEBAQEBAQEBAQEBAQCAAgAAAACAAAAAgAAA/4AAAP+AAAD+AAEAAAAAgAAAAIAAAP+AAAAEAAAA/4AAAP+AAAD+gAAA/4AAAP+AAAADAP2AAAAAgAAAAYAAAACAAAEAgACAA4AEAAAXAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAIAAAAAgAAA/wAAAP8AAAABAAAA/wAAAAEAAAABAAAA/4AAAP4AAAD/gAAAAIAEAAAA/4AAAP+AAAAAgAAA/wAAAP+AAAD/AAAAAIAAAP+AAAD/gAAAAIAAAAKAAAAAAAABAIAAgAOABAAACQAAAQEBAQEBAQEBAQCAAwAAAP4AAAABAAAA/wAAAP8ABAAAAP+AAAD/AAAA/4AAAP6AAAAAAQCAAIADgAQAABUAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAIAAAAAgAAA/wAAAP8AAAABAAAA/4AAAAGAAAD/gAAA/gAAAP+AAAAAgAQAAAD/gAAA/4AAAACAAAD9gAAAAQAAAACAAAD+gAAA/4AAAACAAAACgAAAAAEAgACAA4AEAAALAAABAQEBAQEBAQEBAQEAgAEAAAABAAAAAQAAAP8AAAD/AAAA/wAEAAAA/gAAAAIAAAD8gAAAAQAAAP8AAAAAAAABAIAAgAOABAAACwAAAQEBAQEBAQEBAQEBAIADAAAA/wAAAAEAAAD9AAAAAQAAAP8ABAAAAP+AAAD9gAAA/4AAAACAAAACgAAAAAAAAQCAAIAEAAQAAA8AAAEBAQEBAQEBAQEBAQEBAQEBAAMAAAD/gAAA/4AAAP4AAAD/gAAAAQAAAAEAAAD+gAQAAAD/gAAA/YAAAP+AAAAAgAAAAQAAAP8AAAACgAAAAAAAAQCAAIADgAQAABsAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAgAEAAAAAgAAAAIAAAAEAAAD/gAAA/4AAAP+AAAAAgAAAAIAAAACAAAD/AAAA/4AAAP+AAAD/AAQAAAD/AAAAAIAAAACAAAD/gAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/gAAAAIAAAACAAAD/AAAAAAAAAQCAAIADgAQAAAUAAAEBAQEBAQCAAQAAAAIAAAD9AAQAAAD9AAAA/4AAAAABAIAAgAQABAAAEwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEAgAEAAAAAgAAAAIAAAACAAAABAAAA/wAAAP+AAAD/gAAA/4AAAP8ABAAAAP+AAAD/gAAAAIAAAACAAAD8gAAAAgAAAP+AAAAAgAAA/gAAAAAAAAEAgACABAAEAAATAAABAQEBAQEBAQEBAQEBAQEBAQEBAQCAAQAAAACAAAAAgAAAAIAAAAEAAAD/AAAA/4AAAP+AAAD/gAAA/wAEAAAA/4AAAP+AAAD/gAAAAYAAAPyAAAABAAAAAIAAAACAAAD+AAAAAAAAAgCAAIADgAQAAAsADwAAAQEBAQEBAQEBAQEBAQEBAQEAAgAAAACAAAD/gAAA/gAAAP+AAAAAgACAAAABAAAABAAAAP+AAAD9gAAA/4AAAACAAAACgAAAAAD9gAAAAoAAAgCAAIADgAQAAAkADQAAAQEBAQEBAQEBAQEBAQEAgAKAAAAAgAAA/4AAAP6AAAD/AAEAAAABAAAABAAAAP+AAAD+gAAA/4AAAP8AAAADAP6AAAABgAAAAAIAgACABAAEAAAPABcAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAAgAAAACAAAAAgAAA/4AAAP+AAAD+AAAA/4AAAACAAIAAAAEAAAD/gAAAAIAAAAQAAAD/gAAA/gAAAP8AAAAAgAAA/4AAAACAAAACgAAAAAD9gAAAAIAAAACAAAABgAACAIAAgAOABAAAEwAXAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAgAKAAAAAgAAA/4AAAP+AAAAAgAAAAIAAAP8AAAD/gAAA/4AAAP8AAQAAAAEAAAAEAAAA/4AAAP8AAAD/gAAA/4AAAP+AAAD/gAAAAIAAAACAAAD/AAAAAwD/AAAAAQAAAQCAAIADgAQAABsAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAIAAAAAgAAA/wAAAP8AAAABgAAAAIAAAP+AAAD+AAAA/4AAAAEAAAABAAAA/oAAAP+AAAAAgAQAAAD/gAAA/4AAAACAAAD/AAAA/4AAAP8AAAD/gAAAAIAAAACAAAD/gAAAAQAAAACAAAABAAAAAAAAAQCAAIADgAQAAAcAAAEBAQEBAQEBAIADAAAA/wAAAP8AAAD/AAQAAAD/gAAA/QAAAAMAAAAAAAABAIAAgAOABAAACwAAAQEBAQEBAQEBAQEBAIABAAAAAQAAAAEAAAD/gAAA/gAAAP+ABAAAAP0AAAADAAAA/QAAAP+AAAAAgAAAAAAAAQCAAIADgAQAAA8AAAEBAQEBAQEBAQEBAQEBAQEAgAEAAAABAAAAAQAAAP+AAAD/gAAA/wAAAP+AAAD/gAQAAAD+AAAAAgAAAP4AAAD/AAAA/4AAAACAAAABAAAAAAAAAQCAAIAEAAQAABMAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAIABAAAAAIAAAACAAAAAgAAAAQAAAP8AAAD/gAAA/4AAAP+AAAD/AAQAAAD+AAAAAIAAAP+AAAACAAAA/IAAAACAAAAAgAAA/4AAAP+AAAAAAAABAIAAgAOABAAAGwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQCAAQAAAAEAAAABAAAA/4AAAP+AAAAAgAAAAIAAAP8AAAD/AAAA/wAAAACAAAAAgAAA/4AAAP+ABAAAAP8AAAABAAAA/wAAAP+AAAD/gAAA/4AAAP8AAAABAAAA/wAAAAEAAAAAgAAAAIAAAACAAAAAAAABAIAAgAOABAAADwAAAQEBAQEBAQEBAQEBAQEBAQCAAQAAAAEAAAABAAAA/4AAAP+AAAD/AAAA/4AAAP+ABAAAAP6AAAABgAAA/oAAAP+AAAD+gAAAAYAAAACAAAAAAAABAIAAgAOABAAAFwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAIADAAAA/4AAAP+AAAD/gAAA/4AAAAIAAAD9AAAAAIAAAACAAAAAgAAAAIAAAP4ABAAAAP8AAAD/gAAA/4AAAP+AAAD/gAAA/4AAAAEAAAAAgAAAAIAAAACAAAAAgAAAAAAAAQEAAIADAAQAAAcAAAEBAQEBAQEBAQACAAAA/wAAAAEAAAD+AAQAAAD/gAAA/YAAAP+AAAAAAAABAIAAgAQAA4AAFwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAIABAAAAAIAAAACAAAAAgAAAAIAAAACAAAD/AAAA/4AAAP+AAAD/gAAA/4AAAP+AA4AAAP+AAAD/gAAA/4AAAP+AAAD/gAAA/4AAAACAAAAAgAAAAIAAAACAAAAAgAAAAAAAAQEAAIADAAQAAAcAAAEBAQEBAQEBAQACAAAA/gAAAAEAAAD/AAQAAAD8gAAAAIAAAAKAAAAAAAABAIACAAQABAAAFwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAgAAgAAAAIAAAACAAAAAgAAA/wAAAP+AAAD/gAAA/4AAAP8AAAAAgAAAAIAAAACABAAAAP+AAAD/gAAA/4AAAP+AAAAAgAAAAIAAAP+AAAD/gAAAAIAAAACAAAAAgAAAAAAAAQCAAIADgAEAAAMAAAEBAQEAgAMAAAD9AAEAAAD/gAAAAAAAAQEAAoACgAQAAAkAAAEBAQEBAQEBAQEBAAEAAAAAgAAA/4AAAP+AAAD/gAQAAAD/gAAA/wAAAACAAAAAgAAAAAEAgACAA4ADAAAPAAABAQEBAQEBAQEBAQEBAQEBAQACgAAA/4AAAP+AAAD/AAAAAQAAAP6AAAD/gAAAAIADAAAA/YAAAACAAAABgAAA/oAAAP+AAAAAgAAAAYAAAAAAAAIAgACAA4AEAAAJAA0AAAEBAQEBAQEBAQEBAQEBAIABAAAAAYAAAACAAAD/gAAA/YABAAAAAQAAAAQAAAD/AAAA/4AAAP6AAAD/gAAAAgD+gAAAAYAAAAABAIAAgAOAAwAAEwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAIAAAAAgAAA/wAAAP8AAAABAAAAAQAAAP+AAAD+AAAA/4AAAACAAwAAAP+AAAD/gAAAAIAAAP6AAAAAgAAA/4AAAP+AAAAAgAAAAYAAAAAAAAIAgACAA4AEAAAJAA0AAAEBAQEBAQEBAQEBAQEBAoABAAAA/YAAAP+AAAAAgAAAAYD/AAAAAQAAAAQAAAD8gAAAAIAAAAGAAAAAgAAA/4D+gAAAAYAAAAACAIAAgAOAAwAADQARAAABAQEBAQEBAQEBAQEBAQEBAQEBAAIAAAAAgAAA/gAAAAGAAAD+AAAA/4AAAACAAIAAAAEAAAADAAAA/4AAAP8AAAD/gAAA/4AAAACAAAABgAAAAAD/gAAAAIAAAAABAQAAgAOAA4AACwAAAQEBAQEBAQEBAQEBAYACAAAA/oAAAAEAAAD/AAAA/wAAAACAA4AAAP+AAAD/AAAA/4AAAP8AAAACgAAAAAAAAgCAAIADgAOAAA8AEwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAIAAAAAgAAA/4AAAP4AAAABgAAA/oAAAP+AAAAAgACAAAABAAAAA4AAAP+AAAD+AAAA/4AAAACAAAAAgAAAAIAAAAEAAAAAAP8AAAABAAABAIAAgAOABAAACwAAAQEBAQEBAQEBAQEBAIABAAAAAYAAAACAAAD/AAAA/wAAAP8ABAAAAP8AAAD/gAAA/gAAAAIAAAD+AAAAAAAAAgGAAIACgAQAAAMABwAAAQEBAQEBAQEBgAEAAAD/AAAAAQAAAP8ABAAAAP+AAAD/gAAA/YAAAAACAIAAgAOABAAAAwAPAAABAQEBAQEBAQEBAQEBAQEBAoABAAAA/wAAAAEAAAD/gAAA/gAAAP+AAAABAAAAAQAEAAAA/4AAAP+AAAD+AAAA/4AAAACAAAABAAAA/wAAAAABAIAAgAOAA4AAEwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEAgAEAAAAAgAAAAQAAAP+AAAAAgAAAAIAAAP8AAAD/gAAA/4AAAP8AA4AAAP8AAAAAgAAA/4AAAP8AAAD/gAAA/4AAAACAAAAAgAAA/wAAAAAAAAEBgACAAwAEAAAHAAABAQEBAQEBAQGAAQAAAACAAAD/AAAA/4AEAAAA/QAAAP+AAAAAgAAAAAAAAQCAAIAEAAMAABMAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQABAAAAAIAAAAEAAAAAgAAA/wAAAP+AAAD/gAAA/4AAAP8AAAAAgAMAAAD/gAAAAIAAAP+AAAD+AAAAAYAAAP+AAAAAgAAA/oAAAAIAAAAAAAABAIAAgAOAAwAADwAAAQEBAQEBAQEBAQEBAQEBAQCAAQAAAACAAAABAAAAAIAAAP8AAAD/gAAA/4AAAP8AAwAAAP+AAAAAgAAA/4AAAP4AAAABgAAA/4AAAP8AAAAAAAACAIAAgAOAAwAACwAPAAABAQEBAQEBAQEBAQEBAQEBAQACAAAAAIAAAP+AAAD+AAAA/4AAAACAAIAAAAEAAAADAAAA/4AAAP6AAAD/gAAAAIAAAAGAAAAAAP6AAAABgAACAIAAgAOAAwAACQANAAABAQEBAQEBAQEBAQEBAQCAAoAAAACAAAD/gAAA/oAAAP8AAQAAAAEAAAADAAAA/4AAAP+AAAD/gAAA/wAAAAIA/4AAAACAAAAAAgCAAIAEAAMAAA0AEQAAAQEBAQEBAQEBAQEBAQEBAQEBAQACgAAAAIAAAP+AAAD/AAAA/oAAAP+AAAAAgACAAAABAAAAAwAAAP6AAAD/gAAA/4AAAAEAAAAAgAAAAIAAAAAA/4AAAACAAAAAAQEAAIADgAMAAAkAAAEBAQEBAQEBAQEBAAIAAAAAgAAA/wAAAP+AAAD/AAMAAAD/gAAA/wAAAAEAAAD+AAAAAAEAgACABAADAAATAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEAAoAAAP6AAAABgAAAAIAAAP+AAAD9AAAAAgAAAP6AAAD/gAAAAIADAAAA/4AAAP+AAAD/gAAA/4AAAP+AAAAAgAAAAIAAAACAAAAAgAAAAAAAAQCAAIADgAOAABMAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQABAAAAAQAAAP8AAAAAgAAAAQAAAP+AAAD+gAAA/4AAAP+AAAAAgAOAAAD/gAAA/4AAAP6AAAAAgAAA/4AAAP+AAAAAgAAAAYAAAACAAAAAAAABAIAAgAOAAwAADwAAAQEBAQEBAQEBAQEBAQEBAQCAAQAAAACAAAAAgAAAAQAAAP+AAAD/gAAA/oAAAP+AAwAAAP4AAAAAgAAAAYAAAP2AAAAAgAAA/4AAAACAAAAAAAABAIAAgAOAAwAADwAAAQEBAQEBAQEBAQEBAQEBAQCAAQAAAAEAAAABAAAA/4AAAP+AAAD/AAAA/4AAAP+AAwAAAP6AAAABgAAA/oAAAP+AAAD/gAAAAIAAAACAAAAAAAABAIAAgAQAAwAAEwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEAgAEAAAAAgAAAAIAAAACAAAABAAAA/4AAAP8AAAD/gAAA/wAAAP+AAwAAAP6AAAAAgAAA/4AAAAGAAAD+AAAA/4AAAACAAAD/gAAAAIAAAAAAAAEAgACAA4ADAAAbAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAIABAAAAAQAAAAEAAAD/gAAA/4AAAACAAAAAgAAA/wAAAP8AAAD/AAAAAIAAAACAAAD/gAAA/4ADAAAA/4AAAACAAAD/gAAA/4AAAP+AAAD/gAAA/4AAAACAAAD/gAAAAIAAAACAAAAAgAAAAIAAAAAAAAEAgACAA4ADAAAPAAABAQEBAQEBAQEBAQEBAQEBAIABAAAAAQAAAAEAAAD/gAAA/gAAAAGAAAD+gAAA/4ADAAAA/wAAAAEAAAD+AAAA/4AAAACAAAAAgAAAAIAAAAAAAAEAgACAA4ADAAATAAABAQEBAQEBAQEBAQEBAQEBAQEBAQCAAwAAAP+AAAD/gAAA/4AAAAGAAAD9AAAAAIAAAACAAAAAgAAA/oADAAAA/4AAAP+AAAD/gAAA/4AAAP+AAAAAgAAAAIAAAACAAAAAgAAAAAAAAQCAAIADAAQAABMAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAYABgAAA/wAAAP+AAAAAgAAAAQAAAP6AAAD/gAAA/4AAAACAAAAAgAQAAAD/gAAA/wAAAP+AAAD/AAAA/4AAAACAAAABAAAAAIAAAAEAAAAAAAABAYAAgAKABAAAAwAAAQEBAQGAAQAAAP8ABAAAAPyAAAAAAAABAQAAgAOABAAAEwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAGAAAAAgAAAAIAAAP+AAAD/gAAA/oAAAAEAAAAAgAAA/4AAAP8ABAAAAP+AAAD/AAAA/4AAAP8AAAD/gAAAAIAAAAEAAAAAgAAAAQAAAAAAAAEAgAGAA4ADAAAPAAABAQEBAQEBAQEBAQEBAQEBAQABAAAAAQAAAACAAAD/gAAA/wAAAP8AAAD/gAAAAIADAAAA/4AAAACAAAD/AAAA/4AAAACAAAD/gAAAAQAAAAAAAAEAAAAABAAEAAATAAABAQEBAQEBAQEBAQEBAQEBAQEBAQAAAYAAAAEAAAAAgAAAAIAAAACAAAD/AAAA/4AAAP+AAAD/AAAA/wAEAAAA/4AAAP+AAAD/gAAA/wAAAP6AAAABAAAAAQAAAACAAAAAgAAAAAAAAQIAAAAEAAQAAAMAAAEBAQECAAIAAAD+AAQAAAD8AAAAAAAAAgCAAIADgAQAABcAGwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQGAAYAAAP8AAAABAAAA/4AAAP+AAAABgAAA/QAAAACAAAAAgAAA/wAAAACAAAAAgAGAAIAAAP+ABAAAAP+AAAD/AAAA/4AAAP+AAAD/gAAA/4AAAACAAAAAgAAAAIAAAACAAAABAAAAAAAAAP+AAAAAAQCAAIADgAQAABsAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAgAEAAAABAAAAAQAAAP+AAAAAgAAA/wAAAAEAAAD/AAAA/wAAAP8AAAABAAAA/wAAAACAAAD/gAQAAAD+gAAAAYAAAP8AAAD/gAAA/4AAAP+AAAD/gAAA/4AAAACAAAAAgAAAAIAAAACAAAAAgAAAAAAABACAAIAEAAQAABcAGwAfACMAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAAoAAAP4AAAABgAAAAIAAAACAAAD/gAAA/YAAAAIAAAD+gAAA/4AAAP+AAAAAgAEAAAAAgAAAAQAAgAAA/4D9AACAAAD/gAQAAAD/gAAA/4AAAP+AAAD/gAAA/wAAAP+AAAAAgAAAAIAAAACAAAAAgAAAAQAAAP8A/4AAAACAAQAAAP+AAAD+gAAA/4AAAAAEAIAAgAQAA4AAAwAHAAsADwAAAQEBAQEBAQEBAQEBAQEBAQCAAIAAAP+AAQAAgAAA/4ABAACAAAD/gAEAAIAAAP+AA4AAAP0AAAADAAAA/QAAAAMAAAD9AAAAAwAAAP0AAAAAAQIAAAAEAAQAAAkAAAEBAQEBAQEBAQEDgACAAAD+AAAAAIAAAACAAAAAgAQAAAD8AAAAAQAAAAEAAAABAAAAAAgAAAAABAAEAAADAAcACwAPABMAFwAbAB8AAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAABAAAA/wACAAEAAAD/AP8AAQAAAP8AAgABAAAA/wD9AAEAAAD/AAIAAQAAAP8A/wABAAAA/wACAAEAAAD/AAQAAAD/AAAAAQAAAP8AAAAAAAAA/wAAAAEAAAD/AAAAAAAAAP8AAAABAAAA/wAAAAAAAAD/AAAAAQAAAP8AAAAAAQIAAAADAAQAAAMAAAEBAQECAAEAAAD/AAQAAAD8AAAAAAAAAgGAAIACgAQAAAMABwAAAQEBAQEBAQEBgAEAAAD/AAAAAQAAAP8ABAAAAP6AAAD/gAAA/oAAAAABAgAAAAQAAgAAAwAAAQEBAQIAAgAAAP4AAgAAAP4AAAAAAAAEAIAAAAQABAAAAwAHAAsADwAAAQEBAQEBAQEBAQEBAQEBAQCAAIAAAP+AAQAAgAAA/4ABAACAAAD/gAEAAIAAAP+ABAAAAPwAAAAEAAAA/AAAAAQAAAD8AAAABAAAAPwAAAAAAQCAAIADgAOAABMAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAoABAAAA/oAAAP+AAAD/gAAA/4AAAACAAAAAgAAAAIAAAAEAAAD/gAOAAAD+AAAA/wAAAACAAAAAgAAAAIAAAACAAAAAgAAA/wAAAAEAAAAAAAABAAAAAAQABAAACwAAAQEBAQEBAQEBAQEBAAAEAAAA/gAAAP+AAAD/gAAA/4AAAP+ABAAAAPwAAAAAgAAAAIAAAACAAAAAgAAAAAAAAQCAAIAEAAOAABsAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAgACAAAAAgAAAAIAAAACAAAAAgAAAAIAAAACAAAD/gAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/gAOAAAD/gAAAAIAAAP8AAAABAAAA/oAAAAGAAAD9AAAAAIAAAP+AAAABAAAA/wAAAAGAAAD+gAAAAAAAAQAAAAACAAQAAAkAAAEBAQEBAQEBAQEAAACAAAAAgAAAAIAAAACAAAD+AAQAAAD/AAAA/wAAAP8AAAD/AAAAAAEAAAAABAAEAAATAAABAQEBAQEBAQEBAQEBAQEBAQEBAQKAAYAAAP8AAAD/AAAA/4AAAP+AAAD/AAAAAIAAAACAAAAAgAAAAQAEAAAA/wAAAP+AAAD/gAAA/wAAAP8AAAABgAAAAQAAAACAAAAAgAAAAAAAAQAAAAAEAAIAAA8AAAEBAQEBAQEBAQEBAQEBAQEBgAEAAAAAgAAAAIAAAACAAAD8AAAAAIAAAACAAAAAgAIAAAD/gAAA/4AAAP+AAAD/gAAAAIAAAACAAAAAgAAAAAAAAgAAAAAEAAQAAAMABwAAAQEBAQEBAQEAAAIAAAD+AAIAAgAAAP4ABAAAAP4AAAAAAAAA/gAAAAAEAAACAAQABAAAAwAHAAsADwAAAQEBAQEBAQEBAQEBAQEBAQAAAQAAAP8AAgABAAAA/wD/AAEAAAD/AAIAAQAAAP8ABAAAAP8AAAABAAAA/wAAAAAAAAD/AAAAAQAAAP8AAAAABAIAAAAEAAQAAAMABwALAA8AAAEBAQEBAQEBAQEBAQEBAQECAAEAAAD/AAEAAQAAAP8A/wABAAAA/wABAAEAAAD/AAQAAAD/AAAAAAAAAP8AAAAAAAAA/wAAAAAAAAD/AAAAAAEDAAAABAAEAAADAAABAQEBAwABAAAA/wAEAAAA/AAAAAAAAAEAAAAABAAEAAAFAAABAQEBAQEAAAQAAAD9AAAA/wAEAAAA/wAAAP0AAAAAAQAAAAABAAQAAAMAAAEBAQEAAAEAAAD/AAQAAAD8AAAAAAAAAwCAAIADAAOAAAMABwALAAABAQEBAQEBAQEBAQEAgACAAAD/gAEAAIAAAP+AAQAAgAAA/4ADgAAA/QAAAAMAAAD9AAAAAwAAAP0AAAAAAAABAYABgAQABAAACwAAAQEBAQEBAQEBAQEBAYABAAAAAIAAAAEAAAD+gAAA/4AAAP+ABAAAAP8AAAD/gAAA/wAAAACAAAAAgAAAAAAAAQAAAYACgAQAAAsAAAEBAQEBAQEBAQEBAQGAAQAAAP+AAAD/gAAA/oAAAAEAAAAAgAQAAAD+gAAA/4AAAP+AAAABAAAAAIAAAAAAAAEAAAAABAAEAAAJAAABAQEBAQEBAQEBAwABAAAA/AAAAAEAAAABAAAAAQAEAAAA/AAAAAKAAAAAgAAAAIAAAAABAIAAgAMABAAACwAAAQEBAQEBAQEBAQEBAgABAAAA/4AAAP6AAAD/gAAAAIAAAAEABAAAAP0AAAD/gAAAAIAAAAEAAAAAgAAAAAAAAQAAAAAEAAQAAAUAAAEBAQEBAQAAAQAAAAMAAAD8AAQAAAD9AAAA/wAAAAACAIAAgAMAAoAACwAPAAABAQEBAQEBAQEBAQEBAQEBAQABgAAAAIAAAP+AAAD+gAAAAQAAAP8A/4AAgAAA/4ACgAAA/4AAAP8AAAD/gAAAAIAAAAEAAAAAAAAA/wAAAAACAIAAgAMABAAACwAPAAABAQEBAQEBAQEBAQEBAQEBAgABAAAA/4AAAP6AAAABAAAA/wAAAAEA/oAAgAAA/4AEAAAA/QAAAP+AAAAAgAAAAQAAAACAAAD/gAAA/wAAAAABAIAAgAQABAAADQAAAQEBAQEBAQEBAQEBAQECAAIAAAD/AAAA/4AAAP6AAAD/gAAAAIAAAAEABAAAAP+AAAD9gAAA/4AAAACAAAABAAAAAIAAAAACAAAAAAQABAAAAwAHAAABAQEBAQEBAQAABAAAAPwAAQAAAAIAAAAEAAAA/AAAAAMA/gAAAAIAAAEAgACABAAEAAARAAABAQEBAQEBAQEBAQEBAQEBAQECAAIAAAD/AAAAAQAAAP8AAAD/gAAA/oAAAP+AAAAAgAAAAQAEAAAA/4AAAP+AAAD/gAAA/oAAAP+AAAAAgAAAAQAAAACAAAAAAQAAAAACgAKAAAsAAAEBAQEBAQEBAQEBAQAAAYAAAACAAAAAgAAA/wAAAP+AAAD/AAKAAAD/gAAA/4AAAP6AAAABAAAAAIAAAAAAAAEAAAAABAAEAAAFAAABAQEBAQEAAAQAAAD/AAAA/QAEAAAA/AAAAAMAAAAAAQCAAIAEAAQAABUAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQECAAIAAAD/AAAAAQAAAP8AAAABAAAA/wAAAP+AAAD+gAAA/4AAAACAAAABAAQAAAD/gAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/gAAAAIAAAAEAAAAAgAAAAAEBgAAABAACgAALAAABAQEBAQEBAQEBAQECgAGAAAD/AAAA/4AAAP8AAAAAgAAAAIACgAAA/wAAAP+AAAD/AAAAAYAAAACAAAAAAAABAAAAAAQABAAAEQAAAQEBAQEBAQEBAQEBAQEBAQEBAAAAgAAAAIAAAACAAAAAgAAAAIAAAACAAAAAgAAAAIAAAPwABAAAAP+AAAD/gAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/gAAAAAEAAAAABAABAAADAAABAQEBAAAEAAAA/AABAAAA/wAAAAAAAAEAAAAABAAEAAARAAABAQEBAQEBAQEBAQEBAQEBAQEDgACAAAD8AAAAAIAAAACAAAAAgAAAAIAAAACAAAAAgAAAAIAEAAAA/AAAAACAAAAAgAAAAIAAAACAAAAAgAAAAIAAAACAAAAAAQAAAgAEAAQAAAMAAAEBAQEAAAQAAAD8AAQAAAD+AAAAAAAAAgCAAIACAAOAAAMABwAAAQEBAQEBAQEAgACAAAD/gAEAAIAAAP+AA4AAAP0AAAADAAAA/QAAAAAEAIAAgAQABAAAAwAHAAsADwAAAQEBAQEBAQEBAQEBAQEBAQCAA4AAAPyAAIAAAACAAAAAgAAAAIAAAACAAAAAgAAABAAAAPyAAAADAP+AAAAAgP8A/4AAAACA/wD/gAAAAIAAAQAAAAAEAAQAAAUAAAEBAQEBAQMAAQAAAPwAAAADAAQAAAD8AAAAAQAAAAACAIAAgAQABAAAAwAHAAABAQEBAQEBAQCAA4AAAPyAAYAAAACAAAAEAAAA/IAAAAIA/4AAAACAAAMAgACABAAEAAADAAcACwAAAQEBAQEBAQEBAQEBAIADgAAA/IAAgAAAAIAAAAGAAAAAgAAABAAAAPyAAAADAP+AAAAAgP4A/4AAAACAAAAABAAAAIAEAAQAAAMABwALAA8AAAEBAQEBAQEBAQEBAQEBAQEAAAQAAAD8AAAABAAAAPwAAAAEAAAA/AAAAAQAAAD8AAQAAAD/gAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/gAAAAAYAgACABAAEAAADAAcACwAPABMAFwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAIADgAAA/IAAgAAAAIAAAAGAAAAAgAAA/oAAAACAAAD+gAAAAIAAAAGAAAAAgAAABAAAAPyAAAADAP+AAAAAgAAA/4AAAACA/wD/gAAAAID/AP+AAAAAgAAA/4AAAACAAAEAgACAAQADgAADAAABAQEBAIAAgAAA/4ADgAAA/QAAAAAAAAUAgACABAAEAAADAAcACwAPABMAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAIADgAAA/IAAgAAAAIAAAAGAAAAAgAAA/YAAAACAAAABgAAAAIAAAAQAAAD8gAAAAwD/gAAAAIAAAP+AAAAAgP4A/4AAAACAAAD/gAAAAIAAAAABAAADAAQABAAAAwAAAQEBAQAABAAAAPwABAAAAP8AAAAAAAAHAIAAgAQABAAAAwAHAAsADwATABcAGwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQCAA4AAAPyAAIAAAACAAAABgAAAAIAAAP2AAAAAgAAAAYAAAACAAAD9gAAAAIAAAAGAAAAAgAAABAAAAPyAAAADAP+AAAAAgAAA/4AAAACA/wD/gAAAAIAAAP+AAAAAgP8A/4AAAACAAAD/gAAAAIAAAAAEAAAAAAQAAgAAAwAHAAsADwAAAQEBAQEBAQEBAQEBAQEBAQAAAQAAAP8AAgABAAAA/wD/AAEAAAD/AAIAAQAAAP8AAgAAAP8AAAABAAAA/wAAAAAAAAD/AAAAAQAAAP8AAAAAAQAAAAAEAAQAAAkAAAEBAQEBAQEBAQEAAAEAAAABAAAAAQAAAAEAAAD8AAQAAAD/gAAA/4AAAP+AAAD9gAAAAAEBAAAAAgAEAAADAAABAQEBAQABAAAA/wAEAAAA/AAAAAAAAAEAAAAABAAEAAALAAABAQEBAQEBAQEBAQECgAGAAAD8AAAAAIAAAACAAAAAgAAAAQAEAAAA/AAAAAGAAAABAAAAAIAAAACAAAAAAAABAAABAAQAAgAAAwAAAQEBAQAABAAAAPwAAgAAAP8AAAAAAAABAAAAAAQABAAACwAAAQEBAQEBAQEBAQEBAgACAAAA/AAAAACAAAAAgAAAAIAAAACABAAAAPwAAAACAAAAAIAAAACAAAAAgAAAAAAAAQAAAAAEAAIAAAkAAAEBAQEBAQEBAQEDAAEAAAD8AAAAAQAAAAEAAAABAAIAAAD+AAAAAIAAAACAAAAAgAAAAAEAAAAABAAEAAALAAABAQEBAQEBAQEBAQEAAAIAAAAAgAAAAIAAAACAAAAAgAAA/AAEAAAA/4AAAP+AAAD/gAAA/4AAAP4AAAAAAAADAAAAAAQABAAAGwAnADMAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAAAEAAAAAgAAAAIAAAACAAAAAgAAAAIAAAACAAAD/AAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/gAIAAYAAAACAAAD/gAAA/4AAAP+AAAD/gP4AAIAAAACAAAAAgAAAAIAAAP6AAAD/gAQAAAD/gAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/AAAAAIAAAACAAAAAgAAAAIAAAACAAAAAgAAAAQAAAP+AAAD+gAAAAIAAAACAAAAAgAAA/oAAAP+AAAD/gAAA/4AAAP+AAAAAgAAAAAAAAQAAAAAEAAIAAAkAAAEBAQEBAQEBAQEAAAEAAAABAAAAAQAAAAEAAAD8AAIAAAD/gAAA/4AAAP+AAAD/gAAAAAEAAAAABAAEAAALAAABAQEBAQEBAQEBAQEAAAGAAAABAAAAAIAAAACAAAAAgAAA/AAEAAAA/4AAAP+AAAD/gAAA/wAAAP6AAAAAAAAEAAAAgAQABAAAAwAHAAsADwAAAQEBAQEBAQEBAQEBAQEBAQCAAYAAAP6AAgABgAAA/oD9gAGAAAD+gAIAAYAAAP6ABAAAAP6AAAABgAAA/oAAAP+AAAD+gAAAAYAAAP6AAAAAAQIAAgAEAAQAAAMAAAEBAQECAAIAAAD+AAQAAAD+AAAAAAAABACAAIAEAAQAAAMABwAjACcAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAEAAAD/AAGAAQAAAP8A/gAAgAAAAIAAAACAAAAAgAAAAIAAAACAAAAAgAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/gAAA/4ABgACAAAD/gAQAAAD/gAAAAIAAAP+AAAAAAAAA/wAAAP+AAAD/gAAAAIAAAACAAAABAAAA/oAAAP+AAAD/gAAA/4AAAACAAAAAgAAAAIAAAAGAAAD/gAAAAAQAAAAABAAEAAADAAcACwAPAAABAQEBAQEBAQEBAQEBAQEBAAAAgAAA/4ADgACAAAD/gPyAAIAAAP+AA4AAgAAA/4AEAAAA/4AAAACAAAD/gAAA/QAAAP+AAAAAgAAA/4AAAAABAAAAAAIAAgAAAwAAAQEBAQAAAgAAAP4AAgAAAP4AAAAAAAAEAAAAAAIABAAAAwAHAAsADwAAAQEBAQEBAQEBAQEBAQEBAQAAAQAAAP8AAQABAAAA/wD/AAEAAAD/AAEAAQAAAP8ABAAAAP8AAAAAAAAA/wAAAAAAAAD/AAAAAAAAAP8AAAAAAQCAAQADgAOAABMAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAYABAAAA/4AAAAGAAAD+gAAAAIAAAP8AAAD/gAAA/4AAAACAAAAAgAOAAAD/gAAA/4AAAP+AAAD/gAAA/4AAAACAAAAAgAAAAIAAAACAAAAAAAABAQABAAOABAAAEwAAAQEBAQEBAQEBAQEBAQEBAQEBAQECAACAAAAAgAAAAIAAAP+AAAD/gAAA/4AAAP+AAAD/gAAAAIAAAACABAAAAP+AAAD/gAAA/wAAAACAAAD+gAAAAYAAAP+AAAABAAAAAIAAAAAAAAEBAAEABAADgAATAAABAQEBAQEBAQEBAQEBAQEBAQEBAQIAAQAAAACAAAAAgAAA/4AAAP+AAAD/AAAAAIAAAP6AAAABgAAA/4ADgAAA/4AAAP+AAAD/gAAA/4AAAP+AAAAAgAAAAIAAAACAAAAAgAAAAAAAAQEAAIADgAOAABMAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAgAAgAAAAIAAAACAAAD/gAAA/4AAAP+AAAD/gAAA/4AAAACAAAAAgAOAAAD+gAAAAIAAAP8AAAD/gAAA/4AAAACAAAAAgAAAAQAAAP+AAAAAAAABAQAAgAOABAAADwAAAQEBAQEBAQEBAQEBAQEBAQIAAIAAAACAAAAAgAAA/4AAAP6AAAD/gAAAAIAAAACABAAAAP8AAAD/AAAA/wAAAP+AAAAAgAAAAQAAAAEAAAAAAAACAIAAgAOAA4AAAwAJAAABAQEBAQEBAQEBAIADAAAA/QAAgAAAAgAAAP8AAAADgAAA/QAAAAKA/gAAAAEAAAABAAAAAAIAgACABAAEAAAbACcAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQECAACAAAAAgAAAAIAAAACAAAD/gAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/gAAAAIAAAACAAAAAgAAAAAD/gAAAAIAAAACAAAAAgAAA/4AAAAQAAAD/gAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/gAAAAIAAAACAAAAAgAAAAIAAAACAAAAAgAAA/4D/gAAA/4AAAP+AAAAAgAAAAIAAAACAAAEAAAIABAADAAADAAABAQEBAAAEAAAA/AADAAAA/wAAAAAAAAEAAAAABAAEAAALAAABAQEBAQEBAQEBAQEAAAQAAAD/gAAA/4AAAP+AAAD/gAAA/gAEAAAA/gAAAP+AAAD/gAAA/4AAAP+AAAAAAAABAAACAAIABAAAAwAAAQEBAQAAAgAAAP4ABAAAAP4AAAAAAAACAQAAgAOAA4AAFwAbAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAYABgAAAAIAAAP8AAAAAgAAAAIAAAP8AAAD/gAAA/wAAAACAAAAAgAAA/wAAAACAAIAAAACAAAADgAAA/wAAAP+AAAD/gAAA/4AAAP+AAAAAgAAA/4AAAACAAAAAgAAAAIAAAACAAAAAgP+AAAAAgAADAAAAAAQABAAACwAnADMAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAgAGAAAD/gAAA/4AAAP+AAAD/gAAAAIACgAEAAAD/gAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/AAAAAIAAAACAAAAAgAAAAIAAAACAAAAAgACAAIAAAP+AAAD+gAAAAIAAAACAAAAAgAQAAAD/gAAA/4AAAP+AAAD/gAAAAYAAAACAAAD/AAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/gAAAAQAAAACAAAAAgAAAAIAAAACAAAAAgAAA/oAAAP6AAAD/gAAAAIAAAACAAAAAgAAAAAAAAgCAAIADgAQAAA8AHwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAEAAAABAAAAAIAAAP+AAAD/AAAA/wAAAP+AAAAAgAAAAQAAAAEAAAAAgAAA/4AAAP8AAAD/AAAA/4AAAACABAAAAP+AAAAAgAAA/wAAAP+AAAAAgAAA/4AAAAEAAAD+gAAA/4AAAACAAAD/AAAA/4AAAACAAAD/gAAAAQAAAAABAAAAAAQAA4AACwAAAQEBAQEBAQEBAQEBAQACAAAAAIAAAACAAAD8AAAAAIAAAACAA4AAAP+AAAD/gAAA/YAAAAKAAAAAgAAAAAAAAQAAAAACAAQAAA8AAAEBAQEBAQEBAQEBAQEBAQEAAACAAAAAgAAAAIAAAACAAAD/gAAA/4AAAP+AAAD/gAQAAAD/gAAA/4AAAP+AAAD/AAAA/4AAAP+AAAD/gAAAAAAAAQIAAAAEAAQAAA8AAAEBAQEBAQEBAQEBAQEBAQEDgACAAAD/gAAA/4AAAP+AAAD/gAAAAIAAAACAAAAAgAQAAAD8AAAAAIAAAACAAAAAgAAAAQAAAACAAAAAgAAAAAAAAQCAAIAEAAQAABcAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQIAAIAAAACAAAAAgAAAAIAAAP+AAAD/AAAA/4AAAP8AAAD/gAAAAIAAAACAAAAAgAQAAAD/gAAA/4AAAP+AAAD/gAAA/oAAAAEAAAD/AAAAAYAAAACAAAAAgAAAAIAAAAAAACAAAAAABAAEAAADAAcACwAPABMAFwAbAB8AIwAnACsALwAzADcAOwA/AEMARwBLAE8AUwBXAFsAXwBjAGcAawBvAHMAdwB7AH8AAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAAAgAAA/4ABAACAAAD/gAEAAIAAAP+AAQAAgAAA/4D9gACAAAD/gAEAAIAAAP+AAQAAgAAA/4ABAACAAAD/gPyAAIAAAP+AAQAAgAAA/4ABAACAAAD/gAEAAIAAAP+A/YAAgAAA/4ABAACAAAD/gAEAAIAAAP+AAQAAgAAA/4D8gACAAAD/gAEAAIAAAP+AAQAAgAAA/4ABAACAAAD/gP2AAIAAAP+AAQAAgAAA/4ABAACAAAD/gAEAAIAAAP+A/IAAgAAA/4ABAACAAAD/gAEAAIAAAP+AAQAAgAAA/4D9gACAAAD/gAEAAIAAAP+AAQAAgAAA/4ABAACAAAD/gAQAAAD/gAAAAIAAAP+AAAAAgAAA/4AAAACAAAD/gAAAAAAAAP+AAAAAgAAA/4AAAACAAAD/gAAAAIAAAP+AAAAAAAAA/4AAAACAAAD/gAAAAIAAAP+AAAAAgAAA/4AAAAAAAAD/gAAAAIAAAP+AAAAAgAAA/4AAAACAAAD/gAAAAAAAAP+AAAAAgAAA/4AAAACAAAD/gAAAAIAAAP+AAAAAAAAA/4AAAACAAAD/gAAAAIAAAP+AAAAAgAAA/4AAAAAAAAD/gAAAAIAAAP+AAAAAgAAA/4AAAACAAAD/gAAAAAAAAP+AAAAAgAAA/4AAAACAAAD/gAAAAIAAAP+AAAAAAQAAAAAEAAQAAAsAAAEBAQEBAQEBAQEBAQAABAAAAP6AAAD/AAAA/4AAAP+AAAD/gAQAAAD8AAAAAIAAAACAAAAAgAAAAQAAAAAAAAEAAAAABAAEAAALAAABAQEBAQEBAQEBAQEAAAQAAAD/gAAA/4AAAP+AAAD/AAAA/oAEAAAA/oAAAP8AAAD/gAAA/4AAAP+AAAAAAAABAAABgAKABAAADwAAAQEBAQEBAQEBAQEBAQEBAQAAAQAAAACAAAAAgAAAAIAAAP8AAAD/gAAA/4AAAP+ABAAAAP+AAAD/gAAA/4AAAP8AAAAAgAAAAIAAAACAAAAAAAABAAAAAAKABAAADwAAAQEBAQEBAQEBAQEBAQEBAQAAAQAAAACAAAAAgAAAAIAAAP8AAAD/gAAA/4AAAP+ABAAAAP+AAAD/gAAA/4AAAP2AAAACAAAAAIAAAACAAAAAAAABAYAAAAQAAoAABQAAAQEBAQEBAYACgAAA/oAAAP8AAoAAAP8AAAD+gAAAAAEAAAAABAAEAAAJAAABAQEBAQEBAQEBAAACgAAAAIAAAACAAAAAgAAA/AAEAAAA/wAAAP8AAAD/AAAA/wAAAAACAAAAAAQABAAAGwAfAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQGAAQAAAACAAAAAgAAAAIAAAP+AAAD/gAAA/4AAAP8AAAD/gAAA/4AAAP+AAAAAgAAAAIAAAACAAAAAAAEAAAAEAAAA/4AAAP+AAAD/gAAA/wAAAP+AAAD/gAAA/4AAAACAAAAAgAAAAIAAAAEAAAAAgAAAAIAAAP8A/wAAAAEAAAEBgAGABAAEAAAFAAABAQEBAQEBgAEAAAABgAAA/YAEAAAA/oAAAP8AAAAAAQAAAAACgAKAAA8AAAEBAQEBAQEBAQEBAQEBAQEBgAEAAAD/gAAA/4AAAP+AAAD/AAAAAIAAAACAAAAAgAKAAAD/AAAA/4AAAP+AAAD/gAAAAQAAAACAAAAAgAAAAAAAAQGAAAAEAAQAAA8AAAEBAQEBAQEBAQEBAQEBAQEDAAEAAAD/gAAA/4AAAP+AAAD/AAAAAIAAAACAAAAAgAQAAAD/AAAA/4AAAP+AAAD+AAAAAoAAAACAAAAAgAAAAAAAAQGAAAAEAAKAAA8AAAEBAQEBAQEBAQEBAQEBAQEBgAEAAAAAgAAAAIAAAACAAAD/AAAA/4AAAP+AAAD/gAKAAAD/gAAA/4AAAP+AAAD/AAAAAIAAAACAAAAAgAAAAAAAAQGAAYAEAAQAAA8AAAEBAQEBAQEBAQEBAQEBAQEDAAEAAAD/gAAA/4AAAP+AAAD/AAAAAIAAAACAAAAAgAQAAAD/AAAA/4AAAP+AAAD/gAAAAQAAAACAAAAAgAAAAAAAAQAAAAAEAAQAABsAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAAAEAAAAAgAAAAIAAAACAAAAAgAAAAIAAAACAAAD/AAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/gAQAAAD/gAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/AAAAAIAAAACAAAAAgAAAAIAAAACAAAAAgAAAAAAAAQAAAAAEAAQAAB8AAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAABAAAAAIAAAAEAAAAAgAAAAQAAAP+AAAD/gAAA/4AAAP+AAAD/gAAA/4AAAP8AAAAAgAAAAIAAAP+AAAD/gAQAAAD/gAAA/4AAAACAAAAAgAAA/wAAAP+AAAD/gAAA/4AAAP+AAAD/gAAA/4AAAAEAAAAAgAAAAQAAAACAAAAAAAABAAABgAQABAAADwAAAQEBAQEBAQEBAQEBAQEBAQAAAQAAAACAAAAAgAAAAgAAAP2AAAD/gAAA/4AAAP+ABAAAAP+AAAD/gAAA/4AAAP8AAAAAgAAAAIAAAACAAAAAAAABAAABgAQAAoAAAwAAAQEBAQAABAAAAPwAAoAAAP8AAAAAAAABAYAAAAKABAAAAwAAAQEBAQGAAQAAAP8ABAAAAPwAAAAAAAABAYAAAAQABAAAFwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAwABAAAA/4AAAP+AAAAAgAAAAIAAAP8AAAD/gAAA/4AAAP+AAAAAgAAAAIAAAACABAAAAP8AAAD/gAAA/wAAAP+AAAD/AAAAAIAAAACAAAAAgAAAAQAAAACAAAAAgAAAAAAAAQAAAAAEAAKAAA8AAAEBAQEBAQEBAQEBAQEBAQEAAAKAAAAAgAAAAIAAAACAAAD/AAAA/4AAAP+AAAD+AAKAAAD/gAAA/4AAAP+AAAD/AAAAAIAAAACAAAAAgAAAAAAAAQAAAYAEAAQAAA8AAAEBAQEBAQEBAQEBAQEBAQEDAAEAAAD/gAAA/4AAAP+AAAD9gAAAAgAAAACAAAAAgAQAAAD/AAAA/4AAAP+AAAD/gAAAAQAAAACAAAAAgAAAAAAAAQAAAgAEAAQAAA8AAAEBAQEBAQEBAQEBAQEBAQEAAAQAAAD/gAAA/4AAAP+AAAD/AAAA/4AAAP+AAAD/gAQAAAD/gAAA/4AAAP+AAAD/gAAAAIAAAACAAAAAgAAAAAAAAQAAAYACgAKAAAMAAAEBAQEAAAKAAAD9gAKAAAD/AAAAAAAAAQGAAAACgAKAAAMAAAEBAQEBgAEAAAD/AAKAAAD9gAAAAAAAAQAAAYAEAAQAABcAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQAAAQAAAACAAAABAAAAAIAAAAEAAAD/gAAA/4AAAP+AAAD/AAAA/4AAAP+AAAD/gAQAAAD/gAAA/4AAAACAAAAAgAAA/wAAAP+AAAD/gAAA/4AAAACAAAAAgAAAAIAAAAAAAAEAAAAABAAEAAAJAAABAQEBAQEBAQEBAYACgAAA/AAAAACAAAAAgAAAAIAEAAAA/AAAAAEAAAABAAAAAQAAAAABAAAAAAQABAAAEwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEDAAEAAAD/gAAA/4AAAP+AAAD/AAAA/oAAAAEAAAABAAAAAIAAAACABAAAAP6AAAD/AAAA/4AAAP+AAAD/gAAAAQAAAACAAAAAgAAAAQAAAAAAAAEAAAAABAAEAAATAAABAQEBAQEBAQEBAQEBAQEBAQEBAQAAAQAAAACAAAAAgAAAAQAAAAEAAAD+gAAA/wAAAP+AAAD/gAAA/4AEAAAA/wAAAP8AAAD/gAAA/4AAAP8AAAAAgAAAAIAAAACAAAABAAAAAAAAAQAAAAAEAAQAABsAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEDAAEAAAD/gAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/AAAAAIAAAACAAAAAgAAAAIAAAACAAAAAgAQAAAD/AAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/gAAAAQAAAACAAAAAgAAAAIAAAACAAAAAgAAAAAAAAQAAAAACgAQAABcAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQAAAQAAAACAAAAAgAAAAIAAAP+AAAD/gAAA/4AAAP8AAAAAgAAAAIAAAP+AAAD/gAQAAAD/gAAA/4AAAP+AAAD/AAAA/4AAAP+AAAD/gAAAAQAAAACAAAABAAAAAIAAAAAAAAEAAAAABAAEAAAfAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQAAAQAAAACAAAAAgAAAAIAAAACAAAAAgAAAAIAAAP8AAAD/gAAA/wAAAP+AAAD/AAAAAIAAAACAAAD/gAAA/4AEAAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/gAAA/wAAAACAAAAAgAAA/4AAAP+AAAABAAAAAIAAAAEAAAAAgAAAAAAAAQAAAAACgAQAAA8AAAEBAQEBAQEBAQEBAQEBAQEBgAEAAAD/gAAA/4AAAP+AAAD/AAAAAIAAAACAAAAAgAQAAAD9gAAA/4AAAP+AAAD/gAAAAQAAAACAAAAAgAAAAAAAAQGAAAAEAAQAAA8AAAEBAQEBAQEBAQEBAQEBAQEBgAEAAAAAgAAAAIAAAACAAAD/AAAA/4AAAP+AAAD/gAQAAAD+AAAA/4AAAP+AAAD/AAAAAIAAAACAAAAAgAAAAAAAAQAAAAAEAAKAAA8AAAEBAQEBAQEBAQEBAQEBAQEBgAKAAAD+AAAA/4AAAP+AAAD/AAAAAIAAAACAAAAAgAKAAAD/AAAA/4AAAP+AAAD/gAAAAQAAAACAAAAAgAAAAAAAAQGAAYACgAQAAAMAAAEBAQEBgAEAAAD/AAQAAAD9gAAAAAAAAQGAAYAEAAKAAAMAAAEBAQEBgAKAAAD9gAKAAAD/AAAAAAAAAQAAAAAEAAQAAB8AAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAwABAAAA/4AAAP+AAAAAgAAAAIAAAP8AAAD/gAAA/wAAAP+AAAD/AAAAAIAAAACAAAAAgAAAAIAAAACAAAAAgAQAAAD/AAAA/4AAAP8AAAD/gAAA/wAAAACAAAAAgAAA/4AAAP+AAAABAAAAAIAAAACAAAAAgAAAAIAAAACAAAAAAAABAAAAAAQABAAAIwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAABAAAAAIAAAAEAAAAAgAAAAQAAAP+AAAD/gAAAAIAAAACAAAD/AAAA/4AAAP8AAAD/gAAA/wAAAACAAAAAgAAA/4AAAP+ABAAAAP+AAAD/gAAAAIAAAACAAAD/AAAA/4AAAP8AAAD/gAAA/wAAAACAAAAAgAAA/4AAAP+AAAABAAAAAIAAAAEAAAAAgAAAAAAAAQGAAYACgAKAAAMAAAEBAQEBgAEAAAD/AAKAAAD/AAAAAAAAAQAAAAAEAAKAABcAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQGAAQAAAACAAAAAgAAAAIAAAP8AAAD/gAAA/wAAAP+AAAD/AAAAAIAAAACAAAAAgAKAAAD/gAAA/4AAAP+AAAD/AAAAAIAAAACAAAD/gAAA/4AAAAEAAAAAgAAAAIAAAAAAAAEAAAGAAoAEAAAFAAABAQEBAQEBgAEAAAD9gAAAAYAEAAAA/YAAAAEAAAAAAQAAAAACgAKAAAUAAAEBAQEBAQAAAoAAAP8AAAD+gAKAAAD9gAAAAYAAAAABAAAAAAQABAAAHwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAAAEAAAAAgAAAAQAAAACAAAABAAAA/4AAAP+AAAAAgAAAAIAAAP8AAAD/gAAA/4AAAP+AAAD/gAAA/4AAAP+ABAAAAP+AAAD/gAAAAIAAAACAAAD/AAAA/4AAAP8AAAD/gAAA/wAAAACAAAAAgAAAAIAAAACAAAAAgAAAAIAAAAAAAAEAAAAABAAEAAALAAABAQEBAQEBAQEBAQEBgAEAAAABgAAA/oAAAP8AAAD+gAAAAYAEAAAA/oAAAP8AAAD+gAAAAYAAAAEAAAAAAAABAAAAAAQAAoAABwAAAQEBAQEBAQEAAAQAAAD+gAAA/wAAAP6AAoAAAP8AAAD+gAAAAYAAAAAAAAEBgAAABAAEAAAHAAABAQEBAQEBAQGAAQAAAAGAAAD+gAAA/wAEAAAA/oAAAP8AAAD+gAAAAAAAAQAAAAACgAQAAAcAAAEBAQEBAQEBAYABAAAA/wAAAP6AAAABgAQAAAD8AAAAAYAAAAEAAAAAAAABAAABgAQABAAABwAAAQEBAQEBAQEBgAEAAAABgAAA/AAAAAGABAAAAP6AAAD/AAAAAQAAAAAAAAQBAAEAAwADAAADAAcACwAPAAABAQEBAQEBAQEBAQEBAQEBAYABAAAA/wD/gACAAAD/gAGAAIAAAP+A/wABAAAA/wADAAAA/4AAAAAAAAD/AAAAAQAAAP8AAAAAAAAA/4AAAAACAIAAgAOAA4AACwAPAAABAQEBAQEBAQEBAQEBAQEBAQACAAAAAIAAAP+AAAD+AAAA/4AAAACAAIAAAAEAAAADgAAA/4AAAP4AAAD/gAAAAIAAAAIAAAD/gP8AAAABAAACAAAAAAQABAAAEwAfAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAAgAAAACAAAAAgAAA/4AAAP+AAAD+AAAA/4AAAP+AAAAAgAAAAIAAgAAA/4AAAACAAAABAAAAAIAAAP+AAAAEAAAA/4AAAP+AAAD+AAAA/4AAAP+AAAAAgAAAAIAAAAIAAAAAgAAA/4D/gAAA/wAAAP+AAAAAgAAAAQAAAACAABAAAAAABAAEAAADAAcACwAPABMAFwAbAB8AIwAnACsALwAzADcAOwA/AAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAYAAgAAA/4ACAACAAAD/gP2AAIAAAP+AAgAAgAAA/4D9gACAAAD/gAIAAIAAAP+A/YAAgAAA/4ACAACAAAD/gP+AAIAAAP+AAgAAgAAA/4D9gACAAAD/gAIAAIAAAP+A/YAAgAAA/4ACAACAAAD/gP2AAIAAAP+AAgAAgAAA/4AEAAAA/4AAAACAAAD/gAAAAAAAAP+AAAAAgAAA/4AAAAAAAAD/gAAAAIAAAP+AAAAAAAAA/4AAAACAAAD/gAAAAAAAAP+AAAAAgAAA/4AAAAAAAAD/gAAAAIAAAP+AAAAAAAAA/4AAAACAAAD/gAAAAAAAAP+AAAAAgAAA/4AAAAAQAAAAAAQABAAAAwAHAAsADwATABcAGwAfACMAJwArAC8AMwA3ADsAPwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQAAAIAAAP+AAgAAgAAA/4D+gACAAAD/gAIAAIAAAP+A/oAAgAAA/4ACAACAAAD/gP6AAIAAAP+AAgAAgAAA/4D8gACAAAD/gAIAAIAAAP+A/oAAgAAA/4ACAACAAAD/gP6AAIAAAP+AAgAAgAAA/4D+gACAAAD/gAIAAIAAAP+ABAAAAP+AAAAAgAAA/4AAAAAAAAD/gAAAAIAAAP+AAAAAAAAA/4AAAACAAAD/gAAAAAAAAP+AAAAAgAAA/4AAAAAAAAD/gAAAAIAAAP+AAAAAAAAA/4AAAACAAAD/gAAAAAAAAP+AAAAAgAAA/4AAAAAAAAD/gAAAAIAAAP+AAAAAAwCAAIADgAQAABcAGwAfAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQIAAIAAAAEAAAD/AAAAAIAAAP+AAAABAAAA/wAAAP+AAAD/AAAA/4AAAACAAAABAP+AAAAAgAAA/4AAAACAAAAEAAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/gAAA/4AAAACAAAAAgAAAAYAAAACAAAD/gP+AAAAAgP8A/4AAAACAAAAAAQCAAIADgAOAAA8AAAEBAQEBAQEBAQEBAQEBAQEBAAIAAAAAgAAA/4AAAP+AAAD/AAAA/4AAAP+AAAAAgAOAAAD/gAAA/wAAAP+AAAD/AAAAAQAAAACAAAABAAAAAAAAAgCAAIADgAOAAAMACQAAAQEBAQEBAQEBAQCAAwAAAP0AAYAAAP8AAAACAAAAA4AAAP0AAAACgP8AAAD/AAAAAgAAAAABAIAAgAOAA4AAAwAAAQEBAQCAAwAAAP0AA4AAAP0AAAAAAAACAIAAgAOAA4AAAwALAAABAQEBAQEBAQEBAQEAgAMAAAD9AACAAAACAAAA/4AAAP8AAAADgAAA/QAAAAKA/gAAAAIAAAD/AAAAAQAAAQAAAAAEAAQAABMAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQACAAAAAIAAAACAAAD/gAAA/4AAAP4AAAD/gAAA/4AAAACAAAAAgAQAAAD/gAAA/4AAAP4AAAD/gAAA/4AAAACAAAAAgAAAAgAAAACAAAAAAAABAQABAAMAAwAACwAAAQEBAQEBAQEBAQEBAYABAAAAAIAAAP+AAAD/AAAA/4AAAACAAwAAAP+AAAD/AAAA/4AAAACAAAABAAAAAAAAAQCAAQAEAAQAABsAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQECAACAAAAAgAAAAQAAAP+AAAD/gAAAAIAAAP8AAAD/gAAA/wAAAACAAAD/gAAA/4AAAAEAAAAAgAQAAAD/gAAA/4AAAP+AAAD/gAAA/4AAAP+AAAAAgAAA/4AAAACAAAAAgAAAAIAAAACAAAAAgAAAAAAABgCAAIAEAAQAAAMABwALAA8AEwAXAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAgAOAAAD8gAEAAAAAgAAAAIAAAACAAAD+AAAAAIAAAAGAAAAAgAAA/gAAAAGAAAAEAAAA/IAAAAMA/wAAAAEAAAD/AAAAAQD+gP+AAAAAgAAA/4AAAACA/4D/gAAAAIAABgCAAIAEAAQAAAMABwALAA8AEwAXAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAgAOAAAD8gAEAAAAAgAAAAIAAAACAAAD+gAAAAYAAAP4AAAAAgAAAAYAAAACAAAAEAAAA/IAAAAMA/wAAAAEAAAD/AAAAAQD+gP+AAAAAgP+A/4AAAACAAAD/gAAAAIAABgCAAIAEAAQAABMAFwAbAB8AIwAnAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAgAAgAAAAIAAAAEAAAD/AAAA/4AAAP+AAAD/gAAA/wAAAAEAAAAAgAAAAAAAgAAA/oAAgAAA/4ACAACAAAD/gP4AAIAAAP+AAgAAgAAA/4AEAAAA/wAAAP+AAAD/gAAA/4AAAP8AAAABAAAAAIAAAACAAAAAgAAA/4D/gAAAAIABAAAA/4AAAACAAAD/gAAA/oAAAP+AAAAAgAAA/4AAAAACAQAAgAOABAAAFwAbAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAYABgAAAAIAAAP+AAAD/gAAAAIAAAP+AAAD/gAAA/4AAAACAAAD/gAAAAQAAAP8A/4AAgAAA/4AEAAAA/4AAAP8AAAD/gAAA/4AAAP+AAAD/gAAAAIAAAACAAAAAgAAAAIAAAAEAAAAAAAAA/wAAAAACAIAAgAQABAAAFwAbAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAYACgAAA/4AAAP+AAAD/gAAAAIAAAP+AAAD+gAAAAQAAAP8AAAABAAAAAIAAAP8A/wAAgAAA/4AEAAAA/gAAAAEAAAD/gAAA/4AAAP8AAAD/gAAAAIAAAAEAAAAAgAAAAIAAAACAAAD+gAAA/wAAAAABAIAAgAQABAAAGwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQIAAIAAAACAAAAAgAAAAIAAAP8AAAD/gAAAAIAAAP6AAAAAgAAA/4AAAP8AAAAAgAAAAIAAAACABAAAAP+AAAD/gAAA/4AAAP8AAAAAgAAA/wAAAP+AAAAAgAAAAQAAAP+AAAABAAAAAIAAAACAAAAAAAABAIAAgAQABAAAGwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQGAAYAAAP+AAAAAgAAAAQAAAP8AAAD/gAAAAIAAAP6AAAAAgAAA/4AAAP8AAAABAAAAAIAAAP+ABAAAAP8AAAD/gAAAAIAAAP6AAAAAgAAA/wAAAP+AAAAAgAAAAQAAAP+AAAABgAAA/4AAAACAAAAAAAABAIAAgAQABAAAFwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQABAAAAAIAAAAEAAAAAgAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/gAAA/4AAAACABAAAAP+AAAAAgAAA/4AAAP6AAAD/gAAA/4AAAP+AAAAAgAAAAIAAAACAAAABgAAAAAAAAQCAAIAEAAQAABsAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQECAACAAAAAgAAAAIAAAACAAAD/gAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/gAAAAIAAAACAAAAAgAQAAAD/gAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/gAAAAIAAAACAAAAAgAAAAIAAAACAAAAAgAAAAAAAAQEAAIADgAQAAAsAAAEBAQEBAQEBAQEBAQIAAYAAAP8AAAD/gAAA/wAAAACAAAAAgAQAAAD/AAAA/gAAAP+AAAABAAAAAIAAAAAAAAEAgACABAAEAAATAAABAQEBAQEBAQEBAQEBAQEBAQEBAQGAAoAAAP+AAAD/AAAAAIAAAACAAAD+gAAA/4AAAP8AAAAAgAAAAIAEAAAA/QAAAP+AAAABAAAAAIAAAAEAAAD+AAAA/4AAAAEAAAAAgAAAAAAAAAAYASYAAQAAAAAAAAAIAAAAAQAAAAAAAQAIAAgAAQAAAAAAAgAHABAAAQAAAAAAAwAIABcAAQAAAAAABAAQAB8AAQAAAAAABQALAC8AAQAAAAAABgAIADoAAQAAAAAACQAJAEIAAQAAAAAACgA6AEsAAQAAAAAADQARAIUAAQAAAAAADgAyAJYAAQAAAAAAEwAMAMgAAwABBAkAAAAQANQAAwABBAkAAQAQAOQAAwABBAkAAgAOAPQAAwABBAkAAwAQAQIAAwABBAkABAAgARIAAwABBAkABQAWATIAAwABBAkABgAQAUgAAwABBAkACQASAVgAAwABBAkACgB0AWoAAwABBAkADQAiAd4AAwABBAkADgBkAgAAAwABBAkAEwAYAmQoYykgMjAyMlVyc2FGb250UmVndWxhclVyc2FGb250VXJzYUZvbnQgUmVndWxhclZlcnNpb24gMS4wVXJzYUZvbnRVcnNhRnJhbmtBbiBvcGVuIGxpY2VuY2UgZ2VuZXJhbCBwdXJwb3NlIHRleHRtb2RlIGZvbnQgYnkgVXJzYUZyYW5rQ0MwIDEuMCBVbml2ZXJzYWxodHRwczovL2NyZWF0aXZlY29tbW9ucy5vcmcvcHVibGljZG9tYWluL3plcm8vMS4wL0hlbGxvIFdvcmxkIQAoAGMAKQAgADIAMAAyADIAVQByAHMAYQBGAG8AbgB0AFIAZQBnAHUAbABhAHIAVQByAHMAYQBGAG8AbgB0AFUAcgBzAGEARgBvAG4AdAAgAFIAZQBnAHUAbABhAHIAVgBlAHIAcwBpAG8AbgAgADEALgAwAFUAcgBzAGEARgBvAG4AdABVAHIAcwBhAEYAcgBhAG4AawBBAG4AIABvAHAAZQBuACAAbABpAGMAZQBuAGMAZQAgAGcAZQBuAGUAcgBhAGwAIABwAHUAcgBwAG8AcwBlACAAdABlAHgAdABtAG8AZABlACAAZgBvAG4AdAAgAGIAeQAgAFUAcgBzAGEARgByAGEAbgBrAEMAQwAwACAAMQAuADAAIABVAG4AaQB2AGUAcgBzAGEAbABoAHQAdABwAHMAOgAvAC8AYwByAGUAYQB0AGkAdgBlAGMAbwBtAG0AbwBuAHMALgBvAHIAZwAvAHAAdQBiAGwAaQBjAGQAbwBtAGEAaQBuAC8AegBlAHIAbwAvADEALgAwAC8ASABlAGwAbABvACAAVwBvAHIAbABkACEAAAADAAAAAAAAAGYAMwAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA==\r
`)).arrayBuffer();
    await this.Vt(t), this.bt = b.parse(t)[0], await this.Ht();
  }
  zt(A) {
    if (A === void 0) return this.Mt;
    this.Mt = A, this.$t = this.Ut.calculateMaxGlyphDimensions(this.xt.map((e) => e.character), this.Mt, this.bt);
    const t = this.Ot.createTextureAtlas(this.xt, this.$t, this.Mt, this.bt);
    this.yt = t.framebuffer, this.Gt = t.columns, this.Ft = t.rows;
  }
  async Lt(A) {
    try {
      const t = await fetch(A);
      if (!t.ok) throw new I(`Failed to load font file: ${t.status} ${t.statusText}`);
      const e = await t.arrayBuffer();
      await this.Vt(e);
      const s = b.parse(e);
      if (!s || s.length === 0) throw Error("Failed to parse font file");
      this.bt = s[0], await this.Ht();
    } catch (t) {
      throw new I("Failed to load font: " + (t instanceof Error ? t.message : "Unknown error"), t);
    }
  }
  async Vt(A) {
    const t = Date.now();
    this.Tt = this.Tt === "UrsaFont" ? "UrsaFont" : "CustomFont_" + t, this.Yt = new FontFace(this.Tt, A), await this.Yt.load(), document.fonts.add(this.Yt);
  }
  async Ht() {
    const A = this.St.extractCharacters(this.bt), t = this.St.filterProblematicCharacters(A);
    this.xt = this.Rt.createCharacterObjects(t, this.bt), this.$t = this.Ut.calculateMaxGlyphDimensions(t, this.Mt, this.bt);
    const e = this.Ot.createTextureAtlas(this.xt, this.$t, this.Mt, this.bt);
    this.yt = e.framebuffer, this.Gt = e.columns, this.Ft = e.rows;
  }
  getCharacterColor(A) {
    return this.Rt.getCharacterColor(A, this.xt);
  }
  getCharacterColors(A) {
    return this.Rt.getCharacterColors(A, this.xt);
  }
  hasAllCharacters(A) {
    if (typeof A != "string" || A.length === 0) return !1;
    const t = new Set(this.xt.map((e) => e.character));
    for (const e of A) if (!t.has(e)) return !1;
    return !0;
  }
  O() {
    this.yt.O(), document.fonts.delete(this.Yt);
  }
  get fontFramebuffer() {
    return this.yt;
  }
  get characters() {
    return this.xt;
  }
  get textureColumns() {
    return this.Gt;
  }
  get textureRows() {
    return this.Ft;
  }
  get maxGlyphDimensions() {
    return this.$t;
  }
  get fontSize() {
    return this.Mt;
  }
  get font() {
    return this.bt;
  }
}
class PA {
  constructor(A, t, e) {
    E(this, "Jt");
    E(this, "jt");
    E(this, "P");
    E(this, "I");
    E(this, "Kt");
    E(this, "Wt");
    E(this, "Nt", !1);
    E(this, "Zt");
    E(this, "Xt");
    E(this, "qt");
    this.Zt = A, this.Xt = t, this.qt = e, this.MA();
  }
  MA() {
    this.Nt || (this.Jt = Math.floor(this.Zt.width / this.Xt), this.jt = Math.floor(this.Zt.height / this.qt)), this.Ae();
  }
  Ae() {
    this.P = this.Jt * this.Xt, this.I = this.jt * this.qt, this.Kt = Math.floor((this.Zt.width - this.P) / 2), this.Wt = Math.floor((this.Zt.height - this.I) / 2);
  }
  te(A, t) {
    this.Xt = A, this.qt = t, this.MA();
  }
  ee(A, t) {
    this.Nt = !0, this.Jt = A, this.jt = t, this.Ae();
  }
  se() {
    this.Nt = !1, this.MA();
  }
  re() {
    this.Nt ? this.Ae() : this.MA();
  }
  Be(A) {
    if (A === void 0) return this.Nt;
    this.Nt = A;
  }
  get cellWidth() {
    return this.Xt;
  }
  get cellHeight() {
    return this.qt;
  }
  get cols() {
    return this.Jt;
  }
  get rows() {
    return this.jt;
  }
  get width() {
    return this.P;
  }
  get height() {
    return this.I;
  }
  get offsetX() {
    return this.Kt;
  }
  get offsetY() {
    return this.Wt;
  }
}
class dA {
  constructor(A, t = !1, e = {}) {
    E(this, "Zt");
    E(this, "ie");
    E(this, "Qe");
    E(this, "Ee");
    E(this, "onTransformChange");
    this.ie = A, this.Qe = t, this.Zt = this.oe(e.width, e.height), t && this.setupTransformObserver();
  }
  oe(A, t) {
    var s;
    const e = document.createElement("canvas");
    if (e.className = "textmodeCanvas", e.style.imageRendering = "pixelated", this.Qe) e.width = A || 800, e.height = t || 600, document.body.appendChild(e);
    else {
      const r = this.ie.getBoundingClientRect();
      let i = Math.round(r.width), B = Math.round(r.height);
      if (this.ie instanceof HTMLVideoElement) {
        const g = this.ie;
        (i === 0 || B === 0) && g.videoWidth > 0 && g.videoHeight > 0 && (i = g.videoWidth, B = g.videoHeight);
      }
      e.width = i, e.height = B, e.style.position = "absolute", e.style.pointerEvents = "none";
      const Q = window.getComputedStyle(this.ie);
      let n = parseInt(Q.zIndex || "0", 10);
      isNaN(n) && (n = 0), e.style.zIndex = "" + (n + 1), this.ge(e), (s = this.ie.parentNode) == null || s.insertBefore(e, this.ie.nextSibling);
    }
    return e;
  }
  ge(A) {
    const t = this.ie.getBoundingClientRect();
    let e = this.ie.offsetParent;
    if (e && e !== document.body) {
      const s = e.getBoundingClientRect();
      A.style.top = t.top - s.top + "px", A.style.left = t.left - s.left + "px";
    } else A.style.top = t.top + window.scrollY + "px", A.style.left = t.left + window.scrollX + "px";
  }
  re(A, t) {
    if (this.Qe) this.Zt.width = A ?? this.Zt.width, this.Zt.height = t ?? this.Zt.height;
    else {
      const e = this.ie.getBoundingClientRect();
      let s = Math.round(e.width), r = Math.round(e.height);
      if (this.ie instanceof HTMLVideoElement) {
        const i = this.ie;
        (s === 0 || r === 0) && i.videoWidth > 0 && i.videoHeight > 0 && (s = i.videoWidth, r = i.videoHeight);
      }
      this.Zt.width = s, this.Zt.height = r, this.ge(this.Zt);
    }
  }
  ne() {
    const A = { alpha: !1, premultipliedAlpha: !1, preserveDrawingBuffer: !0, antialias: !1, depth: !1, stencil: !1, powerPreference: "high-performance" }, t = this.Zt.getContext("webgl2", A) || this.Zt.getContext("webgl", A);
    if (!t) throw new I("WebGL context could not be created. Ensure your browser supports WebGL.");
    return t;
  }
  setupTransformObserver() {
    this.Ee = new ResizeObserver((A) => {
      for (const t of A) {
        const e = t.contentRect;
        !this.onTransformChange || Math.round(e.width) === this.Zt.width && Math.round(e.height) === this.Zt.height || this.onTransformChange();
      }
    }), this.Ee.observe(this.Zt);
  }
  O() {
    this.Ee && this.Ee.disconnect();
    const A = this.Zt.getContext("webgl") || this.Zt.getContext("webgl2");
    if (A) {
      const t = A.getExtension("WEBGL_lose_context");
      t && t.loseContext();
    }
    this.Zt.parentNode && this.Zt.parentNode.removeChild(this.Zt);
  }
  get canvas() {
    return this.Zt;
  }
  get width() {
    return this.Zt.width;
  }
  get height() {
    return this.Zt.height;
  }
}
class M {
  constructor(A, t, e, s = {}) {
    E(this, "ut");
    E(this, "ae");
    E(this, "he");
    E(this, "le");
    E(this, "ce");
    E(this, "De");
    E(this, "Ce");
    E(this, "ue");
    E(this, "h");
    this.ut = A, this.ae = t, this.he = e, this.h = { enabled: !0, ...s };
    const r = this.he.cols, i = this.he.rows;
    this.le = this.ut.UA(r, i), this.ce = this.ut.UA(r, i), this.De = this.ut.UA(r, i), this.Ce = this.ut.UA(r, i), this.ue = this.ut.UA(r, i);
  }
  re() {
    const A = this.he.cols, t = this.he.rows;
    this.le.resize(A, t), this.ce.resize(A, t), this.De.resize(A, t), this.Ce.resize(A, t), this.ue.resize(A, t);
  }
  enabled(A) {
    D.C(typeof A == "boolean" || typeof A == "number" && Number.isInteger(A), "Enabled must be a boolean value or an integer (0 for false, any other number for true).", { method: "enabled", providedValue: A }) && (this.h.enabled = !!A);
  }
  enable() {
    this.enabled(!0);
  }
  disable() {
    this.enabled(!1);
  }
  O() {
    this.le.O(), this.ce.O(), this.De.O(), this.Ce.O(), this.ue.O();
  }
  get characterFramebuffer() {
    return this.le;
  }
  get primaryColorFramebuffer() {
    return this.ce;
  }
  get secondaryColorFramebuffer() {
    return this.De;
  }
  get rotationFramebuffer() {
    return this.Ce;
  }
  get transformFramebuffer() {
    return this.ue;
  }
  get options() {
    return this.h;
  }
}
class IA {
  constructor(A, t) {
    E(this, "_");
    E(this, "ut");
    E(this, "Pe");
    this.ut = A, this.Pe = t;
    const e = Math.max(this.Pe.length, 1);
    this._ = this.ut.UA(e, 1), this.Ie();
  }
  Ie() {
    const A = this.Pe.length;
    this._.width !== A && this._.resize(A, 1);
    const t = new Uint8Array(1 * A * 4);
    for (let e = 0; e < A; e++) {
      const s = this.Pe[e], r = 4 * e;
      t[r] = s[0], t[r + 1] = s[1], t[r + 2] = s[2], t[r + 3] = 255;
    }
    this._.updatePixels(t, A, 1);
  }
  setColors(A) {
    this.Pe = A, this.Ie();
  }
  get colors() {
    return this.Pe;
  }
  get framebuffer() {
    return this._;
  }
}
class S extends M {
  constructor(t, e, s, r = {}) {
    super(t, e, s, { enabled: !0, characters: " .:-=+*%@#", characterColor: [1, 1, 1, 1], characterColorMode: "sampled", cellColor: [0, 0, 0, 1], cellColorMode: "fixed", invert: !1, rotation: [0, 0, 0, 1], flipHorizontally: !1, flipVertically: !1, ...r });
    E(this, "we");
    this.we = new IA(this.ut, this.ae.getCharacterColors(" .:-=+*%@#"));
  }
  characters(t) {
    D.C(this.ae.hasAllCharacters(t), "One or more characters do not exist in the current font.", { method: "characters", providedValue: t }) && (this.h.characters = t, this.we.setColors(this.ae.getCharacterColors(t)));
  }
  characterColor(t, e, s, r = 255) {
    const i = this.fe(t, "characterColor", e, s, r);
    i && (this.h.characterColor = i);
  }
  characterColorMode(t) {
    this.de(t, "characterColorMode");
  }
  cellColor(t, e, s, r = 255) {
    const i = this.fe(t, "cellColor", e, s, r);
    i && (this.h.cellColor = i);
  }
  cellColorMode(t) {
    this.de(t, "cellColorMode");
  }
  invert(t) {
    this.me(t, "invert", "Invert");
  }
  rotation(t) {
    if (!D.C(typeof t == "number", "Rotation angle must be a number.", { method: "rotation", providedValue: t })) return;
    (t %= 360) < 0 && (t += 360);
    const e = 255 * t / 360, s = Math.floor(e) / 255, r = Math.round(e - s);
    this.h.rotation = [s, r, 0, 1];
  }
  flipHorizontally(t) {
    this.me(t, "flipHorizontally", "Flip horizontally");
  }
  flipVertically(t) {
    this.me(t, "flipVertically", "Flip vertically");
  }
  fe(t, e, s, r, i = 255) {
    let B, Q, n, g;
    if (typeof t == "string") {
      const a = this.pe(t);
      if (!a) return D.C(!1, "Invalid hex color format. Use '#FF0000', '#F00', 'FF0000', or 'F00'.", { method: e, providedValue: t }), null;
      [B, Q, n, g] = a;
    } else if (B = t, Q = s !== void 0 ? s : t, n = r !== void 0 ? r : t, g = i, !D.C([B, Q, n, g].every((a) => a >= 0 && a <= 255), e.charAt(0).toUpperCase() + e.slice(1) + " color values must be between 0 and 255", { method: e, providedValues: { r: B, g: Q, b: n, a: g } })) return null;
    return [B / 255, Q / 255, n / 255, g / 255];
  }
  de(t, e) {
    D.C(["sampled", "fixed"].includes(t), "Invalid color mode. Must be 'sampled' or 'fixed'.", { method: e, providedValue: t }) && (this.h[e] = t);
  }
  me(t, e, s) {
    D.C(typeof t == "boolean" || typeof t == "number" && Number.isInteger(t), s + " must be a boolean value or an integer (0 for false, any other number for true).", { method: e, providedValue: t }) && (this.h[e] = !!t);
  }
  pe(t) {
    return t = t.replace(/^#/, ""), /^[0-9A-Fa-f]{3}$|^[0-9A-Fa-f]{6}$/.test(t) ? (t.length === 3 && (t = t.split("").map((e) => e + e).join("")), [parseInt(t.slice(0, 2), 16), parseInt(t.slice(2, 4), 16), parseInt(t.slice(4, 6), 16), 255]) : null;
  }
}
const R = `attribute vec2 a_position;\r
attribute vec2 a_texCoord;\r
varying vec2 v_uv;\r
\r
uniform float u_rotation; // rotation angle in radians\r
uniform vec2 u_center; // rotation center in normalized coordinates\r
uniform float u_aspectRatio; // canvas width / canvas height\r
\r
mat2 rotate2D(float angle) {\r
    float s = sin(angle);\r
    float c = cos(angle);\r
    return mat2(c, -s, s, c);\r
}\r
\r
void main() {\r
    v_uv = a_texCoord;\r
    \r
    // Use the position directly (it's already in normalized device coordinates)\r
    vec2 pos = a_position;\r
    \r
    // Translate to origin for rotation\r
    pos -= u_center;\r
    \r
    // Correct for aspect ratio: scale X coordinate to make space square\r
    pos.x *= u_aspectRatio;\r
    \r
    // Rotate in corrected space\r
    // Negate rotation to make positive values rotate clockwise (like p5.js)\r
    pos = rotate2D(-u_rotation) * pos;\r
    \r
    // Restore aspect ratio: scale X coordinate back\r
    pos.x /= u_aspectRatio;\r
    \r
    // Translate back from origin\r
    pos += u_center;\r
    \r
    gl_Position = vec4(pos, 0.0, 1.0);\r
}\r
`, tA = { enabled: !0, characters: " .:-=+*%@#", characterColor: [1, 1, 1, 1], characterColorMode: "sampled", cellColor: [0, 0, 0, 1], cellColorMode: "fixed", invert: !1, rotation: [0, 0, 0, 255], flipHorizontally: !1, flipVertically: !1, brightnessRange: [0, 255] };
class O extends S {
  constructor(t, e, s) {
    super(t, e, s, tA);
    E(this, "_e");
    E(this, "ve");
    E(this, "be");
    E(this, "xe");
    E(this, "ye");
    E(this, "Me");
    this._e = new p(t.context, R, "precision lowp float;uniform sampler2D u_sketchTexture;uniform vec2 u_gridCellDimensions;uniform vec2 u_brightnessRange;varying vec2 v_uv;void main(){vec2 cellCenter=(floor(v_uv*u_gridCellDimensions)+vec2(0.5))/u_gridCellDimensions;vec4 color=texture2D(u_sketchTexture,cellCenter);float brightness=dot(color.rgb,vec3(0.299,0.587,0.114));float brightnessValue=brightness*255.0;if(brightnessValue>=u_brightnessRange.x&&brightnessValue<=u_brightnessRange.y){gl_FragColor=color;}else{gl_FragColor=vec4(0.0);}}"), this.ve = new p(t.context, R, "precision lowp float;uniform sampler2D u_sampleTexture;uniform vec4 u_fillColor;uniform bool u_useFixedColor;varying vec2 v_uv;void main(){vec4 sampleColor=texture2D(u_sampleTexture,v_uv);if(sampleColor.a>0.0){if(u_useFixedColor){gl_FragColor=u_fillColor;}else{gl_FragColor=sampleColor;}}else{gl_FragColor=vec4(0.0);}}"), this.xe = new p(t.context, R, "precision lowp float;uniform sampler2D u_sampleTexture;uniform bool u_invert;uniform bool u_flipHorizontally;uniform bool u_flipVertically;varying vec2 v_uv;void main(){vec4 sampleColor=texture2D(u_sampleTexture,v_uv);if(sampleColor.a>0.0){float invertValue=u_invert ? 1.0 : 0.0;float flipHValue=u_flipHorizontally ? 1.0 : 0.0;float flipVValue=u_flipVertically ? 1.0 : 0.0;gl_FragColor=vec4(invertValue,flipHValue,flipVValue,1.0);}else{gl_FragColor=vec4(0.0);}}"), this.ye = new p(t.context, R, "precision lowp float;uniform sampler2D u_sampleTexture;uniform vec4 u_rotationColor;varying vec2 v_uv;void main(){vec4 sampleColor=texture2D(u_sampleTexture,v_uv);if(sampleColor.a>0.0){gl_FragColor=u_rotationColor;}else{gl_FragColor=vec4(0.0);}}"), this.be = new p(t.context, R, "precision lowp float;uniform sampler2D u_colorSampleFramebuffer;uniform sampler2D u_charPaletteTexture;uniform vec2 u_charPaletteSize;uniform vec2 u_brightnessRange;varying vec2 v_uv;void main(){vec4 color=texture2D(u_colorSampleFramebuffer,v_uv);if(color.a==0.0){gl_FragColor=vec4(0.0);return;}float brightness=dot(color.rgb,vec3(0.299,0.587,0.114))*255.0;vec2 range=u_brightnessRange;if(brightness<range.x||brightness>range.y){gl_FragColor=vec4(0.0);return;}float t=(brightness-range.x)/(range.y-range.x);float idx=clamp(floor(t*u_charPaletteSize.x),0.0,u_charPaletteSize.x-1.0);vec3 charColor=texture2D(u_charPaletteTexture,vec2((idx+0.5)/u_charPaletteSize.x,0.0)).rgb;gl_FragColor=vec4(charColor,1.0);}"), this.Me = this.ut.UA(this.he.cols, this.he.rows);
  }
  Ge(t) {
    const e = this.he.cols, s = this.he.rows;
    this.Me.begin(), this.ut.kA(), this.ut.fA(this._e), this.ut.YA("u_sketchTexture", t), this.ut.YA("u_gridCellDimensions", [e, s]), this.ut.YA("u_brightnessRange", this.h.brightnessRange), this.ut.TA(0, 0, e, s), this.Me.end(), this.ce.begin(), this.ut.kA(), this.ut.fA(this.ve), this.ut.YA("u_sampleTexture", this.Me), this.ut.YA("u_fillColor", this.h.characterColor), this.ut.YA("u_useFixedColor", this.h.characterColorMode === "fixed"), this.ut.TA(0, 0, e, s), this.ce.end(), this.De.begin(), this.ut.kA(), this.ut.fA(this.ve), this.ut.YA("u_sampleTexture", this.Me), this.ut.YA("u_fillColor", this.h.cellColor), this.ut.YA("u_useFixedColor", this.h.cellColorMode === "fixed"), this.ut.TA(0, 0, e, s), this.De.end(), this.ue.begin(), this.ut.kA(), this.ut.fA(this.xe), this.ut.YA("u_sampleTexture", this.Me), this.ut.YA("u_invert", this.h.invert), this.ut.YA("u_flipHorizontally", this.h.flipHorizontally), this.ut.YA("u_flipVertically", this.h.flipVertically), this.ut.TA(0, 0, e, s), this.ue.end(), this.Ce.begin(), this.ut.kA(), this.ut.fA(this.ye), this.ut.YA("u_sampleTexture", this.Me), this.ut.YA("u_rotationColor", this.h.rotation), this.ut.TA(0, 0, e, s), this.Ce.end(), this.le.begin(), this.ut.kA(), this.ut.fA(this.be), this.ut.YA("u_colorSampleFramebuffer", this.Me), this.ut.YA("u_charPaletteTexture", this.we.framebuffer), this.ut.YA("u_charPaletteSize", [this.we.colors.length, 1]), this.ut.YA("u_brightnessRange", this.h.brightnessRange), this.ut.TA(0, 0, e, s), this.le.end();
  }
  re() {
    super.re(), this.Me.resize(this.he.cols, this.he.rows);
  }
  brightnessRange(t) {
    D.C(Array.isArray(t) && t.length === 2 && t.every((e) => typeof e == "number" && e >= 0 && e <= 255), "Brightness range must be an array of two numbers between 0 and 255.", { method: "brightnessRange", providedValue: t }) && (this.h.brightnessRange = t);
  }
}
const LA = Object.freeze(Object.defineProperty({ __proto__: null, BRIGHTNESS_DEFAULT_OPTIONS: tA, TextmodeBrightnessConverter: O, TextmodeConverter: M, TextmodeFeatureConverter: S }, Symbol.toStringTag, { value: "Module" }));
class fA {
  constructor(A, t, e) {
    E(this, "ut");
    E(this, "bt");
    E(this, "he");
    E(this, "Fe");
    E(this, "$e");
    E(this, "Ye");
    E(this, "Te");
    E(this, "Se");
    E(this, "le");
    E(this, "ce");
    E(this, "De");
    E(this, "Ce");
    E(this, "ue");
    this.ut = A, this.bt = t, this.he = e, this.Se = this.ut.FA(Y, "precision mediump float;uniform sampler2D u_characterTexture;uniform vec2 u_charsetDimensions;uniform sampler2D u_primaryColorTexture;uniform sampler2D u_secondaryColorTexture;uniform sampler2D u_transformTexture;uniform sampler2D u_asciiCharacterTexture;uniform sampler2D u_rotationTexture;uniform sampler2D u_captureTexture;uniform vec2 u_captureDimensions;uniform int u_backgroundMode;uniform vec2 u_gridCellDimensions;uniform vec2 u_gridPixelDimensions;mat2 rotate2D(float angle){float s=sin(angle);float c=cos(angle);return mat2(c,-s,s,c);}void main(){vec2 adjustedCoord=gl_FragCoord.xy/u_gridPixelDimensions;vec2 gridCoord=adjustedCoord*u_gridCellDimensions;vec2 cellCoord=floor(gridCoord);vec2 charIndexTexCoord=(cellCoord+0.5)/u_gridCellDimensions;vec4 primaryColor=texture2D(u_primaryColorTexture,charIndexTexCoord);vec4 secondaryColor=texture2D(u_secondaryColorTexture,charIndexTexCoord);vec4 transformColor=texture2D(u_transformTexture,charIndexTexCoord);bool isInverted=transformColor.r>0.5;bool flipHorizontal=transformColor.g>0.5;bool flipVertical=transformColor.b>0.5;vec4 encodedIndexVec=texture2D(u_asciiCharacterTexture,charIndexTexCoord);if(encodedIndexVec.a<0.01){gl_FragColor=(u_backgroundMode==0)? vec4(0.0):texture2D(u_captureTexture,gl_FragCoord.xy/u_captureDimensions);return;}int charIndex=int(encodedIndexVec.r*255.0+0.5)+int(encodedIndexVec.g*255.0+0.5)*256;int charCol=int(mod(float(charIndex),u_charsetDimensions.x));int charRow=charIndex/int(u_charsetDimensions.x);float flippedRow=(u_charsetDimensions.y-1.0)-float(charRow);vec2 charCoord=vec2(float(charCol),flippedRow)/u_charsetDimensions;vec4 rotationColor=texture2D(u_rotationTexture,charIndexTexCoord);float scaledAngle=rotationColor.r*255.0+rotationColor.g;float rotationAngle=(scaledAngle*360.0/255.0)*0.017453292;vec2 fractionalPart=fract(gridCoord)-0.5;if(flipHorizontal)fractionalPart.x=-fractionalPart.x;if(flipVertical)fractionalPart.y=-fractionalPart.y;fractionalPart=rotate2D(rotationAngle)*fractionalPart+0.5;vec2 cellSize=1.0/u_charsetDimensions;vec2 texCoord=charCoord+fractionalPart*cellSize;vec2 cellMax=charCoord+cellSize;if(any(lessThan(texCoord,charCoord))||any(greaterThan(texCoord,cellMax))){gl_FragColor=isInverted ? primaryColor : secondaryColor;return;}vec4 charTexel=texture2D(u_characterTexture,texCoord);if(isInverted)charTexel.rgb=1.0-charTexel.rgb;gl_FragColor=mix(secondaryColor,primaryColor,charTexel);}"), this.$e = new O(A, t, e), this.Ye = new M(A, t, e), this.Fe = [this.$e, this.Ye], this.le = this.ut.UA(e.cols, e.rows), this.ce = this.ut.UA(e.cols, e.rows), this.De = this.ut.UA(e.cols, e.rows), this.Ce = this.ut.UA(e.cols, e.rows), this.ue = this.ut.UA(e.cols, e.rows), this.Te = this.ut.UA(this.he.width, this.he.height);
  }
  Oe(A) {
    for (const e of this.Fe) e.options.enabled && e instanceof S && e.Ge(A);
    const t = (e, s) => {
      e.begin(), this.ut.kA();
      for (const r of this.Fe) r.options.enabled && this.ut.HA(s(r), 0, 0);
      e.end();
    };
    t(this.le, (e) => e.characterFramebuffer), t(this.ce, (e) => e.primaryColorFramebuffer), t(this.De, (e) => e.secondaryColorFramebuffer), t(this.Ce, (e) => e.rotationFramebuffer), t(this.ue, (e) => e.transformFramebuffer), this.Te.begin(), this.ut.kA(), this.ut.fA(this.Se), this.ut.YA("u_characterTexture", this.bt.fontFramebuffer), this.ut.YA("u_charsetDimensions", [this.bt.textureColumns, this.bt.textureRows]), this.ut.YA("u_asciiCharacterTexture", this.le), this.ut.YA("u_primaryColorTexture", this.ce), this.ut.YA("u_secondaryColorTexture", this.De), this.ut.YA("u_transformTexture", this.ue), this.ut.YA("u_rotationTexture", this.Ce), this.ut.YA("u_captureTexture", A), this.ut.YA("u_backgroundMode", !1), this.ut.YA("u_captureDimensions", [A.width, A.height]), this.ut.YA("u_gridCellDimensions", [this.he.cols, this.he.rows]), this.ut.YA("u_gridPixelDimensions", [this.he.width, this.he.height]), this.ut.TA(0, 0, this.Te.width, this.Te.height), this.Te.end();
  }
  add(A) {
    if (!D.C(A === "brightness" || A === "custom", 'Converter type must be either "brightness" or "custom".', { method: "add", providedValue: A })) return;
    let t;
    return t = A === "brightness" ? new O(this.ut, this.bt, this.he) : new M(this.ut, this.bt, this.he), this.Fe.push(t), t;
  }
  remove(A) {
    if (!D.C(A instanceof M, "Parameter must be a TextmodeConverter instance.", { method: "remove", providedValue: A })) return;
    const t = this.Fe.indexOf(A);
    D.C(t !== -1, "Converter instance not found in pipeline.", { method: "remove", providedValue: A, convertersCount: this.Fe.length }) && this.Fe.splice(t, 1);
  }
  swap(A, t) {
    const e = (B, Q) => {
      if (typeof B == "number") return D.C(Number.isInteger(B) && B >= 0 && B < this.Fe.length, Q + " index must be a valid integer within the converter array bounds.", { method: "swap", providedValue: B, convertersCount: this.Fe.length }) ? B : null;
      if (B instanceof M) {
        const n = this.Fe.indexOf(B);
        return D.C(n !== -1, Q + " converter instance not found in pipeline.", { method: "swap", providedValue: B, convertersCount: this.Fe.length }) ? n : null;
      }
      return D.C(!1, Q + " parameter must be either an integer index or a TextmodeConverter instance.", { method: "swap", providedValue: B }), null;
    }, s = e(A, "First"), r = e(t, "Second");
    if (s === null || r === null || !D.C(s !== r, "Cannot swap a converter with itself.", { method: "swap", firstIndex: s, secondIndex: r })) return;
    const i = this.Fe[s];
    this.Fe[s] = this.Fe[r], this.Fe[r] = i;
  }
  re() {
    this.Te.resize(this.he.width, this.he.height);
    const A = this.he.cols, t = this.he.rows;
    this.le.resize(A, t), this.ce.resize(A, t), this.De.resize(A, t), this.Ce.resize(A, t), this.ue.resize(A, t);
    for (const e of this.Fe) e.re();
  }
  hasEnabledConverters() {
    return this.Fe.some((A) => A.options.enabled);
  }
  disable() {
    for (const A of this.Fe) A.disable();
  }
  enable() {
    for (const A of this.Fe) A.enable();
  }
  O() {
    for (const A of this.Fe) A.O();
    this.le.O(), this.ce.O(), this.De.O(), this.Ce.O(), this.ue.O(), this.Te.O(), this.Se.O();
  }
  get texture() {
    return this.Te;
  }
  get characterFramebuffer() {
    return this.le;
  }
  get primaryColorFramebuffer() {
    return this.ce;
  }
  get secondaryColorFramebuffer() {
    return this.De;
  }
  get rotationFramebuffer() {
    return this.Ce;
  }
  get transformFramebuffer() {
    return this.ue;
  }
  get brightness() {
    return this.$e;
  }
  get custom() {
    return this.Ye;
  }
}
const wA = (o) => class extends o {
  fill(A, t, e, s) {
    this.ut.dA(A, t, e, s);
  }
  stroke(A, t, e, s) {
    this.ut.mA(A, t, e, s);
  }
  strokeWeight(A) {
    this.ut.pA(A);
  }
  noStroke() {
    this.ut._A();
  }
  noFill() {
    this.ut.vA();
  }
  rotate(A) {
    this.ut.bA(A);
  }
  push() {
    this.ut.xA();
  }
  pop() {
    this.ut.yA();
  }
  rect(A, t, e = 1, s = 1) {
    this.ut.TA(A, t, e, s);
  }
  line(A, t, e, s) {
    this.ut.OA(A, t, e, s);
  }
  background(A, t = A, e = A, s = 255) {
    this.ut.RA(A, t, e, s);
  }
  createShader(A, t) {
    return this.ut.FA(A, t);
  }
  createFilterShader(A) {
    return this.ut.$A(A);
  }
  shader(A) {
    this.ut.fA(A);
  }
  setUniform(A, t) {
    this.ut.YA(A, t);
  }
  image(A, t, e, s, r) {
    this.ut.HA(A, t, e, s, r);
  }
  clear() {
    this.ut.kA();
  }
  createFramebuffer(A, t, e = {}) {
    return this.ut.UA(A, t, e);
  }
};
class k {
  Ue(A) {
    const t = A.characterFramebuffer, e = A.primaryColorFramebuffer, s = A.secondaryColorFramebuffer, r = A.transformFramebuffer, i = A.rotationFramebuffer;
    return t == null || t.loadPixels(), e == null || e.loadPixels(), s == null || s.loadPixels(), r == null || r.loadPixels(), i == null || i.loadPixels(), { characterPixels: (t == null ? void 0 : t.pixels) || new Uint8Array(0), primaryColorPixels: (e == null ? void 0 : e.pixels) || new Uint8Array(0), secondaryColorPixels: (s == null ? void 0 : s.pixels) || new Uint8Array(0), transformPixels: (r == null ? void 0 : r.pixels) || new Uint8Array(0), rotationPixels: (i == null ? void 0 : i.pixels) || new Uint8Array(0) };
  }
  Re(A, t) {
    return A[t] + (A[t + 1] << 8);
  }
  ke(A, t) {
    return { r: A[t], g: A[t + 1], b: A[t + 2], a: A[t + 3] };
  }
}
class L {
  Ve(A, t) {
    return new Blob([A], { type: t });
  }
  He(A, t, e) {
    try {
      const s = this.Ve(A, e), r = URL.createObjectURL(s), i = document.createElement("a");
      i.href = r, i.download = t, i.style.display = "none", i.rel = "noopener", document.body.appendChild(i), i.click(), document.body.removeChild(i), URL.revokeObjectURL(r);
    } catch (s) {
      throw console.error("Failed to download file:", s), Error("File download failed: " + (s instanceof Error ? s.message : "Unknown error"));
    }
  }
  ze() {
    return (/* @__PURE__ */ new Date()).toISOString().slice(0, 19).replace(/:/g, "-");
  }
  Le() {
    const A = /* @__PURE__ */ new Date();
    return { date: A.toISOString().split("T")[0], time: A.toTimeString().split(" ")[0].replace(/:/g, "-") };
  }
  Je(A) {
    return A.replace(/[<>:"/\\|?*]/g, "_").replace(/\s+/g, "_").replace(/_{2,}/g, "_").replace(/^_+|_+$/g, "").substring(0, 255);
  }
  je() {
    return "'textmode-export'-" + this.ze();
  }
}
class pA extends k {
  Ke(A, t, e) {
    const s = A[e] === 255, r = A[e + 1] === 255, i = A[e + 2] === 255, B = t[e], Q = t[e + 1];
    return { isInverted: s, flipHorizontal: r, flipVertical: i, rotation: Math.round(360 * (B + Q / 255) / 255 * 100) / 100 };
  }
  We(A, t, e) {
    return { x: A, y: t, cellX: A * e.cellWidth, cellY: t * e.cellHeight };
  }
  Ne(A, t) {
    const e = [];
    let s = 0;
    for (let r = 0; r < t.rows; r++) for (let i = 0; i < t.cols; i++) {
      const B = 4 * s, Q = this.Re(A.characterPixels, B);
      let n = this.ke(A.primaryColorPixels, B), g = this.ke(A.secondaryColorPixels, B);
      const a = this.Ke(A.transformPixels, A.rotationPixels, B);
      if (a.isInverted) {
        const u = n;
        n = g, g = u;
      }
      const h = this.We(i, r, t);
      e.push({ charIndex: Q, primaryColor: n, secondaryColor: g, transform: a, position: h }), s++;
    }
    return e;
  }
}
class mA {
  Ze(A, t) {
    const e = A.cmap;
    for (const s of e.tables) if (s.format === 4) {
      const r = s;
      for (let i = 0; i < r.startCount.length; i++) if (t >= r.startCount[i] && t <= r.endCount[i]) {
        if (r.idRangeOffset[i] === 0) return t + r.idDelta[i] & 65535;
        {
          const B = r.idRangeOffset[i] / 2 + (t - r.startCount[i]) - (r.startCount.length - i);
          if (B >= 0 && B < r.glyphIdArray.length) {
            const Q = r.glyphIdArray[B];
            if (Q !== 0) return Q + r.idDelta[i] & 65535;
          }
        }
      }
    } else if (s.format === 12) {
      const r = s;
      for (let i = 0; i < r.groups.length; i += 3) {
        const B = r.groups[i], Q = r.groups[i + 1], n = r.groups[i + 2];
        if (t >= B && t <= Q) return n + (t - B);
      }
    }
    return 0;
  }
  Xe(A, t, e, s, r) {
    const i = r / A.head.unitsPerEm;
    return { getBoundingBox: () => ({ x1: e + t.xMin * i, y1: s + -t.yMax * i, x2: e + t.xMax * i, y2: s + -t.yMin * i }), toSVG: () => this.qe(t, e, s, i) };
  }
  qe(A, t, e, s) {
    if (!A || !A.xs) return "";
    const { xs: r, ys: i, endPts: B, flags: Q } = A;
    if (!(r && i && B && Q)) return "";
    let n = "", g = 0;
    for (let a = 0; a < B.length; a++) {
      const h = B[a];
      if (!(h < g)) {
        if (h >= g) {
          const u = t + r[g] * s, c = e - i[g] * s;
          n += `M${u.toFixed(2)},${c.toFixed(2)}`;
          let l = g + 1;
          for (; l <= h; )
            if (1 & Q[l]) {
              const d = t + r[l] * s, C = e - i[l] * s;
              n += `L${d.toFixed(2)},${C.toFixed(2)}`, l++;
            } else {
              const d = t + r[l] * s, C = e - i[l] * s;
              let P = l + 1 > h ? g : l + 1;
              if (1 & Q[P]) {
                const w = t + r[P] * s, m = e - i[P] * s;
                n += `Q${d.toFixed(2)},${C.toFixed(2)} ${w.toFixed(2)},${m.toFixed(2)}`, l = P + 1;
              } else {
                const w = (d + (t + r[P] * s)) / 2, m = (C + (e - i[P] * s)) / 2;
                n += `Q${d.toFixed(2)},${C.toFixed(2)} ${w.toFixed(2)},${m.toFixed(2)}`, l = P;
              }
            }
          n += "Z";
        }
        g = h + 1;
      }
    }
    return n;
  }
  As(A, t, e, s, r) {
    const i = A.codePointAt(0) || 0, B = this.Ze(t, i);
    let Q = null;
    return t.glyf && t.glyf[B] !== null ? Q = t.glyf[B] : (Q = b.T.glyf.zA(t, B), t.glyf[B] = Q), this.Xe(t, Q, e, s, r);
  }
  ts(A, t, e, s, r, i, B, Q) {
    const n = e + (r - Q * (B / t.head.unitsPerEm)) / 2, g = s + (i + 0.7 * B) / 2;
    return this.As(A, t, n, g, B).toSVG() || null;
  }
}
class bA {
  constructor() {
    E(this, "es");
    this.es = new mA();
  }
  ss(A) {
    return `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<svg width="${A.width}" height="${A.height}" viewBox="0 0 ${A.width} ${A.height}" 
     xmlns="http://www.w3.org/2000/svg" version="1.1">
<title>textmode art generated via textmode.js</title>
<desc>textmode art visualization generated by textmode.js library</desc>`;
  }
  rs() {
    return `
</g>
</svg>`;
  }
  Bs(A, t) {
    if (!t.includeBackgroundRectangles) return "";
    const e = t.backgroundColor, s = `rgba(${e[0]},${e[1]},${e[2]},${e[3] / 255})`;
    return `
<rect width="${A.width}" height="${A.height}" fill="${s}" />`;
  }
  Qs(A) {
    return `rgba(${A.r},${A.g},${A.b},${A.a / 255})`;
  }
  Es(A, t) {
    const { transform: e, position: s } = A, r = s.cellX + t.cellWidth / 2, i = s.cellY + t.cellHeight / 2, B = [];
    if (e.flipHorizontal || e.flipVertical) {
      const Q = e.flipHorizontal ? -1 : 1, n = e.flipVertical ? -1 : 1;
      B.push(`translate(${r} ${i})`), B.push(`scale(${Q} ${n})`), B.push(`translate(${-r} ${-i})`);
    }
    return e.rotation && B.push(`rotate(${e.rotation} ${r} ${i})`), B.length ? ` transform="${B.join(" ")}"` : "";
  }
  gs(A, t, e) {
    if (!e.includeBackgroundRectangles || A.secondaryColor.a === 0) return "";
    const { position: s } = A, r = this.Qs(A.secondaryColor);
    return e.drawMode === "stroke" ? `
  <rect x="${s.cellX}" y="${s.cellY}" width="${t.cellWidth}" height="${t.cellHeight}" stroke="${r}" fill="none" stroke-width="${e.strokeWidth}" />` : `
  <rect x="${s.cellX}" y="${s.cellY}" width="${t.cellWidth}" height="${t.cellHeight}" fill="${r}" />`;
  }
  As(A, t, e, s) {
    const r = e.characters[A.charIndex];
    if (!r) return "";
    const i = this.es.ts(r.character, e.font, A.position.cellX, A.position.cellY, t.cellWidth, t.cellHeight, e.fontSize, r.advanceWidth);
    if (!i) return "";
    const B = this.Qs(A.primaryColor);
    return s.drawMode === "stroke" ? `
    <path id="${`path-${A.charIndex}-${A.position.cellX}-${A.position.cellY}`.replace(/\./g, "-")}" d="${i}" stroke="${B}" stroke-width="${s.strokeWidth}" fill="none" />` : `
    <path d="${i}" fill="${B}" />`;
  }
  ns(A, t, e, s) {
    let r = "";
    r += this.gs(A, t, s);
    const i = this.Es(A, t), B = this.As(A, t, e, s);
    return B && (i ? (r += `
  <g${i}>`, r += B, r += `
  </g>`) : r += B), r;
  }
  hs(A, t, e, s) {
    let r = this.ss(t);
    r += this.Bs(t, s), r += `
<g id="ascii-cells">`;
    for (const i of A) r += this.ns(i, t, e, s);
    return r += this.rs(), r;
  }
  ls(A) {
    return A.replace(/<path[^>]*d=""[^>]*\/>/g, "").replace(/\n\s*\n/g, `
`).replace(/[ \t]+$/gm, "");
  }
}
class xA extends L {
  cs(A) {
    return this.Ve(A, "image/svg+xml;charset=utf-8");
  }
  Ds(A, t) {
    this.He(A, this.Je(t) + ".svg", "image/svg+xml;charset=utf-8");
  }
  Cs(A, t) {
    this.Ds(A, t || this.je());
  }
}
class $ {
  constructor() {
    E(this, "us");
    E(this, "Ps");
    E(this, "Is");
    this.us = new pA(), this.Ps = new bA(), this.Is = new xA();
  }
  ws(A) {
    return { includeBackgroundRectangles: A.includeBackgroundRectangles ?? !0, drawMode: A.drawMode ?? "fill", strokeWidth: A.strokeWidth ?? 1, backgroundColor: A.backgroundColor ?? [0, 0, 0, 0] };
  }
  fs(A, t = {}) {
    const e = this.ws(t), s = this.us.Ue(A.pipeline), r = this.us.Ne(s, A.grid), i = this.Ps.hs(r, A.grid, A.font, e);
    return this.Ps.ls(i);
  }
  Cs(A, t = {}) {
    const e = this.fs(A, t), s = t.filename || this.Is.je();
    this.Is.Cs(e, s);
  }
}
class vA extends k {
  ds(A, t, e, s = " ") {
    var B;
    const r = [];
    let i = 0;
    for (let Q = 0; Q < t.rows; Q++) {
      const n = [];
      for (let g = 0; g < t.cols; g++) {
        const a = 4 * i, h = this.Re(A.characterPixels, a), u = ((B = e.characters[h]) == null ? void 0 : B.character) || s;
        n.push(u), i++;
      }
      r.push(n);
    }
    return r;
  }
}
class yA {
  ps(A, t) {
    const e = [];
    for (const r of A) {
      let i = r.join("");
      t.preserveTrailingSpaces || (i = i.replace(/\s+$/, "")), e.push(i);
    }
    const s = t.lineEnding === "crlf" ? `\r
` : `
`;
    return e.join(s);
  }
}
class _A extends L {
  _s(A, t) {
    const e = this.vs(t);
    this.He(A, e, "text/plain;charset=utf-8");
  }
  vs(A) {
    let t = this.Je(A);
    return t === ".txt" || t.length <= 4 ? this.je() : t;
  }
}
class z {
  constructor() {
    E(this, "us");
    E(this, "Ps");
    E(this, "Is");
    this.us = new vA(), this.Ps = new yA(), this.Is = new _A();
  }
  ws(A) {
    return { preserveTrailingSpaces: A.preserveTrailingSpaces ?? !1, lineEnding: A.lineEnding ?? "lf", emptyCharacter: A.emptyCharacter ?? " " };
  }
  bs(A, t = {}) {
    const e = this.ws(t), s = this.us.Ue(A.pipeline), r = this.us.ds(s, A.grid, A.font, e.emptyCharacter);
    return this.Ps.ps(r, e);
  }
  _s(A, t = {}) {
    const e = this.bs(A, t), s = t.filename || this.Is.je();
    this.Is._s(e, s);
  }
}
class MA extends k {
  Ms(A, t = 1, e = "transparent") {
    const s = A.canvas;
    if (t === 1 && e === "transparent") return s;
    const r = document.createElement("canvas"), i = r.getContext("2d"), B = Math.round(s.width * t), Q = Math.round(s.height * t);
    return r.width = B, r.height = Q, e !== "transparent" && (i.fillStyle = e, i.fillRect(0, 0, B, Q)), i.imageSmoothingEnabled = !1, i.drawImage(s, 0, 0, s.width, s.height, 0, 0, B, Q), r;
  }
}
class TA {
  Gs(A, t) {
    const e = this.Fs(t.format);
    return t.format === "png" ? A.toDataURL(e) : A.toDataURL(e, t.quality);
  }
  async $s(A, t) {
    return new Promise((e, s) => {
      const r = this.Fs(t.format), i = (B) => {
        B ? e(B) : s(Error(`Failed to generate ${t.format.toUpperCase()} blob`));
      };
      t.format === "png" ? A.toBlob(i, r) : A.toBlob(i, r, t.quality);
    });
  }
  Fs(A) {
    switch (A) {
      case "png":
        return "image/png";
      case "jpg":
        return "image/jpeg";
      case "webp":
        return "image/webp";
      default:
        throw Error("Unsupported image format: " + A);
    }
  }
}
const RA = { png: "image/png", jpg: "image/jpeg", webp: "image/webp" }, Z = { png: ".png", jpg: ".jpg", webp: ".webp" };
class YA extends L {
  Ys(A, t, e) {
    this.Ts(A, this.Je(t) + Z[e]);
  }
  Ts(A, t) {
    const e = URL.createObjectURL(A);
    try {
      const s = document.createElement("a");
      s.href = e, s.download = t, s.style.display = "none", s.rel = "noopener", document.body.appendChild(s), s.click(), document.body.removeChild(s);
    } finally {
      URL.revokeObjectURL(e);
    }
  }
  Ss(A) {
    return A in RA && A in Z;
  }
}
class FA {
  constructor() {
    E(this, "us");
    E(this, "Ps");
    E(this, "Is");
    this.us = new MA(), this.Ps = new TA(), this.Is = new YA();
  }
  ws(A) {
    return { format: A.format ?? "png", quality: A.quality ?? 1, scale: A.scale ?? 1, backgroundColor: A.backgroundColor ?? "transparent" };
  }
  Os(A) {
    if (console.log("Validating image export options:", A), !this.Is.Ss(A.format)) throw Error(`Saving '${A.format}' files is not supported`);
    if (A.quality < 0 || A.quality > 1) throw Error("Image quality must be between 0.0 and 1.0");
    if (A.scale <= 0) throw Error("Scale factor must be greater than 0");
    A.scale > 10 && console.warn("Large scale factors may result in very large files and slow performance"), A.format === "jpg" && A.backgroundColor === "transparent" && (A.backgroundColor = "black");
  }
  Us(A, t = {}) {
    const e = this.ws(t);
    if (this.Os(e), e.scale === 1 && e.backgroundColor === "transparent") return this.Ps.Gs(A.canvas, e);
    const s = this.us.Ms(A, e.scale, e.backgroundColor);
    return this.Ps.Gs(s, e);
  }
  async $s(A, t = {}) {
    const e = this.ws(t);
    if (this.Os(e), e.scale === 1 && e.backgroundColor === "transparent") return await this.Ps.$s(A.canvas, e);
    const s = this.us.Ms(A, e.scale, e.backgroundColor);
    return await this.Ps.$s(s, e);
  }
  async Ys(A, t = {}) {
    const e = await this.$s(A, t), s = t.format ?? "png", r = t.filename || this.Is.je();
    this.Is.Ys(e, r, s);
  }
}
const GA = (o) => class extends o {
  toString(A = {}) {
    return new z().bs({ pipeline: this.Rs, grid: this.he, font: this.bt }, A);
  }
  saveStrings(A = {}) {
    new z()._s({ pipeline: this.Rs, grid: this.he, font: this.bt }, A);
  }
  toSVG(A = {}) {
    return new $().fs(this, A);
  }
  saveSVG(A = {}) {
    new $().Cs(this, A);
  }
  async saveCanvas(A, t = "png", e = {}) {
    await new FA().Ys(this.Zt, { ...e, filename: A, format: t });
  }
}, UA = (o) => class extends o {
  async loadFont(A) {
    return this.bt.Lt(A).then(() => {
      const t = this.bt.maxGlyphDimensions;
      this.he.te(t.width, t.height), this.Rs.re();
    });
  }
  fontSize(A) {
    if (!D.C(typeof A == "number" && A > 0, "Font size must be a positive number greater than 0.", { method: "fontSize", providedValue: A }) || this.bt.fontSize === A) return;
    this.bt.zt(A);
    const t = this.bt.maxGlyphDimensions;
    this.he.te(t.width, t.height), this.Rs.re(), this.ut.VA();
  }
}, OA = (o) => class extends o {
  addConverter(A) {
    return this.Rs.add(A);
  }
  removeConverter(A) {
    this.Rs.remove(A);
  }
};
class SA {
  constructor() {
    E(this, "ut");
    E(this, "bt");
    E(this, "Rs");
    E(this, "Zt");
    E(this, "he");
  }
}
class W extends function(t, ...e) {
  return e.reduce((s, r) => r(s), t);
}(SA, wA, GA, UA, OA) {
  constructor(t = null, e = {}) {
    super();
    E(this, "ie");
    E(this, "ks");
    E(this, "Ee");
    E(this, "Vs");
    E(this, "Hs");
    E(this, "zs", null);
    E(this, "Ls", 0);
    E(this, "Js");
    E(this, "js", !0);
    E(this, "Ks", 0);
    E(this, "Ws", 0);
    E(this, "Ns", 0);
    E(this, "Zs", []);
    E(this, "Xs", 10);
    E(this, "qs", !1);
    E(this, "Ar", !1);
    E(this, "tr", () => {
    });
    E(this, "er", () => {
    });
    E(this, "sr");
    this.ie = t, this.Ar = t === null, this.Vs = e.renderMode ?? "auto", this.Hs = e.frameRate ?? 60, this.Js = 1e3 / this.Hs;
  }
  static async create(t = null, e = {}) {
    const s = new this(t, e), r = s.Ar ? e : void 0;
    let i, B;
    s.Zt = new dA(s.ie, s.Ar, r), s.ut = new EA(s.Zt.ne()), s.Ar ? (i = e.width || 800, B = e.height || 600) : (i = s.Zt.width || 800, B = s.Zt.height || 600), s.ks = s.ut.UA(i, B), s.bt = new DA(s.ut, e.fontSize ?? 16), await s.bt.kt(e.fontSource);
    const Q = s.bt.maxGlyphDimensions;
    return s.he = new PA(s.Zt.canvas, Q.width, Q.height), s.Rs = new fA(s.ut, s.bt, s.he), s.rr(), s.Br(), s;
  }
  rr() {
    this.sr = () => {
      this.Ar ? this.er() : this.ir();
    }, window.addEventListener("resize", this.sr), window.ResizeObserver && this.ie && !this.Ar && (this.Ee = new ResizeObserver(() => {
      this.ir();
    }), this.Ee.observe(this.ie));
  }
  render() {
    this.Qr(), this.Ns++, this.qs ? console.warn("Cannot render: Required resources have been disposed") : (this.Ar ? (this.ks.begin(), this.tr(), this.ks.end()) : this.ks.S(this.ie), this.Rs.hasEnabledConverters() ? (this.Rs.Oe(this.ks), this.ut.RA(0), this.ut.HA(this.Rs.texture, this.he.offsetX, this.he.offsetY, this.Rs.texture.width, this.Rs.texture.height)) : (this.ut.kA(), this.ut.HA(this.ks, this.he.offsetX, this.he.offsetY, this.ks.width, this.ks.height)));
  }
  ir() {
    this.Zt.re(), this.ks.resize(this.Zt.width, this.Zt.height), this.he.re(), this.Rs.re(), this.ut.VA(), this.Vs !== "manual" && this.render();
  }
  Br() {
    if (this.Vs !== "auto" || !this.js) return;
    this.Ls = performance.now();
    const t = (e) => {
      if (!this.js) return void (this.zs = null);
      const s = e - this.Ls;
      s >= this.Js && (this.render(), this.Ls = e - s % this.Js), this.js && (this.zs = requestAnimationFrame(t));
    };
    this.zs = requestAnimationFrame(t);
  }
  Qr() {
    const t = performance.now();
    if (this.Ws > 0) {
      const e = t - this.Ws;
      this.Zs.push(e), this.Zs.length > this.Xs && this.Zs.shift();
      const s = this.Zs.reduce((r, i) => r + i, 0) / this.Zs.length;
      this.Ks = 1e3 / s;
    }
    this.Ws = t;
  }
  Er() {
    this.zs && (cancelAnimationFrame(this.zs), this.zs = null);
  }
  renderMode(t) {
    this.Vs !== t && (this.Er(), this.Vs = t, t === "auto" && this.js && this.Br());
  }
  frameRate(t) {
    if (t === void 0) return this.Ks;
    this.Hs = t, this.Js = 1e3 / t, this.Vs === "auto" && this.js && (this.Er(), this.Br());
  }
  noLoop() {
    this.js && (this.js = !1, this.zs && (cancelAnimationFrame(this.zs), this.zs = null));
  }
  loop() {
    this.js || (this.js = !0, this.Vs === "auto" && this.Br());
  }
  redraw(t = 1) {
    if (D.C(typeof t == "number" && t > 0 && Number.isInteger(t), "Redraw count must be a positive integer.", { method: "redraw", providedValue: t })) for (let e = 0; e < t; e++) this.render();
  }
  isLooping() {
    return this.Vs === "auto" && this.js;
  }
  draw(t) {
    this.tr = t;
  }
  windowResized(t) {
    this.er = t;
  }
  resizeCanvas(t, e) {
    this.Ar && (this.Zt.re(t, e), this.ks.resize(this.Zt.width, this.Zt.height), this.he.re(), this.Rs.re(), this.ut.VA(), this.Vs !== "manual" && this.render());
  }
  destroy() {
    this.qs || (this.Er(), window.removeEventListener("resize", this.sr), this.Ee && this.Ee.disconnect(), this.Rs.O(), this.bt.O(), this.ks.O(), this.ut.O(), this.qs = !0);
  }
  get grid() {
    return this.he;
  }
  get font() {
    return this.bt;
  }
  get mode() {
    return this.Vs;
  }
  get pipeline() {
    return this.Rs;
  }
  get frameCount() {
    return this.Ns;
  }
  get renderer() {
    return this.ut;
  }
  set frameCount(t) {
    this.Ns = t;
  }
  get width() {
    return this.Zt.width;
  }
  get height() {
    return this.Zt.height;
  }
  get canvas() {
    return this.Zt;
  }
  get isDisposed() {
    return this.qs;
  }
}
class H {
  constructor() {
    throw new I("Textmode is a static class and cannot be instantiated.");
  }
  static async create(A, t = {}) {
    if (!(A == null || A instanceof HTMLCanvasElement || A instanceof HTMLVideoElement || typeof A == "object")) throw new I("First parameter must be HTMLCanvasElement, HTMLVideoElement, or options object.");
    if (typeof t != "object") throw new I("Second parameter must be an options object.");
    if (A instanceof HTMLCanvasElement || A instanceof HTMLVideoElement) return W.create(A, t);
    {
      const e = A || {};
      return W.create(null, e);
    }
  }
  static setErrorLevel(A) {
    D.u(A);
  }
  static get version() {
    return "0.1.9";
  }
}
const HA = Object.freeze(Object.defineProperty({ __proto__: null }, Symbol.toStringTag, { value: "Module" })), VA = Object.freeze(Object.defineProperty({ __proto__: null, DEFAULT_FRAMEBUFFER_OPTIONS: { filter: "nearest", wrap: "clamp", format: "rgba", type: "unsigned_byte" }, Framebuffer: X, Shader: q }, Symbol.toStringTag, { value: "Module" })), NA = H.create, $A = H.setErrorLevel, zA = H.version;
export {
  dA as TextmodeCanvas,
  IA as TextmodeColorPalette,
  fA as TextmodeConversionPipeline,
  iA as TextmodeErrorLevel,
  DA as TextmodeFont,
  PA as TextmodeGrid,
  W as Textmodifier,
  LA as converters,
  NA as create,
  HA as export,
  VA as rendering,
  $A as setErrorLevel,
  H as textmode,
  zA as version
};
