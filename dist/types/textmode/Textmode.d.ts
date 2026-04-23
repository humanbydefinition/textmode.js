import { type TextmodeErrorLevel } from './error';
import { Textmodifier } from './Textmodifier';
import type { TextmodeOptions } from './types';
/**
 * The main entry point for the `textmode.js` library.
 *
 * Provides static methods for creating {@link Textmodifier} instances and managing global settings.
 *
 * @example
 * {@includeCode ../../examples/Textmode/creation/sketch.js}
 */
export declare class Textmode {
    private constructor();
    /**
     * Create a new {@link Textmodifier} instance with optional configuration.
     * @param opts Configuration options for the Textmodifier instance
     * @returns A new Textmodifier instance
     *
     * @example
     * {@includeCode ../../examples/Textmode/create/sketch.js}
     */
    static create(opts?: TextmodeOptions): Textmodifier;
    /**
     * Set the global error handling level for the library. This applies to all {@link Textmodifier} instances present.
     * @param level The error handling level to set.
     *
     * @example
     * {@includeCode ../../examples/Textmode/setErrorLevel/sketch.js}
     */
    static setErrorLevel(level: TextmodeErrorLevel): void;
    /**
     * Returns the version of `textmode.js` being used.
     * @returns The version string of the library.
     *
     * @example
     * {@includeCode ../../examples/Textmode/version/sketch.js}
     */
    static get version(): string;
}
