import type { GLRenderer } from '../../../rendering/webgl/core/Renderer';
import type { Material } from '../../../rendering/webgl/materials/Material';
import { TextmodeSource } from '../TextmodeSource';
import type { ITextmodeVideo } from './ITextmodeVideo';
import type { TextmodeConversionManager } from '../../conversion';
/**
 * Represents a video element for textmode rendering via {@link Textmodifier.loadVideo}.
 *
 * It can be drawn to the canvas via {@link Textmodifier.image}.
 *
 * A video uploaded currently runs through an adjustable brightness-converter that converts
 * the video frames into a textmode representation using characters.
 * Those adjustable options are available via chainable methods on this interface.
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
 *      // Draw the loaded video
 *      t.image(video);
 * });
 * ```
 */
export declare class TextmodeVideo extends TextmodeSource implements ITextmodeVideo {
    private _videoElement;
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
     * Dispose of this TextmodeVideo and free its resources.
     * @ignore
     */
    $dispose(): void;
    $updateTexture(): void;
    protected $getActiveTexture(): WebGLTexture;
    /**
     * Get or create the material for rendering this video.
     * Always updates the material to ensure the latest video frame is used.
     * @returns Material
     * @ignore
     */
    $getMaterial(): Material;
    protected $beforeMaterialUpdate(): void;
    /**
     * Create a TextmodeVideo from a video URL.
     * @param renderer GLRenderer instance
     * @param conversionManager Conversion manager
     * @param source Video URL
     * @param gridCols Number of grid columns
     * @param gridRows Number of grid rows
     * @returns Promise resolving to a TextmodeVideo instance
     * @ignore
     */
    static $fromSource(renderer: GLRenderer, conversionManager: TextmodeConversionManager, source: string, gridCols: number, gridRows: number): Promise<TextmodeVideo>;
    play(): Promise<void>;
    pause(): void;
    stop(): void;
    speed(rate: number): this;
    loop(shouldLoop?: boolean): this;
    time(seconds: number): this;
    volume(level: number): this;
    get videoElement(): HTMLVideoElement;
    get currentTime(): number;
    get duration(): number;
    get isPlaying(): boolean;
}
