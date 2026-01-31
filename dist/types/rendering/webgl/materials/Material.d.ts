import type { GLShader } from '../core/Shader';
import type { UniformValue } from '../types/UniformTypes';
/**
 * Material defines how geometry should be rendered.
 * Combines a shader program with uniform parameters.
 *
 * Materials are immutable once created to enable safe deduplication and caching.
 */
export interface Material {
    /** Unique material identifier for fast comparison */
    readonly id: number;
    /** The shader program to use for rendering */
    readonly shader: GLShader;
    /** Uniform values to set when using this material (immutable) */
    readonly uniforms: Readonly<Record<string, UniformValue>>;
    /** Hash for fast material comparison and deduplication */
    readonly hash: number;
    /**
     * Whether this is a built-in system material (solid color, copy, etc.)
     * Built-in materials are never disposed when cleaning up user materials.
     */
    readonly isBuiltIn: boolean;
}
