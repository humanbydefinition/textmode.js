declare module '../Textmodifier' {
    interface Textmodifier {
        /**
         * Sets the rotation angles for subsequent shape rendering operations.
         *
         * All geometries rotate around the center of the shape.
         *
         * @param degreesX The rotation angle in degrees around the X-axis (optional, defaults to 0)
         * @param degreesY The rotation angle in degrees around the Y-axis (optional, defaults to 0)
         * @param degreesZ The rotation angle in degrees around the Z-axis (optional, defaults to 0)
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
         * Sets the X-axis rotation angle for subsequent shape rendering operations, or gets the current angle.
         *
         * All geometries rotate around the center of the shape.
         *
         * @param degrees The rotation angle in degrees around the X-axis. If not provided, returns the current accumulated rotation.
         * @returns The current X-axis rotation in degrees if called without arguments.
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/rotateX/sketch.js}
         */
        rotateX(degrees?: number): number | void;
        /**
         * Sets the Y-axis rotation angle for subsequent shape rendering operations, or gets the current angle.
         *
         * All geometries rotate around the center of the shape.
         *
         * @param degrees The rotation angle in degrees around the Y-axis. If not provided, returns the current accumulated rotation.
         * @returns The current Y-axis rotation in degrees if called without arguments.
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/rotateY/sketch.js}
         */
        rotateY(degrees?: number): number | void;
        /**
         * Sets the Z-axis rotation angle for subsequent shape rendering operations, or gets the current angle.
         *
         * All geometries rotate around the center of the shape.
         *
         * @param degrees The rotation angle in degrees around the Z-axis. If not provided, returns the current accumulated rotation.
         * @returns The current Z-axis rotation in degrees if called without arguments.
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/rotateZ/sketch.js}
         */
        rotateZ(degrees?: number): number | void;
        /**
         * Sets the translation offsets for subsequent shape rendering operations.
         *
         * All geometries are displaced by the specified amounts. Similar to p5.js translate().
         *
         * @param x Translation along the X-axis in grid cells (optional, defaults to 0)
         * @param y Translation along the Y-axis in grid cells (optional, defaults to 0)
         * @param z Translation along the Z-axis in grid cells (optional, defaults to 0)
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/translate/sketch.js}
         */
        translate(x?: number, y?: number, z?: number): void;
        /**
         * Gets the current accumulated X-axis translation offset.
         * @returns The current X-axis translation in grid cells.
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/translateX/sketch.js}
         */
        translateX(): number;
        /**
         * Sets the X-axis translation offset for subsequent shape rendering operations.
         * @param pixels The translation offset in grid cells along the X-axis.
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/translateX2/sketch.js}
         */
        translateX(pixels: number): void;
        /**
         * Gets the current accumulated Y-axis translation offset.
         * @returns The current Y-axis translation in grid cells.
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/translateY/sketch.js}
         */
        translateY(): number;
        /**
         * Sets the Y-axis translation offset for subsequent shape rendering operations.
         * @param pixels The translation offset in grid cells along the Y-axis.
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/translateY2/sketch.js}
         */
        translateY(pixels: number): void;
        /**
         * Gets the current accumulated Z-axis translation offset.
         * @returns The current Z-axis translation in grid cells.
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/translateZ/sketch.js}
         */
        translateZ(): number;
        /**
         * Sets the Z-axis translation offset for subsequent shape rendering operations.
         * @param pixels The translation offset in grid cells along the Z-axis.
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
         */
        scale(x: number, y?: number, z?: number): void;
        /**
         * Reset the current model transform to identity.
         *
         * This clears translation, rotation, and scale state for subsequent draw calls.
         */
        resetMatrix(): void;
        /**
         * Multiply the current model transform by a custom 4x4 matrix.
         *
         * Current implementation supports affine TRS-style matrices (no perspective/shear).
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
