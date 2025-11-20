import type { LoadingScreenState } from './types';
/**
 * Manages the state of the loading screen.
 * @ignore
 */
export declare class LoadingScreenStateMachine {
    private _state;
    private _errorMessage;
    private _errorDetails;
    constructor(initialState?: LoadingScreenState);
    get $state(): LoadingScreenState;
    get $isEnabled(): boolean;
    get $shouldRender(): boolean;
    get $errorMessage(): string;
    get $errorDetails(): string;
    $activate(): void;
    $finish(): void;
    $startTransition(): void;
    $completeTransition(): void;
    $setError(error: Error | string): void;
    $disable(): void;
}
