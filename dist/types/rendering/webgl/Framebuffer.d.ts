import { Framebuffer, type FramebufferOptions } from '../core/Framebuffer';
/**
 * WebGL implementation of the framebuffer abstraction.
 * Provides GPU-accelerated render targets with automatic texture creation.
 * Can also be used as a standalone texture (without render target functionality).
 */
export declare class GLFramebuffer extends Framebuffer {
    private _gl;
    private _framebuffer;
    private _texture;
    private _previousState;
    constructor(gl: WebGLRenderingContext, width: number, height?: number, options?: FramebufferOptions);
    /**
     * Execute a function with this framebuffer bound, then restore previous binding
     */
    private _withFramebufferBound;
    private _createTexture;
    private _updateTextureSize;
    private _attachTexture;
    /**
     * Update the framebuffer texture with canvas or video content
     */
    $update(source: HTMLCanvasElement | HTMLVideoElement): void;
    /**
     * Update the framebuffer texture with pixel data
     */
    updatePixels(pixelData: Uint8Array, width: number, height: number): void;
    /**
     * Resize the framebuffer
     */
    resize(width: number, height: number): void;
    /**
     * Begin rendering to this framebuffer
     */
    begin(): void;
    /**
     * End rendering to this framebuffer and restore previous state
     */
    end(): void;
    /**
     * Load pixel data from the framebuffer into the pixels array
     */
    loadPixels(): void;
    /**
     * Gets a pixel or a region of pixels from the framebuffer.
     *
     * The version of `get()` with no parameters returns pixel data for the entire framebuffer.
     * The version of `get()` with two parameters interprets them as coordinates and returns
     * an array with the `[R, G, B, A]` values of the pixel at the given point.
     * The version of `get()` with four parameters interprets them as coordinates and dimensions
     * and returns pixel data for the specified region.
     *
     * @param x x-coordinate of the pixel (optional)
     * @param y y-coordinate of the pixel (optional)
     * @param w width of the region (optional)
     * @param h height of the region (optional)
     * @returns Uint8Array for regions or number array for single pixel
     */
    get(): Uint8Array;
    get(x: number, y: number): [number, number, number, number];
    get(x: number, y: number, w: number, h: number): Uint8Array;
    /**
     * Dispose of WebGL resources used by this framebuffer.
     * This method is idempotent and safe to call multiple times.
     */
    $dispose(): void;
    get framebuffer(): WebGLFramebuffer | null;
    get texture(): WebGLTexture;
}
