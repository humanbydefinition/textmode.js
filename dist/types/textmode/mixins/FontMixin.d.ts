import type { Mixin } from './TextmodifierMixin';
/**
 * Interface for font capabilities that will be mixed into Textmodifier
 */
export interface FontCapabilities {
    /**
     * Update the font used for rendering.
     * @param fontSource The URL of the font to load.
     *
     * @example
     * ```javascript
     * // Fetch a canvas element to apply textmode rendering to
     * const canvas = document.querySelector('canvas#myCanvas');
     *
     * // Create a Textmodifier instance
     * const textmodifier = await textmode.create(canvas);
     *
     * // Load a custom font from a URL
     * await textmodifier.loadFont('https://example.com/fonts/myfont.ttf');
     *
     * // Local font example
     * // await textmodifier.loadFont('./fonts/myfont.ttf');
     * ```
     */
    loadFont(fontSource: string): Promise<void>;
    /**
     * Set the font size used for rendering.
     * @param size The font size to set.
     *
     * @example
     * ```javascript
     * // Fetch a canvas element to apply textmode rendering to
     * const canvas = document.querySelector('canvas#myCanvas');
     *
     * // Create a Textmodifier instance
     * const textmodifier = await textmode.create(canvas);
     *
     * // Set the font size to 24
     * textmodifier.fontSize(24);
     * ```
     */
    fontSize(size: number): void;
}
/**
 * Mixin that adds font capabilities to a class
 * @param Base The base class to extend
 * @returns Extended class with font capabilities
 */
export declare const FontMixin: Mixin<FontCapabilities>;
