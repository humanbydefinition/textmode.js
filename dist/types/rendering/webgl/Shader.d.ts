/**
 * Shader program wrapper with simplified uniform management
 */
export declare class Shader {
    private gl;
    private program;
    private uniformLocations;
    private attributeLocations;
    private textureUnitCounter;
    constructor(gl: WebGLRenderingContext, vertexSource: string, fragmentSource: string);
    private createProgram;
    private createShader;
    private cacheLocations;
    /**
     * Use this shader program
     */
    use(): void;
    /**
     * Set a single uniform value with automatic texture unit management
     */
    setUniform(name: string, value: any): void;
    private getNextTextureUnit;
    /**
     * Reset texture unit counter (useful when starting a new frame)
     */
    resetTextureUnits(): void;
}
