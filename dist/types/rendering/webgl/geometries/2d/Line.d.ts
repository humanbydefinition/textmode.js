import type { InstanceBatch } from '../../batching/InstanceBatch';
import { type LineParams } from '../../types/GeometryTypes';
import { BaseGeometry } from '../BaseGeometry';
import type { IRenderState } from '../../state/RenderState';
/**
 * Instanced line geometry renderer.
 * Batches all line draw calls for efficient GPU rendering.
 */
export declare class Line extends BaseGeometry<LineParams> {
    constructor(gl: WebGL2RenderingContext, batch: InstanceBatch);
    _addInstance(params: LineParams, renderState: IRenderState): number;
}
