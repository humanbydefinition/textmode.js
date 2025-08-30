import type { TextmodeOptions } from "./Textmodifier";
/**
 * Supported capture sources for textmode rendering.
 */
export type TextmodeCaptureSource = HTMLCanvasElement | HTMLVideoElement;
/**
 * TextmodeCanvas is a utility class that creates an overlay canvas
 * for rendering textmode graphics on top of an existing HTML canvas or video element,
 * or manages a standalone canvas for independent rendering.
 * @ignore
 */
export declare class TextmodeCanvas {
    private _canvas;
    private _captureSource;
    private _isStandalone;
    private _resizeObserver?;
    onTransformChange?: () => void;
    constructor(captureSource: TextmodeCaptureSource, isStandalone?: boolean, opts?: TextmodeOptions);
    private _createCanvas;
    private _positionOverlayCanvas;
    $resize(width?: number, height?: number): void;
    /**
     * Get the WebGL context for the overlay canvas
     */
    $getWebGLContext(): WebGL2RenderingContext | WebGLRenderingContext;
    /**
     * Set up ResizeObserver to monitor for CSS transform changes
     *
     * note: might be redundant and can be deleted?
     */
    private setupTransformObserver;
    /**
     * Dispose of this TextmodeCanvas and clean up all resources.
     * This method is idempotent and safe to call multiple times.
     */
    $dispose(): void;
    get canvas(): HTMLCanvasElement;
    get width(): number;
    get height(): number;
}
