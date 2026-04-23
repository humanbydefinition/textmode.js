/**
 * Represents a position on the grid, typically using center-based coordinates.
 */
export interface GridPosition {
    /** The X coordinate (column), often relative to the grid's center. */
    x: number;
    /** The Y coordinate (row), often relative to the grid's center. */
    y: number;
}
/**
 * Function type that returns a Grid instance or undefined.
 */
export type GridProvider = () => TextmodeGrid | undefined;
/**
 * Manages the grid of each `TextmodeLayer` instance.
 *
 * The grid determines how characters are positioned and sized on the canvas.
 * By default, the grid is responsive, meaning it recalculates the number of columns
 * and rows based on the canvas size and the font size.
 *
 * You can manually set `cols` and `rows` to lock the grid to a specific size.
 *
 * @example
 * {@includeCode ../../../examples/TextmodeGrid/creation/sketch.js}
 */
export declare class TextmodeGrid {
    /** The number of columns in the grid. */
    private _cols;
    /** The number of rows in the grid. */
    private _rows;
    /** The total width of the grid in pixels. */
    private _width;
    /** The total height of the grid in pixels. */
    private _height;
    /** The offset to the outer canvas on the x-axis when centering the grid. */
    private _offsetX;
    /** The offset to the outer canvas on the y-axis when centering the grid. */
    private _offsetY;
    /** The canvas element used to determine the grid dimensions. */
    private _canvas;
    /** The width of each cell in the grid. */
    private _cellWidth;
    /** The height of each cell in the grid. */
    private _cellHeight;
    /** Tracks whether cols/rows were manually overridden. */
    private _manualDimensionsSet;
    /** Hooks to notify listeners when grid dimensions change. */
    private _dimensionChangeListeners;
    /** Updates derived metrics (width/height/offset) from current cols/rows. */
    private _syncDerivedDimensions;
    /**
     * Reset the grid to the default number of columns and rows based on the current canvas dimensions, and the grid cell dimensions.
     *
     * If either `cols` or `rows` were manually set, this method does nothing.
     * Make sure to call `responsive()` first to restore responsive sizing.
     *
     * `textmode.js` handles calling this method automatically when the canvas is resized.
     * You typically do not need to call this method directly.
     *
     * @example
     * {@includeCode ../../../examples/TextmodeGrid/reset/sketch.js}
     */
    reset(): void;
    /**
     * Returns the width of each cell in the grid in screen pixels.
     *
     * @example
     * {@includeCode ../../../examples/TextmodeGrid/cellWidth/sketch.js}
     */
    get cellWidth(): number;
    /**
     * Returns the height of each cell in the grid in screen pixels.
     *
     * @example
     * {@includeCode ../../../examples/TextmodeGrid/cellHeight/sketch.js}
     */
    get cellHeight(): number;
    /**
     * Returns the number of columns in the grid.
     *
     * @example
     * {@includeCode ../../../examples/TextmodeGrid/cols/sketch.js}
     */
    get cols(): number;
    /**
     * Sets the number of columns and locks grid sizing until `responsive()` is called.
     *
     * @example
     * {@includeCode ../../../examples/TextmodeGrid/setCols/sketch.js}
     */
    set cols(newCols: number);
    /**
     * Returns the number of rows in the grid.
     *
     * @example
     * {@includeCode ../../../examples/TextmodeGrid/rows/sketch.js}
     */
    get rows(): number;
    /**
     * Sets the number of rows and locks grid sizing until `responsive()` is called.
     *
     * @example
     * {@includeCode ../../../examples/TextmodeGrid/setRows/sketch.js}
     */
    set rows(newRows: number);
    /**
     * Returns the total width of the grid in screen pixels.
     *
     * This is equal to `cols * cellWidth`.
     *
     * @example
     * {@includeCode ../../../examples/TextmodeGrid/width/sketch.js}
     */
    get width(): number;
    /**
     * Returns the total height of the grid in screen pixels.
     *
     * This is equal to `rows * cellHeight`.
     *
     * @example
     * {@includeCode ../../../examples/TextmodeGrid/height/sketch.js}
     */
    get height(): number;
    /**
     * Returns the horizontal offset (margin) in pixels from the canvas edge to the grid.
     *
     * @example
     * {@includeCode ../../../examples/TextmodeGrid/offsetX/sketch.js}
     */
    get offsetX(): number;
    /**
     * Returns the vertical offset (margin) in pixels from the canvas edge to the grid.
     *
     * @example
     * {@includeCode ../../../examples/TextmodeGrid/offsetY/sketch.js}
     */
    get offsetY(): number;
    /**
     * Restores responsive sizing so subsequent `t.resizeCanvas` calls recompute cols/rows.
     *
     * A grid becomes non-responsive when either `cols` or `rows` is manually set.
     *
     * @example
     * {@includeCode ../../../examples/TextmodeGrid/responsive/sketch.js}
     */
    responsive(): void;
}
