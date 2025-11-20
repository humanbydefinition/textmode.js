/**
 * Immediate-mode quad renderer for full-screen passes and framebuffer presentation.
 *
 * This is NOT an instanced geometry - it's a simple, stateless utility for drawing
 * a single textured quad immediately. Used primarily for presenting final framebuffer
 * results to the screen or for filter passes.
 */
/**
 * Simple immediate-mode quad renderer.
 * No instancing, no batching, just a single quad drawn with vertex positions in NDC.
 */
export declare class ImmediateQuad {
    private _gl;
    private _vbo;
    private _vertexData;
    constructor(gl: WebGL2RenderingContext);
    /**
     * Draw a quad immediately with the given pixel coordinates.
     * Converts pixel coordinates to NDC and renders a textured quad.
     *
     * The current shader must be bound before calling this method.
     *
     * @param x X position in pixels
     * @param y Y position in pixels
     * @param width Width in pixels
     * @param height Height in pixels
     */
    $draw(x: number, y: number, width: number, height: number): void;
    /**
     * Dispose of WebGL resources.
     */
    $dispose(): void;
}
