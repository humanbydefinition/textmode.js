import type { GlyphDimensions, TextmodeGlyph } from './types.ts';
import type { TyprFont } from './typr/types.ts';
/**
 * Measures glyph cells from parsed font tables instead of Canvas text metrics.
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
     * @param characters Array of glyph entries
     * @param fontSize Font size to use for scaling measurements
     * @param font Parsed TyprFont object containing font data
     * @returns Object containing width and height dimensions
     */
    _calculateMaxGlyphDimensions(characters: readonly TextmodeGlyph[], fontSize: number, font: TyprFont): GlyphDimensions;
}
