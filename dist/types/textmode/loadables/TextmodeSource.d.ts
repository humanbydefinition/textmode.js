import type { GLRenderer } from '../../rendering/webgl/core/Renderer';
import type { Material } from '../../rendering/webgl/materials/Material';
import { TextmodeColor } from '../TextmodeColor';
import type { TextmodeFont } from './font/TextmodeFont';
import { type TextmodeConversionMode } from '../conversion';
type GlyphColor = [number, number, number];
/**
 * Base class for drawable textmode sources (images, videos, canvas, etc.).
 * Handles shared WebGL texture state, material creation, and color/character settings.
 */
export declare abstract class TextmodeSource {
    protected _gl: WebGL2RenderingContext;
    protected _renderer: GLRenderer;
    protected _texture: WebGLTexture;
    protected _originalWidth: number;
    protected _originalHeight: number;
    protected _width: number;
    protected _height: number;
    protected _material: Material | null;
    protected _font: TextmodeFont;
    protected _conversionMode: TextmodeConversionMode;
    private _cachedConversionStrategy;
    protected _invert: number;
    protected _flipX: number;
    protected _flipY: number;
    protected _charRotation: number;
    protected _charColorMode: 'sampled' | 'fixed';
    protected _cellColorMode: 'sampled' | 'fixed';
    protected _charColor: [number, number, number, number];
    protected _cellColor: [number, number, number, number];
    protected _backgroundColor: [number, number, number, number];
    protected _glyphColors: GlyphColor[];
    private _characterString;
    private _disposeListeners;
    private _colorFilterPalette;
    private _colorFilterSize;
    protected constructor(gl: WebGL2RenderingContext, renderer: GLRenderer, texture: WebGLTexture, font: TextmodeFont, originalWidth: number, originalHeight: number, width: number, height: number);
    /**
     * Select the conversion mode for this source.
     *
     * `textmode.js` includes only a single built-in conversion strategy `'brightness'`.
     *
     * Additional conversion strategies may be provided via add-on libraries.
     *
     * @param mode Conversion mode to use.
     */
    conversionMode(mode: TextmodeConversionMode): this;
    /**
     * Dispose of the underlying WebGL texture. Subclasses may extend for additional cleanup.
     * @ignore
     */
    $dispose(): void;
    /**
     * Register a callback to be invoked when this source is disposed.
     * @param callback The callback function to register
     * @ignore
     */
    $onDispose(callback: () => void): void;
    /**
     * Set the invert flag, swapping character and cell colors when enabled.
     * @param v Invert flag
     * @returns This instance for chaining.
     */
    invert(v?: boolean | number): this;
    /**
     * Set horizontal flip indicator flag.
     * @param v Flip flag
     * @returns This instance for chaining.
     */
    flipX(v?: boolean | number): this;
    /**
     * Set vertical flip indicator flag.
     * @param v Flip flag
     * @returns This instance for chaining.
     */
    flipY(v?: boolean | number): this;
    /**
     * Set the character rotation in degrees (0-360).
     * @param degrees Rotation in degrees
     * @returns This instance for chaining.
     */
    charRotation(degrees: number): this;
    /**
     * Set character color mode: `'sampled'` *(from source)* or `'fixed'`.
     * @param mode The character color mode
     * @returns This instance for chaining.
     */
    charColorMode(mode: 'sampled' | 'fixed'): this;
    /**
     * Set cell color mode: `'sampled'` *(from source)* or `'fixed'`.
     * @param mode The cell color mode
     * @returns This instance for chaining.
     */
    cellColorMode(mode: 'sampled' | 'fixed'): this;
    /**
     * Defines the character color when {@link charColorMode} is `'fixed'`.
     * @param colorOrGray A grayscale value (0-255), hex string ('#RGB', '#RRGGBB', '#RRGGBBAA'), or TextmodeColor instance
     * @param g Green component (0-255) if using RGB format
     * @param b Blue component (0-255) if using RGB format
     * @param a Alpha component (0-255) if using RGBA format
     * @returns This instance for chaining.
     */
    charColor(colorOrGray: number | string | TextmodeColor, g?: number, b?: number, a?: number): this;
    /**
     * Defines the cell color when {@link cellColorMode} is `'fixed'`.
     * @param colorOrGray A grayscale value (0-255), hex string ('#RGB', '#RRGGBB', '#RRGGBBAA'), or TextmodeColor instance
     * @param g Green component (0-255) if using RGB format
     * @param b Blue component (0-255) if using RGB format
     * @param a Alpha component (0-255) if using RGBA format
     * @returns This instance for chaining.
     */
    cellColor(colorOrGray: number | string | TextmodeColor, g?: number, b?: number, a?: number): this;
    /**
     * Defines the background color used for transparent pixels.
     * @param colorOrGray A grayscale value (0-255), hex string ('#RGB', '#RRGGBB', '#RRGGBBAA'), or TextmodeColor instance
     * @param g Green component (0-255) if using RGB format
     * @param b Blue component (0-255) if using RGB format
     * @param a Alpha component (0-255) if using RGBA format
     * @returns This instance for chaining.
     */
    background(colorOrGray: number | TextmodeColor | string, g?: number, b?: number, a?: number): this;
    /**
     * Applies an optional color filter palette before MRT conversion.
     * When a palette is provided, all sampled pixels are quantized to the closest palette color
     * prior to character/color analysis.
     *
     * @param palette A list of colors defined as {@link TextmodeColor} instances, hex strings, or RGBA tuples (0-255).
     * Providing an empty array or `null` disables the filter.
     */
    colorFilter(palette?: TextmodeColor[] | string[] | [number, number, number][] | [number, number, number, number][] | null): this;
    /**
     * Define the characters to use for brightness mapping as a string.
     * Maximum length is 255; excess characters are ignored.
     * @param chars String of characters to map
     * @returns This instance for chaining.
     */
    characters(chars: string): this;
    /**
     * Handle font change notification from the Textmodifier.
     * @param font The new font
     * @ignore
     */
    $handleFontChange(font: TextmodeFont): void;
    /** Return the WebGL texture currently backing this source. */
    get texture(): WebGLTexture;
    /** Ideal width in grid cells. */
    get width(): number;
    /** Ideal height in grid cells. */
    get height(): number;
    /** Original pixel width. */
    get originalWidth(): number;
    /** Original pixel height. */
    get originalHeight(): number;
    /**
     * Get or create the material for rendering this source.
     * @ignore
     */
    $getMaterial(): Material;
    /** Hook for subclasses to run logic before material updates (e.g., upload latest frame). */
    protected $beforeMaterialUpdate(): void;
    /** Subclasses must supply the active texture handle to bind as u_image. */
    protected abstract $getActiveTexture(): WebGLTexture;
    private _updateMaterial;
    private _setColor;
    private _applyCharacterPalette;
    /**
     * Create base conversion uniforms shared across all strategies.
     * @returns Uniforms object
     * @ignore
     */
    createBaseConversionUniforms(): Record<string, any>;
    private _getActiveConversionStrategy;
    private _createConversionContext;
}
export {};
