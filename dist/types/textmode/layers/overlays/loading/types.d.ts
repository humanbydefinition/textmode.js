import type { TextmodeGrid } from '../../../grid/TextmodeGrid';
import type { Textmodifier } from '../../../Textmodifier';
/**
 * Options for configuring the loading screen.
 *
 * @see {@link https://code.textmode.art/api/textmode.js/namespaces/loading/interfaces/LoadingScreenOptions | loading.LoadingScreenOptions API reference}
 */
export interface LoadingScreenOptions {
    /**
     * Transition mode for loading completion. Default is `'fade'`.
     * Use `'none'` to skip the fade (treated as `transitionDuration: 0`).
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/loading/interfaces/LoadingScreenOptions#transition | loading.LoadingScreenOptions.transition API reference}
     */
    transition?: 'none' | 'fade';
    /**
     * Fade duration in milliseconds. Default is `500`.
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/loading/interfaces/LoadingScreenOptions#transitionduration | loading.LoadingScreenOptions.transitionDuration API reference}
     */
    transitionDuration?: number;
}
/**
 * Context object passed to loading renderer callbacks.
 *
 * @see {@link https://code.textmode.art/api/textmode.js/namespaces/loading/interfaces/LoadingScreenRendererContext | loading.LoadingScreenRendererContext API reference}
 */
export interface LoadingScreenRendererContext {
    /**
     * The Textmodifier instance for rendering text and graphics.
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/loading/interfaces/LoadingScreenRendererContext#textmodifier | loading.LoadingScreenRendererContext.textmodifier API reference}
     */
    textmodifier: Textmodifier;
    /**
     * Grid metadata for positioning.
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/loading/interfaces/LoadingScreenRendererContext#grid | loading.LoadingScreenRendererContext.grid API reference}
     */
    grid: TextmodeGrid;
}
/**
 * Internal state of the loading screen.
 *
 * @see {@link https://code.textmode.art/api/textmode.js/namespaces/loading/type-aliases/LoadingScreenState | loading.LoadingScreenState API reference}
 */
export type LoadingScreenState = 'disabled' | 'active' | 'done' | 'transitioning';
