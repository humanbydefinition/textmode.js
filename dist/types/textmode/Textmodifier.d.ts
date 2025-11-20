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
    $registerSource(source: TextmodeSource): void;
}
export interface Textmodifier extends IRenderingMixin, IFontMixin, IAnimationMixin, IMouseMixin, ITouchMixin, IKeyboardMixin {
}
export {};
