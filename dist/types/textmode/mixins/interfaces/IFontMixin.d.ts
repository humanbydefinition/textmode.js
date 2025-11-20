/**
 * Interface for font capabilities that will be mixed into Textmodifier
 */
export interface IFontMixin {
    /**
     * Update the font used for rendering.
     * @param fontSource The URL of the font to load.
     *
     * @example
     * ```javascript
     * // Create a Textmodifier instance
     * const t = textmode.create();
     *
     * t.setup(async () => {
     *  // Load a custom font from a URL
     *  await t.loadFont('https://example.com/fonts/myfont.ttf');
     *
     *  // Local font example
     *  // await t.loadFont('./fonts/myfont.ttf');
     * });
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
     * const t = textmode.create();
     *
     * t.setup(() => {
     *  // Set the font size to 32
     *  t.fontSize(32);
     * });
     *
     * t.draw(() => {
     *  t.background(0);
     *  t.char('A');
     *  t.rect(5, 5);
     * });
     * ```
     */
    fontSize(size: number): void;
}
