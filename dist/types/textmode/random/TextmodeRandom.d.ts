/**
 * A deterministic pseudo-random number generator for textmode sketches.
 *
 * `TextmodeRandom` uses the stable `textmode-v1` generator. It is designed for
 * reproducible creative-coding output, not for cryptography or security-sensitive values.
 *
 * @see {@link https://code.textmode.art/api/textmode.js/classes/TextmodeRandom | TextmodeRandom API reference}
 */
export declare class TextmodeRandom {
    private _state;
    private _spareGaussian?;
    /**
     * Create a deterministic random generator.
     *
     * @param seed Seed used to initialize the generator. When omitted, a non-deterministic seed is chosen.
     */
    constructor(seed?: string | number);
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
     *
     * @see {@link https://code.textmode.art/api/textmode.js/classes/TextmodeRandom#random | TextmodeRandom.random API reference}
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
     *
     * @see {@link https://code.textmode.art/api/textmode.js/classes/TextmodeRandom#random | TextmodeRandom.random API reference}
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
     *
     * @see {@link https://code.textmode.art/api/textmode.js/classes/TextmodeRandom#random | TextmodeRandom.random API reference}
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
     *
     * @see {@link https://code.textmode.art/api/textmode.js/classes/TextmodeRandom#random | TextmodeRandom.random API reference}
     */
    random<T>(choices: readonly T[]): T | undefined;
    /**
     * Return a normally distributed random number.
     *
     * Values cluster around `mean` with a standard deviation of `sd`. The sequence
     * is deterministic for a seed and shares state with {@link random}.
     *
     * @param mean Center of the distribution. Defaults to 0.
     * @param sd Standard deviation. Defaults to 1.
     * @returns Gaussian random number.
     *
     * @example
     * ```ts
     * const rng = new TextmodeRandom('stars');
     * const offset = rng.randomGaussian(0, 2);
     * ```
     *
     * @see {@link https://code.textmode.art/api/textmode.js/classes/TextmodeRandom#randomgaussian | TextmodeRandom.randomGaussian API reference}
     */
    randomGaussian(mean?: number, sd?: number): number;
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
     *
     * @see {@link https://code.textmode.art/api/textmode.js/classes/TextmodeRandom#randomseed | TextmodeRandom.randomSeed API reference}
     */
    randomSeed(seed: string | number): void;
    private _next;
}
