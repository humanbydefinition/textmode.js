import type { GLRenderer } from '../rendering/webgl/Renderer';
/**
 * Consolidated render data for TextmodeImage
 */
export interface TextmodeImageRenderData {
    texture: WebGLTexture;
    invert: number;
    flipX: number;
    flipY: number;
    charRotation: [number, number];
    charColorFixed: boolean;
    charColor: [number, number, number, number];
    cellColorFixed: boolean;
    cellColor: [number, number, number, number];
    backgroundColor: [number, number, number, number];
    charCount: number;
    charList: number[][];
}
/**
 * Represents an image uploaded for textmode rendering via {@link Textmodifier.loadImage}.
 *
 * It can be drawn to the canvas via {@link Textmodifier.image}.
 *
 * An image uploaded currently runs through an adjustable brightness-converter that converts
 * the original image into a textmode representation using characters.
 * Those adjustable options are available via chainable methods on this class.
 */
export declare class TextmodeImage {
    /**
     * Underlying WebGL texture handle.
     */
    private _texture;
    /** Original pixel dimensions of the source image. */
    private _width;
    private _height;
    private _gl;
    private _invert;
    private _flipX;
    private _flipY;
    private _charRotation;
    private _charColorMode;
    private _cellColorMode;
    private _charColor;
    private _cellColor;
    private _backgroundColor;
    private _glyphColors;
    private _glyphColorResolver;
    /**
     * Create a new TextmodeImage instance.
     * @param gl WebGL2 rendering context
     * @param texture WebGL texture containing the image
     * @param width Original image width in pixels
     * @param height Original image height in pixels
     *
     * @ignore
     */
    constructor(gl: WebGL2RenderingContext, texture: WebGLTexture, width: number, height: number);
    /**
     * Dispose of GPU resources.
     * @ignore
     */
    $dispose(): void;
    /** Normalize boolean | number to 0/1 */
    private _to01;
    /**
     * Set the invert flag.
     *
     * Setting this flag to `true` will swap the character and cell colors when rendering the image.
     *
     * @param v Flag value
     * @returns This instance for chaining.
     */
    invert(v?: boolean | number): this;
    /**
     * Set horizontal flip indicator flag.
     * @param v Flag value
     * @returns This instance for chaining.
     */
    flipX(v?: boolean | number): this;
    /**
     * Set vertical flip indicator flag.
     * @param v Flag value
     * @returns This instance for chaining.
     */
    flipY(v?: boolean | number): this;
    /**
     * Set the character rotation in degrees.
     * @param degrees Rotation in degrees *(0-360)*
     * @returns This instance for chaining.
     */
    charRotation(degrees: number): this;
    /**
     * Get all render data needed by the GLRenderer.
     * @ignore
     */
    $getRenderData(): TextmodeImageRenderData;
    /**
     * Set character color mode: `'sampled'` *(from image)* or `'fixed'` *(use {@link charColor})*.
     * @param mode
     * @returns
     */
    charColorMode(mode: 'sampled' | 'fixed'): this;
    /**
     * Set the cell color mode: `'sampled'` *(from image)* or `'fixed'` *(use {@link cellColor})*.
     * @param mode
     * @returns
     */
    cellColorMode(mode: 'sampled' | 'fixed'): this;
    /**
     * Defines the character color used when {@link charColorMode} is `'fixed'`.
     * @param r Red channel (0-255)
     * @param g Green channel (0-255)
     * @param b Blue channel (0-255)
     * @returns This instance for chaining.
     */
    charColor(r: number, g?: number, b?: number, a?: number): this;
    /**
     * Defines the cell color used when {@link cellColorMode} is `'fixed'`.
     * @param r Red channel (0-255)
     * @param g Green channel (0-255)
     * @param b Blue channel (0-255)
     * @returns This instance for chaining.
     */
    cellColor(r: number, g?: number, b?: number, a?: number): this;
    /**
     * Set background color for transparent pixels.
     * @param r Red channel (0-255)
     * @param g Green channel (0-255)
     * @param b Blue channel (0-255)
     * @param a Alpha channel (0-255)
     * @returns This instance for chaining.
     */
    background(r: number, g?: number, b?: number, a?: number): this;
    /**
     * Define the characters to use for brightness mapping as a string.
     *
     * The maximum number of characters for brightness mapping currently is `64`; excess characters are ignored.
     *
     * @param chars
     * @returns
     */
    characters(chars: string): this;
    /**
     * Create a TextmodeImage from an HTML image/video/canvas element.
     * Texture parameters use NEAREST and CLAMP to align with grid sampling.
     * @ignore
     */
    static $fromSource(renderer: GLRenderer, source: HTMLImageElement | HTMLCanvasElement | HTMLVideoElement, glyphResolver: (s: string) => ([number, number, number])[]): TextmodeImage;
    /**
     * WebGL texture handle containing the original source image.
     */
    get texture(): WebGLTexture;
    /**
     * Original pixel width of the source image.
     */
    get width(): number;
    /**
     * Original pixel height of the source image.
     */
    get height(): number;
}
