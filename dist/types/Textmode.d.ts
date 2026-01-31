import { type TextmodeErrorLevel } from './errors';
import { Textmodifier } from './textmode/Textmodifier';
import type { TextmodeOptions } from './textmode/types';
/**
 * The main entry point for the `textmode.js` library.
 *
 * Provides static methods for creating {@link Textmodifier} instances and managing global settings.
 *
 * @example
 * ```javascript
 * // Basic usage pattern
 * const t = textmode.create({
 *   width: window.innerWidth,
 *   height: window.innerHeight
 * });
 *
 * t.draw(() => {
 *   t.background(0);
 *   t.charColor(255);
 *   t.char('T');
 *   t.rect(5, 5);
 * });
 *
 * t.windowResized(() => {
 *   t.resizeCanvas(window.innerWidth, window.innerHeight);
 * });
 * ```
 */
export declare class Textmode {
    private constructor();
    /**
     * Create a new {@link Textmodifier} instance with optional configuration.
     * @param opts Configuration options for the Textmodifier instance
     * @returns A new Textmodifier instance
     *
     * @example
     * ```javascript
     * // Initialize with custom font size and responsive canvas
     * const t = textmode.create({
     *   width: window.innerWidth,
     *   height: window.innerHeight,
     *   fontSize: 16
     * });
     *
     * t.draw(() => {
     *   t.background(10, 15, 20);
     *
     *   // Draw a field of rhythmic characters
     *   for (let x = -20; x <= 20; x += 5) {
     *     for (let y = -15; y <= 15; y += 5) {
     *       const dist = Math.sqrt(x*x + y*y);
     *       const offset = Math.sin(t.frameCount * 0.1 - dist * 0.5) * 2;
     *
     *       t.push();
     *       t.translate(x, y + offset);
     *       t.charColor(255 - dist * 10, 150, 200);
     *       t.char(dist < 10 ? '█' : '░');
     *       t.point();
     *       t.pop();
     *     }
     *   }
     * });
     *
     * t.windowResized(() => {
     *   t.resizeCanvas(window.innerWidth, window.innerHeight);
     * });
     * ```
     */
    static create(opts?: TextmodeOptions): Textmodifier;
    /**
     * Set the global error handling level for the library. This applies to all {@link Textmodifier} instances present.
     *
     * @param level The error handling level to set.
     *
     * @example
     * ```javascript
     * // Configuring error behavior
     * import { TextmodeErrorLevel } from 'textmode.js';
     *
     * // Suppress non-critical warnings in production
     * textmode.setErrorLevel(TextmodeErrorLevel.WARNING);
     *
     * const t = textmode.create({ width: window.innerWidth, height: window.innerHeight });
     *
     * t.draw(() => {
     *   t.background(0);
     *   t.char('!');
     *   t.charColor(255, 255, 0);
     *   t.rect(10, 10);
     * });
     *
     * t.windowResized(() => {
     *   t.resizeCanvas(window.innerWidth, window.innerHeight);
     * });
     * ```
     */
    static setErrorLevel(level: TextmodeErrorLevel): void;
    /**
     * Returns the version of `textmode.js` being used.
     *
     * @returns The version string of the library.
     *
     * @example
     * ```javascript
     * // Display the library version in a retro terminal style
     * const t = textmode.create({ width: window.innerWidth, height: window.innerHeight });
     *
     * const v = `VERSION: ${textmode.version}`;
     *
     * t.draw(() => {
     *   t.background(0, 20, 0); // CRT Dark Green
     *
     *   t.push();
     *   t.translate(-v.length / 2, 0);
     *   t.charColor(0, 255, 0);
     *
     *   for (let i = 0; i < v.length; i++) {
     *     t.push();
     *     t.translate(i, 0);
     *     t.char(v[i]);
     *     t.point();
     *     t.pop();
     *   }
     *   t.pop();
     * });
     *
     * t.windowResized(() => {
     *   t.resizeCanvas(window.innerWidth, window.innerHeight);
     * });
     * ```
     */
    static get version(): string;
}
