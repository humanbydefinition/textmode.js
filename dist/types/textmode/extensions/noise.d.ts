declare module '../Textmodifier' {
    interface Textmodifier {
        /**
         * Return deterministic multi-octave noise for a coordinate.
         *
         * Similar input coordinates produce similar values, making `noise()` useful
         * for organic motion, terrain, contours, and flow-field sketches.
         *
         * @param x X coordinate in noise space.
         * @param y Y coordinate in noise space.
         * @param z Z coordinate in noise space.
         * @returns Noise value in the range `[0, 1]`.
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/noise/sketch.js}
         */
        noise(x: number, y?: number, z?: number): number;
        /**
         * Reset the noise lookup table to a seed.
         *
         * Use this when a sketch needs a repeatable noise field independent of the
         * current random sequence.
         *
         * @param seed Seed used to regenerate the noise table.
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/noiseSeed/sketch.js}
         */
        noiseSeed(seed: string | number): void;
        /**
         * Adjust noise octaves and falloff.
         *
         * Higher octaves add fine detail. Falloff controls how much each octave
         * contributes compared to the previous one.
         *
         * @param octaves Number of octaves to use.
         * @param falloff Amplitude falloff between octaves.
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/noiseDetail/sketch.js}
         */
        noiseDetail(octaves: number, falloff?: number): void;
    }
}
export {};
