import { RenderState } from '../state/RenderState';
import type { DrawCommand } from '../types/DrawCommand';
import type { Material } from '../materials/Material';
import type { Mesh3DGeometryType } from '../types/GeometryTypes';
/**
 * Global draw queue preserving user-issued draw order across geometry types.
 *
 * Command slots are reused across frames and updated by direct property assignment
 * to keep the steady-state enqueue path allocation-free.
 */
export declare class DrawQueue implements Iterable<DrawCommand> {
    private _commands;
    private _nextId;
    private _size;
    private _acquireSlot;
    /**
     * Enqueue a rectangle draw command.
     * Zero-allocation in steady state (reuses pooled slots).
     *
     * @param width Rectangle width
     * @param height Rectangle height
     * @param renderState Current render state
     * @param material Material to use for rendering
     * @returns Command ID
     */
    _enqueueRectangle(width: number, height: number, renderState: RenderState, material: Material): number;
    /**
     * Enqueue a line draw command.
     * Zero-allocation in steady state (reuses pooled slots).
     *
     * @param x1 Line start x
     * @param y1 Line start y
     * @param x2 Line end x
     * @param y2 Line end y
     * @param renderState Current render state
     * @param material Material to use for rendering
     * @returns Command ID
     */
    _enqueueLine(x1: number, y1: number, x2: number, y2: number, renderState: RenderState, material: Material): number;
    /**
     * Enqueue an ellipse draw command.
     * Zero-allocation in steady state (reuses pooled slots).
     *
     * @param width Ellipse width
     * @param height Ellipse height
     * @param renderState Current render state
     * @param material Material to use for rendering
     * @returns Command ID
     */
    _enqueueEllipse(width: number, height: number, renderState: RenderState, material: Material): number;
    /**
     * Enqueue an arc draw command.
     * Zero-allocation in steady state (reuses pooled slots).
     *
     * @param width Arc width
     * @param height Arc height
     * @param start Arc start angle in degrees
     * @param stop Arc stop angle in degrees
     * @param renderState Current render state
     * @param material Material to use for rendering
     * @returns Command ID
     */
    _enqueueArc(width: number, height: number, start: number, stop: number, renderState: RenderState, material: Material): number;
    /**
     * Enqueue a triangle draw command.
     * Zero-allocation in steady state (reuses pooled slots).
     *
     * @param x1 First point x
     * @param y1 First point y
     * @param x2 Second point x
     * @param y2 Second point y
     * @param x3 Third point x
     * @param y3 Third point y
     * @param renderState Current render state
     * @param material Material to use for rendering
     * @returns Command ID
     */
    _enqueueTriangle(x1: number, y1: number, x2: number, y2: number, x3: number, y3: number, renderState: RenderState, material: Material): number;
    /**
     * Enqueue a bezier curve draw command.
     * Zero-allocation in steady state (reuses pooled slots).
     *
     * @param x1 Start point x
     * @param y1 Start point y
     * @param cp1x First control point x
     * @param cp1y First control point y
     * @param cp2x Second control point x
     * @param cp2y Second control point y
     * @param x2 End point x
     * @param y2 End point y
     * @param renderState Current render state
     * @param material Material to use for rendering
     * @returns Command ID
     */
    _enqueueBezierCurve(x1: number, y1: number, cp1x: number, cp1y: number, cp2x: number, cp2y: number, x2: number, y2: number, renderState: RenderState, material: Material): number;
    /**
     * Enqueue a 3D mesh geometry draw command (box, sphere, torus, cone, cylinder, ellipsoid).
     * All 3D mesh types share the same params shape and enqueue logic.
     */
    _enqueue3D(type: Mesh3DGeometryType, width: number, height: number, depth: number, renderState: RenderState, material: Material): number;
    /** Clear all queued commands */
    _clear(): void;
    /** Iterate in the exact order of insertion */
    [Symbol.iterator](): Iterator<DrawCommand>;
}
