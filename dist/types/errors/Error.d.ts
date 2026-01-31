/**
 * Custom error class for textmode.js exceptions.
 *
 * Provides formatted error messages with optional context data to help
 * debug issues.
 *
 */
export declare class TextmodeError extends Error {
    /**
     * Creates a new TextmodeError instance.
     * @param message The main error message
     * @param context Optional context data to include in the error message
     */
    constructor(message: string, context?: Record<string, unknown>);
    /**
     * Create a formatted error message that includes context
     * @ignore
     */
    static $createFormattedMessage(message: string, context?: Record<string, unknown>): string;
    /**
     * Format values for better display in error messages
     */
    private static _formatValue;
}
