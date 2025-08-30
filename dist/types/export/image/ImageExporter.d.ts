import type { ImageExportOptions } from './types';
import type { TextmodeCanvas } from '../../index';
/**
 * Main image exporter for the textmode.js library.
 * Orchestrates the image export process by coordinating canvas capture,
 * format conversion, and file handling.
 */
export declare class ImageExporter {
    private _dataExtractor;
    private _contentGenerator;
    private _fileHandler;
    constructor();
    /**
     * Applies default values to image export options
     * @param options User-provided options
     * @returns Complete options with defaults applied
     */
    private _applyDefaultOptions;
    /**
     * Validates export options and browser support
     * @param options The options to validate
     * @throws Error if options are invalid or format is not supported
     */
    private _validateOptions;
    /**
     * Generates image data from textmode rendering without saving to file
     * @param canvas The canvas data containing the rendered textmode graphics
     * @param options Export options (excluding filename)
     * @returns Data URL string containing the image data
     */
    $generateImage(canvas: TextmodeCanvas, options?: Omit<ImageExportOptions, 'filename'>): string;
    /**
     * Generates image blob from textmode rendering without saving to file
     * @param canvasData The canvas data containing the rendered textmode graphics
     * @param options Export options (excluding filename)
     * @returns Promise that resolves to a Blob containing the image data
     */
    $generateImageBlob(canvas: TextmodeCanvas, options?: Omit<ImageExportOptions, 'filename'>): Promise<Blob>;
    /**
     * Exports image to a downloadable file
     * @param canvas The canvas data containing the rendered textmode graphics
     * @param options Export options including filename
     */
    $saveImage(canvas: TextmodeCanvas, options?: ImageExportOptions): Promise<void>;
}
