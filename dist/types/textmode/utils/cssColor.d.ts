export type RGBA = [number, number, number, number];
/**
 * Parses a CSS color string (hex, rgb, rgba) into an RGBA tuple.
 * Returns null if the value cannot be parsed or is fully transparent.
 */
export declare function parseCssColor(value?: string | null): RGBA | null;
export declare function luminance(rgba: RGBA | null): number;
export declare function rgbaToCss(rgba: RGBA): string;
