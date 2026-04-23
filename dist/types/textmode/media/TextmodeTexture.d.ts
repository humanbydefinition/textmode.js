import type { GLRenderer } from '../../rendering/webgl/core/Renderer';
import { TextmodeSource } from './TextmodeSource';
import type { TextmodeConversionManager } from '../conversion';
/**
 * Represents an external texture source for textmode rendering via {@link Textmodifier.createTexture}.
 *
 * This class enables integration with other WebGL-based libraries like three.js, p5.js, Babylon.js,
 * hydra-synth, or any library that renders to a canvas element.
 *
 * It can be drawn to the canvas via {@link Textmodifier.image}.
 *
 * The texture automatically updates each frame to capture the latest content from the source canvas or video.
 */
export declare class TextmodeTexture extends TextmodeSource {
    protected _source: HTMLCanvasElement | HTMLVideoElement;
    protected constructor(gl: WebGL2RenderingContext, renderer: GLRenderer, texture: WebGLTexture, conversionManager: TextmodeConversionManager, originalWidth: number, originalHeight: number, gridCols: number, gridRows: number, source: HTMLCanvasElement | HTMLVideoElement);
    /**
     * The source element this texture captures from.
     *
     * @example
     * {@includeCode ../../../examples/Textmodifier/createTexture/sketch.js}
     */
    get source(): HTMLCanvasElement | HTMLVideoElement;
}
