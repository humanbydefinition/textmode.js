declare module '../Textmodifier' {
    interface Textmodifier {
        /**
         * Get the current character string used for rendering.
         * @returns The current character string.
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/char/sketch.js}
         */
        char(): string;
        /**
         * Set the character to be used for subsequent rendering operations.
         * Accepts a single character string or a character index in the current font.
         *
         * @param value The character string or font character index to set for rendering
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/char2/sketch.js}
         */
        char(value: string | number): void;
        /**
         * Toggle horizontal flipping for subsequent character rendering, or get current state.
         * @param toggle Whether to flip horizontally (optional)
         * @returns The current flip state if called without arguments
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/flipX/sketch.js}
         */
        flipX(toggle?: boolean): boolean | void;
        /**
         * Toggle vertical flipping for subsequent character rendering, or get current state.
         * @param toggle Whether to flip vertically (optional)
         * @returns The current flip state if called without arguments
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/flipY/sketch.js}
         */
        flipY(toggle?: boolean): boolean | void;
        /**
         * Set the character rotation angle for subsequent character rendering, or get current angle.
         * @param degrees The rotation angle in degrees (optional)
         * @returns The current rotation angle in degrees if called without arguments
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/charRotation/sketch.js}
         */
        charRotation(degrees?: number): number | void;
        /**
         * Toggle color inversion for subsequent character rendering, or get current state.
         * @param toggle Whether to invert colors (optional)
         * @returns The current inversion state if called without arguments
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/invert/sketch.js}
         */
        invert(toggle?: boolean): boolean | void;
    }
}
export {};
