import type { GlyphPath } from './types';
import type { TyprFont } from '../../textmode/font/types.ts';
/**
 * Handles SVG path generation for character glyphs.
 * This class is responsible for converting font glyph data into SVG path strings.
 */
export declare class SVGPathGenerator {
    /**
     * Gets the glyph index for a given Unicode code point in a Typr.js font
     * @param fontData The Typr.js font data
     * @param codePoint The Unicode code point to look up
     * @returns The glyph index, or 0 if not found
     */
    private getGlyphIndex;
    /**
     * Creates an empty path object for characters with no glyph data
     * @returns Empty path object
     */
    private createEmptyPath;
    /**
     * Creates a path object for a glyph
     * @param fontData Font data object
     * @param glyphData Glyph data from font
     * @param x X position
     * @param y Y position
     * @param fontSize Font size
     * @returns Path object with bounding box and SVG methods
     */
    private createGlyphPath;
    /**
     * Converts glyph data to SVG path string
     * @param glyphData Glyph data from font
     * @param x X position
     * @param y Y position
     * @param scale Scale factor
     * @returns SVG path data string
     */
    private glyphToSVGPath;
    /**
     * Generates an SVG path for a character glyph
     * @param character The character to generate a path for
     * @param fontData The font data object
     * @param x X position
     * @param y Y position
     * @param fontSize Font size
     * @returns Path object with SVG generation methods
     */
    generateCharacterPath(character: string, fontData: TyprFont, x: number, y: number, fontSize: number): GlyphPath;
    /**
     * Generates SVG path data for a character with positioning calculations
     * @param character The character to render
     * @param fontData The font data
     * @param cellX Cell X position
     * @param cellY Cell Y position
     * @param cellWidth Cell width
     * @param cellHeight Cell height
     * @param fontSize Font size
     * @param advanceWidth Character advance width
     * @returns SVG path data string or null if generation fails
     */
    generatePositionedCharacterPath(character: string, fontData: TyprFont, cellX: number, cellY: number, cellWidth: number, cellHeight: number, fontSize: number, advanceWidth: number): string | null;
}
