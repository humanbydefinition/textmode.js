import type { TyprFont } from './typr/types.ts';
/**
 * Extracts supported Unicode characters from parsed cmap tables.
 */
export declare class CharacterExtractor {
    /**
     * Extracts Unicode characters from the selected cmap tables.
     * @param font The parsed font object from Typr
     * @returns Array of unique character strings
     */
    _extractCharacters(font: TyprFont): string[];
    /**
     * Extracts characters from a Format 4 cmap table (Basic Multilingual Plane).
     */
    private _extractCharactersFromFormat4;
    /**
     * Extracts characters from a Format 12 cmap table (Extended Unicode ranges).
     */
    private _extractCharactersFromFormat12;
    private _addCharIfValid;
}
