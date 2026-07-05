declare module '../Textmodifier' {
    interface Textmodifier {
        /**
         * Set the target frame rate, or get the current measured frame rate when called without arguments.
         * @param fps Maximum frames per second for rendering.
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/frameRate/sketch.js}
         *
         * @see {@link https://code.textmode.art/api/textmode.js/classes/Textmodifier/methods/frameRate | Textmodifier.frameRate API reference}
         */
        frameRate(fps?: number): number | void;
        /**
         * Set or get the target frame rate limit.
         *
         * Unlike {@link frameRate}, the getter returns the configured target instead of the measured rate.
         *
         * @param fps New target frame rate.
         * @returns Current target frame rate when called without arguments.
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/targetFrameRate/sketch.js}
         *
         * @see {@link https://code.textmode.art/api/textmode.js/classes/Textmodifier/methods/targetFrameRate | Textmodifier.targetFrameRate API reference}
         */
        targetFrameRate(fps?: number): number | void;
        /**
         * Stop the automatic rendering loop.
         *
         * Rendering can be resumed later with {@link loop}.
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/noLoop/sketch.js}
         *
         * @see {@link https://code.textmode.art/api/textmode.js/classes/Textmodifier/methods/noLoop | Textmodifier.noLoop API reference}
         */
        noLoop(): void;
        /**
         * Resume the rendering loop if it was stopped by {@link noLoop}.
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/loop/sketch.js}
         *
         * @see {@link https://code.textmode.art/api/textmode.js/classes/Textmodifier/methods/loop | Textmodifier.loop API reference}
         */
        loop(): void;
        /**
         * Render a fixed number of frames on demand.
         *
         * This method is useful when the render loop has been stopped with {@link noLoop},
         * allowing you to trigger rendering on demand.
         *
         * @param n Number of frames to render. Defaults to 1.
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/redraw/sketch.js}
         *
         * @see {@link https://code.textmode.art/api/textmode.js/classes/Textmodifier/methods/redraw | Textmodifier.redraw API reference}
         */
        redraw(n?: number): void;
        /**
         * Whether the automatic render loop is currently running.
         * @returns `true` when the render loop is active.
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/isLooping/sketch.js}
         *
         * @see {@link https://code.textmode.art/api/textmode.js/classes/Textmodifier/methods/isLooping | Textmodifier.isLooping API reference}
         */
        isLooping(): boolean;
        /**
         * Time in milliseconds between the current frame and the previous frame.
         *
         * `deltaTime()` is useful for creating frame-rate-independent animations. By multiplying
         * velocities and movements by `deltaTime()`, animations will run at consistent speeds
         * regardless of the actual frame rate.
         *
         * @returns Milliseconds elapsed since the previous frame.
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/deltaTime/sketch.js}
         *
         * @see {@link https://code.textmode.art/api/textmode.js/classes/Textmodifier/methods/deltaTime | Textmodifier.deltaTime API reference}
         */
        deltaTime(): number;
        /**
         * Current frame count.
         *
         * The frame count starts at 0, but is incremented at the beginning of each draw cycle.
         * This means that inside the first call to `draw()`, `frameCount` is 1.
         *
         * This value is useful for timing-based animations, patterns, and state changes.
         *
         * @returns Number of frames rendered since the sketch started.
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/frameCount/sketch.js}
         *
         * @see {@link https://code.textmode.art/api/textmode.js/classes/Textmodifier/accessors/frameCount | Textmodifier.frameCount API reference}
         */
        get frameCount(): number;
        /**
         * Set the current frame count.
         *
         * Modifying the frame count can be used to reset animations or jump to a specific
         * point in time-based patterns.
         *
         * @param value New frame count value.
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/frameCount2/sketch.js}
         *
         * @see {@link https://code.textmode.art/api/textmode.js/classes/Textmodifier/accessors/frameCount | Textmodifier.frameCount API reference}
         */
        set frameCount(value: number);
        /**
         * Milliseconds since the sketch started running.
         *
         * `millis` keeps track of how long a sketch has been running in milliseconds
         * (thousandths of a second). This information is often helpful for timing events
         * and animations.
         *
         * Time tracking begins before the code in {@link setup} runs. If loading screen is
         * enabled, `millis` begins tracking as soon as the loading screen starts.
         *
         * This property is connected to {@link secs} - setting one will affect the other.
         *
         * @returns Milliseconds since the sketch started.
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/millis/sketch.js}
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/millis2/sketch.js}
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/millis3/sketch.js}
         *
         * @see {@link https://code.textmode.art/api/textmode.js/classes/Textmodifier/accessors/millis | Textmodifier.millis API reference}
         */
        get millis(): number;
        /**
         * Set elapsed milliseconds by adjusting the internal start time.
         *
         * This allows seeking/scrubbing in animations. Setting `millis` will also
         * affect the value returned by {@link secs} since they are connected.
         *
         * @param value New elapsed time in milliseconds.
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/millis4/sketch.js}
         *
         * @see {@link https://code.textmode.art/api/textmode.js/classes/Textmodifier/accessors/millis | Textmodifier.millis API reference}
         */
        set millis(value: number);
        /**
         * Seconds since the sketch started running.
         *
         * `secs` is a convenience property that returns the elapsed time in seconds
         * instead of milliseconds. Equivalent to `millis / 1000`.
         *
         * Time tracking begins before the code in {@link setup} runs. If loading screen is
         * enabled, `secs` begins tracking as soon as the loading screen starts.
         *
         * This property is connected to {@link millis} - setting one will affect the other.
         *
         * @returns Seconds since the sketch started.
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/secs/sketch.js}
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/secs2/sketch.js}
         *
         * @see {@link https://code.textmode.art/api/textmode.js/classes/Textmodifier/accessors/secs | Textmodifier.secs API reference}
         */
        get secs(): number;
        /**
         * Set elapsed seconds by adjusting the internal start time.
         *
         * This allows seeking/scrubbing in animations. Setting `secs` will also
         * affect the value returned by {@link millis} since they are connected.
         *
         * @param value New elapsed time in seconds.
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/secs3/sketch.js}
         *
         * @see {@link https://code.textmode.art/api/textmode.js/classes/Textmodifier/accessors/secs | Textmodifier.secs API reference}
         */
        set secs(value: number);
    }
}
export {};
