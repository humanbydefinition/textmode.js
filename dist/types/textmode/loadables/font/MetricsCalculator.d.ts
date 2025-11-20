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
    $calculateMaxGlyphDimensions(characters: string[], fontSize: number, font: TyprFont): GlyphDimensions;
}
