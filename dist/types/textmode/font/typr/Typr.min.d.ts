/**
 * TypeScript declarations for minified Typr.js
 */
import type { TyprFont } from '../types';
interface TyprStatic {
    parse: (buffer: ArrayBuffer) => TyprFont[];
    findTable: (data: Uint8Array, tableName: string, offset: number) => [number, number] | null;
    T: {
        glyf: {
            _parseGlyf: (font: TyprFont, glyphIndex: number) => any;
        };
        [tableName: string]: any;
    };
    B: {
        [methodName: string]: any;
    };
}
declare const Typr: TyprStatic;
export default Typr;
