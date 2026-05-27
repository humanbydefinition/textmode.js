import type { GLShader } from '../../rendering/webgl';
import type { UniformValue } from '../../rendering/webgl/types/UniformTypes';
declare module '../Textmodifier' {
    interface Textmodifier {
        /**
         * Set a custom shader for subsequent drawing operations.
         *
         * The shader persists until explicitly reset via {@link resetShader} or by calling `shader(null)`.
         * This behavior matches p5.js, allowing multiple draw calls with the same shader.
         *
         * @param shader Custom shader to use, or `null` to reset to the default shader.
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/shader/sketch.js}
         */
        shader(shader: GLShader | null): void;
        /**
         * Reset the current shader to the default solid color shader.
         *
         * This clears both the active shader and any accumulated uniforms set via {@link setUniform}.
         * Equivalent to calling `shader(null)`.
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/resetShader/sketch.js}
         */
        resetShader(): void;
        /**
         * Set a uniform value on the current custom shader.
         * @param name Uniform variable name.
         * @param value Uniform value.
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/setUniform/sketch.js}
         */
        setUniform(name: string, value: UniformValue): void;
        /**
         * Set multiple uniform values on the current custom shader.
         * @param uniforms Uniform name-value pairs.
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/setUniforms/sketch.js}
         */
        setUniforms(uniforms: Record<string, UniformValue>): void;
        /**
         * Create a custom filter shader from fragment shader source or a file path.
         * The fragment shader automatically receives the standard vertex shader inputs
         * and must output to the 3 MRT attachments (character/transform, primary color, secondary color).
         * @param fragmentSource Fragment shader source or file path (e.g. './shader.frag').
         * @returns A compiled shader ready for use with {@link shader}.
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/createFilterShader/sketch.js}
         */
        createFilterShader(fragmentSource: string): Promise<GLShader>;
        /**
         * Create a shader from vertex and fragment source, or from file paths.
         * @param vertexSource Vertex shader source or file path.
         * @param fragmentSource Fragment shader source or file path.
         * @returns The compiled shader.
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/createShader/sketch.js}
         */
        createShader(vertexSource: string, fragmentSource: string): Promise<GLShader>;
    }
}
