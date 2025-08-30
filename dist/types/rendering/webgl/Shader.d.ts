import { Shader, type UniformValue } from '../core/Shader';
/**
 * WebGL implementation of the shader abstraction.
 * Provides GPU shader program management with automatic uniform handling.
 */
export declare class GLShader extends Shader {
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
    /**
     * Factory method to create a shader from source object
     */
    static fromSource(gl: WebGLRenderingContext, source: {
        vertex: string;
        fragment: string;
    }): GLShader;
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
    $resetState(): void;
    /**
     * Set a single uniform value with automatic texture unit management
     */
    setUniform(name: string, value: UniformValue): void;
    private _getNextTextureUnit;
    /**
     * Check if a uniform is an integer type
     */
    private _isUniformInteger;
    /**
     * Get the WebGL program
     */
    get glProgram(): WebGLProgram;
    /**
     * Dispose of WebGL resources used by this shader.
     * This method is idempotent and safe to call multiple times.
     */
    $dispose(): void;
}
