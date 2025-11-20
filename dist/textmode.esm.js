var Kt = Object.defineProperty;
var Yt = (n, t, e) => t in n ? Kt(n, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : n[t] = e;
var a = (n, t, e) => Yt(n, typeof t != "symbol" ? t + "" : t, e);
class B extends Error {
  constructor(t, e = {}) {
    super(B.i(t, e)), this.name = "TextmodeError";
  }
  static i(t, e) {
    return `${t}${e && Object.keys(e).length > 0 ? `

📋 Context:` + Object.entries(e).map(([i, s]) => `
  - ${i}: ${B.o(s)}`).join("") : ""}

${"↓".repeat(24)}
`;
  }
  static o(t) {
    if (t === null) return "null";
    if (t === void 0) return "undefined";
    if (typeof t == "string") return `"${t}"`;
    if (typeof t == "number" || typeof t == "boolean") return t + "";
    if (Array.isArray(t)) return t.length === 0 ? "[]" : t.length <= 5 ? `[${t.map((e) => B.o(e)).join(", ")}]` : `[${t.slice(0, 3).map((e) => B.o(e)).join(", ")}, ... +${t.length - 3} more]`;
    if (typeof t == "object") {
      const e = Object.keys(t);
      return e.length === 0 ? "{}" : e.length <= 3 ? `{ ${e.map((i) => `${i}: ${B.o(t[i])}`).join(", ")} }` : `{ ${e.slice(0, 2).map((i) => `${i}: ${B.o(t[i])}`).join(", ")}, ... +${e.length - 2} more }`;
    }
    return t + "";
  }
}
var kt = ((n) => (n[n.SILENT = 0] = "SILENT", n[n.WARNING = 1] = "WARNING", n[n.ERROR = 2] = "ERROR", n[n.THROW = 3] = "THROW", n))(kt || {});
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
        return console.group(i, s), console.warn(B.i(t, e)), console.groupEnd(), !1;
      case 2:
        return console.group(i, s), console.error(B.i(t, e)), console.groupEnd(), !1;
      default:
        throw new B(t, e);
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
let ct = D;
const dt = ct.u();
class W {
  constructor(t, e, i) {
    a(this, "A");
    a(this, "C");
    a(this, "M", /* @__PURE__ */ new Map());
    a(this, "F", /* @__PURE__ */ new Map());
    a(this, "$", 0);
    this.A = t, this.C = this.P(e, i), this.R();
  }
  R() {
    const t = this.A.getProgramParameter(this.C, this.A.ACTIVE_UNIFORMS);
    for (let e = 0; e < t; e++) {
      const i = this.A.getActiveUniform(this.C, e);
      if (i) {
        const s = i.name.replace(/\[0\]$/, ""), r = this.A.getUniformLocation(this.C, s);
        r && (this.M.set(s, r), this.F.set(s, { type: i.type, size: i.size }));
      }
    }
  }
  P(t, e) {
    const i = this.S(this.A.VERTEX_SHADER, t), s = this.S(this.A.FRAGMENT_SHADER, e), r = this.A.createProgram();
    if (this.A.attachShader(r, i), this.A.attachShader(r, s), this.A.linkProgram(r), !this.A.getProgramParameter(r, this.A.LINK_STATUS)) {
      const h = this.A.getProgramInfoLog(r);
      throw Error("Shader program link error: " + h);
    }
    return this.A.deleteShader(i), this.A.deleteShader(s), r;
  }
  S(t, e) {
    const i = this.A.createShader(t);
    if (this.A.shaderSource(i, e), this.A.compileShader(i), !this.A.getShaderParameter(i, this.A.COMPILE_STATUS)) {
      const s = this.A.getShaderInfoLog(i);
      throw this.A.deleteShader(i), Error("Shader compilation error: " + s);
    }
    return i;
  }
  U() {
    this.A.useProgram(this.C), this.k();
  }
  k() {
    this.$ = 0;
  }
  L(t) {
    for (const e in t) this.O(e, t[e]);
  }
  O(t, e) {
    var c, l;
    const i = this.M.get(t);
    if (!i) return;
    const s = this.F.get(t);
    if (!s) return;
    const { type: r, size: h } = s, o = this.A;
    if (e instanceof WebGLTexture) {
      const u = this.$++;
      return o.uniform1i(i, u), o.activeTexture(o.TEXTURE0 + u), void o.bindTexture(o.TEXTURE_2D, e);
    }
    if (e instanceof $) {
      const u = this.$++;
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
  get D() {
    return this.C;
  }
  dispose() {
    this.A.deleteProgram(this.C);
  }
}
function mt(n, t, e, i) {
  return 180 * Math.atan2(i - t, e - n) / Math.PI;
}
function K(n, t, e, i) {
  return Math.hypot(e - n, i - t);
}
function _(n, t, e) {
  return Math.min(Math.max(n, t), e);
}
function Et(n) {
  return (n % 360 + 360) % 360 / 360;
}
function Tt(n, t, e) {
  n.bindTexture(n.TEXTURE_2D, t), n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL, 1), n.texImage2D(n.TEXTURE_2D, 0, n.RGBA, n.RGBA, n.UNSIGNED_BYTE, e), n.bindTexture(n.TEXTURE_2D, null);
}
function tt(n, t, e, i, s) {
  n.texParameteri(n.TEXTURE_2D, n.TEXTURE_MIN_FILTER, t), n.texParameteri(n.TEXTURE_2D, n.TEXTURE_MAG_FILTER, e), n.texParameteri(n.TEXTURE_2D, n.TEXTURE_WRAP_S, i), n.texParameteri(n.TEXTURE_2D, n.TEXTURE_WRAP_T, s);
}
function lt(n, t, e, i, s, r = 0, h = WebGL2RenderingContext.FLOAT, o = !1) {
  n.enableVertexAttribArray(t), n.vertexAttribPointer(t, e, h, o, i, s), n.vertexAttribDivisor(t, r);
}
function bt(n, t, e, i, s) {
  n.bindBuffer(t, e), n.bufferData(t, i, s), n.bindBuffer(t, null);
}
const et = `#version 300 es
in vec2 A0;in vec2 A1;in vec2 A2;in vec2 A3;in vec3 A4;in vec4 A5;in vec4 A6;in vec4 A7;in vec3 A8;in vec3 A9;in vec4 Aa;in vec4 Ab;in vec3 Ac;uniform vec2 Ue;uniform float Uf;uniform float Ug;out vec2 v_uv;out vec3 v_glyphIndex;out vec4 v_glyphColor;out vec4 v_cellColor;out vec4 v_glyphFlags;out vec3 v_worldPosition;out vec3 v_normal;out float v_geometryType;const float A=6.28318530718f;const int B=2;const int C=3;const int D=4;vec2 E(float F,vec2 G,vec2 H,vec2 I,vec2 J){float K=1.0f-F;float L=K*K;float M=L*K;float N=F*F;float O=N*F;return M*G+3.0f*L*F*H+3.0f*K*N*I+O*J;}vec2 P(float F,vec2 G,vec2 H,vec2 I,vec2 J){float K=1.0f-F;float L=K*K;float N=F*F;return-3.0f*L*G+3.0f*(L-2.0f*K*F)*H+3.0f*(2.0f*K*F-N)*I+3.0f*N*J;}vec3 Q(vec3 R,float S){float T=cos(S);float U=sin(S);return vec3(R.x,R.y*T-R.z*U,R.y*U+R.z*T);}vec3 V(vec3 R,float S){float T=cos(S);float U=sin(S);return vec3(R.x*T+R.z*U,R.y,-R.x*U+R.z*T);}vec3 W(vec3 R,float S){float T=cos(S);float U=sin(S);return vec3(R.x*T-R.y*U,R.x*U+R.y*T,R.z);}vec3 X(vec3 R,vec3 Y){vec3 Z=R;if(Y.z!=0.0f){Z=W(Z,Y.z);}if(Y.y!=0.0f){Z=V(Z,Y.y);}if(Y.x!=0.0f){Z=Q(Z,Y.x);}return Z;}void main(){v_uv=A1;v_glyphIndex=A4;v_glyphColor=A5;v_cellColor=A6;v_glyphFlags=A7;vec4 a=Aa;vec4 b=Ab;vec2 c=A3;vec2 d=A2;float e=Ac.x;float f=Ac.y;int g=int(Ac.z);vec2 h=d;vec2 i=h+c*0.5f;float j=f+e*0.5f;vec3 k=vec3(i,j);vec3 l;if(g==D){float F=clamp(A0.x,0.0f,1.0f);vec2 G=b.xy;vec2 H=a.xy;vec2 I=a.zw;vec2 J=b.zw;vec2 m=E(F,G,H,I,J);vec2 n=P(F,G,H,I,J);float o=length(n);vec2 p=o>0.0f?n/o:vec2(1.0f,0.0f);vec2 q=vec2(-p.y,p.x);vec2 r=m;vec2 s=r+q*A0.y*c.y;l=vec3(s,f);}else if(g==C){float t=mod(a.x,A);if(t<0.0f){t+=A;}float u=mod(a.y,A);if(u<0.0f){u+=A;}float v=t-u;if(v<=0.0f){v+=A;}float S=t-A0.x*v;vec2 w=vec2(cos(S),sin(S))*A0.y;vec2 s=w*c+h;l=vec3(s,f);}else if(g==B){vec2 s=A0.xy*c+h;l=vec3(s,f);}vec3 x=X(l,A9);vec3 y=x+A8;vec3 z=vec3(0.0f,0.0f,1.0f);v_worldPosition=y;v_normal=z;v_geometryType=float(g);vec2 AA=(y.xy/Ue)*2.0f;AA.y=-AA.y;float AB=y.z/Ue.y;float AC=clamp(-AB*Uf,-0.99f,0.99f);if(Ug>0.5f){gl_Position=vec4(AA,AC,1.0f);}else{float AD=0.5f;float AE=1.0f/(1.0f-AB*AD);AA*=AE;gl_Position=vec4(AA,AC,1.0f);}}`, X = class X {
  constructor(t, e, i = e, s = 1, r = {}, h) {
    a(this, "H");
    a(this, "I");
    a(this, "l");
    a(this, "A");
    a(this, "G");
    a(this, "N", []);
    a(this, "X", null);
    a(this, "Y");
    a(this, "K");
    a(this, "W", null);
    a(this, "Z", /* @__PURE__ */ new Map());
    this.H = e, this.I = i, this.A = t, this.Y = _(s, 1, 8), this.K = h, this.l = { filter: "nearest", wrap: "clamp", format: "rgba", type: "unsigned_byte", depth: !0, ...r }, X.j || (X.j = new W(t, et, `#version 300 es
precision highp float;in vec2 v_uv;uniform sampler2D Ua;uniform sampler2D Ub;uniform sampler2D Uc;uniform vec2 Ud;layout(location=0)out vec4 o_character;layout(location=1)out vec4 o_primaryColor;layout(location=2)out vec4 o_secondaryColor;void main(){vec2 A=vec2(v_uv.x,1.-v_uv.y);vec2 B=A*Ud;vec2 C=(floor(B)+0.5f)/Ud;vec4 D=texture(Ua,C);vec4 E=texture(Ub,C);if(E.a==0.){discard;}vec4 F=texture(Uc,C);o_character=D;o_primaryColor=E;o_secondaryColor=F;}`));
    const o = t.getParameter(t.MAX_DRAW_BUFFERS), c = t.getParameter(t.MAX_COLOR_ATTACHMENTS);
    this.Y = Math.min(this.Y, o, c), this.G = t.createFramebuffer(), this.V(), this.q(), this.l.depth && this.J();
  }
  V() {
    const t = this.A, e = this.l.filter === "linear" ? t.LINEAR : t.NEAREST, i = this.l.wrap === "repeat" ? t.REPEAT : t.CLAMP_TO_EDGE, s = this.l.type === "float" ? t.FLOAT : t.UNSIGNED_BYTE, r = s === t.FLOAT ? t.RGBA32F : t.RGBA8, h = t.RGBA;
    for (let o = 0; o < this.Y; o++) {
      const c = t.createTexture();
      t.bindTexture(t.TEXTURE_2D, c), tt(t, e, e, i, i), t.texImage2D(t.TEXTURE_2D, 0, r, this.H, this.I, 0, h, s, null), this.N.push(c);
    }
    t.bindTexture(t.TEXTURE_2D, null);
  }
  q() {
    const t = this.A;
    if (t.bindFramebuffer(t.FRAMEBUFFER, this.G), this.Y === 1) t.framebufferTexture2D(t.FRAMEBUFFER, t.COLOR_ATTACHMENT0, t.TEXTURE_2D, this.N[0], 0);
    else {
      const e = [];
      for (let i = 0; i < this.Y; i++) {
        const s = t.COLOR_ATTACHMENT0 + i;
        t.framebufferTexture2D(t.FRAMEBUFFER, s, t.TEXTURE_2D, this.N[i], 0), e.push(s);
      }
      t.drawBuffers(e);
    }
    t.bindFramebuffer(t.FRAMEBUFFER, null);
  }
  J() {
    const t = this.A;
    this.X = t.createRenderbuffer(), t.bindRenderbuffer(t.RENDERBUFFER, this.X), t.renderbufferStorage(t.RENDERBUFFER, t.DEPTH_COMPONENT24, this.H, this.I), t.bindFramebuffer(t.FRAMEBUFFER, this.G), t.framebufferRenderbuffer(t.FRAMEBUFFER, t.DEPTH_ATTACHMENT, t.RENDERBUFFER, this.X), t.bindFramebuffer(t.FRAMEBUFFER, null), t.bindRenderbuffer(t.RENDERBUFFER, null);
  }
  tt(t) {
    Tt(this.A, this.N[0], t);
  }
  resize(t, e) {
    this.H = t, this.I = e, this.Z.clear();
    const i = this.A, s = this.l.type === "float" ? i.FLOAT : i.UNSIGNED_BYTE, r = s === i.FLOAT ? i.RGBA32F : i.RGBA8, h = i.RGBA;
    for (const o of this.N) i.bindTexture(i.TEXTURE_2D, o), i.texImage2D(i.TEXTURE_2D, 0, r, this.H, this.I, 0, h, s, null);
    i.bindTexture(i.TEXTURE_2D, null), this.X && (i.bindRenderbuffer(i.RENDERBUFFER, this.X), i.renderbufferStorage(i.RENDERBUFFER, i.DEPTH_COMPONENT24, this.H, this.I), i.bindRenderbuffer(i.RENDERBUFFER, null));
  }
  readPixels(t) {
    const e = this.Z.get(t);
    if (e) return e;
    const i = this.A, s = this.H, r = this.I, h = new Uint8Array(s * r * 4), o = i.getParameter(i.READ_FRAMEBUFFER_BINDING);
    i.bindFramebuffer(i.READ_FRAMEBUFFER, this.G), i.readBuffer(i.COLOR_ATTACHMENT0 + t), i.readPixels(0, 0, s, r, i.RGBA, i.UNSIGNED_BYTE, h), i.bindFramebuffer(i.READ_FRAMEBUFFER, o);
    const c = 4 * s, l = new Uint8Array(h.length);
    for (let u = 0; u < r; u++) {
      const f = (r - 1 - u) * c, g = u * c;
      l.set(h.subarray(f, f + c), g);
    }
    return this.Z.set(t, l), l;
  }
  begin() {
    const t = this.A;
    this.Z.clear(), this.K.st(), this.K.it(this.G, this.H, this.I), this.l.depth && t.clear(t.DEPTH_BUFFER_BIT), this.K.state.et();
  }
  end() {
    this.K.state.rt(), this.K.nt(), this.K.ot();
  }
  ht() {
    return this.W || this.ct(), this.W;
  }
  ct() {
    if (!this.K) return;
    const t = { Ua: this.N[0], Ub: this.N[1], Uc: this.N[2], Ud: [this.H, this.I] }, e = X.j;
    this.W = this.K.ut.lt(e, t, !0);
  }
  ft() {
    const t = this.A;
    t.deleteFramebuffer(this.G);
    for (const e of this.N) t.deleteTexture(e);
    this.X && t.deleteRenderbuffer(this.X);
  }
  get width() {
    return this.H;
  }
  get height() {
    return this.I;
  }
  get textures() {
    return this.N;
  }
  get attachmentCount() {
    return this.Y;
  }
};
a(X, "j", null);
let $ = X;
const xt = /* @__PURE__ */ new WeakMap();
function rt(n, t) {
  xt.set(n, t);
}
function Rt(n) {
  return xt.get(n);
}
function J(n, t, e, i, s = 255) {
  n[0] = t / 255, n[1] = (e ?? t) / 255, n[2] = (i ?? t) / 255, n[3] = s / 255;
}
class it {
  constructor() {
    a(this, "dt", 1);
    a(this, "gt", 0);
    a(this, "vt", 0);
    a(this, "_t", 0);
    a(this, "At", 0);
    a(this, "yt", 0);
    a(this, "wt", 0);
    a(this, "bt", [0, 0, 0]);
    a(this, "Ct", [1, 1, 1, 1]);
    a(this, "xt", [0, 0, 0, 1]);
    a(this, "Mt", !1);
    a(this, "Ft", !1);
    a(this, "Tt", !1);
    a(this, "$t", 0);
    a(this, "Pt", [0, 0, 0, 1]);
    a(this, "Et", !1);
    a(this, "Rt", []);
    a(this, "St", []);
  }
  static Ut() {
    return { kt: 1, zt: 0, Lt: 0, Ot: 0, At: 0, yt: 0, wt: 0, $t: 0, Dt: !1, Ht: !1, Tt: !1, Et: !1, It: [0, 0, 0], Bt: [1, 1, 1, 1], Gt: [0, 0, 0, 1] };
  }
  Nt(t) {
    t.kt = this.dt, t.zt = this.gt, t.Lt = this.vt, t.Ot = this._t, t.At = this.At, t.yt = this.yt, t.wt = this.wt, t.Dt = this.Mt, t.Ht = this.Ft, t.Tt = this.Tt, t.$t = this.$t, t.Et = this.Et, t.It[0] = this.bt[0], t.It[1] = this.bt[1], t.It[2] = this.bt[2], t.Bt[0] = this.Ct[0], t.Bt[1] = this.Ct[1], t.Bt[2] = this.Ct[2], t.Bt[3] = this.Ct[3], t.Gt[0] = this.xt[0], t.Gt[1] = this.xt[1], t.Gt[2] = this.xt[2], t.Gt[3] = this.xt[3];
  }
  Xt(t) {
    this.dt = t.kt, this.gt = t.zt, this.vt = t.Lt, this._t = t.Ot, this.At = t.At, this.yt = t.yt, this.wt = t.wt, this.Mt = t.Dt, this.Ft = t.Ht, this.Tt = t.Tt, this.$t = t.$t, this.Et = t.Et, this.bt[0] = t.It[0], this.bt[1] = t.It[1], this.bt[2] = t.It[2], this.Ct[0] = t.Bt[0], this.Ct[1] = t.Bt[1], this.Ct[2] = t.Bt[2], this.Ct[3] = t.Bt[3], this.xt[0] = t.Gt[0], this.xt[1] = t.Gt[1], this.xt[2] = t.Gt[2], this.xt[3] = t.Gt[3];
  }
  et() {
    let t = this.St.pop();
    t || (t = it.Ut()), this.Nt(t), this.Rt.push(t);
  }
  rt() {
    const t = this.Rt.pop();
    t ? (this.Xt(t), this.St.push(t)) : console.warn("pop() called without matching push()");
  }
  Yt(t) {
    this.Nt(t);
  }
  Kt(t) {
    this.dt = Math.abs(t);
  }
  Wt() {
    this.gt = 0, this.vt = 0, this._t = 0, this.At = 0, this.yt = 0, this.wt = 0, this.Et = !1;
  }
  Zt(t) {
    t !== 0 && (this.At += t * Math.PI / 180);
  }
  jt(t) {
    t !== 0 && (this.yt += t * Math.PI / 180);
  }
  Vt(t) {
    t !== 0 && (this.wt += t * Math.PI / 180);
  }
  qt(t = 0, e = 0, i = 0) {
    t === 0 && e === 0 && i === 0 || (this.gt += t, this.vt += e, this._t += i);
  }
  Qt(t) {
    this.qt(t, 0, 0);
  }
  Jt(t) {
    this.qt(0, t, 0);
  }
  ts(t) {
    this.qt(0, 0, t);
  }
  ss(t) {
    this.bt[0] = t[0], this.bt[1] = t[1], this.bt[2] = t[2];
  }
  es(t, e, i, s = 255) {
    J(this.Ct, t, e, i, s);
  }
  rs(t, e, i, s = 255) {
    J(this.xt, t, e, i, s);
  }
  ns(t) {
    this.Mt = t;
  }
  hs(t) {
    this.Ft = t;
  }
  cs(t) {
    this.Tt = t;
  }
  ls(t) {
    this.$t = Et(t);
  }
  us(t, e, i, s) {
    J(this.Pt, t, e, i, s);
  }
  fs(t) {
    this.Et = t;
  }
  get canvasBackgroundColor() {
    return this.Pt;
  }
  get useOrtho() {
    return this.Et;
  }
  get rotationX() {
    return this.At;
  }
  get rotationY() {
    return this.yt;
  }
  get rotationZ() {
    return this.wt;
  }
}
const ut = new Float32Array([-0.5, -0.5, 0, 0, 0.5, -0.5, 1, 0, -0.5, 0.5, 0, 1, -0.5, 0.5, 0, 1, 0.5, -0.5, 1, 0, 0.5, 0.5, 1, 1]), z = { ds: 16, ps: WebGL2RenderingContext.TRIANGLES, gs: { vs: { size: 2, offset: 0 }, _s: { size: 2, offset: 8 } } };
class Ht {
  constructor(t) {
    a(this, "A");
    a(this, "As");
    a(this, "ws");
    this.A = t, this.As = t.createBuffer(), this.ws = new Float32Array(ut.length);
  }
  bs(t, e, i, s) {
    const r = this.A, h = Rt(this.A), o = h[2], c = h[3], l = t / o * 2 - 1, u = (t + i) / o * 2 - 1, f = 1 - (e + s) / c * 2, g = 1 - e / c * 2, A = ut, p = this.ws;
    for (let d = 0; d < A.length; d += 4) {
      const v = A[d], m = A[d + 1], y = A[d + 2], w = A[d + 3], b = l + (v + 0.5) * (u - l), E = f + (m + 0.5) * (g - f);
      p[d] = b, p[d + 1] = E, p[d + 2] = y, p[d + 3] = w;
    }
    r.bindBuffer(r.ARRAY_BUFFER, this.As), r.bufferData(r.ARRAY_BUFFER, p, r.DYNAMIC_DRAW), r.enableVertexAttribArray(0), r.vertexAttribPointer(0, 2, r.FLOAT, !1, 16, 0), r.drawArrays(r.TRIANGLES, 0, 6), r.disableVertexAttribArray(0), r.bindBuffer(r.ARRAY_BUFFER, null);
  }
  ft() {
    this.A.deleteBuffer(this.As);
  }
}
var T = ((n) => (n.RECTANGLE = "rectangle", n.LINE = "line", n.ELLIPSE = "ellipse", n.ARC = "arc", n.TRIANGLE = "triangle", n.BEZIER_CURVE = "bezier_curve", n))(T || {});
const Wt = { rectangle: 2, line: 2, ellipse: 2, triangle: 2, arc: 3, bezier_curve: 4 };
class jt {
  constructor(t) {
    a(this, "A");
    a(this, "Cs", /* @__PURE__ */ new Map());
    this.A = t;
  }
  Ms(t, e, i, s) {
    const r = this.A;
    let h = this.Cs.get(t);
    h || (h = /* @__PURE__ */ new Map(), this.Cs.set(t, h));
    let o = h.get(e) || null;
    if (!o) {
      o = r.createVertexArray(), h.set(e, o), r.bindVertexArray(o), r.bindBuffer(r.ARRAY_BUFFER, s);
      const c = r.getAttribLocation(t, "A0");
      c !== -1 && lt(r, c, i.gs.vs.size, i.ds, i.gs.vs.offset, 0, r.FLOAT, !1);
      const l = r.getAttribLocation(t, "A1");
      l !== -1 && lt(r, l, i.gs._s.size, i.ds, i.gs._s.offset, 0, r.FLOAT, !1);
    }
    r.bindVertexArray(o);
  }
  Fs() {
    this.A.bindVertexArray(null);
  }
  ft() {
    for (const [, t] of this.Cs) for (const [, e] of t) e && this.A.deleteVertexArray(e);
  }
}
const N = class N {
  static Ts(t, e, i = 0) {
    const s = e || new Float32Array(N.FLOATS_PER_INSTANCE);
    let r = i;
    s[r++] = t.vs[0], s[r++] = t.vs[1], s[r++] = t.$s[0], s[r++] = t.$s[1], s[r++] = t.It[0], s[r++] = t.It[1], s[r++] = t.It[2], s[r++] = t.Bt[0], s[r++] = t.Bt[1], s[r++] = t.Bt[2], s[r++] = t.Bt[3], s[r++] = t.Gt[0], s[r++] = t.Gt[1], s[r++] = t.Gt[2], s[r++] = t.Gt[3], s[r++] = t.Ps[0], s[r++] = t.Ps[1], s[r++] = t.Ps[2], s[r++] = t.$t;
    const h = t.Es;
    s[r++] = (h == null ? void 0 : h[0]) ?? 0, s[r++] = (h == null ? void 0 : h[1]) ?? 0, s[r++] = (h == null ? void 0 : h[2]) ?? 0;
    const o = t.Rs;
    s[r++] = (o == null ? void 0 : o[0]) ?? 0, s[r++] = (o == null ? void 0 : o[1]) ?? 0, s[r++] = (o == null ? void 0 : o[2]) ?? 0;
    const c = t.Ss, l = t.Us, u = t.ks, f = t.zs, g = t.Ls, A = !(!l || !u);
    return A ? (s[r++] = (f == null ? void 0 : f[0]) ?? 0, s[r++] = (f == null ? void 0 : f[1]) ?? 0, s[r++] = (g == null ? void 0 : g[0]) ?? 0, s[r++] = (g == null ? void 0 : g[1]) ?? 0, s[r++] = l[0], s[r++] = l[1], s[r++] = u[0], s[r++] = u[1]) : !A && !!c ? (s[r++] = c[0], s[r++] = c[1], s[r++] = 0, s[r++] = 0, s[r++] = 0, s[r++] = 0, s[r++] = 0, s[r++] = 0) : (s[r++] = 0, s[r++] = 0, s[r++] = 0, s[r++] = 0, s[r++] = 0, s[r++] = 0, s[r++] = 0, s[r++] = 0), s[r++] = t.Os ?? 0, s[r++] = t.Ds ?? 0, s[r++] = t.Hs ?? 0, s;
  }
  static Is(t, e) {
    const i = t.length * N.FLOATS_PER_INSTANCE, s = e || new Float32Array(i);
    for (let r = 0; r < t.length; r++) {
      const h = r * N.FLOATS_PER_INSTANCE;
      N.Ts(t[r], s, h);
    }
    return s;
  }
};
a(N, "BYTES_PER_INSTANCE", 144), a(N, "FLOATS_PER_INSTANCE", 36);
let L = N;
const U = class U {
};
a(U, "STRIDE", L.BYTES_PER_INSTANCE), a(U, "ATTRIBUTES", { A2: { location: -1, size: 2, type: WebGL2RenderingContext.FLOAT, normalized: !1, stride: U.STRIDE, offset: 0, divisor: 1 }, A3: { location: -1, size: 2, type: WebGL2RenderingContext.FLOAT, normalized: !1, stride: U.STRIDE, offset: 8, divisor: 1 }, A4: { location: -1, size: 3, type: WebGL2RenderingContext.FLOAT, normalized: !1, stride: U.STRIDE, offset: 16, divisor: 1 }, A5: { location: -1, size: 4, type: WebGL2RenderingContext.FLOAT, normalized: !1, stride: U.STRIDE, offset: 28, divisor: 1 }, A6: { location: -1, size: 4, type: WebGL2RenderingContext.FLOAT, normalized: !1, stride: U.STRIDE, offset: 44, divisor: 1 }, A7: { location: -1, size: 4, type: WebGL2RenderingContext.FLOAT, normalized: !1, stride: U.STRIDE, offset: 60, divisor: 1 }, A8: { location: -1, size: 3, type: WebGL2RenderingContext.FLOAT, normalized: !1, stride: U.STRIDE, offset: 76, divisor: 1 }, A9: { location: -1, size: 3, type: WebGL2RenderingContext.FLOAT, normalized: !1, stride: U.STRIDE, offset: 88, divisor: 1 }, Aa: { location: -1, size: 4, type: WebGL2RenderingContext.FLOAT, normalized: !1, stride: U.STRIDE, offset: 100, divisor: 1 }, Ab: { location: -1, size: 4, type: WebGL2RenderingContext.FLOAT, normalized: !1, stride: U.STRIDE, offset: 116, divisor: 1 }, Ac: { location: -1, size: 3, type: WebGL2RenderingContext.FLOAT, normalized: !1, stride: U.STRIDE, offset: 132, divisor: 1 } });
let H = U;
class Vt {
  constructor(t = 1e3, e = 1.5) {
    a(this, "Bs");
    a(this, "Gs");
    a(this, "Ns");
    a(this, "Xs", 0);
    a(this, "Ys", 0);
    this.Gs = t, this.Ns = e;
    const i = t * L.FLOATS_PER_INSTANCE;
    this.Bs = new Float32Array(i);
  }
  Ks(t) {
    if (t <= this.Gs) return;
    const e = Math.ceil(t * this.Ns), i = this.Gs;
    this.Gs = e;
    const s = e * L.FLOATS_PER_INSTANCE, r = new Float32Array(s), h = i * L.FLOATS_PER_INSTANCE;
    r.set(this.Bs.subarray(0, Math.min(h, this.Xs))), this.Bs = r;
  }
  Ws() {
    return { buffer: this.Bs, offset: this.Xs };
  }
  Zs(t) {
    this.Xs += t, this.Ys++;
  }
  js() {
    this.Xs = 0, this.Ys = 0;
  }
  Vs(t = 0, e) {
    return this.Bs.subarray(t, e ?? this.Xs);
  }
  get qs() {
    return this.Ys;
  }
  get Qs() {
    return this.Gs;
  }
  get Js() {
    return this.Xs;
  }
  get ti() {
    return this.Ys === 0;
  }
}
class Zt {
  constructor(t) {
    a(this, "Bs");
    this.Bs = t;
  }
  si(t) {
    this.Bs.Ks(this.Bs.qs + 1);
    const { buffer: e, offset: i } = this.Bs.Ws();
    e[i + 0] = t.x, e[i + 1] = t.y, e[i + 2] = t.width, e[i + 3] = t.height, e[i + 4] = t.char0, e[i + 5] = t.char1, e[i + 6] = t.char2, e[i + 7] = t.r1, e[i + 8] = t.g1, e[i + 9] = t.b1, e[i + 10] = t.a1, e[i + 11] = t.r2, e[i + 12] = t.g2, e[i + 13] = t.b2, e[i + 14] = t.a2, e[i + 15] = t.invert, e[i + 16] = t.flipX, e[i + 17] = t.flipY, e[i + 18] = t.charRot, e[i + 19] = t.translationX, e[i + 20] = t.translationY, e[i + 21] = t.translationZ, e[i + 22] = t.rotationX, e[i + 23] = t.rotationY, e[i + 24] = t.rotationZ;
    const s = t.curveParams0, r = t.curveParams1;
    return e[i + 25] = s[0], e[i + 26] = s[1], e[i + 27] = s[2], e[i + 28] = s[3], e[i + 29] = r[0], e[i + 30] = r[1], e[i + 31] = r[2], e[i + 32] = r[3], e[i + 33] = t.depth, e[i + 34] = t.baseZ, e[i + 35] = t.geometryType, this.Bs.Zs(L.FLOATS_PER_INSTANCE), this.Bs.qs - 1;
  }
  get qs() {
    return this.Bs.qs;
  }
}
class qt {
  constructor(t, e = 1e3) {
    a(this, "A");
    a(this, "ii", null);
    a(this, "ei", 0);
    a(this, "ri", /* @__PURE__ */ new Map());
    this.A = t, this.ni(e);
  }
  ni(t) {
    const e = this.A;
    this.ii && e.deleteBuffer(this.ii), this.ii = e.createBuffer();
    const i = t * L.BYTES_PER_INSTANCE;
    bt(e, e.ARRAY_BUFFER, this.ii, i, e.DYNAMIC_DRAW), this.ei = t;
  }
  oi(t) {
    this.ni(t);
  }
  get Qs() {
    return this.ei;
  }
  hi(t, e) {
    if (e === 0) return;
    const i = this.A;
    i.bindBuffer(i.ARRAY_BUFFER, this.ii);
    const s = e * L.FLOATS_PER_INSTANCE;
    i.bufferSubData(i.ARRAY_BUFFER, 0, t, 0, s);
  }
  ai(t) {
    let e = this.ri.get(t);
    if (!e) {
      e = /* @__PURE__ */ new Map();
      const i = this.A;
      for (const s in H.ATTRIBUTES) {
        const r = i.getAttribLocation(t, s);
        r !== -1 && e.set(s, r);
      }
      this.ri.set(t, e);
    }
    return e;
  }
  ci(t) {
    const e = this.A, i = t.D, s = this.ai(i);
    for (const [r, h] of s) {
      const o = H.ATTRIBUTES[r];
      o && lt(e, h, o.size, o.stride, o.offset, o.divisor, o.type, o.normalized);
    }
  }
  li(t) {
    const e = this.A, i = this.ai(t.D);
    for (const [s, r] of i)
      H.ATTRIBUTES[s] && (e.disableVertexAttribArray(r), e.vertexAttribDivisor(r, 0));
  }
  ft() {
    this.ii && (this.A.deleteBuffer(this.ii), this.ii = null), this.ri.clear();
  }
}
class Qt {
  constructor(t, e = 1e3, i = 1.5) {
    a(this, "A");
    a(this, "Bs");
    a(this, "ui");
    a(this, "fi");
    this.A = t, this.Bs = new Vt(e, i), this.ui = new Zt(this.Bs), this.fi = new qt(t, e);
  }
  di(t) {
    var s, r, h, o, c, l, u, f, g, A;
    const e = [0, 0, 0, 0], i = [0, 0, 0, 0];
    return t.Us && t.ks ? (e[0] = ((s = t.zs) == null ? void 0 : s[0]) ?? 0, e[1] = ((r = t.zs) == null ? void 0 : r[1]) ?? 0, e[2] = ((h = t.Ls) == null ? void 0 : h[0]) ?? 0, e[3] = ((o = t.Ls) == null ? void 0 : o[1]) ?? 0, i[0] = t.Us[0], i[1] = t.Us[1], i[2] = t.ks[0], i[3] = t.ks[1]) : t.Ss && (e[0] = t.Ss[0], e[1] = t.Ss[1]), this.si({ x: t.vs[0], y: t.vs[1], width: t.$s[0], height: t.$s[1], char0: t.It[0], char1: t.It[1], char2: t.It[2], r1: t.Bt[0], g1: t.Bt[1], b1: t.Bt[2], a1: t.Bt[3], r2: t.Gt[0], g2: t.Gt[1], b2: t.Gt[2], a2: t.Gt[3], invert: t.Ps[0], flipX: t.Ps[1], flipY: t.Ps[2], charRot: t.$t, translationX: ((c = t.Es) == null ? void 0 : c[0]) ?? 0, translationY: ((l = t.Es) == null ? void 0 : l[1]) ?? 0, translationZ: ((u = t.Es) == null ? void 0 : u[2]) ?? 0, rotationX: ((f = t.Rs) == null ? void 0 : f[0]) ?? 0, rotationY: ((g = t.Rs) == null ? void 0 : g[1]) ?? 0, rotationZ: ((A = t.Rs) == null ? void 0 : A[2]) ?? 0, curveParams0: e, curveParams1: i, depth: t.Os || 0, baseZ: t.Ds || 0, geometryType: t.Hs || 0 });
  }
  si(t) {
    const e = this.ui.si(t);
    return this.Bs.Qs > this.fi.Qs && this.fi.oi(this.Bs.Qs), e;
  }
  get pi() {
    return this.Bs.qs;
  }
  get ti() {
    return this.Bs.ti;
  }
  gi() {
    this.Bs.js();
  }
  ci(t) {
    const e = this.Bs.qs;
    if (e === 0) return;
    const i = this.Bs.Vs();
    this.fi.hi(i, e), this.fi.ci(t);
  }
  li(t) {
    this.fi.li(t);
  }
  bs(t, e) {
    const i = this.Bs.qs;
    i !== 0 && this.A.drawArraysInstanced(t, 0, e, i);
  }
  ft() {
    this.fi.ft();
  }
}
class O {
  constructor(t, e, i, s) {
    a(this, "A");
    a(this, "mi");
    a(this, "_i");
    a(this, "Ai");
    a(this, "yi", null);
    this.A = t, this.mi = e, this._i = i, this.Ai = s;
    const r = this.A.createBuffer();
    bt(this.A, this.A.ARRAY_BUFFER, r, this.Ai.wi, this.A.STATIC_DRAW), this.yi = r;
  }
  get type() {
    return this._i;
  }
  get unitGeometry() {
    return this.Ai;
  }
  get unitBuffer() {
    return this.yi;
  }
  get batch() {
    return this.mi;
  }
  bi() {
    this.mi.gi();
  }
  Ci() {
    return !this.mi.ti;
  }
  ft() {
    this.mi.ft(), this.A.deleteBuffer(this.yi);
  }
  xi(t, e, i) {
    return this.mi.di(t);
  }
  Mi(t, e, i, s, r, h) {
    const o = r.zt ?? 0, c = r.Lt ?? 0, l = r.Ot ?? 0, u = r.At ?? 0, f = r.yt ?? 0, g = r.wt ?? 0, A = [0, 0, 0, 0], p = [0, 0, 0, 0];
    h && (h.bezStartX !== void 0 && h.bezStartY !== void 0 && h.bezEndX !== void 0 && h.bezEndY !== void 0 ? (A[0] = h.cp1x ?? 0, A[1] = h.cp1y ?? 0, A[2] = h.cp2x ?? 0, A[3] = h.cp2y ?? 0, p[0] = h.bezStartX ?? 0, p[1] = h.bezStartY ?? 0, p[2] = h.bezEndX ?? 0, p[3] = h.bezEndY ?? 0) : h.arcStart === void 0 && h.arcStop === void 0 || (A[0] = h.arcStart ?? 0, A[1] = h.arcStop ?? 0));
    const d = { x: t, y: e, width: i, height: s, char0: r.It[0], char1: r.It[1], char2: r.It[2], r1: r.Bt[0], g1: r.Bt[1], b1: r.Bt[2], a1: r.Bt[3], r2: r.Gt[0], g2: r.Gt[1], b2: r.Gt[2], a2: r.Gt[3], invert: r.Tt ? 1 : 0, flipX: r.Dt ? 1 : 0, flipY: r.Ht ? 1 : 0, charRot: r.$t, translationX: o, translationY: c, translationZ: l, rotationX: u, rotationY: f, rotationZ: g, curveParams0: A, curveParams1: p, depth: (h == null ? void 0 : h.depth) ?? 0, baseZ: (h == null ? void 0 : h.baseZ) ?? 0, geometryType: Wt[this._i] ?? 0 };
    return this.mi.si(d);
  }
}
const Jt = { wi: ut, Fi: 6, ...z }, $t = { wi: new Float32Array([0, -0.5, 0, 0, 1, -0.5, 1, 0, 0, 0.5, 0, 1, 0, 0.5, 0, 1, 1, -0.5, 1, 0, 1, 0.5, 1, 1]), Fi: 6, ...z }, te = { wi: function(n = 32) {
  const t = [], e = 2 * Math.PI / n;
  for (let i = 0; i < n; i++) {
    const s = i * e, r = (i + 1) % n * e, h = Math.cos(s), o = Math.sin(s), c = 0.5 * (h + 1), l = 0.5 * (o + 1), u = Math.cos(r), f = Math.sin(r), g = 0.5 * (u + 1), A = 0.5 * (f + 1);
    t.push(0, 0, 0.5, 0.5, h, o, c, l, u, f, g, A);
  }
  return new Float32Array(t);
}(32), Fi: 96, ...z };
let ee = { wi: function(n) {
  const t = [];
  for (let e = 0; e < n; e++) {
    const i = e / n, s = (e + 1) / n;
    t.push(i, 0, i, 0, i, 1, i, 1, s, 1, s, 1);
  }
  return new Float32Array(t);
}(32), Fi: 96, ...z };
const ie = { wi: new Float32Array([0, 0, 0, 0, 1, 0, 1, 0, 0.5, 1, 0.5, 1]), Fi: 3, ...z }, se = { wi: function(n = 16) {
  const t = [];
  for (let e = 0; e < n; e++) {
    const i = e / n, s = (e + 1) / n;
    t.push(i, -0.5, i, 0, s, -0.5, s, 0, i, 0.5, i, 1, i, 0.5, i, 1, s, -0.5, s, 0, s, 0.5, s, 1);
  }
  return new Float32Array(t);
}(16), Fi: 96, ...z }, re = { [T.RECTANGLE]: class extends O {
  constructor(n, t) {
    super(n, t, T.RECTANGLE, Jt);
  }
  di(n, t) {
    return this.Mi(0, 0, n.width, n.height, t);
  }
}, [T.LINE]: class extends O {
  constructor(n, t) {
    super(n, t, T.LINE, $t);
  }
  di(n, t) {
    const e = n.x2 - n.x1, i = n.y2 - n.y1, s = Math.hypot(e, i), r = Math.atan2(i, e), h = t.kt || 1, o = n.x1 + e / 2 - s / 2, c = n.y1 + i / 2, l = { ...t, wt: (t.wt || 0) + r };
    return this.Mi(o, c, s, h, l);
  }
}, [T.ELLIPSE]: class extends O {
  constructor(n, t) {
    super(n, t, T.ELLIPSE, te);
  }
  di(n, t) {
    return this.Mi(0, 0, n.width, n.height, t);
  }
}, [T.ARC]: class extends O {
  constructor(n, t) {
    super(n, t, T.ARC, ee);
  }
  di(n, t) {
    const e = n.start * Math.PI / 180, i = n.stop * Math.PI / 180;
    return this.Mi(0, 0, n.width, n.height, t, { arcStart: e, arcStop: i });
  }
}, [T.TRIANGLE]: class extends O {
  constructor(n, t) {
    super(n, t, T.TRIANGLE, ie);
  }
  di(n, t) {
    const e = Math.min(n.x1, n.x2, n.x3), i = Math.max(n.x1, n.x2, n.x3), s = Math.min(n.y1, n.y2, n.y3), r = i - e, h = Math.max(n.y1, n.y2, n.y3) - s;
    return this.Mi(e, s, r, h, t);
  }
}, [T.BEZIER_CURVE]: class extends O {
  constructor(n, t) {
    super(n, t, T.BEZIER_CURVE, se);
  }
  di(n, t) {
    return this.Mi(0, 0, 1, t.kt || 1, t, { cp1x: n.cp1x, cp1y: n.cp1y, cp2x: n.cp2x, cp2y: n.cp2y, bezStartX: n.x1, bezStartY: n.y1, bezEndX: n.x2, bezEndY: n.y2 });
  }
} };
class ne {
  constructor(t) {
    a(this, "A");
    a(this, "Ti");
    a(this, "$i");
    this.A = t, this.$i = new jt(t), this.Ti = /* @__PURE__ */ new Map();
    for (const e of Object.values(T)) {
      const i = new Qt(t), s = new re[e](t, i);
      this.Ti.set(e, s);
    }
  }
  Pi(t) {
    const e = this.Ei(t);
    for (const i of e) this.Ri(i);
  }
  Ei(t) {
    const e = [];
    let i = null, s = null, r = null;
    for (const h of t) s !== h.material || r !== h.type ? (i && i.length > 0 && e.push({ material: s, type: r, commands: i }), i = [h], s = h.material, r = h.type) : i.push(h);
    return i && i.length > 0 && e.push({ material: s, type: r, commands: i }), e;
  }
  Ri(t) {
    const { material: e, type: i, commands: s } = t, r = this.Ti.get(i);
    e.shader.U(), e.shader.L(e.uniforms);
    const h = Rt(this.A), o = s.length > 0 && s[0].state.Et;
    e.shader.L({ Uh: h[2] / h[3], Ue: [h[2], h[3]], Uf: 1, Ug: o ? 1 : 0 }), r.bi();
    for (const c of s) r.di(c.params, c.state);
    if (r.Ci()) {
      const c = r.unitGeometry, l = r.unitBuffer;
      try {
        this.$i.Ms(e.shader.D, i + "", c, l), r.batch.ci(e.shader), r.batch.bs(c.ps, c.Fi);
      } finally {
        r.batch.li(e.shader), this.$i.Fs(), r.bi();
      }
    }
  }
  ft() {
    for (const t of this.Ti.values()) t.ft();
    this.Ti.clear(), this.$i.ft();
  }
}
function Ft(n) {
  let t = 0;
  for (let e = 0; e < n.length; e++)
    t = (t << 5) - t + n.charCodeAt(e), t &= t;
  return t;
}
function vt(n) {
  return Ft(n + "");
}
function Y(n, t) {
  return (n << 5) - n + t;
}
class he {
  constructor(t) {
    a(this, "Si", 0);
    a(this, "Ui");
    a(this, "ki");
    a(this, "zi", /* @__PURE__ */ new Map());
    this.Ui = new W(t, et, `#version 300 es
precision highp float;in vec3 v_glyphIndex;in vec4 v_glyphColor;in vec4 v_cellColor;in vec4 v_glyphFlags;layout(location=0)out vec4 o_character;layout(location=1)out vec4 o_primaryColor;layout(location=2)out vec4 o_secondaryColor;void main(){int A=int(v_glyphFlags.r>0.5?1:0);int B=int(v_glyphFlags.g>0.5?1:0);int C=int(v_glyphFlags.b>0.5?1:0);float D=float(A|(B<<1)|(C<<2))/255.;o_character=vec4(v_glyphIndex.xy,D,clamp(v_glyphFlags.a,0.,1.));o_primaryColor=vec4(v_glyphColor.rgb,v_glyphColor.a);o_secondaryColor=vec4(v_cellColor.rgb,v_cellColor.a);}`), this.ki = { id: this.Si++, shader: this.Ui, uniforms: Object.freeze({}), hash: this.Li(this.Ui, {}), isBuiltIn: !0 };
  }
  get Oi() {
    return this.ki;
  }
  lt(t, e = {}, i = !1) {
    const s = this.Li(t, e), r = this.zi.get(s);
    if (r) return r;
    const h = { id: this.Si++, shader: t, uniforms: Object.freeze({ ...e }), hash: s, isBuiltIn: i };
    return this.zi.set(s, h), h;
  }
  Di(t, e = {}) {
    return { id: this.Si++, shader: t, uniforms: Object.freeze({ ...e }), hash: 0, isBuiltIn: !1 };
  }
  Li(t, e) {
    const i = vt(t.D), s = function(r, h) {
      let o = 0;
      const c = Object.keys(r).sort();
      for (const l of c) o = Y(o, Ft(l)), o = Y(o, h(r[l]));
      return o;
    }(e, this.Hi.bind(this));
    return Y(i, s);
  }
  Hi(t) {
    return typeof t == "number" || typeof t == "boolean" ? function(e) {
      return typeof e == "boolean" ? e ? 1 : 0 : Math.floor(e);
    }(t) : Array.isArray(t) ? function(e) {
      let i = 0;
      const s = Array.isArray(e[0]) ? e.flat() : e;
      for (const r of s) i = Y(i, typeof r == "number" ? r : 0);
      return i;
    }(t) : t instanceof Float32Array || t instanceof Int32Array ? function(e) {
      let i = 0;
      const s = Math.min(e.length, 16);
      for (let r = 0; r < s; r++) i = Y(i, e[r]);
      return i;
    }(t) : t instanceof WebGLTexture ? vt(t) : 0;
  }
  ft() {
    this.Ui != this.Ui && this.Ui.dispose(), this.Ui.dispose(), this.zi.clear();
  }
}
class oe {
  constructor() {
    a(this, "Ii", []);
    a(this, "Bi", 1);
    a(this, "$s", 0);
  }
  Gi(t, e) {
    if (this.$s >= this.Ii.length) {
      const s = { id: this.Bi++, type: t, params: {}, state: it.Ut(), material: e };
      this.Ii.push(s);
    }
    const i = this.Ii[this.$s];
    return i.id = this.Bi++, i.type = t, i.material = e, this.$s++, i;
  }
  Ni(t, e, i) {
    const s = this.Gi(T.RECTANGLE, i), r = s.params;
    return r.width = t.width, r.height = t.height, e.Yt(s.state), s.id;
  }
  Xi(t, e, i) {
    const s = this.Gi(T.LINE, i), r = s.params;
    return r.x1 = t.x1, r.y1 = t.y1, r.x2 = t.x2, r.y2 = t.y2, r.thickness = t.thickness, e.Yt(s.state), s.id;
  }
  Yi(t, e, i) {
    const s = this.Gi(T.ELLIPSE, i), r = s.params;
    return r.width = t.width, r.height = t.height, r.startAngle = t.startAngle, r.endAngle = t.endAngle, r.segments = t.segments, e.Yt(s.state), s.id;
  }
  Ki(t, e, i) {
    const s = this.Gi(T.ARC, i), r = s.params;
    return r.width = t.width, r.height = t.height, r.start = t.start, r.stop = t.stop, e.Yt(s.state), s.id;
  }
  Wi(t, e, i) {
    const s = this.Gi(T.TRIANGLE, i), r = s.params;
    return r.x1 = t.x1, r.y1 = t.y1, r.x2 = t.x2, r.y2 = t.y2, r.x3 = t.x3, r.y3 = t.y3, e.Yt(s.state), s.id;
  }
  Zi(t, e, i) {
    const s = this.Gi(T.BEZIER_CURVE, i), r = s.params;
    return r.x1 = t.x1, r.y1 = t.y1, r.cp1x = t.cp1x, r.cp1y = t.cp1y, r.cp2x = t.cp2x, r.cp2y = t.cp2y, r.x2 = t.x2, r.y2 = t.y2, r.thickness = t.thickness, r.segments = t.segments, e.Yt(s.state), s.id;
  }
  gi() {
    this.$s = 0;
  }
  [Symbol.iterator]() {
    let t = 0;
    const e = this.$s, i = this.Ii;
    return { next: () => t < e ? { value: i[t++], done: !1 } : { value: void 0, done: !0 } };
  }
}
class ae {
  constructor(t) {
    a(this, "A");
    a(this, "ji", null);
    a(this, "Vi");
    a(this, "ut");
    a(this, "qi");
    a(this, "Qi");
    a(this, "Ji");
    a(this, "te", null);
    a(this, "se", {});
    a(this, "ie", []);
    a(this, "ee", []);
    a(this, "re", null);
    a(this, "ne", [0, 0, 0, 0]);
    this.A = t, t.enable(t.DEPTH_TEST), t.depthFunc(t.LEQUAL), t.clearDepth(1), t.depthMask(!0), t.disable(t.CULL_FACE), this.qi = new it(), this.ut = new he(t), this.Qi = new oe(), this.Vi = new ne(t), this.Ji = new Ht(t);
    const e = [0, 0, t.canvas.width, t.canvas.height];
    rt(t, e), this.ie.push(null), this.ee.push(e), this.re = null, this.ne = e;
  }
  st() {
    this.ie.push(this.re), this.ee.push([...this.ne]);
  }
  ot() {
    const t = this.ie.pop() ?? null, e = this.ee.pop() ?? [0, 0, this.A.canvas.width, this.A.canvas.height];
    this.it(t, e[2], e[3]);
  }
  it(t, e, i) {
    const s = this.A;
    this.re !== t && (s.bindFramebuffer(s.FRAMEBUFFER, t), this.re = t);
    const r = [0, 0, e, i];
    this.ne[0] === r[0] && this.ne[1] === r[1] && this.ne[2] === r[2] && this.ne[3] === r[3] || (s.viewport(...r), rt(s, r), this.ne = r);
  }
  oe(t) {
    this.ji !== t && (this.ji = t, t.U());
  }
  he(t, e) {
    return new W(this.A, t, e);
  }
  ae(t) {
    this.te = t, t && (this.se = {});
  }
  O(t, e) {
    this.se[t] = e;
  }
  ce(t) {
    Object.assign(this.se, t);
  }
  le(t) {
    return new W(this.A, et, t);
  }
  ue(t, e, i) {
    this.Qi.Ni({ width: e ?? t.width, height: i ?? t.height }, this.qi, t.ht());
  }
  fe(t, e, i, s) {
    this.Ji.bs(t, e, i, s);
  }
  de(t, e) {
    if (this.te) {
      const i = this.ut.Di(this.te, this.se);
      this.Qi.Ni({ width: t, height: e }, this.qi, i), this.te = null, this.se = {};
    } else this.Qi.Ni({ width: t, height: e }, this.qi, this.ut.Oi);
  }
  pe(t, e, i, s) {
    this.Qi.Xi({ x1: t, y1: e, x2: i, y2: s }, this.qi, this.ut.Oi);
  }
  ge(t, e) {
    this.Qi.Yi({ width: t, height: e }, this.qi, this.ut.Oi);
  }
  ve(t, e, i, s, r, h) {
    this.Qi.Wi({ x1: t, y1: e, x2: i, y2: s, x3: r, y3: h }, this.qi, this.ut.Oi);
  }
  me(t, e, i, s, r, h, o, c) {
    this.Qi.Zi({ x1: t, y1: e, cp1x: i, cp1y: s, cp2x: r, cp2y: h, x2: o, y2: c }, this.qi, this.ut.Oi);
  }
  _e(t, e, i, s) {
    this.Qi.Ki({ width: t, height: e, start: i, stop: s }, this.qi, this.ut.Oi);
  }
  Ae(t, e, i = 1, s = {}) {
    return new $(this.A, t, e, i, s, this);
  }
  ye(t, e = t, i = t, s = 255) {
    this.qi.us(t, e ?? t, i ?? t, s);
    const [r, h, o, c] = this.qi.canvasBackgroundColor;
    this.gi(r, h, o, c);
  }
  gi(t = 0, e = 0, i = 0, s = 0) {
    this.A.clearColor(t, e, i, s), this.A.clear(this.A.COLOR_BUFFER_BIT);
  }
  we() {
    const t = [0, 0, this.A.canvas.width, this.A.canvas.height];
    this.A.viewport(...t), rt(this.A, t), this.ne = t, this.ee.length > 0 && (this.ee[0] = t);
  }
  nt() {
    const t = this.Qi;
    this.Vi.Pi(t), t.gi();
  }
  ft() {
    this.ut.ft(), this.Vi.ft(), this.Ji.ft();
  }
  get context() {
    return this.A;
  }
  get state() {
    return this.qi;
  }
  get materialManager() {
    return this.ut;
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
function Z(n) {
  return n + 3 & -4;
}
function q(n, t, e) {
  n[t] = e >>> 8 & 255, n[t + 1] = 255 & e;
}
function S(n, t, e) {
  n[t] = e >>> 24 & 255, n[t + 1] = e >>> 16 & 255, n[t + 2] = e >>> 8 & 255, n[t + 3] = 255 & e;
}
function ce(n, t, e) {
  for (let i = 0; i < e.length; i++) n[t + i] = 255 & e.charCodeAt(i);
}
function nt(n, t, e) {
  const i = t + e;
  let s = 0;
  const r = R.t;
  for (let h = t; h < i; h += 4) r.uint8[3] = n[h] || 0, r.uint8[2] = n[h + 1] || 0, r.uint8[1] = n[h + 2] || 0, r.uint8[0] = n[h + 3] || 0, s = s + (r.uint32[0] >>> 0) >>> 0;
  return s >>> 0;
}
class le {
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
function k(n) {
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
    u || (u = [], h.set(c, u)), u[ue(l, c)] = o;
  }
  return { min: t, max: e, table: h };
}
function ht(n, t) {
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
function ue(n, t) {
  let e = 0;
  for (let i = 0; i < t; i++) e = e << 1 | 1 & n, n >>>= 1;
  return e >>> 0;
}
function fe(n) {
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
        const A = r.readBits(16);
        if ((65535 & (65535 ^ A)) !== r.readBits(16)) throw Error("DEFLATE uncompressed LEN/NLEN mismatch");
        for (let p = 0; p < A; p++) h.push(r.readBits(8));
      } else {
        if (g !== 1 && g !== 2) throw Error("Unsupported DEFLATE type");
        {
          let A, p;
          if (g === 1) {
            const d = Array(288).fill(0);
            for (let v = 0; v <= 143; v++) d[v] = 8;
            for (let v = 144; v <= 255; v++) d[v] = 9;
            for (let v = 256; v <= 279; v++) d[v] = 7;
            for (let v = 280; v <= 287; v++) d[v] = 8;
            A = k(d), p = k(Array(32).fill(5));
          } else {
            const d = r.readBits(5) + 257, v = r.readBits(5) + 1, m = r.readBits(4) + 4, y = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15], w = Array(19).fill(0);
            for (let x = 0; x < m; x++) w[y[x]] = r.readBits(3);
            const b = k(w), E = [];
            for (; E.length < d + v; ) {
              const x = ht(r, b);
              if (x <= 15) E.push(x);
              else if (x === 16) {
                const P = r.readBits(2) + 3, C = E[E.length - 1] || 0;
                for (let V = 0; V < P; V++) E.push(C);
              } else if (x === 17) {
                const P = r.readBits(3) + 3;
                for (let C = 0; C < P; C++) E.push(0);
              } else {
                if (x !== 18) throw Error("Invalid code length symbol");
                {
                  const P = r.readBits(7) + 11;
                  for (let C = 0; C < P; C++) E.push(0);
                }
              }
            }
            const F = E.slice(0, d), M = E.slice(d, d + v);
            A = k(F), p = k(M);
          }
          for (; ; ) {
            const d = ht(r, A);
            if (d < 256) h.push(d);
            else {
              if (d === 256) break;
              if (d > 256 && d < 286) {
                const v = d - 257;
                let m = o[v];
                const y = c[v];
                y && (m += r.readBits(y));
                const w = ht(r, p);
                if (w >= 30) throw Error("Invalid distance symbol");
                let b = l[w];
                const E = u[w];
                E && (b += r.readBits(E));
                const F = h.length - b;
                if (F < 0) throw Error("Invalid distance");
                for (let M = 0; M < m; M++) h.push(h[F + M] || 0);
              } else if (d === 286 || d === 287) throw Error("Reserved length symbol");
            }
          }
        }
      }
    }
  }(new le(n.subarray(i)), s), new Uint8Array(s);
}
function de(n) {
  const t = R, e = new Uint8Array(n);
  if (t.readASCII(e, 0, 4) !== "wOFF") throw Error("Invalid WOFF signature");
  const i = t.readUint(e, 4), s = t.readUshort(e, 12), r = t.readUint(e, 16), h = [];
  let o = 44;
  for (let m = 0; m < s; m++) {
    const y = t.readASCII(e, o, 4), w = t.readUint(e, o + 4), b = t.readUint(e, o + 8), E = t.readUint(e, o + 12), F = t.readUint(e, o + 16);
    h.push({ tag: y, offset: w, compLength: b, origLength: E, checksum: F }), o += 20;
  }
  for (const m of h) {
    const y = new Uint8Array(e.buffer, m.offset, m.compLength);
    if (m.compLength === m.origLength) m.data = new Uint8Array(y);
    else if (m.data = fe(y), m.data.length !== m.origLength) if (m.data.length < m.origLength) {
      const w = new Uint8Array(m.origLength);
      w.set(m.data), m.data = w;
    } else m.data = m.data.subarray(0, m.origLength);
  }
  const c = s;
  let l = 1, u = 0;
  for (; l << 1 <= c; ) l <<= 1, u++;
  const f = 16 * l, g = 16 * c - f;
  let A = 12 + 16 * c;
  const p = {};
  for (const m of h) p[m.tag] = A, A = Z(A + m.data.length);
  const d = new Uint8Array(Math.max(r || 0, A));
  S(d, 0, i), q(d, 4, c), q(d, 6, f), q(d, 8, u), q(d, 10, g);
  let v = 12;
  for (const m of h) {
    ce(d, v, m.tag), v += 4;
    let y = m.data;
    if (m.tag === "head" && y.length >= 12) {
      const w = new Uint8Array(y);
      S(w, 8, 0), S(d, v, nt(w, 0, Z(w.length))), v += 4;
    } else
      S(d, v, nt(y, 0, Z(y.length))), v += 4;
    S(d, v, p[m.tag]), v += 4, S(d, v, m.data.length), v += 4;
  }
  for (const m of h) {
    const y = p[m.tag];
    d.set(m.data, y);
  }
  if (h.find((m) => m.tag === "head")) {
    const m = p.head, y = function(w, b) {
      const E = b + 8, F = [w[E], w[E + 1], w[E + 2], w[E + 3]];
      S(w, E, 0);
      const M = 2981146554 - (nt(w, 0, Z(w.length)) >>> 0) >>> 0;
      return w[E] = F[0], w[E + 1] = F[1], w[E + 2] = F[2], w[E + 3] = F[3], M >>> 0;
    }(d, m);
    S(d, m + 8, y);
  }
  return d.buffer;
}
const ge = { parseTab(n, t, e) {
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
    const g = `p${l}e${u}`;
    let A = o.indexOf(f);
    if (A === -1) {
      let p;
      A = i.tables.length, o.push(f);
      const d = r(n, f);
      p = d === 4 ? this.parse4(n, f) : d === 12 ? this.parse12(n, f) : { format: d }, i.tables.push(p);
    }
    i.ids[g] = A;
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
} }, Ae = { parseTab(n, t, e) {
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
} }, pe = { parseTab(n, t, e) {
  const i = R;
  t += 4;
  const s = ["ascender", "descender", "lineGap", "advanceWidthMax", "minLeftSideBearing", "minRightSideBearing", "xMaxExtent", "caretSlopeRise", "caretSlopeRun", "caretOffset", "res0", "res1", "res2", "res3", "metricDataFormat", "numberOfHMetrics"], r = {};
  for (let h = 0; h < s.length; h++) {
    const o = s[h], c = o === "advanceWidthMax" || o === "numberOfHMetrics" ? i.readUshort : i.readShort;
    r[o] = c(n, t + 2 * h);
  }
  return r;
} }, me = { parseTab(n, t, e, i) {
  const s = R, r = [], h = [], o = i.maxp.numGlyphs, c = i.hhea.numberOfHMetrics;
  let l = 0, u = 0, f = 0;
  for (; f < c; ) l = s.readUshort(n, t + (f << 2)), u = s.readShort(n, t + (f << 2) + 2), r.push(l), h.push(u), f++;
  for (; f < o; ) r.push(l), h.push(u), f++;
  return { aWidth: r, lsBearing: h };
} }, wt = { cmap: ge, head: Ae, hhea: pe, maxp: { parseTab(n, t, e) {
  const i = R;
  return i.readUint(n, t), t += 4, { numGlyphs: i.readUshort(n, t) };
} }, hmtx: me, loca: { parseTab(n, t, e, i) {
  const s = R, r = [], h = i.head.indexToLocFormat, o = i.maxp.numGlyphs + 1;
  if (h === 0) for (let c = 0; c < o; c++) r.push(s.readUshort(n, t + (c << 1)) << 1);
  else if (h === 1) for (let c = 0; c < o; c++) r.push(s.readUint(n, t + (c << 2)));
  return r;
} }, glyf: { parseTab(n, t, e, i) {
  const s = [], r = i.maxp.numGlyphs;
  for (let h = 0; h < r; h++) s.push(null);
  return s;
}, be(n, t) {
  const e = R, i = n.Ce, s = n.loca;
  if (s[t] === s[t + 1]) return null;
  const r = j.findTable(i, "glyf", n.xe);
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
      const A = i[h];
      if (h++, o.flags.push(A), 8 & A) {
        const p = i[h];
        h++;
        for (let d = 0; d < p; d++) o.flags.push(A), g++;
      }
    }
    o.xs = [];
    for (let g = 0; g < l; g++) {
      const A = o.flags[g], p = !!(16 & A);
      2 & A ? (o.xs.push(p ? i[h] : -i[h]), h++) : p ? o.xs.push(0) : (o.xs.push(e.readShort(i, h)), h += 2);
    }
    o.ys = [];
    for (let g = 0; g < l; g++) {
      const A = o.flags[g], p = !!(32 & A);
      4 & A ? (o.ys.push(p ? i[h] : -i[h]), h++) : p ? o.ys.push(0) : (o.ys.push(e.readShort(i, h)), h += 2);
    }
    let u = 0, f = 0;
    for (let g = 0; g < l; g++) u += o.xs[g], f += o.ys[g], o.xs[g] = u, o.ys[g] = f;
  } else o.parts = [], o.endPts = [], o.flags = [], o.xs = [], o.ys = [];
  return o;
} } }, j = { parse(n) {
  const t = new Uint8Array(n);
  R.readASCII(t, 0, 4) === "wOFF" && (n = de(n));
  const e = new Uint8Array(n), i = wt, s = {}, r = { Ce: e, Me: 0, xe: 0 };
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
}, T: wt, B: R };
class ve {
  Fe(t) {
    var i;
    const e = [];
    return (i = t.cmap) != null && i.tables ? (t.cmap.tables.forEach((s) => {
      if (s.format === 4) {
        const r = this.Te(s);
        e.push(...r);
      } else if (s.format === 12) {
        const r = this.$e(s);
        e.push(...r);
      }
    }), [...new Set(e)]) : [];
  }
  Te(t) {
    const e = [];
    if (!(t.startCount && t.endCount && t.idRangeOffset && t.idDelta)) return e;
    for (let i = 0; i < t.startCount.length; i++) {
      const s = t.startCount[i], r = t.endCount[i];
      if (s !== 65535 || r !== 65535) {
        for (let h = s; h <= r; h++)
          if (this.Pe(t, h, i) > 0) try {
            const o = String.fromCodePoint(h);
            e.push(o);
          } catch {
          }
      }
    }
    return e;
  }
  $e(t) {
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
  Pe(t, e, i) {
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
class we {
  constructor(t) {
    a(this, "Ee");
    a(this, "Re");
    a(this, "K");
    this.K = t, this.Ee = document.createElement("canvas"), this.Re = this.Ee.getContext("2d", { willReadFrequently: !0, alpha: !0 });
  }
  Se(t, e, i, s) {
    const r = t.length, h = Math.ceil(Math.sqrt(r)), o = Math.ceil(r / h), c = e.width * h, l = e.height * o;
    this.ke(c, l), this.ze(t, e, h, i, s);
    const u = this.K.Ae(c, l, 1, { filter: "nearest" });
    return u.tt(this.Ee), { framebuffer: u, columns: h, rows: o };
  }
  ke(t, e) {
    this.Ee.width = t, this.Ee.height = e, this.Ee.style.width = t + "px", this.Ee.style.height = e + "px", this.Re.imageSmoothingEnabled = !1, this.Ee.style.imageRendering = "pixelated", this.Re.clearRect(0, 0, t, e), this.Re.textBaseline = "top", this.Re.textAlign = "left", this.Re.fillStyle = "white";
  }
  ze(t, e, i, s, r) {
    const h = s / r.head.unitsPerEm;
    for (let o = 0; o < t.length; o++) {
      const c = o % i, l = Math.floor(o / i), u = t[o].glyphData;
      if (!u) continue;
      const f = u.advanceWidth * h, g = c * e.width, A = l * e.height, p = g + 0.5 * e.width, d = A + 0.5 * e.height, v = Math.round(p - 0.5 * e.width), m = Math.round(d - 0.5 * s), y = v + 0.5 * (e.width - f), w = m + r.hhea.ascender * h;
      this.Le(u, y, w, h);
    }
  }
  Le(t, e, i, s) {
    if (!t || !t.xs || t.noc === 0) return;
    let { xs: r, ys: h, endPts: o, flags: c } = t;
    if (!(r && h && o && c)) return;
    this.Re.beginPath();
    let l = 0;
    for (let u = 0; u < o.length; u++) {
      const f = o[u];
      if (!(f < l)) {
        if (f >= l) {
          const g = e + r[l] * s, A = i - h[l] * s;
          this.Re.moveTo(g, A);
          let p = l + 1;
          for (; p <= f; )
            if (1 & c[p]) {
              const d = e + r[p] * s, v = i - h[p] * s;
              this.Re.lineTo(d, v), p++;
            } else {
              const d = e + r[p] * s, v = i - h[p] * s;
              if (p + 1 > f) {
                const y = e + r[l] * s, w = i - h[l] * s;
                if (1 & c[l]) this.Re.quadraticCurveTo(d, v, y, w);
                else {
                  const b = (d + y) / 2, E = (v + w) / 2;
                  this.Re.quadraticCurveTo(d, v, b, E);
                }
                break;
              }
              const m = p + 1;
              if (1 & c[m]) {
                const y = e + r[m] * s, w = i - h[m] * s;
                this.Re.quadraticCurveTo(d, v, y, w), p = m + 1;
              } else {
                const y = (d + (e + r[m] * s)) / 2, w = (v + (i - h[m] * s)) / 2;
                this.Re.quadraticCurveTo(d, v, y, w), p = m;
              }
            }
          this.Re.closePath();
        }
        l = f + 1;
      }
    }
    this.Re.fill();
  }
}
class Ct {
  Oe(t, e) {
    const i = t.cmap;
    if (!i || !i.tables) return 0;
    let s = 0;
    for (const r of i.tables) if (r.format === 4 ? s = this.De(e, r) : r.format === 12 && (s = this.He(e, r)), s > 0) break;
    return s;
  }
  Ie(t, e) {
    const i = e.codePointAt(0);
    return i === void 0 ? 0 : this.Oe(t, i);
  }
  Be(t, e) {
    const i = t.hmtx;
    return i && i.aWidth && i.aWidth.length !== 0 ? e < i.aWidth.length ? i.aWidth[e] : i.aWidth[i.aWidth.length - 1] : 0;
  }
  Ge(t, e) {
    const i = e / t.head.unitsPerEm, s = t.hhea.ascender * i, r = t.hhea.descender * i, h = t.hhea.lineGap * i;
    return { ascender: s, descender: r, lineGap: h, lineHeight: s - r + h, unitsPerEm: t.head.unitsPerEm, scale: i };
  }
  De(t, e) {
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
  He(t, e) {
    const i = e.groups.length / 3;
    for (let s = 0; s < i; s++) {
      const r = e.groups[3 * s], h = e.groups[3 * s + 1], o = e.groups[3 * s + 2];
      if (t >= r && t <= h) return o + (t - r);
    }
    return 0;
  }
}
class ye {
  constructor() {
    a(this, "Ne");
    this.Ne = new Ct();
  }
  Xe(t, e, i) {
    let s = 0;
    const r = this.Ne.Ge(i, e), h = r.lineHeight;
    for (const o of t) {
      const c = this.Ne.Ie(i, o);
      if (c === 0) continue;
      const l = this.Ne.Be(i, c) * r.scale;
      s = Math.max(s, l);
    }
    return { width: Math.ceil(s), height: Math.ceil(h) };
  }
}
class Ee {
  constructor() {
    a(this, "Ye");
    this.Ye = new Ct();
  }
  Ke(t, e) {
    const i = [], s = /* @__PURE__ */ new Map();
    return t.forEach((r, h) => {
      const o = r.codePointAt(0) || 0, c = { character: r, unicode: o, color: this.We(h), glyphData: this.Ze(e, r) };
      i.push(c), s.set(r, c);
    }), { array: i, map: s };
  }
  We(t) {
    return [t % 256 / 255, Math.floor(t / 256) % 256 / 255, 0];
  }
  Ze(t, e) {
    const i = e.codePointAt(0) || 0, s = this.Ye.Oe(t, i);
    if (s === 0) return null;
    let r = 0;
    t.hmtx && t.hmtx.aWidth && s > 0 && t.hmtx.aWidth[s] !== void 0 && (r = t.hmtx.aWidth[s]);
    const h = j.T.glyf.be(t, s);
    return h ? { ...h, advanceWidth: r } : null;
  }
}
class gt {
  constructor(t, e = 16) {
    a(this, "je");
    a(this, "Ve", []);
    a(this, "qe", /* @__PURE__ */ new Map());
    a(this, "Qe");
    a(this, "Je", 16);
    a(this, "tr", 0);
    a(this, "sr", 0);
    a(this, "ir", { width: 0, height: 0 });
    a(this, "er");
    a(this, "rr");
    a(this, "nr");
    a(this, "hr");
    a(this, "ar");
    this.Je = e, this.rr = new ve(), this.nr = new we(t), this.hr = new ye(), this.ar = new Ee();
  }
  async cr(t) {
    let e;
    if (t) {
      const i = await fetch(t);
      if (!i.ok) throw new B(`Failed to load font file: ${i.status} ${i.statusText}`);
      e = await i.arrayBuffer();
    } else
      e = await (await fetch("data:font/woff;base64,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")).arrayBuffer();
    await this.lr(e), this.je = j.parse(e)[0], await this.ur();
  }
  dr(t) {
    if (t === void 0) return this.Je;
    this.Je = t, this.ir = this.hr.Xe(this.Ve.map((i) => i.character), this.Je, this.je);
    const e = this.nr.Se(this.Ve, this.ir, this.Je, this.je);
    this.Qe = e.framebuffer, this.tr = e.columns, this.sr = e.rows;
  }
  async pr(t) {
    try {
      const e = await fetch(t);
      if (!e.ok) throw new B(`Failed to load font file: ${e.status} ${e.statusText}`);
      const i = await e.arrayBuffer();
      await this.lr(i);
      const s = j.parse(i);
      if (!s || s.length === 0) throw Error("Failed to parse font file");
      this.je = s[0], await this.ur();
    } catch (e) {
      throw new B("Failed to load font: " + (e instanceof Error ? e.message : "Unknown error"), e);
    }
  }
  async lr(t) {
    const e = Date.now();
    this.er = new FontFace("CustomFont_" + e, t), await this.er.load(), document.fonts.add(this.er);
  }
  async ur() {
    const t = this.rr.Fe(this.je), { array: e, map: i } = this.ar.Ke(t, this.je);
    this.Ve = e, this.qe = i, this.ir = this.hr.Xe(t, this.Je, this.je);
    const s = this.nr.Se(this.Ve, this.ir, this.Je, this.je);
    this.Qe = s.framebuffer, this.tr = s.columns, this.sr = s.rows;
  }
  gr(t) {
    const e = this.qe.get(t);
    return e ? e.color : [0, 0, 0];
  }
  vr(t) {
    return Array.from(t).map((e) => {
      const i = this.qe.get(e);
      return i ? i.color : [0, 0, 0];
    });
  }
  ft() {
    this.Qe.ft(), document.fonts.delete(this.er);
  }
  get fontFramebuffer() {
    return this.Qe;
  }
  get characterMap() {
    return this.qe;
  }
  get characters() {
    return this.Ve;
  }
  get textureColumns() {
    return this.tr;
  }
  get textureRows() {
    return this.sr;
  }
  get maxGlyphDimensions() {
    return this.ir;
  }
  get fontSize() {
    return this.Je;
  }
  get font() {
    return this.je;
  }
}
class Ut {
  constructor(t, e, i) {
    a(this, "mr");
    a(this, "_r");
    a(this, "H");
    a(this, "I");
    a(this, "Ar");
    a(this, "yr");
    a(this, "wr");
    a(this, "br");
    a(this, "Cr");
    this.wr = t, this.br = e, this.Cr = i, this.js();
  }
  js() {
    this.mr = Math.floor(this.wr.width / this.br), this._r = Math.floor(this.wr.height / this.Cr), this.H = this.mr * this.br, this.I = this._r * this.Cr, this.Ar = Math.floor((this.wr.width - this.H) / 2), this.yr = Math.floor((this.wr.height - this.I) / 2);
  }
  Mr(t, e) {
    this.br = t, this.Cr = e, this.js();
  }
  get cellWidth() {
    return this.br;
  }
  get cellHeight() {
    return this.Cr;
  }
  get cols() {
    return this.mr;
  }
  get rows() {
    return this._r;
  }
  get width() {
    return this.H;
  }
  get height() {
    return this.I;
  }
  get offsetX() {
    return this.Ar;
  }
  get offsetY() {
    return this.yr;
  }
}
const Te = /^rgba?\(([^)]+)\)$/i;
function ot(n) {
  return Number.isNaN(n) ? 0 : Math.max(0, Math.min(255, n));
}
function be(n) {
  if (!n) return null;
  const t = n.trim().toLowerCase();
  if (!t) return null;
  let e = null;
  return t.startsWith("rgb") && (e = function(i) {
    const s = Te.exec(i.trim());
    if (!s) return null;
    const r = s[1].split(",").map((u) => u.trim());
    if (r.length < 3) return null;
    const h = ot(parseFloat(r[0])), o = ot(parseFloat(r[1])), c = ot(parseFloat(r[2])), l = r[3] !== void 0 ? 255 * Math.max(0, Math.min(1, parseFloat(r[3]))) : 255;
    return [h, o, c, Math.round(l)];
  }(t)), e ? e[3] === 0 ? null : e : null;
}
class xe {
  constructor(t = {}) {
    a(this, "wr");
    a(this, "Fr", null);
    a(this, "Tr", !1);
    a(this, "$r");
    this.Tr = t.overlay ?? !1, this.Tr && t.canvas ? (this.Fr = t.canvas, this.wr = this.Pr(), this.$r = !0, this.Er()) : t.canvas ? (this.wr = t.canvas, this.$r = !1) : (this.wr = this.Rr(t.width, t.height), this.$r = !0), this.wr.style.imageRendering = "pixelated";
  }
  Rr(t, e) {
    const i = document.createElement("canvas");
    return i.className = "textmodeCanvas", i.style.imageRendering = "pixelated", i.width = t || 800, i.height = e || 600, document.body.appendChild(i), i;
  }
  Pr() {
    const t = document.createElement("canvas");
    t.className = "textmodeCanvas", t.style.imageRendering = "pixelated";
    const e = this.Fr.getBoundingClientRect();
    let i = Math.round(e.width), s = Math.round(e.height);
    if (this.Fr instanceof HTMLVideoElement) {
      const o = this.Fr;
      (i === 0 || s === 0) && o.videoWidth > 0 && o.videoHeight > 0 && (i = o.videoWidth, s = o.videoHeight);
    }
    t.width = i, t.height = s, t.style.position = "absolute", t.style.pointerEvents = "none";
    const r = window.getComputedStyle(this.Fr);
    let h = parseInt(r.zIndex || "0", 10);
    return isNaN(h) && (h = 0), t.style.zIndex = "" + (h + 1), t;
  }
  Er() {
    var t;
    this.Sr(), (t = this.Fr.parentNode) == null || t.insertBefore(this.wr, this.Fr.nextSibling);
  }
  Ur() {
    const t = [];
    return this.Tr && this.Fr instanceof HTMLElement && (t.push(this.Fr), this.Fr.parentElement && t.push(this.Fr.parentElement)), this.wr.parentElement && t.push(this.wr.parentElement), t.push(this.wr), t.push(document.body), t.push(document.documentElement), t;
  }
  kr() {
    const t = this.Ur();
    for (const e of t) {
      if (!e) continue;
      const i = be(window.getComputedStyle(e).backgroundColor);
      if (i) return i;
    }
    return [255, 255, 255, 255];
  }
  Sr() {
    if (!this.Fr) return;
    const t = this.Fr.getBoundingClientRect();
    let e = this.Fr.offsetParent;
    if (e && e !== document.body) {
      const i = e.getBoundingClientRect();
      this.wr.style.top = t.top - i.top + "px", this.wr.style.left = t.left - i.left + "px";
    } else this.wr.style.top = t.top + window.scrollY + "px", this.wr.style.left = t.left + window.scrollX + "px";
  }
  zr(t, e) {
    if (this.Tr) {
      const i = this.Fr.getBoundingClientRect();
      this.wr.width = Math.round(i.width), this.wr.height = Math.round(i.height), this.Sr();
    } else this.wr.width = t ?? this.wr.width, this.wr.height = e ?? this.wr.height;
  }
  Lr() {
    const t = this.wr.getContext("webgl2", { alpha: !0, premultipliedAlpha: !1, preserveDrawingBuffer: !0, antialias: !1, depth: !0, stencil: !1, powerPreference: "high-performance" });
    if (!t) throw new B("`textmode.js` requires WebGL2 support.");
    return t;
  }
  ft() {
    const t = this.wr.getContext("webgl") || this.wr.getContext("webgl2");
    if (t) {
      const e = t.getExtension("WEBGL_lose_context");
      e == null || e.loseContext();
    }
    this.$r && this.wr.parentNode && this.wr.parentNode.removeChild(this.wr);
  }
  get canvas() {
    return this.wr;
  }
  get targetCanvas() {
    return this.Fr;
  }
  get width() {
    return this.wr.width;
  }
  get height() {
    return this.wr.height;
  }
}
function Q(n) {
  return _(parseInt(n, 16), 0, 255);
}
class I {
  constructor(t, e, i, s) {
    a(this, "Or");
    a(this, "Dr");
    a(this, "r");
    a(this, "g");
    a(this, "b");
    a(this, "a");
    this.r = _(t, 0, 255), this.g = _(e, 0, 255), this.b = _(i, 0, 255), this.a = _(s, 0, 255), this.Or = [this.r, this.g, this.b, this.a], this.Dr = [this.r / 255, this.g / 255, this.b / 255, this.a / 255];
  }
  static Hr(t, e, i, s) {
    if (I.Ir(t)) return t;
    if (Array.isArray(t)) {
      if (t.length < 3) throw Error("Component tuples must include at least RGB values.");
      const [r, h, o] = t, c = t.length === 4 ? t[3] : 255;
      return I.Br(r, h, o, c);
    }
    if (typeof t == "string") {
      const r = t.trim();
      if (r.length === 0) throw Error("Color strings cannot be empty.");
      return I.Gr(r);
    }
    if (typeof t == "number") return typeof e == "number" && typeof i == "number" ? I.Br(t, e, i, s ?? 255) : I.Nr(t);
    throw Error("Unsupported color input passed to TextmodeColor.$from.");
  }
  static Br(t, e, i, s = 255) {
    return new I(t, e, i, s);
  }
  static Nr(t, e = 255) {
    return new I(t, t, t, e);
  }
  static Gr(t) {
    return new I(...function(e) {
      const i = e.replace(/^#|0x/gi, ""), s = (r = i).length === 3 || r.length === 4 ? r.split("").map((h) => h + h).join("") : r;
      var r;
      if (s.length !== 6 && s.length !== 8) throw Error("Invalid hex color: " + e);
      return [Q(s.slice(0, 2)), Q(s.slice(2, 4)), Q(s.slice(4, 6)), s.length === 8 ? Q(s.slice(6, 8)) : 255];
    }(t));
  }
  get rgb() {
    return [this.r, this.g, this.b];
  }
  get rgba() {
    return [...this.Or];
  }
  get normalized() {
    return [...this.Dr];
  }
  withAlpha(t) {
    return new I(this.r, this.g, this.b, t);
  }
  static Ir(t) {
    return t instanceof I;
  }
}
const At = /* @__PURE__ */ new Map();
function Re(n) {
  At.set(n.id, n);
}
function ke(n) {
  At.delete(n);
}
function Fe(n) {
  return At.get(n);
}
class It {
  constructor(t, e, i, s, r, h, o, c) {
    a(this, "A");
    a(this, "K");
    a(this, "Xr");
    a(this, "Yr");
    a(this, "Kr");
    a(this, "H");
    a(this, "I");
    a(this, "W", null);
    a(this, "je");
    a(this, "Wr", "brightness");
    a(this, "Zr", null);
    a(this, "Tt", 0);
    a(this, "Dt", 0);
    a(this, "Ht", 0);
    a(this, "$t", 0);
    a(this, "jr", "sampled");
    a(this, "Vr", "fixed");
    a(this, "Bt", [1, 1, 1, 1]);
    a(this, "Gt", [0, 0, 0, 1]);
    a(this, "qr", [0, 0, 0, 1]);
    a(this, "Qr", [[0.1, 0, 0]]);
    a(this, "Jr", null);
    a(this, "tn", /* @__PURE__ */ new Set());
    a(this, "sn", [[0, 0, 0, 0]]);
    a(this, "en", 0);
    this.A = t, this.K = e, this.Xr = i, this.je = s, this.Yr = r, this.Kr = h, this.H = o, this.I = c;
  }
  conversionMode(t) {
    return this.Wr = t, this.Zr = null, this.W = null, this;
  }
  ft() {
    this.A.deleteTexture(this.Xr);
    for (const t of this.tn) t();
    this.tn.clear();
  }
  rn(t) {
    this.tn.add(t);
  }
  invert(t = !0) {
    return this.Tt = t ? 1 : 0, this.W = null, this;
  }
  flipX(t = !0) {
    return this.Dt = t ? 1 : 0, this.W = null, this;
  }
  flipY(t = !0) {
    return this.Ht = t ? 1 : 0, this.W = null, this;
  }
  charRotation(t) {
    return this.$t = Et(t), this.W = null, this;
  }
  charColorMode(t) {
    return this.jr = t, this.W = null, this;
  }
  cellColorMode(t) {
    return this.Vr = t, this.W = null, this;
  }
  charColor(t, e, i, s) {
    return this.nn(this.Bt, t, e, i, s), this.W = null, this;
  }
  cellColor(t, e, i, s) {
    return this.nn(this.Gt, t, e, i, s), this.W = null, this;
  }
  background(t, e, i, s) {
    return this.nn(this.qr, t, e, i, s), this.W = null, this;
  }
  colorFilter(t) {
    if (!t || t.length === 0) return this.en = 0, this.sn = [[0, 0, 0, 0]], this.W = null, this;
    const e = [];
    for (const i of t) {
      if (e.length >= 64) break;
      let s = I.Hr(i);
      e.push(s.normalized);
    }
    return this.sn = e, this.en = e.length, this.W = null, this;
  }
  characters(t) {
    return this.Jr = t, this.hn(t), this.W = null, this;
  }
  an(t) {
    this.je = t, this.Jr && this.hn(this.Jr), this.W = null;
  }
  get texture() {
    return this.Xr;
  }
  get width() {
    return this.H;
  }
  get height() {
    return this.I;
  }
  get originalWidth() {
    return this.Yr;
  }
  get originalHeight() {
    return this.Kr;
  }
  ht() {
    return this.W || this.ct(), this.W;
  }
  cn() {
  }
  ct() {
    this.cn();
    const t = this.ln(), e = this.un(), i = t.createShader(e), s = t.createUniforms(e);
    this.W = this.K.materialManager.Di(i, s);
  }
  nn(t, e, i, s, r) {
    const h = I.Hr(e, i, s, r);
    J(t, h.r, h.g, h.b, h.a);
  }
  hn(t) {
    const e = this.je.vr(t).filter((i) => Array.isArray(i)).slice(0, 255);
    this.Qr = e.length > 0 ? e : this.Qr;
  }
  createBaseConversionUniforms() {
    const t = this.en > 0;
    return { u_image: this.fn(), u_invert: !!this.Tt, u_flipX: !!this.Dt, u_flipY: !!this.Ht, u_charRotation: this.$t, u_charColorFixed: this.jr === "fixed", u_charColor: this.Bt, u_cellColorFixed: this.Vr === "fixed", u_cellColor: this.Gt, u_backgroundColor: this.qr, u_charCount: this.Qr.length, u_charList: this.Qr, u_colorFilterEnabled: t, u_colorFilterSize: t ? this.en : 0, u_colorFilterPalette: this.sn };
  }
  ln() {
    if (this.Zr && this.Zr.id === this.Wr) return this.Zr;
    const t = Fe(this.Wr);
    if (!t) throw Error(`[textmode.js] Conversion mode "${this.Wr}" is not registered. If this mode is provided by an add-on, make sure its plugin is installed before loading sources.`);
    return this.Zr = t, t;
  }
  un() {
    return { renderer: this.K, gl: this.A, font: this.je, source: this, gridWidth: this.H, gridHeight: this.I };
  }
}
class G extends It {
  constructor(t, e, i, s, r, h, o, c) {
    const l = Math.min(o / r, c / h);
    super(t, e, i, s, r, h, Math.max(1, Math.floor(r * l)), Math.max(1, Math.floor(h * l)));
  }
  static dn(t, e, i, s, r) {
    const h = t.context, o = h.createTexture();
    h.bindTexture(h.TEXTURE_2D, o), h.pixelStorei(h.UNPACK_FLIP_Y_WEBGL, 1), tt(h, h.NEAREST, h.NEAREST, h.CLAMP_TO_EDGE, h.CLAMP_TO_EDGE), h.texImage2D(h.TEXTURE_2D, 0, h.RGBA, h.RGBA, h.UNSIGNED_BYTE, i), h.bindTexture(h.TEXTURE_2D, null);
    const c = i.naturalWidth ?? i.width ?? i.videoWidth ?? 0, l = i.naturalHeight ?? i.height ?? i.videoHeight ?? 0;
    return new G(h, t, o, e, c, l, s, r);
  }
  fn() {
    return this.Xr;
  }
}
class Mt {
  constructor(t = 60) {
    a(this, "pn");
    a(this, "gn", null);
    a(this, "vn", 0);
    a(this, "mn", !0);
    a(this, "_n", 0);
    a(this, "An", 0);
    a(this, "yn", []);
    a(this, "wn", 10);
    a(this, "bn", 0);
    this.pn = 1e3 / t;
  }
  Cn(t) {
    if (!this.mn) return;
    this.vn = performance.now();
    const e = (i) => {
      if (!this.mn) return void (this.gn = null);
      const s = i - this.vn;
      s >= this.pn && (t(), this.vn = i - s % this.pn), this.mn && (this.gn = requestAnimationFrame(e));
    };
    this.gn = requestAnimationFrame(e);
  }
  xn() {
    this.gn && (cancelAnimationFrame(this.gn), this.gn = null);
  }
  Mn() {
    this.mn && (this.mn = !1, this.xn());
  }
  Fn(t) {
    this.mn || (this.mn = !0, this.Cn(t));
  }
  Tn(t, e) {
    if (t === void 0) return this._n;
    this.pn = 1e3 / t, this.mn && e && (this.xn(), this.Cn(e));
  }
  $n() {
    const t = performance.now();
    if (this.An > 0) {
      const e = t - this.An;
      this.yn.push(e), this.yn.length > this.wn && this.yn.shift();
      const i = this.yn.reduce((s, r) => s + r, 0) / this.yn.length;
      this._n = 1e3 / i;
    }
    this.An = t;
  }
  get Pn() {
    return this.mn;
  }
  get En() {
    return this._n;
  }
  get Rn() {
    return this.bn;
  }
  set Rn(t) {
    this.bn = t;
  }
  Sn() {
    this.bn++;
  }
}
class Bt {
  constructor(t) {
    a(this, "wr");
    a(this, "Un");
    a(this, "kn", { x: -1, y: -1 });
    a(this, "zn", { x: -1, y: -1 });
    a(this, "Ln", null);
    a(this, "On", 0);
    a(this, "Dn");
    a(this, "Hn");
    a(this, "In");
    a(this, "Bn");
    a(this, "Gn");
    a(this, "Nn");
    a(this, "Xn", !1);
    a(this, "Yn");
    a(this, "Kn");
    a(this, "Wn");
    a(this, "Zn");
    a(this, "jn");
    this.wr = t;
  }
  Vn(t) {
    const e = performance.now() + Math.max(0, t);
    e > this.On && (this.On = e);
  }
  qn() {
    return performance.now() < this.On;
  }
  Qn(t) {
    const e = this.wr.canvas;
    e.style.cursor = t == null || t === "" ? "" : t;
  }
  cr(t) {
    this.Un = t, this.Jn();
  }
  so() {
    if (this.Xn) return;
    const t = this.wr.canvas;
    this.Dn = (e) => {
      this.io(e), this.eo(e);
    }, this.Hn = () => {
      this.zn = { ...this.kn }, this.kn.x = -1, this.kn.y = -1, this.Ln = null;
    }, this.In = (e) => {
      this.io(e), this.ro(e);
    }, this.Bn = (e) => {
      this.io(e), this.no(e);
    }, this.Gn = (e) => {
      this.io(e), this.oo(e);
    }, this.Nn = (e) => {
      this.io(e), this.ho(e);
    }, t.addEventListener("mousemove", this.Dn, { passive: !0 }), t.addEventListener("mouseleave", this.Hn, { passive: !0 }), t.addEventListener("mousedown", this.In, { passive: !0 }), t.addEventListener("mouseup", this.Bn, { passive: !0 }), t.addEventListener("click", this.Gn, { passive: !0 }), t.addEventListener("wheel", this.Nn, { passive: !1 }), this.Xn = !0;
  }
  ao() {
    if (!this.Xn) return;
    const t = this.wr.canvas;
    t.removeEventListener("mousemove", this.Dn), t.removeEventListener("mouseleave", this.Hn), t.removeEventListener("mousedown", this.In), t.removeEventListener("mouseup", this.Bn), t.removeEventListener("click", this.Gn), t.removeEventListener("wheel", this.Nn), this.Xn = !1;
  }
  Jn() {
    if (this.Xn) try {
      if (this.Ln) {
        const t = new MouseEvent("mousemove", { clientX: this.Ln.x, clientY: this.Ln.y, bubbles: !1, cancelable: !1 });
        this.io(t);
      } else this.kn.x !== -1 && this.kn.y !== -1 && (this.kn.x >= this.Un.cols || this.kn.y >= this.Un.rows) && (this.kn.x = -1, this.kn.y = -1);
    } catch {
      this.kn.x = -1, this.kn.y = -1;
    }
  }
  co(t) {
    this.Yn = t;
  }
  lo(t) {
    this.Kn = t;
  }
  uo(t) {
    this.Wn = t;
  }
  fo(t) {
    this.Zn = t;
  }
  do(t) {
    this.jn = t;
  }
  po() {
    return { x: this.kn.x, y: this.kn.y };
  }
  eo(t) {
    if (this.Zn && !this.qn()) {
      const e = { position: { ...this.kn }, previousPosition: { ...this.zn }, originalEvent: t };
      this.Zn(e);
    }
  }
  ro(t) {
    if (this.Kn && !this.qn()) {
      const e = { position: { ...this.kn }, previousPosition: { ...this.zn }, button: t.button, originalEvent: t };
      this.Kn(e);
    }
  }
  no(t) {
    if (this.Wn && !this.qn()) {
      const e = { position: { ...this.kn }, previousPosition: { ...this.zn }, button: t.button, originalEvent: t };
      this.Wn(e);
    }
  }
  oo(t) {
    if (this.Yn && !this.qn()) {
      const e = { position: { ...this.kn }, previousPosition: { ...this.zn }, button: t.button, originalEvent: t };
      this.Yn(e);
    }
  }
  ho(t) {
    if (this.jn && !this.qn()) {
      const e = { position: { ...this.kn }, previousPosition: { ...this.zn }, delta: { x: t.deltaX, y: t.deltaY }, originalEvent: t };
      this.jn(e);
    }
  }
  io(t) {
    const e = this.wr.canvas;
    this.zn = { ...this.kn }, this.Ln = { x: t.clientX, y: t.clientY };
    const i = e.getBoundingClientRect(), s = t.clientX - i.left, r = t.clientY - i.top, h = e.width / i.width, o = r * (e.height / i.height), c = s * h - this.Un.offsetX, l = o - this.Un.offsetY, u = Math.floor(c / this.Un.cellWidth), f = Math.floor(l / this.Un.cellHeight);
    u >= 0 && u < this.Un.cols && f >= 0 && f < this.Un.rows ? (this.kn.x = u, this.kn.y = f) : (this.kn.x = -1, this.kn.y = -1);
  }
}
const Ce = Object.freeze(Object.defineProperty({ __proto__: null, MouseManager: Bt }, Symbol.toStringTag, { value: "Module" }));
class Pt {
  constructor() {
    a(this, "vo", /* @__PURE__ */ new Map());
    a(this, "mo", null);
    a(this, "_o", null);
    a(this, "Ao");
    a(this, "yo");
    a(this, "Xn", !1);
    a(this, "wo");
    a(this, "bo");
    a(this, "Co", { ArrowUp: "UP_ARROW", ArrowDown: "DOWN_ARROW", ArrowLeft: "LEFT_ARROW", ArrowRight: "RIGHT_ARROW", F1: "F1", F2: "F2", F3: "F3", F4: "F4", F5: "F5", F6: "F6", F7: "F7", F8: "F8", F9: "F9", F10: "F10", F11: "F11", F12: "F12", Enter: "ENTER", Return: "RETURN", Tab: "TAB", Escape: "ESCAPE", Backspace: "BACKSPACE", Delete: "DELETE", Insert: "INSERT", Home: "HOME", End: "END", PageUp: "PAGE_UP", PageDown: "PAGE_DOWN", Shift: "SHIFT", Control: "CONTROL", Alt: "ALT", Meta: "META", " ": "SPACE" });
  }
  so() {
    this.Xn || (this.Ao = (t) => {
      this.xo(t);
    }, this.yo = (t) => {
      this.Mo(t);
    }, window.addEventListener("keydown", this.Ao, { passive: !1 }), window.addEventListener("keyup", this.yo, { passive: !1 }), this.Xn = !0);
  }
  ao() {
    this.Xn && (window.removeEventListener("keydown", this.Ao), window.removeEventListener("keyup", this.yo), this.Xn = !1, this.vo.clear(), this.mo = null, this._o = null);
  }
  lo(t) {
    this.wo = t;
  }
  uo(t) {
    this.bo = t;
  }
  Fo(t) {
    const e = this.To(t), i = this.vo.get(t) || this.vo.get(e);
    return (i == null ? void 0 : i.isPressed) || !1;
  }
  $o() {
    return this.mo;
  }
  Po() {
    return this._o;
  }
  Eo() {
    const t = [];
    for (const [e, i] of this.vo) i.isPressed && t.push(e);
    return t;
  }
  Ro() {
    return { ctrl: this.Fo("Control"), shift: this.Fo("Shift"), alt: this.Fo("Alt"), meta: this.Fo("Meta") };
  }
  So() {
    this.vo.clear(), this.mo = null, this._o = null;
  }
  xo(t) {
    const e = t.key, i = Date.now();
    this.vo.has(e) || this.vo.set(e, { isPressed: !1, lastPressTime: 0, lastReleaseTime: 0 });
    const s = this.vo.get(e);
    if (!s.isPressed && (s.isPressed = !0, s.lastPressTime = i, this.mo = e, this.wo)) {
      const r = { key: e, keyCode: t.keyCode, ctrlKey: t.ctrlKey, shiftKey: t.shiftKey, altKey: t.altKey, metaKey: t.metaKey, isPressed: !0, originalEvent: t };
      this.wo(r);
    }
  }
  Mo(t) {
    const e = t.key, i = Date.now();
    this.vo.has(e) || this.vo.set(e, { isPressed: !1, lastPressTime: 0, lastReleaseTime: 0 });
    const s = this.vo.get(e);
    if (s.isPressed = !1, s.lastReleaseTime = i, this._o = e, this.bo) {
      const r = { key: e, keyCode: t.keyCode, ctrlKey: t.ctrlKey, shiftKey: t.shiftKey, altKey: t.altKey, metaKey: t.metaKey, isPressed: !1, originalEvent: t };
      this.bo(r);
    }
  }
  To(t) {
    return this.Co[t] || t.toLowerCase();
  }
}
const Ue = Object.freeze(Object.defineProperty({ __proto__: null, KeyboardManager: Pt }, Symbol.toStringTag, { value: "Module" }));
class Lt {
  constructor(t, e) {
    a(this, "wr");
    a(this, "Uo");
    a(this, "Un");
    a(this, "ko", /* @__PURE__ */ new Map());
    a(this, "zo", /* @__PURE__ */ new Map());
    a(this, "Lo", /* @__PURE__ */ new Map());
    a(this, "Oo", null);
    a(this, "Do");
    a(this, "Ho");
    a(this, "Io");
    a(this, "Bo");
    a(this, "Go");
    a(this, "No");
    a(this, "Xn", !1);
    a(this, "Xo");
    a(this, "Yo");
    a(this, "Ko");
    a(this, "Wo");
    a(this, "Zo");
    a(this, "jo");
    a(this, "Vo");
    a(this, "qo");
    a(this, "Qo");
    a(this, "Jo");
    a(this, "th", 320);
    a(this, "sh", 350);
    a(this, "ih", 10);
    a(this, "eh", 550);
    a(this, "rh", 14);
    a(this, "nh", 48);
    a(this, "oh", 650);
    a(this, "hh", 0.02);
    a(this, "ah", 2);
    a(this, "uh", 600);
    a(this, "fh", 0);
    a(this, "dh", null);
    this.wr = t, this.Uo = e;
    const i = this.wr.canvas;
    this.Do = i.style.touchAction, this.Ho = i.style.userSelect, i.style.touchAction || (i.style.touchAction = "none"), i.style.userSelect || (i.style.userSelect = "none");
  }
  cr(t) {
    this.Un = t, this.Jn();
  }
  so() {
    if (this.Xn) return;
    const t = this.wr.canvas;
    this.Io = (e) => {
      this.ph(e);
    }, this.Bo = (e) => {
      this.gh(e);
    }, this.Go = (e) => {
      this.mh(e);
    }, this.No = (e) => {
      this._h(e);
    }, t.addEventListener("touchstart", this.Io, { passive: !1 }), t.addEventListener("touchmove", this.Bo, { passive: !1 }), t.addEventListener("touchend", this.Go, { passive: !1 }), t.addEventListener("touchcancel", this.No, { passive: !1 }), this.Xn = !0;
  }
  ao() {
    if (!this.Xn) return;
    const t = this.wr.canvas;
    t.removeEventListener("touchstart", this.Io), t.removeEventListener("touchmove", this.Bo), t.removeEventListener("touchend", this.Go), t.removeEventListener("touchcancel", this.No), this.Xn = !1, this.Oo = null, this.ko.clear(), this.zo.clear(), this.Lo.forEach((e) => {
      e.longPressTimer !== null && window.clearTimeout(e.longPressTimer);
    }), this.Lo.clear(), this.dh = null, this.fh = 0, t.style.touchAction = this.Do, t.style.userSelect = this.Ho;
  }
  Jn() {
    if (!this.Un || this.ko.size === 0) return;
    const t = /* @__PURE__ */ new Map();
    for (const e of this.ko.values()) {
      const i = this.Ah(e.clientX, e.clientY, e.id, e);
      t.set(e.id, i);
    }
    this.ko = t;
  }
  yh() {
    return Array.from(this.ko.values()).map((t) => ({ ...t }));
  }
  wh(t) {
    this.Xo = t;
  }
  fo(t) {
    this.Yo = t;
  }
  bh(t) {
    this.Ko = t;
  }
  Ch(t) {
    this.Wo = t;
  }
  xh(t) {
    this.Zo = t;
  }
  Mh(t) {
    this.jo = t;
  }
  Fh(t) {
    this.Vo = t;
  }
  Th(t) {
    this.qo = t;
  }
  $h(t) {
    this.Qo = t;
  }
  Ph(t) {
    this.Jo = t;
  }
  ph(t) {
    var s;
    if (!this.Un) return;
    t.preventDefault(), (s = this.Uo) == null || s.Vn(this.uh);
    const e = performance.now(), i = this.Eh(t.changedTouches);
    for (const r of i) {
      const h = this.ko.get(r.id);
      h && this.zo.set(r.id, this.Rh(h)), this.ko.set(r.id, r);
      const o = { id: r.id, startPosition: r, lastPosition: r, startTime: e, lastTime: e, longPressTimer: null, longPressFired: !1 };
      this.Vo && (o.longPressTimer = window.setTimeout(() => {
        const c = this.ko.get(r.id);
        c && (o.longPressFired = !0, this.Vo({ touch: this.Rh(c), duration: performance.now() - o.startTime, originalEvent: t }));
      }, this.eh)), this.Lo.set(r.id, o), this.Xo && this.Xo(this.Sh(r, t, void 0, e));
    }
    this.ko.size === 2 && this.kh();
  }
  gh(t) {
    var s;
    if (!this.Un) return;
    t.preventDefault(), (s = this.Uo) == null || s.Vn(this.uh);
    const e = performance.now(), i = this.Eh(t.changedTouches);
    for (const r of i) {
      const h = this.ko.get(r.id), o = h ? this.Rh(h) : void 0;
      o && this.zo.set(r.id, o), this.ko.set(r.id, r);
      const c = this.Lo.get(r.id);
      c && (c.lastPosition = r, c.lastTime = e, o) && K(o.clientX, o.clientY, r.clientX, r.clientY) > this.rh && c.longPressTimer !== null && (window.clearTimeout(c.longPressTimer), c.longPressTimer = null), this.Yo && this.Yo(this.Sh(r, t, o, e));
    }
    this.ko.size === 2 ? this.zh(t) : this.Oo = null;
  }
  mh(t) {
    if (!this.Un) return;
    t.preventDefault();
    const e = performance.now(), i = this.Eh(t.changedTouches);
    for (const s of i) {
      const r = this.ko.get(s.id), h = r ? this.Rh(r) : void 0, o = this.Lo.get(s.id);
      o && o.longPressTimer !== null && (window.clearTimeout(o.longPressTimer), o.longPressTimer = null), this.Ko && this.Ko(this.Sh(s, t, h, e)), o && this.Lh(o, t), this.Lo.delete(s.id), this.zo.delete(s.id), this.ko.delete(s.id);
    }
    this.ko.size < 2 && (this.Oo = null);
  }
  _h(t) {
    if (!this.Un) return;
    t.preventDefault();
    const e = performance.now(), i = this.Eh(t.changedTouches);
    for (const s of i) {
      const r = this.ko.get(s.id), h = r ? this.Rh(r) : void 0, o = this.Lo.get(s.id);
      o && o.longPressTimer !== null && (window.clearTimeout(o.longPressTimer), o.longPressTimer = null), this.Wo && this.Wo(this.Sh(s, t, h, e)), this.Lo.delete(s.id), this.zo.delete(s.id), this.ko.delete(s.id);
    }
    this.ko.size < 2 && (this.Oo = null);
  }
  Eh(t) {
    const e = [];
    for (let i = 0; i < t.length; i += 1) {
      const s = t.item(i);
      s && e.push(this.Oh(s));
    }
    return e;
  }
  Oh(t) {
    return this.Ah(t.clientX, t.clientY, t.identifier, { id: t.identifier, x: -1, y: -1, clientX: t.clientX, clientY: t.clientY, pressure: t.force, radiusX: t.radiusX, radiusY: t.radiusY, rotationAngle: t.rotationAngle });
  }
  Ah(t, e, i, s) {
    const r = this.wr.canvas, h = r.getBoundingClientRect(), o = t - h.left, c = e - h.top, l = r.width / h.width, u = c * (r.height / h.height), f = o * l - this.Un.offsetX, g = u - this.Un.offsetY, A = Math.floor(f / this.Un.cellWidth), p = Math.floor(g / this.Un.cellHeight), d = A >= 0 && A < this.Un.cols && p >= 0 && p < this.Un.rows;
    return { id: i, x: d ? A : -1, y: d ? p : -1, clientX: t, clientY: e, pressure: s.pressure, radiusX: s.radiusX, radiusY: s.radiusY, rotationAngle: s.rotationAngle };
  }
  Sh(t, e, i, s) {
    const r = this.Lo.get(t.id), h = Array.from(this.zo.values()).map((l) => this.Rh(l)), o = Array.from(this.ko.values()).map((l) => this.Rh(l)), c = this.Eh(e.changedTouches);
    return { touch: this.Rh(t), previousTouch: i ? this.Rh(i) : void 0, touches: o, previousTouches: h, changedTouches: c, deltaTime: r ? s - r.lastTime : 0, originalEvent: e };
  }
  kh() {
    if (this.ko.size !== 2) return void (this.Oo = null);
    const t = Array.from(this.ko.values()), [e, i] = t, s = K(e.x, e.y, i.x, i.y), r = mt(e.clientX, e.clientY, i.clientX, i.clientY);
    this.Oo = { ids: [e.id, i.id], initialDistance: Math.max(s, 1e-4), initialAngle: r, lastScale: 1, lastRotation: 0 };
  }
  zh(t) {
    if (this.Oo || this.kh(), !this.Oo) return;
    const [e, i] = this.Oo.ids, s = this.ko.get(e), r = this.ko.get(i);
    if (!s || !r) return;
    const h = K(s.x, s.y, r.x, r.y) / this.Oo.initialDistance, o = h - this.Oo.lastScale;
    this.Qo && Math.abs(o) > this.hh && (this.Qo({ touches: [this.Rh(s), this.Rh(r)], scale: h, deltaScale: o, center: this.Dh(s, r), originalEvent: t }), this.Oo.lastScale = h);
    let c = mt(s.clientX, s.clientY, r.clientX, r.clientY) - this.Oo.initialAngle;
    c = (c + 180) % 360 - 180;
    const l = c - this.Oo.lastRotation;
    this.Jo && Math.abs(l) > this.ah && (this.Jo({ touches: [this.Rh(s), this.Rh(r)], rotation: c, deltaRotation: l, center: this.Dh(s, r), originalEvent: t }), this.Oo.lastRotation = c);
  }
  Dh(t, e) {
    const i = (t.clientX + e.clientX) / 2, s = (t.clientY + e.clientY) / 2, r = this.Ah(i, s, -1, { id: -1, x: -1, y: -1, clientX: i, clientY: s });
    return { x: r.x, y: r.y };
  }
  Lh(t, e) {
    const i = performance.now(), s = i - t.startTime, r = K(t.startPosition.clientX, t.startPosition.clientY, t.lastPosition.clientX, t.lastPosition.clientY);
    if (!t.longPressFired && s <= this.th && r <= this.ih)
      this.Hh(t.lastPosition, i) && this.jo ? this.jo({ touch: this.Rh(t.lastPosition), taps: 2, originalEvent: e }) : this.Zo && this.Zo({ touch: this.Rh(t.lastPosition), taps: 1, originalEvent: e });
    else if (!t.longPressFired && s <= this.oh && r >= this.nh) {
      const h = { x: t.lastPosition.clientX - t.startPosition.clientX, y: t.lastPosition.clientY - t.startPosition.clientY }, o = Math.max(Math.hypot(h.x, h.y), 1e-4), c = { x: h.x / o, y: h.y / o }, l = { x: h.x / s, y: h.y / s };
      this.qo && this.qo({ touch: this.Rh(t.lastPosition), direction: c, distance: o, velocity: l, originalEvent: e });
    }
    this.fh = i, this.dh = this.Rh(t.lastPosition);
  }
  Hh(t, e) {
    return !this.dh || e - this.fh > this.sh ? !1 : K(t.clientX, t.clientY, this.dh.clientX, this.dh.clientY) <= this.ih;
  }
  Rh(t) {
    return { ...t };
  }
}
const Ie = Object.freeze(Object.defineProperty({ __proto__: null, TouchManager: Lt }, Symbol.toStringTag, { value: "Module" }));
class Me {
  constructor(t, e) {
    a(this, "A");
    a(this, "Ih");
    a(this, "_n", null);
    a(this, "Bh", 0);
    a(this, "Gh", !1);
    a(this, "Nh", []);
    a(this, "Xh", -1);
    this.A = t, this.Ih = e;
  }
  get isPreloaded() {
    return this.Gh;
  }
  get totalFrames() {
    return this.Bh;
  }
  get frameRate() {
    return this._n;
  }
  get textures() {
    return this.Nh;
  }
  dispose() {
    this.Yh(), this.Nh = [], this._n = null, this.Bh = 0, this.Gh = !1, this.Xh = -1;
  }
  async preload(t, e) {
    var i;
    try {
      if (t <= 0) throw Error("Video preload requires a frameRate greater than 0.");
      const s = this.Ih.duration;
      if (!isFinite(s) || s <= 0) throw Error("Video duration is invalid, cannot preload frames.");
      const r = Math.max(1, Math.ceil(s * t));
      return this.Kh(t, r), await this.Wh(t, e) ? (this.Zh("captureStream", e), "captureStream") : (await this.jh(t, e), this.Zh("seeking", e), "seeking");
    } catch (s) {
      const r = s instanceof Error ? s : Error(s + "");
      throw (i = e == null ? void 0 : e.onError) == null || i.call(e, r), this.dispose(), r;
    }
  }
  Kh(t, e) {
    this.Yh(), this._n = t, this.Bh = e, this.Nh = [], this.Gh = !1, this.Xh = -1;
  }
  Zh(t, e) {
    var i;
    if (this.Nh.length === 0) throw Error(`Video preload via ${t} completed but produced 0 frames.`);
    this.Bh = this.Nh.length, this.Gh = !0, this.Xh = -1, this.Ih.pause(), this.Ih.currentTime = 0, e != null && e.onProgress && e.onProgress({ percent: 100, loadedFrames: this.Bh, totalFrames: this.Bh, strategy: t }), (i = e == null ? void 0 : e.onComplete) == null || i.call(e, { totalFrames: this.Bh, strategy: t });
  }
  Vh(t) {
    const e = this.A, i = e.createTexture();
    return e.bindTexture(e.TEXTURE_2D, i), e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL, 1), tt(e, e.LINEAR, e.LINEAR, e.CLAMP_TO_EDGE, e.CLAMP_TO_EDGE), e.texImage2D(e.TEXTURE_2D, 0, e.RGBA, e.RGBA, e.UNSIGNED_BYTE, t), e.bindTexture(e.TEXTURE_2D, null), i;
  }
  qh(t, e) {
    if (!(e != null && e.onProgress) || this.Bh === 0) return;
    const i = Math.min(99, Math.floor(this.Nh.length / this.Bh * 100)), s = 10 * Math.floor(i / 10);
    s > this.Xh && (this.Xh = s, e.onProgress({ percent: i, loadedFrames: this.Nh.length, totalFrames: this.Bh, strategy: t }));
  }
  async Wh(t, e) {
    const i = globalThis, s = i == null ? void 0 : i.MediaStreamTrackProcessor, r = this.Ih.captureStream;
    if (typeof s != "function" || typeof r != "function") return !1;
    let h, o = null;
    try {
      const c = r.call(this.Ih);
      if (h = c.getVideoTracks()[0], !h) return c.getTracks().forEach((f) => f.stop()), !1;
      if (o = new s({ track: h }).readable.getReader(), this.Ih.currentTime = 0, this.Ih.muted = !0, await this.Ih.play().catch(() => {
      }), this.Ih.paused) return !1;
      const l = 1e6 / t;
      let u = 0;
      for (; this.Nh.length < this.Bh; ) {
        const f = await o.read();
        if (f.done) break;
        const g = f.value;
        if (g) try {
          const A = typeof g.timestamp == "number" ? g.timestamp : u;
          (this.Nh.length === 0 || A >= u) && (this.Nh.push(this.Vh(g)), u = A + l, this.qh("captureStream", e));
        } finally {
          g.close();
        }
      }
      return o.releaseLock(), h.stop(), o = null, h = void 0, this.Ih.pause(), this.Ih.currentTime = 0, this.Nh.length !== 0;
    } catch {
      return this.Yh(), this.Nh = [], this.Xh = -1, !1;
    } finally {
      if (o) try {
        await o.cancel();
      } catch {
      }
      h && h.stop(), this.Ih.pause(), this.Ih.currentTime = 0;
    }
  }
  async jh(t, e) {
    const i = 1 / t, s = this.Bh, r = this.Ih;
    r.pause();
    for (let h = 0; h < s; h++) {
      const o = Math.min(r.duration, h * i);
      await this.Qh(o), this.Nh.push(this.Vh(r)), this.qh("seeking", e);
    }
    r.currentTime = 0;
  }
  Qh(t) {
    return new Promise((e, i) => {
      const s = this.Ih, r = () => {
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
  Yh() {
    for (const t of this.Nh) this.A.deleteTexture(t);
  }
}
class st extends It {
  constructor(e, i, s, r, h, o, c, l, u) {
    const f = o / c;
    let g, A;
    f > 1 ? (g = l, A = Math.round(l / f)) : (A = u, g = Math.round(u * f));
    super(e, i, s, r, o, c, g, A);
    a(this, "Ih");
    a(this, "Jh", 0);
    a(this, "ta", null);
    this.Ih = h;
  }
  ft() {
    var e;
    super.ft(), (e = this.ta) == null || e.dispose(), this.ta = null, this.Ih.pause(), this.Ih.src = "", this.Ih.load();
  }
  sa() {
    var e;
    if (!((e = this.ta) != null && e.isPreloaded) && this.Ih.readyState >= this.Ih.HAVE_CURRENT_DATA) {
      const i = this.A;
      i.bindTexture(i.TEXTURE_2D, this.Xr), i.texImage2D(i.TEXTURE_2D, 0, i.RGBA, i.RGBA, i.UNSIGNED_BYTE, this.Ih), i.bindTexture(i.TEXTURE_2D, null);
    }
  }
  fn() {
    var i, s;
    const e = (i = this.ta) == null ? void 0 : i.textures;
    return e && e.length > 0 && ((s = this.ta) != null && s.isPreloaded) ? e[this.Jh % e.length] : this.Xr;
  }
  ht() {
    return this.W = null, super.ht();
  }
  cn() {
    this.sa();
  }
  frame(e) {
    var s, r;
    const i = ((s = this.ta) == null ? void 0 : s.totalFrames) ?? 0;
    return (r = this.ta) != null && r.isPreloaded && e !== void 0 && i > 0 && (this.Jh = (e % i + i) % i, this.W = null), this;
  }
  static async dn(e, i, s, r, h, o) {
    const c = e.context, l = o == null ? void 0 : o.frameRate;
    let u;
    u = document.createElement("video"), u.crossOrigin = "anonymous", u.loop = !0, u.muted = !0, u.playsInline = !0, await new Promise((d, v) => {
      u.addEventListener("loadedmetadata", () => d(), { once: !0 }), u.addEventListener("error", (m) => {
        var w;
        const y = m.target;
        v(Error("Failed to load video: " + (((w = y.error) == null ? void 0 : w.message) || "Unknown error")));
      }, { once: !0 }), u.src = s;
    });
    const f = c.createTexture();
    c.bindTexture(c.TEXTURE_2D, f), c.pixelStorei(c.UNPACK_FLIP_Y_WEBGL, 1), tt(c, c.LINEAR, c.LINEAR, c.CLAMP_TO_EDGE, c.CLAMP_TO_EDGE), c.texImage2D(c.TEXTURE_2D, 0, c.RGBA, c.RGBA, c.UNSIGNED_BYTE, u), c.bindTexture(c.TEXTURE_2D, null);
    const g = u.videoWidth, A = u.videoHeight, p = new st(c, e, f, i, u, g, A, r, h);
    return l && l > 0 && (p.ta = new Me(c, u), await p.ta.preload(l, o), p.Jh = 0), p;
  }
  async play() {
    await this.Ih.play();
  }
  pause() {
    this.Ih.pause();
  }
  stop() {
    this.Ih.pause(), this.Ih.currentTime = 0;
  }
  speed(e) {
    return this.Ih.playbackRate = e, this;
  }
  loop(e = !0) {
    return this.Ih.loop = e, this;
  }
  time(e) {
    return this.Ih.currentTime = e, this;
  }
  volume(e) {
    return this.Ih.volume = Math.max(0, Math.min(1, e)), this;
  }
  get texture() {
    return this.Xr;
  }
  get width() {
    return this.H;
  }
  get height() {
    return this.I;
  }
  get originalWidth() {
    return this.Yr;
  }
  get originalHeight() {
    return this.Kr;
  }
  get videoElement() {
    return this.Ih;
  }
  get currentTime() {
    return this.Ih.currentTime;
  }
  get duration() {
    return this.Ih.duration;
  }
  get isPlaying() {
    return !this.Ih.paused && !this.Ih.ended;
  }
  get totalFrames() {
    var e;
    return ((e = this.ta) == null ? void 0 : e.totalFrames) ?? 0;
  }
}
const Be = (n) => class extends n {
  ia(t, e, i, s) {
    if (I.Ir(t)) return t;
    if (typeof t == "number" || typeof t == "string") return this.color(t, e, i, s);
    throw Error("Unsupported color input passed to color-capable method.");
  }
  rotate(t = 0, e = 0, i = 0) {
    this.K.state.Zt(t), this.K.state.jt(e), this.K.state.Vt(i);
  }
  rotateX(t) {
    this.K.state.Zt(t);
  }
  rotateY(t) {
    this.K.state.jt(t);
  }
  rotateZ(t) {
    this.K.state.Vt(t);
  }
  translate(t = 0, e = 0, i = 0) {
    this.K.state.qt(t, e, i);
  }
  translateX(t) {
    this.K.state.qt(t, 0, 0);
  }
  translateY(t) {
    this.K.state.qt(0, t, 0);
  }
  translateZ(t) {
    this.K.state.qt(0, 0, t);
  }
  push() {
    this.K.state.et();
  }
  pop() {
    this.K.state.rt();
  }
  color(t, e, i, s) {
    return I.Hr(t, e, i, s);
  }
  rect(t = 1, e = 1) {
    this.K.de(t, e);
  }
  point() {
    this.K.de(1, 1);
  }
  line(t, e, i, s) {
    this.K.pe(t, e, i, s);
  }
  lineWeight(t) {
    this.K.state.Kt(t);
  }
  background(t, e, i, s = 255) {
    const r = this.ia(t, e, i, s);
    this.K.ye(r.r, r.g, r.b, r.a);
  }
  char(t) {
    const e = Array.from(t);
    if (e.length === 0) throw Error("char() requires at least one character.");
    this.K.state.ss(this.je.gr(e[0]));
  }
  charColor(t, e, i, s) {
    const r = this.ia(t, e, i, s);
    this.K.state.es(r.r, r.g, r.b, r.a);
  }
  cellColor(t, e, i, s) {
    const r = this.ia(t, e, i, s);
    this.K.state.rs(r.r, r.g, r.b, r.a);
  }
  flipX(t) {
    this.K.state.ns(t);
  }
  flipY(t) {
    this.K.state.hs(t);
  }
  charRotation(t) {
    this.K.state.ls(t);
  }
  invert(t) {
    this.K.state.cs(t);
  }
  clear() {
    this.K.ye(0, 0, 0, 0);
  }
  ellipse(t, e) {
    this.K.ge(t / 2, e / 2);
  }
  triangle(t, e, i, s, r, h) {
    this.K.ve(t, e, i, s, r, h);
  }
  bezierCurve(t, e, i, s, r, h, o, c) {
    this.K.me(t, e, i, s, r, h, o, c);
  }
  arc(t, e, i, s) {
    this.K._e(t / 2, e / 2, i, s);
  }
  shader(t) {
    this.K.ae(t);
  }
  setUniform(t, e) {
    this.K.O(t, e);
  }
  setUniforms(t) {
    this.K.ce(t);
  }
  async createFilterShader(t) {
    if (typeof t == "string" && (t.startsWith("./") || t.startsWith("../") || t.endsWith(".frag") || t.endsWith(".glsl"))) {
      const e = await fetch(t);
      if (!e.ok) throw Error(`Failed to load shader from ${t}: ${e.statusText}`);
      const i = await e.text();
      return this.K.le(i);
    }
    return this.K.le(t);
  }
  createFramebuffer(t) {
    return this.K.Ae(t.width ?? this.grid.cols, t.height ?? this.grid.rows, 3);
  }
  image(t, e, i) {
    this.K.ue(t, e, i);
  }
  ortho() {
    this.K.state.fs(!0);
  }
  async loadImage(t) {
    if (typeof t != "string") {
      const r = G.dn(this.K, this.je, t, this.Un.cols, this.Un.rows);
      return this.ea(r), r;
    }
    const e = t, i = await new Promise((r, h) => {
      const o = new Image();
      o.crossOrigin = "anonymous", o.onload = () => r(o), o.onerror = (c) => h(c), o.src = e;
    }), s = G.dn(this.K, this.je, i, this.Un.cols, this.Un.rows);
    return this.ea(s), s;
  }
  async loadVideo(t, e) {
    const i = await st.dn(this.K, this.je, t, this.Un.cols, this.Un.rows, e);
    return this.ea(i), i;
  }
}, Pe = (n) => class extends n {
  async loadFont(t) {
    return this.je.pr(t).then(() => {
      const e = this.je.maxGlyphDimensions;
      this.Un.Mr(e.width, e.height), this.ra.resize(this.Un.cols, this.Un.rows), this.K.we(), this.Uo.Jn(), this.na.Jn();
      for (const i of this.oa) i.an(this.je);
    });
  }
  fontSize(t) {
    if (!dt.m(typeof t == "number" && t > 0, "Font size must be a positive number greater than 0.", { method: "fontSize", providedValue: t }) || this.je.fontSize === t) return;
    this.je.dr(t);
    const e = this.je.maxGlyphDimensions;
    this.Un.Mr(e.width, e.height), this.ra.resize(this.Un.cols, this.Un.rows), this.K.we(), this.Uo.Jn(), this.na.Jn();
  }
}, Le = (n) => class extends n {
  get frameCount() {
    return this.ha.Rn;
  }
  set frameCount(t) {
    this.ha.Rn = t;
  }
  frameRate(t) {
    return t === void 0 ? this.ha.En : this.ha.Tn(t, () => this.aa());
  }
  noLoop() {
    this.ha.Mn();
  }
  loop() {
    this.ha.Fn(() => this.aa());
  }
  redraw(t = 1) {
    if (dt.m(typeof t == "number" && t > 0 && Number.isInteger(t), "Redraw count must be a positive integer.", { method: "redraw", providedValue: t })) for (let e = 0; e < t; e++) this.aa();
  }
  isLooping() {
    return this.ha.Pn;
  }
}, Se = (n) => class extends n {
  constructor(...t) {
    super(...t);
  }
  mouseClicked(t) {
    this.Uo.co(t);
  }
  mousePressed(t) {
    this.Uo.lo(t);
  }
  mouseReleased(t) {
    this.Uo.uo(t);
  }
  mouseMoved(t) {
    this.Uo.fo(t);
  }
  mouseScrolled(t) {
    this.Uo.do(t);
  }
  get mouse() {
    return this.Uo.po();
  }
  cursor(t) {
    this.Uo.Qn(t);
  }
}, Ne = (n) => class extends n {
  constructor(...t) {
    super(...t);
  }
  touchStarted(t) {
    this.na.wh(t);
  }
  touchMoved(t) {
    this.na.fo(t);
  }
  touchEnded(t) {
    this.na.bh(t);
  }
  touchCancelled(t) {
    this.na.Ch(t);
  }
  tap(t) {
    this.na.xh(t);
  }
  doubleTap(t) {
    this.na.Mh(t);
  }
  longPress(t) {
    this.na.Fh(t);
  }
  swipe(t) {
    this.na.Th(t);
  }
  pinch(t) {
    this.na.$h(t);
  }
  rotateGesture(t) {
    this.na.Ph(t);
  }
  get touches() {
    return this.na.yh();
  }
}, De = (n) => class extends n {
  constructor(...t) {
    super(...t);
  }
  keyPressed(t) {
    this.ca.lo(t);
  }
  keyReleased(t) {
    this.ca.uo(t);
  }
  isKeyPressed(t) {
    return this.ca.Fo(t);
  }
  get lastKeyPressed() {
    return this.ca.$o();
  }
  get lastKeyReleased() {
    return this.ca.Po();
  }
  get pressedKeys() {
    return this.ca.Eo();
  }
  get modifierState() {
    return this.ca.Ro();
  }
};
class Oe {
  constructor(t) {
    a(this, "la");
    a(this, "ua", /* @__PURE__ */ new Map());
    a(this, "fa", []);
    a(this, "da", /* @__PURE__ */ new Map());
    a(this, "pa", /* @__PURE__ */ new Map());
    this.la = t;
  }
  async ga(t) {
    for (const e of t) {
      if (this.ua.has(e.name)) return void console.warn(`[textmode.js] Plugin "${e.name}" is already installed.`);
      const i = this.va(e.name);
      try {
        await e.install(this.la, i);
      } catch (s) {
        throw this.ma(e.name), s;
      }
      this.ua.set(e.name, e), this.fa.push(e.name);
    }
  }
  async _a(t) {
    const e = this.ua.get(t);
    if (!e) return;
    const i = this.va(t);
    e.uninstall && await e.uninstall(this.la, i), this.ua.delete(t), this.fa.splice(this.fa.indexOf(t), 1), this.ma(t);
  }
  ya() {
    this.wa(this.da);
  }
  ba() {
    this.wa(this.pa);
  }
  async Ca() {
    const t = [...this.ua.keys()];
    for (const e of t) await this._a(e);
  }
  va(t) {
    return { renderer: this.la.K, font: this.la.je, grid: this.la.Un, canvas: this.la.wr, drawFramebuffer: this.la.ra, asciiFramebuffer: this.la.xa, registerPreDrawHook: (e) => this.Ma(this.da, t, e), registerPostDrawHook: (e) => this.Ma(this.pa, t, e) };
  }
  Ma(t, e, i) {
    const s = t.get(e) ?? /* @__PURE__ */ new Set();
    return s.add(i), t.set(e, s), () => {
      const r = t.get(e);
      r && (r.delete(i), r.size === 0 && t.delete(e));
    };
  }
  ma(t) {
    this.da.delete(t), this.pa.delete(t);
  }
  wa(t) {
    for (const e of this.fa) {
      const i = t.get(e);
      i && i.forEach((s) => s());
    }
  }
}
const yt = `#version 300 es
in vec2 A0;in vec2 A1;out vec2 v_uv;void main(){v_uv=A1;gl_Position=vec4(A0,0.,1.);}`;
class St {
  constructor() {
    a(this, "Fa", /* @__PURE__ */ new Map());
    a(this, "Ta", []);
    a(this, "$a", 0);
    a(this, "Pa", 0);
    a(this, "Ea");
  }
  get Ra() {
    return this.$a;
  }
  get Sa() {
    if (this.$a === 0) return 0;
    let t = 0;
    for (const e of this.Ta) {
      const i = this.Fa.get(e);
      i && (t += Math.min(1, Math.max(0, i.progress)) * i.weight);
    }
    return Math.min(1, t / this.$a);
  }
  ka(t) {
    this.Ea = t;
  }
  za(t, e = 1) {
    const i = `phase-${this.Ta.length + 1}-${Date.now()}`, s = { id: i, label: t, weight: Math.max(1e-3, e), progress: 0, status: "running" };
    return this.Fa.set(i, s), this.Ta.push(i), this.$a += s.weight, i;
  }
  La(t, e) {
    const i = this.Fa.get(t);
    if (!i) return;
    i.progress = Math.max(0, Math.min(1, e)), i.status = i.progress >= 1 ? "complete" : "running";
    const s = this.Sa;
    Math.abs(s - this.Pa) > 1e-3 && (this.Pa = s, this.Ea && this.Ea(s));
  }
  Oa(t) {
    const e = this.Fa.get(t);
    e && (e.progress = 1, e.status = "complete", this.La(t, 1));
  }
  Da(t) {
    const e = this.Fa.get(t);
    e && (e.status = "failed");
  }
  Ha() {
    return this.Ta.map((t) => {
      const e = this.Fa.get(t);
      return e ? { id: e.id, label: e.label, weight: e.weight, progress: e.progress, status: e.status } : { id: t, label: t, weight: 1, progress: 0, status: "pending" };
    });
  }
}
class Nt {
  constructor(t = "active") {
    a(this, "Ia");
    a(this, "Ba", "");
    a(this, "Ga", "");
    this.Ia = t;
  }
  get Na() {
    return this.Ia;
  }
  get Xa() {
    return this.Ia !== "disabled";
  }
  get Ya() {
    return this.Ia === "active" || this.Ia === "transitioning" || this.Ia === "error";
  }
  get Ka() {
    return this.Ba;
  }
  get Wa() {
    return this.Ga;
  }
  Za() {
    this.Ia !== "done" && this.Ia !== "transitioning" || (this.Ia = "active");
  }
  ja() {
    this.Ia !== "disabled" && (this.Ia = "done");
  }
  Va() {
    this.Ia !== "disabled" && (this.Ia = "transitioning");
  }
  qa() {
    this.Ia === "transitioning" && (this.Ia = "done");
  }
  Qa(t) {
    this.Ia !== "disabled" && (this.Ia = "error", t instanceof Error ? (this.Ba = t.message, this.Ga = t.stack || "") : (this.Ba = t, this.Ga = ""));
  }
  Ja() {
    this.Ia = "disabled";
  }
}
class Dt {
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
  Cn() {
    this.ec !== "none" && this.rc > 0 && (this.tc = performance.now());
  }
  tt() {
    if (this.ec === "none" || this.rc === 0) return this.sc = 1, !1;
    const t = performance.now() - this.tc, e = Math.min(1, t / this.rc);
    return e >= 1 ? (this.sc = 0, !0) : (this.sc = 1 - e, !1);
  }
  js() {
    this.sc = 1, this.tc = 0;
  }
}
function ft(n, t) {
  const e = n.tone ?? "auto";
  let i = "dark";
  return e === "light" || e === "dark" ? i = e : t && (i = function(s) {
    if (!s) return 0;
    const [r, h, o] = s.map((l) => l / 255), c = (l) => l <= 0.04045 ? l / 12.92 : Math.pow((l + 0.055) / 1.055, 2.4);
    return 0.2126 * c(r) + 0.7152 * c(h) + 0.0722 * c(o);
  }(t) > 0.5 ? "light" : "dark"), { mode: i, background: t, textColor: i === "light" ? "#1A1A1A" : "#F8F8F8", subtleColor: i === "light" ? "#4A4A4A" : "#C0C0C0" };
}
function Ot(n) {
  return n.mode === "light" ? ["#E91E63", "#9C27B0", "#FF6F00"] : ["#8EF9F3", "#F15BB5", "#FF9B71"];
}
function _t(n, t) {
  return n.length ? n.map((e) => t.color(e)) : [t.color("#FFFFFF")];
}
const _e = ({ textmodifier: n, grid: t, progress: e, frameCount: i, message: s, palette: r, theme: h, phases: o, transitionOpacity: c, isError: l, errorMessage: u }) => {
  const f = "|/-\\", g = Math.floor(i / 6) % 4, A = n.color(h.textColor), p = Math.floor(255 * c), d = n.color(A.r, A.g, A.b, p);
  if (n.charColor(d), n.cellColor(0, 0, 0, 0), l) {
    const v = n.color(h.mode === "light" ? "#D32F2F" : "#FF6B6B", p);
    n.charColor(v), n.push(), n.translate(0, -2, 0), n.char("X"), n.rect(1, 1), n.pop();
    const m = "SETUP ERROR", y = -Math.floor(m.length / 2);
    n.push(), n.translate(y, 0, 0);
    for (const w of m) n.char(w), n.rect(1, 1), n.translateX(1);
    if (n.pop(), u) {
      const w = n.color(h.subtleColor), b = n.color(w.r, w.g, w.b, p);
      n.charColor(b);
      const E = Math.floor(0.8 * t.cols), F = u.split(" "), M = [];
      let x = "";
      for (const C of F) (x + " " + C).length <= E ? x = x ? x + " " + C : C : (x && M.push(x), x = C);
      x && M.push(x);
      const P = M.slice(0, 3);
      M.length > 3 && (P[2] = P[2].substring(0, E - 3) + "..."), P.forEach((C, V) => {
        const Gt = -Math.floor(C.length / 2);
        n.push(), n.translate(Gt, 3 + V, 0);
        for (const zt of C) n.char(zt), n.rect(1, 1), n.translateX(1);
        n.pop();
      });
    }
    return;
  }
  if (n.push(), n.translate(0, 0, 0), n.char(f[g]), n.rect(1, 1), n.pop(), e > 0 || o.some((v) => v.status !== "pending")) {
    const v = Math.max(6, Math.floor(0.6 * t.cols)), m = -Math.floor(v / 2), y = Math.floor(v * e), w = r.length ? r : [n.color("#FFFFFF")];
    n.push(), n.translate(m, 3, 0);
    for (let b = 0; b < v; b++) {
      const E = b < y ? "*" : ".", F = w[b % w.length], M = n.color(F.r, F.g, F.b, p);
      n.charColor(M), n.char(E), n.rect(1, 1), n.translateX(1);
    }
    n.pop();
  }
  if (s) {
    const v = n.color(h.subtleColor), m = n.color(v.r, v.g, v.b, p);
    n.charColor(m);
    const y = -Math.floor(s.length / 2);
    n.push(), n.translate(y, 5, 0);
    for (const w of s) n.char(w), n.rect(1, 1), n.translateX(1);
    n.pop();
  }
}, Xe = { message: "LOADING...", tone: "auto", transition: "fade", transitionDuration: 500 };
class Ge {
  constructor(t, e, i) {
    this.hc = t, this.id = e, this.label = i;
  }
  report(t) {
    this.hc.La(this.id, t);
  }
  complete() {
    this.hc.Oa(this.id);
  }
  fail(t) {
    this.hc.Da(this.id);
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
class Xt {
  constructor(t, e, i) {
    a(this, "la");
    a(this, "l");
    a(this, "ac");
    a(this, "hc");
    a(this, "cc");
    a(this, "lc");
    a(this, "uc");
    a(this, "fc");
    a(this, "dc");
    a(this, "gc");
    a(this, "K");
    a(this, "vc", []);
    a(this, "mc");
    a(this, "_c", performance.now());
    a(this, "yc", 0);
    a(this, "wc", !1);
    a(this, "bc", !1);
    a(this, "Fc");
    this.la = t, this.l = { ...Xe, ...e ?? {} }, this.ac = new Nt("active"), this.hc = new St(), this.cc = new Dt(this.l.transition, this.l.transitionDuration), this.lc = new Mt(60), this.mc = ft(this.l, i);
    const s = Ot(this.mc);
    this.vc = _t(s, this.la), this.K = this.Cc(), this.hc.ka((r) => {
      r >= 0.999 && this.ja();
    });
  }
  async cr(t) {
    if (this.bc) return;
    const e = this.la.K, i = this.la.wr;
    this.uc = new gt(e, 16), await this.uc.cr(t);
    const s = this.uc.maxGlyphDimensions;
    this.fc = new Ut(i.canvas, s.width, s.height), this.dc = e.Ae(this.fc.cols, this.fc.rows, 3), this.gc = e.Ae(this.fc.width, this.fc.height, 1), this.bc = !0;
  }
  get Ya() {
    return this.ac.Ya && this.wc;
  }
  Cn() {
    this.wc || (this.wc = !0, this._c = performance.now(), this.yc = 0, this.lc.Cn(() => this.xc()));
  }
  xn() {
    this.wc && (this.wc = !1, this.lc.xn());
  }
  zr() {
    this.bc && (this.fc.js(), this.dc.resize(this.fc.cols, this.fc.rows), this.gc.resize(this.fc.width, this.fc.height));
  }
  ft() {
    this.xn(), this.bc && (this.uc.ft(), this.dc.ft(), this.gc.ft(), this.bc = !1);
  }
  get progress() {
    return this.hc.Sa;
  }
  message(t) {
    return typeof t == "string" && (this.l.message = t), this.l.message;
  }
  addPhase(t, e = 1) {
    this.ac.Za();
    const i = this.hc.za(t, e);
    return new Ge(this.hc, i, t);
  }
  ja() {
    this.l.transition !== "none" && this.l.transitionDuration > 0 ? (this.ac.Va(), this.cc.Cn()) : (this.ac.ja(), this.xn(), this.Mc());
  }
  Mc() {
    this.Fc && this.Fc();
  }
  Tc(t) {
    this.Fc = t;
  }
  error(t) {
    this.ac.Qa(t);
  }
  xc() {
    if (this.ac.Ya) {
      if (this.yc++, this.ac.Na === "transitioning" && this.cc.tt())
        return this.ac.qa(), this.Mc(), void this.xn();
      this.$c();
    }
  }
  $c() {
    if (!this.bc) return;
    const t = this.dc, e = this.uc, i = this.fc, s = this.gc, r = this.la.K, h = this.la.wr, o = this.la.Pc, c = this.la.Ec;
    r.state.Wt(), t.begin(), this.la.clear(), this.la.push();
    try {
      const l = { textmodifier: this.la, grid: i, progress: this.progress, elapsedMs: performance.now() - this._c, frameCount: this.yc, message: this.l.message, palette: this.vc, theme: this.mc, phases: this.hc.Ha(), transitionOpacity: this.cc.nc, isError: this.ac.Na === "error", errorMessage: this.ac.Ka || void 0, errorDetails: this.ac.Wa || void 0 };
      this.K(l);
    } finally {
      this.la.pop();
    }
    t.end(), s.begin(), r.oe(o), o.L({ u_characterTexture: e.fontFramebuffer, u_charsetDimensions: [e.textureColumns, e.textureRows], U0: t.textures[0], U1: t.textures[1], U2: t.textures[2], U3: [i.cols, i.rows], U4: [s.width, s.height], U5: r.state.canvasBackgroundColor }), r.fe(0, 0, h.width, h.height), s.end(), r.gi(...r.state.canvasBackgroundColor), r.oe(c), c.L({ U6: s.textures[0], U7: [s.width, s.height], U8: [i.offsetX, i.offsetY], U9: [i.width, i.height] }), r.fe(i.offsetX, i.offsetY, i.width, i.height);
  }
  Rc(t) {
    this.mc = ft(this.l, t);
  }
  Cc() {
    const t = this.l.renderer || _e;
    return (e) => {
      t(e), this.Sc(e);
    };
  }
  Sc(t) {
    const { textmodifier: e, grid: i, frameCount: s, theme: r, transitionOpacity: h } = t, o = [116, 101, 120, 116, 109, 111, 100, 101, 46, 106, 115].map((f) => String.fromCharCode(f)).join(""), c = (i.rows + 1 >> 1) - 2, l = 2 - (i.cols + 1 >> 1), u = r.mode === "light" ? [[233, 30, 99], [156, 39, 176], [255, 111, 0]] : [[142, 249, 243], [241, 91, 181], [255, 155, 113]];
    e.push(), e.translate(l, c, 0);
    for (let f = 0; f < o.length; f++) {
      const g = o[f], A = Math.floor(0.1 * s + 0.5 * f) % u.length, [p, d, v] = u[A], m = Math.floor(255 * h), y = e.color(p, d, v, m);
      e.charColor(y), e.char(g), e.point(), e.translateX(1);
    }
    e.pop();
  }
}
class ze extends function(e, ...i) {
  return i.reduce((s, r) => r(s), e);
}(class {
}, Be, Pe, Le, Se, Ne, De) {
  constructor(e = {}) {
    super();
    a(this, "K");
    a(this, "je");
    a(this, "wr");
    a(this, "Un");
    a(this, "ha");
    a(this, "Uo");
    a(this, "na");
    a(this, "ca");
    a(this, "kc");
    a(this, "ra");
    a(this, "Pc");
    a(this, "xa");
    a(this, "Ec");
    a(this, "zc");
    a(this, "Lc", !1);
    a(this, "Oc", !1);
    a(this, "Dc", !1);
    a(this, "Hc", !1);
    a(this, "Ic", () => {
    });
    a(this, "Bc", () => {
    });
    a(this, "Gc", () => {
    });
    a(this, "Nc");
    a(this, "Xc");
    a(this, "Tr", !1);
    a(this, "Yc");
    a(this, "oa", /* @__PURE__ */ new Set());
    this.zc = new Oe(this), this.Tr = e.overlay ?? !1, this.wr = new xe(e), this.K = new ae(this.wr.Lr()), this.je = new gt(this.K, e.fontSize ?? 16), this.ha = new Mt(e.frameRate ?? 60), this.kc = new Xt(this, e.loadingScreen, this.wr.kr()), this.kc.Tc(() => {
      this.ha.Rn = 0, this.Hc = !0;
    }), this.Uo = new Bt(this.wr), this.na = new Lt(this.wr, this.Uo), this.ca = new Pt(), this.Pc = this.K.he(yt, `#version 300 es
precision highp float;uniform sampler2D u_characterTexture;uniform vec2 u_charsetDimensions;uniform sampler2D U1;uniform sampler2D U2;uniform sampler2D U0;uniform vec2 U3;uniform vec2 U4;uniform vec4 U5;in vec2 v_uv;out vec4 fragColor;mat2 A(float B){float C=sin(B);float D=cos(B);return mat2(D,-C,C,D);}void main(){vec2 E=gl_FragCoord.xy/U4;vec2 F=E*U3;vec2 G=floor(F);vec2 H=(G+0.5)/U3;vec4 I=texture(U1,H);vec4 J=texture(U2,H);vec4 K=texture(U0,H);int L=int(K.b*255.+0.5);bool M=(L&1)!=0;bool N=(L&2)!=0;bool O=(L&4)!=0;int P=int(K.r*255.+0.5)+int(K.g*255.+0.5)*256;int Q=int(u_charsetDimensions.x);int R=P/Q;int S=P-(R*Q);float T=(u_charsetDimensions.y-1.)-float(R);vec2 U=1./u_charsetDimensions;vec2 V=vec2(float(S),T)*U;vec2 W=V+U;float X=-K.a*360.*0.017453292;vec2 Y=fract(F)-0.5f;vec2 Z=vec2(N?-1.:1.,O?-1.:1.);Y*=Z;Y=A(X)*Y+0.5;vec2 a=V+clamp(Y,0.,1.)*U;const float b=0.0001;if(any(lessThan(a,V-b))||any(greaterThan(a,W+b))){fragColor=M?I:J;return;}vec4 c=texture(u_characterTexture,a);if(M)c.rgb=mix(c.rgb,1.-c.rgb,float(M));vec4 d=mix(U5,J,J.a);fragColor=mix(d,I,c);}`), this.kc.Cn(), this.Kc(e);
  }
  async Kc(e) {
    await Promise.all([this.je.cr(e.fontSource), this.kc.cr(e.fontSource)]);
    const i = this.je.maxGlyphDimensions;
    this.Un = new Ut(this.wr.canvas, i.width, i.height), this.Uo.cr(this.Un), this.na.cr(this.Un), this.ra = this.K.Ae(this.Un.cols, this.Un.rows, 3), this.xa = this.K.Ae(this.Un.width, this.Un.height, 1), this.Tr && (this.Yc = G.dn(this.K, this.je, this.wr.targetCanvas, this.Un.cols, this.Un.rows), this.ea(this.Yc)), console.log("Grid dimensions:", this.Un.cols, "cols x", this.Un.rows, "rows"), this.Ec = this.K.he(yt, `#version 300 es
precision highp float;uniform sampler2D U6;uniform vec2 U7;uniform vec2 U8;uniform vec2 U9;in vec2 v_uv;out vec4 fragColor;void main(){vec2 A=gl_FragCoord.xy-U8;vec2 B=A*(U7/U9);vec2 C=(floor(B)+0.5)/U7;fragColor=texture(U6,C);}`), this.Wc(), this.ha.Cn(() => this.aa()), await this.zc.ga(e.plugins ?? []);
    try {
      await this.Ic(), this.kc.ja();
    } catch (s) {
      console.error("Error during setup:", s), this.kc.error(s);
    }
  }
  Wc() {
    this.Nc = () => {
      this.Tr && this.resizeCanvas(this.wr.targetCanvas.width, this.wr.targetCanvas.height), this.Gc();
    }, window.addEventListener("resize", this.Nc), this.Uo.so(), this.na.so(), this.ca.so(), window.addEventListener("blur", () => {
      this.ca.So();
    }), this.Tr && (this.Xc = new ResizeObserver(() => {
      this.resizeCanvas(this.wr.targetCanvas.width, this.wr.targetCanvas.height);
    }), this.Xc.observe(this.wr.targetCanvas));
  }
  aa() {
    if (!this.kc.Ya && this.Hc) {
      this.Oc = !0;
      try {
        this.ha.$n(), this.ha.Sn(), this.Tr && Tt(this.K.context, this.Yc.texture, this.wr.targetCanvas), this.zc.ya(), this.K.state.Wt(), this.ra.begin(), this.Bc(), this.ra.end(), this.xa.begin(), this.K.oe(this.Pc), this.Pc.L({ u_characterTexture: this.je.fontFramebuffer, u_charsetDimensions: [this.je.textureColumns, this.je.textureRows], U0: this.ra.textures[0], U1: this.ra.textures[1], U2: this.ra.textures[2], U3: [this.Un.cols, this.Un.rows], U4: [this.xa.width, this.xa.height], U5: this.K.state.canvasBackgroundColor }), this.K.fe(0, 0, this.wr.width, this.wr.height), this.xa.end(), this.K.gi(...this.K.state.canvasBackgroundColor), this.K.oe(this.Ec), this.Ec.L({ U6: this.xa.textures[0], U7: [this.xa.width, this.xa.height], U8: [this.Un.offsetX, this.Un.offsetY], U9: [this.Un.width, this.Un.height] }), this.K.fe(this.Un.offsetX, this.Un.offsetY, this.Un.width, this.Un.height), this.zc.ba();
      } finally {
        this.Oc = !1, this.Lc && !this.Dc && this.Zc();
      }
    }
  }
  resizeCanvas(e, i) {
    this.wr.zr(e, i), this.kc.Rc(this.wr.kr()), this.Un.js(), this.kc.zr(), this.ra.resize(this.Un.cols, this.Un.rows), this.xa.resize(this.Un.width, this.Un.height), this.K.we(), this.Uo.Jn(), this.na.Jn(), this.aa();
  }
  destroy() {
    this.Dc || this.Lc || (this.Lc = !0, this.ha.Mn(), this.Oc || this.Zc());
  }
  Zc() {
    var e, i;
    this.Lc = !1, this.kc.ft(), this.zc.Ca(), window.removeEventListener("resize", this.Nc), (e = this.Xc) == null || e.disconnect(), this.Uo.ao(), this.na.ao(), this.ca.ao(), this.ra.ft(), this.Pc.dispose(), this.je.ft(), this.K.ft(), this.xa.ft(), this.Ec.dispose(), (i = this.Yc) == null || i.ft(), this.wr.ft(), this.Dc = !0;
  }
  setup(e) {
    this.Ic = e;
  }
  draw(e) {
    this.Bc = e;
  }
  windowResized(e) {
    this.Gc = e;
  }
  get grid() {
    return this.Un;
  }
  get font() {
    return this.je;
  }
  get width() {
    return this.wr.width;
  }
  get height() {
    return this.wr.height;
  }
  get canvas() {
    return this.wr.canvas;
  }
  get drawFramebuffer() {
    return this.ra;
  }
  get isDisposed() {
    return this.Dc;
  }
  get overlay() {
    return this.Yc;
  }
  get loading() {
    return this.kc;
  }
  ea(e) {
    this.oa.has(e) || this.oa.add(e);
  }
}
class pt {
  constructor() {
  }
  static create(t = {}) {
    return new ze(t);
  }
  static setErrorLevel(t) {
    dt._(t);
  }
  static get version() {
    return "0.6.0";
  }
}
let at = null;
const Ke = { id: "brightness", createShader: ({ gl: n }) => (at || (at = new W(n, et, `#version 300 es
precision highp float;in vec2 v_uv;uniform sampler2D u_image;uniform bool u_invert;uniform bool u_flipX;uniform bool u_flipY;uniform float u_charRotation;uniform bool u_charColorFixed;uniform vec4 u_charColor;uniform bool u_cellColorFixed;uniform vec4 u_cellColor;uniform vec4 u_backgroundColor;uniform int u_charCount;uniform vec3 u_charList[255];uniform bool u_colorFilterEnabled;uniform int u_colorFilterSize;uniform vec4 u_colorFilterPalette[64];layout(location=0)out vec4 o_character;layout(location=1)out vec4 o_primaryColor;layout(location=2)out vec4 o_secondaryColor;float A(vec3 B){return dot(B,vec3(0.299f,0.587f,0.114f));}float C(vec3 D,vec3 E){vec3 F=D-E;return dot(F,F);}vec4 G(vec4 H){if(!u_colorFilterEnabled||u_colorFilterSize<=0){return H;}int I=min(u_colorFilterSize,64);vec3 J=u_colorFilterPalette[0].rgb;float K=C(H.rgb,J);for(int L=1;L<64;++L){if(L>=I){break;}vec3 M=u_colorFilterPalette[L].rgb;float N=C(H.rgb,M);if(N<K){K=N;J=M;}}return vec4(J,H.a);}void main(){vec2 O=vec2(v_uv.x,1.0f-v_uv.y);vec4 H=texture(u_image,O);H=G(H);float E=A(H.rgb);vec2 P=vec2(0.);if(u_charCount>0){float Q=float(u_charCount);float R=clamp(E*(Q-1.0f),0.0f,Q-1.0f);int S=int(floor(R+0.5f));vec3 T=u_charList[S];P=T.xy;}else{P=vec2(E,0.0f);}vec4 U=u_charColorFixed?u_charColor:H;vec4 V=u_cellColorFixed?u_cellColor:H;if(H.a<0.01f){U=u_backgroundColor;V=u_backgroundColor;}else{}o_primaryColor=vec4(U.rgb,U.a);o_secondaryColor=vec4(V.rgb,V.a);int W=int(u_invert?1:0);int X=int(u_flipX?1:0);int Y=int(u_flipY?1:0);float Z=float(W|(X<<1)|(Y<<2))/255.;o_character=vec4(P,Z,clamp(u_charRotation,0.0f,1.0f));}`)), at), createUniforms: ({ source: n }) => n.createBaseConversionUniforms() }, He = Object.freeze(Object.defineProperty({ __proto__: null, LoadingPhaseTracker: St, LoadingScreenManager: Xt, LoadingScreenStateMachine: Nt, LoadingScreenTransition: Dt, resolveColorInputs: _t, resolveDefaultPalette: Ot, resolveTheme: ft }, Symbol.toStringTag, { value: "Module" })), We = Object.freeze(Object.defineProperty({ __proto__: null, TextmodeFont: gt, TextmodeImage: G, TextmodeVideo: st }, Symbol.toStringTag, { value: "Module" })), je = Object.freeze(Object.defineProperty({ __proto__: null, keyboard: Ue, mouse: Ce, touch: Ie }, Symbol.toStringTag, { value: "Module" }));
Re(Ke);
const Ve = pt.create, Ze = pt.setErrorLevel, qe = pt.version;
export {
  xe as TextmodeCanvas,
  I as TextmodeColor,
  kt as TextmodeErrorLevel,
  $ as TextmodeFramebuffer,
  Ut as TextmodeGrid,
  ze as Textmodifier,
  Ve as create,
  Fe as getConversionStrategy,
  je as input,
  We as loadables,
  He as loading,
  Re as registerConversionStrategy,
  Ze as setErrorLevel,
  pt as textmode,
  ke as unregisterConversionStrategy,
  qe as version
};
