import type { TextmodeCharacter } from './types.ts';
import type { TyprFont } from './typr/types.ts';
/**
 * Handles color generation and mapping for characters.
 * This class manages the unique RGB color assignment for character identification.
 */
export declare class CharacterColorMapper {
    private _fontTableReader;
    constructor();
    /**
     * Creates TextmodeCharacter objects with unique color assignments.
     * Returns both an array (for public API and iteration) and a Map (for O(1) lookups).
     * @param characters Array of character strings
     * @param font The parsed font object from Typr
     * @returns Object containing both array and map of TextmodeCharacter objects
     */
    $createCharacterObjects(characters: string[], font: TyprFont): {
        array: TextmodeCharacter[];
        map: Map<string, TextmodeCharacter>;
    };
    /**
     * Generates a unique RGB color for a character based on its index.
     * @param index The index of the character
     * @returns RGB color as a tuple [r, g, 0] with values from 0-1 for shader use
     */
    private _generateCharacterColor;
    /**
     * Gets glyph data for a character including advance width and path information.
     * @param font The parsed font object from Typr
     * @param character Character to get glyph data for
     * @returns Parsed glyph data with advance width, or null if not found
     */
    private _getGlyphData;
}
