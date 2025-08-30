import { GLRenderer } from "../../rendering/webgl/Renderer";
import { TextmodeFont } from "../font";
import { TextmodeGrid } from "../Grid";
import { TextmodeFeatureConverter, type TextmodeFeatureConverterOptions } from "./FeatureConverter";
import type { Framebuffer } from "../../rendering";
/**
 * Options interface for the brightness converter.
 */
export interface TextmodeBrightnessConverterOptions extends TextmodeFeatureConverterOptions {
    /** Range of brightness values to map to ASCII characters */
    brightnessRange: [number, number];
}
/**
 * Default brightness converter options used when no options are specified.
 *
 * **Default values:**
 * - `enabled`: `true` - Enable the brightness converter
 * - `characters`: `" .:-=+*%@#"` - Character set for brightness mapping *(from darkest to brightest)*
 * - `characterColor`: `#FFFFFF` - White color for ASCII characters *(only used when `characterColorMode` is `'fixed'`)*
 * - `characterColorMode`: `'sampled'` - Sample character colors from source texture
 * - `cellColor`: `#000000` - Black background color for cells *(only used when `cellColorMode` is `'fixed'`)*
 * - `cellColorMode`: `'fixed'` - Use fixed background color for all cells
 * - `invert`: `false` - Don't swap character and background colors
 * - `rotation`: `0` - No rotation applied to characters
 * - `flipHorizontally`: `false` - Don't flip characters horizontally
 * - `flipVertically`: `false` - Don't flip characters vertically
 * - `brightnessRange`: `[0, 255]` - Full brightness range for character mapping
 */
export declare const BRIGHTNESS_DEFAULT_OPTIONS: TextmodeBrightnessConverterOptions;
/**
 * Converter that maps brightness values from a source texture to ASCII characters.
 */
export declare class TextmodeBrightnessConverter extends TextmodeFeatureConverter<TextmodeBrightnessConverterOptions> {
    private _sampleShader;
    private _colorFillShader;
    private _charMappingShader;
    private _transformFillShader;
    private _rotationFillShader;
    private _sampleFramebuffer;
    /**
     * Creates a new TextmodeBrightnessConverter instance.
     * @param renderer Renderer instance for texture creation
     * @param fontManager Font manager for character extraction and color mapping
     * @param grid Grid manager for layout and positioning
     * @ignore
     */
    constructor(renderer: GLRenderer, fontManager: TextmodeFont, grid: TextmodeGrid);
    $convert(framebuffer: Framebuffer): void;
    $resize(): void;
    /**
     * Sets the brightness range for ASCII character mapping.
     *
     * Cells that sample outside this range are rendered as transparent.
     *
     * @param range Array of two numbers `[min, max]`, where `min` is darkest and `max` is brightest.
     */
    brightnessRange(range: [number, number]): void;
}
