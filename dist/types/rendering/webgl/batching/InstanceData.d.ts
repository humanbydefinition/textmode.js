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
