import type { CmapEncodingRecord, CmapTableFormat4, CmapTableFormat12, TyprFont } from '../typr/types.ts';
type SupportedCmapTable = CmapTableFormat4 | CmapTableFormat12;
export type CmapTableSelection = {
    table: SupportedCmapTable;
    tableIndex: number;
    encodings: CmapEncodingRecord[];
    isUnicode: boolean;
};
/**
 * Returns true for cmap records whose character codes are Unicode code points.
 */
export declare function isUnicodeCmapEncoding(record: CmapEncodingRecord): boolean;
/**
 * Select cmap tables for public character extraction.
 *
 * Unicode-capable fonts expose only Unicode cmap mappings. Legacy/non-Unicode
 * tables are a compatibility fallback for fonts without a usable Unicode cmap.
 */
export declare function getCharacterCmapTables(font: TyprFont): CmapTableSelection[];
/**
 * Select cmap tables for Unicode glyph lookup.
 */
export declare function getLookupCmapTables(font: TyprFont): CmapTableSelection[];
export {};
