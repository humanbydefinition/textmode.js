import type { SVGCellData, GridInfo, FontInfo, SVGGenerationOptions } from './types';
/**
 * Generates SVG content and markup from processed cell data.
 * This class handles the creation of SVG elements, groups, and styling.
 */
export declare class SVGContentGenerator {
    private pathGenerator;
    constructor();
    /**
     * Generates the SVG header with metadata
     * @param gridInfo Grid dimensions
     * @returns SVG header string
     */
    generateSVGHeader(gridInfo: GridInfo): string;
    /**
     * Generates the SVG footer
     * @returns SVG footer string
     */
    generateSVGFooter(): string;
    /**
     * Generates background rectangle if needed
     * @param gridInfo Grid information
     * @param options SVG generation options
     * @returns Background rectangle SVG string or empty string
     */
    generateBackground(gridInfo: GridInfo, options: SVGGenerationOptions): string;
    /**
     * Converts RGBA object to CSS color string
     * @param color RGBA color object
     * @returns CSS color string
     */
    private rgbaToColorString;
    /**
     * Generates SVG transform attribute string
     * @param cellData Cell data with transform information
     * @param gridInfo Grid information for center calculations
     * @returns Transform attribute string or empty string
     */
    private generateTransformAttribute;
    /**
     * Generates background rectangle for a cell
     * @param cellData Cell data
     * @param gridInfo Grid information
     * @param options SVG generation options
     * @returns Background rectangle SVG string or empty string
     */
    private generateCellBackground;
    /**
     * Generates character path element for a cell
     * @param cellData Cell data
     * @param gridInfo Grid information
     * @param fontInfo Font information
     * @param options SVG generation options
     * @returns Character path SVG string
     */
    private generateCharacterPath;
    /**
     * Generates complete SVG content for a single cell
     * @param cellData Cell data
     * @param gridInfo Grid information
     * @param fontInfo Font information
     * @param options SVG generation options
     * @returns Complete cell SVG content
     */
    generateCellContent(cellData: SVGCellData, gridInfo: GridInfo, fontInfo: FontInfo, options: SVGGenerationOptions): string;
    /**
     * Generates the complete SVG content from cell data
     * @param cellDataArray Array of cell data
     * @param gridInfo Grid information
     * @param fontInfo Font information
     * @param options SVG generation options
     * @returns Complete SVG string
     */
    generateSVGContent(cellDataArray: SVGCellData[], gridInfo: GridInfo, fontInfo: FontInfo, options: SVGGenerationOptions): string;
    /**
     * Optimizes SVG content by removing empty elements and unnecessary whitespace
     * @param svgContent Raw SVG content
     * @returns Optimized SVG content
     */
    optimizeSVGContent(svgContent: string): string;
}
