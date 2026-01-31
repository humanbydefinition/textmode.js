/**
 * Rendering pipeline interfaces and types
 */
import type { GLShader } from '../core/Shader';
/**
 * A tuple representing a viewport [x, y, width, height].
 */
export type Viewport = [number, number, number, number];
/**
 * Render context containing shader and rendering configuration
 */
export interface RenderContext {
    shader: GLShader;
    gl: WebGL2RenderingContext;
    viewport: Viewport;
    cellWidth?: number;
    cellHeight?: number;
}
