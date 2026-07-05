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
 *
 * @see {@link https://code.textmode.art/api/textmode.js/classes/textmode | textmode API reference}
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
     *
     * @see {@link https://code.textmode.art/api/textmode.js/classes/textmode/methods/create | textmode.create API reference}
     */
    static create(opts?: TextmodeOptions): Textmodifier;
    /**
     * Set the global error handling level for all {@link Textmodifier} instances.
     * @param level Error handling level to use.
     *
     * @example
     * {@includeCode ../../examples/Textmode/setErrorLevel/sketch.js}
     *
     * @see {@link https://code.textmode.art/api/textmode.js/classes/textmode/methods/setErrorLevel | textmode.setErrorLevel API reference}
     */
    static setErrorLevel(level: TextmodeErrorLevel): void;
    /**
     * The current `textmode.js` package version.
     * @returns The package version string.
     *
     * @example
     * {@includeCode ../../examples/Textmode/version/sketch.js}
     *
     * @see {@link https://code.textmode.art/api/textmode.js/classes/textmode/accessors/version | textmode.version API reference}
     */
    static get version(): string;
}
