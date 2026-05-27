import type { TextmodeRandomSeed } from './types';
export declare const TEXTMODE_RANDOM_ALGORITHM = "textmode-v1";
type RandomState = [number, number, number, number];
export declare function createAutoRandomSeed(): string;
export declare function normalizeRandomSeed(seed: TextmodeRandomSeed): string;
export declare function createRandomStreamSeed(rootSeedKey: string, name: string): string;
export declare function createInitialRandomState(seedKey: string): RandomState;
export declare function nextRandomFloat(state: RandomState): number;
export {};
