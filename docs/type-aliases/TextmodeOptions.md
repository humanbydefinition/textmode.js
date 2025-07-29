[**textmode.js v0.1.1**](../README.md)

***

[textmode.js](../README.md) / TextmodeOptions

# Type Alias: TextmodeOptions

> **TextmodeOptions** = `object`

Defined in: [textmode/Textmodifier.ts:16](https://github.com/humanbydefinition/textmode.js-dev/blob/a65ef74f9f1cec2f9aa76c00793fa738c0824751/src/textmode/Textmodifier.ts#L16)

Options for creating a [Textmodifier](../classes/Textmodifier.md) instance.

## Properties

### fontSize?

> `optional` **fontSize**: `number`

Defined in: [textmode/Textmodifier.ts:18](https://github.com/humanbydefinition/textmode.js-dev/blob/a65ef74f9f1cec2f9aa76c00793fa738c0824751/src/textmode/Textmodifier.ts#L18)

The font size to use for text rendering. Defaults to 16.

***

### frameRate?

> `optional` **frameRate**: `number`

Defined in: [textmode/Textmodifier.ts:28](https://github.com/humanbydefinition/textmode.js-dev/blob/a65ef74f9f1cec2f9aa76c00793fa738c0824751/src/textmode/Textmodifier.ts#L28)

Maximum frames per second for auto rendering. Defaults to 120.

***

### renderMode?

> `optional` **renderMode**: `"manual"` \| `"auto"`

Defined in: [textmode/Textmodifier.ts:25](https://github.com/humanbydefinition/textmode.js-dev/blob/a65ef74f9f1cec2f9aa76c00793fa738c0824751/src/textmode/Textmodifier.ts#L25)

Automatic rendering mode. Defaults to 'auto'.
- 'manual': Requires manual `render()` calls
- 'auto': Automatically renders using requestAnimationFrame
