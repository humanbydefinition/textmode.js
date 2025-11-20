/**
 * Core interfaces and types for the instanced geometry system
 */
import type { InstanceBatch } from '../batching/InstanceBatch';
/**
 * Geometry types supported by the instanced rendering system
 */
export declare enum GeometryType {
    RECTANGLE = "rectangle",
    LINE = "line",
    ELLIPSE = "ellipse",
    ARC = "arc",
    TRIANGLE = "triangle",
    BEZIER_CURVE = "bezier_curve"
}
/**
 * Mapping from GeometryType to numeric shader constant.
 * Must match the constants defined in instanced.vert:
 * - GEOMETRY_TYPE_FLAT = 2 (rectangle, line, ellipse, triangle)
 * - GEOMETRY_TYPE_ARC = 3
 * - GEOMETRY_TYPE_BEZIER = 4
 */
export declare const GEOMETRY_TYPE_ID: Record<GeometryType, number>;
/**
 * Unit geometry vertex data for a specific geometry type
 */
export interface UnitGeometryData {
    /** Vertex data as Float32Array (position + texCoord interleaved) */
    _vertices: Float32Array;
    /** Number of vertices in the geometry */
    _vertexCount: number;
    /** WebGL primitive type (gl.TRIANGLES, gl.LINES, etc.) */
    _primitiveType: number;
    /** Stride in bytes between vertices */
    _stride: number;
    /** Attribute configuration for position and texCoord */
    _attributes: {
        _position: {
            size: number;
            offset: number;
        };
        _texCoord: {
            size: number;
            offset: number;
        };
    };
}
/**
 * Interface for instanced geometry implementations
 */
export interface IGeometry {
    /** The geometry type identifier */
    readonly type: GeometryType;
    /** The unit geometry data for this geometry type */
    readonly unitGeometry: UnitGeometryData;
    /** The instance batch for managing instances of this geometry */
    readonly batch: InstanceBatch;
    /**
     * Add a new instance of this geometry to the batch
     * @param params Geometry-specific parameters
     * @param renderState Current render state
     * @returns Index of the added instance
     */
    $addInstance(params: any, renderState: any): number;
    /**
     * Clear all instances from the batch
     */
    $clearInstances(): void;
    /**
     * Check if the geometry has any instances to render
     */
    $hasInstances(): boolean;
    /**
     * Dispose of geometry resources
     */
    $dispose(): void;
}
/**
 * Parameters for rectangle geometry
 */
export interface RectangleParams {
    width: number;
    height: number;
}
/**
 * Parameters for line geometry
 */
export interface LineParams {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    thickness?: number;
}
/**
 * Parameters for ellipse geometry
 */
export interface EllipseParams {
    width: number;
    height: number;
    startAngle?: number;
    endAngle?: number;
    segments?: number;
}
/**
 * Parameters for arc geometry (filled pie segment)
 * Angles are specified in DEGREES and arcs are drawn clockwise from start to stop.
 */
export interface ArcParams {
    width: number;
    height: number;
    start: number;
    stop: number;
}
/**
 * Parameters for triangle geometry
 */
export interface TriangleParams {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    x3: number;
    y3: number;
}
/**
 * Parameters for bezier curve geometry
 */
export interface BezierCurveParams {
    x1: number;
    y1: number;
    cp1x: number;
    cp1y: number;
    cp2x: number;
    cp2y: number;
    x2: number;
    y2: number;
    thickness?: number;
    segments?: number;
}
/**
 * Union type for all geometry parameters
 */
export type GeometryParams = RectangleParams | LineParams | EllipseParams | ArcParams | TriangleParams | BezierCurveParams;
