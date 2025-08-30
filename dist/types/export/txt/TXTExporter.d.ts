import type { TXTExportOptions, TextmodeRenderingData } from './types';
/**
 * Main TXT exporter for the textmode.js library.
 * Orchestrates the TXT export process by coordinating data extraction,
 * content generation, and file handling.
 */
export declare class TXTExporter {
    private _dataExtractor;
    private _contentGenerator;
    private _fileHandler;
    constructor();
    /**
     * Applies default values to TXT export options
     * @param options User-provided options
     * @returns Complete options with defaults applied
     */
    private _applyDefaultOptions;
    /**
     * Generates TXT content from textmode rendering data without saving to file
     * @param renderingData The textmode rendering data containing pipeline, grid, and font
     * @param options Export options (excluding filename)
     * @returns TXT content as string
     */
    $generateTXT(renderingData: TextmodeRenderingData, options?: Omit<TXTExportOptions, 'filename'>): string;
    /**
     * Exports TXT content to a downloadable file
     * @param renderingData The textmode rendering data containing pipeline, grid, and font
     * @param options Export options including filename
     */
    $saveTXT(renderingData: TextmodeRenderingData, options?: TXTExportOptions): void;
}
