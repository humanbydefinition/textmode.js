import type { GLRenderer } from '../../rendering/webgl/core/Renderer';
import { Disposable } from '../../utils/Disposable';
import { TextmodeColor, type TextmodeColorResolver } from '../color/TextmodeColor';
import type { TextmodeConversionManager, TextmodeConversionMode, TextmodeConversionStep } from '../conversion';
/**
 * Shared base for image, video, and dynamic texture sources drawn with {@link Textmodifier.image}.
 *
 * @see {@link https://code.textmode.art/api/textmode.js/namespaces/media/classes/TextmodeSource | media.TextmodeSource API reference}
 */
export declare abstract class TextmodeSource extends Disposable {
    protected _gl: WebGL2RenderingContext;
    protected _renderer: GLRenderer;
    protected _texture: WebGLTexture | null;
    protected _originalWidth: number;
    protected _originalHeight: number;
    protected _width: number;
    protected _height: number;
    private readonly _paletteCache;
    private readonly _sourceState;
    private readonly _stackState;
    private readonly _materialFactory;
    protected constructor(gl: WebGL2RenderingContext, renderer: GLRenderer, texture: WebGLTexture, conversionManager: TextmodeConversionManager, originalWidth: number, originalHeight: number, gridCols: number, gridRows: number, resolveColor?: TextmodeColorResolver);
    /**
     * Select the conversion mode for this source.
     *
     * @param mode Conversion mode to use.
     * @returns This instance for chaining.
     *
     * @example
     * {@includeCode ../../../examples/TextmodeSource/conversionMode/sketch.js}
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/media/classes/TextmodeSource/methods/conversionMode | media.TextmodeSource.conversionMode API reference}
     */
    conversionMode(mode: TextmodeConversionMode): this;
    /**
     * Set an ordered conversion stack for this source.
     *
     * @param steps Ordered conversion passes to apply when this source is drawn.
     * @returns This instance for chaining.
     *
     * @example
     * {@includeCode ../../../examples/TextmodeSource/conversions/sketch.js}
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/media/classes/TextmodeSource/methods/conversions | media.TextmodeSource.conversions API reference}
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
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/media/classes/TextmodeSource/methods/clearConversions | media.TextmodeSource.clearConversions API reference}
     */
    clearConversions(): this;
    /**
     * Dispose of the resource and free associated WebGL textures.
     *
     * @example
     * {@includeCode ../../../examples/TextmodeSource/dispose/sketch.js}
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/media/classes/TextmodeSource/methods/dispose | media.TextmodeSource.dispose API reference}
     */
    dispose(): void;
    /**
     * Enable or disable source color inversion.
     * @param v Whether to invert colors.
     * @returns This instance for chaining.
     *
     * @example
     * {@includeCode ../../../examples/TextmodeSource/invert/sketch.js}
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/media/classes/TextmodeSource/methods/invert | media.TextmodeSource.invert API reference}
     */
    invert(v?: boolean | number): this;
    /**
     * Flip the source horizontally.
     * @param v Whether to flip horizontally.
     * @returns This instance for chaining.
     *
     * @example
     * {@includeCode ../../../examples/TextmodeSource/flipX/sketch.js}
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/media/classes/TextmodeSource/methods/flipX | media.TextmodeSource.flipX API reference}
     */
    flipX(v?: boolean | number): this;
    /**
     * Flip the source vertically.
     * @param v Whether to flip vertically.
     * @returns This instance for chaining.
     *
     * @example
     * {@includeCode ../../../examples/TextmodeSource/flipY/sketch.js}
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/media/classes/TextmodeSource/methods/flipY | media.TextmodeSource.flipY API reference}
     */
    flipY(v?: boolean | number): this;
    /**
     * Rotate generated characters.
     * @param degrees Rotation in degrees.
     * @returns This instance for chaining.
     *
     * @example
     * {@includeCode ../../../examples/TextmodeSource/charRotation/sketch.js}
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/media/classes/TextmodeSource/methods/charRotation | media.TextmodeSource.charRotation API reference}
     */
    charRotation(degrees: number): this;
    /**
     * Capture only source pixels whose brightness is inside the inclusive byte range.
     *
     * @param start Minimum brightness to capture, from 0 (black) to 255 (white).
     * @param end Maximum brightness to capture, from 0 (black) to 255 (white).
     * @returns This instance for chaining.
     *
     * @example
     * {@includeCode ../../../examples/TextmodeSource/brightnessRange/sketch.js}
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/media/classes/TextmodeSource/methods/brightnessRange | media.TextmodeSource.brightnessRange API reference}
     */
    brightnessRange(start: number, end: number): this;
    /**
     * Set whether character color is sampled from the source or fixed.
     * @param mode Character color mode.
     * @returns This instance for chaining.
     *
     * @example
     * {@includeCode ../../../examples/TextmodeSource/charColorMode/sketch.js}
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/media/classes/TextmodeSource/methods/charColorMode | media.TextmodeSource.charColorMode API reference}
     */
    charColorMode(mode: 'sampled' | 'fixed'): this;
    /**
     * Set whether cell color is sampled from the source or fixed.
     * @param mode Cell color mode.
     * @returns This instance for chaining.
     *
     * @example
     * {@includeCode ../../../examples/TextmodeSource/cellColorMode/sketch.js}
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/media/classes/TextmodeSource/methods/cellColorMode | media.TextmodeSource.cellColorMode API reference}
     */
    cellColorMode(mode: 'sampled' | 'fixed'): this;
    /**
     * Set the character color used when {@link charColorMode} is `'fixed'`.
     * @param colorOrGray A grayscale value (0-255), hex string ('#RGB', '#RRGGBB', '#RRGGBBAA'), or TextmodeColor instance
     * @param g Optional green component, or alpha when using grayscale form.
     * @param b Optional blue component.
     * @param a Optional alpha component.
     * @returns This instance for chaining.
     *
     * @example
     * {@includeCode ../../../examples/TextmodeSource/charColor/sketch.js}
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/media/classes/TextmodeSource/methods/charColor | media.TextmodeSource.charColor API reference}
     */
    charColor(colorOrGray: number | string | TextmodeColor, g?: number, b?: number, a?: number): this;
    /**
     * Set the cell color used when {@link cellColorMode} is `'fixed'`.
     * @param colorOrGray A grayscale value (0-255), hex string ('#RGB', '#RRGGBB', '#RRGGBBAA'), or TextmodeColor instance
     * @param g Optional green component, or alpha when using grayscale form.
     * @param b Optional blue component.
     * @param a Optional alpha component.
     * @returns This instance for chaining.
     *
     * @example
     * {@includeCode ../../../examples/TextmodeSource/cellColor/sketch.js}
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/media/classes/TextmodeSource/methods/cellColor | media.TextmodeSource.cellColor API reference}
     */
    cellColor(colorOrGray: number | string | TextmodeColor, g?: number, b?: number, a?: number): this;
    /**
     * Set the background color used for transparent pixels.
     * @param colorOrGray A grayscale value (0-255), hex string ('#RGB', '#RRGGBB', '#RRGGBBAA'), or TextmodeColor instance
     * @param g Optional green component, or alpha when using grayscale form.
     * @param b Optional blue component.
     * @param a Optional alpha component.
     * @returns This instance for chaining.
     *
     * @example
     * {@includeCode ../../../examples/TextmodeSource/background/sketch.js}
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/media/classes/TextmodeSource/methods/background | media.TextmodeSource.background API reference}
     */
    background(colorOrGray: number | TextmodeColor | string, g?: number, b?: number, a?: number): this;
    /**
     * Set the characters used for brightness mapping.
     * @param chars Characters to map from dark to bright.
     * @returns This instance for chaining.
     *
     * @example
     * {@includeCode ../../../examples/TextmodeSource/characters/sketch.js}
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/media/classes/TextmodeSource/methods/characters | media.TextmodeSource.characters API reference}
     */
    characters(chars: string): this;
    /**
     * WebGL texture backing this source.
     *
     * @example
     * {@includeCode ../../../examples/TextmodeSource/texture/sketch.js}
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/media/classes/TextmodeSource/accessors/texture | media.TextmodeSource.texture API reference}
     */
    get texture(): WebGLTexture;
    /**
     * Ideal draw width in grid cells.
     *
     * @example
     * {@includeCode ../../../examples/TextmodeSource/width/sketch.js}
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/media/classes/TextmodeSource/accessors/width | media.TextmodeSource.width API reference}
     */
    get width(): number;
    /**
     * Ideal draw height in grid cells.
     *
     * @example
     * {@includeCode ../../../examples/TextmodeSource/height/sketch.js}
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/media/classes/TextmodeSource/accessors/height | media.TextmodeSource.height API reference}
     */
    get height(): number;
    /**
     * Original source width in pixels.
     *
     * @example
     * {@includeCode ../../../examples/TextmodeSource/originalWidth/sketch.js}
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/media/classes/TextmodeSource/accessors/originalWidth | media.TextmodeSource.originalWidth API reference}
     */
    get originalWidth(): number;
    /**
     * Original source height in pixels.
     *
     * @example
     * {@includeCode ../../../examples/TextmodeSource/originalHeight/sketch.js}
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/media/classes/TextmodeSource/accessors/originalHeight | media.TextmodeSource.originalHeight API reference}
     */
    get originalHeight(): number;
    private _setIdealDimensions;
    private _setColor;
    private _invalidateBaseMaterials;
    private _isRenderingFrame;
    private _assertBrightnessRange;
}
