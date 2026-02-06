import type { TextmodeGrid } from '../Grid';
import type { TextmodeFont } from '../loadables/font';
import type { TextmodeImage } from '../loadables/TextmodeImage';
import type { IDisposable } from './IDisposable';
import type { TextmodeCanvas } from '../Canvas';
import type { AnimationController } from '../AnimationController';
import type { GLRenderer } from '../../rendering/webgl/core/Renderer';
import type { MouseManager } from '../managers/MouseManager';
import type { KeyboardManager } from '../managers/KeyboardManager';
import type { TouchManager } from '../managers/TouchManager';
import type { IRenderingMixin } from '../mixins/interfaces/IRenderingMixin';
import type { IKeyboardMixin } from '../mixins/interfaces/IKeyboardMixin';
import type { ITouchMixin } from '../mixins/interfaces/ITouchMixin';
import type { IMouseMixin } from '../mixins/interfaces/IMouseMixin';
import type { IAnimationMixin } from '../mixins/interfaces/IAnimationMixin';
import type { LoadingScreenManager } from '../loading/LoadingScreenManager';
import type { TextmodeLayerManager } from '../layers';
import type { TextmodeLayer } from '../layers/TextmodeLayer';
import type { BuiltInFilterName, BuiltInFilterParams, TextmodeFilterManager, FilterName } from '../filters';
import type { TextmodeConversionManager } from '../conversion';
/**
 * Manages textmode rendering on a [`HTMLCanvasElement`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement) and provides methods for drawing,
 * exporting, font management, event handling, and animation control.
 *
 * If the `Textmodifier` instance is created without a canvas parameter,
 * it creates a new `HTMLCanvasElement` to draw on using the `textmode.js` drawing API.
 * If a canvas is provided, it will use that canvas instead.
 */
export interface ITextmodifier extends IRenderingMixin, IAnimationMixin, IMouseMixin, ITouchMixin, IKeyboardMixin {
    /** Core WebGL renderer @ignore */
    readonly _renderer: GLRenderer;
    /** Canvas management @ignore */
    readonly _canvas: TextmodeCanvas;
    /** Animation controller for managing rendering loop @ignore */
    readonly _animationController: AnimationController;
    /** Mouse interaction manager @ignore */
    readonly _mouseManager: MouseManager;
    /** Touch interaction manager @ignore */
    readonly _touchManager: TouchManager;
    /** Keyboard interaction manager @ignore */
    readonly _keyboardManager: KeyboardManager;
    /** Loading screen manager for boot-time UX @ignore */
    readonly _loading: LoadingScreenManager;
    /** Conversion manager for image-to-ASCII conversion @ignore */
    readonly _conversionManager: TextmodeConversionManager;
    /** Promise resolved when core renderer and base grid are ready @ignore */
    readonly _coreReady: Promise<void>;
    /** Layer manager for handling multiple layers @ignore */
    readonly _layerManager: TextmodeLayerManager;
    /** Active layer currently being rendered @ignore */
    _activeLayer?: TextmodeLayer;
    /** Main render method @ignore */
    $render(): void;
    /** Track a resource for automatic disposal @ignore */
    $trackDisposable(disposable: IDisposable): void;
    /**
     * Load a font, optionally setting it as the base layer's active font.
     *
     * Accepts either a URL string to load a new font, or an existing {@link TextmodeFont}
     * instance to reuse it.
     *
     * If `setActive` is true (default), the font is set as the base layer's font.
     * If `setActive` is false, the font is loaded/initialized and returned without modifying the layer.
     *
     * The returned font can be reused on other layers via {@link TextmodeLayer.loadFont}.
     *
     * @param fontSource The URL of the font to load, or an existing TextmodeFont instance.
     * @param setActive Whether to set the font as the base layer's active font. Defaults to `true`.
     * @returns The loaded TextmodeFont instance.
     *
     * @example
     * ```javascript
     * const t = textmode.create({ width: window.innerWidth, height: window.innerHeight });
     *
     * t.setup(async () => {
     *   // Load a custom font and set it as active immediately
     *   // Note: This automatically recalculates grid dimensions!
     *   // await t.loadFont('https://example.com/fonts/my-font.ttf');
     *
     *   // You can also preload fonts without activating them:
     *   // const pixelFont = await t.loadFont('./fonts/pixel.ttf', false);
     *
     *   // And then apply them to specific layers later:
     *   // t.layers.base.loadFont(pixelFont);
     * });
     *
     * t.draw(() => {
     *   t.background(0);
     *   t.charColor(255);
     *
     *   const text = "TYPE";
     *   // Center text
     *   const centerX = -text.length / 2;
     *
     *   for (let i = 0; i < text.length; i++) {
     *     t.push();
     *     t.translate(centerX + i + 0.5, 0);
     *     t.char(text[i]);
     *     // Pulsing effect
     *     t.charColor(150 + 100 * Math.sin(t.frameCount * 0.1 + i), 200, 255);
     *     t.rect(1, 1);
     *     t.pop();
     *   }
     * });
     *
     * t.windowResized(() => {
     *   t.resizeCanvas(window.innerWidth, window.innerHeight);
     * });
     * ```
     */
    loadFont(fontSource: string | TextmodeFont, setActive?: boolean): Promise<TextmodeFont>;
    /**
     * Get or set the font size used for rendering.
     * @param size The font size to set.
     * @returns The current font size if called without arguments.
     *
     * @example
     * ```javascript
     * // Create a Textmodifier instance
     * const t = textmode.create();
     *
     * t.setup(() => {
     *  // Set the font size to 32
     *  t.fontSize(32);
     *
     *  // Get the current font size
     *  console.log(t.fontSize()); // 32
     * });
     *
     * t.draw(() => {
     *  t.background(0);
     *  t.char('A');
     *  t.rect(5, 5);
     * });
     * ```
     */
    fontSize(size?: number): number | void;
    /**
     * Get or set the grid used for mouse and touch input coordinate mapping.
     *
     * By default, input coordinates are mapped to the topmost visible layer's grid,
     * which changes dynamically as layers are shown/hidden. Use this method to lock
     * input mapping to a specific grid or layer, or to return to responsive mode.
     *
     * When called without arguments, returns the current input grid mode:<br/>
     * - `'topmost'` if using responsive mode (default)<br/>
     * - The specific `TextmodeGrid` if locked
     *
     * @example
     * ```js
     * const t = textmode.create();
     *
     * // Add a UI layer on top
     * const uiLayer = t.layers.add({ fontSize: 16 });
     *
     * t.setup(() => {
     *   // Lock input to the base layer's grid for game controls
     *   // even though the UI layer is rendered on top
     *   t.inputGrid(t.layers.base.grid);
     * });
     *
     * t.draw(() => {
     *   // Mouse positions now always use base layer's grid
     *   console.log(`Mouse: ${t.mouse.x}, ${t.mouse.y}`);
     * });
     *
     * // Switch back to responsive mode
     * // t.inputGrid('topmost');
     *
     * // Or check current mode
     * // const current = t.inputGrid(); // 'topmost' or the locked grid
     * ```
     */
    inputGrid(target?: 'topmost' | TextmodeGrid): 'topmost' | TextmodeGrid | void;
    /**
     * Set a setup callback function that will be executed once when initialization is complete.
     *
     * This callback is called after font loading and grid initialization, allowing access to
     * properties like `textmodifier.grid.cols` for calculating layout or setup variables.
     *
     * The callback can be asynchronous (return a Promise).
     *
     * @param callback The function to call when setup is complete
     *
     * @example
     * ```javascript
     * const t = textmode.create({ width: window.innerWidth, height: window.innerHeight });
     *
     * let fb;
     *
     * t.setup(async () => {
     *   // Pre-allocate resources
     *   fb = t.createFramebuffer({ width: 20, height: 20 });
     *
     *   // Render static content to framebuffer once
     *   fb.begin();
     *   t.background(50, 0, 0);
     *   t.charColor(255, 200, 0);
     *   t.char('=');
     *   t.rect(20, 20);
     *   fb.end();
     * });
     *
     * t.draw(() => {
     *   t.background(0);
     *
     *   // Draw the pre-rendered content multiple times
     *   for(let i = 0; i < 5; i++) {
     *     t.push();
     *     t.translate(Math.sin(t.frameCount * 0.02 + i) * 20, i * 2);
     *     t.image(fb);
     *     t.pop();
     *   }
     * });
     *
     * t.windowResized(() => {
     *   t.resizeCanvas(window.innerWidth, window.innerHeight);
     * });
     * ```
     */
    setup(callback: () => void | Promise<void>): Promise<void>;
    /**
     * Set a draw callback function for the base layer.
     *
     * This callback function is where all drawing commands should be placed for textmode rendering on the main layer.
     *
     * If multiple layers are added via {@link Textmodifier.layers}, each layer has its own draw callback set via {@link TextmodeLayer.draw}.
     * This allows for complex multi-layered compositions with independent rendering logic per layer.
     *
     * Calling this method is equivalent to setting the draw callback on the base layer,
     * while the direct layer callback has precedence if both are set.
     * ```js
     * textmodifier.layers.base.draw(callback);
     * ```
     *
     * @param callback The function to call before each render
     *
     * @example
     * ```javascript
     * const t = textmode.create({ width: window.innerWidth, height: window.innerHeight });
     *
     * t.draw(() => {
     *   t.background(0);
     *
     *   // Create a dynamic, shifting pattern
     *   const time = t.frameCount * 0.05;
     *
     *   for (let i = 0; i < 20; i++) {
     *     const angle = time + i * 0.3;
     *     const radius = 10 + i;
     *
     *     const x = Math.cos(angle) * radius;
     *     const y = Math.sin(angle) * radius;
     *
     *     t.push();
     *     t.translate(x, y);
     *     t.rotateZ(angle);
     *
     *     // Color gradient from center out
     *     t.charColor(255 - i * 10, 100 + i * 5, 200);
     *     t.char(['+', 'x', 'o'][i % 3]);
     *
     *     t.rect(2, 2);
     *     t.pop();
     *   }
     * });
     *
     * t.windowResized(() => {
     *   t.resizeCanvas(window.innerWidth, window.innerHeight);
     * });
     * ```
     */
    draw(callback: () => void): void;
    /**
     * Set a callback function that will be called when the window is resized.
     * @param callback The function to call when the window is resized.
     *
     * @example
     * ```javascript
     * // Create a standalone textmodifier instance
     * const t = textmode.create({
     *   width: window.innerWidth,
     *   height: window.innerHeight,
     * });
     *
     * // Draw callback to update content
     * t.draw(() => {
     *  // Set background color
     *  t.background(128);
     *  t.char('A');
     *  t.rotateZ(t.frameCount * 2);
     *  t.rect(16, 16);
     * });
     *
     * // Set up window resize callback
     * t.windowResized(() => {
     *   // Resize the canvas to match window size
     *   t.resizeCanvas(window.innerWidth, window.innerHeight);
     * });
     * ```
     */
    windowResized(callback: () => void): void;
    /**
     * Resize the canvas and adjust all related components accordingly.
     *
     * @param width The new width of the canvas.
     * @param height The new height of the canvas.
     *
     * @example
     * ```javascript
     * // Create a standalone textmodifier instance
     * const t = textmode.create({
     *   width: window.innerWidth,
     *   height: window.innerHeight,
     * });
     *
     * // Draw callback to update content
     * t.draw(() => {
     *  // Set background color
     *  t.background(128);
     *  t.char('A');
     *  t.rotateZ(t.frameCount * 2);
     *  t.rect(16, 16);
     * });
     *
     * // Set up window resize callback
     * t.windowResized(() => {
     *   // Resize the canvas to match window size
     *   t.resizeCanvas(window.innerWidth, window.innerHeight);
     * });
     * ```
     */
    resizeCanvas(width: number, height: number): void;
    /**
     * Completely destroy this Textmodifier instance and free all associated resources.
     *
     * After calling this method, the instance should not be used and will be eligible for garbage collection.
     *
     * @example
     * ```js
     * // Create a textmodifier instance
     * const textmodifier = textmode.create();
     *
     * // ...
     *
     * // When done, completely clean up
     * textmodifier.destroy();
     *
     * // Instance is now safely disposed and ready for garbage collection
     * ```
     */
    destroy(): void;
    /**
     * Apply a filter to the final composited output.
     *
     * Filters are applied after all layers are composited but before
     * the result is presented to the canvas. Multiple filters can be
     * queued per frame and will be applied in order.
     *
     * @param name The name of the filter to apply (built-in or custom)
     * @param params Optional parameters for the filter
     *
     * @example
     * ```javascript
     * const t = textmode.create({ width: window.innerWidth, height: window.innerHeight });
     *
     * t.draw(() => {
     *   t.background(0);
     *
     *   // Draw overlapping shapes with gradient colors
     *   const time = t.frameCount * 0.02;
     *   const count = 12;
     *
     *   for (let i = 0; i < count; i++) {
     *     const angle = (i / count) * Math.PI * 2 + time;
     *     const r = 15 + 5 * Math.sin(time * 3 + i);
     *
     *     t.push();
     *     t.translate(Math.cos(angle) * r, Math.sin(angle) * r);
     *     t.rotateZ(angle * 50);
     *
     *     // Soft colors
     *     t.charColor(
     *       127 + 127 * Math.sin(i),
     *       127 + 127 * Math.cos(i),
     *       200
     *     );
     *     t.char(['@', '%', '#', '*'][i % 4]);
     *     t.rect(12, 12);
     *     t.pop();
     *   }
     *
     *   // Apply filters to alter the composition
     *
     *   // Dynamic threshold: creates a "cutout" look that evolves
     *   const thresh = 0.4 + 0.2 * Math.sin(time * 2);
     *   t.filter('threshold', thresh);
     *
     *   // Invert colors every second for a strobe effect
     *   if (Math.floor(time) % 2 === 0) {
     *     t.filter('invert');
     *   }
     * });
     *
     * t.windowResized(() => {
     *   t.resizeCanvas(window.innerWidth, window.innerHeight);
     * });
     * ```
     */
    filter<T extends BuiltInFilterName>(name: T, params?: BuiltInFilterParams[T]): void;
    filter<TParams = unknown>(name: FilterName, params?: TParams): void;
    filter(name: FilterName, params?: unknown): void;
    /**
     * Get the grid whose layer is currently being drawn to.
     * If called outside of a layers draw callback, returns the base layer's grid.
     *
     * If no grid is set (e.g., before user setup()), returns `undefined`.
     *
     * @example
     * ```javascript
     * const t = textmode.create({ width: window.innerWidth, height: window.innerHeight });
     *
     * t.draw(() => {
     *   t.background(0);
     *   const { cols, rows } = t.grid;
     *   const time = t.frameCount * 0.05;
     *
     *   // Iterate through the grid to create a field of waving characters
     *   // We use centered coordinates (from -cols/2 to cols/2)
     *   for (let y = -Math.floor(rows / 2); y < Math.floor(rows / 2); y++) {
     *     for (let x = -Math.floor(cols / 2); x < Math.floor(cols / 2); x++) {
     *       // Calculate distance from center for a ripple effect
     *       const dist = Math.sqrt(x * x + y * y);
     *       const ripple = Math.sin(dist * 0.4 - time);
     *
     *       // Map ripple value to character and color
     *       const charIdx = Math.floor((ripple + 1) * 2); // 0 to 4
     *       const glyph = ['.', ':', '-', '=', '#'][charIdx] || '#';
     *
     *       t.push();
     *       t.translate(x + 0.5, y + 0.5);
     *       t.char(glyph);
     *       t.charColor(100 + ripple * 155, 150 + ripple * 50, 255);
     *       t.point();
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
    readonly grid: TextmodeGrid | undefined;
    /**
     * Get the current font object used for rendering the base layer.
     *
     * @example
     * ```javascript
     * const t = textmode.create({ width: window.innerWidth, height: window.innerHeight });
     *
     * t.draw(() => {
     *   t.background(0);
     *
     *   const font = t.font;
     *   const count = font.characters.length;
     *   const info = `FONT CHARS: ${count}`;
     *
     *   // Visualize the character set count as a bar
     *   const barWidth = Math.min(Math.ceil(count / 10), t.grid.cols - 4);
     *
     *   t.char('░');
     *   t.charColor(100, 100, 100);
     *   t.rect(barWidth + 2, 5);
     *
     *   t.char('█');
     *   t.charColor(0, 150, 255);
     *   t.rect(barWidth, 3);
     *
     *   // Label
     *   for (let i = 0; i < info.length; i++) {
     *     t.push();
     *     t.translate(i - info.length / 2, 0);
     *     t.char(info[i]);
     *     t.cellColor(0);
     *     t.charColor(255);
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
    readonly font: TextmodeFont;
    /**
     * Get the width of the canvas in pixels.
     *
     * @example
     * ```javascript
     * const t = textmode.create({ width: window.innerWidth, height: window.innerHeight });
     *
     * t.draw(() => {
     *   t.background(0);
     *
     *   const w = t.width;
     *   const info = `WIDTH: ${w}px`;
     *
     *   // Draw arrows pointing to edges
     *   const arrowLen = Math.floor(t.grid.cols / 2) - 4;
     *
     *   // Left arrow
     *   for(let i=0; i<arrowLen; i++) {
     *      t.push();
     *      t.translate(-arrowLen + i, 0);
     *      t.char(i === 0 ? '<' : '-');
     *      t.charColor(255, 100, 100);
     *      t.point();
     *      t.pop();
     *   }
     *
     *   // Right arrow
     *   for(let i=0; i<arrowLen; i++) {
     *      t.push();
     *      t.translate(arrowLen - i, 0);
     *      t.char(i === 0 ? '>' : '-');
     *      t.charColor(255, 100, 100);
     *      t.point();
     *      t.pop();
     *   }
     *
     *   // Label
     *   for (let i = 0; i < info.length; i++) {
     *     t.push();
     *     t.translate(i - info.length / 2, 0);
     *     t.char(info[i]);
     *     t.charColor(255);
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
    readonly width: number;
    /**
     * Get the height of the canvas in pixels.
     *
     * @example
     * ```javascript
     * const t = textmode.create({ width: window.innerWidth, height: window.innerHeight });
     *
     * t.draw(() => {
     *   t.background(0);
     *
     *   const h = t.height;
     *   const info = `HEIGHT: ${h}px`;
     *
     *   // Draw vertical arrows pointing to edges
     *   const arrowLen = Math.floor(t.grid.rows / 2) - 3;
     *
     *   // Top arrow
     *   for(let i=0; i<arrowLen; i++) {
     *      t.push();
     *      t.translate(0, -arrowLen + i);
     *      t.char(i === 0 ? '╩' : '|');
     *      t.charColor(100, 255, 100);
     *      t.point();
     *      t.pop();
     *   }
     *
     *   // Bottom arrow
     *   for(let i=0; i<arrowLen; i++) {
     *      t.push();
     *      t.translate(0, arrowLen - i);
     *      t.char(i === 0 ? '╚' : '|');
     *      t.charColor(100, 255, 100);
     *      t.point();
     *      t.pop();
     *   }
     *
     *   // Label
     *   for (let i = 0; i < info.length; i++) {
     *     t.push();
     *     t.translate(i - info.length / 2, 0);
     *     t.char(info[i]);
     *     t.charColor(255);
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
    readonly height: number;
    /** Get the textmodifier canvas containing the rendered output. */
    readonly canvas: HTMLCanvasElement;
    /** Check if the instance has been disposed/destroyed. */
    readonly isDisposed: boolean;
    /**
     * Access the filter manager for this Textmodifier instance.
     *
     * Use this to register custom filters that can be applied both globally
     * (via {@link filter}) and on individual layers (via {@link TextmodeLayer.filter}).
     *
     * @example
     * ```ts
     * // Register a custom filter once
     * await t.filters.register('vignette', vignetteShader, {
     *     u_intensity: ['intensity', 0.5]
     * });
     *
     * t.draw(() => {
     *     t.background(0);
     *     t.char('A');
     *     t.rect(10, 10);
     *
     *     // Apply filter globally to final output
     *     t.filter('vignette', { intensity: 0.8 });
     *
     *     // Or apply to a specific layer
     *     t.layers.base.filter('vignette', 0.5);
     * });
     * ```
     */
    readonly filters: TextmodeFilterManager;
    /**
     * Access the layer manager for this Textmodifier instance.
     *
     * Use this to create and manage multiple layers within the textmode rendering context.
     * Each layer has its own grid, font, draw callback, and filters.
     *
     * @example
     * ```javascript
     * const t = textmode.create({ width: window.innerWidth, height: window.innerHeight });
     *
     * // Create a second layer on top of the base layer
     * const topLayer = t.layers.add();
     *
     * t.draw(() => {
     *   // 1. Draw background on base layer
     *   t.background(0);
     *
     *   // Rotating pattern in background
     *   t.push();
     *   t.rotateZ(t.frameCount);
     *   t.char('▼');
     *   t.charColor(50, 100, 150);
     *   t.rect(40, 40);
     *   t.pop();
     * });
     *
     * topLayer.draw(() => {
     *   // 2. Draw HUD/Text on top layer
     *   t.clear()
     *
     *   const time = t.frameCount * 0.05;
     *   const x = Math.sin(time) * 10;
     *
     *   t.char('æ');
     *   t.charColor(255, 200, 0);
     *   t.cellColor(0, 0, 0, 0); // Transparent cell background
     *   t.translate(x, 0);
     *   t.point();
     * });
     *
     * t.windowResized(() => {
     *   t.resizeCanvas(window.innerWidth, window.innerHeight);
     * });
     * ```
     */
    readonly layers: TextmodeLayerManager;
    /**
     * Access the conversion manager for this Textmodifier instance.
     *
     * Use this to register custom conversion strategies that can be used
     * when converting images/videos/canvases into textmode representations.
     */
    readonly conversions: TextmodeConversionManager;
    /**
     * If in overlay mode, returns the {@link TextmodeImage} instance capturing the target canvas/video content,
     * allowing further configuration of the conversion parameters.
     *
     * @example
     * ```js
     * // Create the textmode instance using the p5 canvas as input overlay
     * const t = textmode.create({ fontSize: 16, canvas: p.canvas, overlay: true });
     *
     * // Configure overlay conversion once fonts and grid are ready
     * t.setup(() => {
     *   t.overlay
     *     .characters(' .:-=+*#%@')        // Character set for brightness mapping
     *     .cellColorMode('fixed')          // Use fixed background cell color
     *     .cellColor(0, 0, 0)              // Black background for each cell
     *     .charColorMode('sampled')        // Sample the character color from the image
     *     .background(0, 0, 0, 255);       // Black fallback for transparent pixels
     * });
     *
     * // In the draw loop, pass the overlay into the text grid
     * t.draw(() => {
     *   t.clear();
     *   t.image(t.overlay, t.grid.cols, t.grid.rows);
     * });
     *```
     */
    readonly overlay: TextmodeImage | undefined;
    /**
     * Provides access to the loading screen manager to control boot-time loading UX.
     *
     * @example
     * ```javascript
     * const t = textmode.create({ width: 800, height: 600, loadingScreen: { message: 'loading...' } });
     *
     * t.setup(async () => {
     *   // Initialize two loading phases
     *   const phase1 = t.loading.addPhase('Loading assets');
     *   const phase2 = t.loading.addPhase('Initializing game');
     *
     *   // Start the first phase and simulate asset loading
     *   await phase1.track(async () => {
     *     for (let i = 0; i <= 5; i++) {
     *       phase1.report(i / 5);
     *       // Small delay - increases visibility of the loading animation
     *       await new Promise((r) => setTimeout(r, 200));
     *     }
     *   });
     *
     *   // Start the second phase and simulate initialization
     *   await phase2.track(async () => {
     *     for (let i = 0; i <= 5; i++) {
     *       phase2.report(i / 5);
     *       await new Promise((r) => setTimeout(r, 150));
     *     }
     *   });
     *
     *   // Optionally set a final message before the screen transitions away
     *   t.loading.message('Ready - enjoy!');
     * });
     * ```
     */
    readonly loading: LoadingScreenManager;
    /**
     * Check if rendering is currently in progress for this frame.
     */
    readonly isRenderingFrame: boolean;
}
