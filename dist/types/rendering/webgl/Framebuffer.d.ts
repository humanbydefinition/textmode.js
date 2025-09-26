import type { GLRenderer } from './Renderer';
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
 * Framebuffer class for managing offscreen rendering targets initialized via {@link Textmodifier.createFramebuffer}.
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
    private _renderer;
    private _isolatedState;
    private _stateForFBO;
    /**
     * Create a new GLFramebuffer instance.
     * @param gl WebGL2 rendering context
     * @param width Framebuffer width
     * @param height Framebuffer height
     * @param attachmentCount Number of color attachments
     * @param options Framebuffer options
     * @param renderer Optional GLRenderer instance for state management
     * @param isolatedState Optional flag to isolate framebuffer state from renderer
     * @ignore
     */
    constructor(gl: WebGL2RenderingContext, width: number, height?: number, attachmentCount?: number, options?: FramebufferOptions, renderer?: GLRenderer | null, isolatedState?: boolean);
    private _createTextures;
    private _attachTextures;
    /**
     * Update the framebuffer texture with canvas or video content
     * Note: Only updates the first attachment in multi-attachment mode
     * @ignore
     */
    $update(source: HTMLCanvasElement | HTMLVideoElement): void;
    /**
     * Resize the framebuffer.
     * @param width New width
     * @param height New height
     */
    resize(width: number, height: number): void;
    /**
     * Read pixels from a specific color attachment into an RGBA Uint8Array.
     * Rows are flipped to top-left origin to match row-major iteration in exporters.
     * @ignore
     */
    $readAttachment(attachmentIndex: number): Uint8Array;
    /**
     * Begin rendering to this framebuffer.
     */
    begin(): void;
    /**
     * End rendering to this framebuffer and restore previous state.
     */
    end(): void;
    /**
     * Dispose of WebGL resources used by this framebuffer.
     * This method is idempotent and safe to call multiple times.
     * @ignore
     */
    $dispose(): void;
    /** Get the current framebuffer width. */
    get width(): number;
    /** Get the current framebuffer height. */
    get height(): number;
    /**
     * Get all textures associated with this framebuffer.
     *
     * Useful for binding textures for reading in shaders.
     *
     * TextmodeFramebuffers have 5 attachments:
     * - 0: Character colors that encode the character to display via red and green channels
     * - 1: Character colors
     * - 2: Cell background colors
     * - 3: Rotation of each character encoded in red and green channels
     * - 4: Inversion, horizontal, and vertical flip flags encoded in red, green, blue channels
     *
     */
    get textures(): WebGLTexture[];
}
