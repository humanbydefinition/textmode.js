import { RenderState } from '../state/RenderState';
import type { DrawCommand } from '../types/DrawCommand';
import type { Material } from '../materials/Material';
import type { RectangleParams, LineParams, EllipseParams, ArcParams, TriangleParams, BezierCurveParams, Mesh3DParams, Mesh3DGeometryType } from '../types/GeometryTypes';
/**
 * Global draw queue preserving user-issued draw order across geometry types.
 *
 * Performance optimizations:
 * - Object pooling: Command slots are reused across frames to eliminate allocations
 * - Direct property assignment: Maintains V8 hidden classes for optimal JIT performance
 * - Type-specific enqueue methods: Eliminates conditional branching
 */
export declare class DrawQueue implements Iterable<DrawCommand> {
    private _commands;
    private _nextId;
    private _size;
    /** Reserve or reuse a pooled slot */
    private _acquireSlot;
    /**
     * Enqueue a rectangle draw command.
     * Zero-allocation in steady state (reuses pooled slots).
     * Direct property assignment preserves V8 hidden classes for optimal performance.
     *
     * @param params Rectangle parameters
     * @param renderState Current render state
     * @param material Material to use for rendering
     * @returns Command ID
     */
    _enqueueRectangle(params: RectangleParams, renderState: RenderState, material: Material): number;
    /**
     * Enqueue a line draw command.
     * Zero-allocation in steady state (reuses pooled slots).
     * Direct property assignment preserves V8 hidden classes for optimal performance.
     *
     * @param params Line parameters
     * @param renderState Current render state
     * @param material Material to use for rendering
     * @returns Command ID
     */
    _enqueueLine(params: LineParams, renderState: RenderState, material: Material): number;
    /**
     * Enqueue an ellipse draw command.
     * Zero-allocation in steady state (reuses pooled slots).
     * Direct property assignment preserves V8 hidden classes for optimal performance.
     *
     * @param params Ellipse parameters
     * @param renderState Current render state
     * @param material Material to use for rendering
     * @returns Command ID
     */
    _enqueueEllipse(params: EllipseParams, renderState: RenderState, material: Material): number;
    /**
     * Enqueue an arc draw command.
     * Zero-allocation in steady state (reuses pooled slots).
     * Direct property assignment preserves V8 hidden classes for optimal performance.
     *
     * @param params Arc parameters
     * @param renderState Current render state
     * @param material Material to use for rendering
     * @returns Command ID
     */
    _enqueueArc(params: ArcParams, renderState: RenderState, material: Material): number;
    /**
     * Enqueue a triangle draw command.
     * Zero-allocation in steady state (reuses pooled slots).
     * Direct property assignment preserves V8 hidden classes for optimal performance.
     *
     * @param params Triangle parameters
     * @param renderState Current render state
     * @param material Material to use for rendering
     * @returns Command ID
     */
    _enqueueTriangle(params: TriangleParams, renderState: RenderState, material: Material): number;
    /**
     * Enqueue a bezier curve draw command.
     * Zero-allocation in steady state (reuses pooled slots).
     * Direct property assignment preserves V8 hidden classes for optimal performance.
     *
     * @param params Bezier curve parameters
     * @param renderState Current render state
     * @param material Material to use for rendering
     * @returns Command ID
     */
    _enqueueBezierCurve(params: BezierCurveParams, renderState: RenderState, material: Material): number;
    /**
     * Enqueue a 3D mesh geometry draw command (box, sphere, torus, cone, cylinder, ellipsoid).
     * All 3D mesh types share the same params shape and enqueue logic.
     */
    _enqueue3D(type: Mesh3DGeometryType, params: Mesh3DParams, renderState: RenderState, material: Material): number;
    /** Clear all queued commands */
    _clear(): void;
    /** Iterate in the exact order of insertion */
    [Symbol.iterator](): Iterator<DrawCommand>;
}
