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
 * Manages textmode rendering on a [`HTMLCanvasElement`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement) and provides methods for drawing,
 * font management, event handling, layer management, animation control, and more. The heart of the `textmode.js` library.
 *
 * If the `Textmodifier` instance is created without a canvas parameter,
 * it creates a new `HTMLCanvasElement` to draw on using the `textmode.js` drawing API.
 * If a canvas is provided, it will use that canvas instead.
 */
export declare class Textmodifier {
    private _managedDisposables;
    private _resolveCoreReady;
    private _isRenderingFrame;
    private _destroyRequested;
    private _isDisposed;
    private _pendingCanvasResize;
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
     * {@includeCode ../../examples/Textmodifier/draw/sketch.js}
     */
    draw(callback: () => void): void;
    /**
     * Load a font, optionally setting it as the base layer's active font.
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
     * @param fontSource The URL of the font to load, or an existing TextmodeFont instance.
     * @param setActive Whether to set the font as the base layer's active font. Defaults to `true`.
     * @returns The loaded TextmodeFont instance.
     *
     * @example
     * {@includeCode ../../examples/Textmodifier/loadFont/sketch.js}
     */
    loadFont(fontSource: string | TextmodeFont, setActive?: boolean): Promise<TextmodeFont>;
    /**
     * Load a tileset, optionally setting it as the base layer's active glyph source.
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
     * @param tilesetSource Tileset load options or an existing TextmodeTileset instance.
     * @param setActive Whether to set the tileset as the base layer's active glyph source. Defaults to `true`.
     * @returns The loaded TextmodeTileset instance.
     *
     * @example
     * {@includeCode ../../examples/Textmodifier/loadTileset/sketch.js}
     */
    loadTileset(tilesetSource: TextmodeTilesetOptions | TextmodeTileset, setActive?: boolean): Promise<TextmodeTileset>;
    /**
     * Get or set the font size used for rendering.
     * @param size The font size to set.
     * @returns The current font size if called without arguments.
     *
     * @example
     * {@includeCode ../../examples/Textmodifier/fontSize/sketch.js}
     */
    fontSize(size?: number): number | void;
    /**
     * Get or set whether the base layer should use authored tileset colors directly during the final ASCII pass.
     *
     * This is equivalent to calling {@link TextmodeLayer.useTileColors} on
     * {@link Textmodifier.layers base layer}.
     *
     * When disabled (default), tilesets on the base layer are recolored through the current
     * character (`primary`) and cell (`secondary`) colors.
     *
     * @param enabled Whether the base layer should use authored tileset colors directly.
     * @returns The current base-layer tileset-color mode if called without arguments.
     *
     * @example
     * {@includeCode ../../examples/Textmodifier/useTileColors/sketch.js}
     */
    useTileColors(enabled?: boolean): boolean | void;
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
     * {@includeCode ../../examples/Textmodifier/inputGrid/sketch.js}
     */
    inputGrid(target?: 'topmost' | TextmodeGrid): 'topmost' | TextmodeGrid | void;
    /**
     * Get the grid used for input coordinate mapping.
     * Returns the override grid/layer's grid if set, otherwise the topmost visible layer's grid.
     */
    private _getInputGrid;
    private _handleFatalError;
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
     * {@includeCode ../../examples/Textmodifier/setup/sketch.js}
     */
    setup(callback: () => void | Promise<void>): Promise<void>;
    /**
     * Set a callback function that will be called when the window is resized.
     * @param callback The function to call when the window is resized.
     *
     * @example
     * {@includeCode ../../examples/Textmodifier/windowResized/sketch.js}
     */
    windowResized(callback: () => void): void;
    /**
     * Get the grid whose layer is currently being drawn to.
     * If called outside of a layers draw callback, returns the base layer's grid.
     *
     * If no grid is set (e.g., before user setup()), returns `undefined`.
     *
     * @example
     * {@includeCode ../../examples/Textmodifier/grid/sketch.js}
     */
    get grid(): TextmodeGrid | undefined;
    /**
     * Get the current font object used for rendering the base layer.
     *
     * @example
     * {@includeCode ../../examples/Textmodifier/font/sketch.js}
     */
    get font(): TextmodeFont | TextmodeTileset;
    /**
     * Get the width of the canvas in pixels.
     *
     * @example
     * {@includeCode ../../examples/Textmodifier/width/sketch.js}
     */
    get width(): number;
    /**
     * Get the height of the canvas in pixels.
     *
     * @example
     * {@includeCode ../../examples/Textmodifier/height/sketch.js}
     */
    get height(): number;
    /**
     * Get the canvas containing the rendered output.
     *
     * @example
     * {@includeCode ../../examples/Textmodifier/canvas/sketch.js}
     */
    get canvas(): HTMLCanvasElement;
    /**
     * Check if the instance has been disposed/destroyed.
     *
     * @example
     * {@includeCode ../../examples/Textmodifier/isDisposed/sketch.js}
     */
    get isDisposed(): boolean;
    /**
     * If in overlay mode, returns the {@link TextmodeImage} instance capturing the target canvas/video content,
     * allowing further configuration of the conversion parameters.
     *
     * @example
     * {@includeCode ../../examples/Textmodifier/overlay/sketch.js}
     */
    get overlay(): TextmodeImage | undefined;
    /**
     * Provides access to the loading layer controller to control boot-time loading UX.
     *
     * @example
     * {@includeCode ../../examples/Textmodifier/loading/sketch.js}
     */
    get loading(): LoadingLayerController;
    /**
     * Provides access to the error layer controller to display fatal errors in a user-friendly way.
     *
     * @example
     * {@includeCode ../../examples/Textmodifier/errors/sketch.js}
     */
    get errors(): ErrorLayerController;
    /**
     * Access the layer manager for this Textmodifier instance.
     *
     * Use this to create and manage multiple layers within the textmode rendering context.
     * Each layer has its own grid, font, draw callback, and filters.
     *
     * @example
     * {@includeCode ../../examples/Textmodifier/layers/sketch.js}
     */
    get layers(): TextmodeLayerManager;
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
