import type { InstanceBatch } from '../../batching/InstanceBatch';
import type { GeometryType, Mesh3DParams } from '../../types/GeometryTypes';
import { BaseGeometry } from '../BaseGeometry';
import type { IRenderState } from '../../state/RenderState';
/**
 * Raw mesh data returned by geometry generators.
 */
interface MeshData {
    vertices: Float32Array;
    indices: Uint16Array;
}
/**
 * Generic instanced geometry for 3D mesh primitives (box, sphere, torus, etc.).
 *
 * All 3D mesh geometries share the same structure: a pre-generated unit mesh,
 * a geometry type enum, and an `_addInstance` that forwards width/height/depth.
 * This class eliminates the per-shape boilerplate by parameterising those differences.
 */
export declare class MeshGeometry<P extends Mesh3DParams = Mesh3DParams> extends BaseGeometry<P> {
    constructor(gl: WebGL2RenderingContext, batch: InstanceBatch, type: GeometryType, mesh: MeshData);
    _addInstance(params: P, renderState: IRenderState): number;
}
export {};
