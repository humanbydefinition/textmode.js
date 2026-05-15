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
    protected _createLayer(): TextmodeLayer;
    private _performRender;
    private _setErrorState;
}
