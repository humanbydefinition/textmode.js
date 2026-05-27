import type { GLFramebuffer } from '../../rendering/webgl/core/Framebuffer.ts';
import type { GLRenderer } from '../../rendering/webgl/core/Renderer.ts';
/**
 * Shared canvas and framebuffer storage for glyph atlas builders.
 */
export declare class CanvasAtlasSurface {
    readonly _canvas: HTMLCanvasElement;
    readonly _context: CanvasRenderingContext2D;
    _framebuffer: GLFramebuffer | null;
    _columns: number;
    _rows: number;
    _renderer: GLRenderer;
    _width: number;
    _height: number;
    constructor(renderer: GLRenderer);
    _prepare(characterCount: number, cellWidth: number, cellHeight: number): void;
    _upload(): void;
    _dispose(): void;
}
