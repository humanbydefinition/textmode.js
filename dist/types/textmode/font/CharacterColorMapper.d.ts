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
     * @param characters Array of character strings
     * @param font The parsed font object from Typr
     * @returns Array of TextmodeCharacter objects with colors
     */
    createCharacterObjects(characters: string[], font: TyprFont): TextmodeCharacter[];
    /**
     * Generates a unique RGB color for a character based on its index.
     * @param index The index of the character
     * @returns RGB color as a tuple [r, g, b]
     */
    private _generateCharacterColor;
    /**
     * Gets the color for a specific character.
     * @param character The character to get the color for
     * @param characters Array of TextmodeCharacter objects
     * @returns RGB color as a tuple [r, g, b], or [0, 0, 0] if not found
     */
    getCharacterColor(character: string, characters: TextmodeCharacter[]): [number, number, number];
    /**
     * Gets colors for multiple characters.
     * @param characterString String of characters to get colors for
     * @param characters Array of TextmodeCharacter objects
     * @returns Array of RGB colors for each character
     */
    getCharacterColors(characterString: string, characters: TextmodeCharacter[]): [number, number, number][];
}
