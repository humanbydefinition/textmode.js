import type { TextmodeCanvas } from '../../index';
import { DataExtractor } from '../base/DataExtractor';
/**
 * Data extractor for image export.
 * Captures the current visual state of the textmode canvas for image generation.
 */
export declare class ImageDataExtractor extends DataExtractor {
    /**
     * Captures the current state of the textmode canvas as image data
     * @param canvas The canvas data containing the rendered textmode graphics
     * @param scale Scale factor for the output image
     * @param backgroundColor Background color for formats that don't support transparency
     * @returns Canvas element containing the captured image data
     */
    $captureCanvasData(canvas: TextmodeCanvas, scale?: number, backgroundColor?: string): HTMLCanvasElement;
}
