import { ColorPalette } from "../../ColorPalette";
import type { TextmodeFont } from "../font";
import type { GLRenderer } from "../../rendering/webgl/Renderer";
import type { TextmodeGrid } from "../Grid";
import { TextmodeConverter } from "./Converter";
import type { Framebuffer } from "../../rendering/webgl/Framebuffer";
/**
 * Abstract base class for all feature-based textmode converters like `'brightness'`.
 */
export declare abstract class TextmodeFeatureConverter extends TextmodeConverter {
    protected palette: ColorPalette;
    protected constructor(renderer: GLRenderer, fontManager: TextmodeFont, grid: TextmodeGrid, options?: any);
    /**
     * Converts the source framebuffer to the target format.
     * @param sourceFramebuffer The source framebuffer to convert.
     * @ignore
     */
    abstract convert(sourceFramebuffer: Framebuffer): void;
    /**
     * Sets the characters used for mapping.
     * @param characters The characters to use for mapping, usually ordered from darkest to brightest.
     */
    characters(characters: string): void;
    /**
     * Sets the color of the characters affected by the converter.
     * This is only used when `characterColorMode` is set to `'fixed'`.
     * @param r Red component (0-255).
     * @param g Green component (0-255).
     * @param b Blue component (0-255).
     * @param a Alpha component (0-255).
     */
    characterColor(r: number, g?: number, b?: number, a?: number): void;
    /**
     * Sets the character color mode.
     * - `'sampled'`: Uses sampled colors from the source texture.
     * - `'fixed'`: Uses a fixed color set by `characterColor()`.
     * @param mode The color mode to use for characters.
     */
    characterColorMode(mode: "sampled" | "fixed"): void;
    /**
     * Sets the cell color for all cells affected by the converter.
     * This is only used when `cellColorMode` is set to `'fixed'`.
     * @param r Red component (0-255).
     * @param g Green component (0-255).
     * @param b Blue component (0-255).
     * @param a Alpha component (0-255).
     */
    cellColor(r: number, g?: number, b?: number, a?: number): void;
    /**
     * Sets the cell color mode.
     * - `'sampled'`: Uses sampled colors from the source texture.
     * - `'fixed'`: Uses a fixed color set via {@link cellColor}.
     * @param mode The color mode to use for background cells.
     */
    cellColorMode(mode: "sampled" | "fixed"): void;
    /**
     * Swaps the character and cell color.
     * @param invert If `true`, the character color becomes the cell color and vice versa.
     */
    invert(invert: boolean | number): void;
    /**
     * Sets the rotation angle for the characters.
     * @param angle The rotation angle in degrees.
     */
    rotation(angle: number): void;
    /**
     * Flips the characters horizontally.
     * @param flip If `true`, characters are flipped horizontally. If `false`, no flip is applied.
     */
    flipHorizontally(flip: boolean | number): void;
    /**
     * Flips the characters vertically.
     * @param flip If `true`, characters are flipped vertically. If `false`, no flip is applied.
     */
    flipVertically(flip: boolean | number): void;
}
