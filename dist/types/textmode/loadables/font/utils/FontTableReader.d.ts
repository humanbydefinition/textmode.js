import type { TyprFont } from '../typr/types.ts';
/**
 * Centralized font table reader that eliminates redundant font data access.
 * Provides access to font tables and metrics with consistent error handling.
 */
export declare class FontTableReader {
    /**
     * Gets the glyph index for a given Unicode code point.
     * Searches through all available cmap tables to find the character.
     */
    $getGlyphIndex(font: TyprFont, codePoint: number): number;
    /**
     * Gets the glyph index for a character string.
     * Convenience method that extracts the code point first.
     */
    $getGlyphIndexForCharacter(font: TyprFont, character: string): number;
    /**
     * Gets the advance width for a glyph from the horizontal metrics table.
     */
    $getGlyphAdvanceWidth(font: TyprFont, glyphIndex: number): number;
    /**
     * Gets font-level metrics scaled to the specified font size.
     */
    $getFontMetrics(font: TyprFont, fontSize: number): {
        ascender: number;
        descender: number;
        lineGap: number;
        lineHeight: number;
        unitsPerEm: number;
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
