/**
 * Common framebuffer configuration options
 */
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
 * Core interface that all framebuffer implementations must satisfy.
 * Defines the contract for render targets across different graphics APIs.
 * @ignore
 */
export interface IFramebuffer {
    /** Width of the framebuffer in pixels */
    readonly width: number;
    /** Height of the framebuffer in pixels */
    readonly height: number;
    /** Current pixel data *(if loaded)* */
    readonly pixels: Uint8Array | null;
    /**
     * Begin rendering to this framebuffer.
     * Saves current render state and sets this framebuffer as the active render target.
     */
    begin(): void;
    /**
     * End rendering to this framebuffer and restore previous render state.
     */
    end(): void;
    /**
     * Resize the framebuffer to new dimensions.
     * @param width New width in pixels
     * @param height New height in pixels
     */
    resize(width: number, height: number): void;
    /**
     * Update the framebuffer texture with media source content.
     * @param source Canvas or video element to copy from
     * @ignore
     */
    $update(source: HTMLCanvasElement | HTMLVideoElement): void;
    /**
     * Update the framebuffer texture with raw pixel data.
     * @param pixelData RGBA pixel data
     * @param width Width of the pixel data
     * @param height Height of the pixel data
     */
    updatePixels(pixelData: Uint8Array, width: number, height: number): void;
    /**
     * Load pixel data from the framebuffer into the pixels property.
     * This operation may be expensive and should be used sparingly.
     */
    loadPixels(): void;
    /**
     * Get pixel data from the framebuffer.
     * Overloaded to support different access patterns:
     * - No parameters: returns entire framebuffer as `Uint8Array`
     * - Two parameters `(x, y)`: returns single pixel as `RGBA` array
     * - Four parameters `(x, y, w, h)`: returns region as `Uint8Array`
     */
    get(): Uint8Array;
    get(x: number, y: number): [number, number, number, number];
    get(x: number, y: number, w: number, h: number): Uint8Array;
    /**
     * Dispose of resources used by this framebuffer.
     * After calling this method, the framebuffer should not be used.
     * @ignore
     */
    $dispose(): void;
}
/**
 * Abstract base class for framebuffer implementations.
 */
export declare abstract class Framebuffer implements IFramebuffer {
    protected _width: number;
    protected _height: number;
    protected _options: FramebufferOptions;
    protected _pixels: Uint8Array | null;
    /**
     * Creates an instance of the Framebuffer class.
     * @param width - The width of the framebuffer.
     * @param height - The height of the framebuffer.
     * @param options - Optional configuration options for the framebuffer.
     * @ignore
     */
    constructor(width: number, height?: number, options?: FramebufferOptions);
    get width(): number;
    get height(): number;
    get pixels(): Uint8Array | null;
    get options(): FramebufferOptions;
    /**
     * Validate and clamp coordinates to framebuffer bounds.
     * @param x X coordinate
     * @param y Y coordinate
     * @param showWarning Whether to show warning for out-of-bounds coordinates
     * @returns Clamped coordinates
     */
    protected validateCoordinates(x: number, y: number, showWarning?: boolean): [number, number];
    /**
     * Validate and clamp region bounds to framebuffer dimensions.
     * @param x X coordinate
     * @param y Y coordinate
     * @param w Width
     * @param h Height
     * @returns Clamped region bounds
     */
    protected validateRegion(x: number, y: number, w: number, h: number): [number, number, number, number];
    /**
     * Update internal dimensions and clear pixel cache.
     * Should be called by subclasses when resizing.
     * @param width New width
     * @param height New height
     */
    protected updateDimensions(width: number, height: number): void;
    abstract begin(): void;
    abstract end(): void;
    abstract resize(width: number, height: number): void;
    abstract $update(source: HTMLCanvasElement | HTMLVideoElement): void;
    abstract updatePixels(pixelData: Uint8Array, width: number, height: number): void;
    abstract loadPixels(): void;
    abstract get(): Uint8Array;
    abstract get(x: number, y: number): [number, number, number, number];
    abstract get(x: number, y: number, w: number, h: number): Uint8Array;
    abstract $dispose(): void;
}
/**
 * Default framebuffer options used when no options are specified.
 *
 * **Default values:**
 * - `filter`: `'nearest'` - Use nearest neighbor filtering for sharp pixels
 * - `wrap`: `'clamp'` - Clamp texture coordinates to edges
 * - `format`: `'rgba'` - Use RGBA color format with alpha channel
 * - `type`: `'unsigned_byte'` - Store color components as 8-bit unsigned integers *(0-255)*
 */
export declare const DEFAULT_FRAMEBUFFER_OPTIONS: FramebufferOptions;
