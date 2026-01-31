import type { GlyphData as TyprGlyphData } from './typr/types.ts';
/**
 * Glyph outline data for a character
 */
export type GlyphData = (TyprGlyphData & {
    /** Advance width of the character */
    advanceWidth: number;
}) | null;
/**
 * Represents a single character in the {@link TextmodeFont.characters} array.
 */
export type TextmodeCharacter = {
    /** The character itself. */
    character: string;
    /** The Unicode code point of the character. */
    unicode: number;
    /** The shader color associated with the character. */
    color: [number, number, number];
    /** Glyph outline data including advance width and path information. */
    glyphData: GlyphData;
};
/**
 * Font glyph dimensions
 */
export interface GlyphDimensions {
    width: number;
    height: number;
}
