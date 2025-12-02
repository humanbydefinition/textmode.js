import type { GLShader } from '../../rendering';
import type { GLRenderer } from '../../rendering/webgl/core/Renderer';
/**
 * Built-in filter names provided by textmode.js
 */
export type BuiltInFilterName = 'invert' | 'grayscale' | 'sepia' | 'threshold';
/**
 * Filter name type that allows both built-in and custom filter names
 */
export type FilterName = BuiltInFilterName | string;
/**
 * Filter parameter types for built-in filters.
 *
 * Most filters accept either a single number (for the primary parameter)
 * or an object with named properties.
 */
export interface BuiltInFilterParams {
    /** Inverts all colors (no params needed) */
    invert: void;
    /** Converts to grayscale. Amount: 0-1, default 1 */
    grayscale: number | {
        amount?: number;
    } | void;
    /** Applies sepia tone. Amount: 0-1, default 1 */
    sepia: number | {
        amount?: number;
    } | void;
    /** Black/white threshold. Threshold: 0-1, default 0.5 */
    threshold: number | {
        threshold?: number;
    };
}
/**
 * A queued filter operation to be applied during rendering
 * @ignore
 */
export interface QueuedFilter {
    name: FilterName;
    params: unknown;
}
/**
 * Context provided to filter strategies for shader creation
 * @ignore
 */
export interface FilterContext {
    /** The WebGL renderer instance */
    renderer: GLRenderer;
    /** The WebGL2 rendering context */
    gl: WebGL2RenderingContext;
    /** Width of the framebuffer being filtered */
    width: number;
    /** Height of the framebuffer being filtered */
    height: number;
}
/**
 * Interface for implementing custom filter strategies.
 * @ignore
 */
export interface TextmodeFilterStrategy {
    /** Unique identifier for this filter */
    readonly id: FilterName;
    /**
     * Create the shader program for this filter.
     * Called once when the filter is first used (lazy initialization).
     * @param context The filter context containing renderer and dimensions
     * @returns The compiled shader program
     */
    createShader(context: FilterContext): GLShader;
    /**
     * Create uniform values for this filter based on user parameters.
     * Called each time the filter is applied.
     * @param params The parameters passed by the user (can be undefined)
     * @param context The filter context containing dimensions
     * @returns An object mapping uniform names to values
     */
    createUniforms(params: unknown, context: FilterContext): Record<string, unknown>;
}
