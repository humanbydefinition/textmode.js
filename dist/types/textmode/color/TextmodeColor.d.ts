/**
 * Represents a color in the `textmode.js` rendering system.
 *
 * Values are stored as `0-255` integers for compatibility with public APIs.
 * Normalized versions are also available for shader uploads.
 *
 * Use {@link Textmodifier.color} to create colors.
 *
 * @example
 * {@includeCode ../../../examples/TextmodeColor/creation/sketch.js}
 */
export declare class TextmodeColor {
    private _rgba?;
    private _normalized?;
    /**
     * Red component (0-255).
     *
     * @example
     * {@includeCode ../../../examples/TextmodeColor/r/sketch.js}
     */
    readonly r: number;
    /**
     * Green component (0-255).
     *
     * @example
     * {@includeCode ../../../examples/TextmodeColor/g/sketch.js}
     */
    readonly g: number;
    /**
     * Blue component (0-255).
     *
     * @example
     * {@includeCode ../../../examples/TextmodeColor/b/sketch.js}
     */
    readonly b: number;
    /**
     * Alpha component (0-255).
     *
     * @example
     * {@includeCode ../../../examples/TextmodeColor/a/sketch.js}
     */
    readonly a: number;
    private constructor();
    /**
     * Returns a plain RGB array with integer components.
     *
     * @returns A [r, g, b] tuple with values between 0 and 255.
     *
     * @example
     * {@includeCode ../../../examples/TextmodeColor/rgb/sketch.js}
     */
    get rgb(): [number, number, number];
    /**
     * Returns a plain RGBA array with integer components.
     *
     * @returns A [r, g, b, a] tuple with values between 0 and 255.
     *
     * @example
     * {@includeCode ../../../examples/TextmodeColor/rgba/sketch.js}
     */
    get rgba(): [number, number, number, number];
    /**
     * Returns the normalized *(0-1)* RGBA array.
     *
     * Useful for passing color data to WebGL shaders.
     *
     * @returns A [r, g, b, a] tuple where each component is between 0.0 and 1.0.
     *
     * @example
     * {@includeCode ../../../examples/TextmodeColor/normalized/sketch.js}
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
     */
    withAlpha(alpha: number): TextmodeColor;
}
