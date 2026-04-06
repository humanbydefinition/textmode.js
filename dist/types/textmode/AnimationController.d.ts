/**
 * Manages animation loop timing and frame rate control for textmode rendering.
 * Provides precise frame rate limiting and smooth animation timing.
 */
export declare class AnimationController {
    private _frameInterval;
    _targetFrameRate: number;
    private _animationFrameId;
    private _lastFrameTime;
    _isLooping: boolean;
    _currentFrameRate: number;
    private _lastRenderTime;
    private _frameTimeHistory;
    private _frameTimeHistorySize;
    _deltaTime: number;
    _frameCount: number;
    private _millisStart;
    /**
     * Creates an AnimationController instance.
     * @param frameRateLimit Maximum frames per second. Defaults to 60.
     */
    constructor(frameRateLimit?: number);
    /**
     * Start the animation loop with the provided render callback.
     * @param renderCallback Function to call for each frame render
     */
    _start(renderCallback: () => void): void;
    /**
     * Stop the animation loop.
     */
    _stop(): void;
    /**
     * Pause the animation loop without stopping it completely.
     */
    _pause(): void;
    /**
     * Resume the animation loop if it was paused.
     * @param renderCallback Function to call for each frame render
     */
    _resume(renderCallback: () => void): void;
    /**
     * Set or get the frame rate limit.
     * @param fps Optional new frame rate limit. If not provided, returns current measured frame rate.
     * @param renderCallback Required when setting new frame rate and animation is running
     * @returns Current measured frame rate when getting, void when setting
     */
    _frameRate(fps?: number, renderCallback?: () => void): number | void;
    /**
     * Update frame rate measurement. Should be called on each render.
     * Uses a rolling average for smoother frame rate reporting.
     */
    _measureFrameRate(): void;
    _setTargetFrameRate(value: number): void;
    /**
     * Increment the frame count by one.
     * Should be called on each render to track total frames rendered.
     */
    _incrementFrame(): void;
    /**
     * Get the number of milliseconds since the animation started.
     * Returns 0 if the animation has not started yet.
     */
    get _millis(): number;
    /**
     * Set the elapsed milliseconds by adjusting the start time.
     * This allows seeking/scrubbing in animations.
     * @param value The new elapsed time in milliseconds
     */
    set _millis(value: number);
    /**
     * Get the number of seconds since the animation started.
     * Returns 0 if the animation has not started yet.
     */
    get _secs(): number;
    /**
     * Set the elapsed seconds by adjusting the start time.
     * This allows seeking/scrubbing in animations.
     * @param value The new elapsed time in seconds
     */
    set _secs(value: number);
}
