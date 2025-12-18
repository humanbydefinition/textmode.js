import type { Textmodifier } from '../Textmodifier';
import type { RGBA } from '../utils/cssColor';
import { LoadingPhase } from './LoadingPhase';
import type { LoadingScreenOptions } from './types';
/**
 * Manages the loading screen display and state. Can be accessed via {@link Textmodifier.loading}.
 */
export declare class LoadingScreenManager {
    private readonly _textmodifier;
    private readonly _options;
    private readonly _stateMachine;
    private readonly _phaseTracker;
    private readonly _transition;
    private readonly _loadingAnimationController;
    private _loadingLayer;
    private _customRenderer;
    private _palette;
    private _theme;
    private _startTime;
    private _loadingFrameCount;
    private _isRendering;
    private _isInitialized;
    /**
     * Initializes a new LoadingScreenManager.
     * @param textmodifier Textmodifier instance to render on.
     * @param opts Loading screen options.
     * @param canvasBackground Background color of the canvas.
     * @ignore
     */
    constructor(textmodifier: Textmodifier, opts: LoadingScreenOptions | undefined, canvasBackground: RGBA | null);
    /**
     * Initialize loading screen resources using a TextmodeLayer.
     * Must be called after the renderer is ready.
     * @param fontSource Optional font source for the loading screen
     * @ignore
     */
    $initialize(): Promise<void>;
    /**
     * Indicates whether the loading screen should render this frame.
     * @ignore
     */
    get $shouldRender(): boolean;
    /**
     * Start the independent loading screen animation loop.
     * This runs independently of the user's animation loop.
     * @ignore
     */
    $start(): void;
    /**
     * Stop the independent loading screen animation loop.
     * @ignore
     */
    $stop(): void;
    /**
     * Handle canvas resize during loading.
     * Delegates to the loading layer which handles grid and framebuffer resizing.
     * @ignore
     */
    $resize(): void;
    /**
     * Dispose of the loading screen manager and clean up resources.
     * @ignore
     */
    $dispose(): void;
    /**
     * Get the current overall loading progress (0-1).
     *
     * @example
     * ```javascript
     * const t = textmode.create({
     *   width: 800,
     *   height: 600,
     *   loadingScreen: { message: 'starting...' }
     * });
     *
     * // In setup we can start a phase and read the overall progress
     * t.setup(async () => {
     *   const phase = t.loading.addPhase('assets', 1);
     *   phase.report(0.5); // half complete for the phase
     *
     *   // The `progress` accessor reports the global progress across all phases
     *   console.log(`Loading: ${Math.round(t.loading.progress * 100)}%`);
     * });
     * ```
     */
    get progress(): number;
    /**
     * Get or set the loading screen message.
     * @param next Optional new message to set.
     * @returns The current loading screen message.
     *
     * @example
     * ```javascript
     * const t = textmode.create({
     *   width: 800,
     *   height: 600,
     *   loadingScreen: { message: 'loading...' }
     * });
     *
     * t.setup(() => {
     *   // Update the message visible on the loading screen
     *   t.loading.message('preloading video...');
     *
     *   // Read the current message (useful in custom loading screen implementations)
     *   const msg = t.loading.message();
     *   console.log(msg);
     * });
     * ```
     */
    message(next?: string): string | undefined;
    /**
     * Begin a new loading phase.
     *
     * With the returned {@link LoadingPhase} you can report progress,
     * track asynchronous work, and manage the phase lifecycle.
     *
     * @param label Label for the loading phase.
     * @param weight Weight of the loading phase (default is 1).
     * @returns A handle to the created loading phase.
     *
     * @example
     * ```javascript
     * const t = textmode.create({
     *   width: 800,
     *   height: 600,
     *   loadingScreen: { message: 'preparing...' }
     * });
     *
     * // In setup we start a phase and then track work in that phase
     * t.setup(async () => {
     *   const phase = t.loading.addPhase('video preload', 2);
     *
     *   // Example: report progress from a loader callback
     *   await phase.track(async () => {
     *     // Simulated work
     *     for (let i = 0; i <= 10; i++) {
     *       phase.report(i / 10);
     *       await new Promise((r) => setTimeout(r, 30));
     *     }
     *   });
     * });
     * ```
     */
    addPhase(label: string, weight?: number): LoadingPhase;
    /**
     * Finish the loading process.
     * @ignore
     */
    $finish(): void;
    private _notifyComplete;
    private _onCompleteCallback?;
    /**
     * Set a callback to be invoked when loading is complete.
     * @param callback The callback function to invoke.
     * @ignore
     */
    $setOnComplete(callback: () => void): void;
    /**
     * Report an error that occurred during loading.
     * @param error The error message or `Error` object.
     *
     * @example
     * ```javascript
     * const t = textmode.create({
     *   width: 800,
     *   height: 600,
     *   loadingScreen: { message: 'starting...' }
     * });
     *
     * t.setup(async () => {
     *   const phase = t.loading.addPhase('remote fetch', 1);
     *   try {
     *     await phase.track(async () => {
     *       // Failing call
     *       throw new Error('server down');
     *     });
     *   } catch (err) {
     *     // This will put the loading manager into an error state
     *     t.loading.error(err instanceof Error ? err : String(err));
     *   }
     * });
     * ```
     */
    error(error: Error | string): void;
    /**
     * Independent render loop for the loading screen.
     * This runs on its own animation controller, separate from user animation.
     * @ignore
     */
    private _renderLoadingFrame;
    /**
     * Performs the actual rendering of the loading screen.
     * @ignore
     */
    private _performRender;
    /**
     * Update the background color used in the loading screen theme.
     * @param color The new background color.
     * @ignore
     */
    $updateBackgroundColor(color: RGBA | null): void;
    private _resolveRenderer;
    /**
     * Renders the library branding tag at the bottom left of the loading screen.
     * Uses obfuscation techniques to make removal more difficult.
     * @ignore
     */
    private _renderBrandingTag;
}
