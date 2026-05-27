declare module '../Textmodifier' {
    interface Textmodifier {
        /**
         * Current character string used for drawing.
         * @returns The active character string.
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/char/sketch.js}
         */
        char(): string;
        /**
         * Set the character used by subsequent drawing operations.
         * Accepts a single character string or a character index in the current font.
         *
         * @param value Character string or index in the current font.
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/char2/sketch.js}
         */
        char(value: string | number): void;
        /**
         * Toggle horizontal flipping for subsequent characters, or get the current state.
         * @param toggle Whether to flip horizontally.
         * @returns Current flip state when called without arguments.
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/flipX/sketch.js}
         */
        flipX(toggle?: boolean): boolean | void;
        /**
         * Toggle vertical flipping for subsequent characters, or get the current state.
         * @param toggle Whether to flip vertically.
         * @returns Current flip state when called without arguments.
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/flipY/sketch.js}
         */
        flipY(toggle?: boolean): boolean | void;
        /**
         * Set the character rotation for subsequent drawing, or get the current angle.
         * @param degrees Rotation angle in degrees.
         * @returns Current rotation angle in degrees when called without arguments.
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/charRotation/sketch.js}
         */
        charRotation(degrees?: number): number | void;
        /**
         * Toggle character/cell color inversion, or get the current state.
         * @param toggle Whether to invert colors.
         * @returns Current inversion state when called without arguments.
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/invert/sketch.js}
         */
        invert(toggle?: boolean): boolean | void;
    }
}
export {};
