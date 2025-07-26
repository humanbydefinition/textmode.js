[**textmode.js v0.0.10-beta.5**](../README.md)

***

[textmode.js](../README.md) / TextmodeConversionPipeline

# Class: TextmodeConversionPipeline

Defined in: [textmode/ConversionPipeline.ts:19](https://github.com/humanbydefinition/textmode.js-dev/blob/e3dc79bc1521c853de25f7f80d6e8ec46edd909c/src/textmode/ConversionPipeline.ts#L19)

Manages the conversion pipeline for textmode rendering.

A conversion pipeline consists of multiple converters that process the input texture in sequence.
Each converter can modify the texture in various ways, such as applying brightness mapping,
color adjustments, transformations, and more.

## Accessors

### texture

#### Get Signature

> **get** **texture**(): `Framebuffer`

Defined in: [textmode/ConversionPipeline.ts:225](https://github.com/humanbydefinition/textmode.js-dev/blob/e3dc79bc1521c853de25f7f80d6e8ec46edd909c/src/textmode/ConversionPipeline.ts#L225)

Returns the framebuffer containing the textmode conversion result.

##### Returns

`Framebuffer`

## Methods

### add()

> **add**(`name`, `type`): `void` \| [`TextmodeConverter`](../textmode.js/namespaces/TextmodeConverters/classes/TextmodeConverter.md)

Defined in: [textmode/ConversionPipeline.ts:148](https://github.com/humanbydefinition/textmode.js-dev/blob/e3dc79bc1521c853de25f7f80d6e8ec46edd909c/src/textmode/ConversionPipeline.ts#L148)

Adds a new converter to the pipeline.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `name` | `string` | A unique name for the converter. |
| `type` | `"brightness"` \| `"custom"` | The type of converter to add. Can be either "brightness" or "custom". |

#### Returns

`void` \| [`TextmodeConverter`](../textmode.js/namespaces/TextmodeConverters/classes/TextmodeConverter.md)

The newly created [TextmodeConverter](../textmode.js/namespaces/TextmodeConverters/classes/TextmodeConverter.md) instance or `void` if the addition failed.

***

### get()

> **get**(`name`): `void` \| [`TextmodeConverter`](../textmode.js/namespaces/TextmodeConverters/classes/TextmodeConverter.md)

Defined in: [textmode/ConversionPipeline.ts:119](https://github.com/humanbydefinition/textmode.js-dev/blob/e3dc79bc1521c853de25f7f80d6e8ec46edd909c/src/textmode/ConversionPipeline.ts#L119)

Retrieves a converter by name. Useful for accessing the pre-defined converters in the pipeline.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `name` | `string` | The name of the converter to retrieve. |

#### Returns

`void` \| [`TextmodeConverter`](../textmode.js/namespaces/TextmodeConverters/classes/TextmodeConverter.md)

The requested [TextmodeConverter](../textmode.js/namespaces/TextmodeConverters/classes/TextmodeConverter.md) instance or `void` if not found.

***

### remove()

> **remove**(`nameOrInstance`): `boolean`

Defined in: [textmode/ConversionPipeline.ts:182](https://github.com/humanbydefinition/textmode.js-dev/blob/e3dc79bc1521c853de25f7f80d6e8ec46edd909c/src/textmode/ConversionPipeline.ts#L182)

Removes a converter from the pipeline by name or instance.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `nameOrInstance` | `string` \| [`TextmodeConverter`](../textmode.js/namespaces/TextmodeConverters/classes/TextmodeConverter.md) | The unique name of the converter or the converter instance to remove. |

#### Returns

`boolean`

`true` if the converter was successfully removed, `false` otherwise.
