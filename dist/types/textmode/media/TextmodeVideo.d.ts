import { TextmodeTexture } from './TextmodeTexture';
/**
 * Video source for textmode rendering.
 *
 * Create one with {@link Textmodifier.loadVideo}, draw it with {@link Textmodifier.image},
 * control playback with video methods, and configure conversion through inherited
 * chainable methods.
 *
 * @example
 * {@includeCode ../../../examples/TextmodeVideo/creation/sketch.js}
 */
export declare class TextmodeVideo extends TextmodeTexture {
    private constructor();
    /**
     * Dispose the video source and release the backing media element.
     *
     * @example
     * {@includeCode ../../../examples/TextmodeVideo/dispose/sketch.js}
     */
    dispose(): void;
    /**
     * Start video playback.
     * @returns Promise that resolves when playback starts.
     *
     * @example
     * {@includeCode ../../../examples/TextmodeVideo/play/sketch.js}
     */
    play(): Promise<void>;
    /**
     * Pause video playback.
     *
     * @example
     * {@includeCode ../../../examples/TextmodeVideo/pause/sketch.js}
     */
    pause(): void;
    /**
     * Stop the video and seek to the beginning.
     *
     * @example
     * {@includeCode ../../../examples/TextmodeVideo/stop/sketch.js}
     */
    stop(): void;
    /**
     * Set playback speed.
     * @param rate Playback rate (`1.0` is normal speed).
     *
     * @example
     * {@includeCode ../../../examples/TextmodeVideo/speed/sketch.js}
     */
    speed(rate: number): this;
    /**
     * Set whether the video loops.
     * @param shouldLoop Whether to loop. Defaults to `true`.
     *
     * @example
     * {@includeCode ../../../examples/TextmodeVideo/loop/sketch.js}
     */
    loop(shouldLoop?: boolean): this;
    /**
     * Seek to a playback time.
     * @param seconds Time in seconds.
     *
     * @example
     * {@includeCode ../../../examples/TextmodeVideo/time/sketch.js}
     */
    time(seconds: number): this;
    /**
     * Set playback volume.
     * @param level Volume level from `0` to `1`.
     *
     * Videos loaded through {@link Textmodifier.loadVideo} start muted to satisfy autoplay rules.
     * Unmute the underlying {@link videoElement} in response to a user gesture before expecting
     * audible volume changes.
     *
     * @example
     * {@includeCode ../../../examples/TextmodeVideo/volume/sketch.js}
     */
    volume(level: number): this;
    /**
     * Underlying HTML video element.
     *
     * @example
     * {@includeCode ../../../examples/TextmodeVideo/videoElement/sketch.js}
     */
    get videoElement(): HTMLVideoElement;
    /**
     * Current playback time in seconds.
     *
     * @example
     * {@includeCode ../../../examples/TextmodeVideo/currentTime/sketch.js}
     */
    get currentTime(): number;
    /**
     * Total video duration in seconds.
     *
     * @example
     * {@includeCode ../../../examples/TextmodeVideo/duration/sketch.js}
     */
    get duration(): number;
    /**
     * Whether the video is currently playing.
     *
     * @example
     * {@includeCode ../../../examples/TextmodeVideo/isPlaying/sketch.js}
     */
    get isPlaying(): boolean;
    private get _el();
}
