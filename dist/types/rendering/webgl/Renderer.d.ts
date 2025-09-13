import { GLFramebuffer } from "./Framebuffer";
import type { FramebufferOptions } from '../webgl/Framebuffer';
import { GLShader } from "./Shader";
import { RenderState } from "./RenderState";
/**
 * Core WebGL renderer that manages the WebGL context and provides high-level rendering operations
 */
export declare class GLRenderer {
    private _gl;
    private _currentShader;
    private _userShader;
    private _userUniforms;
    private _ndcQuadBuffer;
    private readonly _geometries;
    private readonly _renderPipeline;
    private readonly _drawQueue;
    private _renderState;
    constructor(gl: WebGL2RenderingContext);
    /** Get or create a geometry instance */
    private _getGeometry;
    /**
     * Set the current shader
     */
    $shader(shader: GLShader): void;
    $createShader(vertexSource: string, fragmentSource: string): GLShader;
    /**
     * Set a custom user shader for subsequent rendering operations
     */
    $setUserShader(shader: GLShader | null): void;
    /**
     * Set a uniform value for the current user shader
     */
    $setUserUniform(name: string, value: any): void;
    /**
     * Set multiple uniform values for the current user shader
     */
    $setUserUniforms(uniforms: Record<string, any>): void;
    /**
     * Create a filter shader using the standard instanced vertex shader
     */
    $createFilterShader(fragmentSource: string): GLShader;
    /**
     * Draw a quad covering the pixel rectangle (x, y, width, height) on the canvas.
     * The quad is converted to NDC and rendered with the current shader using only a_position.
     * Origin: top-left (canvas space)
     */
    $quadPixels(x: number, y: number, width: number, height: number): void;
    /**
     * Draw a rectangle.
     */
    $rect(x: number, y: number, width: number, height: number): void;
    /**
     * Draw a line from (x1, y1) to (x2, y2).
     * @param x1 X-coordinate of the line start point
     * @param y1 Y-coordinate of the line start point
     * @param x2 X-coordinate of the line end point
     * @param y2 Y-coordinate of the line end point
     */
    $line(x1: number, y1: number, x2: number, y2: number): void;
    /**
     * Draw an ellipse.
     * @param x X coordinate (center)
     * @param y Y coordinate (center)
     * @param width Ellipse width
     * @param height Ellipse height
     */
    $ellipse(x: number, y: number, width: number, height: number): void;
    /**
     * Draw a triangle.
     * @param x1 First vertex X coordinate
     * @param y1 First vertex Y coordinate
     * @param x2 Second vertex X coordinate
     * @param y2 Second vertex Y coordinate
     * @param x3 Third vertex X coordinate
     * @param y3 Third vertex Y coordinate
     */
    $triangle(x1: number, y1: number, x2: number, y2: number, x3: number, y3: number): void;
    /**
     * Draw a bezier curve.
     * @param x1 Start point X coordinate
     * @param y1 Start point Y coordinate
     * @param cp1x Control point 1 X coordinate
     * @param cp1y Control point 1 Y coordinate
     * @param cp2x Control point 2 X coordinate
     * @param cp2y Control point 2 Y coordinate
     * @param x2 End point X coordinate
     * @param y2 End point Y coordinate
     */
    $bezierCurve(x1: number, y1: number, cp1x: number, cp1y: number, cp2x: number, cp2y: number, x2: number, y2: number): void;
    /**
     * Create a new framebuffer
     */
    $createFramebuffer(width: number, height: number, attachmentCount?: number, options?: FramebufferOptions): GLFramebuffer;
    $arc(x: number, y: number, width: number, height: number, start: number, stop: number): void;
    /**
     * Fill the current framebuffer with a solid color
     */
    $background(r: number, g?: number, b?: number, a?: number): void;
    /**
     * Clear the current framebuffer
     */
    $clear(r?: number, g?: number, b?: number, a?: number): void;
    /**
     * Ensure viewport matches canvas dimensions
     */
    $resetViewport(): void;
    /**
     * Get the WebGL context
     */
    get context(): WebGLRenderingContext;
    get state(): RenderState;
    /**
     * Flush all batched instances for instanced rendering.
     * This must be called at the end of each frame to actually render the batched geometry.
     * @param shader The instanced shader to use for rendering
     */
    $flushInstances(shader: GLShader): void;
    /**
     * Dispose of all WebGL resources managed by this renderer.
     * This method is idempotent and safe to call multiple times.
     */
    $dispose(): void;
}
