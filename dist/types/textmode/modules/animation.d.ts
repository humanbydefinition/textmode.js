declare module '../Textmodifier' {
    interface Textmodifier {
        /**
         * Set the target frame rate. If called without arguments, returns the current measured frame rate.
         * @param fps The maximum frames per second for rendering (optional).
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/frameRate/sketch.js}
         */
        frameRate(fps?: number): number | void;
        /**
         * Set or get the target frame rate limit.
         *
         * Works similarly to {@link frameRate}, but gets the target frame rate instead of the current measured frame rate.
         *
         * @param fps Optional new target frame rate. If not provided, returns current target frame rate.
         * @returns Current target frame rate when getting, void when setting
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/targetFrameRate/sketch.js}
         */
        targetFrameRate(fps?: number): number | void;
        /**
         * Stop the automatic rendering loop.
         *
         * This method pauses the render loop without, allowing
         * it to be resumed later with {@link loop}. This is useful for temporarily pausing
         * animation while maintaining the ability to continue it.
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/noLoop/sketch.js}
         */
        noLoop(): void;
        /**
         * Resume the rendering loop if it was stopped by {@link noLoop}.
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/loop/sketch.js}
         */
        loop(): void;
        /**
         * Execute the render function a specified number of times.
         *
         * This method is useful when the render loop has been stopped with {@link noLoop},
         * allowing you to trigger rendering on demand.
         *
         * @param n The number of times to execute the render function. Defaults to 1.
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/redraw/sketch.js}
         */
        redraw(n?: number): void;
        /**
         * Check whether the textmodifier is currently running the automatic render loop.
         * @returns True if the render loop is currently active, false otherwise.
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/isLooping/sketch.js}
         */
        isLooping(): boolean;
        /**
         * Returns the time in milliseconds between the current frame and the previous frame.
         *
         * `deltaTime()` is useful for creating frame-rate-independent animations. By multiplying
         * velocities and movements by `deltaTime()`, animations will run at consistent speeds
         * regardless of the actual frame rate.
         *
         * @returns Time elapsed between current and previous frame in milliseconds.
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/deltaTime/sketch.js}
         */
        deltaTime(): number;
        /**
         * Get the current frame count.
         *
         * The frame count starts at 0, but is incremented at the beginning of each draw cycle.
         * This means that inside the first call to `draw()`, `frameCount` is 1.
         *
         * This value is useful for timing-based animations, patterns, and state changes.
         *
         * @returns The number of frames rendered since the sketch started.
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/frameCount/sketch.js}
         */
        get frameCount(): number;
        /**
         * Set the current frame count.
         *
         * Modifying the frame count can be used to reset animations or jump to a specific
         * point in time-based patterns.
         *
         * @param value The new frame count value.
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/frameCount2/sketch.js}
         */
        set frameCount(value: number);
        /**
         * Get the number of milliseconds since the sketch started running.
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
         * @returns Number of milliseconds since starting the sketch.
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/millis/sketch.js}
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/millis2/sketch.js}
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/millis3/sketch.js}
         */
        get millis(): number;
        /**
         * Set the elapsed milliseconds by adjusting the internal start time.
         *
         * This allows seeking/scrubbing in animations. Setting `millis` will also
         * affect the value returned by {@link secs} since they are connected.
         *
         * @param value The new elapsed time in milliseconds
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/millis4/sketch.js}
         */
        set millis(value: number);
        /**
         * Get the number of seconds since the sketch started running.
         *
         * `secs` is a convenience property that returns the elapsed time in seconds
         * instead of milliseconds. Equivalent to `millis / 1000`.
         *
         * Time tracking begins before the code in {@link setup} runs. If loading screen is
         * enabled, `secs` begins tracking as soon as the loading screen starts.
         *
         * This property is connected to {@link millis} - setting one will affect the other.
         *
         * @returns Number of seconds since starting the sketch.
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/secs/sketch.js}
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/secs2/sketch.js}
         */
        get secs(): number;
        /**
         * Set the elapsed seconds by adjusting the internal start time.
         *
         * This allows seeking/scrubbing in animations. Setting `secs` will also
         * affect the value returned by {@link millis} since they are connected.
         *
         * @param value The new elapsed time in seconds
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/secs3/sketch.js}
         */
        set secs(value: number);
    }
}
export {};
