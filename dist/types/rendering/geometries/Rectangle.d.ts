/**
 * Rectangle geometry class for WebGL rendering
 */
export declare class Rectangle {
    /** The WebGL rendering context */
    private gl;
    /** The buffer containing the rectangle vertices */
    private buffer;
    /** The number of vertices in the rectangle */
    private numVertices;
    constructor(gl: WebGLRenderingContext, x: number, y: number, width: number, height: number);
    /**
     * Draw the quad using attribute locations from the current shader
     */
    draw(): void;
}
