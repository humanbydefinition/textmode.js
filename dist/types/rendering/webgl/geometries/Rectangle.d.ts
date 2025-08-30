import { BaseGeometry } from './BaseGeometry';
/**
 * Rectangle geometry renderer with fill and stroke support
 */
export declare class Rectangle extends BaseGeometry {
    constructor(gl: WebGLRenderingContext);
    /**
     * Draw a filled rectangle
     */
    $drawFill(x: number, y: number, width: number, height: number): void;
    /**
     * Draw a rectangle stroke (outline)
     */
    $drawStroke(x: number, y: number, width: number, height: number, weight: number): void;
}
