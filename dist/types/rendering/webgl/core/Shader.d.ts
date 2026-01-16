import { GLFramebuffer } from './Framebuffer';
/**
 * Supported uniform value types
 */
export type UniformValue = number | boolean | number[] | number[][] | Float32Array | Int32Array | GLFramebuffer | WebGLTexture;
/**
 *
 * Shader class for managing WebGL shader programs initialized via {@link Textmodifier.createFilterShader} or {@link Textmodifier.createShader}.
 *
 * Use shaders and set uniforms via {@link Textmodifier.shader}, {@link Textmodifier.setUniform}, and {@link Textmodifier.setUniforms}.
 *
 * With a shader active, the next {@link Textmodifier.rect} call will use the shader for rendering,
 * and automatically unuse it afterwards.
 */
export declare class GLShader {
    private _gl;
    private _program;
    private _uniformLocations;
    private _uniformTypes;
    private _textureUnitCounter;
    private _textureUnitAssignments;
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
     * @ignore
     */
    $use(): void;
    /**
     * Reset texture unit counter and other state
     */
    private _resetState;
    /**
     * Set multiple uniform values at once.
     * @param uniforms An object mapping uniform names to their values.
     * @ignore
     */
    $setUniforms(uniforms: Record<string, any>): void;
    /**
     * Set a single uniform value with automatic texture unit management and proper type detection
     * @param name The name of the uniform variable in the shader
     * @param value The value to set for the uniform
     * @ignore
     */
    $setUniform(name: string, value: UniformValue): void;
    private _acquireTextureUnit;
    /**
     * Get the WebGL program
     */
    get program(): WebGLProgram;
    /**
     * Dispose of WebGL resources used by this shader.
     */
    dispose(): void;
}
