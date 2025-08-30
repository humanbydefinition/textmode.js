/**
 * Represents a single character in the {@link TextmodeFont.characters} array.
 */
export type TextmodeCharacter = {
    /** The character itself. */
    character: string;
    /** The Unicode code point of the character. */
    unicode: number;
    /** The RGB color associated with the character for identification. */
    color: [number, number, number];
    /** The advance width of the character. @ignore */
    advanceWidth: number;
};
/**
 * Font glyph dimensions
 */
export interface GlyphDimensions {
    width: number;
    height: number;
}
