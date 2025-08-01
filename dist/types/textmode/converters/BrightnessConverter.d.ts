import { GLRenderer } from "../../rendering/webgl/Renderer";
import { Framebuffer } from "../../rendering/webgl/Framebuffer";
import { TextmodeFont } from "../font";
import { TextmodeGrid } from "../Grid";
import { TextmodeFeatureConverter } from "./FeatureConverter";
export declare const BRIGHTNESS_DEFAULT_OPTIONS: {
    /** Enable/disable the renderer */
    enabled: boolean;
    /** Characters used for brightness mapping (from darkest to brightest) */
    characters: string;
    /** Color of the ASCII characters. Only used when `characterColorMode` is set to `fixed` */
    characterColor: number[];
    /** Character color mode */
    characterColorMode: string;
    /** Cell background color. Only used when `characterColorMode` is set to `fixed` */
    cellColor: number[];
    /** Background color mode */
    cellColorMode: string;
    /** Swap the cells ASCII character colors with it's cell background colors */
    invert: boolean;
    /** Rotation angle of all characters in the grid in degrees */
    rotation: number[];
    /** Flip the ASCII characters horizontally */
    flipHorizontally: boolean;
    /** Flip the ASCII characters vertically */
    flipVertically: boolean;
    /** Range of brightness values to map to ASCII characters */
    brightnessRange: [number, number];
};
/**
 * Converter that maps brightness values from a source texture to ASCII characters.
 */
export declare class TextmodeBrightnessConverter extends TextmodeFeatureConverter {
    private sampleShader;
    private colorFillShader;
    private charMappingShader;
    private transformFillShader;
    private rotationFillShader;
    private sampleFramebuffer;
    /**
     * Creates a new TextmodeBrightnessConverter instance.
     * @param renderer Renderer instance for texture creation
     * @param fontManager Font manager for character extraction and color mapping
     * @param grid Grid manager for layout and positioning
     * @ignore
     */
    constructor(renderer: GLRenderer, fontManager: TextmodeFont, grid: TextmodeGrid);
    convert(framebuffer: Framebuffer): void;
    resize(): void;
    /**
     * Sets the brightness range for ASCII character mapping.
     *
     * Cells that sample outside this range are rendered as transparent.
     *
     * @param range Array of two numbers `[min, max]`, where `min` is darkest and `max` is brightest.
     */
    brightnessRange(range: [number, number]): void;
}
