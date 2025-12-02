[textmode.js](../../../index.md) / [loadables](../index.md) / TextmodeVideoOptions

# Interface: TextmodeVideoOptions

Options for preloading video frames in [TextmodeVideo](../classes/TextmodeVideo.md).

When providing this options object as a second argument to [Textmodifier.loadVideo](../../../classes/Textmodifier.md#loadvideo),
you can choose to preload all video frames at a specified frame rate before using the video.

When preloading, the video will not play live asynchronously. Instead, all frames will be captured
upfront, allowing for frame-accurate seeking and rendering.

This is especially useful for scenarios where precise frame control is needed,
like capturing GIFs/videos from textmode.js canvas using the `textmode.export.js` add-on library without
missing frames due to asynchronous video playback.

Preloading takes time proportional to the video length and frame rate, which introduces significant delays
before the sketch can start rendering. Therefore, it is recommended to use this feature only when intending
to capture or export frames, rather than for real-time playback.

## Properties

| Property | Type | Description |
| ------ | ------ | ------ |
| <a id="framerate"></a> `frameRate?` | `number` | Frame rate to use when preloading video frames. If not specified, video will not be preloaded. |
| <a id="oncomplete"></a> `onComplete?` | (`summary`) => `void` | Callback invoked once preloading is complete. |
| <a id="onerror"></a> `onError?` | (`error`) => `void` | Callback invoked if an error occurs during preloading. |
| <a id="onprogress"></a> `onProgress?` | (`progress`) => `void` | Callback invoked periodically during preloading to report progress. |
