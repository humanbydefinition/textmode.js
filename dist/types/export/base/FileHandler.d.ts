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
    protected _createBlob(content: string, mimeType: string): Blob;
    /**
     * Downloads content as a file
     * @param content The content to download
     * @param filename The filename (with extension)
     * @param mimeType The MIME type for the content
     */
    protected _downloadFile(content: string, filename: string, mimeType: string): void;
    /**
     * Generates a timestamp string for filenames
     * @returns Formatted timestamp string
     */
    protected _generateTimestamp(): string;
    /**
     * Generates a date-time string for filenames (alternative format)
     * @returns Formatted date and time string
     */
    protected _generateDateTimeString(): {
        date: string;
        time: string;
    };
    /**
     * Validates and sanitizes filename for safety and compatibility
     * @param filename The filename to validate
     * @returns Sanitized filename
     */
    protected _sanitizeFilename(filename: string): string;
    /**
     * Generates a default filename with prefix and timestamp
     * @param prefix The prefix for the filename
     * @param extension The file extension (with dot)
     * @returns Generated filename
     */
    $generateDefaultFilename(): string;
}
