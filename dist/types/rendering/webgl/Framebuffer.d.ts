export type FramebufferOptions = {
    /** Texture filtering mode */
    filter?: 'nearest' | 'linear';
    /** Texture wrapping mode */
    wrap?: 'clamp' | 'repeat';
    /** Texture format */
    format?: 'rgba' | 'rgb';
    /** Data type for texture data */
    type?: 'unsigned_byte' | 'float';
};
/**
 * WebGL2 implementation of the framebuffer abstraction.
 * Provides GPU-accelerated render targets with automatic texture creation.
 * Supports both single-texture and Multiple Render Targets (MRT) functionality.
 * Can also be used as a standalone texture (without render target functionality).
 */
export declare class GLFramebuffer {
    protected _width: number;
    protected _height: number;
    protected _options: FramebufferOptions;
    protected _pixels: Uint8Array | null;
    private _gl;
    private _framebuffer;
    private _textures;
    private _attachmentCount;
    private _previousState;
    private _attachmentPixels;
    constructor(gl: WebGL2RenderingContext, width: number, height?: number, attachmentCount?: number, options?: FramebufferOptions);
    private _createTextures;
    private _attachTextures;
    /**
     * Update the framebuffer texture with canvas or video content
     * Note: Only updates the first attachment in multi-attachment mode
     */
    $update(source: HTMLCanvasElement | HTMLVideoElement): void;
    /**
     * Resize the framebuffer
     */
    $resize(width: number, height: number): void;
    /**
     * Read pixels from a specific color attachment into an RGBA Uint8Array.
     * Rows are flipped to top-left origin to match row-major iteration in exporters.
     */
    $readAttachment(attachmentIndex: number): Uint8Array;
    /** Read and cache all attachments. */
    $readAll(): void;
    /**
     * Begin rendering to this framebuffer
     */
    $begin(): void;
    /**
     * End rendering to this framebuffer and restore previous state
     */
    $end(): void;
    /**
     * Dispose of WebGL resources used by this framebuffer.
     * This method is idempotent and safe to call multiple times.
     */
    $dispose(): void;
    get width(): number;
    get height(): number;
    get pixels(): Uint8Array | null;
    get options(): FramebufferOptions;
    get framebuffer(): WebGLFramebuffer | null;
    get texture(): WebGLTexture;
    get textures(): WebGLTexture[];
    get attachmentCount(): number;
    /** Return a cached copy of pixels for an attachment if previously read, else null. */
    getAttachmentPixels(attachmentIndex: number): Uint8Array | null;
}
