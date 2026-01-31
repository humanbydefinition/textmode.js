import type { TextmodeGrid, GridPosition } from '../textmode/Grid';
/**
 * Projects a client coordinate to grid coordinates.
 * Returns invalid coordinates (-Infinity) if the grid is unavailable or coordinates are outside.
 *
 * @param grid The grid instance to project onto
 * @param clientX The client X coordinate
 * @param clientY The client Y coordinate
 * @returns Object containing x and y grid coordinates
 */
export declare function projectClientToGrid(grid: TextmodeGrid | undefined, clientX: number, clientY: number): GridPosition;
