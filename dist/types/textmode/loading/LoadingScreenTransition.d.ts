export type TransitionType = 'none' | 'fade';
/**
 * Handles loading screen transitions.
 * @ignore
 */
export declare class LoadingScreenTransition {
    private _transitionStartTime;
    private _transitionOpacity;
    private _transitionType;
    private _transitionDuration;
    constructor(transitionType: TransitionType, transitionDuration: number);
    get $opacity(): number;
    get $isTransitioning(): boolean;
    $start(): void;
    $update(): boolean;
    $reset(): void;
}
