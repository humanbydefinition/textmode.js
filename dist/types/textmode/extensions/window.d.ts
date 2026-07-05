declare module '../Textmodifier' {
    interface Textmodifier {
        /**
         * Current browser window width in pixels.
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/windowWidth/sketch.js}
         *
         * @see {@link https://code.textmode.art/api/textmode.js/classes/Textmodifier/properties/windowWidth | Textmodifier.windowWidth API reference}
         */
        readonly windowWidth: number;
        /**
         * Current browser window height in pixels.
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/windowHeight/sketch.js}
         *
         * @see {@link https://code.textmode.art/api/textmode.js/classes/Textmodifier/properties/windowHeight | Textmodifier.windowHeight API reference}
         */
        readonly windowHeight: number;
        /**
         * Physical screen width in pixels.
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/displayWidth/sketch.js}
         *
         * @see {@link https://code.textmode.art/api/textmode.js/classes/Textmodifier/properties/displayWidth | Textmodifier.displayWidth API reference}
         */
        readonly displayWidth: number;
        /**
         * Physical screen height in pixels.
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/displayHeight/sketch.js}
         *
         * @see {@link https://code.textmode.art/api/textmode.js/classes/Textmodifier/properties/displayHeight | Textmodifier.displayHeight API reference}
         */
        readonly displayHeight: number;
    }
}
export {};
