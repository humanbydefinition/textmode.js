import type { TextmodeGrid } from '../Grid';
import type { TextmodeFont } from '../loadables/font';
import type { TextmodeImage } from '../loadables/TextmodeImage';
import type { TextmodeCanvas } from '../Canvas';
import type { AnimationController } from '../AnimationController';
import type { GLShader } from '../../rendering';
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
    /** Shader used for converting pixels to textmode grid format @ignore */
    readonly _textmodeConversionShader: GLShader;
    /** Shader used for final presentation to the screen @ignore */
    readonly _presentShader: GLShader;
    /** Loading screen manager for boot-time UX @ignore */
    readonly _loading: LoadingScreenManager;
    /** Conversion manager for image-to-ASCII conversion @ignore */
    readonly _conversionManager: TextmodeConversionManager;
    /** Filter manager for applying post-processing effects @ignore */
    readonly _filterManager: TextmodeFilterManager;
    /** Layer manager for handling multiple layers @ignore */
    readonly _layerManager: TextmodeLayerManager;
    /** Active font based on layer, or loading screen font override @ignore */
    _activeFont?: TextmodeFont;
    /** Active grid based on layer currently being rendered @ignore */
    _activeGrid?: TextmodeGrid;
    /** Main render method @ignore */
    $render(): void;
    /**
     * Load a font for the base layer and return it.
     *
     * The returned font can be reused on other layers via {@link TextmodeLayer.loadFont}.
     *
     * @param fontSource The URL of the font to load.
     * @returns The loaded TextmodeFont instance (base layer font).
     *
     * @example
     * ```javascript
     * const t = textmode.create();
     *
     * t.setup(async () => {
     *   // Load font for the base layer
     *   const font = await t.loadFont('./fonts/myfont.ttf');
     *   // const font = await t.layers.base.loadFont('./fonts/myfont.ttf'); // Equivalent
     *
     *   // Use the same font on another layer
     *   const layer = t.layers.add();
     *   await layer.loadFont(font);
     *
     *   // Or load a different font for a layer
     *   await layer.loadFont('./fonts/otherfont.ttf');
     * });
     * ```
     */
    loadFont(fontSource: string): Promise<TextmodeFont>;
    /**
     * Set the font size used for rendering.
     * @param size The font size to set.
     *
     * @example
     * ```javascript
     * // Create a Textmodifier instance
     * const t = textmode.create();
     *
     * t.setup(() => {
     *  // Set the font size to 32
     *  t.fontSize(32);
     * });
     *
     * t.draw(() => {
     *  t.background(0);
     *  t.char('A');
     *  t.rect(5, 5);
     * });
     * ```
     */
    fontSize(size: number): void;
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
     * ```javascript
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
     *   t.text(`Mouse: ${t.mouseX}, ${t.mouseY}`, 0, 0);
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
     * @param callback The function to call when setup is complete
     *
     * @example
     * ```javascript
     * const textmodifier = textmode.create({
     *   width: 800,
     *   height: 600,
     *   fontSize: 16
     * });
     *
     * // Setup callback - called once when ready
     * textmodifier.setup(() => {
     *   // Now you can access grid properties
     *   const cols = textmodifier.grid.cols;
     *   const rows = textmodifier.grid.rows;
     *
     *   // Initialize any variables that depend on grid size
     *   rectWidth = Math.floor(cols / 3);
     *   rectHeight = Math.floor(rows / 2);
     * });
     *
     * // Draw callback - called every frame
     * textmodifier.draw(() => {
     *   textmodifier.background(128);
     *   textmodifier.char('A');
     *   textmodifier.rotateZ(textmodifier.frameCount * 2);
     *   textmodifier.rect(rectWidth, rectHeight);
     * });
     * ```
     */
    setup(callback: () => void): void;
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
     * // Create a textmodifier instance
     * const t = textmode.create({
     *  width: 800,
     *  height: 600,
     * });
     *
     * // Set up draw callback
     * t.draw(() => {
     *   // Set background color
     *   t.background(128);
     *
     *   // Draw a textmode rectangle
     *   t.char('A');
     *   t.rotateZ(t.frameCount * 2);
     *   t.rect(16, 16);
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
     * ```ts
     * t.draw(() => {
     *     t.background(0);
     *     t.charColor(255);
     *     t.char('A');
     *     t.rect(10, 10);
     *
     *     // Apply built-in filters
     *     t.filter('grayscale', 0.5);
     *     t.filter('invert');
     *
     *     // Chain multiple filters
     *     t.filter('sepia', { amount: 0.3 });
     *     t.filter('threshold', 0.5);
     * });
     * ```
     */
    filter<T extends BuiltInFilterName>(name: T, params?: BuiltInFilterParams[T]): void;
    filter(name: FilterName, params?: unknown): void;
    filter(name: FilterName, params?: unknown): void;
    /**
     * Get the grid whose layer is currently being drawn to.
     * If called outside of a layers draw callback, returns the base layer's grid.
     *
     * If no grid is set (e.g., before user setup()), returns `undefined`.
     */
    readonly grid: TextmodeGrid | undefined;
    /** Get the current font object used for rendering the base layer. */
    readonly font: TextmodeFont;
    /** Get the width of the canvas in pixels. */
    readonly width: number;
    /** Get the height of the canvas in pixels. */
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
}
