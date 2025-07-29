/**
 * Base class for file handling operations.
 * Provides common functionality for downloading files in the browser.
 */
export declare abstract class FileHandler {
    /**
     * Creates a downloadable blob from content
     * @param content The content to include in the blob
     * @param mimeType The MIME type for the blob
     * @returns Blob object containing the content
     */
    protected createBlob(content: string, mimeType: string): Blob;
    /**
     * Creates a data URL from content
     * @param content The content to convert
     * @param mimeType The MIME type for the blob
     * @returns Data URL string
     */
    protected createDataURL(content: string, mimeType: string): string;
    /**
     * Downloads content as a file
     * @param content The content to download
     * @param filename The filename (with extension)
     * @param mimeType The MIME type for the content
     */
    protected downloadFile(content: string, filename: string, mimeType: string): void;
    /**
     * Generates a timestamp string for filenames
     * @returns Formatted timestamp string
     */
    protected generateTimestamp(): string;
    /**
     * Generates a date-time string for filenames (alternative format)
     * @returns Formatted date and time string
     */
    protected generateDateTimeString(): {
        date: string;
        time: string;
    };
    /**
     * Validates and sanitizes filename for safety and compatibility
     * @param filename The filename to validate
     * @returns Sanitized filename
     */
    protected sanitizeFilename(filename: string): string;
    /**
     * Ensures filename has the correct extension
     * @param filename The filename to check
     * @param expectedExtension The expected file extension (with dot)
     * @returns Filename with correct extension
     */
    protected ensureFileExtension(filename: string, expectedExtension: string): string;
    /**
     * Generates a default filename with prefix and timestamp
     * @param prefix The prefix for the filename
     * @param extension The file extension (with dot)
     * @returns Generated filename
     */
    protected generateDefaultFilename(prefix: string, extension: string): string;
}
