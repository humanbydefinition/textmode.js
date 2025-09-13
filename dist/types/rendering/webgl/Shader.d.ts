import { GLFramebuffer } from './Framebuffer';
/**
 * Supported uniform value types
 */
type UniformValue = number | boolean | number[] | Float32Array | Int32Array | GLFramebuffer | WebGLTexture;
/**
 * WebGL implementation of the shader abstraction.
 * Provides GPU shader program management with automatic uniform handling.
 */
export declare class GLShader {
    private _gl;
    private _program;
    private _uniformLocations;
    private _uniformTypes;
    private _textureUnitCounter;
    private _maxTextureUnits;
    /**
     * Creates a new GLShader instance.
     * @param gl The WebGL rendering context.
     * @param vertexSource The source code for the vertex shader.
     * @param fragmentSource The source code for the fragment shader.
     * @ignore
     */
    constructor(gl: WebGLRenderingContext, vertexSource: string, fragmentSource: string);
    private _cacheLocations;
    private _createProgram;
    private _createShader;
    /**
     * Use this shader program
     */
    $use(): void;
    /**
     * Reset texture unit counter and other state
     */
    private _resetState;
    $setUniforms(uniforms: Record<string, UniformValue>): void;
    /**
     * Check if a uniform exists in this shader
     */
    $hasUniform(name: string): boolean;
    /**
     * Set a single uniform value with automatic texture unit management
     */
    $setUniform(name: string, value: UniformValue): void;
    private _getNextTextureUnit;
    /**
     * Get the WebGL program
     */
    get $glProgram(): WebGLProgram;
    /**
     * Dispose of WebGL resources used by this shader.
     * This method is idempotent and safe to call multiple times.
     */
    $dispose(): void;
}
export {};
