import { Framebuffer } from './rendering/webgl/Framebuffer';
import type { GLRenderer } from './rendering/webgl/Renderer';
/**
 * A 1D color palette stored in a framebuffer that is used to pass colors to shaders.
 *
 * There is no need to modify instances of this class provided by the library,
 * as they are managed internally and can be modified more easily through classes managing them.
 * But you technically could - *if you wanted to* - without breaking anything.
 */
export declare class ColorPalette {
    /** The framebuffer used to store the color palette. */
    private _framebuffer;
    private _renderer;
    private _colors;
    /**
     * Create a new color palette instance.
     * @param renderer The renderer instance.
     * @param colors The RGB colors to store as [r, g, b] arrays where values are 0-255.
     */
    constructor(renderer: GLRenderer, colors: [number, number, number][]);
    /**
     * Update the framebuffer with the currently selected colors.
     */
    private _updateFramebuffer;
    /**
     * Sets the colors of the palette and updates the framebuffer.
     * @param newColors The new RGB colors to set as [r, g, b] arrays.
     */
    setColors(newColors: [number, number, number][]): void;
    /**
     * Get the colors of the palette.
     */
    get colors(): [number, number, number][];
    /**
     * Get the framebuffer containing the colors of the palette.
     */
    get framebuffer(): Framebuffer;
    /**
     * Get the texture from the framebuffer for use in shaders.
     */
    get texture(): WebGLTexture;
}
