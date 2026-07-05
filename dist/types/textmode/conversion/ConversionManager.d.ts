import type { TextmodeConversionMode, TextmodeConversionStrategy } from './ConversionRegistry';
/**
 * Registers conversion strategies for a Textmodifier instance.
 *
 * Access via {@link Textmodifier.conversions}.
 *
 * @example
 * ```ts
 * // Register a custom conversion strategy
 * t.conversions.register({
 *     id: 'custom',
 *     createShader: (ctx) => shader,
 *     createUniforms: (ctx) => ({ u_image: ctx.source.texture })
 * });
 *
 * // Use the conversion mode on an image
 * img.conversionMode('custom');
 * ```
 *
 * @see {@link https://code.textmode.art/api/textmode.js/namespaces/conversion/classes/TextmodeConversionManager | conversion.TextmodeConversionManager API reference}
 */
export declare class TextmodeConversionManager {
    private readonly _strategies;
    private readonly _shaderCache;
    /**
     * Register a custom conversion strategy.
     *
     * @param strategy The conversion strategy to register
     *
     * @example
     * ```ts
     * t.conversions.register({
     *     id: 'custom',
     *     createShader: (ctx) => shader,
     *     createUniforms: (ctx) => ({ u_image: ctx.source.texture })
     * });
     * ```
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/conversion/classes/TextmodeConversionManager#register | conversion.TextmodeConversionManager.register API reference}
     */
    register(strategy: TextmodeConversionStrategy): void;
    /**
     * Unregister a conversion strategy by its ID.
     *
     * @param id The conversion strategy ID to unregister
     * @returns true if the strategy was unregistered, false if it wasn't found
     *
     * @example
     * {@includeCode ../../../examples/conversion/unregister/sketch.js}
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/conversion/classes/TextmodeConversionManager#unregister | conversion.TextmodeConversionManager.unregister API reference}
     */
    unregister(id: TextmodeConversionMode): boolean;
    /**
     * Check if a conversion strategy with the given ID is registered.
     *
     * @param id The conversion strategy ID to check
     * @returns true if the strategy exists
     *
     * @example
     * {@includeCode ../../../examples/conversion/has/sketch.js}
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/conversion/classes/TextmodeConversionManager#has | conversion.TextmodeConversionManager.has API reference}
     */
    has(id: TextmodeConversionMode): boolean;
    /**
     * Register all built-in conversion strategies.
     */
    private _registerBuiltInStrategies;
}
