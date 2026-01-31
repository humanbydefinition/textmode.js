/**
 * Convert degrees to radians.
 *
 * @param degrees Angle in degrees
 * @returns Angle in radians
 *
 * @example
 * ```ts
 * degToRad(180); // Math.PI
 * degToRad(90);  // Math.PI / 2
 * ```
 */
export declare function degToRad(degrees: number): number;
/**
 * Convert radians to degrees.
 *
 * @param radians Angle in radians
 * @returns Angle in degrees
 *
 * @example
 * ```ts
 * radToDeg(Math.PI);     // 180
 * radToDeg(Math.PI / 2); // 90
 * ```
 */
export declare function radToDeg(radians: number): number;
/**
 * Calculate the angle in degrees between two points.
 * @param x1 - X coordinate of the first point
 * @param y1 - Y coordinate of the first point
 * @param x2 - X coordinate of the second point
 * @param y2 - Y coordinate of the second point
 * @returns The angle in degrees
 *
 * @example
 * ```ts
 * angleBetweenPoints(0, 0, 10, 10); // 45
 * angleBetweenPoints(0, 0, 0, 10);  // 90
 * ```
 */
export declare function angleBetweenPoints(x1: number, y1: number, x2: number, y2: number): number;
/**
 * Calculate the Euclidean distance between two points.
 * @param x1 - X coordinate of the first point
 * @param y1 - Y coordinate of the first point
 * @param x2 - X coordinate of the second point
 * @param y2 - Y coordinate of the second point
 * @returns The distance between the two points
 *
 * @example
 * ```ts
 * distanceBetweenPoints(0, 0, 3, 4); // 5
 * distanceBetweenPoints(10, 10, 20, 10); // 10
 * ```
 */
export declare function distanceBetweenPoints(x1: number, y1: number, x2: number, y2: number): number;
/**
 * Clamp a value between a minimum and maximum range.
 * @param value Value to clamp
 * @param min Minimum allowable value
 * @param max Maximum allowable value
 * @returns Clamped value
 *
 * @example
 * ```ts
 * clamp(15, 0, 10);  // 10
 * clamp(-5, 0, 10);  // 0
 * clamp(5, 0, 10);   // 5
 * ```
 */
export declare function clamp(value: number, min: number, max: number): number;
/**
 * Calculate dimensions to fit a source within a target while preserving aspect ratio (contain).
 *
 * @param srcWidth Source width
 * @param srcHeight Source height
 * @param targetWidth Target container width
 * @param targetHeight Target container height
 * @returns Object containing the calculated width, height, and scale factor
 *
 * @example
 * ```ts
 * // Fit a 100x50 image into a 200x200 container
 * const fit = calculateAspectFit(100, 50, 200, 200);
 * // fit.width = 200
 * // fit.height = 100
 * // fit.scale = 2
 * ```
 */
export declare function calculateAspectFit(srcWidth: number, srcHeight: number, targetWidth: number, targetHeight: number): {
    width: number;
    height: number;
    scale: number;
};
/**
 * Encode a rotation angle (in degrees) into a single normalized channel for GPU.
 *
 * This encoding packs a 0-360° rotation into a single 0-1 value by normalizing
 * the angle to the full channel range.
 *
 * **How it works:**
 * 1. Normalize degrees to 0-360° range (handle wrapping)
 * 2. Divide by 360 to get 0-1 range
 *
 * This provides ~256 discrete rotation steps (in an 8-bit channel), which is
 * sufficient for textmode rendering (~1.41° precision per step).
 *
 * @param degrees Rotation angle in degrees (0-360)
 * @returns Normalized value (0-1) representing the rotation
 *
 * @example
 * ```ts
 * encodeRotation(0);    // 0
 * encodeRotation(180);  // 0.5
 * encodeRotation(360);  // 1.0 (wraps to 0)
 * ```
 */
export declare function encodeRotation(degrees: number): number;
