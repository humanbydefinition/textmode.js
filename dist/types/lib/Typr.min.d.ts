/**
 * Minimal Typr.js - TypeScript version
 * Contains only the functionality needed by FontManager
 *
 * Based on Typr.js (https://github.com/photopea/Typr.js)
 * Original work Copyright (c) 2015 Photopea
 *
 * This is a highly optimized, stripped-down version containing only:
 * parse, findTable, cmap, head, hhea, hmtx, maxp tables
 */
interface CmapTable {
    format: number;
    map?: number[];
    searchRange?: number;
    entrySelector?: number;
    rangeShift?: number;
    endCount?: number[];
    startCount?: number[];
    idDelta?: number[];
    idRangeOffset?: number[];
    glyphIdArray?: number[];
    firstCode?: number;
    groups?: Uint32Array;
}
interface CmapData {
    tables: CmapTable[];
    ids: Record<string, number>;
    off: number;
}
interface HeadTable {
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
interface HheaTable {
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
interface HmtxTable {
    aWidth: number[];
    lsBearing: number[];
}
interface MaxpTable {
    numGlyphs: number;
}
export interface TyprFont {
    _data: Uint8Array;
    _index: number;
    _offset: number;
    cmap: CmapData;
    head: HeadTable;
    hhea: HheaTable;
    hmtx: HmtxTable;
    maxp: MaxpTable;
}
declare const _default: {
    parse: (buffer: ArrayBuffer) => TyprFont[];
    findTable: (data: Uint8Array, tableName: string, offset: number) => [number, number] | null;
};
export default _default;
