import type { GLRenderer } from '../../rendering/webgl/core/Renderer';
import type { Material } from '../../rendering/webgl/materials/Material';
import { TextmodeColor } from '../color/TextmodeColor';
import type { TextmodeGlyphAtlas } from '../fonts/types';
import { Disposable } from '../../utils/Disposable';
import type { TextmodeConversionMode, TextmodeConversionManager } from '../conversion';
import type { RGB, RGBA } from '../../utils/color';
/**
 * Abstract base class representing a textmode source asset (image, video, texture).
 */
export declare abstract class TextmodeSource extends Disposable {
    protected _gl: WebGL2RenderingContext;
    protected _renderer: GLRenderer;
    protected _texture: WebGLTexture | null;
    protected _originalWidth: number;
    protected _originalHeight: number;
    protected _width: number;
    protected _height: number;
    protected _material: Material | null;
    protected _activeGlyphAtlas: TextmodeGlyphAtlas | null;
    protected _conversionMode: TextmodeConversionMode;
    private _cachedConversionStrategy;
    private _conversionManager;
    private _frameConversionMode;
    protected _invert: number;
    protected _flipX: number;
    protected _flipY: number;
    protected _charRotation: number;
    protected _charColorMode: 'sampled' | 'fixed';
    protected _cellColorMode: 'sampled' | 'fixed';
    private _frameInvert;
    private _frameFlipX;
    private _frameFlipY;
    private _frameCharRotation;
    private _frameCharColorMode;
    private _frameCellColorMode;
    protected _charColor: RGBA;
    protected _cellColor: RGBA;
    protected _backgroundColor: RGBA;
    protected _glyphColors: RGB[];
    private _characterString;
    private _frameCharColor;
    private _frameCellColor;
    private _frameBackgroundColor;
    private _frameGlyphColors;
    protected constructor(gl: WebGL2RenderingContext, renderer: GLRenderer, texture: WebGLTexture, conversionManager: TextmodeConversionManager, originalWidth: number, originalHeight: number, gridCols: number, gridRows: number);
    private _setFrameOrBaseColor;
    /**
     * Select the conversion mode for this source.
     *
     * `textmode.js` includes only a single built-in conversion strategy `'brightness'`.
     *
     * Additional conversion strategies may be provided via add-on libraries.
     *
     * @param mode Conversion mode to use.
     * @returns This instance for chaining.
     *
     * @example
     * {@includeCode ../../../examples/TextmodeSource/conversionMode/sketch.js}
     */
    conversionMode(mode: TextmodeConversionMode): this;
    /**
     * Dispose of the resource and free associated WebGL textures.
     *
     * This should be called when the resource is no longer needed to prevent memory leaks.
     * Resources created via {@link Textmodifier.loadImage}, {@link Textmodifier.loadVideo},
     * and {@link Textmodifier.createTexture} are automatically disposed when the
     * {@link Textmodifier} instance is destroyed, but you can call this manually to free memory earlier.
     *
     * @example
     * {@includeCode ../../../examples/TextmodeSource/dispose/sketch.js}
     */
    dispose(): void;
    /**
     * Set the invert flag, swapping character and cell colors when enabled.
     * @param v Invert flag
     * @returns This instance for chaining.
     *
     * @example
     * {@includeCode ../../../examples/TextmodeSource/invert/sketch.js}
     */
    invert(v?: boolean | number): this;
    /**
     * Set horizontal flip indicator flag.
     * @param v Flip flag
     * @returns This instance for chaining.
     *
     * @example
     * {@includeCode ../../../examples/TextmodeSource/flipX/sketch.js}
     */
    flipX(v?: boolean | number): this;
    /**
     * Set vertical flip indicator flag.
     * @param v Flip flag
     * @returns This instance for chaining.
     *
     * @example
     * {@includeCode ../../../examples/TextmodeSource/flipY/sketch.js}
     */
    flipY(v?: boolean | number): this;
    /**
     * Set the character rotation in degrees (0-360).
     * @param degrees Rotation in degrees
     * @returns This instance for chaining.
     *
     * @example
     * {@includeCode ../../../examples/TextmodeSource/charRotation/sketch.js}
     */
    charRotation(degrees: number): this;
    /**
     * Set character color mode: `'sampled'` *(from source)* or `'fixed'`.
     * @param mode The character color mode
     * @returns This instance for chaining.
     *
     * @example
     * {@includeCode ../../../examples/TextmodeSource/charColorMode/sketch.js}
     */
    charColorMode(mode: 'sampled' | 'fixed'): this;
    /**
     * Set cell color mode: `'sampled'` *(from source)* or `'fixed'`.
     * @param mode The cell color mode
     * @returns This instance for chaining.
     *
     * @example
     * {@includeCode ../../../examples/TextmodeSource/cellColorMode/sketch.js}
     */
    cellColorMode(mode: 'sampled' | 'fixed'): this;
    /**
     * Defines the character color when {@link charColorMode} is `'fixed'`.
     * @param colorOrGray A grayscale value (0-255), hex string ('#RGB', '#RRGGBB', '#RRGGBBAA'), or TextmodeColor instance
     * @param g Optional green component (0-255) if using RGB format, or alpha (0-255) when using grayscale form
     * @param b Optional blue component (0-255) if using RGB format
     * @param a Optional alpha component (0-255) if using RGBA format
     * @returns This instance for chaining.
     *
     * @example
     * {@includeCode ../../../examples/TextmodeSource/charColor/sketch.js}
     */
    charColor(colorOrGray: number | string | TextmodeColor, g?: number, b?: number, a?: number): this;
    /**
     * Defines the cell color when {@link cellColorMode} is `'fixed'`.
     * @param colorOrGray A grayscale value (0-255), hex string ('#RGB', '#RRGGBB', '#RRGGBBAA'), or TextmodeColor instance
     * @param g Optional green component (0-255) if using RGB format, or alpha (0-255) when using grayscale form
     * @param b Optional blue component (0-255) if using RGB format
     * @param a Optional alpha component (0-255) if using RGBA format
     * @returns This instance for chaining.
     *
     * @example
     * {@includeCode ../../../examples/TextmodeSource/cellColor/sketch.js}
     */
    cellColor(colorOrGray: number | string | TextmodeColor, g?: number, b?: number, a?: number): this;
    /**
     * Defines the background color used for transparent pixels.
     * @param colorOrGray A grayscale value (0-255), hex string ('#RGB', '#RRGGBB', '#RRGGBBAA'), or TextmodeColor instance
     * @param g Optional green component (0-255) if using RGB format, or alpha (0-255) when using grayscale form
     * @param b Optional blue component (0-255) if using RGB format
     * @param a Optional alpha component (0-255) if using RGBA format
     * @returns This instance for chaining.
     *
     * @example
     * {@includeCode ../../../examples/TextmodeSource/background/sketch.js}
     */
    background(colorOrGray: number | TextmodeColor | string, g?: number, b?: number, a?: number): this;
    /**
     * Define the characters to use for brightness mapping as a string.
     * Maximum length is 255; excess characters are ignored.
     * @param chars String of characters to map
     * @returns This instance for chaining.
     *
     * @example
     * {@includeCode ../../../examples/TextmodeSource/characters/sketch.js}
     */
    characters(chars: string): this;
    /**
     * Return the WebGL texture currently backing this source.
     *
     * @example
     * {@includeCode ../../../examples/TextmodeSource/texture/sketch.js}
     */
    get texture(): WebGLTexture;
    /**
     * Ideal width in grid cells.
     *
     * @example
     * {@includeCode ../../../examples/TextmodeSource/dimensions/sketch.js}
     */
    get width(): number;
    /**
     * Ideal height in grid cells.
     *
     * @example
     * {@includeCode ../../../examples/TextmodeSource/dimensions/sketch.js}
     */
    get height(): number;
    /**
     * Original pixel width.
     *
     * @example
     * {@includeCode ../../../examples/TextmodeSource/dimensions/sketch.js}
     */
    get originalWidth(): number;
    /**
     * Original pixel height.
     *
     * @example
     * {@includeCode ../../../examples/TextmodeSource/dimensions/sketch.js}
     */
    get originalHeight(): number;
    protected _beforeMaterialUpdate(): void;
    private _updateMaterial;
    private _createMaterial;
    private _setColor;
    private _applyCharacterPalette;
    private _getCharacterPalette;
    private _setIdealDimensions;
    _hasFrameOverrides(): boolean;
    private _getActiveConversionStrategy;
    private _setFrameColor;
    private _createConversionContext;
}
