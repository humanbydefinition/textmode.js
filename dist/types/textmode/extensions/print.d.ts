declare module '../Textmodifier' {
    interface Textmodifier {
        /**
         * Print a string of text onto the active drawing layer.
         *
         * Supports custom leading, letter spacing, tab size, and inline BBCode-style formatting tags
         * like `[fg=red]`, `[bg=color]`, `[inv]`, `[rot=90]`, `[fx]`, `[fy]`, and their closing tags.
         *
         * @param str The text string to print.
         * @param x Coordinate along the horizontal axis in cells.
         * @param y Coordinate along the vertical axis in cells.
         * @param options Optional printing configurations.
         * @param options.leading Distance between printed lines in cells.
         * @param options.tabSize Number of spaces used for tab characters.
         * @param options.letterSpacing Extra horizontal spacing between characters in cells.
         * @param options.markup Whether to parse inline BBCode-style formatting tags.
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/print/sketch.js}
         */
        print(str: string, x: number, y: number, options?: {
            leading?: number;
            tabSize?: number;
            letterSpacing?: number;
            markup?: boolean;
        }): void;
        /**
         * Sets the text alignment rules for subsequent `print` calls.
         *
         * @param horizontal Horizontal alignment ('left', 'center', 'right').
         * @param vertical Vertical alignment ('top', 'middle', 'bottom'). Defaults to 'top'.
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/printAlign/sketch.js}
         */
        printAlign(horizontal: 'left' | 'center' | 'right', vertical?: 'top' | 'middle' | 'bottom'): void;
    }
}
export {};
