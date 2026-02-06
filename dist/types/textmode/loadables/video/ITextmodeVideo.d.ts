import type { Material } from '../../../rendering/webgl/materials/Material';
import type { ITextmodeSource } from '../ITextmodeSource';
export interface ITextmodeVideo extends ITextmodeSource {
    /**
     * Get or create the material for rendering this video.
     * Always updates the material to ensure the latest video frame is used.
     * @ignore
     */
    $getMaterial(): Material;
    /**
     * Play the video.
     * @returns Promise that resolves when playback starts
     *
     * @example
     * ```javascript
     * const t = textmode.create({ width: window.innerWidth, height: window.innerHeight });
     *
     * let video;
     *
     * t.setup(async () => {
     *   // Load a video from a CC0 source
     *   video = await t.loadVideo('https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4');
     *   video.play();
     *   video.loop();
     *   video.characters(' .:-=+*#%@');
     * });
     *
     * t.draw(() => {
     *   t.background(0);
     *   if (video) {
     *     t.image(video);
     *
     *     // Draw Play/Pause indicator
     *     t.push();
     *     t.translate(0, 0); // Center
     *     t.charColor(255);
     *
     *     if (video.isPlaying) {
     *        // Draw Pause bars if playing (visible on hover)
     *        if (t.mouse.x > -10 && t.mouse.x < 10 && t.mouse.y > -10 && t.mouse.y < 10) {
     *           t.char('ñ');
     *           t.rect(5, 5);
     *        }
     *     } else {
     *        // Draw Play triangle if paused
     *        t.char('≤');
     *        t.rect(5, 5);
     *     }
     *     t.pop();
     *   }
     * });
     *
     * t.mouseClicked(() => {
     *   if (video) {
     *     if (video.isPlaying) video.pause();
     *     else video.play();
     *   }
     * });
     *
     * t.windowResized(() => {
     *   t.resizeCanvas(window.innerWidth, window.innerHeight);
     * });
     * ```
     */
    play(): Promise<void>;
    /**
     * Pause the video.
     *
     * @example
     * ```javascript
     * const t = textmode.create({ width: window.innerWidth, height: window.innerHeight });
     *
     * let video;
     *
     * t.setup(async () => {
     *   video = await t.loadVideo('https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4');
     *   video.play();
     *   video.loop();
     *   video.characters(' .:-=+*#%@');
     * });
     *
     * t.draw(() => {
     *   t.background(0);
     *   if (video) t.image(video);
     * });
     *
     * t.mouseClicked(() => {
     *   if (!video) return;
     *   // Toggle playback
     *   if (video.isPlaying) {
     *     video.pause();
     *   } else {
     *     video.play();
     *   }
     * });
     *
     * t.windowResized(() => {
     *   t.resizeCanvas(window.innerWidth, window.innerHeight);
     * });
     * ```
     */
    pause(): void;
    /**
     * Stop the video and reset to beginning.
     *
     * @example
     * ```javascript
     * const t = textmode.create({ width: window.innerWidth, height: window.innerHeight });
     *
     * let video;
     *
     * t.setup(async () => {
     *   video = await t.loadVideo('https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4');
     *   video.play();
     *   video.loop();
     *   video.characters(' .:-=+*#%@');
     * });
     *
     * t.draw(() => {
     *   t.background(0);
     *   if (video) t.image(video);
     * });
     *
     * t.keyPressed(() => {
     *   if (!video) return;
     *   // Press 's' to stop and reset
     *   if (t.isKeyPressed('s')) {
     *     video.stop();
     *     // Restart after 1 second
     *     setTimeout(() => video.play(), 1000);
     *   }
     * });
     *
     * t.windowResized(() => {
     *   t.resizeCanvas(window.innerWidth, window.innerHeight);
     * });
     * ```
     */
    stop(): void;
    /**
     * Set the playback speed.
     * @param rate Playback rate (1.0 = normal speed)
     *
     * @example
     * ```javascript
     * const t = textmode.create({ width: window.innerWidth, height: window.innerHeight });
     *
     * let video;
     *
     * t.setup(async () => {
     *   video = await t.loadVideo('https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4');
     *   video.play();
     *   video.loop();
     *   video.characters(' .:-=+*#%@');
     * });
     *
     * t.draw(() => {
     *   t.background(0);
     *   if (!video) return;
     *
     *   t.image(video);
     *
     *   // Map mouse X to playback speed (0.1x to 4x)
     *   // Mouse X is center-based (-cols/2 to cols/2)
     *   const halfWidth = t.grid.cols / 2;
     *   const normalizedX = (t.mouse.x + halfWidth) / t.grid.cols; // 0 to 1 (approx)
     *   // Clamp to 0-1
     *   const clampedX = Math.max(0, Math.min(1, normalizedX));
     *   const rate = 0.1 + clampedX * 3.9;
     *
     *   video.speed(rate);
     *
     *   // Show speed
     *   t.push();
     *   t.translate(0, 0);
     *   t.charColor(255);
     *   const label = `Speed: ${rate.toFixed(1)}x`;
     *   for(let i=0; i<label.length; i++) {
     *     t.push();
     *     t.translate(i - label.length/2, 0);
     *     t.char(label[i]);
     *     t.point();
     *     t.pop();
     *   }
     *   t.pop();
     * });
     *
     * t.windowResized(() => {
     *   t.resizeCanvas(window.innerWidth, window.innerHeight);
     * });
     * ```
     */
    speed(rate: number): this;
    /**
     * Set whether the video should loop.
     * @param shouldLoop Whether to loop (defaults to true)
     *
     * @example
     * ```javascript
     * const t = textmode.create({ width: window.innerWidth, height: window.innerHeight });
     *
     * let video;
     *
     * t.setup(async () => {
     *   video = await t.loadVideo('https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4');
     *   // Disable automatic looping
     *   video.loop(false);
     *   video.play();
     *   video.characters(' .:-=+*#%@');
     * });
     *
     * t.draw(() => {
     *   t.background(0);
     *   if (!video) return;
     *   t.image(video);
     *
     *   // Manual loop logic: Restart if finished
     *   if (!video.isPlaying && video.currentTime >= video.duration) {
     *      video.play();
     *   }
     * });
     *
     * t.windowResized(() => {
     *   t.resizeCanvas(window.innerWidth, window.innerHeight);
     * });
     * ```
     */
    loop(shouldLoop?: boolean): this;
    /**
     * Set the current time position in the video.
     * @param seconds Time in seconds
     *
     * @example
     * ```javascript
     * const t = textmode.create({ width: window.innerWidth, height: window.innerHeight });
     *
     * let video;
     *
     * t.setup(async () => {
     *   video = await t.loadVideo('https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4');
     *   video.play();
     *   video.loop();
     *   video.characters(' .:-=+*#%@');
     * });
     *
     * t.draw(() => {
     *   t.background(0);
     *   if (!video) return;
     *   t.image(video);
     * });
     *
     * t.mouseClicked(() => {
     *   if (!video) return;
     *   // Jump to a random time on click
     *   const randomTime = Math.random() * video.duration;
     *   video.time(randomTime);
     * });
     *
     * t.windowResized(() => {
     *   t.resizeCanvas(window.innerWidth, window.innerHeight);
     * });
     * ```
     */
    time(seconds: number): this;
    /**
     * Set the volume.
     * @param level Volume level (0.0-1.0)
     *
     * @example
     * ```javascript
     * const t = textmode.create({ width: window.innerWidth, height: window.innerHeight });
     *
     * let video;
     *
     * t.setup(async () => {
     *   video = await t.loadVideo('https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4');
     *   video.play();
     *   video.loop();
     *   video.characters(' .:-=+*#%@');
     * });
     *
     * t.draw(() => {
     *   t.background(0);
     *   if (!video) return;
     *   t.image(video);
     *
     *   // Control volume with mouse Y
     *   // Top = 1.0, Bottom = 0.0
     *   const halfHeight = t.grid.rows / 2;
     *   const normalizedY = (t.mouse.y + halfHeight) / t.grid.rows;
     *   const vol = 1.0 - Math.max(0, Math.min(1, normalizedY));
     *
     *   video.volume(vol);
     *
     *   // Display Volume
     *   t.push();
     *   t.translate(0, 0);
     *   t.charColor(255);
     *   const label = `Vol: ${Math.round(vol * 100)}%`;
     *   for(let i=0; i<label.length; i++) {
     *     t.push(); t.translate(i - label.length/2, 0); t.char(label[i]); t.point(); t.pop();
     *   }
     *   t.pop();
     * });
     *
     * t.windowResized(() => {
     *   t.resizeCanvas(window.innerWidth, window.innerHeight);
     * });
     * ```
     */
    volume(level: number): this;
    /**
     * WebGL texture handle containing the current video frame.
     */
    readonly texture: WebGLTexture;
    /**
     * The underlying HTML video element.
     */
    readonly videoElement: HTMLVideoElement;
    /**
     * Current playback time in seconds.
     */
    readonly currentTime: number;
    /**
     * Total duration of the video in seconds.
     */
    readonly duration: number;
    /**
     * Whether the video is currently playing.
     */
    readonly isPlaying: boolean;
}
