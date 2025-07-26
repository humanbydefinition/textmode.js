import { Framebuffer, type FramebufferOptions } from "./Framebuffer";
import { Shader } from "./Shader";
/**
 * Blend modes for different rendering contexts
 */
export declare enum BlendMode {
    NORMAL = "normal",// Standard alpha blending for internal rendering
    PREMULTIPLIED = "premultiplied"
}
/**
 * Core WebGL renderer that manages the WebGL context and provides high-level rendering operations
 */
export declare class Renderer {
    private gl;
    private imageShader;
    private solidColorShader;
    private currentShader;
    private currentBlendMode;
    private currentFillColor;
    private fillMode;
    constructor(gl: WebGLRenderingContext | WebGL2RenderingContext);
    /**
     * Set the current shader (p5.js-like API)
     */
    shader(shader: Shader): void;
    /**
     * Set fill color for subsequent shape drawing (p5.js-like API)
     * This only stores the color state and sets the fill mode.
     * No WebGL operations should happen here.
     */
    fill(r: number, g?: number, b?: number, a?: number): void;
    /**
     * Reset fill mode - called automatically after each frame
     */
    reset(): void;
    createShader(vertexSource: string, fragmentSource: string): Shader;
    /**
     * Set a uniform value for the current shader (p5.js-like API)
     */
    setUniform(name: string, value: any): void;
    /**
     * Draw a rectangle with the current shader or fill color (p5.js-like API)
     */
    rect(x: number, y: number, width: number, height: number): void;
    /**
     * Create a new framebuffer
     */
    createFramebuffer(width: number, height: number, options?: FramebufferOptions): Framebuffer;
    /**
     * Fill the current framebuffer with a solid color (p5.js-like API)
     */
    background(r: number, g?: number, b?: number, a?: number): void;
    /**
     * Clear the current framebuffer
     */
    clear(r?: number, g?: number, b?: number, a?: number): void;
    /**
     * Ensure viewport matches canvas dimensions
     */
    resetViewport(): void;
    /**
     * Get the WebGL context
     */
    get context(): WebGLRenderingContext;
    /**
     * Set the blend mode for different rendering contexts
     */
    setBlendMode(mode: BlendMode): void;
    /**
     * Render a framebuffer at a specific position with optional scaling
     */
    image(source: Framebuffer, posX: number, posY: number, width?: number, height?: number): void;
}
