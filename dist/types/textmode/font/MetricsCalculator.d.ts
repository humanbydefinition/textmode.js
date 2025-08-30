import type { GlyphDimensions } from './types.ts';
import type { TyprFont } from './typr/types.ts';
/**
 * Handles calculation of font metrics and glyph dimensions.
 * This class encapsulates the logic for measuring text and calculating font properties
 * directly from font data using Typr.ts, eliminating the need for Canvas-based measurement.
 */
export declare class FontMetricsCalculator {
    private _tableReader;
    /**
     * Creates a new FontMetricsCalculator instance.
     */
    constructor();
    /**
     * Calculates the maximum glyph dimensions for a given set of characters
     * using direct font metrics from the parsed font data.
     * @param characters Array of character strings
     * @param fontSize Font size to use for scaling measurements
     * @param font Parsed TyprFont object containing font data
     * @returns Object containing width and height dimensions
     */
    calculateMaxGlyphDimensions(characters: string[], fontSize: number, font: TyprFont): GlyphDimensions;
    /**
     * Gets the character advance width for a specific character and font size.
     * @param character The character to measure
     * @param fontSize Font size to use for scaling
     * @param font Parsed TyprFont object
     * @returns Advance width in pixels
     */
    getCharacterAdvanceWidth(character: string, fontSize: number, font: TyprFont): number;
    /**
     * Gets the font-level ascender, descender, and line gap values for a given font size.
     * @param fontSize Font size to use for scaling
     * @param font Parsed TyprFont object
     * @returns Object containing ascender, descender, and lineGap in pixels
     */
    getFontMetrics(fontSize: number, font: TyprFont): {
        ascender: number;
        descender: number;
        lineGap: number;
        lineHeight: number;
    };
    /**
     * Clears internal caches. Useful for memory management.
     */
    $clearCache(): void;
}
