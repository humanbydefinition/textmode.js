import type { ImageExportOptions } from './types';
/**
 * Main image exporter for the textmode.js library.
 * Orchestrates the image export process by coordinating canvas capture,
 * format conversion, and file handling.
 */
export declare class ImageExporter {
    private dataExtractor;
    private contentGenerator;
    private fileHandler;
    constructor();
    /**
     * Applies default values to image export options
     * @param options User-provided options
     * @returns Complete options with defaults applied
     */
    private applyDefaultOptions;
    /**
     * Validates export options and browser support
     * @param options The options to validate
     * @throws Error if options are invalid or format is not supported
     */
    private validateOptions;
    /**
     * Generates image data from textmode rendering without saving to file
     * @param textmodifier The textmodifier instance containing the canvas
     * @param options Export options (excluding filename)
     * @returns Data URL string containing the image data
     */
    generateImage(textmodifier: any, options?: Omit<ImageExportOptions, 'filename'>): string;
    /**
     * Generates image blob from textmode rendering without saving to file
     * @param textmodifier The textmodifier instance containing the canvas
     * @param options Export options (excluding filename)
     * @returns Promise that resolves to a Blob containing the image data
     */
    generateImageBlob(textmodifier: any, options?: Omit<ImageExportOptions, 'filename'>): Promise<Blob>;
    /**
     * Exports image to a downloadable file
     * @param textmodifier The textmodifier instance containing the canvas
     * @param options Export options including filename
     */
    saveImage(textmodifier: any, options?: ImageExportOptions): Promise<void>;
}
