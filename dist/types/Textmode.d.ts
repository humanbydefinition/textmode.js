import { type TextmodeErrorLevel } from './errors';
import { Textmodifier } from './textmode/Textmodifier';
import type { TextmodeOptions } from './textmode/types';
/**
 * The main entry point for the `textmode.js` library.
 *
 * Provides static methods for creating {@link Textmodifier} instances and managing global settings.
 */
export declare class Textmode {
    private constructor();
    /**
     * Create a new {@link Textmodifier} instance with optional configuration.
     * @param opts Configuration options for the Textmodifier instance
     * @returns A new Textmodifier instance
     *
     * @example
     * ```javascript
     * const t = textmode.create({ width: 800, height: 600, fontSize: 16 });
     *
     * t.draw(() => {
     *     t.background(0);
     *     t.char("x");
     *     t.rotateZ(t.frameCount);
     *     t.rect(10, 10);
     * });
     * ```
     * @exampleAuthor
     * <div style="display:flex;align-items:center;gap:0.75rem;flex-wrap:wrap;">
     *   <img src="https://github.com/humanbydefinition.png" alt="@humanbydefinition avatar" width="72" height="72" style="border-radius:12px;box-shadow:0 2px 6px rgba(0,0,0,0.35);" />
     *   <div style="display:flex;flex-direction:column;gap:0.25rem;">
     *     <strong><a href="https://github.com/humanbydefinition">@humanbydefinition</a></strong>
     *     <span style="font-size:0.95em;">
     *       📷 <a href="https://instagram.com/humanbydefinition">Instagram</a>
     *       &nbsp;•&nbsp; 🐘 <a href="https://mastodon.social/@humanbydefinition">Mastodon</a>
     *       &nbsp;•&nbsp; 🦋 <a href="https://bsky.app/profile/humanbydefinition.bsky.social">BlueSky</a>
     *     </span>
     *   </div>
     * </div>
     */
    static create(opts?: TextmodeOptions): Textmodifier;
    /**
     * Set the global error handling level for the library. This applies to all {@link Textmodifier} instances present.
     *
     * @param level The error handling level to set.
     *
     * @example
     * ```js
     * // Set error level to WARNING
     * textmode.setErrorLevel(TextmodeErrorLevel.WARNING);
     * ```
     */
    static setErrorLevel(level: TextmodeErrorLevel): void;
    /**
     * Returns the version of `textmode.js` being used.
     *
     * @example
     * ```js
     * console.log(textmode.version); // "1.0.0"
     * ```
     */
    static get version(): string;
}
