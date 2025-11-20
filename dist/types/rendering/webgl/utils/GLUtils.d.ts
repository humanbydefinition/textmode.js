/**
 * Update a WebGL texture from a canvas or video source.
 * Handles binding, pixel storage, upload, and unbinding.
 *
 * @param gl WebGL2 rendering context
 * @param texture Target texture to update
 * @param source Canvas or video element to upload
 */
export declare function updateTextureFromSource(gl: WebGL2RenderingContext, texture: WebGLTexture, source: HTMLCanvasElement | HTMLVideoElement): void;
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
