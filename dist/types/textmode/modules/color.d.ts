import { TextmodeColor } from '../TextmodeColor';
declare module '../Textmodifier' {
    interface Textmodifier {
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
         * Get the current background color.
         * @returns The current background color as a {@link TextmodeColor}.
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
         * Get the current character color.
         * @returns The current character color as a {@link TextmodeColor}.
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
         * Alias for {@link charColor}. Get the current stroke (character) color.
         * @returns The current character color as a {@link TextmodeColor}.
         */
        stroke(): TextmodeColor;
        /**
         * Alias for {@link charColor}. Set the stroke (character) color using a grayscale value.
         * @param gray Grayscale value (0-255)
         * @param alpha Optional alpha value (0-255)
         */
        stroke(gray: number, alpha?: number): void;
        /**
         * Alias for {@link charColor}. Set the stroke (character) color using RGB(A) values.
         * @param r Red component (0-255)
         * @param g Green component (0-255)
         * @param b Blue component (0-255)
         * @param a Optional alpha component (0-255)
         */
        stroke(r: number, g: number, b: number, a?: number): void;
        /**
         * Alias for {@link charColor}. Set the stroke (character) color using a CSS string or TextmodeColor object.
         * @param value Hex string, `rgb()`/`rgba()` string, or an existing color object
         */
        stroke(value: string | TextmodeColor): void;
        /**
         * Get the current cell background color.
         * @returns The current cell color as a {@link TextmodeColor}.
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
         * Alias for {@link cellColor}. Get the current fill (cell background) color.
         * @returns The current cell color as a {@link TextmodeColor}.
         */
        fill(): TextmodeColor;
        /**
         * Alias for {@link cellColor}. Set the fill (cell background) color using a grayscale value.
         * @param gray Grayscale value (0-255)
         * @param alpha Optional alpha value (0-255)
         */
        fill(gray: number, alpha?: number): void;
        /**
         * Alias for {@link cellColor}. Set the fill (cell background) color using RGB(A) values.
         * @param r Red component (0-255)
         * @param g Green component (0-255)
         * @param b Blue component (0-255)
         * @param a Optional alpha component (0-255)
         */
        fill(r: number, g: number, b: number, a?: number): void;
        /**
         * Alias for {@link cellColor}. Set the fill (cell background) color using a CSS string or TextmodeColor object.
         * @param value Hex string, `rgb()`/`rgba()` string, or an existing color object
         */
        fill(value: string | TextmodeColor): void;
    }
}
