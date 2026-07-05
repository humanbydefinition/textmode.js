/**
 * A tuple representing an RGB color.
 * Contains three integers (0-255) for Red, Green, and Blue channels.
 */
export type RGB = [number, number, number];
/**
 * A tuple representing an RGBA color.
 * Contains four integers (0-255) for Red, Green, Blue, and Alpha channels.
 */
export type RGBA = [number, number, number, number];
/**
 * A union type for either an RGB or RGBA color tuple.
 *
 * @see {@link https://code.textmode.art/api/textmode.js/namespaces/color/type-aliases/TextmodeColorTuple | color.TextmodeColorTuple API reference}
 */
export type TextmodeColorTuple = [number, number, number] | [number, number, number, number];
/**
 * Parse a hexadecimal color string into an RGBA tuple.
 * Supports 3, 4, 6, and 8 digit hex codes (e.g. '#RGB', '#RGBA', '#RRGGBB', '#RRGGBBAA').
 *
 * @param hexString The hex string to parse (e.g. '#ff0000', '0x00ff00', 'f0f')
 * @returns A [r, g, b, a] tuple with values between 0 and 255.
 * @throws Error if the hex string is invalid.
 *
 * @example
 * ```ts
 * parseHexColor('#ff0000'); // [255, 0, 0, 255]
 * parseHexColor('#0f0');    // [0, 255, 0, 255]
 * parseHexColor('0x0000ff80'); // [0, 0, 255, 128]
 * ```
 */
export declare function parseHexColor(hexString: string): RGBA;
/**
 * Clamp a number to a valid byte range (0-255).
 * Returns 0 if the value is NaN.
 * @param value The number to clamp.
 * @returns An integer between 0 and 255.
 */
export declare function clampByte(value: number): number;
/**
 * Parses a CSS color string (hex, rgb, rgba) into an RGBA tuple.
 * Returns null if the value cannot be parsed or is fully transparent.
 *
 * @param value The CSS color string to parse
 * @param allowTransparent Whether to allow fully transparent colors (alpha 0). Defaults to false.
 * @returns An RGBA tuple or null if parsing or validation failed.
 *
 * @example
 * ```ts
 * parseCssColor('rgb(255, 0, 0)'); // [255, 0, 0, 255]
 * parseCssColor('rgba(0, 0, 0, 0)', true); // [0, 0, 0, 0]
 * ```
 */
export declare function parseCssColor(value?: string | null, allowTransparent?: boolean): RGBA | null;
