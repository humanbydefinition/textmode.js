import type { GridPosition } from '../../grid/TextmodeGrid';
/**
 * Touch position expressed both in grid and client coordinates.
 *
 * The grid coordinate system uses center-based coordinates matching the rendering space:
 * - `(0, 0)` is the center cell of the grid
 * - Negative X values are to the left of center
 * - Positive X values are to the right of center
 * - Negative Y values are above center
 * - Positive Y values are below center
 *
 * When the touch is outside the grid bounds, `x` and `y` are set to
 * `Number.NEGATIVE_INFINITY` to indicate an invalid/outside position.
 */
export interface TouchPosition extends GridPosition {
    /** Identifier provided by the browser for a touch point. */
    id: number;
    /** Client X coordinate in CSS pixels. */
    clientX: number;
    /** Client Y coordinate in CSS pixels. */
    clientY: number;
    /** Touch pressure (0-1) when supported. */
    pressure?: number;
    /** Contact ellipse radius on the X axis in CSS pixels. */
    radiusX?: number;
    /** Contact ellipse radius on the Y axis in CSS pixels. */
    radiusY?: number;
    /** Contact ellipse angle in radians when provided. */
    rotationAngle?: number;
}
/**
 * Touch event data.
 *
 * The coordinate system uses center-based coordinates matching the main rendering space:
 * - `(0, 0)` is the center cell of the grid
 * - Coordinates can be used directly with `translate()` and other drawing functions
 */
export interface TouchEventData {
    /** The touch point that triggered this event. */
    touch: TouchPosition;
    /** The previous position for this touch if available. */
    previousTouch?: TouchPosition;
    /** All active touches mapped to grid coordinates. */
    touches: TouchPosition[];
    /** Active touches snapshot before this event. */
    previousTouches: TouchPosition[];
    /** Touches that changed during this event. */
    changedTouches: TouchPosition[];
    /** Milliseconds elapsed since the previous update for this touch. */
    deltaTime: number;
    /** Original browser event. */
    originalEvent: TouchEvent;
}
/**
 * Tap (single or double) event data.
 */
export interface TouchTapEventData {
    /** Position of the tap. */
    touch: TouchPosition;
    /** Number of taps recognised (1 or 2). */
    taps: 1 | 2;
    /** Original browser event. */
    originalEvent: TouchEvent;
}
/**
 * Long press event data.
 */
export interface TouchLongPressEventData {
    /** Touch position at the time the long press fired. */
    touch: TouchPosition;
    /** Duration in milliseconds the press was held. */
    duration: number;
    /** Original browser event. */
    originalEvent: TouchEvent;
}
/**
 * Swipe event data reported when the finger travels a minimum distance within a time window.
 */
export interface TouchSwipeEventData {
    /** Touch point at the end of the swipe. */
    touch: TouchPosition;
    /** Normalised swipe direction vector. */
    direction: {
        x: number;
        y: number;
    };
    /** Total distance travelled in CSS pixels. */
    distance: number;
    /** Velocity in CSS pixels per millisecond. */
    velocity: {
        /** Velocity in X direction. */
        x: number;
        /** Velocity in Y direction. */
        y: number;
    };
    /** Original browser event. */
    originalEvent: TouchEvent;
}
/**
 * Pinch gesture event data describing the scaling factor between the initial and current distance.
 */
export interface TouchPinchEventData {
    /** Touch points participating in the pinch, always two entries. */
    touches: [TouchPosition, TouchPosition];
    /** Scale factor relative to the initial distance *(1 == unchanged)*. */
    scale: number;
    /** Scale delta compared to the previous callback. */
    deltaScale: number;
    /** Centre of the gesture in grid coordinates. */
    center: {
        /** Grid X coordinate *(column)*. */
        x: number;
        /** Grid Y coordinate *(row)*. */
        y: number;
    };
    /** Original browser event. */
    originalEvent: TouchEvent;
}
/**
 * Rotate gesture event data describing the angle change between the initial and current segment.
 */
export interface TouchRotateEventData {
    /** Touch points participating in the rotation, always two entries. */
    touches: [TouchPosition, TouchPosition];
    /** Total rotation in degrees relative to the initial angle. */
    rotation: number;
    /** Change in rotation since the previous callback. */
    deltaRotation: number;
    /** Centre of the gesture in grid coordinates. */
    center: {
        /** Grid X coordinate *(column)*. */
        x: number;
        /** Grid Y coordinate *(row)*. */
        y: number;
    };
    /** Original browser event. */
    originalEvent: TouchEvent;
}
/** Touch event handler function type. */
export type TouchEventHandler = (data: TouchEventData) => void;
/** Touch tap event handler function type. */
export type TouchTapHandler = (data: TouchTapEventData) => void;
/** Touch long press event handler function type. */
export type TouchLongPressHandler = (data: TouchLongPressEventData) => void;
/** Touch swipe event handler function type. */
export type TouchSwipeHandler = (data: TouchSwipeEventData) => void;
/** Touch pinch event handler function type. */
export type TouchPinchHandler = (data: TouchPinchEventData) => void;
/** Touch rotate event handler function type. */
export type TouchRotateHandler = (data: TouchRotateEventData) => void;
/**
 * Event map for all touch events emitted by the {@link TouchInput}.
 */
export interface TouchEventMap {
    /** Fires when a touch point begins on the canvas. */
    touchStarted: TouchEventHandler;
    /** Fires when a touch point moves across the canvas. */
    touchMoved: TouchEventHandler;
    /** Fires when a touch point is lifted from the canvas. */
    touchEnded: TouchEventHandler;
    /** Fires when the browser cancels a touch. */
    touchCancelled: TouchEventHandler;
    /** Fires on a single tap gesture. */
    tap: TouchTapHandler;
    /** Fires on a double tap gesture. */
    doubleTap: TouchTapHandler;
    /** Fires on a long press gesture. */
    longPress: TouchLongPressHandler;
    /** Fires on a swipe gesture. */
    swipe: TouchSwipeHandler;
    /** Fires on a pinch gesture update. */
    pinch: TouchPinchHandler;
    /** Fires on a rotation gesture update. */
    rotateGesture: TouchRotateHandler;
}
