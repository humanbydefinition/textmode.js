import type { TouchPosition } from './TouchManager';
export interface GestureTouchSession {
    id: number;
    startPosition: TouchPosition;
    lastPosition: TouchPosition;
    startTime: number;
    lastTime: number;
}
