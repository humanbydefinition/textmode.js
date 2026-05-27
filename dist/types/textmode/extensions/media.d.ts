import { GLFramebuffer } from '../../rendering';
import type { TextmodeFramebufferOptions } from '../../rendering/webgl';
import { TextmodeImage } from '../media/TextmodeImage';
import { TextmodeTexture } from '../media/TextmodeTexture';
import { TextmodeVideo } from '../media/TextmodeVideo';
declare module '../Textmodifier' {
    interface Textmodifier {
        /**
         * Create a framebuffer for offscreen rendering.
         *
         * The framebuffer uses the same MRT structure as the main rendering pipeline.
         * By default it allocates 3 attachments (character + color data).
         *
         * @param options Framebuffer configuration.
         * @returns The created framebuffer.
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/createFramebuffer/sketch.js}
         */
        createFramebuffer(options: TextmodeFramebufferOptions): GLFramebuffer;
        /**
         * Draw a framebuffer, image, video, or texture source to the current render target.
         *
         * @param source Source to render.
         * @param width Width in grid cells. Defaults to an aspect-ratio-preserving fit.
         * @param height Height in grid cells. Defaults to an aspect-ratio-preserving fit.
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/image/sketch.js}
         */
        image(source: GLFramebuffer | TextmodeImage | TextmodeVideo | TextmodeTexture, width?: number, height?: number): void;
        /**
         * Load an image source that can be drawn with {@link image}.
         *
         * @param src Image URL.
         * @returns The loaded TextmodeImage.
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/loadImage/sketch.js}
         */
        loadImage(src: string): Promise<TextmodeImage>;
        /**
         * Load a video source that can be drawn with {@link image}.
         * @param src Video URL.
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/loadVideo/sketch.js}
         */
        loadVideo(src: string): Promise<TextmodeVideo>;
        /**
         * Create a dynamic texture from an external canvas or video element.
         *
         * Use this to sample canvases or videos rendered by libraries such as three.js,
         * p5.js, Babylon.js, or hydra-synth.
         *
         * The texture automatically updates each frame to capture the latest content from the source.
         *
         * @param source Canvas or video element to capture.
         * @returns A TextmodeTexture that can be drawn with {@link image}.
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/createTexture/sketch.js}
         */
        createTexture(source: HTMLCanvasElement | HTMLVideoElement): TextmodeTexture;
    }
}
