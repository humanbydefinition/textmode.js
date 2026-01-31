import { type IFramebuffer } from '../core/interfaces/IFramebuffer';
/**
 * Supported uniform value types
 */
export type UniformValue = number | boolean | number[] | number[][] | Float32Array | Int32Array | IFramebuffer | WebGLTexture;
/**
 * Type guard for UniformValue.
 * @param value The value to check.
 * @returns True if the value is a valid UniformValue.
 */
export declare function isUniformValue(value: unknown): value is UniformValue;
