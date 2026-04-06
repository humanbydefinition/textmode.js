import type { GLFramebuffer, FramebufferOptions } from '../Framebuffer';
import type { GLShader } from '../Shader';
import type { UniformValue } from '../../types/UniformTypes';
import type { RenderState } from '../../state/RenderState';
/**
 * Interface for the core WebGL renderer that manages the WebGL context and provides high-level rendering operations.
 *
 * This interface defines the contract for all rendering operations including:
 * - Shader management and creation
 * - Framebuffer operations
 * - Primitive rendering (rectangles, lines, ellipses, triangles, arcs, bezier curves)
 * - Image and texture rendering
 * - State management
 * - Viewport and clearing operations
 */
export interface IRenderer {
    /**
     * Get the WebGL rendering context.
     * Provides direct access to the underlying WebGL2 context for advanced operations.
     */
    readonly context: WebGL2RenderingContext;
    /**
     * Get the current render state.
     * The render state tracks the current rendering configuration including blend modes,
     * colors, and other state that affects how primitives are drawn.
     */
    readonly state: RenderState;
    /**
     * Set the current shader for subsequent rendering operations.
     * This binds the shader program and makes it active for all following draw calls
     * until a different shader is set.
     *
     * @param shader - The shader to activate
     */
    _shader(shader: GLShader): void;
    /**
     * Create a new shader from vertex and fragment source code.
     * The shader is compiled, linked, and cached by the shader manager.
     *
     * @param vertexSource - GLSL source code for the vertex shader
     * @param fragmentSource - GLSL source code for the fragment shader
     * @returns A compiled and linked shader program
     */
    _createShader(vertexSource: string, fragmentSource: string): GLShader;
    /**
     * Set a custom user shader for subsequent rendering operations.
     * This shader will be used for primitive rendering instead of the default shader.
     * The shader persists until explicitly reset via _resetShader() or by passing null.
     *
     * @param shader - The custom shader to use, or null to reset to default
     */
    _setUserShader(shader: GLShader | null): void;
    /**
     * Reset the current user shader to the default solid color shader.
     * This clears both the active shader and any accumulated uniforms.
     * Equivalent to calling _setUserShader(null).
     */
    _resetShader(): void;
    /**
     * Set a uniform value for the current user shader.
     * The uniform must exist in the shader for this to have any effect.
     *
     * @param name - The name of the uniform variable in the shader
     * @param value - The value to set (type must match the uniform type in the shader)
     */
    _setUniform(name: string, value: UniformValue): void;
    /**
     * Set multiple uniform values for the current user shader.
     * This is a convenience method for setting multiple uniforms at once.
     *
     * @param uniforms - A record mapping uniform names to their values
     */
    _setUniforms(uniforms: Record<string, UniformValue>): void;
    /**
     * Create a filter shader using the standard instanced MRT rectangle vertex shader.
     * Filter shaders are commonly used for MRT post-processing-style passes and therefore
     * only need a custom fragment shader for output logic.
     *
     * @param fragmentSource - GLSL source code for the fragment shader
     * @returns A shader configured for filter operations
     */
    _createFilterShader(fragmentSource: string): GLShader;
    /**
     * Draw a quad covering the pixel rectangle (x, y, width, height) on the canvas.
     * The quad is converted to NDC (Normalized Device Coordinates) and rendered with the
     * current shader using only the a_position attribute.
     * Origin: top-left (canvas space).
     *
     * @param x - X coordinate of the top-left corner in pixels
     * @param y - Y coordinate of the top-left corner in pixels
     * @param width - Width of the quad in pixels
     * @param height - Height of the quad in pixels
     */
    _quad(x: number, y: number, width: number, height: number): void;
    /**
     * Draw a rectangle.
     * The rectangle is rendered using the current shader and render state.
     * Positioning is controlled via the render state transform stack.
     *
     * @param width - Width of the rectangle
     * @param height - Height of the rectangle
     */
    _rect(width: number, height: number): void;
    /**
     * Draw a line from one point to another.
     * The line is rendered with the current stroke settings from the render state.
     *
     * @param x1 - X coordinate of the line start point
     * @param y1 - Y coordinate of the line start point
     * @param x2 - X coordinate of the line end point
     * @param y2 - Y coordinate of the line end point
     */
    _line(x1: number, y1: number, x2: number, y2: number): void;
    /**
     * Draw an ellipse.
     * The ellipse is centered at (0, 0) in the current local coordinate system.
     * Positioning is controlled via the render state transform stack.
     *
     * @param width - Width of the ellipse
     * @param height - Height of the ellipse
     */
    _ellipse(width: number, height: number): void;
    /**
     * Draw a triangle.
     * The triangle is defined by three vertices and rendered with the current render state.
     *
     * @param x1 - First vertex X coordinate
     * @param y1 - First vertex Y coordinate
     * @param x2 - Second vertex X coordinate
     * @param y2 - Second vertex Y coordinate
     * @param x3 - Third vertex X coordinate
     * @param y3 - Third vertex Y coordinate
     */
    _triangle(x1: number, y1: number, x2: number, y2: number, x3: number, y3: number): void;
    /**
     * Draw a cubic Bezier curve.
     * The curve is defined by a start point, two control points, and an end point.
     *
     * @param x1 - Start point X coordinate
     * @param y1 - Start point Y coordinate
     * @param cp1x - First control point X coordinate
     * @param cp1y - First control point Y coordinate
     * @param cp2x - Second control point X coordinate
     * @param cp2y - Second control point Y coordinate
     * @param x2 - End point X coordinate
     * @param y2 - End point Y coordinate
     */
    _bezierCurve(x1: number, y1: number, cp1x: number, cp1y: number, cp2x: number, cp2y: number, x2: number, y2: number): void;
    /**
     * Draw an arc (a portion of an ellipse).
     * The arc is part of an ellipse centered at (0, 0) in the current local coordinate system,
     * drawn from the start angle to the stop angle.
     * Positioning is controlled via the render state transform stack.
     *
     * @param width - Width of the ellipse
     * @param height - Height of the ellipse
     * @param start - Start angle in radians
     * @param stop - Stop angle in radians
     */
    _arc(width: number, height: number, start: number, stop: number): void;
    /**
     * Draw an indexed box primitive.
     * @param width Box width
     * @param height Box height
     * @param depth Box depth
     */
    _box(width: number, height: number, depth: number): void;
    /**
     * Draw an indexed sphere primitive.
     * @param radius Sphere radius
     */
    _sphere(radius: number): void;
    /**
     * Draw an indexed torus primitive.
     * @param radius Radius from center to tube centerline
     * @param tubeRadius Radius of the torus tube
     */
    _torus(radius: number, tubeRadius: number): void;
    /**
     * Draw an indexed cone primitive.
     * @param radius Cone base radius
     * @param height Cone height
     */
    _cone(radius: number, height: number): void;
    /**
     * Draw an indexed cylinder primitive.
     * @param radius Cylinder radius
     * @param height Cylinder height
     */
    _cylinder(radius: number, height: number): void;
    /**
     * Draw an indexed ellipsoid primitive.
     * @param radiusX Radius on the X axis
     * @param radiusY Radius on the Y axis
     * @param radiusZ Radius on the Z axis
     */
    _ellipsoid(radiusX: number, radiusY: number, radiusZ: number): void;
    /**
     * Create a new framebuffer for off-screen rendering.
     * Framebuffers can be used for render-to-texture operations, post-processing,
     * and other advanced rendering techniques.
     *
     * @param width - Width of the framebuffer in pixels
     * @param height - Height of the framebuffer in pixels
     * @param attachmentCount - Number of color attachments (default: 1, supports MRT)
     * @param options - Additional framebuffer configuration options
     * @returns A new framebuffer instance
     */
    _createFramebuffer(width: number, height: number, attachmentCount?: number, options?: FramebufferOptions): GLFramebuffer;
    /**
     * Fill the current framebuffer with a solid color.
     * This sets the canvas background color in the render state and clears the framebuffer.
     * If only one value is provided, it's used for all RGB components.
     *
     * @param r - Red component (0-255)
     * @param g - Green component (0-255), defaults to r if not provided
     * @param b - Blue component (0-255), defaults to r if not provided
     * @param a - Alpha component (0-255), defaults to 255 if not provided
     */
    _background(r: number, g?: number, b?: number, a?: number): void;
    /**
     * Clear the current framebuffer to a specified color.
     * Color components should be in the range [0, 1].
     *
     * @param r - Red component (0-1), defaults to 0
     * @param g - Green component (0-1), defaults to 0
     * @param b - Blue component (0-1), defaults to 0
     * @param a - Alpha component (0-1), defaults to 0
     */
    _clear(r?: number, g?: number, b?: number, a?: number): void;
    /**
     * Reset the viewport to match the canvas dimensions.
     * This ensures the viewport is synchronized with the canvas size, which is
     * important after canvas resize operations.
     */
    _resetViewport(): void;
    /**
     * Flush all batched instances for instanced rendering.
     * This must be called at the end of each frame to actually render all batched geometry.
     * The method processes the entire draw queue and renders all primitives that were
     * queued during the frame.
     */
    _flushInstances(): void;
    /**
     * Dispose of all WebGL resources managed by this renderer.
     * This releases buffers, shaders, geometries, and other GPU resources.
     * This method is idempotent and safe to call multiple times.
     * After disposal, the renderer should not be used.
     */
    _dispose(): void;
}
