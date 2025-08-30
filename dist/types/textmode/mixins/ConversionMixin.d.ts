import type { Mixin } from './TextmodifierMixin';
import type { TextmodeConverter } from '../converters';
/**
 * Interface for conversion pipeline capabilities that will be mixed into Textmodifier
 */
export interface ConversionCapabilities {
    /**
     * Adds a new converter to the pipeline.
     * @param type The type of converter to add. Can be either "brightness" or "custom".
     * @returns The newly created {@link TextmodeConverter} instance or `void` if the addition failed.
     *
     * @example
     * ```javascript
     * // Fetch a canvas element to apply textmode rendering to
     * const canvas = document.querySelector('canvas#myCanvas');
     *
     * // Create a Textmodifier instance
     * const textmodifier = await textmode.create(canvas);
     *
     * // Add a new brightness converter
     * const myConverter = textmodifier.addConverter('brightness');
     *
     * // Configure the new converter
     * myConverter.characters("▓▒░ ");
     * myConverter.enabled(true);
     *
     * // Add a custom converter
     * const customConverter = textmodifier.addConverter('custom');
     * ```
     */
    addConverter(type: 'brightness' | 'custom'): TextmodeConverter | void;
    /**
     * Removes a converter from the pipeline by name or instance.
     * @param nameOrInstance The unique name of the converter or the converter instance to remove.
     *
     * @example
     * ```javascript
     * // Fetch a canvas element to apply textmode rendering to
     * const canvas = document.querySelector('canvas#myCanvas');
     *
     * // Create a Textmodifier instance
     * const textmodifier = await textmode.create(canvas);
     *
     * // Add a converter
     * const myConverter = textmodifier.addConverter('temp-converter', 'brightness');
     *
     * // Remove by name
     * textmodifier.removeConverter('temp-converter');
     *
     * // Or remove by instance
     * const anotherConverter = textmodifier.addConverter('another', 'custom');
     * textmodifier.removeConverter(anotherConverter);
     * ```
     */
    removeConverter(nameOrInstance: string | TextmodeConverter): void;
}
/**
 * Mixin that adds conversion pipeline capabilities to a class by delegating to TextmodeConversionPipeline
 * @param Base The base class to extend
 * @returns Extended class with conversion capabilities
 */
export declare const ConversionMixin: Mixin<ConversionCapabilities>;
