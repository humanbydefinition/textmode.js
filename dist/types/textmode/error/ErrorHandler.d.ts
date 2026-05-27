/**
 * Controls how validation failures are reported.
 *
 * > [!NOTE]
 * > This setting currently covers validation paths that use the shared error handler.
 * > Other runtime failures may still throw.
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
 * Error handler configuration.
 */
export interface ErrorHandlerOptions {
    /** Global error level */
    globalLevel: TextmodeErrorLevel;
}
/**
 * Shared validation error handler for textmode.js.
 */
export declare class TextmodeErrorHandler {
    private static _instance;
    private _options;
    private _errorFingerprints;
    private constructor();
    static _getInstance(): TextmodeErrorHandler;
    /**
     * Report a validation failure according to the configured level.
     * @returns true if execution should continue, false if the failure was handled.
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
