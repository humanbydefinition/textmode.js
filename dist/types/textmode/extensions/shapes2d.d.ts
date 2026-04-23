declare module '../Textmodifier' {
    interface Textmodifier {
        /**
         * Draw a rectangle with the current settings.
         * Position is controlled via {@link translate}, {@link push}, and {@link pop}.
         * @param width Width of the rectangle in grid cells (defaults to 1)
         * @param height Height of the rectangle in grid cells (defaults to 1)
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/rect/sketch.js}
         */
        rect(width?: number, height?: number): void;
        /**
         * Draw a 1x1 rectangle with the current settings.
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/point/sketch.js}
         */
        point(): void;
        /**
         * Draw a line from point (x1, y1) to point (x2, y2) with the settings.
         * @param x1 X-coordinate of the line start point in grid cells
         * @param y1 Y-coordinate of the line start point in grid cells
         * @param x2 X-coordinate of the line end point in grid cells
         * @param y2 Y-coordinate of the line end point in grid cells
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/line/sketch.js}
         */
        line(x1: number, y1: number, x2: number, y2: number): void;
        /**
         * Set or get the line weight (thickness).
         *
         * If called with a value, sets the line weight for subsequent drawing operations.
         * If called without arguments, returns the current line weight.
         *
         * @param weight The line weight (thickness) to set.
         * @returns The current line weight if called without arguments.
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/lineWeight/sketch.js}
         */
        lineWeight(weight?: number): number | void;
        /**
         * Draw an ellipse with the current settings.
         * Position is controlled via {@link translate}, {@link push}, and {@link pop}.
         * @param width Width of the ellipse in grid cells (defaults to 1)
         * @param height Height of the ellipse in grid cells (defaults to 1)
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/ellipse/sketch.js}
         */
        ellipse(width?: number, height?: number): void;
        /**
         * Draw a triangle with the current settings.
         * @param x1 X-coordinate of the first vertex in grid cells
         * @param y1 Y-coordinate of the first vertex in grid cells
         * @param x2 X-coordinate of the second vertex in grid cells
         * @param y2 Y-coordinate of the second vertex in grid cells
         * @param x3 X-coordinate of the third vertex in grid cells
         * @param y3 Y-coordinate of the third vertex in grid cells
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/triangle/sketch.js}
         */
        triangle(x1: number, y1: number, x2: number, y2: number, x3: number, y3: number): void;
        /**
         * Draw an arc with the current settings.
         * Position is controlled via {@link translate}, {@link push}, and {@link pop}.
         * @param width Width of the arc in grid cells
         * @param height Height of the arc in grid cells
         * @param startAngle Starting angle in degrees
         * @param endAngle Ending angle in degrees
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/arc/sketch.js}
         */
        arc(width: number, height: number, startAngle: number, endAngle: number): void;
        /**
         * Draw a smooth cubic bezier curve between two points with two control points.
         * The curve thickness is controlled by the current {@link lineWeight} setting.
         * @param x1 Start point X coordinate in grid cells
         * @param y1 Start point Y coordinate in grid cells
         * @param cp1x First control point X coordinate in grid cells
         * @param cp1y First control point Y coordinate in grid cells
         * @param cp2x Second control point X coordinate in grid cells
         * @param cp2y Second control point Y coordinate in grid cells
         * @param x2 End point X coordinate in grid cells
         * @param y2 End point Y coordinate in grid cells
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/bezierCurve/sketch.js}
         */
        bezierCurve(x1: number, y1: number, cp1x: number, cp1y: number, cp2x: number, cp2y: number, x2: number, y2: number): void;
    }
}
export {};
