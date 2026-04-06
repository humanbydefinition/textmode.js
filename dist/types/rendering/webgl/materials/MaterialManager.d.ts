import type { Material } from './Material';
import { GLShader } from '../core/Shader';
import type { UniformValue } from '../types/UniformTypes';
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
    readonly _copyShader: GLShader;
    readonly _solidColorMaterial: Material;
    private _materialCache;
    constructor(gl: WebGL2RenderingContext);
    /**
     * Create a transient material that won't be cached.
     * Useful for one-off materials with dynamic uniforms that change every frame.
     *
     * @param shader - The shader program to use
     * @param uniforms - Uniform values to set
     * @returns A new material instance (not cached)
     */
    _createTransientMaterial(shader: GLShader, uniforms?: Record<string, UniformValue>): Material;
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
    _dispose(): void;
}
