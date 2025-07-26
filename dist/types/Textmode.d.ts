import type { TextmodeErrorLevel } from './errors';
import { Textmodifier, type TextmodeOptions } from './textmode/Textmodifier';
export { Textmodifier } from './textmode/Textmodifier';
export { TextmodeFont } from './textmode/font';
export { TextmodeCanvas } from './textmode/Canvas';
export { TextmodeGrid } from './textmode/Grid';
export type { TextmodeOptions } from './textmode/Textmodifier';
export type { TextmodeCharacter } from './textmode/font';
export { TextmodeErrorLevel } from './errors/ErrorHandler';
/** Contains all converters that can be added to a rendering pipeline to shape the textmode output. */
export * as TextmodeConverters from './textmode/converters';
/**
 * The main entry point for the `textmode.js` library.
 *
 * Provides static methods for creating textmode instances and managing global settings.
 */
export declare class Textmode {
    /**
     * Create a {@link Textmodifier} instance to apply textmode rendering to a given canvas.
     * @param canvas The HTML canvas element to capture content from.
     * @param opts Optional configuration options for the Textmodifier instance.
     * @returns A Promise that resolves to a Textmodifier instance.
     *
     * @example
     * ```javascript
     * // Fetch a canvas element to apply textmode rendering to
     * const canvas = document.querySelector('canvas#myCanvas');
     *
     * // Create a Textmodifier instance with default options
     * const textmodifier = await textmode.create(canvas);
     * ```
     */
    static create(canvas: HTMLCanvasElement, opts?: TextmodeOptions): Promise<Textmodifier>;
    /**
     * Set the global error handling level for the library. This applies to all `Textmodifier` instances.
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
     * Returns the current version of the `textmode.js` library.
     *
     * @example
     * ```javascript
     * console.log(textmode.version); // "1.0.0"
     * ```
     */
    static get version(): string;
    private constructor();
}
