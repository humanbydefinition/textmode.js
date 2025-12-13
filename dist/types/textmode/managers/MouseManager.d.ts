import type { TextmodeCanvas } from '../Canvas';
import type { TextmodeGrid } from '../Grid';
/**
 * Mouse coordinates in grid space using center-based coordinates.
 *
 * The coordinate system matches the main drawing/rendering space:
 * - `(0, 0)` is the center cell of the grid
 * - Negative X values are to the left of center
 * - Positive X values are to the right of center
 * - Negative Y values are above center
 * - Positive Y values are below center
 *
 * When the mouse is outside the grid bounds, both `x` and `y` are set to
 * `Number.NEGATIVE_INFINITY` to indicate an invalid/outside position.
 */
export interface MousePosition {
    /** Grid X coordinate (column) in center-based coords. `Number.NEGATIVE_INFINITY` if outside grid. */
    x: number;
    /** Grid Y coordinate (row) in center-based coords. `Number.NEGATIVE_INFINITY` if outside grid. */
    y: number;
}
/**
 * Mouse event data passed to event handlers
 */
export interface MouseEventData {
    /** Current mouse position in grid coordinates */
    position: MousePosition;
    /** Previous mouse position in grid coordinates */
    previousPosition: MousePosition;
    /** Mouse button that triggered the event *(for click events)* */
    button?: number;
    /** Scroll delta for wheel events */
    delta?: {
        /** Scroll delta in X direction */
        x: number;
        /** Scroll delta in Y direction */
        y: number;
    };
    /** Original DOM event */
    originalEvent: MouseEvent | WheelEvent;
}
/**
 * Mouse event handler function type
 */
export type MouseEventHandler = (data: MouseEventData) => void;
/**
 * Grid provider function type - returns the grid to use for coordinate calculations
 */
export type GridProvider = () => TextmodeGrid | undefined;
/**
 * Manages all mouse interaction for a Textmodifier instance.
 * Handles event listeners, coordinate conversion, and event dispatching.
 * @ignore
 */
export declare class MouseManager {
    private _canvas;
    private _getGrid;
    private _mousePosition;
    private _previousMousePosition;
    private _lastClientCoordinates;
    private _suppressUntil;
    private _mouseMoveListener;
    private _mouseLeaveListener;
    private _mouseDownListener;
    private _mouseUpListener;
    private _clickListener;
    private _wheelListener;
    private _areListenersSetup;
    private _mouseClickedCallback?;
    private _mousePressedCallback?;
    private _mouseReleasedCallback?;
    private _mouseMovedCallback?;
    private _mouseScrolledCallback?;
    /**
     * Create a new MouseManager.
     * @param canvas The canvas to track mouse events on.
     * @param getGrid A function that returns the grid to use for coordinate calculations.
     */
    constructor(canvas: TextmodeCanvas, getGrid: GridProvider);
    /**
     * Temporarily suppress mouse event callbacks for a duration in milliseconds.
     * Used to prevent synthetic mouse events from touch interactions from firing twice.
     */
    $suppressEventsFor(durationMs: number): void;
    private _isSuppressed;
    /**
     * Set the CSS cursor for the textmode canvas.
     * Pass a valid CSS cursor value (e.g. 'pointer', 'crosshair', 'move', 'nwse-resize', 'none').
     * Call with no argument or an empty string to reset to the default cursor.
     *
     * Reference: https://developer.mozilla.org/en-US/docs/Web/CSS/cursor
     */
    $setCursor(cursor?: string): void;
    /**
     * Setup mouse event listeners on the canvas.
     */
    $setupListeners(): void;
    /**
     * Remove mouse event listeners from the canvas.
     */
    $cleanupListeners(): void;
    /**
     * Force an immediate update of the mouse position.
     * This is useful when grid dimensions change (font size, window resize, etc.)
     * and we need to recalculate the mouse coordinates without waiting for a mouse event.
     */
    $updatePositions(): void;
    /**
     * Set a callback function that will be called when the mouse is clicked.
     * @param callback The function to call when the mouse is clicked
     */
    $setClickedCallback(callback: MouseEventHandler): void;
    /**
     * Set a callback function that will be called when the mouse is pressed down.
     * @param callback The function to call when the mouse is pressed
     */
    $setPressedCallback(callback: MouseEventHandler): void;
    /**
     * Set a callback function that will be called when the mouse is released.
     * @param callback The function to call when the mouse is released
     */
    $setReleasedCallback(callback: MouseEventHandler): void;
    /**
     * Set a callback function that will be called when the mouse moves.
     * @param callback The function to call when the mouse moves
     */
    $setMovedCallback(callback: MouseEventHandler): void;
    /**
     * Set a callback function that will be called when the mouse wheel is scrolled.
     * @param callback The function to call when the mouse wheel is scrolled
     */
    $setScrolledCallback(callback: MouseEventHandler): void;
    /**
     * Get the current mouse position in grid coordinates.
     * Returns a copy to prevent external modification.
     */
    $getPosition(): MousePosition;
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
     * Handle mouse scrolled events
     */
    private _handleMouseScrolled;
    /**
     * Update mouse position based on mouse event.
     * Converts pixel coordinates to center-based grid coordinates.
     */
    private _updateMousePosition;
}
