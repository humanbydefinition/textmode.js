type ColorTuple = [number, number, number] | [number, number, number, number];
/**
 * Represents a color in the `textmode.js` rendering system.
 *
 * Values are stored as `0-255` integers for compatibility with public APIs,
 * while normalized versions are derived on demand for shader uploads.
 *
 * Use {@link Textmodifier.color} to create colors.
 */
export declare class TextmodeColor {
    private readonly _rgba;
    private readonly _normalized;
    /** Red component *(0-255)* */
    readonly r: number;
    /** Green component *(0-255)* */
    readonly g: number;
    /** Blue component *(0-255)* */
    readonly b: number;
    /** Alpha component *(0-255)* */
    readonly a: number;
    private constructor();
    /**
     * Create a color from any supported source.
     * Accepts an existing {@link TextmodeColor}, CSS hex strings, single characters
     * (resolved through a glyph resolver), grayscale values, RGB(A) tuples, or
     * normalized component arrays.
     * @ignore
     */
    static $from(value: TextmodeColor | string | number | ColorTuple, g?: number, b?: number, a?: number): TextmodeColor;
    /**
     * Create a color from RGB or RGBA components (0-255 range).
     * @ignore
     */
    static $fromRGBA(r: number, g: number, b: number, a?: number): TextmodeColor;
    /**
     * Create a grayscale color. Optional alpha can be provided.
     * @ignore
     */
    static $fromGray(gray: number, alpha?: number): TextmodeColor;
    /**
     * Create a color from a CSS-style hex string.
     * @ignore
     */
    static $fromHex(hex: string): TextmodeColor;
    /** Returns a plain RGB array with integer components. */
    get rgb(): [number, number, number];
    /** Returns a plain RGBA array with integer components. */
    get rgba(): [number, number, number, number];
    /** Returns the normalized *(0-1)* RGBA array. */
    get normalized(): [number, number, number, number];
    /**
     * Create a copy of this color with a different alpha value.
     */
    withAlpha(alpha: number): TextmodeColor;
    /**
     * Runtime type guard.
     * @ignore
     */
    static $isColor(value: unknown): value is TextmodeColor;
}
export {};
