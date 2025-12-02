import { GLRenderer } from '../rendering/webgl/core/Renderer';
import { TextmodeFont } from './loadables/font';
import { TextmodeGrid } from './Grid';
import { TextmodeCanvas } from './Canvas';
import { TextmodeImage } from './loadables/TextmodeImage';
import type { TextmodeSource } from './loadables/TextmodeSource';
import { AnimationController } from './AnimationController';
import { MouseManager } from './managers/MouseManager';
import { KeyboardManager } from './managers/KeyboardManager';
import { TouchManager } from './managers/TouchManager';
import type { ITextmodifier } from './interfaces';
import type { GLFramebuffer, GLShader } from '../rendering';
import type { TextmodeOptions } from './types';
import type { IAnimationMixin } from './mixins/interfaces/IAnimationMixin';
import type { IFontMixin } from './mixins/interfaces/IFontMixin';
import type { IRenderingMixin } from './mixins/interfaces/IRenderingMixin';
import type { IKeyboardMixin } from './mixins/interfaces/IKeyboardMixin';
import type { ITouchMixin } from './mixins/interfaces/ITouchMixin';
import type { IMouseMixin } from './mixins/interfaces/IMouseMixin';
import { LoadingScreenManager } from './loading/LoadingScreenManager';
import { LayerManager } from './layers/LayerManager';
import type { TextmodeLayerManager } from './layers';
import { TextmodeFilterManager } from './filters';
import type { FilterName, BuiltInFilterName, BuiltInFilterParams } from './filters';
declare const Textmodifier_base: {
    new (): {};
};
/**
 * Manages textmode rendering on a [`HTMLCanvasElement`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement) and provides methods for drawing,
 * font management, event handling, and animation control.
 *
 * If the `Textmodifier` instance is created without a canvas parameter,
 * it creates a new `HTMLCanvasElement` to draw on using the `textmode.js` drawing API.
 * If a canvas is provided, it will use that canvas instead.
 */
export declare class Textmodifier extends Textmodifier_base implements ITextmodifier {
    _renderer: GLRenderer;
    _font: TextmodeFont;
    _canvas: TextmodeCanvas;
    _grid: TextmodeGrid;
    _animationController: AnimationController;
    _mouseManager: MouseManager;
    _touchManager: TouchManager;
    _keyboardManager: KeyboardManager;
    _loading: LoadingScreenManager;
    _textmodeDrawFramebuffer: GLFramebuffer;
    _textmodeConversionShader: GLShader;
    _textmodeFramebuffer: GLFramebuffer;
    _presentShader: GLShader;
    _layerManager: TextmodeLayerManager;
    /** @internal */
    _filterManager: TextmodeFilterManager;
    private _globalFilterQueue;
    private _preFilterFramebuffer;
    private _postFilterFramebuffer;
    private _pluginManager;
    private _destroyRequested;
    private _isRenderingFrame;
    private _isDisposed;
    private _setupComplete;
    private _setupCallback;
    private _drawCallback;
    private _resizedCallback;
    private _windowResizeListener;
    private _resizeObserver?;
    private _isOverlay;
    private _targetCanvasImage?;
    _sources: Set<TextmodeSource>;
    /**
     * Create a new Textmodifier instance.
     * @param opts Configuration options for the Textmodifier instance.
     * @ignore
     */
    constructor(opts?: TextmodeOptions);
    private _initialize;
    /**
     * Setup event listeners for window resize and input handling.
     * @ignore
     */
    $setupEventListeners(): void;
    $render(): void;
    resizeCanvas(width: number, height: number): void;
    destroy(): void;
    private _performDestroy;
    setup(callback: () => void | Promise<void>): void;
    draw(callback: () => void): void;
    windowResized(callback: () => void): void;
    get grid(): TextmodeGrid;
    get font(): TextmodeFont;
    get width(): number;
    get height(): number;
    get canvas(): HTMLCanvasElement;
    get drawFramebuffer(): GLFramebuffer;
    get isDisposed(): boolean;
    get overlay(): TextmodeImage | undefined;
    get loading(): LoadingScreenManager;
    get layers(): LayerManager;
    /**
     * Access the filter manager for this Textmodifier instance.
     *
     * Use this to register custom filters that can be applied both globally
     * (via {@link filter}) and on individual layers (via {@link TextmodeLayer.filter}).
     * Filters only need to be registered once and are available everywhere.
     *
     * @example
     * ```typescript
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
    get filters(): TextmodeFilterManager;
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
     * ```typescript
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
    $registerSource(source: TextmodeSource): void;
}
export interface Textmodifier extends IRenderingMixin, IFontMixin, IAnimationMixin, IMouseMixin, ITouchMixin, IKeyboardMixin {
}
export {};
