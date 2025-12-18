import type { TextmodeGrid } from '../Grid';
import type { Textmodifier } from '../Textmodifier';
import type { TextmodeColor } from '../TextmodeColor';
/**
 * Snapshot of a loading phase's state.
 */
export interface LoadingPhaseSnapshot {
    /** The unique identifier of the loading phase. */
    id: string;
    /** The label or name of the loading phase. */
    label: string;
    /**
     * The weight of this phase for calculating overall progress.
     */
    weight: number;
    /** The progress of the loading phase, represented as a number between 0 and 1. */
    progress: number;
    /** The current status of the loading phase. */
    status: 'pending' | 'running' | 'complete' | 'failed';
}
/**
 * Options for configuring the loading screen.
 *
 * @example
 * ```js
 * const tm = textmode.create({
 *  width: 800,
 *  height: 600,
 *  loadingScreen: {
 *    message: 'booting...',
 *  }
 * });
 * ```
 */
export interface LoadingScreenOptions {
    /**
     * Message to display on the loading screen.  Default is `'loading...'`.
     */
    message?: string;
    /**
     * Color tone of the loading screen. Can be 'auto', 'light', or 'dark'. Default is 'auto'.
     * <br/><br/>
     * Based on the background color the `textmode.js` canvas is rendered on, the loading screen
     * will automatically choose a light or dark theme when set to `'auto'`.
     */
    tone?: 'auto' | 'light' | 'dark';
    /**
     * Provides a custom renderer function for the loading screen,
     * overriding the default loading screen. The `context` parameter is a {@link LoadingScreenRendererContext} object.
     */
    renderer?: (context: LoadingScreenRendererContext) => void;
    /**
     * Type of transition effect. Default is `'fade'`.
     */
    transition?: 'none' | 'fade';
    /**
     * Duration of the transition effect in milliseconds. Default is `500`ms.
     */
    transitionDuration?: number;
}
/**
 * Context object passed to a loading screen renderer function.
 *
 * Can be used to create a custom loading screen to fit your needs.
 *
 * @example
 * ```ts
 * const t = textmode.create({
 *   width: 800,
 *   height: 600,
 *   loadingScreen: {
 *     message: 'loading...',
 *     renderer: (ctx) => {
 *       const { textmodifier: tm, grid, progress, message, transitionOpacity } = ctx;
 *
 *       // Clear the screen
 *       tm.background(0, 0, 0, Math.floor(transitionOpacity * 255));
 *
 *       // Position at top-left corner
 *       const x = -Math.floor(grid.cols / 2) + 2;
 *       const y = -Math.floor(grid.rows / 2) + 2;
 *
 *       tm.push();
 *       tm.translate(x, y, 0);
 *       tm.charColor(255, 255, 255, transitionOpacity * 255);
 *
 *       // Display message
 *       if (message) {
 *         for (let i = 0; i < message.length; i++) {
 *           tm.char(message[i]);
 *           tm.rect(1, 1);
 *           tm.translateX(1);
 *         }
 *       }
 *
 *       // Display progress bar
 *       tm.translate(-message.length, 2, 0);
 *       const barWidth = 20;
 *       const filled = Math.floor(progress * barWidth);
 *
 *       for (let i = 0; i < barWidth; i++) {
 *         tm.char(i < filled ? '=' : '-');
 *         tm.rect(1, 1);
 *         tm.translateX(1);
 *       }
 *
 *       tm.pop();
 *     }
 *   }
 * });
 * ```
 */
export interface LoadingScreenRendererContext {
    /** The Textmodifier instance for rendering text and graphics. */
    textmodifier: Textmodifier;
    /** The TextmodeGrid representing the screen grid. */
    grid: TextmodeGrid;
    /** The current loading progress (0-1). */
    progress: number;
    /** The elapsed time since the loading started, in milliseconds. */
    elapsedMs: number;
    /** The number of frames rendered since the loading started. */
    frameCount: number;
    /** The current loading message, if any. */
    message?: string;
    /** The palette of colors available for rendering based on the `theme`. */
    palette: TextmodeColor[];
    /** The current theme of the loading screen. */
    theme: LoadingScreenTheme;
    /** The phases of the loading process. */
    phases: LoadingPhaseSnapshot[];
    /** The opacity level for transition effects. */
    transitionOpacity: number;
    /** Indicates if the loading screen is in an error state. */
    isError: boolean;
    /** The error message to display, if any. */
    errorMessage?: string;
    /** Detailed error information, if any. */
    errorDetails?: string;
}
/**
 * A function that renders the loading screen.
 */
export type LoadingScreenRenderer = (context: LoadingScreenRendererContext) => void;
/**
 * Handle for managing a loading phase.
 */
export interface ILoadingPhase {
    /**
     * The unique identifier of the loading phase.
     */
    id: string;
    /**
     * The label or name of the loading phase.
     */
    label: string;
    /**
     * Update the progress of the loading phase.
     * @param progress A number between 0 and 1 representing the phase's progress.
     *
     * @example
     * ```ts
     * const t = textmode.create({ width: 800, height: 600, loadingScreen: { message: 'prepping...' } });
     *
     * // Create a phase and report progress as work proceeds
     * t.setup(async () => {
     *   const phase = t.loading.addPhase('assets', 1);
     *   phase.report(0.25);
     *   // ...load assets...
     *   phase.report(0.75);
     *   phase.complete();
     * });
     * ```
     */
    report(progress: number): void;
    /**
     * Mark the loading phase as complete.
     *
     * @example
     * ```ts
     * const t = textmode.create({ width: 800, height: 600, loadingScreen: { message: 'prepping...' } });
     *
     * t.setup(() => {
     *   const phase = t.loading.addPhase('init', 1);
     *   // Finish phase when work is done
     *   phase.complete();
     * });
     * ```
     */
    complete(): void;
    /**
     * Mark the loading phase as failed.
     *
     * This will put the loading manager into an error state, displaying the
     * error on the loading screen.
     *
     * @param error An optional error object or message describing the failure.
     *
     * @example
     * ```ts
     * const t = textmode.create({ width: 800, height: 600 });
     *
     * t.setup(async () => {
     *   const phase = t.loading.addPhase('fetch', 1);
     *   try {
     *     // simulate failure
     *     throw new Error('network error');
     *   } catch (err) {
     *     phase.fail(err instanceof Error ? err : String(err));
     *   }
     * });
     * ```
     */
    fail(error?: Error | string): void;
    /**
     * Track a task within this loading phase.
     * @param task A promise or function representing the task to track.
     * @returns A promise that resolves with the task's result.
     *
     * @example
     * ```ts
     * const t = textmode.create({ width: 800, height: 600, loadingScreen: { message: 'loading...' } });
     *
     * t.setup(async () => {
     *   const phase = t.loading.addPhase('video', 2);
     *   await phase.track(async () => {
     *     // do async work and report updates
     *     for (let i = 0; i <= 10; i++) {
     *       phase.report(i / 10);
     *       await new Promise((r) => setTimeout(r, 30));
     *     }
     *   });
     * });
     * ```
     */
    track<T>(task: Promise<T> | (() => Promise<T> | T)): Promise<T>;
}
/**
 * Theme settings for the loading screen.
 */
export interface LoadingScreenTheme {
    /** The color mode of the loading screen, either 'light' or 'dark'. */
    mode: 'light' | 'dark';
    /** The background color of the loading screen, or null for transparent. */
    background: [number, number, number, number] | null;
    /** The primary text color used on the loading screen. */
    textColor: number | string | TextmodeColor;
    /** The subtle text color used on the loading screen. */
    subtleColor: number | string | TextmodeColor;
}
/**
 * The state of the loading screen.
 * @ignore
 */
export type LoadingScreenState = 'disabled' | 'active' | 'done' | 'transitioning' | 'error';
