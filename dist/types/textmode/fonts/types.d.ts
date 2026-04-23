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
 */
export interface GlyphData extends GlyphOutlineData {
    /** Advance width of the character. */
    advanceWidth: number;
}
/**
 * Represents a single glyph entry in a textmode glyph atlas.
 */
export type TextmodeGlyph = {
    /** The character itself. */
    character: string;
    /** The Unicode code point of the character. */
    unicode: number;
    /** RGB-encoded glyph identity used by the render pipeline and exposed through character color lookups. */
    color: [number, number, number];
    /**
     * Glyph outline data including advance width and path information.
     *
     * Only available for {@link TextmodeFont} glyphs, not {@link TextmodeTileset} glyphs,
     * since tilesets use pre-rendered bitmap data instead of vector outlines.
     */
    glyphData?: GlyphData | null;
};
/**
 * Font glyph dimensions
 */
export interface GlyphDimensions {
    width: number;
    height: number;
}
/**
 * Backend-neutral glyph atlas contract used by the shared rendering pipeline.
 */
export interface TextmodeGlyphAtlas {
    readonly characters: readonly TextmodeGlyph[];
    readonly characterMap: Map<string, TextmodeGlyph>;
    readonly framebuffer: GLFramebuffer;
    readonly columns: number;
    readonly rows: number;
    readonly cellWidth: number;
    readonly cellHeight: number;
    readonly cellDimensions: GlyphDimensions;
    _getCharacterColor(character: string): [number, number, number];
    _getCharacterColors(characters: string): [number, number, number][];
}
/**
 * Configuration used to load a tileset image into a normalized glyph atlas.
 */
export interface TextmodeTilesetOptions {
    /** Source image or URL for the authored tileset sheet. */
    source: string | URL | CanvasImageSource;
    /** Number of columns in the authored tileset sheet. */
    columns: number;
    /** Number of rows in the authored tileset sheet. */
    rows: number;
    /** Optional number of tiles to import from the sheet. Defaults to `columns * rows`. */
    count?: number;
    /** Optional uniform outer margin in pixels. */
    margin?: number;
    /** Optional horizontal outer margin in pixels. Overrides `margin` for the x axis. */
    marginX?: number;
    /** Optional vertical outer margin in pixels. Overrides `margin` for the y axis. */
    marginY?: number;
    /** Optional uniform spacing between tiles in pixels. */
    spacing?: number;
    /** Optional horizontal spacing between tiles in pixels. Overrides `spacing` for the x axis. */
    spacingX?: number;
    /** Optional vertical spacing between tiles in pixels. Overrides `spacing` for the y axis. */
    spacingY?: number;
    /**
     * Optional explicit character mapping as a .char URL/path, inline grid string, or array of row strings.
     * When omitted, tiles are assigned sequentially starting at space (`32`).
     */
    map?: string | URL | string[];
    /** Optional effective output cell height. Defaults to the native tile height. */
    fontSize?: number;
}
