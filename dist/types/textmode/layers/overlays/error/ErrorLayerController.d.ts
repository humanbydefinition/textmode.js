import { TextmodeLayer } from '../../TextmodeLayer';
import type { Textmodifier } from '../../../Textmodifier';
import { InternalLayerController } from '../InternalLayerController';
import type { ErrorScreenRendererContext } from '../../../error/types';
/**
 * Controls the dedicated internal error layer lifecycle and rendering behavior.
 */
export declare class ErrorLayerController extends InternalLayerController<ErrorScreenRendererContext> {
    private _state;
    private _errorTitle;
    private _errorMessage;
    private _errorDetails;
    /**
     * Initializes a new ErrorLayerController.
     * @param textmodifier Textmodifier instance to render on.
     */
    constructor(textmodifier: Textmodifier);
    /**
     * Initialize error layer resources.
     * Must be called after the renderer is ready.
     */
    _initialize(): Promise<void>;
    /**
     * Indicates whether the error layer should render this frame.
     */
    get _shouldRender(): boolean;
    /**
     * Set the current error payload and activate the error layer.
     * @param error Error object, string message, or unknown thrown payload.
     */
    _setError(error: unknown): void;
    /**
     * Render a single error layer frame.
     * Called by the main render loop when the error layer is active.
     */
    _renderFrame(): void;
    /**
     * Dispose of the error layer controller and clean up resources.
     */
    _dispose(): void;
    protected _createLayer(): TextmodeLayer;
    private _performRender;
    private _setErrorState;
}
