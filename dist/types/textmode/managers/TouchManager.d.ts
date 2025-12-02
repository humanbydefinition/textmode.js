import type { TextmodeCanvas } from '../Canvas';
import type { TextmodeGrid } from '../Grid';
import type { MouseManager } from './MouseManager';
/**
 * Touch position expressed both in grid and client coordinates
 */
export interface TouchPosition {
    /** Identifier provided by the browser for a touch point */
    id: number;
    /** Grid X coordinate (column), -1 if touch is outside grid */
    x: number;
    /** Grid Y coordinate (row), -1 if touch is outside grid */
    y: number;
    /** Client X coordinate in CSS pixels */
    clientX: number;
    /** Client Y coordinate in CSS pixels */
    clientY: number;
    /** Touch pressure (0-1) when supported */
    pressure?: number;
    /** Contact ellipse radius on the X axis in CSS pixels */
    radiusX?: number;
    /** Contact ellipse radius on the Y axis in CSS pixels */
    radiusY?: number;
    /** Contact ellipse angle in radians when provided */
    rotationAngle?: number;
}
/**
 * Touch event data.
 *
 * Unlike the main drawing logic, where `(0,0,0)` is the center cell,
 * the mouse coordinates use the top-left cell as `(0,0)`. This means
 * you'll need to adjust accordingly when using these coordinates
 * for drawing or other grid operations.
 */
export interface TouchEventData {
    /** The touch point that triggered this event */
    touch: TouchPosition;
    /** The previous position for this touch if available */
    previousTouch?: TouchPosition;
    /** All active touches mapped to grid coordinates */
    touches: TouchPosition[];
    /** Active touches snapshot before this event */
    previousTouches: TouchPosition[];
    /** Touches that changed during this event */
    changedTouches: TouchPosition[];
    /** Milliseconds elapsed since the previous update for this touch */
    deltaTime: number;
    /** Original browser event */
    originalEvent: TouchEvent;
}
/**
 * Tap (single or double) event data
 */
export interface TouchTapEventData {
    /** Position of the tap */
    touch: TouchPosition;
    /** Number of taps recognised (1 or 2) */
    taps: 1 | 2;
    /** Original browser event */
    originalEvent: TouchEvent;
}
/**
 * Long press event data
 */
export interface TouchLongPressEventData {
    /** Touch position at the time the long press fired */
    touch: TouchPosition;
    /** Duration in milliseconds the press was held */
    duration: number;
    /** Original browser event */
    originalEvent: TouchEvent;
}
/**
 * Swipe event data reported when the finger travels a minimum distance within a time window
 */
export interface TouchSwipeEventData {
    /** Touch point at the end of the swipe */
    touch: TouchPosition;
    /** Normalised swipe direction vector */
    direction: {
        x: number;
        y: number;
    };
    /** Total distance travelled in CSS pixels */
    distance: number;
    /** Velocity in CSS pixels per millisecond */
    velocity: {
        /** Velocity in X direction */
        x: number;
        /** Velocity in Y direction */
        y: number;
    };
    /** Original browser event */
    originalEvent: TouchEvent;
}
/**
 * Pinch gesture event data describing the scaling factor between the initial and current distance
 */
export interface TouchPinchEventData {
    /** Touch points participating in the pinch, always two entries */
    touches: [TouchPosition, TouchPosition];
    /** Scale factor relative to the initial distance *(1 == unchanged)* */
    scale: number;
    /** Scale delta compared to the previous callback */
    deltaScale: number;
    /** Centre of the gesture in grid coordinates */
    center: {
        /** Grid X coordinate *(column)* */
        x: number;
        /** Grid Y coordinate *(row)* */
        y: number;
    };
    /** Original browser event */
    originalEvent: TouchEvent;
}
/**
 * Rotate gesture event data describing the angle change between the initial and current segment
 */
export interface TouchRotateEventData {
    /** Touch points participating in the rotation, always two entries */
    touches: [TouchPosition, TouchPosition];
    /** Total rotation in degrees relative to the initial angle */
    rotation: number;
    /** Change in rotation since the previous callback */
    deltaRotation: number;
    /** Centre of the gesture in grid coordinates */
    center: {
        /** Grid X coordinate *(column)* */
        x: number;
        /** Grid Y coordinate *(row)* */
        y: number;
    };
    /** Original browser event */
    originalEvent: TouchEvent;
}
/** Touch event handler function type */
export type TouchEventHandler = (data: TouchEventData) => void;
/** Touch tap event handler function type */
export type TouchTapHandler = (data: TouchTapEventData) => void;
/** Touch long press event handler function type */
export type TouchLongPressHandler = (data: TouchLongPressEventData) => void;
/** Touch swipe event handler function type */
export type TouchSwipeHandler = (data: TouchSwipeEventData) => void;
/** Touch pinch event handler function type */
export type TouchPinchHandler = (data: TouchPinchEventData) => void;
/** Touch rotate event handler function type */
export type TouchRotateHandler = (data: TouchRotateEventData) => void;
/**
 * Manages all touch interactions for a Textmodifier instance.
 * Handles event listeners, coordinate conversion, gesture detection, and event dispatching.
 * @ignore
 */
export declare class TouchManager {
    private readonly _canvas;
    private readonly _mouseManager?;
    private _grid;
    private _activeTouches;
    private _previousTouches;
    private _touchInfo;
    private _gestureBaseline;
    private readonly _originalTouchAction;
    private readonly _originalUserSelect;
    private _touchStartListener;
    private _touchMoveListener;
    private _touchEndListener;
    private _touchCancelListener;
    private _areListenersSetup;
    private _touchStartedCallback?;
    private _touchMovedCallback?;
    private _touchEndedCallback?;
    private _touchCancelledCallback?;
    private _tapCallback?;
    private _doubleTapCallback?;
    private _longPressCallback?;
    private _swipeCallback?;
    private _pinchCallback?;
    private _rotateCallback?;
    private readonly _tapMaxDuration;
    private readonly _doubleTapMaxInterval;
    private readonly _tapMovementTolerance;
    private readonly _longPressDuration;
    private readonly _longPressMovementTolerance;
    private readonly _swipeMinDistance;
    private readonly _swipeMaxDuration;
    private readonly _pinchThreshold;
    private readonly _rotationThreshold;
    private readonly _mouseSuppressionDuration;
    private _lastTapTime;
    private _lastTapPosition;
    constructor(canvas: TextmodeCanvas, mouseManager?: MouseManager);
    /** Initialise the manager with the active grid */
    $initialize(grid: TextmodeGrid): void;
    /** Install touch listeners onto the canvas */
    $setupListeners(): void;
    /** Remove all touch listeners */
    $cleanupListeners(): void;
    /**
     * Recalculate touch positions after grid size or offset changes.
     * Uses stored client coordinates to project touches into the new grid.
     */
    $updatePositions(): void;
    /** Retrieve a snapshot of all active touches */
    $getTouches(): TouchPosition[];
    $setStartedCallback(callback: TouchEventHandler): void;
    $setMovedCallback(callback: TouchEventHandler): void;
    $setEndedCallback(callback: TouchEventHandler): void;
    $setCancelledCallback(callback: TouchEventHandler): void;
    $setTapCallback(callback: TouchTapHandler): void;
    $setDoubleTapCallback(callback: TouchTapHandler): void;
    $setLongPressCallback(callback: TouchLongPressHandler): void;
    $setSwipeCallback(callback: TouchSwipeHandler): void;
    $setPinchCallback(callback: TouchPinchHandler): void;
    $setRotateCallback(callback: TouchRotateHandler): void;
    private _handleTouchStart;
    private _handleTouchMove;
    private _handleTouchEnd;
    private _handleTouchCancel;
    private _mapTouchList;
    private _projectTouch;
    private _projectClientToGrid;
    private _buildTouchEventData;
    private _initializeGestureBaseline;
    private _updatePinchAndRotate;
    private _gestureCenter;
    private _evaluateTapAndSwipe;
    private _detectDoubleTap;
    private _cloneTouchPosition;
}
