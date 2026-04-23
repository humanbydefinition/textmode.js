import type { CmapTableFormat4 } from '../typr/types';
/**
 * Calculates the glyph index for a character in a Format 4 cmap table.
 * Shared logic used by both character extraction and runtime lookup.
 *
 * @param table The Format 4 cmap table
 * @param codePoint The unicode code point
 * @param segIndex The segment index (already found by binary search or iteration)
 * @returns The glyph index, or 0 if not found
 */
export declare function getGlyphIndexFormat4(table: CmapTableFormat4, codePoint: number, segIndex: number): number;
