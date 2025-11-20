import { type TextmodeErrorLevel } from './errors';
import { Textmodifier } from './textmode/Textmodifier';
import type { TextmodeOptions } from './textmode/types';
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
    * const t = textmode.create({ width: 800, height: 600, fontSize: 16 });
    *
    * t.draw(() => {
    *     t.background(0);
    *     t.char("x");
    *     t.rotateZ(t.frameCount);
    *     t.rect(10, 10);
    * });
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
