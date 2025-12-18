import type { GLRenderer, GLShader, GLFramebuffer } from '../../rendering';
import type { QueuedFilter, FilterName } from './types';
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
    private readonly _shaderCache;
    private readonly _copyShader;
    private _pingPongBuffers;
    private _isInitialized;
    private _filterRegistry;
    /**
     * Create a new TextmodeFilterManager.
     * @param renderer The WebGL renderer instance
     * @ignore
     */
    constructor(renderer: GLRenderer);
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
    register(id: FilterName, shader: GLShader | string, uniformDefs?: Record<string, [paramName: string, defaultValue: unknown]>): Promise<void>;
    /**
     * Unregister a filter by its ID.
     *
     * @param id The filter ID to unregister
     * @returns true if the filter was unregistered, false if it wasn't found
     */
    unregister(id: FilterName): boolean;
    /**
     * Check if a filter with the given ID is registered.
     *
     * @param id The filter ID to check
     * @returns true if the filter exists
     */
    has(id: FilterName): boolean;
    /**
     * Initialize ping-pong buffers for filter chain processing.
     * @param width Buffer width in pixels
     * @param height Buffer height in pixels
     * @ignore
     */
    $initialize(width: number, height: number): void;
    /**
     * Apply a chain of filters to the source texture, outputting to target.
     * Uses the manager's internal ping-pong buffers.
     *
     * @param sourceTexture The input texture
     * @param targetFramebuffer The output framebuffer
     * @param filters The queue of filters to apply in order
     * @param width Framebuffer width
     * @param height Framebuffer height
     * @ignore
     */
    $applyFilters(sourceTexture: WebGLTexture, targetFramebuffer: GLFramebuffer, filters: QueuedFilter[], width: number, height: number): void;
    /**
     * Apply a chain of filters using external ping-pong buffers.
     * This allows sharing the filter registry while using different buffer sizes
     * (e.g., layer filters at grid dimensions vs global filters at canvas dimensions).
     *
     * @param sourceTexture The input texture
     * @param targetFramebuffer The output framebuffer
     * @param filters The queue of filters to apply in order
     * @param width Framebuffer width
     * @param height Framebuffer height
     * @param pingPongBuffers External ping-pong buffers to use
     * @ignore
     */
    $applyFiltersWithBuffers(sourceTexture: WebGLTexture, targetFramebuffer: GLFramebuffer, filters: QueuedFilter[], width: number, height: number, pingPongBuffers: [GLFramebuffer, GLFramebuffer]): void;
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
     * Resize the ping-pong buffers.
     * @param width New width in pixels
     * @param height New height in pixels
     * @ignore
     */
    $resize(width: number, height: number): void;
    /**
     * Dispose of all resources.
     * @ignore
     */
    $dispose(): void;
}
