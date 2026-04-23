import type { TouchLongPressHandler, TouchPinchHandler, TouchPosition, TouchRotateHandler, TouchSwipeHandler, TouchTapHandler } from './types';
export interface GestureTouchSession {
    id: number;
    startPosition: TouchPosition;
    lastPosition: TouchPosition;
    startTime: number;
    lastTime: number;
}
/**
 * Event map for gesture events emitted by the {@link GestureRecognizer}.
 */
export interface GestureEventMap {
    /** Single tap detected */
    tap: TouchTapHandler;
    /** Double tap detected */
    doubleTap: TouchTapHandler;
    /** Long press detected */
    longPress: TouchLongPressHandler;
    /** Swipe gesture detected */
    swipe: TouchSwipeHandler;
    /** Pinch gesture update */
    pinch: TouchPinchHandler;
    /** Rotate gesture update */
    rotateGesture: TouchRotateHandler;
}
export interface GestureEventSink {
    _emit<K extends keyof GestureEventMap>(event: K, ...args: Parameters<GestureEventMap[K]>): void;
}
