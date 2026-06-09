import type { GLRenderer } from '../../rendering/webgl/core/Renderer';
import { TextmodeSource } from './TextmodeSource';
import type { TextmodeConversionManager } from '../conversion';
import type { TextmodeColorResolver } from '../color/TextmodeColor';
/**
 * Dynamic texture source for external canvas or video content.
 *
 * Create one with {@link Textmodifier.createTexture} and draw it with
 * {@link Textmodifier.image}. The texture refreshes each frame so it can mirror
 * renderers such as three.js, p5.js, Babylon.js, or hydra-synth.
 */
export declare class TextmodeTexture extends TextmodeSource {
    protected _source: HTMLCanvasElement | HTMLVideoElement;
    protected constructor(gl: WebGL2RenderingContext, renderer: GLRenderer, texture: WebGLTexture, conversionManager: TextmodeConversionManager, originalWidth: number, originalHeight: number, gridCols: number, gridRows: number, source: HTMLCanvasElement | HTMLVideoElement, resolveColor?: TextmodeColorResolver);
    /**
     * Source element this texture captures.
     *
     * @example
     * {@includeCode ../../../examples/TextmodeTexture/source/sketch.js}
     */
    get source(): HTMLCanvasElement | HTMLVideoElement;
}
