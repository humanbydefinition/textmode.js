/**
 * Formatting controls for textmode.js error messages.
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
 * Error type that formats optional context data alongside the main message.
 */
export declare class TextmodeError extends Error {
    /**
     * Create a textmode.js error.
     * @param message The main error message
     * @param context Optional context data to include in the error message
     * @param options Optional message formatting options
     */
    constructor(message: string, context?: Record<string, unknown>, options?: TextmodeErrorFormatOptions);
    /**
     * Format values for compact display in error messages.
     */
    private static _formatValue;
}
