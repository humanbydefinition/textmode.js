import type { GLFramebuffer } from '../../../rendering';
import type { TextmodeFont } from '../../loadables/font';
import type { TextmodeLayerBlendMode } from '../types';
import type { FilterName, BuiltInFilterName, BuiltInFilterParams } from '../../filters';
/**
 * A single layer within a multi-layered textmode rendering context.
 *
 * Layers are composited together using various blend modes
 * to create complex visual effects. Each layer can be independently
 * manipulated in terms of visibility, opacity, blend mode, and position.
 *
 * You can draw on each layer by providing a draw callback function,
 * like you would with the base layer's {@link Textmodifier.draw} method.
 *
 * You can also apply a sequence of post-processing filters to each layer's
 * rendered output using the {@link ITextmodeLayer.filter} method.
 *
 * The base layer, which is always present at the bottom of the layer stack,
 * can be accessed via {@link Textmodifier.baseLayer}.
 */
export interface ITextmodeLayer {
    /**
     * Returns the WebGL texture of the final ASCII framebuffer.
     * If the layer is not yet initialized, returns undefined.
     */
    readonly texture: WebGLTexture | undefined;
    /**
     * Returns the width of the final ASCII framebuffer in pixels.
     * If the layer is not yet initialized, returns 0.
     */
    readonly width: number;
    /**
     * Returns the height of the final ASCII framebuffer in pixels.
     * If the layer is not yet initialized, returns 0.
     */
    readonly height: number;
    /**
     * Returns the draw framebuffer for this layer.
     * If the layer is not yet initialized, returns undefined.
     */
    readonly drawFramebuffer: GLFramebuffer | undefined;
    /** The font used by this layer. */
    readonly font: TextmodeFont;
    /**
     * Define this layer's draw callback. The callback is executed each frame
     * and should contain all drawing commands for this layer.
     *
     * Inside the callback, use `t` (your `Textmodifier` instance) to access drawing
     * methods like `char()`, `charColor()`, `translate()`, and `rect()`.
     *
     * @param callback The function to call when drawing this layer.
     *
     * @example
     * ```javascript
     * const t = textmode.create();
     *
     * // Create layers with different blend modes
     * const glowLayer = t.layers.add({ blendMode: 'additive', opacity: 0.7 });
     * const particleLayer = t.layers.add({ blendMode: 'screen', opacity: 0.5 });
     *
     * // Base layer: animated background with subtle wave pattern
     * t.draw(() => {
     *   const time = t.frameCount * 0.02;
     *   t.background(8, 12, 24);
     *
     *   // Draw undulating grid pattern
     *   for (let y = -t.grid.rows / 2; y < t.grid.rows / 2; y++) {
     *     for (let x = -t.grid.cols / 2; x < t.grid.cols / 2; x++) {
     *       const wave = Math.sin(x * 0.3 + time) * Math.cos(y * 0.3 + time * 0.7);
     *       const brightness = 20 + wave * 15;
     *
     *       t.push();
     *       t.charColor(brightness, brightness + 5, brightness + 15);
     *       t.char(wave > 0.3 ? '+' : wave > -0.3 ? '·' : '.');
     *       t.translate(x, y);
     *       t.point();
     *       t.pop();
     *     }
     *   }
     * });
     *
     * // Glow layer: pulsing orbital ring
     * glowLayer.draw(() => {
     *   t.clear();
     *   const time = t.frameCount * 0.03;
     *   const ringCount = 24;
     *
     *   for (let i = 0; i < ringCount; i++) {
     *     const angle = (i / ringCount) * Math.PI * 2 + time;
     *     const pulse = Math.sin(time * 2 + i * 0.5) * 0.5 + 0.5;
     *     const radius = 8 + Math.sin(time * 1.5) * 2;
     *
     *     t.push();
     *     t.charColor(255, 180 + pulse * 75, 80 + pulse * 100);
     *     t.char('#*+=-'[i % 5]);
     *     t.translate(Math.round(Math.cos(angle) * radius), Math.round(Math.sin(angle) * radius * 0.6));
     *     t.point();
     *     t.pop();
     *   }
     * });
     *
     * // Particle layer: floating sparkles
     * particleLayer.draw(() => {
     *   t.clear();
     *   const time = t.frameCount * 0.015;
     *
     *   for (let i = 0; i < 12; i++) {
     *     const seed = i * 137.5; // Golden angle for distribution
     *     const x = Math.sin(seed + time) * (6 + i * 0.8);
     *     const y = Math.cos(seed * 1.3 + time * 0.8) * (4 + i * 0.5);
     *     const flicker = Math.sin(time * 4 + i) * 0.5 + 0.5;
     *
     *     t.push();
     *     t.charColor(200 + flicker * 55, 220, 255);
     *     t.char('*');
     *     t.translate(Math.round(x), Math.round(y));
     *     t.point();
     *     t.pop();
     *   }
     * });
     * ```
     */
    draw(callback: () => void): void;
    /** Get or set the font size for this layer. */
    fontSize(size?: number): number | void;
    /**
     * Load a font from the given source into this layer.
     *
     * @param fontSource The URL or path to the font file.
     * @returns The loaded TextmodeFont instance.
     *
     * @example
     * ```js
     * const layer = t.layers.add();
     *
     * t.setup(async () => {
     *   await layer.loadFont('./fonts/custom.ttf');
     * });
     * ```
     */
    loadFont(fontSource: string | TextmodeFont): Promise<TextmodeFont>;
    /**
     * Show this layer for rendering.
     */
    show(): void;
    /**
     * Hide this layer from rendering.
     */
    hide(): void;
    /**
     * Define or retrieve the layer's opacity.
     * @param opacity The opacity value to set (between 0 and 1).
     * @returns The current opacity if no parameter is provided.
     */
    opacity(opacity?: number): number | void;
    /**
     * Set or get the layer's blend mode for compositing with layers below.
     *
     * @param mode The blend mode to set.
     * @returns The current blend mode if no parameter is provided.
     *
     * **Available blend modes:**
     * - `'normal'` - Standard alpha compositing
     * - `'additive'` - Adds colors together (great for glow/energy effects)
     * - `'multiply'` - Darkens by multiplying colors
     * - `'screen'` - Lightens; inverse of multiply
     * - `'subtract'` - Subtracts layer from base
     * - `'darken'` - Takes minimum of each channel
     * - `'lighten'` - Takes maximum of each channel
     * - `'overlay'` - Combines multiply/screen for contrast
     * - `'softLight'` - Subtle contrast enhancement
     * - `'hardLight'` - Intense overlay effect
     * - `'colorDodge'` - Brightens base by blend color
     * - `'colorBurn'` - Darkens base by blend color
     * - `'difference'` - Absolute difference; creates inverted effects
     * - `'exclusion'` - Softer difference effect
     *
     * @example
     * ```javascript
     * const t = textmode.create();
     *
     * // Create 5 layers with different blend modes
     * const blendModes = ['additive', 'screen', 'overlay', 'difference', 'multiply'];
     * const colors = [[255, 80, 150], [80, 180, 255], [255, 200, 80], [150, 255, 120], [200, 120, 255]];
     * const layers = blendModes.map(mode => t.layers.add({ blendMode: mode, opacity: 0.85 }));
     *
     * t.draw(() => {
     *     const time = t.frameCount * 0.2;
     *     t.background(12, 8, 20, 255);
     *
     *     layers.forEach((layer, i) => {
     *         layer.draw(() => {
     *             t.charColor(...colors[i], 255);
     *
     *             // Draw spiral of characters
     *             for (let j = 0; j < 30; j++) {
     *                 const angle = j * 0.2 + time * (i % 2 ? 1 : -1);
     *                 const radius = 3 + j * 0.4 + Math.sin(time + j) * 2;
     *                 const x = Math.cos(angle) * radius;
     *                 const y = Math.sin(angle) * radius * 0.6;
     *
     *                 t.char('#*+=-.'[j % 6]);
     *                 t.translate(Math.round(x), Math.round(y));
     *                 t.rect(1, 1);
     *             }
     *         });
     *
     *         // Offset each layer
     *         layer.offset(Math.sin(time * 0.6 + i) * 6, Math.cos(time * 0.3 + i) * 4);
     *     });
     * });
     * ```
     */
    blendMode(mode: TextmodeLayerBlendMode): TextmodeLayerBlendMode | void;
    /**
     * Set or get the layer's offset in pixels.
     * @param x The x offset in pixels.
     * @param y The y offset in pixels.
     * @returns The current offset if no parameters are provided.
     *
     * @example
     * ```javascript
     * const t = textmode.create();
     *
     * const LAYER_COUNT = 32;
     * const LABEL = 'textmode.js';
     *
     * // Create trailing layers
     * const layers = Array.from({ length: LAYER_COUNT }, () =>
     *   t.layers.add({ blendMode: 'normal', opacity: 1.0 })
     * );
     *
     * // Snake segments for smooth trailing effect
     * const segments = Array.from({ length: LAYER_COUNT + 1 }, () => ({ x: 0, y: 0 }));
     *
     * // Helper to draw text label centered
     * const drawLabel = (color) => {
     *   t.charColor(...color);
     *   t.cellColor(0, 0, 0, 0);
     *   [...LABEL].forEach((char, i) => {
     *     t.push();
     *     t.char(char);
     *     t.translate(i - Math.floor(LABEL.length / 2), 0);
     *     t.rect(1, 1);
     *     t.pop();
     *   });
     * };
     *
     * // Set up layer draw callbacks
     * layers.forEach((layer, index) => {
     *   layer.draw(() => {
     *     t.background(0, 0, 0, 0);
     *     const brightness = 255 - (index / LAYER_COUNT) * 180;
     *     drawLabel([brightness, brightness * 0.8, 255]);
     *   });
     * });
     *
     * t.draw(() => {
     *   t.background(20, 20, 40);
     *   t.clear();
     *
     *   // Compute head position (circular motion)
     *   const time = t.frameCount * 0.06;
     *   const head = {
     *     x: Math.cos(time) * 24,
     *     y: Math.sin(time * 0.7) * 12
     *   };
     *
     *   // Update snake segments with elastic follow
     *   segments[0] = head;
     *   for (let i = 1; i < segments.length; i++) {
     *     const prev = segments[i - 1];
     *     segments[i].x += (prev.x - segments[i].x) * 0.3;
     *     segments[i].y += (prev.y - segments[i].y) * 0.3;
     *   }
     *
     *   // Draw head on base layer
     *   t.layers.base.offset(Math.round(head.x), Math.round(head.y));
     *   drawLabel([255, 200, 100]);
     *
     *   // Offset each trailing layer to its segment position
     *   layers.forEach((layer, index) => {
     *     const seg = segments[index + 1];
     *     layer.offset(Math.round(seg.x), Math.round(seg.y));
     *   });
     * });
     * ```
     */
    offset(x?: number, y?: number): {
        x: number;
        y: number;
    } | void;
    /**
     * Set or get the layer's rotation in degrees around its center.
     *
     * The rotation is applied during compositing around the center of the layer's
     * rectangular bounds. The rotation origin remains at the center even when
     * an offset is applied.
     *
     * @param z The rotation angle in degrees. Positive values rotate clockwise.
     * @returns The current rotation in degrees if no parameter is provided.
     *
     * @example
     * ```javascript
     * const t = textmode.create();
     *
     * const rotatingLayer = t.layers.add({ blendMode: 'difference', opacity: 1.0 });
     *
     * rotatingLayer.draw(() => {
     *   t.clear();
     *   t.charColor(255, 200, 100);
     *   t.char('#');
     *   t.rect(10, 5);
     * });
     *
     * t.draw(() => {
     *   t.background(20, 20, 40);
     *
     *   // Rotate the layer over time
     *   rotatingLayer.rotateZ(t.frameCount * 2);
     *
     *   t.charColor(100, 200, 255);
     *   t.char('-');
     *   t.rect(t.grid.cols, t.grid.rows);
     * });
     * ```
     */
    rotateZ(z?: number): number | void;
    /**
     * Apply a post-processing filter to this layer's rendered output.
     *
     * Filters are applied after ASCII conversion in the order they are called.
     * Call this method within your layer's draw callback to apply effects.
     *
     * **Built-in filters:**
     * - `'invert'` - Inverts all colors
     * - `'grayscale'` - Converts to grayscale (param: amount 0-1, default 1)
     * - `'sepia'` - Applies sepia tone (param: amount 0-1, default 1)
     * - `'threshold'` - Black/white threshold (param: threshold 0-1, default 0.5)
     *
     * @param name The name of the filter to apply (built-in or custom registered filter)
     * @param params Optional parameters for the filter
     *
     * @example
     * ```javascript
     * const t = textmode.create();
     *
     * // Create a layer with filters applied
     * const effectLayer = t.layers.add({ blendMode: 'normal', opacity: 1.0 });
     *
     * t.draw(() => {
     *   // Base layer: draw a simple pattern
     *   t.background(20, 20, 40);
     *   t.charColor(255, 200, 100);
     *   t.char('#');
     *   t.rect(t.grid.cols, t.grid.rows);
     * });
     *
     * effectLayer.draw(() => {
     *   t.clear();
     *   t.charColor(100, 150, 255);
     *   t.char('*');
     *   t.rect(10, 10);
     *
     *   // Apply filters in sequence
     *   if (t.frameCount % 120 < 60) {
     *     effectLayer.filter('invert');
     *   }
     *   effectLayer.filter('grayscale', Math.sin(t.frameCount * 0.05) * 0.5 + 0.5);
     * });
     * ```
     */
    filter<T extends BuiltInFilterName>(name: FilterName, params?: BuiltInFilterParams[T]): void;
    /**
     * Apply a custom filter registered via `t.layers.filters.register()`.
     * @param name The name of the custom filter
     * @param params Optional parameters for the custom filter
     */
    filter(name: FilterName, params?: unknown): void;
}
