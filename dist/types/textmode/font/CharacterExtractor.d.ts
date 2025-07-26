import type { TyprFont } from './types.ts';
/**
 * Handles extraction of characters from font cmap tables.
 * This class encapsulates the complex logic for reading different cmap table formats.
 */
export declare class CharacterExtraction {
    /**
     * Extracts all available characters from a font's cmap tables.
     * @param font The parsed font object from Typr
     * @returns Array of unique character strings
     */
    extractCharacters(font: TyprFont): string[];
    /**
     * Extracts characters from a Format 4 cmap table (Basic Multilingual Plane).
     * @param table The Format 4 cmap table
     * @returns Array of character strings
     */
    private _extractCharactersFromFormat4Table;
    /**
     * Extracts characters from a Format 12 cmap table (Extended Unicode ranges).
     * @param table The Format 12 cmap table
     * @returns Array of character strings
     */
    private _extractCharactersFromFormat12Table;
    /**
     * Calculates the glyph index for a character in a Format 4 cmap table.
     * @param table The Format 4 cmap table
     * @param codePoint The Unicode code point
     * @param rangeIndex The index of the character range
     * @returns The glyph index, or 0 if not found
     */
    private _calculateGlyphIndexFormat4;
    /**
     * Filters out problematic characters that might cause rendering issues.
     * @param characters Array of character strings to filter
     * @returns Filtered array of character strings
     */
    filterProblematicCharacters(characters: string[]): string[];
    /**
     * Checks if a character is valid for rendering.
     * @param char The character to check
     * @returns True if the character is valid, false otherwise
     */
    private _isValidCharacter;
}
