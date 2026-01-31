import type { ColorTuple } from '../utils/color';
/**
 * Represents a color in the `textmode.js` rendering system.
 *
 * Values are stored as `0-255` integers for compatibility with public APIs.
 * Normalized versions are also available for shader uploads.
 *
 * Use {@link Textmodifier.color} to create colors.
 *
 * @example
 * ```javascript
 * // Demonstrating color creation and manipulation
 * const t = textmode.create({ width: window.innerWidth, height: window.innerHeight });
 *
 * t.draw(() => {
 *   t.background(10, 5, 15);
 *
 *   const time = t.frameCount * 0.02;
 *   const count = 100;
 *
 *   for (let i = 0; i < count; i++) {
 *     const angle = (i / count) * Math.PI * 2 * 3 + time;
 *     const radius = 5 + i * 0.4;
 *     const x = Math.cos(angle) * radius;
 *     const y = Math.sin(angle) * radius;
 *
 *     t.push();
 *     t.translate(x, y);
 *
 *     // Demonstrate different color creation methods based on index
 *     let col;
 *     if (i % 3 === 0) {
 *       // RGB: Warm colors
 *       col = t.color(255, i * 2, 50);
 *     } else if (i % 3 === 1) {
 *       // Hex: Teal accents
 *       col = t.color('#00FFCC');
 *     } else {
 *       // Grayscale: White stars
 *       col = t.color(255, 150);
 *     }
 *
 *     t.charColor(col);
 *     t.char(i % 5 === 0 ? '+' : '#');
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
export declare class TextmodeColor {
    private _rgba?;
    private _normalized?;
    /**
     * Red component (0-255).
     *
     * @example
     * ```javascript
     * // Visualizing the red component
     * const t = textmode.create({ width: window.innerWidth, height: window.innerHeight });
     *
     * t.draw(() => {
     *   t.background(0);
     *
     *   const cols = 20;
     *   const step = t.grid.cols / cols;
     *
     *   for (let i = 0; i < cols; i++) {
     *     // Create a dynamic color
     *     const r = (Math.sin(t.frameCount * 0.05 + i * 0.5) * 0.5 + 0.5) * 255;
     *     const col = t.color(r, 0, 0);
     *
     *     t.push();
     *     t.translate((i - cols / 2) * step + step / 2, 0);
     *
     *     // Use the red component property to drive height
     *     const height = (col.r / 255) * t.grid.rows * 0.8;
     *
     *     t.charColor(col);
     *     t.char('|');
     *     t.rect(step - 1, height);
     *     t.pop();
     *   }
     * });
     *
     * t.windowResized(() => {
     *   t.resizeCanvas(window.innerWidth, window.innerHeight);
     * });
     * ```
     */
    readonly r: number;
    /**
     * Green component (0-255).
     *
     * @example
     * ```javascript
     * // Green channel visualization
     * const t = textmode.create({ width: window.innerWidth, height: window.innerHeight });
     *
     * t.draw(() => {
     *   t.background(0, 10, 0); // Dim phosphor background
     *
     *   const time = (t.frameCount * 0.05) % (Math.PI * 2);
     *   const radius = Math.min(t.grid.cols, t.grid.rows) * 0.4;
     *
     *   // Scan the grid area
     *   for (let y = -radius; y < radius; y++) {
     *     for (let x = -radius; x < radius; x++) {
     *       if (x * x + y * y > radius * radius) continue;
     *
     *       // Calculate angle of point relative to center
     *       let a = Math.atan2(y, x);
     *       if (a < 0) a += Math.PI * 2;
     *
     *       // Calculate distance from scan line angle
     *       let diff = time - a;
     *       if (diff < 0) diff += Math.PI * 2;
     *
     *       // Fade out trail
     *       const brightness = Math.max(0, 255 - diff * 100);
     *
     *       // Blip targets
     *       const isTarget = (Math.abs(x - 10) < 2 && Math.abs(y + 5) < 2);
     *       const g = isTarget ? Math.max(brightness, 150 + Math.sin(t.frameCount*0.5)*100) : brightness;
     *
     *       const col = t.color(0, g, 0);
     *
     *       if (col.g > 20) {
     *         t.push();
     *         t.translate(x, y);
     *         t.charColor(col);
     *         // Use green intensity to pick character
     *         t.char(col.g > 180 ? '█' : col.g > 80 ? '▒' : '·');
     *         t.point();
     *         t.pop();
     *       }
     *     }
     *   }
     * });
     *
     * t.windowResized(() => {
     *   t.resizeCanvas(window.innerWidth, window.innerHeight);
     * });
     * ```
     */
    readonly g: number;
    /**
     * Blue component (0-255).
     *
     * @example
     * ```javascript
     * // Blue channel waves
     * const t = textmode.create({ width: window.innerWidth, height: window.innerHeight });
     *
     * t.draw(() => {
     *   t.background(0, 0, 20);
     *
     *   for (let y = -10; y < 10; y++) {
     *     const phase = y * 0.2 + t.frameCount * 0.05;
     *     const offset = Math.sin(phase) * 5;
     *
     *     // Generate a color for this wave
     *     const waveColor = t.color(50, 100, 150 + Math.sin(phase) * 100);
     *
     *     t.push();
     *     t.translate(0, y * 2);
     *     t.char('~');
     *
     *     // Read the blue component to modulate opacity
     *     t.charColor(100, 200, waveColor.b, waveColor.b); // Blue determines alpha
     *
     *     t.rect(t.grid.cols * 0.8 + offset, 1);
     *     t.pop();
     *   }
     * });
     *
     * t.windowResized(() => {
     *   t.resizeCanvas(window.innerWidth, window.innerHeight);
     * });
     * ```
     */
    readonly b: number;
    /**
     * Alpha component (0-255).
     *
     * @example
     * ```javascript
     * // Alpha transparency
     * const t = textmode.create({ width: window.innerWidth, height: window.innerHeight });
     *
     * t.draw(() => {
     *   t.background(0);
     *
     *   const time = t.frameCount * 0.05;
     *   const trailLen = 15;
     *
     *   for (let i = 0; i < trailLen; i++) {
     *     // Create a fading white color
     *     const alpha = 255 * (1 - i / trailLen);
     *     const col = t.color(255, 255, 255, alpha);
     *
     *     // Circular motion with lag
     *     const tOffset = time - i * 0.1;
     *     const x = Math.cos(tOffset) * 15;
     *     const y = Math.sin(tOffset) * 15;
     *
     *     t.push();
     *     t.translate(x, y);
     *     t.char(col.a > 128 ? '@' : '.'); // Use alpha property to change char
     *     t.charColor(col);
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
    readonly a: number;
    private constructor();
    /**
     * Create a color from any supported source.
     * Accepts an existing {@link TextmodeColor}, CSS hex strings,
     * grayscale values (0-255), or RGB(A) tuples (0-255).
     * @ignore
     */
    static $from(value: TextmodeColor | string | number | ColorTuple, g?: number, b?: number, a?: number): TextmodeColor;
    /**
     * Create a color from RGB or RGBA components (0-255 range).
     * @ignore
     */
    static $fromRGBA(r: number, g: number, b: number, a?: number): TextmodeColor;
    /**
     * Create a grayscale color. Optional alpha can be provided.
     * @ignore
     */
    static $fromGray(gray: number, alpha?: number): TextmodeColor;
    /**
     * Create a color from a CSS-style hex string.
     * @ignore
     */
    static $fromHex(hex: string): TextmodeColor;
    /**
     * Create a color from normalized (0-1) RGBA components.
     * @ignore
     */
    static $fromNormalized(r: number, g: number, b: number, a: number): TextmodeColor;
    /**
     * Returns a plain RGB array with integer components.
     *
     * @returns A [r, g, b] tuple with values between 0 and 255.
     *
     * @example
     * ```javascript
     * // Color Inversion
     * const t = textmode.create({ width: window.innerWidth, height: window.innerHeight });
     *
     * t.draw(() => {
     *   t.background(0);
     *
     *   const baseColor = t.color(50, 100, 200);
     *   const [r, g, b] = baseColor.rgb;
     *
     *   // Draw original
     *   t.push();
     *   t.translate(-10, 0);
     *   t.charColor(baseColor);
     *   t.char('O');
     *   t.rect(10, 10);
     *   t.pop();
     *
     *   // Draw inverted using components
     *   t.push();
     *   t.translate(10, 0);
     *   t.charColor(255 - r, 255 - g, 255 - b);
     *   t.char('I');
     *   t.rect(10, 10);
     *   t.pop();
     * });
     *
     * t.windowResized(() => {
     *   t.resizeCanvas(window.innerWidth, window.innerHeight);
     * });
     * ```
     */
    get rgb(): [number, number, number];
    /**
     * Returns a plain RGBA array with integer components.
     *
     * @returns A [r, g, b, a] tuple with values between 0 and 255.
     *
     * @example
     * ```javascript
     * const t = textmode.create({ width: window.innerWidth, height: window.innerHeight });
     *
     * t.draw(() => {
     *   t.background(0);
     *   const col = t.color(255, 128, 0, 200);
     *   const components = col.rgba; // [255, 128, 0, 200]
     *
     *   components.forEach((val, i) => {
     *     t.push();
     *     t.translate((i - 1.5) * 8, 0);
     *     // Visualize intensity of each channel
     *     t.charColor(val, val, val);
     *     t.cellColor(255 - val, 0, 0);
     *     t.char(val.toString().charAt(0));
     *     t.rect(5, 5);
     *     t.pop();
     *   });
     * });
     *
     * t.windowResized(() => {
     *   t.resizeCanvas(window.innerWidth, window.innerHeight);
     * });
     * ```
     */
    get rgba(): [number, number, number, number];
    /**
     * Returns the normalized *(0-1)* RGBA array.
     *
     * Useful for passing color data to WebGL shaders.
     *
     * @returns A [r, g, b, a] tuple where each component is between 0.0 and 1.0.
     *
     * @example
     * ```javascript
     * const t = textmode.create({ width: window.innerWidth, height: window.innerHeight });
     *
     * t.draw(() => {
     *   t.background(0);
     *   const c = t.color(255, 128, 0);
     *   const norm = c.normalized; // [1.0, 0.5, 0.0, 1.0]
     *
     *   // Display values
     *   const label = `R:${norm[0].toFixed(1)} G:${norm[1].toFixed(1)}`;
     *   t.charColor(c);
     *
     *   for(let i=0; i<label.length; i++) {
     *     t.push();
     *     t.translate(i - label.length/2, 0);
     *     t.char(label[i]);
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
    get normalized(): [number, number, number, number];
    /**
     * Create a copy of this color with a different alpha value.
     *
     * Useful for creating semi-transparent variations of existing colors without
     * manually copying RGB components.
     *
     * @param alpha The new alpha value (0-255). Values outside this range will be clamped.
     * @returns A new TextmodeColor instance with the updated alpha.
     *
     * @example
     * ```javascript
     * // Modifying alpha of a base color
     * const t = textmode.create({ width: window.innerWidth, height: window.innerHeight });
     *
     * t.draw(() => {
     *   t.background(0);
     *
     *   const base = t.color(50, 150, 255);
     *
     *   // Draw overlapping plates with varying opacity
     *   for (let i = 0; i < 5; i++) {
     *     t.push();
     *     t.translate((i - 2) * 5, Math.sin(t.frameCount * 0.05 + i) * 5);
     *
     *     // Create a variation of the base color
     *     const opacity = 100 + i * 30;
     *     t.charColor(base.withAlpha(opacity));
     *
     *     t.char(String.fromCharCode(65 + i));
     *     t.rect(12, 12);
     *     t.pop();
     *   }
     * });
     *
     * t.windowResized(() => {
     *   t.resizeCanvas(window.innerWidth, window.innerHeight);
     * });
     * ```
     */
    withAlpha(alpha: number): TextmodeColor;
    /**
     * Runtime type guard.
     * @ignore
     */
    static $isColor(value: unknown): value is TextmodeColor;
}
