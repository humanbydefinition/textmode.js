import type { TextmodeGrid } from '../../../grid/TextmodeGrid';
import type { Textmodifier } from '../../../Textmodifier';
/**
 * Options for configuring the loading screen.
 */
export interface LoadingScreenOptions {
    /**
     * Transition mode for loading completion. Default is `'fade'`.
     * Use `'none'` to skip the fade (treated as `transitionDuration: 0`).
     */
    transition?: 'none' | 'fade';
    /**
     * Fade duration in milliseconds. Default is `500`.
     */
    transitionDuration?: number;
}
/**
 * Context object passed to loading renderer callbacks.
 */
export interface LoadingScreenRendererContext {
    /** The Textmodifier instance for rendering text and graphics. */
    textmodifier: Textmodifier;
    /** Grid metadata for positioning. */
    grid: TextmodeGrid;
}
/**
 * Internal state of the loading screen.
 */
export type LoadingScreenState = 'disabled' | 'active' | 'done' | 'transitioning';
