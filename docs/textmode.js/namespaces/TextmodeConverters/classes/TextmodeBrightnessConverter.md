[**textmode.js v0.0.10-beta.5**](../../../../README.md)

***

[textmode.js](../../../../README.md) / [TextmodeConverters](../README.md) / TextmodeBrightnessConverter

# Class: TextmodeBrightnessConverter

Defined in: [textmode/converters/BrightnessConverter.ts:45](https://github.com/humanbydefinition/textmode.js-dev/blob/e3dc79bc1521c853de25f7f80d6e8ec46edd909c/src/textmode/converters/BrightnessConverter.ts#L45)

Converter that maps brightness values from a source texture to ASCII characters.

## Extends

- [`TextmodeFeatureConverter`](TextmodeFeatureConverter.md)

## Accessors

### characterFramebuffer

#### Get Signature

> **get** **characterFramebuffer**(): `Framebuffer`

Defined in: [textmode/converters/Converter.ts:58](https://github.com/humanbydefinition/textmode.js-dev/blob/e3dc79bc1521c853de25f7f80d6e8ec46edd909c/src/textmode/converters/Converter.ts#L58)

Returns the framebuffer containing character data.

##### Returns

`Framebuffer`

#### Inherited from

[`TextmodeFeatureConverter`](TextmodeFeatureConverter.md).[`characterFramebuffer`](TextmodeFeatureConverter.md#characterframebuffer)

***

### primaryColorFramebuffer

#### Get Signature

> **get** **primaryColorFramebuffer**(): `Framebuffer`

Defined in: [textmode/converters/Converter.ts:61](https://github.com/humanbydefinition/textmode.js-dev/blob/e3dc79bc1521c853de25f7f80d6e8ec46edd909c/src/textmode/converters/Converter.ts#L61)

Returns the framebuffer containing primary color data.

##### Returns

`Framebuffer`

#### Inherited from

[`TextmodeFeatureConverter`](TextmodeFeatureConverter.md).[`primaryColorFramebuffer`](TextmodeFeatureConverter.md#primarycolorframebuffer)

***

### rotationFramebuffer

#### Get Signature

> **get** **rotationFramebuffer**(): `Framebuffer`

Defined in: [textmode/converters/Converter.ts:67](https://github.com/humanbydefinition/textmode.js-dev/blob/e3dc79bc1521c853de25f7f80d6e8ec46edd909c/src/textmode/converters/Converter.ts#L67)

Returns the framebuffer containing rotation data.

##### Returns

`Framebuffer`

#### Inherited from

[`TextmodeFeatureConverter`](TextmodeFeatureConverter.md).[`rotationFramebuffer`](TextmodeFeatureConverter.md#rotationframebuffer)

***

### secondaryColorFramebuffer

#### Get Signature

> **get** **secondaryColorFramebuffer**(): `Framebuffer`

Defined in: [textmode/converters/Converter.ts:64](https://github.com/humanbydefinition/textmode.js-dev/blob/e3dc79bc1521c853de25f7f80d6e8ec46edd909c/src/textmode/converters/Converter.ts#L64)

Returns the framebuffer containing secondary color data.

##### Returns

`Framebuffer`

#### Inherited from

[`TextmodeFeatureConverter`](TextmodeFeatureConverter.md).[`secondaryColorFramebuffer`](TextmodeFeatureConverter.md#secondarycolorframebuffer)

***

### transformFramebuffer

#### Get Signature

> **get** **transformFramebuffer**(): `Framebuffer`

Defined in: [textmode/converters/Converter.ts:70](https://github.com/humanbydefinition/textmode.js-dev/blob/e3dc79bc1521c853de25f7f80d6e8ec46edd909c/src/textmode/converters/Converter.ts#L70)

Returns the framebuffer containing transformation data.

##### Returns

`Framebuffer`

#### Inherited from

[`TextmodeFeatureConverter`](TextmodeFeatureConverter.md).[`transformFramebuffer`](TextmodeFeatureConverter.md#transformframebuffer)

## Methods

### brightnessRange()

> **brightnessRange**(`range`): `void`

Defined in: [textmode/converters/BrightnessConverter.ts:150](https://github.com/humanbydefinition/textmode.js-dev/blob/e3dc79bc1521c853de25f7f80d6e8ec46edd909c/src/textmode/converters/BrightnessConverter.ts#L150)

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

> **cellColor**(`r`, `g`, `b`, `a`): `void`

Defined in: [textmode/converters/FeatureConverter.ts:92](https://github.com/humanbydefinition/textmode.js-dev/blob/e3dc79bc1521c853de25f7f80d6e8ec46edd909c/src/textmode/converters/FeatureConverter.ts#L92)

Sets the cell color for all cells affected by the converter.
This is only used when `cellColorMode` is set to `'fixed'`.

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `r` | `number` | `undefined` | Red component (0-255). |
| `g` | `number` | `r` | Green component (0-255). |
| `b` | `number` | `r` | Blue component (0-255). |
| `a` | `number` | `255` | Alpha component (0-255). |

#### Returns

`void`

#### Inherited from

[`TextmodeFeatureConverter`](TextmodeFeatureConverter.md).[`cellColor`](TextmodeFeatureConverter.md#cellcolor)

***

### cellColorMode()

> **cellColorMode**(`mode`): `void`

Defined in: [textmode/converters/FeatureConverter.ts:110](https://github.com/humanbydefinition/textmode.js-dev/blob/e3dc79bc1521c853de25f7f80d6e8ec46edd909c/src/textmode/converters/FeatureConverter.ts#L110)

Sets the cell color mode.
- `'sampled'`: Uses sampled colors from the source texture.
- `'fixed'`: Uses a fixed color set via [cellColor](TextmodeFeatureConverter.md#cellcolor).

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

> **characterColor**(`r`, `g`, `b`, `a`): `void`

Defined in: [textmode/converters/FeatureConverter.ts:54](https://github.com/humanbydefinition/textmode.js-dev/blob/e3dc79bc1521c853de25f7f80d6e8ec46edd909c/src/textmode/converters/FeatureConverter.ts#L54)

Sets the color of the characters affected by the converter.
This is only used when `characterColorMode` is set to `'fixed'`.

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `r` | `number` | `undefined` | Red component (0-255). |
| `g` | `number` | `r` | Green component (0-255). |
| `b` | `number` | `r` | Blue component (0-255). |
| `a` | `number` | `255` | Alpha component (0-255). |

#### Returns

`void`

#### Inherited from

[`TextmodeFeatureConverter`](TextmodeFeatureConverter.md).[`characterColor`](TextmodeFeatureConverter.md#charactercolor)

***

### characterColorMode()

> **characterColorMode**(`mode`): `void`

Defined in: [textmode/converters/FeatureConverter.ts:72](https://github.com/humanbydefinition/textmode.js-dev/blob/e3dc79bc1521c853de25f7f80d6e8ec46edd909c/src/textmode/converters/FeatureConverter.ts#L72)

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

Defined in: [textmode/converters/FeatureConverter.ts:34](https://github.com/humanbydefinition/textmode.js-dev/blob/e3dc79bc1521c853de25f7f80d6e8ec46edd909c/src/textmode/converters/FeatureConverter.ts#L34)

Sets the characters used for mapping.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `characters` | `string` | The characters to use for mapping, usually ordered from darkest to brightest. |

#### Returns

`void`

#### Inherited from

[`TextmodeFeatureConverter`](TextmodeFeatureConverter.md).[`characters`](TextmodeFeatureConverter.md#characters)

***

### flipHorizontally()

> **flipHorizontally**(`flip`): `void`

Defined in: [textmode/converters/FeatureConverter.ts:165](https://github.com/humanbydefinition/textmode.js-dev/blob/e3dc79bc1521c853de25f7f80d6e8ec46edd909c/src/textmode/converters/FeatureConverter.ts#L165)

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

Defined in: [textmode/converters/FeatureConverter.ts:181](https://github.com/humanbydefinition/textmode.js-dev/blob/e3dc79bc1521c853de25f7f80d6e8ec46edd909c/src/textmode/converters/FeatureConverter.ts#L181)

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

Defined in: [textmode/converters/FeatureConverter.ts:126](https://github.com/humanbydefinition/textmode.js-dev/blob/e3dc79bc1521c853de25f7f80d6e8ec46edd909c/src/textmode/converters/FeatureConverter.ts#L126)

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

Defined in: [textmode/converters/FeatureConverter.ts:142](https://github.com/humanbydefinition/textmode.js-dev/blob/e3dc79bc1521c853de25f7f80d6e8ec46edd909c/src/textmode/converters/FeatureConverter.ts#L142)

Sets the rotation angle for the characters.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `angle` | `number` | The rotation angle in degrees. |

#### Returns

`void`

#### Inherited from

[`TextmodeFeatureConverter`](TextmodeFeatureConverter.md).[`rotation`](TextmodeFeatureConverter.md#rotation)
