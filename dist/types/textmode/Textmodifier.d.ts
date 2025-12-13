import { GLRenderer } from '../rendering/webgl/core/Renderer';
import { TextmodeFont } from './loadables/font';
import { TextmodeGrid } from './Grid';
import { TextmodeCanvas } from './Canvas';
import { TextmodeImage } from './loadables/TextmodeImage';
import { AnimationController } from './AnimationController';
import { MouseManager } from './managers/MouseManager';
import { KeyboardManager } from './managers/KeyboardManager';
import { TouchManager } from './managers/TouchManager';
import type { ITextmodifier } from './interfaces';
import type { GLShader } from '../rendering';
import type { TextmodeOptions } from './types';
import type { IAnimationMixin } from './mixins/interfaces/IAnimationMixin';
import type { IRenderingMixin } from './mixins/interfaces/IRenderingMixin';
import type { IKeyboardMixin } from './mixins/interfaces/IKeyboardMixin';
import type { ITouchMixin } from './mixins/interfaces/ITouchMixin';
import type { IMouseMixin } from './mixins/interfaces/IMouseMixin';
import { LoadingScreenManager } from './loading/LoadingScreenManager';
import { LayerManager } from './layers/LayerManager';
import type { TextmodeLayerManager } from './layers';
import { TextmodeFilterManager } from './filters';
import type { FilterName, BuiltInFilterName, BuiltInFilterParams } from './filters';
import { TextmodeConversionManager } from './conversion';
declare const Textmodifier_base: {
    new (): {};
};
/**
 * Manages textmode rendering on a [`HTMLCanvasElement`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement) and provides methods for drawing,
 * font management, event handling, layer management, animation control, and more. The heart of the `textmode.js` library.
 *
 * If the `Textmodifier` instance is created without a canvas parameter,
 * it creates a new `HTMLCanvasElement` to draw on using the `textmode.js` drawing API.
 * If a canvas is provided, it will use that canvas instead.
 */
export declare class Textmodifier extends Textmodifier_base implements ITextmodifier {
    _renderer: GLRenderer;
    _canvas: TextmodeCanvas;
    _animationController: AnimationController;
    _mouseManager: MouseManager;
    _touchManager: TouchManager;
    _keyboardManager: KeyboardManager;
    _loading: LoadingScreenManager;
    _textmodeConversionShader: GLShader;
    _presentShader: GLShader;
    _layerManager: TextmodeLayerManager;
    _activeFont?: TextmodeFont;
    _activeGrid?: TextmodeGrid;
    _filterManager: TextmodeFilterManager;
    _conversionManager: TextmodeConversionManager;
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
    private _inputGridOverride?;
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
    filter<T extends BuiltInFilterName>(name: T, params?: BuiltInFilterParams[T]): void;
    filter(name: FilterName, params?: unknown): void;
    loadFont(fontSource: string): Promise<TextmodeFont>;
    fontSize(size: number): void;
    inputGrid(target?: 'topmost' | TextmodeGrid): 'topmost' | TextmodeGrid | void;
    /**
     * Get the grid used for input coordinate mapping.
     * Returns the override grid/layer's grid if set, otherwise the topmost visible layer's grid.
     * @ignore
     */
    private _getInputGrid;
    setup(callback: () => void | Promise<void>): Promise<void>;
    draw(callback: () => void): void;
    windowResized(callback: () => void): void;
    get grid(): TextmodeGrid | undefined;
    get font(): TextmodeFont;
    get width(): number;
    get height(): number;
    get canvas(): HTMLCanvasElement;
    get isDisposed(): boolean;
    get overlay(): TextmodeImage | undefined;
    get loading(): LoadingScreenManager;
    get layers(): LayerManager;
    get filters(): TextmodeFilterManager;
    get conversions(): TextmodeConversionManager;
}
export interface Textmodifier extends IRenderingMixin, IAnimationMixin, IMouseMixin, ITouchMixin, IKeyboardMixin {
}
export {};
