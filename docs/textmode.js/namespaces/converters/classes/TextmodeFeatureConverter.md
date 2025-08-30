[**textmode.js v0.1.9**](../../../../README.md)

***

[textmode.js](../../../../README.md) / [converters](../README.md) / TextmodeFeatureConverter

# Class: `abstract` TextmodeFeatureConverter\<TOptions\>

Defined in: [textmode/converters/FeatureConverter.ts:36](https://github.com/humanbydefinition/textmode.js-dev/blob/02f2317592c96b7b0129f0da9a382c12c28ad890/src/textmode/converters/FeatureConverter.ts#L36)

Abstract base class for all feature-based textmode converters like `'brightness'`.

## Extends

- [`TextmodeConverter`](TextmodeConverter.md)\<`TOptions`\>

## Extended by

- [`TextmodeBrightnessConverter`](TextmodeBrightnessConverter.md)

## Type Parameters

| Type Parameter | Default type |
| ------ | ------ |
| `TOptions` *extends* [`TextmodeFeatureConverterOptions`](../interfaces/TextmodeFeatureConverterOptions.md) | [`TextmodeFeatureConverterOptions`](../interfaces/TextmodeFeatureConverterOptions.md) |

## Accessors

### characterFramebuffer

#### Get Signature

> **get** **characterFramebuffer**(): [`Framebuffer`](../../rendering/classes/Framebuffer.md)

Defined in: [textmode/converters/Converter.ts:115](https://github.com/humanbydefinition/textmode.js-dev/blob/02f2317592c96b7b0129f0da9a382c12c28ad890/src/textmode/converters/Converter.ts#L115)

Returns the framebuffer containing character data.

##### Returns

[`Framebuffer`](../../rendering/classes/Framebuffer.md)

#### Inherited from

[`TextmodeConverter`](TextmodeConverter.md).[`characterFramebuffer`](TextmodeConverter.md#characterframebuffer)

***

### options

#### Get Signature

> **get** **options**(): `TOptions`

Defined in: [textmode/converters/Converter.ts:130](https://github.com/humanbydefinition/textmode.js-dev/blob/02f2317592c96b7b0129f0da9a382c12c28ad890/src/textmode/converters/Converter.ts#L130)

Returns the defined options for this converter.

##### Returns

`TOptions`

#### Inherited from

[`TextmodeConverter`](TextmodeConverter.md).[`options`](TextmodeConverter.md#options)

***

### primaryColorFramebuffer

#### Get Signature

> **get** **primaryColorFramebuffer**(): [`Framebuffer`](../../rendering/classes/Framebuffer.md)

Defined in: [textmode/converters/Converter.ts:118](https://github.com/humanbydefinition/textmode.js-dev/blob/02f2317592c96b7b0129f0da9a382c12c28ad890/src/textmode/converters/Converter.ts#L118)

Returns the framebuffer containing primary color data.

##### Returns

[`Framebuffer`](../../rendering/classes/Framebuffer.md)

#### Inherited from

[`TextmodeConverter`](TextmodeConverter.md).[`primaryColorFramebuffer`](TextmodeConverter.md#primarycolorframebuffer)

***

### rotationFramebuffer

#### Get Signature

> **get** **rotationFramebuffer**(): [`Framebuffer`](../../rendering/classes/Framebuffer.md)

Defined in: [textmode/converters/Converter.ts:124](https://github.com/humanbydefinition/textmode.js-dev/blob/02f2317592c96b7b0129f0da9a382c12c28ad890/src/textmode/converters/Converter.ts#L124)

Returns the framebuffer containing rotation data.

##### Returns

[`Framebuffer`](../../rendering/classes/Framebuffer.md)

#### Inherited from

[`TextmodeConverter`](TextmodeConverter.md).[`rotationFramebuffer`](TextmodeConverter.md#rotationframebuffer)

***

### secondaryColorFramebuffer

#### Get Signature

> **get** **secondaryColorFramebuffer**(): [`Framebuffer`](../../rendering/classes/Framebuffer.md)

Defined in: [textmode/converters/Converter.ts:121](https://github.com/humanbydefinition/textmode.js-dev/blob/02f2317592c96b7b0129f0da9a382c12c28ad890/src/textmode/converters/Converter.ts#L121)

Returns the framebuffer containing secondary color data.

##### Returns

[`Framebuffer`](../../rendering/classes/Framebuffer.md)

#### Inherited from

[`TextmodeConverter`](TextmodeConverter.md).[`secondaryColorFramebuffer`](TextmodeConverter.md#secondarycolorframebuffer)

***

### transformFramebuffer

#### Get Signature

> **get** **transformFramebuffer**(): [`Framebuffer`](../../rendering/classes/Framebuffer.md)

Defined in: [textmode/converters/Converter.ts:127](https://github.com/humanbydefinition/textmode.js-dev/blob/02f2317592c96b7b0129f0da9a382c12c28ad890/src/textmode/converters/Converter.ts#L127)

Returns the framebuffer containing transformation data.

##### Returns

[`Framebuffer`](../../rendering/classes/Framebuffer.md)

#### Inherited from

[`TextmodeConverter`](TextmodeConverter.md).[`transformFramebuffer`](TextmodeConverter.md#transformframebuffer)

## Methods

### cellColor()

> **cellColor**(`r`, `g?`, `b?`, `a?`): `void`

Defined in: [textmode/converters/FeatureConverter.ts:118](https://github.com/humanbydefinition/textmode.js-dev/blob/02f2317592c96b7b0129f0da9a382c12c28ad890/src/textmode/converters/FeatureConverter.ts#L118)

Sets the cell color for all cells affected by the converter.
This is only used when `cellColorMode` is set to `'fixed'`.

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `r` | `string` \| `number` | `undefined` | Red component (0-255) or hex string *(e.g., '#FF0000', '#F00', 'FF0000', 'F00')*. |
| `g?` | `number` | `undefined` | Green component (0-255). |
| `b?` | `number` | `undefined` | Blue component (0-255). |
| `a?` | `number` | `255` | Alpha component (0-255). |

#### Returns

`void`

***

### cellColorMode()

> **cellColorMode**(`mode`): `void`

Defined in: [textmode/converters/FeatureConverter.ts:131](https://github.com/humanbydefinition/textmode.js-dev/blob/02f2317592c96b7b0129f0da9a382c12c28ad890/src/textmode/converters/FeatureConverter.ts#L131)

Sets the cell color mode.
- `'sampled'`: Uses sampled colors from the source texture.
- `'fixed'`: Uses a fixed color set via [cellColor](#cellcolor).

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `mode` | `"sampled"` \| `"fixed"` | The color mode to use for background cells. |

#### Returns

`void`

***

### characterColor()

> **characterColor**(`r`, `g?`, `b?`, `a?`): `void`

Defined in: [textmode/converters/FeatureConverter.ts:93](https://github.com/humanbydefinition/textmode.js-dev/blob/02f2317592c96b7b0129f0da9a382c12c28ad890/src/textmode/converters/FeatureConverter.ts#L93)

Sets the color of the characters affected by the converter.
This is only used when `characterColorMode` is set to `'fixed'`.

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `r` | `string` \| `number` | `undefined` | Red component (0-255) or hex string *(e.g., '#FF0000', '#F00', 'FF0000', 'F00')*. |
| `g?` | `number` | `undefined` | Green component (0-255). |
| `b?` | `number` | `undefined` | Blue component (0-255). |
| `a?` | `number` | `255` | Alpha component (0-255). |

#### Returns

`void`

***

### characterColorMode()

> **characterColorMode**(`mode`): `void`

Defined in: [textmode/converters/FeatureConverter.ts:106](https://github.com/humanbydefinition/textmode.js-dev/blob/02f2317592c96b7b0129f0da9a382c12c28ad890/src/textmode/converters/FeatureConverter.ts#L106)

Sets the character color mode.
- `'sampled'`: Uses sampled colors from the source texture.
- `'fixed'`: Uses a fixed color set by `characterColor()`.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `mode` | `"sampled"` \| `"fixed"` | The color mode to use for characters. |

#### Returns

`void`

***

### characters()

> **characters**(`characters`): `void`

Defined in: [textmode/converters/FeatureConverter.ts:72](https://github.com/humanbydefinition/textmode.js-dev/blob/02f2317592c96b7b0129f0da9a382c12c28ad890/src/textmode/converters/FeatureConverter.ts#L72)

Sets the characters used for mapping.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `characters` | `string` | The characters to use for mapping, usually ordered from least dense to most dense. |

#### Returns

`void`

***

### disable()

> **disable**(): `void`

Defined in: [textmode/converters/Converter.ts:98](https://github.com/humanbydefinition/textmode.js-dev/blob/02f2317592c96b7b0129f0da9a382c12c28ad890/src/textmode/converters/Converter.ts#L98)

Disables the converter.

#### Returns

`void`

#### Inherited from

[`TextmodeConverter`](TextmodeConverter.md).[`disable`](TextmodeConverter.md#disable)

***

### enable()

> **enable**(): `void`

Defined in: [textmode/converters/Converter.ts:91](https://github.com/humanbydefinition/textmode.js-dev/blob/02f2317592c96b7b0129f0da9a382c12c28ad890/src/textmode/converters/Converter.ts#L91)

Enables the converter.

#### Returns

`void`

#### Inherited from

[`TextmodeConverter`](TextmodeConverter.md).[`enable`](TextmodeConverter.md#enable)

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

#### Inherited from

[`TextmodeConverter`](TextmodeConverter.md).[`enabled`](TextmodeConverter.md#enabled)

***

### flipHorizontally()

> **flipHorizontally**(`flip`): `void`

Defined in: [textmode/converters/FeatureConverter.ts:170](https://github.com/humanbydefinition/textmode.js-dev/blob/02f2317592c96b7b0129f0da9a382c12c28ad890/src/textmode/converters/FeatureConverter.ts#L170)

Flips the characters horizontally.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `flip` | `number` \| `boolean` | If `true`, characters are flipped horizontally. If `false`, no flip is applied. |

#### Returns

`void`

***

### flipVertically()

> **flipVertically**(`flip`): `void`

Defined in: [textmode/converters/FeatureConverter.ts:178](https://github.com/humanbydefinition/textmode.js-dev/blob/02f2317592c96b7b0129f0da9a382c12c28ad890/src/textmode/converters/FeatureConverter.ts#L178)

Flips the characters vertically.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `flip` | `number` \| `boolean` | If `true`, characters are flipped vertically. If `false`, no flip is applied. |

#### Returns

`void`

***

### invert()

> **invert**(`invert`): `void`

Defined in: [textmode/converters/FeatureConverter.ts:139](https://github.com/humanbydefinition/textmode.js-dev/blob/02f2317592c96b7b0129f0da9a382c12c28ad890/src/textmode/converters/FeatureConverter.ts#L139)

Swaps the character and cell color.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `invert` | `number` \| `boolean` | If `true`, the character color becomes the cell color and vice versa. |

#### Returns

`void`

***

### rotation()

> **rotation**(`angle`): `void`

Defined in: [textmode/converters/FeatureConverter.ts:147](https://github.com/humanbydefinition/textmode.js-dev/blob/02f2317592c96b7b0129f0da9a382c12c28ad890/src/textmode/converters/FeatureConverter.ts#L147)

Sets the rotation angle for the characters.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `angle` | `number` | The rotation angle in degrees. |

#### Returns

`void`
