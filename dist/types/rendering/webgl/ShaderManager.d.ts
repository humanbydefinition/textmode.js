import { GLShader } from './Shader';
/**
 * Registry keys for built-in shaders
 */
export declare enum BuiltInShader {
    MRT_DRAW = "mrt-draw",
    MRT_COPY = "mrt-copy",
    ASCII_CONVERSION = "ascii-conversion",
    IMAGE_TO_MRT = "image-to-mrt"
}
/**
 * Centralized shader management system for textmode.js
 *
 * Provides a registry pattern for managing shared shaders, eliminating
 * duplication and providing a single source of truth for shader lifecycle.
 *
 * Key benefits:
 * - Eliminates shader duplication (especially copy shader)
 * - Centralizes vertex shader imports
 * - Provides lazy initialization
 * - Supports future extensibility (shader variants, hot-reloading)
 * - Consistent resource management
 */
export declare class ShaderManager {
    private _gl;
    private _copyShader;
    private _mainDrawShader;
    private _conversionShader;
    private _imageToMRTShader;
    constructor(gl: WebGL2RenderingContext);
    /**
     * Get the shared MRT copy shader used for framebuffer compositing
     * This shader handles copying 5-attachment MRT data with proper transparency
     */
    $getCopyShader(): GLShader;
    /**
     * Get the main MRT draw shader used for standard geometry rendering
     * This shader outputs to all 5 MRT attachments for textmode rendering
     */
    $getMainDrawShader(): GLShader;
    /**
     * Get the ASCII conversion shader used for final display output
     * This shader converts MRT data to final ASCII characters
     */
    $getConversionShader(): GLShader;
    /**
     * Get the shader that converts a single RGBA texture into MRT attachments.
     * It writes brightness into o_character and grayscale into o_primaryColor.
     */
    $getImageToMRTShader(): GLShader;
    /**
     * Create a custom filter shader using the standard instanced vertex shader
     * These shaders are not cached as they are user-specific
     */
    $createFilterShader(fragmentSource: string): GLShader;
    /**
     * Create a custom shader with arbitrary vertex and fragment sources
     * These shaders are not cached as they are user-specific
     */
    $createShader(vertexSource: string, fragmentSource: string): GLShader;
    /**
     * Dispose of all managed shaders and clear the registry
     * This method is idempotent and safe to call multiple times
     */
    $dispose(): void;
}
