var $t = Object.defineProperty;
var te = (n, t, e) => t in n ? $t(n, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : n[t] = e;
var a = (n, t, e) => te(n, typeof t != "symbol" ? t + "" : t, e);
class U extends Error {
  constructor(t, e = {}) {
    super(U.i(t, e)), this.name = "TextmodeError";
  }
  static i(t, e) {
    return `${t}${e && Object.keys(e).length > 0 ? `

📋 Context:` + Object.entries(e).map(([i, r]) => `
  - ${i}: ${U.o(r)}`).join("") : ""}

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
var ee = ((n) => (n[n.SILENT = 0] = "SILENT", n[n.WARNING = 1] = "WARNING", n[n.ERROR = 2] = "ERROR", n[n.THROW = 3] = "THROW", n))(ee || {});
const D = class D {
  constructor() {
    a(this, "l", { globalLevel: 3 });
  }
  static u() {
    return D.h || (D.h = new D()), D.h;
  }
  v(t, e) {
    const i = "%c[textmode.js] Oops! (╯°□°)╯︵ Something went wrong in your code.", r = "color: #f44336; font-weight: bold; background: #ffebee; padding: 2px 6px; border-radius: 3px;";
    switch (this.l.globalLevel) {
      case 0:
        return !1;
      case 1:
        return console.group(i, r), console.warn(U.i(t, e)), console.groupEnd(), !1;
      case 2:
        return console.group(i, r), console.error(U.i(t, e)), console.groupEnd(), !1;
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
const pt = ut.u();
class Q {
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
        const r = i.name.replace(/\[0\]$/, ""), s = this.A.getUniformLocation(this.C, r);
        s && (this.M.set(r, s), this.F.set(r, { type: i.type, size: i.size }));
      }
    }
  }
  R(t, e) {
    const i = this.k(this.A.VERTEX_SHADER, t), r = this.k(this.A.FRAGMENT_SHADER, e), s = this.A.createProgram();
    if (this.A.attachShader(s, i), this.A.attachShader(s, r), this.A.linkProgram(s), !this.A.getProgramParameter(s, this.A.LINK_STATUS)) {
      const h = this.A.getProgramInfoLog(s);
      throw Error("Shader program link error: " + h);
    }
    return this.A.deleteShader(i), this.A.deleteShader(r), s;
  }
  k(t, e) {
    const i = this.A.createShader(t);
    if (this.A.shaderSource(i, e), this.A.compileShader(i), !this.A.getShaderParameter(i, this.A.COMPILE_STATUS)) {
      const r = this.A.getShaderInfoLog(i);
      throw this.A.deleteShader(i), Error("Shader compilation error: " + r);
    }
    return i;
  }
  L() {
    this.A.useProgram(this.C), this.D();
  }
  D() {
    this.$ = 0, this.P.clear();
  }
  O(t) {
    for (const e in t) this.H(e, t[e]);
  }
  H(t, e) {
    var c, l;
    const i = this.M.get(t);
    if (!i) return;
    const r = this.F.get(t);
    if (!r) return;
    const { type: s, size: h } = r, o = this.A;
    if (e instanceof WebGLTexture) {
      const u = this.I(t);
      return o.uniform1i(i, u), o.activeTexture(o.TEXTURE0 + u), void o.bindTexture(o.TEXTURE_2D, e);
    }
    if (e instanceof X) {
      const u = this.I(t);
      return o.uniform1i(i, u), o.activeTexture(o.TEXTURE0 + u), void o.bindTexture(o.TEXTURE_2D, e.textures[0]);
    }
    if (typeof e == "number") return void (s === o.INT || s === o.BOOL ? o.uniform1i(i, e) : o.uniform1f(i, e));
    if (typeof e == "boolean") return void o.uniform1i(i, e ? 1 : 0);
    if (Array.isArray(e[0])) {
      const u = e.flat(), f = { [o.FLOAT_VEC2]: () => o.uniform2fv(i, u), [o.FLOAT_VEC3]: () => o.uniform3fv(i, u), [o.FLOAT_VEC4]: () => o.uniform4fv(i, u) };
      (c = f[s]) == null || c.call(f);
    } else {
      const u = e, f = { [o.FLOAT]: () => h > 1 ? o.uniform1fv(i, u) : o.uniform1f(i, u[0]), [o.FLOAT_VEC2]: () => o.uniform2fv(i, u), [o.FLOAT_VEC3]: () => o.uniform3fv(i, u), [o.FLOAT_VEC4]: () => o.uniform4fv(i, u), [o.INT]: () => h > 1 ? o.uniform1iv(i, u) : o.uniform1i(i, u[0]), [o.INT_VEC2]: () => o.uniform2iv(i, u), [o.INT_VEC3]: () => o.uniform3iv(i, u), [o.INT_VEC4]: () => o.uniform4iv(i, u), [o.BOOL]: () => o.uniform1iv(i, u), [o.FLOAT_MAT2]: () => o.uniformMatrix2fv(i, !1, u), [o.FLOAT_MAT3]: () => o.uniformMatrix3fv(i, !1, u), [o.FLOAT_MAT4]: () => o.uniformMatrix4fv(i, !1, u) };
      (l = f[s]) == null || l.call(f);
    }
  }
  I(t) {
    const e = this.P.get(t);
    if (e !== void 0) return e;
    if (this.$ >= this.U) throw Error(`[textmode.js] Shader attempted to bind more than ${this.U} texture samplers. Uniform "${t}" cannot be assigned.`);
    const i = this.$++;
    return this.P.set(t, i), i;
  }
  get program() {
    return this.C;
  }
  dispose() {
    this.A.deleteProgram(this.C);
  }
}
function yt(n, t, e, i) {
  return 180 * Math.atan2(i - t, e - n) / Math.PI;
}
function Y(n, t, e, i) {
  return Math.hypot(e - n, i - t);
}
function W(n, t, e) {
  return Math.min(Math.max(n, t), e);
}
function Tt(n) {
  return (n % 360 + 360) % 360 / 360;
}
function Rt(n, t, e) {
  n.bindTexture(n.TEXTURE_2D, t), n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL, 1), n.texImage2D(n.TEXTURE_2D, 0, n.RGBA, n.RGBA, n.UNSIGNED_BYTE, e), n.bindTexture(n.TEXTURE_2D, null);
}
function vt(n, t, e, i, r) {
  n.texParameteri(n.TEXTURE_2D, n.TEXTURE_MIN_FILTER, t), n.texParameteri(n.TEXTURE_2D, n.TEXTURE_MAG_FILTER, e), n.texParameteri(n.TEXTURE_2D, n.TEXTURE_WRAP_S, i), n.texParameteri(n.TEXTURE_2D, n.TEXTURE_WRAP_T, r);
}
function ft(n, t, e, i, r, s = 0, h = WebGL2RenderingContext.FLOAT, o = !1) {
  n.enableVertexAttribArray(t), n.vertexAttribPointer(t, e, h, o, i, r), n.vertexAttribDivisor(t, s);
}
function Ft(n, t, e, i, r) {
  n.bindBuffer(t, e), n.bufferData(t, i, r), n.bindBuffer(t, null);
}
const rt = `#version 300 es
in vec2 A0;in vec2 A1;in vec2 A2;in vec2 A3;in vec3 A4;in vec4 A5;in vec4 A6;in vec4 A7;in vec3 A8;in vec3 A9;in vec4 Aa;in vec4 Ab;in vec3 Ac;uniform vec2 Ur;uniform float Us;uniform float Ut;out vec2 v_uv;out vec3 v_glyphIndex;out vec4 v_glyphColor;out vec4 v_cellColor;out vec4 v_glyphFlags;out vec3 v_worldPosition;out vec3 v_normal;out float v_geometryType;const float A=6.28318530718f;const int B=2;const int C=3;const int D=4;vec2 E(float F,vec2 G,vec2 H,vec2 I,vec2 J){float K=1.0f-F;float L=K*K;float M=L*K;float N=F*F;float O=N*F;return M*G+3.0f*L*F*H+3.0f*K*N*I+O*J;}vec2 P(float F,vec2 G,vec2 H,vec2 I,vec2 J){float K=1.0f-F;float L=K*K;float N=F*F;return-3.0f*L*G+3.0f*(L-2.0f*K*F)*H+3.0f*(2.0f*K*F-N)*I+3.0f*N*J;}vec3 Q(vec3 R,float S){float T=cos(S);float U=sin(S);return vec3(R.x,R.y*T-R.z*U,R.y*U+R.z*T);}vec3 V(vec3 R,float S){float T=cos(S);float U=sin(S);return vec3(R.x*T+R.z*U,R.y,-R.x*U+R.z*T);}vec3 W(vec3 R,float S){float T=cos(S);float U=sin(S);return vec3(R.x*T-R.y*U,R.x*U+R.y*T,R.z);}vec3 X(vec3 R,vec3 Y){vec3 Z=R;if(Y.z!=0.0f){Z=W(Z,Y.z);}if(Y.y!=0.0f){Z=V(Z,Y.y);}if(Y.x!=0.0f){Z=Q(Z,Y.x);}return Z;}void main(){v_uv=A1;v_glyphIndex=A4;v_glyphColor=A5;v_cellColor=A6;v_glyphFlags=A7;vec4 a=Aa;vec4 b=Ab;vec2 c=A3;vec2 d=A2;float e=Ac.x;float f=Ac.y;int g=int(Ac.z);vec2 h=d;vec2 i=h+c*0.5f;float j=f+e*0.5f;vec3 k=vec3(i,j);vec3 l;if(g==D){float F=clamp(A0.x,0.0f,1.0f);vec2 G=b.xy;vec2 H=a.xy;vec2 I=a.zw;vec2 J=b.zw;vec2 m=E(F,G,H,I,J);vec2 n=P(F,G,H,I,J);float o=length(n);vec2 p=o>0.0f?n/o:vec2(1.0f,0.0f);vec2 q=vec2(-p.y,p.x);vec2 r=m;vec2 s=r+q*A0.y*c.y;l=vec3(s,f);}else if(g==C){float t=mod(a.x,A);if(t<0.0f){t+=A;}float u=mod(a.y,A);if(u<0.0f){u+=A;}float v=t-u;if(v<=0.0f){v+=A;}float S=t-A0.x*v;vec2 w=vec2(cos(S),sin(S))*A0.y;vec2 s=w*c+h;l=vec3(s,f);}else if(g==B){vec2 s=A0.xy*c+h;l=vec3(s,f);}vec3 x=X(l,A9);vec3 y=x+A8;vec3 z=vec3(0.0f,0.0f,1.0f);v_worldPosition=y;v_normal=z;v_geometryType=float(g);vec2 AA=(y.xy/Ur)*2.0f;AA.y=-AA.y;float AB=y.z/Ur.y;float AC=clamp(-AB*Us,-0.99f,0.99f);if(Ut>0.5f){gl_Position=vec4(AA,AC,1.0f);}else{float AD=0.5f;float AE=1.0f/(1.0f-AB*AD);AA*=AE;gl_Position=vec4(AA,AC,1.0f);}}`, k = class k {
  constructor(t, e, i = e, r = 1, s = {}, h) {
    a(this, "G");
    a(this, "j");
    a(this, "l");
    a(this, "A");
    a(this, "N");
    a(this, "X", []);
    a(this, "Y", null);
    a(this, "K");
    a(this, "W");
    a(this, "Z", null);
    a(this, "q", /* @__PURE__ */ new Map());
    this.G = e, this.j = i, this.A = t, this.K = W(r, 1, 8), this.W = h, this.l = { filter: "nearest", wrap: "clamp", format: "rgba", type: "unsigned_byte", depth: !0, ...s }, k.V || (k.V = new Q(t, rt, `#version 300 es
precision highp float;in vec2 v_uv;uniform sampler2D U0;uniform sampler2D U1;uniform sampler2D U2;uniform sampler2D U3;uniform vec2 U4;uniform bool U5;uniform bool U6;uniform bool U7;layout(location=0)out vec4 o_character;layout(location=1)out vec4 o_primaryColor;layout(location=2)out vec4 o_secondaryColor;layout(location=3)out vec4 A;void main(){vec2 B=vec2(v_uv.x,1.-v_uv.y);vec2 C=B*U4;vec2 D=(floor(C)+0.5f)/U4;vec4 E=texture(U0,D);vec4 F=U5?texture(U1,D):vec4(0.);if(U5&&F.a==0.){discard;}vec4 G=U6?texture(U2,D):vec4(0.);vec4 H=U7?texture(U3,D):vec4(0.);o_character=E;o_primaryColor=F;o_secondaryColor=G;A=H;}`));
    const o = t.getParameter(t.MAX_DRAW_BUFFERS), c = t.getParameter(t.MAX_COLOR_ATTACHMENTS);
    this.K = Math.min(this.K, o, c), this.N = t.createFramebuffer(), this.J(), this.tt(), this.l.depth && this.st();
  }
  J() {
    const t = this.A, e = this.l.filter === "linear" ? t.LINEAR : t.NEAREST, i = this.l.wrap === "repeat" ? t.REPEAT : t.CLAMP_TO_EDGE, r = this.l.type === "float" ? t.FLOAT : t.UNSIGNED_BYTE, s = r === t.FLOAT ? t.RGBA32F : t.RGBA8, h = t.RGBA;
    for (let o = 0; o < this.K; o++) {
      const c = t.createTexture();
      t.bindTexture(t.TEXTURE_2D, c), vt(t, e, e, i, i), t.texImage2D(t.TEXTURE_2D, 0, s, this.G, this.j, 0, h, r, null), this.X.push(c);
    }
    t.bindTexture(t.TEXTURE_2D, null);
  }
  tt() {
    const t = this.A;
    if (t.bindFramebuffer(t.FRAMEBUFFER, this.N), this.K === 1) t.framebufferTexture2D(t.FRAMEBUFFER, t.COLOR_ATTACHMENT0, t.TEXTURE_2D, this.X[0], 0);
    else {
      const e = [];
      for (let i = 0; i < this.K; i++) {
        const r = t.COLOR_ATTACHMENT0 + i;
        t.framebufferTexture2D(t.FRAMEBUFFER, r, t.TEXTURE_2D, this.X[i], 0), e.push(r);
      }
      t.drawBuffers(e);
    }
    t.bindFramebuffer(t.FRAMEBUFFER, null);
  }
  st() {
    const t = this.A;
    this.Y = t.createRenderbuffer(), t.bindRenderbuffer(t.RENDERBUFFER, this.Y), t.renderbufferStorage(t.RENDERBUFFER, t.DEPTH_COMPONENT24, this.G, this.j), t.bindFramebuffer(t.FRAMEBUFFER, this.N), t.framebufferRenderbuffer(t.FRAMEBUFFER, t.DEPTH_ATTACHMENT, t.RENDERBUFFER, this.Y), t.bindFramebuffer(t.FRAMEBUFFER, null), t.bindRenderbuffer(t.RENDERBUFFER, null);
  }
  et(t) {
    Rt(this.A, this.X[0], t);
  }
  resize(t, e) {
    this.G = t, this.j = e, this.q.clear();
    const i = this.A, r = this.l.type === "float" ? i.FLOAT : i.UNSIGNED_BYTE, s = r === i.FLOAT ? i.RGBA32F : i.RGBA8, h = i.RGBA;
    for (const o of this.X) i.bindTexture(i.TEXTURE_2D, o), i.texImage2D(i.TEXTURE_2D, 0, s, this.G, this.j, 0, h, r, null);
    i.bindTexture(i.TEXTURE_2D, null), this.Y && (i.bindRenderbuffer(i.RENDERBUFFER, this.Y), i.renderbufferStorage(i.RENDERBUFFER, i.DEPTH_COMPONENT24, this.G, this.j), i.bindRenderbuffer(i.RENDERBUFFER, null));
  }
  readPixels(t) {
    const e = this.q.get(t);
    if (e) return e;
    const i = this.A, r = this.G, s = this.j, h = new Uint8Array(r * s * 4), o = i.getParameter(i.READ_FRAMEBUFFER_BINDING);
    i.bindFramebuffer(i.READ_FRAMEBUFFER, this.N), i.readBuffer(i.COLOR_ATTACHMENT0 + t), i.readPixels(0, 0, r, s, i.RGBA, i.UNSIGNED_BYTE, h), i.bindFramebuffer(i.READ_FRAMEBUFFER, o);
    const c = 4 * r, l = new Uint8Array(h.length);
    for (let u = 0; u < s; u++) {
      const f = (s - 1 - u) * c, d = u * c;
      l.set(h.subarray(f, f + c), d);
    }
    return this.q.set(t, l), l;
  }
  begin() {
    const t = this.A;
    this.q.clear(), this.W.it(), this.W.rt(this.N, this.G, this.j, this.K), this.l.depth && t.clear(t.DEPTH_BUFFER_BIT), this.W.state.nt();
  }
  end() {
    this.W.state.ot(), this.W.ht(), this.W.ct();
  }
  lt() {
    return this.Z || this.ut(), this.Z;
  }
  ut() {
    if (!this.W) return;
    const t = this.K > 1, e = this.K > 2, i = this.K > 3, r = { U0: this.X[0], U1: t ? this.X[1] : this.X[0], U2: e ? this.X[2] : this.X[0], U3: i ? this.X[3] : this.X[0], U4: [this.G, this.j], U5: t, U6: e, U7: i }, s = k.V;
    this.Z = this.W.dt.ft(s, r, !0);
  }
  dispose() {
    const t = this.A;
    t.deleteFramebuffer(this.N), this.X.forEach((e) => {
      t.deleteTexture(e);
    }), this.Y && t.deleteRenderbuffer(this.Y);
  }
  get width() {
    return this.G;
  }
  get height() {
    return this.j;
  }
  get textures() {
    return this.X;
  }
  get attachmentCount() {
    return this.K;
  }
};
a(k, "V", null);
let X = k;
const Pt = /* @__PURE__ */ new WeakMap();
function ht(n, t) {
  Pt.set(n, t);
}
function Ct(n) {
  return Pt.get(n);
}
function tt(n, t, e, i, r = 255) {
  n[0] = t / 255, n[1] = (e ?? t) / 255, n[2] = (i ?? t) / 255, n[3] = r / 255;
}
class st {
  constructor() {
    a(this, "vt", 1);
    a(this, "gt", 0);
    a(this, "_t", 0);
    a(this, "yt", 0);
    a(this, "At", 0);
    a(this, "wt", 0);
    a(this, "bt", 0);
    a(this, "Ct", [0, 0, 0]);
    a(this, "xt", [1, 1, 1, 1]);
    a(this, "Mt", [0, 0, 0, 1]);
    a(this, "Ft", !1);
    a(this, "$t", !1);
    a(this, "Pt", !1);
    a(this, "Tt", 0);
    a(this, "Rt", [0, 0, 0, 1]);
    a(this, "St", !1);
    a(this, "Et", []);
    a(this, "kt", []);
  }
  static Lt() {
    return { zt: 1, Dt: 0, Ot: 0, Ht: 0, At: 0, wt: 0, bt: 0, Tt: 0, Bt: !1, It: !1, Pt: !1, St: !1, Gt: [0, 0, 0], jt: [1, 1, 1, 1], Qt: [0, 0, 0, 1] };
  }
  Nt(t) {
    t.zt = this.vt, t.Dt = this.gt, t.Ot = this._t, t.Ht = this.yt, t.At = this.At, t.wt = this.wt, t.bt = this.bt, t.Bt = this.Ft, t.It = this.$t, t.Pt = this.Pt, t.Tt = this.Tt, t.St = this.St, t.Gt[0] = this.Ct[0], t.Gt[1] = this.Ct[1], t.Gt[2] = this.Ct[2], t.jt[0] = this.xt[0], t.jt[1] = this.xt[1], t.jt[2] = this.xt[2], t.jt[3] = this.xt[3], t.Qt[0] = this.Mt[0], t.Qt[1] = this.Mt[1], t.Qt[2] = this.Mt[2], t.Qt[3] = this.Mt[3];
  }
  Xt(t) {
    this.vt = t.zt, this.gt = t.Dt, this._t = t.Ot, this.yt = t.Ht, this.At = t.At, this.wt = t.wt, this.bt = t.bt, this.Ft = t.Bt, this.$t = t.It, this.Pt = t.Pt, this.Tt = t.Tt, this.St = t.St, this.Ct[0] = t.Gt[0], this.Ct[1] = t.Gt[1], this.Ct[2] = t.Gt[2], this.xt[0] = t.jt[0], this.xt[1] = t.jt[1], this.xt[2] = t.jt[2], this.xt[3] = t.jt[3], this.Mt[0] = t.Qt[0], this.Mt[1] = t.Qt[1], this.Mt[2] = t.Qt[2], this.Mt[3] = t.Qt[3];
  }
  nt() {
    let t = this.kt.pop();
    t || (t = st.Lt()), this.Nt(t), this.Et.push(t);
  }
  ot() {
    const t = this.Et.pop();
    t ? (this.Xt(t), this.kt.push(t)) : console.warn("pop() called without matching push()");
  }
  Yt(t) {
    this.Nt(t);
  }
  Kt(t) {
    this.vt = Math.abs(t);
  }
  Wt() {
    this.gt = 0, this._t = 0, this.yt = 0, this.At = 0, this.wt = 0, this.bt = 0, this.St = !1;
  }
  Zt(t) {
    t !== 0 && (this.At += t * Math.PI / 180);
  }
  qt(t) {
    t !== 0 && (this.wt += t * Math.PI / 180);
  }
  Vt(t) {
    t !== 0 && (this.bt += t * Math.PI / 180);
  }
  Jt(t = 0, e = 0, i = 0) {
    t === 0 && e === 0 && i === 0 || (this.gt += t, this._t += e, this.yt += i);
  }
  ts(t) {
    this.Jt(t, 0, 0);
  }
  ss(t) {
    this.Jt(0, t, 0);
  }
  es(t) {
    this.Jt(0, 0, t);
  }
  rs(t) {
    this.Ct[0] = t[0], this.Ct[1] = t[1], this.Ct[2] = t[2];
  }
  ns(t, e, i, r = 255) {
    tt(this.xt, t, e, i, r);
  }
  hs(t, e, i, r = 255) {
    tt(this.Mt, t, e, i, r);
  }
  cs(t) {
    this.Ft = t;
  }
  ls(t) {
    this.$t = t;
  }
  us(t) {
    this.Pt = t;
  }
  fs(t) {
    this.Tt = Tt(t);
  }
  ds(t, e, i, r) {
    tt(this.Rt, t, e, i, r);
  }
  vs(t) {
    this.St = t;
  }
  get canvasBackgroundColor() {
    return this.Rt;
  }
  get useOrtho() {
    return this.St;
  }
  get rotationX() {
    return this.At;
  }
  get rotationY() {
    return this.wt;
  }
  get rotationZ() {
    return this.bt;
  }
}
const dt = new Float32Array([-0.5, -0.5, 0, 0, 0.5, -0.5, 1, 0, -0.5, 0.5, 0, 1, -0.5, 0.5, 0, 1, 0.5, -0.5, 1, 0, 0.5, 0.5, 1, 1]), z = { ps: 16, gs: WebGL2RenderingContext.TRIANGLES, _s: { As: { size: 2, offset: 0 }, ws: { size: 2, offset: 8 } } };
class ie {
  constructor(t) {
    a(this, "A");
    a(this, "bs");
    a(this, "Cs");
    this.A = t, this.bs = t.createBuffer(), this.Cs = new Float32Array(dt.length);
  }
  Ms(t, e, i, r) {
    const s = this.A, h = Ct(this.A), o = h[2], c = h[3], l = t / o * 2 - 1, u = (t + i) / o * 2 - 1, f = 1 - (e + r) / c * 2, d = 1 - e / c * 2, g = dt, v = this.Cs;
    for (let p = 0; p < g.length; p += 4) {
      const m = g[p], A = g[p + 1], w = g[p + 2], y = g[p + 3], E = l + (m + 0.5) * (u - l), b = f + (A + 0.5) * (d - f);
      v[p] = E, v[p + 1] = b, v[p + 2] = w, v[p + 3] = y;
    }
    s.bindBuffer(s.ARRAY_BUFFER, this.bs), s.bufferData(s.ARRAY_BUFFER, v, s.DYNAMIC_DRAW), s.enableVertexAttribArray(0), s.vertexAttribPointer(0, 2, s.FLOAT, !1, 16, 0), s.enableVertexAttribArray(1), s.vertexAttribPointer(1, 2, s.FLOAT, !1, 16, 8), s.drawArrays(s.TRIANGLES, 0, 6), s.disableVertexAttribArray(1), s.disableVertexAttribArray(0), s.bindBuffer(s.ARRAY_BUFFER, null);
  }
  Fs() {
    this.A.deleteBuffer(this.bs);
  }
}
var x = ((n) => (n.RECTANGLE = "rectangle", n.LINE = "line", n.ELLIPSE = "ellipse", n.ARC = "arc", n.TRIANGLE = "triangle", n.BEZIER_CURVE = "bezier_curve", n))(x || {});
const re = { rectangle: 2, line: 2, ellipse: 2, triangle: 2, arc: 3, bezier_curve: 4 };
class se {
  constructor(t) {
    a(this, "A");
    a(this, "$s", /* @__PURE__ */ new Map());
    this.A = t;
  }
  Ps(t, e, i, r) {
    const s = this.A;
    let h = this.$s.get(t);
    h || (h = /* @__PURE__ */ new Map(), this.$s.set(t, h));
    let o = h.get(e) || null;
    if (!o) {
      o = s.createVertexArray(), h.set(e, o), s.bindVertexArray(o), s.bindBuffer(s.ARRAY_BUFFER, r);
      const c = s.getAttribLocation(t, "A0");
      c !== -1 && ft(s, c, i._s.As.size, i.ps, i._s.As.offset, 0, s.FLOAT, !1);
      const l = s.getAttribLocation(t, "A1");
      l !== -1 && ft(s, l, i._s.ws.size, i.ps, i._s.ws.offset, 0, s.FLOAT, !1);
    }
    s.bindVertexArray(o);
  }
  Ts() {
    this.A.bindVertexArray(null);
  }
  Fs() {
    for (const [, t] of this.$s) for (const [, e] of t) e && this.A.deleteVertexArray(e);
  }
}
const B = class B {
  static Rs(t, e, i = 0) {
    const r = e || new Float32Array(B.FLOATS_PER_INSTANCE);
    let s = i;
    r[s++] = t.As[0], r[s++] = t.As[1], r[s++] = t.Ss[0], r[s++] = t.Ss[1], r[s++] = t.Gt[0], r[s++] = t.Gt[1], r[s++] = t.Gt[2], r[s++] = t.jt[0], r[s++] = t.jt[1], r[s++] = t.jt[2], r[s++] = t.jt[3], r[s++] = t.Qt[0], r[s++] = t.Qt[1], r[s++] = t.Qt[2], r[s++] = t.Qt[3], r[s++] = t.Es[0], r[s++] = t.Es[1], r[s++] = t.Es[2], r[s++] = t.Tt;
    const h = t.ks;
    r[s++] = (h == null ? void 0 : h[0]) ?? 0, r[s++] = (h == null ? void 0 : h[1]) ?? 0, r[s++] = (h == null ? void 0 : h[2]) ?? 0;
    const o = t.Ls;
    r[s++] = (o == null ? void 0 : o[0]) ?? 0, r[s++] = (o == null ? void 0 : o[1]) ?? 0, r[s++] = (o == null ? void 0 : o[2]) ?? 0;
    const c = t.zs, l = t.Ds, u = t.Os, f = t.Hs, d = t.Bs, g = !(!l || !u);
    return g ? (r[s++] = (f == null ? void 0 : f[0]) ?? 0, r[s++] = (f == null ? void 0 : f[1]) ?? 0, r[s++] = (d == null ? void 0 : d[0]) ?? 0, r[s++] = (d == null ? void 0 : d[1]) ?? 0, r[s++] = l[0], r[s++] = l[1], r[s++] = u[0], r[s++] = u[1]) : !g && !!c ? (r[s++] = c[0], r[s++] = c[1], r[s++] = 0, r[s++] = 0, r[s++] = 0, r[s++] = 0, r[s++] = 0, r[s++] = 0) : (r[s++] = 0, r[s++] = 0, r[s++] = 0, r[s++] = 0, r[s++] = 0, r[s++] = 0, r[s++] = 0, r[s++] = 0), r[s++] = t.Is ?? 0, r[s++] = t.Gs ?? 0, r[s++] = t.js ?? 0, r;
  }
  static Qs(t, e) {
    const i = t.length * B.FLOATS_PER_INSTANCE, r = e || new Float32Array(i);
    for (let s = 0; s < t.length; s++) {
      const h = s * B.FLOATS_PER_INSTANCE;
      B.Rs(t[s], r, h);
    }
    return r;
  }
};
a(B, "BYTES_PER_INSTANCE", 144), a(B, "FLOATS_PER_INSTANCE", 36);
let O = B;
const C = class C {
};
a(C, "STRIDE", O.BYTES_PER_INSTANCE), a(C, "ATTRIBUTES", { A2: { location: -1, size: 2, type: WebGL2RenderingContext.FLOAT, normalized: !1, stride: C.STRIDE, offset: 0, divisor: 1 }, A3: { location: -1, size: 2, type: WebGL2RenderingContext.FLOAT, normalized: !1, stride: C.STRIDE, offset: 8, divisor: 1 }, A4: { location: -1, size: 3, type: WebGL2RenderingContext.FLOAT, normalized: !1, stride: C.STRIDE, offset: 16, divisor: 1 }, A5: { location: -1, size: 4, type: WebGL2RenderingContext.FLOAT, normalized: !1, stride: C.STRIDE, offset: 28, divisor: 1 }, A6: { location: -1, size: 4, type: WebGL2RenderingContext.FLOAT, normalized: !1, stride: C.STRIDE, offset: 44, divisor: 1 }, A7: { location: -1, size: 4, type: WebGL2RenderingContext.FLOAT, normalized: !1, stride: C.STRIDE, offset: 60, divisor: 1 }, A8: { location: -1, size: 3, type: WebGL2RenderingContext.FLOAT, normalized: !1, stride: C.STRIDE, offset: 76, divisor: 1 }, A9: { location: -1, size: 3, type: WebGL2RenderingContext.FLOAT, normalized: !1, stride: C.STRIDE, offset: 88, divisor: 1 }, Aa: { location: -1, size: 4, type: WebGL2RenderingContext.FLOAT, normalized: !1, stride: C.STRIDE, offset: 100, divisor: 1 }, Ab: { location: -1, size: 4, type: WebGL2RenderingContext.FLOAT, normalized: !1, stride: C.STRIDE, offset: 116, divisor: 1 }, Ac: { location: -1, size: 3, type: WebGL2RenderingContext.FLOAT, normalized: !1, stride: C.STRIDE, offset: 132, divisor: 1 } });
let H = C;
class ne {
  constructor(t = 1e3, e = 1.5) {
    a(this, "Ns");
    a(this, "Xs");
    a(this, "Ys");
    a(this, "Ks", 0);
    a(this, "Ws", 0);
    this.Xs = t, this.Ys = e;
    const i = t * O.FLOATS_PER_INSTANCE;
    this.Ns = new Float32Array(i);
  }
  Zs(t) {
    if (t <= this.Xs) return;
    const e = Math.ceil(t * this.Ys), i = this.Xs;
    this.Xs = e;
    const r = e * O.FLOATS_PER_INSTANCE, s = new Float32Array(r), h = i * O.FLOATS_PER_INSTANCE;
    s.set(this.Ns.subarray(0, Math.min(h, this.Ks))), this.Ns = s;
  }
  qs() {
    return { buffer: this.Ns, offset: this.Ks };
  }
  Vs(t) {
    this.Ks += t, this.Ws++;
  }
  Js() {
    this.Ks = 0, this.Ws = 0;
  }
  te(t = 0, e) {
    return this.Ns.subarray(t, e ?? this.Ks);
  }
  get se() {
    return this.Ws;
  }
  get ee() {
    return this.Xs;
  }
  get ie() {
    return this.Ks;
  }
  get re() {
    return this.Ws === 0;
  }
}
class he {
  constructor(t) {
    a(this, "Ns");
    this.Ns = t;
  }
  ne(t) {
    this.Ns.Zs(this.Ns.se + 1);
    const { buffer: e, offset: i } = this.Ns.qs();
    e[i + 0] = t.x, e[i + 1] = t.y, e[i + 2] = t.width, e[i + 3] = t.height, e[i + 4] = t.char0, e[i + 5] = t.char1, e[i + 6] = t.char2, e[i + 7] = t.r1, e[i + 8] = t.g1, e[i + 9] = t.b1, e[i + 10] = t.a1, e[i + 11] = t.r2, e[i + 12] = t.g2, e[i + 13] = t.b2, e[i + 14] = t.a2, e[i + 15] = t.invert, e[i + 16] = t.flipX, e[i + 17] = t.flipY, e[i + 18] = t.charRot, e[i + 19] = t.translationX, e[i + 20] = t.translationY, e[i + 21] = t.translationZ, e[i + 22] = t.rotationX, e[i + 23] = t.rotationY, e[i + 24] = t.rotationZ;
    const r = t.curveParams0, s = t.curveParams1;
    return e[i + 25] = r[0], e[i + 26] = r[1], e[i + 27] = r[2], e[i + 28] = r[3], e[i + 29] = s[0], e[i + 30] = s[1], e[i + 31] = s[2], e[i + 32] = s[3], e[i + 33] = t.depth, e[i + 34] = t.baseZ, e[i + 35] = t.geometryType, this.Ns.Vs(O.FLOATS_PER_INSTANCE), this.Ns.se - 1;
  }
  get se() {
    return this.Ns.se;
  }
}
class oe {
  constructor(t, e = 1e3) {
    a(this, "A");
    a(this, "oe", null);
    a(this, "he", 0);
    a(this, "ae", /* @__PURE__ */ new Map());
    this.A = t, this.ce(e);
  }
  ce(t) {
    const e = this.A;
    this.oe && e.deleteBuffer(this.oe), this.oe = e.createBuffer();
    const i = t * O.BYTES_PER_INSTANCE;
    Ft(e, e.ARRAY_BUFFER, this.oe, i, e.DYNAMIC_DRAW), this.he = t;
  }
  le(t) {
    this.ce(t);
  }
  get ee() {
    return this.he;
  }
  ue(t, e) {
    if (e === 0) return;
    const i = this.A;
    i.bindBuffer(i.ARRAY_BUFFER, this.oe);
    const r = e * O.FLOATS_PER_INSTANCE;
    i.bufferSubData(i.ARRAY_BUFFER, 0, t, 0, r);
  }
  fe(t) {
    let e = this.ae.get(t);
    if (!e) {
      e = /* @__PURE__ */ new Map();
      const i = this.A;
      for (const r in H.ATTRIBUTES) {
        const s = i.getAttribLocation(t, r);
        s !== -1 && e.set(r, s);
      }
      this.ae.set(t, e);
    }
    return e;
  }
  de(t) {
    const e = this.A, i = t.program, r = this.fe(i);
    for (const [s, h] of r) {
      const o = H.ATTRIBUTES[s];
      o && ft(e, h, o.size, o.stride, o.offset, o.divisor, o.type, o.normalized);
    }
  }
  ve(t) {
    const e = this.A, i = this.fe(t.program);
    for (const [r, s] of i)
      H.ATTRIBUTES[r] && (e.disableVertexAttribArray(s), e.vertexAttribDivisor(s, 0));
  }
  Fs() {
    this.oe && (this.A.deleteBuffer(this.oe), this.oe = null), this.ae.clear();
  }
}
class ae {
  constructor(t, e = 1e3, i = 1.5) {
    a(this, "A");
    a(this, "Ns");
    a(this, "pe");
    a(this, "ge");
    this.A = t, this.Ns = new ne(e, i), this.pe = new he(this.Ns), this.ge = new oe(t, e);
  }
  me(t) {
    var r, s, h, o, c, l, u, f, d, g;
    const e = [0, 0, 0, 0], i = [0, 0, 0, 0];
    return t.Ds && t.Os ? (e[0] = ((r = t.Hs) == null ? void 0 : r[0]) ?? 0, e[1] = ((s = t.Hs) == null ? void 0 : s[1]) ?? 0, e[2] = ((h = t.Bs) == null ? void 0 : h[0]) ?? 0, e[3] = ((o = t.Bs) == null ? void 0 : o[1]) ?? 0, i[0] = t.Ds[0], i[1] = t.Ds[1], i[2] = t.Os[0], i[3] = t.Os[1]) : t.zs && (e[0] = t.zs[0], e[1] = t.zs[1]), this.ne({ x: t.As[0], y: t.As[1], width: t.Ss[0], height: t.Ss[1], char0: t.Gt[0], char1: t.Gt[1], char2: t.Gt[2], r1: t.jt[0], g1: t.jt[1], b1: t.jt[2], a1: t.jt[3], r2: t.Qt[0], g2: t.Qt[1], b2: t.Qt[2], a2: t.Qt[3], invert: t.Es[0], flipX: t.Es[1], flipY: t.Es[2], charRot: t.Tt, translationX: ((c = t.ks) == null ? void 0 : c[0]) ?? 0, translationY: ((l = t.ks) == null ? void 0 : l[1]) ?? 0, translationZ: ((u = t.ks) == null ? void 0 : u[2]) ?? 0, rotationX: ((f = t.Ls) == null ? void 0 : f[0]) ?? 0, rotationY: ((d = t.Ls) == null ? void 0 : d[1]) ?? 0, rotationZ: ((g = t.Ls) == null ? void 0 : g[2]) ?? 0, curveParams0: e, curveParams1: i, depth: t.Is || 0, baseZ: t.Gs || 0, geometryType: t.js || 0 });
  }
  ne(t) {
    const e = this.pe.ne(t);
    return this.Ns.ee > this.ge.ee && this.ge.le(this.Ns.ee), e;
  }
  get _e() {
    return this.Ns.se;
  }
  get re() {
    return this.Ns.re;
  }
  ye() {
    this.Ns.Js();
  }
  de(t) {
    const e = this.Ns.se;
    if (e === 0) return;
    const i = this.Ns.te();
    this.ge.ue(i, e), this.ge.de(t);
  }
  ve(t) {
    this.ge.ve(t);
  }
  Ms(t, e) {
    const i = this.Ns.se;
    i !== 0 && this.A.drawArraysInstanced(t, 0, e, i);
  }
  Fs() {
    this.ge.Fs();
  }
}
class I {
  constructor(t, e, i, r) {
    a(this, "A");
    a(this, "Ae");
    a(this, "we");
    a(this, "be");
    a(this, "Ce", null);
    this.A = t, this.Ae = e, this.we = i, this.be = r;
    const s = this.A.createBuffer();
    Ft(this.A, this.A.ARRAY_BUFFER, s, this.be.xe, this.A.STATIC_DRAW), this.Ce = s;
  }
  get type() {
    return this.we;
  }
  get unitGeometry() {
    return this.be;
  }
  get unitBuffer() {
    return this.Ce;
  }
  get batch() {
    return this.Ae;
  }
  Me() {
    this.Ae.ye();
  }
  Fe() {
    return !this.Ae.re;
  }
  Fs() {
    this.Ae.Fs(), this.A.deleteBuffer(this.Ce);
  }
  $e(t, e, i) {
    return this.Ae.me(t);
  }
  Pe(t, e, i, r, s, h) {
    const o = s.Dt ?? 0, c = s.Ot ?? 0, l = s.Ht ?? 0, u = s.At ?? 0, f = s.wt ?? 0, d = s.bt ?? 0, g = [0, 0, 0, 0], v = [0, 0, 0, 0];
    h && (h.bezStartX !== void 0 && h.bezStartY !== void 0 && h.bezEndX !== void 0 && h.bezEndY !== void 0 ? (g[0] = h.cp1x ?? 0, g[1] = h.cp1y ?? 0, g[2] = h.cp2x ?? 0, g[3] = h.cp2y ?? 0, v[0] = h.bezStartX ?? 0, v[1] = h.bezStartY ?? 0, v[2] = h.bezEndX ?? 0, v[3] = h.bezEndY ?? 0) : h.arcStart === void 0 && h.arcStop === void 0 || (g[0] = h.arcStart ?? 0, g[1] = h.arcStop ?? 0));
    const p = { x: t, y: e, width: i, height: r, char0: s.Gt[0], char1: s.Gt[1], char2: s.Gt[2], r1: s.jt[0], g1: s.jt[1], b1: s.jt[2], a1: s.jt[3], r2: s.Qt[0], g2: s.Qt[1], b2: s.Qt[2], a2: s.Qt[3], invert: s.Pt ? 1 : 0, flipX: s.Bt ? 1 : 0, flipY: s.It ? 1 : 0, charRot: s.Tt, translationX: o, translationY: c, translationZ: l, rotationX: u, rotationY: f, rotationZ: d, curveParams0: g, curveParams1: v, depth: (h == null ? void 0 : h.depth) ?? 0, baseZ: (h == null ? void 0 : h.baseZ) ?? 0, geometryType: re[this.we] ?? 0 };
    return this.Ae.ne(p);
  }
}
const ce = { xe: dt, Te: 6, ...z }, le = { xe: new Float32Array([0, -0.5, 0, 0, 1, -0.5, 1, 0, 0, 0.5, 0, 1, 0, 0.5, 0, 1, 1, -0.5, 1, 0, 1, 0.5, 1, 1]), Te: 6, ...z }, ue = { xe: function(n = 32) {
  const t = [], e = 2 * Math.PI / n;
  for (let i = 0; i < n; i++) {
    const r = i * e, s = (i + 1) % n * e, h = Math.cos(r), o = Math.sin(r), c = 0.5 * (h + 1), l = 0.5 * (o + 1), u = Math.cos(s), f = Math.sin(s), d = 0.5 * (u + 1), g = 0.5 * (f + 1);
    t.push(0, 0, 0.5, 0.5, h, o, c, l, u, f, d, g);
  }
  return new Float32Array(t);
}(32), Te: 96, ...z };
let fe = { xe: function(n) {
  const t = [];
  for (let e = 0; e < n; e++) {
    const i = e / n, r = (e + 1) / n;
    t.push(i, 0, i, 0, i, 1, i, 1, r, 1, r, 1);
  }
  return new Float32Array(t);
}(32), Te: 96, ...z };
const de = { xe: new Float32Array([0, 0, 0, 0, 1, 0, 1, 0, 0.5, 1, 0.5, 1]), Te: 3, ...z }, ge = { xe: function(n = 16) {
  const t = [];
  for (let e = 0; e < n; e++) {
    const i = e / n, r = (e + 1) / n;
    t.push(i, -0.5, i, 0, r, -0.5, r, 0, i, 0.5, i, 1, i, 0.5, i, 1, r, -0.5, r, 0, r, 0.5, r, 1);
  }
  return new Float32Array(t);
}(16), Te: 96, ...z }, pe = { [x.RECTANGLE]: class extends I {
  constructor(n, t) {
    super(n, t, x.RECTANGLE, ce);
  }
  me(n, t) {
    return this.Pe(0, 0, n.width, n.height, t);
  }
}, [x.LINE]: class extends I {
  constructor(n, t) {
    super(n, t, x.LINE, le);
  }
  me(n, t) {
    const e = n.x2 - n.x1, i = n.y2 - n.y1, r = Math.hypot(e, i), s = Math.atan2(i, e), h = t.zt || 1, o = n.x1 + e / 2 - r / 2, c = n.y1 + i / 2, l = { ...t, bt: (t.bt || 0) + s };
    return this.Pe(o, c, r, h, l);
  }
}, [x.ELLIPSE]: class extends I {
  constructor(n, t) {
    super(n, t, x.ELLIPSE, ue);
  }
  me(n, t) {
    return this.Pe(0, 0, n.width, n.height, t);
  }
}, [x.ARC]: class extends I {
  constructor(n, t) {
    super(n, t, x.ARC, fe);
  }
  me(n, t) {
    const e = n.start * Math.PI / 180, i = n.stop * Math.PI / 180;
    return this.Pe(0, 0, n.width, n.height, t, { arcStart: e, arcStop: i });
  }
}, [x.TRIANGLE]: class extends I {
  constructor(n, t) {
    super(n, t, x.TRIANGLE, de);
  }
  me(n, t) {
    const e = Math.min(n.x1, n.x2, n.x3), i = Math.max(n.x1, n.x2, n.x3), r = Math.min(n.y1, n.y2, n.y3), s = i - e, h = Math.max(n.y1, n.y2, n.y3) - r;
    return this.Pe(e, r, s, h, t);
  }
}, [x.BEZIER_CURVE]: class extends I {
  constructor(n, t) {
    super(n, t, x.BEZIER_CURVE, ge);
  }
  me(n, t) {
    return this.Pe(0, 0, 1, t.zt || 1, t, { cp1x: n.cp1x, cp1y: n.cp1y, cp2x: n.cp2x, cp2y: n.cp2y, bezStartX: n.x1, bezStartY: n.y1, bezEndX: n.x2, bezEndY: n.y2 });
  }
} };
class ve {
  constructor(t) {
    a(this, "A");
    a(this, "Re");
    a(this, "Se");
    this.A = t, this.Se = new se(t), this.Re = /* @__PURE__ */ new Map();
    for (const e of Object.values(x)) {
      const i = new ae(t), r = new pe[e](t, i);
      this.Re.set(e, r);
    }
  }
  Ee(t) {
    this.ke(t).forEach((e) => {
      this.Le(e);
    });
  }
  ke(t) {
    const e = [];
    let i = null, r = null, s = null;
    for (const h of t) r !== h.material || s !== h.type ? (i && i.length > 0 && e.push({ material: r, type: s, commands: i }), i = [h], r = h.material, s = h.type) : i.push(h);
    return i && i.length > 0 && e.push({ material: r, type: s, commands: i }), e;
  }
  Le(t) {
    const { material: e, type: i, commands: r } = t, s = this.Re.get(i);
    e.shader.L(), e.shader.O(e.uniforms);
    const h = Ct(this.A), o = r.length > 0 && r[0].state.St;
    if (e.shader.O({ Uu: h[2] / h[3], Ur: [h[2], h[3]], Us: 1, Ut: o ? 1 : 0 }), s.Me(), r.forEach((c) => {
      s.me(c.params, c.state);
    }), s.Fe()) {
      const c = s.unitGeometry, l = s.unitBuffer;
      try {
        this.Se.Ps(e.shader.program, i + "", c, l), s.batch.de(e.shader), s.batch.Ms(c.gs, c.Te);
      } finally {
        s.batch.ve(e.shader), this.Se.Ts(), s.Me();
      }
    }
  }
  Fs() {
    for (const t of this.Re.values()) t.Fs();
    this.Re.clear(), this.Se.Fs();
  }
}
function Mt(n) {
  let t = 0;
  for (let e = 0; e < n.length; e++)
    t = (t << 5) - t + n.charCodeAt(e), t &= t;
  return t;
}
const wt = /* @__PURE__ */ new WeakMap();
let me = 1;
function bt(n) {
  if (n == null) return 0;
  if (typeof n != "object" && typeof n != "function") return Mt(n + "");
  let t = wt.get(n);
  return t || (t = me++, wt.set(n, t)), t;
}
function G(n, t) {
  return (n << 5) - n + t;
}
class Ae {
  constructor(t) {
    a(this, "ze", 0);
    a(this, "De");
    a(this, "Oe");
    a(this, "He", /* @__PURE__ */ new Map());
    this.De = new Q(t, rt, `#version 300 es
precision highp float;in vec3 v_glyphIndex;in vec4 v_glyphColor;in vec4 v_cellColor;in vec4 v_glyphFlags;layout(location=0)out vec4 o_character;layout(location=1)out vec4 o_primaryColor;layout(location=2)out vec4 o_secondaryColor;layout(location=3)out vec4 A;void main(){int B=int(v_glyphFlags.r>0.5?1:0);int C=int(v_glyphFlags.g>0.5?1:0);int D=int(v_glyphFlags.b>0.5?1:0);float E=float(B|(C<<1)|(D<<2))/255.;o_character=vec4(v_glyphIndex.xy,E,clamp(v_glyphFlags.a,0.,1.));o_primaryColor=vec4(v_glyphColor.rgb,v_glyphColor.a);o_secondaryColor=vec4(v_cellColor.rgb,v_cellColor.a);A=vec4(0.);}`), this.Oe = { id: this.ze++, shader: this.De, uniforms: Object.freeze({}), hash: this.Be(this.De, {}), isBuiltIn: !0 };
  }
  get Ie() {
    return this.Oe;
  }
  ft(t, e = {}, i = !1) {
    const r = this.Be(t, e), s = this.He.get(r);
    if (s) return s;
    const h = { id: this.ze++, shader: t, uniforms: Object.freeze({ ...e }), hash: r, isBuiltIn: i };
    return this.He.set(r, h), h;
  }
  Ge(t, e = {}) {
    return { id: this.ze++, shader: t, uniforms: Object.freeze({ ...e }), hash: 0, isBuiltIn: !1 };
  }
  Be(t, e) {
    const i = bt(t.program), r = function(s, h) {
      let o = 0;
      const c = Object.keys(s).sort();
      for (const l of c) o = G(o, Mt(l)), o = G(o, h(s[l]));
      return o;
    }(e, this.je.bind(this));
    return G(i, r);
  }
  je(t) {
    return typeof t == "number" || typeof t == "boolean" ? function(e) {
      return typeof e == "boolean" ? e ? 1 : 0 : Math.floor(e);
    }(t) : Array.isArray(t) ? function(e) {
      let i = 0;
      const r = Array.isArray(e[0]) ? e.flat() : e;
      for (const s of r) i = G(i, typeof s == "number" ? s : 0);
      return i;
    }(t) : t instanceof Float32Array || t instanceof Int32Array ? function(e) {
      let i = 0;
      const r = Math.min(e.length, 16);
      for (let s = 0; s < r; s++) i = G(i, e[s]);
      return i;
    }(t) : t instanceof WebGLTexture ? bt(t) : 0;
  }
  Fs() {
    this.De != this.De && this.De.dispose(), this.De.dispose(), this.He.clear();
  }
}
class ye {
  constructor() {
    a(this, "Qe", []);
    a(this, "Ne", 1);
    a(this, "Ss", 0);
  }
  Xe(t, e) {
    if (this.Ss >= this.Qe.length) {
      const r = { id: this.Ne++, type: t, params: {}, state: st.Lt(), material: e };
      this.Qe.push(r);
    }
    const i = this.Qe[this.Ss];
    return i.id = this.Ne++, i.type = t, i.material = e, this.Ss++, i;
  }
  Ye(t, e, i) {
    const r = this.Xe(x.RECTANGLE, i), s = r.params;
    return s.width = t.width, s.height = t.height, e.Yt(r.state), r.id;
  }
  Ke(t, e, i) {
    const r = this.Xe(x.LINE, i), s = r.params;
    return s.x1 = t.x1, s.y1 = t.y1, s.x2 = t.x2, s.y2 = t.y2, s.thickness = t.thickness, e.Yt(r.state), r.id;
  }
  We(t, e, i) {
    const r = this.Xe(x.ELLIPSE, i), s = r.params;
    return s.width = t.width, s.height = t.height, s.startAngle = t.startAngle, s.endAngle = t.endAngle, s.segments = t.segments, e.Yt(r.state), r.id;
  }
  Ze(t, e, i) {
    const r = this.Xe(x.ARC, i), s = r.params;
    return s.width = t.width, s.height = t.height, s.start = t.start, s.stop = t.stop, e.Yt(r.state), r.id;
  }
  qe(t, e, i) {
    const r = this.Xe(x.TRIANGLE, i), s = r.params;
    return s.x1 = t.x1, s.y1 = t.y1, s.x2 = t.x2, s.y2 = t.y2, s.x3 = t.x3, s.y3 = t.y3, e.Yt(r.state), r.id;
  }
  Ve(t, e, i) {
    const r = this.Xe(x.BEZIER_CURVE, i), s = r.params;
    return s.x1 = t.x1, s.y1 = t.y1, s.cp1x = t.cp1x, s.cp1y = t.cp1y, s.cp2x = t.cp2x, s.cp2y = t.cp2y, s.x2 = t.x2, s.y2 = t.y2, s.thickness = t.thickness, s.segments = t.segments, e.Yt(r.state), r.id;
  }
  ye() {
    this.Ss = 0;
  }
  [Symbol.iterator]() {
    let t = 0;
    const e = this.Ss, i = this.Qe;
    return { next: () => t < e ? { value: i[t++], done: !1 } : { value: void 0, done: !0 } };
  }
}
class we {
  constructor(t) {
    a(this, "A");
    a(this, "Je", null);
    a(this, "ti");
    a(this, "dt");
    a(this, "si");
    a(this, "ei");
    a(this, "ii");
    a(this, "ri", null);
    a(this, "ni", {});
    a(this, "oi", []);
    a(this, "hi", []);
    a(this, "ai", []);
    a(this, "ci", null);
    a(this, "li", [0, 0, 0, 0]);
    a(this, "ui", 1);
    this.A = t, t.enable(t.DEPTH_TEST), t.depthFunc(t.LEQUAL), t.clearDepth(1), t.depthMask(!0), t.disable(t.CULL_FACE), this.si = new st(), this.dt = new Ae(t), this.ei = new ye(), this.ti = new ve(t), this.ii = new ie(t);
    const e = [0, 0, t.canvas.width, t.canvas.height];
    ht(t, e), this.oi.push(null), this.hi.push(e), this.ai.push(1), this.ci = null, this.li = e, this.ui = 1;
  }
  it() {
    this.oi.push(this.ci), this.hi.push([...this.li]), this.ai.push(this.ui);
  }
  ct() {
    const t = this.oi.pop() ?? null, e = this.hi.pop() ?? [0, 0, this.A.canvas.width, this.A.canvas.height], i = this.ai.pop() ?? 1;
    this.rt(t, e[2], e[3], i);
  }
  rt(t, e, i, r = 1) {
    const s = this.A;
    this.ci !== t && (s.bindFramebuffer(s.FRAMEBUFFER, t), this.ci = t), this.ui = r;
    const h = [0, 0, e, i];
    this.li[0] === h[0] && this.li[1] === h[1] && this.li[2] === h[2] && this.li[3] === h[3] || (s.viewport(...h), ht(s, h), this.li = h);
  }
  fi(t) {
    this.Je !== t && (this.Je = t, t.L());
  }
  di(t, e) {
    return new Q(this.A, t, e);
  }
  pi(t) {
    this.ri = t, t && (this.ni = {});
  }
  H(t, e) {
    this.ni[t] = e;
  }
  gi(t) {
    Object.assign(this.ni, t);
  }
  mi(t) {
    return new Q(this.A, rt, t);
  }
  _i(t, e, i, r) {
    t instanceof X || !r || t.yi(r), this.ei.Ye({ width: e ?? t.width, height: i ?? t.height }, this.si, t.lt());
  }
  Ai(t, e, i, r) {
    this.ii.Ms(t, e, i, r);
  }
  wi(t, e) {
    if (this.ri) {
      const i = this.dt.Ge(this.ri, this.ni);
      this.ei.Ye({ width: t, height: e }, this.si, i), this.ri = null, this.ni = {};
    } else this.ei.Ye({ width: t, height: e }, this.si, this.dt.Ie);
  }
  bi(t, e, i, r) {
    this.ei.Ke({ x1: t, y1: e, x2: i, y2: r }, this.si, this.dt.Ie);
  }
  Ci(t, e) {
    this.ei.We({ width: t, height: e }, this.si, this.dt.Ie);
  }
  xi(t, e, i, r, s, h) {
    this.ei.qe({ x1: t, y1: e, x2: i, y2: r, x3: s, y3: h }, this.si, this.dt.Ie);
  }
  Mi(t, e, i, r, s, h, o, c) {
    this.ei.Ve({ x1: t, y1: e, cp1x: i, cp1y: r, cp2x: s, cp2y: h, x2: o, y2: c }, this.si, this.dt.Ie);
  }
  Fi(t, e, i, r) {
    this.ei.Ze({ width: t, height: e, start: i, stop: r }, this.si, this.dt.Ie);
  }
  $i(t, e, i = 1, r = {}) {
    return new X(this.A, t, e, i, r, this);
  }
  Pi(t, e = t, i = t, r = 255) {
    this.si.ds(t, e ?? t, i ?? t, r);
    const [s, h, o, c] = this.si.canvasBackgroundColor;
    this.Ti(s, h, o, c, !1);
  }
  ye(t = 0, e = 0, i = 0, r = 0) {
    this.Ti(t, e, i, r, !0);
  }
  Ti(t, e, i, r, s) {
    const h = this.A;
    if (this.ui > 1) {
      const o = s ? [1, 1, 0, 0] : [0, 0, 0, 0];
      h.clearBufferfv(h.COLOR, 0, new Float32Array(o)), h.clearBufferfv(h.COLOR, 1, new Float32Array([0, 0, 0, 0])), this.ui >= 3 && h.clearBufferfv(h.COLOR, 2, new Float32Array([t, e, i, r]));
      for (let c = 3; c < this.ui; c++) h.clearBufferfv(h.COLOR, c, new Float32Array([0, 0, 0, 0]));
    } else h.clearColor(t, e, i, r), h.clear(h.COLOR_BUFFER_BIT);
  }
  Ri() {
    const t = [0, 0, this.A.canvas.width, this.A.canvas.height];
    this.A.viewport(...t), ht(this.A, t), this.li = t, this.hi.length > 0 && (this.hi[0] = t);
  }
  ht() {
    const t = this.ei;
    this.ti.Ee(t), t.ye(), this.Je = null;
  }
  Fs() {
    this.dt.Fs(), this.ti.Fs(), this.ii.Fs();
  }
  get context() {
    return this.A;
  }
  get state() {
    return this.si;
  }
  get materialManager() {
    return this.dt;
  }
}
const R = { readShort: (n, t) => (R.t.uint16[0] = n[t] << 8 | n[t + 1], R.t.int16[0]), readUshort: (n, t) => n[t] << 8 | n[t + 1], readUshorts(n, t, e) {
  const i = [];
  for (let r = 0; r < e; r++) i.push(R.readUshort(n, t + 2 * r));
  return i;
}, readUint(n, t) {
  const e = R.t.uint8;
  return e[3] = n[t], e[2] = n[t + 1], e[1] = n[t + 2], e[0] = n[t + 3], R.t.uint32[0];
}, readASCII(n, t, e) {
  let i = "";
  for (let r = 0; r < e; r++) i += String.fromCharCode(n[t + r]);
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
function L(n, t, e) {
  n[t] = e >>> 24 & 255, n[t + 1] = e >>> 16 & 255, n[t + 2] = e >>> 8 & 255, n[t + 3] = 255 & e;
}
function be(n, t, e) {
  for (let i = 0; i < e.length; i++) n[t + i] = 255 & e.charCodeAt(i);
}
function ot(n, t, e) {
  const i = t + e;
  let r = 0;
  const s = R.t;
  for (let h = t; h < i; h += 4) s.uint8[3] = n[h] || 0, s.uint8[2] = n[h + 1] || 0, s.uint8[1] = n[h + 2] || 0, s.uint8[0] = n[h + 3] || 0, r = r + (s.uint32[0] >>> 0) >>> 0;
  return r >>> 0;
}
class xe {
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
function j(n) {
  let t = 32, e = 0;
  for (const o of n) o && (o < t && (t = o), o > e && (e = o));
  if (e === 0) return { min: 0, max: 0, table: /* @__PURE__ */ new Map() };
  const i = new Uint32Array(e + 1);
  for (const o of n) o && i[o]++;
  const r = new Uint32Array(e + 1);
  let s = 0;
  i[0] = 0;
  for (let o = 1; o <= e; o++) s = s + i[o - 1] << 1, r[o] = s;
  const h = /* @__PURE__ */ new Map();
  for (let o = 0; o < n.length; o++) {
    const c = n[o];
    if (!c) continue;
    const l = r[c]++;
    let u = h.get(c);
    u || (u = [], h.set(c, u)), u[Ee(l, c)] = o;
  }
  return { min: t, max: e, table: h };
}
function at(n, t) {
  let e = 0;
  for (let i = 1; i <= t.max; i++) {
    e |= n.readBits(1) << i - 1;
    const r = t.table.get(i);
    if (r && e < r.length) {
      const s = r[e];
      if (s !== void 0) return s;
    }
  }
  throw Error("Invalid Huffman code");
}
function Ee(n, t) {
  let e = 0;
  for (let i = 0; i < t; i++) e = e << 1 | 1 & n, n >>>= 1;
  return e >>> 0;
}
function Te(n) {
  if (n.length < 2) throw Error("ZLIB data too short");
  const t = n[0], e = n[1];
  if ((15 & t) != 8) throw Error("Unsupported ZLIB compression method");
  if (((t << 8) + e) % 31 != 0) throw Error("Bad ZLIB header check");
  let i = 2;
  32 & e && (i += 4);
  const r = [];
  return function(s, h) {
    const o = [3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258], c = [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0], l = [1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577], u = [0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13];
    let f = 0;
    for (; !f; ) {
      f = s.readBits(1);
      const d = s.readBits(2);
      if (d === 0) {
        s.alignToByte();
        const g = s.readBits(16);
        if ((65535 & (65535 ^ g)) !== s.readBits(16)) throw Error("DEFLATE uncompressed LEN/NLEN mismatch");
        for (let v = 0; v < g; v++) h.push(s.readBits(8));
      } else {
        if (d !== 1 && d !== 2) throw Error("Unsupported DEFLATE type");
        {
          let g, v;
          if (d === 1) {
            const p = Array(288).fill(0);
            for (let m = 0; m <= 143; m++) p[m] = 8;
            for (let m = 144; m <= 255; m++) p[m] = 9;
            for (let m = 256; m <= 279; m++) p[m] = 7;
            for (let m = 280; m <= 287; m++) p[m] = 8;
            g = j(p), v = j(Array(32).fill(5));
          } else {
            const p = s.readBits(5) + 257, m = s.readBits(5) + 1, A = s.readBits(4) + 4, w = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15], y = Array(19).fill(0);
            for (let T = 0; T < A; T++) y[w[T]] = s.readBits(3);
            const E = j(y), b = [];
            for (; b.length < p + m; ) {
              const T = at(s, E);
              if (T <= 15) b.push(T);
              else if (T === 16) {
                const _ = s.readBits(2) + 3, P = b[b.length - 1] || 0;
                for (let V = 0; V < _; V++) b.push(P);
              } else if (T === 17) {
                const _ = s.readBits(3) + 3;
                for (let P = 0; P < _; P++) b.push(0);
              } else {
                if (T !== 18) throw Error("Invalid code length symbol");
                {
                  const _ = s.readBits(7) + 11;
                  for (let P = 0; P < _; P++) b.push(0);
                }
              }
            }
            const F = b.slice(0, p), M = b.slice(p, p + m);
            g = j(F), v = j(M);
          }
          for (; ; ) {
            const p = at(s, g);
            if (p < 256) h.push(p);
            else {
              if (p === 256) break;
              if (p > 256 && p < 286) {
                const m = p - 257;
                let A = o[m];
                const w = c[m];
                w && (A += s.readBits(w));
                const y = at(s, v);
                if (y >= 30) throw Error("Invalid distance symbol");
                let E = l[y];
                const b = u[y];
                b && (E += s.readBits(b));
                const F = h.length - E;
                if (F < 0) throw Error("Invalid distance");
                for (let M = 0; M < A; M++) h.push(h[F + M] || 0);
              } else if (p === 286 || p === 287) throw Error("Reserved length symbol");
            }
          }
        }
      }
    }
  }(new xe(n.subarray(i)), r), new Uint8Array(r);
}
function Re(n) {
  const t = R, e = new Uint8Array(n);
  if (t.readASCII(e, 0, 4) !== "wOFF") throw Error("Invalid WOFF signature");
  const i = t.readUint(e, 4), r = t.readUshort(e, 12), s = t.readUint(e, 16), h = [];
  let o = 44;
  for (let A = 0; A < r; A++) {
    const w = t.readASCII(e, o, 4), y = t.readUint(e, o + 4), E = t.readUint(e, o + 8), b = t.readUint(e, o + 12), F = t.readUint(e, o + 16);
    h.push({ tag: w, offset: y, compLength: E, origLength: b, checksum: F }), o += 20;
  }
  for (const A of h) {
    const w = new Uint8Array(e.buffer, A.offset, A.compLength);
    if (A.compLength === A.origLength) A.data = new Uint8Array(w);
    else if (A.data = Te(w), A.data.length !== A.origLength) if (A.data.length < A.origLength) {
      const y = new Uint8Array(A.origLength);
      y.set(A.data), A.data = y;
    } else A.data = A.data.subarray(0, A.origLength);
  }
  const c = r;
  let l = 1, u = 0;
  for (; l << 1 <= c; ) l <<= 1, u++;
  const f = 16 * l, d = 16 * c - f;
  let g = 12 + 16 * c;
  const v = {};
  for (const A of h) v[A.tag] = g, g = q(g + A.data.length);
  const p = new Uint8Array(Math.max(s || 0, g));
  L(p, 0, i), J(p, 4, c), J(p, 6, f), J(p, 8, u), J(p, 10, d);
  let m = 12;
  for (const A of h) {
    be(p, m, A.tag), m += 4;
    let w = A.data;
    if (A.tag === "head" && w.length >= 12) {
      const y = new Uint8Array(w);
      L(y, 8, 0), L(p, m, ot(y, 0, q(y.length))), m += 4;
    } else
      L(p, m, ot(w, 0, q(w.length))), m += 4;
    L(p, m, v[A.tag]), m += 4, L(p, m, A.data.length), m += 4;
  }
  for (const A of h) {
    const w = v[A.tag];
    p.set(A.data, w);
  }
  if (h.find((A) => A.tag === "head")) {
    const A = v.head, w = function(y, E) {
      const b = E + 8, F = [y[b], y[b + 1], y[b + 2], y[b + 3]];
      L(y, b, 0);
      const M = 2981146554 - (ot(y, 0, q(y.length)) >>> 0) >>> 0;
      return y[b] = F[0], y[b + 1] = F[1], y[b + 2] = F[2], y[b + 3] = F[3], M >>> 0;
    }(p, A);
    L(p, A + 8, w);
  }
  return p.buffer;
}
const Fe = { parseTab(n, t, e) {
  const i = { tables: [], ids: {}, off: t };
  n = new Uint8Array(n.buffer, t, e), t = 0;
  const r = R, s = r.readUshort;
  s(n, t);
  const h = s(n, t += 2);
  t += 2;
  const o = [];
  for (let c = 0; c < h; c++) {
    const l = s(n, t), u = s(n, t += 2);
    t += 2;
    const f = r.readUint(n, t);
    t += 4;
    const d = `p${l}e${u}`;
    let g = o.indexOf(f);
    if (g === -1) {
      let v;
      g = i.tables.length, o.push(f);
      const p = s(n, f);
      v = p === 4 ? this.parse4(n, f) : p === 12 ? this.parse12(n, f) : { format: p }, i.tables.push(v);
    }
    i.ids[d] = g;
  }
  return i;
}, parse4(n, t) {
  const e = R, i = e.readUshort, r = e.readUshorts, s = t, h = i(n, t += 2);
  i(n, t += 2);
  const o = i(n, t += 2) >>> 1, c = { format: 4, searchRange: i(n, t += 2), entrySelector: 0, rangeShift: 0, endCount: [], startCount: [], idDelta: [], idRangeOffset: [], glyphIdArray: [] };
  t += 2, c.entrySelector = i(n, t), t += 2, c.rangeShift = i(n, t), t += 2, c.endCount = r(n, t, o), t += 2 * o, t += 2, c.startCount = r(n, t, o), t += 2 * o;
  for (let l = 0; l < o; l++) c.idDelta.push(e.readShort(n, t)), t += 2;
  return c.idRangeOffset = r(n, t, o), t += 2 * o, c.glyphIdArray = r(n, t, s + h - t >> 1), c;
}, parse12(n, t) {
  const e = R.readUint;
  e(n, t += 4), e(n, t += 4);
  const i = e(n, t += 4);
  t += 4;
  const r = new Uint32Array(3 * i);
  for (let s = 0; s < 3 * i; s += 3) r[s] = e(n, t + (s << 2)), r[s + 1] = e(n, t + (s << 2) + 4), r[s + 2] = e(n, t + (s << 2) + 8);
  return { format: 12, groups: r };
} }, Pe = { parseTab(n, t, e) {
  const i = R;
  t += 18;
  const r = i.readUshort(n, t);
  t += 2, t += 16;
  const s = i.readShort(n, t);
  t += 2;
  const h = i.readShort(n, t);
  t += 2;
  const o = i.readShort(n, t);
  t += 2;
  const c = i.readShort(n, t);
  return t += 2, t += 6, { unitsPerEm: r, xMin: s, yMin: h, xMax: o, yMax: c, indexToLocFormat: i.readShort(n, t) };
} }, Ce = { parseTab(n, t, e) {
  const i = R;
  t += 4;
  const r = ["ascender", "descender", "lineGap", "advanceWidthMax", "minLeftSideBearing", "minRightSideBearing", "xMaxExtent", "caretSlopeRise", "caretSlopeRun", "caretOffset", "res0", "res1", "res2", "res3", "metricDataFormat", "numberOfHMetrics"], s = {};
  for (let h = 0; h < r.length; h++) {
    const o = r[h], c = o === "advanceWidthMax" || o === "numberOfHMetrics" ? i.readUshort : i.readShort;
    s[o] = c(n, t + 2 * h);
  }
  return s;
} }, Me = { parseTab(n, t, e, i) {
  const r = R, s = [], h = [], o = i.maxp.numGlyphs, c = i.hhea.numberOfHMetrics;
  let l = 0, u = 0, f = 0;
  for (; f < c; ) l = r.readUshort(n, t + (f << 2)), u = r.readShort(n, t + (f << 2) + 2), s.push(l), h.push(u), f++;
  for (; f < o; ) s.push(l), h.push(u), f++;
  return { aWidth: s, lsBearing: h };
} }, xt = { cmap: Fe, head: Pe, hhea: Ce, maxp: { parseTab(n, t, e) {
  const i = R;
  return i.readUint(n, t), t += 4, { numGlyphs: i.readUshort(n, t) };
} }, hmtx: Me, loca: { parseTab(n, t, e, i) {
  const r = R, s = [], h = i.head.indexToLocFormat, o = i.maxp.numGlyphs + 1;
  if (h === 0) for (let c = 0; c < o; c++) s.push(r.readUshort(n, t + (c << 1)) << 1);
  else if (h === 1) for (let c = 0; c < o; c++) s.push(r.readUint(n, t + (c << 2)));
  return s;
} }, glyf: { parseTab(n, t, e, i) {
  const r = [], s = i.maxp.numGlyphs;
  for (let h = 0; h < s; h++) r.push(null);
  return r;
}, Si(n, t) {
  const e = R, i = n.Ei, r = n.loca;
  if (r[t] === r[t + 1]) return null;
  const s = Z.findTable(i, "glyf", n.ki);
  if (!s) return null;
  let h = s[0] + r[t];
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
        const v = i[h];
        h++;
        for (let p = 0; p < v; p++) o.flags.push(g), d++;
      }
    }
    o.xs = [];
    for (let d = 0; d < l; d++) {
      const g = o.flags[d], v = !!(16 & g);
      2 & g ? (o.xs.push(v ? i[h] : -i[h]), h++) : v ? o.xs.push(0) : (o.xs.push(e.readShort(i, h)), h += 2);
    }
    o.ys = [];
    for (let d = 0; d < l; d++) {
      const g = o.flags[d], v = !!(32 & g);
      4 & g ? (o.ys.push(v ? i[h] : -i[h]), h++) : v ? o.ys.push(0) : (o.ys.push(e.readShort(i, h)), h += 2);
    }
    let u = 0, f = 0;
    for (let d = 0; d < l; d++) u += o.xs[d], f += o.ys[d], o.xs[d] = u, o.ys[d] = f;
  } else o.parts = [], o.endPts = [], o.flags = [], o.xs = [], o.ys = [];
  return o;
} } }, Z = { parse(n) {
  const t = new Uint8Array(n);
  R.readASCII(t, 0, 4) === "wOFF" && (n = Re(n));
  const e = new Uint8Array(n), i = xt, r = {}, s = { Ei: e, Li: 0, ki: 0 };
  for (const h in i) {
    const o = h, c = Z.findTable(e, o, 0);
    if (c) {
      const [l, u] = c;
      let f = r[l];
      f == null && (f = i[o].parseTab(e, l, u, s), r[l] = f), s[o] = f;
    }
  }
  return [s];
}, findTable(n, t, e) {
  const i = R, r = i.readUshort(n, e + 4);
  let s = e + 12;
  for (let h = 0; h < r; h++) {
    const o = i.readASCII(n, s, 4);
    i.readUint(n, s + 4);
    const c = i.readUint(n, s + 8), l = i.readUint(n, s + 12);
    if (o === t) return [c, l];
    s += 16;
  }
  return null;
}, T: xt, B: R };
class Se {
  zi(t) {
    var i;
    const e = [];
    return (i = t.cmap) != null && i.tables ? (t.cmap.tables.forEach((r) => {
      if (r.format === 4) {
        const s = this.Di(r);
        e.push(...s);
      } else if (r.format === 12) {
        const s = this.Oi(r);
        e.push(...s);
      }
    }), [...new Set(e)]) : [];
  }
  Di(t) {
    const e = [];
    if (!(t.startCount && t.endCount && t.idRangeOffset && t.idDelta)) return e;
    for (let i = 0; i < t.startCount.length; i++) {
      const r = t.startCount[i], s = t.endCount[i];
      if (r !== 65535 || s !== 65535) {
        for (let h = r; h <= s; h++)
          if (this.Hi(t, h, i) > 0) try {
            const o = String.fromCodePoint(h);
            e.push(o);
          } catch {
          }
      }
    }
    return e;
  }
  Oi(t) {
    const e = [];
    if (!t.groups) return e;
    for (let i = 0; i < t.groups.length; i += 3) {
      const r = t.groups[i], s = t.groups[i + 1], h = t.groups[i + 2];
      for (let o = r; o <= s; o++)
        if (h + (o - r) > 0) try {
          const c = String.fromCodePoint(o);
          e.push(c);
        } catch {
        }
    }
    return e;
  }
  Hi(t, e, i) {
    if (t.idRangeOffset[i] === 0) return e + t.idDelta[i] & 65535;
    {
      const r = t.idRangeOffset[i] / 2 + (e - t.startCount[i]) - (t.startCount.length - i);
      if (r >= 0 && t.glyphIdArray && r < t.glyphIdArray.length) {
        const s = t.glyphIdArray[r];
        if (s !== 0) return s + t.idDelta[i] & 65535;
      }
    }
    return 0;
  }
}
class Ue {
  constructor(t) {
    a(this, "Bi");
    a(this, "Ii");
    a(this, "W");
    this.W = t, this.Bi = document.createElement("canvas"), this.Ii = this.Bi.getContext("2d", { willReadFrequently: !0, alpha: !0 });
  }
  Gi(t, e, i, r) {
    const s = t.length, h = Math.ceil(Math.sqrt(s)), o = Math.ceil(s / h), c = e.width * h, l = e.height * o;
    this.ji(c, l), this.Qi(t, e, h, i, r);
    const u = this.W.$i(c, l, 1, { filter: "nearest" });
    return u.et(this.Bi), { framebuffer: u, columns: h, rows: o };
  }
  ji(t, e) {
    this.Bi.width = t, this.Bi.height = e, this.Bi.style.width = t + "px", this.Bi.style.height = e + "px", this.Ii.imageSmoothingEnabled = !1, this.Bi.style.imageRendering = "pixelated", this.Ii.clearRect(0, 0, t, e), this.Ii.textBaseline = "top", this.Ii.textAlign = "left", this.Ii.fillStyle = "white";
  }
  Qi(t, e, i, r, s) {
    const h = r / s.head.unitsPerEm;
    for (let o = 0; o < t.length; o++) {
      const c = o % i, l = Math.floor(o / i), u = t[o].glyphData;
      if (!u) continue;
      const f = u.advanceWidth * h, d = c * e.width, g = l * e.height, v = d + 0.5 * e.width, p = g + 0.5 * e.height, m = Math.round(v - 0.5 * e.width), A = Math.round(p - 0.5 * r), w = m + 0.5 * (e.width - f), y = A + s.hhea.ascender * h;
      this.Ni(u, w, y, h);
    }
  }
  Ni(t, e, i, r) {
    if (!t || !t.xs || t.noc === 0) return;
    let { xs: s, ys: h, endPts: o, flags: c } = t;
    if (!(s && h && o && c)) return;
    this.Ii.beginPath();
    let l = 0;
    for (let u = 0; u < o.length; u++) {
      const f = o[u];
      if (!(f < l)) {
        if (f >= l) {
          const d = e + s[l] * r, g = i - h[l] * r;
          this.Ii.moveTo(d, g);
          let v = l + 1;
          for (; v <= f; )
            if (1 & c[v]) {
              const p = e + s[v] * r, m = i - h[v] * r;
              this.Ii.lineTo(p, m), v++;
            } else {
              const p = e + s[v] * r, m = i - h[v] * r;
              if (v + 1 > f) {
                const w = e + s[l] * r, y = i - h[l] * r;
                if (1 & c[l]) this.Ii.quadraticCurveTo(p, m, w, y);
                else {
                  const E = (p + w) / 2, b = (m + y) / 2;
                  this.Ii.quadraticCurveTo(p, m, E, b);
                }
                break;
              }
              const A = v + 1;
              if (1 & c[A]) {
                const w = e + s[A] * r, y = i - h[A] * r;
                this.Ii.quadraticCurveTo(p, m, w, y), v = A + 1;
              } else {
                const w = (p + (e + s[A] * r)) / 2, y = (m + (i - h[A] * r)) / 2;
                this.Ii.quadraticCurveTo(p, m, w, y), v = A;
              }
            }
          this.Ii.closePath();
        }
        l = f + 1;
      }
    }
    this.Ii.fill();
  }
}
class St {
  Xi(t, e) {
    const i = t.cmap;
    if (!i || !i.tables) return 0;
    let r = 0;
    for (const s of i.tables) if (s.format === 4 ? r = this.Yi(e, s) : s.format === 12 && (r = this.Ki(e, s)), r > 0) break;
    return r;
  }
  Wi(t, e) {
    const i = e.codePointAt(0);
    return i === void 0 ? 0 : this.Xi(t, i);
  }
  Zi(t, e) {
    const i = t.hmtx;
    return i && i.aWidth && i.aWidth.length !== 0 ? e < i.aWidth.length ? i.aWidth[e] : i.aWidth[i.aWidth.length - 1] : 0;
  }
  qi(t, e) {
    const i = e / t.head.unitsPerEm, r = t.hhea.ascender * i, s = t.hhea.descender * i, h = t.hhea.lineGap * i;
    return { ascender: r, descender: s, lineGap: h, lineHeight: r - s + h, unitsPerEm: t.head.unitsPerEm, scale: i };
  }
  Yi(t, e) {
    const i = e.endCount.length;
    let r = -1;
    for (let s = 0; s < i; s++) if (t <= e.endCount[s]) {
      r = s;
      break;
    }
    if (r === -1 || t < e.startCount[r]) return 0;
    if (e.idRangeOffset[r] === 0) return t + e.idDelta[r] & 65535;
    {
      const s = e.idRangeOffset[r] / 2 + (t - e.startCount[r]) - (i - r);
      if (s >= 0 && s < e.glyphIdArray.length) {
        const h = e.glyphIdArray[s];
        return h === 0 ? 0 : h + e.idDelta[r] & 65535;
      }
    }
    return 0;
  }
  Ki(t, e) {
    const i = e.groups.length / 3;
    for (let r = 0; r < i; r++) {
      const s = e.groups[3 * r], h = e.groups[3 * r + 1], o = e.groups[3 * r + 2];
      if (t >= s && t <= h) return o + (t - s);
    }
    return 0;
  }
}
class _e {
  constructor() {
    a(this, "Vi");
    this.Vi = new St();
  }
  Ji(t, e, i) {
    let r = 0;
    const s = this.Vi.qi(i, e), h = s.lineHeight;
    for (const o of t) {
      const c = this.Vi.Wi(i, o);
      if (c === 0) continue;
      const l = this.Vi.Zi(i, c) * s.scale;
      r = Math.max(r, l);
    }
    return { width: Math.ceil(r), height: Math.ceil(h) };
  }
}
class Oe {
  constructor() {
    a(this, "tr");
    this.tr = new St();
  }
  sr(t, e) {
    const i = [], r = /* @__PURE__ */ new Map();
    return t.forEach((s, h) => {
      const o = s.codePointAt(0) || 0, c = { character: s, unicode: o, color: this.er(h), glyphData: this.ir(e, s) };
      i.push(c), r.set(s, c);
    }), { array: i, map: r };
  }
  er(t) {
    return [t % 256 / 255, Math.floor(t / 256) % 256 / 255, 0];
  }
  ir(t, e) {
    const i = e.codePointAt(0) || 0, r = this.tr.Xi(t, i);
    if (r === 0) return null;
    let s = 0;
    t.hmtx && t.hmtx.aWidth && r > 0 && t.hmtx.aWidth[r] !== void 0 && (s = t.hmtx.aWidth[r]);
    const h = Z.T.glyf.Si(t, r);
    return h ? { ...h, advanceWidth: s } : null;
  }
}
class et {
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
    a(this, "yr", !1);
    this.cr = e, this.pr = new Se(), this.gr = new Ue(t), this.mr = new _e(), this._r = new Oe();
  }
  async Ar(t) {
    if (this.yr) return;
    let e;
    if (t) {
      const i = await fetch(t);
      if (!i.ok) throw new U(`Failed to load font file: ${i.status} ${i.statusText}`);
      e = await i.arrayBuffer();
    } else
      e = await (await fetch("data:font/woff;base64,d09GRgABAAAAABbwAAoAAAAAfywAAQABAAAAAAAAAAAAAAAAAAAAAAAAAABjbWFwAAAA9AAAAbsAAAkgIO8lSWdseWYAAAKwAAAOfgAAaLS4ctN0aGVhZAAAETAAAAAsAAAAOCi8/PVoaGVhAAARXAAAABkAAAAkCwEFAmhtdHgAABF4AAAAhQAABAQEAIOAbG9jYQAAEgAAAAKUAAAECAAy54BtYXhwAAAUlAAAABgAAAAgASIAgm5hbWUAABSsAAAB5wAAA6RWz85KT1MvMgAAFpQAAABFAAAAYM+QEyRwb3N0AAAW3AAAABQAAAAgAGkANHja7dRPSFRRFMfx38wdXblw4cJC7M0bz60gWlULGUFctWgR0UIQQkmDyn27kpAQaaEO2jhWJuafiQFtcDJtSqGhiFZtot5x3jzEVQQhlRJcOb0khiRc1+J94R64uw8cOADCAJT/avwZAiIpRCK3/P999KAS9biOSUxhBhlksYjnWMFrvME7vMca1vEF37ANAwkNqYRKqkk1rdLqscqpVVVQryzbils3rJnocHTWPmgfso/ap+0OuysWjlXHogQKUxVVUw3VUh010DE6QXHqph7qpT66TQmaoAxlaZnyVKC39FHHdbNu0e36or6kr4r4TgsTu75HmEcOy76vUPaVsIFNbOHHX74F3/fyD9+A7ztg1//2de76rH18Z8u+AXqwx/dBN5Z9XfqKiKzLqqzIC8nLkixKThZkXuZkVh7KuNyTuzImKRmVO1KxU7ETMtvmu/lqPptPxjOuKXo3vcveYQ+l2lKlO+Im3H632z3vnis+KaaLKc7zM87yHGc4zdM8zkke5H6+xp3cwRe4jVv5DLdwE5/ik3ycj3Cdk3eWnKfOmDPqJJ3hX9sOCvpPC65QcIWCgv5pPwGY9ak7AHja3V07ryQ5FT62axjQaDWsVmiCFQJpA4QINiAgICDYgICAgICAgICAgICAgIAA//AuF9Xlsn2etqv67iIY6apv3+6yj31e33nYA95FiD4uAAHeA7jyLzoA2Paf/Lp/Dun5W8x/Be/AxyCfO79fnj+e25/ZZzlewcM+3wIhwpfwE/Sc9e8YDyLU1ycF5XUD+to+L98O/An8VKQj0lnOtYdM776OJ71fTVC8//N1rLKDGsXl863OjSl5/iyIUu0HjJ+d+uO3rX3rXd33d/DjfR0/h6/n1iK5kWf36Hf2AxpVa6zU7ZLTnt3Q3wN7+tK6MVcBjUP/3vj56diHuT3YxVbKSvl9FdJHeFE4jfmJn2DSSOS9fuJ27SH7umuoL3oLWGOLxh3f2b8bnn/5Ql8n5SEYFD33q/0lKXxwjQfDOZtGgyEz+W8X5txl2zVb9MXO2S8HfD3ncbHousP6WPV2i/R7C+c06HK5ye/lfdl3Bj5Q2qitaLYhgLQWZY+fr/65A9Ly1r10jI783HOffJWZJ6ee8uuB0nmMXeSqWvRz5Dx/tiWf7H0OF+1DuK7vhy4ffP8An/doofqbQNXTqmlNT1c0v4/Eqpy29eBMLHty0PKZoCMW6VqRlDXNwvbD4RW2MYfyjNdXV3LaJuEdKgXcHvX2nHiz27RxHmC9w/qn0AbS+mJbSeX8pO1zlbbogPK7zJxAs3iFtrV8W/LHsHVZvxJ6Rlt7gum1nvjpnHNO4gFJqaoBWOKFVwKqAangorb2j5KKvG5N31O1ownZdhcZH7FuT9nznoxRv4ylrbfvzA9D88GO8uGDtgN0/1O09ntFlv3YhbIf/ml3/dPGqvi6rCMw6jNd53PM07BnK2eCJXmnzxrruI8ObOuxmZ/dxbd5nS77U7I/xaMdLm5/DXzuLLcwXlOLIVQ0an722pou6raGnpp/QYiwR0V5nwDL0Gk/f2TSUalIGOkSvfNAcVNCesV9a2q675FtsVAk4c5GPEfZT27XVqT9PmpxXtVn0577KO3MGrkXs+xKkHZk6EMUS440uO01t+Ark8yGYYjtsleqoPQksLuF0kOd/7TtbZ3XvNalNRNLqK+90fEDTAfy1FWWOBcT9fkTmrExe+viDNccYF+JqHeIbyBtlYxhStbmSc8DSX9/rICoXkkGSMfEJR7QsYAjNlhgn6iNS7T0AtakNnvaJ+W1TeQdeIxHaHtXaMtU+GP3CL5v+2RqHfc5JC6k9DJ6HhFaHHfu9Lc1Z5HlB5JWNOc8NupiUSlpa/7NIx0W0Ra10YcOVWnDfqhodmgI1CM5nrJS1DYKlMmyeAmoZaLrQnmNSRxAV7qZ0u0sr2Q8WbzUrRivE200nZ+x371Yj+idQH+bsOAFD16woZXuheBJI85UYyA+Ht17bJsTKLHHG+tuQpJX/AGX4eu2lq+vh8gQPgaLUpk1h7fcb1SJ4LEnGb+rdUHRHw96riVV36L5EgdqHNByqCTy82hnkrSSk3k5KTNWnJZ/buTlOvQngiceAkd4OHPz0K+tdOmGUYwJht2kcuBEntSRPOmZfyc40tFqD40IQeb2goGZvKIVzW4G5DMcQ4qOY3zVRzpmo1sMg+U1VemumtLofjFeCcxqJIUnM2vJuQeCHiOOwx4ss7pF6u+PtXxmZApbjCti22JtA+hVxUw7z6Xs2sSzMkeklSLPfwalYkjjt/0bHye4gKkXeaig5MpILVRiAd1vCrtP5Aj5uaN2PF1zxrE7koOgaY2PPL9FkccCKlprUZGr+zr0tw56iCvwGBTs+MFFxVbWeTaCQTj2WCBM1NnoWNxOBpBZU8f00hPsFDr+15wPevNsJG4IN+OGwKyWzKnW8S/GDUHZOd+44SsvbDvCuhYUTQSaQSFeWtoR4Xc833VimVzRvgm58QwZFQTthQ+awgQTeuVI7gLrF638Yixi+ot4RVZ5niDPFxBediyXNj++jUWDgkU3Zc96fDKwv4iiylyA4nalMkLX9C1hf24DNNkZyNDkflOPF4BqwdYbv1vLG9VX03W96PVKiCq+A01i5utY2d9YfSMP0qvQ7eFQUHSKvNfpCl21nqNafqf1UQksqfVe1PEPPNiJpY81iZoP119ZTUHojdpseMYqec5zr/2Jgo695rmycZWzSgOpXzMpbFrHu1Zmq/xA8pX3cgEQZU1/YzaexuQbXIoxF9THdaEzz9VaE5fgNVIPR/sIS8fQyipam9JXqHdOtPEIRllqzP7Ewh9063Z2IYH+GiLNUPFXJIcEM4RYc7bEkjwQL4/1fx+aHL8/62Of5vo3y+p92QX2fh18zrNFcPX9sfZAdBDZu8vxCM4clX31Qr9RrLPkDDDau8v8LZRar2N8lSOj1NGsLJeBZam1TIuwpzwepL3CJAvyANsPnj3BAzsD3a5X6ydEaZUSs50b7g2JrYcyG2lRL+xl+jD+Gfod33w82P0FTuYREa3c70CRS82XCtxIueJHXuIMB6tMt+x7lf7m5U4tyK9L3smuLrxqDxYPI30rYzk2h2NzgPXqAvPrQdqUxvdWF2zVwDrHCq0RoI0Hcrzcn9D8BMxYEMszZBzooqa/jsTxSeTthXTm9FC2n+pYEh8uVqyL9436quMD6pnK7njZM6msy4uYsunVquBSi4clVn8gblYc96TFyF04ll2oqCB300cDIbPxrZoqXZ1DHWvNh2irrNxstSaZYa2VB333tOr9mRcx7ETmXKmSFz6GkidstKjZFE8qIX26eG8KoS/b9uij9GFOiwFIVj5NyErT8rZGstdmD4lc4/xaNevd1uwOPCLX7Ems2TTc81MrUVmzyqdOr1v1PCPat9jmQfUYJEEbzNCSse4DevSYCIXal+bDCC3I2+EeTFKd7ltnFNN0sGLIfRcGfSWKD0BPANWTQIqcNtsaAON/1A/BeywPGhybs2ZEA1sH9FbgDMpTQx5L5k4fN/RR8lBHvif2ftB7oa8isVdrdWDxp/Hp6N8MsdUgqdS0M12EZrhC7TpJZZLZOZelRdeDUyffq3s6xPhztK4Xd9h6f4pIieNu4lI/jEN1XEMjbafK6lry/jkOYedyVMyp2vaHGlM8zBjCkdi28NdrNldgLa/a0orYtN6OwoMh7vPAsxb9eNTDrOdJBWuXsb6En8Evb5yTrJw1Y1XTHnmCFNtPkhHnuN+8QwHGi3JUJf4zeaTJsBpFdnik5V4fZq510ifEHMf7M55f2fteR1DJ73gzf4vyO42Or3Z5mZcWdlY6wb3sRvd0olKfGeaCWm5yGEtDwzLH6yPS95wmcVb2BBrYzig5tGb7Bvb5fkyfvW2nRhlxF3cyz8qGOF//eVLXq7P4oQTop9UASTKPr91h1zu5wu753DbqtXUO8pOT6wzdnQfWn2X3Csr5ktxP4FUmlBHHPThBO0mQ6wTFVxbM5mPCeXWP7ha4YDf8BdvAeaGd/XntlgHlW2eMFAR2CBPYAQzPrGeVy1ieYCOQdtpXGZyss4F2rkr5W8tJh06NTd/HGi+1vbiPN6JTeSfP5k0ihAhRQwgad9wQ1dhoKAntU87DfZy/K8SuEsPg82VQRU5xUGU+ZVrp8SMYtOHiwFC+Z1jLG2dqRuhAw01cZ2qeXBk/ROjaAS1TIuKHVp+Fi5YMrHqqahlY3YbJ0E/N2uUTq/0Cvt717Vfwa/gNfAO/hd/B7+EP8Ef4E/wZ/gJ/hb/B3+Ef8E/4F/z7nla+5T+Afp1wHdQRH/F/+/lF6VrSbuP4v/18VHMVmm7q6TX/Czha0mxJrf+YyNyOfRcYeKSap3+b8UufB8GnJSdec6Iu+toF6nHkaeZxvJ5h4PVgj3ILMz5teArdxnr8/PPoCXqiuvR91zoh2pvS8b0SqUD1FLPubHPaK9Q5lU+GzwI3PgfCOsB9NORgqm5OqfVxLMd1L9+A/s2s+0/0a93MTd3NNRHapruGQLnhZTSzpBMuYFNaz7N5RffPo/MnV2zac3wfRX6Vng0As1cTmE5M38U0eS+H0rvZxXtg6460jlQTZ3Snxw+pO9TKz+mOB5vffTs6umGj+UjMb3/QKfndvlP47UsVAO9Drzo11h+T/rF09Po0st98jHsKh31Ruj2UnbYWLuEd/pM9wOwpZ+KqccfWNZsc4F6c3jtf2ou7Ca6akqXRPThzsadua+/4hq7vgmn6uqux6bXw6AjnLMJbXMM5Ixwi8mR2rc3AOfg2nrs4zZlnDFaChbCtk/bwilwMfBxc0iMYy0MX40x2o/ft9D2Znn9Kl+3MO90HUb747jnzjpyCKVeTuij6DllsctyiUzXN0dgE9We1yK54WBffFqtew9TXpbYfy7dILWH/SXxmqeg4zlvRsZfIbuFnic0SHfRtfj4vsaVq532jl/QpYBykzpe/jec7n1uOmhuETi2xzM5vfy01xQC0vkp6PiKpDd07x6qcUc719K0A1YZjpvLivftqNpzxV/tDtXPTWFrbaowzXj+czsG+nmMt/bQspzj7fnvxeeuG4O/s/Xe412VW3+5VuPT+EV97/r++14Gc3ZvQRHrXMz91IrWHZ4FnK7WOVGjJPfAO3R0BczdLKuevQd5LPVsXd/X8PK6Ll2jK0/NM7P4V1PuI51FvsEMV+KhV4T2+22IQF85a0FlLWXs/IHTOX1B5CGCeEDh6V2ZiTK+eee/dnNjOa2xXz2zndd7sq+XYEZ/Gx/exoK5PoOceWNdnef9W9KCT9EYXqkrPxuhC9GA7faMXpHef1smLTDe1qaDY1N4ozLI4fqsHlwpf+3Cu9F1E/Z4AajG3V8430/6bCdq8QQs9b4OqJyQa1+6BACWaTPI8zrROa//7QGJ19U4tHeTTtePNqu3PnVhXJFSjzZFz4eo3Ndqidi/O6J5Z7X+VsS3cYki51T35Iv+merFeuGe69cbJM3Jq1Fn4kUA5rze4o9CRs22iy5jMsYLMS8g5/wOjbDW/AAB42mNgZGBgAOIzT9tXxvPbfGVgYGEAgZokCXVkmgUizsHABFLNwAAACJYG1HjaY2BkYGBhAAEIyc7AwMiAAhgZAQHPABQAAAB42r1TwRaAIAgD88P59PRA0hxUlw578mBDQOwi0i+oDUzb7nC/xyKH8SuwHH/jSx83jnE745c1RO44G9E1WTE14AQtYvKO6PN6BXRW5EONgCazSS4VXiere+sp7F7cQeSp7Pe2YkaxN7fVFhg/8z/1hfnfaBXnZ8k7wNzp/y13+wRWwErCAAAAeNpl0ylUVVEUBuCtoiKgoiIzAjIIMj9mZBZYMsmMjwcuBhEIBoPBYDAYDAaDwWA0GAwGgsFgMBgMBoPBYDAYDAaDweBnlrX+9e6955x/2oeI//664HbEgTL4HnHwZ8Sh1/AlIm0W3kUc3oN9+BFxJBva4E3E0SvwLCIdR/qniGO98Coiw3vG04hMv5n/fj9GZBUD3iz8xx9FnMiBJxEn0+E+/IrIppNt/VQzvITfEadH4HnEmUG4BV8jchaBn7NZgCMXdy7uXGfzeMjjKZ/PfBwF9hTYU/AhotC5QtpFtIt4K7oLnyOK6RXTKP4TUcJDCe5zNXAHcJTiKOWxlEZZPeAo00U5b+XyltM9vw24KvBWyFzpTOWLiCr5qu6BPdV0qx+Cni+sAc4a3mvw1nqu/RZxsRJkrEsDWeo2wAzq8dY/iGgwpwbfGvTdaA6NOmnUb5PnpiTY00S3SXfN/DU/BustdFrMq8VagqcE/YReEjK3+t4qayuPbTTbdNH2PqJdL+06a5e33VoHjg7vHdY7cXTK2ekedPHWha+b5279ddPo1ndPPuDrkbkH3yX5e/XXy3OvzH34+sy132+//P14B/AO6GuA3qBOB3U6hH/It2Haw2Y2rI9hHV6WdcSsR6eAl1GZx3Qwpr9xcxv3PqGDCbyTvE3KM+muT+lwypkpe6bNaZqfaX6v8j7D8wyNGbwzbyNmdTMrzxxfc9bndDFn5vM8zds37x4smMeCHhf5WTKHJb0uuc/L/C7bs4zrGr2kO5m0ntRZkv8VfazIkvI9RSelg5ReUrKvOrvqHq7p4Lr5retx3fcN/5Mb+Dfs25RpE/8mji0etqzfwLHteZufmzrZobfj/K5ednna0/fe/l+Pca7seNpjYGRgYGRkaGBQYAABJgY0AAAP+ACmeNp1ksFO20AQhv8NgRJaUApSy61LDxVc4uAjNxoJReoNKdCrYy8hZb1rrTcIuPMKfaY+QM899RH6AP3tDJEKqlcefzvzz/xrywD21ScoLK9N3ktW5E3hDl6hL7zG7HvhLrMfhNfxGonwBjUnwj2uz8JbzH4R3sZbPArvIMV34T28wQ+6qG6Puz5+Civyb+EOO/4Ir6GvOsJdaLUrvI53KhXeoGYs3MOu+iq8hai+CW/jo/olvIOiA+E97HeKw/xIp8M0nYQ6O/MunpvZwmbhafv01JK/MKGee6ePB8N/JCFzN6dO+8o4bee5cbnRM+NMyKyuFqHytdHR3MXSF0ZfNQOn93rVORoNm4l64ua3NMjsdYxVfZIkeTBZZC73ZeldPfBhllSLKR0KX2ZzlzyY4BO2JmNjrdeXPtjiAIfIcQTNbz/knWKCgBoZzuDhEHEOgxkWsMyFF9Xne/1Mf8Fdo5i3dY1jDOjz/ymB0eEGp63ao2J/Q5YT8pabqOnQsGn1lvuKjoHRc05Tj4x3jCUzRZu5Wp1winvGl54jruHqjI3C0fVW3qDxuWZ/pEvNPzjhylkxrETR5fQoW09HzYDPwJMm7emm8g5Fq8nIjpWHdronLV0TjJmxXJ4nuGwnWPYcAH8BoeumrAB42mNgYmFgnMDAysDCxMDEAAIQGoiNGc6A+CwMENDAwNDNwFDwGMpliHT00WNwYFBQy4aogJCMgSCSGcJTYGAAAEBYBpIAAAB42mNgZoCANAZjIMnIgAYADecAng==")).arrayBuffer();
    await this.wr(e), this.rr = Z.parse(e)[0], await this.br();
  }
  Cr(t) {
    if (t === void 0) return this.cr;
    this.cr = t, this.dr = this.mr.Ji(this.nr.map((i) => i.character), this.cr, this.rr);
    const e = this.gr.Gi(this.nr, this.dr, this.cr, this.rr);
    this.ar = e.framebuffer, this.lr = e.columns, this.ur = e.rows;
  }
  async Mr(t) {
    try {
      const e = await fetch(t);
      if (!e.ok) throw new U(`Failed to load font file: ${e.status} ${e.statusText}`);
      const i = await e.arrayBuffer();
      await this.wr(i);
      const r = Z.parse(i);
      if (!r || r.length === 0) throw Error("Failed to parse font file");
      this.rr = r[0], await this.br();
    } catch (e) {
      throw new U("Failed to load font: " + (e instanceof Error ? e.message : "Unknown error"), e);
    }
  }
  async wr(t) {
    const e = Date.now();
    this.vr = new FontFace("CustomFont_" + e, t), await this.vr.load(), document.fonts.add(this.vr);
  }
  async br() {
    const t = this.pr.zi(this.rr), { array: e, map: i } = this._r.sr(t, this.rr);
    this.nr = e, this.hr = i, this.dr = this.mr.Ji(t, this.cr, this.rr);
    const r = this.gr.Gi(this.nr, this.dr, this.cr, this.rr);
    this.ar = r.framebuffer, this.lr = r.columns, this.ur = r.rows, this.yr = !0;
  }
  Fr(t) {
    const e = this.hr.get(t);
    return e ? e.color : [0, 0, 0];
  }
  $r(t) {
    return Array.from(t).map((e) => {
      const i = this.hr.get(e);
      return i ? i.color : [0, 0, 0];
    });
  }
  Fs() {
    this.ar.dispose(), document.fonts.delete(this.vr);
  }
  get Pr() {
    return this.yr;
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
class Le {
  constructor(t, e, i) {
    a(this, "Tr");
    a(this, "Rr");
    a(this, "G");
    a(this, "j");
    a(this, "Sr");
    a(this, "Er");
    a(this, "kr");
    a(this, "Lr");
    a(this, "zr");
    a(this, "Dr", !1);
    a(this, "Or", /* @__PURE__ */ new Set());
    this.kr = t, this.Lr = e, this.zr = i, this.Js();
  }
  Hr() {
    if (this.G = this.Tr * this.Lr, this.j = this.Rr * this.zr, this.Sr = Math.floor((this.kr.width - this.G) / 2), this.Er = Math.floor((this.kr.height - this.j) / 2), this.Or.size > 0) for (const t of this.Or) t();
  }
  Br(t) {
    this.Or.add(t);
  }
  Ir(t) {
    this.Or.delete(t);
  }
  Js() {
    this.Dr || (this.Tr = Math.floor(this.kr.width / this.Lr), this.Rr = Math.floor(this.kr.height / this.zr)), this.Hr();
  }
  Gr(t, e) {
    this.Lr = t, this.zr = e, this.Js();
  }
  get cellWidth() {
    return this.Lr;
  }
  get cellHeight() {
    return this.zr;
  }
  get cols() {
    return this.Tr;
  }
  set cols(t) {
    this.Dr = !0, this.Tr = Math.max(1, Math.floor(t)), typeof this.Rr != "number" && (this.Rr = Math.max(1, Math.floor(this.kr.height / this.zr))), this.Hr();
  }
  get rows() {
    return this.Rr;
  }
  set rows(t) {
    this.Dr = !0, this.Rr = Math.max(1, Math.floor(t)), typeof this.Tr != "number" && (this.Tr = Math.max(1, Math.floor(this.kr.width / this.Lr))), this.Hr();
  }
  get width() {
    return this.G;
  }
  get height() {
    return this.j;
  }
  get offsetX() {
    return this.Sr;
  }
  get offsetY() {
    return this.Er;
  }
  responsive() {
    this.Dr = !1;
  }
  Fs() {
    this.Or.clear();
  }
}
const Be = /^rgba?\(([^)]+)\)$/i;
function ct(n) {
  return Number.isNaN(n) ? 0 : Math.max(0, Math.min(255, n));
}
function De(n) {
  if (!n) return null;
  const t = n.trim().toLowerCase();
  if (!t) return null;
  let e = null;
  return t.startsWith("rgb") && (e = function(i) {
    const r = Be.exec(i.trim());
    if (!r) return null;
    const s = r[1].split(",").map((u) => u.trim());
    if (s.length < 3) return null;
    const h = ct(parseFloat(s[0])), o = ct(parseFloat(s[1])), c = ct(parseFloat(s[2])), l = s[3] !== void 0 ? 255 * Math.max(0, Math.min(1, parseFloat(s[3]))) : 255;
    return [h, o, c, Math.round(l)];
  }(t)), e ? e[3] === 0 ? null : e : null;
}
class Ne {
  constructor(t = {}) {
    a(this, "kr");
    a(this, "jr", null);
    a(this, "Qr", !1);
    a(this, "Nr");
    this.Qr = t.overlay ?? !1, this.Qr && t.canvas ? (this.jr = t.canvas, this.kr = this.Xr(), this.Nr = !0, this.Yr()) : t.canvas ? (this.kr = t.canvas, this.Nr = !1) : (this.kr = this.Kr(t.width, t.height), this.Nr = !0), this.kr.style.imageRendering = "pixelated";
  }
  Kr(t, e) {
    const i = document.createElement("canvas");
    return i.className = "textmodeCanvas", i.style.imageRendering = "pixelated", i.width = t || 800, i.height = e || 600, document.body.appendChild(i), i;
  }
  Xr() {
    const t = document.createElement("canvas");
    t.className = "textmodeCanvas", t.style.imageRendering = "pixelated";
    const e = this.jr.getBoundingClientRect();
    let i = Math.round(e.width), r = Math.round(e.height);
    if (this.jr instanceof HTMLVideoElement) {
      const o = this.jr;
      (i === 0 || r === 0) && o.videoWidth > 0 && o.videoHeight > 0 && (i = o.videoWidth, r = o.videoHeight);
    }
    t.width = i, t.height = r, t.style.position = "absolute", t.style.pointerEvents = "none";
    const s = window.getComputedStyle(this.jr);
    let h = parseInt(s.zIndex || "0", 10);
    return isNaN(h) && (h = 0), t.style.zIndex = "" + (h + 1), t;
  }
  Yr() {
    var t;
    this.Wr(), (t = this.jr.parentNode) == null || t.insertBefore(this.kr, this.jr.nextSibling);
  }
  Zr() {
    const t = [];
    return this.Qr && this.jr instanceof HTMLElement && (t.push(this.jr), this.jr.parentElement && t.push(this.jr.parentElement)), this.kr.parentElement && t.push(this.kr.parentElement), t.push(this.kr), t.push(document.body), t.push(document.documentElement), t;
  }
  qr() {
    const t = this.Zr();
    for (const e of t) {
      if (!e) continue;
      const i = De(window.getComputedStyle(e).backgroundColor);
      if (i) return i;
    }
    return [255, 255, 255, 255];
  }
  Wr() {
    if (!this.jr) return;
    const t = this.jr.getBoundingClientRect();
    let e = this.jr.offsetParent;
    if (e && e !== document.body) {
      const i = e.getBoundingClientRect();
      this.kr.style.top = t.top - i.top + "px", this.kr.style.left = t.left - i.left + "px";
    } else this.kr.style.top = t.top + window.scrollY + "px", this.kr.style.left = t.left + window.scrollX + "px";
  }
  Vr(t, e) {
    if (this.Qr) {
      const i = this.jr.getBoundingClientRect();
      this.kr.width = Math.round(i.width), this.kr.height = Math.round(i.height), this.Wr();
    } else this.kr.width = t ?? this.kr.width, this.kr.height = e ?? this.kr.height;
  }
  Jr() {
    const t = this.kr.getContext("webgl2", { alpha: !0, premultipliedAlpha: !1, preserveDrawingBuffer: !0, antialias: !1, depth: !0, stencil: !1, powerPreference: "high-performance" });
    if (!t) throw new U("`textmode.js` requires WebGL2 support.");
    return t;
  }
  Fs() {
    const t = this.kr.getContext("webgl") || this.kr.getContext("webgl2");
    if (t) {
      const e = t.getExtension("WEBGL_lose_context");
      e == null || e.loseContext();
    }
    this.Nr && this.kr.parentNode && this.kr.parentNode.removeChild(this.kr);
  }
  get canvas() {
    return this.kr;
  }
  get targetCanvas() {
    return this.jr;
  }
  get width() {
    return this.kr.width;
  }
  get height() {
    return this.kr.height;
  }
}
function $(n) {
  return W(parseInt(n, 16), 0, 255);
}
class S {
  constructor(t, e, i, r) {
    a(this, "tn");
    a(this, "sn");
    a(this, "r");
    a(this, "g");
    a(this, "b");
    a(this, "a");
    this.r = W(t, 0, 255), this.g = W(e, 0, 255), this.b = W(i, 0, 255), this.a = W(r, 0, 255), this.tn = [this.r, this.g, this.b, this.a], this.sn = [this.r / 255, this.g / 255, this.b / 255, this.a / 255];
  }
  static en(t, e, i, r) {
    if (S.rn(t)) return t;
    if (Array.isArray(t)) {
      if (t.length < 3) throw Error("Component tuples must include at least RGB values.");
      const [s, h, o] = t, c = t.length === 4 ? t[3] : 255;
      return S.nn(s, h, o, c);
    }
    if (typeof t == "string") {
      const s = t.trim();
      if (s.length === 0) throw Error("Color strings cannot be empty.");
      return S.hn(s);
    }
    if (typeof t == "number") return typeof e == "number" && typeof i == "number" ? S.nn(t, e, i, r ?? 255) : S.an(t);
    throw Error("Unsupported color input passed to TextmodeColor.$from.");
  }
  static nn(t, e, i, r = 255) {
    return new S(t, e, i, r);
  }
  static an(t, e = 255) {
    return new S(t, t, t, e);
  }
  static hn(t) {
    return new S(...function(e) {
      const i = e.replace(/^#|0x/gi, ""), r = (s = i).length === 3 || s.length === 4 ? s.split("").map((h) => h + h).join("") : s;
      var s;
      if (r.length !== 6 && r.length !== 8) throw Error("Invalid hex color: " + e);
      return [$(r.slice(0, 2)), $(r.slice(2, 4)), $(r.slice(4, 6)), r.length === 8 ? $(r.slice(6, 8)) : 255];
    }(t));
  }
  get rgb() {
    return [this.r, this.g, this.b];
  }
  get rgba() {
    return [...this.tn];
  }
  get normalized() {
    return [...this.sn];
  }
  withAlpha(t) {
    return new S(this.r, this.g, this.b, t);
  }
  static rn(t) {
    return t instanceof S;
  }
}
class Ut {
  constructor(t, e, i, r, s, h, o, c) {
    a(this, "A");
    a(this, "W");
    a(this, "cn");
    a(this, "ln");
    a(this, "un");
    a(this, "G");
    a(this, "j");
    a(this, "Z", null);
    a(this, "fn", null);
    a(this, "dn", "brightness");
    a(this, "vn", null);
    a(this, "pn");
    a(this, "Pt", 0);
    a(this, "Bt", 0);
    a(this, "It", 0);
    a(this, "Tt", 0);
    a(this, "gn", "sampled");
    a(this, "mn", "fixed");
    a(this, "jt", [1, 1, 1, 1]);
    a(this, "Qt", [0, 0, 0, 1]);
    a(this, "_n", [0, 0, 0, 1]);
    a(this, "yn", [[0.1, 0, 0]]);
    a(this, "An", null);
    this.A = t, this.W = e, this.cn = i, this.pn = r, this.ln = s, this.un = h, this.G = o, this.j = c;
  }
  conversionMode(t) {
    return this.dn = t, this.vn = null, this.Z = null, this;
  }
  Fs() {
    this.A.deleteTexture(this.cn);
  }
  invert(t = !0) {
    return this.Pt = t ? 1 : 0, this.Z = null, this;
  }
  flipX(t = !0) {
    return this.Bt = t ? 1 : 0, this.Z = null, this;
  }
  flipY(t = !0) {
    return this.It = t ? 1 : 0, this.Z = null, this;
  }
  charRotation(t) {
    return this.Tt = Tt(t), this.Z = null, this;
  }
  charColorMode(t) {
    return this.gn = t, this.Z = null, this;
  }
  cellColorMode(t) {
    return this.mn = t, this.Z = null, this;
  }
  charColor(t, e, i, r) {
    return this.wn(this.jt, t, e, i, r), this.Z = null, this;
  }
  cellColor(t, e, i, r) {
    return this.wn(this.Qt, t, e, i, r), this.Z = null, this;
  }
  background(t, e, i, r) {
    return this.wn(this._n, t, e, i, r), this.Z = null, this;
  }
  characters(t) {
    return this.An = t, this.bn(t), this.Z = null, this;
  }
  yi(t) {
    this.fn !== t && (this.fn = t, this.An && this.bn(this.An), this.Z = null);
  }
  get texture() {
    return this.cn;
  }
  get width() {
    return this.G;
  }
  get height() {
    return this.j;
  }
  get originalWidth() {
    return this.ln;
  }
  get originalHeight() {
    return this.un;
  }
  lt() {
    return this.Z || this.ut(), this.Z;
  }
  Cn() {
  }
  ut() {
    this.Cn();
    const t = this.xn(), e = this.Mn(), i = t.createShader(e), r = t.createUniforms(e);
    this.Z = this.W.materialManager.Ge(i, r);
  }
  wn(t, e, i, r, s) {
    const h = S.en(e, i, r, s);
    tt(t, h.r, h.g, h.b, h.a);
  }
  bn(t) {
    if (!this.fn) return;
    const e = this.fn.$r(t).filter((i) => Array.isArray(i)).slice(0, 255);
    this.yn = e.length > 0 ? e : this.yn;
  }
  createBaseConversionUniforms() {
    return { u_image: this.Fn(), u_invert: !!this.Pt, u_flipX: !!this.Bt, u_flipY: !!this.It, u_charRotation: this.Tt, u_charColorFixed: this.gn === "fixed", u_charColor: this.jt, u_cellColorFixed: this.mn === "fixed", u_cellColor: this.Qt, u_backgroundColor: this._n, u_charCount: this.yn.length, u_charList: this.yn };
  }
  xn() {
    if (this.vn && this.vn.id === this.dn) return this.vn;
    const t = this.pn.$n(this.dn);
    if (!t) throw Error(`[textmode.js] Conversion mode "${this.dn}" is not registered. If this mode is provided by an add-on, make sure its plugin is installed before loading sources.`);
    return this.vn = t, t;
  }
  Mn() {
    if (!this.fn) throw Error("[textmode.js] Cannot create conversion context: no active font set. Ensure $setActiveFont() is called before rendering.");
    return { renderer: this.W, gl: this.A, font: this.fn, source: this, gridWidth: this.G, gridHeight: this.j };
  }
}
class K extends Ut {
  constructor(t, e, i, r, s, h, o, c) {
    const l = Math.min(o / s, c / h);
    super(t, e, i, r, s, h, Math.max(1, Math.floor(s * l)), Math.max(1, Math.floor(h * l)));
  }
  static Pn(t, e, i, r, s) {
    const h = t.context, o = h.createTexture();
    h.bindTexture(h.TEXTURE_2D, o), h.pixelStorei(h.UNPACK_FLIP_Y_WEBGL, 1), vt(h, h.NEAREST, h.NEAREST, h.CLAMP_TO_EDGE, h.CLAMP_TO_EDGE), h.texImage2D(h.TEXTURE_2D, 0, h.RGBA, h.RGBA, h.UNSIGNED_BYTE, i), h.bindTexture(h.TEXTURE_2D, null);
    const c = i.naturalWidth ?? i.width ?? i.videoWidth ?? 0, l = i.naturalHeight ?? i.height ?? i.videoHeight ?? 0;
    return new K(h, t, o, e, c, l, r, s);
  }
  Fn() {
    return this.cn;
  }
}
class _t {
  constructor(t = 60) {
    a(this, "Tn");
    a(this, "Rn");
    a(this, "Sn", null);
    a(this, "En", 0);
    a(this, "kn", !0);
    a(this, "Ln", 0);
    a(this, "zn", 0);
    a(this, "Dn", []);
    a(this, "On", 10);
    a(this, "Hn", 0);
    a(this, "Bn", 0);
    a(this, "In", -1);
    this.Rn = t, this.Tn = 1e3 / t;
  }
  Gn(t) {
    if (!this.kn) return;
    this.In === -1 && (this.In = performance.now()), this.En = performance.now();
    const e = (i) => {
      if (!this.kn) return void (this.Sn = null);
      const r = i - this.En;
      r >= this.Tn && (t(), this.En = i - r % this.Tn), this.kn && (this.Sn = requestAnimationFrame(e));
    };
    this.Sn = requestAnimationFrame(e);
  }
  jn() {
    this.Sn && (cancelAnimationFrame(this.Sn), this.Sn = null);
  }
  Qn() {
    this.kn && (this.kn = !1, this.jn());
  }
  Nn(t) {
    this.kn || (this.kn = !0, this.Gn(t));
  }
  Xn(t, e) {
    if (t === void 0) return this.Ln;
    this.Rn = t, this.Tn = 1e3 / t, this.kn && e && (this.jn(), this.Gn(e));
  }
  Yn() {
    const t = performance.now();
    if (this.zn > 0) {
      const e = t - this.zn;
      this.Hn = e, this.Dn.push(e), this.Dn.length > this.On && this.Dn.shift();
      const i = this.Dn.reduce((r, s) => r + s, 0) / this.Dn.length;
      this.Ln = 1e3 / i;
    }
    this.zn = t;
  }
  get Kn() {
    return this.kn;
  }
  get Wn() {
    return this.Ln;
  }
  get Zn() {
    return this.Rn;
  }
  set Zn(t) {
    this.Rn = t, this.Tn = 1e3 / t;
  }
  get qn() {
    return this.Bn;
  }
  set qn(t) {
    this.Bn = t;
  }
  Vn() {
    this.Bn++;
  }
  get Jn() {
    return this.In === -1 ? 0 : performance.now() - this.In;
  }
  set Jn(t) {
    this.In = performance.now() - t;
  }
  get so() {
    return this.Jn / 1e3;
  }
  set so(t) {
    this.Jn = 1e3 * t;
  }
  get eo() {
    return this.Hn;
  }
}
class Ot {
  constructor(t, e) {
    a(this, "kr");
    a(this, "io");
    a(this, "ro", { x: -1 / 0, y: -1 / 0 });
    a(this, "no", { x: -1 / 0, y: -1 / 0 });
    a(this, "oo", null);
    a(this, "ho", 0);
    a(this, "ao");
    a(this, "co");
    a(this, "lo");
    a(this, "uo");
    a(this, "fo");
    a(this, "do");
    a(this, "vo", !1);
    a(this, "po");
    a(this, "mo");
    a(this, "_o");
    a(this, "yo");
    a(this, "Ao");
    this.kr = t, this.io = e;
  }
  wo(t) {
    const e = performance.now() + Math.max(0, t);
    e > this.ho && (this.ho = e);
  }
  bo() {
    return performance.now() < this.ho;
  }
  Co(t) {
    const e = this.kr.canvas;
    e.style.cursor = t == null || t === "" ? "" : t;
  }
  xo() {
    if (this.vo) return;
    const t = this.kr.canvas;
    this.ao = (e) => {
      this.Mo(e), this.Fo(e);
    }, this.co = () => {
      this.no = { ...this.ro }, this.ro.x = -1 / 0, this.ro.y = -1 / 0, this.oo = null;
    }, this.lo = (e) => {
      this.Mo(e), this.$o(e);
    }, this.uo = (e) => {
      this.Mo(e), this.Po(e);
    }, this.fo = (e) => {
      this.Mo(e), this.To(e);
    }, this.do = (e) => {
      this.Mo(e), this.Uo(e);
    }, t.addEventListener("mousemove", this.ao, { passive: !0 }), t.addEventListener("mouseleave", this.co, { passive: !0 }), t.addEventListener("mousedown", this.lo, { passive: !0 }), t.addEventListener("mouseup", this.uo, { passive: !0 }), t.addEventListener("click", this.fo, { passive: !0 }), t.addEventListener("wheel", this.do, { passive: !1 }), this.vo = !0;
  }
  Ro() {
    if (!this.vo) return;
    const t = this.kr.canvas;
    t.removeEventListener("mousemove", this.ao), t.removeEventListener("mouseleave", this.co), t.removeEventListener("mousedown", this.lo), t.removeEventListener("mouseup", this.uo), t.removeEventListener("click", this.fo), t.removeEventListener("wheel", this.do), this.vo = !1;
  }
  So() {
    if (!this.vo) return;
    const t = this.io();
    if (t) try {
      if (this.oo) {
        const e = new MouseEvent("mousemove", { clientX: this.oo.x, clientY: this.oo.y, bubbles: !1, cancelable: !1 });
        this.Mo(e);
      } else {
        const e = Math.floor((t.cols - 1) / 2), i = Math.floor(t.rows / 2);
        if (this.ro.x !== -1 / 0 && this.ro.y !== -1 / 0) {
          const r = -e, s = t.cols - e - 1, h = -i, o = t.rows - i - 1;
          (this.ro.x < r || this.ro.x > s || this.ro.y < h || this.ro.y > o) && (this.ro.x = -1 / 0, this.ro.y = -1 / 0);
        }
      }
    } catch {
      this.ro.x = -1 / 0, this.ro.y = -1 / 0;
    }
  }
  Eo(t) {
    this.po = t;
  }
  ko(t) {
    this.mo = t;
  }
  Lo(t) {
    this._o = t;
  }
  zo(t) {
    this.yo = t;
  }
  Do(t) {
    this.Ao = t;
  }
  Oo() {
    return { x: this.ro.x, y: this.ro.y };
  }
  Fo(t) {
    if (this.yo && !this.bo()) {
      const e = { position: { ...this.ro }, previousPosition: { ...this.no }, originalEvent: t };
      this.yo(e);
    }
  }
  $o(t) {
    if (this.mo && !this.bo()) {
      const e = { position: { ...this.ro }, previousPosition: { ...this.no }, button: t.button, originalEvent: t };
      this.mo(e);
    }
  }
  Po(t) {
    if (this._o && !this.bo()) {
      const e = { position: { ...this.ro }, previousPosition: { ...this.no }, button: t.button, originalEvent: t };
      this._o(e);
    }
  }
  To(t) {
    if (this.po && !this.bo()) {
      const e = { position: { ...this.ro }, previousPosition: { ...this.no }, button: t.button, originalEvent: t };
      this.po(e);
    }
  }
  Uo(t) {
    if (this.Ao && !this.bo()) {
      const e = { position: { ...this.ro }, previousPosition: { ...this.no }, delta: { x: t.deltaX, y: t.deltaY }, originalEvent: t };
      this.Ao(e);
    }
  }
  Mo(t) {
    const e = this.kr.canvas, i = this.io();
    if (this.no = { ...this.ro }, this.oo = { x: t.clientX, y: t.clientY }, !i) return this.ro.x = -1 / 0, void (this.ro.y = -1 / 0);
    const r = e.getBoundingClientRect(), s = t.clientX - r.left, h = t.clientY - r.top, o = e.width / r.width, c = h * (e.height / r.height), l = s * o - i.offsetX, u = c - i.offsetY, f = Math.floor(l / i.cellWidth), d = Math.floor(u / i.cellHeight);
    if (f >= 0 && f < i.cols && d >= 0 && d < i.rows) {
      const g = Math.floor((i.cols - 1) / 2);
      this.ro.x = f - g, this.ro.y = d - Math.floor(i.rows / 2);
    } else this.ro.x = -1 / 0, this.ro.y = -1 / 0;
  }
}
const Ie = Object.freeze(Object.defineProperty({ __proto__: null, MouseManager: Ot }, Symbol.toStringTag, { value: "Module" }));
class Lt {
  constructor() {
    a(this, "Ho", /* @__PURE__ */ new Map());
    a(this, "Bo", null);
    a(this, "Io", null);
    a(this, "Go");
    a(this, "jo");
    a(this, "vo", !1);
    a(this, "Qo");
    a(this, "No");
    a(this, "Xo", { ArrowUp: "UP_ARROW", ArrowDown: "DOWN_ARROW", ArrowLeft: "LEFT_ARROW", ArrowRight: "RIGHT_ARROW", F1: "F1", F2: "F2", F3: "F3", F4: "F4", F5: "F5", F6: "F6", F7: "F7", F8: "F8", F9: "F9", F10: "F10", F11: "F11", F12: "F12", Enter: "ENTER", Return: "RETURN", Tab: "TAB", Escape: "ESCAPE", Backspace: "BACKSPACE", Delete: "DELETE", Insert: "INSERT", Home: "HOME", End: "END", PageUp: "PAGE_UP", PageDown: "PAGE_DOWN", Shift: "SHIFT", Control: "CONTROL", Alt: "ALT", Meta: "META", " ": "SPACE" });
  }
  xo() {
    this.vo || (this.Go = (t) => {
      this.Yo(t);
    }, this.jo = (t) => {
      this.Ko(t);
    }, window.addEventListener("keydown", this.Go, { passive: !1 }), window.addEventListener("keyup", this.jo, { passive: !1 }), this.vo = !0);
  }
  Ro() {
    this.vo && (window.removeEventListener("keydown", this.Go), window.removeEventListener("keyup", this.jo), this.vo = !1, this.Ho.clear(), this.Bo = null, this.Io = null);
  }
  ko(t) {
    this.Qo = t;
  }
  Lo(t) {
    this.No = t;
  }
  Wo(t) {
    const e = this.Zo(t), i = this.Ho.get(t) || this.Ho.get(e);
    return (i == null ? void 0 : i.isPressed) || !1;
  }
  qo() {
    return this.Bo;
  }
  Vo() {
    return this.Io;
  }
  Jo() {
    const t = [];
    for (const [e, i] of this.Ho) i.isPressed && t.push(e);
    return t;
  }
  th() {
    return { ctrl: this.Wo("Control"), shift: this.Wo("Shift"), alt: this.Wo("Alt"), meta: this.Wo("Meta") };
  }
  sh() {
    this.Ho.clear(), this.Bo = null, this.Io = null;
  }
  Yo(t) {
    const e = t.key, i = Date.now();
    this.Ho.has(e) || this.Ho.set(e, { isPressed: !1, lastPressTime: 0, lastReleaseTime: 0 });
    const r = this.Ho.get(e);
    if (!r.isPressed && (r.isPressed = !0, r.lastPressTime = i, this.Bo = e, this.Qo)) {
      const s = { key: e, keyCode: t.keyCode, ctrlKey: t.ctrlKey, shiftKey: t.shiftKey, altKey: t.altKey, metaKey: t.metaKey, isPressed: !0, originalEvent: t };
      this.Qo(s);
    }
  }
  Ko(t) {
    const e = t.key, i = Date.now();
    this.Ho.has(e) || this.Ho.set(e, { isPressed: !1, lastPressTime: 0, lastReleaseTime: 0 });
    const r = this.Ho.get(e);
    if (r.isPressed = !1, r.lastReleaseTime = i, this.Io = e, this.No) {
      const s = { key: e, keyCode: t.keyCode, ctrlKey: t.ctrlKey, shiftKey: t.shiftKey, altKey: t.altKey, metaKey: t.metaKey, isPressed: !1, originalEvent: t };
      this.No(s);
    }
  }
  Zo(t) {
    return this.Xo[t] || t.toLowerCase();
  }
}
const We = Object.freeze(Object.defineProperty({ __proto__: null, KeyboardManager: Lt }, Symbol.toStringTag, { value: "Module" }));
class Bt {
  constructor(t, e, i) {
    a(this, "kr");
    a(this, "eh");
    a(this, "io");
    a(this, "ih", /* @__PURE__ */ new Map());
    a(this, "rh", /* @__PURE__ */ new Map());
    a(this, "nh", /* @__PURE__ */ new Map());
    a(this, "oh", null);
    a(this, "hh");
    a(this, "ah");
    a(this, "uh");
    a(this, "fh");
    a(this, "dh");
    a(this, "ph");
    a(this, "vo", !1);
    a(this, "gh");
    a(this, "mh");
    a(this, "_h");
    a(this, "yh");
    a(this, "Ah");
    a(this, "wh");
    a(this, "bh");
    a(this, "Ch");
    a(this, "xh");
    a(this, "Mh");
    a(this, "Fh", 320);
    a(this, "$h", 350);
    a(this, "Ph", 10);
    a(this, "Th", 550);
    a(this, "Rh", 14);
    a(this, "Sh", 48);
    a(this, "Eh", 650);
    a(this, "kh", 0.02);
    a(this, "Lh", 2);
    a(this, "zh", 600);
    a(this, "Dh", 0);
    a(this, "Oh", null);
    this.kr = t, this.io = e, this.eh = i;
    const r = this.kr.canvas;
    this.hh = r.style.touchAction, this.ah = r.style.userSelect, r.style.touchAction || (r.style.touchAction = "none"), r.style.userSelect || (r.style.userSelect = "none");
  }
  xo() {
    if (this.vo) return;
    const t = this.kr.canvas;
    this.uh = (e) => {
      this.Hh(e);
    }, this.fh = (e) => {
      this.Bh(e);
    }, this.dh = (e) => {
      this.Ih(e);
    }, this.ph = (e) => {
      this.Gh(e);
    }, t.addEventListener("touchstart", this.uh, { passive: !1 }), t.addEventListener("touchmove", this.fh, { passive: !1 }), t.addEventListener("touchend", this.dh, { passive: !1 }), t.addEventListener("touchcancel", this.ph, { passive: !1 }), this.vo = !0;
  }
  Ro() {
    if (!this.vo) return;
    const t = this.kr.canvas;
    t.removeEventListener("touchstart", this.uh), t.removeEventListener("touchmove", this.fh), t.removeEventListener("touchend", this.dh), t.removeEventListener("touchcancel", this.ph), this.vo = !1, this.oh = null, this.ih.clear(), this.rh.clear(), this.nh.forEach((e) => {
      e.longPressTimer !== null && window.clearTimeout(e.longPressTimer);
    }), this.nh.clear(), this.Oh = null, this.Dh = 0, t.style.touchAction = this.hh, t.style.userSelect = this.ah;
  }
  So() {
    if (!this.io() || this.ih.size === 0) return;
    const t = /* @__PURE__ */ new Map();
    for (const e of this.ih.values()) {
      const i = this.jh(e.clientX, e.clientY, e.id, e);
      t.set(e.id, i);
    }
    this.ih = t;
  }
  Qh() {
    return Array.from(this.ih.values()).map((t) => ({ ...t }));
  }
  Nh(t) {
    this.gh = t;
  }
  zo(t) {
    this.mh = t;
  }
  Xh(t) {
    this._h = t;
  }
  Yh(t) {
    this.yh = t;
  }
  Kh(t) {
    this.Ah = t;
  }
  Wh(t) {
    this.wh = t;
  }
  Zh(t) {
    this.bh = t;
  }
  qh(t) {
    this.Ch = t;
  }
  Vh(t) {
    this.xh = t;
  }
  Jh(t) {
    this.Mh = t;
  }
  Hh(t) {
    var r;
    if (!this.io()) return;
    t.preventDefault(), (r = this.eh) == null || r.wo(this.zh);
    const e = performance.now(), i = this.ta(t.changedTouches);
    for (const s of i) {
      const h = this.ih.get(s.id);
      h && this.rh.set(s.id, this.sa(h)), this.ih.set(s.id, s);
      const o = { id: s.id, startPosition: s, lastPosition: s, startTime: e, lastTime: e, longPressTimer: null, longPressFired: !1 };
      this.bh && (o.longPressTimer = window.setTimeout(() => {
        const c = this.ih.get(s.id);
        c && (o.longPressFired = !0, this.bh({ touch: this.sa(c), duration: performance.now() - o.startTime, originalEvent: t }));
      }, this.Th)), this.nh.set(s.id, o), this.gh && this.gh(this.ea(s, t, void 0, e));
    }
    this.ih.size === 2 && this.ia();
  }
  Bh(t) {
    var r;
    if (!this.io()) return;
    t.preventDefault(), (r = this.eh) == null || r.wo(this.zh);
    const e = performance.now(), i = this.ta(t.changedTouches);
    for (const s of i) {
      const h = this.ih.get(s.id), o = h ? this.sa(h) : void 0;
      o && this.rh.set(s.id, o), this.ih.set(s.id, s);
      const c = this.nh.get(s.id);
      c && (c.lastPosition = s, c.lastTime = e, o) && Y(o.clientX, o.clientY, s.clientX, s.clientY) > this.Rh && c.longPressTimer !== null && (window.clearTimeout(c.longPressTimer), c.longPressTimer = null), this.mh && this.mh(this.ea(s, t, o, e));
    }
    this.ih.size === 2 ? this.ra(t) : this.oh = null;
  }
  Ih(t) {
    if (!this.io()) return;
    t.preventDefault();
    const e = performance.now(), i = this.ta(t.changedTouches);
    for (const r of i) {
      const s = this.ih.get(r.id), h = s ? this.sa(s) : void 0, o = this.nh.get(r.id);
      o && o.longPressTimer !== null && (window.clearTimeout(o.longPressTimer), o.longPressTimer = null), this._h && this._h(this.ea(r, t, h, e)), o && this.na(o, t), this.nh.delete(r.id), this.rh.delete(r.id), this.ih.delete(r.id);
    }
    this.ih.size < 2 && (this.oh = null);
  }
  Gh(t) {
    if (!this.io()) return;
    t.preventDefault();
    const e = performance.now(), i = this.ta(t.changedTouches);
    for (const r of i) {
      const s = this.ih.get(r.id), h = s ? this.sa(s) : void 0, o = this.nh.get(r.id);
      o && o.longPressTimer !== null && (window.clearTimeout(o.longPressTimer), o.longPressTimer = null), this.yh && this.yh(this.ea(r, t, h, e)), this.nh.delete(r.id), this.rh.delete(r.id), this.ih.delete(r.id);
    }
    this.ih.size < 2 && (this.oh = null);
  }
  ta(t) {
    const e = [];
    for (let i = 0; i < t.length; i += 1) {
      const r = t.item(i);
      r && e.push(this.oa(r));
    }
    return e;
  }
  oa(t) {
    return this.jh(t.clientX, t.clientY, t.identifier, { id: t.identifier, x: -1, y: -1, clientX: t.clientX, clientY: t.clientY, pressure: t.force, radiusX: t.radiusX, radiusY: t.radiusY, rotationAngle: t.rotationAngle });
  }
  jh(t, e, i, r) {
    const s = this.kr.canvas, h = this.io(), o = s.getBoundingClientRect(), c = t - o.left, l = e - o.top, u = c * (s.width / o.width), f = l * (s.height / o.height);
    if (!h) return { id: i, x: -1 / 0, y: -1 / 0, clientX: t, clientY: e, pressure: r.pressure, radiusX: r.radiusX, radiusY: r.radiusY, rotationAngle: r.rotationAngle };
    const d = u - h.offsetX, g = f - h.offsetY, v = Math.floor(d / h.cellWidth), p = Math.floor(g / h.cellHeight);
    return v >= 0 && v < h.cols && p >= 0 && p < h.rows ? { id: i, x: v - Math.floor((h.cols - 1) / 2), y: p - Math.floor(h.rows / 2), clientX: t, clientY: e, pressure: r.pressure, radiusX: r.radiusX, radiusY: r.radiusY, rotationAngle: r.rotationAngle } : { id: i, x: -1 / 0, y: -1 / 0, clientX: t, clientY: e, pressure: r.pressure, radiusX: r.radiusX, radiusY: r.radiusY, rotationAngle: r.rotationAngle };
  }
  ea(t, e, i, r) {
    const s = this.nh.get(t.id), h = Array.from(this.rh.values()).map((l) => this.sa(l)), o = Array.from(this.ih.values()).map((l) => this.sa(l)), c = this.ta(e.changedTouches);
    return { touch: this.sa(t), previousTouch: i ? this.sa(i) : void 0, touches: o, previousTouches: h, changedTouches: c, deltaTime: s ? r - s.lastTime : 0, originalEvent: e };
  }
  ia() {
    if (this.ih.size !== 2) return void (this.oh = null);
    const t = Array.from(this.ih.values()), [e, i] = t, r = Y(e.x, e.y, i.x, i.y), s = yt(e.clientX, e.clientY, i.clientX, i.clientY);
    this.oh = { ids: [e.id, i.id], initialDistance: Math.max(r, 1e-4), initialAngle: s, lastScale: 1, lastRotation: 0 };
  }
  ra(t) {
    if (this.oh || this.ia(), !this.oh) return;
    const [e, i] = this.oh.ids, r = this.ih.get(e), s = this.ih.get(i);
    if (!r || !s) return;
    const h = Y(r.x, r.y, s.x, s.y) / this.oh.initialDistance, o = h - this.oh.lastScale;
    this.xh && Math.abs(o) > this.kh && (this.xh({ touches: [this.sa(r), this.sa(s)], scale: h, deltaScale: o, center: this.ha(r, s), originalEvent: t }), this.oh.lastScale = h);
    let c = yt(r.clientX, r.clientY, s.clientX, s.clientY) - this.oh.initialAngle;
    c = (c + 180) % 360 - 180;
    const l = c - this.oh.lastRotation;
    this.Mh && Math.abs(l) > this.Lh && (this.Mh({ touches: [this.sa(r), this.sa(s)], rotation: c, deltaRotation: l, center: this.ha(r, s), originalEvent: t }), this.oh.lastRotation = c);
  }
  ha(t, e) {
    const i = (t.clientX + e.clientX) / 2, r = (t.clientY + e.clientY) / 2, s = this.jh(i, r, -1, { id: -1, x: -1, y: -1, clientX: i, clientY: r });
    return { x: s.x, y: s.y };
  }
  na(t, e) {
    const i = performance.now(), r = i - t.startTime, s = Y(t.startPosition.clientX, t.startPosition.clientY, t.lastPosition.clientX, t.lastPosition.clientY);
    if (!t.longPressFired && r <= this.Fh && s <= this.Ph)
      this.aa(t.lastPosition, i) && this.wh ? this.wh({ touch: this.sa(t.lastPosition), taps: 2, originalEvent: e }) : this.Ah && this.Ah({ touch: this.sa(t.lastPosition), taps: 1, originalEvent: e });
    else if (!t.longPressFired && r <= this.Eh && s >= this.Sh) {
      const h = { x: t.lastPosition.clientX - t.startPosition.clientX, y: t.lastPosition.clientY - t.startPosition.clientY }, o = Math.max(Math.hypot(h.x, h.y), 1e-4), c = { x: h.x / o, y: h.y / o }, l = { x: h.x / r, y: h.y / r };
      this.Ch && this.Ch({ touch: this.sa(t.lastPosition), direction: c, distance: o, velocity: l, originalEvent: e });
    }
    this.Dh = i, this.Oh = this.sa(t.lastPosition);
  }
  aa(t, e) {
    return !this.Oh || e - this.Dh > this.$h ? !1 : Y(t.clientX, t.clientY, this.Oh.clientX, this.Oh.clientY) <= this.Ph;
  }
  sa(t) {
    return { ...t };
  }
}
const ke = Object.freeze(Object.defineProperty({ __proto__: null, TouchManager: Bt }, Symbol.toStringTag, { value: "Module" }));
class nt extends Ut {
  constructor(e, i, r, s, h, o, c, l, u) {
    const f = o / c;
    let d, g;
    f > 1 ? (d = l, g = Math.round(l / f)) : (g = u, d = Math.round(u * f));
    super(e, i, r, s, o, c, d, g);
    a(this, "ca");
    this.ca = h;
  }
  Fs() {
    super.Fs(), this.ca.pause(), this.ca.src = "", this.ca.load();
  }
  la() {
    if (this.ca.readyState >= this.ca.HAVE_CURRENT_DATA) {
      const e = this.A;
      e.bindTexture(e.TEXTURE_2D, this.cn), e.texImage2D(e.TEXTURE_2D, 0, e.RGBA, e.RGBA, e.UNSIGNED_BYTE, this.ca), e.bindTexture(e.TEXTURE_2D, null);
    }
  }
  Fn() {
    return this.cn;
  }
  lt() {
    return this.Z = null, super.lt();
  }
  Cn() {
    this.la();
  }
  static async Pn(e, i, r, s, h) {
    const o = e.context;
    let c;
    c = document.createElement("video"), c.crossOrigin = "anonymous", c.loop = !0, c.muted = !0, c.playsInline = !0, await new Promise((d, g) => {
      c.addEventListener("loadedmetadata", () => d(), { once: !0 }), c.addEventListener("error", (v) => {
        var m;
        const p = v.target;
        g(Error("Failed to load video: " + (((m = p.error) == null ? void 0 : m.message) || "Unknown error")));
      }, { once: !0 }), c.src = r;
    });
    const l = o.createTexture();
    o.bindTexture(o.TEXTURE_2D, l), o.pixelStorei(o.UNPACK_FLIP_Y_WEBGL, 1), vt(o, o.LINEAR, o.LINEAR, o.CLAMP_TO_EDGE, o.CLAMP_TO_EDGE), o.texImage2D(o.TEXTURE_2D, 0, o.RGBA, o.RGBA, o.UNSIGNED_BYTE, c), o.bindTexture(o.TEXTURE_2D, null);
    const u = c.videoWidth, f = c.videoHeight;
    return new nt(o, e, l, i, c, u, f, s, h);
  }
  async play() {
    await this.ca.play();
  }
  pause() {
    this.ca.pause();
  }
  stop() {
    this.ca.pause(), this.ca.currentTime = 0;
  }
  speed(e) {
    return this.ca.playbackRate = e, this;
  }
  loop(e = !0) {
    return this.ca.loop = e, this;
  }
  time(e) {
    return this.ca.currentTime = e, this;
  }
  volume(e) {
    return this.ca.volume = Math.max(0, Math.min(1, e)), this;
  }
  get videoElement() {
    return this.ca;
  }
  get currentTime() {
    return this.ca.currentTime;
  }
  get duration() {
    return this.ca.duration;
  }
  get isPlaying() {
    return !this.ca.paused && !this.ca.ended;
  }
}
const Xe = (n) => class extends n {
  ua(t, e, i, r) {
    if (S.rn(t)) return t;
    if (typeof t == "number" || typeof t == "string") return this.color(t, e, i, r);
    throw Error("Unsupported color input passed to color-capable method.");
  }
  rotate(t = 0, e = 0, i = 0) {
    this.W.state.Zt(t), this.W.state.qt(e), this.W.state.Vt(i);
  }
  rotateX(t) {
    this.W.state.Zt(t);
  }
  rotateY(t) {
    this.W.state.qt(t);
  }
  rotateZ(t) {
    this.W.state.Vt(t);
  }
  translate(t = 0, e = 0, i = 0) {
    this.W.state.Jt(t, e, i);
  }
  translateX(t) {
    this.W.state.Jt(t, 0, 0);
  }
  translateY(t) {
    this.W.state.Jt(0, t, 0);
  }
  translateZ(t) {
    this.W.state.Jt(0, 0, t);
  }
  push() {
    this.W.state.nt();
  }
  pop() {
    this.W.state.ot();
  }
  color(t, e, i, r) {
    return S.en(t, e, i, r);
  }
  rect(t = 1, e = 1) {
    this.W.wi(t, e);
  }
  point() {
    this.W.wi(1, 1);
  }
  line(t, e, i, r) {
    this.W.bi(t, e, i, r);
  }
  lineWeight(t) {
    this.W.state.Kt(t);
  }
  background(t, e, i, r = 255) {
    const s = this.ua(t, e, i, r);
    this.W.Pi(s.r, s.g, s.b, s.a);
  }
  char(t) {
    const e = Array.from(t);
    if (e.length === 0) throw Error("char() requires at least one character.");
    this.W.state.rs(this.fa.font.Fr(e[0]));
  }
  charColor(t, e, i, r) {
    const s = this.ua(t, e, i, r);
    this.W.state.ns(s.r, s.g, s.b, s.a);
  }
  cellColor(t, e, i, r) {
    const s = this.ua(t, e, i, r);
    this.W.state.hs(s.r, s.g, s.b, s.a);
  }
  flipX(t) {
    this.W.state.cs(t);
  }
  flipY(t) {
    this.W.state.ls(t);
  }
  charRotation(t) {
    this.W.state.fs(t);
  }
  invert(t) {
    this.W.state.us(t);
  }
  clear() {
    this.W.ye(0, 0, 0, 0);
  }
  ellipse(t, e) {
    this.W.Ci(t / 2, e / 2);
  }
  triangle(t, e, i, r, s, h) {
    this.W.xi(t, e, i, r, s, h);
  }
  bezierCurve(t, e, i, r, s, h, o, c) {
    this.W.Mi(t, e, i, r, s, h, o, c);
  }
  arc(t, e, i, r) {
    this.W.Fi(t / 2, e / 2, i, r);
  }
  shader(t) {
    this.W.pi(t);
  }
  setUniform(t, e) {
    this.W.H(t, e);
  }
  setUniforms(t) {
    this.W.gi(t);
  }
  async createFilterShader(t) {
    if (typeof t == "string" && (t.startsWith("./") || t.startsWith("../") || t.endsWith(".frag") || t.endsWith(".glsl"))) {
      const e = await fetch(t);
      if (!e.ok) throw Error(`Failed to load shader from ${t}: ${e.statusText}`);
      const i = await e.text();
      return this.W.mi(i);
    }
    return this.W.mi(t);
  }
  async createShader(t, e) {
    let i, r;
    if (typeof t == "string" && (t.startsWith("./") || t.startsWith("../") || t.endsWith(".vert") || t.endsWith(".glsl"))) {
      const s = await fetch(t);
      if (!s.ok) throw Error(`Failed to load vertex shader from ${t}: ${s.statusText}`);
      i = await s.text();
    } else i = t;
    if (typeof e == "string" && (e.startsWith("./") || e.startsWith("../") || e.endsWith(".frag") || e.endsWith(".glsl"))) {
      const s = await fetch(e);
      if (!s.ok) throw Error(`Failed to load fragment shader from ${e}: ${s.statusText}`);
      r = await s.text();
    } else r = e;
    return this.W.di(i, r);
  }
  createFramebuffer(t) {
    return this.W.$i(t.width ?? this.grid.cols, t.height ?? this.grid.rows, t.attachments ?? 3);
  }
  image(t, e, i) {
    var r;
    this.W._i(t, e, i, ((r = this.fa) == null ? void 0 : r.font) ?? this.da.base.font), t instanceof X && this.W.ht();
  }
  async loadImage(t) {
    const e = t, i = await new Promise((r, s) => {
      const h = new Image();
      h.crossOrigin = "anonymous", h.onload = () => r(h), h.onerror = (o) => s(o), h.src = e;
    });
    return K.Pn(this.W, this.pn, i, this.grid.cols, this.grid.rows);
  }
  async loadVideo(t) {
    return await nt.Pn(this.W, this.pn, t, this.grid.cols, this.grid.rows);
  }
}, ze = (n) => class extends n {
  get frameCount() {
    return this.va.qn;
  }
  set frameCount(t) {
    this.va.qn = t;
  }
  frameRate(t) {
    return t === void 0 ? this.va.Wn : this.va.Xn(t, () => this.pa());
  }
  targetFrameRate(t) {
    if (t === void 0) return this.va.Zn;
    this.va.Zn = t;
  }
  noLoop() {
    this.va.Qn();
  }
  loop() {
    this.va.Nn(() => this.pa());
  }
  redraw(t = 1) {
    if (pt.m(typeof t == "number" && t > 0 && Number.isInteger(t), "Redraw count must be a positive integer.", { method: "redraw", providedValue: t })) for (let e = 0; e < t; e++) this.pa();
  }
  isLooping() {
    return this.va.Kn;
  }
  get millis() {
    return this.va.Jn;
  }
  set millis(t) {
    this.va.Jn = t;
  }
  get secs() {
    return this.va.so;
  }
  set secs(t) {
    this.va.so = t;
  }
  deltaTime() {
    return this.va.eo;
  }
}, Ye = (n) => class extends n {
  constructor(...t) {
    super(...t);
  }
  mouseClicked(t) {
    this.eh.Eo(t);
  }
  mousePressed(t) {
    this.eh.ko(t);
  }
  mouseReleased(t) {
    this.eh.Lo(t);
  }
  mouseMoved(t) {
    this.eh.zo(t);
  }
  mouseScrolled(t) {
    this.eh.Do(t);
  }
  get mouse() {
    return this.eh.Oo();
  }
  cursor(t) {
    this.eh.Co(t);
  }
}, Ge = (n) => class extends n {
  constructor(...t) {
    super(...t);
  }
  touchStarted(t) {
    this.ga.Nh(t);
  }
  touchMoved(t) {
    this.ga.zo(t);
  }
  touchEnded(t) {
    this.ga.Xh(t);
  }
  touchCancelled(t) {
    this.ga.Yh(t);
  }
  tap(t) {
    this.ga.Kh(t);
  }
  doubleTap(t) {
    this.ga.Wh(t);
  }
  longPress(t) {
    this.ga.Zh(t);
  }
  swipe(t) {
    this.ga.qh(t);
  }
  pinch(t) {
    this.ga.Vh(t);
  }
  rotateGesture(t) {
    this.ga.Jh(t);
  }
  get touches() {
    return this.ga.Qh();
  }
}, je = (n) => class extends n {
  constructor(...t) {
    super(...t);
  }
  keyPressed(t) {
    this.ma.ko(t);
  }
  keyReleased(t) {
    this.ma.Lo(t);
  }
  isKeyPressed(t) {
    return this.ma.Wo(t);
  }
  get lastKeyPressed() {
    return this.ma.qo();
  }
  get lastKeyReleased() {
    return this.ma.Vo();
  }
  get pressedKeys() {
    return this.ma.Jo();
  }
  get modifierState() {
    return this.ma.th();
  }
};
class Dt {
  constructor(t) {
    a(this, "_a");
    a(this, "ya", /* @__PURE__ */ new Map());
    a(this, "wa", []);
    a(this, "ba", /* @__PURE__ */ new Map());
    a(this, "Ca", /* @__PURE__ */ new Map());
    a(this, "xa", /* @__PURE__ */ new Map());
    a(this, "Ma", /* @__PURE__ */ new Map());
    a(this, "Fa", /* @__PURE__ */ new Map());
    a(this, "$a", /* @__PURE__ */ new Map());
    a(this, "Pa", /* @__PURE__ */ new Map());
    a(this, "Ta", /* @__PURE__ */ new Map());
    this._a = t;
  }
  Ra(t) {
    for (const e of t) {
      if (this.ya.has(e.name)) return void console.warn(`[textmode.js] Plugin "${e.name}" is already installed.`);
      const i = this.Sa(e.name);
      try {
        const r = e.install(this._a, i);
        r instanceof Promise && r.catch((s) => {
          console.error(`[textmode.js] Async plugin "${e.name}" installation error:`, s), this.Ea(e.name);
        });
      } catch (r) {
        throw this.Ea(e.name), r;
      }
      this.ya.set(e.name, e), this.wa.push(e.name);
    }
  }
  async ka(t) {
    for (const e of t) {
      if (this.ya.has(e.name)) return void console.warn(`[textmode.js] Plugin "${e.name}" is already installed.`);
      const i = this.Sa(e.name);
      try {
        await e.install(this._a, i);
      } catch (r) {
        throw this.Ea(e.name), r;
      }
      this.ya.set(e.name, e), this.wa.push(e.name);
    }
  }
  async La(t) {
    const e = this.ya.get(t);
    if (!e) return;
    const i = this.Sa(t);
    e.uninstall && await e.uninstall(this._a, i), this.ya.delete(t), this.wa.splice(this.wa.indexOf(t), 1), this.Ea(t);
  }
  za() {
    this.Da(this.ba);
  }
  Oa() {
    this.Da(this.Ca);
  }
  Ha(t) {
    this.Ba(this.xa, t);
  }
  Ia(t) {
    this.Ga(this.Ma, t);
  }
  ja(t) {
    this.Ga(this.Fa, t);
  }
  async Qa() {
    await this.Na(this.$a);
  }
  async Xa() {
    await this.Na(this.Pa);
  }
  async Ya() {
    const t = [...this.ya.keys()];
    for (const e of t) await this.La(e);
  }
  Sa(t) {
    const e = this._a, i = this;
    return { get renderer() {
      return e.W;
    }, get canvas() {
      return e.kr;
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
    }, registerPreDrawHook: (r) => i.Ka(i.ba, t, r), registerPostDrawHook: (r) => i.Ka(i.Ca, t, r), registerLayerDisposedHook: (r) => i.Ka(i.xa, t, r), registerLayerPreRenderHook: (r) => i.Ka(i.Ma, t, r), registerLayerPostRenderHook: (r) => i.Ka(i.Fa, t, r), registerPreSetupHook: (r) => i.Ka(i.$a, t, r), registerPostSetupHook: (r) => i.Ka(i.Pa, t, r), extendLayer: (r, s) => {
      i.Wa(t, r, s);
    }, removeLayerExtension: (r) => {
      i.Za(t, r);
    } };
  }
  Ka(t, e, i) {
    const r = t.get(e) ?? /* @__PURE__ */ new Set();
    return r.add(i), t.set(e, r), () => {
      const s = t.get(e);
      s && (s.delete(i), s.size === 0 && t.delete(e));
    };
  }
  Ea(t) {
    this.ba.delete(t), this.Ca.delete(t), this.xa.delete(t), this.Ma.delete(t), this.Fa.delete(t), this.$a.delete(t), this.Pa.delete(t);
    const e = this.Ta.get(t);
    if (e) {
      for (const i of e.keys()) this.qa(i);
      this.Ta.delete(t);
    }
  }
  Da(t) {
    for (const e of this.wa) {
      const i = t.get(e);
      i && i.forEach((r) => r());
    }
  }
  Ba(t, e) {
    for (const i of this.wa) {
      const r = t.get(i);
      r && r.forEach((s) => s(e));
    }
  }
  Ga(t, e) {
    for (const i of this.wa) {
      const r = t.get(i);
      r && r.forEach((s) => s(e));
    }
  }
  async Na(t) {
    for (const e of this.wa) {
      const i = t.get(e);
      if (i) for (const r of i) await r();
    }
  }
  Wa(t, e, i) {
    let r = this.Ta.get(t);
    r || (r = /* @__PURE__ */ new Map(), this.Ta.set(t, r));
    for (const [s, h] of this.Ta) s !== t && h.has(e) && console.warn(`[textmode.js] Plugin "${t}" is overwriting layer method "${e}" previously added by plugin "${s}".`);
    r.set(e, i), this.Va(e, i);
  }
  Za(t, e) {
    const i = this.Ta.get(t);
    if (!i) return;
    i.delete(e);
    let r = !1;
    for (const [s, h] of this.Ta) if (s !== t && h.has(e)) {
      r = !0;
      const o = h.get(e);
      this.Va(e, o);
      break;
    }
    r || this.qa(e);
  }
  Va(t, e) {
    const i = Object.getPrototypeOf(this._a.layers.base);
    Object.defineProperty(i, t, { value: e, writable: !0, configurable: !0, enumerable: !1 });
  }
  qa(t) {
    const e = Object.getPrototypeOf(this._a.layers.base), i = Object.getOwnPropertyDescriptor(e, t);
    i && i.configurable && delete e[t];
  }
}
const Je = Object.freeze(Object.defineProperty({ __proto__: null, TextmodePluginManager: Dt }, Symbol.toStringTag, { value: "Module" }));
class Nt {
  constructor() {
    a(this, "Ja", /* @__PURE__ */ new Map());
    a(this, "tc", []);
    a(this, "sc", 0);
    a(this, "ec", 0);
    a(this, "rc");
  }
  get nc() {
    return this.sc;
  }
  get oc() {
    if (this.sc === 0) return 0;
    let t = 0;
    for (const e of this.tc) {
      const i = this.Ja.get(e);
      i && (t += Math.min(1, Math.max(0, i.progress)) * i.weight);
    }
    return Math.min(1, t / this.sc);
  }
  hc(t) {
    this.rc = t;
  }
  ac(t, e = 1) {
    const i = `phase-${this.tc.length + 1}-${Date.now()}`, r = { id: i, label: t, weight: Math.max(1e-3, e), progress: 0, status: "running" };
    return this.Ja.set(i, r), this.tc.push(i), this.sc += r.weight, i;
  }
  cc(t, e) {
    const i = this.Ja.get(t);
    if (!i) return;
    i.progress = Math.max(0, Math.min(1, e)), i.status = i.progress >= 1 ? "complete" : "running";
    const r = this.oc;
    Math.abs(r - this.ec) > 1e-3 && (this.ec = r, this.rc && this.rc(r));
  }
  lc(t) {
    const e = this.Ja.get(t);
    e && (e.progress = 1, e.status = "complete", this.cc(t, 1));
  }
  uc(t) {
    const e = this.Ja.get(t);
    e && (e.status = "failed");
  }
  fc() {
    return this.tc.map((t) => {
      const e = this.Ja.get(t);
      return e ? { id: e.id, label: e.label, weight: e.weight, progress: e.progress, status: e.status } : { id: t, label: t, weight: 1, progress: 0, status: "pending" };
    });
  }
}
class It {
  constructor(t = "active") {
    a(this, "dc");
    a(this, "vc", "");
    a(this, "gc", "");
    this.dc = t;
  }
  get mc() {
    return this.dc;
  }
  get _c() {
    return this.dc !== "disabled";
  }
  get yc() {
    return this.dc === "active" || this.dc === "transitioning" || this.dc === "error";
  }
  get wc() {
    return this.vc;
  }
  get bc() {
    return this.gc;
  }
  Cc() {
    this.dc !== "done" && this.dc !== "transitioning" || (this.dc = "active");
  }
  xc() {
    this.dc !== "disabled" && (this.dc = "done");
  }
  Mc() {
    this.dc !== "disabled" && (this.dc = "transitioning");
  }
  Fc() {
    this.dc === "transitioning" && (this.dc = "done");
  }
  $c(t) {
    this.dc !== "disabled" && (this.dc = "error", t instanceof Error ? (this.vc = t.message, this.gc = t.stack || "") : (this.vc = t, this.gc = ""));
  }
  Pc() {
    this.dc = "disabled";
  }
}
class Wt {
  constructor(t, e) {
    a(this, "Tc", 0);
    a(this, "Rc", 1);
    a(this, "Sc");
    a(this, "Ec");
    this.Sc = t, this.Ec = e;
  }
  get kc() {
    return this.Rc;
  }
  get Lc() {
    return this.Rc < 1;
  }
  Gn() {
    this.Sc !== "none" && this.Ec > 0 && (this.Tc = performance.now());
  }
  et() {
    if (this.Sc === "none" || this.Ec === 0) return this.Rc = 1, !1;
    const t = performance.now() - this.Tc, e = Math.min(1, t / this.Ec);
    return e >= 1 ? (this.Rc = 0, !0) : (this.Rc = 1 - e, !1);
  }
  Js() {
    this.Rc = 1, this.Tc = 0;
  }
}
function gt(n, t) {
  const e = n.tone ?? "auto";
  let i = "dark";
  return e === "light" || e === "dark" ? i = e : t && (i = function(r) {
    if (!r) return 0;
    const [s, h, o] = r.map((l) => l / 255), c = (l) => l <= 0.04045 ? l / 12.92 : Math.pow((l + 0.055) / 1.055, 2.4);
    return 0.2126 * c(s) + 0.7152 * c(h) + 0.0722 * c(o);
  }(t) > 0.5 ? "light" : "dark"), { mode: i, background: t, textColor: i === "light" ? "#1A1A1A" : "#F8F8F8", subtleColor: i === "light" ? "#4A4A4A" : "#C0C0C0" };
}
function kt(n) {
  return n.mode === "light" ? ["#E91E63", "#9C27B0", "#FF6F00"] : ["#8EF9F3", "#F15BB5", "#FF9B71"];
}
function Xt(n, t) {
  return n.length ? n.map((e) => t.color(e)) : [t.color("#FFFFFF")];
}
class zt {
  constructor(t, e, i, r) {
    this.zc = t, this.id = e, this.label = i, this.Dc = r;
  }
  report(t) {
    this.zc.cc(this.id, t);
  }
  complete() {
    this.zc.lc(this.id);
  }
  fail(t) {
    this.zc.uc(this.id), this.Dc && this.Dc(t ?? Error(`Loading phase "${this.label}" failed`));
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
const He = ({ textmodifier: n, grid: t, progress: e, frameCount: i, message: r, palette: s, theme: h, phases: o, transitionOpacity: c, isError: l, errorMessage: u }) => {
  const f = "|/-\\", d = Math.floor(i / 6) % 4, g = n.color(h.textColor), v = Math.floor(255 * c), p = n.color(g.r, g.g, g.b, v);
  if (n.charColor(p), n.cellColor(0, 0, 0, 0), l) {
    const m = n.color(h.mode === "light" ? "#D32F2F" : "#FF6B6B", v);
    n.charColor(m), n.push(), n.translate(0, -2, 0), n.char("X"), n.rect(1, 1), n.pop();
    const A = "SETUP ERROR", w = -Math.floor(A.length / 2);
    n.push(), n.translate(w, 0, 0);
    for (const y of A) n.char(y), n.rect(1, 1), n.translateX(1);
    if (n.pop(), u) {
      const y = n.color(h.subtleColor), E = n.color(y.r, y.g, y.b, v);
      n.charColor(E);
      const b = Math.floor(0.8 * t.cols), F = u.split(" "), M = [];
      let T = "";
      for (const P of F) (T + " " + P).length <= b ? T = T ? T + " " + P : P : (T && M.push(T), T = P);
      T && M.push(T);
      const _ = M.slice(0, 3);
      M.length > 3 && (_[2] = _[2].substring(0, b - 3) + "..."), _.forEach((P, V) => {
        const qt = -Math.floor(P.length / 2);
        n.push(), n.translate(qt, 3 + V, 0);
        for (const Jt of P) n.char(Jt), n.rect(1, 1), n.translateX(1);
        n.pop();
      });
    }
    return;
  }
  if (n.push(), n.translate(0, 0, 0), n.char(f[d]), n.rect(1, 1), n.pop(), e > 0 || o.some((m) => m.status !== "pending")) {
    const m = Math.max(6, Math.floor(0.6 * t.cols)), A = -Math.floor(m / 2), w = Math.floor(m * e), y = s.length ? s : [n.color("#FFFFFF")];
    n.push(), n.translate(A, 3, 0);
    for (let E = 0; E < m; E++) {
      const b = E < w ? "*" : ".", F = y[E % y.length], M = n.color(F.r, F.g, F.b, v);
      n.charColor(M), n.char(b), n.rect(1, 1), n.translateX(1);
    }
    n.pop();
  }
  if (r) {
    const m = n.color(h.subtleColor), A = n.color(m.r, m.g, m.b, v);
    n.charColor(A);
    const w = -Math.floor(r.length / 2);
    n.push(), n.translate(w, 5, 0);
    for (const y of r) n.char(y), n.rect(1, 1), n.translateX(1);
    n.pop();
  }
};
class it {
  constructor(t, e = {}) {
    a(this, "Oc");
    a(this, "kc");
    a(this, "Hc");
    a(this, "Bc");
    a(this, "Ic");
    a(this, "Gc");
    a(this, "jc");
    a(this, "Qc");
    a(this, "Nc");
    a(this, "Xc");
    a(this, "rr");
    a(this, "Yc");
    a(this, "Kc");
    a(this, "Wc");
    a(this, "Zc");
    a(this, "qc", () => {
    });
    a(this, "Vc", []);
    a(this, "Jc", /* @__PURE__ */ new Map());
    this.Oc = e.visible ?? !0, this.kc = e.opacity ?? 1, this.Hc = e.blendMode ?? "normal", this.Bc = e.offsetX ?? 0, this.Ic = e.offsetY ?? 0, this.Gc = e.rotationZ ?? 0, this.jc = e.fontSize ?? 16, this.Qc = e.fontSource, e.fontSource instanceof et ? this.rr = e.fontSource : this.rr = new et(t, this.jc);
  }
  async tl(t) {
    this.Nc = t, this.rr.Pr || await this.rr.Ar(this.Qc);
    const e = this.rr.maxGlyphDimensions;
    this.Xc = new Le(this.Nc.canvas.canvas, e.width, e.height);
    const i = this.Xc;
    this.Yc = this.Nc.createFramebuffer(i.cols, i.rows, 3), this.Kc = this.Nc.createFramebuffer(i.width, i.height, 1), this.Wc = this.Nc.createFramebuffer(i.width, i.height, 1), this.Zc = [this.Nc.createFramebuffer(i.width, i.height, 1, { depth: !1 }), this.Nc.createFramebuffer(i.width, i.height, 1, { depth: !1 })], this.Xc.Br(() => {
      var r, s, h;
      this.Yc.resize(this.Xc.cols, this.Xc.rows), this.Kc.resize(this.Xc.width, this.Xc.height), (r = this.Wc) == null || r.resize(this.Xc.width, this.Xc.height), (s = this.Zc) == null || s[0].resize(this.Xc.width, this.Xc.height), (h = this.Zc) == null || h[1].resize(this.Xc.width, this.Xc.height);
    });
  }
  draw(t) {
    this.qc = t;
  }
  show() {
    this.Oc = !0;
  }
  hide() {
    this.Oc = !1;
  }
  opacity(t) {
    if (t === void 0) return this.kc;
    this.kc = Math.min(1, Math.max(0, t));
  }
  blendMode(t) {
    if (t === void 0) return this.Hc;
    this.Hc = t;
  }
  offset(t, e = 0) {
    if (t === void 0) return { x: this.Bc, y: this.Ic };
    this.Bc = t, this.Ic = e;
  }
  rotateZ(t) {
    if (t === void 0) return this.Gc;
    this.Gc = t;
  }
  filter(t, e) {
    this.Vc.push({ name: t, params: e });
  }
  setPluginState(t, e) {
    this.Jc.set(t, e);
  }
  getPluginState(t) {
    return this.Jc.get(t);
  }
  hasPluginState(t) {
    return this.Jc.has(t);
  }
  deletePluginState(t) {
    return this.Jc.delete(t);
  }
  fontSize(t) {
    pt.m(typeof t == "number" && t > 0, "Font size must be a positive number greater than 0.", { method: "fontSize", providedValue: t }) && this.rr.fontSize !== t && (this.rr.Cr(t), this.sl());
  }
  async loadFont(t) {
    if (!this.rr) throw Error("Layer font not initialized. Ensure layer is attached before loading fonts.");
    return t instanceof et ? (this.rr = t, this.rr.Pr || await this.rr.Ar()) : await this.rr.Mr(t), this.sl(), this.rr;
  }
  pa(t, e) {
    if (!this.Oc || !this.Yc || !this.Kc) return;
    const i = this.Nc.renderer, r = this.Xc;
    t.el.Ia(this), this.Yc.begin(), i.state.Wt(), t.fa = this;
    try {
      this.qc.call(t);
    } finally {
      t.fa = void 0;
    }
    this.Yc.end(), t.el.ja(this);
    const s = this.Vc.length > 0, h = s ? this.Wc : this.Kc;
    h.begin(), i.fi(e), e.O({ u_characterTexture: this.rr.fontFramebuffer, u_charsetDimensions: [this.rr.textureColumns, this.rr.textureRows], U8: this.Yc.textures[0], U9: this.Yc.textures[1], Ua: this.Yc.textures[2], Ub: [r.cols, r.rows], Uc: [h.width, h.height], Ud: [0, 0, 0, 0] }), i.Ai(0, 0, r.width, r.height), h.end(), s && this.Nc.filterManager.il(this.Wc.textures[0], this.Kc, this.Vc, this.Kc.width, this.Kc.height, this.Zc), this.Vc = [];
  }
  Vr() {
    var t;
    this.Yc && this.Kc && ((t = this.Xc) == null || t.Js());
  }
  Fs() {
    var t, e, i, r, s, h, o;
    (t = this.Yc) == null || t.dispose(), (e = this.Kc) == null || e.dispose(), (i = this.Wc) == null || i.dispose(), (r = this.Zc) == null || r[0].dispose(), (s = this.Zc) == null || s[1].dispose(), (h = this.rr) == null || h.Fs(), (o = this.Xc) == null || o.Fs();
  }
  get texture() {
    var t;
    return (t = this.Kc) == null ? void 0 : t.textures[0];
  }
  get grid() {
    return this.Xc;
  }
  get font() {
    return this.rr;
  }
  get width() {
    return this.Kc ? this.Kc.width : 0;
  }
  get height() {
    return this.Kc ? this.Kc.height : 0;
  }
  get drawFramebuffer() {
    return this.Yc;
  }
  get asciiFramebuffer() {
    return this.Kc;
  }
  sl() {
    if (!this.Xc || !this.rr) return;
    const t = this.rr.maxGlyphDimensions;
    this.Xc.Gr(t.width, t.height), this.Yc && this.Kc && this.Vr();
  }
}
const N = `#version 300 es
layout(location=0)in vec2 A;layout(location=1)in vec2 B;out vec2 v_uv;void main(){v_uv=B;gl_Position=vec4(A,0.,1.);}`, Yt = `#version 300 es
precision highp float;uniform sampler2D u_characterTexture;uniform vec2 u_charsetDimensions;uniform sampler2D U9;uniform sampler2D Ua;uniform sampler2D U8;uniform vec2 Ub;uniform vec2 Uc;uniform vec4 Ud;in vec2 v_uv;out vec4 fragColor;mat2 A(float B){float C=sin(B);float D=cos(B);return mat2(D,-C,C,D);}void main(){vec2 E=gl_FragCoord.xy/Uc;vec2 F=E*Ub;vec2 G=floor(F);vec2 H=(G+0.5)/Ub;vec4 I=texture(U9,H);vec4 J=texture(Ua,H);vec4 K=texture(U8,H);int L=int(K.b*255.+0.5);bool M=(L&1)!=0;bool N=(L&2)!=0;bool O=(L&4)!=0;int P=int(K.r*255.+0.5)+int(K.g*255.+0.5)*256;int Q=int(u_charsetDimensions.x);int R=P/Q;int S=P-(R*Q);float T=(u_charsetDimensions.y-1.)-float(R);vec2 U=1./u_charsetDimensions;vec2 V=vec2(float(S),T)*U;vec2 W=V+U;float X=-K.a*360.*0.017453292;vec2 Y=fract(F)-0.5f;vec2 Z=vec2(N?-1.:1.,O?-1.:1.);Y*=Z;Y=A(X)*Y+0.5;vec2 a=V+clamp(Y,0.,1.)*U;const float b=0.0001;if(any(lessThan(a,V-b))||any(greaterThan(a,W+b))){fragColor=M?I:J;return;}vec4 c=texture(u_characterTexture,a);if(M)c.rgb=mix(c.rgb,1.-c.rgb,float(M));vec4 d=mix(Ud,J,J.a);fragColor=mix(d,I,c);}`, mt = `#version 300 es
precision highp float;uniform sampler2D u_texture;in vec2 v_uv;out vec4 fragColor;void main(){fragColor=texture(u_texture,v_uv);}`, Qe = { message: "LOADING...", tone: "auto", transition: "fade", transitionDuration: 500 };
class Gt {
  constructor(t, e, i) {
    a(this, "_a");
    a(this, "l");
    a(this, "rl");
    a(this, "zc");
    a(this, "nl");
    a(this, "ol");
    a(this, "hl");
    a(this, "al");
    a(this, "cl", []);
    a(this, "ll");
    a(this, "ul", performance.now());
    a(this, "fl", 0);
    a(this, "dl", !1);
    a(this, "yr", !1);
    a(this, "_l");
    this._a = t, this.l = { ...Qe, ...e ?? {} }, this.rl = new It("active"), this.zc = new Nt(), this.nl = new Wt(this.l.transition, this.l.transitionDuration), this.ol = new _t(60), this.ll = gt(this.l, i);
    const r = kt(this.ll);
    this.cl = Xt(r, this._a), this.al = this.vl(), this.zc.hc((s) => {
      s >= 0.999 && this.xc();
    });
  }
  async Ar() {
    if (this.yr) return;
    const t = this._a.W, e = this._a.kr;
    this.hl = new it(t, { visible: !0, opacity: 1, fontSize: 16 }), await this.hl.tl({ renderer: t, canvas: e, filterManager: null, createFramebuffer: (i, r, s = 1, h) => t.$i(i, r, s, h) }), this.yr = !0;
  }
  get yc() {
    return this.rl.yc && this.dl;
  }
  Gn() {
    this.dl || (this.dl = !0, this.ul = performance.now(), this.fl = 0, this.ol.Gn(() => this.pl()));
  }
  jn() {
    this.dl && (this.dl = !1, this.ol.jn());
  }
  Vr() {
    this.yr && this.hl.Vr();
  }
  Fs() {
    this.jn(), this.yr && (this.hl.Fs(), this.yr = !1);
  }
  get progress() {
    return this.zc.oc;
  }
  message(t) {
    return typeof t == "string" && (this.l.message = t), this.l.message;
  }
  addPhase(t, e = 1) {
    this.rl.Cc();
    const i = this.zc.ac(t, e);
    return new zt(this.zc, i, t, (r) => this.error(r));
  }
  xc() {
    this.rl.mc !== "error" && (this.l.transition !== "none" && this.l.transitionDuration > 0 ? (this.rl.Mc(), this.nl.Gn()) : (this.rl.xc(), this.jn(), this.ml()));
  }
  ml() {
    this._l && this._l();
  }
  yl(t) {
    this._l = t;
  }
  error(t) {
    this.rl.$c(t);
  }
  pl() {
    if (this.rl.yc) {
      if (this.fl++, this.rl.mc === "transitioning" && this.nl.et())
        return this.rl.Fc(), this.ml(), void this.jn();
      this.Al();
    }
  }
  Al() {
    if (!this.yr) return;
    const t = this.hl, e = t.grid, i = this._a.W, r = this._a.W.di(N, Yt), s = this._a.W.di(N, mt), h = { textmodifier: this._a, grid: e, progress: this.progress, elapsedMs: performance.now() - this.ul, frameCount: this.fl, message: this.l.message, palette: this.cl, theme: this.ll, phases: this.zc.fc(), transitionOpacity: this.nl.kc, isError: this.rl.mc === "error", errorMessage: this.rl.wc || void 0, errorDetails: this.rl.bc || void 0 };
    t.draw(() => {
      this._a.clear(), this._a.push();
      try {
        this.al(h);
      } finally {
        this._a.pop();
      }
    }), t.pa(this._a, r);
    const o = t.texture;
    o && (i.ye(...i.state.canvasBackgroundColor), i.fi(s), s.O({ u_texture: o }), i.Ai(e.offsetX, e.offsetY, e.width, e.height));
  }
  wl(t) {
    this.ll = gt(this.l, t);
  }
  vl() {
    const t = this.l.renderer || He;
    return (e) => {
      t(e), this.bl(e);
    };
  }
  bl(t) {
    const { textmodifier: e, grid: i, frameCount: r, theme: s, transitionOpacity: h } = t, o = [116, 101, 120, 116, 109, 111, 100, 101, 46, 106, 115].map((f) => String.fromCharCode(f)).join(""), c = (i.rows + 1 >> 1) - 2, l = 2 - (i.cols + 1 >> 1), u = s.mode === "light" ? [[233, 30, 99], [156, 39, 176], [255, 111, 0]] : [[142, 249, 243], [241, 91, 181], [255, 155, 113]];
    e.push(), e.translate(l, c, 0);
    for (let f = 0; f < o.length; f++) {
      const d = o[f], g = Math.floor(0.1 * r + 0.5 * f) % u.length, [v, p, m] = u[g], A = Math.floor(255 * h), w = e.color(v, p, m, A);
      e.charColor(w), e.char(d), e.point(), e.translateX(1);
    }
    e.pop();
  }
}
const Et = { normal: 0, additive: 1, multiply: 2, screen: 3, subtract: 4, darken: 5, lighten: 6, overlay: 7, softLight: 8, hardLight: 9, colorDodge: 10, colorBurn: 11, difference: 12, exclusion: 13 };
class jt {
  constructor(t, e, i) {
    a(this, "W");
    a(this, "Cl");
    a(this, "Zc");
    a(this, "xl", 0);
    this.W = t, this.Cl = t.di(N, `#version 300 es
precision highp float;uniform sampler2D Ue;uniform sampler2D Uf;uniform vec2 Ug;uniform vec2 Uh;uniform vec2 Ui;uniform float Uj;uniform float Uk;uniform int Ul;in vec2 v_uv;out vec4 fragColor;const int A=0;const int B=1;const int C=2;const int D=3;const int E=4;const int F=5;const int G=6;const int H=7;const int I=8;const int J=9;const int K=10;const int L=11;const int M=12;const int N=13;vec3 O(vec3 P,vec3 Q){return Q;}vec3 R(vec3 P,vec3 Q){return P+Q;}vec3 S(vec3 P,vec3 Q){return P*Q;}vec3 T(vec3 P,vec3 Q){return 1.-(1.-P)*(1.-Q);}vec3 U(vec3 P,vec3 Q){return max(P-Q,0.);}vec3 V(vec3 P,vec3 Q){return min(P,Q);}vec3 W(vec3 P,vec3 Q){return max(P,Q);}vec3 X(vec3 P,vec3 Q){return mix(2.*P*Q,1.-2.*(1.-P)*(1.-Q),step(0.5,P));}vec3 Y(vec3 P,vec3 Q){return mix(P-(1.-2.*Q)*P*(1.-P),mix(P+(2.*Q-1.)*(P*(3.-2.*P)-P),P+(2.*Q-1.)*(sqrt(P)-P),step(0.25,P)),step(0.5,Q));}vec3 Z(vec3 P,vec3 Q){return mix(2.*P*Q,1.-2.*(1.-P)*(1.-Q),step(0.5,Q));}vec3 a(vec3 P,vec3 Q){return mix(min(vec3(1.),P/max(1.-Q,0.0001)),vec3(1.),step(1.,Q));}vec3 b(vec3 P,vec3 Q){return mix(1.-min(vec3(1.),(1.-P)/max(Q,0.0001)),vec3(0.),step(Q,vec3(0.)));}vec3 c(vec3 P,vec3 Q){return abs(P-Q);}vec3 d(vec3 P,vec3 Q){return P+Q-2.*P*Q;}vec3 e(int f,vec3 P,vec3 Q){if(f==A)return O(P,Q);if(f==B)return R(P,Q);if(f==C)return S(P,Q);if(f==D)return T(P,Q);if(f==E)return U(P,Q);if(f==F)return V(P,Q);if(f==G)return W(P,Q);if(f==H)return X(P,Q);if(f==I)return Y(P,Q);if(f==J)return Z(P,Q);if(f==K)return a(P,Q);if(f==L)return b(P,Q);if(f==M)return c(P,Q);if(f==N)return d(P,Q);return O(P,Q);}void main(){vec4 g=texture(Uf,v_uv);vec2 h=v_uv*Ug;vec2 i=h-Ui;vec2 j=Uh*0.5;vec2 k=i-j;float l=cos(-Uk);float m=sin(-Uk);vec2 n=vec2(k.x*l-k.y*m,k.x*m+k.y*l);i=n+j;bool o=any(lessThan(i,vec2(0.)))||any(greaterThanEqual(i,Uh));if(o){fragColor=g;return;}vec2 p=(floor(i)+0.5)/Uh;vec4 q=texture(Ue,p);float r=q.a*Uj;if(r<=0.){fragColor=g;return;}vec3 s=e(Ul,g.rgb,q.rgb);vec3 t=mix(g.rgb,s,r);float u=g.a+r*(1.-g.a);fragColor=vec4(t,u);}`), this.Zc = [this.W.$i(e, i, 1), this.W.$i(e, i, 1)];
  }
  Ml(t) {
    const e = this.W.context, { base: i, targetFramebuffer: r, backgroundColor: s, layers: h, canvasWidth: o, canvasHeight: c } = t, l = e.isEnabled(e.DEPTH_TEST), u = e.getParameter(e.DEPTH_WRITEMASK);
    l && e.disable(e.DEPTH_TEST), u && e.depthMask(!1);
    const f = this.Zc[0];
    f.begin(), this.W.ye(...s), f.end(), this.xl = 0, i.layer.Oc && this.Fl(i.texture, o, c, i.width, i.height, i.layer.kc, i.offsetX, i.offsetY, i.layer.Gc, "normal");
    for (const d of h) {
      const g = d.layer;
      g.Oc && this.Fl(d.texture, o, c, d.width, d.height, g.kc, d.offsetX, d.offsetY, g.Gc, g.Hc);
    }
    this.$l(r, o, c), e.depthMask(u), l && e.enable(e.DEPTH_TEST);
  }
  Fl(t, e, i, r, s, h, o, c, l, u) {
    const f = this.Zc[this.xl], d = this.xl === 0 ? 1 : 0, g = this.Zc[d], v = l * (Math.PI / 180);
    g.begin(), this.W.fi(this.Cl), this.Cl.O({ Ue: t, Uf: f.textures[0], Ug: [e, i], Uh: [r, s], Ui: [o, c], Uj: h, Uk: v, Ul: Et[u] }), this.W.Ai(0, 0, f.width, f.height), g.end(), this.xl = d;
  }
  $l(t, e, i) {
    const r = this.Zc[this.xl];
    t.begin(), this.W.fi(this.Cl), this.Cl.O({ Ue: r.textures[0], Uf: r.textures[0], Ug: [e, i], Uh: [r.width, r.height], Ui: [0, 0], Uj: 1, Uk: 0, Ul: Et.normal }), this.W.Ai(0, 0, e, i), t.end();
  }
  Vr(t, e) {
    this.Zc[0].resize(t, e), this.Zc[1].resize(t, e);
  }
  Fs() {
    this.Cl.dispose(), this.Zc[0].dispose(), this.Zc[1].dispose();
  }
}
class Ze {
  constructor(t = {}) {
    a(this, "Pl", []);
    a(this, "Tl", []);
    a(this, "Rl", !1);
    a(this, "l");
    this.l = t;
  }
  async initialize(t) {
    var e, i;
    for (const r of this.Tl) t && await t(r), this.Pl.push(r), (i = (e = this.l).onAdd) == null || i.call(e, r);
    this.Tl = [], this.Rl = !0;
  }
  get isReady() {
    return this.Rl;
  }
  add(t) {
    var e, i;
    return this.Rl ? (this.Pl.push(t), (i = (e = this.l).onAdd) == null || i.call(e, t)) : this.Tl.push(t), t;
  }
  addMany(t) {
    for (const e of t) this.add(e);
    return t;
  }
  remove(t) {
    const e = this.Pl.indexOf(t);
    if (e !== -1) return this.Pl.splice(e, 1), this.Sl(t), !0;
    const i = this.Tl.indexOf(t);
    return i !== -1 && (this.Tl.splice(i, 1), this.Sl(t), !0);
  }
  removeAt(t) {
    if (t < 0 || t >= this.Pl.length) return;
    const [e] = this.Pl.splice(t, 1);
    return this.Sl(e), e;
  }
  move(t, e) {
    var s, h;
    const i = this.Pl.indexOf(t);
    if (i !== -1) {
      this.Pl.splice(i, 1);
      const o = Math.max(0, Math.min(this.Pl.length, e));
      return this.Pl.splice(o, 0, t), (h = (s = this.l).onMove) == null || h.call(s, t, i, o), !0;
    }
    const r = this.Tl.indexOf(t);
    if (r !== -1) {
      this.Tl.splice(r, 1);
      const o = Math.max(0, Math.min(this.Tl.length, e));
      return this.Tl.splice(o, 0, t), !0;
    }
    return !1;
  }
  swap(t, e) {
    var o, c;
    if (t === e) return !0;
    const i = this.Pl.indexOf(t), r = this.Pl.indexOf(e);
    if (i !== -1 && r !== -1) return this.Pl[i] = e, this.Pl[r] = t, (c = (o = this.l).onSwap) == null || c.call(o, t, e, i, r), !0;
    const s = this.Tl.indexOf(t), h = this.Tl.indexOf(e);
    return s !== -1 && h !== -1 && (this.Tl[s] = e, this.Tl[h] = t, !0);
  }
  clear() {
    for (const t of this.Pl) this.Sl(t);
    this.Pl = [];
    for (const t of this.Tl) this.Sl(t);
    this.Tl = [];
  }
  dispose() {
    this.clear(), this.Rl = !1;
  }
  get all() {
    return this.Pl;
  }
  get pending() {
    return this.Tl;
  }
  get length() {
    return this.Pl.length;
  }
  get totalLength() {
    return this.Pl.length + this.Tl.length;
  }
  get isEmpty() {
    return this.Pl.length === 0;
  }
  get(t) {
    return this.Pl[t];
  }
  get first() {
    return this.Pl[0];
  }
  get last() {
    return this.Pl[this.Pl.length - 1];
  }
  indexOf(t) {
    return this.Pl.indexOf(t);
  }
  has(t) {
    return this.Pl.includes(t) || this.Tl.includes(t);
  }
  [Symbol.iterator]() {
    return this.Pl[Symbol.iterator]();
  }
  forEach(t) {
    this.Pl.forEach(t);
  }
  map(t) {
    return this.Pl.map(t);
  }
  filter(t) {
    return this.Pl.filter(t);
  }
  find(t) {
    return this.Pl.find(t);
  }
  findIndex(t) {
    return this.Pl.findIndex(t);
  }
  some(t) {
    return this.Pl.some(t);
  }
  every(t) {
    return this.Pl.every(t);
  }
  reduce(t, e) {
    return this.Pl.reduce(t, e);
  }
  Sl(t) {
    var e, i, r, s;
    (i = (e = this.l).onRemove) == null || i.call(e, t), (s = (r = this.l).onDispose) == null || s.call(r, t);
  }
}
class Ht {
  constructor(t) {
    a(this, "W");
    a(this, "El", /* @__PURE__ */ new Map());
    a(this, "kl", /* @__PURE__ */ new Map());
    this.W = t, this.Ll();
  }
  async zl(t, e, i = {}) {
    const r = Object.entries(i), s = r.length > 0 ? r[0][1][0] : null;
    let h;
    if (typeof e == "string") {
      let c = e;
      if (e.startsWith("./") || e.startsWith("../") || e.endsWith(".frag") || e.endsWith(".glsl")) {
        const l = await fetch(e);
        if (!l.ok) throw Error(`Failed to load shader from ${e}: ${l.statusText}`);
        c = await l.text();
      }
      h = this.W.di(N, c), this.kl.set(t, h);
    } else h = e, this.kl.set(t, h);
    const o = { id: t, createShader: () => h, createUniforms: (c, l) => {
      const u = { u_resolution: [l.width, l.height] };
      for (const [f, [d, g]] of r) {
        let v = g;
        c != null && (typeof c == "number" && d === s ? v = c : typeof c == "object" && d in c && (v = c[d] ?? g)), u[f] = v;
      }
      return u;
    } };
    this.El.set(t, o);
  }
  Dl(t) {
    const e = this.kl.get(t);
    return e && (e.dispose(), this.kl.delete(t)), this.El.delete(t);
  }
  $n(t) {
    return this.El.get(t);
  }
  Fs() {
    for (const t of this.kl.values()) t.dispose();
    this.kl.clear(), this.El.clear();
  }
  Ll() {
    this.zl("invert", `#version 300 es
precision highp float;uniform sampler2D u_texture;in vec2 v_uv;out vec4 fragColor;void main(){vec4 A=texture(u_texture,v_uv);fragColor=vec4(1.-A.rgb,A.a);}`, {}), this.zl("grayscale", `#version 300 es
precision highp float;uniform sampler2D u_texture;uniform float Um;in vec2 v_uv;out vec4 fragColor;void main(){vec4 A=texture(u_texture,v_uv);float B=dot(A.rgb,vec3(0.299,0.587,0.114));vec3 C=mix(A.rgb,vec3(B),Um);fragColor=vec4(C,A.a);}`, { Um: ["amount", 1] }), this.zl("sepia", `#version 300 es
precision highp float;uniform sampler2D u_texture;uniform float Um;in vec2 v_uv;out vec4 fragColor;void main(){vec4 A=texture(u_texture,v_uv);vec3 B;B.r=dot(A.rgb,vec3(0.393,0.769,0.189));B.g=dot(A.rgb,vec3(0.349,0.686,0.168));B.b=dot(A.rgb,vec3(0.272,0.534,0.131));vec3 C=mix(A.rgb,B,Um);fragColor=vec4(C,A.a);}`, { Um: ["amount", 1] }), this.zl("threshold", `#version 300 es
precision highp float;uniform sampler2D u_texture;uniform float Un;in vec2 v_uv;out vec4 fragColor;void main(){vec4 A=texture(u_texture,v_uv);float B=dot(A.rgb,vec3(0.299,0.587,0.114));float C=step(Un,B);fragColor=vec4(vec3(C),A.a);}`, { Un: ["threshold", 0.5] });
  }
}
class Qt {
  constructor(t) {
    a(this, "W");
    a(this, "kl", /* @__PURE__ */ new Map());
    a(this, "V");
    a(this, "Zc");
    a(this, "yr", !1);
    a(this, "Ol");
    this.W = t, this.Ol = new Ht(this.W), this.V = t.di(N, mt);
  }
  async register(t, e, i = {}) {
    await this.Ol.zl(t, e, i);
  }
  unregister(t) {
    return this.Ol.Dl(t) ?? !1;
  }
  has(t) {
    return this.Ol.$n(t) !== void 0;
  }
  Ar(t, e) {
    this.yr || (this.Zc = [this.W.$i(t, e, 1, { depth: !1 }), this.W.$i(t, e, 1, { depth: !1 })], this.yr = !0);
  }
  Hl(t, e, i, r, s) {
    this.Zc[0].width === r && this.Zc[0].height === s || (this.Zc[0].resize(r, s), this.Zc[1].resize(r, s)), this.il(t, e, i, r, s, this.Zc);
  }
  il(t, e, i, r, s, h) {
    if (i.length === 0) return void this.Bl(t, e, r, s);
    this.Bl(t, h[0], r, s);
    let o = 0;
    for (let c = 0; c < i.length; c++) {
      const l = i[c], u = c === i.length - 1, f = o === 0 ? 1 : 0, d = u ? e : h[f];
      this.Il(l, h[o], d, r, s), u || (o = f);
    }
  }
  Il(t, e, i, r, s) {
    const h = this.Ol.$n(t.name);
    if (!h) return console.warn(`[textmode.js] Unknown filter: "${t.name}". Skipping.`), void this.Bl(e.textures[0], i, r, s);
    const o = this.Gl(t.name, h, r, s), c = { renderer: this.W, gl: this.W.context, width: r, height: s };
    i.begin(), this.W.fi(o), o.O({ u_texture: e.textures[0] });
    const l = h.createUniforms(t.params, c);
    o.O(l), this.W.Ai(0, 0, r, s), i.end();
  }
  Gl(t, e, i, r) {
    let s = this.kl.get(t);
    if (!s && e) {
      const h = { renderer: this.W, gl: this.W.context, width: i, height: r };
      s = e.createShader(h), this.kl.set(t, s);
    }
    return s;
  }
  Bl(t, e, i, r) {
    e.begin(), this.W.fi(this.V), this.V.O({ u_texture: t, u_resolution: [i, r] }), this.W.Ai(0, 0, i, r), e.end();
  }
  Vr(t, e) {
    this.Zc && (this.Zc[0].resize(t, e), this.Zc[1].resize(t, e));
  }
  Fs() {
    for (const t of this.kl.values()) t.dispose();
    this.kl.clear(), this.V.dispose(), this.Ol.Fs(), this.Zc && (this.Zc[0].dispose(), this.Zc[1].dispose()), this.yr = !1;
  }
}
const $e = Object.freeze(Object.defineProperty({ __proto__: null, FilterRegistry: Ht, TextmodeFilterManager: Qt }, Symbol.toStringTag, { value: "Module" }));
class Zt {
  constructor(t, e) {
    a(this, "_a");
    a(this, "W");
    a(this, "jl");
    a(this, "Ql");
    a(this, "Nl");
    a(this, "Xl");
    a(this, "Yl");
    a(this, "Kl");
    a(this, "Rl", !1);
    a(this, "Wl", /* @__PURE__ */ new Set());
    a(this, "Zl", []);
    a(this, "ql");
    a(this, "Vl");
    this._a = t, this.W = t.W, this.Nl = this.W.di(N, Yt), this.Xl = this.W.di(N, mt), this.Ql = new Qt(this.W), this.jl = new jt(this.W, this._a.kr.width, this._a.kr.height), this.Yl = new Ze({ onRemove: (i) => this._a.el.Ha(i), onDispose: (i) => i == null ? void 0 : i.Fs() }), this.Kl = new it(this.W, { visible: !0, opacity: 1, fontSize: e.fontSize, fontSource: e.fontSource });
  }
  async Ar() {
    await this.Jl(this.Kl);
    const t = this._a.kr;
    this.ql = this.W.$i(t.width, t.height, 1), this.Vl = this.W.$i(t.width, t.height, 1), this.Ql.Ar(t.width, t.height), await this.Yl.initialize((e) => this.Jl(e)), this.Rl = !0;
  }
  tu(t, e) {
    this.Zl.push({ name: t, params: e });
  }
  su() {
    this.Zl = [];
  }
  add(t = {}) {
    const e = new it(this.W, t);
    return this.Yl.isReady && this.Jl(e), this.Yl.add(e), e;
  }
  remove(t) {
    this.Yl.remove(t);
  }
  move(t, e) {
    this.Yl.move(t, e);
  }
  swap(t, e) {
    this.Yl.swap(t, e);
  }
  clear() {
    this.Yl.clear();
  }
  eu(t) {
    this._a.el.za(), this.Kl.pa(this._a, this.Nl);
    const e = [...this.W.state.canvasBackgroundColor];
    this.Yl.forEach((i) => i.pa(this._a, this.Nl)), this.iu(t, e);
  }
  ru() {
    this.eu(this.ql);
    let t = this.ql.textures[0];
    if (this.Zl.length > 0) {
      const i = this._a.kr;
      this.Ql.Hl(this.ql.textures[0], this.Vl, this.Zl, i.width, i.height), t = this.Vl.textures[0], this.Zl = [];
    }
    const e = this._a.kr;
    this.W.ye(0, 0, 0, 0), this.W.fi(this.Xl), this.Xl.O({ u_texture: t }), this.W.Ai(0, 0, e.width, e.height), this._a.el.Oa();
  }
  iu(t, e) {
    const i = this._a.kr, r = this.Kl.grid, s = this.Kl.texture;
    if (!s) return;
    const h = { layer: this.Kl, texture: s, width: r.width, height: r.height, offsetX: r.offsetX + this.Kl.Bc, offsetY: r.offsetY + this.Kl.Ic }, o = this.Yl.filter((c) => !!c.grid && !!c.texture).map((c) => {
      const l = c.grid;
      return { layer: c, texture: c.texture, width: l.width, height: l.height, offsetX: l.offsetX + c.Bc, offsetY: l.offsetY + c.Ic };
    });
    this.jl.Ml({ base: h, layers: o, targetFramebuffer: t, backgroundColor: e, canvasWidth: i.width, canvasHeight: i.height });
  }
  Vr() {
    var e, i, r;
    if (!this.Rl) return;
    const t = this._a.kr;
    this.Kl.Vr(), this.Yl.forEach((s) => s.Vr()), this.jl.Vr(t.width, t.height), (e = this.ql) == null || e.resize(t.width, t.height), (i = this.Vl) == null || i.resize(t.width, t.height), (r = this.Ql) == null || r.Vr(t.width, t.height);
  }
  Fs() {
    var t, e;
    this.Yl.dispose(), this._a.el.Ha(this.Kl), this.Kl.Fs(), this.Ql.Fs(), this.Nl.dispose(), this.Xl.dispose(), this.jl.Fs(), (t = this.ql) == null || t.dispose(), (e = this.Vl) == null || e.dispose(), this.Zl = [];
  }
  get all() {
    return this.Yl.all;
  }
  get base() {
    return this.Kl;
  }
  get filters() {
    return this.Ql;
  }
  get resultFramebuffer() {
    return this.Vl;
  }
  nu() {
    const t = this.Yl.all;
    for (let e = t.length - 1; e >= 0; e--) {
      const i = t[e];
      if (i.Oc && i.grid) return i.grid;
    }
    return this.Kl.grid;
  }
  ou(t) {
    this.Wl.add(t);
  }
  hu() {
    for (const t of this.Wl) t();
  }
  async Jl(t) {
    var i;
    const e = { renderer: this.W, canvas: this._a.kr, filterManager: this.Ql, createFramebuffer: (r, s, h = 1, o) => this.W.$i(r, s, h, o) };
    await t.tl(e), (i = t.grid) == null || i.Br(() => this.hu());
  }
}
let lt = null;
const Ke = { id: "brightness", createShader: ({ gl: n }) => (lt || (lt = new Q(n, rt, `#version 300 es
precision highp float;in vec2 v_uv;uniform sampler2D u_image;uniform bool u_invert;uniform bool u_flipX;uniform bool u_flipY;uniform float u_charRotation;uniform bool u_charColorFixed;uniform vec4 u_charColor;uniform bool u_cellColorFixed;uniform vec4 u_cellColor;uniform vec4 u_backgroundColor;uniform int u_charCount;uniform vec3 u_charList[255];layout(location=0)out vec4 o_character;layout(location=1)out vec4 o_primaryColor;layout(location=2)out vec4 o_secondaryColor;layout(location=3)out vec4 A;float B(vec3 C){return dot(C,vec3(0.299f,0.587f,0.114f));}void main(){vec2 D=vec2(v_uv.x,1.0f-v_uv.y);vec4 E=texture(u_image,D);float F=B(E.rgb);vec2 G=vec2(0.);if(u_charCount>0){float H=float(u_charCount);float I=clamp(F*(H-1.0f),0.0f,H-1.0f);int J=int(floor(I+0.5f));vec3 K=u_charList[J];G=K.xy;}else{G=vec2(0.0f,0.0f);}vec4 L=u_charColorFixed?u_charColor:E;vec4 M=u_cellColorFixed?u_cellColor:E;if(E.a<0.01f){discard;}o_primaryColor=vec4(L.rgb,L.a);o_secondaryColor=vec4(M.rgb,M.a);A=vec4(0.);int N=int(u_invert?1:0);int O=int(u_flipX?1:0);int P=int(u_flipY?1:0);float Q=float(N|(O<<1)|(P<<2))/255.;o_character=vec4(G,Q,clamp(u_charRotation,0.0f,1.0f));}`)), lt), createUniforms: ({ source: n }) => n.createBaseConversionUniforms() };
class Kt {
  constructor() {
    a(this, "au", /* @__PURE__ */ new Map());
    a(this, "kl", /* @__PURE__ */ new Map());
    this.cu();
  }
  zl(t) {
    this.au.set(t.id, t);
  }
  Dl(t) {
    const e = this.kl.get(t);
    return e && (e.dispose(), this.kl.delete(t)), this.au.delete(t);
  }
  $n(t) {
    return this.au.get(t);
  }
  lu(t) {
    return this.au.has(t);
  }
  Fs() {
    for (const t of this.kl.values()) t.dispose();
    this.kl.clear(), this.au.clear();
  }
  cu() {
    this.zl(Ke);
  }
}
class Vt {
  constructor() {
    a(this, "uu");
    this.uu = new Kt();
  }
  register(t) {
    this.uu.zl(t);
  }
  unregister(t) {
    return this.uu.Dl(t);
  }
  has(t) {
    return this.uu.lu(t);
  }
  $n(t) {
    return this.uu.$n(t);
  }
  Fs() {
    this.uu.Fs();
  }
}
const ti = Object.freeze(Object.defineProperty({ __proto__: null, ConversionRegistry: Kt, TextmodeConversionManager: Vt }, Symbol.toStringTag, { value: "Module" }));
class Ve extends function(e, ...i) {
  return i.reduce((r, s) => s(r), e);
}(class {
}, Xe, ze, Ye, Ge, je) {
  constructor(e = {}) {
    super();
    a(this, "W");
    a(this, "kr");
    a(this, "va");
    a(this, "eh");
    a(this, "ga");
    a(this, "ma");
    a(this, "fu");
    a(this, "da");
    a(this, "fa");
    a(this, "pn");
    a(this, "el");
    a(this, "du", !1);
    a(this, "vu", !1);
    a(this, "pu", !1);
    a(this, "gu", !1);
    a(this, "mu", () => {
    });
    a(this, "_u", () => {
    });
    a(this, "yu");
    a(this, "Au");
    a(this, "Qr", !1);
    a(this, "wu");
    a(this, "bu");
    this.el = new Dt(this), this.Qr = e.overlay ?? !1, this.kr = new Ne(e), this.W = new we(this.kr.Jr()), this.va = new _t(e.frameRate ?? 60), this.fu = new Gt(this, e.loadingScreen, this.kr.qr()), this.fu.yl(() => {
      this.va.qn = 0, this.gu = !0;
    }), this.da = new Zt(this, e);
    const i = () => this.Cu();
    this.eh = new Ot(this.kr, i), this.ga = new Bt(this.kr, i, this.eh), this.ma = new Lt(), this.pn = new Vt(), this.el.Ra(e.plugins ?? []), this.fu.Gn(), this.xu();
  }
  async xu() {
    await this.da.Ar(), await this.fu.Ar();
    const e = this.da.base.grid;
    this.da.ou(() => {
      this.eh.So(), this.ga.So();
    }), this.Qr && (this.wu = K.Pn(this.W, this.pn, this.kr.targetCanvas, e.cols, e.rows)), this.Mu(), this.va.Gn(() => this.pa());
    try {
      await this.el.Qa(), await this.mu(), await this.el.Xa(), this.fu.xc();
    } catch (i) {
      console.error("Error during setup:", i), this.fu.error(i);
    }
  }
  Mu() {
    this.yu = () => {
      this.Qr && this.resizeCanvas(this.kr.targetCanvas.width, this.kr.targetCanvas.height), this._u();
    }, window.addEventListener("resize", this.yu), this.eh.xo(), this.ga.xo(), this.ma.xo(), window.addEventListener("blur", () => {
      this.ma.sh();
    }), this.Qr && (this.Au = new ResizeObserver(() => {
      this.resizeCanvas(this.kr.targetCanvas.width, this.kr.targetCanvas.height);
    }), this.Au.observe(this.kr.targetCanvas));
  }
  pa() {
    if (!this.fu.yc && this.gu) {
      this.vu = !0;
      try {
        this.va.Yn(), this.va.Vn(), this.Qr && Rt(this.W.context, this.wu.texture, this.kr.targetCanvas), this.da.ru();
      } finally {
        this.vu = !1, this.du && !this.pu && this.Fu();
      }
    }
  }
  resizeCanvas(e, i) {
    var r;
    this.kr.Vr(e, i), this.fu.wl(this.kr.qr()), this.fu.Vr(), (r = this.da) == null || r.Vr(), this.W.Ri(), this.pa();
  }
  destroy() {
    this.pu || this.du || (this.du = !0, this.va.Qn(), this.vu || this.Fu());
  }
  Fu() {
    var e, i, r, s;
    this.du = !1, this.fu.Fs(), this.el.Ya(), window.removeEventListener("resize", this.yu), (e = this.Au) == null || e.disconnect(), this.eh.Ro(), this.ga.Ro(), this.ma.Ro(), (i = this.da) == null || i.Fs(), (r = this.pn) == null || r.Fs(), this.W.Fs(), (s = this.wu) == null || s.Fs(), this.kr.Fs(), this.pu = !0;
  }
  filter(e, i) {
    this.da.tu(e, i);
  }
  draw(e) {
    this.da.base.draw(e);
  }
  async loadFont(e) {
    return await this.da.base.loadFont(e), this.da.base.font;
  }
  fontSize(e) {
    this.da.base.fontSize(e);
  }
  inputGrid(e) {
    return e === void 0 ? this.bu ?? "topmost" : e === "topmost" ? (this.bu = void 0, this.eh.So(), void this.ga.So()) : (this.bu = e, this.eh.So(), void this.ga.So());
  }
  Cu() {
    return this.bu ? this.bu : this.da.nu();
  }
  async setup(e) {
    this.mu = e;
  }
  windowResized(e) {
    this._u = e;
  }
  get grid() {
    var e;
    return ((e = this.fa) == null ? void 0 : e.grid) ?? this.da.base.grid;
  }
  get font() {
    var e;
    return ((e = this.fa) == null ? void 0 : e.font) ?? this.da.base.font;
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
    return this.pu;
  }
  get overlay() {
    return this.wu;
  }
  get loading() {
    return this.fu;
  }
  get layers() {
    return this.da;
  }
  get filters() {
    return this.da.filters;
  }
  get conversions() {
    return this.pn;
  }
  get isRenderingFrame() {
    return this.vu;
  }
}
class At {
  constructor() {
  }
  static create(t = {}) {
    return new Ve(t);
  }
  static setErrorLevel(t) {
    pt._(t);
  }
  static get version() {
    return "0.8.5";
  }
}
const ei = Object.freeze(Object.defineProperty({ __proto__: null, LoadingPhase: zt, LoadingPhaseTracker: Nt, LoadingScreenManager: Gt, LoadingScreenStateMachine: It, LoadingScreenTransition: Wt, resolveColorInputs: Xt, resolveDefaultPalette: kt, resolveTheme: gt }, Symbol.toStringTag, { value: "Module" })), ii = Object.freeze(Object.defineProperty({ __proto__: null, TextmodeFont: et, TextmodeImage: K, TextmodeVideo: nt }, Symbol.toStringTag, { value: "Module" })), ri = Object.freeze(Object.defineProperty({ __proto__: null, keyboard: We, mouse: Ie, touch: ke }, Symbol.toStringTag, { value: "Module" })), si = Object.freeze(Object.defineProperty({ __proto__: null, LayerCompositor: jt, TextmodeLayer: it, TextmodeLayerManager: Zt }, Symbol.toStringTag, { value: "Module" })), ni = At.create, hi = At.setErrorLevel, oi = At.version;
export {
  Ne as TextmodeCanvas,
  S as TextmodeColor,
  ee as TextmodeErrorLevel,
  X as TextmodeFramebuffer,
  Le as TextmodeGrid,
  Q as TextmodeShader,
  Ve as Textmodifier,
  ti as conversion,
  ni as create,
  $e as filters,
  ri as input,
  si as layering,
  ii as loadables,
  ei as loading,
  Je as plugins,
  hi as setErrorLevel,
  At as textmode,
  oi as version
};
