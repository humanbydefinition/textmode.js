import type { GLRenderer, GLShader } from '../../rendering';
import type { TextmodeFilterStrategy, FilterName } from './types';
/**
 * Instance-based registry for filter strategies.
 *
 * Each {@link FilterManager} instance has its own FilterRegistry, allowing
 * filters to be scoped to a specific context rather than registered globally.
 *
 * @example
 * ```ts
 * // Define a simple filter with the declarative API
 * t.filters.register('blur', blurShader, { radius: 5.0 });
 *
 * // Use the filter
 * t.filter('blur', { radius: 10 });
 * ```
 *
 * @ignore
 */
export declare class FilterRegistry {
    private readonly _renderer;
    private readonly _filters;
    private readonly _shaderCache;
    /**
     * Create a new FilterRegistry.
     * @param renderer The WebGL renderer instance
     */
    constructor(renderer: GLRenderer);
    /**
     * Define a filter using a simplified declarative syntax.
     *
     * This is the easiest way to create filters for add-on libraries.
     * The shader is compiled immediately and cached.
     *
     * @param id Unique filter identifier
     * @param shader Pre-compiled GLShader, fragment shader source string, or path to a fragment shader file (.frag or .glsl)
     * @param uniforms Default uniform values. Keys map uniform names to [paramName, defaultValue] tuples.
     *
     * @example
     * ```ts
     * // With pre-compiled shader (recommended for add-ons)
     * const shader = await t.createShader(vertSrc, fragSrc);
     * t.filters.register('brightness', shader, { u_amount: ['amount', 1.0] });
     *
     * // With a path to a fragment shader file
     * await t.filters.register('brightness', './brightness.frag', { u_amount: ['amount', 1.0] });
     *
     * // Usage:
     * t.filter('brightness', 1.5);
     * t.filter('brightness', { amount: 1.5 });
     * ```
     */
    $register(id: FilterName, shader: GLShader | string, defs?: Record<string, [paramName: string, defaultValue: unknown]>): Promise<void>;
    /**
     * Unregister a filter by its ID.
     *
     * @param id The filter ID to unregister
     * @returns true if the filter was unregistered, false if it wasn't found
     */
    $unregister(id: FilterName): boolean;
    /**
     * Get a filter strategy by ID.
     * @internal
     */
    $get(id: FilterName): TextmodeFilterStrategy | undefined;
    /**
     * Dispose all resources.
     * @internal
     */
    $dispose(): void;
    /**
     * Register all built-in filters.
     */
    private _registerBuiltInFilters;
}
