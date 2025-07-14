import { Framebuffer, type FramebufferOptions } from "./Framebuffer";
import { Shader } from "./Shader";
/**
 * Core WebGL renderer that manages the WebGL context and provides high-level rendering operations
 */
export declare class Renderer {
    private gl;
    private imageShader;
    private currentShader;
    constructor(gl: WebGLRenderingContext | WebGL2RenderingContext);
    private setupDefaultState;
    /**
     * Set the current shader (p5.js-like API)
     */
    shader(shader: Shader): void;
    /**
     * Set a uniform value for the current shader (p5.js-like API)
     */
    setUniform(name: string, value: any): void;
    /**
     * Draw a rectangle with the current shader (p5.js-like API)
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
     * Render a framebuffer at a specific position with optional scaling
     */
    image(source: Framebuffer, posX: number, posY: number, width?: number, height?: number): void;
}
