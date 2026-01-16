/**
 * Manages the grid of each `TextmodeLayer` instance.
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
     * Create a new grid instance.
     * @param canvas The canvas element used to determine the grid dimensions.
     * @param cellWidth The width of each cell in the grid.
     * @param cellHeight The height of each cell in the grid.
     * @ignore
     */
    constructor(canvas: HTMLCanvasElement, cellWidth: number, cellHeight: number);
    /**
     * Register a listener invoked whenever grid dimensions change.
     * @param handler The callback function to invoke on dimension changes.
     * @ignore
     */
    $addOnDimensionsChange(handler: () => void): void;
    /**
     * Remove a previously registered dimensions change listener.
     * @param handler The callback function to remove.
     * @ignore
     */
    $removeOnDimensionsChange(handler: () => void): void;
    /**
     * Reset the grid to the default number of columns and rows based on the current canvas dimensions, and the grid cell dimensions.
     * @ignore
     */
    $reset(): void;
    /**
     * Re-assign the grid cell dimensions and `reset()` the grid.
     * @param newCellWidth The new cell width.
     * @param newCellHeight The new cell height.
     * @ignore
     */
    $resizeCellPixelDimensions(newCellWidth: number, newCellHeight: number): void;
    /** Returns the width of each cell in the grid. */
    get cellWidth(): number;
    /** Returns the height of each cell in the grid. */
    get cellHeight(): number;
    /** Returns the number of columns in the grid. */
    get cols(): number;
    /** Sets the number of columns and locks grid sizing until `responsive()` is called. */
    set cols(newCols: number);
    /** Returns the number of rows in the grid. */
    get rows(): number;
    /** Sets the number of rows and locks grid sizing until `responsive()` is called. */
    set rows(newRows: number);
    /** Returns the total width of the grid. */
    get width(): number;
    /** Returns the total height of the grid. */
    get height(): number;
    /** Returns the offset to the outer canvas borders on the x-axis when centering the grid. */
    get offsetX(): number;
    /** Returns the offset to the outer canvas borders on the y-axis when centering the grid. */
    get offsetY(): number;
    /**
     * Restores responsive sizing so subsequent `t.resizeCanvas` calls recompute cols/rows.
     *
     * A grid becomes non-responsive when either `cols` or `rows` is manually set.
     */
    responsive(): void;
    /**
     * Dispose the grid and remove all listeners.
     * @ignore
     */
    $dispose(): void;
}
