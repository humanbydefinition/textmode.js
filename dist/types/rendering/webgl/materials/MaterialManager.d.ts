import type { Material } from './Material';
import { GLShader } from '../core/Shader';
import type { UniformValue } from '../types/UniformTypes';
/**
 * Owns built-in rendering shaders and creates materials for batched draws.
 */
export declare class MaterialManager {
    private _nextMaterialId;
    private readonly _shader;
    readonly _copyShader: GLShader;
    readonly _solidColorMaterial: Material;
    constructor(gl: WebGL2RenderingContext);
    /**
     * Create a transient material.
     * Useful for one-off materials with dynamic uniforms that change every frame.
     *
     * @param shader - The shader program to use
     * @param uniforms - Uniform values to set
     * @returns A new material instance
     */
    _createTransientMaterial(shader: GLShader, uniforms?: Record<string, UniformValue>): Material;
    /**
     * Dispose of all shaders and materials managed by this manager.
     */
    _dispose(): void;
}
