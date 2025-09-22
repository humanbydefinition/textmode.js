import type { Mixin } from './TextmodifierMixin';
import type { GLShader } from '../../rendering/webgl/Shader';
import type { GLFramebuffer } from '../../rendering';
import { TextmodeImage } from '../TextmodeImage';
/**
 * Options for creating a framebuffer.
 */
export type TextmodeFramebufferOptions = {
    /** Width of the framebuffer in grid cells */
    width: number;
    /** Height of the framebuffer in grid cells */
    height: number;
};
/**
 * Supported uniform value types for shader parameters
 */
type UniformValue = number | boolean | number[] | Float32Array | Int32Array | WebGLTexture;
/**
 * Interface for rendering capabilities that will be mixed into Textmodifier
 */
export interface RenderingCapabilities {
    /**
     * Set a custom shader for subsequent rendering operations.
     * @param shader The custom shader to use
     *
     * @example
     * ```javascript
     * const t = textmode.create({
     *   width: 800,
     *   height: 600,
     * })
     *
     * // Create a custom filter shader
     * const customShader = t.createFilterShader(`
     *   // ... fragment shader code ...
     * `);
     *
     * t.draw(() => {
     *   t.background(0);
     *
     *   // Use custom shader
     *   t.shader(customShader);
     *   t.setUniform('u_frameCount', t.frameCount);
     *   t.rect(0, 0, t.grid.cols, t.grid.rows);
     * });
     * ```
     */
    shader(shader: GLShader): void;
    /**
     * Create a new framebuffer for offscreen rendering.
     *
     * The framebuffer uses the same 5-attachment MRT structure as the main
     * rendering pipeline, allowing all standard drawing operations to work
     * seamlessly when rendering to the framebuffer.
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
     *   t.rect(10, 10, 20, 10);
     *   fb.end();
     *
     *   // Render framebuffer to main canvas
     *   t.background(0);
     *   t.image(fb, 0, 0);
     * });
     * ```
     */
    createFramebuffer(options: TextmodeFramebufferOptions): GLFramebuffer;
    /**
     * Draw a TextmodeFramebuffer or TextmodeImage to the current render target.
     *
     * @param source The TextmodeFramebuffer or TextmodeImage to render
     * @param x X position on the grid where to place the content *(top-left corner)*
     * @param y Y position on the grid where to place the content *(top-left corner)*
     * @param width Width to scale the content
     * @param height Height to scale the content
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
     *   t.charColor(255, 0, 0);
     *   t.rect(5, 5, 20, 10);
     *   fb.end();
     *
     *   // Clear main canvas and render framebuffer content
     *   t.background(0);
     *
     *   // Render at original size
     *   t.image(fb, 10, 10);
     *
     *   // Render scaled version
     *   t.image(fb, 50, 10, 60, 40);
     * });
     * ```
     */
    image(source: GLFramebuffer | TextmodeImage, x: number, y: number, width?: number, height?: number): void;
    /**
     * Load an image and return a TextmodeImage that can be drawn with image().
     * @param src URL or existing HTMLImageElement
     */
    loadImage(src: string | HTMLImageElement): Promise<TextmodeImage>;
    /**
     * Set a uniform value for the current custom shader.
     * @param name The name of the uniform variable
     * @param value The value to set
     *
     * @example
     * ```javascript
     * const t = textmode.create({
     *   width: 800,
     *   height: 600,
     * })
     *
     * const shader = t.createFilterShader(`
     *   uniform float u_time;
     *   // ... rest of shader ...
     * `);
     *
     * t.draw(() => {
     *   t.shader(shader);
     *   t.setUniform('u_time', t.frameCount * 0.02);
     *   t.rect(0, 0, t.grid.cols, t.grid.rows);
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
     * const t = textmode.create({
     *   width: 800,
     *   height: 600,
     * })
     *
     * const shader = t.createFilterShader(`
     *   uniform float u_time;
     *   uniform vec2 u_resolution;
     *   // ... rest of shader ...
     * `);
     *
     * t.draw(() => {
     *   t.shader(shader);
     *   t.setUniforms({
     *     u_time: t.frameCount * 0.02,
     *     u_resolution: [t.grid.cols, t.grid.rows]
     *   });
     *   t.rect(0, 0, t.grid.cols, t.grid.rows);
     * });
     * ```
     */
    setUniforms(uniforms: Record<string, UniformValue>): void;
    /**
     * Create a custom filter shader from fragment shader source code.
     * The fragment shader will automatically receive the standard vertex shader inputs
     * and must output to all 5 MRT attachments.
     * @param fragmentSource The fragment shader source code
     * @returns A compiled shader ready for use with {@link shader}
     *
     * @example
     * ```javascript
     * const t = textmode.create({
     *   width: 800,
     *   height: 600,
     * })
     *
     * const noiseShader = t.createFilterShader(`
     *   #version 300 es
     *   precision highp float;
     *
     *   in vec2 v_uv;
     *   in vec3 v_character;
     *   in vec4 v_primaryColor;
     *   in vec4 v_secondaryColor;
     *   in vec2 v_rotation;
     *   in vec3 v_transform;
     *
     *   uniform float u_frameCount;
     *
     *   layout(location = 0) out vec4 o_character;
     *   layout(location = 1) out vec4 o_primaryColor;
     *   layout(location = 2) out vec4 o_secondaryColor;
     *   layout(location = 3) out vec4 o_rotation;
     *   layout(location = 4) out vec4 o_transform;
     *
     *   float random(vec2 st) {
     *     return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
     *   }
     *
     *   void main() {
     *     vec2 gridPos = floor(gl_FragCoord.xy);
     *     float noise = random(gridPos + u_frameCount * 0.1);
     *
     *     o_character = vec4(noise, 0.0, 0.0, 1.0);
     *     o_primaryColor = vec4(vec3(noise), 1.0);
     *     o_secondaryColor = vec4(0.0, 0.0, 0.0, 1.0);
     *     o_rotation = vec4(0.0, 0.0, 0.0, 1.0);
     *     o_transform = vec4(0.0, 0.0, 0.0, 1.0);
     *   }
     * `);
     *
     * t.draw(() => {
     *   t.shader(noiseShader);
     *   t.setUniform('u_frameCount', t.frameCount);
     *   t.rect(0, 0, t.grid.cols, t.grid.rows);
     * });
     * ```
     */
    createFilterShader(fragmentSource: string): GLShader;
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
     * const t = textmode.create({
     *   width: 800,
     *   height: 600,
     * })
     *
     * t.draw(() => {
     *   t.background(0);
     *
     *   // Rotate only around Z-axis (backward compatible)
     *   t.rotate(0, 0, 45);
     *
     *   // Rotate around all three axes
     *   t.rotate(30, 45, 60);
     *
     *   t.rect(10, 10, 5, 5);
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
     * const t = textmode.create({
     *   width: 800,
     *   height: 600,
     * })
     *
     * t.draw(() => {
     *   t.background(0);
     *   t.rotateX(45); // Rotate around X-axis
     *   t.rect(10, 10, 5, 5);
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
     * const t = textmode.create({
     *   width: 800,
     *   height: 600,
     * })
     *
     * t.draw(() => {
     *   t.background(0);
     *   t.rotateY(45); // Rotate around Y-axis
     *   t.rect(10, 10, 5, 5);
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
     * const t = textmode.create({
     *   width: 800,
     *   height: 600,
     * })
     *
     * t.draw(() => {
     *   t.background(0);
     *   t.rotateZ(45); // Rotate around Z-axis
     *   t.rect(10, 10, 5, 5);
     * });
     * ```
     */
    rotateZ(degrees: number): void;
    /**
     * Save the current rendering state to the state stack.
     * Use with {@link pop} to isolate style changes within a block.
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
     *   t.push(); // Save current state
     *   t.charColor(255, 0, 0); // Red characters
     *   t.rect(10, 10, 5, 5);
     *   t.pop(); // Restore previous state
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
     * const t = textmode.create({
     *   width: 800,
     *   height: 600,
     * })
     *
     * t.draw(() => {
     *   t.background(0);
     *
     *   t.push(); // Save current state
     *   t.charColor(0, 255, 0); // Green characters
     *   t.char('█');
     *   t.rect(5, 5, 3, 3);
     *   t.pop(); // Restore previous state
     * });
     * ```
     */
    pop(): void;
    /**
     * Draw a rectangle with the current settings.
     * @param x X-coordinate of the rectangle *(top-left corner)*
     * @param y Y-coordinate of the rectangle *(top-left corner)*
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
     *   // Draw a filled rectangle with default character
     *   t.char('█');
     *   t.charColor(255, 255, 255); // White
     *   t.rect(10, 10, 15, 8);
     * });
     * ```
     */
    rect(x: number, y: number, width?: number, height?: number): void;
    /**
     * Draw a single point at (x, y) with the current settings.
     * @param x X-coordinate of the point
     * @param y Y-coordinate of the point
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
     *   t.point(10, 10);
     * });
     * ```
     */
    point(x: number, y: number): void;
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
     *   // Set the background color to black
     *   t.background(0);
     *
     *   // Draw a diagonal line
     *   t.char('-');
     *   t.charColor(0, 255, 255); // Cyan
     *   t.lineWeight(1);
     *   t.line(5, 5, 25, 15);
     * });
     * ```
     */
    line(x1: number, y1: number, x2: number, y2: number): void;
    /**
     * Set the background color for the canvas.
     * @param r Red component (0-255)
     * @param g Green component (0-255)
     * @param b Blue component (0-255)
     * @param a Alpha component (0-255)
     *
     * @example
     * ```javascript
     * const t = textmode.create({
     *   width: 800,
     *   height: 600,
     * })
     *
     * t.draw(() => {
     *   // Set the background color to white
     *   t.background(255);
     * });
     * ```
     */
    background(r: number, g?: number, b?: number, a?: number): void;
    /**
     * Clear the canvas.
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
     *  width: 800,
     *  height: 600,
     * })
     *
     * t.draw(() => {
     *  t.background(0);
     *  t.lineWeight(1); // Thin line
     *  t.line(0, 0, t.grid.cols, t.grid.rows);
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
     *
     *   // Draw a smooth S-curve
     *   t.char('*');
     *   t.charColor(255, 100, 255); // Magenta
     *   t.lineWeight(2);
     *   t.bezierCurve(5, 20, 15, 5, 25, 35, 35, 20);
     * });
     * ```
     */
    bezierCurve(x1: number, y1: number, cp1x: number, cp1y: number, cp2x: number, cp2y: number, x2: number, y2: number): void;
    /**
     * Set the character to be used for subsequent rendering operations.
     * @param character The character to set
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
     *   t.char('█');
     *   t.rect(10, 10, 5, 5);
     * });
     * ```
     */
    char(character: string): void;
    /**
     * Set the character color for subsequent rendering operations.
     * @param r Red component (0-255)
     * @param g Green component (0-255)
     * @param b Blue component (0-255)
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
     *   t.charColor(255, 0, 0, 255); // Red character
     *   t.rect(10, 10, 5, 5);
     * });
     * ```
     */
    charColor(r: number, g: number, b: number): void;
    /**
     * Set the cell background color for subsequent rendering operations.
     * @param r Red component (0-255)
     * @param g Green component (0-255)
     * @param b Blue component (0-255)
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
     *   t.cellColor(0, 255, 0, 255); // Green cell background
     *   t.rect(10, 10, 5, 5);
     * });
     * ```
     */
    cellColor(r: number, g: number, b: number): void;
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
     *   t.rect(10, 10, 5, 5);
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
     *   t.rect(10, 10, 5, 5);
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
     *   t.charRotation(90); // Rotate character 90 degrees
     *   t.rect(10, 10, 5, 5);
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
     *   t.rect(10, 10, 5, 5);
     * });
     * ```
     */
    invert(toggle: boolean): void;
    /**
     * Draw an ellipse with the current settings.
     * @param x X-coordinate of the ellipse center
     * @param y Y-coordinate of the ellipse center
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
     *   t.ellipse(20, 15, 10, 8);
     * });
     * ```
     */
    ellipse(x: number, y: number, width: number, height: number): void;
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
     * const t = textmode.create({
     *   width: 800,
     *   height: 600,
     * })
     *
     * t.draw(() => {
     *   t.background(0);
     *   t.triangle(10, 10, 20, 10, 15, 20);
     * });
     * ```
     */
    triangle(x1: number, y1: number, x2: number, y2: number, x3: number, y3: number): void;
    /**
     * Draw an arc with the current settings.
     * @param x X-coordinate of the arc center
     * @param y Y-coordinate of the arc center
     * @param width Width of the arc
     * @param height Height of the arc
     * @param startAngle Starting angle in radians
     * @param endAngle Ending angle in radians
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
     *   t.arc(20, 15, 10, 10, 0, Math.PI);
     * });
     * ```
     */
    arc(x: number, y: number, width: number, height: number, startAngle: number, endAngle: number): void;
}
/**
 * Mixin that adds rendering capabilities to a class by delegating to GLRenderer
 * @param Base The base class to extend
 * @returns Extended class with rendering capabilities
 */
export declare const RenderingMixin: Mixin<RenderingCapabilities>;
export {};
