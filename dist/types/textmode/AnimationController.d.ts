/**
 * Manages animation loop timing and frame rate control for textmode rendering.
 * Provides precise frame rate limiting and smooth animation timing.
 */
export declare class AnimationController {
    private _frameRateLimit;
    private _frameInterval;
    private _animationFrameId;
    private _lastFrameTime;
    private _isLooping;
    private _frameRate;
    private _lastRenderTime;
    private _frameTimeHistory;
    private _frameTimeHistorySize;
    private _frameCount;
    /**
     * Creates an AnimationController instance.
     * @param frameRateLimit Maximum frames per second. Defaults to 60.
     */
    constructor(frameRateLimit?: number);
    /**
     * Start the animation loop with the provided render callback.
     * @param renderCallback Function to call for each frame render
     */
    start(renderCallback: () => void): void;
    /**
     * Stop the animation loop.
     */
    stop(): void;
    /**
     * Pause the animation loop without stopping it completely.
     */
    pause(): void;
    /**
     * Resume the animation loop if it was paused.
     * @param renderCallback Function to call for each frame render
     */
    resume(renderCallback: () => void): void;
    /**
     * Set or get the frame rate limit.
     * @param fps Optional new frame rate limit. If not provided, returns current measured frame rate.
     * @param renderCallback Required when setting new frame rate and animation is running
     * @returns Current measured frame rate when getting, void when setting
     */
    frameRate(fps?: number, renderCallback?: () => void): number | void;
    /**
     * Update frame rate measurement. Should be called on each render.
     * Uses a rolling average for smoother frame rate reporting.
     */
    measureFrameRate(): void;
    /**
     * Check if the animation loop is currently active.
     */
    get isLooping(): boolean;
    /**
     * Get the current frame rate limit.
     */
    get frameRateLimit(): number;
    /**
     * Get the current measured frame rate.
     */
    get currentFrameRate(): number;
    /**
     * Get the current frame count.
     */
    get frameCount(): number;
    /**
     * Set the current frame count.
     */
    set frameCount(value: number);
    /**
     * Increment the frame count by one.
     * Should be called on each render to track total frames rendered.
     */
    incrementFrame(): void;
    /**
     * Reset the frame count to zero.
     * Useful when restarting animations or resetting state.
     */
    resetFrameCount(): void;
}
