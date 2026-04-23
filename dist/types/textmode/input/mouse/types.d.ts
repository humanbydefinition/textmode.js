import type { GridPosition } from '../../grid/TextmodeGrid';
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
export type MousePosition = GridPosition;
/**
 * Mouse event data passed to event handlers.
 */
export interface MouseEventData {
    /** Current mouse position in grid coordinates. */
    position: MousePosition;
    /** Previous mouse position in grid coordinates. */
    previousPosition: MousePosition;
    /** Mouse button that triggered the event *(for click events)*. */
    button?: number;
    /** Scroll delta for wheel events. */
    delta?: {
        /** Scroll delta in X direction. */
        x: number;
        /** Scroll delta in Y direction. */
        y: number;
    };
    /** Original DOM event. */
    originalEvent: MouseEvent | WheelEvent;
}
/**
 * Mouse event handler function type.
 */
export type MouseEventHandler = (data: MouseEventData) => void;
/**
 * Event map for all mouse events emitted by the {@link MouseInput}.
 */
export interface MouseEventMap {
    /** Fires when the mouse button is clicked (full press + release). */
    mouseClicked: MouseEventHandler;
    /** Fires when the mouse is double-clicked. */
    doubleClicked: MouseEventHandler;
    /** Fires when a mouse button is pressed down. */
    mousePressed: MouseEventHandler;
    /** Fires when a mouse button is released. */
    mouseReleased: MouseEventHandler;
    /** Fires when the mouse moves over the canvas. */
    mouseMoved: MouseEventHandler;
    /** Fires when the mouse moves while a button is held down. */
    mouseDragged: MouseEventHandler;
    /** Fires when the mouse wheel is scrolled. */
    mouseScrolled: MouseEventHandler;
}
