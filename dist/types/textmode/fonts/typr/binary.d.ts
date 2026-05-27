import type { TyprBinary as TyprBinaryContract } from './types.ts';
export declare const TyprBinary: TyprBinaryContract;
/** Align to 4-byte boundary. */
export declare function pad4(n: number): number;
export declare function writeUshort(buff: Uint8Array, p: number, n: number): void;
export declare function writeUint(buff: Uint8Array, p: number, n: number): void;
export declare function writeASCII(buff: Uint8Array, p: number, s: string): void;
export declare function calcTableChecksum(data: Uint8Array, offset: number, length: number): number;
export declare function calcFontChecksumAdjust(fontData: Uint8Array, headOffset: number): number;
