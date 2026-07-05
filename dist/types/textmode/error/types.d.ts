import type { TextmodeGrid } from '../grid/TextmodeGrid';
import type { Textmodifier } from '../Textmodifier';
/**
 * Context object passed to error renderer callbacks.
 *
 * @see {@link https://code.textmode.art/api/textmode.js/namespaces/errors/interfaces/ErrorScreenRendererContext | errors.ErrorScreenRendererContext API reference}
 */
export interface ErrorScreenRendererContext {
    /**
     * The Textmodifier instance for rendering text and graphics.
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/errors/interfaces/ErrorScreenRendererContext#textmodifier | errors.ErrorScreenRendererContext.textmodifier API reference}
     */
    textmodifier: Textmodifier;
    /**
     * Grid metadata for positioning.
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/errors/interfaces/ErrorScreenRendererContext#grid | errors.ErrorScreenRendererContext.grid API reference}
     */
    grid: TextmodeGrid;
    /**
     * Error title, usually derived from the error name.
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/errors/interfaces/ErrorScreenRendererContext#errortitle | errors.ErrorScreenRendererContext.errorTitle API reference}
     */
    errorTitle: string;
    /**
     * Primary error message shown on screen.
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/errors/interfaces/ErrorScreenRendererContext#errormessage | errors.ErrorScreenRendererContext.errorMessage API reference}
     */
    errorMessage: string;
    /**
     * Optional error details (for example stack trace).
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/errors/interfaces/ErrorScreenRendererContext#errordetails | errors.ErrorScreenRendererContext.errorDetails API reference}
     */
    errorDetails?: string;
}
/**
 * Internal state of the error screen.
 */
export type ErrorScreenState = 'inactive' | 'active';
