/**
 * Rendering pipeline interfaces and types
 */
import type { GLShader } from '../core/Shader';
/**
 * Render context containing shader and rendering configuration
 */
export interface RenderContext {
    shader: GLShader;
    gl: WebGL2RenderingContext;
    viewport: [number, number, number, number];
    cellWidth?: number;
    cellHeight?: number;
}
