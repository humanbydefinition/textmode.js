/**
 * Image-specific type definitions for the textmode.js library.
 */
/**
 * Supported image formats for export.
 */
export type ImageFormat = 'png' | 'jpg' | 'webp';
/**
 * Options for exporting the textmode content to image format.
 */
export type ImageExportOptions = {
    /**
     * The filename to save the image file as (without extension).
     * @ignore
     */
    filename?: string;
    /**
     * The image format to export (`'png'`, `'jpg'`, or `'webp'`).
     * @ignore
     */
    format?: ImageFormat;
    /**
     * Image quality for lossy formats (`'jpg'`, `'webp'`).
     *
     * Range: `0.0` to `1.0`, where `1.0` is highest quality.
     *
     * Default is `1.0`. Ignored for `'png'` format.
     */
    quality?: number;
    /**
     * Scale factor for the output image.
     *
     * `1.0` = original size, `2.0` = double size, `0.5` = half size.
     *
     * Default is `1.0`.
     */
    scale?: number;
    /**
     * Background color for formats that don't support transparency (`'jpg'`).
     *
     * **Format:** CSS color string.
     *
     * Default is `'black'`.
     */
    backgroundColor?: string;
};
/**
 * Internal options used by image generation (with all defaults applied).
 */
export interface ImageGenerationOptions {
    format: ImageFormat;
    quality: number;
    scale: number;
    backgroundColor: string;
}
/**
 * MIME type mapping for image formats.
 */
export declare const IMAGE_MIME_TYPES: Record<ImageFormat, string>;
/**
 * File extension mapping for image formats.
 */
export declare const IMAGE_EXTENSIONS: Record<ImageFormat, string>;
