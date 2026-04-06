import { LayerController } from '../LayerController';
import type { LoadingScreenRendererContext, LoadingScreenState } from './types';
import { TextmodeLayer } from '../layers/TextmodeLayer';
/**
 * Controls the internal loading layer lifecycle and rendering behavior.
 */
export declare class LoadingLayerController extends LayerController<LoadingScreenRendererContext> {
    private readonly _options;
    _state: LoadingScreenState;
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
