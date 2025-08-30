/**
 * Core shader abstractions for textmode.js rendering system.
 * Provides base classes and interfaces for WebGL and future WebGPU shader implementations.
 */
import type { IFramebuffer } from './Framebuffer';
/**
 * Supported uniform value types
 */
export type UniformValue = number | boolean | number[] | Float32Array | Int32Array | IFramebuffer;
/**
 * Core interface that all shader implementations must satisfy.
 * Defines the contract for shader programs across different graphics APIs.
 * @ignore
 */
export interface IShader {
    /** Whether the shader is currently compiled and ready to use */
    readonly isReady: boolean;
    /**
     * Activate this shader for rendering.
     * Makes this shader the active program for subsequent draw calls.
     * @ignore
     */
    $use(): void;
    /**
     * Set a uniform value by name.
     * @param name Name of the uniform
     * @param value Value to set
     */
    setUniform(name: string, value: UniformValue): void;
    /**
     * Set multiple uniforms at once.
     * @param uniforms Object containing uniform name-value pairs
     */
    setUniforms(uniforms: Record<string, UniformValue>): void;
    /**
     * Reset internal state (texture units, etc.) for a new frame.
     * @ignore
     */
    $resetState(): void;
    /**
     * Dispose of resources used by this shader.
     * After calling this method, the shader should not be used.
     * @ignore
     */
    $dispose(): void;
}
/**
 * Abstract base class for shader implementations.
 */
export declare abstract class Shader implements IShader {
    protected _isReady: boolean;
    protected constructor();
    get isReady(): boolean;
    setUniforms(uniforms: Record<string, UniformValue>): void;
    abstract $use(): void;
    abstract setUniform(name: string, value: UniformValue): void;
    abstract $resetState(): void;
    abstract $dispose(): void;
}
