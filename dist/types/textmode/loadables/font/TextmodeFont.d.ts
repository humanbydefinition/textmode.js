import type { GLRenderer } from '../../../rendering/webgl/core/Renderer.ts';
import type { GLFramebuffer } from '../../../rendering/webgl/core/Framebuffer.ts';
import { Disposable } from '../../../utils/Disposable.ts';
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
 *
 * @example
 * ```javascript
 * const t = textmode.create({ width: 800, height: 600 });
 *
 * t.setup(async () => {
 *   // Load a custom font
 *   const font = await t.loadFont('./fonts/retro.ttf', false);
 *
 *   // Get info about the loaded font
 *   console.log(`Loaded ${font.characters.length} characters`);
 *   console.log(`Max glyph size: ${font.maxGlyphDimensions.width}x${font.maxGlyphDimensions.height}`);
 *
 *   // Use it on a specific layer
 *   const layer = t.layers.add();
 *   await layer.loadFont(font);
 * });
 * ```
 */
export declare class TextmodeFont extends Disposable {
    private _font;
    private _characters;
    private _characterMap;
    private _fontSize;
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
    private _rebuildAtlas;
    /**
     * Loads a new font from a file path.
     * @param fontPath Path to the .otf or .ttf font file
     * @returns Promise that resolves when font loading is complete
     * @ignore
     */
    $loadFont(fontPath: string): Promise<void>;
    private _fetchFont;
    private _loadFromBuffer;
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
     */
    dispose(): void;
    /** Returns whether this font has been initialized. @ignore */
    get $isInitialized(): boolean;
    /** Returns the WebGL framebuffer containing the font texture atlas. */
    get fontFramebuffer(): GLFramebuffer;
    /** Returns the character map for O(1) lookups. */
    get characterMap(): Map<string, TextmodeCharacter>;
    /**
     * Returns the array of {@link TextmodeCharacter} objects in the font.
     *
     * @example
     * ```javascript
     * // Interactive Character Map
     * const t = textmode.create({ width: window.innerWidth, height: window.innerHeight });
     *
     * t.draw(() => {
     *   t.background(10, 10, 20);
     *
     *   const chars = t.font.characters;
     *   const cols = 32;
     *   const rows = Math.ceil(chars.length / cols);
     *
     *   // Center the grid in the viewport
     *   const startX = -(cols) / 2;
     *   const startY = -(rows) / 2;
     *
     *   // Calculate mouse position in "map space"
     *   const mx = Math.floor(t.mouse.x - startX);
     *   const my = Math.floor(t.mouse.y - startY);
     *
     *   for (let i = 0; i < chars.length; i++) {
     *     const x = i % cols;
     *     const y = Math.floor(i / cols);
     *     const isHovered = mx === x && my === y;
     *
     *     t.push();
     *     t.translate(startX + x, startY + y);
     *
     *     // Highlight hovered character
     *     if (isHovered) {
     *       t.cellColor(50, 100, 200);
     *       t.charColor(255);
     *       t.translateZ(5); // Pop out
     *     } else {
     *       // Gradient based on index
     *       const hue = (i / chars.length) * 255;
     *       t.charColor(hue, 150, 255 - hue);
     *     }
     *
     *     t.char(chars[i].character);
     *     t.point();
     *     t.pop();
     *   }
     * });
     *
     * t.windowResized(() => {
     *   t.resizeCanvas(window.innerWidth, window.innerHeight);
     * });
     * ```
     */
    get characters(): TextmodeCharacter[];
    /** Returns the number of columns in the texture atlas. */
    get textureColumns(): number;
    /** Returns the number of rows in the texture atlas. */
    get textureRows(): number;
    /** Returns the maximum dimensions of a glyph in the font in pixels. */
    get maxGlyphDimensions(): {
        width: number;
        height: number;
    };
    /** Returns the font size used for the texture atlas. */
    get fontSize(): number;
    /** Returns the Typr.js font object. @ignore */
    get font(): TyprFont;
}
