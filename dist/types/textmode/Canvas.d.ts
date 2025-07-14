/**
 * TextmodeCanvas is a utility class that creates an overlay canvas
 * for rendering textmode graphics on top of an existing HTML canvas.
 * @ignore
 */
export declare class TextmodeCanvas {
    private webglCanvas;
    private captureCanvas;
    constructor(captureCanvas: HTMLCanvasElement);
    private generateUniqueCanvasId;
    private createOverlayCanvas;
    private positionOverlayCanvas;
    resize(): void;
    /**
     * Get the WebGL context for the overlay canvas
     */
    getWebGLContext(): WebGL2RenderingContext | WebGLRenderingContext;
    get canvas(): HTMLCanvasElement;
    get width(): number;
    get height(): number;
}
