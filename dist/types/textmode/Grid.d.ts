/**
 * Manages the grid of a {@link Textmodifier} instance.
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
