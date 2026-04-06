import { Disposable } from '../../../utils/Disposable';
/**
 *
 * Shader class for managing WebGL shader programs initialized via {@link Textmodifier.createFilterShader} or {@link Textmodifier.createShader}.
 *
 * Use shaders and set uniforms via {@link Textmodifier.shader}, {@link Textmodifier.setUniform}, and {@link Textmodifier.setUniforms}.
 *
 * After using a custom shader, you can revert to the default textmode shader with {@link Textmodifier.resetShader}.
 */
export declare class GLShader extends Disposable {
    private _gl;
    private _program;
    private _uniformLocations;
    private _uniformTypes;
    private _uniformCache;
    private _textureUnitCounter;
    private _textureUnitAssignments;
    private _maxTextureUnits;
    private _cacheLocations;
    private _createProgram;
    private _createShader;
    /**
     * Reset texture unit counter and other state
     */
    private _resetState;
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
