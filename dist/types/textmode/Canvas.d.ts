import type { TextmodeOptions } from './types';
import { type RGBA } from './utils/cssColor';
/**
 * Manages a `HTMLCanvasElement` for textmode rendering.
 * @ignore
 */
export declare class TextmodeCanvas {
    private _canvas;
    private _targetCanvas;
    private _isOverlay;
    private _canvasCreatedByUs;
    /**
     * Creates a new TextmodeCanvas instance.
     * @param opts Options for creating or using an existing canvas
     * @ignore
     */
    constructor(opts?: TextmodeOptions);
    private _createCanvas;
    private _createOverlayCanvas;
    private _setupOverlayPositioning;
    private _collectBackgroundSources;
    /**
     * Attempts to detect the background color behind the textmode canvas.
     * Used internally for theming transparent UI elements like the loading screen.
     * @ignore
     */
    $sampleBackgroundColor(): RGBA | null;
    private _positionOverlayCanvas;
    /**
     * Resize the canvas to the specified width and height.
     * If width or height is not provided, it retains the current dimension.
     * @param width The new width of the canvas in pixels.
     * @param height The new height of the canvas in pixels.
     * @ignore
     */
    $resize(width?: number, height?: number): void;
    /**
     * Get the WebGL context for the overlay canvas
     * @ignore
     */
    $getWebGLContext(): WebGL2RenderingContext;
    /**
     * Dispose of this TextmodeCanvas and clean up all resources.
     * This method is idempotent and safe to call multiple times.
     * @ignore
     */
    $dispose(): void;
    /** Getters */
    get canvas(): HTMLCanvasElement;
    get targetCanvas(): HTMLCanvasElement | HTMLVideoElement | null;
    get width(): number;
    get height(): number;
}
