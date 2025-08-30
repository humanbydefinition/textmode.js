import { FileHandler } from '../base/FileHandler.js';
/**
 * Handles SVG file operations including download and save functionality.
 * This class manages the creation of downloadable SVG files and blob handling.
 */
export declare class SVGFileHandler extends FileHandler {
    /**
     * Creates a downloadable blob from SVG content
     * @param svgContent The SVG content string
     * @returns Blob object containing the SVG data
     */
    $createSVGBlob(svgContent: string): Blob;
    /**
     * Downloads SVG content as a file
     * @param svgContent The SVG content to download
     * @param filename The filename (without extension)
     */
    private _downloadSVG;
    /**
     * Saves SVG content with automatic filename generation if not provided
     * @param svgContent The SVG content to save
     * @param filename Optional filename (will generate if not provided)
     */
    $saveSVG(svgContent: string, filename?: string): void;
}
