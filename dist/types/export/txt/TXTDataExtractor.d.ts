import type { FramebufferData } from './types';
import { DataExtractor } from '../base';
import type { TextmodeFont, TextmodeGrid } from '../../Textmode';
/**
 * Extracts and processes data from framebuffers for TXT generation.
 * This class handles the conversion of raw pixel data into character arrays.
 */
export declare class TXTDataExtractor extends DataExtractor {
    /**
     * Extracts character data for TXT generation
     * @param framebufferData Framebuffer pixel data
     * @param grid Grid information
     * @param font Font information
     * @param emptyCharacter Character to use for empty cells
     * @returns 2D array of characters (rows x columns)
     */
    extractCharacterGrid(framebufferData: FramebufferData, grid: TextmodeGrid, font: TextmodeFont, emptyCharacter?: string): string[][];
}
