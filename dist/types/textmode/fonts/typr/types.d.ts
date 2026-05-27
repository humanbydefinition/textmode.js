import type { GlyphOutlineData } from '../types.ts';
/**
 * Type definitions for the internal Typr font parser.
 */
/**
 * Big-endian binary readers and their shared scratch buffer.
 */
export interface TyprBinary {
    readShort: (buff: Uint8Array, p: number) => number;
    readUshort: (buff: Uint8Array, p: number) => number;
    readUshorts: (buff: Uint8Array, p: number, len: number) => number[];
    readUint: (buff: Uint8Array, p: number) => number;
    readASCII: (buff: Uint8Array, p: number, l: number) => string;
    t: {
        uint8: Uint8Array;
        int16: Int16Array;
        uint16: Uint16Array;
        uint32: Uint32Array;
    };
}
/**
 * Mapping metadata for one cmap encoding record.
 */
export interface CmapEncodingRecord {
    /** OpenType platform ID. */
    platformID: number;
    /** OpenType platform-specific encoding ID. */
    encodingID: number;
    /** Cmap subtable format. */
    format: number;
    /** Index into the deduplicated `cmap.tables` array. */
    tableIndex: number;
}
/**
 * Shared metadata carried by parsed cmap subtables.
 */
export interface CmapTableMetadata {
    /** Encoding records that reference this deduplicated subtable. */
    encodings?: CmapEncodingRecord[];
}
/**
 * cmap format 4, used for Basic Multilingual Plane mappings.
 */
export interface CmapTableFormat4 extends CmapTableMetadata {
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
 * cmap format 12, used for full Unicode mappings including supplementary planes.
 */
export interface CmapTableFormat12 extends CmapTableMetadata {
    format: 12;
    groups: Uint32Array;
}
/**
 * Supported cmap table formats.
 */
export type CmapTable = CmapTableFormat4 | CmapTableFormat12 | (CmapTableMetadata & {
    format: number;
});
/**
 * Character map data from an OpenType/TrueType font.
 */
export interface CmapData {
    /** Array of character mapping tables */
    tables: CmapTable[];
    /** Platform+encoding ID mappings to table indices */
    ids: Record<string, number>;
    /** Encoding records for the deduplicated cmap tables. */
    encodings?: CmapEncodingRecord[];
    /** Offset of cmap table in font data */
    off: number;
}
/**
 * Global font metrics and metadata from the `head` table.
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
 * Horizontal layout metrics from the `hhea` table.
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
 * Advance widths and left side bearings from the `hmtx` table.
 */
export interface HmtxTable {
    /** Array of advance widths for each glyph */
    aWidth: number[];
    /** Array of left side bearings for each glyph */
    lsBearing: number[];
}
/**
 * Glyph-count data from the `maxp` table.
 */
export interface MaxpTable {
    /** Total number of glyphs in the font */
    numGlyphs: number;
}
/**
 * Glyph offsets into the `glyf` table.
 */
export type LocaTable = number[];
/**
 * Parser contract for a single font table.
 */
export interface TableParser<T = unknown> {
    parseTab: (data: Uint8Array, offset: number, length: number, font: TyprFont) => T;
}
/**
 * cmap parser with format-specific methods.
 */
export interface CmapParser extends TableParser<CmapData> {
    parse4: (data: Uint8Array, offset: number) => CmapTableFormat4;
    parse12: (data: Uint8Array, offset: number) => CmapTableFormat12;
}
/**
 * Parser collection keyed by table tag.
 */
export interface TyprTableParsers {
    cmap: CmapParser;
    head: TableParser<HeadTable>;
    hhea: TableParser<HheaTable>;
    maxp: TableParser<MaxpTable>;
    hmtx: TableParser<HmtxTable>;
    loca: TableParser<LocaTable>;
    glyf: TableParser<(GlyphOutlineData | null)[]> & {
        _parseGlyf: (font: TyprFont, glyphIndex: number) => GlyphOutlineData | null;
    };
}
/**
 * Parsed OpenType/TrueType sfnt font returned by `Typr.parse()`.
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
    glyf: (GlyphOutlineData | null)[];
}
/**
 * Union of parsed table values.
 */
export type TyprTableValue = TyprFont[keyof TyprTableParsers];
/**
 * Internal Typr parser surface.
 */
export interface TyprStatic {
    parse: (buffer: ArrayBuffer) => TyprFont[];
    findTable: (data: Uint8Array, tableName: string, offset: number) => [number, number] | null;
    T: TyprTableParsers;
    B: TyprBinary;
}
