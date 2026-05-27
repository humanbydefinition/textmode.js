/**
 * Font utilities - centralized font processing functionality.
 *
 * This module provides shared utilities that eliminate code duplication
 * across the font system components.
 */
export { FontTableReader } from './FontTableReader.ts';
export { getCharacterCmapTables, getLookupCmapTables, isUnicodeCmapEncoding } from './CmapSelection.ts';
export type { CmapTableSelection } from './CmapSelection.ts';
