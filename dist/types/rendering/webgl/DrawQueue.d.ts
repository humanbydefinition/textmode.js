import type { RenderState } from './RenderState';
import type { GLShader } from './Shader';
import type { DrawCommand } from './types/DrawCommand';
/**
 * Global draw queue preserving user-issued draw order across geometry types.
 */
export declare class DrawQueue implements Iterable<DrawCommand> {
    private _commands;
    private _nextId;
    private _size;
    /** Reserve or reuse a pooled slot */
    private _acquireSlot;
    /** Specialized enqueues (zero-alloc on steady state) */
    $enqueueRectangle(x: number, y: number, width: number, height: number, renderState: RenderState): number;
    /** Enqueue a custom-shaded rectangle preserving order */
    $enqueueCustomRect(x: number, y: number, width: number, height: number, shader: GLShader, uniforms: Record<string, any>, renderState: RenderState): number;
    $enqueueLine(x1: number, y1: number, x2: number, y2: number, thickness: number | undefined, renderState: RenderState): number;
    $enqueueEllipse(x: number, y: number, width: number, height: number, renderState: RenderState): number;
    $enqueueArc(x: number, y: number, width: number, height: number, start: number, stop: number, renderState: RenderState): number;
    $enqueueTriangle(x1: number, y1: number, x2: number, y2: number, x3: number, y3: number, renderState: RenderState): number;
    $enqueueBezierCurve(x1: number, y1: number, cp1x: number, cp1y: number, cp2x: number, cp2y: number, x2: number, y2: number, thickness: number | undefined, renderState: RenderState): number;
    /** Number of queued commands */
    get length(): number;
    /** True if no commands queued */
    get isEmpty(): boolean;
    /** Clear all queued commands */
    $clear(): void;
    /** Iterate in the exact order of insertion */
    [Symbol.iterator](): Iterator<DrawCommand>;
}
