/**
 * Options for preloading video frames in {@link TextmodeVideo}.
 *
 * When providing this options object as a second argument to {@link Textmodifier.loadVideo},
 * you can choose to preload all video frames at a specified frame rate before using the video.
 *
 * When preloading, the video will not play live asynchronously. Instead, all frames will be captured
 * upfront, allowing for frame-accurate seeking and rendering.
 *
 * This is especially useful for scenarios where precise frame control is needed,
 * like capturing GIFs/videos from textmode.js canvas using the `textmode.export.js` add-on library without
 * missing frames due to asynchronous video playback.
 *
 * Preloading takes time proportional to the video length and frame rate, which introduces significant delays
 * before the sketch can start rendering. Therefore, it is recommended to use this feature only when intending
 * to capture or export frames, rather than for real-time playback.
 */
export interface TextmodeVideoOptions {
    /** Frame rate to use when preloading video frames. If not specified, video will not be preloaded. */
    frameRate?: number;
    /** Callback invoked periodically during preloading to report progress. */
    onProgress?: (progress: TextmodeVideoPreloadProgress) => void;
    /** Callback invoked once preloading is complete. */
    onComplete?: (summary: TextmodeVideoPreloadComplete) => void;
    /** Callback invoked if an error occurs during preloading. */
    onError?: (error: Error) => void;
}
export type TextmodeVideoPreloadStrategy = 'captureStream' | 'seeking';
export interface TextmodeVideoPreloadProgress {
    percent: number;
    loadedFrames: number;
    totalFrames: number;
    strategy: TextmodeVideoPreloadStrategy;
}
export interface TextmodeVideoPreloadComplete {
    totalFrames: number;
    strategy: TextmodeVideoPreloadStrategy;
}
export type TextmodeVideoPreloadCallbacks = {
    onProgress?: (progress: TextmodeVideoPreloadProgress) => void;
    onComplete?: (summary: TextmodeVideoPreloadComplete) => void;
    onError?: (error: Error) => void;
};
