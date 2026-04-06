/**
 * Base class for objects that require explicit resource disposal.
 */
export declare class Disposable {
    private _onDisposeCallbacks;
    /**
     * Dispose of the resource and run all registered callbacks.
     * Subclasses should call super.dispose() at the end of their dispose method.
     */
    dispose(): void;
}
