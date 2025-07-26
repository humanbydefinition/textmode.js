import type { TextmodeFont } from "../font";
import type { Framebuffer } from "../../rendering/webgl/Framebuffer";
import type { Renderer } from "../../rendering/webgl/Renderer";
import type { TextmodeGrid } from "../Grid";
/**
 * Base class for all textmode converters.
 */
export declare class TextmodeConverter {
    protected renderer: Renderer;
    protected fontManager: TextmodeFont;
    protected grid: TextmodeGrid;
    protected _characterFramebuffer: Framebuffer;
    protected _primaryColorFramebuffer: Framebuffer;
    protected _secondaryColorFramebuffer: Framebuffer;
    protected _rotationFramebuffer: Framebuffer;
    protected _transformFramebuffer: Framebuffer;
    protected options: any;
    /**
     * Creates a new TextmodeConverter instance.
     * @param renderer Renderer instance for texture creation
     * @param fontManager Font manager for character extraction and color mapping
     * @param grid Grid instance for managing textmode layout
     * @param options Additional options for the converter
     * @ignore
     */
    constructor(renderer: Renderer, fontManager: TextmodeFont, grid: TextmodeGrid, options?: any);
    /**
     * Resizes all internal framebuffers to match the grid dimensions.
     * @ignore
     */
    resize(): void;
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
}
