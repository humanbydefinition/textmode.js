import type { Material, UniformValue } from './Material';
import { GLShader } from '../core/Shader';
/**
 * Manages material creation, deduplication, and lifecycle.
 *
 * Provides:
 * - Material creation with automatic deduplication
 * - Built-in materials (solid color, copy, image-to-MRT)
 * - Transient materials for dynamic uniforms
 * - Built-in shader management (2D/3D instanced shaders)
 *
 * Performance optimizations:
 * - Material interning: identical materials share the same instance
 * - Hash-based lookup for O(1) deduplication
 * - Separate tracking of user vs built-in materials
 */
export declare class MaterialManager {
    private _nextMaterialId;
    private readonly _shader;
    private readonly _solidColorMaterial;
    private _materialCache;
    constructor(gl: WebGL2RenderingContext);
    /**
     * Get the default 2D solid-color material.
     * This material uses the standard instanced MRT shader with per-instance colors.
     */
    get $solidColorMaterial(): Material;
    /**
     * Create a new material or return an existing one with identical properties.
     *
     * Materials are deduplicated based on shader and uniform values.
     * If a material with the same shader and uniforms already exists, it will be reused.
     *
     * @param shader - The shader program to use
     * @param uniforms - Uniform values to set (will be frozen for immutability)
     * @param isBuiltIn - Whether this is a built-in system material
     * @returns A material instance (new or deduplicated)
     */
    $createMaterial(shader: GLShader, uniforms?: Record<string, UniformValue>, isBuiltIn?: boolean): Material;
    /**
     * Create a transient material that won't be cached.
     * Useful for one-off materials with dynamic uniforms that change every frame.
     *
     * @param shader - The shader program to use
     * @param uniforms - Uniform values to set
     * @returns A new material instance (not cached)
     */
    $createTransientMaterial(shader: GLShader, uniforms?: Record<string, UniformValue>): Material;
    /**
     * Compute a hash for a shader + uniforms combination.
     * Used for material deduplication.
     */
    private _computeHash;
    /**
     * Hash a single uniform value based on its type.
     */
    private _hashUniformValue;
    /**
     * Dispose of all shaders and materials managed by this manager.
     */
    $dispose(): void;
}
