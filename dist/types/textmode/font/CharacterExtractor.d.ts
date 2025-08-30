import type { TyprFont } from './typr/types.ts';
/**
 * Handles extraction of characters from font cmap tables.
 * This class encapsulates the complex logic for reading different cmap table formats.
 */
export declare class CharacterExtraction {
    private _cmapParser;
    constructor();
    /**
     * Extracts all available characters from a font's cmap tables.
     * @param font The parsed font object from Typr
     * @returns Array of unique character strings
     */
    extractCharacters(font: TyprFont): string[];
    /**
     * Filters out problematic characters that might cause rendering issues.
     * @param characters Array of character strings to filter
     * @returns Filtered array of character strings
     */
    filterProblematicCharacters(characters: string[]): string[];
    /**
     * Checks if a character exists in the font.
     * @param font The parsed font object from Typr
     * @param character The character to check
     * @returns True if the character exists in the font
     */
    characterExists(font: TyprFont, character: string): boolean;
    /**
     * Checks if all characters in a string exist in the font.
     * @param font The parsed font object from Typr
     * @param text The text string to check
     * @returns True if all characters exist in the font
     */
    allCharactersExist(font: TyprFont, text: string): boolean;
}
