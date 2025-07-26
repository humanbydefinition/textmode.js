/**
 * SVG-specific type definitions for the textmode.js library.
 */
/**
 * RGBA color representation.
 */
export interface RGBA {
    r: number;
    g: number;
    b: number;
    a: number;
}
/**
 * 2D position coordinates.
 */
export interface Position {
    x: number;
    y: number;
}
/**
 * Cell position in grid coordinates.
 */
export interface CellPosition {
    x: number;
    y: number;
    cellX: number;
    cellY: number;
}
/**
 * Cell transformation data.
 */
export interface CellTransform {
    isInverted: boolean;
    flipHorizontal: boolean;
    flipVertical: boolean;
    rotation: number;
}
/**
 * Complete data for a single SVG cell.
 */
export interface SVGCellData {
    charIndex: number;
    primaryColor: RGBA;
    secondaryColor: RGBA;
    transform: CellTransform;
    position: CellPosition;
}
/**
 * Grid dimensions and cell sizing information.
 */
export interface GridInfo {
    cols: number;
    rows: number;
    width: number;
    height: number;
    cellWidth: number;
    cellHeight: number;
}
/**
 * Font information needed for SVG generation.
 */
export interface FontInfo {
    fontSize: number;
    fontData: any;
    characters: any[];
}
/**
 * Framebuffer data extracted for SVG generation.
 */
export interface FramebufferData {
    characterPixels: Uint8Array;
    primaryColorPixels: Uint8Array;
    secondaryColorPixels: Uint8Array;
    transformPixels: Uint8Array;
    rotationPixels: Uint8Array;
}
/**
 * Options for exporting the textmode content to SVG format.
 */
export type SVGExportOptions = {
    /**
     * The filename to save the SVG file as. If not provided, a default filename is used.
     */
    filename?: string;
    /**
     * Whether to include cell background rectangles in the SVG output.
     * When false, only the character paths are included, creating a more compact SVG.
     * Default is `true`.
     */
    includeBackgroundRectangles?: boolean;
    /**
     * The drawing mode for ASCII characters (`'fill'` or `'stroke'`).
     * When set to `'fill'`, characters are rendered as filled shapes.
     * When set to `'stroke'`, characters are rendered as outlines.
     * Default is `'fill'`.
     */
    drawMode?: 'fill' | 'stroke';
    /**
     * The stroke width to use when drawMode is set to `'stroke'`.
     * Default is `1.0`.
     */
    strokeWidth?: number;
    /**
     * Background color for the SVG as RGBA array [r, g, b, a].
     * Default is transparent black [0, 0, 0, 0].
     */
    backgroundColor?: [number, number, number, number];
};
/**
 * Path object interface for character glyphs.
 */
export interface GlyphPath {
    getBoundingBox(): {
        x1: number;
        y1: number;
        x2: number;
        y2: number;
    };
    toSVG(): string;
}
/**
 * Internal options used by SVG generation (with all defaults applied).
 */
export interface SVGGenerationOptions {
    includeBackgroundRectangles: boolean;
    drawMode: 'fill' | 'stroke';
    strokeWidth: number;
    backgroundColor: [number, number, number, number];
}
