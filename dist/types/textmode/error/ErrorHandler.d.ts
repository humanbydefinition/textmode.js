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
