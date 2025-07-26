import type { FramebufferData, SVGCellData, GridInfo, FontInfo } from './types';
/**
 * Extracts and processes data from framebuffers for SVG generation.
 * This class handles the conversion of raw pixel data into structured data objects.
 */
export declare class SVGDataExtractor {
    /**
     * Extracts pixel data from all framebuffers needed for SVG export
     * @param pipeline The conversion pipeline containing framebuffers
     * @returns Object containing all pixel data arrays
     */
    extractFramebufferData(pipeline: any): FramebufferData;
    /**
     * Extracts grid information from the grid object
     * @param grid The textmode grid object
     * @returns Grid information object
     */
    extractGridInfo(grid: any): GridInfo;
    /**
     * Extracts font information from the font object
     * @param font The textmode font object
     * @returns Font information object
     */
    extractFontInfo(font: any): FontInfo;
    /**
     * Converts raw pixel data to RGBA color object
     * @param pixels Pixel data array
     * @param index Pixel index (already multiplied by 4 for RGBA)
     * @returns RGBA color object
     */
    private pixelsToRGBA;
    /**
     * Extracts transform data from transform pixels
     * @param transformPixels Transform framebuffer pixels
     * @param rotationPixels Rotation framebuffer pixels
     * @param pixelIndex Pixel index in the array
     * @returns Transform data object
     */
    private extractTransformData;
    /**
     * Calculates cell position information
     * @param x Grid X coordinate
     * @param y Grid Y coordinate
     * @param gridInfo Grid information
     * @returns Position data object
     */
    private calculateCellPosition;
    /**
     * Processes all grid cells and extracts SVG cell data
     * @param framebufferData Raw pixel data from framebuffers
     * @param gridInfo Grid information
     * @param fontInfo Font information
     * @returns Array of SVG cell data objects
     */
    extractSVGCellData(framebufferData: FramebufferData, gridInfo: GridInfo, fontInfo: FontInfo): SVGCellData[];
    /**
     * Validates that all required data is present for SVG generation
     * @param framebufferData Framebuffer data
     * @param gridInfo Grid information
     * @param fontInfo Font information
     * @returns True if all data is valid, false otherwise
     */
    validateExportData(framebufferData: FramebufferData, gridInfo: GridInfo, fontInfo: FontInfo): boolean;
}
