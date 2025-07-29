import type { FramebufferData } from '../svg/types';
/**
 * Base class for data extraction from textmode framebuffers.
 * Provides common functionality shared between different export formats.
 */
export declare abstract class DataExtractor {
    /**
     * Extracts pixel data from all framebuffers needed for export
     * @param pipeline The conversion pipeline containing framebuffers
     * @returns Object containing all pixel data arrays
     */
    extractFramebufferData(pipeline: any): FramebufferData;
    /**
     * Gets character index from character framebuffer pixels
     * @param characterPixels Character framebuffer pixel data
     * @param pixelIndex Index in the pixel array (already multiplied by 4 for RGBA)
     * @param charactersLength Total number of available characters
     * @returns Character index
     */
    protected getCharacterIndex(characterPixels: Uint8Array, pixelIndex: number): number;
    /**
     * Converts raw pixel data to RGBA color object
     * @param pixels Pixel data array
     * @param index Pixel index (already multiplied by 4 for RGBA)
     * @returns RGBA color object with r, g, b, a properties
     */
    protected pixelsToRGBA(pixels: Uint8Array, index: number): {
        r: number;
        g: number;
        b: number;
        a: number;
    };
}
