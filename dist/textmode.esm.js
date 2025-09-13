var Z = Object.defineProperty;
var K = (E, A, t) => A in E ? Z(E, A, { enumerable: !0, configurable: !0, writable: !0, value: t }) : E[A] = t;
var n = (E, A, t) => K(E, typeof A != "symbol" ? A + "" : A, t);
class m extends Error {
  constructor(A, t = {}) {
    super(m.A(A, t)), this.name = "TextmodeError";
  }
  static A(A, t) {
    let e = A;
    if (t && Object.keys(t).length > 0) {
      e += `

📋 Context:`;
      for (const [s, r] of Object.entries(t))
        e += `
  - ${s}: ${m.i(r)}`;
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
    if (Array.isArray(A)) return A.length === 0 ? "[]" : A.length <= 5 ? `[${A.map((t) => m.i(t)).join(", ")}]` : `[${A.slice(0, 3).map((t) => m.i(t)).join(", ")}, ... +${A.length - 3} more]`;
    if (typeof A == "object") {
      const t = Object.keys(A);
      return t.length === 0 ? "{}" : t.length <= 3 ? `{ ${t.map((e) => `${e}: ${m.i(A[e])}`).join(", ")} }` : `{ ${t.slice(0, 2).map((e) => `${e}: ${m.i(A[e])}`).join(", ")}, ... +${t.length - 2} more }`;
    }
    return A + "";
  }
}
var q = ((E) => (E[E.SILENT = 0] = "SILENT", E[E.WARNING = 1] = "WARNING", E[E.ERROR = 2] = "ERROR", E[E.THROW = 3] = "THROW", E))(q || {});
const v = class v {
  constructor() {
    n(this, "C", { globalLevel: 3 });
  }
  static D() {
    return v.o || (v.o = new v()), v.o;
  }
  l(A, t) {
    const e = "%c[textmode.js] Oops! (╯°□°)╯︵ Something went wrong in your code.", s = "color: #f44336; font-weight: bold; background: #ffebee; padding: 2px 6px; border-radius: 3px;";
    switch (this.C.globalLevel) {
      case 0:
        return !1;
      case 1:
        return console.group(e, s), console.warn(m.A(A, t)), console.groupEnd(), !1;
      case 2:
        return console.group(e, s), console.error(m.A(A, t)), console.groupEnd(), !1;
      default:
        throw new m(A, t);
    }
  }
  P(A, t, e) {
    return !!A || (this.l(t, e), !1);
  }
  u(A) {
    this.C.globalLevel = A;
  }
};
n(v, "o", null);
let S = v;
const _ = S.D(), V = /* @__PURE__ */ new WeakMap();
function G(E, A) {
  V.set(E, A);
}
function R(E) {
  return V.get(E);
}
class U {
  constructor(A, t, e = t, s = 1, r = {}) {
    n(this, "I");
    n(this, "p");
    n(this, "C");
    n(this, "_", null);
    n(this, "m");
    n(this, "v");
    n(this, "G", []);
    n(this, "$");
    n(this, "M", null);
    n(this, "Y", []);
    this.I = t, this.p = e, this.C = { filter: "nearest", wrap: "clamp", format: "rgba", type: "unsigned_byte", ...r }, this.m = A, this.$ = Math.min(Math.max(1, s), 8);
    const i = A.getParameter(A.MAX_DRAW_BUFFERS), B = A.getParameter(A.MAX_COLOR_ATTACHMENTS);
    this.$ = Math.min(this.$, i, B), this.v = A.createFramebuffer(), this.R(), this.S(), this.Y = Array(this.$).fill(null);
  }
  R() {
    const A = this.m, t = this.C.filter === "linear" ? A.LINEAR : A.NEAREST, e = this.C.wrap === "repeat" ? A.REPEAT : A.CLAMP_TO_EDGE, s = this.C.type === "float" ? A.FLOAT : A.UNSIGNED_BYTE;
    for (let r = 0; r < this.$; r++) {
      const i = A.createTexture();
      A.bindTexture(A.TEXTURE_2D, i), A.texParameteri(A.TEXTURE_2D, A.TEXTURE_MIN_FILTER, t), A.texParameteri(A.TEXTURE_2D, A.TEXTURE_MAG_FILTER, t), A.texParameteri(A.TEXTURE_2D, A.TEXTURE_WRAP_S, e), A.texParameteri(A.TEXTURE_2D, A.TEXTURE_WRAP_T, e), A.texImage2D(A.TEXTURE_2D, 0, A.RGBA, this.I, this.p, 0, A.RGBA, s, null), this.G.push(i);
    }
    A.bindTexture(A.TEXTURE_2D, null);
  }
  S() {
    const A = this.m;
    if (A.bindFramebuffer(A.FRAMEBUFFER, this.v), this.$ === 1) A.framebufferTexture2D(A.FRAMEBUFFER, A.COLOR_ATTACHMENT0, A.TEXTURE_2D, this.G[0], 0);
    else {
      const e = [];
      for (let s = 0; s < this.$; s++) {
        const r = A.COLOR_ATTACHMENT0 + s;
        A.framebufferTexture2D(A.FRAMEBUFFER, r, A.TEXTURE_2D, this.G[s], 0), e.push(r);
      }
      A.drawBuffers(e);
    }
    const t = A.checkFramebufferStatus(A.FRAMEBUFFER);
    t !== A.FRAMEBUFFER_COMPLETE && console.error("GLFramebuffer is not complete:", t), A.bindFramebuffer(A.FRAMEBUFFER, null);
  }
  F(A) {
    const t = this.m;
    t.bindTexture(t.TEXTURE_2D, this.G[0]), t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL, 1), t.texImage2D(t.TEXTURE_2D, 0, t.RGBA, t.RGBA, t.UNSIGNED_BYTE, A), t.bindTexture(t.TEXTURE_2D, null);
  }
  O(A, t) {
    this.I = A, this.p = t, this._ = null, this.Y = Array(this.$).fill(null);
    const e = this.m, s = this.C.type === "float" ? e.FLOAT : e.UNSIGNED_BYTE;
    for (const r of this.G) e.bindTexture(e.TEXTURE_2D, r), e.texImage2D(e.TEXTURE_2D, 0, e.RGBA, this.I, this.p, 0, e.RGBA, s, null);
    e.bindTexture(e.TEXTURE_2D, null);
  }
  U(A) {
    const t = this.m;
    if (A < 0 || A >= this.$) throw Error(`GLFramebuffer: attachment index ${A} out of range (count=${this.$})`);
    const e = this.Y[A];
    if (e) return e;
    const s = this.I, r = this.p, i = new Uint8Array(s * r * 4), B = t.getParameter(t.READ_FRAMEBUFFER_BINDING);
    t.bindFramebuffer(t.READ_FRAMEBUFFER, this.v), t.readBuffer(t.COLOR_ATTACHMENT0 + A), t.readPixels(0, 0, s, r, t.RGBA, t.UNSIGNED_BYTE, i), t.bindFramebuffer(t.READ_FRAMEBUFFER, B);
    const Q = 4 * s, o = new Uint8Array(i.length);
    for (let h = 0; h < r; h++) {
      const a = (r - 1 - h) * Q, g = h * Q;
      o.set(i.subarray(a, a + Q), g);
    }
    return this.Y[A] = o, o;
  }
  L() {
    for (let A = 0; A < this.$; A++) this.U(A);
  }
  k() {
    const A = this.m;
    this.M = { framebuffer: A.getParameter(A.FRAMEBUFFER_BINDING), viewport: A.getParameter(A.VIEWPORT) }, A.bindFramebuffer(A.FRAMEBUFFER, this.v), this.Y = Array(this.$).fill(null);
    for (let t = 0; t < this.$; t++) A.clearBufferfv(A.COLOR, t, new Float32Array([0, 0, 0, 0]));
    A.viewport(0, 0, this.I, this.p), G(A, [0, 0, this.I, this.p]);
  }
  H() {
    if (!this.M) return;
    const A = this.m;
    A.bindFramebuffer(A.FRAMEBUFFER, this.M.framebuffer), A.viewport(...this.M.viewport), G(A, this.M.viewport), this.M = null;
  }
  W() {
    const A = this.m;
    this.v && A.deleteFramebuffer(this.v);
    for (const t of this.G) A.deleteTexture(t);
    this.G = [], this.Y = [];
  }
  get width() {
    return this.I;
  }
  get height() {
    return this.p;
  }
  get pixels() {
    return this._;
  }
  get options() {
    return { ...this.C };
  }
  get framebuffer() {
    return this.v;
  }
  get texture() {
    return this.G[0];
  }
  get textures() {
    return [...this.G];
  }
  get attachmentCount() {
    return this.$;
  }
  getAttachmentPixels(A) {
    return this.Y[A] ?? null;
  }
}
class z {
  constructor(A, t, e) {
    n(this, "m");
    n(this, "J");
    n(this, "V", /* @__PURE__ */ new Map());
    n(this, "K", /* @__PURE__ */ new Map());
    n(this, "Z", 0);
    n(this, "j");
    this.m = A, this.J = this.X(t, e), this.j = A.getParameter(A.MAX_TEXTURE_IMAGE_UNITS), this.N();
  }
  N() {
    const A = this.m.getProgramParameter(this.J, this.m.ACTIVE_UNIFORMS);
    for (let t = 0; t < A; t++) {
      const e = this.m.getActiveUniform(this.J, t);
      if (e) {
        const s = this.m.getUniformLocation(this.J, e.name);
        s && (this.V.set(e.name, s), this.K.set(e.name, e.type));
      }
    }
  }
  X(A, t) {
    const e = this.q(this.m.VERTEX_SHADER, A), s = this.q(this.m.FRAGMENT_SHADER, t), r = this.m.createProgram();
    if (this.m.attachShader(r, e), this.m.attachShader(r, s), this.m.linkProgram(r), !this.m.getProgramParameter(r, this.m.LINK_STATUS)) {
      const i = this.m.getProgramInfoLog(r);
      throw Error("Shader program link error: " + i);
    }
    return this.m.deleteShader(e), this.m.deleteShader(s), r;
  }
  q(A, t) {
    const e = this.m.createShader(A);
    if (this.m.shaderSource(e, t), this.m.compileShader(e), !this.m.getShaderParameter(e, this.m.COMPILE_STATUS)) {
      const s = this.m.getShaderInfoLog(e);
      throw this.m.deleteShader(e), Error("Shader compilation error: " + s);
    }
    return e;
  }
  AA() {
    this.m.useProgram(this.J), this.tA();
  }
  tA() {
    this.Z = 0;
  }
  eA(A) {
    for (const [t, e] of Object.entries(A)) this.BA(t, e);
  }
  sA(A) {
    return this.V.has(A);
  }
  BA(A, t) {
    if (this.m.getParameter(this.m.CURRENT_PROGRAM) !== this.J) return void console.warn(`Attempting to set uniform '${A}' on shader that is not currently bound`);
    const e = this.V.get(A);
    if (e) if (typeof t == "number") this.m.uniform1f(e, t);
    else if (typeof t == "boolean") this.m.uniform1i(e, t ? 1 : 0);
    else if (Array.isArray(t)) switch (t.length) {
      case 2:
        this.m.uniform2f(e, t[0], t[1]);
        break;
      case 3:
        this.m.uniform3f(e, t[0], t[1], t[2]);
        break;
      case 4:
        this.m.uniform4f(e, t[0], t[1], t[2], t[3]);
        break;
      default:
        console.warn(`Unsupported array length ${t.length} for uniform '${A}'`);
    }
    else if (t instanceof WebGLTexture) {
      const s = this.iA();
      this.m.uniform1i(e, s), this.m.activeTexture(this.m.TEXTURE0 + s), this.m.bindTexture(this.m.TEXTURE_2D, t);
    } else if (t instanceof U) {
      const s = this.iA();
      this.m.uniform1i(e, s), this.m.activeTexture(this.m.TEXTURE0 + s), this.m.bindTexture(this.m.TEXTURE_2D, t.texture);
    } else if (typeof t == "object" && "texture" in t) {
      const s = this.iA();
      this.m.uniform1i(e, s), this.m.activeTexture(this.m.TEXTURE0 + s), this.m.bindTexture(this.m.TEXTURE_2D, t.texture);
    } else console.warn(`Unsupported uniform type for '${A}':`, typeof t);
  }
  iA() {
    return this.Z >= this.j && console.warn(`Exceeded maximum texture units (${this.j}). Texture may not render correctly.`), this.Z++;
  }
  get QA() {
    return this.J;
  }
  W() {
    this.m.deleteProgram(this.J);
  }
}
class AA {
  constructor() {
    n(this, "rA", 1);
    n(this, "EA", 0);
    n(this, "nA", 0);
    n(this, "oA", 0);
    n(this, "gA", [0, 0, 0]);
    n(this, "aA", [1, 1, 1, 1]);
    n(this, "hA", [0, 0, 0, 1]);
    n(this, "cA", !1);
    n(this, "CA", !1);
    n(this, "DA", !1);
    n(this, "lA", [0, 0]);
    n(this, "PA", [0, 0, 0, 1]);
    n(this, "uA", []);
  }
  IA() {
    this.uA.push({ lineWeight: this.rA, rotationX: this.EA, rotationY: this.nA, rotationZ: this.oA, charRotation: [...this.lA], flipHorizontally: this.cA, flipVertically: this.CA, invert: this.DA, character: [...this.gA], charColor: [...this.aA], cellColor: [...this.hA] });
  }
  wA() {
    const A = this.uA.pop();
    A ? (this.rA = A.lineWeight, this.EA = A.rotationX, this.nA = A.rotationY, this.oA = A.rotationZ, this.lA = A.charRotation, this.cA = A.flipHorizontally, this.CA = A.flipVertically, this.DA = A.invert, this.gA = A.character, this.aA = A.charColor, this.hA = A.cellColor) : console.warn("pop() called without matching push()");
  }
  fA() {
    this.uA = [], this.EA = 0, this.nA = 0, this.oA = 0;
  }
  dA(A) {
    A.lineWeight = this.rA, A.rotationX = this.EA, A.rotationY = this.nA, A.rotationZ = this.oA, A.character[0] = this.gA[0], A.character[1] = this.gA[1], A.character[2] = this.gA[2], A.charColor[0] = this.aA[0], A.charColor[1] = this.aA[1], A.charColor[2] = this.aA[2], A.charColor[3] = this.aA[3], A.bgColor[0] = this.hA[0], A.bgColor[1] = this.hA[1], A.bgColor[2] = this.hA[2], A.bgColor[3] = this.hA[3], A.flipHorizontally = this.cA, A.flipVertically = this.CA, A.invert = this.DA, A.charRotation[0] = this.lA[0], A.charRotation[1] = this.lA[1];
  }
  get lineWeight() {
    return this.rA;
  }
  get canvasBackgroundColor() {
    return this.PA;
  }
  pA(A) {
    this.rA = Math.abs(A);
  }
  _A(A) {
    this.EA = A;
  }
  mA(A) {
    this.nA = A;
  }
  vA(A) {
    this.oA = A;
  }
  xA(A) {
    this.gA = A;
  }
  yA(A, t, e, s = 255) {
    this.aA = [A / 255, t / 255, e / 255, s / 255];
  }
  bA(A, t, e, s = 255) {
    this.hA = [A / 255, t / 255, e / 255, s / 255];
  }
  GA(A) {
    this.cA = A;
  }
  $A(A) {
    this.CA = A;
  }
  MA(A) {
    this.DA = A;
  }
  YA(A) {
    const t = 255 * A / 360, e = Math.floor(t) / 255, s = Math.round(t - Math.floor(t));
    this.lA = [e, s];
  }
  zA(A, t, e, s) {
    this.PA = [A / 255, t / 255, e / 255, s / 255];
  }
}
var L = `#version 300 es
in vec2 a_position;in vec2 a_texCoord;in vec2 a_instancePosition;in vec2 a_instanceSize;in vec3 a_instanceCharacter;in vec4 a_instancePrimaryColor;in vec4 a_instanceSecondaryColor;in vec2 a_instanceRotation;in vec3 a_instanceTransform;in vec3 a_instanceGlobalRotation;in vec2 a_instanceRotationCenter;in vec2 a_instanceBezierCP1;in vec2 a_instanceBezierCP2;in vec2 a_instanceBezierStart;in vec2 a_instanceBezierEnd;in vec2 a_instanceArcAngles;uniform float u_aspectRatio;uniform vec2 u_viewportSize;out vec2 v_uv;out vec3 v_character;out vec4 v_primaryColor;out vec4 v_secondaryColor;out vec2 v_rotation;out vec3 v_transform;mat3 rotateX(float a){float s=sin(a),c=cos(a);return mat3(1,0,0,0,c,-s,0,s,c);}mat3 rotateY(float a){float s=sin(a),c=cos(a);return mat3(c,0,s,0,1,0,-s,0,c);}mat3 rotateZ(float a){float s=sin(a),c=cos(a);return mat3(c,-s,0,s,c,0,0,0,1);}vec2 evaluateBezier(float t,vec2 p0,vec2 p1,vec2 p2,vec2 p3){float u=1.-t,u2=u*u,t2=t*t;return u2*u*p0+3.*u2*t*p1+3.*u*t2*p2+t2*t*p3;}vec2 evaluateBezierDerivative(float t,vec2 p0,vec2 p1,vec2 p2,vec2 p3){float u=1.-t,u2=u*u,t2=t*t;return-3.*u2*p0+3.*u2*p1-6.*u*t*p1+6.*u*t*p2-3.*t2*p2+3.*t2*p3;}void main(){v_uv=a_texCoord;v_character=a_instanceCharacter;v_primaryColor=a_instancePrimaryColor;v_secondaryColor=a_instanceSecondaryColor;v_rotation=a_instanceRotation;v_transform=a_instanceTransform;vec2 worldPosition;bool isBezier=length(a_instanceBezierCP1)+length(a_instanceBezierCP2)+length(a_instanceBezierStart)+length(a_instanceBezierEnd)>0.;bool isArc=a_instanceArcAngles.x!=0.||a_instanceArcAngles.y!=0.;if(isBezier){float t=a_position.x;vec2 curvePoint=evaluateBezier(t,a_instanceBezierStart,a_instanceBezierCP1,a_instanceBezierCP2,a_instanceBezierEnd);vec2 tangent=evaluateBezierDerivative(t,a_instanceBezierStart,a_instanceBezierCP1,a_instanceBezierCP2,a_instanceBezierEnd);float tLen=length(tangent);tangent=tLen>0.?tangent/tLen:vec2(1,0);worldPosition=curvePoint+vec2(-tangent.y,tangent.x)*a_position.y*a_instanceSize.y;}else if(isArc){float s=a_instanceArcAngles.x,e=a_instanceArcAngles.y;s=mod(s,6.28318530718);if(s<0.)s+=6.28318530718;e=mod(e,6.28318530718);if(e<0.)e+=6.28318530718;float d=s-e;if(d<=0.)d+=6.28318530718;float angle=s-a_position.x*d;vec2 local=vec2(cos(angle),sin(angle))*a_position.y;worldPosition=local*a_instanceSize*.5+a_instanceSize*.5+a_instancePosition;}else{worldPosition=a_position*a_instanceSize+a_instancePosition;}vec2 ndc=(worldPosition/u_viewportSize)*2.-1.;ndc.y=-ndc.y;if(length(a_instanceGlobalRotation)>0.){vec3 pos3D=vec3(ndc-a_instanceRotationCenter,0);pos3D.x*=u_aspectRatio;if(a_instanceGlobalRotation.x!=0.)pos3D=rotateX(-a_instanceGlobalRotation.x)*pos3D;if(a_instanceGlobalRotation.y!=0.)pos3D=rotateY(-a_instanceGlobalRotation.y)*pos3D;if(a_instanceGlobalRotation.z!=0.)pos3D=rotateZ(-a_instanceGlobalRotation.z)*pos3D;pos3D.x/=u_aspectRatio;ndc=pos3D.xy+a_instanceRotationCenter;}gl_Position=vec4(ndc,0,1);}`, D = ((E) => (E.RECTANGLE = "rectangle", E.LINE = "line", E.ELLIPSE = "ellipse", E.ARC = "arc", E.TRIANGLE = "triangle", E.BEZIER_CURVE = "bezier_curve", E.CUSTOM = "custom", E))(D || {});
class tA {
  constructor(A) {
    n(this, "m");
    n(this, "RA", /* @__PURE__ */ new Map());
    this.m = A;
  }
  SA(A, t, e, s) {
    const r = this.m;
    let i = this.RA.get(A);
    i || (i = /* @__PURE__ */ new Map(), this.RA.set(A, i));
    let B = i.get(t) || null;
    if (!B) {
      B = r.createVertexArray(), i.set(t, B), r.bindVertexArray(B), r.bindBuffer(r.ARRAY_BUFFER, s);
      const Q = r.getAttribLocation(A, "a_position");
      Q !== -1 && (r.enableVertexAttribArray(Q), r.vertexAttribPointer(Q, e.attributes.position.size, r.FLOAT, !1, e.stride, e.attributes.position.offset), r.vertexAttribDivisor(Q, 0));
      const o = r.getAttribLocation(A, "a_texCoord");
      o !== -1 && (r.enableVertexAttribArray(o), r.vertexAttribPointer(o, e.attributes.texCoord.size, r.FLOAT, !1, e.stride, e.attributes.texCoord.offset), r.vertexAttribDivisor(o, 0));
    }
    r.bindVertexArray(B);
  }
  TA() {
    this.m.bindVertexArray(null);
  }
  W() {
    const A = this.m;
    for (const [, t] of this.RA) for (const [, e] of t) e && A.deleteVertexArray(e);
    this.RA.clear();
  }
}
class eA {
  constructor(A) {
    n(this, "FA");
    n(this, "m");
    n(this, "OA", null);
    n(this, "UA", null);
    n(this, "LA", null);
    this.m = A, this.FA = new tA(A);
  }
  kA(A, t, e) {
    const { shader: s } = A, r = R(this.m) || this.m.getParameter(this.m.VIEWPORT), i = { u_aspectRatio: r[2] / r[3], u_viewportSize: [r[2], r[3]] }, B = {};
    for (const [a, g] of Object.entries(i)) s.sA(a) && (B[a] = g);
    Object.keys(B).length > 0 && s.eA(B);
    const Q = (a) => {
      if (!a || !a.HA()) return;
      const g = a.unitGeometry, l = a.unitBuffer;
      try {
        this.FA.SA(s.QA, a.type + "", g, l), a.batch.WA(s), a.batch.JA(g.primitiveType, g.vertexCount);
      } finally {
        a.batch.VA(s), this.FA.TA(), a.KA();
      }
    };
    let o = null, h = null;
    for (const a of t) {
      if (a.type === D.CUSTOM) {
        h && (Q(h), o = null, h = null), this.ZA(A, a.params, a.state, e.get(D.RECTANGLE) || null);
        continue;
      }
      o !== null && a.type !== o && (Q(h), o = null, h = null);
      let g = h;
      g && a.type === o || (g = e.get(a.type) || null, h = g, o = a.type), g && g.jA(a.params, a.state);
    }
    Q(h);
  }
  ZA(A, t, e, s) {
    if (!s) return;
    const { x: r, y: i, width: B, height: Q, shader: o, uniforms: h } = t, a = this.m;
    o.AA(), s.KA();
    const g = this.XA(Math.max(1, Math.floor(B)), Math.max(1, Math.floor(Q)));
    g.k(), o.AA(), h && Object.keys(h).length && o.eA(h);
    {
      const u = R(a) || a.getParameter(a.VIEWPORT);
      o.sA("u_aspectRatio") && o.BA("u_aspectRatio", u[2] / u[3]), o.sA("u_viewportSize") && o.BA("u_viewportSize", [u[2], u[3]]);
    }
    const l = { ...e, rotationX: 0, rotationY: 0, rotationZ: 0 };
    if (s.jA({ x: 0, y: 0, width: g.width, height: g.height }, l), s.HA()) {
      const u = s.unitGeometry, M = s.unitBuffer;
      try {
        this.FA.SA(o.QA, s.type + "", u, M), s.batch.WA(o), s.batch.JA(u.primitiveType, u.vertexCount);
      } finally {
        s.batch.VA(o), this.FA.TA(), s.KA();
      }
    }
    g.H();
    const c = this.NA();
    c.AA(), c.eA({ u_src0: g.textures[0], u_src1: g.textures[1], u_src2: g.textures[2], u_src3: g.textures[3], u_src4: g.textures[4], u_srcSize: [g.width, g.height] });
    const C = R(a) || a.getParameter(a.VIEWPORT);
    c.sA("u_aspectRatio") && c.BA("u_aspectRatio", C[2] / C[3]), c.sA("u_viewportSize") && c.BA("u_viewportSize", [C[2], C[3]]);
    const d = Math.floor(r), I = Math.floor(i), w = Math.max(1, Math.floor(B)), p = Math.max(1, Math.floor(Q));
    if (s.jA({ x: d, y: I, width: w, height: p }, e), s.HA()) {
      const u = s.unitGeometry, M = s.unitBuffer;
      try {
        this.FA.SA(c.QA, s.type + "", u, M), s.batch.WA(c), s.batch.JA(u.primitiveType, u.vertexCount);
      } finally {
        s.batch.VA(c), this.FA.TA(), s.KA();
      }
    }
    A.shader.AA();
  }
  NA() {
    return this.OA || (this.OA = new z(this.m, L, `#version 300 es
precision highp float;in vec2 v_uv;uniform sampler2D u_src0;uniform sampler2D u_src1;uniform sampler2D u_src2;uniform sampler2D u_src3;uniform sampler2D u_src4;uniform vec2 u_srcSize;layout(location=0)out vec4 o_character;layout(location=1)out vec4 o_primaryColor;layout(location=2)out vec4 o_secondaryColor;layout(location=3)out vec4 o_rotation;layout(location=4)out vec4 o_transform;void main(){vec2 uvTex=v_uv*u_srcSize;vec2 uvQ=(floor(uvTex)+0.5f)/u_srcSize;o_character=texture(u_src0,uvQ);o_primaryColor=texture(u_src1,uvQ);o_secondaryColor=texture(u_src2,uvQ);o_rotation=texture(u_src3,uvQ);o_transform=texture(u_src4,uvQ);}`)), this.OA;
  }
  XA(A, t) {
    return this.UA && this.LA && this.LA.w === A && this.LA.h === t || (this.UA && this.UA.W(), this.UA = new U(this.m, A, t, 5), this.LA = { w: A, h: t }), this.UA;
  }
}
class sA {
  constructor() {
    n(this, "qA", []);
    n(this, "At", 1);
    n(this, "tt", 0);
  }
  et(A) {
    if (this.tt >= this.qA.length) {
      const e = { id: this.At++, type: A, params: {}, state: { lineWeight: 1, rotationX: 0, rotationY: 0, rotationZ: 0, character: [0, 0, 0], charColor: [1, 1, 1, 1], bgColor: [0, 0, 0, 1], flipHorizontally: !1, flipVertically: !1, invert: !1, charRotation: [0, 0] } };
      this.qA.push(e);
    }
    const t = this.qA[this.tt];
    switch (t.id = this.At++, t.type = A, A) {
      case D.RECTANGLE:
      case D.ELLIPSE:
        t.params && "width" in t.params || (t.params = { x: 0, y: 0, width: 0, height: 0 });
        break;
      case D.CUSTOM:
        t.params && "shader" in t.params || (t.params = { x: 0, y: 0, width: 0, height: 0, shader: void 0, uniforms: {} });
        break;
      case D.ARC:
        t.params && "start" in t.params || (t.params = { x: 0, y: 0, width: 0, height: 0, start: 0, stop: 0 });
        break;
      case D.LINE:
        t.params && "x2" in t.params || (t.params = { x1: 0, y1: 0, x2: 0, y2: 0, thickness: void 0 });
        break;
      case D.TRIANGLE:
        t.params && "x3" in t.params || (t.params = { x1: 0, y1: 0, x2: 0, y2: 0, x3: 0, y3: 0 });
        break;
      case D.BEZIER_CURVE:
        t.params && "cp2y" in t.params || (t.params = { x1: 0, y1: 0, cp1x: 0, cp1y: 0, cp2x: 0, cp2y: 0, x2: 0, y2: 0, thickness: void 0 });
        break;
      default:
        t.params || (t.params = {});
    }
    return this.tt++, t;
  }
  Bt(A, t, e, s, r) {
    const i = this.et(D.RECTANGLE);
    return i.params.x = A, i.params.y = t, i.params.width = e, i.params.height = s, r.dA(i.state), i.id;
  }
  st(A, t, e, s, r, i, B) {
    const Q = this.et(D.CUSTOM);
    return Q.params.x = A, Q.params.y = t, Q.params.width = e, Q.params.height = s, Q.params.shader = r, Q.params.uniforms = i, B.dA(Q.state), Q.id;
  }
  it(A, t, e, s, r, i) {
    const B = this.et(D.LINE);
    return B.params.x1 = A, B.params.y1 = t, B.params.x2 = e, B.params.y2 = s, B.params.thickness = r, i.dA(B.state), B.id;
  }
  Qt(A, t, e, s, r) {
    const i = this.et(D.ELLIPSE);
    return i.params.x = A, i.params.y = t, i.params.width = e, i.params.height = s, r.dA(i.state), i.id;
  }
  rt(A, t, e, s, r, i, B) {
    const Q = this.et(D.ARC);
    return Q.params.x = A, Q.params.y = t, Q.params.width = e, Q.params.height = s, Q.params.start = r, Q.params.stop = i, B.dA(Q.state), Q.id;
  }
  Et(A, t, e, s, r, i, B) {
    const Q = this.et(D.TRIANGLE);
    return Q.params.x1 = A, Q.params.y1 = t, Q.params.x2 = e, Q.params.y2 = s, Q.params.x3 = r, Q.params.y3 = i, B.dA(Q.state), Q.id;
  }
  nt(A, t, e, s, r, i, B, Q, o, h) {
    const a = this.et(D.BEZIER_CURVE);
    return a.params.x1 = A, a.params.y1 = t, a.params.cp1x = e, a.params.cp1y = s, a.params.cp2x = r, a.params.cp2y = i, a.params.x2 = B, a.params.y2 = Q, a.params.thickness = o, h.dA(a.state), a.id;
  }
  get length() {
    return this.tt;
  }
  get isEmpty() {
    return this.tt === 0;
  }
  ot() {
    this.tt = 0;
  }
  [Symbol.iterator]() {
    let A = 0;
    const t = this.tt, e = this.qA;
    return { next: () => A < t ? { value: e[A++], done: !1 } : { value: void 0, done: !0 } };
  }
}
const x = class x {
  static gt(A, t, e = 0) {
    var i, B, Q, o, h, a, g, l, c, C;
    const s = t || new Float32Array(x.FLOATS_PER_INSTANCE);
    let r = e;
    return s[r++] = A.position[0], s[r++] = A.position[1], s[r++] = A.size[0], s[r++] = A.size[1], s[r++] = A.character[0], s[r++] = A.character[1], s[r++] = A.character[2], s[r++] = A.primaryColor[0], s[r++] = A.primaryColor[1], s[r++] = A.primaryColor[2], s[r++] = A.primaryColor[3], s[r++] = A.secondaryColor[0], s[r++] = A.secondaryColor[1], s[r++] = A.secondaryColor[2], s[r++] = A.secondaryColor[3], s[r++] = A.rotation[0], s[r++] = A.rotation[1], s[r++] = A.transform[0], s[r++] = A.transform[1], s[r++] = A.transform[2], s[r++] = A.globalRotationX, s[r++] = A.globalRotationY, s[r++] = A.globalRotationZ, s[r++] = A.rotationCenter[0], s[r++] = A.rotationCenter[1], s[r++] = ((i = A.arcAngles) == null ? void 0 : i[0]) || 0, s[r++] = ((B = A.arcAngles) == null ? void 0 : B[1]) || 0, s[r++] = ((Q = A.bezierControlPoint1) == null ? void 0 : Q[0]) || 0, s[r++] = ((o = A.bezierControlPoint1) == null ? void 0 : o[1]) || 0, s[r++] = ((h = A.bezierControlPoint2) == null ? void 0 : h[0]) || 0, s[r++] = ((a = A.bezierControlPoint2) == null ? void 0 : a[1]) || 0, s[r++] = ((g = A.bezierStartPoint) == null ? void 0 : g[0]) || 0, s[r++] = ((l = A.bezierStartPoint) == null ? void 0 : l[1]) || 0, s[r++] = ((c = A.bezierEndPoint) == null ? void 0 : c[0]) || 0, s[r++] = ((C = A.bezierEndPoint) == null ? void 0 : C[1]) || 0, s;
  }
  static ht(A) {
    const t = A.length * x.FLOATS_PER_INSTANCE, e = new Float32Array(t);
    for (let s = 0; s < A.length; s++) {
      const r = s * x.FLOATS_PER_INSTANCE;
      x.gt(A[s], e, r);
    }
    return e;
  }
};
n(x, "BYTES_PER_INSTANCE", 140), n(x, "FLOATS_PER_INSTANCE", 35);
let b = x;
const P = class P {
};
n(P, "STRIDE", b.BYTES_PER_INSTANCE), n(P, "ATTRIBUTES", { a_instancePosition: { location: -1, size: 2, type: WebGL2RenderingContext.FLOAT, normalized: !1, stride: P.STRIDE, offset: 0, divisor: 1 }, a_instanceSize: { location: -1, size: 2, type: WebGL2RenderingContext.FLOAT, normalized: !1, stride: P.STRIDE, offset: 8, divisor: 1 }, a_instanceCharacter: { location: -1, size: 3, type: WebGL2RenderingContext.FLOAT, normalized: !1, stride: P.STRIDE, offset: 16, divisor: 1 }, a_instancePrimaryColor: { location: -1, size: 4, type: WebGL2RenderingContext.FLOAT, normalized: !1, stride: P.STRIDE, offset: 28, divisor: 1 }, a_instanceSecondaryColor: { location: -1, size: 4, type: WebGL2RenderingContext.FLOAT, normalized: !1, stride: P.STRIDE, offset: 44, divisor: 1 }, a_instanceRotation: { location: -1, size: 2, type: WebGL2RenderingContext.FLOAT, normalized: !1, stride: P.STRIDE, offset: 60, divisor: 1 }, a_instanceTransform: { location: -1, size: 3, type: WebGL2RenderingContext.FLOAT, normalized: !1, stride: P.STRIDE, offset: 68, divisor: 1 }, a_instanceGlobalRotation: { location: -1, size: 3, type: WebGL2RenderingContext.FLOAT, normalized: !1, stride: P.STRIDE, offset: 80, divisor: 1 }, a_instanceRotationCenter: { location: -1, size: 2, type: WebGL2RenderingContext.FLOAT, normalized: !1, stride: P.STRIDE, offset: 92, divisor: 1 }, a_instanceArcAngles: { location: -1, size: 2, type: WebGL2RenderingContext.FLOAT, normalized: !1, stride: P.STRIDE, offset: 100, divisor: 1 }, a_instanceBezierCP1: { location: -1, size: 2, type: WebGL2RenderingContext.FLOAT, normalized: !1, stride: P.STRIDE, offset: 108, divisor: 1 }, a_instanceBezierCP2: { location: -1, size: 2, type: WebGL2RenderingContext.FLOAT, normalized: !1, stride: P.STRIDE, offset: 116, divisor: 1 }, a_instanceBezierStart: { location: -1, size: 2, type: WebGL2RenderingContext.FLOAT, normalized: !1, stride: P.STRIDE, offset: 124, divisor: 1 }, a_instanceBezierEnd: { location: -1, size: 2, type: WebGL2RenderingContext.FLOAT, normalized: !1, stride: P.STRIDE, offset: 132, divisor: 1 } });
let Y = P;
class rA {
  constructor(A, t = 1e3, e = 1.5) {
    n(this, "m");
    n(this, "ct", []);
    n(this, "Ct");
    n(this, "Dt");
    n(this, "lt", null);
    n(this, "Pt", !0);
    n(this, "ut", 0);
    n(this, "It", /* @__PURE__ */ new Map());
    n(this, "wt", null);
    this.m = A, this.Ct = t, this.Dt = e, this.ft();
  }
  jA(A) {
    const t = this.ct.length;
    return this.ct.push(A), this.Pt = !0, t;
  }
  get count() {
    return this.ct.length;
  }
  get isEmpty() {
    return this.ct.length === 0;
  }
  clear() {
    this.ct.length = 0, this.Pt = !0;
  }
  dt(A) {
    if (A <= this.Ct) return;
    const t = Math.ceil(A * this.Dt);
    this.Ct = t, this.ft();
  }
  ft() {
    const A = this.m;
    this.lt && A.deleteBuffer(this.lt), this.lt = A.createBuffer();
    const t = this.Ct * b.BYTES_PER_INSTANCE;
    A.bindBuffer(A.ARRAY_BUFFER, this.lt), A.bufferData(A.ARRAY_BUFFER, t, A.DYNAMIC_DRAW), A.bindBuffer(A.ARRAY_BUFFER, null), this.Pt = !0, this.ut = 0;
  }
  _t() {
    if (!this.Pt || this.ct.length === 0) return;
    const A = this.m, t = this.ct.length;
    this.dt(t), (!this.wt || this.wt.length < t * b.FLOATS_PER_INSTANCE) && (this.wt = new Float32Array(t * b.FLOATS_PER_INSTANCE));
    const e = b.ht(this.ct);
    A.bindBuffer(A.ARRAY_BUFFER, this.lt), t <= this.ut ? A.bufferSubData(A.ARRAY_BUFFER, 0, e) : A.bufferData(A.ARRAY_BUFFER, e, A.DYNAMIC_DRAW), A.bindBuffer(A.ARRAY_BUFFER, null), this.Pt = !1, this.ut = t;
  }
  vt(A) {
    let t = this.It.get(A);
    if (!t) {
      t = /* @__PURE__ */ new Map();
      const e = this.m;
      for (const s in Y.ATTRIBUTES) {
        const r = e.getAttribLocation(A, s);
        r !== -1 && t.set(s, r);
      }
      this.It.set(A, t);
    }
    return t;
  }
  WA(A) {
    if (!this.lt || this.ct.length === 0) return;
    const t = this.m, e = A.QA;
    this._t();
    const s = this.vt(e);
    t.bindBuffer(t.ARRAY_BUFFER, this.lt);
    for (const [r, i] of s) {
      const B = Y.ATTRIBUTES[r];
      B && (t.enableVertexAttribArray(i), t.vertexAttribPointer(i, B.size, B.type, B.normalized, B.stride, B.offset), t.vertexAttribDivisor(i, B.divisor));
    }
  }
  VA(A) {
    const t = this.m, e = this.vt(A.QA);
    for (const [, s] of e) t.disableVertexAttribArray(s), t.vertexAttribDivisor(s, 0);
  }
  JA(A, t) {
    this.ct.length !== 0 && this.m.drawArraysInstanced(A, 0, t, this.ct.length);
  }
  W() {
    const A = this.m;
    this.lt && (A.deleteBuffer(this.lt), this.lt = null), this.ct.length = 0, this.It.clear(), this.wt = null;
  }
}
class T {
  constructor(A, t, e, s) {
    n(this, "m");
    n(this, "xt");
    n(this, "yt");
    n(this, "bt");
    n(this, "Gt", null);
    this.m = A, this.xt = t, this.yt = e, this.bt = s;
    const r = this.m.createBuffer();
    if (!r) throw Error("Failed to create unit geometry buffer");
    this.m.bindBuffer(this.m.ARRAY_BUFFER, r), this.m.bufferData(this.m.ARRAY_BUFFER, this.bt.vertices, this.m.STATIC_DRAW), this.m.bindBuffer(this.m.ARRAY_BUFFER, null), this.Gt = r;
  }
  get type() {
    return this.yt;
  }
  get unitGeometry() {
    return this.bt;
  }
  get unitBuffer() {
    return this.Gt;
  }
  get batch() {
    return this.xt;
  }
  KA() {
    this.xt.clear();
  }
  HA() {
    return !this.xt.isEmpty;
  }
  W() {
    this.xt.W(), this.Gt && (this.m.deleteBuffer(this.Gt), this.Gt = null);
  }
  $t(A, t, e, s, r) {
    const i = this.Mt(A, t, e, s, r.rotationX || 0, r.rotationY || 0, r.rotationZ || 0);
    return { position: [A, t], size: [e, s], character: r.character || [0, 0, 0], primaryColor: r.charColor || [1, 1, 1, 1], secondaryColor: r.bgColor || [0, 0, 0, 1], rotation: r.charRotation || [0, 0], transform: [r.invert ? 1 : 0, r.flipHorizontally ? 1 : 0, r.flipVertically ? 1 : 0], globalRotationX: i.radiansX, globalRotationY: i.radiansY, globalRotationZ: i.radiansZ, rotationCenter: [i.centerX, i.centerY] };
  }
  Yt(A, t) {
    const e = R(this.m) || [0, 0, this.m.canvas.width, this.m.canvas.height];
    return { nx: A / e[2] * 2 - 1, ny: 1 - t / e[3] * 2 };
  }
  zt(A, t, e) {
    const s = this.Yt(t, e);
    A.rotationCenter = [s.nx, s.ny];
  }
  Mt(A, t, e, s, r, i, B) {
    const Q = R(this.m) || [0, 0, this.m.canvas.width, this.m.canvas.height], o = Q[2], h = Q[3];
    return { centerX: (A + e / 2) / o * 2 - 1, centerY: 1 - (t + s / 2) / h * 2, radiansX: -r * Math.PI / 180, radiansY: -i * Math.PI / 180, radiansZ: -B * Math.PI / 180, aspectRatio: o / h };
  }
}
const iA = { vertices: new Float32Array([0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 1]), vertexCount: 6, primitiveType: WebGL2RenderingContext.TRIANGLES, stride: 16, attributes: { position: { size: 2, offset: 0 }, texCoord: { size: 2, offset: 8 } } };
class BA extends T {
  constructor(A, t) {
    super(A, t, D.RECTANGLE, iA);
  }
  jA(A, t) {
    const e = this.$t(A.x, A.y, A.width, A.height, t);
    return this.xt.jA(e);
  }
}
const EA = { vertices: new Float32Array([0, -0.5, 0, 0, 1, -0.5, 1, 0, 0, 0.5, 0, 1, 0, 0.5, 0, 1, 1, -0.5, 1, 0, 1, 0.5, 1, 1]), vertexCount: 6, primitiveType: WebGL2RenderingContext.TRIANGLES, stride: 16, attributes: { position: { size: 2, offset: 0 }, texCoord: { size: 2, offset: 8 } } };
class QA extends T {
  constructor(A, t) {
    super(A, t, D.LINE, EA);
  }
  jA(A, t) {
    const e = A.x2 - A.x1, s = A.y2 - A.y1, r = Math.hypot(e, s), i = Math.atan2(s, e), B = A.thickness || t.lineWeight || 1, Q = A.x1 + e / 2, o = A.y1 + s / 2, h = Q - r / 2, a = o, g = { character: t.character, charColor: t.charColor, bgColor: t.bgColor, charRotation: t.charRotation, flipHorizontally: t.flipHorizontally, flipVertically: t.flipVertically, invert: t.invert, rotationX: t.rotationX || 0, rotationY: t.rotationY || 0, rotationZ: (t.rotationZ || 0) + 180 * i / Math.PI, lineWeight: B }, l = this.$t(h, a, r, B, g);
    return this.zt(l, Q, o), this.xt.jA(l);
  }
}
const nA = { vertices: function(E = 32) {
  const A = [], t = 2 * Math.PI / E;
  for (let e = 0; e < E; e++) {
    const s = e * t, r = (e + 1) % E * t, i = Math.cos(s), B = Math.sin(s), Q = 0.5 * (i + 1), o = 0.5 * (B + 1), h = Math.cos(r), a = Math.sin(r), g = 0.5 * (h + 1), l = 0.5 * (a + 1);
    A.push(0, 0, 0.5, 0.5, i, B, Q, o, h, a, g, l);
  }
  return new Float32Array(A);
}(32), vertexCount: 96, primitiveType: WebGL2RenderingContext.TRIANGLES, stride: 16, attributes: { position: { size: 2, offset: 0 }, texCoord: { size: 2, offset: 8 } } };
class oA extends T {
  constructor(A, t) {
    super(A, t, D.ELLIPSE, nA);
  }
  jA(A, t) {
    const e = this.$t(A.x, A.y, A.width, A.height, t);
    return this.zt(e, A.x, A.y), this.xt.jA(e);
  }
}
let aA = { vertices: function(E) {
  const A = [];
  for (let t = 0; t < E; t++) {
    const e = t / E, s = (t + 1) / E;
    A.push(e, 0, e, 0, e, 1, e, 1, s, 1, s, 1);
  }
  return new Float32Array(A);
}(32), vertexCount: 96, primitiveType: WebGL2RenderingContext.TRIANGLES, stride: 16, attributes: { position: { size: 2, offset: 0 }, texCoord: { size: 2, offset: 8 } } };
class gA extends T {
  constructor(A, t) {
    super(A, t, D.ARC, aA);
  }
  jA(A, t) {
    const e = A.x - A.width / 2, s = A.y - A.height / 2, r = A.start * Math.PI / 180, i = A.stop * Math.PI / 180, B = this.$t(e, s, A.width, A.height, t);
    return this.zt(B, A.x, A.y), B.arcAngles = [r, i], this.xt.jA(B);
  }
}
const hA = { vertices: new Float32Array([0, 0, 0, 0, 1, 0, 1, 0, 0.5, 1, 0.5, 1]), vertexCount: 3, primitiveType: WebGL2RenderingContext.TRIANGLES, stride: 16, attributes: { position: { size: 2, offset: 0 }, texCoord: { size: 2, offset: 8 } } };
class cA extends T {
  constructor(A, t) {
    super(A, t, D.TRIANGLE, hA);
  }
  jA(A, t) {
    const e = Math.min(A.x1, A.x2, A.x3), s = Math.max(A.x1, A.x2, A.x3), r = Math.min(A.y1, A.y2, A.y3), i = s - e, B = Math.max(A.y1, A.y2, A.y3) - r, Q = this.$t(e, r, i, B, t), o = e + 0.5 * i, h = r + B * (1 / 3);
    return this.zt(Q, o, h), this.xt.jA(Q);
  }
}
function k(E, A, t, e, s) {
  const r = 1 - E, i = r * r, B = E * E;
  return i * r * A + 3 * i * E * t + 3 * r * B * e + B * E * s;
}
const lA = { vertices: function(E = 16) {
  const A = [];
  for (let t = 0; t < E; t++) {
    const e = t / E, s = (t + 1) / E;
    A.push(e, -0.5, e, 0), A.push(s, -0.5, s, 0), A.push(e, 0.5, e, 1), A.push(e, 0.5, e, 1), A.push(s, -0.5, s, 0), A.push(s, 0.5, s, 1);
  }
  return new Float32Array(A);
}(16), vertexCount: 96, primitiveType: WebGL2RenderingContext.TRIANGLES, stride: 16, attributes: { position: { size: 2, offset: 0 }, texCoord: { size: 2, offset: 8 } } };
class CA extends T {
  constructor(A, t) {
    super(A, t, D.BEZIER_CURVE, lA);
  }
  jA(A, t) {
    const e = t.lineWeight || 1, s = k(0.5, A.x1, A.cp1x, A.cp2x, A.x2), r = k(0.5, A.y1, A.cp1y, A.cp2y, A.y2), i = { character: t.character, charColor: t.charColor, bgColor: t.bgColor, charRotation: t.charRotation, flipHorizontally: t.flipHorizontally, flipVertically: t.flipVertically, invert: t.invert, rotationX: t.rotationX || 0, rotationY: t.rotationY || 0, rotationZ: t.rotationZ || 0, lineWeight: e }, B = this.$t(0, 0, 1, e, i);
    return this.zt(B, s, r), B.bezierStartPoint = [A.x1, A.y1], B.bezierControlPoint1 = [A.cp1x, A.cp1y], B.bezierControlPoint2 = [A.cp2x, A.cp2y], B.bezierEndPoint = [A.x2, A.y2], this.xt.jA(B);
  }
}
class DA {
  constructor(A) {
    n(this, "m");
    n(this, "Rt", null);
    n(this, "St", null);
    n(this, "Tt", {});
    n(this, "Ft", null);
    n(this, "Ot", /* @__PURE__ */ new Map());
    n(this, "Ut");
    n(this, "Lt");
    n(this, "kt");
    this.m = A, this.kt = new AA(), this.Ut = new eA(A), this.Lt = new sA(), this.Ft = A.createBuffer(), G(this.m, [0, 0, this.m.canvas.width, this.m.canvas.height]);
  }
  Ht(A) {
    let t = this.Ot.get(A);
    if (t) return t;
    const e = new rA(this.m);
    return t = (0, { [D.RECTANGLE]: () => new BA(this.m, e), [D.LINE]: () => new QA(this.m, e), [D.ELLIPSE]: () => new oA(this.m, e), [D.ARC]: () => new gA(this.m, e), [D.TRIANGLE]: () => new cA(this.m, e), [D.BEZIER_CURVE]: () => new CA(this.m, e) }[A])(), this.Ot.set(A, t), t;
  }
  Wt(A) {
    this.Rt !== A && (this.Rt = A, A.AA());
  }
  Jt(A, t) {
    return new z(this.m, A, t);
  }
  Vt(A) {
    this.St = A, A && (this.Tt = {});
  }
  Kt(A, t) {
    this.Tt[A] = t;
  }
  Zt(A) {
    Object.assign(this.Tt, A);
  }
  jt(A) {
    return new z(this.m, L, A);
  }
  Xt(A, t, e, s) {
    var C;
    const r = this.m, i = r.canvas.width, B = r.canvas.height, Q = A / i * 2 - 1, o = (A + e) / i * 2 - 1, h = 1 - t / B * 2, a = 1 - (t + s) / B * 2, g = new Float32Array([Q, a, o, a, Q, h, o, a, o, h, Q, h]);
    r.bindBuffer(r.ARRAY_BUFFER, this.Ft), r.bufferData(r.ARRAY_BUFFER, g, r.DYNAMIC_DRAW);
    const l = ((C = this.Rt) == null ? void 0 : C.QA) || r.getParameter(r.CURRENT_PROGRAM), c = l ? r.getAttribLocation(l, "a_position") : -1;
    c !== -1 && (r.enableVertexAttribArray(c), r.vertexAttribPointer(c, 2, r.FLOAT, !1, 8, 0)), r.drawArrays(r.TRIANGLES, 0, 6), c !== -1 && r.disableVertexAttribArray(c);
  }
  Nt(A, t, e, s) {
    this.St ? (this.Lt.st(A, t, e, s, this.St, { ...this.Tt }, this.kt), this.St = null, this.Tt = {}) : this.Lt.Bt(A, t, e, s, this.kt);
  }
  qt(A, t, e, s) {
    this.Lt.it(A, t, e, s, this.kt.lineWeight, this.kt);
  }
  Ae(A, t, e, s) {
    this.Lt.Qt(A, t, e, s, this.kt);
  }
  te(A, t, e, s, r, i) {
    this.Lt.Et(A, t, e, s, r, i, this.kt);
  }
  ee(A, t, e, s, r, i, B, Q) {
    const o = this.kt.lineWeight;
    this.Lt.nt(A, t, e, s, r, i, B, Q, o, this.kt);
  }
  Be(A, t, e = 1, s = {}) {
    return new U(this.m, A, t, e, s);
  }
  se(A, t, e, s, r, i) {
    this.Lt.rt(A, t, e, s, r, i, this.kt);
  }
  ie(A, t = A, e = A, s = 255) {
    this.state.zA(A, t, e, s), this.ot(A / 255, t / 255, e / 255, s / 255);
  }
  ot(A = 0, t = 0, e = 0, s = 0) {
    this.m.clearColor(A, t, e, s), this.m.clear(this.m.COLOR_BUFFER_BIT);
  }
  Qe() {
    this.m.viewport(0, 0, this.m.canvas.width, this.m.canvas.height), G(this.m, [0, 0, this.m.canvas.width, this.m.canvas.height]);
  }
  get context() {
    return this.m;
  }
  get state() {
    return this.kt;
  }
  re(A) {
    const t = A, e = R(this.m) ?? this.m.getParameter(this.m.VIEWPORT), s = { shader: t, gl: this.m, viewport: e };
    this.Wt(t);
    const r = /* @__PURE__ */ new Set();
    for (const i of this.Lt) i.type === D.CUSTOM ? r.add(D.RECTANGLE) : r.add(i.type);
    for (const i of r) i !== D.CUSTOM && this.Ht(i);
    this.Ut.kA(s, this.Lt, this.Ot), this.Lt.ot();
  }
  W() {
    this.m.deleteBuffer(this.Ft), this.Lt.ot();
    for (const A of this.Ot.values()) A.W();
  }
}
const f = { readShort: (E, A) => (f.t.uint16[0] = E[A] << 8 | E[A + 1], f.t.int16[0]), readUshort: (E, A) => E[A] << 8 | E[A + 1], readUshorts(E, A, t) {
  const e = [];
  for (let s = 0; s < t; s++) e.push(f.readUshort(E, A + 2 * s));
  return e;
}, readUint(E, A) {
  const t = f.t.uint8;
  return t[3] = E[A], t[2] = E[A + 1], t[1] = E[A + 2], t[0] = E[A + 3], f.t.uint32[0];
}, readASCII(E, A, t) {
  let e = "";
  for (let s = 0; s < t; s++) e += String.fromCharCode(E[A + s]);
  return e;
}, t: (() => {
  const E = new ArrayBuffer(8);
  return { uint8: new Uint8Array(E), int16: new Int16Array(E), uint16: new Uint16Array(E), uint32: new Uint32Array(E) };
})() }, uA = { parseTab(E, A, t) {
  const e = { tables: [], ids: {}, off: A };
  E = new Uint8Array(E.buffer, A, t), A = 0;
  const s = f, r = s.readUshort, i = r(E, A += 2);
  A += 2;
  const B = [];
  for (let Q = 0; Q < i; Q++) {
    const o = r(E, A), h = r(E, A += 2);
    A += 2;
    const a = s.readUint(E, A);
    A += 4;
    const g = `p${o}e${h}`;
    let l = B.indexOf(a);
    if (l === -1) {
      let c;
      l = e.tables.length, B.push(a);
      const C = r(E, a);
      c = C === 4 ? this.parse4(E, a) : C === 12 ? this.parse12(E, a) : { format: C }, e.tables.push(c);
    }
    e.ids[g] != null && console.warn("Multiple tables for one platform+encoding: " + g), e.ids[g] = l;
  }
  return e;
}, parse4(E, A) {
  const t = f, e = t.readUshort, s = t.readUshorts, r = A, i = e(E, A += 2);
  A += 2;
  const B = e(E, A += 2) >>> 1, Q = { format: 4, searchRange: e(E, A += 2), entrySelector: 0, rangeShift: 0, endCount: [], startCount: [], idDelta: [], idRangeOffset: [], glyphIdArray: [] };
  A += 2, Q.entrySelector = e(E, A), A += 2, Q.rangeShift = e(E, A), A += 2, Q.endCount = s(E, A, B), A += 2 * B, A += 2, Q.startCount = s(E, A, B), A += 2 * B;
  for (let o = 0; o < B; o++) Q.idDelta.push(t.readShort(E, A)), A += 2;
  return Q.idRangeOffset = s(E, A, B), A += 2 * B, Q.glyphIdArray = s(E, A, r + i - A >> 1), Q;
}, parse12(E, A) {
  const t = f.readUint;
  t(E, A += 4), t(E, A += 4);
  const e = t(E, A += 4);
  A += 4;
  const s = new Uint32Array(3 * e);
  for (let r = 0; r < 3 * e; r += 3) s[r] = t(E, A + (r << 2)), s[r + 1] = t(E, A + (r << 2) + 4), s[r + 2] = t(E, A + (r << 2) + 8);
  return { format: 12, groups: s };
} }, PA = { parseTab(E, A, t) {
  const e = f;
  A += 18;
  const s = e.readUshort(E, A);
  A += 2, A += 16;
  const r = e.readShort(E, A);
  A += 2;
  const i = e.readShort(E, A);
  A += 2;
  const B = e.readShort(E, A);
  A += 2;
  const Q = e.readShort(E, A);
  return A += 2, A += 6, { unitsPerEm: s, xMin: r, yMin: i, xMax: B, yMax: Q, indexToLocFormat: e.readShort(E, A) };
} }, IA = { parseTab(E, A, t) {
  const e = f;
  A += 4;
  const s = ["ascender", "descender", "lineGap", "advanceWidthMax", "minLeftSideBearing", "minRightSideBearing", "xMaxExtent", "caretSlopeRise", "caretSlopeRun", "caretOffset", "res0", "res1", "res2", "res3", "metricDataFormat", "numberOfHMetrics"], r = {};
  for (let i = 0; i < s.length; i++) {
    const B = s[i], Q = B === "advanceWidthMax" || B === "numberOfHMetrics" ? e.readUshort : e.readShort;
    r[B] = Q(E, A + 2 * i);
  }
  return r;
} }, fA = { parseTab(E, A, t, e) {
  const s = f, r = [], i = [], B = e.maxp.numGlyphs, Q = e.hhea.numberOfHMetrics;
  let o = 0, h = 0, a = 0;
  for (; a < Q; ) o = s.readUshort(E, A + (a << 2)), h = s.readShort(E, A + (a << 2) + 2), r.push(o), i.push(h), a++;
  for (; a < B; ) r.push(o), i.push(h), a++;
  return { aWidth: r, lsBearing: i };
} }, N = { cmap: uA, head: PA, hhea: IA, maxp: { parseTab(E, A, t) {
  const e = f;
  return e.readUint(E, A), A += 4, { numGlyphs: e.readUshort(E, A) };
} }, hmtx: fA, loca: { parseTab(E, A, t, e) {
  const s = f, r = [], i = e.head.indexToLocFormat, B = e.maxp.numGlyphs + 1;
  if (i === 0) for (let Q = 0; Q < B; Q++) r.push(s.readUshort(E, A + (Q << 1)) << 1);
  else if (i === 1) for (let Q = 0; Q < B; Q++) r.push(s.readUint(E, A + (Q << 2)));
  return r;
} }, glyf: { parseTab(E, A, t, e) {
  const s = [], r = e.maxp.numGlyphs;
  for (let i = 0; i < r; i++) s.push(null);
  return s;
}, Ee(E, A) {
  const t = f, e = E.ne, s = E.loca;
  if (s[A] === s[A + 1]) return null;
  const r = y.findTable(e, "glyf", E.oe);
  if (!r) return null;
  let i = r[0] + s[A];
  const B = {};
  if (B.noc = t.readShort(e, i), i += 2, B.xMin = t.readShort(e, i), i += 2, B.yMin = t.readShort(e, i), i += 2, B.xMax = t.readShort(e, i), i += 2, B.yMax = t.readShort(e, i), i += 2, B.xMin >= B.xMax || B.yMin >= B.yMax) return null;
  if (B.noc > 0) {
    B.endPts = [];
    for (let g = 0; g < B.noc; g++) B.endPts.push(t.readUshort(e, i)), i += 2;
    const Q = t.readUshort(e, i);
    if (i += 2, e.length - i < Q) return null;
    i += Q;
    const o = B.endPts[B.noc - 1] + 1;
    B.flags = [];
    for (let g = 0; g < o; g++) {
      const l = e[i];
      if (i++, B.flags.push(l), 8 & l) {
        const c = e[i];
        i++;
        for (let C = 0; C < c; C++) B.flags.push(l), g++;
      }
    }
    B.xs = [];
    for (let g = 0; g < o; g++) {
      const l = B.flags[g], c = !!(16 & l);
      2 & l ? (B.xs.push(c ? e[i] : -e[i]), i++) : c ? B.xs.push(0) : (B.xs.push(t.readShort(e, i)), i += 2);
    }
    B.ys = [];
    for (let g = 0; g < o; g++) {
      const l = B.flags[g], c = !!(32 & l);
      4 & l ? (B.ys.push(c ? e[i] : -e[i]), i++) : c ? B.ys.push(0) : (B.ys.push(t.readShort(e, i)), i += 2);
    }
    let h = 0, a = 0;
    for (let g = 0; g < o; g++) h += B.xs[g], a += B.ys[g], B.xs[g] = h, B.ys[g] = a;
  } else B.parts = [], B.endPts = [], B.flags = [], B.xs = [], B.ys = [];
  return B;
} } }, y = { parse: (E) => [((A, t, e, s) => {
  const r = N, i = { ne: A, ge: t, oe: e };
  for (const B in r) {
    const Q = B, o = y.findTable(A, Q, e);
    if (o) {
      const [h, a] = o;
      let g = s[h];
      g == null && (g = r[Q].parseTab(A, h, a, i), s[h] = g), i[Q] = g;
    }
  }
  return i;
})(new Uint8Array(E), 0, 0, {})], findTable(E, A, t) {
  const e = f, s = e.readUshort(E, t + 4);
  let r = t + 12;
  for (let i = 0; i < s; i++) {
    const B = e.readASCII(E, r, 4);
    e.readUint(E, r + 4);
    const Q = e.readUint(E, r + 8), o = e.readUint(E, r + 12);
    if (B === A) return [Q, o];
    r += 16;
  }
  return null;
}, T: N, B: f };
class F {
  constructor() {
    n(this, "ae", /* @__PURE__ */ new Map());
    n(this, "he", /* @__PURE__ */ new Map());
  }
  ce(A, t) {
    const e = `${this.Ce(A)}_${t}`;
    if (this.ae.has(e)) return this.ae.get(e);
    const s = A.cmap;
    if (!s || !s.tables) return this.ae.set(e, 0), 0;
    let r = 0;
    for (const i of s.tables) if (i.format === 4 ? r = this.De(t, i) : i.format === 12 && (r = this.le(t, i)), r > 0) break;
    return this.ae.set(e, r), r;
  }
  Pe(A, t) {
    const e = t.codePointAt(0);
    return e === void 0 ? 0 : this.ce(A, e);
  }
  ue(A, t) {
    const e = A.hmtx;
    return e && e.aWidth && e.aWidth.length !== 0 ? t < e.aWidth.length ? e.aWidth[t] : e.aWidth[e.aWidth.length - 1] : 0;
  }
  Ie(A, t) {
    const e = t / A.head.unitsPerEm, s = A.hhea.ascender * e, r = A.hhea.descender * e, i = A.hhea.lineGap * e;
    return { ascender: s, descender: r, lineGap: i, lineHeight: s - r + i, unitsPerEm: A.head.unitsPerEm, scale: e };
  }
  we() {
    this.ae.clear(), this.he.clear();
  }
  Ce(A) {
    return `${A.oe}_${A.ne.length}`;
  }
  De(A, t) {
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
  le(A, t) {
    const e = t.groups.length / 3;
    for (let s = 0; s < e; s++) {
      const r = t.groups[3 * s], i = t.groups[3 * s + 1], B = t.groups[3 * s + 2];
      if (A >= r && A <= i) return B + (A - r);
    }
    return 0;
  }
}
class dA {
  constructor(A) {
    n(this, "fe");
    this.fe = A;
  }
  de(A) {
    var e;
    const t = [];
    return (e = A.cmap) != null && e.tables ? (A.cmap.tables.forEach((s) => {
      if (s.format === 4) {
        const r = this.pe(s);
        t.push(...r);
      } else if (s.format === 12) {
        const r = this._e(s);
        t.push(...r);
      }
    }), [...new Set(t)]) : [];
  }
  me(A, t) {
    return this.fe.Pe(A, t) > 0;
  }
  ve(A, t) {
    for (const e of t) if (!this.me(A, e)) return !1;
    return !0;
  }
  xe(A, t) {
    return t.filter((e) => this.me(A, e));
  }
  ye(A) {
    return A.filter((t) => this.be(t));
  }
  pe(A) {
    const t = [];
    if (!(A.startCount && A.endCount && A.idRangeOffset && A.idDelta)) return t;
    for (let e = 0; e < A.startCount.length; e++) {
      const s = A.startCount[e], r = A.endCount[e];
      if (s !== 65535 || r !== 65535) {
        for (let i = s; i <= r; i++)
          if (this.Ge(A, i, e) > 0) try {
            const B = String.fromCodePoint(i);
            t.push(B);
          } catch {
          }
      }
    }
    return t;
  }
  _e(A) {
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
  Ge(A, t, e) {
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
  be(A) {
    const t = A.codePointAt(0) || 0;
    return !(t >= 0 && t <= 31 && t !== 9 && t !== 10 && t !== 13 || t >= 127 && t <= 159);
  }
}
class wA {
  constructor() {
    n(this, "$e");
    const A = new F();
    this.$e = new dA(A);
  }
  extractCharacters(A) {
    return this.$e.de(A);
  }
  filterProblematicCharacters(A) {
    return this.$e.ye(A);
  }
  characterExists(A, t) {
    return this.$e.me(A, t);
  }
  allCharactersExist(A, t) {
    return this.$e.ve(A, t);
  }
}
class mA {
  constructor(A) {
    n(this, "Me");
    n(this, "Ye");
    n(this, "ze");
    n(this, "Re");
    this.ze = A, this.Re = new F(), this.Me = document.createElement("canvas"), this.Ye = this.Me.getContext("2d", { willReadFrequently: !0, alpha: !1 });
  }
  createTextureAtlas(A, t, e, s) {
    const r = A.length, i = Math.ceil(Math.sqrt(r)), B = Math.ceil(r / i), Q = t.width * i, o = t.height * B, h = typeof s == "object" ? s : null;
    this.Se(Q, o), this.Te(A, t, i, e, h);
    const a = this.ze.Be(Q, o, 1, { filter: "nearest" });
    return a.F(this.Me), { framebuffer: a, columns: i, rows: B };
  }
  Se(A, t) {
    this.Me.width = A, this.Me.height = t, this.Me.style.width = A + "px", this.Me.style.height = A + "px", this.Ye.imageSmoothingEnabled = !1, this.Me.style.imageRendering = "pixelated", this.Ye.fillStyle = "black", this.Ye.fillRect(0, 0, A, t), this.Ye.textBaseline = "top", this.Ye.textAlign = "left", this.Ye.fillStyle = "white";
  }
  Te(A, t, e, s, r) {
    const i = s / r.head.unitsPerEm;
    for (let B = 0; B < A.length; B++) {
      const Q = B % e, o = Math.floor(B / e), h = A[B].character, a = this.Fe(r, h);
      if (!a) continue;
      const g = h.codePointAt(0) || 0, l = this.Re.ce(r, g), c = this.Oe(r, l) * i, C = Q * t.width, d = o * t.height, I = C + 0.5 * t.width, w = d + 0.5 * t.height, p = Math.round(I - 0.5 * t.width), u = Math.round(w - 0.5 * s), M = p + 0.5 * (t.width - c), j = u + r.hhea.ascender * i;
      this.Ue(a, M, j, i);
    }
  }
  Fe(A, t) {
    const e = t.codePointAt(0) || 0, s = this.Re.ce(A, e);
    if (s === 0) return null;
    if (A.glyf && A.glyf[s] !== null) return A.glyf[s];
    if (y && y.T && y.T.glyf) {
      const r = y.T.glyf.Ee(A, s);
      return A.glyf && r && (A.glyf[s] = r), r;
    }
    return null;
  }
  Oe(A, t) {
    const e = A.hmtx;
    return e && e.aWidth ? t < e.aWidth.length ? e.aWidth[t] : e.aWidth[e.aWidth.length - 1] : 0;
  }
  Ue(A, t, e, s) {
    if (!A || !A.xs || A.noc === 0) return;
    const { xs: r, ys: i, endPts: B, flags: Q } = A;
    if (!(r && i && B && Q)) return;
    this.Ye.beginPath();
    let o = 0;
    for (let h = 0; h < B.length; h++) {
      const a = B[h];
      if (!(a < o)) {
        if (a >= o) {
          const g = t + r[o] * s, l = e - i[o] * s;
          this.Ye.moveTo(g, l);
          let c = o + 1;
          for (; c <= a; )
            if (1 & Q[c]) {
              const C = t + r[c] * s, d = e - i[c] * s;
              this.Ye.lineTo(C, d), c++;
            } else {
              const C = t + r[c] * s, d = e - i[c] * s;
              let I = c + 1 > a ? o : c + 1;
              if (1 & Q[I]) {
                const w = t + r[I] * s, p = e - i[I] * s;
                this.Ye.quadraticCurveTo(C, d, w, p), c = I + 1;
              } else {
                const w = (C + (t + r[I] * s)) / 2, p = (d + (e - i[I] * s)) / 2;
                this.Ye.quadraticCurveTo(C, d, w, p), c = I;
              }
            }
          this.Ye.closePath();
        }
        o = a + 1;
      }
    }
    this.Ye.fill();
  }
}
class pA {
  constructor() {
    n(this, "fe");
    this.fe = new F();
  }
  calculateMaxGlyphDimensions(A, t, e) {
    let s = 0;
    const r = this.fe.Ie(e, t), i = r.lineHeight;
    for (const B of A) {
      const Q = this.fe.Pe(e, B);
      if (Q === 0) continue;
      const o = this.fe.ue(e, Q) * r.scale;
      s = Math.max(s, o);
    }
    return { width: Math.ceil(s), height: Math.ceil(i) };
  }
  getCharacterAdvanceWidth(A, t, e) {
    const s = this.fe.Ie(e, t), r = this.fe.Pe(e, A);
    return this.fe.ue(e, r) * s.scale;
  }
  getFontMetrics(A, t) {
    return this.fe.Ie(t, A);
  }
  we() {
    this.fe.we();
  }
}
class yA {
  constructor() {
    n(this, "Re");
    this.Re = new F();
  }
  createCharacterObjects(A, t) {
    return A.map((e, s) => {
      const r = e.codePointAt(0) || 0, i = this.Le(s);
      let B = 0;
      if (t.hmtx && t.hmtx.aWidth) {
        const Q = this.Re.ce(t, r);
        Q > 0 && t.hmtx.aWidth[Q] !== void 0 && (B = t.hmtx.aWidth[Q]);
      }
      return { character: e, unicode: r, color: i, advanceWidth: B };
    });
  }
  Le(A) {
    return [A % 256 / 255, Math.floor(A / 256) % 256 / 255, Math.floor(A / 65536) % 256 / 255];
  }
  ke(A, t) {
    if (!_.P(typeof A == "string", "Character must be a string.", { method: "getCharacterColor", providedValue: A })) return [0, 0, 0];
    const e = t.find((s) => s.character === A);
    return e ? e.color : [0, 0, 0];
  }
  He(A, t) {
    return _.P(typeof A == "string" && A.length > 0, "Characters must be a string with at least one character.", { method: "getCharacterColors", providedValue: A }) ? Array.from(A).map((e) => this.ke(e, t) || [0, 0, 0]) : [[0, 0, 0]];
  }
}
class xA {
  constructor(A, t = 16) {
    n(this, "We");
    n(this, "Je", []);
    n(this, "Ve");
    n(this, "Ke", 16);
    n(this, "Ze", 0);
    n(this, "je", 0);
    n(this, "Xe", { width: 0, height: 0 });
    n(this, "Ne");
    n(this, "qe");
    n(this, "AB");
    n(this, "tB");
    n(this, "eB");
    this.Ke = t, this.qe = new wA(), this.AB = new mA(A), this.tB = new pA(), this.eB = new yA();
  }
  async BB(A) {
    let t;
    if (A) {
      const e = await fetch(A);
      if (!e.ok) throw new m(`Failed to load font file: ${e.status} ${e.statusText}`);
      t = await e.arrayBuffer();
    } else
      t = await (await fetch(`data:font/truetype;charset=utf-8;base64,AAEAAAAKAIAAAwAgT1MvMs+QEyQAAAEoAAAAYGNtYXAg7yVJAAAFjAAACSBnbHlmuHLTdAAAErQAAGi0aGVhZFvXdUwAAACsAAAANmhoZWELAQUCAAAA5AAAACRobXR4BACDgAAAAYgAAAQEbG9jYQAy54AAAA6sAAAECG1heHABIgCCAAABCAAAACBuYW1lVs/OSgAAe2gAAAOicG9zdABpADQAAH8MAAAAIAABAAAAAQAAzOWHqV8PPPUAAAQAAAAAAHxiGCcAAAAAfGIYJwAAAAAEAAQAAAAACAACAAEAAAAAAAEAAAQAAAAAAAQAAAAAAAcAAAEAAAAAAAAAAAAAAAAAAAEBAAEAAAEBAIAAIAAAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAgQAAZAABQAEAgACAAAAAAACAAIAAAACAAAzAMwAAAAABAAAAAAAAACAAACLAABw4wAAAAAAAAAAWUFMLgBAACAmawQAAAAAAAQAAAAAAAFRAAAAAAMABAAAAAAgAAAEAAAABAAAAAQAAAAEAAGABAABAAQAAIAEAACABAAAgAQAAIAEAAGABAABAAQAAQAEAACABAABAAQAAIAEAACABAABAAQAAIAEAACABAAAgAQAAIAEAACABAAAgAQAAIAEAACABAAAgAQAAIAEAACABAABAAQAAIAEAAEABAAAgAQAAIAEAACABAAAgAQAAIAEAACABAAAgAQAAIAEAACABAAAgAQAAIAEAACABAAAgAQAAIAEAACABAAAgAQAAIAEAACABAAAgAQAAIAEAACABAAAgAQAAIAEAACABAAAgAQAAIAEAACABAAAgAQAAIAEAACABAABAAQAAIAEAAEABAAAgAQAAIAEAAEABAAAgAQAAIAEAACABAAAgAQAAIAEAAEABAAAgAQAAIAEAAGABAAAgAQAAIAEAAGABAAAgAQAAIAEAACABAAAgAQAAIAEAAEABAAAgAQAAIAEAACABAAAgAQAAIAEAACABAAAgAQAAIAEAACABAABgAQAAQAEAACABAAAAAQAAgAEAACABAAAgAQAAIAEAACABAACAAQAAAAEAAIABAABgAQAAgAEAACABAAAgAQAAAAEAACABAAAAAQAAAAEAAAABAAAAAQAAAAEAAIABAADAAQAAAAEAAAABAAAgAQAAYAEAAAABAAAAAQAAIAEAAAA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AIAAAACA/YAAgAAAAIAAAP8AAoABAAAA/4AAAP+A/4AAgAAAAIAAAP8AA4AAAP8AAAAAgAAAAIAAAP+AAAD/gAAA/4AAAP+AAAD/gAAA/4AAAACAAAAAgAAAAIAAAACAAAAAgAAAAAAAAP+AAAD/gAAAAAAAAP8AAAAAgAAAAAAAAP+AAAD/gAAAAAAAAwCAAIAEAAQAABcAHQAjAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAIAAAAAgAAA/4AAAACAAAAAgAAA/4AAAACAAAD9AAAA/4AAAACAAAD/gAAAAIAAgAAAAIAAAACAAAD/AAAAAQAAAP+AAAAEAAAA/4AAAP8AAAD/gAAAAIAAAP8AAAD/gAAA/4AAAACAAAABAAAAAIAAAAEAAAAAAP+AAAD/gAAAAQD+gP8AAAAAgAAAAIAAAAABAYACgAKABAAAAwAAAQEBAQGAAQAAAP8ABAAAAP6AAAAAAAABAQAAgAMABAAAEwAAAQEBAQEBAQEBAQEBAQEBAQEBAQECAAEAAAD/gAAA/4AAAACAAAAAgAAA/wAAAP+AAAD/gAAAAIAAAACABAAAAP+AAAD/gAAA/oAAAP+AAAD/gAAAAIAAAACAAAABgAAAAIAAAAAAAAEBAACAAwAEAAATAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEAAQAAAACAAAAAgAAA/4AAAP+AAAD/AAAAAIAAAACAAAD/gAAA/4AEAAAA/4AAAP+AAAD+gAAA/4AAAP+AAAAAgAAAAIAAAAGAAAAAgAAAAAAABQCAAYADgAQAAAMABwATABcAGwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAAIAAAP+AAYAAgAAA/4D/AAEAAAABAAAA/wAAAP8AAAD/AAAAAQD/gACAAAD/gAGAAIAAAP+ABAAAAP+AAAAAgAAA/4AAAAAAAAD/gAAA/4AAAP+AAAAAgAAAAIAAAP8AAAD/gAAAAIAAAP+AAAAAAAABAQAAgAOAAwAACwAAAQEBAQEBAQEBAQEBAgAAgAAAAQAAAP8AAAD/gAAA/wAAAAEAAwAAAP8AAAD/gAAA/wAAAAEAAAAAgAAAAAAAAQCAAAACAAGAAAcAAAEBAQEBAQEBAQABAAAA/4AAAP8AAAAAgAGAAAD/AAAA/4AAAACAAAAAAAABAIABgAOAAgAAAwAAAQEBAQCAAwAAAP0AAgAAAP+AAAAAAAABAQAAgAIAAYAAAwAAAQEBAQEAAQAAAP8AAYAAAP8AAAAAAAABAIAAgAQAA4AAFwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAwABAAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/AAAAAIAAAACAAAAAgAAAAIAAAACAA4AAAP+AAAD/gAAA/4AAAP+AAAD/gAAA/4AAAACAAAAAgAAAAIAAAACAAAAAgAAAAAAAAwCAAIADgAQAAAsAEQAXAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAIAAAAAgAAA/4AAAP4AAAD/gAAAAIAAgAAAAIAAAACAAAD/gAAA/4AAAAEAAAAEAAAA/4AAAP2AAAD/gAAAAIAAAAKAAAAAAP8AAAAAgAAAAID/AP+AAAD/AAAAAYAAAAABAIAAgAOABAAADQAAAQEBAQEBAQEBAQEBAQEBgAEAAAABAAAA/QAAAAEAAAD/AAAAAIAAAACABAAAAP0AAAD/gAAAAIAAAAGAAAAAgAAAAIAAAAABAIAAgAOABAAAGwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAAgAAAACAAAD/gAAA/4AAAP+AAAABgAAA/QAAAACAAAAAgAAAAIAAAACAAAD/AAAA/wAAAACABAAAAP+AAAD/AAAA/4AAAP+AAAD/gAAA/4AAAACAAAAAgAAAAIAAAACAAAABAAAA/wAAAAEAAAAAAAABAIAAgAOABAAAGwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAAgAAAACAAAD/gAAAAIAAAP+AAAD+AAAA/4AAAAEAAAABAAAA/wAAAAEAAAD/AAAA/wAAAACABAAAAP+AAAD/AAAA/4AAAP8AAAD/gAAAAIAAAACAAAD/gAAAAQAAAACAAAABAAAA/4AAAACAAAAAAAABAIAAgAOABAAAEQAAAQEBAQEBAQEBAQEBAQEBAQEBAYABAAAA/4AAAP+AAAABAAAAAQAAAP8AAAD+AAAAAIAAAACABAAAAP+AAAD/gAAA/wAAAAEAAAD9gAAAAQAAAAGAAAAAgAAAAAEAgACAA4AEAAATAAABAQEBAQEBAQEBAQEBAQEBAQEBAQCAAwAAAP4AAAABgAAAAIAAAP+AAAD+AAAA/4AAAAEAAAABAAAA/gAEAAAA/4AAAP8AAAD/gAAA/wAAAP+AAAAAgAAAAIAAAP+AAAABAAAAAAAAAgCAAIADgAQAABMAFwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQACAAAAAIAAAP8AAAD/AAAAAYAAAACAAAD/gAAA/gAAAP+AAAAAgACAAAABAAAABAAAAP+AAAD/gAAAAIAAAP8AAAD/gAAA/wAAAP+AAAAAgAAAAoAAAP6A/wAAAAEAAAEAgACAA4AEAAAPAAABAQEBAQEBAQEBAQEBAQEBAIADAAAA/4AAAP+AAAD/AAAAAIAAAACAAAD+gAAA/4AEAAAA/oAAAP+AAAD+gAAAAYAAAACAAAABAAAA/4AAAAAAAAMAgACAA4AEAAATABcAGwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAAgAAAACAAAD/gAAAAIAAAP+AAAD+AAAA/4AAAACAAAD/gAAAAIAAgAAAAQAAAP8AAAABAAAABAAAAP+AAAD/AAAA/4AAAP8AAAD/gAAAAIAAAAEAAAAAgAAAAQAAAAAA/wAAAAEA/oD/AAAAAQAAAAACAIAAgAOABAAACwAPAAABAQEBAQEBAQEBAQEBAQEBAQACAAAAAIAAAP8AAAD+gAAA/4AAAACAAIAAAAEAAAAEAAAA/4AAAP0AAAABAAAAAIAAAAGAAAAAAP6AAAABgAACAQABAAIAA4AAAwAHAAABAQEBAQEBAQEAAQAAAP8AAAABAAAA/wADgAAA/wAAAP+AAAD/AAAAAAIAgACAAgADgAADAAsAAAEBAQEBAQEBAQEBAQEAAQAAAP8AAAABAAAA/4AAAP8AAAAAgAOAAAD/AAAA/4AAAP8AAAD/gAAAAIAAAAABAQAAgAOABAAAGwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQKAAQAAAP+AAAD/gAAA/4AAAACAAAAAgAAAAIAAAP8AAAD/gAAA/4AAAP+AAAAAgAAAAIAAAACABAAAAP+AAAD/gAAA/4AAAP+AAAD/gAAA/4AAAP+AAAAAgAAAAIAAAACAAAAAgAAAAIAAAACAAAAAAAACAIABgAOAAwAAAwAHAAABAQEBAQEBAQCAAwAAAP0AAAADAAAA/QADAAAA/4AAAP+AAAD/gAAAAAEAgACAAwAEAAAbAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAIABAAAAAIAAAACAAAAAgAAA/4AAAP+AAAD/gAAA/wAAAACAAAAAgAAAAIAAAP+AAAD/gAAA/4AEAAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/gAAA/4AAAACAAAAAgAAAAIAAAACAAAAAgAAAAIAAAAAAAAIAgACAA4AEAAATABcAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAAgAAAACAAAD/gAAA/4AAAP8AAAAAgAAAAIAAAP8AAAD/AAAAAIAAgAEAAAD/AAQAAAD/gAAA/4AAAP+AAAD/gAAAAIAAAACAAAAAgAAA/4AAAACAAAD+AAAA/wAAAAACAIAAgAOABAAAEQAVAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQACAAAAAIAAAP6AAAAAgAAA/wAAAAGAAAD+AAAA/4AAAACAAgAAgAAA/4AEAAAA/4AAAP6AAAABAAAAAIAAAP2AAAD/gAAAAIAAAAKAAAD+AAAA/4AAAAAAAAIAgACAA4AEAAAPABMAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAYABAAAAAIAAAACAAAD/AAAA/wAAAP8AAAAAgAAAAIAAAAAAAQAAAAQAAAD/gAAA/4AAAP2AAAABAAAA/wAAAAKAAAAAgAAA/4D/AAAAAQAAAwCAAIADgAQAAAsADwATAAABAQEBAQEBAQEBAQEBAQEBAQEBAQCAAoAAAACAAAD/gAAAAIAAAP+AAAD9gAEAAAABAAAA/wAAAAEAAAAEAAAA/4AAAP8AAAD/gAAA/wAAAP+AAAADAP8AAAABAP6A/wAAAAEAAAAAAQCAAIADgAQAABMAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQACAAAAAIAAAP8AAAD/AAAAAQAAAAEAAAD/gAAA/gAAAP+AAAAAgAQAAAD/gAAA/4AAAACAAAD9gAAAAIAAAP+AAAD/gAAAAIAAAAKAAAAAAAACAIAAgAOABAAACwATAAABAQEBAQEBAQEBAQEBAQEBAQEBAQCAAgAAAACAAAAAgAAA/4AAAP+AAAD+AAEAAAAAgAAAAIAAAP+AAAAEAAAA/4AAAP+AAAD+gAAA/4AAAP+AAAADAP2AAAAAgAAAAYAAAACAAAEAgACAA4AEAAAXAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAIAAAAAgAAA/wAAAP8AAAABAAAA/wAAAAEAAAABAAAA/4AAAP4AAAD/gAAAAIAEAAAA/4AAAP+AAAAAgAAA/wAAAP+AAAD/AAAAAIAAAP+AAAD/gAAAAIAAAAKAAAAAAAABAIAAgAOABAAACQAAAQEBAQEBAQEBAQCAAwAAAP4AAAABAAAA/wAAAP8ABAAAAP+AAAD/AAAA/4AAAP6AAAAAAQCAAIADgAQAABUAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAIAAAAAgAAA/wAAAP8AAAABAAAA/4AAAAGAAAD/gAAA/gAAAP+AAAAAgAQAAAD/gAAA/4AAAACAAAD9gAAAAQAAAACAAAD+gAAA/4AAAACAAAACgAAAAAEAgACAA4AEAAALAAABAQEBAQEBAQEBAQEAgAEAAAABAAAAAQAAAP8AAAD/AAAA/wAEAAAA/gAAAAIAAAD8gAAAAQAAAP8AAAAAAAABAIAAgAOABAAACwAAAQEBAQEBAQEBAQEBAIADAAAA/wAAAAEAAAD9AAAAAQAAAP8ABAAAAP+AAAD9gAAA/4AAAACAAAACgAAAAAAAAQCAAIAEAAQAAA8AAAEBAQEBAQEBAQEBAQEBAQEBAAMAAAD/gAAA/4AAAP4AAAD/gAAAAQAAAAEAAAD+gAQAAAD/gAAA/YAAAP+AAAAAgAAAAQAAAP8AAAACgAAAAAAAAQCAAIADgAQAABsAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAgAEAAAAAgAAAAIAAAAEAAAD/gAAA/4AAAP+AAAAAgAAAAIAAAACAAAD/AAAA/4AAAP+AAAD/AAQAAAD/AAAAAIAAAACAAAD/gAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/gAAAAIAAAACAAAD/AAAAAAAAAQCAAIADgAQAAAUAAAEBAQEBAQCAAQAAAAIAAAD9AAQAAAD9AAAA/4AAAAABAIAAgAQABAAAEwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEAgAEAAAAAgAAAAIAAAACAAAABAAAA/wAAAP+AAAD/gAAA/4AAAP8ABAAAAP+AAAD/gAAAAIAAAACAAAD8gAAAAgAAAP+AAAAAgAAA/gAAAAAAAAEAgACABAAEAAATAAABAQEBAQEBAQEBAQEBAQEBAQEBAQCAAQAAAACAAAAAgAAAAIAAAAEAAAD/AAAA/4AAAP+AAAD/gAAA/wAEAAAA/4AAAP+AAAD/gAAAAYAAAPyAAAABAAAAAIAAAACAAAD+AAAAAAAAAgCAAIADgAQAAAsADwAAAQEBAQEBAQEBAQEBAQEBAQEAAgAAAACAAAD/gAAA/gAAAP+AAAAAgACAAAABAAAABAAAAP+AAAD9gAAA/4AAAACAAAACgAAAAAD9gAAAAoAAAgCAAIADgAQAAAkADQAAAQEBAQEBAQEBAQEBAQEAgAKAAAAAgAAA/4AAAP6AAAD/AAEAAAABAAAABAAAAP+AAAD+gAAA/4AAAP8AAAADAP6AAAABgAAAAAIAgACABAAEAAAPABcAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAAgAAAACAAAAAgAAA/4AAAP+AAAD+AAAA/4AAAACAAIAAAAEAAAD/gAAAAIAAAAQAAAD/gAAA/gAAAP8AAAAAgAAA/4AAAACAAAACgAAAAAD9gAAAAIAAAACAAAABgAACAIAAgAOABAAAEwAXAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAgAKAAAAAgAAA/4AAAP+AAAAAgAAAAIAAAP8AAAD/gAAA/4AAAP8AAQAAAAEAAAAEAAAA/4AAAP8AAAD/gAAA/4AAAP+AAAD/gAAAAIAAAACAAAD/AAAAAwD/AAAAAQAAAQCAAIADgAQAABsAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAIAAAAAgAAA/wAAAP8AAAABgAAAAIAAAP+AAAD+AAAA/4AAAAEAAAABAAAA/oAAAP+AAAAAgAQAAAD/gAAA/4AAAACAAAD/AAAA/4AAAP8AAAD/gAAAAIAAAACAAAD/gAAAAQAAAACAAAABAAAAAAAAAQCAAIADgAQAAAcAAAEBAQEBAQEBAIADAAAA/wAAAP8AAAD/AAQAAAD/gAAA/QAAAAMAAAAAAAABAIAAgAOABAAACwAAAQEBAQEBAQEBAQEBAIABAAAAAQAAAAEAAAD/gAAA/gAAAP+ABAAAAP0AAAADAAAA/QAAAP+AAAAAgAAAAAAAAQCAAIADgAQAAA8AAAEBAQEBAQEBAQEBAQEBAQEAgAEAAAABAAAAAQAAAP+AAAD/gAAA/wAAAP+AAAD/gAQAAAD+AAAAAgAAAP4AAAD/AAAA/4AAAACAAAABAAAAAAAAAQCAAIAEAAQAABMAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAIABAAAAAIAAAACAAAAAgAAAAQAAAP8AAAD/gAAA/4AAAP+AAAD/AAQAAAD+AAAAAIAAAP+AAAACAAAA/IAAAACAAAAAgAAA/4AAAP+AAAAAAAABAIAAgAOABAAAGwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQCAAQAAAAEAAAABAAAA/4AAAP+AAAAAgAAAAIAAAP8AAAD/AAAA/wAAAACAAAAAgAAA/4AAAP+ABAAAAP8AAAABAAAA/wAAAP+AAAD/gAAA/4AAAP8AAAABAAAA/wAAAAEAAAAAgAAAAIAAAACAAAAAAAABAIAAgAOABAAADwAAAQEBAQEBAQEBAQEBAQEBAQCAAQAAAAEAAAABAAAA/4AAAP+AAAD/AAAA/4AAAP+ABAAAAP6AAAABgAAA/oAAAP+AAAD+gAAAAYAAAACAAAAAAAABAIAAgAOABAAAFwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAIADAAAA/4AAAP+AAAD/gAAA/4AAAAIAAAD9AAAAAIAAAACAAAAAgAAAAIAAAP4ABAAAAP8AAAD/gAAA/4AAAP+AAAD/gAAA/4AAAAEAAAAAgAAAAIAAAACAAAAAgAAAAAAAAQEAAIADAAQAAAcAAAEBAQEBAQEBAQACAAAA/wAAAAEAAAD+AAQAAAD/gAAA/YAAAP+AAAAAAAABAIAAgAQAA4AAFwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAIABAAAAAIAAAACAAAAAgAAAAIAAAACAAAD/AAAA/4AAAP+AAAD/gAAA/4AAAP+AA4AAAP+AAAD/gAAA/4AAAP+AAAD/gAAA/4AAAACAAAAAgAAAAIAAAACAAAAAgAAAAAAAAQEAAIADAAQAAAcAAAEBAQEBAQEBAQACAAAA/gAAAAEAAAD/AAQAAAD8gAAAAIAAAAKAAAAAAAABAIACAAQABAAAFwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAgAAgAAAAIAAAACAAAAAgAAA/wAAAP+AAAD/gAAA/4AAAP8AAAAAgAAAAIAAAACABAAAAP+AAAD/gAAA/4AAAP+AAAAAgAAAAIAAAP+AAAD/gAAAAIAAAACAAAAAgAAAAAAAAQCAAIADgAEAAAMAAAEBAQEAgAMAAAD9AAEAAAD/gAAAAAAAAQEAAoACgAQAAAkAAAEBAQEBAQEBAQEBAAEAAAAAgAAA/4AAAP+AAAD/gAQAAAD/gAAA/wAAAACAAAAAgAAAAAEAgACAA4ADAAAPAAABAQEBAQEBAQEBAQEBAQEBAQACgAAA/4AAAP+AAAD/AAAAAQAAAP6AAAD/gAAAAIADAAAA/YAAAACAAAABgAAA/oAAAP+AAAAAgAAAAYAAAAAAAAIAgACAA4AEAAAJAA0AAAEBAQEBAQEBAQEBAQEBAIABAAAAAYAAAACAAAD/gAAA/YABAAAAAQAAAAQAAAD/AAAA/4AAAP6AAAD/gAAAAgD+gAAAAYAAAAABAIAAgAOAAwAAEwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAIAAAAAgAAA/wAAAP8AAAABAAAAAQAAAP+AAAD+AAAA/4AAAACAAwAAAP+AAAD/gAAAAIAAAP6AAAAAgAAA/4AAAP+AAAAAgAAAAYAAAAAAAAIAgACAA4AEAAAJAA0AAAEBAQEBAQEBAQEBAQEBAoABAAAA/YAAAP+AAAAAgAAAAYD/AAAAAQAAAAQAAAD8gAAAAIAAAAGAAAAAgAAA/4D+gAAAAYAAAAACAIAAgAOAAwAADQARAAABAQEBAQEBAQEBAQEBAQEBAQEBAAIAAAAAgAAA/gAAAAGAAAD+AAAA/4AAAACAAIAAAAEAAAADAAAA/4AAAP8AAAD/gAAA/4AAAACAAAABgAAAAAD/gAAAAIAAAAABAQAAgAOAA4AACwAAAQEBAQEBAQEBAQEBAYACAAAA/oAAAAEAAAD/AAAA/wAAAACAA4AAAP+AAAD/AAAA/4AAAP8AAAACgAAAAAAAAgCAAIADgAOAAA8AEwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAIAAAAAgAAA/4AAAP4AAAABgAAA/oAAAP+AAAAAgACAAAABAAAAA4AAAP+AAAD+AAAA/4AAAACAAAAAgAAAAIAAAAEAAAAAAP8AAAABAAABAIAAgAOABAAACwAAAQEBAQEBAQEBAQEBAIABAAAAAYAAAACAAAD/AAAA/wAAAP8ABAAAAP8AAAD/gAAA/gAAAAIAAAD+AAAAAAAAAgGAAIACgAQAAAMABwAAAQEBAQEBAQEBgAEAAAD/AAAAAQAAAP8ABAAAAP+AAAD/gAAA/YAAAAACAIAAgAOABAAAAwAPAAABAQEBAQEBAQEBAQEBAQEBAoABAAAA/wAAAAEAAAD/gAAA/gAAAP+AAAABAAAAAQAEAAAA/4AAAP+AAAD+AAAA/4AAAACAAAABAAAA/wAAAAABAIAAgAOAA4AAEwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEAgAEAAAAAgAAAAQAAAP+AAAAAgAAAAIAAAP8AAAD/gAAA/4AAAP8AA4AAAP8AAAAAgAAA/4AAAP8AAAD/gAAA/4AAAACAAAAAgAAA/wAAAAAAAAEBgACAAwAEAAAHAAABAQEBAQEBAQGAAQAAAACAAAD/AAAA/4AEAAAA/QAAAP+AAAAAgAAAAAAAAQCAAIAEAAMAABMAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQABAAAAAIAAAAEAAAAAgAAA/wAAAP+AAAD/gAAA/4AAAP8AAAAAgAMAAAD/gAAAAIAAAP+AAAD+AAAAAYAAAP+AAAAAgAAA/oAAAAIAAAAAAAABAIAAgAOAAwAADwAAAQEBAQEBAQEBAQEBAQEBAQCAAQAAAACAAAABAAAAAIAAAP8AAAD/gAAA/4AAAP8AAwAAAP+AAAAAgAAA/4AAAP4AAAABgAAA/4AAAP8AAAAAAAACAIAAgAOAAwAACwAPAAABAQEBAQEBAQEBAQEBAQEBAQACAAAAAIAAAP+AAAD+AAAA/4AAAACAAIAAAAEAAAADAAAA/4AAAP6AAAD/gAAAAIAAAAGAAAAAAP6AAAABgAACAIAAgAOAAwAACQANAAABAQEBAQEBAQEBAQEBAQCAAoAAAACAAAD/gAAA/oAAAP8AAQAAAAEAAAADAAAA/4AAAP+AAAD/gAAA/wAAAAIA/4AAAACAAAAAAgCAAIAEAAMAAA0AEQAAAQEBAQEBAQEBAQEBAQEBAQEBAQACgAAAAIAAAP+AAAD/AAAA/oAAAP+AAAAAgACAAAABAAAAAwAAAP6AAAD/gAAA/4AAAAEAAAAAgAAAAIAAAAAA/4AAAACAAAAAAQEAAIADgAMAAAkAAAEBAQEBAQEBAQEBAAIAAAAAgAAA/wAAAP+AAAD/AAMAAAD/gAAA/wAAAAEAAAD+AAAAAAEAgACABAADAAATAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEAAoAAAP6AAAABgAAAAIAAAP+AAAD9AAAAAgAAAP6AAAD/gAAAAIADAAAA/4AAAP+AAAD/gAAA/4AAAP+AAAAAgAAAAIAAAACAAAAAgAAAAAAAAQCAAIADgAOAABMAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQABAAAAAQAAAP8AAAAAgAAAAQAAAP+AAAD+gAAA/4AAAP+AAAAAgAOAAAD/gAAA/4AAAP6AAAAAgAAA/4AAAP+AAAAAgAAAAYAAAACAAAAAAAABAIAAgAOAAwAADwAAAQEBAQEBAQEBAQEBAQEBAQCAAQAAAACAAAAAgAAAAQAAAP+AAAD/gAAA/oAAAP+AAwAAAP4AAAAAgAAAAYAAAP2AAAAAgAAA/4AAAACAAAAAAAABAIAAgAOAAwAADwAAAQEBAQEBAQEBAQEBAQEBAQCAAQAAAAEAAAABAAAA/4AAAP+AAAD/AAAA/4AAAP+AAwAAAP6AAAABgAAA/oAAAP+AAAD/gAAAAIAAAACAAAAAAAABAIAAgAQAAwAAEwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEAgAEAAAAAgAAAAIAAAACAAAABAAAA/4AAAP8AAAD/gAAA/wAAAP+AAwAAAP6AAAAAgAAA/4AAAAGAAAD+AAAA/4AAAACAAAD/gAAAAIAAAAAAAAEAgACAA4ADAAAbAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAIABAAAAAQAAAAEAAAD/gAAA/4AAAACAAAAAgAAA/wAAAP8AAAD/AAAAAIAAAACAAAD/gAAA/4ADAAAA/4AAAACAAAD/gAAA/4AAAP+AAAD/gAAA/4AAAACAAAD/gAAAAIAAAACAAAAAgAAAAIAAAAAAAAEAgACAA4ADAAAPAAABAQEBAQEBAQEBAQEBAQEBAIABAAAAAQAAAAEAAAD/gAAA/gAAAAGAAAD+gAAA/4ADAAAA/wAAAAEAAAD+AAAA/4AAAACAAAAAgAAAAIAAAAAAAAEAgACAA4ADAAATAAABAQEBAQEBAQEBAQEBAQEBAQEBAQCAAwAAAP+AAAD/gAAA/4AAAAGAAAD9AAAAAIAAAACAAAAAgAAA/oADAAAA/4AAAP+AAAD/gAAA/4AAAP+AAAAAgAAAAIAAAACAAAAAgAAAAAAAAQCAAIADAAQAABMAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAYABgAAA/wAAAP+AAAAAgAAAAQAAAP6AAAD/gAAA/4AAAACAAAAAgAQAAAD/gAAA/wAAAP+AAAD/AAAA/4AAAACAAAABAAAAAIAAAAEAAAAAAAABAYAAgAKABAAAAwAAAQEBAQGAAQAAAP8ABAAAAPyAAAAAAAABAQAAgAOABAAAEwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAGAAAAAgAAAAIAAAP+AAAD/gAAA/oAAAAEAAAAAgAAA/4AAAP8ABAAAAP+AAAD/AAAA/4AAAP8AAAD/gAAAAIAAAAEAAAAAgAAAAQAAAAAAAAEAgAGAA4ADAAAPAAABAQEBAQEBAQEBAQEBAQEBAQABAAAAAQAAAACAAAD/gAAA/wAAAP8AAAD/gAAAAIADAAAA/4AAAACAAAD/AAAA/4AAAACAAAD/gAAAAQAAAAAAAAEAAAAABAAEAAATAAABAQEBAQEBAQEBAQEBAQEBAQEBAQAAAYAAAAEAAAAAgAAAAIAAAACAAAD/AAAA/4AAAP+AAAD/AAAA/wAEAAAA/4AAAP+AAAD/gAAA/wAAAP6AAAABAAAAAQAAAACAAAAAgAAAAAAAAQIAAAAEAAQAAAMAAAEBAQECAAIAAAD+AAQAAAD8AAAAAAAAAgCAAIADgAQAABcAGwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQGAAYAAAP8AAAABAAAA/4AAAP+AAAABgAAA/QAAAACAAAAAgAAA/wAAAACAAAAAgAGAAIAAAP+ABAAAAP+AAAD/AAAA/4AAAP+AAAD/gAAA/4AAAACAAAAAgAAAAIAAAACAAAABAAAAAAAAAP+AAAAAAQCAAIADgAQAABsAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAgAEAAAABAAAAAQAAAP+AAAAAgAAA/wAAAAEAAAD/AAAA/wAAAP8AAAABAAAA/wAAAACAAAD/gAQAAAD+gAAAAYAAAP8AAAD/gAAA/4AAAP+AAAD/gAAA/4AAAACAAAAAgAAAAIAAAACAAAAAgAAAAAAABACAAIAEAAQAABcAGwAfACMAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAAoAAAP4AAAABgAAAAIAAAACAAAD/gAAA/YAAAAIAAAD+gAAA/4AAAP+AAAAAgAEAAAAAgAAAAQAAgAAA/4D9AACAAAD/gAQAAAD/gAAA/4AAAP+AAAD/gAAA/wAAAP+AAAAAgAAAAIAAAACAAAAAgAAAAQAAAP8A/4AAAACAAQAAAP+AAAD+gAAA/4AAAAAEAIAAgAQAA4AAAwAHAAsADwAAAQEBAQEBAQEBAQEBAQEBAQCAAIAAAP+AAQAAgAAA/4ABAACAAAD/gAEAAIAAAP+AA4AAAP0AAAADAAAA/QAAAAMAAAD9AAAAAwAAAP0AAAAAAQIAAAAEAAQAAAkAAAEBAQEBAQEBAQEDgACAAAD+AAAAAIAAAACAAAAAgAQAAAD8AAAAAQAAAAEAAAABAAAAAAgAAAAABAAEAAADAAcACwAPABMAFwAbAB8AAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAABAAAA/wACAAEAAAD/AP8AAQAAAP8AAgABAAAA/wD9AAEAAAD/AAIAAQAAAP8A/wABAAAA/wACAAEAAAD/AAQAAAD/AAAAAQAAAP8AAAAAAAAA/wAAAAEAAAD/AAAAAAAAAP8AAAABAAAA/wAAAAAAAAD/AAAAAQAAAP8AAAAAAQIAAAADAAQAAAMAAAEBAQECAAEAAAD/AAQAAAD8AAAAAAAAAgGAAIACgAQAAAMABwAAAQEBAQEBAQEBgAEAAAD/AAAAAQAAAP8ABAAAAP6AAAD/gAAA/oAAAAABAgAAAAQAAgAAAwAAAQEBAQIAAgAAAP4AAgAAAP4AAAAAAAAEAIAAAAQABAAAAwAHAAsADwAAAQEBAQEBAQEBAQEBAQEBAQCAAIAAAP+AAQAAgAAA/4ABAACAAAD/gAEAAIAAAP+ABAAAAPwAAAAEAAAA/AAAAAQAAAD8AAAABAAAAPwAAAAAAQCAAIADgAOAABMAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAoABAAAA/oAAAP+AAAD/gAAA/4AAAACAAAAAgAAAAIAAAAEAAAD/gAOAAAD+AAAA/wAAAACAAAAAgAAAAIAAAACAAAAAgAAA/wAAAAEAAAAAAAABAAAAAAQABAAACwAAAQEBAQEBAQEBAQEBAAAEAAAA/gAAAP+AAAD/gAAA/4AAAP+ABAAAAPwAAAAAgAAAAIAAAACAAAAAgAAAAAAAAQCAAIAEAAOAABsAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAgACAAAAAgAAAAIAAAACAAAAAgAAAAIAAAACAAAD/gAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/gAOAAAD/gAAAAIAAAP8AAAABAAAA/oAAAAGAAAD9AAAAAIAAAP+AAAABAAAA/wAAAAGAAAD+gAAAAAAAAQAAAAACAAQAAAkAAAEBAQEBAQEBAQEAAACAAAAAgAAAAIAAAACAAAD+AAQAAAD/AAAA/wAAAP8AAAD/AAAAAAEAAAAABAAEAAATAAABAQEBAQEBAQEBAQEBAQEBAQEBAQKAAYAAAP8AAAD/AAAA/4AAAP+AAAD/AAAAAIAAAACAAAAAgAAAAQAEAAAA/wAAAP+AAAD/gAAA/wAAAP8AAAABgAAAAQAAAACAAAAAgAAAAAAAAQAAAAAEAAIAAA8AAAEBAQEBAQEBAQEBAQEBAQEBgAEAAAAAgAAAAIAAAACAAAD8AAAAAIAAAACAAAAAgAIAAAD/gAAA/4AAAP+AAAD/gAAAAIAAAACAAAAAgAAAAAAAAgAAAAAEAAQAAAMABwAAAQEBAQEBAQEAAAIAAAD+AAIAAgAAAP4ABAAAAP4AAAAAAAAA/gAAAAAEAAACAAQABAAAAwAHAAsADwAAAQEBAQEBAQEBAQEBAQEBAQAAAQAAAP8AAgABAAAA/wD/AAEAAAD/AAIAAQAAAP8ABAAAAP8AAAABAAAA/wAAAAAAAAD/AAAAAQAAAP8AAAAABAIAAAAEAAQAAAMABwALAA8AAAEBAQEBAQEBAQEBAQEBAQECAAEAAAD/AAEAAQAAAP8A/wABAAAA/wABAAEAAAD/AAQAAAD/AAAAAAAAAP8AAAAAAAAA/wAAAAAAAAD/AAAAAAEDAAAABAAEAAADAAABAQEBAwABAAAA/wAEAAAA/AAAAAAAAAEAAAAABAAEAAAFAAABAQEBAQEAAAQAAAD9AAAA/wAEAAAA/wAAAP0AAAAAAQAAAAABAAQAAAMAAAEBAQEAAAEAAAD/AAQAAAD8AAAAAAAAAwCAAIADAAOAAAMABwALAAABAQEBAQEBAQEBAQEAgACAAAD/gAEAAIAAAP+AAQAAgAAA/4ADgAAA/QAAAAMAAAD9AAAAAwAAAP0AAAAAAAABAYABgAQABAAACwAAAQEBAQEBAQEBAQEBAYABAAAAAIAAAAEAAAD+gAAA/4AAAP+ABAAAAP8AAAD/gAAA/wAAAACAAAAAgAAAAAAAAQAAAYACgAQAAAsAAAEBAQEBAQEBAQEBAQGAAQAAAP+AAAD/gAAA/oAAAAEAAAAAgAQAAAD+gAAA/4AAAP+AAAABAAAAAIAAAAAAAAEAAAAABAAEAAAJAAABAQEBAQEBAQEBAwABAAAA/AAAAAEAAAABAAAAAQAEAAAA/AAAAAKAAAAAgAAAAIAAAAABAIAAgAMABAAACwAAAQEBAQEBAQEBAQEBAgABAAAA/4AAAP6AAAD/gAAAAIAAAAEABAAAAP0AAAD/gAAAAIAAAAEAAAAAgAAAAAAAAQAAAAAEAAQAAAUAAAEBAQEBAQAAAQAAAAMAAAD8AAQAAAD9AAAA/wAAAAACAIAAgAMAAoAACwAPAAABAQEBAQEBAQEBAQEBAQEBAQABgAAAAIAAAP+AAAD+gAAAAQAAAP8A/4AAgAAA/4ACgAAA/4AAAP8AAAD/gAAAAIAAAAEAAAAAAAAA/wAAAAACAIAAgAMABAAACwAPAAABAQEBAQEBAQEBAQEBAQEBAgABAAAA/4AAAP6AAAABAAAA/wAAAAEA/oAAgAAA/4AEAAAA/QAAAP+AAAAAgAAAAQAAAACAAAD/gAAA/wAAAAABAIAAgAQABAAADQAAAQEBAQEBAQEBAQEBAQECAAIAAAD/AAAA/4AAAP6AAAD/gAAAAIAAAAEABAAAAP+AAAD9gAAA/4AAAACAAAABAAAAAIAAAAACAAAAAAQABAAAAwAHAAABAQEBAQEBAQAABAAAAPwAAQAAAAIAAAAEAAAA/AAAAAMA/gAAAAIAAAEAgACABAAEAAARAAABAQEBAQEBAQEBAQEBAQEBAQECAAIAAAD/AAAAAQAAAP8AAAD/gAAA/oAAAP+AAAAAgAAAAQAEAAAA/4AAAP+AAAD/gAAA/oAAAP+AAAAAgAAAAQAAAACAAAAAAQAAAAACgAKAAAsAAAEBAQEBAQEBAQEBAQAAAYAAAACAAAAAgAAA/wAAAP+AAAD/AAKAAAD/gAAA/4AAAP6AAAABAAAAAIAAAAAAAAEAAAAABAAEAAAFAAABAQEBAQEAAAQAAAD/AAAA/QAEAAAA/AAAAAMAAAAAAQCAAIAEAAQAABUAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQECAAIAAAD/AAAAAQAAAP8AAAABAAAA/wAAAP+AAAD+gAAA/4AAAACAAAABAAQAAAD/gAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/gAAAAIAAAAEAAAAAgAAAAAEBgAAABAACgAALAAABAQEBAQEBAQEBAQECgAGAAAD/AAAA/4AAAP8AAAAAgAAAAIACgAAA/wAAAP+AAAD/AAAAAYAAAACAAAAAAAABAAAAAAQABAAAEQAAAQEBAQEBAQEBAQEBAQEBAQEBAAAAgAAAAIAAAACAAAAAgAAAAIAAAACAAAAAgAAAAIAAAPwABAAAAP+AAAD/gAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/gAAAAAEAAAAABAABAAADAAABAQEBAAAEAAAA/AABAAAA/wAAAAAAAAEAAAAABAAEAAARAAABAQEBAQEBAQEBAQEBAQEBAQEDgACAAAD8AAAAAIAAAACAAAAAgAAAAIAAAACAAAAAgAAAAIAEAAAA/AAAAACAAAAAgAAAAIAAAACAAAAAgAAAAIAAAACAAAAAAQAAAgAEAAQAAAMAAAEBAQEAAAQAAAD8AAQAAAD+AAAAAAAAAgCAAIACAAOAAAMABwAAAQEBAQEBAQEAgACAAAD/gAEAAIAAAP+AA4AAAP0AAAADAAAA/QAAAAAEAIAAgAQABAAAAwAHAAsADwAAAQEBAQEBAQEBAQEBAQEBAQCAA4AAAPyAAIAAAACAAAAAgAAAAIAAAACAAAAAgAAABAAAAPyAAAADAP+AAAAAgP8A/4AAAACA/wD/gAAAAIAAAQAAAAAEAAQAAAUAAAEBAQEBAQMAAQAAAPwAAAADAAQAAAD8AAAAAQAAAAACAIAAgAQABAAAAwAHAAABAQEBAQEBAQCAA4AAAPyAAYAAAACAAAAEAAAA/IAAAAIA/4AAAACAAAMAgACABAAEAAADAAcACwAAAQEBAQEBAQEBAQEBAIADgAAA/IAAgAAAAIAAAAGAAAAAgAAABAAAAPyAAAADAP+AAAAAgP4A/4AAAACAAAAABAAAAIAEAAQAAAMABwALAA8AAAEBAQEBAQEBAQEBAQEBAQEAAAQAAAD8AAAABAAAAPwAAAAEAAAA/AAAAAQAAAD8AAQAAAD/gAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/gAAAAAYAgACABAAEAAADAAcACwAPABMAFwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAIADgAAA/IAAgAAAAIAAAAGAAAAAgAAA/oAAAACAAAD+gAAAAIAAAAGAAAAAgAAABAAAAPyAAAADAP+AAAAAgAAA/4AAAACA/wD/gAAAAID/AP+AAAAAgAAA/4AAAACAAAEAgACAAQADgAADAAABAQEBAIAAgAAA/4ADgAAA/QAAAAAAAAUAgACABAAEAAADAAcACwAPABMAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAIADgAAA/IAAgAAAAIAAAAGAAAAAgAAA/YAAAACAAAABgAAAAIAAAAQAAAD8gAAAAwD/gAAAAIAAAP+AAAAAgP4A/4AAAACAAAD/gAAAAIAAAAABAAADAAQABAAAAwAAAQEBAQAABAAAAPwABAAAAP8AAAAAAAAHAIAAgAQABAAAAwAHAAsADwATABcAGwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQCAA4AAAPyAAIAAAACAAAABgAAAAIAAAP2AAAAAgAAAAYAAAACAAAD9gAAAAIAAAAGAAAAAgAAABAAAAPyAAAADAP+AAAAAgAAA/4AAAACA/wD/gAAAAIAAAP+AAAAAgP8A/4AAAACAAAD/gAAAAIAAAAAEAAAAAAQAAgAAAwAHAAsADwAAAQEBAQEBAQEBAQEBAQEBAQAAAQAAAP8AAgABAAAA/wD/AAEAAAD/AAIAAQAAAP8AAgAAAP8AAAABAAAA/wAAAAAAAAD/AAAAAQAAAP8AAAAAAQAAAAAEAAQAAAkAAAEBAQEBAQEBAQEAAAEAAAABAAAAAQAAAAEAAAD8AAQAAAD/gAAA/4AAAP+AAAD9gAAAAAEBAAAAAgAEAAADAAABAQEBAQABAAAA/wAEAAAA/AAAAAAAAAEAAAAABAAEAAALAAABAQEBAQEBAQEBAQECgAGAAAD8AAAAAIAAAACAAAAAgAAAAQAEAAAA/AAAAAGAAAABAAAAAIAAAACAAAAAAAABAAABAAQAAgAAAwAAAQEBAQAABAAAAPwAAgAAAP8AAAAAAAABAAAAAAQABAAACwAAAQEBAQEBAQEBAQEBAgACAAAA/AAAAACAAAAAgAAAAIAAAACABAAAAPwAAAACAAAAAIAAAACAAAAAgAAAAAAAAQAAAAAEAAIAAAkAAAEBAQEBAQEBAQEDAAEAAAD8AAAAAQAAAAEAAAABAAIAAAD+AAAAAIAAAACAAAAAgAAAAAEAAAAABAAEAAALAAABAQEBAQEBAQEBAQEAAAIAAAAAgAAAAIAAAACAAAAAgAAA/AAEAAAA/4AAAP+AAAD/gAAA/4AAAP4AAAAAAAADAAAAAAQABAAAGwAnADMAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAAAEAAAAAgAAAAIAAAACAAAAAgAAAAIAAAACAAAD/AAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/gAIAAYAAAACAAAD/gAAA/4AAAP+AAAD/gP4AAIAAAACAAAAAgAAAAIAAAP6AAAD/gAQAAAD/gAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/AAAAAIAAAACAAAAAgAAAAIAAAACAAAAAgAAAAQAAAP+AAAD+gAAAAIAAAACAAAAAgAAA/oAAAP+AAAD/gAAA/4AAAP+AAAAAgAAAAAAAAQAAAAAEAAIAAAkAAAEBAQEBAQEBAQEAAAEAAAABAAAAAQAAAAEAAAD8AAIAAAD/gAAA/4AAAP+AAAD/gAAAAAEAAAAABAAEAAALAAABAQEBAQEBAQEBAQEAAAGAAAABAAAAAIAAAACAAAAAgAAA/AAEAAAA/4AAAP+AAAD/gAAA/wAAAP6AAAAAAAAEAAAAgAQABAAAAwAHAAsADwAAAQEBAQEBAQEBAQEBAQEBAQCAAYAAAP6AAgABgAAA/oD9gAGAAAD+gAIAAYAAAP6ABAAAAP6AAAABgAAA/oAAAP+AAAD+gAAAAYAAAP6AAAAAAQIAAgAEAAQAAAMAAAEBAQECAAIAAAD+AAQAAAD+AAAAAAAABACAAIAEAAQAAAMABwAjACcAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAEAAAD/AAGAAQAAAP8A/gAAgAAAAIAAAACAAAAAgAAAAIAAAACAAAAAgAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/gAAA/4ABgACAAAD/gAQAAAD/gAAAAIAAAP+AAAAAAAAA/wAAAP+AAAD/gAAAAIAAAACAAAABAAAA/oAAAP+AAAD/gAAA/4AAAACAAAAAgAAAAIAAAAGAAAD/gAAAAAQAAAAABAAEAAADAAcACwAPAAABAQEBAQEBAQEBAQEBAQEBAAAAgAAA/4ADgACAAAD/gPyAAIAAAP+AA4AAgAAA/4AEAAAA/4AAAACAAAD/gAAA/QAAAP+AAAAAgAAA/4AAAAABAAAAAAIAAgAAAwAAAQEBAQAAAgAAAP4AAgAAAP4AAAAAAAAEAAAAAAIABAAAAwAHAAsADwAAAQEBAQEBAQEBAQEBAQEBAQAAAQAAAP8AAQABAAAA/wD/AAEAAAD/AAEAAQAAAP8ABAAAAP8AAAAAAAAA/wAAAAAAAAD/AAAAAAAAAP8AAAAAAQCAAQADgAOAABMAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAYABAAAA/4AAAAGAAAD+gAAAAIAAAP8AAAD/gAAA/4AAAACAAAAAgAOAAAD/gAAA/4AAAP+AAAD/gAAA/4AAAACAAAAAgAAAAIAAAACAAAAAAAABAQABAAOABAAAEwAAAQEBAQEBAQEBAQEBAQEBAQEBAQECAACAAAAAgAAAAIAAAP+AAAD/gAAA/4AAAP+AAAD/gAAAAIAAAACABAAAAP+AAAD/gAAA/wAAAACAAAD+gAAAAYAAAP+AAAABAAAAAIAAAAAAAAEBAAEABAADgAATAAABAQEBAQEBAQEBAQEBAQEBAQEBAQIAAQAAAACAAAAAgAAA/4AAAP+AAAD/AAAAAIAAAP6AAAABgAAA/4ADgAAA/4AAAP+AAAD/gAAA/4AAAP+AAAAAgAAAAIAAAACAAAAAgAAAAAAAAQEAAIADgAOAABMAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAgAAgAAAAIAAAACAAAD/gAAA/4AAAP+AAAD/gAAA/4AAAACAAAAAgAOAAAD+gAAAAIAAAP8AAAD/gAAA/4AAAACAAAAAgAAAAQAAAP+AAAAAAAABAQAAgAOABAAADwAAAQEBAQEBAQEBAQEBAQEBAQIAAIAAAACAAAAAgAAA/4AAAP6AAAD/gAAAAIAAAACABAAAAP8AAAD/AAAA/wAAAP+AAAAAgAAAAQAAAAEAAAAAAAACAIAAgAOAA4AAAwAJAAABAQEBAQEBAQEBAIADAAAA/QAAgAAAAgAAAP8AAAADgAAA/QAAAAKA/gAAAAEAAAABAAAAAAIAgACABAAEAAAbACcAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQECAACAAAAAgAAAAIAAAACAAAD/gAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/gAAAAIAAAACAAAAAgAAAAAD/gAAAAIAAAACAAAAAgAAA/4AAAAQAAAD/gAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/gAAAAIAAAACAAAAAgAAAAIAAAACAAAAAgAAA/4D/gAAA/4AAAP+AAAAAgAAAAIAAAACAAAEAAAIABAADAAADAAABAQEBAAAEAAAA/AADAAAA/wAAAAAAAAEAAAAABAAEAAALAAABAQEBAQEBAQEBAQEAAAQAAAD/gAAA/4AAAP+AAAD/gAAA/gAEAAAA/gAAAP+AAAD/gAAA/4AAAP+AAAAAAAABAAACAAIABAAAAwAAAQEBAQAAAgAAAP4ABAAAAP4AAAAAAAACAQAAgAOAA4AAFwAbAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAYABgAAAAIAAAP8AAAAAgAAAAIAAAP8AAAD/gAAA/wAAAACAAAAAgAAA/wAAAACAAIAAAACAAAADgAAA/wAAAP+AAAD/gAAA/4AAAP+AAAAAgAAA/4AAAACAAAAAgAAAAIAAAACAAAAAgP+AAAAAgAADAAAAAAQABAAACwAnADMAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAgAGAAAD/gAAA/4AAAP+AAAD/gAAAAIACgAEAAAD/gAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/AAAAAIAAAACAAAAAgAAAAIAAAACAAAAAgACAAIAAAP+AAAD+gAAAAIAAAACAAAAAgAQAAAD/gAAA/4AAAP+AAAD/gAAAAYAAAACAAAD/AAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/gAAAAQAAAACAAAAAgAAAAIAAAACAAAAAgAAA/oAAAP6AAAD/gAAAAIAAAACAAAAAgAAAAAAAAgCAAIADgAQAAA8AHwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAEAAAABAAAAAIAAAP+AAAD/AAAA/wAAAP+AAAAAgAAAAQAAAAEAAAAAgAAA/4AAAP8AAAD/AAAA/4AAAACABAAAAP+AAAAAgAAA/wAAAP+AAAAAgAAA/4AAAAEAAAD+gAAA/4AAAACAAAD/AAAA/4AAAACAAAD/gAAAAQAAAAABAAAAAAQAA4AACwAAAQEBAQEBAQEBAQEBAQACAAAAAIAAAACAAAD8AAAAAIAAAACAA4AAAP+AAAD/gAAA/YAAAAKAAAAAgAAAAAAAAQAAAAACAAQAAA8AAAEBAQEBAQEBAQEBAQEBAQEAAACAAAAAgAAAAIAAAACAAAD/gAAA/4AAAP+AAAD/gAQAAAD/gAAA/4AAAP+AAAD/AAAA/4AAAP+AAAD/gAAAAAAAAQIAAAAEAAQAAA8AAAEBAQEBAQEBAQEBAQEBAQEDgACAAAD/gAAA/4AAAP+AAAD/gAAAAIAAAACAAAAAgAQAAAD8AAAAAIAAAACAAAAAgAAAAQAAAACAAAAAgAAAAAAAAQCAAIAEAAQAABcAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQIAAIAAAACAAAAAgAAAAIAAAP+AAAD/AAAA/4AAAP8AAAD/gAAAAIAAAACAAAAAgAQAAAD/gAAA/4AAAP+AAAD/gAAA/oAAAAEAAAD/AAAAAYAAAACAAAAAgAAAAIAAAAAAACAAAAAABAAEAAADAAcACwAPABMAFwAbAB8AIwAnACsALwAzADcAOwA/AEMARwBLAE8AUwBXAFsAXwBjAGcAawBvAHMAdwB7AH8AAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAAAgAAA/4ABAACAAAD/gAEAAIAAAP+AAQAAgAAA/4D9gACAAAD/gAEAAIAAAP+AAQAAgAAA/4ABAACAAAD/gPyAAIAAAP+AAQAAgAAA/4ABAACAAAD/gAEAAIAAAP+A/YAAgAAA/4ABAACAAAD/gAEAAIAAAP+AAQAAgAAA/4D8gACAAAD/gAEAAIAAAP+AAQAAgAAA/4ABAACAAAD/gP2AAIAAAP+AAQAAgAAA/4ABAACAAAD/gAEAAIAAAP+A/IAAgAAA/4ABAACAAAD/gAEAAIAAAP+AAQAAgAAA/4D9gACAAAD/gAEAAIAAAP+AAQAAgAAA/4ABAACAAAD/gAQAAAD/gAAAAIAAAP+AAAAAgAAA/4AAAACAAAD/gAAAAAAAAP+AAAAAgAAA/4AAAACAAAD/gAAAAIAAAP+AAAAAAAAA/4AAAACAAAD/gAAAAIAAAP+AAAAAgAAA/4AAAAAAAAD/gAAAAIAAAP+AAAAAgAAA/4AAAACAAAD/gAAAAAAAAP+AAAAAgAAA/4AAAACAAAD/gAAAAIAAAP+AAAAAAAAA/4AAAACAAAD/gAAAAIAAAP+AAAAAgAAA/4AAAAAAAAD/gAAAAIAAAP+AAAAAgAAA/4AAAACAAAD/gAAAAAAAAP+AAAAAgAAA/4AAAACAAAD/gAAAAIAAAP+AAAAAAQAAAAAEAAQAAAsAAAEBAQEBAQEBAQEBAQAABAAAAP6AAAD/AAAA/4AAAP+AAAD/gAQAAAD8AAAAAIAAAACAAAAAgAAAAQAAAAAAAAEAAAAABAAEAAALAAABAQEBAQEBAQEBAQEAAAQAAAD/gAAA/4AAAP+AAAD/AAAA/oAEAAAA/oAAAP8AAAD/gAAA/4AAAP+AAAAAAAABAAABgAKABAAADwAAAQEBAQEBAQEBAQEBAQEBAQAAAQAAAACAAAAAgAAAAIAAAP8AAAD/gAAA/4AAAP+ABAAAAP+AAAD/gAAA/4AAAP8AAAAAgAAAAIAAAACAAAAAAAABAAAAAAKABAAADwAAAQEBAQEBAQEBAQEBAQEBAQAAAQAAAACAAAAAgAAAAIAAAP8AAAD/gAAA/4AAAP+ABAAAAP+AAAD/gAAA/4AAAP2AAAACAAAAAIAAAACAAAAAAAABAYAAAAQAAoAABQAAAQEBAQEBAYACgAAA/oAAAP8AAoAAAP8AAAD+gAAAAAEAAAAABAAEAAAJAAABAQEBAQEBAQEBAAACgAAAAIAAAACAAAAAgAAA/AAEAAAA/wAAAP8AAAD/AAAA/wAAAAACAAAAAAQABAAAGwAfAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQGAAQAAAACAAAAAgAAAAIAAAP+AAAD/gAAA/4AAAP8AAAD/gAAA/4AAAP+AAAAAgAAAAIAAAACAAAAAAAEAAAAEAAAA/4AAAP+AAAD/gAAA/wAAAP+AAAD/gAAA/4AAAACAAAAAgAAAAIAAAAEAAAAAgAAAAIAAAP8A/wAAAAEAAAEBgAGABAAEAAAFAAABAQEBAQEBgAEAAAABgAAA/YAEAAAA/oAAAP8AAAAAAQAAAAACgAKAAA8AAAEBAQEBAQEBAQEBAQEBAQEBgAEAAAD/gAAA/4AAAP+AAAD/AAAAAIAAAACAAAAAgAKAAAD/AAAA/4AAAP+AAAD/gAAAAQAAAACAAAAAgAAAAAAAAQGAAAAEAAQAAA8AAAEBAQEBAQEBAQEBAQEBAQEDAAEAAAD/gAAA/4AAAP+AAAD/AAAAAIAAAACAAAAAgAQAAAD/AAAA/4AAAP+AAAD+AAAAAoAAAACAAAAAgAAAAAAAAQGAAAAEAAKAAA8AAAEBAQEBAQEBAQEBAQEBAQEBgAEAAAAAgAAAAIAAAACAAAD/AAAA/4AAAP+AAAD/gAKAAAD/gAAA/4AAAP+AAAD/AAAAAIAAAACAAAAAgAAAAAAAAQGAAYAEAAQAAA8AAAEBAQEBAQEBAQEBAQEBAQEDAAEAAAD/gAAA/4AAAP+AAAD/AAAAAIAAAACAAAAAgAQAAAD/AAAA/4AAAP+AAAD/gAAAAQAAAACAAAAAgAAAAAAAAQAAAAAEAAQAABsAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAAAEAAAAAgAAAAIAAAACAAAAAgAAAAIAAAACAAAD/AAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/gAQAAAD/gAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/AAAAAIAAAACAAAAAgAAAAIAAAACAAAAAgAAAAAAAAQAAAAAEAAQAAB8AAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAABAAAAAIAAAAEAAAAAgAAAAQAAAP+AAAD/gAAA/4AAAP+AAAD/gAAA/4AAAP8AAAAAgAAAAIAAAP+AAAD/gAQAAAD/gAAA/4AAAACAAAAAgAAA/wAAAP+AAAD/gAAA/4AAAP+AAAD/gAAA/4AAAAEAAAAAgAAAAQAAAACAAAAAAAABAAABgAQABAAADwAAAQEBAQEBAQEBAQEBAQEBAQAAAQAAAACAAAAAgAAAAgAAAP2AAAD/gAAA/4AAAP+ABAAAAP+AAAD/gAAA/4AAAP8AAAAAgAAAAIAAAACAAAAAAAABAAABgAQAAoAAAwAAAQEBAQAABAAAAPwAAoAAAP8AAAAAAAABAYAAAAKABAAAAwAAAQEBAQGAAQAAAP8ABAAAAPwAAAAAAAABAYAAAAQABAAAFwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAwABAAAA/4AAAP+AAAAAgAAAAIAAAP8AAAD/gAAA/4AAAP+AAAAAgAAAAIAAAACABAAAAP8AAAD/gAAA/wAAAP+AAAD/AAAAAIAAAACAAAAAgAAAAQAAAACAAAAAgAAAAAAAAQAAAAAEAAKAAA8AAAEBAQEBAQEBAQEBAQEBAQEAAAKAAAAAgAAAAIAAAACAAAD/AAAA/4AAAP+AAAD+AAKAAAD/gAAA/4AAAP+AAAD/AAAAAIAAAACAAAAAgAAAAAAAAQAAAYAEAAQAAA8AAAEBAQEBAQEBAQEBAQEBAQEDAAEAAAD/gAAA/4AAAP+AAAD9gAAAAgAAAACAAAAAgAQAAAD/AAAA/4AAAP+AAAD/gAAAAQAAAACAAAAAgAAAAAAAAQAAAgAEAAQAAA8AAAEBAQEBAQEBAQEBAQEBAQEAAAQAAAD/gAAA/4AAAP+AAAD/AAAA/4AAAP+AAAD/gAQAAAD/gAAA/4AAAP+AAAD/gAAAAIAAAACAAAAAgAAAAAAAAQAAAYACgAKAAAMAAAEBAQEAAAKAAAD9gAKAAAD/AAAAAAAAAQGAAAACgAKAAAMAAAEBAQEBgAEAAAD/AAKAAAD9gAAAAAAAAQAAAYAEAAQAABcAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQAAAQAAAACAAAABAAAAAIAAAAEAAAD/gAAA/4AAAP+AAAD/AAAA/4AAAP+AAAD/gAQAAAD/gAAA/4AAAACAAAAAgAAA/wAAAP+AAAD/gAAA/4AAAACAAAAAgAAAAIAAAAAAAAEAAAAABAAEAAAJAAABAQEBAQEBAQEBAYACgAAA/AAAAACAAAAAgAAAAIAEAAAA/AAAAAEAAAABAAAAAQAAAAABAAAAAAQABAAAEwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEDAAEAAAD/gAAA/4AAAP+AAAD/AAAA/oAAAAEAAAABAAAAAIAAAACABAAAAP6AAAD/AAAA/4AAAP+AAAD/gAAAAQAAAACAAAAAgAAAAQAAAAAAAAEAAAAABAAEAAATAAABAQEBAQEBAQEBAQEBAQEBAQEBAQAAAQAAAACAAAAAgAAAAQAAAAEAAAD+gAAA/wAAAP+AAAD/gAAA/4AEAAAA/wAAAP8AAAD/gAAA/4AAAP8AAAAAgAAAAIAAAACAAAABAAAAAAAAAQAAAAAEAAQAABsAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEDAAEAAAD/gAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/AAAAAIAAAACAAAAAgAAAAIAAAACAAAAAgAQAAAD/AAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/gAAAAQAAAACAAAAAgAAAAIAAAACAAAAAgAAAAAAAAQAAAAACgAQAABcAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQAAAQAAAACAAAAAgAAAAIAAAP+AAAD/gAAA/4AAAP8AAAAAgAAAAIAAAP+AAAD/gAQAAAD/gAAA/4AAAP+AAAD/AAAA/4AAAP+AAAD/gAAAAQAAAACAAAABAAAAAIAAAAAAAAEAAAAABAAEAAAfAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQAAAQAAAACAAAAAgAAAAIAAAACAAAAAgAAAAIAAAP8AAAD/gAAA/wAAAP+AAAD/AAAAAIAAAACAAAD/gAAA/4AEAAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/gAAA/wAAAACAAAAAgAAA/4AAAP+AAAABAAAAAIAAAAEAAAAAgAAAAAAAAQAAAAACgAQAAA8AAAEBAQEBAQEBAQEBAQEBAQEBgAEAAAD/gAAA/4AAAP+AAAD/AAAAAIAAAACAAAAAgAQAAAD9gAAA/4AAAP+AAAD/gAAAAQAAAACAAAAAgAAAAAAAAQGAAAAEAAQAAA8AAAEBAQEBAQEBAQEBAQEBAQEBgAEAAAAAgAAAAIAAAACAAAD/AAAA/4AAAP+AAAD/gAQAAAD+AAAA/4AAAP+AAAD/AAAAAIAAAACAAAAAgAAAAAAAAQAAAAAEAAKAAA8AAAEBAQEBAQEBAQEBAQEBAQEBgAKAAAD+AAAA/4AAAP+AAAD/AAAAAIAAAACAAAAAgAKAAAD/AAAA/4AAAP+AAAD/gAAAAQAAAACAAAAAgAAAAAAAAQGAAYACgAQAAAMAAAEBAQEBgAEAAAD/AAQAAAD9gAAAAAAAAQGAAYAEAAKAAAMAAAEBAQEBgAKAAAD9gAKAAAD/AAAAAAAAAQAAAAAEAAQAAB8AAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAwABAAAA/4AAAP+AAAAAgAAAAIAAAP8AAAD/gAAA/wAAAP+AAAD/AAAAAIAAAACAAAAAgAAAAIAAAACAAAAAgAQAAAD/AAAA/4AAAP8AAAD/gAAA/wAAAACAAAAAgAAA/4AAAP+AAAABAAAAAIAAAACAAAAAgAAAAIAAAACAAAAAAAABAAAAAAQABAAAIwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAABAAAAAIAAAAEAAAAAgAAAAQAAAP+AAAD/gAAAAIAAAACAAAD/AAAA/4AAAP8AAAD/gAAA/wAAAACAAAAAgAAA/4AAAP+ABAAAAP+AAAD/gAAAAIAAAACAAAD/AAAA/4AAAP8AAAD/gAAA/wAAAACAAAAAgAAA/4AAAP+AAAABAAAAAIAAAAEAAAAAgAAAAAAAAQGAAYACgAKAAAMAAAEBAQEBgAEAAAD/AAKAAAD/AAAAAAAAAQAAAAAEAAKAABcAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQGAAQAAAACAAAAAgAAAAIAAAP8AAAD/gAAA/wAAAP+AAAD/AAAAAIAAAACAAAAAgAKAAAD/gAAA/4AAAP+AAAD/AAAAAIAAAACAAAD/gAAA/4AAAAEAAAAAgAAAAIAAAAAAAAEAAAGAAoAEAAAFAAABAQEBAQEBgAEAAAD9gAAAAYAEAAAA/YAAAAEAAAAAAQAAAAACgAKAAAUAAAEBAQEBAQAAAoAAAP8AAAD+gAKAAAD9gAAAAYAAAAABAAAAAAQABAAAHwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAAAEAAAAAgAAAAQAAAACAAAABAAAA/4AAAP+AAAAAgAAAAIAAAP8AAAD/gAAA/4AAAP+AAAD/gAAA/4AAAP+ABAAAAP+AAAD/gAAAAIAAAACAAAD/AAAA/4AAAP8AAAD/gAAA/wAAAACAAAAAgAAAAIAAAACAAAAAgAAAAIAAAAAAAAEAAAAABAAEAAALAAABAQEBAQEBAQEBAQEBgAEAAAABgAAA/oAAAP8AAAD+gAAAAYAEAAAA/oAAAP8AAAD+gAAAAYAAAAEAAAAAAAABAAAAAAQAAoAABwAAAQEBAQEBAQEAAAQAAAD+gAAA/wAAAP6AAoAAAP8AAAD+gAAAAYAAAAAAAAEBgAAABAAEAAAHAAABAQEBAQEBAQGAAQAAAAGAAAD+gAAA/wAEAAAA/oAAAP8AAAD+gAAAAAAAAQAAAAACgAQAAAcAAAEBAQEBAQEBAYABAAAA/wAAAP6AAAABgAQAAAD8AAAAAYAAAAEAAAAAAAABAAABgAQABAAABwAAAQEBAQEBAQEBgAEAAAABgAAA/AAAAAGABAAAAP6AAAD/AAAAAQAAAAAAAAQBAAEAAwADAAADAAcACwAPAAABAQEBAQEBAQEBAQEBAQEBAYABAAAA/wD/gACAAAD/gAGAAIAAAP+A/wABAAAA/wADAAAA/4AAAAAAAAD/AAAAAQAAAP8AAAAAAAAA/4AAAAACAIAAgAOAA4AACwAPAAABAQEBAQEBAQEBAQEBAQEBAQACAAAAAIAAAP+AAAD+AAAA/4AAAACAAIAAAAEAAAADgAAA/4AAAP4AAAD/gAAAAIAAAAIAAAD/gP8AAAABAAACAAAAAAQABAAAEwAfAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAAgAAAACAAAAAgAAA/4AAAP+AAAD+AAAA/4AAAP+AAAAAgAAAAIAAgAAA/4AAAACAAAABAAAAAIAAAP+AAAAEAAAA/4AAAP+AAAD+AAAA/4AAAP+AAAAAgAAAAIAAAAIAAAAAgAAA/4D/gAAA/wAAAP+AAAAAgAAAAQAAAACAABAAAAAABAAEAAADAAcACwAPABMAFwAbAB8AIwAnACsALwAzADcAOwA/AAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAYAAgAAA/4ACAACAAAD/gP2AAIAAAP+AAgAAgAAA/4D9gACAAAD/gAIAAIAAAP+A/YAAgAAA/4ACAACAAAD/gP+AAIAAAP+AAgAAgAAA/4D9gACAAAD/gAIAAIAAAP+A/YAAgAAA/4ACAACAAAD/gP2AAIAAAP+AAgAAgAAA/4AEAAAA/4AAAACAAAD/gAAAAAAAAP+AAAAAgAAA/4AAAAAAAAD/gAAAAIAAAP+AAAAAAAAA/4AAAACAAAD/gAAAAAAAAP+AAAAAgAAA/4AAAAAAAAD/gAAAAIAAAP+AAAAAAAAA/4AAAACAAAD/gAAAAAAAAP+AAAAAgAAA/4AAAAAQAAAAAAQABAAAAwAHAAsADwATABcAGwAfACMAJwArAC8AMwA3ADsAPwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQAAAIAAAP+AAgAAgAAA/4D+gACAAAD/gAIAAIAAAP+A/oAAgAAA/4ACAACAAAD/gP6AAIAAAP+AAgAAgAAA/4D8gACAAAD/gAIAAIAAAP+A/oAAgAAA/4ACAACAAAD/gP6AAIAAAP+AAgAAgAAA/4D+gACAAAD/gAIAAIAAAP+ABAAAAP+AAAAAgAAA/4AAAAAAAAD/gAAAAIAAAP+AAAAAAAAA/4AAAACAAAD/gAAAAAAAAP+AAAAAgAAA/4AAAAAAAAD/gAAAAIAAAP+AAAAAAAAA/4AAAACAAAD/gAAAAAAAAP+AAAAAgAAA/4AAAAAAAAD/gAAAAIAAAP+AAAAAAwCAAIADgAQAABcAGwAfAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQIAAIAAAAEAAAD/AAAAAIAAAP+AAAABAAAA/wAAAP+AAAD/AAAA/4AAAACAAAABAP+AAAAAgAAA/4AAAACAAAAEAAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/gAAA/4AAAACAAAAAgAAAAYAAAACAAAD/gP+AAAAAgP8A/4AAAACAAAAAAQCAAIADgAOAAA8AAAEBAQEBAQEBAQEBAQEBAQEBAAIAAAAAgAAA/4AAAP+AAAD/AAAA/4AAAP+AAAAAgAOAAAD/gAAA/wAAAP+AAAD/AAAAAQAAAACAAAABAAAAAAAAAgCAAIADgAOAAAMACQAAAQEBAQEBAQEBAQCAAwAAAP0AAYAAAP8AAAACAAAAA4AAAP0AAAACgP8AAAD/AAAAAgAAAAABAIAAgAOAA4AAAwAAAQEBAQCAAwAAAP0AA4AAAP0AAAAAAAACAIAAgAOAA4AAAwALAAABAQEBAQEBAQEBAQEAgAMAAAD9AACAAAACAAAA/4AAAP8AAAADgAAA/QAAAAKA/gAAAAIAAAD/AAAAAQAAAQAAAAAEAAQAABMAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQACAAAAAIAAAACAAAD/gAAA/4AAAP4AAAD/gAAA/4AAAACAAAAAgAQAAAD/gAAA/4AAAP4AAAD/gAAA/4AAAACAAAAAgAAAAgAAAACAAAAAAAABAQABAAMAAwAACwAAAQEBAQEBAQEBAQEBAYABAAAAAIAAAP+AAAD/AAAA/4AAAACAAwAAAP+AAAD/AAAA/4AAAACAAAABAAAAAAAAAQCAAQAEAAQAABsAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQECAACAAAAAgAAAAQAAAP+AAAD/gAAAAIAAAP8AAAD/gAAA/wAAAACAAAD/gAAA/4AAAAEAAAAAgAQAAAD/gAAA/4AAAP+AAAD/gAAA/4AAAP+AAAAAgAAA/4AAAACAAAAAgAAAAIAAAACAAAAAgAAAAAAABgCAAIAEAAQAAAMABwALAA8AEwAXAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAgAOAAAD8gAEAAAAAgAAAAIAAAACAAAD+AAAAAIAAAAGAAAAAgAAA/gAAAAGAAAAEAAAA/IAAAAMA/wAAAAEAAAD/AAAAAQD+gP+AAAAAgAAA/4AAAACA/4D/gAAAAIAABgCAAIAEAAQAAAMABwALAA8AEwAXAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAgAOAAAD8gAEAAAAAgAAAAIAAAACAAAD+gAAAAYAAAP4AAAAAgAAAAYAAAACAAAAEAAAA/IAAAAMA/wAAAAEAAAD/AAAAAQD+gP+AAAAAgP+A/4AAAACAAAD/gAAAAIAABgCAAIAEAAQAABMAFwAbAB8AIwAnAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAgAAgAAAAIAAAAEAAAD/AAAA/4AAAP+AAAD/gAAA/wAAAAEAAAAAgAAAAAAAgAAA/oAAgAAA/4ACAACAAAD/gP4AAIAAAP+AAgAAgAAA/4AEAAAA/wAAAP+AAAD/gAAA/4AAAP8AAAABAAAAAIAAAACAAAAAgAAA/4D/gAAAAIABAAAA/4AAAACAAAD/gAAA/oAAAP+AAAAAgAAA/4AAAAACAQAAgAOABAAAFwAbAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAYABgAAAAIAAAP+AAAD/gAAAAIAAAP+AAAD/gAAA/4AAAACAAAD/gAAAAQAAAP8A/4AAgAAA/4AEAAAA/4AAAP8AAAD/gAAA/4AAAP+AAAD/gAAAAIAAAACAAAAAgAAAAIAAAAEAAAAAAAAA/wAAAAACAIAAgAQABAAAFwAbAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAYACgAAA/4AAAP+AAAD/gAAAAIAAAP+AAAD+gAAAAQAAAP8AAAABAAAAAIAAAP8A/wAAgAAA/4AEAAAA/gAAAAEAAAD/gAAA/4AAAP8AAAD/gAAAAIAAAAEAAAAAgAAAAIAAAACAAAD+gAAA/wAAAAABAIAAgAQABAAAGwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQIAAIAAAACAAAAAgAAAAIAAAP8AAAD/gAAAAIAAAP6AAAAAgAAA/4AAAP8AAAAAgAAAAIAAAACABAAAAP+AAAD/gAAA/4AAAP8AAAAAgAAA/wAAAP+AAAAAgAAAAQAAAP+AAAABAAAAAIAAAACAAAAAAAABAIAAgAQABAAAGwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQGAAYAAAP+AAAAAgAAAAQAAAP8AAAD/gAAAAIAAAP6AAAAAgAAA/4AAAP8AAAABAAAAAIAAAP+ABAAAAP8AAAD/gAAAAIAAAP6AAAAAgAAA/wAAAP+AAAAAgAAAAQAAAP+AAAABgAAA/4AAAACAAAAAAAABAIAAgAQABAAAFwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQABAAAAAIAAAAEAAAAAgAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/gAAA/4AAAACABAAAAP+AAAAAgAAA/4AAAP6AAAD/gAAA/4AAAP+AAAAAgAAAAIAAAACAAAABgAAAAAAAAQCAAIAEAAQAABsAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQECAACAAAAAgAAAAIAAAACAAAD/gAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/gAAAAIAAAACAAAAAgAQAAAD/gAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/gAAAAIAAAACAAAAAgAAAAIAAAACAAAAAgAAAAAAAAQEAAIADgAQAAAsAAAEBAQEBAQEBAQEBAQIAAYAAAP8AAAD/gAAA/wAAAACAAAAAgAQAAAD/AAAA/gAAAP+AAAABAAAAAIAAAAAAAAEAgACABAAEAAATAAABAQEBAQEBAQEBAQEBAQEBAQEBAQGAAoAAAP+AAAD/AAAAAIAAAACAAAD+gAAA/4AAAP8AAAAAgAAAAIAEAAAA/QAAAP+AAAABAAAAAIAAAAEAAAD+AAAA/4AAAAEAAAAAgAAAAAAAAAAYASYAAQAAAAAAAAAIAAAAAQAAAAAAAQAIAAgAAQAAAAAAAgAHABAAAQAAAAAAAwAIABcAAQAAAAAABAAQAB8AAQAAAAAABQALAC8AAQAAAAAABgAIADoAAQAAAAAACQAJAEIAAQAAAAAACgA6AEsAAQAAAAAADQARAIUAAQAAAAAADgAyAJYAAQAAAAAAEwAMAMgAAwABBAkAAAAQANQAAwABBAkAAQAQAOQAAwABBAkAAgAOAPQAAwABBAkAAwAQAQIAAwABBAkABAAgARIAAwABBAkABQAWATIAAwABBAkABgAQAUgAAwABBAkACQASAVgAAwABBAkACgB0AWoAAwABBAkADQAiAd4AAwABBAkADgBkAgAAAwABBAkAEwAYAmQoYykgMjAyMlVyc2FGb250UmVndWxhclVyc2FGb250VXJzYUZvbnQgUmVndWxhclZlcnNpb24gMS4wVXJzYUZvbnRVcnNhRnJhbmtBbiBvcGVuIGxpY2VuY2UgZ2VuZXJhbCBwdXJwb3NlIHRleHRtb2RlIGZvbnQgYnkgVXJzYUZyYW5rQ0MwIDEuMCBVbml2ZXJzYWxodHRwczovL2NyZWF0aXZlY29tbW9ucy5vcmcvcHVibGljZG9tYWluL3plcm8vMS4wL0hlbGxvIFdvcmxkIQAoAGMAKQAgADIAMAAyADIAVQByAHMAYQBGAG8AbgB0AFIAZQBnAHUAbABhAHIAVQByAHMAYQBGAG8AbgB0AFUAcgBzAGEARgBvAG4AdAAgAFIAZQBnAHUAbABhAHIAVgBlAHIAcwBpAG8AbgAgADEALgAwAFUAcgBzAGEARgBvAG4AdABVAHIAcwBhAEYAcgBhAG4AawBBAG4AIABvAHAAZQBuACAAbABpAGMAZQBuAGMAZQAgAGcAZQBuAGUAcgBhAGwAIABwAHUAcgBwAG8AcwBlACAAdABlAHgAdABtAG8AZABlACAAZgBvAG4AdAAgAGIAeQAgAFUAcgBzAGEARgByAGEAbgBrAEMAQwAwACAAMQAuADAAIABVAG4AaQB2AGUAcgBzAGEAbABoAHQAdABwAHMAOgAvAC8AYwByAGUAYQB0AGkAdgBlAGMAbwBtAG0AbwBuAHMALgBvAHIAZwAvAHAAdQBiAGwAaQBjAGQAbwBtAGEAaQBuAC8AegBlAHIAbwAvADEALgAwAC8ASABlAGwAbABvACAAVwBvAHIAbABkACEAAAADAAAAAAAAAGYAMwAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA==\r
`)).arrayBuffer();
    await this.sB(t), this.We = y.parse(t)[0], await this.iB();
  }
  QB(A) {
    if (A === void 0) return this.Ke;
    this.Ke = A, this.Xe = this.tB.calculateMaxGlyphDimensions(this.Je.map((e) => e.character), this.Ke, this.We);
    const t = this.AB.createTextureAtlas(this.Je, this.Xe, this.Ke, this.We);
    this.Ve = t.framebuffer, this.Ze = t.columns, this.je = t.rows;
  }
  async rB(A) {
    try {
      const t = await fetch(A);
      if (!t.ok) throw new m(`Failed to load font file: ${t.status} ${t.statusText}`);
      const e = await t.arrayBuffer();
      await this.sB(e);
      const s = y.parse(e);
      if (!s || s.length === 0) throw Error("Failed to parse font file");
      this.We = s[0], await this.iB();
    } catch (t) {
      throw new m("Failed to load font: " + (t instanceof Error ? t.message : "Unknown error"), t);
    }
  }
  async sB(A) {
    const t = Date.now();
    this.Ne = new FontFace("CustomFont_" + t, A), await this.Ne.load(), document.fonts.add(this.Ne);
  }
  async iB() {
    const A = this.qe.extractCharacters(this.We), t = this.qe.filterProblematicCharacters(A);
    this.Je = this.eB.createCharacterObjects(t, this.We), this.Xe = this.tB.calculateMaxGlyphDimensions(t, this.Ke, this.We);
    const e = this.AB.createTextureAtlas(this.Je, this.Xe, this.Ke, this.We);
    this.Ve = e.framebuffer, this.Ze = e.columns, this.je = e.rows;
  }
  ke(A) {
    return this.eB.ke(A, this.Je);
  }
  He(A) {
    return this.eB.He(A, this.Je);
  }
  W() {
    this.Ve.W(), document.fonts.delete(this.Ne);
  }
  get fontFramebuffer() {
    return this.Ve;
  }
  get characters() {
    return this.Je;
  }
  get textureColumns() {
    return this.Ze;
  }
  get textureRows() {
    return this.je;
  }
  get maxGlyphDimensions() {
    return this.Xe;
  }
  get fontSize() {
    return this.Ke;
  }
  get font() {
    return this.We;
  }
}
class vA {
  constructor(A, t, e) {
    n(this, "EB");
    n(this, "nB");
    n(this, "I");
    n(this, "p");
    n(this, "oB");
    n(this, "gB");
    n(this, "aB");
    n(this, "hB");
    n(this, "cB");
    this.aB = A, this.hB = t, this.cB = e, this.fA();
  }
  fA() {
    this.EB = Math.floor(this.aB.width / this.hB), this.nB = Math.floor(this.aB.height / this.cB), this.I = this.EB * this.hB, this.p = this.nB * this.cB, this.oB = Math.floor((this.aB.width - this.I) / 2), this.gB = Math.floor((this.aB.height - this.p) / 2);
  }
  CB(A, t) {
    this.hB = A, this.cB = t, this.fA();
  }
  get cellWidth() {
    return this.hB;
  }
  get cellHeight() {
    return this.cB;
  }
  get cols() {
    return this.EB;
  }
  get rows() {
    return this.nB;
  }
  get width() {
    return this.I;
  }
  get height() {
    return this.p;
  }
  get offsetX() {
    return this.oB;
  }
  get offsetY() {
    return this.gB;
  }
}
class bA {
  constructor(A = {}) {
    n(this, "aB");
    n(this, "DB");
    n(this, "lB");
    A.canvas ? (this.aB = A.canvas, this.lB = !1) : (this.aB = this.PB(A.width, A.height), this.lB = !0), this.aB.style.imageRendering = "pixelated";
  }
  PB(A, t) {
    const e = document.createElement("canvas");
    return e.className = "textmodeCanvas", e.style.imageRendering = "pixelated", e.width = A || 800, e.height = t || 600, document.body.appendChild(e), e;
  }
  O(A, t) {
    this.aB.width = A ?? this.aB.width, this.aB.height = t ?? this.aB.height;
  }
  uB() {
    const A = this.aB.getContext("webgl2", { alpha: !0, premultipliedAlpha: !1, preserveDrawingBuffer: !0, antialias: !1, depth: !1, stencil: !1, powerPreference: "high-performance" });
    if (!A) throw new m("`textmode.js` requires WebGL2 support.");
    return A;
  }
  W() {
    this.DB && this.DB.disconnect();
    const A = this.aB.getContext("webgl") || this.aB.getContext("webgl2");
    if (A) {
      const t = A.getExtension("WEBGL_lose_context");
      t && t.loseContext();
    }
    this.lB && this.aB.parentNode && this.aB.parentNode.removeChild(this.aB);
  }
  get canvas() {
    return this.aB;
  }
  get width() {
    return this.aB.width;
  }
  get height() {
    return this.aB.height;
  }
}
class RA {
  constructor(A = 60) {
    n(this, "IB");
    n(this, "wB");
    n(this, "fB", null);
    n(this, "dB", 0);
    n(this, "pB", !0);
    n(this, "_B", 0);
    n(this, "mB", 0);
    n(this, "vB", []);
    n(this, "xB", 10);
    n(this, "yB", 0);
    this.IB = A, this.wB = 1e3 / A;
  }
  start(A) {
    if (!this.pB) return;
    this.dB = performance.now();
    const t = (e) => {
      if (!this.pB) return void (this.fB = null);
      const s = e - this.dB;
      s >= this.wB && (A(), this.dB = e - s % this.wB), this.pB && (this.fB = requestAnimationFrame(t));
    };
    this.fB = requestAnimationFrame(t);
  }
  stop() {
    this.fB && (cancelAnimationFrame(this.fB), this.fB = null);
  }
  pause() {
    this.pB && (this.pB = !1, this.stop());
  }
  resume(A) {
    this.pB || (this.pB = !0, this.start(A));
  }
  frameRate(A, t) {
    if (A === void 0) return this._B;
    this.IB = A, this.wB = 1e3 / A, this.pB && t && (this.stop(), this.start(t));
  }
  measureFrameRate() {
    const A = performance.now();
    if (this.mB > 0) {
      const t = A - this.mB;
      this.vB.push(t), this.vB.length > this.xB && this.vB.shift();
      const e = this.vB.reduce((s, r) => s + r, 0) / this.vB.length;
      this._B = 1e3 / e;
    }
    this.mB = A;
  }
  get isLooping() {
    return this.pB;
  }
  get frameRateLimit() {
    return this.IB;
  }
  get currentFrameRate() {
    return this._B;
  }
  get frameCount() {
    return this.yB;
  }
  set frameCount(A) {
    this.yB = A;
  }
  incrementFrame() {
    this.yB++;
  }
  resetFrameCount() {
    this.yB = 0;
  }
}
const TA = (E) => class extends E {
  rotate(A = 0, t = 0, e = 0) {
    this.ze.state._A(A), this.ze.state.mA(t), this.ze.state.vA(e);
  }
  rotateX(A) {
    this.ze.state._A(A);
  }
  rotateY(A) {
    this.ze.state.mA(A);
  }
  rotateZ(A) {
    this.ze.state.vA(A);
  }
  push() {
    this.ze.state.IA();
  }
  pop() {
    this.ze.state.wA();
  }
  rect(A, t, e = 1, s = 1) {
    this.ze.Nt(A, t, e, s);
  }
  line(A, t, e, s) {
    this.ze.qt(A, t, e, s);
  }
  lineWeight(A) {
    this.ze.state.pA(A);
  }
  background(A, t = A, e = A, s = 255) {
    this.ze.ie(A, t, e, s);
  }
  char(A) {
    this.ze.state.xA(this.We.ke(A));
  }
  charColor(A, t, e) {
    this.ze.state.yA(A, t, e);
  }
  cellColor(A, t, e) {
    this.ze.state.bA(A, t, e);
  }
  flipX(A) {
    this.ze.state.GA(A);
  }
  flipY(A) {
    this.ze.state.$A(A);
  }
  charRotation(A) {
    this.ze.state.YA(A);
  }
  invert(A) {
    this.ze.state.MA(A);
  }
  clear() {
    this.ze.ie(0, 0, 0, 0);
  }
  ellipse(A, t, e, s) {
    this.ze.Ae(A, t, e / 2, s / 2);
  }
  triangle(A, t, e, s, r, i) {
    this.ze.te(A, t, e, s, r, i);
  }
  bezierCurve(A, t, e, s, r, i, B, Q) {
    this.ze.ee(A, t, e, s, r, i, B, Q);
  }
  arc(A, t, e, s, r, i) {
    this.ze.se(A, t, e, s, r, i);
  }
  shader(A) {
    this.ze.Vt(A);
  }
  setUniform(A, t) {
    this.ze.Kt(A, t);
  }
  setUniforms(A) {
    this.ze.Zt(A);
  }
  createFilterShader(A) {
    return this.ze.jt(A);
  }
};
class O {
  bB(A) {
    const t = A.U(0), e = A.U(1), s = A.U(2), r = A.U(3);
    return { characterPixels: t, primaryColorPixels: e, secondaryColorPixels: s, transformPixels: A.U(4), rotationPixels: r };
  }
  GB(A, t) {
    return A[t] + (A[t + 1] << 8);
  }
  $B(A, t) {
    return { r: A[t], g: A[t + 1], b: A[t + 2], a: A[t + 3] };
  }
}
class W {
  MB(A, t) {
    return new Blob([A], { type: t });
  }
  YB(A, t, e) {
    try {
      const s = this.MB(A, e), r = URL.createObjectURL(s), i = document.createElement("a");
      i.href = r, i.download = t, i.style.display = "none", i.rel = "noopener", document.body.appendChild(i), i.click(), document.body.removeChild(i), URL.revokeObjectURL(r);
    } catch (s) {
      throw console.error("Failed to download file:", s), Error("File download failed: " + (s instanceof Error ? s.message : "Unknown error"));
    }
  }
  zB() {
    return (/* @__PURE__ */ new Date()).toISOString().slice(0, 19).replace(/:/g, "-");
  }
  RB() {
    const A = /* @__PURE__ */ new Date();
    return { date: A.toISOString().split("T")[0], time: A.toTimeString().split(" ")[0].replace(/:/g, "-") };
  }
  SB(A) {
    return A.replace(/[<>:"/\\|?*]/g, "_").replace(/\s+/g, "_").replace(/_{2,}/g, "_").replace(/^_+|_+$/g, "").substring(0, 255);
  }
  TB() {
    return "textmode-export-" + this.zB();
  }
}
class MA extends O {
  FB(A, t, e) {
    const s = A[e] === 255, r = A[e + 1] === 255, i = A[e + 2] === 255, B = t[e], Q = t[e + 1];
    return { isInverted: s, flipHorizontal: r, flipVertical: i, rotation: Math.round(360 * (B + Q / 255) / 255 * 100) / 100 };
  }
  OB(A, t, e) {
    return { x: A, y: t, cellX: A * e.cellWidth, cellY: t * e.cellHeight };
  }
  UB(A, t) {
    const e = [];
    let s = 0;
    for (let r = 0; r < t.rows; r++) for (let i = 0; i < t.cols; i++) {
      const B = 4 * s, Q = this.GB(A.characterPixels, B);
      let o = this.$B(A.primaryColorPixels, B), h = this.$B(A.secondaryColorPixels, B);
      const a = this.FB(A.transformPixels, A.rotationPixels, B);
      if (a.isInverted) {
        const l = o;
        o = h, h = l;
      }
      const g = this.OB(i, r, t);
      e.push({ charIndex: Q, primaryColor: o, secondaryColor: h, transform: a, position: g }), s++;
    }
    return e;
  }
}
class _A {
  LB(A, t) {
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
        const B = r.groups[i], Q = r.groups[i + 1], o = r.groups[i + 2];
        if (t >= B && t <= Q) return o + (t - B);
      }
    }
    return 0;
  }
  kB(A, t, e, s, r) {
    const i = r / A.head.unitsPerEm;
    return { getBoundingBox: () => ({ x1: e + t.xMin * i, y1: s + -t.yMax * i, x2: e + t.xMax * i, y2: s + -t.yMin * i }), toSVG: () => this.HB(t, e, s, i) };
  }
  HB(A, t, e, s) {
    if (!A || !A.xs) return "";
    const { xs: r, ys: i, endPts: B, flags: Q } = A;
    if (!(r && i && B && Q)) return "";
    let o = "", h = 0;
    for (let a = 0; a < B.length; a++) {
      const g = B[a];
      if (!(g < h)) {
        if (g >= h) {
          const l = t + r[h] * s, c = e - i[h] * s;
          o += `M${l.toFixed(2)},${c.toFixed(2)}`;
          let C = h + 1;
          for (; C <= g; )
            if (1 & Q[C]) {
              const d = t + r[C] * s, I = e - i[C] * s;
              o += `L${d.toFixed(2)},${I.toFixed(2)}`, C++;
            } else {
              const d = t + r[C] * s, I = e - i[C] * s;
              let w = C + 1 > g ? h : C + 1;
              if (1 & Q[w]) {
                const p = t + r[w] * s, u = e - i[w] * s;
                o += `Q${d.toFixed(2)},${I.toFixed(2)} ${p.toFixed(2)},${u.toFixed(2)}`, C = w + 1;
              } else {
                const p = (d + (t + r[w] * s)) / 2, u = (I + (e - i[w] * s)) / 2;
                o += `Q${d.toFixed(2)},${I.toFixed(2)} ${p.toFixed(2)},${u.toFixed(2)}`, C = w;
              }
            }
          o += "Z";
        }
        h = g + 1;
      }
    }
    return o;
  }
  WB(A, t, e, s, r) {
    const i = A.codePointAt(0) || 0, B = this.LB(t, i);
    let Q = null;
    return t.glyf && t.glyf[B] !== null ? Q = t.glyf[B] : (Q = y.T.glyf.Ee(t, B), t.glyf[B] = Q), this.kB(t, Q, e, s, r);
  }
  JB(A, t, e, s, r, i, B, Q) {
    const o = e + (r - Q * (B / t.head.unitsPerEm)) / 2, h = s + (i + 0.7 * B) / 2;
    return this.WB(A, t, o, h, B).toSVG() || null;
  }
}
class GA {
  constructor() {
    n(this, "VB");
    this.VB = new _A();
  }
  KB(A) {
    return `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<svg width="${A.width}" height="${A.height}" viewBox="0 0 ${A.width} ${A.height}" 
     xmlns="http://www.w3.org/2000/svg" version="1.1">
<title>textmode art generated via textmode.js</title>
<desc>textmode art visualization generated by textmode.js library</desc>`;
  }
  ZB() {
    return `
</g>
</svg>`;
  }
  jB(A, t) {
    if (!t.includeBackgroundRectangles) return "";
    const e = t.backgroundColor, s = `rgba(${e[0]},${e[1]},${e[2]},${e[3] / 255})`;
    return `
<rect width="${A.width}" height="${A.height}" fill="${s}" />`;
  }
  XB(A) {
    return `rgba(${A.r},${A.g},${A.b},${A.a / 255})`;
  }
  NB(A, t) {
    const { transform: e, position: s } = A, r = s.cellX + t.cellWidth / 2, i = s.cellY + t.cellHeight / 2, B = [];
    if (e.flipHorizontal || e.flipVertical) {
      const Q = e.flipHorizontal ? -1 : 1, o = e.flipVertical ? -1 : 1;
      B.push(`translate(${r} ${i})`), B.push(`scale(${Q} ${o})`), B.push(`translate(${-r} ${-i})`);
    }
    return e.rotation && B.push(`rotate(${e.rotation} ${r} ${i})`), B.length ? ` transform="${B.join(" ")}"` : "";
  }
  qB(A, t, e) {
    if (!e.includeBackgroundRectangles || A.secondaryColor.a === 0) return "";
    const { position: s } = A, r = this.XB(A.secondaryColor);
    return e.drawMode === "stroke" ? `
  <rect x="${s.cellX}" y="${s.cellY}" width="${t.cellWidth}" height="${t.cellHeight}" stroke="${r}" fill="none" stroke-width="${e.strokeWidth}" />` : `
  <rect x="${s.cellX}" y="${s.cellY}" width="${t.cellWidth}" height="${t.cellHeight}" fill="${r}" />`;
  }
  WB(A, t, e, s) {
    const r = e.characters[A.charIndex];
    if (!r) return "";
    const i = this.VB.JB(r.character, e.font, A.position.cellX, A.position.cellY, t.cellWidth, t.cellHeight, e.fontSize, r.advanceWidth);
    if (!i) return "";
    const B = this.XB(A.primaryColor);
    return s.drawMode === "stroke" ? `
    <path id="${`path-${A.charIndex}-${A.position.cellX}-${A.position.cellY}`.replace(/\./g, "-")}" d="${i}" stroke="${B}" stroke-width="${s.strokeWidth}" fill="none" />` : `
    <path d="${i}" fill="${B}" />`;
  }
  As(A, t, e, s) {
    let r = "";
    r += this.qB(A, t, s);
    const i = this.NB(A, t), B = this.WB(A, t, e, s);
    return B && (i ? (r += `
  <g${i}>`, r += B, r += `
  </g>`) : r += B), r;
  }
  ts(A, t, e, s) {
    let r = this.KB(t);
    r += this.jB(t, s), r += `
<g id="ascii-cells">`;
    for (const i of A) r += this.As(i, t, e, s);
    return r += this.ZB(), r;
  }
  es(A) {
    return A.replace(/<path[^>]*d=""[^>]*\/>/g, "").replace(/\n\s*\n/g, `
`).replace(/[ \t]+$/gm, "");
  }
}
class YA extends W {
  Bs(A) {
    return this.MB(A, "image/svg+xml;charset=utf-8");
  }
  ss(A, t) {
    this.YB(A, this.SB(t) + ".svg", "image/svg+xml;charset=utf-8");
  }
  Qs(A, t) {
    this.ss(A, t || this.TB());
  }
}
class H {
  constructor() {
    n(this, "rs");
    n(this, "Es");
    n(this, "ns");
    this.rs = new MA(), this.Es = new GA(), this.ns = new YA();
  }
  gs(A) {
    return { includeBackgroundRectangles: A.includeBackgroundRectangles ?? !0, drawMode: A.drawMode ?? "fill", strokeWidth: A.strokeWidth ?? 1, backgroundColor: A.backgroundColor ?? [0, 0, 0, 0], filename: A.filename || this.ns.TB() };
  }
  hs(A, t = {}) {
    const e = this.rs.UB(this.rs.bB(A.pipeline), A.grid), s = this.Es.ts(e, A.grid, A.font, this.gs(t));
    return this.Es.es(s);
  }
  Qs(A, t = {}) {
    this.ns.Qs(this.hs(A, t), t.filename);
  }
}
class FA extends O {
  cs(A, t, e, s = " ") {
    var B;
    const r = [];
    let i = 0;
    for (let Q = 0; Q < t.rows; Q++) {
      const o = [];
      for (let h = 0; h < t.cols; h++) {
        const a = 4 * i, g = this.GB(A.characterPixels, a), l = ((B = e.characters[g]) == null ? void 0 : B.character) || s;
        o.push(l), i++;
      }
      r.push(o);
    }
    return r;
  }
}
class SA {
  Cs(A, t) {
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
class zA extends W {
  Ds(A, t) {
    const e = this.ls(t);
    this.YB(A, e, "text/plain;charset=utf-8");
  }
  ls(A) {
    let t = this.SB(A);
    return t === ".txt" || t.length <= 4 ? this.TB() : t;
  }
}
class X {
  constructor() {
    n(this, "rs");
    n(this, "Es");
    n(this, "ns");
    this.rs = new FA(), this.Es = new SA(), this.ns = new zA();
  }
  gs(A) {
    return { preserveTrailingSpaces: A.preserveTrailingSpaces ?? !1, lineEnding: A.lineEnding ?? "lf", emptyCharacter: A.emptyCharacter ?? " ", filename: A.filename || this.ns.TB() };
  }
  Ps(A, t = {}) {
    const e = this.gs(t), s = this.rs.cs(this.rs.bB(A.pipeline), A.grid, A.font, e.emptyCharacter);
    return this.Es.Cs(s, e);
  }
  Ds(A, t = {}) {
    this.ns.Ds(this.Ps(A, t), t.filename);
  }
}
class UA extends O {
  us(A, t = 1, e = "transparent") {
    const s = A.canvas;
    if (t === 1 && e === "transparent") return s;
    const r = document.createElement("canvas"), i = r.getContext("2d"), B = Math.round(s.width * t), Q = Math.round(s.height * t);
    return r.width = B, r.height = Q, e !== "transparent" && (i.fillStyle = e, i.fillRect(0, 0, B, Q)), i.imageSmoothingEnabled = !1, i.drawImage(s, 0, 0, s.width, s.height, 0, 0, B, Q), r;
  }
}
class LA {
  Is(A, t) {
    const e = this.ws(t.format);
    return t.format === "png" ? A.toDataURL(e) : A.toDataURL(e, t.quality);
  }
  async fs(A, t) {
    return new Promise((e, s) => {
      const r = this.ws(t.format), i = (B) => {
        B ? e(B) : s(Error(`Failed to generate ${t.format.toUpperCase()} blob`));
      };
      t.format === "png" ? A.toBlob(i, r) : A.toBlob(i, r, t.quality);
    });
  }
  ws(A) {
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
const OA = { png: "image/png", jpg: "image/jpeg", webp: "image/webp" }, J = { png: ".png", jpg: ".jpg", webp: ".webp" };
class WA extends W {
  ds(A, t, e) {
    this.ps(A, this.SB(t) + J[e]);
  }
  ps(A, t) {
    const e = URL.createObjectURL(A);
    try {
      const s = document.createElement("a");
      s.href = e, s.download = t, s.style.display = "none", s.rel = "noopener", document.body.appendChild(s), s.click(), document.body.removeChild(s);
    } finally {
      URL.revokeObjectURL(e);
    }
  }
  _s(A) {
    return A in OA && A in J;
  }
}
class $A {
  constructor() {
    n(this, "rs");
    n(this, "Es");
    n(this, "ns");
    this.rs = new UA(), this.Es = new LA(), this.ns = new WA();
  }
  gs(A) {
    return { format: A.format ?? "png", quality: A.quality ?? 1, scale: A.scale ?? 1, backgroundColor: A.backgroundColor ?? "transparent", filename: A.filename || this.ns.TB() };
  }
  vs(A) {
    if (!this.ns._s(A.format)) throw Error(`Saving '${A.format}' files is not supported`);
    if (A.quality < 0 || A.quality > 1) throw Error("Image quality must be between 0.0 and 1.0");
    if (A.scale <= 0) throw Error("Scale factor must be greater than 0");
    A.format === "jpg" && A.backgroundColor === "transparent" && (A.backgroundColor = "black");
  }
  async fs(A, t) {
    if (t.scale === 1 && t.backgroundColor === "transparent") return await this.Es.fs(A.canvas, t);
    const e = this.rs.us(A, t.scale, t.backgroundColor);
    return await this.Es.fs(e, t);
  }
  async ds(A, t = {}) {
    const e = this.gs(t);
    this.vs(e);
    const s = await this.fs(A, e);
    this.ns.ds(s, e.filename, e.format);
  }
}
const kA = (E) => class extends E {
  bs() {
    this.ze.re(this.Gs);
  }
  toString(A = {}) {
    return this.bs(), new X().Ps({ pipeline: this.$s, grid: this.Ms, font: this.We }, A);
  }
  saveStrings(A = {}) {
    this.bs(), new X().Ds({ pipeline: this.$s, grid: this.Ms, font: this.We }, A);
  }
  toSVG(A = {}) {
    return this.bs(), new H().hs({ pipeline: this.$s, grid: this.Ms, font: this.We }, A);
  }
  saveSVG(A = {}) {
    this.bs(), new H().Qs({ pipeline: this.$s, grid: this.Ms, font: this.We }, A);
  }
  async saveCanvas(A = {}) {
    await new $A().ds(this.aB, A);
  }
}, NA = (E) => class extends E {
  async loadFont(A) {
    return this.We.rB(A).then(() => {
      const t = this.We.maxGlyphDimensions;
      this.Ms.CB(t.width, t.height), this.$s.O(this.Ms.cols, this.Ms.rows), this.ze.Qe();
    });
  }
  fontSize(A) {
    if (!_.P(typeof A == "number" && A > 0, "Font size must be a positive number greater than 0.", { method: "fontSize", providedValue: A }) || this.We.fontSize === A) return;
    this.We.QB(A);
    const t = this.We.maxGlyphDimensions;
    this.Ms.CB(t.width, t.height), this.$s.O(this.Ms.cols, this.Ms.rows), this.ze.Qe();
  }
}, HA = (E) => class extends E {
  get frameCount() {
    return this.Ys.frameCount;
  }
  set frameCount(A) {
    this.Ys.frameCount = A;
  }
  frameRate(A) {
    return A === void 0 ? this.Ys.currentFrameRate : this.Ys.frameRate(A, () => this.zs());
  }
  noLoop() {
    this.Ys.pause();
  }
  loop() {
    this.Ys.resume(() => this.zs());
  }
  redraw(A = 1) {
    if (_.P(typeof A == "number" && A > 0 && Number.isInteger(A), "Redraw count must be a positive integer.", { method: "redraw", providedValue: A })) for (let t = 0; t < A; t++) this.zs();
  }
  isLooping() {
    return this.Ys.isLooping;
  }
};
class XA {
  constructor() {
    n(this, "ze");
    n(this, "We");
    n(this, "aB");
    n(this, "Ms");
    n(this, "Ys");
    n(this, "Gs");
    n(this, "$s");
    n(this, "Rs");
  }
  zs() {
  }
}
class JA extends function(t, ...e) {
  return e.reduce((s, r) => r(s), t);
}(XA, TA, kA, NA, HA) {
  constructor(t = {}) {
    super();
    n(this, "Ss", !1);
    n(this, "Ts", () => {
    });
    n(this, "Fs", () => {
    });
    n(this, "Os", () => {
    });
    n(this, "Us");
    this.aB = new bA(t), this.ze = new DA(this.aB.uB()), this.We = new xA(this.ze, t.fontSize ?? 16), this.Ys = new RA(t.frameRate ?? 60), this.Gs = this.ze.Jt(L, `#version 300 es
precision highp float;in vec2 v_uv;in vec3 v_character;in vec4 v_primaryColor;in vec4 v_secondaryColor;in vec2 v_rotation;in vec3 v_transform;layout(location=0)out vec4 o_character;layout(location=1)out vec4 o_primaryColor;layout(location=2)out vec4 o_secondaryColor;layout(location=3)out vec4 o_rotation;layout(location=4)out vec4 o_transform;void main(){o_character=vec4(v_character,1.0);o_primaryColor=v_primaryColor;o_secondaryColor=v_secondaryColor;o_rotation=vec4(v_rotation,0.0,1.0);o_transform=vec4(v_transform,1.0);}`), this.Rs = this.ze.Jt("attribute vec2 a_position;attribute vec2 a_texCoord;varying vec2 v_uv;void main(){v_uv=a_texCoord;gl_Position=vec4(a_position,0.0,1.0);}", "precision mediump float;uniform sampler2D u_characterTexture;uniform vec2 u_charsetDimensions;uniform sampler2D u_primaryColorTexture;uniform sampler2D u_secondaryColorTexture;uniform sampler2D u_transformTexture;uniform sampler2D u_asciiCharacterTexture;uniform sampler2D u_rotationTexture;uniform vec2 u_gridCellDimensions;uniform vec2 u_gridPixelDimensions;uniform vec2 u_gridOffsetPixels;mat2 rotate2D(float angle){float s=sin(angle);float c=cos(angle);return mat2(c,-s,s,c);}void main(){vec2 adjustedCoord=(gl_FragCoord.xy-u_gridOffsetPixels)/u_gridPixelDimensions;vec2 gridCoord=adjustedCoord*u_gridCellDimensions;vec2 cellCoord=floor(gridCoord);vec2 charIndexTexCoord=(cellCoord+0.5)/u_gridCellDimensions;vec4 primaryColor=texture2D(u_primaryColorTexture,charIndexTexCoord);vec4 secondaryColor=texture2D(u_secondaryColorTexture,charIndexTexCoord);vec4 transformColor=texture2D(u_transformTexture,charIndexTexCoord);bool isInverted=transformColor.r>0.5;bool flipHorizontal=transformColor.g>0.5;bool flipVertical=transformColor.b>0.5;vec4 encodedIndexVec=texture2D(u_asciiCharacterTexture,charIndexTexCoord);int charIndex=int(encodedIndexVec.r*255.0+0.5)+int(encodedIndexVec.g*255.0+0.5)*256;int charCol=int(mod(float(charIndex),u_charsetDimensions.x));int charRow=charIndex/int(u_charsetDimensions.x);float flippedRow=(u_charsetDimensions.y-1.0)-float(charRow);vec2 charCoord=vec2(float(charCol),flippedRow)/u_charsetDimensions;vec4 rotationColor=texture2D(u_rotationTexture,charIndexTexCoord);float scaledAngle=rotationColor.r*255.0+rotationColor.g;float rotationAngle=-(scaledAngle*360.0/255.0)*0.017453292;vec2 fractionalPart=fract(gridCoord)-0.5;if(flipHorizontal)fractionalPart.x=-fractionalPart.x;if(flipVertical)fractionalPart.y=-fractionalPart.y;fractionalPart=rotate2D(rotationAngle)*fractionalPart+0.5;vec2 cellSize=1.0/u_charsetDimensions;vec2 texCoord=charCoord+fractionalPart*cellSize;vec2 cellMax=charCoord+cellSize;if(any(lessThan(texCoord,charCoord))||any(greaterThan(texCoord,cellMax))){gl_FragColor=isInverted ? primaryColor : secondaryColor;return;}vec4 charTexel=texture2D(u_characterTexture,texCoord);if(isInverted)charTexel.rgb=1.0-charTexel.rgb;gl_FragColor=mix(secondaryColor,primaryColor,charTexel);}"), this.Ls(t);
  }
  async Ls(t) {
    await this.We.BB(t.fontSource);
    const e = this.We.maxGlyphDimensions;
    this.Ms = new vA(this.aB.canvas, e.width, e.height), this.$s = this.ze.Be(this.Ms.cols, this.Ms.rows, 5), this.ks(), this.Ts(), this.Ys.start(() => this.zs());
  }
  ks() {
    this.Us = () => {
      this.Os();
    }, window.addEventListener("resize", this.Us);
  }
  zs() {
    if (this.Ys.measureFrameRate(), this.Ys.incrementFrame(), this.Ss) return;
    this.$s.k(), this.ze.Wt(this.Gs), this.Fs(), this.ze.re(this.Gs), this.$s.H();
    const t = this.ze.state.canvasBackgroundColor;
    this.ze.ot(t[0], t[1], t[2], t[3]), this.ze.Wt(this.Rs), this.Rs.eA({ u_characterTexture: this.We.fontFramebuffer, u_charsetDimensions: [this.We.textureColumns, this.We.textureRows], u_asciiCharacterTexture: this.$s.textures[0], u_primaryColorTexture: this.$s.textures[1], u_secondaryColorTexture: this.$s.textures[2], u_transformTexture: this.$s.textures[4], u_rotationTexture: this.$s.textures[3], u_gridCellDimensions: [this.Ms.cols, this.Ms.rows], u_gridPixelDimensions: [this.Ms.width, this.Ms.height], u_gridOffsetPixels: [this.Ms.offsetX, this.Ms.offsetY], u_aspectRatio: this.Ms.width / this.Ms.height }), this.ze.Xt(this.Ms.offsetX, this.Ms.offsetY, this.Ms.width, this.Ms.height);
  }
  setup(t) {
    this.Ts = t;
  }
  draw(t) {
    this.Fs = t;
  }
  windowResized(t) {
    this.Os = t;
  }
  resizeCanvas(t, e) {
    this.aB.O(t, e), this.Ms.fA(), this.$s.O(this.Ms.cols, this.Ms.rows), this.ze.Qe(), this.zs();
  }
  destroy() {
    this.Ss || (this.Ys.stop(), window.removeEventListener("resize", this.Us), this.We.W(), this.ze.W(), this.Ss = !0);
  }
  get grid() {
    return this.Ms;
  }
  get font() {
    return this.We;
  }
  get width() {
    return this.aB.width;
  }
  get height() {
    return this.aB.height;
  }
  get canvas() {
    return this.aB.canvas;
  }
  get isDisposed() {
    return this.Ss;
  }
  get drawFramebuffer() {
    return this.$s;
  }
}
class $ {
  constructor() {
  }
  static create(A = {}) {
    return new JA(A);
  }
  static setErrorLevel(A) {
    _.u(A);
  }
  static get version() {
    return "0.2.0";
  }
}
const jA = Object.freeze(Object.defineProperty({ __proto__: null }, Symbol.toStringTag, { value: "Module" })), ZA = $.create, KA = $.setErrorLevel, qA = $.version;
export {
  bA as TextmodeCanvas,
  q as TextmodeErrorLevel,
  xA as TextmodeFont,
  vA as TextmodeGrid,
  JA as Textmodifier,
  ZA as create,
  jA as export,
  KA as setErrorLevel,
  $ as textmode,
  qA as version
};
