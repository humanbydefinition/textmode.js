import type { GLShader } from '../../rendering';
import type { TextmodeGlyphAtlas } from '../fonts/types';
import type { TextmodeColor } from '../color/TextmodeColor';
import type { TextmodeColorTuple } from '../../utils/color';
/**
 * Built-in conversion mode names provided by textmode.js
 *
 * @see {@link https://code.textmode.art/api/textmode.js/namespaces/conversion/type-aliases/BuiltInConversionMode | conversion.BuiltInConversionMode API reference}
 */
export type BuiltInConversionMode = 'brightness';
/**
 * Type representing the available textmode conversion modes
 *
 * @see {@link https://code.textmode.art/api/textmode.js/namespaces/conversion/type-aliases/TextmodeConversionMode | conversion.TextmodeConversionMode API reference}
 */
export type TextmodeConversionMode = BuiltInConversionMode | string;
/**
 * Color input accepted by conversion stack steps.
 *
 * @see {@link https://code.textmode.art/api/textmode.js/namespaces/conversion/type-aliases/TextmodeColorInput | conversion.TextmodeColorInput API reference}
 */
export type TextmodeColorInput = number | string | TextmodeColor | TextmodeColorTuple;
/**
 * Custom options passed to conversion strategies for one conversion stack pass.
 *
 * @see {@link https://code.textmode.art/api/textmode.js/namespaces/conversion/type-aliases/TextmodeConversionStepOptions | conversion.TextmodeConversionStepOptions API reference}
 */
export type TextmodeConversionStepOptions = Record<string, unknown>;
/**
 * One pass in a source-level conversion stack.
 *
 * @see {@link https://code.textmode.art/api/textmode.js/namespaces/conversion/interfaces/TextmodeConversionStep | conversion.TextmodeConversionStep API reference}
 */
export interface TextmodeConversionStep {
    /**
     * Conversion mode to run for this pass.
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/conversion/interfaces/TextmodeConversionStep#mode | conversion.TextmodeConversionStep.mode API reference}
     */
    mode: TextmodeConversionMode;
    /**
     * Characters used by this pass when the strategy maps through a character palette.
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/conversion/interfaces/TextmodeConversionStep#characters | conversion.TextmodeConversionStep.characters API reference}
     */
    characters?: string;
    /**
     * Minimum captured brightness for this pass in byte-space (0-255). Requires brightnessEnd.
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/conversion/interfaces/TextmodeConversionStep#brightnessstart | conversion.TextmodeConversionStep.brightnessStart API reference}
     */
    brightnessStart?: number;
    /**
     * Maximum captured brightness for this pass in byte-space (0-255). Requires brightnessStart.
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/conversion/interfaces/TextmodeConversionStep#brightnessend | conversion.TextmodeConversionStep.brightnessEnd API reference}
     */
    brightnessEnd?: number;
    /**
     * Invert character/cell colors for this pass.
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/conversion/interfaces/TextmodeConversionStep#invert | conversion.TextmodeConversionStep.invert API reference}
     */
    invert?: boolean | number;
    /**
     * Flip characters horizontally for this pass.
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/conversion/interfaces/TextmodeConversionStep#flipx | conversion.TextmodeConversionStep.flipX API reference}
     */
    flipX?: boolean | number;
    /**
     * Flip characters vertically for this pass.
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/conversion/interfaces/TextmodeConversionStep#flipy | conversion.TextmodeConversionStep.flipY API reference}
     */
    flipY?: boolean | number;
    /**
     * Character rotation in degrees for this pass.
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/conversion/interfaces/TextmodeConversionStep#charrotation | conversion.TextmodeConversionStep.charRotation API reference}
     */
    charRotation?: number;
    /**
     * Character color mode for this pass.
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/conversion/interfaces/TextmodeConversionStep#charcolormode | conversion.TextmodeConversionStep.charColorMode API reference}
     */
    charColorMode?: 'sampled' | 'fixed';
    /**
     * Cell color mode for this pass.
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/conversion/interfaces/TextmodeConversionStep#cellcolormode | conversion.TextmodeConversionStep.cellColorMode API reference}
     */
    cellColorMode?: 'sampled' | 'fixed';
    /**
     * Fixed character color for this pass.
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/conversion/interfaces/TextmodeConversionStep#charcolor | conversion.TextmodeConversionStep.charColor API reference}
     */
    charColor?: TextmodeColorInput;
    /**
     * Fixed cell color for this pass.
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/conversion/interfaces/TextmodeConversionStep#cellcolor | conversion.TextmodeConversionStep.cellColor API reference}
     */
    cellColor?: TextmodeColorInput;
    /**
     * Strategy-specific options for this pass.
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/conversion/interfaces/TextmodeConversionStep#options | conversion.TextmodeConversionStep.options API reference}
     */
    options?: TextmodeConversionStepOptions;
}
/**
 * Metadata describing the active pass while a conversion stack is being rendered.
 *
 * @see {@link https://code.textmode.art/api/textmode.js/namespaces/conversion/interfaces/TextmodeConversionPassContext | conversion.TextmodeConversionPassContext API reference}
 */
export interface TextmodeConversionPassContext {
    /**
     * Zero-based index of the active pass.
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/conversion/interfaces/TextmodeConversionPassContext#index | conversion.TextmodeConversionPassContext.index API reference}
     */
    index: number;
    /**
     * Total number of passes in the active stack.
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/conversion/interfaces/TextmodeConversionPassContext#count | conversion.TextmodeConversionPassContext.count API reference}
     */
    count: number;
    /**
     * Conversion mode being rendered for this pass.
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/conversion/interfaces/TextmodeConversionPassContext#mode | conversion.TextmodeConversionPassContext.mode API reference}
     */
    mode: TextmodeConversionMode;
    /**
     * Strategy-specific options for this pass.
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/conversion/interfaces/TextmodeConversionPassContext#options | conversion.TextmodeConversionPassContext.options API reference}
     */
    options: TextmodeConversionStepOptions;
}
/**
 * Read-only source view exposed to conversion strategies.
 *
 * @see {@link https://code.textmode.art/api/textmode.js/namespaces/conversion/interfaces/TextmodeConversionSource | conversion.TextmodeConversionSource API reference}
 */
export interface TextmodeConversionSource {
    /**
     * WebGL texture backing the source.
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/conversion/interfaces/TextmodeConversionSource#texture | conversion.TextmodeConversionSource.texture API reference}
     */
    readonly texture: WebGLTexture;
    /**
     * Ideal draw width in grid cells.
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/conversion/interfaces/TextmodeConversionSource#width | conversion.TextmodeConversionSource.width API reference}
     */
    readonly width: number;
    /**
     * Ideal draw height in grid cells.
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/conversion/interfaces/TextmodeConversionSource#height | conversion.TextmodeConversionSource.height API reference}
     */
    readonly height: number;
    /**
     * Original source width in pixels.
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/conversion/interfaces/TextmodeConversionSource#originalwidth | conversion.TextmodeConversionSource.originalWidth API reference}
     */
    readonly originalWidth: number;
    /**
     * Original source height in pixels.
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/conversion/interfaces/TextmodeConversionSource#originalheight | conversion.TextmodeConversionSource.originalHeight API reference}
     */
    readonly originalHeight: number;
}
/**
 * Interface for the context provided to conversion strategies during shader and uniform creation.
 *
 * This context provides access to the renderer, GL context, source asset, and grid dimensions
 * necessary for implementing custom conversion logic.
 *
 * @see {@link https://code.textmode.art/api/textmode.js/namespaces/conversion/interfaces/TextmodeConversionContext | conversion.TextmodeConversionContext API reference}
 */
export interface TextmodeConversionContext {
    /**
     * The native WebGL2 rendering context.
     * Use this for creating textures, buffers, or other low-level WebGL resources.
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/conversion/interfaces/TextmodeConversionContext#gl | conversion.TextmodeConversionContext.gl API reference}
     */
    gl: WebGL2RenderingContext;
    /**
     * Backend-neutral glyph atlas currently being used for rendering.
     * Prefer this in new code.
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/conversion/interfaces/TextmodeConversionContext#glyphatlas | conversion.TextmodeConversionContext.glyphAtlas API reference}
     */
    glyphAtlas: TextmodeGlyphAtlas;
    /**
     * Legacy alias for the active glyph atlas.
     * Kept for backward compatibility with existing conversion strategies.
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/conversion/interfaces/TextmodeConversionContext#font | conversion.TextmodeConversionContext.font API reference}
     */
    font: TextmodeGlyphAtlas;
    /**
     * The source asset (image, video, etc.) being converted.
     * Provides access to the source texture and dimensions.
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/conversion/interfaces/TextmodeConversionContext#source | conversion.TextmodeConversionContext.source API reference}
     */
    source: TextmodeConversionSource;
    /**
     * Create the standard source conversion uniforms for this strategy call.
     *
     * These uniforms include the source texture, color settings, flip/invert flags,
     * brightness range, and character palette texture for the active pass.
     *
     * @example
     * {@includeCode ../../../examples/conversion/createUniforms/sketch.js}
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/conversion/interfaces/TextmodeConversionContext#createbaseuniforms | conversion.TextmodeConversionContext.createBaseUniforms API reference}
     */
    createBaseUniforms(): Record<string, unknown>;
    /**
     * Metadata for the active source-level conversion stack pass.
     *
     * Undefined for legacy single-conversion rendering.
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/conversion/interfaces/TextmodeConversionContext#pass | conversion.TextmodeConversionContext.pass API reference}
     */
    pass?: TextmodeConversionPassContext;
}
/**
 * Interface for defining a custom textmode conversion strategy.
 *
 * A conversion strategy defines how a source image is converted into textmode attributes
 * (glyph index, charColor, cellColor) via a custom shader.
 *
 * To register a custom strategy, implement this interface and pass it to {@link TextmodeConversionManager.register}.
 *
 * @see {@link https://code.textmode.art/api/textmode.js/namespaces/conversion/interfaces/TextmodeConversionStrategy | conversion.TextmodeConversionStrategy API reference}
 */
export interface TextmodeConversionStrategy {
    /**
     * Unique identifier for this conversion strategy.
     * This ID is used to select the strategy via `TextmodeSource.conversionMode`.
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/conversion/interfaces/TextmodeConversionStrategy#id | conversion.TextmodeConversionStrategy.id API reference}
     */
    readonly id: TextmodeConversionMode;
    /**
     * Create the shader program for this conversion strategy.
     * Called once when the strategy is first used for a given source.
     *
     * The shader must output to 3 MRT attachments:
     * - location 0: Character data (R=glyph index, G=unused, B=unused, A=unused)
     * - location 1: charColor (RGBA)
     * - location 2: cellColor (RGBA)
     *
     * @param context The conversion context containing renderer and source information.
     * @returns The compiled GLShader instance.
     *
     * @example
     * {@includeCode ../../../examples/conversion/createShader/sketch.js}
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/conversion/interfaces/TextmodeConversionStrategy#createshader | conversion.TextmodeConversionStrategy.createShader API reference}
     */
    createShader(context: TextmodeConversionContext): GLShader;
    /**
     * Create uniform values for this conversion strategy.
     * Called every frame before rendering the conversion pass.
     *
     * Use this to pass dynamic values (like time or source texture) to your shader.
     *
     * @param context The conversion context containing renderer and source information.
     * @returns An object mapping uniform names to values.
     *
     * @example
     * {@includeCode ../../../examples/conversion/createUniforms/sketch.js}
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/conversion/interfaces/TextmodeConversionStrategy#createuniforms | conversion.TextmodeConversionStrategy.createUniforms API reference}
     */
    createUniforms(context: TextmodeConversionContext): Record<string, unknown>;
}
