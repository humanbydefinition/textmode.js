import { TextmodeRandom, type TextmodeRandomSeed } from '../random';
declare module '../Textmodifier' {
    interface Textmodifier {
        /**
         * Return a random number from 0 up to, but not including, 1.
         *
         * When the sketch is created with `seed`, or after calling {@link randomSeed},
         * this method returns a reproducible sequence. This pseudo-random generator is
         * intended for creative coding and is not cryptographically secure.
         *
         * @returns Random number in the range [0, 1).
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/random/sketch.js}
         */
        random(): number;
        /**
         * Return a random number from 0 up to, but not including, `max`.
         *
         * @param max Upper bound, exclusive.
         * @returns Random number in the range [0, max).
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/random/sketch.js}
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
         * {@includeCode ../../../examples/Textmodifier/random/sketch.js}
         */
        random(min: number, max: number): number;
        /**
         * Return a random element from an array.
         *
         * @param choices Values to choose from.
         * @returns A random array element, or `undefined` when the array is empty.
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/random/sketch.js}
         */
        random<T>(choices: readonly T[]): T | undefined;
        /**
         * Reset the main sketch random generator to a seed.
         *
         * This also clears named streams created with {@link randomStream}, so future
         * stream lookups are derived from the new root seed.
         *
         * @param seed Seed used to restart the sequence.
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/randomSeed/sketch.js}
         */
        randomSeed(seed: TextmodeRandomSeed): void;
        /**
         * Get an independent deterministic random stream for a name.
         *
         * Named streams are derived from the current root seed and stream name. Consuming
         * values from one stream does not affect the main generator or other named streams.
         *
         * @param name Stream name.
         * @returns A deterministic random generator for the given stream name.
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/randomStream/sketch.js}
         */
        randomStream(name: string): TextmodeRandom;
    }
}
