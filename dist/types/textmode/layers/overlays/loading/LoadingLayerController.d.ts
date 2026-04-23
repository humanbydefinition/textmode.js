import { InternalLayerController } from '../InternalLayerController';
import type { LoadingScreenRendererContext } from './types';
import { TextmodeLayer } from '../../TextmodeLayer';
/**
 * Controls the internal loading layer lifecycle and rendering behavior.
 */
export declare class LoadingLayerController extends InternalLayerController<LoadingScreenRendererContext> {
    private readonly _options;
    private _transitionStartTime;
    private _onCompleteCallback?;
    protected _createLayer(): TextmodeLayer;
    private _notifyComplete;
    private _updateTransitionOpacity;
    private _performRender;
    private _finishState;
    private _startTransitionState;
    private _completeTransitionState;
}
