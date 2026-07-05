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
/**
 * Standard 3D mesh attribute descriptor.
 *
 * Layout: [position.xyz, texCoord.uv]
 * Stride: 20 bytes (5 floats)
 */
export declare const GEOMETRY_3D_UV_DESCRIPTOR: {
    readonly _stride: 20;
    readonly _attributes: {
        readonly _position: {
            readonly size: 3;
            readonly offset: 0;
        };
        readonly _texCoord: {
            readonly size: 2;
            readonly offset: 12;
        };
    };
};
/**
 * Torus mesh attribute descriptor.
 *
 * Layout: [cosU, sinU, cosV, sinV, texCoord.uv]
 * Stride: 24 bytes (6 floats)
 */
export declare const GEOMETRY_TORUS_DESCRIPTOR: {
    readonly _stride: 24;
    readonly _attributes: {
        readonly _position: {
            readonly size: 4;
            readonly offset: 0;
        };
        readonly _texCoord: {
            readonly size: 2;
            readonly offset: 16;
        };
    };
};
