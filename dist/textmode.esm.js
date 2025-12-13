var Vt = Object.defineProperty;
var Jt = (n, t, e) => t in n ? Vt(n, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : n[t] = e;
var a = (n, t, e) => Jt(n, typeof t != "symbol" ? t + "" : t, e);
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
var $t = ((n) => (n[n.SILENT = 0] = "SILENT", n[n.WARNING = 1] = "WARNING", n[n.ERROR = 2] = "ERROR", n[n.THROW = 3] = "THROW", n))($t || {});
const D = class D {
  constructor() {
    a(this, "l", { globalLevel: 3 });
  }
  static u() {
    return D.h || (D.h = new D()), D.h;
  }
  v(t, e) {
    const i = "%c[textmode.js] Oops! (╯°□°)╯︵ Something went wrong in your code.", s = "color: #f44336; font-weight: bold; background: #ffebee; padding: 2px 6px; border-radius: 3px;";
    switch (this.l.globalLevel) {
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
  m(t, e, i) {
    return !!t || (this.v(e, i), !1);
  }
  _(t) {
    this.l.globalLevel = t;
  }
};
a(D, "h", null);
let ut = D;
const vt = ut.u();
class q {
  constructor(t, e, i) {
    a(this, "A");
    a(this, "C");
    a(this, "M", /* @__PURE__ */ new Map());
    a(this, "F", /* @__PURE__ */ new Map());
    a(this, "$", 0);
    a(this, "P", /* @__PURE__ */ new Map());
    a(this, "U");
    this.A = t, this.U = t.getParameter(t.MAX_TEXTURE_IMAGE_UNITS) ?? 16, this.C = this.R(e, i), this.S();
  }
  S() {
    const t = this.A.getProgramParameter(this.C, this.A.ACTIVE_UNIFORMS);
    for (let e = 0; e < t; e++) {
      const i = this.A.getActiveUniform(this.C, e);
      if (i) {
        const s = i.name.replace(/\[0\]$/, ""), r = this.A.getUniformLocation(this.C, s);
        r && (this.M.set(s, r), this.F.set(s, { type: i.type, size: i.size }));
      }
    }
  }
  R(t, e) {
    const i = this.k(this.A.VERTEX_SHADER, t), s = this.k(this.A.FRAGMENT_SHADER, e), r = this.A.createProgram();
    if (this.A.attachShader(r, i), this.A.attachShader(r, s), this.A.linkProgram(r), !this.A.getProgramParameter(r, this.A.LINK_STATUS)) {
      const h = this.A.getProgramInfoLog(r);
      throw Error("Shader program link error: " + h);
    }
    return this.A.deleteShader(i), this.A.deleteShader(s), r;
  }
  k(t, e) {
    const i = this.A.createShader(t);
    if (this.A.shaderSource(i, e), this.A.compileShader(i), !this.A.getShaderParameter(i, this.A.COMPILE_STATUS)) {
      const s = this.A.getShaderInfoLog(i);
      throw this.A.deleteShader(i), Error("Shader compilation error: " + s);
    }
    return i;
  }
  D() {
    this.A.useProgram(this.C), this.L();
  }
  L() {
    this.$ = 0, this.P.clear();
  }
  O(t) {
    for (const e in t) this.I(e, t[e]);
  }
  I(t, e) {
    var c, l;
    const i = this.M.get(t);
    if (!i) return;
    const s = this.F.get(t);
    if (!s) return;
    const { type: r, size: h } = s, o = this.A;
    if (e instanceof WebGLTexture) {
      const u = this.H(t);
      return o.uniform1i(i, u), o.activeTexture(o.TEXTURE0 + u), void o.bindTexture(o.TEXTURE_2D, e);
    }
    if (e instanceof Z) {
      const u = this.H(t);
      return o.uniform1i(i, u), o.activeTexture(o.TEXTURE0 + u), void o.bindTexture(o.TEXTURE_2D, e.textures[0]);
    }
    if (typeof e == "number") return void (r === o.INT || r === o.BOOL ? o.uniform1i(i, e) : o.uniform1f(i, e));
    if (typeof e == "boolean") return void o.uniform1i(i, e ? 1 : 0);
    if (Array.isArray(e[0])) {
      const u = e.flat(), f = { [o.FLOAT_VEC2]: () => o.uniform2fv(i, u), [o.FLOAT_VEC3]: () => o.uniform3fv(i, u), [o.FLOAT_VEC4]: () => o.uniform4fv(i, u) };
      (c = f[r]) == null || c.call(f);
    } else {
      const u = e, f = { [o.FLOAT]: () => h > 1 ? o.uniform1fv(i, u) : o.uniform1f(i, u[0]), [o.FLOAT_VEC2]: () => o.uniform2fv(i, u), [o.FLOAT_VEC3]: () => o.uniform3fv(i, u), [o.FLOAT_VEC4]: () => o.uniform4fv(i, u), [o.INT]: () => h > 1 ? o.uniform1iv(i, u) : o.uniform1i(i, u[0]), [o.INT_VEC2]: () => o.uniform2iv(i, u), [o.INT_VEC3]: () => o.uniform3iv(i, u), [o.INT_VEC4]: () => o.uniform4iv(i, u), [o.BOOL]: () => o.uniform1iv(i, u), [o.FLOAT_MAT2]: () => o.uniformMatrix2fv(i, !1, u), [o.FLOAT_MAT3]: () => o.uniformMatrix3fv(i, !1, u), [o.FLOAT_MAT4]: () => o.uniformMatrix4fv(i, !1, u) };
      (l = f[r]) == null || l.call(f);
    }
  }
  H(t) {
    const e = this.P.get(t);
    if (e !== void 0) return e;
    if (this.$ >= this.U) throw Error(`[textmode.js] Shader attempted to bind more than ${this.U} texture samplers. Uniform "${t}" cannot be assigned.`);
    const i = this.$++;
    return this.P.set(t, i), i;
  }
  get G() {
    return this.C;
  }
  dispose() {
    this.A.deleteProgram(this.C);
  }
}
function At(n, t, e, i) {
  return 180 * Math.atan2(i - t, e - n) / Math.PI;
}
function Y(n, t, e, i) {
  return Math.hypot(e - n, i - t);
}
function I(n, t, e) {
  return Math.min(Math.max(n, t), e);
}
function xt(n) {
  return (n % 360 + 360) % 360 / 360;
}
function Tt(n, t, e) {
  n.bindTexture(n.TEXTURE_2D, t), n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL, 1), n.texImage2D(n.TEXTURE_2D, 0, n.RGBA, n.RGBA, n.UNSIGNED_BYTE, e), n.bindTexture(n.TEXTURE_2D, null);
}
function pt(n, t, e, i, s) {
  n.texParameteri(n.TEXTURE_2D, n.TEXTURE_MIN_FILTER, t), n.texParameteri(n.TEXTURE_2D, n.TEXTURE_MAG_FILTER, e), n.texParameteri(n.TEXTURE_2D, n.TEXTURE_WRAP_S, i), n.texParameteri(n.TEXTURE_2D, n.TEXTURE_WRAP_T, s);
}
function ft(n, t, e, i, s, r = 0, h = WebGL2RenderingContext.FLOAT, o = !1) {
  n.enableVertexAttribArray(t), n.vertexAttribPointer(t, e, h, o, i, s), n.vertexAttribDivisor(t, r);
}
function Rt(n, t, e, i, s) {
  n.bindBuffer(t, e), n.bufferData(t, i, s), n.bindBuffer(t, null);
}
const st = `#version 300 es
in vec2 A0;in vec2 A1;in vec2 A2;in vec2 A3;in vec3 A4;in vec4 A5;in vec4 A6;in vec4 A7;in vec3 A8;in vec3 A9;in vec4 Aa;in vec4 Ab;in vec3 Ac;uniform vec2 Ur;uniform float Us;uniform float Ut;out vec2 v_uv;out vec3 v_glyphIndex;out vec4 v_glyphColor;out vec4 v_cellColor;out vec4 v_glyphFlags;out vec3 v_worldPosition;out vec3 v_normal;out float v_geometryType;const float A=6.28318530718f;const int B=2;const int C=3;const int D=4;vec2 E(float F,vec2 G,vec2 H,vec2 I,vec2 J){float K=1.0f-F;float L=K*K;float M=L*K;float N=F*F;float O=N*F;return M*G+3.0f*L*F*H+3.0f*K*N*I+O*J;}vec2 P(float F,vec2 G,vec2 H,vec2 I,vec2 J){float K=1.0f-F;float L=K*K;float N=F*F;return-3.0f*L*G+3.0f*(L-2.0f*K*F)*H+3.0f*(2.0f*K*F-N)*I+3.0f*N*J;}vec3 Q(vec3 R,float S){float T=cos(S);float U=sin(S);return vec3(R.x,R.y*T-R.z*U,R.y*U+R.z*T);}vec3 V(vec3 R,float S){float T=cos(S);float U=sin(S);return vec3(R.x*T+R.z*U,R.y,-R.x*U+R.z*T);}vec3 W(vec3 R,float S){float T=cos(S);float U=sin(S);return vec3(R.x*T-R.y*U,R.x*U+R.y*T,R.z);}vec3 X(vec3 R,vec3 Y){vec3 Z=R;if(Y.z!=0.0f){Z=W(Z,Y.z);}if(Y.y!=0.0f){Z=V(Z,Y.y);}if(Y.x!=0.0f){Z=Q(Z,Y.x);}return Z;}void main(){v_uv=A1;v_glyphIndex=A4;v_glyphColor=A5;v_cellColor=A6;v_glyphFlags=A7;vec4 a=Aa;vec4 b=Ab;vec2 c=A3;vec2 d=A2;float e=Ac.x;float f=Ac.y;int g=int(Ac.z);vec2 h=d;vec2 i=h+c*0.5f;float j=f+e*0.5f;vec3 k=vec3(i,j);vec3 l;if(g==D){float F=clamp(A0.x,0.0f,1.0f);vec2 G=b.xy;vec2 H=a.xy;vec2 I=a.zw;vec2 J=b.zw;vec2 m=E(F,G,H,I,J);vec2 n=P(F,G,H,I,J);float o=length(n);vec2 p=o>0.0f?n/o:vec2(1.0f,0.0f);vec2 q=vec2(-p.y,p.x);vec2 r=m;vec2 s=r+q*A0.y*c.y;l=vec3(s,f);}else if(g==C){float t=mod(a.x,A);if(t<0.0f){t+=A;}float u=mod(a.y,A);if(u<0.0f){u+=A;}float v=t-u;if(v<=0.0f){v+=A;}float S=t-A0.x*v;vec2 w=vec2(cos(S),sin(S))*A0.y;vec2 s=w*c+h;l=vec3(s,f);}else if(g==B){vec2 s=A0.xy*c+h;l=vec3(s,f);}vec3 x=X(l,A9);vec3 y=x+A8;vec3 z=vec3(0.0f,0.0f,1.0f);v_worldPosition=y;v_normal=z;v_geometryType=float(g);vec2 AA=(y.xy/Ur)*2.0f;AA.y=-AA.y;float AB=y.z/Ur.y;float AC=clamp(-AB*Us,-0.99f,0.99f);if(Ut>0.5f){gl_Position=vec4(AA,AC,1.0f);}else{float AD=0.5f;float AE=1.0f/(1.0f-AB*AD);AA*=AE;gl_Position=vec4(AA,AC,1.0f);}}`, X = class X {
  constructor(t, e, i = e, s = 1, r = {}, h) {
    a(this, "N");
    a(this, "X");
    a(this, "l");
    a(this, "A");
    a(this, "Y");
    a(this, "j", []);
    a(this, "K", null);
    a(this, "W");
    a(this, "Z");
    a(this, "q", null);
    a(this, "V", /* @__PURE__ */ new Map());
    this.N = e, this.X = i, this.A = t, this.W = I(s, 1, 8), this.Z = h, this.l = { filter: "nearest", wrap: "clamp", format: "rgba", type: "unsigned_byte", depth: !0, ...r }, X.J || (X.J = new q(t, st, `#version 300 es
precision highp float;in vec2 v_uv;uniform sampler2D U0;uniform sampler2D U1;uniform sampler2D U2;uniform sampler2D U3;uniform vec2 U4;uniform bool U5;uniform bool U6;uniform bool U7;layout(location=0)out vec4 o_character;layout(location=1)out vec4 o_primaryColor;layout(location=2)out vec4 o_secondaryColor;layout(location=3)out vec4 A;void main(){vec2 B=vec2(v_uv.x,1.-v_uv.y);vec2 C=B*U4;vec2 D=(floor(C)+0.5f)/U4;vec4 E=texture(U0,D);vec4 F=U5?texture(U1,D):vec4(0.);if(U5&&F.a==0.){discard;}vec4 G=U6?texture(U2,D):vec4(0.);vec4 H=U7?texture(U3,D):vec4(0.);o_character=E;o_primaryColor=F;o_secondaryColor=G;A=H;}`));
    const o = t.getParameter(t.MAX_DRAW_BUFFERS), c = t.getParameter(t.MAX_COLOR_ATTACHMENTS);
    this.W = Math.min(this.W, o, c), this.Y = t.createFramebuffer(), this.tt(), this.st(), this.l.depth && this.it();
  }
  tt() {
    const t = this.A, e = this.l.filter === "linear" ? t.LINEAR : t.NEAREST, i = this.l.wrap === "repeat" ? t.REPEAT : t.CLAMP_TO_EDGE, s = this.l.type === "float" ? t.FLOAT : t.UNSIGNED_BYTE, r = s === t.FLOAT ? t.RGBA32F : t.RGBA8, h = t.RGBA;
    for (let o = 0; o < this.W; o++) {
      const c = t.createTexture();
      t.bindTexture(t.TEXTURE_2D, c), pt(t, e, e, i, i), t.texImage2D(t.TEXTURE_2D, 0, r, this.N, this.X, 0, h, s, null), this.j.push(c);
    }
    t.bindTexture(t.TEXTURE_2D, null);
  }
  st() {
    const t = this.A;
    if (t.bindFramebuffer(t.FRAMEBUFFER, this.Y), this.W === 1) t.framebufferTexture2D(t.FRAMEBUFFER, t.COLOR_ATTACHMENT0, t.TEXTURE_2D, this.j[0], 0);
    else {
      const e = [];
      for (let i = 0; i < this.W; i++) {
        const s = t.COLOR_ATTACHMENT0 + i;
        t.framebufferTexture2D(t.FRAMEBUFFER, s, t.TEXTURE_2D, this.j[i], 0), e.push(s);
      }
      t.drawBuffers(e);
    }
    t.bindFramebuffer(t.FRAMEBUFFER, null);
  }
  it() {
    const t = this.A;
    this.K = t.createRenderbuffer(), t.bindRenderbuffer(t.RENDERBUFFER, this.K), t.renderbufferStorage(t.RENDERBUFFER, t.DEPTH_COMPONENT24, this.N, this.X), t.bindFramebuffer(t.FRAMEBUFFER, this.Y), t.framebufferRenderbuffer(t.FRAMEBUFFER, t.DEPTH_ATTACHMENT, t.RENDERBUFFER, this.K), t.bindFramebuffer(t.FRAMEBUFFER, null), t.bindRenderbuffer(t.RENDERBUFFER, null);
  }
  et(t) {
    Tt(this.A, this.j[0], t);
  }
  resize(t, e) {
    this.N = t, this.X = e, this.V.clear();
    const i = this.A, s = this.l.type === "float" ? i.FLOAT : i.UNSIGNED_BYTE, r = s === i.FLOAT ? i.RGBA32F : i.RGBA8, h = i.RGBA;
    for (const o of this.j) i.bindTexture(i.TEXTURE_2D, o), i.texImage2D(i.TEXTURE_2D, 0, r, this.N, this.X, 0, h, s, null);
    i.bindTexture(i.TEXTURE_2D, null), this.K && (i.bindRenderbuffer(i.RENDERBUFFER, this.K), i.renderbufferStorage(i.RENDERBUFFER, i.DEPTH_COMPONENT24, this.N, this.X), i.bindRenderbuffer(i.RENDERBUFFER, null));
  }
  readPixels(t) {
    const e = this.V.get(t);
    if (e) return e;
    const i = this.A, s = this.N, r = this.X, h = new Uint8Array(s * r * 4), o = i.getParameter(i.READ_FRAMEBUFFER_BINDING);
    i.bindFramebuffer(i.READ_FRAMEBUFFER, this.Y), i.readBuffer(i.COLOR_ATTACHMENT0 + t), i.readPixels(0, 0, s, r, i.RGBA, i.UNSIGNED_BYTE, h), i.bindFramebuffer(i.READ_FRAMEBUFFER, o);
    const c = 4 * s, l = new Uint8Array(h.length);
    for (let u = 0; u < r; u++) {
      const f = (r - 1 - u) * c, d = u * c;
      l.set(h.subarray(f, f + c), d);
    }
    return this.V.set(t, l), l;
  }
  begin() {
    const t = this.A;
    this.V.clear(), this.Z.rt(), this.Z.nt(this.Y, this.N, this.X, this.W), this.l.depth && t.clear(t.DEPTH_BUFFER_BIT), this.Z.state.ot();
  }
  end() {
    this.Z.state.ht(), this.Z.ct(), this.Z.lt();
  }
  ut() {
    return this.q || this.ft(), this.q;
  }
  ft() {
    if (!this.Z) return;
    const t = this.W > 1, e = this.W > 2, i = this.W > 3, s = { U0: this.j[0], U1: t ? this.j[1] : this.j[0], U2: e ? this.j[2] : this.j[0], U3: i ? this.j[3] : this.j[0], U4: [this.N, this.X], U5: t, U6: e, U7: i }, r = X.J;
    this.q = this.Z.vt.dt(r, s, !0);
  }
  gt() {
    const t = this.A;
    t.deleteFramebuffer(this.Y), this.j.forEach((e) => {
      t.deleteTexture(e);
    }), this.K && t.deleteRenderbuffer(this.K);
  }
  get width() {
    return this.N;
  }
  get height() {
    return this.X;
  }
  get textures() {
    return this.j;
  }
  get attachmentCount() {
    return this.W;
  }
};
a(X, "J", null);
let Z = X;
const Ft = /* @__PURE__ */ new WeakMap();
function ht(n, t) {
  Ft.set(n, t);
}
function Ct(n) {
  return Ft.get(n);
}
function tt(n, t, e, i, s = 255) {
  n[0] = t / 255, n[1] = (e ?? t) / 255, n[2] = (i ?? t) / 255, n[3] = s / 255;
}
class rt {
  constructor() {
    a(this, "_t", 1);
    a(this, "yt", 0);
    a(this, "At", 0);
    a(this, "wt", 0);
    a(this, "bt", 0);
    a(this, "Ct", 0);
    a(this, "xt", 0);
    a(this, "Mt", [0, 0, 0]);
    a(this, "Ft", [1, 1, 1, 1]);
    a(this, "$t", [0, 0, 0, 1]);
    a(this, "Pt", !1);
    a(this, "Tt", !1);
    a(this, "Et", !1);
    a(this, "Rt", 0);
    a(this, "St", [0, 0, 0, 1]);
    a(this, "zt", !1);
    a(this, "kt", []);
    a(this, "Dt", []);
  }
  static Lt() {
    return { Ot: 1, It: 0, Bt: 0, Ht: 0, bt: 0, Ct: 0, xt: 0, Rt: 0, Gt: !1, Qt: !1, Et: !1, zt: !1, Nt: [0, 0, 0], Xt: [1, 1, 1, 1], Yt: [0, 0, 0, 1] };
  }
  jt(t) {
    t.Ot = this._t, t.It = this.yt, t.Bt = this.At, t.Ht = this.wt, t.bt = this.bt, t.Ct = this.Ct, t.xt = this.xt, t.Gt = this.Pt, t.Qt = this.Tt, t.Et = this.Et, t.Rt = this.Rt, t.zt = this.zt, t.Nt[0] = this.Mt[0], t.Nt[1] = this.Mt[1], t.Nt[2] = this.Mt[2], t.Xt[0] = this.Ft[0], t.Xt[1] = this.Ft[1], t.Xt[2] = this.Ft[2], t.Xt[3] = this.Ft[3], t.Yt[0] = this.$t[0], t.Yt[1] = this.$t[1], t.Yt[2] = this.$t[2], t.Yt[3] = this.$t[3];
  }
  Kt(t) {
    this._t = t.Ot, this.yt = t.It, this.At = t.Bt, this.wt = t.Ht, this.bt = t.bt, this.Ct = t.Ct, this.xt = t.xt, this.Pt = t.Gt, this.Tt = t.Qt, this.Et = t.Et, this.Rt = t.Rt, this.zt = t.zt, this.Mt[0] = t.Nt[0], this.Mt[1] = t.Nt[1], this.Mt[2] = t.Nt[2], this.Ft[0] = t.Xt[0], this.Ft[1] = t.Xt[1], this.Ft[2] = t.Xt[2], this.Ft[3] = t.Xt[3], this.$t[0] = t.Yt[0], this.$t[1] = t.Yt[1], this.$t[2] = t.Yt[2], this.$t[3] = t.Yt[3];
  }
  ot() {
    let t = this.Dt.pop();
    t || (t = rt.Lt()), this.jt(t), this.kt.push(t);
  }
  ht() {
    const t = this.kt.pop();
    t ? (this.Kt(t), this.Dt.push(t)) : console.warn("pop() called without matching push()");
  }
  Wt(t) {
    this.jt(t);
  }
  Zt(t) {
    this._t = Math.abs(t);
  }
  qt() {
    this.yt = 0, this.At = 0, this.wt = 0, this.bt = 0, this.Ct = 0, this.xt = 0, this.zt = !1;
  }
  Vt(t) {
    t !== 0 && (this.bt += t * Math.PI / 180);
  }
  Jt(t) {
    t !== 0 && (this.Ct += t * Math.PI / 180);
  }
  ts(t) {
    t !== 0 && (this.xt += t * Math.PI / 180);
  }
  ss(t = 0, e = 0, i = 0) {
    t === 0 && e === 0 && i === 0 || (this.yt += t, this.At += e, this.wt += i);
  }
  es(t) {
    this.ss(t, 0, 0);
  }
  rs(t) {
    this.ss(0, t, 0);
  }
  ns(t) {
    this.ss(0, 0, t);
  }
  hs(t) {
    this.Mt[0] = t[0], this.Mt[1] = t[1], this.Mt[2] = t[2];
  }
  cs(t, e, i, s = 255) {
    tt(this.Ft, t, e, i, s);
  }
  ls(t, e, i, s = 255) {
    tt(this.$t, t, e, i, s);
  }
  us(t) {
    this.Pt = t;
  }
  fs(t) {
    this.Tt = t;
  }
  ds(t) {
    this.Et = t;
  }
  vs(t) {
    this.Rt = xt(t);
  }
  ps(t, e, i, s) {
    tt(this.St, t, e, i, s);
  }
  gs(t) {
    this.zt = t;
  }
  get canvasBackgroundColor() {
    return this.St;
  }
  get useOrtho() {
    return this.zt;
  }
  get rotationX() {
    return this.bt;
  }
  get rotationY() {
    return this.Ct;
  }
  get rotationZ() {
    return this.xt;
  }
}
const dt = new Float32Array([-0.5, -0.5, 0, 0, 0.5, -0.5, 1, 0, -0.5, 0.5, 0, 1, -0.5, 0.5, 0, 1, 0.5, -0.5, 1, 0, 0.5, 0.5, 1, 1]), k = { _s: 16, As: WebGL2RenderingContext.TRIANGLES, ws: { bs: { size: 2, offset: 0 }, Cs: { size: 2, offset: 8 } } };
class te {
  constructor(t) {
    a(this, "A");
    a(this, "Ms");
    a(this, "Fs");
    this.A = t, this.Ms = t.createBuffer(), this.Fs = new Float32Array(dt.length);
  }
  $s(t, e, i, s) {
    const r = this.A, h = Ct(this.A), o = h[2], c = h[3], l = t / o * 2 - 1, u = (t + i) / o * 2 - 1, f = 1 - (e + s) / c * 2, d = 1 - e / c * 2, g = dt, p = this.Fs;
    for (let v = 0; v < g.length; v += 4) {
      const m = g[v], A = g[v + 1], b = g[v + 2], y = g[v + 3], x = l + (m + 0.5) * (u - l), E = f + (A + 0.5) * (d - f);
      p[v] = x, p[v + 1] = E, p[v + 2] = b, p[v + 3] = y;
    }
    r.bindBuffer(r.ARRAY_BUFFER, this.Ms), r.bufferData(r.ARRAY_BUFFER, p, r.DYNAMIC_DRAW), r.enableVertexAttribArray(0), r.vertexAttribPointer(0, 2, r.FLOAT, !1, 16, 0), r.enableVertexAttribArray(1), r.vertexAttribPointer(1, 2, r.FLOAT, !1, 16, 8), r.drawArrays(r.TRIANGLES, 0, 6), r.disableVertexAttribArray(1), r.disableVertexAttribArray(0), r.bindBuffer(r.ARRAY_BUFFER, null);
  }
  gt() {
    this.A.deleteBuffer(this.Ms);
  }
}
var w = ((n) => (n.RECTANGLE = "rectangle", n.LINE = "line", n.ELLIPSE = "ellipse", n.ARC = "arc", n.TRIANGLE = "triangle", n.BEZIER_CURVE = "bezier_curve", n))(w || {});
const ee = { rectangle: 2, line: 2, ellipse: 2, triangle: 2, arc: 3, bezier_curve: 4 };
class ie {
  constructor(t) {
    a(this, "A");
    a(this, "Ps", /* @__PURE__ */ new Map());
    this.A = t;
  }
  Ts(t, e, i, s) {
    const r = this.A;
    let h = this.Ps.get(t);
    h || (h = /* @__PURE__ */ new Map(), this.Ps.set(t, h));
    let o = h.get(e) || null;
    if (!o) {
      o = r.createVertexArray(), h.set(e, o), r.bindVertexArray(o), r.bindBuffer(r.ARRAY_BUFFER, s);
      const c = r.getAttribLocation(t, "A0");
      c !== -1 && ft(r, c, i.ws.bs.size, i._s, i.ws.bs.offset, 0, r.FLOAT, !1);
      const l = r.getAttribLocation(t, "A1");
      l !== -1 && ft(r, l, i.ws.Cs.size, i._s, i.ws.Cs.offset, 0, r.FLOAT, !1);
    }
    r.bindVertexArray(o);
  }
  Es() {
    this.A.bindVertexArray(null);
  }
  gt() {
    for (const [, t] of this.Ps) for (const [, e] of t) e && this.A.deleteVertexArray(e);
  }
}
const _ = class _ {
  static Rs(t, e, i = 0) {
    const s = e || new Float32Array(_.FLOATS_PER_INSTANCE);
    let r = i;
    s[r++] = t.bs[0], s[r++] = t.bs[1], s[r++] = t.Ss[0], s[r++] = t.Ss[1], s[r++] = t.Nt[0], s[r++] = t.Nt[1], s[r++] = t.Nt[2], s[r++] = t.Xt[0], s[r++] = t.Xt[1], s[r++] = t.Xt[2], s[r++] = t.Xt[3], s[r++] = t.Yt[0], s[r++] = t.Yt[1], s[r++] = t.Yt[2], s[r++] = t.Yt[3], s[r++] = t.zs[0], s[r++] = t.zs[1], s[r++] = t.zs[2], s[r++] = t.Rt;
    const h = t.ks;
    s[r++] = (h == null ? void 0 : h[0]) ?? 0, s[r++] = (h == null ? void 0 : h[1]) ?? 0, s[r++] = (h == null ? void 0 : h[2]) ?? 0;
    const o = t.Ds;
    s[r++] = (o == null ? void 0 : o[0]) ?? 0, s[r++] = (o == null ? void 0 : o[1]) ?? 0, s[r++] = (o == null ? void 0 : o[2]) ?? 0;
    const c = t.Ls, l = t.Os, u = t.Is, f = t.Bs, d = t.Hs, g = !(!l || !u);
    return g ? (s[r++] = (f == null ? void 0 : f[0]) ?? 0, s[r++] = (f == null ? void 0 : f[1]) ?? 0, s[r++] = (d == null ? void 0 : d[0]) ?? 0, s[r++] = (d == null ? void 0 : d[1]) ?? 0, s[r++] = l[0], s[r++] = l[1], s[r++] = u[0], s[r++] = u[1]) : !g && !!c ? (s[r++] = c[0], s[r++] = c[1], s[r++] = 0, s[r++] = 0, s[r++] = 0, s[r++] = 0, s[r++] = 0, s[r++] = 0) : (s[r++] = 0, s[r++] = 0, s[r++] = 0, s[r++] = 0, s[r++] = 0, s[r++] = 0, s[r++] = 0, s[r++] = 0), s[r++] = t.Gs ?? 0, s[r++] = t.Qs ?? 0, s[r++] = t.Ns ?? 0, s;
  }
  static Xs(t, e) {
    const i = t.length * _.FLOATS_PER_INSTANCE, s = e || new Float32Array(i);
    for (let r = 0; r < t.length; r++) {
      const h = r * _.FLOATS_PER_INSTANCE;
      _.Rs(t[r], s, h);
    }
    return s;
  }
};
a(_, "BYTES_PER_INSTANCE", 144), a(_, "FLOATS_PER_INSTANCE", 36);
let B = _;
const M = class M {
};
a(M, "STRIDE", B.BYTES_PER_INSTANCE), a(M, "ATTRIBUTES", { A2: { location: -1, size: 2, type: WebGL2RenderingContext.FLOAT, normalized: !1, stride: M.STRIDE, offset: 0, divisor: 1 }, A3: { location: -1, size: 2, type: WebGL2RenderingContext.FLOAT, normalized: !1, stride: M.STRIDE, offset: 8, divisor: 1 }, A4: { location: -1, size: 3, type: WebGL2RenderingContext.FLOAT, normalized: !1, stride: M.STRIDE, offset: 16, divisor: 1 }, A5: { location: -1, size: 4, type: WebGL2RenderingContext.FLOAT, normalized: !1, stride: M.STRIDE, offset: 28, divisor: 1 }, A6: { location: -1, size: 4, type: WebGL2RenderingContext.FLOAT, normalized: !1, stride: M.STRIDE, offset: 44, divisor: 1 }, A7: { location: -1, size: 4, type: WebGL2RenderingContext.FLOAT, normalized: !1, stride: M.STRIDE, offset: 60, divisor: 1 }, A8: { location: -1, size: 3, type: WebGL2RenderingContext.FLOAT, normalized: !1, stride: M.STRIDE, offset: 76, divisor: 1 }, A9: { location: -1, size: 3, type: WebGL2RenderingContext.FLOAT, normalized: !1, stride: M.STRIDE, offset: 88, divisor: 1 }, Aa: { location: -1, size: 4, type: WebGL2RenderingContext.FLOAT, normalized: !1, stride: M.STRIDE, offset: 100, divisor: 1 }, Ab: { location: -1, size: 4, type: WebGL2RenderingContext.FLOAT, normalized: !1, stride: M.STRIDE, offset: 116, divisor: 1 }, Ac: { location: -1, size: 3, type: WebGL2RenderingContext.FLOAT, normalized: !1, stride: M.STRIDE, offset: 132, divisor: 1 } });
let W = M;
class se {
  constructor(t = 1e3, e = 1.5) {
    a(this, "Ys");
    a(this, "js");
    a(this, "Ks");
    a(this, "Ws", 0);
    a(this, "Zs", 0);
    this.js = t, this.Ks = e;
    const i = t * B.FLOATS_PER_INSTANCE;
    this.Ys = new Float32Array(i);
  }
  qs(t) {
    if (t <= this.js) return;
    const e = Math.ceil(t * this.Ks), i = this.js;
    this.js = e;
    const s = e * B.FLOATS_PER_INSTANCE, r = new Float32Array(s), h = i * B.FLOATS_PER_INSTANCE;
    r.set(this.Ys.subarray(0, Math.min(h, this.Ws))), this.Ys = r;
  }
  Vs() {
    return { buffer: this.Ys, offset: this.Ws };
  }
  Js(t) {
    this.Ws += t, this.Zs++;
  }
  ti() {
    this.Ws = 0, this.Zs = 0;
  }
  si(t = 0, e) {
    return this.Ys.subarray(t, e ?? this.Ws);
  }
  get ii() {
    return this.Zs;
  }
  get ei() {
    return this.js;
  }
  get ri() {
    return this.Ws;
  }
  get ni() {
    return this.Zs === 0;
  }
}
class re {
  constructor(t) {
    a(this, "Ys");
    this.Ys = t;
  }
  oi(t) {
    this.Ys.qs(this.Ys.ii + 1);
    const { buffer: e, offset: i } = this.Ys.Vs();
    e[i + 0] = t.x, e[i + 1] = t.y, e[i + 2] = t.width, e[i + 3] = t.height, e[i + 4] = t.char0, e[i + 5] = t.char1, e[i + 6] = t.char2, e[i + 7] = t.r1, e[i + 8] = t.g1, e[i + 9] = t.b1, e[i + 10] = t.a1, e[i + 11] = t.r2, e[i + 12] = t.g2, e[i + 13] = t.b2, e[i + 14] = t.a2, e[i + 15] = t.invert, e[i + 16] = t.flipX, e[i + 17] = t.flipY, e[i + 18] = t.charRot, e[i + 19] = t.translationX, e[i + 20] = t.translationY, e[i + 21] = t.translationZ, e[i + 22] = t.rotationX, e[i + 23] = t.rotationY, e[i + 24] = t.rotationZ;
    const s = t.curveParams0, r = t.curveParams1;
    return e[i + 25] = s[0], e[i + 26] = s[1], e[i + 27] = s[2], e[i + 28] = s[3], e[i + 29] = r[0], e[i + 30] = r[1], e[i + 31] = r[2], e[i + 32] = r[3], e[i + 33] = t.depth, e[i + 34] = t.baseZ, e[i + 35] = t.geometryType, this.Ys.Js(B.FLOATS_PER_INSTANCE), this.Ys.ii - 1;
  }
  get ii() {
    return this.Ys.ii;
  }
}
class ne {
  constructor(t, e = 1e3) {
    a(this, "A");
    a(this, "hi", null);
    a(this, "ai", 0);
    a(this, "ci", /* @__PURE__ */ new Map());
    this.A = t, this.li(e);
  }
  li(t) {
    const e = this.A;
    this.hi && e.deleteBuffer(this.hi), this.hi = e.createBuffer();
    const i = t * B.BYTES_PER_INSTANCE;
    Rt(e, e.ARRAY_BUFFER, this.hi, i, e.DYNAMIC_DRAW), this.ai = t;
  }
  ui(t) {
    this.li(t);
  }
  get ei() {
    return this.ai;
  }
  fi(t, e) {
    if (e === 0) return;
    const i = this.A;
    i.bindBuffer(i.ARRAY_BUFFER, this.hi);
    const s = e * B.FLOATS_PER_INSTANCE;
    i.bufferSubData(i.ARRAY_BUFFER, 0, t, 0, s);
  }
  di(t) {
    let e = this.ci.get(t);
    if (!e) {
      e = /* @__PURE__ */ new Map();
      const i = this.A;
      for (const s in W.ATTRIBUTES) {
        const r = i.getAttribLocation(t, s);
        r !== -1 && e.set(s, r);
      }
      this.ci.set(t, e);
    }
    return e;
  }
  pi(t) {
    const e = this.A, i = t.G, s = this.di(i);
    for (const [r, h] of s) {
      const o = W.ATTRIBUTES[r];
      o && ft(e, h, o.size, o.stride, o.offset, o.divisor, o.type, o.normalized);
    }
  }
  gi(t) {
    const e = this.A, i = this.di(t.G);
    for (const [s, r] of i)
      W.ATTRIBUTES[s] && (e.disableVertexAttribArray(r), e.vertexAttribDivisor(r, 0));
  }
  gt() {
    this.hi && (this.A.deleteBuffer(this.hi), this.hi = null), this.ci.clear();
  }
}
class he {
  constructor(t, e = 1e3, i = 1.5) {
    a(this, "A");
    a(this, "Ys");
    a(this, "mi");
    a(this, "_i");
    this.A = t, this.Ys = new se(e, i), this.mi = new re(this.Ys), this._i = new ne(t, e);
  }
  yi(t) {
    var s, r, h, o, c, l, u, f, d, g;
    const e = [0, 0, 0, 0], i = [0, 0, 0, 0];
    return t.Os && t.Is ? (e[0] = ((s = t.Bs) == null ? void 0 : s[0]) ?? 0, e[1] = ((r = t.Bs) == null ? void 0 : r[1]) ?? 0, e[2] = ((h = t.Hs) == null ? void 0 : h[0]) ?? 0, e[3] = ((o = t.Hs) == null ? void 0 : o[1]) ?? 0, i[0] = t.Os[0], i[1] = t.Os[1], i[2] = t.Is[0], i[3] = t.Is[1]) : t.Ls && (e[0] = t.Ls[0], e[1] = t.Ls[1]), this.oi({ x: t.bs[0], y: t.bs[1], width: t.Ss[0], height: t.Ss[1], char0: t.Nt[0], char1: t.Nt[1], char2: t.Nt[2], r1: t.Xt[0], g1: t.Xt[1], b1: t.Xt[2], a1: t.Xt[3], r2: t.Yt[0], g2: t.Yt[1], b2: t.Yt[2], a2: t.Yt[3], invert: t.zs[0], flipX: t.zs[1], flipY: t.zs[2], charRot: t.Rt, translationX: ((c = t.ks) == null ? void 0 : c[0]) ?? 0, translationY: ((l = t.ks) == null ? void 0 : l[1]) ?? 0, translationZ: ((u = t.ks) == null ? void 0 : u[2]) ?? 0, rotationX: ((f = t.Ds) == null ? void 0 : f[0]) ?? 0, rotationY: ((d = t.Ds) == null ? void 0 : d[1]) ?? 0, rotationZ: ((g = t.Ds) == null ? void 0 : g[2]) ?? 0, curveParams0: e, curveParams1: i, depth: t.Gs || 0, baseZ: t.Qs || 0, geometryType: t.Ns || 0 });
  }
  oi(t) {
    const e = this.mi.oi(t);
    return this.Ys.ei > this._i.ei && this._i.ui(this.Ys.ei), e;
  }
  get Ai() {
    return this.Ys.ii;
  }
  get ni() {
    return this.Ys.ni;
  }
  wi() {
    this.Ys.ti();
  }
  pi(t) {
    const e = this.Ys.ii;
    if (e === 0) return;
    const i = this.Ys.si();
    this._i.fi(i, e), this._i.pi(t);
  }
  gi(t) {
    this._i.gi(t);
  }
  $s(t, e) {
    const i = this.Ys.ii;
    i !== 0 && this.A.drawArraysInstanced(t, 0, e, i);
  }
  gt() {
    this._i.gt();
  }
}
class O {
  constructor(t, e, i, s) {
    a(this, "A");
    a(this, "bi");
    a(this, "Ci");
    a(this, "xi");
    a(this, "Mi", null);
    this.A = t, this.bi = e, this.Ci = i, this.xi = s;
    const r = this.A.createBuffer();
    Rt(this.A, this.A.ARRAY_BUFFER, r, this.xi.Fi, this.A.STATIC_DRAW), this.Mi = r;
  }
  get type() {
    return this.Ci;
  }
  get unitGeometry() {
    return this.xi;
  }
  get unitBuffer() {
    return this.Mi;
  }
  get batch() {
    return this.bi;
  }
  $i() {
    this.bi.wi();
  }
  Pi() {
    return !this.bi.ni;
  }
  gt() {
    this.bi.gt(), this.A.deleteBuffer(this.Mi);
  }
  Ti(t, e, i) {
    return this.bi.yi(t);
  }
  Ei(t, e, i, s, r, h) {
    const o = r.It ?? 0, c = r.Bt ?? 0, l = r.Ht ?? 0, u = r.bt ?? 0, f = r.Ct ?? 0, d = r.xt ?? 0, g = [0, 0, 0, 0], p = [0, 0, 0, 0];
    h && (h.bezStartX !== void 0 && h.bezStartY !== void 0 && h.bezEndX !== void 0 && h.bezEndY !== void 0 ? (g[0] = h.cp1x ?? 0, g[1] = h.cp1y ?? 0, g[2] = h.cp2x ?? 0, g[3] = h.cp2y ?? 0, p[0] = h.bezStartX ?? 0, p[1] = h.bezStartY ?? 0, p[2] = h.bezEndX ?? 0, p[3] = h.bezEndY ?? 0) : h.arcStart === void 0 && h.arcStop === void 0 || (g[0] = h.arcStart ?? 0, g[1] = h.arcStop ?? 0));
    const v = { x: t, y: e, width: i, height: s, char0: r.Nt[0], char1: r.Nt[1], char2: r.Nt[2], r1: r.Xt[0], g1: r.Xt[1], b1: r.Xt[2], a1: r.Xt[3], r2: r.Yt[0], g2: r.Yt[1], b2: r.Yt[2], a2: r.Yt[3], invert: r.Et ? 1 : 0, flipX: r.Gt ? 1 : 0, flipY: r.Qt ? 1 : 0, charRot: r.Rt, translationX: o, translationY: c, translationZ: l, rotationX: u, rotationY: f, rotationZ: d, curveParams0: g, curveParams1: p, depth: (h == null ? void 0 : h.depth) ?? 0, baseZ: (h == null ? void 0 : h.baseZ) ?? 0, geometryType: ee[this.Ci] ?? 0 };
    return this.bi.oi(v);
  }
}
const oe = { Fi: dt, Ri: 6, ...k }, ae = { Fi: new Float32Array([0, -0.5, 0, 0, 1, -0.5, 1, 0, 0, 0.5, 0, 1, 0, 0.5, 0, 1, 1, -0.5, 1, 0, 1, 0.5, 1, 1]), Ri: 6, ...k }, ce = { Fi: function(n = 32) {
  const t = [], e = 2 * Math.PI / n;
  for (let i = 0; i < n; i++) {
    const s = i * e, r = (i + 1) % n * e, h = Math.cos(s), o = Math.sin(s), c = 0.5 * (h + 1), l = 0.5 * (o + 1), u = Math.cos(r), f = Math.sin(r), d = 0.5 * (u + 1), g = 0.5 * (f + 1);
    t.push(0, 0, 0.5, 0.5, h, o, c, l, u, f, d, g);
  }
  return new Float32Array(t);
}(32), Ri: 96, ...k };
let le = { Fi: function(n) {
  const t = [];
  for (let e = 0; e < n; e++) {
    const i = e / n, s = (e + 1) / n;
    t.push(i, 0, i, 0, i, 1, i, 1, s, 1, s, 1);
  }
  return new Float32Array(t);
}(32), Ri: 96, ...k };
const ue = { Fi: new Float32Array([0, 0, 0, 0, 1, 0, 1, 0, 0.5, 1, 0.5, 1]), Ri: 3, ...k }, fe = { Fi: function(n = 16) {
  const t = [];
  for (let e = 0; e < n; e++) {
    const i = e / n, s = (e + 1) / n;
    t.push(i, -0.5, i, 0, s, -0.5, s, 0, i, 0.5, i, 1, i, 0.5, i, 1, s, -0.5, s, 0, s, 0.5, s, 1);
  }
  return new Float32Array(t);
}(16), Ri: 96, ...k }, de = { [w.RECTANGLE]: class extends O {
  constructor(n, t) {
    super(n, t, w.RECTANGLE, oe);
  }
  yi(n, t) {
    return this.Ei(0, 0, n.width, n.height, t);
  }
}, [w.LINE]: class extends O {
  constructor(n, t) {
    super(n, t, w.LINE, ae);
  }
  yi(n, t) {
    const e = n.x2 - n.x1, i = n.y2 - n.y1, s = Math.hypot(e, i), r = Math.atan2(i, e), h = t.Ot || 1, o = n.x1 + e / 2 - s / 2, c = n.y1 + i / 2, l = { ...t, xt: (t.xt || 0) + r };
    return this.Ei(o, c, s, h, l);
  }
}, [w.ELLIPSE]: class extends O {
  constructor(n, t) {
    super(n, t, w.ELLIPSE, ce);
  }
  yi(n, t) {
    return this.Ei(0, 0, n.width, n.height, t);
  }
}, [w.ARC]: class extends O {
  constructor(n, t) {
    super(n, t, w.ARC, le);
  }
  yi(n, t) {
    const e = n.start * Math.PI / 180, i = n.stop * Math.PI / 180;
    return this.Ei(0, 0, n.width, n.height, t, { arcStart: e, arcStop: i });
  }
}, [w.TRIANGLE]: class extends O {
  constructor(n, t) {
    super(n, t, w.TRIANGLE, ue);
  }
  yi(n, t) {
    const e = Math.min(n.x1, n.x2, n.x3), i = Math.max(n.x1, n.x2, n.x3), s = Math.min(n.y1, n.y2, n.y3), r = i - e, h = Math.max(n.y1, n.y2, n.y3) - s;
    return this.Ei(e, s, r, h, t);
  }
}, [w.BEZIER_CURVE]: class extends O {
  constructor(n, t) {
    super(n, t, w.BEZIER_CURVE, fe);
  }
  yi(n, t) {
    return this.Ei(0, 0, 1, t.Ot || 1, t, { cp1x: n.cp1x, cp1y: n.cp1y, cp2x: n.cp2x, cp2y: n.cp2y, bezStartX: n.x1, bezStartY: n.y1, bezEndX: n.x2, bezEndY: n.y2 });
  }
} };
class ge {
  constructor(t) {
    a(this, "A");
    a(this, "Si");
    a(this, "zi");
    this.A = t, this.zi = new ie(t), this.Si = /* @__PURE__ */ new Map();
    for (const e of Object.values(w)) {
      const i = new he(t), s = new de[e](t, i);
      this.Si.set(e, s);
    }
  }
  ki(t) {
    this.Di(t).forEach((e) => {
      this.Li(e);
    });
  }
  Di(t) {
    const e = [];
    let i = null, s = null, r = null;
    for (const h of t) s !== h.material || r !== h.type ? (i && i.length > 0 && e.push({ material: s, type: r, commands: i }), i = [h], s = h.material, r = h.type) : i.push(h);
    return i && i.length > 0 && e.push({ material: s, type: r, commands: i }), e;
  }
  Li(t) {
    const { material: e, type: i, commands: s } = t, r = this.Si.get(i);
    e.shader.D(), e.shader.O(e.uniforms);
    const h = Ct(this.A), o = s.length > 0 && s[0].state.zt;
    if (e.shader.O({ Uu: h[2] / h[3], Ur: [h[2], h[3]], Us: 1, Ut: o ? 1 : 0 }), r.$i(), s.forEach((c) => {
      r.yi(c.params, c.state);
    }), r.Pi()) {
      const c = r.unitGeometry, l = r.unitBuffer;
      try {
        this.zi.Ts(e.shader.G, i + "", c, l), r.batch.pi(e.shader), r.batch.$s(c.As, c.Ri);
      } finally {
        r.batch.gi(e.shader), this.zi.Es(), r.$i();
      }
    }
  }
  gt() {
    for (const t of this.Si.values()) t.gt();
    this.Si.clear(), this.zi.gt();
  }
}
function Mt(n) {
  let t = 0;
  for (let e = 0; e < n.length; e++)
    t = (t << 5) - t + n.charCodeAt(e), t &= t;
  return t;
}
const yt = /* @__PURE__ */ new WeakMap();
let ve = 1;
function bt(n) {
  if (n == null) return 0;
  if (typeof n != "object" && typeof n != "function") return Mt(n + "");
  let t = yt.get(n);
  return t || (t = ve++, yt.set(n, t)), t;
}
function G(n, t) {
  return (n << 5) - n + t;
}
class pe {
  constructor(t) {
    a(this, "Oi", 0);
    a(this, "Ii");
    a(this, "Bi");
    a(this, "Hi", /* @__PURE__ */ new Map());
    this.Ii = new q(t, st, `#version 300 es
precision highp float;in vec3 v_glyphIndex;in vec4 v_glyphColor;in vec4 v_cellColor;in vec4 v_glyphFlags;layout(location=0)out vec4 o_character;layout(location=1)out vec4 o_primaryColor;layout(location=2)out vec4 o_secondaryColor;layout(location=3)out vec4 A;void main(){int B=int(v_glyphFlags.r>0.5?1:0);int C=int(v_glyphFlags.g>0.5?1:0);int D=int(v_glyphFlags.b>0.5?1:0);float E=float(B|(C<<1)|(D<<2))/255.;o_character=vec4(v_glyphIndex.xy,E,clamp(v_glyphFlags.a,0.,1.));o_primaryColor=vec4(v_glyphColor.rgb,v_glyphColor.a);o_secondaryColor=vec4(v_cellColor.rgb,v_cellColor.a);A=vec4(0.);}`), this.Bi = { id: this.Oi++, shader: this.Ii, uniforms: Object.freeze({}), hash: this.Gi(this.Ii, {}), isBuiltIn: !0 };
  }
  get Qi() {
    return this.Bi;
  }
  dt(t, e = {}, i = !1) {
    const s = this.Gi(t, e), r = this.Hi.get(s);
    if (r) return r;
    const h = { id: this.Oi++, shader: t, uniforms: Object.freeze({ ...e }), hash: s, isBuiltIn: i };
    return this.Hi.set(s, h), h;
  }
  Ni(t, e = {}) {
    return { id: this.Oi++, shader: t, uniforms: Object.freeze({ ...e }), hash: 0, isBuiltIn: !1 };
  }
  Gi(t, e) {
    const i = bt(t.G), s = function(r, h) {
      let o = 0;
      const c = Object.keys(r).sort();
      for (const l of c) o = G(o, Mt(l)), o = G(o, h(r[l]));
      return o;
    }(e, this.Xi.bind(this));
    return G(i, s);
  }
  Xi(t) {
    return typeof t == "number" || typeof t == "boolean" ? function(e) {
      return typeof e == "boolean" ? e ? 1 : 0 : Math.floor(e);
    }(t) : Array.isArray(t) ? function(e) {
      let i = 0;
      const s = Array.isArray(e[0]) ? e.flat() : e;
      for (const r of s) i = G(i, typeof r == "number" ? r : 0);
      return i;
    }(t) : t instanceof Float32Array || t instanceof Int32Array ? function(e) {
      let i = 0;
      const s = Math.min(e.length, 16);
      for (let r = 0; r < s; r++) i = G(i, e[r]);
      return i;
    }(t) : t instanceof WebGLTexture ? bt(t) : 0;
  }
  gt() {
    this.Ii != this.Ii && this.Ii.dispose(), this.Ii.dispose(), this.Hi.clear();
  }
}
class me {
  constructor() {
    a(this, "Yi", []);
    a(this, "ji", 1);
    a(this, "Ss", 0);
  }
  Ki(t, e) {
    if (this.Ss >= this.Yi.length) {
      const s = { id: this.ji++, type: t, params: {}, state: rt.Lt(), material: e };
      this.Yi.push(s);
    }
    const i = this.Yi[this.Ss];
    return i.id = this.ji++, i.type = t, i.material = e, this.Ss++, i;
  }
  Wi(t, e, i) {
    const s = this.Ki(w.RECTANGLE, i), r = s.params;
    return r.width = t.width, r.height = t.height, e.Wt(s.state), s.id;
  }
  Zi(t, e, i) {
    const s = this.Ki(w.LINE, i), r = s.params;
    return r.x1 = t.x1, r.y1 = t.y1, r.x2 = t.x2, r.y2 = t.y2, r.thickness = t.thickness, e.Wt(s.state), s.id;
  }
  qi(t, e, i) {
    const s = this.Ki(w.ELLIPSE, i), r = s.params;
    return r.width = t.width, r.height = t.height, r.startAngle = t.startAngle, r.endAngle = t.endAngle, r.segments = t.segments, e.Wt(s.state), s.id;
  }
  Vi(t, e, i) {
    const s = this.Ki(w.ARC, i), r = s.params;
    return r.width = t.width, r.height = t.height, r.start = t.start, r.stop = t.stop, e.Wt(s.state), s.id;
  }
  Ji(t, e, i) {
    const s = this.Ki(w.TRIANGLE, i), r = s.params;
    return r.x1 = t.x1, r.y1 = t.y1, r.x2 = t.x2, r.y2 = t.y2, r.x3 = t.x3, r.y3 = t.y3, e.Wt(s.state), s.id;
  }
  te(t, e, i) {
    const s = this.Ki(w.BEZIER_CURVE, i), r = s.params;
    return r.x1 = t.x1, r.y1 = t.y1, r.cp1x = t.cp1x, r.cp1y = t.cp1y, r.cp2x = t.cp2x, r.cp2y = t.cp2y, r.x2 = t.x2, r.y2 = t.y2, r.thickness = t.thickness, r.segments = t.segments, e.Wt(s.state), s.id;
  }
  wi() {
    this.Ss = 0;
  }
  [Symbol.iterator]() {
    let t = 0;
    const e = this.Ss, i = this.Yi;
    return { next: () => t < e ? { value: i[t++], done: !1 } : { value: void 0, done: !0 } };
  }
}
class Ae {
  constructor(t) {
    a(this, "A");
    a(this, "se", null);
    a(this, "ie");
    a(this, "vt");
    a(this, "ee");
    a(this, "re");
    a(this, "ne");
    a(this, "oe", null);
    a(this, "he", {});
    a(this, "ae", []);
    a(this, "ce", []);
    a(this, "le", []);
    a(this, "ue", null);
    a(this, "fe", [0, 0, 0, 0]);
    a(this, "de", 1);
    this.A = t, t.enable(t.DEPTH_TEST), t.depthFunc(t.LEQUAL), t.clearDepth(1), t.depthMask(!0), t.disable(t.CULL_FACE), this.ee = new rt(), this.vt = new pe(t), this.re = new me(), this.ie = new ge(t), this.ne = new te(t);
    const e = [0, 0, t.canvas.width, t.canvas.height];
    ht(t, e), this.ae.push(null), this.ce.push(e), this.le.push(1), this.ue = null, this.fe = e, this.de = 1;
  }
  rt() {
    this.ae.push(this.ue), this.ce.push([...this.fe]), this.le.push(this.de);
  }
  lt() {
    const t = this.ae.pop() ?? null, e = this.ce.pop() ?? [0, 0, this.A.canvas.width, this.A.canvas.height], i = this.le.pop() ?? 1;
    this.nt(t, e[2], e[3], i);
  }
  nt(t, e, i, s = 1) {
    const r = this.A;
    this.ue !== t && (r.bindFramebuffer(r.FRAMEBUFFER, t), this.ue = t), this.de = s;
    const h = [0, 0, e, i];
    this.fe[0] === h[0] && this.fe[1] === h[1] && this.fe[2] === h[2] && this.fe[3] === h[3] || (r.viewport(...h), ht(r, h), this.fe = h);
  }
  ve(t) {
    this.se !== t && (this.se = t, t.D());
  }
  pe(t, e) {
    return new q(this.A, t, e);
  }
  ge(t) {
    this.oe = t, t && (this.he = {});
  }
  I(t, e) {
    this.he[t] = e;
  }
  me(t) {
    Object.assign(this.he, t);
  }
  _e(t) {
    return new q(this.A, st, t);
  }
  ye(t, e, i, s) {
    t instanceof Z || !s || t.Ae(s), this.re.Wi({ width: e ?? t.width, height: i ?? t.height }, this.ee, t.ut());
  }
  we(t, e, i, s) {
    this.ne.$s(t, e, i, s);
  }
  be(t, e) {
    if (this.oe) {
      const i = this.vt.Ni(this.oe, this.he);
      this.re.Wi({ width: t, height: e }, this.ee, i), this.oe = null, this.he = {};
    } else this.re.Wi({ width: t, height: e }, this.ee, this.vt.Qi);
  }
  Ce(t, e, i, s) {
    this.re.Zi({ x1: t, y1: e, x2: i, y2: s }, this.ee, this.vt.Qi);
  }
  xe(t, e) {
    this.re.qi({ width: t, height: e }, this.ee, this.vt.Qi);
  }
  Me(t, e, i, s, r, h) {
    this.re.Ji({ x1: t, y1: e, x2: i, y2: s, x3: r, y3: h }, this.ee, this.vt.Qi);
  }
  Fe(t, e, i, s, r, h, o, c) {
    this.re.te({ x1: t, y1: e, cp1x: i, cp1y: s, cp2x: r, cp2y: h, x2: o, y2: c }, this.ee, this.vt.Qi);
  }
  $e(t, e, i, s) {
    this.re.Vi({ width: t, height: e, start: i, stop: s }, this.ee, this.vt.Qi);
  }
  Pe(t, e, i = 1, s = {}) {
    return new Z(this.A, t, e, i, s, this);
  }
  Te(t, e = t, i = t, s = 255) {
    this.ee.ps(t, e ?? t, i ?? t, s);
    const [r, h, o, c] = this.ee.canvasBackgroundColor;
    this.Ee(r, h, o, c, !1);
  }
  wi(t = 0, e = 0, i = 0, s = 0) {
    this.Ee(t, e, i, s, !0);
  }
  Ee(t, e, i, s, r) {
    const h = this.A;
    if (this.de > 1) {
      const o = r ? [1, 1, 0, 0] : [0, 0, 0, 0];
      h.clearBufferfv(h.COLOR, 0, new Float32Array(o)), h.clearBufferfv(h.COLOR, 1, new Float32Array([0, 0, 0, 0])), this.de >= 3 && h.clearBufferfv(h.COLOR, 2, new Float32Array([t, e, i, s]));
      for (let c = 3; c < this.de; c++) h.clearBufferfv(h.COLOR, c, new Float32Array([0, 0, 0, 0]));
    } else h.clearColor(t, e, i, s), h.clear(h.COLOR_BUFFER_BIT);
  }
  Re() {
    const t = [0, 0, this.A.canvas.width, this.A.canvas.height];
    this.A.viewport(...t), ht(this.A, t), this.fe = t, this.ce.length > 0 && (this.ce[0] = t);
  }
  ct() {
    const t = this.re;
    this.ie.ki(t), t.wi(), this.se = null;
  }
  gt() {
    this.vt.gt(), this.ie.gt(), this.ne.gt();
  }
  get context() {
    return this.A;
  }
  get state() {
    return this.ee;
  }
  get materialManager() {
    return this.vt;
  }
}
const R = { readShort: (n, t) => (R.t.uint16[0] = n[t] << 8 | n[t + 1], R.t.int16[0]), readUshort: (n, t) => n[t] << 8 | n[t + 1], readUshorts(n, t, e) {
  const i = [];
  for (let s = 0; s < e; s++) i.push(R.readUshort(n, t + 2 * s));
  return i;
}, readUint(n, t) {
  const e = R.t.uint8;
  return e[3] = n[t], e[2] = n[t + 1], e[1] = n[t + 2], e[0] = n[t + 3], R.t.uint32[0];
}, readASCII(n, t, e) {
  let i = "";
  for (let s = 0; s < e; s++) i += String.fromCharCode(n[t + s]);
  return i;
}, t: (() => {
  const n = new ArrayBuffer(8);
  return { uint8: new Uint8Array(n), int16: new Int16Array(n), uint16: new Uint16Array(n), uint32: new Uint32Array(n) };
})() };
function V(n) {
  return n + 3 & -4;
}
function J(n, t, e) {
  n[t] = e >>> 8 & 255, n[t + 1] = 255 & e;
}
function N(n, t, e) {
  n[t] = e >>> 24 & 255, n[t + 1] = e >>> 16 & 255, n[t + 2] = e >>> 8 & 255, n[t + 3] = 255 & e;
}
function ye(n, t, e) {
  for (let i = 0; i < e.length; i++) n[t + i] = 255 & e.charCodeAt(i);
}
function ot(n, t, e) {
  const i = t + e;
  let s = 0;
  const r = R.t;
  for (let h = t; h < i; h += 4) r.uint8[3] = n[h] || 0, r.uint8[2] = n[h + 1] || 0, r.uint8[1] = n[h + 2] || 0, r.uint8[0] = n[h + 3] || 0, s = s + (r.uint32[0] >>> 0) >>> 0;
  return s >>> 0;
}
class be {
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
function H(n) {
  let t = 32, e = 0;
  for (const o of n) o && (o < t && (t = o), o > e && (e = o));
  if (e === 0) return { min: 0, max: 0, table: /* @__PURE__ */ new Map() };
  const i = new Uint32Array(e + 1);
  for (const o of n) o && i[o]++;
  const s = new Uint32Array(e + 1);
  let r = 0;
  i[0] = 0;
  for (let o = 1; o <= e; o++) r = r + i[o - 1] << 1, s[o] = r;
  const h = /* @__PURE__ */ new Map();
  for (let o = 0; o < n.length; o++) {
    const c = n[o];
    if (!c) continue;
    const l = s[c]++;
    let u = h.get(c);
    u || (u = [], h.set(c, u)), u[Ee(l, c)] = o;
  }
  return { min: t, max: e, table: h };
}
function at(n, t) {
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
function Ee(n, t) {
  let e = 0;
  for (let i = 0; i < t; i++) e = e << 1 | 1 & n, n >>>= 1;
  return e >>> 0;
}
function we(n) {
  if (n.length < 2) throw Error("ZLIB data too short");
  const t = n[0], e = n[1];
  if ((15 & t) != 8) throw Error("Unsupported ZLIB compression method");
  if (((t << 8) + e) % 31 != 0) throw Error("Bad ZLIB header check");
  let i = 2;
  32 & e && (i += 4);
  const s = [];
  return function(r, h) {
    const o = [3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258], c = [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0], l = [1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577], u = [0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13];
    let f = 0;
    for (; !f; ) {
      f = r.readBits(1);
      const d = r.readBits(2);
      if (d === 0) {
        r.alignToByte();
        const g = r.readBits(16);
        if ((65535 & (65535 ^ g)) !== r.readBits(16)) throw Error("DEFLATE uncompressed LEN/NLEN mismatch");
        for (let p = 0; p < g; p++) h.push(r.readBits(8));
      } else {
        if (d !== 1 && d !== 2) throw Error("Unsupported DEFLATE type");
        {
          let g, p;
          if (d === 1) {
            const v = Array(288).fill(0);
            for (let m = 0; m <= 143; m++) v[m] = 8;
            for (let m = 144; m <= 255; m++) v[m] = 9;
            for (let m = 256; m <= 279; m++) v[m] = 7;
            for (let m = 280; m <= 287; m++) v[m] = 8;
            g = H(v), p = H(Array(32).fill(5));
          } else {
            const v = r.readBits(5) + 257, m = r.readBits(5) + 1, A = r.readBits(4) + 4, b = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15], y = Array(19).fill(0);
            for (let T = 0; T < A; T++) y[b[T]] = r.readBits(3);
            const x = H(y), E = [];
            for (; E.length < v + m; ) {
              const T = at(r, x);
              if (T <= 15) E.push(T);
              else if (T === 16) {
                const L = r.readBits(2) + 3, C = E[E.length - 1] || 0;
                for (let K = 0; K < L; K++) E.push(C);
              } else if (T === 17) {
                const L = r.readBits(3) + 3;
                for (let C = 0; C < L; C++) E.push(0);
              } else {
                if (T !== 18) throw Error("Invalid code length symbol");
                {
                  const L = r.readBits(7) + 11;
                  for (let C = 0; C < L; C++) E.push(0);
                }
              }
            }
            const F = E.slice(0, v), P = E.slice(v, v + m);
            g = H(F), p = H(P);
          }
          for (; ; ) {
            const v = at(r, g);
            if (v < 256) h.push(v);
            else {
              if (v === 256) break;
              if (v > 256 && v < 286) {
                const m = v - 257;
                let A = o[m];
                const b = c[m];
                b && (A += r.readBits(b));
                const y = at(r, p);
                if (y >= 30) throw Error("Invalid distance symbol");
                let x = l[y];
                const E = u[y];
                E && (x += r.readBits(E));
                const F = h.length - x;
                if (F < 0) throw Error("Invalid distance");
                for (let P = 0; P < A; P++) h.push(h[F + P] || 0);
              } else if (v === 286 || v === 287) throw Error("Reserved length symbol");
            }
          }
        }
      }
    }
  }(new be(n.subarray(i)), s), new Uint8Array(s);
}
function xe(n) {
  const t = R, e = new Uint8Array(n);
  if (t.readASCII(e, 0, 4) !== "wOFF") throw Error("Invalid WOFF signature");
  const i = t.readUint(e, 4), s = t.readUshort(e, 12), r = t.readUint(e, 16), h = [];
  let o = 44;
  for (let A = 0; A < s; A++) {
    const b = t.readASCII(e, o, 4), y = t.readUint(e, o + 4), x = t.readUint(e, o + 8), E = t.readUint(e, o + 12), F = t.readUint(e, o + 16);
    h.push({ tag: b, offset: y, compLength: x, origLength: E, checksum: F }), o += 20;
  }
  for (const A of h) {
    const b = new Uint8Array(e.buffer, A.offset, A.compLength);
    if (A.compLength === A.origLength) A.data = new Uint8Array(b);
    else if (A.data = we(b), A.data.length !== A.origLength) if (A.data.length < A.origLength) {
      const y = new Uint8Array(A.origLength);
      y.set(A.data), A.data = y;
    } else A.data = A.data.subarray(0, A.origLength);
  }
  const c = s;
  let l = 1, u = 0;
  for (; l << 1 <= c; ) l <<= 1, u++;
  const f = 16 * l, d = 16 * c - f;
  let g = 12 + 16 * c;
  const p = {};
  for (const A of h) p[A.tag] = g, g = V(g + A.data.length);
  const v = new Uint8Array(Math.max(r || 0, g));
  N(v, 0, i), J(v, 4, c), J(v, 6, f), J(v, 8, u), J(v, 10, d);
  let m = 12;
  for (const A of h) {
    ye(v, m, A.tag), m += 4;
    let b = A.data;
    if (A.tag === "head" && b.length >= 12) {
      const y = new Uint8Array(b);
      N(y, 8, 0), N(v, m, ot(y, 0, V(y.length))), m += 4;
    } else
      N(v, m, ot(b, 0, V(b.length))), m += 4;
    N(v, m, p[A.tag]), m += 4, N(v, m, A.data.length), m += 4;
  }
  for (const A of h) {
    const b = p[A.tag];
    v.set(A.data, b);
  }
  if (h.find((A) => A.tag === "head")) {
    const A = p.head, b = function(y, x) {
      const E = x + 8, F = [y[E], y[E + 1], y[E + 2], y[E + 3]];
      N(y, E, 0);
      const P = 2981146554 - (ot(y, 0, V(y.length)) >>> 0) >>> 0;
      return y[E] = F[0], y[E + 1] = F[1], y[E + 2] = F[2], y[E + 3] = F[3], P >>> 0;
    }(v, A);
    N(v, A + 8, b);
  }
  return v.buffer;
}
const Te = { parseTab(n, t, e) {
  const i = { tables: [], ids: {}, off: t };
  n = new Uint8Array(n.buffer, t, e), t = 0;
  const s = R, r = s.readUshort, h = r(n, t += 2);
  t += 2;
  const o = [];
  for (let c = 0; c < h; c++) {
    const l = r(n, t), u = r(n, t += 2);
    t += 2;
    const f = s.readUint(n, t);
    t += 4;
    const d = `p${l}e${u}`;
    let g = o.indexOf(f);
    if (g === -1) {
      let p;
      g = i.tables.length, o.push(f);
      const v = r(n, f);
      p = v === 4 ? this.parse4(n, f) : v === 12 ? this.parse12(n, f) : { format: v }, i.tables.push(p);
    }
    i.ids[d] = g;
  }
  return i;
}, parse4(n, t) {
  const e = R, i = e.readUshort, s = e.readUshorts, r = t, h = i(n, t += 2);
  t += 2;
  const o = i(n, t += 2) >>> 1, c = { format: 4, searchRange: i(n, t += 2), entrySelector: 0, rangeShift: 0, endCount: [], startCount: [], idDelta: [], idRangeOffset: [], glyphIdArray: [] };
  t += 2, c.entrySelector = i(n, t), t += 2, c.rangeShift = i(n, t), t += 2, c.endCount = s(n, t, o), t += 2 * o, t += 2, c.startCount = s(n, t, o), t += 2 * o;
  for (let l = 0; l < o; l++) c.idDelta.push(e.readShort(n, t)), t += 2;
  return c.idRangeOffset = s(n, t, o), t += 2 * o, c.glyphIdArray = s(n, t, r + h - t >> 1), c;
}, parse12(n, t) {
  const e = R.readUint;
  e(n, t += 4), e(n, t += 4);
  const i = e(n, t += 4);
  t += 4;
  const s = new Uint32Array(3 * i);
  for (let r = 0; r < 3 * i; r += 3) s[r] = e(n, t + (r << 2)), s[r + 1] = e(n, t + (r << 2) + 4), s[r + 2] = e(n, t + (r << 2) + 8);
  return { format: 12, groups: s };
} }, Re = { parseTab(n, t, e) {
  const i = R;
  t += 18;
  const s = i.readUshort(n, t);
  t += 2, t += 16;
  const r = i.readShort(n, t);
  t += 2;
  const h = i.readShort(n, t);
  t += 2;
  const o = i.readShort(n, t);
  t += 2;
  const c = i.readShort(n, t);
  return t += 2, t += 6, { unitsPerEm: s, xMin: r, yMin: h, xMax: o, yMax: c, indexToLocFormat: i.readShort(n, t) };
} }, Fe = { parseTab(n, t, e) {
  const i = R;
  t += 4;
  const s = ["ascender", "descender", "lineGap", "advanceWidthMax", "minLeftSideBearing", "minRightSideBearing", "xMaxExtent", "caretSlopeRise", "caretSlopeRun", "caretOffset", "res0", "res1", "res2", "res3", "metricDataFormat", "numberOfHMetrics"], r = {};
  for (let h = 0; h < s.length; h++) {
    const o = s[h], c = o === "advanceWidthMax" || o === "numberOfHMetrics" ? i.readUshort : i.readShort;
    r[o] = c(n, t + 2 * h);
  }
  return r;
} }, Ce = { parseTab(n, t, e, i) {
  const s = R, r = [], h = [], o = i.maxp.numGlyphs, c = i.hhea.numberOfHMetrics;
  let l = 0, u = 0, f = 0;
  for (; f < c; ) l = s.readUshort(n, t + (f << 2)), u = s.readShort(n, t + (f << 2) + 2), r.push(l), h.push(u), f++;
  for (; f < o; ) r.push(l), h.push(u), f++;
  return { aWidth: r, lsBearing: h };
} }, Et = { cmap: Te, head: Re, hhea: Fe, maxp: { parseTab(n, t, e) {
  const i = R;
  return i.readUint(n, t), t += 4, { numGlyphs: i.readUshort(n, t) };
} }, hmtx: Ce, loca: { parseTab(n, t, e, i) {
  const s = R, r = [], h = i.head.indexToLocFormat, o = i.maxp.numGlyphs + 1;
  if (h === 0) for (let c = 0; c < o; c++) r.push(s.readUshort(n, t + (c << 1)) << 1);
  else if (h === 1) for (let c = 0; c < o; c++) r.push(s.readUint(n, t + (c << 2)));
  return r;
} }, glyf: { parseTab(n, t, e, i) {
  const s = [], r = i.maxp.numGlyphs;
  for (let h = 0; h < r; h++) s.push(null);
  return s;
}, Se(n, t) {
  const e = R, i = n.ze, s = n.loca;
  if (s[t] === s[t + 1]) return null;
  const r = j.findTable(i, "glyf", n.ke);
  if (!r) return null;
  let h = r[0] + s[t];
  const o = {};
  if (o.noc = e.readShort(i, h), h += 2, o.xMin = e.readShort(i, h), h += 2, o.yMin = e.readShort(i, h), h += 2, o.xMax = e.readShort(i, h), h += 2, o.yMax = e.readShort(i, h), h += 2, o.xMin >= o.xMax || o.yMin >= o.yMax) return null;
  if (o.noc > 0) {
    o.endPts = [];
    for (let d = 0; d < o.noc; d++) o.endPts.push(e.readUshort(i, h)), h += 2;
    const c = e.readUshort(i, h);
    if (h += 2, i.length - h < c) return null;
    h += c;
    const l = o.endPts[o.noc - 1] + 1;
    o.flags = [];
    for (let d = 0; d < l; d++) {
      const g = i[h];
      if (h++, o.flags.push(g), 8 & g) {
        const p = i[h];
        h++;
        for (let v = 0; v < p; v++) o.flags.push(g), d++;
      }
    }
    o.xs = [];
    for (let d = 0; d < l; d++) {
      const g = o.flags[d], p = !!(16 & g);
      2 & g ? (o.xs.push(p ? i[h] : -i[h]), h++) : p ? o.xs.push(0) : (o.xs.push(e.readShort(i, h)), h += 2);
    }
    o.ys = [];
    for (let d = 0; d < l; d++) {
      const g = o.flags[d], p = !!(32 & g);
      4 & g ? (o.ys.push(p ? i[h] : -i[h]), h++) : p ? o.ys.push(0) : (o.ys.push(e.readShort(i, h)), h += 2);
    }
    let u = 0, f = 0;
    for (let d = 0; d < l; d++) u += o.xs[d], f += o.ys[d], o.xs[d] = u, o.ys[d] = f;
  } else o.parts = [], o.endPts = [], o.flags = [], o.xs = [], o.ys = [];
  return o;
} } }, j = { parse(n) {
  const t = new Uint8Array(n);
  R.readASCII(t, 0, 4) === "wOFF" && (n = xe(n));
  const e = new Uint8Array(n), i = Et, s = {}, r = { ze: e, De: 0, ke: 0 };
  for (const h in i) {
    const o = h, c = j.findTable(e, o, 0);
    if (c) {
      const [l, u] = c;
      let f = s[l];
      f == null && (f = i[o].parseTab(e, l, u, r), s[l] = f), r[o] = f;
    }
  }
  return [r];
}, findTable(n, t, e) {
  const i = R, s = i.readUshort(n, e + 4);
  let r = e + 12;
  for (let h = 0; h < s; h++) {
    const o = i.readASCII(n, r, 4);
    i.readUint(n, r + 4);
    const c = i.readUint(n, r + 8), l = i.readUint(n, r + 12);
    if (o === t) return [c, l];
    r += 16;
  }
  return null;
}, T: Et, B: R };
class Me {
  Le(t) {
    var i;
    const e = [];
    return (i = t.cmap) != null && i.tables ? (t.cmap.tables.forEach((s) => {
      if (s.format === 4) {
        const r = this.Oe(s);
        e.push(...r);
      } else if (s.format === 12) {
        const r = this.Ie(s);
        e.push(...r);
      }
    }), [...new Set(e)]) : [];
  }
  Oe(t) {
    const e = [];
    if (!(t.startCount && t.endCount && t.idRangeOffset && t.idDelta)) return e;
    for (let i = 0; i < t.startCount.length; i++) {
      const s = t.startCount[i], r = t.endCount[i];
      if (s !== 65535 || r !== 65535) {
        for (let h = s; h <= r; h++)
          if (this.Be(t, h, i) > 0) try {
            const o = String.fromCodePoint(h);
            e.push(o);
          } catch {
          }
      }
    }
    return e;
  }
  Ie(t) {
    const e = [];
    if (!t.groups) return e;
    for (let i = 0; i < t.groups.length; i += 3) {
      const s = t.groups[i], r = t.groups[i + 1], h = t.groups[i + 2];
      for (let o = s; o <= r; o++)
        if (h + (o - s) > 0) try {
          const c = String.fromCodePoint(o);
          e.push(c);
        } catch {
        }
    }
    return e;
  }
  Be(t, e, i) {
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
}
class Pe {
  constructor(t) {
    a(this, "He");
    a(this, "Ge");
    a(this, "Z");
    this.Z = t, this.He = document.createElement("canvas"), this.Ge = this.He.getContext("2d", { willReadFrequently: !0, alpha: !0 });
  }
  Qe(t, e, i, s) {
    const r = t.length, h = Math.ceil(Math.sqrt(r)), o = Math.ceil(r / h), c = e.width * h, l = e.height * o;
    this.Ne(c, l), this.Xe(t, e, h, i, s);
    const u = this.Z.Pe(c, l, 1, { filter: "nearest" });
    return u.et(this.He), { framebuffer: u, columns: h, rows: o };
  }
  Ne(t, e) {
    this.He.width = t, this.He.height = e, this.He.style.width = t + "px", this.He.style.height = e + "px", this.Ge.imageSmoothingEnabled = !1, this.He.style.imageRendering = "pixelated", this.Ge.clearRect(0, 0, t, e), this.Ge.textBaseline = "top", this.Ge.textAlign = "left", this.Ge.fillStyle = "white";
  }
  Xe(t, e, i, s, r) {
    const h = s / r.head.unitsPerEm;
    for (let o = 0; o < t.length; o++) {
      const c = o % i, l = Math.floor(o / i), u = t[o].glyphData;
      if (!u) continue;
      const f = u.advanceWidth * h, d = c * e.width, g = l * e.height, p = d + 0.5 * e.width, v = g + 0.5 * e.height, m = Math.round(p - 0.5 * e.width), A = Math.round(v - 0.5 * s), b = m + 0.5 * (e.width - f), y = A + r.hhea.ascender * h;
      this.Ye(u, b, y, h);
    }
  }
  Ye(t, e, i, s) {
    if (!t || !t.xs || t.noc === 0) return;
    let { xs: r, ys: h, endPts: o, flags: c } = t;
    if (!(r && h && o && c)) return;
    this.Ge.beginPath();
    let l = 0;
    for (let u = 0; u < o.length; u++) {
      const f = o[u];
      if (!(f < l)) {
        if (f >= l) {
          const d = e + r[l] * s, g = i - h[l] * s;
          this.Ge.moveTo(d, g);
          let p = l + 1;
          for (; p <= f; )
            if (1 & c[p]) {
              const v = e + r[p] * s, m = i - h[p] * s;
              this.Ge.lineTo(v, m), p++;
            } else {
              const v = e + r[p] * s, m = i - h[p] * s;
              if (p + 1 > f) {
                const b = e + r[l] * s, y = i - h[l] * s;
                if (1 & c[l]) this.Ge.quadraticCurveTo(v, m, b, y);
                else {
                  const x = (v + b) / 2, E = (m + y) / 2;
                  this.Ge.quadraticCurveTo(v, m, x, E);
                }
                break;
              }
              const A = p + 1;
              if (1 & c[A]) {
                const b = e + r[A] * s, y = i - h[A] * s;
                this.Ge.quadraticCurveTo(v, m, b, y), p = A + 1;
              } else {
                const b = (v + (e + r[A] * s)) / 2, y = (m + (i - h[A] * s)) / 2;
                this.Ge.quadraticCurveTo(v, m, b, y), p = A;
              }
            }
          this.Ge.closePath();
        }
        l = f + 1;
      }
    }
    this.Ge.fill();
  }
}
class Pt {
  je(t, e) {
    const i = t.cmap;
    if (!i || !i.tables) return 0;
    let s = 0;
    for (const r of i.tables) if (r.format === 4 ? s = this.Ke(e, r) : r.format === 12 && (s = this.We(e, r)), s > 0) break;
    return s;
  }
  Ze(t, e) {
    const i = e.codePointAt(0);
    return i === void 0 ? 0 : this.je(t, i);
  }
  qe(t, e) {
    const i = t.hmtx;
    return i && i.aWidth && i.aWidth.length !== 0 ? e < i.aWidth.length ? i.aWidth[e] : i.aWidth[i.aWidth.length - 1] : 0;
  }
  Ve(t, e) {
    const i = e / t.head.unitsPerEm, s = t.hhea.ascender * i, r = t.hhea.descender * i, h = t.hhea.lineGap * i;
    return { ascender: s, descender: r, lineGap: h, lineHeight: s - r + h, unitsPerEm: t.head.unitsPerEm, scale: i };
  }
  Ke(t, e) {
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
        const h = e.glyphIdArray[r];
        return h === 0 ? 0 : h + e.idDelta[s] & 65535;
      }
    }
    return 0;
  }
  We(t, e) {
    const i = e.groups.length / 3;
    for (let s = 0; s < i; s++) {
      const r = e.groups[3 * s], h = e.groups[3 * s + 1], o = e.groups[3 * s + 2];
      if (t >= r && t <= h) return o + (t - r);
    }
    return 0;
  }
}
class Se {
  constructor() {
    a(this, "Je");
    this.Je = new Pt();
  }
  tr(t, e, i) {
    let s = 0;
    const r = this.Je.Ve(i, e), h = r.lineHeight;
    for (const o of t) {
      const c = this.Je.Ze(i, o);
      if (c === 0) continue;
      const l = this.Je.qe(i, c) * r.scale;
      s = Math.max(s, l);
    }
    return { width: Math.ceil(s), height: Math.ceil(h) };
  }
}
class Ue {
  constructor() {
    a(this, "sr");
    this.sr = new Pt();
  }
  ir(t, e) {
    const i = [], s = /* @__PURE__ */ new Map();
    return t.forEach((r, h) => {
      const o = r.codePointAt(0) || 0, c = { character: r, unicode: o, color: this.er(h), glyphData: this.rr(e, r) };
      i.push(c), s.set(r, c);
    }), { array: i, map: s };
  }
  er(t) {
    return [t % 256 / 255, Math.floor(t / 256) % 256 / 255, 0];
  }
  rr(t, e) {
    const i = e.codePointAt(0) || 0, s = this.sr.je(t, i);
    if (s === 0) return null;
    let r = 0;
    t.hmtx && t.hmtx.aWidth && s > 0 && t.hmtx.aWidth[s] !== void 0 && (r = t.hmtx.aWidth[s]);
    const h = j.T.glyf.Se(t, s);
    return h ? { ...h, advanceWidth: r } : null;
  }
}
class et {
  constructor(t, e = 16) {
    a(this, "nr");
    a(this, "hr", []);
    a(this, "ar", /* @__PURE__ */ new Map());
    a(this, "cr");
    a(this, "lr", 16);
    a(this, "ur", 0);
    a(this, "dr", 0);
    a(this, "vr", { width: 0, height: 0 });
    a(this, "pr");
    a(this, "gr");
    a(this, "mr");
    a(this, "_r");
    a(this, "yr");
    a(this, "Ar", !1);
    this.lr = e, this.gr = new Me(), this.mr = new Pe(t), this._r = new Se(), this.yr = new Ue();
  }
  async wr(t) {
    if (this.Ar) return;
    let e;
    if (t) {
      const i = await fetch(t);
      if (!i.ok) throw new U(`Failed to load font file: ${i.status} ${i.statusText}`);
      e = await i.arrayBuffer();
    } else
      e = await (await fetch("data:font/woff;base64,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")).arrayBuffer();
    await this.br(e), this.nr = j.parse(e)[0], await this.Cr();
  }
  Mr(t) {
    if (t === void 0) return this.lr;
    this.lr = t, this.vr = this._r.tr(this.hr.map((i) => i.character), this.lr, this.nr);
    const e = this.mr.Qe(this.hr, this.vr, this.lr, this.nr);
    this.cr = e.framebuffer, this.ur = e.columns, this.dr = e.rows;
  }
  async Fr(t) {
    try {
      const e = await fetch(t);
      if (!e.ok) throw new U(`Failed to load font file: ${e.status} ${e.statusText}`);
      const i = await e.arrayBuffer();
      await this.br(i);
      const s = j.parse(i);
      if (!s || s.length === 0) throw Error("Failed to parse font file");
      this.nr = s[0], await this.Cr();
    } catch (e) {
      throw new U("Failed to load font: " + (e instanceof Error ? e.message : "Unknown error"), e);
    }
  }
  async br(t) {
    const e = Date.now();
    this.pr = new FontFace("CustomFont_" + e, t), await this.pr.load(), document.fonts.add(this.pr);
  }
  async Cr() {
    const t = this.gr.Le(this.nr), { array: e, map: i } = this.yr.ir(t, this.nr);
    this.hr = e, this.ar = i, this.vr = this._r.tr(t, this.lr, this.nr);
    const s = this.mr.Qe(this.hr, this.vr, this.lr, this.nr);
    this.cr = s.framebuffer, this.ur = s.columns, this.dr = s.rows, this.Ar = !0;
  }
  $r(t) {
    const e = this.ar.get(t);
    return e ? e.color : [0, 0, 0];
  }
  Pr(t) {
    return Array.from(t).map((e) => {
      const i = this.ar.get(e);
      return i ? i.color : [0, 0, 0];
    });
  }
  gt() {
    this.cr.gt(), document.fonts.delete(this.pr);
  }
  get Tr() {
    return this.Ar;
  }
  get fontFramebuffer() {
    return this.cr;
  }
  get characterMap() {
    return this.ar;
  }
  get characters() {
    return this.hr;
  }
  get textureColumns() {
    return this.ur;
  }
  get textureRows() {
    return this.dr;
  }
  get maxGlyphDimensions() {
    return this.vr;
  }
  get fontSize() {
    return this.lr;
  }
  get font() {
    return this.nr;
  }
}
class Le {
  constructor(t, e, i) {
    a(this, "Er");
    a(this, "Rr");
    a(this, "N");
    a(this, "X");
    a(this, "Sr");
    a(this, "zr");
    a(this, "kr");
    a(this, "Dr");
    a(this, "Lr");
    a(this, "Or", !1);
    a(this, "Ir", /* @__PURE__ */ new Set());
    this.kr = t, this.Dr = e, this.Lr = i, this.ti();
  }
  Br() {
    if (this.N = this.Er * this.Dr, this.X = this.Rr * this.Lr, this.Sr = Math.floor((this.kr.width - this.N) / 2), this.zr = Math.floor((this.kr.height - this.X) / 2), this.Ir.size > 0) for (const t of this.Ir) t();
  }
  Hr(t) {
    this.Ir.add(t);
  }
  Gr(t) {
    this.Ir.delete(t);
  }
  ti() {
    this.Or || (this.Er = Math.floor(this.kr.width / this.Dr), this.Rr = Math.floor(this.kr.height / this.Lr)), this.Br();
  }
  Qr(t, e) {
    this.Dr = t, this.Lr = e, this.ti();
  }
  get cellWidth() {
    return this.Dr;
  }
  get cellHeight() {
    return this.Lr;
  }
  get cols() {
    return this.Er;
  }
  set cols(t) {
    this.Or = !0, this.Er = Math.max(1, Math.floor(t)), typeof this.Rr != "number" && (this.Rr = Math.max(1, Math.floor(this.kr.height / this.Lr))), this.Br();
  }
  get rows() {
    return this.Rr;
  }
  set rows(t) {
    this.Or = !0, this.Rr = Math.max(1, Math.floor(t)), typeof this.Er != "number" && (this.Er = Math.max(1, Math.floor(this.kr.width / this.Dr))), this.Br();
  }
  get width() {
    return this.N;
  }
  get height() {
    return this.X;
  }
  get offsetX() {
    return this.Sr;
  }
  get offsetY() {
    return this.zr;
  }
  responsive() {
    this.Or = !1;
  }
  gt() {
    this.Ir.clear();
  }
}
const Be = /^rgba?\(([^)]+)\)$/i;
function ct(n) {
  return Number.isNaN(n) ? 0 : Math.max(0, Math.min(255, n));
}
function Ne(n) {
  if (!n) return null;
  const t = n.trim().toLowerCase();
  if (!t) return null;
  let e = null;
  return t.startsWith("rgb") && (e = function(i) {
    const s = Be.exec(i.trim());
    if (!s) return null;
    const r = s[1].split(",").map((u) => u.trim());
    if (r.length < 3) return null;
    const h = ct(parseFloat(r[0])), o = ct(parseFloat(r[1])), c = ct(parseFloat(r[2])), l = r[3] !== void 0 ? 255 * Math.max(0, Math.min(1, parseFloat(r[3]))) : 255;
    return [h, o, c, Math.round(l)];
  }(t)), e ? e[3] === 0 ? null : e : null;
}
class _e {
  constructor(t = {}) {
    a(this, "kr");
    a(this, "Nr", null);
    a(this, "Xr", !1);
    a(this, "Yr");
    this.Xr = t.overlay ?? !1, this.Xr && t.canvas ? (this.Nr = t.canvas, this.kr = this.jr(), this.Yr = !0, this.Kr()) : t.canvas ? (this.kr = t.canvas, this.Yr = !1) : (this.kr = this.Wr(t.width, t.height), this.Yr = !0), this.kr.style.imageRendering = "pixelated";
  }
  Wr(t, e) {
    const i = document.createElement("canvas");
    return i.className = "textmodeCanvas", i.style.imageRendering = "pixelated", i.width = t || 800, i.height = e || 600, document.body.appendChild(i), i;
  }
  jr() {
    const t = document.createElement("canvas");
    t.className = "textmodeCanvas", t.style.imageRendering = "pixelated";
    const e = this.Nr.getBoundingClientRect();
    let i = Math.round(e.width), s = Math.round(e.height);
    if (this.Nr instanceof HTMLVideoElement) {
      const o = this.Nr;
      (i === 0 || s === 0) && o.videoWidth > 0 && o.videoHeight > 0 && (i = o.videoWidth, s = o.videoHeight);
    }
    t.width = i, t.height = s, t.style.position = "absolute", t.style.pointerEvents = "none";
    const r = window.getComputedStyle(this.Nr);
    let h = parseInt(r.zIndex || "0", 10);
    return isNaN(h) && (h = 0), t.style.zIndex = "" + (h + 1), t;
  }
  Kr() {
    var t;
    this.Zr(), (t = this.Nr.parentNode) == null || t.insertBefore(this.kr, this.Nr.nextSibling);
  }
  qr() {
    const t = [];
    return this.Xr && this.Nr instanceof HTMLElement && (t.push(this.Nr), this.Nr.parentElement && t.push(this.Nr.parentElement)), this.kr.parentElement && t.push(this.kr.parentElement), t.push(this.kr), t.push(document.body), t.push(document.documentElement), t;
  }
  Vr() {
    const t = this.qr();
    for (const e of t) {
      if (!e) continue;
      const i = Ne(window.getComputedStyle(e).backgroundColor);
      if (i) return i;
    }
    return [255, 255, 255, 255];
  }
  Zr() {
    if (!this.Nr) return;
    const t = this.Nr.getBoundingClientRect();
    let e = this.Nr.offsetParent;
    if (e && e !== document.body) {
      const i = e.getBoundingClientRect();
      this.kr.style.top = t.top - i.top + "px", this.kr.style.left = t.left - i.left + "px";
    } else this.kr.style.top = t.top + window.scrollY + "px", this.kr.style.left = t.left + window.scrollX + "px";
  }
  Jr(t, e) {
    if (this.Xr) {
      const i = this.Nr.getBoundingClientRect();
      this.kr.width = Math.round(i.width), this.kr.height = Math.round(i.height), this.Zr();
    } else this.kr.width = t ?? this.kr.width, this.kr.height = e ?? this.kr.height;
  }
  tn() {
    const t = this.kr.getContext("webgl2", { alpha: !0, premultipliedAlpha: !1, preserveDrawingBuffer: !0, antialias: !1, depth: !0, stencil: !1, powerPreference: "high-performance" });
    if (!t) throw new U("`textmode.js` requires WebGL2 support.");
    return t;
  }
  gt() {
    const t = this.kr.getContext("webgl") || this.kr.getContext("webgl2");
    if (t) {
      const e = t.getExtension("WEBGL_lose_context");
      e == null || e.loseContext();
    }
    this.Yr && this.kr.parentNode && this.kr.parentNode.removeChild(this.kr);
  }
  get canvas() {
    return this.kr;
  }
  get targetCanvas() {
    return this.Nr;
  }
  get width() {
    return this.kr.width;
  }
  get height() {
    return this.kr.height;
  }
}
function $(n) {
  return I(parseInt(n, 16), 0, 255);
}
class S {
  constructor(t, e, i, s) {
    a(this, "sn");
    a(this, "en");
    a(this, "r");
    a(this, "g");
    a(this, "b");
    a(this, "a");
    this.r = I(t, 0, 255), this.g = I(e, 0, 255), this.b = I(i, 0, 255), this.a = I(s, 0, 255), this.sn = [this.r, this.g, this.b, this.a], this.en = [this.r / 255, this.g / 255, this.b / 255, this.a / 255];
  }
  static rn(t, e, i, s) {
    if (S.nn(t)) return t;
    if (Array.isArray(t)) {
      if (t.length < 3) throw Error("Component tuples must include at least RGB values.");
      const [r, h, o] = t, c = t.length === 4 ? t[3] : 255;
      return S.hn(r, h, o, c);
    }
    if (typeof t == "string") {
      const r = t.trim();
      if (r.length === 0) throw Error("Color strings cannot be empty.");
      return S.an(r);
    }
    if (typeof t == "number") return typeof e == "number" && typeof i == "number" ? S.hn(t, e, i, s ?? 255) : S.cn(t);
    throw Error("Unsupported color input passed to TextmodeColor.$from.");
  }
  static hn(t, e, i, s = 255) {
    return new S(t, e, i, s);
  }
  static cn(t, e = 255) {
    return new S(t, t, t, e);
  }
  static an(t) {
    return new S(...function(e) {
      const i = e.replace(/^#|0x/gi, ""), s = (r = i).length === 3 || r.length === 4 ? r.split("").map((h) => h + h).join("") : r;
      var r;
      if (s.length !== 6 && s.length !== 8) throw Error("Invalid hex color: " + e);
      return [$(s.slice(0, 2)), $(s.slice(2, 4)), $(s.slice(4, 6)), s.length === 8 ? $(s.slice(6, 8)) : 255];
    }(t));
  }
  get rgb() {
    return [this.r, this.g, this.b];
  }
  get rgba() {
    return [...this.sn];
  }
  get normalized() {
    return [...this.en];
  }
  withAlpha(t) {
    return new S(this.r, this.g, this.b, t);
  }
  static nn(t) {
    return t instanceof S;
  }
}
class St {
  constructor(t, e, i, s, r, h, o, c) {
    a(this, "A");
    a(this, "Z");
    a(this, "ln");
    a(this, "un");
    a(this, "fn");
    a(this, "N");
    a(this, "X");
    a(this, "q", null);
    a(this, "dn", null);
    a(this, "vn", "brightness");
    a(this, "pn", null);
    a(this, "gn");
    a(this, "Et", 0);
    a(this, "Gt", 0);
    a(this, "Qt", 0);
    a(this, "Rt", 0);
    a(this, "mn", "sampled");
    a(this, "_n", "fixed");
    a(this, "Xt", [1, 1, 1, 1]);
    a(this, "Yt", [0, 0, 0, 1]);
    a(this, "yn", [0, 0, 0, 1]);
    a(this, "An", [[0.1, 0, 0]]);
    a(this, "wn", null);
    this.A = t, this.Z = e, this.ln = i, this.gn = s, this.un = r, this.fn = h, this.N = o, this.X = c;
  }
  conversionMode(t) {
    return this.vn = t, this.pn = null, this.q = null, this;
  }
  gt() {
    this.A.deleteTexture(this.ln);
  }
  invert(t = !0) {
    return this.Et = t ? 1 : 0, this.q = null, this;
  }
  flipX(t = !0) {
    return this.Gt = t ? 1 : 0, this.q = null, this;
  }
  flipY(t = !0) {
    return this.Qt = t ? 1 : 0, this.q = null, this;
  }
  charRotation(t) {
    return this.Rt = xt(t), this.q = null, this;
  }
  charColorMode(t) {
    return this.mn = t, this.q = null, this;
  }
  cellColorMode(t) {
    return this._n = t, this.q = null, this;
  }
  charColor(t, e, i, s) {
    return this.bn(this.Xt, t, e, i, s), this.q = null, this;
  }
  cellColor(t, e, i, s) {
    return this.bn(this.Yt, t, e, i, s), this.q = null, this;
  }
  background(t, e, i, s) {
    return this.bn(this.yn, t, e, i, s), this.q = null, this;
  }
  characters(t) {
    return this.wn = t, this.Cn(t), this.q = null, this;
  }
  Ae(t) {
    this.dn !== t && (this.dn = t, this.wn && this.Cn(this.wn), this.q = null);
  }
  get texture() {
    return this.ln;
  }
  get width() {
    return this.N;
  }
  get height() {
    return this.X;
  }
  get originalWidth() {
    return this.un;
  }
  get originalHeight() {
    return this.fn;
  }
  ut() {
    return this.q || this.ft(), this.q;
  }
  xn() {
  }
  ft() {
    this.xn();
    const t = this.Mn(), e = this.Fn(), i = t.createShader(e), s = t.createUniforms(e);
    this.q = this.Z.materialManager.Ni(i, s);
  }
  bn(t, e, i, s, r) {
    const h = S.rn(e, i, s, r);
    tt(t, h.r, h.g, h.b, h.a);
  }
  Cn(t) {
    if (!this.dn) return;
    const e = this.dn.Pr(t).filter((i) => Array.isArray(i)).slice(0, 255);
    this.An = e.length > 0 ? e : this.An;
  }
  createBaseConversionUniforms() {
    return { u_image: this.$n(), u_invert: !!this.Et, u_flipX: !!this.Gt, u_flipY: !!this.Qt, u_charRotation: this.Rt, u_charColorFixed: this.mn === "fixed", u_charColor: this.Xt, u_cellColorFixed: this._n === "fixed", u_cellColor: this.Yt, u_backgroundColor: this.yn, u_charCount: this.An.length, u_charList: this.An };
  }
  Mn() {
    if (this.pn && this.pn.id === this.vn) return this.pn;
    const t = this.gn.Pn(this.vn);
    if (!t) throw Error(`[textmode.js] Conversion mode "${this.vn}" is not registered. If this mode is provided by an add-on, make sure its plugin is installed before loading sources.`);
    return this.pn = t, t;
  }
  Fn() {
    if (!this.dn) throw Error("[textmode.js] Cannot create conversion context: no active font set. Ensure $setActiveFont() is called before rendering.");
    return { renderer: this.Z, gl: this.A, font: this.dn, source: this, gridWidth: this.N, gridHeight: this.X };
  }
}
class z extends St {
  constructor(t, e, i, s, r, h, o, c) {
    const l = Math.min(o / r, c / h);
    super(t, e, i, s, r, h, Math.max(1, Math.floor(r * l)), Math.max(1, Math.floor(h * l)));
  }
  static Tn(t, e, i, s, r) {
    const h = t.context, o = h.createTexture();
    h.bindTexture(h.TEXTURE_2D, o), h.pixelStorei(h.UNPACK_FLIP_Y_WEBGL, 1), pt(h, h.NEAREST, h.NEAREST, h.CLAMP_TO_EDGE, h.CLAMP_TO_EDGE), h.texImage2D(h.TEXTURE_2D, 0, h.RGBA, h.RGBA, h.UNSIGNED_BYTE, i), h.bindTexture(h.TEXTURE_2D, null);
    const c = i.naturalWidth ?? i.width ?? i.videoWidth ?? 0, l = i.naturalHeight ?? i.height ?? i.videoHeight ?? 0;
    return new z(h, t, o, e, c, l, s, r);
  }
  $n() {
    return this.ln;
  }
}
class Ut {
  constructor(t = 60) {
    a(this, "En");
    a(this, "Rn", null);
    a(this, "Sn", 0);
    a(this, "zn", !0);
    a(this, "kn", 0);
    a(this, "Dn", 0);
    a(this, "Ln", []);
    a(this, "On", 10);
    a(this, "In", 0);
    this.En = 1e3 / t;
  }
  Bn(t) {
    if (!this.zn) return;
    this.Sn = performance.now();
    const e = (i) => {
      if (!this.zn) return void (this.Rn = null);
      const s = i - this.Sn;
      s >= this.En && (t(), this.Sn = i - s % this.En), this.zn && (this.Rn = requestAnimationFrame(e));
    };
    this.Rn = requestAnimationFrame(e);
  }
  Hn() {
    this.Rn && (cancelAnimationFrame(this.Rn), this.Rn = null);
  }
  Gn() {
    this.zn && (this.zn = !1, this.Hn());
  }
  Qn(t) {
    this.zn || (this.zn = !0, this.Bn(t));
  }
  Nn(t, e) {
    if (t === void 0) return this.kn;
    this.En = 1e3 / t, this.zn && e && (this.Hn(), this.Bn(e));
  }
  Xn() {
    const t = performance.now();
    if (this.Dn > 0) {
      const e = t - this.Dn;
      this.Ln.push(e), this.Ln.length > this.On && this.Ln.shift();
      const i = this.Ln.reduce((s, r) => s + r, 0) / this.Ln.length;
      this.kn = 1e3 / i;
    }
    this.Dn = t;
  }
  get Yn() {
    return this.zn;
  }
  get jn() {
    return this.kn;
  }
  get Kn() {
    return this.In;
  }
  set Kn(t) {
    this.In = t;
  }
  Wn() {
    this.In++;
  }
}
class Lt {
  constructor(t, e) {
    a(this, "kr");
    a(this, "Zn");
    a(this, "qn", { x: -1 / 0, y: -1 / 0 });
    a(this, "Vn", { x: -1 / 0, y: -1 / 0 });
    a(this, "Jn", null);
    a(this, "so", 0);
    a(this, "io");
    a(this, "eo");
    a(this, "ro");
    a(this, "no");
    a(this, "oo");
    a(this, "ho");
    a(this, "ao", !1);
    a(this, "co");
    a(this, "lo");
    a(this, "uo");
    a(this, "fo");
    a(this, "do");
    this.kr = t, this.Zn = e;
  }
  vo(t) {
    const e = performance.now() + Math.max(0, t);
    e > this.so && (this.so = e);
  }
  po() {
    return performance.now() < this.so;
  }
  mo(t) {
    const e = this.kr.canvas;
    e.style.cursor = t == null || t === "" ? "" : t;
  }
  _o() {
    if (this.ao) return;
    const t = this.kr.canvas;
    this.io = (e) => {
      this.yo(e), this.Ao(e);
    }, this.eo = () => {
      this.Vn = { ...this.qn }, this.qn.x = -1 / 0, this.qn.y = -1 / 0, this.Jn = null;
    }, this.ro = (e) => {
      this.yo(e), this.wo(e);
    }, this.no = (e) => {
      this.yo(e), this.bo(e);
    }, this.oo = (e) => {
      this.yo(e), this.Co(e);
    }, this.ho = (e) => {
      this.yo(e), this.xo(e);
    }, t.addEventListener("mousemove", this.io, { passive: !0 }), t.addEventListener("mouseleave", this.eo, { passive: !0 }), t.addEventListener("mousedown", this.ro, { passive: !0 }), t.addEventListener("mouseup", this.no, { passive: !0 }), t.addEventListener("click", this.oo, { passive: !0 }), t.addEventListener("wheel", this.ho, { passive: !1 }), this.ao = !0;
  }
  Mo() {
    if (!this.ao) return;
    const t = this.kr.canvas;
    t.removeEventListener("mousemove", this.io), t.removeEventListener("mouseleave", this.eo), t.removeEventListener("mousedown", this.ro), t.removeEventListener("mouseup", this.no), t.removeEventListener("click", this.oo), t.removeEventListener("wheel", this.ho), this.ao = !1;
  }
  Fo() {
    if (!this.ao) return;
    const t = this.Zn();
    if (t) try {
      if (this.Jn) {
        const e = new MouseEvent("mousemove", { clientX: this.Jn.x, clientY: this.Jn.y, bubbles: !1, cancelable: !1 });
        this.yo(e);
      } else {
        const e = Math.floor((t.cols - 1) / 2), i = Math.floor(t.rows / 2);
        if (this.qn.x !== -1 / 0 && this.qn.y !== -1 / 0) {
          const s = -e, r = t.cols - e - 1, h = -i, o = t.rows - i - 1;
          (this.qn.x < s || this.qn.x > r || this.qn.y < h || this.qn.y > o) && (this.qn.x = -1 / 0, this.qn.y = -1 / 0);
        }
      }
    } catch {
      this.qn.x = -1 / 0, this.qn.y = -1 / 0;
    }
  }
  $o(t) {
    this.co = t;
  }
  Po(t) {
    this.lo = t;
  }
  To(t) {
    this.uo = t;
  }
  Uo(t) {
    this.fo = t;
  }
  Eo(t) {
    this.do = t;
  }
  Ro() {
    return { x: this.qn.x, y: this.qn.y };
  }
  Ao(t) {
    if (this.fo && !this.po()) {
      const e = { position: { ...this.qn }, previousPosition: { ...this.Vn }, originalEvent: t };
      this.fo(e);
    }
  }
  wo(t) {
    if (this.lo && !this.po()) {
      const e = { position: { ...this.qn }, previousPosition: { ...this.Vn }, button: t.button, originalEvent: t };
      this.lo(e);
    }
  }
  bo(t) {
    if (this.uo && !this.po()) {
      const e = { position: { ...this.qn }, previousPosition: { ...this.Vn }, button: t.button, originalEvent: t };
      this.uo(e);
    }
  }
  Co(t) {
    if (this.co && !this.po()) {
      const e = { position: { ...this.qn }, previousPosition: { ...this.Vn }, button: t.button, originalEvent: t };
      this.co(e);
    }
  }
  xo(t) {
    if (this.do && !this.po()) {
      const e = { position: { ...this.qn }, previousPosition: { ...this.Vn }, delta: { x: t.deltaX, y: t.deltaY }, originalEvent: t };
      this.do(e);
    }
  }
  yo(t) {
    const e = this.kr.canvas, i = this.Zn();
    if (this.Vn = { ...this.qn }, this.Jn = { x: t.clientX, y: t.clientY }, !i) return this.qn.x = -1 / 0, void (this.qn.y = -1 / 0);
    const s = e.getBoundingClientRect(), r = t.clientX - s.left, h = t.clientY - s.top, o = e.width / s.width, c = h * (e.height / s.height), l = r * o - i.offsetX, u = c - i.offsetY, f = Math.floor(l / i.cellWidth), d = Math.floor(u / i.cellHeight);
    if (f >= 0 && f < i.cols && d >= 0 && d < i.rows) {
      const g = Math.floor((i.cols - 1) / 2);
      this.qn.x = f - g, this.qn.y = d - Math.floor(i.rows / 2);
    } else this.qn.x = -1 / 0, this.qn.y = -1 / 0;
  }
}
const De = Object.freeze(Object.defineProperty({ __proto__: null, MouseManager: Lt }, Symbol.toStringTag, { value: "Module" }));
class Bt {
  constructor() {
    a(this, "So", /* @__PURE__ */ new Map());
    a(this, "zo", null);
    a(this, "ko", null);
    a(this, "Do");
    a(this, "Lo");
    a(this, "ao", !1);
    a(this, "Oo");
    a(this, "Io");
    a(this, "Bo", { ArrowUp: "UP_ARROW", ArrowDown: "DOWN_ARROW", ArrowLeft: "LEFT_ARROW", ArrowRight: "RIGHT_ARROW", F1: "F1", F2: "F2", F3: "F3", F4: "F4", F5: "F5", F6: "F6", F7: "F7", F8: "F8", F9: "F9", F10: "F10", F11: "F11", F12: "F12", Enter: "ENTER", Return: "RETURN", Tab: "TAB", Escape: "ESCAPE", Backspace: "BACKSPACE", Delete: "DELETE", Insert: "INSERT", Home: "HOME", End: "END", PageUp: "PAGE_UP", PageDown: "PAGE_DOWN", Shift: "SHIFT", Control: "CONTROL", Alt: "ALT", Meta: "META", " ": "SPACE" });
  }
  _o() {
    this.ao || (this.Do = (t) => {
      this.Ho(t);
    }, this.Lo = (t) => {
      this.Go(t);
    }, window.addEventListener("keydown", this.Do, { passive: !1 }), window.addEventListener("keyup", this.Lo, { passive: !1 }), this.ao = !0);
  }
  Mo() {
    this.ao && (window.removeEventListener("keydown", this.Do), window.removeEventListener("keyup", this.Lo), this.ao = !1, this.So.clear(), this.zo = null, this.ko = null);
  }
  Po(t) {
    this.Oo = t;
  }
  To(t) {
    this.Io = t;
  }
  Qo(t) {
    const e = this.No(t), i = this.So.get(t) || this.So.get(e);
    return (i == null ? void 0 : i.isPressed) || !1;
  }
  Xo() {
    return this.zo;
  }
  Yo() {
    return this.ko;
  }
  jo() {
    const t = [];
    for (const [e, i] of this.So) i.isPressed && t.push(e);
    return t;
  }
  Ko() {
    return { ctrl: this.Qo("Control"), shift: this.Qo("Shift"), alt: this.Qo("Alt"), meta: this.Qo("Meta") };
  }
  Wo() {
    this.So.clear(), this.zo = null, this.ko = null;
  }
  Ho(t) {
    const e = t.key, i = Date.now();
    this.So.has(e) || this.So.set(e, { isPressed: !1, lastPressTime: 0, lastReleaseTime: 0 });
    const s = this.So.get(e);
    if (!s.isPressed && (s.isPressed = !0, s.lastPressTime = i, this.zo = e, this.Oo)) {
      const r = { key: e, keyCode: t.keyCode, ctrlKey: t.ctrlKey, shiftKey: t.shiftKey, altKey: t.altKey, metaKey: t.metaKey, isPressed: !0, originalEvent: t };
      this.Oo(r);
    }
  }
  Go(t) {
    const e = t.key, i = Date.now();
    this.So.has(e) || this.So.set(e, { isPressed: !1, lastPressTime: 0, lastReleaseTime: 0 });
    const s = this.So.get(e);
    if (s.isPressed = !1, s.lastReleaseTime = i, this.ko = e, this.Io) {
      const r = { key: e, keyCode: t.keyCode, ctrlKey: t.ctrlKey, shiftKey: t.shiftKey, altKey: t.altKey, metaKey: t.metaKey, isPressed: !1, originalEvent: t };
      this.Io(r);
    }
  }
  No(t) {
    return this.Bo[t] || t.toLowerCase();
  }
}
const Oe = Object.freeze(Object.defineProperty({ __proto__: null, KeyboardManager: Bt }, Symbol.toStringTag, { value: "Module" }));
class Nt {
  constructor(t, e, i) {
    a(this, "kr");
    a(this, "Zo");
    a(this, "Zn");
    a(this, "qo", /* @__PURE__ */ new Map());
    a(this, "Vo", /* @__PURE__ */ new Map());
    a(this, "Jo", /* @__PURE__ */ new Map());
    a(this, "th", null);
    a(this, "sh");
    a(this, "ih");
    a(this, "eh");
    a(this, "rh");
    a(this, "nh");
    a(this, "oh");
    a(this, "ao", !1);
    a(this, "hh");
    a(this, "ah");
    a(this, "uh");
    a(this, "fh");
    a(this, "dh");
    a(this, "ph");
    a(this, "gh");
    a(this, "mh");
    a(this, "_h");
    a(this, "yh");
    a(this, "Ah", 320);
    a(this, "wh", 350);
    a(this, "bh", 10);
    a(this, "Ch", 550);
    a(this, "xh", 14);
    a(this, "Mh", 48);
    a(this, "Fh", 650);
    a(this, "$h", 0.02);
    a(this, "Ph", 2);
    a(this, "Th", 600);
    a(this, "Eh", 0);
    a(this, "Rh", null);
    this.kr = t, this.Zn = e, this.Zo = i;
    const s = this.kr.canvas;
    this.sh = s.style.touchAction, this.ih = s.style.userSelect, s.style.touchAction || (s.style.touchAction = "none"), s.style.userSelect || (s.style.userSelect = "none");
  }
  _o() {
    if (this.ao) return;
    const t = this.kr.canvas;
    this.eh = (e) => {
      this.Sh(e);
    }, this.rh = (e) => {
      this.zh(e);
    }, this.nh = (e) => {
      this.kh(e);
    }, this.oh = (e) => {
      this.Dh(e);
    }, t.addEventListener("touchstart", this.eh, { passive: !1 }), t.addEventListener("touchmove", this.rh, { passive: !1 }), t.addEventListener("touchend", this.nh, { passive: !1 }), t.addEventListener("touchcancel", this.oh, { passive: !1 }), this.ao = !0;
  }
  Mo() {
    if (!this.ao) return;
    const t = this.kr.canvas;
    t.removeEventListener("touchstart", this.eh), t.removeEventListener("touchmove", this.rh), t.removeEventListener("touchend", this.nh), t.removeEventListener("touchcancel", this.oh), this.ao = !1, this.th = null, this.qo.clear(), this.Vo.clear(), this.Jo.forEach((e) => {
      e.longPressTimer !== null && window.clearTimeout(e.longPressTimer);
    }), this.Jo.clear(), this.Rh = null, this.Eh = 0, t.style.touchAction = this.sh, t.style.userSelect = this.ih;
  }
  Fo() {
    if (!this.Zn() || this.qo.size === 0) return;
    const t = /* @__PURE__ */ new Map();
    for (const e of this.qo.values()) {
      const i = this.Lh(e.clientX, e.clientY, e.id, e);
      t.set(e.id, i);
    }
    this.qo = t;
  }
  Oh() {
    return Array.from(this.qo.values()).map((t) => ({ ...t }));
  }
  Ih(t) {
    this.hh = t;
  }
  Uo(t) {
    this.ah = t;
  }
  Bh(t) {
    this.uh = t;
  }
  Hh(t) {
    this.fh = t;
  }
  Gh(t) {
    this.dh = t;
  }
  Qh(t) {
    this.ph = t;
  }
  Nh(t) {
    this.gh = t;
  }
  Xh(t) {
    this.mh = t;
  }
  Yh(t) {
    this._h = t;
  }
  jh(t) {
    this.yh = t;
  }
  Sh(t) {
    var s;
    if (!this.Zn()) return;
    t.preventDefault(), (s = this.Zo) == null || s.vo(this.Th);
    const e = performance.now(), i = this.Kh(t.changedTouches);
    for (const r of i) {
      const h = this.qo.get(r.id);
      h && this.Vo.set(r.id, this.Wh(h)), this.qo.set(r.id, r);
      const o = { id: r.id, startPosition: r, lastPosition: r, startTime: e, lastTime: e, longPressTimer: null, longPressFired: !1 };
      this.gh && (o.longPressTimer = window.setTimeout(() => {
        const c = this.qo.get(r.id);
        c && (o.longPressFired = !0, this.gh({ touch: this.Wh(c), duration: performance.now() - o.startTime, originalEvent: t }));
      }, this.Ch)), this.Jo.set(r.id, o), this.hh && this.hh(this.Zh(r, t, void 0, e));
    }
    this.qo.size === 2 && this.qh();
  }
  zh(t) {
    var s;
    if (!this.Zn()) return;
    t.preventDefault(), (s = this.Zo) == null || s.vo(this.Th);
    const e = performance.now(), i = this.Kh(t.changedTouches);
    for (const r of i) {
      const h = this.qo.get(r.id), o = h ? this.Wh(h) : void 0;
      o && this.Vo.set(r.id, o), this.qo.set(r.id, r);
      const c = this.Jo.get(r.id);
      c && (c.lastPosition = r, c.lastTime = e, o) && Y(o.clientX, o.clientY, r.clientX, r.clientY) > this.xh && c.longPressTimer !== null && (window.clearTimeout(c.longPressTimer), c.longPressTimer = null), this.ah && this.ah(this.Zh(r, t, o, e));
    }
    this.qo.size === 2 ? this.Vh(t) : this.th = null;
  }
  kh(t) {
    if (!this.Zn()) return;
    t.preventDefault();
    const e = performance.now(), i = this.Kh(t.changedTouches);
    for (const s of i) {
      const r = this.qo.get(s.id), h = r ? this.Wh(r) : void 0, o = this.Jo.get(s.id);
      o && o.longPressTimer !== null && (window.clearTimeout(o.longPressTimer), o.longPressTimer = null), this.uh && this.uh(this.Zh(s, t, h, e)), o && this.Jh(o, t), this.Jo.delete(s.id), this.Vo.delete(s.id), this.qo.delete(s.id);
    }
    this.qo.size < 2 && (this.th = null);
  }
  Dh(t) {
    if (!this.Zn()) return;
    t.preventDefault();
    const e = performance.now(), i = this.Kh(t.changedTouches);
    for (const s of i) {
      const r = this.qo.get(s.id), h = r ? this.Wh(r) : void 0, o = this.Jo.get(s.id);
      o && o.longPressTimer !== null && (window.clearTimeout(o.longPressTimer), o.longPressTimer = null), this.fh && this.fh(this.Zh(s, t, h, e)), this.Jo.delete(s.id), this.Vo.delete(s.id), this.qo.delete(s.id);
    }
    this.qo.size < 2 && (this.th = null);
  }
  Kh(t) {
    const e = [];
    for (let i = 0; i < t.length; i += 1) {
      const s = t.item(i);
      s && e.push(this.ta(s));
    }
    return e;
  }
  ta(t) {
    return this.Lh(t.clientX, t.clientY, t.identifier, { id: t.identifier, x: -1, y: -1, clientX: t.clientX, clientY: t.clientY, pressure: t.force, radiusX: t.radiusX, radiusY: t.radiusY, rotationAngle: t.rotationAngle });
  }
  Lh(t, e, i, s) {
    const r = this.kr.canvas, h = this.Zn(), o = r.getBoundingClientRect(), c = t - o.left, l = e - o.top, u = c * (r.width / o.width), f = l * (r.height / o.height);
    if (!h) return { id: i, x: -1 / 0, y: -1 / 0, clientX: t, clientY: e, pressure: s.pressure, radiusX: s.radiusX, radiusY: s.radiusY, rotationAngle: s.rotationAngle };
    const d = u - h.offsetX, g = f - h.offsetY, p = Math.floor(d / h.cellWidth), v = Math.floor(g / h.cellHeight);
    return p >= 0 && p < h.cols && v >= 0 && v < h.rows ? { id: i, x: p - Math.floor((h.cols - 1) / 2), y: v - Math.floor(h.rows / 2), clientX: t, clientY: e, pressure: s.pressure, radiusX: s.radiusX, radiusY: s.radiusY, rotationAngle: s.rotationAngle } : { id: i, x: -1 / 0, y: -1 / 0, clientX: t, clientY: e, pressure: s.pressure, radiusX: s.radiusX, radiusY: s.radiusY, rotationAngle: s.rotationAngle };
  }
  Zh(t, e, i, s) {
    const r = this.Jo.get(t.id), h = Array.from(this.Vo.values()).map((l) => this.Wh(l)), o = Array.from(this.qo.values()).map((l) => this.Wh(l)), c = this.Kh(e.changedTouches);
    return { touch: this.Wh(t), previousTouch: i ? this.Wh(i) : void 0, touches: o, previousTouches: h, changedTouches: c, deltaTime: r ? s - r.lastTime : 0, originalEvent: e };
  }
  qh() {
    if (this.qo.size !== 2) return void (this.th = null);
    const t = Array.from(this.qo.values()), [e, i] = t, s = Y(e.x, e.y, i.x, i.y), r = At(e.clientX, e.clientY, i.clientX, i.clientY);
    this.th = { ids: [e.id, i.id], initialDistance: Math.max(s, 1e-4), initialAngle: r, lastScale: 1, lastRotation: 0 };
  }
  Vh(t) {
    if (this.th || this.qh(), !this.th) return;
    const [e, i] = this.th.ids, s = this.qo.get(e), r = this.qo.get(i);
    if (!s || !r) return;
    const h = Y(s.x, s.y, r.x, r.y) / this.th.initialDistance, o = h - this.th.lastScale;
    this._h && Math.abs(o) > this.$h && (this._h({ touches: [this.Wh(s), this.Wh(r)], scale: h, deltaScale: o, center: this.sa(s, r), originalEvent: t }), this.th.lastScale = h);
    let c = At(s.clientX, s.clientY, r.clientX, r.clientY) - this.th.initialAngle;
    c = (c + 180) % 360 - 180;
    const l = c - this.th.lastRotation;
    this.yh && Math.abs(l) > this.Ph && (this.yh({ touches: [this.Wh(s), this.Wh(r)], rotation: c, deltaRotation: l, center: this.sa(s, r), originalEvent: t }), this.th.lastRotation = c);
  }
  sa(t, e) {
    const i = (t.clientX + e.clientX) / 2, s = (t.clientY + e.clientY) / 2, r = this.Lh(i, s, -1, { id: -1, x: -1, y: -1, clientX: i, clientY: s });
    return { x: r.x, y: r.y };
  }
  Jh(t, e) {
    const i = performance.now(), s = i - t.startTime, r = Y(t.startPosition.clientX, t.startPosition.clientY, t.lastPosition.clientX, t.lastPosition.clientY);
    if (!t.longPressFired && s <= this.Ah && r <= this.bh)
      this.ia(t.lastPosition, i) && this.ph ? this.ph({ touch: this.Wh(t.lastPosition), taps: 2, originalEvent: e }) : this.dh && this.dh({ touch: this.Wh(t.lastPosition), taps: 1, originalEvent: e });
    else if (!t.longPressFired && s <= this.Fh && r >= this.Mh) {
      const h = { x: t.lastPosition.clientX - t.startPosition.clientX, y: t.lastPosition.clientY - t.startPosition.clientY }, o = Math.max(Math.hypot(h.x, h.y), 1e-4), c = { x: h.x / o, y: h.y / o }, l = { x: h.x / s, y: h.y / s };
      this.mh && this.mh({ touch: this.Wh(t.lastPosition), direction: c, distance: o, velocity: l, originalEvent: e });
    }
    this.Eh = i, this.Rh = this.Wh(t.lastPosition);
  }
  ia(t, e) {
    return !this.Rh || e - this.Eh > this.wh ? !1 : Y(t.clientX, t.clientY, this.Rh.clientX, this.Rh.clientY) <= this.bh;
  }
  Wh(t) {
    return { ...t };
  }
}
const Ie = Object.freeze(Object.defineProperty({ __proto__: null, TouchManager: Nt }, Symbol.toStringTag, { value: "Module" }));
class nt extends St {
  constructor(e, i, s, r, h, o, c, l, u) {
    const f = o / c;
    let d, g;
    f > 1 ? (d = l, g = Math.round(l / f)) : (g = u, d = Math.round(u * f));
    super(e, i, s, r, o, c, d, g);
    a(this, "ea");
    this.ea = h;
  }
  gt() {
    super.gt(), this.ea.pause(), this.ea.src = "", this.ea.load();
  }
  ra() {
    if (this.ea.readyState >= this.ea.HAVE_CURRENT_DATA) {
      const e = this.A;
      e.bindTexture(e.TEXTURE_2D, this.ln), e.texImage2D(e.TEXTURE_2D, 0, e.RGBA, e.RGBA, e.UNSIGNED_BYTE, this.ea), e.bindTexture(e.TEXTURE_2D, null);
    }
  }
  $n() {
    return this.ln;
  }
  ut() {
    return this.q = null, super.ut();
  }
  xn() {
    this.ra();
  }
  static async Tn(e, i, s, r, h) {
    const o = e.context;
    let c;
    c = document.createElement("video"), c.crossOrigin = "anonymous", c.loop = !0, c.muted = !0, c.playsInline = !0, await new Promise((d, g) => {
      c.addEventListener("loadedmetadata", () => d(), { once: !0 }), c.addEventListener("error", (p) => {
        var m;
        const v = p.target;
        g(Error("Failed to load video: " + (((m = v.error) == null ? void 0 : m.message) || "Unknown error")));
      }, { once: !0 }), c.src = s;
    });
    const l = o.createTexture();
    o.bindTexture(o.TEXTURE_2D, l), o.pixelStorei(o.UNPACK_FLIP_Y_WEBGL, 1), pt(o, o.LINEAR, o.LINEAR, o.CLAMP_TO_EDGE, o.CLAMP_TO_EDGE), o.texImage2D(o.TEXTURE_2D, 0, o.RGBA, o.RGBA, o.UNSIGNED_BYTE, c), o.bindTexture(o.TEXTURE_2D, null);
    const u = c.videoWidth, f = c.videoHeight;
    return new nt(o, e, l, i, c, u, f, r, h);
  }
  async play() {
    await this.ea.play();
  }
  pause() {
    this.ea.pause();
  }
  stop() {
    this.ea.pause(), this.ea.currentTime = 0;
  }
  speed(e) {
    return this.ea.playbackRate = e, this;
  }
  loop(e = !0) {
    return this.ea.loop = e, this;
  }
  time(e) {
    return this.ea.currentTime = e, this;
  }
  volume(e) {
    return this.ea.volume = Math.max(0, Math.min(1, e)), this;
  }
  get videoElement() {
    return this.ea;
  }
  get currentTime() {
    return this.ea.currentTime;
  }
  get duration() {
    return this.ea.duration;
  }
  get isPlaying() {
    return !this.ea.paused && !this.ea.ended;
  }
}
const Xe = (n) => class extends n {
  na(t, e, i, s) {
    if (S.nn(t)) return t;
    if (typeof t == "number" || typeof t == "string") return this.color(t, e, i, s);
    throw Error("Unsupported color input passed to color-capable method.");
  }
  rotate(t = 0, e = 0, i = 0) {
    this.Z.state.Vt(t), this.Z.state.Jt(e), this.Z.state.ts(i);
  }
  rotateX(t) {
    this.Z.state.Vt(t);
  }
  rotateY(t) {
    this.Z.state.Jt(t);
  }
  rotateZ(t) {
    this.Z.state.ts(t);
  }
  translate(t = 0, e = 0, i = 0) {
    this.Z.state.ss(t, e, i);
  }
  translateX(t) {
    this.Z.state.ss(t, 0, 0);
  }
  translateY(t) {
    this.Z.state.ss(0, t, 0);
  }
  translateZ(t) {
    this.Z.state.ss(0, 0, t);
  }
  push() {
    this.Z.state.ot();
  }
  pop() {
    this.Z.state.ht();
  }
  color(t, e, i, s) {
    return S.rn(t, e, i, s);
  }
  rect(t = 1, e = 1) {
    this.Z.be(t, e);
  }
  point() {
    this.Z.be(1, 1);
  }
  line(t, e, i, s) {
    this.Z.Ce(t, e, i, s);
  }
  lineWeight(t) {
    this.Z.state.Zt(t);
  }
  background(t, e, i, s = 255) {
    const r = this.na(t, e, i, s);
    this.Z.Te(r.r, r.g, r.b, r.a);
  }
  char(t) {
    const e = Array.from(t);
    if (e.length === 0) throw Error("char() requires at least one character.");
    this.Z.state.hs(this.dn.$r(e[0]));
  }
  charColor(t, e, i, s) {
    const r = this.na(t, e, i, s);
    this.Z.state.cs(r.r, r.g, r.b, r.a);
  }
  cellColor(t, e, i, s) {
    const r = this.na(t, e, i, s);
    this.Z.state.ls(r.r, r.g, r.b, r.a);
  }
  flipX(t) {
    this.Z.state.us(t);
  }
  flipY(t) {
    this.Z.state.fs(t);
  }
  charRotation(t) {
    this.Z.state.vs(t);
  }
  invert(t) {
    this.Z.state.ds(t);
  }
  clear() {
    this.Z.wi(0, 0, 0, 0);
  }
  ellipse(t, e) {
    this.Z.xe(t / 2, e / 2);
  }
  triangle(t, e, i, s, r, h) {
    this.Z.Me(t, e, i, s, r, h);
  }
  bezierCurve(t, e, i, s, r, h, o, c) {
    this.Z.Fe(t, e, i, s, r, h, o, c);
  }
  arc(t, e, i, s) {
    this.Z.$e(t / 2, e / 2, i, s);
  }
  shader(t) {
    this.Z.ge(t);
  }
  setUniform(t, e) {
    this.Z.I(t, e);
  }
  setUniforms(t) {
    this.Z.me(t);
  }
  async createFilterShader(t) {
    if (typeof t == "string" && (t.startsWith("./") || t.startsWith("../") || t.endsWith(".frag") || t.endsWith(".glsl"))) {
      const e = await fetch(t);
      if (!e.ok) throw Error(`Failed to load shader from ${t}: ${e.statusText}`);
      const i = await e.text();
      return this.Z._e(i);
    }
    return this.Z._e(t);
  }
  createFramebuffer(t) {
    return this.Z.Pe(t.width ?? this.grid.cols, t.height ?? this.grid.rows, t.attachments ?? 3);
  }
  image(t, e, i) {
    const s = this.dn ?? this.oa.base.font;
    this.Z.ye(t, e, i, s), t instanceof Z && this.Z.ct();
  }
  async loadImage(t) {
    if (typeof t != "string")
      return z.Tn(this.Z, this.gn, t, this.grid.cols, this.grid.rows);
    const e = t, i = await new Promise((s, r) => {
      const h = new Image();
      h.crossOrigin = "anonymous", h.onload = () => s(h), h.onerror = (o) => r(o), h.src = e;
    });
    return z.Tn(this.Z, this.gn, i, this.grid.cols, this.grid.rows);
  }
  async loadVideo(t) {
    return await nt.Tn(this.Z, this.gn, t, this.grid.cols, this.grid.rows);
  }
}, Ze = (n) => class extends n {
  get frameCount() {
    return this.ha.Kn;
  }
  set frameCount(t) {
    this.ha.Kn = t;
  }
  frameRate(t) {
    return t === void 0 ? this.ha.jn : this.ha.Nn(t, () => this.aa());
  }
  noLoop() {
    this.ha.Gn();
  }
  loop() {
    this.ha.Qn(() => this.aa());
  }
  redraw(t = 1) {
    if (vt.m(typeof t == "number" && t > 0 && Number.isInteger(t), "Redraw count must be a positive integer.", { method: "redraw", providedValue: t })) for (let e = 0; e < t; e++) this.aa();
  }
  isLooping() {
    return this.ha.Yn;
  }
}, ze = (n) => class extends n {
  constructor(...t) {
    super(...t);
  }
  mouseClicked(t) {
    this.Zo.$o(t);
  }
  mousePressed(t) {
    this.Zo.Po(t);
  }
  mouseReleased(t) {
    this.Zo.To(t);
  }
  mouseMoved(t) {
    this.Zo.Uo(t);
  }
  mouseScrolled(t) {
    this.Zo.Eo(t);
  }
  get mouse() {
    return this.Zo.Ro();
  }
  cursor(t) {
    this.Zo.mo(t);
  }
}, ke = (n) => class extends n {
  constructor(...t) {
    super(...t);
  }
  touchStarted(t) {
    this.ca.Ih(t);
  }
  touchMoved(t) {
    this.ca.Uo(t);
  }
  touchEnded(t) {
    this.ca.Bh(t);
  }
  touchCancelled(t) {
    this.ca.Hh(t);
  }
  tap(t) {
    this.ca.Gh(t);
  }
  doubleTap(t) {
    this.ca.Qh(t);
  }
  longPress(t) {
    this.ca.Nh(t);
  }
  swipe(t) {
    this.ca.Xh(t);
  }
  pinch(t) {
    this.ca.Yh(t);
  }
  rotateGesture(t) {
    this.ca.jh(t);
  }
  get touches() {
    return this.ca.Oh();
  }
}, Ye = (n) => class extends n {
  constructor(...t) {
    super(...t);
  }
  keyPressed(t) {
    this.la.Po(t);
  }
  keyReleased(t) {
    this.la.To(t);
  }
  isKeyPressed(t) {
    return this.la.Qo(t);
  }
  get lastKeyPressed() {
    return this.la.Xo();
  }
  get lastKeyReleased() {
    return this.la.Yo();
  }
  get pressedKeys() {
    return this.la.jo();
  }
  get modifierState() {
    return this.la.Ko();
  }
};
class Ge {
  constructor(t) {
    a(this, "ua");
    a(this, "fa", /* @__PURE__ */ new Map());
    a(this, "da", []);
    a(this, "va", /* @__PURE__ */ new Map());
    a(this, "pa", /* @__PURE__ */ new Map());
    this.ua = t;
  }
  async ga(t) {
    for (const e of t) {
      if (this.fa.has(e.name)) return void console.warn(`[textmode.js] Plugin "${e.name}" is already installed.`);
      const i = this.ma(e.name);
      try {
        await e.install(this.ua, i);
      } catch (s) {
        throw this._a(e.name), s;
      }
      this.fa.set(e.name, e), this.da.push(e.name);
    }
  }
  async ya(t) {
    const e = this.fa.get(t);
    if (!e) return;
    const i = this.ma(t);
    e.uninstall && await e.uninstall(this.ua, i), this.fa.delete(t), this.da.splice(this.da.indexOf(t), 1), this._a(t);
  }
  wa() {
    this.ba(this.va);
  }
  Ca() {
    this.ba(this.pa);
  }
  async xa() {
    const t = [...this.fa.keys()];
    for (const e of t) await this.ya(e);
  }
  ma(t) {
    const e = this.ua.layers.base, i = e.drawFramebuffer, s = e.asciiFramebuffer;
    return { renderer: this.ua.Z, font: e.font, grid: e.grid, canvas: this.ua.kr, drawFramebuffer: i, asciiFramebuffer: s, registerPreDrawHook: (r) => this.Ma(this.va, t, r), registerPostDrawHook: (r) => this.Ma(this.pa, t, r) };
  }
  Ma(t, e, i) {
    const s = t.get(e) ?? /* @__PURE__ */ new Set();
    return s.add(i), t.set(e, s), () => {
      const r = t.get(e);
      r && (r.delete(i), r.size === 0 && t.delete(e));
    };
  }
  _a(t) {
    this.va.delete(t), this.pa.delete(t);
  }
  ba(t) {
    for (const e of this.da) {
      const i = t.get(e);
      i && i.forEach((s) => s());
    }
  }
}
const Q = `#version 300 es
in vec2 A0;in vec2 A1;out vec2 v_uv;void main(){v_uv=A1;gl_Position=vec4(A0,0.,1.);}`, _t = `#version 300 es
precision highp float;uniform sampler2D u_texture;in vec2 v_uv;out vec4 fragColor;void main(){fragColor=texture(u_texture,v_uv);}`;
class Dt {
  constructor() {
    a(this, "Fa", /* @__PURE__ */ new Map());
    a(this, "$a", []);
    a(this, "Pa", 0);
    a(this, "Ta", 0);
    a(this, "Ea");
  }
  get Ra() {
    return this.Pa;
  }
  get Sa() {
    if (this.Pa === 0) return 0;
    let t = 0;
    for (const e of this.$a) {
      const i = this.Fa.get(e);
      i && (t += Math.min(1, Math.max(0, i.progress)) * i.weight);
    }
    return Math.min(1, t / this.Pa);
  }
  za(t) {
    this.Ea = t;
  }
  ka(t, e = 1) {
    const i = `phase-${this.$a.length + 1}-${Date.now()}`, s = { id: i, label: t, weight: Math.max(1e-3, e), progress: 0, status: "running" };
    return this.Fa.set(i, s), this.$a.push(i), this.Pa += s.weight, i;
  }
  Da(t, e) {
    const i = this.Fa.get(t);
    if (!i) return;
    i.progress = Math.max(0, Math.min(1, e)), i.status = i.progress >= 1 ? "complete" : "running";
    const s = this.Sa;
    Math.abs(s - this.Ta) > 1e-3 && (this.Ta = s, this.Ea && this.Ea(s));
  }
  La(t) {
    const e = this.Fa.get(t);
    e && (e.progress = 1, e.status = "complete", this.Da(t, 1));
  }
  Oa(t) {
    const e = this.Fa.get(t);
    e && (e.status = "failed");
  }
  Ia() {
    return this.$a.map((t) => {
      const e = this.Fa.get(t);
      return e ? { id: e.id, label: e.label, weight: e.weight, progress: e.progress, status: e.status } : { id: t, label: t, weight: 1, progress: 0, status: "pending" };
    });
  }
}
class Ot {
  constructor(t = "active") {
    a(this, "Ba");
    a(this, "Ha", "");
    a(this, "Ga", "");
    this.Ba = t;
  }
  get Qa() {
    return this.Ba;
  }
  get Na() {
    return this.Ba !== "disabled";
  }
  get Xa() {
    return this.Ba === "active" || this.Ba === "transitioning" || this.Ba === "error";
  }
  get Ya() {
    return this.Ha;
  }
  get ja() {
    return this.Ga;
  }
  Ka() {
    this.Ba !== "done" && this.Ba !== "transitioning" || (this.Ba = "active");
  }
  Wa() {
    this.Ba !== "disabled" && (this.Ba = "done");
  }
  Za() {
    this.Ba !== "disabled" && (this.Ba = "transitioning");
  }
  qa() {
    this.Ba === "transitioning" && (this.Ba = "done");
  }
  Va(t) {
    this.Ba !== "disabled" && (this.Ba = "error", t instanceof Error ? (this.Ha = t.message, this.Ga = t.stack || "") : (this.Ha = t, this.Ga = ""));
  }
  Ja() {
    this.Ba = "disabled";
  }
}
class It {
  constructor(t, e) {
    a(this, "tc", 0);
    a(this, "sc", 1);
    a(this, "ec");
    a(this, "rc");
    this.ec = t, this.rc = e;
  }
  get nc() {
    return this.sc;
  }
  get oc() {
    return this.sc < 1;
  }
  Bn() {
    this.ec !== "none" && this.rc > 0 && (this.tc = performance.now());
  }
  et() {
    if (this.ec === "none" || this.rc === 0) return this.sc = 1, !1;
    const t = performance.now() - this.tc, e = Math.min(1, t / this.rc);
    return e >= 1 ? (this.sc = 0, !0) : (this.sc = 1 - e, !1);
  }
  ti() {
    this.sc = 1, this.tc = 0;
  }
}
function gt(n, t) {
  const e = n.tone ?? "auto";
  let i = "dark";
  return e === "light" || e === "dark" ? i = e : t && (i = function(s) {
    if (!s) return 0;
    const [r, h, o] = s.map((l) => l / 255), c = (l) => l <= 0.04045 ? l / 12.92 : Math.pow((l + 0.055) / 1.055, 2.4);
    return 0.2126 * c(r) + 0.7152 * c(h) + 0.0722 * c(o);
  }(t) > 0.5 ? "light" : "dark"), { mode: i, background: t, textColor: i === "light" ? "#1A1A1A" : "#F8F8F8", subtleColor: i === "light" ? "#4A4A4A" : "#C0C0C0" };
}
function Xt(n) {
  return n.mode === "light" ? ["#E91E63", "#9C27B0", "#FF6F00"] : ["#8EF9F3", "#F15BB5", "#FF9B71"];
}
function Zt(n, t) {
  return n.length ? n.map((e) => t.color(e)) : [t.color("#FFFFFF")];
}
class zt {
  constructor(t, e, i) {
    this.hc = t, this.id = e, this.label = i;
  }
  report(t) {
    this.hc.Da(this.id, t);
  }
  complete() {
    this.hc.La(this.id);
  }
  fail(t) {
    this.hc.Oa(this.id);
  }
  async track(t) {
    try {
      const e = typeof t == "function" ? await t() : await t;
      return this.complete(), e;
    } catch (e) {
      throw this.fail(), e;
    }
  }
}
const He = ({ textmodifier: n, grid: t, progress: e, frameCount: i, message: s, palette: r, theme: h, phases: o, transitionOpacity: c, isError: l, errorMessage: u }) => {
  const f = "|/-\\", d = Math.floor(i / 6) % 4, g = n.color(h.textColor), p = Math.floor(255 * c), v = n.color(g.r, g.g, g.b, p);
  if (n.charColor(v), n.cellColor(0, 0, 0, 0), l) {
    const m = n.color(h.mode === "light" ? "#D32F2F" : "#FF6B6B", p);
    n.charColor(m), n.push(), n.translate(0, -2, 0), n.char("X"), n.rect(1, 1), n.pop();
    const A = "SETUP ERROR", b = -Math.floor(A.length / 2);
    n.push(), n.translate(b, 0, 0);
    for (const y of A) n.char(y), n.rect(1, 1), n.translateX(1);
    if (n.pop(), u) {
      const y = n.color(h.subtleColor), x = n.color(y.r, y.g, y.b, p);
      n.charColor(x);
      const E = Math.floor(0.8 * t.cols), F = u.split(" "), P = [];
      let T = "";
      for (const C of F) (T + " " + C).length <= E ? T = T ? T + " " + C : C : (T && P.push(T), T = C);
      T && P.push(T);
      const L = P.slice(0, 3);
      P.length > 3 && (L[2] = L[2].substring(0, E - 3) + "..."), L.forEach((C, K) => {
        const Qt = -Math.floor(C.length / 2);
        n.push(), n.translate(Qt, 3 + K, 0);
        for (const Kt of C) n.char(Kt), n.rect(1, 1), n.translateX(1);
        n.pop();
      });
    }
    return;
  }
  if (n.push(), n.translate(0, 0, 0), n.char(f[d]), n.rect(1, 1), n.pop(), e > 0 || o.some((m) => m.status !== "pending")) {
    const m = Math.max(6, Math.floor(0.6 * t.cols)), A = -Math.floor(m / 2), b = Math.floor(m * e), y = r.length ? r : [n.color("#FFFFFF")];
    n.push(), n.translate(A, 3, 0);
    for (let x = 0; x < m; x++) {
      const E = x < b ? "*" : ".", F = y[x % y.length], P = n.color(F.r, F.g, F.b, p);
      n.charColor(P), n.char(E), n.rect(1, 1), n.translateX(1);
    }
    n.pop();
  }
  if (s) {
    const m = n.color(h.subtleColor), A = n.color(m.r, m.g, m.b, p);
    n.charColor(A);
    const b = -Math.floor(s.length / 2);
    n.push(), n.translate(b, 5, 0);
    for (const y of s) n.char(y), n.rect(1, 1), n.translateX(1);
    n.pop();
  }
};
class it {
  constructor(t, e = {}) {
    a(this, "ac");
    a(this, "nc");
    a(this, "cc");
    a(this, "lc");
    a(this, "uc");
    a(this, "fc");
    a(this, "dc");
    a(this, "vc");
    a(this, "gc");
    a(this, "mc");
    a(this, "nr");
    a(this, "_c");
    a(this, "yc");
    a(this, "wc");
    a(this, "bc");
    a(this, "Cc", null);
    a(this, "xc", !1);
    a(this, "Mc", []);
    this.ac = e.visible ?? !0, this.nc = e.opacity ?? 1, this.cc = e.blendMode ?? "normal", this.lc = e.offsetX ?? 0, this.uc = e.offsetY ?? 0, this.fc = e.rotationZ ?? 0, this.dc = e.fontSize ?? 16, this.vc = e.fontSource, e.fontSource instanceof et ? this.nr = e.fontSource : this.nr = new et(t, this.dc);
  }
  async Fc(t) {
    this.gc = t, this.nr.Tr || await this.nr.wr(this.vc);
    const e = this.nr.maxGlyphDimensions;
    this.mc = new Le(this.gc.canvas.canvas, e.width, e.height);
    const i = this.mc;
    this._c = this.gc.createFramebuffer(i.cols, i.rows, 3), this.yc = this.gc.createFramebuffer(i.width, i.height, 1), this.wc = this.gc.createFramebuffer(i.width, i.height, 1), this.bc = [this.gc.createFramebuffer(i.width, i.height, 1, { depth: !1 }), this.gc.createFramebuffer(i.width, i.height, 1, { depth: !1 })], this.xc = !1, this.mc.Hr(() => {
      var s, r, h;
      this._c.resize(this.mc.cols, this.mc.rows), this.yc.resize(this.mc.width, this.mc.height), (s = this.wc) == null || s.resize(this.mc.width, this.mc.height), (r = this.bc) == null || r[0].resize(this.mc.width, this.mc.height), (h = this.bc) == null || h[1].resize(this.mc.width, this.mc.height);
    });
  }
  $c() {
    return this.Cc !== null;
  }
  Pc(t) {
    this.Cc && this.Cc.call(t);
  }
  draw(t) {
    this.Cc = t;
  }
  show() {
    this.ac = !0;
  }
  hide() {
    this.ac = !1;
  }
  opacity(t) {
    if (t === void 0) return this.nc;
    this.nc = Math.min(1, Math.max(0, t));
  }
  blendMode(t) {
    if (t === void 0) return this.cc;
    this.cc = t;
  }
  offset(t, e = 0) {
    if (t === void 0) return { x: this.lc, y: this.uc };
    this.lc = t, this.uc = e;
  }
  rotateZ(t) {
    if (t === void 0) return this.fc;
    this.fc = t;
  }
  filter(t, e) {
    this.Mc.push({ name: t, params: e });
  }
  fontSize(t) {
    if (t === void 0) return this.nr.fontSize;
    this.nr.Mr(t), this.Tc();
  }
  async loadFont(t) {
    if (!this.nr) throw Error("Layer font not initialized. Ensure layer is attached before loading fonts.");
    return t instanceof et ? (this.nr = t, this.nr.Tr || await this.nr.wr()) : await this.nr.Fr(t), this.Tc(), this.nr;
  }
  aa(t, e, i) {
    const s = i == null ? void 0 : i.fallbackDraw;
    if (!this.ac) return void (this.xc = !1);
    if (!this.Cc && !s) return void (this.xc = !1);
    const r = this.gc.renderer;
    this._c.begin(), r.state.qt(), t.dn = this.nr, t.Ec = this.mc;
    try {
      this.Cc ? this.Cc.call(t) : s == null || s();
    } finally {
      t.dn = void 0, t.Ec = void 0;
    }
    this._c.end();
    const h = this.Mc.length > 0, o = h ? this.wc : this.yc;
    o.begin(), r.ve(e);
    const c = this.mc;
    e.O({ u_characterTexture: this.nr.fontFramebuffer, u_charsetDimensions: [this.nr.textureColumns, this.nr.textureRows], Ug: this._c.textures[0], Uh: this._c.textures[1], Ui: this._c.textures[2], Uj: [c.cols, c.rows], Uk: [o.width, o.height], Ul: [0, 0, 0, 0] }), r.we(0, 0, c.width, c.height), o.end(), h && this.gc.filterManager.Rc(this.wc.textures[0], this.yc, this.Mc, this.yc.width, this.yc.height, this.bc), this.Mc = [], this.xc = !0;
  }
  Jr() {
    var t;
    this._c && this.yc && ((t = this.mc) == null || t.ti());
  }
  gt() {
    var t, e, i, s, r, h, o;
    (t = this._c) == null || t.gt(), (e = this.yc) == null || e.gt(), (i = this.wc) == null || i.gt(), (s = this.bc) == null || s[0].gt(), (r = this.bc) == null || r[1].gt(), (h = this.nr) == null || h.gt(), (o = this.mc) == null || o.gt();
  }
  get texture() {
    var t;
    return (t = this.yc) == null ? void 0 : t.textures[0];
  }
  get grid() {
    return this.mc;
  }
  get font() {
    if (!this.nr) throw Error("Layer font not initialized. Ensure font is set before accessing.");
    return this.nr;
  }
  get width() {
    return this.yc ? this.yc.width : 0;
  }
  get height() {
    return this.yc ? this.yc.height : 0;
  }
  get Sc() {
    return this.xc;
  }
  get drawFramebuffer() {
    return this._c;
  }
  get asciiFramebuffer() {
    return this.yc;
  }
  Tc() {
    if (!this.mc || !this.nr) return;
    const t = this.nr.maxGlyphDimensions;
    this.mc.Qr(t.width, t.height), this._c && this.yc && this.Jr();
  }
}
const We = { message: "LOADING...", tone: "auto", transition: "fade", transitionDuration: 500 };
class kt {
  constructor(t, e, i) {
    a(this, "ua");
    a(this, "l");
    a(this, "zc");
    a(this, "hc");
    a(this, "kc");
    a(this, "Dc");
    a(this, "Lc");
    a(this, "Oc");
    a(this, "Ic", []);
    a(this, "Bc");
    a(this, "Hc", performance.now());
    a(this, "Gc", 0);
    a(this, "Qc", !1);
    a(this, "Ar", !1);
    a(this, "Kc");
    this.ua = t, this.l = { ...We, ...e ?? {} }, this.zc = new Ot("active"), this.hc = new Dt(), this.kc = new It(this.l.transition, this.l.transitionDuration), this.Dc = new Ut(60), this.Bc = gt(this.l, i);
    const s = Xt(this.Bc);
    this.Ic = Zt(s, this.ua), this.Oc = this.Nc(), this.hc.za((r) => {
      r >= 0.999 && this.Wa();
    });
  }
  async wr() {
    if (this.Ar) return;
    const t = this.ua.Z, e = this.ua.kr, i = this.ua.Xc;
    this.Lc = new it(t, { visible: !0, opacity: 1, fontSize: 16 }), await this.Lc.Fc({ renderer: t, canvas: e, filterManager: i, createFramebuffer: (s, r, h = 1, o) => t.Pe(s, r, h, o) }), this.Ar = !0;
  }
  get Xa() {
    return this.zc.Xa && this.Qc;
  }
  Bn() {
    this.Qc || (this.Qc = !0, this.Hc = performance.now(), this.Gc = 0, this.Dc.Bn(() => this.Yc()));
  }
  Hn() {
    this.Qc && (this.Qc = !1, this.Dc.Hn());
  }
  Jr() {
    this.Ar && this.Lc.Jr();
  }
  gt() {
    this.Hn(), this.Ar && (this.Lc.gt(), this.Ar = !1);
  }
  get progress() {
    return this.hc.Sa;
  }
  message(t) {
    return typeof t == "string" && (this.l.message = t), this.l.message;
  }
  addPhase(t, e = 1) {
    this.zc.Ka();
    const i = this.hc.ka(t, e);
    return new zt(this.hc, i, t);
  }
  Wa() {
    this.l.transition !== "none" && this.l.transitionDuration > 0 ? (this.zc.Za(), this.kc.Bn()) : (this.zc.Wa(), this.Hn(), this.jc());
  }
  jc() {
    this.Kc && this.Kc();
  }
  Wc(t) {
    this.Kc = t;
  }
  error(t) {
    this.zc.Va(t);
  }
  Yc() {
    if (this.zc.Xa) {
      if (this.Gc++, this.zc.Qa === "transitioning" && this.kc.et())
        return this.zc.qa(), this.jc(), void this.Hn();
      this.Zc();
    }
  }
  Zc() {
    if (!this.Ar) return;
    const t = this.Lc, e = t.grid, i = this.ua.Z, s = this.ua.qc, r = this.ua.Vc, h = { textmodifier: this.ua, grid: e, progress: this.progress, elapsedMs: performance.now() - this.Hc, frameCount: this.Gc, message: this.l.message, palette: this.Ic, theme: this.Bc, phases: this.hc.Ia(), transitionOpacity: this.kc.nc, isError: this.zc.Qa === "error", errorMessage: this.zc.Ya || void 0, errorDetails: this.zc.ja || void 0 };
    t.draw(() => {
      this.ua.clear(), this.ua.push();
      try {
        this.Oc(h);
      } finally {
        this.ua.pop();
      }
    }), t.aa(this.ua, s);
    const o = t.texture;
    o && (i.wi(...i.state.canvasBackgroundColor), i.ve(r), r.O({ u_texture: o }), i.we(e.offsetX, e.offsetY, e.width, e.height));
  }
  Jc(t) {
    this.Bc = gt(this.l, t);
  }
  Nc() {
    const t = this.l.renderer || He;
    return (e) => {
      t(e), this.tl(e);
    };
  }
  tl(t) {
    const { textmodifier: e, grid: i, frameCount: s, theme: r, transitionOpacity: h } = t, o = [116, 101, 120, 116, 109, 111, 100, 101, 46, 106, 115].map((f) => String.fromCharCode(f)).join(""), c = (i.rows + 1 >> 1) - 2, l = 2 - (i.cols + 1 >> 1), u = r.mode === "light" ? [[233, 30, 99], [156, 39, 176], [255, 111, 0]] : [[142, 249, 243], [241, 91, 181], [255, 155, 113]];
    e.push(), e.translate(l, c, 0);
    for (let f = 0; f < o.length; f++) {
      const d = o[f], g = Math.floor(0.1 * s + 0.5 * f) % u.length, [p, v, m] = u[g], A = Math.floor(255 * h), b = e.color(p, v, m, A);
      e.charColor(b), e.char(d), e.point(), e.translateX(1);
    }
    e.pop();
  }
}
const wt = { normal: 0, additive: 1, multiply: 2, screen: 3, subtract: 4, darken: 5, lighten: 6, overlay: 7, softLight: 8, hardLight: 9, colorDodge: 10, colorBurn: 11, difference: 12, exclusion: 13 };
class Yt {
  constructor(t, e, i) {
    a(this, "Z");
    a(this, "sl");
    a(this, "bc");
    a(this, "il", 0);
    this.Z = t, this.sl = t.pe(Q, `#version 300 es
precision highp float;uniform sampler2D U8;uniform sampler2D U9;uniform vec2 Ua;uniform vec2 Ub;uniform vec2 Uc;uniform float Ud;uniform float Ue;uniform int Uf;in vec2 v_uv;out vec4 fragColor;const int A=0;const int B=1;const int C=2;const int D=3;const int E=4;const int F=5;const int G=6;const int H=7;const int I=8;const int J=9;const int K=10;const int L=11;const int M=12;const int N=13;vec3 O(vec3 P,vec3 Q){return Q;}vec3 R(vec3 P,vec3 Q){return P+Q;}vec3 S(vec3 P,vec3 Q){return P*Q;}vec3 T(vec3 P,vec3 Q){return 1.-(1.-P)*(1.-Q);}vec3 U(vec3 P,vec3 Q){return max(P-Q,0.);}vec3 V(vec3 P,vec3 Q){return min(P,Q);}vec3 W(vec3 P,vec3 Q){return max(P,Q);}vec3 X(vec3 P,vec3 Q){return mix(2.*P*Q,1.-2.*(1.-P)*(1.-Q),step(0.5,P));}vec3 Y(vec3 P,vec3 Q){return mix(P-(1.-2.*Q)*P*(1.-P),mix(P+(2.*Q-1.)*(P*(3.-2.*P)-P),P+(2.*Q-1.)*(sqrt(P)-P),step(0.25,P)),step(0.5,Q));}vec3 Z(vec3 P,vec3 Q){return mix(2.*P*Q,1.-2.*(1.-P)*(1.-Q),step(0.5,Q));}vec3 a(vec3 P,vec3 Q){return mix(min(vec3(1.),P/max(1.-Q,0.0001)),vec3(1.),step(1.,Q));}vec3 b(vec3 P,vec3 Q){return mix(1.-min(vec3(1.),(1.-P)/max(Q,0.0001)),vec3(0.),step(Q,vec3(0.)));}vec3 c(vec3 P,vec3 Q){return abs(P-Q);}vec3 d(vec3 P,vec3 Q){return P+Q-2.*P*Q;}vec3 e(int f,vec3 P,vec3 Q){if(f==A)return O(P,Q);if(f==B)return R(P,Q);if(f==C)return S(P,Q);if(f==D)return T(P,Q);if(f==E)return U(P,Q);if(f==F)return V(P,Q);if(f==G)return W(P,Q);if(f==H)return X(P,Q);if(f==I)return Y(P,Q);if(f==J)return Z(P,Q);if(f==K)return a(P,Q);if(f==L)return b(P,Q);if(f==M)return c(P,Q);if(f==N)return d(P,Q);return O(P,Q);}void main(){vec4 g=texture(U9,v_uv);vec2 h=v_uv*Ua;vec2 i=h-Uc;vec2 j=Ub*0.5;vec2 k=i-j;float l=cos(-Ue);float m=sin(-Ue);vec2 n=vec2(k.x*l-k.y*m,k.x*m+k.y*l);i=n+j;bool o=any(lessThan(i,vec2(0.)))||any(greaterThanEqual(i,Ub));if(o){fragColor=g;return;}vec2 p=(floor(i)+0.5)/Ub;vec4 q=texture(U8,p);float r=q.a*Ud;if(r<=0.){fragColor=g;return;}vec3 s=e(Uf,g.rgb,q.rgb);vec3 t=mix(g.rgb,s,r);float u=g.a+r*(1.-g.a);fragColor=vec4(t,u);}`), this.bc = [this.Z.Pe(e, i, 1), this.Z.Pe(e, i, 1)];
  }
  el(t) {
    const e = this.Z.context, { base: i, targetFramebuffer: s, backgroundColor: r, layers: h, canvasWidth: o, canvasHeight: c } = t, l = e.isEnabled(e.DEPTH_TEST), u = e.getParameter(e.DEPTH_WRITEMASK);
    l && e.disable(e.DEPTH_TEST), u && e.depthMask(!1);
    const f = this.bc[0];
    f.begin(), this.Z.wi(...r), f.end(), this.il = 0, i.layer.ac && this.rl(i.texture, o, c, i.width, i.height, i.layer.nc, i.offsetX, i.offsetY, i.layer.fc, "normal", e);
    for (const d of h) {
      const g = d.layer;
      g.ac && g.Sc && this.rl(d.texture, o, c, d.width, d.height, g.nc, d.offsetX, d.offsetY, g.fc, g.cc, e);
    }
    this.nl(s, o, c, e), e.depthMask(u), l && e.enable(e.DEPTH_TEST);
  }
  rl(t, e, i, s, r, h, o, c, l, u, f) {
    const d = this.bc[this.il], g = this.il === 0 ? 1 : 0, p = this.bc[g], v = l * (Math.PI / 180);
    p.begin(), f.disable(f.BLEND), this.Z.ve(this.sl), this.sl.O({ U8: t, U9: d.textures[0], Ua: [e, i], Ub: [s, r], Uc: [o, c], Ud: h, Ue: v, Uf: wt[u] }), this.Z.we(0, 0, d.width, d.height), p.end(), this.il = g;
  }
  nl(t, e, i, s) {
    const r = this.bc[this.il];
    t.begin(), s.disable(s.BLEND), this.Z.ve(this.sl), this.sl.O({ U8: r.textures[0], U9: r.textures[0], Ua: [e, i], Ub: [r.width, r.height], Uc: [0, 0], Ud: 1, Ue: 0, Uf: wt.normal }), this.Z.we(0, 0, e, i), t.end();
  }
  Jr(t, e) {
    this.bc[0].resize(t, e), this.bc[1].resize(t, e);
  }
  gt() {
    this.sl.dispose(), this.bc[0].gt(), this.bc[1].gt();
  }
}
class Gt {
  constructor(t, e) {
    a(this, "ua");
    a(this, "Z");
    a(this, "ol");
    a(this, "hl");
    a(this, "al", []);
    a(this, "cl", []);
    a(this, "ll");
    a(this, "ul", !1);
    a(this, "fl", /* @__PURE__ */ new Set());
    this.ua = t, this.Z = t.Z, this.ol = t.qc, this.hl = new Yt(this.Z, this.ua.kr.width, this.ua.kr.height), this.ll = new it(this.Z, { visible: !0, opacity: 1, fontSize: e.fontSize, fontSource: e.fontSource });
  }
  async wr() {
    if (!this.ul) {
      await this.dl(this.ll);
      for (const t of this.al) await this.dl(t), this.cl.push(t);
      this.al = [], this.ul = !0;
    }
  }
  add(t = {}) {
    const e = new it(this.Z, t);
    return this.ul ? (this.dl(e), this.cl.push(e)) : this.al.push(e), e;
  }
  remove(t) {
    this.vl(this.cl, t) || this.vl(this.al, t);
  }
  move(t, e) {
    this.pl(this.cl, t, e) || this.pl(this.al, t, e);
  }
  swap(t, e) {
    t !== e && (this.ml(this.cl, t, e) || this.ml(this.al, t, e));
  }
  clear() {
    this.ll.gt(), this.cl.forEach((t) => t.gt()), this.cl = [], this.al.forEach((t) => t.gt()), this.al = [];
  }
  _l(t, e) {
    this.ll.aa(this.ua, this.ol, { fallbackDraw: e });
    const i = [...this.Z.state.canvasBackgroundColor];
    this.yl(), this.Al(t, i);
  }
  yl() {
    this.cl.length !== 0 && this.cl.forEach((t) => t.aa(this.ua, this.ol));
  }
  Al(t, e) {
    const i = this.ua.kr, s = this.ll.grid, r = this.ll.texture;
    if (!r) return;
    const h = { layer: this.ll, texture: r, width: s.width, height: s.height, offsetX: s.offsetX + this.ll.lc, offsetY: s.offsetY + this.ll.uc }, o = this.cl.map((c) => {
      const l = c.grid;
      return { layer: c, texture: c.texture, width: l.width, height: l.height, offsetX: l.offsetX + c.lc, offsetY: l.offsetY + c.uc };
    });
    this.hl.el({ base: h, layers: o, targetFramebuffer: t, backgroundColor: e, canvasWidth: i.width, canvasHeight: i.height });
  }
  Jr() {
    this.ul && (this.ll.Jr(), this.cl.forEach((t) => t.Jr()), this.hl.Jr(this.ua.kr.width, this.ua.kr.height));
  }
  gt() {
    this.cl.forEach((t) => t.gt()), this.al.forEach((t) => t.gt()), this.ll.gt(), this.hl.gt();
  }
  get all() {
    return this.cl;
  }
  get base() {
    return this.ll;
  }
  wl() {
    for (let t = this.cl.length - 1; t >= 0; t--) {
      const e = this.cl[t];
      if (e.ac && e.grid) return e.grid;
    }
    return this.ll.grid;
  }
  bl(t) {
    this.fl.add(t);
  }
  Cl() {
    for (const t of this.fl) t();
  }
  async dl(t) {
    var i;
    const e = { renderer: this.Z, canvas: this.ua.kr, filterManager: this.ua.Xc, createFramebuffer: (s, r, h = 1, o) => this.Z.Pe(s, r, h, o) };
    await t.Fc(e), (i = t.grid) == null || i.Hr(() => this.Cl());
  }
  vl(t, e) {
    const i = t.indexOf(e);
    if (i === -1) return !1;
    const [s] = t.splice(i, 1);
    return s.gt(), !0;
  }
  pl(t, e, i) {
    const s = t.indexOf(e);
    if (s === -1) return !1;
    t.splice(s, 1);
    const r = Math.max(0, Math.min(t.length, i));
    return t.splice(r, 0, e), !0;
  }
  ml(t, e, i) {
    const s = t.indexOf(e);
    if (s === -1) return !1;
    const r = t.indexOf(i);
    return r !== -1 && (t[s] = i, t[r] = e, !0);
  }
}
class Ht {
  constructor(t) {
    a(this, "Z");
    a(this, "xl", /* @__PURE__ */ new Map());
    a(this, "Ml", /* @__PURE__ */ new Map());
    this.Z = t, this.Fl();
  }
  async $l(t, e, i = {}) {
    const s = Object.entries(i), r = s.length > 0 ? s[0][1][0] : null;
    let h;
    if (typeof e == "string") {
      let c = e;
      if (e.startsWith("./") || e.startsWith("../") || e.endsWith(".frag") || e.endsWith(".glsl")) {
        const l = await fetch(e);
        if (!l.ok) throw Error(`Failed to load shader from ${e}: ${l.statusText}`);
        c = await l.text();
      }
      h = this.Z.pe(Q, c), this.Ml.set(t, h);
    } else h = e, this.Ml.set(t, h);
    const o = { id: t, createShader: () => h, createUniforms: (c, l) => {
      const u = { u_resolution: [l.width, l.height] };
      for (const [f, [d, g]] of s) {
        let p = g;
        c != null && (typeof c == "number" && d === r ? p = c : typeof c == "object" && d in c && (p = c[d] ?? g)), u[f] = p;
      }
      return u;
    } };
    this.xl.set(t, o);
  }
  Pl(t) {
    const e = this.Ml.get(t);
    return e && (e.dispose(), this.Ml.delete(t)), this.xl.delete(t);
  }
  Pn(t) {
    return this.xl.get(t);
  }
  gt() {
    for (const t of this.Ml.values()) t.dispose();
    this.Ml.clear(), this.xl.clear();
  }
  Fl() {
    this.$l("invert", `#version 300 es
precision highp float;uniform sampler2D u_texture;in vec2 v_uv;out vec4 fragColor;void main(){vec4 A=texture(u_texture,v_uv);fragColor=vec4(1.-A.rgb,A.a);}`, {}), this.$l("grayscale", `#version 300 es
precision highp float;uniform sampler2D u_texture;uniform float Um;in vec2 v_uv;out vec4 fragColor;void main(){vec4 A=texture(u_texture,v_uv);float B=dot(A.rgb,vec3(0.299,0.587,0.114));vec3 C=mix(A.rgb,vec3(B),Um);fragColor=vec4(C,A.a);}`, { Um: ["amount", 1] }), this.$l("sepia", `#version 300 es
precision highp float;uniform sampler2D u_texture;uniform float Um;in vec2 v_uv;out vec4 fragColor;void main(){vec4 A=texture(u_texture,v_uv);vec3 B;B.r=dot(A.rgb,vec3(0.393,0.769,0.189));B.g=dot(A.rgb,vec3(0.349,0.686,0.168));B.b=dot(A.rgb,vec3(0.272,0.534,0.131));vec3 C=mix(A.rgb,B,Um);fragColor=vec4(C,A.a);}`, { Um: ["amount", 1] }), this.$l("threshold", `#version 300 es
precision highp float;uniform sampler2D u_texture;uniform float Un;in vec2 v_uv;out vec4 fragColor;void main(){vec4 A=texture(u_texture,v_uv);float B=dot(A.rgb,vec3(0.299,0.587,0.114));float C=step(Un,B);fragColor=vec4(vec3(C),A.a);}`, { Un: ["threshold", 0.5] });
  }
}
class Wt {
  constructor(t) {
    a(this, "Z");
    a(this, "Ml", /* @__PURE__ */ new Map());
    a(this, "J");
    a(this, "bc");
    a(this, "Ar", !1);
    a(this, "Tl");
    this.Z = t, this.Tl = new Ht(this.Z), this.J = t.pe(Q, _t);
  }
  async register(t, e, i = {}) {
    await this.Tl.$l(t, e, i);
  }
  unregister(t) {
    return this.Tl.Pl(t) ?? !1;
  }
  has(t) {
    return this.Tl.Pn(t) !== void 0;
  }
  wr(t, e) {
    this.Ar || (this.bc = [this.Z.Pe(t, e, 1, { depth: !1 }), this.Z.Pe(t, e, 1, { depth: !1 })], this.Ar = !0);
  }
  El(t, e, i, s, r) {
    this.bc[0].width === s && this.bc[0].height === r || (this.bc[0].resize(s, r), this.bc[1].resize(s, r)), this.Rc(t, e, i, s, r, this.bc);
  }
  Rc(t, e, i, s, r, h) {
    if (i.length === 0) return void this.Rl(t, e, s, r);
    const o = this.Z.context, c = o.isEnabled(o.BLEND);
    o.disable(o.BLEND), this.Rl(t, h[0], s, r);
    let l = 0;
    for (let u = 0; u < i.length; u++) {
      const f = i[u], d = u === i.length - 1, g = l === 0 ? 1 : 0, p = d ? e : h[g];
      this.Sl(f, h[l], p, s, r), d || (l = g);
    }
    c && o.enable(o.BLEND);
  }
  Sl(t, e, i, s, r) {
    const h = this.Tl.Pn(t.name);
    if (!h) return console.warn(`[textmode.js] Unknown filter: "${t.name}". Skipping.`), void this.Rl(e.textures[0], i, s, r);
    const o = this.zl(t.name, h, s, r), c = { renderer: this.Z, gl: this.Z.context, width: s, height: r };
    i.begin(), this.Z.ve(o), o.O({ u_texture: e.textures[0] });
    const l = h.createUniforms(t.params, c);
    o.O(l), this.Z.we(0, 0, s, r), i.end();
  }
  zl(t, e, i, s) {
    let r = this.Ml.get(t);
    if (!r && e) {
      const h = { renderer: this.Z, gl: this.Z.context, width: i, height: s };
      r = e.createShader(h), this.Ml.set(t, r);
    }
    return r;
  }
  Rl(t, e, i, s) {
    e.begin(), this.Z.ve(this.J), this.J.O({ u_texture: t, u_resolution: [i, s] }), this.Z.we(0, 0, i, s), e.end();
  }
  Jr(t, e) {
    this.bc && (this.bc[0].resize(t, e), this.bc[1].resize(t, e));
  }
  gt() {
    for (const t of this.Ml.values()) t.dispose();
    this.Ml.clear(), this.J.dispose(), this.Tl.gt(), this.bc && (this.bc[0].gt(), this.bc[1].gt()), this.Ar = !1;
  }
}
const Ke = Object.freeze(Object.defineProperty({ __proto__: null, FilterRegistry: Ht, TextmodeFilterManager: Wt }, Symbol.toStringTag, { value: "Module" }));
let lt = null;
const qe = { id: "brightness", createShader: ({ gl: n }) => (lt || (lt = new q(n, st, `#version 300 es
precision highp float;in vec2 v_uv;uniform sampler2D u_image;uniform bool u_invert;uniform bool u_flipX;uniform bool u_flipY;uniform float u_charRotation;uniform bool u_charColorFixed;uniform vec4 u_charColor;uniform bool u_cellColorFixed;uniform vec4 u_cellColor;uniform vec4 u_backgroundColor;uniform int u_charCount;uniform vec3 u_charList[255];layout(location=0)out vec4 o_character;layout(location=1)out vec4 o_primaryColor;layout(location=2)out vec4 o_secondaryColor;layout(location=3)out vec4 A;float B(vec3 C){return dot(C,vec3(0.299f,0.587f,0.114f));}void main(){vec2 D=vec2(v_uv.x,1.0f-v_uv.y);vec4 E=texture(u_image,D);float F=B(E.rgb);vec2 G=vec2(0.);if(u_charCount>0){float H=float(u_charCount);float I=clamp(F*(H-1.0f),0.0f,H-1.0f);int J=int(floor(I+0.5f));vec3 K=u_charList[J];G=K.xy;}else{G=vec2(0.0f,0.0f);}vec4 L=u_charColorFixed?u_charColor:E;vec4 M=u_cellColorFixed?u_cellColor:E;if(E.a<0.01f){discard;}o_primaryColor=vec4(L.rgb,L.a);o_secondaryColor=vec4(M.rgb,M.a);A=vec4(0.);int N=int(u_invert?1:0);int O=int(u_flipX?1:0);int P=int(u_flipY?1:0);float Q=float(N|(O<<1)|(P<<2))/255.;o_character=vec4(G,Q,clamp(u_charRotation,0.0f,1.0f));}`)), lt), createUniforms: ({ source: n }) => n.createBaseConversionUniforms() };
class qt {
  constructor() {
    a(this, "kl", /* @__PURE__ */ new Map());
    a(this, "Ml", /* @__PURE__ */ new Map());
    this.Dl();
  }
  $l(t) {
    this.kl.set(t.id, t);
  }
  Pl(t) {
    const e = this.Ml.get(t);
    return e && (e.dispose(), this.Ml.delete(t)), this.kl.delete(t);
  }
  Pn(t) {
    return this.kl.get(t);
  }
  Ll(t) {
    return this.kl.has(t);
  }
  gt() {
    for (const t of this.Ml.values()) t.dispose();
    this.Ml.clear(), this.kl.clear();
  }
  Dl() {
    this.$l(qe);
  }
}
class jt {
  constructor() {
    a(this, "Ol");
    this.Ol = new qt();
  }
  register(t) {
    this.Ol.$l(t);
  }
  unregister(t) {
    return this.Ol.Pl(t);
  }
  has(t) {
    return this.Ol.Ll(t);
  }
  Pn(t) {
    return this.Ol.Pn(t);
  }
  gt() {
    this.Ol.gt();
  }
}
const Ve = Object.freeze(Object.defineProperty({ __proto__: null, ConversionRegistry: qt, TextmodeConversionManager: jt }, Symbol.toStringTag, { value: "Module" }));
class je extends function(e, ...i) {
  return i.reduce((s, r) => r(s), e);
}(class {
}, Xe, Ze, ze, ke, Ye) {
  constructor(e = {}) {
    super();
    a(this, "Z");
    a(this, "kr");
    a(this, "ha");
    a(this, "Zo");
    a(this, "ca");
    a(this, "la");
    a(this, "Il");
    a(this, "qc");
    a(this, "Vc");
    a(this, "oa");
    a(this, "dn");
    a(this, "Ec");
    a(this, "Xc");
    a(this, "gn");
    a(this, "Bl", []);
    a(this, "Hl");
    a(this, "Gl");
    a(this, "Ql");
    a(this, "Nl", !1);
    a(this, "Xl", !1);
    a(this, "Yl", !1);
    a(this, "jl", !1);
    a(this, "Kl", () => {
    });
    a(this, "Cc", () => {
    });
    a(this, "Wl", () => {
    });
    a(this, "Zl");
    a(this, "ql");
    a(this, "Xr", !1);
    a(this, "Vl");
    a(this, "Jl");
    this.Ql = new Ge(this), this.Xr = e.overlay ?? !1, this.kr = new _e(e), this.Z = new Ae(this.kr.tn()), this.ha = new Ut(e.frameRate ?? 60), this.Il = new kt(this, e.loadingScreen, this.kr.Vr()), this.Il.Wc(() => {
      this.ha.Kn = 0, this.jl = !0;
    }), this.qc = this.Z.pe(Q, `#version 300 es
precision highp float;uniform sampler2D u_characterTexture;uniform vec2 u_charsetDimensions;uniform sampler2D Uh;uniform sampler2D Ui;uniform sampler2D Ug;uniform vec2 Uj;uniform vec2 Uk;uniform vec4 Ul;in vec2 v_uv;out vec4 fragColor;mat2 A(float B){float C=sin(B);float D=cos(B);return mat2(D,-C,C,D);}void main(){vec2 E=gl_FragCoord.xy/Uk;vec2 F=E*Uj;vec2 G=floor(F);vec2 H=(G+0.5)/Uj;vec4 I=texture(Uh,H);vec4 J=texture(Ui,H);vec4 K=texture(Ug,H);int L=int(K.b*255.+0.5);bool M=(L&1)!=0;bool N=(L&2)!=0;bool O=(L&4)!=0;int P=int(K.r*255.+0.5)+int(K.g*255.+0.5)*256;int Q=int(u_charsetDimensions.x);int R=P/Q;int S=P-(R*Q);float T=(u_charsetDimensions.y-1.)-float(R);vec2 U=1./u_charsetDimensions;vec2 V=vec2(float(S),T)*U;vec2 W=V+U;float X=-K.a*360.*0.017453292;vec2 Y=fract(F)-0.5f;vec2 Z=vec2(N?-1.:1.,O?-1.:1.);Y*=Z;Y=A(X)*Y+0.5;vec2 a=V+clamp(Y,0.,1.)*U;const float b=0.0001;if(any(lessThan(a,V-b))||any(greaterThan(a,W+b))){fragColor=M?I:J;return;}vec4 c=texture(u_characterTexture,a);if(M)c.rgb=mix(c.rgb,1.-c.rgb,float(M));vec4 d=mix(Ul,J,J.a);fragColor=mix(d,I,c);}`), this.Vc = this.Z.pe(Q, _t), this.oa = new Gt(this, e);
    const i = () => this.tu();
    this.Zo = new Lt(this.kr, i), this.ca = new Nt(this.kr, i, this.Zo), this.la = new Bt(), this.Xc = new Wt(this.Z), this.gn = new jt(), this.Il.Bn(), this.su(e);
  }
  async su(e) {
    await this.oa.wr(), await this.Il.wr();
    const i = this.oa.base.grid;
    this.oa.bl(() => {
      this.Zo.Fo(), this.ca.Fo();
    }), this.Hl = this.Z.Pe(this.kr.width, this.kr.height, 1), this.Gl = this.Z.Pe(this.kr.width, this.kr.height, 1), this.Xc.wr(this.kr.width, this.kr.height), this.Xr && (this.Vl = z.Tn(this.Z, this.gn, this.kr.targetCanvas, i.cols, i.rows)), this.iu(), this.ha.Bn(() => this.aa()), await this.Ql.ga(e.plugins ?? []);
    try {
      await this.Kl(), this.Il.Wa();
    } catch (s) {
      console.error("Error during setup:", s), this.Il.error(s);
    }
  }
  iu() {
    this.Zl = () => {
      this.Xr && this.resizeCanvas(this.kr.targetCanvas.width, this.kr.targetCanvas.height), this.Wl();
    }, window.addEventListener("resize", this.Zl), this.Zo._o(), this.ca._o(), this.la._o(), window.addEventListener("blur", () => {
      this.la.Wo();
    }), this.Xr && (this.ql = new ResizeObserver(() => {
      this.resizeCanvas(this.kr.targetCanvas.width, this.kr.targetCanvas.height);
    }), this.ql.observe(this.kr.targetCanvas));
  }
  aa() {
    if (!this.Il.Xa && this.jl) {
      this.Xl = !0;
      try {
        this.ha.Xn(), this.ha.Wn(), this.Xr && Tt(this.Z.context, this.Vl.texture, this.kr.targetCanvas), this.Ql.wa(), this.Z.state.qt(), this.oa._l(this.Hl, () => this.Cc());
        let e = this.Hl.textures[0];
        this.Bl.length > 0 && (this.Xc.El(this.Hl.textures[0], this.Gl, this.Bl, this.kr.width, this.kr.height), e = this.Gl.textures[0], this.Bl = []), this.Z.wi(0, 0, 0, 0), this.Z.ve(this.Vc), this.Vc.O({ u_texture: e }), this.Z.we(0, 0, this.kr.width, this.kr.height), this.Ql.Ca();
      } finally {
        this.Xl = !1, this.Nl && !this.Yl && this.eu();
      }
    }
  }
  resizeCanvas(e, i) {
    var s, r, h, o;
    this.kr.Jr(e, i), this.Il.Jc(this.kr.Vr()), this.Il.Jr(), (s = this.Hl) == null || s.resize(this.kr.width, this.kr.height), (r = this.Gl) == null || r.resize(this.kr.width, this.kr.height), (h = this.Xc) == null || h.Jr(this.kr.width, this.kr.height), (o = this.oa) == null || o.Jr(), this.Z.Re(), this.aa();
  }
  destroy() {
    this.Yl || this.Nl || (this.Nl = !0, this.ha.Gn(), this.Xl || this.eu());
  }
  eu() {
    var e, i, s, r, h, o, c;
    this.Nl = !1, this.Il.gt(), this.Ql.xa(), window.removeEventListener("resize", this.Zl), (e = this.ql) == null || e.disconnect(), this.Zo.Mo(), this.ca.Mo(), this.la.Mo(), this.qc.dispose(), (i = this.oa) == null || i.gt(), (s = this.Xc) == null || s.gt(), (r = this.gn) == null || r.gt(), (h = this.Hl) == null || h.gt(), (o = this.Gl) == null || o.gt(), this.Z.gt(), this.Vc.dispose(), (c = this.Vl) == null || c.gt(), this.kr.gt(), this.Yl = !0;
  }
  filter(e, i) {
    this.Bl.push({ name: e, params: i });
  }
  async loadFont(e) {
    return await this.oa.base.loadFont(e), this.oa.base.font;
  }
  fontSize(e) {
    vt.m(typeof e == "number" && e > 0, "Font size must be a positive number greater than 0.", { method: "fontSize", providedValue: e }) && this.oa.base.font.fontSize !== e && this.oa.base.font.Mr(e);
  }
  inputGrid(e) {
    return e === void 0 ? this.Jl ?? "topmost" : e === "topmost" ? (this.Jl = void 0, this.Zo.Fo(), void this.ca.Fo()) : (this.Jl = e, this.Zo.Fo(), void this.ca.Fo());
  }
  tu() {
    return this.Jl ? this.Jl : this.oa.wl();
  }
  async setup(e) {
    this.Kl = e;
  }
  draw(e) {
    this.Cc = e;
  }
  windowResized(e) {
    this.Wl = e;
  }
  get grid() {
    return this.Ec ?? this.oa.base.grid;
  }
  get font() {
    return this.dn ?? this.oa.base.font;
  }
  get width() {
    return this.kr.width;
  }
  get height() {
    return this.kr.height;
  }
  get canvas() {
    return this.kr.canvas;
  }
  get isDisposed() {
    return this.Yl;
  }
  get overlay() {
    return this.Vl;
  }
  get loading() {
    return this.Il;
  }
  get layers() {
    return this.oa;
  }
  get filters() {
    return this.Xc;
  }
  get conversions() {
    return this.gn;
  }
}
class mt {
  constructor() {
  }
  static create(t = {}) {
    return new je(t);
  }
  static setErrorLevel(t) {
    vt._(t);
  }
  static get version() {
    return "0.8.0";
  }
}
const Je = Object.freeze(Object.defineProperty({ __proto__: null, LoadingPhase: zt, LoadingPhaseTracker: Dt, LoadingScreenManager: kt, LoadingScreenStateMachine: Ot, LoadingScreenTransition: It, resolveColorInputs: Zt, resolveDefaultPalette: Xt, resolveTheme: gt }, Symbol.toStringTag, { value: "Module" })), $e = Object.freeze(Object.defineProperty({ __proto__: null, TextmodeFont: et, TextmodeImage: z, TextmodeVideo: nt }, Symbol.toStringTag, { value: "Module" })), ti = Object.freeze(Object.defineProperty({ __proto__: null, keyboard: Oe, mouse: De, touch: Ie }, Symbol.toStringTag, { value: "Module" })), ei = Object.freeze(Object.defineProperty({ __proto__: null, LayerCompositor: Yt, TextmodeLayer: it, TextmodeLayerManager: Gt }, Symbol.toStringTag, { value: "Module" })), ii = mt.create, si = mt.setErrorLevel, ri = mt.version;
export {
  _e as TextmodeCanvas,
  S as TextmodeColor,
  $t as TextmodeErrorLevel,
  Z as TextmodeFramebuffer,
  Le as TextmodeGrid,
  je as Textmodifier,
  Ve as conversion,
  ii as create,
  Ke as filters,
  ti as input,
  ei as layering,
  $e as loadables,
  Je as loading,
  si as setErrorLevel,
  mt as textmode,
  ri as version
};
