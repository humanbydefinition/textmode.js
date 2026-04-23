import type { IFramebuffer } from './interfaces/IFramebuffer';
import { Disposable } from '../../../utils/Disposable';
export type FramebufferOptions = {
    /** Texture filtering mode */
    filter?: 'nearest' | 'linear';
    /** Texture wrapping mode */
    wrap?: 'clamp' | 'repeat';
    /** Texture format */
    format?: 'rgba' | 'rgb';
    /** Data type for texture data */
    type?: 'unsigned_byte' | 'float';
    /** Enable depth buffer (defaults to true for 3D support) */
    depth?: boolean;
};
/**
 * Options for creating a framebuffer via {@link Textmodifier.createFramebuffer}. If not specified, width and height default to the current textmode grid size.
 */
export type TextmodeFramebufferOptions = {
    /** Width of the framebuffer in grid cells */
    width?: number;
    /** Height of the framebuffer in grid cells */
    height?: number;
    /**
     * Number of color attachments *(1-8)*
     *
     * Defaults to 3 for textmode framebuffers *(character/transform data, primary color, secondary color)*.
     * You probably do not want to go below 3 for textmode rendering, otherwise rendering will not function correctly.
     *
     * Going above 3 is only recommended for advanced use cases involving custom shaders that utilize additional attachments.
     */
    attachments?: number;
};
/**
 * Framebuffer class for managing offscreen rendering targets initialized via {@link Textmodifier.createFramebuffer}.
 *
 * `TextmodeFramebuffer` instances contain 3 attachments to support the rendering pipeline:
 * - Attachment 0: Character and transform data *(RGBA)*
 * - Attachment 1: Primary color data *(RGBA)*
 * - Attachment 2: Secondary color data *(RGBA)*
 */
export declare class GLFramebuffer extends Disposable implements IFramebuffer {
    protected _width: number;
    protected _height: number;
    protected _options: FramebufferOptions;
    private _gl;
    private _framebuffer;
    private _textures;
    private _depthRenderbuffer;
    private _attachmentCount;
    private _renderer;
    private _material;
    private _pixelCache;
    private _createTextures;
    private _updateTextureStorage;
    private _attachTextures;
    private _createDepthRenderbuffer;
    private _updateDepthStorage;
    _update(source: HTMLCanvasElement | HTMLVideoElement): void;
    /**
     * Resize the framebuffer and all attached textures.
     *
     * Existing pixel cache entries are cleared, and the optional depth renderbuffer
     * is resized to match the new dimensions.
     *
     * @param width New framebuffer width in grid cells.
     * @param height New framebuffer height in grid cells.
     *
     * @example
     * {@includeCode ../../../../examples/TextmodeFramebuffer/resize/sketch.js}
     */
    resize(width: number, height: number): void;
    /**
     * Read RGBA pixel data from one attachment.
     *
     * The returned data is vertically flipped so the first row matches the top row
     * of the framebuffer when used from JavaScript.
     *
     * @param attachmentIndex Zero-based attachment index to read.
     * @returns RGBA pixel data for the selected attachment.
     *
     * @example
     * {@includeCode ../../../../examples/TextmodeFramebuffer/readPixels/sketch.js}
     */
    readPixels(attachmentIndex: number): Uint8Array;
    /**
     * Begin rendering into this framebuffer.
     *
     * This binds the framebuffer, updates the viewport, clears any cached pixel reads,
     * and pushes renderer state so drawing commands are isolated from the previous target.
     *
     * @example
     * {@includeCode ../../../../examples/TextmodeFramebuffer/begin/sketch.js}
     */
    begin(): void;
    /**
     * Finish rendering into this framebuffer and restore the previous render target.
     *
     * This flushes pending instance batches before restoring the previous framebuffer
     * and viewport state from the renderer stack.
     *
     * @example
     * {@includeCode ../../../../examples/TextmodeFramebuffer/end/sketch.js}
     */
    end(): void;
    /**
     * Dispose the framebuffer, attached textures, and optional depth renderbuffer.
     *
     * Call this when a custom framebuffer is no longer needed to release GPU resources early.
     *
     * @example
     * {@includeCode ../../../../examples/TextmodeFramebuffer/dispose/sketch.js}
     */
    dispose(): void;
    /**
     * Width of the framebuffer in pixels.
     *
     * @example
     * {@includeCode ../../../../examples/TextmodeFramebuffer/framebuffer/sketch.js}
     */
    get width(): number;
    /**
     * Height of the framebuffer in pixels.
     *
     * @example
     * {@includeCode ../../../../examples/TextmodeFramebuffer/framebuffer/sketch.js}
     */
    get height(): number;
    /**
     * The underlying WebGLFramebuffer handle.
     *
     * @example
     * {@includeCode ../../../../examples/TextmodeFramebuffer/framebuffer/sketch.js}
     */
    get framebuffer(): WebGLFramebuffer | null;
    /**
     * The color attachment textures owned by this framebuffer.
     *
     * @example
     * {@includeCode ../../../../examples/TextmodeFramebuffer/framebuffer/sketch.js}
     */
    get textures(): WebGLTexture[];
    /**
     * Number of color attachments available on this framebuffer.
     *
     * @example
     * {@includeCode ../../../../examples/TextmodeFramebuffer/framebuffer/sketch.js}
     */
    get attachmentCount(): number;
}
