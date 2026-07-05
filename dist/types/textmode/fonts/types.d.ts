import type { GLFramebuffer } from '../../rendering/webgl/core/Framebuffer.ts';
/**
 * Base glyph outline data shared with the internal font parser.
 */
export interface GlyphOutlineData {
    /** Number of contours (`-1` for composite glyphs). */
    noc: number;
    /** Minimum x coordinate of the glyph bounds. */
    xMin: number;
    /** Minimum y coordinate of the glyph bounds. */
    yMin: number;
    /** Maximum x coordinate of the glyph bounds. */
    xMax: number;
    /** Maximum y coordinate of the glyph bounds. */
    yMax: number;
    /** End point indices for each contour. */
    endPts: number[];
    /** Point flags describing curve and line segments. */
    flags: number[];
    /** X coordinates for all outline points. */
    xs: number[];
    /** Y coordinates for all outline points. */
    ys: number[];
    /** Composite glyph parts, when present. */
    parts?: unknown[];
}
/**
 * Glyph outline data for a character *({@link TextmodeFont} only)*.
 *
 * @see {@link https://code.textmode.art/api/textmode.js/namespaces/fonts/interfaces/GlyphData | fonts.GlyphData API reference}
 */
export interface GlyphData extends GlyphOutlineData {
    /**
     * Advance width of the character.
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/fonts/interfaces/GlyphData#advancewidth | fonts.GlyphData.advanceWidth API reference}
     */
    advanceWidth: number;
}
/**
 * Represents a single glyph entry in a textmode glyph atlas.
 *
 * @see {@link https://code.textmode.art/api/textmode.js/namespaces/fonts/type-aliases/TextmodeGlyph | fonts.TextmodeGlyph API reference}
 */
export type TextmodeGlyph = {
    /**
     * The Unicode character used to address this glyph.
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/fonts/type-aliases/TextmodeGlyph#character | fonts.TextmodeGlyph.character API reference}
     */
    character: string;
    /**
     * The Unicode code point of the character.
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/fonts/type-aliases/TextmodeGlyph#unicode | fonts.TextmodeGlyph.unicode API reference}
     */
    unicode: number;
    /**
     * RGB-encoded glyph identity used by the render pipeline and exposed through character color lookups.
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/fonts/type-aliases/TextmodeGlyph#color | fonts.TextmodeGlyph.color API reference}
     */
    color: [number, number, number];
    /**
     * Glyph outline data including advance width and path information.
     *
     * Only available for {@link TextmodeFont} glyphs, not {@link TextmodeTileset} glyphs,
     * since tilesets use pre-rendered bitmap data instead of vector outlines.
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/fonts/type-aliases/TextmodeGlyph#glyphdata | fonts.TextmodeGlyph.glyphData API reference}
     */
    glyphData?: GlyphData | null;
};
/**
 * Glyph cell dimensions in pixels.
 *
 * @see {@link https://code.textmode.art/api/textmode.js/namespaces/fonts/interfaces/GlyphDimensions | fonts.GlyphDimensions API reference}
 */
export interface GlyphDimensions {
    /**
     * Width of a glyph cell in pixels.
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/fonts/interfaces/GlyphDimensions#width | fonts.GlyphDimensions.width API reference}
     */
    width: number;
    /**
     * Height of a glyph cell in pixels.
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/fonts/interfaces/GlyphDimensions#height | fonts.GlyphDimensions.height API reference}
     */
    height: number;
}
/**
 * Backend-neutral glyph atlas contract used by the shared rendering pipeline.
 *
 * @see {@link https://code.textmode.art/api/textmode.js/namespaces/fonts/interfaces/TextmodeGlyphAtlas | fonts.TextmodeGlyphAtlas API reference}
 */
export interface TextmodeGlyphAtlas {
    /**
     * Ordered glyph entries available in this atlas.
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/fonts/interfaces/TextmodeGlyphAtlas#characters | fonts.TextmodeGlyphAtlas.characters API reference}
     */
    readonly characters: readonly TextmodeGlyph[];
    /**
     * Lookup table from character string to glyph entry.
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/fonts/interfaces/TextmodeGlyphAtlas#charactermap | fonts.TextmodeGlyphAtlas.characterMap API reference}
     */
    readonly characterMap: Map<string, TextmodeGlyph>;
    /**
     * Framebuffer containing the atlas texture data.
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/fonts/interfaces/TextmodeGlyphAtlas#framebuffer | fonts.TextmodeGlyphAtlas.framebuffer API reference}
     */
    readonly framebuffer: GLFramebuffer;
    /**
     * Number of glyph columns in the atlas texture.
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/fonts/interfaces/TextmodeGlyphAtlas#columns | fonts.TextmodeGlyphAtlas.columns API reference}
     */
    readonly columns: number;
    /**
     * Number of glyph rows in the atlas texture.
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/fonts/interfaces/TextmodeGlyphAtlas#rows | fonts.TextmodeGlyphAtlas.rows API reference}
     */
    readonly rows: number;
    /**
     * Width of each glyph cell in pixels.
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/fonts/interfaces/TextmodeGlyphAtlas#cellwidth | fonts.TextmodeGlyphAtlas.cellWidth API reference}
     */
    readonly cellWidth: number;
    /**
     * Height of each glyph cell in pixels.
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/fonts/interfaces/TextmodeGlyphAtlas#cellheight | fonts.TextmodeGlyphAtlas.cellHeight API reference}
     */
    readonly cellHeight: number;
    /**
     * Combined glyph cell dimensions in pixels.
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/fonts/interfaces/TextmodeGlyphAtlas#celldimensions | fonts.TextmodeGlyphAtlas.cellDimensions API reference}
     */
    readonly cellDimensions: GlyphDimensions;
}
/**
 * Configuration used to load a tileset image into a normalized glyph atlas.
 *
 * @see {@link https://code.textmode.art/api/textmode.js/namespaces/fonts/interfaces/TextmodeTilesetOptions | fonts.TextmodeTilesetOptions API reference}
 */
export interface TextmodeTilesetOptions {
    /**
     * Source image or URL for the authored tileset sheet.
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/fonts/interfaces/TextmodeTilesetOptions#source | fonts.TextmodeTilesetOptions.source API reference}
     */
    source: string | URL | CanvasImageSource;
    /**
     * Number of columns in the authored tileset sheet.
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/fonts/interfaces/TextmodeTilesetOptions#columns | fonts.TextmodeTilesetOptions.columns API reference}
     */
    columns: number;
    /**
     * Number of rows in the authored tileset sheet.
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/fonts/interfaces/TextmodeTilesetOptions#rows | fonts.TextmodeTilesetOptions.rows API reference}
     */
    rows: number;
    /**
     * Optional number of tiles to import from the sheet. Defaults to `columns * rows`.
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/fonts/interfaces/TextmodeTilesetOptions#count | fonts.TextmodeTilesetOptions.count API reference}
     */
    count?: number;
    /**
     * Optional uniform outer margin in pixels.
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/fonts/interfaces/TextmodeTilesetOptions#margin | fonts.TextmodeTilesetOptions.margin API reference}
     */
    margin?: number;
    /**
     * Optional horizontal outer margin in pixels. Overrides `margin` for the x axis.
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/fonts/interfaces/TextmodeTilesetOptions#marginx | fonts.TextmodeTilesetOptions.marginX API reference}
     */
    marginX?: number;
    /**
     * Optional vertical outer margin in pixels. Overrides `margin` for the y axis.
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/fonts/interfaces/TextmodeTilesetOptions#marginy | fonts.TextmodeTilesetOptions.marginY API reference}
     */
    marginY?: number;
    /**
     * Optional uniform spacing between tiles in pixels.
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/fonts/interfaces/TextmodeTilesetOptions#spacing | fonts.TextmodeTilesetOptions.spacing API reference}
     */
    spacing?: number;
    /**
     * Optional horizontal spacing between tiles in pixels. Overrides `spacing` for the x axis.
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/fonts/interfaces/TextmodeTilesetOptions#spacingx | fonts.TextmodeTilesetOptions.spacingX API reference}
     */
    spacingX?: number;
    /**
     * Optional vertical spacing between tiles in pixels. Overrides `spacing` for the y axis.
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/fonts/interfaces/TextmodeTilesetOptions#spacingy | fonts.TextmodeTilesetOptions.spacingY API reference}
     */
    spacingY?: number;
    /**
     * Optional explicit character mapping as a .char URL/path, inline grid string, or array of row strings.
     * When omitted, tiles are assigned sequentially starting at space (`32`).
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/fonts/interfaces/TextmodeTilesetOptions#map | fonts.TextmodeTilesetOptions.map API reference}
     */
    map?: string | URL | string[];
    /**
     * Optional effective output cell height. Defaults to the native tile height.
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/fonts/interfaces/TextmodeTilesetOptions#fontsize | fonts.TextmodeTilesetOptions.fontSize API reference}
     */
    fontSize?: number;
}
