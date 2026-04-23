import { TextmodeTexture } from './TextmodeTexture';
/**
 * Represents a video element for textmode rendering via {@link Textmodifier.loadVideo}.
 *
 * It can be drawn to the canvas via {@link Textmodifier.image}.
 *
 * A video uploaded currently runs through an adjustable brightness-converter that converts
 * the video frames into a textmode representation using characters.
 * Those adjustable options are available via chainable methods on this class.
 *
 * @example
 * {@includeCode ../../../examples/TextmodeVideo/creation/sketch.js}
 */
export declare class TextmodeVideo extends TextmodeTexture {
    /**
     * Create a TextmodeVideo from an HTML video element.
     * @param gl WebGL context
     * @param renderer GLRenderer instance
     * @param texture WebGL texture
     * @param conversionManager Conversion manager
     * @param videoElement HTMLVideoElement source
     * @param originalWidth Original width of the video
     * @param originalHeight Original height of the video
     * @param gridCols Grid columns
     * @param gridRows Grid rows
     */
    private constructor();
    /**
     * Dispose the video source and release the backing media element.
     *
     * @example
     * {@includeCode ../../../examples/TextmodeVideo/dispose/sketch.js}
     */
    dispose(): void;
    /**
     * Play the video.
     * @returns Promise that resolves when playback starts
     *
     * @example
     * {@includeCode ../../../examples/TextmodeVideo/play/sketch.js}
     */
    play(): Promise<void>;
    /**
     * Pause the video.
     *
     * @example
     * {@includeCode ../../../examples/TextmodeVideo/pause/sketch.js}
     */
    pause(): void;
    /**
     * Stop the video and reset to beginning.
     *
     * @example
     * {@includeCode ../../../examples/TextmodeVideo/stop/sketch.js}
     */
    stop(): void;
    /**
     * Set the playback speed.
     * @param rate Playback rate (1.0 = normal speed)
     *
     * @example
     * {@includeCode ../../../examples/TextmodeVideo/speed/sketch.js}
     */
    speed(rate: number): this;
    /**
     * Set whether the video should loop.
     * @param shouldLoop Whether to loop (defaults to true)
     *
     * @example
     * {@includeCode ../../../examples/TextmodeVideo/loop/sketch.js}
     */
    loop(shouldLoop?: boolean): this;
    /**
     * Set the current time position in the video.
     * @param seconds Time in seconds
     *
     * @example
     * {@includeCode ../../../examples/TextmodeVideo/time/sketch.js}
     */
    time(seconds: number): this;
    /**
     * Set the volume.
     * @param level Volume level (0.0-1.0)
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
     * The underlying HTML video element.
     *
     * @example
     * {@includeCode ../../../examples/TextmodeVideo/state/sketch.js}
     */
    get videoElement(): HTMLVideoElement;
    /**
     * Current playback time in seconds.
     *
     * @example
     * {@includeCode ../../../examples/TextmodeVideo/state/sketch.js}
     */
    get currentTime(): number;
    /**
     * Total duration of the video in seconds.
     *
     * @example
     * {@includeCode ../../../examples/TextmodeVideo/state/sketch.js}
     */
    get duration(): number;
    /**
     * Whether the video is currently playing.
     *
     * @example
     * {@includeCode ../../../examples/TextmodeVideo/state/sketch.js}
     */
    get isPlaying(): boolean;
    private get _el();
}
