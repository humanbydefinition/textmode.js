import { GLFramebuffer } from '../../rendering';
import type { TextmodeFramebufferOptions } from '../../rendering/webgl';
import { TextmodeImage } from '../loadables/TextmodeImage';
import { TextmodeTexture } from '../loadables/TextmodeTexture';
import { TextmodeVideo } from '../loadables/TextmodeVideo';
declare module '../Textmodifier' {
    interface Textmodifier {
        /**
         * Create a new framebuffer for offscreen rendering.
         *
         * The framebuffer uses the same MRT structure as the main rendering pipeline.
         * By default it allocates 3 attachments (character + color data).
         *
         * @param options Configuration options for the framebuffer.
         * @returns A new Framebuffer instance.
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/createFramebuffer/sketch.js}
         */
        createFramebuffer(options: TextmodeFramebufferOptions): GLFramebuffer;
        /**
         * Draw a TextmodeFramebuffer, TextmodeImage, TextmodeVideo, or TextmodeTexture to the current render target.
         *
         * @param source The TextmodeFramebuffer, TextmodeImage, TextmodeVideo, or TextmodeTexture to render
         * @param width Width in grid cells to potentially scale the content (defaults to ideal fit, respecting aspect ratio)
         * @param height Height in grid cells to potentially scale the content (defaults to ideal fit, respecting aspect ratio)
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/image/sketch.js}
         */
        image(source: GLFramebuffer | TextmodeImage | TextmodeVideo | TextmodeTexture, width?: number, height?: number): void;
        /**
         * Load an image and return a TextmodeImage that can be drawn with image().
         *
         * The loaded image can be rendered to the canvas using the {@link image} method.
         * This function returns a Promise that resolves when the image has loaded.
         *
         * @param src URL of the image file
         * @returns A Promise that resolves to a TextmodeImage object
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/loadImage/sketch.js}
         */
        loadImage(src: string): Promise<TextmodeImage>;
        /**
         * Load a video and return a TextmodeVideo that can be drawn with image().
         * @param src URL of the video file
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/loadVideo/sketch.js}
         */
        loadVideo(src: string): Promise<TextmodeVideo>;
        /**
         * Create a texture from an external canvas or video element for integration with other WebGL libraries.
         *
         * This method enables seamless integration with libraries like three.js, p5.js, Babylon.js,
         * hydra-synth, or any library that renders to a canvas element.
         *
         * The texture automatically updates each frame to capture the latest content from the source.
         *
         * @param source Canvas or video element from an external library
         * @returns A TextmodeTexture that can be drawn with image()
         */
        createTexture(source: HTMLCanvasElement | HTMLVideoElement): TextmodeTexture;
    }
}
