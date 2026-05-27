import type { GLShader } from '../core/Shader';
import type { UniformValue } from '../types/UniformTypes';
/**
 * Material defines how geometry should be rendered.
 * Combines a shader program with uniform parameters.
 *
 * Materials are immutable once created so batched draw commands can safely reuse them.
 */
export interface Material {
    readonly id: number;
    readonly shader: GLShader;
    readonly uniforms: Readonly<Record<string, UniformValue>>;
    /**
     * Whether this is a built-in system material (solid color, copy, etc.)
     * Built-in materials are never disposed when cleaning up user materials.
     */
    readonly isBuiltIn: boolean;
}
