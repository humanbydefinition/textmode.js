[**textmode.js v0.2.0**](../README.md)

***

[textmode.js](../README.md) / TextmodeOptions

# Type Alias: TextmodeOptions

> **TextmodeOptions** = `object`

Options for creating a [Textmodifier](../classes/Textmodifier.md) instance.

## Properties

### canvas?

> `optional` **canvas**: `HTMLCanvasElement`

An existing [HTMLCanvasElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement) to use instead of creating a new one.

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

### width?

> `optional` **width**: `number`

The width of the canvas when creating a new canvas. Defaults to 800.
