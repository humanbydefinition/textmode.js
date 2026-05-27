/**
 * Normalize 0-255 color values to 0-1 range and set in-place.
 * Zero allocations - mutates target array directly.
 *
 * @param target - Pre-allocated RGBA array to mutate
 * @param r - Red channel (0-255)
 * @param g - Green channel (0-255), defaults to r for grayscale
 * @param b - Blue channel (0-255), defaults to r for grayscale
 * @param a - Alpha channel (0-255), defaults to 255 (opaque)
 *
 * @example
 * ```ts
 * const color = [0, 0, 0, 1];
 * setColor(color, 255, 128, 64, 255); // color is now [1, 0.5, 0.25, 1]
 * setColor(color, 127); // grayscale: [0.498, 0.498, 0.498, 1]
 * ```
 */
export declare function setColor(target: [number, number, number, number], r: number, g?: number, b?: number, a?: number): void;
