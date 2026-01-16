import type { GLRenderer } from './Renderer';
import type { Material } from '../materials/Material';
import type { IFramebuffer } from './interfaces/IFramebuffer';
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
 * Options for creating a framebuffer. If not specified, width and height default to the current textmode grid size.
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
export declare class GLFramebuffer implements IFramebuffer {
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
    private static _copyShader;
    /**
     * Create a new GLFramebuffer instance.
     * @param gl WebGL2 rendering context
     * @param width Framebuffer width
     * @param height Framebuffer height
     * @param attachmentCount Number of color attachments
     * @param options Framebuffer options
     * @param renderer Optional GLRenderer instance for state management
     * @ignore
     */
    constructor(gl: WebGL2RenderingContext, width: number, height: number | undefined, attachmentCount: number | undefined, options: FramebufferOptions | undefined, renderer: GLRenderer);
    private _createTextures;
    private _attachTextures;
    private _createDepthRenderbuffer;
    $update(source: HTMLCanvasElement | HTMLVideoElement): void;
    resize(width: number, height: number): void;
    readPixels(attachmentIndex: number): Uint8Array;
    begin(): void;
    end(): void;
    /**
     * Get or create the material for rendering this framebuffer.
     * @ignore
     */
    $getMaterial(): Material;
    /**
     * Update the material with current framebuffer textures.
     * @ignore
     */
    private _updateMaterial;
    dispose(): void;
    /** Get the width of the framebuffer */
    get width(): number;
    /** Get the height of the framebuffer */
    get height(): number;
    /** Get the WebGL textures associated with this framebuffer */
    get textures(): WebGLTexture[];
    /** Get the number of color attachments in this framebuffer */
    get attachmentCount(): number;
}
