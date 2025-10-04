var ht = Object.defineProperty;
var at = (a, t, e) => t in a ? ht(a, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : a[t] = e;
var h = (a, t, e) => at(a, typeof t != "symbol" ? t + "" : t, e);
class C extends Error {
  constructor(t, e = {}) {
    super(C.i(t, e)), this.name = "TextmodeError";
  }
  static i(t, e) {
    return `${t}${e && Object.keys(e).length > 0 ? `

📋 Context:` + Object.entries(e).map(([i, s]) => `
  - ${i}: ${C.o(s)}`).join("") : ""}

${"↓".repeat(24)}
`;
  }
  static o(t) {
    if (t === null) return "null";
    if (t === void 0) return "undefined";
    if (typeof t == "string") return `"${t}"`;
    if (typeof t == "number" || typeof t == "boolean") return t + "";
    if (Array.isArray(t)) return t.length === 0 ? "[]" : t.length <= 5 ? `[${t.map((e) => C.o(e)).join(", ")}]` : `[${t.slice(0, 3).map((e) => C.o(e)).join(", ")}, ... +${t.length - 3} more]`;
    if (typeof t == "object") {
      const e = Object.keys(t);
      return e.length === 0 ? "{}" : e.length <= 3 ? `{ ${e.map((i) => `${i}: ${C.o(t[i])}`).join(", ")} }` : `{ ${e.slice(0, 2).map((i) => `${i}: ${C.o(t[i])}`).join(", ")}, ... +${e.length - 2} more }`;
    }
    return t + "";
  }
}
var ct = ((a) => (a[a.SILENT = 0] = "SILENT", a[a.WARNING = 1] = "WARNING", a[a.ERROR = 2] = "ERROR", a[a.THROW = 3] = "THROW", a))(ct || {});
const D = class D {
  constructor() {
    h(this, "u", { globalLevel: 3 });
  }
  static _() {
    return D.l || (D.l = new D()), D.l;
  }
  m(t, e) {
    const i = "%c[textmode.js] Oops! (╯°□°)╯︵ Something went wrong in your code.", s = "color: #f44336; font-weight: bold; background: #ffebee; padding: 2px 6px; border-radius: 3px;";
    switch (this.u.globalLevel) {
      case 0:
        return !1;
      case 1:
        return console.group(i, s), console.warn(C.i(t, e)), console.groupEnd(), !1;
      case 2:
        return console.group(i, s), console.error(C.i(t, e)), console.groupEnd(), !1;
      default:
        throw new C(t, e);
    }
  }
  v(t, e, i) {
    return !!t || (this.m(e, i), !1);
  }
  A(t) {
    this.u.globalLevel = t;
  }
};
h(D, "l", null);
let K = D;
const z = K._(), et = /* @__PURE__ */ new WeakMap();
function Y(a, t) {
  et.set(a, t);
}
function W(a) {
  return et.get(a);
}
class it {
  constructor() {
    h(this, "C", 1);
    h(this, "M", 0);
    h(this, "U", 0);
    h(this, "F", 0);
    h(this, "R", [0, 0, 0]);
    h(this, "P", [1, 1, 1, 1]);
    h(this, "S", [0, 0, 0, 1]);
    h(this, "$", !1);
    h(this, "D", !1);
    h(this, "k", !1);
    h(this, "L", [0, 0]);
    h(this, "O", [0, 0, 0, 1]);
    h(this, "H", []);
  }
  G() {
    this.H.push({ I: this.C, N: this.M, X: this.U, W: this.F, L: [...this.L], K: this.$, j: this.D, k: this.k, Y: [...this.R], V: [...this.P], q: [...this.S] });
  }
  Z() {
    const t = this.H.pop();
    t ? (this.C = t.I, this.M = t.N, this.U = t.X, this.F = t.W, this.L = t.L, this.$ = t.K, this.D = t.j, this.k = t.k, this.R = t.Y, this.P = t.V, this.S = t.q) : console.warn("pop() called without matching push()");
  }
  J(t) {
    t.I = this.C, t.N = this.M, t.X = this.U, t.W = this.F, t.Y[0] = this.R[0], t.Y[1] = this.R[1], t.Y[2] = this.R[2], t.V[0] = this.P[0], t.V[1] = this.P[1], t.V[2] = this.P[2], t.V[3] = this.P[3], t.q[0] = this.S[0], t.q[1] = this.S[1], t.q[2] = this.S[2], t.q[3] = this.S[3], t.K = this.$, t.j = this.D, t.k = this.k, t.L[0] = this.L[0], t.L[1] = this.L[1];
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
  st(t) {
    this.M = t;
  }
  et(t) {
    this.U = t;
  }
  it(t) {
    this.F = t;
  }
  rt(t) {
    this.R = t;
  }
  nt(t, e, i, s = 255) {
    this.P = [t / 255, e / 255, i / 255, s / 255];
  }
  ot(t, e, i, s = 255) {
    this.S = [t / 255, e / 255, i / 255, s / 255];
  }
  ht(t) {
    this.$ = t;
  }
  ct(t) {
    this.D = t;
  }
  lt(t) {
    this.k = t;
  }
  ut(t) {
    const e = 255 * t / 360, i = Math.floor(e) / 255, s = Math.round(e - Math.floor(e));
    this.L = [i, s];
  }
  ft(t, e, i, s) {
    this.O = [t / 255, e / 255, i / 255, s / 255];
  }
}
class j {
  constructor(t, e, i = e, s = 1, r = {}, n = null, o = !1) {
    h(this, "dt");
    h(this, "_t");
    h(this, "u");
    h(this, "vt", null);
    h(this, "gt");
    h(this, "At");
    h(this, "yt", []);
    h(this, "wt");
    h(this, "Ct", null);
    h(this, "bt", []);
    h(this, "xt", null);
    h(this, "Mt", !1);
    h(this, "Ft", null);
    this.dt = e, this._t = i, this.u = { filter: "nearest", wrap: "clamp", format: "rgba", type: "unsigned_byte", ...r }, this.gt = t, this.wt = Math.min(Math.max(1, s), 8), this.xt = n, this.Mt = !!o, this.Ft = this.Mt ? new it() : null;
    const c = t.getParameter(t.MAX_DRAW_BUFFERS), l = t.getParameter(t.MAX_COLOR_ATTACHMENTS);
    this.wt = Math.min(this.wt, c, l), this.At = t.createFramebuffer(), this.zt(), this.Rt(), this.bt = Array(this.wt).fill(null);
  }
  zt() {
    const t = this.gt, e = this.u.filter === "linear" ? t.LINEAR : t.NEAREST, i = this.u.wrap === "repeat" ? t.REPEAT : t.CLAMP_TO_EDGE, s = this.u.type === "float" ? t.FLOAT : t.UNSIGNED_BYTE;
    for (let r = 0; r < this.wt; r++) {
      const n = t.createTexture();
      t.bindTexture(t.TEXTURE_2D, n), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MIN_FILTER, e), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MAG_FILTER, e), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_S, i), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_T, i), t.texImage2D(t.TEXTURE_2D, 0, t.RGBA, this.dt, this._t, 0, t.RGBA, s, null), this.yt.push(n);
    }
    t.bindTexture(t.TEXTURE_2D, null);
  }
  Rt() {
    const t = this.gt;
    if (t.bindFramebuffer(t.FRAMEBUFFER, this.At), this.wt === 1) t.framebufferTexture2D(t.FRAMEBUFFER, t.COLOR_ATTACHMENT0, t.TEXTURE_2D, this.yt[0], 0);
    else {
      const i = [];
      for (let s = 0; s < this.wt; s++) {
        const r = t.COLOR_ATTACHMENT0 + s;
        t.framebufferTexture2D(t.FRAMEBUFFER, r, t.TEXTURE_2D, this.yt[s], 0), i.push(r);
      }
      t.drawBuffers(i);
    }
    const e = t.checkFramebufferStatus(t.FRAMEBUFFER);
    e !== t.FRAMEBUFFER_COMPLETE && console.error("GLFramebuffer is not complete:", e), t.bindFramebuffer(t.FRAMEBUFFER, null);
  }
  Tt(t) {
    const e = this.gt;
    e.bindTexture(e.TEXTURE_2D, this.yt[0]), e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL, 1), e.texImage2D(e.TEXTURE_2D, 0, e.RGBA, e.RGBA, e.UNSIGNED_BYTE, t), e.bindTexture(e.TEXTURE_2D, null);
  }
  resize(t, e) {
    this.dt = t, this._t = e, this.vt = null, this.bt = Array(this.wt).fill(null);
    const i = this.gt, s = this.u.type === "float" ? i.FLOAT : i.UNSIGNED_BYTE;
    for (const r of this.yt) i.bindTexture(i.TEXTURE_2D, r), i.texImage2D(i.TEXTURE_2D, 0, i.RGBA, this.dt, this._t, 0, i.RGBA, s, null);
    i.bindTexture(i.TEXTURE_2D, null);
  }
  readPixels(t) {
    const e = this.gt, i = this.bt[t];
    if (i) return i;
    const s = this.dt, r = this._t, n = new Uint8Array(s * r * 4), o = e.getParameter(e.READ_FRAMEBUFFER_BINDING);
    e.bindFramebuffer(e.READ_FRAMEBUFFER, this.At), e.readBuffer(e.COLOR_ATTACHMENT0 + t), e.readPixels(0, 0, s, r, e.RGBA, e.UNSIGNED_BYTE, n), e.bindFramebuffer(e.READ_FRAMEBUFFER, o);
    const c = 4 * s, l = new Uint8Array(n.length);
    for (let f = 0; f < r; f++) {
      const u = (r - 1 - f) * c, m = f * c;
      l.set(n.subarray(u, u + c), m);
    }
    return this.bt[t] = l, l;
  }
  begin() {
    var e, i, s, r;
    const t = this.gt;
    if (this.xt) {
      const n = ((i = (e = this.xt).Pt) == null ? void 0 : i.call(e)) ?? null;
      n && this.xt.St(n), this.Mt && this.Ft && ((r = (s = this.xt).$t) == null || r.call(s, this.Ft));
    }
    this.Ct = { framebuffer: t.getParameter(t.FRAMEBUFFER_BINDING), viewport: t.getParameter(t.VIEWPORT) }, t.bindFramebuffer(t.FRAMEBUFFER, this.At), this.bt = Array(this.wt).fill(null);
    for (let n = 0; n < this.wt; n++) t.clearBufferfv(t.COLOR, n, new Float32Array([0, 0, 0, 0]));
    t.viewport(0, 0, this.dt, this._t), Y(t, [0, 0, this.dt, this._t]);
  }
  end() {
    var e, i, s, r;
    if (!this.Ct) return;
    const t = this.gt;
    if (this.xt) {
      const n = ((i = (e = this.xt).Pt) == null ? void 0 : i.call(e)) ?? null;
      n && this.xt.St(n);
    }
    t.bindFramebuffer(t.FRAMEBUFFER, this.Ct.framebuffer), t.viewport(...this.Ct.viewport), Y(t, this.Ct.viewport), this.Ct = null, this.xt && this.Mt && this.Ft && ((r = (s = this.xt).Et) == null || r.call(s));
  }
  Dt() {
    const t = this.gt;
    t.deleteFramebuffer(this.At);
    for (const e of this.yt) t.deleteTexture(e);
  }
  get width() {
    return this.dt;
  }
  get height() {
    return this._t;
  }
  get textures() {
    return [...this.yt];
  }
}
class S {
  constructor(t, e, i) {
    h(this, "gt");
    h(this, "kt");
    h(this, "Bt", /* @__PURE__ */ new Map());
    h(this, "Lt", /* @__PURE__ */ new Map());
    h(this, "Ot", 0);
    this.gt = t, this.kt = this.Ht(e, i), this.Gt();
  }
  Gt() {
    const t = this.gt.getProgramParameter(this.kt, this.gt.ACTIVE_UNIFORMS);
    for (let e = 0; e < t; e++) {
      const i = this.gt.getActiveUniform(this.kt, e);
      if (i) {
        const s = this.gt.getUniformLocation(this.kt, i.name);
        if (s && (this.Bt.set(i.name, s), this.Lt.set(i.name, { type: i.type, size: i.size }), i.size > 1)) {
          const r = i.name.replace(/\[.*\]$/, "");
          this.Bt.has(r) || (this.Bt.set(r, s), this.Lt.set(r, { type: i.type, size: i.size }));
        }
      }
    }
  }
  Ht(t, e) {
    const i = this.It(this.gt.VERTEX_SHADER, t), s = this.It(this.gt.FRAGMENT_SHADER, e), r = this.gt.createProgram();
    if (this.gt.attachShader(r, i), this.gt.attachShader(r, s), this.gt.linkProgram(r), !this.gt.getProgramParameter(r, this.gt.LINK_STATUS)) {
      const n = this.gt.getProgramInfoLog(r);
      throw Error("Shader program link error: " + n);
    }
    return this.gt.deleteShader(i), this.gt.deleteShader(s), r;
  }
  It(t, e) {
    const i = this.gt.createShader(t);
    if (this.gt.shaderSource(i, e), this.gt.compileShader(i), !this.gt.getShaderParameter(i, this.gt.COMPILE_STATUS)) {
      const s = this.gt.getShaderInfoLog(i);
      throw this.gt.deleteShader(i), Error("Shader compilation error: " + s);
    }
    return i;
  }
  Nt() {
    this.gt.useProgram(this.kt), this.Xt();
  }
  Xt() {
    this.Ot = 0;
  }
  Wt(t) {
    for (const [e, i] of Object.entries(t)) this.Kt(e, i);
  }
  jt(t) {
    return this.Bt.has(t);
  }
  Yt(t) {
    return this.Lt.get(t) || null;
  }
  Vt() {
    const t = [];
    for (const [e, i] of this.Lt.entries()) t.push({ name: e, ...i });
    return t;
  }
  Kt(t, e) {
    var c;
    const i = this.Bt.get(t);
    if (!i) return;
    const s = this.Lt.get(t);
    if (!s) return void console.warn(`No type information found for uniform '${t}'`);
    const { type: r, size: n } = s, o = this.gt;
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
      const l = e, f = ((c = l[0]) == null ? void 0 : c.length) || 0, u = l.flat();
      switch (r) {
        case o.FLOAT_VEC2:
          f === 2 ? o.uniform2fv(i, u) : console.warn(`Vector length mismatch for '${t}': expected 2, got ${f}`);
          break;
        case o.FLOAT_VEC3:
          f === 3 ? o.uniform3fv(i, u) : console.warn(`Vector length mismatch for '${t}': expected 3, got ${f}`);
          break;
        case o.FLOAT_VEC4:
          f === 4 ? o.uniform4fv(i, u) : console.warn(`Vector length mismatch for '${t}': expected 4, got ${f}`);
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
      const l = this.qt();
      o.uniform1i(i, l), o.activeTexture(o.TEXTURE0 + l), o.bindTexture(o.TEXTURE_2D, e);
    } else if (e instanceof j) {
      const l = this.qt();
      o.uniform1i(i, l), o.activeTexture(o.TEXTURE0 + l), o.bindTexture(o.TEXTURE_2D, e.textures[0]);
    } else console.warn(`Unsupported uniform type for '${t}':`, typeof e);
  }
  qt() {
    return this.Ot++;
  }
  get Zt() {
    return this.kt;
  }
  Dt() {
    this.gt.deleteProgram(this.kt);
  }
}
const H = `#version 300 es
in vec2 a_position;in vec2 a_texCoord;in vec2 a_instancePosition;in vec2 a_instanceSize;in vec3 a_instanceCharacter;in vec4 a_instancePrimaryColor;in vec4 a_instanceSecondaryColor;in vec2 a_instanceRotation;in vec3 a_instanceTransform;in vec3 a_instanceGlobalRotation;in vec2 a_instanceRotationCenter;in vec2 a_instanceBezierCP1;in vec2 a_instanceBezierCP2;in vec2 a_instanceBezierStart;in vec2 a_instanceBezierEnd;in vec2 a_instanceArcAngles;uniform float U9;uniform vec2 Uw;out vec2 v_uv;out vec3 v_character;out vec4 v_primaryColor;out vec4 v_secondaryColor;out vec2 v_rotation;out vec3 v_transform;mat3 A(float B){float C=sin(B),D=cos(B);return mat3(1,0,0,0,D,-C,0,C,D);}mat3 E(float B){float C=sin(B),D=cos(B);return mat3(D,0,C,0,1,0,-C,0,D);}mat3 F(float B){float C=sin(B),D=cos(B);return mat3(D,-C,0,C,D,0,0,0,1);}vec2 G(float H,vec2 I,vec2 J,vec2 K,vec2 L){float M=1.-H,N=M*M,O=H*H;return N*M*I+3.*N*H*J+3.*M*O*K+O*H*L;}vec2 P(float H,vec2 I,vec2 J,vec2 K,vec2 L){float M=1.-H,N=M*M,O=H*H;return-3.*N*I+3.*N*J-6.*M*H*J+6.*M*H*K-3.*O*K+3.*O*L;}void main(){v_uv=a_texCoord;v_character=a_instanceCharacter;v_primaryColor=a_instancePrimaryColor;v_secondaryColor=a_instanceSecondaryColor;v_rotation=a_instanceRotation;v_transform=a_instanceTransform;vec2 Q;bool R=length(a_instanceBezierCP1)+length(a_instanceBezierCP2)+length(a_instanceBezierStart)+length(a_instanceBezierEnd)>0.;bool S=a_instanceArcAngles.x!=0.||a_instanceArcAngles.y!=0.;if(R){float H=a_position.x;vec2 T=G(H,a_instanceBezierStart,a_instanceBezierCP1,a_instanceBezierCP2,a_instanceBezierEnd);vec2 U=P(H,a_instanceBezierStart,a_instanceBezierCP1,a_instanceBezierCP2,a_instanceBezierEnd);float V=length(U);U=V>0.?U/V:vec2(1,0);Q=T+vec2(-U.y,U.x)*a_position.y*a_instanceSize.y;}else if(S){float C=a_instanceArcAngles.x,W=a_instanceArcAngles.y;C=mod(C,6.28318530718);if(C<0.)C+=6.28318530718;W=mod(W,6.28318530718);if(W<0.)W+=6.28318530718;float X=C-W;if(X<=0.)X+=6.28318530718;float Y=C-a_position.x*X;vec2 Z=vec2(cos(Y),sin(Y))*a_position.y;Q=Z*a_instanceSize*.5+a_instanceSize*.5+a_instancePosition;}else{Q=a_position*a_instanceSize+a_instancePosition;}vec2 a=(Q/Uw)*2.-1.;a.y=-a.y;if(length(a_instanceGlobalRotation)>0.){vec3 b=vec3(a-a_instanceRotationCenter,0);b.x*=U9;if(a_instanceGlobalRotation.x!=0.)b=A(-a_instanceGlobalRotation.x)*b;if(a_instanceGlobalRotation.y!=0.)b=E(-a_instanceGlobalRotation.y)*b;if(a_instanceGlobalRotation.z!=0.)b=F(-a_instanceGlobalRotation.z)*b;b.x/=U9;a=b.xy+a_instanceRotationCenter;}gl_Position=vec4(a,0,1);}`, st = "attribute vec2 a_position;attribute vec2 a_texCoord;varying vec2 v_uv;void main(){v_uv=a_texCoord;gl_Position=vec4(a_position,0.,1.);}";
class lt {
  constructor(t) {
    h(this, "gt");
    h(this, "Qt");
    h(this, "Jt");
    h(this, "ts");
    h(this, "ss");
    this.gt = t, this.Jt = new S(this.gt, H, `#version 300 es
precision highp float;in vec2 v_uv;in vec3 v_character;in vec4 v_primaryColor;in vec4 v_secondaryColor;in vec2 v_rotation;in vec3 v_transform;layout(location=0)out vec4 o_character;layout(location=1)out vec4 o_primaryColor;layout(location=2)out vec4 o_secondaryColor;layout(location=3)out vec4 o_rotation;layout(location=4)out vec4 o_transform;void main(){o_character=vec4(v_character,1.);o_primaryColor=v_primaryColor;o_secondaryColor=v_secondaryColor;o_rotation=vec4(v_rotation,0.,1.);o_transform=vec4(v_transform,1.);}`), this.Qt = new S(this.gt, H, `#version 300 es
precision highp float;in vec2 v_uv;uniform sampler2D Ue;uniform sampler2D Uf;uniform sampler2D Ug;uniform sampler2D Uh;uniform sampler2D Ui;uniform vec2 Uj;layout(location=0)out vec4 o_character;layout(location=1)out vec4 o_primaryColor;layout(location=2)out vec4 o_secondaryColor;layout(location=3)out vec4 o_rotation;layout(location=4)out vec4 o_transform;void main(){vec2 A=vec2(v_uv.x,1.-v_uv.y);vec2 B=A*Uj;vec2 C=(floor(B)+0.5f)/Uj;vec4 D=texture(Ue,C);vec4 E=texture(Uf,C);if(E.a==0.){discard;}vec4 F=texture(Ug,C);vec4 G=texture(Uh,C);vec4 H=texture(Ui,C);o_character=D;o_primaryColor=E;o_secondaryColor=F;o_rotation=G;o_transform=H;}`), this.ts = new S(this.gt, st, "precision mediump float;uniform sampler2D U0;uniform vec2 U1;uniform sampler2D U3;uniform sampler2D U4;uniform sampler2D U5;uniform sampler2D U2;uniform sampler2D U6;uniform vec2 U7;uniform vec2 U8;mat2 A(float B){float C=sin(B);float D=cos(B);return mat2(D,-C,C,D);}void main(){vec2 E=gl_FragCoord.xy/U8;vec2 F=E*U7;vec2 G=floor(F);vec2 H=(G+0.5)/U7;vec4 I=texture2D(U3,H);vec4 J=texture2D(U4,H);vec4 K=texture2D(U5,H);bool L=K.r>0.5;bool M=K.g>0.5;bool N=K.b>0.5;vec4 O=texture2D(U2,H);int P=int(O.r*255.+0.5)+int(O.g*255.+0.5)*256;int Q=int(mod(float(P),U1.x));int R=P/int(U1.x);float S=(U1.y-1.)-float(R);vec2 T=vec2(float(Q),S)/U1;vec4 U=texture2D(U6,H);float V=U.r*255.+U.g;float W=-(V*360./255.)*0.017453292;vec2 X=fract(F)-0.5;if(M)X.x=-X.x;if(N)X.y=-X.y;X=A(W)*X+0.5;vec2 Y=1./U1;vec2 Z=T+X*Y;vec2 a=T+Y;if(any(lessThan(Z,T))||any(greaterThan(Z,a))){gl_FragColor=L?I:J;return;}vec4 b=texture2D(U0,Z);if(L)b.rgb=1.-b.rgb;gl_FragColor=mix(J,I,b);}"), this.ss = new S(this.gt, H, `#version 300 es
precision highp float;in vec2 v_uv;uniform sampler2D Uk;uniform bool Ul;uniform bool Um;uniform bool Un;uniform vec2 Uo;uniform bool Up;uniform vec4 Uq;uniform bool Ur;uniform vec4 Us;uniform vec4 Ut;uniform int Uu;uniform vec3 Uv[64];layout(location=0)out vec4 o_character;layout(location=1)out vec4 o_primaryColor;layout(location=2)out vec4 o_secondaryColor;layout(location=3)out vec4 o_rotation;layout(location=4)out vec4 o_transform;float A(vec3 B){return dot(B,vec3(0.299f,0.587f,0.114f));}void main(){vec2 C=vec2(v_uv.x,1.0f-v_uv.y);vec4 D=texture(Uk,C);float E=A(D.rgb);if(Uu>0){float F=float(Uu);float G=clamp(E*(F-1.0f),0.0f,F-1.0f);int H=int(floor(G+0.5f));vec3 I=Uv[H];o_character=vec4(I,1.0f);}else{o_character=vec4(E,0.0f,0.0f,1.0f);}vec4 J=Up?Uq:D;vec4 K=Ur?Us:D;if(D.a<0.01f){J=Ut;K=Ut;}else{}o_primaryColor=vec4(J);o_secondaryColor=vec4(K);o_rotation=vec4(Uo.xy,0.0f,1.0f);o_transform=vec4(float(Ul),float(Um),float(Un),1.0f);}`);
  }
  es() {
    return this.Qt;
  }
  Pt() {
    return this.Jt;
  }
  rs() {
    return this.ts;
  }
  ns() {
    return this.ss;
  }
  hs(t) {
    return new S(this.gt, H, t);
  }
  cs(t, e) {
    return new S(this.gt, t, e);
  }
  Dt() {
    this.Qt.Dt(), this.Jt.Dt(), this.ts.Dt(), this.ss.Dt();
  }
}
var x = ((a) => (a.RECTANGLE = "rectangle", a.LINE = "line", a.ELLIPSE = "ellipse", a.ARC = "arc", a.TRIANGLE = "triangle", a.BEZIER_CURVE = "bezier_curve", a.CUSTOM = "custom", a))(x || {});
class ut {
  constructor(t) {
    h(this, "gt");
    h(this, "ls", /* @__PURE__ */ new Map());
    this.gt = t;
  }
  us(t, e, i, s) {
    const r = this.gt;
    let n = this.ls.get(t);
    n || (n = /* @__PURE__ */ new Map(), this.ls.set(t, n));
    let o = n.get(e) || null;
    if (!o) {
      o = r.createVertexArray(), n.set(e, o), r.bindVertexArray(o), r.bindBuffer(r.ARRAY_BUFFER, s);
      const c = r.getAttribLocation(t, "a_position");
      c !== -1 && (r.enableVertexAttribArray(c), r.vertexAttribPointer(c, i.ds.fs.size, r.FLOAT, !1, i.ps, i.ds.fs.offset), r.vertexAttribDivisor(c, 0));
      const l = r.getAttribLocation(t, "a_texCoord");
      l !== -1 && (r.enableVertexAttribArray(l), r.vertexAttribPointer(l, i.ds._s.size, r.FLOAT, !1, i.ps, i.ds._s.offset), r.vertexAttribDivisor(l, 0));
    }
    r.bindVertexArray(o);
  }
  vs() {
    this.gt.bindVertexArray(null);
  }
  Dt() {
    for (const [, t] of this.ls) for (const [, e] of t) e && this.gt.deleteVertexArray(e);
  }
}
class ft {
  constructor(t, e) {
    h(this, "gs");
    h(this, "gt");
    h(this, "xt");
    h(this, "As", null);
    h(this, "ws", null);
    this.gt = t, this.gs = new ut(t), this.xt = e;
  }
  Cs(t, e, i) {
    const { shader: s } = t, r = W(this.gt) || this.gt.getParameter(this.gt.VIEWPORT);
    s.Wt({ U9: r[2] / r[3], Uw: [r[2], r[3]] });
    const n = (l) => {
      if (!l || !l.bs()) return;
      const f = l.unitGeometry, u = l.unitBuffer;
      try {
        this.gs.us(s.Zt, l.type + "", f, u), l.batch.Ms(s), l.batch.Fs(f.zs, f.Rs);
      } finally {
        l.batch.Ts(s), this.gs.vs(), l.Ps();
      }
    };
    let o = null, c = null;
    for (const l of e) {
      if (l.type === x.CUSTOM) {
        c && (n(c), o = null, c = null), this.Ss(t, l.params, l.state, i.get(x.RECTANGLE));
        continue;
      }
      o !== null && l.type !== o && (n(c), o = null, c = null);
      let f = c;
      f && l.type === o || (f = i.get(l.type) || null, c = f, o = l.type), f && f.$s(l.params, l.state);
    }
    n(c);
  }
  Ss(t, e, i, s) {
    const { x: r, y: n, width: o, height: c, shader: l, uniforms: f } = e, u = this.Es(Math.max(1, Math.floor(o)), Math.max(1, Math.floor(c)));
    u.begin(), this.Ds(s, l, f, 0, 0, u.width, u.height, {}), u.end();
    const m = this.ks(), p = { Ue: u.textures[0], Uf: u.textures[1], Ug: u.textures[2], Uh: u.textures[3], Ui: u.textures[4], Uj: [u.width, u.height] };
    this.Ds(s, m, p, Math.floor(r), Math.floor(n), Math.max(1, Math.floor(o)), Math.max(1, Math.floor(c)), i), t.shader.Nt();
  }
  Ds(t, e, i, s, r, n, o, c) {
    e.Nt(), e.Wt(i);
    const l = this.gt.getParameter(this.gt.VIEWPORT);
    if (e.Wt({ U9: l[2] / l[3], Uw: [l[2], l[3]] }), t.Ps(), t.$s({ x: s, y: r, width: n, height: o }, c), t.bs()) {
      const f = t.unitGeometry, u = t.unitBuffer;
      try {
        this.gs.us(e.Zt, t.type + "", f, u), t.batch.Ms(e), t.batch.Fs(f.zs, f.Rs);
      } finally {
        t.batch.Ts(e), this.gs.vs(), t.Ps();
      }
    }
  }
  ks() {
    return this.xt.es();
  }
  Es(t, e) {
    return this.As && this.ws && this.ws.w === t && this.ws.h === e || (this.As && this.As.Dt(), this.As = new j(this.gt, t, e, 5), this.ws = { w: t, h: e }), this.As;
  }
  Dt() {
    this.gs.Dt(), this.As && this.As.Dt();
  }
}
class dt {
  constructor() {
    h(this, "Bs", []);
    h(this, "Ls", 1);
    h(this, "Os", 0);
  }
  Hs(t) {
    if (this.Os >= this.Bs.length) {
      const i = { id: this.Ls++, type: t, params: {}, state: { I: 1, N: 0, X: 0, W: 0, Y: [0, 0, 0], V: [1, 1, 1, 1], q: [0, 0, 0, 1], K: !1, j: !1, k: !1, L: [0, 0] } };
      this.Bs.push(i);
    }
    const e = this.Bs[this.Os];
    return e.id = this.Ls++, e.type = t, this.Os++, e;
  }
  Gs(t, e, i, s, r) {
    const n = this.Hs(x.RECTANGLE);
    return n.params.x = t, n.params.y = e, n.params.width = i, n.params.height = s, r.J(n.state), n.id;
  }
  Is(t, e, i, s, r, n, o) {
    const c = this.Hs(x.CUSTOM);
    return c.params.x = t, c.params.y = e, c.params.width = i, c.params.height = s, c.params.shader = r, c.params.uniforms = n, o.J(c.state), c.id;
  }
  Ns(t, e, i, s, r, n) {
    const o = this.Hs(x.LINE);
    return o.params.x1 = t, o.params.y1 = e, o.params.x2 = i, o.params.y2 = s, o.params.thickness = r, n.J(o.state), o.id;
  }
  Xs(t, e, i, s, r) {
    const n = this.Hs(x.ELLIPSE);
    return n.params.x = t, n.params.y = e, n.params.width = i, n.params.height = s, r.J(n.state), n.id;
  }
  Ws(t, e, i, s, r, n, o) {
    const c = this.Hs(x.ARC);
    return c.params.x = t, c.params.y = e, c.params.width = i, c.params.height = s, c.params.start = r, c.params.stop = n, o.J(c.state), c.id;
  }
  Ks(t, e, i, s, r, n, o) {
    const c = this.Hs(x.TRIANGLE);
    return c.params.x1 = t, c.params.y1 = e, c.params.x2 = i, c.params.y2 = s, c.params.x3 = r, c.params.y3 = n, o.J(c.state), c.id;
  }
  js(t, e, i, s, r, n, o, c, l, f) {
    const u = this.Hs(x.BEZIER_CURVE);
    return u.params.x1 = t, u.params.y1 = e, u.params.cp1x = i, u.params.cp1y = s, u.params.cp2x = r, u.params.cp2y = n, u.params.x2 = o, u.params.y2 = c, u.params.thickness = l, f.J(u.state), u.id;
  }
  get length() {
    return this.Os;
  }
  get isEmpty() {
    return this.Os === 0;
  }
  Ys() {
    this.Os = 0;
  }
  [Symbol.iterator]() {
    let t = 0;
    const e = this.Os, i = this.Bs;
    return { next: () => t < e ? { value: i[t++], done: !1 } : { value: void 0, done: !0 } };
  }
}
const M = class M {
  static Vs(t, e, i = 0) {
    var n, o, c, l, f, u, m, p, g, d;
    const s = e || new Float32Array(M.FLOATS_PER_INSTANCE);
    let r = i;
    return s[r++] = t.fs[0], s[r++] = t.fs[1], s[r++] = t.Os[0], s[r++] = t.Os[1], s[r++] = t.Y[0], s[r++] = t.Y[1], s[r++] = t.Y[2], s[r++] = t.V[0], s[r++] = t.V[1], s[r++] = t.V[2], s[r++] = t.V[3], s[r++] = t.q[0], s[r++] = t.q[1], s[r++] = t.q[2], s[r++] = t.q[3], s[r++] = t.L[0], s[r++] = t.L[1], s[r++] = t.qs[0], s[r++] = t.qs[1], s[r++] = t.qs[2], s[r++] = t.N, s[r++] = t.X, s[r++] = t.W, s[r++] = t.Zs[0], s[r++] = t.Zs[1], s[r++] = ((n = t.Qs) == null ? void 0 : n[0]) || 0, s[r++] = ((o = t.Qs) == null ? void 0 : o[1]) || 0, s[r++] = ((c = t.Js) == null ? void 0 : c[0]) || 0, s[r++] = ((l = t.Js) == null ? void 0 : l[1]) || 0, s[r++] = ((f = t.te) == null ? void 0 : f[0]) || 0, s[r++] = ((u = t.te) == null ? void 0 : u[1]) || 0, s[r++] = ((m = t.se) == null ? void 0 : m[0]) || 0, s[r++] = ((p = t.se) == null ? void 0 : p[1]) || 0, s[r++] = ((g = t.ee) == null ? void 0 : g[0]) || 0, s[r++] = ((d = t.ee) == null ? void 0 : d[1]) || 0, s;
  }
  static ie(t) {
    const e = t.length * M.FLOATS_PER_INSTANCE, i = new Float32Array(e);
    for (let s = 0; s < t.length; s++) {
      const r = s * M.FLOATS_PER_INSTANCE;
      M.Vs(t[s], i, r);
    }
    return i;
  }
};
h(M, "BYTES_PER_INSTANCE", 140), h(M, "FLOATS_PER_INSTANCE", 35);
let _ = M;
const b = class b {
};
h(b, "STRIDE", _.BYTES_PER_INSTANCE), h(b, "ATTRIBUTES", { a_instancePosition: { location: -1, size: 2, type: WebGL2RenderingContext.FLOAT, normalized: !1, stride: b.STRIDE, offset: 0, divisor: 1 }, a_instanceSize: { location: -1, size: 2, type: WebGL2RenderingContext.FLOAT, normalized: !1, stride: b.STRIDE, offset: 8, divisor: 1 }, a_instanceCharacter: { location: -1, size: 3, type: WebGL2RenderingContext.FLOAT, normalized: !1, stride: b.STRIDE, offset: 16, divisor: 1 }, a_instancePrimaryColor: { location: -1, size: 4, type: WebGL2RenderingContext.FLOAT, normalized: !1, stride: b.STRIDE, offset: 28, divisor: 1 }, a_instanceSecondaryColor: { location: -1, size: 4, type: WebGL2RenderingContext.FLOAT, normalized: !1, stride: b.STRIDE, offset: 44, divisor: 1 }, a_instanceRotation: { location: -1, size: 2, type: WebGL2RenderingContext.FLOAT, normalized: !1, stride: b.STRIDE, offset: 60, divisor: 1 }, a_instanceTransform: { location: -1, size: 3, type: WebGL2RenderingContext.FLOAT, normalized: !1, stride: b.STRIDE, offset: 68, divisor: 1 }, a_instanceGlobalRotation: { location: -1, size: 3, type: WebGL2RenderingContext.FLOAT, normalized: !1, stride: b.STRIDE, offset: 80, divisor: 1 }, a_instanceRotationCenter: { location: -1, size: 2, type: WebGL2RenderingContext.FLOAT, normalized: !1, stride: b.STRIDE, offset: 92, divisor: 1 }, a_instanceArcAngles: { location: -1, size: 2, type: WebGL2RenderingContext.FLOAT, normalized: !1, stride: b.STRIDE, offset: 100, divisor: 1 }, a_instanceBezierCP1: { location: -1, size: 2, type: WebGL2RenderingContext.FLOAT, normalized: !1, stride: b.STRIDE, offset: 108, divisor: 1 }, a_instanceBezierCP2: { location: -1, size: 2, type: WebGL2RenderingContext.FLOAT, normalized: !1, stride: b.STRIDE, offset: 116, divisor: 1 }, a_instanceBezierStart: { location: -1, size: 2, type: WebGL2RenderingContext.FLOAT, normalized: !1, stride: b.STRIDE, offset: 124, divisor: 1 }, a_instanceBezierEnd: { location: -1, size: 2, type: WebGL2RenderingContext.FLOAT, normalized: !1, stride: b.STRIDE, offset: 132, divisor: 1 } });
let k = b;
class gt {
  constructor(t, e = 1e3, i = 1.5) {
    h(this, "gt");
    h(this, "re", []);
    h(this, "ne");
    h(this, "oe");
    h(this, "he", null);
    h(this, "ae", !0);
    h(this, "ce", 0);
    h(this, "le", /* @__PURE__ */ new Map());
    h(this, "ue", null);
    this.gt = t, this.ne = e, this.oe = i, this.fe();
  }
  $s(t) {
    const e = this.re.length;
    return this.re.push(t), this.ae = !0, e;
  }
  get count() {
    return this.re.length;
  }
  get isEmpty() {
    return this.re.length === 0;
  }
  clear() {
    this.re.length = 0, this.ae = !0;
  }
  de(t) {
    if (t <= this.ne) return;
    const e = Math.ceil(t * this.oe);
    this.ne = e, this.fe();
  }
  fe() {
    const t = this.gt;
    this.he && t.deleteBuffer(this.he), this.he = t.createBuffer();
    const e = this.ne * _.BYTES_PER_INSTANCE;
    t.bindBuffer(t.ARRAY_BUFFER, this.he), t.bufferData(t.ARRAY_BUFFER, e, t.DYNAMIC_DRAW), t.bindBuffer(t.ARRAY_BUFFER, null), this.ae = !0, this.ce = 0;
  }
  pe() {
    if (!this.ae || this.re.length === 0) return;
    const t = this.gt, e = this.re.length;
    this.de(e), (!this.ue || this.ue.length < e * _.FLOATS_PER_INSTANCE) && (this.ue = new Float32Array(e * _.FLOATS_PER_INSTANCE));
    const i = _.ie(this.re);
    t.bindBuffer(t.ARRAY_BUFFER, this.he), e <= this.ce ? t.bufferSubData(t.ARRAY_BUFFER, 0, i) : t.bufferData(t.ARRAY_BUFFER, i, t.DYNAMIC_DRAW), t.bindBuffer(t.ARRAY_BUFFER, null), this.ae = !1, this.ce = e;
  }
  _e(t) {
    let e = this.le.get(t);
    if (!e) {
      e = /* @__PURE__ */ new Map();
      const i = this.gt;
      for (const s in k.ATTRIBUTES) {
        const r = i.getAttribLocation(t, s);
        r !== -1 && e.set(s, r);
      }
      this.le.set(t, e);
    }
    return e;
  }
  Ms(t) {
    if (!this.he || this.re.length === 0) return;
    const e = this.gt, i = t.Zt;
    this.pe();
    const s = this._e(i);
    e.bindBuffer(e.ARRAY_BUFFER, this.he);
    for (const [r, n] of s) {
      const o = k.ATTRIBUTES[r];
      o && (e.enableVertexAttribArray(n), e.vertexAttribPointer(n, o.size, o.type, o.normalized, o.stride, o.offset), e.vertexAttribDivisor(n, o.divisor));
    }
  }
  Ts(t) {
    const e = this.gt, i = this._e(t.Zt);
    for (const [, s] of i) e.disableVertexAttribArray(s), e.vertexAttribDivisor(s, 0);
  }
  Fs(t, e) {
    this.re.length !== 0 && this.gt.drawArraysInstanced(t, 0, e, this.re.length);
  }
  Dt() {
    this.he && this.gt.deleteBuffer(this.he);
  }
}
class B {
  constructor(t, e, i, s) {
    h(this, "gt");
    h(this, "me");
    h(this, "ve");
    h(this, "ge");
    h(this, "Ae", null);
    this.gt = t, this.me = e, this.ve = i, this.ge = s;
    const r = this.gt.createBuffer();
    if (!r) throw Error("Failed to create unit geometry buffer");
    this.gt.bindBuffer(this.gt.ARRAY_BUFFER, r), this.gt.bufferData(this.gt.ARRAY_BUFFER, this.ge.ye, this.gt.STATIC_DRAW), this.gt.bindBuffer(this.gt.ARRAY_BUFFER, null), this.Ae = r;
  }
  get type() {
    return this.ve;
  }
  get unitGeometry() {
    return this.ge;
  }
  get unitBuffer() {
    return this.Ae;
  }
  get batch() {
    return this.me;
  }
  Ps() {
    this.me.clear();
  }
  bs() {
    return !this.me.isEmpty;
  }
  Dt() {
    this.me.Dt(), this.gt.deleteBuffer(this.Ae);
  }
  we(t, e, i, s, r) {
    const n = this.Ce(t, e, i, s, r.N || 0, r.X || 0, r.W || 0);
    return { fs: [t, e], Os: [i, s], Y: r.Y || [0, 0, 0], V: r.V || [1, 1, 1, 1], q: r.q || [0, 0, 0, 1], L: r.L || [0, 0], qs: [r.k ? 1 : 0, r.K ? 1 : 0, r.j ? 1 : 0], N: n.radiansX, X: n.radiansY, W: n.radiansZ, Zs: [n.centerX, n.centerY] };
  }
  be(t, e) {
    const i = W(this.gt) || [0, 0, this.gt.canvas.width, this.gt.canvas.height];
    return { nx: t / i[2] * 2 - 1, ny: 1 - e / i[3] * 2 };
  }
  xe(t, e, i) {
    const s = this.be(e, i);
    t.Zs = [s.nx, s.ny];
  }
  Ce(t, e, i, s, r, n, o) {
    const c = W(this.gt) || [0, 0, this.gt.canvas.width, this.gt.canvas.height], l = c[2], f = c[3];
    return { centerX: (t + i / 2) / l * 2 - 1, centerY: 1 - (e + s / 2) / f * 2, radiansX: -r * Math.PI / 180, radiansY: -n * Math.PI / 180, radiansZ: -o * Math.PI / 180, aspectRatio: l / f };
  }
}
const mt = { ye: new Float32Array([0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 1]), Rs: 6, zs: WebGL2RenderingContext.TRIANGLES, ps: 16, ds: { fs: { size: 2, offset: 0 }, _s: { size: 2, offset: 8 } } };
class At extends B {
  constructor(t, e) {
    super(t, e, x.RECTANGLE, mt);
  }
  $s(t, e) {
    const i = this.we(t.x, t.y, t.width, t.height, e);
    return this.me.$s(i);
  }
}
const pt = { ye: new Float32Array([0, -0.5, 0, 0, 1, -0.5, 1, 0, 0, 0.5, 0, 1, 0, 0.5, 0, 1, 1, -0.5, 1, 0, 1, 0.5, 1, 1]), Rs: 6, zs: WebGL2RenderingContext.TRIANGLES, ps: 16, ds: { fs: { size: 2, offset: 0 }, _s: { size: 2, offset: 8 } } };
class vt extends B {
  constructor(t, e) {
    super(t, e, x.LINE, pt);
  }
  $s(t, e) {
    const i = t.x2 - t.x1, s = t.y2 - t.y1, r = Math.hypot(i, s), n = t.thickness || e.I || 1, o = t.x1 + i / 2, c = t.y1 + s / 2, l = o - r / 2, f = c, u = this.we(l, f, r, n, e);
    return this.xe(u, o, c), this.me.$s(u);
  }
}
const yt = { ye: function(a = 32) {
  const t = [], e = 2 * Math.PI / a;
  for (let i = 0; i < a; i++) {
    const s = i * e, r = (i + 1) % a * e, n = Math.cos(s), o = Math.sin(s), c = 0.5 * (n + 1), l = 0.5 * (o + 1), f = Math.cos(r), u = Math.sin(r), m = 0.5 * (f + 1), p = 0.5 * (u + 1);
    t.push(0, 0, 0.5, 0.5, n, o, c, l, f, u, m, p);
  }
  return new Float32Array(t);
}(32), Rs: 96, zs: WebGL2RenderingContext.TRIANGLES, ps: 16, ds: { fs: { size: 2, offset: 0 }, _s: { size: 2, offset: 8 } } };
class xt extends B {
  constructor(t, e) {
    super(t, e, x.ELLIPSE, yt);
  }
  $s(t, e) {
    const i = this.we(t.x, t.y, t.width, t.height, e);
    return this.xe(i, t.x, t.y), this.me.$s(i);
  }
}
let wt = { ye: function(a) {
  const t = [];
  for (let e = 0; e < a; e++) {
    const i = e / a, s = (e + 1) / a;
    t.push(i, 0, i, 0, i, 1, i, 1, s, 1, s, 1);
  }
  return new Float32Array(t);
}(32), Rs: 96, zs: WebGL2RenderingContext.TRIANGLES, ps: 16, ds: { fs: { size: 2, offset: 0 }, _s: { size: 2, offset: 8 } } };
class Et extends B {
  constructor(t, e) {
    super(t, e, x.ARC, wt);
  }
  $s(t, e) {
    const i = t.x - t.width / 2, s = t.y - t.height / 2, r = t.start * Math.PI / 180, n = t.stop * Math.PI / 180, o = this.we(i, s, t.width, t.height, e);
    return this.xe(o, t.x, t.y), o.Qs = [r, n], this.me.$s(o);
  }
}
const Tt = { ye: new Float32Array([0, 0, 0, 0, 1, 0, 1, 0, 0.5, 1, 0.5, 1]), Rs: 3, zs: WebGL2RenderingContext.TRIANGLES, ps: 16, ds: { fs: { size: 2, offset: 0 }, _s: { size: 2, offset: 8 } } };
class Rt extends B {
  constructor(t, e) {
    super(t, e, x.TRIANGLE, Tt);
  }
  $s(t, e) {
    const i = Math.min(t.x1, t.x2, t.x3), s = Math.max(t.x1, t.x2, t.x3), r = Math.min(t.y1, t.y2, t.y3), n = s - i, o = Math.max(t.y1, t.y2, t.y3) - r, c = this.we(i, r, n, o, e), l = i + 0.5 * n, f = r + o * (1 / 3);
    return this.xe(c, l, f), this.me.$s(c);
  }
}
function $(a, t, e, i, s) {
  const r = 1 - a, n = r * r, o = a * a;
  return n * r * t + 3 * n * a * e + 3 * r * o * i + o * a * s;
}
const bt = { ye: function(a = 16) {
  const t = [];
  for (let e = 0; e < a; e++) {
    const i = e / a, s = (e + 1) / a;
    t.push(i, -0.5, i, 0), t.push(s, -0.5, s, 0), t.push(i, 0.5, i, 1), t.push(i, 0.5, i, 1), t.push(s, -0.5, s, 0), t.push(s, 0.5, s, 1);
  }
  return new Float32Array(t);
}(16), Rs: 96, zs: WebGL2RenderingContext.TRIANGLES, ps: 16, ds: { fs: { size: 2, offset: 0 }, _s: { size: 2, offset: 8 } } };
class Ct extends B {
  constructor(t, e) {
    super(t, e, x.BEZIER_CURVE, bt);
  }
  $s(t, e) {
    const i = e.I || 1, s = $(0.5, t.x1, t.cp1x, t.cp2x, t.x2), r = $(0.5, t.y1, t.cp1y, t.cp2y, t.y2), n = this.we(0, 0, 1, i, e);
    return this.xe(n, s, r), n.se = [t.x1, t.y1], n.Js = [t.cp1x, t.cp1y], n.te = [t.cp2x, t.cp2y], n.ee = [t.x2, t.y2], this.me.$s(n);
  }
}
class Ut {
  constructor(t) {
    h(this, "gt");
    h(this, "Me", null);
    h(this, "Fe");
    h(this, "ze", null);
    h(this, "Re", {});
    h(this, "Te", null);
    h(this, "Pe", /* @__PURE__ */ new Map());
    h(this, "Se");
    h(this, "$e");
    h(this, "Ee");
    h(this, "H", []);
    this.gt = t, this.Fe = new lt(t), this.Ee = new it(), this.Se = new ft(t, this), this.$e = new dt(), this.Te = t.createBuffer(), Y(this.gt, [0, 0, this.gt.canvas.width, this.gt.canvas.height]);
  }
  De(t) {
    let e = this.Pe.get(t);
    if (e) return e;
    const i = new gt(this.gt);
    return e = (0, { [x.RECTANGLE]: () => new At(this.gt, i), [x.LINE]: () => new vt(this.gt, i), [x.ELLIPSE]: () => new xt(this.gt, i), [x.ARC]: () => new Et(this.gt, i), [x.TRIANGLE]: () => new Rt(this.gt, i), [x.BEZIER_CURVE]: () => new Ct(this.gt, i) }[t])(), this.Pe.set(t, e), e;
  }
  ke(t) {
    this.Me !== t && (this.Me = t, t.Nt());
  }
  cs(t, e) {
    return this.Fe.cs(t, e);
  }
  es() {
    return this.Fe.es();
  }
  Pt() {
    return this.Fe.Pt();
  }
  rs() {
    return this.Fe.rs();
  }
  ns() {
    return this.Fe.ns();
  }
  Be(t) {
    this.ze = t, t && (this.Re = {});
  }
  Kt(t, e) {
    this.Re[t] = e;
  }
  Le(t) {
    Object.assign(this.Re, t);
  }
  hs(t) {
    return this.Fe.hs(t);
  }
  Oe(t, e, i, s, r) {
    const n = this.es(), o = { Ue: t.textures[0], Uf: t.textures[1], Ug: t.textures[2], Uh: t.textures[3], Ui: t.textures[4], Uj: [t.width, t.height] };
    this.$e.Is(e, i, s, r, n, o, this.Ee);
  }
  He(t, e, i, s, r) {
    const n = this.ns(), o = t.Ge(), c = { Uk: o.texture, Ul: !!o.invert, Um: !!o.flipX, Un: !!o.flipY, Uo: o.charRotation, Up: o.charColorFixed, Uq: o.charColor, Ur: o.cellColorFixed, Us: o.cellColor, Ut: o.backgroundColor, Uu: o.charCount, Uv: o.charList };
    this.$e.Is(e, i, s, r, n, c, this.Ee);
  }
  Ie(t, e, i, s) {
    var d;
    const r = this.gt, n = r.canvas.width, o = r.canvas.height, c = t / n * 2 - 1, l = (t + i) / n * 2 - 1, f = 1 - e / o * 2, u = 1 - (e + s) / o * 2, m = new Float32Array([c, u, l, u, c, f, l, u, l, f, c, f]);
    r.bindBuffer(r.ARRAY_BUFFER, this.Te), r.bufferData(r.ARRAY_BUFFER, m, r.DYNAMIC_DRAW);
    const p = ((d = this.Me) == null ? void 0 : d.Zt) || r.getParameter(r.CURRENT_PROGRAM), g = p ? r.getAttribLocation(p, "a_position") : -1;
    g !== -1 && (r.enableVertexAttribArray(g), r.vertexAttribPointer(g, 2, r.FLOAT, !1, 8, 0)), r.drawArrays(r.TRIANGLES, 0, 6), g !== -1 && r.disableVertexAttribArray(g);
  }
  Ne(t, e, i, s) {
    this.ze ? (this.$e.Is(t, e, i, s, this.ze, { ...this.Re }, this.Ee), this.ze = null, this.Re = {}) : this.$e.Gs(t, e, i, s, this.Ee);
  }
  Xe(t, e, i, s) {
    this.$e.Ns(t, e, i, s, this.Ee.lineWeight, this.Ee);
  }
  We(t, e, i, s) {
    this.$e.Xs(t, e, i, s, this.Ee);
  }
  Ke(t, e, i, s, r, n) {
    this.$e.Ks(t, e, i, s, r, n, this.Ee);
  }
  je(t, e, i, s, r, n, o, c) {
    const l = this.Ee.lineWeight;
    this.$e.js(t, e, i, s, r, n, o, c, l, this.Ee);
  }
  Ye(t, e, i = 1, s = {}) {
    return new j(this.gt, t, e, i, s, this, !0);
  }
  Ve(t, e, i, s, r, n) {
    this.$e.Ws(t, e, i, s, r, n, this.Ee);
  }
  qe(t, e = t, i = t, s = 255) {
    this.Ee.ft(t, e, i, s), this.Ys(t / 255, e / 255, i / 255, s / 255);
  }
  Ys(t = 0, e = 0, i = 0, s = 0) {
    this.gt.clearColor(t, e, i, s), this.gt.clear(this.gt.COLOR_BUFFER_BIT);
  }
  Ze() {
    this.gt.viewport(0, 0, this.gt.canvas.width, this.gt.canvas.height), Y(this.gt, [0, 0, this.gt.canvas.width, this.gt.canvas.height]);
  }
  get context() {
    return this.gt;
  }
  get state() {
    return this.Ee;
  }
  $t(t) {
    this.H.push(this.Ee), this.Ee = t;
  }
  Et() {
    const t = this.H.pop();
    t && (this.Ee = t);
  }
  St(t) {
    const e = t, i = W(this.gt) ?? this.gt.getParameter(this.gt.VIEWPORT), s = { shader: e, gl: this.gt, viewport: i };
    this.ke(e);
    const r = /* @__PURE__ */ new Set();
    for (const n of this.$e) n.type === x.CUSTOM ? r.add(x.RECTANGLE) : r.add(n.type);
    for (const n of r) n !== x.CUSTOM && this.De(n);
    this.Se.Cs(s, this.$e, this.Pe), this.$e.Ys();
  }
  Dt() {
    this.gt.deleteBuffer(this.Te), this.$e.Ys();
    for (const t of this.Pe.values()) t.Dt();
    this.Fe.Dt(), this.Se.Dt();
  }
}
const E = { readShort: (a, t) => (E.t.uint16[0] = a[t] << 8 | a[t + 1], E.t.int16[0]), readUshort: (a, t) => a[t] << 8 | a[t + 1], readUshorts(a, t, e) {
  const i = [];
  for (let s = 0; s < e; s++) i.push(E.readUshort(a, t + 2 * s));
  return i;
}, readUint(a, t) {
  const e = E.t.uint8;
  return e[3] = a[t], e[2] = a[t + 1], e[1] = a[t + 2], e[0] = a[t + 3], E.t.uint32[0];
}, readASCII(a, t, e) {
  let i = "";
  for (let s = 0; s < e; s++) i += String.fromCharCode(a[t + s]);
  return i;
}, writeUshort(a, t, e) {
  a[t] = e >>> 8 & 255, a[t + 1] = 255 & e;
}, writeUint(a, t, e) {
  a[t] = e >>> 24 & 255, a[t + 1] = e >>> 16 & 255, a[t + 2] = e >>> 8 & 255, a[t + 3] = 255 & e;
}, writeASCII(a, t, e) {
  for (let i = 0; i < e.length; i++) a[t + i] = 255 & e.charCodeAt(i);
}, t: (() => {
  const a = new ArrayBuffer(8);
  return { uint8: new Uint8Array(a), int16: new Int16Array(a), uint16: new Uint16Array(a), uint32: new Uint32Array(a) };
})() };
function X(a) {
  return a + 3 & -4;
}
function V(a, t, e) {
  const i = t + e;
  let s = 0;
  const r = E.t;
  for (let n = t; n < i; n += 4) r.uint8[3] = a[n] || 0, r.uint8[2] = a[n + 1] || 0, r.uint8[1] = a[n + 2] || 0, r.uint8[0] = a[n + 3] || 0, s = s + (r.uint32[0] >>> 0) >>> 0;
  return s >>> 0;
}
class Ft {
  constructor(t) {
    h(this, "b");
    h(this, "p", 0);
    h(this, "bitbuf", 0);
    h(this, "bitcnt", 0);
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
function N(a) {
  let t = 32, e = 0;
  for (const o of a) o && (o < t && (t = o), o > e && (e = o));
  if (e === 0) return { min: 0, max: 0, table: /* @__PURE__ */ new Map() };
  const i = new Uint32Array(e + 1);
  for (const o of a) o && i[o]++;
  const s = new Uint32Array(e + 1);
  let r = 0;
  i[0] = 0;
  for (let o = 1; o <= e; o++) r = r + i[o - 1] << 1, s[o] = r;
  const n = /* @__PURE__ */ new Map();
  for (let o = 0; o < a.length; o++) {
    const c = a[o];
    if (!c) continue;
    const l = s[c]++;
    let f = n.get(c);
    f || (f = [], n.set(c, f)), f[Pt(l, c)] = o;
  }
  return { min: t, max: e, table: n };
}
function q(a, t) {
  let e = 0;
  for (let i = 1; i <= t.max; i++) {
    e |= a.readBits(1) << i - 1;
    const s = t.table.get(i);
    if (s && e < s.length) {
      const r = s[e];
      if (r !== void 0) return r;
    }
  }
  throw Error("Invalid Huffman code");
}
function Pt(a, t) {
  let e = 0;
  for (let i = 0; i < t; i++) e = e << 1 | 1 & a, a >>>= 1;
  return e >>> 0;
}
function Ot(a) {
  if (a.length < 2) throw Error("ZLIB data too short");
  const t = a[0], e = a[1];
  if ((15 & t) != 8) throw Error("Unsupported ZLIB compression method");
  if (((t << 8) + e) % 31 != 0) throw Error("Bad ZLIB header check");
  let i = 2;
  32 & e && (i += 4);
  const s = [];
  return function(r, n) {
    const o = [3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258], c = [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0], l = [1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577], f = [0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13];
    let u = 0;
    for (; !u; ) {
      u = r.readBits(1);
      const m = r.readBits(2);
      if (m === 0) {
        r.alignToByte();
        const p = r.readBits(16);
        if ((65535 & (65535 ^ p)) !== r.readBits(16)) throw Error("DEFLATE uncompressed LEN/NLEN mismatch");
        for (let g = 0; g < p; g++) n.push(r.readBits(8));
      } else {
        if (m !== 1 && m !== 2) throw Error("Unsupported DEFLATE type");
        {
          let p, g;
          if (m === 1) {
            const d = Array(288).fill(0);
            for (let v = 0; v <= 143; v++) d[v] = 8;
            for (let v = 144; v <= 255; v++) d[v] = 9;
            for (let v = 256; v <= 279; v++) d[v] = 7;
            for (let v = 280; v <= 287; v++) d[v] = 8;
            p = N(d), g = N(Array(32).fill(5));
          } else {
            const d = r.readBits(5) + 257, v = r.readBits(5) + 1, A = r.readBits(4) + 4, w = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15], y = Array(19).fill(0);
            for (let F = 0; F < A; F++) y[w[F]] = r.readBits(3);
            const U = N(y), T = [];
            for (; T.length < d + v; ) {
              const F = q(r, U);
              if (F <= 15) T.push(F);
              else if (F === 16) {
                const I = r.readBits(2) + 3, L = T[T.length - 1] || 0;
                for (let J = 0; J < I; J++) T.push(L);
              } else if (F === 17) {
                const I = r.readBits(3) + 3;
                for (let L = 0; L < I; L++) T.push(0);
              } else {
                if (F !== 18) throw Error("Invalid code length symbol");
                {
                  const I = r.readBits(7) + 11;
                  for (let L = 0; L < I; L++) T.push(0);
                }
              }
            }
            const R = T.slice(0, d), P = T.slice(d, d + v);
            p = N(R), g = N(P);
          }
          for (; ; ) {
            const d = q(r, p);
            if (d < 256) n.push(d);
            else {
              if (d === 256) break;
              if (d > 256 && d < 286) {
                const v = d - 257;
                let A = o[v];
                const w = c[v];
                w && (A += r.readBits(w));
                const y = q(r, g);
                if (y >= 30) throw Error("Invalid distance symbol");
                let U = l[y];
                const T = f[y];
                T && (U += r.readBits(T));
                const R = n.length - U;
                if (R < 0) throw Error("Invalid distance");
                for (let P = 0; P < A; P++) n.push(n[R + P] || 0);
              } else if (d === 286 || d === 287) throw Error("Reserved length symbol");
            }
          }
        }
      }
    }
  }(new Ft(a.subarray(i)), s), new Uint8Array(s);
}
function Mt(a) {
  const t = E, e = new Uint8Array(a);
  if (t.readASCII(e, 0, 4) !== "wOFF") throw Error("Invalid WOFF signature");
  const i = t.readUint(e, 4), s = t.readUshort(e, 12), r = t.readUint(e, 16), n = [];
  let o = 44;
  for (let A = 0; A < s; A++) {
    const w = t.readASCII(e, o, 4), y = t.readUint(e, o + 4), U = t.readUint(e, o + 8), T = t.readUint(e, o + 12), R = t.readUint(e, o + 16);
    n.push({ tag: w, offset: y, compLength: U, origLength: T, checksum: R }), o += 20;
  }
  for (const A of n) {
    const w = new Uint8Array(e.buffer, A.offset, A.compLength);
    if (A.compLength === A.origLength) A.data = new Uint8Array(w);
    else if (A.data = Ot(w), A.data.length !== A.origLength) if (A.data.length < A.origLength) {
      const y = new Uint8Array(A.origLength);
      y.set(A.data), A.data = y;
    } else A.data = A.data.subarray(0, A.origLength);
  }
  const c = s;
  let l = 1, f = 0;
  for (; l << 1 <= c; ) l <<= 1, f++;
  const u = 16 * l, m = 16 * c - u;
  let p = 12 + 16 * c;
  const g = {};
  for (const A of n) g[A.tag] = p, p = X(p + A.data.length);
  const d = new Uint8Array(Math.max(r || 0, p));
  t.writeUint(d, 0, i), t.writeUshort(d, 4, c), t.writeUshort(d, 6, u), t.writeUshort(d, 8, f), t.writeUshort(d, 10, m);
  let v = 12;
  for (const A of n) {
    t.writeASCII(d, v, A.tag), v += 4;
    let w = A.data;
    if (A.tag === "head" && w.length >= 12) {
      const y = new Uint8Array(w);
      t.writeUint(y, 8, 0);
      const U = V(y, 0, X(y.length));
      t.writeUint(d, v, U), v += 4;
    } else {
      const y = V(w, 0, X(w.length));
      t.writeUint(d, v, y), v += 4;
    }
    t.writeUint(d, v, g[A.tag]), v += 4, t.writeUint(d, v, A.data.length), v += 4;
  }
  for (const A of n) {
    const w = g[A.tag];
    d.set(A.data, w);
  }
  if (n.find((A) => A.tag === "head")) {
    const A = g.head, w = function(y, U) {
      const T = E, R = U + 8, P = [y[R], y[R + 1], y[R + 2], y[R + 3]];
      T.writeUint(y, R, 0);
      const F = 2981146554 - (V(y, 0, X(y.length)) >>> 0) >>> 0;
      return y[R] = P[0], y[R + 1] = P[1], y[R + 2] = P[2], y[R + 3] = P[3], F >>> 0;
    }(d, A);
    t.writeUint(d, A + 8, w);
  }
  return d.buffer;
}
const Lt = { parseTab(a, t, e) {
  const i = { tables: [], ids: {}, off: t };
  a = new Uint8Array(a.buffer, t, e), t = 0;
  const s = E, r = s.readUshort, n = r(a, t += 2);
  t += 2;
  const o = [];
  for (let c = 0; c < n; c++) {
    const l = r(a, t), f = r(a, t += 2);
    t += 2;
    const u = s.readUint(a, t);
    t += 4;
    const m = `p${l}e${f}`;
    let p = o.indexOf(u);
    if (p === -1) {
      let g;
      p = i.tables.length, o.push(u);
      const d = r(a, u);
      g = d === 4 ? this.parse4(a, u) : d === 12 ? this.parse12(a, u) : { format: d }, i.tables.push(g);
    }
    i.ids[m] = p;
  }
  return i;
}, parse4(a, t) {
  const e = E, i = e.readUshort, s = e.readUshorts, r = t, n = i(a, t += 2);
  t += 2;
  const o = i(a, t += 2) >>> 1, c = { format: 4, searchRange: i(a, t += 2), entrySelector: 0, rangeShift: 0, endCount: [], startCount: [], idDelta: [], idRangeOffset: [], glyphIdArray: [] };
  t += 2, c.entrySelector = i(a, t), t += 2, c.rangeShift = i(a, t), t += 2, c.endCount = s(a, t, o), t += 2 * o, t += 2, c.startCount = s(a, t, o), t += 2 * o;
  for (let l = 0; l < o; l++) c.idDelta.push(e.readShort(a, t)), t += 2;
  return c.idRangeOffset = s(a, t, o), t += 2 * o, c.glyphIdArray = s(a, t, r + n - t >> 1), c;
}, parse12(a, t) {
  const e = E.readUint;
  e(a, t += 4), e(a, t += 4);
  const i = e(a, t += 4);
  t += 4;
  const s = new Uint32Array(3 * i);
  for (let r = 0; r < 3 * i; r += 3) s[r] = e(a, t + (r << 2)), s[r + 1] = e(a, t + (r << 2) + 4), s[r + 2] = e(a, t + (r << 2) + 8);
  return { format: 12, groups: s };
} }, Dt = { parseTab(a, t, e) {
  const i = E;
  t += 18;
  const s = i.readUshort(a, t);
  t += 2, t += 16;
  const r = i.readShort(a, t);
  t += 2;
  const n = i.readShort(a, t);
  t += 2;
  const o = i.readShort(a, t);
  t += 2;
  const c = i.readShort(a, t);
  return t += 2, t += 6, { unitsPerEm: s, xMin: r, yMin: n, xMax: o, yMax: c, indexToLocFormat: i.readShort(a, t) };
} }, _t = { parseTab(a, t, e) {
  const i = E;
  t += 4;
  const s = ["ascender", "descender", "lineGap", "advanceWidthMax", "minLeftSideBearing", "minRightSideBearing", "xMaxExtent", "caretSlopeRise", "caretSlopeRun", "caretOffset", "res0", "res1", "res2", "res3", "metricDataFormat", "numberOfHMetrics"], r = {};
  for (let n = 0; n < s.length; n++) {
    const o = s[n], c = o === "advanceWidthMax" || o === "numberOfHMetrics" ? i.readUshort : i.readShort;
    r[o] = c(a, t + 2 * n);
  }
  return r;
} }, St = { parseTab(a, t, e, i) {
  const s = E, r = [], n = [], o = i.maxp.numGlyphs, c = i.hhea.numberOfHMetrics;
  let l = 0, f = 0, u = 0;
  for (; u < c; ) l = s.readUshort(a, t + (u << 2)), f = s.readShort(a, t + (u << 2) + 2), r.push(l), n.push(f), u++;
  for (; u < o; ) r.push(l), n.push(f), u++;
  return { aWidth: r, lsBearing: n };
} }, tt = { cmap: Lt, head: Dt, hhea: _t, maxp: { parseTab(a, t, e) {
  const i = E;
  return i.readUint(a, t), t += 4, { numGlyphs: i.readUshort(a, t) };
} }, hmtx: St, loca: { parseTab(a, t, e, i) {
  const s = E, r = [], n = i.head.indexToLocFormat, o = i.maxp.numGlyphs + 1;
  if (n === 0) for (let c = 0; c < o; c++) r.push(s.readUshort(a, t + (c << 1)) << 1);
  else if (n === 1) for (let c = 0; c < o; c++) r.push(s.readUint(a, t + (c << 2)));
  return r;
} }, glyf: { parseTab(a, t, e, i) {
  const s = [], r = i.maxp.numGlyphs;
  for (let n = 0; n < r; n++) s.push(null);
  return s;
}, Qe(a, t) {
  const e = E, i = a.Je, s = a.loca;
  if (s[t] === s[t + 1]) return null;
  const r = O.findTable(i, "glyf", a.ti);
  if (!r) return null;
  let n = r[0] + s[t];
  const o = {};
  if (o.noc = e.readShort(i, n), n += 2, o.xMin = e.readShort(i, n), n += 2, o.yMin = e.readShort(i, n), n += 2, o.xMax = e.readShort(i, n), n += 2, o.yMax = e.readShort(i, n), n += 2, o.xMin >= o.xMax || o.yMin >= o.yMax) return null;
  if (o.noc > 0) {
    o.endPts = [];
    for (let m = 0; m < o.noc; m++) o.endPts.push(e.readUshort(i, n)), n += 2;
    const c = e.readUshort(i, n);
    if (n += 2, i.length - n < c) return null;
    n += c;
    const l = o.endPts[o.noc - 1] + 1;
    o.flags = [];
    for (let m = 0; m < l; m++) {
      const p = i[n];
      if (n++, o.flags.push(p), 8 & p) {
        const g = i[n];
        n++;
        for (let d = 0; d < g; d++) o.flags.push(p), m++;
      }
    }
    o.xs = [];
    for (let m = 0; m < l; m++) {
      const p = o.flags[m], g = !!(16 & p);
      2 & p ? (o.xs.push(g ? i[n] : -i[n]), n++) : g ? o.xs.push(0) : (o.xs.push(e.readShort(i, n)), n += 2);
    }
    o.ys = [];
    for (let m = 0; m < l; m++) {
      const p = o.flags[m], g = !!(32 & p);
      4 & p ? (o.ys.push(g ? i[n] : -i[n]), n++) : g ? o.ys.push(0) : (o.ys.push(e.readShort(i, n)), n += 2);
    }
    let f = 0, u = 0;
    for (let m = 0; m < l; m++) f += o.xs[m], u += o.ys[m], o.xs[m] = f, o.ys[m] = u;
  } else o.parts = [], o.endPts = [], o.flags = [], o.xs = [], o.ys = [];
  return o;
} } }, O = { parse(a) {
  const t = new Uint8Array(a), e = E.readASCII(t, 0, 4);
  if (e === "wOFF") a = Mt(a);
  else if (e === "wOF2") throw Error("WOFF2 is not supported in this build (Brotli + WOFF2 transforms required)");
  return [((i, s, r, n) => {
    const o = tt, c = { Je: i, si: s, ti: r };
    for (const l in o) {
      const f = l, u = O.findTable(i, f, r);
      if (u) {
        const [m, p] = u;
        let g = n[m];
        g == null && (g = o[f].parseTab(i, m, p, c), n[m] = g), c[f] = g;
      }
    }
    return c;
  })(new Uint8Array(a), 0, 0, {})];
}, findTable(a, t, e) {
  const i = E, s = i.readUshort(a, e + 4);
  let r = e + 12;
  for (let n = 0; n < s; n++) {
    const o = i.readASCII(a, r, 4);
    i.readUint(a, r + 4);
    const c = i.readUint(a, r + 8), l = i.readUint(a, r + 12);
    if (o === t) return [c, l];
    r += 16;
  }
  return null;
}, T: tt, B: E };
class Bt {
  ei(t) {
    var i;
    const e = [];
    return (i = t.cmap) != null && i.tables ? (t.cmap.tables.forEach((s) => {
      if (s.format === 4) {
        const r = this.ii(s);
        e.push(...r);
      } else if (s.format === 12) {
        const r = this.ri(s);
        e.push(...r);
      }
    }), [...new Set(e)]) : [];
  }
  ni(t) {
    return t.filter((e) => this.oi(e));
  }
  ii(t) {
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
  ri(t) {
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
  oi(t) {
    const e = t.codePointAt(0) || 0;
    return !(e >= 0 && e <= 31 && e !== 9 && e !== 10 && e !== 13 || e >= 127 && e <= 159);
  }
}
class Z {
  constructor() {
    h(this, "ai", /* @__PURE__ */ new Map());
    h(this, "ci", /* @__PURE__ */ new Map());
  }
  li(t, e) {
    const i = `${this.ui(t)}_${e}`;
    if (this.ai.has(i)) return this.ai.get(i);
    const s = t.cmap;
    if (!s || !s.tables) return this.ai.set(i, 0), 0;
    let r = 0;
    for (const n of s.tables) if (n.format === 4 ? r = this.fi(e, n) : n.format === 12 && (r = this.di(e, n)), r > 0) break;
    return this.ai.set(i, r), r;
  }
  pi(t, e) {
    const i = e.codePointAt(0);
    return i === void 0 ? 0 : this.li(t, i);
  }
  _i(t, e) {
    const i = t.hmtx;
    return i && i.aWidth && i.aWidth.length !== 0 ? e < i.aWidth.length ? i.aWidth[e] : i.aWidth[i.aWidth.length - 1] : 0;
  }
  mi(t, e) {
    const i = e / t.head.unitsPerEm, s = t.hhea.ascender * i, r = t.hhea.descender * i, n = t.hhea.lineGap * i;
    return { ascender: s, descender: r, lineGap: n, lineHeight: s - r + n, unitsPerEm: t.head.unitsPerEm, scale: i };
  }
  gi() {
    this.ai.clear(), this.ci.clear();
  }
  ui(t) {
    return `${t.ti}_${t.Je.length}`;
  }
  fi(t, e) {
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
  di(t, e) {
    const i = e.groups.length / 3;
    for (let s = 0; s < i; s++) {
      const r = e.groups[3 * s], n = e.groups[3 * s + 1], o = e.groups[3 * s + 2];
      if (t >= r && t <= n) return o + (t - r);
    }
    return 0;
  }
}
class It {
  constructor(t) {
    h(this, "Ai");
    h(this, "yi");
    h(this, "xt");
    h(this, "wi");
    this.xt = t, this.wi = new Z(), this.Ai = document.createElement("canvas"), this.yi = this.Ai.getContext("2d", { willReadFrequently: !0, alpha: !0 });
  }
  createTextureAtlas(t, e, i, s) {
    const r = t.length, n = Math.ceil(Math.sqrt(r)), o = Math.ceil(r / n), c = e.width * n, l = e.height * o, f = typeof s == "object" ? s : null;
    this.Ci(c, l), this.bi(t, e, n, i, f);
    const u = this.xt.Ye(c, l, 1, { filter: "nearest" });
    return u.Tt(this.Ai), { framebuffer: u, columns: n, rows: o };
  }
  Ci(t, e) {
    this.Ai.width = t, this.Ai.height = e, this.Ai.style.width = t + "px", this.Ai.style.height = e + "px", this.yi.imageSmoothingEnabled = !1, this.Ai.style.imageRendering = "pixelated", this.yi.clearRect(0, 0, t, e), this.yi.textBaseline = "top", this.yi.textAlign = "left", this.yi.fillStyle = "white";
  }
  bi(t, e, i, s, r) {
    const n = s / r.head.unitsPerEm;
    for (let o = 0; o < t.length; o++) {
      const c = o % i, l = Math.floor(o / i), f = t[o].character, u = this.xi(r, f);
      if (!u) continue;
      const m = f.codePointAt(0) || 0, p = this.wi.li(r, m), g = this.Mi(r, p) * n, d = c * e.width, v = l * e.height, A = d + 0.5 * e.width, w = v + 0.5 * e.height, y = Math.round(A - 0.5 * e.width), U = Math.round(w - 0.5 * s), T = y + 0.5 * (e.width - g), R = U + r.hhea.ascender * n;
      this.Fi(u, T, R, n);
    }
  }
  xi(t, e) {
    const i = e.codePointAt(0) || 0, s = this.wi.li(t, i);
    if (s === 0) return null;
    if (t.glyf && t.glyf[s] !== null) return t.glyf[s];
    if (O && O.T && O.T.glyf) {
      const r = O.T.glyf.Qe(t, s);
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
    this.yi.beginPath();
    let l = 0;
    for (let f = 0; f < o.length; f++) {
      const u = o[f];
      if (!(u < l)) {
        if (u >= l) {
          const m = e + r[l] * s, p = i - n[l] * s;
          this.yi.moveTo(m, p);
          let g = l + 1;
          for (; g <= u; )
            if (1 & c[g]) {
              const d = e + r[g] * s, v = i - n[g] * s;
              this.yi.lineTo(d, v), g++;
            } else {
              const d = e + r[g] * s, v = i - n[g] * s;
              let A = g + 1 > u ? l : g + 1;
              if (1 & c[A]) {
                const w = e + r[A] * s, y = i - n[A] * s;
                this.yi.quadraticCurveTo(d, v, w, y), g = A + 1;
              } else {
                const w = (d + (e + r[A] * s)) / 2, y = (v + (i - n[A] * s)) / 2;
                this.yi.quadraticCurveTo(d, v, w, y), g = A;
              }
            }
          this.yi.closePath();
        }
        l = u + 1;
      }
    }
    this.yi.fill();
  }
}
class Nt {
  constructor() {
    h(this, "zi");
    this.zi = new Z();
  }
  Ri(t, e, i) {
    let s = 0;
    const r = this.zi.mi(i, e), n = r.lineHeight;
    for (const o of t) {
      const c = this.zi.pi(i, o);
      if (c === 0) continue;
      const l = this.zi._i(i, c) * r.scale;
      s = Math.max(s, l);
    }
    return { width: Math.ceil(s), height: Math.ceil(n) };
  }
  gi() {
    this.zi.gi();
  }
}
class zt {
  constructor() {
    h(this, "wi");
    this.wi = new Z();
  }
  createCharacterObjects(t, e) {
    return t.map((i, s) => {
      const r = i.codePointAt(0) || 0, n = this.Ti(s);
      let o = 0;
      if (e.hmtx && e.hmtx.aWidth) {
        const c = this.wi.li(e, r);
        c > 0 && e.hmtx.aWidth[c] !== void 0 && (o = e.hmtx.aWidth[c]);
      }
      return { character: i, unicode: r, color: n, advanceWidth: o };
    });
  }
  Ti(t) {
    return [t % 256 / 255, Math.floor(t / 256) % 256 / 255, Math.floor(t / 65536) % 256 / 255];
  }
  Pi(t, e) {
    if (!z.v(typeof t == "string", "Character must be a string.", { method: "getCharacterColor", providedValue: t })) return [0, 0, 0];
    const i = e.find((s) => s.character === t);
    return i ? i.color : [0, 0, 0];
  }
  Si(t, e) {
    return z.v(typeof t == "string" && t.length > 0, "Characters must be a string with at least one character.", { method: "getCharacterColors", providedValue: t }) ? Array.from(t).map((i) => this.Pi(i, e) || [0, 0, 0]) : [[0, 0, 0]];
  }
}
class Gt {
  constructor(t, e = 16) {
    h(this, "$i");
    h(this, "Ei", []);
    h(this, "Di");
    h(this, "ki", 16);
    h(this, "Bi", 0);
    h(this, "Li", 0);
    h(this, "Oi", { width: 0, height: 0 });
    h(this, "Hi");
    h(this, "Gi", /* @__PURE__ */ new Map());
    h(this, "Ii");
    h(this, "Ni");
    h(this, "Xi");
    h(this, "Wi");
    this.ki = e, this.Ii = new Bt(), this.Ni = new It(t), this.Xi = new Nt(), this.Wi = new zt();
  }
  async Ki(t) {
    let e;
    if (t) {
      const i = await fetch(t);
      if (!i.ok) throw new C(`Failed to load font file: ${i.status} ${i.statusText}`);
      e = await i.arrayBuffer();
    } else
      e = await (await fetch("data:font/woff;base64,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")).arrayBuffer();
    await this.ji(e), this.$i = O.parse(e)[0], await this.Yi();
  }
  Vi(t) {
    if (t === void 0) return this.ki;
    this.ki = t, this.Oi = this.Xi.Ri(this.Ei.map((i) => i.character), this.ki, this.$i);
    const e = this.Ni.createTextureAtlas(this.Ei, this.Oi, this.ki, this.$i);
    this.Di = e.framebuffer, this.Bi = e.columns, this.Li = e.rows;
  }
  async qi(t) {
    try {
      const e = await fetch(t);
      if (!e.ok) throw new C(`Failed to load font file: ${e.status} ${e.statusText}`);
      const i = await e.arrayBuffer();
      await this.ji(i);
      const s = O.parse(i);
      if (!s || s.length === 0) throw Error("Failed to parse font file");
      this.$i = s[0], await this.Yi();
    } catch (e) {
      throw new C("Failed to load font: " + (e instanceof Error ? e.message : "Unknown error"), e);
    }
  }
  async ji(t) {
    const e = Date.now();
    this.Hi = new FontFace("CustomFont_" + e, t), await this.Hi.load(), document.fonts.add(this.Hi);
  }
  async Yi() {
    const t = this.Ii.ei(this.$i), e = this.Ii.ni(t);
    this.Gi.clear(), this.Ei = this.Wi.createCharacterObjects(e, this.$i), this.Oi = this.Xi.Ri(e, this.ki, this.$i);
    const i = this.Ni.createTextureAtlas(this.Ei, this.Oi, this.ki, this.$i);
    this.Di = i.framebuffer, this.Bi = i.columns, this.Li = i.rows;
  }
  Pi(t) {
    return this.Wi.Pi(t, this.Ei);
  }
  Si(t) {
    return this.Wi.Si(t, this.Ei);
  }
  getGlyphData(t) {
    if (!Number.isFinite(t)) return null;
    const e = this.Gi.get(t);
    if (e !== void 0) return e;
    const i = this.Zi(t);
    if (i < 0) return this.Gi.set(t, null), null;
    const s = this.$i.glyf;
    if (!s) return this.Gi.set(t, null), null;
    let r = s[i] ?? null;
    return r == null && (r = O.T.glyf.Qe(this.$i, i) ?? null, s[i] = r), this.Gi.set(t, r), r;
  }
  Zi(t) {
    const e = this.$i.cmap;
    for (const i of e.tables) if (i.format === 4) {
      const s = i;
      for (let r = 0; r < s.startCount.length; r++) if (t >= s.startCount[r] && t <= s.endCount[r]) {
        if (s.idRangeOffset[r] === 0) return t + s.idDelta[r] & 65535;
        {
          const n = s.idRangeOffset[r] / 2 + (t - s.startCount[r]) - (s.startCount.length - r);
          if (n >= 0 && n < s.glyphIdArray.length) {
            const o = s.glyphIdArray[n];
            if (o !== 0) return o + s.idDelta[r] & 65535;
          }
        }
      }
    } else if (i.format === 12) {
      const s = i;
      for (let r = 0; r < s.groups.length; r += 3) {
        const n = s.groups[r], o = s.groups[r + 1], c = s.groups[r + 2];
        if (t >= n && t <= o) return c + (t - n);
      }
    }
    return 0;
  }
  Dt() {
    this.Di.Dt(), document.fonts.delete(this.Hi);
  }
  get fontFramebuffer() {
    return this.Di;
  }
  get characters() {
    return this.Ei;
  }
  get textureColumns() {
    return this.Bi;
  }
  get textureRows() {
    return this.Li;
  }
  get maxGlyphDimensions() {
    return this.Oi;
  }
  get fontSize() {
    return this.ki;
  }
  get font() {
    return this.$i;
  }
}
class Ht {
  constructor(t, e, i) {
    h(this, "Qi");
    h(this, "Ji");
    h(this, "dt");
    h(this, "_t");
    h(this, "tr");
    h(this, "sr");
    h(this, "er");
    h(this, "ir");
    h(this, "rr");
    this.er = t, this.ir = e, this.rr = i, this.nr();
  }
  nr() {
    this.Qi = Math.floor(this.er.width / this.ir), this.Ji = Math.floor(this.er.height / this.rr), this.dt = this.Qi * this.ir, this._t = this.Ji * this.rr, this.tr = Math.floor((this.er.width - this.dt) / 2), this.sr = Math.floor((this.er.height - this._t) / 2);
  }
  hr(t, e) {
    this.ir = t, this.rr = e, this.nr();
  }
  get cellWidth() {
    return this.ir;
  }
  get cellHeight() {
    return this.rr;
  }
  get cols() {
    return this.Qi;
  }
  get rows() {
    return this.Ji;
  }
  get width() {
    return this.dt;
  }
  get height() {
    return this._t;
  }
  get offsetX() {
    return this.tr;
  }
  get offsetY() {
    return this.sr;
  }
}
class Xt {
  constructor(t = {}) {
    h(this, "er");
    h(this, "ar", null);
    h(this, "cr", !1);
    h(this, "lr");
    h(this, "ur");
    this.cr = t.overlay ?? !1, this.cr && t.canvas ? (this.ar = t.canvas, this.er = this.dr(), this.ur = !0, this.pr()) : t.canvas ? (this.er = t.canvas, this.ur = !1) : (this.er = this._r(t.width, t.height), this.ur = !0), this.er.style.imageRendering = "pixelated";
  }
  _r(t, e) {
    const i = document.createElement("canvas");
    return i.className = "textmodeCanvas", i.style.imageRendering = "pixelated", i.width = t || 800, i.height = e || 600, document.body.appendChild(i), i;
  }
  dr() {
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
  pr() {
    var t;
    this.mr(), (t = this.ar.parentNode) == null || t.insertBefore(this.er, this.ar.nextSibling), window.ResizeObserver && (this.lr = new ResizeObserver(() => {
      this.vr();
    }), this.lr.observe(this.ar)), window.addEventListener("resize", () => {
      this.vr();
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
  vr(t, e) {
    if (this.cr) {
      const i = this.ar.getBoundingClientRect();
      let s = Math.round(i.width), r = Math.round(i.height);
      if (this.ar instanceof HTMLVideoElement) {
        const n = this.ar;
        (s === 0 || r === 0) && n.videoWidth > 0 && n.videoHeight > 0 && (s = n.videoWidth, r = n.videoHeight);
      }
      this.er.width = s, this.er.height = r, this.mr();
    } else this.er.width = t ?? this.er.width, this.er.height = e ?? this.er.height;
  }
  gr() {
    const t = this.er.getContext("webgl2", { alpha: !0, premultipliedAlpha: !1, preserveDrawingBuffer: !0, antialias: !1, depth: !1, stencil: !1, powerPreference: "high-performance" });
    if (!t) throw new C("`textmode.js` requires WebGL2 support.");
    return t;
  }
  Dt() {
    this.lr && this.lr.disconnect();
    const t = this.er.getContext("webgl") || this.er.getContext("webgl2");
    if (t) {
      const e = t.getExtension("WEBGL_lose_context");
      e && e.loseContext();
    }
    this.ur && this.er.parentNode && this.er.parentNode.removeChild(this.er);
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
class G {
  constructor(t, e, i, s) {
    h(this, "Ar");
    h(this, "dt");
    h(this, "_t");
    h(this, "gt");
    h(this, "k", 0);
    h(this, "K", 0);
    h(this, "j", 0);
    h(this, "L", [0, 0]);
    h(this, "yr", "sampled");
    h(this, "wr", "fixed");
    h(this, "V", [1, 1, 1, 1]);
    h(this, "q", [0, 0, 0, 1]);
    h(this, "Cr", [0, 0, 0, 1]);
    h(this, "br", [[0.1, 0, 0]]);
    h(this, "Mr");
    this.gt = t, this.Ar = e, this.dt = i, this._t = s;
  }
  Dt() {
    this.gt.deleteTexture(this.Ar);
  }
  Fr(t) {
    return typeof t == "boolean" ? t ? 1 : 0 : (t == null ? 0 : Number(t)) > 0 ? 1 : 0;
  }
  invert(t = !0) {
    return this.k = this.Fr(t), this;
  }
  flipX(t = !0) {
    return this.K = this.Fr(t), this;
  }
  flipY(t = !0) {
    return this.j = this.Fr(t), this;
  }
  charRotation(t) {
    const e = 255 * t / 360, i = Math.floor(e) / 255, s = Math.round(e - Math.floor(e));
    return this.L = [i, s], this;
  }
  Ge() {
    return { texture: this.Ar, invert: this.k, flipX: this.K, flipY: this.j, charRotation: this.L, charColorFixed: this.yr === "fixed", charColor: this.V, cellColorFixed: this.wr === "fixed", cellColor: this.q, backgroundColor: this.Cr, charCount: this.br.length, charList: this.br };
  }
  charColorMode(t) {
    return this.yr = t, this;
  }
  cellColorMode(t) {
    return this.wr = t, this;
  }
  charColor(t, e, i, s) {
    return this.V = [(t ?? 0) / 255, (e ?? t ?? 0) / 255, (i ?? t ?? 0) / 255, (s ?? 255) / 255], this;
  }
  cellColor(t, e, i, s) {
    return this.q = [(t ?? 0) / 255, (e ?? t ?? 0) / 255, (i ?? t ?? 0) / 255, (s ?? 255) / 255], this;
  }
  background(t, e, i, s) {
    return this.Cr = [(t ?? 0) / 255, (e ?? t ?? 0) / 255, (i ?? t ?? 0) / 255, (s ?? 255) / 255], this;
  }
  characters(t) {
    const e = this.Mr(t).filter((i) => Array.isArray(i)).slice(0, 64);
    return this.br = e, this;
  }
  static zr(t, e, i) {
    const s = t.context, r = s.createTexture();
    s.bindTexture(s.TEXTURE_2D, r), s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL, 1), s.texParameteri(s.TEXTURE_2D, s.TEXTURE_MIN_FILTER, s.NEAREST), s.texParameteri(s.TEXTURE_2D, s.TEXTURE_MAG_FILTER, s.NEAREST), s.texParameteri(s.TEXTURE_2D, s.TEXTURE_WRAP_S, s.CLAMP_TO_EDGE), s.texParameteri(s.TEXTURE_2D, s.TEXTURE_WRAP_T, s.CLAMP_TO_EDGE), s.texImage2D(s.TEXTURE_2D, 0, s.RGBA, s.RGBA, s.UNSIGNED_BYTE, e), s.bindTexture(s.TEXTURE_2D, null);
    const n = e.naturalWidth ?? e.width ?? e.videoWidth ?? 0, o = e.naturalHeight ?? e.height ?? e.videoHeight ?? 0, c = new G(s, r, n, o);
    return c.Mr = i, c;
  }
  get texture() {
    return this.Ar;
  }
  get width() {
    return this.dt;
  }
  get height() {
    return this._t;
  }
}
class Yt {
  constructor(t = 60) {
    h(this, "Rr");
    h(this, "Tr");
    h(this, "Pr", null);
    h(this, "Sr", 0);
    h(this, "$r", !0);
    h(this, "Er", 0);
    h(this, "Dr", 0);
    h(this, "kr", []);
    h(this, "Br", 10);
    h(this, "Lr", 0);
    this.Rr = t, this.Tr = 1e3 / t;
  }
  start(t) {
    if (!this.$r) return;
    this.Sr = performance.now();
    const e = (i) => {
      if (!this.$r) return void (this.Pr = null);
      const s = i - this.Sr;
      s >= this.Tr && (t(), this.Sr = i - s % this.Tr), this.$r && (this.Pr = requestAnimationFrame(e));
    };
    this.Pr = requestAnimationFrame(e);
  }
  stop() {
    this.Pr && (cancelAnimationFrame(this.Pr), this.Pr = null);
  }
  pause() {
    this.$r && (this.$r = !1, this.stop());
  }
  resume(t) {
    this.$r || (this.$r = !0, this.start(t));
  }
  frameRate(t, e) {
    if (t === void 0) return this.Er;
    this.Rr = t, this.Tr = 1e3 / t, this.$r && e && (this.stop(), this.start(e));
  }
  measureFrameRate() {
    const t = performance.now();
    if (this.Dr > 0) {
      const e = t - this.Dr;
      this.kr.push(e), this.kr.length > this.Br && this.kr.shift();
      const i = this.kr.reduce((s, r) => s + r, 0) / this.kr.length;
      this.Er = 1e3 / i;
    }
    this.Dr = t;
  }
  get isLooping() {
    return this.$r;
  }
  get frameRateLimit() {
    return this.Rr;
  }
  get currentFrameRate() {
    return this.Er;
  }
  get frameCount() {
    return this.Lr;
  }
  set frameCount(t) {
    this.Lr = t;
  }
  incrementFrame() {
    this.Lr++;
  }
  resetFrameCount() {
    this.Lr = 0;
  }
}
class rt {
  constructor(t) {
    h(this, "er");
    h(this, "Or");
    h(this, "Hr", { x: -1, y: -1 });
    h(this, "Gr", { x: -1, y: -1 });
    h(this, "Ir", null);
    h(this, "Nr", 0);
    h(this, "Xr");
    h(this, "Wr");
    h(this, "Kr");
    h(this, "jr");
    h(this, "Yr");
    h(this, "Vr");
    h(this, "qr", !1);
    h(this, "Zr");
    h(this, "Qr");
    h(this, "Jr");
    h(this, "tn");
    h(this, "sn");
    this.er = t;
  }
  en(t) {
    const e = performance.now() + Math.max(0, t);
    e > this.Nr && (this.Nr = e);
  }
  rn() {
    return performance.now() < this.Nr;
  }
  nn(t) {
    const e = this.er.canvas;
    e.style.cursor = t == null || t === "" ? "" : t;
  }
  Ki(t) {
    this.Or = t, this.hn();
  }
  an() {
    if (this.qr) return;
    const t = this.er.canvas;
    this.Xr = (e) => {
      this.cn(e), this.ln(e);
    }, this.Wr = () => {
      this.Gr = { ...this.Hr }, this.Hr.x = -1, this.Hr.y = -1, this.Ir = null;
    }, this.Kr = (e) => {
      this.cn(e), this.un(e);
    }, this.jr = (e) => {
      this.cn(e), this.fn(e);
    }, this.Yr = (e) => {
      this.cn(e), this.dn(e);
    }, this.Vr = (e) => {
      this.cn(e), this.pn(e);
    }, t.addEventListener("mousemove", this.Xr, { passive: !0 }), t.addEventListener("mouseleave", this.Wr, { passive: !0 }), t.addEventListener("mousedown", this.Kr, { passive: !0 }), t.addEventListener("mouseup", this.jr, { passive: !0 }), t.addEventListener("click", this.Yr, { passive: !0 }), t.addEventListener("wheel", this.Vr, { passive: !1 }), this.qr = !0;
  }
  _n() {
    if (!this.qr) return;
    const t = this.er.canvas;
    t.removeEventListener("mousemove", this.Xr), t.removeEventListener("mouseleave", this.Wr), t.removeEventListener("mousedown", this.Kr), t.removeEventListener("mouseup", this.jr), t.removeEventListener("click", this.Yr), t.removeEventListener("wheel", this.Vr), this.qr = !1;
  }
  hn() {
    if (this.qr) try {
      if (this.Ir) {
        const t = new MouseEvent("mousemove", { clientX: this.Ir.x, clientY: this.Ir.y, bubbles: !1, cancelable: !1 });
        this.cn(t);
      } else this.Hr.x !== -1 && this.Hr.y !== -1 && (this.Hr.x >= this.Or.cols || this.Hr.y >= this.Or.rows) && (this.Hr.x = -1, this.Hr.y = -1);
    } catch {
      this.Hr.x = -1, this.Hr.y = -1;
    }
  }
  mn(t) {
    this.Zr = t;
  }
  vn(t) {
    this.Qr = t;
  }
  gn(t) {
    this.Jr = t;
  }
  An(t) {
    this.tn = t;
  }
  yn(t) {
    this.sn = t;
  }
  wn() {
    return { x: this.Hr.x, y: this.Hr.y };
  }
  ln(t) {
    if (this.tn && !this.rn()) {
      const e = { position: { ...this.Hr }, previousPosition: { ...this.Gr }, originalEvent: t };
      this.tn(e);
    }
  }
  un(t) {
    if (this.Qr && !this.rn()) {
      const e = { position: { ...this.Hr }, previousPosition: { ...this.Gr }, button: t.button, originalEvent: t };
      this.Qr(e);
    }
  }
  fn(t) {
    if (this.Jr && !this.rn()) {
      const e = { position: { ...this.Hr }, previousPosition: { ...this.Gr }, button: t.button, originalEvent: t };
      this.Jr(e);
    }
  }
  dn(t) {
    if (this.Zr && !this.rn()) {
      const e = { position: { ...this.Hr }, previousPosition: { ...this.Gr }, button: t.button, originalEvent: t };
      this.Zr(e);
    }
  }
  pn(t) {
    if (this.sn && !this.rn()) {
      const e = { position: { ...this.Hr }, previousPosition: { ...this.Gr }, delta: { x: t.deltaX, y: t.deltaY }, originalEvent: t };
      this.sn(e);
    }
  }
  cn(t) {
    const e = this.er.canvas;
    this.Gr = { ...this.Hr }, this.Ir = { x: t.clientX, y: t.clientY };
    const i = e.getBoundingClientRect(), s = t.clientX - i.left, r = t.clientY - i.top, n = e.width / i.width, o = r * (e.height / i.height), c = s * n - this.Or.offsetX, l = o - this.Or.offsetY, f = Math.floor(c / this.Or.cellWidth), u = Math.floor(l / this.Or.cellHeight);
    f >= 0 && f < this.Or.cols && u >= 0 && u < this.Or.rows ? (this.Hr.x = f, this.Hr.y = u) : (this.Hr.x = -1, this.Hr.y = -1);
  }
}
const Wt = Object.freeze(Object.defineProperty({ __proto__: null, MouseManager: rt }, Symbol.toStringTag, { value: "Module" }));
class nt {
  constructor() {
    h(this, "Cn", /* @__PURE__ */ new Map());
    h(this, "bn", null);
    h(this, "xn", null);
    h(this, "Mn");
    h(this, "Fn");
    h(this, "qr", !1);
    h(this, "zn");
    h(this, "Rn");
    h(this, "Tn", { ArrowUp: "UP_ARROW", ArrowDown: "DOWN_ARROW", ArrowLeft: "LEFT_ARROW", ArrowRight: "RIGHT_ARROW", F1: "F1", F2: "F2", F3: "F3", F4: "F4", F5: "F5", F6: "F6", F7: "F7", F8: "F8", F9: "F9", F10: "F10", F11: "F11", F12: "F12", Enter: "ENTER", Return: "RETURN", Tab: "TAB", Escape: "ESCAPE", Backspace: "BACKSPACE", Delete: "DELETE", Insert: "INSERT", Home: "HOME", End: "END", PageUp: "PAGE_UP", PageDown: "PAGE_DOWN", Shift: "SHIFT", Control: "CONTROL", Alt: "ALT", Meta: "META", " ": "SPACE" });
  }
  an() {
    this.qr || (this.Mn = (t) => {
      this.Pn(t);
    }, this.Fn = (t) => {
      this.Sn(t);
    }, window.addEventListener("keydown", this.Mn, { passive: !1 }), window.addEventListener("keyup", this.Fn, { passive: !1 }), this.qr = !0);
  }
  _n() {
    this.qr && (window.removeEventListener("keydown", this.Mn), window.removeEventListener("keyup", this.Fn), this.qr = !1, this.Cn.clear(), this.bn = null, this.xn = null);
  }
  vn(t) {
    this.zn = t;
  }
  gn(t) {
    this.Rn = t;
  }
  $n(t) {
    const e = this.En(t), i = this.Cn.get(t) || this.Cn.get(e);
    return (i == null ? void 0 : i.isPressed) || !1;
  }
  Dn() {
    return this.bn;
  }
  kn() {
    return this.xn;
  }
  Bn() {
    const t = [];
    for (const [e, i] of this.Cn) i.isPressed && t.push(e);
    return t;
  }
  Ln() {
    return { ctrl: this.$n("Control"), shift: this.$n("Shift"), alt: this.$n("Alt"), meta: this.$n("Meta") };
  }
  On() {
    this.Cn.clear(), this.bn = null, this.xn = null;
  }
  Pn(t) {
    const e = t.key, i = Date.now();
    this.Cn.has(e) || this.Cn.set(e, { isPressed: !1, lastPressTime: 0, lastReleaseTime: 0 });
    const s = this.Cn.get(e);
    if (!s.isPressed && (s.isPressed = !0, s.lastPressTime = i, this.bn = e, this.zn)) {
      const r = { key: e, keyCode: t.keyCode, ctrlKey: t.ctrlKey, shiftKey: t.shiftKey, altKey: t.altKey, metaKey: t.metaKey, isPressed: !0, originalEvent: t };
      this.zn(r);
    }
  }
  Sn(t) {
    const e = t.key, i = Date.now();
    this.Cn.has(e) || this.Cn.set(e, { isPressed: !1, lastPressTime: 0, lastReleaseTime: 0 });
    const s = this.Cn.get(e);
    if (s.isPressed = !1, s.lastReleaseTime = i, this.xn = e, this.Rn) {
      const r = { key: e, keyCode: t.keyCode, ctrlKey: t.ctrlKey, shiftKey: t.shiftKey, altKey: t.altKey, metaKey: t.metaKey, isPressed: !1, originalEvent: t };
      this.Rn(r);
    }
  }
  En(t) {
    return this.Tn[t] || t.toLowerCase();
  }
}
const kt = Object.freeze(Object.defineProperty({ __proto__: null, KeyboardManager: nt }, Symbol.toStringTag, { value: "Module" }));
class ot {
  constructor(t, e) {
    h(this, "er");
    h(this, "Hn");
    h(this, "Or");
    h(this, "Gn", /* @__PURE__ */ new Map());
    h(this, "In", /* @__PURE__ */ new Map());
    h(this, "Nn", /* @__PURE__ */ new Map());
    h(this, "Xn", null);
    h(this, "Wn");
    h(this, "Kn");
    h(this, "jn");
    h(this, "Yn");
    h(this, "Vn");
    h(this, "qn");
    h(this, "qr", !1);
    h(this, "Zn");
    h(this, "Qn");
    h(this, "Jn");
    h(this, "so");
    h(this, "eo");
    h(this, "io");
    h(this, "ro");
    h(this, "no");
    h(this, "oo");
    h(this, "ho");
    h(this, "ao", 320);
    h(this, "co", 350);
    h(this, "lo", 10);
    h(this, "uo", 550);
    h(this, "fo", 14);
    h(this, "do", 48);
    h(this, "po", 650);
    h(this, "_o", 0.02);
    h(this, "mo", 2);
    h(this, "vo", 600);
    h(this, "Ao", 0);
    h(this, "yo", null);
    this.er = t, this.Hn = e;
    const i = this.er.canvas;
    this.Wn = i.style.touchAction, this.Kn = i.style.userSelect, i.style.touchAction || (i.style.touchAction = "none"), i.style.userSelect || (i.style.userSelect = "none");
  }
  Ki(t) {
    this.Or = t, this.wo();
  }
  an() {
    if (this.qr) return;
    const t = this.er.canvas;
    this.jn = (e) => {
      this.Co(e);
    }, this.Yn = (e) => {
      this.bo(e);
    }, this.Vn = (e) => {
      this.xo(e);
    }, this.qn = (e) => {
      this.Mo(e);
    }, t.addEventListener("touchstart", this.jn, { passive: !1 }), t.addEventListener("touchmove", this.Yn, { passive: !1 }), t.addEventListener("touchend", this.Vn, { passive: !1 }), t.addEventListener("touchcancel", this.qn, { passive: !1 }), this.qr = !0;
  }
  _n() {
    if (!this.qr) return;
    const t = this.er.canvas;
    t.removeEventListener("touchstart", this.jn), t.removeEventListener("touchmove", this.Yn), t.removeEventListener("touchend", this.Vn), t.removeEventListener("touchcancel", this.qn), this.qr = !1, this.Xn = null, this.Gn.clear(), this.In.clear(), this.Nn.forEach((e) => {
      e.longPressTimer !== null && window.clearTimeout(e.longPressTimer);
    }), this.Nn.clear(), this.yo = null, this.Ao = 0, t.style.touchAction = this.Wn, t.style.userSelect = this.Kn;
  }
  wo() {
    if (!this.Or || this.Gn.size === 0) return;
    const t = /* @__PURE__ */ new Map();
    for (const e of this.Gn.values()) {
      const i = this.Fo(e.clientX, e.clientY, e.id, e);
      t.set(e.id, i);
    }
    this.Gn = t;
  }
  zo() {
    return Array.from(this.Gn.values()).map((t) => ({ ...t }));
  }
  Ro(t) {
    this.Zn = t;
  }
  An(t) {
    this.Qn = t;
  }
  To(t) {
    this.Jn = t;
  }
  Po(t) {
    this.so = t;
  }
  So(t) {
    this.eo = t;
  }
  $o(t) {
    this.io = t;
  }
  Eo(t) {
    this.ro = t;
  }
  Do(t) {
    this.no = t;
  }
  ko(t) {
    this.oo = t;
  }
  Bo(t) {
    this.ho = t;
  }
  Co(t) {
    var s;
    if (!this.Or) return;
    t.preventDefault(), (s = this.Hn) == null || s.en(this.vo);
    const e = performance.now(), i = this.Lo(t.changedTouches);
    for (const r of i) {
      const n = this.Gn.get(r.id);
      n && this.In.set(r.id, this.Oo(n)), this.Gn.set(r.id, r);
      const o = { id: r.id, startPosition: r, lastPosition: r, startTime: e, lastTime: e, longPressTimer: null, longPressFired: !1 };
      this.ro && (o.longPressTimer = window.setTimeout(() => {
        const c = this.Gn.get(r.id);
        c && (o.longPressFired = !0, this.ro({ touch: this.Oo(c), duration: performance.now() - o.startTime, originalEvent: t }));
      }, this.uo)), this.Nn.set(r.id, o), this.Zn && this.Zn(this.Ho(r, t, void 0, e));
    }
    this.Gn.size === 2 && this.Go();
  }
  bo(t) {
    var s;
    if (!this.Or) return;
    t.preventDefault(), (s = this.Hn) == null || s.en(this.vo);
    const e = performance.now(), i = this.Lo(t.changedTouches);
    for (const r of i) {
      const n = this.Gn.get(r.id), o = n ? this.Oo(n) : void 0;
      o && this.In.set(r.id, o), this.Gn.set(r.id, r);
      const c = this.Nn.get(r.id);
      c && (c.lastPosition = r, c.lastTime = e, o) && this.Io(o, r, !0) > this.fo && c.longPressTimer !== null && (window.clearTimeout(c.longPressTimer), c.longPressTimer = null), this.Qn && this.Qn(this.Ho(r, t, o, e));
    }
    this.Gn.size === 2 ? this.No(t) : this.Xn = null;
  }
  xo(t) {
    if (!this.Or) return;
    t.preventDefault();
    const e = performance.now(), i = this.Lo(t.changedTouches);
    for (const s of i) {
      const r = this.Gn.get(s.id), n = r ? this.Oo(r) : void 0, o = this.Nn.get(s.id);
      o && o.longPressTimer !== null && (window.clearTimeout(o.longPressTimer), o.longPressTimer = null), this.Jn && this.Jn(this.Ho(s, t, n, e)), o && this.Xo(o, t), this.Nn.delete(s.id), this.In.delete(s.id), this.Gn.delete(s.id);
    }
    this.Gn.size < 2 && (this.Xn = null);
  }
  Mo(t) {
    if (!this.Or) return;
    t.preventDefault();
    const e = performance.now(), i = this.Lo(t.changedTouches);
    for (const s of i) {
      const r = this.Gn.get(s.id), n = r ? this.Oo(r) : void 0, o = this.Nn.get(s.id);
      o && o.longPressTimer !== null && (window.clearTimeout(o.longPressTimer), o.longPressTimer = null), this.so && this.so(this.Ho(s, t, n, e)), this.Nn.delete(s.id), this.In.delete(s.id), this.Gn.delete(s.id);
    }
    this.Gn.size < 2 && (this.Xn = null);
  }
  Lo(t) {
    const e = [];
    for (let i = 0; i < t.length; i += 1) {
      const s = t.item(i);
      s && e.push(this.Wo(s));
    }
    return e;
  }
  Wo(t) {
    return this.Fo(t.clientX, t.clientY, t.identifier, { id: t.identifier, x: -1, y: -1, clientX: t.clientX, clientY: t.clientY, pressure: t.force, radiusX: t.radiusX, radiusY: t.radiusY, rotationAngle: t.rotationAngle });
  }
  Fo(t, e, i, s) {
    const r = this.er.canvas, n = r.getBoundingClientRect(), o = t - n.left, c = e - n.top, l = r.width / n.width, f = c * (r.height / n.height), u = o * l - this.Or.offsetX, m = f - this.Or.offsetY, p = Math.floor(u / this.Or.cellWidth), g = Math.floor(m / this.Or.cellHeight), d = p >= 0 && p < this.Or.cols && g >= 0 && g < this.Or.rows;
    return { id: i, x: d ? p : -1, y: d ? g : -1, clientX: t, clientY: e, pressure: s.pressure, radiusX: s.radiusX, radiusY: s.radiusY, rotationAngle: s.rotationAngle };
  }
  Ho(t, e, i, s) {
    const r = this.Nn.get(t.id), n = Array.from(this.In.values()).map((l) => this.Oo(l)), o = Array.from(this.Gn.values()).map((l) => this.Oo(l)), c = this.Lo(e.changedTouches);
    return { touch: this.Oo(t), previousTouch: i ? this.Oo(i) : void 0, touches: o, previousTouches: n, changedTouches: c, deltaTime: r ? s - r.lastTime : 0, originalEvent: e };
  }
  Go() {
    if (this.Gn.size !== 2) return void (this.Xn = null);
    const t = Array.from(this.Gn.values()), [e, i] = t, s = this.Io(e, i, !1), r = this.Ko(e, i);
    this.Xn = { ids: [e.id, i.id], initialDistance: Math.max(s, 1e-4), initialAngle: r, lastScale: 1, lastRotation: 0 };
  }
  No(t) {
    if (this.Xn || this.Go(), !this.Xn) return;
    const [e, i] = this.Xn.ids, s = this.Gn.get(e), r = this.Gn.get(i);
    if (!s || !r) return;
    const n = this.Io(s, r, !1) / this.Xn.initialDistance, o = n - this.Xn.lastScale;
    this.oo && Math.abs(o) > this._o && (this.oo({ touches: [this.Oo(s), this.Oo(r)], scale: n, deltaScale: o, center: this.jo(s, r), originalEvent: t }), this.Xn.lastScale = n);
    let c = this.Ko(s, r) - this.Xn.initialAngle;
    c = (c + 180) % 360 - 180;
    const l = c - this.Xn.lastRotation;
    this.ho && Math.abs(l) > this.mo && (this.ho({ touches: [this.Oo(s), this.Oo(r)], rotation: c, deltaRotation: l, center: this.jo(s, r), originalEvent: t }), this.Xn.lastRotation = c);
  }
  jo(t, e) {
    const i = (t.clientX + e.clientX) / 2, s = (t.clientY + e.clientY) / 2, r = this.Fo(i, s, -1, { id: -1, x: -1, y: -1, clientX: i, clientY: s });
    return { x: r.x, y: r.y };
  }
  Xo(t, e) {
    const i = performance.now(), s = i - t.startTime, r = this.Io(t.startPosition, t.lastPosition, !0);
    if (!t.longPressFired && s <= this.ao && r <= this.lo)
      this.Yo(t.lastPosition, i) && this.io ? this.io({ touch: this.Oo(t.lastPosition), taps: 2, originalEvent: e }) : this.eo && this.eo({ touch: this.Oo(t.lastPosition), taps: 1, originalEvent: e });
    else if (!t.longPressFired && s <= this.po && r >= this.do) {
      const n = { x: t.lastPosition.clientX - t.startPosition.clientX, y: t.lastPosition.clientY - t.startPosition.clientY }, o = Math.max(Math.hypot(n.x, n.y), 1e-4), c = { x: n.x / o, y: n.y / o }, l = { x: n.x / s, y: n.y / s };
      this.no && this.no({ touch: this.Oo(t.lastPosition), direction: c, distance: o, velocity: l, originalEvent: e });
    }
    this.Ao = i, this.yo = this.Oo(t.lastPosition);
  }
  Yo(t, e) {
    return !this.yo || e - this.Ao > this.co ? !1 : this.Io(t, this.yo, !0) <= this.lo;
  }
  Oo(t) {
    return { ...t };
  }
  Io(t, e, i) {
    return i ? Math.hypot(t.clientX - e.clientX, t.clientY - e.clientY) : Math.hypot(t.x - e.x, t.y - e.y);
  }
  Ko(t, e) {
    return 180 * Math.atan2(e.clientY - t.clientY, e.clientX - t.clientX) / Math.PI;
  }
}
const Vt = Object.freeze(Object.defineProperty({ __proto__: null, TouchManager: ot }, Symbol.toStringTag, { value: "Module" })), qt = (a) => class extends a {
  rotate(t = 0, e = 0, i = 0) {
    this.xt.state.st(t), this.xt.state.et(e), this.xt.state.it(i);
  }
  rotateX(t) {
    this.xt.state.st(t);
  }
  rotateY(t) {
    this.xt.state.et(t);
  }
  rotateZ(t) {
    this.xt.state.it(t);
  }
  push() {
    this.xt.state.G();
  }
  pop() {
    this.xt.state.Z();
  }
  rect(t, e, i = 1, s = 1) {
    this.xt.Ne(t, e, i, s);
  }
  point(t, e) {
    this.xt.Ne(t, e, 1, 1);
  }
  line(t, e, i, s) {
    this.xt.Xe(t, e, i, s);
  }
  lineWeight(t) {
    this.xt.state.tt(t);
  }
  background(t, e = t, i = t, s = 255) {
    this.xt.qe(t, e, i, s);
  }
  char(t) {
    this.xt.state.rt(this.$i.Pi(t));
  }
  charColor(t, e, i, s = 255) {
    this.xt.state.nt(t, e, i, s);
  }
  cellColor(t, e, i, s = 255) {
    this.xt.state.ot(t, e, i, s);
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
    this.xt.qe(0, 0, 0, 0);
  }
  ellipse(t, e, i, s) {
    this.xt.We(t, e, i / 2, s / 2);
  }
  triangle(t, e, i, s, r, n) {
    this.xt.Ke(t, e, i, s, r, n);
  }
  bezierCurve(t, e, i, s, r, n, o, c) {
    this.xt.je(t, e, i, s, r, n, o, c);
  }
  arc(t, e, i, s, r, n) {
    this.xt.Ve(t, e, i, s, r, n);
  }
  shader(t) {
    this.xt.Be(t);
  }
  setUniform(t, e) {
    this.xt.Kt(t, e);
  }
  setUniforms(t) {
    this.xt.Le(t);
  }
  createFilterShader(t) {
    return this.xt.hs(t);
  }
  createFramebuffer(t) {
    return this.xt.Ye(t.width, t.height, 5, { filter: "nearest", wrap: "clamp", format: "rgba", type: "unsigned_byte" });
  }
  image(t, e, i, s, r) {
    if (t.textures) {
      const n = t;
      this.xt.Oe(n, e, i, s ?? n.width, r ?? n.height);
    } else {
      const n = t;
      this.xt.He(n, e, i, s ?? Math.floor(this.Or.cols / 2), r ?? Math.floor(this.Or.rows / 2));
    }
  }
  async loadImage(t) {
    if (typeof t != "string") return G.zr(this.xt, t, (s) => this.$i.Si(s));
    const e = t, i = await new Promise((s, r) => {
      const n = new Image();
      n.crossOrigin = "anonymous", n.onload = () => s(n), n.onerror = (o) => r(o), n.src = e;
    });
    return G.zr(this.xt, i, (s) => this.$i.Si(s));
  }
}, Kt = (a) => class extends a {
  async loadFont(t) {
    return this.$i.qi(t).then(() => {
      const e = this.$i.maxGlyphDimensions;
      this.Or.hr(e.width, e.height), this.Vo.resize(this.Or.cols, this.Or.rows), this.xt.Ze(), this.Hn.hn();
    });
  }
  fontSize(t) {
    if (!z.v(typeof t == "number" && t > 0, "Font size must be a positive number greater than 0.", { method: "fontSize", providedValue: t }) || this.$i.fontSize === t) return;
    this.$i.Vi(t);
    const e = this.$i.maxGlyphDimensions;
    this.Or.hr(e.width, e.height), this.Vo.resize(this.Or.cols, this.Or.rows), this.xt.Ze(), this.Hn.hn();
  }
  glyphColor(t) {
    return this.$i.Pi(t);
  }
  glyphColors(t) {
    return this.$i.Si(t);
  }
}, jt = (a) => class extends a {
  get frameCount() {
    return this.qo.frameCount;
  }
  set frameCount(t) {
    this.qo.frameCount = t;
  }
  frameRate(t) {
    return t === void 0 ? this.qo.currentFrameRate : this.qo.frameRate(t, () => this.Zo());
  }
  noLoop() {
    this.qo.pause();
  }
  loop() {
    this.qo.resume(() => this.Zo());
  }
  redraw(t = 1) {
    if (z.v(typeof t == "number" && t > 0 && Number.isInteger(t), "Redraw count must be a positive integer.", { method: "redraw", providedValue: t })) for (let e = 0; e < t; e++) this.Zo();
  }
  isLooping() {
    return this.qo.isLooping;
  }
}, Zt = (a) => class extends a {
  constructor(...t) {
    super(...t);
  }
  mouseClicked(t) {
    this.Hn.mn(t);
  }
  mousePressed(t) {
    this.Hn.vn(t);
  }
  mouseReleased(t) {
    this.Hn.gn(t);
  }
  mouseMoved(t) {
    this.Hn.An(t);
  }
  mouseScrolled(t) {
    this.Hn.yn(t);
  }
  get mouse() {
    return this.Hn.wn();
  }
  cursor(t) {
    this.Hn.nn(t);
  }
}, Qt = (a) => class extends a {
  constructor(...t) {
    super(...t);
  }
  touchStarted(t) {
    this.Qo.Ro(t);
  }
  touchMoved(t) {
    this.Qo.An(t);
  }
  touchEnded(t) {
    this.Qo.To(t);
  }
  touchCancelled(t) {
    this.Qo.Po(t);
  }
  tap(t) {
    this.Qo.So(t);
  }
  doubleTap(t) {
    this.Qo.$o(t);
  }
  longPress(t) {
    this.Qo.Eo(t);
  }
  swipe(t) {
    this.Qo.Do(t);
  }
  pinch(t) {
    this.Qo.ko(t);
  }
  rotateGesture(t) {
    this.Qo.Bo(t);
  }
  get touches() {
    return this.Qo.zo();
  }
}, Jt = (a) => class extends a {
  constructor(...t) {
    super(...t);
  }
  keyPressed(t) {
    this.Jo.vn(t);
  }
  keyReleased(t) {
    this.Jo.gn(t);
  }
  isKeyPressed(t) {
    return this.Jo.$n(t);
  }
  get lastKeyPressed() {
    return this.Jo.Dn();
  }
  get lastKeyReleased() {
    return this.Jo.kn();
  }
  get pressedKeys() {
    return this.Jo.Bn();
  }
  get modifierState() {
    return this.Jo.Ln();
  }
};
class $t {
  constructor(t) {
    h(this, "th");
    h(this, "sh", /* @__PURE__ */ new Map());
    h(this, "eh", []);
    h(this, "ih", /* @__PURE__ */ new Map());
    h(this, "rh", /* @__PURE__ */ new Map());
    this.th = t;
  }
  async nh(t) {
    for (const e of t) {
      if (this.sh.has(e.name)) return void console.warn(`[textmode.js] Plugin "${e.name}" is already installed.`);
      const i = this.oh(e.name);
      try {
        await e.install(this.th, i);
      } catch (s) {
        throw this.hh(e.name), s;
      }
      this.sh.set(e.name, e), this.eh.push(e.name);
    }
  }
  async ah(t) {
    const e = this.sh.get(t);
    if (!e) return;
    const i = this.oh(t);
    if (e.uninstall) try {
      await e.uninstall(this.th, i);
    } catch (s) {
      console.error(`[textmode.js] Error while uninstalling plugin "${t}":`, s);
    }
    this.sh.delete(t), this.eh.splice(this.eh.indexOf(t), 1), this.hh(t);
  }
  runPreDrawHooks() {
    this.uh(this.ih, "preDraw");
  }
  runPostDrawHooks() {
    this.uh(this.rh, "postDraw");
  }
  async fh() {
    const t = [...this.sh.keys()];
    for (const e of t) await this.ah(e);
  }
  oh(t) {
    return { ...this.th.dh(), registerPreDrawHook: (e) => this.ph(this.ih, t, e), registerPostDrawHook: (e) => this.ph(this.rh, t, e) };
  }
  ph(t, e, i) {
    const s = t.get(e) ?? /* @__PURE__ */ new Set();
    return s.add(i), t.set(e, s), () => {
      const r = t.get(e);
      r && (r.delete(i), r.size === 0 && t.delete(e));
    };
  }
  hh(t) {
    this.ih.delete(t), this.rh.delete(t);
  }
  uh(t, e) {
    for (const i of this.eh) {
      const s = t.get(i);
      if (s) for (const r of s) try {
        r();
      } catch (n) {
        console.error(`[textmode.js] Plugin "${i}" ${e} hook failed:`, n);
      }
    }
  }
}
class te {
  constructor() {
    h(this, "xt");
    h(this, "$i");
    h(this, "er");
    h(this, "Or");
    h(this, "qo");
    h(this, "Hn");
    h(this, "Qo");
    h(this, "Jo");
    h(this, "_h");
    h(this, "Vo");
    h(this, "mh");
    h(this, "gh");
    h(this, "Ah");
  }
  Zo() {
  }
}
class ee extends function(e, ...i) {
  return i.reduce((s, r) => r(s), e);
}(te, qt, Kt, jt, Zt, Qt, Jt) {
  constructor(e = {}) {
    super();
    h(this, "yh");
    h(this, "wh", !1);
    h(this, "Ch", () => {
    });
    h(this, "bh", () => {
    });
    h(this, "xh", () => {
    });
    h(this, "Mh");
    h(this, "lr");
    h(this, "cr", !1);
    h(this, "Fh");
    this.yh = new $t(this), this.cr = e.overlay ?? !1, this.er = new Xt(e), this.xt = new Ut(this.er.gr()), this.$i = new Gt(this.xt, e.fontSize ?? 16), this.qo = new Yt(e.frameRate ?? 60), this.Hn = new rt(this.er), this.Qo = new ot(this.er, this.Hn), this.Jo = new nt(), this._h = this.xt.Pt(), this.mh = this.xt.rs(), this.zh(e);
  }
  async zh(e) {
    await this.$i.Ki(e.fontSource);
    const i = this.$i.maxGlyphDimensions;
    this.Or = new Ht(this.er.canvas, i.width, i.height), this.Hn.Ki(this.Or), this.Qo.Ki(this.Or), this.Vo = this.xt.Ye(this.Or.cols, this.Or.rows, 5), this.gh = this.xt.Ye(this.Or.width, this.Or.height, 1), this.cr && (this.Fh = G.zr(this.xt, this.er.targetCanvas, (s) => this.$i.Si(s))), this.Ah = this.xt.cs(st, "precision mediump float;uniform sampler2D Ua;uniform vec2 Ub;uniform vec2 Uc;uniform vec2 Ud;void main(){vec2 A=gl_FragCoord.xy-Uc;vec2 B=A*(Ub/Ud);vec2 C=(floor(B)+0.5)/Ub;gl_FragColor=texture2D(Ua,C);}"), this.Rh(), await this.yh.nh(e.plugins ?? []), this.Ch(), this.qo.start(() => this.Zo());
  }
  dh() {
    return { renderer: this.xt, font: this.$i, grid: this.Or, canvas: this.er, drawFramebuffer: this.Vo, asciiFramebuffer: this.gh, flushDrawCommands: () => {
      this.xt.St(this._h);
    } };
  }
  Rh() {
    this.Mh = () => {
      this.cr && this.resizeCanvas(this.er.targetCanvas.width, this.er.targetCanvas.height), this.xh();
    }, window.addEventListener("resize", this.Mh), this.Hn.an(), this.Qo.an(), this.Jo.an(), window.addEventListener("blur", () => {
      this.Jo.On();
    }), window.ResizeObserver && this.cr && (this.lr = new ResizeObserver(() => {
      this.resizeCanvas(this.er.targetCanvas.width, this.er.targetCanvas.height);
    }), this.lr.observe(this.er.targetCanvas));
  }
  Zo() {
    if (this.qo.measureFrameRate(), this.qo.incrementFrame(), this.wh) return;
    if (this.cr) {
      const i = this.xt.context;
      i.bindTexture(i.TEXTURE_2D, this.Fh.texture), i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL, 1), i.texImage2D(i.TEXTURE_2D, 0, i.RGBA, i.RGBA, i.UNSIGNED_BYTE, this.er.targetCanvas), i.bindTexture(i.TEXTURE_2D, null);
    }
    this.yh.runPreDrawHooks(), this.Vo.begin(), this.xt.ke(this._h), this.bh(), this.xt.St(this._h), this.Vo.end(), this.gh.begin(), this.xt.ke(this.mh), this.mh.Wt({ U0: this.$i.fontFramebuffer, U1: [this.$i.textureColumns, this.$i.textureRows], U2: this.Vo.textures[0], U3: this.Vo.textures[1], U4: this.Vo.textures[2], U5: this.Vo.textures[4], U6: this.Vo.textures[3], U7: [this.Or.cols, this.Or.rows], U8: [this.gh.width, this.gh.height], U9: this.gh.width / this.gh.height }), this.xt.Ie(0, 0, this.er.width, this.er.height), this.gh.end();
    const e = this.xt.state.canvasBackgroundColor;
    this.xt.Ys(e[0], e[1], e[2], e[3]), this.xt.ke(this.Ah), this.Ah.Wt({ Ua: this.gh.textures[0], Ub: [this.gh.width, this.gh.height], Uc: [this.Or.offsetX, this.Or.offsetY], Ud: [this.Or.width, this.Or.height] }), this.xt.Ie(this.Or.offsetX, this.Or.offsetY, this.Or.width, this.Or.height), this.yh.runPostDrawHooks();
  }
  setup(e) {
    this.Ch = e;
  }
  draw(e) {
    this.bh = e;
  }
  windowResized(e) {
    this.xh = e;
  }
  resizeCanvas(e, i) {
    this.er.vr(e, i), this.Or.nr(), this.Vo.resize(this.Or.cols, this.Or.rows), this.gh.resize(this.Or.width, this.Or.height), this.xt.Ze(), this.Hn.hn(), this.Qo.wo(), this.Zo();
  }
  destroy() {
    this.wh || (this.qo.stop(), this.yh.fh().catch((e) => {
      console.error("[textmode.js] Error while disposing plugins:", e);
    }), window.removeEventListener("resize", this.Mh), this.Hn._n(), this.Qo._n(), this.Jo._n(), this.$i.Dt(), this.xt.Dt(), this.gh.Dt(), this.Ah.Dt(), this.Fh && this.Fh.Dt(), this.wh = !0);
  }
  get grid() {
    return this.Or;
  }
  get font() {
    return this.$i;
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
  get drawFramebuffer() {
    return this.Vo;
  }
  get isDisposed() {
    return this.wh;
  }
  get overlay() {
    return this.Fh;
  }
}
class Q {
  constructor() {
  }
  static create(t = {}) {
    return new ee(t);
  }
  static setErrorLevel(t) {
    z.A(t);
  }
  static get version() {
    return "0.4.0";
  }
}
const se = Object.freeze(Object.defineProperty({ __proto__: null, keyboard: kt, mouse: Wt, touch: Vt }, Symbol.toStringTag, { value: "Module" })), re = Q.create, ne = Q.setErrorLevel, oe = Q.version;
export {
  Xt as TextmodeCanvas,
  ct as TextmodeErrorLevel,
  Gt as TextmodeFont,
  j as TextmodeFramebuffer,
  Ht as TextmodeGrid,
  G as TextmodeImage,
  ee as Textmodifier,
  re as create,
  se as input,
  ne as setErrorLevel,
  Q as textmode,
  oe as version
};
