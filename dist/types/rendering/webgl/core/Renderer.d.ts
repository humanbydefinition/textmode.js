import { GLFramebuffer } from "./Framebuffer";
import type { FramebufferOptions } from './Framebuffer';
import { GLShader } from "./Shader";
import { RenderState } from "../state/RenderState";
import type { TextmodeSource } from '../../../textmode/loadables/TextmodeSource';
import type { IRenderer } from "./interfaces/IRenderer";
import { MaterialManager } from '../materials/MaterialManager';
export declare class GLRenderer implements IRenderer {
    private _gl;
    private _currentShader;
    private readonly _renderPipeline;
    private readonly _materialManager;
    private _renderState;
    private _drawQueue;
    private readonly _immediateQuad;
    private _userShader;
    private _userUniforms;
    private _framebufferBindingStack;
    private _viewportStack;
    private _currentFramebuffer;
    private _currentViewport;
    constructor(gl: WebGL2RenderingContext);
    /**
     * Push current framebuffer and viewport state onto the stack.
     * Used by framebuffer begin() to save state before binding.
     * @internal
     */
    $pushFramebufferState(): void;
    /**
     * Pop framebuffer and viewport state from the stack.
     * Used by framebuffer end() to restore previous state.
     * @internal
     */
    $popFramebufferState(): void;
    /**
     * Bind a framebuffer and update CPU-side tracking.
     * @internal
     */
    $bindFramebuffer(framebuffer: WebGLFramebuffer | null, width: number, height: number): void;
    $shader(shader: GLShader): void;
    $createShader(vertexSource: string, fragmentSource: string): GLShader;
    $setUserShader(shader: GLShader | null): void;
    $setUniform(name: string, value: any): void;
    $setUserUniforms(uniforms: Record<string, any>): void;
    $createFilterShader(fragmentSource: string): GLShader;
    $image(source: GLFramebuffer | TextmodeSource, width?: number, height?: number): void;
    $quad(x: number, y: number, width: number, height: number): void;
    $rect(width: number, height: number): void;
    $line(x1: number, y1: number, x2: number, y2: number): void;
    $ellipse(width: number, height: number): void;
    $triangle(x1: number, y1: number, x2: number, y2: number, x3: number, y3: number): void;
    $bezierCurve(x1: number, y1: number, cp1x: number, cp1y: number, cp2x: number, cp2y: number, x2: number, y2: number): void;
    $arc(width: number, height: number, start: number, stop: number): void;
    $createFramebuffer(width: number, height: number, attachmentCount?: number, options?: FramebufferOptions): GLFramebuffer;
    $background(r: number, g?: number, b?: number, a?: number): void;
    $clear(r?: number, g?: number, b?: number, a?: number): void;
    $resetViewport(): void;
    $flushInstances(): void;
    $dispose(): void;
    get context(): WebGLRenderingContext;
    get state(): RenderState;
    get materialManager(): MaterialManager;
}
