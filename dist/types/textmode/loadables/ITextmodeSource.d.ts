import type { Material } from '../../rendering/webgl/materials/Material';
import type { TextmodeConversionMode } from '../conversion';
import type { TextmodeColor } from '../TextmodeColor';
import type { TextmodeFont } from './font/TextmodeFont';
/**
 * Base interface for drawable textmode sources (images, videos, canvas, etc.).
 * Handles shared WebGL texture state, material creation, and color/character settings.
 */
export interface ITextmodeSource {
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
     * Define the characters to use for brightness mapping as a string.
     * Maximum length is 255; excess characters are ignored.
     * @param chars String of characters to map
     * @returns This instance for chaining.
     */
    characters(chars: string): this;
    /**
     * Set the active font for the current render pass.
     * Called by the renderer before getMaterial() to ensure the source uses the correct layer's font.
     * @param font The font to use for this render
     * @ignore
     */
    $setActiveFont(font: TextmodeFont): void;
    /** Return the WebGL texture currently backing this source. */
    readonly texture: WebGLTexture;
    /** Ideal width in grid cells. */
    readonly width: number;
    /** Ideal height in grid cells. */
    readonly height: number;
    /** Original pixel width. */
    readonly originalWidth: number;
    /** Original pixel height. */
    readonly originalHeight: number;
    /**
     * Get or create the material for rendering this source.
     * @ignore
     */
    $getMaterial(): Material;
    /**
     * Create base conversion uniforms shared across all strategies.
     * @returns Uniforms object
     * @ignore
     */
    createBaseConversionUniforms(): Record<string, any>;
}
