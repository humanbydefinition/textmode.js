import type { LoadingPhaseTracker } from './LoadingPhaseTracker';
import type { ILoadingPhase } from './types';
/**
 * Represents a loading phase tracked by a LoadingPhaseTracker.
 *
 * Allows reporting progress, completion, and failure of the phase.
 *
 * Also provides a method to track asynchronous tasks within the phase.
 */
export declare class LoadingPhase implements ILoadingPhase {
    private readonly _phaseTracker;
    readonly id: string;
    readonly label: string;
    /**
     * Creates a new LoadingPhase.
     * @param _phaseTracker The LoadingPhaseTracker managing this phase
     * @param id The unique identifier for this loading phase
     * @param label The human-readable label for this loading phase
     * @ignore
     */
    constructor(_phaseTracker: LoadingPhaseTracker, id: string, label: string);
    report(progress: number): void;
    complete(): void;
    fail(_error?: Error): void;
    track<T>(task: Promise<T> | (() => Promise<T> | T)): Promise<T>;
}
