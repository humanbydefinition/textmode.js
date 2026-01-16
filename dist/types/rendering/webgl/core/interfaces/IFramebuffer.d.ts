/**
 * Interface for managing offscreen rendering targets (framebuffers).
 *
 * Framebuffers are used to render content offscreen, enabling effects like:
 * - Post-processing filters
 * - Multi-pass rendering
 * - Render-to-texture operations
 * - Double buffering
 *
 * Framebuffers in this system support Multiple Render Targets (MRT), allowing
 * multiple textures to be written simultaneously in a single render pass.
 */
export interface IFramebuffer {
    /**
     * Get the current framebuffer width in pixels/cells.
     */
    readonly width: number;
    /**
     * Get the current framebuffer height in pixels/cells.
     */
    readonly height: number;
    /**
     * Get all textures associated with this framebuffer.
     *
     * Useful for binding textures for reading in shaders.
     *
     * Textmode framebuffers allocate 4 attachments by default:
     * - 0: Character data encoded in red and green channels
     * - 1: Character colors
     * - 2: Cell background colors
     * - 3: Inversion, horizontal/flip flags, and rotation encoded in red, green, blue, alpha channels
     */
    readonly textures: WebGLTexture[];
    /**
     * Update the framebuffer texture with canvas or video content.
     * Note: Only updates the first attachment in multi-attachment mode.
     *
     * @param source - The HTML canvas or video element to copy from
     * @ignore
     */
    $update(source: HTMLCanvasElement | HTMLVideoElement): void;
    /**
     * Resize the framebuffer to new dimensions.
     * This recreates the internal textures with the new size and invalidates any cached pixel data.
     *
     * @param width - New width in pixels/cells
     * @param height - New height in pixels/cells
     */
    resize(width: number, height: number): void;
    /**
     * Read pixels from a specific color attachment into an RGBA Uint8Array.
     *
     * The returned pixel data:
     * - Is in RGBA format (4 bytes per pixel)
     * - Has top-left origin (first pixel is top-left corner)
     * - Is cached until the next render pass to this framebuffer
     *
     * @param attachmentIndex - The index of the color attachment to read (0-based)<br/>
     *                          0. Character data and transform info<br/>
     *                          1. Character colors<br/>
     *                          2. Cell background colors<br/>
     * @returns A Uint8Array containing the pixel data in RGBA format
     */
    readPixels(attachmentIndex: number): Uint8Array;
    /**
     * Begin drawing to this framebuffer.
     *
     * This method:
     * - Flushes any pending draw calls to maintain proper render order
     * - Saves the current framebuffer and viewport state
     * - Binds this framebuffer as the render target
     * - Clears all color attachments to transparent black
     * - Sets the viewport to match the framebuffer dimensions
     *
     * All subsequent drawing operations will target this framebuffer until {@link end} is called.
     */
    begin(): void;
    /**
     * End rendering to this framebuffer and restore previous state.
     *
     * This method:
     * - Flushes any pending draw calls into this framebuffer
     * - Restores the previously bound framebuffer
     * - Restores the previous viewport settings
     *
     * After calling this method, rendering operations will target the previously active framebuffer.
     */
    end(): void;
    /**
     * Dispose of WebGL resources used by this framebuffer.
     *
     * This method is idempotent and safe to call multiple times.
     * After disposal, the framebuffer should not be used for rendering.
     */
    dispose(): void;
}
