import type { Framebuffer } from "../rendering/core/Framebuffer";
import type { GLRenderer } from "../rendering/webgl/Renderer";
import { TextmodeBrightnessConverter, TextmodeConverter } from "./converters";
import type { TextmodeFont } from "./font";
import type { TextmodeGrid } from "./Grid";
/**
 * Manages the conversion pipeline for textmode rendering.
 *
 * A conversion pipeline consists of multiple converters that process the input texture in sequence.
 * Each converter can modify the texture in various ways, such as applying brightness mapping,
 * color adjustments, transformations, and more.
 */
export declare class TextmodeConversionPipeline {
    private _renderer;
    private _font;
    private _grid;
    private _converters;
    private _brightness;
    private _custom;
    private _resultFramebuffer;
    private _asciiShader;
    private _characterFramebuffer;
    private _primaryColorFramebuffer;
    private _secondaryColorFramebuffer;
    private _rotationFramebuffer;
    private _transformFramebuffer;
    /**
     * Creates an instance of TextmodeConversionPipeline.
     * @param renderer The renderer to use for the pipeline.
     * @param font The textmode font to use.
     * @param grid The textmode grid to use.
     * @ignore
     */
    constructor(renderer: GLRenderer, font: TextmodeFont, grid: TextmodeGrid);
    /**
     * Performs the conversion process by applying all converters in the pipeline.
     * @param sourceFramebuffer The source framebuffer to convert.
     * @ignore
     */
    $render(sourceFramebuffer: Framebuffer): void;
    /**
     * Adds a new converter to the pipeline.
     * @param converter The converter instance to add.
     * @returns The added {@link TextmodeConverter} instance.
     */
    /**
     * Adds a new converter to the pipeline.
     * @param type The type of converter to add. Can be either "brightness" or "custom".
     * @returns The newly created {@link TextmodeConverter} instance or `void` if the addition failed.
     */
    add(type: "brightness" | "custom"): TextmodeConverter | void;
    /**
     * Removes a converter from the pipeline.
     * @param converter The converter instance to remove.
     */
    remove(converter: TextmodeConverter): void;
    /**
     * Swaps two converters in the pipeline.
     * @param first Either an index *(integer)* or a {@link TextmodeConverter} instance.
     * @param second Either an index *(integer)* or a {@link TextmodeConverter} instance.
     */
    swap(first: number | TextmodeConverter, second: number | TextmodeConverter): void;
    /**
     * Resizes all internal framebuffers.
     * @ignore
     */
    $resize(): void;
    /**
     * Checks if any converter in the pipeline is enabled.
     * @returns `true` if any converter is enabled, `false` otherwise.
     */
    hasEnabledConverters(): boolean;
    /**
     * Disables all converters in the pipeline.
     */
    disable(): void;
    /**
     * Enables all converters in the pipeline.
     */
    enable(): void;
    /**
     * Dispose of all resources used by this conversion pipeline.
     * @ignore
     */
    $dispose(): void;
    /** Returns the framebuffer containing the textmode conversion result.*/
    get texture(): Framebuffer;
    /** Returns the character framebuffer containing the combined result of all converters. */
    get characterFramebuffer(): Framebuffer;
    /** Returns the primary color framebuffer containing the combined result of all converters. */
    get primaryColorFramebuffer(): Framebuffer;
    /** Returns the secondary color framebuffer containing the combined result of all converters. */
    get secondaryColorFramebuffer(): Framebuffer;
    /** Returns the rotation framebuffer containing the combined result of all converters. */
    get rotationFramebuffer(): Framebuffer;
    /** Returns the transform framebuffer containing the combined result of all converters. */
    get transformFramebuffer(): Framebuffer;
    /**
     * Returns the pre-defined brightness converter that is part of the pipeline by default.
     *
     * This converter can also be removed from the pipeline via `pipeline.remove(pipeline.brightness)`.
     */
    get brightness(): TextmodeBrightnessConverter;
    /**
     * Returns the pre-defined custom converter that is part of the pipeline by default.
     *
     * This converter can also be removed from the pipeline via `pipeline.remove(pipeline.custom)`.
     */
    get custom(): TextmodeConverter;
}
