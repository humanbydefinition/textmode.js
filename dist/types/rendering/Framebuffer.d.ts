export interface FramebufferOptions {
    filter?: 'nearest' | 'linear';
    wrap?: 'clamp' | 'repeat';
    format?: 'rgba' | 'rgb';
    type?: 'unsigned_byte' | 'float';
}
/**
 * Wrapper for WebGL framebuffer with automatic texture creation.
 * Can also be used as a standalone texture (without render target functionality).
 */
export declare class Framebuffer {
    private gl;
    private _framebuffer;
    private _texture;
    private _width;
    private _height;
    private options;
    private previousFramebuffer;
    private previousViewport;
    constructor(gl: WebGLRenderingContext, width: number, height?: number, options?: FramebufferOptions);
    private createTexture;
    private attachTexture;
    /**
     * Update the framebuffer texture with canvas content
     */
    update(canvas: HTMLCanvasElement): void;
    /**
     * Resize the framebuffer
     */
    resize(width: number, height: number): void;
    /**
     * Begin rendering to this framebuffer (p5.js-like API)
     */
    begin(): void;
    /**
     * End rendering to this framebuffer and restore previous state (p5.js-like API)
     */
    end(): void;
    /**
     * Bind this framebuffer for rendering
     */
    bind(): void;
    get framebuffer(): WebGLFramebuffer | null;
    get texture(): WebGLTexture;
    get width(): number;
    get height(): number;
}
