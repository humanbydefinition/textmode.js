/**
 * Geometry generation utilities for 2D shapes.
 * 2D geometries use 4 floats per vertex: position.xy + texCoord.uv
 */
/**
 * Generate 2D circle/ellipse vertices.
 */
export declare function generateCircleVertices(segments?: number): Float32Array;
/**
 * Generate unit arc vertices for 2D arc rendering.
 */
export declare function generateArcVertices(segments: number): Float32Array;
/**
 * Generate bezier curve geometry (multi-segment for GPU evaluation).
 */
export declare function generateBezierVertices(segments?: number): Float32Array;
/**
 * Generate indexed unit box mesh.
 * Vertex layout: [x, y, z, 0] where z is packed into a_texCoord.x in the vertex shader.
 */
export declare function generateBoxMesh(): {
    vertices: Float32Array;
    indices: Uint16Array;
};
/**
 * Generate indexed unit UV sphere mesh.
 * Vertex layout: [x, y, z, 0].
 */
export declare function generateSphereMesh(latSegments?: number, lonSegments?: number): {
    vertices: Float32Array;
    indices: Uint16Array;
};
/**
 * Generate indexed unit torus mesh.
 * Vertex layout: [cos(u), sin(u), cos(v), sin(v)].
 * Packed angular basis allows per-instance radius/tubeRadius deformation in the vertex shader.
 */
export declare function generateTorusMesh(radialSegments?: number, tubularSegments?: number): {
    vertices: Float32Array;
    indices: Uint16Array;
};
/**
 * Generate indexed unit cone mesh.
 * Vertex layout: [x, y, z, 0].
 */
export declare function generateConeMesh(segments?: number): {
    vertices: Float32Array;
    indices: Uint16Array;
};
/**
 * Generate indexed unit cylinder mesh.
 * Vertex layout: [x, y, z, 0].
 */
export declare function generateCylinderMesh(segments?: number): {
    vertices: Float32Array;
    indices: Uint16Array;
};
