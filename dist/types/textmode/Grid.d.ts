/**
 * Manages the grid for the ASCII rendering pipeline of a {@link Textmodifier} instance.
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
    /** Whether the grid dimensions are fixed, or responsive based on the canvas dimensions. */
    private _fixedDimensions;
    /** The canvas element used to determine the grid dimensions. */
    private _canvas;
    /** The width of each cell in the grid. */
    private _cellWidth;
    /** The height of each cell in the grid. */
    private _cellHeight;
    /**
     * Create a new grid instance.
     * @param canvas The canvas element used to determine the grid dimensions.
     * @param cellWidth The width of each cell in the grid.
     * @param cellHeight The height of each cell in the grid.
     * @ignore
     */
    constructor(canvas: HTMLCanvasElement, cellWidth: number, cellHeight: number);
    /**
     * Reset the grid to the default number of columns and rows based on the current canvas dimensions, and the grid cell dimensions.
     * @ignore
     */
    $reset(): void;
    /**
     * Reset the total grid width & height, and the offset to the outer canvas.
     */
    private _updateDimensions;
    /**
     * Re-assign the grid cell dimensions and `reset()` the grid.
     * @param newCellWidth The new cell width.
     * @param newCellHeight The new cell height.
     * @ignore
     */
    $resizeCellPixelDimensions(newCellWidth: number, newCellHeight: number): void;
    /**
     * Re-assign the grid dimensions and resize the grid.
     *
     * Calling this method makes the grid dimensions fixed, meaning they will not automatically resize based on the canvas dimensions.
     * @param newCols The new number of columns.
     * @param newRows The new number of rows.
     * @ignore
     */
    $resizeGridDimensions(newCols: number, newRows: number): void;
    /**
     * Make the grid dimensions flexible again, and `reset()` the grid.
     * @ignore
     */
    $resetGridDimensions(): void;
    /**
     * Update the canvas used by the grid, and reset the grid dimensions.
     * @param canvas The new canvas element to use for the grid.
     * @ignore
     */
    $resize(): void;
    /**
     * Gets or sets whether the grid dimensions *(columns and rows)* are fixed or responsive based on the canvas dimensions.
     * @param value Optional. `true` to make the grid dimensions fixed, or `false` to make them responsive. If not provided, returns the current state.
     * @returns If no parameter is provided, returns `true` if the grid dimensions are fixed, or `false` if they are responsive.
     * @ignore
     */
    $fixedDimensions(value?: boolean): boolean | void;
    /** Returns the width of each cell in the grid. */
    get cellWidth(): number;
    /** Returns the height of each cell in the grid. */
    get cellHeight(): number;
    /** Returns the number of columns in the grid. */
    get cols(): number;
    /** Returns the number of rows in the grid. */
    get rows(): number;
    /** Returns the total width of the grid. */
    get width(): number;
    /** Returns the total height of the grid. */
    get height(): number;
    /** Returns the offset to the outer canvas borders on the x-axis when centering the grid. */
    get offsetX(): number;
    /** Returns the offset to the outer canvas borders on the y-axis when centering the grid. */
    get offsetY(): number;
}
