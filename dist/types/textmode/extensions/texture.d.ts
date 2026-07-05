import { GLFramebuffer as TextmodeFramebuffer } from '../../rendering';
import { TextmodeSource } from '../media/TextmodeSource';
declare module '../Textmodifier' {
    interface Textmodifier {
        /**
         * Bind a media source or framebuffer as the texture for later geometry draws.
         *
         * Textured geometry samples the source, converts brightness into glyphs, and
         * uses source conversion settings such as `characters`, `brightnessRange`,
         * `charColorMode`, and `cellColorMode`.
         *
         * @param source Image, video, dynamic texture source, or textmode framebuffer.
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/texture/sketch.js}
         *
         * @see {@link https://code.textmode.art/api/textmode.js/classes/Textmodifier/methods/texture | Textmodifier.texture API reference}
         */
        texture(source: TextmodeSource): void;
        texture(source: TextmodeFramebuffer): void;
        /**
         * Clear the active texture for later geometry draws.
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/noTexture/sketch.js}
         *
         * @see {@link https://code.textmode.art/api/textmode.js/classes/Textmodifier/methods/noTexture | Textmodifier.noTexture API reference}
         */
        noTexture(): void;
    }
}
