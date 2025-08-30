[**textmode.js v0.1.9**](../../../../README.md)

***

[textmode.js](../../../../README.md) / [converters](../README.md) / TextmodeConverter

# Class: TextmodeConverter\<TOptions\>

Defined in: [textmode/converters/Converter.ts:18](https://github.com/humanbydefinition/textmode.js-dev/blob/02f2317592c96b7b0129f0da9a382c12c28ad890/src/textmode/converters/Converter.ts#L18)

Base class for all textmode converters.

## Extended by

- [`TextmodeFeatureConverter`](TextmodeFeatureConverter.md)

## Type Parameters

| Type Parameter | Default type |
| ------ | ------ |
| `TOptions` *extends* [`TextmodeConverterOptions`](../interfaces/TextmodeConverterOptions.md) | [`TextmodeConverterOptions`](../interfaces/TextmodeConverterOptions.md) |

## Accessors

### characterFramebuffer

#### Get Signature

> **get** **characterFramebuffer**(): [`Framebuffer`](../../rendering/classes/Framebuffer.md)

Defined in: [textmode/converters/Converter.ts:115](https://github.com/humanbydefinition/textmode.js-dev/blob/02f2317592c96b7b0129f0da9a382c12c28ad890/src/textmode/converters/Converter.ts#L115)

Returns the framebuffer containing character data.

##### Returns

[`Framebuffer`](../../rendering/classes/Framebuffer.md)

***

### options

#### Get Signature

> **get** **options**(): `TOptions`

Defined in: [textmode/converters/Converter.ts:130](https://github.com/humanbydefinition/textmode.js-dev/blob/02f2317592c96b7b0129f0da9a382c12c28ad890/src/textmode/converters/Converter.ts#L130)

Returns the defined options for this converter.

##### Returns

`TOptions`

***

### primaryColorFramebuffer

#### Get Signature

> **get** **primaryColorFramebuffer**(): [`Framebuffer`](../../rendering/classes/Framebuffer.md)

Defined in: [textmode/converters/Converter.ts:118](https://github.com/humanbydefinition/textmode.js-dev/blob/02f2317592c96b7b0129f0da9a382c12c28ad890/src/textmode/converters/Converter.ts#L118)

Returns the framebuffer containing primary color data.

##### Returns

[`Framebuffer`](../../rendering/classes/Framebuffer.md)

***

### rotationFramebuffer

#### Get Signature

> **get** **rotationFramebuffer**(): [`Framebuffer`](../../rendering/classes/Framebuffer.md)

Defined in: [textmode/converters/Converter.ts:124](https://github.com/humanbydefinition/textmode.js-dev/blob/02f2317592c96b7b0129f0da9a382c12c28ad890/src/textmode/converters/Converter.ts#L124)

Returns the framebuffer containing rotation data.

##### Returns

[`Framebuffer`](../../rendering/classes/Framebuffer.md)

***

### secondaryColorFramebuffer

#### Get Signature

> **get** **secondaryColorFramebuffer**(): [`Framebuffer`](../../rendering/classes/Framebuffer.md)

Defined in: [textmode/converters/Converter.ts:121](https://github.com/humanbydefinition/textmode.js-dev/blob/02f2317592c96b7b0129f0da9a382c12c28ad890/src/textmode/converters/Converter.ts#L121)

Returns the framebuffer containing secondary color data.

##### Returns

[`Framebuffer`](../../rendering/classes/Framebuffer.md)

***

### transformFramebuffer

#### Get Signature

> **get** **transformFramebuffer**(): [`Framebuffer`](../../rendering/classes/Framebuffer.md)

Defined in: [textmode/converters/Converter.ts:127](https://github.com/humanbydefinition/textmode.js-dev/blob/02f2317592c96b7b0129f0da9a382c12c28ad890/src/textmode/converters/Converter.ts#L127)

Returns the framebuffer containing transformation data.

##### Returns

[`Framebuffer`](../../rendering/classes/Framebuffer.md)

## Methods

### disable()

> **disable**(): `void`

Defined in: [textmode/converters/Converter.ts:98](https://github.com/humanbydefinition/textmode.js-dev/blob/02f2317592c96b7b0129f0da9a382c12c28ad890/src/textmode/converters/Converter.ts#L98)

Disables the converter.

#### Returns

`void`

***

### enable()

> **enable**(): `void`

Defined in: [textmode/converters/Converter.ts:91](https://github.com/humanbydefinition/textmode.js-dev/blob/02f2317592c96b7b0129f0da9a382c12c28ad890/src/textmode/converters/Converter.ts#L91)

Enables the converter.

#### Returns

`void`

***

### enabled()

> **enabled**(`enabled`): `void`

Defined in: [textmode/converters/Converter.ts:76](https://github.com/humanbydefinition/textmode.js-dev/blob/02f2317592c96b7b0129f0da9a382c12c28ad890/src/textmode/converters/Converter.ts#L76)

Enables or disables the converter.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `enabled` | `number` \| `boolean` | Whether to enable or disable the converter.<br/>Accepts boolean or number *(0 = false, any other number = true)*. |

#### Returns

`void`
