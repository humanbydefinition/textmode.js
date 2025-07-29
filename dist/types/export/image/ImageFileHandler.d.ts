import { FileHandler } from '../base/FileHandler';
import type { ImageFormat } from './types';
/**
 * File handler for image export operations.
 * Manages saving image files to disk with proper MIME types and extensions.
 */
export declare class ImageFileHandler extends FileHandler {
    /**
     * Saves image content as a downloadable file
     * @param content The image content (data URL or blob)
     * @param filename The filename (without extension)
     * @param format The image format
     */
    saveImage(content: string | Blob, filename: string, format: ImageFormat): void;
    /**
     * Saves image from data URL
     * @param dataURL The data URL containing image data
     * @param filename The complete filename with extension
     */
    private saveImageFromDataURL;
    /**
     * Saves image from blob
     * @param blob The blob containing image data
     * @param filename The complete filename with extension
     */
    private saveImageFromBlob;
    /**
     * Generates a default filename for image export
     * @param format The image format for the file extension
     * @returns Generated filename with timestamp
     */
    generateDefaultImageFilename(format?: ImageFormat): string;
    /**
     * Validates if the browser supports saving files in the specified format
     * @param format The image format to validate
     * @returns True if the format is supported for saving
     */
    validateSaveSupport(format: ImageFormat): boolean;
    /**
     * Gets the MIME type for the specified image format
     * @param format The image format
     * @returns The MIME type string
     */
    getMimeType(format: ImageFormat): string;
    /**
     * Gets the file extension for the specified image format
     * @param format The image format
     * @returns The file extension (including the dot)
     */
    getFileExtension(format: ImageFormat): string;
}
