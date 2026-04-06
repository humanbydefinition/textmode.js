/**
 * Custom error class for textmode.js exceptions.
 *
 * Provides formatted error messages with optional context data to help
 * debug issues.
 *
 */
export interface TextmodeErrorFormatOptions {
    /**
     * Include context block in the formatted output.
     * @default true
     */
    includeContext?: boolean;
    /**
     * Include the visual footer marker used before thrown stack output.
     * @default true
     */
    includeFooterArrows?: boolean;
}
/**
 * Custom error class for textmode.js exceptions.
 *
 * Provides formatted error messages with optional context data to help
 * debug issues.
 */
export declare class TextmodeError extends Error {
    /**
     * Creates a new TextmodeError instance.
     * @param message The main error message
     * @param context Optional context data to include in the error message
     * @param options Optional message formatting options
     */
    constructor(message: string, context?: Record<string, unknown>, options?: TextmodeErrorFormatOptions);
    /**
     * Format values for better display in error messages
     */
    private static _formatValue;
}
