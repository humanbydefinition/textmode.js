import type { Renderer } from '../../rendering/webgl/Renderer.ts';
import type { Framebuffer } from '../../rendering/webgl/Framebuffer.ts';
import type { TextmodeCharacter, TyprFont } from './types.ts';
/**
 * Manages the textmode font used for rendering characters.
 *
 * This class coordinates font loading, character extraction, texture atlas creation,
 * and provides character color information. It acts as a facade for the font system.
 */
export declare class TextmodeFont {
    private _font;
    private _characters;
    private _fontFramebuffer;
    private _fontSize;
    private _textureColumns;
    private _textureRows;
    private _maxGlyphDimensions;
    private _fontFace;
    private _fontFamilyName;
    private _characterExtractor;
    private _textureAtlas;
    private _metricsCalculator;
    private _characterColorMapper;
    /**
     * Creates a new TextmodeFont instance.
     * @param renderer Renderer instance for texture creation
     * @param fontSize Font size to use for the texture atlas
     * @ignore
     */
    constructor(renderer: Renderer, fontSize?: number);
    /**
     * Initializes the font manager by loading the font and creating the texture atlas.
     * @returns Promise that resolves when initialization is complete
     * @ignore
     */
    initialize(): Promise<void>;
    /**
     * Sets the font size for rendering.
     * @param size The font size to set. If undefined, returns the current font size.
     * @ignore
     */
    setFontSize(size: number | undefined): void | number;
    /**
     * Loads a new font from a file path.
     * @param fontPath Path to the .otf or .ttf font file
     * @returns Promise that resolves when font loading is complete
     * @ignore
     */
    loadFont(fontPath: string): Promise<void>;
    /**
     * Loads a FontFace from a font buffer.
     * @param fontBuffer ArrayBuffer containing font data
     */
    private _loadFontFace;
    /**
     * Initializes all font-dependent properties using the component classes.
     */
    private _initializeFont;
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
     * Returns the WebGL framebuffer containing the font texture atlas.
     * @ignore
     */
    get fontFramebuffer(): Framebuffer;
    /** Returns the array of {@link TextmodeCharacter} objects in the font. */
    get characters(): TextmodeCharacter[];
    /** Returns the number of columns in the texture atlas. */
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
    /** Returns the Typr.js font object. @ignore */
    get font(): TyprFont;
}
