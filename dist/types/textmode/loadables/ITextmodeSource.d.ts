import type { UniformValue } from '../../rendering/webgl/types/UniformTypes';
import type { Material } from '../../rendering/webgl/materials/Material';
import type { TextmodeConversionMode } from '../conversion';
import type { TextmodeColor } from '../TextmodeColor';
import type { TextmodeFont } from './font/TextmodeFont';
import type { IDisposable } from '../interfaces/IDisposable';
/**
 * Base interface for drawable textmode sources (images, videos, canvas, etc.).
 * Handles shared WebGL texture state, material creation, and color/character settings.
 */
export interface ITextmodeSource extends IDisposable {
    /**
     * Select the conversion mode for this source.
     *
     * `textmode.js` includes only a single built-in conversion strategy `'brightness'`.
     *
     * Additional conversion strategies may be provided via add-on libraries.
     *
     * @param mode Conversion mode to use.
     * @returns This instance for chaining.
     *
     * @example
     * ```javascript
     * const t = textmode.create({ width: window.innerWidth, height: window.innerHeight });
     *
     * let img;
     *
     * t.setup(async () => {
     *   img = await t.loadImage('https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=500&q=80');
     *   img.conversionMode('brightness');
     *   img.characters(' .:-=+*#%@');
     * });
     *
     * t.draw(() => {
     *   t.background(0);
     *   if (!img) return;
     *
     *   // Draw centered
     *   t.image(img, img.width, img.height);
     * });
     *
     * t.windowResized(() => {
     *   t.resizeCanvas(window.innerWidth, window.innerHeight);
     * });
     * ```
     */
    conversionMode(mode: TextmodeConversionMode): this;
    /**
     * Dispose of the resource and free associated WebGL textures.
     *
     * This should be called when the resource is no longer needed to prevent memory leaks.
     * Resources created via {@link Textmodifier.loadImage}, {@link Textmodifier.loadVideo},
     * and {@link Textmodifier.createTexture} are automatically disposed when the
     * {@link Textmodifier} instance is destroyed, but you can call this manually to free memory earlier.
     */
    dispose(): void;
    /**
     * Register a callback to be run when this source is disposed.
     * @ignore
     */
    $addOnDispose(callback: () => void): void;
    /**
     * Set the invert flag, swapping character and cell colors when enabled.
     * @param v Invert flag
     * @returns This instance for chaining.
     *
     * @example
     * ```javascript
     * const t = textmode.create({ width: window.innerWidth, height: window.innerHeight });
     *
     * let texNormal, texInverted;
     *
     * t.setup(() => {
     *   // Create a procedural texture (gradient)
     *   const canvas = document.createElement('canvas');
     *   canvas.width = 64;
     *   canvas.height = 64;
     *   const ctx = canvas.getContext('2d');
     *   if (ctx) {
     *     const g = ctx.createLinearGradient(0, 0, 64, 64);
     *     g.addColorStop(0, '#000');
     *     g.addColorStop(1, '#fff');
     *     ctx.fillStyle = g;
     *     ctx.fillRect(0, 0, 64, 64);
     *   }
     *
     *   // Create two separate textures from the same source
     *   texNormal = t.createTexture(canvas);
     *   texNormal.characters(' .:-=+*#%@');
     *
     *   texInverted = t.createTexture(canvas);
     *   texInverted.characters(' .:-=+*#%@');
     *   texInverted.invert(true);
     * });
     *
     * t.draw(() => {
     *   t.background(0);
     *   if (!texNormal || !texInverted) return;
     *
     *   const size = Math.min(texNormal.width, texNormal.height) * 0.4;
     *   const offset = size * 0.6;
     *
     *   // Normal
     *   t.push();
     *   t.translate(-offset, 0);
     *   t.image(texNormal, size, size);
     *   t.pop();
     *
     *   // Inverted
     *   t.push();
     *   t.translate(offset, 0);
     *   t.image(texInverted, size, size);
     *   t.pop();
     * });
     *
     * t.windowResized(() => {
     *   t.resizeCanvas(window.innerWidth, window.innerHeight);
     * });
     * ```
     */
    invert(v?: boolean | number): this;
    /**
     * Set horizontal flip indicator flag.
     * @param v Flip flag
     * @returns This instance for chaining.
     *
     * @example
     * ```javascript
     * // Creating symmetry using flipX
     * const t = textmode.create({ width: window.innerWidth, height: window.innerHeight });
     *
     * let tex;
     *
     * t.setup(() => {
     *   // Create a simple procedural quadrant pattern
     *   const canvas = document.createElement('canvas');
     *   canvas.width = 64; canvas.height = 64;
     *   const ctx = canvas.getContext('2d');
     *   if (ctx) {
     *     const g = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
     *     g.addColorStop(0, '#fff'); g.addColorStop(1, '#000');
     *     ctx.fillStyle = g; ctx.fillRect(0, 0, 64, 64);
     *     ctx.strokeStyle = '#fff'; ctx.lineWidth = 4;
     *     ctx.strokeRect(0, 0, 64, 64);
     *   }
     *
     *   tex = t.createTexture(canvas);
     *   tex.characters(' .:-=+*#%@');
     * });
     *
     * t.draw(() => {
     *   t.background(5, 5, 15);
     *   if (!tex) return;
     *
     *   const size = 30;
     *   const time = t.frameCount * 0.02;
     *
     *   // Draw a 2x1 symmetrical composition
     *   for (let x = 0; x < 2; x++) {
     *     t.push();
     *     t.translate((x - 0.5) * size, 0);
     *
     *     // Flip the right side to create a mirrored effect
     *     tex.flipX(x === 1);
     *
     *     t.image(tex, size, size);
     *     t.pop();
     *   }
     * });
     *
     * t.windowResized(() => {
     *   t.resizeCanvas(window.innerWidth, window.innerHeight);
     * });
     * ```
     */
    flipX(v?: boolean | number): this;
    /**
     * Set vertical flip indicator flag.
     * @param v Flip flag
     * @returns This instance for chaining.
     *
     * @example
     * ```javascript
     * const t = textmode.create({ width: window.innerWidth, height: window.innerHeight });
     *
     * let img;
     *
     * t.setup(async () => {
     *   img = await t.loadImage('https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=500&q=80');
     *   img.characters(' .:-=+*#%@');
     * });
     *
     * t.draw(() => {
     *   t.background(0);
     *   if (!img) return;
     *
     *   const size = Math.min(img.width, img.height) * 0.4;
     *   const offset = size * 0.6;
     *
     *   // Draw original
     *   t.push();
     *   t.translate(-offset, 0);
     *   t.image(img, size, size);
     *   t.pop();
     *
     *   // Draw flipped vertically
     *   t.push();
     *   t.translate(offset, 0);
     *   img.flipY(true);
     *   t.image(img, size, size);
     *   // Reset for next frame
     *   img.flipY(false);
     *   t.pop();
     * });
     *
     * t.windowResized(() => {
     *   t.resizeCanvas(window.innerWidth, window.innerHeight);
     * });
     * ```
     */
    flipY(v?: boolean | number): this;
    /**
     * Set the character rotation in degrees (0-360).
     * @param degrees Rotation in degrees
     * @returns This instance for chaining.
     *
     * @example
     * ```javascript
     * const t = textmode.create({ width: window.innerWidth, height: window.innerHeight });
     *
     * let tex;
     *
     * t.setup(() => {
     *   // Create a procedural texture (checkers pattern)
     *   const canvas = document.createElement('canvas');
     *   canvas.width = 64;
     *   canvas.height = 64;
     *   const ctx = canvas.getContext('2d');
     *   if (ctx) {
     *     ctx.fillStyle = '#fff';
     *     ctx.fillRect(0, 0, 64, 64);
     *     ctx.fillStyle = '#000';
     *     ctx.fillRect(0, 0, 32, 32);
     *     ctx.fillRect(32, 32, 32, 32);
     *   }
     *
     *   tex = t.createTexture(canvas);
     *   tex.characters(' .:-=+*#%@');
     * });
     *
     * t.draw(() => {
     *   t.background(0);
     *   if (!tex) return;
     *
     *   const size = Math.min(tex.width, tex.height) * 0.4;
     *   const offset = size * 0.6;
     *
     *   // Original orientation (0 degrees)
     *   t.push();
     *   t.translate(-offset, 0);
     *   tex.charRotation(0);
     *   t.image(tex, size, size);
     *   t.pop();
     *
     *   // Rotated characters (90 degrees)
     *   t.push();
     *   t.translate(offset, 0);
     *   tex.charRotation(90);
     *   t.image(tex, size, size);
     *   t.pop();
     * });
     *
     * t.windowResized(() => {
     *   t.resizeCanvas(window.innerWidth, window.innerHeight);
     * });
     * ```
     */
    charRotation(degrees: number): this;
    /**
     * Set character color mode: `'sampled'` *(from source)* or `'fixed'`.
     * @param mode The character color mode
     * @returns This instance for chaining.
     *
     * @example
     * ```javascript
     * const t = textmode.create({ width: window.innerWidth, height: window.innerHeight });
     *
     * let img;
     *
     * t.setup(async () => {
     *   img = await t.loadImage('https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=500&q=80');
     *   img.characters(' .:-=+*#%@');
     * });
     *
     * t.draw(() => {
     *   t.background(0);
     *   if (!img) return;
     *
     *   // Use fixed color mode for a stylized look
     *   // Characters will be red, background will be sampled from image
     *   img.charColorMode('fixed')
     *      .charColor(255, 50, 50)
     *      .cellColorMode('sampled');
     *
     *   t.image(img, img.width, img.height);
     * });
     *
     * t.windowResized(() => {
     *   t.resizeCanvas(window.innerWidth, window.innerHeight);
     * });
     * ```
     */
    charColorMode(mode: 'sampled' | 'fixed'): this;
    /**
     * Set cell color mode: `'sampled'` *(from source)* or `'fixed'`.
     * @param mode The cell color mode
     * @returns This instance for chaining.
     *
     * @example
     * ```javascript
     * const t = textmode.create({ width: window.innerWidth, height: window.innerHeight });
     *
     * let img;
     *
     * t.setup(async () => {
     *   img = await t.loadImage('https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=500&q=80');
     *   img.characters(' .:-=+*#%@');
     * });
     *
     * t.draw(() => {
     *   t.background(0);
     *   if (!img) return;
     *
     *   // Sample character colors from image, but force black background
     *   // This creates a high-contrast ASCII art look
     *   img.charColorMode('sampled')
     *      .cellColorMode('fixed')
     *      .cellColor(Math.sin(t.frameCount * 0.1) * 127 + 128, 0, 0);
     *
     *   t.image(img, img.width, img.height);
     * });
     *
     * t.windowResized(() => {
     *   t.resizeCanvas(window.innerWidth, window.innerHeight);
     * });
     * ```
     */
    cellColorMode(mode: 'sampled' | 'fixed'): this;
    /**
     * Defines the character color when {@link charColorMode} is `'fixed'`.
     * @param colorOrGray A grayscale value (0-255), hex string ('#RGB', '#RRGGBB', '#RRGGBBAA'), or TextmodeColor instance
     * @param g Optional green component (0-255) if using RGB format, or alpha (0-255) when using grayscale form
     * @param b Optional blue component (0-255) if using RGB format
     * @param a Optional alpha component (0-255) if using RGBA format
     * @returns This instance for chaining.
     *
     * @example
     * ```javascript
     * const t = textmode.create({ width: window.innerWidth, height: window.innerHeight });
     *
     * let img;
     *
     * t.setup(async () => {
     *   img = await t.loadImage('https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=500&q=80');
     *   img.charColorMode('fixed');
     *   img.characters(' .:-=+*#%@');
     * });
     *
     * t.draw(() => {
     *   t.background(0);
     *   if (!img) return;
     *
     *   // Animate character color
     *   const r = 150 + 100 * Math.sin(t.frameCount * 0.05);
     *   const b = 150 + 100 * Math.cos(t.frameCount * 0.05);
     *
     *   img.charColor(r, 100, b);
     *
     *   t.image(img, img.width, img.height);
     * });
     *
     * t.windowResized(() => {
     *   t.resizeCanvas(window.innerWidth, window.innerHeight);
     * });
     * ```
     */
    charColor(colorOrGray: number | string | TextmodeColor, g?: number, b?: number, a?: number): this;
    /**
     * Defines the cell color when {@link cellColorMode} is `'fixed'`.
     * @param colorOrGray A grayscale value (0-255), hex string ('#RGB', '#RRGGBB', '#RRGGBBAA'), or TextmodeColor instance
     * @param g Optional green component (0-255) if using RGB format, or alpha (0-255) when using grayscale form
     * @param b Optional blue component (0-255) if using RGB format
     * @param a Optional alpha component (0-255) if using RGBA format
     * @returns This instance for chaining.
     *
     * @example
     * ```javascript
     * const t = textmode.create({ width: window.innerWidth, height: window.innerHeight });
     *
     * let img;
     *
     * t.setup(async () => {
     *   img = await t.loadImage('https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=500&q=80');
     *   img.cellColorMode('fixed');
     *   img.characters(' .:-=+*#%@');
     * });
     *
     * t.draw(() => {
     *   t.background(0);
     *   if (!img) return;
     *
     *   // Set a dark blue background for the image cells
     *   img.cellColor('#000033');
     *   // Ensure characters are visible
     *   img.charColorMode('fixed').charColor(255);
     *
     *   t.image(img, img.width, img.height);
     * });
     *
     * t.windowResized(() => {
     *   t.resizeCanvas(window.innerWidth, window.innerHeight);
     * });
     * ```
     */
    cellColor(colorOrGray: number | string | TextmodeColor, g?: number, b?: number, a?: number): this;
    /**
     * Defines the background color used for transparent pixels.
     * @param colorOrGray A grayscale value (0-255), hex string ('#RGB', '#RRGGBB', '#RRGGBBAA'), or TextmodeColor instance
     * @param g Optional green component (0-255) if using RGB format, or alpha (0-255) when using grayscale form
     * @param b Optional blue component (0-255) if using RGB format
     * @param a Optional alpha component (0-255) if using RGBA format
     * @returns This instance for chaining.
     *
     * @example
     * ```javascript
     * const t = textmode.create({ width: window.innerWidth, height: window.innerHeight });
     *
     * let img;
     *
     * t.setup(async () => {
     *   // Load an image with transparency (or simulate by setting background)
     *   // Here we use a standard image but define a background color that would
     *   // show through if the image had alpha holes.
     *   img = await t.loadImage('https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=500&q=80');
     *   img.characters(' .:-=+*#%@');
     * });
     *
     * t.draw(() => {
     *   t.background(50); // Canvas background
     *   if (!img) return;
     *
     *   // Set the image's "background" color (fallback for transparent pixels)
     *   img.background(255, 0, 0);
     *
     *   t.image(img, img.width, img.height);
     * });
     *
     * t.windowResized(() => {
     *   t.resizeCanvas(window.innerWidth, window.innerHeight);
     * });
     * ```
     */
    background(colorOrGray: number | TextmodeColor | string, g?: number, b?: number, a?: number): this;
    /**
     * Define the characters to use for brightness mapping as a string.
     * Maximum length is 255; excess characters are ignored.
     * @param chars String of characters to map
     * @returns This instance for chaining.
     *
     * @example
     * ```javascript
     * const t = textmode.create({ width: window.innerWidth, height: window.innerHeight });
     *
     * let tex;
     *
     * t.setup(() => {
     *     // Create a gradient pattern to demonstrate character mapping
     *     const canvas = document.createElement('canvas');
     *     canvas.width = 200;
     *     canvas.height = 200;
     *     const ctx = canvas.getContext('2d');
     *     if (ctx) {
     *         const g = ctx.createLinearGradient(0, 0, 200, 200);
     *         g.addColorStop(0, '#000');
     *         g.addColorStop(1, '#fff');
     *         ctx.fillStyle = g;
     *         ctx.fillRect(0, 0, 200, 200);
     *     }
     *
     *     tex = t.createTexture(canvas);
     *
     *     // Map brightness to a high-density character set
     *     // Darker pixels become ' ', lighter pixels become '@'
     *     tex.characters(' .:-=+*#%@');
     * });
     *
     * t.draw(() => {
     *     t.background(0);
     *
     *     // Render the image filling the entire grid
     *     // (0,0) is the center of the screen
     *     if (tex) {
     *         t.image(tex, tex.width, tex.height);
     *     }
     * });
     *
     * t.windowResized(() => {
     *   t.resizeCanvas(window.innerWidth, window.innerHeight);
     * });
     * ```
     */
    characters(chars: string): this;
    /**
     * Set the active font for the current render pass.
     * Called by the renderer before getMaterial() to ensure the source uses the correct layer's font.
     * @param font The font to use for this render
     * @ignore
     */
    $setActiveFont(font: TextmodeFont): void;
    /** Return the WebGL texture currently backing this source. */
    readonly texture: WebGLTexture;
    /** Ideal width in grid cells. */
    readonly width: number;
    /** Ideal height in grid cells. */
    readonly height: number;
    /** Original pixel width. */
    readonly originalWidth: number;
    /** Original pixel height. */
    readonly originalHeight: number;
    /**
     * Get or create the material for rendering this source.
     * @ignore
     */
    $getMaterial(): Material;
    /**
     * Create base conversion uniforms shared across all strategies.
     * @returns Uniforms object
     * @ignore
     */
    createBaseConversionUniforms(): Record<string, UniformValue>;
}
