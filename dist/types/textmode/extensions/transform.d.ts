declare module '../Textmodifier' {
    interface Textmodifier {
        /**
         * Set rotation for subsequent shape drawing.
         *
         * All geometries rotate around the center of the shape.
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/rotate/sketch.js}
         */
        rotate(): void;
        rotate(angle: number): void;
        rotate(angle: number, axis: [number, number, number] | {
            x: number;
            y: number;
            z: number;
        }): void;
        rotate(degreesX?: number, degreesY?: number, degreesZ?: number): void;
        /**
         * Set X-axis rotation for subsequent shape drawing, or get the current angle.
         *
         * All geometries rotate around the center of the shape.
         *
         * @param degrees Rotation angle in degrees around the X axis.
         * @returns Current X-axis rotation in degrees when called without arguments.
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/rotateX/sketch.js}
         */
        rotateX(degrees?: number): number | void;
        /**
         * Set Y-axis rotation for subsequent shape drawing, or get the current angle.
         *
         * All geometries rotate around the center of the shape.
         *
         * @param degrees Rotation angle in degrees around the Y axis.
         * @returns Current Y-axis rotation in degrees when called without arguments.
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/rotateY/sketch.js}
         */
        rotateY(degrees?: number): number | void;
        /**
         * Set Z-axis rotation for subsequent shape drawing, or get the current angle.
         *
         * All geometries rotate around the center of the shape.
         *
         * @param degrees Rotation angle in degrees around the Z axis.
         * @returns Current Z-axis rotation in degrees when called without arguments.
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/rotateZ/sketch.js}
         */
        rotateZ(degrees?: number): number | void;
        /**
         * Translate subsequent shape drawing.
         *
         * All geometries are displaced by the specified amounts. Similar to p5.js translate().
         *
         * @param x Translation along the X axis in grid cells. Defaults to 0.
         * @param y Translation along the Y axis in grid cells. Defaults to 0.
         * @param z Translation along the Z axis in grid cells. Defaults to 0.
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/translate/sketch.js}
         */
        translate(x?: number, y?: number, z?: number): void;
        /**
         * Current accumulated X-axis translation.
         * @returns Current X-axis translation in grid cells.
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/translateX/sketch.js}
         */
        translateX(): number;
        /**
         * Translate subsequent shapes along the X axis.
         * @param pixels Translation offset in grid cells.
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/translateX2/sketch.js}
         */
        translateX(pixels: number): void;
        /**
         * Current accumulated Y-axis translation.
         * @returns Current Y-axis translation in grid cells.
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/translateY/sketch.js}
         */
        translateY(): number;
        /**
         * Translate subsequent shapes along the Y axis.
         * @param pixels Translation offset in grid cells.
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/translateY2/sketch.js}
         */
        translateY(pixels: number): void;
        /**
         * Current accumulated Z-axis translation.
         * @returns Current Z-axis translation in grid cells.
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/translateZ/sketch.js}
         */
        translateZ(): number;
        /**
         * Translate subsequent shapes along the Z axis.
         * @param pixels Translation offset in grid cells.
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/translateZ2/sketch.js}
         */
        translateZ(pixels: number): void;
        /**
         * Scale subsequent geometry in model space.
         *
         * @param x Scale factor for X.
         * @param y Scale factor for Y. Defaults to `x`.
         * @param z Scale factor for Z. Defaults to `x` for uniform scale, or `1` when only `x` and `y` are provided.
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/scale/sketch.js}
         */
        scale(x: number, y?: number, z?: number): void;
        /**
         * Reset the current model transform to identity.
         *
         * This clears translation, rotation, and scale state for subsequent draw calls.
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/resetMatrix/sketch.js}
         */
        resetMatrix(): void;
        /**
         * Multiply the current model transform by a custom 4x4 matrix.
         *
         * Current implementation supports affine TRS-style matrices (no perspective/shear).
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/applyMatrix/sketch.js}
         */
        applyMatrix(matrix: ArrayLike<number>): void;
        applyMatrix(m00: number, m01: number, m02: number, m03: number, m10: number, m11: number, m12: number, m13: number, m20: number, m21: number, m22: number, m23: number, m30: number, m31: number, m32: number, m33: number): void;
        /**
         * Save the current rendering state to the state stack.
         * Use with {@link pop} to isolate style changes within a block.
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/push/sketch.js}
         */
        push(): void;
        /**
         * Restore the most recently saved rendering state from the state stack.
         * Use with {@link push} to isolate style changes within a block.
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/pop/sketch.js}
         */
        pop(): void;
    }
}
export {};
