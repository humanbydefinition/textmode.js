import type { FramebufferData, SVGCellData } from './types';
import { DataExtractor } from '../base';
import type { TextmodeGrid } from '../../Textmode';
/**
 * Extracts and processes data from framebuffers for SVG generation.
 * This class handles the conversion of raw pixel data into structured data objects.
 */
export declare class SVGDataExtractor extends DataExtractor {
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
     * @param grid Grid information
     * @param font Font information
     * @returns Array of SVG cell data objects
     */
    extractSVGCellData(framebufferData: FramebufferData, grid: TextmodeGrid): SVGCellData[];
}
