/**
 * Object shape accepted by vector methods that copy or combine vector components.
 *
 * @inline
 */
type TextmodeVectorLike = TextmodeVector | {
    x: number;
    y: number;
    z?: number;
};
/**
 * Mutable two- or three-dimensional vector for creative-coding math.
 *
 * `TextmodeVector` stores public `x`, `y`, and `z` components and uses
 * chainable mutating methods for common motion, steering, and force operations.
 *
 * Use {@link Textmodifier.createVector} to create vectors inside a sketch.
 *
 * @example
 * {@includeCode ../../../examples/Textmodifier/createVector/sketch.js}
 */
export declare class TextmodeVector {
    /**
     * X component.
     */
    x: number;
    /**
     * Y component.
     */
    y: number;
    /**
     * Z component.
     */
    z: number;
    /**
     * Create a new vector with the given components.
     * @param x X component.
     * @param y Y component.
     * @param z Z component.
     */
    constructor(x?: number, y?: number, z?: number);
    /**
     * Set this vector's components.
     *
     * Passing another vector-like object or array copies its components. Missing
     * components are reset to `0`.
     *
     * @param value Vector-like value or component array to copy.
     * @returns This vector.
     *
     * @example
     * {@includeCode ../../../examples/Textmodifier/createVector/sketch.js}
     */
    set(value: TextmodeVectorLike | readonly number[]): this;
    /**
     * Set this vector's components from numbers.
     *
     * @param x X component.
     * @param y Y component.
     * @param z Z component.
     * @returns This vector.
     *
     * @example
     * {@includeCode ../../../examples/Textmodifier/createVector/sketch.js}
     */
    set(x?: number, y?: number, z?: number): this;
    /**
     * Create a copy of this vector.
     *
     * @returns A new vector with the same components.
     *
     * @example
     * {@includeCode ../../../examples/Textmodifier/createVector/sketch.js}
     */
    copy(): TextmodeVector;
    /**
     * Add components to this vector.
     *
     * Missing components are treated as `0`.
     *
     * @param value Vector-like value or component array to add.
     * @returns This vector.
     *
     * @example
     * {@includeCode ../../../examples/Textmodifier/createVector/sketch.js}
     */
    add(value: TextmodeVectorLike | readonly number[]): this;
    /**
     * Add numeric components to this vector.
     *
     * @param x X component to add.
     * @param y Y component to add.
     * @param z Z component to add.
     * @returns This vector.
     *
     * @example
     * {@includeCode ../../../examples/Textmodifier/createVector/sketch.js}
     */
    add(x?: number, y?: number, z?: number): this;
    /**
     * Subtract components from this vector.
     *
     * Missing components are treated as `0`.
     *
     * @param value Vector-like value or component array to subtract.
     * @returns This vector.
     *
     * @example
     * {@includeCode ../../../examples/Textmodifier/createVector/sketch.js}
     */
    sub(value: TextmodeVectorLike | readonly number[]): this;
    /**
     * Subtract numeric components from this vector.
     *
     * @param x X component to subtract.
     * @param y Y component to subtract.
     * @param z Z component to subtract.
     * @returns This vector.
     *
     * @example
     * {@includeCode ../../../examples/Textmodifier/createVector/sketch.js}
     */
    sub(x?: number, y?: number, z?: number): this;
    /**
     * Multiply this vector by a scalar.
     *
     * @param value Scalar multiplier.
     * @returns This vector.
     *
     * @example
     * {@includeCode ../../../examples/Textmodifier/createVector/sketch.js}
     */
    mult(value: number): this;
    /**
     * Multiply this vector by vector-like components.
     *
     * Missing components are treated as `1`.
     *
     * @param value Vector-like value or component array to multiply by.
     * @returns This vector.
     *
     * @example
     * {@includeCode ../../../examples/Textmodifier/createVector/sketch.js}
     */
    mult(value: TextmodeVectorLike | readonly number[]): this;
    /**
     * Multiply this vector by numeric components.
     *
     * @param x X multiplier.
     * @param y Y multiplier.
     * @param z Z multiplier.
     * @returns This vector.
     *
     * @example
     * {@includeCode ../../../examples/Textmodifier/createVector/sketch.js}
     */
    mult(x: number, y: number, z?: number): this;
    /**
     * Divide this vector by a scalar.
     *
     * @param value Scalar divisor.
     * @returns This vector.
     *
     * @example
     * {@includeCode ../../../examples/Textmodifier/createVector/sketch.js}
     */
    div(value: number): this;
    /**
     * Divide this vector by vector-like components.
     *
     * Missing components are treated as `1`.
     *
     * @param value Vector-like value or component array to divide by.
     * @returns This vector.
     *
     * @example
     * {@includeCode ../../../examples/Textmodifier/createVector/sketch.js}
     */
    div(value: TextmodeVectorLike | readonly number[]): this;
    /**
     * Divide this vector by numeric components.
     *
     * @param x X divisor.
     * @param y Y divisor.
     * @param z Z divisor.
     * @returns This vector.
     *
     * @example
     * {@includeCode ../../../examples/Textmodifier/createVector/sketch.js}
     */
    div(x: number, y: number, z?: number): this;
    /**
     * Calculate this vector's magnitude.
     *
     * @returns The vector length.
     *
     * @example
     * {@includeCode ../../../examples/Textmodifier/createVector/sketch.js}
     */
    mag(): number;
    /**
     * Calculate this vector's squared magnitude.
     *
     * Use this when comparing lengths without needing the square root.
     *
     * @returns The squared vector length.
     *
     * @example
     * {@includeCode ../../../examples/Textmodifier/createVector/sketch.js}
     */
    magSq(): number;
    /**
     * Normalize this vector to length `1`.
     *
     * Zero vectors remain unchanged.
     *
     * @returns This vector.
     *
     * @example
     * {@includeCode ../../../examples/Textmodifier/createVector/sketch.js}
     */
    normalize(): this;
    /**
     * Limit this vector's magnitude.
     *
     * @param max Maximum magnitude.
     * @returns This vector.
     *
     * @example
     * {@includeCode ../../../examples/Textmodifier/createVector/sketch.js}
     */
    limit(max: number): this;
    /**
     * Set this vector's magnitude.
     *
     * Zero vectors remain unchanged because they have no direction to preserve.
     *
     * @param magnitude New magnitude.
     * @returns This vector.
     *
     * @example
     * {@includeCode ../../../examples/Textmodifier/createVector/sketch.js}
     */
    setMag(magnitude: number): this;
    /**
     * Calculate the distance to another vector-like point.
     *
     * @param value Vector-like value or component array to compare with.
     * @returns Euclidean distance between the two points.
     *
     * @example
     * {@includeCode ../../../examples/Textmodifier/createVector/sketch.js}
     */
    dist(value: TextmodeVectorLike | readonly number[]): number;
    /**
     * Calculate the distance to numeric components.
     *
     * @param x X component of the point.
     * @param y Y component of the point.
     * @param z Z component of the point.
     * @returns Euclidean distance between the two points.
     *
     * @example
     * {@includeCode ../../../examples/Textmodifier/createVector/sketch.js}
     */
    dist(x?: number, y?: number, z?: number): number;
    /**
     * Calculate the dot product with another vector-like value.
     *
     * @param value Vector-like value or component array.
     * @returns Dot product.
     *
     * @example
     * {@includeCode ../../../examples/Textmodifier/createVector/sketch.js}
     */
    dot(value: TextmodeVectorLike | readonly number[]): number;
    /**
     * Calculate the dot product with numeric components.
     *
     * @param x X component.
     * @param y Y component.
     * @param z Z component.
     * @returns Dot product.
     *
     * @example
     * {@includeCode ../../../examples/Textmodifier/createVector/sketch.js}
     */
    dot(x?: number, y?: number, z?: number): number;
    /**
     * Calculate the cross product with another vector-like value.
     *
     * @param value Vector-like value or component array.
     * @returns A new vector containing the cross product.
     *
     * @example
     * {@includeCode ../../../examples/Textmodifier/createVector/sketch.js}
     */
    cross(value: TextmodeVectorLike | readonly number[]): TextmodeVector;
    /**
     * Calculate the cross product with numeric components.
     *
     * @param x X component.
     * @param y Y component.
     * @param z Z component.
     * @returns A new vector containing the cross product.
     *
     * @example
     * {@includeCode ../../../examples/Textmodifier/createVector/sketch.js}
     */
    cross(x?: number, y?: number, z?: number): TextmodeVector;
    /**
     * Calculate this vector's 2D heading in degrees.
     *
     * The angle is measured from the positive x-axis and composes directly with
     * textmode's degree-based rotation APIs.
     *
     * @returns Heading angle in degrees.
     *
     * @example
     * {@includeCode ../../../examples/Textmodifier/createVector/sketch.js}
     */
    heading(): number;
}
export {};
