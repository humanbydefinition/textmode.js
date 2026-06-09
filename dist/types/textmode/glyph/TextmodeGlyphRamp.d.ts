/**
 * Immutable character sequence for mapping numbers to glyphs.
 *
 * `TextmodeGlyphRamp` stores a low-to-high sequence of grapheme clusters and maps
 * normalized values to one glyph from that sequence.
 *
 * Use {@link Textmodifier.createGlyphRamp} to create ramps inside a sketch.
 *
 * @example
 * {@includeCode ../../../examples/TextmodeGlyphRamp/creation/sketch.js}
 */
export declare class TextmodeGlyphRamp {
    private readonly _graphemes;
    /**
     * The character sequence this ramp was created with.
     */
    readonly characters: string;
    /**
     * Number of grapheme clusters in the ramp.
     */
    readonly length: number;
    /**
     * Create a ramp from characters ordered from low values to high values.
     *
     * At least two grapheme clusters are required.
     *
     * @param characters Character sequence ordered from low to high.
     *
     * @example
     * {@includeCode ../../../examples/TextmodeGlyphRamp/creation/sketch.js}
     */
    constructor(characters: string);
    /**
     * Map a normalized value to a character.
     *
     * Values outside `[0, 1]` are clamped. `0` returns the first character, and
     * `1` returns the last character.
     *
     * @param normalizedValue Normalized value to map.
     * @returns Character from this ramp.
     *
     * @example
     * {@includeCode ../../../examples/TextmodeGlyphRamp/at/sketch.js}
     */
    at(normalizedValue: number): string;
    /**
     * Map a value from a source range to a character.
     *
     * The value is normalized using `min` and `max`, then mapped through this ramp.
     * Reversed ranges are supported. Equal range bounds are invalid.
     *
     * @param value Value to map.
     * @param min Source range minimum.
     * @param max Source range maximum.
     * @returns Character from this ramp.
     *
     * @example
     * {@includeCode ../../../examples/TextmodeGlyphRamp/at/sketch.js}
     */
    at(value: number, min: number, max: number): string;
    /**
     * Return a shifted copy of this ramp.
     *
     * Positive amounts rotate forward and negative amounts rotate backward.
     * Fractional amounts are truncated before rotation.
     *
     * @param amount Number of character steps to shift.
     * @returns A new shifted ramp.
     *
     * @example
     * {@includeCode ../../../examples/TextmodeGlyphRamp/shift/sketch.js}
     */
    shift(amount: number): TextmodeGlyphRamp;
}
