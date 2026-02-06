/**
 * Update a WebGL texture from a canvas, video, or image source.
 * Handles binding, pixel storage, upload, and unbinding.
 *
 * @param gl WebGL2 rendering context
 * @param texture Target texture to update
 * @param source Source element to upload
 */
export declare function updateTextureFromSource(gl: WebGL2RenderingContext, texture: WebGLTexture, source: HTMLCanvasElement | HTMLVideoElement | HTMLImageElement): void;
/**
 * Create a new WebGL texture from a source element.
 * Sets default parameters (NEAREST/CLAMP) suitable for textmode pixel art.
 *
 * @param gl WebGL2 rendering context
 * @param source Source element to upload
 * @param minFilter Minification filter (default: gl.NEAREST)
 * @param magFilter Magnification filter (default: gl.NEAREST)
 * @param wrapS Horizontal wrapping mode (default: gl.CLAMP_TO_EDGE)
 * @param wrapT Vertical wrapping mode (default: gl.CLAMP_TO_EDGE)
 */
export declare function createTextureFromSource(gl: WebGL2RenderingContext, source: HTMLCanvasElement | HTMLVideoElement | HTMLImageElement, minFilter?: number, magFilter?: number, wrapS?: number, wrapT?: number): WebGLTexture;
/**
 * Create a texture from a source element and return both the texture and source dimensions.
 * Reduces duplication in higher-level helpers that need both values together.
 *
 * @param gl WebGL2 rendering context
 * @param source Source element to upload
 * @param minFilter Minification filter (default: gl.NEAREST)
 * @param magFilter Magnification filter (default: gl.NEAREST)
 * @param wrapS Horizontal wrapping mode (default: gl.CLAMP_TO_EDGE)
 * @param wrapT Vertical wrapping mode (default: gl.CLAMP_TO_EDGE)
 * @returns Object containing the texture and its source dimensions
 */
export declare function createTextureWithDimensions(gl: WebGL2RenderingContext, source: HTMLCanvasElement | HTMLVideoElement | HTMLImageElement, minFilter?: number, magFilter?: number, wrapS?: number, wrapT?: number): {
    texture: WebGLTexture;
    width: number;
    height: number;
};
/**
 * Configure texture parameters for filtering and wrapping modes.
 * Must be called with texture already bound to gl.TEXTURE_2D.
 *
 * @param gl WebGL2 rendering context
 * @param minFilter Minification filter (gl.NEAREST or gl.LINEAR)
 * @param magFilter Magnification filter (gl.NEAREST or gl.LINEAR)
 * @param wrapS Horizontal wrapping mode (gl.CLAMP_TO_EDGE or gl.REPEAT)
 * @param wrapT Vertical wrapping mode (gl.CLAMP_TO_EDGE or gl.REPEAT)
 */
export declare function setTextureParameters(gl: WebGL2RenderingContext, minFilter: number, magFilter: number, wrapS: number, wrapT: number): void;
/**
 * Configure a vertex attribute with pointer and divisor settings.
 * Handles enable, pointer setup, and divisor configuration in one call.
 *
 * @param gl WebGL2 rendering context
 * @param location Attribute location from shader
 * @param size Number of components per vertex attribute (1-4)
 * @param stride Byte offset between consecutive vertex attributes
 * @param offset Byte offset of the first component in the buffer
 * @param divisor Number of instances that will pass between updates (0 = per-vertex, 1 = per-instance)
 * @param type Data type (default: gl.FLOAT)
 * @param normalized Whether integer data should be normalized (default: false)
 */
export declare function setupVertexAttribute(gl: WebGL2RenderingContext, location: number, size: number, stride: number, offset: number, divisor?: number, type?: number, normalized?: boolean): void;
/**
 * Allocate or upload data to a buffer (bind → bufferData → unbind pattern).
 * Ensures proper binding/unbinding sequence for safe buffer operations.
 *
 * @param gl WebGL2 rendering context
 * @param target Buffer binding point (gl.ARRAY_BUFFER or gl.ELEMENT_ARRAY_BUFFER)
 * @param buffer Target buffer to bind
 * @param data Data to upload, or size in bytes for allocation
 * @param usage Usage hint (gl.STATIC_DRAW, gl.DYNAMIC_DRAW, etc.)
 */
export declare function uploadBufferData(gl: WebGL2RenderingContext, target: number, buffer: WebGLBuffer, data: AllowSharedBufferSource | number, usage: number): void;
/**
 * Extract dimensions from a source element (Image, Canvas, or Video).
 * Handles differences in property names (naturalWidth vs width vs videoWidth).
 *
 * @param source The source element
 * @returns Object containing width and height
 */
export declare function getSourceDimensions(source: HTMLImageElement | HTMLCanvasElement | HTMLVideoElement): {
    width: number;
    height: number;
};
