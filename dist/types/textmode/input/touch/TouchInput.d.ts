import type { TextmodeCanvas } from '../../internal/TextmodeCanvas';
import type { MouseInput } from '../mouse/MouseInput';
import type { GridProvider } from '../../grid/TextmodeGrid';
import { InputEventEmitter } from '../core/InputEventEmitter';
import type { TouchEventMap, TouchPosition } from './types';
/**
 * Manages all touch interactions for a Textmodifier instance.
 * Handles event listeners, coordinate conversion, raw touch state, and event dispatching.
 */
export declare class TouchInput {
    private readonly _canvas;
    private readonly _mouseInput?;
    private readonly _getGrid;
    private readonly _gestureRecognizer;
    private _activeTouches;
    private _previousTouches;
    private _touchSessions;
    private readonly _originalTouchAction;
    private readonly _originalUserSelect;
    private readonly _listeners;
    private _areListenersSetup;
    /** Multi-listener event emitter */
    readonly _emitter: InputEventEmitter<TouchEventMap>;
    private readonly _mouseSuppressionDuration;
    /**
     * Create a new TouchInput.
     * @param canvas The canvas to track touch events on.
     * @param getGrid A function that returns the grid to use for coordinate calculations.
     * @param mouseInput Optional mouse input helper for suppressing mouse events during touch.
     */
    constructor(canvas: TextmodeCanvas, getGrid: GridProvider, mouseInput?: MouseInput);
    /** Install touch listeners onto the canvas */
    _setupListeners(): void;
    /** Remove all touch listeners */
    _cleanupListeners(): void;
    /**
     * Recalculate touch positions after grid size or offset changes.
     * Uses stored client coordinates to project touches into the new grid.
     */
    _updatePositions(): void;
    /** Retrieve a snapshot of all active touches */
    _getTouches(): TouchPosition[];
    private _handleTouchStart;
    private _handleTouchMove;
    private _handleTouchEnd;
    private _handleTouchCancel;
    private _mapTouchList;
    private _projectTouch;
    private _projectClientToGrid;
    private _buildTouchEventData;
    private _cloneTouchPosition;
}
