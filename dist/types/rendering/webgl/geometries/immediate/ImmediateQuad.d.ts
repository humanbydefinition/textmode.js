/**
 * Direct quad renderer for framebuffer presentation and filter passes.
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
    _draw(x: number, y: number, width: number, height: number): void;
    /**
     * Dispose of WebGL resources.
     */
    _dispose(): void;
}
