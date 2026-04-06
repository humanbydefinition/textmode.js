import { GLFramebuffer } from './Framebuffer';
import type { FramebufferOptions } from './Framebuffer';
import { GLShader } from './Shader';
import type { UniformValue } from '../types/UniformTypes';
import { RenderState } from '../state/RenderState';
import type { TextmodeSource } from '../../../textmode/loadables/TextmodeSource';
import type { TextmodeFont } from '../../../textmode/loadables/font/TextmodeFont';
import type { IRenderer } from './interfaces/IRenderer';
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
    private _userShaderStateStack;
    private _framebufferBindingStack;
    private _viewportStack;
    private _attachmentCountStack;
    private _currentFramebuffer;
    private _currentViewport;
    private _currentAttachmentCount;
    private _depthTestEnabled;
    private _depthMaskEnabled;
    private _isRenderingFrame;
    private readonly _tempClearBuffer;
    private _frameOverrideSources;
    constructor(gl: WebGL2RenderingContext);
    _shader(shader: GLShader): void;
    _createShader(vertexSource: string, fragmentSource: string): GLShader;
    _setUserShader(shader: GLShader | null): void;
    _resetShader(): void;
    _setUniform(name: string, value: UniformValue): void;
    _setUniforms(uniforms: Record<string, UniformValue>): void;
    _createFilterShader(fragmentSource: string): GLShader;
    _image(source: GLFramebuffer | TextmodeSource, width?: number, height?: number, activeFont?: TextmodeFont): void;
    _quad(x: number, y: number, width: number, height: number): void;
    _rect(width: number, height: number): void;
    _line(x1: number, y1: number, x2: number, y2: number): void;
    _ellipse(width: number, height: number): void;
    _triangle(x1: number, y1: number, x2: number, y2: number, x3: number, y3: number): void;
    _bezierCurve(x1: number, y1: number, cp1x: number, cp1y: number, cp2x: number, cp2y: number, x2: number, y2: number): void;
    _arc(width: number, height: number, start: number, stop: number): void;
    _box(width: number, height: number, depth: number): void;
    _sphere(radius: number): void;
    _torus(radius: number, tubeRadius: number): void;
    _cone(radius: number, height: number): void;
    _cylinder(radius: number, height: number): void;
    _ellipsoid(radiusX: number, radiusY: number, radiusZ: number): void;
    _createFramebuffer(width: number, height: number, attachmentCount?: number, options?: FramebufferOptions): GLFramebuffer;
    _background(r: number, g?: number, b?: number, a?: number): void;
    _clear(r?: number, g?: number, b?: number, a?: number): void;
    /**
     * Internal MRT-aware clear implementation.
     * @param r Red component (0-1)
     * @param g Green component (0-1)
     * @param b Blue component (0-1)
     * @param a Alpha component (0-1)
     * @param preserveCharData If true, clears attachment 0 to (1, 1, 0, 0); if false, clears to (0, 0, 0, 0)
     */
    private _clearMRT;
    _resetViewport(): void;
    _flushInstances(): void;
    _dispose(): void;
    get context(): WebGL2RenderingContext;
    get state(): RenderState;
    get materialManager(): MaterialManager;
}
