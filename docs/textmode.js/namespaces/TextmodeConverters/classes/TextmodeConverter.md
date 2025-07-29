[**textmode.js v0.1.1**](../../../../README.md)

***

[textmode.js](../../../../README.md) / [TextmodeConverters](../README.md) / TextmodeConverter

# Class: TextmodeConverter

Defined in: [textmode/converters/Converter.ts:9](https://github.com/humanbydefinition/textmode.js-dev/blob/a65ef74f9f1cec2f9aa76c00793fa738c0824751/src/textmode/converters/Converter.ts#L9)

Base class for all textmode converters.

## Extended by

- [`TextmodeFeatureConverter`](TextmodeFeatureConverter.md)

## Accessors

### characterFramebuffer

#### Get Signature

> **get** **characterFramebuffer**(): `Framebuffer`

Defined in: [textmode/converters/Converter.ts:80](https://github.com/humanbydefinition/textmode.js-dev/blob/a65ef74f9f1cec2f9aa76c00793fa738c0824751/src/textmode/converters/Converter.ts#L80)

Returns the framebuffer containing character data.

##### Returns

`Framebuffer`

***

### options

#### Get Signature

> **get** **options**(): `any`

Defined in: [textmode/converters/Converter.ts:95](https://github.com/humanbydefinition/textmode.js-dev/blob/a65ef74f9f1cec2f9aa76c00793fa738c0824751/src/textmode/converters/Converter.ts#L95)

Returns the renderer used by this converter.

##### Returns

`any`

***

### primaryColorFramebuffer

#### Get Signature

> **get** **primaryColorFramebuffer**(): `Framebuffer`

Defined in: [textmode/converters/Converter.ts:83](https://github.com/humanbydefinition/textmode.js-dev/blob/a65ef74f9f1cec2f9aa76c00793fa738c0824751/src/textmode/converters/Converter.ts#L83)

Returns the framebuffer containing primary color data.

##### Returns

`Framebuffer`

***

### rotationFramebuffer

#### Get Signature

> **get** **rotationFramebuffer**(): `Framebuffer`

Defined in: [textmode/converters/Converter.ts:89](https://github.com/humanbydefinition/textmode.js-dev/blob/a65ef74f9f1cec2f9aa76c00793fa738c0824751/src/textmode/converters/Converter.ts#L89)

Returns the framebuffer containing rotation data.

##### Returns

`Framebuffer`

***

### secondaryColorFramebuffer

#### Get Signature

> **get** **secondaryColorFramebuffer**(): `Framebuffer`

Defined in: [textmode/converters/Converter.ts:86](https://github.com/humanbydefinition/textmode.js-dev/blob/a65ef74f9f1cec2f9aa76c00793fa738c0824751/src/textmode/converters/Converter.ts#L86)

Returns the framebuffer containing secondary color data.

##### Returns

`Framebuffer`

***

### transformFramebuffer

#### Get Signature

> **get** **transformFramebuffer**(): `Framebuffer`

Defined in: [textmode/converters/Converter.ts:92](https://github.com/humanbydefinition/textmode.js-dev/blob/a65ef74f9f1cec2f9aa76c00793fa738c0824751/src/textmode/converters/Converter.ts#L92)

Returns the framebuffer containing transformation data.

##### Returns

`Framebuffer`

## Methods

### disable()

> **disable**(): `void`

Defined in: [textmode/converters/Converter.ts:74](https://github.com/humanbydefinition/textmode.js-dev/blob/a65ef74f9f1cec2f9aa76c00793fa738c0824751/src/textmode/converters/Converter.ts#L74)

Disables the converter.

#### Returns

`void`

***

### enable()

> **enable**(): `void`

Defined in: [textmode/converters/Converter.ts:67](https://github.com/humanbydefinition/textmode.js-dev/blob/a65ef74f9f1cec2f9aa76c00793fa738c0824751/src/textmode/converters/Converter.ts#L67)

Enables the converter.

#### Returns

`void`

***

### enabled()

> **enabled**(`enabled`): `void`

Defined in: [textmode/converters/Converter.ts:60](https://github.com/humanbydefinition/textmode.js-dev/blob/a65ef74f9f1cec2f9aa76c00793fa738c0824751/src/textmode/converters/Converter.ts#L60)

Enables or disables the converter.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `enabled` | `boolean` | Whether to enable or disable the converter. |

#### Returns

`void`
