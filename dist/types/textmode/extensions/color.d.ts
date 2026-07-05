import { TextmodeColor } from '../color';
import type { TextmodeColorMode, TextmodeColorModeState } from '../color';
declare module '../Textmodifier' {
    interface Textmodifier {
        /**
         * Current color interpretation mode.
         * @returns Current color mode and channel maxes.
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/colorMode/sketch.js}
         *
         * @see {@link https://code.textmode.art/api/textmode.js/classes/Textmodifier/methods/colorMode | Textmodifier.colorMode API reference}
         */
        colorMode(): TextmodeColorModeState;
        /**
         * Set how numeric color inputs are interpreted.
         *
         * Supported modes are `'rgb'`, `'hsb'`, and `'hsl'`. Passing one max uses
         * that range for all channels. Passing per-channel maxes uses `maxA` for
         * alpha, defaulting to the selected mode's alpha max.
         *
         * @param mode Color mode to use for numeric colors.
         * @param max Shared channel max.
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/colorMode/sketch.js}
         *
         * @see {@link https://code.textmode.art/api/textmode.js/classes/Textmodifier/methods/colorMode | Textmodifier.colorMode API reference}
         */
        colorMode(mode: TextmodeColorMode, max?: number): void;
        /**
         * Set how numeric color inputs are interpreted with per-channel ranges.
         * @param mode Color mode to use for numeric colors.
         * @param max1 Red or hue max.
         * @param max2 Green or saturation max.
         * @param max3 Blue, brightness, or lightness max.
         * @param maxA Alpha max.
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/colorMode/sketch.js}
         *
         * @see {@link https://code.textmode.art/api/textmode.js/classes/Textmodifier/methods/colorMode | Textmodifier.colorMode API reference}
         */
        colorMode(mode: TextmodeColorMode, max1: number, max2: number, max3: number, maxA?: number): void;
        /**
         * Create a reusable color object from a grayscale value.
         *
         * @param gray Grayscale value (0-255)
         * @param alpha Optional alpha value (0-255)
         * @returns A TextmodeColor instance
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/color/sketch.js}
         *
         * @see {@link https://code.textmode.art/api/textmode.js/classes/Textmodifier/methods/color | Textmodifier.color API reference}
         */
        color(gray: number, alpha?: number): TextmodeColor;
        /**
         * Create a reusable color object from RGB(A) values.
         *
         * @param r Red component (0-255)
         * @param g Green component (0-255)
         * @param b Blue component (0-255)
         * @param a Optional alpha component (0-255)
         * @returns A TextmodeColor instance
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/color2/sketch.js}
         *
         * @see {@link https://code.textmode.art/api/textmode.js/classes/Textmodifier/methods/color | Textmodifier.color API reference}
         */
        color(r: number, g: number, b: number, a?: number): TextmodeColor;
        /**
         * Create a reusable color object from a CSS string or existing TextmodeColor.
         *
         * Accepts hex strings (e.g. `'#FF0000'`) and `rgb()`/`rgba()` strings.
         * **Note:** Named CSS colors (e.g., `'red'`, `'blue'`) are **not** supported.
         *
         * @param value Hex string, `rgb()`/`rgba()` string, or an existing color object
         * @returns A TextmodeColor instance
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/color3/sketch.js}
         *
         * @see {@link https://code.textmode.art/api/textmode.js/classes/Textmodifier/methods/color | Textmodifier.color API reference}
         */
        color(value: string | TextmodeColor): TextmodeColor;
        /**
         * Current background color.
         * @returns Current background color.
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/background/sketch.js}
         *
         * @see {@link https://code.textmode.art/api/textmode.js/classes/Textmodifier/methods/background | Textmodifier.background API reference}
         */
        background(): TextmodeColor;
        /**
         * Set the background color using a grayscale value.
         * @param gray Grayscale value (0-255)
         * @param alpha Optional alpha value (0-255)
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/background2/sketch.js}
         *
         * @see {@link https://code.textmode.art/api/textmode.js/classes/Textmodifier/methods/background | Textmodifier.background API reference}
         */
        background(gray: number, alpha?: number): void;
        /**
         * Set the background color using RGB(A) values.
         * @param r Red component (0-255)
         * @param g Green component (0-255)
         * @param b Blue component (0-255)
         * @param a Optional alpha component (0-255)
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/background3/sketch.js}
         *
         * @see {@link https://code.textmode.art/api/textmode.js/classes/Textmodifier/methods/background | Textmodifier.background API reference}
         */
        background(r: number, g: number, b: number, a?: number): void;
        /**
         * Set the background color using a CSS string or TextmodeColor object.
         * @param value Hex string, `rgb()`/`rgba()` string, or an existing color object
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/background4/sketch.js}
         *
         * @see {@link https://code.textmode.art/api/textmode.js/classes/Textmodifier/methods/background | Textmodifier.background API reference}
         */
        background(value: string | TextmodeColor): void;
        /**
         * Clear the layer currently drawing to.
         *
         * Used to clear the layer at the start of its drawing cycle.
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/clear/sketch.js}
         *
         * @see {@link https://code.textmode.art/api/textmode.js/classes/Textmodifier/methods/clear | Textmodifier.clear API reference}
         */
        clear(): void;
        /**
         * Current character color.
         * @returns Current character color.
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/charColor/sketch.js}
         *
         * @see {@link https://code.textmode.art/api/textmode.js/classes/Textmodifier/methods/charColor | Textmodifier.charColor API reference}
         */
        charColor(): TextmodeColor;
        /**
         * Set the character color using a grayscale value.
         * @param gray Grayscale value (0-255)
         * @param alpha Optional alpha value (0-255)
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/charColor2/sketch.js}
         *
         * @see {@link https://code.textmode.art/api/textmode.js/classes/Textmodifier/methods/charColor | Textmodifier.charColor API reference}
         */
        charColor(gray: number, alpha?: number): void;
        /**
         * Set the character color using RGB(A) values.
         * @param r Red component (0-255)
         * @param g Green component (0-255)
         * @param b Blue component (0-255)
         * @param a Optional alpha component (0-255)
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/charColor3/sketch.js}
         *
         * @see {@link https://code.textmode.art/api/textmode.js/classes/Textmodifier/methods/charColor | Textmodifier.charColor API reference}
         */
        charColor(r: number, g: number, b: number, a?: number): void;
        /**
         * Set the character color using a CSS string or TextmodeColor object.
         * @param value Hex string, `rgb()`/`rgba()` string, or an existing color object
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/charColor4/sketch.js}
         *
         * @see {@link https://code.textmode.art/api/textmode.js/classes/Textmodifier/methods/charColor | Textmodifier.charColor API reference}
         */
        charColor(value: string | TextmodeColor): void;
        /**
         * Alias for {@link charColor}. Current stroke (character) color.
         * @returns Current character color.
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/stroke/sketch.js}
         *
         * @see {@link https://code.textmode.art/api/textmode.js/classes/Textmodifier/methods/stroke | Textmodifier.stroke API reference}
         */
        stroke(): TextmodeColor;
        /**
         * Alias for {@link charColor}. Set the stroke (character) color using a grayscale value.
         * @param gray Grayscale value (0-255)
         * @param alpha Optional alpha value (0-255)
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/stroke/sketch.js}
         *
         * @see {@link https://code.textmode.art/api/textmode.js/classes/Textmodifier/methods/stroke | Textmodifier.stroke API reference}
         */
        stroke(gray: number, alpha?: number): void;
        /**
         * Alias for {@link charColor}. Set the stroke (character) color using RGB(A) values.
         * @param r Red component (0-255)
         * @param g Green component (0-255)
         * @param b Blue component (0-255)
         * @param a Optional alpha component (0-255)
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/stroke/sketch.js}
         *
         * @see {@link https://code.textmode.art/api/textmode.js/classes/Textmodifier/methods/stroke | Textmodifier.stroke API reference}
         */
        stroke(r: number, g: number, b: number, a?: number): void;
        /**
         * Alias for {@link charColor}. Set the stroke (character) color using a CSS string or TextmodeColor object.
         * @param value Hex string, `rgb()`/`rgba()` string, or an existing color object
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/stroke/sketch.js}
         *
         * @see {@link https://code.textmode.art/api/textmode.js/classes/Textmodifier/methods/stroke | Textmodifier.stroke API reference}
         */
        stroke(value: string | TextmodeColor): void;
        /**
         * Current cell background color.
         * @returns Current cell color.
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/cellColor/sketch.js}
         *
         * @see {@link https://code.textmode.art/api/textmode.js/classes/Textmodifier/methods/cellColor | Textmodifier.cellColor API reference}
         */
        cellColor(): TextmodeColor;
        /**
         * Set the cell background color using a grayscale value.
         * @param gray Grayscale value (0-255)
         * @param alpha Optional alpha value (0-255)
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/cellColor2/sketch.js}
         *
         * @see {@link https://code.textmode.art/api/textmode.js/classes/Textmodifier/methods/cellColor | Textmodifier.cellColor API reference}
         */
        cellColor(gray: number, alpha?: number): void;
        /**
         * Set the cell background color using RGB(A) values.
         * @param r Red component (0-255)
         * @param g Green component (0-255)
         * @param b Blue component (0-255)
         * @param a Optional alpha component (0-255)
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/cellColor3/sketch.js}
         *
         * @see {@link https://code.textmode.art/api/textmode.js/classes/Textmodifier/methods/cellColor | Textmodifier.cellColor API reference}
         */
        cellColor(r: number, g: number, b: number, a?: number): void;
        /**
         * Set the cell background color using a CSS string or TextmodeColor object.
         * @param value Hex string, `rgb()`/`rgba()` string, or an existing color object
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/cellColor4/sketch.js}
         *
         * @see {@link https://code.textmode.art/api/textmode.js/classes/Textmodifier/methods/cellColor | Textmodifier.cellColor API reference}
         */
        cellColor(value: string | TextmodeColor): void;
        /**
         * Alias for {@link cellColor}. Current fill (cell background) color.
         * @returns Current cell color.
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/fill/sketch.js}
         *
         * @see {@link https://code.textmode.art/api/textmode.js/classes/Textmodifier/methods/fill | Textmodifier.fill API reference}
         */
        fill(): TextmodeColor;
        /**
         * Alias for {@link cellColor}. Set the fill (cell background) color using a grayscale value.
         * @param gray Grayscale value (0-255)
         * @param alpha Optional alpha value (0-255)
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/fill/sketch.js}
         *
         * @see {@link https://code.textmode.art/api/textmode.js/classes/Textmodifier/methods/fill | Textmodifier.fill API reference}
         */
        fill(gray: number, alpha?: number): void;
        /**
         * Alias for {@link cellColor}. Set the fill (cell background) color using RGB(A) values.
         * @param r Red component (0-255)
         * @param g Green component (0-255)
         * @param b Blue component (0-255)
         * @param a Optional alpha component (0-255)
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/fill/sketch.js}
         *
         * @see {@link https://code.textmode.art/api/textmode.js/classes/Textmodifier/methods/fill | Textmodifier.fill API reference}
         */
        fill(r: number, g: number, b: number, a?: number): void;
        /**
         * Alias for {@link cellColor}. Set the fill (cell background) color using a CSS string or TextmodeColor object.
         * @param value Hex string, `rgb()`/`rgba()` string, or an existing color object
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/fill/sketch.js}
         *
         * @see {@link https://code.textmode.art/api/textmode.js/classes/Textmodifier/methods/fill | Textmodifier.fill API reference}
         */
        fill(value: string | TextmodeColor): void;
    }
}
