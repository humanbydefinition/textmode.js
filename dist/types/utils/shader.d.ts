/**
 * Resolves a shader source string.
 *
 * If the source appears to be a file path (starts with `./` or `../`, or ends with `.vert`, `.frag`, or `.glsl`),
 * it attempts to fetch the content from that URL.
 * Otherwise, it treats the string as raw GLSL source code.
 *
 * @param source The shader source string (path or code).
 * @returns A promise that resolves to the shader source code.
 * @throws Error if fetching the shader file fails.
 */
export declare function resolveShaderSource(source: string): Promise<string>;
