declare module '../Textmodifier' {
    interface Textmodifier {
        /**
         * Draw a rectangle with the current settings.
         * Position is controlled via {@link translate}, {@link push}, and {@link pop}.
         * @param width Rectangle width in grid cells. Defaults to 1.
         * @param height Rectangle height in grid cells. Defaults to 1.
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/rect/sketch.js}
         */
        rect(width?: number, height?: number): void;
        /**
         * Draw one grid cell with the current settings.
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/point/sketch.js}
         */
        point(): void;
        /**
         * Draw a line from `(x1, y1)` to `(x2, y2)`.
         * @param x1 Start X coordinate in grid cells.
         * @param y1 Start Y coordinate in grid cells.
         * @param x2 End X coordinate in grid cells.
         * @param y2 End Y coordinate in grid cells.
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/line/sketch.js}
         */
        line(x1: number, y1: number, x2: number, y2: number): void;
        /**
         * Set or get line thickness for subsequent line and curve drawing.
         *
         * @param weight Line thickness in grid cells.
         * @returns Current line weight when called without arguments.
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/lineWeight/sketch.js}
         */
        lineWeight(weight?: number): number | void;
        /**
         * Draw an ellipse with the current settings.
         * Position is controlled via {@link translate}, {@link push}, and {@link pop}.
         * @param width Ellipse width in grid cells. Defaults to 1.
         * @param height Ellipse height in grid cells. Defaults to 1.
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/ellipse/sketch.js}
         */
        ellipse(width?: number, height?: number): void;
        /**
         * Draw a triangle with the current settings.
         * @param x1 First vertex X coordinate in grid cells.
         * @param y1 First vertex Y coordinate in grid cells.
         * @param x2 Second vertex X coordinate in grid cells.
         * @param y2 Second vertex Y coordinate in grid cells.
         * @param x3 Third vertex X coordinate in grid cells.
         * @param y3 Third vertex Y coordinate in grid cells.
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/triangle/sketch.js}
         */
        triangle(x1: number, y1: number, x2: number, y2: number, x3: number, y3: number): void;
        /**
         * Draw an arc with the current settings.
         * Position is controlled via {@link translate}, {@link push}, and {@link pop}.
         * @param width Arc width in grid cells.
         * @param height Arc height in grid cells.
         * @param startAngle Starting angle in degrees.
         * @param endAngle Ending angle in degrees.
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/arc/sketch.js}
         */
        arc(width: number, height: number, startAngle: number, endAngle: number): void;
        /**
         * Draw a smooth cubic Bezier curve between two points.
         * The curve thickness is controlled by the current {@link lineWeight} setting.
         * @param x1 Start point X coordinate in grid cells.
         * @param y1 Start point Y coordinate in grid cells.
         * @param cp1x First control point X coordinate in grid cells.
         * @param cp1y First control point Y coordinate in grid cells.
         * @param cp2x Second control point X coordinate in grid cells.
         * @param cp2y Second control point Y coordinate in grid cells.
         * @param x2 End point X coordinate in grid cells.
         * @param y2 End point Y coordinate in grid cells.
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/bezierCurve/sketch.js}
         */
        bezierCurve(x1: number, y1: number, cp1x: number, cp1y: number, cp2x: number, cp2y: number, x2: number, y2: number): void;
    }
}
export {};
