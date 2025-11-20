/**
 * Glyph outline data for a character
 */
export type GlyphData = {
    /** Number of contours (-1 for composite glyphs) */
    noc: number;
    /** Bounding box coordinates */
    xMin: number;
    yMin: number;
    xMax: number;
    yMax: number;
    /** End points of each contour */
    endPts: number[];
    /** Point flags indicating curve/line segments */
    flags: number[];
    /** X coordinates of all points */
    xs: number[];
    /** Y coordinates of all points */
    ys: number[];
    /** Advance width of the character */
    advanceWidth: number;
    /** Composite glyph parts (for composite glyphs) */
    parts?: any[];
} | null;
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
