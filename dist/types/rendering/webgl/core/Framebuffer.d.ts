import { Disposable } from '../../../utils/Disposable';
export type FramebufferOptions = {
    /** Texture filtering mode */
    filter?: 'nearest' | 'linear';
    /** Texture wrapping mode */
    wrap?: 'clamp' | 'repeat';
    /** Data type for texture data */
    type?: 'unsigned_byte' | 'float';
    /** Enable depth buffer (defaults to true for 3D support) */
    depth?: boolean;
};
/**
 * Options for creating a framebuffer via {@link Textmodifier.createFramebuffer}. If not specified, width and height default to the current textmode grid size.
 *
 * @see {@link https://code.textmode.art/api/textmode.js/type-aliases/TextmodeFramebufferOptions | TextmodeFramebufferOptions API reference}
 */
export type TextmodeFramebufferOptions = {
    /**
     * Width of the framebuffer in grid cells
     *
     * @see {@link https://code.textmode.art/api/textmode.js/type-aliases/TextmodeFramebufferOptions#width | TextmodeFramebufferOptions.width API reference}
     */
    width?: number;
    /**
     * Height of the framebuffer in grid cells
     *
     * @see {@link https://code.textmode.art/api/textmode.js/type-aliases/TextmodeFramebufferOptions#height | TextmodeFramebufferOptions.height API reference}
     */
    height?: number;
    /**
     * Number of color attachments *(1-8)*
     *
     * Defaults to 3 for textmode framebuffers *(character/transform data, charColor, cellColor)*.
     * You probably do not want to go below 3 for textmode rendering, otherwise rendering will not function correctly.
     *
     * Going above 3 is only recommended for advanced use cases involving custom shaders that utilize additional attachments.
     *
     * @see {@link https://code.textmode.art/api/textmode.js/type-aliases/TextmodeFramebufferOptions#attachments | TextmodeFramebufferOptions.attachments API reference}
     */
    attachments?: number;
};
/**
 * Framebuffer class for managing offscreen rendering targets initialized via {@link Textmodifier.createFramebuffer}.
 *
 * `TextmodeFramebuffer` instances contain 3 attachments to support the rendering pipeline:
 * - Attachment 0: Character and transform data *(RGBA)*
 * - Attachment 1: charColor *(RGBA)*
 * - Attachment 2: cellColor *(RGBA)*
 *
 * @see {@link https://code.textmode.art/api/textmode.js/classes/TextmodeFramebuffer | TextmodeFramebuffer API reference}
 */
export declare class GLFramebuffer extends Disposable {
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
     *
     * @see {@link https://code.textmode.art/api/textmode.js/classes/TextmodeFramebuffer/methods/resize | TextmodeFramebuffer.resize API reference}
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
     *
     * @see {@link https://code.textmode.art/api/textmode.js/classes/TextmodeFramebuffer/methods/readPixels | TextmodeFramebuffer.readPixels API reference}
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
     *
     * @see {@link https://code.textmode.art/api/textmode.js/classes/TextmodeFramebuffer/methods/begin | TextmodeFramebuffer.begin API reference}
     */
    begin(): void;
    /**
     * Finish rendering into this framebuffer and restore the previous framebuffer.
     *
     * This flushes pending instance batches before restoring the previous framebuffer
     * and viewport state from the renderer stack.
     *
     * @example
     * {@includeCode ../../../../examples/TextmodeFramebuffer/end/sketch.js}
     *
     * @see {@link https://code.textmode.art/api/textmode.js/classes/TextmodeFramebuffer/methods/end | TextmodeFramebuffer.end API reference}
     */
    end(): void;
    /**
     * Dispose the framebuffer, attached textures, and optional depth renderbuffer.
     *
     * Call this when a custom framebuffer is no longer needed to release GPU resources early.
     *
     * @example
     * {@includeCode ../../../../examples/TextmodeFramebuffer/dispose/sketch.js}
     *
     * @see {@link https://code.textmode.art/api/textmode.js/classes/TextmodeFramebuffer/methods/dispose | TextmodeFramebuffer.dispose API reference}
     */
    dispose(): void;
    /**
     * Width of the framebuffer in pixels.
     *
     * @example
     * {@includeCode ../../../../examples/TextmodeFramebuffer/width/sketch.js}
     *
     * @see {@link https://code.textmode.art/api/textmode.js/classes/TextmodeFramebuffer/accessors/width | TextmodeFramebuffer.width API reference}
     */
    get width(): number;
    /**
     * Height of the framebuffer in pixels.
     *
     * @example
     * {@includeCode ../../../../examples/TextmodeFramebuffer/height/sketch.js}
     *
     * @see {@link https://code.textmode.art/api/textmode.js/classes/TextmodeFramebuffer/accessors/height | TextmodeFramebuffer.height API reference}
     */
    get height(): number;
    /**
     * The underlying WebGLFramebuffer handle.
     *
     * @example
     * {@includeCode ../../../../examples/TextmodeFramebuffer/framebuffer/sketch.js}
     *
     * @see {@link https://code.textmode.art/api/textmode.js/classes/TextmodeFramebuffer/accessors/framebuffer | TextmodeFramebuffer.framebuffer API reference}
     */
    get framebuffer(): WebGLFramebuffer | null;
    /**
     * The color attachment textures owned by this framebuffer.
     *
     * @example
     * {@includeCode ../../../../examples/TextmodeFramebuffer/textures/sketch.js}
     *
     * @see {@link https://code.textmode.art/api/textmode.js/classes/TextmodeFramebuffer/accessors/textures | TextmodeFramebuffer.textures API reference}
     */
    get textures(): WebGLTexture[];
    /**
     * Number of color attachments available on this framebuffer.
     *
     * @example
     * {@includeCode ../../../../examples/TextmodeFramebuffer/attachmentCount/sketch.js}
     *
     * @see {@link https://code.textmode.art/api/textmode.js/classes/TextmodeFramebuffer/accessors/attachmentCount | TextmodeFramebuffer.attachmentCount API reference}
     */
    get attachmentCount(): number;
}
