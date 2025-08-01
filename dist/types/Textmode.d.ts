import type { TextmodeErrorLevel } from './errors';
import { Textmodifier, type TextmodeOptions, type CaptureSource } from './textmode/Textmodifier';
export { Textmodifier } from './textmode/Textmodifier';
export { TextmodeFont } from './textmode/font';
export { TextmodeCanvas } from './textmode/Canvas';
export { TextmodeGrid } from './textmode/Grid';
export type { TextmodeOptions, CaptureSource } from './textmode/Textmodifier';
export type { TextmodeCharacter } from './textmode/font';
export { TextmodeErrorLevel } from './errors/ErrorHandler';
/** Contains all converters that can be added to a rendering pipeline to shape the textmode output. */
export * as TextmodeConverters from './textmode/converters';
/**
 * The main entry point for the `textmode.js` library.
 *
 * Provides static methods for creating textmode instances and managing global settings.
 */
export declare class Textmode {
    /**
     * Create a {@link Textmodifier} instance for textmode rendering.
     *
     * @param sourceOrOptions - Either an HTML canvas/video element for capturing content, or options for standalone mode.
     * @param opts - Optional configuration options *(only used when first parameter is a canvas/video element)*.
     * @returns A Promise that resolves to a Textmodifier instance.
     *
     * @example
     * ```javascript
     * // Create a Textmodifier for an existing canvas
     * const canvas = document.querySelector('canvas#myCanvas');
     * const textmodifier = await textmode.create(canvas);
     *
     * ////////
     *
     * // Create a Textmodifier for a video element
     * const video = document.querySelector('video#myVideo');
     * const textmodifier = await textmode.create(video);
     *
     * ////////
     *
     * // Create a standalone Textmodifier
     * const t = await textmode.create({ width: 800, height: 600 });
     *
     * // Set up a draw loop for standalone usage
     * t.draw(() => {
     *   t.background(0);
     *
     *   const centerX = t.width / 2;
     *   const centerY = t.height / 2;
     *   const radius = Math.min(t.width, t .height) / 3;
     *   const speed = 0.02; // Adjust speed of rotation
     *
     *   const angle = t.frameCount * speed;
     *   const x = centerX + Math.cos(angle) * radius - 100;
     *   const y = centerY + Math.sin(angle) * radius - 50;
     *
     *   // Set the fill color to white
     *   t.fill(255);
     *
     *   // Draw a rectangle with the fill color
     *   t.rect(x, y, 200, 150);
     * });
     * ```
     */
    static create(sourceOrOptions?: CaptureSource | TextmodeOptions, opts?: TextmodeOptions): Promise<Textmodifier>;
    /**
     * Set the global error handling level for the library. This applies to all `Textmodifier` instances.
     * @param level The error handling level to set.
     *
     * @example
     * ```javascript
     * // Set error level to WARNING
     * textmode.setErrorLevel(TextmodeErrorLevel.WARNING);
     * ```
     */
    static setErrorLevel(level: TextmodeErrorLevel): void;
    /**
     * Returns the current version of the `textmode.js` library.
     *
     * @example
     * ```javascript
     * console.log(textmode.version); // "1.0.0"
     * ```
     */
    static get version(): string;
    private constructor();
}
