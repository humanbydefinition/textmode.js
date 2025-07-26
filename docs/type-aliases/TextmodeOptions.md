[**textmode.js v0.0.10-beta.5**](../README.md)

***

[textmode.js](../README.md) / TextmodeOptions

# Type Alias: TextmodeOptions

> **TextmodeOptions** = `object`

Defined in: [textmode/Textmodifier.ts:14](https://github.com/humanbydefinition/textmode.js-dev/blob/e3dc79bc1521c853de25f7f80d6e8ec46edd909c/src/textmode/Textmodifier.ts#L14)

Options for creating a [Textmodifier](../classes/Textmodifier.md) instance.

## Properties

### fontSize?

> `optional` **fontSize**: `number`

Defined in: [textmode/Textmodifier.ts:16](https://github.com/humanbydefinition/textmode.js-dev/blob/e3dc79bc1521c853de25f7f80d6e8ec46edd909c/src/textmode/Textmodifier.ts#L16)

The font size to use for text rendering. Defaults to 16.

***

### frameRate?

> `optional` **frameRate**: `number`

Defined in: [textmode/Textmodifier.ts:26](https://github.com/humanbydefinition/textmode.js-dev/blob/e3dc79bc1521c853de25f7f80d6e8ec46edd909c/src/textmode/Textmodifier.ts#L26)

Maximum frames per second for auto rendering. Defaults to 120.

***

### renderMode?

> `optional` **renderMode**: `"manual"` \| `"auto"`

Defined in: [textmode/Textmodifier.ts:23](https://github.com/humanbydefinition/textmode.js-dev/blob/e3dc79bc1521c853de25f7f80d6e8ec46edd909c/src/textmode/Textmodifier.ts#L23)

Automatic rendering mode. Defaults to 'auto'.
- 'manual': Requires manual `render()` calls
- 'auto': Automatically renders using requestAnimationFrame
