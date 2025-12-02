var Qt = Object.defineProperty;
var Kt = (n, t, e) => t in n ? Qt(n, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : n[t] = e;
var a = (n, t, e) => Kt(n, typeof t != "symbol" ? t + "" : t, e);
class U extends Error {
  constructor(t, e = {}) {
    super(U.i(t, e)), this.name = "TextmodeError";
  }
  static i(t, e) {
    return `${t}${e && Object.keys(e).length > 0 ? `

📋 Context:` + Object.entries(e).map(([i, s]) => `
  - ${i}: ${U.h(s)}`).join("") : ""}

${"↓".repeat(24)}
`;
  }
  static h(t) {
    if (t === null) return "null";
    if (t === void 0) return "undefined";
    if (typeof t == "string") return `"${t}"`;
    if (typeof t == "number" || typeof t == "boolean") return t + "";
    if (Array.isArray(t)) return t.length === 0 ? "[]" : t.length <= 5 ? `[${t.map((e) => U.h(e)).join(", ")}]` : `[${t.slice(0, 3).map((e) => U.h(e)).join(", ")}, ... +${t.length - 3} more]`;
    if (typeof t == "object") {
      const e = Object.keys(t);
      return e.length === 0 ? "{}" : e.length <= 3 ? `{ ${e.map((i) => `${i}: ${U.h(t[i])}`).join(", ")} }` : `{ ${e.slice(0, 2).map((i) => `${i}: ${U.h(t[i])}`).join(", ")}, ... +${e.length - 2} more }`;
    }
    return t + "";
  }
}
var qt = ((n) => (n[n.SILENT = 0] = "SILENT", n[n.WARNING = 1] = "WARNING", n[n.ERROR = 2] = "ERROR", n[n.THROW = 3] = "THROW", n))(qt || {});
const B = class B {
  constructor() {
    a(this, "l", { globalLevel: 3 });
  }
  static u() {
    return B.o || (B.o = new B()), B.o;
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
a(B, "o", null);
let lt = B;
const mt = lt.u();
class W {
  constructor(t, e, i) {
    a(this, "A");
    a(this, "C");
    a(this, "M", /* @__PURE__ */ new Map());
    a(this, "F", /* @__PURE__ */ new Map());
    a(this, "P", 0);
    a(this, "$", /* @__PURE__ */ new Map());
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
    this.P = 0, this.$.clear();
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
    if (e instanceof H) {
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
    const e = this.$.get(t);
    if (e !== void 0) return e;
    if (this.P >= this.U) throw Error(`[textmode.js] Shader attempted to bind more than ${this.U} texture samplers. Uniform "${t}" cannot be assigned.`);
    const i = this.P++;
    return this.$.set(t, i), i;
  }
  get G() {
    return this.C;
  }
  dispose() {
    this.A.deleteProgram(this.C);
  }
}
function Et(n, t, e, i) {
  return 180 * Math.atan2(i - t, e - n) / Math.PI;
}
function z(n, t, e, i) {
  return Math.hypot(e - n, i - t);
}
function O(n, t, e) {
  return Math.min(Math.max(n, t), e);
}
function Tt(n) {
  return (n % 360 + 360) % 360 / 360;
}
function Ct(n, t, e) {
  n.bindTexture(n.TEXTURE_2D, t), n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL, 1), n.texImage2D(n.TEXTURE_2D, 0, n.RGBA, n.RGBA, n.UNSIGNED_BYTE, e), n.bindTexture(n.TEXTURE_2D, null);
}
function et(n, t, e, i, s) {
  n.texParameteri(n.TEXTURE_2D, n.TEXTURE_MIN_FILTER, t), n.texParameteri(n.TEXTURE_2D, n.TEXTURE_MAG_FILTER, e), n.texParameteri(n.TEXTURE_2D, n.TEXTURE_WRAP_S, i), n.texParameteri(n.TEXTURE_2D, n.TEXTURE_WRAP_T, s);
}
function ut(n, t, e, i, s, r = 0, h = WebGL2RenderingContext.FLOAT, o = !1) {
  n.enableVertexAttribArray(t), n.vertexAttribPointer(t, e, h, o, i, s), n.vertexAttribDivisor(t, r);
}
function Rt(n, t, e, i, s) {
  n.bindBuffer(t, e), n.bufferData(t, i, s), n.bindBuffer(t, null);
}
const it = `#version 300 es
in vec2 A0;in vec2 A1;in vec2 A2;in vec2 A3;in vec3 A4;in vec4 A5;in vec4 A6;in vec4 A7;in vec3 A8;in vec3 A9;in vec4 Aa;in vec4 Ab;in vec3 Ac;uniform vec2 U9;uniform float Ua;uniform float Ub;out vec2 v_uv;out vec3 v_glyphIndex;out vec4 v_glyphColor;out vec4 v_cellColor;out vec4 v_glyphFlags;out vec3 v_worldPosition;out vec3 v_normal;out float v_geometryType;const float A=6.28318530718f;const int B=2;const int C=3;const int D=4;vec2 E(float F,vec2 G,vec2 H,vec2 I,vec2 J){float K=1.0f-F;float L=K*K;float M=L*K;float N=F*F;float O=N*F;return M*G+3.0f*L*F*H+3.0f*K*N*I+O*J;}vec2 P(float F,vec2 G,vec2 H,vec2 I,vec2 J){float K=1.0f-F;float L=K*K;float N=F*F;return-3.0f*L*G+3.0f*(L-2.0f*K*F)*H+3.0f*(2.0f*K*F-N)*I+3.0f*N*J;}vec3 Q(vec3 R,float S){float T=cos(S);float U=sin(S);return vec3(R.x,R.y*T-R.z*U,R.y*U+R.z*T);}vec3 V(vec3 R,float S){float T=cos(S);float U=sin(S);return vec3(R.x*T+R.z*U,R.y,-R.x*U+R.z*T);}vec3 W(vec3 R,float S){float T=cos(S);float U=sin(S);return vec3(R.x*T-R.y*U,R.x*U+R.y*T,R.z);}vec3 X(vec3 R,vec3 Y){vec3 Z=R;if(Y.z!=0.0f){Z=W(Z,Y.z);}if(Y.y!=0.0f){Z=V(Z,Y.y);}if(Y.x!=0.0f){Z=Q(Z,Y.x);}return Z;}void main(){v_uv=A1;v_glyphIndex=A4;v_glyphColor=A5;v_cellColor=A6;v_glyphFlags=A7;vec4 a=Aa;vec4 b=Ab;vec2 c=A3;vec2 d=A2;float e=Ac.x;float f=Ac.y;int g=int(Ac.z);vec2 h=d;vec2 i=h+c*0.5f;float j=f+e*0.5f;vec3 k=vec3(i,j);vec3 l;if(g==D){float F=clamp(A0.x,0.0f,1.0f);vec2 G=b.xy;vec2 H=a.xy;vec2 I=a.zw;vec2 J=b.zw;vec2 m=E(F,G,H,I,J);vec2 n=P(F,G,H,I,J);float o=length(n);vec2 p=o>0.0f?n/o:vec2(1.0f,0.0f);vec2 q=vec2(-p.y,p.x);vec2 r=m;vec2 s=r+q*A0.y*c.y;l=vec3(s,f);}else if(g==C){float t=mod(a.x,A);if(t<0.0f){t+=A;}float u=mod(a.y,A);if(u<0.0f){u+=A;}float v=t-u;if(v<=0.0f){v+=A;}float S=t-A0.x*v;vec2 w=vec2(cos(S),sin(S))*A0.y;vec2 s=w*c+h;l=vec3(s,f);}else if(g==B){vec2 s=A0.xy*c+h;l=vec3(s,f);}vec3 x=X(l,A9);vec3 y=x+A8;vec3 z=vec3(0.0f,0.0f,1.0f);v_worldPosition=y;v_normal=z;v_geometryType=float(g);vec2 AA=(y.xy/U9)*2.0f;AA.y=-AA.y;float AB=y.z/U9.y;float AC=clamp(-AB*Ua,-0.99f,0.99f);if(Ub>0.5f){gl_Position=vec4(AA,AC,1.0f);}else{float AD=0.5f;float AE=1.0f/(1.0f-AB*AD);AA*=AE;gl_Position=vec4(AA,AC,1.0f);}}`, X = class X {
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
    this.N = e, this.X = i, this.A = t, this.W = O(s, 1, 8), this.Z = h, this.l = { filter: "nearest", wrap: "clamp", format: "rgba", type: "unsigned_byte", depth: !0, ...r }, X.J || (X.J = new W(t, it, `#version 300 es
precision highp float;in vec2 v_uv;uniform sampler2D Uc;uniform sampler2D Ud;uniform sampler2D Ue;uniform sampler2D Uf;uniform vec2 Ug;uniform bool Uh;uniform bool Ui;uniform bool Uj;layout(location=0)out vec4 o_character;layout(location=1)out vec4 o_primaryColor;layout(location=2)out vec4 o_secondaryColor;layout(location=3)out vec4 A;void main(){vec2 B=vec2(v_uv.x,1.-v_uv.y);vec2 C=B*Ug;vec2 D=(floor(C)+0.5f)/Ug;vec4 E=texture(Uc,D);vec4 F=Uh?texture(Ud,D):vec4(0.);if(Uh&&F.a==0.){discard;}vec4 G=Ui?texture(Ue,D):vec4(0.);vec4 H=Uj?texture(Uf,D):vec4(0.);o_character=E;o_primaryColor=F;o_secondaryColor=G;A=H;}`));
    const o = t.getParameter(t.MAX_DRAW_BUFFERS), c = t.getParameter(t.MAX_COLOR_ATTACHMENTS);
    this.W = Math.min(this.W, o, c), this.Y = t.createFramebuffer(), this.tt(), this.st(), this.l.depth && this.it();
  }
  tt() {
    const t = this.A, e = this.l.filter === "linear" ? t.LINEAR : t.NEAREST, i = this.l.wrap === "repeat" ? t.REPEAT : t.CLAMP_TO_EDGE, s = this.l.type === "float" ? t.FLOAT : t.UNSIGNED_BYTE, r = s === t.FLOAT ? t.RGBA32F : t.RGBA8, h = t.RGBA;
    for (let o = 0; o < this.W; o++) {
      const c = t.createTexture();
      t.bindTexture(t.TEXTURE_2D, c), et(t, e, e, i, i), t.texImage2D(t.TEXTURE_2D, 0, r, this.N, this.X, 0, h, s, null), this.j.push(c);
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
    Ct(this.A, this.j[0], t);
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
      const f = (r - 1 - u) * c, g = u * c;
      l.set(h.subarray(f, f + c), g);
    }
    return this.V.set(t, l), l;
  }
  begin() {
    const t = this.A;
    this.V.clear(), this.Z.rt(), this.Z.nt(this.Y, this.N, this.X, this.W), this.l.depth && t.clear(t.DEPTH_BUFFER_BIT), this.Z.state.ht();
  }
  end() {
    this.Z.state.ot(), this.Z.ct(), this.Z.lt();
  }
  ut() {
    return this.q || this.ft(), this.q;
  }
  ft() {
    if (!this.Z) return;
    const t = this.W > 1, e = this.W > 2, i = this.W > 3, s = { Uc: this.j[0], Ud: t ? this.j[1] : this.j[0], Ue: e ? this.j[2] : this.j[0], Uf: i ? this.j[3] : this.j[0], Ug: [this.N, this.X], Uh: t, Ui: e, Uj: i }, r = X.J;
    this.q = this.Z.vt.dt(r, s, !0);
  }
  gt() {
    const t = this.A;
    t.deleteFramebuffer(this.Y);
    for (const e of this.j) t.deleteTexture(e);
    this.K && t.deleteRenderbuffer(this.K);
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
let H = X;
const Ft = /* @__PURE__ */ new WeakMap();
function nt(n, t) {
  Ft.set(n, t);
}
function Pt(n) {
  return Ft.get(n);
}
function tt(n, t, e, i, s = 255) {
  n[0] = t / 255, n[1] = (e ?? t) / 255, n[2] = (i ?? t) / 255, n[3] = s / 255;
}
class st {
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
    a(this, "Pt", [0, 0, 0, 1]);
    a(this, "$t", !1);
    a(this, "Tt", !1);
    a(this, "Rt", !1);
    a(this, "Et", 0);
    a(this, "St", [0, 0, 0, 1]);
    a(this, "kt", !1);
    a(this, "zt", []);
    a(this, "Dt", []);
  }
  static Lt() {
    return { Ot: 1, It: 0, Bt: 0, Ht: 0, bt: 0, Ct: 0, xt: 0, Et: 0, Gt: !1, Qt: !1, Rt: !1, kt: !1, Nt: [0, 0, 0], Xt: [1, 1, 1, 1], Yt: [0, 0, 0, 1] };
  }
  jt(t) {
    t.Ot = this._t, t.It = this.yt, t.Bt = this.At, t.Ht = this.wt, t.bt = this.bt, t.Ct = this.Ct, t.xt = this.xt, t.Gt = this.$t, t.Qt = this.Tt, t.Rt = this.Rt, t.Et = this.Et, t.kt = this.kt, t.Nt[0] = this.Mt[0], t.Nt[1] = this.Mt[1], t.Nt[2] = this.Mt[2], t.Xt[0] = this.Ft[0], t.Xt[1] = this.Ft[1], t.Xt[2] = this.Ft[2], t.Xt[3] = this.Ft[3], t.Yt[0] = this.Pt[0], t.Yt[1] = this.Pt[1], t.Yt[2] = this.Pt[2], t.Yt[3] = this.Pt[3];
  }
  Kt(t) {
    this._t = t.Ot, this.yt = t.It, this.At = t.Bt, this.wt = t.Ht, this.bt = t.bt, this.Ct = t.Ct, this.xt = t.xt, this.$t = t.Gt, this.Tt = t.Qt, this.Rt = t.Rt, this.Et = t.Et, this.kt = t.kt, this.Mt[0] = t.Nt[0], this.Mt[1] = t.Nt[1], this.Mt[2] = t.Nt[2], this.Ft[0] = t.Xt[0], this.Ft[1] = t.Xt[1], this.Ft[2] = t.Xt[2], this.Ft[3] = t.Xt[3], this.Pt[0] = t.Yt[0], this.Pt[1] = t.Yt[1], this.Pt[2] = t.Yt[2], this.Pt[3] = t.Yt[3];
  }
  ht() {
    let t = this.Dt.pop();
    t || (t = st.Lt()), this.jt(t), this.zt.push(t);
  }
  ot() {
    const t = this.zt.pop();
    t ? (this.Kt(t), this.Dt.push(t)) : console.warn("pop() called without matching push()");
  }
  Wt(t) {
    this.jt(t);
  }
  Zt(t) {
    this._t = Math.abs(t);
  }
  qt() {
    this.yt = 0, this.At = 0, this.wt = 0, this.bt = 0, this.Ct = 0, this.xt = 0, this.kt = !1;
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
    tt(this.Pt, t, e, i, s);
  }
  us(t) {
    this.$t = t;
  }
  fs(t) {
    this.Tt = t;
  }
  ds(t) {
    this.Rt = t;
  }
  vs(t) {
    this.Et = Tt(t);
  }
  ps(t, e, i, s) {
    tt(this.St, t, e, i, s);
  }
  gs(t) {
    this.kt = t;
  }
  get canvasBackgroundColor() {
    return this.St;
  }
  get useOrtho() {
    return this.kt;
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
const ft = new Float32Array([-0.5, -0.5, 0, 0, 0.5, -0.5, 1, 0, -0.5, 0.5, 0, 1, -0.5, 0.5, 0, 1, 0.5, -0.5, 1, 0, 0.5, 0.5, 1, 1]), Y = { _s: 16, As: WebGL2RenderingContext.TRIANGLES, ws: { bs: { size: 2, offset: 0 }, Cs: { size: 2, offset: 8 } } };
class Jt {
  constructor(t) {
    a(this, "A");
    a(this, "Ms");
    a(this, "Fs");
    this.A = t, this.Ms = t.createBuffer(), this.Fs = new Float32Array(ft.length);
  }
  Ps(t, e, i, s) {
    const r = this.A, h = Pt(this.A), o = h[2], c = h[3], l = t / o * 2 - 1, u = (t + i) / o * 2 - 1, f = 1 - (e + s) / c * 2, g = 1 - e / c * 2, m = ft, d = this.Fs;
    for (let v = 0; v < m.length; v += 4) {
      const A = m[v], p = m[v + 1], y = m[v + 2], E = m[v + 3], x = l + (A + 0.5) * (u - l), w = f + (p + 0.5) * (g - f);
      d[v] = x, d[v + 1] = w, d[v + 2] = y, d[v + 3] = E;
    }
    r.bindBuffer(r.ARRAY_BUFFER, this.Ms), r.bufferData(r.ARRAY_BUFFER, d, r.DYNAMIC_DRAW), r.enableVertexAttribArray(0), r.vertexAttribPointer(0, 2, r.FLOAT, !1, 16, 0), r.enableVertexAttribArray(1), r.vertexAttribPointer(1, 2, r.FLOAT, !1, 16, 8), r.drawArrays(r.TRIANGLES, 0, 6), r.disableVertexAttribArray(1), r.disableVertexAttribArray(0), r.bindBuffer(r.ARRAY_BUFFER, null);
  }
  gt() {
    this.A.deleteBuffer(this.Ms);
  }
}
var b = ((n) => (n.RECTANGLE = "rectangle", n.LINE = "line", n.ELLIPSE = "ellipse", n.ARC = "arc", n.TRIANGLE = "triangle", n.BEZIER_CURVE = "bezier_curve", n))(b || {});
const $t = { rectangle: 2, line: 2, ellipse: 2, triangle: 2, arc: 3, bezier_curve: 4 };
class te {
  constructor(t) {
    a(this, "A");
    a(this, "$s", /* @__PURE__ */ new Map());
    this.A = t;
  }
  Ts(t, e, i, s) {
    const r = this.A;
    let h = this.$s.get(t);
    h || (h = /* @__PURE__ */ new Map(), this.$s.set(t, h));
    let o = h.get(e) || null;
    if (!o) {
      o = r.createVertexArray(), h.set(e, o), r.bindVertexArray(o), r.bindBuffer(r.ARRAY_BUFFER, s);
      const c = r.getAttribLocation(t, "A0");
      c !== -1 && ut(r, c, i.ws.bs.size, i._s, i.ws.bs.offset, 0, r.FLOAT, !1);
      const l = r.getAttribLocation(t, "A1");
      l !== -1 && ut(r, l, i.ws.Cs.size, i._s, i.ws.Cs.offset, 0, r.FLOAT, !1);
    }
    r.bindVertexArray(o);
  }
  Rs() {
    this.A.bindVertexArray(null);
  }
  gt() {
    for (const [, t] of this.$s) for (const [, e] of t) e && this.A.deleteVertexArray(e);
  }
}
const Z = class Z {
  static Es(t, e, i = 0) {
    const s = e || new Float32Array(Z.FLOATS_PER_INSTANCE);
    let r = i;
    s[r++] = t.bs[0], s[r++] = t.bs[1], s[r++] = t.Ss[0], s[r++] = t.Ss[1], s[r++] = t.Nt[0], s[r++] = t.Nt[1], s[r++] = t.Nt[2], s[r++] = t.Xt[0], s[r++] = t.Xt[1], s[r++] = t.Xt[2], s[r++] = t.Xt[3], s[r++] = t.Yt[0], s[r++] = t.Yt[1], s[r++] = t.Yt[2], s[r++] = t.Yt[3], s[r++] = t.ks[0], s[r++] = t.ks[1], s[r++] = t.ks[2], s[r++] = t.Et;
    const h = t.zs;
    s[r++] = (h == null ? void 0 : h[0]) ?? 0, s[r++] = (h == null ? void 0 : h[1]) ?? 0, s[r++] = (h == null ? void 0 : h[2]) ?? 0;
    const o = t.Ds;
    s[r++] = (o == null ? void 0 : o[0]) ?? 0, s[r++] = (o == null ? void 0 : o[1]) ?? 0, s[r++] = (o == null ? void 0 : o[2]) ?? 0;
    const c = t.Ls, l = t.Os, u = t.Is, f = t.Bs, g = t.Hs, m = !(!l || !u);
    return m ? (s[r++] = (f == null ? void 0 : f[0]) ?? 0, s[r++] = (f == null ? void 0 : f[1]) ?? 0, s[r++] = (g == null ? void 0 : g[0]) ?? 0, s[r++] = (g == null ? void 0 : g[1]) ?? 0, s[r++] = l[0], s[r++] = l[1], s[r++] = u[0], s[r++] = u[1]) : !m && !!c ? (s[r++] = c[0], s[r++] = c[1], s[r++] = 0, s[r++] = 0, s[r++] = 0, s[r++] = 0, s[r++] = 0, s[r++] = 0) : (s[r++] = 0, s[r++] = 0, s[r++] = 0, s[r++] = 0, s[r++] = 0, s[r++] = 0, s[r++] = 0, s[r++] = 0), s[r++] = t.Gs ?? 0, s[r++] = t.Qs ?? 0, s[r++] = t.Ns ?? 0, s;
  }
  static Xs(t, e) {
    const i = t.length * Z.FLOATS_PER_INSTANCE, s = e || new Float32Array(i);
    for (let r = 0; r < t.length; r++) {
      const h = r * Z.FLOATS_PER_INSTANCE;
      Z.Es(t[r], s, h);
    }
    return s;
  }
};
a(Z, "BYTES_PER_INSTANCE", 144), a(Z, "FLOATS_PER_INSTANCE", 36);
let L = Z;
const P = class P {
};
a(P, "STRIDE", L.BYTES_PER_INSTANCE), a(P, "ATTRIBUTES", { A2: { location: -1, size: 2, type: WebGL2RenderingContext.FLOAT, normalized: !1, stride: P.STRIDE, offset: 0, divisor: 1 }, A3: { location: -1, size: 2, type: WebGL2RenderingContext.FLOAT, normalized: !1, stride: P.STRIDE, offset: 8, divisor: 1 }, A4: { location: -1, size: 3, type: WebGL2RenderingContext.FLOAT, normalized: !1, stride: P.STRIDE, offset: 16, divisor: 1 }, A5: { location: -1, size: 4, type: WebGL2RenderingContext.FLOAT, normalized: !1, stride: P.STRIDE, offset: 28, divisor: 1 }, A6: { location: -1, size: 4, type: WebGL2RenderingContext.FLOAT, normalized: !1, stride: P.STRIDE, offset: 44, divisor: 1 }, A7: { location: -1, size: 4, type: WebGL2RenderingContext.FLOAT, normalized: !1, stride: P.STRIDE, offset: 60, divisor: 1 }, A8: { location: -1, size: 3, type: WebGL2RenderingContext.FLOAT, normalized: !1, stride: P.STRIDE, offset: 76, divisor: 1 }, A9: { location: -1, size: 3, type: WebGL2RenderingContext.FLOAT, normalized: !1, stride: P.STRIDE, offset: 88, divisor: 1 }, Aa: { location: -1, size: 4, type: WebGL2RenderingContext.FLOAT, normalized: !1, stride: P.STRIDE, offset: 100, divisor: 1 }, Ab: { location: -1, size: 4, type: WebGL2RenderingContext.FLOAT, normalized: !1, stride: P.STRIDE, offset: 116, divisor: 1 }, Ac: { location: -1, size: 3, type: WebGL2RenderingContext.FLOAT, normalized: !1, stride: P.STRIDE, offset: 132, divisor: 1 } });
let k = P;
class ee {
  constructor(t = 1e3, e = 1.5) {
    a(this, "Ys");
    a(this, "js");
    a(this, "Ks");
    a(this, "Ws", 0);
    a(this, "Zs", 0);
    this.js = t, this.Ks = e;
    const i = t * L.FLOATS_PER_INSTANCE;
    this.Ys = new Float32Array(i);
  }
  qs(t) {
    if (t <= this.js) return;
    const e = Math.ceil(t * this.Ks), i = this.js;
    this.js = e;
    const s = e * L.FLOATS_PER_INSTANCE, r = new Float32Array(s), h = i * L.FLOATS_PER_INSTANCE;
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
class ie {
  constructor(t) {
    a(this, "Ys");
    this.Ys = t;
  }
  hi(t) {
    this.Ys.qs(this.Ys.ii + 1);
    const { buffer: e, offset: i } = this.Ys.Vs();
    e[i + 0] = t.x, e[i + 1] = t.y, e[i + 2] = t.width, e[i + 3] = t.height, e[i + 4] = t.char0, e[i + 5] = t.char1, e[i + 6] = t.char2, e[i + 7] = t.r1, e[i + 8] = t.g1, e[i + 9] = t.b1, e[i + 10] = t.a1, e[i + 11] = t.r2, e[i + 12] = t.g2, e[i + 13] = t.b2, e[i + 14] = t.a2, e[i + 15] = t.invert, e[i + 16] = t.flipX, e[i + 17] = t.flipY, e[i + 18] = t.charRot, e[i + 19] = t.translationX, e[i + 20] = t.translationY, e[i + 21] = t.translationZ, e[i + 22] = t.rotationX, e[i + 23] = t.rotationY, e[i + 24] = t.rotationZ;
    const s = t.curveParams0, r = t.curveParams1;
    return e[i + 25] = s[0], e[i + 26] = s[1], e[i + 27] = s[2], e[i + 28] = s[3], e[i + 29] = r[0], e[i + 30] = r[1], e[i + 31] = r[2], e[i + 32] = r[3], e[i + 33] = t.depth, e[i + 34] = t.baseZ, e[i + 35] = t.geometryType, this.Ys.Js(L.FLOATS_PER_INSTANCE), this.Ys.ii - 1;
  }
  get ii() {
    return this.Ys.ii;
  }
}
class se {
  constructor(t, e = 1e3) {
    a(this, "A");
    a(this, "oi", null);
    a(this, "ai", 0);
    a(this, "ci", /* @__PURE__ */ new Map());
    this.A = t, this.li(e);
  }
  li(t) {
    const e = this.A;
    this.oi && e.deleteBuffer(this.oi), this.oi = e.createBuffer();
    const i = t * L.BYTES_PER_INSTANCE;
    Rt(e, e.ARRAY_BUFFER, this.oi, i, e.DYNAMIC_DRAW), this.ai = t;
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
    i.bindBuffer(i.ARRAY_BUFFER, this.oi);
    const s = e * L.FLOATS_PER_INSTANCE;
    i.bufferSubData(i.ARRAY_BUFFER, 0, t, 0, s);
  }
  di(t) {
    let e = this.ci.get(t);
    if (!e) {
      e = /* @__PURE__ */ new Map();
      const i = this.A;
      for (const s in k.ATTRIBUTES) {
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
      const o = k.ATTRIBUTES[r];
      o && ut(e, h, o.size, o.stride, o.offset, o.divisor, o.type, o.normalized);
    }
  }
  gi(t) {
    const e = this.A, i = this.di(t.G);
    for (const [s, r] of i)
      k.ATTRIBUTES[s] && (e.disableVertexAttribArray(r), e.vertexAttribDivisor(r, 0));
  }
  gt() {
    this.oi && (this.A.deleteBuffer(this.oi), this.oi = null), this.ci.clear();
  }
}
class re {
  constructor(t, e = 1e3, i = 1.5) {
    a(this, "A");
    a(this, "Ys");
    a(this, "mi");
    a(this, "_i");
    this.A = t, this.Ys = new ee(e, i), this.mi = new ie(this.Ys), this._i = new se(t, e);
  }
  yi(t) {
    var s, r, h, o, c, l, u, f, g, m;
    const e = [0, 0, 0, 0], i = [0, 0, 0, 0];
    return t.Os && t.Is ? (e[0] = ((s = t.Bs) == null ? void 0 : s[0]) ?? 0, e[1] = ((r = t.Bs) == null ? void 0 : r[1]) ?? 0, e[2] = ((h = t.Hs) == null ? void 0 : h[0]) ?? 0, e[3] = ((o = t.Hs) == null ? void 0 : o[1]) ?? 0, i[0] = t.Os[0], i[1] = t.Os[1], i[2] = t.Is[0], i[3] = t.Is[1]) : t.Ls && (e[0] = t.Ls[0], e[1] = t.Ls[1]), this.hi({ x: t.bs[0], y: t.bs[1], width: t.Ss[0], height: t.Ss[1], char0: t.Nt[0], char1: t.Nt[1], char2: t.Nt[2], r1: t.Xt[0], g1: t.Xt[1], b1: t.Xt[2], a1: t.Xt[3], r2: t.Yt[0], g2: t.Yt[1], b2: t.Yt[2], a2: t.Yt[3], invert: t.ks[0], flipX: t.ks[1], flipY: t.ks[2], charRot: t.Et, translationX: ((c = t.zs) == null ? void 0 : c[0]) ?? 0, translationY: ((l = t.zs) == null ? void 0 : l[1]) ?? 0, translationZ: ((u = t.zs) == null ? void 0 : u[2]) ?? 0, rotationX: ((f = t.Ds) == null ? void 0 : f[0]) ?? 0, rotationY: ((g = t.Ds) == null ? void 0 : g[1]) ?? 0, rotationZ: ((m = t.Ds) == null ? void 0 : m[2]) ?? 0, curveParams0: e, curveParams1: i, depth: t.Gs || 0, baseZ: t.Qs || 0, geometryType: t.Ns || 0 });
  }
  hi(t) {
    const e = this.mi.hi(t);
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
  Ps(t, e) {
    const i = this.Ys.ii;
    i !== 0 && this.A.drawArraysInstanced(t, 0, e, i);
  }
  gt() {
    this._i.gt();
  }
}
class _ {
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
  Pi() {
    this.bi.wi();
  }
  $i() {
    return !this.bi.ni;
  }
  gt() {
    this.bi.gt(), this.A.deleteBuffer(this.Mi);
  }
  Ti(t, e, i) {
    return this.bi.yi(t);
  }
  Ri(t, e, i, s, r, h) {
    const o = r.It ?? 0, c = r.Bt ?? 0, l = r.Ht ?? 0, u = r.bt ?? 0, f = r.Ct ?? 0, g = r.xt ?? 0, m = [0, 0, 0, 0], d = [0, 0, 0, 0];
    h && (h.bezStartX !== void 0 && h.bezStartY !== void 0 && h.bezEndX !== void 0 && h.bezEndY !== void 0 ? (m[0] = h.cp1x ?? 0, m[1] = h.cp1y ?? 0, m[2] = h.cp2x ?? 0, m[3] = h.cp2y ?? 0, d[0] = h.bezStartX ?? 0, d[1] = h.bezStartY ?? 0, d[2] = h.bezEndX ?? 0, d[3] = h.bezEndY ?? 0) : h.arcStart === void 0 && h.arcStop === void 0 || (m[0] = h.arcStart ?? 0, m[1] = h.arcStop ?? 0));
    const v = { x: t, y: e, width: i, height: s, char0: r.Nt[0], char1: r.Nt[1], char2: r.Nt[2], r1: r.Xt[0], g1: r.Xt[1], b1: r.Xt[2], a1: r.Xt[3], r2: r.Yt[0], g2: r.Yt[1], b2: r.Yt[2], a2: r.Yt[3], invert: r.Rt ? 1 : 0, flipX: r.Gt ? 1 : 0, flipY: r.Qt ? 1 : 0, charRot: r.Et, translationX: o, translationY: c, translationZ: l, rotationX: u, rotationY: f, rotationZ: g, curveParams0: m, curveParams1: d, depth: (h == null ? void 0 : h.depth) ?? 0, baseZ: (h == null ? void 0 : h.baseZ) ?? 0, geometryType: $t[this.Ci] ?? 0 };
    return this.bi.hi(v);
  }
}
const ne = { Fi: ft, Ei: 6, ...Y }, he = { Fi: new Float32Array([0, -0.5, 0, 0, 1, -0.5, 1, 0, 0, 0.5, 0, 1, 0, 0.5, 0, 1, 1, -0.5, 1, 0, 1, 0.5, 1, 1]), Ei: 6, ...Y }, oe = { Fi: function(n = 32) {
  const t = [], e = 2 * Math.PI / n;
  for (let i = 0; i < n; i++) {
    const s = i * e, r = (i + 1) % n * e, h = Math.cos(s), o = Math.sin(s), c = 0.5 * (h + 1), l = 0.5 * (o + 1), u = Math.cos(r), f = Math.sin(r), g = 0.5 * (u + 1), m = 0.5 * (f + 1);
    t.push(0, 0, 0.5, 0.5, h, o, c, l, u, f, g, m);
  }
  return new Float32Array(t);
}(32), Ei: 96, ...Y };
let ae = { Fi: function(n) {
  const t = [];
  for (let e = 0; e < n; e++) {
    const i = e / n, s = (e + 1) / n;
    t.push(i, 0, i, 0, i, 1, i, 1, s, 1, s, 1);
  }
  return new Float32Array(t);
}(32), Ei: 96, ...Y };
const ce = { Fi: new Float32Array([0, 0, 0, 0, 1, 0, 1, 0, 0.5, 1, 0.5, 1]), Ei: 3, ...Y }, le = { Fi: function(n = 16) {
  const t = [];
  for (let e = 0; e < n; e++) {
    const i = e / n, s = (e + 1) / n;
    t.push(i, -0.5, i, 0, s, -0.5, s, 0, i, 0.5, i, 1, i, 0.5, i, 1, s, -0.5, s, 0, s, 0.5, s, 1);
  }
  return new Float32Array(t);
}(16), Ei: 96, ...Y }, ue = { [b.RECTANGLE]: class extends _ {
  constructor(n, t) {
    super(n, t, b.RECTANGLE, ne);
  }
  yi(n, t) {
    return this.Ri(0, 0, n.width, n.height, t);
  }
}, [b.LINE]: class extends _ {
  constructor(n, t) {
    super(n, t, b.LINE, he);
  }
  yi(n, t) {
    const e = n.x2 - n.x1, i = n.y2 - n.y1, s = Math.hypot(e, i), r = Math.atan2(i, e), h = t.Ot || 1, o = n.x1 + e / 2 - s / 2, c = n.y1 + i / 2, l = { ...t, xt: (t.xt || 0) + r };
    return this.Ri(o, c, s, h, l);
  }
}, [b.ELLIPSE]: class extends _ {
  constructor(n, t) {
    super(n, t, b.ELLIPSE, oe);
  }
  yi(n, t) {
    return this.Ri(0, 0, n.width, n.height, t);
  }
}, [b.ARC]: class extends _ {
  constructor(n, t) {
    super(n, t, b.ARC, ae);
  }
  yi(n, t) {
    const e = n.start * Math.PI / 180, i = n.stop * Math.PI / 180;
    return this.Ri(0, 0, n.width, n.height, t, { arcStart: e, arcStop: i });
  }
}, [b.TRIANGLE]: class extends _ {
  constructor(n, t) {
    super(n, t, b.TRIANGLE, ce);
  }
  yi(n, t) {
    const e = Math.min(n.x1, n.x2, n.x3), i = Math.max(n.x1, n.x2, n.x3), s = Math.min(n.y1, n.y2, n.y3), r = i - e, h = Math.max(n.y1, n.y2, n.y3) - s;
    return this.Ri(e, s, r, h, t);
  }
}, [b.BEZIER_CURVE]: class extends _ {
  constructor(n, t) {
    super(n, t, b.BEZIER_CURVE, le);
  }
  yi(n, t) {
    return this.Ri(0, 0, 1, t.Ot || 1, t, { cp1x: n.cp1x, cp1y: n.cp1y, cp2x: n.cp2x, cp2y: n.cp2y, bezStartX: n.x1, bezStartY: n.y1, bezEndX: n.x2, bezEndY: n.y2 });
  }
} };
class fe {
  constructor(t) {
    a(this, "A");
    a(this, "Si");
    a(this, "ki");
    this.A = t, this.ki = new te(t), this.Si = /* @__PURE__ */ new Map();
    for (const e of Object.values(b)) {
      const i = new re(t), s = new ue[e](t, i);
      this.Si.set(e, s);
    }
  }
  zi(t) {
    const e = this.Di(t);
    for (const i of e) this.Li(i);
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
    const h = Pt(this.A), o = s.length > 0 && s[0].state.kt;
    e.shader.O({ Uw: h[2] / h[3], U9: [h[2], h[3]], Ua: 1, Ub: o ? 1 : 0 }), r.Pi();
    for (const c of s) r.yi(c.params, c.state);
    if (r.$i()) {
      const c = r.unitGeometry, l = r.unitBuffer;
      try {
        this.ki.Ts(e.shader.G, i + "", c, l), r.batch.pi(e.shader), r.batch.Ps(c.As, c.Ei);
      } finally {
        r.batch.gi(e.shader), this.ki.Rs(), r.Pi();
      }
    }
  }
  gt() {
    for (const t of this.Si.values()) t.gt();
    this.Si.clear(), this.ki.gt();
  }
}
function Mt(n) {
  let t = 0;
  for (let e = 0; e < n.length; e++)
    t = (t << 5) - t + n.charCodeAt(e), t &= t;
  return t;
}
const yt = /* @__PURE__ */ new WeakMap();
let de = 1;
function wt(n) {
  if (n == null) return 0;
  if (typeof n != "object" && typeof n != "function") return Mt(n + "");
  let t = yt.get(n);
  return t || (t = de++, yt.set(n, t)), t;
}
function V(n, t) {
  return (n << 5) - n + t;
}
class ge {
  constructor(t) {
    a(this, "Oi", 0);
    a(this, "Ii");
    a(this, "Bi");
    a(this, "Hi", /* @__PURE__ */ new Map());
    this.Ii = new W(t, it, `#version 300 es
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
    const i = wt(t.G), s = function(r, h) {
      let o = 0;
      const c = Object.keys(r).sort();
      for (const l of c) o = V(o, Mt(l)), o = V(o, h(r[l]));
      return o;
    }(e, this.Xi.bind(this));
    return V(i, s);
  }
  Xi(t) {
    return typeof t == "number" || typeof t == "boolean" ? function(e) {
      return typeof e == "boolean" ? e ? 1 : 0 : Math.floor(e);
    }(t) : Array.isArray(t) ? function(e) {
      let i = 0;
      const s = Array.isArray(e[0]) ? e.flat() : e;
      for (const r of s) i = V(i, typeof r == "number" ? r : 0);
      return i;
    }(t) : t instanceof Float32Array || t instanceof Int32Array ? function(e) {
      let i = 0;
      const s = Math.min(e.length, 16);
      for (let r = 0; r < s; r++) i = V(i, e[r]);
      return i;
    }(t) : t instanceof WebGLTexture ? wt(t) : 0;
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
      const s = { id: this.ji++, type: t, params: {}, state: st.Lt(), material: e };
      this.Yi.push(s);
    }
    const i = this.Yi[this.Ss];
    return i.id = this.ji++, i.type = t, i.material = e, this.Ss++, i;
  }
  Wi(t, e, i) {
    const s = this.Ki(b.RECTANGLE, i), r = s.params;
    return r.width = t.width, r.height = t.height, e.Wt(s.state), s.id;
  }
  Zi(t, e, i) {
    const s = this.Ki(b.LINE, i), r = s.params;
    return r.x1 = t.x1, r.y1 = t.y1, r.x2 = t.x2, r.y2 = t.y2, r.thickness = t.thickness, e.Wt(s.state), s.id;
  }
  qi(t, e, i) {
    const s = this.Ki(b.ELLIPSE, i), r = s.params;
    return r.width = t.width, r.height = t.height, r.startAngle = t.startAngle, r.endAngle = t.endAngle, r.segments = t.segments, e.Wt(s.state), s.id;
  }
  Vi(t, e, i) {
    const s = this.Ki(b.ARC, i), r = s.params;
    return r.width = t.width, r.height = t.height, r.start = t.start, r.stop = t.stop, e.Wt(s.state), s.id;
  }
  Ji(t, e, i) {
    const s = this.Ki(b.TRIANGLE, i), r = s.params;
    return r.x1 = t.x1, r.y1 = t.y1, r.x2 = t.x2, r.y2 = t.y2, r.x3 = t.x3, r.y3 = t.y3, e.Wt(s.state), s.id;
  }
  te(t, e, i) {
    const s = this.Ki(b.BEZIER_CURVE, i), r = s.params;
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
class ve {
  constructor(t) {
    a(this, "A");
    a(this, "se", null);
    a(this, "ie");
    a(this, "vt");
    a(this, "ee");
    a(this, "re");
    a(this, "ne");
    a(this, "he", null);
    a(this, "oe", {});
    a(this, "ae", []);
    a(this, "ce", []);
    a(this, "le", []);
    a(this, "ue", null);
    a(this, "fe", [0, 0, 0, 0]);
    a(this, "de", 1);
    this.A = t, t.enable(t.DEPTH_TEST), t.depthFunc(t.LEQUAL), t.clearDepth(1), t.depthMask(!0), t.disable(t.CULL_FACE), this.ee = new st(), this.vt = new ge(t), this.re = new me(), this.ie = new fe(t), this.ne = new Jt(t);
    const e = [0, 0, t.canvas.width, t.canvas.height];
    nt(t, e), this.ae.push(null), this.ce.push(e), this.le.push(1), this.ue = null, this.fe = e, this.de = 1;
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
    this.fe[0] === h[0] && this.fe[1] === h[1] && this.fe[2] === h[2] && this.fe[3] === h[3] || (r.viewport(...h), nt(r, h), this.fe = h);
  }
  ve(t) {
    this.se !== t && (this.se = t, t.D());
  }
  pe(t, e) {
    return new W(this.A, t, e);
  }
  ge(t) {
    this.he = t, t && (this.oe = {});
  }
  I(t, e) {
    this.oe[t] = e;
  }
  me(t) {
    Object.assign(this.oe, t);
  }
  _e(t) {
    return new W(this.A, it, t);
  }
  ye(t, e, i) {
    this.re.Wi({ width: e ?? t.width, height: i ?? t.height }, this.ee, t.ut());
  }
  Ae(t, e, i, s) {
    this.ne.Ps(t, e, i, s);
  }
  we(t, e) {
    if (this.he) {
      const i = this.vt.Ni(this.he, this.oe);
      this.re.Wi({ width: t, height: e }, this.ee, i), this.he = null, this.oe = {};
    } else this.re.Wi({ width: t, height: e }, this.ee, this.vt.Qi);
  }
  be(t, e, i, s) {
    this.re.Zi({ x1: t, y1: e, x2: i, y2: s }, this.ee, this.vt.Qi);
  }
  Ce(t, e) {
    this.re.qi({ width: t, height: e }, this.ee, this.vt.Qi);
  }
  xe(t, e, i, s, r, h) {
    this.re.Ji({ x1: t, y1: e, x2: i, y2: s, x3: r, y3: h }, this.ee, this.vt.Qi);
  }
  Me(t, e, i, s, r, h, o, c) {
    this.re.te({ x1: t, y1: e, cp1x: i, cp1y: s, cp2x: r, cp2y: h, x2: o, y2: c }, this.ee, this.vt.Qi);
  }
  Fe(t, e, i, s) {
    this.re.Vi({ width: t, height: e, start: i, stop: s }, this.ee, this.vt.Qi);
  }
  Pe(t, e, i = 1, s = {}) {
    return new H(this.A, t, e, i, s, this);
  }
  $e(t, e = t, i = t, s = 255) {
    this.ee.ps(t, e ?? t, i ?? t, s);
    const [r, h, o, c] = this.ee.canvasBackgroundColor;
    this.Te(r, h, o, c, !1);
  }
  wi(t = 0, e = 0, i = 0, s = 0) {
    this.Te(t, e, i, s, !0);
  }
  Te(t, e, i, s, r) {
    const h = this.A;
    if (this.de > 1) {
      const o = r ? [1, 1, 0, 0] : [0, 0, 0, 0];
      h.clearBufferfv(h.COLOR, 0, new Float32Array(o)), h.clearBufferfv(h.COLOR, 1, new Float32Array([0, 0, 0, 0])), this.de >= 3 && h.clearBufferfv(h.COLOR, 2, new Float32Array([t, e, i, s]));
      for (let c = 3; c < this.de; c++) h.clearBufferfv(h.COLOR, c, new Float32Array([0, 0, 0, 0]));
    } else h.clearColor(t, e, i, s), h.clear(h.COLOR_BUFFER_BIT);
  }
  Re() {
    const t = [0, 0, this.A.canvas.width, this.A.canvas.height];
    this.A.viewport(...t), nt(this.A, t), this.fe = t, this.ce.length > 0 && (this.ce[0] = t);
  }
  ct() {
    const t = this.re;
    this.ie.zi(t), t.wi(), this.se = null;
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
const C = { readShort: (n, t) => (C.t.uint16[0] = n[t] << 8 | n[t + 1], C.t.int16[0]), readUshort: (n, t) => n[t] << 8 | n[t + 1], readUshorts(n, t, e) {
  const i = [];
  for (let s = 0; s < e; s++) i.push(C.readUshort(n, t + 2 * s));
  return i;
}, readUint(n, t) {
  const e = C.t.uint8;
  return e[3] = n[t], e[2] = n[t + 1], e[1] = n[t + 2], e[0] = n[t + 3], C.t.uint32[0];
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
function pe(n, t, e) {
  for (let i = 0; i < e.length; i++) n[t + i] = 255 & e.charCodeAt(i);
}
function ht(n, t, e) {
  const i = t + e;
  let s = 0;
  const r = C.t;
  for (let h = t; h < i; h += 4) r.uint8[3] = n[h] || 0, r.uint8[2] = n[h + 1] || 0, r.uint8[1] = n[h + 2] || 0, r.uint8[0] = n[h + 3] || 0, s = s + (r.uint32[0] >>> 0) >>> 0;
  return s >>> 0;
}
class Ae {
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
function G(n) {
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
function ot(n, t) {
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
function ye(n) {
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
      const g = r.readBits(2);
      if (g === 0) {
        r.alignToByte();
        const m = r.readBits(16);
        if ((65535 & (65535 ^ m)) !== r.readBits(16)) throw Error("DEFLATE uncompressed LEN/NLEN mismatch");
        for (let d = 0; d < m; d++) h.push(r.readBits(8));
      } else {
        if (g !== 1 && g !== 2) throw Error("Unsupported DEFLATE type");
        {
          let m, d;
          if (g === 1) {
            const v = Array(288).fill(0);
            for (let A = 0; A <= 143; A++) v[A] = 8;
            for (let A = 144; A <= 255; A++) v[A] = 9;
            for (let A = 256; A <= 279; A++) v[A] = 7;
            for (let A = 280; A <= 287; A++) v[A] = 8;
            m = G(v), d = G(Array(32).fill(5));
          } else {
            const v = r.readBits(5) + 257, A = r.readBits(5) + 1, p = r.readBits(4) + 4, y = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15], E = Array(19).fill(0);
            for (let T = 0; T < p; T++) E[y[T]] = r.readBits(3);
            const x = G(E), w = [];
            for (; w.length < v + A; ) {
              const T = ot(r, x);
              if (T <= 15) w.push(T);
              else if (T === 16) {
                const S = r.readBits(2) + 3, F = w[w.length - 1] || 0;
                for (let K = 0; K < S; K++) w.push(F);
              } else if (T === 17) {
                const S = r.readBits(3) + 3;
                for (let F = 0; F < S; F++) w.push(0);
              } else {
                if (T !== 18) throw Error("Invalid code length symbol");
                {
                  const S = r.readBits(7) + 11;
                  for (let F = 0; F < S; F++) w.push(0);
                }
              }
            }
            const R = w.slice(0, v), N = w.slice(v, v + A);
            m = G(R), d = G(N);
          }
          for (; ; ) {
            const v = ot(r, m);
            if (v < 256) h.push(v);
            else {
              if (v === 256) break;
              if (v > 256 && v < 286) {
                const A = v - 257;
                let p = o[A];
                const y = c[A];
                y && (p += r.readBits(y));
                const E = ot(r, d);
                if (E >= 30) throw Error("Invalid distance symbol");
                let x = l[E];
                const w = u[E];
                w && (x += r.readBits(w));
                const R = h.length - x;
                if (R < 0) throw Error("Invalid distance");
                for (let N = 0; N < p; N++) h.push(h[R + N] || 0);
              } else if (v === 286 || v === 287) throw Error("Reserved length symbol");
            }
          }
        }
      }
    }
  }(new Ae(n.subarray(i)), s), new Uint8Array(s);
}
function we(n) {
  const t = C, e = new Uint8Array(n);
  if (t.readASCII(e, 0, 4) !== "wOFF") throw Error("Invalid WOFF signature");
  const i = t.readUint(e, 4), s = t.readUshort(e, 12), r = t.readUint(e, 16), h = [];
  let o = 44;
  for (let p = 0; p < s; p++) {
    const y = t.readASCII(e, o, 4), E = t.readUint(e, o + 4), x = t.readUint(e, o + 8), w = t.readUint(e, o + 12), R = t.readUint(e, o + 16);
    h.push({ tag: y, offset: E, compLength: x, origLength: w, checksum: R }), o += 20;
  }
  for (const p of h) {
    const y = new Uint8Array(e.buffer, p.offset, p.compLength);
    if (p.compLength === p.origLength) p.data = new Uint8Array(y);
    else if (p.data = ye(y), p.data.length !== p.origLength) if (p.data.length < p.origLength) {
      const E = new Uint8Array(p.origLength);
      E.set(p.data), p.data = E;
    } else p.data = p.data.subarray(0, p.origLength);
  }
  const c = s;
  let l = 1, u = 0;
  for (; l << 1 <= c; ) l <<= 1, u++;
  const f = 16 * l, g = 16 * c - f;
  let m = 12 + 16 * c;
  const d = {};
  for (const p of h) d[p.tag] = m, m = q(m + p.data.length);
  const v = new Uint8Array(Math.max(r || 0, m));
  D(v, 0, i), J(v, 4, c), J(v, 6, f), J(v, 8, u), J(v, 10, g);
  let A = 12;
  for (const p of h) {
    pe(v, A, p.tag), A += 4;
    let y = p.data;
    if (p.tag === "head" && y.length >= 12) {
      const E = new Uint8Array(y);
      D(E, 8, 0), D(v, A, ht(E, 0, q(E.length))), A += 4;
    } else
      D(v, A, ht(y, 0, q(y.length))), A += 4;
    D(v, A, d[p.tag]), A += 4, D(v, A, p.data.length), A += 4;
  }
  for (const p of h) {
    const y = d[p.tag];
    v.set(p.data, y);
  }
  if (h.find((p) => p.tag === "head")) {
    const p = d.head, y = function(E, x) {
      const w = x + 8, R = [E[w], E[w + 1], E[w + 2], E[w + 3]];
      D(E, w, 0);
      const N = 2981146554 - (ht(E, 0, q(E.length)) >>> 0) >>> 0;
      return E[w] = R[0], E[w + 1] = R[1], E[w + 2] = R[2], E[w + 3] = R[3], N >>> 0;
    }(v, p);
    D(v, p + 8, y);
  }
  return v.buffer;
}
const be = { parseTab(n, t, e) {
  const i = { tables: [], ids: {}, off: t };
  n = new Uint8Array(n.buffer, t, e), t = 0;
  const s = C, r = s.readUshort, h = r(n, t += 2);
  t += 2;
  const o = [];
  for (let c = 0; c < h; c++) {
    const l = r(n, t), u = r(n, t += 2);
    t += 2;
    const f = s.readUint(n, t);
    t += 4;
    const g = `p${l}e${u}`;
    let m = o.indexOf(f);
    if (m === -1) {
      let d;
      m = i.tables.length, o.push(f);
      const v = r(n, f);
      d = v === 4 ? this.parse4(n, f) : v === 12 ? this.parse12(n, f) : { format: v }, i.tables.push(d);
    }
    i.ids[g] = m;
  }
  return i;
}, parse4(n, t) {
  const e = C, i = e.readUshort, s = e.readUshorts, r = t, h = i(n, t += 2);
  t += 2;
  const o = i(n, t += 2) >>> 1, c = { format: 4, searchRange: i(n, t += 2), entrySelector: 0, rangeShift: 0, endCount: [], startCount: [], idDelta: [], idRangeOffset: [], glyphIdArray: [] };
  t += 2, c.entrySelector = i(n, t), t += 2, c.rangeShift = i(n, t), t += 2, c.endCount = s(n, t, o), t += 2 * o, t += 2, c.startCount = s(n, t, o), t += 2 * o;
  for (let l = 0; l < o; l++) c.idDelta.push(e.readShort(n, t)), t += 2;
  return c.idRangeOffset = s(n, t, o), t += 2 * o, c.glyphIdArray = s(n, t, r + h - t >> 1), c;
}, parse12(n, t) {
  const e = C.readUint;
  e(n, t += 4), e(n, t += 4);
  const i = e(n, t += 4);
  t += 4;
  const s = new Uint32Array(3 * i);
  for (let r = 0; r < 3 * i; r += 3) s[r] = e(n, t + (r << 2)), s[r + 1] = e(n, t + (r << 2) + 4), s[r + 2] = e(n, t + (r << 2) + 8);
  return { format: 12, groups: s };
} }, xe = { parseTab(n, t, e) {
  const i = C;
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
} }, Te = { parseTab(n, t, e) {
  const i = C;
  t += 4;
  const s = ["ascender", "descender", "lineGap", "advanceWidthMax", "minLeftSideBearing", "minRightSideBearing", "xMaxExtent", "caretSlopeRise", "caretSlopeRun", "caretOffset", "res0", "res1", "res2", "res3", "metricDataFormat", "numberOfHMetrics"], r = {};
  for (let h = 0; h < s.length; h++) {
    const o = s[h], c = o === "advanceWidthMax" || o === "numberOfHMetrics" ? i.readUshort : i.readShort;
    r[o] = c(n, t + 2 * h);
  }
  return r;
} }, Ce = { parseTab(n, t, e, i) {
  const s = C, r = [], h = [], o = i.maxp.numGlyphs, c = i.hhea.numberOfHMetrics;
  let l = 0, u = 0, f = 0;
  for (; f < c; ) l = s.readUshort(n, t + (f << 2)), u = s.readShort(n, t + (f << 2) + 2), r.push(l), h.push(u), f++;
  for (; f < o; ) r.push(l), h.push(u), f++;
  return { aWidth: r, lsBearing: h };
} }, bt = { cmap: be, head: xe, hhea: Te, maxp: { parseTab(n, t, e) {
  const i = C;
  return i.readUint(n, t), t += 4, { numGlyphs: i.readUshort(n, t) };
} }, hmtx: Ce, loca: { parseTab(n, t, e, i) {
  const s = C, r = [], h = i.head.indexToLocFormat, o = i.maxp.numGlyphs + 1;
  if (h === 0) for (let c = 0; c < o; c++) r.push(s.readUshort(n, t + (c << 1)) << 1);
  else if (h === 1) for (let c = 0; c < o; c++) r.push(s.readUint(n, t + (c << 2)));
  return r;
} }, glyf: { parseTab(n, t, e, i) {
  const s = [], r = i.maxp.numGlyphs;
  for (let h = 0; h < r; h++) s.push(null);
  return s;
}, Ee(n, t) {
  const e = C, i = n.Se, s = n.loca;
  if (s[t] === s[t + 1]) return null;
  const r = j.findTable(i, "glyf", n.ke);
  if (!r) return null;
  let h = r[0] + s[t];
  const o = {};
  if (o.noc = e.readShort(i, h), h += 2, o.xMin = e.readShort(i, h), h += 2, o.yMin = e.readShort(i, h), h += 2, o.xMax = e.readShort(i, h), h += 2, o.yMax = e.readShort(i, h), h += 2, o.xMin >= o.xMax || o.yMin >= o.yMax) return null;
  if (o.noc > 0) {
    o.endPts = [];
    for (let g = 0; g < o.noc; g++) o.endPts.push(e.readUshort(i, h)), h += 2;
    const c = e.readUshort(i, h);
    if (h += 2, i.length - h < c) return null;
    h += c;
    const l = o.endPts[o.noc - 1] + 1;
    o.flags = [];
    for (let g = 0; g < l; g++) {
      const m = i[h];
      if (h++, o.flags.push(m), 8 & m) {
        const d = i[h];
        h++;
        for (let v = 0; v < d; v++) o.flags.push(m), g++;
      }
    }
    o.xs = [];
    for (let g = 0; g < l; g++) {
      const m = o.flags[g], d = !!(16 & m);
      2 & m ? (o.xs.push(d ? i[h] : -i[h]), h++) : d ? o.xs.push(0) : (o.xs.push(e.readShort(i, h)), h += 2);
    }
    o.ys = [];
    for (let g = 0; g < l; g++) {
      const m = o.flags[g], d = !!(32 & m);
      4 & m ? (o.ys.push(d ? i[h] : -i[h]), h++) : d ? o.ys.push(0) : (o.ys.push(e.readShort(i, h)), h += 2);
    }
    let u = 0, f = 0;
    for (let g = 0; g < l; g++) u += o.xs[g], f += o.ys[g], o.xs[g] = u, o.ys[g] = f;
  } else o.parts = [], o.endPts = [], o.flags = [], o.xs = [], o.ys = [];
  return o;
} } }, j = { parse(n) {
  const t = new Uint8Array(n);
  C.readASCII(t, 0, 4) === "wOFF" && (n = we(n));
  const e = new Uint8Array(n), i = bt, s = {}, r = { Se: e, ze: 0, ke: 0 };
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
  const i = C, s = i.readUshort(n, e + 4);
  let r = e + 12;
  for (let h = 0; h < s; h++) {
    const o = i.readASCII(n, r, 4);
    i.readUint(n, r + 4);
    const c = i.readUint(n, r + 8), l = i.readUint(n, r + 12);
    if (o === t) return [c, l];
    r += 16;
  }
  return null;
}, T: bt, B: C };
class Re {
  De(t) {
    var i;
    const e = [];
    return (i = t.cmap) != null && i.tables ? (t.cmap.tables.forEach((s) => {
      if (s.format === 4) {
        const r = this.Le(s);
        e.push(...r);
      } else if (s.format === 12) {
        const r = this.Oe(s);
        e.push(...r);
      }
    }), [...new Set(e)]) : [];
  }
  Le(t) {
    const e = [];
    if (!(t.startCount && t.endCount && t.idRangeOffset && t.idDelta)) return e;
    for (let i = 0; i < t.startCount.length; i++) {
      const s = t.startCount[i], r = t.endCount[i];
      if (s !== 65535 || r !== 65535) {
        for (let h = s; h <= r; h++)
          if (this.Ie(t, h, i) > 0) try {
            const o = String.fromCodePoint(h);
            e.push(o);
          } catch {
          }
      }
    }
    return e;
  }
  Oe(t) {
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
  Ie(t, e, i) {
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
class Fe {
  constructor(t) {
    a(this, "Be");
    a(this, "He");
    a(this, "Z");
    this.Z = t, this.Be = document.createElement("canvas"), this.He = this.Be.getContext("2d", { willReadFrequently: !0, alpha: !0 });
  }
  Ge(t, e, i, s) {
    const r = t.length, h = Math.ceil(Math.sqrt(r)), o = Math.ceil(r / h), c = e.width * h, l = e.height * o;
    this.Qe(c, l), this.Ne(t, e, h, i, s);
    const u = this.Z.Pe(c, l, 1, { filter: "nearest" });
    return u.et(this.Be), { framebuffer: u, columns: h, rows: o };
  }
  Qe(t, e) {
    this.Be.width = t, this.Be.height = e, this.Be.style.width = t + "px", this.Be.style.height = e + "px", this.He.imageSmoothingEnabled = !1, this.Be.style.imageRendering = "pixelated", this.He.clearRect(0, 0, t, e), this.He.textBaseline = "top", this.He.textAlign = "left", this.He.fillStyle = "white";
  }
  Ne(t, e, i, s, r) {
    const h = s / r.head.unitsPerEm;
    for (let o = 0; o < t.length; o++) {
      const c = o % i, l = Math.floor(o / i), u = t[o].glyphData;
      if (!u) continue;
      const f = u.advanceWidth * h, g = c * e.width, m = l * e.height, d = g + 0.5 * e.width, v = m + 0.5 * e.height, A = Math.round(d - 0.5 * e.width), p = Math.round(v - 0.5 * s), y = A + 0.5 * (e.width - f), E = p + r.hhea.ascender * h;
      this.Xe(u, y, E, h);
    }
  }
  Xe(t, e, i, s) {
    if (!t || !t.xs || t.noc === 0) return;
    let { xs: r, ys: h, endPts: o, flags: c } = t;
    if (!(r && h && o && c)) return;
    this.He.beginPath();
    let l = 0;
    for (let u = 0; u < o.length; u++) {
      const f = o[u];
      if (!(f < l)) {
        if (f >= l) {
          const g = e + r[l] * s, m = i - h[l] * s;
          this.He.moveTo(g, m);
          let d = l + 1;
          for (; d <= f; )
            if (1 & c[d]) {
              const v = e + r[d] * s, A = i - h[d] * s;
              this.He.lineTo(v, A), d++;
            } else {
              const v = e + r[d] * s, A = i - h[d] * s;
              if (d + 1 > f) {
                const y = e + r[l] * s, E = i - h[l] * s;
                if (1 & c[l]) this.He.quadraticCurveTo(v, A, y, E);
                else {
                  const x = (v + y) / 2, w = (A + E) / 2;
                  this.He.quadraticCurveTo(v, A, x, w);
                }
                break;
              }
              const p = d + 1;
              if (1 & c[p]) {
                const y = e + r[p] * s, E = i - h[p] * s;
                this.He.quadraticCurveTo(v, A, y, E), d = p + 1;
              } else {
                const y = (v + (e + r[p] * s)) / 2, E = (A + (i - h[p] * s)) / 2;
                this.He.quadraticCurveTo(v, A, y, E), d = p;
              }
            }
          this.He.closePath();
        }
        l = f + 1;
      }
    }
    this.He.fill();
  }
}
class Nt {
  Ye(t, e) {
    const i = t.cmap;
    if (!i || !i.tables) return 0;
    let s = 0;
    for (const r of i.tables) if (r.format === 4 ? s = this.je(e, r) : r.format === 12 && (s = this.Ke(e, r)), s > 0) break;
    return s;
  }
  We(t, e) {
    const i = e.codePointAt(0);
    return i === void 0 ? 0 : this.Ye(t, i);
  }
  Ze(t, e) {
    const i = t.hmtx;
    return i && i.aWidth && i.aWidth.length !== 0 ? e < i.aWidth.length ? i.aWidth[e] : i.aWidth[i.aWidth.length - 1] : 0;
  }
  qe(t, e) {
    const i = e / t.head.unitsPerEm, s = t.hhea.ascender * i, r = t.hhea.descender * i, h = t.hhea.lineGap * i;
    return { ascender: s, descender: r, lineGap: h, lineHeight: s - r + h, unitsPerEm: t.head.unitsPerEm, scale: i };
  }
  je(t, e) {
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
  Ke(t, e) {
    const i = e.groups.length / 3;
    for (let s = 0; s < i; s++) {
      const r = e.groups[3 * s], h = e.groups[3 * s + 1], o = e.groups[3 * s + 2];
      if (t >= r && t <= h) return o + (t - r);
    }
    return 0;
  }
}
class Pe {
  constructor() {
    a(this, "Ve");
    this.Ve = new Nt();
  }
  Je(t, e, i) {
    let s = 0;
    const r = this.Ve.qe(i, e), h = r.lineHeight;
    for (const o of t) {
      const c = this.Ve.We(i, o);
      if (c === 0) continue;
      const l = this.Ve.Ze(i, c) * r.scale;
      s = Math.max(s, l);
    }
    return { width: Math.ceil(s), height: Math.ceil(h) };
  }
}
class Me {
  constructor() {
    a(this, "tr");
    this.tr = new Nt();
  }
  sr(t, e) {
    const i = [], s = /* @__PURE__ */ new Map();
    return t.forEach((r, h) => {
      const o = r.codePointAt(0) || 0, c = { character: r, unicode: o, color: this.ir(h), glyphData: this.er(e, r) };
      i.push(c), s.set(r, c);
    }), { array: i, map: s };
  }
  ir(t) {
    return [t % 256 / 255, Math.floor(t / 256) % 256 / 255, 0];
  }
  er(t, e) {
    const i = e.codePointAt(0) || 0, s = this.tr.Ye(t, i);
    if (s === 0) return null;
    let r = 0;
    t.hmtx && t.hmtx.aWidth && s > 0 && t.hmtx.aWidth[s] !== void 0 && (r = t.hmtx.aWidth[s]);
    const h = j.T.glyf.Ee(t, s);
    return h ? { ...h, advanceWidth: r } : null;
  }
}
class vt {
  constructor(t, e = 16) {
    a(this, "rr");
    a(this, "nr", []);
    a(this, "hr", /* @__PURE__ */ new Map());
    a(this, "ar");
    a(this, "cr", 16);
    a(this, "lr", 0);
    a(this, "ur", 0);
    a(this, "dr", { width: 0, height: 0 });
    a(this, "vr");
    a(this, "pr");
    a(this, "gr");
    a(this, "mr");
    a(this, "_r");
    this.cr = e, this.pr = new Re(), this.gr = new Fe(t), this.mr = new Pe(), this._r = new Me();
  }
  async yr(t) {
    let e;
    if (t) {
      const i = await fetch(t);
      if (!i.ok) throw new U(`Failed to load font file: ${i.status} ${i.statusText}`);
      e = await i.arrayBuffer();
    } else
      e = await (await fetch("data:font/woff;base64,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")).arrayBuffer();
    await this.Ar(e), this.rr = j.parse(e)[0], await this.wr();
  }
  br(t) {
    if (t === void 0) return this.cr;
    this.cr = t, this.dr = this.mr.Je(this.nr.map((i) => i.character), this.cr, this.rr);
    const e = this.gr.Ge(this.nr, this.dr, this.cr, this.rr);
    this.ar = e.framebuffer, this.lr = e.columns, this.ur = e.rows;
  }
  async Cr(t) {
    try {
      const e = await fetch(t);
      if (!e.ok) throw new U(`Failed to load font file: ${e.status} ${e.statusText}`);
      const i = await e.arrayBuffer();
      await this.Ar(i);
      const s = j.parse(i);
      if (!s || s.length === 0) throw Error("Failed to parse font file");
      this.rr = s[0], await this.wr();
    } catch (e) {
      throw new U("Failed to load font: " + (e instanceof Error ? e.message : "Unknown error"), e);
    }
  }
  async Ar(t) {
    const e = Date.now();
    this.vr = new FontFace("CustomFont_" + e, t), await this.vr.load(), document.fonts.add(this.vr);
  }
  async wr() {
    const t = this.pr.De(this.rr), { array: e, map: i } = this._r.sr(t, this.rr);
    this.nr = e, this.hr = i, this.dr = this.mr.Je(t, this.cr, this.rr);
    const s = this.gr.Ge(this.nr, this.dr, this.cr, this.rr);
    this.ar = s.framebuffer, this.lr = s.columns, this.ur = s.rows;
  }
  Mr(t) {
    const e = this.hr.get(t);
    return e ? e.color : [0, 0, 0];
  }
  Fr(t) {
    return Array.from(t).map((e) => {
      const i = this.hr.get(e);
      return i ? i.color : [0, 0, 0];
    });
  }
  gt() {
    this.ar.gt(), document.fonts.delete(this.vr);
  }
  get fontFramebuffer() {
    return this.ar;
  }
  get characterMap() {
    return this.hr;
  }
  get characters() {
    return this.nr;
  }
  get textureColumns() {
    return this.lr;
  }
  get textureRows() {
    return this.ur;
  }
  get maxGlyphDimensions() {
    return this.dr;
  }
  get fontSize() {
    return this.cr;
  }
  get font() {
    return this.rr;
  }
}
class Ut {
  constructor(t, e, i) {
    a(this, "Pr");
    a(this, "$r");
    a(this, "N");
    a(this, "X");
    a(this, "Tr");
    a(this, "Rr");
    a(this, "Er");
    a(this, "Sr");
    a(this, "kr");
    this.Er = t, this.Sr = e, this.kr = i, this.ti();
  }
  ti() {
    this.Pr = Math.floor(this.Er.width / this.Sr), this.$r = Math.floor(this.Er.height / this.kr), this.N = this.Pr * this.Sr, this.X = this.$r * this.kr, this.Tr = Math.floor((this.Er.width - this.N) / 2), this.Rr = Math.floor((this.Er.height - this.X) / 2);
  }
  zr(t, e) {
    this.Sr = t, this.kr = e, this.ti();
  }
  get cellWidth() {
    return this.Sr;
  }
  get cellHeight() {
    return this.kr;
  }
  get cols() {
    return this.Pr;
  }
  get rows() {
    return this.$r;
  }
  get width() {
    return this.N;
  }
  get height() {
    return this.X;
  }
  get offsetX() {
    return this.Tr;
  }
  get offsetY() {
    return this.Rr;
  }
}
const Ne = /^rgba?\(([^)]+)\)$/i;
function at(n) {
  return Number.isNaN(n) ? 0 : Math.max(0, Math.min(255, n));
}
function Ue(n) {
  if (!n) return null;
  const t = n.trim().toLowerCase();
  if (!t) return null;
  let e = null;
  return t.startsWith("rgb") && (e = function(i) {
    const s = Ne.exec(i.trim());
    if (!s) return null;
    const r = s[1].split(",").map((u) => u.trim());
    if (r.length < 3) return null;
    const h = at(parseFloat(r[0])), o = at(parseFloat(r[1])), c = at(parseFloat(r[2])), l = r[3] !== void 0 ? 255 * Math.max(0, Math.min(1, parseFloat(r[3]))) : 255;
    return [h, o, c, Math.round(l)];
  }(t)), e ? e[3] === 0 ? null : e : null;
}
class Se {
  constructor(t = {}) {
    a(this, "Er");
    a(this, "Dr", null);
    a(this, "Lr", !1);
    a(this, "Or");
    this.Lr = t.overlay ?? !1, this.Lr && t.canvas ? (this.Dr = t.canvas, this.Er = this.Ir(), this.Or = !0, this.Br()) : t.canvas ? (this.Er = t.canvas, this.Or = !1) : (this.Er = this.Hr(t.width, t.height), this.Or = !0), this.Er.style.imageRendering = "pixelated";
  }
  Hr(t, e) {
    const i = document.createElement("canvas");
    return i.className = "textmodeCanvas", i.style.imageRendering = "pixelated", i.width = t || 800, i.height = e || 600, document.body.appendChild(i), i;
  }
  Ir() {
    const t = document.createElement("canvas");
    t.className = "textmodeCanvas", t.style.imageRendering = "pixelated";
    const e = this.Dr.getBoundingClientRect();
    let i = Math.round(e.width), s = Math.round(e.height);
    if (this.Dr instanceof HTMLVideoElement) {
      const o = this.Dr;
      (i === 0 || s === 0) && o.videoWidth > 0 && o.videoHeight > 0 && (i = o.videoWidth, s = o.videoHeight);
    }
    t.width = i, t.height = s, t.style.position = "absolute", t.style.pointerEvents = "none";
    const r = window.getComputedStyle(this.Dr);
    let h = parseInt(r.zIndex || "0", 10);
    return isNaN(h) && (h = 0), t.style.zIndex = "" + (h + 1), t;
  }
  Br() {
    var t;
    this.Gr(), (t = this.Dr.parentNode) == null || t.insertBefore(this.Er, this.Dr.nextSibling);
  }
  Qr() {
    const t = [];
    return this.Lr && this.Dr instanceof HTMLElement && (t.push(this.Dr), this.Dr.parentElement && t.push(this.Dr.parentElement)), this.Er.parentElement && t.push(this.Er.parentElement), t.push(this.Er), t.push(document.body), t.push(document.documentElement), t;
  }
  Nr() {
    const t = this.Qr();
    for (const e of t) {
      if (!e) continue;
      const i = Ue(window.getComputedStyle(e).backgroundColor);
      if (i) return i;
    }
    return [255, 255, 255, 255];
  }
  Gr() {
    if (!this.Dr) return;
    const t = this.Dr.getBoundingClientRect();
    let e = this.Dr.offsetParent;
    if (e && e !== document.body) {
      const i = e.getBoundingClientRect();
      this.Er.style.top = t.top - i.top + "px", this.Er.style.left = t.left - i.left + "px";
    } else this.Er.style.top = t.top + window.scrollY + "px", this.Er.style.left = t.left + window.scrollX + "px";
  }
  Xr(t, e) {
    if (this.Lr) {
      const i = this.Dr.getBoundingClientRect();
      this.Er.width = Math.round(i.width), this.Er.height = Math.round(i.height), this.Gr();
    } else this.Er.width = t ?? this.Er.width, this.Er.height = e ?? this.Er.height;
  }
  Yr() {
    const t = this.Er.getContext("webgl2", { alpha: !0, premultipliedAlpha: !1, preserveDrawingBuffer: !0, antialias: !1, depth: !0, stencil: !1, powerPreference: "high-performance" });
    if (!t) throw new U("`textmode.js` requires WebGL2 support.");
    return t;
  }
  gt() {
    const t = this.Er.getContext("webgl") || this.Er.getContext("webgl2");
    if (t) {
      const e = t.getExtension("WEBGL_lose_context");
      e == null || e.loseContext();
    }
    this.Or && this.Er.parentNode && this.Er.parentNode.removeChild(this.Er);
  }
  get canvas() {
    return this.Er;
  }
  get targetCanvas() {
    return this.Dr;
  }
  get width() {
    return this.Er.width;
  }
  get height() {
    return this.Er.height;
  }
}
function $(n) {
  return O(parseInt(n, 16), 0, 255);
}
class M {
  constructor(t, e, i, s) {
    a(this, "jr");
    a(this, "Kr");
    a(this, "r");
    a(this, "g");
    a(this, "b");
    a(this, "a");
    this.r = O(t, 0, 255), this.g = O(e, 0, 255), this.b = O(i, 0, 255), this.a = O(s, 0, 255), this.jr = [this.r, this.g, this.b, this.a], this.Kr = [this.r / 255, this.g / 255, this.b / 255, this.a / 255];
  }
  static Wr(t, e, i, s) {
    if (M.Zr(t)) return t;
    if (Array.isArray(t)) {
      if (t.length < 3) throw Error("Component tuples must include at least RGB values.");
      const [r, h, o] = t, c = t.length === 4 ? t[3] : 255;
      return M.qr(r, h, o, c);
    }
    if (typeof t == "string") {
      const r = t.trim();
      if (r.length === 0) throw Error("Color strings cannot be empty.");
      return M.Vr(r);
    }
    if (typeof t == "number") return typeof e == "number" && typeof i == "number" ? M.qr(t, e, i, s ?? 255) : M.Jr(t);
    throw Error("Unsupported color input passed to TextmodeColor.$from.");
  }
  static qr(t, e, i, s = 255) {
    return new M(t, e, i, s);
  }
  static Jr(t, e = 255) {
    return new M(t, t, t, e);
  }
  static Vr(t) {
    return new M(...function(e) {
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
    return [...this.jr];
  }
  get normalized() {
    return [...this.Kr];
  }
  withAlpha(t) {
    return new M(this.r, this.g, this.b, t);
  }
  static Zr(t) {
    return t instanceof M;
  }
}
const pt = /* @__PURE__ */ new Map();
function Le(n) {
  pt.set(n.id, n);
}
function Je(n) {
  pt.delete(n);
}
function De(n) {
  return pt.get(n);
}
class St {
  constructor(t, e, i, s, r, h, o, c) {
    a(this, "A");
    a(this, "Z");
    a(this, "tn");
    a(this, "sn");
    a(this, "en");
    a(this, "N");
    a(this, "X");
    a(this, "q", null);
    a(this, "rr");
    a(this, "rn", "brightness");
    a(this, "nn", null);
    a(this, "Rt", 0);
    a(this, "Gt", 0);
    a(this, "Qt", 0);
    a(this, "Et", 0);
    a(this, "hn", "sampled");
    a(this, "an", "fixed");
    a(this, "Xt", [1, 1, 1, 1]);
    a(this, "Yt", [0, 0, 0, 1]);
    a(this, "cn", [0, 0, 0, 1]);
    a(this, "ln", [[0.1, 0, 0]]);
    a(this, "un", null);
    a(this, "fn", /* @__PURE__ */ new Set());
    a(this, "dn", [[0, 0, 0, 0]]);
    a(this, "vn", 0);
    this.A = t, this.Z = e, this.tn = i, this.rr = s, this.sn = r, this.en = h, this.N = o, this.X = c;
  }
  conversionMode(t) {
    return this.rn = t, this.nn = null, this.q = null, this;
  }
  gt() {
    this.A.deleteTexture(this.tn);
    for (const t of this.fn) t();
    this.fn.clear();
  }
  pn(t) {
    this.fn.add(t);
  }
  invert(t = !0) {
    return this.Rt = t ? 1 : 0, this.q = null, this;
  }
  flipX(t = !0) {
    return this.Gt = t ? 1 : 0, this.q = null, this;
  }
  flipY(t = !0) {
    return this.Qt = t ? 1 : 0, this.q = null, this;
  }
  charRotation(t) {
    return this.Et = Tt(t), this.q = null, this;
  }
  charColorMode(t) {
    return this.hn = t, this.q = null, this;
  }
  cellColorMode(t) {
    return this.an = t, this.q = null, this;
  }
  charColor(t, e, i, s) {
    return this.gn(this.Xt, t, e, i, s), this.q = null, this;
  }
  cellColor(t, e, i, s) {
    return this.gn(this.Yt, t, e, i, s), this.q = null, this;
  }
  background(t, e, i, s) {
    return this.gn(this.cn, t, e, i, s), this.q = null, this;
  }
  colorFilter(t) {
    if (!t || t.length === 0) return this.vn = 0, this.dn = [[0, 0, 0, 0]], this.q = null, this;
    const e = [];
    for (const i of t) {
      if (e.length >= 64) break;
      let s = M.Wr(i);
      e.push(s.normalized);
    }
    return this.dn = e, this.vn = e.length, this.q = null, this;
  }
  characters(t) {
    return this.un = t, this.mn(t), this.q = null, this;
  }
  _n(t) {
    this.rr = t, this.un && this.mn(this.un), this.q = null;
  }
  get texture() {
    return this.tn;
  }
  get width() {
    return this.N;
  }
  get height() {
    return this.X;
  }
  get originalWidth() {
    return this.sn;
  }
  get originalHeight() {
    return this.en;
  }
  ut() {
    return this.q || this.ft(), this.q;
  }
  yn() {
  }
  ft() {
    this.yn();
    const t = this.An(), e = this.wn(), i = t.createShader(e), s = t.createUniforms(e);
    this.q = this.Z.materialManager.Ni(i, s);
  }
  gn(t, e, i, s, r) {
    const h = M.Wr(e, i, s, r);
    tt(t, h.r, h.g, h.b, h.a);
  }
  mn(t) {
    const e = this.rr.Fr(t).filter((i) => Array.isArray(i)).slice(0, 255);
    this.ln = e.length > 0 ? e : this.ln;
  }
  createBaseConversionUniforms() {
    const t = this.vn > 0;
    return { u_image: this.bn(), u_invert: !!this.Rt, u_flipX: !!this.Gt, u_flipY: !!this.Qt, u_charRotation: this.Et, u_charColorFixed: this.hn === "fixed", u_charColor: this.Xt, u_cellColorFixed: this.an === "fixed", u_cellColor: this.Yt, u_backgroundColor: this.cn, u_charCount: this.ln.length, u_charList: this.ln, u_colorFilterEnabled: t, u_colorFilterSize: t ? this.vn : 0, u_colorFilterPalette: this.dn };
  }
  An() {
    if (this.nn && this.nn.id === this.rn) return this.nn;
    const t = De(this.rn);
    if (!t) throw Error(`[textmode.js] Conversion mode "${this.rn}" is not registered. If this mode is provided by an add-on, make sure its plugin is installed before loading sources.`);
    return this.nn = t, t;
  }
  wn() {
    return { renderer: this.Z, gl: this.A, font: this.rr, source: this, gridWidth: this.N, gridHeight: this.X };
  }
}
class I extends St {
  constructor(t, e, i, s, r, h, o, c) {
    const l = Math.min(o / r, c / h);
    super(t, e, i, s, r, h, Math.max(1, Math.floor(r * l)), Math.max(1, Math.floor(h * l)));
  }
  static Cn(t, e, i, s, r) {
    const h = t.context, o = h.createTexture();
    h.bindTexture(h.TEXTURE_2D, o), h.pixelStorei(h.UNPACK_FLIP_Y_WEBGL, 1), et(h, h.NEAREST, h.NEAREST, h.CLAMP_TO_EDGE, h.CLAMP_TO_EDGE), h.texImage2D(h.TEXTURE_2D, 0, h.RGBA, h.RGBA, h.UNSIGNED_BYTE, i), h.bindTexture(h.TEXTURE_2D, null);
    const c = i.naturalWidth ?? i.width ?? i.videoWidth ?? 0, l = i.naturalHeight ?? i.height ?? i.videoHeight ?? 0;
    return new I(h, t, o, e, c, l, s, r);
  }
  bn() {
    return this.tn;
  }
}
class Lt {
  constructor(t = 60) {
    a(this, "xn");
    a(this, "Mn", null);
    a(this, "Fn", 0);
    a(this, "Pn", !0);
    a(this, "$n", 0);
    a(this, "Tn", 0);
    a(this, "Rn", []);
    a(this, "En", 10);
    a(this, "Sn", 0);
    this.xn = 1e3 / t;
  }
  kn(t) {
    if (!this.Pn) return;
    this.Fn = performance.now();
    const e = (i) => {
      if (!this.Pn) return void (this.Mn = null);
      const s = i - this.Fn;
      s >= this.xn && (t(), this.Fn = i - s % this.xn), this.Pn && (this.Mn = requestAnimationFrame(e));
    };
    this.Mn = requestAnimationFrame(e);
  }
  zn() {
    this.Mn && (cancelAnimationFrame(this.Mn), this.Mn = null);
  }
  Dn() {
    this.Pn && (this.Pn = !1, this.zn());
  }
  Ln(t) {
    this.Pn || (this.Pn = !0, this.kn(t));
  }
  On(t, e) {
    if (t === void 0) return this.$n;
    this.xn = 1e3 / t, this.Pn && e && (this.zn(), this.kn(e));
  }
  In() {
    const t = performance.now();
    if (this.Tn > 0) {
      const e = t - this.Tn;
      this.Rn.push(e), this.Rn.length > this.En && this.Rn.shift();
      const i = this.Rn.reduce((s, r) => s + r, 0) / this.Rn.length;
      this.$n = 1e3 / i;
    }
    this.Tn = t;
  }
  get Bn() {
    return this.Pn;
  }
  get Hn() {
    return this.$n;
  }
  get Gn() {
    return this.Sn;
  }
  set Gn(t) {
    this.Sn = t;
  }
  Qn() {
    this.Sn++;
  }
}
class Dt {
  constructor(t) {
    a(this, "Er");
    a(this, "Nn");
    a(this, "Xn", { x: -1, y: -1 });
    a(this, "Yn", { x: -1, y: -1 });
    a(this, "jn", null);
    a(this, "Kn", 0);
    a(this, "Wn");
    a(this, "Zn");
    a(this, "qn");
    a(this, "Vn");
    a(this, "Jn");
    a(this, "th");
    a(this, "sh", !1);
    a(this, "ih");
    a(this, "eh");
    a(this, "rh");
    a(this, "nh");
    a(this, "hh");
    this.Er = t;
  }
  oh(t) {
    const e = performance.now() + Math.max(0, t);
    e > this.Kn && (this.Kn = e);
  }
  ah() {
    return performance.now() < this.Kn;
  }
  uh(t) {
    const e = this.Er.canvas;
    e.style.cursor = t == null || t === "" ? "" : t;
  }
  yr(t) {
    this.Nn = t, this.fh();
  }
  dh() {
    if (this.sh) return;
    const t = this.Er.canvas;
    this.Wn = (e) => {
      this.ph(e), this.gh(e);
    }, this.Zn = () => {
      this.Yn = { ...this.Xn }, this.Xn.x = -1, this.Xn.y = -1, this.jn = null;
    }, this.qn = (e) => {
      this.ph(e), this.mh(e);
    }, this.Vn = (e) => {
      this.ph(e), this._h(e);
    }, this.Jn = (e) => {
      this.ph(e), this.yh(e);
    }, this.th = (e) => {
      this.ph(e), this.Ah(e);
    }, t.addEventListener("mousemove", this.Wn, { passive: !0 }), t.addEventListener("mouseleave", this.Zn, { passive: !0 }), t.addEventListener("mousedown", this.qn, { passive: !0 }), t.addEventListener("mouseup", this.Vn, { passive: !0 }), t.addEventListener("click", this.Jn, { passive: !0 }), t.addEventListener("wheel", this.th, { passive: !1 }), this.sh = !0;
  }
  wh() {
    if (!this.sh) return;
    const t = this.Er.canvas;
    t.removeEventListener("mousemove", this.Wn), t.removeEventListener("mouseleave", this.Zn), t.removeEventListener("mousedown", this.qn), t.removeEventListener("mouseup", this.Vn), t.removeEventListener("click", this.Jn), t.removeEventListener("wheel", this.th), this.sh = !1;
  }
  fh() {
    if (this.sh) try {
      if (this.jn) {
        const t = new MouseEvent("mousemove", { clientX: this.jn.x, clientY: this.jn.y, bubbles: !1, cancelable: !1 });
        this.ph(t);
      } else this.Xn.x !== -1 && this.Xn.y !== -1 && (this.Xn.x >= this.Nn.cols || this.Xn.y >= this.Nn.rows) && (this.Xn.x = -1, this.Xn.y = -1);
    } catch {
      this.Xn.x = -1, this.Xn.y = -1;
    }
  }
  bh(t) {
    this.ih = t;
  }
  Ch(t) {
    this.eh = t;
  }
  xh(t) {
    this.rh = t;
  }
  Mh(t) {
    this.nh = t;
  }
  Fh(t) {
    this.hh = t;
  }
  Ph() {
    return { x: this.Xn.x, y: this.Xn.y };
  }
  gh(t) {
    if (this.nh && !this.ah()) {
      const e = { position: { ...this.Xn }, previousPosition: { ...this.Yn }, originalEvent: t };
      this.nh(e);
    }
  }
  mh(t) {
    if (this.eh && !this.ah()) {
      const e = { position: { ...this.Xn }, previousPosition: { ...this.Yn }, button: t.button, originalEvent: t };
      this.eh(e);
    }
  }
  _h(t) {
    if (this.rh && !this.ah()) {
      const e = { position: { ...this.Xn }, previousPosition: { ...this.Yn }, button: t.button, originalEvent: t };
      this.rh(e);
    }
  }
  yh(t) {
    if (this.ih && !this.ah()) {
      const e = { position: { ...this.Xn }, previousPosition: { ...this.Yn }, button: t.button, originalEvent: t };
      this.ih(e);
    }
  }
  Ah(t) {
    if (this.hh && !this.ah()) {
      const e = { position: { ...this.Xn }, previousPosition: { ...this.Yn }, delta: { x: t.deltaX, y: t.deltaY }, originalEvent: t };
      this.hh(e);
    }
  }
  ph(t) {
    const e = this.Er.canvas;
    this.Yn = { ...this.Xn }, this.jn = { x: t.clientX, y: t.clientY };
    const i = e.getBoundingClientRect(), s = t.clientX - i.left, r = t.clientY - i.top, h = e.width / i.width, o = r * (e.height / i.height), c = s * h - this.Nn.offsetX, l = o - this.Nn.offsetY, u = Math.floor(c / this.Nn.cellWidth), f = Math.floor(l / this.Nn.cellHeight);
    u >= 0 && u < this.Nn.cols && f >= 0 && f < this.Nn.rows ? (this.Xn.x = u, this.Xn.y = f) : (this.Xn.x = -1, this.Xn.y = -1);
  }
}
const Ze = Object.freeze(Object.defineProperty({ __proto__: null, MouseManager: Dt }, Symbol.toStringTag, { value: "Module" }));
class Zt {
  constructor() {
    a(this, "$h", /* @__PURE__ */ new Map());
    a(this, "Th", null);
    a(this, "Rh", null);
    a(this, "Eh");
    a(this, "Sh");
    a(this, "sh", !1);
    a(this, "kh");
    a(this, "zh");
    a(this, "Dh", { ArrowUp: "UP_ARROW", ArrowDown: "DOWN_ARROW", ArrowLeft: "LEFT_ARROW", ArrowRight: "RIGHT_ARROW", F1: "F1", F2: "F2", F3: "F3", F4: "F4", F5: "F5", F6: "F6", F7: "F7", F8: "F8", F9: "F9", F10: "F10", F11: "F11", F12: "F12", Enter: "ENTER", Return: "RETURN", Tab: "TAB", Escape: "ESCAPE", Backspace: "BACKSPACE", Delete: "DELETE", Insert: "INSERT", Home: "HOME", End: "END", PageUp: "PAGE_UP", PageDown: "PAGE_DOWN", Shift: "SHIFT", Control: "CONTROL", Alt: "ALT", Meta: "META", " ": "SPACE" });
  }
  dh() {
    this.sh || (this.Eh = (t) => {
      this.Lh(t);
    }, this.Sh = (t) => {
      this.Oh(t);
    }, window.addEventListener("keydown", this.Eh, { passive: !1 }), window.addEventListener("keyup", this.Sh, { passive: !1 }), this.sh = !0);
  }
  wh() {
    this.sh && (window.removeEventListener("keydown", this.Eh), window.removeEventListener("keyup", this.Sh), this.sh = !1, this.$h.clear(), this.Th = null, this.Rh = null);
  }
  Ch(t) {
    this.kh = t;
  }
  xh(t) {
    this.zh = t;
  }
  Ih(t) {
    const e = this.Bh(t), i = this.$h.get(t) || this.$h.get(e);
    return (i == null ? void 0 : i.isPressed) || !1;
  }
  Hh() {
    return this.Th;
  }
  Gh() {
    return this.Rh;
  }
  Qh() {
    const t = [];
    for (const [e, i] of this.$h) i.isPressed && t.push(e);
    return t;
  }
  Nh() {
    return { ctrl: this.Ih("Control"), shift: this.Ih("Shift"), alt: this.Ih("Alt"), meta: this.Ih("Meta") };
  }
  Xh() {
    this.$h.clear(), this.Th = null, this.Rh = null;
  }
  Lh(t) {
    const e = t.key, i = Date.now();
    this.$h.has(e) || this.$h.set(e, { isPressed: !1, lastPressTime: 0, lastReleaseTime: 0 });
    const s = this.$h.get(e);
    if (!s.isPressed && (s.isPressed = !0, s.lastPressTime = i, this.Th = e, this.kh)) {
      const r = { key: e, keyCode: t.keyCode, ctrlKey: t.ctrlKey, shiftKey: t.shiftKey, altKey: t.altKey, metaKey: t.metaKey, isPressed: !0, originalEvent: t };
      this.kh(r);
    }
  }
  Oh(t) {
    const e = t.key, i = Date.now();
    this.$h.has(e) || this.$h.set(e, { isPressed: !1, lastPressTime: 0, lastReleaseTime: 0 });
    const s = this.$h.get(e);
    if (s.isPressed = !1, s.lastReleaseTime = i, this.Rh = e, this.zh) {
      const r = { key: e, keyCode: t.keyCode, ctrlKey: t.ctrlKey, shiftKey: t.shiftKey, altKey: t.altKey, metaKey: t.metaKey, isPressed: !1, originalEvent: t };
      this.zh(r);
    }
  }
  Bh(t) {
    return this.Dh[t] || t.toLowerCase();
  }
}
const Be = Object.freeze(Object.defineProperty({ __proto__: null, KeyboardManager: Zt }, Symbol.toStringTag, { value: "Module" }));
class Bt {
  constructor(t, e) {
    a(this, "Er");
    a(this, "Yh");
    a(this, "Nn");
    a(this, "jh", /* @__PURE__ */ new Map());
    a(this, "Kh", /* @__PURE__ */ new Map());
    a(this, "Wh", /* @__PURE__ */ new Map());
    a(this, "Zh", null);
    a(this, "qh");
    a(this, "Vh");
    a(this, "Jh");
    a(this, "so");
    a(this, "io");
    a(this, "eo");
    a(this, "sh", !1);
    a(this, "ro");
    a(this, "no");
    a(this, "ho");
    a(this, "oo");
    a(this, "ao");
    a(this, "co");
    a(this, "lo");
    a(this, "uo");
    a(this, "fo");
    a(this, "do");
    a(this, "vo", 320);
    a(this, "po", 350);
    a(this, "mo", 10);
    a(this, "_o", 550);
    a(this, "yo", 14);
    a(this, "Ao", 48);
    a(this, "wo", 650);
    a(this, "bo", 0.02);
    a(this, "Co", 2);
    a(this, "xo", 600);
    a(this, "Mo", 0);
    a(this, "Fo", null);
    this.Er = t, this.Yh = e;
    const i = this.Er.canvas;
    this.qh = i.style.touchAction, this.Vh = i.style.userSelect, i.style.touchAction || (i.style.touchAction = "none"), i.style.userSelect || (i.style.userSelect = "none");
  }
  yr(t) {
    this.Nn = t, this.fh();
  }
  dh() {
    if (this.sh) return;
    const t = this.Er.canvas;
    this.Jh = (e) => {
      this.Po(e);
    }, this.so = (e) => {
      this.$o(e);
    }, this.io = (e) => {
      this.To(e);
    }, this.eo = (e) => {
      this.Ro(e);
    }, t.addEventListener("touchstart", this.Jh, { passive: !1 }), t.addEventListener("touchmove", this.so, { passive: !1 }), t.addEventListener("touchend", this.io, { passive: !1 }), t.addEventListener("touchcancel", this.eo, { passive: !1 }), this.sh = !0;
  }
  wh() {
    if (!this.sh) return;
    const t = this.Er.canvas;
    t.removeEventListener("touchstart", this.Jh), t.removeEventListener("touchmove", this.so), t.removeEventListener("touchend", this.io), t.removeEventListener("touchcancel", this.eo), this.sh = !1, this.Zh = null, this.jh.clear(), this.Kh.clear(), this.Wh.forEach((e) => {
      e.longPressTimer !== null && window.clearTimeout(e.longPressTimer);
    }), this.Wh.clear(), this.Fo = null, this.Mo = 0, t.style.touchAction = this.qh, t.style.userSelect = this.Vh;
  }
  fh() {
    if (!this.Nn || this.jh.size === 0) return;
    const t = /* @__PURE__ */ new Map();
    for (const e of this.jh.values()) {
      const i = this.Eo(e.clientX, e.clientY, e.id, e);
      t.set(e.id, i);
    }
    this.jh = t;
  }
  So() {
    return Array.from(this.jh.values()).map((t) => ({ ...t }));
  }
  ko(t) {
    this.ro = t;
  }
  Mh(t) {
    this.no = t;
  }
  zo(t) {
    this.ho = t;
  }
  Do(t) {
    this.oo = t;
  }
  Lo(t) {
    this.ao = t;
  }
  Oo(t) {
    this.co = t;
  }
  Io(t) {
    this.lo = t;
  }
  Bo(t) {
    this.uo = t;
  }
  Ho(t) {
    this.fo = t;
  }
  Go(t) {
    this.do = t;
  }
  Po(t) {
    var s;
    if (!this.Nn) return;
    t.preventDefault(), (s = this.Yh) == null || s.oh(this.xo);
    const e = performance.now(), i = this.Qo(t.changedTouches);
    for (const r of i) {
      const h = this.jh.get(r.id);
      h && this.Kh.set(r.id, this.No(h)), this.jh.set(r.id, r);
      const o = { id: r.id, startPosition: r, lastPosition: r, startTime: e, lastTime: e, longPressTimer: null, longPressFired: !1 };
      this.lo && (o.longPressTimer = window.setTimeout(() => {
        const c = this.jh.get(r.id);
        c && (o.longPressFired = !0, this.lo({ touch: this.No(c), duration: performance.now() - o.startTime, originalEvent: t }));
      }, this._o)), this.Wh.set(r.id, o), this.ro && this.ro(this.Xo(r, t, void 0, e));
    }
    this.jh.size === 2 && this.Yo();
  }
  $o(t) {
    var s;
    if (!this.Nn) return;
    t.preventDefault(), (s = this.Yh) == null || s.oh(this.xo);
    const e = performance.now(), i = this.Qo(t.changedTouches);
    for (const r of i) {
      const h = this.jh.get(r.id), o = h ? this.No(h) : void 0;
      o && this.Kh.set(r.id, o), this.jh.set(r.id, r);
      const c = this.Wh.get(r.id);
      c && (c.lastPosition = r, c.lastTime = e, o) && z(o.clientX, o.clientY, r.clientX, r.clientY) > this.yo && c.longPressTimer !== null && (window.clearTimeout(c.longPressTimer), c.longPressTimer = null), this.no && this.no(this.Xo(r, t, o, e));
    }
    this.jh.size === 2 ? this.jo(t) : this.Zh = null;
  }
  To(t) {
    if (!this.Nn) return;
    t.preventDefault();
    const e = performance.now(), i = this.Qo(t.changedTouches);
    for (const s of i) {
      const r = this.jh.get(s.id), h = r ? this.No(r) : void 0, o = this.Wh.get(s.id);
      o && o.longPressTimer !== null && (window.clearTimeout(o.longPressTimer), o.longPressTimer = null), this.ho && this.ho(this.Xo(s, t, h, e)), o && this.Ko(o, t), this.Wh.delete(s.id), this.Kh.delete(s.id), this.jh.delete(s.id);
    }
    this.jh.size < 2 && (this.Zh = null);
  }
  Ro(t) {
    if (!this.Nn) return;
    t.preventDefault();
    const e = performance.now(), i = this.Qo(t.changedTouches);
    for (const s of i) {
      const r = this.jh.get(s.id), h = r ? this.No(r) : void 0, o = this.Wh.get(s.id);
      o && o.longPressTimer !== null && (window.clearTimeout(o.longPressTimer), o.longPressTimer = null), this.oo && this.oo(this.Xo(s, t, h, e)), this.Wh.delete(s.id), this.Kh.delete(s.id), this.jh.delete(s.id);
    }
    this.jh.size < 2 && (this.Zh = null);
  }
  Qo(t) {
    const e = [];
    for (let i = 0; i < t.length; i += 1) {
      const s = t.item(i);
      s && e.push(this.Wo(s));
    }
    return e;
  }
  Wo(t) {
    return this.Eo(t.clientX, t.clientY, t.identifier, { id: t.identifier, x: -1, y: -1, clientX: t.clientX, clientY: t.clientY, pressure: t.force, radiusX: t.radiusX, radiusY: t.radiusY, rotationAngle: t.rotationAngle });
  }
  Eo(t, e, i, s) {
    const r = this.Er.canvas, h = r.getBoundingClientRect(), o = t - h.left, c = e - h.top, l = r.width / h.width, u = c * (r.height / h.height), f = o * l - this.Nn.offsetX, g = u - this.Nn.offsetY, m = Math.floor(f / this.Nn.cellWidth), d = Math.floor(g / this.Nn.cellHeight), v = m >= 0 && m < this.Nn.cols && d >= 0 && d < this.Nn.rows;
    return { id: i, x: v ? m : -1, y: v ? d : -1, clientX: t, clientY: e, pressure: s.pressure, radiusX: s.radiusX, radiusY: s.radiusY, rotationAngle: s.rotationAngle };
  }
  Xo(t, e, i, s) {
    const r = this.Wh.get(t.id), h = Array.from(this.Kh.values()).map((l) => this.No(l)), o = Array.from(this.jh.values()).map((l) => this.No(l)), c = this.Qo(e.changedTouches);
    return { touch: this.No(t), previousTouch: i ? this.No(i) : void 0, touches: o, previousTouches: h, changedTouches: c, deltaTime: r ? s - r.lastTime : 0, originalEvent: e };
  }
  Yo() {
    if (this.jh.size !== 2) return void (this.Zh = null);
    const t = Array.from(this.jh.values()), [e, i] = t, s = z(e.x, e.y, i.x, i.y), r = Et(e.clientX, e.clientY, i.clientX, i.clientY);
    this.Zh = { ids: [e.id, i.id], initialDistance: Math.max(s, 1e-4), initialAngle: r, lastScale: 1, lastRotation: 0 };
  }
  jo(t) {
    if (this.Zh || this.Yo(), !this.Zh) return;
    const [e, i] = this.Zh.ids, s = this.jh.get(e), r = this.jh.get(i);
    if (!s || !r) return;
    const h = z(s.x, s.y, r.x, r.y) / this.Zh.initialDistance, o = h - this.Zh.lastScale;
    this.fo && Math.abs(o) > this.bo && (this.fo({ touches: [this.No(s), this.No(r)], scale: h, deltaScale: o, center: this.Zo(s, r), originalEvent: t }), this.Zh.lastScale = h);
    let c = Et(s.clientX, s.clientY, r.clientX, r.clientY) - this.Zh.initialAngle;
    c = (c + 180) % 360 - 180;
    const l = c - this.Zh.lastRotation;
    this.do && Math.abs(l) > this.Co && (this.do({ touches: [this.No(s), this.No(r)], rotation: c, deltaRotation: l, center: this.Zo(s, r), originalEvent: t }), this.Zh.lastRotation = c);
  }
  Zo(t, e) {
    const i = (t.clientX + e.clientX) / 2, s = (t.clientY + e.clientY) / 2, r = this.Eo(i, s, -1, { id: -1, x: -1, y: -1, clientX: i, clientY: s });
    return { x: r.x, y: r.y };
  }
  Ko(t, e) {
    const i = performance.now(), s = i - t.startTime, r = z(t.startPosition.clientX, t.startPosition.clientY, t.lastPosition.clientX, t.lastPosition.clientY);
    if (!t.longPressFired && s <= this.vo && r <= this.mo)
      this.qo(t.lastPosition, i) && this.co ? this.co({ touch: this.No(t.lastPosition), taps: 2, originalEvent: e }) : this.ao && this.ao({ touch: this.No(t.lastPosition), taps: 1, originalEvent: e });
    else if (!t.longPressFired && s <= this.wo && r >= this.Ao) {
      const h = { x: t.lastPosition.clientX - t.startPosition.clientX, y: t.lastPosition.clientY - t.startPosition.clientY }, o = Math.max(Math.hypot(h.x, h.y), 1e-4), c = { x: h.x / o, y: h.y / o }, l = { x: h.x / s, y: h.y / s };
      this.uo && this.uo({ touch: this.No(t.lastPosition), direction: c, distance: o, velocity: l, originalEvent: e });
    }
    this.Mo = i, this.Fo = this.No(t.lastPosition);
  }
  qo(t, e) {
    return !this.Fo || e - this.Mo > this.po ? !1 : z(t.clientX, t.clientY, this.Fo.clientX, this.Fo.clientY) <= this.mo;
  }
  No(t) {
    return { ...t };
  }
}
const _e = Object.freeze(Object.defineProperty({ __proto__: null, TouchManager: Bt }, Symbol.toStringTag, { value: "Module" }));
class Oe {
  constructor(t, e) {
    a(this, "A");
    a(this, "Vo");
    a(this, "$n", null);
    a(this, "Jo", 0);
    a(this, "ta", !1);
    a(this, "sa", []);
    a(this, "ia", -1);
    this.A = t, this.Vo = e;
  }
  get isPreloaded() {
    return this.ta;
  }
  get totalFrames() {
    return this.Jo;
  }
  get frameRate() {
    return this.$n;
  }
  get textures() {
    return this.sa;
  }
  dispose() {
    this.ea(), this.sa = [], this.$n = null, this.Jo = 0, this.ta = !1, this.ia = -1;
  }
  async preload(t, e) {
    var i;
    try {
      if (t <= 0) throw Error("Video preload requires a frameRate greater than 0.");
      const s = this.Vo.duration;
      if (!isFinite(s) || s <= 0) throw Error("Video duration is invalid, cannot preload frames.");
      const r = Math.max(1, Math.ceil(s * t));
      return this.ra(t, r), await this.na(t, e) ? (this.ha("captureStream", e), "captureStream") : (await this.oa(t, e), this.ha("seeking", e), "seeking");
    } catch (s) {
      const r = s instanceof Error ? s : Error(s + "");
      throw (i = e == null ? void 0 : e.onError) == null || i.call(e, r), this.dispose(), r;
    }
  }
  ra(t, e) {
    this.ea(), this.$n = t, this.Jo = e, this.sa = [], this.ta = !1, this.ia = -1;
  }
  ha(t, e) {
    var i;
    if (this.sa.length === 0) throw Error(`Video preload via ${t} completed but produced 0 frames.`);
    this.Jo = this.sa.length, this.ta = !0, this.ia = -1, this.Vo.pause(), this.Vo.currentTime = 0, e != null && e.onProgress && e.onProgress({ percent: 100, loadedFrames: this.Jo, totalFrames: this.Jo, strategy: t }), (i = e == null ? void 0 : e.onComplete) == null || i.call(e, { totalFrames: this.Jo, strategy: t });
  }
  aa(t) {
    const e = this.A, i = e.createTexture();
    return e.bindTexture(e.TEXTURE_2D, i), e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL, 1), et(e, e.LINEAR, e.LINEAR, e.CLAMP_TO_EDGE, e.CLAMP_TO_EDGE), e.texImage2D(e.TEXTURE_2D, 0, e.RGBA, e.RGBA, e.UNSIGNED_BYTE, t), e.bindTexture(e.TEXTURE_2D, null), i;
  }
  ca(t, e) {
    if (!(e != null && e.onProgress) || this.Jo === 0) return;
    const i = Math.min(99, Math.floor(this.sa.length / this.Jo * 100)), s = 10 * Math.floor(i / 10);
    s > this.ia && (this.ia = s, e.onProgress({ percent: i, loadedFrames: this.sa.length, totalFrames: this.Jo, strategy: t }));
  }
  async na(t, e) {
    const i = globalThis, s = i == null ? void 0 : i.MediaStreamTrackProcessor, r = this.Vo.captureStream;
    if (typeof s != "function" || typeof r != "function") return !1;
    let h, o = null;
    try {
      const c = r.call(this.Vo);
      if (h = c.getVideoTracks()[0], !h) return c.getTracks().forEach((f) => f.stop()), !1;
      if (o = new s({ track: h }).readable.getReader(), this.Vo.currentTime = 0, this.Vo.muted = !0, await this.Vo.play().catch(() => {
      }), this.Vo.paused) return !1;
      const l = 1e6 / t;
      let u = 0;
      for (; this.sa.length < this.Jo; ) {
        const f = await o.read();
        if (f.done) break;
        const g = f.value;
        if (g) try {
          const m = typeof g.timestamp == "number" ? g.timestamp : u;
          (this.sa.length === 0 || m >= u) && (this.sa.push(this.aa(g)), u = m + l, this.ca("captureStream", e));
        } finally {
          g.close();
        }
      }
      return o.releaseLock(), h.stop(), o = null, h = void 0, this.Vo.pause(), this.Vo.currentTime = 0, this.sa.length !== 0;
    } catch {
      return this.ea(), this.sa = [], this.ia = -1, !1;
    } finally {
      if (o) try {
        await o.cancel();
      } catch {
      }
      h && h.stop(), this.Vo.pause(), this.Vo.currentTime = 0;
    }
  }
  async oa(t, e) {
    const i = 1 / t, s = this.Jo, r = this.Vo;
    r.pause();
    for (let h = 0; h < s; h++) {
      const o = Math.min(r.duration, h * i);
      await this.la(o), this.sa.push(this.aa(r)), this.ca("seeking", e);
    }
    r.currentTime = 0;
  }
  la(t) {
    return new Promise((e, i) => {
      const s = this.Vo, r = () => {
        s.removeEventListener("seeked", h), s.removeEventListener("error", o);
      }, h = () => {
        r(), e();
      }, o = () => {
        r(), i(Error("Video seek failed while preloading frames."));
      };
      s.addEventListener("seeked", h, { once: !0 }), s.addEventListener("error", o, { once: !0 });
      const c = isFinite(s.duration) ? s.duration : t, l = Math.min(Math.max(t, 0), c);
      if (Math.abs(s.currentTime - l) < 1e-4) return r(), void e();
      s.currentTime = l;
    });
  }
  ea() {
    for (const t of this.sa) this.A.deleteTexture(t);
  }
}
class rt extends St {
  constructor(e, i, s, r, h, o, c, l, u) {
    const f = o / c;
    let g, m;
    f > 1 ? (g = l, m = Math.round(l / f)) : (m = u, g = Math.round(u * f));
    super(e, i, s, r, o, c, g, m);
    a(this, "Vo");
    a(this, "ua", 0);
    a(this, "fa", null);
    this.Vo = h;
  }
  gt() {
    var e;
    super.gt(), (e = this.fa) == null || e.dispose(), this.fa = null, this.Vo.pause(), this.Vo.src = "", this.Vo.load();
  }
  da() {
    var e;
    if (!((e = this.fa) != null && e.isPreloaded) && this.Vo.readyState >= this.Vo.HAVE_CURRENT_DATA) {
      const i = this.A;
      i.bindTexture(i.TEXTURE_2D, this.tn), i.texImage2D(i.TEXTURE_2D, 0, i.RGBA, i.RGBA, i.UNSIGNED_BYTE, this.Vo), i.bindTexture(i.TEXTURE_2D, null);
    }
  }
  bn() {
    var i, s;
    const e = (i = this.fa) == null ? void 0 : i.textures;
    return e && e.length > 0 && ((s = this.fa) != null && s.isPreloaded) ? e[this.ua % e.length] : this.tn;
  }
  ut() {
    return this.q = null, super.ut();
  }
  yn() {
    this.da();
  }
  frame(e) {
    var s, r;
    const i = ((s = this.fa) == null ? void 0 : s.totalFrames) ?? 0;
    return (r = this.fa) != null && r.isPreloaded && e !== void 0 && i > 0 && (this.ua = (e % i + i) % i, this.q = null), this;
  }
  static async Cn(e, i, s, r, h, o) {
    const c = e.context, l = o == null ? void 0 : o.frameRate;
    let u;
    u = document.createElement("video"), u.crossOrigin = "anonymous", u.loop = !0, u.muted = !0, u.playsInline = !0, await new Promise((v, A) => {
      u.addEventListener("loadedmetadata", () => v(), { once: !0 }), u.addEventListener("error", (p) => {
        var E;
        const y = p.target;
        A(Error("Failed to load video: " + (((E = y.error) == null ? void 0 : E.message) || "Unknown error")));
      }, { once: !0 }), u.src = s;
    });
    const f = c.createTexture();
    c.bindTexture(c.TEXTURE_2D, f), c.pixelStorei(c.UNPACK_FLIP_Y_WEBGL, 1), et(c, c.LINEAR, c.LINEAR, c.CLAMP_TO_EDGE, c.CLAMP_TO_EDGE), c.texImage2D(c.TEXTURE_2D, 0, c.RGBA, c.RGBA, c.UNSIGNED_BYTE, u), c.bindTexture(c.TEXTURE_2D, null);
    const g = u.videoWidth, m = u.videoHeight, d = new rt(c, e, f, i, u, g, m, r, h);
    return l && l > 0 && (d.fa = new Oe(c, u), await d.fa.preload(l, o), d.ua = 0), d;
  }
  async play() {
    await this.Vo.play();
  }
  pause() {
    this.Vo.pause();
  }
  stop() {
    this.Vo.pause(), this.Vo.currentTime = 0;
  }
  speed(e) {
    return this.Vo.playbackRate = e, this;
  }
  loop(e = !0) {
    return this.Vo.loop = e, this;
  }
  time(e) {
    return this.Vo.currentTime = e, this;
  }
  volume(e) {
    return this.Vo.volume = Math.max(0, Math.min(1, e)), this;
  }
  get texture() {
    return this.tn;
  }
  get width() {
    return this.N;
  }
  get height() {
    return this.X;
  }
  get originalWidth() {
    return this.sn;
  }
  get originalHeight() {
    return this.en;
  }
  get videoElement() {
    return this.Vo;
  }
  get currentTime() {
    return this.Vo.currentTime;
  }
  get duration() {
    return this.Vo.duration;
  }
  get isPlaying() {
    return !this.Vo.paused && !this.Vo.ended;
  }
  get totalFrames() {
    var e;
    return ((e = this.fa) == null ? void 0 : e.totalFrames) ?? 0;
  }
}
const Xe = (n) => class extends n {
  va(t, e, i, s) {
    if (M.Zr(t)) return t;
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
    this.Z.state.ht();
  }
  pop() {
    this.Z.state.ot();
  }
  color(t, e, i, s) {
    return M.Wr(t, e, i, s);
  }
  rect(t = 1, e = 1) {
    this.Z.we(t, e);
  }
  point() {
    this.Z.we(1, 1);
  }
  line(t, e, i, s) {
    this.Z.be(t, e, i, s);
  }
  lineWeight(t) {
    this.Z.state.Zt(t);
  }
  background(t, e, i, s = 255) {
    const r = this.va(t, e, i, s);
    this.Z.$e(r.r, r.g, r.b, r.a);
  }
  char(t) {
    const e = Array.from(t);
    if (e.length === 0) throw Error("char() requires at least one character.");
    this.Z.state.hs(this.rr.Mr(e[0]));
  }
  charColor(t, e, i, s) {
    const r = this.va(t, e, i, s);
    this.Z.state.cs(r.r, r.g, r.b, r.a);
  }
  cellColor(t, e, i, s) {
    const r = this.va(t, e, i, s);
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
    this.Z.Ce(t / 2, e / 2);
  }
  triangle(t, e, i, s, r, h) {
    this.Z.xe(t, e, i, s, r, h);
  }
  bezierCurve(t, e, i, s, r, h, o, c) {
    this.Z.Me(t, e, i, s, r, h, o, c);
  }
  arc(t, e, i, s) {
    this.Z.Fe(t / 2, e / 2, i, s);
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
    this.Z.ye(t, e, i), t instanceof H && this.Z.ct();
  }
  ortho() {
    this.Z.state.gs(!0);
  }
  async loadImage(t) {
    if (typeof t != "string") {
      const r = I.Cn(this.Z, this.rr, t, this.Nn.cols, this.Nn.rows);
      return this.pa(r), r;
    }
    const e = t, i = await new Promise((r, h) => {
      const o = new Image();
      o.crossOrigin = "anonymous", o.onload = () => r(o), o.onerror = (c) => h(c), o.src = e;
    }), s = I.Cn(this.Z, this.rr, i, this.Nn.cols, this.Nn.rows);
    return this.pa(s), s;
  }
  async loadVideo(t, e) {
    const i = await rt.Cn(this.Z, this.rr, t, this.Nn.cols, this.Nn.rows, e);
    return this.pa(i), i;
  }
}, Ie = (n) => class extends n {
  async loadFont(t) {
    return this.rr.Cr(t).then(() => {
      const e = this.rr.maxGlyphDimensions;
      this.Nn.zr(e.width, e.height), this.ga.resize(this.Nn.cols, this.Nn.rows), this.Z.Re(), this.Yh.fh(), this.ma.fh();
      for (const i of this._a) i._n(this.rr);
    });
  }
  fontSize(t) {
    if (!mt.m(typeof t == "number" && t > 0, "Font size must be a positive number greater than 0.", { method: "fontSize", providedValue: t }) || this.rr.fontSize === t) return;
    this.rr.br(t);
    const e = this.rr.maxGlyphDimensions;
    this.Nn.zr(e.width, e.height), this.ga.resize(this.Nn.cols, this.Nn.rows), this.Z.Re(), this.Yh.fh(), this.ma.fh();
  }
}, Ye = (n) => class extends n {
  get frameCount() {
    return this.ya.Gn;
  }
  set frameCount(t) {
    this.ya.Gn = t;
  }
  frameRate(t) {
    return t === void 0 ? this.ya.Hn : this.ya.On(t, () => this.wa());
  }
  noLoop() {
    this.ya.Dn();
  }
  loop() {
    this.ya.Ln(() => this.wa());
  }
  redraw(t = 1) {
    if (mt.m(typeof t == "number" && t > 0 && Number.isInteger(t), "Redraw count must be a positive integer.", { method: "redraw", providedValue: t })) for (let e = 0; e < t; e++) this.wa();
  }
  isLooping() {
    return this.ya.Bn;
  }
}, ze = (n) => class extends n {
  constructor(...t) {
    super(...t);
  }
  mouseClicked(t) {
    this.Yh.bh(t);
  }
  mousePressed(t) {
    this.Yh.Ch(t);
  }
  mouseReleased(t) {
    this.Yh.xh(t);
  }
  mouseMoved(t) {
    this.Yh.Mh(t);
  }
  mouseScrolled(t) {
    this.Yh.Fh(t);
  }
  get mouse() {
    return this.Yh.Ph();
  }
  cursor(t) {
    this.Yh.uh(t);
  }
}, Ve = (n) => class extends n {
  constructor(...t) {
    super(...t);
  }
  touchStarted(t) {
    this.ma.ko(t);
  }
  touchMoved(t) {
    this.ma.Mh(t);
  }
  touchEnded(t) {
    this.ma.zo(t);
  }
  touchCancelled(t) {
    this.ma.Do(t);
  }
  tap(t) {
    this.ma.Lo(t);
  }
  doubleTap(t) {
    this.ma.Oo(t);
  }
  longPress(t) {
    this.ma.Io(t);
  }
  swipe(t) {
    this.ma.Bo(t);
  }
  pinch(t) {
    this.ma.Ho(t);
  }
  rotateGesture(t) {
    this.ma.Go(t);
  }
  get touches() {
    return this.ma.So();
  }
}, Ge = (n) => class extends n {
  constructor(...t) {
    super(...t);
  }
  keyPressed(t) {
    this.ba.Ch(t);
  }
  keyReleased(t) {
    this.ba.xh(t);
  }
  isKeyPressed(t) {
    return this.ba.Ih(t);
  }
  get lastKeyPressed() {
    return this.ba.Hh();
  }
  get lastKeyReleased() {
    return this.ba.Gh();
  }
  get pressedKeys() {
    return this.ba.Qh();
  }
  get modifierState() {
    return this.ba.Nh();
  }
};
class ke {
  constructor(t) {
    a(this, "Ca");
    a(this, "xa", /* @__PURE__ */ new Map());
    a(this, "Ma", []);
    a(this, "Fa", /* @__PURE__ */ new Map());
    a(this, "Pa", /* @__PURE__ */ new Map());
    this.Ca = t;
  }
  async $a(t) {
    for (const e of t) {
      if (this.xa.has(e.name)) return void console.warn(`[textmode.js] Plugin "${e.name}" is already installed.`);
      const i = this.Ta(e.name);
      try {
        await e.install(this.Ca, i);
      } catch (s) {
        throw this.Ra(e.name), s;
      }
      this.xa.set(e.name, e), this.Ma.push(e.name);
    }
  }
  async Ea(t) {
    const e = this.xa.get(t);
    if (!e) return;
    const i = this.Ta(t);
    e.uninstall && await e.uninstall(this.Ca, i), this.xa.delete(t), this.Ma.splice(this.Ma.indexOf(t), 1), this.Ra(t);
  }
  Sa() {
    this.ka(this.Fa);
  }
  za() {
    this.ka(this.Pa);
  }
  async Da() {
    const t = [...this.xa.keys()];
    for (const e of t) await this.Ea(e);
  }
  Ta(t) {
    return { renderer: this.Ca.Z, font: this.Ca.rr, grid: this.Ca.Nn, canvas: this.Ca.Er, drawFramebuffer: this.Ca.ga, asciiFramebuffer: this.Ca.La, registerPreDrawHook: (e) => this.Oa(this.Fa, t, e), registerPostDrawHook: (e) => this.Oa(this.Pa, t, e) };
  }
  Oa(t, e, i) {
    const s = t.get(e) ?? /* @__PURE__ */ new Set();
    return s.add(i), t.set(e, s), () => {
      const r = t.get(e);
      r && (r.delete(i), r.size === 0 && t.delete(e));
    };
  }
  Ra(t) {
    this.Fa.delete(t), this.Pa.delete(t);
  }
  ka(t) {
    for (const e of this.Ma) {
      const i = t.get(e);
      i && i.forEach((s) => s());
    }
  }
}
const Q = `#version 300 es
in vec2 A0;in vec2 A1;out vec2 v_uv;void main(){v_uv=A1;gl_Position=vec4(A0,0.,1.);}`;
class _t {
  constructor() {
    a(this, "Ia", /* @__PURE__ */ new Map());
    a(this, "Ba", []);
    a(this, "Ha", 0);
    a(this, "Ga", 0);
    a(this, "Qa");
  }
  get Na() {
    return this.Ha;
  }
  get Xa() {
    if (this.Ha === 0) return 0;
    let t = 0;
    for (const e of this.Ba) {
      const i = this.Ia.get(e);
      i && (t += Math.min(1, Math.max(0, i.progress)) * i.weight);
    }
    return Math.min(1, t / this.Ha);
  }
  Ya(t) {
    this.Qa = t;
  }
  ja(t, e = 1) {
    const i = `phase-${this.Ba.length + 1}-${Date.now()}`, s = { id: i, label: t, weight: Math.max(1e-3, e), progress: 0, status: "running" };
    return this.Ia.set(i, s), this.Ba.push(i), this.Ha += s.weight, i;
  }
  Ka(t, e) {
    const i = this.Ia.get(t);
    if (!i) return;
    i.progress = Math.max(0, Math.min(1, e)), i.status = i.progress >= 1 ? "complete" : "running";
    const s = this.Xa;
    Math.abs(s - this.Ga) > 1e-3 && (this.Ga = s, this.Qa && this.Qa(s));
  }
  Wa(t) {
    const e = this.Ia.get(t);
    e && (e.progress = 1, e.status = "complete", this.Ka(t, 1));
  }
  Za(t) {
    const e = this.Ia.get(t);
    e && (e.status = "failed");
  }
  qa() {
    return this.Ba.map((t) => {
      const e = this.Ia.get(t);
      return e ? { id: e.id, label: e.label, weight: e.weight, progress: e.progress, status: e.status } : { id: t, label: t, weight: 1, progress: 0, status: "pending" };
    });
  }
}
class Ot {
  constructor(t = "active") {
    a(this, "Va");
    a(this, "Ja", "");
    a(this, "tc", "");
    this.Va = t;
  }
  get sc() {
    return this.Va;
  }
  get ec() {
    return this.Va !== "disabled";
  }
  get rc() {
    return this.Va === "active" || this.Va === "transitioning" || this.Va === "error";
  }
  get nc() {
    return this.Ja;
  }
  get hc() {
    return this.tc;
  }
  oc() {
    this.Va !== "done" && this.Va !== "transitioning" || (this.Va = "active");
  }
  ac() {
    this.Va !== "disabled" && (this.Va = "done");
  }
  cc() {
    this.Va !== "disabled" && (this.Va = "transitioning");
  }
  lc() {
    this.Va === "transitioning" && (this.Va = "done");
  }
  uc(t) {
    this.Va !== "disabled" && (this.Va = "error", t instanceof Error ? (this.Ja = t.message, this.tc = t.stack || "") : (this.Ja = t, this.tc = ""));
  }
  fc() {
    this.Va = "disabled";
  }
}
class Xt {
  constructor(t, e) {
    a(this, "dc", 0);
    a(this, "vc", 1);
    a(this, "gc");
    a(this, "mc");
    this.gc = t, this.mc = e;
  }
  get _c() {
    return this.vc;
  }
  get yc() {
    return this.vc < 1;
  }
  kn() {
    this.gc !== "none" && this.mc > 0 && (this.dc = performance.now());
  }
  et() {
    if (this.gc === "none" || this.mc === 0) return this.vc = 1, !1;
    const t = performance.now() - this.dc, e = Math.min(1, t / this.mc);
    return e >= 1 ? (this.vc = 0, !0) : (this.vc = 1 - e, !1);
  }
  ti() {
    this.vc = 1, this.dc = 0;
  }
}
function dt(n, t) {
  const e = n.tone ?? "auto";
  let i = "dark";
  return e === "light" || e === "dark" ? i = e : t && (i = function(s) {
    if (!s) return 0;
    const [r, h, o] = s.map((l) => l / 255), c = (l) => l <= 0.04045 ? l / 12.92 : Math.pow((l + 0.055) / 1.055, 2.4);
    return 0.2126 * c(r) + 0.7152 * c(h) + 0.0722 * c(o);
  }(t) > 0.5 ? "light" : "dark"), { mode: i, background: t, textColor: i === "light" ? "#1A1A1A" : "#F8F8F8", subtleColor: i === "light" ? "#4A4A4A" : "#C0C0C0" };
}
function It(n) {
  return n.mode === "light" ? ["#E91E63", "#9C27B0", "#FF6F00"] : ["#8EF9F3", "#F15BB5", "#FF9B71"];
}
function Yt(n, t) {
  return n.length ? n.map((e) => t.color(e)) : [t.color("#FFFFFF")];
}
const We = ({ textmodifier: n, grid: t, progress: e, frameCount: i, message: s, palette: r, theme: h, phases: o, transitionOpacity: c, isError: l, errorMessage: u }) => {
  const f = "|/-\\", g = Math.floor(i / 6) % 4, m = n.color(h.textColor), d = Math.floor(255 * c), v = n.color(m.r, m.g, m.b, d);
  if (n.charColor(v), n.cellColor(0, 0, 0, 0), l) {
    const A = n.color(h.mode === "light" ? "#D32F2F" : "#FF6B6B", d);
    n.charColor(A), n.push(), n.translate(0, -2, 0), n.char("X"), n.rect(1, 1), n.pop();
    const p = "SETUP ERROR", y = -Math.floor(p.length / 2);
    n.push(), n.translate(y, 0, 0);
    for (const E of p) n.char(E), n.rect(1, 1), n.translateX(1);
    if (n.pop(), u) {
      const E = n.color(h.subtleColor), x = n.color(E.r, E.g, E.b, d);
      n.charColor(x);
      const w = Math.floor(0.8 * t.cols), R = u.split(" "), N = [];
      let T = "";
      for (const F of R) (T + " " + F).length <= w ? T = T ? T + " " + F : F : (T && N.push(T), T = F);
      T && N.push(T);
      const S = N.slice(0, 3);
      N.length > 3 && (S[2] = S[2].substring(0, w - 3) + "..."), S.forEach((F, K) => {
        const Ht = -Math.floor(F.length / 2);
        n.push(), n.translate(Ht, 3 + K, 0);
        for (const jt of F) n.char(jt), n.rect(1, 1), n.translateX(1);
        n.pop();
      });
    }
    return;
  }
  if (n.push(), n.translate(0, 0, 0), n.char(f[g]), n.rect(1, 1), n.pop(), e > 0 || o.some((A) => A.status !== "pending")) {
    const A = Math.max(6, Math.floor(0.6 * t.cols)), p = -Math.floor(A / 2), y = Math.floor(A * e), E = r.length ? r : [n.color("#FFFFFF")];
    n.push(), n.translate(p, 3, 0);
    for (let x = 0; x < A; x++) {
      const w = x < y ? "*" : ".", R = E[x % E.length], N = n.color(R.r, R.g, R.b, d);
      n.charColor(N), n.char(w), n.rect(1, 1), n.translateX(1);
    }
    n.pop();
  }
  if (s) {
    const A = n.color(h.subtleColor), p = n.color(A.r, A.g, A.b, d);
    n.charColor(p);
    const y = -Math.floor(s.length / 2);
    n.push(), n.translate(y, 5, 0);
    for (const E of s) n.char(E), n.rect(1, 1), n.translateX(1);
    n.pop();
  }
}, He = { message: "LOADING...", tone: "auto", transition: "fade", transitionDuration: 500 };
class je {
  constructor(t, e, i) {
    this.wc = t, this.id = e, this.label = i;
  }
  report(t) {
    this.wc.Ka(this.id, t);
  }
  complete() {
    this.wc.Wa(this.id);
  }
  fail(t) {
    this.wc.Za(this.id);
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
class zt {
  constructor(t, e, i) {
    a(this, "Ca");
    a(this, "l");
    a(this, "bc");
    a(this, "wc");
    a(this, "Cc");
    a(this, "xc");
    a(this, "Mc");
    a(this, "Fc");
    a(this, "Pc");
    a(this, "$c");
    a(this, "Z");
    a(this, "Tc", []);
    a(this, "Rc");
    a(this, "Ec", performance.now());
    a(this, "Sc", 0);
    a(this, "kc", !1);
    a(this, "zc", !1);
    a(this, "Ic");
    this.Ca = t, this.l = { ...He, ...e ?? {} }, this.bc = new Ot("active"), this.wc = new _t(), this.Cc = new Xt(this.l.transition, this.l.transitionDuration), this.xc = new Lt(60), this.Rc = dt(this.l, i);
    const s = It(this.Rc);
    this.Tc = Yt(s, this.Ca), this.Z = this.Dc(), this.wc.Ya((r) => {
      r >= 0.999 && this.ac();
    });
  }
  async yr(t) {
    if (this.zc) return;
    const e = this.Ca.Z, i = this.Ca.Er;
    this.Mc = new vt(e, 16), await this.Mc.yr(t);
    const s = this.Mc.maxGlyphDimensions;
    this.Fc = new Ut(i.canvas, s.width, s.height), this.Pc = e.Pe(this.Fc.cols, this.Fc.rows, 3), this.$c = e.Pe(this.Fc.width, this.Fc.height, 1), this.zc = !0;
  }
  get rc() {
    return this.bc.rc && this.kc;
  }
  kn() {
    this.kc || (this.kc = !0, this.Ec = performance.now(), this.Sc = 0, this.xc.kn(() => this.Lc()));
  }
  zn() {
    this.kc && (this.kc = !1, this.xc.zn());
  }
  Xr() {
    this.zc && (this.Fc.ti(), this.Pc.resize(this.Fc.cols, this.Fc.rows), this.$c.resize(this.Fc.width, this.Fc.height));
  }
  gt() {
    this.zn(), this.zc && (this.Mc.gt(), this.Pc.gt(), this.$c.gt(), this.zc = !1);
  }
  get progress() {
    return this.wc.Xa;
  }
  message(t) {
    return typeof t == "string" && (this.l.message = t), this.l.message;
  }
  addPhase(t, e = 1) {
    this.bc.oc();
    const i = this.wc.ja(t, e);
    return new je(this.wc, i, t);
  }
  ac() {
    this.l.transition !== "none" && this.l.transitionDuration > 0 ? (this.bc.cc(), this.Cc.kn()) : (this.bc.ac(), this.zn(), this.Oc());
  }
  Oc() {
    this.Ic && this.Ic();
  }
  Bc(t) {
    this.Ic = t;
  }
  error(t) {
    this.bc.uc(t);
  }
  Lc() {
    if (this.bc.rc) {
      if (this.Sc++, this.bc.sc === "transitioning" && this.Cc.et())
        return this.bc.lc(), this.Oc(), void this.zn();
      this.Hc();
    }
  }
  Hc() {
    if (!this.zc) return;
    const t = this.Pc, e = this.Mc, i = this.Fc, s = this.$c, r = this.Ca.Z, h = this.Ca.Er, o = this.Ca.Gc, c = this.Ca.Qc;
    r.state.qt(), t.begin(), this.Ca.clear(), this.Ca.push();
    try {
      const l = { textmodifier: this.Ca, grid: i, progress: this.progress, elapsedMs: performance.now() - this.Ec, frameCount: this.Sc, message: this.l.message, palette: this.Tc, theme: this.Rc, phases: this.wc.qa(), transitionOpacity: this.Cc._c, isError: this.bc.sc === "error", errorMessage: this.bc.nc || void 0, errorDetails: this.bc.hc || void 0 };
      this.Z(l);
    } finally {
      this.Ca.pop();
    }
    t.end(), s.begin(), r.ve(o), o.O({ u_characterTexture: e.fontFramebuffer, u_charsetDimensions: [e.textureColumns, e.textureRows], Uk: t.textures[0], Ul: t.textures[1], Um: t.textures[2], Un: [i.cols, i.rows], Uo: [s.width, s.height], Up: r.state.canvasBackgroundColor }), r.Ae(0, 0, h.width, h.height), s.end(), r.wi(...r.state.canvasBackgroundColor), r.ve(c), c.O({ U0: s.textures[0], U1: [s.width, s.height], U2: [i.offsetX, i.offsetY], U3: [i.width, i.height] }), r.Ae(i.offsetX, i.offsetY, i.width, i.height);
  }
  Nc(t) {
    this.Rc = dt(this.l, t);
  }
  Dc() {
    const t = this.l.renderer || We;
    return (e) => {
      t(e), this.Xc(e);
    };
  }
  Xc(t) {
    const { textmodifier: e, grid: i, frameCount: s, theme: r, transitionOpacity: h } = t, o = [116, 101, 120, 116, 109, 111, 100, 101, 46, 106, 115].map((f) => String.fromCharCode(f)).join(""), c = (i.rows + 1 >> 1) - 2, l = 2 - (i.cols + 1 >> 1), u = r.mode === "light" ? [[233, 30, 99], [156, 39, 176], [255, 111, 0]] : [[142, 249, 243], [241, 91, 181], [255, 155, 113]];
    e.push(), e.translate(l, c, 0);
    for (let f = 0; f < o.length; f++) {
      const g = o[f], m = Math.floor(0.1 * s + 0.5 * f) % u.length, [d, v, A] = u[m], p = Math.floor(255 * h), y = e.color(d, v, A, p);
      e.charColor(y), e.char(g), e.point(), e.translateX(1);
    }
    e.pop();
  }
}
class gt {
  constructor(t = {}) {
    a(this, "Yc");
    a(this, "_c");
    a(this, "jc");
    a(this, "Kc");
    a(this, "Wc");
    a(this, "Zc");
    a(this, "qc");
    a(this, "Vc");
    a(this, "Jc");
    a(this, "tl", null);
    a(this, "sl", !1);
    a(this, "il", !0);
    a(this, "el", []);
    this.Yc = t.visible ?? !0, this._c = Math.min(1, Math.max(0, t.opacity ?? 1)), this.jc = t.blendMode ?? "normal", this.Kc = Math.round(t.offsetX ?? 0), this.Wc = Math.round(t.offsetY ?? 0);
  }
  rl() {
    return this.tl !== null;
  }
  nl() {
    const t = this.el;
    return this.el = [], t;
  }
  hl(t) {
    this.tl && this.tl.call(t);
  }
  draw(t) {
    this.tl = t;
  }
  show() {
    this.Yc = !0;
  }
  hide() {
    this.Yc = !1;
  }
  opacity(t) {
    if (t === void 0) return this._c;
    this._c = Math.min(1, Math.max(0, t));
  }
  blendMode(t) {
    if (t === void 0) return this.jc;
    this.jc = t;
  }
  offset(t, e = 0) {
    if (t === void 0) return { x: this.Kc, y: this.Wc };
    this.Kc = Math.round(t), this.Wc = Math.round(e);
  }
  filter(t, e) {
    this.el.push({ name: t, params: e });
  }
  ol(t) {
    this.Zc = t, this.al(t.grid);
  }
  wa(t, e) {
    if (!this.Yc || !this.tl) return void (this.sl = !1);
    const i = this.Zc.renderer;
    this.el = [], this.qc.begin(), i.state.qt(), this.tl.call(t), this.qc.end();
    const s = this.el.length > 0, r = s ? this.Jc : this.Vc;
    r.begin(), i.ve(e), e.O({ u_characterTexture: this.Zc.font.fontFramebuffer, u_charsetDimensions: [this.Zc.font.textureColumns, this.Zc.font.textureRows], Uk: this.qc.textures[0], Ul: this.qc.textures[1], Um: this.qc.textures[2], Un: [this.Zc.grid.cols, this.Zc.grid.rows], Uo: [r.width, r.height], Up: [0, 0, 0, 0] }), i.Ae(0, 0, this.Zc.grid.width, this.Zc.grid.height), r.end(), s && this.Zc.filterManager.cl(this.Jc.textures[0], this.Vc, this.el, this.Vc.width, this.Vc.height, this.Zc.layerPingPongBuffers), this.sl = !0;
  }
  Xr(t) {
    var e;
    this.Zc && (this.Zc = { ...this.Zc, grid: t }), this.qc && this.Vc && (this.qc.resize(t.cols, t.rows), this.Vc.resize(t.width, t.height), (e = this.Jc) == null || e.resize(t.width, t.height));
  }
  gt() {
    var t, e, i;
    this.il && ((t = this.qc) == null || t.gt(), (e = this.Vc) == null || e.gt(), (i = this.Jc) == null || i.gt());
  }
  get texture() {
    var t;
    return (t = this.Vc) == null ? void 0 : t.textures[0];
  }
  get width() {
    return this.Vc ? this.Vc.width : 0;
  }
  get height() {
    return this.Vc ? this.Vc.height : 0;
  }
  get ll() {
    return this.sl;
  }
  get drawFramebuffer() {
    return this.qc;
  }
  al(t) {
    this.Zc && (this.qc = this.Zc.externalDrawFramebuffer ?? this.Zc.createFramebuffer(t.cols, t.rows, 4), this.Vc = this.Zc.externalAsciiFramebuffer ?? this.Zc.createFramebuffer(t.width, t.height, 1), this.Zc.externalAsciiFramebuffer || (this.Jc = this.Zc.createFramebuffer(t.width, t.height, 1)), this.il = !this.Zc.externalDrawFramebuffer && !this.Zc.externalAsciiFramebuffer, this.sl = !1);
  }
}
const xt = { normal: 0, additive: 1, multiply: 2, screen: 3, subtract: 4, darken: 5, lighten: 6, overlay: 7, softLight: 8, hardLight: 9, colorDodge: 10, colorBurn: 11, difference: 12, exclusion: 13 };
class Vt {
  constructor(t) {
    a(this, "Z");
    a(this, "ul");
    a(this, "fl", null);
    a(this, "dl", 0);
    this.Z = t, this.ul = t.pe(Q, `#version 300 es
precision highp float;uniform sampler2D Uq;uniform sampler2D Ur;uniform vec2 Us;uniform float Ut;uniform vec2 Uu;uniform int Uv;in vec2 v_uv;out vec4 fragColor;const int A=0;const int B=1;const int C=2;const int D=3;const int E=4;const int F=5;const int G=6;const int H=7;const int I=8;const int J=9;const int K=10;const int L=11;const int M=12;const int N=13;vec3 O(vec3 P,vec3 Q){return Q;}vec3 R(vec3 P,vec3 Q){return P+Q;}vec3 S(vec3 P,vec3 Q){return P*Q;}vec3 T(vec3 P,vec3 Q){return 1.-(1.-P)*(1.-Q);}vec3 U(vec3 P,vec3 Q){return max(P-Q,0.);}vec3 V(vec3 P,vec3 Q){return min(P,Q);}vec3 W(vec3 P,vec3 Q){return max(P,Q);}vec3 X(vec3 P,vec3 Q){return mix(2.*P*Q,1.-2.*(1.-P)*(1.-Q),step(0.5,P));}vec3 Y(vec3 P,vec3 Q){return mix(P-(1.-2.*Q)*P*(1.-P),mix(P+(2.*Q-1.)*(P*(3.-2.*P)-P),P+(2.*Q-1.)*(sqrt(P)-P),step(0.25,P)),step(0.5,Q));}vec3 Z(vec3 P,vec3 Q){return mix(2.*P*Q,1.-2.*(1.-P)*(1.-Q),step(0.5,Q));}vec3 a(vec3 P,vec3 Q){return mix(min(vec3(1.),P/max(1.-Q,0.0001)),vec3(1.),step(1.,Q));}vec3 b(vec3 P,vec3 Q){return mix(1.-min(vec3(1.),(1.-P)/max(Q,0.0001)),vec3(0.),step(Q,vec3(0.)));}vec3 c(vec3 P,vec3 Q){return abs(P-Q);}vec3 d(vec3 P,vec3 Q){return P+Q-2.*P*Q;}vec3 e(int f,vec3 P,vec3 Q){if(f==A)return O(P,Q);if(f==B)return R(P,Q);if(f==C)return S(P,Q);if(f==D)return T(P,Q);if(f==E)return U(P,Q);if(f==F)return V(P,Q);if(f==G)return W(P,Q);if(f==H)return X(P,Q);if(f==I)return Y(P,Q);if(f==J)return Z(P,Q);if(f==K)return a(P,Q);if(f==L)return b(P,Q);if(f==M)return c(P,Q);if(f==N)return d(P,Q);return O(P,Q);}void main(){vec4 g=texture(Ur,v_uv);vec2 h=v_uv*Us-Uu;bool i=any(lessThan(h,vec2(0.)))||any(greaterThanEqual(h,Us));if(i){fragColor=g;return;}vec2 j=(floor(h)+0.5)/Us;vec4 k=texture(Uq,j);float l=k.a*Ut;if(l<=0.){fragColor=g;return;}vec3 m=e(Uv,g.rgb,k.rgb);vec3 n=mix(g.rgb,m,l);float o=g.a+l*(1.-g.a);fragColor=vec4(n,o);}`);
  }
  yr(t) {
    this.fl || (this.fl = [this.Z.Pe(t.width, t.height, 1), this.Z.Pe(t.width, t.height, 1)]);
  }
  vl(t, e) {
    const i = this.Z.context, { baseTexture: s, targetFramebuffer: r, backgroundColor: h, baseLayer: o, layers: c } = t, l = i.isEnabled(i.DEPTH_TEST), u = i.getParameter(i.DEPTH_WRITEMASK);
    l && i.disable(i.DEPTH_TEST), u && i.depthMask(!1);
    const f = e.width, g = e.height, m = this.fl[0];
    m.begin(), this.Z.wi(...h), m.end(), this.dl = 0, o.Yc && this.pl(s, f, g, o._c, o.Kc, o.Wc, "normal", i);
    for (const d of c) d.Yc && d.ll && this.pl(d.texture, d.width, d.height, d._c, d.Kc, d.Wc, d.jc, i);
    this.ml(r, f, g, i), i.depthMask(u), l && i.enable(i.DEPTH_TEST);
  }
  pl(t, e, i, s, r, h, o, c) {
    const l = this.fl[this.dl], u = this.dl === 0 ? 1 : 0, f = this.fl[u];
    f.begin(), c.disable(c.BLEND), this.Z.ve(this.ul), this.ul.O({ Uq: t, Ur: l.textures[0], Us: [e, i], Ut: s, Uu: [r, h], Uv: xt[o] }), this.Z.Ae(0, 0, l.width, l.height), f.end(), this.dl = u;
  }
  ml(t, e, i, s) {
    const r = this.fl[this.dl];
    t.begin(), s.disable(s.BLEND), this.Z.ve(this.ul), this.ul.O({ Uq: r.textures[0], Ur: r.textures[0], Us: [r.width, r.height], Ut: 1, Uu: [0, 0], Uv: xt.normal }), this.Z.Ae(0, 0, e, i), t.end();
  }
  Xr(t) {
    this.fl && (this.fl[0].resize(t.width, t.height), this.fl[1].resize(t.width, t.height));
  }
  gt() {
    this.ul.dispose(), this.fl && (this.fl[0].gt(), this.fl[1].gt(), this.fl = null);
  }
}
class Gt {
  constructor(t) {
    a(this, "Ca");
    a(this, "Z");
    a(this, "_l");
    a(this, "yl");
    a(this, "Al", []);
    a(this, "wl", []);
    a(this, "bl");
    a(this, "Cl");
    a(this, "xl");
    a(this, "Ml");
    a(this, "Fl", !1);
    this.Ca = t, this.Z = t.Z, this._l = t.Gc, this.yl = new Vt(this.Z), this.bl = new gt({ visible: !0, opacity: 1 });
  }
  add(t = {}) {
    const e = new gt(t);
    return this.Fl ? (this.Pl(e), this.wl.push(e)) : this.Al.push(e), e;
  }
  remove(t) {
    this.$l(this.wl, t) || this.$l(this.Al, t);
  }
  move(t, e) {
    this.Tl(this.wl, t, e) || this.Tl(this.Al, t, e);
  }
  swap(t, e) {
    t !== e && (this.Rl(this.wl, t, e) || this.Rl(this.Al, t, e));
  }
  yr() {
    if (this.Fl) return;
    const t = this.Ca.Nn;
    this.Cl = this.Z.Pe(t.width, t.height, 1), this.xl = this.Z.Pe(t.width, t.height, 1), this.Ml = [this.Z.Pe(t.width, t.height, 1, { depth: !1 }), this.Z.Pe(t.width, t.height, 1, { depth: !1 })], this.El(), this.yl.yr(t);
    for (const e of this.Al) this.Pl(e), this.wl.push(e);
    this.Al.length = 0, this.Fl = !0;
  }
  Sl(t, e) {
    const i = this.Ca.Nn, s = this.Ca.font, r = this.Ca.ga, h = this.bl.nl(), o = h.length > 0, c = o ? this.xl : this.Cl;
    c.begin(), this.Z.ve(this._l), this._l.O({ u_characterTexture: s.fontFramebuffer, u_charsetDimensions: [s.textureColumns, s.textureRows], Uk: r.textures[0], Ul: r.textures[1], Um: r.textures[2], Un: [i.cols, i.rows], Uo: [c.width, c.height], Up: this.Z.state.canvasBackgroundColor }), this.Z.Ae(0, 0, i.width, i.height), c.end(), o && this.Ca.kl.cl(this.xl.textures[0], this.Cl, h, this.Cl.width, this.Cl.height, this.Ml), this.zl(), this.Dl(t, e);
  }
  zl() {
    if (this.wl.length !== 0) for (const t of this.wl) t.wa(this.Ca, this._l);
  }
  Dl(t, e) {
    this.yl.vl({ baseTexture: this.Cl.textures[0], targetFramebuffer: t, backgroundColor: e, baseLayer: this.bl, layers: this.wl }, this.Ca.Nn);
  }
  Xr() {
    if (!this.Fl) return;
    const t = this.Ca.Nn;
    this.Cl.resize(t.width, t.height), this.xl.resize(t.width, t.height), this.bl.Xr(t), this.Ml && (this.Ml[0].resize(t.width, t.height), this.Ml[1].resize(t.width, t.height));
    for (const e of this.wl) e.Xr(t);
    this.yl.Xr(t);
  }
  gt() {
    var t, e, i, s;
    for (const r of this.wl) r.gt();
    for (const r of this.Al) r.gt();
    this.wl.length = 0, this.Al.length = 0, this.bl.gt(), (t = this.Cl) == null || t.gt(), (e = this.xl) == null || e.gt(), (i = this.Ml) == null || i[0].gt(), (s = this.Ml) == null || s[1].gt(), this.yl.gt();
  }
  get all() {
    return this.wl;
  }
  get base() {
    return this.bl;
  }
  Pl(t) {
    const e = { renderer: this.Z, grid: this.Ca.Nn, font: this.Ca.font, filterManager: this.Ca.kl, layerPingPongBuffers: this.Ml, createFramebuffer: (i, s, r = 1) => this.Z.Pe(i, s, r) };
    t.ol(e);
  }
  El() {
    const t = { renderer: this.Z, grid: this.Ca.Nn, font: this.Ca.font, filterManager: this.Ca.kl, layerPingPongBuffers: this.Ml, createFramebuffer: (e, i, s = 1) => this.Z.Pe(e, i, s), externalDrawFramebuffer: this.Ca.ga, externalAsciiFramebuffer: this.Cl };
    this.bl.ol(t);
  }
  $l(t, e) {
    const i = t.indexOf(e);
    if (i === -1) return !1;
    const [s] = t.splice(i, 1);
    return s.gt(), !0;
  }
  Tl(t, e, i) {
    const s = t.indexOf(e);
    if (s === -1) return !1;
    t.splice(s, 1);
    const r = Math.max(0, Math.min(t.length, i));
    return t.splice(r, 0, e), !0;
  }
  Rl(t, e, i) {
    const s = t.indexOf(e);
    if (s === -1) return !1;
    const r = t.indexOf(i);
    return r !== -1 && (t[s] = i, t[r] = e, !0);
  }
}
class kt {
  constructor(t) {
    a(this, "Z");
    a(this, "Ll", /* @__PURE__ */ new Map());
    a(this, "Ol", /* @__PURE__ */ new Map());
    this.Z = t, this.Il();
  }
  async Bl(t, e, i = {}) {
    const s = Object.entries(i), r = s.length > 0 ? s[0][1][0] : null;
    let h;
    if (typeof e == "string") {
      let c = e;
      if (e.startsWith("./") || e.startsWith("../") || e.endsWith(".frag") || e.endsWith(".glsl")) {
        const l = await fetch(e);
        if (!l.ok) throw Error(`Failed to load shader from ${e}: ${l.statusText}`);
        c = await l.text();
      }
      h = this.Z.pe(Q, c), this.Ol.set(t, h);
    } else h = e, this.Ol.set(t, h);
    const o = { id: t, createShader: () => h, createUniforms: (c, l) => {
      const u = { u_resolution: [l.width, l.height] };
      for (const [f, [g, m]] of s) {
        let d = m;
        c != null && (typeof c == "number" && g === r ? d = c : typeof c == "object" && g in c && (d = c[g] ?? m)), u[f] = d;
      }
      return u;
    } };
    this.Ll.set(t, o);
  }
  Hl(t) {
    const e = this.Ol.get(t);
    return e && (e.dispose(), this.Ol.delete(t)), this.Ll.delete(t);
  }
  Gl(t) {
    return this.Ll.get(t);
  }
  gt() {
    for (const t of this.Ol.values()) t.dispose();
    this.Ol.clear(), this.Ll.clear();
  }
  Il() {
    this.Bl("invert", `#version 300 es
precision highp float;uniform sampler2D u_texture;in vec2 v_uv;out vec4 fragColor;void main(){vec4 A=texture(u_texture,v_uv);fragColor=vec4(1.-A.rgb,A.a);}`, {}), this.Bl("grayscale", `#version 300 es
precision highp float;uniform sampler2D u_texture;uniform float U5;in vec2 v_uv;out vec4 fragColor;void main(){vec4 A=texture(u_texture,v_uv);float B=dot(A.rgb,vec3(0.299,0.587,0.114));vec3 C=mix(A.rgb,vec3(B),U5);fragColor=vec4(C,A.a);}`, { U5: ["amount", 1] }), this.Bl("sepia", `#version 300 es
precision highp float;uniform sampler2D u_texture;uniform float U5;in vec2 v_uv;out vec4 fragColor;void main(){vec4 A=texture(u_texture,v_uv);vec3 B;B.r=dot(A.rgb,vec3(0.393,0.769,0.189));B.g=dot(A.rgb,vec3(0.349,0.686,0.168));B.b=dot(A.rgb,vec3(0.272,0.534,0.131));vec3 C=mix(A.rgb,B,U5);fragColor=vec4(C,A.a);}`, { U5: ["amount", 1] }), this.Bl("threshold", `#version 300 es
precision highp float;uniform sampler2D u_texture;uniform float U8;in vec2 v_uv;out vec4 fragColor;void main(){vec4 A=texture(u_texture,v_uv);float B=dot(A.rgb,vec3(0.299,0.587,0.114));float C=step(U8,B);fragColor=vec4(vec3(C),A.a);}`, { U8: ["threshold", 0.5] });
  }
}
class Wt {
  constructor(t) {
    a(this, "Z");
    a(this, "Ol", /* @__PURE__ */ new Map());
    a(this, "J");
    a(this, "fl");
    a(this, "zc", !1);
    a(this, "Ql");
    this.Z = t, this.Ql = new kt(this.Z), this.J = t.pe(Q, `#version 300 es
precision highp float;uniform sampler2D u_texture;in vec2 v_uv;out vec4 fragColor;void main(){fragColor=texture(u_texture,v_uv);}`);
  }
  async register(t, e, i = {}) {
    await this.Ql.Bl(t, e, i);
  }
  unregister(t) {
    return this.Ql.Hl(t) ?? !1;
  }
  has(t) {
    return this.Ql.Gl(t) !== void 0;
  }
  yr(t, e) {
    this.zc || (this.fl = [this.Z.Pe(t, e, 1, { depth: !1 }), this.Z.Pe(t, e, 1, { depth: !1 })], this.zc = !0);
  }
  Nl(t, e, i, s, r) {
    this.fl[0].width === s && this.fl[0].height === r || (this.fl[0].resize(s, r), this.fl[1].resize(s, r)), this.cl(t, e, i, s, r, this.fl);
  }
  cl(t, e, i, s, r, h) {
    if (i.length === 0) return void this.Xl(t, e, s, r);
    const o = this.Z.context, c = o.isEnabled(o.BLEND);
    o.disable(o.BLEND), this.Xl(t, h[0], s, r);
    let l = 0;
    for (let u = 0; u < i.length; u++) {
      const f = i[u], g = u === i.length - 1, m = l === 0 ? 1 : 0, d = g ? e : h[m];
      this.Yl(f, h[l], d, s, r), g || (l = m);
    }
    c && o.enable(o.BLEND);
  }
  Yl(t, e, i, s, r) {
    const h = this.Ql.Gl(t.name);
    if (!h) return console.warn(`[textmode.js] Unknown filter: "${t.name}". Skipping.`), void this.Xl(e.textures[0], i, s, r);
    const o = this.jl(t.name, h, s, r), c = { renderer: this.Z, gl: this.Z.context, width: s, height: r };
    i.begin(), this.Z.ve(o), o.O({ u_texture: e.textures[0] });
    const l = h.createUniforms(t.params, c);
    o.O(l), this.Z.Ae(0, 0, s, r), i.end();
  }
  jl(t, e, i, s) {
    let r = this.Ol.get(t);
    if (!r && e) {
      const h = { renderer: this.Z, gl: this.Z.context, width: i, height: s };
      r = e.createShader(h), this.Ol.set(t, r);
    }
    return r;
  }
  Xl(t, e, i, s) {
    e.begin(), this.Z.ve(this.J), this.J.O({ u_texture: t, u_resolution: [i, s] }), this.Z.Ae(0, 0, i, s), e.end();
  }
  Xr(t, e) {
    this.fl && (this.fl[0].resize(t, e), this.fl[1].resize(t, e));
  }
  gt() {
    for (const t of this.Ol.values()) t.dispose();
    this.Ol.clear(), this.J.dispose(), this.Ql.gt(), this.fl && (this.fl[0].gt(), this.fl[1].gt()), this.zc = !1;
  }
}
const $e = Object.freeze(Object.defineProperty({ __proto__: null, FilterRegistry: kt, TextmodeFilterManager: Wt }, Symbol.toStringTag, { value: "Module" }));
class Qe extends function(e, ...i) {
  return i.reduce((s, r) => r(s), e);
}(class {
}, Xe, Ie, Ye, ze, Ve, Ge) {
  constructor(e = {}) {
    super();
    a(this, "Z");
    a(this, "rr");
    a(this, "Er");
    a(this, "Nn");
    a(this, "ya");
    a(this, "Yh");
    a(this, "ma");
    a(this, "ba");
    a(this, "Kl");
    a(this, "ga");
    a(this, "Gc");
    a(this, "La");
    a(this, "Qc");
    a(this, "Wl");
    a(this, "kl");
    a(this, "Zl", []);
    a(this, "ql");
    a(this, "Vl");
    a(this, "Jl");
    a(this, "tu", !1);
    a(this, "su", !1);
    a(this, "iu", !1);
    a(this, "eu", !1);
    a(this, "ru", () => {
    });
    a(this, "tl", () => {
    });
    a(this, "nu", () => {
    });
    a(this, "hu");
    a(this, "ou");
    a(this, "Lr", !1);
    a(this, "au");
    a(this, "_a", /* @__PURE__ */ new Set());
    this.Jl = new ke(this), this.Lr = e.overlay ?? !1, this.Er = new Se(e), this.Z = new ve(this.Er.Yr()), this.rr = new vt(this.Z, e.fontSize ?? 16), this.ya = new Lt(e.frameRate ?? 60), this.Kl = new zt(this, e.loadingScreen, this.Er.Nr()), this.Kl.Bc(() => {
      this.ya.Gn = 0, this.eu = !0;
    }), this.Yh = new Dt(this.Er), this.ma = new Bt(this.Er, this.Yh), this.ba = new Zt(), this.Gc = this.Z.pe(Q, `#version 300 es
precision highp float;uniform sampler2D u_characterTexture;uniform vec2 u_charsetDimensions;uniform sampler2D Ul;uniform sampler2D Um;uniform sampler2D Uk;uniform vec2 Un;uniform vec2 Uo;uniform vec4 Up;in vec2 v_uv;out vec4 fragColor;mat2 A(float B){float C=sin(B);float D=cos(B);return mat2(D,-C,C,D);}void main(){vec2 E=gl_FragCoord.xy/Uo;vec2 F=E*Un;vec2 G=floor(F);vec2 H=(G+0.5)/Un;vec4 I=texture(Ul,H);vec4 J=texture(Um,H);vec4 K=texture(Uk,H);int L=int(K.b*255.+0.5);bool M=(L&1)!=0;bool N=(L&2)!=0;bool O=(L&4)!=0;int P=int(K.r*255.+0.5)+int(K.g*255.+0.5)*256;int Q=int(u_charsetDimensions.x);int R=P/Q;int S=P-(R*Q);float T=(u_charsetDimensions.y-1.)-float(R);vec2 U=1./u_charsetDimensions;vec2 V=vec2(float(S),T)*U;vec2 W=V+U;float X=-K.a*360.*0.017453292;vec2 Y=fract(F)-0.5f;vec2 Z=vec2(N?-1.:1.,O?-1.:1.);Y*=Z;Y=A(X)*Y+0.5;vec2 a=V+clamp(Y,0.,1.)*U;const float b=0.0001;if(any(lessThan(a,V-b))||any(greaterThan(a,W+b))){fragColor=M?I:J;return;}vec4 c=texture(u_characterTexture,a);if(M)c.rgb=mix(c.rgb,1.-c.rgb,float(M));vec4 d=mix(Up,J,J.a);fragColor=mix(d,I,c);}`), this.Wl = new Gt(this), this.kl = new Wt(this.Z), this.Kl.kn(), this.cu(e);
  }
  async cu(e) {
    await Promise.all([this.rr.yr(e.fontSource), this.Kl.yr(e.fontSource)]);
    const i = this.rr.maxGlyphDimensions;
    this.Nn = new Ut(this.Er.canvas, i.width, i.height), this.Yh.yr(this.Nn), this.ma.yr(this.Nn), this.ga = this.Z.Pe(this.Nn.cols, this.Nn.rows, 3), this.La = this.Z.Pe(this.Nn.width, this.Nn.height, 1), this.ql = this.Z.Pe(this.Er.width, this.Er.height, 1), this.Vl = this.Z.Pe(this.Er.width, this.Er.height, 1), this.kl.yr(this.Er.width, this.Er.height), this.Wl.yr(), this.Lr && (this.au = I.Cn(this.Z, this.rr, this.Er.targetCanvas, this.Nn.cols, this.Nn.rows), this.pa(this.au)), this.Qc = this.Z.pe(Q, `#version 300 es
precision highp float;uniform sampler2D U0;uniform vec2 U1;uniform vec2 U2;uniform vec2 U3;in vec2 v_uv;out vec4 fragColor;void main(){vec2 A=gl_FragCoord.xy-U2;vec2 B=A*(U1/U3);vec2 C=(floor(B)+0.5)/U1;fragColor=texture(U0,C);}`), this.lu(), this.ya.kn(() => this.wa()), await this.Jl.$a(e.plugins ?? []);
    try {
      await this.ru(), this.Kl.ac();
    } catch (s) {
      console.error("Error during setup:", s), this.Kl.error(s);
    }
  }
  lu() {
    this.hu = () => {
      this.Lr && this.resizeCanvas(this.Er.targetCanvas.width, this.Er.targetCanvas.height), this.nu();
    }, window.addEventListener("resize", this.hu), this.Yh.dh(), this.ma.dh(), this.ba.dh(), window.addEventListener("blur", () => {
      this.ba.Xh();
    }), this.Lr && (this.ou = new ResizeObserver(() => {
      this.resizeCanvas(this.Er.targetCanvas.width, this.Er.targetCanvas.height);
    }), this.ou.observe(this.Er.targetCanvas));
  }
  wa() {
    if (!this.Kl.rc && this.eu) {
      this.su = !0;
      try {
        this.ya.In(), this.ya.Qn(), this.Lr && Ct(this.Z.context, this.au.texture, this.Er.targetCanvas), this.Jl.Sa(), this.Z.state.qt(), this.ga.begin(), this.Wl.base.rl() ? this.Wl.base.hl(this) : this.tl(), this.ga.end();
        const e = [...this.Z.state.canvasBackgroundColor];
        this.Wl.Sl(this.La, e), this.ql.begin(), this.Z.wi(...e), this.Z.ve(this.Qc), this.Qc.O({ U0: this.La.textures[0], U1: [this.La.width, this.La.height], U2: [this.Nn.offsetX, this.Nn.offsetY], U3: [this.Nn.width, this.Nn.height] }), this.Z.Ae(this.Nn.offsetX, this.Nn.offsetY, this.Nn.width, this.Nn.height), this.ql.end();
        let i = this.ql.textures[0];
        this.Zl.length > 0 && (this.kl.Nl(this.ql.textures[0], this.Vl, this.Zl, this.Er.width, this.Er.height), i = this.Vl.textures[0], this.Zl = []), this.Z.wi(0, 0, 0, 0), this.Z.ve(this.Qc), this.Qc.O({ U0: i, U1: [this.Er.width, this.Er.height], U2: [0, 0], U3: [this.Er.width, this.Er.height] }), this.Z.Ae(0, 0, this.Er.width, this.Er.height), this.Jl.za();
      } finally {
        this.su = !1, this.tu && !this.iu && this.uu();
      }
    }
  }
  resizeCanvas(e, i) {
    var s, r, h, o;
    this.Er.Xr(e, i), this.Kl.Nc(this.Er.Nr()), this.Nn.ti(), this.Kl.Xr(), this.ga.resize(this.Nn.cols, this.Nn.rows), this.La.resize(this.Nn.width, this.Nn.height), (s = this.ql) == null || s.resize(this.Er.width, this.Er.height), (r = this.Vl) == null || r.resize(this.Er.width, this.Er.height), (h = this.kl) == null || h.Xr(this.Er.width, this.Er.height), (o = this.Wl) == null || o.Xr(), this.Z.Re(), this.Yh.fh(), this.ma.fh(), this.wa();
  }
  destroy() {
    this.iu || this.tu || (this.tu = !0, this.ya.Dn(), this.su || this.uu());
  }
  uu() {
    var e, i, s, r, h, o;
    this.tu = !1, this.Kl.gt(), this.Jl.Da(), window.removeEventListener("resize", this.hu), (e = this.ou) == null || e.disconnect(), this.Yh.wh(), this.ma.wh(), this.ba.wh(), this.ga.gt(), this.Gc.dispose(), (i = this.Wl) == null || i.gt(), (s = this.kl) == null || s.gt(), (r = this.ql) == null || r.gt(), (h = this.Vl) == null || h.gt(), this.rr.gt(), this.Z.gt(), this.La.gt(), this.Qc.dispose(), (o = this.au) == null || o.gt(), this.Er.gt(), this.iu = !0;
  }
  setup(e) {
    this.ru = e;
  }
  draw(e) {
    this.tl = e;
  }
  windowResized(e) {
    this.nu = e;
  }
  get grid() {
    return this.Nn;
  }
  get font() {
    return this.rr;
  }
  get width() {
    return this.Er.width;
  }
  get height() {
    return this.Er.height;
  }
  get canvas() {
    return this.Er.canvas;
  }
  get drawFramebuffer() {
    return this.ga;
  }
  get isDisposed() {
    return this.iu;
  }
  get overlay() {
    return this.au;
  }
  get loading() {
    return this.Kl;
  }
  get layers() {
    return this.Wl;
  }
  get filters() {
    return this.kl;
  }
  filter(e, i) {
    this.Zl.push({ name: e, params: i });
  }
  pa(e) {
    this._a.has(e) || this._a.add(e);
  }
}
class At {
  constructor() {
  }
  static create(t = {}) {
    return new Qe(t);
  }
  static setErrorLevel(t) {
    mt._(t);
  }
  static get version() {
    return "0.7.0";
  }
}
let ct = null;
const Ke = { id: "brightness", createShader: ({ gl: n }) => (ct || (ct = new W(n, it, `#version 300 es
precision highp float;in vec2 v_uv;uniform sampler2D u_image;uniform bool u_invert;uniform bool u_flipX;uniform bool u_flipY;uniform float u_charRotation;uniform bool u_charColorFixed;uniform vec4 u_charColor;uniform bool u_cellColorFixed;uniform vec4 u_cellColor;uniform vec4 u_backgroundColor;uniform int u_charCount;uniform vec3 u_charList[255];uniform bool u_colorFilterEnabled;uniform int u_colorFilterSize;uniform vec4 u_colorFilterPalette[64];layout(location=0)out vec4 o_character;layout(location=1)out vec4 o_primaryColor;layout(location=2)out vec4 o_secondaryColor;layout(location=3)out vec4 A;float B(vec3 C){return dot(C,vec3(0.299f,0.587f,0.114f));}float D(vec3 E,vec3 F){vec3 G=E-F;return dot(G,G);}vec4 H(vec4 I){if(!u_colorFilterEnabled||u_colorFilterSize<=0){return I;}int J=min(u_colorFilterSize,64);vec3 K=u_colorFilterPalette[0].rgb;float L=D(I.rgb,K);for(int M=1;M<64;++M){if(M>=J){break;}vec3 N=u_colorFilterPalette[M].rgb;float O=D(I.rgb,N);if(O<L){L=O;K=N;}}return vec4(K,I.a);}void main(){vec2 P=vec2(v_uv.x,1.0f-v_uv.y);vec4 I=texture(u_image,P);I=H(I);float F=B(I.rgb);vec2 Q=vec2(0.);if(u_charCount>0){float R=float(u_charCount);float S=clamp(F*(R-1.0f),0.0f,R-1.0f);int T=int(floor(S+0.5f));vec3 U=u_charList[T];Q=U.xy;}else{Q=vec2(0.0f,0.0f);}vec4 V=u_charColorFixed?u_charColor:I;vec4 W=u_cellColorFixed?u_cellColor:I;if(I.a<0.01f){discard;}o_primaryColor=vec4(V.rgb,V.a);o_secondaryColor=vec4(W.rgb,W.a);A=vec4(0.);int X=int(u_invert?1:0);int Y=int(u_flipX?1:0);int Z=int(u_flipY?1:0);float a=float(X|(Y<<1)|(Z<<2))/255.;o_character=vec4(Q,a,clamp(u_charRotation,0.0f,1.0f));}`)), ct), createUniforms: ({ source: n }) => n.createBaseConversionUniforms() }, ti = Object.freeze(Object.defineProperty({ __proto__: null, LoadingPhaseTracker: _t, LoadingScreenManager: zt, LoadingScreenStateMachine: Ot, LoadingScreenTransition: Xt, resolveColorInputs: Yt, resolveDefaultPalette: It, resolveTheme: dt }, Symbol.toStringTag, { value: "Module" })), ei = Object.freeze(Object.defineProperty({ __proto__: null, TextmodeFont: vt, TextmodeImage: I, TextmodeVideo: rt }, Symbol.toStringTag, { value: "Module" })), ii = Object.freeze(Object.defineProperty({ __proto__: null, keyboard: Be, mouse: Ze, touch: _e }, Symbol.toStringTag, { value: "Module" })), si = Object.freeze(Object.defineProperty({ __proto__: null, LayerCompositor: Vt, TextmodeLayer: gt, TextmodeLayerManager: Gt }, Symbol.toStringTag, { value: "Module" }));
Le(Ke);
const ri = At.create, ni = At.setErrorLevel, hi = At.version;
export {
  Se as TextmodeCanvas,
  M as TextmodeColor,
  qt as TextmodeErrorLevel,
  H as TextmodeFramebuffer,
  Ut as TextmodeGrid,
  Qe as Textmodifier,
  ri as create,
  $e as filters,
  De as getConversionStrategy,
  ii as input,
  si as layering,
  ei as loadables,
  ti as loading,
  Le as registerConversionStrategy,
  ni as setErrorLevel,
  At as textmode,
  Je as unregisterConversionStrategy,
  hi as version
};
