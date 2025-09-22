var ct = Object.defineProperty;
var lt = (h, t, e) => t in h ? ct(h, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : h[t] = e;
var a = (h, t, e) => lt(h, typeof t != "symbol" ? t + "" : t, e);
class U extends Error {
  constructor(t, e = {}) {
    super(U.i(t, e)), this.name = "TextmodeError";
  }
  static i(t, e) {
    return `${t}${e && Object.keys(e).length > 0 ? `

📋 Context:` + Object.entries(e).map(([i, s]) => `
  - ${i}: ${U.o(s)}`).join("") : ""}

${"↓".repeat(24)}
`;
  }
  static o(t) {
    if (t === null) return "null";
    if (t === void 0) return "undefined";
    if (typeof t == "string") return `"${t}"`;
    if (typeof t == "number" || typeof t == "boolean") return t + "";
    if (Array.isArray(t)) return t.length === 0 ? "[]" : t.length <= 5 ? `[${t.map((e) => U.o(e)).join(", ")}]` : `[${t.slice(0, 3).map((e) => U.o(e)).join(", ")}, ... +${t.length - 3} more]`;
    if (typeof t == "object") {
      const e = Object.keys(t);
      return e.length === 0 ? "{}" : e.length <= 3 ? `{ ${e.map((i) => `${i}: ${U.o(t[i])}`).join(", ")} }` : `{ ${e.slice(0, 2).map((i) => `${i}: ${U.o(t[i])}`).join(", ")}, ... +${e.length - 2} more }`;
    }
    return t + "";
  }
}
var ut = ((h) => (h[h.SILENT = 0] = "SILENT", h[h.WARNING = 1] = "WARNING", h[h.ERROR = 2] = "ERROR", h[h.THROW = 3] = "THROW", h))(ut || {});
const D = class D {
  constructor() {
    a(this, "u", { globalLevel: 3 });
  }
  static m() {
    return D.l || (D.l = new D()), D.l;
  }
  _(t, e) {
    const i = "%c[textmode.js] Oops! (╯°□°)╯︵ Something went wrong in your code.", s = "color: #f44336; font-weight: bold; background: #ffebee; padding: 2px 6px; border-radius: 3px;";
    switch (this.u.globalLevel) {
      case 0:
        return !1;
      case 1:
        return console.group(i, s), console.warn(U.i(t, e)), console.groupEnd(), !1;
      case 2:
        return console.group(i, s), console.error(U.i(t, e)), console.groupEnd(), !1;
      default:
        throw new U(t, e);
    }
  }
  v(t, e, i) {
    return !!t || (this._(e, i), !1);
  }
  A(t) {
    this.u.globalLevel = t;
  }
};
a(D, "l", null);
let K = D;
const G = K.m(), ot = /* @__PURE__ */ new WeakMap();
function H(h, t) {
  ot.set(h, t);
}
function k(h) {
  return ot.get(h);
}
class ht {
  constructor() {
    a(this, "C", 1);
    a(this, "$", 0);
    a(this, "U", 0);
    a(this, "M", 0);
    a(this, "F", [0, 0, 0]);
    a(this, "R", [1, 1, 1, 1]);
    a(this, "P", [0, 0, 0, 1]);
    a(this, "S", !1);
    a(this, "G", !1);
    a(this, "D", !1);
    a(this, "L", [0, 0]);
    a(this, "O", [0, 0, 0, 1]);
    a(this, "k", []);
  }
  H() {
    this.k.push({ I: this.C, N: this.$, X: this.U, W: this.M, L: [...this.L], V: this.S, K: this.G, D: this.D, j: [...this.F], Y: [...this.R], q: [...this.P] });
  }
  Z() {
    const t = this.k.pop();
    t ? (this.C = t.I, this.$ = t.N, this.U = t.X, this.M = t.W, this.L = t.L, this.S = t.V, this.G = t.K, this.D = t.D, this.F = t.j, this.R = t.Y, this.P = t.q) : console.warn("pop() called without matching push()");
  }
  J(t) {
    t.I = this.C, t.N = this.$, t.X = this.U, t.W = this.M, t.j[0] = this.F[0], t.j[1] = this.F[1], t.j[2] = this.F[2], t.Y[0] = this.R[0], t.Y[1] = this.R[1], t.Y[2] = this.R[2], t.Y[3] = this.R[3], t.q[0] = this.P[0], t.q[1] = this.P[1], t.q[2] = this.P[2], t.q[3] = this.P[3], t.V = this.S, t.K = this.G, t.D = this.D, t.L[0] = this.L[0], t.L[1] = this.L[1];
  }
  get lineWeight() {
    return this.C;
  }
  get canvasBackgroundColor() {
    return this.O;
  }
  tt(t) {
    this.C = Math.abs(t);
  }
  et(t) {
    this.$ = t;
  }
  st(t) {
    this.U = t;
  }
  it(t) {
    this.M = t;
  }
  rt(t) {
    this.F = t;
  }
  nt(t, e, i, s = 255) {
    this.R = [t / 255, e / 255, i / 255, s / 255];
  }
  ot(t, e, i, s = 255) {
    this.P = [t / 255, e / 255, i / 255, s / 255];
  }
  ht(t) {
    this.S = t;
  }
  ct(t) {
    this.G = t;
  }
  lt(t) {
    this.D = t;
  }
  ut(t) {
    const e = 255 * t / 360, i = Math.floor(e) / 255, s = Math.round(e - Math.floor(e));
    this.L = [i, s];
  }
  ft(t, e, i, s) {
    this.O = [t / 255, e / 255, i / 255, s / 255];
  }
}
class q {
  constructor(t, e, i = e, s = 1, r = {}, n = null, o = !1) {
    a(this, "dt");
    a(this, "gt");
    a(this, "u");
    a(this, "_t", null);
    a(this, "vt");
    a(this, "yt");
    a(this, "At", []);
    a(this, "wt");
    a(this, "Ct", null);
    a(this, "bt", []);
    a(this, "xt", null);
    a(this, "$t", !1);
    a(this, "Mt", null);
    this.dt = e, this.gt = i, this.u = { filter: "nearest", wrap: "clamp", format: "rgba", type: "unsigned_byte", ...r }, this.vt = t, this.wt = Math.min(Math.max(1, s), 8), this.xt = n, this.$t = !!o, this.Mt = this.$t ? new ht() : null;
    const c = t.getParameter(t.MAX_DRAW_BUFFERS), l = t.getParameter(t.MAX_COLOR_ATTACHMENTS);
    this.wt = Math.min(this.wt, c, l), this.yt = t.createFramebuffer(), this.Ft(), this.Rt(), this.bt = Array(this.wt).fill(null);
  }
  Ft() {
    const t = this.vt, e = this.u.filter === "linear" ? t.LINEAR : t.NEAREST, i = this.u.wrap === "repeat" ? t.REPEAT : t.CLAMP_TO_EDGE, s = this.u.type === "float" ? t.FLOAT : t.UNSIGNED_BYTE;
    for (let r = 0; r < this.wt; r++) {
      const n = t.createTexture();
      t.bindTexture(t.TEXTURE_2D, n), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MIN_FILTER, e), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MAG_FILTER, e), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_S, i), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_T, i), t.texImage2D(t.TEXTURE_2D, 0, t.RGBA, this.dt, this.gt, 0, t.RGBA, s, null), this.At.push(n);
    }
    t.bindTexture(t.TEXTURE_2D, null);
  }
  Rt() {
    const t = this.vt;
    if (t.bindFramebuffer(t.FRAMEBUFFER, this.yt), this.wt === 1) t.framebufferTexture2D(t.FRAMEBUFFER, t.COLOR_ATTACHMENT0, t.TEXTURE_2D, this.At[0], 0);
    else {
      const i = [];
      for (let s = 0; s < this.wt; s++) {
        const r = t.COLOR_ATTACHMENT0 + s;
        t.framebufferTexture2D(t.FRAMEBUFFER, r, t.TEXTURE_2D, this.At[s], 0), i.push(r);
      }
      t.drawBuffers(i);
    }
    const e = t.checkFramebufferStatus(t.FRAMEBUFFER);
    e !== t.FRAMEBUFFER_COMPLETE && console.error("GLFramebuffer is not complete:", e), t.bindFramebuffer(t.FRAMEBUFFER, null);
  }
  zt(t) {
    const e = this.vt;
    e.bindTexture(e.TEXTURE_2D, this.At[0]), e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL, 1), e.texImage2D(e.TEXTURE_2D, 0, e.RGBA, e.RGBA, e.UNSIGNED_BYTE, t), e.bindTexture(e.TEXTURE_2D, null);
  }
  resize(t, e) {
    this.dt = t, this.gt = e, this._t = null, this.bt = Array(this.wt).fill(null);
    const i = this.vt, s = this.u.type === "float" ? i.FLOAT : i.UNSIGNED_BYTE;
    for (const r of this.At) i.bindTexture(i.TEXTURE_2D, r), i.texImage2D(i.TEXTURE_2D, 0, i.RGBA, this.dt, this.gt, 0, i.RGBA, s, null);
    i.bindTexture(i.TEXTURE_2D, null);
  }
  Pt(t) {
    const e = this.vt, i = this.bt[t];
    if (i) return i;
    const s = this.dt, r = this.gt, n = new Uint8Array(s * r * 4), o = e.getParameter(e.READ_FRAMEBUFFER_BINDING);
    e.bindFramebuffer(e.READ_FRAMEBUFFER, this.yt), e.readBuffer(e.COLOR_ATTACHMENT0 + t), e.readPixels(0, 0, s, r, e.RGBA, e.UNSIGNED_BYTE, n), e.bindFramebuffer(e.READ_FRAMEBUFFER, o);
    const c = 4 * s, l = new Uint8Array(n.length);
    for (let u = 0; u < r; u++) {
      const f = (r - 1 - u) * c, g = u * c;
      l.set(n.subarray(f, f + c), g);
    }
    return this.bt[t] = l, l;
  }
  begin() {
    var e, i, s, r;
    const t = this.vt;
    if (this.xt) {
      const n = ((i = (e = this.xt).Tt) == null ? void 0 : i.call(e)) ?? null;
      n && this.xt.St(n), this.$t && this.Mt && ((r = (s = this.xt).Et) == null || r.call(s, this.Mt));
    }
    this.Ct = { framebuffer: t.getParameter(t.FRAMEBUFFER_BINDING), viewport: t.getParameter(t.VIEWPORT) }, t.bindFramebuffer(t.FRAMEBUFFER, this.yt), this.bt = Array(this.wt).fill(null);
    for (let n = 0; n < this.wt; n++) t.clearBufferfv(t.COLOR, n, new Float32Array([0, 0, 0, 0]));
    t.viewport(0, 0, this.dt, this.gt), H(t, [0, 0, this.dt, this.gt]);
  }
  end() {
    var e, i, s, r;
    if (!this.Ct) return;
    const t = this.vt;
    if (this.xt) {
      const n = ((i = (e = this.xt).Tt) == null ? void 0 : i.call(e)) ?? null;
      n && this.xt.St(n);
    }
    t.bindFramebuffer(t.FRAMEBUFFER, this.Ct.framebuffer), t.viewport(...this.Ct.viewport), H(t, this.Ct.viewport), this.Ct = null, this.xt && this.$t && this.Mt && ((r = (s = this.xt).Bt) == null || r.call(s));
  }
  Gt() {
    const t = this.vt;
    t.deleteFramebuffer(this.yt);
    for (const e of this.At) t.deleteTexture(e);
  }
  get width() {
    return this.dt;
  }
  get height() {
    return this.gt;
  }
  get textures() {
    return [...this.At];
  }
}
class I {
  constructor(t, e, i) {
    a(this, "vt");
    a(this, "Dt");
    a(this, "Lt", /* @__PURE__ */ new Map());
    a(this, "Ot", /* @__PURE__ */ new Map());
    a(this, "kt", 0);
    this.vt = t, this.Dt = this.Ht(e, i), this.It();
  }
  It() {
    const t = this.vt.getProgramParameter(this.Dt, this.vt.ACTIVE_UNIFORMS);
    for (let e = 0; e < t; e++) {
      const i = this.vt.getActiveUniform(this.Dt, e);
      if (i) {
        const s = this.vt.getUniformLocation(this.Dt, i.name);
        if (s && (this.Lt.set(i.name, s), this.Ot.set(i.name, { type: i.type, size: i.size }), i.size > 1)) {
          const r = i.name.replace(/\[.*\]$/, "");
          this.Lt.has(r) || (this.Lt.set(r, s), this.Ot.set(r, { type: i.type, size: i.size }));
        }
      }
    }
  }
  Ht(t, e) {
    const i = this.Nt(this.vt.VERTEX_SHADER, t), s = this.Nt(this.vt.FRAGMENT_SHADER, e), r = this.vt.createProgram();
    if (this.vt.attachShader(r, i), this.vt.attachShader(r, s), this.vt.linkProgram(r), !this.vt.getProgramParameter(r, this.vt.LINK_STATUS)) {
      const n = this.vt.getProgramInfoLog(r);
      throw Error("Shader program link error: " + n);
    }
    return this.vt.deleteShader(i), this.vt.deleteShader(s), r;
  }
  Nt(t, e) {
    const i = this.vt.createShader(t);
    if (this.vt.shaderSource(i, e), this.vt.compileShader(i), !this.vt.getShaderParameter(i, this.vt.COMPILE_STATUS)) {
      const s = this.vt.getShaderInfoLog(i);
      throw this.vt.deleteShader(i), Error("Shader compilation error: " + s);
    }
    return i;
  }
  Xt() {
    this.vt.useProgram(this.Dt), this.Wt();
  }
  Wt() {
    this.kt = 0;
  }
  Vt(t) {
    for (const [e, i] of Object.entries(t)) this.Kt(e, i);
  }
  jt(t) {
    return this.Lt.has(t);
  }
  Yt(t) {
    return this.Ot.get(t) || null;
  }
  qt() {
    const t = [];
    for (const [e, i] of this.Ot.entries()) t.push({ name: e, ...i });
    return t;
  }
  Kt(t, e) {
    var c;
    const i = this.Lt.get(t);
    if (!i) return;
    const s = this.Ot.get(t);
    if (!s) return void console.warn(`No type information found for uniform '${t}'`);
    const { type: r, size: n } = s, o = this.vt;
    if (typeof e == "number") switch (r) {
      case o.INT:
      case o.BOOL:
        o.uniform1i(i, e);
        break;
      case o.FLOAT:
        o.uniform1f(i, e);
        break;
      default:
        console.warn(`Unexpected uniform type for scalar '${t}': ${r}`), o.uniform1f(i, e);
    }
    else if (typeof e == "boolean") o.uniform1i(i, e ? 1 : 0);
    else if (Array.isArray(e)) if (Array.isArray(e[0])) {
      const l = e, u = ((c = l[0]) == null ? void 0 : c.length) || 0, f = l.flat();
      switch (r) {
        case o.FLOAT_VEC2:
          u === 2 ? o.uniform2fv(i, f) : console.warn(`Vector length mismatch for '${t}': expected 2, got ${u}`);
          break;
        case o.FLOAT_VEC3:
          u === 3 ? o.uniform3fv(i, f) : console.warn(`Vector length mismatch for '${t}': expected 3, got ${u}`);
          break;
        case o.FLOAT_VEC4:
          u === 4 ? o.uniform4fv(i, f) : console.warn(`Vector length mismatch for '${t}': expected 4, got ${u}`);
          break;
        default:
          console.warn(`Unsupported uniform type for vector array '${t}': ${r}`);
      }
    } else switch (r) {
      case o.FLOAT_VEC2:
        e.length === 2 ? o.uniform2f(i, e[0], e[1]) : console.warn(`Vector length mismatch for '${t}': expected 2, got ${e.length}`);
        break;
      case o.FLOAT_VEC3:
        e.length === 3 ? o.uniform3f(i, e[0], e[1], e[2]) : console.warn(`Vector length mismatch for '${t}': expected 3, got ${e.length}`);
        break;
      case o.FLOAT_VEC4:
        e.length === 4 ? o.uniform4f(i, e[0], e[1], e[2], e[3]) : console.warn(`Vector length mismatch for '${t}': expected 4, got ${e.length}`);
        break;
      case o.INT:
        n > 1 ? o.uniform1iv(i, e) : console.warn(`Array provided for scalar uniform '${t}'`);
        break;
      case o.FLOAT:
        n > 1 ? o.uniform1fv(i, e) : console.warn(`Array provided for scalar uniform '${t}'`);
        break;
      default:
        console.warn(`Unsupported uniform type for array '${t}': ${r}`);
    }
    else if (e instanceof WebGLTexture) {
      const l = this.Zt();
      o.uniform1i(i, l), o.activeTexture(o.TEXTURE0 + l), o.bindTexture(o.TEXTURE_2D, e);
    } else if (e instanceof q) {
      const l = this.Zt();
      o.uniform1i(i, l), o.activeTexture(o.TEXTURE0 + l), o.bindTexture(o.TEXTURE_2D, e.textures[0]);
    } else console.warn(`Unsupported uniform type for '${t}':`, typeof e);
  }
  Zt() {
    return this.kt++;
  }
  get Qt() {
    return this.Dt;
  }
  Gt() {
    this.vt.deleteProgram(this.Dt);
  }
}
const W = `#version 300 es
in vec2 a_position;in vec2 a_texCoord;in vec2 a_instancePosition;in vec2 a_instanceSize;in vec3 a_instanceCharacter;in vec4 a_instancePrimaryColor;in vec4 a_instanceSecondaryColor;in vec2 a_instanceRotation;in vec3 a_instanceTransform;in vec3 a_instanceGlobalRotation;in vec2 a_instanceRotationCenter;in vec2 a_instanceBezierCP1;in vec2 a_instanceBezierCP2;in vec2 a_instanceBezierStart;in vec2 a_instanceBezierEnd;in vec2 a_instanceArcAngles;uniform float U9;uniform vec2 Uy;out vec2 v_uv;out vec3 v_character;out vec4 v_primaryColor;out vec4 v_secondaryColor;out vec2 v_rotation;out vec3 v_transform;mat3 A(float B){float C=sin(B),D=cos(B);return mat3(1,0,0,0,D,-C,0,C,D);}mat3 E(float B){float C=sin(B),D=cos(B);return mat3(D,0,C,0,1,0,-C,0,D);}mat3 F(float B){float C=sin(B),D=cos(B);return mat3(D,-C,0,C,D,0,0,0,1);}vec2 G(float H,vec2 I,vec2 J,vec2 K,vec2 L){float M=1.-H,N=M*M,O=H*H;return N*M*I+3.*N*H*J+3.*M*O*K+O*H*L;}vec2 P(float H,vec2 I,vec2 J,vec2 K,vec2 L){float M=1.-H,N=M*M,O=H*H;return-3.*N*I+3.*N*J-6.*M*H*J+6.*M*H*K-3.*O*K+3.*O*L;}void main(){v_uv=a_texCoord;v_character=a_instanceCharacter;v_primaryColor=a_instancePrimaryColor;v_secondaryColor=a_instanceSecondaryColor;v_rotation=a_instanceRotation;v_transform=a_instanceTransform;vec2 Q;bool R=length(a_instanceBezierCP1)+length(a_instanceBezierCP2)+length(a_instanceBezierStart)+length(a_instanceBezierEnd)>0.;bool S=a_instanceArcAngles.x!=0.||a_instanceArcAngles.y!=0.;if(R){float H=a_position.x;vec2 T=G(H,a_instanceBezierStart,a_instanceBezierCP1,a_instanceBezierCP2,a_instanceBezierEnd);vec2 U=P(H,a_instanceBezierStart,a_instanceBezierCP1,a_instanceBezierCP2,a_instanceBezierEnd);float V=length(U);U=V>0.?U/V:vec2(1,0);Q=T+vec2(-U.y,U.x)*a_position.y*a_instanceSize.y;}else if(S){float C=a_instanceArcAngles.x,W=a_instanceArcAngles.y;C=mod(C,6.28318530718);if(C<0.)C+=6.28318530718;W=mod(W,6.28318530718);if(W<0.)W+=6.28318530718;float X=C-W;if(X<=0.)X+=6.28318530718;float Y=C-a_position.x*X;vec2 Z=vec2(cos(Y),sin(Y))*a_position.y;Q=Z*a_instanceSize*.5+a_instanceSize*.5+a_instancePosition;}else{Q=a_position*a_instanceSize+a_instancePosition;}vec2 a=(Q/Uy)*2.-1.;a.y=-a.y;if(length(a_instanceGlobalRotation)>0.){vec3 b=vec3(a-a_instanceRotationCenter,0);b.x*=U9;if(a_instanceGlobalRotation.x!=0.)b=A(-a_instanceGlobalRotation.x)*b;if(a_instanceGlobalRotation.y!=0.)b=E(-a_instanceGlobalRotation.y)*b;if(a_instanceGlobalRotation.z!=0.)b=F(-a_instanceGlobalRotation.z)*b;b.x/=U9;a=b.xy+a_instanceRotationCenter;}gl_Position=vec4(a,0,1);}`, at = "attribute vec2 a_position;attribute vec2 a_texCoord;varying vec2 v_uv;void main(){v_uv=a_texCoord;gl_Position=vec4(a_position,0.,1.);}";
class ft {
  constructor(t) {
    a(this, "vt");
    a(this, "Jt");
    a(this, "te");
    a(this, "ee");
    a(this, "se");
    this.vt = t, this.te = new I(this.vt, W, `#version 300 es
precision highp float;in vec2 v_uv;in vec3 v_character;in vec4 v_primaryColor;in vec4 v_secondaryColor;in vec2 v_rotation;in vec3 v_transform;layout(location=0)out vec4 o_character;layout(location=1)out vec4 o_primaryColor;layout(location=2)out vec4 o_secondaryColor;layout(location=3)out vec4 o_rotation;layout(location=4)out vec4 o_transform;void main(){o_character=vec4(v_character,1.);o_primaryColor=v_primaryColor;o_secondaryColor=v_secondaryColor;o_rotation=vec4(v_rotation,0.,1.);o_transform=vec4(v_transform,1.);}`), this.Jt = new I(this.vt, W, `#version 300 es
precision highp float;in vec2 v_uv;uniform sampler2D Ue;uniform sampler2D Uf;uniform sampler2D Ug;uniform sampler2D Uh;uniform sampler2D Ui;uniform vec2 Uj;layout(location=0)out vec4 o_character;layout(location=1)out vec4 o_primaryColor;layout(location=2)out vec4 o_secondaryColor;layout(location=3)out vec4 o_rotation;layout(location=4)out vec4 o_transform;void main(){vec2 A=vec2(v_uv.x,1.-v_uv.y);vec2 B=A*Uj;vec2 C=(floor(B)+0.5f)/Uj;vec4 D=texture(Ue,C);vec4 E=texture(Uf,C);if(E.a==0.){discard;}vec4 F=texture(Ug,C);vec4 G=texture(Uh,C);vec4 H=texture(Ui,C);o_character=D;o_primaryColor=E;o_secondaryColor=F;o_rotation=G;o_transform=H;}`), this.ee = new I(this.vt, at, "precision mediump float;uniform sampler2D U0;uniform vec2 U1;uniform sampler2D U3;uniform sampler2D U4;uniform sampler2D U5;uniform sampler2D U2;uniform sampler2D U6;uniform vec2 U7;uniform vec2 U8;mat2 A(float B){float C=sin(B);float D=cos(B);return mat2(D,-C,C,D);}void main(){vec2 E=gl_FragCoord.xy/U8;vec2 F=E*U7;vec2 G=floor(F);vec2 H=(G+0.5)/U7;vec4 I=texture2D(U3,H);vec4 J=texture2D(U4,H);vec4 K=texture2D(U5,H);bool L=K.r>0.5;bool M=K.g>0.5;bool N=K.b>0.5;vec4 O=texture2D(U2,H);int P=int(O.r*255.+0.5)+int(O.g*255.+0.5)*256;int Q=int(mod(float(P),U1.x));int R=P/int(U1.x);float S=(U1.y-1.)-float(R);vec2 T=vec2(float(Q),S)/U1;vec4 U=texture2D(U6,H);float V=U.r*255.+U.g;float W=-(V*360./255.)*0.017453292;vec2 X=fract(F)-0.5;if(M)X.x=-X.x;if(N)X.y=-X.y;X=A(W)*X+0.5;vec2 Y=1./U1;vec2 Z=T+X*Y;vec2 a=T+Y;if(any(lessThan(Z,T))||any(greaterThan(Z,a))){gl_FragColor=L?I:J;return;}vec4 b=texture2D(U0,Z);if(L)b.rgb=1.-b.rgb;gl_FragColor=mix(J,I,b);}"), this.se = new I(this.vt, W, `#version 300 es
precision highp float;in vec2 v_uv;uniform sampler2D Uk;uniform bool Ul;uniform bool Um;uniform bool Un;uniform vec2 Uo;uniform bool Up;uniform vec3 Uq;uniform bool Ur;uniform vec3 Us;uniform vec4 Ut;uniform int Uu;uniform vec3 Uv[64];layout(location=0)out vec4 o_character;layout(location=1)out vec4 o_primaryColor;layout(location=2)out vec4 o_secondaryColor;layout(location=3)out vec4 o_rotation;layout(location=4)out vec4 o_transform;float A(vec3 B){return dot(B,vec3(0.299f,0.587f,0.114f));}void main(){vec2 C=vec2(v_uv.x,1.0f-v_uv.y);vec4 D=texture(Uk,C);float E=A(D.rgb);if(Uu>0){float F=float(Uu);float G=clamp(E*(F-1.0f),0.0f,F-1.0f);int H=int(floor(G+0.5f));vec3 I=Uv[H];o_character=vec4(I,1.0f);}else{o_character=vec4(E,0.0f,0.0f,1.0f);}vec3 J=D.rgb;vec3 K=Up?Uq:J;vec3 L=Ur?Us:J;float M=1.0f;float N=1.0f;if(D.a<0.01f){K=Ut.rgb;L=Ut.rgb;}o_primaryColor=vec4(K,M);o_secondaryColor=vec4(L,N);o_rotation=vec4(Uo.xy,0.0f,1.0f);o_transform=vec4(float(Ul),float(Um),float(Un),1.0f);}`);
  }
  ie() {
    return this.Jt;
  }
  Tt() {
    return this.te;
  }
  re() {
    return this.ee;
  }
  ne() {
    return this.se;
  }
  oe(t) {
    return new I(this.vt, W, t);
  }
  ae(t, e) {
    return new I(this.vt, t, e);
  }
  Gt() {
    this.Jt.Gt(), this.te.Gt(), this.ee.Gt(), this.se.Gt();
  }
}
var y = ((h) => (h.RECTANGLE = "rectangle", h.LINE = "line", h.ELLIPSE = "ellipse", h.ARC = "arc", h.TRIANGLE = "triangle", h.BEZIER_CURVE = "bezier_curve", h.CUSTOM = "custom", h))(y || {});
class dt {
  constructor(t) {
    a(this, "vt");
    a(this, "he", /* @__PURE__ */ new Map());
    this.vt = t;
  }
  ce(t, e, i, s) {
    const r = this.vt;
    let n = this.he.get(t);
    n || (n = /* @__PURE__ */ new Map(), this.he.set(t, n));
    let o = n.get(e) || null;
    if (!o) {
      o = r.createVertexArray(), n.set(e, o), r.bindVertexArray(o), r.bindBuffer(r.ARRAY_BUFFER, s);
      const c = r.getAttribLocation(t, "a_position");
      c !== -1 && (r.enableVertexAttribArray(c), r.vertexAttribPointer(c, i.ue.le.size, r.FLOAT, !1, i.fe, i.ue.le.offset), r.vertexAttribDivisor(c, 0));
      const l = r.getAttribLocation(t, "a_texCoord");
      l !== -1 && (r.enableVertexAttribArray(l), r.vertexAttribPointer(l, i.ue.de.size, r.FLOAT, !1, i.fe, i.ue.de.offset), r.vertexAttribDivisor(l, 0));
    }
    r.bindVertexArray(o);
  }
  pe() {
    this.vt.bindVertexArray(null);
  }
  Gt() {
    for (const [, t] of this.he) for (const [, e] of t) e && this.vt.deleteVertexArray(e);
  }
}
class gt {
  constructor(t, e) {
    a(this, "me");
    a(this, "vt");
    a(this, "xt");
    a(this, "ge", null);
    a(this, "_e", null);
    this.vt = t, this.me = new dt(t), this.xt = e;
  }
  ve(t, e, i) {
    const { shader: s } = t, r = k(this.vt) || this.vt.getParameter(this.vt.VIEWPORT);
    s.Vt({ U9: r[2] / r[3], Uy: [r[2], r[3]] });
    const n = (l) => {
      if (!l || !l.ye()) return;
      const u = l.unitGeometry, f = l.unitBuffer;
      try {
        this.me.ce(s.Qt, l.type + "", u, f), l.batch.Ae(s), l.batch.we(u.Ce, u.be);
      } finally {
        l.batch.xe(s), this.me.pe(), l.$e();
      }
    };
    let o = null, c = null;
    for (const l of e) {
      if (l.type === y.CUSTOM) {
        c && (n(c), o = null, c = null), this.Me(t, l.params, l.state, i.get(y.RECTANGLE));
        continue;
      }
      o !== null && l.type !== o && (n(c), o = null, c = null);
      let u = c;
      u && l.type === o || (u = i.get(l.type) || null, c = u, o = l.type), u && u.Fe(l.params, l.state);
    }
    n(c);
  }
  Me(t, e, i, s) {
    const { x: r, y: n, width: o, height: c, shader: l, uniforms: u } = e, f = this.Re(Math.max(1, Math.floor(o)), Math.max(1, Math.floor(c)));
    f.begin(), this.ze(s, l, u, 0, 0, f.width, f.height, {}), f.end();
    const g = this.Pe(), v = { Ue: f.textures[0], Uf: f.textures[1], Ug: f.textures[2], Uh: f.textures[3], Ui: f.textures[4], Uj: [f.width, f.height] };
    this.ze(s, g, v, Math.floor(r), Math.floor(n), Math.max(1, Math.floor(o)), Math.max(1, Math.floor(c)), i), t.shader.Xt();
  }
  ze(t, e, i, s, r, n, o, c) {
    e.Xt(), e.Vt(i);
    const l = this.vt.getParameter(this.vt.VIEWPORT);
    if (e.Vt({ U9: l[2] / l[3], Uy: [l[2], l[3]] }), t.$e(), t.Fe({ x: s, y: r, width: n, height: o }, c), t.ye()) {
      const u = t.unitGeometry, f = t.unitBuffer;
      try {
        this.me.ce(e.Qt, t.type + "", u, f), t.batch.Ae(e), t.batch.we(u.Ce, u.be);
      } finally {
        t.batch.xe(e), this.me.pe(), t.$e();
      }
    }
  }
  Pe() {
    return this.xt.ie();
  }
  Re(t, e) {
    return this.ge && this._e && this._e.w === t && this._e.h === e || (this.ge && this.ge.Gt(), this.ge = new q(this.vt, t, e, 5), this._e = { w: t, h: e }), this.ge;
  }
  Gt() {
    this.me.Gt(), this.ge && this.ge.Gt();
  }
}
class pt {
  constructor() {
    a(this, "Te", []);
    a(this, "Se", 1);
    a(this, "Ee", 0);
  }
  Be(t) {
    if (this.Ee >= this.Te.length) {
      const i = { id: this.Se++, type: t, params: {}, state: { I: 1, N: 0, X: 0, W: 0, j: [0, 0, 0], Y: [1, 1, 1, 1], q: [0, 0, 0, 1], V: !1, K: !1, D: !1, L: [0, 0] } };
      this.Te.push(i);
    }
    const e = this.Te[this.Ee];
    return e.id = this.Se++, e.type = t, this.Ee++, e;
  }
  Ge(t, e, i, s, r) {
    const n = this.Be(y.RECTANGLE);
    return n.params.x = t, n.params.y = e, n.params.width = i, n.params.height = s, r.J(n.state), n.id;
  }
  De(t, e, i, s, r, n, o) {
    const c = this.Be(y.CUSTOM);
    return c.params.x = t, c.params.y = e, c.params.width = i, c.params.height = s, c.params.shader = r, c.params.uniforms = n, o.J(c.state), c.id;
  }
  Le(t, e, i, s, r, n) {
    const o = this.Be(y.LINE);
    return o.params.x1 = t, o.params.y1 = e, o.params.x2 = i, o.params.y2 = s, o.params.thickness = r, n.J(o.state), o.id;
  }
  Oe(t, e, i, s, r) {
    const n = this.Be(y.ELLIPSE);
    return n.params.x = t, n.params.y = e, n.params.width = i, n.params.height = s, r.J(n.state), n.id;
  }
  ke(t, e, i, s, r, n, o) {
    const c = this.Be(y.ARC);
    return c.params.x = t, c.params.y = e, c.params.width = i, c.params.height = s, c.params.start = r, c.params.stop = n, o.J(c.state), c.id;
  }
  He(t, e, i, s, r, n, o) {
    const c = this.Be(y.TRIANGLE);
    return c.params.x1 = t, c.params.y1 = e, c.params.x2 = i, c.params.y2 = s, c.params.x3 = r, c.params.y3 = n, o.J(c.state), c.id;
  }
  Ie(t, e, i, s, r, n, o, c, l, u) {
    const f = this.Be(y.BEZIER_CURVE);
    return f.params.x1 = t, f.params.y1 = e, f.params.cp1x = i, f.params.cp1y = s, f.params.cp2x = r, f.params.cp2y = n, f.params.x2 = o, f.params.y2 = c, f.params.thickness = l, u.J(f.state), f.id;
  }
  get length() {
    return this.Ee;
  }
  get isEmpty() {
    return this.Ee === 0;
  }
  Ne() {
    this.Ee = 0;
  }
  [Symbol.iterator]() {
    let t = 0;
    const e = this.Ee, i = this.Te;
    return { next: () => t < e ? { value: i[t++], done: !1 } : { value: void 0, done: !0 } };
  }
}
const P = class P {
  static Xe(t, e, i = 0) {
    var n, o, c, l, u, f, g, v, m, d;
    const s = e || new Float32Array(P.FLOATS_PER_INSTANCE);
    let r = i;
    return s[r++] = t.le[0], s[r++] = t.le[1], s[r++] = t.Ee[0], s[r++] = t.Ee[1], s[r++] = t.j[0], s[r++] = t.j[1], s[r++] = t.j[2], s[r++] = t.Y[0], s[r++] = t.Y[1], s[r++] = t.Y[2], s[r++] = t.Y[3], s[r++] = t.q[0], s[r++] = t.q[1], s[r++] = t.q[2], s[r++] = t.q[3], s[r++] = t.L[0], s[r++] = t.L[1], s[r++] = t.We[0], s[r++] = t.We[1], s[r++] = t.We[2], s[r++] = t.N, s[r++] = t.X, s[r++] = t.W, s[r++] = t.Ve[0], s[r++] = t.Ve[1], s[r++] = ((n = t.Ke) == null ? void 0 : n[0]) || 0, s[r++] = ((o = t.Ke) == null ? void 0 : o[1]) || 0, s[r++] = ((c = t.je) == null ? void 0 : c[0]) || 0, s[r++] = ((l = t.je) == null ? void 0 : l[1]) || 0, s[r++] = ((u = t.Ye) == null ? void 0 : u[0]) || 0, s[r++] = ((f = t.Ye) == null ? void 0 : f[1]) || 0, s[r++] = ((g = t.qe) == null ? void 0 : g[0]) || 0, s[r++] = ((v = t.qe) == null ? void 0 : v[1]) || 0, s[r++] = ((m = t.Ze) == null ? void 0 : m[0]) || 0, s[r++] = ((d = t.Ze) == null ? void 0 : d[1]) || 0, s;
  }
  static Qe(t) {
    const e = t.length * P.FLOATS_PER_INSTANCE, i = new Float32Array(e);
    for (let s = 0; s < t.length; s++) {
      const r = s * P.FLOATS_PER_INSTANCE;
      P.Xe(t[s], i, r);
    }
    return i;
  }
};
a(P, "BYTES_PER_INSTANCE", 140), a(P, "FLOATS_PER_INSTANCE", 35);
let M = P;
const T = class T {
};
a(T, "STRIDE", M.BYTES_PER_INSTANCE), a(T, "ATTRIBUTES", { a_instancePosition: { location: -1, size: 2, type: WebGL2RenderingContext.FLOAT, normalized: !1, stride: T.STRIDE, offset: 0, divisor: 1 }, a_instanceSize: { location: -1, size: 2, type: WebGL2RenderingContext.FLOAT, normalized: !1, stride: T.STRIDE, offset: 8, divisor: 1 }, a_instanceCharacter: { location: -1, size: 3, type: WebGL2RenderingContext.FLOAT, normalized: !1, stride: T.STRIDE, offset: 16, divisor: 1 }, a_instancePrimaryColor: { location: -1, size: 4, type: WebGL2RenderingContext.FLOAT, normalized: !1, stride: T.STRIDE, offset: 28, divisor: 1 }, a_instanceSecondaryColor: { location: -1, size: 4, type: WebGL2RenderingContext.FLOAT, normalized: !1, stride: T.STRIDE, offset: 44, divisor: 1 }, a_instanceRotation: { location: -1, size: 2, type: WebGL2RenderingContext.FLOAT, normalized: !1, stride: T.STRIDE, offset: 60, divisor: 1 }, a_instanceTransform: { location: -1, size: 3, type: WebGL2RenderingContext.FLOAT, normalized: !1, stride: T.STRIDE, offset: 68, divisor: 1 }, a_instanceGlobalRotation: { location: -1, size: 3, type: WebGL2RenderingContext.FLOAT, normalized: !1, stride: T.STRIDE, offset: 80, divisor: 1 }, a_instanceRotationCenter: { location: -1, size: 2, type: WebGL2RenderingContext.FLOAT, normalized: !1, stride: T.STRIDE, offset: 92, divisor: 1 }, a_instanceArcAngles: { location: -1, size: 2, type: WebGL2RenderingContext.FLOAT, normalized: !1, stride: T.STRIDE, offset: 100, divisor: 1 }, a_instanceBezierCP1: { location: -1, size: 2, type: WebGL2RenderingContext.FLOAT, normalized: !1, stride: T.STRIDE, offset: 108, divisor: 1 }, a_instanceBezierCP2: { location: -1, size: 2, type: WebGL2RenderingContext.FLOAT, normalized: !1, stride: T.STRIDE, offset: 116, divisor: 1 }, a_instanceBezierStart: { location: -1, size: 2, type: WebGL2RenderingContext.FLOAT, normalized: !1, stride: T.STRIDE, offset: 124, divisor: 1 }, a_instanceBezierEnd: { location: -1, size: 2, type: WebGL2RenderingContext.FLOAT, normalized: !1, stride: T.STRIDE, offset: 132, divisor: 1 } });
let Y = T;
class mt {
  constructor(t, e = 1e3, i = 1.5) {
    a(this, "vt");
    a(this, "Je", []);
    a(this, "ts");
    a(this, "es");
    a(this, "ss", null);
    a(this, "rs", !0);
    a(this, "ns", 0);
    a(this, "hs", /* @__PURE__ */ new Map());
    a(this, "cs", null);
    this.vt = t, this.ts = e, this.es = i, this.ls();
  }
  Fe(t) {
    const e = this.Je.length;
    return this.Je.push(t), this.rs = !0, e;
  }
  get count() {
    return this.Je.length;
  }
  get isEmpty() {
    return this.Je.length === 0;
  }
  clear() {
    this.Je.length = 0, this.rs = !0;
  }
  us(t) {
    if (t <= this.ts) return;
    const e = Math.ceil(t * this.es);
    this.ts = e, this.ls();
  }
  ls() {
    const t = this.vt;
    this.ss && t.deleteBuffer(this.ss), this.ss = t.createBuffer();
    const e = this.ts * M.BYTES_PER_INSTANCE;
    t.bindBuffer(t.ARRAY_BUFFER, this.ss), t.bufferData(t.ARRAY_BUFFER, e, t.DYNAMIC_DRAW), t.bindBuffer(t.ARRAY_BUFFER, null), this.rs = !0, this.ns = 0;
  }
  fs() {
    if (!this.rs || this.Je.length === 0) return;
    const t = this.vt, e = this.Je.length;
    this.us(e), (!this.cs || this.cs.length < e * M.FLOATS_PER_INSTANCE) && (this.cs = new Float32Array(e * M.FLOATS_PER_INSTANCE));
    const i = M.Qe(this.Je);
    t.bindBuffer(t.ARRAY_BUFFER, this.ss), e <= this.ns ? t.bufferSubData(t.ARRAY_BUFFER, 0, i) : t.bufferData(t.ARRAY_BUFFER, i, t.DYNAMIC_DRAW), t.bindBuffer(t.ARRAY_BUFFER, null), this.rs = !1, this.ns = e;
  }
  ds(t) {
    let e = this.hs.get(t);
    if (!e) {
      e = /* @__PURE__ */ new Map();
      const i = this.vt;
      for (const s in Y.ATTRIBUTES) {
        const r = i.getAttribLocation(t, s);
        r !== -1 && e.set(s, r);
      }
      this.hs.set(t, e);
    }
    return e;
  }
  Ae(t) {
    if (!this.ss || this.Je.length === 0) return;
    const e = this.vt, i = t.Qt;
    this.fs();
    const s = this.ds(i);
    e.bindBuffer(e.ARRAY_BUFFER, this.ss);
    for (const [r, n] of s) {
      const o = Y.ATTRIBUTES[r];
      o && (e.enableVertexAttribArray(n), e.vertexAttribPointer(n, o.size, o.type, o.normalized, o.stride, o.offset), e.vertexAttribDivisor(n, o.divisor));
    }
  }
  xe(t) {
    const e = this.vt, i = this.ds(t.Qt);
    for (const [, s] of i) e.disableVertexAttribArray(s), e.vertexAttribDivisor(s, 0);
  }
  we(t, e) {
    this.Je.length !== 0 && this.vt.drawArraysInstanced(t, 0, e, this.Je.length);
  }
  Gt() {
    this.ss && this.vt.deleteBuffer(this.ss);
  }
}
class _ {
  constructor(t, e, i, s) {
    a(this, "vt");
    a(this, "ps");
    a(this, "gs");
    a(this, "_s");
    a(this, "vs", null);
    this.vt = t, this.ps = e, this.gs = i, this._s = s;
    const r = this.vt.createBuffer();
    if (!r) throw Error("Failed to create unit geometry buffer");
    this.vt.bindBuffer(this.vt.ARRAY_BUFFER, r), this.vt.bufferData(this.vt.ARRAY_BUFFER, this._s.As, this.vt.STATIC_DRAW), this.vt.bindBuffer(this.vt.ARRAY_BUFFER, null), this.vs = r;
  }
  get type() {
    return this.gs;
  }
  get unitGeometry() {
    return this._s;
  }
  get unitBuffer() {
    return this.vs;
  }
  get batch() {
    return this.ps;
  }
  $e() {
    this.ps.clear();
  }
  ye() {
    return !this.ps.isEmpty;
  }
  Gt() {
    this.ps.Gt(), this.vt.deleteBuffer(this.vs);
  }
  ws(t, e, i, s, r) {
    const n = this.Cs(t, e, i, s, r.N || 0, r.X || 0, r.W || 0);
    return { le: [t, e], Ee: [i, s], j: r.j || [0, 0, 0], Y: r.Y || [1, 1, 1, 1], q: r.q || [0, 0, 0, 1], L: r.L || [0, 0], We: [r.D ? 1 : 0, r.V ? 1 : 0, r.K ? 1 : 0], N: n.radiansX, X: n.radiansY, W: n.radiansZ, Ve: [n.centerX, n.centerY] };
  }
  bs(t, e) {
    const i = k(this.vt) || [0, 0, this.vt.canvas.width, this.vt.canvas.height];
    return { nx: t / i[2] * 2 - 1, ny: 1 - e / i[3] * 2 };
  }
  $s(t, e, i) {
    const s = this.bs(e, i);
    t.Ve = [s.nx, s.ny];
  }
  Cs(t, e, i, s, r, n, o) {
    const c = k(this.vt) || [0, 0, this.vt.canvas.width, this.vt.canvas.height], l = c[2], u = c[3];
    return { centerX: (t + i / 2) / l * 2 - 1, centerY: 1 - (e + s / 2) / u * 2, radiansX: -r * Math.PI / 180, radiansY: -n * Math.PI / 180, radiansZ: -o * Math.PI / 180, aspectRatio: l / u };
  }
}
const vt = { As: new Float32Array([0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 1]), be: 6, Ce: WebGL2RenderingContext.TRIANGLES, fe: 16, ue: { le: { size: 2, offset: 0 }, de: { size: 2, offset: 8 } } };
class At extends _ {
  constructor(t, e) {
    super(t, e, y.RECTANGLE, vt);
  }
  Fe(t, e) {
    const i = this.ws(t.x, t.y, t.width, t.height, e);
    return this.ps.Fe(i);
  }
}
const xt = { As: new Float32Array([0, -0.5, 0, 0, 1, -0.5, 1, 0, 0, 0.5, 0, 1, 0, 0.5, 0, 1, 1, -0.5, 1, 0, 1, 0.5, 1, 1]), be: 6, Ce: WebGL2RenderingContext.TRIANGLES, fe: 16, ue: { le: { size: 2, offset: 0 }, de: { size: 2, offset: 8 } } };
class Et extends _ {
  constructor(t, e) {
    super(t, e, y.LINE, xt);
  }
  Fe(t, e) {
    const i = t.x2 - t.x1, s = t.y2 - t.y1, r = Math.hypot(i, s), n = t.thickness || e.I || 1, o = t.x1 + i / 2, c = t.y1 + s / 2, l = o - r / 2, u = c, f = this.ws(l, u, r, n, e);
    return this.$s(f, o, c), this.ps.Fe(f);
  }
}
const yt = { As: function(h = 32) {
  const t = [], e = 2 * Math.PI / h;
  for (let i = 0; i < h; i++) {
    const s = i * e, r = (i + 1) % h * e, n = Math.cos(s), o = Math.sin(s), c = 0.5 * (n + 1), l = 0.5 * (o + 1), u = Math.cos(r), f = Math.sin(r), g = 0.5 * (u + 1), v = 0.5 * (f + 1);
    t.push(0, 0, 0.5, 0.5, n, o, c, l, u, f, g, v);
  }
  return new Float32Array(t);
}(32), be: 96, Ce: WebGL2RenderingContext.TRIANGLES, fe: 16, ue: { le: { size: 2, offset: 0 }, de: { size: 2, offset: 8 } } };
class wt extends _ {
  constructor(t, e) {
    super(t, e, y.ELLIPSE, yt);
  }
  Fe(t, e) {
    const i = this.ws(t.x, t.y, t.width, t.height, e);
    return this.$s(i, t.x, t.y), this.ps.Fe(i);
  }
}
let bt = { As: function(h) {
  const t = [];
  for (let e = 0; e < h; e++) {
    const i = e / h, s = (e + 1) / h;
    t.push(i, 0, i, 0, i, 1, i, 1, s, 1, s, 1);
  }
  return new Float32Array(t);
}(32), be: 96, Ce: WebGL2RenderingContext.TRIANGLES, fe: 16, ue: { le: { size: 2, offset: 0 }, de: { size: 2, offset: 8 } } };
class Rt extends _ {
  constructor(t, e) {
    super(t, e, y.ARC, bt);
  }
  Fe(t, e) {
    const i = t.x - t.width / 2, s = t.y - t.height / 2, r = t.start * Math.PI / 180, n = t.stop * Math.PI / 180, o = this.ws(i, s, t.width, t.height, e);
    return this.$s(o, t.x, t.y), o.Ke = [r, n], this.ps.Fe(o);
  }
}
const Tt = { As: new Float32Array([0, 0, 0, 0, 1, 0, 1, 0, 0.5, 1, 0.5, 1]), be: 3, Ce: WebGL2RenderingContext.TRIANGLES, fe: 16, ue: { le: { size: 2, offset: 0 }, de: { size: 2, offset: 8 } } };
class Ct extends _ {
  constructor(t, e) {
    super(t, e, y.TRIANGLE, Tt);
  }
  Fe(t, e) {
    const i = Math.min(t.x1, t.x2, t.x3), s = Math.max(t.x1, t.x2, t.x3), r = Math.min(t.y1, t.y2, t.y3), n = s - i, o = Math.max(t.y1, t.y2, t.y3) - r, c = this.ws(i, r, n, o, e), l = i + 0.5 * n, u = r + o * (1 / 3);
    return this.$s(c, l, u), this.ps.Fe(c);
  }
}
function et(h, t, e, i, s) {
  const r = 1 - h, n = r * r, o = h * h;
  return n * r * t + 3 * n * h * e + 3 * r * o * i + o * h * s;
}
const Ut = { As: function(h = 16) {
  const t = [];
  for (let e = 0; e < h; e++) {
    const i = e / h, s = (e + 1) / h;
    t.push(i, -0.5, i, 0), t.push(s, -0.5, s, 0), t.push(i, 0.5, i, 1), t.push(i, 0.5, i, 1), t.push(s, -0.5, s, 0), t.push(s, 0.5, s, 1);
  }
  return new Float32Array(t);
}(16), be: 96, Ce: WebGL2RenderingContext.TRIANGLES, fe: 16, ue: { le: { size: 2, offset: 0 }, de: { size: 2, offset: 8 } } };
class Ft extends _ {
  constructor(t, e) {
    super(t, e, y.BEZIER_CURVE, Ut);
  }
  Fe(t, e) {
    const i = e.I || 1, s = et(0.5, t.x1, t.cp1x, t.cp2x, t.x2), r = et(0.5, t.y1, t.cp1y, t.cp2y, t.y2), n = this.ws(0, 0, 1, i, e);
    return this.$s(n, s, r), n.qe = [t.x1, t.y1], n.je = [t.cp1x, t.cp1y], n.Ye = [t.cp2x, t.cp2y], n.Ze = [t.x2, t.y2], this.ps.Fe(n);
  }
}
class Bt {
  constructor(t) {
    a(this, "vt");
    a(this, "Ms", null);
    a(this, "Fs");
    a(this, "Rs", null);
    a(this, "zs", {});
    a(this, "Ps", null);
    a(this, "Ts", /* @__PURE__ */ new Map());
    a(this, "Ss");
    a(this, "Es");
    a(this, "Bs");
    a(this, "k", []);
    this.vt = t, this.Fs = new ft(t), this.Bs = new ht(), this.Ss = new gt(t, this), this.Es = new pt(), this.Ps = t.createBuffer(), H(this.vt, [0, 0, this.vt.canvas.width, this.vt.canvas.height]);
  }
  Gs(t) {
    let e = this.Ts.get(t);
    if (e) return e;
    const i = new mt(this.vt);
    return e = (0, { [y.RECTANGLE]: () => new At(this.vt, i), [y.LINE]: () => new Et(this.vt, i), [y.ELLIPSE]: () => new wt(this.vt, i), [y.ARC]: () => new Rt(this.vt, i), [y.TRIANGLE]: () => new Ct(this.vt, i), [y.BEZIER_CURVE]: () => new Ft(this.vt, i) }[t])(), this.Ts.set(t, e), e;
  }
  Ds(t) {
    this.Ms !== t && (this.Ms = t, t.Xt());
  }
  ae(t, e) {
    return this.Fs.ae(t, e);
  }
  ie() {
    return this.Fs.ie();
  }
  Tt() {
    return this.Fs.Tt();
  }
  re() {
    return this.Fs.re();
  }
  ne() {
    return this.Fs.ne();
  }
  Ls(t) {
    this.Rs = t, t && (this.zs = {});
  }
  Kt(t, e) {
    this.zs[t] = e;
  }
  Os(t) {
    Object.assign(this.zs, t);
  }
  oe(t) {
    return this.Fs.oe(t);
  }
  ks(t, e, i, s, r) {
    const n = this.ie(), o = { Ue: t.textures[0], Uf: t.textures[1], Ug: t.textures[2], Uh: t.textures[3], Ui: t.textures[4], Uj: [t.width, t.height] };
    this.Es.De(e, i, s, r, n, o, this.Bs);
  }
  Hs(t, e, i, s, r) {
    const n = this.ne(), o = t.Is(), c = { Uk: o.texture, Ul: !!o.invert, Um: !!o.flipX, Un: !!o.flipY, Uo: o.charRotation, Up: o.charColorFixed, Uq: o.charColor, Ur: o.cellColorFixed, Us: o.cellColor, Ut: o.backgroundColor, Uu: o.charCount, Uv: o.charList };
    this.Es.De(e, i, s, r, n, c, this.Bs);
  }
  Ns(t, e, i, s) {
    var d;
    const r = this.vt, n = r.canvas.width, o = r.canvas.height, c = t / n * 2 - 1, l = (t + i) / n * 2 - 1, u = 1 - e / o * 2, f = 1 - (e + s) / o * 2, g = new Float32Array([c, f, l, f, c, u, l, f, l, u, c, u]);
    r.bindBuffer(r.ARRAY_BUFFER, this.Ps), r.bufferData(r.ARRAY_BUFFER, g, r.DYNAMIC_DRAW);
    const v = ((d = this.Ms) == null ? void 0 : d.Qt) || r.getParameter(r.CURRENT_PROGRAM), m = v ? r.getAttribLocation(v, "a_position") : -1;
    m !== -1 && (r.enableVertexAttribArray(m), r.vertexAttribPointer(m, 2, r.FLOAT, !1, 8, 0)), r.drawArrays(r.TRIANGLES, 0, 6), m !== -1 && r.disableVertexAttribArray(m);
  }
  Xs(t, e, i, s) {
    this.Rs ? (this.Es.De(t, e, i, s, this.Rs, { ...this.zs }, this.Bs), this.Rs = null, this.zs = {}) : this.Es.Ge(t, e, i, s, this.Bs);
  }
  Ws(t, e, i, s) {
    this.Es.Le(t, e, i, s, this.Bs.lineWeight, this.Bs);
  }
  Vs(t, e, i, s) {
    this.Es.Oe(t, e, i, s, this.Bs);
  }
  Ks(t, e, i, s, r, n) {
    this.Es.He(t, e, i, s, r, n, this.Bs);
  }
  js(t, e, i, s, r, n, o, c) {
    const l = this.Bs.lineWeight;
    this.Es.Ie(t, e, i, s, r, n, o, c, l, this.Bs);
  }
  Ys(t, e, i = 1, s = {}) {
    return new q(this.vt, t, e, i, s, this, !0);
  }
  qs(t, e, i, s, r, n) {
    this.Es.ke(t, e, i, s, r, n, this.Bs);
  }
  Zs(t, e = t, i = t, s = 255) {
    this.state.ft(t, e, i, s), this.Ne(t / 255, e / 255, i / 255, s / 255);
  }
  Ne(t = 0, e = 0, i = 0, s = 0) {
    this.vt.clearColor(t, e, i, s), this.vt.clear(this.vt.COLOR_BUFFER_BIT);
  }
  Qs() {
    this.vt.viewport(0, 0, this.vt.canvas.width, this.vt.canvas.height), H(this.vt, [0, 0, this.vt.canvas.width, this.vt.canvas.height]);
  }
  get context() {
    return this.vt;
  }
  get state() {
    return this.Bs;
  }
  Et(t) {
    this.k.push(this.Bs), this.Bs = t;
  }
  Bt() {
    const t = this.k.pop();
    t && (this.Bs = t);
  }
  St(t) {
    const e = t, i = k(this.vt) ?? this.vt.getParameter(this.vt.VIEWPORT), s = { shader: e, gl: this.vt, viewport: i };
    this.Ds(e);
    const r = /* @__PURE__ */ new Set();
    for (const n of this.Es) n.type === y.CUSTOM ? r.add(y.RECTANGLE) : r.add(n.type);
    for (const n of r) n !== y.CUSTOM && this.Gs(n);
    this.Ss.ve(s, this.Es, this.Ts), this.Es.Ne();
  }
  Gt() {
    this.vt.deleteBuffer(this.Ps), this.Es.Ne();
    for (const t of this.Ts.values()) t.Gt();
    this.Fs.Gt(), this.Ss.Gt();
  }
}
const w = { readShort: (h, t) => (w.t.uint16[0] = h[t] << 8 | h[t + 1], w.t.int16[0]), readUshort: (h, t) => h[t] << 8 | h[t + 1], readUshorts(h, t, e) {
  const i = [];
  for (let s = 0; s < e; s++) i.push(w.readUshort(h, t + 2 * s));
  return i;
}, readUint(h, t) {
  const e = w.t.uint8;
  return e[3] = h[t], e[2] = h[t + 1], e[1] = h[t + 2], e[0] = h[t + 3], w.t.uint32[0];
}, readASCII(h, t, e) {
  let i = "";
  for (let s = 0; s < e; s++) i += String.fromCharCode(h[t + s]);
  return i;
}, writeUshort(h, t, e) {
  h[t] = e >>> 8 & 255, h[t + 1] = 255 & e;
}, writeUint(h, t, e) {
  h[t] = e >>> 24 & 255, h[t + 1] = e >>> 16 & 255, h[t + 2] = e >>> 8 & 255, h[t + 3] = 255 & e;
}, writeASCII(h, t, e) {
  for (let i = 0; i < e.length; i++) h[t + i] = 255 & e.charCodeAt(i);
}, t: (() => {
  const h = new ArrayBuffer(8);
  return { uint8: new Uint8Array(h), int16: new Int16Array(h), uint16: new Uint16Array(h), uint32: new Uint32Array(h) };
})() };
function X(h) {
  return h + 3 & -4;
}
function V(h, t, e) {
  const i = t + e;
  let s = 0;
  const r = w.t;
  for (let n = t; n < i; n += 4) r.uint8[3] = h[n] || 0, r.uint8[2] = h[n + 1] || 0, r.uint8[1] = h[n + 2] || 0, r.uint8[0] = h[n + 3] || 0, s = s + (r.uint32[0] >>> 0) >>> 0;
  return s >>> 0;
}
class Lt {
  constructor(t) {
    a(this, "b");
    a(this, "p", 0);
    a(this, "bitbuf", 0);
    a(this, "bitcnt", 0);
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
function N(h) {
  let t = 32, e = 0;
  for (const o of h) o && (o < t && (t = o), o > e && (e = o));
  if (e === 0) return { min: 0, max: 0, table: /* @__PURE__ */ new Map() };
  const i = new Uint32Array(e + 1);
  for (const o of h) o && i[o]++;
  const s = new Uint32Array(e + 1);
  let r = 0;
  i[0] = 0;
  for (let o = 1; o <= e; o++) r = r + i[o - 1] << 1, s[o] = r;
  const n = /* @__PURE__ */ new Map();
  for (let o = 0; o < h.length; o++) {
    const c = h[o];
    if (!c) continue;
    const l = s[c]++;
    let u = n.get(c);
    u || (u = [], n.set(c, u)), u[Pt(l, c)] = o;
  }
  return { min: t, max: e, table: n };
}
function j(h, t) {
  let e = 0;
  for (let i = 1; i <= t.max; i++) {
    e |= h.readBits(1) << i - 1;
    const s = t.table.get(i);
    if (s && e < s.length) {
      const r = s[e];
      if (r !== void 0) return r;
    }
  }
  throw Error("Invalid Huffman code");
}
function Pt(h, t) {
  let e = 0;
  for (let i = 0; i < t; i++) e = e << 1 | 1 & h, h >>>= 1;
  return e >>> 0;
}
function St(h) {
  if (h.length < 2) throw Error("ZLIB data too short");
  const t = h[0], e = h[1];
  if ((15 & t) != 8) throw Error("Unsupported ZLIB compression method");
  if (((t << 8) + e) % 31 != 0) throw Error("Bad ZLIB header check");
  let i = 2;
  32 & e && (i += 4);
  const s = [];
  return function(r, n) {
    const o = [3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258], c = [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0], l = [1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577], u = [0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13];
    let f = 0;
    for (; !f; ) {
      f = r.readBits(1);
      const g = r.readBits(2);
      if (g === 0) {
        r.alignToByte();
        const v = r.readBits(16);
        if ((65535 & (65535 ^ v)) !== r.readBits(16)) throw Error("DEFLATE uncompressed LEN/NLEN mismatch");
        for (let m = 0; m < v; m++) n.push(r.readBits(8));
      } else {
        if (g !== 1 && g !== 2) throw Error("Unsupported DEFLATE type");
        {
          let v, m;
          if (g === 1) {
            const d = Array(288).fill(0);
            for (let A = 0; A <= 143; A++) d[A] = 8;
            for (let A = 144; A <= 255; A++) d[A] = 9;
            for (let A = 256; A <= 279; A++) d[A] = 7;
            for (let A = 280; A <= 287; A++) d[A] = 8;
            v = N(d), m = N(Array(32).fill(5));
          } else {
            const d = r.readBits(5) + 257, A = r.readBits(5) + 1, p = r.readBits(4) + 4, E = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15], x = Array(19).fill(0);
            for (let F = 0; F < p; F++) x[E[F]] = r.readBits(3);
            const C = N(x), b = [];
            for (; b.length < d + A; ) {
              const F = j(r, C);
              if (F <= 15) b.push(F);
              else if (F === 16) {
                const O = r.readBits(2) + 3, S = b[b.length - 1] || 0;
                for (let tt = 0; tt < O; tt++) b.push(S);
              } else if (F === 17) {
                const O = r.readBits(3) + 3;
                for (let S = 0; S < O; S++) b.push(0);
              } else {
                if (F !== 18) throw Error("Invalid code length symbol");
                {
                  const O = r.readBits(7) + 11;
                  for (let S = 0; S < O; S++) b.push(0);
                }
              }
            }
            const R = b.slice(0, d), B = b.slice(d, d + A);
            v = N(R), m = N(B);
          }
          for (; ; ) {
            const d = j(r, v);
            if (d < 256) n.push(d);
            else {
              if (d === 256) break;
              if (d > 256 && d < 286) {
                const A = d - 257;
                let p = o[A];
                const E = c[A];
                E && (p += r.readBits(E));
                const x = j(r, m);
                if (x >= 30) throw Error("Invalid distance symbol");
                let C = l[x];
                const b = u[x];
                b && (C += r.readBits(b));
                const R = n.length - C;
                if (R < 0) throw Error("Invalid distance");
                for (let B = 0; B < p; B++) n.push(n[R + B] || 0);
              } else if (d === 286 || d === 287) throw Error("Reserved length symbol");
            }
          }
        }
      }
    }
  }(new Lt(h.subarray(i)), s), new Uint8Array(s);
}
function Dt(h) {
  const t = w, e = new Uint8Array(h);
  if (t.readASCII(e, 0, 4) !== "wOFF") throw Error("Invalid WOFF signature");
  const i = t.readUint(e, 4), s = t.readUshort(e, 12), r = t.readUint(e, 16), n = [];
  let o = 44;
  for (let p = 0; p < s; p++) {
    const E = t.readASCII(e, o, 4), x = t.readUint(e, o + 4), C = t.readUint(e, o + 8), b = t.readUint(e, o + 12), R = t.readUint(e, o + 16);
    n.push({ tag: E, offset: x, compLength: C, origLength: b, checksum: R }), o += 20;
  }
  for (const p of n) {
    const E = new Uint8Array(e.buffer, p.offset, p.compLength);
    if (p.compLength === p.origLength) p.data = new Uint8Array(E);
    else if (p.data = St(E), p.data.length !== p.origLength) if (p.data.length < p.origLength) {
      const x = new Uint8Array(p.origLength);
      x.set(p.data), p.data = x;
    } else p.data = p.data.subarray(0, p.origLength);
  }
  const c = s;
  let l = 1, u = 0;
  for (; l << 1 <= c; ) l <<= 1, u++;
  const f = 16 * l, g = 16 * c - f;
  let v = 12 + 16 * c;
  const m = {};
  for (const p of n) m[p.tag] = v, v = X(v + p.data.length);
  const d = new Uint8Array(Math.max(r || 0, v));
  t.writeUint(d, 0, i), t.writeUshort(d, 4, c), t.writeUshort(d, 6, f), t.writeUshort(d, 8, u), t.writeUshort(d, 10, g);
  let A = 12;
  for (const p of n) {
    t.writeASCII(d, A, p.tag), A += 4;
    let E = p.data;
    if (p.tag === "head" && E.length >= 12) {
      const x = new Uint8Array(E);
      t.writeUint(x, 8, 0);
      const C = V(x, 0, X(x.length));
      t.writeUint(d, A, C), A += 4;
    } else {
      const x = V(E, 0, X(E.length));
      t.writeUint(d, A, x), A += 4;
    }
    t.writeUint(d, A, m[p.tag]), A += 4, t.writeUint(d, A, p.data.length), A += 4;
  }
  for (const p of n) {
    const E = m[p.tag];
    d.set(p.data, E);
  }
  if (n.find((p) => p.tag === "head")) {
    const p = m.head, E = function(x, C) {
      const b = w, R = C + 8, B = [x[R], x[R + 1], x[R + 2], x[R + 3]];
      b.writeUint(x, R, 0);
      const F = 2981146554 - (V(x, 0, X(x.length)) >>> 0) >>> 0;
      return x[R] = B[0], x[R + 1] = B[1], x[R + 2] = B[2], x[R + 3] = B[3], F >>> 0;
    }(d, p);
    t.writeUint(d, p + 8, E);
  }
  return d.buffer;
}
const Mt = { parseTab(h, t, e) {
  const i = { tables: [], ids: {}, off: t };
  h = new Uint8Array(h.buffer, t, e), t = 0;
  const s = w, r = s.readUshort, n = r(h, t += 2);
  t += 2;
  const o = [];
  for (let c = 0; c < n; c++) {
    const l = r(h, t), u = r(h, t += 2);
    t += 2;
    const f = s.readUint(h, t);
    t += 4;
    const g = `p${l}e${u}`;
    let v = o.indexOf(f);
    if (v === -1) {
      let m;
      v = i.tables.length, o.push(f);
      const d = r(h, f);
      m = d === 4 ? this.parse4(h, f) : d === 12 ? this.parse12(h, f) : { format: d }, i.tables.push(m);
    }
    i.ids[g] = v;
  }
  return i;
}, parse4(h, t) {
  const e = w, i = e.readUshort, s = e.readUshorts, r = t, n = i(h, t += 2);
  t += 2;
  const o = i(h, t += 2) >>> 1, c = { format: 4, searchRange: i(h, t += 2), entrySelector: 0, rangeShift: 0, endCount: [], startCount: [], idDelta: [], idRangeOffset: [], glyphIdArray: [] };
  t += 2, c.entrySelector = i(h, t), t += 2, c.rangeShift = i(h, t), t += 2, c.endCount = s(h, t, o), t += 2 * o, t += 2, c.startCount = s(h, t, o), t += 2 * o;
  for (let l = 0; l < o; l++) c.idDelta.push(e.readShort(h, t)), t += 2;
  return c.idRangeOffset = s(h, t, o), t += 2 * o, c.glyphIdArray = s(h, t, r + n - t >> 1), c;
}, parse12(h, t) {
  const e = w.readUint;
  e(h, t += 4), e(h, t += 4);
  const i = e(h, t += 4);
  t += 4;
  const s = new Uint32Array(3 * i);
  for (let r = 0; r < 3 * i; r += 3) s[r] = e(h, t + (r << 2)), s[r + 1] = e(h, t + (r << 2) + 4), s[r + 2] = e(h, t + (r << 2) + 8);
  return { format: 12, groups: s };
} }, It = { parseTab(h, t, e) {
  const i = w;
  t += 18;
  const s = i.readUshort(h, t);
  t += 2, t += 16;
  const r = i.readShort(h, t);
  t += 2;
  const n = i.readShort(h, t);
  t += 2;
  const o = i.readShort(h, t);
  t += 2;
  const c = i.readShort(h, t);
  return t += 2, t += 6, { unitsPerEm: s, xMin: r, yMin: n, xMax: o, yMax: c, indexToLocFormat: i.readShort(h, t) };
} }, _t = { parseTab(h, t, e) {
  const i = w;
  t += 4;
  const s = ["ascender", "descender", "lineGap", "advanceWidthMax", "minLeftSideBearing", "minRightSideBearing", "xMaxExtent", "caretSlopeRise", "caretSlopeRun", "caretOffset", "res0", "res1", "res2", "res3", "metricDataFormat", "numberOfHMetrics"], r = {};
  for (let n = 0; n < s.length; n++) {
    const o = s[n], c = o === "advanceWidthMax" || o === "numberOfHMetrics" ? i.readUshort : i.readShort;
    r[o] = c(h, t + 2 * n);
  }
  return r;
} }, Ot = { parseTab(h, t, e, i) {
  const s = w, r = [], n = [], o = i.maxp.numGlyphs, c = i.hhea.numberOfHMetrics;
  let l = 0, u = 0, f = 0;
  for (; f < c; ) l = s.readUshort(h, t + (f << 2)), u = s.readShort(h, t + (f << 2) + 2), r.push(l), n.push(u), f++;
  for (; f < o; ) r.push(l), n.push(u), f++;
  return { aWidth: r, lsBearing: n };
} }, it = { cmap: Mt, head: It, hhea: _t, maxp: { parseTab(h, t, e) {
  const i = w;
  return i.readUint(h, t), t += 4, { numGlyphs: i.readUshort(h, t) };
} }, hmtx: Ot, loca: { parseTab(h, t, e, i) {
  const s = w, r = [], n = i.head.indexToLocFormat, o = i.maxp.numGlyphs + 1;
  if (n === 0) for (let c = 0; c < o; c++) r.push(s.readUshort(h, t + (c << 1)) << 1);
  else if (n === 1) for (let c = 0; c < o; c++) r.push(s.readUint(h, t + (c << 2)));
  return r;
} }, glyf: { parseTab(h, t, e, i) {
  const s = [], r = i.maxp.numGlyphs;
  for (let n = 0; n < r; n++) s.push(null);
  return s;
}, Js(h, t) {
  const e = w, i = h.ti, s = h.loca;
  if (s[t] === s[t + 1]) return null;
  const r = L.findTable(i, "glyf", h.ei);
  if (!r) return null;
  let n = r[0] + s[t];
  const o = {};
  if (o.noc = e.readShort(i, n), n += 2, o.xMin = e.readShort(i, n), n += 2, o.yMin = e.readShort(i, n), n += 2, o.xMax = e.readShort(i, n), n += 2, o.yMax = e.readShort(i, n), n += 2, o.xMin >= o.xMax || o.yMin >= o.yMax) return null;
  if (o.noc > 0) {
    o.endPts = [];
    for (let g = 0; g < o.noc; g++) o.endPts.push(e.readUshort(i, n)), n += 2;
    const c = e.readUshort(i, n);
    if (n += 2, i.length - n < c) return null;
    n += c;
    const l = o.endPts[o.noc - 1] + 1;
    o.flags = [];
    for (let g = 0; g < l; g++) {
      const v = i[n];
      if (n++, o.flags.push(v), 8 & v) {
        const m = i[n];
        n++;
        for (let d = 0; d < m; d++) o.flags.push(v), g++;
      }
    }
    o.xs = [];
    for (let g = 0; g < l; g++) {
      const v = o.flags[g], m = !!(16 & v);
      2 & v ? (o.xs.push(m ? i[n] : -i[n]), n++) : m ? o.xs.push(0) : (o.xs.push(e.readShort(i, n)), n += 2);
    }
    o.ys = [];
    for (let g = 0; g < l; g++) {
      const v = o.flags[g], m = !!(32 & v);
      4 & v ? (o.ys.push(m ? i[n] : -i[n]), n++) : m ? o.ys.push(0) : (o.ys.push(e.readShort(i, n)), n += 2);
    }
    let u = 0, f = 0;
    for (let g = 0; g < l; g++) u += o.xs[g], f += o.ys[g], o.xs[g] = u, o.ys[g] = f;
  } else o.parts = [], o.endPts = [], o.flags = [], o.xs = [], o.ys = [];
  return o;
} } }, L = { parse(h) {
  const t = new Uint8Array(h), e = w.readASCII(t, 0, 4);
  if (e === "wOFF") h = Dt(h);
  else if (e === "wOF2") throw Error("WOFF2 is not supported in this build (Brotli + WOFF2 transforms required)");
  return [((i, s, r, n) => {
    const o = it, c = { ti: i, si: s, ei: r };
    for (const l in o) {
      const u = l, f = L.findTable(i, u, r);
      if (f) {
        const [g, v] = f;
        let m = n[g];
        m == null && (m = o[u].parseTab(i, g, v, c), n[g] = m), c[u] = m;
      }
    }
    return c;
  })(new Uint8Array(h), 0, 0, {})];
}, findTable(h, t, e) {
  const i = w, s = i.readUshort(h, e + 4);
  let r = e + 12;
  for (let n = 0; n < s; n++) {
    const o = i.readASCII(h, r, 4);
    i.readUint(h, r + 4);
    const c = i.readUint(h, r + 8), l = i.readUint(h, r + 12);
    if (o === t) return [c, l];
    r += 16;
  }
  return null;
}, T: it, B: w };
class Nt {
  ii(t) {
    var i;
    const e = [];
    return (i = t.cmap) != null && i.tables ? (t.cmap.tables.forEach((s) => {
      if (s.format === 4) {
        const r = this.ri(s);
        e.push(...r);
      } else if (s.format === 12) {
        const r = this.ni(s);
        e.push(...r);
      }
    }), [...new Set(e)]) : [];
  }
  oi(t) {
    return t.filter((e) => this.ai(e));
  }
  ri(t) {
    const e = [];
    if (!(t.startCount && t.endCount && t.idRangeOffset && t.idDelta)) return e;
    for (let i = 0; i < t.startCount.length; i++) {
      const s = t.startCount[i], r = t.endCount[i];
      if (s !== 65535 || r !== 65535) {
        for (let n = s; n <= r; n++)
          if (this.hi(t, n, i) > 0) try {
            const o = String.fromCodePoint(n);
            e.push(o);
          } catch {
          }
      }
    }
    return e;
  }
  ni(t) {
    const e = [];
    if (!t.groups) return e;
    for (let i = 0; i < t.groups.length; i += 3) {
      const s = t.groups[i], r = t.groups[i + 1], n = t.groups[i + 2];
      for (let o = s; o <= r; o++)
        if (n + (o - s) > 0) try {
          const c = String.fromCodePoint(o);
          e.push(c);
        } catch {
        }
    }
    return e;
  }
  hi(t, e, i) {
    if (t.idRangeOffset[i] === 0) return e + t.idDelta[i] & 65535;
    {
      const s = t.idRangeOffset[i] / 2 + (e - t.startCount[i]) - (t.startCount.length - i);
      if (s >= 0 && t.glyphIdArray && s < t.glyphIdArray.length) {
        const r = t.glyphIdArray[s];
        if (r !== 0) return r + t.idDelta[i] & 65535;
      }
    }
    return 0;
  }
  ai(t) {
    const e = t.codePointAt(0) || 0;
    return !(e >= 0 && e <= 31 && e !== 9 && e !== 10 && e !== 13 || e >= 127 && e <= 159);
  }
}
class Z {
  constructor() {
    a(this, "ci", /* @__PURE__ */ new Map());
    a(this, "li", /* @__PURE__ */ new Map());
  }
  ui(t, e) {
    const i = `${this.fi(t)}_${e}`;
    if (this.ci.has(i)) return this.ci.get(i);
    const s = t.cmap;
    if (!s || !s.tables) return this.ci.set(i, 0), 0;
    let r = 0;
    for (const n of s.tables) if (n.format === 4 ? r = this.di(e, n) : n.format === 12 && (r = this.pi(e, n)), r > 0) break;
    return this.ci.set(i, r), r;
  }
  mi(t, e) {
    const i = e.codePointAt(0);
    return i === void 0 ? 0 : this.ui(t, i);
  }
  gi(t, e) {
    const i = t.hmtx;
    return i && i.aWidth && i.aWidth.length !== 0 ? e < i.aWidth.length ? i.aWidth[e] : i.aWidth[i.aWidth.length - 1] : 0;
  }
  _i(t, e) {
    const i = e / t.head.unitsPerEm, s = t.hhea.ascender * i, r = t.hhea.descender * i, n = t.hhea.lineGap * i;
    return { ascender: s, descender: r, lineGap: n, lineHeight: s - r + n, unitsPerEm: t.head.unitsPerEm, scale: i };
  }
  yi() {
    this.ci.clear(), this.li.clear();
  }
  fi(t) {
    return `${t.ei}_${t.ti.length}`;
  }
  di(t, e) {
    const i = e.endCount.length;
    let s = -1;
    for (let r = 0; r < i; r++) if (t <= e.endCount[r]) {
      s = r;
      break;
    }
    if (s === -1 || t < e.startCount[s]) return 0;
    if (e.idRangeOffset[s] === 0) return t + e.idDelta[s] & 65535;
    {
      const r = e.idRangeOffset[s] / 2 + (t - e.startCount[s]) - (i - s);
      if (r >= 0 && r < e.glyphIdArray.length) {
        const n = e.glyphIdArray[r];
        return n === 0 ? 0 : n + e.idDelta[s] & 65535;
      }
    }
    return 0;
  }
  pi(t, e) {
    const i = e.groups.length / 3;
    for (let s = 0; s < i; s++) {
      const r = e.groups[3 * s], n = e.groups[3 * s + 1], o = e.groups[3 * s + 2];
      if (t >= r && t <= n) return o + (t - r);
    }
    return 0;
  }
}
class Gt {
  constructor(t) {
    a(this, "Ai");
    a(this, "wi");
    a(this, "xt");
    a(this, "Ci");
    this.xt = t, this.Ci = new Z(), this.Ai = document.createElement("canvas"), this.wi = this.Ai.getContext("2d", { willReadFrequently: !0, alpha: !1 });
  }
  createTextureAtlas(t, e, i, s) {
    const r = t.length, n = Math.ceil(Math.sqrt(r)), o = Math.ceil(r / n), c = e.width * n, l = e.height * o, u = typeof s == "object" ? s : null;
    this.bi(c, l), this.xi(t, e, n, i, u);
    const f = this.xt.Ys(c, l, 1, { filter: "nearest" });
    return f.zt(this.Ai), { framebuffer: f, columns: n, rows: o };
  }
  bi(t, e) {
    this.Ai.width = t, this.Ai.height = e, this.Ai.style.width = t + "px", this.Ai.style.height = t + "px", this.wi.imageSmoothingEnabled = !1, this.Ai.style.imageRendering = "pixelated", this.wi.fillStyle = "black", this.wi.fillRect(0, 0, t, e), this.wi.textBaseline = "top", this.wi.textAlign = "left", this.wi.fillStyle = "white";
  }
  xi(t, e, i, s, r) {
    const n = s / r.head.unitsPerEm;
    for (let o = 0; o < t.length; o++) {
      const c = o % i, l = Math.floor(o / i), u = t[o].character, f = this.$i(r, u);
      if (!f) continue;
      const g = u.codePointAt(0) || 0, v = this.Ci.ui(r, g), m = this.Mi(r, v) * n, d = c * e.width, A = l * e.height, p = d + 0.5 * e.width, E = A + 0.5 * e.height, x = Math.round(p - 0.5 * e.width), C = Math.round(E - 0.5 * s), b = x + 0.5 * (e.width - m), R = C + r.hhea.ascender * n;
      this.Fi(f, b, R, n);
    }
  }
  $i(t, e) {
    const i = e.codePointAt(0) || 0, s = this.Ci.ui(t, i);
    if (s === 0) return null;
    if (t.glyf && t.glyf[s] !== null) return t.glyf[s];
    if (L && L.T && L.T.glyf) {
      const r = L.T.glyf.Js(t, s);
      return t.glyf && r && (t.glyf[s] = r), r;
    }
    return null;
  }
  Mi(t, e) {
    const i = t.hmtx;
    return i && i.aWidth ? e < i.aWidth.length ? i.aWidth[e] : i.aWidth[i.aWidth.length - 1] : 0;
  }
  Fi(t, e, i, s) {
    if (!t || !t.xs || t.noc === 0) return;
    const { xs: r, ys: n, endPts: o, flags: c } = t;
    if (!(r && n && o && c)) return;
    this.wi.beginPath();
    let l = 0;
    for (let u = 0; u < o.length; u++) {
      const f = o[u];
      if (!(f < l)) {
        if (f >= l) {
          const g = e + r[l] * s, v = i - n[l] * s;
          this.wi.moveTo(g, v);
          let m = l + 1;
          for (; m <= f; )
            if (1 & c[m]) {
              const d = e + r[m] * s, A = i - n[m] * s;
              this.wi.lineTo(d, A), m++;
            } else {
              const d = e + r[m] * s, A = i - n[m] * s;
              let p = m + 1 > f ? l : m + 1;
              if (1 & c[p]) {
                const E = e + r[p] * s, x = i - n[p] * s;
                this.wi.quadraticCurveTo(d, A, E, x), m = p + 1;
              } else {
                const E = (d + (e + r[p] * s)) / 2, x = (A + (i - n[p] * s)) / 2;
                this.wi.quadraticCurveTo(d, A, E, x), m = p;
              }
            }
          this.wi.closePath();
        }
        l = f + 1;
      }
    }
    this.wi.fill();
  }
}
class zt {
  constructor() {
    a(this, "Ri");
    this.Ri = new Z();
  }
  zi(t, e, i) {
    let s = 0;
    const r = this.Ri._i(i, e), n = r.lineHeight;
    for (const o of t) {
      const c = this.Ri.mi(i, o);
      if (c === 0) continue;
      const l = this.Ri.gi(i, c) * r.scale;
      s = Math.max(s, l);
    }
    return { width: Math.ceil(s), height: Math.ceil(n) };
  }
  yi() {
    this.Ri.yi();
  }
}
class Wt {
  constructor() {
    a(this, "Ci");
    this.Ci = new Z();
  }
  createCharacterObjects(t, e) {
    return t.map((i, s) => {
      const r = i.codePointAt(0) || 0, n = this.Pi(s);
      let o = 0;
      if (e.hmtx && e.hmtx.aWidth) {
        const c = this.Ci.ui(e, r);
        c > 0 && e.hmtx.aWidth[c] !== void 0 && (o = e.hmtx.aWidth[c]);
      }
      return { character: i, unicode: r, color: n, advanceWidth: o };
    });
  }
  Pi(t) {
    return [t % 256 / 255, Math.floor(t / 256) % 256 / 255, Math.floor(t / 65536) % 256 / 255];
  }
  Ti(t, e) {
    if (!G.v(typeof t == "string", "Character must be a string.", { method: "getCharacterColor", providedValue: t })) return [0, 0, 0];
    const i = e.find((s) => s.character === t);
    return i ? i.color : [0, 0, 0];
  }
  Si(t, e) {
    return G.v(typeof t == "string" && t.length > 0, "Characters must be a string with at least one character.", { method: "getCharacterColors", providedValue: t }) ? Array.from(t).map((i) => this.Ti(i, e) || [0, 0, 0]) : [[0, 0, 0]];
  }
}
class Xt {
  constructor(t, e = 16) {
    a(this, "Ei");
    a(this, "Bi", []);
    a(this, "Gi");
    a(this, "Di", 16);
    a(this, "Li", 0);
    a(this, "Oi", 0);
    a(this, "ki", { width: 0, height: 0 });
    a(this, "Hi");
    a(this, "Ii");
    a(this, "Ni");
    a(this, "Xi");
    a(this, "Wi");
    this.Di = e, this.Ii = new Nt(), this.Ni = new Gt(t), this.Xi = new zt(), this.Wi = new Wt();
  }
  async Vi(t) {
    let e;
    if (t) {
      const i = await fetch(t);
      if (!i.ok) throw new U(`Failed to load font file: ${i.status} ${i.statusText}`);
      e = await i.arrayBuffer();
    } else
      e = await (await fetch("data:font/woff;base64,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")).arrayBuffer();
    await this.Ki(e), this.Ei = L.parse(e)[0], await this.ji();
  }
  Yi(t) {
    if (t === void 0) return this.Di;
    this.Di = t, this.ki = this.Xi.zi(this.Bi.map((i) => i.character), this.Di, this.Ei);
    const e = this.Ni.createTextureAtlas(this.Bi, this.ki, this.Di, this.Ei);
    this.Gi = e.framebuffer, this.Li = e.columns, this.Oi = e.rows;
  }
  async qi(t) {
    try {
      const e = await fetch(t);
      if (!e.ok) throw new U(`Failed to load font file: ${e.status} ${e.statusText}`);
      const i = await e.arrayBuffer();
      await this.Ki(i);
      const s = L.parse(i);
      if (!s || s.length === 0) throw Error("Failed to parse font file");
      this.Ei = s[0], await this.ji();
    } catch (e) {
      throw new U("Failed to load font: " + (e instanceof Error ? e.message : "Unknown error"), e);
    }
  }
  async Ki(t) {
    const e = Date.now();
    this.Hi = new FontFace("CustomFont_" + e, t), await this.Hi.load(), document.fonts.add(this.Hi);
  }
  async ji() {
    const t = this.Ii.ii(this.Ei), e = this.Ii.oi(t);
    this.Bi = this.Wi.createCharacterObjects(e, this.Ei), this.ki = this.Xi.zi(e, this.Di, this.Ei);
    const i = this.Ni.createTextureAtlas(this.Bi, this.ki, this.Di, this.Ei);
    this.Gi = i.framebuffer, this.Li = i.columns, this.Oi = i.rows;
  }
  Ti(t) {
    return this.Wi.Ti(t, this.Bi);
  }
  Si(t) {
    return this.Wi.Si(t, this.Bi);
  }
  Gt() {
    this.Gi.Gt(), document.fonts.delete(this.Hi);
  }
  get fontFramebuffer() {
    return this.Gi;
  }
  get characters() {
    return this.Bi;
  }
  get textureColumns() {
    return this.Li;
  }
  get textureRows() {
    return this.Oi;
  }
  get maxGlyphDimensions() {
    return this.ki;
  }
  get fontSize() {
    return this.Di;
  }
  get font() {
    return this.Ei;
  }
}
class Ht {
  constructor(t, e, i) {
    a(this, "Zi");
    a(this, "Qi");
    a(this, "dt");
    a(this, "gt");
    a(this, "Ji");
    a(this, "tr");
    a(this, "er");
    a(this, "sr");
    a(this, "ir");
    this.er = t, this.sr = e, this.ir = i, this.rr();
  }
  rr() {
    this.Zi = Math.floor(this.er.width / this.sr), this.Qi = Math.floor(this.er.height / this.ir), this.dt = this.Zi * this.sr, this.gt = this.Qi * this.ir, this.Ji = Math.floor((this.er.width - this.dt) / 2), this.tr = Math.floor((this.er.height - this.gt) / 2);
  }
  nr(t, e) {
    this.sr = t, this.ir = e, this.rr();
  }
  get cellWidth() {
    return this.sr;
  }
  get cellHeight() {
    return this.ir;
  }
  get cols() {
    return this.Zi;
  }
  get rows() {
    return this.Qi;
  }
  get width() {
    return this.dt;
  }
  get height() {
    return this.gt;
  }
  get offsetX() {
    return this.Ji;
  }
  get offsetY() {
    return this.tr;
  }
}
class kt {
  constructor(t = {}) {
    a(this, "er");
    a(this, "ar", null);
    a(this, "hr", !1);
    a(this, "cr");
    a(this, "lr");
    this.hr = t.overlay ?? !1, this.hr && t.canvas ? (this.ar = t.canvas, this.er = this.ur(), this.lr = !0, this.dr()) : t.canvas ? (this.er = t.canvas, this.lr = !1) : (this.er = this.pr(t.width, t.height), this.lr = !0), this.er.style.imageRendering = "pixelated";
  }
  pr(t, e) {
    const i = document.createElement("canvas");
    return i.className = "textmodeCanvas", i.style.imageRendering = "pixelated", i.width = t || 800, i.height = e || 600, document.body.appendChild(i), i;
  }
  ur() {
    const t = document.createElement("canvas");
    t.className = "textmodeCanvas", t.style.imageRendering = "pixelated";
    const e = this.ar.getBoundingClientRect();
    let i = Math.round(e.width), s = Math.round(e.height);
    if (this.ar instanceof HTMLVideoElement) {
      const o = this.ar;
      (i === 0 || s === 0) && o.videoWidth > 0 && o.videoHeight > 0 && (i = o.videoWidth, s = o.videoHeight);
    }
    t.width = i, t.height = s, t.style.position = "absolute", t.style.pointerEvents = "none";
    const r = window.getComputedStyle(this.ar);
    let n = parseInt(r.zIndex || "0", 10);
    return isNaN(n) && (n = 0), t.style.zIndex = "" + (n + 1), t;
  }
  dr() {
    var t;
    this.mr(), (t = this.ar.parentNode) == null || t.insertBefore(this.er, this.ar.nextSibling), window.ResizeObserver && (this.cr = new ResizeObserver(() => {
      this.gr();
    }), this.cr.observe(this.ar)), window.addEventListener("resize", () => {
      this.gr();
    });
  }
  mr() {
    if (!this.ar) return;
    const t = this.ar.getBoundingClientRect();
    let e = this.ar.offsetParent;
    if (e && e !== document.body) {
      const i = e.getBoundingClientRect();
      this.er.style.top = t.top - i.top + "px", this.er.style.left = t.left - i.left + "px";
    } else this.er.style.top = t.top + window.scrollY + "px", this.er.style.left = t.left + window.scrollX + "px";
  }
  gr(t, e) {
    if (this.hr) {
      const i = this.ar.getBoundingClientRect();
      let s = Math.round(i.width), r = Math.round(i.height);
      if (this.ar instanceof HTMLVideoElement) {
        const n = this.ar;
        (s === 0 || r === 0) && n.videoWidth > 0 && n.videoHeight > 0 && (s = n.videoWidth, r = n.videoHeight);
      }
      this.er.width = s, this.er.height = r, this.mr();
    } else this.er.width = t ?? this.er.width, this.er.height = e ?? this.er.height;
  }
  _r() {
    const t = this.er.getContext("webgl2", { alpha: !0, premultipliedAlpha: !1, preserveDrawingBuffer: !0, antialias: !1, depth: !1, stencil: !1, powerPreference: "high-performance" });
    if (!t) throw new U("`textmode.js` requires WebGL2 support.");
    return t;
  }
  Gt() {
    this.cr && this.cr.disconnect();
    const t = this.er.getContext("webgl") || this.er.getContext("webgl2");
    if (t) {
      const e = t.getExtension("WEBGL_lose_context");
      e && e.loseContext();
    }
    this.lr && this.er.parentNode && this.er.parentNode.removeChild(this.er);
  }
  get canvas() {
    return this.er;
  }
  get targetCanvas() {
    return this.ar;
  }
  get width() {
    return this.er.width;
  }
  get height() {
    return this.er.height;
  }
}
class z {
  constructor(t, e, i, s) {
    a(this, "vr");
    a(this, "dt");
    a(this, "gt");
    a(this, "vt");
    a(this, "D", 0);
    a(this, "V", 0);
    a(this, "K", 0);
    a(this, "L", [0, 0]);
    a(this, "yr", "sampled");
    a(this, "Ar", "fixed");
    a(this, "Y", [1, 1, 1]);
    a(this, "q", [0, 0, 0]);
    a(this, "wr", [0, 0, 0, 1]);
    a(this, "Cr", [[0.1, 0, 0]]);
    a(this, "br");
    this.vt = t, this.vr = e, this.dt = i, this.gt = s;
  }
  Gt() {
    this.vt.deleteTexture(this.vr);
  }
  $r(t) {
    return typeof t == "boolean" ? t ? 1 : 0 : (t == null ? 0 : Number(t)) > 0 ? 1 : 0;
  }
  invert(t = !0) {
    return this.D = this.$r(t), this;
  }
  flipX(t = !0) {
    return this.V = this.$r(t), this;
  }
  flipY(t = !0) {
    return this.K = this.$r(t), this;
  }
  charRotation(t) {
    const e = 255 * t / 360, i = Math.floor(e) / 255, s = Math.round(e - Math.floor(e));
    return this.L = [i, s], this;
  }
  Is() {
    return { texture: this.vr, invert: this.D, flipX: this.V, flipY: this.K, charRotation: this.L, charColorFixed: this.yr === "fixed", charColor: this.Y, cellColorFixed: this.Ar === "fixed", cellColor: this.q, backgroundColor: this.wr, charCount: this.Cr.length, charList: this.Cr };
  }
  charColorMode(t) {
    return this.yr = t, this;
  }
  cellColorMode(t) {
    return this.Ar = t, this;
  }
  charColor(t, e, i) {
    return this.Y = [(t ?? 0) / 255, (e ?? t ?? 0) / 255, (i ?? t ?? 0) / 255], this;
  }
  cellColor(t, e, i) {
    return this.q = [(t ?? 0) / 255, (e ?? t ?? 0) / 255, (i ?? t ?? 0) / 255], this;
  }
  background(t, e, i, s) {
    return this.wr = [(t ?? 0) / 255, (e ?? t ?? 0) / 255, (i ?? t ?? 0) / 255, (s ?? 255) / 255], this;
  }
  characters(t) {
    const e = this.br(t).filter((i) => Array.isArray(i)).slice(0, 64);
    return this.Cr = e, this;
  }
  static Mr(t, e, i) {
    const s = t.context, r = s.createTexture();
    s.bindTexture(s.TEXTURE_2D, r), s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL, 1), s.texParameteri(s.TEXTURE_2D, s.TEXTURE_MIN_FILTER, s.NEAREST), s.texParameteri(s.TEXTURE_2D, s.TEXTURE_MAG_FILTER, s.NEAREST), s.texParameteri(s.TEXTURE_2D, s.TEXTURE_WRAP_S, s.CLAMP_TO_EDGE), s.texParameteri(s.TEXTURE_2D, s.TEXTURE_WRAP_T, s.CLAMP_TO_EDGE), s.texImage2D(s.TEXTURE_2D, 0, s.RGBA, s.RGBA, s.UNSIGNED_BYTE, e), s.bindTexture(s.TEXTURE_2D, null);
    const n = e.naturalWidth ?? e.width ?? e.videoWidth ?? 0, o = e.naturalHeight ?? e.height ?? e.videoHeight ?? 0, c = new z(s, r, n, o);
    return c.br = i, c;
  }
  get texture() {
    return this.vr;
  }
  get width() {
    return this.dt;
  }
  get height() {
    return this.gt;
  }
}
class Yt {
  constructor(t = 60) {
    a(this, "Fr");
    a(this, "Rr");
    a(this, "zr", null);
    a(this, "Pr", 0);
    a(this, "Tr", !0);
    a(this, "Sr", 0);
    a(this, "Er", 0);
    a(this, "Br", []);
    a(this, "Gr", 10);
    a(this, "Dr", 0);
    this.Fr = t, this.Rr = 1e3 / t;
  }
  start(t) {
    if (!this.Tr) return;
    this.Pr = performance.now();
    const e = (i) => {
      if (!this.Tr) return void (this.zr = null);
      const s = i - this.Pr;
      s >= this.Rr && (t(), this.Pr = i - s % this.Rr), this.Tr && (this.zr = requestAnimationFrame(e));
    };
    this.zr = requestAnimationFrame(e);
  }
  stop() {
    this.zr && (cancelAnimationFrame(this.zr), this.zr = null);
  }
  pause() {
    this.Tr && (this.Tr = !1, this.stop());
  }
  resume(t) {
    this.Tr || (this.Tr = !0, this.start(t));
  }
  frameRate(t, e) {
    if (t === void 0) return this.Sr;
    this.Fr = t, this.Rr = 1e3 / t, this.Tr && e && (this.stop(), this.start(e));
  }
  measureFrameRate() {
    const t = performance.now();
    if (this.Er > 0) {
      const e = t - this.Er;
      this.Br.push(e), this.Br.length > this.Gr && this.Br.shift();
      const i = this.Br.reduce((s, r) => s + r, 0) / this.Br.length;
      this.Sr = 1e3 / i;
    }
    this.Er = t;
  }
  get isLooping() {
    return this.Tr;
  }
  get frameRateLimit() {
    return this.Fr;
  }
  get currentFrameRate() {
    return this.Sr;
  }
  get frameCount() {
    return this.Dr;
  }
  set frameCount(t) {
    this.Dr = t;
  }
  incrementFrame() {
    this.Dr++;
  }
  resetFrameCount() {
    this.Dr = 0;
  }
}
class Vt {
  constructor() {
    a(this, "Lr", /* @__PURE__ */ new Map());
    a(this, "Or", null);
    a(this, "kr", null);
    a(this, "Hr");
    a(this, "Ir");
    a(this, "Nr", !1);
    a(this, "Xr");
    a(this, "Wr");
    a(this, "Vr", { ArrowUp: "UP_ARROW", ArrowDown: "DOWN_ARROW", ArrowLeft: "LEFT_ARROW", ArrowRight: "RIGHT_ARROW", F1: "F1", F2: "F2", F3: "F3", F4: "F4", F5: "F5", F6: "F6", F7: "F7", F8: "F8", F9: "F9", F10: "F10", F11: "F11", F12: "F12", Enter: "ENTER", Return: "RETURN", Tab: "TAB", Escape: "ESCAPE", Backspace: "BACKSPACE", Delete: "DELETE", Insert: "INSERT", Home: "HOME", End: "END", PageUp: "PAGE_UP", PageDown: "PAGE_DOWN", Shift: "SHIFT", Control: "CONTROL", Alt: "ALT", Meta: "META", " ": "SPACE" });
  }
  Kr() {
    this.Nr || (this.Hr = (t) => {
      this.jr(t);
    }, this.Ir = (t) => {
      this.Yr(t);
    }, window.addEventListener("keydown", this.Hr, { passive: !1 }), window.addEventListener("keyup", this.Ir, { passive: !1 }), this.Nr = !0);
  }
  qr() {
    this.Nr && (window.removeEventListener("keydown", this.Hr), window.removeEventListener("keyup", this.Ir), this.Nr = !1, this.Lr.clear(), this.Or = null, this.kr = null);
  }
  Zr(t) {
    this.Xr = t;
  }
  Qr(t) {
    this.Wr = t;
  }
  Jr(t) {
    const e = this.tn(t), i = this.Lr.get(t) || this.Lr.get(e);
    return (i == null ? void 0 : i.isPressed) || !1;
  }
  en() {
    return this.Or;
  }
  sn() {
    return this.kr;
  }
  rn() {
    const t = [];
    for (const [e, i] of this.Lr) i.isPressed && t.push(e);
    return t;
  }
  nn() {
    return { ctrl: this.Jr("Control"), shift: this.Jr("Shift"), alt: this.Jr("Alt"), meta: this.Jr("Meta") };
  }
  an() {
    this.Lr.clear(), this.Or = null, this.kr = null;
  }
  jr(t) {
    const e = t.key, i = Date.now();
    this.Lr.has(e) || this.Lr.set(e, { isPressed: !1, lastPressTime: 0, lastReleaseTime: 0 });
    const s = this.Lr.get(e);
    if (!s.isPressed && (s.isPressed = !0, s.lastPressTime = i, this.Or = e, this.Xr)) {
      const r = { key: e, keyCode: t.keyCode, ctrlKey: t.ctrlKey, shiftKey: t.shiftKey, altKey: t.altKey, metaKey: t.metaKey, isPressed: !0, originalEvent: t };
      this.Xr(r);
    }
  }
  Yr(t) {
    const e = t.key, i = Date.now();
    this.Lr.has(e) || this.Lr.set(e, { isPressed: !1, lastPressTime: 0, lastReleaseTime: 0 });
    const s = this.Lr.get(e);
    if (s.isPressed = !1, s.lastReleaseTime = i, this.kr = e, this.Wr) {
      const r = { key: e, keyCode: t.keyCode, ctrlKey: t.ctrlKey, shiftKey: t.shiftKey, altKey: t.altKey, metaKey: t.metaKey, isPressed: !1, originalEvent: t };
      this.Wr(r);
    }
  }
  tn(t) {
    return this.Vr[t] || t.toLowerCase();
  }
}
class jt {
  constructor(t) {
    a(this, "er");
    a(this, "hn");
    a(this, "cn", { x: -1, y: -1 });
    a(this, "ln", { x: -1, y: -1 });
    a(this, "un", null);
    a(this, "fn");
    a(this, "dn");
    a(this, "pn");
    a(this, "mn");
    a(this, "gn");
    a(this, "_n");
    a(this, "Nr", !1);
    a(this, "vn");
    a(this, "yn");
    a(this, "An");
    a(this, "wn");
    a(this, "Cn");
    this.er = t;
  }
  Vi(t) {
    this.hn = t, this.bn();
  }
  Kr() {
    if (this.Nr) return;
    const t = this.er.canvas;
    this.fn = (e) => {
      this.xn(e), this.$n(e);
    }, this.dn = () => {
      this.ln = { ...this.cn }, this.cn.x = -1, this.cn.y = -1, this.un = null;
    }, this.pn = (e) => {
      this.xn(e), this.Mn(e);
    }, this.mn = (e) => {
      this.xn(e), this.Fn(e);
    }, this.gn = (e) => {
      this.xn(e), this.Rn(e);
    }, this._n = (e) => {
      this.xn(e), this.zn(e);
    }, t.addEventListener("mousemove", this.fn, { passive: !0 }), t.addEventListener("mouseleave", this.dn, { passive: !0 }), t.addEventListener("mousedown", this.pn, { passive: !0 }), t.addEventListener("mouseup", this.mn, { passive: !0 }), t.addEventListener("click", this.gn, { passive: !0 }), t.addEventListener("wheel", this._n, { passive: !1 }), this.Nr = !0;
  }
  qr() {
    if (!this.Nr) return;
    const t = this.er.canvas;
    t.removeEventListener("mousemove", this.fn), t.removeEventListener("mouseleave", this.dn), t.removeEventListener("mousedown", this.pn), t.removeEventListener("mouseup", this.mn), t.removeEventListener("click", this.gn), t.removeEventListener("wheel", this._n), this.Nr = !1;
  }
  bn() {
    if (this.Nr) try {
      if (this.un) {
        const t = new MouseEvent("mousemove", { clientX: this.un.x, clientY: this.un.y, bubbles: !1, cancelable: !1 });
        this.xn(t);
      } else this.cn.x !== -1 && this.cn.y !== -1 && (this.cn.x >= this.hn.cols || this.cn.y >= this.hn.rows) && (this.cn.x = -1, this.cn.y = -1);
    } catch {
      this.cn.x = -1, this.cn.y = -1;
    }
  }
  Pn(t) {
    this.vn = t;
  }
  Zr(t) {
    this.yn = t;
  }
  Qr(t) {
    this.An = t;
  }
  Tn(t) {
    this.wn = t;
  }
  Sn(t) {
    this.Cn = t;
  }
  En() {
    return { x: this.cn.x, y: this.cn.y };
  }
  $n(t) {
    if (this.wn) {
      const e = { position: { ...this.cn }, previousPosition: { ...this.ln }, originalEvent: t };
      this.wn(e);
    }
  }
  Mn(t) {
    if (this.yn) {
      const e = { position: { ...this.cn }, previousPosition: { ...this.ln }, button: t.button, originalEvent: t };
      this.yn(e);
    }
  }
  Fn(t) {
    if (this.An) {
      const e = { position: { ...this.cn }, previousPosition: { ...this.ln }, button: t.button, originalEvent: t };
      this.An(e);
    }
  }
  Rn(t) {
    if (this.vn) {
      const e = { position: { ...this.cn }, previousPosition: { ...this.ln }, button: t.button, originalEvent: t };
      this.vn(e);
    }
  }
  zn(t) {
    if (this.Cn) {
      const e = { position: { ...this.cn }, previousPosition: { ...this.ln }, delta: { x: t.deltaX, y: t.deltaY }, originalEvent: t };
      this.Cn(e);
    }
  }
  xn(t) {
    const e = this.er.canvas;
    this.ln = { ...this.cn }, this.un = { x: t.clientX, y: t.clientY };
    const i = e.getBoundingClientRect(), s = t.clientX - i.left, r = t.clientY - i.top, n = e.width / i.width, o = r * (e.height / i.height), c = s * n - this.hn.offsetX, l = o - this.hn.offsetY, u = Math.floor(c / this.hn.cellWidth), f = Math.floor(l / this.hn.cellHeight);
    u >= 0 && u < this.hn.cols && f >= 0 && f < this.hn.rows ? (this.cn.x = u, this.cn.y = f) : (this.cn.x = -1, this.cn.y = -1);
  }
}
const Kt = (h) => class extends h {
  rotate(t = 0, e = 0, i = 0) {
    this.xt.state.et(t), this.xt.state.st(e), this.xt.state.it(i);
  }
  rotateX(t) {
    this.xt.state.et(t);
  }
  rotateY(t) {
    this.xt.state.st(t);
  }
  rotateZ(t) {
    this.xt.state.it(t);
  }
  push() {
    this.xt.state.H();
  }
  pop() {
    this.xt.state.Z();
  }
  rect(t, e, i = 1, s = 1) {
    this.xt.Xs(t, e, i, s);
  }
  point(t, e) {
    this.xt.Xs(t, e, 1, 1);
  }
  line(t, e, i, s) {
    this.xt.Ws(t, e, i, s);
  }
  lineWeight(t) {
    this.xt.state.tt(t);
  }
  background(t, e = t, i = t, s = 255) {
    this.xt.Zs(t, e, i, s);
  }
  char(t) {
    this.xt.state.rt(this.Ei.Ti(t));
  }
  charColor(t, e, i) {
    this.xt.state.nt(t, e, i);
  }
  cellColor(t, e, i) {
    this.xt.state.ot(t, e, i);
  }
  flipX(t) {
    this.xt.state.ht(t);
  }
  flipY(t) {
    this.xt.state.ct(t);
  }
  charRotation(t) {
    this.xt.state.ut(t);
  }
  invert(t) {
    this.xt.state.lt(t);
  }
  clear() {
    this.xt.Zs(0, 0, 0, 0);
  }
  ellipse(t, e, i, s) {
    this.xt.Vs(t, e, i / 2, s / 2);
  }
  triangle(t, e, i, s, r, n) {
    this.xt.Ks(t, e, i, s, r, n);
  }
  bezierCurve(t, e, i, s, r, n, o, c) {
    this.xt.js(t, e, i, s, r, n, o, c);
  }
  arc(t, e, i, s, r, n) {
    this.xt.qs(t, e, i, s, r, n);
  }
  shader(t) {
    this.xt.Ls(t);
  }
  setUniform(t, e) {
    this.xt.Kt(t, e);
  }
  setUniforms(t) {
    this.xt.Os(t);
  }
  createFilterShader(t) {
    return this.xt.oe(t);
  }
  createFramebuffer(t) {
    return this.xt.Ys(t.width, t.height, 5, { filter: "nearest", wrap: "clamp", format: "rgba", type: "unsigned_byte" });
  }
  image(t, e, i, s, r) {
    if (t.textures) {
      const n = t;
      this.xt.ks(n, e, i, s ?? n.width, r ?? n.height);
    } else {
      const n = t;
      this.xt.Hs(n, e, i, s ?? Math.floor(this.hn.cols / 2), r ?? Math.floor(this.hn.rows / 2));
    }
  }
  async loadImage(t) {
    if (typeof t != "string") return z.Mr(this.xt, t, (s) => this.Ei.Si(s));
    const e = t, i = await new Promise((s, r) => {
      const n = new Image();
      n.crossOrigin = "anonymous", n.onload = () => s(n), n.onerror = (o) => r(o), n.src = e;
    });
    return z.Mr(this.xt, i, (s) => this.Ei.Si(s));
  }
};
class $ {
  Bn(t) {
    const e = t.Pt(0), i = t.Pt(1), s = t.Pt(2), r = t.Pt(3);
    return { characterPixels: e, primaryColorPixels: i, secondaryColorPixels: s, transformPixels: t.Pt(4), rotationPixels: r };
  }
  Gn(t, e) {
    return t[e] + (t[e + 1] << 8);
  }
  Dn(t, e) {
    return { r: t[e], g: t[e + 1], b: t[e + 2], a: t[e + 3] };
  }
}
class J {
  Ln(t, e) {
    return new Blob([t], { type: e });
  }
  On(t, e, i) {
    try {
      const s = this.Ln(t, i), r = URL.createObjectURL(s), n = document.createElement("a");
      n.href = r, n.download = e, n.style.display = "none", n.rel = "noopener", document.body.appendChild(n), n.click(), document.body.removeChild(n), URL.revokeObjectURL(r);
    } catch (s) {
      console.error("Failed to download file:", s);
    }
  }
  kn() {
    return (/* @__PURE__ */ new Date()).toISOString().slice(0, 19).replace(/:/g, "-");
  }
  Hn() {
    const t = /* @__PURE__ */ new Date();
    return { date: t.toISOString().split("T")[0], time: t.toTimeString().split(" ")[0].replace(/:/g, "-") };
  }
  In(t) {
    return t.replace(/[<>:"/\\|?*]/g, "_").replace(/\s+/g, "_").replace(/_{2,}/g, "_").replace(/^_+|_+$/g, "").substring(0, 255);
  }
  Nn() {
    return "textmode-export-" + this.kn();
  }
}
class qt extends $ {
  Xn(t, e, i) {
    const s = t[i] === 255, r = t[i + 1] === 255, n = t[i + 2] === 255, o = e[i], c = e[i + 1];
    return { isInverted: s, flipHorizontal: r, flipVertical: n, rotation: Math.round(360 * (o + c / 255) / 255 * 100) / 100 };
  }
  Wn(t, e, i) {
    return { x: t, y: e, cellX: t * i.cellWidth, cellY: e * i.cellHeight };
  }
  Vn(t, e) {
    const i = [];
    let s = 0;
    for (let r = 0; r < e.rows; r++) for (let n = 0; n < e.cols; n++) {
      const o = 4 * s, c = this.Gn(t.characterPixels, o);
      let l = this.Dn(t.primaryColorPixels, o), u = this.Dn(t.secondaryColorPixels, o);
      const f = this.Xn(t.transformPixels, t.rotationPixels, o);
      if (f.isInverted) {
        const v = l;
        l = u, u = v;
      }
      const g = this.Wn(n, r, e);
      i.push({ charIndex: c, primaryColor: l, secondaryColor: u, transform: f, position: g }), s++;
    }
    return i;
  }
}
class Zt {
  Kn(t, e) {
    const i = t.cmap;
    for (const s of i.tables) if (s.format === 4) {
      const r = s;
      for (let n = 0; n < r.startCount.length; n++) if (e >= r.startCount[n] && e <= r.endCount[n]) {
        if (r.idRangeOffset[n] === 0) return e + r.idDelta[n] & 65535;
        {
          const o = r.idRangeOffset[n] / 2 + (e - r.startCount[n]) - (r.startCount.length - n);
          if (o >= 0 && o < r.glyphIdArray.length) {
            const c = r.glyphIdArray[o];
            if (c !== 0) return c + r.idDelta[n] & 65535;
          }
        }
      }
    } else if (s.format === 12) {
      const r = s;
      for (let n = 0; n < r.groups.length; n += 3) {
        const o = r.groups[n], c = r.groups[n + 1], l = r.groups[n + 2];
        if (e >= o && e <= c) return l + (e - o);
      }
    }
    return 0;
  }
  jn(t, e, i, s, r) {
    const n = r / t.head.unitsPerEm;
    return { getBoundingBox: () => ({ x1: i + e.xMin * n, y1: s + -e.yMax * n, x2: i + e.xMax * n, y2: s + -e.yMin * n }), toSVG: () => this.Yn(e, i, s, n) };
  }
  Yn(t, e, i, s) {
    if (!t || !t.xs) return "";
    const { xs: r, ys: n, endPts: o, flags: c } = t;
    if (!(r && n && o && c)) return "";
    let l = "", u = 0;
    for (let f = 0; f < o.length; f++) {
      const g = o[f];
      if (!(g < u)) {
        if (g >= u) {
          const v = e + r[u] * s, m = i - n[u] * s;
          l += `M${v.toFixed(2)},${m.toFixed(2)}`;
          let d = u + 1;
          for (; d <= g; )
            if (1 & c[d]) {
              const A = e + r[d] * s, p = i - n[d] * s;
              l += `L${A.toFixed(2)},${p.toFixed(2)}`, d++;
            } else {
              const A = e + r[d] * s, p = i - n[d] * s;
              let E = d + 1 > g ? u : d + 1;
              if (1 & c[E]) {
                const x = e + r[E] * s, C = i - n[E] * s;
                l += `Q${A.toFixed(2)},${p.toFixed(2)} ${x.toFixed(2)},${C.toFixed(2)}`, d = E + 1;
              } else {
                const x = (A + (e + r[E] * s)) / 2, C = (p + (i - n[E] * s)) / 2;
                l += `Q${A.toFixed(2)},${p.toFixed(2)} ${x.toFixed(2)},${C.toFixed(2)}`, d = E;
              }
            }
          l += "Z";
        }
        u = g + 1;
      }
    }
    return l;
  }
  qn(t, e, i, s, r) {
    const n = t.codePointAt(0) || 0, o = this.Kn(e, n);
    let c = null;
    return e.glyf && e.glyf[o] !== null ? c = e.glyf[o] : (c = L.T.glyf.Js(e, o), e.glyf[o] = c), this.jn(e, c, i, s, r);
  }
  Zn(t, e, i, s, r, n, o, c) {
    const l = i + (r - c * (o / e.head.unitsPerEm)) / 2, u = s + (n + 0.7 * o) / 2;
    return this.qn(t, e, l, u, o).toSVG() || null;
  }
}
class $t {
  constructor() {
    a(this, "Qn");
    this.Qn = new Zt();
  }
  Jn(t) {
    const { width: e, height: i } = t;
    return `<?xml version="1.0" encoding="UTF-8"?><svg width="${e}" height="${i}" viewBox="0 0 ${e} ${i}" xmlns="http://www.w3.org/2000/svg"><title>textmode.js sketch</title>`;
  }
  eo() {
    return "</g></svg>";
  }
  so(t, e) {
    if (!e.includeBackgroundRectangles) return "";
    const [i, s, r, n] = e.backgroundColor;
    return `<rect width="${t.width}" height="${t.height}" fill="rgba(${i},${s},${r},${n / 255})"/>`;
  }
  io(t, e) {
    const { transform: i, position: s } = t;
    if (!i.flipHorizontal && !i.flipVertical && !i.rotation) return "";
    const r = s.cellX + e.cellWidth / 2, n = s.cellY + e.cellHeight / 2, o = [];
    if (i.flipHorizontal || i.flipVertical) {
      const c = i.flipHorizontal ? -1 : 1, l = i.flipVertical ? -1 : 1;
      o.push(`translate(${r} ${n})scale(${c} ${l})translate(${-r} ${-n})`);
    }
    return i.rotation && o.push(`rotate(${i.rotation} ${r} ${n})`), ` transform="${o.join(" ")}"`;
  }
  ro(t, e, i) {
    if (!i.includeBackgroundRectangles || t.secondaryColor.a === 0) return "";
    const { position: s } = t, { r, g: n, b: o, a: c } = t.secondaryColor, l = `rgba(${r},${n},${o},${c / 255})`;
    return i.drawMode === "stroke" ? `<rect x="${s.cellX}" y="${s.cellY}" width="${e.cellWidth}" height="${e.cellHeight}" stroke="${l}" fill="none" stroke-width="${i.strokeWidth}"/>` : `<rect x="${s.cellX}" y="${s.cellY}" width="${e.cellWidth}" height="${e.cellHeight}" fill="${l}"/>`;
  }
  qn(t, e, i, s) {
    const r = i.characters[t.charIndex];
    if (!r) return "";
    const n = this.Qn.Zn(r.character, i.font, t.position.cellX, t.position.cellY, e.cellWidth, e.cellHeight, i.fontSize, r.advanceWidth);
    if (!n) return "";
    const { r: o, g: c, b: l, a: u } = t.primaryColor, f = `rgba(${o},${c},${l},${u / 255})`;
    return s.drawMode === "stroke" ? `<path d="${n}" stroke="${f}" stroke-width="${s.strokeWidth}" fill="none"/>` : `<path d="${n}" fill="${f}"/>`;
  }
  no(t, e, i, s) {
    const r = [], n = this.ro(t, e, s);
    n && r.push(n);
    const o = this.qn(t, e, i, s);
    if (o) {
      const c = this.io(t, e);
      r.push(c ? `<g${c}>${o}</g>` : o);
    }
    return r.join("");
  }
  oo(t, e, i, s) {
    const r = [this.Jn(e), this.so(e, s), '<g id="ascii-cells">'];
    for (const n of t) r.push(this.no(n, e, i, s));
    return r.push(this.eo()), r.join("");
  }
  ao(t) {
    return t.replace(/<path[^>]*d=""[^>]*\/>/g, "").replace(/\s+/g, " ").replace(/> </g, "><");
  }
}
class Jt extends J {
  ho(t) {
    return this.Ln(t, "image/svg+xml;charset=utf-8");
  }
  co(t, e) {
    this.On(t, this.In(e) + ".svg", "image/svg+xml;charset=utf-8");
  }
  lo(t, e) {
    this.co(t, e || this.Nn());
  }
}
class st {
  constructor() {
    a(this, "uo");
    a(this, "fo");
    a(this, "do");
    this.uo = new qt(), this.fo = new $t(), this.do = new Jt();
  }
  po(t) {
    return { includeBackgroundRectangles: t.includeBackgroundRectangles ?? !0, drawMode: t.drawMode ?? "fill", strokeWidth: t.strokeWidth ?? 1, backgroundColor: t.backgroundColor ?? [0, 0, 0, 0], filename: t.filename || this.do.Nn() };
  }
  mo(t, e = {}) {
    const i = this.uo.Vn(this.uo.Bn(t.pipeline), t.grid), s = this.fo.oo(i, t.grid, t.font, this.po(e));
    return this.fo.ao(s);
  }
  lo(t, e = {}) {
    this.do.lo(this.mo(t, e), e.filename);
  }
}
class Qt extends $ {
  _o(t, e, i, s = " ") {
    var o;
    const r = [];
    let n = 0;
    for (let c = 0; c < e.rows; c++) {
      const l = [];
      for (let u = 0; u < e.cols; u++) {
        const f = 4 * n, g = this.Gn(t.characterPixels, f), v = ((o = i.characters[g]) == null ? void 0 : o.character) || s;
        l.push(v), n++;
      }
      r.push(l);
    }
    return r;
  }
}
class te {
  vo(t, e) {
    const i = [];
    for (const r of t) {
      let n = r.join("");
      e.preserveTrailingSpaces || (n = n.replace(/\s+$/, "")), i.push(n);
    }
    const s = e.lineEnding === "crlf" ? `\r
` : `
`;
    return i.join(s);
  }
}
class ee extends J {
  yo(t, e) {
    const i = this.Ao(e);
    this.On(t, i, "text/plain;charset=utf-8");
  }
  Ao(t) {
    let e = this.In(t);
    return e === ".txt" || e.length <= 4 ? this.Nn() : e;
  }
}
class rt {
  constructor() {
    a(this, "uo");
    a(this, "fo");
    a(this, "do");
    this.uo = new Qt(), this.fo = new te(), this.do = new ee();
  }
  po(t) {
    return { preserveTrailingSpaces: t.preserveTrailingSpaces ?? !1, lineEnding: t.lineEnding ?? "lf", emptyCharacter: t.emptyCharacter ?? " ", filename: t.filename || this.do.Nn() };
  }
  wo(t, e = {}) {
    const i = this.po(e), s = this.uo._o(this.uo.Bn(t.pipeline), t.grid, t.font, i.emptyCharacter);
    return this.fo.vo(s, i);
  }
  yo(t, e = {}) {
    this.do.yo(this.wo(t, e), e.filename);
  }
}
class ie extends $ {
  Co(t, e = 1, i = "transparent") {
    const s = t.canvas;
    if (e === 1 && i === "transparent") return s;
    const r = document.createElement("canvas"), n = r.getContext("2d"), o = Math.round(s.width * e), c = Math.round(s.height * e);
    return r.width = o, r.height = c, i !== "transparent" && (n.fillStyle = i, n.fillRect(0, 0, o, c)), n.imageSmoothingEnabled = !1, n.drawImage(s, 0, 0, s.width, s.height, 0, 0, o, c), r;
  }
}
class se {
  bo(t, e) {
    const i = this.xo(e.format);
    return e.format === "png" ? t.toDataURL(i) : t.toDataURL(i, e.quality);
  }
  async $o(t, e) {
    return new Promise((i, s) => {
      const r = this.xo(e.format), n = (o) => {
        o ? i(o) : s(Error(`Failed to generate ${e.format.toUpperCase()} blob`));
      };
      e.format === "png" ? t.toBlob(n, r) : t.toBlob(n, r, e.quality);
    });
  }
  xo(t) {
    switch (t) {
      case "png":
        return "image/png";
      case "jpg":
        return "image/jpeg";
      case "webp":
        return "image/webp";
      default:
        throw Error("Unsupported image format: " + t);
    }
  }
}
const re = { png: "image/png", jpg: "image/jpeg", webp: "image/webp" }, nt = { png: ".png", jpg: ".jpg", webp: ".webp" };
class ne extends J {
  Mo(t, e, i) {
    this.Fo(t, this.In(e) + nt[i]);
  }
  Fo(t, e) {
    const i = URL.createObjectURL(t);
    try {
      const s = document.createElement("a");
      s.href = i, s.download = e, s.style.display = "none", s.rel = "noopener", document.body.appendChild(s), s.click(), document.body.removeChild(s);
    } finally {
      URL.revokeObjectURL(i);
    }
  }
  Ro(t) {
    return t in re && t in nt;
  }
}
class oe {
  constructor() {
    a(this, "uo");
    a(this, "fo");
    a(this, "do");
    this.uo = new ie(), this.fo = new se(), this.do = new ne();
  }
  po(t) {
    return { format: t.format ?? "png", quality: t.quality ?? 1, scale: t.scale ?? 1, backgroundColor: t.backgroundColor ?? "transparent", filename: t.filename || this.do.Nn() };
  }
  zo(t) {
    if (!this.do.Ro(t.format)) throw Error(`Saving '${t.format}' files is not supported`);
    if (t.quality < 0 || t.quality > 1) throw Error("Image quality must be between 0.0 and 1.0");
    if (t.scale <= 0) throw Error("Scale factor must be greater than 0");
    t.format === "jpg" && t.backgroundColor === "transparent" && (t.backgroundColor = "black");
  }
  async $o(t, e) {
    if (e.scale === 1 && e.backgroundColor === "transparent") return await this.fo.$o(t.canvas, e);
    const i = this.uo.Co(t, e.scale, e.backgroundColor);
    return await this.fo.$o(i, e);
  }
  async Mo(t, e = {}) {
    const i = this.po(e);
    this.zo(i);
    const s = await this.$o(t, i);
    this.do.Mo(s, i.filename, i.format);
  }
}
const he = (h) => class extends h {
  Po() {
    this.xt.St(this.To);
  }
  toString(t = {}) {
    return this.Po(), new rt().wo({ pipeline: this.So, grid: this.hn, font: this.Ei }, t);
  }
  saveStrings(t = {}) {
    this.Po(), new rt().yo({ pipeline: this.So, grid: this.hn, font: this.Ei }, t);
  }
  toSVG(t = {}) {
    return this.Po(), new st().mo({ pipeline: this.So, grid: this.hn, font: this.Ei }, t);
  }
  saveSVG(t = {}) {
    this.Po(), new st().lo({ pipeline: this.So, grid: this.hn, font: this.Ei }, t);
  }
  async saveCanvas(t = {}) {
    await new oe().Mo(this.er, t);
  }
}, ae = (h) => class extends h {
  async loadFont(t) {
    return this.Ei.qi(t).then(() => {
      const e = this.Ei.maxGlyphDimensions;
      this.hn.nr(e.width, e.height), this.So.resize(this.hn.cols, this.hn.rows), this.xt.Qs(), this.Eo.bn();
    });
  }
  fontSize(t) {
    if (!G.v(typeof t == "number" && t > 0, "Font size must be a positive number greater than 0.", { method: "fontSize", providedValue: t }) || this.Ei.fontSize === t) return;
    this.Ei.Yi(t);
    const e = this.Ei.maxGlyphDimensions;
    this.hn.nr(e.width, e.height), this.So.resize(this.hn.cols, this.hn.rows), this.xt.Qs(), this.Eo.bn();
  }
  glyphColor(t) {
    return this.Ei.Ti(t);
  }
  glyphColors(t) {
    return this.Ei.Si(t);
  }
}, ce = (h) => class extends h {
  get frameCount() {
    return this.Bo.frameCount;
  }
  set frameCount(t) {
    this.Bo.frameCount = t;
  }
  frameRate(t) {
    return t === void 0 ? this.Bo.currentFrameRate : this.Bo.frameRate(t, () => this.Go());
  }
  noLoop() {
    this.Bo.pause();
  }
  loop() {
    this.Bo.resume(() => this.Go());
  }
  redraw(t = 1) {
    if (G.v(typeof t == "number" && t > 0 && Number.isInteger(t), "Redraw count must be a positive integer.", { method: "redraw", providedValue: t })) for (let e = 0; e < t; e++) this.Go();
  }
  isLooping() {
    return this.Bo.isLooping;
  }
}, le = (h) => class extends h {
  constructor(...t) {
    super(...t);
  }
  mouseClicked(t) {
    this.Eo.Pn(t);
  }
  mousePressed(t) {
    this.Eo.Zr(t);
  }
  mouseReleased(t) {
    this.Eo.Qr(t);
  }
  mouseMoved(t) {
    this.Eo.Tn(t);
  }
  mouseScrolled(t) {
    this.Eo.Sn(t);
  }
  get mouse() {
    return this.Eo.En();
  }
}, ue = (h) => class extends h {
  constructor(...t) {
    super(...t);
  }
  keyPressed(t) {
    this.Do.Zr(t);
  }
  keyReleased(t) {
    this.Do.Qr(t);
  }
  isKeyPressed(t) {
    return this.Do.Jr(t);
  }
  get lastKeyPressed() {
    return this.Do.en();
  }
  get lastKeyReleased() {
    return this.Do.sn();
  }
  get pressedKeys() {
    return this.Do.rn();
  }
  get modifierState() {
    return this.Do.nn();
  }
};
class fe {
  constructor() {
    a(this, "xt");
    a(this, "Ei");
    a(this, "er");
    a(this, "hn");
    a(this, "Bo");
    a(this, "Eo");
    a(this, "Do");
    a(this, "To");
    a(this, "So");
    a(this, "Lo");
    a(this, "Oo");
    a(this, "ko");
  }
  Go() {
  }
}
class de extends function(e, ...i) {
  return i.reduce((s, r) => r(s), e);
}(fe, Kt, he, ae, ce, le, ue) {
  constructor(e = {}) {
    super();
    a(this, "Ho", !1);
    a(this, "Io", () => {
    });
    a(this, "No", () => {
    });
    a(this, "Xo", () => {
    });
    a(this, "Wo");
    a(this, "cr");
    a(this, "hr", !1);
    a(this, "Vo");
    this.hr = e.overlay ?? !1, this.er = new kt(e), this.xt = new Bt(this.er._r()), this.Ei = new Xt(this.xt, e.fontSize ?? 16), this.Bo = new Yt(e.frameRate ?? 60), this.Eo = new jt(this.er), this.Do = new Vt(), this.To = this.xt.Tt(), this.Lo = this.xt.re(), this.Ko(e);
  }
  async Ko(e) {
    await this.Ei.Vi(e.fontSource);
    const i = this.Ei.maxGlyphDimensions;
    this.hn = new Ht(this.er.canvas, i.width, i.height), this.Eo.Vi(this.hn), this.So = this.xt.Ys(this.hn.cols, this.hn.rows, 5), this.Oo = this.xt.Ys(this.hn.width, this.hn.height, 1), this.hr && (this.Vo = z.Mr(this.xt, this.er.targetCanvas, (s) => this.Ei.Si(s))), this.ko = this.xt.ae(at, "precision mediump float;uniform sampler2D Ua;uniform vec2 Ub;uniform vec2 Uc;uniform vec2 Ud;void main(){vec2 A=gl_FragCoord.xy-Uc;vec2 B=A*(Ub/Ud);vec2 C=(floor(B)+0.5)/Ub;gl_FragColor=texture2D(Ua,C);}"), this.jo(), this.Io(), this.Bo.start(() => this.Go());
  }
  jo() {
    this.Wo = () => {
      this.hr && this.resizeCanvas(this.er.targetCanvas.width, this.er.targetCanvas.height), this.Xo();
    }, window.addEventListener("resize", this.Wo), this.Eo.Kr(), this.Do.Kr(), window.addEventListener("blur", () => {
      this.Do.an();
    }), window.ResizeObserver && this.hr && (this.cr = new ResizeObserver(() => {
      this.resizeCanvas(this.er.targetCanvas.width, this.er.targetCanvas.height);
    }), this.cr.observe(this.er.targetCanvas));
  }
  Go() {
    if (this.Bo.measureFrameRate(), this.Bo.incrementFrame(), this.Ho) return;
    if (this.hr) {
      const i = this.xt.context;
      i.bindTexture(i.TEXTURE_2D, this.Vo.texture), i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL, 1), i.texImage2D(i.TEXTURE_2D, 0, i.RGBA, i.RGBA, i.UNSIGNED_BYTE, this.er.targetCanvas), i.bindTexture(i.TEXTURE_2D, null);
    }
    this.So.begin(), this.xt.Ds(this.To), this.No(), this.xt.St(this.To), this.So.end(), this.Oo.begin(), this.xt.Ds(this.Lo), this.Lo.Vt({ U0: this.Ei.fontFramebuffer, U1: [this.Ei.textureColumns, this.Ei.textureRows], U2: this.So.textures[0], U3: this.So.textures[1], U4: this.So.textures[2], U5: this.So.textures[4], U6: this.So.textures[3], U7: [this.hn.cols, this.hn.rows], U8: [this.Oo.width, this.Oo.height], U9: this.Oo.width / this.Oo.height }), this.xt.Ns(0, 0, this.er.width, this.er.height), this.Oo.end();
    const e = this.xt.state.canvasBackgroundColor;
    this.xt.Ne(e[0], e[1], e[2], e[3]), this.xt.Ds(this.ko), this.ko.Vt({ Ua: this.Oo.textures[0], Ub: [this.Oo.width, this.Oo.height], Uc: [this.hn.offsetX, this.hn.offsetY], Ud: [this.hn.width, this.hn.height] }), this.xt.Ns(this.hn.offsetX, this.hn.offsetY, this.hn.width, this.hn.height);
  }
  setup(e) {
    this.Io = e;
  }
  draw(e) {
    this.No = e;
  }
  windowResized(e) {
    this.Xo = e;
  }
  resizeCanvas(e, i) {
    this.er.gr(e, i), this.hn.rr(), this.So.resize(this.hn.cols, this.hn.rows), this.Oo.resize(this.hn.width, this.hn.height), this.xt.Qs(), this.Eo.bn(), this.Go();
  }
  destroy() {
    this.Ho || (this.Bo.stop(), window.removeEventListener("resize", this.Wo), this.Eo.qr(), this.Do.qr(), this.Ei.Gt(), this.xt.Gt(), this.Oo.Gt(), this.ko.Gt(), this.Vo && this.Vo.Gt(), this.Ho = !0);
  }
  get grid() {
    return this.hn;
  }
  get font() {
    return this.Ei;
  }
  get width() {
    return this.er.width;
  }
  get height() {
    return this.er.height;
  }
  get canvas() {
    return this.er.canvas;
  }
  get isDisposed() {
    return this.Ho;
  }
  get overlay() {
    return this.Vo;
  }
}
class Q {
  constructor() {
  }
  static create(t = {}) {
    return new de(t);
  }
  static setErrorLevel(t) {
    G.A(t);
  }
  static get version() {
    return "0.3.0";
  }
}
const pe = Object.freeze(Object.defineProperty({ __proto__: null }, Symbol.toStringTag, { value: "Module" })), me = Q.create, ve = Q.setErrorLevel, Ae = Q.version;
export {
  kt as TextmodeCanvas,
  ut as TextmodeErrorLevel,
  Xt as TextmodeFont,
  q as TextmodeFramebuffer,
  Ht as TextmodeGrid,
  z as TextmodeImage,
  de as Textmodifier,
  me as create,
  pe as export,
  ve as setErrorLevel,
  Q as textmode,
  Ae as version
};
