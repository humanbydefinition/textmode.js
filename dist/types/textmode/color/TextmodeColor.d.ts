import type { TextmodeColorTuple } from '../../utils/color';
/**
 * Color value used by textmode drawing APIs.
 *
 * Values are stored as `0-255` integers for compatibility with public APIs.
 * Normalized versions are also available for shader uploads.
 *
 * Use {@link Textmodifier.color} to create colors.
 *
 * @example
 * {@includeCode ../../../examples/TextmodeColor/creation/sketch.js}
 *
 * @see {@link https://code.textmode.art/api/textmode.js/namespaces/color/classes/TextmodeColor | color.TextmodeColor API reference}
 */
export declare class TextmodeColor {
    private _rgba?;
    private _normalized?;
    /**
     * Red component (0-255).
     *
     * @example
     * {@includeCode ../../../examples/TextmodeColor/r/sketch.js}
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/color/classes/TextmodeColor/properties/r | color.TextmodeColor.r API reference}
     */
    readonly r: number;
    /**
     * Green component (0-255).
     *
     * @example
     * {@includeCode ../../../examples/TextmodeColor/g/sketch.js}
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/color/classes/TextmodeColor/properties/g | color.TextmodeColor.g API reference}
     */
    readonly g: number;
    /**
     * Blue component (0-255).
     *
     * @example
     * {@includeCode ../../../examples/TextmodeColor/b/sketch.js}
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/color/classes/TextmodeColor/properties/b | color.TextmodeColor.b API reference}
     */
    readonly b: number;
    /**
     * Alpha component (0-255).
     *
     * @example
     * {@includeCode ../../../examples/TextmodeColor/a/sketch.js}
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/color/classes/TextmodeColor/properties/a | color.TextmodeColor.a API reference}
     */
    readonly a: number;
    private constructor();
    /**
     * Plain RGB tuple with integer components.
     *
     * @returns A [r, g, b] tuple with values between 0 and 255.
     *
     * @example
     * {@includeCode ../../../examples/TextmodeColor/rgb/sketch.js}
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/color/classes/TextmodeColor/accessors/rgb | color.TextmodeColor.rgb API reference}
     */
    get rgb(): [number, number, number];
    /**
     * Plain RGBA tuple with integer components.
     *
     * @returns A [r, g, b, a] tuple with values between 0 and 255.
     *
     * @example
     * {@includeCode ../../../examples/TextmodeColor/rgba/sketch.js}
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/color/classes/TextmodeColor/accessors/rgba | color.TextmodeColor.rgba API reference}
     */
    get rgba(): [number, number, number, number];
    /**
     * Normalized *(0-1)* RGBA tuple.
     *
     * Useful for passing color data to WebGL shaders.
     *
     * @returns A [r, g, b, a] tuple where each component is between 0.0 and 1.0.
     *
     * @example
     * {@includeCode ../../../examples/TextmodeColor/normalized/sketch.js}
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/color/classes/TextmodeColor/accessors/normalized | color.TextmodeColor.normalized API reference}
     */
    get normalized(): [number, number, number, number];
    /**
     * Create a copy of this color with a different alpha value.
     *
     * Useful for creating semi-transparent variations of existing colors without
     * manually copying RGB components.
     *
     * @param alpha The new alpha value (0-255). Values outside this range will be clamped.
     * @returns A new TextmodeColor instance with the updated alpha.
     *
     * @example
     * {@includeCode ../../../examples/TextmodeColor/withAlpha/sketch.js}
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/color/classes/TextmodeColor/methods/withAlpha | color.TextmodeColor.withAlpha API reference}
     */
    withAlpha(alpha: number): TextmodeColor;
}
/**
 * Function shape used to resolve color API inputs into immutable color values.
 * @ignore
 */
export type TextmodeColorResolver = (value: TextmodeColor | string | number | TextmodeColorTuple, g?: number, b?: number, a?: number) => TextmodeColor;
