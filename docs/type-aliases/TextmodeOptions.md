[**textmode.js v0.3.0**](../README.md)

***

[textmode.js](../README.md) / TextmodeOptions

# Type Alias: TextmodeOptions

> **TextmodeOptions** = `object`

Options for creating a [Textmodifier](../classes/Textmodifier.md) instance.

## Properties

### canvas?

> `optional` **canvas**: `HTMLCanvasElement`

An existing [HTMLCanvasElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement) to use instead of creating a new one.

**Note:** 
If using `overlay` mode, this should be the target canvas or video element to overlay on. 
`textmode.js` will create its own canvas applied on top of the target element, always matching its size and position.

***

### fontSize?

> `optional` **fontSize**: `number`

The font size to use for text rendering. Defaults to 16.

***

### fontSource?

> `optional` **fontSource**: `string`

URL or path to a custom font file *(.otf/.ttf)*.

Required when using minified builds that don't include a default font.

Optional for full builds *(will override embedded font if provided)*.

***

### frameRate?

> `optional` **frameRate**: `number`

Maximum frames per second for auto rendering. Defaults to 60.

***

### height?

> `optional` **height**: `number`

The height of the canvas when creating a new canvas. Defaults to 600.

***

### overlay?

> `optional` **overlay**: `boolean`

Use `textmode.js` in overlay mode, 
which sets up the textmode `<canvas>` on top of an existing HTMLCanvasElement or HTMLVideoElement,
automatically resizing and positioning it to match the target element.

In this mode `textmode.js` fetches the content of the target element and applies it with adjustable textmode conversion
as a first layer to the textmode canvas.

Useful for applying textmode conversion to p5.js sketches, YouTube videos, and sooo much more.

All functionality of `textmode.js` remains available, including drawing additional content on top of the converted source.

***

### width?

> `optional` **width**: `number`

The width of the canvas when creating a new canvas. Defaults to 800.
