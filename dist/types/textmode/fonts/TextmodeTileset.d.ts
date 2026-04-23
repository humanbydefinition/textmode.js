import { Disposable } from '../../utils/Disposable.ts';
import type { GLFramebuffer } from '../../rendering/webgl/core/Framebuffer.ts';
import type { TextmodeGlyph, TextmodeGlyphAtlas } from './types.ts';
/**
 * Manages a bitmap tileset as a normalized glyph atlas.
 *
 * Tiles are imported from a source sheet, repacked into the same contiguous atlas layout
 * used by vector fonts, and exposed through the shared glyph-atlas contract.
 *
 * `fontSize()` changes on a tileset only affect the effective output cell size.
 * The native atlas stays at the authored tile resolution.
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
     * Dispose the tileset and release its shared atlas resources.
     *
     * @example
     * {@includeCode ../../../examples/TextmodeTileset/dispose/sketch.js}
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
     * Returns the array of glyphs generated from the tileset mapping.
     *
     * @example
     * {@includeCode ../../../examples/TextmodeTileset/atlas/sketch.js}
     */
    get characters(): readonly TextmodeGlyph[];
    /**
     * Returns the character-to-glyph lookup map for the tileset.
     *
     * @example
     * {@includeCode ../../../examples/TextmodeTileset/atlas/sketch.js}
     */
    get characterMap(): Map<string, TextmodeGlyph>;
    /**
     * Returns the normalized glyph atlas framebuffer used by the ASCII shader.
     *
     * @example
     * {@includeCode ../../../examples/TextmodeTileset/atlas/sketch.js}
     */
    get framebuffer(): GLFramebuffer;
    /**
     * Returns the tileset atlas framebuffer backing this glyph atlas.
     *
     * @example
     * {@includeCode ../../../examples/TextmodeTileset/atlas/sketch.js}
     */
    get fontFramebuffer(): GLFramebuffer;
    /**
     * Returns the number of columns in the normalized glyph atlas.
     *
     * @example
     * {@includeCode ../../../examples/TextmodeTileset/atlas/sketch.js}
     */
    get columns(): number;
    /**
     * Returns the number of rows in the normalized glyph atlas.
     *
     * @example
     * {@includeCode ../../../examples/TextmodeTileset/atlas/sketch.js}
     */
    get rows(): number;
    /**
     * Returns the number of columns in the repacked tileset texture atlas.
     *
     * @example
     * {@includeCode ../../../examples/TextmodeTileset/atlas/sketch.js}
     */
    get textureColumns(): number;
    /**
     * Returns the number of rows in the repacked tileset texture atlas.
     *
     * @example
     * {@includeCode ../../../examples/TextmodeTileset/atlas/sketch.js}
     */
    get textureRows(): number;
    /**
     * Returns the authored tile dimensions from the source tileset in pixels.
     *
     * @example
     * {@includeCode ../../../examples/TextmodeTileset/dimensions/sketch.js}
     */
    get nativeCellDimensions(): {
        width: number;
        height: number;
    };
    /**
     * Returns the effective tile dimensions used by the layer grid.
     *
     * @example
     * {@includeCode ../../../examples/TextmodeTileset/dimensions/sketch.js}
     */
    get maxGlyphDimensions(): {
        width: number;
        height: number;
    };
    /**
     * Returns the effective tile cell dimensions used by the layer grid.
     *
     * @example
     * {@includeCode ../../../examples/TextmodeTileset/dimensions/sketch.js}
     */
    get cellDimensions(): {
        width: number;
        height: number;
    };
    /**
     * Returns the effective tile cell width used by the layer grid.
     *
     * @example
     * {@includeCode ../../../examples/TextmodeTileset/dimensions/sketch.js}
     */
    get cellWidth(): number;
    /**
     * Returns the effective tile cell height used by the layer grid.
     *
     * @example
     * {@includeCode ../../../examples/TextmodeTileset/dimensions/sketch.js}
     */
    get cellHeight(): number;
    /**
     * Returns the effective font size used to scale tileset cells.
     *
     * @example
     * {@includeCode ../../../examples/TextmodeTileset/dimensions/sketch.js}
     */
    get fontSize(): number;
}
