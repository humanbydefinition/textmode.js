import type { TextmodeOptions } from "./Textmodifier";
/**
 * Supported capture sources for textmode rendering
 */
export type CaptureSource = HTMLCanvasElement | HTMLVideoElement;
/**
 * TextmodeCanvas is a utility class that creates an overlay canvas
 * for rendering textmode graphics on top of an existing HTML canvas or video element,
 * or manages a standalone canvas for independent rendering.
 * @ignore
 */
export declare class TextmodeCanvas {
    private _canvas;
    private captureSource;
    private _isStandalone;
    constructor(captureSource: CaptureSource, isStandalone?: boolean, opts?: TextmodeOptions);
    private createCanvas;
    private positionOverlayCanvas;
    resize(width?: number, height?: number): void;
    /**
     * Get the WebGL context for the overlay canvas
     */
    getWebGLContext(): WebGL2RenderingContext | WebGLRenderingContext;
    get canvas(): HTMLCanvasElement;
    get width(): number;
    get height(): number;
}
