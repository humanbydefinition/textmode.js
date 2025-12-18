import type { GLRenderer } from '../../../rendering/webgl/core/Renderer.ts';
import type { GLFramebuffer } from '../../../rendering/webgl/core/Framebuffer.ts';
import type { TextmodeCharacter } from './types.ts';
import type { TyprFont } from './typr/types.ts';
/**
 * Manages the font used for rendering characters via {@link TextmodeLayer.loadFont}.
 *
 * This class coordinates font loading, character extraction, texture atlas creation,
 * and provides character information.
 *
 * Each {@link TextmodeLayer} has its own instance of this class to allow for
 * layer-specific font configurations.
 */
export declare class TextmodeFont {
    private _font;
    private _characters;
    private _characterMap;
    private _fontFramebuffer;
    private _fontSize;
    private _textureColumns;
    private _textureRows;
    private _maxGlyphDimensions;
    private _fontFace;
    private _characterExtractor;
    private _textureAtlas;
    private _metricsCalculator;
    private _characterColorMapper;
    private _isInitialized;
    /**
     * Creates a new TextmodeFont instance.
     * @param renderer Renderer instance for texture creation
     * @param fontSize Font size to use for the texture atlas
     * @ignore
     */
    constructor(renderer: GLRenderer, fontSize?: number);
    /**
     * Initializes the font manager by loading the font and creating the texture atlas.
     * @param fontSource Optional URL to load a custom font. If not provided, uses embedded font (full builds only).
     * @returns Promise that resolves when initialization is complete
     * @ignore
     */
    $initialize(fontSource?: string | URL): Promise<void>;
    /**
     * Sets the font size for rendering.
     * @param size The font size to set. If undefined, returns the current font size.
     * @ignore
     */
    $setFontSize(size: number | undefined): void | number;
    /**
     * Loads a new font from a file path.
     * @param fontPath Path to the .otf or .ttf font file
     * @returns Promise that resolves when font loading is complete
     * @ignore
     */
    $loadFont(fontPath: string): Promise<void>;
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
     * Get the color associated with a character using O(1) Map lookup.
     * @param character The character to get the color for.
     * @returns The RGB color as an array `[r, g, b]`.
     * @ignore
     */
    $getCharacterColor(character: string): [number, number, number];
    /**
     * Get the colors associated with a string of characters using O(1) Map lookups.
     * @param characters The string of characters to get colors for.
     * @returns An array of RGB colors for each character in the string.
     * Each color is represented as an array `[r, g, b]`.
     * @ignore
     */
    $getCharacterColors(characters: string): [number, number, number][];
    /**
     * Dispose of all resources used by this font manager.
     * @ignore
     */
    $dispose(): void;
    /** Returns whether this font has been initialized. @ignore */
    get $isInitialized(): boolean;
    /** Returns the WebGL framebuffer containing the font texture atlas. */
    get fontFramebuffer(): GLFramebuffer;
    /** Returns the character map for O(1) lookups. */
    get characterMap(): Map<string, TextmodeCharacter>;
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
