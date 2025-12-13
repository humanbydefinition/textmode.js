import type { GLRenderer } from '../../rendering/webgl/core/Renderer';
import { TextmodeSource } from './TextmodeSource';
import type { TextmodeConversionManager } from '../conversion';
/**
 * Represents an image uploaded for textmode rendering via {@link Textmodifier.loadImage}.
 *
 * It can be drawn to the canvas via {@link Textmodifier.image}.
 *
 * An image uploaded currently runs through an adjustable brightness-converter that converts
 * the original image into a textmode representation using characters.
 * Those adjustable options are available via chainable methods on this class.
 *
 * @example
 * ```javascript
 * const t = textmode.create({
 *     width: 800,
 *     height: 600,
 * });
 *
 * let img;
 *
 * t.setup(async () => {
 *     img = await t.loadImage('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80');
 *     img.characters(" .:-=+*#%@");
 *     // ... other adjustments like img.flipX(boolean), img.cellColorMode('sampled' | 'fixed'), etc.
 *     // (can also be chained or updated during runtime)
 * });
 *
 * t.draw(() => {
 *     t.background(0);
 *
 *     // Draw the loaded image
 *     t.image(img);
 * });
 * ```
 */
export declare class TextmodeImage extends TextmodeSource {
    private constructor();
    /**
     * Create a TextmodeImage from an HTML image/video/canvas element.
     * Texture parameters use NEAREST and CLAMP to align with grid sampling.
     * @ignore
     */
    static $fromSource(renderer: GLRenderer, conversionManager: TextmodeConversionManager, source: HTMLImageElement | HTMLCanvasElement | HTMLVideoElement, gridCols: number, gridRows: number): TextmodeImage;
    protected $getActiveTexture(): WebGLTexture;
}
