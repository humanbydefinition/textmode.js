/**
 * Error handling levels to control how errors are reported and handled.
 *
 * Determines how validation failures and errors are processed throughout the library.
 * Each level provides different behavior for error reporting and execution flow control.
 *
 * @note
 * This feature is currently not fully implemented across all modules,
 * and most `textmode.js` functions will still throw errors if used incorrectly.
 *
 * @example
 * ```js
 * // Set to `WARNING` level to log errors without stopping execution
 * textmode.setErrorLevel(TextmodeErrorLevel.WARNING);
 * ```
 */
export declare enum TextmodeErrorLevel {
    /**
     * Suppress all error output.
     * Validation failures are handled silently without any console messages.
     */
    SILENT = 0,
    /**
     * Log validation failures as warnings.
     */
    WARNING = 1,
    /**
     * Log validation failures as errors.
     */
    ERROR = 2,
    /**
     * Throw exceptions on validation failures *(default behavior)*.
     */
    THROW = 3
}
/**
 * Options for configuring the error handler.
 * @ignore
 */
export interface ErrorHandlerOptions {
    /** Global error level */
    globalLevel: TextmodeErrorLevel;
}
/**
 * Singleton error handler for textmode.js
 * This class handles errors based on the configured error level.
 * It can log warnings, errors, or throw exceptions based on the global error level.
 * @ignore
 */
export declare class TextmodeErrorHandler {
    private static _instance;
    private _options;
    private constructor();
    static $getInstance(): TextmodeErrorHandler;
    /**
     * Handle an error based on the configured settings
     * @returns true if execution should continue, false if error was handled
     */
    private _handle;
    /**
     * Validate a condition and handle errors if validation fails
     * @param condition The condition to validate
     * @param message Error message if validation fails
     * @param context Additional context for debugging
     * @returns true if validation passed, false if validation failed and was handled
     */
    $validate(condition: boolean, message: string, context?: any): boolean;
    /**
     * Set global error level
     */
    $setGlobalLevel(level: TextmodeErrorLevel): void;
}
/**
 * Singleton instance of the textmode.js error handler.
 * @ignore
 */
export declare const errorHandler: TextmodeErrorHandler;
