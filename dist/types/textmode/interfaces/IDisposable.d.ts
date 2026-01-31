/**
 * Interface for objects that require explicit resource disposal.
 */
export interface IDisposable {
    /**
     * Dispose of the resource and free associated WebGL resources.
     */
    dispose(): void;
    /**
     * Register a callback to be run when this resource is disposed.
     * @ignore
     */
    $addOnDispose?(callback: () => void): void;
}
