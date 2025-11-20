import type { TextmodeVideoPreloadCallbacks, TextmodeVideoPreloadStrategy } from './types';
/**
 * Handles extracting still frames from an {@link HTMLVideoElement} into WebGL textures
 * so that {@link TextmodeVideo} can render deterministic, frame-accurate playback.
 */
export declare class TextmodeVideoPreloader {
    private readonly _gl;
    private readonly _videoElement;
    private _frameRate;
    private _totalFrames;
    private _isPreloaded;
    private _preloadedFrames;
    private _lastProgressBucket;
    constructor(gl: WebGL2RenderingContext, videoElement: HTMLVideoElement);
    get isPreloaded(): boolean;
    get totalFrames(): number;
    get frameRate(): number | null;
    get textures(): readonly WebGLTexture[];
    dispose(): void;
    preload(frameRate: number, callbacks?: TextmodeVideoPreloadCallbacks): Promise<TextmodeVideoPreloadStrategy>;
    private _initializePreloadState;
    private _finalizePreloadSuccess;
    private _captureSourceToTexture;
    private _reportPreloadProgress;
    private _tryPreloadWithTrackProcessor;
    private _preloadWithLegacySeeking;
    private _waitForSeek;
    private _deletePreloadedTextures;
}
