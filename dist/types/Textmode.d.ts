import { type TextmodeErrorLevel } from './errors';
import { Textmodifier, type TextmodeOptions } from './textmode/Textmodifier';
/**
 * The main entry point for the `textmode.js` library.
 *
 * Provides static methods for creating {@link Textmodifier} instances and managing global settings.
 */
export declare class Textmode {
    private constructor();
    /**
     * Create a new {@link Textmodifier} instance with optional configuration.
     * @param opts Configuration options for the Textmodifier instance
     * @returns A new Textmodifier instance
     *
     * @example
     * ```javascript
     * // Create with default canvas
     * const textmodifier = textmode.create();
     *
     * textmodifier.setup(() => {
     *   // Called when the Textmodifier is ready
     *   console.log(`Grid size: ${textmodifier.grid.cols}x${textmodifier.grid.rows}`);
     * });
     *
     * textmodifier.draw(() => {
     *   textmodifier.background(128);
     *   textmodifier.rect(10, 10, 20, 20);
     * });
     *
     * // Create with options
     * const textmodifier2 = textmode.create({ width: 1920, height: 1080 });
     *
     * // Create with canvas and options
     * const textmodifier3 = textmode.create({ canvas: canvas, fontSize: 20 });
     * ```
     */
    static create(opts?: TextmodeOptions): Textmodifier;
    /**
     * Set the global error handling level for the library. This applies to all {@link Textmodifier} instances present.
     *
     * @param level The error handling level to set.
     *
     * @example
     * ```javascript
     * // Set error level to WARNING
     * textmode.setErrorLevel(TextmodeErrorLevel.WARNING);
     * ```
     */
    static setErrorLevel(level: TextmodeErrorLevel): void;
    /**
     * Returns the version of `textmode.js` being used.
     *
     * @example
     * ```javascript
     * console.log(textmode.version); // "1.0.0"
     * ```
     */
    static get version(): string;
}
