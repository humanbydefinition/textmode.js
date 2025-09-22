import type { TyprFont } from './typr/types.ts';
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
    $extractCharacters(font: TyprFont): string[];
    /**
     * Filters out problematic characters that might cause rendering issues.
     * @param characters Array of character strings to filter
     * @returns Filtered array of character strings
     */
    $filterProblematicCharacters(characters: string[]): string[];
    /**
     * Extracts characters from a Format 4 cmap table (Basic Multilingual Plane).
     */
    private _extractCharactersFromFormat4;
    /**
     * Extracts characters from a Format 12 cmap table (Extended Unicode ranges).
     */
    private _extractCharactersFromFormat12;
    /**
     * Calculates the glyph index for a character in a Format 4 cmap table.
     */
    private _calculateGlyphIndexFormat4;
    /**
     * Checks if a character is valid for rendering.
     */
    private _isValidCharacter;
}
