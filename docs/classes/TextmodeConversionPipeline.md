[**textmode.js v0.1.9**](../README.md)

***

[textmode.js](../README.md) / TextmodeConversionPipeline

# Class: TextmodeConversionPipeline

Defined in: [textmode/ConversionPipeline.ts:19](https://github.com/humanbydefinition/textmode.js-dev/blob/02f2317592c96b7b0129f0da9a382c12c28ad890/src/textmode/ConversionPipeline.ts#L19)

Manages the conversion pipeline for textmode rendering.

A conversion pipeline consists of multiple converters that process the input texture in sequence.
Each converter can modify the texture in various ways, such as applying brightness mapping,
color adjustments, transformations, and more.

## Accessors

### brightness

#### Get Signature

> **get** **brightness**(): [`TextmodeBrightnessConverter`](../textmode.js/namespaces/converters/classes/TextmodeBrightnessConverter.md)

Defined in: [textmode/ConversionPipeline.ts:327](https://github.com/humanbydefinition/textmode.js-dev/blob/02f2317592c96b7b0129f0da9a382c12c28ad890/src/textmode/ConversionPipeline.ts#L327)

Returns the pre-defined brightness converter that is part of the pipeline by default.

This converter can also be removed from the pipeline via `pipeline.remove(pipeline.brightness)`.

##### Returns

[`TextmodeBrightnessConverter`](../textmode.js/namespaces/converters/classes/TextmodeBrightnessConverter.md)

***

### characterFramebuffer

#### Get Signature

> **get** **characterFramebuffer**(): [`Framebuffer`](../textmode.js/namespaces/rendering/classes/Framebuffer.md)

Defined in: [textmode/ConversionPipeline.ts:308](https://github.com/humanbydefinition/textmode.js-dev/blob/02f2317592c96b7b0129f0da9a382c12c28ad890/src/textmode/ConversionPipeline.ts#L308)

Returns the character framebuffer containing the combined result of all converters.

##### Returns

[`Framebuffer`](../textmode.js/namespaces/rendering/classes/Framebuffer.md)

***

### custom

#### Get Signature

> **get** **custom**(): [`TextmodeConverter`](../textmode.js/namespaces/converters/classes/TextmodeConverter.md)

Defined in: [textmode/ConversionPipeline.ts:334](https://github.com/humanbydefinition/textmode.js-dev/blob/02f2317592c96b7b0129f0da9a382c12c28ad890/src/textmode/ConversionPipeline.ts#L334)

Returns the pre-defined custom converter that is part of the pipeline by default.

This converter can also be removed from the pipeline via `pipeline.remove(pipeline.custom)`.

##### Returns

[`TextmodeConverter`](../textmode.js/namespaces/converters/classes/TextmodeConverter.md)

***

### primaryColorFramebuffer

#### Get Signature

> **get** **primaryColorFramebuffer**(): [`Framebuffer`](../textmode.js/namespaces/rendering/classes/Framebuffer.md)

Defined in: [textmode/ConversionPipeline.ts:311](https://github.com/humanbydefinition/textmode.js-dev/blob/02f2317592c96b7b0129f0da9a382c12c28ad890/src/textmode/ConversionPipeline.ts#L311)

Returns the primary color framebuffer containing the combined result of all converters.

##### Returns

[`Framebuffer`](../textmode.js/namespaces/rendering/classes/Framebuffer.md)

***

### rotationFramebuffer

#### Get Signature

> **get** **rotationFramebuffer**(): [`Framebuffer`](../textmode.js/namespaces/rendering/classes/Framebuffer.md)

Defined in: [textmode/ConversionPipeline.ts:317](https://github.com/humanbydefinition/textmode.js-dev/blob/02f2317592c96b7b0129f0da9a382c12c28ad890/src/textmode/ConversionPipeline.ts#L317)

Returns the rotation framebuffer containing the combined result of all converters.

##### Returns

[`Framebuffer`](../textmode.js/namespaces/rendering/classes/Framebuffer.md)

***

### secondaryColorFramebuffer

#### Get Signature

> **get** **secondaryColorFramebuffer**(): [`Framebuffer`](../textmode.js/namespaces/rendering/classes/Framebuffer.md)

Defined in: [textmode/ConversionPipeline.ts:314](https://github.com/humanbydefinition/textmode.js-dev/blob/02f2317592c96b7b0129f0da9a382c12c28ad890/src/textmode/ConversionPipeline.ts#L314)

Returns the secondary color framebuffer containing the combined result of all converters.

##### Returns

[`Framebuffer`](../textmode.js/namespaces/rendering/classes/Framebuffer.md)

***

### texture

#### Get Signature

> **get** **texture**(): [`Framebuffer`](../textmode.js/namespaces/rendering/classes/Framebuffer.md)

Defined in: [textmode/ConversionPipeline.ts:305](https://github.com/humanbydefinition/textmode.js-dev/blob/02f2317592c96b7b0129f0da9a382c12c28ad890/src/textmode/ConversionPipeline.ts#L305)

Returns the framebuffer containing the textmode conversion result.

##### Returns

[`Framebuffer`](../textmode.js/namespaces/rendering/classes/Framebuffer.md)

***

### transformFramebuffer

#### Get Signature

> **get** **transformFramebuffer**(): [`Framebuffer`](../textmode.js/namespaces/rendering/classes/Framebuffer.md)

Defined in: [textmode/ConversionPipeline.ts:320](https://github.com/humanbydefinition/textmode.js-dev/blob/02f2317592c96b7b0129f0da9a382c12c28ad890/src/textmode/ConversionPipeline.ts#L320)

Returns the transform framebuffer containing the combined result of all converters.

##### Returns

[`Framebuffer`](../textmode.js/namespaces/rendering/classes/Framebuffer.md)

## Methods

### add()

> **add**(`type`): `void` \| [`TextmodeConverter`](../textmode.js/namespaces/converters/classes/TextmodeConverter.md)\<[`TextmodeConverterOptions`](../textmode.js/namespaces/converters/interfaces/TextmodeConverterOptions.md)\>

Defined in: [textmode/ConversionPipeline.ts:128](https://github.com/humanbydefinition/textmode.js-dev/blob/02f2317592c96b7b0129f0da9a382c12c28ad890/src/textmode/ConversionPipeline.ts#L128)

Adds a new converter to the pipeline.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `type` | `"brightness"` \| `"custom"` | The type of converter to add. Can be either "brightness" or "custom". |

#### Returns

`void` \| [`TextmodeConverter`](../textmode.js/namespaces/converters/classes/TextmodeConverter.md)\<[`TextmodeConverterOptions`](../textmode.js/namespaces/converters/interfaces/TextmodeConverterOptions.md)\>

The newly created [TextmodeConverter](../textmode.js/namespaces/converters/classes/TextmodeConverter.md) instance or `void` if the addition failed.

***

### disable()

> **disable**(): `void`

Defined in: [textmode/ConversionPipeline.ts:267](https://github.com/humanbydefinition/textmode.js-dev/blob/02f2317592c96b7b0129f0da9a382c12c28ad890/src/textmode/ConversionPipeline.ts#L267)

Disables all converters in the pipeline.

#### Returns

`void`

***

### enable()

> **enable**(): `void`

Defined in: [textmode/ConversionPipeline.ts:276](https://github.com/humanbydefinition/textmode.js-dev/blob/02f2317592c96b7b0129f0da9a382c12c28ad890/src/textmode/ConversionPipeline.ts#L276)

Enables all converters in the pipeline.

#### Returns

`void`

***

### hasEnabledConverters()

> **hasEnabledConverters**(): `boolean`

Defined in: [textmode/ConversionPipeline.ts:260](https://github.com/humanbydefinition/textmode.js-dev/blob/02f2317592c96b7b0129f0da9a382c12c28ad890/src/textmode/ConversionPipeline.ts#L260)

Checks if any converter in the pipeline is enabled.

#### Returns

`boolean`

`true` if any converter is enabled, `false` otherwise.

***

### remove()

> **remove**(`converter`): `void`

Defined in: [textmode/ConversionPipeline.ts:153](https://github.com/humanbydefinition/textmode.js-dev/blob/02f2317592c96b7b0129f0da9a382c12c28ad890/src/textmode/ConversionPipeline.ts#L153)

Removes a converter from the pipeline.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `converter` | [`TextmodeConverter`](../textmode.js/namespaces/converters/classes/TextmodeConverter.md) | The converter instance to remove. |

#### Returns

`void`

***

### swap()

> **swap**(`first`, `second`): `void`

Defined in: [textmode/ConversionPipeline.ts:180](https://github.com/humanbydefinition/textmode.js-dev/blob/02f2317592c96b7b0129f0da9a382c12c28ad890/src/textmode/ConversionPipeline.ts#L180)

Swaps two converters in the pipeline.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `first` | `number` \| [`TextmodeConverter`](../textmode.js/namespaces/converters/classes/TextmodeConverter.md)\<[`TextmodeConverterOptions`](../textmode.js/namespaces/converters/interfaces/TextmodeConverterOptions.md)\> | Either an index *(integer)* or a [TextmodeConverter](../textmode.js/namespaces/converters/classes/TextmodeConverter.md) instance. |
| `second` | `number` \| [`TextmodeConverter`](../textmode.js/namespaces/converters/classes/TextmodeConverter.md)\<[`TextmodeConverterOptions`](../textmode.js/namespaces/converters/interfaces/TextmodeConverterOptions.md)\> | Either an index *(integer)* or a [TextmodeConverter](../textmode.js/namespaces/converters/classes/TextmodeConverter.md) instance. |

#### Returns

`void`
