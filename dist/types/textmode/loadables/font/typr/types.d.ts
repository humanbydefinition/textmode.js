/**
 * Type definitions for Typr.js - Font parsing library
 *
 * Comprehensive TypeScript types for all Typr font parsing structures,
 * tables, and interfaces used throughout the font processing pipeline.
 */
/**
 * Binary reading utilities interface
 */
export interface TyprBinary {
    /** Read signed 16-bit integer */
    readShort: (buff: Uint8Array, p: number) => number;
    /** Read unsigned 16-bit integer */
    readUshort: (buff: Uint8Array, p: number) => number;
    /** Read array of unsigned 16-bit integers */
    readUshorts: (buff: Uint8Array, p: number, len: number) => number[];
    /** Read unsigned 32-bit integer */
    readUint: (buff: Uint8Array, p: number) => number;
    /** Read ASCII string */
    readASCII: (buff: Uint8Array, p: number, l: number) => string;
    /** Shared typed array buffers for efficient reading */
    t: {
        uint8: Uint8Array;
        int16: Int16Array;
        uint16: Uint16Array;
        uint32: Uint32Array;
    };
}
/**
 * Interface for cmap table Format 4 (Basic Multilingual Plane)
 * Used for Unicode BMP character mapping
 */
export interface CmapTableFormat4 {
    format: 4;
    searchRange: number;
    entrySelector: number;
    rangeShift: number;
    startCount: number[];
    endCount: number[];
    idRangeOffset: number[];
    idDelta: number[];
    glyphIdArray: number[];
}
/**
 * Interface for cmap table Format 12 (Extended Unicode ranges)
 * Used for full Unicode character mapping including supplementary planes
 */
export interface CmapTableFormat12 {
    format: 12;
    groups: Uint32Array;
}
/**
 * Union type for supported cmap table formats
 */
export type CmapTable = CmapTableFormat4 | CmapTableFormat12 | {
    format: number;
};
/**
 * Character map data from OpenType/TrueType font
 * Contains multiple encoding tables and platform-specific mappings
 */
export interface CmapData {
    /** Array of character mapping tables */
    tables: CmapTable[];
    /** Platform+encoding ID mappings to table indices */
    ids: Record<string, number>;
    /** Offset of cmap table in font data */
    off: number;
}
/**
 * Head table from OpenType/TrueType font
 * Contains global font metrics and metadata
 */
export interface HeadTable {
    /** Units per EM square */
    unitsPerEm: number;
    /** Minimum x coordinate across all glyphs */
    xMin: number;
    /** Minimum y coordinate across all glyphs */
    yMin: number;
    /** Maximum x coordinate across all glyphs */
    xMax: number;
    /** Maximum y coordinate across all glyphs */
    yMax: number;
    /** Format of location table (0 = short, 1 = long) */
    indexToLocFormat: number;
}
/**
 * Horizontal header table from OpenType/TrueType font
 * Contains horizontal layout metrics
 */
export interface HheaTable {
    /** Typographic ascender */
    ascender: number;
    /** Typographic descender */
    descender: number;
    /** Typographic line gap */
    lineGap: number;
    /** Maximum advance width */
    advanceWidthMax: number;
    /** Minimum left side bearing */
    minLeftSideBearing: number;
    /** Minimum right side bearing */
    minRightSideBearing: number;
    /** Maximum extent */
    xMaxExtent: number;
    /** Caret slope rise */
    caretSlopeRise: number;
    /** Caret slope run */
    caretSlopeRun: number;
    /** Caret offset */
    caretOffset: number;
    /** Reserved fields */
    res0: number;
    res1: number;
    res2: number;
    res3: number;
    /** Metric data format */
    metricDataFormat: number;
    /** Number of horizontal metrics */
    numberOfHMetrics: number;
}
/**
 * Horizontal metrics table from OpenType/TrueType font
 * Contains advance widths and left side bearings for all glyphs
 */
export interface HmtxTable {
    /** Array of advance widths for each glyph */
    aWidth: number[];
    /** Array of left side bearings for each glyph */
    lsBearing: number[];
}
/**
 * Maximum profile table from OpenType/TrueType font
 * Contains the number of glyphs and other maximums
 */
export interface MaxpTable {
    /** Total number of glyphs in the font */
    numGlyphs: number;
}
/**
 * Location table for glyph offsets
 * Maps glyph indices to their byte offsets in the glyf table
 */
export type LocaTable = number[];
/**
 * Glyph data structure for parsed glyphs
 * Contains the actual glyph outline data
 */
export interface GlyphData {
    /** Number of contours (-1 for composite glyphs) */
    noc: number;
    /** Bounding box coordinates */
    xMin: number;
    yMin: number;
    xMax: number;
    yMax: number;
    /** End points of each contour */
    endPts: number[];
    /** Point flags indicating curve/line segments */
    flags: number[];
    /** X coordinates of all points */
    xs: number[];
    /** Y coordinates of all points */
    ys: number[];
    /** Composite glyph parts (for composite glyphs) */
    parts?: any[];
}
/**
 * Font table parser interface
 * Each table parser implements this interface
 */
export interface TableParser<T = any> {
    parseTab: (data: Uint8Array, offset: number, length: number, font: TyprFont) => T;
}
/**
 * Extended cmap parser with format-specific methods
 */
export interface CmapParser extends TableParser<CmapData> {
    parse4: (data: Uint8Array, offset: number) => CmapTableFormat4;
    parse12: (data: Uint8Array, offset: number) => CmapTableFormat12;
}
/**
 * Collection of all table parsers
 */
export interface TyprTableParsers {
    cmap: CmapParser;
    head: TableParser<HeadTable>;
    hhea: TableParser<HheaTable>;
    maxp: TableParser<MaxpTable>;
    hmtx: TableParser<HmtxTable>;
    loca: TableParser<LocaTable>;
    glyf: TableParser<(GlyphData | null)[]> & {
        _parseGlyf: (font: TyprFont, glyphIndex: number) => GlyphData | null;
    };
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
    /** Glyph location table */
    loca: LocaTable;
    /** Glyph data table - stores parsed glyph data (populated on demand) */
    glyf: (GlyphData | null)[];
    /** Additional font tables that may be present */
    [tableName: string]: any;
}
/**
 * Main Typr interface
 * Provides font parsing and table lookup functionality
 */
export interface TyprStatic {
    /** Parse font buffer and return array of fonts */
    parse: (buffer: ArrayBuffer) => TyprFont[];
    /** Find a specific table in font data */
    findTable: (data: Uint8Array, tableName: string, offset: number) => [number, number] | null;
    /** Collection of table parsers */
    T: TyprTableParsers;
    /** Binary reading utilities */
    B: TyprBinary;
}
