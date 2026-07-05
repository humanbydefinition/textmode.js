import type { TextmodeEaseName } from '../../utils/math';
import { TextmodeVector } from '../math';
declare module '../Textmodifier' {
    interface Textmodifier {
        /**
         * Calculate the sine of an angle.
         *
         * Angles are measured in radians. Use {@link radians} to convert from degrees.
         *
         * @param angle Angle in radians.
         * @returns Sine of the angle.
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/sin/sketch.js}
         *
         * @see {@link https://code.textmode.art/api/textmode.js/classes/Textmodifier/methods/sin | Textmodifier.sin API reference}
         */
        sin(angle: number): number;
        /**
         * Calculate the cosine of an angle.
         *
         * Angles are measured in radians. Use {@link radians} to convert from degrees.
         *
         * @param angle Angle in radians.
         * @returns Cosine of the angle.
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/cos/sketch.js}
         *
         * @see {@link https://code.textmode.art/api/textmode.js/classes/Textmodifier/methods/cos | Textmodifier.cos API reference}
         */
        cos(angle: number): number;
        /**
         * Calculate the tangent of an angle.
         *
         * Angles are measured in radians. Use {@link radians} to convert from degrees.
         *
         * @param angle Angle in radians.
         * @returns Tangent of the angle.
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/tan/sketch.js}
         *
         * @see {@link https://code.textmode.art/api/textmode.js/classes/Textmodifier/methods/tan | Textmodifier.tan API reference}
         */
        tan(angle: number): number;
        /**
         * Calculate the arc sine of a value.
         *
         * @param value Value in the range -1 to 1.
         * @returns Angle in radians.
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/asin/sketch.js}
         *
         * @see {@link https://code.textmode.art/api/textmode.js/classes/Textmodifier/methods/asin | Textmodifier.asin API reference}
         */
        asin(value: number): number;
        /**
         * Calculate the arc cosine of a value.
         *
         * @param value Value in the range -1 to 1.
         * @returns Angle in radians.
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/acos/sketch.js}
         *
         * @see {@link https://code.textmode.art/api/textmode.js/classes/Textmodifier/methods/acos | Textmodifier.acos API reference}
         */
        acos(value: number): number;
        /**
         * Calculate the arc tangent of a value.
         *
         * @param value Value whose arc tangent should be calculated.
         * @returns Angle in radians.
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/atan/sketch.js}
         *
         * @see {@link https://code.textmode.art/api/textmode.js/classes/Textmodifier/methods/atan | Textmodifier.atan API reference}
         */
        atan(value: number): number;
        /**
         * Calculate the angle from a vector's y and x components.
         *
         * @param y Y component.
         * @param x X component.
         * @returns Angle in radians.
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/atan2/sketch.js}
         *
         * @see {@link https://code.textmode.art/api/textmode.js/classes/Textmodifier/methods/atan2 | Textmodifier.atan2 API reference}
         */
        atan2(y: number, x: number): number;
        /**
         * Round down to the closest integer.
         *
         * @param value Value to round down.
         * @returns Largest integer less than or equal to the value.
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/floor/sketch.js}
         *
         * @see {@link https://code.textmode.art/api/textmode.js/classes/Textmodifier/methods/floor | Textmodifier.floor API reference}
         */
        floor(value: number): number;
        /**
         * Round up to the closest integer.
         *
         * @param value Value to round up.
         * @returns Smallest integer greater than or equal to the value.
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/ceil/sketch.js}
         *
         * @see {@link https://code.textmode.art/api/textmode.js/classes/Textmodifier/methods/ceil | Textmodifier.ceil API reference}
         */
        ceil(value: number): number;
        /**
         * Round to the closest integer or decimal place.
         *
         * @param value Value to round.
         * @param decimals Number of decimal places. Defaults to 0.
         * @returns Rounded value.
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/round/sketch.js}
         *
         * @see {@link https://code.textmode.art/api/textmode.js/classes/Textmodifier/methods/round | Textmodifier.round API reference}
         */
        round(value: number, decimals?: number): number;
        /**
         * Calculate the absolute value of a number.
         *
         * @param value Value to make positive.
         * @returns Absolute value.
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/abs/sketch.js}
         *
         * @see {@link https://code.textmode.art/api/textmode.js/classes/Textmodifier/methods/abs | Textmodifier.abs API reference}
         */
        abs(value: number): number;
        /**
         * Return the smallest value in a sequence.
         *
         * @param values Values to compare.
         * @returns Smallest value.
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/min/sketch.js}
         *
         * @see {@link https://code.textmode.art/api/textmode.js/classes/Textmodifier/methods/min | Textmodifier.min API reference}
         */
        min(...values: number[]): number;
        /**
         * Return the smallest value in an array.
         *
         * @param values Values to compare.
         * @returns Smallest value.
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/min/sketch.js}
         *
         * @see {@link https://code.textmode.art/api/textmode.js/classes/Textmodifier/methods/min | Textmodifier.min API reference}
         */
        min(values: readonly number[]): number;
        /**
         * Return the largest value in a sequence.
         *
         * @param values Values to compare.
         * @returns Largest value.
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/max/sketch.js}
         *
         * @see {@link https://code.textmode.art/api/textmode.js/classes/Textmodifier/methods/max | Textmodifier.max API reference}
         */
        max(...values: number[]): number;
        /**
         * Return the largest value in an array.
         *
         * @param values Values to compare.
         * @returns Largest value.
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/max/sketch.js}
         *
         * @see {@link https://code.textmode.art/api/textmode.js/classes/Textmodifier/methods/max | Textmodifier.max API reference}
         */
        max(values: readonly number[]): number;
        /**
         * Square a number.
         *
         * @param value Value to square.
         * @returns Value multiplied by itself.
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/sq/sketch.js}
         *
         * @see {@link https://code.textmode.art/api/textmode.js/classes/Textmodifier/methods/sq | Textmodifier.sq API reference}
         */
        sq(value: number): number;
        /**
         * Calculate the square root of a number.
         *
         * @param value Value to square root.
         * @returns Square root of the value.
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/sqrt/sketch.js}
         *
         * @see {@link https://code.textmode.art/api/textmode.js/classes/Textmodifier/methods/sqrt | Textmodifier.sqrt API reference}
         */
        sqrt(value: number): number;
        /**
         * Raise a base value to an exponent.
         *
         * @param base Base value.
         * @param exponent Exponent value.
         * @returns Base raised to the exponent.
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/pow/sketch.js}
         *
         * @see {@link https://code.textmode.art/api/textmode.js/classes/Textmodifier/methods/pow | Textmodifier.pow API reference}
         */
        pow(base: number, exponent: number): number;
        /**
         * Calculate the fractional part of a number.
         *
         * This follows GLSL-style `fract`, so negative inputs return a positive fractional part.
         *
         * @param value Value whose fractional part should be returned.
         * @returns Fractional part in the range 0 up to, but not including, 1.
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/fract/sketch.js}
         *
         * @see {@link https://code.textmode.art/api/textmode.js/classes/Textmodifier/methods/fract | Textmodifier.fract API reference}
         */
        fract(value: number): number;
        /**
         * Calculate Euler's number raised to a value.
         *
         * @param value Exponent for Euler's number.
         * @returns Exponential value.
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/exp/sketch.js}
         *
         * @see {@link https://code.textmode.art/api/textmode.js/classes/Textmodifier/methods/exp | Textmodifier.exp API reference}
         */
        exp(value: number): number;
        /**
         * Calculate the natural logarithm of a value.
         *
         * @param value Value whose natural logarithm should be calculated.
         * @returns Natural logarithm.
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/log/sketch.js}
         *
         * @see {@link https://code.textmode.art/api/textmode.js/classes/Textmodifier/methods/log | Textmodifier.log API reference}
         */
        log(value: number): number;
        /**
         * Linear interpolation between two values.
         *
         * @param start First value.
         * @param stop Second value.
         * @param amount Interpolation amount, where 0 returns `start` and 1 returns `stop`.
         * @returns The interpolated value.
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/lerp/sketch.js}
         *
         * @see {@link https://code.textmode.art/api/textmode.js/classes/Textmodifier/methods/lerp | Textmodifier.lerp API reference}
         */
        lerp(start: number, stop: number, amount: number): number;
        /**
         * Apply an easing curve to a normalized amount.
         *
         * Inputs are clamped to the 0-1 range for animation-friendly behavior.
         * Outputs are not clamped, so back, elastic, and bounce curves can overshoot.
         *
         * @param name Easing curve name.
         * @param amount Normalized amount to ease.
         * @returns Eased amount.
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/ease/sketch.js}
         *
         * @see {@link https://code.textmode.art/api/textmode.js/classes/Textmodifier/methods/ease | Textmodifier.ease API reference}
         */
        ease(name: TextmodeEaseName, amount: number): number;
        /**
         * Re-map a number from one range to another.
         *
         * @param value The incoming value to be converted.
         * @param start1 Lower bound of the value's current range.
         * @param stop1 Upper bound of the value's current range.
         * @param start2 Lower bound of the value's target range.
         * @param stop2 Upper bound of the value's target range.
         * @returns The remapped value.
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/map/sketch.js}
         *
         * @see {@link https://code.textmode.art/api/textmode.js/classes/Textmodifier/methods/map | Textmodifier.map API reference}
         */
        map(value: number, start1: number, stop1: number, start2: number, stop2: number): number;
        /**
         * Map a number from a range to a normalized 0 to 1 range.
         *
         * Values outside the input range are not clamped.
         *
         * @param value The incoming value to normalize.
         * @param start Lower bound of the value's current range.
         * @param stop Upper bound of the value's current range.
         * @returns The normalized value.
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/norm/sketch.js}
         *
         * @see {@link https://code.textmode.art/api/textmode.js/classes/Textmodifier/methods/norm | Textmodifier.norm API reference}
         */
        norm(value: number, start: number, stop: number): number;
        /**
         * Constrain a value between a minimum and maximum range.
         *
         * @param value Value to constrain.
         * @param low Minimum allowable value.
         * @param high Maximum allowable value.
         * @returns The constrained value.
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/constrain/sketch.js}
         *
         * @see {@link https://code.textmode.art/api/textmode.js/classes/Textmodifier/methods/constrain | Textmodifier.constrain API reference}
         */
        constrain(value: number, low: number, high: number): number;
        /**
         * Clamp a value between a minimum and maximum range.
         *
         * Alias for {@link constrain}.
         *
         * @param value Value to clamp.
         * @param low Minimum allowable value.
         * @param high Maximum allowable value.
         * @returns The clamped value.
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/clamp/sketch.js}
         *
         * @see {@link https://code.textmode.art/api/textmode.js/classes/Textmodifier/methods/clamp | Textmodifier.clamp API reference}
         */
        clamp(value: number, low: number, high: number): number;
        /**
         * Calculate the Euclidean distance between two points.
         *
         * @param x1 X coordinate of the first point in grid cells.
         * @param y1 Y coordinate of the first point in grid cells.
         * @param x2 X coordinate of the second point in grid cells.
         * @param y2 Y coordinate of the second point in grid cells.
         * @returns The distance between the two points.
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/dist/sketch.js}
         *
         * @see {@link https://code.textmode.art/api/textmode.js/classes/Textmodifier/methods/dist | Textmodifier.dist API reference}
         */
        dist(x1: number, y1: number, x2: number, y2: number): number;
        /**
         * Convert radians to degrees.
         *
         * @param radians Angle in radians.
         * @returns Angle in degrees.
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/degrees/sketch.js}
         *
         * @see {@link https://code.textmode.art/api/textmode.js/classes/Textmodifier/methods/degrees | Textmodifier.degrees API reference}
         */
        degrees(radians: number): number;
        /**
         * Convert degrees to radians.
         *
         * @param degrees Angle in degrees.
         * @returns Angle in radians.
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/radians/sketch.js}
         *
         * @see {@link https://code.textmode.art/api/textmode.js/classes/Textmodifier/methods/radians | Textmodifier.radians API reference}
         */
        radians(degrees: number): number;
        /**
         * Create a mutable vector.
         *
         * Vectors are useful for positions, velocity, acceleration, flow fields,
         * and other creative-coding motion math.
         *
         * @param x X component.
         * @param y Y component.
         * @param z Z component.
         * @returns A new TextmodeVector instance.
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/createVector/sketch.js}
         *
         * @see {@link https://code.textmode.art/api/textmode.js/classes/Textmodifier/methods/createVector | Textmodifier.createVector API reference}
         */
        createVector(x?: number, y?: number, z?: number): TextmodeVector;
    }
}
