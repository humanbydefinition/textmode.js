import type { SVGExportOptions } from './types';
/**
 * Main SVG exporter for the textmode.js library.
 * Orchestrates the SVG export process by coordinating data extraction,
 * content generation, and file handling.
 */
export declare class SVGExporter {
    private _dataExtractor;
    private _contentGenerator;
    private _fileHandler;
    constructor();
    /**
     * Applies default values to SVG export options
     * @param options User-provided options
     * @returns Complete options with defaults applied
     */
    private _applyDefaultOptions;
    /**
     * Generates SVG content from textmode rendering data without saving to file
     * @param textmodifier The textmodifier instance containing rendering data
     * @param options Export options (excluding filename)
     * @returns SVG content as string
     */
    $generateSVG(textmodifier: any, options?: Omit<SVGExportOptions, 'filename'>): string;
    /**
     * Exports SVG content to a downloadable file
     * @param textmodifier The textmodifier instance containing rendering data
     * @param options Export options including filename
     */
    $saveSVG(textmodifier: any, options?: SVGExportOptions): void;
}
