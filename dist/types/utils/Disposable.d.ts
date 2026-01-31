import type { IDisposable } from '../textmode/interfaces/IDisposable';
/**
 * Base class for objects that require explicit resource disposal.
 * Implements the IDisposable interface with support for disposal callbacks.
 */
export declare class Disposable implements IDisposable {
    private _onDisposeCallbacks;
    /**
     * Register a callback to be run when this resource is disposed.
     * @ignore
     */
    $addOnDispose(callback: () => void): void;
    /**
     * Dispose of the resource and run all registered callbacks.
     * Subclasses should call super.dispose() at the end of their dispose method.
     */
    dispose(): void;
}
