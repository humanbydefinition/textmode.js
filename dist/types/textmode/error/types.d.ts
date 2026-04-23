import type { TextmodeGrid } from '../grid/TextmodeGrid';
import type { Textmodifier } from '../Textmodifier';
/**
 * Context object passed to error renderer callbacks.
 */
export interface ErrorScreenRendererContext {
    /** The Textmodifier instance for rendering text and graphics. */
    textmodifier: Textmodifier;
    /** Grid metadata for positioning. */
    grid: TextmodeGrid;
    /** Error title, usually derived from the error name. */
    errorTitle: string;
    /** Primary error message shown on screen. */
    errorMessage: string;
    /** Optional error details (for example stack trace). */
    errorDetails?: string;
}
/**
 * Internal state of the error screen.
 */
export type ErrorScreenState = 'inactive' | 'active';
