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
 */
export declare function angleBetweenPoints(x1: number, y1: number, x2: number, y2: number): number;
/**
 * Calculate the Euclidean distance between two points.
 * @param x1 - X coordinate of the first point
 * @param y1 - Y coordinate of the first point
 * @param x2 - X coordinate of the second point
 * @param y2 - Y coordinate of the second point
 * @returns The distance between the two points
 */
export declare function distanceBetweenPoints(x1: number, y1: number, x2: number, y2: number): number;
/**
 * Clamp a value between a minimum and maximum range.
 * @param value Value to clamp
 * @param min Minimum allowable value
 * @param max Maximum allowable value
 * @returns Clamped value
 */
export declare function clamp(value: number, min: number, max: number): number;
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
/**
 * Convert rotation angles from degrees to radians for 3D transformations.
 *
 * @param rotationXDegrees - Rotation around X-axis in degrees
 * @param rotationYDegrees - Rotation around Y-axis in degrees
 * @param rotationZDegrees - Rotation around Z-axis in degrees
 * @returns Object containing rotation values in radians for each axis
 *
 * @example
 * ```ts
 * calculateRotationParams(90, 0, 45);
 * // { radiansX: -1.571, radiansY: 0, radiansZ: -0.785 }
 * ```
 */
export declare function calculateRotationParams(rotationXDegrees: number, rotationYDegrees: number, rotationZDegrees: number): {
    radiansX: number;
    radiansY: number;
    radiansZ: number;
};
