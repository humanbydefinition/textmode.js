import type { GLFramebuffer } from '../../rendering/webgl/core/Framebuffer.ts';
import { Disposable } from '../../utils/Disposable.ts';
import type { TextmodeGlyph } from './types.ts';
/**
 * Vector font glyph source for textmode rendering.
 *
 * Fonts are loaded from TrueType/OpenType/WOFF data, converted into a normalized
 * glyph atlas, and used by {@link layering.TextmodeLayer} during the ASCII resolve pass.
 *
 * @example
 * {@includeCode ../../../examples/TextmodeFont/creation/sketch.js}
 *
 * @see {@link https://code.textmode.art/api/textmode.js/namespaces/fonts/classes/TextmodeFont | fonts.TextmodeFont API reference}
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
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/fonts/classes/TextmodeFont/methods/dispose | fonts.TextmodeFont.dispose API reference}
     */
    dispose(): void;
    /**
     * Normalized glyph atlas framebuffer used by the ASCII shader.
     *
     * @example
     * {@includeCode ../../../examples/TextmodeFont/framebuffer/sketch.js}
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/fonts/classes/TextmodeFont/accessors/framebuffer | fonts.TextmodeFont.framebuffer API reference}
     */
    get framebuffer(): GLFramebuffer;
    /**
     * Character-to-glyph lookup map.
     *
     * @example
     * {@includeCode ../../../examples/TextmodeFont/characterMap/sketch.js}
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/fonts/classes/TextmodeFont/accessors/characterMap | fonts.TextmodeFont.characterMap API reference}
     */
    get characterMap(): Map<string, TextmodeGlyph>;
    /**
     * Unicode glyphs available in this font.
     *
     * @example
     * {@includeCode ../../../examples/TextmodeFont/characters/sketch.js}
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/fonts/classes/TextmodeFont/accessors/characters | fonts.TextmodeFont.characters API reference}
     */
    get characters(): readonly TextmodeGlyph[];
    /**
     * Number of columns in the glyph atlas.
     *
     * @example
     * {@includeCode ../../../examples/TextmodeFont/textureColumns/sketch.js}
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/fonts/classes/TextmodeFont/accessors/textureColumns | fonts.TextmodeFont.textureColumns API reference}
     */
    get textureColumns(): number;
    /**
     * Number of rows in the glyph atlas.
     *
     * @example
     * {@includeCode ../../../examples/TextmodeFont/textureRows/sketch.js}
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/fonts/classes/TextmodeFont/accessors/textureRows | fonts.TextmodeFont.textureRows API reference}
     */
    get textureRows(): number;
    /**
     * Maximum glyph cell dimensions in pixels.
     *
     * @example
     * {@includeCode ../../../examples/TextmodeFont/maxGlyphDimensions/sketch.js}
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/fonts/classes/TextmodeFont/accessors/maxGlyphDimensions | fonts.TextmodeFont.maxGlyphDimensions API reference}
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
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/fonts/classes/TextmodeFont/accessors/fontSize | fonts.TextmodeFont.fontSize API reference}
     */
    get fontSize(): number;
    /**
     * Implementation-specific parsed font data.
     *
     * This value is exposed for advanced inspection only. Its shape may change
     * when the internal font parser changes.
     *
     * @example
     * {@includeCode ../../../examples/TextmodeFont/font/sketch.js}
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/fonts/classes/TextmodeFont/accessors/font | fonts.TextmodeFont.font API reference}
     */
    get font(): unknown;
}
