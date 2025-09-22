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
     * // Create a Textmodifier instance
     * const textmodifier = textmode.create();
     *
     * // Load a custom font from a URL
     *  textmodifier.loadFont('https://example.com/fonts/myfont.ttf');
     *
     * // Local font example
     * // textmodifier.loadFont('./fonts/myfont.ttf');
     * ```
     */
    loadFont(fontSource: string): Promise<void>;
    /**
     * Set the font size used for rendering.
     * @param size The font size to set.
     *
     * @example
     * ```javascript
     * // Create a Textmodifier instance
     * const textmodifier = textmode.create();
     *
     * // Set the font size to 32
     * textmodifier.fontSize(32);
     * ```
     */
    fontSize(size: number): void;
    /**
     * Get the RGB shader color of a specific character in the current font.
     *
     * Useful for custom shaders to control the character to render.
     *
     * @param char The character to get the color for.
     * @returns An array representing the RGB color, or null if the character is not found.
     * @example
     * ```javascript
     * // Create a Textmodifier instance
     * const textmodifier = textmode.create();
     *
     * // Get the color of the character 'A'
     * textmodifier.setup(() => {
     *   const color = textmodifier.glyphColor('A');
     *   console.log(color); // e.g., [1, 0, 0] for red
     * });
     * ```
     */
    glyphColor(char: string): [number, number, number] | null;
    /**
     * Get the RGB shader colors of all characters in a string for the current font.
     *
     * Useful for custom shaders to control the characters to render.
     *
     * @param str The string to get the colors for.
     * @returns An array of RGB color arrays, or null if a character is not found.
     * @example
     * ```javascript
     * // Create a Textmodifier instance
     * const textmodifier = textmode.create();
     *
     * // Get the colors of the string 'Hello'
     * textmodifier.setup(() => {
     *   const colors = textmodifier.glyphColors('Hello');
     *   console.log(colors); // e.g., [[0.1, 0, 0], ...]
     * });
     * ```
     */
    glyphColors(str: string): ([number, number, number] | null)[];
}
/**
 * Mixin that adds font capabilities to a class
 * @param Base The base class to extend
 * @returns Extended class with font capabilities
 */
export declare const FontMixin: Mixin<FontCapabilities>;
