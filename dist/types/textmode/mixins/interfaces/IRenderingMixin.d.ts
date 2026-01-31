import type { GLFramebuffer, GLShader, TextmodeFramebufferOptions } from '../../../rendering/webgl';
import type { UniformValue } from '../../../rendering/webgl/types/UniformTypes';
import type { TextmodeImage } from '../../loadables/TextmodeImage';
import type { TextmodeTexture } from '../../loadables/TextmodeTexture';
import type { TextmodeColor } from '../../TextmodeColor';
import type { TextmodeVideo } from '../../loadables';
/**
 * Interface for rendering capabilities that will be mixed into Textmodifier
 */
export interface IRenderingMixin {
    /**
     * Set a custom shader for subsequent rendering operations.
     *
     * The shader persists until explicitly reset via {@link resetShader} or by calling `shader(null)`.
     * This behavior matches p5.js, allowing multiple draw calls with the same shader.
     *
     * @param shader The custom shader to use, or `null` to reset to the default shader.
     *
     * @example
     * ```javascript
     * const t = textmode.create({ width: 800, height: 600 });
     *
     * let glitchShader;
     *
     * t.setup(async() => {
     *     glitchShader = await t.createFilterShader(`#version 300 es
     *   precision highp float;
     *   in vec2 v_uv;
     *   uniform float u_intensity;
     *   layout(location = 0) out vec4 o_character;
     *   layout(location = 1) out vec4 o_primaryColor;
     *   layout(location = 2) out vec4 o_secondaryColor;
     *
     *   void main() {
     *     vec2 offset = vec2(sin(v_uv.y * 50.0) * u_intensity, 0.0);
     *     float pattern = fract(v_uv.x * 20.0 + offset.x);
     *     vec3 color = vec3(pattern, 1.0 - pattern, 0.5);
     *     o_character = vec4(pattern, 0.0, 0.0, 0.0);
     *     o_primaryColor = vec4(color, 1.0);
     *     o_secondaryColor = vec4(color * 0.5, 1.0);
     *   }
     * `);
     * });
     *
     * t.draw(() => {
     *     t.shader(glitchShader);
     *     t.setUniform('u_intensity', Math.sin(t.frameCount * 0.1) * 0.02);
     *
     *     // Draw multiple shapes with the same shader
     *     t.translate(10, 10);
     *     t.rect(20, 20);
     *     t.translate(25, 0);
     *     t.rect(20, 20);
     *
     *     t.resetShader(); // Reset to default when done
     * });
     * ```
     */
    shader(shader: GLShader | null): void;
    /**
     * Reset the current shader to the default solid color shader.
     *
     * This clears both the active shader and any accumulated uniforms set via {@link setUniform}.
     * Equivalent to calling `shader(null)`.
     *
     * @example
     * ```javascript
     * const t = textmode.create({ width: window.innerWidth, height: window.innerHeight });
     *
     * let portalShader;
     *
     * t.setup(async() => {
     *   portalShader = await t.createFilterShader(`#version 300 es
     *     precision highp float;
     *     in vec2 v_uv;
     *     uniform float u_time;
     *     layout(location = 0) out vec4 o_char;
     *     layout(location = 1) out vec4 o_prim;
     *     layout(location = 2) out vec4 o_sec;
     *
     *     void main() {
     *       vec2 p = v_uv * 2.0 - 1.0;
     *       float r = length(p);
     *       float a = atan(p.y, p.x);
     *
     *       // Characters: slow/spatial pattern (avoid rapid flickering)
     *       float charPattern = floor(r * 8.0) / 8.0 + sin(a * 6.0 + u_time * 0.3) * 0.1;
     *       o_char = vec4(charPattern, 0.0, 0.0, 1.0);
     *
     *       // Colors: can animate rapidly for smooth visual effect
     *       float wave = sin(r * 20.0 - u_time * 5.0 + sin(a * 10.0));
     *       o_prim = vec4(0.5 + 0.5 * cos(u_time + r * 2.0), 0.2 + wave * 0.3, 0.8, 1.0);
     *       o_sec = vec4(0.0);
     *     }
     *   `);
     * });
     *
     * t.draw(() => {
     *   t.background(0);
     *
     *   if (portalShader) {
     *     t.shader(portalShader);
     *     t.setUniform('u_time', t.frameCount * 0.02);
     *
     *     // Draw the portal background
     *     t.rect(t.grid.cols, t.grid.rows);
     *   }
     *
     *   // Reset to default shader for foreground objects
     *   t.resetShader();
     *
     *   // Draw floating objects in front of the portal
     *   const count = 8;
     *   for (let i = 0; i < count; i++) {
     *     const angle = t.frameCount * 0.05 + (i / count) * Math.PI * 2;
     *     const x = Math.cos(angle) * 15;
     *     const y = Math.sin(angle) * 15;
     *
     *     t.push();
     *     t.translate(x, y);
     *     t.rotateZ(angle * 2);
     *     t.char('♦');
     *     t.charColor(255, 200, 100);
     *     t.rect(5, 5);
     *     t.pop();
     *   }
     * });
     *
     * t.windowResized(() => {
     *   t.resizeCanvas(window.innerWidth, window.innerHeight);
     * });
     * ```
     */
    resetShader(): void;
    /**
     * Create a new framebuffer for offscreen rendering.
     *
     * The framebuffer uses the same MRT structure as the main rendering pipeline.
     * By default it allocates 3 attachments (character + color data).
     *
     * @param options Configuration options for the framebuffer.
     * @returns A new Framebuffer instance.
     *
     * @example
     * ```javascript
     * const t = textmode.create({
     *   width: 800,
     *   height: 600,
     * });
     *
     * // Create a framebuffer with 50x30 grid cells
     * const fb = t.createFramebuffer({
     *   width: 50,
     *   height: 30
     * });
     *
     * t.draw(() => {
     *   // Render to framebuffer
     *   fb.begin();
     *   t.background(255, 0, 0);
     *   t.charColor(255);
     *   t.char('A');
     *   t.rect(20, 10);
     *   fb.end();
     *
     *   // Render framebuffer to main canvas
     *   t.background(0);
     *   t.rotateZ(t.frameCount * 2);
     *   t.image(fb);
     * });
     * ```
     */
    createFramebuffer(options: TextmodeFramebufferOptions): GLFramebuffer;
    /**
     * Draw a TextmodeFramebuffer, TextmodeImage, TextmodeVideo, or TextmodeTexture to the current render target.
     *
     * @param source The TextmodeFramebuffer, TextmodeImage, TextmodeVideo, or TextmodeTexture to render
     * @param width Width in grid cells to potentially scale the content (defaults to ideal fit, respecting aspect ratio)
     * @param height Height in grid cells to potentially scale the content (defaults to ideal fit, respecting aspect ratio)
     *
     * @example
     * ```javascript
     * const t = textmode.create({
     *   width: 800,
     *   height: 600,
     * });
     *
     * const fb = t.createFramebuffer({width: 30, height: 20});
     *
     * t.draw(() => {
     *   // Draw something to the framebuffer
     *   fb.begin();
     *   t.clear();
     *   t.charColor(255, 0, 0);
     *   t.char('A');
     *   t.rect(20, 10);
     *   fb.end();
     *
     *   // Clear main canvas and render framebuffer content
     *   t.background(0);
     *
     *   // Render at original size
     *   t.image(fb);
     *
     *   // Render scaled version
     *   // t.image(fb, 60, 40);
     * });
     * ```
     */
    image(source: GLFramebuffer | TextmodeImage | TextmodeVideo | TextmodeTexture, width?: number, height?: number): void;
    /**
     * Load an image and return a TextmodeImage that can be drawn with image().
     *
     * The loaded image can be rendered to the canvas using the {@link image} method.
     * This function returns a Promise that resolves when the image has loaded.
     *
     * @param src URL of the image file
     * @returns A Promise that resolves to a TextmodeImage object
     *
     * @example
     * ```javascript
     * // Loading and rendering external assets
     * const t = textmode.create({ width: window.innerWidth, height: window.innerHeight });
     *
     * let img;
     *
     * t.setup(async () => {
     *   // Remote image URL
     *   const url = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80';
     *   img = await t.loadImage(url);
     *
     *   // Configure character mapping for the image
     *   img.characters(" .:-=+*#%@");
     * });
     *
     * t.draw(() => {
     *   t.background(0);
     *   if (img) {
     *     // Pulse image scale and rotation
     *     const scale = 1 + Math.sin(t.frameCount * 0.05) * 0.1;
     *     t.rotateZ(Math.sin(t.frameCount * 0.02) * 5);
     *     t.image(img, t.grid.cols * scale, t.grid.rows * scale);
     *   }
     * });
     *
     * t.windowResized(() => {
     *   t.resizeCanvas(window.innerWidth, window.innerHeight);
     * });
     * ```
     */
    loadImage(src: string): Promise<TextmodeImage>;
    /**
     * Load a video and return a TextmodeVideo that can be drawn with image().
     * @param src URL of the video file
     *
     * @example
     * ```javascript
     * // Video to ASCII conversion
     * const t = textmode.create({ width: window.innerWidth, height: window.innerHeight });
     *
     * let video;
     *
     * t.setup(async () => {
     *   const url = 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4';
     *   video = await t.loadVideo(url);
     *
     *   // Configure video playback
     *   video.play();
     *   video.loop();
     *
     *   // Set ASCII density characters
     *   video.characters(" .:-=+*#%@");
     * });
     *
     * t.draw(() => {
     *   t.background(0);
     *   if (video) {
     *     // Rotate and draw the video
     *     t.rotateY(t.frameCount);
     *     t.image(video, 40, 30);
     *   }
     * });
     *
     * t.windowResized(() => {
     *   t.resizeCanvas(window.innerWidth, window.innerHeight);
     * });
     * ```
     */
    loadVideo(src: string): Promise<TextmodeVideo>;
    /**
     * Create a texture from an external canvas or video element for integration with other WebGL libraries.
     *
     * This method enables seamless integration with libraries like three.js, p5.js, Babylon.js,
     * hydra-synth, or any library that renders to a canvas element.
     *
     * The texture automatically updates each frame to capture the latest content from the source.
     *
     * @param source Canvas or video element from an external library
     * @returns A TextmodeTexture that can be drawn with image()
     *
     * @example
     * ```js
     * // === Three.js Integration ===
     * const threeRenderer = new THREE.WebGLRenderer();
     * // ... setup three.js scene ...
     *
     * const t = textmode.create({ width: 800, height: 600 });
     *
     * let tex;
     *
     * t.setup(() => {
     *     // Create texture from three.js canvas - auto-updates every frame
     *     tex = t.createTexture(threeRenderer.domElement);
     *     tex.characters(" .:-=+*#%@")
     *        .charColorMode("sampled")
     *        .cellColorMode("fixed")
     *        .cellColor(0);
     * });
     *
     * t.draw(() => {
     *     // Render three.js scene first
     *     threeRenderer.render(scene, camera);
     *
     *     // Then render as textmode
     *     t.background(0);
     *     t.image(tex);
     * });
     * ```
     *
     * @example
     * ```js
     * // === hydra-synth Integration ===
     * const hydraInstance = new HydraSynth({ width: 800, height: 600 });
     * hydraInstance.synth.osc(10, 0.1).out();
     *
     * let tex;
     *
     * t.setup(() => {
     *     tex = t.createTexture(hydraInstance.canvas);
     *     tex.characters(" .:-=+*#%@");
     * });
     *
     * t.draw(() => {
     *     t.image(tex);
     * });
     * ```
     */
    createTexture(source: HTMLCanvasElement | HTMLVideoElement): TextmodeTexture;
    /**
     * Set a uniform value for the current custom shader.
     * @param name The name of the uniform variable
     * @param value The value to set
     *
     * @example
     * ```javascript
     * // Passing CPU values to Shaders
     * const t = textmode.create({ width: window.innerWidth, height: window.innerHeight });
     *
     * let pulseShader;
     * t.setup(async () => {
     *   pulseShader = await t.createFilterShader(`#version 300 es
     *     precision highp float;
     *     in vec2 v_uv;
     *     uniform float u_time;
     *     layout(location = 0) out vec4 o_char;
     *     layout(location = 1) out vec4 o_col;
     *     layout(location = 2) out vec4 o_bg;
     *     void main() {
     *       float p = 0.5 + 0.5 * sin(u_time + v_uv.x);
     *       o_char = vec4(p, 0.0, 0.0, 1.0);
     *       o_col = vec4(v_uv, 1.0, 1.0);
     *       o_bg = vec4(0.0, 0.0, 0.0, 1.0);
     *     }
     *   `);
     * });
     *
     * t.draw(() => {
     *   t.background(0);
     *   if (pulseShader) {
     *     t.shader(pulseShader);
     *     // Sync CPU state to GPU uniform
     *     t.setUniform('u_time', t.frameCount * 0.001);
     *     t.rect(t.grid.cols, t.grid.rows);
     *   }
     * });
     *
     * t.windowResized(() => {
     *   t.resizeCanvas(window.innerWidth, window.innerHeight);
     * });
     * ```
     */
    setUniform(name: string, value: UniformValue): void;
    /**
     * Set multiple uniform values for the current custom shader.
     * @param uniforms Object containing uniform name-value pairs
     *
     * @example
     * ```javascript
     * // Bulk uniform updates
     * const t = textmode.create({ width: window.innerWidth, height: window.innerHeight });
     *
     * let ripple;
     * t.setup(async () => {
     *   ripple = await t.createFilterShader(`#version 300 es
     *     precision highp float;
     *     in vec2 v_uv;
     *     uniform float u_time; uniform vec2 u_mouse;
     *     layout(location = 0) out vec4 o_c;
     *     layout(location = 1) out vec4 o_p;
     *     layout(location = 2) out vec4 o_s;
     *     void main() {
     *       float d = length(v_uv - u_mouse);
     *       float w = 0.5 + 0.5 * sin(d * 20.0 - u_time);
     *       o_c = vec4(w, 0.0, 0.0, 1.0);
     *       o_p = vec4(0.2, 0.5, 1.0, 1.0);
     *       o_s = vec4(0.0);
     *     }
     *   `);
     * });
     *
     * t.draw(() => {
     *   t.background(0);
     *   if (ripple) {
     *     t.shader(ripple);
     *     t.setUniforms({
     *       u_time: t.frameCount * 0.05,
     *       u_mouse: [t.mouse.x, t.mouse.y]
     *     });
     *     t.rect(t.grid.cols, t.grid.rows);
     *   }
     * });
     *
     * t.windowResized(() => {
     *   t.resizeCanvas(window.innerWidth, window.innerHeight);
     * });
     * ```
     */
    setUniforms(uniforms: Record<string, UniformValue>): void;
    /**
     * Create a custom filter shader from fragment shader source code or a file path.
     * The fragment shader automatically receives the standard vertex shader inputs
     * and must output to the 3 MRT attachments (character/transform, primary color, secondary color).
     * @param fragmentSource The fragment shader source code or a file path (e.g., './shader.frag')
     * @returns A Promise that resolves to a compiled shader ready for use with {@link shader}
     *
     * @example
     * ```javascript
     * const t = textmode.create({
     *   width: 800,
     *   height: 600,
     * })
     *
     * let waveShader;
     *
     * t.setup(async () => {
     *   // Load shader from file
     *   waveShader = await t.createFilterShader('./shader.frag');
     *
     *   // Or create from inline source
     *   // waveShader = await t.createFilterShader(`#version 300 es
     *   //   precision highp float;
     *   //
     *   //   in vec2 v_uv;
     *   //   in vec3 v_character;
     *   //   in vec4 v_primaryColor;
     *   //   in vec4 v_secondaryColor;
     *   //
     *   //   uniform float u_time;
     *   //
     *   //   layout(location = 0) out vec4 o_character;
     *   //   layout(location = 1) out vec4 o_primaryColor;
     *   //   layout(location = 2) out vec4 o_secondaryColor;
     *   //
     *   //   void main() {
     *   //     // Shader code here
     *   //   }
     *   // `);
     * });
     *
     * t.draw(() => {
     *   if (waveShader) {
     *     t.shader(waveShader);
     *     t.setUniform('u_time', t.frameCount * 0.003);
     *     t.rect(t.grid.cols, t.grid.rows);
     *   }
     * });
     * ```
     */
    createFilterShader(fragmentSource: string): Promise<GLShader>;
    /**
     * Create a shader from vertex and fragment source code or file paths.
     * Accepts inline shader source or file paths (e.g. './shader.frag', './shader.vert', '.frag', '.vert').
     * @param vertexSource The vertex shader source code or a file path
     * @param fragmentSource The fragment shader source code or a file path
     * @returns A Promise that resolves to a compiled shader
     *
     * @example
     * ```javascript
     * const t = textmode.create({ width: 800, height: 600 });
     *
     * let customShader;
     *
     * t.setup(async () => {
     *   // Define a vertex shader that passes through position and UVs
     *   const vert = `#version 300 es
     *     in vec4 a_position;
     *     in vec2 a_uv;
     *     out vec2 v_uv;
     *     void main() {
     *       gl_Position = a_position;
     *       v_uv = a_uv;
     *     }
     *   `;
     *
     *   // Define a fragment shader that outputs a solid color
     *   // Note: Must match the MRT output layout of the textmode pipeline
     *   const frag = `#version 300 es
     *     precision highp float;
     *     in vec2 v_uv;
     *     layout(location = 0) out vec4 o_character;
     *     layout(location = 1) out vec4 o_primaryColor;
     *     layout(location = 2) out vec4 o_secondaryColor;
     *
     *     void main() {
     *        // Output character data (RG=char index/value)
     *        o_character = vec4(0.1, 0.0, 0.0, 0.0);
     *        // Output primary color (Red)
     *        o_primaryColor = vec4(1.0, 0.0, 0.0, 1.0);
     *        // Output secondary color (Transparent)
     *        o_secondaryColor = vec4(0.0);
     *     }
     *   `;
     *
     *   customShader = await t.createShader(vert, frag);
     * });
     *
     * t.draw(() => {
     *   if (customShader) {
     *     t.shader(customShader);
     *     t.rect(10, 10);
     *   }
     * });
     * ```
     */
    createShader(vertexSource: string, fragmentSource: string): Promise<GLShader>;
    /**
     * Sets the rotation angles for subsequent shape rendering operations.
     *
     * All geometries rotate around the center of the shape.
     *
     * @param degreesX The rotation angle in degrees around the X-axis (optional, defaults to 0)
     * @param degreesY The rotation angle in degrees around the Y-axis (optional, defaults to 0)
     * @param degreesZ The rotation angle in degrees around the Z-axis (optional, defaults to 0)
     *
     * @example
     * ```javascript
     * const t = textmode.create({ width: 800, height: 600 });
     *
     * t.draw(() => {
     *   t.background(0);
     *
     *   // Draw three rectangles rotating in 3D space with different axes
     *   for (let i = 0; i < 3; i++) {
     *     t.push();
     *     t.translate(i * 15 - 15, 0, 0);
     *
     *     const angle = t.frameCount * (1.5 + i * 0.5);
     *     // Each shape rotates around different combinations of axes
     *     t.rotate(angle * 0.7, angle * 0.5, angle);
     *
     *     t.char(['T', 'X', 'T'][i]);
     *     t.charColor(100 + i * 60, 200 - i * 40, 255);
     *     t.rect(10, 10);
     *     t.pop();
     *   }
     * });
     * ```
     */
    rotate(degreesX?: number, degreesY?: number, degreesZ?: number): void;
    /**
     * Sets the X-axis rotation angle for subsequent shape rendering operations, or gets the current angle.
     *
     * All geometries rotate around the center of the shape.
     *
     * @param degrees The rotation angle in degrees around the X-axis. If not provided, returns the current accumulated rotation.
     * @returns The current X-axis rotation in degrees if called without arguments.
     *
     * @example
     * ```javascript
     * // A field of oscillating slabs
     * const t = textmode.create({ width: window.innerWidth, height: window.innerHeight });
     *
     * t.draw(() => {
     *   t.background(0);
     *
     *   const cols = 5;
     *   const rows = 5;
     *   const spacing = 12;
     *
     *   for (let x = 0; x < cols; x++) {
     *     for (let y = 0; y < rows; y++) {
     *       t.push();
     *       // Position in grid
     *       t.translate((x - (cols - 1) / 2) * spacing, (y - (rows - 1) / 2) * spacing);
     *
     *       // Rotation with phase shift based on position
     *       const angle = t.frameCount * 4 + (x + y) * 20;
     *       t.rotateX(angle);
     *
     *       // Aesthetic coloring based on rotation phase
     *       const intensity = Math.sin(angle * Math.PI / 180);
     *       const brightness = 127 + 127 * intensity;
     *
     *       t.charColor(brightness, 150, 255 - brightness);
     *       t.char(Math.abs(intensity) > 0.5 ? '█' : '▒');
     *
     *       t.rect(10, 8);
     *       t.pop();
     *     }
     *   }
     * });
     *
     * t.windowResized(() => {
     *   t.resizeCanvas(window.innerWidth, window.innerHeight);
     * });
     * ```
     */
    rotateX(degrees?: number): number | void;
    /**
     * Sets the Y-axis rotation angle for subsequent shape rendering operations, or gets the current angle.
     *
     * All geometries rotate around the center of the shape.
     *
     * @param degrees The rotation angle in degrees around the Y-axis. If not provided, returns the current accumulated rotation.
     * @returns The current Y-axis rotation in degrees if called without arguments.
     *
     * @example
     * ```javascript
     * // A vertical stack of spinning glyphs
     * const t = textmode.create({ width: window.innerWidth, height: window.innerHeight });
     *
     * t.draw(() => {
     *   t.background(0);
     *
     *   const count = 15;
     *   const spacing = 4;
     *
     *   for (let i = 0; i < count; i++) {
     *     const phase = i / count;
     *     const angle = t.frameCount * 3 + i * 20;
     *
     *     t.push();
     *     // Stack vertically
     *     t.translate(0, (i - (count - 1) / 2) * spacing);
     *
     *     // Rotate around Y axis (vertical spin)
     *     t.rotateY(angle);
     *
     *     // Dynamic character selection based on "side" of rotation
     *     const side = Math.cos(angle * Math.PI / 180);
     *     t.char(side > 0 ? '▓' : '░');
     *
     *     // Cyberpunk color palette
     *     t.charColor(100, 255, 200);
     *     if (Math.abs(side) < 0.2) t.charColor(255, 255, 255); // Flash on edge
     *
     *     t.rect(20, 3);
     *     t.pop();
     *   }
     * });
     *
     * t.windowResized(() => {
     *   t.resizeCanvas(window.innerWidth, window.innerHeight);
     * });
     * ```
     */
    rotateY(degrees?: number): number | void;
    /**
     * Sets the Z-axis rotation angle for subsequent shape rendering operations, or gets the current angle.
     *
     * All geometries rotate around the center of the shape.
     *
     * @param degrees The rotation angle in degrees around the Z-axis. If not provided, returns the current accumulated rotation.
     * @returns The current Z-axis rotation in degrees if called without arguments.
     *
     * @example
     * ```javascript
     * // Layered rotation and symmetry
     * const t = textmode.create({ width: window.innerWidth, height: window.innerHeight });
     *
     * t.draw(() => {
     *   t.background(10, 5, 20);
     *
     *   const layers = 8;
     *   const time = t.frameCount;
     *
     *   for (let i = 0; i < layers; i++) {
     *     const progress = i / layers;
     *     const angle = time * (1 + progress) + i * 45;
     *
     *     t.push();
     *     // Rotate around Z axis (flat spin)
     *     t.rotateZ(angle);
     *
     *     // Dynamic size and character
     *     const size = 30 - i * 3;
     *     t.char(['.', '=', '+', '!', '?'][i % 5]);
     *
     *     // Neon color gradient
     *     t.charColor(255, 100 + i * 20, 200 - i * 10);

     *     t.rect(size, size);
     *     t.pop();
     *   }
     * });
     *
     * t.windowResized(() => {
     *   t.resizeCanvas(window.innerWidth, window.innerHeight);
     * });
     * ```
     */
    rotateZ(degrees?: number): number | void;
    /**
     * Sets the translation offsets for subsequent shape rendering operations.
     *
     * All geometries are displaced by the specified amounts. Similar to p5.js translate().
     *
     * @param x Translation along the X-axis in grid cells (optional, defaults to 0)
     * @param y Translation along the Y-axis in grid cells (optional, defaults to 0)
     * @param z Translation along the Z-axis in grid cells (optional, defaults to 0)
     *
     * @example
     * ```javascript
     * // Rhythmic translation field
     * const t = textmode.create({ width: window.innerWidth, height: window.innerHeight });
     *
     * t.draw(() => {
     *   t.background(0);
     *
     *   const count = 32;
     *   const time = t.frameCount * 0.05;
     *
     *   for (let i = 0; i < count; i++) {
     *     const phase = i / count;
     *     const x = (phase - 0.5) * t.grid.cols * 0.8;
     *     const y = Math.sin(time + phase * 10) * 15;
     *
     *     t.push();
     *     // Displace glyph in space
     *     t.translate(x, y, Math.cos(time + phase * 5) * 10);
     *
     *     t.charColor(100, 155 + y * 5, 255);
     *     t.char('≈');
     *     t.point();
     *     t.pop();
     *   }
     * });
     *
     * t.windowResized(() => {
     *   t.resizeCanvas(window.innerWidth, window.innerHeight);
     * });
     * ```
     */
    translate(x?: number, y?: number, z?: number): void;
    /**
     * Gets the current accumulated X-axis translation offset.
     * @returns The current X-axis translation in grid cells.
     *
     * @example
     * ```javascript
     * const t = textmode.create({ width: window.innerWidth, height: window.innerHeight });
     *
     * t.draw(() => {
     *   t.background(0);
     *
     *   t.push();
     *   // Move based on sine wave
     *   t.translateX(Math.sin(t.frameCount * 0.05) * 20);
     *
     *   // Use the actual position to determine rotation speed
     *   const x = t.translateX();
     *   t.rotateZ(t.frameCount + x);
     *
     *   t.charColor(150 + x * 5, 200, 255);
     *   t.char('X');
     *   t.rect(10, 10);
     *   t.pop();
     * });
     *
     * t.windowResized(() => {
     *   t.resizeCanvas(window.innerWidth, window.innerHeight);
     * });
     * ```
     */
    translateX(): number;
    /**
     * Sets the X-axis translation offset for subsequent shape rendering operations.
     * @param pixels The translation offset in grid cells along the X-axis.
     *
     * @example
     * ```javascript
     * // Horizontal oscillation field
     * const t = textmode.create({ width: window.innerWidth, height: window.innerHeight });
     *
     * t.draw(() => {
     *   t.background(0, 10, 0);
     *
     *   const count = 64;
     *   for (let i = 0; i < count; i++) {
     *     t.push();
     *     // Vertical position
     *     t.translateY((i - (count - 1) / 2));
     *
     *     // Oscillating horizontal position
     *     const x = Math.sin(t.frameCount * 0.04 + i * 0.5) * 25;
     *     t.translateX(x);
     *
     *     t.charColor(0, 255, 100);
     *     t.char('█');
     *     t.rect(4, 2);
     *     t.pop();
     *   }
     * });
     *
     * t.windowResized(() => {
     *   t.resizeCanvas(window.innerWidth, window.innerHeight);
     * });
     * ```
     */
    translateX(pixels: number): void;
    /**
     * Gets the current accumulated Y-axis translation offset.
     * @returns The current Y-axis translation in grid cells.
     *
     * @example
     * ```javascript
     * const t = textmode.create({ width: window.innerWidth, height: window.innerHeight });
     *
     * t.draw(() => {
     *   t.background(0);
     *
     *   const yPos = Math.sin(t.frameCount * 0.03) * 15;
     *
     *   t.push();
     *   t.translateY(yPos);
     *
     *   // Visualize the Y coordinate
     *   const currentY = t.translateY();
     *   if (currentY > 0) t.char('▲');
     *   else t.char('▼');
     *
     *   t.charColor(255, 255 - Math.abs(currentY) * 10, 100);
     *   t.rect(8, 8);
     *   t.pop();
     * });
     *
     * t.windowResized(() => {
     *   t.resizeCanvas(window.innerWidth, window.innerHeight);
     * });
     * ```
     */
    translateY(): number;
    /**
     * Sets the Y-axis translation offset for subsequent shape rendering operations.
     * @param pixels The translation offset in grid cells along the Y-axis.
     *
     * @example
     * ```javascript
     * // Cascading vertical motion
     * const t = textmode.create({ width: window.innerWidth, height: window.innerHeight });
     *
     * t.draw(() => {
     *   t.background(0, 0, 10);
     *
     *   const drops = 128;
     *   for (let i = 0; i < drops; i++) {
     *     t.push();
     *     // Horizontal position
     *     t.translateX((i - (drops - 1) / 2) * 8);
     *
     *     // Vertical fall with wrapping
     *     const speed = 1 + (i % 3) * 0.5;
     *     const y = (t.frameCount * speed + i * 20) % (t.grid.rows + 10) - (t.grid.rows + 10) / 2;
     *     t.translateY(y);
     *
     *     t.charColor(100, 200, 255);
     *     t.char('|');
     *     t.point();
     *     t.pop();
     *   }
     * });
     *
     * t.windowResized(() => {
     *   t.resizeCanvas(window.innerWidth, window.innerHeight);
     * });
     * ```
     */
    translateY(pixels: number): void;
    /**
     * Gets the current accumulated Z-axis translation offset.
     * @returns The current Z-axis translation in grid cells.
     *
     * @example
     * ```javascript
     * const t = textmode.create({ width: window.innerWidth, height: window.innerHeight });
     *
     * t.draw(() => {
     *   t.background(0);
     *
     *   t.push();
     *   t.translateZ(Math.sin(t.frameCount * 0.05) * 50);
     *
     *   const depth = t.translateZ();
     *
     *   // Fade out as it goes further back (manual fog effect)
     *   const alpha = 50 + (depth + 50) * 2;
     *   t.charColor(255, 255, 255, alpha);
     *
     *   t.char('Z');
     *   t.rect(10, 10);
     *   t.pop();
     * });
     *
     * t.windowResized(() => {
     *   t.resizeCanvas(window.innerWidth, window.innerHeight);
     * });
     * ```
     */
    translateZ(): number;
    /**
     * Sets the Z-axis translation offset for subsequent shape rendering operations.
     * @param pixels The translation offset in grid cells along the Z-axis.
     *
     * @example
     * ```javascript
     * const t = textmode.create({ width: 800, height: 600 });
     *
     * t.draw(() => {
     *   t.background(0);
     *   t.char('O');
     *   t.charColor(180, 120, 255);
     *   t.translateZ(Math.sin(t.frameCount * 0.05) * 20); // Pulse in/out
     *   t.rect(12, 12);
     * });
     * ```
     */
    translateZ(pixels: number): void;
    /**
     * Enables orthographic projection for subsequent shape rendering operations.
     *
     * By default, textmode uses a perspective projection. Calling this method switches to an
     * orthographic projection, where objects maintain their size regardless of depth (Z position).
     *
     * The projection mode is reset to perspective at the beginning of each frame.
     *
     * @example
     * ```javascript
     * // Orthographic projection vs Depth
     * const t = textmode.create({ width: window.innerWidth, height: window.innerHeight });
     *
     * t.draw(() => {
     *   t.background(0);
     *
     *   // Enable orthographic mode - Z depth no longer affects scale
     *   t.ortho();
     *
     *   const count = 12;
     *   for (let i = 0; i < count; i++) {
     *     const angle = (i / count) * Math.PI * 2 + t.frameCount * 0.02;
     *     const x = Math.cos(angle) * 20;
     *     const y = Math.sin(angle) * 20;
     *     const z = Math.sin(t.frameCount * 0.05 + i) * 50;
     *
     *     t.push();
     *     t.translate(x, y, z);
     *     t.charColor(200, 255, 100);
     *     t.char('█');
     *     t.rect(5, 5); // Rect stays same size despite oscillating Z
     *     t.pop();
     *   }
     * });
     *
     * t.windowResized(() => {
     *   t.resizeCanvas(window.innerWidth, window.innerHeight);
     * });
     * ```
     */
    ortho(): void;
    /**
     * Save the current rendering state to the state stack.
     * Use with {@link pop} to isolate style changes within a block.
     *
     * @example
     * ```javascript
     * const t = textmode.create({ width: 800, height: 600 });
     *
     * t.draw(() => {
     *   t.background(0);
     *
     *   // Draw three rotating shapes with isolated transformations and colors
     *   for (let i = 0; i < 3; i++) {
     *     t.push(); // Save state
     *     t.translate(i * 12 - 12, 0);
     *     t.rotateZ(t.frameCount * (1 + i * 0.5));
     *     t.charColor(100 + i * 70, 255 - i * 50, 150);
     *     t.char(['*', '@', '#'][i]);
     *     t.rect(8, 8);
     *     t.pop(); // Restore state - next iteration starts fresh
     *   }
     * });
     * ```
     */
    push(): void;
    /**
     * Restore the most recently saved rendering state from the state stack.
     * Use with {@link push} to isolate style changes within a block.
     *
     * @example
     * ```javascript
     * const t = textmode.create({ width: 800, height: 600 });
     *
     * t.draw(() => {
     *   t.background(0);
     *
     *   // Draw three rotating shapes with isolated transformations and colors
     *   for (let i = 0; i < 3; i++) {
     *     t.push(); // Save state
     *     t.translate(i * 12 - 12, 0);
     *     t.rotateZ(t.frameCount * (1 + i * 0.5));
     *     t.charColor(100 + i * 70, 255 - i * 50, 150);
     *     t.char(['*', '@', '#'][i]);
     *     t.rect(8, 8);
     *     t.pop(); // Restore state - next iteration starts fresh
     *   }
     * });
     * ```
     */
    pop(): void;
    /**
     * Create a reusable color object from a grayscale value.
     *
     * @param gray Grayscale value (0-255)
     * @param alpha Optional alpha value (0-255)
     * @returns A TextmodeColor instance
     *
     * @example
     * ```javascript
     * // Dynamic color creation
     * const t = textmode.create({ width: window.innerWidth, height: window.innerHeight });
     *
     * t.draw(() => {
     *   t.background(0);
     *
     *   const count = 10;
     *   for (let i = 0; i < count; i++) {
     *     // Create a reusable color for each slice
     *     const brightness = (i / (count - 1)) * 255;
     *     const col = t.color(brightness);
     *
     *     t.push();
     *     t.translate((i - (count - 1) / 2) * 5, 0);
     *     t.charColor(col);
     *     t.char('█');
     *     t.rect(4, 30);
     *     t.pop();
     *   }
     * });
     *
     * t.windowResized(() => {
     *   t.resizeCanvas(window.innerWidth, window.innerHeight);
     * });
     * ```
     */
    color(gray: number, alpha?: number): TextmodeColor;
    /**
     * Create a reusable color object from RGB(A) values.
     *
     * @param r Red component (0-255)
     * @param g Green component (0-255)
     * @param b Blue component (0-255)
     * @param a Optional alpha component (0-255)
     * @returns A TextmodeColor instance
     *
     * @example
     * ```javascript
     * const t = textmode.create({ width: 800, height: 600 });
     *
     * // Create reusable colors
     * const red = t.color(255, 50, 50);
     * const blue = t.color(50, 100, 255);
     * // Semi-transparent yellow
     * const yellow = t.color(255, 255, 0, 150);
     *
     * t.draw(() => {
     *   t.background(20);
     *

     *   // Draw overlapping circles to show mixing
     *   const x = Math.sin(t.frameCount * 0.05) * 10;
     *
     *   t.char('O');
     *
     *   t.push();
     *   t.translate(-8 + x, 0);
     *   t.charColor(red);
     *   t.ellipse(16, 16);
     *   t.pop();
     *
     *   t.push();
     *   t.translate(8 - x, 0);
     *   t.charColor(blue);
     *   t.ellipse(16, 16);
     *   t.pop();
     *
     *   // Center shape
     *   t.charColor(yellow);
     *   t.ellipse(12, 12);
     * });
     * ```
     */
    color(r: number, g: number, b: number, a?: number): TextmodeColor;
    /**
     * Create a reusable color object from a CSS string or existing TextmodeColor.
     *
     * Accepts hex strings (e.g. `'#FF0000'`) and `rgb()`/`rgba()` strings.
     * **Note:** Named CSS colors (e.g., `'red'`, `'blue'`) are **not** supported.
     *
     * @param value Hex string, `rgb()`/`rgba()` string, or an existing color object
     * @returns A TextmodeColor instance
     *
     * @example
     * ```javascript
     * const dusk = t.color('#203040');
     * const copy = t.color(dusk);
     * ```
     */
    color(value: string | TextmodeColor): TextmodeColor;
    /**
     * Draw a rectangle with the current settings.
     * Position is controlled via {@link translate}, {@link push}, and {@link pop}.
     * @param width Width of the rectangle in grid cells (defaults to 1)
     * @param height Height of the rectangle in grid cells (defaults to 1)
     *
     * @example
     * ```javascript
     * const t = textmode.create({ width: window.innerWidth, height: window.innerHeight });
     *
     * t.draw(() => {
     *   t.background(0);
     *
     *   const time = t.frameCount * 0.5;
     *   const squareCount = 64;
     *   const maxSize = Math.max(t.grid.cols, t.grid.rows) * 1.5;
     *
     *   // Draw squares from back to front for a depth effect
     *   for (let i = squareCount; i > 0; i--) {
     *     const progress = i / squareCount;
     *     const size = maxSize * Math.pow(progress, 1.5);
     *     const rotation = time + i * 15;
     *
     *     t.push();
     *     t.rotateZ(rotation);
     *
     *     // Dynamic coloring based on "depth"
     *     const brightness = Math.round(255 * (1 - progress));
     *     t.charColor(brightness, Math.round(brightness * 0.5), 255);
     *     t.char(['░', '▒', '▓', '█'][i % 4]);
     *
     *     t.rect(size, size);
     *     t.pop();
     *   }
     * });
     *
     * t.windowResized(() => {
     *   t.resizeCanvas(window.innerWidth, window.innerHeight);
     * });
     * ```
     */
    rect(width?: number, height?: number): void;
    /**
     * Draw a 1x1 rectangle with the current settings.
     *
     * @example
     * ```javascript
     * const t = textmode.create({ width: window.innerWidth, height: window.innerHeight });
     *
     * t.draw(() => {
     *   t.background(10, 10, 20);
     *
     *   const time = t.frameCount * 0.05;
     *   const radius = Math.min(t.grid.cols, t.grid.rows) * 0.35;
     *
     *   // Draw a rhythmic particle trail using point()
     *   for (let i = 0; i < 30; i++) {
     *     const angle = time - i * 0.1;
     *     const r = radius * (0.8 + 0.4 * Math.sin(time * 0.3 + i * 0.2));
     *     const x = Math.cos(angle) * r;
     *     const y = Math.sin(angle) * r;
     *
     *     const life = 1 - i / 30;
     *     t.push();
     *     t.translate(x, y);
     *     t.char(['*', '·', '•', '°'][i % 4]);
     *     t.charColor(255 * life, 150 * life, 255);
     *     t.point();
     *     t.pop();
     *   }
     * });
     *
     * t.windowResized(() => {
     *   t.resizeCanvas(window.innerWidth, window.innerHeight);
     * });
     * ```
     */
    point(): void;
    /**
     * Draw a line from point (x1, y1) to point (x2, y2) with the settings.
     * @param x1 X-coordinate of the line start point in grid cells
     * @param y1 Y-coordinate of the line start point in grid cells
     * @param x2 X-coordinate of the line end point in grid cells
     * @param y2 Y-coordinate of the line end point in grid cells
     *
     * @example
     * ```javascript
     * const t = textmode.create({ width: window.innerWidth, height: window.innerHeight });
     *
     * t.draw(() => {
     *   t.background(10, 10, 20);
     *
     *   const time = t.frameCount * 0.01;
     *   const lineCount = 24;
     *   const radius = Math.min(t.grid.cols, t.grid.rows) * 0.4;
     *
     *   t.lineWeight(2);
     *
     *   // Spinning web of lines
     *   for (let i = 0; i < lineCount; i++) {
     *     const phase1 = (i / lineCount) * Math.PI * 2;
     *     const phase2 = phase1 + Math.PI + Math.sin(time) * Math.PI;
     *
     *     // Points on two different rotating circles
     *     const x1 = Math.cos(phase1 + time) * radius;
     *     const y1 = Math.sin(phase1 * 2 + time * 1.5) * radius * 0.5;
     *
     *     const x2 = Math.cos(phase2 - time * 0.7) * radius * 0.8;
     *     const y2 = Math.sin(phase2 * 1.5 - time) * radius;
     *
     *     // Emergent color based on line index
     *     const r = 127 + 127 * Math.sin(phase1 + time);
     *     const g = 127 + 127 * Math.cos(phase1 * 0.5 + time);
     *     t.charColor(r, g, 255);
     *
     * 	   t.char(['+', '-', '|', '/'][i % 4]);
     *
     *     t.line(x1, y1, x2, y2);
     *   }
     * });
     *
     * t.windowResized(() => {
     *   t.resizeCanvas(window.innerWidth, window.innerHeight);
     * });
     * ```
     */
    line(x1: number, y1: number, x2: number, y2: number): void;
    /**
     * Get the current background color.
     * @returns The current background color as a {@link TextmodeColor}.
     *
     * @example
     * ```javascript
     * const t = textmode.create({ width: window.innerWidth, height: window.innerHeight });
     *
     * t.draw(() => {
     *   // Set dynamic background
     *   t.background(
     *     127 + 127 * Math.sin(t.frameCount * 0.01),
     *     50,
     *     127 + 127 * Math.cos(t.frameCount * 0.01)
     *   );
     *
     *   // Retrieve it to create a contrasting shape color
     *   const bg = t.background();
     *   t.charColor(255 - bg.r, 255 - bg.g, 255 - bg.b);
     *
     *   t.char('☼');
     *   t.rect(10, 10);
     * });
     *
     * t.windowResized(() => {
     *   t.resizeCanvas(window.innerWidth, window.innerHeight);
     * });
     * ```
     */
    background(): TextmodeColor;
    /**
     * Set the background color using a grayscale value.
     * @param gray Grayscale value (0-255)
     * @param alpha Optional alpha value (0-255)
     *
     * @example
     * ```javascript
     * const t = textmode.create({ width: window.innerWidth, height: window.innerHeight });
     *
     * t.draw(() => {
     *   // Pulsing grayscale background
     *   const gray = 127 + 127 * Math.sin(t.frameCount * 0.05);
     *   t.background(gray);
     *
     *   t.charColor(255 - gray); // Inverse color for text
     *   t.cellColor(0, 0, 0, 0); // Transparent cell background
     *   t.char('+');
     *   t.rect(20, 20);
     * });
     *
     * t.windowResized(() => {
     *   t.resizeCanvas(window.innerWidth, window.innerHeight);
     * });
     * ```
     */
    background(gray: number, alpha?: number): void;
    /**
     * Set the background color using RGB(A) values.
     * @param r Red component (0-255)
     * @param g Green component (0-255)
     * @param b Blue component (0-255)
     * @param a Optional alpha component (0-255)
     *
     * @example
     * ```javascript
     * const t = textmode.create({ width: window.innerWidth, height: window.innerHeight });
     *
     * t.draw(() => {
     *   // Colorful background based on time
     *   t.background(
     *     100 + 100 * Math.sin(t.frameCount * 0.03),
     *     100 + 100 * Math.sin(t.frameCount * 0.04),
     *     100 + 100 * Math.sin(t.frameCount * 0.05)
     *   );
     *
     *   t.char('B');
     *   t.charColor(255);
     *   t.rect(10, 10);
     * });
     *
     * t.windowResized(() => {
     *   t.resizeCanvas(window.innerWidth, window.innerHeight);
     * });
     * ```
     */
    background(r: number, g: number, b: number, a?: number): void;
    /**
     * Set the background color using a CSS string or TextmodeColor object.
     * @param value Hex string, `rgb()`/`rgba()` string, or an existing color object
     *
     * @example
     * ```javascript
     * const t = textmode.create({ width: window.innerWidth, height: window.innerHeight });
     *
     * t.draw(() => {
     *   // Switch between hex string and color object
     *   if (Math.floor(t.frameCount / 60) % 2 === 0) {
     *     t.background('#220044');
     *   } else {
     *     const col = t.color(0, 100, 50);
     *     t.background(col);
     *   }
     *
     *   t.char('#');
     *   t.charColor(255);
     *   t.rect(15, 15);
     * });
     *
     * t.windowResized(() => {
     *   t.resizeCanvas(window.innerWidth, window.innerHeight);
     * });
     * ```
     */
    background(value: string | TextmodeColor): void;
    /**
     * Clear the layer currently drawing to.
     *
     * Used to clear the layer at the start of its drawing cycle.
     *
     * @example
     * ```javascript
     * const t = textmode.create({
     *  width: 800,
     *  height: 600,
     * })
     *
     * t.draw(() => {
     *  // Clear the canvas
     *  t.clear();
     * });
     * ```
     */
    clear(): void;
    /**
     * Set or get the line weight (thickness).
     *
     * If called with a value, sets the line weight for subsequent drawing operations.
     * If called without arguments, returns the current line weight.
     *
     * @param weight The line weight (thickness) to set.
     * @returns The current line weight if called without arguments.
     *
     * @example
     * ```javascript
     * // Dynamic line thickness
     * const t = textmode.create({ width: window.innerWidth, height: window.innerHeight });
     *
     * t.draw(() => {
     *   t.background('#050810');
     *
     *   const layers = 6;
     *   const spacing = 4;
     *
     *   for (let i = 0; i < layers; i++) {
     *     const phase = t.frameCount * 0.03 + i * 0.8;
     *     const pulse = 1 + 4 * (0.5 + 0.5 * Math.sin(phase));
     *     const wobble = Math.sin(phase * 1.6) * 5;
     *
     *     t.lineWeight(Math.round(pulse));
     *     t.charColor(160 + i * 12, 200, 255);
     *     t.char(['-', '+', '×'][i % 3]);
     *
     *     const y = (i - (layers - 1) / 2) * spacing;
     *     t.line(-20, y + wobble, 20, y - wobble);
     *   }
     * });
     *
     * t.windowResized(() => {
     *   t.resizeCanvas(window.innerWidth, window.innerHeight);
     * });
     * ```
     */
    lineWeight(weight?: number): number | void;
    /**
     * Draw a smooth cubic bezier curve between two points with two control points.
     * The curve thickness is controlled by the current {@link lineWeight} setting.
     * @param x1 Start point X coordinate in grid cells
     * @param y1 Start point Y coordinate in grid cells
     * @param cp1x First control point X coordinate in grid cells
     * @param cp1y First control point Y coordinate in grid cells
     * @param cp2x Second control point X coordinate in grid cells
     * @param cp2y Second control point Y coordinate in grid cells
     * @param x2 End point X coordinate in grid cells
     * @param y2 End point Y coordinate in grid cells
     *
     * @example
     * ```javascript
     * const t = textmode.create({ width: window.innerWidth, height: window.innerHeight });
     *
     * t.draw(() => {
     *   t.background(5, 5, 10);
     *
     *   const time = t.frameCount * 0.015;
     *   const petals = 8;
     *   const size = Math.min(t.grid.cols, t.grid.rows) * 0.35;
     *
     *   t.lineWeight(1);
     *
     *   for (let i = 0; i < petals; i++) {
     *     t.push();
     *     const angle = (i / petals) * 360 + t.frameCount * 0.2;
     *     t.rotateZ(angle);
     *
     *     // Dynamic control points based on time
     *     const cp1 = size * (0.5 + 0.3 * Math.sin(time + i));
     *     const cp2 = size * (0.5 + 0.3 * Math.cos(time + i * 0.5));
     *
     *     // Ethereal colors
     *     t.charColor(100 + 100 * Math.sin(time + i), 100, 255);
     *     t.char(['~', '≈', '∫'][i % 3]);
     *
     *     t.bezierCurve(
     *       0, 0,            // Anchor 1
     *       cp1, -cp2,       // Control 1
     *       cp1, cp2,        // Control 2
     *       size, 0          // Anchor 2
     *     );
     *     t.pop();
     *   }
     * });
     *
     * t.windowResized(() => {
     *   t.resizeCanvas(window.innerWidth, window.innerHeight);
     * });
     * ```
     */
    bezierCurve(x1: number, y1: number, cp1x: number, cp1y: number, cp2x: number, cp2y: number, x2: number, y2: number): void;
    /**
     * Set the character to be used for subsequent rendering operations.
     * Accepts a single character string or a character index in the current font.
     *
     * @param character The character string or font character index to set for rendering
     *
     * @example
     * ```javascript
     * // Swapping characters over time
     * const t = textmode.create({ width: window.innerWidth, height: window.innerHeight });
     *
     * t.draw(() => {
     *   t.background(0);
     *
     *   // Cycle through character indices
     *   const charIndex = Math.floor(t.frameCount / 10) % t.font.characters.length;
     *   t.char(charIndex);
     *
     *   t.charColor(0, 255, 150);
     *   t.rotateZ(t.frameCount * 2);
     *   t.rect(15, 15);
     * });
     *
     * t.windowResized(() => {
     *   t.resizeCanvas(window.innerWidth, window.innerHeight);
     * });
     * ```
     */
    char(character: string | number): void;
    /**
     * Get the current character string used for rendering.
     * @returns The current character string.
     *
     * @example
     * ```javascript
     * const t = textmode.create({ width: window.innerWidth, height: window.innerHeight });
     *
     * t.draw(() => {
     *   t.background(0);
     *
     *   const chars = ['A', 'B', 'C'];
     *   const index = Math.floor(t.frameCount / 30) % chars.length;
     *   t.char(chars[index]);
     *
     *   // Query the current character to decide the color
     *   const current = t.char();
     *
     *   if (current === 'A') t.charColor(255, 100, 100);
     *   else if (current === 'B') t.charColor(100, 255, 100);
     *   else t.charColor(100, 100, 255);
     *
     *   t.rect(10, 10);
     * });
     *
     * t.windowResized(() => {
     *   t.resizeCanvas(window.innerWidth, window.innerHeight);
     * });
     * ```
     */
    char(): string;
    /**
     * Get the current character color.
     * @returns The current character color as a {@link TextmodeColor}.
     *
     * @example
     * ```javascript
     * const t = textmode.create({ width: window.innerWidth, height: window.innerHeight });
     *
     * t.draw(() => {
     *   t.background(0);
     *
     *   // Set a dynamic base color
     *   t.charColor(
     *     127 + 127 * Math.sin(t.frameCount * 0.05),
     *     127 + 127 * Math.cos(t.frameCount * 0.05),
     *     200
     *   );
     *
     *   // Draw base shape
     *   t.char('A');
     *   t.rect(10, 10);
     *
     *   // Query the color we just set
     *   const col = t.charColor();
     *
     *   // Create a complementary color (inverse) for the second shape
     *   t.push();
     *   t.translate(15, 0);
     *   t.charColor(255 - col.r, 255 - col.g, 255 - col.b);
     *   t.char('B');
     *   t.rect(10, 10);
     *   t.pop();
     * });
     *
     * t.windowResized(() => {
     *   t.resizeCanvas(window.innerWidth, window.innerHeight);
     * });
     * ```
     */
    charColor(): TextmodeColor;
    /**
     * Set the character color using a grayscale value.
     * @param gray Grayscale value (0-255)
     * @param alpha Optional alpha value (0-255)
     *
     * @example
     * ```javascript
     * const t = textmode.create({ width: window.innerWidth, height: window.innerHeight });
     *
     * t.draw(() => {
     *   t.background(0);
     *   // Fade character color in and out
     *   const alpha = 127 + 127 * Math.sin(t.frameCount * 0.1);
     *   t.charColor(255, alpha);
     *   t.char('A');
     *   t.rect(10, 10);
     * });
     *
     * t.windowResized(() => {
     *   t.resizeCanvas(window.innerWidth, window.innerHeight);
     * });
     * ```
     */
    charColor(gray: number, alpha?: number): void;
    /**
     * Set the character color using RGB(A) values.
     * @param r Red component (0-255)
     * @param g Green component (0-255)
     * @param b Blue component (0-255)
     * @param a Optional alpha component (0-255)
     *
     * @example
     * ```javascript
     * const t = textmode.create({ width: window.innerWidth, height: window.innerHeight });
     *
     * t.draw(() => {
     *   t.background(0);
     *   // Cycle through colors
     *   t.charColor(
     *     Math.sin(t.frameCount * 0.05) * 127 + 128,
     *     Math.sin(t.frameCount * 0.05 + 2) * 127 + 128,
     *     Math.sin(t.frameCount * 0.05 + 4) * 127 + 128
     *   );
     *   t.char('=');
     *   t.rect(10, 10);
     * });
     *
     * t.windowResized(() => {
     *   t.resizeCanvas(window.innerWidth, window.innerHeight);
     * });
     * ```
     */
    charColor(r: number, g: number, b: number, a?: number): void;
    /**
     * Set the character color using a CSS string or TextmodeColor object.
     * @param value Hex string, `rgb()`/`rgba()` string, or an existing color object
     *
     * @example
     * ```javascript
     * const t = textmode.create({ width: window.innerWidth, height: window.innerHeight });
     *
     * t.draw(() => {
     *   t.background(0);
     *   // Use hex color
     *   t.charColor('#FFD700'); // Gold
     *   t.char('$');
     *   t.rect(10, 10);
     * });
     *
     * t.windowResized(() => {
     *   t.resizeCanvas(window.innerWidth, window.innerHeight);
     * });
     * ```
     */
    charColor(value: string | TextmodeColor): void;
    /**
     * Alias for {@link charColor}. Get the current stroke (character) color.
     * @returns The current character color as a {@link TextmodeColor}.
     */
    stroke(): TextmodeColor;
    /**
     * Alias for {@link charColor}. Set the stroke (character) color using a grayscale value.
     * @param gray Grayscale value (0-255)
     * @param alpha Optional alpha value (0-255)
     */
    stroke(gray: number, alpha?: number): void;
    /**
     * Alias for {@link charColor}. Set the stroke (character) color using RGB(A) values.
     * @param r Red component (0-255)
     * @param g Green component (0-255)
     * @param b Blue component (0-255)
     * @param a Optional alpha component (0-255)
     */
    stroke(r: number, g: number, b: number, a?: number): void;
    /**
     * Alias for {@link charColor}. Set the stroke (character) color using a CSS string or TextmodeColor object.
     * @param value Hex string, `rgb()`/`rgba()` string, or an existing color object
     */
    stroke(value: string | TextmodeColor): void;
    /**
     * Get the current cell background color.
     * @returns The current cell color as a {@link TextmodeColor}.
     *
     * @example
     * ```javascript
     * const t = textmode.create({ width: window.innerWidth, height: window.innerHeight });
     *
     * t.draw(() => {
     *   t.background(0);
     *
     *   // Set cell color based on position
     *   const x = Math.sin(t.frameCount * 0.05) * 10;
     *   if (x > 0) t.cellColor(50, 0, 0);
     *   else t.cellColor(0, 0, 50);
     *
     *   // Query the current cell color to set the character color
     *   const cell = t.cellColor();
     *   t.charColor(255 - cell.r, 255 - cell.g, 255 - cell.b);
     *
     *   t.char('.');
     *   t.translate(x, 0);
     *   t.rect(10, 10);
     * });
     *
     * t.windowResized(() => {
     *   t.resizeCanvas(window.innerWidth, window.innerHeight);
     * });
     * ```
     */
    cellColor(): TextmodeColor;
    /**
     * Set the cell background color using a grayscale value.
     * @param gray Grayscale value (0-255)
     * @param alpha Optional alpha value (0-255)
     *
     * @example
     * ```javascript
     * const t = textmode.create({ width: window.innerWidth, height: window.innerHeight });
     *
     * t.draw(() => {
     *   t.background(0);
     *   t.charColor(255);
     *   t.char(' ');
     *
     *   // Vary cell brightness
     *   const brightness = 127 + 127 * Math.sin(t.frameCount * 0.1);
     *   t.cellColor(brightness);
     *   t.rect(10, 10);
     * });
     *
     * t.windowResized(() => {
     *   t.resizeCanvas(window.innerWidth, window.innerHeight);
     * });
     * ```
     */
    cellColor(gray: number, alpha?: number): void;
    /**
     * Set the cell background color using RGB(A) values.
     * @param r Red component (0-255)
     * @param g Green component (0-255)
     * @param b Blue component (0-255)
     * @param a Optional alpha component (0-255)
     *
     * @example
     * ```javascript
     * const t = textmode.create({ width: window.innerWidth, height: window.innerHeight });
     *
     * t.draw(() => {
     *   t.background(0);
     *   t.charColor(0, 0, 0);
     *   t.char('/');
     *
     *   // Cyan cell background
     *   t.cellColor(0, 255, 255);
     *   t.rect(10, 10);
     * });
     *
     * t.windowResized(() => {
     *   t.resizeCanvas(window.innerWidth, window.innerHeight);
     * });
     * ```
     */
    cellColor(r: number, g: number, b: number, a?: number): void;
    /**
     * Set the cell background color using a CSS string or TextmodeColor object.
     * @param value Hex string, `rgb()`/`rgba()` string, or an existing color object
     *
     * @example
     * ```javascript
     * const t = textmode.create({ width: window.innerWidth, height: window.innerHeight });
     *
     * t.draw(() => {
     *   t.background(0);
     *   t.char('@');
     *
     *   // Use hex for cell background
     *   t.cellColor('#ff4400');
     *   t.rect(10, 10);
     * });
     *
     * t.windowResized(() => {
     *   t.resizeCanvas(window.innerWidth, window.innerHeight);
     * });
     * ```
     */
    cellColor(value: string | TextmodeColor): void;
    /**
     * Alias for {@link cellColor}. Get the current fill (cell background) color.
     * @returns The current cell color as a {@link TextmodeColor}.
     */
    fill(): TextmodeColor;
    /**
     * Alias for {@link cellColor}. Set the fill (cell background) color using a grayscale value.
     * @param gray Grayscale value (0-255)
     * @param alpha Optional alpha value (0-255)
     */
    fill(gray: number, alpha?: number): void;
    /**
     * Alias for {@link cellColor}. Set the fill (cell background) color using RGB(A) values.
     * @param r Red component (0-255)
     * @param g Green component (0-255)
     * @param b Blue component (0-255)
     * @param a Optional alpha component (0-255)
     */
    fill(r: number, g: number, b: number, a?: number): void;
    /**
     * Alias for {@link cellColor}. Set the fill (cell background) color using a CSS string or TextmodeColor object.
     * @param value Hex string, `rgb()`/`rgba()` string, or an existing color object
     */
    fill(value: string | TextmodeColor): void;
    /**
     * Toggle horizontal flipping for subsequent character rendering, or get current state.
     * @param toggle Whether to flip horizontally (optional)
     * @returns The current flip state if called without arguments
     *
     * @example
     * ```javascript
     * // Using flipX for symmetry
     * const t = textmode.create({ width: window.innerWidth, height: window.innerHeight });
     *
     * t.draw(() => {
     *   t.background(0);
     *
     *   const count = 10;
     *   for (let i = 0; i < count; i++) {
     *     const phase = i / count;
     *     const y = (phase - 0.5) * t.grid.rows * 0.8;
     *     const x = Math.sin(t.frameCount * 0.05 + i) * 10;
     *
     *     // Draw original
     *     t.push();
     *     t.translate(x, y);
     *     t.char('R');
     *     t.charColor(255);
     *     t.point();
     *     t.pop();
     *
     *     // Draw mirrored
     *     t.push();
     *     t.translate(-x, y);
     *     t.flipX(true);
     *     t.char('R');
     *     t.charColor(255, 100, 100);
     *     t.point();
     *     t.pop();
     *   }
     * });
     *
     * t.windowResized(() => {
     *   t.resizeCanvas(window.innerWidth, window.innerHeight);
     * });
     * ```
     */
    flipX(toggle?: boolean): boolean | void;
    /**
     * Toggle vertical flipping for subsequent character rendering, or get current state.
     * @param toggle Whether to flip vertically (optional)
     * @returns The current flip state if called without arguments
     *
     * @example
     * ```javascript
     * // Using flipY for vertical reflection
     * const t = textmode.create({ width: window.innerWidth, height: window.innerHeight });
     *
     * t.draw(() => {
     *   t.background(0, 10, 20);
     *
     *   const count = 32;
     *   for (let i = 0; i < count; i++) {
     *     const x = (i / (count - 1) - 0.5) * t.grid.cols * 0.7;
     *     const y = -10 + Math.sin(t.frameCount * 0.05 + i) * 2;
     *
     *     // Draw original (Sky)
     *     t.push();
     *     t.translate(x, y);
     *     t.char('^');
     *     t.charColor(200, 200, 255);
     *     t.point();
     *     t.pop();
     *
     *     // Draw reflected (Water)
     *     t.push();
     *     t.translate(x, -y);
     *     t.flipY(true);
     *     t.char('^');
     *     // Dimmer and bluer for reflection
     *     t.charColor(50, 100, 200, 150);
     *     t.point();
     *     t.pop();
     *   }
     * });
     *
     * t.windowResized(() => {
     *   t.resizeCanvas(window.innerWidth, window.innerHeight);
     * });
     * ```
     */
    flipY(toggle?: boolean): boolean | void;
    /**
     * Set the character rotation angle for subsequent character rendering, or get current angle.
     * @param degrees The rotation angle in degrees (optional)
     * @returns The current rotation angle in degrees if called without arguments
     *
     * @example
     * ```javascript
     * // Rotating characters independently of geometry
     * const t = textmode.create({ width: window.innerWidth, height: window.innerHeight });
     *
     * t.draw(() => {
     *   t.background(0);
     *
     *   const count = 64;
     *   for (let i = 0; i < count; i++) {
     *     const angle = (i / count) * Math.PI * 2;
     *     const x = Math.cos(angle) * 20;
     *     const y = Math.sin(angle) * 20;
     *
     *     t.push();
     *     t.translate(x, y);
     *
     *     // Rotate the character itself
     *     t.charRotation(t.frameCount * 5 + i * 30);
     *
     *     t.charColor(255, 200, 100);
     *     t.char('+');
     *     t.point();
     *     t.pop();
     *   }
     * });
     *
     * t.windowResized(() => {
     *   t.resizeCanvas(window.innerWidth, window.innerHeight);
     * });
     * ```
     */
    charRotation(degrees?: number): number | void;
    /**
     * Toggle color inversion for subsequent character rendering, or get current state.
     * @param toggle Whether to invert colors (optional)
     * @returns The current inversion state if called without arguments
     *
     * @example
     * ```javascript
     * // Swapping foreground and background
     * const t = textmode.create({ width: window.innerWidth, height: window.innerHeight });
     *
     * t.draw(() => {
     *   t.background(0);
     *
     *   const count = 15;
     *   for (let i = 0; i < count; i++) {
     *     t.push();
     *     t.translate((i - (count - 1) / 2) * 6, 0);
     *
     *     // Toggle inversion based on position and time
     *     const shouldInvert = (i + Math.floor(t.frameCount / 30)) % 2 === 0;
     *     t.invert(shouldInvert);
     *
     *     t.charColor(255, 100, 100);
     *     t.cellColor(0, 50, 100);
     *     t.char('█');
     *     t.rect(5, 20);
     *     t.pop();
     *   }
     * });
     *
     * t.windowResized(() => {
     *   t.resizeCanvas(window.innerWidth, window.innerHeight);
     * });
     * ```
     */
    invert(toggle?: boolean): boolean | void;
    /**
     * Draw an ellipse with the current settings.
     * Position is controlled via {@link translate}, {@link push}, and {@link pop}.
     * @param width Width of the ellipse in grid cells (defaults to 1)
     * @param height Height of the ellipse in grid cells (defaults to 1)
     *
     * @example
     * ```javascript
     * const t = textmode.create({ width: window.innerWidth, height: window.innerHeight, fontSize: 8 });
     *
     * t.draw(() => {
     *   t.background(5, 5, 15);
     *
     *   const time = t.frameCount * 0.02;
     *   const orbitCount = 12;
     *   const baseSize = Math.min(t.grid.cols, t.grid.rows);
     *
     *   // Draw a series of harmonically rotating orbital rings
     *   for (let i = 0; i < orbitCount; i++) {
     *     const phase = i / orbitCount;
     *
     *     t.push();
     *     // Complex 3D rotation based on index and time
     *     t.rotateX(time * 23 + i * 15);
     *     t.rotateY(time * 31 + i * 25);
     *     t.rotateZ(time * 17 + i * 35);
     *
     *     // Color shifts through a cool-to-warm spectrum
     *     const hue = (phase * 360 + time * 50) % 360;
     *     t.charColor(150 + 105 * Math.sin(time + phase * 6), 100, 255);
     *
     *     // Select character based on "depth" or index for texture variety
     *     t.char(['░', '▒', '▓', '█', '•', '·'][i % 6]);
     *     t.lineWeight(1 + (i % 3));
     *
     *     const s = baseSize * (0.4 + 0.6 * Math.sin(time * 0.5 + phase * Math.PI));
     *     t.ellipse(s, s * 0.7);
     *     t.pop();
     *   }
     *
     *   // Pulsing central star
     *   t.push();
     *   t.char('☼');
     *   t.charColor(255, 255, 200);
     *   t.rotateZ(-time * 100);
     *   const pulse = 2 + Math.sin(time * 8) * 0.5;
     *   t.ellipse(pulse, pulse);
     *   t.pop();
     * });
     *
     * t.windowResized(() => {
     *   t.resizeCanvas(window.innerWidth, window.innerHeight);
     * });
     * ```
     */
    ellipse(width?: number, height?: number): void;
    /**
     * Draw a triangle with the current settings.
     * @param x1 X-coordinate of the first vertex in grid cells
     * @param y1 Y-coordinate of the first vertex in grid cells
     * @param x2 X-coordinate of the second vertex in grid cells
     * @param y2 Y-coordinate of the second vertex in grid cells
     * @param x3 X-coordinate of the third vertex in grid cells
     * @param y3 Y-coordinate of the third vertex in grid cells
     *
     * @example
     * ```javascript
     * const t = textmode.create({ width: window.innerWidth, height: window.innerHeight });
     *
     * t.draw(() => {
     *   t.background(5, 5, 10);
     *
     *   const time = t.frameCount * 0.02;
     *   const count = 12;
     *   const radius = Math.min(t.grid.cols, t.grid.rows) * 0.35;
     *
     *   for (let i = 0; i < count; i++) {
     *     const angle = (i / count) * Math.PI * 2;
     *     const pulse = 0.5 + 0.5 * Math.sin(time + i * 0.5);
     *
     *     // Coordinate rotation for a kaleidoscopic effect
     *     const x = Math.cos(angle + time * 0.5) * radius * pulse;
     *     const y = Math.sin(angle + time * 0.5) * radius * pulse;
     *
     *     t.push();
     *     t.translate(x, y);
     *     t.rotateZ(i * 30 + time * 100);
     *
     *     // Aesthetic color gradient
     *     t.charColor(150 + pulse * 105, 100, 255 - pulse * 100);
     *     t.char(['/', '\\', '|', '-'][i % 4]);
     *     t.lineWeight(1 + Math.floor(pulse * 3));
     *
     *     const s = 4 + pulse * 8;
     *     t.triangle(
     *       0, -s,           // Top vertex
     *       -s, s * 0.7,     // Bottom left
     *       s, s * 0.7       // Bottom right
     *     );
     *     t.pop();
     *   }
     * });
     *
     * t.windowResized(() => {
     *   t.resizeCanvas(window.innerWidth, window.innerHeight);
     * });
     * ```
     */
    triangle(x1: number, y1: number, x2: number, y2: number, x3: number, y3: number): void;
    /**
     * Draw an arc with the current settings.
     * Position is controlled via {@link translate}, {@link push}, and {@link pop}.
     * @param width Width of the arc in grid cells
     * @param height Height of the arc in grid cells
     * @param startAngle Starting angle in degrees
     * @param endAngle Ending angle in degrees
     *
     * @example
     * ```javascript
     * const t = textmode.create({ width: window.innerWidth, height: window.innerHeight, fontSize: 8 });
     *
     * t.draw(() => {
     *   t.background(10, 15, 25); // Deep space blue
     *
     *   const time = t.frameCount * 0.02;
     *   const arcCount = 32;
     *   const baseSize = Math.min(t.grid.cols, t.grid.rows);
     *
     *   for (let i = 0; i < arcCount; i++) {
     *     const phase = i / arcCount;
     *     const size = baseSize * (0.3 + 0.7 * Math.sin(time + phase * Math.PI));
     *     const startAngle = (time * 50 + i * 45) % 360;
     *     const sweep = 45 + 90 * (0.5 + 0.5 * Math.cos(time * 0.7 + i));
     *
     *     t.push();
     *     t.rotateZ(i * (360 / arcCount) + time * 20);
     *
     *     // Color shifting
     *     const r = 100 + 155 * Math.sin(time + phase);
     *     const g = 150 + 105 * Math.cos(time * 0.5 + phase);
     *     const b = 200 + 55 * Math.sin(time * 0.8);
     *
     *     t.charColor(r, g, b);
     *     t.char(['+', '•', '·', '░'][i % 4]);
     *     t.lineWeight(2 + i % 3);
     *
     *     t.arc(size, size, startAngle, startAngle + sweep);
     *     t.pop();
     *   }
     *
     *   // Center core
     *   t.char('@');
     *   t.charColor(255, 255, 200);
     *   t.rotateZ(-time * 100);
     *   t.rect(2, 2);
     * });
     *
     * t.windowResized(() => {
     *   t.resizeCanvas(window.innerWidth, window.innerHeight);
     * });
     * ```
     */
    arc(width: number, height: number, startAngle: number, endAngle: number): void;
}
