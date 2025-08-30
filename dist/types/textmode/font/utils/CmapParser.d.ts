import type { TyprFont } from '../typr/types.ts';
import { FontTableReader } from './FontTableReader.ts';
/**
 * Specialized utility for character mapping operations.
 * Provides high-level character extraction and validation functions.
 */
export declare class CmapParser {
    private _tableReader;
    constructor(tableReader: FontTableReader);
    /**
     * Extracts all available characters from a font's cmap tables.
     * Returns an array of unique character strings.
     */
    $extractAllCharacters(font: TyprFont): string[];
    /**
     * Validates whether a character exists in the font.
     */
    $characterExists(font: TyprFont, character: string): boolean;
    /**
     * Validates whether all characters in a string exist in the font.
     */
    $allCharactersExist(font: TyprFont, text: string): boolean;
    /**
     * Filters out characters that don't exist in the font.
     */
    $filterExistingCharacters(font: TyprFont, characters: string[]): string[];
    /**
     * Filters out problematic characters that might cause rendering issues.
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
