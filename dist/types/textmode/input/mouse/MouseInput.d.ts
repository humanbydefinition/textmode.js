import type { TextmodeCanvas } from '../../internal/TextmodeCanvas';
import type { GridProvider } from '../../grid/TextmodeGrid';
import { InputEventEmitter } from '../core/InputEventEmitter';
import type { MouseEventMap, MousePosition } from './types';
/**
 * Manages all mouse interaction for a Textmodifier instance.
 * Handles event listeners, coordinate conversion, and event dispatching.
 */
export declare class MouseInput {
    private _canvas;
    private _getGrid;
    private _mousePosition;
    private _previousMousePosition;
    private _previousFrameMousePosition;
    private _currentFrameMousePosition;
    private _currentFrameMovement;
    private _pendingFrameMovement;
    private _isPressed;
    private _lastClientCoordinates;
    private _suppressUntil;
    private readonly _listeners;
    private _areListenersSetup;
    /** Multi-listener event emitter */
    readonly _emitter: InputEventEmitter<MouseEventMap>;
    /**
     * Create a new MouseInput.
     * @param canvas The canvas to track mouse events on.
     * @param getGrid A function that returns the grid to use for coordinate calculations.
     */
    constructor(canvas: TextmodeCanvas, getGrid: GridProvider);
    /**
     * Temporarily suppress mouse event callbacks for a duration in milliseconds.
     * Used to prevent synthetic mouse events from touch interactions from firing twice.
     */
    _suppressEventsFor(durationMs: number): void;
    private _isSuppressed;
    /**
     * Set the CSS cursor for the textmode canvas.
     * Pass a valid CSS cursor value (e.g. 'pointer', 'crosshair', 'move', 'nwse-resize', 'none').
     * Call with no argument or an empty string to reset to the default cursor.
     *
     * Reference: https://developer.mozilla.org/en-US/docs/Web/CSS/cursor
     */
    _setCursor(cursor?: string): void;
    /**
     * Request pointer lock for the textmode canvas.
     * @returns `true` if the request API exists and the request was initiated, otherwise `false`.
     */
    _requestPointerLock(): boolean;
    /**
     * Exit pointer lock if this canvas currently owns it.
     */
    _exitPointerLock(): void;
    /**
     * Setup mouse event listeners on the canvas.
     */
    _setupListeners(): void;
    /**
     * Remove mouse event listeners from the canvas.
     */
    _cleanupListeners(): void;
    /**
     * Force an immediate update of the mouse position.
     * This is useful when grid dimensions change (font size, window resize, etc.)
     * and we need to recalculate the mouse coordinates without waiting for a mouse event.
     */
    _updatePositions(): void;
    /**
     * Get the current mouse position in grid coordinates.
     * Returns a copy to prevent external modification.
     */
    _getPosition(): MousePosition;
    /**
     * Get the mouse position from the previous rendered frame.
     * Returns a copy to prevent external modification.
     */
    _getPreviousFramePosition(): MousePosition;
    /**
     * Get the horizontal mouse movement accumulated since the previous rendered frame.
     */
    _getMovedX(): number;
    /**
     * Get the vertical mouse movement accumulated since the previous rendered frame.
     */
    _getMovedY(): number;
    /**
     * Get whether any mouse button is currently pressed for this canvas interaction session.
     */
    _getIsPressed(): boolean;
    /**
     * Snapshot the current mouse position for frame-synced polling APIs like `pmouse`.
     * Should be called exactly once at the start of each rendered frame.
     */
    _syncFrameState(): void;
    /**
     * Create normalized mouse event data.
     */
    private _createEventData;
    /**
     * Handle mouse moved events
     */
    private _handleMouseMoved;
    /**
     * Handle mouse pressed events
     */
    private _handleMousePressed;
    /**
     * Handle mouse released events
     */
    private _handleMouseReleased;
    /**
     * Handle mouse clicked events
     */
    private _handleMouseClicked;
    /**
     * Handle mouse double-clicked events
     */
    private _handleDoubleClicked;
    /**
     * Handle mouse scrolled events
     */
    private _handleMouseScrolled;
    /**
     * Update mouse position based on mouse event.
     * Converts pixel coordinates to center-based grid coordinates.
     */
    private _updateMousePosition;
    private _isDragging;
    private _getActiveButton;
    private _accumulateMovement;
    private _isPointerLocked;
}
