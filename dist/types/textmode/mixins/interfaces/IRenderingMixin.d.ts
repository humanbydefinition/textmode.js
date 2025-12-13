import type { GLFramebuffer, GLShader, TextmodeFramebufferOptions, UniformValue } from '../../../rendering/webgl';
import type { TextmodeImage } from '../../loadables/TextmodeImage';
import type { TextmodeColor } from '../../TextmodeColor';
import type { TextmodeVideo } from '../../loadables';
/**
 * Interface for rendering capabilities that will be mixed into Textmodifier
 */
export interface IRenderingMixin {
    /**
     * Set a custom shader for subsequent rendering operations.
     * @param shader The custom shader to use
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
     *
     * t.draw(() => {
     *     t.shader(glitchShader);
     *     t.setUniform('u_intensity', Math.sin(t.frameCount * 0.1) * 0.02);
     *     t.rect(t.grid.cols, t.grid.rows);
     * });
     * ```
     */
    shader(shader: GLShader): void;
    /**
     * Create a new framebuffer for offscreen rendering.
     *
     * The framebuffer uses the same MRT structure as the main rendering pipeline.
     * By default it allocates 4 attachments (character + color data).
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
     * Draw a TextmodeFramebuffer, TextmodeImage, or TextmodeVideo to the current render target.
     *
     * @param source The TextmodeFramebuffer or TextmodeSource to render
     * @param x X position on the grid where to place the content *(top-left corner)*
     * @param y Y position on the grid where to place the content *(top-left corner)*
     * @param width Width to potentially scale the content
     * @param height Height to potentially scale the content
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
    image(source: GLFramebuffer | TextmodeImage | TextmodeVideo, width?: number, height?: number): void;
    /**
     * Load an image and return a TextmodeImage that can be drawn with image().
     *
     * The loaded image can be rendered to the canvas using the {@link image} method.
     * This function returns a Promise that resolves when the image has loaded.
     *
     * @param src URL or existing HTMLImageElement
     * @returns A Promise that resolves to a TextmodeImage object
     *
     * @example
     * ```javascript
     * const t = textmode.create({
     *     width: 800,
     *     height: 600,
     * });
     *
     * let img;
     *
     * t.setup(async () => {
     *     img = await t.loadImage('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80');
     *     img.characters(" .:-=+*#%@");
     * });
     *
     * t.draw(() => {
     *     t.background(0);
     *
     *     // Draw the loaded image
     *     t.image(img);
     * });
     * ```
     */
    loadImage(src: string | HTMLImageElement): Promise<TextmodeImage>;
    /**
     * Load a video and return a TextmodeVideo that can be drawn with image().
     * @param src URL or existing HTMLVideoElement
     * @param options Optional configuration for preloading behavior. Provide `frameRate` to preload frames, `onProgress` to observe preload progress, `onComplete` to know when preloading finished, and `onError` to catch preload failures.
     *
     * @example
     * ```javascript
     * const t = textmode.create({
     *     width: 800,
     *     height: 600,
     * });
     *
     * let video;
     *
     * t.setup(async () => {
     *     video = await t.loadVideo('https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4');
     *     // Start playback and enable looping so the video keeps playing
     *     video.play();
     *     video.loop();
     *
     *     video.characters(" .:-=+*#%@");
     * });
     *
     * t.draw(() => {
     *     t.background(0);
     *
     *     // Draw the loaded video
     *     t.image(video);
     * });
     * ```
     */
    loadVideo(src: string | HTMLVideoElement): Promise<TextmodeVideo>;
    /**
     * Set a uniform value for the current custom shader.
     * @param name The name of the uniform variable
     * @param value The value to set
     *
     * @example
     * ```javascript
     * const t = textmode.create({ width: 800, height: 600 });
     *
     * let pulseShader;
     *
     * t.setup(async () => {
     *     pulseShader = await t.createFilterShader(`#version 300 es
     *   precision highp float;
     *   in vec2 v_uv;
     *   uniform float u_time;
     *   layout(location = 0) out vec4 o_character;
     *   layout(location = 1) out vec4 o_primaryColor;
     *   layout(location = 2) out vec4 o_secondaryColor;
     *
     *   void main() {
     *     float pulse = 0.5 + 0.5 * sin(u_time + length(v_uv - 0.5) * 8.0);
     *     vec3 color = vec3(pulse * 0.3, pulse * 0.8, pulse);
     *     o_character = vec4(pulse, 0.0, 0.0, 0.0);
     *     o_primaryColor = vec4(color, 1.0);
     *     o_secondaryColor = vec4(color * 0.3, 1.0);
     *   }
     * `);
     * });
     *
     * t.draw(() => {
     *     t.shader(pulseShader);
     *     t.setUniform('u_time', t.frameCount * 0.005);
     *     t.rect(t.grid.cols, t.grid.rows);
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
     * const t = textmode.create({ width: 800, height: 600 });
     *
     * let rippleShader;
     *
     * t.setup(async() => {
     *     rippleShader = await t.createFilterShader(`#version 300 es
     *   precision highp float;
     *   in vec2 v_uv;
     *   uniform float u_time;
     *   uniform vec2 u_center;
     *   layout(location = 0) out vec4 o_character;
     *   layout(location = 1) out vec4 o_primaryColor;
     *   layout(location = 2) out vec4 o_secondaryColor;
     *
     *   void main() {
     *     float dist = length(v_uv - u_center);
     *     float wave = sin(dist * 20.0 - u_time * 2.0) * 0.5 + 0.5;
     *     vec3 color = mix(vec3(0.2, 0.4, 0.8), vec3(0.9, 0.6, 0.3), wave);
     *     o_character = vec4(wave, 0.0, 0.0, 0.0);
     *     o_primaryColor = vec4(color, 1.0);
     *     o_secondaryColor = vec4(color * 0.4, 1.0);
     *   }
     * `);
     * });
     *
     * t.draw(() => {
     *     t.shader(rippleShader);
     *     t.setUniforms({
     *         u_time: t.frameCount * 0.0005,
     *         u_center: [0.5, 0.5]
     *     });
     *     t.rect(t.grid.cols, t.grid.rows);
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
     * Sets the X-axis rotation angle for subsequent shape rendering operations.
     *
     * All geometries rotate around the center of the shape.
     *
     * @param degrees The rotation angle in degrees around the X-axis
     *
     * @example
     * ```javascript
     * const t = textmode.create({ width: 800, height: 600 });
     *
     * t.draw(() => {
     *   t.background(0);
     *   t.char('A');
     *   t.charColor(255, 150, 100);
     *   t.rotateX(t.frameCount * 2); // Flip forward/backward
     *   t.rect(12, 12);
     * });
     * ```
     */
    rotateX(degrees: number): void;
    /**
     * Sets the Y-axis rotation angle for subsequent shape rendering operations.
     *
     * All geometries rotate around the center of the shape.
     *
     * @param degrees The rotation angle in degrees around the Y-axis
     *
     * @example
     * ```javascript
     * const t = textmode.create({ width: 800, height: 600 });
     *
     * t.draw(() => {
     *   t.background(0);
     *   t.char('B');
     *   t.charColor(100, 255, 200);
     *   t.rotateY(t.frameCount * 2); // Spin left/right
     *   t.rect(12, 12);
     * });
     * ```
     */
    rotateY(degrees: number): void;
    /**
     * Sets the Z-axis rotation angle for subsequent shape rendering operations.
     *
     * All geometries rotate around the center of the shape.
     *
     * @param degrees The rotation angle in degrees around the Z-axis
     *
     * @example
     * ```javascript
     * const t = textmode.create({ width: 800, height: 600 });
     *
     * t.draw(() => {
     *   t.background(0);
     *   t.char('C');
     *   t.charColor(255, 220, 100);
     *   t.rotateZ(t.frameCount * 2); // Spin clockwise
     *   t.rect(12, 12);
     * });
     * ```
     */
    rotateZ(degrees: number): void;
    /**
     * Sets the translation offsets for subsequent shape rendering operations.
     *
     * All geometries are displaced by the specified amounts. Similar to p5.js translate().
     *
     * @param x Translation along the X-axis in pixels (optional, defaults to 0)
     * @param y Translation along the Y-axis in pixels (optional, defaults to 0)
     * @param z Translation along the Z-axis in pixels (optional, defaults to 0)
     *
     * @example
     * ```javascript
     * const t = textmode.create({ width: 800, height: 600 });
     *
     * t.draw(() => {
     *   t.background(0);
     *
     *   // Draw a grid of shapes with different translations
     *   for (let i = 0; i < 3; i++) {
     *     t.push();
     *     t.translate(i * 12 - 12, Math.sin(t.frameCount * 0.05 + i) * 3);
     *     t.char('A');
     *     t.charColor(100 + i * 70, 150, 255 - i * 50);
     *     t.rect(8, 8);
     *     t.pop();
     *   }
     * });
     * ```
     */
    translate(x?: number, y?: number, z?: number): void;
    /**
     * Sets the X-axis translation offset for subsequent shape rendering operations.
     *
     * @param pixels The translation offset in pixels along the X-axis
     *
     * @example
     * ```javascript
     * const t = textmode.create({ width: 800, height: 600 });
     *
     * t.draw(() => {
     *   t.background(0);
     *   t.char('→');
     *   t.charColor(255, 180, 100);
     *   t.translateX(Math.sin(t.frameCount * 0.05) * 15); // Slide left/right
     *   t.rect(10, 10);
     * });
     * ```
     */
    translateX(pixels: number): void;
    /**
     * Sets the Y-axis translation offset for subsequent shape rendering operations.
     *
     * @param pixels The translation offset in pixels along the Y-axis
     *
     * @example
     * ```javascript
     * const t = textmode.create({ width: 800, height: 600 });
     *
     * t.draw(() => {
     *   t.background(0);
     *   t.char('↓');
     *   t.charColor(100, 255, 180);
     *   t.translateY(Math.sin(t.frameCount * 0.05) * 10); // Bounce up/down
     *   t.rect(10, 10);
     * });
     * ```
     */
    translateY(pixels: number): void;
    /**
     * Sets the Z-axis translation offset for subsequent shape rendering operations.
     *
     * @param pixels The translation offset in pixels along the Z-axis
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
     * Create a reusable color object compatible with textmode drawing APIs.
     *
     * Accepts grayscale, RGB, RGBA, and hex string values as arguments. Returned
     * {@link TextmodeColor} instances can be passed to {@link background},
     * {@link char}, {@link charColor}, {@link cellColor}, and more.
     *
     * @param value Grayscale value, hex string, single character, or an existing color
     * @param g Optional green component, or `value` when using grayscale form
     * @param b Optional blue component, or `value` when using grayscale form
     * @param a Optional alpha component when using RGB form
     *
     * Example usage of the {@link color} helper.
     *
     * @example
     * ```javascript
     * const t = textmode.create({ width: 800, height: 600 });
     *
     * // Grayscale (0 = black, 255 = white)
     * const gray = t.color(128);
     *
     * // RGB
     * const hotPink = t.color(255, 105, 180);
     *
     * // RGBA (alpha 0-255)
     * const semiTransparentRed = t.color(255, 0, 0, 128);
     *
     * // Hex string
     * const dusk = t.color('#203040');
     *
     * t.draw(() => {
     *     // Using colors with other drawing APIs
     *     t.background(gray);
     *     t.charColor(hotPink);
     *     t.char('A');
     *     t.rect(5, 5);
     *
     *     t.translate(5, 0);
     *     t.cellColor(dusk);
     *     t.char('*');
     *     t.rect(5, 5);
     *
     *     t.translate(5, 0);
     *     t.charColor("#FF00FF");
     *     t.char("B");
     *     t.rect(5, 5);
     * });
     * ```
     */
    color(value: number | string | TextmodeColor, g?: number, b?: number, a?: number): TextmodeColor;
    /**
     * Draw a rectangle with the current settings.
     * Position is controlled via {@link translate}, {@link push}, and {@link pop}.
     * @param width Width of the rectangle
     * @param height Height of the rectangle
     *
     * @example
     * ```javascript
     * const t = textmode.create({
     *   width: 800,
     *   height: 600,
     * })
     *
     * t.draw(() => {
     *   // Set the background color to black
     *   t.background(0);
     *
     *   // Position and draw a filled rectangle
     *   t.char('A');
     *   t.charColor(255, 255, 255); // White
     *   t.rotateZ(t.frameCount * 2);
     *   t.rect(16, 16);
     * });
     * ```
     */
    rect(width?: number, height?: number): void;
    /**
     * Draw a 1x1 rectangle with the current settings.
     *
     * @example
     * ```javascript
     * const t = textmode.create({ width: 800, height: 600 });
     *
     * t.draw(() => {
     *   t.background(0);
     *
     *   const angle = t.frameCount * 0.06;
     *   const radius = Math.min(t.grid.cols, t.grid.rows) * 0.35;
     *
     *   // Draw a short trail of points behind the leading point
     *   for (let i = 0; i < 10; i++) {
     *     const a = angle - i * 0.18;
     *     const r = radius * (1 - i * 0.08);
     *     const x = Math.round(Math.cos(a) * r);
     *     const y = Math.round(Math.sin(a) * r);
     *
     *     // Color and brightness fade across the trail
     *     const brightness = Math.max(40, 255 - i * 20);
     *     const blue = Math.max(60, 255 - i * 25);
     *     const green = 120 + i * 8;
     *
     *     t.push();
     *     t.translate(x, y);
     *     t.char('*');
     *     t.charColor(brightness, green, blue);
     *     t.point();
     *
     *     t.pop();
     *   }
     *
     *   // Leading point drawn with highest brightness
     *   t.char('@');
     *   t.charColor(255, 255, 160);
     *   t.translate(Math.round(Math.cos(angle) * radius), Math.round(Math.sin(angle) * radius));
     *   t.point();
     * });
     * ```
     */
    point(): void;
    /**
     * Draw a line from point (x1, y1) to point (x2, y2) with the settings.
     * @param x1 X-coordinate of the line start point
     * @param y1 Y-coordinate of the line start point
     * @param x2 X-coordinate of the line end point
     * @param y2 Y-coordinate of the line end point
     *
     * @example
     * ```javascript
     * const t = textmode.create({
     *   width: 800,
     *   height: 600,
     * })
     *
     * t.draw(() => {
     *   t.background(0);
     *
     *   t.char('*');
     *   t.charColor(255, 100, 255); // Magenta
     *   t.lineWeight(2);
     *
     *   const halfWidth = 5;
     *   const halfHeight = 7.5;
     *
     *   t.push();
     *   t.rotateZ(t.frameCount * 2);
     *   t.line(-halfWidth, halfHeight, halfWidth, -halfHeight);
     *   t.pop();
     * });
     * ```
     */
    line(x1: number, y1: number, x2: number, y2: number): void;
    /**
     * Set the background color of the layer currently drawing to.
     *
     * Used to clear the layer to a specific color at the start of its drawing cycle.
     *
     * @param value A {@link TextmodeColor}, hex string, grayscale value, or single RGB channel
     * @param g Optional green component when providing RGB channels or alpha when used with grayscale
     * @param b Optional blue component when providing RGB channels
     * @param a Optional alpha component (0-255)
     *
     * @example
     * ```javascript
     * const t = textmode.create({
     *   width: 800,
     *   height: 600,
     * });
     *
     * const midnight = t.color('#0b1d3a');
     *
     * t.draw(() => {
     *   // Set the background using a reusable color
     *   t.background(midnight);
     *
     *   // Or inline RGB(A) notation
     *   //t.background(32, 48, 64);
     *
     *   // Or hex string
     *   //t.background('#203040');
     *
     *   t.char('M');
     *   t.rotateZ(t.frameCount * 2);
     *   t.rect(12, 12);
     * });
     * ```
     */
    background(value: number | string | TextmodeColor, g?: number, b?: number, a?: number): void;
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
     * Update the line weight (thickness) for subsequent {@link line} and {@link bezierCurve} calls.
     * @param weight The line weight (thickness) to set.
     *
     * @example
     * ```javascript
     * const t = textmode.create({
     *     width: 800,
     *     height: 600,
     * })
     *
     * t.draw(() => {
     *     t.background('#050810');
     *
     *     // Animate the weight so every line breathes differently
     *     const layers = 6;
     *     const halfCols = t.grid.cols / 2;
     *     const spacing = 4;
     *
     *     for (let i = 0; i < layers; i++) {
     *         const phase = t.frameCount * 0.03 + i * 0.8;
     *         const pulse = 0.75 + 3.25 * (0.5 + 0.5 * Math.sin(phase));
     *         const wobble = Math.sin(phase * 1.6) * 4;
     *         const centeredRow = (i - (layers - 1) / 2) * spacing;
     *
     *         t.lineWeight(Math.round(pulse));
     *         t.charColor(160 + i * 12, 200 - i * 8, 255);
     *         t.char('-');
     *         t.line(
     *             -halfCols + 2,
     *             centeredRow + wobble,
     *             halfCols - 2,
     *             centeredRow - wobble,
     *         );
     *     }
     * });
     * ```
     */
    lineWeight(weight: number): void;
    /**
     * Draw a smooth cubic bezier curve between two points with two control points.
     * The curve thickness is controlled by the current {@link lineWeight} setting.
     * @param x1 Start point X coordinate
     * @param y1 Start point Y coordinate
     * @param cp1x First control point X coordinate
     * @param cp1y First control point Y coordinate
     * @param cp2x Second control point X coordinate
     * @param cp2y Second control point Y coordinate
     * @param x2 End point X coordinate
     * @param y2 End point Y coordinate
     *
     * @example
     * ```javascript
     * const t = textmode.create({
     *   width: 800,
     *   height: 600,
     * })
     *
     * t.draw(() => {
     *   t.background(0);
     *   t.translate(-t.grid.cols / 2, -t.grid.rows / 2);
     *
     *   // Draw a smooth S-curve
     *   t.char('*');
     *   t.charColor(255, 100, 255); // Magenta
     *   t.lineWeight(2);
     *
     *   // Rotate the curve around its geometric center
     *   // The bezier's control points: (5,20), (15,5), (25,35), (35,20)
     *   // Center = average of points; translate to center then draw with local coordinates
     *   const cx = (5 + 15 + 25 + 35) / 4;
     *   const cy = (20 + 5 + 35 + 20) / 4;
     *
     *   t.translate(cx, cy);
     *   t.rotateZ(t.frameCount * 2);
     *   t.bezierCurve(5 - cx, 20 - cy, 15 - cx, 5 - cy, 25 - cx, 35 - cy, 35 - cx, 20 - cy);
     * });
     * ```
     */
    bezierCurve(x1: number, y1: number, cp1x: number, cp1y: number, cp2x: number, cp2y: number, x2: number, y2: number): void;
    /**
     * Set the character to be used for subsequent rendering operations.
     * Accepts a single character string.
     *
     * @param character The character to set for rendering
     *
     * @example
     * ```javascript
     * const t = textmode.create({
     *   width: 800,
     *   height: 600,
     * })
     *
     * t.draw(() => {
     *   t.background(0);
     *   t.char('A');
     *   t.rect(10, 10);
     *
     *   t.char(";");
     *   t.translate(15, 0);
     *   t.rect(10, 10);
     * });
     * ```
     */
    char(character: string): void;
    /**
     * Set the character color for subsequent rendering operations.
     * Accepts channel values, hex strings, or a {@link TextmodeColor} instance.
     * @param value Color object, hex string, or grayscale value (0-255)
     * @param g Optional green component when providing RGB values or alpha when using grayscale form
     * @param b Optional blue component when providing RGB values
     * @param a Optional alpha component (0-255)
     *
     * @example
     * ```javascript
     * const t = textmode.create({
     *   width: 800,
     *   height: 600,
     * })
     *
     * const hotPink = t.color(255, 105, 180);
     *
     * t.draw(() => {
     *   t.background(0);
     *   t.char('A');
     *   t.charColor(hotPink);
     *   t.rect(10, 10);
     * });
     * ```
     */
    charColor(value: number | string | TextmodeColor, g?: number, b?: number, a?: number): void;
    /**
     * Set the cell background color for subsequent rendering operations.
     * Accepts channel values, hex strings, or a {@link TextmodeColor} instance.
     * @param value Color object, hex string, or grayscale value (0-255)
     * @param g Optional green component when providing RGB values or alpha when using grayscale form
     * @param b Optional blue component when providing RGB values
     * @param a Optional alpha component (0-255)
     *
     * @example
     * ```javascript
     * const t = textmode.create({
     *   width: 800,
     *   height: 600,
     * })
     *
     * const dusk = t.color('#203040');
     *
     * t.draw(() => {
     *   t.background(0);
     *   t.cellColor(dusk);
     *   t.char('A');
     *   t.rotateZ(t.frameCount * 2);
     *   t.rect(10, 10);
     * });
     * ```
     */
    cellColor(value: number | string | TextmodeColor, g?: number, b?: number, a?: number): void;
    /**
     * Toggle horizontal flipping for subsequent character rendering.
     * @param toggle Whether to flip horizontally
     *
     * @example
     * ```javascript
     * const t = textmode.create({
     *   width: 800,
     *   height: 600,
     * })
     *
     * t.draw(() => {
     *   t.background(0);
     *   t.flipX(true);
     *   t.char('A');
     *   t.rect(5, 5);
     * });
     * ```
     */
    flipX(toggle: boolean): void;
    /**
     * Toggle vertical flipping for subsequent character rendering.
     * @param toggle Whether to flip vertically
     *
     * @example
     * ```javascript
     * const t = textmode.create({
     *   width: 800,
     *   height: 600,
     * })
     *
     * t.draw(() => {
     *   t.background(0);
     *   t.flipY(true);
     *   t.char('A');
     *   t.rect(5, 5);
     * });
     * ```
     */
    flipY(toggle: boolean): void;
    /**
     * Set the character rotation angle for subsequent character rendering.
     * @param degrees The rotation angle in degrees
     *
     * @example
     * ```javascript
     * const t = textmode.create({
     *   width: 800,
     *   height: 600,
     * })
     *
     * t.draw(() => {
     *   t.background(0);
     *   t.char('A');
     *   t.charRotation(90); // Rotate character 90 degrees
     *   t.rotateZ(t.frameCount * 2);
     *   t.rect(10, 10);
     * });
     * ```
     */
    charRotation(degrees: number): void;
    /**
     * Toggle color inversion for subsequent character rendering.
     * @param toggle Whether to invert colors
     *
     * @example
     * ```javascript
     * const t = textmode.create({
     *   width: 800,
     *   height: 600,
     * })
     *
     * t.draw(() => {
     *   t.background(0);
     *   t.invert(true);
     *   t.char('A');
     *   t.rotateZ(t.frameCount * 2);
     *   t.rect(5, 5);
     * });
     * ```
     */
    invert(toggle: boolean): void;
    /**
     * Draw an ellipse with the current settings.
     * Position is controlled via {@link translate}, {@link push}, and {@link pop}.
     * @param width Width of the ellipse
     * @param height Height of the ellipse
     *
     * @example
     * ```javascript
     * const t = textmode.create({
     *   width: 800,
     *   height: 600,
     * })
     *
     * t.draw(() => {
     *   t.background(0);
     *   t.char('O');
     *   t.rotateZ(t.frameCount * 2);
     *   t.ellipse(10, 8);
     * });
     * ```
     */
    ellipse(width: number, height: number): void;
    /**
     * Draw a triangle with the current settings.
     * @param x1 X-coordinate of the first vertex
     * @param y1 Y-coordinate of the first vertex
     * @param x2 X-coordinate of the second vertex
     * @param y2 Y-coordinate of the second vertex
     * @param x3 X-coordinate of the third vertex
     * @param y3 Y-coordinate of the third vertex
     *
     * @example
     * ```javascript
     * const t = textmode.create({ width: 800, height: 600 });
     *
     * t.draw(() => {
     *   t.background(0);
     *   t.char('*');
     *   t.charColor(255, 100, 150);
     *
     *   const angle = t.frameCount * 0.02;
     *   const size = 15;
     *   t.triangle(
     *     Math.cos(angle) * size, Math.sin(angle) * size,
     *     Math.cos(angle + 2.09) * size, Math.sin(angle + 2.09) * size,
     *     Math.cos(angle + 4.19) * size, Math.sin(angle + 4.19) * size
     *   );
     * });
     * ```
     */
    triangle(x1: number, y1: number, x2: number, y2: number, x3: number, y3: number): void;
    /**
     * Draw an arc with the current settings.
     * Position is controlled via {@link translate}, {@link push}, and {@link pop}.
     * @param width Width of the arc
     * @param height Height of the arc
     * @param startAngle Starting angle in degrees
     * @param endAngle Ending angle in degrees
     *
     * @example
     * ```javascript
     * const t = textmode.create({
     *   width: 800,
     *   height: 600,
     * })
     *
     * t.draw(() => {
     *   t.background(0);
     *   t.rotateZ(t.frameCount);
     *   t.char('A');
     *   t.arc(10, 10, 0, 90);
     * });
     * ```
     */
    arc(width: number, height: number, startAngle: number, endAngle: number): void;
}
