/**
 * Manages animation loop timing and frame rate control for textmode rendering.
 * Provides precise frame rate limiting and smooth animation timing.
 */
export declare class AnimationController {
    private _frameInterval;
    private _targetFrameRate;
    private _animationFrameId;
    private _lastFrameTime;
    private _isLooping;
    private _frameRate;
    private _lastRenderTime;
    private _frameTimeHistory;
    private _frameTimeHistorySize;
    private _deltaTime;
    private _frameCount;
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
    $start(renderCallback: () => void): void;
    /**
     * Stop the animation loop.
     */
    $stop(): void;
    /**
     * Pause the animation loop without stopping it completely.
     */
    $pause(): void;
    /**
     * Resume the animation loop if it was paused.
     * @param renderCallback Function to call for each frame render
     */
    $resume(renderCallback: () => void): void;
    /**
     * Set or get the frame rate limit.
     * @param fps Optional new frame rate limit. If not provided, returns current measured frame rate.
     * @param renderCallback Required when setting new frame rate and animation is running
     * @returns Current measured frame rate when getting, void when setting
     */
    $frameRate(fps?: number, renderCallback?: () => void): number | void;
    /**
     * Update frame rate measurement. Should be called on each render.
     * Uses a rolling average for smoother frame rate reporting.
     */
    $measureFrameRate(): void;
    /**
     * Check if the animation loop is currently active.
     */
    get $isLooping(): boolean;
    /**
     * Get the current measured frame rate.
     */
    get $currentFrameRate(): number;
    /**
     * Get the target frame rate limit.
     */
    get $targetFrameRate(): number;
    /**
     * Set the target frame rate limit.
     * @param value The new target frame rate in frames per second
     */
    set $targetFrameRate(value: number);
    /**
     * Get the current frame count.
     */
    get $frameCount(): number;
    /**
     * Set the current frame count.
     */
    set $frameCount(value: number);
    /**
     * Increment the frame count by one.
     * Should be called on each render to track total frames rendered.
     */
    $incrementFrame(): void;
    /**
     * Get the number of milliseconds since the animation started.
     * Returns 0 if the animation has not started yet.
     */
    get $millis(): number;
    /**
     * Set the elapsed milliseconds by adjusting the start time.
     * This allows seeking/scrubbing in animations.
     * @param value The new elapsed time in milliseconds
     */
    set $millis(value: number);
    /**
     * Get the number of seconds since the animation started.
     * Returns 0 if the animation has not started yet.
     */
    get $secs(): number;
    /**
     * Set the elapsed seconds by adjusting the start time.
     * This allows seeking/scrubbing in animations.
     * @param value The new elapsed time in seconds
     */
    set $secs(value: number);
    /**
     * Get the time in milliseconds between the current frame and the last frame.
     * Useful for frame-rate-independent animations.
     */
    get $deltaTime(): number;
}
