import { type TextmodeErrorLevel } from './errors';
import { Textmodifier, type TextmodeOptions } from './textmode/Textmodifier';
/**
 * The main entry point for the `textmode.js` library.
 *
 * Provides static methods for creating {@link Textmodifier} instances and managing global settings.
 */
export declare class Textmode {
    private constructor();
    /**
     * Create a {@link Textmodifier} instance for textmode rendering.
     *
     * @param sourceOrOptions - Either a `HTMLCanvasElement` or `HTMLVideoElement` for capturing content, or options for standalone mode.
     * @param opts - Optional configuration options *(only used when first parameter is a `HTMLCanvasElement` or `HTMLVideoElement`)*.
     * @returns A Promise that resolves to a {@link Textmodifier} instance.
     *
     * @example
     * Creating a {@link Textmodifier} for an existing canvas:
     * ```javascript
     * const canvas = document.querySelector('canvas#myCanvas');
     * const textmodifier = await textmode.create(canvas);
     * ```
     *
     * @example
     * Creating a {@link Textmodifier} for a video element:
     * ```javascript
     * const video = document.querySelector('video#myVideo');
     * const textmodifier = await textmode.create(video);
     * ```
     *
     * @example
     * Creating a standalone {@link Textmodifier} with animation:
     * ```javascript
     * const t = await textmode.create({ width: 800, height: 600 });
     *
     * // Set up a draw loop for standalone usage
     * t.draw(() => {
     *   t.background(0);
     *
     *   const centerX = t.width / 2;
     *   const centerY = t.height / 2;
     *   const radius = Math.min(t.width, t.height) / 3;
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
    static create(sourceOrOptions?: HTMLCanvasElement | HTMLVideoElement | TextmodeOptions, opts?: TextmodeOptions): Promise<Textmodifier>;
    /**
     * Set the global error handling level for the library. This applies to all {@link Textmodifier} instances present.
     *
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
     * Returns the version of `textmode.js` being used.
     *
     * @example
     * ```javascript
     * console.log(textmode.version); // "1.0.0"
     * ```
     */
    static get version(): string;
}
