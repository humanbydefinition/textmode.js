import { TextmodeGlyphRamp } from '../glyph';
declare module '../Textmodifier' {
    interface Textmodifier {
        /**
         * Create a reusable glyph ramp from a character sequence.
         *
         * @param characters Character sequence ordered from low to high.
         * @returns A TextmodeGlyphRamp instance.
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/createGlyphRamp/sketch.js}
         */
        createGlyphRamp(characters: string): TextmodeGlyphRamp;
    }
}
