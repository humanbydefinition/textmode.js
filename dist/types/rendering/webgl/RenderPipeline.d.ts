import type { IGeometry } from './types/GeometryTypes';
import { GeometryType } from './types/GeometryTypes';
import type { RenderContext } from './types/RenderTypes';
import type { DrawCommand } from './types/DrawCommand';
import { GLShader } from './Shader';
interface IShaderProvider {
    $getCopyShader(): GLShader;
}
/**
 * Execute draw commands exactly in the order they were enqueued while
 * still batching consecutive commands of the same geometry type to minimize
 * state changes and buffer uploads.
 */
export declare class RenderPipeline {
    private readonly _vaoMgr;
    private readonly _gl;
    private readonly _renderer;
    private _tempRectFBO;
    private _tempRectFBOSize;
    constructor(gl: WebGL2RenderingContext, renderer: IShaderProvider);
    $execute(context: RenderContext, commands: Iterable<DrawCommand>, geometries: Map<GeometryType, IGeometry>): void;
    /** Execute a custom-shaded rectangle using provided shader/uniforms */
    private _drawCustomRect;
    /** Draw a rectangle with the specified shader, uniforms, and viewport handling */
    private _drawRectangleWithShader;
    private _getCopyShader;
    private _getTempRectFBO;
    $dispose(): void;
}
export {};
