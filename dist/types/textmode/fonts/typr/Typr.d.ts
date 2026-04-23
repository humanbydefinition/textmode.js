/**
 * Typr.ts - TypeScript Font Parsing Library for textmode.js
 *
 * A comprehensive TypeScript implementation of font parsing capabilities
 * for OpenType and TrueType fonts. Provides essential functionality including
 * character mapping, glyph data extraction, and font metrics processing.
 *
 * Originally based on Typr.js by photopea (https://github.com/photopea/Typr.js)
 * Rewritten in TypeScript with enhanced type safety and optimizations for textmode.js
 *
 * @license MIT
 */
import type { TyprStatic } from './types';
declare function woffToOtfSync(buff: ArrayBuffer): ArrayBuffer;
/**
 * Main Typr class implementation
 */
declare const Typr: TyprStatic;
export default Typr;
export declare const convertWoffToOtf: typeof woffToOtfSync;
