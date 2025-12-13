import type { Material } from '../../../rendering/webgl/materials/Material';
import type { ITextmodeSource } from '../ITextmodeSource';
export interface ITextmodeVideo extends ITextmodeSource {
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
     * Get or create the material for rendering this video.
     * Always updates the material to ensure the latest video frame is used.
     * @ignore
     */
    $getMaterial(): Material;
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
    readonly texture: WebGLTexture;
    /**
     * The underlying HTML video element.
     */
    readonly videoElement: HTMLVideoElement;
    /**
     * Current playback time in seconds.
     */
    readonly currentTime: number;
    /**
     * Total duration of the video in seconds.
     */
    readonly duration: number;
    /**
     * Whether the video is currently playing.
     */
    readonly isPlaying: boolean;
}
