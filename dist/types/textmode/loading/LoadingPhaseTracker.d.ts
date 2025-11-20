import type { LoadingPhaseSnapshot } from './types';
/**
 * Tracks loading phases and their progress.
 * @ignore
 */
export declare class LoadingPhaseTracker {
    private _phases;
    private _phaseOrder;
    private _totalWeight;
    private _lastReportedProgress;
    private _onProgressChange?;
    get $totalWeight(): number;
    get $progress(): number;
    $setProgressChangeCallback(callback: (progress: number) => void): void;
    $createPhase(label: string, weight?: number): string;
    $updatePhaseProgress(id: string, progress: number): void;
    $completePhase(id: string): void;
    $failPhase(id: string): void;
    $snapshotPhases(): LoadingPhaseSnapshot[];
}
