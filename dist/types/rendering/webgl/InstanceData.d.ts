/**
 * Core data structure representing a single instance in batched rendering.
 * Contains all necessary data for ASCII character rendering via MRT.
 */
export interface InstanceData {
    position: [number, number];
    size: [number, number];
    character: [number, number, number];
    primaryColor: [number, number, number, number];
    secondaryColor: [number, number, number, number];
    rotation: [number, number];
    transform: [number, number, number];
    globalRotationX: number;
    globalRotationY: number;
    globalRotationZ: number;
    rotationCenter: [number, number];
    arcAngles?: [number, number];
    bezierControlPoint1?: [number, number];
    bezierControlPoint2?: [number, number];
    bezierStartPoint?: [number, number];
    bezierEndPoint?: [number, number];
}
/**
 * Optimized packed instance data layout for GPU upload.
 * Designed for efficient WebGL attribute binding and minimal memory usage.
 *
 * Total size: 132 bytes per instance (with Arc + Bezier support)
 * Layout designed to minimize GPU bandwidth and maximize cache efficiency.
 */
export declare class PackedInstanceData {
    static readonly BYTES_PER_INSTANCE = 140;
    static readonly FLOATS_PER_INSTANCE = 35;
    /**
     * Pack instance data into a Float32Array for efficient GPU upload.
     * @param instance The instance data to pack
     * @param target Optional target array to write into (for reuse)
     * @param offset Offset in the target array to start writing
     * @returns Float32Array containing packed instance data
     */
    static $pack(instance: InstanceData, target?: Float32Array, offset?: number): Float32Array;
    /**
     * Pack multiple instances into a single Float32Array for batch upload.
     * @param instances Array of instance data to pack
     * @returns Float32Array containing all packed instance data
     */
    static $packBatch(instances: InstanceData[]): Float32Array;
}
/**
 * WebGL attribute configuration for instance data.
 * Defines how packed instance data maps to vertex shader attributes.
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
 * Pre-configured attribute layouts for efficient WebGL setup.
 */
export declare class InstanceAttributeLayout {
    static readonly STRIDE = 140;
    static readonly ATTRIBUTES: Record<string, InstanceAttributeConfig>;
}
