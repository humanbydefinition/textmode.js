import type { GLShader, UniformValue } from '../../rendering';
import type { FilterName } from './types';
/**
 * Manages filter registration, shader compilation, and filter chain application.
 *
 * Used both for layer-level filters and global post-processing filters.
 *
 * @example
 * ```ts
 * // Register a custom filter
 * await t.filters.register('brightness', brightnessShader, {
 *     u_amount: ['amount', 1.0]
 * });
 *
 * // Use the filter globally
 * t.filter('brightness', 1.5);
 *
 * // Or on a layer
 * t.layers.base.filter('brightness', { amount: 0.8 });
 * ```
 */
export declare class TextmodeFilterManager {
    private readonly _renderer;
    private readonly _filters;
    private readonly _shaderCache;
    private readonly _copyShader;
    private _pingPongBuffers;
    private _isInitialized;
    /**
     * Register a custom filter with the given ID, shader, and uniform definitions.
     *
     * @param id Unique filter identifier
     * @param shader Pre-compiled GLShader, fragment shader source string, or path to a .frag/.glsl file
     * @param uniformDefs Maps uniform names to [paramName, defaultValue] tuples
     *
     * @example
     * ```ts
     * // Register with inline shader source
     * await t.filters.register('blur', blurFragSource, {
     *     u_radius: ['radius', 5.0],
     *     u_direction: ['direction', [1.0, 0.0]]
     * });
     *
     * // Register with file path
     * await t.filters.register('vignette', './vignette.frag', {
     *     u_intensity: ['intensity', 0.5]
     * });
     * ```
     */
    register(id: FilterName, shader: GLShader | string, uniformDefs?: Record<string, [paramName: string, defaultValue: UniformValue]>): Promise<void>;
    /**
     * Unregister a filter by its ID.
     *
     * @param id The filter ID to unregister
     * @returns true if the filter was unregistered, false if it wasn't found
     *
     * @example
     * {@includeCode ../../../examples/filters/registry/sketch.js}
     */
    unregister(id: FilterName): boolean;
    /**
     * Check if a filter with the given ID is registered.
     *
     * @param id The filter ID to check
     * @returns true if the filter exists
     *
     * @example
     * {@includeCode ../../../examples/filters/registry/sketch.js}
     */
    has(id: FilterName): boolean;
    /**
     * Apply a single filter pass with explicit source buffer.
     */
    private _applyFilterWithBuffer;
    /**
     * Get or create a cached shader for the given filter.
     */
    private _getOrCreateShader;
    /**
     * Copy a texture to a framebuffer using the copy shader.
     */
    private _copyTexture;
    /**
     * Register all built-in filters.
     */
    private _registerBuiltInFilters;
}
