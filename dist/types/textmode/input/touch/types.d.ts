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
 *
 * @see {@link https://code.textmode.art/api/textmode.js/namespaces/input/namespaces/touch/interfaces/TouchPosition | input.touch.TouchPosition API reference}
 */
export interface TouchPosition extends GridPosition {
    /**
     * Identifier provided by the browser for a touch point.
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/input/namespaces/touch/interfaces/TouchPosition#id | input.touch.TouchPosition.id API reference}
     */
    id: number;
    /**
     * Client X coordinate in CSS pixels.
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/input/namespaces/touch/interfaces/TouchPosition#clientx | input.touch.TouchPosition.clientX API reference}
     */
    clientX: number;
    /**
     * Client Y coordinate in CSS pixels.
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/input/namespaces/touch/interfaces/TouchPosition#clienty | input.touch.TouchPosition.clientY API reference}
     */
    clientY: number;
    /**
     * Touch pressure (0-1) when supported.
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/input/namespaces/touch/interfaces/TouchPosition#pressure | input.touch.TouchPosition.pressure API reference}
     */
    pressure?: number;
    /**
     * Contact ellipse radius on the X axis in CSS pixels.
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/input/namespaces/touch/interfaces/TouchPosition#radiusx | input.touch.TouchPosition.radiusX API reference}
     */
    radiusX?: number;
    /**
     * Contact ellipse radius on the Y axis in CSS pixels.
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/input/namespaces/touch/interfaces/TouchPosition#radiusy | input.touch.TouchPosition.radiusY API reference}
     */
    radiusY?: number;
    /**
     * Contact ellipse angle in degrees when provided.
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/input/namespaces/touch/interfaces/TouchPosition#rotationangle | input.touch.TouchPosition.rotationAngle API reference}
     */
    rotationAngle?: number;
}
/**
 * Touch event payload passed to input callbacks.
 *
 * The coordinate system uses center-based coordinates matching the main rendering space:
 * - `(0, 0)` is the center cell of the grid
 * - Coordinates can be used directly with `translate()` and other drawing functions
 *
 * @see {@link https://code.textmode.art/api/textmode.js/namespaces/input/namespaces/touch/interfaces/TouchEventData | input.touch.TouchEventData API reference}
 */
export interface TouchEventData {
    /**
     * The touch point that triggered this event.
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/input/namespaces/touch/interfaces/TouchEventData#touch | input.touch.TouchEventData.touch API reference}
     */
    touch: TouchPosition;
    /**
     * The previous position for this touch if available.
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/input/namespaces/touch/interfaces/TouchEventData#previoustouch | input.touch.TouchEventData.previousTouch API reference}
     */
    previousTouch?: TouchPosition;
    /**
     * All active touches mapped to grid coordinates.
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/input/namespaces/touch/interfaces/TouchEventData#touches | input.touch.TouchEventData.touches API reference}
     */
    touches: TouchPosition[];
    /**
     * Active touches snapshot before this event.
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/input/namespaces/touch/interfaces/TouchEventData#previoustouches | input.touch.TouchEventData.previousTouches API reference}
     */
    previousTouches: TouchPosition[];
    /**
     * Touches that changed during this event.
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/input/namespaces/touch/interfaces/TouchEventData#changedtouches | input.touch.TouchEventData.changedTouches API reference}
     */
    changedTouches: TouchPosition[];
    /**
     * Milliseconds elapsed since the previous update for this touch.
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/input/namespaces/touch/interfaces/TouchEventData#deltatime | input.touch.TouchEventData.deltaTime API reference}
     */
    deltaTime: number;
    /**
     * Original browser event.
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/input/namespaces/touch/interfaces/TouchEventData#originalevent | input.touch.TouchEventData.originalEvent API reference}
     */
    originalEvent: TouchEvent;
}
/**
 * Tap (single or double) event data.
 *
 * @see {@link https://code.textmode.art/api/textmode.js/namespaces/input/namespaces/touch/interfaces/TouchTapEventData | input.touch.TouchTapEventData API reference}
 */
export interface TouchTapEventData {
    /**
     * Position of the tap.
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/input/namespaces/touch/interfaces/TouchTapEventData#touch | input.touch.TouchTapEventData.touch API reference}
     */
    touch: TouchPosition;
    /**
     * Number of taps recognised (1 or 2).
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/input/namespaces/touch/interfaces/TouchTapEventData#taps | input.touch.TouchTapEventData.taps API reference}
     */
    taps: 1 | 2;
    /**
     * Original browser event.
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/input/namespaces/touch/interfaces/TouchTapEventData#originalevent | input.touch.TouchTapEventData.originalEvent API reference}
     */
    originalEvent: TouchEvent;
}
/**
 * Long press event data.
 *
 * @see {@link https://code.textmode.art/api/textmode.js/namespaces/input/namespaces/touch/interfaces/TouchLongPressEventData | input.touch.TouchLongPressEventData API reference}
 */
export interface TouchLongPressEventData {
    /**
     * Touch position at the time the long press fired.
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/input/namespaces/touch/interfaces/TouchLongPressEventData#touch | input.touch.TouchLongPressEventData.touch API reference}
     */
    touch: TouchPosition;
    /**
     * Duration in milliseconds the press was held.
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/input/namespaces/touch/interfaces/TouchLongPressEventData#duration | input.touch.TouchLongPressEventData.duration API reference}
     */
    duration: number;
    /**
     * Original browser event.
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/input/namespaces/touch/interfaces/TouchLongPressEventData#originalevent | input.touch.TouchLongPressEventData.originalEvent API reference}
     */
    originalEvent: TouchEvent;
}
/**
 * Swipe event data reported when the finger travels a minimum distance within a time window.
 *
 * @see {@link https://code.textmode.art/api/textmode.js/namespaces/input/namespaces/touch/interfaces/TouchSwipeEventData | input.touch.TouchSwipeEventData API reference}
 */
export interface TouchSwipeEventData {
    /**
     * Touch point at the end of the swipe.
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/input/namespaces/touch/interfaces/TouchSwipeEventData#touch | input.touch.TouchSwipeEventData.touch API reference}
     */
    touch: TouchPosition;
    /**
     * Normalised swipe direction vector.
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/input/namespaces/touch/interfaces/TouchSwipeEventData#direction | input.touch.TouchSwipeEventData.direction API reference}
     */
    direction: {
        x: number;
        y: number;
    };
    /**
     * Total distance travelled in CSS pixels.
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/input/namespaces/touch/interfaces/TouchSwipeEventData#distance | input.touch.TouchSwipeEventData.distance API reference}
     */
    distance: number;
    /**
     * Velocity in CSS pixels per millisecond.
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/input/namespaces/touch/interfaces/TouchSwipeEventData#velocity | input.touch.TouchSwipeEventData.velocity API reference}
     */
    velocity: {
        /** Velocity in X direction. */
        x: number;
        /** Velocity in Y direction. */
        y: number;
    };
    /**
     * Original browser event.
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/input/namespaces/touch/interfaces/TouchSwipeEventData#originalevent | input.touch.TouchSwipeEventData.originalEvent API reference}
     */
    originalEvent: TouchEvent;
}
/**
 * Pinch gesture event data describing the scaling factor between the initial and current distance.
 *
 * @see {@link https://code.textmode.art/api/textmode.js/namespaces/input/namespaces/touch/interfaces/TouchPinchEventData | input.touch.TouchPinchEventData API reference}
 */
export interface TouchPinchEventData {
    /**
     * Touch points participating in the pinch, always two entries.
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/input/namespaces/touch/interfaces/TouchPinchEventData#touches | input.touch.TouchPinchEventData.touches API reference}
     */
    touches: [TouchPosition, TouchPosition];
    /**
     * Scale factor relative to the initial distance *(1 == unchanged)*.
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/input/namespaces/touch/interfaces/TouchPinchEventData#scale | input.touch.TouchPinchEventData.scale API reference}
     */
    scale: number;
    /**
     * Scale delta compared to the previous callback.
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/input/namespaces/touch/interfaces/TouchPinchEventData#deltascale | input.touch.TouchPinchEventData.deltaScale API reference}
     */
    deltaScale: number;
    /**
     * Centre of the gesture in grid coordinates.
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/input/namespaces/touch/interfaces/TouchPinchEventData#center | input.touch.TouchPinchEventData.center API reference}
     */
    center: {
        /** Grid X coordinate *(column)*. */
        x: number;
        /** Grid Y coordinate *(row)*. */
        y: number;
    };
    /**
     * Original browser event.
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/input/namespaces/touch/interfaces/TouchPinchEventData#originalevent | input.touch.TouchPinchEventData.originalEvent API reference}
     */
    originalEvent: TouchEvent;
}
/**
 * Rotate gesture event data describing the angle change between the initial and current segment.
 *
 * @see {@link https://code.textmode.art/api/textmode.js/namespaces/input/namespaces/touch/interfaces/TouchRotateEventData | input.touch.TouchRotateEventData API reference}
 */
export interface TouchRotateEventData {
    /**
     * Touch points participating in the rotation, always two entries.
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/input/namespaces/touch/interfaces/TouchRotateEventData#touches | input.touch.TouchRotateEventData.touches API reference}
     */
    touches: [TouchPosition, TouchPosition];
    /**
     * Total rotation in degrees relative to the initial angle.
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/input/namespaces/touch/interfaces/TouchRotateEventData#rotation | input.touch.TouchRotateEventData.rotation API reference}
     */
    rotation: number;
    /**
     * Change in rotation since the previous callback.
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/input/namespaces/touch/interfaces/TouchRotateEventData#deltarotation | input.touch.TouchRotateEventData.deltaRotation API reference}
     */
    deltaRotation: number;
    /**
     * Centre of the gesture in grid coordinates.
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/input/namespaces/touch/interfaces/TouchRotateEventData#center | input.touch.TouchRotateEventData.center API reference}
     */
    center: {
        /** Grid X coordinate *(column)*. */
        x: number;
        /** Grid Y coordinate *(row)*. */
        y: number;
    };
    /**
     * Original browser event.
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/input/namespaces/touch/interfaces/TouchRotateEventData#originalevent | input.touch.TouchRotateEventData.originalEvent API reference}
     */
    originalEvent: TouchEvent;
}
/**
 * Touch event callback signature.
 *
 * @see {@link https://code.textmode.art/api/textmode.js/namespaces/input/namespaces/touch/type-aliases/TouchEventHandler | input.touch.TouchEventHandler API reference}
 */
export type TouchEventHandler = (data: TouchEventData) => void;
/**
 * Tap event callback signature.
 *
 * @see {@link https://code.textmode.art/api/textmode.js/namespaces/input/namespaces/touch/type-aliases/TouchTapHandler | input.touch.TouchTapHandler API reference}
 */
export type TouchTapHandler = (data: TouchTapEventData) => void;
/**
 * Long-press event callback signature.
 *
 * @see {@link https://code.textmode.art/api/textmode.js/namespaces/input/namespaces/touch/type-aliases/TouchLongPressHandler | input.touch.TouchLongPressHandler API reference}
 */
export type TouchLongPressHandler = (data: TouchLongPressEventData) => void;
/**
 * Swipe event callback signature.
 *
 * @see {@link https://code.textmode.art/api/textmode.js/namespaces/input/namespaces/touch/type-aliases/TouchSwipeHandler | input.touch.TouchSwipeHandler API reference}
 */
export type TouchSwipeHandler = (data: TouchSwipeEventData) => void;
/**
 * Pinch event callback signature.
 *
 * @see {@link https://code.textmode.art/api/textmode.js/namespaces/input/namespaces/touch/type-aliases/TouchPinchHandler | input.touch.TouchPinchHandler API reference}
 */
export type TouchPinchHandler = (data: TouchPinchEventData) => void;
/**
 * Rotate-gesture event callback signature.
 *
 * @see {@link https://code.textmode.art/api/textmode.js/namespaces/input/namespaces/touch/type-aliases/TouchRotateHandler | input.touch.TouchRotateHandler API reference}
 */
export type TouchRotateHandler = (data: TouchRotateEventData) => void;
/**
 * Touch and gesture events emitted by the touch input manager.
 *
 * @see {@link https://code.textmode.art/api/textmode.js/namespaces/input/namespaces/touch/interfaces/TouchEventMap | input.touch.TouchEventMap API reference}
 */
export interface TouchEventMap {
    /**
     * Fires when a touch point begins on the canvas.
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/input/namespaces/touch/interfaces/TouchEventMap#touchstarted | input.touch.TouchEventMap.touchStarted API reference}
     */
    touchStarted: TouchEventHandler;
    /**
     * Fires when a touch point moves across the canvas.
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/input/namespaces/touch/interfaces/TouchEventMap#touchmoved | input.touch.TouchEventMap.touchMoved API reference}
     */
    touchMoved: TouchEventHandler;
    /**
     * Fires when a touch point is lifted from the canvas.
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/input/namespaces/touch/interfaces/TouchEventMap#touchended | input.touch.TouchEventMap.touchEnded API reference}
     */
    touchEnded: TouchEventHandler;
    /**
     * Fires when the browser cancels a touch.
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/input/namespaces/touch/interfaces/TouchEventMap#touchcancelled | input.touch.TouchEventMap.touchCancelled API reference}
     */
    touchCancelled: TouchEventHandler;
    /**
     * Fires on a single tap gesture.
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/input/namespaces/touch/interfaces/TouchEventMap#tap | input.touch.TouchEventMap.tap API reference}
     */
    tap: TouchTapHandler;
    /**
     * Fires on a double tap gesture.
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/input/namespaces/touch/interfaces/TouchEventMap#doubletap | input.touch.TouchEventMap.doubleTap API reference}
     */
    doubleTap: TouchTapHandler;
    /**
     * Fires on a long press gesture.
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/input/namespaces/touch/interfaces/TouchEventMap#longpress | input.touch.TouchEventMap.longPress API reference}
     */
    longPress: TouchLongPressHandler;
    /**
     * Fires on a swipe gesture.
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/input/namespaces/touch/interfaces/TouchEventMap#swipe | input.touch.TouchEventMap.swipe API reference}
     */
    swipe: TouchSwipeHandler;
    /**
     * Fires on a pinch gesture update.
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/input/namespaces/touch/interfaces/TouchEventMap#pinch | input.touch.TouchEventMap.pinch API reference}
     */
    pinch: TouchPinchHandler;
    /**
     * Fires on a rotation gesture update.
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/input/namespaces/touch/interfaces/TouchEventMap#rotategesture | input.touch.TouchEventMap.rotateGesture API reference}
     */
    rotateGesture: TouchRotateHandler;
}
