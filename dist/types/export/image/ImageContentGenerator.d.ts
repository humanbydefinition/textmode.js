import type { ImageGenerationOptions } from './types';
/**
 * Content generator for image export.
 * Handles the conversion of canvas data to different image formats.
 */
export declare class ImageContentGenerator {
    /**
     * Generates image data from canvas
     * @param canvas The canvas containing the image data
     * @param options Generation options with format, quality, etc.
     * @returns Data URL string containing the image data
     */
    generateImageData(canvas: HTMLCanvasElement, options: ImageGenerationOptions): string;
    /**
     * Generates image blob from canvas
     * @param canvas The canvas containing the image data
     * @param options Generation options with format, quality, etc.
     * @returns Promise that resolves to a Blob containing the image data
     */
    generateImageBlob(canvas: HTMLCanvasElement, options: ImageGenerationOptions): Promise<Blob>;
    /**
     * Gets the MIME type for a given image format
     * @param format The image format
     * @returns The corresponding MIME type
     */
    private getMimeType;
}
