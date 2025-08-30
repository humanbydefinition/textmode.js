import { GLFramebuffer } from "./Framebuffer";
import type { Framebuffer, FramebufferOptions } from '../core/Framebuffer';
import { GLShader } from "./Shader";
import type { UniformValue } from "../core";
/**
 * Core WebGL renderer that manages the WebGL context and provides high-level rendering operations
 */
export declare class GLRenderer {
    private _gl;
    private _imageShader;
    private _solidColorShader;
    private _currentShader;
    private _rectangleGeometry;
    private _lineGeometry;
    private _currentFillColor;
    private _fillMode;
    private _currentStrokeColor;
    private _currentStrokeWeight;
    private _strokeMode;
    private _currentRotation;
    private _stateStack;
    constructor(gl: WebGLRenderingContext | WebGL2RenderingContext);
    /**
     * Set the current shader
     */
    $shader(shader: GLShader): void;
    /**
     * Sets the fill color for subsequent rendering operations
     * @param r Red component *(0-255)*
     * @param g Green component *(0-255, optional)*
     * @param b Blue component *(0-255, optional)*
     * @param a Alpha component *(0-255, optional)*
     */
    $fill(r: number, g?: number, b?: number, a?: number): void;
    /**
     * Sets the stroke color for subsequent rendering operations
     * @param r Red component *(0-255)*
     * @param g Green component *(0-255, optional)*
     * @param b Blue component *(0-255, optional)*
     * @param a Alpha component *(0-255, optional)*
     */
    $stroke(r: number, g?: number, b?: number, a?: number): void;
    /**
     * Sets the stroke weight (thickness) for subsequent stroke operations
     * @param weight The stroke thickness in pixels
     */
    $strokeWeight(weight: number): void;
    /**
     * Disables stroke rendering for subsequent operations
     */
    $noStroke(): void;
    /**
     * Disables fill rendering for subsequent operations
     */
    $noFill(): void;
    /**
     * Sets the rotation angle for subsequent rendering operations
     * @param degrees The rotation angle in degrees
     */
    $rotate(degrees: number): void;
    /**
     * Save the current rendering state (fill, stroke, etc.) to the state stack
     */
    $push(): void;
    /**
     * Restore the most recently saved rendering state from the state stack
     */
    $pop(): void;
    /**
     * Reset frame-specific state - called automatically after each frame.
     * Note: This does not reset fill/stroke state as that should persist
     * across frames and be managed by push/pop or explicit calls.
     */
    $reset(): void;
    /**
     * Detect if a fragment shader is WebGL2 by checking for version directive
     * @param fragmentSource The fragment shader source code
     * @returns true if WebGL2, false if WebGL1
     */
    private _detectShaderVersion;
    $createShader(vertexSource: string, fragmentSource: string): GLShader;
    $createFilterShader(fragmentSource: string): GLShader;
    /**
     * Set a uniform value for the current shader
     */
    $setUniform(name: string, value: UniformValue): void;
    /**
     * Draw a rectangle with the current fill and/or stroke settings
     */
    $rect(x: number, y: number, width: number, height: number): void;
    /**
     * Draw a line from (x1, y1) to (x2, y2) with the current stroke settings.
     * Lines only support stroke rendering - fill properties are ignored.
     * @param x1 X-coordinate of the line start point
     * @param y1 Y-coordinate of the line start point
     * @param x2 X-coordinate of the line end point
     * @param y2 Y-coordinate of the line end point
     */
    $line(x1: number, y1: number, x2: number, y2: number): void;
    /**
     * Calculate rotation parameters for built-in shaders (NDC coordinates)
     */
    private _calculateRotationParams;
    /**
     * Create a new framebuffer
     */
    $createFramebuffer(width: number, height: number, options?: FramebufferOptions): GLFramebuffer;
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
    /**
     * Dispose of all WebGL resources managed by this renderer.
     * This method is idempotent and safe to call multiple times.
     */
    $dispose(): void;
    /**
     * Render a framebuffer at a specific position with optional scaling
     */
    $image(source: Framebuffer, posX: number, posY: number, width?: number, height?: number): void;
}
