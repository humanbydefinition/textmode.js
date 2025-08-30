import { TextmodeColorPalette } from "../../ColorPalette";
import type { TextmodeFont } from "../font";
import type { GLRenderer } from "../../rendering/webgl/Renderer";
import type { TextmodeGrid } from "../Grid";
import { TextmodeConverter, type TextmodeConverterOptions } from "./Converter";
import type { Framebuffer } from "../../rendering";
/**
 * Options interface for feature-based textmode converters.
 */
export interface TextmodeFeatureConverterOptions extends TextmodeConverterOptions {
    /** Characters used for mapping, usually ordered from least dense to most dense */
    characters: string;
    /** Color of the characters. Only used when `characterColorMode` is set to `'fixed'` */
    characterColor: [number, number, number, number];
    /** Character color mode */
    characterColorMode: "sampled" | "fixed";
    /** Cell background color. Only used when `cellColorMode` is set to `'fixed'` */
    cellColor: [number, number, number, number];
    /** Background color mode */
    cellColorMode: "sampled" | "fixed";
    /** Swap the character and cell colors */
    invert: boolean;
    /** Rotation angle stored as RGBA where RGB encodes the rotation and A is always 1 */
    rotation: [number, number, number, number];
    /** Flip the characters horizontally */
    flipHorizontally: boolean;
    /** Flip the characters vertically */
    flipVertically: boolean;
}
/**
 * Abstract base class for all feature-based textmode converters like `'brightness'`.
 */
export declare abstract class TextmodeFeatureConverter<TOptions extends TextmodeFeatureConverterOptions = TextmodeFeatureConverterOptions> extends TextmodeConverter<TOptions> {
    protected _palette: TextmodeColorPalette;
    protected constructor(renderer: GLRenderer, fontManager: TextmodeFont, grid: TextmodeGrid, options?: Partial<TOptions>);
    /**
     * Converts the source framebuffer to the target format.
     * @param sourceFramebuffer The source framebuffer to convert.
     * @ignore
     */
    abstract $convert(sourceFramebuffer: Framebuffer): void;
    /**
     * Sets the characters used for mapping.
     * @param characters The characters to use for mapping, usually ordered from least dense to most dense.
     */
    characters(characters: string): void;
    /**
     * Sets the color of the characters affected by the converter.
     * This is only used when `characterColorMode` is set to `'fixed'`.
     * @param r Red component (0-255) or hex string *(e.g., '#FF0000', '#F00', 'FF0000', 'F00')*.
     * @param g Green component (0-255).
     * @param b Blue component (0-255).
     * @param a Alpha component (0-255).
     */
    characterColor(r: number | string, g?: number, b?: number, a?: number): void;
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
     * @param r Red component (0-255) or hex string *(e.g., '#FF0000', '#F00', 'FF0000', 'F00')*.
     * @param g Green component (0-255).
     * @param b Blue component (0-255).
     * @param a Alpha component (0-255).
     */
    cellColor(r: number | string, g?: number, b?: number, a?: number): void;
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
    /**
     * Helper method to parse color values from either hex string or RGB(A) parameters.
     * @param r Red component (0-255) or hex string.
     * @param methodName The name of the calling method for error reporting.
     * @param g Green component (0-255).
     * @param b Blue component (0-255).
     * @param a Alpha component (0-255).
     * @returns Normalized RGBA array [r, g, b, a] (0-1 range) or null if invalid.
     */
    private _parseColor;
    /**
     * Helper method to set color mode with validation.
     * @param mode The color mode to set.
     * @param optionKey The option key to set in _options.
     */
    private _setColorMode;
    /**
     * Helper method to set boolean options with validation.
     * @param value The boolean or number value to set.
     * @param optionKey The option key to set in _options.
     * @param displayName The display name for error messages.
     */
    private _setBooleanOption;
    /**
     * Parses a hex color string and returns RGBA values.
     * @param hex Hex color string (e.g., '#FF0000', '#F00', 'FF0000', 'F00').
     * @returns RGBA array [r, g, b, a] or null if invalid.
     */
    private _parseHexColor;
}
