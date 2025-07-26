/**
 * Represents a single character in the textmode font.
 */
export type TextmodeCharacter = {
    /** The character itself. */
    character: string;
    /** The Unicode code point of the character. */
    unicode: number;
    /** The RGB color associated with the character for identification. */
    color: [number, number, number];
    /** The advance width of the character. */
    advanceWidth: number;
};
/**
 * Interface for cmap table Format 4 (Basic Multilingual Plane)
 */
export interface CmapTableFormat4 {
    format: 4;
    startCount: number[];
    endCount: number[];
    idRangeOffset: number[];
    idDelta: number[];
    glyphIdArray?: number[];
}
/**
 * Interface for cmap table Format 12 (Extended Unicode ranges)
 */
export interface CmapTableFormat12 {
    format: 12;
    groups: number[];
}
/**
 * Union type for supported cmap table formats
 */
export type CmapTable = CmapTableFormat4 | CmapTableFormat12 | {
    format: number;
};
/**
 * Font glyph dimensions
 */
export interface GlyphDimensions {
    width: number;
    height: number;
}
/**
 * Head table from OpenType/TrueType font
 */
export interface HeadTable {
    fontRevision: number;
    flags: number;
    unitsPerEm: number;
    created: number;
    modified: number;
    xMin: number;
    yMin: number;
    xMax: number;
    yMax: number;
    macStyle: number;
    lowestRecPPEM: number;
    fontDirectionHint: number;
    indexToLocFormat: number;
    glyphDataFormat: number;
}
/**
 * Horizontal header table from OpenType/TrueType font
 */
export interface HheaTable {
    ascender: number;
    descender: number;
    lineGap: number;
    advanceWidthMax: number;
    minLeftSideBearing: number;
    minRightSideBearing: number;
    xMaxExtent: number;
    caretSlopeRise: number;
    caretSlopeRun: number;
    caretOffset: number;
    res0: number;
    res1: number;
    res2: number;
    res3: number;
    metricDataFormat: number;
    numberOfHMetrics: number;
}
/**
 * Horizontal metrics table from OpenType/TrueType font
 */
export interface HmtxTable {
    aWidth: number[];
    lsBearing: number[];
}
/**
 * Maximum profile table from OpenType/TrueType font
 */
export interface MaxpTable {
    numGlyphs: number;
}
/**
 * Character map data from OpenType/TrueType font
 */
export interface CmapData {
    tables: CmapTable[];
    ids: Record<string, number>;
    off: number;
}
/**
 * Glyph data structure for parsed glyphs
 */
export interface GlyphData {
    xs: number[];
    ys: number[];
    endPts: number[];
    flags: number[];
    xMin: number;
    yMin: number;
    xMax: number;
    yMax: number;
}
/**
 * Location table for glyph offsets
 */
export interface LocaTable {
    [glyphIndex: number]: number;
}
/**
 * Complete TyprFont interface representing a parsed OpenType/TrueType font
 * This interface describes the structure returned by Typr.parse()
 */
export interface TyprFont {
    /** Internal font data buffer */
    _data: Uint8Array;
    /** Font index in collection */
    _index: number;
    /** Font offset in data */
    _offset: number;
    /** Character map table */
    cmap: CmapData;
    /** Font header table */
    head: HeadTable;
    /** Horizontal header table */
    hhea: HheaTable;
    /** Horizontal metrics table */
    hmtx: HmtxTable;
    /** Maximum profile table */
    maxp: MaxpTable;
    /** Glyph location table (optional) */
    loca?: LocaTable;
    /** Glyph data table - stores parsed glyph data (optional, populated on demand) */
    glyf?: {
        [glyphIndex: number]: GlyphData | null;
    };
    /** Additional font tables that may be present */
    [tableName: string]: any;
}
