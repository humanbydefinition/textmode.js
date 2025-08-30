import type { TextmodeFont } from "../font";
import type { GLRenderer } from "../../rendering/webgl/Renderer";
import type { TextmodeGrid } from "../Grid";
import type { Framebuffer } from "../../rendering";
/**
 * Base options interface for all textmode converters.
 */
export interface TextmodeConverterOptions {
    /** Enable/disable the converter */
    enabled: boolean;
}
/**
 * Base class for all textmode converters.
 */
export declare class TextmodeConverter<TOptions extends TextmodeConverterOptions = TextmodeConverterOptions> {
    protected _renderer: GLRenderer;
    protected _fontManager: TextmodeFont;
    protected _grid: TextmodeGrid;
    protected _characterFramebuffer: Framebuffer;
    protected _primaryColorFramebuffer: Framebuffer;
    protected _secondaryColorFramebuffer: Framebuffer;
    protected _rotationFramebuffer: Framebuffer;
    protected _transformFramebuffer: Framebuffer;
    protected _options: TOptions;
    /**
     * Creates a new TextmodeConverter instance.
     * @param renderer Renderer instance for texture creation
     * @param fontManager Font manager for character extraction and color mapping
     * @param grid Grid instance for managing textmode layout
     * @param options Additional options for the converter
     * @ignore
     */
    constructor(renderer: GLRenderer, fontManager: TextmodeFont, grid: TextmodeGrid, options?: Partial<TOptions>);
    /**
     * Resizes all internal framebuffers to match the grid dimensions.
     * @ignore
     */
    $resize(): void;
    /**
     * Enables or disables the converter.
     * @param enabled Whether to enable or disable the converter.<br/>Accepts boolean or number *(0 = false, any other number = true)*.
     */
    enabled(enabled: boolean | number): void;
    /**
     * Enables the converter.
     */
    enable(): void;
    /**
     * Disables the converter.
     */
    disable(): void;
    /**
     * Dispose of all framebuffers used by this converter.
     * @ignore
     */
    $dispose(): void;
    /** Returns the framebuffer containing character data. */
    get characterFramebuffer(): Framebuffer;
    /** Returns the framebuffer containing primary color data. */
    get primaryColorFramebuffer(): Framebuffer;
    /** Returns the framebuffer containing secondary color data. */
    get secondaryColorFramebuffer(): Framebuffer;
    /** Returns the framebuffer containing rotation data. */
    get rotationFramebuffer(): Framebuffer;
    /** Returns the framebuffer containing transformation data. */
    get transformFramebuffer(): Framebuffer;
    /** Returns the defined options for this converter. */
    get options(): TOptions;
}
