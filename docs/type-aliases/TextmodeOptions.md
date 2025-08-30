[**textmode.js v0.1.9**](../README.md)

***

[textmode.js](../README.md) / TextmodeOptions

# Type Alias: TextmodeOptions

> **TextmodeOptions** = `object`

Defined in: [textmode/Textmodifier.ts:23](https://github.com/humanbydefinition/textmode.js-dev/blob/02f2317592c96b7b0129f0da9a382c12c28ad890/src/textmode/Textmodifier.ts#L23)

Options for creating a [Textmodifier](../classes/Textmodifier.md) instance.

## Properties

### fontSize?

> `optional` **fontSize**: `number`

Defined in: [textmode/Textmodifier.ts:25](https://github.com/humanbydefinition/textmode.js-dev/blob/02f2317592c96b7b0129f0da9a382c12c28ad890/src/textmode/Textmodifier.ts#L25)

The font size to use for text rendering. Defaults to 16.

***

### fontSource?

> `optional` **fontSource**: `string`

Defined in: [textmode/Textmodifier.ts:48](https://github.com/humanbydefinition/textmode.js-dev/blob/02f2317592c96b7b0129f0da9a382c12c28ad890/src/textmode/Textmodifier.ts#L48)

URL or path to a custom font file *(.otf/.ttf)*.
Required when using minified builds that don't include a default font.
Optional for full builds *(will override embedded font if provided)*.

***

### frameRate?

> `optional` **frameRate**: `number`

Defined in: [textmode/Textmodifier.ts:35](https://github.com/humanbydefinition/textmode.js-dev/blob/02f2317592c96b7b0129f0da9a382c12c28ad890/src/textmode/Textmodifier.ts#L35)

Maximum frames per second for auto rendering. Defaults to 60.

***

### height?

> `optional` **height**: `number`

Defined in: [textmode/Textmodifier.ts:41](https://github.com/humanbydefinition/textmode.js-dev/blob/02f2317592c96b7b0129f0da9a382c12c28ad890/src/textmode/Textmodifier.ts#L41)

The height of the canvas in `standalone` mode. Defaults to 600.

***

### renderMode?

> `optional` **renderMode**: `"manual"` \| `"auto"`

Defined in: [textmode/Textmodifier.ts:32](https://github.com/humanbydefinition/textmode.js-dev/blob/02f2317592c96b7b0129f0da9a382c12c28ad890/src/textmode/Textmodifier.ts#L32)

Automatic rendering mode. Defaults to 'auto'.
- `'manual'`: Requires manual `render()` calls
- `'auto'`: Automatically renders using [requestAnimationFrame](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame)

***

### width?

> `optional` **width**: `number`

Defined in: [textmode/Textmodifier.ts:38](https://github.com/humanbydefinition/textmode.js-dev/blob/02f2317592c96b7b0129f0da9a382c12c28ad890/src/textmode/Textmodifier.ts#L38)

The width of the canvas in `standalone` mode. Defaults to 800.
