import type { GLRenderer } from '../../rendering/webgl/core/Renderer';
import type { Material } from '../../rendering/webgl/materials/Material';
import { TextmodeColor } from '../color/TextmodeColor';
import type { TextmodeGlyphAtlas } from '../fonts/types';
import { Disposable } from '../../utils/Disposable';
import type { TextmodeConversionMode, TextmodeConversionStep, TextmodeConversionManager } from '../conversion';
import type { RGB, RGBA } from '../../utils/color';
/**
 * Shared base for textmode image, video, and dynamic texture sources.
 *
 * Source instances expose chainable conversion controls used before drawing with
 * {@link Textmodifier.image}.
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
    private _conversionStack;
    private _frameConversionStack;
    private _activeConversionStep;
    private _activeConversionPass;
    protected _invert: number;
    protected _flipX: number;
    protected _flipY: number;
    protected _charRotation: number;
    protected _brightnessStart: number;
    protected _brightnessEnd: number;
    protected _charColorMode: 'sampled' | 'fixed';
    protected _cellColorMode: 'sampled' | 'fixed';
    private _frameInvert;
    private _frameFlipX;
    private _frameFlipY;
    private _frameCharRotation;
    private _frameBrightnessStart;
    private _frameBrightnessEnd;
    private _frameCharColorMode;
    private _frameCellColorMode;
    protected _charColor: RGBA;
    protected _cellColor: RGBA;
    protected _backgroundColor: RGBA;
    protected _glyphColors: RGB[];
    private _glyphPaletteTexture;
    private _glyphPaletteDirty;
    private _characterString;
    private _frameCharColor;
    private _frameCellColor;
    private _frameBackgroundColor;
    private _frameGlyphColors;
    private _frameGlyphPaletteTexture;
    private _frameGlyphPaletteDirty;
    protected constructor(gl: WebGL2RenderingContext, renderer: GLRenderer, texture: WebGLTexture, conversionManager: TextmodeConversionManager, originalWidth: number, originalHeight: number, gridCols: number, gridRows: number);
    private _invalidateMaterials;
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
     * Set an ordered conversion stack for this source.
     *
     * Each step renders the same source with its own conversion mode and optional
     * overrides. Later steps are drawn on top of earlier steps.
     *
     * @param steps Ordered conversion passes to apply when this source is drawn.
     * @returns This instance for chaining.
     *
     * @example
     * {@includeCode ../../../examples/TextmodeSource/conversions/sketch.js}
     */
    conversions(steps: TextmodeConversionStep[]): this;
    /**
     * Clear this source's conversion stack and return to single-mode conversion.
     *
     * The active mode selected through {@link conversionMode} is preserved.
     *
     * @returns This instance for chaining.
     *
     * @example
     * {@includeCode ../../../examples/TextmodeSource/clearConversions/sketch.js}
     */
    clearConversions(): this;
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
     * Enable or disable source color inversion.
     * @param v Whether to invert colors.
     * @returns This instance for chaining.
     *
     * @example
     * {@includeCode ../../../examples/TextmodeSource/invert/sketch.js}
     */
    invert(v?: boolean | number): this;
    /**
     * Flip the source horizontally.
     * @param v Whether to flip horizontally.
     * @returns This instance for chaining.
     *
     * @example
     * {@includeCode ../../../examples/TextmodeSource/flipX/sketch.js}
     */
    flipX(v?: boolean | number): this;
    /**
     * Flip the source vertically.
     * @param v Whether to flip vertically.
     * @returns This instance for chaining.
     *
     * @example
     * {@includeCode ../../../examples/TextmodeSource/flipY/sketch.js}
     */
    flipY(v?: boolean | number): this;
    /**
     * Rotate generated characters.
     * @param degrees Rotation in degrees.
     * @returns This instance for chaining.
     *
     * @example
     * {@includeCode ../../../examples/TextmodeSource/charRotation/sketch.js}
     */
    charRotation(degrees: number): this;
    /**
     * Capture only source pixels whose brightness is inside the inclusive byte range.
     *
     * Pixels outside the range are discarded by the built-in brightness converter,
     * leaving the corresponding textmode cells transparent.
     *
     * @param start Minimum brightness to capture, from 0 (black) to 255 (white).
     * @param end Maximum brightness to capture, from 0 (black) to 255 (white).
     * @returns This instance for chaining.
     *
     * @example
     * {@includeCode ../../../examples/TextmodeSource/brightnessRange/sketch.js}
     */
    brightnessRange(start: number, end: number): this;
    /**
     * Set whether character color is sampled from the source or fixed.
     * @param mode Character color mode.
     * @returns This instance for chaining.
     *
     * @example
     * {@includeCode ../../../examples/TextmodeSource/charColorMode/sketch.js}
     */
    charColorMode(mode: 'sampled' | 'fixed'): this;
    /**
     * Set whether cell color is sampled from the source or fixed.
     * @param mode Cell color mode.
     * @returns This instance for chaining.
     *
     * @example
     * {@includeCode ../../../examples/TextmodeSource/cellColorMode/sketch.js}
     */
    cellColorMode(mode: 'sampled' | 'fixed'): this;
    /**
     * Set the character color used when {@link charColorMode} is `'fixed'`.
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
     * Set the cell color used when {@link cellColorMode} is `'fixed'`.
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
     * Set the background color used for transparent pixels.
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
     * Set the characters used for brightness mapping.
     * @param chars Characters to map from dark to bright.
     * @returns This instance for chaining.
     *
     * @example
     * {@includeCode ../../../examples/TextmodeSource/characters/sketch.js}
     */
    characters(chars: string): this;
    /**
     * WebGL texture backing this source.
     *
     * @example
     * {@includeCode ../../../examples/TextmodeSource/texture/sketch.js}
     */
    get texture(): WebGLTexture;
    /**
     * Ideal draw width in grid cells.
     *
     * @example
     * {@includeCode ../../../examples/TextmodeSource/width/sketch.js}
     */
    get width(): number;
    /**
     * Ideal draw height in grid cells.
     *
     * @example
     * {@includeCode ../../../examples/TextmodeSource/height/sketch.js}
     */
    get height(): number;
    /**
     * Original source width in pixels.
     *
     * @example
     * {@includeCode ../../../examples/TextmodeSource/originalWidth/sketch.js}
     */
    get originalWidth(): number;
    /**
     * Original source height in pixels.
     *
     * @example
     * {@includeCode ../../../examples/TextmodeSource/originalHeight/sketch.js}
     */
    get originalHeight(): number;
    protected _beforeMaterialUpdate(): void;
    private _updateMaterial;
    private _createMaterial;
    private _getConversionStepMaterial;
    private _normalizeConversionStep;
    private _assertColorMode;
    private _normalizeStepOptions;
    private _normalizeColorInput;
    private _normalizeBrightnessRange;
    private _setColor;
    private _applyCharacterPalette;
    private _refreshConversionStackPalettes;
    private _getCharacterPalette;
    private _getActiveConversionStack;
    private _hasFrameUniformOverrides;
    private _setIdealDimensions;
    private _getCharacterPaletteTexture;
    private _uploadCharacterPaletteTexture;
    private _createCharacterPaletteData;
    private _normalizedColorByte;
    private _disposeCharacterPaletteTexture;
    private _disposeConversionStack;
    private _getConversionStrategy;
    private _getActiveConversionStrategy;
    private _setFrameColor;
    private _createConversionContext;
}
