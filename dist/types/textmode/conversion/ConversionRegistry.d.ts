import type { GLShader } from '../../rendering';
import type { UniformValue } from '../../rendering/webgl/types/UniformTypes';
import type { GLRenderer } from '../../rendering/webgl/core/Renderer';
import type { TextmodeGlyphAtlas } from '../fonts/types';
import type { TextmodeSource } from '../media/TextmodeSource';
import type { TextmodeColor } from '../color/TextmodeColor';
import type { ColorTuple } from '../../utils/color';
/**
 * Built-in conversion mode names provided by textmode.js
 */
export type BuiltInConversionMode = 'brightness';
/**
 * Type representing the available textmode conversion modes
 */
export type TextmodeConversionMode = BuiltInConversionMode | string;
/**
 * Color input accepted by conversion stack steps.
 */
export type TextmodeColorInput = number | string | TextmodeColor | ColorTuple;
/**
 * Custom options passed to conversion strategies for one conversion stack pass.
 */
export type TextmodeConversionStepOptions = Record<string, unknown>;
/**
 * One pass in a source-level conversion stack.
 */
export interface TextmodeConversionStep {
    /** Conversion mode to run for this pass. */
    mode: TextmodeConversionMode;
    /** Characters used by this pass when the strategy maps through a character palette. */
    characters?: string;
    /** Minimum captured brightness for this pass in byte-space (0-255). Requires brightnessEnd. */
    brightnessStart?: number;
    /** Maximum captured brightness for this pass in byte-space (0-255). Requires brightnessStart. */
    brightnessEnd?: number;
    /** Invert character/cell colors for this pass. */
    invert?: boolean | number;
    /** Flip characters horizontally for this pass. */
    flipX?: boolean | number;
    /** Flip characters vertically for this pass. */
    flipY?: boolean | number;
    /** Character rotation in degrees for this pass. */
    charRotation?: number;
    /** Character color mode for this pass. */
    charColorMode?: 'sampled' | 'fixed';
    /** Cell color mode for this pass. */
    cellColorMode?: 'sampled' | 'fixed';
    /** Fixed character color for this pass. */
    charColor?: TextmodeColorInput;
    /** Fixed cell color for this pass. */
    cellColor?: TextmodeColorInput;
    /** Strategy-specific options for this pass. */
    options?: TextmodeConversionStepOptions;
}
/**
 * Metadata describing the active pass while a conversion stack is being rendered.
 */
export interface TextmodeConversionPassContext {
    /** Zero-based index of the active pass. */
    index: number;
    /** Total number of passes in the active stack. */
    count: number;
    /** Conversion mode being rendered for this pass. */
    mode: TextmodeConversionMode;
    /** Strategy-specific options for this pass. */
    options: TextmodeConversionStepOptions;
}
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
     * Backend-neutral glyph atlas currently being used for rendering.
     * Prefer this in new code.
     */
    glyphAtlas: TextmodeGlyphAtlas;
    /**
     * Legacy alias for the active glyph atlas.
     * Kept for backward compatibility with existing conversion strategies.
     */
    font: TextmodeGlyphAtlas;
    /**
     * The source asset (image, video, etc.) being converted.
     * Provides access to the source texture and dimensions.
     */
    source: TextmodeSource;
    /**
     * Metadata for the active source-level conversion stack pass.
     *
     * Undefined for legacy single-conversion rendering.
     */
    pass?: TextmodeConversionPassContext;
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
     *
     * @example
     * {@includeCode ../../../examples/conversion/registry/sketch.js}
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
     *
     * @example
     * {@includeCode ../../../examples/conversion/registry/sketch.js}
     */
    createUniforms(context: TextmodeConversionContext): Record<string, UniformValue>;
}
