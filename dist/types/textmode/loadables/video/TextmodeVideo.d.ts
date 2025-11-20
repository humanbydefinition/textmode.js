import type { GLRenderer } from '../../../rendering/webgl/core/Renderer';
import type { Material } from '../../../rendering/webgl/materials/Material';
import type { TextmodeFont } from '../font/TextmodeFont';
import { TextmodeSource } from '../TextmodeSource';
import type { TextmodeVideoOptions } from './types';
export type { TextmodeVideoOptions, TextmodeVideoPreloadStrategy, TextmodeVideoPreloadProgress, TextmodeVideoPreloadComplete, } from './types';
/**
 * Represents a video element for textmode rendering via {@link Textmodifier.loadVideo}.
 *
 * It can be drawn to the canvas via {@link Textmodifier.image}.
 *
 * A video uploaded currently runs through an adjustable brightness-converter that converts
 * the video frames into a textmode representation using characters.
 * Those adjustable options are available via chainable methods on this class.
 * ```javascript
 * const t = textmode.create({
 *     width: 800,
 *     height: 600,
 * });
 *
 * let video;
 *
 * t.setup(async () => {
 *     video = await t.loadVideo('https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4');
 *     // Start playback and enable looping so the video keeps playing
 *     video.play();
 *     video.loop();
 *
 *     video.characters(" .:-=+*#%@");
 *     // ... other adjustments like video.flipX(boolean), video.cellColorMode('sampled' | 'fixed'), etc.
 *     // (can also be chained or updated during runtime)
 * });
 *
 * t.draw(() => {
 *     t.background(0);
 *
 *     if (video) {
 *         // Draw the loaded video
 *         t.image(video);
 *     }
 * });
 * ```
 */
export declare class TextmodeVideo extends TextmodeSource {
    private _videoElement;
    private _currentFrameIndex;
    private _preloader;
    /**
     * Create a new TextmodeVideo instance.
     * @param gl WebGL2 rendering context
     * @param renderer GLRenderer instance
     * @param texture WebGL texture for video frames
     * @param videoElement The HTML video element
     * @param originalWidth Original video width in pixels
     * @param originalHeight Original video height in pixels
     * @param gridCols Number of columns in the grid (for auto-sizing)
     * @param gridRows Number of rows in the grid (for auto-sizing)
     *
     * @ignore
     */
    constructor(gl: WebGL2RenderingContext, renderer: GLRenderer, texture: WebGLTexture, font: TextmodeFont, videoElement: HTMLVideoElement, originalWidth: number, originalHeight: number, gridCols: number, gridRows: number);
    /**
     * Dispose of GPU resources and cleanup video element.
     * @ignore
     */
    $dispose(): void;
    /**
     * Update the texture with the current video frame if needed.
     * For preloaded videos, this returns the appropriate frame texture.
     * For live videos, this updates the texture with current video data.
     * @ignore
     */
    $updateTexture(): void;
    /**
     * Get the active texture for the current frame.
     * For preloaded videos, returns the texture at the current frame index.
     * For live videos, returns the live texture.
     * @ignore
     */
    protected $getActiveTexture(): WebGLTexture;
    /**
     * Get or create the material for rendering this video.
     * Always updates the material to ensure the latest video frame is used.
     * @ignore
     */
    $getMaterial(): Material;
    protected $beforeMaterialUpdate(): void;
    /**
     * For preloaded videos, set or get the current frame index.
     * When called without arguments, returns this video instance for use with t.image().
     * When called with an index, sets the frame and returns this instance.
     *
     * The frame index automatically wraps using modulo, so you can pass t.frameCount directly
     * and it will loop through the video frames seamlessly.
     *
     * For non-preloaded videos, this method does nothing and returns the instance.
     *
     * @param index Optional frame index to set (0-based, automatically wraps)
     * @returns This instance for chaining.
     *
     * @example
     * ```javascript
     * // Draw specific frame
     * t.image(video.frame(0), x, y);
     *
     * // Draw frame based on frameCount (automatically wraps)
     * t.image(video.frame(t.frameCount), x, y);
     *
     * video.frame(t.frameCount);
     * t.image(video, x, y);
     * ```
     */
    frame(index?: number): this;
    /**
     * Create a TextmodeVideo instance from a video source (URL or HTMLVideoElement).
     * @param renderer GLRenderer instance
     * @param source Video URL string or HTMLVideoElement
     * @param gridCols Number of columns in the grid
     * @param gridRows Number of rows in the grid
     * @param options Optional preload configuration (frameRate, onProgress, onComplete, onError).
     * @returns Promise resolving to TextmodeVideo instance
     * @ignore
     */
    static $fromSource(renderer: GLRenderer, font: TextmodeFont, source: string, gridCols: number, gridRows: number, options?: TextmodeVideoOptions): Promise<TextmodeVideo>;
    /**
     * Play the video.
     * @returns Promise that resolves when playback starts
     */
    play(): Promise<void>;
    /**
     * Pause the video.
     */
    pause(): void;
    /**
     * Stop the video and reset to beginning.
     */
    stop(): void;
    /**
     * Set the playback speed.
     * @param rate Playback rate (1.0 = normal speed)
     */
    speed(rate: number): this;
    /**
     * Set whether the video should loop.
     * @param shouldLoop Whether to loop (defaults to true)
     */
    loop(shouldLoop?: boolean): this;
    /**
     * Set the current time position in the video.
     * @param seconds Time in seconds
     */
    time(seconds: number): this;
    /**
     * Set the volume.
     * @param level Volume level (0.0-1.0)
     */
    volume(level: number): this;
    /**
     * WebGL texture handle containing the current video frame.
     */
    get texture(): WebGLTexture;
    /**
     * Ideal width to draw the video at (in grid cells), calculated to fit the grid while preserving aspect ratio.
     */
    get width(): number;
    /**
     * Ideal height to draw the video at (in grid cells), calculated to fit the grid while preserving aspect ratio.
     */
    get height(): number;
    /**
     * Original pixel width of the video.
     */
    get originalWidth(): number;
    /**
     * Original pixel height of the video.
     */
    get originalHeight(): number;
    /**
     * The underlying HTML video element.
     */
    get videoElement(): HTMLVideoElement;
    /**
     * Current playback time in seconds.
     */
    get currentTime(): number;
    /**
     * Total duration of the video in seconds.
     */
    get duration(): number;
    /**
     * Whether the video is currently playing.
     */
    get isPlaying(): boolean;
    /**
     * Total number of preloaded frames. Returns 0 for non-preloaded videos.
     */
    get totalFrames(): number;
}
