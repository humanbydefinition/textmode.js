import type { GLShader } from '../../rendering';
import type { GLRenderer } from '../../rendering/webgl/core/Renderer';
import type { TextmodeFont } from '../loadables/font/TextmodeFont';
import type { TextmodeSource } from '../loadables/TextmodeSource';
/**
 * Built-in conversion mode names provided by textmode.js
 */
export type BuiltInConversionMode = 'brightness';
/**
 * Type representing the available textmode conversion modes
 */
export type TextmodeConversionMode = BuiltInConversionMode | string;
/**
 * Interface for the context provided to conversion strategies
 * @ignore
 */
export interface TextmodeConversionContext {
    renderer: GLRenderer;
    gl: WebGL2RenderingContext;
    font: TextmodeFont;
    source: TextmodeSource;
    gridWidth: number;
    gridHeight: number;
}
/**
 * Interface for a textmode conversion strategy
 * @ignore
 */
export interface TextmodeConversionStrategy {
    readonly id: TextmodeConversionMode;
    createShader(context: TextmodeConversionContext): GLShader;
    createUniforms(context: TextmodeConversionContext): Record<string, any>;
}
/**
 * Instance-based registry for conversion strategies.
 *
 * Each {@link ConversionManager} instance has its own ConversionRegistry, allowing
 * conversion strategies to be scoped to a specific Textmodifier instance rather than registered globally.
 *
 * @example
 * ```ts
 * // Register a custom conversion strategy
 * t.conversions.register(myCustomStrategy);
 *
 * // Use the conversion mode on an image
 * img.conversionMode('myCustomMode');
 * ```
 *
 * @ignore
 */
export declare class ConversionRegistry {
    private readonly _strategies;
    private readonly _shaderCache;
    /**
     * Create a new ConversionRegistry.
     * @param renderer The WebGL renderer instance
     */
    constructor();
    /**
     * Register a conversion strategy.
     * @param strategy The conversion strategy to register
     */
    $register(strategy: TextmodeConversionStrategy): void;
    /**
     * Unregister a conversion strategy by its ID.
     *
     * @param id The conversion strategy ID to unregister
     * @returns true if the strategy was unregistered, false if it wasn't found
     */
    $unregister(id: TextmodeConversionMode): boolean;
    /**
     * Get a conversion strategy by ID.
     * @internal
     */
    $get(id: TextmodeConversionMode): TextmodeConversionStrategy | undefined;
    /**
     * Check if a conversion strategy with the given ID is registered.
     *
     * @param id The conversion strategy ID to check
     * @returns true if the strategy exists
     */
    $has(id: TextmodeConversionMode): boolean;
    /**
     * Dispose all resources.
     * @internal
     */
    $dispose(): void;
    /**
     * Register all built-in conversion strategies.
     */
    private _registerBuiltInStrategies;
}
