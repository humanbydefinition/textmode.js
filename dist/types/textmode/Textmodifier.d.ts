import { TextmodeFont, TextmodeTileset } from './fonts';
import type { TextmodeTilesetOptions } from './fonts';
import { TextmodeGrid } from './grid/TextmodeGrid';
import { TextmodeImage } from './media/TextmodeImage';
import { LoadingLayerController } from './layers/overlays';
import { ErrorLayerController } from './layers/overlays/error/ErrorLayerController';
import { TextmodeLayerManager } from './layers';
import type { TextmodeFilterManager } from './filters';
import type { FilterName, BuiltInFilterName, BuiltInFilterParams } from './filters';
import { TextmodeConversionManager } from './conversion';
/**
 * The main `textmode.js` drawing context.
 *
 * A Textmodifier manages a canvas, renderer, layers, fonts, media sources, input,
 * animation, and the p5-style drawing API. When no canvas is supplied, it creates
 * one; when a canvas is supplied, it renders into or over that element depending
 * on the chosen options.
 */
export declare class Textmodifier {
    private _managedDisposables;
    private _resolveCoreReady;
    private _isRenderingFrame;
    private _destroyRequested;
    private _isDisposed;
    private _pendingCanvasResize;
    private _pendingInitialDraw;
    private _queuedRedrawCount;
    private _setupCallback;
    private _resizedCallback;
    private _windowResizeListener;
    private _windowBlurListener;
    private _resizeObserver?;
    private _isOverlay;
    private _targetCanvasImage?;
    private _inputGridOverride?;
    private _applyCanvasResize;
    private _resizeSourcesForGrid;
    private _initialize;
    private _startAnimationScheduler;
    private _hasScheduledRenderWork;
    private _shouldRenderUserFrame;
    private _renderUserFrameBehindLoadingTransition;
    private _drainQueuedUserFrames;
    private _renderUserFrame;
    /**
     * Resize the canvas and adjust all related components accordingly.
     *
     * @param width The new width of the canvas.
     * @param height The new height of the canvas.
     *
     * @example
     * {@includeCode ../../examples/Textmodifier/resizeCanvas/sketch.js}
     */
    resizeCanvas(width: number, height: number): void;
    /**
     * Completely destroy this Textmodifier instance and free all associated resources.
     *
     * After calling this method, the instance should not be used and will be eligible for garbage collection.
     *
     * @example
     * {@includeCode ../../examples/Textmodifier/destroy/sketch.js}
     */
    destroy(): void;
    private _performDestroy;
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
     * {@includeCode ../../examples/Textmodifier/filter/sketch.js}
     */
    filter<T extends BuiltInFilterName>(name: T, params?: BuiltInFilterParams[T]): void;
    filter<TParams = unknown>(name: FilterName, params?: TParams): void;
    /**
     * Set the base layer draw callback.
     *
     * Put drawing commands for the main layer in this callback.
     *
     * If multiple layers are added via {@link Textmodifier.layers}, each layer has its own draw callback set via {@link TextmodeLayer.draw}.
     *
     * Calling this method is equivalent to setting the callback on `textmodifier.layers.base`.
     * The direct base-layer callback has precedence if both are set.
     * ```js
     * textmodifier.layers.base.draw(callback);
     * ```
     *
     * @param callback Function to run before each base layer render.
     *
     * @example
     * {@includeCode ../../examples/Textmodifier/draw/sketch.js}
     */
    draw(callback: () => void): void;
    /**
     * Set the base layer post-draw callback.
     *
     * This callback runs after the base layer's draw callback, ASCII conversion, and
     * any filters queued on the base layer during draw. Filters queued on
     * `t.layers.base` inside this callback are applied to the base layer before
     * other layers are composited on top.
     *
     * Calling this method is equivalent to setting the callback on `textmodifier.layers.base`:
     * ```js
     * textmodifier.layers.base.postDraw(callback);
     * ```
     *
     * @param callback Function to run after the base layer has been drawn and filtered.
     *
     * @example
     * ```js
     * t.draw(() => {
     * 	t.background(0);
     * 	t.char('A');
     * 	t.rect(12, 8);
     * 	t.layers.base.filter('grayscale', 0.5);
     * });
     *
     * t.postDraw(() => {
     * 	t.layers.base.filter('invert');
     * });
     * ```
     */
    postDraw(callback: () => void): void;
    /**
     * Set the final post-processing callback for the composited output.
     *
     * This callback runs after all visible layers have been composited and after
     * global filters queued via {@link filter} during normal draw callbacks have
     * been applied. Filters queued with `t.filter()` inside this callback are applied
     * to the final composited texture before it is presented to the canvas.
     *
     * Use {@link postDraw} when you want to affect only the base layer. Use this
     * method when you want to affect the final image made from all layers.
     *
     * @param callback Function to run before the final texture is presented.
     *
     * @example
     * ```js
     * t.draw(() => {
     * 	t.background(0);
     * 	t.char('A');
     * 	t.rect(12, 8);
     * 	t.filter('grayscale', 0.4);
     * });
     *
     * t.finalDraw(() => {
     * 	t.filter('invert');
     * });
     * ```
     */
    finalDraw(callback: () => void): void;
    /**
     * Load a font and optionally set it as the base layer's active font.
     *
     * Accepts either a URL string to load a new font, or an existing {@link TextmodeFont}
     * instance to use as a reusable source.
     *
     * If `setActive` is true (default), the font is set as the base layer's font.
     * If `setActive` is false, the font is loaded/initialized and returned without modifying the layer.
     *
     * The returned font can be reused on other layers via {@link TextmodeLayer.loadFont},
     * which creates a layer-local fork rather than sharing a mutable instance by reference.
     *
     * @param fontSource Font URL or reusable TextmodeFont instance.
     * @param setActive Whether to activate the font on the base layer. Defaults to `true`.
     * @returns The loaded TextmodeFont.
     *
     * @example
     * {@includeCode ../../examples/Textmodifier/loadFont/sketch.js}
     */
    loadFont(fontSource: string | TextmodeFont, setActive?: boolean): Promise<TextmodeFont>;
    /**
     * Load a tileset and optionally set it as the base layer's active glyph source.
     *
     * Accepts either tileset load options or an existing {@link TextmodeTileset}
     * instance to use as a reusable source.
     *
     * If `setActive` is true (default), the tileset is set as the base layer's glyph source.
     * If `setActive` is false, the tileset is loaded/initialized and returned without modifying the layer.
     *
     * The returned tileset can be reused on other layers via {@link TextmodeLayer.loadTileset},
     * which creates a layer-local fork rather than sharing a mutable instance by reference.
     *
     * @param tilesetSource Tileset options or reusable TextmodeTileset instance.
     * @param setActive Whether to activate the tileset on the base layer. Defaults to `true`.
     * @returns The loaded TextmodeTileset.
     *
     * @example
     * {@includeCode ../../examples/Textmodifier/loadTileset/sketch.js}
     */
    loadTileset(tilesetSource: TextmodeTilesetOptions | TextmodeTileset, setActive?: boolean): Promise<TextmodeTileset>;
    /**
     * Set or get the base layer font size.
     * @param size Font size to apply.
     * @returns Current font size when called without arguments.
     *
     * @example
     * {@includeCode ../../examples/Textmodifier/fontSize/sketch.js}
     */
    fontSize(size?: number): number | void;
    /**
     * Configure authored tileset color preservation on the base layer.
     *
     * This is equivalent to calling {@link TextmodeLayer.useTileColors} on the base layer.
     *
     * When disabled (default), tilesets on the base layer are recolored through the current
     * character (`primary`) and cell (`secondary`) colors.
     *
     * @param enabled Whether to preserve authored tileset colors.
     * @returns Current base-layer tileset-color mode when called without arguments.
     *
     * @example
     * {@includeCode ../../examples/Textmodifier/useTileColors/sketch.js}
     */
    useTileColors(enabled?: boolean): boolean | void;
    /**
     * Get or set the grid used for mouse and touch coordinate mapping.
     *
     * By default, input coordinates are mapped to the topmost visible layer's grid,
     * which changes dynamically as layers are shown/hidden. Use this method to lock
     * input mapping to a specific grid, or to return to responsive mode.
     *
     * When called without arguments, returns the current input grid mode:<br/>
     * - `'topmost'` if using responsive mode (default)<br/>
     * - The specific `TextmodeGrid` if locked
     *
     * @example
     * {@includeCode ../../examples/Textmodifier/inputGrid/sketch.js}
     */
    inputGrid(target?: 'topmost' | TextmodeGrid): 'topmost' | TextmodeGrid | void;
    /**
     * Resolve the grid used for input coordinate mapping.
     *
     * Uses the override grid when set; otherwise uses the topmost visible layer's grid.
     */
    private _getInputGrid;
    private _handleFatalError;
    /**
     * Set the setup callback that runs once initialization is complete.
     *
     * This callback is called after font loading and grid initialization, allowing access to
     * properties like `textmodifier.grid.cols` for calculating layout or setup variables.
     *
     * The callback can be asynchronous (return a Promise).
     *
     * @param callback Function to run after setup is complete.
     *
     * @example
     * {@includeCode ../../examples/Textmodifier/setup/sketch.js}
     */
    setup(callback: () => void | Promise<void>): Promise<void>;
    /**
     * Set the callback that runs after a window resize.
     * @param callback Function to run after the window is resized.
     *
     * @example
     * {@includeCode ../../examples/Textmodifier/windowResized/sketch.js}
     */
    windowResized(callback: () => void): void;
    /**
     * Grid for the layer currently being drawn.
     *
     * Outside a layer draw callback, this returns the base layer's grid.
     *
     * If no grid is set (e.g., before user setup()), returns `undefined`.
     *
     * @example
     * {@includeCode ../../examples/Textmodifier/grid/sketch.js}
     */
    get grid(): TextmodeGrid | undefined;
    /**
     * Font or tileset used by the current drawing layer.
     *
     * @example
     * {@includeCode ../../examples/Textmodifier/font/sketch.js}
     */
    get font(): TextmodeFont | TextmodeTileset;
    /**
     * Canvas width in pixels.
     *
     * @example
     * {@includeCode ../../examples/Textmodifier/width/sketch.js}
     */
    get width(): number;
    /**
     * Canvas height in pixels.
     *
     * @example
     * {@includeCode ../../examples/Textmodifier/height/sketch.js}
     */
    get height(): number;
    /**
     * Canvas containing the rendered output.
     *
     * @example
     * {@includeCode ../../examples/Textmodifier/canvas/sketch.js}
     */
    get canvas(): HTMLCanvasElement;
    /**
     * Whether this instance has been destroyed.
     *
     * @example
     * {@includeCode ../../examples/Textmodifier/isDisposed/sketch.js}
     */
    get isDisposed(): boolean;
    /**
     * Overlay source image for the target canvas or video, when overlay mode is enabled.
     *
     * @example
     * {@includeCode ../../examples/Textmodifier/overlay/sketch.js}
     */
    get overlay(): TextmodeImage | undefined;
    /**
     * Built-in loading layer controller.
     *
     * @example
     * {@includeCode ../../examples/Textmodifier/loading/sketch.js}
     */
    get loading(): LoadingLayerController;
    /**
     * Built-in fatal error layer controller.
     *
     * @example
     * {@includeCode ../../examples/Textmodifier/errors/sketch.js}
     */
    get errors(): ErrorLayerController;
    /**
     * Layer manager for this Textmodifier instance.
     *
     * Use this to create and manage multiple layers within the textmode rendering context.
     * Each layer has its own grid, font, draw callback, and filters.
     *
     * @example
     * {@includeCode ../../examples/Textmodifier/layers/sketch.js}
     */
    get layers(): TextmodeLayerManager;
    /**
     * Filter manager for this Textmodifier instance.
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
     *
     * @example
     * {@includeCode ../../examples/Textmodifier/filters/sketch.js}
     */
    get filters(): TextmodeFilterManager;
    /**
     * Access the conversion manager for this Textmodifier instance.
     *
     * Use this to register custom conversion strategies that can be used
     * when converting images/videos/canvases into textmode representations.
     *
     * @example
     * {@includeCode ../../examples/Textmodifier/conversions/sketch.js}
     */
    get conversions(): TextmodeConversionManager;
    /**
     * Check if rendering is currently in progress for this frame.
     *
     * @example
     * {@includeCode ../../examples/Textmodifier/isRenderingFrame/sketch.js}
     */
    get isRenderingFrame(): boolean;
}
