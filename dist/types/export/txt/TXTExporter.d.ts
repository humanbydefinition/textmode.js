import type { TXTExportOptions } from './types';
/**
 * Main TXT exporter for the textmode.js library.
 * Orchestrates the TXT export process by coordinating data extraction,
 * content generation, and file handling.
 */
export declare class TXTExporter {
    private dataExtractor;
    private contentGenerator;
    private fileHandler;
    constructor();
    /**
     * Applies default values to TXT export options
     * @param options User-provided options
     * @returns Complete options with defaults applied
     */
    private applyDefaultOptions;
    /**
     * Generates TXT content from textmode rendering data without saving to file
     * @param textmodifier The textmodifier instance containing rendering data
     * @param options Export options (excluding filename)
     * @returns TXT content as string
     */
    generateTXT(textmodifier: any, options?: Omit<TXTExportOptions, 'filename'>): string;
    /**
     * Exports TXT content to a downloadable file
     * @param textmodifier The textmodifier instance containing rendering data
     * @param options Export options including filename
     */
    saveTXT(textmodifier: any, options?: TXTExportOptions): void;
}
