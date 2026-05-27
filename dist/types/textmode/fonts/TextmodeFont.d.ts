import type { GLFramebuffer } from '../../rendering/webgl/core/Framebuffer.ts';
import { Disposable } from '../../utils/Disposable.ts';
import type { TextmodeGlyph } from './types.ts';
import type { TyprFont } from './typr/types.ts';
/**
 * Vector font glyph source for textmode rendering.
 *
 * Fonts are loaded from TrueType/OpenType/WOFF data, converted into a normalized
 * glyph atlas, and used by {@link layering.TextmodeLayer} during ASCII conversion.
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
     * Initializes all font-dependent properties.
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
     * Normalized glyph atlas framebuffer used by the ASCII shader.
     *
     * @example
     * {@includeCode ../../../examples/TextmodeFont/framebuffer/sketch.js}
     */
    get framebuffer(): GLFramebuffer;
    /**
     * Character-to-glyph lookup map.
     *
     * @example
     * {@includeCode ../../../examples/TextmodeFont/characterMap/sketch.js}
     */
    get characterMap(): Map<string, TextmodeGlyph>;
    /**
     * Unicode glyphs available in this font.
     *
     * @example
     * {@includeCode ../../../examples/TextmodeFont/characters/sketch.js}
     */
    get characters(): readonly TextmodeGlyph[];
    /**
     * Number of columns in the glyph atlas.
     *
     * @example
     * {@includeCode ../../../examples/TextmodeFont/textureColumns/sketch.js}
     */
    get textureColumns(): number;
    /**
     * Number of rows in the glyph atlas.
     *
     * @example
     * {@includeCode ../../../examples/TextmodeFont/textureRows/sketch.js}
     */
    get textureRows(): number;
    /**
     * Maximum glyph cell dimensions in pixels.
     *
     * @example
     * {@includeCode ../../../examples/TextmodeFont/maxGlyphDimensions/sketch.js}
     */
    get maxGlyphDimensions(): {
        width: number;
        height: number;
    };
    /**
     * Font size used for the glyph atlas.
     *
     * @example
     * {@includeCode ../../../examples/TextmodeFont/fontSize/sketch.js}
     */
    get fontSize(): number;
    /**
     * Parsed Typr.js font object.
     *
     * @example
     * {@includeCode ../../../examples/TextmodeFont/font/sketch.js}
     */
    get font(): TyprFont;
}
