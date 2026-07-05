import type { GLShader } from '../../rendering';
import type { FilterName, TextmodeFilterUniformDefinitions } from './types';
/**
 * Registers filter shaders and applies layer/global filter chains.
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
 *
 * @see {@link https://code.textmode.art/api/textmode.js/namespaces/filters/classes/TextmodeFilterManager | filters.TextmodeFilterManager API reference}
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
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/filters/classes/TextmodeFilterManager#register | filters.TextmodeFilterManager.register API reference}
     */
    register(id: FilterName, shader: GLShader | string, uniformDefs?: TextmodeFilterUniformDefinitions): Promise<void>;
    private _registerSource;
    private _register;
    /**
     * Unregister a filter by its ID.
     *
     * @param id The filter ID to unregister
     * @returns true if the filter was unregistered, false if it wasn't found
     *
     * @example
     * {@includeCode ../../../examples/filters/unregister/sketch.js}
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/filters/classes/TextmodeFilterManager#unregister | filters.TextmodeFilterManager.unregister API reference}
     */
    unregister(id: FilterName): boolean;
    /**
     * Check if a filter with the given ID is registered.
     *
     * @param id The filter ID to check
     * @returns true if the filter exists
     *
     * @example
     * {@includeCode ../../../examples/filters/has/sketch.js}
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/filters/classes/TextmodeFilterManager#has | filters.TextmodeFilterManager.has API reference}
     */
    has(id: FilterName): boolean;
    /**
     * Apply a single filter pass with an explicit source texture.
     */
    private _applyFilterFromTexture;
    private _textureAliasesFramebuffer;
    private _selectIntermediateBuffer;
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
