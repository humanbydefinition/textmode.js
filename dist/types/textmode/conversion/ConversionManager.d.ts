import type { TextmodeConversionMode, TextmodeConversionStrategy } from './ConversionRegistry';
/**
 * Manages conversion strategy registration and retrieval.
 *
 * This class provides:
 * - A registry for custom and built-in conversion strategies
 * - Instance-scoped conversion strategies per Textmodifier
 *
 * Used for image-to-ASCII conversion modes.
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
 */
export declare class TextmodeConversionManager {
    private readonly _conversionRegistry;
    /**
     * Create a new TextmodeConversionManager.
     * @param renderer The WebGL renderer instance
     * @ignore
     */
    constructor();
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
     */
    register(strategy: TextmodeConversionStrategy): void;
    /**
     * Unregister a conversion strategy by its ID.
     *
     * @param id The conversion strategy ID to unregister
     * @returns true if the strategy was unregistered, false if it wasn't found
     */
    unregister(id: TextmodeConversionMode): boolean;
    /**
     * Check if a conversion strategy with the given ID is registered.
     *
     * @param id The conversion strategy ID to check
     * @returns true if the strategy exists
     */
    has(id: TextmodeConversionMode): boolean;
    /**
     * Get a registered conversion strategy by its ID.
     * @param id The ID of the conversion strategy
     * @returns The conversion strategy, or undefined if not found
     * @ignore
     */
    $get(id: TextmodeConversionMode): TextmodeConversionStrategy | undefined;
    /**
     * Dispose of all resources.
     * @ignore
     */
    $dispose(): void;
}
