[**textmode.js v0.1.0**](../README.md)

***

[textmode.js](../README.md) / TextmodeOptions

# Type Alias: TextmodeOptions

> **TextmodeOptions** = `object`

Defined in: [textmode/Textmodifier.ts:14](https://github.com/humanbydefinition/textmode.js-dev/blob/343f9ecda8003c649bb7b0b4174c4e0103447484/src/textmode/Textmodifier.ts#L14)

Options for creating a [Textmodifier](../classes/Textmodifier.md) instance.

## Properties

### fontSize?

> `optional` **fontSize**: `number`

Defined in: [textmode/Textmodifier.ts:16](https://github.com/humanbydefinition/textmode.js-dev/blob/343f9ecda8003c649bb7b0b4174c4e0103447484/src/textmode/Textmodifier.ts#L16)

The font size to use for text rendering. Defaults to 16.

***

### frameRate?

> `optional` **frameRate**: `number`

Defined in: [textmode/Textmodifier.ts:26](https://github.com/humanbydefinition/textmode.js-dev/blob/343f9ecda8003c649bb7b0b4174c4e0103447484/src/textmode/Textmodifier.ts#L26)

Maximum frames per second for auto rendering. Defaults to 120.

***

### renderMode?

> `optional` **renderMode**: `"manual"` \| `"auto"`

Defined in: [textmode/Textmodifier.ts:23](https://github.com/humanbydefinition/textmode.js-dev/blob/343f9ecda8003c649bb7b0b4174c4e0103447484/src/textmode/Textmodifier.ts#L23)

Automatic rendering mode. Defaults to 'auto'.
- 'manual': Requires manual `render()` calls
- 'auto': Automatically renders using requestAnimationFrame
