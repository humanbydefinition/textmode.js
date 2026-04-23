import type { TextmodeOptions } from '../types';
/**
 * Manages a `HTMLCanvasElement` for textmode rendering.
 */
export declare class TextmodeCanvas {
    private _canvas;
    private _targetCanvas;
    private _isOverlay;
    private _canvasCreatedByUs;
    private _externalGL;
    private _ownsContext;
    private _gl;
    private _pendingBodyMountListener;
    private _pendingOverlayInsertListener;
    private _isDisposed;
    /**
     * Creates a new TextmodeCanvas instance.
     * @param opts Options for creating or using an existing canvas
     */
    constructor(opts?: TextmodeOptions);
    private _createCanvas;
    private _appendCanvasToBodyWhenReady;
    private _createOverlayCanvas;
    private _setupOverlayPositioning;
    private _insertOverlayCanvas;
    private _positionOverlayCanvas;
    /**
     * Resize the canvas to the specified width and height.
     * If width or height is not provided, it retains the current dimension.
     * @param width The new width of the canvas in pixels.
     * @param height The new height of the canvas in pixels.
     */
    _resize(width?: number, height?: number): void;
    /**
     * Get the WebGL context for the canvas.
     * Returns external context if provided, otherwise creates a new one.
     */
    _getWebGLContext(): WebGL2RenderingContext;
    /**
     * Dispose of this TextmodeCanvas and clean up all resources.
     * This method is idempotent and safe to call multiple times.
     */
    _dispose(): void;
    private _clearPendingDomListeners;
    get canvas(): HTMLCanvasElement;
    get targetCanvas(): HTMLCanvasElement | HTMLVideoElement | null;
    get width(): number;
    get height(): number;
    get ownsContext(): boolean;
}
