var $ = Object.defineProperty;
var N = (n, A, e) => A in n ? $(n, A, { enumerable: !0, configurable: !0, writable: !0, value: e }) : n[A] = e;
var o = (n, A, e) => N(n, typeof A != "symbol" ? A + "" : A, e);
class D extends Error {
  constructor(e, t, r = {}) {
    const i = D.createFormattedMessage(e, r);
    super(i);
    o(this, "originalError");
    o(this, "context");
    this.name = "TextmodeError", this.originalError = t, this.context = r;
  }
  /**
   * Create a formatted error message that includes context
   */
  static createFormattedMessage(e, t) {
    let r = e;
    if (t && Object.keys(t).length > 0) {
      r += `

📋 Context:`;
      for (const [i, a] of Object.entries(t)) {
        const s = D.formatValue(a);
        r += `
  - ${i}: ${s}`;
      }
    }
    return r += `

`, r += "↓".repeat(24) + `
`, r;
  }
  /**
   * Format values for better display in error messages
   */
  static formatValue(e) {
    if (e === null) return "null";
    if (e === void 0) return "undefined";
    if (typeof e == "string") return `"${e}"`;
    if (typeof e == "number" || typeof e == "boolean") return String(e);
    if (Array.isArray(e))
      return e.length === 0 ? "[]" : e.length <= 5 ? `[${e.map((t) => D.formatValue(t)).join(", ")}]` : `[${e.slice(0, 3).map((t) => D.formatValue(t)).join(", ")}, ... +${e.length - 3} more]`;
    if (typeof e == "object") {
      const t = Object.keys(e);
      return t.length === 0 ? "{}" : t.length <= 3 ? `{ ${t.map((a) => `${a}: ${D.formatValue(e[a])}`).join(", ")} }` : `{ ${t.slice(0, 2).map((i) => `${i}: ${D.formatValue(e[i])}`).join(", ")}, ... +${t.length - 2} more }`;
    }
    return String(e);
  }
}
var X = /* @__PURE__ */ ((n) => (n[n.SILENT = 0] = "SILENT", n[n.WARNING = 1] = "WARNING", n[n.ERROR = 2] = "ERROR", n[n.THROW = 3] = "THROW", n))(X || {});
const x = class x {
  constructor() {
    o(this, "_options", {
      globalLevel: 3
      /* THROW */
    });
  }
  static getInstance() {
    return x._instance || (x._instance = new x()), x._instance;
  }
  /**
   * Handle an error based on the configured settings
   * @returns true if execution should continue, false if error was handled
   */
  _handle(A, e, t) {
    const r = "[textmode.js]";
    switch (this._options.globalLevel) {
      case 0:
        return !1;
      // Validation failed, handled silently
      case 1:
        return console.group(
          `%c${r} Oops! (╯°□°)╯︵ Something went wrong in your code.`,
          "color: #f44336; font-weight: bold; background: #ffebee; padding: 2px 6px; border-radius: 3px;"
        ), console.warn(D.createFormattedMessage(A, e)), console.groupEnd(), !1;
      case 2:
        return console.group(
          `%c${r} Oops! (╯°□°)╯︵ Something went wrong in your code.`,
          "color: #f44336; font-weight: bold; background: #ffebee; padding: 2px 6px; border-radius: 3px;"
        ), console.error(D.createFormattedMessage(A, e)), console.groupEnd(), !1;
      case 3:
      default:
        const i = new D(A, t, e);
        throw console.group(
          `%c${r} Oops! (╯°□°)╯︵ Something went wrong in your code.`,
          "color: #d32f2f; font-weight: bold; background: #ffcdd2; padding: 2px 6px; border-radius: 3px;"
        ), i;
    }
  }
  /**
   * Validate a condition and handle errors if validation fails
   * @param condition The condition to validate
   * @param message Error message if validation fails
   * @param context Additional context for debugging
   * @returns true if validation passed, false if validation failed and was handled
   */
  validate(A, e, t) {
    return A ? !0 : (this._handle(e, t), !1);
  }
  /**
   * Set global error level
   */
  setGlobalLevel(A) {
    this._options.globalLevel = A;
  }
};
o(x, "_instance", null);
let G = x;
const u = G.getInstance();
class W {
  constructor(A, e, t = e, r = {}) {
    o(this, "gl");
    o(this, "_framebuffer");
    o(this, "_texture");
    o(this, "_width");
    o(this, "_height");
    o(this, "options");
    o(this, "previousState", null);
    o(this, "_pixels", null);
    this.gl = A, this._width = e, this._height = t, this.options = {
      filter: "nearest",
      wrap: "clamp",
      format: "rgba",
      type: "unsigned_byte",
      ...r
    }, this._texture = this.createTexture(), this._framebuffer = A.createFramebuffer(), this.attachTexture();
  }
  createTexture() {
    const { gl: A } = this, e = A.createTexture();
    A.bindTexture(A.TEXTURE_2D, e);
    const t = this.options.filter === "linear" ? A.LINEAR : A.NEAREST, r = this.options.wrap === "repeat" ? A.REPEAT : A.CLAMP_TO_EDGE;
    return A.texParameteri(A.TEXTURE_2D, A.TEXTURE_MIN_FILTER, t), A.texParameteri(A.TEXTURE_2D, A.TEXTURE_MAG_FILTER, t), A.texParameteri(A.TEXTURE_2D, A.TEXTURE_WRAP_S, r), A.texParameteri(A.TEXTURE_2D, A.TEXTURE_WRAP_T, r), this.updateTextureSize(), e;
  }
  updateTextureSize() {
    const { gl: A } = this, e = A.RGBA, t = A.RGBA, r = this.options.type === "float" ? A.FLOAT : A.UNSIGNED_BYTE;
    A.texImage2D(A.TEXTURE_2D, 0, e, this._width, this._height, 0, t, r, null);
  }
  attachTexture() {
    const { gl: A } = this;
    A.bindFramebuffer(A.FRAMEBUFFER, this._framebuffer), A.framebufferTexture2D(A.FRAMEBUFFER, A.COLOR_ATTACHMENT0, A.TEXTURE_2D, this._texture, 0), A.bindFramebuffer(A.FRAMEBUFFER, null);
  }
  /**
   * Update the framebuffer texture with canvas or video content
   */
  update(A) {
    const { gl: e } = this;
    A instanceof HTMLVideoElement && A.readyState < 2 || (e.bindTexture(e.TEXTURE_2D, this._texture), e.texImage2D(e.TEXTURE_2D, 0, e.RGBA, e.RGBA, e.UNSIGNED_BYTE, A), e.bindTexture(e.TEXTURE_2D, null));
  }
  /**
   * Update the framebuffer texture with pixel data
   */
  updatePixels(A, e, t) {
    const { gl: r } = this;
    r.bindTexture(r.TEXTURE_2D, this._texture), r.texImage2D(r.TEXTURE_2D, 0, r.RGBA, e, t, 0, r.RGBA, r.UNSIGNED_BYTE, A), r.bindTexture(r.TEXTURE_2D, null);
  }
  /**
   * Resize the framebuffer
   */
  resize(A, e) {
    this._width = A, this._height = e, this.gl.bindTexture(this.gl.TEXTURE_2D, this._texture), this.updateTextureSize(), this.gl.bindTexture(this.gl.TEXTURE_2D, null);
  }
  /**
   * Begin rendering to this framebuffer
   */
  begin() {
    const { gl: A } = this;
    this.previousState = {
      framebuffer: A.getParameter(A.FRAMEBUFFER_BINDING),
      viewport: A.getParameter(A.VIEWPORT)
    }, A.bindFramebuffer(A.FRAMEBUFFER, this._framebuffer), A.viewport(0, 0, this._width, this._height);
  }
  /**
   * End rendering to this framebuffer and restore previous state
   */
  end() {
    if (!this.previousState) return;
    const { gl: A } = this;
    A.bindFramebuffer(A.FRAMEBUFFER, this.previousState.framebuffer), A.viewport(...this.previousState.viewport), this.previousState = null;
  }
  /**
   * Load pixel data from the framebuffer into the pixels array
   */
  loadPixels() {
    const { gl: A } = this;
    this._pixels || (this._pixels = new Uint8Array(this._width * this._height * 4));
    const e = A.getParameter(A.FRAMEBUFFER_BINDING);
    A.bindFramebuffer(A.FRAMEBUFFER, this._framebuffer), A.readPixels(0, 0, this._width, this._height, A.RGBA, A.UNSIGNED_BYTE, this._pixels), A.bindFramebuffer(A.FRAMEBUFFER, e);
  }
  get(A, e, t, r) {
    const { gl: i } = this;
    if (A === void 0 && e === void 0) {
      const a = new Uint8Array(this._width * this._height * 4), s = i.getParameter(i.FRAMEBUFFER_BINDING);
      return i.bindFramebuffer(i.FRAMEBUFFER, this._framebuffer), i.readPixels(0, 0, this._width, this._height, i.RGBA, i.UNSIGNED_BYTE, a), i.bindFramebuffer(i.FRAMEBUFFER, s), a;
    } else if (t === void 0 && r === void 0) {
      (A < 0 || e < 0 || A >= this._width || e >= this._height) && (console.warn("The x and y values passed to Framebuffer.get are outside of its range and will be clamped."), A = Math.max(0, Math.min(A, this._width - 1)), e = Math.max(0, Math.min(e, this._height - 1)));
      const a = new Uint8Array(4), s = i.getParameter(i.FRAMEBUFFER_BINDING);
      return i.bindFramebuffer(i.FRAMEBUFFER, this._framebuffer), i.readPixels(A, e, 1, 1, i.RGBA, i.UNSIGNED_BYTE, a), i.bindFramebuffer(i.FRAMEBUFFER, s), [a[0], a[1], a[2], a[3]];
    } else {
      A = Math.max(0, Math.min(A, this._width - 1)), e = Math.max(0, Math.min(e, this._height - 1)), t = Math.max(1, Math.min(t, this._width - A)), r = Math.max(1, Math.min(r, this._height - e));
      const a = new Uint8Array(t * r * 4), s = i.getParameter(i.FRAMEBUFFER_BINDING);
      return i.bindFramebuffer(i.FRAMEBUFFER, this._framebuffer), i.readPixels(A, e, t, r, i.RGBA, i.UNSIGNED_BYTE, a), i.bindFramebuffer(i.FRAMEBUFFER, s), a;
    }
  }
  // Getters
  get framebuffer() {
    return this._framebuffer;
  }
  get texture() {
    return this._texture;
  }
  get width() {
    return this._width;
  }
  get height() {
    return this._height;
  }
  get pixels() {
    return this._pixels;
  }
}
class O {
  constructor(A, e, t, r, i, a = {}) {
    /** The WebGL rendering context */
    o(this, "gl");
    /** The vertex buffer containing position and optional texture coordinates */
    o(this, "vertexBuffer");
    /** The number of vertices in this geometry (always 6 for two triangles) */
    o(this, "vertexCount", 6);
    /** The rendering mode: textured or solid color */
    o(this, "renderMode");
    /** Bytes per vertex: 8 for position-only, 16 for position+texture */
    o(this, "bytesPerVertex");
    this.gl = A;
    const s = a.textured ?? !0;
    this.renderMode = s ? "textured" : "solid", this.bytesPerVertex = s ? 16 : 8;
    const B = A.getParameter(A.VIEWPORT), g = B[2], E = B[3], l = A.getParameter(A.FRAMEBUFFER_BINDING) !== null, h = e / g * 2 - 1, d = (e + r) / g * 2 - 1;
    let C, c;
    l ? (C = t / E * 2 - 1, c = (t + i) / E * 2 - 1) : (C = 1 - t / E * 2, c = 1 - (t + i) / E * 2);
    const f = this.generateVertices(h, C, d, c, s);
    this.vertexBuffer = A.createBuffer(), A.bindBuffer(A.ARRAY_BUFFER, this.vertexBuffer), A.bufferData(A.ARRAY_BUFFER, f, A.STATIC_DRAW);
  }
  /**
   * Generate vertex data for the rectangle
   * @private
   */
  generateVertices(A, e, t, r, i) {
    return i ? new Float32Array([
      A,
      r,
      0,
      1,
      // bottom-left
      t,
      r,
      1,
      1,
      // bottom-right
      A,
      e,
      0,
      0,
      // top-left
      A,
      e,
      0,
      0,
      // top-left
      t,
      r,
      1,
      1,
      // bottom-right
      t,
      e,
      1,
      0
      // top-right
    ]) : new Float32Array([
      A,
      r,
      // bottom-left
      t,
      r,
      // bottom-right
      A,
      e,
      // top-left
      A,
      e,
      // top-left
      t,
      r,
      // bottom-right
      t,
      e
      // top-right
    ]);
  }
  /**
   * Render the rectangle using the appropriate vertex attributes
   */
  render() {
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vertexBuffer);
    const A = 0, e = 1;
    this.gl.enableVertexAttribArray(A), this.gl.vertexAttribPointer(A, 2, this.gl.FLOAT, !1, this.bytesPerVertex, 0), this.renderMode === "textured" && (this.gl.enableVertexAttribArray(e), this.gl.vertexAttribPointer(e, 2, this.gl.FLOAT, !1, this.bytesPerVertex, 8)), this.gl.drawArrays(this.gl.TRIANGLES, 0, this.vertexCount), this.gl.disableVertexAttribArray(A), this.renderMode === "textured" && this.gl.disableVertexAttribArray(e);
  }
}
class w {
  constructor(A, e, t) {
    o(this, "gl");
    o(this, "program");
    o(this, "uniformLocations", /* @__PURE__ */ new Map());
    o(this, "attributeLocations", /* @__PURE__ */ new Map());
    o(this, "textureUnitCounter", 0);
    this.gl = A, this.program = this.createProgram(e, t), this.cacheLocations();
  }
  createProgram(A, e) {
    const t = this.createShader(this.gl.VERTEX_SHADER, A), r = this.createShader(this.gl.FRAGMENT_SHADER, e), i = this.gl.createProgram();
    if (this.gl.attachShader(i, t), this.gl.attachShader(i, r), this.gl.linkProgram(i), !this.gl.getProgramParameter(i, this.gl.LINK_STATUS)) {
      const a = this.gl.getProgramInfoLog(i);
      throw new Error(`Shader program link error: ${a}`);
    }
    return this.gl.deleteShader(t), this.gl.deleteShader(r), i;
  }
  createShader(A, e) {
    const t = this.gl.createShader(A);
    if (this.gl.shaderSource(t, e), this.gl.compileShader(t), !this.gl.getShaderParameter(t, this.gl.COMPILE_STATUS)) {
      const r = this.gl.getShaderInfoLog(t);
      throw this.gl.deleteShader(t), new Error(`Shader compilation error: ${r}`);
    }
    return t;
  }
  cacheLocations() {
    const A = this.gl.getProgramParameter(this.program, this.gl.ACTIVE_UNIFORMS);
    for (let t = 0; t < A; t++) {
      const r = this.gl.getActiveUniform(this.program, t);
      if (r) {
        const i = this.gl.getUniformLocation(this.program, r.name);
        i && this.uniformLocations.set(r.name, i);
      }
    }
    const e = this.gl.getProgramParameter(this.program, this.gl.ACTIVE_ATTRIBUTES);
    for (let t = 0; t < e; t++) {
      const r = this.gl.getActiveAttrib(this.program, t);
      if (r) {
        const i = this.gl.getAttribLocation(this.program, r.name);
        this.attributeLocations.set(r.name, i);
      }
    }
  }
  /**
   * Use this shader program
   */
  use() {
    this.gl.useProgram(this.program), this.resetTextureUnits();
  }
  /**
   * Set a single uniform value with automatic texture unit management
   */
  setUniform(A, e) {
    const t = this.uniformLocations.get(A);
    if (!t) {
      console.warn(`Uniform '${A}' not found in shader`);
      return;
    }
    const r = this.getUniformInfo(A);
    if (typeof e == "number")
      r && r.type === this.gl.INT ? this.gl.uniform1i(t, Math.floor(e)) : this.gl.uniform1f(t, e);
    else if (typeof e == "boolean")
      this.gl.uniform1i(t, e ? 1 : 0);
    else if (Array.isArray(e))
      if (r && (r.type === this.gl.INT_VEC2 || r.type === this.gl.INT_VEC3 || r.type === this.gl.INT_VEC4)) {
        const i = e.map((a) => Math.floor(a));
        switch (i.length) {
          case 2:
            this.gl.uniform2iv(t, i);
            break;
          case 3:
            this.gl.uniform3iv(t, i);
            break;
          case 4:
            this.gl.uniform4iv(t, i);
            break;
          default:
            console.warn(`Unsupported array length ${i.length} for uniform '${A}'`);
        }
      } else
        switch (e.length) {
          case 2:
            this.gl.uniform2f(t, e[0], e[1]);
            break;
          case 3:
            this.gl.uniform3f(t, e[0], e[1], e[2]);
            break;
          case 4:
            this.gl.uniform4f(t, e[0], e[1], e[2], e[3]);
            break;
          default:
            console.warn(`Unsupported array length ${e.length} for uniform '${A}'`);
        }
    else if (e instanceof WebGLTexture) {
      const i = this.getNextTextureUnit();
      this.gl.uniform1i(t, i), this.gl.activeTexture(this.gl.TEXTURE0 + i), this.gl.bindTexture(this.gl.TEXTURE_2D, e);
    } else if (e && typeof e == "object" && "texture" in e) {
      const i = this.getNextTextureUnit();
      this.gl.uniform1i(t, i), this.gl.activeTexture(this.gl.TEXTURE0 + i), this.gl.bindTexture(this.gl.TEXTURE_2D, e.texture);
    } else
      console.warn(`Unsupported uniform type for '${A}':`, typeof e);
  }
  /**
   * Get uniform info to determine the correct WebGL type
   */
  getUniformInfo(A) {
    const e = this.gl.getProgramParameter(this.program, this.gl.ACTIVE_UNIFORMS);
    for (let t = 0; t < e; t++) {
      const r = this.gl.getActiveUniform(this.program, t);
      if (r && r.name === A)
        return r;
    }
    return null;
  }
  getNextTextureUnit() {
    return this.textureUnitCounter++;
  }
  /**
   * Reset texture unit counter (useful when starting a new frame)
   */
  resetTextureUnits() {
    this.textureUnitCounter = 0;
  }
}
var p = "attribute vec2 a_position;attribute vec2 a_texCoord;varying vec2 v_uv;void main(){v_uv=a_texCoord;gl_Position=vec4(a_position,0.0,1.0);}", J = "precision lowp float;uniform sampler2D u_texture;varying vec2 v_uv;void main(){gl_FragColor=texture2D(u_texture,v_uv);}", K = "precision lowp float;uniform vec4 u_color;void main(){gl_FragColor=u_color;}";
class j {
  constructor(A) {
    o(this, "gl");
    o(this, "imageShader");
    o(this, "solidColorShader");
    o(this, "currentShader", null);
    o(this, "currentBlendMode", "normal");
    // Fill state management
    o(this, "currentFillColor", [1, 1, 1, 1]);
    o(this, "fillMode", !1);
    this.gl = A, this.imageShader = new w(this.gl, p, J), this.solidColorShader = new w(this.gl, p, K), this.gl.enable(this.gl.BLEND), this.gl.blendEquation(this.gl.FUNC_ADD), this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);
  }
  /**
   * Set the current shader (p5.js-like API)
   */
  shader(A) {
    this.currentShader = A, A.use();
  }
  /**
   * Sets the fill color for subsequent rendering operations
   * @param r Red component (0-255)
   * @param g Green component (0-255, optional)
   * @param b Blue component (0-255, optional)
   * @param a Alpha component (0-255, optional)
   */
  fill(A, e, t, r) {
    if (this.fillMode = !0, e === void 0 && t === void 0 && r === void 0) {
      const i = A / 255;
      this.currentFillColor = [i, i, i, 1];
    } else if (t !== void 0 && r === void 0)
      this.currentFillColor = [A / 255, e / 255, t / 255, 1];
    else if (t !== void 0 && r !== void 0)
      this.currentFillColor = [A / 255, e / 255, t / 255, r / 255];
    else
      throw new Error("Invalid fill parameters. Use fill(gray), fill(r,g,b), or fill(r,g,b,a)");
  }
  /**
   * Reset fill mode - called automatically after each frame
   */
  reset() {
    this.fillMode = !1;
  }
  createShader(A, e) {
    return new w(this.gl, A, e);
  }
  /**
   * Set a uniform value for the current shader (p5.js-like API)
   */
  setUniform(A, e) {
    this.currentShader.setUniform(A, e);
  }
  /**
   * Draw a rectangle with the current shader or fill color (p5.js-like API)
   */
  rect(A, e, t, r) {
    if (this.fillMode && this.currentShader === null) {
      const i = this.currentBlendMode;
      this.setBlendMode(
        "premultiplied"
        /* PREMULTIPLIED */
      ), this.shader(this.solidColorShader), this.setUniform("u_color", this.currentFillColor), new O(this.gl, A, e, t, r, { textured: !1 }).render(), this.setBlendMode(i);
    } else
      new O(this.gl, A, e, t, r, { textured: !0 }).render();
    this.currentShader = null;
  }
  /**
   * Create a new framebuffer
   */
  createFramebuffer(A, e, t = {}) {
    return new W(this.gl, A, e, t);
  }
  /**
   * Fill the current framebuffer with a solid color (p5.js-like API)
   */
  background(A, e = A, t = A, r = 255) {
    this.clear(A / 255, e / 255, t / 255, r / 255);
  }
  /**
   * Clear the current framebuffer
   */
  clear(A = 0, e = 0, t = 0, r = 0) {
    this.gl.clearColor(A, e, t, r), this.gl.clear(this.gl.COLOR_BUFFER_BIT);
  }
  /**
   * Ensure viewport matches canvas dimensions
   */
  resetViewport() {
    this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
  }
  /**
   * Get the WebGL context
   */
  get context() {
    return this.gl;
  }
  /**
   * Set the blend mode for different rendering contexts
   */
  setBlendMode(A) {
    if (this.currentBlendMode !== A)
      switch (this.currentBlendMode = A, A) {
        case "normal":
          this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);
          break;
        case "premultiplied":
          this.gl.blendFunc(this.gl.ONE, this.gl.ONE_MINUS_SRC_ALPHA);
          break;
      }
  }
  /**
   * Render a framebuffer at a specific position with optional scaling
   */
  image(A, e, t, r, i) {
    const a = this.currentBlendMode;
    this.setBlendMode(
      "premultiplied"
      /* PREMULTIPLIED */
    ), this.shader(this.imageShader), this.setUniform("u_texture", A.texture), this.rect(e, t, r ?? A.width, i ?? A.height), this.setBlendMode(a);
  }
}
var Q = {};
Q.parse = function(n) {
  var A = Q.B, e = function(h, d, C, c) {
    var f = Q.T, I = {
      cmap: f.cmap,
      head: f.head,
      hhea: f.hhea,
      maxp: f.maxp,
      hmtx: f.hmtx,
      loca: f.loca,
      glyf: f.glyf
    }, P = { _data: h, _index: d, _offset: C };
    for (var m in I) {
      var F = Q.findTable(h, m, C);
      if (F) {
        var _ = F[0], v = c[_];
        v == null && (v = I[m].parseTab(h, _, F[1], P)), P[m] = c[_] = v;
      }
    }
    return P;
  }, t = new Uint8Array(n), r = {}, i = A.readASCII(t, 0, 4);
  if (i == "ttcf") {
    var a = 4;
    A.readUshort(t, a), a += 2, A.readUshort(t, a), a += 2;
    var s = A.readUint(t, a);
    a += 4;
    for (var B = [], g = 0; g < s; g++) {
      var E = A.readUint(t, a);
      a += 4, B.push(e(t, g, E, r));
    }
    return B;
  }
  var l = e(t, 0, 0, r);
  return [l];
};
Q.findTable = function(n, A, e) {
  for (var t = Q.B, r = t.readUshort(n, e + 4), i = e + 12, a = 0; a < r; a++) {
    var s = t.readASCII(n, i, 4);
    t.readUint(n, i + 4);
    var B = t.readUint(n, i + 8), g = t.readUint(n, i + 12);
    if (s == A) return [B, g];
    i += 16;
  }
  return null;
};
Q.T = {};
Q.B = {
  readFixed: function(n, A) {
    return (n[A] << 8 | n[A + 1]) + (n[A + 2] << 8 | n[A + 3]) / (256 * 256 + 4);
  },
  readF2dot14: function(n, A) {
    var e = Q.B.readShort(n, A);
    return e / 16384;
  },
  readInt: function(n, A) {
    var e = Q.B.t.uint8;
    return e[0] = n[A + 3], e[1] = n[A + 2], e[2] = n[A + 1], e[3] = n[A], Q.B.t.int32[0];
  },
  readInt8: function(n, A) {
    var e = Q.B.t.uint8;
    return e[0] = n[A], Q.B.t.int8[0];
  },
  readShort: function(n, A) {
    var e = Q.B.t.uint16;
    return e[0] = n[A] << 8 | n[A + 1], Q.B.t.int16[0];
  },
  readUshort: function(n, A) {
    return n[A] << 8 | n[A + 1];
  },
  readUshorts: function(n, A, e) {
    for (var t = [], r = 0; r < e; r++)
      t.push(Q.B.readUshort(n, A + r * 2));
    return t;
  },
  readUint: function(n, A) {
    var e = Q.B.t.uint8;
    return e[3] = n[A], e[2] = n[A + 1], e[1] = n[A + 2], e[0] = n[A + 3], Q.B.t.uint32[0];
  },
  readUint64: function(n, A) {
    return Q.B.readUint(n, A) * 4294967296 + Q.B.readUint(n, A + 4);
  },
  readASCII: function(n, A, e) {
    for (var t = "", r = 0; r < e; r++) t += String.fromCharCode(n[A + r]);
    return t;
  },
  readBytes: function(n, A, e) {
    for (var t = [], r = 0; r < e; r++) t.push(n[A + r]);
    return t;
  },
  t: function() {
    var n = new ArrayBuffer(8);
    return {
      buff: n,
      int8: new Int8Array(n),
      uint8: new Uint8Array(n),
      int16: new Int16Array(n),
      uint16: new Uint16Array(n),
      int32: new Int32Array(n),
      uint32: new Uint32Array(n)
    };
  }()
};
Q.T.cmap = {
  parseTab: function(n, A, e) {
    var t = { tables: [], ids: {}, off: A };
    n = new Uint8Array(n.buffer, A, e), A = 0;
    var r = Q.B, i = r.readUshort, a = Q.T.cmap;
    i(n, A), A += 2;
    var s = i(n, A);
    A += 2;
    for (var B = [], g = 0; g < s; g++) {
      var E = i(n, A);
      A += 2;
      var l = i(n, A);
      A += 2;
      var h = r.readUint(n, A);
      A += 4;
      var d = "p" + E + "e" + l, C = B.indexOf(h);
      if (C == -1) {
        C = t.tables.length;
        var c = {};
        B.push(h);
        var f = c.format = i(n, h);
        f == 4 ? c = a.parse4(n, h, c) : f == 12 && (c = a.parse12(n, h, c)), t.tables.push(c);
      }
      t.ids[d] != null && console.log("multiple tables for one platform+encoding: " + d), t.ids[d] = C;
    }
    return t;
  },
  parse4: function(n, A, e) {
    var t = Q.B, r = t.readUshort, i = t.readUshorts, a = A;
    A += 2;
    var s = r(n, A);
    A += 2, r(n, A), A += 2;
    var B = r(n, A);
    A += 2;
    var g = B >>> 1;
    e.searchRange = r(n, A), A += 2, e.entrySelector = r(n, A), A += 2, e.rangeShift = r(n, A), A += 2, e.endCount = i(n, A, g), A += g * 2, A += 2, e.startCount = i(n, A, g), A += g * 2, e.idDelta = [];
    for (var E = 0; E < g; E++)
      e.idDelta.push(t.readShort(n, A)), A += 2;
    return e.idRangeOffset = i(n, A, g), A += g * 2, e.glyphIdArray = i(n, A, a + s - A >> 1), e;
  },
  parse12: function(n, A, e) {
    var t = Q.B, r = t.readUint;
    A += 4, r(n, A), A += 4, r(n, A), A += 4;
    var i = r(n, A) * 3;
    A += 4;
    for (var a = e.groups = new Uint32Array(i), s = 0; s < i; s += 3)
      a[s] = r(n, A + (s << 2)), a[s + 1] = r(n, A + (s << 2) + 4), a[s + 2] = r(n, A + (s << 2) + 8);
    return e;
  }
};
Q.T.head = {
  parseTab: function(n, A, e) {
    var t = Q.B, r = {};
    return t.readFixed(n, A), A += 4, r.fontRevision = t.readFixed(n, A), A += 4, t.readUint(n, A), A += 4, t.readUint(n, A), A += 4, r.flags = t.readUshort(n, A), A += 2, r.unitsPerEm = t.readUshort(n, A), A += 2, r.created = t.readUint64(n, A), A += 8, r.modified = t.readUint64(n, A), A += 8, r.xMin = t.readShort(n, A), A += 2, r.yMin = t.readShort(n, A), A += 2, r.xMax = t.readShort(n, A), A += 2, r.yMax = t.readShort(n, A), A += 2, r.macStyle = t.readUshort(n, A), A += 2, r.lowestRecPPEM = t.readUshort(n, A), A += 2, r.fontDirectionHint = t.readShort(n, A), A += 2, r.indexToLocFormat = t.readShort(n, A), A += 2, r.glyphDataFormat = t.readShort(n, A), A += 2, r;
  }
};
Q.T.hhea = {
  parseTab: function(n, A, e) {
    var t = Q.B, r = {};
    t.readFixed(n, A), A += 4;
    for (var i = [
      "ascender",
      "descender",
      "lineGap",
      "advanceWidthMax",
      "minLeftSideBearing",
      "minRightSideBearing",
      "xMaxExtent",
      "caretSlopeRise",
      "caretSlopeRun",
      "caretOffset",
      "res0",
      "res1",
      "res2",
      "res3",
      "metricDataFormat",
      "numberOfHMetrics"
    ], a = 0; a < i.length; a++) {
      var s = i[a], B = s == "advanceWidthMax" || s == "numberOfHMetrics" ? t.readUshort : t.readShort;
      r[s] = B(n, A + a * 2);
    }
    return r;
  }
};
Q.T.hmtx = {
  parseTab: function(n, A, e, t) {
    for (var r = Q.B, i = [], a = [], s = t.maxp.numGlyphs, B = t.hhea.numberOfHMetrics, g = 0, E = 0, l = 0; l < B; )
      g = r.readUshort(n, A + (l << 2)), E = r.readShort(n, A + (l << 2) + 2), i.push(g), a.push(E), l++;
    for (; l < s; )
      i.push(g), a.push(E), l++;
    return { aWidth: i, lsBearing: a };
  }
};
Q.T.maxp = {
  parseTab: function(n, A, e) {
    var t = Q.B, r = t.readUshort, i = {};
    return t.readUint(n, A), A += 4, i.numGlyphs = r(n, A), A += 2, i;
  }
};
Q.T.loca = {
  parseTab: function(n, A, e, t) {
    var r = Q.B, i = [], a = t.head.indexToLocFormat, s = t.maxp.numGlyphs + 1;
    if (a == 0) for (var B = 0; B < s; B++) i.push(r.readUshort(n, A + (B << 1)) << 1);
    if (a == 1) for (var B = 0; B < s; B++) i.push(r.readUint(n, A + (B << 2)));
    return i;
  }
};
Q.T.glyf = {
  parseTab: function(n, A, e, t) {
    for (var r = [], i = t.maxp.numGlyphs, a = 0; a < i; a++) r.push(null);
    return r;
  },
  _parseGlyf: function(n, A) {
    var e = Q.B, t = n._data, r = n.loca;
    if (r[A] == r[A + 1]) return null;
    var i = Q.findTable(t, "glyf", n._offset)[0] + r[A], a = {};
    if (a.noc = e.readShort(t, i), i += 2, a.xMin = e.readShort(t, i), i += 2, a.yMin = e.readShort(t, i), i += 2, a.xMax = e.readShort(t, i), i += 2, a.yMax = e.readShort(t, i), i += 2, a.xMin >= a.xMax || a.yMin >= a.yMax) return null;
    if (a.noc > 0) {
      a.endPts = [];
      for (var s = 0; s < a.noc; s++)
        a.endPts.push(e.readUshort(t, i)), i += 2;
      var B = e.readUshort(t, i);
      if (i += 2, t.length - i < B) return null;
      a.instructions = e.readBytes(t, i, B), i += B;
      var g = a.endPts[a.noc - 1] + 1;
      a.flags = [];
      for (var s = 0; s < g; s++) {
        var E = t[i];
        if (i++, a.flags.push(E), E & 8) {
          var l = t[i];
          i++;
          for (var h = 0; h < l; h++)
            a.flags.push(E), s++;
        }
      }
      a.xs = [];
      for (var s = 0; s < g; s++) {
        var d = (a.flags[s] & 2) != 0, C = (a.flags[s] & 16) != 0;
        d ? (a.xs.push(C ? t[i] : -t[i]), i++) : C ? a.xs.push(0) : (a.xs.push(e.readShort(t, i)), i += 2);
      }
      a.ys = [];
      for (var s = 0; s < g; s++) {
        var d = (a.flags[s] & 4) != 0, C = (a.flags[s] & 32) != 0;
        d ? (a.ys.push(C ? t[i] : -t[i]), i++) : C ? a.ys.push(0) : (a.ys.push(e.readShort(t, i)), i += 2);
      }
      for (var c = 0, f = 0, s = 0; s < g; s++)
        c += a.xs[s], f += a.ys[s], a.xs[s] = c, a.ys[s] = f;
    } else
      a.parts = [];
    return a;
  }
};
typeof module < "u" && module.exports ? module.exports = Q : typeof window < "u" && (window.Typr = Q);
const Z = `data:font/truetype;charset=utf-8;base64,AAEAAAAKAIAAAwAgT1MvMs+QEyQAAAEoAAAAYGNtYXAg7yVJAAAFjAAACSBnbHlmuHLTdAAAErQAAGi0aGVhZFvXdUwAAACsAAAANmhoZWELAQUCAAAA5AAAACRobXR4BACDgAAAAYgAAAQEbG9jYQAy54AAAA6sAAAECG1heHABIgCCAAABCAAAACBuYW1lVs/OSgAAe2gAAAOicG9zdABpADQAAH8MAAAAIAABAAAAAQAAzOWHqV8PPPUAAAQAAAAAAHxiGCcAAAAAfGIYJwAAAAAEAAQAAAAACAACAAEAAAAAAAEAAAQAAAAAAAQAAAAAAAcAAAEAAAAAAAAAAAAAAAAAAAEBAAEAAAEBAIAAIAAAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAgQAAZAABQAEAgACAAAAAAACAAIAAAACAAAzAMwAAAAABAAAAAAAAACAAACLAABw4wAAAAAAAAAAWUFMLgBAACAmawQAAAAAAAQAAAAAAAFRAAAAAAMABAAAAAAgAAAEAAAABAAAAAQAAAAEAAGABAABAAQAAIAEAACABAAAgAQAAIAEAAGABAABAAQAAQAEAACABAABAAQAAIAEAACABAABAAQAAIAEAACABAAAgAQAAIAEAACABAAAgAQAAIAEAACABAAAgAQAAIAEAACABAABAAQAAIAEAAEABAAAgAQAAIAEAACABAAAgAQAAIAEAACABAAAgAQAAIAEAACABAAAgAQAAIAEAACABAAAgAQAAIAEAACABAAAgAQAAIAEAACABAAAgAQAAIAEAACABAAAgAQAAIAEAACABAAAgAQAAIAEAACABAAAgAQAAIAEAACABAABAAQAAIAEAAEABAAAgAQAAIAEAAEABAAAgAQAAIAEAACABAAAgAQAAIAEAAEABAAAgAQAAIAEAAGABAAAgAQAAIAEAAGABAAAgAQAAIAEAACABAAAgAQAAIAEAAEABAAAgAQAAIAEAACABAAAgAQAAIAEAACABAAAgAQAAIAEAACABAABgAQAAQAEAACABAAAAAQAAgAEAACABAAAgAQAAIAEAACABAACAAQAAAAEAAIABAABgAQAAgAEAACABAAAgAQAAAAEAACABAAAAAQAAAAEAAAABAAAAAQAAAAEAAIABAADAAQAAAAEAAAABAAAgAQAAYAEAAAABAAAAAQAAIAEAAAABAAAgAQAAIAEAACABAAAAAQAAIAEAAAABAAAAAQAAIAEAAGABAAAAAQAAAAEAAAABAAAAAQAAIAEAACABAAAAAQAAIAEAACABAAAAAQAAIAEAACABAAAgAQAAAAEAACABAAAAAQAAAAEAAEABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAACAAQAAIAEAAAABAAAAAQAAAAEAACABAABAAQAAQAEAAEABAABAAQAAIAEAACABAAAAAQAAAAEAAAABAABAAQAAAAEAACABAAAAAQAAAAEAAIABAAAgAQAAAAEAAAABAAAAAQAAAAEAAAABAABgAQAAAAEAAAABAABgAQAAAAEAAGABAABgAQAAYAEAAAABAAAAAQAAAAEAAAABAABgAQAAYAEAAAABAAAAAQAAAAEAAAABAABgAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAABgAQAAAAEAAGABAABgAQAAAAEAAAABAABgAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAYAEAAAABAAAAAQAAQAEAACABAAAAAQAAAAEAAAABAAAgAQAAIAEAACABAAAgAQAAIAEAAAABAABAAQAAIAEAACABAAAgAQAAIAEAAEABAAAgAQAAIAEAACABAAAgAQAAIAEAAEABAAAgAAAAAIAAAADAAAAFAADAAEAAASaAAQEhgAAAJ4AgAAGAB4AfgCjAKUApwCsALIAtwC9AL8AxwDJANEA1gDcAOIA7wD0APcA/AD/AZIDkwOYA6MDpgOpA7EDtQPAA8QDxiAiIDwgfyCnIZUhqCIaIh8iKSJIImEiZSMCIxAjISUAJQIlDCUQJRQlGCUcJSQlLCU0JTwlbCWAJYQliCWMJZMloSWsJbIluiW8JcQlyyXZJjwmQCZCJmAmYyZmJmv//wAAACAAoQClAKcAqgCwALUAugC/AMQAyQDRANYA3ADfAOQA8QD2APkA/wGSA5MDmAOjA6YDqQOxA7QDwAPDA8YgIiA8IH8gpyGQIagiGSIeIikiSCJhImQjAiMQIyAlACUCJQwlECUUJRglHCUkJSwlNCU8JVAlgCWEJYgljCWQJaAlrCWyJbolvCXEJcsl2CY6JkAmQiZgJmMmZSZq////4v/A/7//vv+8/7n/t/+1/7T/sP+v/6j/pP+f/53/nP+b/5r/mf+X/wX9Bf0B/Pf89fzz/Oz86vzg/N783eCC4GngJ+AA3xjfBt6W3pPeit5s3lTeUt223andmtu827vbstuv26zbqdum25/bmNuR24rbd9tk22HbXttb21jbTNtC2z3bNts12y7bKNsc2rzaudq42pvamdqY2pUAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQEhgAAAJ4AgAAGAB4AfgCjAKUApwCsALIAtwC9AL8AxwDJANEA1gDcAOIA7wD0APcA/AD/AZIDkwOYA6MDpgOpA7EDtQPAA8QDxiAiIDwgfyCnIZUhqCIaIh8iKSJIImEiZSMCIxAjISUAJQIlDCUQJRQlGCUcJSQlLCU0JTwlbCWAJYQliCWMJZMloSWsJbIluiW8JcQlyyXZJjwmQCZCJmAmYyZmJmv//wAAACAAoQClAKcAqgCwALUAugC/AMQAyQDRANYA3ADfAOQA8QD2APkA/wGSA5MDmAOjA6YDqQOxA7QDwAPDA8YgIiA8IH8gpyGQIagiGSIeIikiSCJhImQjAiMQIyAlACUCJQwlECUUJRglHCUkJSwlNCU8JVAlgCWEJYgljCWQJaAlrCWyJbolvCXEJcsl2CY6JkAmQiZgJmMmZSZq////4v/A/7//vv+8/7n/t/+1/7T/sP+v/6j/pP+f/53/nP+b/5r/mf+X/wX9Bf0B/Pf89fzz/Oz86vzg/N783eCC4GngJ+AA3xjfBt6W3pPeit5s3lTeUt223andmtu827vbstuv26zbqdum25/bmNuR24rbd9tk22HbXttb21jbTNtC2z3bNts12y7bKNsc2rzaudq42pvamdqY2pUAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAAABwAAABIAAAAegAAALwAAADuAAAA9wAAARQAAAExAAABWgAAAW0AAAF7AAABhAAAAY0AAAGvAAAB0gAAAecAAAIOAAACNQAAAk8AAAJsAAACjgAAAqYAAALOAAAC5gAAAvQAAAMHAAADLgAAAzwAAANjAAADhQAAA6UAAAPCAAAD4AAAA/0AAAQaAAAEPAAABEwAAARrAAAEfgAABJEAAASpAAAE0AAABNsAAAT4AAAFFQAABS0AAAVDAAAFZQAABYcAAAWuAAAFvAAABc8AAAXnAAAGBAAABisAAAZDAAAGZQAABnMAAAaVAAAGowAABsUAAAbOAAAG3gAABvYAAAcMAAAHKQAABz8AAAdaAAAHbQAAB4oAAAedAAAHqwAAB8MAAAfgAAAH7gAACAsAAAgjAAAIOwAACFEAAAhsAAAIfAAACJkAAAi2AAAIzgAACOYAAAkDAAAJKgAACUIAAAlfAAAJfAAACYUAAAmiAAAJugAACdcAAAngAAAKBwAACi4AAApgAAAKeQAACokAAAq4AAAKwQAACs8AAArYAAAK8QAACw4AAAshAAALSAAAC1gAAAt1AAALjQAAC5sAAAu0AAALzQAAC9YAAAvhAAAL6gAAC/4AAAwRAAAMJAAADDQAAAxHAAAMUgAADGoAAAyCAAAMlwAADKUAAAy/AAAM0gAADN0AAAz8AAANDwAADSkAAA0yAAANTAAADVUAAA1jAAANfAAADYcAAA2VAAANqQAADcIAAA3mAAAN7wAADg4AAA4XAAAOQQAADloAAA5qAAAOcwAADoYAAA6PAAAOogAADrIAAA7FAAAPCwAADxsAAA8uAAAPRwAAD1AAAA+HAAAPoAAAD6kAAA/CAAAP3wAAD/wAABAZAAAQNgAAEE4AABBfAAAQlQAAEJ4AABCxAAAQugAAEOEAABEnAAARUwAAEWYAABF+AAARlgAAEbgAABJrAAASfgAAEpEAABKpAAASwQAAEswAABLcAAATCAAAExMAABMrAAATQwAAE1sAABNzAAATmgAAE8YAABPeAAAT5wAAE/AAABQSAAAUKgAAFEIAABRaAAAUYwAAFGwAABSOAAAUngAAFLsAABTYAAAU/wAAFSEAABVNAAAVZQAAFX0AABWVAAAVngAAFacAABXTAAAWBAAAFg0AABYvAAAWOgAAFkUAABZxAAAWhAAAFpIAABagAAAWrgAAFrwAABbVAAAW7QAAFxkAABd0AAAXzwAAF/wAABgUAAAYJQAAGC4AABhBAAAYXgAAGHEAABiYAAAYvAAAGOAAABkYAAAZPwAAGWYAABmNAAAZtAAAGdYAABn9AAAaEAAAGi0AAIBgACAAoAEAAADAAcAAAEBAQEBAQEBAYABAAAA/wAAAAEAAAD/AAQAAAD+AAAA/4AAAP8AAAAAAgEAAoADgAQAAAMABwAAAQEBAQEBAQEBAAEAAAD/AAGAAQAAAP8ABAAAAP6AAAABgAAA/oAAAAACAIAAgAQAA4AAGwAfAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAAQAAAACAAAABAAAAAIAAAP+AAAAAgAAA/4AAAP8AAAD/gAAA/wAAAP+AAAAAgAAA/4AAAACAAQAAAACAAAADgAAA/4AAAACAAAD/gAAA/4AAAP8AAAD/gAAA/4AAAACAAAD/gAAAAIAAAACAAAABAAAAAIAAAP+A/wAAAAEAAAMAgACABAAEAAAbAB8AIwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAgAAgAAAAQAAAP8AAAABAAAAAIAAAP+AAAD/AAAA/4AAAP8AAAABAAAA/wAAAP+AAAAAgAAAAQD/gAAAAIAAAACAAAAAgAAABAAAAP+AAAD/gAAA/4AAAP+AAAD/gAAA/4AAAP+AAAAAgAAAAIAAAACAAAAAgAAAAIAAAACAAAD/gP+AAAAAgP8A/4AAAACAAAAABQCAAIAEAAOAAAUAHQAjACkALwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQABAAAA/4AAAP+AAgABAAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/AAAAAIAAAACAAAAAgAAAAIAAAACA/YAAgAAAAIAAAP8AAoABAAAA/4AAAP+A/4AAgAAAAIAAAP8AA4AAAP8AAAAAgAAAAIAAAP+AAAD/gAAA/4AAAP+AAAD/gAAA/4AAAACAAAAAgAAAAIAAAACAAAAAgAAAAAAAAP+AAAD/gAAAAAAAAP8AAAAAgAAAAAAAAP+AAAD/gAAAAAAAAwCAAIAEAAQAABcAHQAjAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAIAAAAAgAAA/4AAAACAAAAAgAAA/4AAAACAAAD9AAAA/4AAAACAAAD/gAAAAIAAgAAAAIAAAACAAAD/AAAAAQAAAP+AAAAEAAAA/4AAAP8AAAD/gAAAAIAAAP8AAAD/gAAA/4AAAACAAAABAAAAAIAAAAEAAAAAAP+AAAD/gAAAAQD+gP8AAAAAgAAAAIAAAAABAYACgAKABAAAAwAAAQEBAQGAAQAAAP8ABAAAAP6AAAAAAAABAQAAgAMABAAAEwAAAQEBAQEBAQEBAQEBAQEBAQEBAQECAAEAAAD/gAAA/4AAAACAAAAAgAAA/wAAAP+AAAD/gAAAAIAAAACABAAAAP+AAAD/gAAA/oAAAP+AAAD/gAAAAIAAAACAAAABgAAAAIAAAAAAAAEBAACAAwAEAAATAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEAAQAAAACAAAAAgAAA/4AAAP+AAAD/AAAAAIAAAACAAAD/gAAA/4AEAAAA/4AAAP+AAAD+gAAA/4AAAP+AAAAAgAAAAIAAAAGAAAAAgAAAAAAABQCAAYADgAQAAAMABwATABcAGwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAAIAAAP+AAYAAgAAA/4D/AAEAAAABAAAA/wAAAP8AAAD/AAAAAQD/gACAAAD/gAGAAIAAAP+ABAAAAP+AAAAAgAAA/4AAAAAAAAD/gAAA/4AAAP+AAAAAgAAAAIAAAP8AAAD/gAAAAIAAAP+AAAAAAAABAQAAgAOAAwAACwAAAQEBAQEBAQEBAQEBAgAAgAAAAQAAAP8AAAD/gAAA/wAAAAEAAwAAAP8AAAD/gAAA/wAAAAEAAAAAgAAAAAAAAQCAAAACAAGAAAcAAAEBAQEBAQEBAQABAAAA/4AAAP8AAAAAgAGAAAD/AAAA/4AAAACAAAAAAAABAIABgAOAAgAAAwAAAQEBAQCAAwAAAP0AAgAAAP+AAAAAAAABAQAAgAIAAYAAAwAAAQEBAQEAAQAAAP8AAYAAAP8AAAAAAAABAIAAgAQAA4AAFwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAwABAAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/AAAAAIAAAACAAAAAgAAAAIAAAACAA4AAAP+AAAD/gAAA/4AAAP+AAAD/gAAA/4AAAACAAAAAgAAAAIAAAACAAAAAgAAAAAAAAwCAAIADgAQAAAsAEQAXAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAIAAAAAgAAA/4AAAP4AAAD/gAAAAIAAgAAAAIAAAACAAAD/gAAA/4AAAAEAAAAEAAAA/4AAAP2AAAD/gAAAAIAAAAKAAAAAAP8AAAAAgAAAAID/AP+AAAD/AAAAAYAAAAABAIAAgAOABAAADQAAAQEBAQEBAQEBAQEBAQEBgAEAAAABAAAA/QAAAAEAAAD/AAAAAIAAAACABAAAAP0AAAD/gAAAAIAAAAGAAAAAgAAAAIAAAAABAIAAgAOABAAAGwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAAgAAAACAAAD/gAAA/4AAAP+AAAABgAAA/QAAAACAAAAAgAAAAIAAAACAAAD/AAAA/wAAAACABAAAAP+AAAD/AAAA/4AAAP+AAAD/gAAA/4AAAACAAAAAgAAAAIAAAACAAAABAAAA/wAAAAEAAAAAAAABAIAAgAOABAAAGwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAAgAAAACAAAD/gAAAAIAAAP+AAAD+AAAA/4AAAAEAAAABAAAA/wAAAAEAAAD/AAAA/wAAAACABAAAAP+AAAD/AAAA/4AAAP8AAAD/gAAAAIAAAACAAAD/gAAAAQAAAACAAAABAAAA/4AAAACAAAAAAAABAIAAgAOABAAAEQAAAQEBAQEBAQEBAQEBAQEBAQEBAYABAAAA/4AAAP+AAAABAAAAAQAAAP8AAAD+AAAAAIAAAACABAAAAP+AAAD/gAAA/wAAAAEAAAD9gAAAAQAAAAGAAAAAgAAAAAEAgACAA4AEAAATAAABAQEBAQEBAQEBAQEBAQEBAQEBAQCAAwAAAP4AAAABgAAAAIAAAP+AAAD+AAAA/4AAAAEAAAABAAAA/gAEAAAA/4AAAP8AAAD/gAAA/wAAAP+AAAAAgAAAAIAAAP+AAAABAAAAAAAAAgCAAIADgAQAABMAFwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQACAAAAAIAAAP8AAAD/AAAAAYAAAACAAAD/gAAA/gAAAP+AAAAAgACAAAABAAAABAAAAP+AAAD/gAAAAIAAAP8AAAD/gAAA/wAAAP+AAAAAgAAAAoAAAP6A/wAAAAEAAAEAgACAA4AEAAAPAAABAQEBAQEBAQEBAQEBAQEBAIADAAAA/4AAAP+AAAD/AAAAAIAAAACAAAD+gAAA/4AEAAAA/oAAAP+AAAD+gAAAAYAAAACAAAABAAAA/4AAAAAAAAMAgACAA4AEAAATABcAGwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAAgAAAACAAAD/gAAAAIAAAP+AAAD+AAAA/4AAAACAAAD/gAAAAIAAgAAAAQAAAP8AAAABAAAABAAAAP+AAAD/AAAA/4AAAP8AAAD/gAAAAIAAAAEAAAAAgAAAAQAAAAAA/wAAAAEA/oD/AAAAAQAAAAACAIAAgAOABAAACwAPAAABAQEBAQEBAQEBAQEBAQEBAQACAAAAAIAAAP8AAAD+gAAA/4AAAACAAIAAAAEAAAAEAAAA/4AAAP0AAAABAAAAAIAAAAGAAAAAAP6AAAABgAACAQABAAIAA4AAAwAHAAABAQEBAQEBAQEAAQAAAP8AAAABAAAA/wADgAAA/wAAAP+AAAD/AAAAAAIAgACAAgADgAADAAsAAAEBAQEBAQEBAQEBAQEAAQAAAP8AAAABAAAA/4AAAP8AAAAAgAOAAAD/AAAA/4AAAP8AAAD/gAAAAIAAAAABAQAAgAOABAAAGwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQKAAQAAAP+AAAD/gAAA/4AAAACAAAAAgAAAAIAAAP8AAAD/gAAA/4AAAP+AAAAAgAAAAIAAAACABAAAAP+AAAD/gAAA/4AAAP+AAAD/gAAA/4AAAP+AAAAAgAAAAIAAAACAAAAAgAAAAIAAAACAAAAAAAACAIABgAOAAwAAAwAHAAABAQEBAQEBAQCAAwAAAP0AAAADAAAA/QADAAAA/4AAAP+AAAD/gAAAAAEAgACAAwAEAAAbAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAIABAAAAAIAAAACAAAAAgAAA/4AAAP+AAAD/gAAA/wAAAACAAAAAgAAAAIAAAP+AAAD/gAAA/4AEAAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/gAAA/4AAAACAAAAAgAAAAIAAAACAAAAAgAAAAIAAAAAAAAIAgACAA4AEAAATABcAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAAgAAAACAAAD/gAAA/4AAAP8AAAAAgAAAAIAAAP8AAAD/AAAAAIAAgAEAAAD/AAQAAAD/gAAA/4AAAP+AAAD/gAAAAIAAAACAAAAAgAAA/4AAAACAAAD+AAAA/wAAAAACAIAAgAOABAAAEQAVAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQACAAAAAIAAAP6AAAAAgAAA/wAAAAGAAAD+AAAA/4AAAACAAgAAgAAA/4AEAAAA/4AAAP6AAAABAAAAAIAAAP2AAAD/gAAAAIAAAAKAAAD+AAAA/4AAAAAAAAIAgACAA4AEAAAPABMAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAYABAAAAAIAAAACAAAD/AAAA/wAAAP8AAAAAgAAAAIAAAAAAAQAAAAQAAAD/gAAA/4AAAP2AAAABAAAA/wAAAAKAAAAAgAAA/4D/AAAAAQAAAwCAAIADgAQAAAsADwATAAABAQEBAQEBAQEBAQEBAQEBAQEBAQCAAoAAAACAAAD/gAAAAIAAAP+AAAD9gAEAAAABAAAA/wAAAAEAAAAEAAAA/4AAAP8AAAD/gAAA/wAAAP+AAAADAP8AAAABAP6A/wAAAAEAAAAAAQCAAIADgAQAABMAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQACAAAAAIAAAP8AAAD/AAAAAQAAAAEAAAD/gAAA/gAAAP+AAAAAgAQAAAD/gAAA/4AAAACAAAD9gAAAAIAAAP+AAAD/gAAAAIAAAAKAAAAAAAACAIAAgAOABAAACwATAAABAQEBAQEBAQEBAQEBAQEBAQEBAQCAAgAAAACAAAAAgAAA/4AAAP+AAAD+AAEAAAAAgAAAAIAAAP+AAAAEAAAA/4AAAP+AAAD+gAAA/4AAAP+AAAADAP2AAAAAgAAAAYAAAACAAAEAgACAA4AEAAAXAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAIAAAAAgAAA/wAAAP8AAAABAAAA/wAAAAEAAAABAAAA/4AAAP4AAAD/gAAAAIAEAAAA/4AAAP+AAAAAgAAA/wAAAP+AAAD/AAAAAIAAAP+AAAD/gAAAAIAAAAKAAAAAAAABAIAAgAOABAAACQAAAQEBAQEBAQEBAQCAAwAAAP4AAAABAAAA/wAAAP8ABAAAAP+AAAD/AAAA/4AAAP6AAAAAAQCAAIADgAQAABUAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAIAAAAAgAAA/wAAAP8AAAABAAAA/4AAAAGAAAD/gAAA/gAAAP+AAAAAgAQAAAD/gAAA/4AAAACAAAD9gAAAAQAAAACAAAD+gAAA/4AAAACAAAACgAAAAAEAgACAA4AEAAALAAABAQEBAQEBAQEBAQEAgAEAAAABAAAAAQAAAP8AAAD/AAAA/wAEAAAA/gAAAAIAAAD8gAAAAQAAAP8AAAAAAAABAIAAgAOABAAACwAAAQEBAQEBAQEBAQEBAIADAAAA/wAAAAEAAAD9AAAAAQAAAP8ABAAAAP+AAAD9gAAA/4AAAACAAAACgAAAAAAAAQCAAIAEAAQAAA8AAAEBAQEBAQEBAQEBAQEBAQEBAAMAAAD/gAAA/4AAAP4AAAD/gAAAAQAAAAEAAAD+gAQAAAD/gAAA/YAAAP+AAAAAgAAAAQAAAP8AAAACgAAAAAAAAQCAAIADgAQAABsAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAgAEAAAAAgAAAAIAAAAEAAAD/gAAA/4AAAP+AAAAAgAAAAIAAAACAAAD/AAAA/4AAAP+AAAD/AAQAAAD/AAAAAIAAAACAAAD/gAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/gAAAAIAAAACAAAD/AAAAAAAAAQCAAIADgAQAAAUAAAEBAQEBAQCAAQAAAAIAAAD9AAQAAAD9AAAA/4AAAAABAIAAgAQABAAAEwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEAgAEAAAAAgAAAAIAAAACAAAABAAAA/wAAAP+AAAD/gAAA/4AAAP8ABAAAAP+AAAD/gAAAAIAAAACAAAD8gAAAAgAAAP+AAAAAgAAA/gAAAAAAAAEAgACABAAEAAATAAABAQEBAQEBAQEBAQEBAQEBAQEBAQCAAQAAAACAAAAAgAAAAIAAAAEAAAD/AAAA/4AAAP+AAAD/gAAA/wAEAAAA/4AAAP+AAAD/gAAAAYAAAPyAAAABAAAAAIAAAACAAAD+AAAAAAAAAgCAAIADgAQAAAsADwAAAQEBAQEBAQEBAQEBAQEBAQEAAgAAAACAAAD/gAAA/gAAAP+AAAAAgACAAAABAAAABAAAAP+AAAD9gAAA/4AAAACAAAACgAAAAAD9gAAAAoAAAgCAAIADgAQAAAkADQAAAQEBAQEBAQEBAQEBAQEAgAKAAAAAgAAA/4AAAP6AAAD/AAEAAAABAAAABAAAAP+AAAD+gAAA/4AAAP8AAAADAP6AAAABgAAAAAIAgACABAAEAAAPABcAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAAgAAAACAAAAAgAAA/4AAAP+AAAD+AAAA/4AAAACAAIAAAAEAAAD/gAAAAIAAAAQAAAD/gAAA/gAAAP8AAAAAgAAA/4AAAACAAAACgAAAAAD9gAAAAIAAAACAAAABgAACAIAAgAOABAAAEwAXAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAgAKAAAAAgAAA/4AAAP+AAAAAgAAAAIAAAP8AAAD/gAAA/4AAAP8AAQAAAAEAAAAEAAAA/4AAAP8AAAD/gAAA/4AAAP+AAAD/gAAAAIAAAACAAAD/AAAAAwD/AAAAAQAAAQCAAIADgAQAABsAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAIAAAAAgAAA/wAAAP8AAAABgAAAAIAAAP+AAAD+AAAA/4AAAAEAAAABAAAA/oAAAP+AAAAAgAQAAAD/gAAA/4AAAACAAAD/AAAA/4AAAP8AAAD/gAAAAIAAAACAAAD/gAAAAQAAAACAAAABAAAAAAAAAQCAAIADgAQAAAcAAAEBAQEBAQEBAIADAAAA/wAAAP8AAAD/AAQAAAD/gAAA/QAAAAMAAAAAAAABAIAAgAOABAAACwAAAQEBAQEBAQEBAQEBAIABAAAAAQAAAAEAAAD/gAAA/gAAAP+ABAAAAP0AAAADAAAA/QAAAP+AAAAAgAAAAAAAAQCAAIADgAQAAA8AAAEBAQEBAQEBAQEBAQEBAQEAgAEAAAABAAAAAQAAAP+AAAD/gAAA/wAAAP+AAAD/gAQAAAD+AAAAAgAAAP4AAAD/AAAA/4AAAACAAAABAAAAAAAAAQCAAIAEAAQAABMAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAIABAAAAAIAAAACAAAAAgAAAAQAAAP8AAAD/gAAA/4AAAP+AAAD/AAQAAAD+AAAAAIAAAP+AAAACAAAA/IAAAACAAAAAgAAA/4AAAP+AAAAAAAABAIAAgAOABAAAGwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQCAAQAAAAEAAAABAAAA/4AAAP+AAAAAgAAAAIAAAP8AAAD/AAAA/wAAAACAAAAAgAAA/4AAAP+ABAAAAP8AAAABAAAA/wAAAP+AAAD/gAAA/4AAAP8AAAABAAAA/wAAAAEAAAAAgAAAAIAAAACAAAAAAAABAIAAgAOABAAADwAAAQEBAQEBAQEBAQEBAQEBAQCAAQAAAAEAAAABAAAA/4AAAP+AAAD/AAAA/4AAAP+ABAAAAP6AAAABgAAA/oAAAP+AAAD+gAAAAYAAAACAAAAAAAABAIAAgAOABAAAFwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAIADAAAA/4AAAP+AAAD/gAAA/4AAAAIAAAD9AAAAAIAAAACAAAAAgAAAAIAAAP4ABAAAAP8AAAD/gAAA/4AAAP+AAAD/gAAA/4AAAAEAAAAAgAAAAIAAAACAAAAAgAAAAAAAAQEAAIADAAQAAAcAAAEBAQEBAQEBAQACAAAA/wAAAAEAAAD+AAQAAAD/gAAA/YAAAP+AAAAAAAABAIAAgAQAA4AAFwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAIABAAAAAIAAAACAAAAAgAAAAIAAAACAAAD/AAAA/4AAAP+AAAD/gAAA/4AAAP+AA4AAAP+AAAD/gAAA/4AAAP+AAAD/gAAA/4AAAACAAAAAgAAAAIAAAACAAAAAgAAAAAAAAQEAAIADAAQAAAcAAAEBAQEBAQEBAQACAAAA/gAAAAEAAAD/AAQAAAD8gAAAAIAAAAKAAAAAAAABAIACAAQABAAAFwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAgAAgAAAAIAAAACAAAAAgAAA/wAAAP+AAAD/gAAA/4AAAP8AAAAAgAAAAIAAAACABAAAAP+AAAD/gAAA/4AAAP+AAAAAgAAAAIAAAP+AAAD/gAAAAIAAAACAAAAAgAAAAAAAAQCAAIADgAEAAAMAAAEBAQEAgAMAAAD9AAEAAAD/gAAAAAAAAQEAAoACgAQAAAkAAAEBAQEBAQEBAQEBAAEAAAAAgAAA/4AAAP+AAAD/gAQAAAD/gAAA/wAAAACAAAAAgAAAAAEAgACAA4ADAAAPAAABAQEBAQEBAQEBAQEBAQEBAQACgAAA/4AAAP+AAAD/AAAAAQAAAP6AAAD/gAAAAIADAAAA/YAAAACAAAABgAAA/oAAAP+AAAAAgAAAAYAAAAAAAAIAgACAA4AEAAAJAA0AAAEBAQEBAQEBAQEBAQEBAIABAAAAAYAAAACAAAD/gAAA/YABAAAAAQAAAAQAAAD/AAAA/4AAAP6AAAD/gAAAAgD+gAAAAYAAAAABAIAAgAOAAwAAEwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAIAAAAAgAAA/wAAAP8AAAABAAAAAQAAAP+AAAD+AAAA/4AAAACAAwAAAP+AAAD/gAAAAIAAAP6AAAAAgAAA/4AAAP+AAAAAgAAAAYAAAAAAAAIAgACAA4AEAAAJAA0AAAEBAQEBAQEBAQEBAQEBAoABAAAA/YAAAP+AAAAAgAAAAYD/AAAAAQAAAAQAAAD8gAAAAIAAAAGAAAAAgAAA/4D+gAAAAYAAAAACAIAAgAOAAwAADQARAAABAQEBAQEBAQEBAQEBAQEBAQEBAAIAAAAAgAAA/gAAAAGAAAD+AAAA/4AAAACAAIAAAAEAAAADAAAA/4AAAP8AAAD/gAAA/4AAAACAAAABgAAAAAD/gAAAAIAAAAABAQAAgAOAA4AACwAAAQEBAQEBAQEBAQEBAYACAAAA/oAAAAEAAAD/AAAA/wAAAACAA4AAAP+AAAD/AAAA/4AAAP8AAAACgAAAAAAAAgCAAIADgAOAAA8AEwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAIAAAAAgAAA/4AAAP4AAAABgAAA/oAAAP+AAAAAgACAAAABAAAAA4AAAP+AAAD+AAAA/4AAAACAAAAAgAAAAIAAAAEAAAAAAP8AAAABAAABAIAAgAOABAAACwAAAQEBAQEBAQEBAQEBAIABAAAAAYAAAACAAAD/AAAA/wAAAP8ABAAAAP8AAAD/gAAA/gAAAAIAAAD+AAAAAAAAAgGAAIACgAQAAAMABwAAAQEBAQEBAQEBgAEAAAD/AAAAAQAAAP8ABAAAAP+AAAD/gAAA/YAAAAACAIAAgAOABAAAAwAPAAABAQEBAQEBAQEBAQEBAQEBAoABAAAA/wAAAAEAAAD/gAAA/gAAAP+AAAABAAAAAQAEAAAA/4AAAP+AAAD+AAAA/4AAAACAAAABAAAA/wAAAAABAIAAgAOAA4AAEwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEAgAEAAAAAgAAAAQAAAP+AAAAAgAAAAIAAAP8AAAD/gAAA/4AAAP8AA4AAAP8AAAAAgAAA/4AAAP8AAAD/gAAA/4AAAACAAAAAgAAA/wAAAAAAAAEBgACAAwAEAAAHAAABAQEBAQEBAQGAAQAAAACAAAD/AAAA/4AEAAAA/QAAAP+AAAAAgAAAAAAAAQCAAIAEAAMAABMAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQABAAAAAIAAAAEAAAAAgAAA/wAAAP+AAAD/gAAA/4AAAP8AAAAAgAMAAAD/gAAAAIAAAP+AAAD+AAAAAYAAAP+AAAAAgAAA/oAAAAIAAAAAAAABAIAAgAOAAwAADwAAAQEBAQEBAQEBAQEBAQEBAQCAAQAAAACAAAABAAAAAIAAAP8AAAD/gAAA/4AAAP8AAwAAAP+AAAAAgAAA/4AAAP4AAAABgAAA/4AAAP8AAAAAAAACAIAAgAOAAwAACwAPAAABAQEBAQEBAQEBAQEBAQEBAQACAAAAAIAAAP+AAAD+AAAA/4AAAACAAIAAAAEAAAADAAAA/4AAAP6AAAD/gAAAAIAAAAGAAAAAAP6AAAABgAACAIAAgAOAAwAACQANAAABAQEBAQEBAQEBAQEBAQCAAoAAAACAAAD/gAAA/oAAAP8AAQAAAAEAAAADAAAA/4AAAP+AAAD/gAAA/wAAAAIA/4AAAACAAAAAAgCAAIAEAAMAAA0AEQAAAQEBAQEBAQEBAQEBAQEBAQEBAQACgAAAAIAAAP+AAAD/AAAA/oAAAP+AAAAAgACAAAABAAAAAwAAAP6AAAD/gAAA/4AAAAEAAAAAgAAAAIAAAAAA/4AAAACAAAAAAQEAAIADgAMAAAkAAAEBAQEBAQEBAQEBAAIAAAAAgAAA/wAAAP+AAAD/AAMAAAD/gAAA/wAAAAEAAAD+AAAAAAEAgACABAADAAATAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEAAoAAAP6AAAABgAAAAIAAAP+AAAD9AAAAAgAAAP6AAAD/gAAAAIADAAAA/4AAAP+AAAD/gAAA/4AAAP+AAAAAgAAAAIAAAACAAAAAgAAAAAAAAQCAAIADgAOAABMAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQABAAAAAQAAAP8AAAAAgAAAAQAAAP+AAAD+gAAA/4AAAP+AAAAAgAOAAAD/gAAA/4AAAP6AAAAAgAAA/4AAAP+AAAAAgAAAAYAAAACAAAAAAAABAIAAgAOAAwAADwAAAQEBAQEBAQEBAQEBAQEBAQCAAQAAAACAAAAAgAAAAQAAAP+AAAD/gAAA/oAAAP+AAwAAAP4AAAAAgAAAAYAAAP2AAAAAgAAA/4AAAACAAAAAAAABAIAAgAOAAwAADwAAAQEBAQEBAQEBAQEBAQEBAQCAAQAAAAEAAAABAAAA/4AAAP+AAAD/AAAA/4AAAP+AAwAAAP6AAAABgAAA/oAAAP+AAAD/gAAAAIAAAACAAAAAAAABAIAAgAQAAwAAEwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEAgAEAAAAAgAAAAIAAAACAAAABAAAA/4AAAP8AAAD/gAAA/wAAAP+AAwAAAP6AAAAAgAAA/4AAAAGAAAD+AAAA/4AAAACAAAD/gAAAAIAAAAAAAAEAgACAA4ADAAAbAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAIABAAAAAQAAAAEAAAD/gAAA/4AAAACAAAAAgAAA/wAAAP8AAAD/AAAAAIAAAACAAAD/gAAA/4ADAAAA/4AAAACAAAD/gAAA/4AAAP+AAAD/gAAA/4AAAACAAAD/gAAAAIAAAACAAAAAgAAAAIAAAAAAAAEAgACAA4ADAAAPAAABAQEBAQEBAQEBAQEBAQEBAIABAAAAAQAAAAEAAAD/gAAA/gAAAAGAAAD+gAAA/4ADAAAA/wAAAAEAAAD+AAAA/4AAAACAAAAAgAAAAIAAAAAAAAEAgACAA4ADAAATAAABAQEBAQEBAQEBAQEBAQEBAQEBAQCAAwAAAP+AAAD/gAAA/4AAAAGAAAD9AAAAAIAAAACAAAAAgAAA/oADAAAA/4AAAP+AAAD/gAAA/4AAAP+AAAAAgAAAAIAAAACAAAAAgAAAAAAAAQCAAIADAAQAABMAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAYABgAAA/wAAAP+AAAAAgAAAAQAAAP6AAAD/gAAA/4AAAACAAAAAgAQAAAD/gAAA/wAAAP+AAAD/AAAA/4AAAACAAAABAAAAAIAAAAEAAAAAAAABAYAAgAKABAAAAwAAAQEBAQGAAQAAAP8ABAAAAPyAAAAAAAABAQAAgAOABAAAEwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAGAAAAAgAAAAIAAAP+AAAD/gAAA/oAAAAEAAAAAgAAA/4AAAP8ABAAAAP+AAAD/AAAA/4AAAP8AAAD/gAAAAIAAAAEAAAAAgAAAAQAAAAAAAAEAgAGAA4ADAAAPAAABAQEBAQEBAQEBAQEBAQEBAQABAAAAAQAAAACAAAD/gAAA/wAAAP8AAAD/gAAAAIADAAAA/4AAAACAAAD/AAAA/4AAAACAAAD/gAAAAQAAAAAAAAEAAAAABAAEAAATAAABAQEBAQEBAQEBAQEBAQEBAQEBAQAAAYAAAAEAAAAAgAAAAIAAAACAAAD/AAAA/4AAAP+AAAD/AAAA/wAEAAAA/4AAAP+AAAD/gAAA/wAAAP6AAAABAAAAAQAAAACAAAAAgAAAAAAAAQIAAAAEAAQAAAMAAAEBAQECAAIAAAD+AAQAAAD8AAAAAAAAAgCAAIADgAQAABcAGwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQGAAYAAAP8AAAABAAAA/4AAAP+AAAABgAAA/QAAAACAAAAAgAAA/wAAAACAAAAAgAGAAIAAAP+ABAAAAP+AAAD/AAAA/4AAAP+AAAD/gAAA/4AAAACAAAAAgAAAAIAAAACAAAABAAAAAAAAAP+AAAAAAQCAAIADgAQAABsAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAgAEAAAABAAAAAQAAAP+AAAAAgAAA/wAAAAEAAAD/AAAA/wAAAP8AAAABAAAA/wAAAACAAAD/gAQAAAD+gAAAAYAAAP8AAAD/gAAA/4AAAP+AAAD/gAAA/4AAAACAAAAAgAAAAIAAAACAAAAAgAAAAAAABACAAIAEAAQAABcAGwAfACMAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAAoAAAP4AAAABgAAAAIAAAACAAAD/gAAA/YAAAAIAAAD+gAAA/4AAAP+AAAAAgAEAAAAAgAAAAQAAgAAA/4D9AACAAAD/gAQAAAD/gAAA/4AAAP+AAAD/gAAA/wAAAP+AAAAAgAAAAIAAAACAAAAAgAAAAQAAAP8A/4AAAACAAQAAAP+AAAD+gAAA/4AAAAAEAIAAgAQAA4AAAwAHAAsADwAAAQEBAQEBAQEBAQEBAQEBAQCAAIAAAP+AAQAAgAAA/4ABAACAAAD/gAEAAIAAAP+AA4AAAP0AAAADAAAA/QAAAAMAAAD9AAAAAwAAAP0AAAAAAQIAAAAEAAQAAAkAAAEBAQEBAQEBAQEDgACAAAD+AAAAAIAAAACAAAAAgAQAAAD8AAAAAQAAAAEAAAABAAAAAAgAAAAABAAEAAADAAcACwAPABMAFwAbAB8AAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAABAAAA/wACAAEAAAD/AP8AAQAAAP8AAgABAAAA/wD9AAEAAAD/AAIAAQAAAP8A/wABAAAA/wACAAEAAAD/AAQAAAD/AAAAAQAAAP8AAAAAAAAA/wAAAAEAAAD/AAAAAAAAAP8AAAABAAAA/wAAAAAAAAD/AAAAAQAAAP8AAAAAAQIAAAADAAQAAAMAAAEBAQECAAEAAAD/AAQAAAD8AAAAAAAAAgGAAIACgAQAAAMABwAAAQEBAQEBAQEBgAEAAAD/AAAAAQAAAP8ABAAAAP6AAAD/gAAA/oAAAAABAgAAAAQAAgAAAwAAAQEBAQIAAgAAAP4AAgAAAP4AAAAAAAAEAIAAAAQABAAAAwAHAAsADwAAAQEBAQEBAQEBAQEBAQEBAQCAAIAAAP+AAQAAgAAA/4ABAACAAAD/gAEAAIAAAP+ABAAAAPwAAAAEAAAA/AAAAAQAAAD8AAAABAAAAPwAAAAAAQCAAIADgAOAABMAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAoABAAAA/oAAAP+AAAD/gAAA/4AAAACAAAAAgAAAAIAAAAEAAAD/gAOAAAD+AAAA/wAAAACAAAAAgAAAAIAAAACAAAAAgAAA/wAAAAEAAAAAAAABAAAAAAQABAAACwAAAQEBAQEBAQEBAQEBAAAEAAAA/gAAAP+AAAD/gAAA/4AAAP+ABAAAAPwAAAAAgAAAAIAAAACAAAAAgAAAAAAAAQCAAIAEAAOAABsAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAgACAAAAAgAAAAIAAAACAAAAAgAAAAIAAAACAAAD/gAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/gAOAAAD/gAAAAIAAAP8AAAABAAAA/oAAAAGAAAD9AAAAAIAAAP+AAAABAAAA/wAAAAGAAAD+gAAAAAAAAQAAAAACAAQAAAkAAAEBAQEBAQEBAQEAAACAAAAAgAAAAIAAAACAAAD+AAQAAAD/AAAA/wAAAP8AAAD/AAAAAAEAAAAABAAEAAATAAABAQEBAQEBAQEBAQEBAQEBAQEBAQKAAYAAAP8AAAD/AAAA/4AAAP+AAAD/AAAAAIAAAACAAAAAgAAAAQAEAAAA/wAAAP+AAAD/gAAA/wAAAP8AAAABgAAAAQAAAACAAAAAgAAAAAAAAQAAAAAEAAIAAA8AAAEBAQEBAQEBAQEBAQEBAQEBgAEAAAAAgAAAAIAAAACAAAD8AAAAAIAAAACAAAAAgAIAAAD/gAAA/4AAAP+AAAD/gAAAAIAAAACAAAAAgAAAAAAAAgAAAAAEAAQAAAMABwAAAQEBAQEBAQEAAAIAAAD+AAIAAgAAAP4ABAAAAP4AAAAAAAAA/gAAAAAEAAACAAQABAAAAwAHAAsADwAAAQEBAQEBAQEBAQEBAQEBAQAAAQAAAP8AAgABAAAA/wD/AAEAAAD/AAIAAQAAAP8ABAAAAP8AAAABAAAA/wAAAAAAAAD/AAAAAQAAAP8AAAAABAIAAAAEAAQAAAMABwALAA8AAAEBAQEBAQEBAQEBAQEBAQECAAEAAAD/AAEAAQAAAP8A/wABAAAA/wABAAEAAAD/AAQAAAD/AAAAAAAAAP8AAAAAAAAA/wAAAAAAAAD/AAAAAAEDAAAABAAEAAADAAABAQEBAwABAAAA/wAEAAAA/AAAAAAAAAEAAAAABAAEAAAFAAABAQEBAQEAAAQAAAD9AAAA/wAEAAAA/wAAAP0AAAAAAQAAAAABAAQAAAMAAAEBAQEAAAEAAAD/AAQAAAD8AAAAAAAAAwCAAIADAAOAAAMABwALAAABAQEBAQEBAQEBAQEAgACAAAD/gAEAAIAAAP+AAQAAgAAA/4ADgAAA/QAAAAMAAAD9AAAAAwAAAP0AAAAAAAABAYABgAQABAAACwAAAQEBAQEBAQEBAQEBAYABAAAAAIAAAAEAAAD+gAAA/4AAAP+ABAAAAP8AAAD/gAAA/wAAAACAAAAAgAAAAAAAAQAAAYACgAQAAAsAAAEBAQEBAQEBAQEBAQGAAQAAAP+AAAD/gAAA/oAAAAEAAAAAgAQAAAD+gAAA/4AAAP+AAAABAAAAAIAAAAAAAAEAAAAABAAEAAAJAAABAQEBAQEBAQEBAwABAAAA/AAAAAEAAAABAAAAAQAEAAAA/AAAAAKAAAAAgAAAAIAAAAABAIAAgAMABAAACwAAAQEBAQEBAQEBAQEBAgABAAAA/4AAAP6AAAD/gAAAAIAAAAEABAAAAP0AAAD/gAAAAIAAAAEAAAAAgAAAAAAAAQAAAAAEAAQAAAUAAAEBAQEBAQAAAQAAAAMAAAD8AAQAAAD9AAAA/wAAAAACAIAAgAMAAoAACwAPAAABAQEBAQEBAQEBAQEBAQEBAQABgAAAAIAAAP+AAAD+gAAAAQAAAP8A/4AAgAAA/4ACgAAA/4AAAP8AAAD/gAAAAIAAAAEAAAAAAAAA/wAAAAACAIAAgAMABAAACwAPAAABAQEBAQEBAQEBAQEBAQEBAgABAAAA/4AAAP6AAAABAAAA/wAAAAEA/oAAgAAA/4AEAAAA/QAAAP+AAAAAgAAAAQAAAACAAAD/gAAA/wAAAAABAIAAgAQABAAADQAAAQEBAQEBAQEBAQEBAQECAAIAAAD/AAAA/4AAAP6AAAD/gAAAAIAAAAEABAAAAP+AAAD9gAAA/4AAAACAAAABAAAAAIAAAAACAAAAAAQABAAAAwAHAAABAQEBAQEBAQAABAAAAPwAAQAAAAIAAAAEAAAA/AAAAAMA/gAAAAIAAAEAgACABAAEAAARAAABAQEBAQEBAQEBAQEBAQEBAQECAAIAAAD/AAAAAQAAAP8AAAD/gAAA/oAAAP+AAAAAgAAAAQAEAAAA/4AAAP+AAAD/gAAA/oAAAP+AAAAAgAAAAQAAAACAAAAAAQAAAAACgAKAAAsAAAEBAQEBAQEBAQEBAQAAAYAAAACAAAAAgAAA/wAAAP+AAAD/AAKAAAD/gAAA/4AAAP6AAAABAAAAAIAAAAAAAAEAAAAABAAEAAAFAAABAQEBAQEAAAQAAAD/AAAA/QAEAAAA/AAAAAMAAAAAAQCAAIAEAAQAABUAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQECAAIAAAD/AAAAAQAAAP8AAAABAAAA/wAAAP+AAAD+gAAA/4AAAACAAAABAAQAAAD/gAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/gAAAAIAAAAEAAAAAgAAAAAEBgAAABAACgAALAAABAQEBAQEBAQEBAQECgAGAAAD/AAAA/4AAAP8AAAAAgAAAAIACgAAA/wAAAP+AAAD/AAAAAYAAAACAAAAAAAABAAAAAAQABAAAEQAAAQEBAQEBAQEBAQEBAQEBAQEBAAAAgAAAAIAAAACAAAAAgAAAAIAAAACAAAAAgAAAAIAAAPwABAAAAP+AAAD/gAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/gAAAAAEAAAAABAABAAADAAABAQEBAAAEAAAA/AABAAAA/wAAAAAAAAEAAAAABAAEAAARAAABAQEBAQEBAQEBAQEBAQEBAQEDgACAAAD8AAAAAIAAAACAAAAAgAAAAIAAAACAAAAAgAAAAIAEAAAA/AAAAACAAAAAgAAAAIAAAACAAAAAgAAAAIAAAACAAAAAAQAAAgAEAAQAAAMAAAEBAQEAAAQAAAD8AAQAAAD+AAAAAAAAAgCAAIACAAOAAAMABwAAAQEBAQEBAQEAgACAAAD/gAEAAIAAAP+AA4AAAP0AAAADAAAA/QAAAAAEAIAAgAQABAAAAwAHAAsADwAAAQEBAQEBAQEBAQEBAQEBAQCAA4AAAPyAAIAAAACAAAAAgAAAAIAAAACAAAAAgAAABAAAAPyAAAADAP+AAAAAgP8A/4AAAACA/wD/gAAAAIAAAQAAAAAEAAQAAAUAAAEBAQEBAQMAAQAAAPwAAAADAAQAAAD8AAAAAQAAAAACAIAAgAQABAAAAwAHAAABAQEBAQEBAQCAA4AAAPyAAYAAAACAAAAEAAAA/IAAAAIA/4AAAACAAAMAgACABAAEAAADAAcACwAAAQEBAQEBAQEBAQEBAIADgAAA/IAAgAAAAIAAAAGAAAAAgAAABAAAAPyAAAADAP+AAAAAgP4A/4AAAACAAAAABAAAAIAEAAQAAAMABwALAA8AAAEBAQEBAQEBAQEBAQEBAQEAAAQAAAD8AAAABAAAAPwAAAAEAAAA/AAAAAQAAAD8AAQAAAD/gAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/gAAAAAYAgACABAAEAAADAAcACwAPABMAFwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAIADgAAA/IAAgAAAAIAAAAGAAAAAgAAA/oAAAACAAAD+gAAAAIAAAAGAAAAAgAAABAAAAPyAAAADAP+AAAAAgAAA/4AAAACA/wD/gAAAAID/AP+AAAAAgAAA/4AAAACAAAEAgACAAQADgAADAAABAQEBAIAAgAAA/4ADgAAA/QAAAAAAAAUAgACABAAEAAADAAcACwAPABMAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAIADgAAA/IAAgAAAAIAAAAGAAAAAgAAA/YAAAACAAAABgAAAAIAAAAQAAAD8gAAAAwD/gAAAAIAAAP+AAAAAgP4A/4AAAACAAAD/gAAAAIAAAAABAAADAAQABAAAAwAAAQEBAQAABAAAAPwABAAAAP8AAAAAAAAHAIAAgAQABAAAAwAHAAsADwATABcAGwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQCAA4AAAPyAAIAAAACAAAABgAAAAIAAAP2AAAAAgAAAAYAAAACAAAD9gAAAAIAAAAGAAAAAgAAABAAAAPyAAAADAP+AAAAAgAAA/4AAAACA/wD/gAAAAIAAAP+AAAAAgP8A/4AAAACAAAD/gAAAAIAAAAAEAAAAAAQAAgAAAwAHAAsADwAAAQEBAQEBAQEBAQEBAQEBAQAAAQAAAP8AAgABAAAA/wD/AAEAAAD/AAIAAQAAAP8AAgAAAP8AAAABAAAA/wAAAAAAAAD/AAAAAQAAAP8AAAAAAQAAAAAEAAQAAAkAAAEBAQEBAQEBAQEAAAEAAAABAAAAAQAAAAEAAAD8AAQAAAD/gAAA/4AAAP+AAAD9gAAAAAEBAAAAAgAEAAADAAABAQEBAQABAAAA/wAEAAAA/AAAAAAAAAEAAAAABAAEAAALAAABAQEBAQEBAQEBAQECgAGAAAD8AAAAAIAAAACAAAAAgAAAAQAEAAAA/AAAAAGAAAABAAAAAIAAAACAAAAAAAABAAABAAQAAgAAAwAAAQEBAQAABAAAAPwAAgAAAP8AAAAAAAABAAAAAAQABAAACwAAAQEBAQEBAQEBAQEBAgACAAAA/AAAAACAAAAAgAAAAIAAAACABAAAAPwAAAACAAAAAIAAAACAAAAAgAAAAAAAAQAAAAAEAAIAAAkAAAEBAQEBAQEBAQEDAAEAAAD8AAAAAQAAAAEAAAABAAIAAAD+AAAAAIAAAACAAAAAgAAAAAEAAAAABAAEAAALAAABAQEBAQEBAQEBAQEAAAIAAAAAgAAAAIAAAACAAAAAgAAA/AAEAAAA/4AAAP+AAAD/gAAA/4AAAP4AAAAAAAADAAAAAAQABAAAGwAnADMAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAAAEAAAAAgAAAAIAAAACAAAAAgAAAAIAAAACAAAD/AAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/gAIAAYAAAACAAAD/gAAA/4AAAP+AAAD/gP4AAIAAAACAAAAAgAAAAIAAAP6AAAD/gAQAAAD/gAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/AAAAAIAAAACAAAAAgAAAAIAAAACAAAAAgAAAAQAAAP+AAAD+gAAAAIAAAACAAAAAgAAA/oAAAP+AAAD/gAAA/4AAAP+AAAAAgAAAAAAAAQAAAAAEAAIAAAkAAAEBAQEBAQEBAQEAAAEAAAABAAAAAQAAAAEAAAD8AAIAAAD/gAAA/4AAAP+AAAD/gAAAAAEAAAAABAAEAAALAAABAQEBAQEBAQEBAQEAAAGAAAABAAAAAIAAAACAAAAAgAAA/AAEAAAA/4AAAP+AAAD/gAAA/wAAAP6AAAAAAAAEAAAAgAQABAAAAwAHAAsADwAAAQEBAQEBAQEBAQEBAQEBAQCAAYAAAP6AAgABgAAA/oD9gAGAAAD+gAIAAYAAAP6ABAAAAP6AAAABgAAA/oAAAP+AAAD+gAAAAYAAAP6AAAAAAQIAAgAEAAQAAAMAAAEBAQECAAIAAAD+AAQAAAD+AAAAAAAABACAAIAEAAQAAAMABwAjACcAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAEAAAD/AAGAAQAAAP8A/gAAgAAAAIAAAACAAAAAgAAAAIAAAACAAAAAgAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/gAAA/4ABgACAAAD/gAQAAAD/gAAAAIAAAP+AAAAAAAAA/wAAAP+AAAD/gAAAAIAAAACAAAABAAAA/oAAAP+AAAD/gAAA/4AAAACAAAAAgAAAAIAAAAGAAAD/gAAAAAQAAAAABAAEAAADAAcACwAPAAABAQEBAQEBAQEBAQEBAQEBAAAAgAAA/4ADgACAAAD/gPyAAIAAAP+AA4AAgAAA/4AEAAAA/4AAAACAAAD/gAAA/QAAAP+AAAAAgAAA/4AAAAABAAAAAAIAAgAAAwAAAQEBAQAAAgAAAP4AAgAAAP4AAAAAAAAEAAAAAAIABAAAAwAHAAsADwAAAQEBAQEBAQEBAQEBAQEBAQAAAQAAAP8AAQABAAAA/wD/AAEAAAD/AAEAAQAAAP8ABAAAAP8AAAAAAAAA/wAAAAAAAAD/AAAAAAAAAP8AAAAAAQCAAQADgAOAABMAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAYABAAAA/4AAAAGAAAD+gAAAAIAAAP8AAAD/gAAA/4AAAACAAAAAgAOAAAD/gAAA/4AAAP+AAAD/gAAA/4AAAACAAAAAgAAAAIAAAACAAAAAAAABAQABAAOABAAAEwAAAQEBAQEBAQEBAQEBAQEBAQEBAQECAACAAAAAgAAAAIAAAP+AAAD/gAAA/4AAAP+AAAD/gAAAAIAAAACABAAAAP+AAAD/gAAA/wAAAACAAAD+gAAAAYAAAP+AAAABAAAAAIAAAAAAAAEBAAEABAADgAATAAABAQEBAQEBAQEBAQEBAQEBAQEBAQIAAQAAAACAAAAAgAAA/4AAAP+AAAD/AAAAAIAAAP6AAAABgAAA/4ADgAAA/4AAAP+AAAD/gAAA/4AAAP+AAAAAgAAAAIAAAACAAAAAgAAAAAAAAQEAAIADgAOAABMAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAgAAgAAAAIAAAACAAAD/gAAA/4AAAP+AAAD/gAAA/4AAAACAAAAAgAOAAAD+gAAAAIAAAP8AAAD/gAAA/4AAAACAAAAAgAAAAQAAAP+AAAAAAAABAQAAgAOABAAADwAAAQEBAQEBAQEBAQEBAQEBAQIAAIAAAACAAAAAgAAA/4AAAP6AAAD/gAAAAIAAAACABAAAAP8AAAD/AAAA/wAAAP+AAAAAgAAAAQAAAAEAAAAAAAACAIAAgAOAA4AAAwAJAAABAQEBAQEBAQEBAIADAAAA/QAAgAAAAgAAAP8AAAADgAAA/QAAAAKA/gAAAAEAAAABAAAAAAIAgACABAAEAAAbACcAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQECAACAAAAAgAAAAIAAAACAAAD/gAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/gAAAAIAAAACAAAAAgAAAAAD/gAAAAIAAAACAAAAAgAAA/4AAAAQAAAD/gAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/gAAAAIAAAACAAAAAgAAAAIAAAACAAAAAgAAA/4D/gAAA/4AAAP+AAAAAgAAAAIAAAACAAAEAAAIABAADAAADAAABAQEBAAAEAAAA/AADAAAA/wAAAAAAAAEAAAAABAAEAAALAAABAQEBAQEBAQEBAQEAAAQAAAD/gAAA/4AAAP+AAAD/gAAA/gAEAAAA/gAAAP+AAAD/gAAA/4AAAP+AAAAAAAABAAACAAIABAAAAwAAAQEBAQAAAgAAAP4ABAAAAP4AAAAAAAACAQAAgAOAA4AAFwAbAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAYABgAAAAIAAAP8AAAAAgAAAAIAAAP8AAAD/gAAA/wAAAACAAAAAgAAA/wAAAACAAIAAAACAAAADgAAA/wAAAP+AAAD/gAAA/4AAAP+AAAAAgAAA/4AAAACAAAAAgAAAAIAAAACAAAAAgP+AAAAAgAADAAAAAAQABAAACwAnADMAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAgAGAAAD/gAAA/4AAAP+AAAD/gAAAAIACgAEAAAD/gAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/AAAAAIAAAACAAAAAgAAAAIAAAACAAAAAgACAAIAAAP+AAAD+gAAAAIAAAACAAAAAgAQAAAD/gAAA/4AAAP+AAAD/gAAAAYAAAACAAAD/AAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/gAAAAQAAAACAAAAAgAAAAIAAAACAAAAAgAAA/oAAAP6AAAD/gAAAAIAAAACAAAAAgAAAAAAAAgCAAIADgAQAAA8AHwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAEAAAABAAAAAIAAAP+AAAD/AAAA/wAAAP+AAAAAgAAAAQAAAAEAAAAAgAAA/4AAAP8AAAD/AAAA/4AAAACABAAAAP+AAAAAgAAA/wAAAP+AAAAAgAAA/4AAAAEAAAD+gAAA/4AAAACAAAD/AAAA/4AAAACAAAD/gAAAAQAAAAABAAAAAAQAA4AACwAAAQEBAQEBAQEBAQEBAQACAAAAAIAAAACAAAD8AAAAAIAAAACAA4AAAP+AAAD/gAAA/YAAAAKAAAAAgAAAAAAAAQAAAAACAAQAAA8AAAEBAQEBAQEBAQEBAQEBAQEAAACAAAAAgAAAAIAAAACAAAD/gAAA/4AAAP+AAAD/gAQAAAD/gAAA/4AAAP+AAAD/AAAA/4AAAP+AAAD/gAAAAAAAAQIAAAAEAAQAAA8AAAEBAQEBAQEBAQEBAQEBAQEDgACAAAD/gAAA/4AAAP+AAAD/gAAAAIAAAACAAAAAgAQAAAD8AAAAAIAAAACAAAAAgAAAAQAAAACAAAAAgAAAAAAAAQCAAIAEAAQAABcAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQIAAIAAAACAAAAAgAAAAIAAAP+AAAD/AAAA/4AAAP8AAAD/gAAAAIAAAACAAAAAgAQAAAD/gAAA/4AAAP+AAAD/gAAA/oAAAAEAAAD/AAAAAYAAAACAAAAAgAAAAIAAAAAAACAAAAAABAAEAAADAAcACwAPABMAFwAbAB8AIwAnACsALwAzADcAOwA/AEMARwBLAE8AUwBXAFsAXwBjAGcAawBvAHMAdwB7AH8AAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAAAgAAA/4ABAACAAAD/gAEAAIAAAP+AAQAAgAAA/4D9gACAAAD/gAEAAIAAAP+AAQAAgAAA/4ABAACAAAD/gPyAAIAAAP+AAQAAgAAA/4ABAACAAAD/gAEAAIAAAP+A/YAAgAAA/4ABAACAAAD/gAEAAIAAAP+AAQAAgAAA/4D8gACAAAD/gAEAAIAAAP+AAQAAgAAA/4ABAACAAAD/gP2AAIAAAP+AAQAAgAAA/4ABAACAAAD/gAEAAIAAAP+A/IAAgAAA/4ABAACAAAD/gAEAAIAAAP+AAQAAgAAA/4D9gACAAAD/gAEAAIAAAP+AAQAAgAAA/4ABAACAAAD/gAQAAAD/gAAAAIAAAP+AAAAAgAAA/4AAAACAAAD/gAAAAAAAAP+AAAAAgAAA/4AAAACAAAD/gAAAAIAAAP+AAAAAAAAA/4AAAACAAAD/gAAAAIAAAP+AAAAAgAAA/4AAAAAAAAD/gAAAAIAAAP+AAAAAgAAA/4AAAACAAAD/gAAAAAAAAP+AAAAAgAAA/4AAAACAAAD/gAAAAIAAAP+AAAAAAAAA/4AAAACAAAD/gAAAAIAAAP+AAAAAgAAA/4AAAAAAAAD/gAAAAIAAAP+AAAAAgAAA/4AAAACAAAD/gAAAAAAAAP+AAAAAgAAA/4AAAACAAAD/gAAAAIAAAP+AAAAAAQAAAAAEAAQAAAsAAAEBAQEBAQEBAQEBAQAABAAAAP6AAAD/AAAA/4AAAP+AAAD/gAQAAAD8AAAAAIAAAACAAAAAgAAAAQAAAAAAAAEAAAAABAAEAAALAAABAQEBAQEBAQEBAQEAAAQAAAD/gAAA/4AAAP+AAAD/AAAA/oAEAAAA/oAAAP8AAAD/gAAA/4AAAP+AAAAAAAABAAABgAKABAAADwAAAQEBAQEBAQEBAQEBAQEBAQAAAQAAAACAAAAAgAAAAIAAAP8AAAD/gAAA/4AAAP+ABAAAAP+AAAD/gAAA/4AAAP8AAAAAgAAAAIAAAACAAAAAAAABAAAAAAKABAAADwAAAQEBAQEBAQEBAQEBAQEBAQAAAQAAAACAAAAAgAAAAIAAAP8AAAD/gAAA/4AAAP+ABAAAAP+AAAD/gAAA/4AAAP2AAAACAAAAAIAAAACAAAAAAAABAYAAAAQAAoAABQAAAQEBAQEBAYACgAAA/oAAAP8AAoAAAP8AAAD+gAAAAAEAAAAABAAEAAAJAAABAQEBAQEBAQEBAAACgAAAAIAAAACAAAAAgAAA/AAEAAAA/wAAAP8AAAD/AAAA/wAAAAACAAAAAAQABAAAGwAfAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQGAAQAAAACAAAAAgAAAAIAAAP+AAAD/gAAA/4AAAP8AAAD/gAAA/4AAAP+AAAAAgAAAAIAAAACAAAAAAAEAAAAEAAAA/4AAAP+AAAD/gAAA/wAAAP+AAAD/gAAA/4AAAACAAAAAgAAAAIAAAAEAAAAAgAAAAIAAAP8A/wAAAAEAAAEBgAGABAAEAAAFAAABAQEBAQEBgAEAAAABgAAA/YAEAAAA/oAAAP8AAAAAAQAAAAACgAKAAA8AAAEBAQEBAQEBAQEBAQEBAQEBgAEAAAD/gAAA/4AAAP+AAAD/AAAAAIAAAACAAAAAgAKAAAD/AAAA/4AAAP+AAAD/gAAAAQAAAACAAAAAgAAAAAAAAQGAAAAEAAQAAA8AAAEBAQEBAQEBAQEBAQEBAQEDAAEAAAD/gAAA/4AAAP+AAAD/AAAAAIAAAACAAAAAgAQAAAD/AAAA/4AAAP+AAAD+AAAAAoAAAACAAAAAgAAAAAAAAQGAAAAEAAKAAA8AAAEBAQEBAQEBAQEBAQEBAQEBgAEAAAAAgAAAAIAAAACAAAD/AAAA/4AAAP+AAAD/gAKAAAD/gAAA/4AAAP+AAAD/AAAAAIAAAACAAAAAgAAAAAAAAQGAAYAEAAQAAA8AAAEBAQEBAQEBAQEBAQEBAQEDAAEAAAD/gAAA/4AAAP+AAAD/AAAAAIAAAACAAAAAgAQAAAD/AAAA/4AAAP+AAAD/gAAAAQAAAACAAAAAgAAAAAAAAQAAAAAEAAQAABsAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAAAEAAAAAgAAAAIAAAACAAAAAgAAAAIAAAACAAAD/AAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/gAQAAAD/gAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/AAAAAIAAAACAAAAAgAAAAIAAAACAAAAAgAAAAAAAAQAAAAAEAAQAAB8AAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAABAAAAAIAAAAEAAAAAgAAAAQAAAP+AAAD/gAAA/4AAAP+AAAD/gAAA/4AAAP8AAAAAgAAAAIAAAP+AAAD/gAQAAAD/gAAA/4AAAACAAAAAgAAA/wAAAP+AAAD/gAAA/4AAAP+AAAD/gAAA/4AAAAEAAAAAgAAAAQAAAACAAAAAAAABAAABgAQABAAADwAAAQEBAQEBAQEBAQEBAQEBAQAAAQAAAACAAAAAgAAAAgAAAP2AAAD/gAAA/4AAAP+ABAAAAP+AAAD/gAAA/4AAAP8AAAAAgAAAAIAAAACAAAAAAAABAAABgAQAAoAAAwAAAQEBAQAABAAAAPwAAoAAAP8AAAAAAAABAYAAAAKABAAAAwAAAQEBAQGAAQAAAP8ABAAAAPwAAAAAAAABAYAAAAQABAAAFwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAwABAAAA/4AAAP+AAAAAgAAAAIAAAP8AAAD/gAAA/4AAAP+AAAAAgAAAAIAAAACABAAAAP8AAAD/gAAA/wAAAP+AAAD/AAAAAIAAAACAAAAAgAAAAQAAAACAAAAAgAAAAAAAAQAAAAAEAAKAAA8AAAEBAQEBAQEBAQEBAQEBAQEAAAKAAAAAgAAAAIAAAACAAAD/AAAA/4AAAP+AAAD+AAKAAAD/gAAA/4AAAP+AAAD/AAAAAIAAAACAAAAAgAAAAAAAAQAAAYAEAAQAAA8AAAEBAQEBAQEBAQEBAQEBAQEDAAEAAAD/gAAA/4AAAP+AAAD9gAAAAgAAAACAAAAAgAQAAAD/AAAA/4AAAP+AAAD/gAAAAQAAAACAAAAAgAAAAAAAAQAAAgAEAAQAAA8AAAEBAQEBAQEBAQEBAQEBAQEAAAQAAAD/gAAA/4AAAP+AAAD/AAAA/4AAAP+AAAD/gAQAAAD/gAAA/4AAAP+AAAD/gAAAAIAAAACAAAAAgAAAAAAAAQAAAYACgAKAAAMAAAEBAQEAAAKAAAD9gAKAAAD/AAAAAAAAAQGAAAACgAKAAAMAAAEBAQEBgAEAAAD/AAKAAAD9gAAAAAAAAQAAAYAEAAQAABcAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQAAAQAAAACAAAABAAAAAIAAAAEAAAD/gAAA/4AAAP+AAAD/AAAA/4AAAP+AAAD/gAQAAAD/gAAA/4AAAACAAAAAgAAA/wAAAP+AAAD/gAAA/4AAAACAAAAAgAAAAIAAAAAAAAEAAAAABAAEAAAJAAABAQEBAQEBAQEBAYACgAAA/AAAAACAAAAAgAAAAIAEAAAA/AAAAAEAAAABAAAAAQAAAAABAAAAAAQABAAAEwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEDAAEAAAD/gAAA/4AAAP+AAAD/AAAA/oAAAAEAAAABAAAAAIAAAACABAAAAP6AAAD/AAAA/4AAAP+AAAD/gAAAAQAAAACAAAAAgAAAAQAAAAAAAAEAAAAABAAEAAATAAABAQEBAQEBAQEBAQEBAQEBAQEBAQAAAQAAAACAAAAAgAAAAQAAAAEAAAD+gAAA/wAAAP+AAAD/gAAA/4AEAAAA/wAAAP8AAAD/gAAA/4AAAP8AAAAAgAAAAIAAAACAAAABAAAAAAAAAQAAAAAEAAQAABsAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEDAAEAAAD/gAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/AAAAAIAAAACAAAAAgAAAAIAAAACAAAAAgAQAAAD/AAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/gAAAAQAAAACAAAAAgAAAAIAAAACAAAAAgAAAAAAAAQAAAAACgAQAABcAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQAAAQAAAACAAAAAgAAAAIAAAP+AAAD/gAAA/4AAAP8AAAAAgAAAAIAAAP+AAAD/gAQAAAD/gAAA/4AAAP+AAAD/AAAA/4AAAP+AAAD/gAAAAQAAAACAAAABAAAAAIAAAAAAAAEAAAAABAAEAAAfAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQAAAQAAAACAAAAAgAAAAIAAAACAAAAAgAAAAIAAAP8AAAD/gAAA/wAAAP+AAAD/AAAAAIAAAACAAAD/gAAA/4AEAAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/gAAA/wAAAACAAAAAgAAA/4AAAP+AAAABAAAAAIAAAAEAAAAAgAAAAAAAAQAAAAACgAQAAA8AAAEBAQEBAQEBAQEBAQEBAQEBgAEAAAD/gAAA/4AAAP+AAAD/AAAAAIAAAACAAAAAgAQAAAD9gAAA/4AAAP+AAAD/gAAAAQAAAACAAAAAgAAAAAAAAQGAAAAEAAQAAA8AAAEBAQEBAQEBAQEBAQEBAQEBgAEAAAAAgAAAAIAAAACAAAD/AAAA/4AAAP+AAAD/gAQAAAD+AAAA/4AAAP+AAAD/AAAAAIAAAACAAAAAgAAAAAAAAQAAAAAEAAKAAA8AAAEBAQEBAQEBAQEBAQEBAQEBgAKAAAD+AAAA/4AAAP+AAAD/AAAAAIAAAACAAAAAgAKAAAD/AAAA/4AAAP+AAAD/gAAAAQAAAACAAAAAgAAAAAAAAQGAAYACgAQAAAMAAAEBAQEBgAEAAAD/AAQAAAD9gAAAAAAAAQGAAYAEAAKAAAMAAAEBAQEBgAKAAAD9gAKAAAD/AAAAAAAAAQAAAAAEAAQAAB8AAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAwABAAAA/4AAAP+AAAAAgAAAAIAAAP8AAAD/gAAA/wAAAP+AAAD/AAAAAIAAAACAAAAAgAAAAIAAAACAAAAAgAQAAAD/AAAA/4AAAP8AAAD/gAAA/wAAAACAAAAAgAAA/4AAAP+AAAABAAAAAIAAAACAAAAAgAAAAIAAAACAAAAAAAABAAAAAAQABAAAIwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAABAAAAAIAAAAEAAAAAgAAAAQAAAP+AAAD/gAAAAIAAAACAAAD/AAAA/4AAAP8AAAD/gAAA/wAAAACAAAAAgAAA/4AAAP+ABAAAAP+AAAD/gAAAAIAAAACAAAD/AAAA/4AAAP8AAAD/gAAA/wAAAACAAAAAgAAA/4AAAP+AAAABAAAAAIAAAAEAAAAAgAAAAAAAAQGAAYACgAKAAAMAAAEBAQEBgAEAAAD/AAKAAAD/AAAAAAAAAQAAAAAEAAKAABcAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQGAAQAAAACAAAAAgAAAAIAAAP8AAAD/gAAA/wAAAP+AAAD/AAAAAIAAAACAAAAAgAKAAAD/gAAA/4AAAP+AAAD/AAAAAIAAAACAAAD/gAAA/4AAAAEAAAAAgAAAAIAAAAAAAAEAAAGAAoAEAAAFAAABAQEBAQEBgAEAAAD9gAAAAYAEAAAA/YAAAAEAAAAAAQAAAAACgAKAAAUAAAEBAQEBAQAAAoAAAP8AAAD+gAKAAAD9gAAAAYAAAAABAAAAAAQABAAAHwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAAAEAAAAAgAAAAQAAAACAAAABAAAA/4AAAP+AAAAAgAAAAIAAAP8AAAD/gAAA/4AAAP+AAAD/gAAA/4AAAP+ABAAAAP+AAAD/gAAAAIAAAACAAAD/AAAA/4AAAP8AAAD/gAAA/wAAAACAAAAAgAAAAIAAAACAAAAAgAAAAIAAAAAAAAEAAAAABAAEAAALAAABAQEBAQEBAQEBAQEBgAEAAAABgAAA/oAAAP8AAAD+gAAAAYAEAAAA/oAAAP8AAAD+gAAAAYAAAAEAAAAAAAABAAAAAAQAAoAABwAAAQEBAQEBAQEAAAQAAAD+gAAA/wAAAP6AAoAAAP8AAAD+gAAAAYAAAAAAAAEBgAAABAAEAAAHAAABAQEBAQEBAQGAAQAAAAGAAAD+gAAA/wAEAAAA/oAAAP8AAAD+gAAAAAAAAQAAAAACgAQAAAcAAAEBAQEBAQEBAYABAAAA/wAAAP6AAAABgAQAAAD8AAAAAYAAAAEAAAAAAAABAAABgAQABAAABwAAAQEBAQEBAQEBgAEAAAABgAAA/AAAAAGABAAAAP6AAAD/AAAAAQAAAAAAAAQBAAEAAwADAAADAAcACwAPAAABAQEBAQEBAQEBAQEBAQEBAYABAAAA/wD/gACAAAD/gAGAAIAAAP+A/wABAAAA/wADAAAA/4AAAAAAAAD/AAAAAQAAAP8AAAAAAAAA/4AAAAACAIAAgAOAA4AACwAPAAABAQEBAQEBAQEBAQEBAQEBAQACAAAAAIAAAP+AAAD+AAAA/4AAAACAAIAAAAEAAAADgAAA/4AAAP4AAAD/gAAAAIAAAAIAAAD/gP8AAAABAAACAAAAAAQABAAAEwAfAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAAgAAAACAAAAAgAAA/4AAAP+AAAD+AAAA/4AAAP+AAAAAgAAAAIAAgAAA/4AAAACAAAABAAAAAIAAAP+AAAAEAAAA/4AAAP+AAAD+AAAA/4AAAP+AAAAAgAAAAIAAAAIAAAAAgAAA/4D/gAAA/wAAAP+AAAAAgAAAAQAAAACAABAAAAAABAAEAAADAAcACwAPABMAFwAbAB8AIwAnACsALwAzADcAOwA/AAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAYAAgAAA/4ACAACAAAD/gP2AAIAAAP+AAgAAgAAA/4D9gACAAAD/gAIAAIAAAP+A/YAAgAAA/4ACAACAAAD/gP+AAIAAAP+AAgAAgAAA/4D9gACAAAD/gAIAAIAAAP+A/YAAgAAA/4ACAACAAAD/gP2AAIAAAP+AAgAAgAAA/4AEAAAA/4AAAACAAAD/gAAAAAAAAP+AAAAAgAAA/4AAAAAAAAD/gAAAAIAAAP+AAAAAAAAA/4AAAACAAAD/gAAAAAAAAP+AAAAAgAAA/4AAAAAAAAD/gAAAAIAAAP+AAAAAAAAA/4AAAACAAAD/gAAAAAAAAP+AAAAAgAAA/4AAAAAQAAAAAAQABAAAAwAHAAsADwATABcAGwAfACMAJwArAC8AMwA3ADsAPwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQAAAIAAAP+AAgAAgAAA/4D+gACAAAD/gAIAAIAAAP+A/oAAgAAA/4ACAACAAAD/gP6AAIAAAP+AAgAAgAAA/4D8gACAAAD/gAIAAIAAAP+A/oAAgAAA/4ACAACAAAD/gP6AAIAAAP+AAgAAgAAA/4D+gACAAAD/gAIAAIAAAP+ABAAAAP+AAAAAgAAA/4AAAAAAAAD/gAAAAIAAAP+AAAAAAAAA/4AAAACAAAD/gAAAAAAAAP+AAAAAgAAA/4AAAAAAAAD/gAAAAIAAAP+AAAAAAAAA/4AAAACAAAD/gAAAAAAAAP+AAAAAgAAA/4AAAAAAAAD/gAAAAIAAAP+AAAAAAwCAAIADgAQAABcAGwAfAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQIAAIAAAAEAAAD/AAAAAIAAAP+AAAABAAAA/wAAAP+AAAD/AAAA/4AAAACAAAABAP+AAAAAgAAA/4AAAACAAAAEAAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/gAAA/4AAAACAAAAAgAAAAYAAAACAAAD/gP+AAAAAgP8A/4AAAACAAAAAAQCAAIADgAOAAA8AAAEBAQEBAQEBAQEBAQEBAQEBAAIAAAAAgAAA/4AAAP+AAAD/AAAA/4AAAP+AAAAAgAOAAAD/gAAA/wAAAP+AAAD/AAAAAQAAAACAAAABAAAAAAAAAgCAAIADgAOAAAMACQAAAQEBAQEBAQEBAQCAAwAAAP0AAYAAAP8AAAACAAAAA4AAAP0AAAACgP8AAAD/AAAAAgAAAAABAIAAgAOAA4AAAwAAAQEBAQCAAwAAAP0AA4AAAP0AAAAAAAACAIAAgAOAA4AAAwALAAABAQEBAQEBAQEBAQEAgAMAAAD9AACAAAACAAAA/4AAAP8AAAADgAAA/QAAAAKA/gAAAAIAAAD/AAAAAQAAAQAAAAAEAAQAABMAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQACAAAAAIAAAACAAAD/gAAA/4AAAP4AAAD/gAAA/4AAAACAAAAAgAQAAAD/gAAA/4AAAP4AAAD/gAAA/4AAAACAAAAAgAAAAgAAAACAAAAAAAABAQABAAMAAwAACwAAAQEBAQEBAQEBAQEBAYABAAAAAIAAAP+AAAD/AAAA/4AAAACAAwAAAP+AAAD/AAAA/4AAAACAAAABAAAAAAAAAQCAAQAEAAQAABsAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQECAACAAAAAgAAAAQAAAP+AAAD/gAAAAIAAAP8AAAD/gAAA/wAAAACAAAD/gAAA/4AAAAEAAAAAgAQAAAD/gAAA/4AAAP+AAAD/gAAA/4AAAP+AAAAAgAAA/4AAAACAAAAAgAAAAIAAAACAAAAAgAAAAAAABgCAAIAEAAQAAAMABwALAA8AEwAXAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAgAOAAAD8gAEAAAAAgAAAAIAAAACAAAD+AAAAAIAAAAGAAAAAgAAA/gAAAAGAAAAEAAAA/IAAAAMA/wAAAAEAAAD/AAAAAQD+gP+AAAAAgAAA/4AAAACA/4D/gAAAAIAABgCAAIAEAAQAAAMABwALAA8AEwAXAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAgAOAAAD8gAEAAAAAgAAAAIAAAACAAAD+gAAAAYAAAP4AAAAAgAAAAYAAAACAAAAEAAAA/IAAAAMA/wAAAAEAAAD/AAAAAQD+gP+AAAAAgP+A/4AAAACAAAD/gAAAAIAABgCAAIAEAAQAABMAFwAbAB8AIwAnAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAgAAgAAAAIAAAAEAAAD/AAAA/4AAAP+AAAD/gAAA/wAAAAEAAAAAgAAAAAAAgAAA/oAAgAAA/4ACAACAAAD/gP4AAIAAAP+AAgAAgAAA/4AEAAAA/wAAAP+AAAD/gAAA/4AAAP8AAAABAAAAAIAAAACAAAAAgAAA/4D/gAAAAIABAAAA/4AAAACAAAD/gAAA/oAAAP+AAAAAgAAA/4AAAAACAQAAgAOABAAAFwAbAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAYABgAAAAIAAAP+AAAD/gAAAAIAAAP+AAAD/gAAA/4AAAACAAAD/gAAAAQAAAP8A/4AAgAAA/4AEAAAA/4AAAP8AAAD/gAAA/4AAAP+AAAD/gAAAAIAAAACAAAAAgAAAAIAAAAEAAAAAAAAA/wAAAAACAIAAgAQABAAAFwAbAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAYACgAAA/4AAAP+AAAD/gAAAAIAAAP+AAAD+gAAAAQAAAP8AAAABAAAAAIAAAP8A/wAAgAAA/4AEAAAA/gAAAAEAAAD/gAAA/4AAAP8AAAD/gAAAAIAAAAEAAAAAgAAAAIAAAACAAAD+gAAA/wAAAAABAIAAgAQABAAAGwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQIAAIAAAACAAAAAgAAAAIAAAP8AAAD/gAAAAIAAAP6AAAAAgAAA/4AAAP8AAAAAgAAAAIAAAACABAAAAP+AAAD/gAAA/4AAAP8AAAAAgAAA/wAAAP+AAAAAgAAAAQAAAP+AAAABAAAAAIAAAACAAAAAAAABAIAAgAQABAAAGwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQGAAYAAAP+AAAAAgAAAAQAAAP8AAAD/gAAAAIAAAP6AAAAAgAAA/4AAAP8AAAABAAAAAIAAAP+ABAAAAP8AAAD/gAAAAIAAAP6AAAAAgAAA/wAAAP+AAAAAgAAAAQAAAP+AAAABgAAA/4AAAACAAAAAAAABAIAAgAQABAAAFwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQABAAAAAIAAAAEAAAAAgAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/gAAA/4AAAACABAAAAP+AAAAAgAAA/4AAAP6AAAD/gAAA/4AAAP+AAAAAgAAAAIAAAACAAAABgAAAAAAAAQCAAIAEAAQAABsAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQECAACAAAAAgAAAAIAAAACAAAD/gAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/gAAAAIAAAACAAAAAgAQAAAD/gAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/gAAAAIAAAACAAAAAgAAAAIAAAACAAAAAgAAAAAAAAQEAAIADgAQAAAsAAAEBAQEBAQEBAQEBAQIAAYAAAP8AAAD/gAAA/wAAAACAAAAAgAQAAAD/AAAA/gAAAP+AAAABAAAAAIAAAAAAAAEAgACABAAEAAATAAABAQEBAQEBAQEBAQEBAQEBAQEBAQGAAoAAAP+AAAD/AAAAAIAAAACAAAD+gAAA/4AAAP8AAAAAgAAAAIAEAAAA/QAAAP+AAAABAAAAAIAAAAEAAAD+AAAA/4AAAAEAAAAAgAAAAAAAAAAYASYAAQAAAAAAAAAIAAAAAQAAAAAAAQAIAAgAAQAAAAAAAgAHABAAAQAAAAAAAwAIABcAAQAAAAAABAAQAB8AAQAAAAAABQALAC8AAQAAAAAABgAIADoAAQAAAAAACQAJAEIAAQAAAAAACgA6AEsAAQAAAAAADQARAIUAAQAAAAAADgAyAJYAAQAAAAAAEwAMAMgAAwABBAkAAAAQANQAAwABBAkAAQAQAOQAAwABBAkAAgAOAPQAAwABBAkAAwAQAQIAAwABBAkABAAgARIAAwABBAkABQAWATIAAwABBAkABgAQAUgAAwABBAkACQASAVgAAwABBAkACgB0AWoAAwABBAkADQAiAd4AAwABBAkADgBkAgAAAwABBAkAEwAYAmQoYykgMjAyMlVyc2FGb250UmVndWxhclVyc2FGb250VXJzYUZvbnQgUmVndWxhclZlcnNpb24gMS4wVXJzYUZvbnRVcnNhRnJhbmtBbiBvcGVuIGxpY2VuY2UgZ2VuZXJhbCBwdXJwb3NlIHRleHRtb2RlIGZvbnQgYnkgVXJzYUZyYW5rQ0MwIDEuMCBVbml2ZXJzYWxodHRwczovL2NyZWF0aXZlY29tbW9ucy5vcmcvcHVibGljZG9tYWluL3plcm8vMS4wL0hlbGxvIFdvcmxkIQAoAGMAKQAgADIAMAAyADIAVQByAHMAYQBGAG8AbgB0AFIAZQBnAHUAbABhAHIAVQByAHMAYQBGAG8AbgB0AFUAcgBzAGEARgBvAG4AdAAgAFIAZQBnAHUAbABhAHIAVgBlAHIAcwBpAG8AbgAgADEALgAwAFUAcgBzAGEARgBvAG4AdABVAHIAcwBhAEYAcgBhAG4AawBBAG4AIABvAHAAZQBuACAAbABpAGMAZQBuAGMAZQAgAGcAZQBuAGUAcgBhAGwAIABwAHUAcgBwAG8AcwBlACAAdABlAHgAdABtAG8AZABlACAAZgBvAG4AdAAgAGIAeQAgAFUAcgBzAGEARgByAGEAbgBrAEMAQwAwACAAMQAuADAAIABVAG4AaQB2AGUAcgBzAGEAbABoAHQAdABwAHMAOgAvAC8AYwByAGUAYQB0AGkAdgBlAGMAbwBtAG0AbwBuAHMALgBvAHIAZwAvAHAAdQBiAGwAaQBjAGQAbwBtAGEAaQBuAC8AegBlAHIAbwAvADEALgAwAC8ASABlAGwAbABvACAAVwBvAHIAbABkACEAAAADAAAAAAAAAGYAMwAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA==\r
`;
class q {
  /**
   * Extracts all available characters from a font's cmap tables.
   * @param font The parsed font object from Typr
   * @returns Array of unique character strings
   */
  extractCharacters(A) {
    var t;
    const e = [];
    return (t = A == null ? void 0 : A.cmap) != null && t.tables ? (A.cmap.tables.forEach((r) => {
      if (r.format === 4) {
        const i = this._extractCharactersFromFormat4Table(r);
        e.push(...i);
      } else if (r.format === 12) {
        const i = this._extractCharactersFromFormat12Table(r);
        e.push(...i);
      }
    }), [...new Set(e)]) : [];
  }
  /**
   * Extracts characters from a Format 4 cmap table (Basic Multilingual Plane).
   * @param table The Format 4 cmap table
   * @returns Array of character strings
   */
  _extractCharactersFromFormat4Table(A) {
    const e = [];
    if (!A.startCount || !A.endCount || !A.idRangeOffset || !A.idDelta)
      return e;
    for (let t = 0; t < A.startCount.length; t++) {
      const r = A.startCount[t], i = A.endCount[t];
      if (!(r === 65535 && i === 65535)) {
        for (let a = r; a <= i; a++)
          if (this._calculateGlyphIndexFormat4(A, a, t) > 0) {
            const B = String.fromCodePoint(a);
            e.push(B);
          }
      }
    }
    return e;
  }
  /**
   * Extracts characters from a Format 12 cmap table (Extended Unicode ranges).
   * @param table The Format 12 cmap table
   * @returns Array of character strings
   */
  _extractCharactersFromFormat12Table(A) {
    const e = [];
    if (!A.groups)
      return e;
    for (let t = 0; t < A.groups.length; t += 3) {
      const r = A.groups[t], i = A.groups[t + 1], a = A.groups[t + 2];
      for (let s = r; s <= i; s++)
        if (a + (s - r) > 0) {
          const g = String.fromCodePoint(s);
          e.push(g);
        }
    }
    return e;
  }
  /**
   * Calculates the glyph index for a character in a Format 4 cmap table.
   * @param table The Format 4 cmap table
   * @param codePoint The Unicode code point
   * @param rangeIndex The index of the character range
   * @returns The glyph index, or 0 if not found
   */
  _calculateGlyphIndexFormat4(A, e, t) {
    if (A.idRangeOffset[t] === 0)
      return e + A.idDelta[t] & 65535;
    {
      const r = A.idRangeOffset[t] / 2 + (e - A.startCount[t]) - (A.startCount.length - t);
      if (r >= 0 && A.glyphIdArray && r < A.glyphIdArray.length) {
        const i = A.glyphIdArray[r];
        if (i !== 0)
          return i + A.idDelta[t] & 65535;
      }
    }
    return 0;
  }
  /**
   * Filters out problematic characters that might cause rendering issues.
   * @param characters Array of character strings to filter
   * @returns Filtered array of character strings
   */
  filterProblematicCharacters(A) {
    return A.filter((e) => this._isValidCharacter(e));
  }
  /**
   * Checks if a character is valid for rendering.
   * @param char The character to check
   * @returns True if the character is valid, false otherwise
   */
  _isValidCharacter(A) {
    const e = A.codePointAt(0) || 0;
    return !(e >= 0 && e <= 31 && e !== 9 && e !== 10 && e !== 13 || e >= 127 && e <= 159);
  }
}
class AA {
  /**
   * Creates a new TextureAtlasCreation instance.
   * @param renderer The WebGL renderer instance
   */
  constructor(A) {
    o(this, "_textureCanvas");
    o(this, "_textureContext");
    o(this, "_renderer");
    this._renderer = A, this._textureCanvas = document.createElement("canvas"), this._textureContext = this._textureCanvas.getContext("2d", { willReadFrequently: !0, alpha: !1 });
  }
  /**
   * Creates a texture atlas from the given characters.
   * @param characters Array of TextmodeCharacter objects
   * @param maxGlyphDimensions Maximum dimensions of glyphs
   * @param fontSize Font size for rendering
   * @param fontFamilyName Font family name to use
   * @returns Object containing framebuffer, columns, and rows
   */
  createTextureAtlas(A, e, t, r) {
    const i = A.length, a = Math.ceil(Math.sqrt(i)), s = Math.ceil(i / a), B = e.width * a, g = e.height * s;
    this._setupCanvas(B, g, t, r), this._renderCharactersToCanvas(A, e, a, t), this._applyBlackWhiteThreshold();
    const E = this._renderer.createFramebuffer(B, g, { filter: "nearest" });
    return E.update(this._textureCanvas), {
      framebuffer: E,
      columns: a,
      rows: s
    };
  }
  /**
   * Sets up the canvas for rendering.
   * @param width Canvas buffer width
   * @param height Canvas buffer height
   * @param fontSize Font size
   * @param fontFamilyName Font family name
   * @param logicalWidth Logical width for scaling context
   * @param logicalHeight Logical height for scaling context
   */
  _setupCanvas(A, e, t, r) {
    this._textureCanvas.width = A, this._textureCanvas.height = e, this._textureCanvas.style.width = A + "px", this._textureCanvas.style.height = A + "px", this._textureContext.imageSmoothingEnabled = !1, this._textureCanvas.style.imageRendering = "pixelated", this._textureContext.fillStyle = "black", this._textureContext.fillRect(0, 0, A, e), this._textureContext.font = `${t}px ${r}`, this._textureContext.textBaseline = "top", this._textureContext.textAlign = "left", this._textureContext.fillStyle = "white";
  }
  /**
   * Renders all characters to the canvas in a grid layout.
   * @param characters Array of characters to render
   * @param maxGlyphDimensions Maximum glyph dimensions
   * @param textureColumns Number of columns in the texture
   * @param fontSize Font size
   */
  _renderCharactersToCanvas(A, e, t, r) {
    for (let i = 0; i < A.length; i++) {
      const a = i % t, s = Math.floor(i / t), B = a * e.width + e.width * 0.5, g = s * e.height + e.height * 0.5, E = Math.round(B - e.width * 0.5), l = Math.round(g - r * 0.5);
      this._textureContext.fillText(A[i].character, E, l);
    }
  }
  /**
   * Applies a black and white threshold filter to the canvas.
   * This converts antialiased grayscale pixels to pure black or white,
   * ensuring crisp text rendering suitable for NEAREST texture filtering.
   * @param threshold Threshold value (0-255) for black/white conversion
   */
  _applyBlackWhiteThreshold(A = 128) {
    const e = this._textureContext.getImageData(0, 0, this._textureCanvas.width, this._textureCanvas.height), t = e.data;
    for (let r = 0; r < t.length; r += 4) {
      const i = 0.299 * t[r] + 0.587 * t[r + 1] + 0.114 * t[r + 2], a = A + 32, s = i > a ? 255 : 0;
      t[r] = s, t[r + 1] = s, t[r + 2] = s;
    }
    this._textureContext.putImageData(e, 0, 0);
  }
}
class eA {
  /**
   * Creates a new MetricsCalculation instance.
   */
  constructor() {
    o(this, "_tempCanvas");
    o(this, "_tempContext");
    this._tempCanvas = document.createElement("canvas"), this._tempContext = this._tempCanvas.getContext("2d");
  }
  /**
   * Calculates the maximum glyph dimensions for a given set of characters.
   * @param characters Array of character strings
   * @param fontSize Font size to use for measurement
   * @param fontFamilyName Font family name
   * @param fontFace FontFace object (optional, for validation)
   * @returns Object containing width and height dimensions
   */
  calculateMaxGlyphDimensions(A, e, t) {
    this._tempContext.font = `${e}px ${t}`;
    let r = 0, i = 0;
    for (const a of A) {
      const s = this._tempContext.measureText(a), B = s.width, g = s.actualBoundingBoxAscent + s.actualBoundingBoxDescent;
      B > 0 && (r = Math.max(r, B), i = Math.max(i, g));
    }
    return {
      width: Math.ceil(r),
      height: Math.ceil(i)
    };
  }
}
class tA {
  /**
   * Creates TextmodeCharacter objects with unique color assignments.
   * @param characters Array of character strings
   * @param font The parsed font object from Typr
   * @returns Array of TextmodeCharacter objects with colors
   */
  createCharacterObjects(A, e) {
    return A.map((t, r) => {
      const i = t.codePointAt(0) || 0, a = this._generateCharacterColor(r);
      let s = 0;
      if (e.hmtx && e.hmtx.aWidth) {
        const B = this._getGlyphIndex(e, i);
        B > 0 && e.hmtx.aWidth[B] !== void 0 && (s = e.hmtx.aWidth[B]);
      }
      return {
        character: t,
        unicode: i,
        color: a,
        advanceWidth: s
      };
    });
  }
  /**
   * Gets the glyph index for a given Unicode code point in a Typr.js font
   * This is a simplified version for advance width lookup only
   * @param fontData The Typr.js font data
   * @param codePoint The Unicode code point to look up
   * @returns The glyph index, or 0 if not found
   */
  _getGlyphIndex(A, e) {
    const t = A.cmap;
    if (!t || !t.tables) return 0;
    for (const r of t.tables)
      if (r.format === 4) {
        for (let i = 0; i < r.startCount.length; i++)
          if (e >= r.startCount[i] && e <= r.endCount[i]) {
            if (r.idRangeOffset[i] === 0)
              return e + r.idDelta[i] & 65535;
            {
              const a = r.idRangeOffset[i] / 2 + (e - r.startCount[i]) - (r.startCount.length - i);
              if (a >= 0 && a < r.glyphIdArray.length) {
                const s = r.glyphIdArray[a];
                if (s !== 0)
                  return s + r.idDelta[i] & 65535;
              }
            }
          }
      }
    return 0;
  }
  /**
   * Generates a unique RGB color for a character based on its index.
   * @param index The index of the character
   * @returns RGB color as a tuple [r, g, b]
   */
  _generateCharacterColor(A) {
    const e = A % 256, t = Math.floor(A / 256) % 256, r = Math.floor(A / 65536) % 256;
    return [e, t, r];
  }
  /**
   * Gets the color for a specific character.
   * @param character The character to get the color for
   * @param characters Array of TextmodeCharacter objects
   * @returns RGB color as a tuple [r, g, b], or [0, 0, 0] if not found
   */
  getCharacterColor(A, e) {
    if (!u.validate(
      typeof A == "string" && A.length === 1,
      "Character must be a single character string.",
      { method: "getCharacterColor", providedValue: A }
    ))
      return [0, 0, 0];
    const t = e.find((r) => r.character === A);
    return t ? t.color : [0, 0, 0];
  }
  /**
   * Gets colors for multiple characters.
   * @param characterString String of characters to get colors for
   * @param characters Array of TextmodeCharacter objects
   * @returns Array of RGB colors for each character
   */
  getCharacterColors(A, e) {
    return u.validate(
      typeof A == "string" && A.length > 0,
      "Characters must be a string with at least one character.",
      { method: "getCharacterColors", providedValue: A }
    ) ? A.split("").map((t) => this.getCharacterColor(t, e) || [0, 0, 0]) : [[0, 0, 0]];
  }
}
class rA {
  /**
   * Creates a new TextmodeFont instance.
   * @param renderer Renderer instance for texture creation
   * @param fontSize Font size to use for the texture atlas
   * @ignore
   */
  constructor(A, e = 16) {
    o(this, "_font");
    o(this, "_characters", []);
    o(this, "_fontFramebuffer");
    o(this, "_fontSize", 16);
    o(this, "_textureColumns", 0);
    o(this, "_textureRows", 0);
    o(this, "_maxGlyphDimensions", { width: 0, height: 0 });
    o(this, "_fontFace");
    o(this, "_fontFamilyName", "UrsaFont");
    // Component classes
    o(this, "_characterExtractor");
    o(this, "_textureAtlas");
    o(this, "_metricsCalculator");
    o(this, "_characterColorMapper");
    this._fontSize = e, this._characterExtractor = new q(), this._textureAtlas = new AA(A), this._metricsCalculator = new eA(), this._characterColorMapper = new tA();
  }
  /**
   * Initializes the font manager by loading the font and creating the texture atlas.
   * @param fontSource Optional URL to load a custom font. If not provided, uses embedded font (full builds only).
   * @returns Promise that resolves when initialization is complete
   * @ignore
   */
  async initialize(A) {
    let e;
    if (A) {
      const t = await fetch(A);
      if (!t.ok)
        throw new D(`Failed to load font file: ${t.status} ${t.statusText}`);
      e = await t.arrayBuffer();
    } else
      e = await (await fetch(Z)).arrayBuffer();
    await this._loadFontFace(e), this._font = Q.parse(e)[0], await this._initializeFont();
  }
  /**
   * Sets the font size for rendering.
   * @param size The font size to set. If undefined, returns the current font size.
   * @ignore
   */
  setFontSize(A) {
    if (A === void 0) return this._fontSize;
    this._fontSize = A, this._maxGlyphDimensions = this._metricsCalculator.calculateMaxGlyphDimensions(
      this._characters.map((t) => t.character),
      this._fontSize,
      this._fontFamilyName
    );
    const e = this._textureAtlas.createTextureAtlas(
      this._characters,
      this._maxGlyphDimensions,
      this._fontSize,
      this._fontFamilyName
    );
    this._fontFramebuffer = e.framebuffer, this._textureColumns = e.columns, this._textureRows = e.rows;
  }
  /**
   * Loads a new font from a file path.
   * @param fontPath Path to the .otf or .ttf font file
   * @returns Promise that resolves when font loading is complete
   * @ignore
   */
  async loadFont(A) {
    try {
      const e = await fetch(A);
      if (!e.ok)
        throw new D(`Failed to load font file: ${e.status} ${e.statusText}`);
      const t = await e.arrayBuffer();
      await this._loadFontFace(t);
      const r = Q.parse(t);
      if (!r || r.length === 0)
        throw new Error("Failed to parse font file");
      this._font = r[0], await this._initializeFont();
    } catch (e) {
      throw new D(`Failed to load font: ${e instanceof Error ? e.message : "Unknown error"}`, e);
    }
  }
  /**
   * Loads a FontFace from a font buffer.
   * @param fontBuffer ArrayBuffer containing font data
   */
  async _loadFontFace(A) {
    const e = Date.now();
    this._fontFamilyName = this._fontFamilyName === "UrsaFont" ? "UrsaFont" : `CustomFont_${e}`, this._fontFace = new FontFace(this._fontFamilyName, A), await this._fontFace.load(), document.fonts.add(this._fontFace);
  }
  /**
   * Initializes all font-dependent properties using the component classes.
   */
  async _initializeFont() {
    const A = this._characterExtractor.extractCharacters(this._font), e = this._characterExtractor.filterProblematicCharacters(A);
    this._characters = this._characterColorMapper.createCharacterObjects(e, this._font), this._maxGlyphDimensions = this._metricsCalculator.calculateMaxGlyphDimensions(
      e,
      this._fontSize,
      this._fontFamilyName
    );
    const t = this._textureAtlas.createTextureAtlas(
      this._characters,
      this._maxGlyphDimensions,
      this._fontSize,
      this._fontFamilyName
    );
    this._fontFramebuffer = t.framebuffer, this._textureColumns = t.columns, this._textureRows = t.rows;
  }
  /**
   * Get the color associated with a character.
   * @param character The character to get the color for.
   * @returns The RGB color as an array `[r, g, b]`.
   */
  getCharacterColor(A) {
    return this._characterColorMapper.getCharacterColor(A, this._characters);
  }
  /**
   * Get the colors associated with a string of characters.
   * @param characters The string of characters to get colors for.
   * @returns An array of RGB colors for each character in the string.
   * Each color is represented as an array `[r, g, b]`.
   */
  getCharacterColors(A) {
    return this._characterColorMapper.getCharacterColors(A, this._characters);
  }
  /**
   * Checks if all characters in the given string exist in the font.
   * @param str The string to check.
   * @returns `true` if all characters exist in the font, `false` otherwise.
   */
  hasAllCharacters(A) {
    if (typeof A != "string" || A.length === 0) return !1;
    const e = new Set(this._characters.map((t) => t.character));
    for (const t of A)
      if (!e.has(t)) return !1;
    return !0;
  }
  /** 
   * Returns the WebGL framebuffer containing the font texture atlas. 
   * @ignore
   */
  get fontFramebuffer() {
    return this._fontFramebuffer;
  }
  /** Returns the array of {@link TextmodeCharacter} objects in the font. */
  get characters() {
    return this._characters;
  }
  /** Returns the number of columns in the texture atlas. */
  get textureColumns() {
    return this._textureColumns;
  }
  /** Returns the number of rows in the texture atlas. */
  get textureRows() {
    return this._textureRows;
  }
  /** Returns the maximum dimensions of a glyph in the font. */
  get maxGlyphDimensions() {
    return this._maxGlyphDimensions;
  }
  /** Returns the font size used for rendering. */
  get fontSize() {
    return this._fontSize;
  }
  /** Returns the Typr.js font object. @ignore */
  get font() {
    return this._font;
  }
}
class iA {
  /**
   * Create a new grid instance.
   * @param canvas The canvas element used to determine the grid dimensions.
   * @param cellWidth The width of each cell in the grid.
   * @param cellHeight The height of each cell in the grid.
   * @ignore
   */
  constructor(A, e, t) {
    /** The number of columns in the grid. */
    o(this, "_cols");
    /** The number of rows in the grid. */
    o(this, "_rows");
    /** The total width of the grid in pixels. */
    o(this, "_width");
    /** The total height of the grid in pixels. */
    o(this, "_height");
    /** The offset to the outer canvas on the x-axis when centering the grid. */
    o(this, "_offsetX");
    /** The offset to the outer canvas on the y-axis when centering the grid. */
    o(this, "_offsetY");
    /** Whether the grid dimensions are fixed, or responsive based on the canvas dimensions. */
    o(this, "_fixedDimensions", !1);
    /** The canvas element used to determine the grid dimensions. */
    o(this, "_canvas");
    /** The width of each cell in the grid. */
    o(this, "_cellWidth");
    /** The height of each cell in the grid. */
    o(this, "_cellHeight");
    this._canvas = A, this._cellWidth = e, this._cellHeight = t, this.reset();
  }
  /**
   * Reset the grid to the default number of columns and rows based on the current canvas dimensions, and the grid cell dimensions.
   * @ignore
   */
  reset() {
    if (!this._fixedDimensions) {
      const A = this._canvas.getBoundingClientRect();
      let e = Math.round(A.width), t = Math.round(A.height);
      (e === 0 || t === 0) && (e = this._canvas.width, t = this._canvas.height), [this._cols, this._rows] = [Math.floor(e / this._cellWidth), Math.floor(t / this._cellHeight)];
    }
    this._resizeGrid();
  }
  /**
   * Reset the total grid width & height, and the offset to the outer canvas.
   */
  _resizeGrid() {
    const A = this._canvas.getBoundingClientRect();
    let e = Math.round(A.width), t = Math.round(A.height);
    (e === 0 || t === 0) && (e = this._canvas.width, t = this._canvas.height), this._width = this._cols * this._cellWidth, this._height = this._rows * this._cellHeight, this._offsetX = Math.floor((e - this._width) / 2), this._offsetY = Math.floor((t - this._height) / 2);
  }
  /**
   * Re-assign the grid cell dimensions and `reset()` the grid.
   * @param newCellWidth The new cell width.
   * @param newCellHeight The new cell height.
   * @ignore
   */
  resizeCellPixelDimensions(A, e) {
    [this._cellWidth, this._cellHeight] = [A, e], this.reset();
  }
  /**
   * Re-assign the grid dimensions and resize the grid. 
   * 
   * Calling this method makes the grid dimensions fixed, meaning they will not automatically resize based on the canvas dimensions.
   * @param newCols The new number of columns.
   * @param newRows The new number of rows.
   * @ignore
   */
  resizeGridDimensions(A, e) {
    this._fixedDimensions = !0, [this._cols, this._rows] = [A, e], this._resizeGrid();
  }
  /**
   * Make the grid dimensions flexible again, and `reset()` the grid.
   * @ignore
   */
  resetGridDimensions() {
    this._fixedDimensions = !1, this.reset();
  }
  /**
   * Update the canvas used by the grid, and reset the grid dimensions.
   * @param canvas The new canvas element to use for the grid.
   * @ignore
   */
  resize() {
    this._fixedDimensions ? this._resizeGrid() : this.reset();
  }
  /**
   * Gets or sets whether the grid dimensions *(columns and rows)* are fixed or responsive based on the canvas dimensions.
   * @param value Optional. `true` to make the grid dimensions fixed, or `false` to make them responsive. If not provided, returns the current state.
   * @returns If no parameter is provided, returns `true` if the grid dimensions are fixed, or `false` if they are responsive.
   * @ignore
   */
  fixedDimensions(A) {
    if (A === void 0)
      return this._fixedDimensions;
    this._fixedDimensions = A;
  }
  /** Returns the width of each cell in the grid. */
  get cellWidth() {
    return this._cellWidth;
  }
  /** Returns the height of each cell in the grid. */
  get cellHeight() {
    return this._cellHeight;
  }
  /** Returns the number of columns in the grid. */
  get cols() {
    return this._cols;
  }
  /** Returns the number of rows in the grid. */
  get rows() {
    return this._rows;
  }
  /** Returns the total width of the grid. */
  get width() {
    return this._width;
  }
  /** Returns the total height of the grid. */
  get height() {
    return this._height;
  }
  /** Returns the offset to the outer canvas borders on the x-axis when centering the grid. */
  get offsetX() {
    return this._offsetX;
  }
  /** Returns the offset to the outer canvas borders on the y-axis when centering the grid. */
  get offsetY() {
    return this._offsetY;
  }
}
class aA {
  constructor(A, e = !1, t = {}) {
    o(this, "_canvas");
    o(this, "captureSource");
    o(this, "_isStandalone");
    this.captureSource = A, this._isStandalone = e, this._canvas = this.createCanvas(t.width, t.height);
  }
  createCanvas(A, e) {
    var r;
    const t = document.createElement("canvas");
    if (t.className = "textmodeCanvas", this._isStandalone)
      t.width = A || 800, t.height = e || 600, t.style.width = A + "px", t.style.height = e + "px", document.body.appendChild(t);
    else {
      const i = this.captureSource.getBoundingClientRect();
      let a = Math.round(i.width), s = Math.round(i.height);
      if (this.captureSource instanceof HTMLVideoElement) {
        const E = this.captureSource;
        (a === 0 || s === 0) && E.videoWidth > 0 && E.videoHeight > 0 && (a = E.videoWidth, s = E.videoHeight);
      }
      t.width = a, t.height = s, t.style.width = a + "px", t.style.height = s + "px", t.style.position = "absolute", t.style.pointerEvents = "none";
      const B = window.getComputedStyle(this.captureSource);
      let g = parseInt(B.zIndex || "0", 10);
      isNaN(g) && (g = 0), t.style.zIndex = (g + 1).toString(), this.positionOverlayCanvas(t), (r = this.captureSource.parentNode) == null || r.insertBefore(t, this.captureSource.nextSibling);
    }
    return t;
  }
  positionOverlayCanvas(A) {
    const e = this.captureSource.getBoundingClientRect();
    let t = this.captureSource.offsetParent;
    if (t && t !== document.body) {
      const r = t.getBoundingClientRect();
      A.style.top = e.top - r.top + "px", A.style.left = e.left - r.left + "px";
    } else
      A.style.top = e.top + window.scrollY + "px", A.style.left = e.left + window.scrollX + "px";
  }
  resize(A, e) {
    if (this._isStandalone)
      this._canvas.width = A ?? this._canvas.width, this._canvas.height = e ?? this._canvas.height, this._canvas.style.width = (A ?? this._canvas.width) + "px", this._canvas.style.height = (e ?? this._canvas.height) + "px";
    else {
      const t = this.captureSource.getBoundingClientRect();
      let r = Math.round(t.width), i = Math.round(t.height);
      if (this.captureSource instanceof HTMLVideoElement) {
        const a = this.captureSource;
        (r === 0 || i === 0) && a.videoWidth > 0 && a.videoHeight > 0 && (r = a.videoWidth, i = a.videoHeight);
      }
      this._canvas.width = r, this._canvas.height = i, this._canvas.style.width = r + "px", this._canvas.style.height = i + "px", this.positionOverlayCanvas(this._canvas);
    }
  }
  /**
   * Get the WebGL context for the overlay canvas
   */
  getWebGLContext() {
    const A = {
      alpha: !0,
      premultipliedAlpha: !1,
      preserveDrawingBuffer: !0,
      antialias: !1,
      depth: !1,
      stencil: !1,
      powerPreference: "high-performance"
    }, e = this._canvas.getContext("webgl2", A) || this._canvas.getContext("webgl", A);
    if (!e)
      throw new D("WebGL context could not be created. Ensure your browser supports WebGL.");
    return e;
  }
  // Getters
  get canvas() {
    return this._canvas;
  }
  get width() {
    return this._canvas.width;
  }
  get height() {
    return this._canvas.height;
  }
}
class b {
  /**
   * Creates a new TextmodeConverter instance.
   * @param renderer Renderer instance for texture creation
   * @param fontManager Font manager for character extraction and color mapping
   * @param grid Grid instance for managing textmode layout
   * @param options Additional options for the converter
   * @ignore
   */
  constructor(A, e, t, r = {}) {
    o(this, "renderer");
    o(this, "fontManager");
    o(this, "grid");
    o(this, "_characterFramebuffer");
    o(this, "_primaryColorFramebuffer");
    o(this, "_secondaryColorFramebuffer");
    o(this, "_rotationFramebuffer");
    o(this, "_transformFramebuffer");
    o(this, "_options");
    this.renderer = A, this.fontManager = e, this.grid = t, this._options = r, this._characterFramebuffer = this.renderer.createFramebuffer(this.grid.cols, this.grid.rows), this._primaryColorFramebuffer = this.renderer.createFramebuffer(this.grid.cols, this.grid.rows), this._secondaryColorFramebuffer = this.renderer.createFramebuffer(this.grid.cols, this.grid.rows), this._rotationFramebuffer = this.renderer.createFramebuffer(this.grid.cols, this.grid.rows), this._transformFramebuffer = this.renderer.createFramebuffer(this.grid.cols, this.grid.rows);
  }
  /**
   * Resizes all internal framebuffers to match the grid dimensions.
   * @ignore
   */
  resize() {
    this._characterFramebuffer.resize(this.grid.cols, this.grid.rows), this._primaryColorFramebuffer.resize(this.grid.cols, this.grid.rows), this._secondaryColorFramebuffer.resize(this.grid.cols, this.grid.rows), this._rotationFramebuffer.resize(this.grid.cols, this.grid.rows), this._transformFramebuffer.resize(this.grid.cols, this.grid.rows);
  }
  /**
   * Enables or disables the converter.
   * @param enabled Whether to enable or disable the converter.
   */
  enabled(A) {
    this._options.enabled = A;
  }
  /**
   * Enables the converter.
   */
  enable() {
    this.enabled(!0);
  }
  /**
   * Disables the converter.
   */
  disable() {
    this.enabled(!1);
  }
  /** Returns the framebuffer containing character data. */
  get characterFramebuffer() {
    return this._characterFramebuffer;
  }
  /** Returns the framebuffer containing primary color data. */
  get primaryColorFramebuffer() {
    return this._primaryColorFramebuffer;
  }
  /** Returns the framebuffer containing secondary color data. */
  get secondaryColorFramebuffer() {
    return this._secondaryColorFramebuffer;
  }
  /** Returns the framebuffer containing rotation data. */
  get rotationFramebuffer() {
    return this._rotationFramebuffer;
  }
  /** Returns the framebuffer containing transformation data. */
  get transformFramebuffer() {
    return this._transformFramebuffer;
  }
  /** Returns the renderer used by this converter. */
  get options() {
    return this._options;
  }
}
class nA {
  /**
   * Create a new color palette instance.
   * @param renderer The renderer instance.
   * @param colors The RGB colors to store as [r, g, b] arrays where values are 0-255.
   */
  constructor(A, e) {
    /** The framebuffer used to store the color palette. */
    o(this, "_framebuffer");
    o(this, "_renderer");
    o(this, "_colors");
    this._renderer = A, this._colors = e;
    const t = Math.max(this._colors.length, 1);
    this._framebuffer = this._renderer.createFramebuffer(t, 1), this._updateFramebuffer();
  }
  /**
   * Update the framebuffer with the currently selected colors.
   */
  _updateFramebuffer() {
    if (!this._framebuffer) return;
    const A = Math.max(this._colors.length, 1), e = 1;
    this._framebuffer.width !== A && this._framebuffer.resize(A, e);
    const t = new Uint8Array(A * e * 4);
    for (let r = 0; r < A; r++) {
      const i = r < this._colors.length ? this._colors[r] : [0, 0, 0], a = r * 4;
      t[a] = i[0], t[a + 1] = i[1], t[a + 2] = i[2], t[a + 3] = 255;
    }
    this._framebuffer.updatePixels(t, A, e);
  }
  /**
   * Sets the colors of the palette and updates the framebuffer.
   * @param newColors The new RGB colors to set as [r, g, b] arrays.
   */
  setColors(A) {
    this._colors = A, this._updateFramebuffer();
  }
  /**
   * Get the colors of the palette.
   */
  get colors() {
    return this._colors;
  }
  /**
   * Get the framebuffer containing the colors of the palette.
   */
  get framebuffer() {
    return this._framebuffer;
  }
  /**
   * Get the texture from the framebuffer for use in shaders.
   */
  get texture() {
    return this._framebuffer.texture;
  }
}
class S extends b {
  constructor(e, t, r, i = {}) {
    super(e, t, r, i);
    o(this, "palette");
    this.palette = new nA(this.renderer, this.fontManager.getCharacterColors(" .:-=+*%@#"));
  }
  /**
   * Sets the characters used for mapping.
   * @param characters The characters to use for mapping, usually ordered from darkest to brightest.
   */
  characters(e) {
    u.validate(
      this.fontManager.hasAllCharacters(e),
      "One or more characters do not exist in the current font.",
      { method: "characters", providedValue: e }
    ) && (this._options.characters = e, this.palette.setColors(this.fontManager.getCharacterColors(e)));
  }
  /**
   * Sets the color of the characters affected by the converter.
   * This is only used when `characterColorMode` is set to `'fixed'`.
   * @param r Red component (0-255).
   * @param g Green component (0-255).
   * @param b Blue component (0-255).
   * @param a Alpha component (0-255).
   */
  characterColor(e, t = e, r = e, i = 255) {
    u.validate(
      [e, t, r, i].every((a) => a >= 0 && a <= 255),
      "Character color values must be between 0 and 255",
      { method: "characterColor", providedValues: { r: e, g: t, b: r, a: i } }
    ) && (this._options.characterColor = [e, t, r, i]);
  }
  /**
   * Sets the character color mode.
   * - `'sampled'`: Uses sampled colors from the source texture.
   * - `'fixed'`: Uses a fixed color set by `characterColor()`.
   * @param mode The color mode to use for characters.
   */
  characterColorMode(e) {
    u.validate(
      ["sampled", "fixed"].includes(e),
      "Invalid character color mode. Must be 'sampled' or 'fixed'.",
      { method: "characterColorMode", providedValue: e }
    ) && (this._options.characterColorMode = e);
  }
  /**
   * Sets the cell color for all cells affected by the converter.
   * This is only used when `cellColorMode` is set to `'fixed'`.
   * @param r Red component (0-255).
   * @param g Green component (0-255).
   * @param b Blue component (0-255).
   * @param a Alpha component (0-255).
   */
  cellColor(e, t = e, r = e, i = 255) {
    u.validate(
      [e, t, r, i].every((a) => a >= 0 && a <= 255),
      "Cell color values must be between 0 and 255",
      { method: "cellColor", providedValues: { r: e, g: t, b: r, a: i } }
    ) && (this._options.cellColor = [e, t, r, i]);
  }
  /**
   * Sets the cell color mode.
   * - `'sampled'`: Uses sampled colors from the source texture.
   * - `'fixed'`: Uses a fixed color set via {@link cellColor}.
   * @param mode The color mode to use for background cells.
   */
  cellColorMode(e) {
    u.validate(
      ["sampled", "fixed"].includes(e),
      "Invalid cell color mode. Must be 'sampled' or 'fixed'.",
      { method: "cellColorMode", providedValue: e }
    ) && (this._options.cellColorMode = e);
  }
  /**
   * Swaps the character and cell color.
   * @param invert If `true`, the character color becomes the cell color and vice versa.
   */
  invert(e) {
    u.validate(
      typeof e == "boolean" || typeof e == "number" && Number.isInteger(e),
      "Invert must be a boolean value or an integer (0 for false, any other number for true).",
      { method: "invert", providedValue: e }
    ) && (this._options.invert = !!e);
  }
  /**
   * Sets the rotation angle for the characters.
   * @param angle The rotation angle in degrees.
   */
  rotation(e) {
    if (!u.validate(
      typeof e == "number",
      "Rotation angle must be a number.",
      { method: "rotation", providedValue: e }
    ))
      return;
    e = e % 360, e < 0 && (e += 360);
    const t = e * 255 / 360, r = Math.floor(t) / 255, i = Math.round(t - r);
    this._options.rotation = [r, i, 0, 1];
  }
  /**
   * Flips the characters horizontally.
   * @param flip If `true`, characters are flipped horizontally. If `false`, no flip is applied.
   */
  flipHorizontally(e) {
    u.validate(
      typeof e == "boolean" || typeof e == "number" && Number.isInteger(e),
      "Flip horizontally must be a boolean value or an integer (0 for false, any other number for true).",
      { method: "flipHorizontally", providedValue: e }
    ) && (this._options.flipHorizontally = !!e);
  }
  /**
   * Flips the characters vertically.
   * @param flip If `true`, characters are flipped vertically. If `false`, no flip is applied.
   */
  flipVertically(e) {
    u.validate(
      typeof e == "boolean" || typeof e == "number" && Number.isInteger(e),
      "Flip vertically must be a boolean value or an integer (0 for false, any other number for true).",
      { method: "flipVertically", providedValue: e }
    ) && (this._options.flipVertically = !!e);
  }
}
var sA = "precision lowp float;uniform sampler2D u_sketchTexture;uniform vec2 u_gridCellDimensions;uniform vec2 u_brightnessRange;varying vec2 v_uv;void main(){vec2 cellCenter=(floor(v_uv*u_gridCellDimensions)+vec2(0.5))/u_gridCellDimensions;vec4 color=texture2D(u_sketchTexture,cellCenter);float brightness=dot(color.rgb,vec3(0.299,0.587,0.114));float brightnessValue=brightness*255.0;if(brightnessValue>=u_brightnessRange.x&&brightnessValue<=u_brightnessRange.y){gl_FragColor=color;}else{gl_FragColor=vec4(0.0);}}", oA = "precision lowp float;uniform sampler2D u_sampleTexture;uniform vec4 u_fillColor;uniform bool u_useFixedColor;varying vec2 v_uv;void main(){vec4 sampleColor=texture2D(u_sampleTexture,v_uv);if(sampleColor.a>0.0){if(u_useFixedColor){gl_FragColor=u_fillColor;}else{gl_FragColor=sampleColor;}}else{gl_FragColor=vec4(0.0);}}", BA = "precision lowp float;uniform sampler2D u_sampleTexture;uniform bool u_invert;uniform bool u_flipHorizontally;uniform bool u_flipVertically;varying vec2 v_uv;void main(){vec4 sampleColor=texture2D(u_sampleTexture,v_uv);if(sampleColor.a>0.0){float invertValue=u_invert ? 1.0 : 0.0;float flipHValue=u_flipHorizontally ? 1.0 : 0.0;float flipVValue=u_flipVertically ? 1.0 : 0.0;gl_FragColor=vec4(invertValue,flipHValue,flipVValue,1.0);}else{gl_FragColor=vec4(0.0);}}", gA = "precision lowp float;uniform sampler2D u_sampleTexture;uniform vec4 u_rotation;varying vec2 v_uv;void main(){vec4 sampleColor=texture2D(u_sampleTexture,v_uv);if(sampleColor.a>0.0){gl_FragColor=u_rotation;}else{gl_FragColor=vec4(0.0);}}", EA = "precision lowp float;uniform sampler2D u_colorSampleFramebuffer;uniform sampler2D u_charPaletteTexture;uniform vec2 u_charPaletteSize;uniform vec2 u_brightnessRange;varying vec2 v_uv;void main(){vec4 color=texture2D(u_colorSampleFramebuffer,v_uv);if(color.a==0.0){gl_FragColor=vec4(0.0);return;}float brightness=dot(color.rgb,vec3(0.299,0.587,0.114))*255.0;vec2 range=u_brightnessRange;if(brightness<range.x||brightness>range.y){gl_FragColor=vec4(0.0);return;}float t=(brightness-range.x)/(range.y-range.x);float idx=clamp(floor(t*u_charPaletteSize.x),0.0,u_charPaletteSize.x-1.0);vec3 charColor=texture2D(u_charPaletteTexture,vec2((idx+0.5)/u_charPaletteSize.x,0.0)).rgb;gl_FragColor=vec4(charColor,1.0);}";
const QA = {
  /** Enable/disable the renderer */
  enabled: !0,
  /** Characters used for brightness mapping (from darkest to brightest) */
  characters: " .:-=+*%@#",
  /** Color of the ASCII characters. Only used when `characterColorMode` is set to `fixed` */
  characterColor: [255, 255, 255, 255],
  /** Character color mode */
  characterColorMode: "sampled",
  /** Cell background color. Only used when `characterColorMode` is set to `fixed` */
  cellColor: [0, 0, 0, 255],
  /** Background color mode */
  cellColorMode: "fixed",
  /** Swap the cells ASCII character colors with it's cell background colors */
  invert: !1,
  /** Rotation angle of all characters in the grid in degrees */
  rotation: [0, 0, 0, 255],
  /** Flip the ASCII characters horizontally */
  flipHorizontally: !1,
  /** Flip the ASCII characters vertically */
  flipVertically: !1,
  /** Range of brightness values to map to ASCII characters */
  brightnessRange: [0, 255]
};
class M extends S {
  /**
   * Creates a new TextmodeBrightnessConverter instance.
   * @param renderer Renderer instance for texture creation
   * @param fontManager Font manager for character extraction and color mapping
   * @param grid Grid manager for layout and positioning
   * @ignore
   */
  constructor(e, t, r) {
    super(e, t, r, { ...QA });
    o(this, "sampleShader");
    o(this, "colorFillShader");
    o(this, "charMappingShader");
    o(this, "transformFillShader");
    o(this, "rotationFillShader");
    o(this, "sampleFramebuffer");
    this.sampleShader = new w(e.context, p, sA), this.colorFillShader = new w(e.context, p, oA), this.transformFillShader = new w(e.context, p, BA), this.rotationFillShader = new w(e.context, p, gA), this.charMappingShader = new w(e.context, p, EA), this.sampleFramebuffer = this.renderer.createFramebuffer(this.grid.cols, this.grid.rows);
  }
  convert(e) {
    this.sampleFramebuffer.begin(), this.renderer.clear(), this.renderer.shader(this.sampleShader), this.renderer.setUniform("u_sketchTexture", e), this.renderer.setUniform("u_gridCellDimensions", [this.grid.cols, this.grid.rows]), this.renderer.setUniform("u_brightnessRange", this._options.brightnessRange), this.renderer.rect(0, 0, this.grid.cols, this.grid.rows), this.sampleFramebuffer.end(), this._primaryColorFramebuffer.begin(), this.renderer.clear(), this.renderer.shader(this.colorFillShader), this.renderer.setUniform("u_sampleTexture", this.sampleFramebuffer.texture), this.renderer.setUniform("u_fillColor", this._options.characterColor), this.renderer.setUniform("u_useFixedColor", this._options.characterColorMode === "fixed"), this.renderer.rect(0, 0, this.grid.cols, this.grid.rows), this._primaryColorFramebuffer.end(), this._secondaryColorFramebuffer.begin(), this.renderer.clear(), this.renderer.shader(this.colorFillShader), this.renderer.setUniform("u_sampleTexture", this.sampleFramebuffer.texture), this.renderer.setUniform("u_fillColor", this._options.cellColor), this.renderer.setUniform("u_useFixedColor", this._options.cellColorMode === "fixed"), this.renderer.rect(0, 0, this.grid.cols, this.grid.rows), this._secondaryColorFramebuffer.end(), this._transformFramebuffer.begin(), this.renderer.clear(), this.renderer.shader(this.transformFillShader), this.renderer.setUniform("u_sampleTexture", this.sampleFramebuffer.texture), this.renderer.setUniform("u_invert", this._options.invert), this.renderer.setUniform("u_flipHorizontally", this._options.flipHorizontally), this.renderer.setUniform("u_flipVertically", this._options.flipVertically), this.renderer.rect(0, 0, this.grid.cols, this.grid.rows), this._transformFramebuffer.end(), this._rotationFramebuffer.begin(), this.renderer.clear(), this.renderer.shader(this.rotationFillShader), this.renderer.setUniform("u_sampleTexture", this.sampleFramebuffer.texture), this.renderer.setUniform("u_rotation", this._options.rotation), this.renderer.rect(0, 0, this.grid.cols, this.grid.rows), this._rotationFramebuffer.end(), this._characterFramebuffer.begin(), this.renderer.clear(0, 0, 0, 0), this.renderer.shader(this.charMappingShader), this.renderer.setUniform("u_colorSampleFramebuffer", this.sampleFramebuffer.texture), this.renderer.setUniform("u_charPaletteTexture", this.palette.texture), this.renderer.setUniform("u_charPaletteSize", [this.palette.colors.length, 1]), this.renderer.setUniform("u_brightnessRange", this._options.brightnessRange), this.renderer.rect(0, 0, this.grid.cols, this.grid.rows), this._characterFramebuffer.end();
  }
  resize() {
    super.resize(), this.sampleFramebuffer.resize(this.grid.cols, this.grid.rows);
  }
  /**
   * Sets the brightness range for ASCII character mapping.
   * 
   * Cells that sample outside this range are rendered as transparent.
   * 
   * @param range Array of two numbers `[min, max]`, where `min` is darkest and `max` is brightest.
   */
  brightnessRange(e) {
    u.validate(
      Array.isArray(e) && e.length === 2 && e.every((t) => typeof t == "number" && t >= 0 && t <= 255),
      "Brightness range must be an array of two numbers between 0 and 255.",
      { method: "brightnessRange", providedValue: e }
    ) && (this._options.brightnessRange = e);
  }
}
const vA = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  TextmodeBrightnessConverter: M,
  TextmodeConverter: b,
  TextmodeFeatureConverter: S
}, Symbol.toStringTag, { value: "Module" }));
var lA = "precision mediump float;uniform sampler2D u_characterTexture;uniform vec2 u_charsetDimensions;uniform sampler2D u_primaryColorTexture;uniform sampler2D u_secondaryColorTexture;uniform sampler2D u_transformTexture;uniform sampler2D u_asciiCharacterTexture;uniform sampler2D u_rotationTexture;uniform sampler2D u_captureTexture;uniform vec2 u_captureDimensions;uniform int u_backgroundMode;uniform vec2 u_gridCellDimensions;uniform vec2 u_gridPixelDimensions;mat2 rotate2D(float angle){float s=sin(angle);float c=cos(angle);return mat2(c,-s,s,c);}void main(){vec2 adjustedCoord=gl_FragCoord.xy/u_gridPixelDimensions;vec2 gridCoord=adjustedCoord*u_gridCellDimensions;vec2 cellCoord=floor(gridCoord);vec2 charIndexTexCoord=(cellCoord+0.5)/u_gridCellDimensions;vec4 primaryColor=texture2D(u_primaryColorTexture,charIndexTexCoord);vec4 secondaryColor=texture2D(u_secondaryColorTexture,charIndexTexCoord);vec4 transformColor=texture2D(u_transformTexture,charIndexTexCoord);bool isInverted=transformColor.r>0.5;bool flipHorizontal=transformColor.g>0.5;bool flipVertical=transformColor.b>0.5;vec4 encodedIndexVec=texture2D(u_asciiCharacterTexture,charIndexTexCoord);if(encodedIndexVec.a<0.01){gl_FragColor=(u_backgroundMode==0)? vec4(0.0):texture2D(u_captureTexture,gl_FragCoord.xy/u_captureDimensions);return;}int charIndex=int(encodedIndexVec.r*255.0+0.5)+int(encodedIndexVec.g*255.0+0.5)*256;int charCol=int(mod(float(charIndex),u_charsetDimensions.x));int charRow=charIndex/int(u_charsetDimensions.x);vec2 charCoord=vec2(charCol,charRow)/u_charsetDimensions;vec4 rotationColor=texture2D(u_rotationTexture,charIndexTexCoord);float scaledAngle=rotationColor.r*255.0+rotationColor.g;float rotationAngle=(scaledAngle*360.0/255.0)*0.017453292;vec2 fractionalPart=fract(gridCoord)-0.5;if(flipHorizontal)fractionalPart.x=-fractionalPart.x;if(flipVertical)fractionalPart.y=-fractionalPart.y;fractionalPart=rotate2D(rotationAngle)*fractionalPart+0.5;vec2 cellSize=1.0/u_charsetDimensions;vec2 texCoord=charCoord+fractionalPart*cellSize;vec2 cellMax=charCoord+cellSize;if(any(lessThan(texCoord,charCoord))||any(greaterThan(texCoord,cellMax))){gl_FragColor=isInverted ? primaryColor : secondaryColor;return;}vec4 charTexel=texture2D(u_characterTexture,texCoord);if(isInverted)charTexel.rgb=1.0-charTexel.rgb;gl_FragColor=mix(secondaryColor,primaryColor,charTexel);}";
class hA {
  /**
   * Creates an instance of TextmodeConversionPipeline.
   * @param renderer The renderer to use for the pipeline.
   * @param font The textmode font to use.
   * @param grid The textmode grid to use.
   * @ignore
   */
  constructor(A, e, t) {
    o(this, "renderer");
    o(this, "font");
    o(this, "grid");
    o(this, "converters");
    o(this, "_resultFramebuffer");
    o(this, "_asciiShader");
    o(this, "_characterFramebuffer");
    o(this, "_primaryColorFramebuffer");
    o(this, "_secondaryColorFramebuffer");
    o(this, "_rotationFramebuffer");
    o(this, "_transformFramebuffer");
    this.renderer = A, this.font = e, this.grid = t, this._asciiShader = this.renderer.createShader(p, lA), this.converters = [
      { name: "brightness", converter: new M(A, e, t) },
      { name: "custom", converter: new b(A, e, t) }
    ], this._characterFramebuffer = this.renderer.createFramebuffer(t.cols, t.rows), this._primaryColorFramebuffer = this.renderer.createFramebuffer(t.cols, t.rows), this._secondaryColorFramebuffer = this.renderer.createFramebuffer(t.cols, t.rows), this._rotationFramebuffer = this.renderer.createFramebuffer(t.cols, t.rows), this._transformFramebuffer = this.renderer.createFramebuffer(t.cols, t.rows), this._resultFramebuffer = this.renderer.createFramebuffer(this.grid.width, this.grid.height);
  }
  /**
   * Performs the conversion process by applying all converters in the pipeline.
   * @param sourceFramebuffer The source framebuffer to convert.
   * @ignore
   */
  render(A) {
    for (const t of this.converters) {
      const r = t.converter;
      r.options.enabled && r instanceof S && r.convert(A);
    }
    const e = (t, r) => {
      t.begin(), this.renderer.clear();
      for (const i of this.converters) {
        const a = i.converter;
        a.options.enabled && this.renderer.image(r(a), 0, 0);
      }
      t.end();
    };
    e(this._characterFramebuffer, (t) => t.characterFramebuffer), e(this._primaryColorFramebuffer, (t) => t.primaryColorFramebuffer), e(this._secondaryColorFramebuffer, (t) => t.secondaryColorFramebuffer), e(this._rotationFramebuffer, (t) => t.rotationFramebuffer), e(this._transformFramebuffer, (t) => t.transformFramebuffer), this._resultFramebuffer.begin(), this.renderer.clear(), this.renderer.shader(this._asciiShader), this.renderer.setUniform("u_characterTexture", this.font.fontFramebuffer), this.renderer.setUniform("u_charsetDimensions", [this.font.textureColumns, this.font.textureRows]), this.renderer.setUniform("u_asciiCharacterTexture", this._characterFramebuffer.texture), this.renderer.setUniform("u_primaryColorTexture", this._primaryColorFramebuffer.texture), this.renderer.setUniform("u_secondaryColorTexture", this._secondaryColorFramebuffer.texture), this.renderer.setUniform("u_transformTexture", this._transformFramebuffer.texture), this.renderer.setUniform("u_rotationTexture", this._rotationFramebuffer.texture), this.renderer.setUniform("u_captureTexture", A.texture), this.renderer.setUniform("u_backgroundMode", !1), this.renderer.setUniform("u_captureDimensions", [A.width, A.height]), this.renderer.setUniform("u_gridCellDimensions", [this.grid.cols, this.grid.rows]), this.renderer.setUniform("u_gridPixelDimensions", [this.grid.width, this.grid.height]), this.renderer.rect(0, 0, this._resultFramebuffer.width, this._resultFramebuffer.height), this._resultFramebuffer.end();
  }
  /**
   * Get a specific converter by name.
   * @param name The name of the converter to retrieve.
   * @returns The requested `TextmodeConverter` instance.
   */
  get(A) {
    if (!u.validate(
      typeof A == "string" && A.length > 0,
      "Converter name must be a non-empty string.",
      { method: "converter", providedValue: A }
    ))
      return;
    const e = this.converters.find((r) => r.name === A), t = e == null ? void 0 : e.converter;
    if (u.validate(
      t instanceof b,
      `Converter "${A}" is not a valid TextmodeConverter.`,
      { method: "converter", providedValue: A, converterInstance: t }
    ))
      return t;
  }
  /**
   * Adds a new converter to the pipeline.
   * @param name A unique name for the converter.
   * @param type The type of converter to add. Can be either "brightness" or "custom".
   * @returns The newly created {@link TextmodeConverter} instance or `void` if the addition failed.
   */
  add(A, e) {
    if (!u.validate(
      typeof A == "string" && A.length > 0,
      "Converter name must be a non-empty string.",
      { method: "add", providedValue: A }
    ) || !u.validate(
      e === "brightness" || e === "custom",
      `Converter type must be either "brightness" or "custom". Provided: ${e}`,
      { method: "add", providedValue: e }
    ))
      return;
    let t;
    return e === "brightness" ? t = new M(this.renderer, this.font, this.grid) : t = new b(this.renderer, this.font, this.grid), this.converters.push({ name: A, converter: t }), t;
  }
  /**
  * Removes a converter from the pipeline by name or instance.
  * @param nameOrInstance The unique name of the converter or the converter instance to remove.
  * @returns `true` if the converter was successfully removed, `false` otherwise.
  */
  remove(A) {
    if (!u.validate(
      typeof A == "string" || A instanceof b,
      "Parameter must be either a string (converter name) or a TextmodeConverter instance.",
      { method: "remove", providedValue: A }
    ))
      return !1;
    let e = -1;
    if (typeof A == "string") {
      if (!u.validate(
        A.length > 0,
        "Converter name must be a non-empty string.",
        { method: "remove", providedValue: A }
      ))
        return !1;
      e = this.converters.findIndex((t) => t.name === A);
    } else
      e = this.converters.findIndex((t) => t.converter === A);
    return u.validate(
      e !== -1,
      typeof A == "string" ? `Converter with name "${A}" not found in pipeline.` : "Converter instance not found in pipeline.",
      { method: "remove", providedValue: A, convertersCount: this.converters.length }
    ) ? (this.converters.splice(e, 1), !0) : !1;
  }
  /**
   * Returns the framebuffer containing the textmode conversion result.
   */
  get texture() {
    return this._resultFramebuffer;
  }
  /**
   * Resizes all internal framebuffers.
   * @ignore
   */
  resize() {
    this._resultFramebuffer.resize(this.grid.width, this.grid.height), this._characterFramebuffer.resize(this.grid.cols, this.grid.rows), this._primaryColorFramebuffer.resize(this.grid.cols, this.grid.rows), this._secondaryColorFramebuffer.resize(this.grid.cols, this.grid.rows), this._rotationFramebuffer.resize(this.grid.cols, this.grid.rows), this._transformFramebuffer.resize(this.grid.cols, this.grid.rows);
    for (const A of this.converters)
      A.converter.resize();
  }
  /**
   * Checks if any converter in the pipeline is enabled.
   * @returns `true` if any converter is enabled, `false` otherwise.
   */
  hasEnabledConverters() {
    return this.converters.some((A) => A.converter.options.enabled);
  }
  /**
   * Disables all converters in the pipeline.
   */
  disable() {
    for (const A of this.converters)
      A.converter.disable();
  }
  /**
   * Enables all converters in the pipeline.
   */
  enable() {
    for (const A of this.converters)
      A.converter.enable();
  }
  /** Returns the character framebuffer containing the combined result of all converters. @ignore */
  get characterFramebuffer() {
    return this._characterFramebuffer;
  }
  /** Returns the primary color framebuffer containing the combined result of all converters. @ignore */
  get primaryColorFramebuffer() {
    return this._primaryColorFramebuffer;
  }
  /** Returns the secondary color framebuffer containing the combined result of all converters. @ignore */
  get secondaryColorFramebuffer() {
    return this._secondaryColorFramebuffer;
  }
  /** Returns the rotation framebuffer containing the combined result of all converters. @ignore */
  get rotationFramebuffer() {
    return this._rotationFramebuffer;
  }
  /** Returns the transform framebuffer containing the combined result of all converters. @ignore */
  get transformFramebuffer() {
    return this._transformFramebuffer;
  }
}
class U {
  /**
   * Extracts pixel data from all framebuffers needed for export
   * @param pipeline The conversion pipeline containing framebuffers
   * @returns Object containing all pixel data arrays
   */
  extractFramebufferData(A) {
    const e = A.get("brightness"), t = e == null ? void 0 : e.characterFramebuffer, r = e == null ? void 0 : e.primaryColorFramebuffer, i = e == null ? void 0 : e.secondaryColorFramebuffer, a = e == null ? void 0 : e.transformFramebuffer, s = e == null ? void 0 : e.rotationFramebuffer;
    return t == null || t.loadPixels(), r == null || r.loadPixels(), i == null || i.loadPixels(), a == null || a.loadPixels(), s == null || s.loadPixels(), {
      characterPixels: (t == null ? void 0 : t.pixels) || new Uint8Array(0),
      primaryColorPixels: (r == null ? void 0 : r.pixels) || new Uint8Array(0),
      secondaryColorPixels: (i == null ? void 0 : i.pixels) || new Uint8Array(0),
      transformPixels: (a == null ? void 0 : a.pixels) || new Uint8Array(0),
      rotationPixels: (s == null ? void 0 : s.pixels) || new Uint8Array(0)
    };
  }
  /**
   * Gets character index from character framebuffer pixels
   * @param characterPixels Character framebuffer pixel data
   * @param pixelIndex Index in the pixel array (already multiplied by 4 for RGBA)
   * @param charactersLength Total number of available characters
   * @returns Character index
   */
  getCharacterIndex(A, e) {
    const t = A[e], r = A[e + 1];
    return t + (r << 8);
  }
  /**
   * Converts raw pixel data to RGBA color object
   * @param pixels Pixel data array
   * @param index Pixel index (already multiplied by 4 for RGBA)
   * @returns RGBA color object with r, g, b, a properties
   */
  pixelsToRGBA(A, e) {
    return {
      r: A[e],
      g: A[e + 1],
      b: A[e + 2],
      a: A[e + 3]
    };
  }
}
class R {
  /**
   * Creates a downloadable blob from content
   * @param content The content to include in the blob
   * @param mimeType The MIME type for the blob
   * @returns Blob object containing the content
   */
  createBlob(A, e) {
    return new Blob([A], { type: e });
  }
  /**
   * Creates a data URL from content
   * @param content The content to convert
   * @param mimeType The MIME type for the blob
   * @returns Data URL string
   */
  createDataURL(A, e) {
    const t = this.createBlob(A, e);
    return URL.createObjectURL(t);
  }
  /**
   * Downloads content as a file
   * @param content The content to download
   * @param filename The filename (with extension)
   * @param mimeType The MIME type for the content
   */
  downloadFile(A, e, t) {
    try {
      const r = this.createBlob(A, t), i = URL.createObjectURL(r), a = document.createElement("a");
      a.href = i, a.download = e, a.style.display = "none", a.rel = "noopener", document.body.appendChild(a), a.click(), document.body.removeChild(a), URL.revokeObjectURL(i);
    } catch (r) {
      throw console.error("Failed to download file:", r), new Error(`File download failed: ${r instanceof Error ? r.message : "Unknown error"}`);
    }
  }
  /**
   * Generates a timestamp string for filenames
   * @returns Formatted timestamp string
   */
  generateTimestamp() {
    return (/* @__PURE__ */ new Date()).toISOString().slice(0, 19).replace(/:/g, "-");
  }
  /**
   * Generates a date-time string for filenames (alternative format)
   * @returns Formatted date and time string
   */
  generateDateTimeString() {
    const A = /* @__PURE__ */ new Date(), e = A.toISOString().split("T")[0], t = A.toTimeString().split(" ")[0].replace(/:/g, "-");
    return { date: e, time: t };
  }
  /**
   * Validates and sanitizes filename for safety and compatibility
   * @param filename The filename to validate
   * @returns Sanitized filename
   */
  sanitizeFilename(A) {
    return A.replace(/[<>:"/\\|?*]/g, "_").replace(/\s+/g, "_").replace(/_{2,}/g, "_").replace(/^_+|_+$/g, "").substring(0, 255);
  }
  /**
   * Ensures filename has the correct extension
   * @param filename The filename to check
   * @param expectedExtension The expected file extension (with dot)
   * @returns Filename with correct extension
   */
  ensureFileExtension(A, e) {
    return A.toLowerCase().endsWith(e.toLowerCase()) ? A : A + e;
  }
  /**
   * Generates a default filename with prefix and timestamp
   * @param prefix The prefix for the filename
   * @param extension The file extension (with dot)
   * @returns Generated filename
   */
  generateDefaultFilename(A, e) {
    const t = this.generateTimestamp();
    return `${A}-${t}${e}`;
  }
}
class cA extends U {
  /**
   * Extracts transform data from transform pixels
   * @param transformPixels Transform framebuffer pixels
   * @param rotationPixels Rotation framebuffer pixels
   * @param pixelIndex Pixel index in the array
   * @returns Transform data object
   */
  extractTransformData(A, e, t) {
    const r = A[t], i = A[t + 1], a = A[t + 2], s = r === 255, B = i === 255, g = a === 255, E = e[t], l = e[t + 1], h = E + l / 255, d = Math.round(h * 360 / 255 * 100) / 100;
    return {
      isInverted: s,
      flipHorizontal: B,
      flipVertical: g,
      rotation: d
    };
  }
  /**
   * Calculates cell position information
   * @param x Grid X coordinate
   * @param y Grid Y coordinate
   * @param gridInfo Grid information
   * @returns Position data object
   */
  calculateCellPosition(A, e, t) {
    return {
      x: A,
      y: e,
      cellX: A * t.cellWidth,
      cellY: e * t.cellHeight
    };
  }
  /**
   * Processes all grid cells and extracts SVG cell data
   * @param framebufferData Raw pixel data from framebuffers
   * @param grid Grid information
   * @param font Font information
   * @returns Array of SVG cell data objects
   */
  extractSVGCellData(A, e) {
    const t = [];
    let r = 0;
    for (let i = 0; i < e.rows; i++)
      for (let a = 0; a < e.cols; a++) {
        const s = r * 4, B = this.getCharacterIndex(
          A.characterPixels,
          s
        );
        let g = this.pixelsToRGBA(A.primaryColorPixels, s), E = this.pixelsToRGBA(A.secondaryColorPixels, s);
        const l = this.extractTransformData(
          A.transformPixels,
          A.rotationPixels,
          s
        );
        if (l.isInverted) {
          const d = g;
          g = E, E = d;
        }
        const h = this.calculateCellPosition(a, i, e);
        t.push({
          charIndex: B,
          primaryColor: g,
          secondaryColor: E,
          transform: l,
          position: h
        }), r++;
      }
    return t;
  }
}
class uA {
  /**
   * Gets the glyph index for a given Unicode code point in a Typr.js font
   * @param fontData The Typr.js font data
   * @param codePoint The Unicode code point to look up
   * @returns The glyph index, or 0 if not found
   */
  getGlyphIndex(A, e) {
    const t = A.cmap;
    if (!t || !t.tables) return 0;
    for (const r of t.tables)
      if (r.format === 4) {
        for (let i = 0; i < r.startCount.length; i++)
          if (e >= r.startCount[i] && e <= r.endCount[i]) {
            if (r.idRangeOffset[i] === 0)
              return e + r.idDelta[i] & 65535;
            {
              const a = r.idRangeOffset[i] / 2 + (e - r.startCount[i]) - (r.startCount.length - i);
              if (a >= 0 && a < r.glyphIdArray.length) {
                const s = r.glyphIdArray[a];
                if (s !== 0)
                  return s + r.idDelta[i] & 65535;
              }
            }
          }
      }
    return 0;
  }
  /**
   * Creates an empty path object for characters with no glyph data
   * @returns Empty path object
   */
  createEmptyPath() {
    return {
      getBoundingBox: () => ({ x1: 0, y1: 0, x2: 0, y2: 0 }),
      toSVG: () => ""
    };
  }
  /**
   * Creates a path object for a glyph
   * @param fontData Font data object
   * @param glyphData Glyph data from font
   * @param x X position
   * @param y Y position
   * @param fontSize Font size
   * @returns Path object with bounding box and SVG methods
   */
  createGlyphPath(A, e, t, r, i) {
    if (!e || !e.xs || e.xs.length === 0)
      return this.createEmptyPath();
    const a = i / A.head.unitsPerEm;
    return {
      getBoundingBox: () => ({
        x1: t + e.xMin * a,
        y1: r + -e.yMax * a,
        x2: t + e.xMax * a,
        y2: r + -e.yMin * a
      }),
      toSVG: () => this.glyphToSVGPath(e, t, r, a)
    };
  }
  /**
   * Converts glyph data to SVG path string
   * @param glyphData Glyph data from font
   * @param x X position
   * @param y Y position
   * @param scale Scale factor
   * @returns SVG path data string
   */
  glyphToSVGPath(A, e, t, r) {
    if (!A || !A.xs) return "";
    const { xs: i, ys: a, endPts: s, flags: B } = A;
    if (!i || !a || !s || !B) return "";
    let g = "", E = 0;
    for (let l = 0; l < s.length; l++) {
      const h = s[l];
      if (!(h < E)) {
        if (h >= E) {
          const d = e + i[E] * r, C = t - a[E] * r;
          g += `M${d.toFixed(2)},${C.toFixed(2)}`;
          let c = E + 1;
          for (; c <= h; )
            if ((B[c] & 1) !== 0) {
              const I = e + i[c] * r, P = t - a[c] * r;
              g += `L${I.toFixed(2)},${P.toFixed(2)}`, c++;
            } else {
              const I = e + i[c] * r, P = t - a[c] * r;
              let m = c + 1 > h ? E : c + 1;
              if ((B[m] & 1) !== 0) {
                const _ = e + i[m] * r, v = t - a[m] * r;
                g += `Q${I.toFixed(2)},${P.toFixed(2)} ${_.toFixed(2)},${v.toFixed(2)}`, c = m + 1;
              } else {
                const _ = e + i[m] * r, v = t - a[m] * r, k = (I + _) / 2, L = (P + v) / 2;
                g += `Q${I.toFixed(2)},${P.toFixed(2)} ${k.toFixed(2)},${L.toFixed(2)}`, c = m;
              }
            }
          g += "Z";
        }
        E = h + 1;
      }
    }
    return g;
  }
  /**
   * Generates an SVG path for a character glyph
   * @param character The character to generate a path for
   * @param fontData The font data object
   * @param x X position
   * @param y Y position
   * @param fontSize Font size
   * @returns Path object with SVG generation methods
   */
  generateCharacterPath(A, e, t, r, i) {
    try {
      const a = A.codePointAt(0) || 0, s = this.getGlyphIndex(e, a);
      if (s === 0)
        return this.createEmptyPath();
      let B = null;
      try {
        e.glyf && e.glyf[s] !== null ? B = e.glyf[s] : Q && Q.T && Q.T.glyf && Q.T.glyf._parseGlyf && (B = Q.T.glyf._parseGlyf(e, s), e.glyf && B && (e.glyf[s] = B));
      } catch (g) {
        console.warn(`Failed to parse glyph ${s}:`, g);
      }
      return B ? this.createGlyphPath(e, B, t, r, i) : this.createEmptyPath();
    } catch (a) {
      return console.warn(`Failed to generate path for character "${A}":`, a), this.createEmptyPath();
    }
  }
  /**
   * Generates SVG path data for a character with positioning calculations
   * @param character The character to render
   * @param fontData The font data
   * @param cellX Cell X position
   * @param cellY Cell Y position
   * @param cellWidth Cell width
   * @param cellHeight Cell height
   * @param fontSize Font size
   * @param advanceWidth Character advance width
   * @returns SVG path data string or null if generation fails
   */
  generatePositionedCharacterPath(A, e, t, r, i, a, s, B) {
    try {
      const g = s / e.head.unitsPerEm, E = B * g, l = t + (i - E) / 2, h = r + (a + s * 0.7) / 2;
      return this.generateCharacterPath(A, e, l, h, s).toSVG() || null;
    } catch (g) {
      return console.warn(`Failed to generate positioned character path for "${A}":`, g), null;
    }
  }
}
class dA {
  constructor() {
    o(this, "pathGenerator");
    this.pathGenerator = new uA();
  }
  /**
   * Generates the SVG header with metadata
   * @param gridInfo Grid dimensions
   * @returns SVG header string
   */
  generateSVGHeader(A) {
    return `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<svg width="${A.width}" height="${A.height}" viewBox="0 0 ${A.width} ${A.height}" 
     xmlns="http://www.w3.org/2000/svg" version="1.1">
<title>textmode art generated via textmode.js</title>
<desc>textmode art visualization generated by textmode.js library</desc>`;
  }
  /**
   * Generates the SVG footer
   * @returns SVG footer string
   */
  generateSVGFooter() {
    return `
</g>
</svg>`;
  }
  /**
   * Generates background rectangle if needed
   * @param gridInfo Grid information
   * @param options SVG generation options
   * @returns Background rectangle SVG string or empty string
   */
  generateBackground(A, e) {
    if (!e.includeBackgroundRectangles)
      return "";
    const t = e.backgroundColor, r = `rgba(${t[0]},${t[1]},${t[2]},${t[3] / 255})`;
    return `
<rect width="${A.width}" height="${A.height}" fill="${r}" />`;
  }
  /**
   * Converts RGBA object to CSS color string
   * @param color RGBA color object
   * @returns CSS color string
   */
  rgbaToColorString(A) {
    return `rgba(${A.r},${A.g},${A.b},${A.a / 255})`;
  }
  /**
   * Generates SVG transform attribute string
   * @param cellData Cell data with transform information
   * @param gridInfo Grid information for center calculations
   * @returns Transform attribute string or empty string
   */
  generateTransformAttribute(A, e) {
    const { transform: t, position: r } = A, i = r.cellX + e.cellWidth / 2, a = r.cellY + e.cellHeight / 2, s = [];
    if (t.flipHorizontal || t.flipVertical) {
      const B = t.flipHorizontal ? -1 : 1, g = t.flipVertical ? -1 : 1;
      s.push(`translate(${i} ${a})`), s.push(`scale(${B} ${g})`), s.push(`translate(${-i} ${-a})`);
    }
    return t.rotation && s.push(`rotate(${t.rotation} ${i} ${a})`), s.length ? ` transform="${s.join(" ")}"` : "";
  }
  /**
   * Generates background rectangle for a cell
   * @param cellData Cell data
   * @param gridInfo Grid information
   * @param options SVG generation options
   * @returns Background rectangle SVG string or empty string
   */
  generateCellBackground(A, e, t) {
    if (!t.includeBackgroundRectangles || A.secondaryColor.a === 0)
      return "";
    const { position: r } = A, i = this.rgbaToColorString(A.secondaryColor);
    return t.drawMode === "stroke" ? `
  <rect x="${r.cellX}" y="${r.cellY}" width="${e.cellWidth}" height="${e.cellHeight}" stroke="${i}" fill="none" stroke-width="${t.strokeWidth}" />` : `
  <rect x="${r.cellX}" y="${r.cellY}" width="${e.cellWidth}" height="${e.cellHeight}" fill="${i}" />`;
  }
  /**
   * Generates character path element for a cell
   * @param cellData Cell data
   * @param gridInfo Grid information
   * @param fontInfo Font information
   * @param options SVG generation options
   * @returns Character path SVG string
   */
  generateCharacterPath(A, e, t, r) {
    const i = t.characters[A.charIndex];
    if (!i)
      return "";
    const a = this.pathGenerator.generatePositionedCharacterPath(
      i.character,
      t.font,
      A.position.cellX,
      A.position.cellY,
      e.cellWidth,
      e.cellHeight,
      t.fontSize,
      i.advanceWidth
    );
    if (!a)
      return "";
    const s = this.rgbaToColorString(A.primaryColor);
    return r.drawMode === "stroke" ? `
    <path id="${`path-${A.charIndex}-${A.position.cellX}-${A.position.cellY}`.replace(/\./g, "-")}" d="${a}" stroke="${s}" stroke-width="${r.strokeWidth}" fill="none" />` : `
    <path d="${a}" fill="${s}" />`;
  }
  /**
   * Generates complete SVG content for a single cell
   * @param cellData Cell data
   * @param gridInfo Grid information
   * @param fontInfo Font information
   * @param options SVG generation options
   * @returns Complete cell SVG content
   */
  generateCellContent(A, e, t, r) {
    let i = "";
    i += this.generateCellBackground(A, e, r);
    const a = this.generateTransformAttribute(A, e), s = this.generateCharacterPath(A, e, t, r);
    return s && (a ? (i += `
  <g${a}>`, i += s, i += `
  </g>`) : i += s), i;
  }
  /**
   * Generates the complete SVG content from cell data
   * @param cellDataArray Array of cell data
   * @param grid Grid information
   * @param fontInfo Font information
   * @param options SVG generation options
   * @returns Complete SVG string
   */
  generateSVGContent(A, e, t, r) {
    let i = this.generateSVGHeader(e);
    i += this.generateBackground(e, r), i += `
<g id="ascii-cells">`;
    for (const a of A)
      i += this.generateCellContent(a, e, t, r);
    return i += this.generateSVGFooter(), i;
  }
  /**
   * Optimizes SVG content by removing empty elements and unnecessary whitespace
   * @param svgContent Raw SVG content
   * @returns Optimized SVG content
   */
  optimizeSVGContent(A) {
    return A.replace(/<path[^>]*d=""[^>]*\/>/g, "").replace(/\n\s*\n/g, `
`).replace(/[ \t]+$/gm, "");
  }
}
class CA extends R {
  /**
   * Generates a default filename for SVG export
   * @param prefix Optional prefix for the filename
   * @returns Generated filename without extension
   */
  generateDefaultFilename(A = "textmode_output") {
    const { date: e, time: t } = this.generateDateTimeString();
    return `${A}_${e}_${t}`;
  }
  /**
   * Validates filename for safety and compatibility
   * @param filename The filename to validate
   * @returns Sanitized filename
   */
  sanitizeFilename(A) {
    return super.sanitizeFilename(A);
  }
  /**
   * Creates a downloadable blob from SVG content
   * @param svgContent The SVG content string
   * @returns Blob object containing the SVG data
   */
  createSVGBlob(A) {
    return this.createBlob(A, "image/svg+xml;charset=utf-8");
  }
  /**
   * Creates a data URL from SVG content
   * @param svgContent The SVG content string
   * @returns Data URL string
   */
  createDataURL(A) {
    return super.createDataURL(A, "image/svg+xml;charset=utf-8");
  }
  /**
   * Downloads SVG content as a file
   * @param svgContent The SVG content to download
   * @param filename The filename (without extension)
   */
  downloadSVG(A, e) {
    try {
      const t = this.sanitizeFilename(e), r = this.ensureFileExtension(t, ".svg");
      this.downloadFile(A, r, "image/svg+xml;charset=utf-8");
    } catch (t) {
      throw console.error("Failed to download SVG file:", t), new Error(`SVG download failed: ${t instanceof Error ? t.message : "Unknown error"}`);
    }
  }
  /**
   * Saves SVG content with automatic filename generation if not provided
   * @param svgContent The SVG content to save
   * @param filename Optional filename (will generate if not provided)
   */
  saveSVG(A, e) {
    const t = e || this.generateDefaultFilename();
    this.downloadSVG(A, t);
  }
}
class V {
  constructor() {
    o(this, "dataExtractor");
    o(this, "contentGenerator");
    o(this, "fileHandler");
    this.dataExtractor = new cA(), this.contentGenerator = new dA(), this.fileHandler = new CA();
  }
  /**
   * Applies default values to SVG export options
   * @param options User-provided options
   * @returns Complete options with defaults applied
   */
  applyDefaultOptions(A) {
    return {
      includeBackgroundRectangles: A.includeBackgroundRectangles ?? !0,
      drawMode: A.drawMode ?? "fill",
      strokeWidth: A.strokeWidth ?? 1,
      backgroundColor: A.backgroundColor ?? [0, 0, 0, 0]
    };
  }
  /**
   * Generates SVG content from textmode rendering data without saving to file
   * @param textmodifier The textmodifier instance containing rendering data
   * @param options Export options (excluding filename)
   * @returns SVG content as string
   */
  generateSVG(A, e = {}) {
    const t = this.applyDefaultOptions(e), r = this.dataExtractor.extractFramebufferData(A.pipeline), i = this.dataExtractor.extractSVGCellData(
      r,
      A.grid
    ), a = this.contentGenerator.generateSVGContent(
      i,
      A.grid,
      A.font,
      t
    );
    return this.contentGenerator.optimizeSVGContent(a);
  }
  /**
   * Exports SVG content to a downloadable file
   * @param textmodifier The textmodifier instance containing rendering data
   * @param options Export options including filename
   */
  saveSVG(A, e = {}) {
    try {
      const t = this.generateSVG(A, e), r = e.filename || this.fileHandler.generateDefaultFilename();
      this.fileHandler.saveSVG(t, r);
    } catch (t) {
      throw console.error("Failed to save SVG:", t), new Error(`SVG save failed: ${t instanceof Error ? t.message : "Unknown error"}`);
    }
  }
}
class fA extends U {
  /**
   * Extracts character data for TXT generation
   * @param framebufferData Framebuffer pixel data
   * @param grid Grid information
   * @param font Font information
   * @param emptyCharacter Character to use for empty cells
   * @returns 2D array of characters (rows x columns)
   */
  extractCharacterGrid(A, e, t, r = " ") {
    var s;
    const i = [];
    let a = 0;
    for (let B = 0; B < e.rows; B++) {
      const g = [];
      for (let E = 0; E < e.cols; E++) {
        const l = a * 4, h = this.getCharacterIndex(
          A.characterPixels,
          l
        ), d = ((s = t.characters[h]) == null ? void 0 : s.character) || r;
        g.push(d), a++;
      }
      i.push(g);
    }
    return i;
  }
}
class DA {
  /**
   * Generates TXT content from a 2D character array
   * @param characterGrid 2D array of characters (rows x columns)
   * @param options Generation options
   * @returns TXT content as string
   */
  generateTXTContent(A, e) {
    const t = [];
    for (const i of A) {
      let a = i.join("");
      e.preserveTrailingSpaces || (a = a.replace(/\s+$/, "")), t.push(a);
    }
    const r = e.lineEnding === "crlf" ? `\r
` : `
`;
    return t.join(r);
  }
}
class mA extends R {
  /**
   * Saves TXT content as a downloadable file
   * @param content The TXT content to save
   * @param filename The filename to use for the download
   */
  saveTXT(A, e) {
    try {
      const t = this.ensureValidFilename(e);
      this.downloadFile(A, t, "text/plain;charset=utf-8");
    } catch (t) {
      throw console.error("Failed to save TXT file:", t), new Error(`TXT file save failed: ${t instanceof Error ? t.message : "Unknown error"}`);
    }
  }
  /**
   * Generates a default filename for TXT export
   * @returns Default filename with timestamp
   */
  generateDefaultFilename() {
    return super.generateDefaultFilename("textmode-export", ".txt");
  }
  /**
   * Ensures filename has proper extension and is valid
   * @param filename The filename to validate and fix
   * @returns Valid filename with .txt extension
   */
  ensureValidFilename(A) {
    let e = this.sanitizeFilename(A);
    return e = this.ensureFileExtension(e, ".txt"), e === ".txt" || e.length <= 4 ? this.generateDefaultFilename() : e;
  }
}
class H {
  constructor() {
    o(this, "dataExtractor");
    o(this, "contentGenerator");
    o(this, "fileHandler");
    this.dataExtractor = new fA(), this.contentGenerator = new DA(), this.fileHandler = new mA();
  }
  /**
   * Applies default values to TXT export options
   * @param options User-provided options
   * @returns Complete options with defaults applied
   */
  applyDefaultOptions(A) {
    return {
      preserveTrailingSpaces: A.preserveTrailingSpaces ?? !1,
      lineEnding: A.lineEnding ?? "lf",
      emptyCharacter: A.emptyCharacter ?? " "
    };
  }
  /**
   * Generates TXT content from textmode rendering data without saving to file
   * @param textmodifier The textmodifier instance containing rendering data
   * @param options Export options (excluding filename)
   * @returns TXT content as string
   */
  generateTXT(A, e = {}) {
    const t = this.applyDefaultOptions(e), r = this.dataExtractor.extractFramebufferData(A.pipeline), i = this.dataExtractor.extractCharacterGrid(
      r,
      A.grid,
      A.font,
      t.emptyCharacter
    );
    return this.contentGenerator.generateTXTContent(
      i,
      t
    );
  }
  /**
   * Exports TXT content to a downloadable file
   * @param textmodifier The textmodifier instance containing rendering data
   * @param options Export options including filename
   */
  saveTXT(A, e = {}) {
    try {
      const t = this.generateTXT(A, e), r = e.filename || this.fileHandler.generateDefaultFilename();
      this.fileHandler.saveTXT(t, r);
    } catch (t) {
      throw console.error("Failed to save TXT:", t), new Error(`TXT save failed: ${t instanceof Error ? t.message : "Unknown error"}`);
    }
  }
}
class PA extends U {
  /**
   * Captures the current state of the textmode canvas as image data
   * @param textmodeCanvas The TextmodeCanvas instance to capture from
   * @param scale Scale factor for the output image
   * @param backgroundColor Background color for formats that don't support transparency
   * @returns Canvas element containing the captured image data
   */
  captureCanvasData(A, e = 1, t = "transparent") {
    const r = A.canvas;
    if (e === 1 && t === "transparent")
      return r;
    const i = document.createElement("canvas"), a = i.getContext("2d");
    if (!a)
      throw new Error("Failed to get 2D rendering context for image capture");
    const s = Math.round(r.width * e), B = Math.round(r.height * e);
    return i.width = s, i.height = B, t !== "transparent" && (a.fillStyle = t, a.fillRect(0, 0, s, B)), a.imageSmoothingEnabled = !1, a.drawImage(
      r,
      0,
      0,
      r.width,
      r.height,
      0,
      0,
      s,
      B
    ), i;
  }
}
class IA {
  /**
   * Generates image data from canvas
   * @param canvas The canvas containing the image data
   * @param options Generation options with format, quality, etc.
   * @returns Data URL string containing the image data
   */
  generateImageData(A, e) {
    const t = this.getMimeType(e.format);
    return e.format === "png" ? A.toDataURL(t) : A.toDataURL(t, e.quality);
  }
  /**
   * Generates image blob from canvas
   * @param canvas The canvas containing the image data
   * @param options Generation options with format, quality, etc.
   * @returns Promise that resolves to a Blob containing the image data
   */
  async generateImageBlob(A, e) {
    return new Promise((t, r) => {
      const i = this.getMimeType(e.format), a = (s) => {
        s ? t(s) : r(new Error(`Failed to generate ${e.format.toUpperCase()} blob`));
      };
      e.format === "png" ? A.toBlob(a, i) : A.toBlob(a, i, e.quality);
    });
  }
  /**
   * Gets the MIME type for a given image format
   * @param format The image format
   * @returns The corresponding MIME type
   */
  getMimeType(A) {
    switch (A) {
      case "png":
        return "image/png";
      case "jpg":
        return "image/jpeg";
      case "webp":
        return "image/webp";
      default:
        throw new Error(`Unsupported image format: ${A}`);
    }
  }
}
const z = {
  png: "image/png",
  jpg: "image/jpeg",
  webp: "image/webp"
}, y = {
  png: ".png",
  jpg: ".jpg",
  webp: ".webp"
};
class wA extends R {
  /**
   * Saves image content as a downloadable file
   * @param content The image content (data URL or blob)
   * @param filename The filename (without extension)
   * @param format The image format
   */
  saveImage(A, e, t) {
    try {
      const r = this.sanitizeFilename(e), i = y[t], a = this.ensureFileExtension(r, i);
      typeof A == "string" ? this.saveImageFromDataURL(A, a) : this.saveImageFromBlob(A, a);
    } catch (r) {
      throw console.error(`Failed to save ${t.toUpperCase()} image:`, r), new Error(`Image save failed: ${r instanceof Error ? r.message : "Unknown error"}`);
    }
  }
  /**
   * Saves image from data URL
   * @param dataURL The data URL containing image data
   * @param filename The complete filename with extension
   */
  saveImageFromDataURL(A, e) {
    const t = document.createElement("a");
    t.href = A, t.download = e, t.style.display = "none", t.rel = "noopener", document.body.appendChild(t), t.click(), document.body.removeChild(t);
  }
  /**
   * Saves image from blob
   * @param blob The blob containing image data
   * @param filename The complete filename with extension
   */
  saveImageFromBlob(A, e) {
    const t = URL.createObjectURL(A);
    try {
      const r = document.createElement("a");
      r.href = t, r.download = e, r.style.display = "none", r.rel = "noopener", document.body.appendChild(r), r.click(), document.body.removeChild(r);
    } finally {
      URL.revokeObjectURL(t);
    }
  }
  /**
   * Generates a default filename for image export
   * @param format The image format for the file extension
   * @returns Generated filename with timestamp
   */
  generateDefaultImageFilename(A = "png") {
    const e = y[A];
    return super.generateDefaultFilename("textmode-export", e);
  }
  /**
   * Validates if the browser supports saving files in the specified format
   * @param format The image format to validate
   * @returns True if the format is supported for saving
   */
  validateSaveSupport(A) {
    return A in z && A in y;
  }
  /**
   * Gets the MIME type for the specified image format
   * @param format The image format
   * @returns The MIME type string
   */
  getMimeType(A) {
    return z[A];
  }
  /**
   * Gets the file extension for the specified image format
   * @param format The image format
   * @returns The file extension (including the dot)
   */
  getFileExtension(A) {
    return y[A];
  }
}
class pA {
  constructor() {
    o(this, "dataExtractor");
    o(this, "contentGenerator");
    o(this, "fileHandler");
    this.dataExtractor = new PA(), this.contentGenerator = new IA(), this.fileHandler = new wA();
  }
  /**
   * Applies default values to image export options
   * @param options User-provided options
   * @returns Complete options with defaults applied
   */
  applyDefaultOptions(A) {
    return {
      format: A.format ?? "png",
      quality: A.quality ?? 1,
      scale: A.scale ?? 1,
      backgroundColor: A.backgroundColor ?? "transparent"
    };
  }
  /**
   * Validates export options and browser support
   * @param options The options to validate
   * @throws Error if options are invalid or format is not supported
   */
  validateOptions(A) {
    if (console.log("Validating image export options:", A), !this.fileHandler.validateSaveSupport(A.format))
      throw new Error(`Saving '${A.format}' files is not supported`);
    if (A.quality < 0 || A.quality > 1)
      throw new Error("Image quality must be between 0.0 and 1.0");
    if (A.scale <= 0)
      throw new Error("Scale factor must be greater than 0");
    A.scale > 10 && console.warn("Large scale factors may result in very large files and slow performance"), A.format === "jpg" && A.backgroundColor === "transparent" && (A.backgroundColor = "black");
  }
  /**
   * Generates image data from textmode rendering without saving to file
   * @param textmodifier The textmodifier instance containing the canvas
   * @param options Export options (excluding filename)
   * @returns Data URL string containing the image data
   */
  generateImage(A, e = {}) {
    const t = this.applyDefaultOptions(e);
    if (this.validateOptions(t), t.scale === 1 && t.backgroundColor === "transparent") {
      const a = A.textmodeCanvas.canvas;
      return this.contentGenerator.generateImageData(a, t);
    }
    const r = this.dataExtractor.captureCanvasData(
      A.textmodeCanvas,
      t.scale,
      t.backgroundColor
    );
    return this.contentGenerator.generateImageData(
      r,
      t
    );
  }
  /**
   * Generates image blob from textmode rendering without saving to file
   * @param textmodifier The textmodifier instance containing the canvas
   * @param options Export options (excluding filename)
   * @returns Promise that resolves to a Blob containing the image data
   */
  async generateImageBlob(A, e = {}) {
    const t = this.applyDefaultOptions(e);
    if (this.validateOptions(t), t.scale === 1 && t.backgroundColor === "transparent") {
      const a = A.textmodeCanvas.canvas;
      return await this.contentGenerator.generateImageBlob(a, t);
    }
    const r = this.dataExtractor.captureCanvasData(
      A.textmodeCanvas,
      t.scale,
      t.backgroundColor
    );
    return await this.contentGenerator.generateImageBlob(
      r,
      t
    );
  }
  /**
   * Exports image to a downloadable file
   * @param textmodifier The textmodifier instance containing the canvas
   * @param options Export options including filename
   */
  async saveImage(A, e = {}) {
    try {
      const t = await this.generateImageBlob(A, e), r = e.format ?? "png", i = e.filename || this.fileHandler.generateDefaultImageFilename(r);
      this.fileHandler.saveImage(t, i, r);
    } catch (t) {
      throw console.error("Failed to save image:", t), new Error(`Image save failed: ${t instanceof Error ? t.message : "Unknown error"}`);
    }
  }
}
class T {
  constructor(A = null, e = {}) {
    /** The element to capture content from (optional for standalone mode) */
    o(this, "captureSource");
    /** Our WebGL overlay canvas manager */
    o(this, "textmodeCanvas");
    /** Core WebGL renderer */
    o(this, "_renderer");
    o(this, "_canvasFramebuffer");
    o(this, "_font");
    o(this, "_grid");
    o(this, "resizeObserver");
    // Auto-rendering properties
    o(this, "_mode");
    o(this, "_frameRateLimit");
    o(this, "animationFrameId", null);
    o(this, "lastFrameTime", 0);
    o(this, "frameInterval");
    o(this, "_frameRate", 0);
    o(this, "lastRenderTime", 0);
    o(this, "_frameCount", 0);
    // Frame rate measurement smoothing
    o(this, "frameTimeHistory", []);
    o(this, "frameTimeHistorySize", 10);
    o(this, "_pipeline");
    // Standalone canvas properties
    o(this, "_standalone", !1);
    o(this, "_drawCallback", () => {
    });
    o(this, "_resizedCallback", () => {
    });
    this.captureSource = A, this._standalone = A === null, this._mode = e.renderMode ?? "auto", this._frameRateLimit = e.frameRate ?? 60, this.frameInterval = 1e3 / this._frameRateLimit;
  }
  /**
   * Static factory method for creating and initializing a Textmodifier instance.
   * @param source The HTML canvas or video element to capture content from. Pass `null` for standalone mode.
   * @param opts Optional configuration options for the `Textmodifier` instance.
   * @ignore
   */
  static async create(A = null, e = {}) {
    const t = new T(A, e), r = t._standalone ? e : void 0;
    t.textmodeCanvas = new aA(t.captureSource, t._standalone, r), t._renderer = new j(t.textmodeCanvas.getWebGLContext());
    let i, a;
    t._standalone ? (i = e.width || 800, a = e.height || 600) : (i = t.textmodeCanvas.width || 800, a = t.textmodeCanvas.height || 600), t._canvasFramebuffer = t._renderer.createFramebuffer(i, a), t._font = new rA(t._renderer, e.fontSize ?? 16), await t._font.initialize(e.fontSource);
    const s = t._font.maxGlyphDimensions;
    return t._grid = new iA(t.textmodeCanvas.canvas, s.width, s.height), t._pipeline = new hA(t._renderer, t._font, t._grid), t.setupEventListeners(), t.startAutoRendering(), t;
  }
  setupEventListeners() {
    window.addEventListener("resize", () => {
      this._standalone ? this._resizedCallback() : this.resize();
    }), window.ResizeObserver && this.captureSource && !this._standalone && (this.resizeObserver = new ResizeObserver(() => {
      this.resize();
    }), this.resizeObserver.observe(this.captureSource));
  }
  /**
   * Generate the current textmode rendering as a text string.
   * @param options Options for text generation *(excluding filename)*
   * @returns Textmode grid content as a string.
   * 
   * @example
   * ```javascript
   * // Fetch a canvas element to apply textmode rendering to
   * const canvas = document.querySelector('canvas#myCanvas');
   * 
   * // Create a Textmodifier instance
   * const textmodifier = await textmode.create(canvas, {renderMode: 'manual'});
   *
   * // Render a single frame
   * textmodifier.render();
   * 
   * // Get the current rendering as a text string
   * const textString = textmodifier.toString({
   *   preserveTrailingSpaces: false,
   *   lineEnding: 'lf'
   * });
   * 
   * // Print to console or use otherwise
   * console.log(textString);
   * 
   * ////////
   * 
   * // Example with video element
   * const video = document.querySelector('video#myVideo');
   * const videoTextmodifier = await textmode.create(video);
   * 
   * // The textmode overlay will automatically update as the video plays
   * video.play();
   * 
   * // Get current frame as ASCII
   * const videoFrame = videoTextmodifier.toString();
   * ```
   */
  toString(A = {}) {
    return new H().generateTXT(this, A);
  }
  /**
   * Export the current textmode rendering to a TXT file.
   * @param options Options for TXT export
   * 
   * @example
   * ```javascript
   * // Fetch a canvas element to apply textmode rendering to
   * const canvas = document.querySelector('canvas#myCanvas');
   * 
   * // Create a Textmodifier instance
   * const textmodifier = await textmode.create(canvas, {renderMode: 'manual'});
   *
   * // Render a single frame
   * textmodifier.render();
   * 
   * // Export the current rendering to a TXT file
   * textmodifier.saveStrings({
   *   filename: 'my_textmode_rendering',
   *   preserveTrailingSpaces: false
   * });
   * ```
   */
  saveStrings(A = {}) {
    new H().saveTXT(this, A);
  }
  /**
   * Generate the current textmode rendering as an SVG string.
   * @param options Options for SVG generation *(excluding filename)*
   * @returns SVG content as a string.
   * 
   * @example
   * ```javascript
   * // Fetch a canvas element to apply textmode rendering to
   * const canvas = document.querySelector('canvas#myCanvas');
   * 
   * // Create a Textmodifier instance
   * const textmodifier = await textmode.create(canvas, {renderMode: 'manual'});
   *
   * // Render a single frame
   * textmodifier.render();
   * 
   * // Get the current rendering as an SVG string
   * const svgString = textmodifier.toSVG({
   *   includeBackgroundRectangles: true,
   *   drawMode: 'fill'
   * });
   * 
   * // Print to console or use otherwise
   * console.log(svgString);
   * ```
   */
  toSVG(A = {}) {
    return new V().generateSVG(this, A);
  }
  /**
   * Export the current textmode rendering to an SVG file.
   * @param options Options for SVG export
   * 
   * @example
   * ```javascript
   * // Fetch a canvas element to apply textmode rendering to
   * const canvas = document.querySelector('canvas#myCanvas');
   * 
   * // Create a Textmodifier instance
   * const textmodifier = await textmode.create(canvas, {renderMode: 'manual'});
   *
   * // Render a single frame
   * textmodifier.render();
   * 
   * // Export the current rendering to an SVG file
   * textmodifier.saveSVG({
   *   filename: 'my_textmode_rendering',
   * });
   * ```
   */
  saveSVG(A = {}) {
    new V().saveSVG(this, A);
  }
  /**
   * Export the current textmode rendering to an image file.
   * @param filename The filename (without extension) to save the image as
   * @param format The image format ('png', 'jpg', or 'webp')
   * @param options Additional options for image export
   * 
   * @example
   * ```javascript
   * // Fetch a canvas element to apply textmode rendering to
   * const canvas = document.querySelector('canvas#myCanvas');
   * 
   * // Create a Textmodifier instance
   * const textmodifier = await textmode.create(canvas, {renderMode: 'manual'});
   *
   * // Render a single frame
   * textmodifier.render();
   * 
   * // Export the current rendering to a PNG file
   * textmodifier.saveCanvas('my_textmode_rendering', 'png');
   * 
   * // Export with custom options
   * textmodifier.saveCanvas('my_textmode_rendering', 'jpg', {
   *   quality: 0.8,
   *   scale: 2.0,
   *   backgroundColor: 'white'
   * });
   * ```
   */
  async saveCanvas(A, e, t = {}) {
    await new pA().saveImage(this, {
      ...t,
      filename: A,
      format: e
    });
  }
  /**
   * Update the font used for rendering.
   * @param fontSource The URL of the font to load.
   * 
   * @example
   * ```javascript
   * // Fetch a canvas element to apply textmode rendering to
   * const canvas = document.querySelector('canvas#myCanvas');
   * 
   * // Create a Textmodifier instance
   * const textmodifier = await textmode.create(canvas);
   * 
   * // Load a custom font from a URL
   * await textmodifier.loadFont('https://example.com/fonts/myfont.ttf');
   * 
   * // Local font example
   * // await textmodifier.loadFont('./fonts/myfont.ttf'); 
   * ```
   */
  async loadFont(A) {
    return this._font.loadFont(A).then(() => {
      const e = this._font.maxGlyphDimensions;
      this._grid.resizeCellPixelDimensions(e.width, e.height), this._pipeline.resize();
    });
  }
  /**
   * Apply textmode rendering to the canvas.
   * 
   * **Note:** In `'auto'` mode, this is called automatically.
   * In `'manual'` mode, you need to call this method when you want to update the textmode rendering.
   * 
   * @example
   * ```javascript
   * // p5.js example
   * 
   * let textmodifier;
   * 
   * // p5.js setup function
   * async function setup() {
   * 
   *   // Create a p5.js canvas
   *   const canvas = createCanvas(800, 600);
   * 
   *   // Create a Textmodifier instance
   *   textmodifier = await textmode.create(canvas.elt);
   * 
   *   // Update the rendering mode to 'manual'
   *   textmodifier.renderMode('manual');
   * }
   * 
   * // p5.js draw function
   * function draw() {
   * 
   *   // Draw something on the p5.js canvas
   *   background(220);
   *   fill(255, 0, 0);
   *   rect(50, 50, 100, 100);
   * 
   *   // Apply textmode rendering
   *   textmodifier.render();
   * }
   * ```
   */
  render() {
    this.measureFrameRate(), this._frameCount++, this._standalone ? (this._canvasFramebuffer.begin(), this._drawCallback(), this._canvasFramebuffer.end()) : this._canvasFramebuffer.update(this.captureSource), this._pipeline.render(this._canvasFramebuffer), this._pipeline.hasEnabledConverters() ? (this._renderer.background(0), this._renderer.image(this._pipeline.texture, this._grid.offsetX, this._grid.offsetY, this._pipeline.texture.width, this._pipeline.texture.height)) : (this._renderer.clear(), this._renderer.image(this._canvasFramebuffer, this._grid.offsetX, this._grid.offsetY, this._canvasFramebuffer.width, this._canvasFramebuffer.height)), this._renderer.reset();
  }
  resize() {
    this.textmodeCanvas.resize(), this._canvasFramebuffer.resize(this.textmodeCanvas.width, this.textmodeCanvas.height), this._grid.resize(), this._pipeline.resize(), this._renderer.resetViewport(), this._mode !== "manual" && this.render();
  }
  /**
   * Start automatic rendering
   */
  startAutoRendering() {
    if (this._mode !== "auto") return;
    this.lastFrameTime = performance.now();
    const A = (e) => {
      const t = e - this.lastFrameTime;
      t >= this.frameInterval && (this.render(), this.lastFrameTime = e - t % this.frameInterval), this.animationFrameId = requestAnimationFrame(A);
    };
    this.animationFrameId = requestAnimationFrame(A);
  }
  /**
   * Update FPS measurement - works for both auto and manual modes
   * Uses a rolling average for smoother frame rate reporting
   */
  measureFrameRate() {
    const A = performance.now();
    if (this.lastRenderTime > 0) {
      const e = A - this.lastRenderTime;
      this.frameTimeHistory.push(e), this.frameTimeHistory.length > this.frameTimeHistorySize && this.frameTimeHistory.shift();
      const t = this.frameTimeHistory.reduce((r, i) => r + i, 0) / this.frameTimeHistory.length;
      this._frameRate = 1e3 / t;
    }
    this.lastRenderTime = A;
  }
  /**
   * Stop automatic rendering
   */
  stopAutoRendering() {
    this.animationFrameId && (cancelAnimationFrame(this.animationFrameId), this.animationFrameId = null);
  }
  /**
   * Update the rendering mode. 
   * 
   * If called without arguments, returns the current mode.
   * 
   * - `'manual'`: Requires manual [render](#render) calls
   * - `'auto'`: Automatically renders using [requestAnimationFrame](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame)
   *
   * @param mode The new rendering mode to set.
   * 
   * @example
   * ```javascript
   * // Fetch a canvas element to apply textmode rendering to
   * const canvas = document.querySelector('canvas#myCanvas');
   * 
   * // Create a Textmodifier instance
   * const textmodifier = await textmode.create(canvas);
   * 
   * // Update the rendering mode to 'manual'
   * textmodifier.renderMode('manual');
   * 
   * // Now you need to call textmodifier.render() manually in your animation loop
   * ```
   */
  renderMode(A) {
    if (this._mode !== A) {
      if (A === void 0)
        return this._mode;
      this.stopAutoRendering(), this._mode = A, A === "auto" && this.startAutoRendering();
    }
  }
  /**
   * Set the maximum frame rate for auto rendering. If called without arguments, returns the current measured frame rate.
   * @param fps The maximum frames per second for auto rendering.
   * 
   * @example
   * ```javascript
   * // Fetch a canvas element to apply textmode rendering to
   * const canvas = document.querySelector('canvas#myCanvas');
   * 
   * // Create a Textmodifier instance
   * const textmodifier = await textmode.create(canvas);
   * 
   * // Set the maximum frame rate to 30 FPS
   * textmodifier.frameRate(30);
   * ```
   */
  frameRate(A) {
    if (A === void 0)
      return this._frameRate;
    this._frameRateLimit = A, this.frameInterval = 1e3 / A, this._mode === "auto" && (this.stopAutoRendering(), this.startAutoRendering());
  }
  /**
   * Set the font size used for rendering.
   * @param size The font size to set.
   * 
   * @example
   * ```javascript
   * // Fetch a canvas element to apply textmode rendering to
   * const canvas = document.querySelector('canvas#myCanvas');
   * 
   * // Create a Textmodifier instance
   * const textmodifier = await textmode.create(canvas);
   * 
   * // Set the font size to 24
   * textmodifier.fontSize(24);
   * ```
   */
  fontSize(A) {
    u.validate(
      typeof A == "number" && A > 0,
      "Font size must be a positive number greater than 0.",
      { method: "fontSize", providedValue: A }
    ) && this._font.fontSize !== A && (this._font.setFontSize(A), this._grid.resizeCellPixelDimensions(this._font.maxGlyphDimensions.width, this._font.maxGlyphDimensions.height), this._pipeline.resize(), this._renderer.resetViewport());
  }
  /**
   * Set a draw callback function that will be executed before each render.
   * This method is primarily useful for standalone textmodifier instances.
   * @param callback The function to call before each render
   * 
   * @example
   * ```javascript
   * // Create a standalone textmodifier instance
   * const t = await textmode.create({
   *  width: 800,
   *  height: 600,
   * });
   * 
   * // Set up draw callback
   * t.draw(() => {
   *   // Set background color
   *   t.background(128);
   *   
   *   // Draw some content
   *   t.fill(255, 0, 0); // Set fill color to red
   *   t.rect(50, 50, 100, 100);
   * });
   * ```
   */
  draw(A) {
    this._drawCallback = A;
  }
  /**
   * Set a callback function that will be called when the window is resized.
   * @param callback The function to call when the window is resized.
   * 
   * @example
   * ```javascript
   * // Create a standalone textmodifier instance
   * const t = await textmode.create({
   *  width: window.innerWidth,
   *  height: window.innerHeight,
   * });
   * 
   * // Draw callback to update content
   * t.draw(() => {
   *   // Set background color
   *   t.background(128);
   * 
   *   // Draw some content
   *   t.fill(255, 0, 0); // Set fill color to red
   *   t.rect(50, 50, 100, 100);
   * });
   * 
   * // Set up window resize callback
   * t.windowResized(() => {
   *   // Resize the canvas to match window size
   *   t.resizeCanvas(window.innerWidth, window.innerHeight);
   * });
   * 
   */
  windowResized(A) {
    this._resizedCallback = A;
  }
  /**
   * Resize the `textmode.js` canvas.
   * @param width The new width of the canvas.
   * @param height The new height of the canvas.
   */
  resizeCanvas(A, e) {
    this.textmodeCanvas.resize(A, e), this._canvasFramebuffer.resize(this.textmodeCanvas.width, this.textmodeCanvas.height), this._grid.resize(), this._pipeline.resize(), this._renderer.resetViewport(), this._mode !== "manual" && this.render();
  }
  /**
   * @inheritDoc TextmodeConversionPipeline.get
   * 
   * @example
   * ```javascript
   * // Fetch a canvas element to apply textmode rendering to
   * const canvas = document.querySelector('canvas#myCanvas');
   * 
   * // Create a Textmodifier instance
   * const textmodifier = await textmode.create(canvas);
   * 
   * // Get the pre-defined brightness converter from the pipeline
   * const brightnessConverter = textmodifier.converter('brightness');
   * 
   * // Update properties of the brightness converter
   * brightnessConverter.invert(true);
   * brightnessConverter.characters(" .,;:*");
   * ```
   */
  converter(A) {
    return this._pipeline.get(A);
  }
  /**
   * Sets the fill color for subsequent rendering operations
   * @param r Red component (0-255)
   * @param g Green component (0-255, optional)
   * @param b Blue component (0-255, optional)
   * @param a Alpha component (0-255, optional)
   * 
   * @example
   * ```javascript
   * const t = await textmode.create({
   *   width: 800,
   *   height: 600,
   * })
   * 
   * t.draw(() => {
   *   // Set the background color to black
   *   t.background(0);
   * 
   *   const centerX = t.width / 2;
   *   const centerY = t.height / 2;
   *   const radius = Math.min(t.width, t .height) / 3;
   *   const speed = 0.02; // Adjust speed of rotation
   *
   *   const angle = t.frameCount * speed;
   *   const x = centerX + Math.cos(angle) * radius - 100;
   *   const y = centerY + Math.sin(angle) * radius - 50;
   *
   *   // Set the fill color to white
   *   t.fill(255);
   * 
   *   // Draw a rectangle with the fill color
   *   t.rect(x, y, 200, 150);
   * });
   * ```
   */
  fill(A, e, t, r) {
    this._renderer.fill(A, e, t, r);
  }
  /**
   * Draw a rectangle with the current shader or fill color.
   * @param x X-coordinate of the rectangle
   * @param y Y-coordinate of the rectangle
   * @param width Width of the rectangle
   * @param height Height of the rectangle
   * 
   * @example
   * ```javascript
   * const t = await textmode.create({
   *   width: 800,
   *   height: 600,
   * })
   * 
   * t.draw(() => {
   *   // Set the background color to black
   *   t.background(0);
   * 
   *   const centerX = t.width / 2;
   *   const centerY = t.height / 2;
   *   const radius = Math.min(t.width, t .height) / 3;
   *   const speed = 0.02; // Adjust speed of rotation
   *
   *   const angle = t.frameCount * speed;
   *   const x = centerX + Math.cos(angle) * radius - 100;
   *   const y = centerY + Math.sin(angle) * radius - 50;
   *
   *   // Set the fill color to white
   *   t.fill(255);
   * 
   *   // Draw a rectangle with the fill color
   *   t.rect(x, y, 200, 150);
   * });
   * ```
   */
  rect(A, e, t = 1, r = 1) {
    this._renderer.rect(A, e, t, r);
  }
  /**
   * Set the background color for the canvas.
   * @param r Red component (0-255)
   * @param g Green component (0-255, optional)
   * @param b Blue component (0-255, optional)
   * @param a Alpha component (0-255, optional)
   * 
   * @example
   * ```javascript
   * const t = await textmode.create({
   *   width: 800,
   *   height: 600,
   * })
   * 
   * t.draw(() => {
   *   // Set the background color to black
   *   t.background(0);
   * 
   *   const centerX = t.width / 2;
   *   const centerY = t.height / 2;
   *   const radius = Math.min(t.width, t .height) / 3;
   *   const speed = 0.02; // Adjust speed of rotation
   *
   *   const angle = t.frameCount * speed;
   *   const x = centerX + Math.cos(angle) * radius - 100;
   *   const y = centerY + Math.sin(angle) * radius - 50;
   *
   *   // Set the fill color to white
   *   t.fill(255);
   * 
   *   // Draw a rectangle with the fill color
   *   t.rect(x, y, 200, 150);
   * });
   * ```
   */
  background(A, e = A, t = A, r = 255) {
    this._renderer.background(A, e, t, r);
  }
  /**
   * Create a shader program from vertex and fragment source code.
   * @param vertexSource The GLSL source code for the vertex shader.
   * @param fragmentSource The GLSL source code for the fragment shader.
   * @returns The created shader program for use in `textmode.js`.
   */
  createShader(A, e) {
    return this._renderer.createShader(A, e);
  }
  /**
   * Set the current shader for rendering.
   * @param shader The shader program to use for rendering.
   */
  shader(A) {
    this._renderer.shader(A);
  }
  /**
   * Set a uniform variable for the current shader.
   * @param name The name of the uniform variable to set.
   * @param value The value to set for the uniform variable.
   */
  setUniform(A, e) {
    this._renderer.setUniform(A, e);
  }
  /** Get the current grid object used for rendering. */
  get grid() {
    return this._grid;
  }
  /** Get the current font object used for rendering. */
  get font() {
    return this._font;
  }
  /** Get the current rendering mode.*/
  get mode() {
    return this._mode;
  }
  /** Get the current textmode conversion pipeline. */
  get pipeline() {
    return this._pipeline;
  }
  /** Get the current frame count. */
  get frameCount() {
    return this._frameCount;
  }
  /** Get the width of the canvas. */
  get width() {
    return this.textmodeCanvas.width;
  }
  /** Get the height of the canvas. */
  get height() {
    return this.textmodeCanvas.height;
  }
}
class Y {
  /**
   * Create a {@link Textmodifier} instance for textmode rendering.
   * 
   * @param sourceOrOptions - Either an HTML canvas/video element for capturing content, or options for standalone mode.
   * @param opts - Optional configuration options *(only used when first parameter is a canvas/video element)*.
   * @returns A Promise that resolves to a Textmodifier instance.
   * 
   * @example
   * ```javascript
   * // Create a Textmodifier for an existing canvas
   * const canvas = document.querySelector('canvas#myCanvas');
   * const textmodifier = await textmode.create(canvas);
   * 
   * ////////
   * 
   * // Create a Textmodifier for a video element
   * const video = document.querySelector('video#myVideo');
   * const textmodifier = await textmode.create(video);
   * 
   * ////////
   * 
   * // Create a standalone Textmodifier
   * const t = await textmode.create({ width: 800, height: 600 });
   * 
   * // Set up a draw loop for standalone usage
   * t.draw(() => {
   *   t.background(0);
   * 
   *   const centerX = t.width / 2;
   *   const centerY = t.height / 2;
   *   const radius = Math.min(t.width, t .height) / 3;
   *   const speed = 0.02; // Adjust speed of rotation
   *
   *   const angle = t.frameCount * speed;
   *   const x = centerX + Math.cos(angle) * radius - 100;
   *   const y = centerY + Math.sin(angle) * radius - 50;
   *
   *   // Set the fill color to white
   *   t.fill(255);
   * 
   *   // Draw a rectangle with the fill color
   *   t.rect(x, y, 200, 150);
   * });
   * ```
   */
  static async create(A, e = {}) {
    if (A instanceof HTMLCanvasElement || A instanceof HTMLVideoElement)
      return T.create(A, e);
    {
      const t = A || {};
      return T.create(null, t);
    }
  }
  /**
   * Set the global error handling level for the library. This applies to all `Textmodifier` instances.
   * @param level The error handling level to set.
   * 
   * @example
   * ```javascript
   * // Set error level to WARNING
   * textmode.setErrorLevel(TextmodeErrorLevel.WARNING);
   * ```
   */
  static setErrorLevel(A) {
    u.setGlobalLevel(A);
  }
  /**
   * Returns the current version of the `textmode.js` library.
   * 
   * @example
   * ```javascript
   * console.log(textmode.version); // "1.0.0"
   * ```
   */
  static get version() {
    return "0.1.2";
  }
  constructor() {
    throw new Error("Textmode is a static class and cannot be instantiated.");
  }
}
const xA = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null
}, Symbol.toStringTag, { value: "Module" })), bA = Y.create, FA = Y.setErrorLevel, yA = Y.version;
export {
  aA as TextmodeCanvas,
  hA as TextmodeConversionPipeline,
  X as TextmodeErrorLevel,
  rA as TextmodeFont,
  iA as TextmodeGrid,
  T as Textmodifier,
  vA as converters,
  bA as create,
  Y as default,
  xA as export,
  FA as setErrorLevel,
  Y as textmode,
  yA as version
};
