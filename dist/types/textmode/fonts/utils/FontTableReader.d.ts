import type { TyprFont } from '../typr/types.ts';
/**
 * Reads glyph indices and metrics from parsed font tables.
 */
export declare class FontTableReader {
    /**
     * Gets the glyph index for a given Unicode code point.
     * Searches Unicode cmap tables first, with legacy cmap fallback only for legacy-only fonts.
     */
    _getGlyphIndex(font: TyprFont, codePoint: number): number;
    /**
     * Gets the glyph index for a character string.
     * Convenience method that extracts the code point first.
     */
    _getGlyphIndexForCharacter(font: TyprFont, character: string): number;
    /**
     * Gets the advance width for a glyph from the horizontal metrics table.
     */
    _getGlyphAdvanceWidth(font: TyprFont, glyphIndex: number): number;
    /**
     * Gets font-level metrics scaled to the specified font size.
     */
    _getFontMetrics(font: TyprFont, fontSize: number): {
        lineHeight: number;
        scale: number;
    };
    /**
     * Gets glyph index from format 4 cmap table (BMP Unicode).
     */
    private _getGlyphIndexFormat4;
    /**
     * Gets glyph index from format 12 cmap table (full Unicode).
     */
    private _getGlyphIndexFormat12;
}
