import type { GLShader } from '../../rendering';
/**
 * Built-in filter names provided by textmode.js
 *
 * @see {@link https://code.textmode.art/api/textmode.js/namespaces/filters/type-aliases/BuiltInFilterName | filters.BuiltInFilterName API reference}
 */
export type BuiltInFilterName = 'invert' | 'grayscale' | 'sepia' | 'threshold';
/**
 * Filter name type that allows both built-in and custom filter names
 *
 * @see {@link https://code.textmode.art/api/textmode.js/namespaces/filters/type-aliases/FilterName | filters.FilterName API reference}
 */
export type FilterName = BuiltInFilterName | string;
/**
 * Filter parameter types for built-in filters.
 *
 * Most filters accept either a single number (for the primary parameter)
 * or an object with named properties.
 *
 * @see {@link https://code.textmode.art/api/textmode.js/namespaces/filters/interfaces/BuiltInFilterParams | filters.BuiltInFilterParams API reference}
 */
export interface BuiltInFilterParams {
    /**
     * Inverts all colors (no params needed)
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/filters/interfaces/BuiltInFilterParams#invert | filters.BuiltInFilterParams.invert API reference}
     */
    invert: void;
    /**
     * Converts to grayscale. Amount: 0-1, default 1
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/filters/interfaces/BuiltInFilterParams#grayscale | filters.BuiltInFilterParams.grayscale API reference}
     */
    grayscale: number | {
        amount?: number;
    } | void;
    /**
     * Applies sepia tone. Amount: 0-1, default 1
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/filters/interfaces/BuiltInFilterParams#sepia | filters.BuiltInFilterParams.sepia API reference}
     */
    sepia: number | {
        amount?: number;
    } | void;
    /**
     * Black/white threshold. Threshold: 0-1, default 0.5
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/filters/interfaces/BuiltInFilterParams#threshold | filters.BuiltInFilterParams.threshold API reference}
     */
    threshold: number | {
        threshold?: number;
    };
}
/**
 * Uniform definitions used when registering custom filters with {@link TextmodeFilterManager.register}.
 *
 * Each key is the shader uniform name. Each value maps that uniform to a filter
 * parameter name and fallback value.
 *
 * @see {@link https://code.textmode.art/api/textmode.js/namespaces/filters/type-aliases/TextmodeFilterUniformDefinitions | filters.TextmodeFilterUniformDefinitions API reference}
 */
export type TextmodeFilterUniformDefinitions = Record<string, [paramName: string, defaultValue: unknown]>;
/**
 * A queued filter operation to be applied during rendering
 */
export interface QueuedFilter<TParams = unknown> {
    name: FilterName;
    params: TParams;
}
/**
 * Context provided to filter strategies for shader creation
 *
 * @see {@link https://code.textmode.art/api/textmode.js/namespaces/filters/interfaces/FilterContext | filters.FilterContext API reference}
 */
export interface FilterContext {
    /**
     * The WebGL2 rendering context
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/filters/interfaces/FilterContext#gl | filters.FilterContext.gl API reference}
     */
    gl: WebGL2RenderingContext;
    /**
     * Width of the framebuffer being filtered
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/filters/interfaces/FilterContext#width | filters.FilterContext.width API reference}
     */
    width: number;
    /**
     * Height of the framebuffer being filtered
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/filters/interfaces/FilterContext#height | filters.FilterContext.height API reference}
     */
    height: number;
}
/**
 * Interface for implementing custom filter strategies.
 *
 * @see {@link https://code.textmode.art/api/textmode.js/namespaces/filters/interfaces/TextmodeFilterStrategy | filters.TextmodeFilterStrategy API reference}
 */
export interface TextmodeFilterStrategy<TParams = unknown> {
    /**
     * Unique identifier for this filter
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/filters/interfaces/TextmodeFilterStrategy#id | filters.TextmodeFilterStrategy.id API reference}
     */
    readonly id: FilterName;
    /**
     * Create the shader program for this filter.
     * Called once when the filter is first used (lazy initialization).
     * @param context The filter context containing renderer and dimensions
     * @returns The compiled shader program
     *
     * @example
     * ```ts
     * createShader: () => shader
     * ```
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/filters/interfaces/TextmodeFilterStrategy#createshader | filters.TextmodeFilterStrategy.createShader API reference}
     */
    createShader(context: FilterContext): GLShader;
    /**
     * Create uniform values for this filter based on user parameters.
     * Called each time the filter is applied.
     * @param params The parameters passed by the user (can be undefined)
     * @param context The filter context containing dimensions
     * @returns An object mapping uniform names to values
     *
     * @example
     * ```ts
     * createUniforms: (params) => ({ u_amount: params?.amount ?? 1 })
     * ```
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/filters/interfaces/TextmodeFilterStrategy#createuniforms | filters.TextmodeFilterStrategy.createUniforms API reference}
     */
    createUniforms(params: TParams, context: FilterContext): Record<string, unknown>;
}
