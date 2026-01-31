/**
 * Core data structure representing a single instance in batched rendering.
 * Contains all necessary data for ASCII character rendering via MRT.
 */
export interface InstanceData {
    _position: [number, number];
    _size: [number, number];
    _character: [number, number, number];
    _charColor: [number, number, number, number];
    _cellColor: [number, number, number, number];
    _charRotation: number;
    _charTransform: [number, number, number];
    _translation: [number, number, number];
    _rotation: [number, number, number];
    _depth?: number;
    _baseZ?: number;
    _geometryType?: number;
    _arcAngles?: [number, number];
    _bezierControlPoint1?: [number, number];
    _bezierControlPoint2?: [number, number];
    _bezierStartPoint?: [number, number];
    _bezierEndPoint?: [number, number];
}
/**
 * Optimized packed instance data layout for GPU upload.
 * Designed for efficient WebGL attribute binding and minimal memory usage.
 *
 * Total size: 144 bytes per instance (with Arc + Bezier + Translation + 3D support + Geometry Type)
 */
export declare class PackedInstanceData {
    static readonly BYTES_PER_INSTANCE = 144;
    static readonly FLOATS_PER_INSTANCE = 36;
}
/**
 * WebGL attribute configuration for instance data.
 */
export interface InstanceAttributeConfig {
    location: number;
    size: number;
    type: number;
    normalized: boolean;
    stride: number;
    offset: number;
    divisor: number;
}
/**
 * Valid attribute names for instance data.
 */
export type InstanceAttributeName = 'a_offset' | 'a_scale' | 'a_glyphIndex' | 'a_glyphColor' | 'a_cellColor' | 'a_glyphFlags' | 'a_translation' | 'a_rotation' | 'a_geomParams0' | 'a_geomParams1' | 'a_geomDepthType';
/**
 * Pre-configured attribute layouts for efficient WebGL setup.
 */
export declare class InstanceAttributeLayout {
    static readonly STRIDE = 144;
    static readonly ATTRIBUTES: Record<InstanceAttributeName, InstanceAttributeConfig>;
}
