/**
 * Error handling levels to control how errors are reported and handled.
 *
 * Determines how validation failures and errors are processed throughout the library.
 * Each level provides different behavior for error reporting and execution flow control.
 *
 * > [!NOTE]
 * > This feature is currently not fully implemented across all modules,
 * > and most `textmode.js` functions will still throw errors if used incorrectly.
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
 */
export interface ErrorHandlerOptions {
    /** Global error level */
    globalLevel: TextmodeErrorLevel;
}
/**
 * Singleton error handler for textmode.js
 * This class handles errors based on the configured error level.
 * It can log warnings, errors, or throw exceptions based on the global error level.
 */
export declare class TextmodeErrorHandler {
    private static _instance;
    private _options;
    private _errorFingerprints;
    private constructor();
    static _getInstance(): TextmodeErrorHandler;
    /**
     * Handle an error based on the configured settings
     * @returns true if execution should continue, false if error was handled
     */
    private _handle;
    private _shouldEmit;
    private _createFingerprint;
    private _stableStringify;
}
/**
 * Singleton instance of the textmode.js error handler.
 */
export declare const errorHandler: TextmodeErrorHandler;
