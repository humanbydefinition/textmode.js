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
