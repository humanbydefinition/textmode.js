/**
 * Shape assembly modes for {@link Textmodifier.beginShape}.
 *
 * @see {@link https://code.textmode.art/api/textmode.js/enumerations/ShapeAssemblyMode | ShapeAssemblyMode API reference}
 */
export declare enum ShapeAssemblyMode {
    /**
     * Draw each recorded vertex as a separate point.
     *
     * Use this for particle fields, sampled paths, and other custom shapes
     * where every vertex is an independent mark.
     *
     * @example
     * {@includeCode ../../../examples/Textmodifier/POINTS/sketch.js}
     */
    POINTS = 0,
    /**
     * Draw each pair of recorded vertices as an independent line segment.
     *
     * Use this for disconnected strokes, hatching, radial spokes, and other
     * geometry where every two vertices form a separate edge.
     *
     * @example
     * {@includeCode ../../../examples/Textmodifier/LINES/sketch.js}
     */
    LINES = 1,
    /**
     * Draw consecutive vertices as one connected open path.
     *
     * Use this for trails, contours, oscillators, and continuous generative
     * paths that should not automatically close.
     *
     * @example
     * {@includeCode ../../../examples/Textmodifier/LINE_STRIP/sketch.js}
     */
    LINE_STRIP = 2,
    /**
     * Draw consecutive vertices as one connected closed loop.
     *
     * Use this for orbit rings, cells, seals, and procedural outlines where
     * the last vertex should connect back to the first.
     *
     * @example
     * {@includeCode ../../../examples/Textmodifier/LINE_LOOP/sketch.js}
     */
    LINE_LOOP = 3,
    /**
     * Draw each group of three vertices as an independent triangle.
     *
     * Use this for faceted fields, low-poly shards, and filled geometry where
     * each triangle controls its own three corners.
     *
     * @example
     * {@includeCode ../../../examples/Textmodifier/TRIANGLES/sketch.js}
     */
    TRIANGLES = 4,
    /**
     * Draw overlapping triplets of vertices as a connected triangle strip.
     *
     * Use this for ribbons, folded bands, and efficient connected surfaces
     * built from a single alternating vertex sequence.
     *
     * @example
     * {@includeCode ../../../examples/Textmodifier/TRIANGLE_STRIP/sketch.js}
     */
    TRIANGLE_STRIP = 5,
    /**
     * Draw triangles that all share the first recorded vertex.
     *
     * Use this for fans, wedges, circular bursts, and filled radial forms
     * expanding from a shared center.
     *
     * @example
     * {@includeCode ../../../examples/Textmodifier/TRIANGLE_FAN/sketch.js}
     */
    TRIANGLE_FAN = 6,
    /**
     * Draw each group of four vertices as a quad split into two triangles.
     *
     * Use this for tiled panels, procedural cells, and blocky surfaces where
     * every four vertices define a separate four-sided patch.
     *
     * @example
     * {@includeCode ../../../examples/Textmodifier/QUADS/sketch.js}
     */
    QUADS = 7,
    /**
     * Draw paired vertices as a connected strip of quads.
     *
     * Use this for woven bands, thick paths, and flexible ribbons where each
     * pair of vertices extends the next four-sided segment.
     *
     * @example
     * {@includeCode ../../../examples/Textmodifier/QUAD_STRIP/sketch.js}
     */
    QUAD_STRIP = 8
}
type ShapeCloseMode = 'close';
declare module '../Textmodifier' {
    interface Textmodifier {
        /**
         * Draw each recorded vertex as a separate point.
         *
         * Use this for particle fields, sampled paths, and other custom shapes
         * where every vertex is an independent mark.
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/POINTS/sketch.js}
         *
         * @see {@link https://code.textmode.art/api/textmode.js/classes/Textmodifier#points | Textmodifier.POINTS API reference}
         */
        readonly POINTS: ShapeAssemblyMode.POINTS;
        /**
         * Draw each pair of recorded vertices as an independent line segment.
         *
         * Use this for disconnected strokes, hatching, radial spokes, and other
         * geometry where every two vertices form a separate edge.
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/LINES/sketch.js}
         *
         * @see {@link https://code.textmode.art/api/textmode.js/classes/Textmodifier#lines | Textmodifier.LINES API reference}
         */
        readonly LINES: ShapeAssemblyMode.LINES;
        /**
         * Draw consecutive vertices as one connected open path.
         *
         * Use this for trails, contours, oscillators, and continuous generative
         * paths that should not automatically close.
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/LINE_STRIP/sketch.js}
         *
         * @see {@link https://code.textmode.art/api/textmode.js/classes/Textmodifier#line_strip | Textmodifier.LINE_STRIP API reference}
         */
        readonly LINE_STRIP: ShapeAssemblyMode.LINE_STRIP;
        /**
         * Draw consecutive vertices as one connected closed loop.
         *
         * Use this for orbit rings, cells, seals, and procedural outlines where
         * the last vertex should connect back to the first.
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/LINE_LOOP/sketch.js}
         *
         * @see {@link https://code.textmode.art/api/textmode.js/classes/Textmodifier#line_loop | Textmodifier.LINE_LOOP API reference}
         */
        readonly LINE_LOOP: ShapeAssemblyMode.LINE_LOOP;
        /**
         * Draw each group of three vertices as an independent triangle.
         *
         * Use this for faceted fields, low-poly shards, and filled geometry where
         * each triangle controls its own three corners.
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/TRIANGLES/sketch.js}
         *
         * @see {@link https://code.textmode.art/api/textmode.js/classes/Textmodifier#triangles | Textmodifier.TRIANGLES API reference}
         */
        readonly TRIANGLES: ShapeAssemblyMode.TRIANGLES;
        /**
         * Draw overlapping triplets of vertices as a connected triangle strip.
         *
         * Use this for ribbons, folded bands, and efficient connected surfaces
         * built from a single alternating vertex sequence.
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/TRIANGLE_STRIP/sketch.js}
         *
         * @see {@link https://code.textmode.art/api/textmode.js/classes/Textmodifier#triangle_strip | Textmodifier.TRIANGLE_STRIP API reference}
         */
        readonly TRIANGLE_STRIP: ShapeAssemblyMode.TRIANGLE_STRIP;
        /**
         * Draw triangles that all share the first recorded vertex.
         *
         * Use this for fans, wedges, circular bursts, and filled radial forms
         * expanding from a shared center.
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/TRIANGLE_FAN/sketch.js}
         *
         * @see {@link https://code.textmode.art/api/textmode.js/classes/Textmodifier#triangle_fan | Textmodifier.TRIANGLE_FAN API reference}
         */
        readonly TRIANGLE_FAN: ShapeAssemblyMode.TRIANGLE_FAN;
        /**
         * Draw each group of four vertices as a quad split into two triangles.
         *
         * Use this for tiled panels, procedural cells, and blocky surfaces where
         * every four vertices define a separate four-sided patch.
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/QUADS/sketch.js}
         *
         * @see {@link https://code.textmode.art/api/textmode.js/classes/Textmodifier#quads | Textmodifier.QUADS API reference}
         */
        readonly QUADS: ShapeAssemblyMode.QUADS;
        /**
         * Draw paired vertices as a connected strip of quads.
         *
         * Use this for woven bands, thick paths, and flexible ribbons where each
         * pair of vertices extends the next four-sided segment.
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/QUAD_STRIP/sketch.js}
         *
         * @see {@link https://code.textmode.art/api/textmode.js/classes/Textmodifier#quad_strip | Textmodifier.QUAD_STRIP API reference}
         */
        readonly QUAD_STRIP: ShapeAssemblyMode.QUAD_STRIP;
        /**
         * Draw a rectangle with the current settings.
         * Position is controlled via {@link translate}, {@link push}, and {@link pop}.
         * @param width Rectangle width in grid cells. Defaults to 1.
         * @param height Rectangle height in grid cells. Defaults to 1.
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/rect/sketch.js}
         *
         * @see {@link https://code.textmode.art/api/textmode.js/classes/Textmodifier/methods/rect | Textmodifier.rect API reference}
         */
        rect(width?: number, height?: number): void;
        /**
         * Draw one cell with the current settings.
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/point/sketch.js}
         *
         * @see {@link https://code.textmode.art/api/textmode.js/classes/Textmodifier/methods/point | Textmodifier.point API reference}
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
         *
         * @see {@link https://code.textmode.art/api/textmode.js/classes/Textmodifier/methods/line | Textmodifier.line API reference}
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
         *
         * @see {@link https://code.textmode.art/api/textmode.js/classes/Textmodifier/methods/lineWeight | Textmodifier.lineWeight API reference}
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
         *
         * @see {@link https://code.textmode.art/api/textmode.js/classes/Textmodifier/methods/ellipse | Textmodifier.ellipse API reference}
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
         *
         * @see {@link https://code.textmode.art/api/textmode.js/classes/Textmodifier/methods/triangle | Textmodifier.triangle API reference}
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
         *
         * @see {@link https://code.textmode.art/api/textmode.js/classes/Textmodifier/methods/arc | Textmodifier.arc API reference}
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
         *
         * @see {@link https://code.textmode.art/api/textmode.js/classes/Textmodifier/methods/bezierCurve | Textmodifier.bezierCurve API reference}
         */
        bezierCurve(x1: number, y1: number, cp1x: number, cp1y: number, cp2x: number, cp2y: number, x2: number, y2: number): void;
        /**
         * Start recording vertices for a custom 2D or 3D shape.
         * Call {@link vertex} one or more times, then call {@link endShape} to draw the recorded shape.
         *
         * @param mode Shape assembly mode. Defaults to {@link ShapeAssemblyMode.LINE_STRIP}.
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/beginShape/sketch.js}
         *
         * @see {@link https://code.textmode.art/api/textmode.js/classes/Textmodifier/methods/beginShape | Textmodifier.beginShape API reference}
         */
        beginShape(mode?: ShapeAssemblyMode): void;
        /**
         * Add a vertex to the active custom shape.
         * The current transform, character, color, and line state are captured for this vertex.
         *
         * @param x X coordinate in local grid cells.
         * @param y Y coordinate in local grid cells.
         * @param z Z coordinate in local grid cells. Defaults to 0.
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/beginShape2/sketch.js}
         *
         * @see {@link https://code.textmode.art/api/textmode.js/classes/Textmodifier/methods/vertex | Textmodifier.vertex API reference}
         */
        vertex(x: number, y: number, z?: number): void;
        /**
         * Finish the active custom shape and enqueue its geometry.
         *
         * @param close Pass `'close'` to connect the final vertex back to the first for line-strip shapes.
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/beginShape/sketch.js}
         *
         * @see {@link https://code.textmode.art/api/textmode.js/classes/Textmodifier/methods/endShape | Textmodifier.endShape API reference}
         */
        endShape(close?: ShapeCloseMode): void;
    }
}
export {};
