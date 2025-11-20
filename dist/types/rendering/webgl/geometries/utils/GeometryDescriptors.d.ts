/**
 * Shared geometry attribute descriptors to eliminate redundant definitions.
 * All geometries of the same dimensionality (2D/3D) share identical stride and attribute layouts.
 */
/**
 * Unit quad vertex data used by both instanced and immediate quad rendering.
 * Format: [x, y, u, v] for each vertex (position + texCoord interleaved)
 * Layout: Two triangles forming a unit square centered at origin from (-0.5,-0.5) to (0.5,0.5)
 */
export declare const UNIT_QUAD: Float32Array<ArrayBuffer>;
/**
 * Standard 2D geometry attribute descriptor.
 * Used by: Rectangle, Line, Ellipse, Triangle, Arc, BezierCurve
 *
 * Layout: [position.xy, texCoord.uv]
 * Stride: 16 bytes (4 floats)
 */
export declare const GEOMETRY_2D_DESCRIPTOR: {
    readonly _stride: 16;
    readonly _primitiveType: 4;
    readonly _attributes: {
        readonly _position: {
            readonly size: 2;
            readonly offset: 0;
        };
        readonly _texCoord: {
            readonly size: 2;
            readonly offset: 8;
        };
    };
};
