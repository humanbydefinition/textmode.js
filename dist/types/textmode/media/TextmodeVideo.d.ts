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
 *
 * @see {@link https://code.textmode.art/api/textmode.js/namespaces/media/classes/TextmodeVideo | media.TextmodeVideo API reference}
 */
export declare class TextmodeVideo extends TextmodeTexture {
    private constructor();
    /**
     * Dispose the video source and release the backing media element.
     *
     * @example
     * {@includeCode ../../../examples/TextmodeVideo/dispose/sketch.js}
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/media/classes/TextmodeVideo/methods/dispose | media.TextmodeVideo.dispose API reference}
     */
    dispose(): void;
    /**
     * Start video playback.
     * @returns Promise that resolves when playback starts.
     *
     * @example
     * {@includeCode ../../../examples/TextmodeVideo/play/sketch.js}
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/media/classes/TextmodeVideo/methods/play | media.TextmodeVideo.play API reference}
     */
    play(): Promise<void>;
    /**
     * Pause video playback.
     *
     * @example
     * {@includeCode ../../../examples/TextmodeVideo/pause/sketch.js}
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/media/classes/TextmodeVideo/methods/pause | media.TextmodeVideo.pause API reference}
     */
    pause(): void;
    /**
     * Stop the video and seek to the beginning.
     *
     * @example
     * {@includeCode ../../../examples/TextmodeVideo/stop/sketch.js}
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/media/classes/TextmodeVideo/methods/stop | media.TextmodeVideo.stop API reference}
     */
    stop(): void;
    /**
     * Set playback speed.
     * @param rate Playback rate (`1.0` is normal speed).
     *
     * @example
     * {@includeCode ../../../examples/TextmodeVideo/speed/sketch.js}
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/media/classes/TextmodeVideo/methods/speed | media.TextmodeVideo.speed API reference}
     */
    speed(rate: number): this;
    /**
     * Set whether the video loops.
     * @param shouldLoop Whether to loop. Defaults to `true`.
     *
     * @example
     * {@includeCode ../../../examples/TextmodeVideo/loop/sketch.js}
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/media/classes/TextmodeVideo/methods/loop | media.TextmodeVideo.loop API reference}
     */
    loop(shouldLoop?: boolean): this;
    /**
     * Seek to a playback time.
     * @param seconds Time in seconds.
     *
     * @example
     * {@includeCode ../../../examples/TextmodeVideo/time/sketch.js}
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/media/classes/TextmodeVideo/methods/time | media.TextmodeVideo.time API reference}
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
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/media/classes/TextmodeVideo/methods/volume | media.TextmodeVideo.volume API reference}
     */
    volume(level: number): this;
    /**
     * Underlying HTML video element.
     *
     * @example
     * {@includeCode ../../../examples/TextmodeVideo/videoElement/sketch.js}
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/media/classes/TextmodeVideo/accessors/videoElement | media.TextmodeVideo.videoElement API reference}
     */
    get videoElement(): HTMLVideoElement;
    /**
     * Current playback time in seconds.
     *
     * @example
     * {@includeCode ../../../examples/TextmodeVideo/currentTime/sketch.js}
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/media/classes/TextmodeVideo/accessors/currentTime | media.TextmodeVideo.currentTime API reference}
     */
    get currentTime(): number;
    /**
     * Total video duration in seconds.
     *
     * @example
     * {@includeCode ../../../examples/TextmodeVideo/duration/sketch.js}
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/media/classes/TextmodeVideo/accessors/duration | media.TextmodeVideo.duration API reference}
     */
    get duration(): number;
    /**
     * Whether the video is currently playing.
     *
     * @example
     * {@includeCode ../../../examples/TextmodeVideo/isPlaying/sketch.js}
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/media/classes/TextmodeVideo/accessors/isPlaying | media.TextmodeVideo.isPlaying API reference}
     */
    get isPlaying(): boolean;
    private get _el();
}
