/**
 * TXT-specific type definitions for the textmode.js library.
 */
/**
 * Options for exporting the textmode content to TXT format.
 */
export type TXTExportOptions = {
    /**
     * The filename to save the TXT file as.
     *
     * If not provided, a default filename is used.
     */
    filename?: string;
    /**
     * Whether to preserve trailing spaces on each line.
     *
     * When `false`, trailing spaces are trimmed from each line.
     *
     * Default is `false`.
     */
    preserveTrailingSpaces?: boolean;
    /**
     * The line ending format to use *(`'lf'` for Unix/Linux, `'crlf'` for Windows)*.
     *
     * Default is `'lf'`.
     */
    lineEnding?: 'lf' | 'crlf';
    /**
     * Character to use for empty cells *(when no character is rendered)*.
     * Default is a space `' '`.
     */
    emptyCharacter?: string;
};
/**
 * Internal options used by TXT generation (with all defaults applied).
 */
export interface TXTGenerationOptions {
    preserveTrailingSpaces: boolean;
    lineEnding: 'lf' | 'crlf';
    emptyCharacter: string;
}
/**
 * Re-export shared types from SVG module that are also used by TXT exporter
 */
export type { FramebufferData } from '../svg/types';
