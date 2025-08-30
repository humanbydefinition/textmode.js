import { BaseGeometry } from './BaseGeometry';
/**
 * Line geometry renderer
 */
export declare class Line extends BaseGeometry {
    constructor(gl: WebGLRenderingContext);
    /**
     * Draw a line from (x1, y1) to (x2, y2) with specified weight
     */
    $draw(x1: number, y1: number, x2: number, y2: number, weight: number): void;
}
