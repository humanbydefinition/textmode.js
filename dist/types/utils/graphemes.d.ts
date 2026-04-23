/**
 * Split a string into user-perceived grapheme clusters.
 * Falls back to Array.from when Intl.Segmenter is unavailable.
 */
export declare function splitGraphemes(text: string): string[];
/**
 * Return the full code-point sequence represented by a string.
 */
export declare function getCodePoints(text: string): number[];
