import type { GLFramebuffer } from '../../rendering/webgl/core/Framebuffer.ts';
import { Disposable } from '../../utils/Disposable.ts';
import type { TextmodeGlyph, TextmodeGlyphAtlas } from './types.ts';
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
 * {@includeCode ../../../examples/TextmodeFont/creation/sketch.js}
 */
export declare class TextmodeFont extends Disposable implements TextmodeGlyphAtlas {
    private _renderer;
    private _font;
    private _characters;
    private _characterMap;
    private _fontSize;
    private _maxGlyphDimensions;
    private _characterExtractor;
    private _textureAtlas;
    private _metricsCalculator;
    private _characterColorMapper;
    private _rebuildAtlas;
    private _fetchFont;
    private _loadFromBuffer;
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
    _getCharacterColor(character: string): [number, number, number];
    /**
     * Get the colors associated with a string of characters using O(1) Map lookups.
     * @param characters The string of characters to get colors for.
     * @returns An array of RGB colors for each character in the string.
     * Each color is represented as an array `[r, g, b]`.
     * @ignore
     */
    _getCharacterColors(characters: string): [number, number, number][];
    /**
     * Dispose of all resources used by this font manager.
     *
     * @example
     * {@includeCode ../../../examples/TextmodeFont/dispose/sketch.js}
     */
    dispose(): void;
    /**
     * Returns the WebGL framebuffer containing the font texture atlas.
     *
     * @example
     * {@includeCode ../../../examples/TextmodeFont/fontFramebuffer/sketch.js}
     */
    get fontFramebuffer(): GLFramebuffer;
    /**
     * Returns the normalized glyph atlas framebuffer used by the ASCII shader.
     *
     * @example
     * {@includeCode ../../../examples/TextmodeFont/fontFramebuffer/sketch.js}
     */
    get framebuffer(): GLFramebuffer;
    /**
     * Returns the character map for O(1) lookups.
     *
     * @example
     * {@includeCode ../../../examples/TextmodeFont/characterMap/sketch.js}
     */
    get characterMap(): Map<string, TextmodeGlyph>;
    /**
     * Returns the array of {@link TextmodeGlyph} objects in the font.
     *
     * @example
     * {@includeCode ../../../examples/TextmodeFont/characters/sketch.js}
     */
    get characters(): readonly TextmodeGlyph[];
    /**
     * Returns the number of columns in the texture atlas.
     *
     * @example
     * {@includeCode ../../../examples/TextmodeFont/textureColumns/sketch.js}
     */
    get textureColumns(): number;
    /**
     * Returns the number of columns in the normalized glyph atlas.
     *
     * @example
     * {@includeCode ../../../examples/TextmodeFont/textureColumns/sketch.js}
     */
    get columns(): number;
    /**
     * Returns the number of rows in the texture atlas.
     *
     * @example
     * {@includeCode ../../../examples/TextmodeFont/textureRows/sketch.js}
     */
    get textureRows(): number;
    /**
     * Returns the number of rows in the normalized glyph atlas.
     *
     * @example
     * {@includeCode ../../../examples/TextmodeFont/textureRows/sketch.js}
     */
    get rows(): number;
    /**
     * Returns the maximum dimensions of a glyph in the font in pixels.
     *
     * @example
     * {@includeCode ../../../examples/TextmodeFont/maxGlyphDimensions/sketch.js}
     */
    get maxGlyphDimensions(): {
        width: number;
        height: number;
    };
    /**
     * Returns the effective glyph cell dimensions used by the layer grid.
     *
     * @example
     * {@includeCode ../../../examples/TextmodeFont/cellDimensions/sketch.js}
     */
    get cellDimensions(): {
        width: number;
        height: number;
    };
    /**
     * Returns the effective glyph cell width used by the layer grid.
     *
     * @example
     * {@includeCode ../../../examples/TextmodeFont/cellDimensions/sketch.js}
     */
    get cellWidth(): number;
    /**
     * Returns the effective glyph cell height used by the layer grid.
     *
     * @example
     * {@includeCode ../../../examples/TextmodeFont/cellDimensions/sketch.js}
     */
    get cellHeight(): number;
    /**
     * Returns the font size used for the texture atlas.
     *
     * @example
     * {@includeCode ../../../examples/TextmodeFont/fontSize/sketch.js}
     */
    get fontSize(): number;
    /**
     * Returns the Typr.js font object.
     *
     * @example
     * {@includeCode ../../../examples/TextmodeFont/font/sketch.js}
     */
    get font(): TyprFont;
}
