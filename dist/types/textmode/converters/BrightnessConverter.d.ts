import { Renderer } from "../../rendering/Renderer";
import { Framebuffer } from "../../rendering/Framebuffer";
import { TextmodeFont } from "../Font";
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
    backgroundColor: number[];
    /** Background color mode */
    backgroundColorMode: string;
    /** Swap the cells ASCII character colors with it's cell background colors */
    invert: boolean;
    /** Rotation angle of all characters in the grid in degrees */
    rotation: number;
    /** Flip the ASCII characters horizontally */
    flipHorizontally: boolean;
    /** Flip the ASCII characters vertically */
    flipVertically: boolean;
    /** Range of brightness values to map to ASCII characters */
    brightnessRange: [number, number];
};
export declare class TextmodeBrightnessConverter extends TextmodeFeatureConverter {
    private sampleShader;
    private charMappingShader;
    sampleFramebuffer: Framebuffer;
    constructor(renderer: Renderer, fontManager: TextmodeFont, grid: TextmodeGrid);
    convert(framebuffer: Framebuffer): void;
    resize(): void;
    brightnessRange(range: [number, number]): void;
}
