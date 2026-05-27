import { type TextmodeErrorLevel } from './error';
import { Textmodifier } from './Textmodifier';
import type { TextmodeOptions } from './types';
/**
 * The main entry point for the `textmode.js` library.
 *
 * Use it to create {@link Textmodifier} instances and configure global library settings.
 *
 * @example
 * {@includeCode ../../examples/Textmode/creation/sketch.js}
 */
export declare class Textmode {
    private constructor();
    /**
     * Create a {@link Textmodifier} instance.
     * @param opts Optional instance configuration.
     * @returns The created Textmodifier instance.
     *
     * @example
     * {@includeCode ../../examples/Textmode/create/sketch.js}
     */
    static create(opts?: TextmodeOptions): Textmodifier;
    /**
     * Set the global error handling level for all {@link Textmodifier} instances.
     * @param level Error handling level to use.
     *
     * @example
     * {@includeCode ../../examples/Textmode/setErrorLevel/sketch.js}
     */
    static setErrorLevel(level: TextmodeErrorLevel): void;
    /**
     * The current `textmode.js` package version.
     * @returns The package version string.
     *
     * @example
     * {@includeCode ../../examples/Textmode/version/sketch.js}
     */
    static get version(): string;
}
