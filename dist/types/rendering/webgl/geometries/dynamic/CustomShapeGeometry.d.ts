import type { GeometryAttributeCache } from '../../batching/GeometryAttributeCache';
import type { GLShader } from '../../core/Shader';
import type { IRenderState } from '../../state/RenderState';
/**
 * Dynamic triangle-list geometry for beginShape()/endShape().
 */
export declare class CustomShapeGeometry {
    private readonly _gl;
    private readonly _buffer;
    private readonly _batch;
    private readonly _unitGeometry;
    private readonly _curveParams0;
    private readonly _curveParams1;
    private readonly _writeData;
    private _bufferGeneration;
    private _vertexCapacity;
    constructor(gl: WebGL2RenderingContext);
    _draw(shader: GLShader, vertices: Float32Array, vertexCount: number, renderState: IRenderState, attributeCache: GeometryAttributeCache): void;
    _dispose(): void;
    private _uploadVertices;
    private _writeInstance;
}
