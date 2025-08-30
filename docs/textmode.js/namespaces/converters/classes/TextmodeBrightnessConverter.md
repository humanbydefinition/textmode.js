[**textmode.js v0.1.9**](../../../../README.md)

***

[textmode.js](../../../../README.md) / [converters](../README.md) / TextmodeBrightnessConverter

# Class: TextmodeBrightnessConverter

Defined in: [textmode/converters/BrightnessConverter.ts:69](https://github.com/humanbydefinition/textmode.js-dev/blob/02f2317592c96b7b0129f0da9a382c12c28ad890/src/textmode/converters/BrightnessConverter.ts#L69)

Converter that maps brightness values from a source texture to ASCII characters.

## Extends

- [`TextmodeFeatureConverter`](TextmodeFeatureConverter.md)\<[`TextmodeBrightnessConverterOptions`](../interfaces/TextmodeBrightnessConverterOptions.md)\>

## Accessors

### characterFramebuffer

#### Get Signature

> **get** **characterFramebuffer**(): [`Framebuffer`](../../rendering/classes/Framebuffer.md)

Defined in: [textmode/converters/Converter.ts:115](https://github.com/humanbydefinition/textmode.js-dev/blob/02f2317592c96b7b0129f0da9a382c12c28ad890/src/textmode/converters/Converter.ts#L115)

Returns the framebuffer containing character data.

##### Returns

[`Framebuffer`](../../rendering/classes/Framebuffer.md)

#### Inherited from

[`TextmodeFeatureConverter`](TextmodeFeatureConverter.md).[`characterFramebuffer`](TextmodeFeatureConverter.md#characterframebuffer)

***

### options

#### Get Signature

> **get** **options**(): `TOptions`

Defined in: [textmode/converters/Converter.ts:130](https://github.com/humanbydefinition/textmode.js-dev/blob/02f2317592c96b7b0129f0da9a382c12c28ad890/src/textmode/converters/Converter.ts#L130)

Returns the defined options for this converter.

##### Returns

`TOptions`

#### Inherited from

[`TextmodeFeatureConverter`](TextmodeFeatureConverter.md).[`options`](TextmodeFeatureConverter.md#options)

***

### primaryColorFramebuffer

#### Get Signature

> **get** **primaryColorFramebuffer**(): [`Framebuffer`](../../rendering/classes/Framebuffer.md)

Defined in: [textmode/converters/Converter.ts:118](https://github.com/humanbydefinition/textmode.js-dev/blob/02f2317592c96b7b0129f0da9a382c12c28ad890/src/textmode/converters/Converter.ts#L118)

Returns the framebuffer containing primary color data.

##### Returns

[`Framebuffer`](../../rendering/classes/Framebuffer.md)

#### Inherited from

[`TextmodeFeatureConverter`](TextmodeFeatureConverter.md).[`primaryColorFramebuffer`](TextmodeFeatureConverter.md#primarycolorframebuffer)

***

### rotationFramebuffer

#### Get Signature

> **get** **rotationFramebuffer**(): [`Framebuffer`](../../rendering/classes/Framebuffer.md)

Defined in: [textmode/converters/Converter.ts:124](https://github.com/humanbydefinition/textmode.js-dev/blob/02f2317592c96b7b0129f0da9a382c12c28ad890/src/textmode/converters/Converter.ts#L124)

Returns the framebuffer containing rotation data.

##### Returns

[`Framebuffer`](../../rendering/classes/Framebuffer.md)

#### Inherited from

[`TextmodeFeatureConverter`](TextmodeFeatureConverter.md).[`rotationFramebuffer`](TextmodeFeatureConverter.md#rotationframebuffer)

***

### secondaryColorFramebuffer

#### Get Signature

> **get** **secondaryColorFramebuffer**(): [`Framebuffer`](../../rendering/classes/Framebuffer.md)

Defined in: [textmode/converters/Converter.ts:121](https://github.com/humanbydefinition/textmode.js-dev/blob/02f2317592c96b7b0129f0da9a382c12c28ad890/src/textmode/converters/Converter.ts#L121)

Returns the framebuffer containing secondary color data.

##### Returns

[`Framebuffer`](../../rendering/classes/Framebuffer.md)

#### Inherited from

[`TextmodeFeatureConverter`](TextmodeFeatureConverter.md).[`secondaryColorFramebuffer`](TextmodeFeatureConverter.md#secondarycolorframebuffer)

***

### transformFramebuffer

#### Get Signature

> **get** **transformFramebuffer**(): [`Framebuffer`](../../rendering/classes/Framebuffer.md)

Defined in: [textmode/converters/Converter.ts:127](https://github.com/humanbydefinition/textmode.js-dev/blob/02f2317592c96b7b0129f0da9a382c12c28ad890/src/textmode/converters/Converter.ts#L127)

Returns the framebuffer containing transformation data.

##### Returns

[`Framebuffer`](../../rendering/classes/Framebuffer.md)

#### Inherited from

[`TextmodeFeatureConverter`](TextmodeFeatureConverter.md).[`transformFramebuffer`](TextmodeFeatureConverter.md#transformframebuffer)

## Methods

### brightnessRange()

> **brightnessRange**(`range`): `void`

Defined in: [textmode/converters/BrightnessConverter.ts:175](https://github.com/humanbydefinition/textmode.js-dev/blob/02f2317592c96b7b0129f0da9a382c12c28ad890/src/textmode/converters/BrightnessConverter.ts#L175)

Sets the brightness range for ASCII character mapping.

Cells that sample outside this range are rendered as transparent.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `range` | \[`number`, `number`\] | Array of two numbers `[min, max]`, where `min` is darkest and `max` is brightest. |

#### Returns

`void`

***

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

#### Inherited from

[`TextmodeFeatureConverter`](TextmodeFeatureConverter.md).[`cellColor`](TextmodeFeatureConverter.md#cellcolor)

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

#### Inherited from

[`TextmodeFeatureConverter`](TextmodeFeatureConverter.md).[`cellColorMode`](TextmodeFeatureConverter.md#cellcolormode)

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

#### Inherited from

[`TextmodeFeatureConverter`](TextmodeFeatureConverter.md).[`characterColor`](TextmodeFeatureConverter.md#charactercolor)

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

#### Inherited from

[`TextmodeFeatureConverter`](TextmodeFeatureConverter.md).[`characterColorMode`](TextmodeFeatureConverter.md#charactercolormode)

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

#### Inherited from

[`TextmodeFeatureConverter`](TextmodeFeatureConverter.md).[`characters`](TextmodeFeatureConverter.md#characters)

***

### disable()

> **disable**(): `void`

Defined in: [textmode/converters/Converter.ts:98](https://github.com/humanbydefinition/textmode.js-dev/blob/02f2317592c96b7b0129f0da9a382c12c28ad890/src/textmode/converters/Converter.ts#L98)

Disables the converter.

#### Returns

`void`

#### Inherited from

[`TextmodeFeatureConverter`](TextmodeFeatureConverter.md).[`disable`](TextmodeFeatureConverter.md#disable)

***

### enable()

> **enable**(): `void`

Defined in: [textmode/converters/Converter.ts:91](https://github.com/humanbydefinition/textmode.js-dev/blob/02f2317592c96b7b0129f0da9a382c12c28ad890/src/textmode/converters/Converter.ts#L91)

Enables the converter.

#### Returns

`void`

#### Inherited from

[`TextmodeFeatureConverter`](TextmodeFeatureConverter.md).[`enable`](TextmodeFeatureConverter.md#enable)

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

[`TextmodeFeatureConverter`](TextmodeFeatureConverter.md).[`enabled`](TextmodeFeatureConverter.md#enabled)

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

#### Inherited from

[`TextmodeFeatureConverter`](TextmodeFeatureConverter.md).[`flipHorizontally`](TextmodeFeatureConverter.md#fliphorizontally)

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

#### Inherited from

[`TextmodeFeatureConverter`](TextmodeFeatureConverter.md).[`flipVertically`](TextmodeFeatureConverter.md#flipvertically)

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

#### Inherited from

[`TextmodeFeatureConverter`](TextmodeFeatureConverter.md).[`invert`](TextmodeFeatureConverter.md#invert)

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

#### Inherited from

[`TextmodeFeatureConverter`](TextmodeFeatureConverter.md).[`rotation`](TextmodeFeatureConverter.md#rotation)
