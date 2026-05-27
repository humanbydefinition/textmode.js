import type { TextmodeRandomSeed } from './types';
/**
 * A deterministic pseudo-random number generator for textmode sketches.
 *
 * `TextmodeRandom` uses the stable `textmode-v1` generator. It is designed for
 * reproducible creative-coding output, not for cryptography or security-sensitive values.
 */
export declare class TextmodeRandom {
    private _state;
    /**
     * Create a deterministic random generator.
     *
     * @param seed Seed used to initialize the generator. When omitted, a non-deterministic seed is chosen.
     */
    constructor(seed?: TextmodeRandomSeed);
    /**
     * Return a random number from 0 up to, but not including, 1.
     *
     * @returns Random number in the range [0, 1).
     *
     * @example
     * ```ts
     * const rng = new TextmodeRandom('glyphs');
     * const value = rng.random();
     * ```
     */
    random(): number;
    /**
     * Return a random number from 0 up to, but not including, `max`.
     *
     * @param max Upper bound, exclusive.
     * @returns Random number in the range [0, max).
     *
     * @example
     * ```ts
     * const rng = new TextmodeRandom('columns');
     * const column = rng.random(80);
     * ```
     */
    random(max: number): number;
    /**
     * Return a random number from `min` up to, but not including, `max`.
     *
     * @param min Lower bound, inclusive.
     * @param max Upper bound, exclusive.
     * @returns Random number in the range [min, max).
     *
     * @example
     * ```ts
     * const rng = new TextmodeRandom('offsets');
     * const offset = rng.random(-4, 4);
     * ```
     */
    random(min: number, max: number): number;
    /**
     * Return a random element from an array.
     *
     * @param choices Values to choose from.
     * @returns A random array element, or `undefined` when the array is empty.
     *
     * @example
     * ```ts
     * const rng = new TextmodeRandom('characters');
     * const character = rng.random(['A', 'B', 'C']);
     * ```
     */
    random<T>(choices: readonly T[]): T | undefined;
    /**
     * Reset this generator to a seed.
     *
     * @param seed Seed used to restart the sequence.
     *
     * @example
     * ```ts
     * const rng = new TextmodeRandom('first');
     * rng.randomSeed('second');
     * ```
     */
    randomSeed(seed: TextmodeRandomSeed): void;
    private _next;
}
