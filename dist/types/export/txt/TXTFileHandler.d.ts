import { FileHandler } from '../base/FileHandler.js';
/**
 * Handles file operations for TXT export.
 * This class manages the saving of TXT content to downloadable files.
 */
export declare class TXTFileHandler extends FileHandler {
    /**
     * Saves TXT content as a downloadable file
     * @param content The TXT content to save
     * @param filename The filename to use for the download
     */
    $saveTXT(content: string, filename: string): void;
    /**
     * Ensures filename has proper extension and is valid
     * @param filename The filename to validate and fix
     * @returns Valid filename with .txt extension
     */
    private _ensureValidFilename;
}
