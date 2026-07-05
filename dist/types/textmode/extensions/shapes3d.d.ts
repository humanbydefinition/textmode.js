declare module '../Textmodifier' {
    interface Textmodifier {
        /**
         * Draw a box mesh primitive.
         *
         * @param width Width in grid cells (defaults to 50).
         * @param height Height in grid cells (defaults to width).
         * @param depth Depth in grid cells (defaults to height).
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/box/sketch.js}
         *
         * @see {@link https://code.textmode.art/api/textmode.js/classes/Textmodifier/methods/box | Textmodifier.box API reference}
         */
        box(width?: number, height?: number, depth?: number): void;
        /**
         * Draw a sphere mesh primitive.
         *
         * @param radius Sphere radius in grid cells (defaults to 50).
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/sphere/sketch.js}
         *
         * @see {@link https://code.textmode.art/api/textmode.js/classes/Textmodifier/methods/sphere | Textmodifier.sphere API reference}
         */
        sphere(radius?: number): void;
        /**
         * Draw a torus mesh primitive.
         *
         * @param radius Radius from center to tube centerline (defaults to 50).
         * @param tubeRadius Radius of the tube (defaults to 10).
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/torus/sketch.js}
         *
         * @see {@link https://code.textmode.art/api/textmode.js/classes/Textmodifier/methods/torus | Textmodifier.torus API reference}
         */
        torus(radius?: number, tubeRadius?: number): void;
        /**
         * Draw a cone mesh primitive.
         *
         * @param radius Base radius in grid cells (defaults to 50).
         * @param height Height in grid cells (defaults to radius).
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/cone/sketch.js}
         *
         * @see {@link https://code.textmode.art/api/textmode.js/classes/Textmodifier/methods/cone | Textmodifier.cone API reference}
         */
        cone(radius?: number, height?: number): void;
        /**
         * Draw a cylinder mesh primitive.
         *
         * @param radius Radius in grid cells (defaults to 50).
         * @param height Height in grid cells (defaults to radius).
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/cylinder/sketch.js}
         *
         * @see {@link https://code.textmode.art/api/textmode.js/classes/Textmodifier/methods/cylinder | Textmodifier.cylinder API reference}
         */
        cylinder(radius?: number, height?: number): void;
        /**
         * Draw an ellipsoid mesh primitive.
         *
         * @param radiusX Radius on X axis in grid cells (defaults to 50).
         * @param radiusY Radius on Y axis in grid cells (defaults to radiusX).
         * @param radiusZ Radius on Z axis in grid cells (defaults to radiusX).
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/ellipsoid/sketch.js}
         *
         * @see {@link https://code.textmode.art/api/textmode.js/classes/Textmodifier/methods/ellipsoid | Textmodifier.ellipsoid API reference}
         */
        ellipsoid(radiusX?: number, radiusY?: number, radiusZ?: number): void;
    }
}
export {};
