declare module '../Textmodifier' {
    interface Textmodifier {
        /**
         * Current browser window width in pixels.
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/windowWidth/sketch.js}
         */
        readonly windowWidth: number;
        /**
         * Current browser window height in pixels.
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/windowHeight/sketch.js}
         */
        readonly windowHeight: number;
        /**
         * Physical screen width in pixels.
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/displayWidth/sketch.js}
         */
        readonly displayWidth: number;
        /**
         * Physical screen height in pixels.
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/displayHeight/sketch.js}
         */
        readonly displayHeight: number;
    }
}
export {};
