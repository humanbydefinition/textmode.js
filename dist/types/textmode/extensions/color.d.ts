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
         */
        color(value: string | TextmodeColor): TextmodeColor;
        /**
         * Current background color.
         * @returns Current background color.
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/background/sketch.js}
         */
        background(): TextmodeColor;
        /**
         * Set the background color using a grayscale value.
         * @param gray Grayscale value (0-255)
         * @param alpha Optional alpha value (0-255)
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/background2/sketch.js}
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
         */
        background(r: number, g: number, b: number, a?: number): void;
        /**
         * Set the background color using a CSS string or TextmodeColor object.
         * @param value Hex string, `rgb()`/`rgba()` string, or an existing color object
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/background4/sketch.js}
         */
        background(value: string | TextmodeColor): void;
        /**
         * Clear the layer currently drawing to.
         *
         * Used to clear the layer at the start of its drawing cycle.
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/clear/sketch.js}
         */
        clear(): void;
        /**
         * Current character color.
         * @returns Current character color.
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/charColor/sketch.js}
         */
        charColor(): TextmodeColor;
        /**
         * Set the character color using a grayscale value.
         * @param gray Grayscale value (0-255)
         * @param alpha Optional alpha value (0-255)
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/charColor2/sketch.js}
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
         */
        charColor(r: number, g: number, b: number, a?: number): void;
        /**
         * Set the character color using a CSS string or TextmodeColor object.
         * @param value Hex string, `rgb()`/`rgba()` string, or an existing color object
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/charColor4/sketch.js}
         */
        charColor(value: string | TextmodeColor): void;
        /**
         * Alias for {@link charColor}. Current stroke (character) color.
         * @returns Current character color.
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/stroke/sketch.js}
         */
        stroke(): TextmodeColor;
        /**
         * Alias for {@link charColor}. Set the stroke (character) color using a grayscale value.
         * @param gray Grayscale value (0-255)
         * @param alpha Optional alpha value (0-255)
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/stroke/sketch.js}
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
         */
        stroke(r: number, g: number, b: number, a?: number): void;
        /**
         * Alias for {@link charColor}. Set the stroke (character) color using a CSS string or TextmodeColor object.
         * @param value Hex string, `rgb()`/`rgba()` string, or an existing color object
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/stroke/sketch.js}
         */
        stroke(value: string | TextmodeColor): void;
        /**
         * Current cell background color.
         * @returns Current cell color.
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/cellColor/sketch.js}
         */
        cellColor(): TextmodeColor;
        /**
         * Set the cell background color using a grayscale value.
         * @param gray Grayscale value (0-255)
         * @param alpha Optional alpha value (0-255)
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/cellColor2/sketch.js}
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
         */
        cellColor(r: number, g: number, b: number, a?: number): void;
        /**
         * Set the cell background color using a CSS string or TextmodeColor object.
         * @param value Hex string, `rgb()`/`rgba()` string, or an existing color object
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/cellColor4/sketch.js}
         */
        cellColor(value: string | TextmodeColor): void;
        /**
         * Alias for {@link cellColor}. Current fill (cell background) color.
         * @returns Current cell color.
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/fill/sketch.js}
         */
        fill(): TextmodeColor;
        /**
         * Alias for {@link cellColor}. Set the fill (cell background) color using a grayscale value.
         * @param gray Grayscale value (0-255)
         * @param alpha Optional alpha value (0-255)
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/fill/sketch.js}
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
         */
        fill(r: number, g: number, b: number, a?: number): void;
        /**
         * Alias for {@link cellColor}. Set the fill (cell background) color using a CSS string or TextmodeColor object.
         * @param value Hex string, `rgb()`/`rgba()` string, or an existing color object
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/fill/sketch.js}
         */
        fill(value: string | TextmodeColor): void;
    }
}
