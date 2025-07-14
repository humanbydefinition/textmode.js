import type { Renderer } from '../rendering/Renderer.ts';
import type { Framebuffer } from '../rendering/Framebuffer.ts';
/**
 * Represents a single character in the textmode font.
 */
export type TextmodeCharacter = {
    /** The character itself. */
    character: string;
    /** The Unicode code point of the character. */
    unicode: number;
    /** The RGB color associated with the character for identification. */
    color: [number, number, number];
};
/**
 * Manages the textmode font used for rendering characters.
 *
 * This class handles loading the font, creating a texture atlas, and providing character color information.
 */
export declare class TextmodeFont {
    private _font;
    private _characters;
    private _fontFramebuffer;
    private _textureCanvas;
    private _textureContext;
    private _fontSize;
    private _textureColumns;
    private _textureRows;
    private _maxGlyphDimensions;
    private _renderer;
    private _fontFace;
    private _fontFamilyName;
    /**
     * Creates a new FontManager instance
     * @param renderer Renderer instance for texture creation
     * @param fontSize Font size to use for the texture atlas
     * @ignore
     */
    constructor(renderer: Renderer, fontSize?: number);
    /**
     * Initializes the font manager by loading the font and creating the texture atlas
     * @returns Promise that resolves when initialization is complete
     * @ignore
     */
    initialize(): Promise<void>;
    /**
     * Initializes the characters array from the font's cmap table
     */
    private _initializeCharacters;
    /**
     * Calculates the maximum glyph dimensions for the given font size
     */
    private _calculateMaxGlyphDimensions;
    /**
     * Creates the texture atlas containing all characters
     */
    private _createTextureAtlas;
    /**
     * Get the color associated with a character.
     * @param character The character to get the color for.
     * @returns The RGB color as an array `[r, g, b]`.
     */
    getCharacterColor(character: string): [number, number, number];
    /**
     * Get the colors associated with a string of characters.
     * @param characters The string of characters to get colors for.
     * @returns An array of RGB colors for each character in the string.
     * Each color is represented as an array `[r, g, b]`.
     */
    getCharacterColors(characters: string): [number, number, number][];
    /**
     * Checks if all characters in the given string exist in the font.
     * @param str The string to check.
     * @returns `true` if all characters exist in the font, `false` otherwise.
     */
    hasAllCharacters(str: string): boolean;
    /**
     * Updates the font by loading a new font file and regenerating all related properties
     * @param fontPath Path to the .otf or .ttf font file
     * @param fontSize Optional new font size (defaults to current fontSize)
     * @returns Promise that resolves when font update is complete
     * @ignore
     */
    loadFont(fontPath: string): Promise<void>;
    /**
     * Returns the WebGL framebuffer containing the font texture atlas.
     * @ignore
     */
    get fontFramebuffer(): Framebuffer;
    /** Returns the array of {@link TextmodeCharacter} objects in the font. */
    get characters(): TextmodeCharacter[];
    /** Returns a string representation of all characters in the font.*/
    get charactersString(): string;
    /** Returns the number of columns in the texture atlas.*/
    get textureColumns(): number;
    /** Returns the number of rows in the texture atlas. */
    get textureRows(): number;
    /** Returns the maximum dimensions of a glyph in the font. */
    get maxGlyphDimensions(): {
        width: number;
        height: number;
    };
    /** Returns the font size used for rendering. */
    get fontSize(): number;
}
