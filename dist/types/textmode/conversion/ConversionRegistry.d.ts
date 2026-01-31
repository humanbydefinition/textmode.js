import type { GLShader } from '../../rendering';
import type { UniformValue } from '../../rendering/webgl/types/UniformTypes';
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
 * Interface for the context provided to conversion strategies during shader and uniform creation.
 *
 * This context provides access to the renderer, GL context, source asset, and grid dimensions
 * necessary for implementing custom conversion logic.
 */
export interface TextmodeConversionContext {
    /**
     * The WebGL renderer instance.
     */
    renderer: GLRenderer;
    /**
     * The native WebGL2 rendering context.
     * Use this for creating textures, buffers, or other low-level WebGL resources.
     */
    gl: WebGL2RenderingContext;
    /**
     * The font currently being used for rendering.
     * Useful for accessing font texture data or metrics.
     */
    font: TextmodeFont;
    /**
     * The source asset (image, video, etc.) being converted.
     * Provides access to the source texture and dimensions.
     */
    source: TextmodeSource;
}
/**
 * Interface for defining a custom textmode conversion strategy.
 *
 * A conversion strategy defines how a source image is converted into textmode attributes
 * (character index, primary color, secondary color) via a custom shader.
 *
 * To register a custom strategy, implement this interface and pass it to {@link TextmodeConversionManager.register}.
 */
export interface TextmodeConversionStrategy {
    /**
     * Unique identifier for this conversion strategy.
     * This ID is used to select the strategy via {@link TextmodeSource.conversionMode}.
     */
    readonly id: TextmodeConversionMode;
    /**
     * Create the shader program for this conversion strategy.
     * This method is called once when the strategy is first used for a given source.
     *
     * The shader must output to 3 render targets (MRT):
     * - location 0: Character data (R=char index, G=unused, B=unused, A=unused)
     * - location 1: Primary color (RGBA)
     * - location 2: Secondary/Background color (RGBA)
     *
     * @param context The conversion context containing renderer and source information.
     * @returns The compiled GLShader instance.
     */
    createShader(context: TextmodeConversionContext): GLShader;
    /**
     * Create uniform values for this conversion strategy.
     * This method is called every frame before rendering the conversion pass.
     *
     * Use this to pass dynamic values (like time or source texture) to your shader.
     *
     * @param context The conversion context containing renderer and source information.
     * @returns An object mapping uniform names to values.
     */
    createUniforms(context: TextmodeConversionContext): Record<string, UniformValue>;
}
