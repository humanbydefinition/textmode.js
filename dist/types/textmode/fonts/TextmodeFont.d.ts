import type { GLFramebuffer } from '../../rendering/webgl/core/Framebuffer.ts';
import { Disposable } from '../../utils/Disposable.ts';
import type { TextmodeGlyph } from './types.ts';
import type { TyprFont } from './typr/types.ts';
/**
 * Manages the font used for rendering characters via {@link layering.TextmodeLayer.loadFont}.
 *
 * This class coordinates font loading, character extraction, texture atlas creation,
 * and provides character information.
 *
 * Each {@link layering.TextmodeLayer} has its own instance of this class to allow for
 * layer-specific font configurations.
 *
 * @example
 * {@includeCode ../../../examples/TextmodeFont/creation/sketch.js}
 */
export declare class TextmodeFont extends Disposable {
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
     * Dispose of all resources used by this font manager.
     *
     * @example
     * {@includeCode ../../../examples/TextmodeFont/dispose/sketch.js}
     */
    dispose(): void;
    /**
     * Returns the normalized glyph atlas framebuffer used by the ASCII shader.
     *
     * @example
     * {@includeCode ../../../examples/TextmodeFont/framebuffer/sketch.js}
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
     * Returns the number of rows in the texture atlas.
     *
     * @example
     * {@includeCode ../../../examples/TextmodeFont/textureRows/sketch.js}
     */
    get textureRows(): number;
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
