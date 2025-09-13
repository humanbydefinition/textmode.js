import type { IGeometry } from './types/GeometryTypes';
import { GeometryType } from './types/GeometryTypes';
import type { RenderContext } from './types/RenderTypes';
import type { DrawCommand } from './types/DrawCommand';
/**
 * Execute draw commands exactly in the order they were enqueued while
 * still batching consecutive commands of the same geometry type to minimize
 * state changes and buffer uploads.
 */
export declare class RenderPipeline {
    private readonly _vaoMgr;
    private readonly _gl;
    private _copyShader;
    private _tempRectFBO;
    private _tempRectFBOSize;
    constructor(gl: WebGL2RenderingContext);
    $execute(context: RenderContext, commands: Iterable<DrawCommand>, geometries: Map<GeometryType, IGeometry>): void;
    /** Immediate custom-rect draw using provided shader/uniforms; mirrors prior GLRenderer path */
    private _drawCustomRect;
    private _getCopyShader;
    private _getTempRectFBO;
}
