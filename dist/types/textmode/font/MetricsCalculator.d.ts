import type { GlyphDimensions } from './types.ts';
/**
 * Handles calculation of font metrics and glyph dimensions.
 * This class encapsulates the logic for measuring text and calculating font properties.
 */
export declare class FontMetricsCalculator {
    private _tempCanvas;
    private _tempContext;
    /**
     * Creates a new MetricsCalculation instance.
     */
    constructor();
    /**
     * Calculates the maximum glyph dimensions for a given set of characters.
     * @param characters Array of character strings
     * @param fontSize Font size to use for measurement
     * @param fontFamilyName Font family name
     * @param fontFace FontFace object (optional, for validation)
     * @returns Object containing width and height dimensions
     */
    calculateMaxGlyphDimensions(characters: string[], fontSize: number, fontFamilyName: string): GlyphDimensions;
}
