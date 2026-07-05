import { Disposable } from '../../utils/Disposable.ts';
import type { GLFramebuffer } from '../../rendering/webgl/core/Framebuffer.ts';
import type { TextmodeGlyph, TextmodeGlyphAtlas } from './types.ts';
/**
 * Bitmap tileset glyph source for textmode rendering.
 *
 * Tiles are imported from a source sheet, repacked into the same contiguous atlas layout
 * used by vector fonts, and exposed through the shared glyph-atlas contract.
 *
 * `fontSize()` changes on a tileset only affect the effective output cell size.
 * The native atlas stays at the authored tile resolution.
 *
 * @example
 * {@includeCode ../../../examples/TextmodeTileset/creation/sketch.js}
 *
 * @see {@link https://code.textmode.art/api/textmode.js/namespaces/fonts/classes/TextmodeTileset | fonts.TextmodeTileset API reference}
 */
export declare class TextmodeTileset extends Disposable implements TextmodeGlyphAtlas {
    private static readonly _atlasCache;
    private static readonly _objectIds;
    private static _nextObjectId;
    private _renderer;
    private _textureAtlas;
    private _characters;
    private _characterMap;
    private _nativeCellDimensions;
    private _cellDimensions;
    private _fontSize;
    private _source?;
    private _layout?;
    private _options?;
    private _sharedAtlas?;
    /**
     * Dispose the tileset and release its shared atlas resources.
     *
     * @example
     * {@includeCode ../../../examples/TextmodeTileset/dispose/sketch.js}
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/fonts/classes/TextmodeTileset/methods/dispose | fonts.TextmodeTileset.dispose API reference}
     */
    dispose(): void;
    private _retainSharedAtlas;
    private _releaseSharedAtlas;
    private _createAtlasCacheKey;
    private _getCacheSourceKey;
    private _getCacheMappingKey;
    private _getSharedAtlasRecord;
    private static _getOrCreateAtlasCache;
    private static _getObjectId;
    private _loadSource;
    private _resolveCharacterMapping;
    private _loadMapRows;
    private _flattenMapRows;
    private _createAutoAssignedCharacters;
    private _fetchMap;
    private _splitMapText;
    private _shouldTreatStringMapAsInline;
    private _looksLikeResourcePath;
    private _getSourceDimensions;
    private _resolveLayout;
    private _resolveTileCount;
    private _validateAutoAssignedCharacterRange;
    private _validateUniqueCharacters;
    private _formatCharacterForError;
    private _createGlyphs;
    private _encodeGlyphSlot;
    private _syncCellDimensions;
    /**
     * Glyphs generated from the tileset mapping.
     *
     * @example
     * {@includeCode ../../../examples/TextmodeTileset/characters/sketch.js}
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/fonts/classes/TextmodeTileset/accessors/characters | fonts.TextmodeTileset.characters API reference}
     */
    get characters(): readonly TextmodeGlyph[];
    /**
     * Character-to-glyph lookup map for the tileset.
     *
     * @example
     * {@includeCode ../../../examples/TextmodeTileset/characterMap/sketch.js}
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/fonts/classes/TextmodeTileset/accessors/characterMap | fonts.TextmodeTileset.characterMap API reference}
     */
    get characterMap(): Map<string, TextmodeGlyph>;
    /**
     * Normalized glyph atlas framebuffer used by the ASCII shader.
     *
     * @example
     * {@includeCode ../../../examples/TextmodeTileset/framebuffer/sketch.js}
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/fonts/classes/TextmodeTileset/accessors/framebuffer | fonts.TextmodeTileset.framebuffer API reference}
     */
    get framebuffer(): GLFramebuffer;
    /**
     * Tileset atlas framebuffer backing this glyph atlas.
     *
     * @example
     * {@includeCode ../../../examples/TextmodeTileset/fontFramebuffer/sketch.js}
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/fonts/classes/TextmodeTileset/accessors/fontFramebuffer | fonts.TextmodeTileset.fontFramebuffer API reference}
     */
    get fontFramebuffer(): GLFramebuffer;
    /**
     * Number of columns in the normalized glyph atlas.
     *
     * @example
     * {@includeCode ../../../examples/TextmodeTileset/columns/sketch.js}
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/fonts/classes/TextmodeTileset/accessors/columns | fonts.TextmodeTileset.columns API reference}
     */
    get columns(): number;
    /**
     * Number of rows in the normalized glyph atlas.
     *
     * @example
     * {@includeCode ../../../examples/TextmodeTileset/rows/sketch.js}
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/fonts/classes/TextmodeTileset/accessors/rows | fonts.TextmodeTileset.rows API reference}
     */
    get rows(): number;
    /**
     * Number of columns in the repacked tileset atlas.
     *
     * @example
     * {@includeCode ../../../examples/TextmodeTileset/textureColumns/sketch.js}
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/fonts/classes/TextmodeTileset/accessors/textureColumns | fonts.TextmodeTileset.textureColumns API reference}
     */
    get textureColumns(): number;
    /**
     * Number of rows in the repacked tileset atlas.
     *
     * @example
     * {@includeCode ../../../examples/TextmodeTileset/textureRows/sketch.js}
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/fonts/classes/TextmodeTileset/accessors/textureRows | fonts.TextmodeTileset.textureRows API reference}
     */
    get textureRows(): number;
    /**
     * Authored tile dimensions from the source tileset in pixels.
     *
     * @example
     * {@includeCode ../../../examples/TextmodeTileset/nativeCellDimensions/sketch.js}
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/fonts/classes/TextmodeTileset/accessors/nativeCellDimensions | fonts.TextmodeTileset.nativeCellDimensions API reference}
     */
    get nativeCellDimensions(): {
        width: number;
        height: number;
    };
    /**
     * Effective tile dimensions used by the layer grid.
     *
     * @example
     * {@includeCode ../../../examples/TextmodeTileset/maxGlyphDimensions/sketch.js}
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/fonts/classes/TextmodeTileset/accessors/maxGlyphDimensions | fonts.TextmodeTileset.maxGlyphDimensions API reference}
     */
    get maxGlyphDimensions(): {
        width: number;
        height: number;
    };
    /**
     * Effective tile cell dimensions used by the layer grid.
     *
     * @example
     * {@includeCode ../../../examples/TextmodeTileset/cellDimensions/sketch.js}
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/fonts/classes/TextmodeTileset/accessors/cellDimensions | fonts.TextmodeTileset.cellDimensions API reference}
     */
    get cellDimensions(): {
        width: number;
        height: number;
    };
    /**
     * Effective tile cell width used by the layer grid.
     *
     * @example
     * {@includeCode ../../../examples/TextmodeTileset/cellWidth/sketch.js}
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/fonts/classes/TextmodeTileset/accessors/cellWidth | fonts.TextmodeTileset.cellWidth API reference}
     */
    get cellWidth(): number;
    /**
     * Effective tile cell height used by the layer grid.
     *
     * @example
     * {@includeCode ../../../examples/TextmodeTileset/cellHeight/sketch.js}
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/fonts/classes/TextmodeTileset/accessors/cellHeight | fonts.TextmodeTileset.cellHeight API reference}
     */
    get cellHeight(): number;
    /**
     * Effective font size used to scale tileset cells.
     *
     * @example
     * {@includeCode ../../../examples/TextmodeTileset/fontSize/sketch.js}
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/fonts/classes/TextmodeTileset/accessors/fontSize | fonts.TextmodeTileset.fontSize API reference}
     */
    get fontSize(): number;
}
