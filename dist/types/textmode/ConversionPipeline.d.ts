import type { Framebuffer } from "../rendering/webgl/Framebuffer";
import type { Renderer } from "../rendering/webgl/Renderer";
import { TextmodeConverter } from "./converters";
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
    private renderer;
    private font;
    private grid;
    private converters;
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
    constructor(renderer: Renderer, font: TextmodeFont, grid: TextmodeGrid);
    /**
     * Performs the conversion process by applying all converters in the pipeline.
     * @param sourceFramebuffer The source framebuffer to convert.
     * @ignore
     */
    render(sourceFramebuffer: Framebuffer): void;
    /**
     * Retrieves a converter by name. Useful for accessing the pre-defined converters in the pipeline.
     * @param name The name of the converter to retrieve.
     * @returns The requested {@link TextmodeConverter} instance or `void` if not found.
     */
    get(name: string): TextmodeConverter | void;
    /**
     * Adds a new converter to the pipeline.
     * @param name A unique name for the converter.
     * @param type The type of converter to add. Can be either "brightness" or "custom".
     * @returns The newly created {@link TextmodeConverter} instance or `void` if the addition failed.
     */
    add(name: string, type: "brightness" | "custom"): TextmodeConverter | void;
    /**
 * Removes a converter from the pipeline by name or instance.
 * @param nameOrInstance The unique name of the converter or the converter instance to remove.
 * @returns `true` if the converter was successfully removed, `false` otherwise.
 */
    remove(nameOrInstance: string | TextmodeConverter): boolean;
    /**
     * Returns the framebuffer containing the textmode conversion result.
     */
    get texture(): Framebuffer;
    /**
     * Resizes all internal framebuffers.
     * @ignore
     */
    resize(): void;
    hasEnabledConverters(): boolean;
    /** Returns the character framebuffer containing the combined result of all converters. @ignore */
    get characterFramebuffer(): Framebuffer;
    /** Returns the primary color framebuffer containing the combined result of all converters. @ignore */
    get primaryColorFramebuffer(): Framebuffer;
    /** Returns the secondary color framebuffer containing the combined result of all converters. @ignore */
    get secondaryColorFramebuffer(): Framebuffer;
    /** Returns the rotation framebuffer containing the combined result of all converters. @ignore */
    get rotationFramebuffer(): Framebuffer;
    /** Returns the transform framebuffer containing the combined result of all converters. @ignore */
    get transformFramebuffer(): Framebuffer;
}
