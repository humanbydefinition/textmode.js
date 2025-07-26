export interface RectangleOptions {
    /** Whether to include texture coordinates for textured rendering */
    textured?: boolean;
}
/**
 * Versatile rectangle geometry for WebGL rendering.
 * Automatically adapts vertex layout for textured or solid color rendering.
 * Handles coordinate system differences between canvas and framebuffer targets by flipping Y-axis for framebuffers.
 */
export declare class Rectangle {
    /** The WebGL rendering context */
    private gl;
    /** The vertex buffer containing position and optional texture coordinates */
    private vertexBuffer;
    /** The number of vertices in this geometry (always 6 for two triangles) */
    private readonly vertexCount;
    /** The rendering mode: textured or solid color */
    private readonly renderMode;
    /** Bytes per vertex: 8 for position-only, 16 for position+texture */
    private readonly bytesPerVertex;
    constructor(gl: WebGLRenderingContext, x: number, y: number, width: number, height: number, options?: RectangleOptions);
    /**
     * Generate vertex data for the rectangle
     * @private
     */
    private generateVertices;
    /**
     * Render the rectangle using the appropriate vertex attributes
     */
    render(): void;
}
