/**
 * Handles SVG file operations including download and save functionality.
 * This class manages the creation of downloadable SVG files and blob handling.
 */
export declare class SVGFileHandler {
    /**
     * Generates a default filename for SVG export
     * @param prefix Optional prefix for the filename
     * @returns Generated filename without extension
     */
    generateDefaultFilename(prefix?: string): string;
    /**
     * Validates filename for safety and compatibility
     * @param filename The filename to validate
     * @returns Sanitized filename
     */
    sanitizeFilename(filename: string): string;
    /**
     * Creates a downloadable blob from SVG content
     * @param svgContent The SVG content string
     * @returns Blob object containing the SVG data
     */
    createSVGBlob(svgContent: string): Blob;
    /**
     * Creates a data URL from SVG content
     * @param svgContent The SVG content string
     * @returns Data URL string
     */
    createDataURL(svgContent: string): string;
    /**
     * Downloads SVG content as a file
     * @param svgContent The SVG content to download
     * @param filename The filename (without extension)
     */
    downloadSVG(svgContent: string, filename: string): void;
    /**
     * Saves SVG content with automatic filename generation if not provided
     * @param svgContent The SVG content to save
     * @param filename Optional filename (will generate if not provided)
     */
    saveSVG(svgContent: string, filename?: string): void;
    /**
     * Gets the size of the SVG content in bytes
     * @param svgContent The SVG content string
     * @returns Size in bytes
     */
    getSVGSize(svgContent: string): number;
    /**
     * Formats file size in human-readable format
     * @param bytes Size in bytes
     * @returns Formatted size string
     */
    formatFileSize(bytes: number): string;
    /**
     * Validates SVG content before saving
     * @param svgContent The SVG content to validate
     * @returns True if valid, false otherwise
     */
    validateSVGContent(svgContent: string): boolean;
}
