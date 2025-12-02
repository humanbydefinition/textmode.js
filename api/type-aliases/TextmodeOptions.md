[textmode.js](../index.md) / TextmodeOptions

# Type Alias: TextmodeOptions

```ts
type TextmodeOptions = object;
```

Options for creating a [Textmodifier](../classes/Textmodifier.md) instance.

## Properties

### canvas?

```ts
optional canvas: HTMLCanvasElement;
```

An existing [HTMLCanvasElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement) to use instead of creating a new one.

**Note:** 
If using `overlay` mode, this should be the target canvas or video element to overlay on. 
`textmode.js` will create its own canvas applied on top of the target element, always matching its size and position.

***

### fontSize?

```ts
optional fontSize: number;
```

The font size to use for text rendering. Defaults to 16.

***

### fontSource?

```ts
optional fontSource: string;
```

URL or path to a custom font file *(.otf/.ttf)*.

Required when using minified builds that don't include a default font.

Optional for full builds *(will override embedded font if provided)*.

***

### frameRate?

```ts
optional frameRate: number;
```

Maximum frames per second for auto rendering. Defaults to 60.

***

### height?

```ts
optional height: number;
```

The height of the canvas when creating a new canvas. Defaults to 600.

***

### loadingScreen?

```ts
optional loadingScreen: LoadingScreenOptions;
```

Configure the built-in loading screen experience.

***

### overlay?

```ts
optional overlay: boolean;
```

Use `textmode.js` in overlay mode, 
which sets up the textmode `<canvas>` on top of an existing HTMLCanvasElement or HTMLVideoElement,
automatically resizing and positioning it to match the target element.

In this mode `textmode.js` fetches the content of the target element and loads it into an adjustable [loadables.TextmodeImage](../namespaces/loadables/classes/TextmodeImage.md),
that can be accessed via [Textmodifier.overlay](../classes/Textmodifier.md#overlay), and drawn via [Textmodifier.image](../classes/Textmodifier.md#image),

Useful for applying textmode conversion to p5.js sketches, YouTube videos, and sooo much more.

All functionality of `textmode.js` remains available. Resizing the `textmode.js` canvas is not recommended though, since the overlay target defines the size.

***

### plugins?

```ts
optional plugins: TextmodePlugin[];
```

List of plugins to install when the Textmodifier instance is created.

***

### width?

```ts
optional width: number;
```

The width of the canvas when creating a new canvas. Defaults to 800.
